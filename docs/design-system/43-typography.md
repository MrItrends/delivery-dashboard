# 43 — Typography

> See also: [Design Tokens — Typography](../../design-system/tokens/typography.md)

## Philosophy

Typography is the **primary interface**. The product should feel designed through type rather than decoration.

Good typography creates hierarchy. Hierarchy creates understanding. Understanding creates confidence.

---

## Typeface

**PP Neue Montreal** — Primary

A neutral, precise typeface with excellent rhythm. Supports long-form operational work without visual fatigue.

**Fallback:** System UI → Helvetica Neue → Arial → sans-serif

---

## Scale

| Token | Size | Usage |
|-------|------|-------|
| `text-display` | 48px | Hero, splash moments |
| `text-heading-xl` | 36px | Page titles |
| `text-heading-l` | 28px | Section titles |
| `text-heading-m` | 22px | Object/card titles |
| `text-heading-s` | 18px | Sub-sections |
| `text-body-large` | 16px | Lead paragraphs |
| `text-body` | 14px | Primary body |
| `text-body-small` | 13px | Secondary content |
| `text-caption` | 12px | Metadata, timestamps |
| `text-label` | 11px | Badges, tags |

Full token values: [typography.md](../../design-system/tokens/typography.md)

---

## Hierarchy Principle

Heading hierarchy is communicated through **size and weight** — not color alone.

```
Display (48/600) — one per major section
  ↓ Heading XL (36/600) — one per page
    ↓ Heading L (28/600) — section breaks
      ↓ Heading M (22/600) — object titles
        ↓ Heading S (18/600) — sub-sections
          ↓ Body (14/400) — content
            ↓ Caption (12/400) — metadata
```

---

## Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| Regular | 400 | Body text, descriptions |
| Medium | 500 | Labels, UI elements |
| Semibold | 600 | Headings, key information |

> Avoid excessive Bold (700). Hierarchy should come from size, not weight extremes.

---

## Numeric Typography

Enable **tabular figures** for all numeric content to ensure proper column alignment:

Apply to: Budgets, KPIs, table numbers, financial data, dates, reference numbers.

```css
font-variant-numeric: tabular-nums;
```

---

## Rules

| Rule | Do | Don't |
|------|-----|-------|
| Alignment | Left-align | Center long paragraphs |
| Justification | Never justify | Justified body text |
| Case | Sentence case | ALL CAPS headings |
| ALL CAPS | Badges, keyboard hints, tiny metadata only | Body text |
| Line length | 60–80 characters | Full-width text blocks |
