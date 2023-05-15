import { IOption } from "./options";

export interface IProduct {
  stock: string;
  _id: string;
  title: string;
  price: number;
  image: string;
  status: boolean;
  options?: IOption[];
  quantity?: number;
  category: string;
  q_stock: number;
  kg_stock: number;
  description: string;
  offert_price: number;
}