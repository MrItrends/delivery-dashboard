# 49 — Tables

> Tables are the primary interface. Not cards.

## Philosophy

The platform is information dense. Government delivery produces large amounts of data. **Tables should feel beautiful**, not functional-but-ugly.

The Activity Table, Project Table, and Intervention Table will be the most-used interfaces in the entire product. They deserve the most design attention.

---

## Required Features

Every data table in the product must support:

| Feature | Description |
|---------|-------------|
| Column Resize | Drag column borders to resize |
| Column Reorder | Drag headers to reorder |
| Pin Columns | Pin first N columns on scroll |
| Grouping | Group rows by any field |
| Sorting | Click headers to sort ASC/DESC |
| Filtering | Per-column and global filter |
| Inline Editing | Edit cells without leaving the table |
| Saved Views | Save filter/sort/column combinations |
| Bulk Selection | Checkbox + shift-select + cmd-select |
| Export | CSV, Excel |
| Virtualization | Only render visible rows |
| Sticky Header | Header stays visible on scroll |
| Sticky First Column | First column stays visible on horizontal scroll |

---

## Row Height

Users should choose their preferred density:

| Mode | Row Height | Usage |
|------|-----------|-------|
| Comfortable | 52px | Default — readable for long sessions |
| Compact | 36px | Power users, large datasets |

---

## Column Types

| Type | Rendering |
|------|-----------|
| Text | Left-aligned, truncated with tooltip |
| Number | Right-aligned, tabular figures |
| Date | Formatted, relative when recent |
| Status | Badge with semantic color |
| Owner | Avatar + name |
| Health | Health indicator |
| Progress | Progress bar + percentage |
| Priority | Priority badge |
| Actions | Context menu (on hover) |
| Link | Underlined, opens drawer or page |

---

## Selection Model

| Interaction | Effect |
|-------------|--------|
| Click checkbox | Select single row |
| Shift + Click | Select range |
| ⌘/Ctrl + Click | Toggle individual row |
| Click header checkbox | Select all on page |
| Click again | Deselect all |

---

## Bulk Actions Bar

When rows are selected, a bulk action bar appears at the bottom:

```
┌─────────────────────────────────────────────────────┐
│ 12 selected  │  Assign  │  Status  │  Archive  │ ✕  │
└─────────────────────────────────────────────────────┘
```

Bulk actions available:
- Assign owner
- Update status
- Set priority
- Set due date
- Archive
- Export selected
- Add labels

---

## Inline Editing

Clicking an editable cell should allow immediate editing:

```
Single click   → Select row (highlight)
Double click   → Enter edit mode for that cell
ESC            → Cancel edit
Enter / Tab    → Confirm and move to next
```

Saved automatically on blur.

---

## Empty Table

Never show a blank table. Always:

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│         No activities match your filters.           │
│                                                     │
│         [Clear filters]  or  [Create activity]      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## Filter UX

Filters should appear as chips above the table:

```
[ Status: In Progress ✕ ] [ Owner: Sarah ✕ ] [ + Add filter ]
```

Active filters are always visible. Easy to remove. Easy to save as a view.

---

## Saved Views

Users should save combinations of filters, sort orders, and column selections as named views:

```
Default  │  My Activities  │  Blocked  │  This Week  │  + New view
```

Saved views appear as tabs or a dropdown depending on screen size.

---

## Virtualization

Tables with more than 50 rows should use **windowed rendering**. Only visible rows (plus a small buffer) should be in the DOM.

This allows the table to handle 100,000+ rows without performance degradation.

---

## Keyboard Navigation

| Key | Action |
|-----|--------|
| ↑ ↓ | Move between rows |
| → | Open inspector for selected row |
| ← | Close inspector |
| Space | Toggle row selection |
| Enter | Open full detail |
| E | Inline edit selected cell |
| ESC | Cancel / deselect |
| ⌘A | Select all |
| ⌘K | Command palette |
