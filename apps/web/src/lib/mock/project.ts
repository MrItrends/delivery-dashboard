// =============================================================================
// Mock data for the Project (Programme) Workspace.
// =============================================================================

import type { ObjectStatus } from '@/components/primitives/StatusChip'
import type { SummaryMetric, FeedEntry } from '@/lib/mock/workspace'
import type { TimelineTrack } from '@/lib/mock/portfolio'
import type { RiskRow } from '@/lib/mock/priorityArea'

export { TIMELINE_MONTHS } from '@/lib/mock/portfolio'
export type { RiskRow } from '@/lib/mock/priorityArea'

export const PROJECT = {
  name: 'Ward 4 Reconstruction',
  description: 'Full reconstruction of Ward 4 to deliver 120 additional beds and modern theatre capacity by Q2 2027.',
  owner: 'Sarah Evans',
  reportingCycle: 'Q2 2026 · Apr–Jun',
  health: 'at-risk' as ObjectStatus,
  budgetHealth: 'critical' as ObjectStatus,
  deliveryConfidence: 'at-risk' as ObjectStatus,
  presence: ['Sarah Evans', 'Ahmed Yusuf', 'Marcus Johnson', 'Priya Sharma'],
}

export const SUMMARY: SummaryMetric[] = [
  { id: 'interventions', label: 'Active interventions', value: 8, tone: 'neutral' },
  { id: 'activities', label: 'Open activities', value: 64, tone: 'neutral' },
  { id: 'milestones', label: 'Upcoming milestones', value: 3, tone: 'warning' },
  { id: 'approvals', label: 'Pending approvals', value: 4, tone: 'warning' },
  { id: 'risks', label: 'Open risks', value: 6, tone: 'critical' },
  { id: 'decisions', label: 'Open decisions', value: 2, tone: 'warning' },
]

// ---- Interventions (dominant table) --------------------------------------
export interface InterventionRow {
  id: string
  name: string
  owner: string
  status: ObjectStatus
  health: ObjectStatus
  progress: number
  budgetPct: number
  budgetTone: ObjectStatus
  activities: number
  milestonesDone: number
  milestonesTotal: number
  risks: number
  risksHigh: boolean
  dependencies: number
  lastUpdated: string
}

export const INTERVENTIONS: InterventionRow[] = [
  { id: 'iv1', name: 'Structural Works', owner: 'Ahmed Yusuf', status: 'blocked', health: 'critical', progress: 34, budgetPct: 92, budgetTone: 'critical', activities: 18, milestonesDone: 1, milestonesTotal: 3, risks: 3, risksHigh: true, dependencies: 2, lastUpdated: '1h ago' },
  { id: 'iv2', name: 'M&E Installation', owner: 'Marcus Johnson', status: 'active', health: 'at-risk', progress: 48, budgetPct: 71, budgetTone: 'at-risk', activities: 12, milestonesDone: 1, milestonesTotal: 2, risks: 1, risksHigh: false, dependencies: 1, lastUpdated: '3h ago' },
  { id: 'iv3', name: 'Theatre Fit-out', owner: 'Priya Sharma', status: 'active', health: 'at-risk', progress: 41, budgetPct: 66, budgetTone: 'healthy', activities: 9, milestonesDone: 0, milestonesTotal: 2, risks: 1, risksHigh: false, dependencies: 3, lastUpdated: '5h ago' },
  { id: 'iv4', name: 'Digital Systems', owner: 'James Chen', status: 'active', health: 'healthy', progress: 62, budgetPct: 54, budgetTone: 'healthy', activities: 8, milestonesDone: 1, milestonesTotal: 2, risks: 0, risksHigh: false, dependencies: 1, lastUpdated: 'Yesterday' },
  { id: 'iv5', name: 'Decant Logistics', owner: 'Sarah Evans', status: 'complete', health: 'healthy', progress: 100, budgetPct: 48, budgetTone: 'healthy', activities: 0, milestonesDone: 2, milestonesTotal: 2, risks: 0, risksHigh: false, dependencies: 0, lastUpdated: '2 days ago' },
  { id: 'iv6', name: 'Commissioning', owner: 'Marcus Johnson', status: 'planned', health: 'healthy', progress: 0, budgetPct: 0, budgetTone: 'healthy', activities: 5, milestonesDone: 0, milestonesTotal: 3, risks: 1, risksHigh: false, dependencies: 4, lastUpdated: '3 days ago' },
]

export const INTERVENTION_VIEWS = [
  { id: 'all', label: 'All' },
  { id: 'attention', label: 'Needs attention' },
  { id: 'blocked', label: 'Blocked' },
  { id: 'mine', label: 'My interventions' },
]

export const INTERVENTION_STATUSES: ObjectStatus[] = ['planned', 'active', 'blocked', 'at-risk', 'complete']

// ---- Timeline (tracks = interventions) -----------------------------------
export const TIMELINE: TimelineTrack[] = [
  { id: 'iv1', name: 'Structural Works', bar: { startIndex: 0, endIndex: 6, health: 'critical' }, items: [
    { id: 'm1', type: 'milestone', monthIndex: 1, label: 'Foundations complete' },
    { id: 'm2', type: 'budget', monthIndex: 2, label: 'Tranche 2 release' },
    { id: 'm3', type: 'review', monthIndex: 4, label: 'Structural review' },
  ] },
  { id: 'iv2', name: 'M&E Installation', bar: { startIndex: 2, endIndex: 8, health: 'at-risk' }, items: [
    { id: 'm4', type: 'milestone', monthIndex: 3, label: 'First fix complete' },
    { id: 'm5', type: 'deliverable', monthIndex: 7, label: 'M&E handover' },
  ] },
  { id: 'iv3', name: 'Theatre Fit-out', bar: { startIndex: 4, endIndex: 9, health: 'at-risk' }, items: [
    { id: 'm6', type: 'review', monthIndex: 6, label: 'Clinical sign-off' },
  ] },
  { id: 'iv4', name: 'Digital Systems', bar: { startIndex: 3, endIndex: 8, health: 'healthy' }, items: [
    { id: 'm7', type: 'deliverable', monthIndex: 7, label: 'Systems go-live' },
  ] },
  { id: 'iv6', name: 'Commissioning', bar: { startIndex: 8, endIndex: 11, health: 'healthy' }, items: [
    { id: 'm8', type: 'milestone', monthIndex: 9, label: 'Commissioning start' },
    { id: 'm9', type: 'deliverable', monthIndex: 11, label: 'Ward handover' },
  ] },
]

// ---- Decision register ----------------------------------------------------
export interface DecisionRow {
  id: string
  decision: string
  owner: string
  date: string
  status: ObjectStatus
  statusLabel: string
  linkedIntervention: string
  outcome: string
  evidence: number
  type: string
}

export const DECISIONS: DecisionRow[] = [
  { id: 'dc1', decision: 'Accelerate structural works programme', owner: 'Sarah Evans', date: '24 Jun', status: 'approved', statusLabel: 'Approved', linkedIntervention: 'Structural Works', outcome: '6-week recovery plan agreed', evidence: 2, type: 'Operational' },
  { id: 'dc2', decision: 'Approve £3.1M contingency drawdown', owner: 'Ahmed Yusuf', date: '22 Jun', status: 'approved', statusLabel: 'Approved', linkedIntervention: 'Structural Works', outcome: 'Funded from portfolio reserve', evidence: 3, type: 'Financial' },
  { id: 'dc3', decision: 'Defer digital theatre integration', owner: 'James Chen', date: '20 Jun', status: 'at-risk', statusLabel: 'Deferred', linkedIntervention: 'Digital Systems', outcome: 'Revisit at Q3 review', evidence: 1, type: 'Strategic' },
  { id: 'dc4', decision: 'Onboard second M&E supplier', owner: 'Marcus Johnson', date: '—', status: 'active', statusLabel: 'Pending', linkedIntervention: 'M&E Installation', outcome: 'Awaiting board approval', evidence: 0, type: 'Governance' },
]

export const DECISION_VIEWS = [
  { id: 'all', label: 'All' },
  { id: 'open', label: 'Open' },
  { id: 'approved', label: 'Approved' },
]

// ---- Risks & issues -------------------------------------------------------
export const RISKS: RiskRow[] = [
  { id: 'rk1', risk: 'Structural delay against recovery plan', severity: 'critical', owner: 'Ahmed Yusuf', impact: 'High', likelihood: 'High', mitigation: 'Accelerated works programme', status: 'active', nextReview: '28 Jun' },
  { id: 'rk2', risk: 'Budget overrun on structural package', severity: 'critical', owner: 'Sarah Evans', impact: 'High', likelihood: 'Medium', mitigation: 'Contingency drawdown approved', status: 'active', nextReview: '30 Jun' },
  { id: 'rk3', risk: 'M&E supplier capacity', severity: 'at-risk', owner: 'Marcus Johnson', impact: 'Medium', likelihood: 'Medium', mitigation: 'Second supplier onboarding', status: 'blocked', nextReview: '5 Jul' },
  { id: 'rk4', risk: 'Clinical sign-off slippage', severity: 'at-risk', owner: 'Priya Sharma', impact: 'Medium', likelihood: 'Low', mitigation: 'Early clinical engagement', status: 'active', nextReview: '8 Jul' },
  { id: 'rk5', risk: 'Commissioning readiness', severity: 'healthy', owner: 'Marcus Johnson', impact: 'Low', likelihood: 'Low', mitigation: 'Phased commissioning plan', status: 'active', nextReview: '15 Jul' },
]

// ---- Recent activity ------------------------------------------------------
export const ACTIVITY: FeedEntry[] = [
  { id: 'a1', actor: 'Ahmed Yusuf', action: 'changed status to Blocked on', target: 'Structural Works', context: 'awaiting steel delivery', time: '40m ago', group: 'Today', kind: 'status' },
  { id: 'a2', actor: 'Sarah Evans', action: 'recorded a decision', target: 'Accelerate structural works', context: 'Ward 4 Reconstruction', time: '1h ago', group: 'Today', kind: 'approval' },
  { id: 'a3', actor: 'Priya Sharma', action: 'uploaded evidence to', target: 'Theatre Fit-out', context: 'clinical brief v3', time: '3h ago', group: 'Today', kind: 'evidence' },
  { id: 'a4', actor: 'Marcus Johnson', action: 'assigned', target: 'M&E first fix', context: 'to J. Chen', time: 'Yesterday', group: 'Yesterday', kind: 'assignment' },
  { id: 'a5', actor: 'You', action: 'approved budget on', target: 'Contingency drawdown', context: '£3.1M', time: 'Yesterday', group: 'Yesterday', kind: 'approval' },
  { id: 'a6', actor: 'James Chen', action: 'commented on', target: 'Digital Systems', context: 'integration sequencing', time: '2 days ago', group: 'Earlier', kind: 'comment' },
]

// ---- Supporting context ---------------------------------------------------
export const RECENT_REPORTS = [
  { id: 'r1', label: 'Ward 4 Monthly Report', context: 'Published 3 days ago' },
  { id: 'r2', label: 'Recovery Plan Assurance', context: '1 week ago' },
]
export const PINNED_DOCUMENTS = [
  { id: 'd1', label: 'Construction Programme.pdf' },
  { id: 'd2', label: 'Clinical Output Spec.docx' },
]
export const UPCOMING_REVIEWS = [
  { id: 'u1', label: 'Structural review', context: '28 Jun · 11:00' },
  { id: 'u2', label: 'Clinical sign-off', context: '6 Jul · Theatre' },
]
export const LINKED_DECISIONS = [
  { id: 'dec1', label: 'Accelerate structural works', context: 'Approved today' },
  { id: 'dec2', label: 'Contingency drawdown', context: 'Approved 22 Jun' },
]
export const PROJECT_FILES = [
  { id: 'f1', label: 'Site survey.pdf' },
  { id: 'f2', label: 'Risk log.xlsx' },
]
