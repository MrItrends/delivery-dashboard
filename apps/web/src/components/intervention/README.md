# Intervention Workspace

The operational heart of the platform — where work actually happens. A
collaborative execution environment inside the Workspace Frame at
`/interventions`. Built only from approved primitives.

## Structure (vertical flow)

```
Page Header (name · objective · owner · project · due · status · health · presence · Create activity)
  ↓  Summary             status chips (health/budget/last update) + 6-metric SummaryStrip
  ↓  Activities          ← primary working surface (DataTable + inline status edit)
  ↓  Collaboration       composer + comments/events feed · react · resolve · pin · live typing
  ↓  Milestones          grouped (Delayed / Upcoming / Completed) with owners + approve
  ↓  Evidence & docs     drag-drop · upload states · versions · linked to activities
  ↓  Dependencies        clean list (blocked-by / depends-on), critical-path highlight — never a node graph
  ↓  Recent updates      shared ActivityFeed (the intervention history)
[supporting column: team · reviews · decisions · reports]
```

Activity rows → **Activity Inspector** (Overview, Discussion, Checklist, Evidence,
Files, History, Dependencies, Approvals, Metadata). Activities never navigate
away — everything is edited in the Inspector.

## Live collaboration

- **Presence** — "Viewing now" avatar stack in the header.
- **Typing indicator** — the collaboration composer shows a live "… is typing"
  state (comments only).
- **Comment / mention / react / resolve / pin** — all in the Collaboration
  Stream; @mentions are highlighted; threads can be resolved and pinned.
- **Inline updates** — Activity status is editable directly in the table
  (optimistic + toast).
- **Conflict detection / live cursors** — future-ready (documented).

## File management states (deliverable 12)

Dropzone with drag-over highlight · click-or-drop upload · simulated **uploading**
row with progress · **uploaded** toast · **version** badges (v2, v3…) · preview /
version-history / download actions per file · every file links to an activity.

## Deliverables / how to view

States on `/interventions` via `?state=`:

| Deliverable | URL |
|-------------|-----|
| Live intervention | `/interventions` |
| Empty intervention | `/interventions?state=empty` |
| Loading (secondary sections stream after table) | `/interventions?state=loading` |
| Error (isolated — comments / documents / updates) | `/interventions?state=error` |
| Offline | `/interventions?state=offline` |
| Desktop / Tablet / Mobile | resize (`≤1024` stacks, `≤768` mobile) |
| Activity Inspector | click an activity row |
| Collaboration | presence · inline status · stream react/resolve/pin/typing · Inspector → Discussion |
| File management | drag-drop / upload / versions in Evidence |

Errors are isolated: a failed comments feed, document upload, or updates feed
never affects the Activities table or delivery data.

## Approved primitives reused

PageHeader · SummaryStrip · DataTable · FilterBar · StatusChip · Avatar(Stack) ·
ActivityFeed · Inspector · Buttons · Command Palette (frame). Collaboration
stream, milestones, evidence and dependencies are structured lists — not new card
patterns.

## Accessibility annotations (WCAG AA)

- **Landmarks:** `<h1>`; each section `<section aria-labelledby>` + `<h2>`;
  collaboration `role="feed"`; supporting `<aside>`.
- **Activities table:** `role="grid"`, `aria-sort`, focusable rows open the
  Inspector on Enter/Space; inline status is a `listbox` with `aria-expanded`;
  quick actions are labelled buttons that `stopPropagation`.
- **Status/priority never colour-only:** chips carry text; priority/evidence/
  comment cells pair dot/icon with a label or count.
- **Collaboration:** composer is a labelled textarea; typing indicator uses
  `aria-live="polite"`; react is an `aria-pressed` toggle.
- **Checklist:** real checkboxes with visible focus; completed items struck
  through *and* dimmed.
- **Inspector:** focus moves to close on open, returns to row on close; `Esc`
  closes; `inert` when hidden; full-screen on mobile.

## Motion specifications

| Element | Property | Duration | Easing |
|---------|----------|----------|--------|
| Inspector open/close | transform | 250ms | ease-out |
| Inline status menu | opacity + translateY | 100ms | ease-out |
| Upload progress / bars | width | 250ms | ease-out |
| Typing dots | opacity | 1.2s loop | ease |
| Status / checklist update | colour | 100ms | ease-out |
| Menus / dropdowns | opacity + translateY | 150ms | ease-out |

No bounce, no decorative animation; collapses under `prefers-reduced-motion`.

## Notes

- Mock data in `lib/mock/intervention.ts`. Reuses the portfolio layout / actions /
  inspector styles, the project discussion styles, and the workspace ActivityFeed.
- Tables scroll horizontally **inside their own containers**; the page never
  scrolls horizontally.
