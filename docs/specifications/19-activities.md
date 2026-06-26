# 19 — Activities ⭐

> The execution engine of the Delivery Dashboard.

## Purpose

Activities are the **smallest executable unit** within the Delivery Dashboard.

Nothing gets delivered without Activities. Policies are delivered through Activities. Infrastructure is delivered through Activities. Reforms are delivered through Activities.

Every milestone, KPI, budget and report ultimately depends on Activities being completed.

The Activity system is not simply a task manager. It is the **execution engine** of the Delivery Dashboard.

---

## Business Goal

Create an execution experience that is fast, collaborative and scalable enough to support thousands of concurrent government activities without becoming overwhelming.

Activities should encourage action, not administration. Users should spend more time completing work than updating the software.

---

## User Goal

When users open an Activity they should instantly understand:

- What needs to be done
- Why it matters
- Who owns it
- When it is due
- What is blocking it
- What changed recently
- What happens after completion

An Activity should never require additional explanation through email or meetings.

---

## Core Philosophy

Activities are not isolated tasks. **Activities represent commitments.**

```
Every Activity belongs to an Intervention
  Every Activity contributes to a Milestone
    Every Milestone contributes to a Project
      Every Project contributes to a Priority Area
        Every completed Activity moves government delivery forward
```

---

## Mental Model

The Activity experience should combine the best ideas from:
- **Linear** — speed and keyboard-first
- **GitHub Issues** — contextual discussion
- **Figma Comments** — collaborative by nature
- **Notion Tasks** — flexible structuring
- **Jira** — structured workflows

Without inheriting their complexity. The goal is **effortless execution**.

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
| Created By | User who created it |

### Planning
| Field | Description |
|-------|-------------|
| Start Date | When work begins |
| Due Date | Target completion |
| Estimated Duration | Planned effort |
| Actual Duration | Real effort logged |
| Priority | Critical / High / Normal / Low |
| Complexity | Estimated difficulty |

### Relationships
| Field | Description |
|-------|-------------|
| Intervention | Parent intervention |
| Project | Parent project |
| Priority Area | Strategic context |
| Milestone | Contributing milestone |
| Target | KPI being supported |
| Dependencies | Blocking/blocked by activities |

### Progress
| Field | Description |
|-------|-------------|
| Status | Current lifecycle state |
| Completion % | Progress indicator |
| Health | Calculated health signal |
| Risk | Risk level |
| Blockers | What is preventing progress |
| Last Updated | Last modification timestamp |

---

## Activity Lifecycle

```
Draft
  ↓
Ready
  ↓
Assigned
  ↓
In Progress
  ↓
In Review
  ↓
Completed
  ↓
Verified
  ↓
Archived
```

Unlike most task managers, **completion is not always the final state**. Government work often requires verification before closure.

---

## Status System

| Status | Description |
|--------|-------------|
| Not Started | Exists but not yet begun |
| Planned | Scheduled for future |
| Assigned | Owner designated |
| In Progress | Actively being worked |
| Waiting | Paused, awaiting input |
| Blocked | Cannot proceed |
| At Risk | Proceeding but in danger |
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

Avoid arbitrary numeric priorities.

---

## Health vs Status

Health differs from Status. An Activity can be **In Progress** while simultaneously being **At Risk**.

Health is calculated using:
- Time Remaining
- Dependency Health
- Recent Updates
- Blockers
- Review Delays
- Delivery Confidence

---

## Activity Views

### Table View (Default)
Optimized for large datasets. Supports:
- Sorting
- Filtering
- Grouping
- Inline Editing
- Column Pinning
- Bulk Actions
- Saved Views
- Keyboard Navigation

This should become the **primary operational interface**.

### Board View
Organizes Activities by Status. Ideal for delivery meetings. Supports drag-and-drop transitions with permission checks.

### Timeline View
Displays Activities chronologically. Useful for dependency planning. Shows overlaps, bottlenecks and delivery pacing.

### Calendar View
Focuses on deadlines. Supports: Daily, Weekly, Monthly, Agenda views.

### My Work
Personal workspace. Displays only Activities relevant to the current user. Should become the user's default landing page if preferred.

---

## Activity Drawer

Activities should **not** require page navigation.

Clicking an Activity opens a right-side Inspector. This preserves context while exposing complete detail.

**Drawer contains:**
- Summary
- Description
- Discussion
- History
- Files
- Dependencies
- Checklist
- Approvals
- Evidence
- Recent Activity

Users should never feel "lost" after opening an Activity.

---

## Inline Editing

Activities should support inline editing wherever possible. Users can modify:
- Status
- Priority
- Owner
- Due Date
- Tags
- Progress

Without opening the drawer. Editing should feel immediate.

---

## Bulk Actions

Support bulk:
- Assign
- Move
- Archive
- Delete (permission controlled)
- Status Update
- Due Date Change
- Export
- Labels

Bulk actions should always include confirmation where data integrity could be affected.

---

## Checklists

Activities may contain structured subtasks. Unlike standalone Activities, checklist items:
- Cannot have owners
- Cannot have independent lifecycles
- Cannot appear in reports

They simply help complete an Activity.

---

## Dependencies

Dependency types:
| Type | Meaning |
|------|---------|
| Finish → Start | B cannot start until A finishes |
| Start → Start | B cannot start until A starts |
| Finish → Finish | B cannot finish until A finishes |
| Blocked By | Direct blocking relationship |
| Blocking | This activity blocks another |

Dependencies should be visible directly within the Activity. **Hidden dependencies create delivery risk.**

---

## Evidence

Government delivery often requires proof. Activities should support evidence such as:
- Documents
- Photos
- Videos
- Contracts
- Meeting Notes
- Certificates
- URLs

Evidence remains attached permanently.

---

## Discussion

Supports: Threads, Mentions, Reactions (minimal), Attachments, Resolved Discussions, Decision References

Discussion should remain contextual. Never move conversations outside the Activity.

---

## Decisions

Activities may contain formal decisions:
- Decision
- Decision Maker
- Reason
- Outcome
- Timestamp
- Affected Objects

This prevents institutional knowledge from being lost.

---

## Activity Feed

Every Activity maintains its own history:
- Created
- Assigned
- Started
- Status Changed
- Comment Added
- Evidence Uploaded
- Due Date Changed
- Completed
- Verified

**History cannot be edited.**

---

## Automation Rules

| Trigger | Action |
|---------|--------|
| Completed | Notify Reviewer |
| Overdue | Notify Owner + Manager |
| Blocked | Notify Dependency Owner |
| Verified | Update Milestone Progress, Update Project Progress, Refresh Reports |

---

## Search Behaviour

Searching Activities supports:
- Title
- Reference ID
- Owner
- Tags
- Description
- Comments
- Evidence
- Files
- Recent Updates

Results prioritize active work over archived records.

---

## Notifications

Activities generate notifications for:
- Assignment
- Mention
- Comment
- Status Change
- Due Date
- Verification Request
- Dependency Change
- Evidence Request
- Approval Required

Notifications always deep-link back to the Activity Drawer.

---

## Activity States (Interface)

The Activity interface must gracefully support:
- Empty
- Draft
- Assigned
- Blocked
- Offline
- Archived
- Read Only
- Permission Restricted
- Loading
- Verification Pending

Each state should have dedicated UX rather than generic placeholders.

---

## Performance Requirements

The Activity system should support:
- 100,000+ Activities
- Real-time collaboration
- Virtualized tables
- Optimistic updates
- Instant search
- Keyboard-first workflows

The experience should remain fast regardless of dataset size.

---

## Accessibility

Every Activity interaction must support:
- Keyboard navigation
- Screen readers
- Focus management
- Reduced motion
- High contrast
- Accessible tables

The Activity system should be **fully usable without a mouse**.

---

## Future Expansion

- AI-generated summaries
- Suggested assignees
- Automatic deadline prediction
- Smart prioritization
- Voice updates
- Offline mobile synchronization
- Predictive blockers
- Meeting transcription

---

## Claude Implementation Notes

The Activity system is arguably the **most frequently used part of the entire platform**. Design it for speed. Not decoration.

The default Table View should feel closer to Linear, Airtable and modern Jira than traditional government software.

**Prioritize:**
- Typography
- Whitespace
- Information density
- Keyboard workflows
- Inline editing
- Fast filtering
- Persistent context

Avoid unnecessary modal windows. Prefer inspector panels, contextual menus and progressive disclosure.

Every interaction should minimize interruption.

---

## Review Checklist

- [ ] Activities can be managed without leaving the current context
- [ ] Inline editing is the default for simple changes
- [ ] Dependencies are visible and understandable
- [ ] History is complete and immutable
- [ ] Collaboration happens inside the Activity
- [ ] Evidence and decisions remain permanently linked
- [ ] Performance scales to very large datasets
- [ ] The interface encourages execution rather than administration
