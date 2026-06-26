# API Architecture

## Philosophy

The API is the **contract between the front end and all data**. It should be: consistent, predictable, well-typed, versioned, and documented.

A bad API creates unpredictable front-end behavior. A good API makes the front end simple.

---

## Architecture Pattern

**REST API** with GraphQL consideration for future complex queries.

### RESTful Design Principles

- Resources are nouns, not verbs
- HTTP verbs carry semantic meaning
- Consistent response shapes
- Consistent error shapes
- Pagination on all list endpoints
- Filtering and sorting via query parameters

---

## Base URL

```
https://api.delivery-dashboard.gov/{workspace-id}/v1/
```

API is versioned at the URL level. Breaking changes require a new version.

---

## Authentication

**Bearer Token (JWT)**

```
Authorization: Bearer {jwt-token}
```

Tokens include: User ID, Workspace ID, Role, Permissions, Expiry (1 hour), Refresh Token Expiry (30 days).

All endpoints require authentication unless explicitly public.

---

## HTTP Methods

| Method | Use | Safe | Idempotent |
|--------|-----|------|------------|
| GET | Retrieve | Yes | Yes |
| POST | Create | No | No |
| PUT | Replace | No | Yes |
| PATCH | Update | No | No |
| DELETE | Archive/Delete | No | Yes |

Note: DELETE performs a **soft delete** (archive). Hard delete requires a separate admin endpoint.

---

## Response Format

All responses follow this envelope:

```typescript
interface ApiResponse<T> {
  data: T;
  meta?: {
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
  error?: ApiError;
}

interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}
```

---

## Core Endpoints

### Interventions

```
GET    /interventions                       List all
GET    /interventions/:id                   Get one
POST   /interventions                       Create
PATCH  /interventions/:id                   Update
DELETE /interventions/:id                   Archive

GET    /interventions/:id/activities        Activities
GET    /interventions/:id/milestones        Milestones
GET    /interventions/:id/history           History
GET    /interventions/:id/files             Files
GET    /interventions/:id/comments          Comments
POST   /interventions/:id/comments          Add comment
```

### Activities

```
GET    /activities                          List all
GET    /activities?interventionId=:id       Filter by intervention
GET    /activities?ownerId=:id             Filter by owner
GET    /activities?status=:status          Filter by status
GET    /activities/:id                      Get one
POST   /activities                          Create
PATCH  /activities/:id                      Update
PATCH  /activities/:id/status               Update status only
PATCH  /activities/:id/assign               Assign owner
DELETE /activities/:id                      Archive

POST   /activities/bulk                     Bulk operations
```

### History

```
GET    /history?objectId=:id&objectType=:type
```

Returns immutable audit history for any object.

---

## Query Parameters

### Pagination

```
GET /activities?page=2&perPage=50
```

Default: `page=1`, `perPage=25`. Maximum: `perPage=100`.

### Filtering

```
GET /activities?status=in_progress,blocked&priority=high,critical
GET /activities?ownerId=:userId
GET /activities?dueDate[before]=2024-09-30
GET /activities?dueDate[after]=2024-09-01
```

### Sorting

```
GET /activities?sort=dueDate&order=asc
GET /activities?sort=priority&order=desc
```

### Field Selection

```
GET /activities?fields=id,title,status,dueDate,ownerId
```

Reduces payload for list views.

### Include

```
GET /activities/:id?include=intervention,owner,milestone
```

Expands related objects.

---

## Error Codes

| Code | HTTP Status | Meaning |
|------|------------|---------|
| `UNAUTHORIZED` | 401 | Not authenticated |
| `FORBIDDEN` | 403 | No permission |
| `NOT_FOUND` | 404 | Object not found |
| `VALIDATION_ERROR` | 422 | Invalid input data |
| `CONFLICT` | 409 | Duplicate or state conflict |
| `RATE_LIMITED` | 429 | Too many requests |
| `SERVER_ERROR` | 500 | Internal server error |

Error responses always include a human-readable `message` and machine-readable `code`.

---

## Rate Limiting

| Tier | Limit |
|------|-------|
| Standard | 1,000 requests / minute |
| Bulk operations | 100 requests / minute |
| Exports | 10 requests / hour |

Rate limit headers returned on every response:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 987
X-RateLimit-Reset: 1693000000
```

---

## Webhooks

Supports outbound webhooks for:

```
intervention.created
intervention.updated
intervention.health_changed
activity.created
activity.completed
activity.overdue
milestone.achieved
budget.threshold_exceeded
```

Webhook payload: Object type, Object ID, Change, Actor, Timestamp.

---

## API Documentation

API is documented via **OpenAPI 3.0** spec. Accessible at `/api/docs`. Auto-generated from code annotations.

---

## Claude Implementation Notes

The API should be designed **before the front end**. Every screen should ask: "What API calls does this require?" and the API should make those calls simple.

Avoid designing APIs that require multiple sequential calls to populate a single screen. Use `include` parameters to allow the front end to retrieve related data in one request.
