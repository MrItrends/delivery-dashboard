# 22 — Targets & KPIs

## Purpose

Targets measure whether delivery is producing the intended outcomes.

- Activities measure **effort**
- Milestones measure **achievements**
- Targets measure **impact**

Without Targets, the platform knows what teams are doing. With Targets, it knows whether that work **is making a difference**.

---

## Business Goal

Connect operational delivery with measurable national outcomes. Every Priority Area, Project and Intervention should demonstrate tangible progress through quantifiable indicators.

---

## Core Philosophy

A Target is not a task. It is not a milestone. **It is a measurable outcome.**

**Examples:**
- Increase broadband coverage to 85%
- Reduce maternal mortality by 15%
- Construct 2,000 classrooms
- Digitize 80% of public records

Targets should describe results that **citizens experience**.

---

## Target Object

```
Target
├── Definition
├── Baseline
├── Current Value
├── Target Value
├── Progress
├── Trend
├── Forecast
├── Evidence
├── Contributors
└── History
```

---

## Required Fields

| Field | Description |
|-------|-------------|
| Name | Clear outcome title |
| Description | Full context |
| Measurement Unit | % / Number / Currency / Score |
| Baseline | Starting value |
| Current Value | Latest measured value |
| Target Value | Goal to achieve |
| Owner | Accountable person |
| Reporting Frequency | How often updated |
| Data Source | Where data originates |
| Verification Method | How verified |
| Priority Area | Strategic parent |
| Project | Programme context |
| Intervention | Delivery context |

---

## KPI Relationship

KPIs aggregate multiple Targets.

**Example:**
```
Healthcare Performance KPI
  ↓
Hospital Capacity Target
↓
Doctors Recruited Target
↓
Equipment Installed Target
↓
Vaccination Coverage Target
```

Each Target contributes to one or more KPIs.

---

## Views

| View | Purpose |
|------|---------|
| Overview | Summary cards for all targets |
| Table | Dense comparison with sorting/filtering |
| Trend | Historical progress chart |
| Analytics | Deep performance analysis |
| Comparison | Side-by-side target comparison |
| Forecast | Projected completion |
| Regional | Geographic breakdown |

---

## Progress Display

Every Target should display:

```
Baseline
  ↓
Current
  ↓
Target
  ↓
Expected (based on trend)
  ↓
Forecast (based on velocity)
```

Users should understand both current achievement and projected achievement.

---

## Trend Analysis

Visualize:
- Historical Progress
- Quarterly Change
- Monthly Change
- Annual Trend
- Forecast

Avoid decorative charts. Prioritize readability.

---

## Forecast

The platform should estimate:
- Likely Completion Date
- Risk of Missing Target
- Required Delivery Rate
- Confidence Score

Initially rule-based. Future versions may introduce AI forecasting.

---

## Target Health

Calculated from:
- Progress toward target value
- Time remaining
- Delivery velocity
- Milestone completion
- Intervention health
- Risk exposure

---

## Reporting Frequency

| Frequency | Use Case |
|-----------|---------|
| Daily | Operational indicators |
| Weekly | Programme indicators |
| Monthly | Strategic indicators |
| Quarterly | Executive indicators |
| Annual | National statistics |

Different Targets require different reporting cadences.

---

## Evidence

Every reported value should link to supporting evidence:
- Official statistics
- Surveys
- Government databases
- Inspection reports
- External audits

---

## Notifications

| Trigger | Notification |
|---------|-------------|
| Reporting due | Remind target owner |
| Target reached | Notify Portfolio Manager |
| Target exceeded | Celebrate achievement |
| Progress stagnates | Alert delivery team |
| Forecast becomes critical | Escalate to sponsor |
| Data source unavailable | Alert data owner |

---

## Automation Rules

| Trigger | Action |
|---------|--------|
| Milestone achieved | Update related Targets |
| Activities completed | Recalculate Progress |
| New evidence uploaded | Trigger verification |
| Target reached | Notify Portfolio Manager |

---

## Claude Implementation Notes

Targets should always answer:

> *"Are citizens experiencing the intended outcome?"*

Avoid treating Targets as another project management object. They belong to **performance management**.

Visual language should emphasize: **Measurement → Progress → Trend → Confidence → Forecast**

---

## Review Checklist

- [ ] Targets measure outcomes, not work
- [ ] Progress is data-driven
- [ ] Forecasts are explainable
- [ ] KPIs aggregate Targets correctly
- [ ] Evidence supports reported values
- [ ] Trends remain readable over long periods
- [ ] Users can understand performance without opening operational screens
