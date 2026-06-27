'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Icon, type IconName } from '@/components/primitives/Icon'
import { getRecents, type RecentItem } from '@/lib/data/recents'
import { WorkspaceSwitcher } from './WorkspaceSwitcher'
import { UserMenu } from './UserMenu'
import { PRIMARY_NAV, SECONDARY_NAV, type NavItem } from './navConfig'
import styles from './Sidebar.module.css'

interface SidebarProps {
  collapsed: boolean
  onToggleCollapse: () => void
  /** Slides the sidebar in as a drawer on mobile. */
  mobileOpen?: boolean
}

function isActiveHref(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(href + '/')
}

const TYPE_ICON: Record<string, IconName> = {
  Portfolio: 'grid', 'Priority area': 'target', Project: 'folder', Intervention: 'layers', Report: 'document',
}

// Targets for the first-run tour (see lib/coachmarks/tour.ts).
const COACH_TARGET: Record<string, string> = {
  '/': 'nav-home', '/priority-areas': 'nav-priority', '/projects': 'nav-projects', '/reports': 'nav-reports',
}

export function Sidebar({ collapsed, onToggleCollapse, mobileOpen }: SidebarProps) {
  const pathname = usePathname()
  const [recents, setRecents] = useState<RecentItem[]>([])

  // Recently visited — real, from the user's own navigation. Refreshes on route change.
  useEffect(() => { setRecents(getRecents()) }, [pathname])

  return (
    <nav
      className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''} ${mobileOpen ? styles.mobileOpen : ''}`}
      aria-label="Primary"
      data-collapsed={collapsed}
    >
      <WorkspaceSwitcher collapsed={collapsed} />

      <div className={styles.scroll}>
        {/* Primary navigation */}
        <ul className={styles.navList} role="list">
          {PRIMARY_NAV.map((item: NavItem) => {
            const active = isActiveHref(pathname, item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${styles.navItem} ${active ? styles.active : ''}`}
                  aria-current={active ? 'page' : undefined}
                  aria-label={item.label}
                  data-tooltip={collapsed ? item.label : undefined}
                  data-coach={COACH_TARGET[item.href]}
                >
                  <Icon name={item.icon} size={18} className={styles.navIcon} />
                  {!collapsed && <span className={styles.navLabel}>{item.label}</span>}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Recently visited — only when the user has actually been somewhere */}
        {!collapsed && recents.length > 0 && (
          <>
            <div className={styles.divider} role="separator" />
            <div className={styles.section}>
              <p className={styles.sectionTitle}>Recent</p>
              <ul className={styles.objectList} role="list">
                {recents.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={styles.objectItem}>
                      <Icon name={TYPE_ICON[item.type] ?? 'arrow-right'} size={16} className={styles.objectIcon} />
                      <span className={styles.objectLabel}>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>

      {/* Footer — settings + user + collapse toggle */}
      <div className={styles.footer}>
        <div className={styles.divider} role="separator" />
        <ul className={styles.navList} role="list">
          {SECONDARY_NAV.map((item: NavItem) => {
            const active = isActiveHref(pathname, item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${styles.navItem} ${active ? styles.active : ''}`}
                  aria-current={active ? 'page' : undefined}
                  aria-label={item.label}
                  data-tooltip={collapsed ? item.label : undefined}
                  data-coach={COACH_TARGET[item.href]}
                >
                  <Icon name={item.icon} size={18} className={styles.navIcon} />
                  {!collapsed && <span className={styles.navLabel}>{item.label}</span>}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className={styles.userRow}>
          <UserMenu collapsed={collapsed} />
          {!collapsed && (
            <button
              type="button"
              className={styles.collapseBtn}
              onClick={onToggleCollapse}
              aria-label="Collapse sidebar"
              data-tooltip="Collapse"
            >
              <Icon name="arrow-left" size={16} />
            </button>
          )}
        </div>

        {collapsed && (
          <button
            type="button"
            className={`${styles.collapseBtn} ${styles.collapseBtnExpand}`}
            onClick={onToggleCollapse}
            aria-label="Expand sidebar"
            data-tooltip="Expand"
          >
            <Icon name="arrow-right" size={16} />
          </button>
        )}
      </div>
    </nav>
  )
}
