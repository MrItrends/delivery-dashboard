# Interventions ⭐

> The collaborative heart of the Delivery Dashboard.

## Purpose

Interventions are the **operational heart** of the Delivery Dashboard. If the Workspace is the organization, the Portfolio is strategy, the Priority Area is national intent, and the Project is programme governance — then the **Intervention is where delivery actually happens**.

Every meaningful piece of work in the platform originates here.

---

## Business Goal

Provide multidisciplinary delivery teams with a collaborative workspace where planning, execution, communication, accountability and reporting happen in one place.

The Intervention should become the page users spend the **majority of their working day** inside.

---

## User Goal

When opening an Intervention, users immediately understand:
- What are we trying to deliver?
- What is happening today?
- Who is responsible?
- What is blocked?
- What changed recently?
- What evidence exists?
- What happens next?

---

## Core Philosophy

The Intervention is not a page. **It is a living workspace.** Everything inside it evolves continuously.

- Projects **organize**
- **Interventions deliver**

---

## Mental Model

Think of the Intervention as:
- A Figma file
- A Notion workspace
- A Linear project
- A GitHub repository

A persistent collaborative environment where all related work converges.

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

## Required Fields

### Identity
| Field | Description |
|-------|-------------|
| Intervention Name | Clear, outcome-focused title |
| Description | Detailed delivery objective |
| Reference Number | System identifier |
| Project | Parent project |
| Priority Area | Strategic context |
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
| Start Date | Execution begin |
| Target Completion | Planned end date |
| Current Phase | Active lifecycle stage |
| Next Review | Scheduled review date |

### Health Metrics
| Field | Description |
|-------|-------------|
| Overall Health | Calculated composite score |
| Delivery Confidence | Team-assessed confidence |
| Risk Score | Aggregated risk severity |
| Budget Health | Financial status |
| Schedule Health | Timeline status |

---

## Intervention Health

Automatically calculated from:
- Activity Completion
- Milestone Progress
- Budget Utilization
- Risk Severity
- Target Achievement
- Dependency Status
- Approval Delays
- Recent Delivery Velocity

**Users should always understand why health changed.**

---

## Lifecycle

```
Draft → Planning → Approved → Execution → Review → Completed → Archived
```

Supports long-running government programmes without forcing artificial closure.

---

## Primary Views

### Overview (Default)
Summary, Health, Recent Activity, Timeline, Upcoming Work, Team, Quick Actions

### Activities
Table, Board, Timeline, Calendar, Grouped Views, Saved Filters, Bulk Editing

### Timeline
Visual roadmap. Zoom from weeks to quarters. Shows Milestones, Dependencies, Deadlines, Reviews.

### Milestones
Grouped by: Completed, Upcoming, Delayed, Blocked

### Budget
Allocated, Committed, Spent, Remaining, Forecast, Funding Sources, Approvals

### Targets
KPIs, Progress, Baseline, Current Value, Target Value, Forecast, Trend

### Risks
Description, Owner, Impact, Likelihood, Mitigation, Status, Review Date, Escalation

### Files
Evidence, Contracts, Presentations, Policies, Photos, Meeting Notes

### Discussion
Threads, Mentions, Attachments, Resolved Discussions, Decision References

### Decisions
Every important decision formally recorded: Decision, Owner, Date, Reason, Outcome, Affected Objects

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
│                      │ Discussion                   │
├──────────────────────┴──────────────────────────────┤
│ Milestones                                          │
├─────────────────────────────────────────────────────┤
│ Files & Evidence                                    │
└─────────────────────────────────────────────────────┘
```

---

## Collaboration Model

Interventions are collaborative by default:
- Comments with @mentions
- Assignments with notifications
- Reviews and approvals
- Presence indicators (avatar stacks, "viewing now")
- Activity timeline
- Discussion threads

---

## Activity Feed

Every meaningful change appears:
- Activity Completed / Budget Updated / Milestone Achieved
- Risk Added / File Uploaded / Comment Added
- Approval Requested / Target Updated / Decision Recorded

Nothing important should happen silently.

---

## Automation Rules

| Trigger | Action |
|---------|--------|
| All Activities complete | Suggest Milestone completion |
| Budget exceeds threshold | Notify Finance Lead |
| Milestone becomes overdue | Escalate to Project Manager |
| Health → Critical | Notify Executive Sponsor |

---

## Permissions

| Role | Access |
|------|--------|
| Intervention Lead | Full management |
| Project Manager | View + strategic updates |
| Contributors | Activities + comments |
| Observers | Read-only |

---

## Empty State Setup Flow

1. Define delivery objective
2. Assign Intervention Lead
3. Create milestones
4. Add activities
5. Upload supporting documents
6. Define targets
7. Invite collaborators
8. Begin execution

---

## Edge Cases

- Intervention spans multiple ministries
- Intervention exceeds planned duration
- Funding withdrawn mid-delivery
- Activities reassigned during execution
- Leadership changes
- Targets redefined
- Multiple interventions depend on each other

Historical records must remain intact regardless of organizational changes.

---

## Claude Implementation Notes

The Intervention is the **center of gravity** for the Delivery Dashboard. Design it as if it were the product's primary screen.

Combine:
- The focus of **Linear**
- The contextual collaboration of **Figma**
- The structured execution of **Atlassian**

While remaining calm, spacious, and typography-led.

> Avoid designing it as a traditional dashboard with disconnected widgets. Build it as a unified workspace where every panel contributes to one goal: **Deliver this intervention successfully.**

---

## Review Checklist

- [ ] New team member understands objective within one minute
- [ ] Ownership visible everywhere it matters
- [ ] Activities, milestones, risks, and budget connected — not isolated
- [ ] Activity feed communicates meaningful progress
- [ ] Users can collaborate without leaving the workspace
- [ ] Every important decision leaves a permanent record
- [ ] Interface encourages execution over reporting
- [ ] Feels like a living workspace, not a static dashboard
