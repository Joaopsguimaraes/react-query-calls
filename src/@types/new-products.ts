import type { newProductSchema } from "@/validations/new-product-schema"
import type { z } from "zod"

export type NewProductInputType = z.input<typeof newProductSchema>
export type NewProductOutputType = z.output<typeof newProductSchema>
