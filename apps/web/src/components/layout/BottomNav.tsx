'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Icon, type IconName } from '@/components/primitives/Icon'
import styles from './BottomNav.module.css'

interface BottomNavProps {
  onOpenPalette: () => void
  onOpenNotifications: () => void
  onOpenMenu: () => void
  unreadCount: number
}

export function BottomNav({
  onOpenPalette,
  onOpenNotifications,
  onOpenMenu,
  unreadCount,
}: BottomNavProps) {
  const pathname = usePathname()
  const router = useRouter()

  const item = (
    label: string,
    icon: IconName,
    active: boolean,
    onClick: () => void,
    badge?: boolean
  ) => (
    <button
      type="button"
      className={`${styles.item} ${active ? styles.active : ''}`}
      onClick={onClick}
      aria-label={label}
      aria-current={active ? 'page' : undefined}
    >
      <span className={styles.iconWrap}>
        <Icon name={icon} size={22} />
        {badge && <span className={styles.badge} aria-hidden="true" />}
      </span>
      <span className={styles.label}>{label}</span>
    </button>
  )

  return (
    <nav className={styles.bar} aria-label="Primary mobile navigation">
      {item('Home', 'home', pathname === '/', () => router.push('/'))}
      {item('Projects', 'folder', pathname.startsWith('/projects'), () => router.push('/projects'))}
      {item('Search', 'search', false, onOpenPalette)}
      {item('Alerts', 'bell', false, onOpenNotifications, unreadCount > 0)}
      {item('Menu', 'menu', false, onOpenMenu)}
    </nav>
  )
}
