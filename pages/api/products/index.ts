import type { NextApiRequest, NextApiResponse } from 'next'
import Joi from 'joi'

import Product from '@/models/Product'
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
      return getProducts(req, res)
    case 'POST':
      return CreateProduct(req, res)
    default:
      return res.status(400).json({ message: 'Bad Request' })
  }
}

const getProducts = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { category } = req.query

  let condition = {}

  if (category) {
    condition = { category }
  }

  const data = await Product.find(condition).exec();
  return res.status(200).json(data)
}

const CreateProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  try {
    await schema.validateAsync(req.body);
    const data = await Product.create(req.body)
    return res.status(200).json(data)
  } catch (error: any) {
    return res.status(400).json(error.details)
  }
}