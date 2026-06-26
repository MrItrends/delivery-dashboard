# Pattern 42 — Archiving Flow

## Philosophy

**Archive instead of delete.** Government work should remain recoverable.

Government delivery has a long memory. What is irrelevant today may be legally required tomorrow. What is complete today may be reopened in three years. What is deleted today cannot be audited ever.

---

## Archiving Sequence

```
Archive → Confirmation (if required) → Object hidden from default views → Recoverable
```

Deletion remains an **administrative operation** — not a user action in ordinary workflow.

---

## When to Archive

| Object State | Archive When |
|-------------|-------------|
| Activity | Completed, cancelled, or no longer relevant |
| Milestone | Superseded or formally withdrawn |
| Intervention | Programme ended or restructured |
| Project | Programme closed |
| User | Employee departs |
| File | Superseded by newer version |
| Report | Archived for historical reference |

---

## Archive vs. Delete

| Action | Who Can | Reversible | Record Preserved |
|--------|---------|-----------|-----------------|
| Archive | Contributors and above | Yes | Yes |
| Delete | Admins only | No | Partial (audit log only) |

Users in normal workflow should never encounter a Delete option — only Archive.

---

## Archive Confirmation

For routine archiving (Activity, File): No confirmation dialog required. Action + Undo toast.

```
"Q3 Budget Review archived."    [Undo]
```

For significant archiving (Intervention, Project): Brief inline confirmation.

```
Archive "Rural Broadband Intervention"?
This will hide it from active views. You can restore it at any time.

[Cancel]   [Archive]
```

For consequential archiving (Portfolio, Workspace): Modal with explicit name entry.

```
Type "Healthcare Portfolio" to confirm archiving.

[___________________]

[Cancel]   [Archive]
```

---

## What Happens After Archiving

Archived objects:
- Disappear from default list views
- Remain in search results (with "Archived" badge)
- Remain in reports (historical data intact)
- Remain in audit history
- Remain accessible to Admins at all times
- Remain accessible to any user who has the direct link

---

## Viewing Archived Objects

Every list includes a filter toggle:

```
[☐ Show Archived]
```

When checked, archived objects appear with a visual badge indicating their state. They cannot be edited without being restored first.

---

## Restoring Archived Objects

```
Archived Object → [Restore] → Confirmation → Active again
```

Restoration returns the object to its previous state. It does not reset history or remove the archive event — the archive and restore are both recorded in history.

---

## Cascading Archive Behavior

When archiving a parent object:

| Archive | Child Behavior |
|---------|---------------|
| Archive Intervention | Activities remain — not automatically archived |
| Archive Project | Interventions remain — flagged as "Project Archived" |
| Archive Portfolio | Projects remain — flagged as "Portfolio Archived" |

Children are never automatically archived with their parents. This preserves the delivery record and prevents accidental data loss.

---

## Audit Trail for Archiving

Every archive and restore event is recorded in history:

```
15 Sept 2024, 14:32
Ahmed Yusuf archived this intervention.
Reason: Programme restructured under new minister.

22 Oct 2024, 09:15
Sarah Ahmed restored this intervention.
Reason: Programme reinstated following budget approval.
```

Reasons are optional but encouraged.
