import { forwardRef, useImperativeHandle, useState } from 'react'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { NewProductForm } from './new-product-form'

export type NewProductDialogRef = {
  open: () => void
  close: () => void
}

export const NewProductDialog = forwardRef<NewProductDialogRef, unknown>(
  (_, ref) => {
    const [state, setState] = useState<boolean>(false)

    const open = state

    const handleOpen = () => {
      setState(true)
    }

    const handleClose = () => {
      setState(false)
    }

    useImperativeHandle(ref, () => ({
      open: handleOpen,
      close: handleClose,
    }))

    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-screen-sm flex-col p-0">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle className="flex items-center gap-2">
              Cadastro do cliente
            </DialogTitle>
          </DialogHeader>
          <div className="flex w-full px-5 py-2 items-center justify-center grow">
            <NewProductForm closeDialog={handleClose} />
          </div>
        </DialogContent>
      </Dialog>
    )
  }
)

NewProductDialog.displayName = 'ProductDetailRef'
