# Supabase Setup — required before Phases 2–4 can run

"Everything comes from Supabase" needs a live Supabase project. This is the one
thing only you can do; once I have the keys I can execute Phases 2–4.

## 1. Create the project
- Go to https://supabase.com → **New project** (free tier is fine).
- Pick a region close to your users; set a database password.

## 2. Create the schema
- Supabase dashboard → **SQL Editor** → paste the contents of
  `apps/web/supabase/migrations/0001_init.sql` → **Run**.
- This creates every table (workspaces → portfolios → priority areas → projects →
  interventions → activities, plus milestones, targets, risks, decisions,
  comments, documents, reports, notifications, audit log) with RLS enabled.

## 3. Storage (for documents / evidence / report PDFs)
- Dashboard → **Storage** → create a bucket named **`documents`** (private).

## 4. Give me the keys
From **Project Settings → API**, provide (or set them yourself in both places):

| Variable | Where to set |
|----------|--------------|
| `NEXT_PUBLIC_SUPABASE_URL` | local `.env.local` **and** Vercel env |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | local `.env.local` **and** Vercel env |
| `SUPABASE_SERVICE_ROLE_KEY` | local `.env.local` **and** Vercel env (server-only) |

You can paste the URL + anon key here (they're public-by-design). **Do not paste
the service-role key in chat** — set it directly in Vercel and your local
`.env.local`; tell me once it's done.

## 5. What I do next (Phases 2–4, in vertical slices)
1. Wire `@supabase/supabase-js` + `@supabase/ssr` clients and **Supabase Auth**
   (replaces the simulated login; real sign-in/up/out + route protection).
2. Replace every mock array with Supabase reads, top-down: Workspace → Portfolio →
   Priority Area → Project → Intervention → Activity, with real list + detail
   routes and drill-down.
3. Full CRUD + Archive/Restore for every object; nothing lives only in React.
4. Complete the Create flows (Project, Intervention, Activity, Report) with all
   fields, validation, persistence, instant appearance, and editing.
5. Reports: builder, KPIs/charts, narrative, PDF generation (Storage), drafts,
   publishing, version history.

> Note: this supersedes the interim Prisma/SQLite scaffold from the previous
> step — Supabase is now the database. I'll remove the Prisma bits when the
> Supabase wiring lands so there's a single source of truth.
