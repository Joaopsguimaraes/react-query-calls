import type { ProductsStatusType } from '@/@types/products-status-type'

import { ProductsStatusEnum } from './products-status-enum'

export const productsStatusOptions: ProductsStatusType[] = [
  {
    label: 'Ativo',
    value: ProductsStatusEnum.ACTIVE,
  },
  {
    label: 'Inativo',
    value: ProductsStatusEnum.INACTIVE,
  },
  {
    label: 'Bloqueado',
    value: ProductsStatusEnum.BLOCKED,
  },
]
