import { passwordStrength } from '@/lib/validation/auth'
import styles from './PasswordStrength.module.css'

export function PasswordStrength({ value }: { value: string }) {
  const { score, label } = passwordStrength(value)
  if (!value) return null

  const toneClass =
    score <= 1 ? styles.weak : score === 2 ? styles.fair : score === 3 ? styles.good : styles.strong

  return (
    <div className={styles.wrap} aria-live="polite">
      <div className={styles.bars}>
        {[1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={`${styles.bar} ${i <= score ? toneClass : ''}`}
          />
        ))}
      </div>
      <span className={`${styles.label} ${toneClass}`}>{label}</span>
    </div>
  )
}
