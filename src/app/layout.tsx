import { Inter as FontSans } from 'next/font/google'

import './globals.css'
import type { PropsWithChildren } from 'react'
import { TanstackQueryProvider } from '@/providers/tanstack-query'
import { AsyncConfirmationDialogProvider } from '@/shared/async-confirmation-dialog'

import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

interface RootLayoutProps extends PropsWithChildren {}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-br">
      <body
        className={cn(
          'bg-background min-h-screen font-sans antialiased',
          fontSans.variable
        )}
      >
        <TanstackQueryProvider>
          <AsyncConfirmationDialogProvider>
            {children}
            <Toaster />
          </AsyncConfirmationDialogProvider>
        </TanstackQueryProvider>
      </body>
    </html>
  )
}
