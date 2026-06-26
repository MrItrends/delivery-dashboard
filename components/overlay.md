# Overlay Components

## 12 — Inspector

### Purpose

The primary editing experience for most objects. Everything that is not a primary destination page opens here. The Inspector preserves the context of whatever the user was looking at before they opened it.

### Dimensions

| State | Width | When |
|-------|-------|------|
| Default | 480px | Standard; table shifts left |
| Expanded | 720px | User-toggled for complex objects |
| Fullscreen | 100% | Optional; user-triggered |

### Standard Anatomy

```
┌──────────────────────────────────────────────────────┐
│ [Activity]                             [↗] [✕]       │  ← Header
│ Draft curriculum materials — Key Stage 2             │  ← Title
│ ● Active  ·  High Priority  ·  Ahmed Yusuf           │  ← Status + Meta
├──────────────────────────────────────────────────────┤
│ [Overview] [Discussion] [History] [Files] [More ▾]  │  ← Tabs (fixed order)
├──────────────────────────────────────────────────────┤
│                                                      │
│  [Tab content — independently scrollable]            │
│                                                      │
├──────────────────────────────────────────────────────┤
│ [Open full page ↗]               [Action Button]    │  ← Footer
└──────────────────────────────────────────────────────┘
```

### Standard Inspector Tabs (Always in This Order)

```
1. Overview    — Summary, key fields, description, relationships
2. Discussion  — Comment thread
3. History     — Immutable audit log
4. Files       — Attached documents and evidence
```

Additional tabs for specific object types come after these four. Example for Activity:

```
1. Overview  2. Discussion  3. History  4. Files  5. Checklist  6. Dependencies
```

Settings and administration tabs always appear last.

### Behavior

- **Slide in from the right** at 250ms ease-out
- **Background page shifts left** to remain visible (does not go behind Inspector)
- **Independent scroll** — Inspector scrolls independently from the page behind it
- **ESC to close**; focus returns to the row that triggered the Inspector
- **⌘[ / ⌘]** to navigate between Inspectors without closing (previous/next item in list)

### States

| State | Behavior |
|-------|---------|
| Collapsed | Not visible; page occupies full workspace |
| Default (480px) | Page shrinks to ~70% width |
| Expanded (720px) | Page shrinks to ~50% width |
| Read-only | All fields visible but not editable; no action buttons |
| Loading | Skeleton for header and tabs; content streams in |

### When to Use Inspector

| Use Inspector For | Use Full Page For |
|-----------------|-----------------|
| Activity detail | Intervention detail |
| File preview | Project detail |
| User profile | Priority Area detail |
| Notification detail | Report preview |
| Comment context | Settings |
| Milestone quick view | Anything requiring >4 tabs |

### Anti-Patterns

```
✗ Replacing Inspector with a new full page for list items
✗ Inspector wider than 720px (becomes a page at that point)
✗ More than 8 tabs in an Inspector (redesign as a page)
✗ Inspector that requires its own breadcrumb navigation
✗ Auto-opening Inspector without user intent (row click must be deliberate)
```

---

## 13 — Drawer

### Purpose

Create, edit, and review without leaving context. Drawers are temporary workspaces that overlay the current page without replacing it.

### Variants

| Variant | When Used |
|---------|----------|
| Create | Creating new objects (New Activity, New Milestone) |
| Edit | Editing settings or configuration that doesn't suit inline editing |
| Wizard | Multi-step creation for complex objects (New Intervention — 4 steps) |
| Review | Reviewing content that requires dedicated focus (Report review) |

### Dimensions

```
Width:      480–640px (right drawer)
Height:     Full viewport height (right drawer)
            50–80% viewport (bottom drawer, mobile)
Animation:  250ms ease-out slide from right
Overlay:    rgba(0, 0, 0, 0.4) behind drawer
```

### Rules

- **Maximum one drawer open at a time** — never nested drawers
- **Auto-save where appropriate** — form progress should not be lost if drawer is accidentally closed
- **Unsaved changes warning** — if user has unsaved changes and tries to close, confirm before dismissing
- **ESC closes** — with unsaved changes confirmation

### Drawer vs. Inspector Comparison

| Question | Inspector | Drawer |
|---------|-----------|--------|
| What does it do? | View and edit existing object detail | Create or configure |
| Triggered by? | Clicking an item in a list | Clicking a Create/Edit button |
| How does it close? | ESC, X, or clicking outside | ESC, X, or Save |
| Is the background visible? | Yes (page shifts) | Yes (dimmed overlay) |
| Does it auto-save? | Changes save on blur/exit | Save button required (or auto-save in Wizard) |

---

## 14 — Modal

### Purpose

Interrupt the user's flow when a decision is required before proceeding. Modals should be rare.

### Reserved Uses Only

```
✓ Confirmation of irreversible actions (Archive, Delete)
✓ Authentication (login, MFA, session expired)
✓ Sharing or permission-granting flows
✓ Export configuration
✓ Short confirmations that require one decision
```

### Never Used For

```
✗ Large editing forms (use a Drawer)
✗ Content viewing (use an Inspector)
✗ Notifications or alerts that don't require a decision
✗ Feature promotion or onboarding
```

### Sizes

| Size | Width | When |
|------|-------|------|
| Small | 400px | Confirmation dialogs |
| Medium | 560px | Short forms, export config |

Modals never exceed 560px. Anything larger is a Drawer.

### Behavior

- **ESC to cancel** (always)
- **Click outside to cancel** (unless data would be lost)
- **Focus trap** — keyboard focus stays inside modal until closed
- **Background is non-interactive** (overlay)
- **One primary action** inside the modal

---

## 15 — Toast

### Purpose

Provide immediate, non-blocking feedback about an action that just completed. Toasts are informational — they do not require a response.

### Duration

```
Success:  3 seconds auto-dismiss
Warning:  5 seconds auto-dismiss
Error:    8 seconds; user must dismiss (or it auto-dismisses, but slower)
Info:     4 seconds auto-dismiss
```

### Types

| Type | When | Color |
|------|------|-------|
| Success | Action completed (saved, approved, created) | Green |
| Warning | Action completed with caveats | Amber |
| Error | Action failed with recovery path | Red |
| Info | Neutral status update | Neutral |

### Position

Bottom-left corner. Stacks up (newest above). Maximum 3 visible at once.

### Rules

- Toast messages are **action confirmations**, not critical error handling
- Never use Toast for errors that require user action (use inline error or modal)
- The message should be under 8 words: "Activity saved", "Report generated", "Approval sent"

### Anti-Patterns

```
✗ Toasts for critical system errors
✗ Toasts longer than one sentence
✗ Toasts that auto-dismiss before users can read them (<2 seconds)
✗ More than 3 toasts stacked simultaneously
```

---

## 16 — Context Menu

### Purpose

Provide fast access to contextual actions on any object via right-click. Context menus are a first-class interaction — not an afterthought.

### Standard Items

```
Open
───────────────
Edit
Assign
Change Status
Duplicate
───────────────
View History
───────────────
Archive
Delete (Admin only)
```

### Rules

- All items are **adapted based on permissions** — a Contributor sees only items they can act on
- **Destructive items** (Archive, Delete) are at the bottom, separated by a divider
- **Delete** only appears for admins; all other users see Archive
- Context menu closes on: item selection, Esc, click outside, any scroll
