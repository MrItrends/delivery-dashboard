# Pattern 39 — Evidence Management

## Philosophy

Delivery claims require **evidence**. Evidence should feel integral, not attached as an afterthought.

In government delivery, evidence is not optional. Milestones cannot be marked complete without it. Budget utilization cannot be confirmed without it. Decisions cannot be formally recorded without it.

---

## Supported Evidence Types

| Type | Examples |
|------|---------|
| Documents | PDF, Word, Excel, PowerPoint |
| Images | Photos of implementation, site visits |
| Videos | Recordings, walkthroughs |
| External Links | Government portals, news coverage |
| Reports | Audit reports, assessments |
| Meeting Notes | Minutes with decisions |
| Certificates | Completion certificates, sign-offs |
| Data Files | CSV exports, database extracts |

---

## Evidence Lifecycle

```
Upload → Preview → Attach → Version → Comment → Approve → Archive
```

Evidence remains **permanently attached** to the originating object. It cannot be moved or deleted once used in an approval.

---

## Uploading Evidence

**Methods:**
- Drag and drop into the evidence section
- Click to browse and select
- Paste from clipboard (images)
- Add external URL

Upload shows: progress bar, file name, file size, cancel option.

Multiple files can be uploaded simultaneously.

---

## Evidence Preview

Evidence should be previewable **without downloading**:

| File Type | Preview Method |
|-----------|--------------|
| PDF | Inline viewer (first page) |
| Images | Inline display |
| Video | Inline player |
| Word/Excel | Thumbnail + file info |
| URLs | Link preview card |

Clicking preview opens a full-screen viewer. Download is secondary.

---

## Versioning

When a new version of evidence is uploaded:
- Previous version is preserved
- Version history is accessible
- Most recent version is shown by default

```
Budget_Report.pdf
  v3 — Current — Uploaded by Ahmed, 15 Sept
  v2 — Uploaded by Sarah, 10 Sept
  v1 — Uploaded by Ahmed, 1 Sept
```

---

## Evidence Comments

Users can comment on specific pieces of evidence:
- Thread attached to the file (not the parent object)
- Comments can be resolved
- Reviewer can request clarification via comment

---

## Evidence Approval

For milestone completion, evidence must be:
1. Attached
2. Reviewed by the Reviewer
3. Approved by the Approver

The approval form displays all attached evidence for review before the decision is made.

---

## Evidence in Context

Evidence surfaces throughout the product:

| Where | How |
|-------|-----|
| Activity Inspector | Files tab |
| Milestone Detail | Evidence section (required) |
| Intervention Overview | Evidence count badge |
| Project Reports | Links to source evidence |
| Audit Trail | Permanent reference |

---

## Evidence vs. Files

**Evidence** = attached to a specific claim, used to verify completion.

**Files** = general documents related to the object (contracts, briefings, plans).

Both live in the same storage layer. The distinction is in how they're used:
- Evidence appears in the approval workflow
- Files appear in the general Files section

---

## Evidence Integrity

Once used in an approved milestone:
- Evidence cannot be deleted
- Evidence can be superseded (new version added)
- Version history remains intact

This ensures that what was approved is always visible and attributable.
