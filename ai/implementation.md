# AI Implementation Guide

> A practical guide for AI assistants implementing features in the Delivery Dashboard.

---

## Before You Start Any Feature

1. Identify which object(s) in the hierarchy are involved
2. Identify which users will use this feature and why
3. Identify the primary action the user needs to take
4. Identify which existing components to use (don't create new ones unnecessarily)
5. Identify which API endpoints are needed
6. Check `build-rules.md` for constraints that apply

---

## Implementing a New Object Type

When asked to create a new object type:

1. **Define the TypeScript interface** in `packages/types/`

```typescript
interface NewObject extends BaseObject {
  // Specific fields
  workspaceId: string;
  parentId: string;   // Parent in hierarchy
  // ...
}
```

2. **Create the database schema** in migrations

```sql
CREATE TABLE new_objects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id),
  parent_id UUID NOT NULL REFERENCES parent_objects(id),
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  owner_id UUID NOT NULL REFERENCES users(id),
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  archived_at TIMESTAMPTZ
);
```

3. **Create the API module** (controller, service, repository, schema)

4. **Create the React Query hooks**

5. **Create the list component** with empty state and loading state

6. **Create the detail component** (inspector panel or full page)

---

## Implementing a New View

When asked to add a new view to an existing object:

1. Add a new tab to the object's tab navigation
2. Create the view component in the object's feature folder
3. Create any required API queries
4. Ensure the view has: empty state, loading skeleton, error state
5. Wire up keyboard navigation if it's a list/table

---

## Implementing a Form

Always use React Hook Form + Zod:

```typescript
// 1. Define schema
const schema = z.object({
  title: z.string().min(1, 'Title is required').max(500),
  interventionId: z.string().uuid('Must select an intervention'),
  dueDate: z.string().datetime('Invalid date'),
  priority: z.enum(['critical', 'high', 'normal', 'low']),
  ownerId: z.string().uuid().optional(),
});

// 2. Use in component
const form = useForm({
  resolver: zodResolver(schema),
  defaultValues: { priority: 'normal' },
});

// 3. Submit
const mutation = useMutation({ mutationFn: api.activities.create });

const onSubmit = form.handleSubmit(async (data) => {
  await mutation.mutateAsync(data);
  onSuccess();
});
```

---

## Implementing an API Endpoint

Follow this pattern for every endpoint:

```typescript
// Controller
@Post('/')
async create(
  @Body() dto: CreateActivityDto,
  @CurrentUser() user: AuthUser,
  @Param('workspaceId') workspaceId: string,
) {
  // 1. Validate input (Zod does this automatically via pipe)

  // 2. Check permissions
  await this.permissions.require(user, 'activities:create', { workspaceId });

  // 3. Execute business logic
  const activity = await this.activitiesService.create(dto, user);

  // 4. Write audit log
  await this.audit.log({
    actor: user,
    action: 'activity.created',
    objectId: activity.id,
    objectType: 'activity',
    newValue: activity,
  });

  // 5. Return response
  return { data: activity };
}
```

---

## Implementing Real-Time Updates

When a feature needs real-time sync:

1. Emit event from API after mutation:
```typescript
this.realtime.emit(`intervention:${activity.interventionId}`, {
  type: 'activity.updated',
  payload: activity,
});
```

2. Subscribe on the client:
```typescript
useEffect(() => {
  socket.on('activity.updated', (payload) => {
    queryClient.setQueryData(activityKeys.detail(payload.id), payload);
  });
  return () => socket.off('activity.updated');
}, []);
```

---

## Common Pitfalls

| Pitfall | How to Avoid |
|---------|-------------|
| N+1 database queries | Use joins or batch loading for related data |
| Missing permission check | Always run `permissions.require()` before any mutation |
| Hardcoded colors | Always use CSS variable tokens |
| Missing empty state | Design the empty state before the populated state |
| Missing error boundary | Wrap all pages in error boundaries |
| Losing user input on error | Always preserve form state on submit failure |
| Large bundle imports | Import specific exports, not entire libraries |
| Unhandled promise rejections | Every async function has a catch or try/catch |

---

## File Organization

```
apps/web/src/components/features/activities/
├── ActivityTable.tsx        List component
├── ActivityInspector.tsx    Inspector panel
├── ActivityForm.tsx         Create/edit form
├── ActivityCard.tsx         Card component
├── ActivityFilters.tsx      Filter controls
├── useActivities.ts         Query hooks
├── activities.types.ts      Local types
└── index.ts                 Barrel export
```
