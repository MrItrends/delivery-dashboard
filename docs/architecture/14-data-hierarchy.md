# 14 — Data Hierarchy

## Philosophy

The platform stores one connected graph of delivery information. Not disconnected databases.

Every object contributes to delivery. Every relationship contributes to understanding.

The hierarchy should support navigation, permissions, reporting and analytics simultaneously.

---

## Hierarchy Model

```
Workspace
  └── Portfolio
        └── Priority Area
              └── Project
                    └── Intervention
                          └── Activity
                                └── Update
                                      └── Comment
                                      └── Audit History
```

Updates and Comments are at the bottom. They **enrich** delivery. They do not **define** it.

---

## Layer Definitions

### Strategic Layer
Changes infrequently. Defines direction.

**Objects:** Workspace, Portfolio, Priority Area

---

### Planning Layer
Converts strategy into programmes.

**Objects:** Projects, Interventions, Budget, Targets, Milestones

---

### Execution Layer
Converts planning into work. Changes daily.

**Objects:** Activities, Assignments, Dependencies, Files, Updates

---

### Communication Layer
Surrounds execution. Always references work — never exists independently.

**Objects:** Comments, Mentions, Notifications, Approvals, History

---

### Intelligence Layer
Transforms operational data into insight. Users consume intelligence — they do not edit it.

**Objects:** Reports, Dashboards, Performance, Analytics, Forecasts, Health Scores

---

## Object Lifecycle

Every object moves through the same lifecycle:

```
Draft → Active → In Review → Approved → Completed → Archived
```

Different objects may skip stages. The philosophy remains consistent.

---

## Archiving

Nothing is deleted. Objects become **archived**.

Archived objects remain:
- Searchable
- Reportable
- Auditable
- Recoverable

Government delivery requires permanent records. Deletion should be extremely rare.

---

## Audit Hierarchy

Every object generates history. History belongs to the object — not the user.

History records: Created, Updated, Assigned, Completed, Approved, Archived

**History cannot be edited.**

---

## Shared Metadata

Every object shares common metadata:

| Field | Description |
|-------|-------------|
| Unique ID | System-generated identifier |
| Title | Human-readable name |
| Owner | Single accountable person |
| Created By | User who created the object |
| Created Date | ISO timestamp |
| Updated Date | ISO timestamp of last change |
| Status | Current lifecycle state |
| Tags | Freeform categorization |
| Permissions | Access control |
| History | Immutable audit log |
| Relationships | Connected objects |

---

## Status Hierarchy

Status communicates health using semantic values — not arbitrary colours.

**Standard status values:**
- Not Started
- Planned
- In Progress
- Blocked
- At Risk
- Completed
- Archived

Status names should remain consistent throughout the application.

---

## Reporting Hierarchy

Reports aggregate upward:

```
Activities → Interventions → Projects → Priority Areas → Portfolios → Executive Dashboards
```

Information should never flow in reverse. Executives should not manually edit operational data.

---

## Data Philosophy

> Every piece of information entered into the platform should become useful in at least **three places**.

**Example:** Updating an Activity should automatically influence:
- Project Progress
- Milestone Completion
- Executive Dashboard
- Performance Metrics
- Reports
- Activity Timeline
- Notifications (where applicable)

**Users should never have to enter the same information twice.**
