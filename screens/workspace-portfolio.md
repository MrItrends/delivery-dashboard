# Screens 01–02: Workspace Home & Portfolio

---

## 01 — Workspace Home

### Purpose

The operational home for every user. The first screen after login. Users begin and end their day here.

This is not a reporting dashboard. It is an **operational inbox** — the place where users orient, prioritize, and take action.

### Primary Users

Everyone: Executives, Programme Managers, Delivery Teams, Finance, Observers.

### Questions This Screen Answers

- What changed since I was last here?
- What requires my attention right now?
- What am I responsible for?
- What happened today?
- What should I do next?

### Navigation Entry

Primary sidebar navigation. Top of the hierarchy. Default route after login: `/workspace`.

### Required Sections

| Section | Content | Position |
|---------|---------|---------|
| Workspace Header | Name, switcher, health indicator | Top |
| Workspace Health | Overall health across all portfolios | Below header |
| My Work | Activities assigned to me — today + overdue + upcoming | Primary content, left |
| Recent Activity | Live feed of what changed across the workspace | Primary content, right |
| Approvals | Outstanding items waiting for my approval | Below My Work |
| Upcoming Deadlines | Milestones and activities due in next 14 days | Supporting |
| Pinned Objects | User-pinned interventions, projects, activities | Supporting |
| Recent Items | Last 10 objects the user viewed | Supporting |
| Quick Actions | Create Activity, Search, Open Command Palette | Persistent |

### Optional Sections

| Section | When to Show |
|---------|-------------|
| Announcements | Admin-published workspace announcements only |
| Workspace News | Significant completions, approved milestones |
| AI Summary | "Here's what happened while you were away" — if feature enabled |

### Never Include

- Large analytics dashboards
- Multiple chart grids
- Marketing or onboarding banners for existing users
- Configuration panels or settings
- Budget summaries at workspace level
- Cross-portfolio KPI cards as primary content

### Primary Actions

- Create (⌘N) — surfaces Create Activity as default, type selectable
- Search (⌘K) — command palette
- View My Activity
- Approve pending items

### Default Layout

```
┌──────────────────────────────────────────────────────────────┐
│ [Workspace Name]  [Health]  [Switcher]          [⌘K Search] │
├────────────────────────────────────┬─────────────────────────┤
│ My Work                            │ Recent Activity         │
│ Today (5)                          │ ─────────────────────── │
│ [Activity row]                     │ Ahmed added evidence to │
│ [Activity row]                     │ National Programme      │
│                                    │ 4 minutes ago           │
│ Overdue (2)                        │                         │
│ [Activity row]                     │ Sarah approved Q3       │
│                                    │ Milestone · 12m ago     │
│ Upcoming (8)                       │                         │
│ [Activity row]                     │ [View all activity]     │
├────────────────────────────────────┴─────────────────────────┤
│ Approvals (3)          │ Deadlines (6)   │ Pinned (4)        │
└────────────────────────────────────────────────────────────────┘
```

### Interaction Patterns

- My Work rows open Activity Inspector on click
- Activity Feed items link to the object they reference
- Approval items open the relevant approval panel inline
- Deadline items open the milestone or activity Inspector
- Pinned objects open their full page

### Loading State

Skeleton screens for each section. Sections load independently — My Work loads first, then Activity Feed, then supporting panels.

### Empty State

For new workspaces only: guided setup flow — "Your workspace is ready. Let's add your first Portfolio."

For returning users with no My Work: "You're up to date. No activities assigned to you today."

### Success Criteria

**Users understand their priorities within five seconds of arriving.**

---

## 02 — Portfolio

### Purpose

Strategic oversight across multiple Priority Areas. This is the executive view — designed for leaders who need to understand delivery health without managing it.

### Primary Users

- Executives and Ministers
- Portfolio Managers
- Senior Leadership Team
- External oversight bodies

### Questions This Screen Answers

- How are our strategic priorities performing?
- Where should leadership focus attention?
- Which programmes require intervention?
- What are the major risks across the portfolio?
- Are we on track to meet our commitments?

### Navigation Entry

Primary sidebar. Second level beneath Workspace. Route: `/portfolio/[id]`.

### Required Sections

| Section | Content | Position |
|---------|---------|---------|
| Executive Summary | Auto-generated health narrative: 2–3 sentences from live data | Top |
| Portfolio Health | Aggregate health across all Priority Areas — calculated, never manual | Below summary |
| Priority Area Table | All Priority Areas with health, owner, budget status, milestone count | Primary content |
| Programme Timeline | Rolling 6-month view of major milestones across all Priority Areas | Below table |
| Strategic Risks | Risks that have escalated to portfolio level | Supporting right |
| Budget Overview | Aggregate budget consumption across all programmes | Supporting right |
| Recent Executive Decisions | Last 5 decisions recorded at portfolio or Priority Area level | Supporting |

### Optional Sections

| Section | When to Show |
|---------|-------------|
| Performance Against Targets | If KPIs are configured at Portfolio level |
| External Commitments | Ministerial commitments or published targets |

### Never Include

- Individual activities or checklists
- Kanban boards or task lists
- Operational discussion threads
- Budget invoice details
- Team roster or capacity planning
- File browser

### Primary Actions

- Create Priority Area
- Generate Portfolio Report
- Review Portfolio (mark as reviewed — creates audit record)

### Secondary Actions

- Export summary
- Set portfolio targets
- Manage portfolio settings

### Default Layout

```
┌──────────────────────────────────────────────────────────────┐
│ [Breadcrumb]                                                 │
│ Portfolio Name                          [Generate Report]   │
│ Executive Summary: 2–3 sentences of live delivery health    │
├──────────────────────────────────────────────────────────────┤
│ [Healthy 4]  [At Risk 2]  [Critical 1]  [Budget: 68%]       │
├──────────────────────────────────────────────────────────────┤
│ Priority Areas                          [+ Create]  [Filter]│
│ ─────────────────────────────────────────────────────────── │
│ Name              Health    Owner      Budget    Milestones  │
│ Education Reform  ● Healthy Ahmed      72%       3 / 5 done  │
│ NHS Capacity      ● At Risk Sarah      89%       1 / 4 done  │
│ Housing Target    ● Critical Marcus    45%       0 / 3 done  │
├──────────────────────────────────────────────────────────────┤
│ Programme Timeline (6 months)                               │
│ ████░░░░  Education Reform                                  │
│ ─────████ NHS Capacity                                      │
├─────────────────────────────────┬────────────────────────────┤
│ Strategic Risks (5)             │ Budget Overview            │
└─────────────────────────────────┴────────────────────────────┘
```

### Interaction Patterns

- Priority Area rows open the Priority Area page (full page, not Inspector)
- Timeline items open the milestone or programme Inspector
- Risk items open the risk Inspector
- Executive Summary has a "Regenerate" option if data has changed

### Responsive Behaviour

- Desktop: full three-section layout
- Tablet: Priority Area table full width, other sections below
- Mobile: Summary + health status only; table collapses to card list

### Success Criteria

**Leadership understands overall delivery health within two minutes, without clicking.**
