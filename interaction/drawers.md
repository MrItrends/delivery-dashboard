# Pattern 36 — Drawers

## Philosophy

Drawers are **temporary workspaces**. Unlike pages, they preserve context. Unlike modals, they do not block the rest of the interface.

---

## When to Use a Drawer

| Use Case | Pattern |
|---------|---------|
| Creating a medium-complexity object | Right Drawer |
| Editing multiple fields of an existing object | Inspector (preferred) or Drawer |
| Multi-step configuration | Multi-step Drawer |
| Mobile detail view | Bottom Drawer |

**Drawers are never used for:** Confirmation dialogs (use inline confirm), Simple single-field edits (use inline), Read-only detail (use Inspector).

---

## Drawer Types

### Right Drawer
Opens from the right edge of the viewport. Width: 480–640px. The background page remains visible and dimly accessible.

### Bottom Drawer (Mobile)
Opens from the bottom on mobile. Height: 50–80% of viewport. Draggable to expand or dismiss.

### Multi-step Drawer
Right drawer with a step indicator at the top. Used for wizard-style creation flows (e.g., creating an Intervention with its initial milestones and team).

---

## Behavior Model

```
Open → Edit → Save automatically → Close → Return to previous context
```

Changes save continuously or on explicit Save. Closing without saving prompts only if unsaved changes exist.

**Nested drawers are prohibited.** If a drawer needs to open another drawer, redesign the flow.

---

## Opening Animations

Enter: Slide from right (or bottom), 250ms, `--easing-enter`.
Exit: Slide back, 200ms, `--easing-exit`.

Background: Dims to `rgba(0,0,0,0.4)` overlay.

---

## Drawer Anatomy

```
┌──────────────────────────────────────────────────┐
│ [Title]                              [✕ Close]   │
│ [Subtitle / Context]                             │
├──────────────────────────────────────────────────┤
│                                                  │
│ Drawer Content                                   │
│                                                  │
│ (Scrollable independently)                       │
│                                                  │
├──────────────────────────────────────────────────┤
│ [Cancel]                         [Save / Submit] │
└──────────────────────────────────────────────────┘
```

---

## Multi-Step Drawer

```
┌──────────────────────────────────────────────────┐
│ Create Intervention          Step 2 of 4  [✕]    │
│ ● ●●○○  Ownership                                │
├──────────────────────────────────────────────────┤
│                                                  │
│ Step content                                     │
│                                                  │
├──────────────────────────────────────────────────┤
│ [← Back]                           [Next →]      │
└──────────────────────────────────────────────────┘
```

Step indicator shows: current step, total steps, step name.

Users can navigate backward freely. Navigating forward validates the current step.

---

## Keyboard Behavior

| Key | Action |
|-----|--------|
| Esc | Close (with unsaved-changes check) |
| Tab | Cycle through fields |
| ⌘↵ | Submit / Save |
| ⌘[ | Previous step (multi-step) |
| ⌘] | Next step (multi-step) |

Focus is trapped within the drawer while it is open. Closing the drawer returns focus to the element that triggered it.

---

## Unsaved Changes

If the user tries to close a drawer with unsaved changes:

```
Discard changes?
You have unsaved changes in this form.

[Keep Editing]   [Discard Changes]
```

Auto-save drawers never show this prompt.
