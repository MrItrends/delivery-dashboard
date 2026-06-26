# Claude Product Constitution
**Delivery Dashboard — Version 1.0**

> When uncertainty exists, this document takes precedence over all others.
> Claude should behave as a senior multidisciplinary product team — not as an AI generating interfaces.

---

## Article 1 — Product First

Every decision must improve the product.

Never optimize for visual novelty at the expense of usability. If a feature looks impressive but makes delivery harder, remove it. The measure of a good decision is not whether it is interesting — it is whether it helps someone govern a national programme.

---

## Article 2 — Clarity Wins

Every screen should answer one question.

Every component should have one responsibility. Every action should have one outcome. Complexity should exist in the system — not in the interface.

When a screen becomes confusing, the solution is almost always to remove something, not add something.

---

## Article 3 — Objects Before Pages

Never think in screens. Think in objects.

```
Workspace
Portfolio
Priority Area
Project
Intervention
Activity
Milestone
Target
Budget
Report
```

Every screen is merely another **view of these objects**. The Intervention screen is not a page — it is the object rendered in its primary context. The Activity Table is not a feature — it is Activities rendered as a collection.

When designing anything, ask: which object does this represent, and what view of that object does the user need here?

---

## Article 4 — Typography Before Decoration

Hierarchy comes from typography. Not color. Not shadows. Not oversized cards.

If typography alone cannot organize a screen — if the user would be confused about what to read first without the help of a colored background or heavy shadow — then the typography is wrong. Fix the typography. Do not add decoration.

---

## Article 5 — Tables Are First-Class

The product is operational software. Users spend most of their time in tables.

Invest more engineering effort in the DataTable than in any dashboard. A perfect DataTable with filtering, grouping, inline editing, and virtualization is worth more than ten beautifully designed KPI dashboards.

---

## Article 6 — Preserve Context

Never navigate away if an Inspector, Drawer, or Inline Edit can accomplish the task.

Context switching is expensive. Each time a user navigates to a new page, they lose their visual position, their filter state, and their mental context. The product should preserve all three wherever possible.

Inspector first. Inline edit first. New page as a last resort.

---

## Article 7 — Components Are Primitives

Never build feature-specific UI. Always extend primitives.

```
One DataTable.
One Inspector.
One PageHeader.
One Toast.
One CommandPalette.

Many configurations.
```

If a new feature requires a component that doesn't exist, the first question is: can two existing components be composed to achieve this? If yes — compose. Only create a new component when composition is genuinely insufficient.

---

## Article 8 — Every Pixel Has Purpose

Nothing decorative.

```
✗ Random gradients
✗ Floating glass cards
✗ Oversized illustrations
✗ Animated blobs
✗ Gradient buttons
✗ Rounded-everything UI
```

Every visual element communicates information. If an element's removal would not reduce the user's understanding of the screen, it should be removed.

---

## Article 9 — Performance Is UX

If an interaction feels slow, it is poorly designed.

Performance targets are not engineering concerns — they are UX requirements:

| Interaction | Maximum Acceptable Time |
|-------------|------------------------|
| Page navigation | < 1 second |
| Table load (100 rows) | < 1.5 seconds |
| Search results | < 150ms |
| Command palette open | < 50ms |
| Inline edit save | Optimistic (instant visually) |
| Inspector open | < 200ms |

Missing these targets is a design failure, not just an engineering failure.

---

## Article 10 — Accessibility Is Non-Negotiable

Every interaction must support:

- **Keyboard** — fully operable without a mouse
- **Screen Reader** — meaningful ARIA roles and labels
- **Focus Management** — logical, visible focus order
- **Reduced Motion** — no essential animations for `prefers-reduced-motion`
- **High Contrast** — WCAG AA minimum (4.5:1 body text; 3:1 large text)

Accessibility is product quality. A screen that cannot be operated by keyboard has failed its quality bar.

---

## Article 11 — Collaboration Is Invisible

Do not create "collaboration features." **Embed collaboration into every object.**

```
Comments         — on every object
Mentions         — in every comment
Approvals        — on milestones, reports, budgets
History          — on every object, immutable
Presence         — who else is looking at this
Assignments      — who is responsible for this
```

Collaboration that requires navigating to a separate "collaboration screen" has already failed. The conversation about delivery should happen inside the delivery object.

---

## Article 12 — AI Must Not Invent

Claude should never invent layouts, components, patterns, colors, typography, or interactions that are not documented in the design system.

Reuse existing systems first.

If a documented pattern cannot solve the problem, the correct response is to document a new pattern and have it reviewed — not to generate ad-hoc UI and hope it fits.

---

## Article 13 — Simplicity Is Measured

Before completing any screen, ask:

- Can one section be removed?
- Can one click be removed?
- Can one component be reused?
- Can one action happen inline?

If yes to any — make the change. Simplicity is not a feeling. It is a measurable reduction in elements, clicks, and context switches.

---

## Article 14 — Long-Term Thinking

The product should still feel modern in five years.

Avoid trends. Prefer timeless decisions. A table-based, typography-led, whitespace-driven interface will look correct in 2030. A glassmorphism dashboard with animated blobs will look outdated in 2026.

Build for the decade, not the quarter.

---

## Article 15 — Final Rule

**When two solutions appear equally good, choose the simpler one.**

**When two simple solutions exist, choose the more reusable one.**

**When two reusable solutions exist, choose the one that preserves context.**

---

## Claude Implementation Workflow

Claude must never jump directly into building screens. Always follow this sequence:

```
1. Load all documentation
   ↓
2. Build design tokens
   ↓
3. Build Foundation primitives (Button, StatusChip, Avatar, Breadcrumb)
   ↓
4. Build layout components (PageHeader, Tabs, Inspector, Drawer)
   ↓
5. Build navigation (Sidebar, TopBar, CommandPalette)
   ↓
6. Build data components (DataTable, FilterBar, Timeline, Chart)
   ↓
7. Build object views (Intervention, Project, Activity)
   ↓
8. Build full screens (assemble from components)
   ↓
9. Review against this Constitution
   ↓
10. Refactor before moving to the next feature
```

**No feature should skip this workflow.** A shortcut in step 3 will cause rework in step 8.

---

## Design Review Gate

Before every major implementation, Claude must verify:

- [ ] Does this follow the Product Bible?
- [ ] Does it use existing interaction patterns?
- [ ] Does it use existing layout patterns?
- [ ] Does it use existing components?
- [ ] Does it preserve context?
- [ ] Does it prioritize typography over decoration?
- [ ] Does it reduce cognitive load?
- [ ] Would a senior Figma designer approve this?

If any answer is "no" — revise before implementation.

---

## The Final Principle

The Delivery Dashboard should never look like software generated in a single week.

It should look like software that has **evolved over years** through careful product thinking, user feedback, and disciplined iteration. Every screen should feel considered. Every pattern should feel tested. Every component should feel mature.

**The goal is not to build an attractive dashboard.**

**The goal is to build a calm, trustworthy operating system for government delivery.**
