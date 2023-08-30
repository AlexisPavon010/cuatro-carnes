import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession, useSession } from 'next-auth/react'
import axios from 'axios'
import Joi from 'joi'

import Order from '@/models/Order'
import '../../../database/db'

type Data = {
  message: string
}

const schema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().min(3).required(),
  price: Joi.number().required(),
  category: Joi.string().min(3).required(),
  image: Joi.string().required(),
  quantity: Joi.number().required(),
});

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  switch (req.method) {
    case 'GET':
      return getOrders(req, res)
    case 'POST':
      return CreateOrder(req, res)
    default:
      return res.status(400).json({ message: 'Bad Request' })
  }
}

const getOrders = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { date = 'all', status = '', skip = '1', limit = '10' } = req.query

  let condition: any = {}

  const day = new Date();
  const skipValue = Number(skip);
  const limitValue = Number(limit);
  const nowArgentina = new Date(day.toLocaleString('en-US', { timeZone: 'America/Argentina/Buenos_Aires' }));
  const startOfDay = new Date(nowArgentina.getFullYear(), nowArgentina.getMonth(), nowArgentina.getDate());
  const endOfDay = new Date(nowArgentina.getFullYear(), nowArgentina.getMonth(), nowArgentina.getDate() + 1);
  const startOfWeek = new Date(nowArgentina.getFullYear(), nowArgentina.getMonth(), nowArgentina.getDate() - nowArgentina.getDay());
  const endOfWeek = new Date(nowArgentina.getFullYear(), nowArgentina.getMonth(), nowArgentina.getDate() - nowArgentina.getDay() + 7);
  const startOfMonth = new Date(nowArgentina.getFullYear(), nowArgentina.getMonth(), 1);
  const endOfMonth = new Date(nowArgentina.getFullYear(), nowArgentina.getMonth() + 1, 0);

  if (date === 'day') {
    condition = {
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay
      },
    }
  }

  if (date === 'week') {
    condition = {
      createdAt: {
        $gte: startOfWeek,
        $lt: endOfWeek
      },
    }
  }

  if (date === 'month') {
    condition = {
      createdAt: {
        $gte: startOfMonth,
        $lt: endOfMonth
      },
    }
  }

  if (status !== '') {
    condition.status = status;
  }

  const [
    orders,
    total,
    today,
    cancelled,
    delivered,
    pending
  ] = await Promise.all([
    Order.find(condition)
      .sort({ 'createdAt': -1 })
      .skip((skipValue - 1) * limitValue)
      .limit(limitValue)
      .lean(),
    Order.count(),
    Order.find({
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay
      },
    }).count(),
    Order.find({ status: 'CANCELLED' }).count(),
    Order.find({
      status: 'DELIVERED',
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay
      }
    }).count(),
    Order.find({ status: 'PENDING' }).count(),
  ])

  return res.status(200).json({
    metadata: {
      skip: Number(skip),
      limit: Number(limit),
      total,
      today,
      cancelled,
      delivered,
      pending,
    },
    results: orders
  })
}

const CreateOrder = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { phone = '5493751307791' } = req.body
  const session: any = await getSession({ req })

  try {
    // await schema.validateAsync(req.body);
    const data = await Order.create({
      ...req.body,
      userID: session ? session.user.id : null
    })

    // sendMessage({
    //   message: `¡Hola! Gracias por realizar tu pedido con nosotros. Nos complace confirmar que hemos recibido tu pedido con el número de orden #${data.uniqueID} y estamos trabajando diligentemente para prepararlo y enviarlo lo antes posible. Si tienes alguna pregunta o inquietud sobre tu pedido, no dudes en ponerte en contacto con nosotros con el número de orden correspondiente. ¡Gracias por elegirnos!`,
    //   phone: `whatsapp:+${phone}`,
    // })

    return res.status(200).json(data)

  } catch (error: any) {
    console.log(error)
    return res.status(400).json(error)
  }
}