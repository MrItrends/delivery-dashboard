# Component Rules, Naming & Manifesto

## 26 — Composition Rules

Every component must follow these rules, without exception:

| Rule | Requirement |
|------|------------|
| Token-driven | Every visual property uses a design token (`var(--color-*)`, `var(--space-*)`, etc.). No hardcoded values. |
| Responsive | Every component works at all 4 breakpoints: 1440px, 1024px, 768px, 375px. |
| Keyboard navigable | Every interactive element reachable and operable by keyboard. |
| Dark mode ready | All tokens must resolve correctly in both light and dark theme. Components never hardcode light-mode-only values. |
| Variants over duplicates | New visual needs become variants of an existing component. Not a new component. |
| Composable | Components can be nested within layout primitives without layout-breaking side effects. |
| No business logic | Components do not contain routing logic, permissions checks, or API calls. These belong in the feature layer above. |

---

## 27 — Component Naming

### Good Naming (Purpose-Based)

```
DataTable         — describes what it is
Inspector         — describes its role
PageHeader        — describes its function
StatusChip        — describes what it shows
ActivityFeed      — describes its content
Timeline          — describes its visual form
Metric            — describes its data type
FilterBar         — describes its function
CommandPalette    — describes its purpose
```

### Bad Naming (Feature-Specific)

```
ProjectCard       — named after a feature
DashboardWidget   — named after a context
BlueButton        — named after a visual
BigTable          — named after a size
InterventionHeader — named after a specific object
```

**Components describe purpose, not feature.** A component named after a specific feature cannot be reused anywhere else.

---

## 28 — Component Review Checklist

Before introducing any new component, answer every question. A "no" requires redesign before proceeding.

### Existence Check

- [ ] Does a similar primitive already exist in the component library?
- [ ] Can this be achieved by composing 2–3 existing components?
- [ ] Can an existing component be extended with a new variant instead?

### Quality Check

- [ ] Does it support every intended interaction pattern (hover, focus, click, keyboard)?
- [ ] Is it fully accessible (ARIA roles, keyboard navigation, focus management)?
- [ ] Is it responsive across all 4 breakpoints?
- [ ] Is it entirely token-driven (no hardcoded values)?

### Reuse Check

- [ ] Could another team reuse this component for a different feature?
- [ ] Does it avoid feature-specific naming?
- [ ] Would it belong in the design system rather than a feature folder?

### Architecture Check

- [ ] Does it avoid containing business logic or API calls?
- [ ] Is it composable without breaking its parent layout?
- [ ] Does it follow the existing naming convention?

---

## 29 — Component Maturity Model

Every component progresses through four stages. Components must reach their required stage before they can be relied upon at that level.

### Stage 1 — Experimental

- Built for a specific feature
- Not yet reviewed for reuse
- May have hardcoded values
- Not documented
- **Usage:** One feature only; no cross-feature dependencies

### Stage 2 — Product Ready

- Reviewed for the feature it serves
- Accessible and keyboard navigable
- Token-driven
- Documented with basic usage examples
- **Usage:** Used across 2–3 features within the same domain

### Stage 3 — System Component

- Fully documented with all variants and states
- Reviewed by design and engineering lead
- Used across multiple product areas
- Has defined API and prop types
- **Usage:** Can be used across the entire product

### Stage 4 — Foundation Primitive

- Stable API with no breaking changes policy
- Has migration path for any future changes
- Used across every part of the product
- Tested at >90% coverage
- **Usage:** Depended upon at application level

**Only Foundation Primitives should be relied upon across the entire application.** DataTable, Inspector, PageHeader, Button, StatusChip, Toast, and CommandPalette are all Foundation Primitives.

---

## 30 — The Component Manifesto

**Components are not UI elements. They are the vocabulary of the product.**

Just as words form sentences, components form experiences. A DataTable is not a table of rows and columns — it is the primary working surface of operational software. An Inspector is not a side panel — it is the mechanism by which users engage with the detail of their work without losing their place.

**A well-designed component should feel invisible in isolation but indispensable when composed with others.**

The goal is not to build many components. The goal is to build a **small, exceptionally consistent set of primitives** that can create hundreds of screens without introducing visual or behavioral inconsistency.

When a new feature is built, the question should never be: "What UI does this feature need?"

The question should always be: "Which existing components, composed together, can express what this feature requires?"

**Every future feature should feel like it was assembled from the same language — not designed from scratch.**

If a user who has spent two weeks using the Intervention screen opens the Budget screen for the first time, they should immediately recognize how to use it. Not because someone told them. Because the vocabulary is the same.

That recognition — that feeling of familiarity without instruction — is what a mature component system achieves.

Build the vocabulary first. The product follows.
