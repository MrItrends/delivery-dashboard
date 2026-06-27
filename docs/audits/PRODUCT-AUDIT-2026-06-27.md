# Product Audit — Whole app vs North Star — 2026-06-27

Auditor lens: `product-auditor`. Judged against `docs/NORTH_STAR.md`. First audit after the constitution was written.

## Verdict

The engine is sound: a real Supabase-backed hierarchy with CRUD, collaboration, search, and a live reporting engine — all built on the correct design system. But the product currently **contradicts the North Star in four structural ways**: it ships fake data, invents eight roles where the deck defines four, defaults to the UK rather than Nigeria, and carries navigation that leads nowhere. None of these are deep — they are corrections, not rebuilds — but they are the difference between "a believable national delivery platform" and "a polished demo with seams". The biggest risk is **trust**: the first fake number or dead-end menu a Permanent Secretary hits, they stop trusting the screen.

## Findings

### Demo integrity (North Star §7, `DEMO_INTEGRITY.md`)
- **[BLOCKER] Seeded demo delivery data.** `apps/web/supabase/migrations/0002_auth_and_seed.sql` inserts a demo workspace, portfolio, priority area, project, intervention, 5 activities, milestones, targets, risks, decisions. This is exactly the fake data the client forbade.
  - Fix: split the migration — keep `handle_new_user()` (creates the user's *own* profile/workspace on sign-up, which is real), drop all example delivery records. New accounts start empty.
- **[BLOCKER] Mock arrays in the frame.** `apps/web/src/components/layout/navConfig.ts` ships `PINNED_ITEMS`, `RECENT_ITEMS`, `NOTIFICATIONS`, `WORKSPACES`, `CURRENT_WORKSPACE` — hardcoded fake projects, reports, people, and notifications rendered in the sidebar/switcher.
  - Fix: render pins/recents/notifications/workspace from the database (recents already exist via `lib/data/recents.ts`; notifications via `useNotifications`). Remove the mock constants. Where there is genuinely nothing to show yet, show an empty/teaching state.
- **[MAJOR] Fallback user identity.** `UserMenu.tsx:12` `FALLBACK_USER = { name: 'Ahmed Yusuf', email: 'ahmed.yusuf@gov.uk' }` renders a fake person before the real session loads.
  - Fix: render nothing (or a neutral skeleton) until the real profile resolves.

### Canonical model / over-engineering (North Star §4, §6)
- **[BLOCKER] Eight roles instead of four.** `lib/onboarding/options.ts` `ROLES` (executive, portfolio-manager, programme-manager, project-manager, delivery-team, finance, observer, administrator) and `lib/data/admin.ts` `ROLE_OPTIONS` invent a role system the deck doesn't have. The deck (p.23) defines **Admin · Priority Area Lead/Co-Lead · Intervention Lead/Co-Lead · Regular User**. `docs/architecture/11-user-roles.md` (seven roles) is also wrong against the deck.
  - Fix: collapse to the four canonical roles (with co-lead variants) everywhere — onboarding cards, team role selector, and the future RBAC layer. This *is* slice 7, correctly scoped.
- **[MAJOR] Two parallel permission vocabularies.** `INVITE_PERMISSIONS` (view/edit/manage/admin) and `ROLES` (8 titles) coexist. Two ways to say "what can this person do" is false complexity.
  - Fix: one model — role determines capability (deck model). Remove the separate access-level concept or map it 1:1 to the four roles.
- **[MINOR] Generic strategic/sector option sets.** `SECTORS`, `STRATEGIC_THEMES` are Whitehall-flavoured ("Net Zero", "Justice & Home Affairs"). Acceptable as options, but defaults and examples should be Nigerian.

### Nigeria-first (North Star §3)
- **[BLOCKER] UK defaults throughout.** `COUNTRIES` lists United Kingdom first (Nigeria 11th); `LANGUAGES` defaults English (UK); `TIMEZONES` lists London first (Lagos 4th). Email placeholders are `@department.gov.uk` / `you@department.gov.uk` in `signup`, `login`, `forgot-password`, and `InviteList.tsx:63`.
  - Fix: Nigeria first in every list (country, timezone Africa/Lagos, currency Naira); email placeholders → `firstname.lastname@health.gov.ng` style; default currency ₦.

### Dead-end navigation (North Star §6 — "every menu item is a promise")
- **[MAJOR] Three menu items, one destination.** `UserMenu.tsx` routes **Preferences**, **Appearance**, and **Workspace settings** all to `/settings`. The client named this exact problem.
  - Fix: either give each a distinct, meaningful destination (e.g. Appearance scrolls to the appearance section) or remove the duplicates. Prefer removal.
- **[MINOR] Inconsistent shortcut entry.** UserMenu "Keyboard shortcuts" fires a toast, but a real `/shortcuts` page now exists.
  - Fix: route it to `/shortcuts`.

### First-run experience (North Star §9, `FIRST_RUN_EXPERIENCE.md`)
- **[MAJOR] No first-run guidance.** Onboarding collects setup, then drops the user into an (correctly) empty workspace with no teaching path. Combined with removing the seed, an unguided empty app reads as broken.
  - Fix: build the first-run path + "Getting started" checklist from `FIRST_RUN_EXPERIENCE.md`. This must land *with* the seed removal, not after.

### Copy (North Star §8) — see the `ux-writing-auditor` pass for the full list
- Spot checks are mostly good (empty states already follow "fact + next action"). Run a full `ux-writing-auditor` sweep; known offenders: any `toast.success('… successfully')`, the fake-friendly bits, and UK placeholders above.

## Keep (working as intended — do not "improve" away)
- The Supabase hierarchy, CRUD + archive, and the config-driven entity engine.
- The reporting engine (live composition by scope, narrative, publish, PDF/CSV) — directly serves "what decision should leadership make?".
- Comments/mentions/notifications/realtime and Storage-backed documents.
- Global search + ⌘K with ranking, highlighting, and recents.
- The design system and restrained visual language — the UI is the source of truth; do not redesign.

## Recommended order of work (blockers first)
1. **Demo integrity + first-run together**: strip the `0002` seed and the `navConfig` mocks; build the first-run path so the empty app teaches. (Ships as one coherent change.)
2. **Nigeria-first pass**: countries/timezones/currency/email placeholders/examples.
3. **Collapse roles to four** (onboarding + team + admin), retiring the parallel permission vocabulary — then build RBAC enforcement on the correct model (the re-scoped slice 7).
4. **Fix dead-end navigation** (UserMenu duplicates, shortcuts route).
5. **Full `ux-writing-auditor` sweep** and fixes.
6. Reconcile the stale `docs/architecture/11-user-roles.md` / `12-permissions.md` to the four-role model (or mark them superseded by the North Star).
