# Design Spec — baidu.com

> **Extracted:** Tue, 21 Apr 2026 22:34:53 GMT
> **URL:** https://www.baidu.com/
> **Paradigm:** content-site · **Density:** comfortable · **Motif:** clean white canvas, centered search focus, bold brand-blue CTA, Chinese typographic hierarchy, minimal chrome

---

## Visual Weight Verdict

**TYPE DOMINANT**

This content / editorial site is sustained by **editorial typography and text hierarchy**.

### Evidence
- 18 image assets detected (moderate image density)
- 2 SVG assets detected
- Hero section: centered layout — "张凌赫登上法国第一大报纸"
- Card grid: 4-column, flat
- Layout: single-column / nav top-static
- Density: comfortable (4px base grid)
- Visual hierarchy: functional

---

## Color Architecture

| Role | Value | Token |
|---|---|---|
| Brand Primary | #4e6ef2 | `#4e6ef2` |
| Brand Secondary | #4395ff | `#4395ff` |
| Brand Accent | #e84026 | `#e84026` |
| Background Page | #ffffff | `#ffffff` |
| Background Surface | #f5f6fa | `#f5f6fa` |
| Background Overlay | rgba(0,0,0,0.1) | rgba(0,0,0,0.1) |
| Text Primary | #222222 | `#222222` |
| Text Secondary | #9195a3 | `#9195a3` |
| Text Inverse | #ffffff | `#ffffff` |
| Border | #4e6ef2 | `#4e6ef2` |
| Status Success | #4395ff | `#4395ff` |
| Status Warning | #e84026 | `#e84026` |
| Status Error | #eb4132 | `#eb4132` |

---

## Typography System

**Families:** body — `Arial, 'PingFang SC', sans-serif` · heading — `Arial, 'PingFang SC', sans-serif` · mono — `ui-monospace, monospace`

| Level | Size | Line Height |
|---|---|---|
| `xs` | 12px | 1.2 |
| `sm` | 13px | 1.8 |
| `base` | 14px | 2.6 |
| `lg` | 16px | 2.3 |
| `xl` | 18px | 1.0 |
| `2xl` | 24px | 1.3 |
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
| Paradigm | content-site |
| Layout | single-column |
| Nav position | top-static |
| Density | comfortable |
| Dominant element | typography |
| Visual hierarchy | functional |

---

## Skeleton

| Component | Details |
|---|---|
| Hero | present · centered · "张凌赫登上法国第一大报纸" · 1 CTA |
| Nav | brand: "百度" · items: 新闻, hao123, 地图, 贴吧, 视频 |
| Cards | 4-column grid · flat |
| Footer | 1 column |

---

## Physical Measurements

### Spacing (computed CSS)
- **Base unit:** 4px
- **Measured steps:** 4px · 8px · 12px · 16px · 20px · 24px · 28px · 32px · 40px · 120px
- **Named scale:** xs=4px sm=8px md=16px lg=24px xl=32px 2xl=48px 3xl=64px

### Typography (computed CSS)
- **Root body size:** 12px / 0.75rem
- **Detected families:** Arial, arial, PingFang SC, cIconfont

| px | rem | Line Height | Weight | Letter Spacing | Role |
|---|---|---|---|---|---|
| 12px | 0.75rem | 1.2 | 400 | 0px | body |
| 13px | 0.8125rem | 1.8 | 400 | 0px | body |
| 14px | 0.875rem | 2.6 | 400 | 0px | body-lg |
| 16px | 1rem | 2.3 | 400 | 0px | body-lg |
| 18px | 1.125rem | 1 | 400 | -1px | h5 |

### Box Shadows (measured from UI components)

| Frequency | CSS Value |
|---|---|
| ×1 | `rgba(0, 0, 0, 0.1) 0px 1px 10px 0px` |

---

## Asset Inventory

### Images (18)
- https://pss.bdstatic.com/static/superman/img/topnav/newfanyi-da0cea8f7e.png
- https://pss.bdstatic.com/static/superman/img/topnav/newxueshuicon-a5314d5c83.png
- https://pss.bdstatic.com/static/superman/img/topnav/newbaike-889054f349.png
- https://pss.bdstatic.com/static/superman/img/topnav/newzhidao-da1cf444b0.png
- https://pss.bdstatic.com/static/superman/img/topnav/newjiankang-f03b804b4b.png
- https://pss.bdstatic.com/static/superman/img/topnav/yingxiaoicon-612169cc36.png
- https://pss.bdstatic.com/static/superman/img/topnav/newzhibo-a6a0831ecd.png
- https://pss.bdstatic.com/static/superman/img/topnav/newyinyue-03ecd1e9b9.png
- https://pss.bdstatic.com/static/superman/img/topnav/chengpian-9981cd1fdb.png
- https://www.baidu.com/img/flexible/logo/pc/index.png
- https://www.baidu.com/img/flexible/logo/pc/index@2.png
- https://www.baidu.com/img/flexible/logo/pc/result.png
- https://www.baidu.com/img/flexible/logo/pc/result@2.png
- https://www.baidu.com/img/flexible/logo/pc/peak-result.png
- https://psstatic.cdn.bcebos.com/aife/static/wenxinlogo_1770695621000.png
- https://psstatic.cdn.bcebos.com/basics/aichat/hot_search_x3_1747880381000.png
- https://pss.bdstatic.com/static/superman/img/qrcode/qrcode@2x-daf987ad02.png
- https://pss.bdstatic.com/static/superman/img/qrcode/qrcode-hover@2x-f9b106a848.png

### External SVGs (2)
- https://psstatic.cdn.bcebos.com/basics/aichat/to-up-newer_1766568454000.svg
- https://psstatic.cdn.bcebos.com/basics/aichat/to-up-active_1764583314000.svg

### Inline SVGs (4 captured)
_Raw <svg> source — icons, logos, illustrations. Embed directly in generated HTML._

<details><summary>SVG #1 (717 chars)</summary>

```html
<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none"><g opacity="0.5" clip-path="url(#clip0_789_21003)"><path d="M9.00033 17.3334C13.6027 17.3334 17.3337 13.6024 17.3337 9.00008C17.3337 4.39772 13.6027 0.666748 9.00033 0.666748C4.39796 0.666748 0.666992 4.39772 0.666992 9.00008C0.666992 13.6024 4.39796 17.3334 9.00033 17.3334ZM12.1384 6.80482L9.94309 9.00008L12.1384 11.1953L11.1955 12.1381L9.00026 9.94288L6.80503 12.1381L5.86219 11.1953L8.05746 9.00008L5.86219 6.80482L6.80503 5.86202L9.00026 8.05728L11.1955 5.86202L12.1384 6.80482Z" fill="#9195A3"></path></g><defs><clipPath id="clip0_789_21003"><rect width="18" height="18" fill="white"></rect></clipPath></defs></svg>
```

</details>
<details><summary>SVG #2 (520 chars)</summary>

```html
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="5.91621" y="1.63398" width="8.16801" height="11.6845" rx="4.084" stroke="currentColor" stroke-width="1.6"></rect><path d="M3.48096 12.5547C4.64674 14.9817 7.12786 16.6572 10.0003 16.6572C12.8728 16.6572 15.3539 14.9817 16.5197 12.5547" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"></path><path d="M10 16.6582V18.6118" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"></path></svg>
```

</details>
<details><summary>SVG #3 (551 chars)</summary>

```html
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4405 5.94065L7.25022 10.1309C6.52703 10.8541 6.52703 12.0266 7.25022 12.7498C7.97342 13.473 9.14595 13.473 9.86914 12.7498L11.3095 11.3094L14.0594 8.55957L14.7141 7.90484C16.1605 6.45845 16.1605 4.1134 14.7141 2.66701C13.2677 1.22062 10.9227 1.22062 9.4763 2.66701L3.97658 8.16673C1.807 10.3363 1.807 13.8539 3.97658 16.0235C6.14616 18.1931 9.66374 18.193 11.8333 16.0235L16.6783 11.1785" stroke="currentColor" stroke-width="1.6"></path></svg>
```

</details>
<details><summary>SVG #4 (656 chars)</summary>

```html
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.85278 4.81463C1.85278 3.58733 2.84771 2.59241 4.07501 2.59241H15.9269C17.1542 2.59241 18.1491 3.58733 18.1491 4.81463V15.185C18.1491 16.4123 17.1542 17.4072 15.9269 17.4072H4.075C2.8477 17.4072 1.85278 16.4123 1.85278 15.185V4.81463Z" stroke="currentColor" stroke-width="1.6"></path><circle cx="13.7136" cy="7.14282" r="2.1" fill="currentColor" stroke="white" stroke-width="0.8"></circle><path d="M1.85278 14.2326L5.08504 9.72923C5.81909 8.70649 7.25533 8.49716 8.25077 9.26783L17.5001 16.4286" stroke="currentColor" stroke-width="1.6"></path></svg>
```

</details>

---

## Design Critique (AI Phase 1)

<details>
<summary>Expand raw critique</summary>

# Layout Analysis: Baidu Homepage

---

## SECTION INVENTORY

| # | Name | Vertical Span | Z-Layer | Background | Dominant Visual |
|---|------|--------------|---------|------------|-----------------|
| 1 | **nav** | 0–5% | floating (fixed/sticky) | solid-color (#fff / near-white) | interactive-controls (links + button) |
| 2 | **hero** | 5–40% | base | solid-color (white) | imagery (logo) + interactive-controls (search bar) |
| 3 | **ai-promo-banner** | 40–48% | base | solid-color (white) | typography + interactive-controls |
| 4 | **hot-search / trending** | 48–78% | base | solid-color (white) | typography (news list) |
| 5 | **footer** | 92–100% | base | solid-color (white) | typography (legal/links) |
| 6 | **floating-side-tools** | ~85–95% right edge | floating | transparent | interactive-controls (icon buttons) |

---

## SPATIAL GRID ANALYSIS

### Nav Bar (Section 1)
- **Layout engine**: Flexbox (row)
- **Column count**: Two groups — left link cluster (~9 items) + right auth cluster (2 items)
- **Gap size**: ~16px (md) between nav links, visual estimate consistent with 16px spacing scale
- **Item pattern**: fluid (links spread across full width)
- **Z-layer**: floating; z-index elevated (sticky/fixed position, sits above page content)

### Search Bar / Hero Controls (Section 2)
- **Layout engine**: Flexbox (row, internal to input container)
- **Column count**: Single row: [text input area] | [mic icon] | [clip icon] | [camera icon] | [search button]
- **Gap size**: ~8px (sm) between inline action icons
- **Item pattern**: fluid input field + fixed-width icon buttons + fixed-width CTA button
- **Box shadow on search container**: `rgba(0,0,0,0.1) 0px 1px 10px 0px` (matches Physical Data shadow.md)
- **Search button border-radius**: fully rounded pill (~24px)

### Hot Search List (Section 4)
- **Layout engine**: CSS Grid or two-column Flexbox
- **Column count**: 2 columns (items 1–5 left, items 5–9 right, with rank labels)
- **Gap size**: ~24px (lg) vertical row gap, ~40px horizontal column gap
- **Item pattern**: fluid width rows within each column
- **Masonry note**: None — uniform row heights

### Footer (Section 5)
- **Layout engine**: Flexbox (row, centered)
- **Column count**: Single-row, multi-item link strip
- **Gap size**: ~16px (md) between footer links
- **Item pattern**: fluid / inline links

### Floating Side Tools (Section 6)
- **Layout engine**: Absolute / fixed stack
- **Position type**: `position: fixed`, right edge
- **Z-index tier**: overlay-level (floats above all base content)
- **Items**: 2 icon buttons stacked vertically (circular icon ~40px diameter each)

---

## ASSET AUDIT

| Asset | Details |
|-------|---------|
| **Hero bg** | none detected — solid white background (#ffffff) |
| **Logo/brand** | Baidu wordmark image (combined SVG/PNG sprite): `Bai` text + paw-print petal icon + `du` text + `百度` Chinese characters. Rendered as `<img>` or inline SVG, centered in hero. No external URL confirmed in Physical Data. |
| **Search bar icons** | inline-svg set: microphone icon, paperclip/attachment icon, camera/image-search icon — 3 inline SVGs within input row |
| **AI promo icon** | Small 文心 (Wenxin) branded circle icon, inline SVG or img, ~16×16px |
| **Hot-search badge icons** | Inline SVG tags: red "热" (hot) badge and blue "新" (new) badge appended to trending items |
| **Side tool icons** | 2 circular icon buttons (right floating): top = settings/QR-style icon, bottom = grid/QR icon — inline SVG, ~40px |
| **Card images** | No card images — list-only text content |
| **Icon set** | `cIconfont` font family confirmed in Physical Data (custom icon font used for functional icons) |

> **Note**: Physical Data does not provide explicit asset URLs for logo or SVG files. All assets marked as observed from screenshot; no invented URLs used.

---

## COLOR SEMANTICS

| Observed Hex | Semantic Role | Evidence |
|---|---|---|
| `#ffffff` | **Neutral-Base** | Full page background, nav background, search area |
| `#4e6ef2` | **Brand-Primary** | "百度一下" (search) button fill; search input border/focus ring (blue-purple); 文心 icon accent |
| `#eb4132` / `#e53935` | **Brand-Accent / Status-Error-tone** | Baidu logo "Bai" red text portion; top-ranked (#1 highlighted) item rank color; "热" badge background |
| `#222222` / `#333333` | **Text-Main** | Navigation link text, hot-search headlines, section title "百度热搜" |
| `#626675` / `#9195a3` | **Text-Muted** | Secondary nav items, footer legal text, rank numbers (4, 5, 6…) |
| `#ffffff` (on blue) | **Text-Inverse** | "百度一下" button label text; "登录" button text |
| `#4e6ef2` (border) | **Border-Default / Brand-Primary** | Search input box border on focus (1–2px solid blue-purple) |
| `#f5f6fa` / `#f0f0f0` | **Neutral-Surface** | Light gray background hint on AI promo pill/tag, footer separator zone |
| `#e84026` | **Status-Warning / Brand-Accent** | "热" (trending hot) red badge chips on news items |
| `#4395ff` | **Status-Success / Brand-Secondary** | "新" (new) blue badge chip on news items |
| `#4e6ef2` (link) | **Brand-Primary** | "登录" button border+text before hover; nav active/hover states |

> Typography cross-reference: Body text at **12px / 13px** (Arial + PingFang SC), line-height 1.2–1.8 as per Physical Data. Nav links at **13–14px**. "百度热搜" section header approximately **16px bold**. Search placeholder text approximately **16–18px**.

</details>
