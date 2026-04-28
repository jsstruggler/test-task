import type {
  AddProductPayload,
  AddProductResponse,
  CategoryOption,
  ProductCategory,
} from '@/types/products'

import { apiClient } from './client'

const toCategoryOption = (category: ProductCategory): CategoryOption => {
  return {
    label: category,
    value: category,
  }
}

export const getProductCategories = async (): Promise<CategoryOption[]> => {
  const { data } = await apiClient.get<ProductCategory[]>(
    '/products/categories',
  )

  return data.map(toCategoryOption)
}

export const addProduct = async (
  payload: AddProductPayload,
): Promise<AddProductResponse> => {
  const { data } = await apiClient.post<AddProductResponse>(
    '/products/add',
    payload,
  )

  return data
}
