# Design Spec — pinterest.com

> **Extracted:** Mon, 20 Apr 2026 15:17:05 GMT
> **URL:** https://www.pinterest.com/
> **Paradigm:** landing · **Density:** comfortable · **Motif:** bold-red-brand, warm-orange-accent, staggered-card-imagery, pill-buttons, carousel-pagination-dots

---

## Visual Weight Verdict

**IMAGE DOMINANT**

This marketing landing page is sustained by **large-format photography and imagery**.

### Evidence
- 50 image assets detected (heavy image density)
- Hero section: split layout — "Pinterest"
- Card grid: 1-column, elevated (has shadow)
- Layout: multi-column / nav top-static
- Density: comfortable (4px base grid)
- Visual hierarchy: expressive

---

## Color Architecture

| Role | Value | Token |
|---|---|---|
| Brand Primary | #e60023 | `#e60023` |
| Brand Secondary | #111111 | `#111111` |
| Brand Accent | #e85d24 | `#e85d24` |
| Background Page | #ffffff | `#ffffff` |
| Background Surface | #f5f5f5 | `#f5f5f5` |
| Background Overlay | rgba(0,0,0,0.5) | rgba(0,0,0,0.5) |
| Text Primary | #111111 | `#111111` |
| Text Secondary | #767676 | `#767676` |
| Text Inverse | #ffffff | `#ffffff` |
| Border | #efefef | `#efefef` |
| Status Success | #10B981 | `#10B981` |
| Status Warning | #F59E0B | `#F59E0B` |
| Status Error | #EF4444 | `#EF4444` |

---

## Typography System

**Families:** body — `'Pin Sans', sans-serif` · heading — `'Pin Sans', sans-serif` · mono — `ui-monospace, monospace`

| Level | Size | Line Height |
|---|---|---|
| `xs` | 12px | 1.2 |
| `sm` | 12px | 1.2 |
| `base` | 16px | 1.3 |
| `lg` | 16px | 1.3 |
| `xl` | 16px | 1.3 |
| `2xl` | 36px | 1.2 |
| `3xl` | 36px | 1.2 |
| `4xl` | 60px | 1.2 |

---

## Spacing

- **Base unit:** 4px
- **Scale:** xs=4px · sm=8px · md=16px · lg=24px · xl=32px · 2xl=48px · 3xl=64px

---

## Site Architecture

| Property | Value |
|---|---|
| Paradigm | landing |
| Layout | multi-column |
| Nav position | top-static |
| Density | comfortable |
| Dominant element | typography |
| Visual hierarchy | expressive |

---

## Skeleton

| Component | Details |
|---|---|
| Hero | present · split · "Pinterest" · 5 CTAs |
| Nav | brand: "探索" · items: 关于; 打开新的标签页, 企业; 打开新的标签页, 创建; 打开新的标签页, 新闻; 打开新的标签页, 登录, 注册 |
| Cards | 1-column grid · elevated |
| Footer | not detected |

---

## Physical Measurements

### Spacing (computed CSS)
- **Base unit:** 4px
- **Measured steps:** 4px · 8px · 16px · 24px · 32px
- **Named scale:** xs=4px sm=8px md=16px lg=24px xl=32px 2xl=48px 3xl=64px

### Typography (computed CSS)
- **Root body size:** 12px / 1rem
- **Detected families:** Pin Sans

| px | rem | Line Height | Weight | Letter Spacing | Role |
|---|---|---|---|---|---|
| 12px | 1rem | 1.2 | 400 | 0px | body |
| 16px | 1.3333rem | 1.3 | 500 | 0px | body-lg |
| 36px | 3rem | 1.2 | 700 | -0.5px | h3 |
| 60px | 5rem | 1.2 | 600 | 0px | h1 |

---

## Asset Inventory

### Images (50)
- https://i.pinimg.com/236x/e3/41/4b/e3414b2fcf00375a199ba6964be551af.jpg
- https://i.pinimg.com/236x/78/6e/00/786e00eab219eca59803d118fbe0feb3.jpg
- https://i.pinimg.com/236x/3b/42/b0/3b42b02bf047097582b26401df90cdb3.jpg
- https://i.pinimg.com/236x/de/13/6b/de136b0fa0037d3453a430895d8a5c27.jpg
- https://i.pinimg.com/236x/15/bf/41/15bf41a80a0ffb41cc9d0fd98abed34b.jpg
- https://i.pinimg.com/236x/c4/57/bd/c457bd9496170bfa3845b7cee775df65.jpg
- https://i.pinimg.com/236x/05/65/20/05652045e57af33599557db9f23188c0.jpg
- https://i.pinimg.com/236x/c5/83/53/c58353e15f32f3cbfc7cdcbcf0dc2f34--mango-coulis-m-sorry.jpg
- https://i.pinimg.com/564x/94/43/b9/9443b93bd8773fec91bc1837e8424e8e.jpg
- https://i.pinimg.com/564x/e6/8a/42/e68a42c2e530fbdf6b3ab2f379dcd384.jpg
- https://i.pinimg.com/236x/95/f3/73/95f373590dad79bcf3202ce6edad5bcd.jpg
- https://i.pinimg.com/236x/e7/c6/c6/e7c6c65c6e38f43d4b979d3cb1e46bf7.jpg
- https://i.pinimg.com/236x/fb/18/de/fb18deb4959e9a0678e1bf99105ea775.jpg
- https://i.pinimg.com/564x/c5/61/c2/c561c2a77d5b9b03702efc423b18cb9a.jpg
- https://i.pinimg.com/564x/64/cf/21/64cf2184d33446c4cf1cc8c3c585b9f4.jpg
- https://i.pinimg.com/236x/06/e8/14/06e814c8c5c82b9bf794add896616e12.jpg
- https://i.pinimg.com/236x/62/bb/97/62bb9727b2e09751d43c32589c503b39.jpg
- https://i.pinimg.com/564x/a9/f9/09/a9f90926afdfbff79f6d2a017c8e19dd.jpg
- https://i.pinimg.com/564x/96/2c/ce/962cce1d513d665ecca6eb733a90a160.jpg
- https://i.pinimg.com/564x/af/60/9e/af609e357a691876ac58d02e27af316e.jpg
_…and 30 more_

### Inline SVGs (10 captured)
_Raw <svg> source — icons, logos, illustrations. Embed directly in generated HTML._

<details><summary>SVG #1 (5488 chars)</summary>

```html
<svg aria-hidden="true" aria-label="Pinterest logo" fill="none" height="18" role="img" viewBox="0 0 98 18" width="98" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_3863_439699)"><path d="M9.05312 18C14.053 18 18.1062 13.9706 18.1062 9C18.1062 4.02944 14.053 0 9.05312 0C4.05322 0 0 4.02944 0 9C0 13.9706 4.05322 18 9.05312 18Z" fill="white"></path><path d="M5.69373 17.3488C5.58145 16.327 5.66114 15.3484 5.8857 14.4022L6.7912 10.5237C6.6427 10.0524 6.53042 9.51268 6.53042 8.97302C6.53042 7.71376 7.14253 6.81431 8.10236 6.81431C8.76878 6.81431 9.25776 7.27483 9.25776 8.16349C9.25776 8.44414 9.1998 8.76074 9.08752 9.12053L8.69274 10.4121C8.61305 10.6604 8.58046 10.8943 8.58046 11.0993C8.58046 11.9988 9.27225 12.5061 10.1524 12.5061C11.7243 12.5061 12.8471 10.8871 12.8471 8.78593C12.8471 6.44733 11.3078 4.95063 9.0332 4.95063C6.49781 4.95063 4.88966 6.59124 4.88966 8.87587C4.88966 9.79693 5.17218 10.6532 5.72635 11.236C5.54524 11.5383 5.35327 11.5958 5.0599 11.5958C4.15441 11.5958 3.29237 10.3258 3.29237 8.59525C3.29237 5.60545 5.7046 3.22007 9.08752 3.22007C12.6407 3.22007 14.8718 5.681 14.8718 8.71758C14.8718 11.7757 12.6986 14.0712 10.3552 14.0712C9.42799 14.0712 8.61305 13.679 8.0444 12.9702L7.58079 14.8375C7.33088 15.8053 6.9578 16.7156 6.35656 17.5934C7.20411 17.8525 8.0444 18 9.05131 18C14.0532 18 18.1062 13.974 18.1062 9.0054C18.1062 4.03677 14.0569 0 9.05493 0C4.05299 0 0 4.02599 0 8.9946C0 12.7616 2.33256 16.0104 5.69373 17.3488Z" fill="#E60023"></path><mask height="18" id="mask0_3863_439699" maskUnits="userSpaceOnUse" width="77" x="21" y="0" style="mask-type: luminance;"><path d="M98.0001 0H21.2749V18H98.0001V0Z" fill="white"></path></mask><g mask="url(#mask0_3863_439699)"><path d="M21.285 1.85443H27.5806C30.247 1.85443 32.3353 3.75925 32.3353 6.60136C32.3353 9.42331 30.2977 11.3483 27.5806 11.3483H24.5392V16.1557H21.2749V1.85443H21.285ZM26.9521 8.44571C28.2193 8.44571 28.9897 7.841 28.9897 6.60136C28.9897 5.3617 28.2193 4.75701 26.9521 4.75701H24.5494V8.44571H26.9521Z" fill="#E60023"></path><path d="M32.8015 5.90594H35.9647V16.1456H32.8015V5.90594Z" fill="#E60023"></path><path d="M36.6743 5.90591H39.6143V7.24635H39.7157C40.2632 6.26873 41.3681 5.62372 42.899 5.62372C45.2207 5.62372 46.8122 6.98429 46.8122 9.43335V16.1456H43.6493V10.6125C43.6493 9.35273 43.1222 8.58677 41.8547 8.58677C40.547 8.58677 39.8375 9.33257 39.8375 11.0157V16.1456H36.6743V5.90591Z" fill="#E60023"></path><path d="M48.3632 12.8197V8.42555H46.873V5.90595H48.3632V3.3158H51.5263V5.90595H53.7871V8.41547H51.5263V12.0941C51.5263 13.1926 51.8912 13.6159 52.895 13.6159C53.2193 13.6159 53.5235 13.5555 53.7871 13.4748V16.1254C53.3003 16.3068 52.6415 16.4278 51.8912 16.4278C49.4785 16.4278 48.3632 15.0874 48.3632 12.8197Z" fill="#E60023"></path><path d="M92.4935 12.8197V8.42555H91.0032V5.90595H92.4935V3.3158H95.6565V5.90595H97.9173V8.41547H95.6565V12.0941C95.6565 13.1926 96.0213 13.6159 97.0251 13.6159C97.3494 13.6159 97.6536 13.5555 97.9173 13.4748V16.1254C97.4307 16.3068 96.7716 16.4278 96.0213 16.4278C93.6087 16.4278 92.4935 15.0874 92.4935 12.8197Z" fill="#E60023"></path><path d="M53.645 10.9753C53.645 7.56884 56.0072 5.62372 58.9472 5.62372C62.1914 5.62372 64.1885 7.70994 64.1885 10.5924C64.1885 11.0157 64.1681 11.4994 64.0466 11.9529H56.8082C56.9096 13.112 57.8321 13.8376 59.0891 13.8376C60.1739 13.8376 60.8024 13.374 61.1675 12.598L63.8945 13.7167C63.3674 15.3393 61.6541 16.4277 59.1197 16.4277C56.0072 16.4277 53.645 14.5431 53.645 10.9753ZM61.0862 9.88688C60.9848 8.66738 60.1232 8.00222 58.9271 8.00222C57.7409 8.00222 56.8487 8.64725 56.7878 9.88688H61.0862Z" fill="#E60023"></path><path d="M64.584 5.90591H67.524V7.44791H67.6254C67.8888 6.32921 68.6898 5.62372 70.0686 5.62372C70.3323 5.62372 70.5552 5.62372 70.8795 5.70434V8.82864C70.6566 8.76818 70.3929 8.74802 70.0887 8.74802C68.5176 8.74802 67.7469 9.61477 67.7469 11.4591V16.1456H64.584V5.90591Z" fill="#E60023"></path><path d="M70.6868 10.9753C70.6868 7.56884 73.049 5.62372 75.989 5.62372C79.2331 5.62372 81.2303 7.70994 81.2303 10.5924C81.2303 11.0157 81.2099 11.4994 81.0883 11.9529H73.8499C73.9513 13.112 74.8738 13.8376 76.1309 13.8376C77.2156 13.8376 77.8442 13.374 78.2092 12.598L80.9363 13.7167C80.4091 15.3393 78.6958 16.4277 76.1612 16.4277C73.0489 16.4277 70.6868 14.5431 70.6868 10.9753ZM78.128 9.88688C78.0266 8.66738 77.165 8.00222 75.9686 8.00222C74.7826 8.00222 73.8904 8.64725 73.8296 9.88688H78.128Z" fill="#E60023"></path><path d="M81.0376 13.122L84.079 12.7189C84.3628 13.5453 85.0825 14.0593 86.218 14.0593C87.181 14.0593 87.7489 13.7167 87.7489 13.1019C87.7489 12.6383 87.4649 12.4166 86.725 12.3359L84.7885 12.1142C82.4062 11.832 81.5647 10.7536 81.5647 8.94958C81.5647 6.96416 83.501 5.62372 85.9849 5.62372C88.6309 5.62372 90.3643 6.68196 90.8206 8.46583L87.8603 9.07054C87.5764 8.40535 86.8972 7.97198 85.9442 7.97198C85.0117 7.97198 84.535 8.29449 84.535 8.7984C84.535 9.1814 84.7783 9.42327 85.5388 9.52405L87.617 9.78608C89.8169 10.0683 90.7192 11.1064 90.7192 12.7895C90.7192 15.0773 88.8437 16.4177 86.1368 16.4177C83.3794 16.4277 81.4633 15.1881 81.0376 13.122Z" fill="#E60023"></path><path d="M36.2383 3.31579C36.2383 2.29786 35.407 1.47144 34.383 1.47144C33.3591 1.47144 32.5278 2.29786 32.5278 3.31579C32.5278 4.33371 33.3591 5.16013 34.383 5.16013C35.407 5.15005 36.2383 4.32363 36.2383 3.31579Z" fill="#E60023"></path></g></g><defs><clipPath id="clip0_3863_439699"><rect fill="white" height="18" width="98"></rect></clipPath></defs></svg>
```

</details>
<details><summary>SVG #2 (182 chars)</summary>

```html
<svg aria-label="向下滚动" class="aTSQd5 hL9n03 SDw0sc" height="20" role="img" viewBox="0 0 24 24" width="20"><path d="M23.7 8.7 12 20.42.3 8.71l1.4-1.42L12 17.6 22.3 7.3z"></path></svg>
```

</details>
<details><summary>SVG #3 (197 chars)</summary>

```html
<svg aria-hidden="true" aria-label="" class="aTSQd5 hL9n03 F1qJlU" height="12" role="img" viewBox="0 0 24 24" width="12"><path d="M23.7 8.7 12 20.42.3 8.71l1.4-1.42L12 17.6 22.3 7.3z"></path></svg>
```

</details>
<details><summary>SVG #4 (198 chars)</summary>

```html
<svg aria-hidden="true" aria-label="" class="aTSQd5 hL9n03 eyJbon" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="m12 3.59 11.7 11.7-1.4 1.42L12 6.4 1.7 16.71.3 15.29z"></path></svg>
```

</details>
<details><summary>SVG #5 (222 chars)</summary>

```html
<svg aria-label="search" class="aTSQd5 hL9n03 F1qJlU" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M17.33 18.74a10 10 0 1 1 1.41-1.41l4.47 4.47-1.41 1.41zM11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16"></path></svg>
```

</details>
<details><summary>SVG #6 (197 chars)</summary>

```html
<svg aria-hidden="true" aria-label="" class="aTSQd5 hL9n03 eyJbon" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M23.7 8.7 12 20.42.3 8.71l1.4-1.42L12 17.6 22.3 7.3z"></path></svg>
```

</details>
<details><summary>SVG #7 (198 chars)</summary>

```html
<svg aria-hidden="true" aria-label="" class="aTSQd5 hL9n03 eyJbon" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="m12 3.59 11.7 11.7-1.4 1.42L12 6.4 1.7 16.71.3 15.29z"></path></svg>
```

</details>
<details><summary>SVG #8 (197 chars)</summary>

```html
<svg aria-hidden="true" aria-label="" class="aTSQd5 hL9n03 eyJbon" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M23.7 8.7 12 20.42.3 8.71l1.4-1.42L12 17.6 22.3 7.3z"></path></svg>
```

</details>
<details><summary>SVG #9 (198 chars)</summary>

```html
<svg aria-hidden="true" aria-label="" class="aTSQd5 hL9n03 eyJbon" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="m12 3.59 11.7 11.7-1.4 1.42L12 6.4 1.7 16.71.3 15.29z"></path></svg>
```

</details>
<details><summary>SVG #10 (197 chars)</summary>

```html
<svg aria-hidden="true" aria-label="" class="aTSQd5 hL9n03 eyJbon" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M23.7 8.7 12 20.42.3 8.71l1.4-1.42L12 17.6 22.3 7.3z"></path></svg>
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
| 2 | **hero** | 8–78% | base | solid-color `#ffffff` | typography + imagery |
| 3 | **content** (teaser) | 78–100% | base | solid-color `#f5f5f5` (light gray) | typography |

---

## SPATIAL GRID ANALYSIS

### Nav (floating)
- **Layout engine:** Flexbox, horizontal, space-between
- **Column count:** 2 groups — left cluster (logo + 3 links) and right cluster (4 links + 2 buttons)
- **Gap size:** ~32px between nav link items (≈ `spacing.xl = 32px` per Physical Data)
- **Item pattern:** fixed-width for buttons, fluid for links
- **Z-index tier:** floating layer, `position: fixed` or `sticky`, z ≈ top layer (above hero content)
- **Button styles:** "Log in" = filled red pill (`#e60023`), "Sign up" = light gray pill (`#efefef`)

### Hero (base)
- **Layout engine:** Flexbox, two-column (left: text/CTA, right: imagery)
- **Column count:** 2 — approx 50% / 50% split
- **Gap size:** ≈ 32px–64px between left and right columns
- **Item pattern:** fluid left column, image cluster fixed/absolute on right
- **Right image cluster:** Two overlapping card images (masonry-like staggered offset, rotated), plus a floating circular icon badge (orange, top-right of cluster) and a floating pause button (bottom-right)
- **Pagination dots:** 5 dots row below heading, indicating slide/carousel — dot 1 active (filled orange), dots 2–5 inactive (hollow/light)

### Content Teaser (base)
- **Layout engine:** single-column centered
- **Item pattern:** text-only, centered heading visible ("It's festival season")
- **Background:** distinct off-white / light gray `#f5f5f5`

---

## ASSET AUDIT

| Asset | Source | Value |
|-------|--------|-------|
| **Hero background** | Physical Data | none detected (solid white `#ffffff`) |
| **Logo/brand** | inline SVG + text | Pinterest SVG logo mark (red circle with "P") + wordmark "Pinterest" in dark near-black; SVG index: 1 |
| **Hero card image 1** | Physical Data assets.images | Cozy living room scene — leather/tan sofa, round coffee table, white rug, indoor plant (large card, slightly rotated left) |
| **Hero card image 2** | Physical Data assets.images | Warm armchair/cushion close-up — plaid throw pillow, golden ambient light (smaller card, overlapping card 1, rotated right) |
| **Floating badge icon** | inline SVG | Circular orange button with a link/pin icon (white icon on `#e85d24` background), positioned top-right of image cluster |
| **Pause button** | inline SVG | Small circular gray button with pause `‖` symbol, bottom-right of hero |
| **Icon set** | inline SVG | Minimal — 2–3 inline SVGs detected (logo mark, badge icon, pause icon) |

> **Note:** No explicit image URLs were provided in Physical Data assets. All image descriptions are inferred visually. Marked as "no URL asset found" in Physical Data for hero card images.

---

## COLOR SEMANTICS

| Observed Hex | Semantic Role | Evidence |
|-------------|---------------|----------|
| `#e60023` | **Brand-Primary** | "Log in" button fill, Pinterest logo circle, "cozy home decor" heading text |
| `#e85d24` (orange-red) | **Brand-Accent** | Floating badge/icon circle on hero image, carousel active dot, "Join Pinterest for free" button fill |
| `#111111` (near-black) | **Text-Main** | "Find ideas for" heading text, nav link text ("Explore", "Shop", "About", etc.) |
| `#ffffff` | **Neutral-Base** | Nav background, hero section background, text inside filled buttons |
| `#f5f5f5` (light gray) | **Neutral-Surface** | "Sign up" button background, bottom content teaser section background |
| `#767676` (medium gray) | **Text-Muted** | "I already have an account" link text |
| `#efefef` (very light gray) | **Border-Default / Neutral-Overlay** | Inactive pagination dots, "Sign up" button fill |
| `#333333` | **Text-Main** (secondary) | Nav wordmark "Pinterest" text, body-level nav items |

### Discrepancies noted (Visual vs. Physical Data)
- Physical Data defines body base at **12px** — visually the nav links appear closer to 16px rendered; Physical Data `body-lg = 16px w:500` likely applies to nav links.
- Physical Data h1 = **60px / w:600** — the "Find ideas for" heading appears visually ~48–52px; deferred to Physical Data: **60px**.
- Physical Data h3 = **36px / w:700 / ls:−0.5px** — "cozy home decor" sub-heading aligns with this step.
- No explicit spacing values for hero columns were provided; gap estimated at `spacing.xl = 32px` or `spacing.3xl = 64px` based on visual separation.

</details>
