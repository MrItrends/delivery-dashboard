'use client'

import { Suspense, useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'
import { Avatar } from '@/components/primitives/Avatar'
import { FormBanner } from '@/components/auth/AuthScaffold'
import { ActivityFeed } from '@/components/workspace/ActivityFeed'
import { ItemInspector, type InspectorDetail } from '@/components/workspace/ItemInspector'
import { StrategicTimeline } from '@/components/portfolio/StrategicTimeline'
import { PortfolioActionsMenu } from '@/components/portfolio/PortfolioActionsMenu'
import { useOnline } from '@/lib/hooks/useOnline'
import { useToastStore } from '@/stores/useToastStore'
import { PriorityAreaSummary } from './PriorityAreaSummary'
import { ProjectsTable } from './ProjectsTable'
import { TargetProgress } from './TargetProgress'
import { RiskRegisterTable } from './RiskRegisterTable'
import { PriorityAreaContext } from './PriorityAreaContext'
import { ProjectInspector } from './ProjectInspector'
import {
  PRIORITY_AREA,
  SUMMARY,
  PROJECTS,
  TARGETS,
  TIMELINE,
  TIMELINE_MONTHS,
  RISKS,
  EXEC_ACTIVITY,
  type ProjectRow,
  type RiskRow,
} from '@/lib/mock/priorityArea'
import styles from '@/components/portfolio/PortfolioWorkspace.module.css'

function Section({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  const id = `pa-${title.toLowerCase().replace(/\s+/g, '-')}`
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

function PriorityAreaWorkspaceInner() {
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

  // Project inspector
  const [project, setProject] = useState<ProjectRow | null>(null)
  const [projectOpen, setProjectOpen] = useState(false)
  const openProject = useCallback((p: ProjectRow) => { setProject(p); setProjectOpen(true) }, [])
  const openProjectWorkspace = useCallback((p: ProjectRow) => { toast.info(`Open ${p.name} — Project workspace (coming soon)`) }, [toast])

  // Risk inspector (generic ItemInspector)
  const [riskDetail, setRiskDetail] = useState<InspectorDetail | null>(null)
  const [riskOpen, setRiskOpen] = useState(false)
  const openRisk = useCallback((r: RiskRow) => {
    setRiskDetail({
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
    setRiskOpen(true)
  }, [])

  const header = (
    <PageHeader
      title={PRIORITY_AREA.name}
      description={PRIORITY_AREA.mission}
      status={PRIORITY_AREA.health}
      metadata={[
        { label: 'Owner', value: (<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Avatar name={PRIORITY_AREA.owner} size="xs" /> {PRIORITY_AREA.owner}</span>) },
        { label: 'Reporting cycle', value: PRIORITY_AREA.reportingCycle },
      ]}
      primaryAction={
        <div className={styles.headerActions}>
          <Button variant="secondary" size="md" iconLeft={<Icon name="document" size={16} />} onClick={() => toast.info('Generate Report — coming soon')}>Generate report</Button>
          <PortfolioActionsMenu />
          <Button variant="primary" size="md" iconLeft={<Icon name="plus" size={16} />} onClick={() => toast.info('New Project — coming soon')}>Create project</Button>
        </div>
      }
    />
  )

  if (isEmpty) {
    return (
      <div className={styles.page}>
        {header}
        <div className={styles.body}><EmptyPriorityArea onCreate={() => toast.info('New Project — coming soon')} /></div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      {header}
      <div className={styles.body}>
        {isOffline && (
          <div className={styles.bannerRow}>
            <FormBanner tone="warning">You&rsquo;re offline. Showing the latest data saved on this device.</FormBanner>
          </div>
        )}

        <div className={styles.layout}>
          <div className={styles.main}>
            <Section title="Strategic summary">
              <PriorityAreaSummary metrics={SUMMARY} health={PRIORITY_AREA.health} budgetHealth={PRIORITY_AREA.budgetHealth} targetStatus={PRIORITY_AREA.targetStatus} loading={loading} />
            </Section>

            <Section title="Projects" action={<span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)' }}>{PROJECTS.length} projects</span>}>
              <ProjectsTable data={PROJECTS} onRowClick={openProject} onRowDoubleClick={openProjectWorkspace} loading={loading} />
            </Section>

            <Section title="Target progress">
              <TargetProgress targets={TARGETS} loading={loading} />
            </Section>

            <Section title="Strategic timeline">
              {sectionError ? (
                <div className={styles.sectionError} role="alert">
                  <span>Couldn&rsquo;t load the timeline.</span>
                  <Button size="sm" variant="secondary" onClick={() => toast.info('Retrying…')}>Retry</Button>
                </div>
              ) : (
                <StrategicTimeline tracks={TIMELINE} months={TIMELINE_MONTHS} loading={timelineLoading} />
              )}
            </Section>

            <Section title="Risk register" action={<span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)' }}>{RISKS.length} risks</span>}>
              <RiskRegisterTable data={RISKS} onRowClick={openRisk} loading={loading} />
            </Section>

            <Section title="Executive activity" action={<button className={styles.sectionAction} onClick={() => toast.info('Opening activity')}>View all</button>}>
              {sectionError ? (
                <div className={styles.sectionError} role="alert">
                  <span>Couldn&rsquo;t load executive activity.</span>
                  <Button size="sm" variant="secondary" onClick={() => toast.info('Retrying…')}>Retry</Button>
                </div>
              ) : (
                <ActivityFeed entries={EXEC_ACTIVITY} loading={loading} />
              )}
            </Section>
          </div>

          <div className={styles.supporting}>
            <PriorityAreaContext />
          </div>
        </div>
      </div>

      <ProjectInspector open={projectOpen} project={project} onClose={() => setProjectOpen(false)} onOpenWorkspace={openProjectWorkspace} />
      <ItemInspector open={riskOpen} detail={riskDetail} onClose={() => setRiskOpen(false)} />
    </div>
  )
}

function EmptyPriorityArea({ onCreate }: { onCreate: () => void }) {
  return (
    <div className={styles.empty}>
      <h2 className={styles.emptyTitle}>Start delivering this objective</h2>
      <p className={styles.emptyCopy}>
        A priority area coordinates all the projects working toward one strategic national
        objective. Each project contributes to the same target — so you can see health, risk
        and progress toward the outcome in one place. Create your first project to begin.
      </p>
      <div className={styles.emptyActions}>
        <Button variant="primary" size="md" iconLeft={<Icon name="plus" size={16} />} onClick={onCreate}>Create Project</Button>
      </div>
    </div>
  )
}

export function PriorityAreaWorkspace() {
  return (
    <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
      <PriorityAreaWorkspaceInner />
    </Suspense>
  )
}
