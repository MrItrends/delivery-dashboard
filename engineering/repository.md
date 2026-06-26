# Repository Structure

## Monorepo Architecture

The Delivery Dashboard uses a **monorepo** managed with Turborepo.

This keeps: shared types, shared utilities, and shared design tokens in one place — while allowing apps and packages to deploy independently.

---

## Directory Structure

```
delivery-dashboard/
│
├── apps/
│   ├── web/              Next.js 14 front-end
│   ├── api/              Node.js REST API
│   └── docs/             Documentation site
│
├── packages/
│   ├── ui/               Shared component library
│   ├── types/            Shared TypeScript types
│   ├── utils/            Shared utilities
│   ├── tokens/           Design tokens (CSS variables)
│   └── eslint-config/    Shared ESLint rules
│
├── infrastructure/
│   ├── docker/           Docker compose files
│   ├── k8s/              Kubernetes manifests
│   └── terraform/        Cloud infrastructure
│
├── scripts/              Build, deploy, migration scripts
│
├── turbo.json            Turborepo configuration
├── package.json          Root package (workspaces)
└── tsconfig.json         Root TypeScript config
```

---

## Application Structure — `apps/web/`

```
apps/web/
├── src/
│   ├── app/              Next.js App Router pages
│   │   ├── (auth)/       Auth-gated routes
│   │   │   ├── workspace/
│   │   │   ├── portfolio/
│   │   │   ├── interventions/
│   │   │   ├── activities/
│   │   │   └── reports/
│   │   └── auth/         Login, register
│   │
│   ├── components/
│   │   ├── ui/           Base UI components
│   │   ├── features/     Feature-specific components
│   │   └── layouts/      Layout wrappers
│   │
│   ├── hooks/            Custom React hooks
│   ├── lib/              API client, utils
│   ├── stores/           Zustand stores
│   ├── types/            Local TypeScript types
│   └── styles/           Global CSS, token imports
│
├── public/               Static assets
└── package.json
```

---

## Application Structure — `apps/api/`

```
apps/api/
├── src/
│   ├── modules/          Feature modules
│   │   ├── interventions/
│   │   │   ├── interventions.controller.ts
│   │   │   ├── interventions.service.ts
│   │   │   ├── interventions.repository.ts
│   │   │   ├── interventions.schema.ts
│   │   │   └── interventions.types.ts
│   │   ├── activities/
│   │   ├── projects/
│   │   └── ...
│   │
│   ├── middleware/       Auth, logging, rate limiting
│   ├── common/           Shared utilities, base classes
│   ├── config/           Environment configuration
│   └── main.ts           Entry point
│
└── package.json
```

---

## Key Technology Choices

| Layer | Technology | Reason |
|-------|-----------|--------|
| Frontend | Next.js 14 (App Router) | SSR, file-based routing, performance |
| Language | TypeScript | Type safety across full stack |
| Styling | Tailwind CSS + CSS Variables | Utility + token system |
| State | TanStack Query + Zustand | Server/client state separation |
| Forms | React Hook Form + Zod | Performance + type-safe validation |
| API | Node.js + NestJS | Structured, typed REST API |
| Database | PostgreSQL | Relational, mature, reliable |
| Cache | Redis | Sessions, rate limiting, pub/sub |
| Search | Meilisearch | Fast, self-hosted, privacy-safe |
| Real-time | Socket.io | WebSockets with fallback |
| File Storage | S3-compatible | Scalable, secure |
| Monorepo | Turborepo | Parallel builds, caching |

---

## Branch Strategy

```
main          → Production
staging       → Pre-production validation
develop       → Integration branch
feature/*     → Individual features
bugfix/*      → Bug fixes
hotfix/*      → Emergency production fixes
```

All code merges via Pull Request. Two approvals required. CI must pass.

---

## CI/CD Pipeline

```
Push to branch
  → Lint + TypeCheck
  → Unit Tests
  → Integration Tests
  → Build Check
  → Preview Deploy (Vercel/similar)

Merge to develop
  → Full test suite
  → Deploy to staging
  → Smoke tests

Merge to main
  → Full test suite
  → Deploy to production
  → Smoke tests
  → Performance check
```

---

## Environment Variables

```
# Required — never committed to git
DATABASE_URL=
REDIS_URL=
JWT_SECRET=
JWT_REFRESH_SECRET=
S3_BUCKET=
S3_REGION=
S3_ACCESS_KEY=
S3_SECRET_KEY=
MEILISEARCH_URL=
MEILISEARCH_KEY=
SMTP_HOST=
SMTP_USER=
SMTP_PASS=
```

Environment variables are validated on startup using Zod. The application refuses to start with missing required variables.
