// =============================================================================
// Mock data for the Intervention Workspace — the operational heart.
// =============================================================================

import type { ObjectStatus } from '@/components/primitives/StatusChip'
import type { SummaryMetric, FeedEntry } from '@/lib/mock/workspace'

export { TIMELINE_MONTHS } from '@/lib/mock/portfolio'

export type ActivityPriority = 'low' | 'medium' | 'high' | 'critical'

export const INTERVENTION = {
  name: 'Structural Works',
  objective: 'Complete the Ward 4 structural frame and foundations to enable M&E and fit-out by Q4.',
  owner: 'Ahmed Yusuf',
  coLead: 'Sarah Evans',
  priorityArea: 'Hospital Estate Renewal',
  project: 'Ward 4 Reconstruction',
  status: 'blocked' as ObjectStatus,
  health: 'critical' as ObjectStatus,
  budgetHealth: 'at-risk' as ObjectStatus,
  dueDate: '30 Sep 2026',
  team: ['Ahmed Yusuf', 'Sarah Evans', 'Marcus Johnson', 'Priya Sharma', 'James Chen'],
  presence: ['Ahmed Yusuf', 'Sarah Evans', 'Priya Sharma'],
  lastUpdate: '12m ago',
}

export const SUMMARY: SummaryMetric[] = [
  { id: 'completion', label: 'Completion', value: 34, tone: 'warning' },
  { id: 'open', label: 'Open activities', value: 12, tone: 'neutral' },
  { id: 'completed', label: 'Completed', value: 6, tone: 'healthy' },
  { id: 'overdue', label: 'Overdue', value: 3, tone: 'critical' },
  { id: 'milestones', label: 'Milestones due', value: 2, tone: 'warning' },
  { id: 'risks', label: 'Open risks', value: 3, tone: 'critical' },
]

// ---- Activities (primary working surface) --------------------------------
export interface ActivityRow {
  id: string
  name: string
  owner: string
  status: ObjectStatus
  priority: ActivityPriority
  dueLabel: string
  overdue?: boolean
  progress: number
  dependencies: number
  evidence: number
  comments: number
  lastUpdated: string
}

export const ACTIVITIES: ActivityRow[] = [
  { id: 'ac1', name: 'Confirm steel delivery schedule', owner: 'Ahmed Yusuf', status: 'blocked', priority: 'critical', dueLabel: 'Overdue · 2d', overdue: true, progress: 20, dependencies: 2, evidence: 1, comments: 4, lastUpdated: '12m ago' },
  { id: 'ac2', name: 'Pour foundation slab — Zone A', owner: 'Marcus Johnson', status: 'active', priority: 'high', dueLabel: 'Today', progress: 65, dependencies: 1, evidence: 2, comments: 2, lastUpdated: '1h ago' },
  { id: 'ac3', name: 'Erect frame — Grid 1–4', owner: 'Marcus Johnson', status: 'active', priority: 'high', dueLabel: 'In 3 days', progress: 40, dependencies: 1, evidence: 0, comments: 1, lastUpdated: '3h ago' },
  { id: 'ac4', name: 'Structural engineer sign-off', owner: 'Priya Sharma', status: 'planned', priority: 'medium', dueLabel: 'In 6 days', progress: 0, dependencies: 3, evidence: 0, comments: 0, lastUpdated: 'Yesterday' },
  { id: 'ac5', name: 'Update H&S method statement', owner: 'Sarah Evans', status: 'active', priority: 'medium', dueLabel: 'In 4 days', progress: 50, dependencies: 0, evidence: 1, comments: 3, lastUpdated: 'Yesterday' },
  { id: 'ac6', name: 'Site survey — Zone B', owner: 'James Chen', status: 'complete', priority: 'low', dueLabel: 'Done', progress: 100, dependencies: 0, evidence: 3, comments: 1, lastUpdated: '2 days ago' },
  { id: 'ac7', name: 'Procure rebar — Phase 2', owner: 'Ahmed Yusuf', status: 'at-risk', priority: 'high', dueLabel: 'In 2 days', progress: 30, dependencies: 1, evidence: 0, comments: 2, lastUpdated: '2 days ago' },
]

export const ACTIVITY_VIEWS = [
  { id: 'all', label: 'All' },
  { id: 'mine', label: 'Assigned to me' },
  { id: 'blocked', label: 'Blocked' },
  { id: 'overdue', label: 'Overdue' },
  { id: 'done', label: 'Completed' },
]

export const ACTIVITY_STATUSES: ObjectStatus[] = ['planned', 'active', 'blocked', 'at-risk', 'complete']

// ---- Collaboration stream -------------------------------------------------
export interface StreamComment {
  id: string
  kind: 'comment'
  actor: string
  time: string
  text: string
  reactions: number
  reacted?: boolean
  resolved?: boolean
  pinned?: boolean
}
export interface StreamEvent {
  id: string
  kind: 'event'
  actor: string
  action: string
  target: string
  context: string
  time: string
  eventKind: FeedEntry['kind']
}
export type StreamEntry = StreamComment | StreamEvent

export const STREAM: StreamEntry[] = [
  { id: 's1', kind: 'comment', actor: 'Ahmed Yusuf', time: '12m ago', text: 'Steel delivery slipped again. @Sarah Evans flagging this as blocked until we confirm the new date.', reactions: 2, pinned: true },
  { id: 's2', kind: 'event', actor: 'Ahmed Yusuf', action: 'changed status to Blocked on', target: 'Confirm steel delivery schedule', context: '', time: '12m ago', eventKind: 'status' },
  { id: 's3', kind: 'comment', actor: 'Sarah Evans', time: '8m ago', text: 'Chasing the supplier now. Will escalate to the contingency supplier if no date by EOD.', reactions: 1 },
  { id: 's4', kind: 'event', actor: 'Marcus Johnson', action: 'uploaded evidence to', target: 'Pour foundation slab — Zone A', context: 'pour-record.pdf', time: '1h ago', eventKind: 'evidence' },
  { id: 's5', kind: 'comment', actor: 'Priya Sharma', time: '2h ago', text: 'Engineer sign-off booked for next week — dependent on frame completion.', reactions: 0, resolved: true },
]

// ---- Milestones -----------------------------------------------------------
export interface MilestoneRow {
  id: string
  name: string
  owner: string
  due: string
  status: ObjectStatus
  group: 'Upcoming' | 'Delayed' | 'Completed'
  dependency?: string
}

export const MILESTONES: MilestoneRow[] = [
  { id: 'ms1', name: 'Foundations complete', owner: 'Marcus Johnson', due: '15 Jul', status: 'at-risk', group: 'Delayed', dependency: 'Steel delivery' },
  { id: 'ms2', name: 'Frame topped out', owner: 'Marcus Johnson', due: '30 Aug', status: 'planned', group: 'Upcoming' },
  { id: 'ms3', name: 'Structural sign-off', owner: 'Priya Sharma', due: '20 Sep', status: 'planned', group: 'Upcoming', dependency: 'Frame topped out' },
  { id: 'ms4', name: 'Site mobilisation', owner: 'Ahmed Yusuf', due: '12 Apr', status: 'complete', group: 'Completed' },
]

// ---- Evidence & documents -------------------------------------------------
export type EvidenceType = 'pdf' | 'image' | 'doc' | 'sheet' | 'link'
export interface EvidenceItem {
  id: string
  name: string
  type: EvidenceType
  version: number
  linkedActivity: string
  uploadedBy: string
  time: string
  size: string
}

export const EVIDENCE: EvidenceItem[] = [
  { id: 'ev1', name: 'Foundation pour record', type: 'pdf', version: 3, linkedActivity: 'Pour foundation slab — Zone A', uploadedBy: 'Marcus Johnson', time: '1h ago', size: '2.4 MB' },
  { id: 'ev2', name: 'Site survey photos', type: 'image', version: 1, linkedActivity: 'Site survey — Zone B', uploadedBy: 'James Chen', time: '2 days ago', size: '8.1 MB' },
  { id: 'ev3', name: 'H&S method statement', type: 'doc', version: 2, linkedActivity: 'Update H&S method statement', uploadedBy: 'Sarah Evans', time: 'Yesterday', size: '640 KB' },
  { id: 'ev4', name: 'Structural calcs', type: 'sheet', version: 1, linkedActivity: 'Structural engineer sign-off', uploadedBy: 'Priya Sharma', time: '3 days ago', size: '1.2 MB' },
  { id: 'ev5', name: 'Steel supplier portal', type: 'link', version: 1, linkedActivity: 'Confirm steel delivery schedule', uploadedBy: 'Ahmed Yusuf', time: '4 days ago', size: '—' },
]

// ---- Dependencies ---------------------------------------------------------
export interface DependencyRow {
  id: string
  from: string
  relationship: 'blocks' | 'blocked by' | 'depends on'
  to: string
  toType: 'Activity' | 'Milestone' | 'Intervention' | 'Project'
  status: ObjectStatus
  critical: boolean
}

export const DEPENDENCIES: DependencyRow[] = [
  { id: 'dp1', from: 'Pour foundation slab — Zone A', relationship: 'blocked by', to: 'Confirm steel delivery schedule', toType: 'Activity', status: 'blocked', critical: true },
  { id: 'dp2', from: 'Erect frame — Grid 1–4', relationship: 'depends on', to: 'Pour foundation slab — Zone A', toType: 'Activity', status: 'active', critical: true },
  { id: 'dp3', from: 'Structural sign-off', relationship: 'depends on', to: 'Frame topped out', toType: 'Milestone', status: 'planned', critical: false },
  { id: 'dp4', from: 'M&E Installation', relationship: 'blocked by', to: 'Structural sign-off', toType: 'Intervention', status: 'planned', critical: true },
]

// ---- Recent updates -------------------------------------------------------
export const RECENT_UPDATES: FeedEntry[] = [
  { id: 'u1', actor: 'Ahmed Yusuf', action: 'changed status to Blocked on', target: 'Confirm steel delivery', context: 'awaiting supplier', time: '12m ago', group: 'Today', kind: 'status' },
  { id: 'u2', actor: 'Marcus Johnson', action: 'uploaded evidence to', target: 'Pour foundation slab', context: 'pour-record.pdf', time: '1h ago', group: 'Today', kind: 'evidence' },
  { id: 'u3', actor: 'Sarah Evans', action: 'commented on', target: 'Confirm steel delivery', context: 'escalation plan', time: '8m ago', group: 'Today', kind: 'comment' },
  { id: 'u4', actor: 'James Chen', action: 'completed', target: 'Site survey — Zone B', context: '', time: '2 days ago', group: 'Earlier', kind: 'status' },
  { id: 'u5', actor: 'You', action: 'approved budget on', target: 'Phase 2 rebar', context: '£240k', time: '2 days ago', group: 'Earlier', kind: 'approval' },
]

// ---- Supporting context ---------------------------------------------------
export const RECENT_REPORTS = [{ id: 'r1', label: 'Structural Works weekly', context: '3 days ago' }]
export const LINKED_DECISIONS = [{ id: 'd1', label: 'Onboard contingency steel supplier', context: 'Pending' }]
export const UPCOMING_REVIEWS = [{ id: 'rev1', label: 'Structural review', context: '28 Jun · 11:00' }]
export const TEAM_MEMBERS = [
  { id: 't1', label: 'Ahmed Yusuf', context: 'Lead' },
  { id: 't2', label: 'Sarah Evans', context: 'Co-lead' },
  { id: 't3', label: 'Marcus Johnson', context: 'Delivery' },
  { id: 't4', label: 'Priya Sharma', context: 'Engineer' },
]
