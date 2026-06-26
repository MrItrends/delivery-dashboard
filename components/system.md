# System Components

## 25 — Command Palette

### Purpose

Universal navigation, creation, and action system. The Command Palette is the fastest way to do anything in the product — for keyboard-fluent users, it replaces the entire navigation menu.

### Opens With

```
⌘K (Mac)
Ctrl+K (Windows/Linux)
Click search icon in top navigation
```

### What It Can Do

| Category | Examples |
|---------|---------|
| Navigate | "Go to KS2 Update", "Open Portfolio", "Go to Settings" |
| Create | "Create Activity", "New Intervention", "Add Milestone" |
| Search | "Find activities assigned to Ahmed", "Search files" |
| Actions | "Generate Report", "Approve selected", "Mark complete" |
| Filter | "Show only overdue activities", "Filter by At Risk" |
| Switch | "Switch to Education workspace" |
| Help | "Keyboard shortcuts", "Documentation" |
| Settings | "Open Notification Settings", "Change Density" |

### Anatomy

```
┌──────────────────────────────────────────────────────────┐
│ 🔍 Type a command or search...                  [ESC]   │
├──────────────────────────────────────────────────────────┤
│ Recent                                                   │
│ → KS2 Curriculum Update                                  │
│ → My Activity Queue                                      │
├──────────────────────────────────────────────────────────┤
│ Create                                                   │
│ ⌘N  New Activity in KS2 Update                         │
│ ⌘⇧N New Intervention                                   │
├──────────────────────────────────────────────────────────┤
│ Navigate                                                 │
│ G H  Go to Workspace Home                               │
│ G P  Go to Portfolio                                     │
└──────────────────────────────────────────────────────────┘
```

### Behavior

- **Opens instantly** (< 50ms — palette is pre-rendered in DOM, hidden)
- **Focus immediately in search input** — no click required
- **Results appear as typing** — debounced at 100ms
- **Arrow keys** navigate results; Enter selects
- **ESC** closes palette; focus returns to previous position
- **Context-aware** — palette knows the current object and surfaces relevant commands first

### Context Awareness

When the user is on an Intervention screen, the command palette prioritizes:
- Actions for that Intervention (Create Activity, Generate Report, Upload File)
- Navigation to related objects (Go to Project, Go to Portfolio)
- Recently used commands within that context

When the user is on a table view, the palette prioritizes:
- Filtering and sorting commands
- Bulk action commands

### Design Specifications

```
Width:          640px max
Position:       Centered, 20% from top of viewport
Border radius:  12px
Shadow:         Level 4 (most prominent in the product)
Overlay:        rgba(0, 0, 0, 0.5) behind
Animation:      150ms ease-out fade + scale from 0.96 to 1
```

### Result Item Format

```
[Icon 16px]  [Label]                                [Shortcut]
             [Description — 1 line, neutral-400]
```

### Performance Requirements

```
Palette must be pre-indexed, not fetched on open.
Results for navigation and actions: < 50ms (local index).
Results for search: < 150ms (Meilisearch query).
```

### Rules

- **Keyboard first** — palette must be fully usable without a mouse
- **No mouse required** — from open to action completion, all keyboard
- Command palette does not replace the sidebar — it augments it for power users
- The palette never opens automatically — only on user intent (⌘K or click)
