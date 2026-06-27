import Link from 'next/link'
import { Logo } from '@/components/auth/Logo'
import { Icon, type IconName } from '@/components/primitives/Icon'
import styles from './SystemMessage.module.css'

type Tone = 'neutral' | 'warning' | 'error'

interface SystemMessageProps {
  icon: IconName
  tone?: Tone
  code?: string
  title: string
  description: React.ReactNode
  action?: React.ReactNode
}

/** Standalone branded full-screen message — used by 404 / 500 / 403 / offline. */
export function SystemMessage({ icon, tone = 'neutral', code, title, description, action }: SystemMessageProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <div className={styles.logo}><Logo /></div>
        <div className={`${styles.badge} ${styles[tone]}`} aria-hidden="true">
          <Icon name={icon} size={26} />
        </div>
        {code && <p className={styles.code}>{code}</p>}
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        <div className={styles.actions}>
          {action ?? (
            <Link href="/" className={styles.homeBtn}>Back to workspace</Link>
          )}
        </div>
      </div>
    </div>
  )
}
