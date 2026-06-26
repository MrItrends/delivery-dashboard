# 17 — Priority Areas

## Purpose

Priority Areas represent the government's **highest-level strategic objectives**.

They are not projects. They are not programmes. They are long-term policy outcomes that multiple projects and interventions collectively contribute toward.

Every piece of delivery work in the platform should ultimately support one Priority Area.

> Without Priority Areas, the platform becomes a project tracker. With Priority Areas, it becomes a **government delivery platform**.

---

## Business Goal

Provide leadership with a structured way to translate national priorities into measurable execution while maintaining complete visibility across every contributing programme.

Priority Areas should answer one simple question: *"How is this national priority progressing?"*

---

## User Goals

| User | Goal |
|------|------|
| Executives | Understand national delivery |
| Portfolio Managers | Coordinate programmes |
| Project Managers | Understand strategic context |
| Delivery Teams | Understand why their work matters |

Every user should immediately understand how their work contributes to larger government outcomes.

---

## Core Philosophy

Priority Areas are **strategic containers**, not operational workspaces.

They should rarely change. Projects may come and go. Activities are completed every day. Budgets change. Interventions evolve.

**Priority Areas remain relatively stable** because they represent government intent rather than execution.

---

## Examples

- Healthcare
- Education
- Infrastructure
- Agriculture
- Economic Development
- Public Safety
- Digital Government
- Climate & Environment
- Youth Employment
- Public Finance Reform

---

## Object Anatomy

```
Priority Area
├── Strategic Objective
├── Executive Sponsor
├── Portfolio
├── Projects
├── Interventions
├── Budget Summary
├── KPI Summary
├── Performance Score
├── Risks
├── Dependencies
├── Reports
├── Files
├── Activity Feed
└── Discussion
```

> Activities do not belong directly to Priority Areas. They belong much lower in the hierarchy. Priority Areas **summarize** execution rather than manage it.

---

## Required Fields

### Identity
| Field | Description |
|-------|-------------|
| Name | Clear strategic title |
| Description | Full objective statement |
| Government Objective | Policy goal |
| Portfolio | Parent portfolio |
| Category | Classification |
| Unique Identifier | System reference |

### Ownership
| Field | Description |
|-------|-------------|
| Executive Sponsor | Senior accountable leader |
| Portfolio Manager | Strategic coordinator |
| Delivery Unit | Implementation office |
| Lead Ministry | Primary ministry |
| Supporting Ministries | Contributing ministries |

### Timeline
| Field | Description |
|-------|-------------|
| Start Date | When work began |
| Target Completion | Expected end date |
| Current Phase | Active stage |
| Review Cycle | Frequency of reviews |

### Performance
| Field | Description |
|-------|-------------|
| Health Score | Calculated composite |
| Overall Progress | % toward objective |
| Risk Level | Open risk exposure |
| Funding Status | Financial health |
| Completion Trend | Direction of progress |

### Metrics
| Metric | Description |
|--------|-------------|
| Number of Projects | Active programmes |
| Number of Interventions | Active delivery units |
| Active Activities | Work in progress |
| Completed Milestones | Achievements |
| Budget Utilization | % spent |
| Target Achievement | % of KPIs on track |

---

## Priority Area Health

Health should never be manually selected. It should be calculated from:
- Project Health
- Budget Performance
- Milestone Completion
- KPI Achievement
- Open Risks
- Overdue Activities
- Delivery Velocity
- Recent Trend

**Health States:**
| State | Meaning |
|-------|---------|
| Excellent | All signals positive |
| Healthy | Strong overall performance |
| Needs Attention | Some concerns identified |
| At Risk | Multiple concerning signals |
| Critical | Immediate action required |
| Archived | No longer active |

---

## Lifecycle

```
Planning → Approved → Active Delivery → Review → Completed → Archived
```

Most Priority Areas remain active for **years**. The lifecycle supports long-running government programmes.

---

## Primary Views

### Overview
Executive summary, strategic health, latest updates, key metrics

### Projects
Every project contributing to the Priority Area. Supports filtering, sorting, grouping.

### Timeline
Major milestones across all contributing projects. Helps executives understand delivery sequencing.

### Performance
KPIs, Targets, Trend Analysis, Regional Comparisons, Forecast, Historical Progress

### Budget
Allocated, Committed, Spent, Remaining, Funding Gap, Budget Forecast

### Risks
Strategic Risks, Mitigation, Dependencies, Escalations, Review Status

### Reports
Generated from underlying data — never manually edited.

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

## Permissions

| Role | Access |
|------|--------|
| Executive Sponsor | Full visibility, strategic approval, review, reporting |
| Portfolio Manager | Manage Projects, Targets, Budget, Reports, Risks |
| Project Managers | View Priority Area, update project info only |
| Contributors | Read-only via Projects and Activities |

---

## Claude Implementation Notes

Treat the Priority Area as the **strategic command center** for one national objective.

Do not design it like a page full of charts. Design it as a narrative workspace that answers four questions:

1. Where are we trying to go?
2. How are we progressing?
3. What is blocking success?
4. Where should leadership focus next?

Everything on the screen should help answer one of those questions.

---

## Review Checklist

- [ ] Communicates strategic intent before operational detail
- [ ] Health is calculated, not manually assigned
- [ ] Relationships are visible and navigable
- [ ] Progress rolls up automatically from lower-level objects
- [ ] Collaboration is present but not overwhelming
- [ ] Executives can understand the state of delivery within seconds
- [ ] Teams can drill into projects and interventions without losing context
