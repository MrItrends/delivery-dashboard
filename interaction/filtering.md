# Pattern 32 — Filtering

## Philosophy

Filtering is a **thinking tool**. Not merely a search refinement.

Users should construct perspectives on data rather than repeatedly searching. A good filter remembered saves minutes every day. A good saved filter saves hours every week.

---

## Filter Types

| Filter | Object |
|--------|--------|
| Status | Activities, Interventions, Milestones |
| Owner | All objects |
| Priority | Activities |
| Date Range | All objects with dates |
| Team | All objects |
| Health | Interventions, Projects |
| Tags | All objects |
| Budget | Projects, Interventions |
| Region | Location-scoped objects |
| Custom Fields | As configured |

---

## Filter Behavior

Filters are **additive**. Each filter further narrows the result.

Every applied filter appears as a visible chip above the table. Users remove individual chips without reopening the filter panel.

---

## Filter Anatomy

```
┌─────────────────────────────────────────────────────────┐
│ [+ Add Filter]  [Status: Blocked ×]  [Owner: Ahmed ×]  │
│ [Priority: High ×]                                      │
└─────────────────────────────────────────────────────────┘
```

Each chip shows: Field name, Applied value, Remove (×) button.

---

## Persistence

Filters persist:
- Per page
- Per user
- Per saved view

**Never unexpectedly reset a user's context.**

If a filter is applied and the user navigates away and returns, the filter must still be active unless the user explicitly clears it.

---

## Saved Filters

Users save any filter combination as a named view:

```
My Filters:
  ─ Assigned to Me
  ─ Overdue
  ─ At Risk
  ─ Blocked (Healthcare)
  ─ Q3 Milestones
```

Saved filters are personal by default. Can be shared with team.

---

## Smart Suggestions

When the filter panel opens, surface frequently used filters:

```
Suggested:
  ─ Assigned to me
  ─ Overdue this week
  ─ Blocked
  ─ High priority
```

Suggestions are based on the user's recent filter history.

---

## URL Sync

Applied filters are reflected in the URL, enabling:
- Shareable filtered views
- Browser back/forward navigation
- Bookmarking

```
/activities?status=blocked,at_risk&owner=user-123&priority=high
```

---

## Filter Reset

Users can clear all filters with a single action: **"Clear All Filters"** appears when any filter is active.

Individual chips can be removed one at a time.

---

## Empty State After Filter

When filters produce no results:

```
No activities match your filters.
Current: Status: Blocked, Owner: Ahmed

[Clear Filters]   [Modify Filters]
```

Never show an empty table without explaining why.
