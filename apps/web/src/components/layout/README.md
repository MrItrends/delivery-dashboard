# Workspace Frame

The persistent application shell every screen inherits. Five regions:
Global Header · Left Navigation · Main Workspace · Inspector · Command Palette.

```
AppShell
├─ Sidebar (Left Navigation)        272px expanded / 72px collapsed, fixed
│   ├─ WorkspaceSwitcher            avatar · name · env badge · dropdown
│   ├─ Primary nav (10 items)       Home → Notifications (no Activities)
│   ├─ Pinned objects               user-configurable, hidden when collapsed
│   ├─ Recent items                 auto, max 8
│   └─ Settings + UserMenu          footer, opens upward
├─ GlobalHeader                     64px · breadcrumb · search · Create · bell
├─ main content (feature screens)   margin-left = current nav width
├─ BottomNav (mobile only)          Home · Projects · Search · Alerts · Menu
├─ NotificationPanel                right side panel, grouped, filters
└─ CommandPalette                   ⌘K / Ctrl+K universal action surface
```

The Inspector (`components/overlay/Inspector`) is the frame's inspector
container — 480px default / 720px expanded, slides from the right, full-screen
on mobile. Feature screens render it; the frame defines its behaviour.

## Deliverables

1–2. **Sidebar** expanded & collapsed — toggle bottom-left; preference persists
   in `useAppStore` (desktop only).
3. **Global Header** — `GlobalHeader.tsx`.
4. **Workspace Switcher** — `WorkspaceSwitcher.tsx` (dropdown, never a modal).
5. **Breadcrumbs** — derived automatically from the route in `GlobalHeader`
   (workspace root + path segments, collapses past depth 4).
6. **Notification Panel** — `NotificationPanel.tsx`.
7. **User Menu** — `UserMenu.tsx`.
8. **Command Palette** — `overlay/CommandPalette.tsx` (Navigate / Create /
   Actions / Workspace / Preferences).
9. **Search** — header search field opens the palette.
10. **Responsive** — desktop 3-panel; tablet collapsible nav + Inspector overlay;
    mobile drawer + bottom nav + full-screen Inspector.
11. **Empty Workspace nav** — `<AppShell emptyWorkspace>` hides pinned/recent and
    shows a hint.
12. **Accessibility** — below.
13. **Motion** — below.

## States

| State | How it's handled |
|-------|------------------|
| Expanded / Collapsed | `useAppStore.sidebarCollapsed`, persisted |
| Loading navigation | Sidebar renders instantly; switcher shows a spinner while switching |
| Workspace switching | 650ms transition in the switcher, then toast; context preserved |
| Offline | `useOnline` → header offline pill |
| Permission restricted | Nav items can be hidden/disabled per role (config-driven) |
| No workspace / Empty | `emptyWorkspace` prop → minimal nav + hint |

## Accessibility annotations (WCAG AA)

- **Landmarks:** `<nav aria-label="Primary">` (sidebar), `<header role="banner">`
  (global header), `<main>` (content), `<aside role="dialog">` (notifications),
  `<nav aria-label="Primary mobile navigation">` (bottom nav).
- **Active state:** current nav item carries `aria-current="page"` — never
  colour-only (weight + background reinforce).
- **Menus:** switcher, user menu, create menu and context menus use
  `aria-haspopup` / `aria-expanded` / `role="menu"` + `menuitem`
  (`menuitemradio` for workspace selection), and close on `Esc` / outside click.
- **Tooltips:** collapsed nav exposes labels via `aria-label` + a CSS tooltip on
  hover/focus, so the rail is usable by keyboard and screen reader.
- **Command palette:** `role="dialog"`, listbox semantics, full arrow-key
  navigation, `aria-activedescendant`.
- **Notifications:** unread state is a dot **and** bold actor text + count, never
  colour alone; "Mark all read" disables when nothing is unread.
- **Focus:** visible focus rings from the global `:focus-visible` token; overlays
  trap/Escape correctly; `inert` applied to hidden panels.
- **Keyboard:** ⌘K palette, `G`-prefixed go-to shortcuts, Tab order top→bottom.

## Motion specifications

| Element | Property | Duration | Easing |
|---------|----------|----------|--------|
| Sidebar collapse/expand | width | 200ms (`--duration-moderate`) | ease-in-out |
| Sidebar mobile drawer | transform | 250ms (`--duration-slow`) | ease-out |
| Inspector open/close | transform | 250ms | ease-out |
| Notification panel | transform | 250ms | ease-out |
| Command palette | opacity + scale | 150ms (`--duration-normal`) | ease-out |
| Dropdown menus | opacity + translateY | 150ms | ease-out |
| Nav hover / active | background, color | 100ms (`--duration-fast`) | ease-out |

No bounce, no scale-up "pop", no decorative animation. All durations come from
motion tokens; everything collapses to near-instant under
`prefers-reduced-motion: reduce`.

## Notes

- Mock data (workspaces, pinned, recent, notifications) lives in `navConfig.ts`.
- `Create` lives once, in the global header — feature screens no longer render
  their own create button.
- New reusable primitives added here: `Icon` (extended stroke set), `ContextMenu`
  (`useContextMenu`), and the `useMediaQuery` / `useIsMobile` hooks.
