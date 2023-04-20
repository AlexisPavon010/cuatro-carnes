import type { NextApiRequest, NextApiResponse } from 'next'
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
  const { date = 'all', skip = 1, limit = 10 } = req.query

  let condition = {}

  const today = new Date();
  // Calculas las fechas de inicio y fin del día correspondiente a la fecha recibida
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

  // Calculas las fechas de inicio y fin de la semana correspondiente a la fecha recibida
  const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
  const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 7);

  // Calculas las fechas de inicio y fin del mes correspondiente a la fecha recibida
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);


  if (date === 'day') {
    condition = {
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay
      }
    }
  }

  if (date === 'week') {
    condition = {
      createdAt: {
        $gte: startOfWeek,
        $lt: endOfWeek
      }
    }
  }

  if (date === 'month') {
    condition = {
      createdAt: {
        $gte: startOfMonth,
        $lt: endOfMonth
      }
    }
  }


  const data = await Order.find(condition)
    .sort({ 'createdAt': -1 })
    // .skip(Number(skip * limit))
    // .limit(Number(limit))
    .lean()

  return res.status(200).json({
    metadata: {
      skip: Number(skip),
      limit: Number(limit),
      total: await Order.count(),
      today: await Order.find({
        createdAt: {
          $gte: startOfDay,
          $lt: endOfDay
        }
      }).count(),
      canceled: await Order.find({ status: 'CANCELLED' }).count(),
      delivered: await Order.find({ status: 'DELIVERED' }).count(),
      pending: await Order.find({ status: 'PENDING' }).count(),
    },
    result: data
  })
}

const CreateOrder = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { phoneNumber = '5493751307791' } = req.body
  try {
    // await schema.validateAsync(req.body);
    const data = await Order.create(req.body)
    axios.post('http://54.209.160.199:8000/send-message', {
      phoneNumber,
      uniqueID: data.uniqueID
    })

    return res.status(200).json(data)

  } catch (error: any) {
    console.log(error)
    return res.status(400).json(error)
  }
}