# 33 — Interaction Model

## Philosophy

Interactions should feel **inevitable**. Users should predict what happens before clicking.

---

## Interaction Hierarchy

When multiple ways exist to edit or view something, prefer in this order:

```
1. Inline Editing          ← Always prefer for simple changes
2. Inspector Panel         ← For viewing + editing with context
3. Drawer Form             ← For multi-field forms
4. Modal                   ← Only for confirmations / destructive actions
5. Dedicated Page          ← Last resort
```

---

## Primary Interaction Pattern

```
Click object
  ↓
Inspector opens (right panel)
  ↓
Context preserved
  ↓
User works without losing their place
```

Avoid unnecessary page transitions.

---

## Editing

### Inline Editing
- Single click to select
- Double click to enter edit mode
- ESC to cancel
- Enter / Tab to confirm and advance

### Saving
- Automatic save on blur
- Display: `Saving...` → `Saved` → (nothing)
- On conflict: surface the conflict with resolution options

> Users should never manually save simple edits. Ctrl+S / ⌘+S can be a power-user shortcut but should not be required.

---

## Confirmation Dialogs

**Avoid confirmation dialogs.** Use **Undo** whenever possible.

Reserve confirmations for:
- Destructive actions (delete, archive)
- Irreversible operations
- High-impact changes (bulk delete 100+ items)

For everything else: act immediately, offer undo.

---

## Hover States

Hover should reveal:
- Secondary actions (edit, assign, archive)
- Metadata (created date, last updated)
- Quick preview of related objects

Hover should **never** reveal essential functionality that users can't discover otherwise.

---

## Selection

Multi-selection should feel natural across all table/list views:

| Method | Action |
|--------|--------|
| Click | Select single |
| Shift + Click | Select range |
| ⌘/Ctrl + Click | Toggle individual |
| Checkbox | Explicit selection |
| Drag | Range selection |

Every collection view should behave **consistently**.

---

## Context Menus

Right-click should expose:
- Open
- Assign
- Duplicate
- Archive
- Delete
- Copy Link
- History

Context menus reduce toolbar clutter and reward power users.

---

## Drag & Drop

Supported for:
- Activity reordering
- Board column movement
- File uploads
- Timeline adjustments

Always provide clear **visual feedback** during drag operations.

---

## Keyboard First

| Action | Shortcut |
|--------|---------|
| Command Palette | ⌘K / Ctrl+K |
| Search | ⌘/ or / |
| New item | C (contextual) |
| Select all | ⌘A |
| Move between items | ↑ ↓ |
| Open inspector | → or Enter |
| Close inspector | ← or ESC |
| Toggle selection | Space |
| Inline edit | E |
| Archive | ⌘⌫ |

---

## Toast Notifications

Toasts communicate success, errors, and undo opportunities:

```
┌─────────────────────────────────────────────────────┐
│ ✓  Activity status updated                   [Undo] │
└─────────────────────────────────────────────────────┘
```

- Position: Bottom-right
- Duration: 4 seconds (longer for errors)
- Always include Undo for reversible actions
- Never auto-dismiss errors

---

## Loading

| Scenario | Treatment |
|----------|-----------|
| Page load | Skeleton screen immediately |
| Data refresh | Subtle loading indicator, keep existing content |
| Slow operation | Progress indicator with cancellation |
| Background sync | Status bar indicator only |

Never show blank screens. Never show spinners for entire pages.
