# 11 — User Roles

## Philosophy

**Roles** determine responsibility. **Permissions** determine capability. Do not confuse the two.

- Roles communicate organizational structure
- Permissions define system behavior

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
Responsible for the entire platform.

**Capabilities:**
- Manage Workspaces
- Configure Integrations
- Manage Authentication
- View Audit Logs
- Manage Security

Cannot be restricted.

---

### Workspace Administrator
Responsible for one Workspace.

**Can:**
- Invite Users
- Manage Teams
- Manage Settings
- Configure Permissions
- Create Portfolios
- Manage Notifications

---

### Portfolio Manager
Owns strategic delivery.

**Responsible for:**
- Priority Areas
- Projects
- Budgets
- Executive Reporting
- Portfolio Health

Can create and archive projects.

---

### Project Manager
Owns execution.

**Responsible for:**
- Activities
- Milestones
- Timeline
- Files
- Dependencies
- Assignments
- Project Health

---

### Intervention Lead
Responsible for one intervention.

**Can:**
- Manage Activities
- Update Progress
- Review Deliverables
- Request Approvals
- Upload Evidence

---

### Contributor
Completes work.

**Can:**
- Update Activities
- Upload Files
- Comment
- View Progress

Cannot modify strategic information.

---

### Observer
Read-only. Typically: Executives, Auditors, External Partners.

Observers cannot change data.

---

## Role Philosophy

> Users should immediately understand **what they own** — not simply what they can edit.
