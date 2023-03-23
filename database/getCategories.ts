import Category from '@/models/Category'
import '../database/db'


export const getCategories = async () => {
  const data = await Category.find()
  return JSON.parse(JSON.stringify(data))
}