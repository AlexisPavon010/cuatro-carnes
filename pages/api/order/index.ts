import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import Joi from 'joi'

import Order from '@/models/Order'
import '../../../database/db'
import { getSession, useSession } from 'next-auth/react'

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
  const { date = 'all', status = '', skip = 1, limit = 10 } = req.query

  let condition: any = {}

  const day = new Date();
  // Calculas las fechas de inicio y fin del día correspondiente a la fecha recibida
  const startOfDay = new Date(day.getFullYear(), day.getMonth(), day.getDate());
  const endOfDay = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);

  // Calculas las fechas de inicio y fin de la semana correspondiente a la fecha recibida
  const startOfWeek = new Date(day.getFullYear(), day.getMonth(), day.getDate() - day.getDay());
  const endOfWeek = new Date(day.getFullYear(), day.getMonth(), day.getDate() - day.getDay() + 7);

  // Calculas las fechas de inicio y fin del mes correspondiente a la fecha recibida
  const startOfMonth = new Date(day.getFullYear(), day.getMonth(), 1);
  const endOfMonth = new Date(day.getFullYear(), day.getMonth() + 1, 1);


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
    Order.find(condition).sort({ 'createdAt': -1 }).lean(),
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
    result: orders
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
      userID: session.user.id
    })
    axios.post('http://54.209.160.199:8000/send-message', {
      phoneNumber: phone,
      uniqueID: data.uniqueID
    })

    return res.status(200).json(data)

  } catch (error: any) {
    console.log(error)
    return res.status(400).json(error)
  }
}