# Design System — Components

> Every component should answer: What is its purpose? What information does it communicate? What action does it enable?

---

## Component Inventory

### Actions
| Component | Description |
|-----------|-------------|
| `Button` | Primary, secondary, ghost, destructive variants |
| `IconButton` | Icon-only action, always with tooltip |
| `DropdownMenu` | Contextual action list |
| `CommandPalette` | Global keyboard-first navigation |
| `ContextMenu` | Right-click action list |

### Inputs
| Component | Description |
|-----------|-------------|
| `Input` | Text input with label, validation, helper |
| `Textarea` | Multi-line text input |
| `Select` | Dropdown selection |
| `MultiSelect` | Multiple selection with chips |
| `DatePicker` | Calendar date selection |
| `DateRangePicker` | Start and end date selection |
| `FileUpload` | Drag-and-drop file upload |
| `SearchInput` | Search with instant results |
| `Checkbox` | Boolean selection |
| `RadioGroup` | Single selection from group |
| `Toggle` | On/off switch |

### Data Display
| Component | Description |
|-----------|-------------|
| `DataTable` | Full-featured table (primary interface) |
| `ObjectCard` | Generic object card, configured by type |
| `StatusBadge` | Semantic status indicator |
| `HealthIndicator` | Health score with explanation |
| `PriorityBadge` | Priority level badge |
| `Avatar` | User avatar with fallback |
| `AvatarStack` | Group of user avatars |
| `ActivityFeed` | Chronological activity list |
| `ProgressBar` | Progress indicator |
| `TrendIndicator` | Direction and magnitude indicator |
| `MetricCard` | KPI summary card |

### Navigation
| Component | Description |
|-----------|-------------|
| `Sidebar` | Primary navigation |
| `Breadcrumb` | Hierarchical location |
| `Tabs` | Context navigation |
| `Pagination` | Page navigation |
| `BackButton` | Return navigation |

### Layout
| Component | Description |
|-----------|-------------|
| `AppShell` | Root layout with sidebar |
| `PageHeader` | Title, breadcrumb, actions |
| `Inspector` | Right-side detail panel |
| `Drawer` | Slide-in panel (bottom or right) |
| `Section` | Content section with heading |
| `Divider` | Visual separator |
| `Stack` | Vertical spacing utility |
| `Grid` | Column layout utility |

### Feedback
| Component | Description |
|-----------|-------------|
| `Toast` | Temporary notification |
| `EmptyState` | No data state with guidance |
| `LoadingSkeleton` | Content placeholder during load |
| `ErrorState` | Error with recovery action |
| `Tooltip` | Contextual information on hover |
| `Badge` | Count indicator |

### Overlay
| Component | Description |
|-----------|-------------|
| `Modal` | Blocking dialog |
| `AlertDialog` | Confirmation with destructive action |
| `Popover` | Non-blocking floating panel |
| `Sheet` | Full-height slide-in panel |

### Charts
| Component | Description |
|-----------|-------------|
| `LineChart` | Trend over time |
| `BarChart` | Categorical comparison |
| `AreaChart` | Volume over time |
| `StackedBarChart` | Multi-series categorical |
| `ProgressRing` | Circular completion indicator |
| `Sparkline` | Inline trend indicator |
| `HeatMap` | Grid intensity visualization |
| `Timeline` | Gantt-style schedule |

### Specialized
| Component | Description |
|-----------|-------------|
| `CommentThread` | Threaded discussion |
| `MentionInput` | Text input with @ mention |
| `VersionHistory` | Object change history |
| `ApprovalFlow` | Approval status tracker |
| `DependencyGraph` | Object relationship view |
| `RichTextEditor` | Formatted content editor |
| `EvidenceUploader` | Evidence attachment with context |
| `DecisionRecord` | Formal decision documentation |

---

## Component Standards

Every component must have:

- [ ] TypeScript prop definitions
- [ ] All interactive states (default, hover, active, disabled, focus)
- [ ] Empty state
- [ ] Loading state
- [ ] Error state
- [ ] Keyboard navigation support
- [ ] ARIA labels and roles
- [ ] Design token usage (no hardcoded values)
- [ ] Responsive behavior documented

---

## Design Token Usage

Every component property should map to a design token:

```tsx
// Wrong
<div style={{ color: '#111111', padding: '16px' }}>

// Correct
<div className="text-primary p-4">
// or
<div style={{ color: 'var(--color-text-primary)', padding: 'var(--space-4)' }}>
```

---

## Composition Over Configuration

Build generic, composable components rather than feature-specific ones.

```tsx
// Wrong — too specific
<InterventionStatusBadge status={status} />
<ProjectStatusBadge status={status} />
<ActivityStatusBadge status={status} />

// Correct — one component, configured
<StatusBadge status={status} objectType="intervention" />
```

The `objectType` can influence color mapping or icons, but the component is shared.
