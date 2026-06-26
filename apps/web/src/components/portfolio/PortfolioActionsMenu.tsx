'use client'

import { useState, useRef, useEffect } from 'react'
import { Icon, type IconName } from '@/components/primitives/Icon'
import { useToastStore } from '@/stores/useToastStore'
import styles from './PortfolioActionsMenu.module.css'

const ACTIONS: { id: string; label: string; icon: IconName; danger?: boolean; separatorBefore?: boolean }[] = [
  { id: 'share', label: 'Share', icon: 'users' },
  { id: 'export', label: 'Export', icon: 'document' },
  { id: 'compare', label: 'Compare', icon: 'grid' },
  { id: 'manage', label: 'Manage portfolio', icon: 'settings', separatorBefore: true },
  { id: 'archive', label: 'Archive', icon: 'inbox', danger: true },
]

export function PortfolioActionsMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const toast = useToastStore()

  useEffect(() => {
    function onDoc(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') setOpen(false) }
    if (open) { document.addEventListener('mousedown', onDoc); document.addEventListener('keydown', onKey) }
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey) }
  }, [open])

  return (
    <div className={styles.wrap} ref={ref}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="More portfolio actions"
      >
        <Icon name="more-horizontal" size={18} />
      </button>
      {open && (
        <div className={styles.menu} role="menu">
          {ACTIONS.map((a) => (
            <div key={a.id}>
              {a.separatorBefore && <div className={styles.separator} role="separator" />}
              <button
                type="button"
                role="menuitem"
                className={`${styles.item} ${a.danger ? styles.danger : ''}`}
                onClick={() => { setOpen(false); toast.info(a.label) }}
              >
                <Icon name={a.icon} size={15} className={styles.itemIcon} />
                {a.label}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
