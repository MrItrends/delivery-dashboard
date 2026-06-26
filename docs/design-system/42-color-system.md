# 42 — Color System

> See also: [Design Tokens — Colors](../../design-system/tokens/colors.md)

## Philosophy

Color communicates **state**. Never decoration.

Typography carries hierarchy. Whitespace carries structure. Color reinforces understanding.

The interface should remain **predominantly neutral** (white and light gray). Color appears only where it communicates something specific.

---

## Primary Palette

Large surfaces should remain neutral.

| Token | Value | Usage |
|-------|-------|-------|
| `color-canvas` | `#FFFFFF` | Page backgrounds |
| `color-surface` | `#FAFAFA` | Card and panel backgrounds |
| `color-border` | `#E8E8EA` | Default borders |
| `color-divider` | `#F1F1F2` | Subtle separators |

---

## Text Colors

Typography — not color — should create hierarchy.

| Token | Value | Usage |
|-------|-------|-------|
| `color-text-primary` | `#111111` | Headings, primary content |
| `color-text-secondary` | `#5F6368` | Supporting labels |
| `color-text-tertiary` | `#90959D` | Placeholders, hints |
| `color-text-disabled` | `#C2C5CC` | Disabled elements |

---

## Semantic Colors

| Meaning | Color | Usage |
|---------|-------|-------|
| Success | Green | Completed, on track, healthy |
| Warning | Amber | Attention needed, at risk |
| Error | Red | Blocked, critical, failed |
| Information | Blue | Interactive, informational |
| Neutral | Gray | Default, archived, disabled |

Each semantic color includes: Background, Border, Text, Icon, Solid, Hover states.

Full token values: [colors.md](../../design-system/tokens/colors.md)

---

## Health Status Colors

Used consistently across **all** health indicators:

| State | Visual Treatment |
|-------|-----------------|
| Excellent | Green |
| Healthy | Green |
| Needs Attention | Amber |
| At Risk | Orange |
| Critical | Red |
| Archived | Gray |

---

## Interactive Color

**Blue** communicates interaction. Never branding. Interactive elements should feel restrained.

`color-interactive`: `#2563EB`

---

## Charts

Maximum of **six** primary colors. Additional categories rely on pattern and labeling.

Avoid pure saturated colors. Prefer muted, professional tones.

---

## Accessibility

Every semantic combination must meet **WCAG AA**:
- Normal text: 4.5:1 contrast ratio
- Large text: 3:1 contrast ratio
- UI components: 3:1 contrast ratio

---

## Color Rules

1. Never use color as the only indicator of meaning
2. Always pair color with text or icon
3. Test all combinations in both light conditions
4. Never invent colors outside the token system
