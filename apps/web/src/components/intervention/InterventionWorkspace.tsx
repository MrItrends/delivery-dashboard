'use client'

import { Suspense, useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'
import { Avatar, AvatarStack } from '@/components/primitives/Avatar'
import { StatusChip } from '@/components/primitives/StatusChip'
import { FormBanner } from '@/components/auth/AuthScaffold'
import { ActivityFeed } from '@/components/workspace/ActivityFeed'
import { PortfolioActionsMenu } from '@/components/portfolio/PortfolioActionsMenu'
import { useOnline } from '@/lib/hooks/useOnline'
import { useToastStore } from '@/stores/useToastStore'
import { InterventionSummary } from './InterventionSummary'
import { ActivitiesTable } from './ActivitiesTable'
import { CollaborationStream } from './CollaborationStream'
import { MilestonesList } from './MilestonesList'
import { EvidenceList } from './EvidenceList'
import { DependencyList } from './DependencyList'
import { InterventionContext } from './InterventionContext'
import { ActivityInspector } from './ActivityInspector'
import {
  INTERVENTION, SUMMARY, ACTIVITIES, RECENT_UPDATES, type ActivityRow,
} from '@/lib/mock/intervention'
import styles from '@/components/portfolio/PortfolioWorkspace.module.css'

function Section({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  const id = `iv-${title.toLowerCase().replace(/[^a-z]+/g, '-')}`
  return (
    <section className={styles.section} aria-labelledby={id}>
      <div className={styles.sectionHeader}>
        <h2 id={id} className={styles.sectionTitle}>{title}</h2>
        {action}
      </div>
      {children}
    </section>
  )
}

function meta(label: string, value: React.ReactNode) { return { label, value } }

function InterventionWorkspaceInner() {
  const params = useSearchParams()
  const online = useOnline()
  const toast = useToastStore()

  const state = params.get('state')
  const isEmpty = state === 'empty'
  const forceLoading = state === 'loading'
  const sectionError = state === 'error'
  const isOffline = state === 'offline' || !online

  const [booting, setBooting] = useState(true)
  useEffect(() => { const t = setTimeout(() => setBooting(false), 700); return () => clearTimeout(t) }, [])
  const loading = forceLoading || booting

  // Secondary sections stream in after the table.
  const [secondaryReady, setSecondaryReady] = useState(false)
  useEffect(() => { const t = setTimeout(() => setSecondaryReady(true), 1100); return () => clearTimeout(t) }, [])
  const secondaryLoading = forceLoading || !secondaryReady

  const [activity, setActivity] = useState<ActivityRow | null>(null)
  const [inspectorOpen, setInspectorOpen] = useState(false)
  const openActivity = useCallback((a: ActivityRow) => { setActivity(a); setInspectorOpen(true) }, [])

  const header = (
    <PageHeader
      title={INTERVENTION.name}
      description={INTERVENTION.objective}
      status={INTERVENTION.health}
      metadata={[
        meta('Status', <StatusChip status={INTERVENTION.status} size="sm" />),
        meta('Owner', <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Avatar name={INTERVENTION.owner} size="xs" /> {INTERVENTION.owner}</span>),
        meta('Project', INTERVENTION.project),
        meta('Due', INTERVENTION.dueDate),
        meta('Viewing now', <AvatarStack users={INTERVENTION.presence.map((name) => ({ name }))} size="xs" />),
      ]}
      primaryAction={
        <div className={styles.headerActions}>
          <Button variant="secondary" size="md" iconLeft={<Icon name="document" size={16} />} onClick={() => toast.info('Generate Report — coming soon')}>Report</Button>
          <PortfolioActionsMenu />
          <Button variant="primary" size="md" iconLeft={<Icon name="plus" size={16} />} onClick={() => toast.info('New Activity — coming soon')}>Create activity</Button>
        </div>
      }
    />
  )

  if (isEmpty) {
    return (
      <div className={styles.page}>{header}<div className={styles.body}><EmptyIntervention onCreate={() => toast.info('New Activity — coming soon')} /></div></div>
    )
  }

  return (
    <div className={styles.page}>
      {header}
      <div className={styles.body}>
        {isOffline && (
          <div className={styles.bannerRow}>
            <FormBanner tone="warning">You&rsquo;re offline. Changes are saved on this device and will sync when you reconnect.</FormBanner>
          </div>
        )}

        <div className={styles.layout}>
          <div className={styles.main}>
            <Section title="Summary">
              <InterventionSummary metrics={SUMMARY} health={INTERVENTION.health} budgetHealth={INTERVENTION.budgetHealth} lastUpdate={INTERVENTION.lastUpdate} loading={loading} />
            </Section>

            <Section title="Activities" action={<span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)' }}>{ACTIVITIES.length} activities</span>}>
              <ActivitiesTable data={ACTIVITIES} onRowClick={openActivity} loading={loading} />
            </Section>

            <Section title="Collaboration">
              {sectionError ? (
                <SectionError label="comments" onRetry={() => toast.info('Retrying…')} />
              ) : (
                <CollaborationStream loading={secondaryLoading} />
              )}
            </Section>

            <Section title="Milestones">
              <MilestonesList loading={secondaryLoading} />
            </Section>

            <Section title="Evidence & documents">
              {sectionError ? (
                <SectionError label="documents" onRetry={() => toast.info('Retrying…')} />
              ) : (
                <EvidenceList loading={secondaryLoading} />
              )}
            </Section>

            <Section title="Dependencies">
              <DependencyList loading={secondaryLoading} />
            </Section>

            <Section title="Recent updates" action={<button className={styles.sectionAction} onClick={() => toast.info('Opening history')}>View all</button>}>
              {sectionError ? (
                <SectionError label="recent updates" onRetry={() => toast.info('Retrying…')} />
              ) : (
                <ActivityFeed entries={RECENT_UPDATES} loading={secondaryLoading} />
              )}
            </Section>
          </div>

          <div className={styles.supporting}>
            <InterventionContext />
          </div>
        </div>
      </div>

      <ActivityInspector open={inspectorOpen} activity={activity} onClose={() => setInspectorOpen(false)} />
    </div>
  )
}

function SectionError({ label, onRetry }: { label: string; onRetry: () => void }) {
  return (
    <div className={styles.sectionError} role="alert">
      <span>Couldn&rsquo;t load {label}.</span>
      <Button size="sm" variant="secondary" onClick={onRetry}>Retry</Button>
    </div>
  )
}

function EmptyIntervention({ onCreate }: { onCreate: () => void }) {
  return (
    <div className={styles.empty}>
      <h2 className={styles.emptyTitle}>This is where the work happens</h2>
      <p className={styles.emptyCopy}>
        Activities are the units of delivery for this intervention — each one has an owner, a due date,
        evidence and a discussion. Break the work into activities to start coordinating delivery,
        tracking progress and collaborating with your team in one place.
      </p>
      <div className={styles.emptyActions}>
        <Button variant="primary" size="md" iconLeft={<Icon name="plus" size={16} />} onClick={onCreate}>Create Activity</Button>
      </div>
    </div>
  )
}

export function InterventionWorkspace() {
  return (
    <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
      <InterventionWorkspaceInner />
    </Suspense>
  )
}
