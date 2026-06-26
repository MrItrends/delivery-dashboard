'use client'

import { useMemo, useState } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/data/DataTable'
import { FilterBar } from '@/components/data/FilterBar'
import { StatusChip } from '@/components/primitives/StatusChip'
import { Avatar } from '@/components/primitives/Avatar'
import { Icon } from '@/components/primitives/Icon'
import { Button } from '@/components/primitives/Button'
import { useToastStore } from '@/stores/useToastStore'
import { PROJECT_VIEWS, type ProjectRow } from '@/lib/mock/priorityArea'
import styles from './ProjectsTable.module.css'

function Bar({ value, tone = 'brand' }: { value: number; tone?: 'brand' | 'neutral' }) {
  return (
    <span className={styles.bar}>
      <span className={styles.barTrack} aria-hidden="true">
        <span className={`${styles.barFill} ${tone === 'neutral' ? styles.barNeutral : ''}`} style={{ width: `${value}%` }} />
      </span>
      <span className={styles.barLabel}>{value}%</span>
    </span>
  )
}

interface ProjectsTableProps {
  data: ProjectRow[]
  onRowClick: (row: ProjectRow) => void
  onRowDoubleClick: (row: ProjectRow) => void
  loading?: boolean
}

export function ProjectsTable({ data, onRowClick, onRowDoubleClick, loading }: ProjectsTableProps) {
  const toast = useToastStore()
  const [view, setView] = useState('all')
  const [pinned, setPinned] = useState<Set<string>>(new Set())

  const filtered = useMemo(() => {
    switch (view) {
      case 'attention': return data.filter((d) => d.health !== 'healthy')
      case 'on-track': return data.filter((d) => d.health === 'healthy')
      case 'mine': return data.filter((d) => d.owner === 'You')
      default: return data
    }
  }, [data, view])

  const columns = useMemo<ColumnDef<ProjectRow, unknown>[]>(() => [
    { accessorKey: 'name', header: 'Project', size: 210, cell: ({ row }) => <span className={styles.name}>{row.original.name}</span> },
    { accessorKey: 'owner', header: 'Owner', size: 150, cell: ({ row }) => (
      <span className={styles.owner}><Avatar name={row.original.owner} size="xs" /><span className={styles.ownerName}>{row.original.owner}</span></span>
    ) },
    { accessorKey: 'health', header: 'Health', size: 110, cell: ({ row }) => <StatusChip status={row.original.health} size="sm" /> },
    { accessorKey: 'progress', header: 'Progress', size: 150, cell: ({ row }) => <Bar value={row.original.progress} /> },
    { accessorKey: 'budgetPct', header: 'Budget', size: 110, cell: ({ row }) => (
      <span className={styles.budget}><span className={`${styles.dot} ${styles[`t_${row.original.budgetTone}`]}`} aria-hidden="true" />{row.original.budgetPct}%</span>
    ) },
    { accessorKey: 'milestonesDone', header: 'Milestones', size: 110, cell: ({ row }) => <span className={styles.muted}>{row.original.milestonesDone}/{row.original.milestonesTotal} done</span> },
    { accessorKey: 'risks', header: 'Risks', size: 84, cell: ({ row }) => (
      <span className={styles.risks}>{row.original.risks > 0 && <span className={`${styles.dot} ${row.original.risksHigh ? styles.t_critical : styles.t_neutral}`} aria-hidden="true" />}<span className={row.original.risksHigh ? styles.riskHigh : styles.muted}>{row.original.risks}</span></span>
    ) },
    { accessorKey: 'contribution', header: 'Target', size: 130, cell: ({ row }) => <Bar value={row.original.contribution} tone="neutral" /> },
    { accessorKey: 'lastUpdated', header: 'Updated', size: 110, cell: ({ row }) => <span className={styles.muted}>{row.original.lastUpdated}</span> },
    { id: 'actions', header: '', size: 80, cell: ({ row }) => {
      const isPinned = pinned.has(row.original.id)
      return (
        <span className={styles.actions}>
          <button type="button" className={`${styles.actionBtn} ${isPinned ? styles.actionActive : ''}`} aria-label={isPinned ? 'Unpin' : 'Pin'}
            onClick={(e) => { e.stopPropagation(); setPinned((prev) => { const next = new Set(prev); if (next.has(row.original.id)) next.delete(row.original.id); else next.add(row.original.id); return next }) }}>
            <Icon name="pin" size={15} />
          </button>
          <button type="button" className={styles.actionBtn} aria-label="Open project workspace" onClick={(e) => { e.stopPropagation(); onRowDoubleClick(row.original) }}>
            <Icon name="arrow-right" size={15} />
          </button>
        </span>
      )
    } },
  ], [pinned, onRowDoubleClick])

  return (
    <div className={styles.wrap}>
      <FilterBar
        views={PROJECT_VIEWS}
        activeView={view}
        onViewChange={setView}
        onFilter={() => toast.info('Filter projects')}
        onSort={() => toast.info('Sort')}
        onGroup={() => toast.info('Group by')}
        onColumns={() => toast.info('Columns')}
        onExport={() => toast.info('Exported')}
        primaryAction={<Button size="sm" variant="secondary" iconLeft={<Icon name="plus" size={15} />} onClick={() => toast.info('New Project — coming soon')}>Project</Button>}
      />
      <div className={styles.tableWrap}>
        <DataTable data={filtered} columns={columns} onRowClick={onRowClick} onRowDoubleClick={onRowDoubleClick} getRowId={(r) => r.id} isLoading={loading} emptyMessage="No projects in this view." />
      </div>
    </div>
  )
}
