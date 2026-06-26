# Collaboration Model

## Philosophy

The Delivery Dashboard is fundamentally a **collaborative product**. Projects are not completed by individuals. They are delivered by teams.

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

The product supports every layer.

---

## Awareness

Users should constantly understand — without opening additional pages:
- Who is online
- Who updated something
- Who owns something
- Who is reviewing something
- Who completed something

### Presence
Subtle. Never distracting. Examples: Avatar stack, "Currently viewing", "Editing now", "Last active", "Recently updated". Inspired by Figma.

### Ownership
Every object has **one owner**. Ownership is visible everywhere. Never hidden inside settings.

---

## Collaboration Types

### Comments
- Contextual — belong to objects, never pages
- Support threads, @mentions, attachments
- Resolvable with permanent history

### Mentions
Typing `@` searches users, teams, and roles. Mentioning someone creates a notification immediately.

### Assignments
Every assignment records: Assigner, Assignee, Date, Reason, History.

### Approvals
Approvals are explicit and formal:

| State | Description |
|-------|-------------|
| Pending | Awaiting review |
| Approved | Formally accepted |
| Rejected | Not accepted |
| Returned | Sent back for revision |

Every approval records: Reviewer, Timestamp, Decision, Comment.

### Activity Feed
Every object has a timeline. Examples: Activity created, Budget updated, Target changed, Comment added, Owner reassigned, Milestone completed.

**Nothing important should happen silently.**

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

## Decisions

One feature often missing from government software. Every important decision should be formally recorded:

| Field | Description |
|-------|-------------|
| Decision | What was decided |
| Owner | Who made the decision |
| Date | When it was made |
| Reason | Why this decision was made |
| Outcome | What it affects |
| Affected Objects | Linked deliverables |

This creates institutional memory that survives leadership changes.

---

## Files

Files belong to objects. Users never upload "loose" files. Everything has context.

Correct: `Intervention → Evidence → Contract`
Incorrect: `Documents → Folder → File`

---

## Audit History

Every object maintains **permanent, immutable history**:

| Field | Description |
|-------|-------------|
| Who | User who made the change |
| What | What was changed |
| When | Timestamp |
| Previous Value | Before state |
| New Value | After state |
| Reason | Optional explanation |

Audit history cannot be deleted.

---

## Collaboration Principle

The interface should always answer — without requiring users to ask colleagues:
1. Who is working on this?
2. Who owns it?
3. What changed?
4. What happens next?
