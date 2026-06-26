# Pattern 31 — Data Table Interaction

## Philosophy

Tables are the **primary interface** of the Delivery Dashboard.

They are not supporting components. They are where users spend the majority of their time. The table should feel like a workspace, not a spreadsheet.

---

## Table Goals

Users should be able to:
- Understand information immediately
- Scan large datasets quickly
- Edit without leaving context
- Perform bulk operations efficiently
- Navigate entirely with the keyboard

---

## Table Anatomy

```
Table
├── Toolbar
├── Saved Views
├── Filters
├── Search
├── Column Controls
├── Header
├── Rows
├── Bulk Action Bar
├── Pagination / Infinite Scroll
└── Summary
```

---

## Default Behavior

| Interaction | Action |
|-------------|--------|
| Click row | Inspector opens |
| Double click row | Inline edit (where applicable) |
| Checkbox | Enter bulk mode |
| Hover | Reveal secondary actions |

---

## Row Behavior

Each row behaves like an object. A row should communicate without expansion:

- Status
- Owner
- Health
- Last Updated
- Priority
- Progress

---

## Column Behavior

Users may:
- Resize
- Reorder
- Pin
- Hide
- Group
- Sort

These preferences **persist per user**.

---

## Saved Views

Users save combinations of:
- Filters
- Sorting
- Visible Columns
- Grouping
- Density

Saved Views become part of the user's workflow. They are named, shareable, and editable.

---

## Bulk Mode

Bulk Mode appears **only after** one or more rows are selected.

**Supported actions:**

| Action | Permission Required |
|--------|-------------------|
| Assign | Contributor |
| Archive | Project Manager |
| Export | Contributor |
| Move | Project Manager |
| Update Status | Contributor |
| Update Owner | Project Manager |
| Delete | Admin |

Bulk actions never appear before selection.

---

## Density

Support two densities:

| Mode | Row Height |
|------|-----------|
| Comfortable | 56px |
| Compact | 40px |

Users choose based on preference. Preference persists.

---

## Virtualization

Tables with > 100 rows must virtualize. Only visible rows exist in the DOM. Target: 100,000 rows at 60fps.

---

## Keyboard Navigation

| Key | Action |
|-----|--------|
| ↑ / ↓ | Navigate rows |
| Enter | Open inspector for selected row |
| Space | Toggle row selection |
| ⌘A | Select all visible |
| ⇧↑ / ⇧↓ | Extend selection |
| Tab | Move between columns |
| Esc | Deselect / close |

---

## Inline Editing

Clicking an editable cell enters edit mode immediately. Save on blur or Enter. Cancel on Esc. No modal required.

**Editable columns by default:** Status, Owner, Due Date, Priority, Tags, Progress.

---

## Column Pinning

Users pin columns to left or right. Pinned columns remain visible during horizontal scroll.

**Defaults:** Title pinned left. Actions pinned right.

---

## Table States

| State | Behavior |
|-------|---------|
| Loading | Skeleton rows — exact layout of real content |
| Empty (no data) | Empty state with creation CTA |
| Empty (filtered) | Empty state with "Clear Filters" action |
| Error | Inline error with retry |
| Selecting | Bulk action bar appears at bottom |
