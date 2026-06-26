# Charts & Data Visualization

## Philosophy

Charts exist to **reveal patterns that are invisible in tables**. They do not exist to make dashboards look impressive.

Every chart must answer a specific question. If the question cannot be stated, the chart should not exist.

---

## Chart Library

**Recharts** (React wrapper around D3) — primary charting library.

Reasons: React-native, composable, customizable, accessible, maintained.

Alternatively: **Nivo** for more complex visualizations.

---

## Chart Types

| Chart | Use Case | When NOT to Use |
|-------|---------|----------------|
| Line | Trends over time | Comparing categories |
| Bar (vertical) | Comparing values across categories | Time series with many points |
| Bar (horizontal) | Ranking / comparing many items | Time series |
| Area | Volume over time, cumulative | Comparing many series |
| Donut | Part-of-whole with 3–6 segments | Many segments (use bar) |
| Scatter | Correlation between two variables | Single variable |
| Heatmap | Activity intensity over time | Single metric |
| Sparkline | Inline trend in table/card | Detailed analysis |

---

## Chart Colors

Use the data visualization palette from `color.md`:

```css
--color-data-1: #3B82F6;  /* Blue — primary series */
--color-data-2: #8B5CF6;  /* Purple */
--color-data-3: #06B6D4;  /* Cyan */
--color-data-4: #10B981;  /* Green */
--color-data-5: #F59E0B;  /* Amber */
--color-data-6: #EF4444;  /* Red */
```

Series should use colors in order: data-1, data-2, data-3... Never skip colors.

Status-coded charts (health, risk) must use the status color tokens.

---

## Chart Anatomy

All charts follow this structure:

```
┌──────────────────────────────────────────────────────────┐
│ Chart Title                            [Filters ▼] [↗]  │
│ Subtitle / Description                                   │
├──────────────────────────────────────────────────────────┤
│                                                          │
│                    Chart Area                            │
│                                                          │
├──────────────────────────────────────────────────────────┤
│ Legend: ● Series A  ● Series B  ● Series C              │
└──────────────────────────────────────────────────────────┘
```

---

## Axes

```typescript
// X Axis
{
  tick: { fontSize: 12, fill: 'var(--color-text-tertiary)' },
  tickLine: false,
  axisLine: { stroke: 'var(--color-border-default)' }
}

// Y Axis
{
  tick: { fontSize: 12, fill: 'var(--color-text-tertiary)' },
  tickLine: false,
  axisLine: false,
  gridLine: { stroke: 'var(--color-border-default)', strokeDasharray: '4 4' }
}
```

Grid lines: Horizontal only. Light and subtle. Horizontal lines aid comparison; vertical lines create noise.

---

## Tooltips

Tooltips appear on hover and show: Series name, Value, Date/Category, Change from previous.

```
┌───────────────────────────┐
│ 15 September 2024         │
│ ● Activities: 23          │
│ ● Completed: 18 (+3)      │
│ ● At Risk: 5              │
└───────────────────────────┘
```

---

## Sparklines

Used inline in tables and cards to show trends without full charts:

```
Q1   Q2   Q3
▂▄▆▇  ← sparkline bar chart
```

Width: 80–120px. Height: 24–32px. No axes. No labels. Color carries meaning.

---

## Empty Chart States

If a chart has no data:
```
┌──────────────────────────────────────────┐
│                                          │
│   No data for this period                │
│   Activities will appear here once       │
│   delivery begins.                       │
│                                          │
└──────────────────────────────────────────┘
```

Do not render empty axes or ghost bars.

---

## Accessibility

- Color alone must never encode meaning
- Each series must have a pattern or texture option
- Charts must have `aria-label` describing the data
- Data must be downloadable as CSV
- Tables must be available as an alternative to charts
- Screen readers must be able to navigate key data points

---

## Performance

- Charts with 1,000+ data points must aggregate or sample
- Use `recharts` responsive container — never fixed widths
- Throttle tooltip updates on high-frequency data
- Lazy load charts below the fold

---

## Chart Anti-Patterns

| Avoid | Reason |
|-------|--------|
| 3D charts | Distort data comparison |
| Pie charts with > 6 slices | Impossible to compare |
| Dual Y-axes | Misleading correlations |
| Truncated Y-axes | Exaggerates differences |
| Too many chart types on one screen | Creates visual noise |
| Missing chart titles | Reader cannot understand context |
| Decorative chart animations | Distracts, adds no value |
