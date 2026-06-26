# 16 — Portfolio

## Purpose

The Portfolio is the **strategic layer** of the Delivery Dashboard. While Activities represent execution, Portfolio represents direction.

Portfolio answers one question: *"How are our strategic priorities performing?"*

---

## Business Goal

Enable leaders to monitor, compare and govern multiple programmes from a single view while preserving the ability to drill into execution when necessary.

---

## Relationship

```
Workspace
  ↓
Portfolio
  ↓
Priority Areas
  ↓
Projects
  ↓
Interventions
  ↓
Activities
```

Portfolio is never the destination. It is the bridge between strategy and execution.

---

## Portfolio Overview

The Portfolio Overview communicates:

| Metric | Description |
|--------|-------------|
| Total Priority Areas | Count of active areas |
| Active Projects | Running programmes |
| Programme Health | Aggregate health score |
| Budget Utilization | % of budget spent |
| Funding Gap | Required minus confirmed |
| KPIs On Track | % of targets meeting forecast |
| Milestones Completed | Achievement count |
| Upcoming Executive Decisions | Pending approvals |
| Cross-Programme Risks | Strategic risk exposure |

---

## Primary Layout

```
┌─────────────────────────────────────────────┐
│ Portfolio Header                            │
├─────────────────────────────────────────────┤
│ Health │ Budget │ KPIs │ Risks │ Funding    │
├─────────────────────────────────────────────┤
│ Priority Areas                              │
├─────────────────────────────────────────────┤
│ Programme Timeline                          │
├─────────────────────────────────────────────┤
│ Cross-Project Dependencies                  │
├─────────────────────────────────────────────┤
│ Recent Strategic Updates                    │
└─────────────────────────────────────────────┘
```

---

## Portfolio Health

Portfolio Health is calculated from:
- Project Health
- Milestone Completion
- Budget Performance
- Target Progress
- Delivery Velocity
- Open Risks
- Overdue Activities

Health updates automatically as delivery data changes.

---

## Priority Area Cards

Each Priority Area displays:

| Field | Description |
|-------|-------------|
| Name | Strategic objective title |
| Health Status | Calculated health |
| Projects | Active project count |
| Budget | Allocation and spend |
| KPIs | Target achievement |
| Completion Trend | Direction of progress |
| Owner | Executive sponsor |
| Last Updated | Recency indicator |

---

## Portfolio Views

| View | Purpose |
|------|---------|
| Overview | High-level strategic summary |
| Table | Dense comparison of Priority Areas |
| Timeline | Programme roadmap across time |
| Analytics | Performance trends and executive metrics |
| Map (Future) | Geographic distribution |

Changing the view never changes the data.

---

## Filtering

Users can filter by:
- Priority Area
- Ministry
- Region
- Delivery Status
- Funding Status
- Date Range
- Risk Level
- Owner

Filters are persistent until cleared and can be saved as reusable views.

---

## Cross-Project Dependencies

One of the defining features of the Portfolio. Users should see:
- Which projects depend on others
- Where delivery bottlenecks exist
- Which delays will cascade across programmes

Dependencies should be **visualized**, not buried inside reports.

---

## Executive Mode

Portfolio includes an Executive Mode that simplifies the interface for leadership:
- Summary-first
- Read-only by default
- Large comparative visuals
- Minimal controls
- Quick drill-down into projects when required

---

## Portfolio Lifecycle

```
Planning
  ↓
Active Delivery
  ↓
Review
  ↓
Completed
  ↓
Archived
```

---

## Claude Implementation Notes

The Portfolio should feel like a **strategic command center** — not a spreadsheet.

Avoid designing it as a wall of charts. The primary interaction is understanding **relationships between priorities, projects, budgets, and outcomes**.

Leaders should be able to answer *"Where should we focus attention next?"* within seconds of opening the Portfolio.
