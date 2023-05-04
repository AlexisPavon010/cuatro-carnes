import { isValidObjectId } from "mongoose";

import Order from "@/models/Order";
import "./db";

export const getOrdersByUser = async (id: string) => {

  if (!isValidObjectId(id)) {
    return []
  }

  const orders = await Order.find({ userID: id }).sort({ createdAt: 'desc' }).lean()

  return JSON.parse(JSON.stringify(orders))
}



export const getOrdersById = async (id: string) => {

  const order = await Order.findById(id).lean()

  return JSON.parse(JSON.stringify(order))
}