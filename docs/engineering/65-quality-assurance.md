# 65 — Quality Assurance

Before any feature is considered complete, verify across all dimensions.

---

## Product Quality

| Check | Criteria |
|-------|---------|
| Correct problem | Feature solves the stated user goal |
| Collaboration supported | Multiple users can contribute |
| Object hierarchy | Feature fits within the defined hierarchy |
| No orphaned data | All objects connect to parents |
| Single source of truth | No data duplication |

---

## UX Quality

| Check | Criteria |
|-------|---------|
| Clear navigation | Users know where they are |
| Predictable interactions | Same patterns everywhere |
| Accessible | Meets WCAG AA minimum |
| Fast | Interactions feel instant |
| Context preserved | Users don't lose their place |
| Progressive disclosure | Complexity revealed gradually |
| Empty states | Every empty state teaches |
| Error states | Every error explains and recovers |
| Loading states | Skeletons, never blank screens |

---

## UI Quality

| Check | Criteria |
|-------|---------|
| Design tokens | No hardcoded values |
| Typography first | Type carries the hierarchy |
| Grid aligned | Everything snaps to the grid |
| Consistent spacing | Uses spacing scale only |
| No decoration | Every visual element has purpose |
| Responsive | Works at tablet and mobile |
| No generic patterns | Feels like the Delivery Dashboard |

---

## Engineering Quality

| Check | Criteria |
|-------|---------|
| Reusable | Components work beyond current use case |
| Tested | Unit + integration + component tests |
| Scalable | Handles large datasets (virtualization) |
| Documented | Types are complete, WHY comments added |
| No duplication | Logic extracted, not copied |
| Typed | TypeScript types for all props and APIs |

---

## Performance Quality

| Metric | Target |
|--------|--------|
| Initial load | < 2 seconds |
| Navigation | < 300ms |
| Search results | < 200ms |
| Drawer/panel open | < 150ms |
| Filter response | Instant (< 100ms) |
| Animation frame rate | 60fps |
| Large table (10k rows) | Virtualized, smooth scroll |

---

## Accessibility Quality

| Check | Tool / Method |
|-------|--------------|
| Keyboard navigation | Manual testing through every flow |
| Screen reader | NVDA / VoiceOver testing |
| Color contrast | 4.5:1 minimum (axe-core) |
| Focus management | Visible focus ring everywhere |
| Reduced motion | `prefers-reduced-motion` respected |
| ARIA | Labels on all interactive elements |
| Semantic HTML | Correct element hierarchy |

---

## Documentation Quality

| Check | Criteria |
|-------|---------|
| Matches Product Bible | No deviations from spec |
| Cross-references updated | Related sections linked |
| Naming consistent | Same terms throughout |
| Architecture maintained | Hierarchy preserved |
| Changelog updated | Changes documented |

---

## Pre-Ship Checklist

```
□ Feature solves the correct user goal
□ Object relationships are correct
□ Permissions enforced at API and UI level
□ Collaboration features work (comments, assignments)
□ History is recorded for all mutations
□ Empty, loading, and error states designed
□ Keyboard navigation complete
□ Screen reader tested
□ Performance targets met
□ No hardcoded design values
□ TypeScript types complete
□ Tests written and passing
□ Accessibility audit passed (axe-core clean)
□ Product Bible compliance verified
□ Responsive layout tested
```

---

## Definition of Done

A feature is **done** when:

1. It passes all checks above
2. It has been reviewed by at least one other engineer
3. It matches the Product Bible specification
4. It has been tested with real or realistic data
5. It has been tested at scale (large datasets)
6. Accessibility has been verified
7. Performance targets are met

A feature that passes visual review but fails any of these checks is **not done**.
