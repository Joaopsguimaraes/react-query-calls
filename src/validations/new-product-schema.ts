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
  status: z.custom<ProductsStatusEnum>(),
  name: z.string(),
  cost: z.string().transform(transformFromCurrencyToNumber),
  value: z.string().transform(transformFromCurrencyToNumber),
  categoryId: z.custom<string>(),
})
