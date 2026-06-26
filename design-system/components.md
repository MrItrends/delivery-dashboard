# Component Library

## Philosophy

Components are **reusable, composable, and token-dependent**. A component that imports raw color values or hardcoded sizes has violated the system.

Every component must: use design tokens exclusively, be accessible by default, handle all states (default, hover, focus, active, disabled, loading, error), support keyboard interaction.

---

## Component Inventory

### Primitives

| Component | Description |
|-----------|-------------|
| `Button` | Primary, Secondary, Ghost, Destructive, Icon-only |
| `Input` | Text, Number, Password, Search, Textarea |
| `Select` | Single select, Multi-select, Combobox |
| `Checkbox` | Default, Indeterminate |
| `Radio` | Radio group |
| `Toggle` | On/Off switch |
| `DatePicker` | Single date, Date range |
| `ColorPicker` | For custom labels/tags |
| `Avatar` | Image, Initials, Presence indicator |
| `Badge` | Status, Count, Label |
| `Tag` | Filterable label |
| `Tooltip` | Hover/focus text |
| `Icon` | Hugeicons wrapper |
| `Divider` | Horizontal rule |
| `Spinner` | Loading indicator |

---

### Layout

| Component | Description |
|-----------|-------------|
| `Card` | Container with border/shadow |
| `Panel` | Side drawer panel |
| `Modal` | Centered dialog |
| `Drawer` | Full-height side sheet |
| `Tabs` | Tab navigation |
| `Accordion` | Expandable sections |
| `Collapsible` | Single expand/collapse |
| `Stack` | Vertical layout helper |
| `Inline` | Horizontal layout helper |
| `Grid` | CSS Grid wrapper |

---

### Navigation

| Component | Description |
|-----------|-------------|
| `Sidebar` | Primary navigation |
| `Breadcrumb` | Hierarchical path |
| `Pagination` | Page controls |
| `CommandPalette` | ⌘K interface |
| `Tabs` | Secondary navigation |
| `ContextMenu` | Right-click menu |
| `Dropdown` | Action menu |

---

### Data Display

| Component | Description |
|-----------|-------------|
| `Table` | Data table with sorting, filtering |
| `DataGrid` | Advanced editable grid |
| `KanbanBoard` | Status-based board |
| `Timeline` | Gantt-style timeline |
| `Calendar` | Month/week/day calendar |
| `ActivityFeed` | Chronological event log |
| `StatCard` | Single metric display |
| `ProgressBar` | Linear progress |
| `HealthIndicator` | Status dot/badge |
| `Chart` | Line, Bar, Donut, Area |
| `Heatmap` | Grid-based data |

---

### Forms

| Component | Description |
|-----------|-------------|
| `Form` | Form wrapper with submit |
| `FormGroup` | Label + input + error |
| `FormSection` | Grouped form fields |
| `RichTextEditor` | Formatted text input |
| `FileUpload` | Drag-drop + click upload |
| `UserSelector` | Search + select users |
| `ObjectSelector` | Search + select objects |

---

### Feedback

| Component | Description |
|-----------|-------------|
| `Toast` | Brief notification |
| `Alert` | Persistent inline alert |
| `EmptyState` | Zero-state handler |
| `ErrorState` | Error handler |
| `LoadingState` | Skeleton + spinner |
| `ConfirmDialog` | Destructive action confirmation |

---

## Button Component Spec

```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'link';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}
```

**States:** Default, Hover, Focus, Active, Disabled, Loading

```css
/* Primary button */
.button-primary {
  background: var(--color-action-primary);
  color: var(--color-text-inverse);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-medium);
  border: none;
  cursor: pointer;
  transition: background var(--motion-feedback);
}

.button-primary:hover {
  background: var(--color-action-primary-hover);
}

.button-primary:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}

.button-primary:disabled {
  background: var(--color-neutral-200);
  color: var(--color-text-disabled);
  cursor: not-allowed;
}
```

---

## Health Indicator Spec

Used throughout the application. Status communicates only through: Color + Icon + Text label (never color alone).

```typescript
type HealthState = 'excellent' | 'healthy' | 'attention' | 'risk' | 'critical' | 'archived';

interface HealthIndicatorProps {
  state: HealthState;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}
```

| State | Color Token | Icon | Label |
|-------|------------|------|-------|
| excellent | `--color-status-excellent` | `CheckmarkCircle01` | Excellent |
| healthy | `--color-status-healthy` | `CheckmarkCircle01` | Healthy |
| attention | `--color-status-attention` | `AlertCircle01` | Needs Attention |
| risk | `--color-status-risk` | `Alert01` | At Risk |
| critical | `--color-status-critical` | `AlertDiamond01` | Critical |
| archived | `--color-neutral-400` | `Archive01` | Archived |

---

## Table Component Spec

The most complex component in the system. Full spec in `tables.md`.

Core features: Sorting, Filtering, Grouping, Inline editing, Column resizing, Column pinning, Bulk selection, Virtualization, Keyboard navigation.

---

## Component Rules

1. All tokens — no hardcoded values
2. All states — no missing hover/focus/disabled
3. All sizes — sm/md/lg minimum
4. All accessibility — ARIA labels, keyboard support, focus management
5. All themes — tokens enable dark mode without component changes
