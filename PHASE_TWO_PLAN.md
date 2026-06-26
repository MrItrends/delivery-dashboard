# Phase Two — Implementation Plan (Next full-stack + DB)

Chosen approach: **Next.js Route Handlers + Prisma + a database + cookie session
auth**, all inside `apps/web`. No separate backend. Deploys on the existing
Vercel project. Source of truth for what's broken: `PRODUCT_AUDIT.md`.

## Principles
- **Do not redesign.** Wire the existing screens; replace mock reads, not UI.
- **Vertical slices.** Prove one object end-to-end (DB → API → typed client →
  wired UI with real CRUD), then replicate the pattern across the hierarchy.
- **Keep green.** Every increment builds and deploys; mock stays until a surface
  is fully wired, then is deleted.

## Data & infra
- **Dev:** SQLite (`file:./dev.db`) — zero provisioning, instant.
- **Prod (Vercel):** Postgres (Neon/Vercel Postgres). Single env var
  `DATABASE_URL`. *You provision this when we cut over persisted features to
  prod; dev needs nothing.*
- **ORM:** Prisma. `prisma generate` runs on install (build-safe, no DB needed).
- **Schema** mirrors the object hierarchy + collaboration objects:
  User, Workspace, Membership, Portfolio, PriorityArea, Project, Intervention,
  Activity, Milestone, Target, Risk, Decision, Comment, Evidence, Notification,
  AuditEntry.

## Auth
- Cookie session (signed JWT in an httpOnly cookie). Login/signup verify against
  `User` (hashed password), set the session, populate `useAppStore.user`.
- Middleware guards app routes; unauthenticated → `/login`. `(auth)` and
  `(onboarding)` stay public.

## API surface (Route Handlers, `app/api/**`)
REST per object: `GET/POST /api/<collection>`, `GET/PATCH/DELETE
/api/<collection>/[id]`, plus nested reads (`/api/projects/[id]/interventions`).
Sub-resources: comments, evidence (upload), decisions, approvals, notifications,
reports, search. All return typed JSON; all writes append an `AuditEntry`.

## Build order (maps to audit tiers)
1. **Foundation (this increment):** Prisma + schema + client + seed from mock + env. ✅
2. **Auth real:** session, middleware, wire login/signup/logout, populate user.
3. **Vertical slice — Portfolios:** list page + detail route + create/edit/archive
   drawer, all persisted. This becomes the template.
4. **Replicate** the slice down the hierarchy: Priority Areas → Projects →
   Interventions → Activities (list + detail + CRUD + real drill-down + breadcrumbs).
5. **Missing pages:** Calendar, Reports, Search, Team, Notifications, Settings,
   Profile, branded `not-found`.
6. **Interactions:** filters/sort/columns persist; comments, approvals, evidence
   upload, decisions persist + reflect in feeds; report generation + export +
   sharing; notifications backed by data; permissions enforced.
7. **Hardening:** real loading/error/empty from async; offline queue; search
   index; a11y/QA pass; tests.

## Provisioning checklist (you)
- Nothing for dev. For prod persistence: create a Postgres DB and set
  `DATABASE_URL` in Vercel → I'll switch the Prisma provider and add a migration.
