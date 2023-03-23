import Product from '@/models/Product'
import '../database/db'


export const getProducts = async () => {
  const data = await Product.find()
  return JSON.parse(JSON.stringify(data))
}