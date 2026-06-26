# 08 — Navigation System

## Navigation Philosophy

Navigation should **disappear**. Users should stop thinking about navigation after the first day.

The interface should always make the next action obvious.

---

## Primary Navigation

Located on the left. Persistent. Minimal. Always visible.

Contains only major destinations:

```
Workspace

Portfolio

Performance

Reports

Calendar

──────────

Team

Notifications

Settings
```

Notice what is missing: No icons beside every item. No coloured indicators. No decorative elements.

**Typography and spacing carry the hierarchy.**

---

## Secondary Navigation

Appears inside a selected object. Changes with context.

**Example — Project:**
```
Overview
Activities
Milestones
Budget
KPIs
Files
Team
History
Settings
```

---

## Breadcrumbs

Every page displays its position:

```
Workspace / Portfolio / Healthcare / National Hospital Upgrade / Activities
```

Breadcrumbs are interactive. Each level is clickable.

---

## Command Palette

The Command Palette is a **first-class navigation tool**.

Inspired by: Linear, Raycast, Figma

Users can:
- Open projects
- Create activities
- Invite users
- Search anything
- Jump to reports
- Navigate without touching the sidebar

**Keyboard shortcut:** `⌘K` / `Ctrl+K`

---

## Universal Search

Search returns:
- Projects
- Activities
- Users
- Reports
- Comments
- Files
- Budgets
- Milestones
- Interventions

Results appear instantly.

---

## Right Inspector

Instead of navigating away, details open inside an inspector panel.

```
Click Activity
  ↓
Right Panel Opens
  ↓
Context preserved
```

---

## Navigation Behaviour

Navigation remembers:
- Last workspace
- Recent projects
- Recent reports
- Pinned objects
- Saved filters
- Recent searches

The interface adapts to the user's workflow.

---

## Mobile Navigation

The mobile experience prioritises:
- Today's work
- Assigned activities
- Notifications
- Quick updates
- Search

The full desktop hierarchy remains available through drawers and bottom sheets.

---

## Navigation Design Principles

Navigation should never compete with content. It should guide. Not distract.

The user should always know:
1. Where am I?
2. What am I looking at?
3. What can I do next?
4. How do I get back?

If these four questions can be answered without hesitation, the navigation system has succeeded.
