# Design Spec — bentogrids.com

> **Extracted:** Tue, 21 Apr 2026 12:52:34 GMT
> **URL:** https://bentogrids.com/
> **Paradigm:** content-site · **Density:** comfortable · **Motif:** dark-nav contrast, sky-blue active pill, light gray grid surface, thumbnail bento cards, badge-counted media tiles

---

## Visual Weight Verdict

**IMAGE DOMINANT**

This content / editorial site is sustained by **large-format photography and imagery**.

### Evidence
- 50 image assets detected (heavy image density)
- Card grid: 4-column, flat
- Layout: single-column / nav top-fixed
- Density: comfortable (4px base grid)
- Visual hierarchy: editorial

---

## Color Architecture

| Role | Value | Token |
|---|---|---|
| Brand Primary | #38bdf8 | `#38bdf8` |
| Brand Secondary | #1e293b | `#1e293b` |
| Brand Accent | #22c55e | `#22c55e` |
| Background Page | #f3f4f6 | `#f3f4f6` |
| Background Surface | #ffffff | `#ffffff` |
| Background Overlay | rgba(0,0,0,0.5) | rgba(0,0,0,0.5) |
| Text Primary | #111827 | `#111827` |
| Text Secondary | #6b7280 | `#6b7280` |
| Text Inverse | #ffffff | `#ffffff` |
| Border | #e5e7eb | `#e5e7eb` |
| Status Success | #22c55e | `#22c55e` |
| Status Warning | #f59e0b | `#f59e0b` |
| Status Error | #EF4444 | `#EF4444` |

---

## Typography System

**Families:** body — `PingFang SC, __Inter_e8ce0c, sans-serif` · heading — `PingFang SC, __Inter_e8ce0c, sans-serif` · mono — `ui-monospace, monospace`

| Level | Size | Line Height |
|---|---|---|
| `xs` | 12px | 1 |
| `sm` | 14px | 1 |
| `base` | 16px | 1.5 |
| `lg` | 18px | 1.6 |
| `xl` | 20px | 1.4 |
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
| Nav position | top-fixed |
| Density | comfortable |
| Dominant element | imagery |
| Visual hierarchy | editorial |

---

## Skeleton

| Component | Details |
|---|---|
| Hero | not detected |
| Nav | brand: "bentogrids" · items: Discover, Graphic Design, Web Design, Animation |
| Cards | 4-column grid · flat |
| Footer | not detected |

---

## Physical Measurements

### Spacing (computed CSS)
- **Base unit:** 4px
- **Measured steps:** 4px · 8px · 12px · 16px · 20px · 32px
- **Named scale:** xs=4px sm=8px md=16px lg=24px xl=32px 2xl=48px 3xl=64px

### Typography (computed CSS)
- **Root body size:** 16px / 1rem
- **Detected families:** PingFang SC, __Inter_e8ce0c

| px | rem | Line Height | Weight | Letter Spacing | Role |
|---|---|---|---|---|---|
| 12px | 0.75rem | 1 | 600 | 0.3px | label |
| 14px | 0.875rem | 1 | 400 | 0px | body-sm |
| 16px | 1rem | 1.5 | 400 | 0px | body |

---

## Asset Inventory

### Images (50)
- https://bentogrids.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fenvelope-dark.4da253c3.png&w=640&q=95
- https://bentogrids.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbeams.68312648.png&w=1920&q=75
- https://bentogrids.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fvolti.a67f2c2e.png&w=750&q=85
- https://bentogrids.com/cdn-cgi/image/width=2048,metadata=none,fit=scale-down,format=auto/https://s.bentogrids.com/cmf19ear50000lau6ohb2z7xv.png
- https://bentogrids.com/cdn-cgi/image/width=256
- https://bentogrids.com/cdn-cgi/image/width=320
- https://bentogrids.com/cdn-cgi/image/width=384
- https://bentogrids.com/cdn-cgi/image/width=400
- https://bentogrids.com/cdn-cgi/image/width=450
- https://bentogrids.com/cdn-cgi/image/width=640
- https://bentogrids.com/cdn-cgi/image/width=700
- https://bentogrids.com/cdn-cgi/image/width=750
- https://bentogrids.com/cdn-cgi/image/width=800
- https://bentogrids.com/cdn-cgi/image/width=828
- https://bentogrids.com/cdn-cgi/image/width=960
- https://bentogrids.com/cdn-cgi/image/width=1024
- https://bentogrids.com/cdn-cgi/image/width=1080
- https://bentogrids.com/cdn-cgi/image/width=1200
- https://bentogrids.com/cdn-cgi/image/width=1504
- https://bentogrids.com/cdn-cgi/image/width=1920
_…and 30 more_

### CSS Gradients (3)
_Real background-image gradient values — use as-is in CSS._

| Element | Gradient |
|---|---|
| `bg-gradient-to-b from-gray-800 to-gray-950` | `linear-gradient(rgb(31, 41, 55), rgb(3, 7, 18))` |
| `hover:bg-gradient group relative hidden h-9 items-center gap` | `linear-gradient(rgb(12, 74, 110), rgba(12, 74, 110, 0.45))` |
| `round-b-lg absolute inset-x-0 bottom-0 flex items-end bg-gra` | `linear-gradient(rgba(17, 24, 39, 0.05), rgba(17, 24, 39, 0.6))` |

### Inline SVGs (10 captured)
_Raw <svg> source — icons, logos, illustrations. Embed directly in generated HTML._

<details><summary>SVG #1 (2217 chars)</summary>

```html
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" fill="none" class="flex-shrink-0 [@media(min-width:562px)]:hidden" aria-label="Bento grids"><g clip-path="url(#logo-icon_svg__a)"><mask id="logo-icon_svg__b" width="24" height="25" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type: luminance;"><path fill="#fff" d="M20 .45H4a4 4 0 0 0-4 4v16a4 4 0 0 0 4 4h16a4 4 0 0 0 4-4v-16a4 4 0 0 0-4-4"></path></mask><g mask="url(#logo-icon_svg__b)"><mask id="logo-icon_svg__c" width="30" height="29" x="-3" y="-2" maskUnits="userSpaceOnUse" style="mask-type: luminance;"><path fill="#fff" d="M20.244-1.612H3.756a5.82 5.82 0 0 0-5.818 5.819v16.487a5.82 5.82 0 0 0 5.818 5.819h16.488a5.82 5.82 0 0 0 5.819-5.82V4.208a5.82 5.82 0 0 0-5.82-5.82"></path></mask><g mask="url(#logo-icon_svg__c)"><path fill="url(#logo-icon_svg__d)" d="M35.938-16.612h-20a3 3 0 0 0-3 3v20a3 3 0 0 0 3 3h20a3 3 0 0 0 3-3v-20a3 3 0 0 0-3-3"></path><path fill="url(#logo-icon_svg__e)" d="M-5.062-1.612h15v28h-15z"></path><path fill="url(#logo-icon_svg__f)" d="M35.938 12.388h-20a3 3 0 0 0-3 3v20a3 3 0 0 0 3 3h20a3 3 0 0 0 3-3v-20a3 3 0 0 0-3-3"></path><path fill="url(#logo-icon_svg__g)" d="M35.938 12.388h-20a3 3 0 0 0-3 3v20a3 3 0 0 0 3 3h20a3 3 0 0 0 3-3v-20a3 3 0 0 0-3-3"></path></g></g></g><defs><linearGradient id="logo-icon_svg__d" x1="29" x2="15.5" y1="-3.883" y2="7.117" gradientUnits="userSpaceOnUse"><stop stop-color="#5F29FF"></stop><stop offset="1" stop-color="#B399FF"></stop></linearGradient><linearGradient id="logo-icon_svg__e" x1="-16.5" x2="7.5" y1="11.268" y2="11.268" gradientUnits="userSpaceOnUse"><stop stop-color="#E6B000"></stop><stop offset="1" stop-color="#FFDB66"></stop></linearGradient><linearGradient id="logo-icon_svg__f" x1="25.938" x2="10.188" y1="20.16" y2="31.233" gradientUnits="userSpaceOnUse"><stop stop-color="#855CFF"></stop><stop offset="1" stop-color="#AB8FFF"></stop></linearGradient><linearGradient id="logo-icon_svg__g" x1="14.5" x2="25" y1="14.117" y2="24.617" gradientUnits="userSpaceOnUse"><stop stop-color="#42E6FF"></stop><stop offset="1" stop-color="#00BEDB"></stop></linearGradient><clipPath id="logo-icon_svg__a"><path fill="#fff" d="M0 0h24v25H0z"></path></clipPath></defs></svg>
```

</details>
<details><summary>SVG #2 (1052 chars)</summary>

```html
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" class="shrink-0 -translate-y-px text-primary-400 group-hover:text-white/80" aria-hidden="true"><path fill="currentColor" d="M20.479 20.036v-8.209H3.52v8.209c0 .887.72 1.607 1.607 1.607h13.744c.887 0 1.607-.72 1.607-1.607M21.643 8.45v1.77c0 .888-.72 1.607-1.607 1.607H3.964c-.887 0-1.607-.72-1.607-1.607V8.45c0-.887.72-1.606 1.607-1.606h16.072c.887 0 1.607.72 1.607 1.607" opacity="0.12"></path><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.479 11.827v6.813a3 3 0 0 1-3 3H6.52a3 3 0 0 1-3-3v-6.813zM12 21.643V12M21.643 8.45v1.77c0 .888-.72 1.607-1.607 1.607H3.964c-.887 0-1.607-.72-1.607-1.607V8.45c0-.887.72-1.606 1.607-1.606h16.072c.887 0 1.607.72 1.607 1.607"></path><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.844c0-1.346-1.57-4.487-3.926-4.487-3.832 0-2.436 4.487-.602 4.487M12 6.844c0-1.346 1.57-4.487 3.926-4.487 3.832 0 2.436 4.487.602 4.487"></path></svg>
```

</details>
<details><summary>SVG #3 (531 chars)</summary>

```html
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="h-6 w-6 fill-current" aria-hidden="true"><path fill="currentColor" d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12" opacity="0.25"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m19.778 4.222-1.414 1.414M5.636 18.364l-1.414 1.414M5.636 5.636 4.222 4.222M12 3V.955M21 12h2.045M3 12.003H.952M11.997 21v2.048m7.781-3.27-1.414-1.414m-2.121-2.121a6 6 0 1 1-8.486-8.486 6 6 0 0 1 8.486 8.486"></path></svg>
```

</details>
<details><summary>SVG #4 (1106 chars)</summary>

```html
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="h-6 w-6 fill-current" aria-hidden="true"><path fill="currentColor" d="M13.685 3.754c-2.47 1.647-2.068 4.001-1.915 4.792-4.612-.271-7.626-2.879-8.788-4.09-.26-.27-.73-.209-.838.148-1.167 3.846 2.806 7.35 2.806 7.35-.702 0-2.105-.236-2.908-.383-.311-.057-.6.181-.532.488.523 2.344 3.889 4.923 6.088 4.864-1.392 1.31-3.16 1.795-4.525 1.96-.526.063-.743.844-.26 1.058 8.316 3.67 18.435-2.611 17.92-12.5l1.675-2.366a.497.497 0 0 0-.434-.783l-2.461.116c-.98-1.15-3.588-2.148-5.829-.654" opacity="0.25"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.685 3.754c-2.47 1.647-2.068 4.001-1.915 4.792-4.612-.271-7.626-2.879-8.788-4.09-.26-.27-.73-.209-.838.148-1.167 3.846 2.806 7.35 2.806 7.35-.702 0-2.105-.236-2.908-.383-.311-.057-.6.181-.532.488.523 2.344 3.889 4.923 6.088 4.864-1.392 1.31-3.16 1.795-4.525 1.96-.526.063-.743.844-.26 1.058 8.316 3.67 18.435-2.611 17.92-12.5l1.675-2.366a.497.497 0 0 0-.434-.783l-2.461.116c-.98-1.15-3.588-2.148-5.829-.654"></path></svg>
```

</details>
<details><summary>SVG #5 (475 chars)</summary>

```html
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="h-6 w-6 fill-current" aria-hidden="true"><path fill="currentColor" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10" opacity="0.2"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3m.08 4h.01M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10"></path></svg>
```

</details>
<details><summary>SVG #6 (358 chars)</summary>

```html
<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" class="z-20 mr-[6px] h-3 w-3 opacity-80" aria-hidden="true"><circle cx="6" cy="6" r="6" fill="currentColor" opacity="0.2"></circle><circle cx="6" cy="6" r="5.25" fill="none" stroke="currentColor" stroke-width="1.5"></circle><path fill="currentColor" d="M6 12a6 6 0 1 0-.019-12v12z"></path></svg>
```

</details>
<details><summary>SVG #7 (198 chars)</summary>

```html
<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" class="z-20 mr-[6px] h-3 w-3 opacity-80" aria-hidden="true"><circle cx="6" cy="6" r="6" fill="currentColor"></circle></svg>
```

</details>
<details><summary>SVG #8 (293 chars)</summary>

```html
<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" class="z-20 mr-[6px] h-3 w-3 opacity-80" aria-hidden="true"><circle cx="6" cy="6" r="6" fill="currentColor" opacity="0.2"></circle><circle cx="6" cy="6" r="5.25" fill="none" stroke="currentColor" stroke-width="1.5"></circle></svg>
```

</details>
<details><summary>SVG #9 (758 chars)</summary>

```html
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" class="z-10" aria-hidden="true"><path fill="currentColor" d="M7.8 21h6.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C19 18.72 19 17.88 19 16.2V14l-9-9H7.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C3 7.28 3 8.12 3 9.8v6.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C5.28 21 6.12 21 7.8 21" opacity="0.2"></path><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 9V3m0 0h-6m6 0-8 8m-3-6H7.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C3 7.28 3 8.12 3 9.8v6.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C5.28 21 6.12 21 7.8 21h6.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C19 18.72 19 17.88 19 16.2V14"></path></svg>
```

</details>
<details><summary>SVG #10 (758 chars)</summary>

```html
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" class="z-10" aria-hidden="true"><path fill="currentColor" d="M7.8 21h6.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C19 18.72 19 17.88 19 16.2V14l-9-9H7.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C3 7.28 3 8.12 3 9.8v6.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C5.28 21 6.12 21 7.8 21" opacity="0.2"></path><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 9V3m0 0h-6m6 0-8 8m-3-6H7.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C3 7.28 3 8.12 3 9.8v6.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C5.28 21 6.12 21 7.8 21h6.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C19 18.72 19 17.88 19 16.2V14"></path></svg>
```

</details>

---

## Design Critique (AI Phase 1)

<details>
<summary>Expand raw critique</summary>

## SECTION INVENTORY

| # | Name | Vertical Span | Z-Layer | Background | Dominant Visual |
|---|------|--------------|---------|------------|-----------------|
| 1 | **nav** (top bar) | 0–7% | floating (fixed/sticky) | solid-color `#0f1923` (very dark navy/near-black) | interactive-controls + typography |
| 2 | **filter-bar** (category + theme toggles) | 7–14% | base | solid-color `#ffffff` (white) | interactive-controls (pill buttons) |
| 3 | **content** (card grid / gallery) | 14–100% | base | solid-color `#f3f4f6` (light gray) | imagery (thumbnail cards) |

---

## SPATIAL GRID ANALYSIS

### Nav Bar (floating)
- **Layout engine:** Flexbox (row, space-between)
- **Left group:** Logo (icon + wordmark) + CTA button ("Get Bento Templates FREE")
- **Right group:** Icon buttons (sun/theme, Twitter, help)
- **Height:** ~56px
- **Z-index tier:** floating/sticky, z ≈ top-layer (above filter bar and grid)
- **Position type:** sticky/fixed top

### Filter Bar
- **Layout engine:** Flexbox (row)
- **Left cluster:** Pill tabs — "Discover" (active, filled `#38bdf8` background), "Graphic Design", "Web Design", "Animation"
- **Right cluster:** Toggle group — "All" (active), "Dark", "Light" with circular icon indicators
- **Gap between left and right:** space-between, full-width justified
- **Height:** ~56px
- **Item pattern:** fixed-width pill buttons

### Card Grid (main content)
- **Layout engine:** CSS Grid
- **Column count:** 4 columns (observed: 4 cards per row, confirmed visually across 3 full rows + partial 4th)
- **Gap size:** ~16px (spacing.md) horizontal and vertical
- **Item pattern:** fluid (cards stretch to fill column width)
- **Aspect ratio:** approximately 4:3 or 3:2 per card thumbnail
- **Masonry note:** No masonry — uniform row heights, standard grid
- **Card anatomy:** Thumbnail image fills card face; numeric badge (count indicator) in top-right corner; some cards have a play-button overlay (video indicator)
- **Rows visible:** ~3 complete rows + partial 4th row at viewport bottom

### Floating/Fixed Elements
- **Nav:** z = top tier, position = fixed/sticky top
- **No modals, drawers, or overlays detected**

---

## ASSET AUDIT

| Asset Role | Value / Notes |
|-----------|---------------|
| **Hero bg** | none detected — content grid uses `#f3f4f6` surface only |
| **Logo/brand** | Inline SVG or img — "bentogrids" wordmark with colorful 4-square grid icon (red, yellow, blue, green squares). No URL available in Physical Data. **Text-only brand fallback:** "bentogrids" |
| **Card images** | Thumbnails rendered as `<img>` elements within cards — Physical Data provides no explicit asset URLs. Visually: bento grid design samples, dark/light theme screenshots, promotional design layouts |
| **Card image 1** | Row 1, Col 1: White/light UI — multi-panel bento layout (text + diagram cards) |
| **Card image 2** | Row 1, Col 2: Dark theme — "Epic Web" with rocket + trophy 3D elements |
| **Card image 3** | Row 1, Col 3: Colorful — Russian-language promotional card (red/green/purple) |
| **Card image 4** | Row 1, Col 4: Light UI — feature comparison grid (Google services, "Reduce Log Volume") |
| **Icon set** | Inline SVG icons — sun/moon toggle, Twitter bird, question-mark circle in nav; play-button triangles on video-preview cards; circle/half-circle indicators on theme toggles |

**RULE APPLIED:** No Physical Data asset URLs provided — all asset references above are visual observations only. Marked accordingly. No URLs invented.

---

## COLOR SEMANTICS

| Observed Hex | Semantic Role | Evidence |
|-------------|---------------|----------|
| `#0f1923` | **Neutral-Overlay / Nav-Surface** | Top navigation bar background |
| `#ffffff` | **Neutral-Base** | Filter bar background, card faces (light-theme cards) |
| `#f3f4f6` | **Neutral-Surface** | Page/grid background behind cards |
| `#38bdf8` (sky-blue approx) | **Brand-Primary** | "Discover" active pill tab fill |
| `#1e293b` (dark slate) | **Brand-Secondary** | "Get Bento Templates FREE" button background (dark navy pill) |
| `#22c55e` or `#00c875` (approx) | **Brand-Accent / Status-Success** | "FREE" badge inside CTA button |
| `#111827` | **Text-Main** | Filter tab labels ("Graphic Design", "Web Design", "Animation"), nav icons |
| `#6b7280` | **Text-Muted** | Inactive filter labels, theme toggle labels ("Dark", "Light") |
| `#ffffff` | **Text-Inverse** | Nav wordmark "bentogrids", active pill text ("Discover") |
| `#e5e7eb` | **Border-Default** | Card borders, toggle group container outline |
| `#000000` (near) | **Neutral-Overlay** | Dark-theme card backgrounds (Epic Web, animation cards) |
| `#f59e0b` / `#f97316` | **Brand-Accent** (card content) | Trophy/star 3D elements visible in card thumbnails |

**Discrepancies noted:**
- Physical Data provides no color hex values directly — all hex estimates above are derived from the screenshot visually. Physical Data confirms base unit (4px) and typography scale but does not contradict color observations.
- Physical Data typography shows `PingFang SC, __Inter_e8ce0c` as font families — consistent with the clean sans-serif rendering visible in nav and filter bar labels.
- Physical Data spacing scale (4/8/12/16/20/32px) aligns with the ~16px card gaps and ~8px internal badge padding observed visually.

</details>
