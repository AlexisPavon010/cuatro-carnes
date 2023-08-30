import { IProduct } from "@/interfaces/products"

export const getProductsOffer = (data: IProduct[]) => {
    const limit = 6;

    const products = data.filter((p: IProduct) => p.category === 'Ofertas semanales')
    const compareRandom = () => Math.random() - 0.5;

    if (products.length === 0) {
        const shuffledProducts = data.sort(compareRandom);
        const randomLimitedProducts = shuffledProducts.slice(0, limit);
        return randomLimitedProducts
    }

    return products
}