'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import styles from './Sidebar.module.css'

interface NavItem {
  label: string
  href: string
  icon: string
  ariaLabel: string
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home',          href: '/',                icon: '⌂', ariaLabel: 'Workspace Home' },
  { label: 'Portfolio',     href: '/portfolio',       icon: '◈', ariaLabel: 'Portfolio' },
  { label: 'Interventions', href: '/interventions',   icon: '▤', ariaLabel: 'Interventions' },
  { label: 'My Work',       href: '/my-work',         icon: '✓', ariaLabel: 'My Work' },
  { label: 'Calendar',      href: '/calendar',        icon: '⊞', ariaLabel: 'Calendar' },
  { label: 'Reports',       href: '/reports',         icon: '⊟', ariaLabel: 'Reports' },
  { label: 'Search',        href: '/search',          icon: '⌕', ariaLabel: 'Search' },
]

const BOTTOM_NAV_ITEMS: NavItem[] = [
  { label: 'Team',          href: '/team',            icon: '◉', ariaLabel: 'Team' },
  { label: 'Notifications', href: '/notifications',   icon: '◎', ariaLabel: 'Notifications' },
  { label: 'Settings',      href: '/settings',        icon: '⚙', ariaLabel: 'Settings' },
]

interface SidebarProps {
  collapsed: boolean
  onToggleCollapse: () => void
  onOpenPalette: () => void
}

export function Sidebar({ collapsed, onToggleCollapse, onOpenPalette }: SidebarProps) {
  const pathname = usePathname()

  return (
    <nav
      className={styles.sidebar}
      style={{ width: collapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)' }}
      aria-label="Main navigation"
    >
      {/* Workspace header */}
      <div className={styles.workspaceHeader}>
        {!collapsed && (
          <div className={styles.workspaceName}>
            <div className={styles.workspaceAvatar}>D</div>
            <span className={styles.workspaceLabel}>Delivery Dashboard</span>
          </div>
        )}
        <button
          className={styles.collapseButton}
          onClick={onToggleCollapse}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? '›' : '‹'}
        </button>
      </div>

      {/* Search / Command palette trigger */}
      <div className={styles.searchTrigger}>
        <button
          className={styles.searchButton}
          onClick={onOpenPalette}
          aria-label="Open command palette (⌘K)"
        >
          <span className={styles.searchIcon}>⌕</span>
          {!collapsed && (
            <>
              <span className={styles.searchLabel}>Search...</span>
              <kbd className={styles.searchKbd}>⌘K</kbd>
            </>
          )}
        </button>
      </div>

      {/* Primary nav */}
      <ul className={styles.navList} role="list">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== '/' && pathname.startsWith(item.href))
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                aria-label={collapsed ? item.ariaLabel : undefined}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className={styles.navIcon} aria-hidden="true">{item.icon}</span>
                {!collapsed && <span className={styles.navLabel}>{item.label}</span>}
              </Link>
            </li>
          )
        })}
      </ul>

      {/* Bottom nav */}
      <ul className={styles.navListBottom} role="list">
        {BOTTOM_NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                aria-label={collapsed ? item.ariaLabel : undefined}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className={styles.navIcon} aria-hidden="true">{item.icon}</span>
                {!collapsed && <span className={styles.navLabel}>{item.label}</span>}
              </Link>
            </li>
          )
        })}

        {/* User avatar */}
        <li>
          <button className={`${styles.navItem} ${styles.userButton}`}>
            <div className={styles.userAvatar} aria-hidden="true">AU</div>
            {!collapsed && <span className={styles.navLabel}>Ahmed Yusuf</span>}
          </button>
        </li>
      </ul>
    </nav>
  )
}
