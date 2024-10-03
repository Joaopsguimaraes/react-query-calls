import type { RemoveProductParamsAction } from '@/@types/remove-product-params-action'
import { createMutationOptions } from '@/utils/create-mutation-option'
import { useCustomMutation } from '@/utils/use-custom-mutation'
import { useQueryClient, type UseMutationOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { api } from '@/lib/axios'
import { useToast } from '@/hooks/use-toast'

import { getProductsList } from './use-get-products-list'

type OptionsUpdateUserStatus = UseMutationOptions<
  void,
  AxiosError,
  RemoveProductParamsAction
>

export function deleteProduct(options?: OptionsUpdateUserStatus) {
  const mutationFn = async ({ productId }: RemoveProductParamsAction) => {
    await api.put<void>(`/products/${productId}`)
  }

  return createMutationOptions<void, AxiosError, RemoveProductParamsAction>({
    mutationFn,
    ...options,
  })
}

export function useDeleteProduct(options?: OptionsUpdateUserStatus) {
  const { mutationOptions } = deleteProduct(options)
  const { toast } = useToast()
  const queryClient = useQueryClient()

  return useCustomMutation<void, AxiosError, RemoveProductParamsAction>({
    mutationFn: mutationOptions.mutationFn,
    mutationOptions: {
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: getProductsList().queryKey,
        })
      },
      onError: (error: AxiosError) => {
        const description =
          'message' in error ? error.message : 'Erro ao remove produto'

        toast({
          title: 'Erro ao remove produto',
          description,
          variant: 'destructive',
        })
      },
    },
  })
}
