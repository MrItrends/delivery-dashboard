'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'
import { EntityCollection } from '@/components/entity/EntityCollection'
import { useCapabilities } from '@/lib/data/roles'
import { useRealtime } from '@/lib/data/useRealtime'
import { listPriorityAreaCards, type PriorityAreaCard, type ActivityBreakdown } from '@/lib/data/priorityAreaOverview'
import page from '@/components/portfolio/PortfolioWorkspace.module.css'
import c from './PriorityAreaCards.module.css'

const LEGEND: { key: keyof ActivityBreakdown; label: string; color: string }[] = [
  { key: 'overdue', label: 'Overdue', color: 'var(--color-status-critical-dot)' },
  { key: 'completed', label: 'Completed', color: 'var(--color-status-healthy-dot)' },
  { key: 'ongoing', label: 'Ongoing', color: 'color-mix(in srgb, var(--color-status-healthy-dot) 45%, white)' },
  { key: 'openIssue', label: 'Open issue', color: 'var(--color-status-atrisk-dot)' },
  { key: 'pending', label: 'Pending', color: 'var(--color-neutral-400)' },
]

const money = (n: number) => `₦${Math.round(n).toLocaleString()}`
const pct = (part: number, whole: number) => (whole > 0 ? Math.round((part / whole) * 100) : 0)

function Donut({ breakdown, total }: { breakdown: ActivityBreakdown; total: number }) {
  const r = 26
  const circ = 2 * Math.PI * r
  let offset = 0
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" aria-hidden="true">
      <circle cx="36" cy="36" r={r} fill="none" stroke="var(--color-neutral-100)" strokeWidth="11" />
      {total > 0 && LEGEND.map((seg) => {
        const value = breakdown[seg.key]
        if (value <= 0) return null
        const len = (value / total) * circ
        const el = (
          <circle key={seg.key} cx="36" cy="36" r={r} fill="none" stroke={seg.color} strokeWidth="11"
            strokeDasharray={`${len} ${circ - len}`} strokeDashoffset={-offset} transform="rotate(-90 36 36)" />
        )
        offset += len
        return el
      })}
    </svg>
  )
}

function Card({ card, onOpen }: { card: PriorityAreaCard; onOpen: () => void }) {
  return (
    <div className={c.card} role="button" tabIndex={0} onClick={onOpen} onKeyDown={(e) => { if (e.key === 'Enter') onOpen() }}>
      <div className={c.head}>
        <div>
          <div className={c.eyebrow}>Priority area</div>
          <div className={c.name}>{card.name}</div>
        </div>
        <span className={c.kebab} aria-hidden="true"><Icon name="more-horizontal" size={16} /></span>
      </div>

      <div>
        <div className={c.pctLabel}>{card.pctComplete}% complete</div>
        <div className={c.bar}><div className={`${c.barFill} ${c.fillComplete}`} style={{ width: `${card.pctComplete}%` }} /></div>
      </div>

      <div className={c.block}>
        <div className={c.blockTitle}>Financing</div>
        <div className={c.money}>Budget {money(card.budget)}</div>
        <div className={c.bar}><div className={`${c.barFill} ${c.fillSpent}`} style={{ width: `${pct(card.spent, card.budget)}%` }} /></div>
        <div className={c.miniLabel}>{money(card.spent)} spent ({pct(card.spent, card.budget)}%)</div>
      </div>

      <div className={c.counts}>
        <div className={c.count}><span className={c.countValue}>{card.interventionCount}</span><span className={c.countLabel}>Interventions</span></div>
        <div className={c.count}><span className={c.countValue}>{card.activityCount}</span><span className={c.countLabel}>Current activities</span></div>
      </div>

      <div className={c.chartRow}>
        <div className={c.legend}>
          {LEGEND.map((seg) => (
            <span key={seg.key} className={c.legendItem}>
              <span className={c.dot} style={{ background: seg.color }} />{seg.label}
            </span>
          ))}
        </div>
        <Donut breakdown={card.breakdown} total={card.activityCount} />
      </div>

      <div className={c.leads}>
        <span className={c.lead}>Lead: <span className={c.leadName}>{card.lead || '—'}</span></span>
        {card.coLead && <span className={c.lead}>Co-Lead: <span className={c.leadName}>{card.coLead}</span></span>}
      </div>
    </div>
  )
}

export function PriorityAreaCards() {
  const router = useRouter()
  const caps = useCapabilities()
  const [view, setView] = useState<'cards' | 'list'>('cards')
  useRealtime('priority_areas', ['pa-cards'])
  const { data, isLoading } = useQuery({ queryKey: ['pa-cards'], queryFn: listPriorityAreaCards })
  const cards = data ?? []

  return (
    <div className={page.page}>
      <PageHeader
        title="Priority areas"
        description="Which national priorities need attention. Each card summarises delivery, financing and activity."
        primaryAction={caps.canCreate ? <Button variant="primary" size="md" iconLeft={<Icon name="plus" size={16} />} onClick={() => router.push('/new/priorityArea')}>Create priority area</Button> : undefined}
      />
      <div className={page.body}>
        <div className={c.toolbar}>
          <div className={c.toggle} role="group" aria-label="View">
            <button type="button" className={`${c.toggleBtn} ${view === 'cards' ? c.toggleActive : ''}`} aria-pressed={view === 'cards'} onClick={() => setView('cards')}>Cards</button>
            <button type="button" className={`${c.toggleBtn} ${view === 'list' ? c.toggleActive : ''}`} aria-pressed={view === 'list'} onClick={() => setView('list')}>List</button>
          </div>
        </div>

        {view === 'list' ? (
          <EntityCollection entityKey="priorityArea" embedded />
        ) : isLoading ? (
          <div className={c.empty}><p className={c.emptyCopy}>Loading…</p></div>
        ) : cards.length === 0 ? (
          <div className={c.empty}>
            <p className={c.emptyTitle}>No priority areas yet</p>
            <p className={c.emptyCopy}>Create one to define what this government is focused on delivering.</p>
          </div>
        ) : (
          <div className={c.grid}>
            {cards.map((card) => <Card key={card.id} card={card} onOpen={() => router.push(`/priority-areas/${card.id}`)} />)}
          </div>
        )}
      </div>
    </div>
  )
}
