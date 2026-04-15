# Design Spec — instruct.ai

> **Extracted:** Wed, 15 Apr 2026 12:18:06 GMT
> **URL:** https://instruct.ai/
> **Paradigm:** landing · **Density:** spacious · **Motif:** editorial soft-serif consumer-AI; achromatic restrained palette with whisper cool-green environmental tint; ghost-and-anchor button system; featherweight card surfaces; pill-tab discovery UI embedded in landing page

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
- Density: spacious (4px base grid)
- Visual hierarchy: editorial

---

## Color Architecture

| Role | Value | Token |
|---|---|---|
| Brand Primary | #1A1A1A | `#1A1A1A` |
| Brand Secondary | #FFFFFF | `#FFFFFF` |
| Brand Accent | #E8F0EC | `#E8F0EC` |
| Background Page | #F4F5F4 | `#F4F5F4` |
| Background Surface | #FFFFFF | `#FFFFFF` |
| Background Overlay | rgba(26,26,26,0.85) | rgba(26,26,26,0.85) |
| Text Primary | #1C1C1C | `#1C1C1C` |
| Text Secondary | #6B6B6B | `#6B6B6B` |
| Text Inverse | #FFFFFF | `#FFFFFF` |
| Border | #E2E2E2 | `#E2E2E2` |
| Status Success | #10B981 | `#10B981` |
| Status Warning | #F59E0B | `#F59E0B` |
| Status Error | #EF4444 | `#EF4444` |

---

## Typography System

**Families:** body — `Satoshi, sans-serif` · heading — `ivypresto-headline, serif` · mono — `sfMono, ui-monospace, monospace`

| Level | Size | Line Height |
|---|---|---|
| `xs` | 12px | 1.3 |
| `sm` | 14px | 1.4 |
| `base` | 16px | 1.5 |
| `lg` | 18px | 1.6 |
| `xl` | 20px | 1.4 |
| `2xl` | 28px | 1.3 |
| `3xl` | 40px | 1.3 |
| `4xl` | 61px | 1.1 |

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
| Density | spacious |
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

## COLOR SEMANTICS

**Brand-Primary — #1A1A1A (near-black)**
The "Get started" CTA button uses a deep near-black fill (#1A1A1A) with white inverse text. This is the most dominant interactive color. Appears in the nav button and logo mark, confirming cross-context consistency as the primary action color.

**Brand-Secondary — #FFFFFF / transparent with border**
"Log in" and "Get started for free" use outlined/ghost button styling — white/transparent backgrounds with a visible border (~#D0D0D0). These secondary CTAs appear in both the nav and hero, confirming a two-tier button system.

**Brand-Accent — #E8F0EC (muted sage/mint tint)**
The hero background carries a very desaturated cool-green wash (approximately rgba(200,220,210,0.25)) from what appears to be a topographic/terrain imagery overlay. The "Featured" pill tab also uses a faint warm-grey-white fill distinguishing it as selected.

**Neutral-Surface — #FFFFFF**
Card backgrounds for the feature tiles (Research & Summarize, Generate Podcast, etc.) and the task input box are clean white. Cookie banner background is also #FFFFFF or very slightly off-white.

**Neutral-Base — #F5F6F5 (barely-there warm grey)**
The overall page background is not pure white — it reads as a very light warm-grey (~#F4F5F4), distinguishing it from card surfaces.

**Neutral-Overlay — #1A1A1A at ~85% opacity**
The cookie settings modal uses a dark near-black panel background, functioning as its own contained overlay surface rather than a scrim.

**Text-Main — #1C1C1C**
The hero headline "AI that works for you" and card titles use a dark near-black serif text. Also used for nav links and card body text labels.

**Text-Muted — #6B6B6B**
Subheadline "Automate your work across apps, just by asking." and card descriptor lines ("Condenses a research topic into an engaging document") render at approximately 60% luminance — a mid-grey supporting role.

**Text-Inverse — #FFFFFF**
Text within the "Get started" button and cookie banner body text appear in white against dark backgrounds.

**Border-Default — #E2E2E2**
The input box, pill tabs (unselected), and "Log in" button outlines all show a consistent light grey border around #E0E2E0.

**Status-Success / Warning / Error**
Not visibly present in this screen state.

---

## SPACING MATHEMATICS

**Sampled raw values:**
- Nav bar height: ~56px
- Gap between nav and hero content: ~80px
- Padding inside "Get started" button (vertical): ~10px, horizontal ~20px
- Gap between hero headline and subheadline: ~16px
- Gap between subheadline and input box: ~32px
- Padding inside input box (horizontal): ~24px
- Gap between input box and pill tabs: ~24px
- Gap between feature cards (horizontal gutter): ~16px
- Section label "Featured" to first card row: ~16px
- Cookie banner internal padding: ~24px

**Raw values in ascending order:**
10, 16, 16, 20, 24, 24, 24, 32, 56, 80

**GCD analysis:**
All values are divisible by 8 (10 is the only outlier — likely button vertical padding snapping to 10 or 12, suggesting 8px base with slight deviation). Removing the 10px anomaly: 16, 16, 20, 24, 24, 32, 56, 80 → GCD = 8px.

**Snapped values (base unit = 8px):**
- 10px → **8px**
- 16px → **16px**
- 20px → **24px**
- 24px → **24px**
- 32px → **32px**
- 56px → **56px**
- 80px → **80px**

**Detected baseUnit: 8px**

---

## TYPOGRAPHY HIERARCHY

**Hero/Display Text — "AI that works for you"**
- Estimated size: ~60–64px
- Weight: ~500 (medium-regular) — notably NOT bold; appears to be a high-contrast serif (likely a transitional or editorial serif like Playfair or similar)
- Line-height ratio: ~1.1–1.15
- Role: **H1 / Display**
- Notable: uses optical italics or stylistic ligatures in the letterforms

**Section Heading — "Featured" (section label)**
- Estimated size: ~18–20px
- Weight: ~600 (semibold)
- Line-height: ~1.3
- Role: **H2 / Section Label**

**Card Title — "Research & Summarize", "Generate Podcast"**
- Estimated size: ~16px
- Weight: ~600
- Line-height: ~1.3
- Role: **H3 / Card Heading**

**Body/Subheadline — "Automate your work across apps, just by asking."**
- Estimated size: ~18px
- Weight: ~400
- Line-height: ~1.5
- Role: **Body Large / Subtitle**

**Card Descriptor — "Condenses a research topic into an engaging document"**
- Estimated size: ~14px
- Weight: ~400
- Line-height: ~1.5
- Role: **Body Small / Caption**

**Labels — Pill tabs "Featured", "Productivity"**
- Estimated size: ~14px
- Weight: ~500
- Line-height: ~1.2
- Role: **Label / UI Text**

**Cookie Banner body text**
- Estimated size: ~13px
- Weight: ~400
- Line-height: ~1.5
- Role: **Caption / Fine Print**

**Derived 8-step scale:**
| Step | Size | Role |
|------|------|------|
| xs   | 12px | Fine print |
| sm   | 13px | Caption |
| base | 14px | Label / Card body |
| md   | 16px | Card heading |
| lg   | 18px | Body large / Sub-heading |
| xl   | 20px | Section label |
| 2xl  | 28px | (inferred, not visible) |
| 3xl  | 40px | (inferred mid-display) |
| 4xl  | 64px | Hero H1 |

---

## VISUAL LANGUAGE

1. **Editorial soft-serif consumer-AI** — The pairing of a high-contrast transitional serif for the hero with a geometric sans-serif for UI elements creates a editorial magazine sensibility applied to a SaaS product; uncommon in AI tooling, deliberately aspirational.

2. **Restrained tonal quietude** — Color expression is almost entirely suppressed. The palette is achromatic with a single whispering cool-green environmental tint from the hero background imagery. No saturated brand color exists — a deliberate signal of "calm intelligence" over aggressive growth-marketing.

3. **Ghost-and-anchor button system** — The two-button nav hierarchy (outlined ghost "Log in" vs. filled near-black "Get started") is textbook DTC consumer product patterning, not typical enterprise SaaS — suggesting aspirational consumer positioning.

4. **Featherweight card surfaces** — Feature cards use minimal visual separation (white on light-grey page, thin borders) rather than shadow-depth or heavy elevation — a "floating tissue paper" approach to depth that keeps cognitive weight extremely low.

5. **Pill-tab navigation as primary discovery UI** — The use of rounded pill filter tabs (Featured / Productivity / Creative / Lifestyle) rather than traditional nav or accordion patterns signals a consumer-app, almost App-Store-browse interaction paradigm embedded directly in the landing page.

</details>
