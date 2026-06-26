# Elevation & Shadows

## Philosophy

Elevation communicates **layering** — which elements are above, behind, or at the same level. It should be used sparingly and purposefully.

Shadows should feel real, not decorative. They exist to communicate depth.

---

## Elevation Scale

```css
/* Level 0 — Flat */
--shadow-0: none;

/* Level 1 — Subtle raise (cards, containers) */
--shadow-1: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

/* Level 2 — Raised (dropdowns, popovers) */
--shadow-2:
  0 1px 3px 0 rgba(0, 0, 0, 0.1),
  0 1px 2px -1px rgba(0, 0, 0, 0.1);

/* Level 3 — Floating (inspector panels, drawers) */
--shadow-3:
  0 4px 6px -1px rgba(0, 0, 0, 0.1),
  0 2px 4px -2px rgba(0, 0, 0, 0.1);

/* Level 4 — Elevated (modals) */
--shadow-4:
  0 10px 15px -3px rgba(0, 0, 0, 0.1),
  0 4px 6px -4px rgba(0, 0, 0, 0.1);

/* Level 5 — Highest (command palette, tooltips over modals) */
--shadow-5:
  0 20px 25px -5px rgba(0, 0, 0, 0.1),
  0 8px 10px -6px rgba(0, 0, 0, 0.1);
```

---

## Semantic Elevation Tokens

```css
--shadow-card:      var(--shadow-1);
--shadow-dropdown:  var(--shadow-2);
--shadow-panel:     var(--shadow-3);
--shadow-modal:     var(--shadow-4);
--shadow-palette:   var(--shadow-5);
```

---

## Elevation Map

| Element | Shadow Level |
|---------|------------|
| Flat content (tables, text) | 0 — none |
| Card | 1 — subtle |
| Dropdown, popover | 2 — raised |
| Inspector panel, drawer | 3 — floating |
| Modal dialog | 4 — elevated |
| Command palette | 5 — highest |

---

## Border as Alternative

For lower elevations, a border is often preferable to a shadow:

```css
/* Preferred for cards on white backgrounds */
.card {
  border: 1px solid var(--color-border-default);
  /* Not necessarily a shadow */
}

/* Shadow for floating elements */
.dropdown {
  box-shadow: var(--shadow-dropdown);
  /* No border needed when shadow provides separation */
}
```

---

## Principles

### Never stack shadows
An element with a parent shadow should not add its own shadow. Only the topmost element in a stack carries a shadow.

### Shadows respond to context
A card on a neutral-50 surface uses a subtle border. The same card over a modal overlay uses no shadow. Context matters.

### No decorative shadows
Shadows do not make things look "cool." They communicate depth. If there is no layering to communicate, there is no shadow.

---

## Border Radius

Consistent border radius communicates that components belong to the same system:

```css
--radius-sm:   4px;   /* Tags, badges, small elements */
--radius-md:   8px;   /* Buttons, inputs, cards */
--radius-lg:  12px;   /* Modals, panels, large cards */
--radius-xl:  16px;   /* Command palette */
--radius-full: 9999px; /* Pills, avatars */
```

| Element | Radius |
|---------|--------|
| Button | `--radius-md` (8px) |
| Input | `--radius-md` (8px) |
| Card | `--radius-lg` (12px) |
| Badge / Tag | `--radius-sm` (4px) |
| Avatar | `--radius-full` |
| Tooltip | `--radius-sm` (4px) |
| Modal | `--radius-lg` (12px) |
| Command palette | `--radius-xl` (16px) |
