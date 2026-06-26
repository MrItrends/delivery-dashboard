# Pattern 41 — Object Creation Flow

## Philosophy

Creating should feel **lightweight**. Large forms discourage action.

If a user must complete a 20-field form before an object exists, they will delay creating it — or not create it at all. Every delay is a gap in the delivery record.

---

## Core Sequence

```
Create → Essential Information → Save → Enrich
```

The object exists after Step 2. Everything after that is enrichment.

---

## Creation by Object Size

| Object | Pattern | Required Fields |
|--------|---------|----------------|
| Comment | Inline | Text |
| Tag | Inline | Name |
| Activity | Quick Create | Title, Intervention |
| Milestone | Quick Create | Name, Target Date, Intervention |
| File | Upload | File itself |
| Report | Wizard | Type, Scope, Period |
| Intervention | Drawer / Wizard | Name, Project, Lead |
| Project | Drawer / Wizard | Name, Priority Area, Owner |
| Portfolio | Page form | Name, Workspace |
| Workspace | Onboarding flow | Name, Admin |

---

## Quick Create — Activity

The most common creation action. Triggered by: `N` key, `+ New` button, Command Palette.

```
┌────────────────────────────────────────────────────┐
│ New Activity                                       │
│                                                    │
│ Title* _______________________________________     │
│                                                    │
│ Intervention* [Select Intervention ▾]             │
│                                                    │
│ [Create]    [Create & Open]    [Cancel]           │
└────────────────────────────────────────────────────┘
```

Two fields. Instant. The activity exists. Everything else is added in the Inspector afterward.

**"Create & Open"** creates and immediately opens the Inspector for enrichment.

---

## Contextual Defaults

Creation always inherits context:

| Where Created | Default Values |
|--------------|---------------|
| Inside an Intervention | Intervention = current |
| Inside a Project | Project = current |
| From My Work view | Owner = current user |
| From Team view | Team = current team |
| From Calendar (date click) | Due Date = clicked date |

Users should rarely need to fill in what the system already knows from context.

---

## Creation in Context

Users create without leaving current context:

**In-table creation:**
```
[+ New Activity]   ← appears below the last row
```

Clicking it adds an empty row with inline editing.

**Inline entry:**
```
Title                    Status   Owner    Due Date
[ Click to add title ]   Draft    Me       —
```

Tab through fields to fill. Enter to save.

---

## Wizard — Intervention

For more complex objects, a multi-step drawer:

```
Step 1: Basic Information
  Name, Description, Project, Category

Step 2: Ownership
  Lead, Team, Ministry, Sponsor

Step 3: Timeline
  Start Date, Target Completion, Next Review

Step 4: Initial Milestones (optional)
  Add first milestones to get started

[Skip → Complete Later]
```

Each step is completable independently. Users can skip steps and return later.

---

## Progressive Enrichment

After creation, the Inspector opens with a completion guide:

```
You're 30% complete

✓ Title
✓ Intervention
○ Add a description
○ Assign a due date
○ Set priority
○ Add to a milestone
```

This encourages enrichment without forcing it at creation time.

---

## Duplication

Any object can be duplicated as a creation shortcut:

```
Right-click → Duplicate
```

Duplicated objects: copy all fields, reset status to Draft, add "(Copy)" to title, strip approval history.

---

## Templates (Future)

Organizations can create object templates for common patterns:

```
+ New Intervention
  → From Scratch
  → From Template: Infrastructure Delivery
  → From Template: Policy Implementation
```

Templates pre-fill fields and create initial milestones.
