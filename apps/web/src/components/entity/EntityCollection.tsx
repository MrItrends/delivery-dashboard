'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { ColumnDef } from '@tanstack/react-table'
import { PageHeader } from '@/components/layout/PageHeader'
import { DataTable } from '@/components/data/DataTable'
import { FilterBar } from '@/components/data/FilterBar'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'
import { FormBanner } from '@/components/auth/AuthScaffold'
import { useToastStore } from '@/stores/useToastStore'
import { isSupabaseConfigured } from '@/lib/supabase/client'
import { useEntityList, useEntityMutations } from '@/lib/data/useEntity'
import { useCapabilities } from '@/lib/data/roles'
import { ENTITIES } from '@/lib/data/entities'
import type { Row } from '@/lib/data/crud'
import { EntityFormDrawer } from './EntityFormDrawer'
import page from '@/components/portfolio/PortfolioWorkspace.module.css'
import t from '@/components/priority-area/ProjectsTable.module.css'
import styles from './EntityCollection.module.css'

interface EntityCollectionProps {
  entityKey: string
  parentId?: string
  embedded?: boolean
  titleOverride?: string
  descriptionOverride?: string
}

export function EntityCollection({ entityKey, parentId, embedded, titleOverride, descriptionOverride }: EntityCollectionProps) {
  const config = ENTITIES[entityKey]!
  const router = useRouter()
  const toast = useToastStore()
  const caps = useCapabilities()
  const [view, setView] = useState<'active' | 'archived'>('active')
  const { data, isLoading, isError, refetch } = useEntityList<Row>(config.table, {
    parentKey: config.parent?.key, parentId, includeArchived: view === 'archived',
  })
  const { create, update, archive } = useEntityMutations(config.table)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editing, setEditing] = useState<Row | null>(null)

  const rows = useMemo(() => (data ?? []).filter((r) => (view === 'archived' ? r.archived : !r.archived)), [data, view])

  const openCreate = () => { setEditing(null); setDrawerOpen(true) }
  const openEdit = (r: Row) => { setEditing(r); setDrawerOpen(true) }

  function handleSubmit(input: Record<string, unknown>) {
    const opts = {
      onSuccess: () => { toast.success(`${config.singular} ${editing ? 'updated' : 'created'}`); setDrawerOpen(false) },
      onError: (e: unknown) => toast.error(e instanceof Error ? e.message : 'Could not save'),
    }
    if (editing) update.mutate({ id: editing.id, patch: input }, opts)
    else create.mutate(input, opts)
  }

  function archiveRow(r: Row, archived: boolean) {
    archive.mutate({ id: r.id, archived }, {
      onSuccess: () => toast.success(archived ? `${config.singular} archived` : `${config.singular} restored`),
      onError: () => toast.error('Could not update'),
    })
  }

  const columns = useMemo<ColumnDef<Row, unknown>[]>(() => {
    if (!caps.canEdit && !caps.canArchive) return config.columns
    return [
      ...config.columns,
      {
        id: 'actions', header: '', size: 80,
        cell: ({ row }) => (
          <span className={t.actions}>
            {caps.canEdit && <button type="button" className={t.actionBtn} aria-label="Edit" onClick={(e) => { e.stopPropagation(); openEdit(row.original) }}><Icon name="sliders" size={15} /></button>}
            {caps.canArchive && (row.original.archived
              ? <button type="button" className={t.actionBtn} aria-label="Restore" onClick={(e) => { e.stopPropagation(); archiveRow(row.original, false) }}><Icon name="arrow-left" size={15} /></button>
              : <button type="button" className={t.actionBtn} aria-label="Archive" onClick={(e) => { e.stopPropagation(); archiveRow(row.original, true) }}><Icon name="inbox" size={15} /></button>)}
          </span>
        ),
      },
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config, view, caps.canEdit, caps.canArchive])

  const onRowClick = (r: Row) => {
    if (config.childKey) router.push(`${config.route}/${r.id}`)
    else if (caps.canEdit) openEdit(r)
  }

  const table = (
    <div className={t.wrap}>
      <FilterBar
        views={[{ id: 'active', label: 'Active' }, { id: 'archived', label: 'Archived' }]}
        activeView={view}
        onViewChange={(v) => setView(v as 'active' | 'archived')}
        primaryAction={caps.canCreate ? <Button size="sm" variant="secondary" iconLeft={<Icon name="plus" size={15} />} onClick={openCreate}>{config.singular}</Button> : undefined}
      />
      <div className={t.tableWrap}>
        {isError ? (
          <div style={{ padding: 'var(--space-8)' }}>
            <FormBanner tone="error">Couldn’t load {config.plural.toLowerCase()}. <button onClick={() => refetch()} style={{ textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>Retry</button></FormBanner>
          </div>
        ) : (
          <DataTable
            data={rows}
            columns={columns}
            onRowClick={onRowClick}
            getRowId={(r) => r.id}
            isLoading={isLoading}
            emptyMessage={view === 'archived' ? `No archived ${config.plural.toLowerCase()}.` : `No ${config.plural.toLowerCase()} yet. Create your first to get started.`}
          />
        )}
      </div>
    </div>
  )

  const drawer = (
    <EntityFormDrawer
      open={drawerOpen}
      mode={editing ? 'edit' : 'create'}
      config={config}
      initial={editing}
      parentId={parentId}
      submitting={create.isPending || update.isPending}
      onClose={() => setDrawerOpen(false)}
      onSubmit={handleSubmit}
    />
  )

  if (embedded) {
    return (
      <section className={styles.section} aria-label={config.plural}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{config.plural} <span className={styles.count}>{rows.length}</span></h2>
          {caps.canCreate && <Button size="sm" variant="secondary" iconLeft={<Icon name="plus" size={15} />} onClick={openCreate}>{config.singular}</Button>}
        </div>
        {table}
        {drawer}
      </section>
    )
  }

  return (
    <div className={page.page}>
      <PageHeader
        title={titleOverride ?? config.plural}
        description={descriptionOverride}
        primaryAction={caps.canCreate ? <Button variant="primary" size="md" iconLeft={<Icon name="plus" size={16} />} onClick={openCreate}>Create {config.singular.toLowerCase()}</Button> : undefined}
      />
      <div className={page.body}>
        {!isSupabaseConfigured && (
          <div className={page.bannerRow}>
            <FormBanner tone="warning">Supabase isn’t configured on this deployment yet — set the environment variables to load live data.</FormBanner>
          </div>
        )}
        {table}
      </div>
      {drawer}
    </div>
  )
}
