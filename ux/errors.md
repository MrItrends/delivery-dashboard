# Error States

## Philosophy

Every error is an opportunity to help the user — not an opportunity to confuse them.

Errors should be: **specific, honest, and actionable**. The interface should explain what went wrong, why, and exactly how to recover.

---

## Error Principles

### Be Specific
"An error occurred" is not an error message. "We couldn't save this activity because the due date is before the start date" is.

### Be Honest
If the server is down, say so. Don't say "There was a problem with your request."

### Be Actionable
Every error should include at least one recovery path: Retry, Fix the Problem, Contact Support, Go Back.

### Be Proportionate
Minor errors get minor signals. Critical errors get prominent treatment. Not every error needs a red banner.

### Preserve User Work
If a form fails to submit, the user's input must be preserved. Never lose a user's data due to a network error.

---

## Error Levels

| Level | Severity | Display Pattern |
|-------|---------|----------------|
| Info | Low | Toast (blue) |
| Warning | Medium | Inline banner (yellow) |
| Error | High | Inline error (red) |
| Critical | Highest | Full page or modal |

---

## Error Patterns

### Toast (Info / Low Error)

For: Background sync failures, Network hiccups, Session warnings.

```
┌──────────────────────────────────────────────┐
│ ⚠ Changes saved locally. Syncing when        │
│   connection restores.          [Dismiss]    │
└──────────────────────────────────────────────┘
```

- Duration: 5 seconds (auto-dismiss)
- Position: Bottom right
- User can dismiss immediately

### Inline Field Error

For: Validation failures on form fields.

```
Due Date
[15 Sept 2024     ]
⚠ Due date cannot be before the start date (12 Oct 2024)
```

- Appears below the field
- Never clears the field content
- Disappears when user corrects input

### Section Error

For: Failed data load within a section.

```
┌──────────────────────────────────────────────┐
│ ⚠ Could not load activity data.             │
│ This may be a temporary issue.              │
│                               [Try Again]   │
└──────────────────────────────────────────────┘
```

### Form Submission Error

For: Submit failure (validation or server).

```
┌──────────────────────────────────────────────┐
│ ⚠ Unable to create this intervention.       │
│ Please review the following fields:          │
│ • Start Date is required                     │
│ • Intervention Lead must be assigned         │
└──────────────────────────────────────────────┘
```

Fields are highlighted. User corrects and resubmits.

### Page Error (404)

For: Object not found, permission removed, link expired.

```
┌──────────────────────────────────────────────┐
│                                              │
│   Object not found                           │
│                                              │
│   This activity may have been archived       │
│   or you may no longer have access.          │
│                                              │
│   [Go Back]    [Search for it]               │
│                                              │
└──────────────────────────────────────────────┘
```

### System Error (500)

For: Server unavailable, critical system failure.

```
┌──────────────────────────────────────────────┐
│                                              │
│   Something went wrong on our end           │
│                                              │
│   We've been notified and are working        │
│   to fix this. Please try again shortly.    │
│                                              │
│   [Retry]    [Contact Support]               │
│                                              │
└──────────────────────────────────────────────┘
```

### Permission Error

For: User lacks access.

```
┌──────────────────────────────────────────────┐
│                                              │
│   Access restricted                          │
│                                              │
│   You don't have permission to view          │
│   this intervention.                         │
│                                              │
│   [Request Access]    [Go Back]              │
│                                              │
└──────────────────────────────────────────────┘
```

---

## Error Message Writing

| Avoid | Prefer |
|-------|--------|
| "An error occurred" | "We couldn't save the activity due to a network error" |
| "Invalid input" | "The due date must be after the start date" |
| "Forbidden" | "You don't have permission to delete this" |
| "Error 403" | "Access restricted — contact your administrator" |
| "Something went wrong" | "We couldn't generate the report. Please try again" |

---

## Offline Errors

When the user loses connectivity:

1. Toast appears: "You're offline — changes will sync when reconnected"
2. All write actions queue locally
3. On reconnection, queue syncs automatically
4. Confirmation: "3 changes synced successfully"

---

## Claude Implementation Notes

Error states are where many products fail. Design each error state before implementing it.

Rule: Every error message should be reviewable by a non-technical government official and be immediately understood. If it requires technical knowledge to interpret, it must be rewritten.
