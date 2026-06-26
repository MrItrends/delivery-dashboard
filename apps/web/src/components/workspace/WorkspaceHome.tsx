'use client'

import { Suspense, useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'
import { FormBanner } from '@/components/auth/AuthScaffold'
import { useOnline } from '@/lib/hooks/useOnline'
import { useToastStore } from '@/stores/useToastStore'
import { SummaryStrip } from './SummaryStrip'
import { MyWorkTable } from './MyWorkTable'
import { PriorityList } from './PriorityList'
import { ActivityFeed } from './ActivityFeed'
import { UpcomingList } from './UpcomingList'
import { WorkspaceSidebar } from './WorkspaceSidebar'
import { ItemInspector, type InspectorDetail } from './ItemInspector'
import {
  WORKSPACE_NAME,
  REPORTING_PERIOD,
  WORKSPACE_HEALTH,
  SUMMARY,
  MY_WORK,
  PRIORITY_ITEMS,
  ACTIVITY_FEED,
  UPCOMING,
  type MyWorkItem,
  type MyWorkBucket,
  type PriorityItem,
} from '@/lib/mock/workspace'
import styles from './WorkspaceHome.module.css'

function Section({
  title,
  action,
  children,
}: {
  title: string
  action?: React.ReactNode
  children: React.ReactNode
}) {
  const id = `section-${title.toLowerCase().replace(/\s+/g, '-')}`
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

function WorkspaceHomeInner() {
  const router = useRouter()
  const params = useSearchParams()
  const online = useOnline()
  const toast = useToastStore()

  const state = params.get('state') // empty | loading | error | offline
  const isEmpty = state === 'empty'
  const forceLoading = state === 'loading'
  const feedError = state === 'error'
  const isOffline = state === 'offline' || !online

  // Progressive reveal — sections load in, never block the whole page.
  const [booting, setBooting] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setBooting(false), 700)
    return () => clearTimeout(t)
  }, [])
  const loading = forceLoading || booting

  const [view, setView] = useState<MyWorkBucket>('assigned')
  const [detail, setDetail] = useState<InspectorDetail | null>(null)
  const [inspectorOpen, setInspectorOpen] = useState(false)

  const openActivity = useCallback((item: MyWorkItem) => {
    setDetail({
      objectType: 'Activity',
      title: item.title,
      status: item.status,
      fields: [
        { label: 'Project', value: item.project },
        { label: 'Owner', value: item.owner },
        { label: 'Priority', value: item.priority[0]!.toUpperCase() + item.priority.slice(1) },
        { label: 'Due', value: item.dueLabel },
        { label: 'Health', value: item.health.replace('-', ' ') },
      ],
      description:
        'This activity is part of the workspace delivery plan. Open the full page to edit details, manage dependencies and add evidence.',
    })
    setInspectorOpen(true)
  }, [])

  const openPriority = useCallback((item: PriorityItem) => {
    setDetail({
      objectType: item.kind,
      title: item.title,
      status: item.status,
      fields: [{ label: 'Context', value: item.context }],
      description:
        'This item needs attention. Open it to review the underlying project, intervention or approval.',
    })
    setInspectorOpen(true)
  }, [])

  const header = (
    <PageHeader
      title={WORKSPACE_NAME}
      status={WORKSPACE_HEALTH.overall}
      metadata={[{ label: 'Reporting period', value: REPORTING_PERIOD }]}
    />
  )

  // ---- Empty workspace ----
  if (isEmpty) {
    return (
      <div className={styles.page}>
        {header}
        <div className={styles.body}>
          <EmptyWorkspace onCreate={() => router.push('/welcome')} />
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
              You&rsquo;re offline. Showing the latest data saved on this device —
              it&rsquo;ll refresh when you reconnect.
            </FormBanner>
          </div>
        )}

        <div className={styles.layout}>
          {/* Main column */}
          <div className={styles.main}>
            <Section title="Summary">
              <SummaryStrip
                metrics={SUMMARY}
                loading={loading}
                onSelect={(m) => { if (m.bucket) setView(m.bucket as MyWorkBucket) }}
              />
            </Section>

            <Section
              title="My Work"
              action={
                <button className={styles.sectionAction} onClick={() => toast.info('Opening My Work')}>
                  View all
                </button>
              }
            >
              <MyWorkTable
                data={MY_WORK}
                activeView={view}
                onViewChange={setView}
                onRowClick={openActivity}
                loading={loading}
              />
            </Section>

            <Section title="Priority items">
              <PriorityList items={PRIORITY_ITEMS} onSelect={openPriority} loading={loading} />
            </Section>

            <Section
              title="Recent activity"
              action={
                <button className={styles.sectionAction} onClick={() => toast.info('Opening activity')}>
                  View all
                </button>
              }
            >
              {feedError ? (
                <div className={styles.sectionError} role="alert">
                  <span>Couldn&rsquo;t load recent activity.</span>
                  <Button size="sm" variant="secondary" onClick={() => toast.info('Retrying…')}>
                    Retry
                  </Button>
                </div>
              ) : (
                <ActivityFeed entries={ACTIVITY_FEED} loading={loading} />
              )}
            </Section>

            <Section title="Upcoming">
              <UpcomingList items={UPCOMING} loading={loading} />
            </Section>
          </div>

          {/* Supporting context */}
          <div className={styles.supporting}>
            <WorkspaceSidebar />
          </div>
        </div>
      </div>

      <ItemInspector
        open={inspectorOpen}
        detail={detail}
        onClose={() => setInspectorOpen(false)}
      />
    </div>
  )
}

function EmptyWorkspace({ onCreate }: { onCreate: () => void }) {
  const actions = [
    { icon: 'shield' as const, title: 'Create your first portfolio', sub: 'Group the strategic priorities you own' },
    { icon: 'check-circle' as const, title: 'Create your first project', sub: 'Start coordinating delivery' },
    { icon: 'mail' as const, title: 'Invite your team', sub: 'Bring in the people you deliver with' },
  ]
  return (
    <div className={styles.empty}>
      <h2 className={styles.emptyTitle}>This is your command centre</h2>
      <p className={styles.emptyCopy}>
        Once you add work, this home surfaces what changed, what needs your
        attention, what&rsquo;s due and what&rsquo;s at risk — so you can see the
        state of delivery the moment you arrive. Start by setting up your first
        portfolio.
      </p>
      <div className={styles.emptyActions}>
        {actions.map((a, i) => (
          <button key={i} type="button" className={styles.emptyAction} onClick={onCreate}>
            <span className={styles.emptyActionIcon} aria-hidden="true">
              <Icon name={a.icon} size={18} />
            </span>
            <span className={styles.emptyActionText}>
              <span className={styles.emptyActionTitle}>{a.title}</span>
              <span className={styles.emptyActionSub}>{a.sub}</span>
            </span>
            <Icon name="arrow-right" size={16} className={styles.emptyArrow} />
          </button>
        ))}
      </div>
    </div>
  )
}

export function WorkspaceHome() {
  return (
    <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
      <WorkspaceHomeInner />
    </Suspense>
  )
}
