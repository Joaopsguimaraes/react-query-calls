import type { ProductsInputType } from '@/@types/products'
import { createQueryOptions } from '@/utils/create-query-option'
import { useCustomGetQuery } from '@/utils/use-custom-get-query'
import { invalidateQuery } from '@/utils/use-invalidate-query'
import type { AxiosError } from 'axios'

import { api } from '@/lib/axios'

type GetProductDetailsParams = {
  productId: string | null
}

export const getProductDetails = ({ productId }: GetProductDetailsParams) => {
  const queryKey = ['products-detail', productId]

  return createQueryOptions<
    ProductsInputType,
    AxiosError,
    GetProductDetailsParams
  >({
    queryKey,
    queryFn: async () => {
      const response = await api.get<ProductsInputType>(
        `/products/${productId}`
      )
      return response.data
    },
    variables: { productId },
    queryOptions: {
      enabled: Boolean(productId),
    },
  })
}

export function useGetProductDetails(params: GetProductDetailsParams) {
  const { queryKey, queryOptions } = getProductDetails(params)

  return useCustomGetQuery<
    ProductsInputType,
    AxiosError,
    GetProductDetailsParams
  >({
    queryKey,
    queryFn: queryOptions.queryFn,
    variables: params,
    queryOptions,
  })
}

export async function invalidateProductsList(params: GetProductDetailsParams) {
  const { invalidate } = invalidateQuery()
  const { queryKey } = getProductDetails(params)

  try {
    await invalidate({ queryKey })
  } catch (error) {
    console.error('Erro ao invalidar a query:', error)
  }
}
