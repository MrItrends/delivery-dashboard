# Prompting Guide for Claude

> How to get the best results from Claude when building the Delivery Dashboard.

---

## Mental Model

Claude works best when it has:
1. **Context** — what product this is and what it's for
2. **Constraints** — what rules must not be violated
3. **Clarity** — exactly what to build
4. **Reference** — which existing patterns to follow

Without these four elements, Claude will produce generic software. With them, it produces product-specific, consistent, high-quality work.

---

## Starting a New Session

Always begin a new Claude session with this context block:

```
I'm building the Delivery Dashboard — a government delivery platform that
acts as an operating system for national delivery. The object hierarchy is:

Workspace → Portfolio → Priority Area → Project → Intervention → Activity

Interventions are the delivery heart (not Projects). Activities belong to
Interventions. Every object has one owner. Health is calculated, never manually
assigned. Nothing is hard deleted — only archived.

The design system uses PP Neue Montreal, 8px spacing base, CSS variable tokens,
and Hugeicons. Design inspiration: Linear, Figma, Notion, Stripe. Not Bootstrap.

Docs are at: [path to this repository]
```

---

## Prompting for Components

**Weak prompt:**
```
Build an activity table component
```

**Strong prompt:**
```
Build the ActivityTable component for the Delivery Dashboard.

Reference: design-system/tables.md, design-system/components.md

Requirements:
- Columns: Reference, Title, Status (inline edit), Owner (inline edit),
  Due Date (inline edit), Priority, Health, Progress, Updated
- Virtual rendering (TanStack Virtual) for performance
- Click row → opens ActivityInspector panel on the right
- Sorting on all columns
- Bulk selection with action bar
- Loading: skeleton rows
- Empty: empty state from design-system/empty-states.md
- All tokens: var(--color-*), var(--space-*), var(--font-*)
- TypeScript strict, no any
- Keyboard: ↑↓ navigate, Enter to open inspector, Space to select
```

---

## Prompting for API Endpoints

**Weak prompt:**
```
Create an API for activities
```

**Strong prompt:**
```
Create the activities API module following engineering/api.md.

Requirements:
- GET /activities (paginated, filterable by status, owner, intervention, priority)
- GET /activities/:id (with ?include=intervention,owner,milestone)
- POST /activities (create, validate with Zod, check permission activities:create)
- PATCH /activities/:id (update, check permission activities:edit on this object)
- PATCH /activities/:id/status (status transition only)
- DELETE /activities/:id (archive, not delete)

Each endpoint must:
1. Authenticate with JWT
2. Check permissions
3. Validate input with Zod
4. Write audit log on mutations
5. Return standard envelope: { data: Activity }
6. Return standard errors: { error: { code, message, details } }
```

---

## Prompting for Screens

**Strong screen prompt:**
```
Build the Intervention Detail page for the Delivery Dashboard.

Reference: product/interventions.md (full spec)

Screen architecture from the spec:
┌─────────────────────────────────────────────────────┐
│ Header: Name, Status, Owner, Breadcrumb, Actions    │
├─────────────────────────────────────────────────────┤
│ Health │ Timeline │ Budget │ KPIs │ Risks           │
├─────────────────────────────────────────────────────┤
│ Summary / Delivery Objective                        │
├──────────────────────┬──────────────────────────────┤
│ Activities           │ Recent Activity Feed         │
│                      │ Discussion                   │
├──────────────────────┴──────────────────────────────┤
│ Milestones                                          │
├─────────────────────────────────────────────────────┤
│ Files & Evidence                                    │
└─────────────────────────────────────────────────────┘

Tabs: Overview | Activities | Milestones | Budget | Targets | Risks | Files | Decisions

Rules:
- All tokens, no hardcoded values
- Activities shown in ActivityTable component (inspector on click)
- Loading: skeleton for each section
- Real-time presence via usePresence hook
- Breadcrumb: Workspace / Portfolio / Project / Intervention
```

---

## Prompting for Fixes

Always specify:
1. What the current behavior is
2. What the expected behavior should be
3. Which file contains the bug

```
In components/features/activities/ActivityTable.tsx around line 145,
the inline status edit doesn't save when the user presses Enter — it only
saves on blur. Expected: pressing Enter should also trigger save.
```

---

## What Claude Needs to Refuse

If asked to violate these principles, Claude should refuse and explain:

- Hard delete (instead of archive)
- Manually settable health scores
- Object creation outside the hierarchy
- Hardcoded design values
- Activities without an Intervention
- Removing audit history
- Disabling permission checks

---

## Prompting Tips

| Tip | Why |
|-----|-----|
| Reference specific docs files | Claude uses them as design anchors |
| Include the screen architecture | Prevents Claude from inventing layout |
| Specify which components to use | Prevents unnecessary new components |
| Name the token to use | Ensures design system consistency |
| State what NOT to do | Prevents common wrong patterns |
| Include error, empty, loading | Claude will skip these if not asked |
| Specify TypeScript requirements | Prevents loose typing |
