# 27 — Files

## Purpose

Files provide supporting evidence. They are **never standalone resources**.

Every uploaded document belongs to an object. This preserves context forever.

---

## Philosophy

**Wrong:**
```
Documents Folder → Random files
```

**Correct:**
```
Intervention → Evidence → Budget Approval → Contract
```

Everything has context.

---

## Supported Types

| Type | Examples |
|------|---------|
| Documents | PDF, Word, Excel, PowerPoint |
| Images | JPG, PNG, SVG |
| Videos | MP4, MOV |
| Archives | ZIP, RAR |
| GIS Data | Shapefiles, KML |
| External Links | URLs with context |

---

## File Object

| Field | Description |
|-------|-------------|
| Name | File title |
| Owner | Who uploaded |
| Object | What it belongs to |
| Version | Current version number |
| Uploaded By | User who uploaded |
| Uploaded Date | Timestamp |
| Tags | Classification labels |
| Status | Active / Archived |
| Description | Context and purpose |

---

## Version History

Every uploaded file supports:
- Current Version
- Previous Versions
- Restore to previous
- Download any version
- Change Log

Government delivery requires **permanent document history**.

---

## Preview

Preview without download. Supported formats:
- PDF
- Office documents
- Images
- Video
- Plain text

This reduces unnecessary downloads and speeds review.

---

## File Relationships

Files belong to:
- Projects
- Interventions
- Activities
- Milestones
- Budgets
- Reports
- Comments

**Never directly to Workspaces as loose files.**

---

## Search

Search by:
- Name
- Tag
- Uploader
- Object
- Content (OCR)
- Version
- Date range

---

## Review Checklist

- [ ] Versioning supported for all file types
- [ ] Preview available without download
- [ ] Context always preserved (never orphaned files)
- [ ] OCR enables content search
- [ ] Permanently linked to source objects
- [ ] Audit history maintained
