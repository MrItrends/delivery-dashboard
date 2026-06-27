'use client'

import { useQuery } from '@tanstack/react-query'
import { AppShell } from '@/components/layout/AppShell'
import { PageHeader } from '@/components/layout/PageHeader'
import { Icon } from '@/components/primitives/Icon'
import { listUpcoming } from '@/lib/data/calendar'
import page from '@/components/portfolio/PortfolioWorkspace.module.css'
import s from '@/components/pages/pages.module.css'

export default function CalendarPage() {
  const { data, isLoading } = useQuery({ queryKey: ['calendar'], queryFn: listUpcoming })
  const items = data ?? []

  return (
    <AppShell>
      <div className={page.page}>
        <PageHeader title="Calendar" description="Upcoming milestones and activity deadlines across the workspace." />
        <div className={page.body}>
          {isLoading ? (
            <div className={s.empty}>Loading…</div>
          ) : items.length === 0 ? (
            <div className={s.empty}>Nothing scheduled yet. Milestones and activity due dates appear here.</div>
          ) : (
            <ul className={s.list} role="list">
              {items.map((it) => (
                <li key={`${it.kind}-${it.id}`}>
                  <div className={s.row}>
                    <Icon name={it.kind === 'Milestone' ? 'target' : 'check-circle'} size={16} style={{ color: 'var(--color-text-tertiary)' }} />
                    <span className={s.rowMain}>
                      <span className={s.rowTitle}>{it.title}</span>
                      {it.context && <span className={s.rowSub}>{it.context}</span>}
                    </span>
                    <span className={s.rowRight}>
                      <span className={s.tag}>{it.kind}</span>
                      <span className={s.rowMeta}>{it.when}</span>
                    </span>
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
