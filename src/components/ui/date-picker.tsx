/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormFields } from '@/@types/form-field'
import { CalendarIcon } from 'lucide-react'
import { DateTime } from 'luxon'
import { ControllerRenderProps, FieldValues } from 'react-hook-form'
import { useBoolean } from 'usehooks-ts'

import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface Props<TFieldValues extends FieldValues> {
  field: ControllerRenderProps<any>
  slot: Extract<FormFields<TFieldValues>, { type: 'date' }>
}

export function DatePicker<TFieldValues extends FieldValues>({
  field,
  slot,
}: Props<TFieldValues>) {
  const { value: open, setValue, toggle } = useBoolean(false)

  return (
    <Popover open={open} onOpenChange={setValue}>
      <PopoverTrigger className="w-full">
        <button
          aria-controls=""
          aria-expanded
          type="button"
          disabled={slot.disabled}
          className={cn(
            'border-input dark:bg-accent dark:border-gray700 ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-10 w-full items-center justify-start gap-2 whitespace-nowrap rounded-md bg-[#F1F5F9] px-3 py-2 text-sm  focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
          )}
        >
          <CalendarIcon className="mr-2 size-4" />
          {field.value ? (
            DateTime.fromJSDate(field.value).toLocaleString(
              { dateStyle: 'long' },
              {
                locale: 'pt-BR',
              }
            )
          ) : (
            <span>{slot.placeholderKey ?? slot.label}</span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          captionLayout="dropdown-buttons"
          mode="single"
          onSelect={(value) => {
            field.onChange(value ?? null)
            toggle()
          }}
          selected={field.value}
          footer={
            <div className="flex justify-between gap-2 pt-1 text-xs">
              <button
                className="text-primary hover:bg-muted rounded-md px-3 py-2 hover:underline"
                onClick={() => {
                  field.onChange(DateTime.now().toJSDate())
                  toggle()
                }}
              >
                Hoje
              </button>
              <button
                className="text-primary hover:bg-muted rounded-md px-3 py-2 hover:underline"
                onClick={() => {
                  field.onChange(null)
                  toggle()
                }}
              >
                Limpar
              </button>
            </div>
          }
        />
      </PopoverContent>
    </Popover>
  )
}
