# 12 — Permissions

## Philosophy

Permissions exist to **protect delivery**. Not restrict users unnecessarily.

The product should default to transparency while safeguarding sensitive operations.

---

## Permission Categories

- Platform
- Workspace
- Portfolio
- Project
- Intervention
- Activity
- Report
- Administration

Each object defines its own permissions.

---

## Core Actions

Every object supports a consistent permission model:

| Action | Description |
|--------|-------------|
| Create | Add new objects |
| View | Read object content |
| Edit | Modify object content |
| Delete | Remove objects |
| Archive | Soft-delete objects |
| Assign | Assign ownership or tasks |
| Approve | Grant formal approval |
| Comment | Add contextual discussion |
| Upload Files | Attach supporting documents |
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
- Edit
- Update
- Comment
- Upload
- Complete

**But cannot:**
- Delete the Project
- Modify Portfolio
- Change Workspace Settings

---

## Approval Permissions

Approvals should never be automatic. Every approval identifies:
- Approver
- Timestamp
- Decision
- Comments
- Reason
- History

---

## Sharing Model

Objects are shared through Workspace membership. Not through public links.

Future support for external collaboration should be permission-based and time-limited.

---

## Permission Philosophy

> Users should almost never encounter a "Permission Denied" screen unexpectedly.

The interface should:
- Hide unavailable actions where appropriate
- Clearly communicate role limitations
- Guide users toward requesting access instead of reaching dead ends
