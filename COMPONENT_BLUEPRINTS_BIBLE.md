# Component Blueprints Bible
**Version 1.0**

> Components are not UI elements. They are the vocabulary of the product.

---

## Purpose

This document defines every reusable product primitive used throughout the Delivery Dashboard.

Unlike a traditional design system, these components are documented as **behavioral building blocks**, not visual assets.

Every component must be: Reusable · Predictable · Accessible · Composable · Token-driven.

No feature may introduce a new component when an existing primitive can be extended.

---

## Component Architecture

```
Foundation      ← Tokens, grid, typography — no UI
  ↓
Layout          ← Page structure, panels, regions
  ↓
Navigation      ← Header, breadcrumb, tabs, sidebar
  ↓
Input           ← Forms, buttons, selectors, filters
  ↓
Display         ← Tables, timelines, charts, metrics
  ↓
Data            ← Search, data table, inspector
  ↓
Feedback        ← Toast, empty state, loading, error
  ↓
Overlay         ← Modal, drawer, context menu
  ↓
Collaboration   ← Activity feed, comments, avatars, files
  ↓
Domain          ← Health indicator, status chip, approval flow
```

Always build from Foundation first. Never build from the bottom up.

---

## Component Index

| Component | File | Layer |
|-----------|------|-------|
| Page Header | [components/foundations.md](./components/foundations.md) | Navigation |
| Button | [components/foundations.md](./components/foundations.md) | Input |
| Status Chip | [components/foundations.md](./components/foundations.md) | Display |
| Breadcrumb | [components/foundations.md](./components/foundations.md) | Navigation |
| Tabs | [components/foundations.md](./components/foundations.md) | Navigation |
| Avatar Stack | [components/collaboration.md](./components/collaboration.md) | Collaboration |
| Metric | [components/data.md](./components/data.md) | Display |
| Data Table | [components/data.md](./components/data.md) | Data |
| Filter Bar | [components/data.md](./components/data.md) | Data |
| Timeline | [components/data.md](./components/data.md) | Display |
| Chart | [components/data.md](./components/data.md) | Display |
| Search | [components/data.md](./components/data.md) | Data |
| Inspector | [components/overlay.md](./components/overlay.md) | Overlay |
| Drawer | [components/overlay.md](./components/overlay.md) | Overlay |
| Modal | [components/overlay.md](./components/overlay.md) | Overlay |
| Toast | [components/overlay.md](./components/overlay.md) | Feedback |
| Context Menu | [components/overlay.md](./components/overlay.md) | Overlay |
| Empty State | [components/feedback.md](./components/feedback.md) | Feedback |
| Loading State | [components/feedback.md](./components/feedback.md) | Feedback |
| Error State | [components/feedback.md](./components/feedback.md) | Feedback |
| Notification Item | [components/feedback.md](./components/feedback.md) | Feedback |
| Activity Feed | [components/collaboration.md](./components/collaboration.md) | Collaboration |
| Comment Thread | [components/collaboration.md](./components/collaboration.md) | Collaboration |
| File Preview | [components/collaboration.md](./components/collaboration.md) | Collaboration |
| Command Palette | [components/system.md](./components/system.md) | Navigation |
| Rules & Review | [components/rules.md](./components/rules.md) | — |

---

## Component Philosophy

Every component answers three questions:

1. **What information does it communicate?**
2. **What action does it enable?**
3. **Can it be reused elsewhere?**

If the answer to the third question is "no" — the component probably should not exist as a component.

---

## The Manifesto

Components are the vocabulary of the product. Just as words form sentences, components form experiences.

**The goal is not to build many components.** The goal is to build a small, exceptionally consistent set of primitives that can create hundreds of screens without introducing visual or behavioral inconsistency.

Every future feature should feel like it was assembled from the same language — not designed from scratch.
