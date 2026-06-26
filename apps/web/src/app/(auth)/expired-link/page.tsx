'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/primitives/Button'
import { AuthStatus } from '@/components/auth/AuthStatus'

export default function ExpiredLinkPage() {
  const router = useRouter()

  return (
    <AuthStatus
      icon="link-broken"
      tone="warning"
      title="This link has expired"
      description="For your security, password and verification links expire after 30 minutes. Request a new one to continue."
      actions={
        <>
          <Button
            variant="primary"
            size="lg"
            onClick={() => router.push('/forgot-password')}
            style={{ width: '100%' }}
          >
            Request a new link
          </Button>
          <Button
            variant="ghost"
            size="lg"
            onClick={() => router.push('/login')}
            style={{ width: '100%' }}
          >
            Back to sign in
          </Button>
        </>
      }
      footnote="Already reset your password? Sign in with your new details."
    />
  )
}
