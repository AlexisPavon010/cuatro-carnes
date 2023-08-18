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
  offert_price: Joi.number(),
  product_code: Joi.number(),
  category: Joi.string().min(3).required(),
  image: Joi.string().required(),
  q_stock: Joi.number(),
  kg_stock: Joi.number(),
  stock: Joi.string(),
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
  const { category, term = '' } = req.query

  console.log(term)

  let condition = {}

  if (category) {
    condition = { ...condition, category }
  }

  if (term) {
    condition = {
      ...condition,
      $text: { $search: term }
    }
  }



  const data = await Product.find(condition).sort({ title: 1 }).lean();
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
    console.log(error)
    return res.status(400).json(error.details)
  }
}