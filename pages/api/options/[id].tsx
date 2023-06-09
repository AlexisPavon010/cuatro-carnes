import type { NextApiRequest, NextApiResponse } from 'next'
import { isValidObjectId } from 'mongoose'
import Joi from 'joi'

import '../../../database/db'
import Option from '@/models/Options'

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
    case 'GET':
      return getOptionById(req, res);
    case 'PUT':
      return updateOption(req, res)
    case 'DELETE':
      return deleteOption(req, res)
    default:
      return res.status(400).json({ message: 'Bad Request' })
  }
}

const updateOption = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { id } = req.query
  try {
    await schema.validateAsync(req.body);
    const options = await Option.findByIdAndUpdate(id, req.body, { new: true })
    return res.status(200).json(options)
  } catch (error: any) {
    return res.status(400).json(error.details)
  }
}

const deleteOption = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { id } = req.query
  try {
    const data = await Option.findByIdAndDelete(id)
    return res.status(200).json({
      message: 'success'
    })
  } catch (error: any) {
    return res.status(400).json({
      message: error.message
    })
  }
}

const getOptionById = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query
  if (!isValidObjectId(id)) return res.status(400).json({ message: 'the id is not mongo id valid' })
  const options = await Option.findById(id)
  if (!options) return res.status(404).json({ message: 'option by id not found' })

  return res.status(200).json(options)
}
