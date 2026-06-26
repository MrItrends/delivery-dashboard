# Pattern 33 — Column Management

## Philosophy

Columns are **user-controlled**. The product provides sensible defaults, but users should tailor tables to their workflows.

A programme director needs different columns than a field activity coordinator.

---

## Capabilities

| Action | Description |
|--------|-------------|
| Show / Hide | Toggle column visibility |
| Resize | Drag column boundary to resize |
| Reorder | Drag column header to reposition |
| Pin Left | Keep column visible when scrolling right |
| Pin Right | Keep column visible when scrolling left |
| Group By | Group rows by this column's value |
| Freeze | Keep column always visible |

---

## Principles

**Critical columns remain visible by default.** Title, Status, Owner, Due Date should always appear in the default configuration.

**Secondary metadata should be optional.** Reference number, Tags, Created At, Updated At, and custom fields should be opt-in.

**Avoid horizontal scrolling where possible.** If the default column set doesn't fit comfortably on a standard screen, the defaults need revision.

---

## Column Controls UI

Accessed via: Column icon in table toolbar.

```
┌────────────────────────────────────────────┐
│ Columns                                    │
├────────────────────────────────────────────┤
│ [≡] ☑ Title              [Pin ▾]          │
│ [≡] ☑ Status             [Pin ▾]          │
│ [≡] ☑ Owner              [Pin ▾]          │
│ [≡] ☑ Due Date           [Pin ▾]          │
│ [≡] ☑ Priority           [Pin ▾]          │
│ [≡] ☐ Reference          [Pin ▾]          │
│ [≡] ☐ Tags               [Pin ▾]          │
│ [≡] ☐ Progress           [Pin ▾]          │
│ [≡] ☐ Last Updated       [Pin ▾]          │
├────────────────────────────────────────────┤
│ [Reset to defaults]                        │
└────────────────────────────────────────────┘
```

---

## Persistence

Column configuration persists:
- Per user
- Per table
- Per saved view

**Column state survives:** Page refresh, Logout/login, Workspace switching.

---

## Grouping

Users group by any column:

```
Group By: Status

▼ In Progress (12)
  ─────────────────────
▼ Blocked (3)
  ─────────────────────
▼ Completed (28)
  ─────────────────────
```

Groups are collapsible. Group count visible. New rows added within a group inherit the group's value automatically.

---

## Default Column Configs by Role

| Role | Default Visible Columns |
|------|------------------------|
| Contributor | Title, Status, Owner, Due Date, Priority |
| Project Manager | Title, Status, Owner, Due Date, Intervention, Health |
| Executive | Title, Health, Status, Intervention, Owner |

Defaults can be overridden per user at any time.
