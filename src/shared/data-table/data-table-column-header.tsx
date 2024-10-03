import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
} from '@radix-ui/react-icons'
import { type Column } from '@tanstack/react-table'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column?: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column?.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn(className, 'data-[state=open]:bg-accent')}
          size="sm"
          variant="ghost"
        >
          <span className="text-foreground font-sans text-sm font-bold">
            {title}
          </span>
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="ml-2 size-4" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="ml-2 size-4" />
          ) : (
            <CaretSortIcon className="ml-2 size-4" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
          <ArrowUpIcon className="text-muted-foreground/70 mr-2 size-3.5 font-sans" />
          Crescente
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
          <ArrowDownIcon className="text-muted-foreground/70 mr-2 size-3.5 font-sans" />
          Decrescente
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
