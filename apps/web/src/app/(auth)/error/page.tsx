'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/primitives/Button'
import { AuthStatus } from '@/components/auth/AuthStatus'

export default function AuthErrorPage() {
  const router = useRouter()
  const reference = 'AUTH-' + Math.random().toString(36).slice(2, 8).toUpperCase()

  return (
    <AuthStatus
      icon="alert-triangle"
      tone="error"
      title="Something went wrong"
      description="We couldn’t complete your request. This is usually temporary — please try again in a moment."
      detail={
        <span>
          Reference: <strong style={{ fontFamily: 'var(--font-family-mono)' }}>{reference}</strong>
        </span>
      }
      actions={
        <>
          <Button
            variant="primary"
            size="lg"
            onClick={() => router.push('/login')}
            style={{ width: '100%' }}
          >
            Try again
          </Button>
          <Button
            variant="ghost"
            size="lg"
            onClick={() => router.push('/contact-administrator')}
            style={{ width: '100%' }}
          >
            Contact administrator
          </Button>
        </>
      }
      footnote="If this keeps happening, share the reference above with your administrator."
    />
  )
}
