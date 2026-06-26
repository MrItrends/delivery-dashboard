# Typography

## Typeface

**PP Neue Montreal** — Primary typeface for all text.

PP Neue Montreal is a contemporary grotesque typeface that is:
- Legible at small sizes
- Distinguished at large sizes
- Appropriate for professional government use
- Reads as modern and trustworthy
- Used by Linear, Stripe, and Vercel

**Fallback stack:** `'PP Neue Montreal', 'Inter', 'Helvetica Neue', Arial, sans-serif`

---

## Type Scale

The scale follows a modular ratio of 1.25 (Major Third):

```css
/* Text sizes */
--font-size-xs:   12px;  /* Captions, metadata */
--font-size-sm:   14px;  /* Secondary information, labels */
--font-size-base: 16px;  /* Body text, default */
--font-size-md:   18px;  /* Slightly elevated body */
--font-size-lg:   20px;  /* Section headings */
--font-size-xl:   24px;  /* Page headings */
--font-size-2xl:  30px;  /* Major headings */
--font-size-3xl:  36px;  /* Hero / display */
--font-size-4xl:  48px;  /* Reserved: Executive summary numbers */
```

---

## Font Weights

```css
--font-weight-regular:  400;
--font-weight-medium:   500;
--font-weight-semibold: 600;
--font-weight-bold:     700;
```

Only four weights. Resist the temptation to add 300 (Light) or 800 (ExtraBold) — they rarely improve hierarchy and add loading overhead.

---

## Line Height

```css
--line-height-tight:   1.2;  /* Headings */
--line-height-snug:    1.375; /* Short body text */
--line-height-normal:  1.5;  /* Default body */
--line-height-relaxed: 1.625; /* Long-form reading */
```

---

## Letter Spacing

```css
--letter-spacing-tight:  -0.02em;  /* Display headings */
--letter-spacing-normal:  0em;     /* Body text */
--letter-spacing-wide:    0.05em;  /* Uppercase labels, captions */
--letter-spacing-wider:   0.1em;   /* ALL CAPS metadata */
```

---

## Type Roles

| Role | Size | Weight | Line Height | When |
|------|------|--------|------------|------|
| Display | 48px | 700 | 1.1 | Executive numbers, stats |
| H1 | 36px | 700 | 1.2 | Page title |
| H2 | 30px | 600 | 1.25 | Major section heading |
| H3 | 24px | 600 | 1.3 | Sub-section heading |
| H4 | 20px | 600 | 1.375 | Card heading |
| H5 | 18px | 500 | 1.4 | Minor heading |
| H6 | 16px | 500 | 1.5 | Small heading |
| Body Large | 18px | 400 | 1.6 | Long-form, descriptions |
| Body | 16px | 400 | 1.5 | Default body text |
| Body Small | 14px | 400 | 1.5 | Secondary content |
| Label | 14px | 500 | 1.25 | Form labels, table headers |
| Caption | 12px | 400 | 1.4 | Metadata, timestamps |
| Mono | 13px | 400 | 1.6 | Code, reference numbers |

---

## Semantic Tokens

```css
/* Size tokens */
--font-size-heading-xl:  var(--font-size-3xl);
--font-size-heading-lg:  var(--font-size-2xl);
--font-size-heading-md:  var(--font-size-xl);
--font-size-heading-sm:  var(--font-size-lg);
--font-size-body:        var(--font-size-base);
--font-size-body-sm:     var(--font-size-sm);
--font-size-label:       var(--font-size-sm);
--font-size-caption:     var(--font-size-xs);

/* Weight tokens */
--font-weight-heading: var(--font-weight-bold);
--font-weight-body:    var(--font-weight-regular);
--font-weight-label:   var(--font-weight-medium);
--font-weight-action:  var(--font-weight-medium);
```

---

## Monospace

For: Reference numbers, code, IDs, data values.

**Font:** `'JetBrains Mono', 'Fira Code', 'Consolas', monospace`

```css
--font-family-mono: 'JetBrains Mono', 'Fira Code', monospace;
--font-size-mono:   13px;
```

---

## Typography Anti-Patterns

| Avoid | Problem |
|-------|---------|
| More than 4 type sizes on one screen | Creates visual noise |
| All caps for long text | Reduces legibility |
| Bold for emphasis across multiple paragraphs | Loses meaning |
| Centered body text | Harder to read |
| Very small text for essential information | Accessibility failure |
| Font sizes below 12px | Inaccessible |
| Multiple typefaces | Visual inconsistency |
| Light weight for body text | Poor legibility on screens |

---

## Applying Typography

```css
/* Correct — uses tokens */
.intervention-title {
  font-size: var(--font-size-heading-lg);
  font-weight: var(--font-weight-heading);
  line-height: var(--line-height-tight);
  color: var(--color-text-primary);
  letter-spacing: var(--letter-spacing-tight);
}

/* Correct — body */
.activity-description {
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-body);
  line-height: var(--line-height-normal);
  color: var(--color-text-secondary);
}
```

---

## Text Truncation

Long text should truncate with ellipsis — never wrap awkwardly.

```css
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

Full text always available on hover (tooltip) or in the expanded view.
