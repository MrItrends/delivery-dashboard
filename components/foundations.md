# Foundation Components

## 01 — Page Header

### Purpose

Defines context for every screen. Every object begins with a Page Header. This is the single most important component in the product — it establishes identity before anything else loads.

### Anatomy

```
Breadcrumb
  ↓
Title
  ↓
Description (optional)
  ↓
Status
  ↓
Metadata (Owner, Date, Reference)
  ↓
Primary Action
  ↓
Secondary Actions (··· overflow)
```

### Required Slots

| Slot | Required | Content |
|------|---------|---------|
| Title | Yes | Object name — always H1, one per page |
| Breadcrumb | Yes | Navigation path from Workspace down |
| Primary Action | Yes | One button — most important action for this screen |
| Status | Yes | Current object status as a Status Chip |
| Secondary Actions | No | Overflow into ··· menu when more than 2 |
| Description | No | One sentence; omit if title is self-explanatory |
| Tags | No | Categorization tags |
| Owner | No | Avatar + name of object owner |

### Variants

| Variant | When Used |
|---------|----------|
| Workspace | Home screen — no breadcrumb, workspace name as title |
| Collection | Portfolio, Priority Area, Project — full breadcrumb |
| Object | Intervention, Activity, Milestone — full breadcrumb, rich metadata |
| Settings | Settings screens — back navigation, no primary action |
| Modal | Within modals — condensed, no breadcrumb |

### Behavior

- **Sticky:** Header scrolls away on long content pages. The global nav bar (56px) remains fixed. The breadcrumb and title are not sticky — they scroll.
- **Actions remain visible:** The primary action appears in the fixed nav bar when the header scrolls past viewport.
- **Breadcrumb collapsibility:** On tablet, breadcrumb collapses to show only the immediate parent + current page. On mobile, breadcrumb is hidden; back navigation replaces it.

### Sizing

```css
/* Breadcrumb */
font-size: var(--font-size-xs);     /* 12px */
font-weight: var(--font-weight-regular);
color: var(--color-text-tertiary);

/* Title */
font-size: var(--font-size-3xl);    /* 30px */
font-weight: var(--font-weight-bold);
color: var(--color-text-primary);

/* Description */
font-size: var(--font-size-base);   /* 16px */
font-weight: var(--font-weight-regular);
color: var(--color-text-secondary);
```

### Accessibility

- Single H1 per page — always the object title
- Keyboard focus on primary action button on page load
- Breadcrumb is a `<nav aria-label="breadcrumb">` landmark
- Current page in breadcrumb has `aria-current="page"`

### Anti-Patterns

```
✗ Multiple primary action buttons
✗ Oversized hero headers (max height 200px)
✗ Marketing copy or decorative elements
✗ Charts, tables, or KPI cards inside the header
✗ Status chips that are also buttons (chips filter; buttons act)
```

---

## 02 — Button

### Purpose

Trigger one action. Every button in the product represents a single, clear intent.

### Hierarchy

| Variant | Usage | Per Screen |
|---------|-------|-----------|
| Primary | The most important action | One only |
| Secondary | Supporting actions | Two maximum |
| Ghost | Tertiary or toolbar actions | Multiple permitted |
| Text | Inline links that look like links | Multiple permitted |
| Danger | Irreversible or destructive actions | One maximum |

### Sizes

| Size | Height | Font | Padding |
|------|--------|------|---------|
| Small | 32px | 13px | 8px 12px |
| Medium | 40px | 14px | 10px 16px |
| Large | 48px | 16px | 12px 24px |

Default: Medium. Use Large only for primary action in empty states or onboarding.

### States

| State | Appearance |
|-------|-----------|
| Default | Standard fill/outline/text |
| Hover | 5% darker background; cursor: pointer |
| Pressed | 10% darker; transform: scale(0.98) |
| Loading | Spinner replaces label; disabled interactions |
| Disabled | 40% opacity; cursor: not-allowed |
| Success | Brief green checkmark (800ms); reverts to default |

### Rules

- **One primary button per screen** — if there are two primary actions, reconsider the screen's purpose
- **Never group more than three buttons** — use ··· overflow for additional actions
- **Loading state is required** for any async action — never leave a button clickable while its action is processing
- **Icon + label is preferred** over icon-only when space permits

### Anti-Patterns

```
✗ Gradient backgrounds on buttons
✗ Floating action buttons (FABs) with heavy shadows
✗ Pill-shaped buttons (border-radius > 8px for standard buttons)
✗ Buttons labeled "Click here" or "Submit"
✗ Two primary buttons side-by-side
✗ Disabled buttons with no tooltip explaining why
```

---

## 03 — Status Chip

### Purpose

Communicate the current system state of an object at a glance. Every object in the hierarchy has a status, and every status is represented by a chip.

### Standard Status Values

| Status | Color | Meaning |
|--------|-------|---------|
| Planned | Neutral-400 | Not yet started |
| Active | Blue-600 | In progress, on track |
| At Risk | Amber-600 | Progressing but with concerns |
| Critical | Red-600 | Requires immediate attention |
| Blocked | Red-700 | Cannot progress — dependency |
| Complete | Green-600 | Successfully finished |
| Approved | Green-700 | Formally verified and approved |
| Draft | Neutral-500 | Created but not yet active |
| Archived | Neutral-300 | Preserved, no longer active |
| Cancelled | Neutral-400 | Terminated; not archived |

### Design Specs

```
Height:          22px
Padding:         2px 8px
Border radius:   4px (var(--radius-sm))
Font:            12px / 500 weight
Icon:            8px circle (●) before label
Background:      5% opacity of status color
Border:          1px solid 20% opacity of status color
```

### Behavior

- **Never clickable** unless acting as a filter control
- **Supports an optional icon** to the left of the label when visual distinction is needed
- **Color is never the only signal** — the label text always communicates the state; color reinforces it

### Anti-Patterns

```
✗ Using Status Chips as action buttons
✗ Custom colors not in the approved status color set
✗ Status chips without text labels (icon-only status)
✗ Making the same status mean different things on different screens
```

---

## 04 — Breadcrumb

### Purpose

Communicate the user's exact location within the object hierarchy at all times. This is not decorative — it is navigation infrastructure.

### Anatomy

```
Workspace / Portfolio / Priority Area / Project / Intervention
```

- Every level except the current page is a clickable link
- The current page is plain text — not a link
- Maximum 4 levels visible; more levels collapse to `···`

### Collapsing

```
Desktop:   Workspace / Education / Curriculum Review / KS2 Update
Tablet:    ... / Curriculum Review / KS2 Update
Mobile:    [← Back to Curriculum Review]
```

### Rules

- Maximum 4 visible levels at any time
- Current page is never a link (has `aria-current="page"`)
- Collapsed levels expand on click of `···`
- Separator is `/` — not `>`, not `→`

---

## 05 — Tabs

### Purpose

Organize different views of the same object without navigating to a different page.

### Variants

| Variant | When Used |
|---------|----------|
| Primary | Main object tabs (Overview, Activities, Budget, etc.) |
| Secondary | Sub-navigation within a tab (e.g., Chart / Table toggle) |
| Segmented | 2–3 option toggle (e.g., Day / Week / Month) |

### Tab States

| State | Appearance |
|-------|-----------|
| Active | neutral-900 text, 2px bottom border in brand-600 |
| Inactive | neutral-500 text, no border |
| Hover | neutral-700 text |
| Disabled | neutral-300 text, cursor: not-allowed |
| With Count | Label + (n) count in neutral-400 |

### Rules

- Maximum **8 visible tabs** on desktop; overflow to `···` menu
- Tabs organize content **within** an object — they never navigate to a different object
- **Settings** always goes last; **History** always goes second-to-last
- Tabs never have backgrounds, borders, or icons unless icons aid disambiguation

### Anti-Patterns

```
✗ Using tabs for application navigation (use sidebar)
✗ Tabs wrapping to a second line
✗ More than 10 tabs total including overflow
✗ Tabs with backgrounds or card-like styling
✗ Tabs that trigger actions rather than showing content
```
