# 62 — Repository Structure

## Philosophy

The repository should be organized by **feature**, not by file type.

Every feature owns its own components, hooks, services, types, and tests. This creates clear boundaries and allows teams to work independently.

---

## Top-Level Structure

```
delivery-dashboard/
│
├── app/                    # Application entry point and routing
├── components/             # Shared, reusable UI components
├── features/               # Feature-specific modules
├── layouts/                # Page layout shells
├── pages/                  # Route-level page components
├── hooks/                  # Shared React hooks
├── services/               # API clients and data services
├── types/                  # Shared TypeScript types
├── lib/                    # Utility functions and helpers
├── styles/                 # Global styles
├── tokens/                 # Design tokens (CSS variables)
├── icons/                  # Icon components
└── assets/                 # Static assets
```

---

## Features Directory

Each feature maps directly to a product object:

```
features/
│
├── workspace/
├── portfolio/
├── priority-areas/
├── projects/
├── interventions/          ← Most complex feature
├── activities/             ← Second most complex
├── milestones/
├── targets/
├── budget/
├── reports/
├── calendar/
├── search/
├── notifications/
├── team/
└── settings/
```

---

## Feature Module Structure

Every feature follows an identical internal structure:

```
features/interventions/
│
├── components/             # UI components specific to interventions
│   ├── InterventionHeader.tsx
│   ├── InterventionOverview.tsx
│   ├── InterventionActivityFeed.tsx
│   ├── InterventionHealthBadge.tsx
│   └── ...
│
├── views/                  # Full view implementations
│   ├── InterventionOverviewView.tsx
│   ├── InterventionActivitiesView.tsx
│   ├── InterventionBudgetView.tsx
│   └── ...
│
├── hooks/                  # Feature-specific hooks
│   ├── useIntervention.ts
│   ├── useInterventionHealth.ts
│   └── useInterventionActivities.ts
│
├── services/               # API calls for this feature
│   ├── interventionService.ts
│   └── interventionHealthService.ts
│
├── types/                  # Feature-specific types
│   └── intervention.types.ts
│
├── utils/                  # Feature-specific utilities
│   └── interventionHealth.ts
│
└── index.ts                # Public exports
```

---

## Shared Components Directory

```
components/
│
├── data-display/
│   ├── DataTable/
│   ├── ObjectCard/
│   ├── StatusBadge/
│   ├── HealthIndicator/
│   └── ActivityFeed/
│
├── feedback/
│   ├── Toast/
│   ├── EmptyState/
│   ├── LoadingSkeleton/
│   └── ErrorState/
│
├── inputs/
│   ├── Button/
│   ├── Input/
│   ├── Select/
│   ├── DatePicker/
│   └── FileUpload/
│
├── layout/
│   ├── AppShell/
│   ├── PageHeader/
│   ├── Inspector/
│   ├── Modal/
│   └── Drawer/
│
├── navigation/
│   ├── Breadcrumb/
│   ├── Tabs/
│   ├── CommandPalette/
│   └── Sidebar/
│
└── charts/
    ├── LineChart/
    ├── BarChart/
    ├── ProgressBar/
    └── TrendIndicator/
```

---

## Design Tokens

```
tokens/
│
├── colors.css
├── typography.css
├── spacing.css
├── elevation.css
├── motion.css
└── index.css              # Imports all token files
```

---

## Naming Conventions

### Files
| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `InterventionCard.tsx` |
| Hooks | camelCase with `use` prefix | `useIntervention.ts` |
| Services | camelCase with `Service` suffix | `interventionService.ts` |
| Types | camelCase with `.types.ts` | `intervention.types.ts` |
| Utils | camelCase | `formatCurrency.ts` |

### Components
| Pattern | Example |
|---------|---------|
| Feature + Role | `InterventionCard`, `ProjectHeader` |
| Generic + Role | `ObjectCard`, `StatusBadge` |

**Never:**
- `Card1.tsx`
- `Widget2.tsx`
- `SectionLarge.tsx`

---

## Component Composition Principle

```typescript
// Wrong — too specific, not reusable
<ProjectCard />
<ActivityCard />
<BudgetCard />

// Correct — one generic, configured through props
<ObjectCard
  type="project"
  data={project}
  onOpen={handleOpen}
/>
```

The same principle applies to Tables, Forms, Drawers, Charts, Filters, Search, and Notifications.

---

## Page Architecture

Every page uses the same shell:

```tsx
<AppShell>
  <Sidebar />
  <main>
    <PageHeader
      breadcrumb={breadcrumb}
      title={title}
      actions={actions}
    />
    <ContextTabs tabs={tabs} />
    <PageContent>
      {children}
    </PageContent>
    <Inspector open={inspectorOpen} />
  </main>
  <NotificationCenter />
</AppShell>
```

**Consistency is mandatory.**
