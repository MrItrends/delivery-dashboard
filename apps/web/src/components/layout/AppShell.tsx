'use client'

import { useState, useEffect } from 'react'
import { Sidebar } from './Sidebar'
import { GlobalHeader } from './GlobalHeader'
import { BottomNav } from './BottomNav'
import { NotificationPanel } from './NotificationPanel'
import { CommandPalette } from '@/components/overlay/CommandPalette'
import { useAppStore } from '@/stores/useAppStore'
import { useOnline } from '@/lib/hooks/useOnline'
import { useIsMobile } from '@/lib/hooks/useMediaQuery'
import { useUnreadCount } from '@/lib/data/useNotifications'
import { useRealtime } from '@/lib/data/useRealtime'
import styles from './AppShell.module.css'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const isMobile = useIsMobile()
  const online = useOnline()

  const storeCollapsed = useAppStore((s) => s.sidebarCollapsed)
  const setStoreCollapsed = useAppStore((s) => s.setSidebarCollapsed)

  const [paletteOpen, setPaletteOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  // Collapsed preference is desktop-only; mobile always uses the full drawer.
  const collapsed = isMobile ? false : storeCollapsed

  // Close the mobile drawer whenever we leave mobile.
  useEffect(() => {
    if (!isMobile) setMobileNavOpen(false)
  }, [isMobile])

  const navWidth = isMobile
    ? '0px'
    : collapsed
    ? 'var(--sidebar-collapsed-width)'
    : 'var(--sidebar-width)'

  const unread = useUnreadCount()
  useRealtime('notifications', ['notifications'])

  return (
    <div
      className={styles.shell}
      style={{ '--frame-nav-width': navWidth } as React.CSSProperties}
    >
      {/* Left navigation */}
      <Sidebar
        collapsed={collapsed}
        mobileOpen={isMobile && mobileNavOpen}
        onToggleCollapse={() => setStoreCollapsed(!storeCollapsed)}
      />

      {/* Mobile drawer backdrop */}
      {isMobile && mobileNavOpen && (
        <div
          className={styles.mobileBackdrop}
          onClick={() => setMobileNavOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main region */}
      <div className={styles.main}>
        <GlobalHeader
          onOpenPalette={() => setPaletteOpen(true)}
          onOpenNotifications={() => setNotificationsOpen(true)}
          onOpenMobileNav={() => setMobileNavOpen(true)}
          unreadCount={unread}
          offline={!online}
        />
        <main className={styles.content}>{children}</main>
      </div>

      {/* Mobile bottom navigation */}
      {isMobile && (
        <BottomNav
          onOpenPalette={() => setPaletteOpen(true)}
          onOpenNotifications={() => setNotificationsOpen(true)}
          onOpenMenu={() => setMobileNavOpen(true)}
          unreadCount={unread}
        />
      )}

      {/* Overlays */}
      <NotificationPanel open={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  )
}
