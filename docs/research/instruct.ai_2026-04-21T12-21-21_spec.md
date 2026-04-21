# Design Spec — instruct.ai

> **Extracted:** Tue, 21 Apr 2026 12:21:21 GMT
> **URL:** https://instruct.ai/
> **Paradigm:** saas-app · **Density:** comfortable · **Motif:** soft-topographic-texture, serif-display-type, minimal-white-space, pill-filter-tabs, ai-prompt-input

---

## Visual Weight Verdict

**TYPE DOMINANT**

This SaaS application is sustained by **editorial typography and text hierarchy**.

### Evidence
- 8 image assets detected (moderate image density)
- 5 SVG assets detected
- Hero section: centered layout — "AI that works for you"
- Card grid: 4-column, flat
- Layout: single-column / nav top-fixed
- Density: comfortable (4px base grid)
- Visual hierarchy: editorial

---

## Color Architecture

| Role | Value | Token |
|---|---|---|
| Brand Primary | #111111 | `#111111` |
| Brand Secondary | #3A5FCD | `#3A5FCD` |
| Brand Accent | #22C55E | `#22C55E` |
| Background Page | #FFFFFF | `#FFFFFF` |
| Background Surface | #F5F7F7 | `#F5F7F7` |
| Background Overlay | rgba(0,0,0,0.5) | rgba(0,0,0,0.5) |
| Text Primary | #1A1A1A | `#1A1A1A` |
| Text Secondary | #6B7280 | `#6B7280` |
| Text Inverse | #FFFFFF | `#FFFFFF` |
| Border | #E5E7EB | `#E5E7EB` |
| Status Success | #22C55E | `#22C55E` |
| Status Warning | #F59E0B | `#F59E0B` |
| Status Error | #EF4444 | `#EF4444` |

---

## Typography System

**Families:** body — `satoshi, sans-serif` · heading — `ivypresto-headline, serif` · mono — `sfMono, ui-monospace, monospace`

| Level | Size | Line Height |
|---|---|---|
| `xs` | 12px | 1.3 |
| `sm` | 14px | 1.4 |
| `base` | 16px | 1.5 |
| `lg` | 18px | 1.6 |
| `xl` | 20px | 1.4 |
| `2xl` | 40px | 1.3 |
| `3xl` | 52px | 1.1 |
| `4xl` | 61px | 1.4 |

---

## Spacing

- **Base unit:** 4px
- **Scale:** xs=4px · sm=8px · md=16px · lg=24px · xl=32px · 2xl=48px · 3xl=64px

---

## Site Architecture

| Property | Value |
|---|---|
| Paradigm | saas-app |
| Layout | single-column |
| Nav position | top-fixed |
| Density | comfortable |
| Dominant element | typography |
| Visual hierarchy | editorial |

---

## Skeleton

| Component | Details |
|---|---|
| Hero | present · centered · "AI that works for you" · 5 CTAs |
| Nav | brand: "Blog" · items: Features, Talk to us, Log in, Get started |
| Cards | 4-column grid · flat |
| Footer | 2 columns |

---

## Physical Measurements

### Spacing (computed CSS)
- **Base unit:** 4px
- **Measured steps:** 4px · 8px · 12px · 16px · 24px · 32px · 64px · 96px · 128px
- **Named scale:** xs=4px sm=8px md=16px lg=24px xl=32px 2xl=48px 3xl=64px

### Typography (computed CSS)
- **Root body size:** 16px / 1rem
- **Detected families:** satoshi, ivypresto-headline, sfMono

| px | rem | Line Height | Weight | Letter Spacing | Role |
|---|---|---|---|---|---|
| 12px | 0.75rem | 1.3 | 600 | 3.6px | label |
| 14px | 0.875rem | 1.4 | 500 | 0px | body-sm |
| 16px | 1rem | 1.5 | 400 | 0px | body |
| 18px | 1.125rem | 1.6 | 500 | 0px | body |
| 20px | 1.25rem | 1.4 | 400 | 0px | body-lg |
| 40px | 2.5rem | 1.3 | 400 | 0px | h3 |
| 52px | 3.25rem | 1.1 | 400 | 0px | h2 |
| 61px | 3.8125rem | 1.4 | 400 | -1.22px | h2 |

### Box Shadows (measured from UI components)

| Frequency | CSS Value |
|---|---|
| ×1 | `rgba(0, 0, 0, 0) 0px 0px 0px 0px` |

---

## Asset Inventory

### Images (8)
- https://instruct.ai/_next/image?url=%2Fhome%2Fbackground-main.webp&w=2048&q=75&dpl=dpl_BR7gzpTbdSKFNYD1CfpNBx9dyctp
- https://instruct.ai/_next/image?url=%2Ftemplates%2Fillustrations%2Fresearch-and-summarize.webp&w=256&q=75&dpl=dpl_BR7gzpTbdSKFNYD1CfpNBx9dyctp
- https://instruct.ai/_next/image?url=%2Ftemplates%2Fillustrations%2Fpodcast-generator.webp&w=256&q=75&dpl=dpl_BR7gzpTbdSKFNYD1CfpNBx9dyctp
- https://instruct.ai/_next/image?url=%2Ftemplates%2Fillustrations%2Finbox-cleaner.webp&w=256&q=75&dpl=dpl_BR7gzpTbdSKFNYD1CfpNBx9dyctp
- https://instruct.ai/_next/image?url=%2Ftemplates%2Fillustrations%2Fmeeting-prep.webp&w=256&q=75&dpl=dpl_BR7gzpTbdSKFNYD1CfpNBx9dyctp
- https://instruct.ai/_next/image?url=%2Fmarketing%2Fintegrate_bg.webp&w=3840&q=75&dpl=dpl_BR7gzpTbdSKFNYD1CfpNBx9dyctp
- https://instruct.ai/_next/image?url=%2Fmarketing%2Fdelegate_bg.webp&w=3840&q=75&dpl=dpl_BR7gzpTbdSKFNYD1CfpNBx9dyctp
- https://instruct.ai/_next/image?url=%2Fmarketing%2Fautomate_bg.webp&w=3840&q=75&dpl=dpl_BR7gzpTbdSKFNYD1CfpNBx9dyctp

### External SVGs (5)
- https://instruct.ai/_next/image?url=%2Flogo%2Fwordmark%2Fdark-icon.svg&w=256&q=75&dpl=dpl_BR7gzpTbdSKFNYD1CfpNBx9dyctp
- https://instruct.ai/_next/image?url=%2Factions%2Fweb.svg&w=48&q=75&dpl=dpl_BR7gzpTbdSKFNYD1CfpNBx9dyctp
- https://instruct.ai/_next/image?url=%2Flogo%2Ficon-dark.svg&w=48&q=75&dpl=dpl_BR7gzpTbdSKFNYD1CfpNBx9dyctp
- https://instruct.ai/_next/image?url=%2Fhome%2Fsocial-twitter.svg&w=48&q=75&dpl=dpl_BR7gzpTbdSKFNYD1CfpNBx9dyctp
- https://instruct.ai/_next/image?url=%2Fhome%2Fsocial-linkedin.svg&w=48&q=75&dpl=dpl_BR7gzpTbdSKFNYD1CfpNBx9dyctp

### CSS Gradients (3)
_Real background-image gradient values — use as-is in CSS._

| Element | Gradient |
|---|---|
| `absolute w-full h-[80vh] top-[-40vh] z-10 bg-radial from-tra` | `radial-gradient(in oklab, rgba(0, 0, 0, 0) 0px, rgb(255, 255, 255) 100%)` |
| `absolute top-[25vh] h-[30vh] w-full bg-linear-to-b from-tran` | `linear-gradient(in oklab, rgba(0, 0, 0, 0) 0px, rgb(255, 255, 255) 50%, rgb(255, 255, 255) 100%)` |
| `text-center text-[61px] max-md:text-[40px] max-md:px-2 bg-gr` | `linear-gradient(in oklab, rgb(109, 115, 120) 0px, rgb(34, 38, 42) 100%)` |

### Inline SVGs (10 captured)
_Raw <svg> source — icons, logos, illustrations. Embed directly in generated HTML._

<details><summary>SVG #1 (480 chars)</summary>

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon" width="20" height="20" color="#003428" stroke="none" stroke-width="0"><path fill-rule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd"></path></svg>
```

</details>
<details><summary>SVG #2 (382 chars)</summary>

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon" width="16" height="16" color="#4C5257" stroke="none" stroke-width="0"><path fill-rule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"></path></svg>
```

</details>
<details><summary>SVG #3 (456 chars)</summary>

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon" width="16" height="16" color="#9FA3A7" stroke="none" stroke-width="0"><path d="M8 1a2 2 0 0 0-2 2v4a2 2 0 1 0 4 0V3a2 2 0 0 0-2-2Z"></path><path d="M4.5 7A.75.75 0 0 0 3 7a5.001 5.001 0 0 0 4.25 4.944V13.5h-1.5a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-1.5v-1.556A5.001 5.001 0 0 0 13 7a.75.75 0 0 0-1.5 0 3.5 3.5 0 1 1-7 0Z"></path></svg>
```

</details>
<details><summary>SVG #4 (441 chars)</summary>

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon" width="16" height="16" color="#737373" stroke="none" stroke-width="0"><path fill-rule="evenodd" d="M13.25 2a.75.75 0 0 0-.75.75v6.5H4.56l.97-.97a.75.75 0 0 0-1.06-1.06L2.22 9.47a.75.75 0 0 0 0 1.06l2.25 2.25a.75.75 0 0 0 1.06-1.06l-.97-.97h8.69A.75.75 0 0 0 14 10V2.75a.75.75 0 0 0-.75-.75Z" clip-rule="evenodd"></path></svg>
```

</details>
<details><summary>SVG #5 (421 chars)</summary>

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon" width="16" height="16" color="#6D7378" stroke="none" stroke-width="0"><path d="M1 4a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4ZM10 5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V5ZM4 10a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1H4Z"></path></svg>
```

</details>
<details><summary>SVG #6 (563 chars)</summary>

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon" width="16" height="16" color="#6D7378" stroke="none" stroke-width="0"><path fill-rule="evenodd" d="M9.808 4.057a.75.75 0 0 1 .92-.527l3.116.849a.75.75 0 0 1 .528.915l-.823 3.121a.75.75 0 0 1-1.45-.382l.337-1.281a23.484 23.484 0 0 0-3.609 3.056.75.75 0 0 1-1.07.01L6 8.06l-3.72 3.72a.75.75 0 1 1-1.06-1.061l4.25-4.25a.75.75 0 0 1 1.06 0l1.756 1.755a25.015 25.015 0 0 1 3.508-2.85l-1.46-.398a.75.75 0 0 1-.526-.92Z" clip-rule="evenodd"></path></svg>
```

</details>
<details><summary>SVG #7 (538 chars)</summary>

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon" width="16" height="16" color="#6D7378" stroke="none" stroke-width="0"><path fill-rule="evenodd" d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm10.5 5.707a.5.5 0 0 0-.146-.353l-1-1a.5.5 0 0 0-.708 0L9.354 9.646a.5.5 0 0 1-.708 0L6.354 7.354a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0-.146.353V12a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V9.707ZM12 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" clip-rule="evenodd"></path></svg>
```

</details>
<details><summary>SVG #8 (542 chars)</summary>

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon" width="16" height="16" color="#6D7378" stroke="none" stroke-width="0"><path d="M2 6.342a3.375 3.375 0 0 1 6-2.088 3.375 3.375 0 0 1 5.997 2.26c-.063 2.134-1.618 3.76-2.955 4.784a14.437 14.437 0 0 1-2.676 1.61c-.02.01-.038.017-.05.022l-.014.006-.004.002h-.002a.75.75 0 0 1-.592.001h-.002l-.004-.003-.015-.006a5.528 5.528 0 0 1-.232-.107 14.395 14.395 0 0 1-2.535-1.557C3.564 10.22 1.999 8.558 1.999 6.38L2 6.342Z"></path></svg>
```

</details>
<details><summary>SVG #9 (294 chars)</summary>

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"></path></svg>
```

</details>
<details><summary>SVG #10 (634 chars)</summary>

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon" width="16" height="16" color="#9FA3A7" stroke="none" stroke-width="0"><path d="M2 3.5A1.5 1.5 0 0 1 3.5 2h2A1.5 1.5 0 0 1 7 3.5v2A1.5 1.5 0 0 1 5.5 7h-2A1.5 1.5 0 0 1 2 5.5v-2ZM2 10.5A1.5 1.5 0 0 1 3.5 9h2A1.5 1.5 0 0 1 7 10.5v2A1.5 1.5 0 0 1 5.5 14h-2A1.5 1.5 0 0 1 2 12.5v-2ZM10.5 2A1.5 1.5 0 0 0 9 3.5v2A1.5 1.5 0 0 0 10.5 7h2A1.5 1.5 0 0 0 14 5.5v-2A1.5 1.5 0 0 0 12.5 2h-2ZM11.5 9a.75.75 0 0 1 .75.75v1h1a.75.75 0 0 1 0 1.5h-1v1a.75.75 0 0 1-1.5 0v-1h-1a.75.75 0 0 1 0-1.5h1v-1A.75.75 0 0 1 11.5 9Z"></path></svg>
```

</details>

---

## Design Critique (AI Phase 1)

<details>
<summary>Expand raw critique</summary>

## SECTION INVENTORY

| # | Name | Vertical Span | Z-layer | Background | Dominant Visual |
|---|------|--------------|---------|------------|-----------------|
| 1 | **nav** | 0–7% | floating (sticky/fixed) | solid-color (white/near-white #FFFFFF) | interactive-controls + typography |
| 2 | **hero** | 7–75% | base | image (subtle world-map/topographic texture, very low opacity, pale blue-green tint over white) | typography + interactive-controls |
| 3 | **feature-grid** (partial) | 75–100% | base | solid-color (white) | data + imagery |
| 4 | **cookie-banner** | ~78–100% (bottom-left) | overlay | solid-color (white/near-white) | typography + interactive-controls |

---

## SPATIAL GRID ANALYSIS

### Navigation Bar
- **Layout engine**: Flexbox
- **Column count**: 3 zones — logo+links (left) | spacer (center) | action-links (right)
- **Gap size**: ~24px (spacing.lg) between nav link items; ~16px (spacing.md) between right-side CTAs
- **Item pattern**: fluid (fills viewport width)
- **Z-index tier**: floating, `position: fixed` or `sticky`, z ≈ top layer (inferred above all base content)

### Hero Section
- **Layout engine**: Flexbox (column, centered)
- **Column count**: 1 (single centered column)
- **Gap size**: ~32px (spacing.xl) between text block, input box, and tab filters
- **Item pattern**: fluid, max-width constrained (~660px estimated for the input/content block)
- **Masonry note**: none

### Feature Cards Grid (partially visible)
- **Layout engine**: CSS Grid (2-column inferred from screenshot — two cards per row)
- **Column count**: 2
- **Gap size**: ~24px (spacing.lg) between cards
- **Item pattern**: fluid, equal-height rows visible
- **Masonry note**: none detected

### Cookie Banner (overlay)
- **Layout engine**: Flexbox (column)
- **Position type**: `position: fixed`, bottom-left corner
- **Z-index tier**: overlay (above all base content and hero)
- **Item pattern**: fixed-width block (~300px)

### Tab Filter Row (Featured / Productivity / Creative / Lifestyle)
- **Layout engine**: Flexbox (row)
- **Column count**: 4 tabs
- **Gap size**: ~8px (spacing.sm) between tab pills
- **Item pattern**: fixed-width pill buttons

---

## ASSET AUDIT

| Asset | Source | Value |
|-------|--------|-------|
| **Hero bg** | Physical Data / screenshot visual | Subtle topographic/world-map texture image, very low opacity (~5–10%), pale teal-green tint — no explicit URL in Physical Data → "no asset URL found in Physical Data" |
| **Logo/brand** | Physical Data / screenshot | Small square icon (dark background with white shape) + wordmark "Instruct" — inline-svg or img, **no URL in Physical Data** → "no asset URL found" |
| **Card images** | Physical Data assets.images | Up to 4 partially visible: (1) pink/coral gradient with search icon overlay (Research & Summarize); (2) grainy/muted image with play button "0:13" (Generate Podcast); (3) colorful icons strip (Inbox cleaner); (4) document/profile thumbnail (Meeting prep) — **no explicit URLs in Physical Data** → "no asset URLs found" |
| **Icon set** | Physical Data | Small inline icons visible in tab pills (grid icon, trending-up arrow, image/creative icon, heart icon) — inline-SVG pattern, count ≈ 4+ — **no SVG URLs in Physical Data** → inferred inline-SVG |
| **Microphone icon** | Screenshot | Visible in input box (mic icon) — inline-SVG, no URL in Physical Data |
| **Enter/return icon** | Screenshot | Circular button with ↵ symbol in input box — inline-SVG, no URL in Physical Data |

---

## COLOR SEMANTICS

| Observed Hex | Semantic Role | Evidence |
|-------------|---------------|----------|
| `#FFFFFF` | **Neutral-Base** | Page background, nav background, card backgrounds, cookie banner background |
| `#F5F7F7` / `#EEF1F0` | **Neutral-Surface** | Hero section very subtle tinted background; input field background |
| `#1A1A1A` / `#111111` | **Text-Main** | Hero headline "AI that works for you", nav wordmark "Instruct", card titles |
| `#5A5A5A` / `#6B7280` | **Text-Muted** | Hero subtext "Automate your work across apps, just by asking.", card descriptions, cookie body text |
| `#000000` (near-black) | **Brand-Primary** | "Get started" CTA button fill (dark/black background) |
| `#FFFFFF` | **Text-Inverse** | "Get started" button label text (white on dark button) |
| `#E5E7EB` | **Border-Default** | Input box border, tab pill borders, "Log in" button border, "Get started for free" pill border |
| `#3A5FCD` / `#4169E1` | **Brand-Accent** | Instruct logo icon background (dark blue square), small colored icons in card thumbnails |
| `#F9F9F9` | **Neutral-Overlay** | Cookie banner slightly elevated off pure white; "Featured" active tab pill background |
| `#9CA3AF` | **Text-Muted** | Input placeholder text "Delegate a task or ask a question..." |
| `#22C55E` / teal tones | **Status-Success** (minor) | Faint teal hue in hero background texture map |

</details>
