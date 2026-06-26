# Keyboard Navigation

## Philosophy

The Delivery Dashboard is **keyboard-first**. Power users should be able to navigate, create, assign, and complete work entirely without touching a mouse.

This is inspired by Linear, Figma, and GitHub — all products where keyboard fluency dramatically increases productivity.

---

## Global Shortcuts

| Shortcut | Action |
|---------|--------|
| `⌘K` / `Ctrl+K` | Open Command Palette |
| `⌘/` / `Ctrl+/` | Show keyboard shortcuts |
| `⌘F` / `Ctrl+F` | Focus search |
| `⌘N` / `Ctrl+N` | New object (context-aware) |
| `ESC` | Close panel / dialog / modal |
| `?` | Help |

---

## Navigation Shortcuts

| Shortcut | Destination |
|---------|------------|
| `G H` | Go Home |
| `G P` | Go to Portfolio |
| `G A` | Go to Activity Tracker |
| `G R` | Go to Reports |
| `G C` | Go to Calendar |
| `G T` | Go to Team |
| `G N` | Go to Notifications |
| `G S` | Go to Settings |

Two-key navigation sequences are inspired by Linear and Vim modal navigation.

---

## Object Actions

| Shortcut | Action |
|---------|--------|
| `E` | Edit selected object |
| `A` | Assign selected object |
| `C` | Comment on selected object |
| `S` | Change status of selected |
| `D` | Change due date of selected |
| `F` | Add to favorites |
| `X` | Archive selected |
| `⌫` | Delete selected (with confirmation) |

---

## List Navigation

| Shortcut | Action |
|---------|--------|
| `↑` / `↓` | Navigate between rows |
| `↵ Enter` | Open inspector for selected row |
| `Space` | Select row |
| `⌘A` / `Ctrl+A` | Select all visible rows |
| `⇧↑` / `⇧↓` | Extend selection |
| `Tab` | Move between columns |
| `⌘↑` / `Ctrl+↑` | Move to top of list |
| `⌘↓` / `Ctrl+↓` | Move to bottom of list |

---

## Inspector Panel

| Shortcut | Action |
|---------|--------|
| `ESC` | Close panel |
| `↑` / `↓` | Navigate between objects (updates panel) |
| `Tab` | Move between fields |
| `⌘↵` | Save and close |
| `⌘E` | Enter edit mode |

---

## Form Navigation

| Shortcut | Action |
|---------|--------|
| `Tab` | Next field |
| `⇧Tab` | Previous field |
| `⌘↵` / `Ctrl+↵` | Submit form |
| `ESC` | Discard and close |

---

## Table / Board

| Shortcut | Action |
|---------|--------|
| `↑` / `↓` | Navigate rows |
| `←` / `→` | Navigate columns (in Table view) |
| `G` | Group by |
| `F` | Filter |
| `O` | Sort by |
| `V` | Change view (Table / Board / Timeline) |

---

## Command Palette Actions

Inside the Command Palette (`⌘K`):

| Action | Type and select |
|--------|----------------|
| Navigate anywhere | Type destination |
| Create new object | "New Activity", "New Report" |
| Assign | "Assign to Ahmed" |
| Change status | "Mark as Completed" |
| Export | "Export Report" |
| Invite | "Invite user@ministry.gov" |
| Generate report | "Generate Q3 Report" |

---

## Accessibility Notes

- All interactive elements must be focusable via Tab
- Focus ring must always be visible (never hidden with `outline: none`)
- Focus must be managed correctly when panels open and close
- Screen reader announcements for all dynamic content changes
- `aria-label` on all icon-only buttons

---

## Shortcut Discovery

Users can discover shortcuts:
1. Press `?` to open shortcut reference
2. Press `⌘/` for context-sensitive shortcuts
3. Hover any shortcut-eligible element for a tooltip showing its shortcut
4. Command Palette shows shortcuts alongside commands

---

## Claude Implementation Notes

Keyboard shortcuts are not optional features. They are first-class interactions.

Every feature should be designed with its keyboard path in mind. If a feature can only be accessed via mouse, the implementation is incomplete.

The shortcut scheme should feel like **Linear** — memorable, predictable, modal-style sequences for navigation, single-key actions for common operations.
