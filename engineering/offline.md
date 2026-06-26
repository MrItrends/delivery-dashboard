# Offline Support

## Philosophy

Government delivery does not pause because of an internet outage. Field teams, remote ministries, and users in areas with poor connectivity must continue working.

The Delivery Dashboard must be **usable offline** for core operations.

---

## Offline Capabilities

| Feature | Offline Support | Strategy |
|---------|----------------|---------|
| View Activities | Yes | Cached |
| Update Activity Status | Yes | Queue + sync |
| Create Activity | Yes | Queue + sync |
| Add Comment | Yes | Queue + sync |
| Upload File | Partial | Queue when reconnected |
| View Interventions | Yes | Cached |
| View Reports | Partial | Cached PDF only |
| Real-time Presence | No | Disabled |
| Push Notifications | No | Disabled |
| Generate Reports | No | Requires connection |
| Budget Approval | No | Requires connection |

---

## Technology

**Service Worker** + **IndexedDB** via Workbox.

```
Service Worker intercepts requests
  → Cache HIT: Return cached response
  → Cache MISS: Network request
    → Online: Fetch, cache, return
    → Offline: Return offline fallback
```

---

## Cache Strategy

| Resource | Strategy | TTL |
|---------|---------|-----|
| App shell (HTML, CSS, JS) | Cache First | Build version |
| API: Activities list | Stale While Revalidate | 5 minutes |
| API: Intervention detail | Stale While Revalidate | 5 minutes |
| API: User profile | Cache First | 1 hour |
| Static assets (fonts, icons) | Cache First | 1 year |
| Images | Cache First | 24 hours |

---

## Mutation Queue

When offline, write operations are queued in IndexedDB:

```typescript
interface QueuedMutation {
  id: string;
  operation: 'CREATE' | 'UPDATE' | 'DELETE';
  endpoint: string;
  payload: unknown;
  timestamp: DateTime;
  retries: number;
  objectType: string;
  objectId: string;
  optimisticData: unknown;
}
```

On reconnection, the queue is processed in order. Conflicts are surfaced to the user.

---

## Conflict Resolution

When a queued mutation conflicts with a server change:

1. Show conflict to user
2. Display: "This activity was also updated while you were offline"
3. Show: Server version vs. Your version
4. User chooses: Keep mine / Keep server / Merge

For non-critical fields (tags, labels), last-write-wins with no conflict shown.

---

## User Experience

### Offline Banner
```
┌──────────────────────────────────────────────────┐
│ 📡  You're offline — changes will sync when     │
│ you reconnect.                     [Dismiss]    │
└──────────────────────────────────────────────────┘
```

### Reconnected Toast
```
✓ Back online — syncing 3 changes...
```

### Sync Complete Toast
```
✓ 3 changes synced successfully
```

### Sync Conflict
```
⚠ 1 conflict needs your attention  [Review]
```

---

## Service Worker Registration

```typescript
// Register in app entry point
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
      console.log('SW registered:', registration.scope);
    });
  });
}
```

---

## Data Freshness Indicators

When serving cached data:
- Subtle timestamp shown: "Updated 5 minutes ago"
- Refresh button available
- Stale data clearly indicated for reports and budgets

---

## Scope Limitations

Offline mode supports:
- Currently loaded workspace (pre-fetched on load)
- Last 30 days of active activities
- Current user's assigned activities
- Interventions the user has recently viewed

Offline mode does not support:
- Workspace switching
- Cross-workspace search
- Historical reports
- File downloads (unless pre-cached)

---

## Claude Implementation Notes

Offline support is a genuine differentiator for government platforms in countries with inconsistent connectivity.

Start with: Service worker for app shell, IndexedDB for mutation queue, optimistic updates for all writes. The mutation queue is the most critical piece — it ensures no work is lost.

Do not design offline support as a separate "offline mode." The application should degrade gracefully and invisibly. Users should only notice they are offline when they try to do something that genuinely requires connectivity.
