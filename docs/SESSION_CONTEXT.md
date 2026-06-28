# Session Context — handoff for continuing in a new chat

A self-contained summary of where the TBI Delivery Platform stands, so work can resume without the prior chat. Read `docs/NORTH_STAR.md` first — it is the constitution.

_Last updated: 2026-06-28._

## 1. What this is
A **national delivery platform for the Government of Nigeria** (built for TBI). It helps government plan, track, and monitor large-scale programmes so leadership always knows what is on track, what is behind, who owns it, and what decision is needed. Built on TBI's Delivery Framework (prioritisation, planning & resourcing, performance management). **Not** a generic PM tool.

The governing documents (highest authority first):
- `docs/NORTH_STAR.md` — the constitution (Nigeria-first; canonical model; every screen answers one government question; simplicity; demo integrity; no AI slop).
- `docs/UX_WRITING_STANDARD.md`, `docs/DEMO_INTEGRITY.md`, `docs/FIRST_RUN_EXPERIENCE.md`.
- Source of truth for the product model is the **client deck** (`Delivery Dashboard - Walkthrough_01.pdf`, text at `Downloads/walkthrough_text.txt`), not the older `docs/` set.
- Enforcement skills: `.claude/skills/product-auditor`, `.claude/skills/ux-writing-auditor`. Audit on file: `docs/audits/PRODUCT-AUDIT-2026-06-27.md`.

## 2. Canonical model (locked)
- **Hierarchy:** `Workspace → Portfolio → Priority Area → Project → Intervention → Activity`. Do not re-architect or add levels.
- **Four roles only:** Admin · Priority Area Lead/Co-Lead · Intervention Lead/Co-Lead · Regular User. Implemented in `apps/web/src/lib/data/roles.ts` (`normalizeRole`, `capabilitiesFor`, `useCapabilities`).
- **Two dashboard types** (deck): Activity Tracker vs Full Dashboard.
- Nigeria-first: default country Nigeria, timezone Africa/Lagos, Naira (₦); `.gov.ng` email placeholders; real MDA examples.

## 3. Stack & repo
- `apps/web` — Next.js 14 (App Router), TypeScript strict, CSS Modules, design tokens in `apps/web/src/styles/tokens.css` (do not redesign the UI).
- **Supabase** is the single source of truth (Postgres + Auth + Storage + Realtime). Clients: `lib/supabase/{client,server,admin}.ts`. Data fetching via TanStack React Query; state via Zustand.
- Repo: github.com/MrItrends/delivery-dashboard (private). Deployed on Vercel (root `apps/web`, npm). Verify locally with `npx next build` (sandbox disabled).
- Commits end with `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`; sign with `-c commit.gpgsign=false`. Branch: `main`.

## 4. What is built (working, on real data)
- **Auth** (Supabase) + middleware route protection + AuthProvider.
- **Hierarchy CRUD + archive/restore** via a config-driven engine: `lib/data/{crud,useEntity,entities}.tsx`, `components/entity/{EntityCollection,EntityDetail,EntityFormDrawer,GlobalCreateDrawer}`. Routes: `/portfolio` (custom), `/priority-areas`, `/projects`, `/interventions` (generic) + `[id]` detail; activities are leaf (inside intervention detail).
- **Create from anywhere:** header Create menu (`CreateMenu` → `GlobalCreateDrawer`); parent is optional and auto-provisioned (`ensureParentId` in `lib/data/setup.ts`) so an empty workspace never dead-ends.
- **Home `/`** rebuilt on live data (`components/workspace/HomeView.tsx`, `lib/data/home.ts`): summary counts, needs-attention, my activities, recent activity; first-run welcome + "Getting started" checklist when empty.
- **Reporting engine:** `/reports` + `/reports/[id]` (`components/reports/ReportViewer`, `lib/data/reportCompose.ts`) — composes live data by scope, editable narrative/recommendations, publish, PDF (print) + CSV export.
- **Global search:** `searchAll` across 9 sources with ranking; live in ⌘K command palette (results + highlight + recents) and `/search` (filters + highlight). `lib/data/{search,recents}.ts`, `lib/highlight.tsx`.
- **Collaboration:** comments + @mentions → notifications, realtime, Storage-backed documents. Realtime on the hierarchy lists. Invited people join the SAME workspace: `workspace_invites` table + sign-up trigger consume + `app/api/invite` route sends email via service-role admin API. Team page invites + role management (admin only).
- **Calendar:** `/calendar` (`components/calendar/CalendarView.tsx`, `lib/data/calendar.ts`) — Month/Week/Day grid + List/Card agenda driven by real `due_date` on activities and milestones.
- **First-run coachmark tour:** `lib/coachmarks/tour.ts`, `components/coachmarks/Coachmarks.tsx` — spotlight tour, auto-starts once, replay from Help.
- **Settings / Profile / Team / Notifications / Audit / Help / Shortcuts / Status / Release-notes / 403 / offline** pages — all real.
- **RBAC:** `useCapabilities()` gates create/edit/archive/approve/manage across the app (regular = read-only; leads create/edit; admin manages people/workspace/approvals).
- **Branding:** logomark is `public/tbi-logo.png` (28×28) via `components/auth/Logo.tsx`. Wordmark "TBI Digital Delivery".

## 5. Database migrations (run in order in Supabase SQL editor)
`0001_init` schema · `0002_auth` profile trigger (no seed) · `0003_realtime` · `0004_documents` + Storage policy · `0005_remove_demo_seed` (clears old demo data) · `0006_workspace_currency` (Naira) · `0007_rbac_rls` (workspace-member RLS; backfills memberships first) · `0008_collaboration` (invites + auto-join + realtime) · `0009_due_dates` (adds `due_date` to activities/milestones for the calendar).
Also need: a private Storage bucket `documents`; env vars `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (client + Vercel) and `SUPABASE_SERVICE_ROLE_KEY` (Vercel only, for invite emails); Supabase email/SMTP for invite emails; email-confirm OFF for smooth demo sign-up.

## 6. Demo integrity (non-negotiable)
No dummy data. The platform starts empty and fills only with records the user creates (the only allowed seed is the user's own workspace, created at onboarding via `provisionWorkspace`). Empty states teach. Do not reintroduce mock arrays.

## 7. Current direction — NEW (2026-06-28): rebuild the recognisable screens
Client feedback (voice notes; assistant cannot transcribe audio — get gist from the human): the screens don't yet resemble the **original TBI Delivery Dashboard** the client knows (taken down; she wants the same experience back, better, on our design system, to present to clients). Rebuild screen by screen from her screenshots.

**Model decision (made 2026-06-28, from deck + screenshots):** the client's model is **Priority Area → Intervention → Activity**. "Project" and "Intervention" are the SAME level in the deck ("Interventions / Projects"); **Financiers, Targets, Budget/Spent, Lead/Co-Lead live on the Intervention**, and the **Priority Area aggregates** them. Our DB keeps its hidden Project level (transparent via `ensureParentId`) — no schema rewrite; the UI presents PA → Intervention.

**The two reference screens:**
1. **Full Dashboard = Priority Areas overview**: a grid of cards, one per priority area — % complete bar; Financing (Budget ₦, % funded, % spent); Intervention count + Current activities; a colour-coded activity **donut** + legend (Overdue/Completed/Ongoing/Open issue/Pending); Lead + Co-Lead. Landing/overview after creating a priority area.
2. **Collaboratively Plan Projects = Intervention planning form**: numbered (1.1), with Lead, Co-Lead, Programme, Classification, Region, Status, Description, Budget, Currently spent + **Financiers** table (Name, Finance method, Procurement method, Amount) + **Targets** table (Target amount, Start amount, Unit, Start date, Deadline).

**STEP 1 DONE (2026-06-28):** Priority Areas overview cards shipped — `components/priority-area/PriorityAreaCards.tsx` (+ donut), `lib/data/priorityAreaOverview.ts` (aggregates per PA from interventions/activities/financiers), wired at `/priority-areas` with a Cards/List toggle (cards default; List = existing table). Create gated by role; realtime. `0010_delivery_fields.sql` adds priority_areas.co_lead; interventions co_lead/spent/programme/classification/region/ref; financiers table; targets.intervention_id. PA form now uses Lead/Co-Lead.

**Decisions (2026-06-28, confirmed by client):**
- **Full-page editors** for the create journey (Notion/Linear style), not modals. Save → land in the new item's workspace.
- **All five levels** are real creation steps: Portfolio → Priority Area → Project → Intervention → Activity (the deck was the taken-down product; five levels judged more intuitive). Earlier "collapse to 3" is superseded.
- **Status is derived automatically** from activity progress + deadlines — the manual Health/Budget/Target dropdowns were removed from the forms. **Budget (total) and Amount spent are user-entered figures** (on interventions; PA/portfolio aggregate).
- Priority Area form fields: pending the client's PA editor screenshot.

**STEP 2 DONE (2026-06-28): full-page creation journey.** `components/entity/EntityEditor.tsx` + route `app/new/[entity]/page.tsx` — a full-page editor for every level; Save navigates to the item's detail/workspace (activity → its intervention). All create entry points now route to `/new/[entity]` (header Create menu, Priority Area cards, lists, Portfolios, Home welcome); edit still uses the drawer. Forms cleaned to real fields (no invented status selects); intervention form matches screenshot 2's scalar fields (Ref, Lead, Co-Lead, Programme, Classification, Region, Status, Budget, Amount spent). `GlobalCreateDrawer` is now unused.

**STILL TO DO (needs screenshots / next):**
- Intervention editor's **Financiers + Targets sub-tables** (screenshot 2) — data layer ready (financiers table; targets.intervention_id; 0011 will add target start_amount/start_date/deadline). Build as a bespoke full-page intervention editor.
- **Derived-status rollup across all views** (lists, detail headers, home) from descendant activities — currently only the PA cards derive; new items default to healthy (correct when nothing is overdue) until this lands.
- **Activity Tracker** screens (Current/Open issues/Assigned to me/Archived tabs; progress bar; columns Title/Team/Category/Assigned to/Deadline/Status/Days/Created; the activity detail with members + % complete + updates; the colour-coded status summary with upcoming/overdue/raised/completed).
- **Priority Area editor** exact fields (await screenshot).
- Run migrations through **0010** (and 0011 when added).

Open follow-ups (optional): onboarding-step invites don't email at that moment (Team page does); per-row "edit your own actions" for Regular users (currently read-only); a background task exists to remove unrouted mock components (`components/{portfolio,priority-area,project,intervention,workspace}` leftovers + `lib/mock`) while keeping the `.module.css` files live code imports.

## 8. How to continue
1. Read `docs/NORTH_STAR.md`, then this file.
2. For each screen the client shares: study the screenshot, identify the government question it answers, rebuild it with existing primitives + tokens to resemble the original, on live Supabase data. Run `product-auditor` and `ux-writing-auditor` before/after.
3. Build green (`npx next build`), commit with the trailer, push to `main`.
