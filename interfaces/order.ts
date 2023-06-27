export interface IOrder {
  shipping: string;
  _id: string,
  total: number,
  username: string,
  email: string,
  status: string,
  fleet?: string,
  sub_total: number
  address: string,
  reference?: string,
  payment_option: string,
  phone: string,
  createdAt: string,
  updatedAt: string,
  uniqueID: string,
  items: any
  deadline?: Date;
  cords?: [number, number]
}