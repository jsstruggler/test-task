import { useCallback, useEffect, useState } from 'react'

import { getProductCategories } from '@/api/products'
import type { CategoryOption } from '@/types/products'

interface UseProductCategoriesResult {
  categories: CategoryOption[]
  error: string | null
  isLoading: boolean
  refetch: () => void
}

export const useProductCategories = (): UseProductCategoriesResult => {
  const [categories, setCategories] = useState<CategoryOption[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [requestVersion, setRequestVersion] = useState(0)

  const refetch = useCallback(() => {
    setRequestVersion((version) => version + 1)
  }, [])

  useEffect(() => {
    let isMounted = true

    const loadCategories = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const categoryOptions = await getProductCategories()

        if (isMounted) {
          setCategories(categoryOptions)
        }
      } catch {
        if (isMounted) {
          setError('Не удалось загрузить список мест работы.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void loadCategories()

    return () => {
      isMounted = false
    }
  }, [requestVersion])

  return {
    categories,
    error,
    isLoading,
    refetch,
  }
}
