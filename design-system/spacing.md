# Spacing System

## Base Unit

**8px** is the base unit of the spacing system.

All spacing values are multiples of 8px. This creates a visual rhythm that is consistent, harmonious, and easy to implement.

```css
--space-1:  4px;   /* 0.5 × base — very tight */
--space-2:  8px;   /* 1 × base — tight */
--space-3:  12px;  /* 1.5 × base */
--space-4:  16px;  /* 2 × base — default */
--space-5:  20px;  /* 2.5 × base */
--space-6:  24px;  /* 3 × base — comfortable */
--space-8:  32px;  /* 4 × base — section gap */
--space-10: 40px;  /* 5 × base */
--space-12: 48px;  /* 6 × base — large section */
--space-16: 64px;  /* 8 × base — major section */
--space-20: 80px;  /* 10 × base */
--space-24: 96px;  /* 12 × base */
```

---

## Semantic Spacing Tokens

```css
/* Component internal spacing */
--spacing-component-xs:  var(--space-1);   /* Icon margin, badge padding */
--spacing-component-sm:  var(--space-2);   /* Tight padding */
--spacing-component-md:  var(--space-4);   /* Default padding */
--spacing-component-lg:  var(--space-6);   /* Comfortable padding */
--spacing-component-xl:  var(--space-8);   /* Large padding */

/* Layout spacing */
--spacing-section:       var(--space-12);  /* Between page sections */
--spacing-page-x:        var(--space-8);   /* Page horizontal margin */
--spacing-page-y:        var(--space-8);   /* Page top padding */
--spacing-card:          var(--space-6);   /* Card internal padding */
--spacing-form-group:    var(--space-6);   /* Between form fields */
--spacing-table-row:     var(--space-3);   /* Table row padding (top/bottom) */
--spacing-table-cell:    var(--space-4);   /* Table cell padding (left/right) */
```

---

## Application of Spacing

### Page Layout

```css
.page {
  padding: var(--spacing-page-y) var(--spacing-page-x);
}

.page-section + .page-section {
  margin-top: var(--spacing-section);
}
```

### Cards

```css
.card {
  padding: var(--spacing-card);
}
```

### Form Groups

```css
.form-group + .form-group {
  margin-top: var(--spacing-form-group);
}
```

### Table Rows

```css
.table-cell {
  padding: var(--spacing-table-row) var(--spacing-table-cell);
}
```

---

## Spacing Principles

### Proximity = Relationship
Elements that are closer together are related. Elements with more space between them are independent.

- Section heading with tight spacing to content: related
- Section with large gap before next section: independent

### Consistent Density
Every similar context should have the same spacing. Form fields do not use arbitrary padding. They use `--spacing-component-md`.

### Never Hardcode
No pixel values in component files. Always reference a token.

```css
/* Wrong */
.button {
  padding: 10px 18px;
}

/* Right */
.button {
  padding: var(--spacing-component-sm) var(--spacing-component-lg);
}
```

---

## Touch Targets

All interactive elements (buttons, links, inputs) must have a minimum touch target of **44px × 44px** regardless of their visual size.

```css
.icon-button {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

---

## Spacing Reference

| Token | Value | Common Use |
|-------|-------|-----------|
| `--space-1` | 4px | Icon margins, badges |
| `--space-2` | 8px | Tight internal padding |
| `--space-3` | 12px | Table row vertical padding |
| `--space-4` | 16px | Default input padding, button padding |
| `--space-6` | 24px | Card padding, form groups |
| `--space-8` | 32px | Page margin, section gap |
| `--space-12` | 48px | Major section spacing |
| `--space-16` | 64px | Page-level separations |
