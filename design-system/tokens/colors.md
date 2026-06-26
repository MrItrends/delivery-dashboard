# Design Tokens — Colors

> Color communicates meaning. Never decoration.

---

## Philosophy

The interface should remain **predominantly neutral**. Typography carries hierarchy. Whitespace carries structure. Color reinforces understanding.

Every color should be purposeful. If a color can be removed without losing meaning, it should be removed.

---

## Surface Colors

| Token | Value | Usage |
|-------|-------|-------|
| `color-canvas` | `#FFFFFF` | Page background |
| `color-surface` | `#FAFAFA` | Card and panel backgrounds |
| `color-surface-elevated` | `#FFFFFF` | Elevated cards, modals |
| `color-surface-sunken` | `#F4F4F5` | Inputs, code blocks |
| `color-border` | `#E8E8EA` | Default borders |
| `color-border-strong` | `#D1D1D6` | Emphasized borders |
| `color-divider` | `#F1F1F2` | Subtle section separators |

---

## Text Colors

| Token | Value | Usage |
|-------|-------|-------|
| `color-text-primary` | `#111111` | Headings, primary content |
| `color-text-secondary` | `#5F6368` | Supporting labels, metadata |
| `color-text-tertiary` | `#90959D` | Placeholder, hints |
| `color-text-disabled` | `#C2C5CC` | Disabled state |
| `color-text-inverse` | `#FFFFFF` | Text on dark backgrounds |
| `color-text-link` | `#2563EB` | Hyperlinks |
| `color-text-link-hover` | `#1D4ED8` | Link hover state |

---

## Semantic — Success (Green)

| Token | Value | Usage |
|-------|-------|-------|
| `color-success-bg` | `#F0FDF4` | Success backgrounds |
| `color-success-border` | `#BBF7D0` | Success borders |
| `color-success-text` | `#166534` | Success text |
| `color-success-icon` | `#16A34A` | Success icons |
| `color-success-solid` | `#22C55E` | Filled success elements |
| `color-success-solid-hover` | `#16A34A` | Filled success hover |

---

## Semantic — Warning (Amber)

| Token | Value | Usage |
|-------|-------|-------|
| `color-warning-bg` | `#FFFBEB` | Warning backgrounds |
| `color-warning-border` | `#FDE68A` | Warning borders |
| `color-warning-text` | `#92400E` | Warning text |
| `color-warning-icon` | `#D97706` | Warning icons |
| `color-warning-solid` | `#F59E0B` | Filled warning elements |
| `color-warning-solid-hover` | `#D97706` | Filled warning hover |

---

## Semantic — Error (Red)

| Token | Value | Usage |
|-------|-------|-------|
| `color-error-bg` | `#FEF2F2` | Error backgrounds |
| `color-error-border` | `#FECACA` | Error borders |
| `color-error-text` | `#991B1B` | Error text |
| `color-error-icon` | `#DC2626` | Error icons |
| `color-error-solid` | `#EF4444` | Filled error elements |
| `color-error-solid-hover` | `#DC2626` | Filled error hover |

---

## Semantic — Information (Blue)

| Token | Value | Usage |
|-------|-------|-------|
| `color-info-bg` | `#EFF6FF` | Info backgrounds |
| `color-info-border` | `#BFDBFE` | Info borders |
| `color-info-text` | `#1E40AF` | Info text |
| `color-info-icon` | `#2563EB` | Info icons |
| `color-info-solid` | `#3B82F6` | Filled info elements |
| `color-info-solid-hover` | `#2563EB` | Filled info hover |

---

## Semantic — Neutral (Gray)

| Token | Value | Usage |
|-------|-------|-------|
| `color-neutral-bg` | `#F9FAFB` | Neutral backgrounds |
| `color-neutral-border` | `#E5E7EB` | Neutral borders |
| `color-neutral-text` | `#374151` | Neutral text |
| `color-neutral-icon` | `#6B7280` | Neutral icons |
| `color-neutral-solid` | `#9CA3AF` | Filled neutral elements |

---

## Interactive (Blue)

Blue communicates **interaction**. Never branding.

| Token | Value | Usage |
|-------|-------|-------|
| `color-interactive` | `#2563EB` | Primary buttons, links |
| `color-interactive-hover` | `#1D4ED8` | Interactive hover |
| `color-interactive-active` | `#1E40AF` | Interactive active/pressed |
| `color-interactive-subtle` | `#EFF6FF` | Interactive backgrounds |
| `color-interactive-focus` | `#93C5FD` | Focus ring |

---

## Health Status Colors

Used consistently across all health indicators in the product.

| State | Token | Background | Text | Border |
|-------|-------|-----------|------|--------|
| Excellent | `health-excellent` | `#F0FDF4` | `#166534` | `#BBF7D0` |
| Healthy | `health-healthy` | `#F0FDF4` | `#166534` | `#BBF7D0` |
| Needs Attention | `health-attention` | `#FFFBEB` | `#92400E` | `#FDE68A` |
| At Risk | `health-at-risk` | `#FFF7ED` | `#9A3412` | `#FED7AA` |
| Critical | `health-critical` | `#FEF2F2` | `#991B1B` | `#FECACA` |
| Archived | `health-archived` | `#F9FAFB` | `#374151` | `#E5E7EB` |

---

## Chart Colors

Maximum of **six** primary chart colors. Additional categories rely on pattern and labeling.

| Token | Value | Usage |
|-------|-------|-------|
| `chart-1` | `#2563EB` | Primary series |
| `chart-2` | `#059669` | Secondary series |
| `chart-3` | `#D97706` | Tertiary series |
| `chart-4` | `#7C3AED` | Quaternary series |
| `chart-5` | `#DC2626` | Fifth series |
| `chart-6` | `#0891B2` | Sixth series |

---

## Accessibility Requirements

Every color combination must meet **WCAG AA** minimum:
- Normal text: 4.5:1 contrast ratio
- Large text: 3:1 contrast ratio
- UI components: 3:1 contrast ratio

Critical interfaces should target **AAA** where practical.

---

## Dark Mode (Future)

The token system should be structured to support dark mode from day one, even if not immediately implemented. Every token should have a semantic name rather than a literal color description.

**Correct:** `color-surface` 
**Incorrect:** `color-white`
