# North Star — The Platform Constitution

> This is the highest-authority document in the repository. It sits **above** the Product Bible, the Design Bible, and every implementation prompt. When any other document, prompt, or instinct conflicts with this one, this one wins. Read it before starting any task.

Source of truth: **TBI Delivery Dashboard — Walkthrough deck (COGD, Feb 2023)** and the client brief. Where the older `docs/` set disagrees with the deck, the deck wins and the older doc is wrong.

---

## 1. What this product is

**A national delivery platform for government.** A secure, single-source-of-truth system that helps a government *plan, track, and monitor large-scale projects* — and know, at any moment, what is on track, what is behind, who owns it, and what decision is needed.

It is built on **TBI's Delivery Framework**, which exists to do three things:

1. **Prioritisation** — focus effort on a small number of tangible goals.
2. **Planning & resourcing** — make it clear how those goals will be reached, and with whose money.
3. **Performance management** — keep delivery moving and hold people accountable.

That is the entire job. Everything we build serves one of those three functions or it does not belong here.

## 2. What this product is NOT

It is **not** a generic project-management tool. It is not Monday, ClickUp, Linear, Jira, Asana, or Notion. We do not borrow their feature lists. Borrowing a feature from those tools is a red flag, not a shortcut — stop and ask whether a government needs it to deliver.

We do not add capabilities because they are common in SaaS. We add them because a Permanent Secretary, a Minister, or a delivery lead in a state government cannot answer a delivery question without them.

## 3. Nigeria first

This is for the Federal Government of Nigeria and Nigerian state governments. The product must *feel* designed for Nigeria — not "generic government", not UK/Westminster.

- **Default country: Nigeria.** Other countries may be selectable, but Nigeria is the default and the frame of reference.
- **Examples and seeds use real Nigerian institutions:** Federal Ministry of Health, Federal Ministry of Education, Federal Ministry of Works, NPHCDA, NITDA, NERC, FCTA, Lagos State Government, Kaduna State Government, Jigawa State Health Board, etc.
- **Emails use Nigerian government domains:** `firstname.lastname@health.gov.ng`, `name@nphcda.gov.ng`, `pm@education.gov.ng`, `delivery@works.gov.ng`. **Never** `@department.gov.uk` or `@institute.global` as a user-facing placeholder.
- **Money is Naira (₦)** by default, with currency selectable per dashboard.
- Terminology leans Nigerian where the framework allows (Ministries, Departments and Agencies — "MDAs"; Federal and State levels), not Whitehall.

## 4. The canonical model (from the deck — do not invent beyond it)

### Hierarchy
The TBI data structure is:

```
Dashboard (Workspace)         — language, currency, type
  └── Priority Area           — the national priorities (supports multiple levels)
        └── Intervention / Project   — the programmes that deliver a priority
              └── Activity      — the assignable, dated unit of work
```

Attached to interventions/projects: **Targets / KPIs**, **Financials (budgets & financiers)**, **Milestones**.

> The current app implements `Workspace → Portfolio → Priority Area → Project → Intervention → Activity`. Treat **Portfolio** as the deck's "Priority Area, advanced multiple levels" grouping, and **Project → Intervention** as a two-level read of the deck's "Intervention / Project". This mapping is **locked** — do not re-architect the hierarchy; carry it forward. Do not add new levels.

### The two dashboard types (deck, p.16–19)
- **Activity Tracker** — activities only: who is responsible, when it is due. No budgets, targets, or KPIs. For internal task tracking.
- **Full Dashboard** — everything: budgets, targets, milestones, KPIs, roles, approvals.

A dashboard is one or the other. We do not show budget/target machinery on an Activity Tracker.

### Roles — there are FOUR (deck, p.23). Not seven. Not eight.
| Role | Owns | Can |
|---|---|---|
| **Admin** | The dashboard | Full access to priority areas & interventions; **approve / reject milestones**; manage financiers; manage users |
| **Priority Area Lead / Co-Lead** | One priority area | View their priority area; manage its users; create/edit actions & milestones |
| **Intervention Lead / Co-Lead** | One intervention | View their intervention; manage its users; create/edit actions & milestones |
| **Regular User** | Their own actions | Update their own actions; **raise issues** within their intervention; no edit rights elsewhere |

Approval flows up: a Lead creates/edits milestones; an **Admin approves or rejects** them. That is the "pass it to another level to approve" the client described. Any role beyond these four must be justified against the deck in writing, or it does not ship.

### Two means of performance management (deck, p.19)
- **Action Tracker** — day-to-day actions arising from problem-solving and issue escalation, assigned to one person with a deadline.
- **Milestones** — longer-term outcomes, tracked by (1) activity implementation against planned dates and (2) actual results (data vs targets).

## 5. Every screen answers one government question

A page exists only if it answers a single, important delivery question. If it doesn't, it should not exist.

| Level | The question it answers |
|---|---|
| Workspace / Home | Are we delivering as a government? |
| Portfolio | Which national priorities need attention? |
| Priority Area | Which programmes under this priority are succeeding? |
| Project | Which interventions are behind? |
| Intervention | What is blocking delivery? |
| Activity | What should the team do today? |
| Report | What decision should leadership make? |

**And every screen must reduce uncertainty.** Government delivery is the management of uncertainty: what is behind, what is blocked, who owns it, what decision is needed, what happens next. If a screen leaves the user with more questions than answers, it is not finished.

## 6. Simplicity — every navigation item is a promise

- **Every menu item is a promise to the user.** If it exists, it must open something meaningful and distinct. Items that lead nowhere, or three items that all lead to the same screen, are broken — fix or remove them.
- Do not create settings, tabs, or sections as placeholders. No "Advanced", "API", "Integrations" unless they do something today.
- Prefer fewer screens that answer their question completely over many thin screens.
- When in doubt, remove. False complexity is worse than a missing feature.

## 7. Demo integrity — empty but useful, never fake

Real software starts empty. This product must too.

- **No dummy data.** No seeded fake projects, fake reports, fake users, fake KPIs, fake metrics, fake notifications, lorem ipsum, or placeholder charts pretending to be real.
- Every number, chart, and report is computed from **records the user actually created**.
- When there is no data, the screen **teaches** (what to create and why) — it does not fabricate.
- A real person must be able to walk from sign-up to a tracked activity and understand the product, never once seeing something that isn't theirs.
- Multiple users sign up, invite each other, and collaborate. It behaves like an actual platform — because it is one.

See `docs/DEMO_INTEGRITY.md` for the enforceable rules.

## 8. No AI slop — write like a senior product team

The product's voice is confident, plain, and government-appropriate — Stripe / Linear / Figma, not chatbot.

- Never sound like AI. No filler, no marketing copy inside the product, no forced friendliness, no exclamation marks.
- Action-oriented labels: **"Create project"**, not "Let's create your first amazing project!"
- Empty states state the fact and the next action: **"No interventions yet. Create one to begin tracking delivery."** — not "Looks like nothing's here yet!"
- Would a Permanent Secretary or a delivery lead in Kaduna read this and know exactly what to do? If not, rewrite it.

See `docs/UX_WRITING_STANDARD.md` for the full standard, and the `ux-writing-auditor` skill to enforce it.

## 9. First-run experience

After sign-up, the user must not land in an empty room wondering what to do. The interface teaches itself — a short, skippable guided path (not a video, not a help centre): Welcome → how delivery works → create your first Priority Area → Intervention → Activity → see it tracked → Reports. See `docs/FIRST_RUN_EXPERIENCE.md`.

## 10. How to use this document

Before building, auditing, or writing copy, ask the questions in §5–§9. Two skills enforce this constitution:

- **`product-auditor`** — judges whether what exists helps governments deliver, reduces complexity, answers its question, and is necessary. Senior principal-designer standard.
- **`ux-writing-auditor`** — judges every user-facing string against §8 and the UX writing standard.

If a proposed change cannot be defended against this document, do not build it.
