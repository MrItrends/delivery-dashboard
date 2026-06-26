# Motion & Animation

## Philosophy

Motion should **communicate**, not entertain.

Every animation in the Delivery Dashboard serves one of three purposes:
1. **Orientation** — Help users understand spatial relationships (where did this panel come from?)
2. **Feedback** — Confirm that an action occurred (the status changed)
3. **Continuity** — Maintain context during transitions (this is still the same list)

Motion that exists purely for aesthetic reasons should be removed.

---

## Duration Scale

```css
--duration-instant:   0ms;    /* No animation (reduced motion) */
--duration-fast:      100ms;  /* Micro-interactions (hover, focus) */
--duration-normal:    200ms;  /* Standard transitions */
--duration-slow:      300ms;  /* Panel open/close */
--duration-xslow:     500ms;  /* Page transitions (use sparingly) */
```

---

## Easing Scale

```css
/* Standard easing */
--easing-standard:  cubic-bezier(0.2, 0, 0, 1);

/* Decelerate — entering elements */
--easing-enter:     cubic-bezier(0, 0, 0.2, 1);

/* Accelerate — exiting elements */
--easing-exit:      cubic-bezier(0.4, 0, 1, 1);

/* Spring — interactive feedback */
--easing-spring:    cubic-bezier(0.34, 1.56, 0.64, 1);
```

---

## Semantic Motion Tokens

```css
/* Entry / Exit */
--motion-panel-enter:   var(--duration-slow) var(--easing-enter);
--motion-panel-exit:    calc(var(--duration-slow) * 0.75) var(--easing-exit);

/* Feedback */
--motion-feedback:      var(--duration-fast) var(--easing-standard);

/* Standard transitions */
--motion-default:       var(--duration-normal) var(--easing-standard);

/* Page */
--motion-page:          var(--duration-xslow) var(--easing-enter);
```

---

## Motion Patterns

### Inspector Panel Open / Close

```css
/* Enter */
.inspector-panel {
  transform: translateX(100%);
  transition: transform var(--motion-panel-enter);
}

.inspector-panel.open {
  transform: translateX(0);
}

/* Exit */
.inspector-panel.closing {
  transform: translateX(100%);
  transition: transform var(--motion-panel-exit);
}
```

### Toast Notification

```css
/* Enter from bottom-right */
.toast {
  opacity: 0;
  transform: translateY(8px);
  transition:
    opacity var(--motion-default),
    transform var(--motion-default);
}

.toast.visible {
  opacity: 1;
  transform: translateY(0);
}
```

### Dropdown / Popover

```css
.dropdown {
  opacity: 0;
  transform: translateY(-4px) scale(0.98);
  transition:
    opacity var(--motion-feedback),
    transform var(--motion-feedback);
}

.dropdown.open {
  opacity: 1;
  transform: translateY(0) scale(1);
}
```

### Status Change Flash

```css
@keyframes statusFlash {
  0%   { background: var(--color-status-excellent-subtle); }
  100% { background: transparent; }
}

.status-changed {
  animation: statusFlash 600ms ease-out forwards;
}
```

### Skeleton Loading Shimmer

```css
@keyframes shimmer {
  0%   { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-neutral-100) 8%,
    var(--color-neutral-200) 18%,
    var(--color-neutral-100) 33%
  );
  background-size: 800px 104px;
  animation: shimmer 1.5s linear infinite;
}
```

---

## Reduced Motion

All animations must respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Reduced motion users should experience: immediate state changes, no slide animations, no shimmer, no motion-based feedback.

---

## Motion Anti-Patterns

| Avoid | Problem |
|-------|---------|
| Animations longer than 400ms for UI | Creates perceived slowness |
| Bouncing or elastic animations in data UI | Feels playful, not professional |
| Page-level transitions for every navigation | Expensive, disorienting |
| Animation for purely decorative purposes | Wastes attention |
| Motion that cannot be disabled | Accessibility failure |
| Simultaneous animations on multiple elements | Creates visual chaos |
