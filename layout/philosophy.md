# Composition Philosophy

## The Core Belief

**Every screen should answer one question before asking another.**

Information should unfold naturally. Users should never need to search visually for where to begin. A screen should guide the eye without requiring conscious effort.

Think like an architect. Not a decorator.

An architect designs for function first. Structure emerges from what the space must do — not from what might look interesting. The same principle applies to every screen in the Delivery Dashboard.

---

## The Visual Pyramid

Every screen follows the same hierarchy. No exceptions.

```
Context             ← Where am I? What is this? Why does it matter?
  ↓
Primary Content     ← The main work. What the user came here to do.
  ↓
Supporting Content  ← Context that helps, but doesn't lead.
  ↓
Metadata            ← Created by, updated at, assigned to.
  ↓
History             ← What happened before.
  ↓
System Controls     ← Settings, configuration, administration.
```

**Context always comes first.** A user who arrives at an Intervention screen must immediately understand: what intervention is this, what is its status, and what is its health — before they see a single activity.

**Actions always happen near the information they affect.** The "Add Milestone" button belongs in the Milestones section — not in a global toolbar.

**Metadata is never promoted above content.** The created date and reference number of an Intervention are not the first things a user needs. They are available — but they do not lead.

---

## Information Flows Top to Bottom

Every page reads like a story.

```
Header          ← Who am I reading about?
  ↓
Summary         ← What is the current situation?
  ↓
Current Work    ← What is happening right now?
  ↓
Supporting Data ← What context supports understanding?
  ↓
History         ← What has happened before?
  ↓
Settings        ← How is this configured?
```

Never reverse this order. A settings section that appears before the content it governs is a layout failure. History that appears before current work sends the user backward before they have gone forward.

---

## One Primary Purpose Per Screen

Every screen has exactly one primary purpose. One.

| Screen | Primary Purpose |
|--------|----------------|
| Workspace Home | Understand what is happening right now |
| Portfolio | Understand how strategic priorities are performing |
| Project | Manage programme delivery governance |
| Intervention | Coordinate and execute delivery |
| Activity Tracker | Complete and manage work |
| Budget | Understand and govern finances |
| Report | Communicate progress |
| Performance | Measure outcomes against targets |
| Settings | Configure the workspace |

If a screen has two competing primary purposes, it should be split into two screens.

If a screen feels overwhelming, the first question to ask is: what is the one purpose this screen serves? Everything that does not serve that purpose is a candidate for removal.

---

## The 70 / 30 Rule

Primary content occupies approximately **70%** of the screen width. Supporting content occupies **30%**.

```
┌───────────────────────────────────────────┬───────────────┐
│                                           │               │
│                                           │  Supporting   │
│  Primary Workspace (70%)                  │  Context      │
│                                           │  (30%)        │
│                                           │               │
└───────────────────────────────────────────┴───────────────┘
```

**Supporting panels should never dominate.**

When the supporting panel grows larger than 40%, it is no longer supporting — it is competing. When it grows larger than 50%, the layout has inverted and must be redesigned.

---

## Page Rhythm

Every page establishes a predictable visual rhythm:

```
Large Title
  ↓
Summary Section
  ↓
Content
  ↓
[Whitespace]
  ↓
Next Section
  ↓
Content
  ↓
[Whitespace]
  ↓
Supporting Section
```

**Avoid stacking unrelated widgets.** A timeline widget followed by a KPI widget followed by a file list widget followed by a team section is not a page — it is an accumulation. Pages should tell a story. Every section should connect to the one before it.

---

## Surface Hierarchy

Only four surface levels exist. No more.

| Level | Name | Used For |
|-------|------|---------|
| 1 | Canvas | The page background (white or neutral-50) |
| 2 | Section | Content areas, cards, tables |
| 3 | Interactive Surface | Hover states, selected states, focus |
| 4 | Overlay | Dropdowns, drawers, modals, inspector panels |

**Never create additional visual layers.** A fifth layer means a previous layer is unnecessary. Collapse before adding.

---

## Section Composition

Each section contains exactly:

1. **Heading** — What is this section about?
2. **Description** (optional) — One sentence of context
3. **Action** (optional) — The one action relevant to this section
4. **Content** — The actual information

Nothing more. Decorative containers, nested cards within sections, and header rows with multiple icons and dropdowns are all signs that the section has grown beyond its purpose.

If a section requires more than four elements to set up before showing content, it should be simplified or split.
