import type { NextApiRequest, NextApiResponse } from 'next'

import { ICategories } from '@/interfaces/categories'
import { IProduct } from '@/interfaces/products'
import Category from '@/models/Category'
import Product from '@/models/Product'
import '@/database/db'

type Data = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  switch (req.method) {
    case 'GET':
      return getProducts(req, res)
    default:
      return res.status(400).json({ message: 'Bad Request' })
  }
}

const getProducts = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {

  const [categories, products] = await Promise.all([
    Category.find().sort({ name: 1 }).lean(),
    Product.find({ status: true }).lean()
  ])

  // Filtración por categoría
  function filterProductsByCategory(categories: ICategories[], products: IProduct[]) {
    const filteredProductsByCategory = {};

    categories.forEach((category) => {
      const filteredProducts = products.filter((product: IProduct) => {
        return product.category === category.name;
      });

      if (filteredProducts.length > 0) {
        // @ts-ignore
        filteredProductsByCategory[category.name] = {
          name: category.name,
          products: filteredProducts,
        };
      }
    });

    return Object.values(filteredProductsByCategory);
  }

  // Filtración por ofertas
  function filterProductsByOffers(products: IProduct[]) {
    return products.filter((product) => product.category === 'Ofertas semanales');
  }

  // // Aplica las filtraciones
  const filteredByCategory = filterProductsByCategory(categories, products);
  const filteredByOffers = filterProductsByOffers(products);

  return res.status(200).json({
    feed: filteredByCategory,
    offers: filteredByOffers,
    categories,
  })
}