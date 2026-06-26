# Tables

## Philosophy

Tables are the **primary interface** for government delivery work. They must be powerful enough for 100,000+ rows, fast enough to feel instant, and flexible enough to serve every team's workflow.

The Activity Table is the most important component in the product.

---

## Design Reference

| Product | What We Learn |
|---------|--------------|
| Linear | Speed, keyboard-first, instant updates |
| Airtable | Column flexibility, grouping, inline editing |
| Notion | Inline context, progressive disclosure |
| Modern Jira | Status management, bulk operations |

**Not:** Excel, Google Sheets, legacy government systems.

---

## Table Anatomy

```
┌──────────────────────────────────────────────────────────────────┐
│ Table Header                                           Actions   │
│ [Filters] [Group By] [Sort] [Columns] [Views] [+ New]           │
├────────────────────────────────────────────────────────────────-─┤
│ Column Headers (sticky)                                          │
│ ☐ │ Title ↑ │ Status │ Owner │ Due Date │ Priority │ ...        │
├──────────────────────────────────────────────────────────────────┤
│ Row 1 ────────────────────────────────────────────────────────── │
│ ☐ │ Submit Planning Application │ In Progress │ Ahmed │ 15 Sep  │
├──────────────────────────────────────────────────────────────────┤
│ Row 2 ────────────────────────────────────────────────────────── │
│ ☐ │ Procurement Review            │ Blocked     │ Sarah │ 22 Sep  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Table Columns

### Activity Table — Default Columns

| Column | Type | Width | Editable |
|--------|------|-------|---------|
| Checkbox | Selection | 40px | — |
| Reference | Text | 80px | No |
| Title | Text | Auto | Yes |
| Status | Enum | 130px | Yes |
| Owner | User | 160px | Yes |
| Intervention | Link | 160px | No |
| Due Date | Date | 120px | Yes |
| Priority | Enum | 100px | Yes |
| Health | Status | 80px | No |
| Progress | Percentage | 100px | Yes |
| Tags | Tags | 160px | Yes |
| Updated | DateTime | 120px | No |

Users can add, hide, reorder, and resize columns. Column state is saved per user per view.

---

## Row States

| State | Visual Behavior |
|-------|----------------|
| Default | Standard appearance |
| Hover | Background: `--color-surface-hover` |
| Selected | Background: `--color-surface-selected`, checkbox checked |
| Expanded | Row height increases to show detail |
| Editing | Field highlighted, edit cursor |
| Overdue | Due date shown in `--color-status-risk` |
| Blocked | Subtle left border in `--color-status-critical` |
| Completed | Text: `--color-text-tertiary`, strikethrough optional |
| Loading | Skeleton shimmer |

---

## Inline Editing

Clicking an editable cell enters edit mode:

```
[In Progress ▼] → [Not Started | Planned | In Progress | Blocked | Completed ...]
```

| Interaction | Edit Type |
|------------|----------|
| Click status cell | Dropdown |
| Click owner cell | User selector popup |
| Click date cell | Date picker popup |
| Click title cell | Text input inline |
| Click priority | Dropdown |
| Double-click | Rich text editor (for description) |

Edits save on blur or Enter. Cancel on ESC.

---

## Filtering

```
[+ Add Filter]
  ↓
Status: is → [At Risk, Blocked]
Owner: is → [Ahmed Yusuf]
Due Date: before → [30 September]
Priority: is not → [Low]
```

Filters combine with AND. Users can save named filters (Views). Filters are shown as chips above the table.

---

## Grouping

Group by: Status, Owner, Priority, Intervention, Project, Due Week, Tag.

Groups are collapsible. Group counts are visible. New rows added within a group inherit the group's value.

```
▼ Blocked (3)
  ─────────────────────
  ─────────────────────
  ─────────────────────

▼ In Progress (12)
  ─────────────────────
```

---

## Sorting

Click column header to sort. Click again to reverse. Hold Shift to multi-sort.

Sort indicator: Arrow shows sort direction and position.

---

## Bulk Actions

Select multiple rows → bulk action bar appears at bottom:

```
┌────────────────────────────────────────────────────────┐
│ 5 activities selected                    [×] Dismiss   │
│ [Assign] [Move] [Archive] [Delete] [Status ▼] [More ▼]│
└────────────────────────────────────────────────────────┘
```

---

## Saved Views

Users can save any combination of: Filters, Grouping, Sort, Visible columns, Column widths.

Views appear as tabs above the table. Example tabs: All Activities, My Activities, Blocked, Overdue, Due This Week.

Views are: Personal or shared, Named, Editable, Deletable.

---

## Virtualization

Tables with more than 100 rows must use virtual rendering. Only visible rows are in the DOM.

Implementation: `react-virtual` or `@tanstack/virtual`.

Performance target: 100,000 rows, 60fps scrolling, < 300ms initial render.

---

## Row Height

| Mode | Height |
|------|--------|
| Compact | 40px |
| Default | 48px |
| Comfortable | 56px |
| Expanded | Auto |

Users can select row height preference. Preference is saved.

---

## Column Pinning

Users can pin columns to the left or right. Pinned columns remain visible during horizontal scroll.

Pinned columns: Title (left), Actions (right) by default.

---

## Accessibility

- Full keyboard navigation (↑↓←→ Tab)
- `aria-sort` on sorted column headers
- `aria-selected` on selected rows
- `role="grid"` on table container
- `role="row"`, `role="gridcell"` on rows and cells
- Announce bulk selection count to screen readers
- Focus management when opening/closing inline editors
