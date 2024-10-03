import { ReactNode } from 'react'

export type AsyncConfirmationDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  dialogTitle: ReactNode
  dialogDescription?: ReactNode
  dialogCancel: ReactNode
  dialogAction: ReactNode
  handleOnAction: (result: boolean) => void
}

export type AsyncConfirmationDialogPropsOnContext = Omit<
  AsyncConfirmationDialogProps,
  'open' | 'onOpenChange'
>

export type UseAsyncConfirmationDialogProps = Omit<
  AsyncConfirmationDialogPropsOnContext,
  'handleOnAction'
>

export type AsyncConfirmationDialogContextProps = {
  render: (
    dialogProps: UseAsyncConfirmationDialogProps,
    handleOnAction: (value: boolean) => void
  ) => void
}
