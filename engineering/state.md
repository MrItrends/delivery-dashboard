# State Management

## Philosophy

State management should be **as simple as possible, as complex as necessary**.

The largest source of front-end bugs in complex applications is poorly managed state. The solution is not a more powerful state library — it is a clearer model of what state exists and where it lives.

---

## State Categories

| Category | What it is | Where it lives |
|---------|-----------|---------------|
| Server State | Data from the API | React Query / TanStack Query |
| UI State | What is open, selected, visible | React `useState` / `useReducer` |
| Form State | Input values, validation errors | React Hook Form |
| Global App State | Auth, workspace, permissions, preferences | Zustand |
| URL State | Filters, active tab, page | URL params |

---

## Server State — TanStack Query

All API data is managed by TanStack Query (formerly React Query).

**Why:** Automatic caching, background refetch, optimistic updates, deduplication, error handling, loading states — all handled without custom code.

```typescript
// Fetching activities
const { data, isLoading, error } = useQuery({
  queryKey: ['activities', { interventionId, status, page }],
  queryFn: () => api.activities.list({ interventionId, status, page }),
  staleTime: 30_000,       // 30 seconds before background refetch
  gcTime: 5 * 60_000,      // 5 minutes in cache after unmount
});

// Mutating
const { mutate, isPending } = useMutation({
  mutationFn: (data) => api.activities.update(id, data),
  onMutate: async (data) => {
    // Optimistic update
    await queryClient.cancelQueries({ queryKey: ['activities', id] });
    const previous = queryClient.getQueryData(['activities', id]);
    queryClient.setQueryData(['activities', id], (old) => ({ ...old, ...data }));
    return { previous };
  },
  onError: (err, data, context) => {
    // Rollback on error
    queryClient.setQueryData(['activities', id], context.previous);
    toast.error('Failed to update activity');
  },
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['activities', id] });
  },
});
```

---

## Global State — Zustand

For state that genuinely needs to be global: auth, workspace context, user preferences.

```typescript
interface AppStore {
  // Auth
  user: User | null;
  token: string | null;

  // Workspace
  activeWorkspace: Workspace | null;
  workspaces: Workspace[];

  // UI Preferences
  sidebarCollapsed: boolean;
  activeTheme: 'light' | 'dark' | 'system';

  // Actions
  setUser: (user: User | null) => void;
  setActiveWorkspace: (workspace: Workspace) => void;
  toggleSidebar: () => void;
}

const useAppStore = create<AppStore>((set) => ({
  user: null,
  token: null,
  activeWorkspace: null,
  workspaces: [],
  sidebarCollapsed: false,
  activeTheme: 'system',

  setUser: (user) => set({ user }),
  setActiveWorkspace: (workspace) => set({ activeWorkspace: workspace }),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
}));
```

---

## UI State — Local `useState`

For state that is local to a component or subtree:

```typescript
// Inspector panel open/close
const [inspectorOpen, setInspectorOpen] = useState(false);
const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);

// Table filters
const [filters, setFilters] = useState<ActivityFilters>({
  status: [],
  ownerId: null,
  priority: [],
  dueDate: null,
});
```

State that only affects one component stays in that component. Do not lift state unnecessarily.

---

## URL State

Filters, active views, pagination — things the user should be able to share or bookmark — live in the URL.

```typescript
// Current URL: /activities?status=blocked&owner=user-123&page=2

const [searchParams, setSearchParams] = useSearchParams();

const status = searchParams.getAll('status');
const ownerId = searchParams.get('owner');
const page = Number(searchParams.get('page')) || 1;
```

---

## Form State — React Hook Form

All forms use React Hook Form.

```typescript
const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
  setValue,
  watch,
} = useForm<ActivityFormData>({
  resolver: zodResolver(activitySchema),
  defaultValues: {
    title: '',
    status: 'not_started',
    priority: 'normal',
  },
});
```

Validation schemas are defined with **Zod** and shared between client and server.

---

## State Anti-Patterns

| Anti-Pattern | Problem |
|-------------|---------|
| Prop drilling > 2 levels | Rigid, hard to refactor |
| Storing server data in Zustand | Duplicates TanStack Query's cache |
| Storing UI state in the URL | URL becomes unreadable |
| Global state for component-local concerns | Premature coupling |
| useEffect to sync between state sources | Creates infinite loops and bugs |

---

## State Decision Tree

```
Is this data from the API?
  → Yes: TanStack Query

Is this state needed in 3+ distant components?
  → Yes: Zustand
  → No: useState in common ancestor

Is this state the user should bookmark/share?
  → Yes: URL params
  → No: useState

Is this form input data?
  → Yes: React Hook Form
```
