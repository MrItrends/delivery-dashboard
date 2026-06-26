# 06 — Product Vocabulary

A shared language is one of the foundations of a successful product. Every designer, engineer, product manager and stakeholder should use the same terminology.

> No two words should describe the same concept, and one word should never represent multiple concepts.

---

## Core Hierarchy

```
Workspace
  └── Portfolio
        └── Priority Area
              └── Project
                    └── Intervention
                          └── Milestone
                          └── Activity
                                └── Update
                                      └── Comment
```

Everything inside the application belongs somewhere within this hierarchy.

---

## Object Definitions

### Workspace
The highest-level container. Represents an entire government, ministry, delivery unit or organisation.

**Examples:** Office of the President, Ministry of Health, Ministry of Education, Prime Minister's Delivery Unit

Contains: Users, Teams, Portfolios, Settings, Reports, Notifications

> There is only one active workspace at a time.

---

### Portfolio
Groups together strategic programmes.

**Examples:** National Development Plan, Economic Recovery Programme, Health Transformation Programme

Contains: Multiple Priority Areas

---

### Priority Area
Represents major government objectives.

**Examples:** Healthcare, Education, Agriculture, Infrastructure, Public Safety, Digital Economy

Priority Areas answer: *What are we trying to improve?*

---

### Project
Represents large delivery initiatives.

**Examples:** National Broadband Expansion, Teacher Recruitment Programme, Hospital Modernisation

- Belongs to one Priority Area
- Contains multiple Interventions

---

### Intervention
A major piece of work contributing to a project. This is where execution begins.

**Examples:** Construct Regional Hospitals, Recruit Medical Staff, Digitise Health Records, Launch Vaccine Campaign

---

### Milestone
Measures significant achievements.

**Examples:** Planning Approved, Funding Secured, Construction Completed, Phase One Delivered

> Milestones never represent work. They represent **outcomes**.

---

### Activity
An individual piece of work. The smallest operational unit in the system.

Contains: Owner, Due date, Priority, Status, Comments, Attachments, History

---

### Update
Communicates progress. Answers: *What changed? Why? When?*

Becomes part of an object's permanent history.

---

### Comment
Enables contextual discussion. Belongs to objects, never pages.

**Examples:** Comment on Project, Comment on Activity, Comment on Budget, Comment on Milestone

---

### Report
Communicates delivery performance. Reports never store data — they summarize existing information.

---

### Dashboard
A **view**, not an object. Dashboards visualize information. They do not own information.

---

### View
A way of displaying information.

**Examples:** Table, Board, Timeline, Calendar, List, Analytics

> Changing the view never changes the data.

---

### Owner
Every object has exactly one owner. Ownership represents accountability. Ownership is always visible.

---

### Collaborator
Contributors to an object. May edit, comment, review, approve. Collaborators are not owners.

---

### Watcher
Receives updates. Cannot necessarily edit. Stays informed.

---

### Status
Communicates health. Every object has a lifecycle. Status values differ between object types but remain consistent across the platform.

---

### Relationship
Objects connect to one another. Relationships are never duplicated.

---

## Naming Principle

> Every noun inside the product should correspond to one object. If a concept cannot be represented as an object, it should not become part of the navigation.
