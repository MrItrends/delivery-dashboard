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
      aria-label="TBI Digital Delivery"
    >
      <span className={styles.mark} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/tbi-logo.png" alt="" width={28} height={28} style={{ objectFit: 'contain', display: 'block' }} />
      </span>
      {showWordmark && <span className={styles.wordmark}>TBI Digital Delivery</span>}
    </div>
  )
}
