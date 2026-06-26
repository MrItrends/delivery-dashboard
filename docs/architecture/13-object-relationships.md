# 13 — Object Relationships

## Purpose

The Delivery Dashboard is built on **relationships** rather than isolated modules. Every object should understand:

- what it belongs to
- what belongs to it
- who owns it
- what it influences
- what depends on it

---

## Relationship Philosophy

Objects should never duplicate information. Instead, they **reference** one another.

An Activity should never contain a copy of the Project. It should reference the Project. The Project becomes the source of truth.

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
            ├── Interventions
            │   ├── Milestones
            │   ├── Activities
            │   ├── Targets
            │   ├── Budget
            │   ├── Files
            │   ├── Comments
            │   └── Activity History
            └── Reports
```

---

## Object Relationship Rules

### Workspace
Owns: Users, Teams, Portfolio, Settings, Permissions, Notifications, Reports

Everything inside the application belongs to exactly one Workspace.

### Portfolio
Contains: Priority Areas, Portfolio Reports, Portfolio KPIs, Portfolio Funding, Portfolio Analytics

Portfolios never contain Activities directly.

### Priority Area
Contains: Projects, Strategic Targets, Regional Performance, Funding Allocation

Priority Areas represent strategic focus. They should remain relatively stable over time.

### Project
Owns: Interventions, Budget, Timeline, Project Team, Project Risks, Project Documents, Project Reports

Projects never own individual comments — comments belong to specific objects inside projects.

### Intervention
Owns: Activities, Milestones, Targets, Deliverables, Evidence, Discussion, Status

Interventions become the **primary collaboration space**.

### Milestone
Belongs to: Interventions

Contains: Completion Status, Approval, Evidence, Completion Date, Review Notes

Milestones never contain Activities. Activities **produce** Milestones.

### Activity
Connects to: Owner, Intervention, Due Date, Priority, Comments, Files, History, Dependencies

Activities never exist independently.

### Target
Belongs to: Projects, Interventions, Priority Areas

Connects directly to Performance reporting.

### Budget
Belongs to: Projects

References: Funding Sources, Expenditure, Forecast, Funding Gap, Approval History, Budget Changes

Budgets influence reports. Reports never own budgets.

### Report
Generated, not authored. Aggregates from: Projects, Activities, Budgets, Milestones, Targets, Performance

Reports should never become editable databases.

### File
Belongs to objects. Every uploaded file has context.

✓ Correct: `Project → Files`
✗ Incorrect: `Workspace → Random Documents`

### Comment
Belongs to objects, never pages.

### Notification
Never contains information. References information. Clicking always returns users to the originating object.

---

## Relationship Rules

Every object must answer:
1. Who owns me?
2. Who created me?
3. What do I belong to?
4. What belongs to me?
5. Who depends on me?
6. What happens if I am archived?

---

## Data Integrity Rules (Absolute)

```
An Activity cannot exist without an Intervention.
An Intervention cannot exist without a Project.
A Project cannot exist without a Priority Area.
A Priority Area cannot exist without a Portfolio.
A Portfolio cannot exist without a Workspace.
```

This guarantees a complete delivery chain from strategy to execution.
