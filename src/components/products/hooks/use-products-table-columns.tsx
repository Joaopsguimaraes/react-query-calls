import type { ProductsOutputType } from '@/@types/products'
import { ProductsStatusEnum } from '@/constants/products-status-enum'
import { DataTableColumnHeader } from '@/shared/data-table/data-table-column-header'
import type { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'

import { getBadgeColorFromStatus } from '../helpers/get-badge-color-from-status'
import { getProductStatusLabel } from '../helpers/get-products-status-label'
import { ProductsListRowOptions } from '../lists/products-list-row-option'

interface Props {
  handleOpenDetails: ((productId: string) => void) | undefined
}

export function useProductsTableColumns({ handleOpenDetails }: Props) {
  const tableColumns: ColumnDef<ProductsOutputType>[] = [
    {
      accessorKey: 'id',
      header: () => <DataTableColumnHeader title="ID" />,
      cell: ({ row }) => (
        <span className="text-medium font-sans">
          <span>{row.original.id}</span>
        </span>
      ),
    },
    {
      accessorKey: 'name',
      header: () => <DataTableColumnHeader title="Nome do produto" />,
      cell: ({ row }) => (
        <span className="text-medium font-sans">
          <span>{row.original.name}</span>
        </span>
      ),
    },
    {
      accessorKey: 'status',
      header: () => <DataTableColumnHeader title="Status" />,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2">
          <Badge
            variant={getBadgeColorFromStatus(
              row.original.status as ProductsStatusEnum
            )}
            className="w-20 items-center flex justify-center"
          >
            {getProductStatusLabel(row.original.status)}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: 'actions',
      header: () => <DataTableColumnHeader title="Ações" />,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2">
          <ProductsListRowOptions
            row={row}
            handleOpenDetails={handleOpenDetails}
          />
        </div>
      ),
    },
  ]

  return {
    tableColumns,
  }
}
