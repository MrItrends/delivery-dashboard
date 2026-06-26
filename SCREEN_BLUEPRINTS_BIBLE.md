# Screen Blueprints Bible
**Version 1.0**

> Every screen should answer a specific question. Every section should have a reason to exist. Every layout should support decision-making.

---

## Purpose

This document defines the composition, responsibilities, and behavior of every primary screen in the Delivery Dashboard.

It does not define visual styling. It defines **what belongs on each screen**, what does not belong, and how users should move through the product.

---

## Universal Blueprint Template

Every screen specification follows the exact same structure. No screen deviates from this.

```
Screen Name
Purpose
Primary Users
Questions This Screen Answers
Navigation Entry
Screen Hierarchy
Required Sections
Optional Sections
Never Include
Primary Actions
Secondary Actions
Default Layout
Interaction Patterns
Data Sources
Responsive Behaviour
Loading State
Empty State
Error State
Permissions
Accessibility
Performance
Success Criteria
Claude Notes
```

---

## Screen Index

| # | Screen | File | Primary Purpose |
|---|--------|------|----------------|
| 01 | Workspace Home | [screens/workspace-portfolio.md](./screens/workspace-portfolio.md) | Operational start-of-day |
| 02 | Portfolio | [screens/workspace-portfolio.md](./screens/workspace-portfolio.md) | Strategic oversight |
| 03 | Priority Area | [screens/priority-project.md](./screens/priority-project.md) | Monitor one national priority |
| 04 | Project | [screens/priority-project.md](./screens/priority-project.md) | Programme governance |
| 05 | Intervention | [screens/intervention-activities.md](./screens/intervention-activities.md) | Collaborative delivery workspace |
| 06 | Activities | [screens/intervention-activities.md](./screens/intervention-activities.md) | Execution workspace |
| 07 | Milestones | [screens/delivery-objects.md](./screens/delivery-objects.md) | Delivery checkpoints |
| 08 | Targets & KPIs | [screens/delivery-objects.md](./screens/delivery-objects.md) | Outcome measurement |
| 09 | Budget | [screens/delivery-objects.md](./screens/delivery-objects.md) | Financial oversight |
| 10 | Reports | [screens/reporting-planning.md](./screens/reporting-planning.md) | Executive communication |
| 11 | Calendar | [screens/reporting-planning.md](./screens/reporting-planning.md) | Time-based planning |
| 12 | Search | [screens/reporting-planning.md](./screens/reporting-planning.md) | Universal navigation |
| 13 | Notifications | [screens/system-screens.md](./screens/system-screens.md) | Operational inbox |
| 14 | Files | [screens/system-screens.md](./screens/system-screens.md) | Document management |
| 15 | Team | [screens/system-screens.md](./screens/system-screens.md) | People and capacity |
| 16 | Settings | [screens/system-screens.md](./screens/system-screens.md) | Platform configuration |

---

## Cross-Screen Rules

→ [screens/cross-screen-rules.md](./screens/cross-screen-rules.md)

---

## The Screen Manifesto

A screen is not a canvas to fill. It is **a tool for helping someone make a decision**.

Every section must justify its existence. Every component must support the user's goal. Every action should move work forward.

If a user can move seamlessly from Workspace → Portfolio → Priority Area → Project → Intervention → Activity without ever feeling that they have entered a different application, then the Screen Blueprints have succeeded.

The highest standard is not visual originality — it is **coherence**.
