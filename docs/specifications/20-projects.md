# 20 — Projects

## Purpose

Projects transform strategic intent into coordinated delivery programmes.

Unlike traditional project management software, **Projects are not where day-to-day work happens**. Projects provide **governance**. Interventions provide **execution**.

A Project exists to coordinate multiple Interventions that collectively achieve one measurable government outcome.

---

## Business Goal

Provide programme managers with a governance workspace that enables planning, monitoring, funding, coordination and reporting across multiple Interventions while preserving a clear separation between strategy and execution.

---

## User Goal

When a Project Manager opens a Project they should immediately understand:

- Are we on track?
- Which interventions need attention?
- Where are the biggest delivery risks?
- Is funding sufficient?
- What decisions require approval?
- Which milestones are approaching?
- Which interventions are blocked?

**Projects should answer management questions. Interventions answer execution questions.**

---

## Core Philosophy

- Projects **coordinate**. They do not execute.
- Projects **organize**. They do not own Activities.
- Projects **monitor**. They do not replace Interventions.

This distinction keeps the platform scalable. Without it, Projects eventually become overloaded with operational detail.

---

## Mental Model

Think of a Project as the **programme board**. It contains:
- Strategy
- Governance
- Funding
- Dependencies
- Reporting
- Reviews
- Interventions

Everything else happens **inside the Interventions**.

---

## Object Anatomy

```
Project
├── Overview
├── Executive Summary
├── Interventions
├── Timeline
├── Budget
├── Targets
├── Risks
├── Dependencies
├── Team
├── Reports
├── Decisions
├── Files
├── Activity Feed
└── Settings
```

> Activities are intentionally absent. They are accessed through Interventions.

---

## Required Fields

### Identity
| Field | Description |
|-------|-------------|
| Project Name | Clear programme title |
| Reference Number | System identifier |
| Description | Programme overview |
| Programme Type | Classification |
| Priority Area | Strategic parent |
| Portfolio | Top-level grouping |
| Category | Type of initiative |

### Ownership
| Field | Description |
|-------|-------------|
| Project Director | Senior accountable owner |
| Programme Manager | Operational lead |
| Executive Sponsor | Leadership champion |
| Lead Ministry | Primary ministry |
| Supporting Ministries | Contributing ministries |
| Delivery Office | Implementation unit |

### Planning
| Field | Description |
|-------|-------------|
| Start Date | Programme begin |
| End Date | Target completion |
| Current Phase | Active lifecycle stage |
| Review Cycle | Frequency of reviews |
| Programme Status | Overall health |

### Financial
| Field | Description |
|-------|-------------|
| Allocated Budget | Total approved funding |
| Committed Budget | Legally committed spend |
| Spent Budget | Actual expenditure |
| Funding Sources | All funding streams |
| Funding Gap | Required minus confirmed |
| Forecast | Projected total cost |

### Delivery
| Field | Description |
|-------|-------------|
| Health Score | Calculated composite |
| Intervention Count | Number of interventions |
| Milestones | Progress markers |
| KPIs | Target indicators |
| Risks | Open risk count |
| Dependencies | External dependencies |
| Delivery Confidence | Team assessment |

---

## Project Lifecycle

```
Concept
  ↓
Planning
  ↓
Approved
  ↓
Active Delivery
  ↓
Executive Review
  ↓
Completed
  ↓
Archived
```

Projects often span multiple years. The lifecycle should support long-running programmes without encouraging unnecessary closure.

---

## Primary Views

### Overview (Default)
Displays: Executive Summary, Programme Health, Funding, Intervention Health, Recent Decisions, Upcoming Reviews, Key Metrics

### Interventions
The most important Project view. Displays every Intervention contributing to the programme.

Supports: Table, Cards, Timeline, Grouped Views, Health Comparison, Bulk Navigation

The Project should encourage users to **move into Interventions** rather than manage execution directly.

### Timeline
Displays: Major Milestones, Intervention Phases, Executive Reviews, Funding Releases, Government Deadlines, Dependencies

### Budget
Programme-level financial overview: Allocated, Released, Committed, Spent, Remaining, Forecast, Funding Sources, Funding Gaps

Budget health is calculated automatically.

### Targets
Every strategic KPI attached to the Project. Targets should aggregate lower-level delivery data wherever possible.

### Risks
Programme Risk Register. Each risk includes: Description, Impact, Likelihood, Mitigation, Owner, Review Date, Status, Escalation Path

Unlike Activity blockers, Project risks represent **strategic threats**.

### Reports
Generate: Quarterly Reports, Progress Reports, Funding Reports, Performance Reports, Cabinet Briefings

Reports are generated, not manually authored.

### Decisions
Projects maintain a formal decision register. Each decision records: Title, Decision Maker, Date, Reason, Outcome, Affected Interventions, Supporting Documents

Decision records become permanent institutional knowledge.

---

## Screen Architecture

```
┌──────────────────────────────────────────────────────────┐
│ Project Header: Name, Status, Owner, Actions             │
├──────────────────────────────────────────────────────────┤
│ Health │ Budget │ KPIs │ Timeline │ Risks                │
├──────────────────────────────────────────────────────────┤
│ Executive Summary (live, data-driven)                    │
├──────────────────────────────────────────────────────────┤
│ Intervention Overview (health cards + table)             │
├───────────────────────────────┬──────────────────────────┤
│ Timeline                      │ Decisions               │
├───────────────────────────────┴──────────────────────────┤
│ Budget Performance                                       │
├──────────────────────────────────────────────────────────┤
│ Recent Programme Activity                                │
└──────────────────────────────────────────────────────────┘
```

---

## Intervention Overview

Projects should visualize every Intervention as a first-class object. Each Intervention displays:
- Name
- Health
- Owner
- Completion
- Budget
- Milestones
- Dependencies
- Last Updated

Project Managers should identify struggling Interventions within seconds.

---

## Executive Summary

The Executive Summary is not a report. It is a **continuously updated narrative** generated from live delivery data.

It answers:
- What is progressing well?
- What requires attention?
- What decisions are pending?
- Where are the greatest risks?

This section should eventually support AI-assisted summarization while remaining grounded in underlying data.

---

## Programme Health

Calculated from:
- Intervention Health
- Milestone Completion
- Budget Performance
- Target Achievement
- Risk Exposure
- Delivery Velocity
- Review Status

Health should be explainable rather than opaque.

---

## Collaboration Model

Projects support collaboration at the **governance level**. Users can:
- Comment
- Mention
- Review
- Approve
- Attach Programme Documents
- Record Decisions
- Share Reports

Operational discussion belongs inside Interventions. Programme discussion belongs here.

---

## Activity Feed

Projects maintain a governance-focused activity feed:
- Intervention Created
- Funding Approved
- Executive Review Scheduled
- Target Updated
- Programme Risk Escalated
- Decision Recorded
- Milestone Achieved

Operational updates remain inside Interventions to avoid noise.

---

## Automation Rules

| Trigger | Action |
|---------|--------|
| All Interventions complete | Recommend Project completion |
| Budget exceeds threshold | Notify Finance Lead |
| Programme Health → Critical | Notify Executive Sponsor |
| Executive Review approaches | Generate briefing package |

---

## Empty State

Creating a new Project should guide users through:

1. Define Programme Objective
2. Assign Leadership
3. Establish Budget
4. Create Initial Interventions
5. Define Strategic Targets
6. Configure Review Schedule
7. Invite Delivery Teams

---

## Edge Cases

- Projects spanning multiple ministries
- Programme restructuring during execution
- Budget reductions after approval
- Interventions moving between Projects
- Leadership changes
- Priority Area reassignment
- Merged Projects
- Archived but reportable programmes

Historical integrity must always be preserved.

---

## Claude Implementation Notes

Do not design the Project as a giant task board.

The Project should feel closer to a **programme management workspace** than a traditional project management application. Its primary responsibility is **coordination**.

Execution belongs inside Interventions.

The visual hierarchy should communicate:
```
Programme → Interventions → Delivery
```
Not:
```
Programme → Tasks
```

---

## Review Checklist

- [ ] Projects coordinate rather than execute
- [ ] Intervention health is immediately visible
- [ ] Executive summaries communicate programme status without requiring manual updates
- [ ] Budget, targets and risks remain connected
- [ ] Governance discussions are separated from operational conversations
- [ ] Programme decisions become permanent records
- [ ] Navigation naturally encourages movement into Interventions for detailed work
- [ ] The Project feels like a strategic management layer rather than another task management screen
