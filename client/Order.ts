import axios from "axios"

export const createOrder = (payload: any) => {
  return axios.post('/api/order', payload)
}

export const updateOrder = (id: string, payload: any) => {
  return axios.put(`/api/order/${id}`, payload)
}