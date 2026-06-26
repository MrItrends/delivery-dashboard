# 63 — Claude Build Rules

Claude should think like a **Staff Product Engineer**. Not a code generator.

---

## Before Implementing Any Screen, Ask

1. What object does this represent?
2. Does this object already exist in the data model?
3. Can this component be reused elsewhere?
4. Will another feature need this?
5. Does this follow existing patterns?

Avoid duplicate implementations.

---

## Component Rules

### Never build one-off components. Everything should be reusable.

**Wrong:**
```tsx
<ProjectCard />
<ActivityCard />
<BudgetCard />
```

**Correct:**
```tsx
<ObjectCard type="project" data={project} />
<ObjectCard type="activity" data={activity} />
<ObjectCard type="budget" data={budget} />
```

---

## Layout Rules

Every page uses the same structure:

```tsx
AppShell
  └── Header
        └── Context Tabs
              └── Content
                    └── Inspector (when open)
                    └── Notifications
```

**Consistency is mandatory.** No page should invent a new layout.

---

## Naming

Use semantic naming. Names should communicate purpose.

| Good | Bad |
|------|-----|
| `ActivityDrawer` | `Card1` |
| `ProjectOverview` | `Widget2` |
| `BudgetTimeline` | `SectionLarge` |
| `InterventionHealthBadge` | `GreenThing` |
| `useInterventionHealth` | `useData` |

---

## Accessibility

Every generated component must support:
- Keyboard navigation
- ARIA labels and roles
- Focus management
- Screen reader compatibility
- Reduced motion
- High contrast

**Accessibility is not optional. It is not a "nice to have." It is a requirement.**

---

## State Management Rules

| State Type | Handling |
|-----------|---------|
| Server state | React Query / SWR — never manual fetch/store |
| UI state | Local state or Zustand |
| Session state | Auth context |
| Derived state | Computed from server state — no duplication |

**Never mix state types.**

---

## Optimistic Updates

Simple mutations (status changes, assignments) should update the UI immediately. Synchronize in the background. Roll back on failure.

```typescript
// Optimistic update pattern
const updateStatus = async (id: string, status: ActivityStatus) => {
  // 1. Update local cache immediately
  queryClient.setQueryData(['activity', id], (old) => ({
    ...old,
    status,
  }));

  try {
    // 2. Sync to server
    await activityService.updateStatus(id, status);
  } catch (error) {
    // 3. Roll back on failure
    queryClient.invalidateQueries(['activity', id]);
    toast.error('Failed to update status');
  }
};
```

---

## Inspector Over Navigation

Prefer opening details in an inspector panel over navigating to a new page.

```tsx
// Preferred
<ActivityRow onClick={() => openInspector(activity.id)} />

// Only when inspector is insufficient
<Link href={`/activities/${activity.id}`} />
```

---

## Inline Editing Over Modals

Prefer inline editing over forms in modals.

```
Inline Editing   ← Always prefer
  ↓
Inspector Panel  ← Use for complex edits
  ↓
Drawer Form      ← Use for multi-field forms
  ↓
Full Modal       ← Use for confirmations/complex flows only
  ↓
Dedicated Page   ← Last resort
```

---

## Error Handling

Every error should explain:
1. What happened
2. Why it happened
3. What the user can do

```tsx
// Wrong
<div>Error occurred</div>

// Correct
<ErrorState
  title="Failed to load activities"
  description="Unable to connect to the server. Your changes will sync when the connection is restored."
  action={{ label: "Try again", onClick: retry }}
  referenceId={error.id}
/>
```

---

## Empty States

Every empty state should teach:

```tsx
// Wrong
<div>No activities</div>

// Correct
<EmptyState
  title="No activities yet"
  description="Activities are the individual pieces of work that drive this intervention forward."
  action={{ label: "Create first activity", onClick: openCreateDrawer }}
/>
```

---

## Performance Rules

1. Virtualize all large lists (100+ items)
2. Paginate API responses
3. Cache aggressively, invalidate precisely
4. Lazy-load heavy components
5. Skeleton screens immediately — never blank then flash

---

## Testing Requirements

Every feature must include:
- Unit tests for business logic
- Integration tests for API interactions
- Component tests for interactive elements
- Accessibility tests (axe-core)

---

## Documentation Requirements

Every exported component must have:
- TypeScript types for all props
- JSDoc for non-obvious behavior only
- Usage example in Storybook or similar

No multi-paragraph comments. No "what it does" comments. Only "why" comments for non-obvious decisions.
