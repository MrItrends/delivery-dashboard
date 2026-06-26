'use client'

import { useState } from 'react'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { CommandPalette } from '@/components/overlay/CommandPalette'
import styles from './AppShell.module.css'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)

  return (
    <div className={styles.shell}>
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((v) => !v)}
        onOpenPalette={() => setPaletteOpen(true)}
      />

      <div
        className={styles.main}
        style={{
          marginLeft: sidebarCollapsed
            ? 'var(--sidebar-collapsed-width)'
            : 'var(--sidebar-width)',
        }}
      >
        <TopBar onOpenPalette={() => setPaletteOpen(true)} />
        <main className={styles.content}>{children}</main>
      </div>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  )
}
