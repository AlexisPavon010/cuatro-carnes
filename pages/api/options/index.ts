import type { NextApiRequest, NextApiResponse } from 'next'
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
      return getOptions(req, res);
    case 'POST':
      return CreateOption(req, res);
    default:
      return res.status(400).json({ message: 'Bad Request' })
  }
}

const getOptions = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const data = await Option.find({});
  return res.status(200).json(data)
}

const CreateOption = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  try {
    await schema.validateAsync(req.body);
    const data = await Option.create(req.body)
    return res.status(200).json(data)
  } catch (error: any) {
    return res.status(400).json(error.details)
  }
}