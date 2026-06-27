'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/primitives/Button'
import { Icon, type IconName } from '@/components/primitives/Icon'
import { GlobalCreateDrawer } from '@/components/entity/GlobalCreateDrawer'
import styles from './CreateMenu.module.css'

interface CreateOption {
  id: string
  label: string
  icon: IconName
}

const OPTIONS: CreateOption[] = [
  { id: 'priorityArea', label: 'Priority area', icon: 'target' },
  { id: 'project', label: 'Project', icon: 'folder' },
  { id: 'intervention', label: 'Intervention', icon: 'layers' },
  { id: 'activity', label: 'Activity', icon: 'check-circle' },
  { id: 'report', label: 'Report', icon: 'document' },
]

/** Compact icon-only variant for tight headers. */
export function CreateMenu({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false)
  const [createKey, setCreateKey] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()

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

  function select(option: CreateOption) {
    setOpen(false)
    if (option.id === 'report') { router.push('/reports'); return }
    setCreateKey(option.id)
  }

  return (
    <div className={styles.wrap} ref={ref}>
      <Button
        variant="primary"
        size={compact ? 'sm' : 'md'}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Create new"
        iconLeft={<Icon name="plus" size={compact ? 15 : 16} />}
      >
        {compact ? '' : 'Create'}
      </Button>

      {open && (
        <div className={styles.menu} role="menu" aria-label="Create new">
          {OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              role="menuitem"
              className={styles.item}
              onClick={() => select(option)}
            >
              <span className={styles.itemIcon} aria-hidden="true">
                <Icon name={option.icon} size={16} />
              </span>
              <span className={styles.itemLabel}>{option.label}</span>
            </button>
          ))}
        </div>
      )}

      {createKey && (
        <GlobalCreateDrawer entityKey={createKey} open onClose={() => setCreateKey(null)} />
      )}
    </div>
  )
}
