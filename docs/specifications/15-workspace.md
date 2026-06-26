# 15 — Workspace

## Purpose

The Workspace is the **home of an organization**. Everything inside the Delivery Dashboard exists within a Workspace.

A Workspace represents a single operating environment for a government, ministry, delivery unit, or organization. It is where people collaborate, projects are executed, reports are generated, and delivery is monitored.

The Workspace is not merely an account. It is the **digital headquarters for delivery**.

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

The Workspace should answer these questions **before** users begin navigating.

---

## Core Philosophy

The Workspace should feel **alive**. Not static.

Users should constantly see evidence that work is progressing: Recent activity, people online, projects changing, activities being completed, budgets updated, reports generated, approvals requested.

The Workspace should communicate: *"Delivery is happening."*

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

Think of it as *"Today's delivery"* rather than *"Business Intelligence"*.

**Homepage answers:**
- What's happening?
- What's blocked?
- What's overdue?
- What's changing?
- What requires my attention?

### Homepage Layout

```
┌────────────────────────────────────────────┐
│ Global Search                              │
├────────────────────────────────────────────┤
│ Welcome                                    │
│ Workspace Health                           │
├────────────────────────────────────────────┤
│ Active Projects                            │
│ At Risk Projects                           │
│ Upcoming Deadlines                         │
├────────────────────────────────────────────┤
│ Activity Feed                              │
│ Team Updates                               │
├────────────────────────────────────────────┤
│ My Tasks                                   │
│ Approvals Waiting                          │
└────────────────────────────────────────────┘
```

---

## Workspace Health

Instead of one percentage, Workspace Health is calculated from multiple signals:

| Signal | Description |
|--------|-------------|
| Project Completion | % of projects on track |
| Activity Completion | % of activities completed |
| Budget Health | Financial status across projects |
| Milestone Health | Milestone achievement rate |
| KPI Progress | Target achievement rate |
| Blocked Activities | Count and severity |
| Risk Level | Open risk exposure |
| Late Deliverables | Overdue count |

---

## Workspace Switching

Some users belong to multiple Workspaces:

```
Federal Delivery Unit
  ↓
Ministry of Education
  ↓
Health Taskforce
```

Switching Workspaces should be instant. Recent Workspaces remain available. Favorites can be pinned.

---

## Workspace Branding

Organizations may configure:
- Logo
- Name
- Accent Color
- Timezone
- Currency
- Language
- Date Format

These settings personalize the experience without altering the design system.

---

## Teams

A Workspace contains Teams:
- Education Team
- Finance Team
- Health Delivery Unit
- Infrastructure Programme
- Digital Transformation Office

Teams are **organizational units**, not permission groups.

---

## Members

Each Workspace maintains a member directory. Each member contains:

| Field | Description |
|-------|-------------|
| Avatar | Profile image |
| Name | Full name |
| Role | System role |
| Department | Organizational unit |
| Status | Active / Away |
| Last Active | Timestamp |
| Current Assignments | Active activities |
| Availability | Capacity status |
| Recent Activity | Latest contributions |

---

## Recent Activity

One of the most important sections. Creates confidence.

**Examples:**
- Sarah completed Activity
- Ahmed uploaded Budget
- Finance approved Funding
- Project moved to Review
- Milestone achieved
- Target updated

---

## Workspace Feed

The feed should resemble GitHub Activity or Linear Activity — not a social media feed.

Each update should answer: **Who? What? When? Where?**

---

## Favorites

Users should pin:
- Projects
- Reports
- Activities
- Teams
- Priority Areas

Pinned items remain accessible from everywhere.

---

## Recent Items

Workspace remembers:
- Recently Viewed Projects
- Recent Reports
- Recent Files
- Recent Searches
- Recent Activities

This reduces navigation friction.

---

## Quick Actions

Workspace Home should expose (within one click):
- New Project
- New Activity
- Upload File
- Invite Member
- Generate Report
- Search

---

## Search Scope

Searching from Home searches everything:
- Projects
- Activities
- Comments
- Users
- Files
- Reports
- Budgets
- Targets

Search is **global**.

---

## Empty Workspace

When a Workspace has no content, do not show an empty dashboard. Instead, introduce the platform:

1. Create your first Portfolio
2. Invite your team
3. Create your first Project
4. Learn how Delivery works
5. Import existing data

This becomes onboarding.

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

## Notifications

Workspace Notifications aggregate:
- Mentions
- Assignments
- Approvals
- Due Dates
- Risk Alerts
- Project Updates

Notification Center becomes the **operational inbox**.

---

## Performance

Workspace Home should load within **2 seconds** regardless of Workspace size. This requires:
- Incremental loading
- Virtualized feeds
- Cached summaries
- Background synchronization

---

## Future Expansion

- Cross Workspace Reporting
- Workspace Templates
- Workspace Duplication
- Workspace Analytics
- External Guests
- Partner Organizations

---

## Claude Implementation Notes

Workspace is not a dashboard page. **Workspace is an operating system.**

Every feature ultimately connects back to the Workspace.

Never design Workspace Home as a collection of KPI cards. Design it as the place users begin **and end** every day.
