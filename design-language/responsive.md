# Responsive Design

## The Priority Order

**Desktop is primary. Tablet preserves workflow. Mobile prioritizes task completion.**

The Delivery Dashboard is built for people who spend hours inside it. Their primary environment is a desktop or laptop. The responsive strategy reflects this — without abandoning other devices.

---

## The Core Principle

**Never remove capabilities. Only reorganize them.**

A programme manager who manages an intervention from their desktop on Monday must be able to update an activity from their phone on Tuesday evening. The mobile experience is narrowed — not disabled.

---

## Breakpoints

| Name | Width | Layout |
|------|-------|--------|
| Mobile | < 640px | Single column, bottom navigation |
| Tablet | 640–1024px | Collapsed sidebar, single-panel |
| Desktop | 1024–1440px | Full layout, multi-panel |
| Wide | > 1440px | Full layout, max-width content |

---

## Desktop (Primary)

The full product experience. All panels, all columns, all views.

**Layout:**
```
┌──────────────────────────────────────────────────────┐
│ Top Bar: Logo, Workspace, Search, Notifications       │
├──────────┬───────────────────────────────────────────┤
│          │                                           │
│  Left    │  Content Area                             │
│  Nav     │  (with optional Inspector Panel)          │
│  240px   │                                           │
│          │                                           │
└──────────┴───────────────────────────────────────────┘
```

Desktop supports: Multi-panel layouts, Inspector panels, Timeline views, Full tables with many columns, Keyboard shortcuts.

---

## Tablet (640–1024px)

Workflow preserved. Layout simplified.

**Changes from Desktop:**
- Sidebar collapses to icon-only (56px) by default
- Inspector panel takes full width instead of partial
- Timeline view available but simplified
- Table reduces to essential columns (Title, Status, Owner, Due)
- Multi-select bulk actions remain available

**What stays the same:**
- Navigation destinations
- All creation and editing flows
- Filters and sorting
- Keyboard shortcuts
- All data

---

## Mobile (< 640px)

Task-completion focused. Built for moments of decision, not hours of work.

**Mobile layout:**
```
┌────────────────────────────┐
│ [← Back]   Title    [...] │
│─────────────────────────────
│                            │
│  Primary Content           │
│                            │
│─────────────────────────────
│ [🏠] [📋] [📊] [🔔] [👤]  │
└────────────────────────────┘
```

Bottom navigation replaces the left sidebar.

**Mobile views:**
- My Activities (default home)
- Activity list (simplified table → card list)
- Activity detail (full, via inspector or own screen)
- Notifications
- Quick create

**Mobile actions available:**
- View activities
- Update status
- Add comment
- Upload file (from camera or storage)
- Mark complete
- View intervention summary
- View notifications

**Mobile actions deferred to desktop:**
- Report generation
- Timeline management
- Budget configuration
- Permission management
- Complex filtering
- Multi-panel views

---

## Adaptive Decisions by Component

### Navigation
- Desktop: Fixed left sidebar (240px)
- Tablet: Collapsible sidebar (icon-only at 56px)
- Mobile: Bottom tab bar (5 items max)

### Tables
- Desktop: Full columns, inline editing, inspector panel
- Tablet: 4–5 columns, inspector takes full width
- Mobile: Card list view (stacked layout per row)

### Inspector Panel
- Desktop: Slides in from right, content area shrinks
- Tablet: Full-width overlay
- Mobile: Full-screen view

### Drawers
- Desktop: Right drawer (480px)
- Tablet: Right drawer (full width)
- Mobile: Bottom sheet (80% viewport height, draggable)

### Command Palette
- Desktop: Centered overlay (640px max)
- Tablet: Centered overlay (full width)
- Mobile: Full-screen search

### Timeline
- Desktop: Full Gantt-style timeline
- Tablet: Simplified, fewer visible columns
- Mobile: List view with dates only (visual timeline deferred)

---

## Touch Interactions (Mobile + Tablet)

| Gesture | Action |
|---------|--------|
| Tap | Select / Open |
| Long press | Enter selection mode |
| Swipe left | Quick actions (Archive, Assign) |
| Swipe right | Open detail / Inspector |
| Pull to refresh | Sync latest data |
| Pinch | Zoom timeline (tablet only) |

---

## The Responsive Test

A screen passes when:

1. All data visible on desktop is accessible on mobile (even if differently presented)
2. All creation and editing actions are completable on mobile
3. No functionality requires a mouse (only touch or keyboard)
4. Layout shifts gracefully without breaking at any breakpoint
5. A user can start work on mobile and continue on desktop without loss of context
