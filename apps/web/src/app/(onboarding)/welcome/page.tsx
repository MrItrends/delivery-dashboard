'use client'

import { useRouter } from 'next/navigation'
import { OnboardingLayout } from '@/components/onboarding/OnboardingLayout'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'
import { useOnboardingStore } from '@/stores/useOnboardingStore'
import styles from './welcome.module.css'

export default function WelcomePage() {
  const router = useRouter()
  const hasHydrated = useOnboardingStore((s) => s.hasHydrated)
  const step = useOnboardingStore((s) => s.step)
  const workspaceName = useOnboardingStore((s) => s.workspace.name)
  const reset = useOnboardingStore((s) => s.reset)

  // Resume = there's saved progress beyond the very first untouched state.
  const isResuming = hasHydrated && (step > 0 || workspaceName.trim().length > 0)

  function startOver() {
    reset()
    router.push('/setup')
  }

  return (
    <OnboardingLayout>
      <div className={styles.hero}>
        {!hasHydrated ? (
          <span className={styles.eyebrow}>
            <Icon name="spinner" size={14} className="spin" /> Loading…
          </span>
        ) : (
          <>
            <p className={styles.eyebrow}>Workspace initialisation</p>

            {isResuming ? (
              <>
                <h1 className={styles.title}>Welcome back</h1>
                <p className={styles.copy}>
                  You have setup in progress. Continue where you left off, or start
                  again from the beginning.
                </p>
                <div className={styles.actions}>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => router.push('/setup')}
                  >
                    Resume setup
                  </Button>
                </div>
                <p className={styles.resumeNote}>
                  Prefer a fresh start?{' '}
                  <button className={styles.startOver} onClick={startOver}>
                    Start over
                  </button>
                </p>
              </>
            ) : (
              <>
                <h1 className={styles.title}>Set up your workspace</h1>
                <p className={styles.copy}>
                  A few short steps to configure your organisation, choose your role
                  and invite your team. It takes about three minutes, and your
                  progress saves automatically.
                </p>
                <div className={styles.actions}>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => router.push('/setup')}
                  >
                    Continue
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={() => router.push('/')}
                  >
                    Skip for now
                  </Button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </OnboardingLayout>
  )
}
