# Interaction Architecture
**Version 1.0**

> If the Product Bible defines what the product is, Interaction Architecture defines how users experience it.

---

## Purpose

Interaction Architecture defines how every interface behaves.

It is independent of visual design.
It is independent of engineering implementation.
It establishes a predictable interaction language across the entire product.

---

## Core Principles

Every interaction must satisfy five principles.

### 1. Preserve Context
Users should never lose context unnecessarily. Instead of navigating away: open an Inspector, expand inline, use a Drawer. The current workspace should remain visible whenever possible.

### 2. Minimize Navigation
Every additional page increases cognitive load.

Prefer in this order:
```
Inline Edit → Drawer → Inspector → Modal → Dedicated Page
```

Pages are expensive. Context is valuable.

### 3. Reveal Progressively
Complexity should appear only when required. Users first see:
```
Summary → Details → Evidence → History
```
Never expose every field immediately.

### 4. Every Action Has Feedback
Every interaction communicates state: Saving… / Saved / Uploading… / Uploaded / Assigned / Archived / Deleted. Users should never wonder whether something happened.

### 5. Everything Is Reversible
Whenever possible, support Undo — not confirmation dialogs. Confirmation is reserved for: Deleting, Financial Approval, Permission Changes, Workspace Removal.

---

## Global Interaction Model

Every object follows the same lifecycle:

```
Hover → Focus → Select → Open → Edit → Save → Share → Archive
```

Every object behaves consistently.

---

## Patterns 01–30 (Core)

See [interaction/core-patterns.md](./interaction/core-patterns.md)

---

## Pattern 31 — Data Table Interaction

See [interaction/table.md](./interaction/table.md)

---

## Patterns 32–44 (Advanced)

| Pattern | File |
|---------|------|
| 32 — Filtering | [interaction/filtering.md](./interaction/filtering.md) |
| 33 — Column Management | [interaction/columns.md](./interaction/columns.md) |
| 34 — Timeline | [interaction/timeline.md](./interaction/timeline.md) |
| 35 — Drag & Drop | [interaction/drag-drop.md](./interaction/drag-drop.md) |
| 36 — Drawers | [interaction/drawers.md](./interaction/drawers.md) |
| 37 — Approval Workflow | [interaction/approvals.md](./interaction/approvals.md) |
| 38 — Dependency Visualization | [interaction/dependencies.md](./interaction/dependencies.md) |
| 39 — Evidence Management | [interaction/evidence.md](./interaction/evidence.md) |
| 40 — Report Generation | [interaction/reports.md](./interaction/reports.md) |
| 41 — Object Creation | [interaction/creation.md](./interaction/creation.md) |
| 42 — Archiving | [interaction/archiving.md](./interaction/archiving.md) |
| 43 — Global Shortcuts | [interaction/shortcuts.md](./interaction/shortcuts.md) |
| 44 — Consistency Manifesto | [interaction/manifesto.md](./interaction/manifesto.md) |

---

## Interaction Consistency Manifesto

Every interaction introduced into the product must:

- Preserve context wherever possible
- Use existing patterns before introducing new ones
- Support keyboard interaction
- Provide immediate feedback
- Be reversible when appropriate
- Maintain auditability
- Scale to large datasets
- Feel predictable after repeated use
- Support collaboration without adding noise
- Reduce cognitive load instead of increasing it

**If the answer to any of these is no, redesign the interaction before implementation.**
