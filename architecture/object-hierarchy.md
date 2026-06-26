# Object Hierarchy

## The Core Hierarchy

```
Workspace
  └── Portfolio
        └── Priority Area
              └── Project
                    └── Intervention  ← Where delivery happens
                          ├── Activity
                          │     └── Update
                          │           └── Comment
                          ├── Milestone
                          ├── Target
                          ├── Budget
                          ├── Files
                          └── Discussion
```

Every object in the platform belongs somewhere within this hierarchy. Nothing exists in isolation.

---

## Why This Hierarchy

Most project management software follows:
```
Project → Task → Subtask
```

Government delivery requires:
```
Priority Area → Project → Intervention → Activity → Update
```

The **Intervention** is the equivalent of a "workspace" inside a project. It is where delivery actually happens. Projects govern. Interventions execute.

---

## Object Definitions

| Object | Role | Belongs To |
|--------|------|-----------|
| Workspace | Digital headquarters for an organisation | Top level |
| Portfolio | Groups strategic programmes | Workspace |
| Priority Area | Major government objective | Portfolio |
| Project | Programme governance layer | Priority Area |
| Intervention | Collaborative delivery workspace | Project |
| Activity | Individual piece of work | Intervention |
| Update | Progress communication | Activity |
| Comment | Contextual discussion | Any object |
| Milestone | Delivery outcome gate | Intervention |
| Target | Measurable KPI | Project / Intervention |
| Budget | Financial resource | Project / Intervention |
| File | Supporting evidence | Any object |
| Report | Generated summary | Project / Portfolio |
| Decision | Formal recorded decision | Intervention / Project |
| Notification | Change signal | Any object |

---

## Complete Object Model

```
Workspace
│
├── Teams
├── Users
│
└── Portfolio
    └── Priority Areas
        └── Projects
            ├── Reports
            └── Interventions
                ├── Milestones
                ├── Activities
                │   ├── Updates
                │   ├── Comments
                │   └── Files
                ├── Targets
                ├── Budget
                ├── Files
                ├── Comments
                ├── Decisions
                └── Activity History
```

---

## Relationship Rules

Objects reference one another. They never duplicate one another.

```typescript
// Correct — reference by ID
interface Activity {
  interventionId: string;
  ownerId: string;
  milestoneId: string | null;
}

// Wrong — embedded objects
interface Activity {
  intervention: Intervention; // creates duplication
}
```

---

## Data Integrity Rules (Absolute)

These rules must be enforced at the database level:

```
An Activity CANNOT exist without an Intervention.
An Intervention CANNOT exist without a Project.
A Project CANNOT exist without a Priority Area.
A Priority Area CANNOT exist without a Portfolio.
A Portfolio CANNOT exist without a Workspace.
```

This guarantees a complete delivery chain from strategy to execution.

---

## Shared Metadata

Every object inherits:

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Unique identifier |
| `title` | string | Human-readable name |
| `createdBy` | User ID | Who created it |
| `createdAt` | DateTime | Creation timestamp |
| `updatedAt` | DateTime | Last modification |
| `ownerId` | User ID | Single accountable person |
| `status` | enum | Current lifecycle state |
| `tags` | string[] | Freeform labels |
| `permissions` | Permission[] | Access control |
| `history` | HistoryEntry[] | Immutable audit log |

---

## Object Lifecycle

Every object moves through:

```
Draft → Active → In Review → Approved → Completed → Archived
```

Different objects may skip stages. The philosophy remains consistent.

**Nothing is deleted. Objects become archived.**

---

## Archiving Philosophy

Archived objects remain:
- Searchable
- Reportable
- Auditable
- Recoverable

Government delivery requires permanent records. Hard deletion should never occur.

---

## Reporting Upward

Data always aggregates upward:

```
Activities → Interventions → Projects → Priority Areas → Portfolios → Executive Dashboard
```

Information never flows in reverse. Executives do not edit operational data.
