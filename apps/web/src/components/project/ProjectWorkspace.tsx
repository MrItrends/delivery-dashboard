'use client'

import { Suspense, useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'
import { Avatar, AvatarStack } from '@/components/primitives/Avatar'
import { FormBanner } from '@/components/auth/AuthScaffold'
import { ActivityFeed } from '@/components/workspace/ActivityFeed'
import { ItemInspector, type InspectorDetail } from '@/components/workspace/ItemInspector'
import { StrategicTimeline } from '@/components/portfolio/StrategicTimeline'
import { PortfolioActionsMenu } from '@/components/portfolio/PortfolioActionsMenu'
import { RiskRegisterTable } from '@/components/priority-area/RiskRegisterTable'
import { useOnline } from '@/lib/hooks/useOnline'
import { useToastStore } from '@/stores/useToastStore'
import { ProgrammeSummary } from './ProgrammeSummary'
import { InterventionsTable } from './InterventionsTable'
import { DecisionRegisterTable } from './DecisionRegisterTable'
import { ProjectContext } from './ProjectContext'
import { InterventionInspector } from './InterventionInspector'
import {
  PROJECT,
  SUMMARY,
  INTERVENTIONS,
  TIMELINE,
  TIMELINE_MONTHS,
  DECISIONS,
  RISKS,
  ACTIVITY,
  type InterventionRow,
  type DecisionRow,
  type RiskRow,
} from '@/lib/mock/project'
import styles from '@/components/portfolio/PortfolioWorkspace.module.css'

function Section({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  const id = `pj-${title.toLowerCase().replace(/[^a-z]+/g, '-')}`
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

function ProjectWorkspaceInner() {
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

  const [timelineReady, setTimelineReady] = useState(false)
  useEffect(() => { const t = setTimeout(() => setTimelineReady(true), 1100); return () => clearTimeout(t) }, [])
  const timelineLoading = forceLoading || !timelineReady

  // Intervention inspector
  const [intervention, setIntervention] = useState<InterventionRow | null>(null)
  const [ivOpen, setIvOpen] = useState(false)
  const openIntervention = useCallback((i: InterventionRow) => { setIntervention(i); setIvOpen(true) }, [])
  const openIvWorkspace = useCallback((i: InterventionRow) => { toast.info(`Open ${i.name} — Intervention workspace (coming soon)`) }, [toast])

  // Generic inspector (decisions + risks)
  const [detail, setDetail] = useState<InspectorDetail | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  const openDecision = useCallback((d: DecisionRow) => {
    setDetail({
      objectType: `Decision · ${d.type}`,
      title: d.decision,
      status: d.status,
      fields: [
        { label: 'Owner', value: d.owner },
        { label: 'Date', value: d.date },
        { label: 'Status', value: d.statusLabel },
        { label: 'Linked', value: d.linkedIntervention },
        { label: 'Evidence', value: d.evidence > 0 ? `${d.evidence} attached` : 'None' },
      ],
      description: d.outcome,
    })
    setDetailOpen(true)
  }, [])

  const openRisk = useCallback((r: RiskRow) => {
    setDetail({
      objectType: 'Risk',
      title: r.risk,
      status: r.severity,
      fields: [
        { label: 'Owner', value: r.owner },
        { label: 'Impact', value: r.impact },
        { label: 'Likelihood', value: r.likelihood },
        { label: 'Status', value: r.status },
        { label: 'Next review', value: r.nextReview },
      ],
      description: `Mitigation: ${r.mitigation}`,
    })
    setDetailOpen(true)
  }, [])

  const header = (
    <PageHeader
      title={PROJECT.name}
      description={PROJECT.description}
      status={PROJECT.health}
      metadata={[
        { label: 'Owner', value: (<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Avatar name={PROJECT.owner} size="xs" /> {PROJECT.owner}</span>) },
        { label: 'Reporting cycle', value: PROJECT.reportingCycle },
        { label: 'Viewing now', value: <AvatarStack users={PROJECT.presence.map((name) => ({ name }))} size="xs" /> },
      ]}
      primaryAction={
        <div className={styles.headerActions}>
          <Button variant="secondary" size="md" iconLeft={<Icon name="document" size={16} />} onClick={() => toast.info('Generate Report — coming soon')}>Generate report</Button>
          <PortfolioActionsMenu />
          <Button variant="primary" size="md" iconLeft={<Icon name="plus" size={16} />} onClick={() => toast.info('New Intervention — coming soon')}>Create intervention</Button>
        </div>
      }
    />
  )

  if (isEmpty) {
    return (
      <div className={styles.page}>
        {header}
        <div className={styles.body}><EmptyProject onCreate={() => toast.info('New Intervention — coming soon')} /></div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      {header}
      <div className={styles.body}>
        {isOffline && (
          <div className={styles.bannerRow}>
            <FormBanner tone="warning">You&rsquo;re offline. Showing the latest programme data saved on this device.</FormBanner>
          </div>
        )}

        <div className={styles.layout}>
          <div className={styles.main}>
            <Section title="Programme summary">
              <ProgrammeSummary metrics={SUMMARY} health={PROJECT.health} deliveryConfidence={PROJECT.deliveryConfidence} budgetHealth={PROJECT.budgetHealth} loading={loading} />
            </Section>

            <Section title="Interventions" action={<span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)' }}>{INTERVENTIONS.length} interventions</span>}>
              <InterventionsTable data={INTERVENTIONS} onRowClick={openIntervention} onRowDoubleClick={openIvWorkspace} loading={loading} />
            </Section>

            <Section title="Programme timeline">
              {sectionError ? (
                <div className={styles.sectionError} role="alert"><span>Couldn&rsquo;t load the timeline.</span><Button size="sm" variant="secondary" onClick={() => toast.info('Retrying…')}>Retry</Button></div>
              ) : (
                <StrategicTimeline tracks={TIMELINE} months={TIMELINE_MONTHS} loading={timelineLoading} />
              )}
            </Section>

            <Section title="Decision register" action={<span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)' }}>{DECISIONS.length} decisions</span>}>
              {sectionError ? (
                <div className={styles.sectionError} role="alert"><span>Couldn&rsquo;t load the decision register.</span><Button size="sm" variant="secondary" onClick={() => toast.info('Retrying…')}>Retry</Button></div>
              ) : (
                <DecisionRegisterTable data={DECISIONS} onRowClick={openDecision} loading={loading} />
              )}
            </Section>

            <Section title="Risks & issues" action={<span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)' }}>{RISKS.length} risks</span>}>
              <RiskRegisterTable data={RISKS} onRowClick={openRisk} loading={loading} />
            </Section>

            <Section title="Recent activity" action={<button className={styles.sectionAction} onClick={() => toast.info('Opening activity')}>View all</button>}>
              {sectionError ? (
                <div className={styles.sectionError} role="alert"><span>Couldn&rsquo;t load recent activity.</span><Button size="sm" variant="secondary" onClick={() => toast.info('Retrying…')}>Retry</Button></div>
              ) : (
                <ActivityFeed entries={ACTIVITY} loading={loading} />
              )}
            </Section>
          </div>

          <div className={styles.supporting}>
            <ProjectContext />
          </div>
        </div>
      </div>

      <InterventionInspector open={ivOpen} intervention={intervention} onClose={() => setIvOpen(false)} onOpenWorkspace={openIvWorkspace} />
      <ItemInspector open={detailOpen} detail={detail} onClose={() => setDetailOpen(false)} />
    </div>
  )
}

function EmptyProject({ onCreate }: { onCreate: () => void }) {
  return (
    <div className={styles.empty}>
      <h2 className={styles.emptyTitle}>Set up your programme</h2>
      <p className={styles.emptyCopy}>
        Interventions are the building blocks of delivery — each one coordinates the activities,
        milestones and budget for a discrete part of this programme. Create your first intervention
        to start coordinating delivery from here.
      </p>
      <div className={styles.emptyActions}>
        <Button variant="primary" size="md" iconLeft={<Icon name="plus" size={16} />} onClick={onCreate}>Create Intervention</Button>
      </div>
    </div>
  )
}

export function ProjectWorkspace() {
  return (
    <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
      <ProjectWorkspaceInner />
    </Suspense>
  )
}
