# Project (Programme) Workspace

The operational headquarters for one government programme — where a programme
manager coordinates delivery across multiple Interventions. Lives inside the
Workspace Frame at `/projects`. Built only from approved primitives.

## Structure (vertical flow)

```
Page Header (name · description · owner · cycle · health · presence · Create intervention)
  ↓  Programme summary   status chips (health/confidence/budget) + 6-metric SummaryStrip
  ↓  Interventions       ← dominant working surface (DataTable + inline status edit)
  ↓  Programme timeline  full-width tracks (milestones, reviews, funding, deliverables)
  ↓  Decision register   first-class operational records (DataTable, row → Inspector)
  ↓  Risks & issues      structured DataTable (no warning cards)
  ↓  Recent activity     shared ActivityFeed (GitHub-style, never chat)
[supporting column: reviews · decisions · reports · documents · files]
```

Intervention rows → **Intervention Inspector** (Overview, Activities, Milestones,
Budget, Targets, Risks, Files, Discussion, History, Metadata). Decision and risk
rows → Inspector. Double-click an intervention → drills into its workspace.

## Collaboration (embedded, never separate)

- **Presence** — "Viewing now" avatar stack in the page header.
- **Assign / inline updates** — the Status column is inline-editable in the table
  (click → choose → optimistic update + toast); no page navigation.
- **Comments + mentions** — the Intervention Inspector's Discussion tab has a real
  thread with @mention highlighting and a composer.
- **Evidence** — Files tab; **approvals** — History tab; **decisions** — the
  Decision Register. All reachable without leaving the workspace.

## Deliverables / how to view

States on `/projects` via `?state=`:

| Deliverable | URL |
|-------------|-----|
| Project with live data | `/projects` |
| Empty project | `/projects?state=empty` |
| Loading (timeline streams after table) | `/projects?state=loading` |
| Error (contextual — timeline / decisions / activity) | `/projects?state=error` |
| Offline | `/projects?state=offline` |
| Desktop / Tablet / Mobile | resize (`≤1024` stacks, `≤768` mobile) |
| Inspector | click an intervention, decision, or risk row |
| Collaboration | presence in header · inline status edit · Inspector → Discussion |

Errors are isolated: a failed timeline, decision register, or activity feed never
hides the Interventions table or programme data.

## Approved primitives reused

PageHeader · SummaryStrip · DataTable · FilterBar · StatusChip · Avatar(Stack) ·
ActivityFeed · Inspector · StrategicTimeline · RiskRegisterTable · Buttons ·
Command Palette (frame). The Decision Register is the DataTable with a decision
column set — not a new widget.

## Accessibility annotations (WCAG AA)

- **Landmarks:** `<h1>`; each section `<section aria-labelledby>` + `<h2>`;
  supporting `<aside>`; activity `role="feed"`.
- **Tables:** `role="grid"`, `aria-sort`, focusable rows open the Inspector on
  Enter/Space; quick actions + inline status are labelled buttons that
  `stopPropagation`; the inline status editor is a `listbox`/`option` with
  `aria-expanded`.
- **Status never colour-only:** every chip carries a text label; budget/risk dots
  are paired with numbers.
- **Inspector:** focus moves to close on open and back to the row on close; `Esc`
  closes; `inert` when hidden; full-screen on mobile.
- **Discussion:** composer is a labelled textarea; mentions are styled text, not
  colour-only.
- **Focus:** visible rings via the global `:focus-visible` token.

## Motion specifications

| Element | Property | Duration | Easing |
|---------|----------|----------|--------|
| Inspector open/close | transform | 250ms | ease-out |
| Inline status menu | opacity + translateY | 100ms | ease-out |
| Timeline zoom | left/width | 200ms | ease-out |
| Progress bars | width | 250ms | ease-out |
| Status update (chip) | colour | 100ms | ease-out |
| Menus / dropdowns | opacity + translateY | 150ms | ease-out |

No bounce, no decorative animation; collapses under `prefers-reduced-motion`.

## Notes

- Mock data in `lib/mock/project.ts`. Reuses the portfolio `StrategicTimeline` /
  actions menu / layout + inspector / context styles, the priority-area
  `RiskRegisterTable`, and the workspace `ActivityFeed` / `ItemInspector`.
- Tables scroll horizontally **inside their own containers** on narrow widths;
  the page never scrolls horizontally.
