'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/primitives/Button'
import { AuthStatus } from '@/components/auth/AuthStatus'
import { AuthBackLink } from '@/components/auth/AuthScaffold'

function CheckEmailContent() {
  const params = useSearchParams()
  const email = params.get('email')
  const context = params.get('context') // 'reset' | 'signup'
  const [resent, setResent] = useState(false)
  const [resending, setResending] = useState(false)

  const isSignup = context === 'signup'

  async function handleResend() {
    setResending(true)
    await new Promise((r) => setTimeout(r, 900))
    setResending(false)
    setResent(true)
  }

  return (
    <>
      <AuthBackLink href="/login" label="Back to sign in" />
      <AuthStatus
        icon="mail"
        tone="neutral"
        showLogo={false}
        title="Check your email"
        description={
          isSignup
            ? 'We’ve sent a verification link to confirm your account. Open it to finish setting up.'
            : 'If an account exists, we’ve sent a secure link to reset your password. The link expires in 30 minutes.'
        }
        detail={
          email ? (
            <span>
              Sent to <strong>{email}</strong>
            </span>
          ) : undefined
        }
        actions={
          <>
            <Button
              variant="secondary"
              size="lg"
              onClick={handleResend}
              loading={resending}
              disabled={resent}
              style={{ width: '100%' }}
            >
              {resent ? 'Link resent' : resending ? 'Resending…' : 'Resend link'}
            </Button>
          </>
        }
        footnote={
          <>
            Didn&rsquo;t get it? Check your spam folder, or{' '}
            <a href="/contact-administrator">contact your administrator</a> if the
            problem continues.
          </>
        }
      />
    </>
  )
}

export default function CheckEmailPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: 320 }} />}>
      <CheckEmailContent />
    </Suspense>
  )
}
