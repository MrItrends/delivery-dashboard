# Icons

## Icon Library

**Hugeicons** — the official icon library for the Delivery Dashboard.

Hugeicons provides a comprehensive, consistent, and modern icon set that is:
- Available in multiple styles (Stroke, Solid, Bulk, Duotone)
- Delivered as SVG or React components
- Consistent in visual weight
- Professional and non-decorative

---

## Icon Sizes

```css
--icon-xs:  12px;  /* Badges, dense metadata */
--icon-sm:  16px;  /* Inline icons, small buttons */
--icon-md:  20px;  /* Default UI icons */
--icon-lg:  24px;  /* Navigation icons, prominent actions */
--icon-xl:  32px;  /* Empty states, feature icons */
--icon-2xl: 48px;  /* Large illustrations, onboarding */
```

---

## Icon Styles

| Style | Use Case |
|-------|---------|
| Stroke | Default — navigation, UI actions |
| Solid | Active / selected states |
| Bulk | Empty states, feature illustrations |
| Duotone | Highlights, special callouts |

Only one style should be used in any given context. Do not mix Stroke and Solid icons in the same UI section.

---

## Navigation Icons

| Destination | Icon Name |
|------------|----------|
| Home | `Home01` |
| Portfolio | `Chart01` or `LayoutGrid01` |
| Activity Tracker | `TaskDone01` |
| Performance | `Analytics01` |
| Reports | `File01` |
| Calendar | `Calendar01` |
| Files | `Folder01` |
| Team | `UserGroup01` |
| Notifications | `Notification01` |
| Search | `Search01` |
| Settings | `Settings01` |

---

## Object Icons

| Object | Icon |
|--------|------|
| Workspace | `Building01` |
| Portfolio | `Chart01` |
| Priority Area | `Target01` |
| Project | `Folder01` |
| Intervention | `Lightbulb01` |
| Activity | `TaskDone01` |
| Milestone | `Flag01` |
| Target / KPI | `Target01` |
| Budget | `Money01` |
| Report | `Document01` |
| File | `File01` |
| Comment | `MessageCircle01` |
| Decision | `CheckmarkCircle01` |
| Risk | `Alert01` |

---

## Action Icons

| Action | Icon |
|--------|------|
| Create | `Add01` |
| Edit | `Edit01` |
| Delete | `Delete01` |
| Archive | `Archive01` |
| Assign | `UserAdd01` |
| Move | `Move01` |
| Copy | `Copy01` |
| Export | `Download01` |
| Share | `Share01` |
| Filter | `Filter01` |
| Sort | `Sort01` |
| Search | `Search01` |
| Close | `Cancel01` |
| Back | `ArrowLeft01` |
| Expand | `ArrowRight01` |
| Collapse | `ArrowUp01` |
| More actions | `MoreHorizontal01` |

---

## Status Icons

| Status | Icon | Color |
|--------|------|-------|
| Excellent / Healthy | `CheckmarkCircle01` | `--color-status-healthy` |
| Needs Attention | `AlertCircle01` | `--color-status-attention` |
| At Risk | `Alert01` | `--color-status-risk` |
| Critical | `AlertDiamond01` | `--color-status-critical` |
| Blocked | `Block01` | `--color-status-critical` |
| Completed | `CheckmarkDouble01` | `--color-status-excellent` |
| Archived | `Archive01` | `--color-neutral-400` |

Status icons must never rely on color alone. Always pair with a text label.

---

## Icon Usage Rules

### Size Rule
Match icon size to the text it accompanies:
- 16px icon with 14px text
- 20px icon with 16px text
- 24px icon with 18–20px text

### Color Rule
Icons inherit text color by default. Status icons use semantic color tokens.

```css
/* Default icon */
.icon {
  color: currentColor;
  width: var(--icon-md);
  height: var(--icon-md);
}

/* Status icon */
.icon-critical {
  color: var(--color-status-critical);
}
```

### Accessibility
All icon-only interactive elements must have:
- `aria-label` attribute
- Tooltip on hover
- 44px minimum touch target

```html
<!-- Correct -->
<button aria-label="Archive activity">
  <Icon name="Archive01" />
</button>

<!-- Wrong — no label -->
<button>
  <Icon name="Archive01" />
</button>
```

---

## Prohibited Patterns

| Avoid | Reason |
|-------|--------|
| Emoji as icons | Inconsistent across platforms |
| Custom one-off icons | Breaks system consistency |
| Mixing icon libraries | Visual inconsistency |
| Icons without accessible labels | Accessibility failure |
| Icons scaled outside the defined sizes | Visual inconsistency |
