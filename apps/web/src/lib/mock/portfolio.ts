// =============================================================================
// Mock data for the Portfolio Workspace. Stands in for the API.
// =============================================================================

import type { ObjectStatus } from '@/components/primitives/StatusChip'
import type { SummaryMetric, FeedEntry } from '@/lib/mock/workspace'

export const PORTFOLIO = {
  name: 'Healthcare Transformation',
  description: 'Improving health outcomes and system resilience across the national healthcare estate.',
  owner: 'Dr. Amara Okonkwo',
  reportingPeriod: 'Q2 2026 · Apr–Jun',
  health: 'at-risk' as ObjectStatus,
  budgetHealth: 'healthy' as ObjectStatus,
  riskLevel: 'critical' as ObjectStatus,
}

// Numeric counts for the summary strip (status values shown as chips separately).
export const SUMMARY: SummaryMetric[] = [
  { id: 'priority-areas', label: 'Priority areas', value: 5, tone: 'neutral' },
  { id: 'projects', label: 'Projects', value: 18, tone: 'neutral' },
  { id: 'interventions', label: 'Interventions', value: 47, tone: 'neutral' },
  { id: 'activities', label: 'Activities', value: 312, tone: 'neutral' },
  { id: 'milestones', label: 'Milestones due', value: 6, tone: 'warning' },
  { id: 'reviews', label: 'Pending reviews', value: 3, tone: 'warning' },
]

// ---- Priority Areas (the dominant table) ---------------------------------
export interface PriorityAreaRow {
  id: string
  name: string
  owner: string
  health: ObjectStatus
  projects: number
  budgetPct: number
  budgetTone: ObjectStatus
  progress: number
  risks: number
  risksHigh: boolean
  milestonesDone: number
  milestonesTotal: number
  lastUpdated: string
}

export const PRIORITY_AREAS: PriorityAreaRow[] = [
  { id: 'pa1', name: 'Hospital Estate Renewal', owner: 'Ahmed Yusuf', health: 'critical', projects: 6, budgetPct: 89, budgetTone: 'at-risk', progress: 42, risks: 5, risksHigh: true, milestonesDone: 1, milestonesTotal: 4, lastUpdated: '2h ago' },
  { id: 'pa2', name: 'Digital Health Records', owner: 'Sarah Evans', health: 'at-risk', projects: 4, budgetPct: 67, budgetTone: 'healthy', progress: 58, risks: 3, risksHigh: false, milestonesDone: 2, milestonesTotal: 3, lastUpdated: '5h ago' },
  { id: 'pa3', name: 'Workforce & Training', owner: 'Marcus Johnson', health: 'healthy', projects: 3, budgetPct: 54, budgetTone: 'healthy', progress: 71, risks: 1, risksHigh: false, milestonesDone: 3, milestonesTotal: 4, lastUpdated: 'Yesterday' },
  { id: 'pa4', name: 'Primary Care Access', owner: 'Priya Sharma', health: 'at-risk', projects: 3, budgetPct: 78, budgetTone: 'at-risk', progress: 49, risks: 2, risksHigh: false, milestonesDone: 1, milestonesTotal: 3, lastUpdated: '2 days ago' },
  { id: 'pa5', name: 'Population Health Data', owner: 'James Chen', health: 'healthy', projects: 2, budgetPct: 41, budgetTone: 'healthy', progress: 63, risks: 0, risksHigh: false, milestonesDone: 2, milestonesTotal: 2, lastUpdated: '3 days ago' },
]

export const PRIORITY_AREA_VIEWS = [
  { id: 'all', label: 'All' },
  { id: 'attention', label: 'Needs attention' },
  { id: 'on-track', label: 'On track' },
  { id: 'mine', label: 'My areas' },
]

// ---- Strategic timeline ---------------------------------------------------
export type TimelineItemType = 'milestone' | 'review' | 'budget' | 'deliverable'

export interface TimelineItem {
  id: string
  type: TimelineItemType
  monthIndex: number // 0-based into MONTHS
  label: string
}

export interface TimelineBar {
  startIndex: number
  endIndex: number
  health: ObjectStatus
}

export interface TimelineTrack {
  id: string
  name: string
  bar: TimelineBar
  items: TimelineItem[]
}

export const TIMELINE_MONTHS = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar']

export const TIMELINE: TimelineTrack[] = [
  {
    id: 'pa1', name: 'Hospital Estate Renewal',
    bar: { startIndex: 0, endIndex: 7, health: 'critical' },
    items: [
      { id: 't1a', type: 'milestone', monthIndex: 1, label: 'Ward 4 planning approved' },
      { id: 't1b', type: 'budget', monthIndex: 2, label: 'Tranche 2 release' },
      { id: 't1c', type: 'review', monthIndex: 3, label: 'Estate review' },
      { id: 't1d', type: 'deliverable', monthIndex: 6, label: 'Phase 1 handover' },
    ],
  },
  {
    id: 'pa2', name: 'Digital Health Records',
    bar: { startIndex: 1, endIndex: 9, health: 'at-risk' },
    items: [
      { id: 't2a', type: 'milestone', monthIndex: 2, label: 'Pilot launch' },
      { id: 't2b', type: 'review', monthIndex: 4, label: 'Security review' },
      { id: 't2c', type: 'deliverable', monthIndex: 8, label: 'National rollout' },
    ],
  },
  {
    id: 'pa3', name: 'Workforce & Training',
    bar: { startIndex: 0, endIndex: 5, health: 'healthy' },
    items: [
      { id: 't3a', type: 'milestone', monthIndex: 1, label: 'Curriculum signed off' },
      { id: 't3b', type: 'milestone', monthIndex: 4, label: 'First cohort complete' },
    ],
  },
  {
    id: 'pa4', name: 'Primary Care Access',
    bar: { startIndex: 2, endIndex: 8, health: 'at-risk' },
    items: [
      { id: 't4a', type: 'budget', monthIndex: 3, label: 'Funding confirmed' },
      { id: 't4b', type: 'review', monthIndex: 5, label: 'Access review' },
      { id: 't4c', type: 'milestone', monthIndex: 7, label: 'Hub network live' },
    ],
  },
  {
    id: 'pa5', name: 'Population Health Data',
    bar: { startIndex: 1, endIndex: 6, health: 'healthy' },
    items: [
      { id: 't5a', type: 'deliverable', monthIndex: 5, label: 'Data platform v1' },
    ],
  },
]

// ---- Executive activity ---------------------------------------------------
export const EXEC_ACTIVITY: FeedEntry[] = [
  { id: 'e1', actor: 'Dr. Amara Okonkwo', action: 'approved', target: 'Tranche 2 budget release', context: 'Hospital Estate Renewal', time: '40m ago', group: 'Today', kind: 'approval' },
  { id: 'e2', actor: 'Sarah Evans', action: 'escalated a risk on', target: 'Data-sharing agreement', context: 'Digital Health Records', time: '2h ago', group: 'Today', kind: 'status' },
  { id: 'e3', actor: 'Marcus Johnson', action: 'achieved milestone', target: 'First cohort complete', context: 'Workforce & Training', time: '4h ago', group: 'Today', kind: 'approval' },
  { id: 'e4', actor: 'You', action: 'published', target: 'Q1 Portfolio Report', context: 'Healthcare Transformation', time: 'Yesterday', group: 'Yesterday', kind: 'report' },
  { id: 'e5', actor: 'Priya Sharma', action: 'updated budget forecast on', target: 'Primary Care Access', context: '+8% outturn', time: 'Yesterday', group: 'Yesterday', kind: 'report' },
  { id: 'e6', actor: 'Ahmed Yusuf', action: 'changed status to Critical on', target: 'Ward 4 Planning', context: 'Hospital Estate Renewal', time: '2 days ago', group: 'Earlier', kind: 'status' },
]

// ---- Supporting context ---------------------------------------------------
export const RECENT_REPORTS = [
  { id: 'r1', label: 'Q1 Portfolio Report', context: 'Published yesterday' },
  { id: 'r2', label: 'Estate Renewal Review', context: '1 week ago' },
  { id: 'r3', label: 'Digital Records Assurance', context: '2 weeks ago' },
]
export const PINNED_SEARCHES = [
  { id: 's1', label: 'Critical risks across portfolio' },
  { id: 's2', label: 'Milestones due this quarter' },
]
export const PORTFOLIO_DOCUMENTS = [
  { id: 'd1', label: 'Portfolio Strategy 2026.pdf' },
  { id: 'd2', label: 'Investment Case.docx' },
]
export const UPCOMING_REVIEWS = [
  { id: 'u1', label: 'Executive board review', context: 'Today · 14:00' },
  { id: 'u2', label: 'Estate review', context: 'Fri · Hospital Estate' },
  { id: 'u3', label: 'Security review', context: '2 Jul · Digital Records' },
]
export const RECENT_DECISIONS = [
  { id: 'dec1', label: 'Approved £3.1M tranche 2 release', context: 'Estate Renewal' },
  { id: 'dec2', label: 'Paused supplier onboarding', context: 'Digital Records' },
]
