# Design Tokens — Spacing

> Spacing defines rhythm. Not emptiness. The system should feel mathematical.

---

## Philosophy

Whitespace is not empty space. Whitespace is **structure**.

- Whitespace separates ideas
- Whitespace reduces noise
- Whitespace improves decision making

Never fill space simply because it exists. Every pixel should have purpose.

---

## Base Unit

**8px**

All spacing values are multiples of 4px, anchored to an 8px base unit.

---

## Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Micro gaps, icon padding |
| `space-2` | 8px | Tight component spacing |
| `space-3` | 12px | Form field internals |
| `space-4` | 16px | Standard component padding |
| `space-5` | 20px | Medium gaps |
| `space-6` | 24px | Card/panel padding |
| `space-8` | 32px | Section spacing |
| `space-10` | 40px | Large section gaps |
| `space-12` | 48px | Major section breaks |
| `space-16` | 64px | Page-level spacing |
| `space-24` | 96px | Hero/banner spacing |

> **Never invent spacing values outside this scale.**

---

## Component Internal Spacing

| Component | Padding |
|-----------|---------|
| Cards | 24px |
| Panels | 24px |
| Dialogs | 32px |
| Tables | 16px (cell) |
| Forms | 24px |
| Buttons | 10px 16px |
| Inputs | 10px 12px |
| Badges | 3px 8px |
| Table rows | 12px 16px |

---

## Vertical Rhythm

Every section should breathe consistently. Avoid random spacing.

**Page sections:** 48–64px between major sections
**Within sections:** 24–32px between groups
**Within groups:** 12–16px between items

---

## Gap Scale (Flexbox/Grid)

| Context | Gap |
|---------|-----|
| Inline elements | 8px |
| Form fields | 16px |
| Card grids | 16–24px |
| Section rows | 24px |
| Page sections | 48px |

---

## Responsive Spacing

| Breakpoint | Scale modifier |
|-----------|---------------|
| Desktop (1440px+) | Full scale |
| Tablet (768px–1439px) | Reduce by 4px where needed |
| Mobile (<768px) | Use tighter scale |

---

## Implementation Notes (CSS Variables)

```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-24: 6rem;     /* 96px */
}
```
