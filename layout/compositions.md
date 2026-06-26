# View Compositions

## Dashboard Composition

### Dashboards Are Not Card Collections

The most common failure of dashboard design is treating a dashboard as a collection of equal-sized KPI cards. This produces a layout where everything appears equally important — which means nothing is prioritized.

**Avoid:**
```
[Card]  [Card]  [Card]  [Card]
[Chart]         [Chart]
[Card]  [Card]
```

**Prefer:**
```
Summary (health, critical numbers)
  ↓
Key Table (the primary operational view)
  ↓
Timeline (sequence and upcoming work)
  ↓
Recent Activity (what changed)
  ↓
Secondary Analytics (supporting trends)
```

### Dashboard Information Flow

Every dashboard should tell a story from top to bottom:

1. **Where are we?** — Health summary, key metrics
2. **What is happening?** — Active work, current status
3. **What is upcoming?** — Timeline, milestones, deadlines
4. **What changed?** — Recent activity feed
5. **What are the trends?** — Analytics that support forward decisions

Information that answers "Where are we?" must come before information that asks "What should we do next?"

### Dashboard Hierarchy Rule

The primary view on any dashboard should be a **structured table or list**, not a visual widget. Charts and cards support the table — they do not replace it.

```
✗ Wrong
[Health Card]  [Budget Card]  [Milestone Card]  [Team Card]
[Bar Chart]    [Line Chart]
[Activity Table]

✓ Correct
[Summary Row: Health  ·  Budget  ·  Milestones  ·  KPIs]
[Intervention Table (primary view)]
[Timeline strip]
[Activity Feed]
```

---

## Table Composition

Every table view follows the same composition order:

```
Toolbar (saved views, actions)
  ↓
Filters (active filter chips)
  ↓
Column Headers (sticky)
  ↓
Table Content (virtualized)
  ↓
Pagination / Infinite Scroll
  ↓
Summary Row (totals, counts)
```

**Nothing interrupts the table.** No interstitial cards, no promotional banners, no inline help prompts within the table content area.

### Toolbar Composition

```
┌────────────────────────────────────────────────────────┐
│ [All]  [My Work]  [Overdue]  [Saved Filter ▾]          │
│                        [Sort ▾]  [Group ▾]  [Columns]  │
│                              [+ New Activity]          │
└────────────────────────────────────────────────────────┘
```

Left side: View switchers and saved filters.
Right side: Configuration controls and primary action.

Filters and search appear below the toolbar when active, as chips — not inside the toolbar row.

### The Table As Primary Content

The table should occupy as much of the screen as possible. Competing visual elements above the table should be minimal.

If a summary row is required above the table (e.g., total activities: 43, blocked: 5), it should be compact — one line, small text — not a row of large KPI cards.

---

## Timeline Composition

### Timelines Need Space

**Timeline occupies the full width whenever possible.**

Do not compress timelines into cards. Do not place a timeline in a 30% supporting panel. Timelines communicate relationships — the visual distance between items carries meaning. Compressing a timeline removes that meaning.

```
✗ Wrong — Timeline in a card
┌────────────────────────────────────┬────────────┐
│ Activities                         │ [Timeline] │
│                                    │            │
└────────────────────────────────────┴────────────┘

✓ Correct — Timeline at full width
┌──────────────────────────────────────────────────┐
│ Timeline                                         │
│ ████████░░░░░░░░░░░░░                           │
│ ──────██████████────────                         │
│ ─────────────────████───                         │
└──────────────────────────────────────────────────┘
```

### Timeline + Table (Dual View)

When users need both timeline and activity table, use a split layout with user-resizable panels:

```
┌──────────────────────────────────────────────────┐
│ ████████░░░░░░░░   Timeline   ░░░░░░░░███████    │
├──────────────────────────────────────────────────┤ ← Drag handle
│ Activity Table                                   │
└──────────────────────────────────────────────────┘
```

The timeline communicates the macro view. The table communicates the operational detail.

---

## Analytics Composition

### Charts Answer Questions

Every chart requires all four of the following. If any is missing, remove the chart.

| Requirement | Example |
|-------------|---------|
| **Question** | "Are activities completing on time?" |
| **Answer** | "68% completed on or before due date" |
| **Insight** | "Completion rate dropped 12% in Q3" |
| **Action** | "Review September activities for blockers" |

A chart that a user can look at and then do nothing about is decoration.

### Analytics Layout

Analytics sections use a structured hierarchy:

```
[Section Heading]
[One-line summary of what this shows]

[Primary Chart — full width or 70%]

[Supporting metrics — smaller, 3-column]
[Chart footnote or data source]
```

Never lead with charts. Lead with numbers and context, then support with the chart.

### Chart-to-Table Parity

Every chart should have an accessible table equivalent:

```
[Chart]     ← Visual representation
[▾ View as table]    ← Toggle to tabular data
```

Users who cannot read charts, or who need exact values, must be able to access the underlying data.

---

## Empty Space and Alignment

### Whitespace Defines Hierarchy

**Never center isolated components on large screens.**

An icon and two lines of text centered on a 1400px canvas look abandoned. They belong left-aligned, in a contained section, with appropriate surrounding content.

```
✗ Wrong — Centered isolation
┌────────────────────────────────────────────────┐
│                                                │
│                  [Icon]                        │
│          No activities yet.                    │
│          [Create Activity]                     │
│                                                │
└────────────────────────────────────────────────┘

✓ Correct — Left-aligned, structured
┌────────────────────────────────────────────────┐
│ Activities (0)                [+ New Activity] │
│─────────────────────────────────────────────── │
│ [Icon] No activities yet.                      │
│ Activities are how delivery happens.            │
│ [Create your first activity →]                 │
└────────────────────────────────────────────────┘
```

Content should align to structure. Structure comes from the grid. The grid comes from the page's left margin.
