# First-Run Experience

> Enforces North Star §9. The interface teaches itself. A first-time user must never land in an empty room wondering what to do.

## The problem it solves

After sign-up the workspace is correctly empty (Demo Integrity). Without guidance, "empty" reads as "broken" or "overwhelming". The first-run experience turns the empty workspace into a guided path that ends with the user having tracked something real and understanding the model.

It is **not** a video, **not** a help centre, **not** a marketing tour. It is the interface explaining itself, briefly, and getting out of the way.

## Principles

- **Skippable always.** A "Skip" control is visible at every step. Skipping is never punished.
- **Teach by doing.** The user creates their *own* first records — no examples are created for them.
- **One idea per step.** Never show the whole system at once.
- **Stops the moment it's done.** Once the user has created their first Activity (or skips), the guide does not reappear.
- **Quiet, confident copy.** Written to the UX Writing Standard. No exclamation marks, no mascot.

## The path

A short, ordered journey that mirrors the delivery model (North Star §4):

```
Welcome  →  How delivery works  →  Create a Priority Area
        →  Add an Intervention  →  Add an Activity (assign + date)
        →  See it tracked  →  Generate a report  →  Done
```

### Step content (copy is final-quality, not placeholder)

1. **Welcome** — `Welcome to your delivery workspace.` / `This is where your government tracks what it is delivering. We'll set up your first priority in under two minutes.` · Actions: `Start` · `Skip for now`
2. **How delivery works** — a single, calm diagram: `Priority Area → Intervention → Activity`. One line each:
   - `Priority Area — a national priority you are focused on.`
   - `Intervention — a programme that delivers it.`
   - `Activity — the dated, assigned work that gets it done.`
   - Action: `Create your first priority area`
3. **Create a Priority Area** — opens the real create flow. Nigeria-first placeholder (e.g. `e.g. Primary Healthcare Access`). On save, advance.
4. **Add an Intervention** — within the priority area just created. Placeholder e.g. `e.g. Revitalise 774 PHCs`. On save, advance.
5. **Add an Activity** — within that intervention; require an owner and a due date (this is where accountability begins, deck p.11). On save, advance.
6. **See it tracked** — point to the colour-coded status and the roll-up: `This is how you'll see what's on track and what's behind.`
7. **Generate a report** — `When leadership needs a decision, generate a report from any level.` Action: `Finish` (report generation is optional, not forced).
8. **Done** — `You're set up. Add more priority areas, invite your team, and keep delivery moving.`

## Progress affordance

A small, dismissible **"Getting started" checklist** persists in a corner until complete, reflecting real state (ticks only when the real record exists):

- [ ] Create a priority area
- [ ] Add an intervention
- [ ] Add an activity with an owner and due date
- [ ] Invite a team member
- [ ] Generate a report

The checklist reads from the database (Demo Integrity §3) — a step is checked only when the user has genuinely done it. When all are complete, the checklist removes itself and does not return.

## State & re-entry

- First-run state is stored per user (e.g. `onboarding` store + a persisted `first_run_completed` flag on the profile).
- Completing or skipping sets the flag; the guide never auto-launches again.
- A user may re-open the guide deliberately from Help — but it is never forced twice.

## What it must not do

- Must not create example data on the user's behalf.
- Must not block the UI (the user can explore freely at any point).
- Must not use a separate "demo mode" with fake content.
- Must not exceed the path above — no 12-step product tour.

## Acceptance test

A brand-new user, given no instructions, reaches a tracked Activity they created and can explain — in one sentence each — what a Priority Area, an Intervention, and an Activity are. If they can't, the first-run experience has failed.
