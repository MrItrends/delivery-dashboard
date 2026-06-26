# 57 — API Architecture

## Philosophy

Objects expose APIs. Not pages.

```
/workspaces
/portfolios
/priority-areas
/projects
/interventions
/activities
/milestones
/targets
/budgets
/reports
/files
/comments
/notifications
/users
/teams
```

**Never:**
```
/project-dashboard
/activity-page
/portfolio-view
```

APIs should model **business concepts**.

---

## REST Conventions

### Resource Naming
- Plural nouns: `/activities`, `/interventions`
- Hierarchical: `/projects/:id/interventions`
- Consistent: Same patterns everywhere

### HTTP Methods

| Method | Usage |
|--------|-------|
| `GET` | Retrieve resources |
| `POST` | Create resources |
| `PUT` | Replace resources |
| `PATCH` | Partial updates |
| `DELETE` | Remove resources |

### Versioning
All endpoints versioned: `/api/v1/...`

---

## Collection Endpoints

Every collection endpoint supports:

| Parameter | Description |
|-----------|-------------|
| `page` | Page number (default: 1) |
| `limit` | Items per page (default: 25, max: 100) |
| `search` | Full-text search |
| `sort` | Field to sort by |
| `order` | `asc` or `desc` |
| `filter[field]` | Field-specific filters |
| `group` | Grouping field |
| `fields` | Projection (selected fields only) |

**Without requiring custom endpoints.**

---

## Request/Response Format

### Standard Response

```json
{
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 25,
    "total": 1234,
    "hasMore": true
  }
}
```

### Collection Response

```json
{
  "data": [ ... ],
  "meta": {
    "page": 1,
    "limit": 25,
    "total": 1234,
    "hasMore": true
  }
}
```

---

## Error Responses

Every API error returns:

```json
{
  "error": {
    "code": "ACTIVITY_NOT_FOUND",
    "message": "The requested activity could not be found.",
    "details": "Activity with ID abc123 does not exist or you do not have permission to access it.",
    "suggestion": "Verify the activity ID or check your permissions.",
    "referenceId": "err_xyz789",
    "timestamp": "2025-01-15T10:30:00Z"
  }
}
```

| Field | Purpose |
|-------|---------|
| `code` | Machine-readable error code |
| `message` | Human-readable summary |
| `details` | Full explanation |
| `suggestion` | Recovery action |
| `referenceId` | For support/debugging |
| `timestamp` | When it occurred |

---

## Key Endpoints

### Interventions

```
GET    /api/v1/interventions
GET    /api/v1/interventions/:id
POST   /api/v1/interventions
PATCH  /api/v1/interventions/:id
DELETE /api/v1/interventions/:id

GET    /api/v1/interventions/:id/activities
GET    /api/v1/interventions/:id/milestones
GET    /api/v1/interventions/:id/budget
GET    /api/v1/interventions/:id/targets
GET    /api/v1/interventions/:id/files
GET    /api/v1/interventions/:id/comments
GET    /api/v1/interventions/:id/history
GET    /api/v1/interventions/:id/team
GET    /api/v1/interventions/:id/risks
```

### Activities

```
GET    /api/v1/activities
GET    /api/v1/activities/:id
POST   /api/v1/activities
PATCH  /api/v1/activities/:id
DELETE /api/v1/activities/:id

PATCH  /api/v1/activities/:id/status
PATCH  /api/v1/activities/:id/assign
POST   /api/v1/activities/:id/comments
GET    /api/v1/activities/:id/history
POST   /api/v1/activities/bulk
```

---

## Permissions

Every endpoint enforces permissions:
- Check workspace membership
- Check object-level permissions
- Check role capabilities
- Return `403` for unauthorized, never `404` (which reveals existence)

---

## Rate Limiting

| Tier | Limit |
|------|-------|
| Standard | 1000 req/min |
| Bulk operations | 100 req/min |
| Report generation | 10 req/min |
| Search | 500 req/min |

---

## Idempotency

`POST` requests that create resources should accept an `Idempotency-Key` header to prevent duplicate creation on network retry.

```
Idempotency-Key: client-generated-uuid
```
