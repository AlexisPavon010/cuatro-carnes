import axios from "axios"

export const getOptionById = (id: string) => {
  return axios.get(`/api/options/${id}`)
}

export const createOptions = (payload: any) => {
  return axios.post('/api/options', payload)
}

export const updateOptions = (id: string, payload: any) => {
  return axios.put(`/api/options/${id}`, payload)
}

export const getItemOptionById = (id: string, itemId: string) => {
  return axios.get(`/api/items/${id}/${itemId}`)
}

export const createItemOptions = (id: string, payload: any) => {
  return axios.post(`/api/items/${id}`, payload)
}

export const updateItemOptions = (id: string, itemId: string, payload: any) => {
  return axios.put(`/api/items/${id}/${itemId}`, payload)
}

export const deletedItemOptions = (id: string, itemId: string) => {
  return axios.delete(`/api/items/${id}/${itemId}`)
}