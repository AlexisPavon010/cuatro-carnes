import axios from "axios"

export const createOrder = (payload: any) => {
  return axios.post('/api/order', payload)
}