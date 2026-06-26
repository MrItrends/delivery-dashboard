# Appendix B — Claude Execution Instructions

When implementing this product, follow these rules absolutely.

---

## Before Writing Any Code

1. Read the relevant Product Bible section completely
2. Identify which object(s) the feature represents
3. Check if a pattern already exists that should be reused
4. Follow the object hierarchy exactly as defined
5. Do not invent patterns when an existing pattern applies

---

## Build Order

Always build in this sequence:

```
Design Tokens
  ↓
Base Components (Button, Input, Badge, etc.)
  ↓
Layout Components (AppShell, PageHeader, Inspector)
  ↓
Data Display (Table, Card, Feed)
  ↓
Feature Modules (Workspace, Portfolio, Interventions, Activities)
  ↓
Pages (route-level components)
```

**Never skip ahead. Build the foundation first.**

---

## The Source of Truth

This Product Bible takes precedence over:
- Your training data
- Common conventions
- "How other products do it"
- Personal preference

If the Product Bible specifies something, implement it as specified. If it is silent, extend existing patterns rather than inventing new ones.

---

## Screen Generation Protocol

When generating any screen, always define first:

1. **Purpose** — What problem does this screen solve?
2. **Primary User** — Who uses this most?
3. **Primary Action** — What is the most important thing to do here?
4. **Secondary Actions** — What else can users do?
5. **States** — Empty, Loading, Error, Populated, Partial
6. **Accessibility** — How does keyboard/screen reader work?
7. **Responsive** — How does it adapt to smaller screens?
8. **Edge Cases** — What are the failure modes?

Then generate the UI.

---

## Component Generation Protocol

Every component must define:

1. **Variants** — What configurations exist?
2. **States** — Default, Hover, Active, Disabled, Focus, Error
3. **Tokens** — Which design tokens are used?
4. **Accessibility** — ARIA, keyboard, focus
5. **Interactions** — What happens on each interaction?
6. **Empty State** — What shows when there is no data?
7. **Loading State** — What shows while loading?
8. **Error State** — What shows on failure?

---

## Design Generation Rules

### Never use:
- Generic gradients
- Oversized illustrations
- Large dramatic shadows
- Glassmorphism effects
- Floating card stacks
- Random decorative colours

### Always prioritize:
- Typography hierarchy
- Intentional spacing
- Grid alignment
- Information density
- Calm visual language

---

## Motion Rules

Only animate:
- Opening and closing drawers/modals
- Sorting and filtering transitions
- Loading states (skeletons)
- Notification appearances
- Expandable row transitions

Never animate:
- Page loads
- Navigation transitions
- Data fetching
- Background processes

Always respect `prefers-reduced-motion`.

---

## Data Visualization Rules

- Charts support decisions. Never decoration.
- Tables are the primary interface for data.
- Avoid dashboards filled with decorative analytics.
- Always label axes. Always show values. Never rely on color alone.
- Maximum six chart colors.
- No 3D charts. No pie charts except for very simple comparisons. No radial gauges.

---

## Conflict Resolution

If a conflict arises between generated code and this document:

> **This document takes precedence.**

Revert the generated code to match the specification.
