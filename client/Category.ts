import axios from "axios"

import { ICategories } from "@/interfaces/categories"

export const createCategory = async (payload: ICategories) => {
  return axios.post('/api/categories', payload)
}

export const getCategoryById = (id: string) => {
  return axios.get(`/api/categories/${id}`)
}

export const deleteCategoryById = (id: string) => {
  return axios.delete(`/api/categories/${id}`)
}

export const updateCategoryById = (id: string, payload: ICategories) => {
  return axios.put(`/api/categories/${id}`, payload)
}