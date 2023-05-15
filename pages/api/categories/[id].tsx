import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidObjectId } from 'mongoose';
import Joi from 'joi';

import '../../../database/db';
import Category from '@/models/Category';

type Data = {
  message: string
}

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  description: Joi.string()
});

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  switch (req.method) {
    case 'GET':
      return getCategoryById(req, res)
    case 'PUT':
      return updateCategory(req, res)
    case 'DELETE':
      return deleteCategory(req, res)
    default:
      return res.status(400).json({ message: 'Bad Request' })
  }
}

const getCategoryById = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { id } = req.query
  if (!isValidObjectId(id)) return res.status(400).json({ message: 'the id is not valid mongo id' })
  try {
    const data = await Category.findById(id)
    if (!data) return res.status(404).json({ message: 'category not found' })
    return res.status(200).json(data)
  } catch (error: any) {
    return res.status(400).json(error.details)
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