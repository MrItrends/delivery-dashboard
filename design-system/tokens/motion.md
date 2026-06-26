# Design Tokens — Motion

> Motion exists only to explain change. Nothing else.

---

## Philosophy

Motion should:
- Explain what changed
- Communicate state transitions
- Guide user attention

Motion should **never**:
- Exist purely for delight
- Interrupt work
- Slow down interactions
- Repeat unnecessarily

---

## Duration Scale

| Token | Value | Usage |
|-------|-------|-------|
| `duration-instant` | 0ms | No animation (reduced motion) |
| `duration-fast` | 100ms | Micro-interactions (tooltips, badges) |
| `duration-normal` | 150ms | Standard transitions |
| `duration-moderate` | 200ms | Panel transitions, drawers |
| `duration-slow` | 300ms | Large layout changes |
| `duration-deliberate` | 400ms | Page-level transitions |

> Target range: **150–250ms** for most interactions.

---

## Easing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `ease-linear` | `linear` | Progress bars |
| `ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Elements leaving screen |
| `ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Elements entering screen |
| `ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Elements changing state |
| `ease-spring` | Not used | Avoid bounce effects |

> **Avoid** bounce, spring, or elastic easings. They feel wrong in professional software.

---

## Motion Types

| Type | Duration | Easing | Usage |
|------|----------|--------|-------|
| Fade in | 150ms | ease-out | Tooltips, popovers appearing |
| Fade out | 100ms | ease-in | Tooltips, popovers leaving |
| Slide in (right) | 200ms | ease-out | Inspector/drawer opening |
| Slide out (right) | 150ms | ease-in | Inspector/drawer closing |
| Scale in | 150ms | ease-out | Modals, dialogs opening |
| Scale out | 100ms | ease-in | Modals, dialogs closing |
| Expand | 200ms | ease-out | Accordion, expandable rows |
| Collapse | 150ms | ease-in | Accordion, collapse |
| Sort | 200ms | ease-in-out | Table column reordering |
| Loading | Loop | linear | Skeleton, progress |

---

## What Should Animate

| Interaction | Animation |
|-------------|-----------|
| Opening drawer | Slide in from right (200ms) |
| Closing drawer | Slide out to right (150ms) |
| Opening modal | Fade + scale in (150ms) |
| Closing modal | Fade + scale out (100ms) |
| Sorting table | Row position transition (200ms) |
| Filtering data | Fade out old, fade in new (150ms) |
| Loading data | Skeleton shimmer |
| Showing notification | Slide in from top-right (200ms) |
| Expanding row | Height transition (200ms) |
| Hover state | Background color (100ms) |
| Focus state | Border + ring (100ms) |
| Status badge change | Color cross-fade (150ms) |

---

## What Should NOT Animate

- Page loads (use skeletons instead)
- Navigation transitions (keep instant)
- Typing/input (no delays)
- Data fetching (show skeleton immediately)
- Bulk operations (no visual fanfare)

---

## Reduced Motion

**Always respect `prefers-reduced-motion`.**

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

This is mandatory. Not optional.

---

## Implementation Notes (CSS Variables)

```css
:root {
  /* Duration */
  --duration-instant: 0ms;
  --duration-fast: 100ms;
  --duration-normal: 150ms;
  --duration-moderate: 200ms;
  --duration-slow: 300ms;
  --duration-deliberate: 400ms;

  /* Easing */
  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

  /* Standard transitions */
  --transition-fast: var(--duration-fast) var(--ease-out);
  --transition-normal: var(--duration-normal) var(--ease-out);
  --transition-moderate: var(--duration-moderate) var(--ease-out);
}
```
