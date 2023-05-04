export interface IProduct {
  _id: string;
  title: string;
  price: number;
  image: string;
  status: boolean;
  quantity?: number;
  category: string;
  q_stock: number;
  kg_stock: number;
  description: string;
}