# Design Spec — pinduoduo.com

> **Extracted:** Tue, 21 Apr 2026 12:27:33 GMT
> **URL:** https://www.pinduoduo.com/
> **Paradigm:** e-commerce · **Density:** comfortable · **Motif:** coral-red brand immersion, geometric diamond polygon hero, product-led imagery, full-bleed banner with app mockup, Chinese-market group-buying aesthetic

---

## Visual Weight Verdict

**IMAGE DOMINANT**

This e-commerce storefront is sustained by **large-format photography and imagery**.

### Evidence
- 28 image assets detected (heavy image density)
- Hero section: split layout — "拼多多 新电商开创者"
- Card grid: 4-column, flat
- Layout: single-column / nav top-static
- Density: comfortable (4px base grid)
- Visual hierarchy: expressive

---

## Color Architecture

| Role | Value | Token |
|---|---|---|
| Brand Primary | #f4395a | `#f4395a` |
| Brand Secondary | #ff6b8a | `#ff6b8a` |
| Brand Accent | #fce4e8 | `#fce4e8` |
| Background Page | #ffffff | `#ffffff` |
| Background Surface | #f5f5f5 | `#f5f5f5` |
| Background Overlay | rgba(0,0,0,0.5) | rgba(0,0,0,0.5) |
| Text Primary | #333333 | `#333333` |
| Text Secondary | #999999 | `#999999` |
| Text Inverse | #ffffff | `#ffffff` |
| Border | #cccccc | `#cccccc` |
| Status Success | #10B981 | `#10B981` |
| Status Warning | #F59E0B | `#F59E0B` |
| Status Error | #EF4444 | `#EF4444` |

---

## Typography System

**Families:** body — `'PingFang SC', sans-serif` · heading — `'PingFang SC', sans-serif` · mono — `ui-monospace, monospace`

| Level | Size | Line Height |
|---|---|---|
| `xs` | 14px | 1 |
| `sm` | 15px | 1.1 |
| `base` | 16px | 1.2 |
| `lg` | 18px | 1.2 |
| `xl` | 20px | 1.2 |
| `2xl` | 24px | 1 |
| `3xl` | 30px | 1.2 |
| `4xl` | 36px | 1.1 |

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
| Nav position | top-static |
| Density | comfortable |
| Dominant element | imagery |
| Visual hierarchy | expressive |

---

## Skeleton

| Component | Details |
|---|---|
| Hero | present · split · "拼多多 新电商开创者" · 1 CTA |
| Nav | brand: "拼多多" · items: 首页, 拼多多商家入驻, 热点资讯 |
| Cards | 4-column grid · flat |
| Footer | not detected |

---

## Physical Measurements

### Spacing (computed CSS)
- **Base unit:** 4px
- **Measured steps:** 8px · 12px · 16px · 20px · 28px · 32px · 44px · 56px · 60px · 64px · 76px
- **Named scale:** xs=4px sm=8px md=16px lg=24px xl=32px 2xl=48px 3xl=64px

### Typography (computed CSS)
- **Root body size:** 16px / 0.0937rem
- **Detected families:** PingFang SC

| px | rem | Line Height | Weight | Letter Spacing | Role |
|---|---|---|---|---|---|
| 14px | 0.082rem | 1 | 400 | 0px | body-sm |
| 15px | 0.0879rem | 1.1 | 400 | 0px | body |
| 16px | 0.0937rem | 1.2 | 400 | 0px | body |
| 18px | 0.1055rem | 1.2 | 400 | 0px | body |
| 20px | 0.1172rem | 1.2 | 400 | 0px | body-lg |
| 24px | 0.1406rem | 1 | 400 | 0px | h5 |

---

## Asset Inventory

### Images (28)
- https://cdn.pinduoduo.com/upload/home/img/common/pdd_logo_v2.png
- https://cdn.pinduoduo.com/upload/2020-12-14/7531b9a5-e242-4124-89df-254df0862ab5.jpg
- https://cdn.pinduoduo.com/upload/home/img/index/seckill_v2.jpg
- https://cdn.pinduoduo.com/upload/home/img/index/sale_v2.jpg
- https://cdn.pinduoduo.com/upload/home/img/index/supermarket_v2.jpg
- https://cdn.pinduoduo.com/upload/home/img/index/download.jpg
- https://cdn.pinduoduo.com/upload/home/img/subject/girlclothes.jpg
- https://cdn.pinduoduo.com/upload/home/img/subject/boyshirt.jpg
- https://cdn.pinduoduo.com/upload/894b1103-7ddb-4a94-a472-9991353a7504.png
- https://cdn.pinduoduo.com/upload/home/img/subject/food.jpg
- https://cdn.pinduoduo.com/upload/shoes.jpg
- https://cdn.pinduoduo.com/upload/home/img/subject/home.jpg
- https://cdn.pinduoduo.com/upload/official_website/6b1f700d-70c7-4f9f-890c-eb9f9ae68425.png
- https://cdn.pinduoduo.com/upload/home/img/subject/3c.jpg
- https://cdn.pinduoduo.com/upload/home/img/subject/baby.jpg
- https://cdn.pinduoduo.com/upload/home/img/subject/furniture.jpg
- https://cdn.pinduoduo.com/upload/home/img/subject/sports.jpg
- https://cdn.pinduoduo.com/upload/overseas.jpg
- https://cdn.pinduoduo.com/upload/e48dac21-db3b-4801-b047-6f14d0805614.png.slim.png
- https://cdn.pinduoduo.com/upload/home/img/common/pdd_foot_wechat.png
_…and 8 more_

---

## Design Critique (AI Phase 1)

<details>
<summary>Expand raw critique</summary>

# Layout Analysis

---

## SECTION INVENTORY

| # | Name | Vertical Span | Z-Layer | Background | Dominant Visual |
|---|------|--------------|---------|------------|-----------------|
| 1 | **nav** | 0–9% | floating (fixed/sticky) | solid-color `#ffffff` | typography + brand logo |
| 2 | **hero** | 9–46% | base | gradient/image (coral-red `#f4395a` → pink-red with geometric diamond pattern) | imagery + typography + CTA button |
| 3 | **section-header (精彩活动)** | 46–54% | base | solid `#ffffff` | typography |
| 4 | **floating-qr-widget** | ~55–83% | floating (fixed left edge) | solid `#ffffff` with border | imagery + typography |
| 5 | **activities / feature-grid** | 54–100% | base | solid `#ffffff` / card surfaces | imagery + typography |

---

## SPATIAL GRID ANALYSIS

### Nav Bar
- **Layout engine**: Flexbox (horizontal)
- **Column count**: 1 row, ~9 items separated by `|` pipe dividers
- **Gap size**: spacing ~16px (md) between nav items
- **Item pattern**: fluid text links
- **Z-index tier**: `position: fixed` or `sticky`, z ≈ high tier (overlay-adjacent)
- Logo positioned left; nav links horizontally right-aligned, centered vertically

### Hero Banner
- **Layout engine**: Absolute / CSS positioned elements over full-bleed image
- **Column count**: N/A — full-width banner ~1270px
- **Item pattern**: Phone mockup image (left ~40%), text block (right ~60%)
- **CTA button**: centered below headline text, bordered rectangle button `立即下载 ↓`
- **Masonry note**: None

### 精彩活动 Section Header
- **Layout engine**: Flexbox (space-between)
- **Left**: `精彩活动` label (text, ~18–20px, bold)
- **Right**: `更多 >` link
- **Gap**: full row width, justified ends
- **Divider**: 1px horizontal rule below header

### Activity Cards / Feature Grid (bottom ~54–100%)
- **Layout engine**: CSS Grid or Flexbox row
- **Column count**: visually 3 columns (3 partial card bottoms visible at viewport edge)
- **Gap size**: gap ≈ spacing.md = 16px between cards
- **Item pattern**: fluid-width cards with equal aspect ratio
- **Large feature card**: 1 full-width card (限时秒杀 — 一元秒) occupying ~full row width above the 3-col grid, containing product imagery (watch, jacket, tissue box) on pink `#fce4e8` background with carousel dots

### Floating QR Widget (left edge)
- **Layout engine**: Absolute/fixed positioned
- **Z-index tier**: floating layer, `position: fixed`, left: 0, mid-vertical
- **Size**: ~54×160px panel
- **Content**: QR code image (top), text "码下载" / "享优惠" below
- **Background**: `#ffffff`, slight box-shadow or border-right

---

## ASSET AUDIT

| Asset | Source | Value |
|-------|--------|-------|
| **Hero bg** | Physical Data / Screenshot | Full-bleed coral-red gradient image with geometric diamond/polygon pattern; URL not surfaced in Physical Data — visually confirmed as CSS background-image |
| **Logo/brand** | Screenshot visual | Combination mark: square red icon (snowflake/grid motif) + "拼多多" Chinese text + "拼着买·才便宜" tagline — likely `<img>` or inline SVG; no URL in Physical Data |
| **Hero phone mockup** | Screenshot visual | Rendered PNG of mobile device showing Pinduoduo app UI; no URL surfaced in Physical Data |
| **Activity banner (限时秒杀)** | Screenshot visual | Product image banner: watch (luxury), orange down jacket, blue tissue box on pink bg; no URL in Physical Data |
| **QR code widget** | Screenshot visual | Small square QR code image, fixed-left position; no URL in Physical Data |
| **Card images (3-col bottom)** | Physical Data assets | **no asset found** — 3 partial card tops visible but URLs not provided |
| **Icon set** | Physical Data | No inline-SVG count provided; nav uses text-only separators |

> ⚠️ **Asset Discrepancy**: Physical Data provides no image URLs. All asset identifications above are derived solely from the Screenshot. Per hierarchy rules, all URLs are marked as unverified.

---

## COLOR SEMANTICS

| Observed Hex | Semantic Role | Evidence |
|--------------|--------------|---------|
| `#e02460` / `#f4395a` | **Brand-Primary** | Hero banner background gradient, hero CTA button border, logo icon red fill |
| `#ff6b8a` | **Brand-Secondary** | Lighter pink tones in hero gradient, diamond pattern highlights |
| `#fce4e8` | **Brand-Accent** (light tint) | 限时秒杀 card background fill (pale pink/blush) |
| `#ffffff` | **Neutral-Base** | Page body background, nav bar background, card surfaces, QR widget |
| `#f5f5f5` / `#fafafa` | **Neutral-Surface** | Section background between hero and activity section |
| `#333333` / `#2c2c2c` | **Text-Main** | Nav link text (non-active), section headers (精彩活动), body text |
| `#e02460` | **Brand-Primary (text)** | Active nav item "首页" underlined red; `更多 >` link text |
| `#ffffff` | **Text-Inverse** | Hero headline text (拼多多, 新电商开创者, 拼着买 才便宜), CTA button text |
| `#cccccc` | **Border-Default** | Nav `|` pipe separators, section divider rule, card borders |
| `#999999` | **Text-Muted** | Smaller nav link text, secondary labels, QR widget sub-text |
| `#ffb3c1` | **Neutral-Overlay** | Carousel dot inactive state on 限时秒杀 banner |

</details>
