'use client'

import { Icon } from '@/components/primitives/Icon'
import styles from './Stepper.module.css'

export interface Step {
  id: string
  label: string
}

interface StepperProps {
  steps: Step[]
  current: number
  /** Allow jumping back to a completed step. */
  onStepClick?: (index: number) => void
}

/**
 * Subtle horizontal progress — labels separated by dots, the current step
 * emphasised, completed steps muted with a check. No numbered circles.
 */
export function Stepper({ steps, current, onStepClick }: StepperProps) {
  return (
    <nav className={styles.stepper} aria-label="Setup progress">
      <ol className={styles.list} role="list">
        {steps.map((step, i) => {
          const state =
            i < current ? 'done' : i === current ? 'current' : 'upcoming'
          const canClick = i < current && onStepClick
          return (
            <li key={step.id} className={styles.item}>
              {i > 0 && <span className={styles.dot} aria-hidden="true" />}
              {canClick ? (
                <button
                  type="button"
                  className={`${styles.step} ${styles[state]}`}
                  onClick={() => onStepClick(i)}
                  aria-current={state === 'current' ? 'step' : undefined}
                >
                  {state === 'done' && (
                    <Icon name="check" size={13} className={styles.check} />
                  )}
                  <span>{step.label}</span>
                </button>
              ) : (
                <span
                  className={`${styles.step} ${styles[state]}`}
                  aria-current={state === 'current' ? 'step' : undefined}
                >
                  {state === 'done' && (
                    <Icon name="check" size={13} className={styles.check} />
                  )}
                  <span>{step.label}</span>
                </span>
              )}
            </li>
          )
        })}
      </ol>

      {/* Compact label for narrow viewports */}
      <p className={styles.compact} aria-hidden="true">
        Step {current + 1} of {steps.length}
        <span className={styles.compactLabel}>· {steps[current]?.label}</span>
      </p>
    </nav>
  )
}
