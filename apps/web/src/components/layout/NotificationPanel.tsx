'use client'

import { useState, useEffect, useMemo } from 'react'
import { Avatar } from '@/components/primitives/Avatar'
import { NOTIFICATIONS, type FrameNotification } from './navConfig'
import styles from './NotificationPanel.module.css'

type Filter = 'all' | 'unread' | 'mention' | 'approval'

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'unread', label: 'Unread' },
  { id: 'mention', label: 'Mentions' },
  { id: 'approval', label: 'Approvals' },
]

interface NotificationPanelProps {
  open: boolean
  onClose: () => void
}

export function NotificationPanel({ open, onClose }: NotificationPanelProps) {
  const [filter, setFilter] = useState<Filter>('all')
  const [items, setItems] = useState<FrameNotification[]>(NOTIFICATIONS)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && open) onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const filtered = useMemo(() => {
    if (filter === 'all') return items
    if (filter === 'unread') return items.filter((n) => n.unread)
    return items.filter((n) => n.category === filter)
  }, [items, filter])

  const grouped = useMemo(() => {
    const groups: { label: string; items: FrameNotification[] }[] = []
    for (const n of filtered) {
      let g = groups.find((x) => x.label === n.group)
      if (!g) { g = { label: n.group, items: [] }; groups.push(g) }
      g.items.push(n)
    }
    return groups
  }, [filtered])

  const unreadCount = items.filter((n) => n.unread).length

  return (
    <>
      <div
        className={`${styles.backdrop} ${open ? styles.backdropOpen : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`${styles.panel} ${open ? styles.open : ''}`}
        role="dialog"
        aria-label="Notifications"
        aria-hidden={!open}
        inert={!open ? true : undefined}
      >
        <header className={styles.header}>
          <h2 className={styles.title}>Notifications</h2>
          <div className={styles.headerActions}>
            <button
              type="button"
              className={styles.markAll}
              onClick={() => setItems((prev) => prev.map((n) => ({ ...n, unread: false })))}
              disabled={unreadCount === 0}
            >
              Mark all read
            </button>
            <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close notifications">
              ✕
            </button>
          </div>
        </header>

        <div className={styles.filters} role="tablist" aria-label="Filter notifications">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              className={`${styles.filterChip} ${filter === f.id ? styles.filterActive : ''}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
              {f.id === 'unread' && unreadCount > 0 && (
                <span className={styles.filterCount}>{unreadCount}</span>
              )}
            </button>
          ))}
        </div>

        <div className={styles.body}>
          {grouped.length === 0 ? (
            <div className={styles.empty}>You&rsquo;re all caught up.</div>
          ) : (
            grouped.map((group) => (
              <section key={group.label} className={styles.group}>
                <h3 className={styles.groupLabel}>{group.label}</h3>
                <ul className={styles.list} role="list">
                  {group.items.map((n) => (
                    <li key={n.id}>
                      <button
                        type="button"
                        className={`${styles.item} ${n.unread ? styles.unread : ''}`}
                        onClick={() => setItems((prev) => prev.map((x) => (x.id === n.id ? { ...x, unread: false } : x)))}
                      >
                        <span className={styles.unreadDot} aria-hidden="true" />
                        <Avatar name={n.actor} size="sm" />
                        <span className={styles.itemBody}>
                          <span className={styles.itemText}>
                            <span className={styles.actor}>{n.actor}</span> {n.action}{' '}
                            <span className={styles.target}>{n.target}</span>
                          </span>
                          <span className={styles.itemMeta}>{n.context} · {n.time}</span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            ))
          )}
        </div>
      </aside>
    </>
  )
}
