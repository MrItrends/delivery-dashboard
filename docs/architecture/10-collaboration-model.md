# 10 — Collaboration Model

## Philosophy

The Delivery Dashboard is fundamentally a **collaborative product**.

Projects are not completed by individuals. They are delivered by teams.

Collaboration is not a separate module. **It is woven into every object.**

---

## Collaboration Pyramid

```
Awareness
  ↓
Communication
  ↓
Coordination
  ↓
Decision
  ↓
Delivery
```

The product should support every layer.

---

## Awareness

Users should constantly understand:
- Who is online
- Who updated something
- Who owns something
- Who is reviewing something
- Who completed something

**Without opening additional pages.**

### Presence

Presence is subtle. Never distracting.

Examples:
- Avatar stack
- "Currently viewing"
- "Editing now"
- "Last active"
- "Recently updated"

Presence should feel similar to Figma.

---

## Ownership

Every object has **one owner**. Ownership is visible everywhere:

- Projects
- Activities
- Milestones
- Reports
- Budgets
- Files

Ownership is never hidden inside settings.

---

## Collaboration Types

### Comments
- Contextual — belong to objects, never pages
- Support threads, mentions, attachments
- Resolvable
- Referenced in decisions

### Mentions
- Typing `@` searches users, teams, and roles
- Mentioning someone creates a notification

### Assignments
Every assignment records:
- Assigner
- Assignee
- Date
- Reason
- History

### Approvals
Approvals are explicit:

| State | Description |
|-------|-------------|
| Pending | Awaiting review |
| Approved | Formally accepted |
| Rejected | Not accepted |
| Returned | Sent back for revision |

Every approval records: Reviewer, Timestamp, Decision, Comment.

### Activity Feed
Every object has a timeline. Examples:
- Activity created
- Budget updated
- Target changed
- Comment added
- Owner reassigned
- Milestone completed

Nothing important should happen silently.

---

## Collaboration Feed

Each Workspace has a global activity feed showing:
- Recent Projects
- Completed Activities
- Upcoming Deadlines
- New Files
- Budget Updates
- Team Announcements

This creates **awareness across departments**.

---

## Discussion Model

Discussion should happen **beside work**. Not somewhere else.

```
Wrong:
Slack → Search → Link → Context lost

Correct:
Project → Comment → Resolve → History preserved
```

---

## Files

Files belong to objects. Users never upload "loose" files. Everything has context.

---

## Audit History

Every object maintains permanent history:
- Who
- What
- When
- Previous Value
- New Value
- Reason

**Audit history cannot be deleted.**

---

## Collaboration Principle

The interface should always answer:
1. Who is working on this?
2. Who owns it?
3. What changed?
4. What happens next?

**Without requiring users to ask colleagues.**
