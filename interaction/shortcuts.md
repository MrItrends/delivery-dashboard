# Pattern 43 — Global Keyboard Shortcuts

## Philosophy

Shortcuts become part of the **product language**. Experienced users should be able to navigate, create, assign, and complete work without touching a mouse.

Shortcuts are discoverable — not hidden. Press `?` at any time to see the full reference.

---

## Global Shortcuts

| Shortcut | Action |
|---------|--------|
| `⌘K` / `Ctrl+K` | Command Palette |
| `N` | Create new object (context-aware) |
| `/` | Focus search |
| `E` | Edit selected object |
| `Esc` | Close drawer / inspector / dialog |
| `?` | Show keyboard shortcuts reference |
| `⌘Z` / `Ctrl+Z` | Undo last action |
| `⌘/` / `Ctrl+/` | Context-sensitive shortcuts |

---

## Navigation Shortcuts

| Shortcut | Destination |
|---------|------------|
| `G H` | Go to Home |
| `G P` | Go to Portfolio |
| `G A` | Go to Activity Tracker |
| `G R` | Go to Reports |
| `G C` | Go to Calendar |
| `G T` | Go to Team |
| `G N` | Go to Notifications |
| `G S` | Go to Settings |

Two-key navigation sequences. `G` enters navigation mode. Second key selects destination.

---

## Object Action Shortcuts

| Shortcut | Action |
|---------|--------|
| `E` | Edit selected |
| `⇧A` | Assign to user |
| `⇧F` | Filter |
| `⇧S` | Change status |
| `⇧D` | Change due date |
| `⇧P` | Change priority |
| `⇧T` | Add tag |
| `⇧X` | Archive |
| `⌘↵` | Save / Confirm |

---

## Table Navigation

| Shortcut | Action |
|---------|--------|
| `↑` / `↓` | Navigate between rows |
| `↵ Enter` | Open inspector for selected row |
| `Space` | Toggle row selection |
| `⌘A` / `Ctrl+A` | Select all visible rows |
| `⇧↑` / `⇧↓` | Extend selection |
| `Tab` | Move to next column |
| `⌘↑` | Jump to first row |
| `⌘↓` | Jump to last row |

---

## Inspector Shortcuts

| Shortcut | Action |
|---------|--------|
| `Esc` | Close inspector |
| `↑` / `↓` | Navigate to previous / next object |
| `Tab` | Move between fields |
| `⌘↵` | Save and close |
| `⌘E` | Enter edit mode |
| `⌘⇧F` | Open full page |

---

## Command Palette Actions

Inside `⌘K`:

| Input | Executes |
|-------|---------|
| `new activity` | Opens quick activity creation |
| `new intervention` | Opens intervention drawer |
| `go portfolio` | Navigates to Portfolio |
| `assign ahmed` | Assigns current object to Ahmed |
| `mark complete` | Marks selected activity complete |
| `generate report` | Opens report generator |
| `export` | Exports current view |
| `invite` | Opens team invitation |
| `help` | Opens documentation |

---

## Shortcut Discovery

Users discover shortcuts through:

1. `?` — Full shortcut reference overlay
2. `⌘/` — Context-sensitive shortcuts for current view
3. Hover tooltips on shortcut-eligible elements
4. Command Palette (shows shortcut alongside each command)
5. Onboarding tip cards for new users

---

## Configurability

In a future version, users will be able to remap shortcuts. Core navigation shortcuts remain fixed. Action shortcuts are remappable.

---

## Shortcut Conflicts

Shortcuts are disabled when:
- A text input is focused (except Esc, ⌘↵, Tab)
- A modal or dialog is open (only modal-specific shortcuts active)
- The command palette is open (palette-specific shortcuts only)

This prevents accidental actions while typing.
