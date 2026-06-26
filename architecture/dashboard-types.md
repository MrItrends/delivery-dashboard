# Dashboard Types

## Philosophy

The Delivery Dashboard is not one dashboard. It is a collection of **specialized workspaces** built on a shared product architecture.

Different users have different responsibilities. Every dashboard exists to answer a **different question**. All six dashboards are perspectives of the same underlying data.

---

## Dashboard Ecosystem

| Dashboard | Primary Question | Primary Users |
|-----------|-----------------|---------------|
| Executive Dashboard | Are we delivering? | President, PM, Ministers |
| Portfolio Dashboard | How healthy is the portfolio? | Portfolio Managers |
| Project Dashboard | Is this programme on track? | Project Directors |
| Activity Tracker | What needs to be done today? | Delivery Teams |
| Performance Dashboard | Are interventions producing results? | Analysts, Leadership |
| Administration Dashboard | Is the platform configured correctly? | Admins |

---

## Executive Dashboard

**Purpose:** Provide leadership with immediate visibility into national delivery performance.

**Primary Information:**
- Portfolio Health
- Priority Areas at Risk
- Funding Summary
- National KPIs
- Milestone Progress
- Upcoming Decisions
- Critical Risks

**Primary Actions:** View, Filter, Compare, Approve, Export, Drill Down

> Executives rarely create data. They consume information and make decisions.

**Design Principles:** High signal. Low noise. One-click drill-down. Summary first.

---

## Portfolio Dashboard

**Purpose:** Manage an entire delivery portfolio simultaneously.

**Key Information:** Portfolio Health, Cross-project dependencies, Delivery trends, Budget allocation, Risk analysis, Resource distribution

**Primary Actions:** Create Project, Assign Owners, Monitor Delivery, Review Risks, Allocate Funding, Generate Reports

---

## Project Dashboard

**Purpose:** Manage one project. This is the primary governance workspace.

**Tabs:** Overview, Interventions, Timeline, Budget, Targets, Files, Team, Reports, History, Settings

Unlike traditional dashboards, the Project Dashboard is collaborative. Users should spend hours here. It coordinates — it does not execute.

---

## Activity Tracker

**Purpose:** Execute work. Intentionally lightweight.

Should feel closer to **Linear** than Microsoft Project.

**Views:** Table, Board, Timeline, Calendar, My Work

**Notice what is absent:** No budgets. No KPIs. No funding. No executive reports. Those belong elsewhere.

---

## Performance Dashboard

**Purpose:** Measure outcomes. Not activities.

Displays: KPIs, Targets, Quarterly Progress, Trend Analysis, Regional Comparisons, Forecasts, Outcome Tracking

Performance should always connect back to delivery. Never exist independently.

---

## Administration Dashboard

**Purpose:** Manage the platform.

Includes: Users, Permissions, Integrations, Languages, Audit Logs, System Settings, Workspace Configuration, API Keys

Administrators rarely interact with projects directly.

---

## Dashboard Relationships

```
Executive Dashboard
  ↓ drills into
Portfolio Dashboard
  ↓ drills into
Project Dashboard
  ↓ drills into
Activity Tracker
```

Performance intersects every level. Administration supports every level.

---

## Design Principle

> Every dashboard answers **one primary question**. If a dashboard attempts to answer ten questions, it should become two dashboards.
