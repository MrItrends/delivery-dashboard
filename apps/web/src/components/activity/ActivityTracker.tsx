'use client'

import { useState, useMemo } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'
import { TextField } from '@/components/primitives/TextField'
import { StatusChip } from '@/components/primitives/StatusChip'
import { Drawer } from '@/components/overlay/Drawer'
import { CommentThread } from '@/components/collaboration/CommentThread'
import { useToastStore } from '@/stores/useToastStore'
import { useEntityMutations } from '@/lib/data/useEntity'
import { useRealtime } from '@/lib/data/useRealtime'
import { useCapabilities } from '@/lib/data/roles'
import { getTrackerData, type TrackerActivity } from '@/lib/data/activityTracker'
import { timeAgo } from '@/lib/format'
import page from '@/components/portfolio/PortfolioWorkspace.module.css'
import s from './ActivityTracker.module.css'

const todayStr = () => new Date().toISOString().slice(0, 10)

type Tab = 'current' | 'issues' | 'mine' | 'archived'
const TABS: { id: Tab; label: string }[] = [
  { id: 'current', label: 'Current' },
  { id: 'issues', label: 'Open issues' },
  { id: 'mine', label: 'Assigned to me' },
  { id: 'archived', label: 'Archived' },
]

const CATS = [
  { key: 'overdue', label: 'Overdue', color: 'var(--color-status-critical-dot)' },
  { key: 'completed', label: 'Completed', color: 'var(--color-status-healthy-dot)' },
  { key: 'ongoing', label: 'Ongoing', color: 'color-mix(in srgb, var(--color-status-healthy-dot) 45%, white)' },
  { key: 'openIssue', label: 'Open issue', color: 'var(--color-status-atrisk-dot)' },
  { key: 'pending', label: 'Pending', color: 'var(--color-neutral-400)' },
] as const

function category(a: TrackerActivity): typeof CATS[number]['key'] {
  if (a.overdue) return 'overdue'
  if (a.status === 'complete') return 'completed'
  if (a.status === 'active') return 'ongoing'
  if (a.status === 'blocked' || a.status === 'at-risk') return 'openIssue'
  return 'pending'
}

export function ActivityTracker() {
  const { data } = useQuery({ queryKey: ['tracker'], queryFn: getTrackerData })
  useRealtime('activities', ['tracker'])
  const [view, setView] = useState<'summary' | 'table'>('summary')
  const [tab, setTab] = useState<Tab>('current')
  const [q, setQ] = useState('')
  const [active, setActive] = useState<TrackerActivity | null>(null)

  const all = data?.activities ?? []
  const myName = data?.myName ?? null
  const live = useMemo(() => all.filter((a) => !a.archived), [all])

  const counts = useMemo(() => ({
    current: all.filter((a) => !a.archived && a.status !== 'complete').length,
    issues: all.filter((a) => !a.archived && (a.status === 'blocked' || a.overdue)).length,
    mine: all.filter((a) => !a.archived && myName && a.owner === myName).length,
    archived: all.filter((a) => a.archived).length,
  }), [all, myName])

  const rows = useMemo(() => {
    let list = all
    if (tab === 'current') list = all.filter((a) => !a.archived && a.status !== 'complete')
    else if (tab === 'issues') list = all.filter((a) => !a.archived && (a.status === 'blocked' || a.overdue))
    else if (tab === 'mine') list = all.filter((a) => !a.archived && myName && a.owner === myName)
    else list = all.filter((a) => a.archived)
    const term = q.trim().toLowerCase()
    if (term) list = list.filter((a) => a.name.toLowerCase().includes(term) || (a.owner ?? '').toLowerCase().includes(term))
    return list
  }, [all, tab, q, myName])

  const segs = useMemo(() => {
    const set = all.filter((a) => !a.archived)
    const c: Record<string, number> = {}
    for (const a of set) c[category(a)] = (c[category(a)] ?? 0) + 1
    return c
  }, [all])
  const segTotal = Object.values(segs).reduce((x, y) => x + y, 0)

  return (
    <div className={page.page}>
      <PageHeader title="Activity tracker" description="Every action across delivery — who owns it, when it’s due, and what’s overdue." />
      <div className={page.body}>
        <div className={s.viewToggle} role="group" aria-label="View">
          <button type="button" className={`${s.viewBtn} ${view === 'summary' ? s.viewActive : ''}`} aria-pressed={view === 'summary'} onClick={() => setView('summary')}>Summary</button>
          <button type="button" className={`${s.viewBtn} ${view === 'table' ? s.viewActive : ''}`} aria-pressed={view === 'table'} onClick={() => setView('table')}>Table</button>
        </div>

        {view === 'summary' ? (
          <Summary activities={live} segs={segs} onOpen={setActive} onOpenTracker={() => setView('table')} />
        ) : (
        <>
        {segTotal > 0 && (
          <div className={s.progress} aria-hidden="true">
            {CATS.map((cat) => segs[cat.key] ? <span key={cat.key} className={s.seg} style={{ flex: segs[cat.key], background: cat.color }} /> : null)}
          </div>
        )}

        <div className={s.tabs} role="tablist">
          {TABS.map((tb) => (
            <button key={tb.id} role="tab" aria-selected={tab === tb.id} className={`${s.tab} ${tab === tb.id ? s.tabActive : ''}`} onClick={() => setTab(tb.id)}>
              {tb.label}<span className={s.count}>{counts[tb.id]}</span>
            </button>
          ))}
        </div>

        <input className={s.search} placeholder="Search activities…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search activities" />

        <div className={s.table}>
          <div className={s.head}>
            <span className={s.th}>Title</span><span className={s.th}>Assigned to</span><span className={s.th}>Intervention</span><span className={s.th}>Status</span><span className={s.th}>Due</span><span className={s.th}>Priority</span>
          </div>
          {rows.length === 0 ? (
            <div className={s.empty}>No activities here.</div>
          ) : rows.map((a) => (
            <button key={a.id} type="button" className={s.row} onClick={() => setActive(a)}>
              <span className={s.title}>{a.name}</span>
              <span className={s.cell}>{a.owner || 'Unassigned'}</span>
              <span className={s.cell}>{a.intervention || '—'}</span>
              <span>{a.overdue ? <StatusChip status="critical" size="sm" label="Overdue" /> : <StatusChip status={a.status} size="sm" />}</span>
              <span className={`${s.due} ${a.overdue ? s.overdue : ''}`}>{a.dueDate || a.dueLabel || '—'}</span>
              <span className={`${s.cell} ${s.cap}`}>{a.priority}</span>
            </button>
          ))}
        </div>
        </>
        )}
      </div>

      {active && <ActivityPanel activity={active} onClose={() => setActive(null)} />}
    </div>
  )
}

function Donut({ segs }: { segs: Record<string, number> }) {
  const total = Object.values(segs).reduce((a, b) => a + b, 0)
  const r = 46
  const circ = 2 * Math.PI * r
  let off = 0
  return (
    <svg width="132" height="132" viewBox="0 0 140 140" aria-hidden="true">
      <circle cx="70" cy="70" r={r} fill="none" stroke="var(--color-neutral-100)" strokeWidth="16" />
      {total > 0 && CATS.map((cat) => {
        const v = segs[cat.key]
        if (!v) return null
        const len = (v / total) * circ
        const el = <circle key={cat.key} cx="70" cy="70" r={r} fill="none" stroke={cat.color} strokeWidth="16" strokeDasharray={`${len} ${circ - len}`} strokeDashoffset={-off} transform="rotate(-90 70 70)" />
        off += len
        return el
      })}
    </svg>
  )
}

function Summary({ activities, segs, onOpen, onOpenTracker }: { activities: TrackerActivity[]; segs: Record<string, number>; onOpen: (a: TrackerActivity) => void; onOpenTracker: () => void }) {
  const t = todayStr()
  const upcoming = activities.filter((a) => a.dueDate && a.dueDate >= t && a.status !== 'complete').sort((x, y) => (x.dueDate ?? '').localeCompare(y.dueDate ?? '')).slice(0, 6)
  const overdue = activities.filter((a) => a.overdue).sort((x, y) => (x.dueDate ?? '').localeCompare(y.dueDate ?? '')).slice(0, 6)
  const issues = activities.filter((a) => a.status === 'blocked' || a.status === 'at-risk').sort((x, y) => y.createdAt.localeCompare(x.createdAt)).slice(0, 6)
  const completed = activities.filter((a) => a.status === 'complete').sort((x, y) => y.updatedAt.localeCompare(x.updatedAt)).slice(0, 6)
  const total = Object.values(segs).reduce((a, b) => a + b, 0)

  const List = ({ title, items, meta }: { title: string; items: TrackerActivity[]; meta: (a: TrackerActivity) => string }) => (
    <div className={s.listCard}>
      <div className={s.listTitle}>{title}</div>
      {items.length === 0 ? <p className={s.listEmpty}>Nothing here.</p> : items.map((a) => (
        <button key={a.id} type="button" className={s.li} onClick={() => onOpen(a)}>
          <span className={s.liName}>{a.name}</span>
          <span className={s.liMeta}>{meta(a)}</span>
        </button>
      ))}
    </div>
  )

  return (
    <>
      <div className={s.summaryTop}>
        <Donut segs={segs} />
        <div className={s.legend2}>
          {CATS.map((cat) => (
            <span key={cat.key} className={s.legendItem}><span className={s.dot} style={{ background: cat.color }} />{cat.label}<strong>{segs[cat.key] ?? 0}</strong></span>
          ))}
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <Button variant="secondary" size="md" onClick={onOpenTracker}>Open activity tracker</Button>
        </div>
      </div>
      {total === 0 ? (
        <div className={s.empty}>No activities yet. They appear here as you add them to interventions.</div>
      ) : (
        <div className={s.lists}>
          <List title="Upcoming deadlines" items={upcoming} meta={(a) => a.dueDate ?? ''} />
          <List title="Most overdue" items={overdue} meta={(a) => a.dueDate ?? ''} />
          <List title="Recently raised issues" items={issues} meta={(a) => (a.createdAt ? timeAgo(a.createdAt) : '')} />
          <List title="Recently completed" items={completed} meta={(a) => (a.updatedAt ? timeAgo(a.updatedAt) : '')} />
        </div>
      )}
    </>
  )
}

function ActivityPanel({ activity, onClose }: { activity: TrackerActivity; onClose: () => void }) {
  const qc = useQueryClient()
  const toast = useToastStore()
  const caps = useCapabilities()
  const { update, archive } = useEntityMutations('activities')
  const [progress, setProgress] = useState(String(activity.progress))

  const refresh = () => qc.invalidateQueries({ queryKey: ['tracker'] })

  function saveProgress() {
    update.mutate({ id: activity.id, patch: { progress: Number(progress) || 0 } }, { onSuccess: () => { toast.success('Progress saved'); refresh() }, onError: () => toast.error('Could not save') })
  }
  function complete() {
    update.mutate({ id: activity.id, patch: { status: 'complete', progress: 100 } }, { onSuccess: () => { toast.success('Activity completed'); refresh(); onClose() } })
  }
  function setArchived(archived: boolean) {
    archive.mutate({ id: activity.id, archived }, { onSuccess: () => { toast.success(archived ? 'Archived' : 'Restored'); refresh(); onClose() } })
  }

  return (
    <Drawer open onClose={onClose} variant="review" title={activity.name} description={activity.intervention ?? undefined} primaryLabel="Done" onPrimary={onClose}>
      <div className={s.meta}>
        <div><div className={s.metaLabel}>Assigned to</div><div className={s.metaValue}>{activity.owner || 'Unassigned'}</div></div>
        <div><div className={s.metaLabel}>Due</div><div className={`${s.metaValue} ${activity.overdue ? s.overdue : ''}`}>{activity.dueDate || activity.dueLabel || '—'}</div></div>
        <div><div className={s.metaLabel}>Status</div><div>{activity.overdue ? <StatusChip status="critical" size="sm" label="Overdue" /> : <StatusChip status={activity.status} size="sm" />}</div></div>
        <div><div className={s.metaLabel}>Priority</div><div className={`${s.metaValue} ${s.cap}`}>{activity.priority}</div></div>
      </div>

      {caps.canEdit && (
        <>
          <div className={s.progressRow}>
            <div style={{ width: 140 }}><TextField label="Progress (%)" type="number" value={progress} onChange={(e) => setProgress(e.target.value)} /></div>
            <Button variant="secondary" size="md" loading={update.isPending} onClick={saveProgress}>Save progress</Button>
          </div>
          <div className={s.actions}>
            {activity.status !== 'complete' && <Button variant="primary" size="md" iconLeft={<Icon name="check" size={16} />} onClick={complete}>Mark complete</Button>}
            {activity.archived
              ? <Button variant="secondary" size="md" onClick={() => setArchived(false)}>Restore</Button>
              : <Button variant="secondary" size="md" iconLeft={<Icon name="inbox" size={16} />} onClick={() => setArchived(true)}>Archive</Button>}
          </div>
        </>
      )}

      <div className={s.section}>
        <div className={s.sectionTitle}>Updates</div>
        <CommentThread objectType="activities" objectId={activity.id} />
      </div>
    </Drawer>
  )
}
