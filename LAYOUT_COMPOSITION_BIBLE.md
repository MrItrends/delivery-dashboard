# Layout & Composition Bible
**Version 1.0**

> Composition determines whether a product feels calm or overwhelming.
> This document exists so every screen feels like it belongs to the same product.

---

## 01 — Purpose

This document defines how information is organized across every screen in the Delivery Dashboard.

It is not about components. It is not about colors. **It is about composition.**

---

## 02 — Composition Philosophy

Every screen should answer one question before asking another. Information should unfold naturally. Users should never need to search visually for where to begin.

A screen should guide the eye without requiring conscious effort.

**Think like an architect. Not a decorator.**

---

## 03 — The Visual Pyramid

Every screen follows the same hierarchy:

```
Context
  ↓
Primary Content
  ↓
Supporting Content
  ↓
Metadata
  ↓
History
  ↓
System Controls
```

Context always comes first. Actions always happen near the information they affect. Metadata is never promoted above content.

---

## 04 — The Screen Anatomy

Every major screen follows this structure:

```
┌──────────────────────────────────────────────────────────┐
│ Global Navigation                                        │
├──────────────────────────────────────────────────────────┤
│ Breadcrumb                                               │
│ Page Title                                               │
│ Description                                              │
│ Primary Actions                                          │
├──────────────────────────────────────────────────────────┤
│ Context Navigation (Tabs)                                │
├──────────────────────────────────────────────────────────┤
│ Main Workspace                                           │
│                                                          │
├──────────────────────────────────────────────────────────┤
│ Supporting Information                                   │
└──────────────────────────────────────────────────────────┘
```

This structure never changes. Only the content changes.

---

## 05–35 — Full Specification

| Section | File |
|---------|------|
| 02–10 Philosophy, Pyramid, Anatomy, Surfaces | [layout/philosophy.md](./layout/philosophy.md) |
| 11–12 Headers & Tabs | [layout/headers-tabs.md](./layout/headers-tabs.md) |
| 13–16 Tables, Cards, Inspector, Drawers | [layout/panels.md](./layout/panels.md) |
| 17–22 Dashboard, Table, Timeline, Analytics | [layout/compositions.md](./layout/compositions.md) |
| 23–26 Multi-panel, Density, Responsive | [layout/responsive.md](./layout/responsive.md) |
| 27–33 Principles, Depth, Balance, Grid | [layout/principles.md](./layout/principles.md) |
| 34–35 Review Checklist & Manifesto | [layout/review.md](./layout/review.md) |

---

## The Composition Manifesto

The Delivery Dashboard should not feel like a collection of pages. It should feel like a **single, continuous workspace**.

Every screen should inherit the same visual grammar. Every object should occupy familiar locations. Every action should feel expected. Every panel should have a clear purpose.

**Users should never think about layout. They should think about delivery.**

The highest compliment for this product is not that it looks beautiful. It is that it feels **inevitable** — as though every screen could only have been arranged one way.
