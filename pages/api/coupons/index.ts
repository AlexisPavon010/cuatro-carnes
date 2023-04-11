import Joi from 'joi';
import type { NextApiRequest, NextApiResponse } from 'next'

import Coupons from '@/models/Coupons';

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  discount: Joi.number().required(),
})

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method) {
    case 'GET':
      return getCoupons(req, res);
    case 'POST':
      return createCoupons(req, res);
    default:
      return res.status(400).json({ message: 'Bad Request' })
  }
}

const getCoupons = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    const data = await Coupons.find({})
    res.status(200).json(data)
  } catch (error: any) {
    res.status(400).json(error.details)
  }
}

const createCoupons = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  console.log(req.body)
  try {
    await schema.validateAsync(req.body);
    const data = await Coupons.create(req.body)
    res.status(200).json(data)
  } catch (error: any) {
    res.status(400).json(error.details)
  }
}

