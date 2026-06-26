# TBI Digital Delivery — Product Audit (Phase One)

Date: 2026-06-26 · Auditor: completion team · Scope: `apps/web` (Next.js 14)

This is a grounded audit from reading the codebase, not from memory. Every
unfinished interaction is treated as a bug.

---

## 0. Headline

The app is a **visually complete, front-end-only prototype**. Every screen is
beautiful and consistent, but **nothing persists and nothing is connected**:

- **No backend exists.** `apps/` contains only `web`. There are **no API routes**,
  no database, no server. A repo-wide search for `fetch(/api`, `useQuery`,
  `useMutation`, `axios` returns **zero** hits.
- **All data is mock.** Every screen renders from `lib/mock/*.ts`. Nothing is
  read from or written to a store of record.
- **Auth is simulated.** Login resolves with a `setTimeout`; there is no session,
  no JWT, no route protection, and `useAppStore.user` is **never populated**.
- **81 interactions are placeholders** (`toast.info(... coming soon)`) across 20
  files — buttons that look real but do nothing.
- **6 of 11 primary nav destinations are dead (404).**

"Production-ready" therefore requires real work in four layers, not cosmetic
fixes: **persistence, data wiring, auth/permissions, and the missing pages.**

---

## 1. Dead routes & broken navigation (404s)

Routes that exist: `/`, `/portfolio`, `/priority-areas`, `/projects`,
`/interventions`, the `(auth)` group, and `(onboarding)` (`/welcome`, `/setup`).

### 1a. Primary nav links with no page → 404
| Nav item | href | Status |
|----------|------|--------|
| Calendar | `/calendar` | ❌ 404 |
| Reports | `/reports` | ❌ 404 |
| Search | `/search` | ❌ 404 |
| Team | `/team` | ❌ 404 |
| Notifications | `/notifications` | ❌ 404 |
| Settings | `/settings` | ❌ 404 |

### 1b. Sidebar Pinned / Recent links → 404 (no detail routes exist)
`/projects/hospital-upgrade`, `/interventions/digital-identity`,
`/reports/q1-summary`, `/search?saved=overdue`, `/projects/curriculum-reform`,
`/reports/may-progress`, `/projects/net-zero`, `/files/supplier-agreement` — all 404.

### 1c. Command Palette & Global Search navigate to dead routes
`CommandPalette` "Go to …" and Create/Generate commands `window.location` to
`/calendar`, `/reports`, `/search`, `/team`, etc. The header search opens the
palette but cannot return real results.

### 1d. No custom `not-found.tsx`
404s fall back to the default Next page — off-brand.

---

## 2. List vs detail: the hierarchy is single static screens

The nav implies **collections**, but each route renders **one hardcoded object**:

- `/portfolio` → one portfolio (not a list of portfolios)
- `/priority-areas` → one priority area (not a list)
- `/projects` → one project (not a list)
- `/interventions` → one intervention (not a list)

Consequences:
- There are **no list/index pages** and **no dynamic detail routes**
  (`/projects/[id]`, `/interventions/[id]`, …).
- **Drill-down is fake**: "double-click → open workspace" and the row "open"
  action call `toast.info('… coming soon')`. You cannot navigate the hierarchy.
- Breadcrumbs only ever show `Workspace › <one segment>`; deeper trails don't exist.

---

## 3. CRUD & persistence: nothing saves

There is **no create/read/update/delete** against any store. Everything below is
local component state that **vanishes on refresh**:

| Object | Create | Edit | Delete/Archive | Persists? |
|--------|--------|------|----------------|-----------|
| Portfolio | ❌ toast | ❌ | ❌ | no |
| Priority Area | ❌ toast | ❌ | ❌ | no |
| Project | ❌ toast | ❌ | ❌ | no |
| Intervention | ❌ toast | ❌ | ❌ | no |
| Activity | ❌ toast | inline status only (local) | ❌ | no |
| Milestone | ❌ | approve = toast | ❌ | no |
| Decision | ❌ "Record decision" toast | ❌ | ❌ | no |
| Risk | ❌ | ❌ | ❌ | no |
| Comment | add = local only | react/resolve/pin = local | ❌ | no |
| Evidence/File | simulated upload (fake progress) | ❌ | ❌ | no |

Only two things persist anywhere (both `localStorage` via Zustand):
- onboarding draft (`tbi-onboarding`)
- UI prefs: sidebar collapsed + density (`useAppStore`)

---

## 4. Per-surface placeholder inventory (81 no-op actions)

Grouped from the 20 files that call `toast.info` / "coming soon":

- **Create menu (frame + every header):** Create Project / Intervention / Activity
  / Report → all no-ops.
- **Page-header secondary actions (all 4 workspaces):** Generate Report, Share,
  Export, Compare, Manage, Archive, Record Decision → no-ops.
- **Every table FilterBar:** Filter, Sort, Group, Columns, Export → no-ops (only
  the saved-view tabs actually filter; inline status edits are local-only).
- **Workspace switcher:** Create workspace, Manage workspace → no-ops; switching
  is a 650ms fake transition with no data change.
- **User menu:** Profile, Preferences, Keyboard shortcuts, Appearance → no-ops;
  "Workspace settings" routes to a 404; Log out just pushes `/login`.
- **Command palette:** Assign, Invite, Switch workspace, Preferences, Appearance,
  Generate report → no-ops or dead routes.
- **Evidence:** preview / version-history / download → no-ops; upload is faked.
- **Pin/unpin & quick actions:** local-state only, not saved.

---

## 5. Missing pages & features (referenced but absent)

| Area | State |
|------|-------|
| **Calendar** | No page. Listed in nav + blueprint. |
| **Reports** | No list, no report viewer, no generation flow, no export. |
| **Search** | No results page; global search only opens the palette. |
| **Team** | No directory/members/roles/capacity page. |
| **Notifications (full page)** | Only the frame side-panel exists (mock; mark-read local). No `/notifications` page. |
| **Settings** | No workspace/users/permissions/integrations/security/appearance. |
| **Profile** | None. |
| **Object detail pages** | None for any hierarchy object (see §2). |
| **Activity screen** | Intentionally not built yet (per prior instructions). |
| **Files/Document viewer** | No real preview/versioning/storage. |
| **Reviews / approvals flow** | Inspector tabs show static placeholders; no workflow. |
| **Sharing / export** | No share dialogs, no export (PDF/CSV) anywhere. |

---

## 6. Cross-cutting gaps

- **Auth & session:** simulated; no real credentials, tokens, refresh, or
  middleware. Any URL (`/`, `/projects`, …) is reachable **without logging in**.
  `useAppStore.user` is never set, so the UI's "You / Ahmed Yusuf" is hardcoded.
- **Route protection / redirects:** none. No auth guard, no "redirect to login".
- **Permissions & roles:** roles are collected in onboarding and **never
  enforced**. The only permission logic is a cosmetic invite-ceiling note.
- **Validation:** present and good for **auth + onboarding** (Zod). **Absent** for
  all feature CRUD — because no create/edit forms exist yet.
- **Loading / empty / error / offline states:** actually implemented per screen,
  but **driven by `?state=` query param**, not real conditions. They need to be
  wired to real async states.
- **Real-time / presence / typing:** visual simulation only (intervals); no
  websocket/transport.
- **Notifications:** static mock; no triggers, no read-state persistence, no
  badge backed by data.
- **Search index:** none; no entity search.
- **Accessibility / responsive / motion:** in good shape (documented per screen) —
  not a gap, but needs a final pass once interactions are real.

---

## 7. What is genuinely solid (don't rebuild)

- Design system & tokens; the Workspace Frame (sidebar, header, command palette,
  notification panel, inspector); the primitive library (DataTable, StatusChip,
  Avatar, Inspector, Timeline, Sparkline, ActivityFeed, FilterBar).
- The 4 hierarchy workspaces' **layouts and section composition**.
- Auth & onboarding **flows and validation** (just not wired to a real backend).
- The build is green and deploys to Vercel.

---

## 8. Severity tiers (suggested order to fix)

**Tier 0 — Foundational (blocks everything else)**
1. Decide persistence strategy (see decision below).
2. Real auth + session + route protection; populate `useAppStore.user`.
3. Data layer: replace `lib/mock` reads with a store/API; introduce CRUD.

**Tier 1 — Make the product navigable & functional**
4. List + dynamic detail routes for every object; real drill-down; breadcrumbs.
5. Build the 6 missing nav pages (Calendar, Reports, Search, Team, Notifications,
   Settings) + Profile + `not-found.tsx`.
6. Wire all Create/Edit/Archive flows (drawers) with validation; make CRUD persist.

**Tier 2 — Complete the interactions**
7. Filters/sort/group/columns/saved-views actually apply & persist.
8. Comments, approvals, evidence upload, decisions — persist and reflect in feeds.
9. Reports generation + export (PDF/CSV) + sharing.
10. Notifications backed by data; permissions/roles enforced.

**Tier 3 — Production hardening**
11. Real loading/error/empty from async state; offline/queue; toasts on failure.
12. Search index; presence (real or honest); analytics/telemetry; tests; a11y pass.

---

## 9. The one decision that shapes everything (needs your call)

"Complete the CRUD / make forms save" can mean three very different builds:

- **A. Full backend** — add `apps/api` (NestJS + Postgres + Prisma) or Next API
  routes + a DB, real JWT auth, real persistence. Closest to true production;
  largest effort.
- **B. Next.js full-stack** — Next Route Handlers + a database (e.g.
  Postgres/SQLite/Prisma) in the one app. Real persistence, simpler infra,
  deploys on Vercel.
- **C. Front-end "complete"** — keep it client-only but make everything work and
  persist via a typed client data layer (Zustand + `localStorage`/IndexedDB).
  Fast; everything functions and survives refresh; no real multi-user/server.

This choice determines auth, data wiring, and how every CRUD action is built. The
audit above is valid regardless; the remediation plan branches here.
