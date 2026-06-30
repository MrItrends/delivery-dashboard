'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { ColumnDef } from '@tanstack/react-table'
import { PageHeader } from '@/components/layout/PageHeader'
import { DataTable } from '@/components/data/DataTable'
import { FilterBar } from '@/components/data/FilterBar'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'
import { StatusChip } from '@/components/primitives/StatusChip'
import { Avatar } from '@/components/primitives/Avatar'
import { FormBanner } from '@/components/auth/AuthScaffold'
import { useToastStore } from '@/stores/useToastStore'
import { isSupabaseConfigured } from '@/lib/supabase/client'
import { usePortfolios, useCreatePortfolio, useUpdatePortfolio, useArchivePortfolio } from '@/lib/data/usePortfolios'
import { useRealtime } from '@/lib/data/useRealtime'
import { useCapabilities } from '@/lib/data/roles'
import { useFinanceRollup, deriveSpendHealth } from '@/lib/data/financeRollup'
import { formatThousands } from '@/lib/money'
import type { Portfolio, PortfolioInput } from '@/lib/data/portfolios'
import { PortfolioFormDrawer } from './PortfolioFormDrawer'
import page from './PortfolioWorkspace.module.css'
import t from './PriorityAreasTable.module.css'

function fmtDate(iso: string) {
  try { return new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }) } catch { return '—' }
}

export function PortfoliosList() {
  const router = useRouter()
  const toast = useToastStore()
  const caps = useCapabilities()
  const [view, setView] = useState<'active' | 'archived'>('active')
  const { data, isLoading, isError, refetch } = usePortfolios(view === 'archived')
  const createMut = useCreatePortfolio()
  const updateMut = useUpdatePortfolio()
  const archiveMut = useArchivePortfolio()
  useRealtime('portfolios', ['portfolios'])

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editing, setEditing] = useState<Portfolio | null>(null)

  const rows = useMemo(
    () => (data ?? []).filter((p) => (view === 'archived' ? p.archived : !p.archived)),
    [data, view]
  )
  const rowIds = useMemo(() => rows.map((p) => p.id), [rows])
  const { data: finance } = useFinanceRollup('portfolios', rowIds)

  function openCreate() { router.push('/new/portfolio') }
  function openEdit(p: Portfolio) { setEditing(p); setDrawerOpen(true) }

  function handleSubmit(input: PortfolioInput) {
    if (editing) {
      updateMut.mutate({ id: editing.id, patch: input }, {
        onSuccess: () => { toast.success('Portfolio updated'); setDrawerOpen(false) },
        onError: (e) => toast.error(e instanceof Error ? e.message : 'Could not save'),
      })
    } else {
      createMut.mutate(input, {
        onSuccess: () => { toast.success('Portfolio created'); setDrawerOpen(false) },
        onError: (e) => toast.error(e instanceof Error ? e.message : 'Could not create'),
      })
    }
  }

  function archive(p: Portfolio, archived: boolean) {
    archiveMut.mutate({ id: p.id, archived }, {
      onSuccess: () => toast.success(archived ? 'Portfolio archived' : 'Portfolio restored'),
      onError: () => toast.error('Could not update'),
    })
  }

  const columns = useMemo<ColumnDef<Portfolio, unknown>[]>(() => [
    { accessorKey: 'name', header: 'Portfolio', size: 240, cell: ({ row }) => <span className={t.name}>{row.original.name}</span> },
    { accessorKey: 'owner', header: 'Owner', size: 170, cell: ({ row }) => row.original.owner
      ? <span className={t.owner}><Avatar name={row.original.owner} size="xs" /><span className={t.ownerName}>{row.original.owner}</span></span>
      : <span className={t.muted}>—</span> },
    { id: 'health', header: 'Health', size: 110, cell: ({ row }) => <StatusChip status={deriveSpendHealth(finance?.[row.original.id] ?? { budget: 0, spent: 0 })} size="sm" /> },
    { id: 'budget', header: 'Budget', size: 140, cell: ({ row }) => { const b = finance?.[row.original.id]?.budget ?? 0; return <span className={t.muted}>{b > 0 ? `₦${formatThousands(b)}` : '—'}</span> } },
    { id: 'spent', header: 'Spent', size: 140, cell: ({ row }) => { const sp = finance?.[row.original.id]?.spent ?? 0; return <span className={t.muted}>{sp > 0 ? `₦${formatThousands(sp)}` : '—'}</span> } },
    { accessorKey: 'reporting_period', header: 'Reporting period', size: 170, cell: ({ row }) => <span className={t.muted}>{row.original.reporting_period ?? '—'}</span> },
    { accessorKey: 'updated_at', header: 'Updated', size: 100, cell: ({ row }) => <span className={t.muted}>{fmtDate(row.original.updated_at)}</span> },
    ...(caps.canEdit || caps.canArchive ? [{ id: 'actions', header: '', size: 80, cell: ({ row }: { row: { original: Portfolio } }) => (
      <span className={t.actions}>
        {caps.canEdit && <button type="button" className={t.actionBtn} aria-label="Edit" onClick={(e) => { e.stopPropagation(); openEdit(row.original) }}><Icon name="sliders" size={15} /></button>}
        {caps.canArchive && (row.original.archived
          ? <button type="button" className={t.actionBtn} aria-label="Restore" onClick={(e) => { e.stopPropagation(); archive(row.original, false) }}><Icon name="arrow-left" size={15} /></button>
          : <button type="button" className={t.actionBtn} aria-label="Archive" onClick={(e) => { e.stopPropagation(); archive(row.original, true) }}><Icon name="inbox" size={15} /></button>)}
      </span>
    ) }] as ColumnDef<Portfolio, unknown>[] : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [view, caps.canEdit, caps.canArchive, finance])

  const header = (
    <PageHeader
      title="Portfolios"
      description="Strategic portfolios across the workspace. Each groups the priority areas you’re accountable for."
      primaryAction={caps.canCreate ? <Button variant="primary" size="md" iconLeft={<Icon name="plus" size={16} />} onClick={openCreate}>Create portfolio</Button> : undefined}
    />
  )

  return (
    <div className={page.page}>
      {header}
      <div className={page.body}>
        {!isSupabaseConfigured && (
          <div className={page.bannerRow}>
            <FormBanner tone="warning">Supabase isn’t configured on this deployment yet — set the environment variables to load live data.</FormBanner>
          </div>
        )}

        <div className={t.wrap}>
          <FilterBar
            views={[{ id: 'active', label: 'Active' }, { id: 'archived', label: 'Archived' }]}
            activeView={view}
            onViewChange={(v) => setView(v as 'active' | 'archived')}
          />
          <div className={t.tableWrap}>
            {isError ? (
              <div style={{ padding: 'var(--space-8)' }}>
                <FormBanner tone="error">Couldn’t load portfolios. <button onClick={() => refetch()} style={{ textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>Retry</button></FormBanner>
              </div>
            ) : (
              <DataTable
                data={rows}
                columns={columns}
                onRowClick={(p) => router.push(`/portfolio/${p.id}`)}
                getRowId={(r) => r.id}
                isLoading={isLoading}
                emptyMessage={view === 'archived' ? 'No archived portfolios.' : 'No portfolios yet. Create your first to get started.'}
              />
            )}
          </div>
        </div>
      </div>

      <PortfolioFormDrawer
        open={drawerOpen}
        mode={editing ? 'edit' : 'create'}
        initial={editing}
        submitting={createMut.isPending || updateMut.isPending}
        onClose={() => setDrawerOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
