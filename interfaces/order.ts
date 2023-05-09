export interface IOrder {
  _id: string,
  total: number,
  username: string,
  email: string,
  status: string,
  address: string,
  reference?: string,
  paymentOption?: string,
  phone: string,
  createdAt: string,
  updatedAt: string,
  uniqueID: string,
  items: any
  cords?: [number, number]
}