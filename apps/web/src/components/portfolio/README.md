# Portfolio Workspace

The strategic command centre for one delivery portfolio. An operational decision
surface — not an analytics dashboard. Lives inside the Workspace Frame at
`/portfolio`, built only from approved primitives.

## Structure (vertical flow)

```
Page Header (name · description · owner · period · health · Generate report · ⋯)
  ↓  Summary       status chips (health/budget/risk) + 6-metric SummaryStrip
  ↓  Priority Areas  ← the dominant element (full-width DataTable + FilterBar)
  ↓  Strategic timeline (full-width tracks, month axis, markers, zoom)
  ↓  Executive activity (shared ActivityFeed)
[supporting column: upcoming reviews · decisions · reports · documents · searches]
```

Row click → **Inspector** (Overview, Projects, Budget, Targets, Risks,
Discussion, Files, History, Metadata). Double-click / "Open workspace" → drills
into the Priority Area. The page minimises editing; editing happens in the
Inspector.

## Deliverables / how to view

States are reachable on `/portfolio` via `?state=`:

| Deliverable | URL |
|-------------|-----|
| Portfolio with live data | `/portfolio` |
| Empty portfolio | `/portfolio?state=empty` |
| Loading (skeletons; timeline streams after table) | `/portfolio?state=loading` |
| Error (contextual — timeline & activity only) | `/portfolio?state=error` |
| Offline | `/portfolio?state=offline` |
| Desktop / Tablet / Mobile | resize (`≤1024` stacks supporting, `≤768` mobile) |
| Inspector | click any Priority Area row |

By default the page boots with a 700ms progressive skeleton; the **timeline
streams in ~1.1s after the table** (per spec), and a failed timeline/activity
never hides the table.

## Approved primitives reused

PageHeader · SummaryStrip · DataTable · FilterBar · StatusChip · Avatar ·
ActivityFeed · Inspector · Buttons · Icon · Command Palette (frame).
New approved primitive: **StrategicTimeline** (full-width, never a widget).
No portfolio cards, no gauges, no KPI tiles.

## Accessibility annotations (WCAG AA)

- **Landmarks:** `<h1>` (page header), each section is `<section aria-labelledby>`
  with `<h2>`; supporting column is `<aside aria-label>`; activity uses
  `role="feed"`.
- **Table:** DataTable `role="grid"`, `aria-sort` on sortable headers, rows
  focusable and open the Inspector on Enter/Space; quick actions are labelled
  buttons that `stopPropagation`; arrow-key cell navigation.
- **Status never colour-only:** every health/budget/risk uses a StatusChip with a
  text label; the budget and risk dots are paired with the percentage/count.
- **Timeline:** zoom is a labelled `role="group"` of `aria-pressed` toggles;
  each marker has a `title` + visually-hidden label; a legend names every shape.
- **Inspector:** focus moves to close on open and returns to the row on close;
  `Esc` closes; `inert` when hidden; full-screen on mobile.
- **Menus:** Generate-report cluster and the ⋯ actions menu use `aria-haspopup`
  / `aria-expanded` / `role="menu"`, close on `Esc`/outside click.
- **Focus:** visible rings from the global `:focus-visible` token.

## Motion behaviour

| Element | Property | Duration | Easing |
|---------|----------|----------|--------|
| Inspector open/close | transform | 250ms | ease-out |
| Timeline zoom (bars/markers reposition) | left/width | 200ms | ease-out |
| Progress bars fill | width | 250ms | ease-out |
| Filtering / sorting | row reflow | instant + 100ms hover | ease-out |
| Dropdown menus | opacity + translateY | 150ms | ease-out |

No bounce, no decorative animation; everything collapses under
`prefers-reduced-motion`.

## Notes

- Mock data in `lib/mock/portfolio.ts`.
- The Priority Areas table scrolls horizontally **inside its own container** on
  narrow widths; the page never scrolls horizontally.
- `StrategicTimeline` is reusable and can be promoted to the shared library.
