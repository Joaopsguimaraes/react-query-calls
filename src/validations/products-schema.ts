import { ProductsStatusEnum } from '@/constants/products-status-enum'
import { z } from 'zod'

export const productsSchema = z.object({
  id: z.custom<string>().default(''),
  status: z.custom<string>().transform((value) => {
    switch (value) {
      case 'active':
        return ProductsStatusEnum.ACTIVE
      case 'blocked':
        return ProductsStatusEnum.BLOCKED
      case 'inactive':
        return ProductsStatusEnum.INACTIVE
      default:
        return ProductsStatusEnum.NA
    }
  }),
  name: z.string().default(''),
  cost: z.number().default(0),
  value: z.number().default(0),
  categoryId: z.custom<string>().default(''),
})
