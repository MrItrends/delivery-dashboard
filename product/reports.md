# Reports

## Purpose

Reports transform delivery data into structured communication. They serve government executives, donors, parliament, and the public — not delivery teams.

Reports are **generated**, not authored.

---

## Business Goal

Eliminate the hours wasted manually writing delivery updates from scratch. Reports should assemble themselves from live data and require only minimal human input.

---

## Core Philosophy

Reports are the **output of delivery**, not a separate task on top of it.

If delivery teams are spending significant time writing reports, the system is failing them. The database should already know what to say.

---

## Report Types

| Report | Audience | Frequency |
|--------|---------|-----------|
| Executive Summary | President, PM, Ministers | Weekly |
| Quarterly Progress | Parliament, Donors | Quarterly |
| Priority Area Report | Portfolio Leadership | Monthly |
| Project Status | Stakeholders | Monthly |
| Budget Report | Finance, Parliament | Monthly |
| Milestone Report | Programme Board | On demand |
| Risk Report | Leadership | Monthly |
| Audit Report | Auditors, Parliament | Annual |
| Custom Report | Ad hoc needs | On demand |

---

## Report Anatomy

```
Report
├── Title
├── Period
├── Type
├── Generated Date
├── Author
├── Approval Status
├── Sections
├── Data Sources
├── Attached Files
├── Comments
├── Distribution List
└── History
```

---

## Report Sections (Configurable)

| Section | Description |
|---------|-------------|
| Executive Summary | Auto-generated narrative |
| Portfolio Overview | Health, progress, status |
| Highlights | Key achievements |
| Challenges | Risks and blockers |
| Budget | Financial summary |
| Milestones | Achieved, upcoming |
| KPIs | Targets, actuals, trends |
| Activities | Progress by intervention |
| Next Period | Planned priorities |
| Decisions Needed | Pending decisions |
| Custom Narrative | Manual author input |

---

## Report Generation

1. Select report type and period
2. Choose scope: Workspace / Portfolio / Project / Intervention
3. Select sections to include
4. Preview generated content
5. Add narrative commentary if needed
6. Submit for review
7. Approve and distribute

The system assembles the report. The user reviews and supplements it.

---

## Report Approval

```
Draft → Review → Approved → Distributed
```

| Role | Action |
|------|--------|
| Author | Generate, edit |
| Reviewer | Review, request changes |
| Approver | Formally approve |
| Distributor | Send to stakeholders |

---

## Export Formats

- PDF (government-quality typeset)
- Word
- CSV (data tables)
- Shareable Link (web view)

---

## Scheduling

Reports can be scheduled: Weekly, Monthly, Quarterly, Custom cadence. Recipients notified automatically.

---

## Report History

Every report is permanently stored and versioned. Old reports are never deleted. Version history is visible.

---

## Claude Implementation Notes

Reports should feel like a **publication tool**, not a form. The final output should be genuinely presentable to ministers and donors without reformatting in a separate application.

Design the report preview as a real-time document view — not a table of values. Typography, hierarchy, and whitespace matter here. The government should be proud to distribute it.

Do not design the report builder as a series of checkboxes. It should feel like a **guided publication workflow**.
