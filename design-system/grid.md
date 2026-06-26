# Grid System

## Philosophy

The grid exists to create **consistent horizontal alignment** across all screens. It is not a rigid constraint — it is a guide.

---

## Grid Specification

### Desktop (1280px reference)

```
Max content width:  1440px
Column count:       12
Column width:       auto
Gutter width:       32px
Margin:             32px
```

### Tablet (768–1024px)

```
Column count:       8
Gutter width:       24px
Margin:             24px
```

### Mobile (< 768px)

```
Column count:       4
Gutter width:       16px
Margin:             16px
```

---

## CSS Grid Implementation

```css
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--space-8);
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 var(--spacing-page-x);
}

/* Responsive */
@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(8, 1fr);
    gap: var(--space-6);
  }
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-4);
  }
}
```

---

## Common Grid Patterns

### Full Width

```
[──────────────── 12 columns ────────────────]
```

Used for: Tables, Lists, Full-width dashboards.

### Two Column (8/4)

```
[──── 8 columns ────][──── 4 columns ────]
Primary content       Sidebar
```

Used for: Intervention Detail, Project Detail.

### Two Column (6/6)

```
[──── 6 columns ────][──── 6 columns ────]
Left section          Right section
```

Used for: Settings, Comparison views.

### Three Column (4/4/4)

```
[── 4 ──][── 4 ──][── 4 ──]
Stats      Stats     Stats
```

Used for: Metric rows, Card grids.

### Dashboard Grid

```
[── 8 columns ──────][── 4 columns ──]
Main view             Sidebar stats
[──── 4 ────][──── 4 ────][──── 4 ────]
Card           Card           Card
[──────────────── 12 ────────────────]
Table
```

---

## Fixed-Width Elements

Some elements have fixed widths regardless of grid:

| Element | Width |
|---------|-------|
| Left navigation | 240px (collapsed: 56px) |
| Inspector panel | 400–600px (40% viewport) |
| Command palette | 640px max |
| Right drawer | 480px |

---

## Max Width Containers

```css
/* Page content */
.page-container {
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
}

/* Narrow content (forms, settings) */
.container-narrow {
  max-width: 720px;
}

/* Reading content */
.container-reading {
  max-width: 680px;
}
```

---

## Anti-Patterns

| Avoid | Prefer |
|-------|--------|
| Fixed pixel widths for content areas | Fluid columns with max-width |
| Odd column counts | 12-column subdivisions |
| Inconsistent gutters per screen | Same gutter throughout |
| Ignoring the grid for "just this screen" | Grid exceptions are design failures |
