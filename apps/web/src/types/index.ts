// =============================================================================
// SHARED DOMAIN TYPES
// These mirror the object hierarchy: Workspace → Portfolio → Priority Area →
// Project → Intervention → Activity → Milestone → Target → Budget
// =============================================================================

export type ObjectStatus =
  | 'healthy'
  | 'at-risk'
  | 'critical'
  | 'planned'
  | 'active'
  | 'blocked'
  | 'complete'
  | 'approved'
  | 'draft'
  | 'archived'
  | 'cancelled'

export type Priority = 'low' | 'medium' | 'high' | 'critical'

export type UserRole =
  | 'admin'
  | 'portfolio-manager'
  | 'project-manager'
  | 'contributor'
  | 'observer'

// ---------------------------------------------------------------------------
// Shared base — every object extends this
// ---------------------------------------------------------------------------
export interface BaseObject {
  id: string
  title: string
  createdBy: string
  createdAt: string   // ISO 8601
  updatedAt: string   // ISO 8601
  ownerId: string
  status: ObjectStatus
  tags: string[]
}

// ---------------------------------------------------------------------------
// User
// ---------------------------------------------------------------------------
export interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string
  role: UserRole
  lastActiveAt?: string
}

// ---------------------------------------------------------------------------
// Workspace
// ---------------------------------------------------------------------------
export interface Workspace extends BaseObject {
  logoUrl?: string
  memberCount: number
  portfolioCount: number
}

// ---------------------------------------------------------------------------
// Portfolio
// ---------------------------------------------------------------------------
export interface Portfolio extends BaseObject {
  workspaceId: string
  description?: string
  ownerId: string
  priorityAreaCount: number
  budget?: BudgetSummary
}

// ---------------------------------------------------------------------------
// Priority Area
// ---------------------------------------------------------------------------
export interface PriorityArea extends BaseObject {
  portfolioId: string
  description?: string
  projectCount: number
  targets: TargetSummary[]
}

// ---------------------------------------------------------------------------
// Project
// ---------------------------------------------------------------------------
export interface Project extends BaseObject {
  priorityAreaId: string
  description?: string
  interventionCount: number
  budget?: BudgetSummary
  milestoneCount: number
  completedMilestoneCount: number
}

// ---------------------------------------------------------------------------
// Intervention — the heart of the product
// ---------------------------------------------------------------------------
export interface Intervention extends BaseObject {
  projectId: string
  description?: string
  startDate?: string
  endDate?: string
  ownerId: string
  teamIds: string[]
  activityCount: number
  completedActivityCount: number
  blockedActivityCount: number
  milestoneCount: number
  completedMilestoneCount: number
  budget?: BudgetSummary
  targets: TargetSummary[]
}

// ---------------------------------------------------------------------------
// Activity
// ---------------------------------------------------------------------------
export interface Activity extends BaseObject {
  interventionId: string
  description?: string
  priority: Priority
  dueDate?: string
  startDate?: string
  assigneeId?: string
  estimatedHours?: number
  actualHours?: number
  dependsOn: string[]   // activity IDs this blocks on
  blocks: string[]      // activity IDs this blocks
  evidenceCount: number
  commentCount: number
  checklistTotal: number
  checklistCompleted: number
}

// ---------------------------------------------------------------------------
// Milestone
// ---------------------------------------------------------------------------
export interface Milestone extends BaseObject {
  interventionId: string
  dueDate: string
  evidenceRequired: boolean
  evidenceCount: number
  approverId?: string
  approvedAt?: string
  approvedBy?: string
  dependsOnActivities: string[]
}

// ---------------------------------------------------------------------------
// Target / KPI
// ---------------------------------------------------------------------------
export interface Target extends BaseObject {
  parentId: string     // intervention, project, or priority area ID
  parentType: 'intervention' | 'project' | 'priority-area'
  description?: string
  targetValue: number
  currentValue: number
  unit: string
  direction: 'increase' | 'decrease' | 'maintain'
  dueDate?: string
  trend: 'up' | 'down' | 'flat'
}

export interface TargetSummary {
  id: string
  title: string
  currentValue: number
  targetValue: number
  unit: string
  status: ObjectStatus
  trend: 'up' | 'down' | 'flat'
}

// ---------------------------------------------------------------------------
// Budget
// ---------------------------------------------------------------------------
export interface BudgetSummary {
  approved: number
  committed: number
  spent: number
  remaining: number
  forecastOutturn: number
  currency: string
  status: ObjectStatus
}

// ---------------------------------------------------------------------------
// Activity Feed / History entry
// ---------------------------------------------------------------------------
export interface HistoryEntry {
  id: string
  objectId: string
  objectType: string
  actorId: string
  actorName: string
  actorAvatarUrl?: string
  action: string
  field?: string
  previousValue?: string
  newValue?: string
  createdAt: string
}

// ---------------------------------------------------------------------------
// Comment
// ---------------------------------------------------------------------------
export interface Comment {
  id: string
  objectId: string
  objectType: string
  authorId: string
  authorName: string
  authorAvatarUrl?: string
  content: string
  createdAt: string
  updatedAt: string
  resolved: boolean
  replies: Comment[]
  mentions: string[]
}

// ---------------------------------------------------------------------------
// File / Evidence
// ---------------------------------------------------------------------------
export interface FileRecord {
  id: string
  name: string
  size: number
  mimeType: string
  url: string
  thumbnailUrl?: string
  uploadedBy: string
  uploadedAt: string
  version: number
  parentId: string
  parentType: string
  category: 'evidence' | 'report' | 'plan' | 'financial' | 'other'
  approved: boolean
}

// ---------------------------------------------------------------------------
// Notification
// ---------------------------------------------------------------------------
export interface Notification {
  id: string
  type:
    | 'approval-required'
    | 'assigned'
    | 'mentioned'
    | 'deadline'
    | 'status-change'
    | 'comment'
    | 'file'
    | 'completed'
  objectId: string
  objectType: string
  objectTitle: string
  actorName?: string
  message: string
  read: boolean
  createdAt: string
  actionUrl: string
}
