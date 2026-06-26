'use client'

import { useMemo, useState, useRef, useEffect } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/data/DataTable'
import { FilterBar } from '@/components/data/FilterBar'
import { StatusChip, type ObjectStatus } from '@/components/primitives/StatusChip'
import { Avatar } from '@/components/primitives/Avatar'
import { Icon } from '@/components/primitives/Icon'
import { Button } from '@/components/primitives/Button'
import { useToastStore } from '@/stores/useToastStore'
import { ACTIVITY_VIEWS, ACTIVITY_STATUSES, type ActivityRow, type ActivityPriority } from '@/lib/mock/intervention'
import styles from './ActivitiesTable.module.css'

const PRIORITY_LABEL: Record<ActivityPriority, string> = { critical: 'Critical', high: 'High', medium: 'Medium', low: 'Low' }
const STATUS_LABEL: Record<string, string> = { planned: 'Planned', active: 'Active', blocked: 'Blocked', 'at-risk': 'At Risk', complete: 'Complete' }

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
      <button type="button" className={styles.statusBtn} aria-haspopup="listbox" aria-expanded={open}
        aria-label={`Status: ${STATUS_LABEL[status]}. Change status`}
        onClick={(e) => { e.stopPropagation(); setOpen((v) => !v) }}>
        <StatusChip status={status} size="sm" />
      </button>
      {open && (
        <span className={styles.statusMenu} role="listbox">
          {ACTIVITY_STATUSES.map((s) => (
            <button key={s} type="button" role="option" aria-selected={s === status} className={styles.statusOption}
              onClick={(e) => { e.stopPropagation(); onChange(s); setOpen(false) }}>
              <StatusChip status={s} size="sm" />
            </button>
          ))}
        </span>
      )}
    </span>
  )
}

interface ActivitiesTableProps {
  data: ActivityRow[]
  onRowClick: (row: ActivityRow) => void
  loading?: boolean
}

export function ActivitiesTable({ data, onRowClick, loading }: ActivitiesTableProps) {
  const toast = useToastStore()
  const [view, setView] = useState('all')
  const [statuses, setStatuses] = useState<Record<string, ObjectStatus>>(() => Object.fromEntries(data.map((d) => [d.id, d.status])))

  const statusOf = (r: ActivityRow) => statuses[r.id] ?? r.status

  const filtered = useMemo(() => {
    switch (view) {
      case 'mine': return data.filter((d) => d.owner === 'You' || d.owner === 'Ahmed Yusuf')
      case 'blocked': return data.filter((d) => statusOf(d) === 'blocked')
      case 'overdue': return data.filter((d) => d.overdue)
      case 'done': return data.filter((d) => statusOf(d) === 'complete')
      default: return data
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, view, statuses])

  const columns = useMemo<ColumnDef<ActivityRow, unknown>[]>(() => [
    { accessorKey: 'name', header: 'Activity', size: 240, cell: ({ row }) => <span className={styles.name}>{row.original.name}</span> },
    { accessorKey: 'owner', header: 'Owner', size: 140, cell: ({ row }) => (
      <span className={styles.owner}><Avatar name={row.original.owner} size="xs" /><span className={styles.ownerName}>{row.original.owner}</span></span>
    ) },
    { id: 'status', header: 'Status', size: 120, cell: ({ row }) => (
      <InlineStatus status={statusOf(row.original)} onChange={(s) => { setStatuses((p) => ({ ...p, [row.original.id]: s })); toast.success('Status updated') }} />
    ) },
    { accessorKey: 'priority', header: 'Priority', size: 104, cell: ({ row }) => (
      <span className={styles.priority}><span className={`${styles.pDot} ${styles[`p_${row.original.priority}`]}`} aria-hidden="true" />{PRIORITY_LABEL[row.original.priority]}</span>
    ) },
    { accessorKey: 'dueLabel', header: 'Due', size: 110, cell: ({ row }) => <span className={row.original.overdue ? styles.overdue : styles.muted}>{row.original.dueLabel}</span> },
    { accessorKey: 'progress', header: 'Progress', size: 130, cell: ({ row }) => (
      <span className={styles.bar}><span className={styles.barTrack} aria-hidden="true"><span className={styles.barFill} style={{ width: `${row.original.progress}%` }} /></span><span className={styles.barLabel}>{row.original.progress}%</span></span>
    ) },
    { accessorKey: 'dependencies', header: 'Deps', size: 70, cell: ({ row }) => <span className={styles.muted}>{row.original.dependencies}</span> },
    { accessorKey: 'evidence', header: 'Evidence', size: 90, cell: ({ row }) => (
      <span className={styles.count}><Icon name="document" size={14} className={styles.countIcon} />{row.original.evidence}</span>
    ) },
    { accessorKey: 'comments', header: 'Comments', size: 96, cell: ({ row }) => (
      <span className={styles.count}><Icon name="mail" size={14} className={styles.countIcon} />{row.original.comments}</span>
    ) },
    { accessorKey: 'lastUpdated', header: 'Updated', size: 104, cell: ({ row }) => <span className={styles.muted}>{row.original.lastUpdated}</span> },
    { id: 'actions', header: '', size: 70, cell: ({ row }) => (
      <span className={styles.actions}>
        <button type="button" className={styles.actionBtn} aria-label="Mark complete" onClick={(e) => { e.stopPropagation(); setStatuses((p) => ({ ...p, [row.original.id]: 'complete' })); toast.success('Marked complete') }}><Icon name="check" size={15} /></button>
        <button type="button" className={styles.actionBtn} aria-label="Open" onClick={(e) => { e.stopPropagation(); onRowClick(row.original) }}><Icon name="arrow-right" size={15} /></button>
      </span>
    ) },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [statuses, onRowClick])

  return (
    <div className={styles.wrap}>
      <FilterBar
        views={ACTIVITY_VIEWS}
        activeView={view}
        onViewChange={setView}
        onFilter={() => toast.info('Filter activities')}
        onSort={() => toast.info('Sort')}
        onGroup={() => toast.info('Group by')}
        onColumns={() => toast.info('Columns')}
        onExport={() => toast.info('Exported')}
        primaryAction={<Button size="sm" variant="secondary" iconLeft={<Icon name="plus" size={15} />} onClick={() => toast.info('New Activity — coming soon')}>Activity</Button>}
      />
      <div className={styles.tableWrap}>
        <DataTable data={filtered} columns={columns} onRowClick={onRowClick} getRowId={(r) => r.id} isLoading={loading} emptyMessage="No activities in this view." />
      </div>
    </div>
  )
}
