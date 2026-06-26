# Search

## Purpose

Search is the fastest navigation path in the application. Users should reach any object instantly — without knowing its exact location in the hierarchy.

Search is **workspace-wide and permission-aware**.

---

## Business Goal

Allow users to find any object across any project in under 3 keystrokes and under 300 milliseconds.

---

## Core Philosophy

Search is not a filter. **Search is navigation.**

Typing "broadband" should navigate to the Broadband Rollout Intervention, its related Activities, Reports, Budgets, and Files — not just return a list of text matches.

---

## What Search Returns

| Object Type | Examples |
|------------|---------|
| Projects | "National Healthcare" |
| Interventions | "Rural Broadband Deployment" |
| Activities | "Submit Planning Application" |
| Milestones | "Phase 2 Completion" |
| Reports | "Q3 Progress Report" |
| Files | "Ministry Budget v3.pdf" |
| Users | "Ahmed Yusuf" |
| Comments | "discussed in last meeting" |
| Decisions | "Approved additional funding" |

---

## Search Behavior

| Feature | Description |
|---------|-------------|
| Instant results | Appear as the user types |
| Fuzzy matching | Handles typos |
| Priority ranking | Most relevant results first |
| Permission-aware | Only returns objects the user can access |
| Workspace-scoped | Never returns results outside current workspace |
| Recent items | Displayed before typing begins |
| Pinned objects | Shown in quick-access section |

---

## Search Result Format

Each result shows: Object type, Object title, Breadcrumb location, Last updated, Health (if applicable).

Users can filter results by type, date, project, owner, or status.

---

## Advanced Search

For complex queries: Boolean operators, Date range filters, Owner filters, Object type filters, Status filters, Tag filters.

---

## Search + Command Palette

The Command Palette (`⌘K`) and Search share the same infrastructure. When users open the command palette, search is the default mode.

---

## Performance

| Target | Metric |
|--------|--------|
| Index freshness | < 30 seconds |
| Search latency | < 300ms |
| Result accuracy | Highly relevant top 5 |

---

## Claude Implementation Notes

Search should feel like a **command interface** — not a web search bar.

Design it as a spotlight-style experience: full viewport overlay, keyboard-native, instant results, direct navigation.

Typing "broadband" should immediately show the Broadband Intervention and allow the user to navigate directly to it in **one keystroke**. No "View Results" page required for common objects.
