# Hero Lottie Background

**Date:** 2026-04-23
**Status:** Approved

## Goal

Add the Lottie animation (`lottie-overview.json`) as a decorative background layer in `.VPHome .VPHero`, right-aligned, layered on top of the existing CSS grid pattern.

## Approach

JS injection in `Layout.vue` — follows the existing `onMounted` DOM manipulation pattern used for the typewriter animation.

## Design

- JSON file hosted at `public/lottie-overview.json`
- `lottie-web` installed as a production dependency
- On mount (client-only), a `div.hero-lottie-bg` is appended to `.VPHome .VPHero`
- Lottie initialised on that div: `loop: true`, `autoplay: true`, `renderer: 'svg'`
- Animation cleaned up on route change (same lifecycle as typewriter)
- CSS positions the container: `position: absolute`, right-aligned, full hero height, `pointer-events: none`, `z-index: 0`
- Hero `.container` gets `position: relative; z-index: 1` to stay above the animation
- Opacity: `0.12` — shapes are near-black, low opacity keeps it subtle over the grid
- Size: `height: 100%`, `width: auto` (1:1 square canvas, so width matches height)

## Files Changed

| File | Change |
|---|---|
| `public/lottie-overview.json` | New — downloaded animation JSON |
| `package.json` | Add `lottie-web` dependency |
| `.vitepress/theme/Layout.vue` | Inject Lottie div on mount, clean up on route change |
| `.vitepress/theme/custom.css` | Position `.hero-lottie-bg`, set hero `.container` stacking context |

## Constraints

- Must be client-only (no SSR) — `onMounted` guard handles this
- Must not interfere with hero click targets — `pointer-events: none`
- Must clean up on SPA navigation — route watcher cleans up Lottie instance
