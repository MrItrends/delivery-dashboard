# Tables, Cards, Inspector & Drawers

## Table-First Design

### The Default Decision

When deciding between cards and tables for operational data — **always prefer tables**.

| Question | Answer |
|---------|--------|
| Does the user need to compare multiple items? | Table |
| Does the user need to scan and act on many items? | Table |
| Does the user need to filter and sort? | Table |
| Does the user need to select multiple items? | Table |
| Does the user need to see one representative item? | Card |
| Is the user comparing a small number of summaries? | Card |

**Operational software lives in tables.** Cards summarize. Tables are where users spend their working hours.

### Why Tables Win

**Tables scale.** A table of 10 activities works. A table of 10,000 activities works (with virtualization). A grid of 10,000 cards does not.

**Tables compare.** When 50 activities are displayed in a table, a user can immediately identify the 3 that are overdue, the 5 that are blocked, and the 12 assigned to Ahmed. In a card grid, this requires scanning each card individually.

**Tables edit.** Inline editing is natural in a table — click a cell, change the value. In a card grid, editing requires opening a separate view.

**Tables prioritize information.** The column structure forces designers to decide what information matters. Card grids often end up showing either too little (surface-level summary) or too much (overloaded cards).

### The Table-First Rule

If a designer or AI proposes a card grid for data that:
- Has more than 6 items
- Needs to be sorted or filtered
- Requires bulk actions
- Contains more than 4 data points per item
- Will grow over time

**Replace it with a table.**

---

## Card Usage

Cards have specific, limited uses. Outside these uses, a table is always better.

### When to Use Cards

| Use Case | Why Cards Work |
|---------|---------------|
| Comparing 3–6 summaries | Visual comparison of contained units |
| KPI metrics (3–4 per row) | Single metric with context |
| Introducing object previews | Enticing detail without full commitment |
| Mobile list items | Cards adapt well to narrow screens |
| Dashboard summary widgets | Quick glance, not operational |

### When Not to Use Cards

- **Replacing structured data.** If the data has more than 4 fields per item or needs to be compared — use a table.
- **Long lists.** Card grids with more than 12 items become visually overwhelming and hard to scan.
- **Operational workflows.** Activities, milestones, and interventions that require action live in tables.

### Card Design Constraints

```
Max 4 data points per card
No competing CTAs (one action maximum)
No colored backgrounds
No heavy shadows
Consistent height within a row
Border radius: 12px
Padding: 24px
```

---

## The Right Inspector

The Inspector is a **permanent design pattern**. It is not designed per feature. Every Inspector in the product looks and behaves the same way.

### Inspector Anatomy (Always)

```
┌──────────────────────────────────────────────────────┐
│ [Object Type]                            [✕ Close]   │
│ [Title]                                              │
│ [Status]  [Priority]  [Owner]                        │
├──────────────────────────────────────────────────────┤
│ [Overview]  [Discussion]  [History]  [Files]  [More] │
├──────────────────────────────────────────────────────┤
│                                                      │
│  Tab Content (scrollable)                            │
│                                                      │
├──────────────────────────────────────────────────────┤
│ [Open full page ↗]                                   │
└──────────────────────────────────────────────────────┘
```

### Inspector Dimensions

| State | Width |
|-------|-------|
| Default | 480px |
| Expanded | 720px |
| Fullscreen | Optional |

The Inspector always slides in from the right. The background page shrinks proportionally.

### Inspector Tabs (Standard)

```
Overview    ← Summary, key fields, description
Discussion  ← Comment thread
History     ← Immutable audit log
Files       ← Attached documents and evidence
Metadata    ← All fields, relationships, settings
```

This order is fixed. Individual features may add tabs, but they come after the standard five — never before them.

### The Inspector Never Becomes a Page

An Inspector that grows to 900px wide is a page. It should be redesigned as a page.

An Inspector with 12 tabs is a page. Consolidate.

An Inspector that requires its own header navigation is a page.

If the content of an Inspector exceeds what can be comfortably read and edited in a panel — it belongs on a dedicated page. The Inspector provides quick access. Pages provide deep editing.

---

## Drawers

### When to Use Drawers

| Object Type | Creation Pattern |
|-------------|----------------|
| Small objects (comments, tags) | Inline |
| Medium objects (activities, milestones) | Right Drawer |
| Large objects (interventions, reports) | Multi-step Drawer or Wizard |
| Very large objects (workspace setup) | Dedicated Page |

**Never build full-page forms for medium objects.** If it can be done in a drawer, it should be.

### Drawer Dimensions

```
Width:      480–640px (right drawer)
Height:     50–90% viewport (bottom drawer, mobile)
Radius:     0 (full-height panel)
Overlay:    rgba(0,0,0,0.4) behind
Animation:  250ms slide from right
```

### Drawer vs. Inspector

| Inspector | Drawer |
|-----------|--------|
| View and edit existing objects | Create or configure objects |
| Opened by clicking items in lists | Opened by actions (New, Edit settings) |
| Part of a persistent layout pattern | Temporary workspace |
| Always 480–720px | Always 480–640px |
| Has standard 5-tab anatomy | Custom to the action |

They look similar but serve different purposes. Do not use a Drawer to view object detail — that is the Inspector's role.
