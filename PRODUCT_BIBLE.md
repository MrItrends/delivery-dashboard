# Delivery Dashboard — Product Bible

**Version:** 1.0
**Status:** Living Document

---

## Audience

- Product Designers
- UX Designers
- Design Systems Engineers
- Product Managers
- Frontend Engineers
- Backend Engineers
- Claude AI

---

## Table of Contents

**Part I — Foundation**
- [01 Product Vision](#01--product-vision)
- [02 Product Philosophy](#02--product-philosophy)
- [03 Design Philosophy](#03--design-philosophy)
- [04 Product Principles](#04--product-principles)
- [05 Success Metrics](#05--success-metrics)
- [06 Product Vocabulary](#06--product-vocabulary)

**Part II — Product Architecture**
- [07 Information Architecture](#07--information-architecture)
- [08 Navigation System](#08--navigation-system)
- [09 Dashboard Types](#09--dashboard-types)
- [10 Collaboration Model](#10--collaboration-model)
- [11 User Roles](#11--user-roles)
- [12 Permissions](#12--permissions)
- [13 Object Relationships](#13--object-relationships)
- [14 Data Hierarchy](#14--data-hierarchy)

**Part III — Product Specifications**
- [15 Workspace](#15--workspace)
- [16 Portfolio](#16--portfolio)
- [17 Priority Areas](#17--priority-areas)
- [18 Interventions](#18--interventions)
- [19 Activities](#19--activities)
- [20 Projects](#20--projects)
- [21 Milestones](#21--milestones)
- [22 Targets & KPIs](#22--targets--kpis)
- [23 Budget & Financing](#23--budget--financing)
- [24 Reports](#24--reports)
- [25 Calendar](#25--calendar)
- [26 Notifications](#26--notifications)
- [27 Files](#27--files)
- [28 Search](#28--search)
- [29 Team Management](#29--team-management)

**Part IV — User Experience**
- [30 UX Philosophy](#30--ux-philosophy)
- [31 Global Screen Map](#31--global-screen-map)
- [32 Page Layout System](#32--page-layout-system)
- [33 Interaction Model](#33--interaction-model)
- [34 Inspector Panels](#34--inspector-panels)
- [35 Modals & Dialogs](#35--modals--dialogs)
- [36 Empty States](#36--empty-states)
- [37 Loading States](#37--loading-states)
- [38 Error States](#38--error-states)
- [39 Command Palette](#39--command-palette)
- [40 Keyboard Experience](#40--keyboard-experience)

**Part V — Design System**
- [41 Design Philosophy](#41--design-philosophy)
- [42 Color System](#42--color-system)
- [43 Typography](#43--typography)
- [44 Spacing](#44--spacing)
- [45 Grid System](#45--grid-system)
- [46 Elevation & Surfaces](#46--elevation--surfaces)
- [47 Iconography](#47--iconography)
- [48 Component Principles](#48--component-principles)
- [49 Tables](#49--tables)
- [50 Data Visualization](#50--data-visualization)
- [51 Forms](#51--forms)
- [52 Motion](#52--motion)
- [53 Design Tokens](#53--design-tokens)

**Part VI — Engineering**
- [54 Engineering Philosophy](#54--engineering-philosophy)
- [55 Data Model](#55--data-model)
- [56 State Management](#56--state-management)
- [57 API Architecture](#57--api-architecture)
- [58 Real-time Collaboration](#58--real-time-collaboration)
- [59 Performance](#59--performance)
- [60 Offline Strategy](#60--offline-strategy)
- [61 Security](#61--security)
- [62 Repository Structure](#62--repository-structure)

**Part VII — Claude Instructions**
- [63 Build Rules](#63--build-rules)
- [64 AI Implementation Standards](#64--ai-implementation-standards)
- [65 Quality Assurance](#65--quality-assurance)
- [66 Final Manifesto](#66--final-manifesto)

---

# Part I — Foundation

## 01 — Product Vision

### Why This Product Exists

Governments do not fail because they lack ambition. Governments fail because ambitious plans become disconnected from execution.

Strategies are documented. Budgets are allocated. Projects are launched. Meetings are held. Reports are written.

Yet somewhere between planning and delivery, visibility disappears. Responsibilities become unclear. Dependencies become hidden. Deadlines slip unnoticed. Budgets lose context. Progress becomes difficult to verify.

**The Delivery Dashboard exists to close this gap.**

It transforms government delivery from a collection of spreadsheets, presentations and disconnected reporting processes into a shared operational workspace where every stakeholder understands: what is being delivered, who owns it, how it is progressing, what risks exist, what decisions need attention, and what outcomes are being achieved.

The platform is not merely a reporting tool. **It is the operating system for government delivery.**

### Vision Statement

> Create the most trusted collaborative delivery platform for governments, enabling ministries, delivery units and implementation teams to plan, coordinate, execute and monitor national priorities through a single shared source of truth.

### Product Mission

Enable governments to transform strategy into measurable delivery through transparency, accountability and collaborative execution.

### Core User Promise

When a user opens the Delivery Dashboard, they should immediately understand: what matters today, what has changed since yesterday, what requires attention, what is blocked, what is at risk, and what is succeeding — **without opening another application**.

---

## 02 — Product Philosophy

The Delivery Dashboard is not a dashboard. It is not a reporting tool. It is not a project management application. It is not an analytics platform.

It combines elements of all four into a single collaborative workspace.

Every screen should reinforce one central idea: **Delivery is collaborative.**

### The Product Is Built Around Objects

Every important thing is an object: Workspace, Portfolio, Priority Area, Project, Intervention, Milestone, Activity, Target, Budget, Report, File, Comment, Notification.

Every object has: an owner, collaborators, status, history, permissions, relationships, and activity. Objects connect to other objects. Nothing exists in isolation.

### Single Source of Truth

The platform replaces fragmented communication. No duplicated spreadsheets. No emailed reports. No outdated PowerPoint versions. Every update occurs once. Every stakeholder sees the same information.

### Progressive Disclosure

Users begin with summaries → summaries reveal detail → detail reveals evidence → evidence reveals history.

### Accountability by Design

Every action should answer: **Who did it? When was it done? Why was it changed?**

---

## 03 — Design Philosophy

The Delivery Dashboard is not designed to impress. **It is designed to disappear.**

### Design Goal

> Design the most calm, trustworthy and collaborative government delivery platform ever built.

### Primary Inspiration
Figma, Linear, Notion, Atlassian, Arc Browser, Airtable, Stripe Dashboard

### Design Personality
Calm. Professional. Confident. Focused. Honest. Precise. Modern. Collaborative. Reliable. Invisible.

### Core Rules
- Typography is the primary visual language
- Whitespace is structure, not empty space
- Colour communicates meaning, never decoration
- Motion exists only to explain change
- Consistency creates trust
- Design for long sessions (6–8 hours/day)

---

## 04 — Product Principles

1. **Collaboration Before Isolation** — Every feature supports multiple contributors
2. **Transparency Builds Trust** — Users always understand who changed what and when
3. **Accountability Without Friction** — Ownership is visible; history is transparent
4. **Objects Over Pages** — Pages are temporary; objects are permanent
5. **Progressive Disclosure** — Show only what users need; reveal complexity gradually
6. **Speed Is A Feature** — Every unnecessary click is questioned
7. **Context Over Navigation** — Details open in drawers; editing happens inline
8. **Everything Has A Status** — Every important object communicates its current state
9. **Design For Scale** — The interface comfortably supports millions of activities
10. **The Product Is Never Finished** — Every component anticipates future expansion

---

## 05 — Success Metrics

Success is measured across five dimensions: **Product Adoption**, **Delivery Performance**, **Collaboration**, **Operational Efficiency**, and **Product Quality**.

> The product succeeds when government teams spend less time collecting information and more time delivering outcomes.

---

## 06 — Product Vocabulary

### Core Hierarchy

```
Workspace → Portfolio → Priority Area → Project → Intervention → Milestone → Activity → Update → Comment
```

| Term | Definition |
|------|-----------|
| Workspace | Highest-level container; represents an organisation |
| Portfolio | Groups strategic programmes |
| Priority Area | Major government objective |
| Project | Large delivery initiative (governance layer) |
| Intervention | Major piece of work; where delivery actually happens |
| Milestone | Significant achievement; represents an outcome, not work |
| Activity | Individual piece of work; smallest operational unit |
| Update | Progress communication; permanent history |
| Comment | Contextual discussion; belongs to objects, never pages |
| Owner | Single accountable person per object |
| Collaborator | Contributor to an object |
| Watcher | Receives updates; read-only |
| Dashboard | A view, not an object |
| View | A way of displaying information; changing view never changes data |

---

# Part II — Product Architecture

## 07 — Information Architecture

The platform organises information by **work**, not by page type. Navigation reflects how governments deliver outcomes.

### Product Architecture

```
Workspace
├── Home
├── Portfolio
│   ├── Priority Areas
│   ├── Projects
│   ├── Interventions
│   ├── Milestones
│   └── Activities
├── Performance
├── Reports
├── Calendar
├── Team
├── Files
├── Search
├── Notifications
└── Settings
```

### IA Principles
- **One Home For Everything** — Every object exists once
- **No Duplicate Information** — Views reference objects; objects own data
- **Hierarchical Navigation** — Users can always move up or down the hierarchy
- **Context Is Persistent** — Right drawers, inspector panels, expandable tables
- **Shallow Navigation** — Rarely exceed three navigation levels
- **Search Is Navigation** — Search navigates directly to objects

---

## 08 — Navigation System

Primary navigation is left-aligned, persistent, minimal. Contains only major destinations.

The **Command Palette** (`⌘K` / `Ctrl+K`) is a first-class navigation tool. Users can navigate, search, create, and take action without touching the sidebar.

Breadcrumbs communicate **hierarchy**, not history.

---

## 09 — Dashboard Types

Six dashboard experiences built on one shared data model:

| Dashboard | Primary Question |
|-----------|-----------------|
| Executive Dashboard | Are we delivering? |
| Portfolio Dashboard | How healthy is the portfolio? |
| Project Dashboard | Is this programme on track? |
| Activity Tracker | What needs to be done? |
| Performance Dashboard | Are interventions producing results? |
| Administration Dashboard | Is the platform configured correctly? |

> Every dashboard answers one primary question. If a dashboard attempts to answer ten questions, it should become two dashboards.

---

## 10 — Collaboration Model

Collaboration is woven into every object. Not a separate module.

**Collaboration pyramid:** Awareness → Communication → Coordination → Decision → Delivery

**Collaboration types:** Comments, Mentions, Assignments, Approvals, Activity Feed, Presence, Files, Decisions, Notifications

**Audit History:** Every object maintains permanent, immutable history — Who, What, When, Previous Value, New Value, Reason.

---

## 11 — User Roles

**Hierarchy:** System Administrator → Workspace Administrator → Portfolio Manager → Project Manager → Intervention Lead → Contributor → Observer

> Users should immediately understand what they own — not simply what they can edit.

---

## 12 — Permissions

### Permission Matrix

| Action | Admin | Portfolio Manager | Project Manager | Contributor | Observer |
|--------|-------|------------------|-----------------|-------------|----------|
| View | ✓ | ✓ | ✓ | ✓ | ✓ |
| Create | ✓ | ✓ | ✓ | Limited | ✗ |
| Edit | ✓ | ✓ | Own Scope | Own Scope | ✗ |
| Delete | ✓ | Limited | Limited | ✗ | ✗ |
| Comment | ✓ | ✓ | ✓ | ✓ | ✗ |
| Approve | ✓ | ✓ | Limited | ✗ | ✗ |
| Export | ✓ | ✓ | ✓ | Limited | View Only |

---

## 13 — Object Relationships

Objects reference one another. They never duplicate one another.

**Data Integrity Rules (Absolute):**
- An Activity cannot exist without an Intervention
- An Intervention cannot exist without a Project
- A Project cannot exist without a Priority Area
- A Priority Area cannot exist without a Portfolio
- A Portfolio cannot exist without a Workspace

---

## 14 — Data Hierarchy

**Five layers:** Strategic (Workspace, Portfolio, Priority Area) → Planning (Projects, Interventions, Budget, Targets) → Execution (Activities, Assignments, Files) → Communication (Comments, Notifications, History) → Intelligence (Reports, Dashboards, Analytics)

**Lifecycle:** Draft → Active → In Review → Approved → Completed → Archived

**Archiving:** Nothing is deleted. Objects become archived. Archived objects remain searchable, reportable, auditable, recoverable.

---

# Part III — Product Specifications

## 15 — Workspace

The Workspace is the **digital headquarters for delivery**. Not merely an account.

When users enter the Workspace they should immediately understand: what is happening, what changed, what requires attention, what they personally need to do.

The Workspace should feel **alive**. Users should constantly see evidence that work is progressing.

See: [product/workspace.md](product/workspace.md)

---

## 16 — Portfolio

The Portfolio is the **strategic layer**. It answers: *"How are our strategic priorities performing?"*

Portfolio Health is calculated — never manually assigned. It bridges strategy and execution.

See: [product/portfolio.md](product/portfolio.md)

---

## 17 — Priority Areas

Priority Areas represent government's highest-level strategic objectives. They are stable containers that rarely change. Projects may come and go; Priority Areas represent government intent.

See: [product/priority-areas.md](product/priority-areas.md)

---

## 18 — Interventions ⭐

**Interventions are the operational heart of the Delivery Dashboard.**

If the Project is the programme container, the Intervention is the **collaborative workspace where execution happens**.

Design it as if it were the product's primary screen. Users should comfortably spend hours inside it.

See: [product/interventions.md](product/interventions.md)

---

## 19 — Activities ⭐

Activities are the **smallest executable unit**. Nothing gets delivered without Activities.

The Activity system is the execution engine. Design it for speed. Not decoration.

See: [product/activities.md](product/activities.md)

---

## 20 — Projects

Projects provide **governance**. Interventions provide execution.

A Project coordinates multiple Interventions. It does not own Activities. It does not manage day-to-day work.

See: [product/projects.md](product/projects.md)

---

## 21 — Milestones

Milestones represent **outcomes**, not work. A Milestone represents something leadership can confidently report as achieved.

Evidence is mandatory. Approval is explicit. Milestones feel ceremonial.

See: [product/milestones.md](product/milestones.md)

---

## 22 — Targets & KPIs

Targets measure **impact**. Activities measure effort. Milestones measure achievements. Targets measure whether delivery is producing intended outcomes.

See: [product/targets.md](product/targets.md)

---

## 23 — Budget & Financing

Budget is a **delivery enabler**. Not an accounting module. Every allocation connects to delivery outcomes.

The platform answers: *"What did that spending achieve?"* — not merely *"How much was spent?"*

See: [product/budgets.md](product/budgets.md)

---

## 24 — Reports

Reports transform operational delivery into executive understanding. They generate themselves. Reports consume information — they never own it.

See: [product/reports.md](product/reports.md)

---

## 25 — Calendar

The Calendar is a **visualization of delivery over time**. Not a scheduling application. Users never create "calendar events" — they schedule product objects.

See: [product/calendar.md](product/calendar.md)

---

## 26 — Notifications

Notifications communicate change. They should reduce uncertainty. Never increase noise.

> The best notification is one that leads directly to action.

See: [product/notifications.md](product/notifications.md)

---

## 27 — Files

Files provide supporting evidence. They are never standalone resources. Every uploaded document belongs to an object.

See: [product/files.md](product/files.md)

---

## 28 — Search

Search is the **fastest navigation system** in the product. It should understand intent, not just keywords.

See: [product/search.md](product/search.md)

---

## 29 — Team Management

People are not resources. **People are collaborators.** Team Management provides visibility into organizational structure, capacity, responsibility and collaboration.

See: [product/team-management.md](product/team-management.md)

---

# Part IV — User Experience

## 30 — UX Philosophy

The objective is not delight. **The objective is confidence.**

Design for different thinking levels: Executives think strategy, Managers think coordination, Teams think execution.

See: [ux/ux-philosophy.md](ux/ux-philosophy.md)

---

## 31 — Global Screen Map

Five screen types. Everything else is built from them: **Workspace**, **Collection**, **Detail**, **Creation**, **Settings**.

See: [ux/screen-map.md](ux/screen-map.md)

---

## 32 — Page Layout System

Every page shares one layout. Consistency builds confidence. Users never learn different layouts.

Structure: Global Navigation → Breadcrumb → Page Title → Context Tabs → Primary Content → Supporting Panels

See: [ux/layouts.md](ux/layouts.md)

---

## 33 — Interaction Model

Interactions should feel inevitable. Prefer Inline Editing → Inspector → Drawer → Modal → Page (in that order).

See: [ux/interaction-model.md](ux/interaction-model.md)

---

## 34 — Inspector Panels

Inspector Panels are one of the defining UX patterns. Default width 480px. Users remain in context while exploring object detail.

See: [ux/inspector-panels.md](ux/inspector-panels.md)

---

## 35–38 — States

Every state requires intentional design: Empty states teach. Loading states use skeletons. Error states explain and recover.

See: [ux/empty-states.md](ux/empty-states.md), [ux/loading.md](ux/loading.md), [ux/errors.md](ux/errors.md)

---

## 39 — Command Palette

`⌘K` / `Ctrl+K`. Every experienced user should eventually rely on it more than navigation.

See: [ux/command-palette.md](ux/command-palette.md)

---

## 40 — Keyboard Experience

Keyboard is a first-class citizen. Power users complete common workflows without touching the mouse.

See: [ux/keyboard.md](ux/keyboard.md)

---

# Part V — Design System

## 41 — Design Philosophy

The design system is a **product language**, not a component library. Every decision reinforces: *Delivery deserves clarity.*

See: [design-system/foundations.md](design-system/foundations.md)

---

## 42–53 — Design System Specifications

| Section | File |
|---------|------|
| Color | [design-system/color.md](design-system/color.md) |
| Typography | [design-system/typography.md](design-system/typography.md) |
| Spacing | [design-system/spacing.md](design-system/spacing.md) |
| Grid | [design-system/grid.md](design-system/grid.md) |
| Elevation | [design-system/elevation.md](design-system/elevation.md) |
| Icons | [design-system/icons.md](design-system/icons.md) |
| Motion | [design-system/motion.md](design-system/motion.md) |
| Components | [design-system/components.md](design-system/components.md) |
| Tables | [design-system/tables.md](design-system/tables.md) |
| Charts | [design-system/charts.md](design-system/charts.md) |
| Forms | [design-system/forms.md](design-system/forms.md) |

---

# Part VI — Engineering

## 54 — Engineering Philosophy

The application is **object-driven**, not page-driven. Single source of truth. Composition over duplication.

See: [engineering/repository.md](engineering/repository.md)

---

## 55–62 — Engineering Specifications

| Section | File |
|---------|------|
| Data Model | [architecture/data-model.md](architecture/data-model.md) |
| State Management | [engineering/state.md](engineering/state.md) |
| API Architecture | [engineering/api.md](engineering/api.md) |
| Real-time | [engineering/realtime.md](engineering/realtime.md) |
| Performance | [engineering/performance.md](engineering/performance.md) |
| Offline | [engineering/offline.md](engineering/offline.md) |
| Security | [engineering/security.md](engineering/security.md) |
| Repository | [engineering/repository.md](engineering/repository.md) |

---

# Part VII — Claude Instructions

## 63 — Build Rules

Think like a Staff Product Engineer. Not a code generator. Read the Product Bible before implementing any screen.

See: [ai/build-rules.md](ai/build-rules.md)

---

## 64 — Implementation Standards

Never guess. If ambiguity exists, follow this Product Bible. If the Bible lacks guidance, extend existing patterns rather than inventing new ones.

See: [ai/implementation.md](ai/implementation.md)

---

## 65 — Quality Assurance

A feature is done when it passes product, UX, UI, engineering, performance, accessibility, and documentation checks.

See: [ai/review-checklist.md](ai/review-checklist.md)

---

## 66 — Final Manifesto

The Delivery Dashboard is not software. **It is infrastructure for better government.**

Every interaction should reduce uncertainty. Every object should increase accountability. Every workflow should improve collaboration. Every report should support better decisions. Every screen should help people deliver meaningful outcomes.

The interface should remain calm under complexity. The architecture should remain understandable under scale. The system should grow without losing clarity.

Users should trust the product because it is **predictable**. Designers should trust the system because it is **consistent**. Engineers should trust the architecture because it is **composable**. Leaders should trust the data because it is **traceable**.

---

## Appendix A — Design Principles Summary

1. Objects before pages
2. Collaboration before isolation
3. Typography before decoration
4. Data before dashboards
5. Context before navigation
6. Reuse before duplication
7. Outcomes before activity
8. Performance is a feature
9. Accessibility is mandatory
10. Consistency builds trust

---

## Appendix B — Claude Execution Instructions

When implementing this product:
- Read this Product Bible completely before generating any code
- Build objects before screens
- Build the design system before features
- Build reusable primitives before feature-specific components
- Follow the object hierarchy exactly as defined
- Do not invent patterns when an existing pattern applies
- Treat this document as the single source of truth
- If a conflict arises between generated code and this document, **this document takes precedence**

---

*Version 1.0 — Living Document*
