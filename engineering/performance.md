# Performance

## Philosophy

Performance is a product feature. A slow platform is a failed platform.

Government users often work on older hardware, slower networks, or shared devices. The application must be fast under real-world conditions — not just in optimized development environments.

---

## Performance Targets

| Metric | Target | Critical Limit |
|--------|--------|---------------|
| First Contentful Paint (FCP) | < 1.5s | < 3s |
| Largest Contentful Paint (LCP) | < 2.5s | < 4s |
| Time to Interactive (TTI) | < 3s | < 5s |
| Cumulative Layout Shift (CLS) | < 0.1 | < 0.25 |
| First Input Delay (FID) | < 100ms | < 300ms |
| API response (P50) | < 200ms | — |
| API response (P95) | < 500ms | — |
| Table load (1,000 rows) | < 300ms | — |
| Search results | < 300ms | — |
| Report generation | < 10s (with progress) | — |

---

## Front-End Performance

### Code Splitting

```typescript
// Route-level code splitting
const InterventionPage = lazy(() => import('./pages/Intervention'));
const ReportsPage = lazy(() => import('./pages/Reports'));
const PerformancePage = lazy(() => import('./pages/Performance'));

// Heavy components
const RichTextEditor = lazy(() => import('./components/RichTextEditor'));
const ChartLibrary = lazy(() => import('./components/Charts'));
```

### Bundle Size Targets

| Bundle | Target |
|--------|--------|
| Initial JS | < 200KB gzipped |
| Total initial payload | < 500KB gzipped |
| Individual route chunk | < 100KB gzipped |

### Image Optimization

- WebP format for all images
- Responsive images with `srcset`
- Lazy loading below the fold
- CDN delivery
- Placeholder blur-up on load

### Fonts

```html
<!-- Preload critical fonts -->
<link rel="preload" href="/fonts/PPNeueMontreal-Regular.woff2" as="font" crossorigin>
<link rel="preload" href="/fonts/PPNeueMontreal-Medium.woff2" as="font" crossorigin>
```

Font-display: swap to prevent invisible text during load.

---

## Table Virtualization

For tables with > 100 rows:

```typescript
import { useVirtualizer } from '@tanstack/react-virtual';

const rowVirtualizer = useVirtualizer({
  count: activities.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 48, // row height
  overscan: 10,           // rows beyond viewport
});
```

Only visible rows exist in the DOM. Smooth scrolling through 100,000 rows.

---

## API Performance

### Database Indexing

Critical indexes (see `data-model.md`):

```sql
-- Most critical for Activity queries
CREATE INDEX CONCURRENTLY idx_activities_intervention_status_due
  ON activities (intervention_id, status, due_date);

CREATE INDEX CONCURRENTLY idx_activities_owner_status
  ON activities (owner_id, status);

CREATE INDEX CONCURRENTLY idx_notifications_user_read
  ON notifications (user_id, read, created_at DESC);
```

### Query Optimization

- Avoid N+1 queries — use joins or DataLoader batching
- Paginate all list endpoints — no unbounded queries
- Return only requested fields — use field selection
- Cache expensive aggregations (health scores, portfolio summaries)

### Caching Strategy

```
Request → Redis Cache (hot data) → Database → Cache population
```

| Data | Cache TTL |
|------|----------|
| User profile | 5 minutes |
| Workspace summary | 2 minutes |
| Intervention health | 30 seconds |
| Portfolio overview | 1 minute |
| Report data | 15 minutes |

---

## Search Performance

Elasticsearch (or Meilisearch) for full-text search:

- Index updated within 30 seconds of object changes
- Fuzzy matching enabled
- Faceted filtering
- Permission-filtered results at query time
- Results in < 300ms

---

## Real-Time Performance

See `realtime.md` for WebSocket performance targets.

Key: Use Redis PubSub for horizontal scaling. Never broadcast to all connections — always filter by channel membership.

---

## Monitoring

Track in production:

- Core Web Vitals per page
- API response times (P50, P95, P99)
- Error rates per endpoint
- Database query times
- Cache hit rates
- WebSocket connection counts
- Memory usage per service

**Tool:** Datadog, Grafana, or similar APM.

---

## Performance Budget

All pull requests that increase the initial bundle size by > 10KB gzipped require performance review before merge.

Performance regression tests run on every deployment against a reference baseline.
