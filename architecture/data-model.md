# Data Model

## Philosophy

The data model mirrors **reality**, not UI. The database understands relationships. The interface simply visualizes them.

---

## Primary Objects

| Object | Table | Description |
|--------|-------|-------------|
| Workspace | `workspaces` | Top-level container |
| Portfolio | `portfolios` | Strategic programme grouping |
| PriorityArea | `priority_areas` | National strategic objective |
| Project | `projects` | Programme governance unit |
| Intervention | `interventions` | Delivery execution workspace |
| Activity | `activities` | Individual work unit |
| Milestone | `milestones` | Delivery outcome gate |
| Target | `targets` | Measurable KPI |
| Budget | `budgets` | Financial resource |
| Report | `reports` | Generated delivery summary |
| File | `files` | Supporting evidence |
| Comment | `comments` | Contextual discussion |
| Decision | `decisions` | Formal recorded decision |
| Notification | `notifications` | Change signal |
| User | `users` | Platform user |
| Team | `teams` | Organizational unit |

---

## Shared Metadata (All Objects)

Every object inherits:

```typescript
interface BaseObject {
  id: string;              // UUID
  title: string;           // Human-readable name
  createdBy: string;       // User ID
  createdAt: DateTime;     // ISO timestamp
  updatedAt: DateTime;     // ISO timestamp
  ownerId: string;         // Single accountable user
  status: Status;          // Lifecycle state
  permissions: Permission[];
  tags: string[];
}
```

---

## Core Object Schemas

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
  ownerId: string;
  reviewerId: string | null;
  approverId: string | null;
  targetDate: Date;
  achievedDate: Date | null;
  status: MilestoneStatus;
  confidence: number | null;
  evidenceIds: string[];
  dependencyIds: string[];
  createdAt: DateTime;
  updatedAt: DateTime;
}
```

---

## Relationship Model

Prefer **relational references** over nested structures:

```typescript
// Correct
interface Activity {
  interventionId: string;  // reference
  ownerId: string;         // reference
}

// Wrong
interface Activity {
  intervention: Intervention;  // embedded — creates sync problems
}
```

---

## Audit Model

Every mutation creates an **immutable** history entry:

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

History is append-only. Never overwrite.

---

## Status Enums

```typescript
type ActivityStatus =
  | 'not_started' | 'planned' | 'assigned' | 'in_progress'
  | 'waiting' | 'blocked' | 'at_risk' | 'in_review'
  | 'completed' | 'verified' | 'archived';

type HealthState =
  | 'excellent' | 'healthy' | 'needs_attention'
  | 'at_risk' | 'critical' | 'archived';

type MilestoneStatus =
  | 'draft' | 'planned' | 'active' | 'ready_for_review'
  | 'approved' | 'achieved' | 'archived';
```

---

## Data Integrity Rules

Enforced at database level via foreign key constraints:

```sql
-- Activities must have an intervention
ALTER TABLE activities
  ADD CONSTRAINT fk_activity_intervention
  FOREIGN KEY (intervention_id) REFERENCES interventions(id);

-- Interventions must have a project
ALTER TABLE interventions
  ADD CONSTRAINT fk_intervention_project
  FOREIGN KEY (project_id) REFERENCES projects(id);

-- (And so on up the hierarchy)
```

---

## Indexing Strategy

| Table | Index |
|-------|-------|
| activities | `(intervention_id, status, due_date)` |
| activities | `(owner_id, status)` |
| interventions | `(project_id, status)` |
| projects | `(priority_area_id, status)` |
| notifications | `(user_id, read, created_at)` |
| files | `(object_id, object_type)` |
| history | `(object_id, timestamp)` |
| comments | `(object_id, object_type, created_at)` |

---

## Soft Delete Policy

Nothing is hard-deleted. Archive instead:

```typescript
// Wrong
DELETE FROM activities WHERE id = $1;

// Correct
UPDATE activities
SET status = 'archived', archived_at = NOW(), archived_by = $userId
WHERE id = $1;
```

Archived records remain queryable for reports and audit purposes.
