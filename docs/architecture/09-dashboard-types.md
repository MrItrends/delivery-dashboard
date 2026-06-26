# 09 — Dashboard Types

## Philosophy

The Delivery Dashboard is not one dashboard. It is a collection of **specialized workspaces** built on a shared product architecture.

Different users have different responsibilities. An Executive should not see the same interface as an Activity Owner.

Every dashboard exists to answer a **different question**.

---

## Dashboard Ecosystem

The platform contains six dashboard experiences:

| Dashboard | Primary Question |
|-----------|-----------------|
| Executive Dashboard | Are we delivering? |
| Portfolio Dashboard | How healthy is the portfolio? |
| Project Dashboard | Is this programme on track? |
| Activity Tracker | What needs to be done today? |
| Performance Dashboard | Are interventions producing results? |
| Administration Dashboard | Is the platform configured correctly? |

These are not six different applications. They are **six perspectives of the same data**.

---

## Executive Dashboard

**Purpose:** Provide leadership with immediate visibility into national delivery performance.

**Primary Users:** President, Prime Minister, Chief of Staff, Minister, Permanent Secretary

**Primary Information:**
- Portfolio Health
- Priority Areas
- Projects At Risk
- Funding Summary
- National KPIs
- Milestone Progress
- Upcoming Decisions
- Critical Risks

**Primary Actions:** View, Filter, Compare, Approve, Export, Drill Down

> Executives rarely create data. They **consume information** and make decisions.

**Design Principles:** High signal. Low noise. One-click drill-down.

---

## Portfolio Dashboard

**Purpose:** Manage an entire delivery portfolio.

**Primary Users:** Portfolio Managers overseeing dozens or hundreds of projects.

**They require:** Portfolio Health, Cross-project dependencies, Delivery trends, Budget allocation, Risk analysis

**Primary Actions:** Create Project, Assign Owners, Monitor Delivery, Review Risks, Allocate Funding, Generate Reports

---

## Project Dashboard

**Purpose:** Manage one project. This is the primary operational workspace.

**Tabs:** Overview, Activities, Milestones, Budget, Targets, Files, Team, History, Settings

Unlike traditional dashboards, the Project Dashboard is **collaborative**. Users should spend hours here. Not minutes.

---

## Activity Tracker

**Purpose:** Execute work. Intentionally lightweight. Focuses on execution rather than planning.

Should feel closer to **Linear** than Microsoft Project.

**Core Objects:** Activity, Owner, Due Date, Priority, Status, Comments, History

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
  ↓
Portfolio Dashboard
  ↓
Project Dashboard
  ↓
Activity Tracker
```

Performance intersects every level. Administration supports every level.

---

## Design Principle

> Every dashboard should answer **one primary question**.

If a dashboard attempts to answer ten questions, it should probably become two dashboards.
