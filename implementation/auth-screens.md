# Authentication — Implementation Notes

Screen 001. Ten screens on one shared layout system. Built strictly against the
Design Language, Layout & Composition, Component, and Screen Blueprint bibles.

## Layout System

Every screen renders inside `AuthLayout` (split-screen):

- **Desktop** — form 55% / brand 45%
- **Tablet** (≤1024px) — form 60% / brand 40%
- **Mobile** (≤768px) — single column; brand narrative moves below the form

The brand column is an **editorial composition** — product name, one statement,
three numbered capabilities, and a subtle hairline geometric composition
(abstract object hierarchy, one minimal blue accent node). No illustrations, no
gradients, no glassmorphism, no dashboard mockups.

## Routes

| # | Deliverable | Route | Notes |
|---|-------------|-------|-------|
| 1 | Login | `/login` | All inline states (below) |
| 2 | Sign Up | `/signup` | Live password strength, SSO, admin-approval hint |
| 3 | Forgot Password | `/forgot-password` | Email → Check Email |
| 4 | Reset Password | `/reset-password` | Strength meter; success state inline |
| 5 | Check Email | `/check-email?context=&email=` | Resend; signup vs reset copy |
| 6 | Expired Link | `/expired-link` | Request new link |
| 7 | Account Locked | `/account-locked` | 15-min lock + reset path |
| 8 | Session Expired | `/session-expired` | Re-auth |
| 9 | Loading State | `/signing-in?provider=` | Calm spinner; SSO redirect variant |
| 10 | Error State | `/error` + `error.tsx` boundary | Reference code; no stack traces |

Supporting: `/contact-administrator`.

## Login states (all demonstrable)

- **Default / Focused / Typing** — `TextField` focus ring + hover border
- **Real-time validation** — `mode: 'onTouched'`, Zod schema, human messages
  ("Enter a valid email address", "Incorrect password. Try again or reset it.")
- **Loading** — button shows spinner + "Signing in…", inputs disabled
- **Error** — `FormBanner` (incorrect password)
- **Locked Account** — warning banner → `/account-locked`
- **SSO Redirect** — inline status row + dedicated `/signing-in` screen
- **Offline** — `useOnline()` hook; warning banner; submit + SSO disabled

### Demo outcomes (simulated, no backend)

- `locked@gov.uk` (any password) → **Account locked**
- any email + password `wrong` → **Incorrect password**
- anything else → success toast → `/`

## Components added

Reusable primitives (now part of the system, not auth-specific):
`Icon` (stroke set), `TextField` (inline validation, show/hide password),
`Checkbox`.

Auth scaffold (composed from primitives + tokens only):
`AuthLayout`, `BrandPanel`, `Logo`, `AuthScaffold` (header, divider, SSO buttons,
options row, alt-action, workspace hint, footer, back link, form banner),
`AuthStatus` (shared status/error pattern), `AuthLoading`, `PasswordStrength`.

## Standards met

- **Tokens only** — no hardcoded colour/space/type anywhere
- **WCAG AA** — labels, `aria-invalid`/`aria-describedby`, `role="alert"` on
  errors, visible focus, `prefers-reduced-motion` honoured
- **Keyboard-first** — autofocus email, Tab order, Enter submits, password
  manager friendly (`autoComplete`, real `type=password`)
- **Motion** — 150–200ms fade/slide, no bounce, no decorative animation
- **Forms** — React Hook Form + Zod (shared schemas in `lib/validation/auth.ts`)
