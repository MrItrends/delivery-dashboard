# Pattern 38 — Dependency Visualization

## Philosophy

Dependencies should **never be hidden in metadata**. Hidden dependencies create delivery risk.

Users must understand: What is blocked? What is waiting? What unlocks progress?

---

## Dependency Types

| Type | Meaning | Symbol |
|------|---------|--------|
| Finish → Start | B cannot start until A finishes | → |
| Start → Start | B cannot start until A starts | ⇒ |
| Finish → Finish | B cannot finish until A finishes | ⇒⇒ |
| Blocked By | B is directly blocked by A | 🔴→ |
| Blocks | A is blocking B | →🔴 |
| External Dependency | Depends on something outside this system | ···→ |

---

## Where Dependencies Are Visible

| View | How Shown |
|------|---------|
| Timeline | Arrows connecting objects |
| Activity Inspector | "Depends on" and "Blocking" sections |
| Activity Table | Column: Dependencies (icon count) |
| Intervention Overview | Dependency risk summary |
| Board View | Badge on blocked cards |

---

## Timeline Visualization

In the Timeline view:
- Dependency arrows drawn between connected objects
- Critical dependency chains traceable by following arrows
- Hovering a dependency arrow highlights both objects and the full chain
- Blocked items show a distinct visual state (red indicator or icon)

---

## Inspector Panel — Dependency Section

```
Dependencies
─────────────────────────────────────────────────────

Blocked by (2):
  🔴  Procurement Sign-Off        In Progress   Ahmed
      Due: 12 Sept

  🔴  Legal Review Complete       Blocked       Sarah
      Due: 10 Sept

Blocking (1):
  →   Construction Tender         Not Started   James
      Start depends on this activity
```

Each dependency links directly to the related object.

---

## Dependency Warning

When a dependency is at risk, a warning appears on both objects:

```
⚠ This activity is blocked by 2 overdue dependencies.
  Estimated impact: 3+ day delay.
  [View Dependencies]
```

---

## Creating Dependencies

Users create dependencies by:
1. Opening the activity
2. Going to the Dependencies section
3. Searching for the related activity
4. Selecting the dependency type

Or on the Timeline: drag from one item's edge to another.

---

## Circular Dependency Detection

The system prevents circular dependencies:

```
❌ Cannot create this dependency.
   Activity A → Activity B → Activity A would create a circular dependency.
```

Blocked at creation time, not at delivery time.

---

## Cross-Intervention Dependencies

Dependencies can exist between activities in different interventions. These are shown with a special indicator (different color or dashed line) to indicate cross-boundary risk.

Cross-intervention dependencies are surfaced at the Project level for programme managers to monitor.

---

## Dependency Health Indicators

| Indicator | Meaning |
|-----------|---------|
| Green arrow | Dependency on track |
| Yellow arrow | Dependency at risk of delay |
| Red arrow | Dependency overdue — blocks progress |
| Dashed arrow | External dependency (not tracked internally) |

Health of dependencies propagates upward: if a dependency is critical, the dependent activity is flagged at risk.
