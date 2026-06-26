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
import { PRIORITY_AREA_VIEWS, type PriorityAreaRow } from '@/lib/mock/portfolio'
import styles from './PriorityAreasTable.module.css'

function ProgressBar({ value }: { value: number }) {
  return (
    <span className={styles.progress}>
      <span className={styles.progressTrack} aria-hidden="true">
        <span className={styles.progressFill} style={{ width: `${value}%` }} />
      </span>
      <span className={styles.progressLabel}>{value}%</span>
    </span>
  )
}

interface PriorityAreasTableProps {
  data: PriorityAreaRow[]
  onRowClick: (row: PriorityAreaRow) => void
  onRowDoubleClick: (row: PriorityAreaRow) => void
  loading?: boolean
}

export function PriorityAreasTable({
  data,
  onRowClick,
  onRowDoubleClick,
  loading,
}: PriorityAreasTableProps) {
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

  const columns = useMemo<ColumnDef<PriorityAreaRow, unknown>[]>(() => [
    {
      accessorKey: 'name', header: 'Priority Area', size: 220,
      cell: ({ row }) => <span className={styles.name}>{row.original.name}</span>,
    },
    {
      accessorKey: 'owner', header: 'Owner', size: 150,
      cell: ({ row }) => (
        <span className={styles.owner}>
          <Avatar name={row.original.owner} size="xs" />
          <span className={styles.ownerName}>{row.original.owner}</span>
        </span>
      ),
    },
    {
      accessorKey: 'health', header: 'Health', size: 110,
      cell: ({ row }) => <StatusChip status={row.original.health} size="sm" />,
    },
    {
      accessorKey: 'projects', header: 'Projects', size: 84,
      cell: ({ row }) => <span className={styles.num}>{row.original.projects}</span>,
    },
    {
      accessorKey: 'budgetPct', header: 'Budget', size: 110,
      cell: ({ row }) => (
        <span className={styles.budget}>
          <span className={`${styles.budgetDot} ${styles[`t_${row.original.budgetTone}`]}`} aria-hidden="true" />
          {row.original.budgetPct}%
        </span>
      ),
    },
    {
      accessorKey: 'progress', header: 'Progress', size: 150,
      cell: ({ row }) => <ProgressBar value={row.original.progress} />,
    },
    {
      accessorKey: 'risks', header: 'Risks', size: 90,
      cell: ({ row }) => (
        <span className={styles.risks}>
          {row.original.risks > 0 && (
            <span className={`${styles.riskDot} ${row.original.risksHigh ? styles.t_critical : styles.t_neutral}`} aria-hidden="true" />
          )}
          <span className={row.original.risksHigh ? styles.riskHigh : styles.muted}>{row.original.risks}</span>
        </span>
      ),
    },
    {
      accessorKey: 'milestonesDone', header: 'Milestones', size: 110,
      cell: ({ row }) => (
        <span className={styles.muted}>{row.original.milestonesDone}/{row.original.milestonesTotal} done</span>
      ),
    },
    {
      accessorKey: 'lastUpdated', header: 'Updated', size: 110,
      cell: ({ row }) => <span className={styles.muted}>{row.original.lastUpdated}</span>,
    },
    {
      id: 'actions', header: '', size: 80,
      cell: ({ row }) => {
        const isPinned = pinned.has(row.original.id)
        return (
          <span className={styles.actions}>
            <button
              type="button"
              className={`${styles.actionBtn} ${isPinned ? styles.actionActive : ''}`}
              aria-label={isPinned ? 'Unpin' : 'Pin'}
              onClick={(e) => {
                e.stopPropagation()
                setPinned((prev) => {
                  const next = new Set(prev)
                  if (next.has(row.original.id)) next.delete(row.original.id)
                  else next.add(row.original.id)
                  return next
                })
              }}
            >
              <Icon name="pin" size={15} />
            </button>
            <button
              type="button"
              className={styles.actionBtn}
              aria-label="Open workspace"
              onClick={(e) => { e.stopPropagation(); onRowDoubleClick(row.original) }}
            >
              <Icon name="arrow-right" size={15} />
            </button>
          </span>
        )
      },
    },
  ], [pinned, onRowDoubleClick])

  return (
    <div className={styles.wrap}>
      <FilterBar
        views={PRIORITY_AREA_VIEWS}
        activeView={view}
        onViewChange={setView}
        onFilter={() => toast.info('Filter priority areas')}
        onSort={() => toast.info('Sort')}
        onGroup={() => toast.info('Group by')}
        onColumns={() => toast.info('Columns')}
        onExport={() => toast.info('Exported')}
        primaryAction={
          <Button size="sm" variant="secondary" iconLeft={<Icon name="plus" size={15} />} onClick={() => toast.info('New Priority Area — coming soon')}>
            Priority Area
          </Button>
        }
      />
      <div className={styles.tableWrap}>
        <DataTable
          data={filtered}
          columns={columns}
          onRowClick={onRowClick}
          onRowDoubleClick={onRowDoubleClick}
          getRowId={(r) => r.id}
          isLoading={loading}
          emptyMessage="No priority areas in this view."
        />
      </div>
    </div>
  )
}
