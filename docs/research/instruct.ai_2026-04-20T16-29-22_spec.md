# Design Spec — instruct.ai

> **Extracted:** Mon, 20 Apr 2026 16:29:22 GMT
> **URL:** https://instruct.ai/
> **Paradigm:** landing · **Density:** comfortable · **Motif:** mint-washed hero texture, editorial serif headline, pill-filter tabs, conversational input prompt, rounded card grid

---

## Visual Weight Verdict

**TYPE DOMINANT**

This marketing landing page is sustained by **editorial typography and text hierarchy**.

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
| Brand Secondary | #000000 | `#000000` |
| Brand Accent | #3b82f6 | `#3b82f6` |
| Background Page | #ffffff | `#ffffff` |
| Background Surface | #eaf3ed | `#eaf3ed` |
| Background Overlay | rgba(0,0,0,0.5) | rgba(0,0,0,0.5) |
| Text Primary | #1a1a1a | `#1a1a1a` |
| Text Secondary | #6b7280 | `#6b7280` |
| Text Inverse | #ffffff | `#ffffff` |
| Border | #e5e7eb | `#e5e7eb` |
| Status Success | #10B981 | `#10B981` |
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
| Paradigm | landing |
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

| # | Name | Vertical Span | Z-Layer | Background | Dominant Visual |
|---|------|---------------|---------|------------|-----------------|
| 1 | **nav** | 0–6% | floating (fixed/sticky) | solid-color: `#ffffff` | interactive-controls |
| 2 | **hero** | 6–85% | base | image (faint world-map texture, light mint/white wash) | typography + interactive-controls |
| 3 | **feature-grid** | 72–100% | base | solid-color: `#ffffff` | imagery + typography |
| 4 | **cookie-banner** | ~78–100% (lower-left overlay) | overlay (modal/drawer) | solid-color: `#ffffff` with border/shadow | interactive-controls + typography |

---

## SPATIAL GRID ANALYSIS

### Nav Bar
- **Layout engine:** Flexbox (horizontal, space-between)
- **Column count:** 3 groups — [Logo + nav links] | [spacer] | [Talk to us + Log in + Get started]
- **Gap size:** ~24px (lg) between nav links; ~16px (md) between CTA buttons
- **Item pattern:** fluid
- **Z-index tier:** floating, `position: fixed` or `sticky`, z ≈ top layer (100+)

### Hero Section — Filter Tabs (Featured / Productivity / Creative / Lifestyle)
- **Layout engine:** Flexbox (horizontal, centered)
- **Column count:** 4 pill buttons
- **Gap size:** ~8px (sm) between pills
- **Item pattern:** fixed-width (content-hugging pill shape)
- **Masonry note:** none

### Feature Cards Grid (bottom of viewport)
- **Layout engine:** CSS Grid or Flexbox (2-column)
- **Column count:** 2 (visible at viewport width)
- **Gap size:** ~24px (lg) horizontal and vertical gap
- **Item pattern:** fluid (equal-width columns)
- **Masonry note:** Cards appear uniform height — no masonry

### Cookie Banner
- **Layout engine:** Flexbox (vertical stack)
- **Position:** `position: fixed`, bottom-left corner
- **Z-index tier:** overlay, z ≥ 200 (renders above all page content)

---

## ASSET AUDIT

| Asset Role | Source / URL | Notes |
|------------|--------------|-------|
| **Hero bg** | Faint mint-toned world-map topographic texture | Appears as a CSS background-image or SVG overlay; no explicit URL confirmed in Physical Data — rendered visually as light green/teal wash |
| **Logo/brand** | Inline SVG or `<img>` — square black icon + "Instruct" wordmark | Visible top-left; small rounded-square black icon beside text label |
| **Card images** | Thumbnail images visible in feature cards (pink gradient search UI, pixel-art green blob, email/inbox UI, meeting icons) | No explicit asset URLs provided in Physical Data — marked as **no asset URL confirmed** |
| **Icon set** | Inline SVGs — microphone icon (hero input), return/enter arrow icon (hero input), tab icons (grid, arrow-up-right, image, heart shapes) | Inline SVG count: ~6–8 observed |
| **Nav favicon/logo icon** | Inline SVG or small `<img>` — black rounded square with white inner shape | **no external URL confirmed in Physical Data** |

---

## COLOR SEMANTICS

| Observed Hex | Semantic Role | Evidence |
|---|---|---|
| `#1a1a1a` / `#111111` | **Text-Main** | Hero headline "AI that works for you", nav links, card titles |
| `#ffffff` | **Neutral-Base** | Nav background, cookie banner background, input field background |
| `#f0f4f0` / `#eaf3ed` (light mint) | **Neutral-Surface** | Hero section background wash, world-map texture overlay tint |
| `#6b7280` / `#555555` | **Text-Muted** | Hero subtitle "Automate your work across apps…", card descriptions, cookie body text |
| `#1a1a1a` | **Brand-Primary** | "Get started" CTA button fill (near-black) |
| `#ffffff` | **Text-Inverse** | "Get started" button label text |
| `#f3f4f6` / `#efefef` | **Neutral-Overlay** | "Featured" active pill background (slightly darker than others) |
| `#e5e7eb` | **Border-Default** | Input field border, pill button borders, card borders |
| `#000000` (near) | **Brand-Secondary** | Logo icon background square |
| `#1a1a1a` with outline | **Brand-Accent** (button variant) | "Log in" outlined button border + text |
| `#3b82f6` (blue link) | **Brand-Accent** | "Privacy Policy" hyperlink in cookie banner |
| `#f9fafb` | **Neutral-Surface** | Input area interior background (slightly off-white from white nav) |

</details>
