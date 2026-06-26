import styles from './Logo.module.css'

interface LogoProps {
  /** 'dark' renders for light surfaces (default); 'light' for dark surfaces. */
  tone?: 'dark' | 'light'
  showWordmark?: boolean
}

export function Logo({ tone = 'dark', showWordmark = true }: LogoProps) {
  return (
    <div
      className={`${styles.logo} ${tone === 'light' ? styles.light : ''}`}
      aria-label="Delivery Dashboard"
    >
      <span className={styles.mark} aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect
            x="1"
            y="1"
            width="26"
            height="26"
            rx="7"
            fill="var(--color-brand-600)"
          />
          {/* Stacked delivery bars — the object hierarchy, abstracted */}
          <rect x="8" y="8.5" width="12" height="2.4" rx="1.2" fill="white" />
          <rect x="8" y="12.8" width="9" height="2.4" rx="1.2" fill="white" opacity="0.85" />
          <rect x="8" y="17.1" width="6" height="2.4" rx="1.2" fill="white" opacity="0.7" />
        </svg>
      </span>
      {showWordmark && <span className={styles.wordmark}>Delivery Dashboard</span>}
    </div>
  )
}
