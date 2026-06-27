'use client'

import { useQuery } from '@tanstack/react-query'
import { AppShell } from '@/components/layout/AppShell'
import { PageHeader } from '@/components/layout/PageHeader'
import { Avatar } from '@/components/primitives/Avatar'
import { listAudit } from '@/lib/data/audit'
import { timeAgo } from '@/lib/format'
import page from '@/components/portfolio/PortfolioWorkspace.module.css'
import s from '@/components/pages/pages.module.css'

export default function AuditPage() {
  const { data, isLoading } = useQuery({ queryKey: ['audit'], queryFn: listAudit })
  const items = data ?? []

  return (
    <AppShell>
      <div className={page.page}>
        <PageHeader title="Audit log" description="An immutable record of changes across the workspace." />
        <div className={page.body}>
          {isLoading ? (
            <div className={s.empty}>Loading…</div>
          ) : items.length === 0 ? (
            <div className={s.empty}>No activity recorded yet. Changes will appear here as people work.</div>
          ) : (
            <ul className={s.list} role="list">
              {items.map((e) => (
                <li key={e.id}>
                  <div className={s.row}>
                    <Avatar name={e.actor?.name ?? 'System'} size="sm" />
                    <span className={s.rowMain}>
                      <span className={s.rowTitle}><strong>{e.actor?.name ?? 'System'}</strong> {e.action} {e.field ? `· ${e.field}` : ''}</span>
                      <span className={s.rowSub}>{e.object_type} · {timeAgo(e.created_at)}</span>
                    </span>
                    {e.next && <span className={s.rowMeta}>{e.previous ? `${e.previous} → ${e.next}` : e.next}</span>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AppShell>
  )
}
