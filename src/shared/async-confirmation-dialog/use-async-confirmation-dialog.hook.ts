import { useContext } from 'react'

import { AsyncConfirmationDialogContext } from './async-confirmation-dialog-provider.comp'
import { UseAsyncConfirmationDialogProps } from './async-confirmation-dialog.types'

export const useAsyncConfirmationDialog = () => {
  const { render } = useContext(AsyncConfirmationDialogContext)

  return async function handleConfirmation(
    dialogProps: UseAsyncConfirmationDialogProps
  ) {
    const reactionPromise = new Promise<boolean>((resolve) => {
      render(dialogProps, resolve)
    })

    return reactionPromise
  }
}
