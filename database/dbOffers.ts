import Product from '@/models/Product';
import './db';

export const getProductsOffers = async () => {

  const data = await Product.find()

  const products = data.filter(p => p.category === 'Ofertas semanales')

  return JSON.parse(JSON.stringify(products))
}