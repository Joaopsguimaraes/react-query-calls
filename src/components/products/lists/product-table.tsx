'use client'

import { useMemo, useRef } from 'react'
import { DataTable } from '@/shared/data-table'
import { productsSchema } from '@/validations/products-schema'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

import { useGetProductsList } from '../hooks/use-get-products-list'
import { useProductsTableColumns } from '../hooks/use-products-table-columns'
import {
  NewProductDialog,
  type NewProductDialogRef,
} from '../new-product-dialog'
import { ProductDetail, type ProductDetailRefProps } from '../product-detail'

export function ProductsTable() {
  const { data, isLoading, isFetching } = useGetProductsList()

  const dataMapped = useMemo(() => {
    if (data) {
      return data.map((item) => {
        return productsSchema.parse(item)
      })
    }
    return []
  }, [data])

  const showProductDetail = useRef<ProductDetailRefProps>(null)

  const registerNewProduct = useRef<NewProductDialogRef>(null)

  const handleOpenShowProductDetail = showProductDetail.current?.open

  const handleOpenRegisterNewProduct = registerNewProduct.current?.open

  const { tableColumns } = useProductsTableColumns({
    handleOpenDetails: handleOpenShowProductDetail,
  })

  return (
    <DataTable.Root limit={10} columns={tableColumns} data={dataMapped}>
      <Card>
        <CardHeader className="flex flex-row justify-between items-center w-full">
          <CardTitle>Lista de Produtos</CardTitle>
          <Button onClick={handleOpenRegisterNewProduct}>
            Cadastrar produto
          </Button>
        </CardHeader>
        <CardContent className="flex w-full flex-col gap-8 p-5">
          {isLoading || isFetching ? (
            <Skeleton className="h-56 mt-6 w-full" />
          ) : (
            <DataTable.Main />
          )}
        </CardContent>
      </Card>
      <ProductDetail ref={showProductDetail} />
      <NewProductDialog ref={registerNewProduct} />
    </DataTable.Root>
  )
}
