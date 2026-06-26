# Workspace

## Purpose

The Workspace is the **digital headquarters for delivery**. Everything inside the Delivery Dashboard exists within a Workspace. It represents a single operating environment for a government, ministry, delivery unit, or organization.

The Workspace is not merely an account. It is the **operating system** for delivery.

---

## Business Goal

Provide every organization with a single operational environment where planning, execution, collaboration, reporting and accountability happen together.

---

## User Goal

When users enter the Workspace they should immediately understand:
- What is happening
- What changed
- What requires attention
- What they personally need to do

**Before they begin navigating.**

---

## Core Philosophy

The Workspace should feel **alive**. Not static. Users should constantly see evidence that work is progressing.

*"Delivery is happening."*

---

## Workspace Anatomy

```
Workspace
├── Home
├── Portfolio
├── Projects
├── Activity Tracker
├── Performance
├── Reports
├── Calendar
├── Files
├── Team
├── Search
├── Notifications
└── Settings
```

---

## Workspace Home

Workspace Home is not a dashboard. It is an **operational overview**.

Think of it as *"Today's delivery"* — not *"Business Intelligence"*.

**Homepage Layout:**
```
┌────────────────────────────────────────────┐
│ Global Search                              │
├────────────────────────────────────────────┤
│ Welcome + Workspace Health                 │
├────────────────────────────────────────────┤
│ Active Projects  │  At Risk  │  Deadlines  │
├────────────────────────────────────────────┤
│ Activity Feed    │  Team Updates           │
├────────────────────────────────────────────┤
│ My Tasks         │  Approvals Waiting      │
└────────────────────────────────────────────┘
```

---

## Workspace Health

Calculated from multiple signals:

| Signal | Weight |
|--------|--------|
| Project Completion | High |
| Activity Completion | High |
| Budget Health | Medium |
| Milestone Health | Medium |
| KPI Progress | Medium |
| Blocked Activities | High (negative) |
| Risk Level | High (negative) |
| Late Deliverables | High (negative) |

One composite score — never a single number alone.

---

## Workspace Switching

```
Federal Delivery Unit
Ministry of Education
Health Taskforce
```

Switching is instant. Recent Workspaces remain available. Favorites can be pinned.

---

## Workspace Branding

Organizations may configure: Logo, Name, Accent Color, Timezone, Currency, Language, Date Format.

These settings personalize the experience without altering the design system.

---

## Teams

Organizational units within a Workspace. Examples: Education Team, Finance Team, Health Delivery Unit.

Teams are **organizational units**, not permission groups.

---

## Recent Activity Feed

Every update answers: **Who? What? When? Where?**

Examples:
- Sarah completed Activity
- Ahmed uploaded Budget
- Finance approved Funding
- Milestone achieved
- Target updated

The feed should feel like GitHub Activity — not a social media feed.

---

## Quick Actions (one click)

- New Project
- New Activity
- Upload File
- Invite Member
- Generate Report
- Search

---

## Empty Workspace

Guide users through setup rather than showing an empty dashboard:

1. Create your first Portfolio
2. Invite your team
3. Create your first Project
4. Learn how Delivery works
5. Import existing data

---

## Workspace States

| State | Description |
|-------|-------------|
| Active | Normal operation |
| Read Only | No modifications allowed |
| Archived | Historical reference only |
| Maintenance | Temporarily unavailable |
| Suspended | Access restricted |

---

## Performance

Workspace Home loads within **2 seconds** regardless of Workspace size. Requires: incremental loading, virtualized feeds, cached summaries, background synchronization.

---

## Claude Implementation Notes

Workspace is not a dashboard page. **Workspace is an operating system.**

Never design Workspace Home as a collection of KPI cards. Design it as the place users **begin and end every day**.
