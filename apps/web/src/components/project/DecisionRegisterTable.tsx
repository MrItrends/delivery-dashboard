'use client'

import { useMemo, useState } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/data/DataTable'
import { FilterBar } from '@/components/data/FilterBar'
import { StatusChip } from '@/components/primitives/StatusChip'
import { Avatar } from '@/components/primitives/Avatar'
import { Icon } from '@/components/primitives/Icon'
import { useToastStore } from '@/stores/useToastStore'
import { DECISION_VIEWS, type DecisionRow } from '@/lib/mock/project'
import styles from './DecisionRegisterTable.module.css'

interface DecisionRegisterTableProps {
  data: DecisionRow[]
  onRowClick: (row: DecisionRow) => void
  loading?: boolean
}

export function DecisionRegisterTable({ data, onRowClick, loading }: DecisionRegisterTableProps) {
  const toast = useToastStore()
  const [view, setView] = useState('all')

  const filtered = useMemo(() => {
    switch (view) {
      case 'open': return data.filter((d) => d.status !== 'approved')
      case 'approved': return data.filter((d) => d.status === 'approved')
      default: return data
    }
  }, [data, view])

  const columns = useMemo<ColumnDef<DecisionRow, unknown>[]>(() => [
    { accessorKey: 'decision', header: 'Decision', size: 250, cell: ({ row }) => <span className={styles.name}>{row.original.decision}</span> },
    { accessorKey: 'type', header: 'Type', size: 110, cell: ({ row }) => <span className={styles.tag}>{row.original.type}</span> },
    { accessorKey: 'owner', header: 'Owner', size: 150, cell: ({ row }) => (
      <span className={styles.owner}><Avatar name={row.original.owner} size="xs" /><span className={styles.ownerName}>{row.original.owner}</span></span>
    ) },
    { accessorKey: 'date', header: 'Date', size: 80, cell: ({ row }) => <span className={styles.muted}>{row.original.date}</span> },
    { accessorKey: 'status', header: 'Status', size: 110, cell: ({ row }) => <StatusChip status={row.original.status} size="sm" label={row.original.statusLabel} /> },
    { accessorKey: 'linkedIntervention', header: 'Linked', size: 160, cell: ({ row }) => <span className={styles.muted}>{row.original.linkedIntervention}</span> },
    { accessorKey: 'outcome', header: 'Outcome', size: 220, cell: ({ row }) => <span className={styles.muted}>{row.original.outcome}</span> },
    { accessorKey: 'evidence', header: 'Evidence', size: 100, cell: ({ row }) => (
      row.original.evidence > 0
        ? <span className={styles.evidence}><Icon name="document" size={14} className={styles.evidenceIcon} />{row.original.evidence}</span>
        : <span className={styles.muted}>—</span>
    ) },
  ], [])

  return (
    <div className={styles.wrap}>
      <FilterBar
        views={DECISION_VIEWS}
        activeView={view}
        onViewChange={setView}
        onSort={() => toast.info('Sort')}
        onExport={() => toast.info('Exported decisions')}
        primaryAction={<button className={styles.recordBtn} onClick={() => toast.info('Record decision — coming soon')}><Icon name="plus" size={14} />Record decision</button>}
      />
      <div className={styles.tableWrap}>
        <DataTable data={filtered} columns={columns} onRowClick={onRowClick} getRowId={(r) => r.id} isLoading={loading} emptyMessage="No decisions recorded yet." />
      </div>
    </div>
  )
}
