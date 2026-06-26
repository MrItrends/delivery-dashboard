'use client'

import Link from 'next/link'
import { Logo } from './Logo'
import { Icon } from '@/components/primitives/Icon'
import styles from './AuthScaffold.module.css'

/* ---------------------------------------------------------------------------
   Header — logo, title, supporting copy
   --------------------------------------------------------------------------- */
interface AuthHeaderProps {
  title: string
  subtitle?: React.ReactNode
  showLogo?: boolean
}

export function AuthHeader({ title, subtitle, showLogo = true }: AuthHeaderProps) {
  return (
    <div className={styles.header}>
      {showLogo && (
        <div className={styles.logoRow}>
          <Logo />
        </div>
      )}
      <h1 className={styles.title}>{title}</h1>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  )
}

/* ---------------------------------------------------------------------------
   Divider — hairline with centered label
   --------------------------------------------------------------------------- */
export function AuthDivider({ label = 'or' }: { label?: string }) {
  return (
    <div className={styles.divider} role="separator" aria-hidden="true">
      <span className={styles.dividerLine} />
      <span className={styles.dividerLabel}>{label}</span>
      <span className={styles.dividerLine} />
    </div>
  )
}

/* ---------------------------------------------------------------------------
   SSO buttons — Microsoft + Google
   --------------------------------------------------------------------------- */
interface SSOButtonsProps {
  onMicrosoft?: () => void
  onGoogle?: () => void
  disabled?: boolean
}

export function SSOButtons({ onMicrosoft, onGoogle, disabled }: SSOButtonsProps) {
  return (
    <div className={styles.sso}>
      <button
        type="button"
        className={styles.ssoButton}
        onClick={onMicrosoft}
        disabled={disabled}
      >
        <Icon name="microsoft" size={18} />
        <span>Continue with Microsoft</span>
      </button>
      <button
        type="button"
        className={styles.ssoButton}
        onClick={onGoogle}
        disabled={disabled}
      >
        <Icon name="google" size={18} />
        <span>Continue with Google</span>
      </button>
    </div>
  )
}

/* ---------------------------------------------------------------------------
   Workspace hint — subtle line above footer
   --------------------------------------------------------------------------- */
export function WorkspaceHint({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.workspaceHint}>
      <Icon name="shield" size={15} className={styles.hintIcon} />
      <span>{children}</span>
    </div>
  )
}

/* ---------------------------------------------------------------------------
   Footer
   --------------------------------------------------------------------------- */
export function AuthFooter() {
  return (
    <footer className={styles.footer}>
      <p className={styles.footerText}>
        Need access?{' '}
        <Link href="/contact-administrator" className={styles.footerLink}>
          Contact your administrator
        </Link>
      </p>
      <p className={styles.footerLegal}>
        <Link href="/terms" className={styles.footerLegalLink}>Terms</Link>
        <span className={styles.footerDot} aria-hidden="true">·</span>
        <Link href="/privacy" className={styles.footerLegalLink}>Privacy</Link>
        <span className={styles.footerDot} aria-hidden="true">·</span>
        <span>© {new Date().getFullYear()} Delivery Dashboard</span>
      </p>
    </footer>
  )
}

/* ---------------------------------------------------------------------------
   Back link — for secondary screens
   --------------------------------------------------------------------------- */
export function AuthBackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className={styles.backLink}>
      <Icon name="arrow-left" size={16} />
      <span>{label}</span>
    </Link>
  )
}

/* ---------------------------------------------------------------------------
   Field stack — consistent vertical rhythm between inputs
   --------------------------------------------------------------------------- */
export function FieldStack({ children }: { children: React.ReactNode }) {
  return <div className={styles.fieldStack}>{children}</div>
}

/* ---------------------------------------------------------------------------
   Options row — remember me (left) + forgot password (right)
   --------------------------------------------------------------------------- */
export function FormOptions({
  left,
  rightHref,
  rightLabel,
}: {
  left?: React.ReactNode
  rightHref?: string
  rightLabel?: string
}) {
  return (
    <div className={styles.options}>
      <div>{left}</div>
      {rightHref && rightLabel && (
        <Link href={rightHref} className={styles.optionsLink}>
          {rightLabel}
        </Link>
      )}
    </div>
  )
}

/* ---------------------------------------------------------------------------
   Alternate action — e.g. "Don't have an account? Sign up"
   --------------------------------------------------------------------------- */
export function AltAction({
  prompt,
  href,
  label,
}: {
  prompt: string
  href: string
  label: string
}) {
  return (
    <p className={styles.altAction}>
      {prompt}{' '}
      <Link href={href} className={styles.altActionLink}>
        {label}
      </Link>
    </p>
  )
}

/* ---------------------------------------------------------------------------
   Form-level error banner — non-field errors (incorrect password, offline…)
   --------------------------------------------------------------------------- */
export function FormBanner({
  tone = 'error',
  children,
}: {
  tone?: 'error' | 'warning' | 'info'
  children: React.ReactNode
}) {
  const iconName =
    tone === 'error' ? 'alert-circle' : tone === 'warning' ? 'alert-triangle' : 'shield'
  return (
    <div
      className={`${styles.banner} ${styles[`banner_${tone}`]}`}
      role="alert"
    >
      <Icon name={iconName} size={18} className={styles.bannerIcon} />
      <span>{children}</span>
    </div>
  )
}
