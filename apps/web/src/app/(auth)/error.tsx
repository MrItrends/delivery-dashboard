'use client'

import { useEffect } from 'react'
import { Button } from '@/components/primitives/Button'
import { AuthStatus } from '@/components/auth/AuthStatus'

/**
 * Route-segment error boundary for the auth group.
 * Catches unexpected runtime errors and presents the same calm error surface.
 */
export default function AuthErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // In production this would report to the monitoring pipeline.
    console.error(error)
  }, [error])

  return (
    <AuthStatus
      icon="alert-triangle"
      tone="error"
      title="Something went wrong"
      description="We couldn’t complete your request. This is usually temporary — please try again in a moment."
      detail={
        error.digest ? (
          <span>
            Reference:{' '}
            <strong style={{ fontFamily: 'var(--font-family-mono)' }}>
              {error.digest}
            </strong>
          </span>
        ) : undefined
      }
      actions={
        <Button
          variant="primary"
          size="lg"
          onClick={reset}
          style={{ width: '100%' }}
        >
          Try again
        </Button>
      }
      footnote="If this keeps happening, contact your administrator."
    />
  )
}
