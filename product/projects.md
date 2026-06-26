# Projects

## Purpose

Projects transform strategic intent into coordinated delivery programmes. **Projects provide governance. Interventions provide execution.** This distinction is fundamental.

A Project exists to coordinate multiple Interventions — it does not manage day-to-day work.

---

## Business Goal

Provide programme managers with a governance workspace that enables planning, monitoring, funding, coordination and reporting across multiple Interventions while preserving a clear separation between strategy and execution.

---

## User Goal

When opening a Project, managers immediately understand:
- Are we on track?
- Which interventions need attention?
- Where are the biggest delivery risks?
- Is funding sufficient?
- What decisions require approval?
- Which milestones are approaching?

**Projects answer management questions. Interventions answer execution questions.**

---

## Core Philosophy

- Projects **coordinate**. They do not execute.
- Projects **organize**. They do not own Activities.
- Projects **monitor**. They do not replace Interventions.

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

## Lifecycle

```
Concept → Planning → Approved → Active Delivery → Executive Review → Completed → Archived
```

Projects often span multiple years.

---

## Primary Views

### Overview
Executive Summary (live, data-driven), Programme Health, Funding, Intervention Health, Recent Decisions, Upcoming Reviews.

### Interventions (Most Important)
Every Intervention contributing to the programme. Supports: Table, Cards, Timeline, Grouped Views, Health Comparison.

**The Project should encourage users to move into Interventions** rather than manage execution directly.

### Reports
Generate: Quarterly Reports, Progress Reports, Funding Reports, Cabinet Briefings. Reports are generated, not manually authored.

### Decisions
Formal decision register: Title, Decision Maker, Date, Reason, Outcome, Affected Interventions, Supporting Documents. Permanent institutional knowledge.

---

## Intervention Overview

Each Intervention displays: Name, Health, Owner, Completion, Budget, Milestones, Dependencies, Last Updated.

**Project Managers should identify struggling Interventions within seconds.**

---

## Executive Summary

A continuously updated narrative generated from live delivery data — not a manually written report. Answers: What's progressing well? What requires attention? What decisions are pending? Where are the greatest risks?

---

## Programme Health

Calculated from: Intervention Health, Milestone Completion, Budget Performance, Target Achievement, Risk Exposure, Delivery Velocity, Review Status.

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
│ Intervention Overview (health cards)                     │
├───────────────────────────────┬──────────────────────────┤
│ Timeline                      │ Decisions               │
├───────────────────────────────┴──────────────────────────┤
│ Budget Performance                                       │
├──────────────────────────────────────────────────────────┤
│ Recent Programme Activity                                │
└──────────────────────────────────────────────────────────┘
```

---

## Claude Implementation Notes

Do not design the Project as a giant task board.

The visual hierarchy should communicate:
```
Programme → Interventions → Delivery
```
Not:
```
Programme → Tasks
```

The Project completes the strategic-to-operational chain: **Workspace → Portfolio → Priority Area → Project → Intervention → Activity**
