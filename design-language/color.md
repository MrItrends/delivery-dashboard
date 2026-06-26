# Color

## The Primary Principle

**White is the product. Not blue. Not gradients. White.**

Color exists only to communicate meaning. Every use of color must answer one question: *What does this tell the user?* If the answer is "nothing — it just looks nice," the color must be removed.

---

## The Color Hierarchy

### 1. White — The Default Surface

White is not a background. White **is the product**. It is the primary canvas. The majority of any screen should be white.

This is not minimalism for its own sake. It is because:
- White maximizes text contrast and legibility
- White creates focus on information, not interface
- White scales gracefully across devices and display conditions
- White communicates clarity and trustworthiness

### 2. Very Light Gray — Secondary Surfaces

Used for: sidebars, table row hover states, card backgrounds, subtle section separation.

The distinction between white and very light gray should be **barely perceptible**. If it feels obvious, it is too strong.

```
--color-neutral-50: #F9FAFB   ← Secondary surface
--color-neutral-100: #F3F4F6  ← Subtle hover, selected states
```

### 3. Hairline Gray — Structure

Borders, dividers, table column separators. They organize — they do not separate.

A border that visually separates creates tension. A border that organizes creates clarity.

```
--color-neutral-200: #E5E7EB  ← Default border
--color-neutral-300: #D1D5DB  ← Stronger border (hover, focus ring)
```

### 4. Near Black — Text

The primary content color. Not pure black (`#000000`). Pure black is too harsh on white surfaces. Near black creates a softer, more typographic relationship.

```
--color-neutral-900: #111827  ← Primary text
--color-neutral-600: #4B5563  ← Secondary text
--color-neutral-400: #9CA3AF  ← Tertiary / disabled
```

### 5. Minimal Blue — Action

Blue is reserved for one thing: **things that respond to interaction**. Links, primary buttons, focus states, active navigation items.

Blue should be used sparingly. When everything is blue, nothing is interactive.

```
--color-brand-600: #2563EB  ← Primary action
--color-brand-700: #1D4ED8  ← Action hover
--color-brand-50:  #EFF6FF  ← Action surface (very subtle)
```

### 6. Semantic Colors — Meaning

These four colors carry meaning that users must be able to read instantly. They are not decorative.

```
Green:   #16A34A  ← Healthy, Complete, Success, On Track
Amber:   #D97706  ← Warning, Attention Required, At Risk
Red:     #DC2626  ← Critical, Error, Blocked, Failed
Neutral: #6B7280  ← Inactive, Archived, Unknown, Pending
```

**Rule:** Semantic colors never appear purely for decoration or visual variety.

---

## Color Anti-Patterns

| Anti-Pattern | Problem |
|-------------|---------|
| Gradient backgrounds | Dated, trendy, distracts from content |
| Multiple accent colors | Creates confusion about what is interactive |
| Colored section headers | Decoration disguised as structure |
| Pastel card backgrounds | Creates visual noise without semantic value |
| Blue as decoration | Trains users to ignore actual links |
| Dark sidebar | Creates unnecessary contrast; fights the content |
| Colored table rows | Overrides status color meanings |
| Color-coded categories without labels | Accessibility failure |

---

## Color and Accessibility

Color is never the only indicator of meaning. Every semantic color is always paired with:

| Color Signal | Must Also Include |
|-------------|------------------|
| Green (healthy) | ✓ Icon + "Healthy" label |
| Amber (at risk) | ⚠ Icon + "At Risk" label |
| Red (critical) | ✕ Icon + "Critical" label |
| Blue (interactive) | Underline or cursor change |

WCAG AA minimum contrast ratios are enforced:
- Body text: 4.5:1 against background
- Large text (18px+): 3:1 against background
- UI components: 3:1 against adjacent color

---

## Color in Context

### Navigation
- Background: White or near-white
- Active item: Near-black text, subtle left border in blue
- Hover: Very light gray background
- No colored left navigation

### Tables
- Row default: White
- Row hover: Neutral-50 (#F9FAFB)
- Row selected: Brand-50 (#EFF6FF)
- Health column: Semantic color dot + text label

### Buttons
- Primary: Blue background, white text
- Secondary: White background, neutral border, dark text
- Ghost: Transparent, dark text
- Destructive: Red background, white text

### Status Indicators
- Dots are always accompanied by text
- Never rely on color alone
- Consistent meaning across every context in the product

---

## Dark Mode (Future)

The token system is built to support dark mode. Semantic tokens remain constant — only the underlying values change.

```css
/* Light mode (default) */
--color-surface-default: #FFFFFF;
--color-text-primary:    #111827;

/* Dark mode (future) */
--color-surface-default: #111827;
--color-text-primary:    #F9FAFB;
```

No component should use hardcoded colors. Only tokens.

---

## The Color Test

A screen passes the color test when:

1. Removing all color leaves a still-functional, still-hierarchical interface
2. Every use of color communicates something specific
3. Semantic colors appear only for their intended meaning
4. The dominant color is white
5. Users would not describe the interface as "colorful"
