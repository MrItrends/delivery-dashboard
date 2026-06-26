import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Providers } from '@/components/providers/Providers'
import { ToastRegion } from '@/components/feedback/Toast'

export const metadata: Metadata = {
  title: {
    template: '%s — Delivery Dashboard',
    default: 'Delivery Dashboard',
  },
  description: 'The operating system for government delivery.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
          <ToastRegion />
        </Providers>
      </body>
    </html>
  )
}
