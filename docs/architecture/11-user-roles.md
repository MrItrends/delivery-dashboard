# 11 — User Roles

> **Reconciled to the canonical model (2026-06-27).** This document previously
> described seven invented roles. The source of truth is the TBI deck (p.23) and
> `docs/NORTH_STAR.md` §4. There are **four** roles. The implementation is
> `apps/web/src/lib/data/roles.ts`. If this file and the North Star ever
> disagree, the North Star wins.

## Philosophy

**Roles** communicate responsibility. **Capabilities** define what the system
lets a person do. A person's role is held per workspace (their `memberships`
row), not globally.

## The four roles

```
Administrator
  ↓ approves the work of
Priority Area Lead / Co-Lead   and   Intervention Lead / Co-Lead
  ↓ coordinate the work of
Regular User
```

### Administrator
Runs the dashboard end to end.
- Full access to priority areas and interventions
- **Approves / rejects milestones**
- Manages financiers
- Manages people (invites, role changes) and workspace settings

### Priority Area Lead / Co-Lead
Responsible for one priority area.
- Views the priority area assigned to them
- Creates and edits its actions and milestones
- Manages the people in their priority area
- Cannot approve milestones or change workspace settings

### Intervention Lead / Co-Lead
Responsible for one intervention.
- Views the intervention assigned to them
- Creates and edits its actions and milestones
- Manages the people in their intervention
- Cannot approve milestones or change workspace settings

### Regular User
Contributes to delivery.
- No create or edit rights on the hierarchy
- Updates their **own** actions
- Raises issues within their intervention (comments)
- Read-only everywhere else

> Lead and Co-Lead share the same capabilities; "Co-Lead" denotes a second
> accountable person, not a lesser one.

## Role values (code)

`admin` · `priority-area-lead` · `intervention-lead` · `regular`

`normalizeRole()` in `roles.ts` maps any legacy value (e.g. `executive`,
`portfolio-manager`, `project-manager`, `observer`, `contributor`) onto these
four, so older data degrades sensibly.

## Role philosophy

> Users should immediately understand **what they own** — not merely what they
> can edit. The interface hides actions a role cannot take rather than showing a
> dead end (see `12-permissions.md`).
