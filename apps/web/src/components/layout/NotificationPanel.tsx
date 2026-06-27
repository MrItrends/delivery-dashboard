'use client'

import { useState, useEffect, useMemo } from 'react'
import { Avatar } from '@/components/primitives/Avatar'
import { useNotifications, useNotificationMutations } from '@/lib/data/useNotifications'
import type { DbNotification } from '@/lib/data/notifications'
import styles from './NotificationPanel.module.css'

type Filter = 'all' | 'unread' | 'mention' | 'approval'

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'unread', label: 'Unread' },
  { id: 'mention', label: 'Mentions' },
  { id: 'approval', label: 'Approvals' },
]

function dayGroup(iso: string): 'Today' | 'Yesterday' | 'Earlier' {
  const d = new Date(iso)
  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  const t = d.getTime()
  if (t >= startOfToday) return 'Today'
  if (t >= startOfToday - 86400000) return 'Yesterday'
  return 'Earlier'
}

function timeAgo(iso: string) {
  const m = Math.floor((Date.now() - new Date(iso).getTime()) / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })
}

interface NotificationPanelProps {
  open: boolean
  onClose: () => void
}

export function NotificationPanel({ open, onClose }: NotificationPanelProps) {
  const [filter, setFilter] = useState<Filter>('all')
  const { data, isLoading } = useNotifications()
  const { readAll, readOne } = useNotificationMutations()
  const items = useMemo(() => data ?? [], [data])

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape' && open) onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const filtered = useMemo(() => {
    if (filter === 'all') return items
    if (filter === 'unread') return items.filter((n) => !n.read)
    return items.filter((n) => n.type === filter)
  }, [items, filter])

  const grouped = useMemo(() => {
    const groups: { label: string; items: DbNotification[] }[] = []
    for (const n of filtered) {
      const label = dayGroup(n.created_at)
      let g = groups.find((x) => x.label === label)
      if (!g) { g = { label, items: [] }; groups.push(g) }
      g.items.push(n)
    }
    return groups
  }, [filtered])

  const unreadCount = items.filter((n) => !n.read).length

  return (
    <>
      <div className={`${styles.backdrop} ${open ? styles.backdropOpen : ''}`} onClick={onClose} aria-hidden="true" />
      <aside className={`${styles.panel} ${open ? styles.open : ''}`} role="dialog" aria-label="Notifications" aria-hidden={!open} inert={!open ? true : undefined}>
        <header className={styles.header}>
          <h2 className={styles.title}>Notifications</h2>
          <div className={styles.headerActions}>
            <button type="button" className={styles.markAll} onClick={() => readAll.mutate()} disabled={unreadCount === 0 || readAll.isPending}>
              Mark all read
            </button>
            <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close notifications">✕</button>
          </div>
        </header>

        <div className={styles.filters} role="tablist" aria-label="Filter notifications">
          {FILTERS.map((f) => (
            <button key={f.id} role="tab" aria-selected={filter === f.id}
              className={`${styles.filterChip} ${filter === f.id ? styles.filterActive : ''}`}
              onClick={() => setFilter(f.id)}>
              {f.label}
              {f.id === 'unread' && unreadCount > 0 && <span className={styles.filterCount}>{unreadCount}</span>}
            </button>
          ))}
        </div>

        <div className={styles.body}>
          {isLoading ? (
            <div className={styles.empty}>Loading…</div>
          ) : grouped.length === 0 ? (
            <div className={styles.empty}>You&rsquo;re all caught up.</div>
          ) : (
            grouped.map((group) => (
              <section key={group.label} className={styles.group}>
                <h3 className={styles.groupLabel}>{group.label}</h3>
                <ul className={styles.list} role="list">
                  {group.items.map((n) => (
                    <li key={n.id}>
                      <button type="button" className={`${styles.item} ${!n.read ? styles.unread : ''}`} onClick={() => { if (!n.read) readOne.mutate(n.id) }}>
                        <span className={styles.unreadDot} aria-hidden="true" />
                        <Avatar name={n.actor || 'System'} size="sm" />
                        <span className={styles.itemBody}>
                          <span className={styles.itemText}>
                            <span className={styles.actor}>{n.actor || 'System'}</span> {n.action}{' '}
                            {n.target && <span className={styles.target}>{n.target}</span>}
                          </span>
                          <span className={styles.itemMeta}>{[n.context, timeAgo(n.created_at)].filter(Boolean).join(' · ')}</span>
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
