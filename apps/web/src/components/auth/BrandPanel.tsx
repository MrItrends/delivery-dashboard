import { Logo } from './Logo'
import styles from './BrandPanel.module.css'

const CAPABILITIES = [
  {
    title: 'See every priority in one place',
    body: 'Portfolios, programmes and interventions, connected from strategy to delivery.',
  },
  {
    title: 'Know the real state of delivery',
    body: 'Health is calculated from live signals — never guessed, never manually set.',
  },
  {
    title: 'Move from insight to action',
    body: 'Evidence, decisions and accountability captured against the work itself.',
  },
]

export function BrandPanel() {
  return (
    <div className={styles.panel}>
      {/* Subtle abstract geometric composition — structural, not decorative */}
      <GeometricComposition />

      <div className={styles.content}>
        <header className={styles.header}>
          <Logo />
        </header>

        <div className={styles.narrative}>
          <p className={styles.statement}>
            The operating system for government delivery.
          </p>

          <ul className={styles.capabilities}>
            {CAPABILITIES.map((cap, i) => (
              <li key={i} className={styles.capability}>
                <span className={styles.capabilityIndex} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={styles.capabilityText}>
                  <span className={styles.capabilityTitle}>{cap.title}</span>
                  <span className={styles.capabilityBody}>{cap.body}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <footer className={styles.footer}>
          <span className={styles.footerMeta}>Secure government environment</span>
        </footer>
      </div>
    </div>
  )
}

/**
 * Abstract, architectural composition built from the design language:
 * hairline grid, a few connected nodes suggesting the object hierarchy,
 * one minimal blue accent. No gradients, no illustration.
 */
function GeometricComposition() {
  return (
    <svg
      className={styles.geometry}
      viewBox="0 0 480 720"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Hairline grid */}
      <g stroke="var(--color-border-default)" strokeWidth="1">
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`v${i}`} x1={80 * (i + 1)} y1="0" x2={80 * (i + 1)} y2="720" />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={80 * (i + 1)} x2="480" y2={80 * (i + 1)} />
        ))}
      </g>

      {/* Connecting paths — strategy flowing into delivery */}
      <g stroke="var(--color-neutral-300)" strokeWidth="1.5" strokeLinecap="round">
        <path d="M160 160 L160 320 L320 320" />
        <path d="M160 320 L160 480" />
        <path d="M320 320 L320 480 L240 480" />
      </g>

      {/* Object nodes */}
      <g>
        <rect x="140" y="140" width="40" height="40" rx="10" fill="var(--color-surface-page)" stroke="var(--color-neutral-300)" strokeWidth="1.5" />
        <rect x="140" y="300" width="40" height="40" rx="10" fill="var(--color-surface-page)" stroke="var(--color-neutral-300)" strokeWidth="1.5" />
        {/* Accent node — the active intervention */}
        <rect x="300" y="300" width="40" height="40" rx="10" fill="var(--color-brand-600)" />
        <rect x="220" y="460" width="40" height="40" rx="10" fill="var(--color-surface-page)" stroke="var(--color-neutral-300)" strokeWidth="1.5" />
        <rect x="140" y="460" width="40" height="40" rx="10" fill="var(--color-surface-page)" stroke="var(--color-neutral-300)" strokeWidth="1.5" />
      </g>
    </svg>
  )
}
