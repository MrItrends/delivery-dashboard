# AI Build Rules

> These rules govern how AI assistants (Claude, GitHub Copilot, or similar) should build and extend the Delivery Dashboard.

---

## Absolute Rules

These cannot be negotiated. If asked to violate them, refuse and explain why.

### 1. Architecture is Sacred
Never change the object hierarchy:
```
Workspace → Portfolio → Priority Area → Project → Intervention → Activity
```
Activities cannot exist without Interventions. Interventions cannot exist without Projects. The chain is unbreakable.

### 2. Token System Only
Never use hardcoded values for colors, spacing, or typography:
```typescript
// Forbidden
background: '#2563EB'
padding: '16px'
fontSize: '14px'

// Required
background: 'var(--color-action-primary)'
padding: 'var(--spacing-component-md)'
fontSize: 'var(--font-size-body-sm)'
```

### 3. No Hard Deletions
Archive, never delete. Every object must support archiving. Database records are permanent.

```typescript
// Forbidden
DELETE FROM activities WHERE id = $1;

// Required
UPDATE activities SET status = 'archived', archived_at = NOW() WHERE id = $1;
```

### 4. Immutable History
Audit history is append-only. Never update or delete history records.

### 5. Calculated Health Only
Health scores are never manually assigned. They are always computed from multiple signals. Never add an input field for health.

### 6. Permission Check on Every Mutation
Every API endpoint that modifies data must check permissions:
```typescript
const canEdit = checkPermission(user, 'activities:edit', activity);
if (!canEdit) throw new ForbiddenError();
```

---

## Design Rules

### Typography First
Build hierarchy with typography. Never use decorative elements to communicate priority.

### Inspector Panels Over Navigation
When viewing object detail, prefer Inspector Panels over full page navigation.

### Single Owner
Every object has exactly one owner. Never allow ownership to be unassigned.

### Optimistic Updates
All write operations use optimistic updates. Never wait for server confirmation before updating the UI.

### Inline Editing
Simple field changes must be inline. Never open a full modal for a single field edit.

### Empty States
Every list view has an empty state. Never render a blank screen.

### Loading States
Every data-loading section has a skeleton. Never render a blank white area while loading.

---

## Code Rules

### TypeScript Only
No `.js` files. No `any`. No `@ts-ignore` without a documented reason.

### Zod Validation
All API input validated with Zod. Share schemas between client and server.

### No `useEffect` Chains
Never use `useEffect` to sync between state sources. If you feel the need to, redesign the state.

### Query Keys
All TanStack Query keys must be consistent and invalidated correctly on mutation.

```typescript
// Consistent query key factory
export const activityKeys = {
  all: ['activities'] as const,
  lists: () => [...activityKeys.all, 'list'] as const,
  list: (filters: ActivityFilters) => [...activityKeys.lists(), filters] as const,
  details: () => [...activityKeys.all, 'detail'] as const,
  detail: (id: string) => [...activityKeys.details(), id] as const,
};
```

### Error Handling
Every API call handles: loading state, error state, empty state, and success state.

Never assume a request will succeed.

### Accessibility
Every interactive element: keyboard accessible, `aria-label` where needed, focus ring visible.

---

## Naming Rules

| What | Convention |
|------|-----------|
| Files | kebab-case |
| Components | PascalCase |
| Hooks | camelCase, prefix `use` |
| Types/Interfaces | PascalCase |
| Constants | UPPER_SNAKE_CASE |
| CSS classes | kebab-case |
| API routes | kebab-case |
| Database tables | snake_case |
| Database columns | snake_case |

---

## Review Checklist

Before completing any feature:

- [ ] All design tokens — no hardcoded values
- [ ] All states handled (loading, error, empty, success)
- [ ] All interactive elements keyboard accessible
- [ ] Permission checks on all mutations
- [ ] Audit history created for all mutations
- [ ] Empty state defined
- [ ] Skeleton loading defined
- [ ] Inspector panel used for object detail (where appropriate)
- [ ] TypeScript types defined, no `any`
- [ ] Zod validation on API inputs
