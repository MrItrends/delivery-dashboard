'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Avatar } from '@/components/primitives/Avatar'
import { Icon, type IconName } from '@/components/primitives/Icon'
import { useToastStore } from '@/stores/useToastStore'
import styles from './UserMenu.module.css'

const USER = { name: 'Ahmed Yusuf', email: 'ahmed.yusuf@gov.uk' }

interface MenuCtx {
  router: ReturnType<typeof useRouter>
  toast: { info: (m: string) => void; success: (m: string) => void }
}

interface MenuEntry {
  label: string
  icon: IconName
  onClick: (ctx: MenuCtx) => void
  danger?: boolean
  separatorBefore?: boolean
}

const ENTRIES: MenuEntry[] = [
  { label: 'Profile', icon: 'users', onClick: ({ toast }) => toast.info('Profile') },
  { label: 'Preferences', icon: 'sliders', onClick: ({ toast }) => toast.info('Preferences') },
  { label: 'Keyboard shortcuts', icon: 'keyboard', onClick: ({ toast }) => toast.info('Keyboard shortcuts') },
  { label: 'Appearance', icon: 'sun', onClick: ({ toast }) => toast.info('Appearance') },
  { label: 'Workspace settings', icon: 'settings', onClick: ({ router }) => router.push('/settings') },
  { label: 'Log out', icon: 'logout', danger: true, separatorBefore: true, onClick: ({ router }) => router.push('/login') },
]

export function UserMenu({ collapsed }: { collapsed: boolean }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()
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

  return (
    <div className={`${styles.wrap} ${collapsed ? styles.collapsed : ''}`} ref={ref}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Account: ${USER.name}`}
        data-tooltip={collapsed ? USER.name : undefined}
      >
        <Avatar name={USER.name} size="sm" />
        {!collapsed && (
          <span className={styles.info}>
            <span className={styles.name}>{USER.name}</span>
            <span className={styles.email}>{USER.email}</span>
          </span>
        )}
      </button>

      {open && (
        <div className={styles.menu} role="menu" aria-label="Account menu">
          <div className={styles.header}>
            <Avatar name={USER.name} size="md" />
            <span className={styles.headerInfo}>
              <span className={styles.name}>{USER.name}</span>
              <span className={styles.email}>{USER.email}</span>
            </span>
          </div>
          <div className={styles.divider} role="separator" />
          {ENTRIES.map((entry) => (
            <div key={entry.label}>
              {entry.separatorBefore && <div className={styles.divider} role="separator" />}
              <button
                type="button"
                role="menuitem"
                className={`${styles.item} ${entry.danger ? styles.danger : ''}`}
                onClick={() => { setOpen(false); entry.onClick({ router, toast }) }}
              >
                <Icon name={entry.icon} size={16} className={styles.itemIcon} />
                {entry.label}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
