# 18 — Interventions ⭐

> The collaborative heart of the Delivery Dashboard.

## Purpose

Interventions are the **operational heart** of the Delivery Dashboard.

If the Workspace is the organization, and the Portfolio is strategy, and the Priority Area is national intent, and the Project is programme governance, then the **Intervention is where delivery actually happens**.

Every meaningful piece of work in the platform originates here. This is where teams collaborate, evidence is collected, progress is updated, milestones are achieved, and government strategy becomes reality.

Unlike Projects, which primarily organize initiatives, Interventions are **living collaborative workspaces** designed for continuous execution.

---

## Business Goal

Provide multidisciplinary delivery teams with a collaborative workspace where planning, execution, communication, accountability and reporting happen in one place.

The Intervention should become the page users spend the majority of their working day inside.

---

## User Goal

When a user opens an Intervention they should immediately understand:

- What are we trying to deliver?
- What is happening today?
- Who is responsible?
- What is blocked?
- What changed recently?
- What evidence exists?
- What happens next?

The Intervention should eliminate the need to ask colleagues for status updates.

---

## Core Philosophy

The Intervention is not a page. **It is a living workspace.**

Everything inside it evolves continuously. Users should feel like they have entered an active room where delivery is taking place.

- Projects organize
- **Interventions deliver**

---

## Mental Model

Think of the Intervention as the equivalent of:
- A Figma file
- A Notion workspace
- A Linear project
- A GitHub repository

It is a persistent collaborative environment where all related work converges.

---

## Object Anatomy

```
Intervention
├── Overview
├── Activities
├── Milestones
├── Targets
├── Budget
├── Timeline
├── Dependencies
├── Risks
├── Files
├── Discussion
├── Decisions
├── Evidence
├── Activity Feed
├── Team
└── Settings
```

---

## Object Model

Every Intervention contains:
- Identity & Delivery Objective
- Expected Outcomes
- Owner & Team
- Timeline
- Health Score
- Activities
- Milestones
- Dependencies
- Evidence
- Discussion
- Approvals
- Reports
- History

---

## Required Fields

### Identity
| Field | Description |
|-------|-------------|
| Intervention Name | Clear, outcome-focused title |
| Description | Detailed delivery objective |
| Reference Number | System identifier |
| Project | Parent project |
| Priority Area | Strategic context |
| Portfolio | Top-level grouping |
| Delivery Phase | Current phase |
| Category | Type of intervention |

### Ownership
| Field | Description |
|-------|-------------|
| Intervention Lead | Single accountable owner |
| Supporting Team | Contributing members |
| Lead Ministry | Primary ministry |
| Partner Organizations | External collaborators |
| Review Committee | Oversight body |
| Executive Sponsor | Leadership accountability |

### Timeline
| Field | Description |
|-------|-------------|
| Created | Creation date |
| Start Date | Execution begin |
| Target Completion | Planned end date |
| Current Phase | Active lifecycle stage |
| Next Review | Scheduled review date |
| Last Updated | Last modification |

### Health Indicators
| Field | Description |
|-------|-------------|
| Overall Health | Calculated composite score |
| Delivery Confidence | Team-assessed confidence |
| Risk Score | Aggregated risk severity |
| Budget Health | Financial status |
| Schedule Health | Timeline status |
| Completion Trend | Direction of progress |

### Delivery Metrics
| Metric | Description |
|--------|-------------|
| Total Activities | Count of all activities |
| Completed Activities | Finished activities |
| Open Activities | Active activities |
| Blocked Activities | Activities unable to proceed |
| Completed Milestones | Achieved milestones |
| Upcoming Milestones | Approaching milestones |
| KPIs On Track | Targets meeting forecast |
| Budget Utilized | % of budget spent |

---

## Intervention Health

Health should be automatically calculated. Inputs include:
- Activity Completion
- Milestone Progress
- Budget Utilization
- Risk Severity
- Target Achievement
- Dependency Status
- Approval Delays
- Recent Delivery Velocity

Users should always understand **why** health changed.

---

## Lifecycle

```
Draft
  ↓
Planning
  ↓
Approved
  ↓
Execution
  ↓
Review
  ↓
Completed
  ↓
Archived
```

The lifecycle should support long-running government programmes without forcing artificial closure.

---

## Primary Views

### Overview (Default)
Contains: Summary, Health, Recent Activity, Timeline, Upcoming Work, Team, Quick Actions

### Activities
Execution workspace. Supports: Table, Board, Timeline, Calendar, Grouped Views, Saved Filters, Bulk Editing

### Timeline
Visual roadmap. Shows: Milestones, Dependencies, Deadlines, Reviews, Government Events

Timeline should support zooming from weeks to quarters.

### Milestones
Dedicated milestone workspace. Grouped by: Completed, Upcoming, Delayed, Blocked

### Budget
Displays: Allocated, Committed, Spent, Remaining, Forecast, Funding Sources, Approvals

Budget should never require navigating elsewhere.

### Targets
Displays: KPIs, Progress, Baseline, Current Value, Target Value, Forecast, Trend

Every target links back to activities contributing to it.

### Risks
Each risk contains: Description, Owner, Impact, Likelihood, Mitigation, Status, Review Date, Escalation

### Files
Examples: Evidence, Contracts, Presentations, Policies, Photos, Meeting Notes

Files should always maintain context.

### Discussion
Supports: Threads, Mentions, Attachments, Resolved Discussions, Decision References

Users should never need to move conversations into email.

### Decisions
Every important decision should be recorded:
- Decision
- Owner
- Date
- Reason
- Outcome
- Affected Objects

This creates institutional memory.

---

## Screen Architecture

```
┌─────────────────────────────────────────────────────┐
│ Header: Name, Status, Owner, Breadcrumb, Actions    │
├─────────────────────────────────────────────────────┤
│ Health │ Timeline │ Budget │ KPIs │ Risks           │
├─────────────────────────────────────────────────────┤
│ Summary / Delivery Objective                        │
├──────────────────────┬──────────────────────────────┤
│ Activities           │ Recent Activity Feed         │
│                      │                              │
│                      │ Discussion                   │
│                      │                              │
├──────────────────────┴──────────────────────────────┤
│ Milestones                                          │
├─────────────────────────────────────────────────────┤
│ Files & Evidence                                    │
└─────────────────────────────────────────────────────┘
```

---

## Interaction Model

- Click Activity → Inspector opens (context preserved)
- Inline editing for status, owner, dates
- Drag to reorder activities
- Right-click for context menu
- ⌘K for Command Palette

---

## Collaboration Model

Interventions are collaborative by default:
- Comments with @mentions
- Assignments with notifications
- Reviews and approvals
- Presence indicators
- Recent editor history
- Activity timeline
- Version history
- Discussion threads

Delivery should always feel shared.

---

## Activity Feed

Every meaningful change appears here:
- Activity Completed
- Budget Updated
- Milestone Achieved
- Risk Added
- File Uploaded
- Comment Added
- Approval Requested
- Target Updated
- Decision Recorded

Nothing important should happen silently.

---

## Permissions

| Role | Access |
|------|--------|
| Intervention Lead | Full management |
| Project Manager | View + Strategic updates |
| Contributors | Activities + Comments |
| Observers | Read-only |

---

## Notifications

Users following an Intervention receive notifications for:
- Assignments
- Health Changes
- Budget Changes
- New Risks
- Milestone Completion
- Comments & Mentions
- Approvals
- Files
- Decision Records

Notifications always link back to the originating object.

---

## Search Behaviour

Searching should locate:
- Intervention
- Activities
- Files
- Comments
- Risks
- Targets
- Milestones
- Evidence
- Users

Search should prioritize relevance over object type.

---

## Automation Rules

| Trigger | Action |
|---------|--------|
| All Activities complete | Suggest Milestone completion |
| Budget exceeds threshold | Notify Finance Lead |
| Milestone becomes overdue | Escalate to Project Manager |
| Health changes to Critical | Notify Executive Sponsor |
| Evidence uploaded | Trigger verification workflow |

Automation should reduce manual coordination, not replace human judgement.

---

## Empty State

A new Intervention should guide users through setup:

1. Define delivery objective
2. Assign Intervention Lead
3. Create milestones
4. Add activities
5. Upload supporting documents
6. Define targets
7. Invite collaborators
8. Begin execution

---

## Error States

Gracefully handle:
- Missing owner
- Budget unavailable
- Activity synchronization failure
- Permission restrictions
- Offline updates awaiting sync
- Archived dependencies
- Deleted linked objects

Errors should explain the problem and suggest the next action.

---

## Edge Cases

- Intervention spans multiple ministries
- Intervention exceeds planned duration
- Funding withdrawn mid-delivery
- Activities reassigned during execution
- Leadership changes
- Targets redefined
- Multiple interventions depend on each other

Historical records must remain intact even when organizational structures change.

---

## Future Expansion

- AI delivery summaries
- Predictive schedule forecasting
- Dependency impact simulation
- Geographic delivery maps
- External stakeholder collaboration
- Live document co-editing
- Integrated meeting notes
- Automated evidence extraction

---

## Claude Implementation Notes

The Intervention is the **center of gravity** for the Delivery Dashboard.

Design it as if it were the product's primary screen. Users should comfortably spend hours inside it.

It should combine:
- The focus of **Linear**
- The contextual collaboration of **Figma**
- The structured execution of **Atlassian**

While remaining calm, spacious, and typography-led.

Avoid designing it as a traditional dashboard with disconnected widgets. Instead, build it as a unified workspace where every panel contributes to one goal:

> **Deliver this intervention successfully.**

---

## Review Checklist

- [ ] Can a new team member understand the objective within one minute?
- [ ] Is ownership visible everywhere it matters?
- [ ] Are activities, milestones, risks, and budget connected rather than isolated?
- [ ] Does the activity feed communicate meaningful progress?
- [ ] Can users collaborate without leaving the workspace?
- [ ] Does every important decision leave a permanent record?
- [ ] Does the interface encourage execution over reporting?
- [ ] Does it feel like a living workspace rather than a static dashboard?
