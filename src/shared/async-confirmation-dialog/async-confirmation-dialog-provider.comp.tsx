/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { PropsWithChildren, createContext, useState } from 'react'

import { AsyncConfirmationDialog } from './async-confirmation-dialog.comp'
import type {
  AsyncConfirmationDialogContextProps,
  AsyncConfirmationDialogPropsOnContext,
} from './async-confirmation-dialog.types'

const initialDialogProps: AsyncConfirmationDialogPropsOnContext = {
  dialogTitle: undefined,
  dialogDescription: undefined,
  dialogCancel: undefined,
  dialogAction: undefined,
  handleOnAction: () => {},
}

export const AsyncConfirmationDialogContext =
  createContext<AsyncConfirmationDialogContextProps>({
    render: (dialogProps, handleOnAction) => {},
  })

export function AsyncConfirmationDialogProvider({
  children,
}: PropsWithChildren) {
  const [open, setOpen] = useState<boolean>(false)
  const [dialog, setDialog] =
    useState<AsyncConfirmationDialogPropsOnContext>(initialDialogProps)

  const render: AsyncConfirmationDialogContextProps['render'] = (
    dialogProps,
    handleOnAction
  ): void => {
    setDialog({
      ...dialogProps,
      handleOnAction: (result: boolean) => {
        setOpen(false)
        handleOnAction(result)
      },
    })

    setOpen(true)
  }

  return (
    <AsyncConfirmationDialogContext.Provider value={{ render }}>
      {children}
      <AsyncConfirmationDialog
        {...dialog}
        open={open}
        onOpenChange={() => {}}
      />
    </AsyncConfirmationDialogContext.Provider>
  )
}
