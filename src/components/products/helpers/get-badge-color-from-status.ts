import { ProductsStatusEnum } from '@/constants/products-status-enum'

export const getBadgeColorFromStatus = (status: ProductsStatusEnum) => {
  switch (status) {
    case ProductsStatusEnum.ACTIVE:
      return 'default'
    case ProductsStatusEnum.INACTIVE:
      return 'secondary'
    case ProductsStatusEnum.BLOCKED:
      return 'destructive'
    default:
      return 'outline'
  }
}
