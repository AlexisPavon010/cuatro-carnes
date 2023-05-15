import axios from "axios";

import { IOrder } from "@/interfaces/order";

export const sendSucces = (payload: IOrder) => {
  return axios.post('/api/email/success', payload)
}