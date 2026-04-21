# Design Spec — minimalgoods.co

> **Extracted:** Tue, 21 Apr 2026 13:49:29 GMT
> **URL:** https://www.minimalgoods.co/
> **Paradigm:** content-site · **Density:** spacious · **Motif:** monochromatic black-on-white, editorial typography-forward, display logotype branding, minimal ornamentation, masonry card grid

---

## Visual Weight Verdict

**TYPE DOMINANT**

This content / editorial site is sustained by **editorial typography and text hierarchy**.

### Evidence
- 6 image assets detected (light image density)
- 2 SVG assets detected
- Card grid: 4-column, flat
- Layout: single-column / nav top-static
- Density: spacious (4px base grid)
- Visual hierarchy: editorial

---

## Color Architecture

| Role | Value | Token |
|---|---|---|
| Brand Primary | #000000 | `#000000` |
| Brand Secondary | #1A1A1A | `#1A1A1A` |
| Brand Accent | #444444 | `#444444` |
| Background Page | #FFFFFF | `#FFFFFF` |
| Background Surface | #F2F2F2 | `#F2F2F2` |
| Background Overlay | rgba(0,0,0,0.5) | rgba(0,0,0,0.5) |
| Text Primary | #000000 | `#000000` |
| Text Secondary | #444444 | `#444444` |
| Text Inverse | #FFFFFF | `#FFFFFF` |
| Border | #EBEBEB | `#EBEBEB` |
| Status Success | #10B981 | `#10B981` |
| Status Warning | #F59E0B | `#F59E0B` |
| Status Error | #EF4444 | `#EF4444` |

---

## Typography System

**Families:** body — `Opensaucetwo, sans-serif` · heading — `Opensaucetwo, sans-serif` · mono — `ui-monospace, monospace`

| Level | Size | Line Height |
|---|---|---|
| `xs` | 13px | 1.3 |
| `sm` | 13px | 1.3 |
| `base` | 13px | 1.3 |
| `lg` | 19px | 1.3 |
| `xl` | 19px | 1.3 |
| `2xl` | 38px | 1.2 |
| `3xl` | 38px | 1.2 |
| `4xl` | 77px | 1.1 |

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
| Density | spacious |
| Dominant element | typography |
| Visual hierarchy | editorial |

---

## Skeleton

| Component | Details |
|---|---|
| Hero | not detected |
| Nav | brand: "minimalgoods" · items: Articles, Shop, Members |
| Cards | 4-column grid · flat |
| Footer | not detected |

---

## Physical Measurements

### Spacing (computed CSS)
- **Base unit:** 4px
- **Measured steps:** 8px · 12px · 20px · 28px · 32px · 52px · 64px
- **Named scale:** xs=4px sm=8px md=16px lg=24px xl=32px 2xl=48px 3xl=64px

### Typography (computed CSS)
- **Root body size:** 13px / 0.8125rem
- **Detected families:** Opensaucetwo, Helveticanowtext

| px | rem | Line Height | Weight | Letter Spacing | Role |
|---|---|---|---|---|---|
| 13px | 0.8125rem | 1.3 | 400 | 0px | body |
| 19px | 1.1875rem | 1.3 | 400 | -0.370308px | h5 |
| 38px | 2.375rem | 1.2 | 700 | -1.14923px | h3 |
| 77px | 4.8125rem | 1.1 | 700 | -3.06462px | display |

---

## Asset Inventory

### Images (6)
- https://cdn.prod.website-files.com/65d744ef0adcc24e5aa6dd7c/65d744ef0adcc24e5aa6deb9_IG%20Color%20Icon.png
- https://cdn.prod.website-files.com/65d744ef0adcc24e5aa6dd97/65d744ef0adcc24e5aa6ff55_364305663_301211428984546_2389780660803890532_n.webp
- https://cdn.prod.website-files.com/65d744ef0adcc24e5aa6dd97/65d744ef0adcc24e5aa6ff5d_363293144_1356261278571979_6753679869060311355_n.webp
- https://cdn.prod.website-files.com/65d744ef0adcc24e5aa6dd97/65d744ef0adcc24e5aa6ff51_362643308_2482800335231405_3991074754819637227_n.webp
- https://cdn.prod.website-files.com/65d744ef0adcc24e5aa6dd97/65d744ef0adcc24e5aa6ff51_362643308_2482800335231405_3991074754819637227_n-p-500.webp
- https://cdn.prod.website-files.com/65d744ef0adcc24e5aa6dd97/65d744ef0adcc24e5aa6ff41_359744389_960744145040858_7153386561218828182_n.webp

### External SVGs (2)
- https://cdn.prod.website-files.com/65d744ef0adcc24e5aa6dd7c/65d744ef0adcc24e5aa6deb0_MinimalGoods.svg
- https://cdn.prod.website-files.com/65d744ef0adcc24e5aa6dd7c/65d744ef0adcc24e5aa6deb8_Arrow%201%20(Stroke).svg

### CSS Gradients (1)
_Real background-image gradient values — use as-is in CSS._

| Element | Gradient |
|---|---|
| `inpos-feature_img-cover` | `linear-gradient(rgb(255, 255, 255), rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0) 74%, rgb(255, 255, 255))` |

### Inline SVGs (2 captured)
_Raw <svg> source — icons, logos, illustrations. Embed directly in generated HTML._

<details><summary>SVG #1 (192 chars)</summary>

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40"><path d="m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z"></path></svg>
```

</details>
<details><summary>SVG #2 (192 chars)</summary>

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40"><path d="m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z"></path></svg>
```

</details>

---

## Design Critique (AI Phase 1)

<details>
<summary>Expand raw critique</summary>

## SECTION INVENTORY

| # | Name | Vertical Span | Z-Layer | Background | Dominant Visual |
|---|------|--------------|---------|------------|-----------------|
| 1 | **brand-header** | 0–20% | base | solid-color (#FFFFFF) | typography (display logotype) |
| 2 | **nav** | 20–27% | base | solid-color (#FFFFFF) | interactive-controls (nav links) |
| 3 | **content / article-grid** | 27–100% | base | solid-color (#FFFFFF) | imagery + typography (cards) |

---

## SPATIAL GRID ANALYSIS

### Article Grid (content section)

- **Layout engine:** CSS Grid (or Flexbox with equal-width columns — 3 visible columns)
- **Column count:** 3 columns (derived from visual pattern; Physical Data does not specify `skeleton.cards.gridColumns` explicitly)
- **Column widths:**
  - Col 1 (glasses image + title): ~33% viewport width (~393px)
  - Col 2 (chess set image + title): ~20% viewport width (~258px)
  - Col 3 (e-reader device image): ~40% viewport width (~517px)
- **Gap size:** Cross-referenced against spacing scale → **gap ≈ 8px (sm)** between columns (tight gutter visible between cards)
- **Item pattern:** fluid / variable-width columns — not equal-width; appears to be a CSS Grid with asymmetric `fr` or fixed-track columns
- **Masonry note:** ⚠️ **Masonry-like pattern flagged** — Column 2 is shorter in height and offset vertically relative to columns 1 and 3, suggesting either a masonry layout or staggered grid rows. Columns 1 and 3 extend beyond column 2's bottom edge, indicating **unequal row heights** (waterfall/masonry behavior).
- **Card image treatment:** Images fill the full card width with no visible padding; titles appear below images in the same column

### Navigation Bar

- **Layout engine:** Flexbox (row), `justify-content: space-between`
- **Left group:** Articles | Shop | Members — spaced ~65px apart (visual estimate)
- **Right group:** Login | Sign-up — spaced ~64px apart
- **Gap size:** spacing scale lg ≈ 24px between individual nav items
- **Typography:** body scale, 13px, weight 400

### Brand Header / Logotype

- **Layout engine:** block-level, full-width
- **Typography:** display scale — **77px / 4.8125rem**, lh:1.1, w:700, ls:−3.06462px
- **Font family:** Opensaucetwo or Helveticanowtext
- **Padding:** ~40–52px top (spacing scale: 52px `named`), minimal left margin (~42px)

---

## ASSET AUDIT

| Asset | Source | Value |
|-------|--------|-------|
| **Hero bg** | none detected | White `#FFFFFF` solid background — no image asset |
| **Logo / brand** | text-only brand | "minimalgoods" rendered as display typography (not an `<img>` or SVG) |
| **Card image 1** | Physical Data assets.images (implied) | Glasses/eyewear close-up — silver wire-frame glasses on light gray surface |
| **Card image 2** | Physical Data assets.images (implied) | Chess set top-down view — Nymzo Stanton Series 01 |
| **Card image 3** | Physical Data assets.images (implied) | E-reader / small wooden-framed device with plant leaf (partial crop, right side of viewport) |
| **Icon set** | no asset found | No icons, SVGs, or icon fonts detected in the visible viewport |

> **Note:** Physical Data provided no explicit `assets.images` URL array. All card image references are inferred visually. Per HIERARCHY OF TRUTH, no URLs are fabricated — marked as "implied" from screenshot observation only.

---

## COLOR SEMANTICS

| Observed Hex | Semantic Role | Evidence |
|-------------|---------------|----------|
| `#000000` | **Text-Main** | Logotype "minimalgoods", nav links (Articles, Shop, Members, Login, Sign-up), article card titles below images |
| `#FFFFFF` | **Neutral-Base** | Full page background, navigation area background, spacing between elements |
| `#F2F2F2` / `#EBEBEB` | **Neutral-Surface** | Subtle off-white/light gray tones in card image backgrounds (glasses photo background, chess set background) — slight tonal differentiation from pure white page BG |
| `#444444` *(est.)* | **Text-Muted** | Appears as secondary/body text at small scale — not clearly visible at this viewport crop but implied by typography scale (13px body, w:400) |
| `#1A1A1A` *(est.)* | **Brand-Primary** | The logotype itself reads as near-pure black but with possible ink rendering at display size; functionally identical to Text-Main |

> **Discrepancy note:** Physical Data reports no explicit color values. All hex observations are derived from screenshot analysis. No override conflicts detected since Physical Data contains no `colors` block to contradict visual estimates. The palette is intentionally monochromatic (black-on-white), consistent with the "minimalgoods" brand identity.

</details>
