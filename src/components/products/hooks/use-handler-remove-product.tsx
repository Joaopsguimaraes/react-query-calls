import type { RemoveProductParamsAction } from '@/@types/remove-product-params-action'
import { useAsyncConfirmationDialog } from '@/shared/async-confirmation-dialog'

import { useToast } from '@/hooks/use-toast'

import { useDeleteProduct } from './use-delete-product'

export function useHandleRemoveProduct(onSuccessCallback?: () => void) {
  const { toast } = useToast()
  const handleConfirmation = useAsyncConfirmationDialog()
  const { mutate, isPending } = useDeleteProduct({
    onSuccess: () => {
      toast({
        title: 'Produto excluído com sucesso!',
        variant: 'default',
      })

      onSuccessCallback?.()
    },
  })

  async function handler(data: RemoveProductParamsAction) {
    const result = await handleConfirmation({
      dialogTitle: 'Deseja remover este produto?',
      dialogDescription: 'Essa ação não pode ser revertida!',
      dialogAction: 'Sim',
      dialogCancel: 'Não',
    })

    if (!result) return

    mutate(data)
  }

  return {
    isPending,
    handler,
  }
}
