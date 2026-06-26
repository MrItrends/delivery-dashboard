# Feedback Components

## 17 — Empty State

### Purpose

Guide users when there is nothing to show. Empty states are teaching moments — they explain what the space is for and how to fill it.

### When to Show

- New object with no children (new Intervention with no activities)
- Table filtered to zero results
- Search with no matches
- Section with no configured data (no targets set, no files uploaded)

### Anatomy

```
[Minimal illustration — icon or simple SVG, 64px]
Heading (what is this space for?)
Explanation (1–2 sentences why it's empty and what to do)
Primary Action (the one way to populate this space)
[Optional: Secondary link to documentation]
```

### Empty State Types

| Type | Message Pattern |
|------|----------------|
| New section | "Name is where X happens. [Create first X]" |
| No search results | "No results for '[query]'. [Clear search]" |
| Filtered to zero | "No activities match these filters. [Clear filters]" |
| Permission | "You don't have access to see this content." |
| Feature not configured | "Targets aren't set up yet. [Add a target]" |
| All done | "You're up to date. Nothing requires your attention." |
| Error recovery | "Something went wrong loading this content. [Retry]" |

### Design Rules

- Illustration: small, monochromatic, icon-based — never large decorative artwork
- Heading: one sentence, not a question
- Explanation: why it's empty + what to do, under 20 words
- Primary action: one button only
- **Left-aligned** within the section — not centered on large screens

### Anti-Patterns

```
✗ Blank white space with no explanation
✗ Large decorative illustrations (> 120px)
✗ Multiple competing actions in the empty state
✗ Generic messages ("No data found") with no context
✗ Empty state centered on screens wider than 1000px
```

---

## 18 — Loading State

### Purpose

Communicate that content is being fetched without blocking user interactions or creating visual instability.

### Loading Priority Order

```
1. Optimistic update (show result immediately; roll back if server fails)
  ↓
2. Skeleton screens (show placeholder layout while fetching)
  ↓
3. Progressive rendering (stream content in as it arrives)
  ↓
4. Section spinners (spinner inside one section, rest of page is interactive)
  ↓
5. Full-page spinner (only for initial app load — never for navigation)
```

### Skeleton Design

Skeletons match the exact size and position of the content they replace:

```
Table row skeleton:      1 row = 56px height (comfortable) or 40px (compact)
Card skeleton:           Match card dimensions
Text skeleton:           Matches line height and approximate text width
Header skeleton:         Title: 280px wide; description: 200px wide
```

Skeleton shimmer animation: 1.5s linear loop, left-to-right gradient sweep.

### Rules

- **Never use a full-screen spinner for any navigation action** — the page should load progressively
- **Never block the entire page** for a single section's load
- Skeletons load **section by section** — primary content first, supporting panels second
- Operations under **300ms** show no loading state — the result just appears

### Performance Thresholds

| Duration | Loading Treatment |
|---------|------------------|
| < 300ms | No loading state (optimistic or cached) |
| 300ms–1s | Skeleton screens |
| > 1s | Skeleton + progress indication |
| > 3s | Error state with retry |

---

## 19 — Error State

### Purpose

Tell users something went wrong, explain what happened, and offer a clear path to recovery.

### Error Anatomy

```
[Error icon — 32px, red]
Title (What went wrong — 1 sentence)
Explanation (Why it happened + what the user can do)
Recovery Action (primary button)
Reference (error code or ID for support)
Support Link (optional)
```

### Error Levels

| Level | Component | Examples |
|-------|-----------|---------|
| Field Error | Inline, below field | "This field is required" |
| Section Error | Inside section, not full page | "Activities couldn't load. [Retry]" |
| Page Error | Replaces page content | 404, 500 |
| Permission Error | Replaces restricted content | "You don't have access" |
| Network Error | Toast + offline banner | "You're offline. Changes will sync when reconnected." |

### Error Message Rules

Every error message must answer:
1. **What happened** — "The activity couldn't be saved"
2. **Why** — "The server returned an error"
3. **What to do** — "Try again, or contact support if this continues"

### Anti-Patterns

```
✗ Technical stack traces visible to users
✗ Generic "Error" messages with no explanation
✗ Errors with no recovery action
✗ Blocking the entire application for a single section error
```

---

## 20 — Notification Item

### Purpose

Represent a single notification in the Notifications screen and in the notification dropdown. Each item communicates: who did what, to which object, when — and what the user should do about it.

### Anatomy

```
[Actor Avatar] [Actor Name] [Action] [Object Name]   [Time]
               [Short context — 1 line max]
               [Primary Action]  [Dismiss]
```

### States

| State | Appearance |
|-------|-----------|
| Unread | Left border in brand-600; background neutral-50 |
| Read | No border; white background |
| Actioned | Text reduced; marked "Done" |

### Grouping

When 3+ notifications for the same object arrive within 24 hours, they collapse:

```
[Intervention avatar]  KS2 Update had 5 changes today          [2h ago]
                       Ahmed, Sarah, and Marcus made updates    [Expand ▾]
```

### Rules

- Every notification links directly to the object it references
- Primary action (Approve, View, Open) is available inline — no navigation required for simple actions
- Notifications group by object within a day — never show 10 identical notifications from the same object
