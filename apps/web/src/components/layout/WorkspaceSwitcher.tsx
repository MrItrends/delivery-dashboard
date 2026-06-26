'use client'

import { useState, useRef, useEffect } from 'react'
import { Icon } from '@/components/primitives/Icon'
import { useToastStore } from '@/stores/useToastStore'
import { CURRENT_WORKSPACE, WORKSPACES, type WorkspaceOption } from './navConfig'
import styles from './WorkspaceSwitcher.module.css'

interface WorkspaceSwitcherProps {
  collapsed: boolean
}

export function WorkspaceSwitcher({ collapsed }: WorkspaceSwitcherProps) {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState<WorkspaceOption>(CURRENT_WORKSPACE)
  const [switching, setSwitching] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const toast = useToastStore()

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

  function switchTo(ws: WorkspaceOption) {
    setOpen(false)
    if (ws.id === current.id) return
    // Workspace switching state — brief transition, context preserved.
    setSwitching(true)
    setTimeout(() => {
      setCurrent(ws)
      setSwitching(false)
      toast.success(`Switched to ${ws.name}`)
    }, 650)
  }

  return (
    <div className={styles.wrap} ref={ref}>
      <button
        type="button"
        className={`${styles.trigger} ${collapsed ? styles.collapsed : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Current workspace: ${current.name}. Switch workspace`}
        data-tooltip={collapsed ? current.name : undefined}
      >
        <span className={styles.avatar} aria-hidden="true">
          {switching ? <Icon name="spinner" size={16} className="spin" /> : current.initial}
        </span>
        {!collapsed && (
          <>
            <span className={styles.info}>
              <span className={styles.name}>{current.name}</span>
              {current.environment && current.environment !== 'Production' && (
                <span className={styles.envBadge}>{current.environment}</span>
              )}
            </span>
            <Icon name="chevron-down" size={16} className={styles.chev} />
          </>
        )}
      </button>

      {open && (
        <div className={styles.menu} role="menu" aria-label="Workspaces">
          <p className={styles.menuLabel}>Workspaces</p>
          {WORKSPACES.map((ws) => (
            <button
              key={ws.id}
              type="button"
              role="menuitemradio"
              aria-checked={ws.id === current.id}
              className={styles.wsItem}
              onClick={() => switchTo(ws)}
            >
              <span className={styles.wsAvatar} aria-hidden="true">{ws.initial}</span>
              <span className={styles.wsInfo}>
                <span className={styles.wsName}>{ws.name}</span>
                {ws.environment && ws.environment !== 'Production' && (
                  <span className={styles.wsEnv}>{ws.environment}</span>
                )}
              </span>
              {ws.id === current.id && <Icon name="check" size={16} className={styles.wsCheck} />}
            </button>
          ))}

          <div className={styles.divider} role="separator" />

          <button type="button" role="menuitem" className={styles.action} onClick={() => { setOpen(false); toast.info('Create workspace') }}>
            <Icon name="plus" size={16} className={styles.actionIcon} />
            Create workspace
          </button>
          <button type="button" role="menuitem" className={styles.action} onClick={() => { setOpen(false); toast.info('Manage workspace') }}>
            <Icon name="settings" size={16} className={styles.actionIcon} />
            Manage workspace
          </button>
        </div>
      )}
    </div>
  )
}
