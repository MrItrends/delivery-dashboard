# Screens 10–12: Reports, Calendar & Search

---

## 10 — Reports

### Purpose

Structured executive communication. Reports are formal, versioned documents generated from live data and approved before distribution. They are not editable dashboards — they are permanent records of programme state at a point in time.

### Primary Users

- Programme Managers (generating reports)
- Executives and Ministers (receiving and reviewing reports)
- Portfolio Managers (approving reports before distribution)
- Finance Teams (reviewing financial sections)
- External Stakeholders (receiving approved reports via sharing link)

### Questions This Screen Answers

- What is the current state of this programme?
- What progress has been made since the last report?
- What are the risks and mitigations?
- What decisions are required?
- What is the budget position?

### Navigation Entry

From Intervention → Reports (if generated). From Project → Reports tab. From Portfolio → Generate Report. Route: `/reports/[id]`.

### Required Sections

| Section | Content |
|---------|---------|
| Executive Summary | 2–3 paragraph narrative; auto-generated from data, editable before approval |
| Progress | RAG status, milestone completion, activity status summary |
| Budget | Summary of financial position — committed, spent, forecast |
| Targets | Performance against KPIs — current values vs. targets with trend |
| Risks | Active risks with likelihood, impact, and mitigation status |
| Recommendations | Required decisions or actions from report recipients |
| Appendix | Supporting detail — full activity tables, evidence links, data sources |

### Never Include

- Editable operational data (reports are generated snapshots, not live views)
- Task management or activity creation interfaces
- Comment threads as a primary section (discussion is separate from the report itself)

### Report Lifecycle

```
Draft → Review → Approved → Distributed → Archived
              ↓
        Returned for revision
```

Every report version is stored permanently. Approved reports cannot be edited — only superseded by a new version.

### Primary Actions

- Generate Report (opens configuration flow: scope → period → audience → preview → generate)
- Approve Report (reviewer only)
- Export (PDF, Word, CSV, Shareable Link)
- Schedule Report (recurring generation)

### Layout

```
┌──────────────────────────────────────────────────────────────┐
│ KS2 Update / Reports / Q3 Progress Report                   │
│ Q3 Progress Report — September 2024          [Approved] [↓] │
│ Generated: 30 September 2024  ·  Approved by: Sarah Evans   │
├──────────────────────────────────────────────────────────────┤
│ [Executive Summary]  [Progress]  [Budget]  [Risks]  [Appendix]│
├──────────────────────────────────────────────────────────────┤
│ Executive Summary                                            │
│                                                              │
│ The KS2 Curriculum Update is progressing at risk. 68% of    │
│ activities are on track; however, supplier approval delays   │
│ have created a risk to the September milestone. Budget is   │
│ tracking 3% above forecast.                                  │
│                                                              │
│ Recommendation: Director review of supplier contract by     │
│ 7 October required to maintain programme timeline.          │
│                                                              │
│ [Progress section below...]                                  │
└──────────────────────────────────────────────────────────────┘
```

---

## 11 — Calendar

### Purpose

Time-based planning and schedule awareness. The Calendar brings together milestones, deadlines, reviews, and funding events across all objects a user has access to — in a single temporal view.

### Primary Users

- Delivery Managers (scheduling and tracking deadlines)
- Programme Directors (review cycle planning)
- Finance Teams (funding event scheduling)
- All users (awareness of upcoming commitments)

### Questions This Screen Answers

- What is due this week?
- When are the major milestones across my programmes?
- Are there scheduling conflicts?
- When do funding decisions need to be made?

### Navigation Entry

Primary sidebar navigation. Route: `/calendar`.

### Required Sections

| Section | Content |
|---------|---------|
| Calendar View | Primary view — Day, Week, Month, Quarter; user-selectable |
| Upcoming Reviews | List of scheduled programme reviews in the next 30 days |
| Milestones | Key milestones surfaced as calendar items |
| Deadlines | Activity and reporting deadlines |
| Funding Events | Budget approval deadlines and funding cycle dates |

### Never Include

- Standalone calendar events with no connection to programme objects (this is not a general-purpose calendar)
- Duplicate schedules (each event appears once; a milestone due date appears as one item)
- Personal diary items unrelated to delivery work

### Filtering

Users can filter the calendar by: workspace, portfolio, project, intervention, my work only, type (milestone / activity / review / funding).

### External Integration

Calendar events can be exported to external calendars (Google Calendar, Outlook) as read-only subscriptions. Changes must be made inside the platform.

### Layout

```
┌──────────────────────────────────────────────────────────────┐
│ Calendar                  [Day] [Week] [Month] [Quarter]    │
│                                        [Filter] [Export]    │
├───────────────────────────────────────────────────────────── │
│ September 2024                            < October 2024 >  │
│ ─────────────────────────────────────────────────────────── │
│ Mon 23  Tue 24  Wed 25  Thu 26  Fri 27  Sat 28  Sun 29     │
│         ● M2 Due                                            │
│                  ● Budget review                            │
│                          ● Activity deadline ×3             │
├──────────────────────────────────────────────────────────────┤
│ Upcoming (7 days)                                           │
│ Today    Q3 Report due — KS2 Update                        │
│ Thu 26   Milestone 2 — Pilot Launch submission              │
│ Fri 27   Budget approval — KS3 Update                      │
└──────────────────────────────────────────────────────────────┘
```

---

## 12 — Search

### Purpose

Universal, instant navigation. Search is not a feature — it is the fastest way to move anywhere in the product. Every object in the system is findable by name, reference number, owner, or content.

### Primary Users

Everyone. Search is the primary navigation tool for users who know what they are looking for.

### Questions This Screen Answers

- Where is [specific thing]?
- What [type of object] exists that matches [query]?
- What has [person] been working on?
- What happened to [reference number or name]?

### Navigation Entry

⌘K from anywhere. Top navigation bar search icon. Route: `/search?q=[query]`.

### Required Sections

| Section | Content |
|---------|---------|
| Search Input | Autofocused input; full-width; placeholder: "Search for anything..." |
| Results | Grouped by object type — Interventions, Activities, Projects, Reports, Files, People |
| Filters | Type, status, owner, date range, workspace — applied inline, don't navigate away |
| Recent Searches | Last 5 user searches, shown before first keystroke |
| Suggested Searches | AI-suggested relevant objects based on user's recent context |
| Quick Actions | "Create [type]", "Go to [recent object]" — shown in results list |

### Never Include

- Analytics or charts within search results
- Configuration or settings panels
- Objects the user does not have permission to see (search is permission-aware)

### Search Behavior

- **Instant:** Results appear as user types, updating with each keystroke (debounced 150ms)
- **Predictive:** Top results appear before query is complete
- **Permission-aware:** Only shows objects the current user can access
- **Learning:** Weights results toward objects the user frequently interacts with

### Result Types and Icons

| Object Type | Icon | Shown Fields |
|------------|------|-------------|
| Interventions | 📋 | Name, project, status, health |
| Activities | ✓ | Name, intervention, owner, due date |
| Projects | 📁 | Name, priority area, health |
| Reports | 📄 | Name, date, type |
| Files | 📎 | Name, parent object, uploaded date |
| People | 👤 | Name, role, team |
| Milestones | ◆ | Name, intervention, due date, status |

### Performance

- Results must appear within 150ms of query change
- Search index must be refreshed within 30 seconds of object changes
- Search must handle 100,000+ objects without performance degradation

### Layout

```
┌──────────────────────────────────────────────────────────────┐
│ 🔍  Search for anything...                                   │
├──────────────────────────────────────────────────────────────┤
│ Interventions (3)                               [View all →] │
│ 📋 KS2 Curriculum Update · At Risk · Ahmed                  │
│ 📋 KS3 Curriculum Update · Healthy · Sarah                  │
│ 📋 KS4 Curriculum Update · Planned · Marcus                 │
├──────────────────────────────────────────────────────────────┤
│ Activities (8)                                  [View all →] │
│ ✓  Draft curriculum materials · Active · Due 14 Sep         │
│ ✓  Submit for review · Blocked · Due 21 Sep                 │
├──────────────────────────────────────────────────────────────┤
│ Quick Actions                                                │
│ ⌘N  Create Activity in KS2 Update                          │
│ →   Open KS2 Update Intervention                           │
└──────────────────────────────────────────────────────────────┘
```
