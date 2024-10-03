import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPortal,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

import { AsyncConfirmationDialogProps } from './async-confirmation-dialog.types'

export function AsyncConfirmationDialog({
  open,
  onOpenChange,
  dialogTitle,
  dialogDescription,
  dialogCancel,
  dialogAction,
  handleOnAction,
}: AsyncConfirmationDialogProps) {
  const handleReject = () => handleOnAction(false)
  const handleConfirm = () => handleOnAction(true)

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogPortal>
        <AlertDialogContent
          onCloseAutoFocus={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
            <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleReject}>
              {dialogCancel}
            </AlertDialogCancel>

            <AlertDialogAction onClick={handleConfirm}>
              {dialogAction}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialog>
  )
}
