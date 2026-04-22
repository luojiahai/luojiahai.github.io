# Resume Design Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current flat-list Resume layout (❯ / ● terminal symbols) with a border-stripe design that matches Portfolio.vue.

**Architecture:** Single-file change to `components/Resume.vue` — template and style blocks only. The `<script>` block (RESUME data + locale logic) is untouched. New CSS uses only `--vp-c-*` VitePress tokens so light/dark mode works automatically.

**Tech Stack:** Vue 3 SFC, VitePress CSS custom properties, scoped CSS.

---

### Task 1: Update the template — remove separator spans

**Files:**
- Modify: `components/Resume.vue` (template block only)

The current template has `<span class="separator">|</span>` inside both the entry header and each role item. Remove them. The new CSS layout (flexbox `space-between`) handles the visual separation without a literal `|` character.

- [ ] **Step 1: Replace the `<template>` block**

Open `components/Resume.vue` and replace everything between `<template>` and `</template>` with:

```html
<template>
  <div class="resume">
    <template v-for="section in sections" :key="section.title">
      <h2 class="section-title">{{ section.title }}</h2>
      <ul class="entry-list">
        <li v-for="entry in section.entries" :key="entry.name" class="entry-item">
          <div class="entry-header">
            <span class="entry-name">{{ entry.name }}</span>
            <span class="entry-location">{{ entry.location }}</span>
          </div>
          <ul class="item-list">
            <li v-for="item in entry.items" :key="item.label" class="item">
              <span class="item-label">{{ item.label }}</span>
              <span class="item-period">{{ item.period }}</span>
            </li>
          </ul>
        </li>
      </ul>
    </template>
  </div>
</template>
```

The only change from the old template: both `<span class="separator">|</span>` elements are removed (one in the entry header, one inside each role `<li>`). All class names and v-for bindings are otherwise identical.

- [ ] **Step 2: Run the dev server to confirm no template errors**

```bash
pnpm dev
```

Open `http://localhost:5173/resume` (English) and `http://localhost:5173/zh/resume` (Chinese). The page should load. The layout will look broken at this point (old CSS still in place, separator spans gone) — that's expected. Confirm there are no Vue compile errors in the terminal.

---

### Task 2: Replace the style block — new border-stripe CSS

**Files:**
- Modify: `components/Resume.vue` (style block only)

The entire `<style scoped>` block is replaced. The new CSS matches Portfolio.vue's structural pattern (`border-left` stripe per entry) and uses only `--vp-c-*` tokens.

- [ ] **Step 1: Replace the `<style scoped>` block**

Replace everything between `<style scoped>` and `</style>` with:

```css
.resume {
  margin: 0 auto 32px;
}

.section-title {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.entry-list {
  list-style-type: none;
  padding-left: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 36px;
}

.entry-item {
  border-left: 2px solid var(--vp-c-brand-1);
  padding-left: 16px;
}

.entry-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 5px;
}

.entry-name {
  font-weight: 600;
  color: var(--vp-c-text-1);
  flex: 1;
  min-width: 0;
}

.entry-location {
  font-size: 12px;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.item-list {
  list-style-type: none;
  padding-left: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.item-label {
  font-size: 13px;
  color: var(--vp-c-text-2);
  display: flex;
  align-items: center;
  gap: 8px;
}

.item-label::before {
  content: "—";
  color: var(--vp-c-text-3);
  font-size: 11px;
}

.item-period {
  font-size: 11px;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-3);
  white-space: nowrap;
}

@media (max-width: 639px) {
  .entry-header {
    flex-direction: column;
    gap: 2px;
  }

  .entry-location {
    white-space: normal;
  }
}
```

---

### Task 3: Visual verification

**Files:** none — read-only verification

The dev server from Task 1 should still be running (`pnpm dev`). If not, restart it.

- [ ] **Step 1: Verify desktop layout — English, light mode**

Open `http://localhost:5173/resume`.

Checklist:
- Section titles ("Experience", "Education") appear small, uppercase, muted, with a thin line below them.
- Each company entry has a clay/terracotta left border stripe and `16px` left indent.
- Company name is bold on the left; location is small and muted on the right of the same row.
- Each role appears below with a `—` dash prefix on the left and the period in monospace on the right.
- No `|` separator characters visible anywhere.
- No `❯` or `●` symbols visible.

- [ ] **Step 2: Verify dark mode**

Click the dark mode toggle in the nav. Check:
- The border stripe is still visible (clay color stays the same in dark mode).
- Section title border-bottom is visible (uses `--vp-c-divider` which adapts).
- Location and period text are readable but clearly secondary.

- [ ] **Step 3: Verify Chinese locale**

Open `http://localhost:5173/zh/resume`. Confirm all four experience entries and two education entries display correctly with Chinese text, same layout.

- [ ] **Step 4: Verify mobile layout**

In Chrome/Firefox devtools, set viewport to 375px wide. Check:
- Company name and location stack vertically (name on top, location below), both left-aligned.
- No horizontal overflow or scrollbar.
- Border stripe still visible.
- Role items still display as label-left / period-right rows (they're short enough not to overflow at 375px).

---

### Task 4: Commit

**Files:**
- Modify: `components/Resume.vue`

- [ ] **Step 1: Stage and commit**

```bash
git add components/Resume.vue
git commit -m "feat: update Resume component to border-stripe design matching Portfolio"
```
