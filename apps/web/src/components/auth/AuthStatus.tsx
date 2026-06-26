'use client'

import { Logo } from './Logo'
import { Icon, type IconName } from '@/components/primitives/Icon'
import styles from './AuthStatus.module.css'

type StatusTone = 'neutral' | 'success' | 'warning' | 'error'

interface AuthStatusProps {
  icon: IconName
  tone?: StatusTone
  title: string
  description: React.ReactNode
  /** Optional secondary detail block (e.g. the email address sent to). */
  detail?: React.ReactNode
  /** Primary + secondary actions, already composed. */
  actions?: React.ReactNode
  /** Optional small print under the actions. */
  footnote?: React.ReactNode
  showLogo?: boolean
}

export function AuthStatus({
  icon,
  tone = 'neutral',
  title,
  description,
  detail,
  actions,
  footnote,
  showLogo = true,
}: AuthStatusProps) {
  return (
    <div className={styles.status}>
      {showLogo && (
        <div className={styles.logoRow}>
          <Logo />
        </div>
      )}

      <div className={`${styles.iconBadge} ${styles[tone]}`} aria-hidden="true">
        <Icon name={icon} size={26} />
      </div>

      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>

      {detail && <div className={styles.detail}>{detail}</div>}

      {actions && <div className={styles.actions}>{actions}</div>}

      {footnote && <p className={styles.footnote}>{footnote}</p>}
    </div>
  )
}
