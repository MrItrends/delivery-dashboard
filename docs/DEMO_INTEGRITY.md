# Demo Integrity Rules

> Enforces North Star §7. Subordinate only to `NORTH_STAR.md`. The product must behave like real software, which starts empty and fills with the user's own work.

## The principle

A real platform has no data until someone creates it. Fake data is a lie the user eventually catches — and the moment they do, they stop trusting every number on the screen. We never spend that trust.

**Empty but useful, never fake.**

## Hard rules

1. **No seeded fake records.** No demo projects, interventions, activities, reports, milestones, targets, financiers, comments, or notifications inserted on behalf of the user.
2. **No mock arrays in the UI.** No hardcoded lists of pinned items, recent items, notifications, workspaces, team members, or KPIs in component or config files. Everything renders from the database.
3. **No fabricated metrics.** Every count, percentage, chart, health roll-up, and budget figure is computed from real records. If there are no records, the metric shows an empty/teaching state — not a plausible-looking number.
4. **No lorem ipsum, no placeholder prose** rendered as if it were real content.
5. **Reports are generated from actual records only.** A report with no underlying data says so; it does not invent a summary.
6. **The only acceptable "example" content** is clearly-labelled placeholder text *inside an input* (e.g. a form field `placeholder`) that disappears on typing, and uses Nigeria-first examples (North Star §3).

## What "empty but useful" looks like

When a screen has no data, it must teach — state what the object is, why it matters, and the single action to create the first one:

- `No priority areas yet. Create one to define what this government is focused on delivering.`
- `No interventions yet. Create one to begin tracking delivery.`
- `No reports yet. Generate a report to brief leadership.`

Empty states are written to the UX Writing Standard. They are a feature, not a fallback.

## Allowed seed (the only exception)

A brand-new account may be bootstrapped with **structure, not content**: the user's own workspace, their own profile, and their own membership — created from *their* sign-up details, for *them*. That is real data about a real user, not fake delivery data. No example projects ride along with it.

## The walk-through test

A new person must be able to: sign up → see a guided, empty workspace that teaches → create a Priority Area → an Intervention → an Activity → assign and date it → watch it roll up into health and a report — **without ever seeing a record they did not create.** If at any point they see data that isn't theirs, demo integrity is broken.

## Migration note (current debt)

`apps/web/src/components/layout/navConfig.ts` still ships mock arrays (`PINNED_ITEMS`, `RECENT_ITEMS`, `NOTIFICATIONS`, `WORKSPACES`, `CURRENT_WORKSPACE`) and `0002_auth_and_seed.sql` seeds a demo project and children. Both violate these rules and are scheduled for removal — see the audit. Until removed, treat them as known defects, not as patterns to copy.
