# Design Tokens — Elevation & Surfaces

> Elevation communicates hierarchy. Not decoration.

---

## Philosophy

Elevation should be used **sparingly**. Prefer borders over shadows. Every elevation level should have a clear purpose.

Only **five** elevation levels should exist in the entire product.

---

## Surface Levels

| Level | Token | Usage |
|-------|-------|-------|
| 0 | `elevation-canvas` | Page background |
| 1 | `elevation-surface` | Cards, panels, table rows |
| 2 | `elevation-raised` | Dropdowns, popovers |
| 3 | `elevation-overlay` | Inspector panels, drawers |
| 4 | `elevation-modal` | Modals, dialogs |

---

## Shadow Scale

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-none` | `none` | Flat surfaces |
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle card lift |
| `shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -1px rgba(0,0,0,0.04)` | Popovers, dropdowns |
| `shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(0,0,0,0.04)` | Inspector panels |
| `shadow-xl` | `0 20px 25px -5px rgba(0,0,0,0.08), 0 10px 10px -5px rgba(0,0,0,0.03)` | Modals |

> Shadows should be **very subtle**. Large, soft shadows. No dramatic floating cards.

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | 4px | Buttons, inputs, badges |
| `radius-md` | 8px | Cards, panels |
| `radius-lg` | 12px | Modals, large cards |
| `radius-xl` | 16px | Maximum — use sparingly |
| `radius-full` | 9999px | Avatars, pills |

> Never exceed 16px except for full-round elements. Rounded corners should feel **precise**, not playful.

---

## Surface Colors

| Token | Value | Usage |
|-------|-------|-------|
| `surface-canvas` | `#FFFFFF` | Base page |
| `surface-default` | `#FAFAFA` | Default card/panel |
| `surface-raised` | `#FFFFFF` + `shadow-md` | Elevated elements |
| `surface-overlay` | `#FFFFFF` + `shadow-lg` | Drawer/inspector |
| `surface-modal` | `#FFFFFF` + `shadow-xl` | Modal dialogs |
| `surface-scrim` | `rgba(0,0,0,0.4)` | Modal backdrop |

---

## Border Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `border-default` | `1px solid #E8E8EA` | Default borders |
| `border-strong` | `1px solid #D1D1D6` | Emphasized borders |
| `border-focus` | `2px solid #2563EB` | Focus state |
| `border-error` | `1px solid #FECACA` | Error state |

---

## Implementation Notes (CSS Variables)

```css
:root {
  /* Shadows */
  --shadow-none: none;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -1px rgba(0,0,0,0.04);
  --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(0,0,0,0.04);
  --shadow-xl: 0 20px 25px -5px rgba(0,0,0,0.08), 0 10px 10px -5px rgba(0,0,0,0.03);

  /* Radius */
  --radius-sm: 0.25rem;   /* 4px */
  --radius-md: 0.5rem;    /* 8px */
  --radius-lg: 0.75rem;   /* 12px */
  --radius-xl: 1rem;      /* 16px */
  --radius-full: 9999px;
}
```
