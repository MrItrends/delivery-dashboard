# AI Review Checklist

> Use this checklist before marking any implementation as complete. Claude or any AI assistant should run through this before delivering output.

---

## Architecture

- [ ] Object hierarchy respected: `Workspace → Portfolio → Priority Area → Project → Intervention → Activity`
- [ ] No Activities without Interventions. No Interventions without Projects.
- [ ] No hard deletions — only archiving
- [ ] Audit history created for all mutations
- [ ] Health scores calculated, never manually assigned

---

## Design System

- [ ] All colors use CSS variable tokens (`var(--color-*)`)
- [ ] All spacing uses CSS variable tokens (`var(--space-*)`)
- [ ] All typography uses CSS variable tokens (`var(--font-*)`)
- [ ] No hardcoded pixel values in component files
- [ ] Icons from Hugeicons only — no custom or emoji icons
- [ ] Typeface is PP Neue Montreal
- [ ] Border radii from token scale

---

## Component Quality

- [ ] All interactive states handled: default, hover, focus, active, disabled, loading
- [ ] Empty state defined for all list/table views
- [ ] Loading skeleton defined (not a spinner in the center of the page)
- [ ] Error state defined with a recovery action
- [ ] Full keyboard navigation functional
- [ ] Screen reader tested (or documented as needing test)
- [ ] Touch targets minimum 44px × 44px
- [ ] Color is not the only indicator of meaning (always pair with icon + text)

---

## API

- [ ] Permission check on every mutation endpoint
- [ ] Input validated with Zod schema
- [ ] Response follows standard envelope format
- [ ] Error response follows standard error format
- [ ] Pagination on all list endpoints
- [ ] No unbounded queries (always limit)
- [ ] Audit log written on all writes

---

## State Management

- [ ] Server data managed with TanStack Query
- [ ] Query keys are consistent and correctly invalidated after mutations
- [ ] Optimistic updates implemented for common write operations
- [ ] No `useEffect` used to sync between state sources
- [ ] Form state managed with React Hook Form
- [ ] URL state used for shareable filters

---

## TypeScript

- [ ] No `any` types without documented justification
- [ ] No `@ts-ignore` without documented reason
- [ ] Interfaces defined for all new object types
- [ ] Zod schemas align with TypeScript interfaces
- [ ] Shared types live in `packages/types/`

---

## Security

- [ ] Authentication required on all private endpoints
- [ ] Authorization checked for every object access
- [ ] SQL uses parameterized queries only
- [ ] User input sanitized before display
- [ ] No sensitive data logged
- [ ] CORS configured correctly
- [ ] Rate limiting applied to write endpoints

---

## Performance

- [ ] Tables with > 100 rows use virtual rendering
- [ ] Images use WebP format and responsive `srcset`
- [ ] Heavy components are lazy-loaded
- [ ] No N+1 database queries
- [ ] Critical queries are indexed
- [ ] Bundle size impact assessed

---

## Documentation

- [ ] New components documented in `design-system/components.md`
- [ ] New API endpoints documented in `engineering/api.md`
- [ ] New object types documented in the relevant `product/` file
- [ ] New build rules added to `ai/build-rules.md`

---

## Quick Pre-Commit Checklist

For every commit, verify:
- [ ] `pnpm lint` passes
- [ ] `pnpm typecheck` passes
- [ ] `pnpm test` passes
- [ ] No console.log statements left in production code
- [ ] No hardcoded credentials or secrets
- [ ] No commented-out code blocks
