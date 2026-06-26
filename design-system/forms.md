# Forms

## Philosophy

Forms should be **as short as possible**. Every field you add is friction. Every field you remove is speed.

Government forms have a reputation for being long, complex, and frustrating. The Delivery Dashboard should invert this expectation.

---

## Form Principles

### Progressive Creation
Create objects with minimum required fields. Add detail later. Avoid mandatory fields for non-essential information.

```
Create Activity:
  ✓ Title (required)
  ✓ Intervention (required)
  ○ Everything else can be added later
```

### One Column Default
Single-column forms are easier to complete and have lower error rates. Use two columns only when fields are clearly related (Start Date + End Date).

### Top-Aligned Labels
Labels appear above fields, not beside them. This is faster to scan and clearer on mobile.

### Inline Validation
Validate on blur, not on submit. Don't show errors before the user has had a chance to enter anything.

### Keyboard-First
Tab through all fields. Enter submits. Escape cancels. Forms are fully navigable without a mouse.

---

## Form Field Types

| Field Type | Component | Use For |
|------------|-----------|---------|
| Text | `Input` | Short text, names |
| Textarea | `Textarea` | Descriptions, notes |
| Rich Text | `RichTextEditor` | Detailed content |
| Number | `Input[type=number]` | Quantities, percentages |
| Currency | `CurrencyInput` | Budget values |
| Date | `DatePicker` | Single dates |
| Date Range | `DateRangePicker` | Start + end dates |
| Select | `Select` | Single choice from list |
| Multi-Select | `MultiSelect` | Multiple choices |
| Combobox | `Combobox` | Search + select |
| User Selector | `UserSelector` | Assign to user(s) |
| Object Selector | `ObjectSelector` | Link to objects |
| Toggle | `Toggle` | On/off settings |
| Checkbox | `Checkbox` | Single opt-in |
| Radio | `RadioGroup` | Mutually exclusive choice |
| File Upload | `FileUpload` | Attach documents |
| Tags | `TagInput` | Freeform labels |
| Color | `ColorPicker` | Label colors |

---

## Field Anatomy

```
[Label]                           [Optional badge if not required]
[────────────────────────────────]  ← Input
[Helper text or character count]
[Error message if invalid]
```

---

## States

### Default
```
Title
[─────────────────────────────]
```

### Focus
```
Title
[─────────────────────────────]  ← Blue border: --color-border-focus
```

### Error
```
Title
[─────────────────────────────]  ← Red border: --color-border-danger
⚠ Title is required
```

### Disabled
```
Title
[─────────────────────────────]  ← Muted background, cursor: not-allowed
```

### Success (optional)
```
Title
[─────────────────────────────] ✓
```

---

## Input Sizing

| Size | Height | Font Size | Use |
|------|--------|-----------|-----|
| sm | 32px | 13px | Compact tables, filters |
| md | 40px | 14px | Default |
| lg | 48px | 16px | Prominent inputs |

---

## Form Layout

### Single Column (Default)
```
[Label]
[────────────────────────]

[Label]
[────────────────────────]

[Label]
[────────────────────────]

[Cancel]  [Submit]
```

### Two Column (Related Fields)
```
[Start Date]        [End Date]
[──────────]        [──────────]

[Allocated]         [Currency]
[──────────]        [──────────]
```

### Sectioned Form (Long Forms)
```
━━━ Basic Information ━━━━━━━━━━━━━━━

[Label]
[────────────────────────]

━━━ Ownership ━━━━━━━━━━━━━━━━━━━━━━

[Label]
[────────────────────────]
```

---

## Submit Actions

```
[Cancel]          [Save Draft]  [Submit]
```

- Primary action: right-aligned
- Cancel: left-aligned
- Save Draft: between (where applicable)

Loading state on submit:
```
[Cancel]                    [⟳ Saving...]
```

---

## Validation Rules

| Rule | Implementation |
|------|---------------|
| Required fields | Validate on blur and submit |
| Minimum length | Show counter while typing |
| Maximum length | Show counter with warning near limit |
| Date validation | Prevent invalid date combinations |
| Email format | Validate on blur |
| Number range | Validate on blur |

**Never show an error before the user has interacted with a field.**

---

## Form Error Summary

For forms with many fields, show a summary above the form on submit failure:

```
┌──────────────────────────────────────────┐
│ ⚠ Please correct the following:         │
│ • Title is required                      │
│ • Due date must be after start date      │
│ • Owner must be assigned                 │
└──────────────────────────────────────────┘
```

Each error links to the relevant field.

---

## Autocomplete / Suggestions

For user selectors, object selectors, and tag inputs — show suggestions as the user types:

```
Owner: [Ahmed...      ]
        ↓
       Ahmed Yusuf — Project Manager
       Ahmet Kaya   — Contributor
```

Suggestions are filtered in real-time from the workspace directory.

---

## Claude Implementation Notes

The biggest form mistake in government software is making forms too long. **Start with only required fields**. Add optional fields behind a "More options" disclosure.

The creation flow for Activities should take under 30 seconds. The creation flow for Interventions should take under 2 minutes for the essential setup.

Treat form completion speed as a product performance metric.
