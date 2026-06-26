# Multi-Panel, Density & Responsive Composition

## Multi-Panel Layouts

### The Correct Mental Model

```
Navigation  →  Workspace  →  Inspector
```

Not:

```
Navigation  →  Content  →  Modal  →  Another Modal
```

The difference between these two models is the difference between a product that feels calm and one that feels chaotic.

In the correct model: the workspace is persistent. The inspector slides in and out without replacing what the user was looking at. Everything has a place.

In the incorrect model: each action opens a new layer that obscures the previous one. Users lose context. Modals stack. The navigation structure breaks.

### Multi-Panel Composition Rules

**Left column — Navigation (fixed)**
```
Width:      240px (desktop)
Content:    Global navigation, workspace switcher, user profile
Collapse:   56px icon-only mode
Position:   Fixed; never scrolls
```

**Center column — Workspace (primary)**
```
Width:      Remaining space (or 70% when Inspector open)
Content:    The primary view (table, timeline, overview)
Scroll:     Independent vertical scroll
```

**Right column — Inspector (contextual)**
```
Width:      480px (default), 720px (expanded)
Trigger:    Row click in table or list
Behavior:   Center column shrinks; Inspector slides in
Close:      ESC, X button, or clicking outside
```

This three-column architecture applies at every level:
- Workspace home + Inspector
- Activity Table + Activity Inspector
- Intervention overview + Activity Inspector

### When to Open a Full Page

A full page is justified when:

1. The object is the primary destination (Intervention Detail, Project Detail)
2. The content is too complex for 480–720px (full report preview, full settings)
3. The user explicitly requests it ("Open full page" link in Inspector)

A full page is not justified when:
- The user just wants to view a single field
- The object is a list item being reviewed before action
- The content would require scrolling but not significantly more than an Inspector

---

## Density

### Density Changes Spacing. Never Typography.

Two density modes are supported. The content, font sizes, and visual hierarchy remain identical. Only the spacing changes.

| Mode | Row Height | Card Padding | Section Gap |
|------|-----------|-------------|------------|
| Comfortable (default) | 56px | 24px | 48px |
| Compact | 40px | 16px | 32px |

Comfortable mode is the default. Users switch to compact when working with large datasets and needing maximum information density.

**Typography never changes with density.** A 14px label remains 14px. Reducing font size to pack in more content destroys legibility and hierarchy. Use column management (hide/show columns) instead.

### Density Persistence

Density preference is:
- Stored per user account
- Applied across all tables
- Configurable in workspace preferences
- Overrideable per view in saved filters

---

## Mobile Composition

### Do Not Shrink Desktop. Recompose.

The mobile layout is not a compressed version of the desktop layout. It is a **recomposition** for a different context and different user needs.

Desktop users: managing programmes, planning work, analyzing data, generating reports.

Mobile users: updating a status, adding a comment, checking what's due today, approving a milestone.

**Mobile Information Priority:**

```
Today's work (My Activities, due now)
  ↓
Assigned to me (most urgent)
  ↓
Notifications (what requires action)
  ↓
Context (what does this belong to)
  ↓
History (what has happened)
```

Not: Portfolio → Priority Area → Project → Intervention → Activity. That hierarchy is for planning. Mobile is for execution.

**One primary action per screen.** The mobile screen cannot carry multiple competing CTAs. Each screen surfaces one clear action.

---

## Responsive Composition Rules

### Desktop — Three-Column Thinking

```
[Nav 240px] [Workspace fills remaining] [Inspector 480px when open]
```

Three simultaneous information layers. Users can see context, primary content, and detail at the same time.

### Tablet — Two-Column Thinking

```
[Nav 56px collapsed] [Workspace fills remaining]
```

Inspector opens full-width (not partial) over the workspace. Two layers: navigation + workspace.

### Mobile — Single-Column Thinking

```
[Workspace fills full width]
[Bottom tab bar for navigation]
```

One layer at a time. Navigation is deferred to a bottom bar or drawer.

**Content hierarchy remains identical across all breakpoints.** The Intervention title is still the most prominent element on the Intervention screen — on desktop, tablet, and mobile. The visual size changes; the hierarchy does not.

---

## Responsive Adaptation by Component

### Tables → Card Lists (Mobile)

A table on desktop becomes a card list on mobile. Each card shows the most important 3–4 fields from the table row.

```
Desktop table row:
[☐] Title                Status    Owner    Due Date    Priority
    Submit Planning App   Blocked   Ahmed    15 Sept     High

Mobile card:
┌─────────────────────────────────┐
│ Submit Planning Application     │
│ ● Blocked  ·  Ahmed  ·  15 Sep │
│                        [High ▶] │
└─────────────────────────────────┘
```

### Inspector → Full Screen (Mobile)

The Inspector takes the full screen on mobile. Background is hidden (not visible). Navigation between items uses swipe or back button.

### Drawers → Bottom Sheets (Mobile)

Right drawers become bottom sheets. Height: 80% of viewport, draggable to expand.

### Sidebar → Bottom Navigation (Mobile)

```
[🏠 Home]  [📋 Work]  [📊 Portfolio]  [🔔 Alerts]  [👤 Profile]
```

Maximum 5 items. Most used destinations only. Secondary destinations accessible via "More" or within screens.
