# TBI Delivery Platform — Claude instructions

**Before any task, read `docs/NORTH_STAR.md`.** It is the constitution and overrides every other document, prompt, or instinct. Where the older `docs/` set disagrees with it, the North Star wins.

## The product in one line
A **national delivery platform for the Government of Nigeria** — plan, track, and monitor large-scale programmes so leadership always knows what is on track, what is behind, who owns it, and what decision is needed. Built on TBI's Delivery Framework (prioritisation, planning & resourcing, performance management). It is **not** a generic PM tool.

## Non-negotiables (see North Star for detail)
- **Nigeria first.** Default country Nigeria; real MDA examples; `.gov.ng` emails; Naira. Never UK/`institute.global` placeholders.
- **Canonical model is the deck, not the old docs.** Four roles only (Admin; Priority Area Lead/Co-Lead; Intervention Lead/Co-Lead; Regular User). Hierarchy is locked: `Workspace → Portfolio → Priority Area → Project → Intervention → Activity`. Two dashboard types (Activity Tracker, Full).
- **Every screen answers one government question and reduces uncertainty.** If it doesn't, it shouldn't exist.
- **Every navigation item is a promise.** No dead-ends, no placeholder sections, no three menu items leading to one screen.
- **Demo integrity: no dummy data.** Empty but useful. Every number comes from records the user created. (`docs/DEMO_INTEGRITY.md`)
- **No AI slop.** Confident, plain, government voice. No exclamation marks, no filler, no marketing. (`docs/UX_WRITING_STANDARD.md`)
- **Do not redesign the UI** (typography, spacing, colour, hierarchy). The existing design system is the source of truth.

## Skills that enforce this
- `product-auditor` — is it necessary, simple, answering its question, helping governments deliver?
- `ux-writing-auditor` — is the copy government-grade, not AI slop?

Run them before and after significant work.

## Key docs
- `docs/NORTH_STAR.md` — the constitution (read first)
- `docs/UX_WRITING_STANDARD.md` · `docs/DEMO_INTEGRITY.md` · `docs/FIRST_RUN_EXPERIENCE.md`
- `docs/foundation/06-vocabulary.md` — product vocabulary

## Build / commit
- App lives in `apps/web` (Next.js 14, TypeScript strict, CSS Modules, Supabase). Verify with `npx next build` (sandbox disabled).
- Commit messages end with: `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`; sign with `-c commit.gpgsign=false`.
