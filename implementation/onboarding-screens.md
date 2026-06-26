# Workspace Initialization — Implementation Notes

The first-time, post-authentication setup experience. A centered wizard
(≤720px) built entirely on the existing system — no new layout, no redesigned
components. Same tokens, primitives, RHF/Zod, and persisted-store pattern.

## Flow & routes

```
Auth complete → /welcome → /setup (5 steps + Complete) → / (workspace home)
```

| Screen | Where | Notes |
|--------|-------|-------|
| Welcome | `/welcome` | Resume vs. fresh-start detection; "Skip for now" → `/` |
| Create Workspace | `/setup` step 0 | name, country, organisation, timezone, language, identifier (auto-suggested) |
| Organisation Details | step 1 | org name, department, sector, country, reporting period, fiscal year, logo upload |
| Select Role | step 2 | 8 role cards (radio), tailored permissions |
| Invite Team | step 3 | Figma-style add row + editable invites + CSV placeholder; "Skip for now" |
| Create Portfolio | step 4 | name, description, frequency, owner, strategic theme; "Skip" |
| Workspace Ready | step 5 | calm summary, "What happens next", "Enter workspace" |

Reach it from login with `new@gov.uk` (any password) → `/welcome`.

## New reusable pieces

- `Select` primitive — the system's documented Dropdown (styled native `<select>`
  for government-grade keyboard/SR/mobile behaviour). Now part of primitives.
- Onboarding compositions (built from primitives + tokens): `OnboardingLayout`,
  `Stepper` (subtle, no numbered circles), `RoleCard`, `AvatarUpload`,
  `InviteList`, `WorkspaceSummary`, `FormLayout` helpers.

## State handling (auto-save / resume)

`useOnboardingStore` (Zustand + `persist` → localStorage key `tbi-onboarding`):

- **Auto-save:** every field change writes to the store, which persists. A live
  "Saving… / Saved" indicator sits in the top bar.
- **Back preserves data:** values are read from the store, so navigating back
  never clears input.
- **Resume after closing the browser:** `/welcome` detects saved progress and
  offers "Resume setup" or "Start over"; `/setup` restores the saved step.
- Logo preview is kept in memory only (never written to storage).

## States covered

Default · Typing · Saving · Saved · Validation (inline, live, human messages) ·
Offline / Connection lost (banner; final create disabled) · Resume · Loading
(hydration gate + provisioning spinner) · Permission error (Observers can't
create portfolios → info banner + Skip-only; non-admins can't grant Full access
in invites).

## Standards

Tokens only · WCAG AA (labels, `aria-invalid`/`describedby`, `role=radiogroup`,
visible focus, `aria-current="step"`) · keyboard-first (auto-focus, Enter adds
invites) · ESC never exits the wizard · motion 150–200ms fade, no bounce/scale ·
responsive (centered desktop → reduced tablet → stacked mobile with sticky footer).
