import type { Category } from '@/@types/category'
import { createQueryOptions } from '@/utils/create-query-option'
import { useCustomGetQuery } from '@/utils/use-custom-get-query'
import { invalidateQuery } from '@/utils/use-invalidate-query'
import type { AxiosError } from 'axios'

import { api } from '@/lib/axios'

export const getProductsCategories = () => {
  const queryKey = ['product-categories']

  return createQueryOptions<Category[], AxiosError>({
    queryKey,
    queryFn: async () => {
      const response = await api.get<Category[]>('/categories')

      return response.data
    },
  })
}

export function useGetProductsCategories() {
  const { queryKey, queryOptions } = getProductsCategories()

  return useCustomGetQuery<Category[], AxiosError>({
    queryKey,
    queryFn: queryOptions.queryFn,
    queryOptions,
  })
}

export async function invalidateProductsLCategories() {
  const { invalidate } = invalidateQuery()
  const { queryKey } = getProductsCategories()

  try {
    await invalidate({ queryKey })
  } catch (error) {
    console.error('Erro ao invalidar a query:', error)
  }
}
