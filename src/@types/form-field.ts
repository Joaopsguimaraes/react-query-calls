import type { FocusEventHandler, ReactNode } from "react"
import { FieldPath, FieldValues } from "react-hook-form"

type FormRadioOption = {
  value: string | number | boolean
  label: string
}

type SelectOptions = {
  label: string
  value: string | number | boolean
}

export type FormFields<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>
  disabled?: boolean
  optional?: boolean
  message?: string
  required?: boolean
} & (
  | {
      label: string
      className?: string
      placeholderKey: string
      isLoading?: boolean
      type?: "text" | "tel" | "email" | "number" | "cnpj" | "cnpj_cpf" | "cpf"
      maxLength?: number
      onBlur?: FocusEventHandler<HTMLInputElement>
    }
  | {
      label: string
      className?: string
      placeholderKey: string
      isLoading?: boolean
      type: "currency"
      prefix?: string
      onBlur?: FocusEventHandler<HTMLInputElement>
    }
  | {
      label: string
      className?: string
      placeholderKey: string
      type?: "checkbox"
      labelComp?: ReactNode
    }
  | {
      label: string
      className?: string
      placeholderKey: string
      type?: "textarea"
    }
  | {
      label?: string
      className?: string
      type: "switch"
      options: FormRadioOption[]
    }
  | {
      label: string
      className?: string
      type: "radio"
      options: FormRadioOption[]
    }
  | {
      label: string
      className?: string
      type: "select"
      options: SelectOptions[]
      isLoading?: boolean
      placeHolder?: string
    }
  | {
      label: string
      className?: string
      type: "combobox"
      placeholderKey: string
      placeholder?: string
      loading?: boolean
      multiple: boolean
      options: SelectOptions[]
      contentSize?: string
      onInputChange?: (value: string) => void
    }
  | {
      label?: string
      className?: string
      type: "combobox-single-value"
      placeholderKey: string
      placeholder?: string
      loading?: boolean
      options: SelectOptions[]
      contentSize?: string
      onInputChange?: (value: string) => void
      postChangeCall?: (option: string) => void
    }
  | {
      label: string
      placeholderKey?: string
      className?: string
      type: "date"
      mode?: "default" | "multiple" | "range" | "single"
    }
  | {
      label: string
      placeholderKey: string
      className?: string
      type: "date-single"
      mode?: "default" | "multiple" | "range" | "single"
    }
  | {
      label: string
      className?: string
      placeholderKey: string
      type: "zipcode"
      onBlur?: FocusEventHandler<HTMLInputElement>
    }
  | {
      icon?: ReactNode
      label: string
      className?: string
      type: "title"
      placeholderKey: string
    }
  | {
      type: "hidden"
    }
)

export type FormFieldsConstant<TFieldValues extends FieldValues> = Array<
  FormFields<TFieldValues> | FormFields<TFieldValues>[]
>
