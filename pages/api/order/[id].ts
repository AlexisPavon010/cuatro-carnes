import type { NextApiRequest, NextApiResponse } from 'next'

import Order from '@/models/Order'
import '../../../database/db'
import { IOrder } from '@/interfaces/order'

type Data =
  | { message: string }
  | IOrder

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  switch (req.method) {
    case 'GET':
      return getOrderById(req, res)
    case 'PUT':
      return updateOrderById(req, res)
    default:
      return res.status(400).json({ message: 'Bad Request' })
  }
}

const getOrderById = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query

  const data = await Order.findById(id)
    .lean()

  return res.status(200).json(data)
}

const updateOrderById = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query
  try {
    const data = await Order.findByIdAndUpdate(id, req.body, { new: true })
    return res.status(200).json(data)

  } catch (error: any) {
    console.log(error)
    return res.status(400).json(error)
  }
}