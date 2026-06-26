'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/primitives/Button'
import { AuthStatus } from '@/components/auth/AuthStatus'

export default function AccountLockedPage() {
  const router = useRouter()

  return (
    <AuthStatus
      icon="shield"
      tone="error"
      title="Account locked"
      description="We’ve temporarily locked your account after several unsuccessful sign-in attempts. This protects your account from unauthorised access."
      detail={
        <span>
          You can try again in <strong>15 minutes</strong>, or reset your password
          to regain access now.
        </span>
      }
      actions={
        <>
          <Button
            variant="primary"
            size="lg"
            onClick={() => router.push('/forgot-password')}
            style={{ width: '100%' }}
          >
            Reset password
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
      footnote="If you didn’t attempt to sign in, contact your administrator immediately."
    />
  )
}
