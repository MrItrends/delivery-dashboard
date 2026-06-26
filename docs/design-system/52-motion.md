# 52 — Motion

> See also: [Design Tokens — Motion](../../design-system/tokens/motion.md)

## Philosophy

Motion explains change. **Nothing else.**

---

## When Motion Is Appropriate

| Use | Not Use |
|-----|---------|
| Opening drawers | Page loads |
| Sorting tables | Navigation transitions |
| Loading data | Typing responses |
| Changing filters | Background syncs |
| Expanding rows | Decorative flourishes |
| Showing notifications | State indicators |
| Closing modals | Success celebrations |

---

## Timing

- **Fast (100ms):** Micro-interactions, hover states, badge changes
- **Normal (150ms):** Standard transitions, fades
- **Moderate (200ms):** Panels opening, filters applying
- **Slow (300ms+):** Only for large layout changes

Target range: **150–250ms** for most interactions.

---

## Easing

| Context | Easing |
|---------|--------|
| Elements entering | ease-out (decelerate to rest) |
| Elements leaving | ease-in (accelerate away) |
| State changes | ease-in-out |
| Progress | linear |
| Never | bounce, spring, elastic |

---

## Reduced Motion

**Always respect `prefers-reduced-motion`.**

When reduced motion is preferred:
- Disable transitions
- Keep instant state changes
- Remove skeleton shimmer (show static skeleton)
- Keep functional feedback (loading spinners can remain)

This is **mandatory**, not optional.

---

## Anti-Patterns

| Anti-Pattern | Why |
|-------------|-----|
| Bounce/spring effects | Feel wrong in professional software |
| Staggered list animations | Slow, distracting, feels playful |
| Full-page transition animations | Interrupt cognitive flow |
| Hover animations on data tables | Too noisy in dense interfaces |
| Loading animations > 300ms | Should be skeleton instead |
| Celebratory animations on completion | Inappropriate for government context |

---

## Motion Budget

Each screen should use motion **sparingly**. If more than 3 things are animating simultaneously, something is wrong.
