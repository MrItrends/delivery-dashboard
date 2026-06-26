# 59 — Performance

> Performance is a feature. Users should trust the application because it feels responsive.

---

## Performance Targets

| Metric | Target |
|--------|--------|
| Initial Load | < 2 seconds |
| Navigation (route change) | < 300ms |
| Search results | < 200ms |
| Drawer / Inspector open | < 150ms |
| Filtering | < 100ms (instant feel) |
| Inline edit save | < 500ms |
| Animation frame rate | 60fps |
| Report generation | Async — progress indicator |
| File upload | Chunked — progress indicator |

---

## Large Dataset Support

The platform must remain fast with:
- 100,000+ Activities
- Thousands of Projects
- Large file attachments
- Complex dependency graphs

**Virtualization is standard**, not optional.

---

## Virtualization

All tables and lists with more than 50 items must use windowed rendering. Only visible rows (plus a buffer of ~20 rows) should be in the DOM at any time.

Recommended: `react-virtual`, `@tanstack/virtual`, or equivalent.

---

## Caching Strategy

| Data Type | Cache Strategy |
|-----------|---------------|
| User profile | In-memory, refresh on login |
| Workspace settings | In-memory, refresh on load |
| Activity list | Server state cache, 30s stale time |
| Single object | Server state cache, 60s stale time |
| Search results | Short-lived cache, 5s stale time |
| Reports | Cached until regenerated |
| File metadata | Cached, invalidate on upload |

Cache invalidation should be **automatic and precise** — never invalidate entire caches when only one item changed.

---

## Optimistic Updates

Simple mutations should update the UI **immediately** before the server responds:

- Status changes
- Assignment changes
- Priority updates
- Due date changes
- Completion toggling

Roll back on failure. Show error toast. Log the conflict.

---

## Background Processing

Heavy operations run asynchronously and never block the UI:

| Operation | Handling |
|-----------|---------|
| Report generation | Background job + notification when done |
| Data export | Background download + notification |
| Data import | Background processing + progress feed |
| Bulk operations | Queue with progress indicator |
| AI summarization | Streaming when available |
| Search indexing | Background, no user interruption |

---

## Bundle Optimization

- Code-split by route and feature module
- Lazy-load heavy components (charts, rich text editor, calendar)
- Tree-shake all unused dependencies
- Compress all assets
- Use CDN for static assets

---

## Image Optimization

- Serve WebP format
- Responsive image sizes
- Lazy load below-fold images
- Avatar images: max 48px display, serve 96px for retina

---

## Network Optimization

- HTTP/2 multiplexing
- Request deduplication (don't fetch same data twice simultaneously)
- Prefetch likely next navigation
- Background sync for offline queued updates

---

## Monitoring

Track:
- Core Web Vitals (LCP, CLS, FID)
- API response times by endpoint
- Error rates by component
- Search response times
- Report generation times
- Offline sync success rate
