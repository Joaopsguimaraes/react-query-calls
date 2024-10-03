'use client'

import { useCallback, useMemo } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { useDataTableContext } from './data-table-provider'

export function DataTablePagination() {
  const { manualPagination, table } = useDataTableContext()
  const router = useRouter()
  const searchParams = useSearchParams()

  const newParams = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  )
  const pathname = usePathname()

  const lastPageIndex = table.getPageCount()
  const firstPageIndex = 1

  const nextPageIndex = Math.min(
    table.getState().pagination.pageIndex + 2,
    lastPageIndex
  )

  const previousPageIndex = Math.max(
    table.getState().pagination.pageIndex,
    firstPageIndex
  )

  const pageSearch = 'page'
  const perPageSearch = 'perPage'

  const updateCurrentPage = useCallback(
    (pageIndex: number) => {
      if (!manualPagination) {
        return table.setPageIndex(pageIndex - 1)
      }

      newParams.delete(pageSearch)
      newParams.set(pageSearch, `${pageIndex}`)

      const newPath = `${pathname}?${newParams.toString()}`
      router.push(newPath)
    },
    [manualPagination, newParams, pageSearch, pathname, router, table]
  )

  const updatePageSize = useCallback(
    (pageSize: string) => {
      if (!manualPagination) {
        return table.setPageSize(Number(pageSize))
      }

      newParams.set(perPageSearch, `${pageSize}`)
      newParams.delete(pageSearch)
      router.push(`${pathname}?${newParams.toString()}`)
    },
    [
      manualPagination,
      newParams,
      pageSearch,
      pathname,
      perPageSearch,
      router,
      table,
    ]
  )

  return (
    <div className="flex items-center justify-between px-2 ">
      <div className="flex w-full items-center space-x-2">
        <p className="text-sm font-medium">Linhas por pagina</p>
        <Select
          onValueChange={updatePageSize}
          value={`${table.getState().pagination.pageSize}`}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {Array.from(new Set([10, 20, 30, 40, 50]))
              .sort((a, b) => a - b)
              .map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center w-52 justify-center text-sm font-medium">
          Pagina {table.getState().pagination.pageIndex + 1} de {lastPageIndex}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            className="size-8 p-2"
            disabled={!table.getCanPreviousPage()}
            onClick={() => updateCurrentPage(firstPageIndex)}
            size="icon"
            variant="outline"
          >
            <ChevronsLeftIcon className="size-4" />
          </Button>
          <Button
            className="size-8 p-2"
            disabled={!table.getCanPreviousPage()}
            onClick={() => updateCurrentPage(previousPageIndex)}
            size="icon"
            variant="outline"
          >
            <ChevronLeftIcon className="size-4" />
          </Button>
          <Button
            className="size-8 p-2"
            disabled={!table.getCanNextPage()}
            onClick={() => updateCurrentPage(nextPageIndex)}
            size="icon"
            variant="outline"
          >
            <ChevronRightIcon className="size-4" />
          </Button>
          <Button
            className="size-8 p-2"
            disabled={!table.getCanNextPage()}
            onClick={() => updateCurrentPage(lastPageIndex)}
            size="icon"
            variant="outline"
          >
            <ChevronsRightIcon className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
