import { ProductsStatusEnum } from '@/constants/products-status-enum'

export function getProductStatusLabel(status: ProductsStatusEnum | null) {
  switch (status) {
    case ProductsStatusEnum.ACTIVE:
      return 'Ativo'
    case ProductsStatusEnum.BLOCKED:
      return 'Bloqueado'
    case ProductsStatusEnum.INACTIVE:
      return 'Inativo'
    default:
      return 'N/A'
  }
}
