'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { useCrumbStore } from '@/lib/data/useCrumb'
import { listPriorityAreaCards } from '@/lib/data/priorityAreaOverview'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'
import { Avatar } from '@/components/primitives/Avatar'
import { type ObjectStatus } from '@/components/primitives/StatusChip'
import { FormBanner } from '@/components/auth/AuthScaffold'
import { useToastStore } from '@/stores/useToastStore'
import { getEntity, type Row } from '@/lib/data/crud'
import { useEntityMutations } from '@/lib/data/useEntity'
import { useCapabilities } from '@/lib/data/roles'
import { ENTITIES } from '@/lib/data/entities'
import { EntityCollection } from './EntityCollection'
import { EntityFormDrawer } from './EntityFormDrawer'
import { CommentThread } from '@/components/collaboration/CommentThread'
import { DocumentList } from '@/components/collaboration/DocumentList'
import { PriorityAreaSections } from '@/components/priority-area/PriorityAreaSections'
import { TargetsSection } from '@/components/intervention/TargetsSection'
import page from '@/components/portfolio/PortfolioWorkspace.module.css'
import sect from './EntityCollection.module.css'

interface EntityDetailProps {
  entityKey: string
  id: string
}

export function EntityDetail({ entityKey, id }: EntityDetailProps) {
  const config = ENTITIES[entityKey]!
  const router = useRouter()
  const toast = useToastStore()
  const caps = useCapabilities()
  const { update } = useEntityMutations(config.table)
  const [editOpen, setEditOpen] = useState(false)

  const { data: entity, isLoading, isError } = useQuery({
    queryKey: [config.table, 'detail', id],
    queryFn: () => getEntity<Row>(config.table, id),
  })

  const setCrumb = useCrumbStore((st) => st.setLabel)
  const { data: paCards } = useQuery({ queryKey: ['pa-cards'], queryFn: listPriorityAreaCards, enabled: entityKey === 'priorityArea' })

  useEffect(() => { if (entity?.name) setCrumb(id, String(entity.name)) }, [entity, id, setCrumb])

  const childKey = config.childKey
  const funding = entityKey === 'priorityArea' ? (paCards ?? []).find((c) => c.id === id) : undefined

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
          caps.canEdit ? (
            <Button variant="secondary" size="md" iconLeft={<Icon name="sliders" size={16} />} onClick={() => entityKey === 'intervention' ? router.push(`/interventions/${id}/edit`) : setEditOpen(true)}>
              Edit {config.singular.toLowerCase()}
            </Button>
          ) : undefined
        }
      />
      <div className={page.body} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        {funding && (() => {
          const money = (n: number) => `₦${Math.round(n).toLocaleString()}`
          const pct = (p: number, w: number) => (w > 0 ? Math.round((p / w) * 100) : 0)
          const stat = (label: string, value: string) => (
            <div><div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)' }}>{value}</div><div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)' }}>{label}</div></div>
          )
          const bar = (val: number, color: string) => (
            <div style={{ height: 7, borderRadius: 999, background: 'var(--color-neutral-100)', overflow: 'hidden', marginTop: 4 }}><div style={{ height: '100%', width: `${val}%`, background: color, borderRadius: 999 }} /></div>
          )
          return (
            <section style={{ border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)' }} aria-label="Funding">
              <h2 className={sect.sectionTitle} style={{ marginBottom: 'var(--space-4)' }}>Funding</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 'var(--space-5)' }}>
                {stat('Total budget', money(funding.budget))}
                {stat('Spent', money(funding.spent))}
                <div>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>{pct(funding.spent, funding.budget)}% spent</div>
                  {bar(pct(funding.spent, funding.budget), 'var(--color-brand-600)')}
                </div>
              </div>
              {funding.budget === 0 && <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)', marginTop: 'var(--space-4)' }}>Budget is the total of the interventions beneath this priority area. Add a project, then interventions with budgets, to see funding here.</p>}
            </section>
          )
        })()}

        {entityKey === 'priorityArea'
          ? <PriorityAreaSections id={id} />
          : childKey && <EntityCollection entityKey={childKey} parentId={id} embedded />}

        {entityKey === 'intervention' && <TargetsSection interventionId={id} />}

        <section className={sect.section} aria-label="Evidence & documents">
          <div className={sect.sectionHeader}>
            <h2 className={sect.sectionTitle}>Evidence &amp; documents</h2>
          </div>
          <DocumentList objectType={config.table} objectId={id} />
        </section>

        <section className={sect.section} aria-label="Discussion">
          <div className={sect.sectionHeader}>
            <h2 className={sect.sectionTitle}>Discussion</h2>
          </div>
          <CommentThread objectType={config.table} objectId={id} />
        </section>
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
