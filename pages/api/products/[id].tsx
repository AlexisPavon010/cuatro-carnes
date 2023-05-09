import type { NextApiRequest, NextApiResponse } from 'next'

import Product from '@/models/Product'
import '../../../database/db'

type Data = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  switch (req.method) {
    case 'GET':
      return getProductsById(req, res)
    case 'POST':
      return addOptionToProduct(req, res)
    case 'PUT':
      return updateProductsById(req, res)
    case 'DELETE':
      return deleteProduct(req, res)
    case 'PATCH':
      return activateProduct(req, res)
    default:
      return res.status(400).json({ message: 'Bad Request' })
  }
}

const getProductsById = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { id } = req.query
  const data = await Product.findById(id);
  if (!data) return res.status(404).json({ message: `El Produto por le id: ${id} no fue encontrado` })
  return res.status(200).json(data)
}

const deleteProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { id } = req.query
  try {
    const data = await Product.findByIdAndDelete(id)
    return res.status(200).json(data)
  } catch (error: any) {
    return res.status(400).json(error.details)
  }
}

const updateProductsById = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { id } = req.query
  try {
    const data = await Product.findByIdAndUpdate(id, req.body, { new: true })
    return res.status(200).json(data)
  } catch (error: any) {
    return res.status(400).json(error.details)
  }
}

const activateProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { id } = req.query
  try {
    const data = await Product.findByIdAndUpdate(id, req.body)
    return res.status(200).json(data)
  } catch (error: any) {
    return res.status(400).json(error.details)
  }
}

const addOptionToProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { id } = req.query

  console.log(req.body)

  try {
    const product = await Product.findById(id)

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }

    product.options = [...req.body]
    await product.save()
    return res.status(201).json(product)
  } catch (error: any) {
    return res.status(400).json(error.details)
  }
}