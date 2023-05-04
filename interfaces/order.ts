export interface IOrder {
  _id: string,
  total: number,
  username: string,
  email: string,
  status: string,
  createdAt: string,
  updatedAt: string,
  uniqueID: string,
  items: any
  cords?: [number, number]
}