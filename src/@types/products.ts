import type { productsSchema } from "@/validations/products-schema"
import type { z } from "zod"

export type ProductsInputType = z.input<typeof productsSchema>
export type ProductsOutputType = z.output<typeof productsSchema>
