# Layout Principles

## Page Depth

Users should rarely scroll through unrelated content. **Each scroll should continue the same story.**

A page that starts with an Intervention summary, continues with active activities, then shows milestones, then budget — that is a coherent story about an intervention. The user is scrolling through a single subject, increasing in detail.

A page that starts with an Intervention summary, then has a team member spotlight widget, then an unrelated news feed, then analytics for the entire portfolio — that is not a story. That is an accumulation. Each disconnected widget requires the user to reset their mental context.

**Never append disconnected widgets to fill vertical space.** Empty space is preferable to irrelevant content.

---

## Visual Balance

Balance information. Not symmetry.

Symmetrical layouts look elegant in design tools and feel cold and mechanical in use. Information does not arrive in equal-sized packages. A table of 40 activities needs more space than a 4-field metadata panel. Give it that space.

**Large tables balance with narrow inspectors.** A 70% wide activity table is balanced by a 30% supporting panel. These are not equal — and they should not be.

**Timelines balance with summaries.** A full-width timeline is balanced by a compact summary row above it. The summary is brief. The timeline is expansive. Together they provide both context and detail.

**Avoid perfectly mirrored layouts.** Two equal panels side-by-side imply both sides are equally important. Usually, one is primary. Design accordingly.

---

## Grid Discipline

Every section aligns to the same grid. Without exception.

```
✗ Wrong — Misaligned elements
┌──────────────────────────────────────────────────────────┐
│  Section A (starts at 24px from left)                    │
│    Section B (starts at 32px from left)                  │
│        Section C (starts at 48px from left)              │
└──────────────────────────────────────────────────────────┘

✓ Correct — Consistent alignment
┌──────────────────────────────────────────────────────────┐
│ Section A                                                │
│ Section B                                                │
│ Section C                                                │
└──────────────────────────────────────────────────────────┘
```

**No floating elements.** Every element is anchored to the grid.

**No arbitrary widths.** Every panel, card, column, and container uses the token-based width scale or fits within the 12-column grid.

**No misaligned panels.** When two sections appear side-by-side, their top edges are aligned. Their padding is consistent. Their spacing tokens are identical.

Inconsistent alignment is immediately visible to users even when they cannot articulate why the interface feels wrong. Consistency creates trust. Misalignment erodes it.

---

## Visual Noise

Visual noise is anything that occupies visual attention without carrying information.

Remove:
- **Decorative dividers** — A horizontal rule that separates sections that whitespace already separates
- **Unnecessary icons** — An icon next to every label when the label already communicates clearly
- **Duplicate labels** — A section heading that repeats what the breadcrumb already said
- **Multiple shadows** — More than one shadow level on the same view
- **Repeated buttons** — The same action appearing in the header, toolbar, and each row
- **Repeated charts** — Two charts asking the same question about the same data

**Every removal increases clarity.** The product should feel like it has exactly what it needs and nothing more.

---

## Screen Opening

A user arriving at any screen should be able to answer three questions **within five seconds** without reading anything carefully:

1. **Where am I?** — The breadcrumb and title communicate location immediately
2. **What is this?** — The description and status communicate the object's identity and state
3. **What should I do?** — The primary action and current content communicate the expected next step

If any of these three questions requires more than five seconds to answer — without clicking, scrolling, or hunting — the composition has failed.

---

## Progressive Disclosure

Complexity should be revealed in response to user intent. Not front-loaded onto every screen.

```
Level 1 — Summary
  The essential information. Health, status, owner, key numbers.
  Always visible. Always above the fold.
  ↓
Level 2 — Details
  The operational information. Activities, milestones, budget.
  Visible with one click or tab change.
  ↓
Level 3 — History
  The record. What happened, when, by whom.
  Accessible in the History tab.
  ↓
Level 4 — Administration
  Settings, permissions, configuration, archive.
  Accessible in Settings tab or via ··· menu.
```

**Do not expose Level 3 or Level 4 information at Level 1.**

A new user arriving at an Intervention should see: what this intervention is, its current health, and the most recent work. They should not see a 200-row audit log, advanced configuration options, or archived content.

Advanced capabilities are available — they are just not promoted until the user wants them.

---

## Composition Principles

Every screen should feel:

```
Stable        — The layout doesn't shift as content loads or changes
Balanced      — Primary content dominates; supporting content supports
Predictable   — Objects appear in familiar locations across screens
Structured    — Information belongs to sections; sections belong to pages
Scannable     — A user can find what they need with eyes, not cursor
Calm          — Nothing is competing for attention unnecessarily
Professional  — Dense, structured, high-information; not decorative
```

And never:

```
Busy          — No competing visual elements
Decorative    — Nothing present for aesthetic effect only
Experimental  — No novel layouts that require learning
Playful       — This is delivery infrastructure, not a consumer app
Chaotic       — No inconsistent spacing, sizing, or alignment
```
