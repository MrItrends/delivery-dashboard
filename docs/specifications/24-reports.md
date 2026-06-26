# 24 — Reports & Executive Briefings

## Purpose

Reports transform operational delivery into executive understanding.

The platform should eliminate manual PowerPoint reporting. Reports should generate themselves. Executives should spend time making decisions rather than requesting updates.

---

## Business Goal

Provide automatically generated reporting that reflects live operational data. Every report becomes a **snapshot of reality** rather than manually assembled information.

---

## Core Philosophy

> Reports should never become another place to maintain data. Reports **consume** information. They never **own** information.

Every chart, every number, every paragraph, every summary should originate from the underlying objects.

---

## Report Types

| Type | Audience | Frequency |
|------|----------|-----------|
| Executive Brief | President / PM / Minister | Weekly / As needed |
| Portfolio Report | Portfolio Manager | Monthly |
| Project Report | Project Director | Weekly / Monthly |
| Intervention Report | Intervention Lead | Weekly |
| Financial Report | Finance Lead | Monthly / Quarterly |
| Performance Report | Leadership | Quarterly |
| Quarterly Review | Cabinet | Quarterly |
| Ministerial Report | Minister | Monthly |
| Board Report | Governing Board | Quarterly |
| Public Summary | Citizens / Press | As needed |

---

## Report Anatomy

```
Report
├── Executive Summary
├── Delivery Progress
├── Budget Summary
├── Targets
├── Milestones
├── Risks
├── Decisions
├── Recommendations
└── Appendix
```

---

## Executive Summary

The Executive Summary should become one of the defining experiences of the product.

Instead of presenting hundreds of metrics, it answers:
- What happened?
- What changed?
- What requires attention?
- What decisions are required?

Eventually, AI may draft this summary — but every sentence must remain traceable to real data.

---

## Report Generation

```
User selects Object
  ↓
User selects Time Period
  ↓
User selects Audience
  ↓
User selects Format
  ↓
System generates Report
```

The report is assembled from live data. No manual editing required.

---

## Export Formats

| Format | Use Case |
|--------|---------|
| PDF | Executive distribution |
| Word | Editable follow-up |
| PowerPoint | Presentation format |
| Excel | Data analysis |
| CSV | Raw data export |
| Share Link (Future) | Interactive viewing |

---

## Report Scheduling

Reports can be scheduled:
- Weekly
- Monthly
- Quarterly
- Annually
- On demand

---

## Executive Briefings

Executive Briefings differ from reports:

- **Reports** explain
- **Briefings** recommend

Each briefing should include:
1. Current Situation
2. Progress since last review
3. Risks and issues
4. Decisions Needed
5. Recommendations
6. Next Steps

The goal is to support leadership conversations.

---

## Report Timeline

Every report remains versioned. Users should understand: Generated, Published, Viewed, Downloaded, Archived

Historical reports remain searchable.

---

## Notifications

| Trigger | Notification |
|---------|-------------|
| Report Generated | Notify requestor |
| Report Published | Notify distribution list |
| Executive Viewed | Log viewing event |
| Review Requested | Notify reviewer |
| Scheduled Report Ready | Notify subscribers |

---

## Claude Implementation Notes

Reporting should feel closer to **Notion publishing** than enterprise reporting software.

Key principles:
- Whitespace creates readability
- Typography carries hierarchy
- Narrative wraps around data
- Charts support the story — never become the story

---

## Review Checklist

- [ ] Reports generated automatically from live data
- [ ] Narrative supported by underlying data
- [ ] Executive summaries concise and decision-oriented
- [ ] Export formats visually consistent
- [ ] Historical reports preserved and searchable
- [ ] Version history maintained
- [ ] No duplicate data entry required
