# Surfaces — Borders, Shadows & Radius

## Philosophy

Surfaces create structure. They are the architecture of the interface.

Used well: surfaces create spatial hierarchy that users understand intuitively.

Used poorly: surfaces create visual noise, arbitrary depth, and an interface that looks constructed rather than considered.

---

## Borders

### Borders organize. Not separate.

The distinction is critical.

**Organizing border:** Gives structure to a section without suggesting the sections are opposed or independent. Example: table column separator.

**Separating border:** Creates a visual barrier that says these two things are different. Example: a heavy dark border between the sidebar and the content area.

The Delivery Dashboard uses only organizing borders.

### Border Specification

```css
/* Default border — barely there */
border: 1px solid var(--color-neutral-200);  /* #E5E7EB */

/* Strong border — hover, focus context */
border: 1px solid var(--color-neutral-300);  /* #D1D5DB */

/* Focus ring */
outline: 2px solid var(--color-brand-500);
outline-offset: 2px;
```

### What Does Not Have Borders

- Sections of a page (use whitespace instead)
- Navigation items (use typography and subtle background)
- Active states (use background color or typography weight)
- Headings (use size hierarchy)

**Every border should be questioned.** Many borders that designers instinctively add are doing structural work that whitespace should do instead.

---

## Shadows

### Avoid floating interfaces.

Shadows communicate elevation. They say: "this element is above the surface below it."

Used correctly, shadows help users understand the spatial model: what can be dismissed, what is above, what is the current focus.

Used incorrectly, shadows make the interface look busy, three-dimensional, and heavy.

### The Preference Order

```
Border → Surface Color → Shadow
```

If a border can communicate containment, use a border.
If a surface color change can communicate containment, use that.
Use shadow only when element is genuinely above the surface.

### Shadow Scale

```css
/* Level 0 — No shadow. Flat surface */
box-shadow: none;

/* Level 1 — Card on white. Barely visible */
box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

/* Level 2 — Dropdown. Clearly elevated */
box-shadow:
  0 1px 3px 0 rgba(0, 0, 0, 0.1),
  0 1px 2px -1px rgba(0, 0, 0, 0.1);

/* Level 3 — Inspector panel. Floating */
box-shadow:
  0 4px 6px -1px rgba(0, 0, 0, 0.1),
  0 2px 4px -2px rgba(0, 0, 0, 0.1);

/* Level 4 — Modal */
box-shadow:
  0 10px 15px -3px rgba(0, 0, 0, 0.1),
  0 4px 6px -4px rgba(0, 0, 0, 0.1);

/* Level 5 — Command palette. Highest */
box-shadow:
  0 20px 25px -5px rgba(0, 0, 0, 0.1),
  0 8px 10px -6px rgba(0, 0, 0, 0.1);
```

Shadows should almost disappear. They are felt, not seen.

### What Never Has a Shadow

- Page sections
- Navigation items
- Table rows
- Form fields (use border only)
- Text elements
- Inline elements

---

## Border Radius

### Corners should feel engineered. Not playful.

Border radius is one of the clearest indicators of a product's design sensibility. Very large radii feel consumer, playful, casual. Very small or zero radii feel utilitarian or dated. The right range feels crafted, professional, considered.

### Radius Scale

```css
--radius-sm:   4px;    /* Tags, badges, small chips */
--radius-md:   8px;    /* Buttons, inputs, cards, most components */
--radius-lg:   12px;   /* Modals, large panels, sheets */
--radius-xl:   16px;   /* Command palette only */
--radius-full: 9999px; /* Avatars only */
```

### Forbidden Radius Values

| Value | Problem |
|-------|---------|
| 20px+ on general components | Feels consumer, not professional |
| 24px on buttons | Pill-style; inappropriate for government context |
| 32px on cards | Looks like a mobile app |
| Organic blob shapes | Design trend, not design principle |
| Inconsistent radius | Breaks system coherence |

### Radius by Component

| Component | Radius |
|-----------|--------|
| Button | 8px |
| Input | 8px |
| Card | 12px |
| Dropdown | 8px |
| Badge / Tag | 4px |
| Tooltip | 4px |
| Modal | 12px |
| Inspector Panel | 0 (full height) |
| Avatar | 9999px (circular) |
| Command Palette | 16px |

---

## The Surfaces Test

A screen passes when:

1. Shadows are not visible in normal viewing conditions — only felt
2. Every border organizes; none separate unnecessarily
3. Corner radii are consistent with the scale and never exceed 16px for standard UI
4. Whitespace does more structural work than borders
5. The interface feels flat and structured, not layered and floating
