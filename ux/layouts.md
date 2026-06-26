# Layouts

## Layout System Philosophy

All layouts are built from **a set of fixed structural patterns** rather than invented per screen. Consistency is the product.

---

## Global Layout

```
┌───────────────────────────────────────────────────┐
│ Top Bar: Logo, Workspace, Search, Notifications   │
├──────┬────────────────────────────────────────────┤
│      │                                            │
│  L   │          Content Area                      │
│  e   │                                            │
│  f   │                                            │
│  t   │                                            │
│      │                                            │
│  N   │                                            │
│  a   │                                            │
│  v   │                                            │
│      │                                            │
└──────┴────────────────────────────────────────────┘
```

- **Top Bar:** 56px height. Always visible.
- **Left Nav:** 240px width. Collapsible to 56px icon-only mode.
- **Content Area:** Remaining space. Scrolls independently.

---

## Layout Patterns

### Pattern 1 — Full Width

Used for: Lists, Tables, Dashboards, Report Views

```
┌──────────────────────────────────────────┐
│ Page Header: Title, Actions, Breadcrumb  │
├──────────────────────────────────────────┤
│ Filters / Tabs                           │
├──────────────────────────────────────────┤
│                                          │
│ Primary Content (100% width)             │
│                                          │
└──────────────────────────────────────────┘
```

### Pattern 2 — Two Column (70/30)

Used for: Intervention Detail, Project Detail, Overview Screens

```
┌──────────────────────────────────────────┐
│ Page Header                              │
├──────────────────────┬───────────────────┤
│                      │                   │
│ Primary (70%)        │ Sidebar (30%)     │
│                      │                   │
│ Activities / Details │ Health / Feed /   │
│                      │ Team / Files      │
└──────────────────────┴───────────────────┘
```

### Pattern 3 — With Inspector

Used for: Activity Table with Inspector Panel open

```
┌─────────────────────────────────────────────────────────┐
│ Page Header                                             │
├──────────────────────────────┬──────────────────────────┤
│                              │                          │
│ Primary Content              │ Inspector Panel          │
│ (Table / Board)              │ (Activity Detail)        │
│                              │                          │
└──────────────────────────────┴──────────────────────────┘
```

Inspector panels are 40% of viewport width. Content area shrinks proportionally.

### Pattern 4 — Three Column

Used for: Command Palette, Advanced Search Results

```
┌───────────────────────────────────────────┐
│ Search Bar                                │
├─────────────┬─────────────────┬───────────┤
│ Categories  │ Results         │ Preview   │
│             │                 │           │
└─────────────┴─────────────────┴───────────┘
```

---

## Responsive Breakpoints

| Breakpoint | Width | Layout |
|-----------|-------|--------|
| Mobile | < 768px | Single column, bottom navigation |
| Tablet | 768–1024px | Collapsed sidebar, simplified header |
| Desktop | 1025–1440px | Full layout |
| Large | > 1440px | Full layout, wider content |

---

## Scroll Behavior

- Only the content area scrolls. Navigation is fixed.
- Long forms never paginate — they scroll.
- Tables virtualize (not paginate) beyond 100 rows.
- Inspector panels have their own independent scroll.

---

## Header System

Every page has a standardized header:

```
┌──────────────────────────────────────────┐
│ [Breadcrumb]                             │
│ [Title]             [Actions: ... v]     │
│ [Status] [Owner] [Tags]                  │
├──────────────────────────────────────────┤
│ [Tabs: Overview | Activities | Budget…]  │
└──────────────────────────────────────────┘
```

Header height: 120–160px depending on content.

---

## Content Spacing

```
Page edge margin:   32px
Section gap:        48px
Card padding:       24px
Table row height:   48px
Form group gap:     24px
```

---

## Z-Index Stack

| Layer | Z-Index | Examples |
|-------|---------|---------|
| Base content | 0 | Tables, cards |
| Sticky headers | 10 | Table column headers |
| Dropdowns | 100 | Select menus |
| Inspector panels | 200 | Right-side drawers |
| Modals | 300 | Confirmation dialogs |
| Toasts | 400 | Notification toasts |
| Command palette | 500 | ⌘K overlay |
| Tooltips | 600 | Hover tooltips |
