# 53 — Design Tokens

> Every visual decision should become a token. Never hardcode values.

## Philosophy

Design tokens are the **single source of truth** for all visual decisions. They create a contract between design and engineering that ensures consistency and enables systematic change.

If you need to change the primary blue, you change one token. Everything updates.

---

## Token Categories

| Category | Tokens File |
|----------|------------|
| Color | [tokens/colors.md](../../design-system/tokens/colors.md) |
| Typography | [tokens/typography.md](../../design-system/tokens/typography.md) |
| Spacing | [tokens/spacing.md](../../design-system/tokens/spacing.md) |
| Elevation | [tokens/elevation.md](../../design-system/tokens/elevation.md) |
| Motion | [tokens/motion.md](../../design-system/tokens/motion.md) |

---

## Token Naming Convention

Tokens follow a three-part naming structure:

```
{category}-{variant}-{state}

Examples:
color-text-primary
color-surface-elevated
color-interactive-hover
space-4
shadow-md
radius-lg
duration-normal
```

---

## Token Types

### Primitive Tokens
Raw values. Rarely used directly in components.

```css
--blue-600: #2563EB;
--gray-100: #F3F4F6;
--size-4: 1rem;
```

### Semantic Tokens
Reference primitives. Used in components.

```css
--color-interactive: var(--blue-600);
--color-surface: var(--gray-100);
--space-4: var(--size-4);
```

### Component Tokens
Reference semantic tokens. Component-specific.

```css
--button-bg: var(--color-interactive);
--button-text: var(--color-text-inverse);
--button-padding-x: var(--space-4);
```

**Always use semantic tokens in components, not primitive tokens.**

---

## Complete Token Reference

### Color Tokens
See: [tokens/colors.md](../../design-system/tokens/colors.md)

Key groups:
- Surface colors (canvas, surface, elevated)
- Text colors (primary, secondary, tertiary, disabled)
- Semantic colors (success, warning, error, info, neutral)
- Interactive colors (primary blue)
- Health status colors
- Chart colors

### Typography Tokens
See: [tokens/typography.md](../../design-system/tokens/typography.md)

Key groups:
- Font size scale (display → label)
- Font weights (regular, medium, semibold)
- Line heights
- Font families

### Spacing Tokens
See: [tokens/spacing.md](../../design-system/tokens/spacing.md)

Key groups:
- Spacing scale (4px → 96px)
- Component padding values
- Gap values

### Elevation Tokens
See: [tokens/elevation.md](../../design-system/tokens/elevation.md)

Key groups:
- Shadow scale (none → xl)
- Border radius scale
- Surface color + shadow combinations
- Border tokens

### Motion Tokens
See: [tokens/motion.md](../../design-system/tokens/motion.md)

Key groups:
- Duration scale (instant → deliberate)
- Easing functions
- Standard transition presets

---

## Implementation Rules

```css
/* Wrong — hardcoded value */
.button {
  background-color: #2563EB;
  padding: 10px 16px;
  border-radius: 6px;
}

/* Correct — token-based */
.button {
  background-color: var(--color-interactive);
  padding: var(--space-2-5) var(--space-4);
  border-radius: var(--radius-sm);
}
```

**No hardcoded values in component code. Ever.**

---

## Token Governance

1. New tokens require design system review
2. Tokens are never deleted — deprecated instead
3. Deprecated tokens get a `--deprecated-` prefix
4. Token names are semantic, not literal (`--color-surface` not `--color-white`)
5. Dark mode tokens shadow light mode tokens with the same names
