import { BrandPanel } from './BrandPanel'
import styles from './AuthLayout.module.css'

interface AuthLayoutProps {
  children: React.ReactNode
}

/**
 * The single layout system shared by every authentication screen.
 *
 * Desktop:  form ~55% / brand ~45%   (split)
 * Tablet:   form 60% / brand 40%
 * Mobile:   single column — form first, brand narrative below
 */
export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={styles.shell}>
      <main className={styles.formColumn}>
        <div className={styles.formInner}>{children}</div>
      </main>
      <aside className={styles.brandColumn} aria-label="About TBI Digital Delivery">
        <BrandPanel />
      </aside>
    </div>
  )
}
