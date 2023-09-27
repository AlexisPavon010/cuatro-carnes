import type { NextApiRequest, NextApiResponse } from 'next'

import { IProduct } from '@/interfaces/products'
import Product from '@/models/Product'
import '@/database/db'

type Data = {
  message: string;
} | {
  data: IProduct[];
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  switch (req.method) {
    case 'GET':
      return getProductsOffers(req, res)
    default:
      return res.status(400).json({ message: 'Bad Request' })
  }
}

const getProductsOffers = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {

  try {
    const data = await Product.find({ status: true })
    const products = data.filter(p => p.category === 'Ofertas semanales')
    return res.status(200).json(products)
  } catch (error: any) {
    console.log(error)
    return res.status(500).json({ message: error.message })
  }
}