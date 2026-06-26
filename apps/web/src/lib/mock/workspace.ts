// =============================================================================
// Mock data for the Workspace Home. Stands in for the API until it's wired.
// =============================================================================

import type { ObjectStatus } from '@/components/primitives/StatusChip'
import type { IconName } from '@/components/primitives/Icon'

export type Priority = 'low' | 'medium' | 'high' | 'critical'
export type Health = 'healthy' | 'at-risk' | 'critical'

export const WORKSPACE_NAME = 'Cabinet Delivery Unit'
export const REPORTING_PERIOD = 'Q2 2026 · Apr–Jun'

// ---- Summary strip --------------------------------------------------------
export interface SummaryMetric {
  id: string
  label: string
  value: number
  tone: 'neutral' | 'healthy' | 'warning' | 'critical'
  bucket?: string // links to a My Work view
}

export const SUMMARY: SummaryMetric[] = [
  { id: 'at-risk', label: 'Projects at risk', value: 3, tone: 'critical' },
  { id: 'approvals', label: 'Pending approvals', value: 5, tone: 'warning', bucket: 'approvals' },
  { id: 'due-today', label: 'Due today', value: 8, tone: 'neutral', bucket: 'assigned' },
  { id: 'overdue', label: 'Overdue', value: 2, tone: 'critical', bucket: 'assigned' },
  { id: 'milestones', label: 'Milestones this week', value: 4, tone: 'neutral' },
  { id: 'budget', label: 'Budget alerts', value: 1, tone: 'warning' },
]

// ---- My Work --------------------------------------------------------------
export type MyWorkBucket =
  | 'assigned'
  | 'approvals'
  | 'mentions'
  | 'reviews'
  | 'recent'
  | 'pinned'

export interface MyWorkItem {
  id: string
  title: string
  project: string
  owner: string
  status: ObjectStatus
  priority: Priority
  dueLabel: string
  overdue?: boolean
  health: Health
  buckets: MyWorkBucket[]
}

export const MY_WORK: MyWorkItem[] = [
  { id: 'a1', title: 'Submit planning application for Ward 4', project: 'Hospital Upgrade', owner: 'Ahmed Yusuf', status: 'blocked', priority: 'critical', dueLabel: 'Overdue · 2d', overdue: true, health: 'critical', buckets: ['assigned'] },
  { id: 'a2', title: 'Approve Q2 budget reallocation', project: 'Curriculum Reform', owner: 'You', status: 'active', priority: 'high', dueLabel: 'Today', health: 'at-risk', buckets: ['approvals', 'assigned'] },
  { id: 'a3', title: 'Review supplier contract terms', project: 'Digital Identity', owner: 'You', status: 'active', priority: 'high', dueLabel: 'Today', health: 'healthy', buckets: ['reviews', 'assigned'] },
  { id: 'a4', title: 'Draft September delivery report', project: 'Hospital Upgrade', owner: 'Sarah Evans', status: 'active', priority: 'medium', dueLabel: 'Tomorrow', health: 'healthy', buckets: ['assigned'] },
  { id: 'a5', title: 'Sign off pilot launch milestone', project: 'Digital Identity', owner: 'You', status: 'active', priority: 'high', dueLabel: 'In 2 days', health: 'at-risk', buckets: ['approvals'] },
  { id: 'a6', title: 'Respond to risk escalation', project: 'Net Zero Buildings', owner: 'You', status: 'active', priority: 'critical', dueLabel: 'Today', health: 'critical', buckets: ['mentions', 'assigned'] },
  { id: 'a7', title: 'Confirm training schedule', project: 'Curriculum Reform', owner: 'Marcus Johnson', status: 'planned', priority: 'low', dueLabel: 'In 5 days', health: 'healthy', buckets: ['assigned'] },
  { id: 'a8', title: 'Verify evidence for KS2 rollout', project: 'Curriculum Reform', owner: 'You', status: 'active', priority: 'medium', dueLabel: 'In 3 days', health: 'healthy', buckets: ['reviews', 'recent'] },
  { id: 'a9', title: 'Update stakeholder register', project: 'Digital Identity', owner: 'Priya Sharma', status: 'active', priority: 'low', dueLabel: 'In 4 days', health: 'healthy', buckets: ['recent', 'pinned'] },
  { id: 'a10', title: 'Finalise procurement scope', project: 'Net Zero Buildings', owner: 'You', status: 'draft', priority: 'medium', dueLabel: 'Next week', health: 'at-risk', buckets: ['pinned'] },
]

export const MY_WORK_VIEWS: { id: MyWorkBucket; label: string }[] = [
  { id: 'assigned', label: 'Assigned to me' },
  { id: 'approvals', label: 'Awaiting approval' },
  { id: 'mentions', label: 'Mentions' },
  { id: 'reviews', label: 'Reviews requested' },
  { id: 'recent', label: 'Recently viewed' },
  { id: 'pinned', label: 'Pinned' },
]

// ---- Priority items -------------------------------------------------------
export interface PriorityItem {
  id: string
  kind: string
  title: string
  context: string
  status: ObjectStatus
  icon: IconName
  action: string
}

export const PRIORITY_ITEMS: PriorityItem[] = [
  { id: 'p1', kind: 'Delayed project', title: 'Hospital Upgrade slipping against Q2 plan', context: 'Healthcare · 3 weeks behind', status: 'critical', icon: 'alert-triangle', action: 'Review' },
  { id: 'p2', kind: 'Funding gap', title: '£2.4M shortfall on Net Zero Buildings', context: 'Finance · forecast outturn +14%', status: 'at-risk', icon: 'alert-circle', action: 'Open budget' },
  { id: 'p3', kind: 'Blocked intervention', title: 'Digital Identity pilot blocked on supplier', context: 'Digital · 4 activities blocked', status: 'blocked', icon: 'shield', action: 'View' },
  { id: 'p4', kind: 'Risk escalation', title: 'Data-sharing risk escalated to portfolio', context: 'Digital Identity · raised by S. Evans', status: 'critical', icon: 'alert-triangle', action: 'Review' },
  { id: 'p5', kind: 'Missed milestone', title: 'KS2 materials sign-off missed', context: 'Curriculum Reform · due 3 days ago', status: 'at-risk', icon: 'clock', action: 'View' },
  { id: 'p6', kind: 'Approval waiting', title: 'Pilot launch awaiting your approval', context: 'Digital Identity · submitted yesterday', status: 'active', icon: 'check-circle', action: 'Approve' },
]

// ---- Activity feed --------------------------------------------------------
export interface FeedEntry {
  id: string
  actor: string
  action: string
  target: string
  context: string
  time: string
  group: 'Today' | 'Yesterday' | 'Earlier'
  kind: 'assignment' | 'status' | 'comment' | 'evidence' | 'approval' | 'report'
}

export const ACTIVITY_FEED: FeedEntry[] = [
  { id: 'f1', actor: 'Sarah Evans', action: 'approved', target: 'Q1 Milestone', context: 'Hospital Upgrade', time: '14m ago', group: 'Today', kind: 'approval' },
  { id: 'f2', actor: 'Ahmed Yusuf', action: 'uploaded evidence to', target: 'Ward 4 Planning', context: 'Hospital Upgrade', time: '1h ago', group: 'Today', kind: 'evidence' },
  { id: 'f3', actor: 'Marcus Johnson', action: 'changed status to Blocked on', target: 'Supplier Onboarding', context: 'Digital Identity', time: '2h ago', group: 'Today', kind: 'status' },
  { id: 'f4', actor: 'Priya Sharma', action: 'mentioned you in', target: 'Risk Escalation', context: 'Net Zero Buildings', time: '3h ago', group: 'Today', kind: 'comment' },
  { id: 'f5', actor: 'You', action: 'generated', target: 'May Progress Report', context: 'Curriculum Reform', time: 'Yesterday · 17:40', group: 'Yesterday', kind: 'report' },
  { id: 'f6', actor: 'Sarah Evans', action: 'assigned', target: 'Draft delivery report', context: 'to you · Hospital Upgrade', time: 'Yesterday · 15:02', group: 'Yesterday', kind: 'assignment' },
  { id: 'f7', actor: 'Marcus Johnson', action: 'commented on', target: 'Training Schedule', context: 'Curriculum Reform', time: 'Yesterday · 11:18', group: 'Yesterday', kind: 'comment' },
  { id: 'f8', actor: 'Ahmed Yusuf', action: 'completed', target: 'Site survey', context: 'Hospital Upgrade', time: 'Mon · 09:30', group: 'Earlier', kind: 'status' },
]

// ---- Upcoming -------------------------------------------------------------
export interface UpcomingItem {
  id: string
  date: string
  day: string
  title: string
  kind: 'Review' | 'Milestone' | 'Deadline' | 'Funding' | 'Meeting'
  context: string
}

export const UPCOMING: UpcomingItem[] = [
  { id: 'u1', date: '26', day: 'Today', title: 'Portfolio review — Healthcare', kind: 'Review', context: '14:00 · with executive board' },
  { id: 'u2', date: '27', day: 'Fri', title: 'Pilot Launch milestone due', kind: 'Milestone', context: 'Digital Identity' },
  { id: 'u3', date: '30', day: 'Mon', title: 'Q2 delivery report deadline', kind: 'Deadline', context: 'All portfolios' },
  { id: 'u4', date: '02', day: 'Wed', title: 'Net Zero funding release', kind: 'Funding', context: '£3.1M tranche 2' },
  { id: 'u5', date: '04', day: 'Fri', title: 'Executive delivery meeting', kind: 'Meeting', context: 'Monthly · Cabinet Office' },
]

// ---- Supporting context ---------------------------------------------------
export const RECENT_REPORTS = [
  { id: 'r1', label: 'May Progress Report', context: 'Curriculum Reform' },
  { id: 'r2', label: 'Q1 Portfolio Summary', context: 'Healthcare' },
  { id: 'r3', label: 'Budget Forecast — Net Zero', context: 'Finance' },
]

export const SAVED_SEARCHES = [
  { id: 's1', label: 'Overdue activities' },
  { id: 's2', label: 'Blocked interventions' },
  { id: 's3', label: 'At-risk milestones' },
]

export const PINNED_PROJECTS = [
  { id: 'pp1', label: 'Hospital Upgrade', status: 'critical' as ObjectStatus },
  { id: 'pp2', label: 'Digital Identity', status: 'at-risk' as ObjectStatus },
  { id: 'pp3', label: 'Curriculum Reform', status: 'healthy' as ObjectStatus },
]

export const WORKSPACE_HEALTH = {
  overall: 'at-risk' as ObjectStatus,
  healthy: 7,
  atRisk: 4,
  critical: 3,
}

export const ANNOUNCEMENT = {
  title: 'Quarterly reporting opens Monday',
  body: 'Q2 reports are due by 30 June. Draft early to allow time for approval.',
}
