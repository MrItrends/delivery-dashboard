# Screen Review Checklist & Manifesto

## Screen Review Checklist

Before approving any screen, ask every question. A "no" or "unsure" answer means the screen is not ready.

---

### 1. Is there one obvious starting point?

A user who has never seen this screen before should immediately know where to look first. If the eye can go anywhere — if nothing pulls attention — the composition lacks hierarchy.

**Test:** Show the screen to someone for 3 seconds. Ask: "Where did you look first?" If they can't answer, or if they looked somewhere unexpected, the hierarchy is wrong.

---

### 2. Is the primary purpose immediately clear?

Within five seconds, a user should be able to say what this screen is for. Not what every element is, but the one thing the screen exists to accomplish.

**Test:** Cover everything below the fold. Does the visible portion communicate the primary purpose? If not, the header or summary section needs revision.

---

### 3. Does the composition guide the eye naturally?

The eye should move from the title, to the status/summary, to the primary content, to supporting content — without requiring conscious redirection. If the eye jumps sideways, gets stuck on decoration, or requires searching, the visual flow is broken.

**Test:** Trace where you naturally look on the screen, in order. Does the sequence match: title → status → primary content → support?

---

### 4. Can any section be removed?

Every section must earn its place. If a section can be removed without the primary purpose of the screen being affected, it should be removed.

**Test:** Cover each section with your hand. Does the screen still work without it? If yes, question whether it belongs.

---

### 5. Is the supporting information visually subordinate?

Supporting panels, metadata, history, and secondary analytics should be visually lighter than primary content — smaller text, reduced contrast, less visual weight. If supporting information competes with primary content for attention, it is not supporting.

**Test:** Half-close your eyes and look at the screen. What dominates? That should be the primary content, not a sidebar.

---

### 6. Are tables given enough space?

Tables are the primary work surface. They should occupy 100% of the available horizontal space in the workspace area. Column widths should allow text to breathe. Row heights should respect density settings.

**Test:** Is there room to add 3 more columns without horizontal scrolling? If not, consider what can be hidden by default.

---

### 7. Is the Inspector used instead of another page?

If the user clicks a row item and is taken to a new page, ask: should this be an Inspector instead? Full pages are only justified for primary destination objects (Interventions, Projects, Priority Areas). Everything else should open in an Inspector panel.

**Test:** Could this new page be an Inspector without losing functionality? If yes, it should be.

---

### 8. Does whitespace organize information?

Whitespace between sections communicates that sections are distinct. Whitespace within sections communicates that content is grouped. If sections feel merged, or if content feels unrelated to its section, the spacing is wrong.

**Test:** Remove all borders and backgrounds. Does the layout still communicate which content belongs together? If not, add space before adding structure.

---

### 9. Are actions located beside the information they affect?

The "Add Milestone" button belongs near the milestone list, not in the page header. The "Mark Complete" button belongs next to the activity status, not in a global toolbar.

**Test:** For each action on the page, look at where the user's eyes will be when they want to perform that action. Is the button there?

---

### 10. Would this layout still work with 10× more data?

The current state may have 5 activities. The production state may have 500. Does the layout accommodate growth without breaking?

**Test:** Imagine the list filled with 500 items. Does the table virtualize? Does the header remain stable? Does the filter system still work?

---

## The Composition Manifesto

The Delivery Dashboard should not feel like a collection of pages.

It should feel like a **single, continuous workspace** — where every screen inherits the same visual grammar, every object occupies a familiar location, every action feels expected, and every panel has a clear purpose.

### The Product Principle

**Users should never think about layout. They should think about delivery.**

When a user moves from a Portfolio to a Project, from a Project to an Intervention, and from an Intervention to an Activity — they should not need to relearn the interface. The breadcrumb changes. The title changes. The tab content changes. The composition does not.

This consistency is not achieved by making every screen identical. It is achieved by making every screen follow the same visual grammar. The grammar is:

1. Context tells you where you are
2. Headers tell you what this is
3. Tabs tell you how to explore it
4. Tables tell you what is happening
5. Inspectors tell you the detail without removing context
6. Drawers create without navigating away

### The Standard

**Every screen should feel inevitable** — as though it could only have been arranged this way. Not because the designer lacked imagination, but because every decision was made in service of the user's task. The layout has no waste. No decoration. No compromise.

The highest compliment for a screen in this product is not that it is beautiful. It is that it is **clear** — that a government official can open it, understand it, and act on it without being taught how.

If any screen requires training, the composition has failed.

If any screen requires visual scanning to find a starting point, the hierarchy has failed.

If any screen feels different from the screens around it, the grammar has failed.

Build screens that a senior civil servant could use confidently on their first day. That is the standard. Measure everything against it.
