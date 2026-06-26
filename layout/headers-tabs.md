# Headers & Tabs

## Page Headers

### What Every Page Header Contains

Every page header is identical in structure. Only the content changes.

```
┌──────────────────────────────────────────────────────────┐
│ Workspace / Portfolio / Healthcare / National Hospital   │  ← Breadcrumb
│                                                          │
│ National Hospital Upgrade Programme                      │  ← Title (H1)
│ Phase 2 — Infrastructure Delivery                        │  ← Description (optional)
│                                                          │
│ [Active]  [Due: Q4 2024]  Ahmed Yusuf  [+ Invite]       │  ← Status / Meta / Actions
└──────────────────────────────────────────────────────────┘
```

### Required Header Elements

| Element | Always Present | Notes |
|---------|--------------|-------|
| Breadcrumb | Yes | Interactive; each level navigable |
| Title (H1) | Yes | One per page; largest text on screen |
| Status indicator | Yes | Visible immediately after title |
| Primary Action | Yes | One button; most important action |
| Secondary Actions | Optional | Overflow into "···" menu when > 2 |
| Short Description | Optional | One sentence; omit if title is self-explanatory |

### What Never Goes in a Header

**Analytics and metrics** do not belong in the page header. The header communicates identity, status, and primary action. Metrics belong in a Summary section below.

```
✗ Wrong — Header with KPI Cards
┌──────────────────────────────────────────────────────────┐
│ National Hospital Upgrade                                │
│ [Activities: 43] [At Risk: 5] [Budget: 72%] [Health: ●]│
└──────────────────────────────────────────────────────────┘

✓ Correct — Header with Status Only
┌──────────────────────────────────────────────────────────┐
│ Workspace / Portfolio / Healthcare                       │
│ National Hospital Upgrade                                │
│ Active  ·  Ahmed Yusuf  ·  Q4 2024                      │
│                              [Generate Report]  [···]   │
└──────────────────────────────────────────────────────────┘
```

Metrics appear in the Summary section below the header — not inside it.

### Header Sizing

```
Breadcrumb:      12px / caption / neutral-400
Page Title:      30–36px / 700 / neutral-900
Description:     16px / 400 / neutral-500
Status badge:    12px / 500 / semantic color
Action buttons:  Standard button height (40px)
```

Header total height: 120–160px depending on content. Never taller.

---

## Context Navigation (Tabs)

### What Tabs Are For

Tabs organize different **views of the same object**. They do not navigate to different parts of the application.

**Correct tab usage:**

```
[Overview]  [Activities]  [Milestones]  [Budget]  [Timeline]  [Files]  [Team]  [History]
```

All of these are views of the same Intervention. The user never leaves the Intervention — they see it from different angles.

**Incorrect tab usage:**

```
[Home]  [Dashboard]  [Analytics]  [Settings]  [Profile]
```

These are navigation destinations — they belong in the sidebar or top navigation. Using tabs for application navigation destroys the user's understanding of where they are.

### Tab Behavior

| State | Appearance |
|-------|-----------|
| Active | Near-black text, 2px bottom border in brand-600 |
| Inactive | Neutral-500 text, no border |
| Hover | Neutral-700 text |
| Disabled | Neutral-300 text, cursor not-allowed |

Tabs never have: backgrounds, borders, icons (unless needed to distinguish), badges (except count indicators).

### Tab Order

Tabs should be ordered by frequency of use — most used first.

**Standard object tab order:**

```
Overview → [Primary Work Tab] → Timeline → Budget → Files → Team → History → Settings
```

For Interventions: `Overview → Activities → Milestones → Budget → Targets → Risks → Files → Decisions → Team → History`

For Projects: `Overview → Interventions → Timeline → Budget → Reports → Team → History → Settings`

Settings always goes last. History always goes second-to-last.

### Tab Count

Maximum **8 visible tabs** on desktop. Beyond 8, use an overflow menu (`···`) to surface additional tabs. Never allow tabs to wrap to a second line.

On mobile: tabs become a horizontal scroll or a dropdown selector. Tabs never stack vertically.

### Tabs vs. Secondary Navigation

| Use Tabs For | Use Sidebar For |
|-------------|----------------|
| Different views of the same object | Different destinations |
| Same permission context | Different contexts |
| Content at the same hierarchical level | Moving up or down the hierarchy |

When uncertain: if the user is still looking at the same object, use tabs. If they are moving to a different object, use navigation.
