import type { NewProductOutputType } from '@/@types/new-products'
import { createMutationOptions } from '@/utils/create-mutation-option'
import { useCustomMutation } from '@/utils/use-custom-mutation'
import { useQueryClient, type UseMutationOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { getProductsList } from './use-get-products-list'

export type OptionsUpdateUserStatus = UseMutationOptions<
  void,
  AxiosError,
  NewProductOutputType
>

export function createProduct(options?: OptionsUpdateUserStatus) {
  const mutationFn = async (product: NewProductOutputType) => {
    await api.post<void>(`/products`, product)
  }

  return createMutationOptions<void, AxiosError, NewProductOutputType>({
    mutationFn,
    ...options,
  })
}

export function useCreateProduct(options?: OptionsUpdateUserStatus) {
  const { mutationOptions } = createProduct(options)
  const queryClient = useQueryClient()

  return useCustomMutation<void, AxiosError, NewProductOutputType>({
    mutationFn: mutationOptions.mutationFn,
    mutationOptions: {
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: getProductsList().queryKey,
        })
      },
      ...mutationOptions,
    },
  })
}
