import { useMemo } from 'react'
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
import { Form } from '../ui/form'
import { useGetProductsCategories } from './hooks/use-get-categories'

interface Props {
  closeDialog: () => void
}

export function NewProductForm({ closeDialog }: Props) {
  const { data: categories } = useGetProductsCategories()
  const form = useForm<NewProductInputType, NewProductOutputType>({
    resolver: zodResolver(newProductSchema),
    defaultValues: {
      status: ProductsStatusEnum.ACTIVE,
    },
  })

  const submitHandler = form.handleSubmit((data) => {
    console.log(data)
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

  return (
    <Form {...form}>
      <form
        className="flex grow w-full flex-col gap-4"
        onSubmit={submitHandler}
      >
        <div className="grid w-full grid-cols-12 gap-4">
          <RenderField<NewProductInputType, NewProductOutputType>
            form={form}
            slot={{
              name: 'name',
              label: 'Nome:',
              placeholderKey: 'Ex: iPhone 16 PRO',
              type: 'text',
              className: 'col-span-6',
            }}
          />
          <RenderField<NewProductInputType, NewProductOutputType>
            form={form}
            slot={{
              name: 'categoryId',
              label: 'Categoria:',
              options: categoriesOptions,
              type: 'select',
              className: 'col-span-6',
            }}
          />
          <RenderField<NewProductInputType, NewProductOutputType>
            form={form}
            slot={{
              name: 'cost',
              label: 'Custo:',
              placeholderKey: 'Ex: R$ 400.00',
              type: 'currency',
              className: 'col-span-6',
            }}
          />
          <RenderField<NewProductInputType, NewProductOutputType>
            form={form}
            slot={{
              name: 'value',
              label: 'Valor de venda:',
              placeholderKey: 'Ex: R$ 800.00',
              type: 'currency',
              className: 'col-span-6',
            }}
          />
          <RenderField<NewProductInputType, NewProductOutputType>
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
          <Button
            type="button"
            variant="outline"
            className="mr-4"
            onClick={closeDialog}
          >
            Cancelar
          </Button>
          <Button type="submit">Cadastrar</Button>
        </div>
      </form>
    </Form>
  )
}
