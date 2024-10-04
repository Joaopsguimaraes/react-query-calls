import { forwardRef, useImperativeHandle, useMemo, useState } from 'react'
import type {
  NewProductInputType,
  NewProductOutputType,
} from '@/@types/new-products'
import { ProductsStatusEnum } from '@/constants/products-status-enum'
import { productsStatusOptions } from '@/constants/products-status-options'
import { RenderField } from '@/shared/form/RenderField'
import { newProductSchema } from '@/validations/new-product-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Form } from '../ui/form'
import { useGetProductsCategories } from './hooks/use-get-categories'
import { useSubmitHandlerNewProduct } from './hooks/use-submit-handler'

export type NewProductDialogRef = {
  open: () => void
  close: () => void
}

export const NewProductDialog = forwardRef<NewProductDialogRef, unknown>(
  (_, ref) => {
    const [state, setState] = useState<boolean>(false)
    const open = state
    const { data: categories } = useGetProductsCategories()
    const form = useForm<NewProductInputType, unknown, NewProductOutputType>({
      resolver: zodResolver(newProductSchema),
      defaultValues: {
        status: ProductsStatusEnum.ACTIVE,
      },
    })
    const { handleSubmit } = form

    const { submitHandler } = useSubmitHandlerNewProduct({
      handleSubmit,
      onSuccessCallback() {
        form.reset()
        handleClose()
      },
    })

    const categoriesOptions = useMemo(
      () =>
        categories
          ?.map((state) => ({
            value: state.id,
            label: state.name,
          }))
          .sort((a, b) => (a.label > b.label ? 1 : -1)) ?? [],
      [categories]
    )

    const handleOpen = () => {
      setState(true)
    }

    const handleClose = () => {
      setState(false)
    }

    useImperativeHandle(ref, () => ({
      open: handleOpen,
      close: handleClose,
    }))

    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-screen-sm flex-col p-0">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle className="flex items-center gap-2">
              Cadastro do cliente
            </DialogTitle>
          </DialogHeader>
          <div className="flex w-full grow items-center justify-center px-5 py-2">
            <Form {...form}>
              <form
                className="flex w-full grow flex-col gap-4"
                onSubmit={submitHandler}
              >
                <div className="grid w-full grid-cols-12 gap-4">
                  <RenderField<
                    NewProductInputType,
                    unknown,
                    NewProductOutputType
                  >
                    form={form}
                    slot={{
                      name: 'name',
                      label: 'Nome:',
                      placeholderKey: 'Ex: iPhone 16 PRO',
                      type: 'text',
                      className: 'col-span-6',
                    }}
                  />
                  <RenderField<
                    NewProductInputType,
                    unknown,
                    NewProductOutputType
                  >
                    form={form}
                    slot={{
                      name: 'categoryId',
                      label: 'Categoria:',
                      options: categoriesOptions,
                      type: 'select',
                      className: 'col-span-6',
                    }}
                  />
                  <RenderField<
                    NewProductInputType,
                    unknown,
                    NewProductOutputType
                  >
                    form={form}
                    slot={{
                      name: 'cost',
                      label: 'Custo:',
                      placeholderKey: 'Ex: R$ 400.00',
                      type: 'currency',
                      className: 'col-span-6',
                    }}
                  />
                  <RenderField<
                    NewProductInputType,
                    unknown,
                    NewProductOutputType
                  >
                    form={form}
                    slot={{
                      name: 'value',
                      label: 'Valor de venda:',
                      placeholderKey: 'Ex: R$ 800.00',
                      type: 'currency',
                      className: 'col-span-6',
                    }}
                  />
                  <RenderField<
                    NewProductInputType,
                    unknown,
                    NewProductOutputType
                  >
                    form={form}
                    slot={{
                      name: 'status',
                      label: 'Status:',
                      options: productsStatusOptions,
                      type: 'select',
                      className: 'col-span-12',
                    }}
                  />
                </div>
                <div className="ml-auto py-2">
                  <DialogClose asChild>
                    <Button type="button" variant="outline" className="mr-4">
                      Cancelar
                    </Button>
                  </DialogClose>
                  <Button type="submit">Cadastrar</Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    )
  }
)

NewProductDialog.displayName = 'ProductDetailRef'
