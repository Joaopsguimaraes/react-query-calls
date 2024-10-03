import { ProductsStatusEnum } from '@/constants/products-status-enum'
import { z } from 'zod'

const transformFromCurrencyToNumber: (value: string) => number = (
  value: string
) => {
  if (value.includes('R$')) {
    return parseFloat(value.replace('R$', '').replace(',', '.'))
  }
  return parseFloat(value)
}

export const newProductSchema = z.object({
  status: z.custom<ProductsStatusEnum>().default(ProductsStatusEnum.ACTIVE),
  name: z.string().default(''),
  cost: z.string().default('').transform(transformFromCurrencyToNumber),
  value: z.string().default('').transform(transformFromCurrencyToNumber),
  categoryId: z.custom<string>().default(''),
})
