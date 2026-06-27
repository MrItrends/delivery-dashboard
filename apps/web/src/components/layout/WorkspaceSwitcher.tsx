'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Icon } from '@/components/primitives/Icon'
import { useWorkspace } from '@/lib/data/useWorkspace'
import styles from './WorkspaceSwitcher.module.css'

interface WorkspaceSwitcherProps {
  collapsed: boolean
}

export function WorkspaceSwitcher({ collapsed }: WorkspaceSwitcherProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { data: workspace } = useWorkspace()

  const name = workspace?.name ?? 'Workspace'
  const initial = (workspace?.name?.trim()?.[0] ?? 'W').toUpperCase()

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) {
      document.addEventListener('mousedown', onDoc)
      document.addEventListener('keydown', onKey)
    }
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className={styles.wrap} ref={ref}>
      <button
        type="button"
        className={`${styles.trigger} ${collapsed ? styles.collapsed : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Current workspace: ${name}`}
        data-tooltip={collapsed ? name : undefined}
      >
        <span className={styles.avatar} aria-hidden="true">{initial}</span>
        {!collapsed && (
          <>
            <span className={styles.info}>
              <span className={styles.name}>{name}</span>
            </span>
            <Icon name="chevron-down" size={16} className={styles.chev} />
          </>
        )}
      </button>

      {open && (
        <div className={styles.menu} role="menu" aria-label="Workspace">
          <div className={styles.wsItem} aria-current="true">
            <span className={styles.wsAvatar} aria-hidden="true">{initial}</span>
            <span className={styles.wsInfo}>
              <span className={styles.wsName}>{name}</span>
              {workspace?.organization && <span className={styles.wsEnv}>{workspace.organization}</span>}
            </span>
            <Icon name="check" size={16} className={styles.wsCheck} />
          </div>

          <div className={styles.divider} role="separator" />

          <button type="button" role="menuitem" className={styles.action} onClick={() => { setOpen(false); router.push('/settings') }}>
            <Icon name="settings" size={16} className={styles.actionIcon} />
            Workspace settings
          </button>
        </div>
      )}
    </div>
  )
}
