# Notifications

## Purpose

Notifications ensure the right people know about important changes **without overwhelming them with noise**.

Bad notifications destroy focus. Good notifications drive delivery.

---

## Business Goal

Surface only the information that requires human attention. Silence everything else.

---

## Core Philosophy

> Signal over noise. Urgency over volume.

The Delivery Dashboard should send **fewer, better notifications** than any other enterprise platform users have experienced.

---

## Notification Types

| Type | Trigger | Priority |
|------|---------|---------|
| Assigned | Object assigned to me | High |
| Mentioned | @mention in a comment | High |
| Approval Required | Awaiting my decision | High |
| Overdue | My object missed deadline | High |
| Blocked | My activity is blocked | High |
| Review Due | My review is scheduled | Medium |
| Updated | Object I own was modified | Medium |
| Completed | Object I'm following completed | Low |
| Commented | Comment on my object | Medium |
| Health Changed | Object health changed | Medium |
| Budget Alert | Budget threshold crossed | High |
| Report Ready | Report generated | Low |
| System Update | Platform changes | Info |

---

## Priority Levels

| Level | Description | Default Delivery |
|-------|-------------|-----------------|
| Critical | Requires immediate action | Push + Email + In-app |
| High | Requires today's attention | In-app + Email digest |
| Medium | Worth reviewing soon | In-app only |
| Low | For awareness | In-app digest |
| Info | No action needed | Digest only |

---

## Notification Channels

| Channel | Description |
|---------|-------------|
| In-App | Bell icon, notification center |
| Email | Digest or individual |
| Push | Mobile device notification |
| Slack | Optional integration |
| Microsoft Teams | Optional integration |

---

## Notification Center

| Feature | Description |
|---------|-------------|
| Grouped | By project / type |
| Filterable | By type, date, status |
| Mark All Read | One click |
| Click Through | Navigate directly to object |
| Resolve | Mark notification as handled |
| Snooze | Delay to specific time |

---

## User Preferences

| Setting | Options |
|---------|---------|
| Email frequency | Real-time / Hourly / Daily digest / Off |
| Activity notifications | All / Mine / Critical only |
| Comment notifications | All / Mentions only |
| Push notifications | Enable / Disable |
| Quiet hours | Time window to suppress push |
| Focus mode | Suppress all non-critical |

---

## Smart Batching

Multiple related changes batch into a single notification. Example: *"5 activities were updated in National Healthcare Programme"* rather than 5 individual messages.

---

## Claude Implementation Notes

The Notification Center should feel closer to **Linear's activity feed** than traditional enterprise notification inboxes.

Prioritize: Clean typography, grouped context, one-click navigation to the relevant object.

The worst outcome is a notification that delivers no actionable information. Every notification must answer: **What happened, on what, and what do I need to do?**
