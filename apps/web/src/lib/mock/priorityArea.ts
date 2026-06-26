// =============================================================================
// Mock data for the Priority Area Workspace.
// =============================================================================

import type { ObjectStatus } from '@/components/primitives/StatusChip'
import type { SummaryMetric, FeedEntry } from '@/lib/mock/workspace'
import type { TimelineTrack } from '@/lib/mock/portfolio'

export { TIMELINE_MONTHS } from '@/lib/mock/portfolio'

export const PRIORITY_AREA = {
  name: 'Hospital Estate Renewal',
  mission: 'Modernise the national hospital estate to expand capacity and improve patient safety by 2028.',
  owner: 'Ahmed Yusuf',
  reportingCycle: 'Q2 2026 · Apr–Jun',
  health: 'at-risk' as ObjectStatus,
  budgetHealth: 'at-risk' as ObjectStatus,
  targetStatus: 'at-risk' as ObjectStatus,
}

export const SUMMARY: SummaryMetric[] = [
  { id: 'projects', label: 'Projects', value: 6, tone: 'neutral' },
  { id: 'interventions', label: 'Active interventions', value: 14, tone: 'neutral' },
  { id: 'target', label: 'Target achievement', value: 58, tone: 'warning' },
  { id: 'milestones', label: 'Milestones due', value: 4, tone: 'warning' },
  { id: 'risks', label: 'Open risks', value: 5, tone: 'critical' },
  { id: 'decisions', label: 'Pending decisions', value: 2, tone: 'warning' },
]

// ---- Projects (dominant table) -------------------------------------------
export interface ProjectRow {
  id: string
  name: string
  owner: string
  health: ObjectStatus
  progress: number
  budgetPct: number
  budgetTone: ObjectStatus
  milestonesDone: number
  milestonesTotal: number
  risks: number
  risksHigh: boolean
  contribution: number
  lastUpdated: string
}

export const PROJECTS: ProjectRow[] = [
  { id: 'pr1', name: 'Ward 4 Reconstruction', owner: 'Sarah Evans', health: 'critical', progress: 38, budgetPct: 91, budgetTone: 'critical', milestonesDone: 1, milestonesTotal: 4, risks: 3, risksHigh: true, contribution: 28, lastUpdated: '2h ago' },
  { id: 'pr2', name: 'Theatre Capacity Expansion', owner: 'Marcus Johnson', health: 'at-risk', progress: 52, budgetPct: 74, budgetTone: 'at-risk', milestonesDone: 2, milestonesTotal: 3, risks: 1, risksHigh: false, contribution: 22, lastUpdated: '6h ago' },
  { id: 'pr3', name: 'Decant & Logistics', owner: 'Priya Sharma', health: 'healthy', progress: 67, budgetPct: 58, budgetTone: 'healthy', milestonesDone: 3, milestonesTotal: 4, risks: 0, risksHigh: false, contribution: 15, lastUpdated: 'Yesterday' },
  { id: 'pr4', name: 'Energy & Sustainability', owner: 'James Chen', health: 'healthy', progress: 71, budgetPct: 49, budgetTone: 'healthy', milestonesDone: 2, milestonesTotal: 2, risks: 1, risksHigh: false, contribution: 18, lastUpdated: '2 days ago' },
  { id: 'pr5', name: 'Digital Theatre Systems', owner: 'Sarah Evans', health: 'at-risk', progress: 44, budgetPct: 66, budgetTone: 'healthy', milestonesDone: 1, milestonesTotal: 3, risks: 2, risksHigh: false, contribution: 12, lastUpdated: '3 days ago' },
  { id: 'pr6', name: 'Workforce Readiness', owner: 'Marcus Johnson', health: 'healthy', progress: 80, budgetPct: 41, budgetTone: 'healthy', milestonesDone: 3, milestonesTotal: 3, risks: 0, risksHigh: false, contribution: 5, lastUpdated: '4 days ago' },
]

export const PROJECT_VIEWS = [
  { id: 'all', label: 'All' },
  { id: 'attention', label: 'Needs attention' },
  { id: 'on-track', label: 'On track' },
  { id: 'mine', label: 'My projects' },
]

// ---- Target progress ------------------------------------------------------
export interface TargetRow {
  id: string
  name: string
  current: number
  target: number
  unit: string
  trend: 'up' | 'down' | 'flat'
  status: ObjectStatus
  forecast: string
  confidence: 'High' | 'Medium' | 'Low'
  spark: number[]
}

export const TARGETS: TargetRow[] = [
  { id: 'tg1', name: 'Additional bed capacity', current: 580, target: 1000, unit: 'beds', trend: 'up', status: 'at-risk', forecast: '870 by Q4', confidence: 'Medium', spark: [120, 210, 300, 360, 430, 510, 580] },
  { id: 'tg2', name: 'Theatre utilisation', current: 82, target: 90, unit: '%', trend: 'up', status: 'healthy', forecast: '91% by Q3', confidence: 'High', spark: [68, 70, 73, 76, 78, 80, 82] },
  { id: 'tg3', name: 'Estate condition (B+ rated)', current: 47, target: 80, unit: '%', trend: 'up', status: 'at-risk', forecast: '64% by Q4', confidence: 'Low', spark: [30, 33, 36, 39, 42, 45, 47] },
  { id: 'tg4', name: 'Patient safety incidents', current: 32, target: 15, unit: '/mo', trend: 'down', status: 'healthy', forecast: '18 by Q4', confidence: 'Medium', spark: [60, 54, 49, 44, 40, 36, 32] },
]

// ---- Strategic timeline (tracks = projects) -------------------------------
export const TIMELINE: TimelineTrack[] = [
  { id: 'pr1', name: 'Ward 4 Reconstruction', bar: { startIndex: 0, endIndex: 8, health: 'critical' }, items: [
    { id: 'm1', type: 'milestone', monthIndex: 1, label: 'Demolition complete' },
    { id: 'm2', type: 'budget', monthIndex: 2, label: 'Tranche 2 release' },
    { id: 'm3', type: 'review', monthIndex: 4, label: 'Construction review' },
    { id: 'm4', type: 'deliverable', monthIndex: 7, label: 'Structural handover' },
  ] },
  { id: 'pr2', name: 'Theatre Expansion', bar: { startIndex: 1, endIndex: 7, health: 'at-risk' }, items: [
    { id: 'm5', type: 'milestone', monthIndex: 3, label: 'Fit-out begins' },
    { id: 'm6', type: 'review', monthIndex: 5, label: 'Clinical sign-off' },
  ] },
  { id: 'pr3', name: 'Decant & Logistics', bar: { startIndex: 0, endIndex: 4, health: 'healthy' }, items: [
    { id: 'm7', type: 'milestone', monthIndex: 1, label: 'Phase 1 decant' },
    { id: 'm8', type: 'deliverable', monthIndex: 3, label: 'Logistics live' },
  ] },
  { id: 'pr4', name: 'Energy & Sustainability', bar: { startIndex: 2, endIndex: 6, health: 'healthy' }, items: [
    { id: 'm9', type: 'budget', monthIndex: 3, label: 'Grant confirmed' },
    { id: 'm10', type: 'milestone', monthIndex: 5, label: 'Plant commissioned' },
  ] },
  { id: 'pr5', name: 'Digital Theatre Systems', bar: { startIndex: 3, endIndex: 9, health: 'at-risk' }, items: [
    { id: 'm11', type: 'deliverable', monthIndex: 8, label: 'Systems go-live' },
  ] },
]

// ---- Risk register --------------------------------------------------------
export interface RiskRow {
  id: string
  risk: string
  severity: ObjectStatus
  owner: string
  impact: 'High' | 'Medium' | 'Low'
  likelihood: 'High' | 'Medium' | 'Low'
  mitigation: string
  status: ObjectStatus
  nextReview: string
}

export const RISKS: RiskRow[] = [
  { id: 'rk1', risk: 'Construction delay on Ward 4', severity: 'critical', owner: 'Sarah Evans', impact: 'High', likelihood: 'High', mitigation: 'Accelerated works programme agreed', status: 'active', nextReview: '28 Jun' },
  { id: 'rk2', risk: 'Budget overrun across estate', severity: 'critical', owner: 'Ahmed Yusuf', impact: 'High', likelihood: 'Medium', mitigation: 'Reforecast and contingency review', status: 'active', nextReview: '30 Jun' },
  { id: 'rk3', risk: 'Supplier capacity shortfall', severity: 'at-risk', owner: 'Marcus Johnson', impact: 'Medium', likelihood: 'Medium', mitigation: 'Second supplier onboarding', status: 'active', nextReview: '5 Jul' },
  { id: 'rk4', risk: 'Clinical sign-off slippage', severity: 'at-risk', owner: 'Priya Sharma', impact: 'Medium', likelihood: 'Low', mitigation: 'Early engagement with clinical leads', status: 'blocked', nextReview: '8 Jul' },
  { id: 'rk5', risk: 'Digital systems integration', severity: 'healthy', owner: 'James Chen', impact: 'Low', likelihood: 'Low', mitigation: 'Phased integration plan', status: 'active', nextReview: '15 Jul' },
]

export const RISK_VIEWS = [
  { id: 'all', label: 'All' },
  { id: 'critical', label: 'Critical' },
  { id: 'open', label: 'Open' },
]

// ---- Executive activity ---------------------------------------------------
export const EXEC_ACTIVITY: FeedEntry[] = [
  { id: 'e1', actor: 'Ahmed Yusuf', action: 'recorded a decision on', target: 'Accelerated works programme', context: 'Ward 4 Reconstruction', time: '35m ago', group: 'Today', kind: 'approval' },
  { id: 'e2', actor: 'Sarah Evans', action: 'escalated a risk on', target: 'Construction delay', context: 'Ward 4 Reconstruction', time: '2h ago', group: 'Today', kind: 'status' },
  { id: 'e3', actor: 'Marcus Johnson', action: 'achieved milestone', target: 'Fit-out begins', context: 'Theatre Expansion', time: '5h ago', group: 'Today', kind: 'approval' },
  { id: 'e4', actor: 'You', action: 'updated target', target: 'Additional bed capacity', context: '+60 this month', time: 'Yesterday', group: 'Yesterday', kind: 'report' },
  { id: 'e5', actor: 'Ahmed Yusuf', action: 'approved budget for', target: 'Energy & Sustainability', context: '£3.1M grant', time: 'Yesterday', group: 'Yesterday', kind: 'approval' },
  { id: 'e6', actor: 'Priya Sharma', action: 'created project', target: 'Workforce Readiness', context: 'Hospital Estate Renewal', time: '2 days ago', group: 'Earlier', kind: 'assignment' },
]

// ---- Supporting context ---------------------------------------------------
export const RECENT_REPORTS = [
  { id: 'r1', label: 'Estate Renewal Q1 Review', context: 'Published 1 week ago' },
  { id: 'r2', label: 'Capacity Forecast 2026', context: '2 weeks ago' },
]
export const DOCUMENTS = [
  { id: 'd1', label: 'Estate Strategy 2028.pdf' },
  { id: 'd2', label: 'Clinical Brief — Ward 4.docx' },
]
export const LINKED_DECISIONS = [
  { id: 'dec1', label: 'Accelerate Ward 4 works', context: 'Today' },
  { id: 'dec2', label: 'Approve second supplier', context: '3 days ago' },
]
export const PINNED_SEARCHES = [
  { id: 's1', label: 'Critical risks' },
  { id: 's2', label: 'Milestones due this quarter' },
]
export const UPCOMING_REVIEWS = [
  { id: 'u1', label: 'Estate review', context: 'Fri · 10:00' },
  { id: 'u2', label: 'Clinical sign-off', context: '5 Jul · Theatre' },
]
