'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/primitives/Button'
import { AuthStatus } from '@/components/auth/AuthStatus'

export default function SessionExpiredPage() {
  const router = useRouter()

  return (
    <AuthStatus
      icon="clock"
      tone="neutral"
      title="Your session has ended"
      description="You’ve been signed out to keep your workspace secure. Sign in again to pick up where you left off."
      actions={
        <Button
          variant="primary"
          size="lg"
          onClick={() => router.push('/login')}
          style={{ width: '100%' }}
        >
          Sign in again
        </Button>
      }
      footnote="Sessions end automatically after a period of inactivity."
    />
  )
}
