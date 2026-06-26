# 25 — Calendar

## Purpose

The Calendar is not a scheduling application. **It is a visualization of delivery over time.**

Users should understand not only what is happening, but when, why, and how different events influence one another.

---

## Business Goal

Provide a unified temporal view of every significant delivery event, combining execution, governance and reporting into one chronological experience.

---

## Core Philosophy

Everything has time:
- Activities have due dates
- Milestones have target dates
- Projects have review cycles
- Budgets have release schedules
- Reports have publication dates

The Calendar brings these together **without duplicating data**.

---

## Calendar Objects

The Calendar visualizes:
- Activities
- Milestones
- Project Reviews
- Executive Meetings
- Funding Releases
- Target Reporting
- Approvals
- Procurement Events
- Government Deadlines
- Public Announcements

> Users never create "calendar events." They schedule **product objects**.

---

## Calendar Views

| View | Purpose |
|------|---------|
| Day | Today's detailed schedule |
| Week | Near-term planning |
| Month | Standard overview |
| Quarter | Programme planning |
| Year | Strategic planning |
| Agenda | List of upcoming events |
| Roadmap | Programme timeline |
| Timeline | Gantt-style dependency view |

---

## Timeline Philosophy

Unlike Google Calendar, the Calendar should communicate **delivery rhythm**. Users should understand:
- Busy periods
- Delivery bottlenecks
- Critical reviews
- Funding windows
- Milestone clusters
- Periods of delivery risk

---

## Screen Architecture

```
┌───────────────────────────────────────────────────┐
│ Calendar Header: Date range, View controls        │
├───────────────────────────────────────────────────┤
│ Filters │ Saved Views │ Search │ Export           │
├───────────────────────────────────────────────────┤
│ Calendar Canvas                                   │
├───────────────────────────────────────────────────┤
│ Upcoming Reviews                                  │
├───────────────────────────────────────────────────┤
│ Upcoming Milestones                               │
└───────────────────────────────────────────────────┘
```

---

## Smart Filters

Users filter by:
- Priority Area
- Project
- Intervention
- Owner
- Team
- Status
- Region
- Review Type
- Funding
- Ministry

Filters remain persistent.

---

## Calendar Colors

Color communicates **object type**, never priority:

| Color | Object |
|-------|--------|
| Blue | Activities |
| Purple | Milestones |
| Orange | Reviews |
| Green | Funding releases |
| Grey | Reports |

---

## Scheduling Rules

Moving an object inside the Calendar **updates the actual object**. The Calendar never stores independent dates — it visualizes existing ones.

---

## Calendar Intelligence

Examples:
- "This milestone conflicts with Executive Review."
- "Funding arrives after planned construction."
- "Five reviews occur on the same day."

The Calendar should identify scheduling problems **before they happen**.

---

## Review Checklist

- [ ] Timeline reflects delivery, not appointments
- [ ] Calendar references objects, not duplicates
- [ ] Scheduling updates source data
- [ ] Smart filtering supported
- [ ] Executive planning optimized
- [ ] Conflicts surfaced proactively
