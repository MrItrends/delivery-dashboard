# 28 — Search

## Purpose

Search is the **fastest navigation system** in the product. Users should stop browsing. They should search.

---

## Philosophy

Search should understand **intent**, not just keywords.

Searching "hospital" should return: Projects, Interventions, Activities, Files, Reports, Comments, Targets, People — everything related.

---

## Search Scope

| Property | Value |
|----------|-------|
| Scope | Workspace-wide |
| Speed | Real-time |
| Index | Full-text |
| Permissions | Enforced — users only see what they can access |

---

## Search Results

Each result displays:
| Field | Description |
|-------|-------------|
| Type | Object type icon + label |
| Title | Object name |
| Owner | Accountable person |
| Status | Current state |
| Location | Hierarchy breadcrumb |
| Last Updated | Recency indicator |
| Quick Actions | Context-sensitive actions |

---

## Search Filters

| Filter | Objects |
|--------|---------|
| Projects | All projects |
| Activities | All activities |
| Files | Uploaded documents |
| Comments | Discussion threads |
| Reports | Generated reports |
| Budget | Financial objects |
| Users | Team members |
| Targets | KPIs and goals |
| Milestones | Delivery gates |
| Interventions | Active interventions |
| Dates | Date range filter |
| Tags | Label filter |

---

## Command Search

Search integrates directly into the Command Palette. Users should jump anywhere in the platform without touching navigation.

**Shortcut:** `⌘K` / `Ctrl+K`

---

## Recent Searches

Search remembers:
- Recent queries
- Pinned searches
- Frequent searches
- Suggested searches

Searches become smarter over time.

---

## AI Search (Future)

Natural language queries:
- "Show interventions delayed by more than 30 days"
- "Find projects without funding"
- "Show activities assigned to Sarah this week"
- "Which milestones are approaching next month?"

---

## Review Checklist

- [ ] Results appear instantly (< 200ms)
- [ ] Permission-aware (users only see accessible objects)
- [ ] Contextual (shows location in hierarchy)
- [ ] Command Palette integrated
- [ ] Supports natural language expansion path
- [ ] Recent and frequent searches remembered
