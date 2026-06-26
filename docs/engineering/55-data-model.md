# 55 — Data Model

## Philosophy

The data model should mirror **reality**, not UI.

The database should understand relationships. The interface simply visualizes them.

---

## Primary Objects

| Object | Description |
|--------|-------------|
| `Workspace` | Top-level container |
| `Portfolio` | Strategic programme grouping |
| `PriorityArea` | National strategic objective |
| `Project` | Programme coordination unit |
| `Intervention` | Delivery execution workspace |
| `Activity` | Individual work unit |
| `Milestone` | Delivery outcome gate |
| `Target` | Measurable KPI |
| `Budget` | Financial resource |
| `Report` | Generated delivery summary |
| `File` | Supporting evidence |
| `Comment` | Contextual discussion |
| `Decision` | Formal recorded decision |
| `Notification` | Change signal |
| `User` | Platform user |
| `Team` | Organizational unit |

---

## Shared Metadata (All Objects)

Every object inherits these fields:

```typescript
interface BaseObject {
  id: string;              // UUID
  title: string;           // Human-readable name
  createdBy: string;       // User ID
  createdAt: DateTime;     // ISO timestamp
  updatedAt: DateTime;     // ISO timestamp
  ownerId: string;         // User ID
  status: Status;          // Lifecycle state
  permissions: Permission[]; // Access control
  history: HistoryEntry[]; // Immutable audit log
  tags: string[];          // Freeform labels
  relationships: Relationship[]; // Connected objects
}
```

---

## Relationship Model

Prefer **relational references** over nested structures.

```typescript
// Correct — reference by ID
interface Activity {
  interventionId: string;
  ownerId: string;
  milestoneId: string | null;
  projectId: string;
  priorityAreaId: string;
}

// Incorrect — embedded objects
interface Activity {
  intervention: Intervention; // Don't embed full objects
  project: Project;
}
```

---

## Core Object Schemas

### Workspace
```typescript
interface Workspace {
  id: string;
  name: string;
  logo: string | null;
  timezone: string;
  currency: string;
  language: string;
  dateFormat: string;
  accentColor: string | null;
  createdAt: DateTime;
  updatedAt: DateTime;
  status: 'active' | 'readonly' | 'archived' | 'suspended';
  memberIds: string[];
  teamIds: string[];
}
```

### Portfolio
```typescript
interface Portfolio {
  id: string;
  workspaceId: string;
  name: string;
  description: string;
  ownerId: string;
  status: PortfolioStatus;
  startDate: Date;
  endDate: Date | null;
  createdAt: DateTime;
  updatedAt: DateTime;
}
```

### Project
```typescript
interface Project {
  id: string;
  workspaceId: string;
  portfolioId: string;
  priorityAreaId: string;
  name: string;
  description: string;
  referenceNumber: string;
  directorId: string;
  managerId: string;
  executiveSponsorId: string;
  startDate: Date;
  endDate: Date | null;
  status: ProjectStatus;
  phase: string;
  healthScore: number | null;
  deliveryConfidence: number | null;
  createdAt: DateTime;
  updatedAt: DateTime;
}
```

### Intervention
```typescript
interface Intervention {
  id: string;
  workspaceId: string;
  projectId: string;
  priorityAreaId: string;
  name: string;
  description: string;
  objective: string;
  referenceNumber: string;
  leadId: string;
  teamIds: string[];
  startDate: Date;
  targetCompletion: Date;
  currentPhase: string;
  nextReview: Date | null;
  status: InterventionStatus;
  healthScore: number | null;
  deliveryConfidence: number | null;
  riskScore: number | null;
  createdAt: DateTime;
  updatedAt: DateTime;
}
```

### Activity
```typescript
interface Activity {
  id: string;
  workspaceId: string;
  interventionId: string;
  projectId: string;
  priorityAreaId: string;
  milestoneId: string | null;
  targetId: string | null;
  title: string;
  description: string;
  referenceNumber: string;
  ownerId: string;
  contributorIds: string[];
  reviewerId: string | null;
  approverId: string | null;
  startDate: Date | null;
  dueDate: Date;
  priority: 'critical' | 'high' | 'normal' | 'low';
  status: ActivityStatus;
  completionPercentage: number;
  health: HealthState;
  blockers: string[];
  dependencyIds: string[];
  createdAt: DateTime;
  updatedAt: DateTime;
}
```

### Milestone
```typescript
interface Milestone {
  id: string;
  workspaceId: string;
  interventionId: string;
  projectId: string;
  name: string;
  description: string;
  outcome: string;
  referenceNumber: string;
  ownerId: string;
  reviewerId: string | null;
  approverId: string | null;
  targetDate: Date;
  achievedDate: Date | null;
  reviewDate: Date | null;
  approvalDate: Date | null;
  status: MilestoneStatus;
  confidence: number | null;
  evidenceIds: string[];
  dependencyIds: string[];
  createdAt: DateTime;
  updatedAt: DateTime;
}
```

---

## Audit Model

Every mutation creates an immutable history entry:

```typescript
interface HistoryEntry {
  id: string;
  objectId: string;
  objectType: string;
  action: 'created' | 'updated' | 'assigned' | 'completed' | 'approved' | 'archived';
  userId: string;
  timestamp: DateTime;
  previousValue: Record<string, unknown> | null;
  newValue: Record<string, unknown>;
  reason: string | null;
}
```

**History is append-only. Never overwrite.**

---

## Status Enums

```typescript
type ActivityStatus =
  | 'not_started'
  | 'planned'
  | 'assigned'
  | 'in_progress'
  | 'waiting'
  | 'blocked'
  | 'at_risk'
  | 'in_review'
  | 'completed'
  | 'verified'
  | 'archived';

type HealthState =
  | 'excellent'
  | 'healthy'
  | 'needs_attention'
  | 'at_risk'
  | 'critical'
  | 'archived';

type MilestoneStatus =
  | 'draft'
  | 'planned'
  | 'active'
  | 'ready_for_review'
  | 'approved'
  | 'achieved'
  | 'archived';
```

---

## Data Integrity Rules

These rules must be enforced at the database level:

```
An Activity MUST belong to an Intervention
An Intervention MUST belong to a Project
A Project MUST belong to a Priority Area
A Priority Area MUST belong to a Portfolio
A Portfolio MUST belong to a Workspace
```

Enforce via foreign key constraints or equivalent validation layer.

---

## Indexing Strategy

Index for expected query patterns:

| Table | Index |
|-------|-------|
| activities | `interventionId, status, dueDate` |
| activities | `ownerId, status` |
| interventions | `projectId, status` |
| projects | `priorityAreaId, status` |
| notifications | `userId, read, createdAt` |
| files | `objectId, objectType` |
| history | `objectId, timestamp` |
| comments | `objectId, objectType, createdAt` |
