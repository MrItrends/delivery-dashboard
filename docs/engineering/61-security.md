# 61 — Security

> Trust is a feature. Security should feel invisible.

---

## Principles

| Principle | Description |
|-----------|-------------|
| Least Privilege | Users receive only the access they need |
| Encryption | Data encrypted at rest and in transit |
| Audit Logging | Every sensitive action is logged |
| Role-based Access | Permissions derived from roles |
| Secure Attachments | Files served through authenticated URLs |
| Version History | Changes traceable and immutable |
| MFA | Multi-factor authentication supported |
| SSO | Single Sign-On via SAML/OIDC |

---

## Authentication

| Method | Support |
|--------|---------|
| Email + Password | Standard |
| Single Sign-On (SAML) | Enterprise |
| OpenID Connect | Enterprise |
| Multi-factor Authentication | Required for Admins |
| Session Management | Configurable timeout |

---

## Authorization

Every request must verify:

1. User is authenticated
2. User belongs to the workspace
3. User has required role
4. User has object-level permission

**Never trust client-supplied permission claims.**

---

## Sensitive Actions

The following require **explicit confirmation**:

| Action | Confirmation Type |
|--------|------------------|
| Financial approval | Two-step with reason |
| Object deletion | Confirmation dialog |
| Permission changes | Admin approval |
| Workspace transfer | Admin approval |
| Executive approval | Named approval workflow |
| Bulk data export | Logged with reason |

---

## Data Protection

| Area | Protection |
|------|-----------|
| Data in transit | TLS 1.3 minimum |
| Data at rest | AES-256 encryption |
| File uploads | Malware scanning |
| File access | Signed, time-limited URLs |
| Passwords | Bcrypt hashing (no plaintext) |
| API keys | Hashed, not stored in plaintext |

---

## Audit Log

Every audit log entry contains:

```typescript
interface AuditLog {
  id: string;
  timestamp: DateTime;
  userId: string;
  userEmail: string;
  action: string;
  objectType: string;
  objectId: string;
  previousValue: Record<string, unknown> | null;
  newValue: Record<string, unknown> | null;
  ipAddress: string;
  userAgent: string;
  workspaceId: string;
}
```

**Audit logs are append-only. They cannot be edited or deleted.**

---

## API Security

| Control | Implementation |
|---------|---------------|
| Authentication | JWT Bearer tokens |
| Token expiry | Short-lived access tokens (15min) + refresh |
| Rate limiting | Per user, per endpoint |
| Input validation | Server-side, always |
| SQL injection | Parameterized queries only |
| XSS | Content-Security-Policy headers |
| CSRF | SameSite cookies + CSRF tokens |

---

## File Security

- Files are never served from public URLs
- All file access requires authenticated, signed URL
- URLs expire after a configurable time window
- Malware scanning on upload
- File type validation (extension + MIME type)

---

## Compliance Considerations

The platform is designed to support:
- Data residency requirements
- Retention policies
- Right to access (data export)
- Audit trail requirements
- Role separation
- Government security standards

Specific compliance requirements should be configured per workspace.
