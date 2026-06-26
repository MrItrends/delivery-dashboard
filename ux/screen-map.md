# Screen Map

## Application Screen Inventory

This document defines every screen in the Delivery Dashboard and its position in the navigation hierarchy.

---

## Top-Level Screens

```
/                          → Workspace Home
/portfolio                 → Portfolio Overview
/portfolio/[id]            → Portfolio Detail
/priority-areas            → Priority Areas List
/priority-areas/[id]       → Priority Area Detail
/projects                  → Projects List
/projects/[id]             → Project Detail
/projects/[id]/[tab]       → Project Tab (Overview, Interventions, Budget...)
/interventions             → Interventions List
/interventions/[id]        → Intervention Detail
/interventions/[id]/[tab]  → Intervention Tab
/activities                → Activity Tracker (My Work)
/activities/[id]           → Activity Detail
/milestones                → Milestones List
/performance               → Performance Dashboard
/reports                   → Reports List
/reports/[id]              → Report Detail
/reports/new               → Report Generator
/calendar                  → Calendar
/files                     → Files List
/team                      → Team / Directory
/team/[userId]             → User Profile
/notifications             → Notification Center
/search                    → Search Results
/settings                  → Settings (Workspace)
/settings/[tab]            → Settings Tab (Team, Branding, Integrations...)
```

---

## Screen Hierarchy

```
Workspace Home
│
├── Portfolio
│   ├── Portfolio Overview
│   ├── Priority Area
│   │   ├── Priority Area Detail
│   │   └── Projects
│   │       ├── Project Overview
│   │       ├── Project Interventions
│   │       │   ├── Intervention Overview
│   │       │   ├── Intervention Activities
│   │       │   │   └── Activity Detail (Inspector)
│   │       │   ├── Intervention Milestones
│   │       │   ├── Intervention Budget
│   │       │   ├── Intervention Targets
│   │       │   ├── Intervention Files
│   │       │   ├── Intervention Decisions
│   │       │   └── Intervention Discussion
│   │       ├── Project Milestones
│   │       ├── Project Budget
│   │       ├── Project Reports
│   │       ├── Project Files
│   │       └── Project Team
│   └── Programme Timeline
│
├── Activity Tracker
│   ├── Table View
│   ├── Board View
│   ├── Timeline View
│   ├── Calendar View
│   └── My Work
│
├── Performance
│   ├── KPI Overview
│   ├── Target Tracking
│   ├── Trend Analysis
│   └── Comparison
│
├── Reports
│   ├── Reports List
│   ├── Report Detail
│   └── Report Generator
│
├── Calendar
│   ├── Day
│   ├── Week
│   ├── Month
│   ├── Quarter
│   └── Agenda
│
├── Team
│   ├── Directory
│   ├── User Profile
│   └── Resource View
│
├── Search Results
│
├── Notification Center
│
└── Settings
    ├── Workspace
    ├── Team & Permissions
    ├── Branding
    ├── Integrations
    ├── Notifications
    ├── Security
    └── Audit Log
```

---

## Inspector Panels (Not Full Screens)

These open as right-side drawers over the current page:

- Activity Inspector (from Activity Table or Board)
- File Preview Panel
- Comment Thread Panel
- User Quick Profile
- Notification Detail
- Quick Create Panel

---

## Modal Dialogs (Minimal)

Used only for: Destructive confirmation, Short form creation (< 4 fields), Permission grants.

Never used for: Object detail, Report preview, File preview, Complex forms.

---

## Navigation Between Screens

| Action | Navigation Pattern |
|--------|-------------------|
| Click Intervention | Navigate to Intervention page |
| Click Activity in table | Open Inspector Panel |
| Click user avatar | Open User Quick Profile |
| Click file | Open File Preview Panel |
| Click notification | Navigate to source object |
| Click breadcrumb | Navigate to breadcrumb level |
| ⌘K | Open Command Palette |
| ESC | Close Inspector / Panel |
