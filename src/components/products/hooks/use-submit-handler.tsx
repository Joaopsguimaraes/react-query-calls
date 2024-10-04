import type {
  NewProductInputType,
  NewProductOutputType,
} from '@/@types/new-products'
import {
  SubmitErrorHandler,
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form'

import { useToast } from '@/hooks/use-toast'

import { useCreateProduct } from './use-create-product'

export type UseFormSubmitNewProduct = {
  handleSubmit: UseFormHandleSubmit<NewProductInputType, NewProductOutputType>
  onSuccessCallback?: () => void
}

export function useSubmitHandlerNewProduct({
  handleSubmit,
  onSuccessCallback,
}: UseFormSubmitNewProduct) {
  const { toast } = useToast()
  const { mutateAsync } = useCreateProduct({
    onSuccess: onSuccessCallback,
  })

  const onValid: SubmitHandler<NewProductOutputType> = async (
    data: NewProductOutputType
  ) => {
    mutateAsync(data)
  }

  const onInvalid: SubmitErrorHandler<NewProductOutputType> = (error) => {
    console.error('new product form | errors: ', error)
    toast({
      title: 'Erro ao validar dados',
      description: 'Por favor, corrija as informações prestadas no formulário.',
      variant: 'destructive',
    })
  }

  const submitHandler = handleSubmit(onValid, onInvalid)

  return { submitHandler }
}
