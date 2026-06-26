# Real-Time Architecture

## Philosophy

Real-time collaboration should feel like **working in the same room**. Changes appear immediately. Presence is visible. No page refreshes required.

However, real-time is expensive. It should be **selective** — only the data that benefits from immediate updates should use WebSockets.

---

## Real-Time Requirements

| Feature | Real-Time Needed | Why |
|---------|-----------------|-----|
| Activity status changes | Yes | Other team members need to see instantly |
| Presence indicators | Yes | Who is viewing right now |
| Comment threads | Yes | Collaborative discussion |
| Notifications | Yes | Timely delivery |
| Budget updates | No | 30-second poll is sufficient |
| Report generation | No | Progress bar via polling |
| File uploads | No | Webhook on completion |
| KPI changes | No | Batched updates acceptable |

---

## Technology

**WebSockets** via Socket.io (with long-polling fallback).

Alternative: Server-Sent Events (SSE) for one-directional updates where bidirectional is not needed.

---

## Connection Architecture

```
Client ←──── WebSocket ────→ WebSocket Gateway
                                    │
                          ┌─────────┴─────────┐
                          │                   │
                    Redis PubSub         Event Bus
                          │                   │
                    Cache Layer         Worker Services
```

Each user connects to the WebSocket gateway on login. The gateway subscribes them to relevant channels based on their workspace, projects, and permissions.

---

## Channels (Rooms)

```typescript
// Channels a user subscribes to on connection
const channels = [
  `workspace:${workspaceId}`,           // Workspace-level events
  `user:${userId}`,                     // Personal notifications
  ...activeProjectIds.map(id => `project:${id}`),         // Active projects
  ...activeInterventionIds.map(id => `intervention:${id}`), // Active interventions
];
```

Users only receive events for channels they are subscribed to and have permission to access.

---

## Event Types

```typescript
type RealtimeEvent =
  | { type: 'activity.updated'; payload: ActivityUpdate }
  | { type: 'activity.created'; payload: Activity }
  | { type: 'activity.deleted'; payload: { id: string } }
  | { type: 'comment.created'; payload: Comment }
  | { type: 'presence.joined'; payload: { userId: string; objectId: string } }
  | { type: 'presence.left'; payload: { userId: string; objectId: string } }
  | { type: 'notification.received'; payload: Notification }
  | { type: 'intervention.health_changed'; payload: HealthChange };
```

---

## Presence

```typescript
interface Presence {
  userId: string;
  user: UserSummary;
  objectType: string;
  objectId: string;
  joinedAt: DateTime;
  lastActive: DateTime;
}
```

Presence is updated: On page/object open, every 30 seconds (heartbeat), On page/object close.

Presence expires automatically after 60 seconds without a heartbeat.

---

## Client Implementation

```typescript
// useRealtime hook
function useRealtime() {
  const socket = useRef<Socket | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.current = io('/realtime', {
      auth: { token: getAuthToken() },
    });

    socket.current.on('activity.updated', (payload: ActivityUpdate) => {
      queryClient.setQueryData(
        ['activities', payload.id],
        (old: Activity) => ({ ...old, ...payload })
      );
      queryClient.invalidateQueries({ queryKey: ['interventions', payload.interventionId] });
    });

    socket.current.on('notification.received', (notification: Notification) => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast.notification(notification);
    });

    return () => {
      socket.current?.disconnect();
    };
  }, []);
}
```

---

## Conflict Resolution

When two users edit the same field simultaneously:

1. Last write wins for simple fields (status, due date)
2. Operational transforms for rich text (future)
3. Clear visual indication when another user is editing
4. Warning shown: "Ahmed is also editing this field"

---

## Offline Handling

When the WebSocket connection drops:

1. Client switches to polling mode (30-second interval)
2. User notified: "Live updates paused — reconnecting..."
3. On reconnect: Full resync of active data
4. User notified: "Back online — syncing..."

Queued mutations sync in order when connection restores.

---

## Scale

| Metric | Target |
|--------|--------|
| Concurrent connections | 50,000+ |
| Event latency | < 200ms |
| Presence update latency | < 500ms |
| Connection memory | < 50MB per 1,000 connections |

Redis PubSub enables horizontal scaling across multiple WebSocket gateway instances.

---

## Security

- All WebSocket connections authenticated with JWT
- Permission checks on every event subscription
- Channels are workspace-scoped — cross-workspace leakage is impossible by architecture
- Events carry minimum required payload — no sensitive data in broadcasts
