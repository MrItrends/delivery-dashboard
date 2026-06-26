# Pattern 35 — Drag & Drop

## Purpose

Dragging should **accelerate work**. Not create uncertainty.

Every drag operation must provide enough feedback that the user always knows what will happen before they release.

---

## Supported Drag Objects

| Object | Where Supported |
|--------|----------------|
| Activities | Board view (status), Timeline (dates), Lists (ordering) |
| Files | Upload zones, object attachment areas |
| Timeline Items | Milestone and activity date adjustment |
| Board Cards | Status column transitions |
| Priority Ordering | Custom sort in lists |
| Attachments | Into comment fields or file areas |

---

## Drag Feedback Model

Every drag provides four types of feedback:

| Feedback | Description |
|---------|-------------|
| Ghost Preview | A visual copy follows the cursor |
| Valid Drop Targets | Eligible zones highlight as the object approaches |
| Invalid Target Feedback | Non-eligible zones show a blocked indicator |
| Auto-Scroll | The view scrolls automatically when dragging near an edge |

---

## Ghost Preview

The ghost should be:
- Identical in appearance to the original (at ~80% opacity)
- Positioned under the cursor at the drag handle point
- Never more than one object at a time (even in bulk select)

In bulk select, ghost shows: "Moving 5 activities" with a stack effect.

---

## Drop Target Highlighting

When a dragged object approaches a valid drop target:
- Target background shifts to `--color-surface-selected`
- Border becomes `--color-border-focus`
- Subtle scale increase (1.02) to indicate readiness

When over an invalid target:
- Cursor changes to `not-allowed`
- No target highlight

---

## Auto-Scroll

When dragging near a scroll boundary (within 48px of edge):
- Scroll begins automatically
- Speed increases proportionally to proximity
- Scroll stops immediately on release

---

## Undo After Drop

Every successful drop is undoable for 30 seconds:

```
"Activity moved to Blocked"   [Undo]
```

The undo toast appears immediately after drop. Dismissing it confirms the action.

---

## When NOT to Use Drag

Never use drag for:

| Action | Correct Pattern |
|--------|----------------|
| Financial approvals | Explicit approval form |
| Permission changes | Settings page with confirmation |
| Critical workflow transitions | Status dropdown with confirmation |
| Bulk assignment | Bulk action bar |

These require deliberate, confirmable interaction — not an accidental release.

---

## Touch / Mobile

On touch devices:
- **Long press** (500ms) initiates drag
- **Haptic feedback** on drag start (where supported)
- **Larger drop targets** (minimum 56px)
- **Auto-scroll** works identically

Drag is never the only way to perform an action on mobile.

---

## Accessibility

Drag and drop is always paired with an equivalent keyboard or menu action.

Users who cannot use drag can: right-click → Move, use the action menu → Move, use the bulk action bar.

Screen readers announce: drag start, current position, valid/invalid targets, successful drop.
