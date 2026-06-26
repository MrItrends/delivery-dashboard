# Inspector Panels

## Purpose

Inspector Panels allow users to view and edit object detail **without leaving their current context**.

This is one of the most important UX patterns in the application.

---

## Philosophy

Every time a user navigates away from a list to view a detail, they lose context. They must navigate back, re-apply filters, and find their place again.

Inspector Panels eliminate this problem. The list stays visible. The detail opens beside it.

Inspired by: Figma (property inspector), Linear (issue detail), GitHub (file panel).

---

## When to Use Inspector Panels

| Object | Pattern |
|--------|---------|
| Activity | Inspector Panel |
| File preview | Inspector Panel |
| User quick profile | Inspector Panel |
| Notification detail | Inspector Panel |
| Comment thread | Inspector Panel |
| Milestone (from list) | Inspector Panel |

| Object | Pattern |
|--------|---------|
| Intervention | Full Page |
| Project | Full Page |
| Priority Area | Full Page |
| Report | Full Page |

Inspector Panels are for objects that exist in the context of a list or table. Full Pages are for objects that are their own primary context.

---

## Panel Behavior

### Opening
Click object in list/table → Panel opens from right → Content area shrinks proportionally.

Never opens in a modal. Never navigates away. Never blocks the table.

### Closing
- Click X button
- Press ESC
- Click outside the panel
- Click another row (replaces current panel content)

### Animation
Enter: Slide in from right, 200ms, ease-out.
Exit: Slide out to right, 150ms, ease-in.

### Width
- Default: 40% of viewport
- Minimum: 400px
- Maximum: 600px
- User-resizable via drag handle

---

## Inspector Panel Anatomy

```
┌──────────────────────────────────────────────────┐
│ [Object Type Badge]                    [✕ Close] │
│ [Title]                                          │
│ [Status] [Priority] [Owner]                      │
├──────────────────────────────────────────────────┤
│ Tabs: Details | Comments | History | Files       │
├──────────────────────────────────────────────────┤
│                                                  │
│ Tab Content                                      │
│                                                  │
│ [Description]                                    │
│                                                  │
│ [Fields]                                         │
│   Owner: Ahmed Yusuf                             │
│   Due Date: 15 Sept 2024                         │
│   Intervention: Rural Broadband                  │
│   Priority: High                                 │
│   Tags: Q3, Infrastructure                       │
│                                                  │
│ [Checklist]                                      │
│ [Dependencies]                                   │
│                                                  │
├──────────────────────────────────────────────────┤
│ [Open Full Page ↗]                               │
└──────────────────────────────────────────────────┘
```

---

## Activity Inspector — Full Spec

### Details Tab
- Title (inline editable)
- Status (dropdown)
- Priority (dropdown)
- Owner (user selector with avatar)
- Contributors (multi-user selector)
- Due Date (date picker)
- Intervention (linked reference)
- Milestone (linked reference)
- Description (rich text)
- Checklist (expandable)
- Dependencies (linked list)

### Comments Tab
- Chronological thread
- @mention support
- File attachments
- Reply and resolve

### History Tab
- Immutable audit log
- Every change attributed, timestamped

### Files Tab
- All attached files
- Upload new files inline

### Footer
- "Open Full Activity Page" link
- Quick actions: Archive, Copy Link, Change Status

---

## Multiple Selection

When multiple objects are selected in a list:
- Panel shows a summary: "3 Activities Selected"
- Available bulk actions shown: Assign, Move, Archive, Change Status, Change Due Date
- No detail view for individual items in bulk mode

---

## Keyboard Interaction

| Key | Action |
|-----|--------|
| ESC | Close panel |
| ↑ / ↓ | Navigate between rows (updates panel) |
| Tab | Cycle through panel fields |
| ⌘E | Focus edit mode |
| ⌘↵ | Save and close |

---

## Claude Implementation Notes

The Inspector Panel is one of the signature interactions of this product. It should feel **as natural and fast as the Figma property inspector** — responsive, immediately editable, keyboard-native.

Never require a page navigation for an activity. The inspector should satisfy 90% of use cases. Full page is the escape hatch.
