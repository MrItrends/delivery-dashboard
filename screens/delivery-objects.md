# Screens 07–09: Milestones, Targets & Budget

---

## 07 — Milestones

### Purpose

Track and verify formal delivery checkpoints. Milestones are not tasks — they are evidence-backed commitments that delivery has reached a defined state. They require approval before being marked complete.

### Primary Users

- Delivery Managers (submitting evidence and managing milestone status)
- Project Managers (reviewing and approving milestones)
- Finance Leads (milestones often gate budget releases)
- Executives (understanding programme progress)

### Questions This Screen Answers

- Which milestones are due, and when?
- What evidence has been submitted?
- Which milestones are pending approval?
- Are any milestones at risk of slipping?
- What is the milestone completion rate?

### Navigation Entry

From Intervention → Milestones tab. From Project → Programme Timeline. Route: `/interventions/[id]/milestones`.

### Required Sections

| Section | Content |
|---------|---------|
| Milestone Timeline | Visual timeline of all milestones — past, present, future — with status |
| Evidence | Documents and files attached to each milestone as proof of completion |
| Approvals | Pending approvals with reviewer assignment and history |
| Dependencies | Which activities must complete before this milestone can be submitted |
| History | Immutable audit log of all milestone state changes with actor, time, notes |

### Never Include

- Activity boards or checklists (these are in the Activities view)
- Operational comment threads (these live in the Discussion tab)
- Budget allocation panels (these live in the Budget tab)

### Primary Actions

- Submit Evidence (attaches files and marks milestone as ready for review)
- Approve (reviewer only — requires evidence to be present)
- Review (opens evidence panel alongside milestone record)

### Milestone States

```
Planned → In Progress → Evidence Submitted → Under Review → Approved → Complete
                    ↓                    ↓
               Evidence Rejected     Returned for Revision
```

### Layout

```
┌──────────────────────────────────────────────────────────────┐
│ Milestones (3)                      [+ Milestone]  [Filter] │
├──────────────────────────────────────────────────────────────┤
│ Timeline                                                     │
│ M1: Q2 Planning Complete  ●──────────────── ✓ Approved      │
│ M2: Pilot Launch          ────────●──────── ⏳ Under Review  │
│ M3: Full Rollout          ────────────────● ○ Planned       │
├──────────────────────────────────────────────────────────────┤
│ Milestone 2: Pilot Launch                  [Submit Evidence] │
│ Due: 30 September 2024  ·  Under Review  ·  Sarah reviewing │
│                                                              │
│ Evidence Required:                                           │
│ ✓ Pilot plan document                                        │
│ ✓ Stakeholder sign-off                                       │
│ ✗ Launch confirmation (not yet uploaded)                     │
│                                                              │
│ Dependencies: 4 activities must complete first (3 done)     │
└──────────────────────────────────────────────────────────────┘
```

### Success Criteria

Delivery Managers can submit milestone evidence and track approval status without leaving the Intervention. Reviewers can approve or return milestones with a clear record of their decision.

---

## 08 — Targets & KPIs

### Purpose

Connect delivery work to measurable outcomes. Targets tell us whether the work we are doing is actually making a difference. They answer the "so what" question for every intervention.

### Primary Users

- Performance Analysts
- Senior Leaders
- Policy Teams
- Delivery Managers (checking whether their work is moving the needle)

### Questions This Screen Answers

- Are we achieving our stated outcomes?
- Is performance trending in the right direction?
- Where is performance weakest?
- What does the forecast suggest?
- How do we compare across regions or cohorts?

### Navigation Entry

From Intervention → Targets tab. From Priority Area → Performance tab. Route: `/interventions/[id]/targets`.

### Required Sections

| Section | Content |
|---------|---------|
| Target Summary | All targets for this object — current value, target, trend arrow, status |
| Trend Chart | Time-series chart for each target showing historical progress toward goal |
| Forecast | Projected trajectory — "At current rate, target will be met by [date]" |
| Evidence | Data sources and evidence files supporting current performance values |
| Historical Progress | Full history of recorded values with timestamps |
| Regional Comparison | Where configured — performance across geographies or cohorts |

### Never Include

- Operational work items or activities
- Comment threads or discussions
- Task management functionality
- Budget tables

### Primary Actions

- Update Progress (record a new data point against a target)
- Add Evidence (attach supporting data or documents)
- Set Forecast (update expected trajectory)

### Layout

```
┌──────────────────────────────────────────────────────────────┐
│ Targets & KPIs (4)                         [+ Add Target]   │
├──────────────────────────────────────────────────────────────┤
│ Target                     Current   Goal    Status  Trend  │
│ Pupil attendance rate      91.2%     95%     At Risk   ↓    │
│ Teacher retention          87%       90%     On Track  →    │
│ Curriculum coverage        73%       100%    At Risk   ↑    │
│ Parent satisfaction        4.1/5     4.5/5   On Track  ↑    │
├──────────────────────────────────────────────────────────────┤
│ Pupil Attendance Rate                                        │
│ [Line chart — 12 months of history + forecast line]         │
│ Current: 91.2%  Target: 95%  Forecast: 93.1% by Q4         │
│                                                              │
│ Last updated: Ahmed Yusuf, 15 Sep 2024                      │
│ Evidence: September attendance data (uploaded)              │
└──────────────────────────────────────────────────────────────┘
```

---

## 09 — Budget

### Purpose

Financial oversight for programme delivery. This is not accounting software — it is a tool for understanding whether programmes have the resources they need, and whether those resources are being used effectively.

### Primary Users

- Finance Leads
- Project Managers (monitoring budget health)
- Programme Directors
- Treasury and oversight teams

### Questions This Screen Answers

- What is our total approved budget?
- How much has been spent and committed?
- What is the forecast outturn?
- Are there funding gaps?
- Has expenditure been properly approved?
- What are the financial risks?

### Navigation Entry

From Intervention → Budget tab. From Project → Budget section. Route: `/interventions/[id]/budget`.

### Required Sections

| Section | Content |
|---------|---------|
| Funding Summary | Total approved, committed, spent, remaining, forecast outturn |
| Allocation | Breakdown by category — personnel, contractors, materials, etc. |
| Forecast | Projected spend vs. approved budget with confidence range |
| Funding Gap | Any difference between what is needed and what is approved |
| Approval History | Every budget change or expenditure approval with actor and timestamp |
| Financial Risks | Risks with financial impact — cost escalation, scope creep, funding uncertainty |

### Optional Sections

| Section | When to Show |
|---------|-------------|
| Funding Sources | If multiple funding streams (e.g., Departmental + External grant) |
| Procurement | If procurement records are linked |

### Never Include

- Accounting workflows (invoice processing, payroll)
- HR-related costs managed outside the system
- Individual expense claims
- Tax or regulatory compliance workflows

### Primary Actions

- Record Expenditure
- Request Budget Adjustment
- Approve Budget Change (Finance Lead or above only)
- Export Financial Summary

### Budget Health States

| State | Meaning | Visual |
|-------|---------|--------|
| On Track | Spend aligns with forecast | ● Green |
| Attention | Spending faster/slower than expected | ● Amber |
| At Risk | Forecast exceeds approved budget | ● Red |
| Underspend | Significant underspend — may lose funding | ● Amber |

### Layout

```
┌──────────────────────────────────────────────────────────────┐
│ Budget                                    [Request Change]   │
├──────────────────────────────────────────────────────────────┤
│ Approved   Committed   Spent       Remaining   Forecast      │
│ £2,400,000  £1,840,000  £1,200,000  £560,000   £2,480,000   │
│                                              ● At Risk (+3%) │
├──────────────────────────────────────────────────────────────┤
│ Spend by Category          │ Forecast vs Approved            │
│ Personnel     £640,000     │ [Area chart — monthly spend]    │
│ Contractors   £380,000     │                                 │
│ Materials     £120,000     │                                 │
│ Travel         £60,000     │                                 │
├────────────────────────────┴─────────────────────────────────┤
│ Approval History                                             │
│ Ahmed approved £50,000 reallocation · 14 Sept · ref: BA-091 │
│ Finance Lead approved original budget · 1 Mar · ref: BA-001  │
└──────────────────────────────────────────────────────────────┘
```

### Approval Workflow

```
Request → Finance Lead Review → Programme Director Approval → Recorded in History
```

Every change to approved budget creates an immutable record. No budget value can be edited without an approval record.

### Success Criteria

Finance leads and programme managers can understand the budget position — including risks — in under 2 minutes, without downloading a spreadsheet.
