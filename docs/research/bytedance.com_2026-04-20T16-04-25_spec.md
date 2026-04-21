# Design Spec — bytedance.com

> **Extracted:** Mon, 20 Apr 2026 16:04:25 GMT
> **URL:** https://www.bytedance.com/zh/
> **Paradigm:** content-site · **Density:** comfortable · **Motif:** flat-minimal, brand-blue-dominant, chinese-corporate, full-bleed-hero, clean-sans-type

---

## Visual Weight Verdict

**IMAGE DOMINANT**

This content / editorial site is sustained by **large-format photography and imagery**.

### Evidence
- 30 image assets detected (heavy image density)
- Hero section: asymmetric layout — "激发创造 丰富生活"
- Card grid: 4-column, flat
- Layout: single-column / nav top-static
- Density: comfortable (4px base grid)
- Visual hierarchy: editorial

---

## Color Architecture

| Role | Value | Token |
|---|---|---|
| Brand Primary | #1a56e8 | `#1a56e8` |
| Brand Secondary | #1255cc | `#1255cc` |
| Brand Accent | #10d4b0 | `#10d4b0` |
| Background Page | #ffffff | `#ffffff` |
| Background Surface | #f0f6ff | `#f0f6ff` |
| Background Overlay | rgba(255,255,255,0.3) | rgba(255,255,255,0.3) |
| Text Primary | #1a1a1a | `#1a1a1a` |
| Text Secondary | #666666 | `#666666` |
| Text Inverse | #ffffff | `#ffffff` |
| Border | #e5e7eb | `#e5e7eb` |
| Status Success | #10B981 | `#10B981` |
| Status Warning | #F59E0B | `#F59E0B` |
| Status Error | #EF4444 | `#EF4444` |

---

## Typography System

**Families:** body — `DM Sans, sans-serif` · heading — `Gilroy-Bold, Gilroy, sans-serif` · mono — `ui-monospace, monospace`

| Level | Size | Line Height |
|---|---|---|
| `xs` | 16px | 1.8 |
| `sm` | 18px | 1.8 |
| `base` | 20px | 1.8 |
| `lg` | 22px | 1.8 |
| `xl` | 26px | 1.2 |
| `2xl` | 30px | 1.2 |
| `3xl` | 48px | 1.2 |
| `4xl` | 58px | 1.1 |

---

## Spacing

- **Base unit:** 4px
- **Scale:** xs=4px · sm=8px · md=16px · lg=24px · xl=32px · 2xl=48px · 3xl=64px

---

## Site Architecture

| Property | Value |
|---|---|
| Paradigm | content-site |
| Layout | single-column |
| Nav position | top-static |
| Density | comfortable |
| Dominant element | imagery |
| Visual hierarchy | editorial |

---

## Skeleton

| Component | Details |
|---|---|
| Hero | present · asymmetric · "激发创造 丰富生活" · 2 CTAs |
| Nav | brand: "ByteDance 字节跳动" · items: 关于我们, 我们的产品, 新闻动态, 企业社会责任, 加入我们 |
| Cards | 4-column grid · flat |
| Footer | not detected |

---

## Physical Measurements

### Spacing (computed CSS)
- **Base unit:** 4px
- **Measured steps:** 4px · 12px · 16px · 20px · 24px · 28px · 32px · 40px · 44px · 56px · 72px · 116px
- **Named scale:** xs=4px sm=8px md=16px lg=24px xl=32px 2xl=48px 3xl=64px

### Typography (computed CSS)
- **Root body size:** 20px / 0.2rem
- **Detected families:** DM Sans, Gilroy, Gilroy-Bold

| px | rem | Line Height | Weight | Letter Spacing | Role |
|---|---|---|---|---|---|
| 16px | 0.16rem | 1.8 | 400 | 0px | body-sm |
| 18px | 0.18rem | 1.8 | 400 | 0px | body-sm |
| 20px | 0.2rem | 1.8 | 400 | 0px | body |
| 22px | 0.22rem | 1.8 | 400 | 0px | body |
| 26px | 0.26rem | 1.2 | 500 | 0px | body-lg |
| 30px | 0.3rem | 1.2 | 500 | 0px | h5 |
| 48px | 0.48rem | 1.2 | 700 | 0px | h4 |
| 58px | 0.58rem | 1.1 | 500 | 0px | h3 |

### Box Shadows (measured from UI components)

| Frequency | CSS Value |
|---|---|
| ×1 | `rgba(255, 255, 255, 0.3) 0px 0px 1px 1px inset` |

---

## Asset Inventory

### Images (30)
- https://sf16-scmcdn-sg.ibytedtos.com/obj/eaoffice-sg/ies/bytedance_official/_next/static/images/3-9ea22bd593086f432ab75ee6c95c37de.png
- https://sf16-scmcdn-sg.ibytedtos.com/obj/eaoffice-sg/ies/bytedance_official/_next/static/images/0-390b5def140dc370854c98b8e82ad394.png
- https://sf16-scmcdn-sg.ibytedtos.com/obj/eaoffice-sg/ies/bytedance_official/_next/static/images/1-b4afd269ffb0ba19bd1dd33e3ed5cec3.png
- https://sf16-scmcdn-sg.ibytedtos.com/obj/eaoffice-sg/ies/bytedance_official/_next/static/images/2-468bb0555d827d48bce4e178f085bf90.png
- https://sf16-scmcdn-sg.ibytedtos.com/obj/eaoffice-sg/ies/bytedance_official/_next/static/images/zh-5-ae0af3f048628a4a6703d58084a28014.jpg
- https://sf16-scmcdn-sg.ibytedtos.com/obj/eaoffice-sg/ies/bytedance_official/_next/static/images/zh-0-6c25f22b87c60ad4c430d6abd7531a34.jpg
- https://sf16-scmcdn-sg.ibytedtos.com/obj/eaoffice-sg/ies/bytedance_official/_next/static/images/zh-1-de7f5f4876bc1fda19028283676573b1.jpg
- https://sf16-scmcdn-sg.ibytedtos.com/obj/eaoffice-sg/ies/bytedance_official/_next/static/images/zh-2-912fee913a62b12222a4604b5da5010a.jpg
- https://sf16-scmcdn-sg.ibytedtos.com/obj/eaoffice-sg/ies/bytedance_official/_next/static/images/zh-3-5dbfa39699d9bbf71d42a40186595419.jpg
- https://sf16-scmcdn-sg.ibytedtos.com/obj/eaoffice-sg/ies/bytedance_official/_next/static/images/zh-4-26c4957719a3e65eb6054907f14fde98.jpg
- https://sf16-scmcdn-sg.ibytedtos.com/obj/eaoffice-sg/ies/bytedance_official/_next/static/images/cod-cb0d883e8d2c1c45bafb93eb7cd64468.png
- https://sf16-scmcdn-sg.ibytedtos.com/obj/eaoffice-sg/ies/bytedance_official/_next/static/images/1-251e1d7ab5358d67759cd339e67f1126.png
- https://sf16-scmcdn-sg.ibytedtos.com/obj/eaoffice-sg/ies/bytedance_official/_next/static/images/20-92751e179f28076f5551d643985e8227.png
- https://sf16-scmcdn-sg.ibytedtos.com/obj/eaoffice-sg/ies/bytedance_official/_next/static/images/14-e40583abbabbc8b8c4606c5a3a0c4f22.png
- https://sf16-scmcdn-sg.ibytedtos.com/obj/eaoffice-sg/ies/bytedance_official/_next/static/images/18-56820a16743cd362be73045ee938f6a6.png
- https://sf16-scmcdn-sg.ibytedtos.com/obj/eaoffice-sg/ies/bytedance_official/_next/static/images/10-a3e958b728f519d5ffdf391b135b4b33.png
- https://sf16-scmcdn-sg.ibytedtos.com/obj/eaoffice-sg/ies/bytedance_official/_next/static/images/12-cc2ad597fef7d78f685bc205f9159686.png
- https://sf16-scmcdn-sg.ibytedtos.com/obj/eaoffice-sg/ies/bytedance_official/_next/static/images/6-906cf4932b44d8b6bd2accc42dcbd76e.png
- https://sf16-scmcdn-sg.ibytedtos.com/obj/eaoffice-sg/ies/bytedance_official/_next/static/images/25-1ecb04d55202dfdc7b59000e7f67443d.jpg
- https://sf16-scmcdn-sg.ibytedtos.com/obj/eaoffice-sg/ies/bytedance_official/_next/static/images/22-cd5d2b501d5d5aeabd821443a5b6e1eb.jpg
_…and 10 more_

### CSS Gradients (4)
_Real background-image gradient values — use as-is in CSS._

| Element | Gradient |
|---|---|
| `bg-ellipse-full-wrapper` | `linear-gradient(98.63deg, rgba(248, 249, 251, 0.545) 20.59%, rgba(120, 230, 220, 0) 89.33%)` |
| `bg-ellipse bg-ellipse-1` | `linear-gradient(44.11deg, rgba(139, 233, 223, 0.75) 8.94%, rgba(255, 255, 255, 0) 86.73%)` |
| `bg-ellipse bg-ellipse-2` | `linear-gradient(44.11deg, rgba(124, 177, 235, 0.6) 8.94%, rgba(255, 255, 255, 0) 86.73%)` |
| `bg-ellipse bg-ellipse-3` | `linear-gradient(44.11deg, rgba(245, 198, 39, 0.6) 8.94%, rgba(255, 255, 255, 0) 86.73%)` |

### Inline SVGs (1 captured)
_Raw <svg> source — icons, logos, illustrations. Embed directly in generated HTML._

<details><summary>SVG #1 (307 chars)</summary>

```html
<svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.43291 8.25C5.24046 8.58333 4.75933 8.58333 4.56688 8.25L0.236754 0.75C0.0443039 0.416666 0.284866 0 0.669766 0L9.33002 0C9.71492 0 9.95548 0.416667 9.76303 0.75L5.43291 8.25Z" fill="white"></path></svg>
```

</details>

---

## Design Critique (AI Phase 1)

<details>
<summary>Expand raw critique</summary>

## SECTION INVENTORY

| # | Name | Vertical Span | Z-Layer | Background | Dominant Visual |
|---|------|--------------|---------|------------|-----------------|
| 1 | **nav** | 0–8% | floating (fixed/sticky) | solid-color `#ffffff` | interactive-controls |
| 2 | **hero** | 8–82% | base | image (ByteDance HQ building photo) | imagery + typography |
| 3 | **content** (partially visible) | 82–100% | base | solid-color `#f0f6ff` (light blue-white) | imagery (card row partially visible) |

---

## SPATIAL GRID ANALYSIS

### Navigation Bar (floating)
- **Layout engine:** Flexbox
- **Arrangement:** Logo left-anchored, nav links centered/right as a horizontal row
- **Nav link spacing:** ~56px gap between items (visually estimated; Physical Data spacing scale suggests `56px` tier)
- **Z-index tier:** floating layer, `position: fixed` or `sticky`, sits above hero content
- **Height:** ~80px (viewport 0–8%)

### Hero Carousel
- **Layout engine:** absolute positioning (carousel/slider)
- **Column count:** 1 (full-width single slide)
- **Content overlay:** White card panel anchored top-left (~8–32% width, ~10–32% height), containing mission label + headline text; partially transparent/white background
- **Carousel indicators:** 4 dots centered horizontally near bottom of hero (~80% vertical position); first dot filled (active), remaining 3 are outlined
- **Item pattern:** fluid, full-viewport-width
- **Masonry note:** none

### Content Section (partially visible)
- **Layout engine:** CSS Grid or Flexbox (row)
- **Column count:** 3+ (card thumbnails visible at bottom edge — at least 3 columns suggested)
- **Gap size:** ~32px (`xl` in spacing scale)
- **Item pattern:** fixed-width cards
- **Masonry note:** none detected

---

## ASSET AUDIT

| Asset Role | Finding |
|------------|---------|
| **Hero bg** | Full-bleed photograph of ByteDance/字节跳动 headquarters building (grey stone facade, blue/teal logo signage, dusk sky). URL not extractable from Physical Data — **no URL in Physical Data assets**. |
| **Logo/brand** | Combination mark: inline SVG bar-chart icon (blue/teal bars) + text "ByteDance / 字节跳动". Present top-left in nav. No separate img URL found in Physical Data. |
| **Card images** | Partially visible image thumbnails at very bottom of viewport — **no asset URLs found in Physical Data**. |
| **Icon set** | Inline SVG count: 1 confirmed (logo bars). No additional SVG file URL pattern provided in Physical Data. |
| **Carousel dots** | Pure CSS / HTML elements — no image assets required. |

---

## COLOR SEMANTICS

| Observed Hex | Semantic Role | Evidence |
|-------------|---------------|----------|
| `#1255cc` / `#1a56e8` | **Brand-Primary** | Nav link hover states, ByteDance logo blue bar, carousel active dot fill |
| `#00c9a7` / `#10d4b0` | **Brand-Accent** | Teal/green bar in ByteDance logo mark (rightmost bar); accent on building signage in hero photo |
| `#ffffff` | **Neutral-Base** | Nav bar background; hero overlay card panel background; carousel dot outlines |
| `#f0f6ff` | **Neutral-Surface** | Partially visible content section below hero — light blue-white wash |
| `#1a1a1a` / `#111111` | **Text-Main** | Hero headline "激发创造 / 丰富生活" (large bold Chinese characters); nav logo text |
| `#666666` / `#888888` | **Text-Muted** | "使命" label above headline (smaller, lighter weight) |
| `#333333` | **Text-Main (Nav)** | Navigation link text: 关于我们, 我们的产品, 新闻动态, 企业社会责任, 加入我们 |
| `rgba(255,255,255,0.3)` | **Neutral-Overlay** | Inset box-shadow on panel/button element — confirmed in Physical Data: `rgba(255, 255, 255, 0.3) 0px 0px 1px 1px inset` |

---

### Key Discrepancies / Notes
- **Typography:** Physical Data reports base body at `20px` with a `0.2rem` base. The hero headline visually appears at ~58–48px scale, consistent with Physical Data's `h3 (58px, w:500)` or `h4 (48px, w:700)` steps. The "使命" label aligns with `16px body-sm`.
- **Font families:** DM Sans / Gilroy / Gilroy-Bold — Gilroy-Bold likely used for the large hero headline; DM Sans for nav links and body text.
- **Spacing base unit is 4px** — all margins/paddings should be multiples thereof. The white hero card panel has `~24px (lg)` internal padding visible.
- **Box shadow** only one unique value recorded in Physical Data (`rgba(255,255,255,0.3) inset`), suggesting minimal shadow usage across the page — flat design aesthetic confirmed visually.

</details>
