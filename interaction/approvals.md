# Pattern 37 — Approval Workflow

## Purpose

Approval represents **governance**. It should be structured, auditable, and predictable.

Every approval in the Delivery Dashboard follows the same model — regardless of whether it's a milestone, a budget, a report, or a policy decision.

---

## Approval Workflow

### Standard Path

```
Draft → Submitted → Review → Approved
```

### Return and Resolve Path

```
Submitted → Returned (with reason) → Updated → Resubmitted → Approved
```

### Escalation Path

```
Submitted → Review → Escalated → Senior Review → Approved
```

---

## Approval States

| State | Description |
|-------|-------------|
| Draft | Not yet submitted |
| Submitted | Awaiting review |
| In Review | Actively being assessed |
| Returned | Sent back for revision |
| Resubmitted | Revised and resubmitted |
| Approved | Formally accepted |
| Rejected | Formally declined (terminal) |
| Escalated | Elevated to senior authority |

---

## Approval Records

Every approval action records:

| Field | Required |
|-------|---------|
| Approver | Yes |
| Timestamp | Yes |
| Decision | Yes |
| Reason / Comment | Yes (when Returning or Rejecting) |
| Supporting evidence | Optional |
| Next required action | Where applicable |

**Approval records are immutable.** They cannot be edited after recording.

---

## UI Principles

**Approval actions remain highly visible.** Pending approvals appear in: Notification Center, My Work view, Object header (banner), Dashboard summary.

**Reasoning is mandatory when returning or rejecting.** The system enforces this — the Return or Reject action cannot be submitted without a reason.

**Approval history is always accessible.** Within the object, under the History or Approvals tab — showing the complete audit trail.

---

## Approval Interface

### Pending Approval Banner
```
┌──────────────────────────────────────────────────────┐
│ ⏳ Awaiting your approval    [Review]    [Dismiss]   │
└──────────────────────────────────────────────────────┘
```

Appears at the top of the object when the current user is the designated approver.

### Approval Action Panel
```
┌──────────────────────────────────────────────────────┐
│ Review: Q3 Milestone Completion                      │
│                                                      │
│ Submitted by: Ahmed Yusuf, 15 Sept 2024             │
│ Evidence: [View 3 files]                             │
│                                                      │
│ [View Full Object]                                   │
│                                                      │
│ Decision:                                            │
│ ○ Approve                                            │
│ ○ Return for revision                                │
│ ○ Reject                                             │
│                                                      │
│ Reason: ________________________                     │
│ (Required for Return and Reject)                     │
│                                                      │
│ [Submit Decision]                                    │
└──────────────────────────────────────────────────────┘
```

---

## Notifications on Approval Actions

| Event | Who is Notified |
|-------|----------------|
| Submitted | Approver |
| Approved | Submitter + Object Owner |
| Returned | Submitter |
| Rejected | Submitter + Object Owner + Project Manager |
| Overdue (no action for 48h) | Approver + Manager |

---

## Delegation

If an approver is unavailable, approval can be delegated to another authorized user. Delegation is logged: who delegated, to whom, why.

---

## Approval Analytics

At the Project and Portfolio level:
- Average time from submission to approval
- Approval rate (approved vs. returned first time)
- Outstanding approvals count
- Overdue approvals count

This helps identify governance bottlenecks.
