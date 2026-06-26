# Implementation Sprint Plan

> Don't ask Claude to design the whole app at once. That produces generic AI output.
> Treat Claude as a junior product designer given precise, scoped assignments.

---

## The Approach

Build the **language** before the **sentences**. Build the **sentences** before the **pages**.

```
Design tokens → Primitives → Layouts → Navigation → Components → Screens
```

---

## Sprint 1 — The Foundation

**Goal:** Everything that makes every screen possible. No product screens yet.

### App Shell & Navigation

- [ ] App shell layout — sidebar (240px), top bar (56px), content area
- [ ] Sidebar navigation — workspace switcher, object hierarchy links, collapse to 56px
- [ ] Top navigation bar — breadcrumb, search trigger, notifications bell, user avatar
- [ ] Sidebar active state and keyboard navigation
- [ ] Responsive breakpoints — desktop, tablet, mobile shell

### Command Palette

- [ ] ⌘K opens command palette
- [ ] Instant open (< 50ms — pre-rendered)
- [ ] Navigation commands (G H, G P, etc.)
- [ ] Search within palette
- [ ] Keyboard navigation (arrows, Enter, Esc)

### Page Header

- [ ] Breadcrumb component
- [ ] H1 title
- [ ] Status chip slot
- [ ] Primary action slot
- [ ] Secondary actions (··· overflow)
- [ ] All variants (Workspace, Collection, Object, Settings)

### Data Table

- [ ] Column headers with sort
- [ ] Row render with all standard columns
- [ ] Hover state and quick actions
- [ ] Single click → Inspector trigger
- [ ] Double click → inline title edit
- [ ] Checkbox multi-select
- [ ] Bulk action bar (appears on selection)
- [ ] Virtual rendering (TanStack Virtual, rows 51+)
- [ ] Loading state (skeleton rows)
- [ ] Empty state

### Inspector

- [ ] 480px slide-in from right (250ms)
- [ ] Background page shifts left
- [ ] Standard 4-tab anatomy (Overview, Discussion, History, Files)
- [ ] ESC to close
- [ ] Focus return to triggering row
- [ ] Expand to 720px toggle
- [ ] Loading state (skeleton)

### Drawer

- [ ] Right drawer (480px, slide from right)
- [ ] Overlay behind drawer
- [ ] Auto-save pattern
- [ ] Unsaved changes warning
- [ ] ESC to close

### Design Tokens

- [ ] All color tokens (Neutral, Brand, Semantic, Status)
- [ ] All spacing tokens (space-1 through space-24)
- [ ] All typography tokens (size, weight, line height, letter spacing)
- [ ] All shadow tokens (elevation 0–5)
- [ ] All radius tokens
- [ ] All motion tokens (duration, easing)
- [ ] All z-index tokens

### Typography

- [ ] PP Neue Montreal loaded and applied
- [ ] Full type scale applied as CSS variables
- [ ] Heading hierarchy (H1–H4)
- [ ] Body, label, caption, code styles

### Primitives

- [ ] Button (Primary, Secondary, Ghost, Text, Danger — all sizes, all states)
- [ ] Status Chip (all states, with and without icon)
- [ ] Toast (Success, Warning, Error, Info — with auto-dismiss)
- [ ] Avatar (photo, initials fallback, all sizes)
- [ ] Avatar Stack (up to 5 + overflow)
- [ ] Tabs (Primary variant, all states, overflow menu)

**Sprint 1 Completion Criteria:** A skeleton app with navigation, command palette, data table, inspector, and all primitives. No product data. Every component follows design tokens.

---

## Sprint 2 — The Five Core Screens

**Goal:** Establish 80% of the visual language for the entire product. Every remaining screen becomes a variation.

### 1. Workspace Home

- [ ] Workspace header with health indicator
- [ ] My Work section — activity table (today, overdue, upcoming)
- [ ] Recent Activity feed (right column)
- [ ] Approvals section (inline approval actions)
- [ ] Upcoming Deadlines
- [ ] Pinned Objects
- [ ] Loading state (section-by-section skeletons)
- [ ] Empty state (new workspace onboarding)

### 2. Portfolio

- [ ] Executive Summary (auto-generated text area)
- [ ] Portfolio health summary bar
- [ ] Priority Area table (health, owner, budget, milestones)
- [ ] Programme Timeline (6-month view, milestone markers)
- [ ] Strategic Risks (right panel)
- [ ] Budget Overview (right panel)

### 3. Project

- [ ] Executive Summary with data-linked fields
- [ ] Intervention table (health, owner, budget, milestones)
- [ ] Programme Timeline
- [ ] Budget section
- [ ] Risks panel
- [ ] Recent Decisions list

### 4. Intervention (Primary Screen)

- [ ] All tabs: Overview, Activities, Milestones, Timeline, Budget, Targets, Discussion, Files, Team, History
- [ ] Overview tab: summary cards, activity feed, team
- [ ] Activities tab: full Data Table with all features
- [ ] Discussion tab: Comment Thread
- [ ] Files tab: File List + File Preview Inspector
- [ ] Milestones tab: Milestone timeline
- [ ] Budget tab: Budget summary + approval history

### 5. Activity Table (My Work / Standalone)

- [ ] Full-featured Data Table
- [ ] Filter Bar with saved views
- [ ] Activity Inspector (all tabs)
- [ ] Bulk actions
- [ ] Density toggle (Comfortable / Compact)
- [ ] Keyboard navigation throughout

**Sprint 2 Completion Criteria:** Five screens that look exceptional. A designer reviewing these screens could derive the visual grammar for every other screen in the product without additional documentation.

---

## Sprint 3 — Remaining Product Screens

**Goal:** Complete all product screens using components established in Sprint 2.

- [ ] Milestones screen (timeline + evidence + approvals)
- [ ] Targets & KPIs screen (trend charts + evidence)
- [ ] Budget screen (funding summary + allocation + approval history)
- [ ] Reports screen (report viewer + approval flow + export)
- [ ] Calendar screen (multi-view calendar + event types)
- [ ] Search screen (results grouped by type + filters)
- [ ] Notifications screen (grouped notifications + action inline)
- [ ] Files screen (file list + preview + versioning)
- [ ] Team screen (directory + assignments + capacity)
- [ ] Settings screens (workspace + users + permissions + integrations)

---

## Sprint 4 — Polish & Completeness

**Goal:** Every edge case, every state, every pixel correct.

### Empty States

- [ ] Every table / section has a meaningful empty state
- [ ] Every empty state teaches, not just informs
- [ ] New workspace onboarding flow

### Loading States

- [ ] Every section has a skeleton loading state
- [ ] Sections load progressively (primary first, supporting panels second)
- [ ] Optimistic updates on all write operations

### Motion

- [ ] Inspector slide animation (250ms)
- [ ] Drawer animation (250ms)
- [ ] Toast entrance/exit
- [ ] Status chip change animation (subtle)
- [ ] Skeleton shimmer
- [ ] Reduced motion CSS (`prefers-reduced-motion`) applied to all animations

### Accessibility

- [ ] Full keyboard navigation on every screen
- [ ] ARIA roles and landmarks applied
- [ ] Screen reader testing on primary workflows
- [ ] Focus management (Inspector open/close, Modal open/close)
- [ ] Color contrast audit (WCAG AA)
- [ ] Reduced motion audit

### Responsive

- [ ] Desktop: full three-column layout
- [ ] Tablet: collapsed sidebar, full-width inspector
- [ ] Mobile: recomposed views, bottom navigation, bottom sheets

### Error States

- [ ] Every data-loading section has an error state with retry
- [ ] Network offline banner
- [ ] Form validation error handling
- [ ] API error toasts

---

## Quality Gate Before Shipping

Before any sprint's work is considered complete:

1. **Constitution Review** — every screen reviewed against the 15 Articles
2. **Design Review Gate** — all 8 design review questions answered "yes"
3. **Screen Quality Checklist** — all 24 checklist items verified
4. **Component Review Checklist** — any new component reviewed against all criteria
5. **Accessibility Audit** — keyboard navigation and screen reader tested
6. **Performance Check** — load times measured against targets
