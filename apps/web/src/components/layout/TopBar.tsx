'use client'

import Link from 'next/link'
import styles from './TopBar.module.css'

interface TopBarProps {
  onOpenPalette: () => void
}

export function TopBar({ onOpenPalette }: TopBarProps) {
  return (
    <header className={styles.topbar} role="banner">
      <div className={styles.left}>
        {/* Breadcrumb renders here from page context — placeholder */}
        <span className={styles.breadcrumbPlaceholder} aria-hidden="true" />
      </div>

      <div className={styles.right}>
        <button
          className={styles.iconButton}
          onClick={onOpenPalette}
          aria-label="Open command palette (⌘K)"
          title="⌘K"
        >
          <span aria-hidden="true">⌕</span>
        </button>

        <Link
          href="/notifications"
          className={styles.iconButton}
          aria-label="Notifications"
        >
          <span aria-hidden="true">◎</span>
        </Link>

        <div className={styles.divider} />

        <button className={styles.avatarButton} aria-label="User profile">
          <div className={styles.avatar} aria-hidden="true">AU</div>
        </button>
      </div>
    </header>
  )
}
