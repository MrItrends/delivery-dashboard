# Security

## Philosophy

The Delivery Dashboard handles **sensitive government data**. Security is not optional. It is foundational.

Security must be: layered, defensive, auditable, and continuously tested.

---

## Threat Model

Government platforms are high-value targets for:
- Nation-state actors seeking policy intelligence
- Political actors seeking delivery data
- Insider threats with privileged access
- Ransomware targeting government infrastructure
- Social engineering against officials

Every security decision is made with this context in mind.

---

## Authentication

### JWT (JSON Web Tokens)

```
Access Token:  Short-lived (1 hour)
Refresh Token: Long-lived (30 days), stored httpOnly cookie
```

Access tokens carry: User ID, Workspace ID, Role, Permissions, Expiry.

Tokens are validated on every request. Revocation via Redis token blocklist.

### Multi-Factor Authentication

MFA is **mandatory** for all users. No exceptions.

Supported methods:
- TOTP (Google Authenticator, Authy)
- Hardware keys (WebAuthn / FIDO2)
- SMS (deprecated — available only where TOTP is not)

### Single Sign-On (SSO)

Supports: SAML 2.0, OAuth 2.0, OpenID Connect.

Integrates with: Microsoft Azure AD, Google Workspace, Okta, Keycloak.

### Session Management

```typescript
// Session configuration
{
  maxAge: 30 * 24 * 60 * 60 * 1000,  // 30 days
  httpOnly: true,
  secure: true,                         // HTTPS only
  sameSite: 'strict',
  domain: '.delivery-dashboard.gov',
}
```

---

## Authorization

All API endpoints enforce:
1. Authentication (valid JWT)
2. Workspace membership
3. Role-based permissions
4. Object-level access control

```typescript
// Example middleware chain
app.use(authenticate);        // Valid JWT
app.use(requireWorkspace);    // User belongs to workspace
app.use(checkPermissions);    // Has required permission

// Object-level check
const activity = await getActivity(id);
if (!canAccess(user, activity)) {
  throw new ForbiddenError();
}
```

---

## Data Encryption

| Data | Encryption |
|------|-----------|
| Data in transit | TLS 1.3 minimum |
| Data at rest | AES-256 |
| File storage | Server-side encryption (S3 SSE) |
| Database | Encrypted at rest |
| Backups | Encrypted + offsite |
| Sensitive fields | Application-level encryption |

Sensitive fields (budget figures, personal data) encrypted at application layer using separate key management.

---

## Input Validation

All inputs validated and sanitized:

```typescript
// Validation schema (Zod)
const activitySchema = z.object({
  title: z.string().min(1).max(500).trim(),
  description: z.string().max(10_000).optional(),
  dueDate: z.string().datetime(),
  priority: z.enum(['critical', 'high', 'normal', 'low']),
  interventionId: z.string().uuid(),
});

// All user-provided HTML is sanitized
const cleanDescription = DOMPurify.sanitize(userInput, {
  ALLOWED_TAGS: ['p', 'ul', 'ol', 'li', 'strong', 'em', 'a'],
  ALLOWED_ATTR: ['href'],
});
```

SQL injection prevented by parameterized queries exclusively. No string concatenation in SQL.

---

## OWASP Top 10 Mitigations

| Threat | Mitigation |
|--------|-----------|
| Injection | Parameterized queries, input validation |
| Broken Auth | JWT + MFA + session management |
| Sensitive Data Exposure | Encryption in transit and at rest |
| XXE | XML parsing disabled |
| Broken Access Control | Object-level permission checks |
| Security Misconfiguration | Hardened defaults, no debug in production |
| XSS | React's default escaping, Content Security Policy |
| Insecure Deserialization | Validated schemas on all input |
| Vulnerable Dependencies | Automated dependency scanning |
| Insufficient Logging | Comprehensive audit logs |

---

## Content Security Policy

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: *.cdn.gov;
  connect-src 'self' wss://api.delivery-dashboard.gov;
  font-src 'self';
  frame-src 'none';
  object-src 'none';
```

---

## Audit Logging

Every action is logged:

```typescript
interface AuditLog {
  id: string;
  actor: { userId: string; ip: string; userAgent: string };
  action: string;
  objectType: string;
  objectId: string;
  timestamp: DateTime;
  changes: Record<string, { from: unknown; to: unknown }>;
  metadata: Record<string, unknown>;
}
```

Audit logs are: Immutable, Stored separately from application data, Retained for minimum 7 years, Accessible to auditors only.

---

## Penetration Testing

- External penetration test: minimum annually
- Bug bounty program: continuous
- Automated DAST scanning: every deployment
- Dependency vulnerability scanning: daily

---

## Incident Response

Defined runbook for:
1. Data breach
2. Unauthorized access
3. Service outage
4. Ransomware
5. Insider threat

Government CERT notified within 72 hours of confirmed breach (GDPR / local equivalent).
