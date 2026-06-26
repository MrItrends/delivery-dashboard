# Files

## Purpose

Files provide **evidence-based accountability**. Government delivery must be documented. The Files system ensures every document exists in context — not in a shared folder disconnected from the work it supports.

---

## Business Goal

Eliminate disconnected file management. Every document should live beside the delivery object it supports — not in a separate file system.

---

## Core Philosophy

Files are **attached to objects**, not stored independently.

Wrong: `Shared Drive → Ministry Documents → 2024 → Q3 → Healthcare → Budget`

Correct: `Healthcare Project → Budget → Q3 Budget Revision.pdf`

The document lives beside the decision it supports. The user finds the document by finding the work.

---

## Supported File Types

| Category | Formats |
|---------|---------|
| Documents | PDF, Word, PowerPoint, Excel |
| Images | JPEG, PNG, GIF, WebP, SVG |
| Video | MP4, MOV, AVI |
| Audio | MP3, WAV |
| Data | CSV, JSON, XML |
| Archives | ZIP, RAR |

Maximum file size: 500MB per file. Unlimited total storage.

---

## File Object Anatomy

```
File
├── Name
├── Type
├── Size
├── Uploader
├── Upload Date
├── Description
├── Tags
├── Category
├── Version History
├── Access Log
├── Comments
└── Parent Object
```

---

## File Categories

| Category | Examples |
|---------|---------|
| Evidence | Proof of delivery, photos |
| Contract | Legal agreements |
| Policy | Policy documents, legislation |
| Report | Generated reports, PDFs |
| Presentation | Briefings, slide decks |
| Data | Spreadsheets, datasets |
| Meeting Notes | Minutes, decisions |
| Media | Photos, videos |
| Certificate | Official completion documents |

---

## Version Control

Every file maintains version history. Uploading a new version: preserves previous versions, records who uploaded, timestamps the change.

Files are never silently overwritten.

---

## Access Log

Every file access is logged: Who viewed, When, From where.

For sensitive government documents, this audit log is essential.

---

## File Permissions

Files inherit object permissions. Additional restriction possible: "Restricted" files visible only to explicit grantees.

---

## File Search

Files appear in global search results. Searchable by: Name, Description, Tags, Content (if indexed), Date, Uploader, Parent Object.

---

## Bulk Operations

Select multiple files: Move, Delete, Archive, Download as ZIP, Change Category, Tag.

---

## Claude Implementation Notes

The Files module should feel like a **contextual document vault** — not a file browser.

Users should never think "where did I save that?" They should think "what project was it attached to?" and find it immediately.

Design file previews inline — PDF, images, and presentations should open in a panel without leaving the page.
