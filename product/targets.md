# Targets & KPIs

## Purpose

Targets connect delivery to outcomes. They ensure that the government is not simply completing activities — it is **achieving results**.

A Target is not an activity. It is a **measurable outcome**.

---

## Business Goal

Give leadership and delivery teams a clear, shared understanding of whether interventions are producing real-world impact — not just operational activity.

---

## Core Philosophy

Activities measure **effort**. Targets measure **impact**.

A government programme can have perfect activity completion with zero outcome achievement. Targets prevent this disconnect from going unnoticed.

---

## Target Object Anatomy

```
Target
├── Name
├── Description
├── Unit of Measurement
├── Baseline Value
├── Target Value
├── Current Value
├── Measurement Frequency
├── Data Source
├── Owner
├── Project / Intervention
├── Priority Area
├── Progress Trend
├── Forecast
├── History
└── Connected Activities
```

---

## Measurement Types

| Type | Examples |
|------|---------|
| Percentage | % of students enrolled, % budget utilized |
| Number | Hospitals built, Kilometers of road |
| Index | Human Development Index, Poverty Index |
| Currency | Revenue generated, Cost savings |
| Rate | Mortality rate, Unemployment rate |
| Boolean | Policy enacted: Yes/No |

---

## Target Health

Calculated from: Current vs. Target Value, Trend Direction, Forecast at Completion.

| Health | Meaning |
|--------|---------|
| On Track | Progress matches or exceeds trajectory |
| Slightly Off | Minor gap, manageable |
| At Risk | Significant gap, intervention needed |
| Critical | Will not achieve without major action |

---

## Progress Tracking

Updates are timestamped, attributed, and immutable.

```
2024-Q1: 12% (baseline)
2024-Q2: 23% (+11)
2024-Q3: 31% (+8)
2024-Q4: 45% (+14)  ← Target: 50%
```

Trends are always visible. Users should understand trajectory, not just current state.

---

## Forecasting

The system generates simple forecasts based on historical progress rate. Teams can override with manual forecasts, which are logged and attributed.

---

## Target Views

| View | Purpose |
|------|---------|
| Overview | All targets with current status |
| Performance Grid | Compare multiple targets |
| Trend Chart | Visual progress over time |
| Forecast | Projected completion trajectory |

---

## Claude Implementation Notes

Targets are one of the most important products in government delivery — but frequently neglected in platform design.

Design the Target object as a **living measurement workspace**, not a static field on a form. Progress should be visual, trend-aware, and connected to the activities that drive it.
