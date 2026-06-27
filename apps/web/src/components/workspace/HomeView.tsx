'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'
import { StatusChip } from '@/components/primitives/StatusChip'
import { getMyProfile } from '@/lib/data/admin'
import { getWorkspaceOverview, getGettingStarted } from '@/lib/data/home'
import { timeAgo } from '@/lib/format'
import page from '@/components/portfolio/PortfolioWorkspace.module.css'
import s from '@/components/pages/pages.module.css'
import h from './Home.module.css'

const DISMISS_KEY = 'tbi-getting-started-dismissed'

const STEPS = [
  { key: 'priorityAreas', label: 'Create a priority area', href: '/priority-areas' },
  { key: 'interventions', label: 'Add an intervention', href: '/interventions' },
  { key: 'activities', label: 'Add an activity with an owner and due date', href: '/interventions' },
  { key: 'members', label: 'Invite a team member', href: '/team' },
  { key: 'reports', label: 'Generate a report', href: '/reports' },
] as const

export function HomeView() {
  const router = useRouter()
  const { data: profile } = useQuery({ queryKey: ['profile'], queryFn: getMyProfile })
  const { data: overview, isLoading } = useQuery({ queryKey: ['home-overview'], queryFn: getWorkspaceOverview })
  const { data: gs } = useQuery({ queryKey: ['getting-started'], queryFn: getGettingStarted })

  const [dismissed, setDismissed] = useState(false)
  useEffect(() => { setDismissed(localStorage.getItem(DISMISS_KEY) === '1') }, [])

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
  const firstName = profile?.name?.split(' ')[0]

  if (isLoading || !overview) {
    return <div className={page.page}><div className={page.body}><div className={h.empty}>Loading your workspace…</div></div></div>
  }

  const { counts, health, needsAttention, myActivities, recent } = overview
  const isEmpty = counts.portfolios === 0 && counts.priorityAreas === 0 && counts.projects === 0

  // First run — nothing created yet.
  if (isEmpty) {
    return (
      <div className={page.page}>
        <div className={page.body}>
          <div className={h.welcome}>
            <h1 className={h.welcomeTitle}>Welcome to your delivery workspace</h1>
            <p className={h.welcomeBody}>
              This is where your government tracks what it is delivering — what is on track, what is behind, who owns it, and what decision is needed. Set up your first priority to begin.
            </p>
            <div className={h.flow} aria-hidden="true">
              <span className={h.flowStep}>Priority Area</span>
              <span className={h.flowArrow}>→</span>
              <span className={h.flowStep}>Intervention</span>
              <span className={h.flowArrow}>→</span>
              <span className={h.flowStep}>Activity</span>
            </div>
            <div className={h.welcomeActions}>
              <Button variant="primary" size="md" iconLeft={<Icon name="plus" size={16} />} onClick={() => router.push('/priority-areas')}>Create a priority area</Button>
              <Button variant="secondary" size="md" onClick={() => router.push('/portfolio')}>Start with a portfolio</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const attention = needsAttention.length
  const heroSub = attention === 0
    ? 'Everything is on track.'
    : `${attention} ${attention === 1 ? 'item needs' : 'items need'} attention.`

  const showChecklist = gs && !gs.complete && !dismissed
  const stepDone = (key: string) => {
    if (!gs) return false
    const map: Record<string, number> = { priorityAreas: gs.priorityAreas, interventions: gs.interventions, activities: gs.activities, members: gs.members, reports: gs.reports }
    return key === 'members' ? gs.members > 1 : (map[key] ?? 0) > 0
  }

  function dismissChecklist() { localStorage.setItem(DISMISS_KEY, '1'); setDismissed(true) }

  return (
    <div className={page.page}>
      <div className={page.body}>
        <div className={h.hero}>
          <h1 className={h.heroTitle}>{greeting}{firstName ? `, ${firstName}` : ''}</h1>
          <p className={h.heroSub}>{heroSub}</p>
        </div>

        {/* Summary */}
        <div className={h.metrics}>
          {([
            ['Portfolios', counts.portfolios], ['Priority areas', counts.priorityAreas],
            ['Projects', counts.projects], ['Interventions', counts.interventions], ['Activities', counts.activities],
          ] as [string, number][]).map(([label, value]) => (
            <div key={label} className={h.metric}>
              <div className={h.metricValue}>{value}</div>
              <div className={h.metricLabel}>{label}</div>
            </div>
          ))}
        </div>

        {/* Getting started */}
        {showChecklist && (
          <div className={h.checklist}>
            <div className={h.checklistHead}>
              <div>
                <div className={h.checklistTitle}>Getting started</div>
                <div className={h.checklistSub}>Finish setting up to track delivery end to end.</div>
              </div>
              <button type="button" className={h.dismiss} onClick={dismissChecklist}>Dismiss</button>
            </div>
            {STEPS.map((step) => {
              const done = stepDone(step.key)
              return (
                <Link key={step.key} href={step.href} className={h.step}>
                  <span className={`${h.tick} ${done ? h.tickDone : ''}`}>{done && <Icon name="check" size={12} />}</span>
                  <span className={`${h.stepLabel} ${done ? h.stepLabelDone : ''}`}>{step.label}</span>
                  {!done && <span className={h.stepGo}>Go →</span>}
                </Link>
              )
            })}
          </div>
        )}

        <div className={h.grid}>
          {/* Needs attention */}
          <section className={h.section}>
            <div className={h.sectionHead}>
              <span className={h.sectionTitle}>Needs attention</span>
            </div>
            {needsAttention.length === 0 ? (
              <div className={s.empty}>Nothing at risk. Every priority and project is on track.</div>
            ) : (
              <ul className={s.list} role="list">
                {needsAttention.map((it) => (
                  <li key={`${it.type}-${it.id}`}>
                    <button type="button" className={`${s.row} ${s.rowButton}`} onClick={() => it.href && router.push(it.href)}>
                      <span className={s.rowMain}>
                        <span className={s.rowTitle}>{it.label}</span>
                        <span className={s.rowSub}>{it.type}</span>
                      </span>
                      <StatusChip status={it.health} size="sm" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* My activities */}
          <section className={h.section}>
            <div className={h.sectionHead}>
              <span className={h.sectionTitle}>My activities</span>
            </div>
            {myActivities.length === 0 ? (
              <div className={s.empty}>No activities assigned to you.</div>
            ) : (
              <ul className={s.list} role="list">
                {myActivities.map((a) => (
                  <li key={a.id}>
                    <div className={s.row}>
                      <span className={s.rowMain}>
                        <span className={s.rowTitle}>{a.name}</span>
                        {a.due && <span className={s.rowSub} style={a.overdue ? { color: 'var(--color-status-critical-text)' } : undefined}>{a.due}</span>}
                      </span>
                      <StatusChip status={a.status} size="sm" />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        {/* Recent activity */}
        <section className={h.section}>
          <div className={h.sectionHead}><span className={h.sectionTitle}>Recent activity</span></div>
          {recent.length === 0 ? (
            <div className={s.empty}>No activity yet. Comments and updates appear here as your team works.</div>
          ) : (
            <ul className={s.list} role="list">
              {recent.map((c) => (
                <li key={c.id}>
                  <div className={s.row}>
                    <span className={s.rowMain}>
                      <span className={s.rowTitle}><strong>{c.author}</strong> {c.body}</span>
                      <span className={s.rowSub}>{timeAgo(c.created_at)}</span>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}
