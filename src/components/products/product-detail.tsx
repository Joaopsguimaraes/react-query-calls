import {
  forwardRef,
  useImperativeHandle,
  useState,
  type HTMLAttributes,
} from 'react'
import type { ProductsStatusEnum } from '@/constants/products-status-enum'

import { cn } from '@/lib/utils'

import { Badge } from '../ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Skeleton } from '../ui/skeleton'
import { getBadgeColorFromStatus } from './helpers/get-badge-color-from-status'
import { getProductStatusLabel } from './helpers/get-products-status-label'
import { priceFormatter } from './helpers/price-formatter'
import { useGetProductDetails } from './hooks/use-get-product-detail'

export type ProductDetailRefProps = {
  open: (productId: string) => void
  close: () => void
}

export const ProductDetail = forwardRef<ProductDetailRefProps, unknown>(
  (_, ref) => {
    const [state, setState] = useState<string | null>(null)

    const open = Boolean(state)

    const handleOpen = (productId: string) => {
      setState(productId)
    }

    const handleClose = () => {
      setState(null)
    }

    useImperativeHandle(ref, () => ({
      open: handleOpen,
      close: handleClose,
    }))

    const { data, isLoading } = useGetProductDetails({
      productId: state,
    })

    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="flex  flex-col p-0">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle className="flex items-center gap-2">
              <span>Detalhe do produto - {data?.name}</span>
              {data && (
                <Badge
                  variant={getBadgeColorFromStatus(
                    data.status as ProductsStatusEnum
                  )}
                  className="w-20 items-center flex justify-center"
                >
                  {getProductStatusLabel(data.status as ProductsStatusEnum)}
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>
          <div className="flex w-full px-5 py-10 items-center justify-center grow">
            <DoubleColumnValueComponent
              label="ID"
              value={data?.id || ''}
              className="w-1/2 flex flex-col gap-2"
            />
            <DoubleColumnValueComponent
              label="Nome"
              value={data?.name || ''}
              className="w-1/2 flex flex-col gap-2"
            />
            <DoubleColumnValueComponent
              label="Custo"
              value={priceFormatter.format(data?.cost as number) || ''}
              className="w-1/2 flex flex-col gap-2"
            />
            <DoubleColumnValueComponent
              label="Preço"
              value={priceFormatter.format(data?.value as number) || ''}
              className="w-1/2 flex flex-col gap-2"
            />
          </div>
          {isLoading && <Skeleton className="h-52 w-full" />}
        </DialogContent>
      </Dialog>
    )
  }
)

ProductDetail.displayName = 'ProductDetailRef'

type DoubleColumnValueComponentProps = HTMLAttributes<HTMLDivElement> & {
  label: string
  value: string | number
}

function DoubleColumnValueComponent({
  label,
  value,
  ...rest
}: DoubleColumnValueComponentProps) {
  return (
    <div className={cn('flex flex-col gap-2 p-4', rest.className)} {...rest}>
      <span className="text-medium font-semibold font-sans">{label}</span>
      <span className="text-medium font-sans">{value}</span>
    </div>
  )
}
