# 39 — Command Palette

> Every experienced user should eventually rely on Command Palette more than navigation.

## Philosophy

The Command Palette is a **first-class navigation tool**, not an afterthought. Inspired by Raycast, Linear, and Figma.

---

## Trigger

| Platform | Shortcut |
|----------|---------|
| Mac | `⌘K` |
| Windows/Linux | `Ctrl+K` |
| Alternative | `/` from most views |

---

## Capabilities

Users should be able to do **anything** from the Command Palette:

### Navigation
- Open any project
- Navigate to any intervention
- Jump to portfolio
- Open team member profile
- Switch workspace

### Creation
- Create new activity
- Create new project
- Create new intervention
- Upload file
- Record decision

### Search
- Search all objects
- Search by type
- Search by owner
- Search by date range

### Administration
- Invite team member
- Change workspace settings
- Generate report
- Export data

### Actions
- Assign activity
- Update status
- Change priority
- Archive object

---

## UX Behavior

```
⌘K pressed
  ↓
Palette opens (center of screen, blurred background)
  ↓
Focus moves to search input
  ↓
User types → results filter in real-time
  ↓
Arrow keys navigate results
  ↓
Enter executes action
  ↓
ESC closes palette
```

---

## Result Groups

Results are grouped and labeled:

```
┌─────────────────────────────────────────────────┐
│ 🔍  broadband                                   │
├─────────────────────────────────────────────────┤
│ RECENT                                          │
│   📁  National Broadband Programme              │
│   ✓   Deploy rural towers — Activity            │
├─────────────────────────────────────────────────┤
│ PROJECTS                                        │
│   📁  National Broadband Expansion              │
│   📁  Urban Broadband Initiative                │
├─────────────────────────────────────────────────┤
│ ACTIVITIES                                      │
│   ✓   Broadband Coverage Survey                 │
│   ✓   Deploy 500 rural towers                   │
├─────────────────────────────────────────────────┤
│ CREATE                                          │
│   +   Create activity "broadband..."            │
│   +   Create project "broadband..."             │
└─────────────────────────────────────────────────┘
```

---

## Recent and Pinned

The Command Palette shows recent items when opened without typing:
- Recently visited objects
- Pinned favorites
- Frequently used actions
- Suggested next actions (context-aware)

---

## Keyboard Shortcuts Display

The Command Palette should also serve as a **shortcut discovery tool**. Users browsing commands see the keyboard shortcuts for each action.
