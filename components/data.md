# Data Components

## 06 — Data Table

### Purpose

The primary working surface of the Delivery Dashboard. The Data Table is not a supporting component — it is where operational software users spend the majority of their time.

### Anatomy

```
Toolbar (Saved views · Sort · Group · Columns · Export · Primary Action)
  ↓
Search + Active Filter Chips
  ↓
Column Controls (resize, reorder, pin)
  ↓
Column Header Row (sticky)
  ↓
Rows (virtualized from row 51+)
  ↓
Bulk Action Bar (appears on multi-select)
  ↓
Pagination / Load More / Count
```

### Required Features

| Feature | Behavior |
|---------|---------|
| Sorting | Click column header; second click reverses; third removes sort |
| Filtering | Filter chips below toolbar; additive (AND logic by default) |
| Grouping | Group by any column; groups are collapsible |
| Column Resize | Drag column borders; persisted per user |
| Column Reorder | Drag column headers; persisted per user |
| Column Pin | Pin columns left or right; persist per view |
| Selection | Checkbox column (first); Shift+click range; ⌘+click individual |
| Inline Editing | Double-click any editable cell; Enter to confirm; Esc to cancel |
| Virtualization | Active for >50 rows; renders visible rows ± 10 buffer |
| Sticky Header | Column headers always visible |

### Optional Features

| Feature | When to Add |
|---------|------------|
| Saved Views | Any table used regularly with different filter sets |
| Density Toggle | Any table used by power users |
| Export | Any table where data analysis is expected |
| Row Grouping | Any table with meaningful categorical groupings |

### Row Anatomy

```
[☐ Checkbox] [Status ●] [Title — clickable] [Owner] [Due Date] [Priority] [···]
```

### Row Behavior

| Interaction | Result |
|-------------|--------|
| Hover | Row highlight + quick action icons (Edit, ···) fade in |
| Single click | Opens Inspector (table shifts left) |
| Double click | Inline title edit |
| Checkbox click | Row enters selection mode |
| ⌘+click | Multi-select without deselecting others |
| Right-click | Context menu |

### Row States

| State | Appearance |
|-------|-----------|
| Default | White background |
| Hover | neutral-50 background |
| Selected | brand-50 background, checkbox checked |
| Focused | brand-200 outline (keyboard navigation) |
| Overdue | Red dot before title or red due date |
| Blocked | Amber background tint |
| Complete | Title neutral-400 (reduced emphasis) |

### Column Types and Inline Editing

| Column Type | Inline Edit Behavior |
|------------|---------------------|
| Text (title) | Text input, Enter to save, Esc to cancel |
| Status | Dropdown of valid states, closes on selection |
| Person (owner) | Person picker, search by name, closes on selection |
| Date | Date picker, keyboard navigable |
| Priority | Segmented selector (Low/Medium/High/Critical) |
| Number | Number input, Enter to save |
| Read-only | No inline edit; click opens Inspector |

### Table States

| State | Display |
|-------|---------|
| Loading | 10 skeleton rows (height matches density mode) |
| Empty (no data) | Empty state component |
| Empty (filtered) | "No results for these filters" + Clear filters action |
| Error | Error state with retry action |
| Permission Restricted | Partial data with permission notice |

### Accessibility

```
role="grid"
Arrow key navigation between cells
Row selection via Space
Column sorting announced to screen readers
Inline edit opens with Enter or Space, exits with Esc
```

### Anti-Patterns

```
✗ Nested tables (never)
✗ Horizontal scrolling enabled by default (manage with column hiding)
✗ Cards replacing tables for operational data
✗ More than 8 default visible columns (hide secondary columns by default)
✗ Non-virtualized tables with >100 rows
```

---

## 07 — Filter Bar

### Purpose

Control the data perspective of any table or list. The Filter Bar is always contextual to the content below it.

### Contents

```
[Search Input] [Filter ▾] [Active Chips ×] [Saved Views ▾] | [Sort ▾] [Group ▾] [Columns] [Export]
```

Left side: view and filter controls.
Right side: configuration and output controls.

### Behavior

- **Sticky** while the table is in view — never scrolls away with content
- **Persists selections** per user, per screen, between sessions
- **Filter chips** appear below the toolbar row when filters are active
- Active filters are additive (A AND B AND C)
- Right-click on a chip provides edit/remove options

### Saved Views

A Saved View captures: filters, column set, sort, grouping, and density. Named and stored per user. Can be shared with the workspace.

---

## 08 — Timeline

### Purpose

Visualize the temporal relationships between delivery objects — activities, milestones, phases, and their dependencies.

### Features

| Feature | Behavior |
|---------|---------|
| Zoom levels | Day / Week / Month / Quarter / Year |
| Dependencies | Arrow connections between items showing blocking relationships |
| Milestones | Diamond markers at specific dates |
| Critical Path | Highlighted in brand color |
| Pan | Click and drag horizontal pan |
| Drag items | Drag to reschedule (with confirmation for milestone changes) |

### Rules

- **Full width** whenever possible — never compressed into a supporting panel
- Zoom level persisted per user per view
- Dependencies are colored: unblocked (neutral), blocked (red), critical path (brand)

### Anti-Patterns

```
✗ Timeline in a card smaller than 60% of the workspace width
✗ Timeline without zoom controls
✗ Unresponsive drag (must show ghost + snap preview)
```

---

## 09 — Chart

### Purpose

Support decisions by making data patterns visible. Charts explain; they do not decorate.

### Permitted Chart Types

| Type | When Used |
|------|----------|
| Line | Trend over time — performance, spend, completion rate |
| Bar | Comparison between categories at a point in time |
| Area | Volume over time — cumulative progress, budget burn |
| Heatmap | Distribution across two dimensions (e.g., risk matrix) |
| Progress | Single value toward a target (linear, not circular/gauge) |

### Forbidden Chart Types

| Type | Why Forbidden |
|------|--------------|
| Pie / Donut | Hard to compare slices; use a bar chart |
| Gauge | Decorative; use a metric with trend arrow |
| Radar / Spider | Never interpretable in government delivery context |
| 3D | Never — distorts data and reduces accessibility |
| Bubble | Requires three-variable interpretation; use a table |

### Required Annotations

Every chart must have:
1. A title stating what it shows
2. A current value or summary number
3. Axis labels (if using axes)
4. A data source or "last updated" timestamp

### Accessibility

Every chart must have a data table equivalent (`▾ View as table`). Charts use semantic color palettes that remain distinguishable in color-blind modes.

---

## 10 — Metric

### Purpose

Summarize one important number in a compact, scannable format. Metrics are not dashboards — they are single facts with context.

### Anatomy

```
Label          (12px / neutral-500)
Value          (24–32px / 700 / neutral-900)
Trend Arrow    (↑ green / → neutral / ↓ red)
Context        (12px / neutral-400 / "of £2.4M approved")
```

### Rules

- One metric communicates one thing
- Trend arrow indicates direction, not judgment — a budget metric going up is bad; a completion rate going up is good. Add context text to clarify.
- Never use icons as decorations alongside metrics
- Never build "KPI cards" with colored backgrounds — metrics use white backgrounds only

### Anti-Patterns

```
✗ Large colored cards just for a single number
✗ Decorative graphics or illustrations alongside metrics
✗ More than 4 metrics in a row (use a table instead)
✗ Metrics without context (what is this relative to?)
```

---

## 11 — Search

### Purpose

Universal navigation and object discovery.

### Anatomy

```
[🔍 Search input — autofocused, full-width]
  ↓
Recent searches (shown before first keystroke)
  ↓
Live results (grouped by object type)
  ↓
Quick actions (Create, Navigate)
```

### Rules

- **Instant:** Debounced 150ms; results appear as user types
- **Permission-aware:** Only shows objects the current user can access
- Keyboard navigable: Arrow keys move through results; Enter opens; Esc closes
- When embedded in Command Palette, search is the primary input

### Performance Requirements

```
Response time:     < 150ms for results to begin appearing
Index freshness:   Objects searchable within 30 seconds of creation/edit
Scale:             Must handle 100,000+ indexed objects without degradation
```
