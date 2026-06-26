# Interaction Model

## Philosophy

Every interaction should feel **immediate, clear, and reversible**.

Users should always know: what they just did, whether it worked, and how to undo it.

---

## Core Interaction Principles

### Optimistic Updates
Actions apply immediately in the interface. Background sync confirms with the server. If sync fails, the interface reverts and notifies the user.

Waiting for server confirmation before updating the UI is never acceptable.

### Inline Editing
Simple field changes happen inline. Users should not open a separate form to change an activity's status, owner, or due date.

| Pattern | When to Use |
|---------|------------|
| Click-to-edit | Single field changes |
| Dropdown in-place | Status, Priority, Owner |
| Date picker inline | Date fields |
| Inspector Panel | Multiple fields, complex objects |
| Full form | New object creation, complex configuration |

### Immediate Feedback
Every action receives immediate confirmation:
- Success: Toast notification (brief, non-blocking)
- Error: Contextual error (in the relevant field or section)
- Progress: Skeleton or spinner within the relevant element

Never navigate away to show a success message.

### Undo / Redo
Any non-destructive action is undoable within 30 seconds. A brief undo toast appears after significant changes.

```
"Activity moved to Completed" [Undo]
```

Destructive actions (archive, delete) require explicit confirmation before proceeding.

---

## Interaction Patterns

### Object Creation

**Quick Create:** Create via Command Palette or inline button. Minimum fields only. Object created immediately, full detail edited later.

**Full Create:** Drawer or dedicated page for complex objects. Preserves context.

### Object Detail

**Inspector Panel:** For activities, files, users — opens without navigation. Background remains visible.

**Full Page:** For Interventions, Projects, Priority Areas — complex objects requiring full attention.

### Status Changes

Drag-and-drop in Board view. Dropdown in table view. Both are equally valid; users choose their preference.

### Assignments

Type `@username` anywhere to assign. Works in: Comment fields, Activity descriptions, Quick actions, Command palette.

### Comments

Every object has a comment thread. Comments support: `@mentions`, file attachments, inline code, formatting.

### Hover States

Hover reveals: Quick actions, Additional detail, Copy buttons, Timestamps. Never permanently visible — surface on demand.

### Keyboard Navigation

The entire application is navigable via keyboard. See `keyboard.md` for full shortcut reference.

---

## Drag and Drop

Used in: Board view (status transitions), Timeline (date shifting), File upload, List reordering.

Drag handles appear on hover. Drag previews are immediate. Drop targets highlight on approach. Confirmation is instant.

---

## Loading Patterns

| Scenario | Pattern |
|---------|---------|
| Initial page load | Skeleton screens |
| Data refresh | Spinner in relevant section only |
| Background update | None (optimistic) |
| Search results | Instant with typeahead |
| Report generation | Progress indicator with status text |

---

## Error Recovery

Every error message:
1. Explains what went wrong (briefly)
2. Suggests a specific recovery action
3. Provides a way to retry

Error messages never say "An error occurred."

---

## Confirmation Patterns

| Action | Confirmation |
|--------|-------------|
| Archive object | Inline confirm button |
| Delete object | Modal dialog with object name |
| Remove team member | Inline confirm |
| Bulk archive | Modal with count |
| Irreversible changes | Explicit text entry confirmation |

---

## Touch and Mobile

- Minimum touch target: 44px × 44px
- Swipe right: Open inspector
- Swipe left: Quick actions (archive, assign)
- Long press: Select mode for bulk actions
- Pull to refresh: Sync latest data

---

## Interaction Reference

| Action | Method |
|--------|--------|
| Navigate | Sidebar, Breadcrumbs, ⌘K |
| Create | ⌘N or inline + button |
| Search | ⌘K or top bar |
| View detail | Click (opens inspector or page) |
| Quick edit | Click field (inline) |
| Complex edit | Open inspector, edit fields |
| Assign | @mention or dropdown |
| Comment | Type in thread |
| Archive | Action menu → Archive |
| Delete | Action menu → Delete (confirmation) |
| Bulk select | Checkbox → select multiple |
| Export | Action menu → Export |
