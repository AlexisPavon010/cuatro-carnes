import axios from "axios"

export const createOrder = (payload: any) => {
  return axios.post('/api/order', payload)
}

export const updateOrder = (id: string, status: string) => {
  return axios.put(`/api/order/${id}`, {
    status
  })
}