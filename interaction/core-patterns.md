# Core Interaction Patterns (01–30)

---

## Pattern 01 — Selection

**Philosophy:** Selection is temporary. Context is permanent.

| Interaction | Action |
|-------------|--------|
| Single Click | Select Object |
| Double Click | Primary Action |
| Shift + Click | Range Selection |
| ⌘ / Ctrl + Click | Multi Selection |
| Checkbox | Enter Bulk Mode |

Selection should always remain visible. Bulk actions appear **only after** selection. Never before.

---

## Pattern 02 — Hover

Hover exists to reduce clutter.

**Hover should reveal:**
- Quick Actions
- Metadata
- Preview
- Owner
- Last Updated

**Hover should never reveal required functionality.**

Touch devices do not have hover. Everything important must remain accessible without it.

---

## Pattern 03 — Opening Objects

**Default behavior:**
```
Click → Inspector Opens
```

Never navigate to a new page unless necessary. The Inspector preserves: Scroll Position, Filters, Selection, Search. Everything remains intact.

---

## Pattern 04 — Inspector

The Inspector is the product's primary editing surface.

| Mode | Width |
|------|-------|
| Default | 480px |
| Expanded | 720px |
| Fullscreen | Optional |

**Inspector Structure:**
```
Overview
Discussion
History
Files
Metadata
Settings
```

The Inspector never becomes a second page.

---

## Pattern 05 — Inline Editing

**Preferred editing order:**
```
Inline → Inspector → Drawer → Modal → Page
```

**Fields editable inline:**
- Status
- Owner
- Priority
- Tags
- Dates
- Titles

---

## Pattern 06 — Creation

Creating should never interrupt work.

| Object Size | Creation Pattern |
|-------------|----------------|
| Small | Inline |
| Medium | Drawer |
| Large | Wizard |

Avoid large blank forms. Create with minimum fields. Enrich afterward.

---

## Pattern 07 — Deletion

Deletion is permanent only when legally required. Otherwise:

```
Archive → Restore → Delete
```

Government software requires historical integrity. Hard deletion is an administrative operation, not a user action.

---

## Pattern 08 — Activity Feed

Every object owns its own feed.

**Feeds answer:** Who? What? When?

**Feeds never answer:** Why? — Discussions answer Why.

---

## Pattern 09 — Comments

Comments belong to objects. Never pages.

**Support:** Threads, Mentions, Attachments, Resolved, Links.

Comments should never become chat.

---

## Pattern 10 — Mentions

Typing `@` immediately searches: People, Teams, Roles.

**Mentioning creates:** Notification, Activity Feed entry, Email (optional).

---

## Pattern 11 — Status Changes

Status changes should be immediate.

```
Previous → Animation → New
```

Users should see the change. Never wonder whether it happened.

---

## Pattern 12 — Bulk Actions

Bulk actions appear **only after** selection.

**Supported actions:** Assign, Move, Archive, Export, Labels, Delete.

Bulk editing should preview impact before execution.

---

## Pattern 13 — Search

Search should be: instant, predictive, learning.

Every result includes: Object, Location, Status, Owner, Quick Action.

---

## Pattern 14 — Filtering

Filters remain persistent. Saved Filters supported. Filter Chips editable. Recent Filters remembered.

Never force users to rebuild filters.

---

## Pattern 15 — Sorting

Sorting is contextual. Sorts should persist.

**Common sorts:** Updated, Created, Priority, Owner, Due Date, Health, Alphabetical.

---

## Pattern 16 — Notifications

Notifications are **action requests**. Not news.

Every notification answers: What changed? Why? What should I do?

---

## Pattern 17 — Timeline

Timeline communicates **relationships**. Not just dates.

Users should understand: Dependencies, Critical Path, Blocked Work, Upcoming Delivery.

Timeline is a planning tool. Not a calendar.

---

## Pattern 18 — History

Every object owns its history. History is immutable.

Every event contains: Who, When, Previous Value, Current Value.

History should never require opening another page.

---

## Pattern 19 — Approval

Approval always follows the same model:

```
Submitted → Review → Approved
```

or:

```
Submitted → Returned → Resolved → Approved
```

Every approval records reasoning.

---

## Pattern 20 — Files

Files inherit context. Never upload to folders — upload to objects.

Preview first. Download second.

---

## Pattern 21 — Keyboard

Every interaction supports keyboard. Shortcuts become part of the product language.

| Shortcut | Action |
|---------|--------|
| ⌘K | Search / Command Palette |
| N | New Activity |
| E | Edit |
| Esc | Close |
| / | Focus Search |
| ? | Keyboard Shortcuts |

---

## Pattern 22 — Empty States

Every empty state teaches. Never apologizes.

Every empty state includes: Purpose, Next Action, Documentation link.

---

## Pattern 23 — Loading

**Prefer in order:**
```
Skeleton → Streaming → Optimistic UI
```

Avoid blocking spinners.

---

## Pattern 24 — Errors

Errors explain: What, Why, Recovery.

Never simply say: "Something went wrong."

---

## Pattern 25 — Context Menus

Right-click is first-class. Every object supports:

Open, Edit, Copy Link, Assign, Archive, History, Delete.

Menus adapt based on permissions.

---

## Pattern 26 — Responsive Behaviour

| Device | Layout |
|--------|--------|
| Desktop | Multi-panel |
| Tablet | Reduced panels |
| Mobile | Single task focus |

Never remove capability. Only change presentation.

---

## Pattern 27 — Collaboration

Presence, Typing, Comments, Assignments, Approvals, History.

Everything collaborative appears contextual. Never create a separate collaboration module.

---

## Pattern 28 — Motion

Motion explains: Opening, Sorting, Filtering, Saving.

Nothing else. Motion exists to communicate — not to impress.

---

## Pattern 29 — Accessibility

Every interaction supports: Keyboard, Screen Reader, Focus Management, Reduced Motion, High Contrast.

Accessibility is part of interaction architecture. Not an afterthought.

---

## Pattern 30 — Interaction Review Checklist

Before introducing a new interaction ask:

- [ ] Can this happen inline instead?
- [ ] Can context be preserved?
- [ ] Is navigation necessary?
- [ ] Does it behave like every other object?
- [ ] Is it reversible?
- [ ] Is it accessible?
- [ ] Is it discoverable without being noisy?
- [ ] Does it reduce cognitive load?
- [ ] Would this interaction feel natural inside Figma or Linear?
- [ ] Can the same pattern be reused elsewhere?
