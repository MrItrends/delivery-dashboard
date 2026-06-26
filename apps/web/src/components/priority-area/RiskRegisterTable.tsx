'use client'

import { useMemo, useState } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/data/DataTable'
import { FilterBar } from '@/components/data/FilterBar'
import { StatusChip } from '@/components/primitives/StatusChip'
import { Avatar } from '@/components/primitives/Avatar'
import { useToastStore } from '@/stores/useToastStore'
import { RISK_VIEWS, type RiskRow } from '@/lib/mock/priorityArea'
import styles from './RiskRegisterTable.module.css'

const SEVERITY_LABEL: Record<string, string> = { critical: 'High', 'at-risk': 'Medium', healthy: 'Low' }

interface RiskRegisterTableProps {
  data: RiskRow[]
  onRowClick: (row: RiskRow) => void
  loading?: boolean
}

export function RiskRegisterTable({ data, onRowClick, loading }: RiskRegisterTableProps) {
  const toast = useToastStore()
  const [view, setView] = useState('all')

  const filtered = useMemo(() => {
    switch (view) {
      case 'critical': return data.filter((d) => d.severity === 'critical')
      case 'open': return data.filter((d) => d.status === 'active')
      default: return data
    }
  }, [data, view])

  const columns = useMemo<ColumnDef<RiskRow, unknown>[]>(() => [
    { accessorKey: 'risk', header: 'Risk', size: 240, cell: ({ row }) => <span className={styles.name}>{row.original.risk}</span> },
    { accessorKey: 'severity', header: 'Severity', size: 110, cell: ({ row }) => <StatusChip status={row.original.severity} size="sm" label={SEVERITY_LABEL[row.original.severity]} /> },
    { accessorKey: 'owner', header: 'Owner', size: 150, cell: ({ row }) => (
      <span className={styles.owner}><Avatar name={row.original.owner} size="xs" /><span className={styles.ownerName}>{row.original.owner}</span></span>
    ) },
    { accessorKey: 'impact', header: 'Impact', size: 90, cell: ({ row }) => <span className={styles.muted}>{row.original.impact}</span> },
    { accessorKey: 'likelihood', header: 'Likelihood', size: 100, cell: ({ row }) => <span className={styles.muted}>{row.original.likelihood}</span> },
    { accessorKey: 'mitigation', header: 'Mitigation', size: 240, cell: ({ row }) => <span className={styles.muted}>{row.original.mitigation}</span> },
    { accessorKey: 'status', header: 'Status', size: 110, cell: ({ row }) => <StatusChip status={row.original.status} size="sm" /> },
    { accessorKey: 'nextReview', header: 'Next review', size: 110, cell: ({ row }) => <span className={styles.muted}>{row.original.nextReview}</span> },
  ], [])

  return (
    <div className={styles.wrap}>
      <FilterBar
        views={RISK_VIEWS}
        activeView={view}
        onViewChange={setView}
        onSort={() => toast.info('Sort')}
        onExport={() => toast.info('Exported risk register')}
      />
      <div className={styles.tableWrap}>
        <DataTable data={filtered} columns={columns} onRowClick={onRowClick} getRowId={(r) => r.id} isLoading={loading} emptyMessage="No risks in this view." />
      </div>
    </div>
  )
}
