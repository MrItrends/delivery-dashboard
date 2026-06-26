'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Icon } from '@/components/primitives/Icon'
import { useContextMenu, type ContextMenuItem } from '@/components/primitives/ContextMenu'
import { useToastStore } from '@/stores/useToastStore'
import { WorkspaceSwitcher } from './WorkspaceSwitcher'
import { UserMenu } from './UserMenu'
import {
  PRIMARY_NAV,
  SECONDARY_NAV,
  PINNED_ITEMS,
  RECENT_ITEMS,
  type NavItem,
} from './navConfig'
import styles from './Sidebar.module.css'

interface SidebarProps {
  collapsed: boolean
  onToggleCollapse: () => void
  /** Slides the sidebar in as a drawer on mobile. */
  mobileOpen?: boolean
  /** When true the workspace has no content yet — hide pinned/recent. */
  emptyWorkspace?: boolean
}

function isActiveHref(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(href + '/')
}

export function Sidebar({ collapsed, onToggleCollapse, mobileOpen, emptyWorkspace }: SidebarProps) {
  const pathname = usePathname()
  const toast = useToastStore()
  const { open: openContextMenu, menu } = useContextMenu()

  const navMenu = (item: NavItem): ContextMenuItem[] => [
    { label: 'Open', icon: 'arrow-right', onClick: () => toast.info(`Open ${item.label}`) },
    { label: 'Pin to sidebar', icon: 'pin', onClick: () => toast.success(`Pinned ${item.label}`) },
  ]

  const pinnedMenu = (label: string): ContextMenuItem[] => [
    { label: 'Open', icon: 'arrow-right', onClick: () => toast.info(`Open ${label}`) },
    { label: 'Unpin', icon: 'pin', danger: true, onClick: () => toast.info(`Unpinned ${label}`), separatorBefore: true },
  ]

  return (
    <nav
      className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''} ${mobileOpen ? styles.mobileOpen : ''}`}
      aria-label="Primary"
      data-collapsed={collapsed}
    >
      {/* Workspace switcher */}
      <WorkspaceSwitcher collapsed={collapsed} />

      <div className={styles.scroll}>
        {/* Primary navigation */}
        <ul className={styles.navList} role="list">
          {PRIMARY_NAV.map((item) => {
            const active = isActiveHref(pathname, item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${styles.navItem} ${active ? styles.active : ''}`}
                  aria-current={active ? 'page' : undefined}
                  aria-label={item.label}
                  data-tooltip={collapsed ? item.label : undefined}
                  onContextMenu={openContextMenu(navMenu(item))}
                >
                  <Icon name={item.icon} size={18} className={styles.navIcon} />
                  {!collapsed && <span className={styles.navLabel}>{item.label}</span>}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Pinned + Recent — hidden when collapsed or empty */}
        {!collapsed && !emptyWorkspace && (
          <>
            <div className={styles.divider} role="separator" />

            <Section title="Pinned">
              {PINNED_ITEMS.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={styles.objectItem}
                    onContextMenu={openContextMenu(pinnedMenu(item.label))}
                  >
                    <Icon name={item.icon} size={16} className={styles.objectIcon} />
                    <span className={styles.objectLabel}>{item.label}</span>
                    {item.status && (
                      <span className={`${styles.statusDot} ${styles[`s_${item.status}`] ?? ''}`} aria-hidden="true" />
                    )}
                  </Link>
                </li>
              ))}
            </Section>

            <Section title="Recent">
              {RECENT_ITEMS.slice(0, 8).map((item) => (
                <li key={item.id}>
                  <Link href={item.href} className={styles.objectItem}>
                    <Icon name={item.icon} size={16} className={styles.objectIcon} />
                    <span className={styles.objectLabel}>{item.label}</span>
                  </Link>
                </li>
              ))}
            </Section>
          </>
        )}

        {/* Empty workspace hint */}
        {!collapsed && emptyWorkspace && (
          <div className={styles.emptyHint}>
            <p className={styles.emptyHintText}>
              Pinned and recent items appear here as you work.
            </p>
          </div>
        )}
      </div>

      {/* Footer — settings + user + collapse toggle */}
      <div className={styles.footer}>
        <div className={styles.divider} role="separator" />
        <ul className={styles.navList} role="list">
          {SECONDARY_NAV.map((item) => {
            const active = isActiveHref(pathname, item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${styles.navItem} ${active ? styles.active : ''}`}
                  aria-current={active ? 'page' : undefined}
                  aria-label={item.label}
                  data-tooltip={collapsed ? item.label : undefined}
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

      {menu}
    </nav>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className={styles.section}>
      <p className={styles.sectionTitle}>{title}</p>
      <ul className={styles.objectList} role="list">
        {children}
      </ul>
    </div>
  )
}
