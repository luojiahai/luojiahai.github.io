# Resume Component — Design Update Spec

**Date:** 2026-04-22
**Scope:** Visual redesign of `components/Resume.vue` — presentation only, no data or logic changes.

---

## Overview

Replace the current flat list layout (with `❯` / `●` terminal prefix symbols) with a **border-stripe** design that matches `Portfolio.vue`. Each company entry gets a `border-left: 2px solid var(--vp-c-brand-1)` accent stripe, creating a consistent visual language across the Resume and Portfolio pages.

---

## Visual Design

### Entry structure (mirrors Portfolio.vue)

- Each company entry has `border-left: 2px solid var(--vp-c-brand-1)` and `padding-left: 16px` — identical to Portfolio's `.item` rule.
- Entries are stacked in a flex column with `gap: 16px` between them.
- No vertical timeline line, no dot markers.

### Section titles

- Small-caps uppercase, `11px`, `0.14em` letter-spacing, muted color (`--vp-c-text-2`).
- A `1px` bottom border in `--vp-c-divider` separates the title from the entries below it.
- `10px` padding-bottom on the title, `20px` margin-bottom before entries.
- `36px` margin-bottom between sections.

### Entry header (company row)

- Company name: bold (`font-weight: 600`), primary text color (`--vp-c-text-1`), `flex: 1; min-width: 0` — mirrors Portfolio's `.item-name`.
- Location: `12px`, secondary text color (`--vp-c-text-2`), `white-space: nowrap` — mirrors Portfolio's `.item-company`.
- Both on one `flex` row with `justify-content: space-between; align-items: baseline`.

### Role items

- Each role is a flex row: label on the left, period on the right.
- Label: `13px`, secondary text color (`--vp-c-text-2`), prefixed with a `—` dash via a CSS `::before` pseudo-element in `--vp-c-text-3` color (replaces the old `content: "●"` pseudo).
- Period: `11px`, monospace font (`var(--vp-font-family-mono)`), muted color (`--vp-c-text-3`), `white-space: nowrap`.
- `3px` gap between role rows within an entry.
- `5px` margin-top between the entry header and the role list.

---

## Dark Mode

Uses the same CSS variable tokens throughout — no additional overrides needed. `--vp-c-brand-1` is consistent across light and dark modes.

---

## Mobile (≤ 639px)

The current mobile approach (horizontal scroll, `|` separators) is **removed**. The border-stripe layout works naturally on mobile — entries stack in a single column and the stripe provides visual separation without any overflow risk.

Specific mobile adjustments:
- `.entry-header` wraps to column on mobile (`flex-direction: column`, `gap: 2px`).
- `.entry-location` becomes left-aligned and loses `white-space: nowrap`.
- The `|` separator spans and the horizontal-scroll CSS are removed entirely.

---

## Implementation Scope

- **File:** `components/Resume.vue` only.
- **No changes** to resume data (the `RESUME` constant stays identical).
- **No changes** to `custom.css`, `config.ts`, or any markdown pages.
- Remove `.entry-name::before` and `.item-label::before` pseudo-element rules (the `❯` / `●` symbols).
- Remove the old mobile horizontal-scroll block and `.separator` styles.
- Remove `.separator` span elements from the template.
- All new CSS uses `--vp-c-*` tokens for light/dark mode compatibility, matching Portfolio's conventions.

---

## Success Criteria

- Resume entries visually match the structural pattern of Portfolio entries (border-left stripe, same padding, same header layout).
- All four experience entries and two education entries display correctly.
- No horizontal overflow on mobile.
- Chinese locale (`zh`) renders identically (same component, same CSS).
- Light and dark mode both look correct with no manual color overrides.
