# Contributing to the Delivery Dashboard

This document explains how to work with the Product Bible and documentation repository.

---

## Repository Structure

```
delivery-dashboard/
├── README.md               ← Start here
├── CONTRIBUTING.md         ← This file
├── PRODUCT_BIBLE.md        ← Complete product bible (single document)
│
├── architecture/           ← System design and structural decisions
├── product/                ← Product specifications (one file per object)
├── ux/                     ← User experience patterns and guidelines
├── design-system/          ← Visual language and component standards
├── engineering/            ← Technical architecture and implementation
└── ai/                     ← Claude-specific build rules and guidelines
```

---

## Document Hierarchy

The **PRODUCT_BIBLE.md** is the authoritative source. All other files are expansions of sections within it.

If a conflict exists between a section file and the Product Bible, **the Product Bible takes precedence**.

---

## How To Use This Repository

### For Product Designers
Start with `ux/` and `design-system/`. Reference `product/` for object specifications.

### For UX Designers
Start with `ux/ux-philosophy.md`, then work through each UX pattern file. Reference `product/` for object-specific behaviour.

### For Frontend Engineers
Start with `engineering/repository.md`, then `ai/build-rules.md`. Reference `design-system/` for visual implementation and `product/` for feature specs.

### For Backend Engineers
Start with `engineering/api.md` and `architecture/data-model.md`. Reference `product/` for object definitions.

### For Product Managers
Start with `README.md` and `PRODUCT_BIBLE.md`. Reference `product/` for feature specifications.

### For Claude AI
Read `PRODUCT_BIBLE.md` in full before generating any code or design. Then follow `ai/build-rules.md` strictly.

---

## Editing Guidelines

### What Can Be Updated
- Adding detail to existing specifications
- Correcting factual errors
- Adding edge cases discovered during implementation
- Updating future expansion sections

### What Requires Review
- Changes to the object hierarchy
- Changes to permissions model
- Changes to the design token system
- Changes to API conventions

### What Should Never Change Without Consensus
- The core object model (Workspace → Portfolio → Priority Area → Project → Intervention → Activity)
- The design principles
- The engineering philosophy

---

## File Naming

All files use **kebab-case** with no numeric prefixes.

```
✓ interventions.md
✓ color.md
✓ build-rules.md

✗ 18-interventions.md
✗ color-system.md
✗ claude-build-rules.md
```

---

## Adding New Sections

1. Check that the concept cannot be covered within an existing file
2. Determine which folder the file belongs in
3. Create the file using the standard section template
4. Add an entry to `README.md`
5. Add a cross-reference in `PRODUCT_BIBLE.md`

---

## Standard Section Template

Every file in this repository should follow this structure:

```markdown
# Section Title

## Purpose
One paragraph explaining what this section covers and why it matters.

## [Main Content Sections]
...

## Review Checklist
- [ ] Checklist items for verifying completeness
```

---

## Version History

This is a living document. The Product Bible evolves as the product evolves.

Major updates should be noted at the bottom of `PRODUCT_BIBLE.md` with a date and summary of changes.
