# Screens 13–16: Notifications, Files, Team & Settings

---

## 13 — Notifications

### Purpose

The operational inbox. Notifications are action requests, not information updates. They tell a user what they are required to do — not what happened.

### Primary Users

Everyone — but filtered to what matters to them specifically.

### Questions This Screen Answers

- What requires my action right now?
- What has been assigned to me?
- What decisions am I being asked to make?
- What approvals are pending from me?
- What has changed on objects I follow?

### Navigation Entry

Bell icon in top navigation. Route: `/notifications`.

### Required Sections

| Section | Content |
|---------|---------|
| Unread | All unread notifications, most recent first |
| Recent | Notifications read in the last 7 days |
| Grouped Notifications | Batched notifications by object (5 updates to the same intervention → one group) |
| Filters | By type (approval, assignment, mention, deadline, status change) |
| Archive | Dismissed or actioned notifications — permanent record |

### Never Include

- Chat or messaging threads (comments belong on the objects they discuss)
- Marketing or system promotional messages
- Notifications about objects the user has no access to

### Notification Types

| Type | Trigger | Priority |
|------|---------|---------|
| Approval Required | Something awaiting my approval | Urgent |
| Assigned | New activity or object assigned to me | High |
| Mentioned | @mentioned in a comment | High |
| Deadline | Activity or milestone due in 24–48h | High |
| Status Change | Object I follow changed status | Normal |
| Comment | Comment added to object I own | Normal |
| File | Evidence uploaded to object I manage | Normal |
| Completed | Activity I was waiting on is complete | Normal |

### Smart Grouping

When 3+ notifications relate to the same object in the same day, they collapse into a single grouped notification:

```
KS2 Update had 5 changes today   [Expand]
● Ahmed marked 3 activities complete
● Sarah uploaded Q3 evidence
● Milestone 2 submitted for approval
```

### Layout

```
┌──────────────────────────────────────────────────────────────┐
│ Notifications                                    [Mark all] │
├──────────────────────────────────────────────────────────────┤
│ [All] [Approvals 3] [Assigned 2] [Mentions] [Deadlines]     │
├──────────────────────────────────────────────────────────────┤
│ Today                                                        │
│                                                              │
│ ● URGENT  Milestone 2 approval requested by Ahmed           │
│   KS2 Curriculum Update · 2 hours ago    [Review] [Dismiss] │
│                                                              │
│ ● HIGH    Assigned: Draft curriculum materials              │
│   KS2 Update · Ahmed → You · 4 hours ago  [Open] [Dismiss]  │
│                                                              │
│ Yesterday                                                    │
│ ○ NORMAL  Sarah commented on KS2 Update                    │
│   "The supplier timeline needs to be reviewed..."            │
└──────────────────────────────────────────────────────────────┘
```

---

## 14 — Files

### Purpose

Contextual document management. Files in the Delivery Dashboard are not stored in folders — they are attached to objects. Every file has a parent (an Intervention, Activity, Milestone, or Report) and appears in context.

### Primary Users

- All users who upload, view, or approve documents
- Delivery Managers (managing evidence)
- Finance Teams (attaching financial documents)
- Approvers (reviewing evidence files)

### Questions This Screen Answers

- What files are attached to this programme?
- What is the latest version of this document?
- Who uploaded this, and when?
- Has this file been approved as evidence?
- What comments exist on this document?

### Navigation Entry

From any object → Files tab. Route: `/interventions/[id]/files`.

### Required Sections

| Section | Content |
|---------|---------|
| File List | All files attached to this object, sorted by upload date (newest first) |
| Preview | In-browser preview of selected file (PDF, images, Office documents) |
| Version History | All versions of the same file — can view any version |
| Relationships | What objects this file is attached to (a file may evidence multiple milestones) |
| Comments | Per-file comment thread — separate from the object's discussion tab |

### Never Include

- Folder tree navigation as primary browsing model (files are found via their parent objects, not folder structures)
- File management features that replace the object hierarchy (files live on objects, not in folders)

### Supported File Types

```
Documents:   PDF, Word (.docx), Excel (.xlsx), PowerPoint (.pptx), Text
Images:      JPG, PNG, GIF, SVG, WebP
Video:       MP4, MOV (preview and playback in-browser)
Data:        CSV, JSON
Archives:    ZIP (list contents; extract not supported)
```

### File States

| State | Meaning |
|-------|---------|
| Draft | Uploaded but not yet used as milestone evidence |
| Evidence | Attached to a milestone or report as supporting proof |
| Approved Evidence | Used in an approved milestone or report — locked |
| Superseded | Older version, replaced by newer upload |
| Archived | No longer active but retained for audit purposes |

### Layout

```
┌──────────────────────────────────────────────────────────────┐
│ Files (12)                               [+ Upload]  [Filter]│
├──────────────────────────────────────────────────────────────┤
│ ☐ Name                 Type   Size    Uploaded    Status     │
│ ☐ Q3 Progress Plan     PDF    2.4MB   Ahmed 2d    Evidence   │
│ ☐ Supplier Agreement   DOCX   1.1MB   Sarah 5d    Approved   │
│ ☐ Budget Forecast Q4   XLSX   840KB   Finance 1w  Draft      │
├──────────────────────────────────────────────────────────────┤
│ [File Preview Panel - PDF renders inline]                    │
│                                                              │
│ Version History                                              │
│ v3 — Current · Ahmed · 15 Sept                              │
│ v2 — Sarah · 12 Sept                                        │
│ v1 — Ahmed · 1 Sept                                         │
└──────────────────────────────────────────────────────────────┘
```

---

## 15 — Team

### Purpose

Understand who is working on a programme and what they are responsible for. Team is an access and context view — not a project management or HR tool.

### Primary Users

- Delivery Managers (managing team access)
- Project Managers (understanding resource allocation)
- Workspace Admins (managing permissions)
- All users (finding colleagues and understanding roles)

### Questions This Screen Answers

- Who has access to this intervention?
- What is each person's role?
- Who is assigned the most work?
- Who should I contact about X?
- Is this person available?

### Navigation Entry

From any object → Team tab. From Workspace → Settings → Users. Route: `/team` or `/interventions/[id]/team`.

### Required Sections

| Section | Content |
|---------|---------|
| Directory | All team members with role, status, last active |
| Assignments | What each person is currently assigned to |
| Capacity | How many activities each person has open, by status |
| Availability | Leave or out-of-office indicators (if configured) |
| Org Structure | Visual hierarchy if org chart is configured |
| Recent Collaboration | Who has been most active on this object |

### Never Include

- HR workflows (hiring, performance reviews, salary)
- Payroll data
- Personal contact details beyond work email
- Reporting structure management

### Primary Actions

- Invite team member (sends invitation email)
- Change role (requires appropriate permissions)
- Remove access

### Layout

```
┌──────────────────────────────────────────────────────────────┐
│ Team (8 members)                              [+ Invite]    │
├──────────────────────────────────────────────────────────────┤
│ [Directory] [Assignments] [Capacity]                         │
├──────────────────────────────────────────────────────────────┤
│ Name              Role               Active   Assigned      │
│ Ahmed Yusuf       Delivery Manager   Today    12 activities  │
│ Sarah Evans       Project Manager    Yesterday 3 activities  │
│ Marcus Johnson    Contributor        3d ago    8 activities  │
│ Priya Sharma      Finance Lead       Today     4 activities  │
├──────────────────────────────────────────────────────────────┤
│ Capacity Overview                                           │
│ Ahmed     ████████████░░  12 open (3 overdue)               │
│ Sarah     ███░░░░░░░░░░░   3 open                           │
│ Marcus    ████████░░░░░░   8 open (1 blocked)               │
└──────────────────────────────────────────────────────────────┘
```

---

## 16 — Settings

### Purpose

Configure the platform. Settings is the administration layer — it should be hard to reach accidentally and easy to use deliberately.

### Primary Users

- Workspace Admins
- IT Administrators
- Portfolio Managers (for their own scope settings)

### Required Sections

| Section | Content |
|---------|---------|
| Workspace | Name, logo, description, locale, timezone |
| Users | Invite, manage roles, deactivate users (never delete) |
| Permissions | Role definitions and what each role can do |
| Notifications | Default notification preferences for the workspace |
| Integrations | Connected services — SSO, calendar export, webhooks |
| Security | MFA requirements, session settings, audit log access |
| Appearance | Workspace theme, density default, custom branding |

### Never Include

- Operational data (projects, activities, reports)
- Intervention or programme management
- Financial or budget data
- Cross-workspace configuration (each workspace is governed by its own admin)

### Settings Navigation

Settings uses a secondary sidebar navigation — not tabs. The settings categories are too many and too distinct to work as tabs.

```
[← Back to Workspace]

Settings

Workspace
Users
Permissions
Notifications
Integrations
Security
Appearance

[Danger Zone]
  Archive Workspace
```

### Success Criteria

An admin can complete any configuration task — invite a user, change a role, configure an integration — without referring to documentation.
