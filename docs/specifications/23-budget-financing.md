# 23 — Budget & Financing

## Purpose

Budget is not an accounting module. **Budget is a delivery enabler.**

The purpose of Budget & Financing is to provide complete visibility into how financial resources support government delivery while maintaining a direct connection between investment and measurable outcomes.

Money should never exist independently. Every allocation should connect to: Projects, Interventions, Milestones, Targets, Delivery Outcomes.

> **The platform should allow users to answer one critical question: Are financial resources enabling delivery or preventing it?**

---

## Business Goal

Create a transparent financial layer that allows governments to understand where funding originates, how it is allocated, how it is being utilized and whether additional financing is required to achieve delivery objectives.

---

## Core Philosophy

Traditional finance systems answer: *"How much have we spent?"*

The Delivery Dashboard answers: *"What did that spending achieve?"*

**Budget should always remain connected to delivery.**

---

## Financial Hierarchy

```
Workspace
  ↓
Portfolio Budget
  ↓
Priority Area Budget
  ↓
Project Budget
  ↓
Intervention Budget
  ↓
Expenditure
```

Budget always rolls upward. Reports never require duplicate financial entry.

---

## Object Anatomy

```
Budget
├── Overview
├── Funding Sources
├── Allocation
├── Expenditure
├── Forecast
├── Funding Gap
├── Financial Risks
├── Approval History
├── Documents
└── Audit History
```

---

## Funding Sources

An Intervention or Project may receive funding from multiple sources:

| Source | Description |
|--------|-------------|
| National Treasury | Government allocation |
| Development Banks | World Bank, AfDB, etc. |
| Donor Agencies | Bilateral/multilateral |
| Private Sector | PPP arrangements |
| Public Private Partnerships | Blended financing |

Every funding source should remain independently trackable.

---

## Budget Categories

| Category | Description |
|----------|-------------|
| Planning | Design and scoping costs |
| Operations | Running costs |
| Infrastructure | Capital expenditure |
| Technology | Digital systems |
| Procurement | Goods and services |
| Training | Capacity building |
| Communications | Stakeholder engagement |
| Consulting | Expert advisory |
| Emergency Reserve | Contingency |

Categories remain configurable per Workspace.

---

## Budget Health

Budget Health combines:
- Available Funding
- Expenditure Rate
- Forecast
- Funding Gap
- Outstanding Commitments
- Financial Risks

Budget Health should answer: *"Can this initiative finish successfully with current funding?"*

---

## Funding Gap

One of the most important metrics:

```
Funding Gap = Required Funding − Confirmed Funding
```

The platform should visualize this clearly and prominently.

---

## Financial Dashboard

Displays:
| Metric | Description |
|--------|-------------|
| Allocated | Total approved funding |
| Committed | Legally committed spend |
| Spent | Actual expenditure to date |
| Remaining | Available balance |
| Forecast | Projected total cost |
| Funding Gap | Required minus confirmed |
| Burn Rate | Monthly expenditure rate |
| Upcoming Releases | Scheduled funding tranches |

The emphasis is **clarity** rather than accounting complexity.

---

## Financial Timeline

Budgets should support:
- Annual planning
- Quarterly releases
- Monthly actuals
- Release schedules
- Cash flow projections

Financial planning should remain connected to programme milestones.

---

## Financial Approvals

Major financial changes require approval:

| Field | Description |
|-------|-------------|
| Approver | Who approved |
| Timestamp | When approved |
| Previous Value | Before the change |
| New Value | After the change |
| Reason | Why changed |
| Supporting Documentation | Evidence |

Every financial decision becomes auditable.

---

## Notifications

| Trigger | Notification |
|---------|-------------|
| Budget exceeds threshold | Notify Programme Manager |
| Funding approved | Update Project Health |
| Funding delayed | Alert Finance Lead |
| Forecast changes significantly | Notify Executive Sponsor |
| Funding gap increases | Alert Portfolio Manager |
| Financial review due | Remind Finance Team |

---

## Automation Rules

| Trigger | Action |
|---------|--------|
| Budget exhausted | Notify Programme Manager |
| Funding approved | Update Project Health |
| Funding Gap reduced | Recalculate Portfolio Health |
| Budget revision | Notify Finance Team |

---

## Claude Implementation Notes

Budget should never feel like ERP software.

The visual language should remain **simple, approachable and deeply connected to delivery outcomes**. Financial data should support decision making rather than overwhelm users.

Key design priorities:
- **Funding Gap** should always be prominent
- **Budget vs Actuals** should be immediately readable
- **Forecast** should show trajectory, not just current state
- **Audit history** should be accessible but not cluttered

---

## Review Checklist

- [ ] Funding linked to delivery outcomes
- [ ] Forecast always visible
- [ ] Financial health calculated automatically
- [ ] Approval history maintained
- [ ] Funding gap always prominent
- [ ] Connected to reports and dashboards
- [ ] Multiple funding sources supported
- [ ] Audit trail immutable
