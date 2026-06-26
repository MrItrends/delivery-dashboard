# 30 — UX Philosophy

## Purpose

The Delivery Dashboard is designed for people whose decisions affect millions of citizens. **The interface should reflect that responsibility.**

This is not consumer software. It is not enterprise software in the traditional sense. It is **operational software**.

The experience should make complex delivery systems feel understandable. Every interaction should remove uncertainty. Every screen should help users make better decisions.

---

## UX Vision

> The best interface is one users stop noticing.

After a week of use, navigation should become instinctive. Actions should become muscle memory. The software should disappear behind the work.

---

## Design Principles

Every interaction should optimize for:

| Quality | Definition |
|---------|-----------|
| Clarity | Users immediately understand what they're looking at |
| Speed | Interactions feel instant |
| Context | Users never lose their place |
| Predictability | Same patterns behave the same way everywhere |
| Collaboration | Users see evidence of other people's work |
| Trust | The interface communicates reliability |

**The objective is not delight. The objective is confidence.**

---

## Design For Different Thinking Levels

Different users think differently:

| User Type | Mental Model |
|-----------|-------------|
| Executives | Strategy — "Are we delivering?" |
| Managers | Coordination — "What needs attention?" |
| Teams | Execution — "What do I need to do today?" |

The same platform should adapt naturally **without feeling like different products**.

---

## Progressive Disclosure

Information should reveal itself gradually. Never overwhelm.

```
Summary
  ↓
Context
  ↓
Evidence
  ↓
History
```

This hierarchy should exist throughout the application. Executives see summaries. Managers see execution. Contributors see tasks.

---

## Consistency

Every object should behave similarly:
- Projects
- Interventions
- Activities
- Milestones
- Budgets
- Reports

The interaction model should become **predictable** after one use. Once a user understands how to work with an Activity, they should immediately understand how to work with a Milestone.

---

## Speed

Every unnecessary click should be questioned. Every page transition should justify itself.

Users should remain inside their workflow. The fastest path wins.

---

## UX Review Checklist

Before approving any screen:

- [ ] Can users understand the page within five seconds?
- [ ] Is the primary action immediately obvious?
- [ ] Can most edits happen without leaving context?
- [ ] Does the layout prioritize content over chrome?
- [ ] Is navigation shallow and predictable?
- [ ] Are inspector panels used instead of unnecessary pages?
- [ ] Are empty, loading and error states intentionally designed?
- [ ] Does the experience reward expertise through keyboard shortcuts?
- [ ] Would this interaction feel at home in Figma, Linear or Notion?

If any answer is no, redesign before implementation.
