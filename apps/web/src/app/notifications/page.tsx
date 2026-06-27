'use client'

import { AppShell } from '@/components/layout/AppShell'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/primitives/Button'
import { Avatar } from '@/components/primitives/Avatar'
import { useNotifications, useNotificationMutations } from '@/lib/data/useNotifications'
import { timeAgo } from '@/lib/format'
import page from '@/components/portfolio/PortfolioWorkspace.module.css'
import s from '@/components/pages/pages.module.css'

export default function NotificationsPage() {
  const { data, isLoading } = useNotifications()
  const { readAll, readOne } = useNotificationMutations()
  const items = data ?? []
  const unread = items.filter((n) => !n.read).length

  return (
    <AppShell>
      <div className={page.page}>
        <PageHeader
          title="Notifications"
          description="Everything that needs your attention across the workspace."
          primaryAction={<Button variant="secondary" size="md" onClick={() => readAll.mutate()} disabled={unread === 0 || readAll.isPending}>Mark all read</Button>}
        />
        <div className={page.body}>
          {isLoading ? (
            <div className={s.empty}>Loading…</div>
          ) : items.length === 0 ? (
            <div className={s.empty}>You&rsquo;re all caught up.</div>
          ) : (
            <ul className={s.list} role="list">
              {items.map((n) => (
                <li key={n.id}>
                  <button type="button" className={`${s.row} ${s.rowButton}`} onClick={() => { if (!n.read) readOne.mutate(n.id) }}>
                    <span className={n.read ? s.readDot : s.unreadDot} aria-hidden="true" />
                    <Avatar name={n.actor || 'System'} size="sm" />
                    <span className={s.rowMain}>
                      <span className={s.rowTitle}><strong>{n.actor || 'System'}</strong> {n.action} {n.target ?? ''}</span>
                      <span className={s.rowSub}>{[n.context, timeAgo(n.created_at)].filter(Boolean).join(' · ')}</span>
                    </span>
                    <span className={s.tag}>{n.type}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AppShell>
  )
}
