/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type PaginationState,
  type Table as TableType,
  type VisibilityState,
} from '@tanstack/react-table'

interface DataTableContextProps<TData> {
  table: TableType<TData>
  manualPagination: boolean
  limit: number
  isLoading?: boolean
}

type DataTableProviderProps<TData, TValue> = {
  data: TData[]
  columns: ColumnDef<TData, TValue>[]
  columnsVisibility?: VisibilityState
  total?: number
  page?: number
  limit: number
  children: ReactNode
  isLoading?: boolean
}

export const DataTableContext = createContext<DataTableContextProps<any>>(
  {} as any
)

export function DataTableProvider<TData, TValue>({
  children,
  columns,
  data,
  limit,
  page,
  columnsVisibility,
  total,
  isLoading = false,
}: DataTableProviderProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const manualPagination = page !== undefined && total !== undefined

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: page ? page - 1 : 0,
    pageSize: limit,
  })

  useEffect(() => {
    if (columnsVisibility) {
      setColumnVisibility(columnsVisibility)
    }
  }, [columnsVisibility])

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    autoResetPageIndex: false,
    pageCount: manualPagination ? Math.ceil(total / limit) : undefined,
    state: {
      columnVisibility,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
  })

  return (
    <DataTableContext.Provider
      value={{ limit, manualPagination, table, isLoading }}
    >
      {children}
    </DataTableContext.Provider>
  )
}

export function useDataTableContext<TData>() {
  const context = useContext(DataTableContext) as DataTableContextProps<TData>

  if (!context) {
    throw new Error(
      'useDataTableContext must be used within a DataTableProvider'
    )
  }

  return context
}
