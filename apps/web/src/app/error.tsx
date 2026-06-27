'use client'

import { useEffect } from 'react'
import { SystemMessage } from '@/components/system/SystemMessage'

export default function GlobalError({
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
    <SystemMessage
      icon="alert-triangle"
      tone="error"
      code={error.digest ? `500 · ${error.digest}` : '500'}
      title="Something went wrong"
      description="An unexpected error occurred. This is usually temporary — try again, or return to your workspace."
      action={
        <>
          <button onClick={reset} className="sm-retry">Try again</button>
          <style>{`.sm-retry{display:inline-flex;align-items:center;height:40px;padding:0 var(--space-4);background:var(--color-action-primary);color:var(--color-action-primary-text);border:none;border-radius:var(--radius-md);font-family:var(--font-family-sans);font-size:var(--font-size-sm);font-weight:var(--font-weight-medium);cursor:pointer}.sm-retry:hover{background:var(--color-action-primary-hover)}`}</style>
        </>
      }
    />
  )
}
