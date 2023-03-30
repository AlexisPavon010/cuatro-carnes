import type { NextApiRequest, NextApiResponse } from 'next'
import Joi from 'joi'

import Order from '@/models/Order'
import '../../../database/db'
import axios from 'axios'

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
  const { category } = req.query

  let condition = {}

  if (category) {
    condition = { category }
  }

  // const queryDate = new Date('2023-03-22');
  // Calculas las fechas de inicio y fin del día correspondiente a la fecha recibida
  // const startDate = new Date(queryDate.getFullYear(), queryDate.getMonth(), queryDate.getDate());
  // const endDate = new Date(queryDate.getFullYear(), queryDate.getMonth(), queryDate.getDate() + 1);


  const data = await Order.find(condition)
  return res.status(200).json({
    metadata: {
      total: await Order.count(),
      canceled: await Order.find({ status: 'canceled' }).count(),
      delivered: await Order.find({ status: 'delivered' }).count(),
      pending: await Order.find({ status: 'pending' }).count()
    },
    data
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