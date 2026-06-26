# Color System

## Philosophy

Color communicates meaning. Every color decision must justify its existence.

We do not use color for decoration. We use color for:
- Hierarchy (primary vs. secondary information)
- Status (healthy, at risk, blocked)
- Action (what can be clicked, what is active)
- Feedback (success, warning, error)

---

## Core Palette

### Neutral (Base)

```css
--color-neutral-0:   #FFFFFF;
--color-neutral-50:  #F9FAFB;
--color-neutral-100: #F3F4F6;
--color-neutral-200: #E5E7EB;
--color-neutral-300: #D1D5DB;
--color-neutral-400: #9CA3AF;
--color-neutral-500: #6B7280;
--color-neutral-600: #4B5563;
--color-neutral-700: #374151;
--color-neutral-800: #1F2937;
--color-neutral-900: #111827;
--color-neutral-950: #030712;
```

### Brand (Action Blue)

```css
--color-brand-50:  #EFF6FF;
--color-brand-100: #DBEAFE;
--color-brand-200: #BFDBFE;
--color-brand-300: #93C5FD;
--color-brand-400: #60A5FA;
--color-brand-500: #3B82F6;
--color-brand-600: #2563EB;
--color-brand-700: #1D4ED8;
--color-brand-800: #1E40AF;
--color-brand-900: #1E3A8A;
```

---

## Semantic Tokens

### Text Colors

```css
--color-text-primary:    var(--color-neutral-900);
--color-text-secondary:  var(--color-neutral-600);
--color-text-tertiary:   var(--color-neutral-400);
--color-text-disabled:   var(--color-neutral-300);
--color-text-inverse:    var(--color-neutral-0);
--color-text-link:       var(--color-brand-600);
--color-text-danger:     #DC2626;
```

### Surface Colors

```css
--color-surface-default: var(--color-neutral-0);
--color-surface-subtle:  var(--color-neutral-50);
--color-surface-raised:  var(--color-neutral-0);
--color-surface-overlay: rgba(0, 0, 0, 0.5);
--color-surface-hover:   var(--color-neutral-50);
--color-surface-selected: var(--color-brand-50);
```

### Border Colors

```css
--color-border-default:  var(--color-neutral-200);
--color-border-strong:   var(--color-neutral-300);
--color-border-focus:    var(--color-brand-500);
--color-border-danger:   #DC2626;
```

### Action Colors

```css
--color-action-primary:         var(--color-brand-600);
--color-action-primary-hover:   var(--color-brand-700);
--color-action-primary-active:  var(--color-brand-800);
--color-action-secondary:       var(--color-neutral-0);
--color-action-secondary-hover: var(--color-neutral-50);
```

---

## Status Colors

Health states have consistent colors across the entire application:

```css
/* Health / Status */
--color-status-excellent:   #059669;  /* Emerald 600 */
--color-status-healthy:     #16A34A;  /* Green 600 */
--color-status-attention:   #D97706;  /* Amber 600 */
--color-status-risk:        #EA580C;  /* Orange 600 */
--color-status-critical:    #DC2626;  /* Red 600 */
--color-status-neutral:     var(--color-neutral-400);
--color-status-archived:    var(--color-neutral-300);

/* Semantic state */
--color-success: #16A34A;
--color-warning: #D97706;
--color-error:   #DC2626;
--color-info:    var(--color-brand-600);
```

---

## Data Visualization Colors

For charts, graphs, and comparative views:

```css
--color-data-1: #3B82F6;  /* Blue */
--color-data-2: #8B5CF6;  /* Purple */
--color-data-3: #06B6D4;  /* Cyan */
--color-data-4: #10B981;  /* Green */
--color-data-5: #F59E0B;  /* Amber */
--color-data-6: #EF4444;  /* Red */
--color-data-7: #EC4899;  /* Pink */
--color-data-8: #6366F1;  /* Indigo */
```

Colors are chosen for: Color-blind accessibility, Sufficient contrast, Harmonious appearance.

---

## Contrast Requirements

| Use Case | Minimum Contrast |
|---------|-----------------|
| Body text | 4.5:1 (AA) |
| Large text (18px+) | 3:1 (AA) |
| UI components | 3:1 (AA) |
| Status indicators | Must not rely on color alone |

Color alone must never be the only indicator of state. Always pair with: Icon, Text label, Pattern, Shape.

---

## Color Anti-Patterns

| Avoid | Problem |
|-------|---------|
| Multiple shades of the same color for different meanings | Creates confusion |
| Bright accent colors for large surfaces | Visually overwhelming |
| Color-only error/success states | Inaccessible |
| Custom colors outside the token system | Creates inconsistency |
| Pure black (#000000) backgrounds | Too harsh; use neutral-950 |

---

## Applying Colors

```css
/* Component example */
.button-primary {
  background: var(--color-action-primary);
  color: var(--color-text-inverse);
  border: none;
}

.button-primary:hover {
  background: var(--color-action-primary-hover);
}

/* Never */
.button-primary {
  background: #2563EB;  /* Hardcoded — forbidden */
  color: white;
}
```
