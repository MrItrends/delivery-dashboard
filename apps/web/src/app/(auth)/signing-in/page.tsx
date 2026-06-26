'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { AuthLoading } from '@/components/auth/AuthLoading'

function SigningInContent() {
  const params = useSearchParams()
  const provider = params.get('provider')

  if (provider === 'microsoft' || provider === 'google') {
    const label = provider === 'microsoft' ? 'Microsoft' : 'Google'
    return (
      <AuthLoading
        title={`Connecting to ${label}`}
        message={`Securely redirecting you to ${label} to continue sign-in…`}
      />
    )
  }

  return <AuthLoading />
}

export default function SigningInPage() {
  return (
    <Suspense fallback={<AuthLoading />}>
      <SigningInContent />
    </Suspense>
  )
}
