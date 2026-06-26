'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { OnboardingLayout } from '@/components/onboarding/OnboardingLayout'
import { Stepper, type Step } from '@/components/onboarding/Stepper'
import { SaveIndicator, type SaveState } from '@/components/onboarding/FormLayout'
import { WorkspaceSummary, type SummaryItem } from '@/components/onboarding/WorkspaceSummary'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'
import { FormBanner } from '@/components/auth/AuthScaffold'
import { useOnline } from '@/lib/hooks/useOnline'
import { useOnboardingStore, type SetupStep } from '@/stores/useOnboardingStore'
import { ROLES, COUNTRIES } from '@/lib/onboarding/options'
import {
  WorkspaceStep,
  OrganizationStep,
  RoleStep,
  TeamStep,
  PortfolioStep,
  type StepHandle,
} from '@/components/onboarding/steps'
import styles from './setup.module.css'

const STEPS: Step[] = [
  { id: 'workspace', label: 'Workspace' },
  { id: 'organization', label: 'Organisation' },
  { id: 'role', label: 'Role' },
  { id: 'team', label: 'Team' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'complete', label: 'Complete' },
]

const PRIMARY_LABELS = ['Create workspace', 'Continue', 'Continue', 'Continue', 'Create portfolio']

function labelFor(list: { value: string; label: string }[], value: string) {
  return list.find((o) => o.value === value)?.label ?? value
}

export default function SetupPage() {
  const router = useRouter()
  const online = useOnline()

  const hasHydrated = useOnboardingStore((s) => s.hasHydrated)
  const step = useOnboardingStore((s) => s.step)
  const setStep = useOnboardingStore((s) => s.setStep)
  const reset = useOnboardingStore((s) => s.reset)

  const stepRef = useRef<StepHandle>(null)
  const [creating, setCreating] = useState(false)
  const [saveState, setSaveState] = useState<SaveState>('idle')

  // Auto-save indicator — react to any store change while editing.
  useEffect(() => {
    let savedTimer: ReturnType<typeof setTimeout>
    const unsub = useOnboardingStore.subscribe(() => {
      setSaveState('saving')
      clearTimeout(savedTimer)
      savedTimer = setTimeout(() => setSaveState('saved'), 600)
    })
    return () => {
      clearTimeout(savedTimer)
      unsub()
    }
  }, [])

  const role = useOnboardingStore((s) => s.role)
  const isObserver = role === 'observer'

  const goBack = useCallback(() => {
    if (step === 0) {
      router.push('/welcome')
    } else {
      setStep((step - 1) as SetupStep)
    }
  }, [step, setStep, router])

  const doCreate = useCallback(() => {
    setCreating(true)
    // Simulated workspace provisioning.
    setTimeout(() => {
      setCreating(false)
      setStep(5)
    }, 1200)
  }, [setStep])

  const advance = useCallback(
    (skipValidation = false) => {
      if (step < 4) {
        if (!skipValidation && !(stepRef.current?.validate() ?? true)) return
        setStep((step + 1) as SetupStep)
        return
      }
      // step === 4 (portfolio) — the final create
      if (!online) return
      if (!skipValidation && !(stepRef.current?.validate() ?? true)) return
      doCreate()
    },
    [step, setStep, online, doCreate]
  )

  // ---- Hydration / loading gate ----
  if (!hasHydrated) {
    return (
      <OnboardingLayout>
        <div className={styles.loading}>
          <Icon name="spinner" size={26} className={`spin ${styles.loadingSpinner}`} />
          <span className={styles.loadingText}>Preparing your setup…</span>
        </div>
      </OnboardingLayout>
    )
  }

  // ---- Complete screen ----
  if (step === 5) {
    return <CompleteScreen online={online} onEnter={() => { reset(); router.push('/') }} />
  }

  // ---- Wizard steps ----
  const offlineBanner = !online ? (
    <FormBanner tone="warning">
      You&rsquo;re offline. Your progress is saved on this device and will sync when
      you reconnect.
    </FormBanner>
  ) : null

  const renderStep = () => {
    switch (step) {
      case 0: return <WorkspaceStep ref={stepRef} />
      case 1: return <OrganizationStep ref={stepRef} />
      case 2: return <RoleStep ref={stepRef} />
      case 3: return <TeamStep ref={stepRef} />
      case 4: return <PortfolioStep ref={stepRef} />
      default: return null
    }
  }

  const isTeam = step === 3
  const isPortfolio = step === 4
  const finalOfflineBlocked = isPortfolio && !online
  const observerBlocked = isPortfolio && isObserver

  const footer = (
    <>
      <div className={styles.footerLeft}>
        <Button variant="ghost" size="md" onClick={goBack} disabled={creating}>
          Back
        </Button>
      </div>
      <div className={styles.footerRight}>
        {(isTeam || isPortfolio) && (
          <Button
            variant="secondary"
            size="md"
            onClick={() => advance(true)}
            disabled={creating || (isPortfolio && !online)}
          >
            {isTeam ? 'Skip for now' : 'Skip'}
          </Button>
        )}
        <Button
          variant="primary"
          size="md"
          onClick={() => advance(false)}
          loading={creating && isPortfolio}
          disabled={creating || finalOfflineBlocked || observerBlocked}
        >
          {PRIMARY_LABELS[step]}
        </Button>
      </div>
    </>
  )

  return (
    <OnboardingLayout
      stepper={<Stepper steps={STEPS} current={step} onStepClick={(i) => setStep(i as SetupStep)} />}
      topRight={<SaveIndicator state={saveState} />}
      banner={
        observerBlocked ? (
          <FormBanner tone="info">
            Observers can&rsquo;t create portfolios. You can skip this step — an
            administrator can set one up for you later.
          </FormBanner>
        ) : (
          offlineBanner
        )
      }
      footer={footer}
    >
      <div key={step} className={styles.stepContent}>
        {renderStep()}
      </div>
    </OnboardingLayout>
  )
}

/* ===========================================================================
   COMPLETE SCREEN — calm confirmation, no celebration
   =========================================================================== */
function CompleteScreen({ online, onEnter }: { online: boolean; onEnter: () => void }) {
  const workspace = useOnboardingStore((s) => s.workspace)
  const organization = useOnboardingStore((s) => s.organization)
  const role = useOnboardingStore((s) => s.role)
  const invites = useOnboardingStore((s) => s.invites)
  const portfolio = useOnboardingStore((s) => s.portfolio)

  const roleTitle = ROLES.find((r) => r.id === role)?.title ?? '—'

  const items: SummaryItem[] = [
    { icon: 'shield', label: 'Workspace', value: workspace.name || '—' },
    {
      icon: 'check-circle',
      label: 'Organisation',
      value:
        organization.orgName ||
        workspace.organization ||
        labelFor(COUNTRIES, workspace.country) ||
        '—',
    },
    { icon: 'check', label: 'Your role', value: roleTitle },
    {
      icon: 'mail',
      label: 'Team invited',
      value:
        invites.length === 0
          ? 'None yet'
          : `${invites.length} ${invites.length === 1 ? 'person' : 'people'}`,
    },
    {
      icon: 'arrow-right',
      label: 'First portfolio',
      value: portfolio.name || 'Skipped',
    },
  ]

  return (
    <OnboardingLayout
      stepper={<Stepper steps={STEPS} current={5} />}
    >
      <div className={styles.complete}>
        <span className={styles.completeBadge} aria-hidden="true">
          <Icon name="check" size={26} />
        </span>

        <h1 className={styles.completeTitle}>Your workspace is ready</h1>
        <p className={styles.completeCopy}>
          {workspace.name || 'Your workspace'} is set up and ready to use. Here&rsquo;s
          a summary of what you&rsquo;ve configured.
        </p>

        <WorkspaceSummary items={items} />

        {!online && (
          <div style={{ marginTop: 'var(--space-6)' }}>
            <FormBanner tone="warning">
              Reconnect to enter your workspace.
            </FormBanner>
          </div>
        )}

        <div className={styles.completeActions}>
          <Button variant="primary" size="lg" onClick={onEnter} disabled={!online}>
            Enter workspace
          </Button>
        </div>

        <div className={styles.nextSteps}>
          <p className={styles.nextStepsTitle}>What happens next</p>
          <ul className={styles.nextStepsList}>
            <li className={styles.nextStepsItem}>
              <Icon name="arrow-right" size={15} className={styles.nextStepsIcon} />
              Invited team members receive an email to join your workspace.
            </li>
            <li className={styles.nextStepsItem}>
              <Icon name="arrow-right" size={15} className={styles.nextStepsIcon} />
              Add priority areas and projects under your portfolio.
            </li>
            <li className={styles.nextStepsItem}>
              <Icon name="arrow-right" size={15} className={styles.nextStepsIcon} />
              Configure reporting and start tracking delivery.
            </li>
          </ul>
        </div>
      </div>
    </OnboardingLayout>
  )
}
