'use client'

import { useMemo, useState, useRef, useEffect } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/data/DataTable'
import { FilterBar } from '@/components/data/FilterBar'
import { StatusChip } from '@/components/primitives/StatusChip'
import { Avatar } from '@/components/primitives/Avatar'
import { Icon } from '@/components/primitives/Icon'
import { Button } from '@/components/primitives/Button'
import { useToastStore } from '@/stores/useToastStore'
import {
  INTERVENTION_VIEWS,
  INTERVENTION_STATUSES,
  type InterventionRow,
} from '@/lib/mock/project'
import type { ObjectStatus } from '@/components/primitives/StatusChip'
import styles from './InterventionsTable.module.css'

const STATUS_LABEL: Record<string, string> = {
  planned: 'Planned', active: 'Active', blocked: 'Blocked', 'at-risk': 'At Risk', complete: 'Complete',
}

/** Inline status editor — click to change without leaving the table. */
function InlineStatus({ status, onChange }: { status: ObjectStatus; onChange: (s: ObjectStatus) => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    function onDoc(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') setOpen(false) }
    if (open) { document.addEventListener('mousedown', onDoc); document.addEventListener('keydown', onKey) }
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey) }
  }, [open])

  return (
    <span className={styles.inlineStatus} ref={ref}>
      <button
        type="button"
        className={styles.statusBtn}
        onClick={(e) => { e.stopPropagation(); setOpen((v) => !v) }}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Status: ${STATUS_LABEL[status]}. Change status`}
      >
        <StatusChip status={status} size="sm" />
      </button>
      {open && (
        <span className={styles.statusMenu} role="listbox">
          {INTERVENTION_STATUSES.map((s) => (
            <button
              key={s}
              type="button"
              role="option"
              aria-selected={s === status}
              className={styles.statusOption}
              onClick={(e) => { e.stopPropagation(); onChange(s); setOpen(false) }}
            >
              <StatusChip status={s} size="sm" />
            </button>
          ))}
        </span>
      )}
    </span>
  )
}

function Bar({ value }: { value: number }) {
  return (
    <span className={styles.bar}>
      <span className={styles.barTrack} aria-hidden="true"><span className={styles.barFill} style={{ width: `${value}%` }} /></span>
      <span className={styles.barLabel}>{value}%</span>
    </span>
  )
}

interface InterventionsTableProps {
  data: InterventionRow[]
  onRowClick: (row: InterventionRow) => void
  onRowDoubleClick: (row: InterventionRow) => void
  loading?: boolean
}

export function InterventionsTable({ data, onRowClick, onRowDoubleClick, loading }: InterventionsTableProps) {
  const toast = useToastStore()
  const [view, setView] = useState('all')
  const [statuses, setStatuses] = useState<Record<string, ObjectStatus>>(
    () => Object.fromEntries(data.map((d) => [d.id, d.status]))
  )
  const [pinned, setPinned] = useState<Set<string>>(new Set())

  const statusOf = (row: InterventionRow) => statuses[row.id] ?? row.status

  const filtered = useMemo(() => {
    switch (view) {
      case 'attention': return data.filter((d) => statusOf(d) === 'blocked' || d.health !== 'healthy')
      case 'blocked': return data.filter((d) => statusOf(d) === 'blocked')
      case 'mine': return data.filter((d) => d.owner === 'You')
      default: return data
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, view, statuses])

  const columns = useMemo<ColumnDef<InterventionRow, unknown>[]>(() => [
    { accessorKey: 'name', header: 'Intervention', size: 200, cell: ({ row }) => <span className={styles.name}>{row.original.name}</span> },
    { accessorKey: 'owner', header: 'Owner', size: 150, cell: ({ row }) => (
      <span className={styles.owner}><Avatar name={row.original.owner} size="xs" /><span className={styles.ownerName}>{row.original.owner}</span></span>
    ) },
    { id: 'status', header: 'Status', size: 120, cell: ({ row }) => (
      <InlineStatus
        status={statusOf(row.original)}
        onChange={(s) => { setStatuses((p) => ({ ...p, [row.original.id]: s })); toast.success('Status updated') }}
      />
    ) },
    { accessorKey: 'health', header: 'Health', size: 110, cell: ({ row }) => <StatusChip status={row.original.health} size="sm" /> },
    { accessorKey: 'progress', header: 'Progress', size: 140, cell: ({ row }) => <Bar value={row.original.progress} /> },
    { accessorKey: 'budgetPct', header: 'Budget', size: 100, cell: ({ row }) => (
      <span className={styles.budget}><span className={`${styles.dot} ${styles[`t_${row.original.budgetTone}`]}`} aria-hidden="true" />{row.original.budgetPct}%</span>
    ) },
    { accessorKey: 'activities', header: 'Activities', size: 90, cell: ({ row }) => <span className={styles.num}>{row.original.activities}</span> },
    { accessorKey: 'milestonesDone', header: 'Milestones', size: 104, cell: ({ row }) => <span className={styles.muted}>{row.original.milestonesDone}/{row.original.milestonesTotal}</span> },
    { accessorKey: 'risks', header: 'Risks', size: 80, cell: ({ row }) => (
      <span className={styles.risks}>{row.original.risks > 0 && <span className={`${styles.dot} ${row.original.risksHigh ? styles.t_critical : styles.t_neutral}`} aria-hidden="true" />}<span className={row.original.risksHigh ? styles.riskHigh : styles.muted}>{row.original.risks}</span></span>
    ) },
    { accessorKey: 'dependencies', header: 'Deps', size: 70, cell: ({ row }) => <span className={styles.muted}>{row.original.dependencies}</span> },
    { accessorKey: 'lastUpdated', header: 'Updated', size: 104, cell: ({ row }) => <span className={styles.muted}>{row.original.lastUpdated}</span> },
    { id: 'actions', header: '', size: 80, cell: ({ row }) => {
      const isPinned = pinned.has(row.original.id)
      return (
        <span className={styles.actions}>
          <button type="button" className={`${styles.actionBtn} ${isPinned ? styles.actionActive : ''}`} aria-label={isPinned ? 'Unpin' : 'Pin'}
            onClick={(e) => { e.stopPropagation(); setPinned((prev) => { const next = new Set(prev); if (next.has(row.original.id)) next.delete(row.original.id); else next.add(row.original.id); return next }) }}>
            <Icon name="pin" size={15} />
          </button>
          <button type="button" className={styles.actionBtn} aria-label="Open intervention workspace" onClick={(e) => { e.stopPropagation(); onRowDoubleClick(row.original) }}>
            <Icon name="arrow-right" size={15} />
          </button>
        </span>
      )
    } },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [pinned, statuses, onRowDoubleClick])

  return (
    <div className={styles.wrap}>
      <FilterBar
        views={INTERVENTION_VIEWS}
        activeView={view}
        onViewChange={setView}
        onFilter={() => toast.info('Filter interventions')}
        onSort={() => toast.info('Sort')}
        onGroup={() => toast.info('Group by')}
        onColumns={() => toast.info('Columns')}
        onExport={() => toast.info('Exported')}
        primaryAction={<Button size="sm" variant="secondary" iconLeft={<Icon name="plus" size={15} />} onClick={() => toast.info('New Intervention — coming soon')}>Intervention</Button>}
      />
      <div className={styles.tableWrap}>
        <DataTable data={filtered} columns={columns} onRowClick={onRowClick} onRowDoubleClick={onRowDoubleClick} getRowId={(r) => r.id} isLoading={loading} emptyMessage="No interventions in this view." />
      </div>
    </div>
  )
}
