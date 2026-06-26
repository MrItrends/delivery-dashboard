import { Logo } from './Logo'
import { Icon } from '@/components/primitives/Icon'
import styles from './AuthLoading.module.css'

interface AuthLoadingProps {
  title?: string
  message?: string
}

export function AuthLoading({
  title = 'Signing you in',
  message = 'Verifying your credentials and preparing your workspace…',
}: AuthLoadingProps) {
  return (
    <div className={styles.loading} role="status" aria-live="polite">
      <div className={styles.logoRow}>
        <Logo />
      </div>

      <div className={styles.spinner} aria-hidden="true">
        <Icon name="spinner" size={28} className="spin" />
      </div>

      <h1 className={styles.title}>{title}</h1>
      <p className={styles.message}>{message}</p>

      <span className="sr-only">Loading, please wait.</span>
    </div>
  )
}
