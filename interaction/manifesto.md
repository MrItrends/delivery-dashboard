# Pattern 44 — Interaction Consistency Manifesto

## The Core Commitment

Every interaction introduced into the Delivery Dashboard must satisfy all of the following. If **any** answer is no, the interaction must be redesigned before implementation.

---

## The Ten Tests

### 1. Preserves context wherever possible
Does the interaction keep the user's current view intact? Does it use an Inspector, Drawer, or inline pattern rather than navigating away? **Context is the most valuable thing the interface has. Protect it.**

### 2. Uses existing patterns before introducing new ones
Has this problem been solved somewhere else in the product? Can the same component, flow, or mental model be reused? **Consistency reduces learning cost. Every new pattern adds cognitive burden.**

### 3. Supports keyboard interaction
Can the full interaction be completed without a mouse? Do all interactive elements respond to Tab, Enter, Esc, and relevant shortcuts? **Every mouse-only interaction is inaccessible to a portion of users.**

### 4. Provides immediate feedback
Does the user know instantly that their action was received? Is there a visible state change, toast, animation, or inline confirmation? **Silence after an action is a UX failure.**

### 5. Is reversible when appropriate
Can the user undo this? If not — is there a genuine reason it cannot be reversed? Should there be a confirmation step instead? **Irreversibility should be a deliberate architectural decision, not an oversight.**

### 6. Maintains auditability
Will this action be recorded in the object's history? Is the actor, timestamp, and change captured? **Government delivery requires a permanent record. No mutation should be invisible.**

### 7. Scales to large datasets
Does this interaction work with 10 items? With 1,000? With 100,000? Is virtualization used where needed? Are filters available? **Design at scale, not at demo size.**

### 8. Feels predictable after repeated use
Will a user who has done this twenty times find the same behavior they expect? Are edge cases handled consistently? **Surprise is the enemy of trust.**

### 9. Supports collaboration without adding noise
Does this interaction notify only the people who need to know? Does it avoid spamming the activity feed with noise? Can it be turned off if it becomes intrusive? **Good collaboration infrastructure is nearly invisible.**

### 10. Reduces cognitive load instead of increasing it
After this interaction, does the user have more mental clarity or less? Does the interface think so that the user doesn't have to? **Every decision the interface offloads from the user is a decision available for delivery.**

---

## The Hierarchy of Patterns

When uncertain which pattern to apply, follow this order:

```
1. Inline editing (no context switch)
2. Inspector panel (context preserved, detail added)
3. Drawer (temporary workspace, context visible)
4. Modal (deliberate interruption, required confirmation)
5. New page (full context switch, justified by complexity)
```

Moving to a higher number requires a clear justification for why lower patterns are insufficient.

---

## The Rule of Consistency

A new interaction pattern is justified only when:
- Existing patterns genuinely cannot serve the use case
- The new pattern will be reused in at least three other places
- It has been reviewed against all ten tests above

One-off patterns are prohibited. They fragment the product's mental model.

---

## When to Escalate

If a feature request requires violating this manifesto, escalate. Do not silently implement a workaround. The tension between feature requirements and interaction principles is a product decision — not an engineering decision to make alone.

---

## Living Document

This manifesto evolves as the product evolves. When a new pattern is introduced and validated across the product, it is added here. When a pattern is retired, it is documented with the reason.

Version history is maintained. Every change is attributed.
