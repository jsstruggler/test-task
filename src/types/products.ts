export type ProductCategory = string

export interface CategoryOption {
  label: string
  value: string
}

export interface AddProductPayload {
  title: string
}

export interface AddProductResponse {
  id: number
  title: string
}
