import type { NextApiRequest, NextApiResponse } from 'next'
import Joi from 'joi';

import '../../../database/db'
import Category from '@/models/Category'

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
});

type Data = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  switch (req.method) {
    case 'GET':
      return getCategories(req, res)
    case 'POST':
      return createCategory(req, res)
    default:
      return res.status(400).json({ message: 'Bad Request' })
  }
}

const getCategories = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { search } = req.query

  let condition = {}

  if (search) {
    condition = {
      $text: { $search: search.toString().toLowerCase() }
    }
  }

  const data = await Category.find(condition)
  return res.status(200).json(data)
}

const createCategory = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {

  console.log(req.body)

  try {
    await schema.validateAsync(req.body);
    const data = await Category.create(req.body)
    return res.status(200).json(data)
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: error })
  }
}