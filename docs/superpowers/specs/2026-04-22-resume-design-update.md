# Resume Component — Design Update Spec

**Date:** 2026-04-22
**Scope:** Visual redesign of `components/Resume.vue` — presentation only, no data or logic changes.

---

## Overview

Replace the current flat list layout (with `❯` / `●` terminal prefix symbols) with a **vertical timeline** design. Each company is anchored by a clay-colored dot on a vertical line, creating clear chronological reading flow while staying cohesive with the site's minimal aesthetic.

---

## Visual Design

### Timeline structure

- A vertical line runs along the left edge of the entry list, positioned at `left: 4px`, spanning from the first dot to the last.
- The line uses a subtle gradient: `--vp-c-brand-1` (clay) at the top fading to `--vp-c-divider` below, giving a sense of recency at the top.
- Each company entry has a filled circle dot marker (`9px × 9px`) in the brand clay color, with a `2px` white/background-colored ring border so it lifts off the page. The dot is positioned at `left: 0`, vertically centered with the company name.
- Entry content is indented `28px` from the left to clear the dot and line.

### Section titles

- Small-caps uppercase, `11px`, `0.14em` letter-spacing, muted color (`--vp-c-text-2`).
- A `1px` bottom border in `--vp-c-divider` separates the title from the entries below it.
- `10px` padding-bottom on the title, `20px` margin-bottom before entries.

### Entry header (company row)

- Company name: `15px`, `font-weight: 600`, primary text color (`--vp-c-text-1`).
- Location: `12px`, italic, muted color (`--vp-c-text-3`), right-aligned, `white-space: nowrap` so it doesn't wrap.
- Both on one `flex` row with `justify-content: space-between`.

### Role items

- Each role is a flex row: label on the left, period on the right.
- Label: `13px`, secondary text color (`--vp-c-text-2`), prefixed with a `—` dash via a CSS `::before` pseudo-element in `--vp-c-text-3` color (replaces the old `content: "●"` pseudo).
- Period: `11px`, monospace font (`var(--vp-font-family-mono)`), lightest muted color (`--vp-c-text-3`), `white-space: nowrap`.
- `4px` gap between roles within an entry.

### Spacing

- `24px` padding-bottom per entry (except last child: `0`).
- `36px` margin-bottom between sections.

---

## Dark Mode

Uses the same CSS variable tokens — no additional overrides needed beyond what VitePress already provides. The clay dot color stays the same in both modes (brand color is not mode-dependent). The ring border on the dot uses `--vp-c-bg` so it correctly adapts to the background color in dark mode.

---

## Mobile (≤ 639px)

The current mobile approach (horizontal scroll, `|` separators) is **removed**. The timeline layout works on mobile — the dot and indented content stack naturally in a single column. The location shifts below the company name on narrow screens (flex-direction wraps or location moves to its own line) to avoid overflow.

Specific mobile adjustments:
- `.tl-entry-header` wraps to column on mobile (`flex-direction: column`, `gap: 2px`).
- `.tl-entry-location` becomes left-aligned and loses `white-space: nowrap`.
- The `|` separator and horizontal scroll are removed entirely.
- The `.separator` element is removed from the template.

---

## Implementation Scope

- **File:** `components/Resume.vue` only.
- **No changes** to resume data (the `RESUME` constant stays identical).
- **No changes** to `custom.css`, `config.ts`, or any markdown pages.
- Remove the old `.entry-name::before` and `.item-label::before` pseudo-element rules (the `❯` / `●` symbols).
- Remove the old mobile horizontal-scroll block.
- The `.separator` span elements in the template are removed.
- All new CSS uses `--vp-c-*` tokens for light/dark mode compatibility.

---

## Success Criteria

- Timeline line and dots render correctly in light and dark mode.
- The clay dot ring adapts to background color without a visible seam.
- All four experience entries and two education entries display correctly.
- No horizontal overflow on mobile.
- Chinese locale (`zh`) renders identically (same component, same CSS).
