# Budgets & Financing

## Purpose

Budget tracking connects financial accountability to delivery performance. Government programmes without financial visibility regularly overspend, underspend, or lose political support due to poor budget communication.

---

## Business Goal

Give finance leads, project managers, and executives real-time visibility into funding allocation, utilization, and forecast — connected to delivery progress, not isolated from it.

---

## Core Philosophy

Budget is not a separate module. **Budget is a lens on delivery.**

Every financial decision connects to a project, intervention, or activity. Spending without delivery context is invisible risk.

---

## Budget Object Anatomy

```
Budget
├── Budget Name
├── Total Allocation
├── Committed Amount
├── Spent Amount
├── Remaining Amount
├── Forecast at Completion
├── Funding Sources
├── Variance
├── Currency
├── Fiscal Year
├── Owner
├── Finance Lead
├── Approvers
├── Line Items
├── Transactions
├── Approvals
├── Documents
└── History
```

---

## Budget States

| State | Meaning |
|-------|---------|
| Draft | Being defined |
| Submitted | Awaiting approval |
| Approved | Formally authorized |
| Active | Funds being utilized |
| Completed | Programme concluded |
| Archived | Historical reference |

---

## Budget Health

| Indicator | Meaning |
|-----------|---------|
| On Track | Spending matches plan |
| Underspent | Risk of losing allocation |
| Overspent | Requires remediation |
| At Risk | Forecast exceeds allocation |
| Pending Approval | Awaiting authorization |

---

## Funding Sources

Government budgets often involve multiple sources:

| Type | Examples |
|------|---------|
| Government Appropriation | Central allocation |
| Donor Funding | International partners, grants |
| Loans | Development bank financing |
| Internal Transfer | Between departments |
| Partnership Funding | Joint programme |

Each source tracks: Amount, Provider, Terms, Disbursement Schedule, Conditions.

---

## Approval Workflow

```
Budget Created → Finance Lead Review → Project Manager Approval → Director Approval
```

Every approval records: Who, When, Decision, Comment.

---

## Budget Performance

```
┌───────────────────────────────────────────────────┐
│ Allocated: $10,000,000                            │
│ Committed:  $7,200,000  (72%)                     │
│ Spent:      $4,500,000  (45%)                     │
│ Remaining:  $5,500,000  (55%)                     │
│ Forecast:  $9,800,000   (98% — on track)          │
└───────────────────────────────────────────────────┘
```

---

## Budget + Delivery Integration

Budget health always connects to delivery progress. Executives should instantly understand:

- High spend + low delivery = problem
- Low spend + high delivery = efficiency or undercounting
- High spend + high delivery = healthy programme
- Low spend + low delivery = risk of programme stalling

---

## Claude Implementation Notes

Budget tracking is one of the most politically sensitive modules. Design it to be **transparent, simple, and connected to delivery** — not a standalone finance module.

The Budget should feel more like a **financial dashboard for delivery managers** than an accounting system. Finance teams have their own tools. The Delivery Dashboard must show budget status in terms that delivery leads and executives understand.
