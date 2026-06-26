# Empty States

## Philosophy

An empty state is not a failure state. It is a **beginning state**.

The best empty states guide users toward meaningful action. The worst empty states abandon users in front of a blank screen.

---

## Empty State Types

| Type | When | Response |
|------|------|---------|
| First Use | User has no objects yet | Onboarding guidance |
| No Results | Filter returns nothing | Refine or clear filters |
| No Search Results | Search found nothing | Suggest alternatives |
| No Notifications | Inbox is clear | Positive confirmation |
| Archived | Section contains only archived | Navigation to active |
| Permission | No access | Explain and provide path to request |
| Error | Data failed to load | Retry mechanism |

---

## First Use Empty States

### Portfolio Empty State
```
┌──────────────────────────────────────────────────┐
│                                                  │
│      [Illustration: Compass or Strategy]         │
│                                                  │
│      No Priority Areas yet                       │
│                                                  │
│      Priority Areas define the strategic         │
│      objectives your portfolio is delivering     │
│      toward.                                     │
│                                                  │
│      [Create First Priority Area]                │
│                                                  │
│      [Learn how Priority Areas work →]           │
│                                                  │
└──────────────────────────────────────────────────┘
```

### Activity Tracker Empty State
```
┌──────────────────────────────────────────────────┐
│                                                  │
│      [Illustration: Task or Work]                │
│                                                  │
│      No activities assigned to you               │
│                                                  │
│      Activities are how delivery happens.        │
│      Once assigned, they'll appear here.         │
│                                                  │
│      [View All Activities]                       │
│      [Create Activity]                           │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

## No Results Empty State

### After Filtering
```
┌──────────────────────────────────────────────────┐
│                                                  │
│      No activities match your filters            │
│                                                  │
│      Current filters: Status: Blocked,           │
│      Owner: Ahmed Yusuf                          │
│                                                  │
│      [Clear Filters]   [Modify Filters]          │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

## No Search Results
```
┌──────────────────────────────────────────────────┐
│                                                  │
│      No results for "broadband expansion"        │
│                                                  │
│      Try:                                        │
│      • Check spelling                            │
│      • Use fewer words                           │
│      • Search all workspaces                     │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

## Clear Inbox / No Notifications
```
┌──────────────────────────────────────────────────┐
│                                                  │
│      ✓  You're all caught up                     │
│                                                  │
│      No new notifications                        │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

## Permission Empty State
```
┌──────────────────────────────────────────────────┐
│                                                  │
│      You don't have access to this               │
│                                                  │
│      This Intervention is restricted to          │
│      Healthcare Programme team members.          │
│                                                  │
│      [Request Access]                            │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

## Empty State Design Rules

| Rule | Rationale |
|------|-----------|
| Always include an action | Tell users what to do next |
| Never blame the user | "No results" not "You haven't created anything" |
| Keep illustrations minimal | Functional, not decorative |
| Match the context | Portfolio empty ≠ Calendar empty |
| One primary CTA maximum | Don't overwhelm with options |
| Offer explanation | Users should understand why it's empty |

---

## Illustration Style

Empty state illustrations should be:
- Line-based or lightly filled
- Monochromatic or two-color maximum
- Thematically relevant
- Small (no larger than 160px)
- Optional — text alone is acceptable

Never use: Stock photos, Complex scenes, Cartoons, Heavy colors.

---

## Claude Implementation Notes

Empty states are one of the most neglected UX touchpoints. Invest in them.

A well-designed empty state is the **first impression** a new user has of an unfamiliar section. It should communicate: *"This is easy to begin. Here's exactly what to do."*

Tone should be: calm, clear, helpful. Never apologetic.
