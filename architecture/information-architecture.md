# Information Architecture

## Philosophy

Most enterprise dashboards organise information by pages. The Delivery Dashboard organises information **by work**.

Navigation should reflect how governments deliver outcomes — not how software is traditionally structured. Users should always know where they are in the hierarchy. Moving through the application should feel like **zooming into delivery** rather than navigating disconnected screens.

---

## Product Architecture

```
Workspace
│
├── Home
│
├── Portfolio
│   ├── Priority Areas
│   ├── Projects
│   ├── Interventions
│   ├── Milestones
│   └── Activities
│
├── Performance
├── Reports
├── Calendar
├── Team
├── Files
├── Search
├── Notifications
└── Settings
```

The architecture follows the work itself — not administrative categories.

---

## IA Principles

### One Home For Everything
Users should never ask "Where should I save this?" There is only one correct location. Every object exists once. Every other location references it.

### No Duplicate Information
- Projects are not recreated inside Reports
- Activities are not recreated inside Calendar
- Reports reference Activities; Calendar references Activities
- Everything originates from one source

### Hierarchical Navigation

```
Workspace → Portfolio → Priority Area → Project → Intervention → Activity
```

The user can always move up or down this hierarchy.

### Context Is Persistent
Instead of opening a completely different page, the application uses:
- Right Drawers
- Inspector Panels
- Expandable Tables
- Inline Editing
- Breadcrumbs

The user always understands where they are.

### Shallow Navigation
The product should rarely exceed three navigation levels. History, Comments, and Details appear within the object itself — not on separate pages.

### Search Is Navigation
Search should not simply return text matches. It should navigate directly to objects. Searching "Broadband" should immediately locate the Project, Activity, Report, Comment, File, or Team — depending on relevance.

---

## Navigation Layers

The application contains four navigation systems:

| Layer | Purpose | Examples |
|-------|---------|---------|
| Workspace Navigation | Changes major destination | Portfolio, Performance, Reports, Calendar |
| Context Navigation | Changes information inside a section | Project tabs: Overview, Activities, Budget |
| Object Navigation | Moves between related objects | Activity → Milestone → Intervention |
| Utility Navigation | Always available | Search, Notifications, Profile, Help |

---

## Breadcrumb Philosophy

Breadcrumbs communicate **hierarchy**, not history.

**Correct:**
```
Workspace / Portfolio / Healthcare / National Hospital Upgrade / Activities
```

**Incorrect:**
```
Back → Back → Back → Back
```

Breadcrumbs are interactive. Each level is clickable.

---

## Information Density

| User Type | Information Level |
|-----------|------------------|
| Executives | Summaries |
| Managers | Context |
| Operators | Detail |

The architecture allows each user to progressively reveal more information without changing products.
