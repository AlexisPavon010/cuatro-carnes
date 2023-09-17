import { IOption } from "./options";

export interface IProduct {
  stock: string;
  _id: string;
  title: string;
  price: number;
  image: string;
  status: boolean;
  is_new: boolean;
  is_offer: boolean;
  options?: IOption[];
  quantity?: number;
  category: string;
  description: string;
  offert_price: number;
  offer_quantity: number;
  is_offer_quantity: boolean;
  offer_quantity_price: number;
}