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
      return getProductsHighlighted(req, res)
    default:
      return res.status(400).json({ message: 'Bad Request' })
  }
}

const getProductsHighlighted = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const limit = 6;

  try {
    const data = await Product.find({ status: true })
    const compareRandom = () => Math.random() - 0.5;

    const products = data.filter((p: IProduct) => p.is_highlighted === true)

    if (products.length === 0) {
      const shuffledProducts = data.sort(compareRandom);
      const randomLimitedProducts = shuffledProducts.slice(0, limit);
      return res.status(200).json(randomLimitedProducts)
    }

    return res.status(200).json(products)
  } catch (error: any) {
    console.log(error)
    return res.status(500).json({ message: error.message })
  }
}