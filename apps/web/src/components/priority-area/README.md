# Priority Area Workspace

One strategic national objective and all the Projects delivering it. An operational
strategic workspace inside the Workspace Frame at `/priority-areas`. Built only from
approved primitives — no project cards, no gauges, no dashboard widgets.

## Structure (vertical flow)

```
Page Header (name · mission · owner · cycle · health · Generate report · ⋯ · Create project)
  ↓  Strategic summary   status chips (health/target/budget) + 6-metric SummaryStrip
  ↓  Projects            ← dominant element (DataTable + FilterBar views)
  ↓  Target progress     restrained sparklines + current/target + forecast + confidence
  ↓  Strategic timeline  full-width tracks (milestones, reviews, funding, deliverables)
  ↓  Risk register       structured DataTable (row → Inspector); never warning cards
  ↓  Executive activity  shared ActivityFeed
[supporting column: upcoming reviews · decisions · reports · documents · searches]
```

Project rows → **Project Inspector** (Overview, Interventions, Budget, Targets,
Risks, Discussion, Files, History, Metadata). Risk rows → Inspector. Double-click
a project → drills into the Project workspace. Editing happens in Inspectors only.

## Deliverables / how to view

States on `/priority-areas` via `?state=`:

| Deliverable | URL |
|-------------|-----|
| Workspace with data | `/priority-areas` |
| Empty priority area | `/priority-areas?state=empty` |
| Loading (timeline streams after table) | `/priority-areas?state=loading` |
| Error (contextual — timeline & activity) | `/priority-areas?state=error` |
| Offline | `/priority-areas?state=offline` |
| Desktop / Tablet / Mobile | resize (`≤1024` stacks, `≤768` mobile) |
| Inspector | click a project or risk row |

Boots with a 700ms progressive skeleton; the timeline streams ~1.1s after the
table; a failed timeline or activity never hides the Projects table or targets.

## Approved primitives reused

PageHeader · SummaryStrip · DataTable · FilterBar · StatusChip · Avatar ·
ActivityFeed · Inspector · StrategicTimeline · Buttons · Sparkline · Command
Palette (frame). New approved primitive: **Sparkline** (line only, no gauges/donuts).

## Accessibility annotations (WCAG AA)

- **Landmarks:** `<h1>` page header; each section `<section aria-labelledby>` + `<h2>`;
  supporting column `<aside>`; activity `role="feed"`.
- **Tables:** DataTable `role="grid"`, `aria-sort`, focusable rows open the
  Inspector on Enter/Space, labelled quick-action buttons that `stopPropagation`.
- **Targets:** each is a list item; the sparkline has `role="img"` + `aria-label`;
  status is a StatusChip with text ("On track / At risk / Off track") — never
  colour-only; confidence stated in words.
- **Risk register:** severity and status are StatusChips with text labels
  (High/Medium/Low); impact/likelihood are text, not colour.
- **Inspector:** focus moves to close on open, returns to row on close; `Esc`
  closes; `inert` when hidden; full-screen on mobile.
- **Focus:** visible rings via the global `:focus-visible` token.

## Motion specifications

| Element | Property | Duration | Easing |
|---------|----------|----------|--------|
| Inspector open/close | transform | 250ms | ease-out |
| Timeline zoom | left/width | 200ms | ease-out |
| Progress / contribution bars | width | 250ms | ease-out |
| Filtering / sorting | reflow | instant + 100ms hover | ease-out |
| Menus | opacity + translateY | 150ms | ease-out |

No bounce, no decorative animation; collapses under `prefers-reduced-motion`.

## Notes

- Mock data in `lib/mock/priorityArea.ts`. Reuses the portfolio `StrategicTimeline`,
  workspace `ActivityFeed` / `ItemInspector`, and portfolio layout/context/inspector
  styles to avoid duplication.
- Projects and Risk tables scroll horizontally **inside their own containers** on
  narrow widths; the page never scrolls horizontally.
