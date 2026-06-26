# Design System Foundations

## Philosophy

The design system is a **single source of visual truth**. Every color, every size, every shadow, every animation — defined once in tokens, applied everywhere.

The design system should make it impossible to produce an inconsistent interface.

---

## Core Beliefs

### Token Everything
No hardcoded values in components. Colors are `--color-text-primary`. Spacing is `--space-4`. Never `#1A1A1A` or `16px` in a component file.

### Scale Systems
Spacing, typography, and sizing follow mathematical scales. This produces visual harmony without requiring designers to make individual decisions for every case.

### Composition Over Customization
Combine primitives to build complex interfaces. A card is not a custom component — it is a white surface with padding, a border, and a shadow.

### Accessibility First
Every design decision must pass WCAG AA minimum. Color choices, font sizes, touch targets, and interaction states are all accessibility-informed.

---

## Foundation Layers

```
Design Tokens
    ↓
Primitives (colors, spacing, typography, elevation, motion)
    ↓
Components (Button, Card, Table, Input...)
    ↓
Patterns (Form, Table with Filter, Inspector Panel...)
    ↓
Pages (Intervention Detail, Activity Tracker...)
```

Each layer is only permitted to reference the layer directly below it. Pages never define raw colors.

---

## Naming Convention

### Token Naming

Semantic naming is preferred over descriptive naming:

```css
/* Descriptive (avoid) */
--color-blue-500: #2563EB;

/* Semantic (prefer) */
--color-action-primary: #2563EB;
--color-text-primary: #111827;
--color-surface-subtle: #F9FAFB;
```

Semantic tokens communicate purpose, not appearance. When the design changes, the token value changes — the name stays the same.

---

## Token Categories

| Category | Prefix | Examples |
|---------|--------|---------|
| Colors | `--color-` | text, surface, border, action, status, data |
| Spacing | `--space-` | 1–12 scale |
| Typography | `--font-` | family, size, weight, height |
| Radius | `--radius-` | sm, md, lg, full |
| Elevation | `--shadow-` | 1–5 scale |
| Motion | `--duration-` / `--easing-` | speed, curves |
| Z-Index | `--z-` | base, overlay, modal, toast, tooltip |

---

## Platform Support

The design system targets:
- Modern browsers (Chrome, Firefox, Safari, Edge — last 2 versions)
- CSS custom properties for all tokens
- No IE11 support
- Dark mode optional (future)
- High contrast mode (Windows, macOS)

---

## Design Principles

### Calm Density
Information should be dense without feeling chaotic. White space creates calm. Typography creates hierarchy.

### Typography-Led
Hierarchy is established through type, not decoration. Users should understand priority from reading, not from colored borders or backgrounds.

### Purposeful Color
Color communicates meaning, not decoration. Every use of color should answer: "What does this communicate to the user?"

### Responsive by Default
Every component behaves correctly at mobile and desktop without requiring separate implementations.
