# Cross-Screen Rules, Quality Checklist & Manifesto

## The Five Questions Every Screen Must Answer

Every screen, before a user interacts with it, must make these five things obvious:

| Question | How Answered |
|---------|-------------|
| **Where am I?** | Breadcrumb, page title, and visual hierarchy |
| **What is this?** | Status indicator, health, and short description |
| **What can I do?** | Primary action visible above the fold |
| **What changed?** | Activity feed or last-updated metadata |
| **What should I do next?** | Contextual prompts, approvals, or empty-state guidance |

If any question requires clicking, scrolling, or searching to answer — the composition has failed.

---

## Cross-Screen Composition Rules

Every screen follows the same visual rhythm. No exceptions.

```
Header (Context + Identity + Status)
  ↓
Primary Content (The main work area)
  ↓
Supporting Information (Context for the main content)
  ↓
History (What has happened)
  ↓
Administration (Settings and configuration — always last)
```

The order is not aesthetic — it is cognitive. Users arrive needing context, then primary content, then supporting detail, then historical record. Reversing this order forces users to process information before they have established what the screen is about.

---

## Cross-Screen Interaction Rules

Every screen in the product:

| Rule | Why |
|------|-----|
| Preserves context | Context switches are expensive; Inspector over navigation |
| Prefers inline editing | Most edits should happen in place |
| Opens objects in an Inspector | Not a new page, unless the object is the primary destination |
| Avoids unnecessary page transitions | Each transition loses the user's mental position |
| Supports keyboard navigation | Keyboard-first is also screen-reader-first |
| Provides meaningful empty states | Empty is a teaching opportunity, not a failure |
| Uses progressive disclosure | Show what users need at Level 1; reveal depth on demand |
| Keeps one primary action visible | One clear next step per screen |
| Maintains consistent layout across all object types | Workspace → Portfolio → Project → Intervention: same grammar |

---

## Screen Quality Checklist

Before any screen is approved, verify every item. No partial marks.

### Purpose

- [ ] Does this screen have one clear, specific purpose?
- [ ] Can a first-time user understand that purpose within 5 seconds?
- [ ] Could any of that purpose be handled by an existing screen?

### Information

- [ ] Is the most important information above the fold?
- [ ] Can any section be removed without losing the primary purpose?
- [ ] Is there unnecessary duplication of information already visible elsewhere?
- [ ] Is metadata visually subordinate to primary content?

### Actions

- [ ] Is there exactly one primary action?
- [ ] Are secondary actions contextual to the content they affect?
- [ ] Can the 3 most common tasks be completed without navigating to another page?
- [ ] Are destructive actions clearly marked and protected by confirmation?

### Layout

- [ ] Does it follow the Layout & Composition Bible hierarchy?
- [ ] Does it use the 70/30 primary/supporting split where applicable?
- [ ] Is the Inspector used instead of opening a new page?
- [ ] Does the header contain only identity, status, and primary action?
- [ ] Does whitespace organize sections — not borders or backgrounds?

### Accessibility

- [ ] Fully keyboard accessible (Tab, Shift+Tab, Enter, Space, Arrow keys)
- [ ] Screen-reader compatible (ARIA labels, landmarks, live regions)
- [ ] WCAG AA compliant (4.5:1 contrast for body text, 3:1 for large text)
- [ ] Reduced motion respected (no animations for `prefers-reduced-motion`)
- [ ] Focus management correct (focus moves to opened Inspector; returns on close)

### Performance

- [ ] Primary content loads within 2 seconds on standard connection
- [ ] Optimistic updates for all write operations (update UI before server confirms)
- [ ] No blocking spinners for operations under 300ms
- [ ] Tables with >50 rows use virtualization
- [ ] Scales to large datasets (100,000+ items) without layout failure

### Consistency

- [ ] Uses existing interaction patterns (does not invent a new pattern)
- [ ] Uses existing components (does not build a feature-specific component)
- [ ] Uses design tokens only (no hardcoded colors, spacings, or font sizes)
- [ ] Introduces no new visual language without documented justification

---

## The Screen Blueprints Manifesto

**A screen is not a canvas to fill. It is a tool for helping someone make a decision.**

Every section must justify its existence. Every component must support the user's goal. Every action should move work forward.

### What Success Looks Like

If a user can move seamlessly from:

```
Workspace Home
  → Portfolio
    → Priority Area
      → Project
        → Intervention
          → Activities
```

...without ever feeling that they have entered a different application — then the Screen Blueprints have succeeded.

The sidebar is the same. The header is the same. The tabs are the same. The Inspector is the same. Only the content changes.

This is not achieved by making every screen identical. It is achieved by making every screen speak the same visual grammar.

### The Highest Standard

The highest standard for a screen in this product is not visual originality.

It is **coherence**.

Every screen should feel like it was designed by the same team, with the same philosophy, for the same purpose — on the same week, not assembled over years by different designers with different influences.

Users should never notice when they move between screens. They should only notice when they arrive at what they were looking for.

**That invisibility is the goal.**
