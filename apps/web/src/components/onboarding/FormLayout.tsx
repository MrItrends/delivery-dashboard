'use client'

import { Icon } from '@/components/primitives/Icon'
import styles from './FormLayout.module.css'

export function StepHeading({
  title,
  description,
}: {
  title: string
  description?: React.ReactNode
}) {
  return (
    <div className={styles.heading}>
      <h1 className={styles.title}>{title}</h1>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  )
}

/** Vertical field stack. */
export function Fields({ children }: { children: React.ReactNode }) {
  return <div className={styles.fields}>{children}</div>
}

/** Responsive two-column grid that collapses to one column on small screens. */
export function FieldGrid({ children }: { children: React.ReactNode }) {
  return <div className={styles.grid}>{children}</div>
}

/** Full-width cell inside a FieldGrid. */
export function FieldFull({ children }: { children: React.ReactNode }) {
  return <div className={styles.full}>{children}</div>
}

export type SaveState = 'idle' | 'saving' | 'saved'

export function SaveIndicator({ state }: { state: SaveState }) {
  if (state === 'idle') return null
  return (
    <span
      className={styles.save}
      role="status"
      aria-live="polite"
    >
      {state === 'saving' ? (
        <>
          <Icon name="spinner" size={14} className="spin" />
          Saving…
        </>
      ) : (
        <>
          <Icon name="check" size={14} className={styles.saveCheck} />
          Saved
        </>
      )}
    </span>
  )
}
