# Component Visual Language

## Icons

### Icons assist recognition. They never replace labels.

Icons are memory aids. They help experienced users scan faster. They do not communicate to first-time users without an accompanying label.

**Library:** Hugeicons — Stroke style

Hugeicons provides: Stroke (default), Solid (active states), Bulk (empty states), Duotone (special callouts).

**Rules:**
- Stroke style in all standard UI
- Solid only for active/selected states
- Never mix styles in the same context
- Always pair with a text label except in known, repeated contexts (navigation items after learning period)
- Minimum size: 16px
- Maximum operational size: 24px
- Empty state size: 32–48px
- Never use emoji as icons

---

## Buttons

### Buttons should never dominate.

Every screen should have at most one primary action visible at any moment. All other actions are secondary, ghost, or text.

**The Button Hierarchy:**

| Variant | Appearance | When |
|---------|-----------|------|
| Primary | Filled blue | The one action the user should take |
| Secondary | White + border | Alternative actions of equal validity |
| Ghost | Transparent + text | Tertiary actions |
| Destructive | Filled red | Destructive actions (archive, delete) |
| Text / Link | No container | Inline actions, breadcrumb navigation |

**Avoid walls of colored buttons.** If three equally prominent buttons appear on one screen, one of them is wrong.

**Button anatomy:**
```
[Icon (optional)]  [Label]

Height:   md = 40px, sm = 32px, lg = 48px
Padding:  md = 16px horizontal
Radius:   8px
Font:     14px / 500 weight
```

**What buttons never do:**
- Fill the full width of a card (except on mobile forms)
- Use decorative gradients or shadows
- Appear without a label (icon-only buttons require aria-label and tooltip)
- Use a font size smaller than 13px

---

## Tables

### Tables are beautiful. Not boring.

Tables are first-class products, not utility components. The Activity Table is the most important screen in the product. Treat it accordingly.

**The Design Reference:**

| Product | The lesson |
|---------|-----------|
| Linear | Speed of interaction; keyboard-first; instant update |
| Airtable | Column flexibility; grouping; visual density |
| Notion | Inline context; calm surface |

**What makes a table beautiful:**

1. **Consistent row height** — every row the same height creates visual rhythm
2. **Left-aligned text** — right-aligned text creates dissonance in reading flow
3. **Column widths that make sense** — title column is wide; status column is narrow
4. **Subtle hover state** — barely perceptible, immediately present
5. **Inline editing** — clicking a field opens edit mode without a modal
6. **Typography hierarchy within rows** — title in body weight; metadata in caption weight
7. **Status chips** — small, consistent, color + text, never just color

**Table structure:**
```
Header row:     Label 14px / 500 / uppercase / neutral-500
Data row:       Text 14px / 400 / neutral-900 (primary) / neutral-500 (meta)
Row height:     48px comfortable / 40px compact
Hover:          Background neutral-50
Selected:       Background brand-50, checkbox visible
```

**What tables must support:** Sorting, Filtering, Grouping, Inline editing, Column management, Bulk selection, Virtualization, Keyboard navigation.

---

## Charts

### Charts explain. Never decorate.

If a chart doesn't help make a decision, it should not exist.

**The permitted chart types:**

| Chart | Use | Avoid When |
|-------|-----|------------|
| Line | Trends over time | Comparing categories |
| Bar (vertical) | Comparing categories | Many data points |
| Bar (horizontal) | Rankings with long labels | Time series |
| Area | Cumulative volume | Comparing multiple series |
| Sparkline | Inline trend in table/card | Detailed analysis |
| Progress bar | Single metric against target | Comparative analysis |
| Heatmap | Activity over time | Single values |
| Timeline | Gantt / dependency | Single values |

**Charts that are prohibited:**

| Chart | Why |
|-------|-----|
| Donut / Pie | Humans cannot accurately compare arc lengths |
| 3D charts | Distorts data comparison; purely decorative |
| Speedometer / Gauge | Wastes space; conveys nothing a number cannot |
| Animated intro charts | Delays information; frustrating |
| Bubble charts (without clear encoding) | Confusing without clear spatial meaning |

**Chart aesthetics:**
- Grid lines: horizontal only, light and dashed
- Axis labels: 12px, neutral-400
- No borders or shadows on chart containers
- Tooltips show exact values; not just color
- Colors from the data visualization palette — never semantic colors (they carry status meaning)

---

## Cards

### Cards summarize. They do not replace layouts.

**Avoid dashboard card grids.** A screen built from six equal-sized KPI cards is a failure of layout design. It says: "everything is equally important" — which is never true in government delivery.

**When cards are appropriate:**
- Summarizing a single intervention or project in a list
- Showing a person (team member card)
- Presenting a single metric with clear context
- Mobile-first views where horizontal tables don't fit

**When cards are not appropriate:**
- As the primary layout for a page
- To replace a well-structured data table
- When more than 4 appear in a 2-column grid
- As the only way to display a large dataset

**Card anatomy:**
```
Border:   1px solid neutral-200
Radius:   12px
Padding:  24px
Shadow:   Level 1 (barely visible) or none
Surface:  White (on neutral-50 background)
```

**Cards should never:**
- Have gradient or colored backgrounds
- Have heavy shadows
- Contain more than 4–5 data points (use a table instead)
- Have multiple competing CTAs

---

## The Component Consistency Principle

Every component across the product should be immediately recognizable as belonging to the same design system. A new engineer should be able to add a component to any screen and have it feel native.

This is only possible if:
1. Tokens are used everywhere — no hardcoded values
2. The same variants are used for the same purposes
3. No one-off components are invented for individual screens
4. Component decisions are documented and reused
