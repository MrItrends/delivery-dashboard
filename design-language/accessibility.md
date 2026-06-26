# Accessibility

## The Core Belief

**Accessibility is visual quality. Not compliance.**

A product that cannot be used by someone with low vision is not a product with an accessibility problem. It is a product with a clarity problem. The fixes are the same.

Readable typography, sufficient contrast, logical structure, keyboard navigation — these are not accessibility accommodations. They are the marks of excellent design.

---

## Why This Matters Beyond Compliance

Government platforms must serve everyone. Government officials:

- Work on older monitors with inconsistent calibration
- Work in bright environments where screen glare reduces contrast
- Work under time pressure where anything that slows reading matters
- Include people with visual, motor, and cognitive differences
- Use keyboards as primary navigation for speed — not just accessibility

Designing for accessibility by default makes the product better for everyone.

---

## The Five Requirements

### 1. Readable Typography

- Body text minimum: 14px (16px preferred)
- Nothing below 12px ever
- Sufficient line height (1.5 for body, 1.2 for headings)
- Font weight appropriate to size (thin weights fail at small sizes)
- Sufficient contrast between text and background

### 2. High Contrast

WCAG AA minimums are the floor, not the target:

| Context | Minimum Ratio | Target |
|---------|--------------|--------|
| Body text on white | 4.5:1 | 7:1 |
| Large text (18px+) | 3:1 | 4.5:1 |
| UI components | 3:1 | 4.5:1 |
| Focus rings | 3:1 | — |

Primary text (`#111827` on `#FFFFFF`) = 16.75:1 ✓

Never choose a text color for aesthetics alone. Always check the ratio.

### 3. Keyboard Focus

Every interactive element must:
- Be reachable via Tab
- Have a visible focus ring (never `outline: none`)
- Be activatable via Enter or Space
- Support Esc to close overlays

**Focus ring specification:**
```css
:focus-visible {
  outline: 2px solid var(--color-brand-500);
  outline-offset: 2px;
  border-radius: inherit;
}
```

Focus must be managed correctly when panels open and close:
- Opening a modal: focus moves to the modal
- Closing a modal: focus returns to the trigger element
- Opening an inspector: focus moves to the inspector
- Closing an inspector: focus returns to the table row

### 4. Reduced Motion

All animations respect `prefers-reduced-motion`. See `motion.md` for implementation.

Users who need reduced motion receive: instant state changes, no decorative animations, full functionality preserved.

### 5. Logical Structure

Screen readers navigate by document structure. Every screen must have:
- One `<h1>` (page title)
- Logical heading hierarchy (`h1 → h2 → h3`)
- `aria-label` on all icon-only buttons
- `aria-live` regions for dynamic content updates
- `role="grid"`, `role="row"`, `role="gridcell"` on tables
- `aria-sort` on sorted table columns
- `aria-selected` on selected rows

---

## Color Is Never the Only Signal

Every semantic color is always paired with a non-color indicator:

| Signal | Color | Also Requires |
|--------|-------|--------------|
| Error | Red | ✕ Icon + error text |
| Warning | Amber | ⚠ Icon + warning text |
| Success | Green | ✓ Icon + success text |
| Blocked | Red dot | "Blocked" label |
| At Risk | Amber dot | "At Risk" label |
| Interactive | Blue | Underline or cursor |

A user who cannot distinguish red from green must still understand all status information.

---

## Touch Targets

All interactive elements: minimum 44px × 44px regardless of visual size.

```css
.icon-button {
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Icon inside may be 16px or 20px — the target is always 44px */
}
```

---

## ARIA Roles

| Component | ARIA Role |
|-----------|----------|
| Navigation | `role="navigation"` + `aria-label` |
| Table | `role="grid"` |
| Table row | `role="row"` |
| Table cell | `role="gridcell"` |
| Dialog | `role="dialog"` + `aria-modal="true"` |
| Alert | `role="alert"` |
| Status | `role="status"` |
| Search | `role="search"` |
| Button | `<button>` (not `<div>`) |
| Link | `<a>` (not `<div>`) |

**Never use divs for interactive elements.** Use the semantically correct HTML element.

---

## Screen Reader Announcements

Dynamic content changes must be announced:

```typescript
// Announce bulk selection count
aria-live="polite"
aria-atomic="true"
// "3 activities selected"

// Announce save status
aria-live="polite"
// "Activity saved successfully"

// Announce filter changes
aria-live="polite"
// "Showing 15 of 43 activities"
```

---

## The Accessibility Test

A screen passes when:

1. Full functionality is available via keyboard alone
2. Screen reader narration makes sense in logical reading order
3. No information is conveyed by color alone
4. All interactive elements have 44px minimum touch targets
5. Focus rings are visible and never hidden
6. Contrast ratios meet WCAG AA for all text
7. Removing all color leaves a still-functional interface
8. Reduced-motion users experience no loss of functionality
