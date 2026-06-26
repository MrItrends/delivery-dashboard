# Loading States

## Philosophy

Loading states should be **honest, fast, and unobtrusive**.

The worst loading experience: a blank screen with a spinner in the center. The best: skeleton screens that communicate structure before data, combined with optimistic updates that eliminate most loading entirely.

---

## Loading Principles

### Optimistic First
For any write action (status change, assignment, completion), update the UI immediately. Sync in the background. Rollback only if the server reports failure.

This eliminates perceived loading for the majority of user actions.

### Skeleton Over Spinner
When data is loading, show a layout skeleton — not a blank spinner. Users should immediately understand the shape of the content before it arrives.

### Never Block the Entire UI
Never render a full-page spinner that prevents interaction with the rest of the application. Loading is always scoped to the relevant section.

### Progressive Load
Load the most important content first. Secondary panels, activity feeds, and analytics load after the primary content is visible.

---

## Loading Patterns

### Skeleton Screens

Used when: Initial page load, Navigating to a new object, First load of a tab.

Skeleton screens mirror the exact layout of the content:

```
┌─────────────────────────────────────────────────┐
│ ████████████████████     ██████ ██████ ███████  │
├─────────────────────────────────────────────────┤
│ ████ │ ████ │ ████ │ ████                       │
├─────────────────────────────────────────────────┤
│ ████████████████████████████████████████████    │
│ ██████████████████████████                      │
├─────────────────────────────────────────────────┤
│ ███████  ██████████  ████  ██████  ████████     │
│ ███████  ██████████  ████  ██████  ████████     │
│ ███████  ██████████  ████  ██████  ████████     │
└─────────────────────────────────────────────────┘
```

- Skeleton color: `--color-skeleton` (subtle gray)
- Animation: Shimmer from left to right, 1.5s cycle
- Skeleton elements match the exact size/position of real content

### Section Spinner

Used when: Refreshing data in a section, Loading search results, Generating reports.

Spinner appears within the relevant section only. The rest of the page remains interactive.

```css
/* Section loading overlay */
.section-loading {
  position: relative;
  min-height: 80px;
}

.section-loading::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### Inline Loading

Used when: Saving a field, Uploading a file, Running a quick action.

Render a small spinner adjacent to the element being processed. Confirm with a checkmark on completion.

```
[Save]  →  [⟳ Saving...]  →  [✓ Saved]
```

### Progress Indicator

Used when: Generating large reports, Bulk operations, File processing, Long imports.

```
┌──────────────────────────────────────────────────┐
│ Generating Q3 Progress Report...                 │
│ ████████████████░░░░░░░░  65%                    │
│ Assembling Activity Data                         │
│                                            [Cancel] │
└──────────────────────────────────────────────────┘
```

---

## Load Time Targets

| Screen | Target |
|--------|--------|
| Workspace Home | < 1.5 seconds |
| Intervention Page | < 2 seconds |
| Activity Table (1000 rows) | < 1 second |
| Search Results | < 300ms |
| Report Generation | < 10 seconds (progress shown) |
| File Upload | < 5 seconds / MB |
| Dashboard | < 2 seconds |

---

## Error During Load

When a section fails to load, show a minimal inline error:

```
Could not load activity data.  [Retry]
```

Never replace the entire page with an error screen for a partial data failure.

---

## Transition Animations

Page transitions: Subtle fade (100ms). Not a slide or dramatic entrance.

Panel open/close: Slide (200ms, ease-out / 150ms, ease-in).

Data updates: No animation. Content updates directly.

Status changes: Brief background flash (green for completion, none for others).

---

## Claude Implementation Notes

Loading states are often an afterthought. They should not be.

Every screen should be designed in three states: loaded, loading (skeleton), and error. All three states should be built simultaneously.

The goal is to make loading states **feel faster than they are** through skeleton screens and optimistic updates. Users should rarely wait more than 2 seconds for anything — and they should never see a blank white screen.
