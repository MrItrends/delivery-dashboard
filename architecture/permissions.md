# Permissions & User Roles

## Philosophy

**Roles** determine responsibility. **Permissions** determine capability. Do not confuse the two.

- Roles communicate organizational structure
- Permissions define system behavior

Permissions exist to **protect delivery** — not restrict users unnecessarily. The product defaults to transparency while safeguarding sensitive operations.

---

## Role Hierarchy

```
System Administrator
  ↓
Workspace Administrator
  ↓
Portfolio Manager
  ↓
Project Manager
  ↓
Intervention Lead
  ↓
Contributor
  ↓
Observer
```

---

## Role Definitions

### System Administrator
Responsible for the entire platform. Cannot be restricted.
- Manage Workspaces
- Configure Integrations
- Manage Authentication
- View Audit Logs
- Manage Security

### Workspace Administrator
Responsible for one Workspace.
- Invite Users, Manage Teams, Manage Settings
- Configure Permissions, Create Portfolios

### Portfolio Manager
Owns strategic delivery.
- Priority Areas, Projects, Budgets, Executive Reporting
- Can create and archive projects

### Project Manager
Owns execution.
- Activities, Milestones, Timeline, Files, Dependencies, Assignments

### Intervention Lead
Responsible for one intervention.
- Manage Activities, Update Progress, Request Approvals, Upload Evidence

### Contributor
Completes work.
- Update Activities, Upload Files, Comment, View Progress
- Cannot modify strategic information

### Observer
Read-only. Typically: Executives, Auditors, External Partners. Cannot change data.

> Users should immediately understand **what they own** — not simply what they can edit.

---

## Permission Categories

Each object defines its own permissions:
- Platform, Workspace, Portfolio, Project, Intervention, Activity, Report, Administration

## Core Actions

| Action | Description |
|--------|-------------|
| Create | Add new objects |
| View | Read object content |
| Edit | Modify object content |
| Delete | Remove objects |
| Archive | Soft-delete objects |
| Assign | Assign ownership |
| Approve | Grant formal approval |
| Comment | Add contextual discussion |
| Upload Files | Attach documents |
| Export | Download data |
| Share | Distribute access |

---

## Permission Matrix

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

## Ownership Permissions

Owners automatically receive elevated permissions for their own objects.

**Example — Activity Owner can:**
- Edit, Update, Comment, Upload, Complete

**But cannot:**
- Delete the Project, Modify Portfolio, Change Workspace Settings

---

## Approval Permissions

Every approval identifies: Approver, Timestamp, Decision, Comments, Reason, History.

Approvals are never automatic.

---

## Permission Philosophy

> Users should almost never encounter a "Permission Denied" screen unexpectedly.

The interface should:
- Hide unavailable actions where appropriate
- Clearly communicate role limitations
- Guide users toward requesting access instead of reaching dead ends
