# Pattern 34 — Timeline Interaction

## Philosophy

Timelines communicate **sequence and dependency**. Not just dates.

A list of dates tells you when things happen. A timeline tells you whether things can happen — given what depends on what.

---

## Timeline Goals

Users should instantly understand:
- What is happening when
- What must finish before something else can start
- What is currently blocked
- Where delivery risks are concentrated
- What the critical path is

---

## Interactions

| Interaction | Behavior |
|-------------|---------|
| Zoom | Scroll wheel or pinch — weeks to quarters |
| Pan | Click and drag horizontal axis |
| Drag Milestone | Move target date (with confirmation) |
| Drag Activity | Adjust start or end date |
| Click Dependency Arrow | Highlight full dependency chain |
| Collapse Group | Minimize an Intervention's rows |
| Expand Group | Show all activities within |
| Hover Object | Show summary tooltip |
| Quick Create | Click empty date to create |

---

## Zoom Levels

| Level | Shows |
|-------|-------|
| Day | Hourly intervals (single day or sprint) |
| Week | Day-by-day view |
| Month | Week-by-week view |
| Quarter | Monthly columns |
| Year | Quarterly overview |

Zoom level persists per user session.

---

## Visual Rules

**Critical path** is emphasized — highlighted or thickened bar.

**Blocked dependencies** are visually distinct — red or warning indicator, dashed line.

**Completed work** fades without disappearing — reduced opacity, checked state.

**Overdue items** use risk color — persistent, not just on hover.

**Milestones** appear as diamonds at their target date.

**Reviews** appear as flags or markers.

---

## Dependency Arrows

Dependencies are drawn as connecting arrows between objects.

| Dependency Type | Arrow Style |
|----------------|------------|
| Finish → Start | Solid arrow |
| Start → Start | Dashed arrow |
| Blocked By | Red arrow |
| External | Dotted arrow |

Hovering an arrow highlights both connected objects and the full chain.

---

## Drag Behavior

Dragging an activity or milestone:

1. Ghost preview appears immediately
2. Snap to day boundaries
3. Dependent objects show cascading impact preview
4. Drop confirms change
5. Undo available for 30 seconds

If a drag creates a dependency conflict, a warning is shown — not blocked silently.

---

## Timeline as Planning Tool

The Timeline is not read-only. Users actively plan using it:
- Reschedule activities by dragging
- Create new activities by clicking empty areas
- Resolve dependency conflicts visually
- Identify bottlenecks before they occur

---

## Accessibility

Timeline includes a table view fallback for screen readers and keyboard users. The visual timeline enhances — it does not replace — accessible data.

| Key | Action |
|-----|--------|
| ← / → | Navigate time axis |
| ↑ / ↓ | Navigate between rows |
| + / - | Zoom in / out |
| Enter | Open selected object |
| Esc | Close hover / selection |
