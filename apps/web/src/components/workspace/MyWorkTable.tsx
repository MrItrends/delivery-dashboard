'use client'

import { useMemo, useState } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/data/DataTable'
import { FilterBar } from '@/components/data/FilterBar'
import { StatusChip } from '@/components/primitives/StatusChip'
import { Avatar } from '@/components/primitives/Avatar'
import { Icon } from '@/components/primitives/Icon'
import { useToastStore } from '@/stores/useToastStore'
import {
  MY_WORK_VIEWS,
  type MyWorkItem,
  type MyWorkBucket,
  type Priority,
  type Health,
} from '@/lib/mock/workspace'
import styles from './MyWorkTable.module.css'

const PRIORITY_LABEL: Record<Priority, string> = {
  critical: 'Critical',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
}

function PriorityTag({ priority }: { priority: Priority }) {
  return (
    <span className={styles.priority}>
      <span className={`${styles.priorityDot} ${styles[`p_${priority}`]}`} aria-hidden="true" />
      {PRIORITY_LABEL[priority]}
    </span>
  )
}

function HealthDot({ health }: { health: Health }) {
  return (
    <span
      className={`${styles.healthDot} ${styles[`h_${health}`]}`}
      role="img"
      aria-label={`Health: ${health.replace('-', ' ')}`}
    />
  )
}

interface MyWorkTableProps {
  data: MyWorkItem[]
  activeView: MyWorkBucket
  onViewChange: (view: MyWorkBucket) => void
  onRowClick: (item: MyWorkItem) => void
  loading?: boolean
}

export function MyWorkTable({
  data,
  activeView,
  onViewChange,
  onRowClick,
  loading,
}: MyWorkTableProps) {
  const toast = useToastStore()
  const [pinned, setPinned] = useState<Set<string>>(new Set())

  const filtered = useMemo(
    () => data.filter((d) => d.buckets.includes(activeView)),
    [data, activeView]
  )

  const columns = useMemo<ColumnDef<MyWorkItem, unknown>[]>(
    () => [
      {
        accessorKey: 'title',
        header: 'Title',
        size: 240,
        cell: ({ row }) => (
          <span className={styles.titleCell}>{row.original.title}</span>
        ),
      },
      {
        accessorKey: 'project',
        header: 'Project',
        size: 140,
        cell: ({ row }) => (
          <span className={styles.muted}>{row.original.project}</span>
        ),
      },
      {
        accessorKey: 'owner',
        header: 'Owner',
        size: 140,
        cell: ({ row }) => (
          <span className={styles.owner}>
            <Avatar name={row.original.owner === 'You' ? 'You' : row.original.owner} size="xs" />
            <span className={styles.ownerName}>{row.original.owner}</span>
          </span>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 120,
        cell: ({ row }) => <StatusChip status={row.original.status} size="sm" />,
      },
      {
        accessorKey: 'priority',
        header: 'Priority',
        size: 110,
        cell: ({ row }) => <PriorityTag priority={row.original.priority} />,
      },
      {
        accessorKey: 'dueLabel',
        header: 'Due',
        size: 110,
        cell: ({ row }) => (
          <span className={row.original.overdue ? styles.overdue : styles.muted}>
            {row.original.dueLabel}
          </span>
        ),
      },
      {
        accessorKey: 'health',
        header: 'Health',
        size: 76,
        cell: ({ row }) => <HealthDot health={row.original.health} />,
      },
      {
        id: 'actions',
        header: '',
        size: 80,
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
                <Icon name="shield" size={15} />
              </button>
              <button
                type="button"
                className={styles.actionBtn}
                aria-label="Mark complete"
                onClick={(e) => {
                  e.stopPropagation()
                  toast.success('Marked complete')
                }}
              >
                <Icon name="check" size={15} />
              </button>
            </span>
          )
        },
      },
    ],
    [pinned, toast]
  )

  return (
    <div className={styles.wrap}>
      <FilterBar
        views={MY_WORK_VIEWS}
        activeView={activeView}
        onViewChange={(id) => onViewChange(id as MyWorkBucket)}
        onSort={() => toast.info('Sort options')}
        onExport={() => toast.info('Exported view')}
      />
      <div className={styles.tableWrap}>
        <DataTable
          data={filtered}
          columns={columns}
          onRowClick={onRowClick}
          getRowId={(row) => row.id}
          isLoading={loading}
          emptyMessage="Nothing here right now. Switch views to see other work."
          density="comfortable"
        />
      </div>
    </div>
  )
}
