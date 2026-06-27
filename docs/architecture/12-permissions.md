# 12 — Permissions

> **Reconciled to the canonical model (2026-06-27).** The matrix below matches
> the four roles in `11-user-roles.md` and the capability model in
> `apps/web/src/lib/data/roles.ts` (`capabilitiesFor`). `docs/NORTH_STAR.md` §4
> is the source of truth.

## Philosophy

Permissions exist to **protect delivery**, not to restrict people for its own
sake. The interface hides actions a role cannot take rather than presenting a
"permission denied" wall.

## Capabilities

The capability model has six gates. Each role grants a fixed set:

| Capability | Administrator | Priority Area Lead / Co-Lead | Intervention Lead / Co-Lead | Regular User |
|---|---|---|---|---|
| **Create** (priority areas, projects, interventions, activities, reports) | ✓ | ✓ | ✓ | ✗ |
| **Edit** delivery objects | ✓ | ✓ | ✓ | ✗ |
| **Archive / restore** | ✓ | ✓ | ✓ | ✗ |
| **Approve** milestones | ✓ | ✗ | ✗ | ✗ |
| **Manage people** (invite, change roles) | ✓ | ✗ | ✗ | ✗ |
| **Manage workspace** (settings) | ✓ | ✗ | ✗ | ✗ |
| Comment / raise issues | ✓ | ✓ | ✓ | ✓ |
| View | ✓ | ✓ | ✓ | ✓ |

Everyone can view and comment. Regular users are otherwise read-only; they may
update their **own** actions.

## Where this is enforced

- **In the app** — `useCapabilities()` reads the signed-in user's workspace
  role and hides/disables Create, Edit, Archive, Approve, Team management, and
  Settings save accordingly (the visible RBAC).
- **In the database** — `0007_rbac_rls.sql` scopes every row to workspace
  members (Row Level Security), so a user can only read or change data in a
  workspace they belong to. This is the security boundary; the app gating is the
  experience.

## Approval

Approvals are never automatic. A milestone approval records the approver, the
timestamp, the decision, and any reason — and only an Administrator can grant
it.

## Sharing

Access is granted only through workspace membership (invitations), never public
links. Invited people join the same workspace and collaborate live (see
`0008_collaboration.sql`).

## Permission philosophy

> Users should almost never hit an unexpected "permission denied". Hide what a
> role can't do; make role limits legible; never leave a dead end.
