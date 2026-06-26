# Activities ⭐

> The execution engine of the Delivery Dashboard.

## Purpose

Activities are the **smallest executable unit**. Nothing gets delivered without Activities. The Activity system is not simply a task manager — it is the **execution engine** of the Delivery Dashboard.

---

## Business Goal

Create an execution experience that is fast, collaborative and scalable enough to support thousands of concurrent government activities without becoming overwhelming. Activities should encourage action, not administration.

---

## User Goal

When opening an Activity, users instantly understand:
- What needs to be done
- Why it matters
- Who owns it
- When it is due
- What is blocking it
- What changed recently
- What happens after completion

---

## Core Philosophy

Activities are not isolated tasks. **Activities represent commitments.**

```
Activity → Intervention → Project → Priority Area → National Outcome
```

Every completed Activity moves government delivery forward.

---

## Mental Model

Best ideas from: Linear (speed), GitHub Issues (contextual discussion), Notion Tasks (flexible structure), Jira (structured workflows) — **without their complexity**.

---

## Object Anatomy

```
Activity
├── Summary
├── Description
├── Owner
├── Contributors
├── Due Date
├── Status
├── Priority
├── Dependencies
├── Checklist
├── Files
├── Comments
├── Activity Feed
├── Evidence
├── Time Log
├── History
└── Automation
```

---

## Required Fields

### Identity
| Field | Description |
|-------|-------------|
| Activity Title | Clear, action-oriented title |
| Reference Number | System identifier |
| Description | Full context and requirements |
| Category | Type classification |
| Tags | Freeform labels |

### Ownership
| Field | Description |
|-------|-------------|
| Owner | Single accountable person |
| Contributors | Supporting team members |
| Reviewer | Who reviews completion |
| Approver | Who formally approves |

### Planning
| Field | Description |
|-------|-------------|
| Start Date | When work begins |
| Due Date | Target completion |
| Priority | Critical / High / Normal / Low |
| Estimated Duration | Planned effort |

### Relationships
| Field | Description |
|-------|-------------|
| Intervention | Parent intervention |
| Milestone | Contributing milestone |
| Target | KPI being supported |
| Dependencies | Blocking/blocked activities |

---

## Activity Lifecycle

```
Draft → Ready → Assigned → In Progress → In Review → Completed → Verified → Archived
```

Completion is not always the final state. Government work often requires **verification** before closure.

---

## Status System

| Status | Meaning |
|--------|---------|
| Not Started | Exists but not yet begun |
| Planned | Scheduled for future |
| Assigned | Owner designated |
| In Progress | Actively being worked |
| Waiting | Paused, awaiting input |
| Blocked | Cannot proceed |
| At Risk | In danger of missing deadline |
| In Review | Under assessment |
| Completed | Work finished |
| Verified | Completion confirmed |
| Archived | Closed permanently |

---

## Priority Levels

| Level | Usage |
|-------|-------|
| Critical | Blocks everything else |
| High | Important, time-sensitive |
| Normal | Standard delivery work |
| Low | Nice-to-have, flexible timing |

---

## Activity Views

### Table View (Default)
Sorting, Filtering, Grouping, Inline Editing, Column Pinning, Bulk Actions, Saved Views, Keyboard Navigation

**This is the primary operational interface.**

### Board View
Organized by Status. Drag-and-drop transitions. Ideal for delivery meetings.

### Timeline View
Chronological. Shows overlaps, bottlenecks and delivery pacing. Useful for dependency planning.

### Calendar View
Focuses on deadlines. Daily / Weekly / Monthly / Agenda.

### My Work
Personal workspace. Displays only Activities relevant to the current user.

---

## Activity Drawer (Inspector)

Clicking an Activity opens a right-side Inspector. Preserves context while exposing complete detail.

**Contains:** Summary, Description, Discussion, History, Files, Dependencies, Checklist, Approvals, Evidence, Recent Activity

---

## Inline Editing

Users can modify directly in the table:
- Status, Priority, Owner, Due Date, Tags, Progress

No drawer required for simple changes.

---

## Bulk Actions

Select multiple Activities and: Assign, Move, Archive, Delete, Update Status, Change Due Date, Export, Add Labels

---

## Checklists

Structured subtasks within an Activity. Cannot have owners, lifecycles, or appear in reports independently. Simply help complete the Activity.

---

## Dependencies

| Type | Meaning |
|------|---------|
| Finish → Start | B cannot start until A finishes |
| Start → Start | B cannot start until A starts |
| Finish → Finish | B cannot finish until A finishes |
| Blocked By | Direct blocking relationship |

Dependencies visible directly within the Activity. **Hidden dependencies create delivery risk.**

---

## Evidence

Permanently attached proof: Documents, Photos, Videos, Contracts, Meeting Notes, Certificates, URLs.

---

## Activity Feed (History)

Immutable history: Created, Assigned, Started, Status Changed, Comment Added, Evidence Uploaded, Due Date Changed, Completed, Verified.

**History cannot be edited.**

---

## Automation Rules

| Trigger | Action |
|---------|--------|
| Completed | Notify Reviewer |
| Overdue | Notify Owner + Manager |
| Blocked | Notify Dependency Owner |
| Verified | Update Milestone Progress, Refresh Reports |

---

## Performance Requirements

- 100,000+ Activities supported
- Real-time collaboration
- Virtualized tables
- Optimistic updates
- Instant search
- Keyboard-first workflows

---

## Accessibility

Fully usable without a mouse: Keyboard navigation, Screen readers, Focus management, Reduced motion, High contrast, Accessible tables.

---

## Claude Implementation Notes

The Activity system is the **most frequently used part of the entire platform**. Design it for speed. Not decoration.

The default Table View should feel closer to **Linear, Airtable and modern Jira** than traditional government software.

**Prioritize:** Typography, Whitespace, Information density, Keyboard workflows, Inline editing, Fast filtering, Persistent context.

Avoid unnecessary modal windows. Prefer inspector panels, contextual menus and progressive disclosure. Every interaction should minimize interruption.

---

## Review Checklist

- [ ] Activities managed without leaving current context
- [ ] Inline editing is the default for simple changes
- [ ] Dependencies visible and understandable
- [ ] History complete and immutable
- [ ] Collaboration happens inside the Activity
- [ ] Evidence and decisions permanently linked
- [ ] Performance scales to very large datasets
- [ ] Interface encourages execution rather than administration
