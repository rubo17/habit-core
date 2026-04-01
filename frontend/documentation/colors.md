# Color Palette

Defined in `src/assets/main.css` using Tailwind v4 `@theme`. All tokens are available as utility classes (`bg-background`, `text-foreground`, `border-border`, etc.) and switch automatically between light and dark mode.

---

## Surfaces

Colors for layering backgrounds. Use them to create visual depth without adding borders or shadows.

| Token | Light | Dark | Class example |
|---|---|---|---|
| `background` | `#f8fafc` | `#0c0c10` | `bg-background` |
| `surface` | `#ffffff` | `#13131a` | `bg-surface` |
| `surface-raised` | `#f1f5f9` | `#1c1c26` | `bg-surface-raised` |

**When to use:**
- `background` — page root, outermost wrapper (`<body>`, `MainLayout`)
- `surface` — cards, panels, modals, inputs — anything that sits above the page background
- `surface-raised` — elements raised above a surface: dropdowns, nav pill containers, tooltips, hover states inside a card

---

## Text

| Token | Light | Dark | Class example |
|---|---|---|---|
| `foreground` | `#0f172a` | `#f1f5f9` | `text-foreground` |
| `muted` | `#64748b` | `#1e293b` | `text-muted` |
| `muted-foreground` | `#94a3b8` | `#64748b` | `text-muted-foreground` |

**When to use:**
- `foreground` — primary text: titles, body copy, nav labels
- `muted` — section dividers, empty state backgrounds, subtle fills
- `muted-foreground` — secondary text: placeholders, helper text, timestamps, metadata, disabled labels

---

## Accent

The brand color (indigo). Used for interactive and highlighted elements.

| Token | Light | Dark | Class example |
|---|---|---|---|
| `accent` | `#6366f1` | `#818cf8` | `bg-accent`, `text-accent` |
| `accent-hover` | `#4f46e5` | `#6366f1` | `hover:bg-accent-hover` |
| `accent-foreground` | `#ffffff` | `#ffffff` | `text-accent-foreground` |
| `accent-subtle` | `#eef2ff` | `#1e1b4b` | `bg-accent-subtle` |

**When to use:**
- `accent` — primary buttons, active nav items, active toggles, progress bars, links
- `accent-hover` — `:hover` and `:active` states on accent elements
- `accent-foreground` — text or icons placed **on top of** an `accent` background
- `accent-subtle` — light tinted backgrounds for badges, chips, selected states, or highlighted rows

---

## Borders & Focus Ring

| Token | Light | Dark | Class example |
|---|---|---|---|
| `border` | `#e2e8f0` | `#1e293b` | `border-border` |
| `ring` | `#6366f1` | `#818cf8` | `ring-ring` |

**When to use:**
- `border` — all dividers, card borders, input borders, separator lines
- `ring` — focus rings on interactive elements (inputs, buttons, links) for accessibility

---

## Semantic

Communicates state and feedback to the user.

### Success

| Token | Light | Dark | Class example |
|---|---|---|---|
| `success` | `#22c55e` | `#4ade80` | `text-success`, `bg-success` |
| `success-subtle` | `#dcfce7` | `#052e16` | `bg-success-subtle` |

**When to use:**
- `success` — habit completed indicator, streak icon, positive stat, success toast icon
- `success-subtle` — badge or chip background for completed habits, success alert background

### Warning

| Token | Light | Dark | Class example |
|---|---|---|---|
| `warning` | `#f59e0b` | `#fbbf24` | `text-warning`, `bg-warning` |
| `warning-subtle` | `#fef9c3` | `#1c1400` | `bg-warning-subtle` |

**When to use:**
- `warning` — streak at risk indicator, partial progress, reminder notifications
- `warning-subtle` — alert background, highlighted row for habits not yet done today

### Danger

| Token | Light | Dark | Class example |
|---|---|---|---|
| `danger` | `#ef4444` | `#f87171` | `text-danger`, `bg-danger` |
| `danger-subtle` | `#fee2e2` | `#2d0a0a` | `bg-danger-subtle` |

**When to use:**
- `danger` — delete actions, broken streaks, error messages, destructive button text
- `danger-subtle` — error alert background, failed habit badge background

---

## Quick reference

```
Page background      → bg-background
Card / panel         → bg-surface
Dropdown / nav pill  → bg-surface-raised

Primary text         → text-foreground
Secondary text       → text-muted-foreground

Primary button       → bg-accent text-accent-foreground
Primary button hover → hover:bg-accent-hover
Tinted highlight     → bg-accent-subtle text-accent

Dividers / borders   → border-border
Focus ring           → ring-ring

Habit done           → text-success  /  bg-success-subtle
Habit at risk        → text-warning  /  bg-warning-subtle
Delete / error       → text-danger   /  bg-danger-subtle
```
