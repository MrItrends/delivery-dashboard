import { Logo } from '@/components/auth/Logo'
import styles from './OnboardingLayout.module.css'

interface OnboardingLayoutProps {
  /** Subtle stepper shown in the top bar (omitted on Welcome / Complete). */
  stepper?: React.ReactNode
  /** Right-aligned top-bar slot — e.g. the save indicator or an exit link. */
  topRight?: React.ReactNode
  /** A global banner row (offline / resume / permission), above the content. */
  banner?: React.ReactNode
  /** Footer action row. On mobile it becomes a sticky bottom bar. */
  footer?: React.ReactNode
  children: React.ReactNode
}

export function OnboardingLayout({
  stepper,
  topRight,
  banner,
  footer,
  children,
}: OnboardingLayoutProps) {
  return (
    <div className={styles.shell}>
      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <Logo />
          {stepper && <div className={styles.stepperSlot}>{stepper}</div>}
          <div className={styles.topRight}>{topRight}</div>
        </div>
      </header>

      {banner && <div className={styles.bannerRow}>{banner}</div>}

      <main className={styles.main}>
        <div className={styles.content}>{children}</div>
      </main>

      {footer && (
        <footer className={styles.footer}>
          <div className={styles.footerInner}>{footer}</div>
        </footer>
      )}
    </div>
  )
}
