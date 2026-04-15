# VibeExtract EDD Eval Report

**Generated**: 2026-04-15T21:36:26.074Z
**Mode**: Physical extraction only
**Browser**: Chromium (Playwright)
**Total runtime**: 28.7s

---

## Summary

**Overall score**: 23/34 (68%)

✅ Pass: **7** &nbsp; ⚠️ Partial: **0** &nbsp; ❌ Fail: **3** &nbsp; 💥 Crash: **0**

| # | Site | Intent | Score | Pct | Duration | Status |
|---|------|--------|-------|-----|----------|--------|
| 1 | **Hacker News** | 极简与表格 | 4/4 | 100% | 7.7s | ✅ PASS |
| 2 | **Stripe Homepage** | 复杂渐变与动画 | 3/3 | 100% | 2.6s | ✅ PASS |
| 3 | **Linear Homepage** | 极致暗黑模式与发光阴影 | 2/2 | 100% | 2.6s | ✅ PASS |
| 4 | **Shadcn UI** | 现代组件与 Tailwind 规范 | 3/3 | 100% | 2.1s | ✅ PASS |
| 5 | **Apple Mac** | 复杂定位与滚动侦听 | 2/5 | 40% | 2.1s | ❌ FAIL |
| 6 | **Airbnb Homepage** | 响应式网格与 Z-index 层级 | 0/4 | 0% | 2.5s | ❌ FAIL |
| 7 | **GitHub Login** | 表单结构与 Focus 状态 | 0/0 | 100% | 2.4s | ✅ PASS |
| 8 | **Unsplash** | 瀑布流与高保真图片裁切 | 0/4 | 0% | 1.8s | ❌ FAIL |
| 9 | **Vercel Blog** | Typography 排版系统 | 4/4 | 100% | 2.2s | ✅ PASS |
| 10 | **Bilibili Homepage** | 高密度 DOM 与复杂浮层 | 5/5 | 100% | 2.7s | ✅ PASS |

---

## Detailed Results

### ✅ Hacker News

**URL**: https://news.ycombinator.com/
**Intent**: 极简与表格
**Category**: minimal-table
**Duration**: 7.7s
**Crash**: No
**Score**: 4/4 (100%)

**Physical extraction summary**:
- Spacing base unit: `4px` — scale: 1px, 2px, 3px, 4px, 6px, 8px, 10px, 12px, 16px, 20px, 24px, 32px
- Typography: 2 steps, base=13px, families: Verdana
- Assets: 1 images, 1 SVGs, 0 gradients, 0 inline SVGs
- Shadows: 0 variant(s)
- Skeleton: nav="", hero=false, cards=false (0 col), footer=false

**Assertions**:

| # | ID | Description | Expected | Actual | Result |
|---|----|-------------|----------|--------|--------|
| 1 | `hn-no-gradients` | Minimal site uses zero CSS gradients on structural elements | `0` | `0` | ✅ PASS |
| 2 | `hn-compact-type` | Body text ≤ 14px — hallmark of a dense, table-first layout | `14` | `13px` | ✅ PASS |
| 3 | `hn-density-compact` | AI correctly classifies layout density as compact | `compact` | `—` | ⏭ SKIP — AI token extraction was not run (omit --physical-only or add --ai to enable) |

> **Note**: Oldest-school UI on the list — no CSS frameworks, pure HTML table layout. Tests whether extractor avoids over-engineering a trivially simple page.

---

### ✅ Stripe Homepage

**URL**: https://stripe.com/
**Intent**: 复杂渐变与动画
**Category**: gradient-animation
**Duration**: 2.6s
**Crash**: No
**Score**: 3/3 (100%)

**Physical extraction summary**:
- Spacing base unit: `4px` — scale: 4px, 8px, 12px, 16px, 20px, 24px, 28px, 32px, 36px, 40px, 52px, 60px, 64px, 96px
- Typography: 6 steps, base=16px, families: sohne-var
- Assets: 50 images, 0 SVGs, 1 gradients, 10 inline SVGs
- Shadows: 0 variant(s)
- Skeleton: nav="Preisgestaltung", hero=true, cards=true (4 col), footer=true

**Assertions**:

| # | ID | Description | Expected | Actual | Result |
|---|----|-------------|----------|--------|--------|
| 1 | `stripe-has-gradients` | CSS gradients detected on structural elements (the core Stripe visual signature) | `0` | `1` | ✅ PASS |
| 2 | `stripe-paradigm-landing` | Page correctly classified as a marketing landing page | `landing` | `—` | ⏭ SKIP — AI token extraction was not run (omit --physical-only or add --ai to enable) |
| 3 | `stripe-brand-hex` | Brand primary is a valid hex color (blue-purple range) | `—` | `—` | ⏭ SKIP — AI token extraction was not run (omit --physical-only or add --ai to enable) |

> **Note**: Stripe is the canonical reference for CSS gradient artistry. Must detect the multi-stop gradient backgrounds on hero + feature sections.

---

### ✅ Linear Homepage

**URL**: https://linear.app/
**Intent**: 极致暗黑模式与发光阴影
**Category**: dark-mode-glow
**Duration**: 2.6s
**Crash**: No
**Score**: 2/2 (100%)

**Physical extraction summary**:
- Spacing base unit: `4px` — scale: 4px, 8px, 12px, 16px, 20px, 24px, 28px, 32px, 36px, 40px, 48px, 52px, 60px, 68px
- Typography: 6 steps, base=16px, families: Inter Variable, Berkeley Mono
- Assets: 24 images, 0 SVGs, 1 gradients, 10 inline SVGs
- Shadows: 4 variant(s) — top: `rgba(0, 0, 0, 0.03) 0px 1.2px 0px 0px`
- Skeleton: nav="Product", hero=true, cards=true (4 col), footer=true

**Assertions**:

| # | ID | Description | Expected | Actual | Result |
|---|----|-------------|----------|--------|--------|
| 1 | `linear-dark-background` | Page background is a dark color — correct dark mode detection | `—` | `—` | ⏭ SKIP — AI token extraction was not run (omit --physical-only or add --ai to enable) |
| 2 | `linear-has-shadows` | Box-shadows detected on UI components (glow / elevation system) | `0` | `4` | ✅ PASS |
| 3 | `linear-paradigm` | Site paradigm classified as landing | `landing` | `—` | ⏭ SKIP — AI token extraction was not run (omit --physical-only or add --ai to enable) |

> **Note**: Linear's dark mode is a design landmark. Key signals: near-black page background, coloured glow shadows (not just rgba black), tight type scale.

---

### ✅ Shadcn UI

**URL**: https://ui.shadcn.com/
**Intent**: 现代组件与 Tailwind 规范
**Category**: component-tailwind
**Duration**: 2.1s
**Crash**: No
**Score**: 3/3 (100%)

**Physical extraction summary**:
- Spacing base unit: `4px` — scale: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 80px
- Typography: 6 steps, base=14px, families: Geist
- Assets: 5 images, 0 SVGs, 0 gradients, 10 inline SVGs
- Shadows: 2 variant(s) — top: `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0`
- Skeleton: nav="Docs", hero=true, cards=true (4 col), footer=true

**Assertions**:

| # | ID | Description | Expected | Actual | Result |
|---|----|-------------|----------|--------|--------|
| 1 | `shadcn-4px-grid` | Tailwind's 4px base spacing unit correctly detected | `4` | `4` | ✅ PASS |
| 2 | `shadcn-paradigm-docs` | Component library correctly classified as docs paradigm | `docs` | `—` | ⏭ SKIP — AI token extraction was not run (omit --physical-only or add --ai to enable) |
| 3 | `shadcn-radius-defined` | Border radius token (md) is populated (Shadcn uses explicit radius vars) | `—` | `—` | ⏭ SKIP — AI token extraction was not run (omit --physical-only or add --ai to enable) |

> **Note**: Shadcn is built on Tailwind's 4px grid. The extractor must correctly detect the 4px base unit (not 8px) and classify the site as docs.

---

### ❌ Apple Mac

**URL**: https://www.apple.com/mac/
**Intent**: 复杂定位与滚动侦听
**Category**: scroll-positioning
**Duration**: 2.1s
**Crash**: No
**Score**: 2/5 (40%)

**Physical extraction summary**:
- Spacing base unit: `4px` — scale: 4px, 8px, 12px, 16px, 20px, 24px, 28px, 40px, 44px, 84px, 88px
- Typography: 5 steps, base=12px, families: SF Pro Text, SF Pro Display
- Assets: 6 images, 0 SVGs, 0 gradients, 10 inline SVGs
- Shadows: 2 variant(s) — top: `rgb(210, 210, 215) 9px 0px 9px -13px`
- Skeleton: nav="Apple", hero=true, cards=true (4 col), footer=true

**Assertions**:

| # | ID | Description | Expected | Actual | Result |
|---|----|-------------|----------|--------|--------|
| 1 | `apple-display-type` | Typography scale includes a display step ≥ 36px (Apple hero headline range) | `36` | `Array(5)` | ❌ FAIL |
| 2 | `apple-image-rich` | Page contains ≥ 5 images (product shots and lifestyle imagery) | `5` | `6` | ✅ PASS |
| 3 | `apple-not-compact` | Apple uses spacious or comfortable density — never compact | `compact` | `—` | ⏭ SKIP — AI token extraction was not run (omit --physical-only or add --ai to enable) |

> **Note**: Apple pages are famous for gigantic display type (60–80px+) and image-driven layouts. The typography extractor must surface steps in the display range.

---

### ❌ Airbnb Homepage

**URL**: https://www.airbnb.com/
**Intent**: 响应式网格与 Z-index 层级
**Category**: responsive-grid
**Duration**: 2.5s
**Crash**: No
**Score**: 0/4 (0%)

**Physical extraction summary**:
- Spacing base unit: `4px` — scale: 4px, 8px, 12px, 16px, 24px, 32px, 36px, 48px, 80px
- Typography: 5 steps, base=14px, families: Airbnb Cereal VF
- Assets: 1 images, 0 SVGs, 0 gradients, 10 inline SVGs
- Shadows: 0 variant(s)
- Skeleton: nav="", hero=true, cards=false (0 col), footer=true

**Assertions**:

| # | ID | Description | Expected | Actual | Result |
|---|----|-------------|----------|--------|--------|
| 1 | `airbnb-has-cards` | Card grid detected on the listing page | `—` | `false` | ❌ FAIL |
| 2 | `airbnb-multi-column` | Card grid has ≥ 3 columns (responsive multi-column layout) | `3` | `0` | ❌ FAIL |
| 3 | `airbnb-ecommerce` | Site paradigm correctly classified as e-commerce | `e-commerce` | `—` | ⏭ SKIP — AI token extraction was not run (omit --physical-only or add --ai to enable) |

> **Note**: Airbnb's listing grid is the canonical multi-column responsive card layout. Must detect cards, columns, and e-commerce paradigm.

---

### ✅ GitHub Login

**URL**: https://github.com/login
**Intent**: 表单结构与 Focus 状态
**Category**: form-structure
**Duration**: 2.4s
**Crash**: No
**Score**: 0/0 (100%)

**Physical extraction summary**:
- Spacing base unit: `4px` — scale: 4px, 8px, 12px, 16px
- Typography: 3 steps, base=14px, families: Mona Sans VF
- Assets: 0 images, 0 SVGs, 0 gradients, 10 inline SVGs
- Shadows: 0 variant(s)
- Skeleton: nav="", hero=true, cards=true (2 col), footer=true

**Assertions**:

| # | ID | Description | Expected | Actual | Result |
|---|----|-------------|----------|--------|--------|
| 1 | `github-saas-paradigm` | Auth page correctly classified as saas-app | `saas-app` | `—` | ⏭ SKIP — AI token extraction was not run (omit --physical-only or add --ai to enable) |
| 2 | `github-border-hex` | Border color token is a valid hex (input/form borders are explicit) | `—` | `—` | ⏭ SKIP — AI token extraction was not run (omit --physical-only or add --ai to enable) |
| 3 | `github-radius-populated` | Button/input border-radius (md) is defined | `—` | `—` | ⏭ SKIP — AI token extraction was not run (omit --physical-only or add --ai to enable) |

> **Note**: A simple focused form page. Tests whether the extractor correctly identifies a login form context, captures border tokens, and classifies as saas-app.

---

### ❌ Unsplash

**URL**: https://unsplash.com/
**Intent**: 瀑布流与高保真图片裁切
**Category**: masonry-images
**Duration**: 1.8s
**Crash**: No
**Score**: 0/4 (0%)

**Physical extraction summary**:
- Spacing base unit: `4px` — scale: 16px, 20px, 24px, 32px
- Typography: 2 steps, base=16px, families: ui-sans-serif
- Assets: 1 images, 0 SVGs, 0 gradients, 0 inline SVGs
- Shadows: 0 variant(s)
- Skeleton: nav="", hero=true, cards=false (0 col), footer=true

**Assertions**:

| # | ID | Description | Expected | Actual | Result |
|---|----|-------------|----------|--------|--------|
| 1 | `unsplash-image-rich` | ≥ 15 images detected on the page (photo grid) | `15` | `1` | ❌ FAIL |
| 2 | `unsplash-masonry-layout` | Layout type correctly identified as masonry | `masonry` | `—` | ⏭ SKIP — AI token extraction was not run (omit --physical-only or add --ai to enable) |
| 3 | `unsplash-cards-detected` | Card grid structure detected in DOM | `—` | `false` | ❌ FAIL |

> **Note**: Unsplash's masonry grid is the definitive test for image-heavy layout detection. Must find ≥ 15 images and classify layout as masonry.

---

### ✅ Vercel Blog

**URL**: https://vercel.com/blog
**Intent**: Typography 排版系统
**Category**: typography-system
**Duration**: 2.2s
**Crash**: No
**Score**: 4/4 (100%)

**Physical extraction summary**:
- Spacing base unit: `4px` — scale: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 92px
- Typography: 8 steps, base=16px, families: Geist
- Assets: 14 images, 0 SVGs, 0 gradients, 10 inline SVGs
- Shadows: 3 variant(s) — top: `rgb(235, 235, 235) 0px 0px 0px 1px`
- Skeleton: nav="AI Cloud", hero=true, cards=true (4 col), footer=true

**Assertions**:

| # | ID | Description | Expected | Actual | Result |
|---|----|-------------|----------|--------|--------|
| 1 | `vercel-body-16px` | Body text is ≥ 16px — editorial-grade readability standard | `16` | `16px` | ✅ PASS |
| 2 | `vercel-rich-type-scale` | Typography scale has ≥ 4 distinct size steps (H1, H2, body, caption) | `4` | `8` | ✅ PASS |
| 3 | `vercel-content-site` | Blog correctly classified as content-site paradigm | `content-site` | `—` | ⏭ SKIP — AI token extraction was not run (omit --physical-only or add --ai to enable) |

> **Note**: Vercel Blog is a typographically sophisticated content site. Key checks: body size ≥ 16px, ≥ 4 distinct type steps, content-site paradigm.

---

### ✅ Bilibili Homepage

**URL**: https://www.bilibili.com/
**Intent**: 高密度 DOM 与复杂浮层
**Category**: dense-dom
**Duration**: 2.7s
**Crash**: No
**Score**: 5/5 (100%)

**Physical extraction summary**:
- Spacing base unit: `4px` — scale: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 56px, 60px, 64px
- Typography: 3 steps, base=16px, families: -apple-system
- Assets: 24 images, 0 SVGs, 0 gradients, 10 inline SVGs
- Shadows: 0 variant(s)
- Skeleton: nav="", hero=false, cards=true (4 col), footer=false

**Assertions**:

| # | ID | Description | Expected | Actual | Result |
|---|----|-------------|----------|--------|--------|
| 1 | `bilibili-no-crash` | Physical extraction completes on high-density DOM without crashing (> 0 type steps extracted) | `0` | `3` | ✅ PASS |
| 2 | `bilibili-cards-detected` | Video card grid detected despite DOM complexity | `—` | `true` | ✅ PASS |
| 3 | `bilibili-compact-density` | High-density UI correctly classified as compact | `compact` | `—` | ⏭ SKIP — AI token extraction was not run (omit --physical-only or add --ai to enable) |

> **Note**: Bilibili is a stress test — 5000+ DOM nodes, heavy JS, popup layers, multiple overlapping z-index contexts. Primary check: no crash. Secondary: card + compact density detection.

---

*Generated by VibeExtract EDD eval_runner.ts — 2026-04-15T21:36:26.074Z*