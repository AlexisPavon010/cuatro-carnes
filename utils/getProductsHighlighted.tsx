import { IProduct } from "@/interfaces/products"

export const getProductsHighlighted = (data: IProduct[]) => {
  const limit = 6;

  const products = data.filter((p: IProduct) => p.is_highlighted === true)
  const compareRandom = () => Math.random() - 0.5;

  if (products.length === 0) {
    const shuffledProducts = data.sort(compareRandom);
    const randomLimitedProducts = shuffledProducts.slice(0, limit);
    return randomLimitedProducts
  }

  return products
}