# Design Tokens — Typography

> Typography is the primary interface. The product should feel designed through type rather than decoration.

---

## Typeface

### Primary
**PP Neue Montreal**

This typeface defines the personality of the platform. Its neutrality, precision and rhythm support long-form operational work.

### Fallback Stack
```css
font-family: "PP Neue Montreal", "System UI", "Helvetica Neue", Arial, sans-serif;
```

---

## Type Scale

| Token | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| `text-display` | 48px | 52px | 600 | Hero headings, splash |
| `text-heading-xl` | 36px | 40px | 600 | Page titles |
| `text-heading-l` | 28px | 34px | 600 | Section titles |
| `text-heading-m` | 22px | 28px | 600 | Object titles |
| `text-heading-s` | 18px | 24px | 600 | Sub-section titles |
| `text-body-large` | 16px | 24px | 400 | Lead paragraphs |
| `text-body` | 14px | 22px | 400 | Primary body text |
| `text-body-small` | 13px | 20px | 400 | Secondary body text |
| `text-caption` | 12px | 18px | 400 | Metadata, timestamps |
| `text-label` | 11px | 16px | 500 | Badges, tags, labels |

---

## Font Weights

| Token | Value | Usage |
|-------|-------|-------|
| `font-regular` | 400 | Body text |
| `font-medium` | 500 | Labels, UI elements |
| `font-semibold` | 600 | Headings, emphasis |

> Avoid excessive use of Bold (700+). Hierarchy should come from size, spacing and composition.

---

## Numeric Typography

Enable **tabular figures** for all numeric content:

```css
font-variant-numeric: tabular-nums;
```

Apply to:
- Budgets
- KPIs
- Table numbers
- Financial data
- Dates
- Reference numbers

This improves readability in dense interfaces.

---

## Line Length

Target: **60–80 characters** per line.

Avoid extremely wide text blocks on large screens. Use max-width constraints on reading content.

---

## Typography Rules

| Rule | Correct | Incorrect |
|------|---------|-----------|
| Alignment | Left-align paragraphs | Center long text |
| Justification | Never justify | Justified paragraphs |
| Case | Sentence case | SHOUTING ALL CAPS |
| ALL CAPS usage | Badges, keyboard shortcuts, tiny metadata | Headings, body text |

---

## Heading Hierarchy

Heading hierarchy should be communicated through **size and weight** — not color alone.

```
Display (48px/600)       ← One per major screen
  Heading XL (36px/600) ← One per page
    Heading L (28px/600) ← Section titles
      Heading M (22px/600) ← Object/card titles
        Heading S (18px/600) ← Sub-sections
          Body (14px/400) ← Content
            Caption (12px/400) ← Metadata
```

---

## Responsive Typography

| Breakpoint | Scale adjustment |
|-----------|-----------------|
| Desktop (1440px+) | Full scale |
| Tablet (768px–1439px) | Reduce display by 4px |
| Mobile (<768px) | Reduce all headings by 4–6px |

---

## Implementation Notes (CSS Variables)

```css
:root {
  --text-display: 3rem;        /* 48px */
  --text-heading-xl: 2.25rem;  /* 36px */
  --text-heading-l: 1.75rem;   /* 28px */
  --text-heading-m: 1.375rem;  /* 22px */
  --text-heading-s: 1.125rem;  /* 18px */
  --text-body-large: 1rem;     /* 16px */
  --text-body: 0.875rem;       /* 14px */
  --text-body-small: 0.8125rem; /* 13px */
  --text-caption: 0.75rem;     /* 12px */
  --text-label: 0.6875rem;     /* 11px */

  --font-regular: 400;
  --font-medium: 500;
  --font-semibold: 600;

  --leading-tight: 1.2;
  --leading-normal: 1.5;
  --leading-relaxed: 1.7;
}
```
