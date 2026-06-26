'use client'

import { Suspense, useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'
import { Avatar } from '@/components/primitives/Avatar'
import { FormBanner } from '@/components/auth/AuthScaffold'
import { ActivityFeed } from '@/components/workspace/ActivityFeed'
import { useOnline } from '@/lib/hooks/useOnline'
import { useToastStore } from '@/stores/useToastStore'
import { PortfolioSummary } from './PortfolioSummary'
import { PriorityAreasTable } from './PriorityAreasTable'
import { StrategicTimeline } from './StrategicTimeline'
import { PortfolioContext } from './PortfolioContext'
import { PortfolioActionsMenu } from './PortfolioActionsMenu'
import { PriorityAreaInspector } from './PriorityAreaInspector'
import {
  PORTFOLIO,
  SUMMARY,
  PRIORITY_AREAS,
  TIMELINE,
  TIMELINE_MONTHS,
  EXEC_ACTIVITY,
  type PriorityAreaRow,
} from '@/lib/mock/portfolio'
import styles from './PortfolioWorkspace.module.css'

function Section({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  const id = `pf-${title.toLowerCase().replace(/\s+/g, '-')}`
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

function PortfolioWorkspaceInner() {
  const router = useRouter()
  const params = useSearchParams()
  const online = useOnline()
  const toast = useToastStore()

  const state = params.get('state')
  const isEmpty = state === 'empty'
  const forceLoading = state === 'loading'
  const sectionError = state === 'error'
  const isOffline = state === 'offline' || !online

  const [booting, setBooting] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setBooting(false), 700)
    return () => clearTimeout(t)
  }, [])
  const loading = forceLoading || booting
  // Timeline streams in after the table (per spec).
  const [timelineReady, setTimelineReady] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setTimelineReady(true), 1100)
    return () => clearTimeout(t)
  }, [])
  const timelineLoading = forceLoading || !timelineReady

  const [area, setArea] = useState<PriorityAreaRow | null>(null)
  const [inspectorOpen, setInspectorOpen] = useState(false)

  const openInspector = useCallback((row: PriorityAreaRow) => {
    setArea(row)
    setInspectorOpen(true)
  }, [])

  const openWorkspace = useCallback((row: PriorityAreaRow) => {
    toast.info(`Open ${row.name} — Priority Area workspace (coming soon)`)
  }, [toast])

  const header = (
    <PageHeader
      title={PORTFOLIO.name}
      description={PORTFOLIO.description}
      status={PORTFOLIO.health}
      metadata={[
        { label: 'Owner', value: (<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Avatar name={PORTFOLIO.owner} size="xs" /> {PORTFOLIO.owner}</span>) },
        { label: 'Reporting period', value: PORTFOLIO.reportingPeriod },
      ]}
      primaryAction={
        <div className={styles.headerActions}>
          <PortfolioActionsMenu />
          <Button variant="primary" size="md" iconLeft={<Icon name="document" size={16} />} onClick={() => toast.info('Generate Report — coming soon')}>
            Generate report
          </Button>
        </div>
      }
    />
  )

  if (isEmpty) {
    return (
      <div className={styles.page}>
        {header}
        <div className={styles.body}>
          <EmptyPortfolio onCreate={() => toast.info('New Priority Area — coming soon')} />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      {header}
      <div className={styles.body}>
        {isOffline && (
          <div className={styles.bannerRow}>
            <FormBanner tone="warning">
              You&rsquo;re offline. Showing the latest portfolio data saved on this device.
            </FormBanner>
          </div>
        )}

        <div className={styles.layout}>
          <div className={styles.main}>
            <Section title="Summary">
              <PortfolioSummary
                metrics={SUMMARY}
                health={PORTFOLIO.health}
                budgetHealth={PORTFOLIO.budgetHealth}
                riskLevel={PORTFOLIO.riskLevel}
                loading={loading}
              />
            </Section>

            <Section
              title="Priority Areas"
              action={<span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)' }}>{PRIORITY_AREAS.length} areas</span>}
            >
              <PriorityAreasTable
                data={PRIORITY_AREAS}
                onRowClick={openInspector}
                onRowDoubleClick={openWorkspace}
                loading={loading}
              />
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
            <PortfolioContext />
          </div>
        </div>
      </div>

      <PriorityAreaInspector
        open={inspectorOpen}
        area={area}
        onClose={() => setInspectorOpen(false)}
        onOpenWorkspace={openWorkspace}
      />
    </div>
  )
}

function EmptyPortfolio({ onCreate }: { onCreate: () => void }) {
  return (
    <div className={styles.empty}>
      <h2 className={styles.emptyTitle}>Build out your portfolio</h2>
      <p className={styles.emptyCopy}>
        A portfolio groups the strategic Priority Areas you&rsquo;re accountable for.
        Each Priority Area holds the projects and interventions delivering against one
        objective — so you can see health, risk and progress across everything in one place.
        Start by creating your first Priority Area.
      </p>
      <div className={styles.emptyActions}>
        <Button variant="primary" size="md" iconLeft={<Icon name="plus" size={16} />} onClick={onCreate}>
          Create Priority Area
        </Button>
      </div>
    </div>
  )
}

export function PortfolioWorkspace() {
  return (
    <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
      <PortfolioWorkspaceInner />
    </Suspense>
  )
}
