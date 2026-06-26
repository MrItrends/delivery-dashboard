# Screens 03–04: Priority Area & Project

---

## 03 — Priority Area

### Purpose

Deep visibility into one national strategic objective. This is the view for Priority Area leads and programme managers who need to understand performance across all contributing projects.

### Primary Users

- Priority Area Leads
- Senior Programme Managers
- Policy Leads
- Portfolio Managers reviewing specific priorities

### Questions This Screen Answers

- Are we achieving this strategic objective?
- Which projects are contributing, and how?
- What is the current performance against targets?
- What are the major risks to this priority?
- What is the budget position?

### Navigation Entry

From Portfolio → Priority Area row. Route: `/priority-areas/[id]`.

### Required Sections

| Section | Content | Position |
|---------|---------|---------|
| Strategic Summary | Purpose, owner, status, health, key context | Header |
| Project Overview | Table of all contributing projects with health, owner, budget, milestones | Primary |
| Performance | Progress against strategic KPIs and targets — charts and numbers | Below projects |
| Budget | Aggregate and per-project budget consumption | Supporting |
| Targets | All targets for this priority with trend and forecast | Supporting |
| Risks | Active risks at Priority Area level | Supporting right |
| Timeline | Key milestones across all contributing projects (6-month window) | Below primary |
| Reports | History of generated reports for this priority area | Supporting |

### Never Include

- Individual activities (these live at Intervention level)
- Task management or checklists
- Operational team discussions
- File browser as primary section
- Configuration or settings panels

### Primary Actions

- Add Project
- Review Progress (creates audit checkpoint)
- Generate Priority Area Report

### Default Layout

```
┌──────────────────────────────────────────────────────────────┐
│ Workspace / Portfolio / Education Reform                     │
│ Education Reform                    [At Risk]  [Add Project] │
│ Improving education outcomes for 5-18 year olds             │
├──────────────────────────────────────────────────────────────┤
│ [Overview]  [Projects]  [Performance]  [Budget]  [Reports]  │
├──────────────────────────────────────────────────────────────┤
│ Projects (8)                           [Filter]  [Group by] │
│ Name                Health    Budget    Milestones  Owner    │
│ Curriculum Review   ● Healthy  72%      2/3 done   Ahmed    │
│ Teacher Training    ● At Risk  88%      0/2 done   Sarah    │
├───────────────────────────────────┬──────────────────────────┤
│ Performance vs Targets            │ Strategic Risks          │
│ [KPI chart with trend]            │ [Risk list, 4 items]     │
└───────────────────────────────────┴──────────────────────────┘
```

### Tabs

`Overview` → `Projects` → `Performance` → `Budget` → `Targets` → `Risks` → `Timeline` → `Reports` → `History`

### Responsive Behaviour

- Desktop: 70/30 split for primary and supporting panels
- Tablet: Full-width project table; supporting panels stack below
- Mobile: Summary header + project list; full sections via tab navigation

### Success Criteria

Priority Area leads can assess the state of their entire strategic objective in under 3 minutes.

---

## 04 — Project

### Purpose

Governance and coordination across all interventions within a programme. Projects are the management layer — they do not contain individual work; they govern Interventions that do.

### Primary Users

- Project Managers
- Programme Directors
- Portfolio Managers
- Finance Leads (for budget governance)

### Questions This Screen Answers

- Are interventions progressing on schedule?
- Where are the delays, blockers, or risks?
- What decisions are required at programme level?
- What is the programme budget position?
- What milestones are approaching?

### Navigation Entry

From Priority Area → Project row. From Workspace Home sidebar. Route: `/projects/[id]`.

### Required Sections

| Section | Content | Position |
|---------|---------|---------|
| Executive Summary | Auto-generated from live intervention data; one paragraph | Header |
| Intervention Overview | Table of all Interventions with health, owner, budget, milestones | Primary |
| Budget | Programme-level budget with Intervention breakdown | Supporting |
| Programme Timeline | All Interventions on a shared timeline — milestones, phases | Below primary |
| Risks | Programme risks, with escalation path | Supporting right |
| Milestones | Key programme milestones — required before project can complete | Supporting |
| Recent Decisions | Last 5 decisions recorded at programme level | Supporting |
| Activity Feed | What changed across all interventions in this programme | Supporting |

### Optional Sections

| Section | When to Show |
|---------|-------------|
| Reports | If reports have been generated for this project |
| External Stakeholders | If stakeholder mapping is configured |

### Never Include

- Task boards or kanban views (these belong at Intervention level)
- Individual activity checklists
- Large forms or configuration panels
- Team capacity planning (this lives in Team screen)

### Primary Actions

- Create Intervention
- Review Budget
- Record Decision
- Generate Project Report

### Tabs

`Overview` → `Interventions` → `Timeline` → `Budget` → `Milestones` → `Risks` → `Decisions` → `Reports` → `Team` → `History` → `Settings`

### Default Layout

```
┌──────────────────────────────────────────────────────────────┐
│ Workspace / Portfolio / Education / Curriculum Review        │
│ Curriculum Review                 [Healthy]  [+ Intervention]│
│ 2024 national curriculum update across all key stages       │
├──────────────────────────────────────────────────────────────┤
│ [Overview]  [Interventions]  [Timeline]  [Budget]  [More ▾] │
├──────────────────────────────────────────────────────────────┤
│ Executive Summary (auto-generated from live data)           │
│ "3 of 6 interventions are on track. Key Stage 2 delivery    │
│ is at risk due to supplier delay. Budget is 72% consumed    │
│ with 8 months remaining."                                    │
├──────────────────────────────────────────────────────────────┤
│ Interventions (6)                      [Filter]  [Group by] │
│ Name              Health    Owner     Budget   Milestones   │
│ KS2 Update        ● At Risk Ahmed     82%      1/3 done     │
│ KS3 Update        ● Healthy Sarah     67%      2/3 done     │
├───────────────────────────────────┬──────────────────────────┤
│ Programme Timeline                │ Risks (3)                │
│ KS2: ─────████░░░░               │ Supplier delay: High     │
│ KS3: ─────────███░               │ Budget overrun: Medium   │
└───────────────────────────────────┴──────────────────────────┘
```

### Interaction Patterns

- Intervention rows click through to the full Intervention page (primary destination)
- Timeline items open the milestone or intervention Inspector
- Risk items open risk Inspector
- Decision items open the decision record in Inspector
- Activity Feed items link to the changed object

### Empty State

New project with no interventions: "This project has no interventions yet. Interventions are where delivery happens." + [Create First Intervention] button.

### Performance

- Project overview with 50+ interventions must load primary table within 2 seconds
- Executive summary regeneration must complete within 3 seconds
- Timeline must handle 200+ milestones without layout failure

### Success Criteria

Project managers can identify the most at-risk interventions within 30 seconds without filtering.
