# 34 — Inspector Panels

> One of the defining UX patterns of the Delivery Dashboard.

## Philosophy

Instead of navigating away, users remain **in context**.

Inspired by: Figma, Linear, Notion, GitHub

This pattern is fundamental to the product's "context over navigation" principle. Users should rarely need to leave their current view to get full detail.

---

## Opening an Inspector

```
Click any object (row, card, list item)
  ↓
Right panel slides in (200ms ease-out)
  ↓
Background remains visible and scrollable
  ↓
User reads, edits, and collaborates without losing context
```

---

## Inspector Width

| State | Width |
|-------|-------|
| Default | 480px |
| Expanded | 720px |
| Fullscreen | 100% (with escape) |

Users can toggle between states. Preference is remembered.

---

## Inspector Sections

Every inspector follows the same section order:

```
┌────────────────────────────────────────┐
│ Header: Title, Status, Owner, Actions  │
├────────────────────────────────────────┤
│ Summary / Description                  │
├────────────────────────────────────────┤
│ Key Metadata (dates, priority, etc.)   │
├────────────────────────────────────────┤
│ Relationships (linked objects)         │
├────────────────────────────────────────┤
│ Discussion / Comments                  │
├────────────────────────────────────────┤
│ Files / Evidence                       │
├────────────────────────────────────────┤
│ Activity History                       │
├────────────────────────────────────────┤
│ Settings / Advanced                    │
└────────────────────────────────────────┘
```

Panels scroll independently from the background content.

---

## Benefits

| Benefit | Description |
|---------|-------------|
| Reduced navigation | Users rarely need to go to a new page |
| Preserved context | Background remains visible |
| Faster editing | Edit without full page load |
| Better comparison | Compare items side by side |
| Lower cognitive load | Users stay oriented |

---

## Closing

| Method | Action |
|--------|--------|
| ESC | Close inspector |
| ✕ button | Close inspector |
| Click background | Close inspector |
| Back button (mobile) | Close inspector |

All methods must behave **consistently**.

---

## Multiple Inspectors

Users should be able to open a nested inspector (e.g., opening an Activity from within an Intervention inspector). Navigation between nested inspectors uses breadcrumbs within the panel.

---

## Mobile Behavior

On mobile, the inspector becomes a **bottom sheet** that slides up from the bottom of the screen, occupying 90% of the screen height.

---

## When NOT to Use an Inspector

Use a dedicated page when:
- The object is the primary destination (e.g., the Intervention workspace)
- The content requires full-width layout
- Multiple tabs of dense content need to be visible simultaneously
