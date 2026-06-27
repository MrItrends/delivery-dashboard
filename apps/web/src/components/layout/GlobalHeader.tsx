'use client'

import { usePathname } from 'next/navigation'
import { Breadcrumb, type BreadcrumbItem } from '@/components/navigation/Breadcrumb'
import { Icon } from '@/components/primitives/Icon'
import { CreateMenu } from './CreateMenu'
import { useWorkspace } from '@/lib/data/useWorkspace'
import { ROUTE_LABELS } from './navConfig'
import styles from './GlobalHeader.module.css'

function prettify(segment: string) {
  return segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

/** Derive the breadcrumb trail automatically from the current route. */
function useBreadcrumb(rootLabel: string): BreadcrumbItem[] {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  const items: BreadcrumbItem[] = [{ label: rootLabel, href: '/' }]
  let path = ''
  for (const seg of segments) {
    path += `/${seg}`
    items.push({ label: ROUTE_LABELS[seg] ?? prettify(seg), href: path })
  }
  // The last item is the current page (Breadcrumb renders it non-interactive).
  const last = items[items.length - 1]
  if (last) delete (last as { href?: string }).href
  return items
}

interface GlobalHeaderProps {
  onOpenPalette: () => void
  onOpenNotifications: () => void
  onOpenMobileNav: () => void
  unreadCount: number
  offline?: boolean
}

export function GlobalHeader({
  onOpenPalette,
  onOpenNotifications,
  onOpenMobileNav,
  unreadCount,
  offline,
}: GlobalHeaderProps) {
  const { data: workspace } = useWorkspace()
  const breadcrumb = useBreadcrumb(workspace?.name ?? 'Home')

  return (
    <header className={styles.header} role="banner">
      <div className={styles.left}>
        <button
          type="button"
          className={styles.hamburger}
          onClick={onOpenMobileNav}
          aria-label="Open navigation"
        >
          <Icon name="menu" size={20} />
        </button>
        <Breadcrumb items={breadcrumb} />
      </div>

      <div className={styles.right}>
        {offline && (
          <span className={styles.offline} role="status">
            <span className={styles.offlineDot} aria-hidden="true" />
            Offline
          </span>
        )}

        {/* Search — opens the command palette */}
        <button
          type="button"
          className={styles.search}
          onClick={onOpenPalette}
          aria-label="Search (Command or Control K)"
        >
          <Icon name="search" size={16} className={styles.searchIcon} />
          <span className={styles.searchLabel}>Search…</span>
          <kbd className={styles.kbd}>⌘K</kbd>
        </button>

        <button
          type="button"
          className={styles.searchMobile}
          onClick={onOpenPalette}
          aria-label="Search"
        >
          <Icon name="search" size={20} />
        </button>

        <CreateMenu />

        <button
          type="button"
          className={styles.iconBtn}
          onClick={onOpenNotifications}
          aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
        >
          <Icon name="bell" size={20} />
          {unreadCount > 0 && <span className={styles.badge} aria-hidden="true" />}
        </button>
      </div>
    </header>
  )
}
