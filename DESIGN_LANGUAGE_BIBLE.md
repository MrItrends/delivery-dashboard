# Design Language Bible
**Version 1.0**

> Not design rules. This is Claude's creative director.

When engineering, design, AI and product disagree — **this document wins.**

---

## 01 — Purpose

This document defines the visual language of the Delivery Dashboard.

It is not a UI kit. It is not a design system. It is the **philosophy behind every visual decision**.

---

## 02 — Design Philosophy

The interface should disappear. The information should remain.

This product exists to help governments make decisions. Not admire interfaces.

Every visual decision should increase clarity. Never decoration.

The interface should feel:

```
Calm
Intentional
Confident
Architectural
Professional
Highly Crafted
Human
Timeless
```

**Never trendy.**

---

## 03 — What We Are Not

We are NOT:

- Material Design
- Bootstrap
- Tailwind Dashboard
- Ant Design
- Enterprise Software
- Glassmorphism
- Neumorphism
- Crypto Dashboard
- AI Landing Page
- Startup Template

Everything should avoid generic SaaS aesthetics.

---

## 04 — Our Design DNA

Imagine if these companies designed one product together:

**Figma / Linear / Notion / Apple / GitHub / Arc Browser**

That's our design DNA. Not their UI. Their **thinking**.

| Company | What We Take |
|---------|-------------|
| Figma | Clarity |
| Linear | Density |
| Notion | Calmness |
| Apple | Craftsmanship |
| GitHub | Information Architecture |
| Arc | Modern Interaction |

---

## 05 — First Impression

When someone opens the platform they should think:

> "This feels serious."
> "This feels trustworthy."
> "This feels modern."

Never: "This looks cool."

**Trust beats novelty.**

---

## 06 — Visual Hierarchy

```
Typography    creates hierarchy
Whitespace    creates rhythm
Alignment     creates order
Color         creates meaning
Icons         create recognition
Motion        explains change
```

Everything else is secondary.

---

## 07 — Typography Philosophy

**Typography is the interface. Not decoration.**

If all colors disappeared, the interface should still work.

**Primary Typeface:** PP Neue Montreal

Typography should feel: Editorial, Quiet, Confident, Highly Legible.

Avoid loud typography. Avoid oversized headings. Avoid tiny metadata. Everything should sit comfortably.

**Hierarchy:**
```
Display → Heading → Subheading → Body → Metadata → Caption
```

Never invent random font sizes.

→ Full specification: [design-language/typography.md](./design-language/typography.md)

---

## 08 — Color Philosophy

**White is the product. Not blue. Not gradients. White.**

Color exists only to communicate meaning.

| Role | Color |
|------|-------|
| Primary background | White |
| Secondary surface | Very Light Gray |
| Borders | Hairline Gray |
| Text | Near Black |
| Accent | Minimal Blue |
| Semantic | Green / Amber / Red / Neutral |

Never use color for decoration.

→ Full specification: [design-language/color.md](./design-language/color.md)

---

## 09 — Whitespace

Whitespace is not empty. **Whitespace is structure.**

Users should immediately understand hierarchy without reading.

Avoid huge empty areas. Avoid crowded layouts. The product should breathe.

---

## 10 — Density

**Information dense. Visually light.**

Every screen should contain lots of information — without feeling busy.

Think Linear. Not Salesforce.

---

## 11 — Borders

Borders organize. Not separate.

Use hairline borders with very soft contrast. Never heavy outlines.

---

## 12 — Shadows

Avoid floating interfaces. Use elevation sparingly.

```
Prefer: Border → Surface → Shadow
```

Shadows should almost disappear.

---

## 13 — Radius

Corners should feel **engineered**. Not playful.

**Use:** 4, 8, 12  
**Avoid:** 20, 24, 32, pill buttons, organic blobs

---

## 14–18 — Components

→ [design-language/components.md](./design-language/components.md)

Icons, Buttons, Tables, Charts, Cards.

---

## 19 — Motion

Motion explains. Nothing more.

**When to use:** Open, Close, Sort, Filter, Load, Success

**Duration:** 150–250ms. No bouncing. No exaggerated easing.

---

## 20 — Navigation

Navigation should disappear after one week. Users shouldn't think — they should know.

Global Navigation: fixed. Object Navigation: contextual. Avoid deep hierarchies.

---

## 21–23 — States

**Empty States:** Teach. Never apologize. Every empty state includes Purpose, Next Action, Documentation. Never display "No Data."

**Loading:** Skeletons. Always. Never blank pages.

**Errors:** Calm. Explain what happened, why, recovery. Never panic users.

---

## 24 — Copywriting

Short. Professional. Human.

Avoid: Technical language, Marketing language, AI language.

✓ Good: "Budget approval required."  
✗ Bad: "Oops! Looks like something happened."

---

## 25 — Accessibility

**Accessibility is visual quality. Not compliance.**

Readable typography. Keyboard focus. High contrast. Reduced motion. Logical order.

Everything accessible by default.

---

## 26 — Responsive Design

Desktop is primary. Tablet preserves workflow. Mobile prioritizes completion of individual tasks.

Never remove capabilities. Only reorganize them.

---

## 27 — AI Design Rules

→ [design-language/ai-rules.md](./design-language/ai-rules.md)

What Claude must never generate. What Claude must always prioritize.

---

## 28 — Design Review Questions

Before approving any screen ask:

1. Does typography carry the hierarchy?
2. Can color be reduced further?
3. Is the layout quieter?
4. Can one component be removed?
5. Can navigation become shallower?
6. Can editing happen inline?
7. Does this feel like software people work in for eight hours?
8. Would this still look modern in five years?
9. Would a Figma designer remove anything from this screen?

**If yes — remove it.**

---

## 29 — The Ten Commandments

1. Typography before color
2. Structure before decoration
3. Context before navigation
4. Tables before cards
5. White space before borders
6. Reuse before invention
7. Calm before clever
8. Data before dashboards
9. Collaboration before isolation
10. Timeless before trendy

---

## 30 — Final Manifesto

The Delivery Dashboard should never feel like software generated by AI.

It should feel like software that has matured through years of careful iteration.

Every screen should communicate confidence. Every interaction should feel inevitable. Every layout should prioritize information over interface.

The product should not impress through visual effects. **It should impress through clarity.**

If a user can spend an entire day inside the application without feeling overwhelmed, the design has succeeded.

If a government leader can understand the state of national delivery within minutes, the design has succeeded.

If a designer opens the product and cannot immediately identify which framework or template it came from, the design has succeeded.

**This is the standard every future screen, component, interaction, and feature must meet.**
