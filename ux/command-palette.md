# Command Palette

## Purpose

The Command Palette is the **fastest way to do anything in the Delivery Dashboard**. It is a first-class navigation and action interface.

Keyboard shortcut: `⌘K` (Mac) / `Ctrl+K` (Windows/Linux)

---

## Philosophy

The Command Palette is not a search box. It is a **universal interface** for all actions in the product.

Inspired by: Linear, Raycast, Figma, Visual Studio Code, Arc Browser.

---

## What the Command Palette Can Do

| Category | Examples |
|---------|---------|
| Navigate | "Go to Healthcare Project" |
| Create | "New Activity", "New Intervention", "New Report" |
| Search | "Find broadband activities" |
| Assign | "Assign to Ahmed Yusuf" |
| Change status | "Mark completed", "Set to At Risk" |
| Invite | "Invite user@ministry.gov" |
| Generate | "Generate Q3 Report" |
| Export | "Export this Intervention as PDF" |
| Filter | "Show overdue activities" |
| Settings | "Open workspace settings" |
| Help | "How do I create a milestone?" |

---

## Command Palette Anatomy

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  🔍  What do you want to do?                            │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  Recent                                                  │
│  ├── National Hospital Upgrade                           │
│  ├── Rural Broadband Activities                          │
│  └── Q3 Progress Report                                  │
├──────────────────────────────────────────────────────────┤
│  Quick Actions                                           │
│  ├── ⊕ New Activity          ⌘N                         │
│  ├── ⊕ New Intervention                                 │
│  ├── ↗ Go to Portfolio                                   │
│  └── ⚡ Generate Report                                  │
└──────────────────────────────────────────────────────────┘
```

---

## Behavior

### Opening
Press `⌘K` from anywhere. Immediate. Zero delay.

### Focus
Focus is immediately in the search input. User begins typing instantly.

### Search Results
Results appear as the user types. No need to press Enter.

### Categories in Results
Results are grouped by: Actions, Objects (Projects, Interventions, Activities), People, Files, Settings.

### Keyboard Navigation
- `↑` / `↓` — navigate results
- `↵ Enter` — execute selected action or navigate
- `ESC` — close palette
- `Tab` — cycle result categories

---

## Command Structure

Commands are human-readable:

| Input | Result |
|-------|--------|
| "broadband" | Shows Broadband Intervention, Activities, Reports |
| "new activity" | Opens quick activity creation |
| "assign ahmed" | Shows assignment command for current object |
| "report q3" | Shows Q3 report generation |
| "settings" | Navigates to Settings |
| "invite" | Opens team invitation |

---

## Context Awareness

The Command Palette is aware of the current location:

- Inside a Project → "New Activity" creates within that Project
- Inside an Intervention → "Assign" applies to current Intervention
- No context → Commands apply at workspace level

---

## Recent and Pinned

Before typing, the palette shows:
- **Recent:** Last 5 visited objects
- **Pinned:** User-pinned objects
- **Quick Actions:** Most common actions

---

## Palette Design

| Property | Value |
|---------|-------|
| Width | 640px max |
| Position | Centered, vertically 25% from top |
| Overlay | Dark scrim behind palette |
| Border radius | 12px |
| Shadow | Large elevation shadow |
| Animation | Scale in + fade, 150ms |

---

## Result Item Format

```
[Icon] [Title]                         [Shortcut]
       [Subtitle: Object type / Location]
```

Example:
```
⊕ Create new activity                  ⌘N
  In Rural Broadband Intervention
```

---

## Claude Implementation Notes

The Command Palette must feel **instantaneous**. Any latency destroys the experience.

- Pre-index all navigable objects in memory
- Search from index, not network
- Prioritize recent and frequently used objects
- Show at least 3 results within 50ms of typing

This is a signature feature of the product. It should make experienced users feel genuinely faster than they were the day before they discovered it.
