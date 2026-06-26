# Space & Density

## Two Truths That Must Coexist

**Truth 1:** Government delivery is information-dense. The interface must hold a lot.

**Truth 2:** Visual clutter destroys comprehension. The interface must breathe.

These are not in conflict. The hardest design skill is making dense information feel light.

---

## Whitespace

### Whitespace is not empty. Whitespace is structure.

Whitespace does not mean "lots of empty space." It means *intentional spatial relationships*.

The correct amount of whitespace is the amount that makes the hierarchy immediately readable without effort.

### What Whitespace Creates

| Use | Effect |
|-----|--------|
| Space between sections | Visual separation without borders |
| Space within cards | Breathing room; content feels contained |
| Space between label and value | Relationship clarity |
| Space between rows | Scannable; each row distinct |
| Space at page edges | Framing; content feels composed |

### What Whitespace Does Not Mean

**Huge empty areas.** A screen that is 70% empty is not "clean design" — it wastes screen real estate and forces users to scroll unnecessarily.

**Crowded layouts.** A screen that is 90% content is not "information-rich" — it creates visual overwhelm and slows comprehension.

The balance is: **every pixel of space is purposeful**.

---

## The Spacing Scale

All spacing derives from the 8px base unit. No arbitrary values.

```
4px   — Icon margins, chip padding, tight adjacent elements
8px   — Component internal tight spacing
12px  — Table row vertical padding
16px  — Default internal padding, button padding
24px  — Card padding, form field spacing
32px  — Page horizontal margin, section gap
48px  — Major section separation
64px  — Page-level structural separation
```

If a spacing value is not in this scale, it should not be used.

---

## Density

### The Target

**Linear-density. Not Salesforce-density.**

| Product | What it represents |
|---------|------------------|
| Linear | Dense information, feels light, keyboard-native |
| Salesforce | Dense information, feels heavy, form-centric |

The difference is not the amount of information. It is the typography, spacing, and structure that frames it.

### Density Modes

The Activity Table supports two densities:

| Mode | Row Height | Use |
|------|-----------|-----|
| Comfortable | 56px | Default; most users |
| Compact | 40px | Power users; large datasets |

Users choose. Preference persists.

### Information Priority

Every screen has a primary information goal. Secondary information supports it — never competes with it.

**Example — Activity Row:**

| Priority | Information |
|---------|-------------|
| Primary | Title, Status |
| Secondary | Owner, Due Date |
| Tertiary | Reference, Updated At, Tags |

Tertiary information appears on hover or in optional columns. It does not appear by default at full opacity.

---

## Hierarchy Through Space

Space creates reading priority. These relationships must hold:

1. **Sections** are separated by the largest spacing
2. **Groups within sections** use medium spacing
3. **Individual elements within groups** use tight spacing
4. **Labels and values** use near-zero spacing (they belong together)

```
Section A
  ──────────────────────    ← 48px gap above next section

  Group 1
    Label   Value           ← 4px gap (label + value = unit)
    Label   Value

                            ← 24px gap between groups
  Group 2
    Label   Value
    Label   Value

──────────────────────────  ← Divider (or 48px gap)

Section B
```

---

## The Density Test

A screen passes when:

1. Users can scan the primary information without reading detail
2. The amount of information does not feel overwhelming despite being comprehensive
3. There is no wasted white space, and no cramped content
4. Reducing information density would sacrifice usefulness, not improve it
5. Increasing density would create visual overwhelm, not add value
