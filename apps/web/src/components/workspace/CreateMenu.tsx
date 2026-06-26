'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/primitives/Button'
import { Icon, type IconName } from '@/components/primitives/Icon'
import { useToastStore } from '@/stores/useToastStore'
import styles from './CreateMenu.module.css'

interface CreateOption {
  id: string
  label: string
  icon: IconName
  shortcut?: string
}

const OPTIONS: CreateOption[] = [
  { id: 'project', label: 'Project', icon: 'shield' },
  { id: 'intervention', label: 'Intervention', icon: 'check-circle' },
  { id: 'activity', label: 'Activity', icon: 'check', shortcut: 'C' },
  { id: 'report', label: 'Report', icon: 'clock' },
]

export function CreateMenu() {
  const [open, setOpen] = useState(false)
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

  function handleSelect(option: CreateOption) {
    setOpen(false)
    toast.info(`New ${option.label} — opens in a drawer (coming soon)`)
  }

  return (
    <div className={styles.wrap} ref={ref}>
      <Button
        variant="primary"
        size="md"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        iconRight={<Icon name="arrow-right" size={15} className={open ? styles.chevUp : styles.chev} />}
      >
        Create
      </Button>

      {open && (
        <div className={styles.menu} role="menu" aria-label="Create new">
          {OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              role="menuitem"
              className={styles.item}
              onClick={() => handleSelect(option)}
            >
              <span className={styles.itemIcon} aria-hidden="true">
                <Icon name={option.icon} size={16} />
              </span>
              <span className={styles.itemLabel}>{option.label}</span>
              {option.shortcut && <kbd className={styles.kbd}>{option.shortcut}</kbd>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
