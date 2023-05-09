import axios from 'axios'

import { IProduct } from '@/interfaces/products'

export const createProduct = async (payload: IProduct) => {
  return axios.post('/api/products', payload)
}

export const getProductById = (id: string) => {
  return axios.get(`/api/products/${id}`)
}

export const deleteProductById = (id: string) => {
  return axios.delete(`/api/products/${id}`)
}

export const updateProductById = (id: string, payload: IProduct) => {
  return axios.put(`/api/products/${id}`, payload)
}

export const activateProductById = (id: string, payload: { status: boolean }) => {
  return axios.patch(`/api/products/${id}`, payload)
}

export const addOptionProductById = (id: string, payload: any) => {
  return axios.post(`/api/products/${id}`, payload)
}