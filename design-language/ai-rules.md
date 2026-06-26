# AI Design Rules

> These rules exist because AI systems (including Claude) have absorbed enormous amounts of generic, trendy, and template-driven UI. Left without constraints, AI will produce exactly that. This document is the antidote.

---

## What Claude Must Never Generate

These are **absolute prohibitions**. If asked to design something that would require any of these, refuse and offer a correct alternative.

### Gradient Backgrounds
```
✗ background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
✗ background: linear-gradient(to bottom, #1a1a2e, #16213e);
```

Gradients communicate crypto wallets, landing pages, and startup marketing. Not government delivery infrastructure.

**Alternative:** White or neutral-50 backgrounds. Structure through typography and spacing — not color.

### Glassmorphism
```
✗ background: rgba(255, 255, 255, 0.1);
   backdrop-filter: blur(10px);
   border: 1px solid rgba(255, 255, 255, 0.2);
```

Glassmorphism creates illegibility, accessibility failures, and dates almost immediately.

**Alternative:** Solid white surfaces with hairline borders.

### Oversized Hero Cards
Large, prominent cards with a single metric taking up 40%+ of a screen section. This wastes space, implies everything is equally important, and forces scrolling unnecessarily.

**Alternative:** Dense, structured table layouts. Metric grids with 3–4 columns. Typography-led hierarchy.

### Random Illustrations
Decorative SVG illustrations, blob art, abstract shapes, people illustrations used as decorative elements in dashboards.

**Alternative:** Purposeful empty state illustrations only (functional, minimal, monochromatic).

### Floating Widgets
Cards or panels that appear to float above the interface with heavy drop shadows and no clear structural relationship to the page.

**Alternative:** Flat cards with hairline borders, or panels with Level 1 shadow only.

### Animated Blobs
CSS animated background shapes, morphing gradients, particle systems.

**Alternative:** Static, structured layouts.

### Rounded-Everything UI
Every element having 20–32px border radius. Pill-shaped buttons. Circular cards.

**Alternative:** Engineering-appropriate radii: 4, 8, 12px. Circular avatars only.

### Huge KPI Cards
Dashboard grids of large status cards with a number, a trend arrow, and a label in a box with a colored border or background.

**Alternative:** A structured table. A typed metric row. A properly sized stat card in a multi-column layout.

### Dark Sidebars with Colored Icons
A very dark left sidebar with colored icon-only navigation items.

**Alternative:** White or very-light sidebar with near-black text, subtle active state, no color icons.

---

## What Claude Must Always Prioritize

These are the correct defaults. When uncertain, choose from this list.

### Typography
Build hierarchy with type. Size, weight, and color of text should communicate importance without any other visual element needing to do the work.

### Structure
Before adding a visual element, add structural clarity. Alignment, grouping, and spacing carry more meaning than decoration.

### Tables
When data is comparative, list-based, or operational — use a table. Not cards, not a grid of tiles, not a scrollable list of cards.

### Hierarchy
Every screen has one primary thing. One. Everything else is secondary or tertiary. The design should make this brutally obvious without the user having to think about it.

### Whitespace
Add whitespace before adding structure. Most cluttered interfaces are cluttered because designers added borders and backgrounds instead of space.

### Alignment
Consistent alignment creates order. Left-align everything by default. Right-align numbers in tables. Center only when the context demands it (empty states, standalone numbers).

### Context
Preserve where the user is. Inspector panels over navigation. Inline editing over modals. Context over confirmation dialogs.

---

## The AI Design Test

Before generating any screen, ask:

1. Does this look like a template I have seen many times?
2. Does this have any gradients, blobs, or glassmorphism?
3. Are there large decorative elements that carry no information?
4. Is there a heavy shadow anywhere?
5. Are corner radii above 16px?
6. Is there a colored background on anything other than a status chip?
7. Is there a sidebar that isn't white or near-white?
8. Am I building a card grid where a table should be?

If yes to any of these — redesign before delivering.

---

## The Reference Test

When Claude designs a screen, the correct mental reference points are:

| Scenario | Think of |
|---------|---------|
| Activity table | Linear issues list |
| Intervention overview | Figma file overview panel |
| Dashboard home | GitHub repository page |
| Report | Stripe billing dashboard |
| Settings | Linear workspace settings |
| Command palette | Raycast / Linear command palette |

The correct test: could this screen be mistaken for a generic SaaS template?

If yes, it must be redesigned.

---

## The Professional Standard

The Delivery Dashboard should look like it was designed by a team that:
- Has been building the product for three years
- Has conducted extensive user research with government officials
- Has iterated every screen dozens of times
- Cares deeply about information density and clarity
- Has never once reached for a template

AI-generated UI often looks like it was designed in 45 minutes. The work is to make it look like it was built over 3 years. The way to do that is to follow this document precisely — and to resist every temptation toward decoration, trendiness, and template aesthetics.
