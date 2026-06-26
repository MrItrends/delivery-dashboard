# Typography

## The Primary Principle

**Typography is the interface. Not decoration.**

If all colors were removed from the Delivery Dashboard, every screen should still communicate hierarchy, priority, and status through typography alone. If it cannot, the design has failed.

---

## Primary Typeface

**PP Neue Montreal**

PP Neue Montreal is a contemporary grotesque typeface. It reads as:
- Editorial without being editorial-only
- Modern without being trendy
- Professional without being cold
- Distinctive without being decorative

It sits in the same category as typefaces used by Linear, Stripe, and Vercel — chosen because it communicates **serious, crafted, considered**.

**Fallback stack:** `'PP Neue Montreal', 'Inter', 'Helvetica Neue', Arial, sans-serif`

---

## Typography Should Feel

**Editorial** — Like a well-designed publication. Not like a form.

**Quiet** — Typography should not shout. Hierarchy is achieved through scale and weight — not through heavy fonts or oversized headings.

**Confident** — Appropriate weight for every context. Metadata that is small but still readable. Headings that communicate authority without dominance.

**Highly Legible** — At every size. Government officials may read this on older monitors, in bright light, or under time pressure.

---

## What to Avoid

| Avoid | Reason |
|-------|--------|
| Oversized headings | Creates imbalance; feels like a landing page |
| Tiny metadata | Accessibility failure; destroys credibility |
| Random font sizes | Breaks rhythm; signals lack of system |
| Light weight (300) for body text | Poor legibility on screens |
| All-caps paragraphs | Reduces reading speed dramatically |
| Multiple typeface families | Creates visual chaos |
| Decorative display fonts | Inappropriate for government delivery context |

---

## The Scale

Typography follows a mathematical scale. No ad hoc sizes.

```
Display:     48px / 700 / line-height 1.1   — Executive numbers only
H1:          36px / 700 / line-height 1.2   — Page titles
H2:          30px / 600 / line-height 1.25  — Major sections
H3:          24px / 600 / line-height 1.3   — Sub-sections
H4:          20px / 600 / line-height 1.375 — Card headings
H5:          18px / 500 / line-height 1.4   — Minor headings
Body Large:  18px / 400 / line-height 1.6   — Descriptions
Body:        16px / 400 / line-height 1.5   — Default
Body Small:  14px / 400 / line-height 1.5   — Secondary content
Label:       14px / 500 / line-height 1.25  — Form labels, table headers
Caption:     12px / 400 / line-height 1.4   — Metadata, timestamps
Mono:        13px / 400 / line-height 1.6   — Reference numbers, code
```

**Nothing is smaller than 12px. Nothing is larger than 48px in the operational interface.**

---

## Hierarchy in Practice

A well-typed Intervention page should communicate hierarchy through reading alone:

```
[H1] National Hospital Upgrade Programme     ← One heading only
[Body Small] Healthcare / North Region / Active

[Label] DELIVERY STATUS               [Label] NEXT REVIEW
[Body]  Execution Phase               [Body]  24 September 2024

[H3] Activities (43)                  ← Section
[Label] TITLE    STATUS    OWNER    DUE     ← Table header
[Body]  Content  content   content  content ← Table row
```

No user should need to be told which text is most important.

---

## Monospace

**For:** Reference numbers, code, IDs, data values, terminal-style output.

```
Typeface: 'JetBrains Mono', 'Fira Code', monospace
Size:     13px
Weight:   400
```

Monospace creates instant visual differentiation between data and prose. Use it consistently for all reference numbers and system identifiers.

---

## Letter Spacing

```
Display headings:   -0.02em  (tight — feels authoritative)
Body text:           0em     (default — maximum legibility)
Uppercase labels:   +0.08em  (loose — compensates for all-caps weight)
```

---

## Color and Typography

Text colors communicate hierarchy, not decoration:

```
Primary text:    #111827  — Main content, headings
Secondary text:  #4B5563  — Supporting information
Tertiary text:   #9CA3AF  — Metadata, disabled states
Inverse text:    #FFFFFF  — On dark backgrounds
Danger text:     #DC2626  — Errors, critical states
Link text:       #2563EB  — Interactive, navigational
```

**Text color should never be used to create variety or visual interest.** Only to communicate meaning.

---

## Typography Test

Any screen's typography passes when:

1. The most important information is most visually prominent
2. Hierarchy is clear at a glance, not through careful reading
3. The smallest text remains comfortably readable
4. No text competes with another for the same level of attention
5. Removing all color leaves the hierarchy intact
