# 21 — Milestones

## Purpose

Milestones represent **meaningful delivery outcomes**. They are not tasks. They are not activities. They are measurable moments that demonstrate real progress.

- Activities answer: *"What needs to be done?"*
- Milestones answer: *"What has actually been achieved?"*

A government team may complete one hundred Activities without producing a meaningful outcome. **The platform should celebrate outcomes rather than effort.**

---

## Business Goal

Provide a trusted mechanism for measuring delivery progress through clearly defined, evidence-backed outcomes. Milestones become the primary language of progress between delivery teams and leadership.

---

## User Goal

When viewing a Milestone, users should immediately understand:

- What outcome is expected?
- Has it been achieved?
- What evidence supports completion?
- Which Activities contributed?
- What happens next?
- Who approved it?
- Does it unlock subsequent work?

---

## Core Philosophy

> A Milestone represents an outcome, not work.

**Good milestone:** "Regional Hospital Commissioned"
**Poor milestone:** "Complete Hospital Tasks"

Every Milestone should represent something that leadership can confidently report as achieved.

---

## Mental Model

Milestones are **gates**. Delivery passes through them.

```
Activities exist to produce Milestones
Milestones produce Project Progress
Projects produce Priority Area outcomes
```

---

## Object Anatomy

```
Milestone
├── Overview
├── Description
├── Outcome
├── Evidence
├── Activities
├── Dependencies
├── Approval
├── Review
├── Timeline
├── History
└── Discussion
```

---

## Required Fields

### Identity
| Field | Description |
|-------|-------------|
| Milestone Name | Outcome-oriented title |
| Reference Number | System identifier |
| Description | Expected outcome detail |
| Category | Classification |

### Ownership
| Field | Description |
|-------|-------------|
| Owner | Accountable person |
| Reviewer | Who assesses completion |
| Approver | Who formally approves |
| Executive Sponsor | Leadership champion |

### Relationships
| Field | Description |
|-------|-------------|
| Intervention | Parent intervention |
| Project | Parent project |
| Priority Area | Strategic context |
| Target | KPI being supported |
| Dependencies | Blocking/blocked milestones |

### Timeline
| Field | Description |
|-------|-------------|
| Target Date | Expected achievement |
| Achieved Date | Actual completion |
| Review Date | Scheduled review |
| Approval Date | When approved |

### Progress
| Field | Description |
|-------|-------------|
| Status | Current state |
| Confidence | Achievement confidence |
| Evidence Count | Supporting documents |
| Completion % | Progress indicator |
| Health | Calculated signal |

---

## Milestone Lifecycle

```
Draft
  ↓
Planned
  ↓
Active
  ↓
Ready for Review
  ↓
Approved
  ↓
Achieved
  ↓
Archived
```

> Notice there is no "In Progress." Work happens inside Activities. Milestones are either approaching or achieved.

---

## Milestone Status

| Status | Meaning |
|--------|---------|
| Planned | Scheduled, not yet active |
| On Track | Progressing as expected |
| At Risk | Delivery confidence decreasing |
| Delayed | Past target date |
| Awaiting Review | Evidence submitted |
| Approved | Formally signed off |
| Achieved | Outcome confirmed |
| Archived | Closed permanently |

---

## Evidence

Evidence is **mandatory** before a Milestone can be approved. May include:
- Official Documents
- Photographs
- Contracts
- Reports
- Meeting Minutes
- Government Publications
- External Links
- Certificates
- Media Coverage

Evidence remains permanently attached.

---

## Approval Workflow

```
Completed Activities
  ↓
Evidence Submitted
  ↓
Review Requested
  ↓
Approved
  ↓
Milestone Achieved
```

Every approval records: Reviewer, Timestamp, Comments, Decision, Supporting Evidence.

---

## Views

### Timeline (Primary)
Shows: Upcoming, Completed, Delayed, Review Dates, Dependencies

### Table
Supports: Sorting, Filtering, Grouping, Export, Bulk Review

### Calendar
Useful for executive planning. Displays: Review Dates, Target Dates, Achievement Dates

---

## Milestone Health

Calculated from:
- Activity Completion
- Evidence Readiness
- Review Delays
- Dependency Health
- Target Date
- Budget Availability

Health should never be manually assigned.

---

## Automation Rules

| Trigger | Action |
|---------|--------|
| All required Activities complete | Suggest review |
| Approval granted | Update Project Progress |
| Milestone achieved | Update KPIs |
| Delayed | Notify Project Manager |
| Evidence missing near deadline | Notify Owner |

---

## Claude Implementation Notes

Milestones should feel **ceremonial**. Completing one should feel significant.

Avoid making Milestones look like oversized Activities. Their purpose is different.

Design them around: **Outcome → Evidence → Approval → Achievement**

---

## Review Checklist

- [ ] Every Milestone represents an outcome
- [ ] Evidence is mandatory
- [ ] Approval is explicit
- [ ] Activities remain linked but separate
- [ ] Timeline communicates delivery history
- [ ] Reports update automatically
- [ ] Milestones remain meaningful for executives
