import type { ProductsInputType } from '@/@types/products'
import { createQueryOptions } from '@/utils/create-query-option'
import { useCustomGetQuery } from '@/utils/use-custom-get-query'
import { invalidateQuery } from '@/utils/use-invalidate-query'
import type { AxiosError } from 'axios'

import { api } from '@/lib/axios'

export const getProductsList = () => {
  const queryKey = ['products-list']

  return createQueryOptions<ProductsInputType[], AxiosError>({
    queryKey,
    queryFn: async () => {
      const response = await api.get<ProductsInputType[]>('/products')

      return response.data
    },
  })
}

export function useGetProductsList() {
  const { queryKey, queryOptions } = getProductsList()

  return useCustomGetQuery<ProductsInputType[], AxiosError>({
    queryKey,
    queryFn: queryOptions.queryFn,
    queryOptions,
  })
}

export async function invalidateProductsList() {
  const { invalidate } = invalidateQuery()
  const { queryKey } = getProductsList()

  try {
    await invalidate({ queryKey })
  } catch (error) {
    console.error('Erro ao invalidar a query:', error)
  }
}
