'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'
import { Avatar } from '@/components/primitives/Avatar'
import { StatusChip, type ObjectStatus } from '@/components/primitives/StatusChip'
import { FormBanner } from '@/components/auth/AuthScaffold'
import { useToastStore } from '@/stores/useToastStore'
import { getEntity, type Row } from '@/lib/data/crud'
import { useEntityMutations } from '@/lib/data/useEntity'
import { ENTITIES } from '@/lib/data/entities'
import { EntityCollection } from './EntityCollection'
import { EntityFormDrawer } from './EntityFormDrawer'
import page from '@/components/portfolio/PortfolioWorkspace.module.css'

interface EntityDetailProps {
  entityKey: string
  id: string
}

export function EntityDetail({ entityKey, id }: EntityDetailProps) {
  const config = ENTITIES[entityKey]!
  const toast = useToastStore()
  const { update } = useEntityMutations(config.table)
  const [editOpen, setEditOpen] = useState(false)

  const { data: entity, isLoading, isError } = useQuery({
    queryKey: [config.table, 'detail', id],
    queryFn: () => getEntity<Row>(config.table, id),
  })

  const childKey = config.childKey

  if (isLoading) {
    return (
      <div className={page.page}>
        <div className={page.body} style={{ paddingTop: 'var(--space-8)' }}>
          <div className="shimmer" style={{ height: 28, width: 280, borderRadius: 6, display: 'block' }} />
        </div>
      </div>
    )
  }

  if (isError || !entity) {
    return (
      <div className={page.page}>
        <div className={page.body} style={{ paddingTop: 'var(--space-8)' }}>
          <FormBanner tone="error">This {config.singular.toLowerCase()} couldn’t be found.</FormBanner>
        </div>
      </div>
    )
  }

  const description = (entity.mission || entity.description || entity.objective || '') as string
  const status = entity[config.headerStatusField ?? 'health'] as ObjectStatus | undefined
  const owner = entity.owner as string | undefined

  return (
    <div className={page.page}>
      <PageHeader
        title={String(entity.name ?? '')}
        description={description || undefined}
        status={status}
        metadata={owner ? [{ label: 'Owner', value: (<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Avatar name={owner} size="xs" /> {owner}</span>) }] : undefined}
        primaryAction={
          <Button variant="secondary" size="md" iconLeft={<Icon name="sliders" size={16} />} onClick={() => setEditOpen(true)}>
            Edit {config.singular.toLowerCase()}
          </Button>
        }
      />
      <div className={page.body}>
        {childKey
          ? <EntityCollection entityKey={childKey} parentId={id} embedded />
          : <StatusChip status={status ?? 'planned'} />}
      </div>

      <EntityFormDrawer
        open={editOpen}
        mode="edit"
        config={config}
        initial={entity}
        submitting={update.isPending}
        onClose={() => setEditOpen(false)}
        onSubmit={(input) => update.mutate({ id, patch: input }, {
          onSuccess: () => { toast.success(`${config.singular} updated`); setEditOpen(false) },
          onError: () => toast.error('Could not save'),
        })}
      />
    </div>
  )
}
