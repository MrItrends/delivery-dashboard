# Team Management

## Purpose

Team Management governs who participates in delivery, at what level of access, and in what organizational grouping.

Teams are **organizational units**. They are not permission groups.

---

## Business Goal

Give administrators and programme managers clear visibility into team structure, resource allocation, and access control — without requiring a separate HR or IAM system.

---

## Core Philosophy

Roles define responsibility. Teams define structure.

- A user has one role (what they can do)
- A user belongs to multiple teams (who they work with)
- Teams are assigned to projects and interventions (what they're responsible for)

---

## Team Object Anatomy

```
Team
├── Name
├── Description
├── Lead
├── Members
├── Role
├── Projects Assigned
├── Interventions Assigned
├── Activity Summary
├── Created Date
└── History
```

---

## User Profile

```
User
├── Name
├── Email
├── Avatar
├── Title
├── Ministry / Department
├── Phone
├── Role
├── Teams
├── Assigned Objects
├── Activity History
├── Notification Preferences
└── Status
```

---

## User Roles

| Role | Scope |
|------|-------|
| System Administrator | Entire platform |
| Workspace Administrator | Single workspace |
| Portfolio Manager | Strategic portfolio |
| Project Manager | Individual projects |
| Intervention Lead | Individual interventions |
| Contributor | Assigned activities |
| Observer | Read-only |

---

## Invitation Flow

```
Admin invites → User receives email → User accepts → Role assigned → Team assigned
```

Users can be invited by email. Pending invitations visible to admins.

---

## Directory

The Team page functions as a People Directory:
- All workspace members
- Filter by role, team, department, project
- View individual profiles and assignments
- Understand who is responsible for what

---

## Resource View

Allows project managers to: see workload per person, identify overloaded team members, redistribute assignments.

Not a full resource management system — a **delivery-aware team view**.

---

## Offboarding

When a user departs: Ownership is reassigned, Activity history is preserved, Assignments are archived, Audit records are retained.

**User accounts are deactivated, never deleted.** Records must survive for government accountability.

---

## Claude Implementation Notes

Team Management is not a complex product — but it is mission-critical. Getting roles and permissions wrong can expose sensitive government data or lock out delivery teams.

Design the People Directory as an **operational view** — showing who owns what, who is overloaded, and who has the right access — rather than a simple list of names.
