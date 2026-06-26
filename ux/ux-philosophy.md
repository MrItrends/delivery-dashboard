# UX Philosophy

## The Single Principle

> Reduce the cognitive load of government delivery.

Government teams carry enormous responsibility. They are accountable for outcomes that affect millions of lives. Every confusing interface, every unnecessary click, every misplaced button adds cognitive load to people who are already doing extraordinarily difficult work.

The Delivery Dashboard is not a software product with government features. **It is a delivery tool designed for the pressure of governance.**

---

## The Four Beliefs

### 1. Interface is Invisible When It Works

The best interface is the one users stop noticing. When someone opens an Intervention and immediately understands what is happening, what needs action, and what is blocked — the interface has succeeded. When they have to think about how to use the software instead of thinking about delivery — it has failed.

### 2. Complexity Lives in the Data, Not the Interface

Government delivery is genuinely complex. The platform must handle thousands of activities, multiple funding sources, cross-ministerial dependencies, and decades of institutional history. The interface should absorb that complexity and present it calmly.

A busy, cluttered screen does not reflect complex work. It reflects a failure to design.

### 3. Every Second of Confusion is a Second Spent Not Delivering

For a senior civil servant with forty high-priority activities across three ministries, a confusing interface is not a mild inconvenience. It is an actual barrier to national delivery.

### 4. Good Design Is a Democratic Act

If the software looks and works like a proper professional tool, it signals respect for the users. Government officials should not be expected to work with inferior software simply because they are in the public sector.

---

## Design Influences

| Product | What We Learn From It |
|---------|----------------------|
| Linear | Speed, keyboard-first workflows, calm design |
| Figma | Contextual inspection, collaborative presence |
| Notion | Progressive disclosure, flexible structure |
| Arc Browser | Persistent context, spatial organization |
| Stripe | Typography-led design, information density |
| GitHub | Contextual detail, activity history |

**What we never borrow from:**
- Bootstrap-styled admin templates
- Material UI government systems
- Enterprise legacy software aesthetics
- Modal-heavy workflows
- Form-centric interfaces

---

## Design Anti-Patterns

| Anti-Pattern | Problem |
|-------------|---------|
| "Loading" spinner for everything | Signals the interface doesn't trust itself |
| Full-page modals for simple actions | Breaks spatial context |
| Nested dropdowns for navigation | Hides information behind interaction |
| Separate detail pages for every object | Destroys context by leaving the page |
| Mandatory fields for every creation | Slows momentum; optimize for quick creation |
| Inconsistent icons for the same action | Forces users to re-learn continuously |
| Empty screens with no guidance | Abandons new users |
| Toast notifications for critical errors | Insufficient visibility for important information |

---

## The UX Test

Before any screen is considered complete, it should answer:

1. Does a new user understand what this is in 10 seconds?
2. Can an experienced user navigate this screen without reading any labels?
3. Does every element justify its presence?
4. Does the most important information have the most visual prominence?
5. Does completing the primary action feel natural?

If any question is answered "no," the screen requires revision.

---

## Progressive Disclosure

Information reveals in layers:

```
Summary (Always visible)
  ↓
Context (On demand)
  ↓
Evidence (When needed)
  ↓
History (For audit)
```

Users should never be overwhelmed with the full detail of an object when they first encounter it.

---

## Collaboration Principle

The interface should always communicate:
- Who owns this
- Who is working on it right now
- What changed and when
- What needs a decision

**Without asking a colleague.**

---

## Accessibility

Accessibility is not a feature. It is a product requirement.

Government platforms must be WCAG AA compliant. Many users are working in high-stress, low-attention conditions, on older hardware, with varying abilities and languages.

- Full keyboard navigation
- Screen reader support
- Color contrast AA minimum
- Touch target minimums (44px)
- Reduced motion support
- High contrast mode
