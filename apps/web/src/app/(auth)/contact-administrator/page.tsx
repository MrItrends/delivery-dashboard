'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/primitives/Button'
import { AuthStatus } from '@/components/auth/AuthStatus'
import { AuthBackLink } from '@/components/auth/AuthScaffold'

export default function ContactAdministratorPage() {
  const router = useRouter()

  return (
    <>
      <AuthBackLink href="/login" label="Back to sign in" />
      <AuthStatus
        icon="shield"
        tone="neutral"
        showLogo={false}
        title="Contact your administrator"
        description="Access to TBI Digital Delivery is managed by your organisation. Your workspace administrator can grant access, reset accounts, and resolve sign-in problems."
        detail={
          <span>
            Not sure who that is? Ask your programme or delivery lead — they can
            point you to the right person.
          </span>
        }
        actions={
          <Button
            variant="secondary"
            size="lg"
            onClick={() => router.push('/login')}
            style={{ width: '100%' }}
          >
            Return to sign in
          </Button>
        }
      />
    </>
  )
}
