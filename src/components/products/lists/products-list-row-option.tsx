import type { ProductsOutputType } from '@/@types/products'
import type { Row } from '@tanstack/react-table'
import { EyeIcon, TrashIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { useHandleRemoveProduct } from '../hooks/use-handler-remove-product'

export type ProductsListRowOptionsProps = {
  row: Row<ProductsOutputType>
  handleOpenDetails: ((productId: string) => void) | undefined
}

export function ProductsListRowOptions({
  row,
  handleOpenDetails,
}: ProductsListRowOptionsProps) {
  const { handler: handleDeleteProduct } = useHandleRemoveProduct()

  return (
    <div className="flex w-20 justify-center items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          if (!handleOpenDetails) return
          handleOpenDetails(row.original.id)
        }}
      >
        <EyeIcon />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          handleDeleteProduct({ productId: row.original.id })
        }}
      >
        <TrashIcon />
      </Button>
    </div>
  )
}
