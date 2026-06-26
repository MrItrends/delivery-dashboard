# Priority Areas

## Purpose

Priority Areas represent the government's **highest-level strategic objectives**. They are long-term policy outcomes that multiple projects and interventions collectively contribute toward.

> Without Priority Areas, the platform becomes a project tracker. With Priority Areas, it becomes a **government delivery platform**.

---

## User Goals

| User | Goal |
|------|------|
| Executives | Understand national delivery |
| Portfolio Managers | Coordinate programmes |
| Project Managers | Understand strategic context |
| Delivery Teams | Understand why their work matters |

---

## Core Philosophy

Priority Areas are **strategic containers**, not operational workspaces. They should rarely change.

Examples: Healthcare, Education, Infrastructure, Agriculture, Economic Development, Public Safety, Digital Government, Climate & Environment.

---

## Object Anatomy

```
Priority Area
├── Strategic Objective
├── Executive Sponsor
├── Projects
├── Budget Summary
├── KPI Summary
├── Performance Score
├── Risks
├── Reports
├── Files
└── Activity Feed
```

Activities do not belong directly to Priority Areas. They belong much lower in the hierarchy. Priority Areas **summarize** execution rather than manage it.

---

## Priority Area Health

Calculated from: Project Health, Budget Performance, Milestone Completion, KPI Achievement, Open Risks, Overdue Activities, Delivery Velocity.

**Health States:** Excellent → Healthy → Needs Attention → At Risk → Critical → Archived

---

## Lifecycle

```
Planning → Approved → Active Delivery → Review → Completed → Archived
```

Most Priority Areas remain active for **years**.

---

## Primary Views

| View | Purpose |
|------|---------|
| Overview | Executive summary, strategic health |
| Projects | Every project contributing to the area |
| Timeline | Major milestones across all projects |
| Performance | KPIs, Targets, Trends |
| Budget | Financial summary |
| Risks | Strategic risk register |
| Reports | Generated executive reports |

---

## Screen Architecture

```
┌────────────────────────────────────────────┐
│ Header: Name, Sponsor, Health, Actions     │
├────────────────────────────────────────────┤
│ Health │ Budget │ KPIs │ Timeline          │
├────────────────────────────────────────────┤
│ Strategic Summary                          │
├────────────────────────────────────────────┤
│ Projects                                   │
├────────────────────────────────────────────┤
│ Performance Trends                         │
├────────────────────────────────────────────┤
│ Risks & Dependencies                       │
├────────────────────────────────────────────┤
│ Recent Updates                             │
└────────────────────────────────────────────┘
```

---

## Claude Implementation Notes

Treat the Priority Area as the **strategic command center** for one national objective. Design it as a narrative workspace that answers four questions:

1. Where are we trying to go?
2. How are we progressing?
3. What is blocking success?
4. Where should leadership focus next?
