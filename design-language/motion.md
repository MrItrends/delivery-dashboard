# Motion

## The Single Rule

**Motion explains. Nothing more.**

Motion in the Delivery Dashboard exists for one purpose: to help users understand what happened and where something came from. It is never used to impress, to fill time, or to signal polish.

---

## Permitted Uses of Motion

| Motion | What It Explains |
|--------|-----------------|
| Inspector opens (slide from right) | This content came from the right; it can go back |
| Dropdown appears (fade + slide 4px) | This appeared below the trigger |
| Toast (slide up from bottom) | A new notification arrived |
| Status change (background flash) | This value changed — here |
| Sort change (row reorder) | These rows moved to new positions |
| Filter applied (rows disappear) | These rows are now excluded |
| Page transition (fade) | Context is changing |
| Load complete (skeleton to content) | Content has arrived |
| Saving (button state) | The system is working |
| Saved (checkmark flash) | The action completed |

---

## Forbidden Uses of Motion

| Motion | Why Forbidden |
|--------|--------------|
| Entrance animations on page load | Delays information access |
| Animated charts on first render | Frustrates users who want data |
| Logo or wordmark animation | Decorative; inappropriate context |
| Hover animation on every element | Creates visual noise |
| Bouncing animations | Playful; undermines professional context |
| Continuous looping animations | Distracting; no communicative value |
| Parallax scrolling | Disorienting; no government use case |
| Morphing shapes | Purely decorative |
| Staggered list entrance animations | Delay content; frustrating at scale |

---

## Duration

All animation durations are within a narrow band:

```
100ms  — Micro-interactions: hover states, focus rings, button press
150ms  — Feedbacks: status change flash, tooltip appear
200ms  — Standard: dropdown open, toast appear
250ms  — Panels: inspector and drawer open
300ms  — Exit: inspector and drawer close

Maximum: 350ms for any UI transition
```

**If it feels slow, it is slow.**

There is no such thing as an animation that is too fast in this product. The right question is always: "Can this be faster?"

---

## Easing

```
Entering elements:   cubic-bezier(0, 0, 0.2, 1)   — Decelerates on arrival
Exiting elements:    cubic-bezier(0.4, 0, 1, 1)   — Accelerates on departure
Standard:            cubic-bezier(0.2, 0, 0, 1)   — Default for most transitions
Interactive:         cubic-bezier(0.34, 1.56, 0.64, 1)  — Subtle spring for confirmations
```

**No exaggerated easing.** No bouncing. The "spring" easing above is subtle — a single slight overshoot, not a bouncing effect.

---

## Reduced Motion

All animations must respond to `prefers-reduced-motion: reduce`.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
```

Reduced-motion users receive: instant state changes, no skeleton shimmer, no slide animations, immediate content. The **experience must be fully functional** without motion — motion is an enhancement, not a requirement.

---

## Motion as Communication

Every permitted animation should be communicating one of these things:

1. **Origin** — Where did this come from? (Inspector slides from right — it lives to the right)
2. **Destination** — Where is this going? (Drawer slides off bottom — it's gone)
3. **Relationship** — These things are connected (clicking an item opens related detail)
4. **State change** — Something changed here (flash on the field that updated)
5. **Progress** — Something is happening (spinner in the button during save)

If the motion does not communicate one of these five things, it should be removed.

---

## The Motion Test

A screen passes when:

1. Removing all animations leaves a fully functional, comprehensible interface
2. Every animation communicates something specific
3. No animation exceeds 350ms
4. Users with reduced motion preferences experience no degradation in functionality
5. The product feels fast — animations accelerate perception, not slow it
