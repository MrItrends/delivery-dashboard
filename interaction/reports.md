# Pattern 40 — Report Generation Flow

## Philosophy

Reports should **generate themselves** from live delivery data. The user's role is to select scope, review, and approve — not to manually assemble information.

Writing a report from scratch is not delivery work. It is bureaucracy that delays delivery.

---

## Report Generation Workflow

```
Choose Scope
    ↓
Choose Period
    ↓
Choose Audience
    ↓
Preview
    ↓
Generate
    ↓
Export / Share
```

---

## Step 1 — Choose Scope

| Scope Level | What's Included |
|-------------|----------------|
| Workspace | All portfolios, all projects |
| Portfolio | One portfolio, all priority areas |
| Priority Area | One objective, all projects |
| Project | One project, all interventions |
| Intervention | One intervention, all activities |

---

## Step 2 — Choose Period

| Period | Description |
|--------|-------------|
| This week | Last 7 days |
| This month | Current calendar month |
| Last month | Previous calendar month |
| This quarter | Current fiscal quarter |
| Last quarter | Previous fiscal quarter |
| Custom | User-defined date range |
| Year to date | Start of fiscal year to today |

---

## Step 3 — Choose Audience

Audience determines: level of detail, language, visual complexity, included sections.

| Audience | Detail Level |
|---------|-------------|
| President / PM | Summary only — health, key achievements, risks |
| Ministers | Priority area focus — outcomes, budget, milestones |
| Parliament / Donors | Full programme — methodology, targets, evidence |
| Operations | Detailed activities, dependencies, blockers |
| Audit | Complete evidence trail |

---

## Step 4 — Preview

The report preview shows the assembled report before generation.

Users can:
- Toggle sections on/off
- Add a custom narrative section
- Edit auto-generated summaries
- Add or remove data tables
- Review before committing

The preview is **live** — changes to section toggles update immediately.

---

## Step 5 — Generate

Generation is **asynchronous**. The user submits the report job and continues working.

```
┌──────────────────────────────────────────────────┐
│ Generating Q3 Progress Report...                 │
│ ████████████░░░░░░░  65%                         │
│ Assembling milestones                            │
│                                            [Cancel] │
└──────────────────────────────────────────────────┘
```

Progress steps shown: Gathering data, Calculating metrics, Assembling sections, Formatting, Ready.

When complete: notification appears, report opens automatically.

---

## Step 6 — Export / Share

| Format | Use Case |
|--------|---------|
| PDF | Official distribution, printing |
| Word | Further editing |
| CSV | Data tables for analysis |
| Web link | Shareable view (permission-controlled) |

---

## Report Scheduling

Reports can be scheduled to auto-generate:

| Frequency | Example |
|-----------|---------|
| Weekly | Every Monday morning |
| Monthly | First working day of each month |
| Quarterly | On fiscal quarter close |
| Custom | User-defined cron |

Scheduled reports are emailed to a distribution list and stored in the Reports archive.

---

## Report Approval

Before distribution, reports can require approval:

```
Generated → Reviewed → Approved → Distributed
```

The approver receives a notification and reviews the report before it is sent.

---

## Report History

Every generated report is stored permanently. Versions are tracked. Reports are never deleted.

Users can always access: what was reported, when, by whom, to whom, in what form.

This is essential for government accountability.
