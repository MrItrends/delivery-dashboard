# Workspace Home

The operational command centre — the first screen after Workspace Initialization.
Built on the existing system (AppShell, DataTable, Inspector, StatusChip, Avatar,
FilterBar, CommandPalette, Buttons, tokens). No new card styles, no new
interaction patterns.

## Structure (vertical flow)

```
Page Header (title · health chip · reporting period · Create menu)
  ↓  Summary strip (6 restrained indicators — not KPI cards)
  ↓  My Work        ← the visual anchor (DataTable + FilterBar views)
  ↓  Priority items (operational rows + actions)
  ↓  Recent activity (GitHub/Linear-style feed, day-grouped)
  ↓  Upcoming       (compact timeline)
[supporting column: Workspace health · pinned projects · reports · searches · announcement]
```

Clicking any My Work row or priority item opens the **Inspector** (context preserved,
no page transition). The supporting column is sticky and never dominates.

## Deliverables / how to view them

All states are reachable on `/` via a `?state=` query param:

| Deliverable | URL |
|-------------|-----|
| Workspace Home / with data | `/` |
| Empty workspace | `/?state=empty` |
| Loading (skeletons, progressive) | `/?state=loading` |
| Error (contextual — feed only) | `/?state=error` |
| Offline | `/?state=offline` |
| Mobile / Tablet | resize (`≤768px` / `≤1024px`) |
| Responsive Inspector | open a row at `≤768px` → full-screen panel |

By default the page boots with a 700ms progressive skeleton reveal.

## Accessibility annotations (WCAG AA)

- **Landmarks:** PageHeader `<h1>`; each section is a `<section aria-labelledby>`
  with an `<h2>`; supporting column is `<aside aria-label>`; activity feed uses
  `role="feed"` with `role="article"` entries.
- **Summary strip:** `role="list"`; interactive metrics are real `<button>`s.
- **Table:** DataTable exposes `role="grid"`, sortable headers announce
  `aria-sort`, rows are focusable and open the Inspector on Enter/Space; quick
  actions are labelled buttons that `stopPropagation`.
- **Status & health:** never colour-only — StatusChip carries a text label;
  the health dot has `role="img"` + `aria-label`.
- **Inspector:** focus moves to the close button on open, returns to the row on
  close; `Esc` closes; `inert` when hidden; full-screen on mobile.
- **Create menu:** `aria-haspopup="menu"`, `aria-expanded`, `role="menu"` /
  `menuitem`, closes on `Esc`/outside click.
- **Keyboard:** logical tab order top→bottom; ⌘K/Ctrl+K command palette from the
  shell; visible focus rings from the global `:focus-visible` token.
- **Motion:** section/inspector/menu transitions are 150–200ms fades;
  `prefers-reduced-motion` is honoured globally.
- **Contrast:** text and semantic colours use the AA-compliant token ramps.

## Notes

- Data is mocked in `lib/mock/workspace.ts` until the API is wired.
- The My Work table scrolls horizontally **within its own container** on narrow
  widths — the page itself never scrolls horizontally.
- `ActivityFeed`, `SummaryStrip`, `PriorityList`, `UpcomingList` are reusable and
  can be promoted into the shared component library.
