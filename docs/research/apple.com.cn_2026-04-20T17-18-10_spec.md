# Design Spec — apple.com.cn

> **Extracted:** Mon, 20 Apr 2026 17:18:10 GMT
> **URL:** https://www.apple.com.cn/
> **Paradigm:** e-commerce · **Density:** comfortable · **Motif:** frosted-glass navigation, Apple minimalism, centered editorial hierarchy, product-forward hero imagery, bilingual Chinese-English interface

---

## Visual Weight Verdict

**TYPE DOMINANT**

This e-commerce storefront is sustained by **editorial typography and text hierarchy**.

### Evidence
- 5 image assets detected (light image density)
- Hero section: centered layout — "Apple (中国大陆) - 官方网站"
- Card grid: 4-column, flat
- Layout: single-column / nav top-fixed
- Density: comfortable (4px base grid)
- Visual hierarchy: editorial

---

## Color Architecture

| Role | Value | Token |
|---|---|---|
| Brand Primary | #0071e3 | `#0071e3` |
| Brand Secondary | #fce4e4 | `#fce4e4` |
| Brand Accent | #0071e3 | `#0071e3` |
| Background Page | #f5f5f7 | `#f5f5f7` |
| Background Surface | #ffffff | `#ffffff` |
| Background Overlay | rgba(255,255,255,0.85) | rgba(255,255,255,0.85) |
| Text Primary | #1d1d1f | `#1d1d1f` |
| Text Secondary | #6e6e73 | `#6e6e73` |
| Text Inverse | #ffffff | `#ffffff` |
| Border | #d2d2d7 | `#d2d2d7` |
| Status Success | #10B981 | `#10B981` |
| Status Warning | #F59E0B | `#F59E0B` |
| Status Error | #EF4444 | `#EF4444` |

---

## Typography System

**Families:** body — `'SF Pro Text', sans-serif` · heading — `'SF Pro SC', sans-serif` · mono — `ui-monospace, monospace`

| Level | Size | Line Height |
|---|---|---|
| `xs` | 12px | 1.3 |
| `sm` | 14px | 1.3 |
| `base` | 17px | 1.5 |
| `lg` | 18px | 1 |
| `xl` | 24px | 1.2 |
| `2xl` | 34px | 1.5 |
| `3xl` | 34px | 1.5 |
| `4xl` | 34px | 1.5 |

---

## Spacing

- **Base unit:** 4px
- **Scale:** xs=4px · sm=8px · md=16px · lg=24px · xl=32px · 2xl=48px · 3xl=64px

---

## Site Architecture

| Property | Value |
|---|---|
| Paradigm | e-commerce |
| Layout | single-column |
| Nav position | top-fixed |
| Density | comfortable |
| Dominant element | typography |
| Visual hierarchy | editorial |

---

## Skeleton

| Component | Details |
|---|---|
| Hero | present · centered · "Apple (中国大陆) - 官方网站" · 2 CTAs |
| Nav | brand: "Apple" · items: 商店, Mac, iPad, iPhone, Watch, Vision |
| Cards | 4-column grid · flat |
| Footer | 1 column |

---

## Physical Measurements

### Spacing (computed CSS)
- **Base unit:** 4px
- **Measured steps:** 4px · 8px · 12px · 16px · 20px · 24px · 28px · 32px · 40px · 44px · 80px · 84px · 88px
- **Named scale:** xs=4px sm=8px md=16px lg=24px xl=32px 2xl=48px 3xl=64px

### Typography (computed CSS)
- **Root body size:** 12px / 0.7059rem
- **Detected families:** SF Pro Text, SF Pro SC

| px | rem | Line Height | Weight | Letter Spacing | Role |
|---|---|---|---|---|---|
| 12px | 0.7059rem | 1.3 | 600 | 0px | body |
| 14px | 0.8235rem | 1.3 | 400 | -0.224px | body-lg |
| 17px | 1rem | 1.5 | 400 | 0px | body-lg |
| 18px | 1.0588rem | 1 | 300 | 0px | h5 |
| 24px | 1.4118rem | 1.2 | 600 | 0.216px | h4 |
| 34px | 2rem | 1.5 | 600 | 0px | h3 |

---

## Asset Inventory

### Images (5)
- https://www.apple.com.cn/home/images/wechat/open_graph_logo.png
- https://www.apple.com.cn/v/home/cm/images/heroes/iphone-family/hero_iphone_family__fuz5j2v5xx6y_largetall.jpg
- https://www.apple.com.cn/home/heroes/apple-watch-series-11/images/hero_logo_apple_watch_series_11__d7d7nh53wq2q_large.png
- https://www.apple.com.cn/home/heroes/apple-watch-series-11/images/hero_apple_watch_series_11__bdz1mml4dx6q_largetall.jpg
- https://www.apple.com.cn/v/home/cm/images/heroes/macbook-neo/hero_macbook_neo__gnm3snkti4a6_largetall.jpg

### Inline SVGs (10 captured)
_Raw <svg> source — icons, logos, illustrations. Embed directly in generated HTML._

<details><summary>SVG #1 (344 chars)</summary>

```html
<svg width="18" height="18" viewBox="0 0 18 18"><polyline fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" points="3.5 15, 15 3.5"></polyline><polyline fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" points="3.5 3.5, 15 15"></polyline></svg>
```

</details>
<details><summary>SVG #2 (381 chars)</summary>

```html
<svg height="48" viewBox="0 0 9 48" width="9" xmlns="http://www.w3.org/2000/svg"><path d="m1.5618 24.0621 6.5581-6.4238c.2368-.2319.2407-.6118.0088-.8486-.2324-.2373-.6123-.2407-.8486-.0088l-7 6.8569c-.1157.1138-.1807.2695-.1802.4316.001.1621.0674.3174.1846.4297l7 6.7241c.1162.1118.2661.1675.4155.1675.1577 0 .3149-.062.4326-.1846.2295-.2388.2222-.6187-.0171-.8481z"></path></svg>
```

</details>
<details><summary>SVG #3 (749 chars)</summary>

```html
<svg height="44" viewBox="0 0 14 44" width="14" xmlns="http://www.w3.org/2000/svg"><path d="m13.0729 17.6825a3.61 3.61 0 0 0 -1.7248 3.0365 3.5132 3.5132 0 0 0 2.1379 3.2223 8.394 8.394 0 0 1 -1.0948 2.2618c-.6816.9812-1.3943 1.9623-2.4787 1.9623s-1.3633-.63-2.613-.63c-1.2187 0-1.6525.6507-2.644.6507s-1.6834-.9089-2.4787-2.0243a9.7842 9.7842 0 0 1 -1.6628-5.2776c0-3.0984 2.014-4.7405 3.9969-4.7405 1.0535 0 1.9314.6919 2.5924.6919.63 0 1.6112-.7333 2.8092-.7333a3.7579 3.7579 0 0 1 3.1604 1.5802zm-3.7284-2.8918a3.5615 3.5615 0 0 0 .8469-2.22 1.5353 1.5353 0 0 0 -.031-.32 3.5686 3.5686 0 0 0 -2.3445 1.2084 3.4629 3.4629 0 0 0 -.8779 2.1585 1.419 1.419 0 0 0 .031.2892 1.19 1.19 0 0 0 .2169.0207 3.0935 3.0935 0 0 0 2.1586-1.1368z"></path></svg>
```

</details>
<details><summary>SVG #4 (762 chars)</summary>

```html
<svg height="48" viewBox="0 0 17 48" width="17" xmlns="http://www.w3.org/2000/svg"><path d="m15.5752 19.0792a4.2055 4.2055 0 0 0 -2.01 3.5376 4.0931 4.0931 0 0 0 2.4908 3.7542 9.7779 9.7779 0 0 1 -1.2755 2.6351c-.7941 1.1431-1.6244 2.2862-2.8878 2.2862s-1.5883-.734-3.0443-.734c-1.42 0-1.9252.7581-3.08.7581s-1.9611-1.0589-2.8876-2.3584a11.3987 11.3987 0 0 1 -1.9373-6.1487c0-3.61 2.3464-5.523 4.6566-5.523 1.2274 0 2.25.8062 3.02.8062.734 0 1.8771-.8543 3.2729-.8543a4.3778 4.3778 0 0 1 3.6822 1.841zm-6.8586-2.0456a1.3865 1.3865 0 0 1 -.2527-.024 1.6557 1.6557 0 0 1 -.0361-.337 4.0341 4.0341 0 0 1 1.0228-2.5148 4.1571 4.1571 0 0 1 2.7314-1.4078 1.7815 1.7815 0 0 1 .0361.373 4.1487 4.1487 0 0 1 -.9867 2.587 3.6039 3.6039 0 0 1 -2.5148 1.3236z"></path></svg>
```

</details>
<details><summary>SVG #5 (1267 chars)</summary>

```html
<svg height="44" viewBox="0 0 20 44" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m2.2568 23.0189-.6035-.7793v4.1426h-.9316v-6.6562h2.1328c-.1465-.3633-.2988-.7266-.4863-1.0488h-2.0743v-.9375h4.0254c-.0938-.2461-.1934-.4805-.2988-.6855l1.0781-.1642c.1055.2578.1934.5449.293.8496h4.0371v.9375h-2.1504c-.1582.3867-.3223.7324-.498 1.0488h2.2031v5.4961c0 .7793-.3398 1.1836-1.002 1.1836h-1.0488l-.2461-.8848.9844.0293c.2461 0 .3809-.1816.3809-.5332v-4.4297h-6.3985v1.6113c.8203-.4512 1.5-.9844 2.0508-1.5879l.6855.6035c-.416.498-.8965.9434-1.4414 1.3477h3.9082v2.7012h-4.002v-2.6309c-.1933.1349-.3866.2638-.5976.3868zm3.4571-3.293c.1816-.3457.3516-.6914.498-1.0488h-2.7773c.1465.3164.293.6621.4102 1.0488zm.205 3.7032h-2.121v.9727h2.1211v-.9727zm2.1094-1.1485-.7266.7207c-.4746-.5566-1.1484-1.1426-2.0098-1.7754l.6562-.6211c.8205.5567 1.5177 1.125 2.0802 1.6758zm7.9336-4.3652h3.7441v.9434h-7.4414v2.1328c-.0293 2.2559-.4043 4.0547-1.1133 5.4141l-.7383-.6562c.5684-1.1426.8613-2.7305.8848-4.7578v-3.0762h3.668c-.1406-.293-.3047-.5625-.4688-.8086l1.0137-.1641c.1641.2988.3047.621.4512.9726zm.2461 1.2598v1.1074h3.2637v.9199h-3.2637v1.3008h2.6836v3.9434h-.9609v-.4512h-4.043v.4512h-.9609v-3.9434h2.3086v-3.3281zm1.7227 5.9062v-1.6699h-4.043v1.6699z"></path></svg>
```

</details>
<details><summary>SVG #6 (220 chars)</summary>

```html
<svg height="48" viewBox="0 0 9 48" width="9" xmlns="http://www.w3.org/2000/svg"><path d="m8.1155 30.358a.6.6 0 1 1 -.831.8653l-7-6.7242a.6.6 0 0 1 -.0045-.8613l7-6.8569a.6.6 0 1 1 .84.8574l-6.5582 6.4238z"></path></svg>
```

</details>
<details><summary>SVG #7 (379 chars)</summary>

```html
<svg height="10" viewBox="0 0 10 10" width="10" xmlns="http://www.w3.org/2000/svg"><path d="m4.6725 6.635-2.655-2.667a.445.445 0 0 1 -.123-.304.4331.4331 0 0 1 .427-.439h.006a.447.447 0 0 1 .316.135l2.357 2.365 2.356-2.365a.458.458 0 0 1 .316-.135.433.433 0 0 1 .433.433v.006a.4189.4189 0 0 1 -.123.3l-2.655 2.671a.4451.4451 0 0 1 -.327.14.464.464 0 0 1 -.328-.14z"></path></svg>
```

</details>
<details><summary>SVG #8 (401 chars)</summary>

```html
<svg height="48" viewBox="0 0 9 48" width="9" xmlns="http://www.w3.org/2000/svg"><path d="m7.4382 24.0621-6.5581-6.4238c-.2368-.2319-.2407-.6118-.0088-.8486.2324-.2373.6123-.2407.8486-.0088l7 6.8569c.1157.1138.1807.2695.1802.4316-.001.1621-.0674.3174-.1846.4297l-7 6.7242c-.1162.1118-.2661.1675-.4155.1675-.1577 0-.3149-.062-.4326-.1846-.2295-.2388-.2222-.6187.0171-.8481l6.5537-6.2959z"></path></svg>
```

</details>
<details><summary>SVG #9 (1026 chars)</summary>

```html
<svg height="44" viewBox="0 0 23 44" width="23" xmlns="http://www.w3.org/2000/svg"><path d="m8.1558 25.9987v-6.457h-.0703l-2.666 6.457h-.8907l-2.666-6.457h-.0703v6.457h-.9844v-8.4551h1.2246l2.8945 7.0547h.0938l2.8945-7.0547h1.2246v8.4551zm2.5166-1.7696c0-1.1309.832-1.7812 2.3027-1.8691l1.8223-.1113v-.5742c0-.7793-.4863-1.207-1.4297-1.207-.7559 0-1.2832.2871-1.4238.7852h-1.0195c.1348-1.0137 1.1309-1.6816 2.4785-1.6816 1.541 0 2.4023.791 2.4023 2.1035v4.3242h-.9609v-.9318h-.0938c-.4102.6738-1.1016 1.043-1.9453 1.043-1.2246 0-2.1328-.7266-2.1328-1.8809zm4.125-.5859v-.5801l-1.6992.1113c-.9609.0645-1.3828.3984-1.3828 1.0312 0 .6445.5449 1.0195 1.2773 1.0195 1.0371.0001 1.8047-.6796 1.8047-1.5819zm6.958-2.0273c-.1641-.627-.7207-1.1367-1.6289-1.1367-1.1367 0-1.8516.9082-1.8516 2.3379 0 1.459.7266 2.3848 1.8516 2.3848.8496 0 1.4414-.3926 1.6289-1.1074h1.0195c-.1816 1.1602-1.125 2.0156-2.6426 2.0156-1.7695 0-2.9004-1.2832-2.9004-3.293 0-1.9688 1.125-3.2461 2.8945-3.2461 1.5352 0 2.4727.9199 2.6484 2.0449z"></path></svg>
```

</details>
<details><summary>SVG #10 (220 chars)</summary>

```html
<svg height="48" viewBox="0 0 9 48" width="9" xmlns="http://www.w3.org/2000/svg"><path d="m8.1155 30.358a.6.6 0 1 1 -.831.8653l-7-6.7242a.6.6 0 0 1 -.0045-.8613l7-6.8569a.6.6 0 1 1 .84.8574l-6.5582 6.4238z"></path></svg>
```

</details>

---

## Design Critique (AI Phase 1)

<details>
<summary>Expand raw critique</summary>

# Layout Analysis

---

## SECTION INVENTORY

| # | Name | Vertical Span | Z-Layer | Background | Dominant Visual |
|---|------|--------------|---------|------------|-----------------|
| 1 | **country-banner** | 0–8% | floating (fixed top) | solid-color (`#f5f5f7`) | interactive-controls |
| 2 | **nav** | 8–16% | floating (sticky/fixed) | solid-color (`rgba(255,255,255,0.85)` / blurred) | interactive-controls |
| 3 | **promo-strip** | 16–20% | base | solid-color (`#f5f5f7`) | typography |
| 4 | **hero** | 20–100% | base | solid-color (`#f5f5f7`) → fades to light pink/rose at bottom | imagery + typography |

**Detailed descriptions:**

- **country-banner**: Full-width dismissible bar. Contains instructional text on the left, a dropdown selector (pre-selected "United States" with checkmark icon), a solid CTA "Continue" button, and a close (×) icon on the right.
- **nav**: Apple global navigation. Apple logo (left), horizontal link list (商店, Mac, iPad, iPhone, Watch, Vision, AirPods, 家居, 娱乐, 配件, 技术支持), search icon and bag icon (right). Translucent/frosted glass treatment.
- **promo-strip**: Single-line promotional text in Chinese with an inline link ("查找零售店 ›"). Centered.
- **hero**: Large centered text block ("iPhone / 来看看 iPhone 最新阵容"), two CTA buttons side-by-side, then three iPhone product images fanned/overlapping, partially cropped at viewport bottom. A blush-pink gradient region begins at the very bottom edge.

---

## SPATIAL GRID ANALYSIS

### country-banner
- **Layout engine**: Flexbox
- **Column count**: 3 (text block | dropdown control | button + close)
- **Gap size**: ~24px (lg) between major groups
- **Item pattern**: fluid left text, fixed-width right controls
- **Masonry note**: None

### nav
- **Layout engine**: Flexbox
- **Column count**: 3 zones (logo | nav links | utility icons)
- **Gap size**: approximately 44px between nav link items (matching the 44px scale value from Physical Data — typical Apple nav tap targets)
- **Item pattern**: fixed-width link labels, evenly spaced
- **Z-index tier**: Sticky/fixed, z-index elevated above base content
- **Masonry note**: None

### hero (CTA buttons row)
- **Layout engine**: Flexbox (horizontal, centered)
- **Column count**: 2 buttons
- **Gap size**: ~16px (md) between the two buttons
- **Item pattern**: fixed-width pill-shaped buttons
- **Masonry note**: None

### hero (iPhone imagery)
- **Layout engine**: Absolute positioning / overlapping layered images
- **Column count**: 3 visible iPhone units (dark navy, white/silver, rose/pink), partially clipped at right
- **Gap size**: Overlapping — negative spacing, images fan out
- **Item pattern**: aspect-ratio-locked product renders at fixed scale
- **Masonry note**: Not masonry; intentional overlapping/stacked fan arrangement

### Floating element summary
| Element | Position type | Z-tier |
|---|---|---|
| country-banner | fixed / top | High overlay (above nav) |
| nav | sticky / top (below banner) | Floating |

---

## ASSET AUDIT

- **Hero bg**: No distinct image asset — solid `#f5f5f7` light gray fading to rose-pink (`~#fce4e4` / `#ffd6d6`) gradient at the bottom edge. No background image URL found in Physical Data.
- **Logo/brand**: Inline SVG — Apple logo mark (single path, monochrome black) in nav left slot. Text-only brand label absent; pure logomark.
- **Card images**: Three iPhone product renders visible in hero section:
  - iPhone unit 1: Dark navy/black (iPhone 15 Pro colorway) — no asset URL in Physical Data
  - iPhone unit 2: White/Silver (iPhone 15 standard) — no asset URL in Physical Data
  - iPhone unit 3: Rose/blush pink (iPhone 15 standard) — no asset URL in Physical Data
  - **Status**: No asset URLs confirmed in Physical Data → marked **no asset found** per protocol
- **Icon set**: Inline SVGs observed:
  - Apple logo (nav, 1 SVG)
  - Checkmark icon (country selector dropdown, 1 SVG)
  - Chevron/dropdown arrow (country selector, 1 SVG)
  - Search icon (nav utility, 1 SVG)
  - Shopping bag icon (nav utility, 1 SVG)
  - Close/× icon (country banner dismiss, 1 SVG)
  - **Total**: ~6 inline SVGs; no external SVG file URL pattern confirmed in Physical Data

---

## COLOR SEMANTICS

| Observed Hex | Semantic Role | Evidence |
|---|---|---|
| `#f5f5f7` | **Neutral-Surface** | Country banner background, nav background, hero page background — Apple's canonical light gray surface |
| `#ffffff` | **Neutral-Base** | Nav bar (with translucency/blur treatment), button stroke on "选购 iPhone" ghost button |
| `#1d1d1f` | **Text-Main** | Nav link labels, hero headline "iPhone", promo strip body text, banner instructional text |
| `#6e6e73` | **Text-Muted** | Sub-headline "来看看 iPhone 最新阵容" (lighter weight Chinese subtitle) |
| `#0071e3` | **Brand-Primary** | "Continue" button fill (country banner), "进一步了解" filled CTA button, inline link "查找零售店 ›" text |
| `#ffffff` (on blue) | **Text-Inverse** | Label text inside "Continue" and "进一步了解" filled buttons |
| `#0071e3` (stroke) | **Brand-Accent** | "选购 iPhone" ghost/outline button border and text |
| `#d2d2d7` | **Border-Default** | Country selector dropdown border, ghost button border ring |
| `#fce4e4` / `~#ffd6d6` | **Brand-Secondary** | Blush-pink gradient at bottom hero edge (matches iPhone rose colorway branding) |
| `rgba(255,255,255,0.85)` | **Neutral-Overlay** | Nav bar translucent backdrop (frosted glass, confirmed by typical Apple nav treatment) |

**Discrepancy notes:**
- Physical Data reports `17px / lh:1.5 / w:400` for body-lg — this matches the nav link label sizing visually observed (~17px).
- The hero title "iPhone" visually appears much larger than the Physical Data's largest documented step (`34px / h3`). It likely uses a display-scale size **above** the documented scale (possibly 80px+ for the hero wordmark), which Physical Data's typography table does not capture at that tier — this is a gap in the Physical Data provided.
- Physical Data confirms `44px` as a spacing scale value — consistent with Apple's minimum tap-target sizing used throughout the nav.

</details>
