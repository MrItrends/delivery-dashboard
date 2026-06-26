# Screens 05–06: Intervention & Activities

---

## 05 — Intervention

### Purpose

The primary collaborative workspace. This is where delivery happens — where teams plan, execute, communicate, and record their work. The Intervention screen must handle everything a team needs to operate without navigating elsewhere.

### Primary Users

- Delivery Managers (primary; this is their workspace)
- Project Managers (monitoring)
- Contributors (completing assigned work)
- Observers (tracking progress)
- Finance Leads (on Budget tab)

### Questions This Screen Answers

- What are we delivering, and what is its current state?
- Who owns this, and who is working on it?
- What changed today?
- What is blocked, and by what?
- What happens next?
- Are we on budget and on target?

### Navigation Entry

From Project → Intervention row. From Workspace My Work → linked interventions. From Search. Route: `/interventions/[id]`.

### Required Sections

| Section | Tab | Content |
|---------|-----|---------|
| Overview | Overview | Summary, description, health, key metadata, owner, team |
| Activities | Activities | Full activity table with filters, inline editing, bulk actions |
| Milestones | Milestones | Milestone timeline with evidence and approval status |
| Timeline | Timeline | Full Gantt view — activities, milestones, dependencies |
| Budget | Budget | Funding sources, allocation, forecast, approval history |
| Targets | Targets | KPIs linked to this intervention with trends |
| Discussion | Discussion | Comment thread at intervention level |
| Files & Evidence | Files | All uploaded documents and linked evidence |
| Recent Activity | Overview | Live feed of all changes within this intervention |
| Team | Team | Who has access and in what role |

### Optional Sections

| Section | When to Show |
|---------|-------------|
| AI Summary | If AI features enabled; "Here is the state of this intervention" |
| Related Interventions | If relationships are configured |
| External Links | If external integrations configured |

### Never Include

- Portfolio analytics or cross-workspace summaries
- Executive dashboards (this is operational, not executive)
- Cross-workspace settings
- Nested sub-interventions (the hierarchy is fixed)
- Payroll or HR workflows

### Primary Actions

- Create Activity (⌘N from Activities tab)
- Upload Evidence
- Record Decision
- Comment

### Default Layout (Overview Tab)

```
┌──────────────────────────────────────────────────────────────┐
│ Workspace / Education / Curriculum Review / KS2 Update      │
│ KS2 Curriculum Update                   [At Risk]  [+ Act.] │
│ Update Key Stage 2 curriculum materials for September 2024  │
│ Owner: Ahmed Yusuf  ·  Q3 2024  ·  £2.4M budget            │
├──────────────────────────────────────────────────────────────┤
│ [Overview] [Activities 43] [Milestones 3] [Timeline] [More]│
├───────────────────────────────────┬──────────────────────────┤
│ Summary                           │ Recent Activity          │
│                                   │ ─────────────────────── │
│ Health breakdown:                 │ Sarah marked activity    │
│ Activities  68% on track          │ complete · 12m ago       │
│ Budget      82% consumed          │                         │
│ Milestones  1 of 3 complete       │ Ahmed uploaded Q3 plan  │
│                                   │ · 2 hours ago            │
│ Key blockers:                     │                         │
│ ● Supplier approval pending (2)  │ Milestone 2 submitted    │
│ ● Review meeting not scheduled   │ for approval · 1d ago    │
│                                   │                         │
│ Description                       │ [View all activity]      │
│ [Expandable full description]     │                         │
└───────────────────────────────────┴──────────────────────────┘
```

### Activities Tab Layout

```
┌──────────────────────────────────────────────────────────────┐
│ [All] [My Work] [Overdue] [Blocked] [Saved View ▾]          │
│ Filter: Status ×  Owner: Ahmed ×  [Clear]                   │
│                              [Columns ▾] [Group ▾] [+ New] │
├──────────────────────────────────────────────────────────────┤
│ ☐  Title               Status     Owner    Due      Priority│
│ ☐  Draft materials     ● Active   Ahmed    14 Sep   High    │
│ ☐  Submit for review   ● Blocked  Sarah    21 Sep   High    │
│ ☐  Final sign-off      ○ Planned  Marcus   30 Sep   Medium  │
├──────────────────────────────────────────────────────────────┤
│ 43 activities · 5 overdue · 2 blocked · 8 upcoming this week│
└──────────────────────────────────────────────────────────────┘
```

### Interaction Patterns

- Activity rows open Activity Inspector on click
- Title click on any row triggers inline edit
- Status click opens inline status dropdown (no Inspector)
- Owner click opens inline person selector
- Right-click on any row opens context menu
- Bulk actions bar appears when items are selected
- Discussion tab shows threaded comments — no page navigation
- Files tab shows file list; click file opens File Preview Inspector

### Loading State

- Overview tab: skeleton for summary section, then activity count pills, then recent activity feed
- Activities tab: toolbar loads immediately, table skeleton with 10 skeleton rows, then real data

### Empty State

New intervention with no activities:
```
Activities are where delivery happens.
Break this intervention into specific, assignable pieces of work.
[Create first activity]
```

### Success Criteria

**Teams complete their daily work without leaving the Intervention screen.**

A delivery manager should be able to: create activities, update statuses, add comments, upload evidence, and track milestones — all without navigating to another page.

---

## 06 — Activities (Standalone)

### Purpose

The execution workspace. Used when a user needs to see all activities across an Intervention (or across multiple Interventions they own) in a single focused view. Also the primary screen for Contributors who mostly execute assigned work.

### Primary Users

- Contributors (primary users of this view)
- Delivery Managers (for daily planning)
- Project Managers (for overview)

### Questions This Screen Answers

- What needs doing?
- Who owns each activity?
- When is it due?
- What is blocked and why?
- What can I complete today?

### Navigation Entry

From sidebar "My Work" section. From Intervention → Activities tab (the Activities tab IS this view, embedded). Route: `/interventions/[id]/activities` or `/my-work`.

### Required Sections

| Section | Content |
|---------|---------|
| Activity Table | Full table with all columns — Title, Status, Owner, Due, Priority, Dependencies, Tags |
| Filter Bar | Search, filter chips, saved views, sort, density, export |
| Inspector Panel | Activity detail — opens on row click, does not navigate away |
| Bulk Actions Bar | Appears on multi-select — assign, update status, archive |

### Never Include

- Large KPI dashboards above the table
- Budget summaries (this is execution, not finance)
- Executive reports
- Charts or visualizations as primary content

### Primary Actions

- Create Activity (⌘N)
- Assign
- Mark Complete
- Filter
- Export

### Default Layout

```
┌──────────────────────────────────────────────────────────────┐
│ KS2 Update / Activities                         [+ Activity] │
├──────────────────────────────────────────────────────────────┤
│ [All] [My Work] [Overdue] [Blocked] [Saved View ▾]         │
│                              [Sort ▾] [Columns ▾] [Export] │
├──────────────────────────────────────────────────────────────┤
│ ☐  Title               Status     Owner    Due      Priority│
│ ──────────────────────────────────────────────────────────  │
│ ☐  Draft materials     ● Active   Ahmed    14 Sep   High    │
│ ☐  Submit for review   ● Blocked  Sarah    21 Sep   High    │
│ ☐  Final sign-off      ○ Planned  Marcus   30 Sep   Medium  │
│ ──────────────────────────────────────────────────────────  │
│ 43 total  ·  5 overdue  ·  2 blocked  ·  18 complete       │
└──────────────────────────────────────────────────────────────┘
                                          [Activity Inspector →]
```

### Activity Inspector Contents

```
[Activity]                                         [✕] [↗]
Draft curriculum materials — Key Stage 2

● Active  ·  High Priority  ·  Ahmed Yusuf

[Overview]  [Discussion]  [History]  [Files]  [Checklist]
────────────────────────────────────────────────────────────
Due date:      14 September 2024
Dependencies:  ← Blocked by: Supplier approval
               → Blocks: Submit for review
Tags:          Q3, Materials, Draft

Description:
[Expandable description field]
```

### Interaction Patterns

- Single click → Inspector opens (activity table shifts left)
- Double click → Inline title edit
- Status column click → Inline status selector (no Inspector)
- Owner column click → Inline person selector
- Due date column click → Inline date picker
- Row checkbox → Enters bulk selection mode
- ⌘+click → Multi-select

### Density

| Mode | Row Height | When Used |
|------|-----------|----------|
| Comfortable (default) | 56px | Normal workflows |
| Compact | 40px | Power users with 100+ activities |

Density toggle in toolbar (right side). Persisted per user.

### Virtualization

Tables with more than 50 rows use virtual rendering (TanStack Virtual). The DOM only renders visible rows ± 10 buffer rows. Total row count can exceed 10,000 without performance degradation.

### Empty State

After filtering with no results:
```
No activities match these filters.
[Clear filters]  or  [Adjust filters]
```

With no activities at all:
```
No activities yet.
[+ Create activity]
```

### Success Criteria

**Power users can complete most actions — status changes, assignments, comments, completions — without navigating away from this table.**

A user with 100 activities should be able to find, update, and close work in under 5 minutes.
