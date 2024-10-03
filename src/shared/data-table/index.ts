import { DataTableMain } from './data-table-main'
import { DataTablePagination } from './data-table-pagination'
import { DataTableProvider, useDataTableContext } from './data-table-provider'
import { DataTableToolbar } from './data-table-toolbar'

export const DataTable = {
  Main: DataTableMain,
  Pagination: DataTablePagination,
  Root: DataTableProvider,
  Toolbar: DataTableToolbar,
  useDataTableContext,
}
