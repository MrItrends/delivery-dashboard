# 26 — Notifications

## Purpose

Notifications communicate change. They should reduce uncertainty. Never increase noise.

Every notification should help users answer:
- What happened?
- Why should I care?
- What should I do next?

---

## Core Philosophy

> The best notification is one that leads directly to action.

Avoid informational spam. Notify only when action, awareness or accountability is required.

---

## Notification Categories

| Category | Examples |
|----------|---------|
| Assignments | You've been assigned an activity |
| Mentions | Someone @mentioned you |
| Comments | New comment on your object |
| Approvals | Approval requested / granted / rejected |
| Milestones | Milestone achieved / delayed |
| Reviews | Review requested / completed |
| Budget | Budget threshold reached |
| Reports | Report generated / published |
| Health Changes | Object health changed to Critical |
| Risks | New risk added / escalated |
| System Updates | Workspace-level changes |

---

## Notification Object

| Field | Description |
|-------|-------------|
| Type | Category classification |
| Priority | Critical / High / Normal / Low |
| Source Object | The object that triggered it |
| Title | Short summary |
| Summary | One-line description |
| Timestamp | When it occurred |
| Actor | Who triggered it |
| Status | Unread / Read / Archived |
| Action | Primary CTA (view, approve, etc.) |

---

## Priority Levels

| Level | Behavior |
|-------|---------|
| Critical | Immediate attention — health, blockers |
| High | Time-sensitive — approvals, deadlines |
| Normal | Standard updates — comments, assignments |
| Low | Informational — digest-worthy items |

Priority influences **delivery timing** and visual treatment.

---

## Notification Center

The Notification Center becomes the user's **operational inbox**.

Features:
- Unread / Read separation
- Pinned important notifications
- Archived history
- Grouped by type or object
- Filtered views
- Searchable history

---

## Delivery Channels

| Channel | Use Case |
|---------|---------|
| In-App | Primary channel, always available |
| Email | Daily digest or critical alerts |
| Push | Mobile — time-sensitive only |
| Digest | Weekly summary |
| Webhook (Future) | System integrations |

Users choose preferred channels per category.

---

## Intelligent Grouping

Instead of: *"15 new comments"*

Show: *"Sarah, Ahmed and 13 others commented on National Broadband Expansion."*

Grouping reduces cognitive load.

---

## Notification Rules

Only notify users who are affected:
- Owner
- Reviewer
- Mentioned User
- Watcher
- Executive Sponsor

Avoid unnecessary broadcasts.

---

## Review Checklist

- [ ] Every notification is actionable
- [ ] Notifications link directly to source object
- [ ] Grouping reduces noise
- [ ] User-controlled delivery preferences
- [ ] Searchable history
- [ ] No orphaned notifications (always deep-link back)
