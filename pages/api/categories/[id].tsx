import type { NextApiRequest, NextApiResponse } from 'next'
import Joi from 'joi'

import '../../../database/db'
import Category from '@/models/Category'

type Data = {
  message: string
}

const schema = Joi.object({
  name: Joi.string().min(3).required(),
  status: Joi.boolean(),
  quantity: Joi.number().required(),
});

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  switch (req.method) {
    case 'PUT':
      return updateCategory(req, res)
    case 'DELETE':
      return deleteCategory(req, res)
    default:
      return res.status(400).json({ message: 'Bad Request' })
  }
}

const updateCategory = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { id } = req.query
  try {
    await schema.validateAsync(req.body);
    const data = await Category.findByIdAndUpdate(id, req.body, { new: true })
    return res.status(200).json(data)
  } catch (error: any) {
    return res.status(400).json(error.details)
  }
}

const deleteCategory = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { id } = req.query
  try {
    const data = await Category.findByIdAndDelete(id)
    return res.status(200).json({
      message: 'success'
    })
  } catch (error: any) {
    return res.status(400).json({
      message: error.message
    })
  }
}