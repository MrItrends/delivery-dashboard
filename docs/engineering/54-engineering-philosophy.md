# 54 — Engineering Philosophy

## Purpose

The engineering architecture should be designed for **longevity**.

The objective is not to build a dashboard. The objective is to build a platform that can evolve over years without requiring fundamental architectural changes.

---

## Core Optimization Goals

Every engineering decision should optimize for:

| Quality | Description |
|---------|-------------|
| Simplicity | Fewer moving parts, predictable behavior |
| Scalability | Handles growth without redesign |
| Maintainability | New engineers can understand it |
| Predictability | Same inputs produce same outputs |
| Extensibility | New features fit without restructuring |

**Technology choices should support the product — not define it.**

---

## Product Architecture Philosophy

The application is **object-driven**. Not page-driven.

Every screen is simply a different representation of the same underlying objects.

```
Activity
  ↓ can be displayed as ↓
Table  │  Board  │  Timeline  │  Calendar  │  Inspector  │  Report
```

The Activity never changes. Only the presentation.

**This dramatically reduces complexity.**

---

## Single Source of Truth

Every object exists **once**.

```
Projects do not duplicate Activities
Reports do not duplicate Budgets
Dashboards do not duplicate KPIs
```

Views **reference** objects. Objects **own** data.

---

## Composition Over Duplication

The platform should be built from reusable systems.

**Avoid:**
```
ProjectTable
ActivityTable
BudgetTable
MilestoneTable
```

**Instead build:**
```
DataTable
  configured by schema
```

The same principle applies to:
- Forms
- Drawers
- Dialogs
- Charts
- Filters
- Search
- Notifications

**Everything should be composable.**

---

## Technology Principles

### Frontend
- Component-based architecture
- Design tokens for all visual decisions
- TypeScript everywhere — no implicit `any`
- Server state management (React Query or equivalent)
- Virtualization for large lists
- Keyboard-first interactions

### Backend
- Object-oriented API design (resources, not pages)
- Versioned REST APIs
- Permission checks at every layer
- Append-only audit history
- Background jobs for heavy operations
- Idempotent mutations

### Database
- Relational model for structured objects
- Foreign key constraints enforcing hierarchy
- Indexed for expected query patterns
- Audit tables as append-only records
- Soft deletes (archive, never hard delete)

---

## What Good Engineering Looks Like Here

A feature is well-engineered when:

1. It uses existing patterns rather than inventing new ones
2. It works correctly at 100 items and at 100,000 items
3. It can be understood by a new engineer in under an hour
4. Its components can be reused in other features
5. Its data flows predictably through the object hierarchy
6. It fails gracefully and explains what went wrong
7. It can be tested in isolation

---

## Anti-Patterns to Avoid

| Anti-Pattern | Why It's Bad |
|-------------|-------------|
| Feature-specific table components | Creates inconsistency and duplicates logic |
| Nested data embedding | Creates sync problems and inflated payloads |
| Shared mutable state | Causes unpredictable UI bugs |
| Permission checks only on frontend | Creates security vulnerabilities |
| Manual cache invalidation | Causes stale data and inconsistency |
| Hardcoded design values | Breaks the design system |
| Page-level components without shell | Breaks layout consistency |
| One-time-use utilities | Should be generalized or deleted |
