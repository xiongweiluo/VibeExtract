# Design Spec — ladygaga.com

> **Extracted:** Wed, 15 Apr 2026 12:16:39 GMT
> **URL:** https://www.ladygaga.com/us-en/
> **Paradigm:** e-commerce · **Density:** spacious · **Motif:** scorched horror-editorial brutalism: burnt orange carnage on blackened ground, distressed death-metal blackletter logotype paired with clinical sans-serif navigation, high-contrast two-register typographic split, cool powder-blue announcement interrupt clashing against warm aggressive palette

---

## Visual Weight Verdict

**IMAGE DOMINANT**

This e-commerce storefront is sustained by **large-format photography and imagery**.

### Evidence
- 50 image assets detected (heavy image density)
- 13 SVG assets detected
- Hero section: full-bleed layout — "Year of MAYHEM"
- Card grid: 4-column, flat
- Layout: single-column / nav top-fixed
- Density: spacious (4px base grid)
- Visual hierarchy: expressive

---

## Color Architecture

| Role | Value | Token |
|---|---|---|
| Brand Primary | #D94F2B | `#D94F2B` |
| Brand Secondary | #0D0D0D | `#0D0D0D` |
| Brand Accent | #FFFFFF | `#FFFFFF` |
| Background Page | #0A0A0A | `#0A0A0A` |
| Background Surface | #F0F0F0 | `#F0F0F0` |
| Background Overlay | rgba(0,0,0,0.55) | rgba(0,0,0,0.55) |
| Text Primary | #1A1A1A | `#1A1A1A` |
| Text Secondary | #555555 | `#555555` |
| Text Inverse | #FFFFFF | `#FFFFFF` |
| Border | #333333 | `#333333` |
| Status Success | #10B981 | `#10B981` |
| Status Warning | #F59E0B | `#F59E0B` |
| Status Error | #EF4444 | `#EF4444` |

---

## Typography System

**Families:** body — `ABC ROM, PingFang SC, Arial, sans-serif` · heading — `ABC ROM, PingFang SC, Arial, sans-serif` · mono — `ABC ROM Mono, ui-monospace, monospace`

| Level | Size | Line Height |
|---|---|---|
| `xs` | 10px | 1.2 |
| `sm` | 12px | 1.2 |
| `base` | 16px | 1.0 |
| `lg` | 20px | 0.9 |
| `xl` | 32px | 1.2 |
| `2xl` | 34px | 0.9 |
| `3xl` | 56px | 0.7 |
| `4xl` | 80px | 1.0 |

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
| Density | spacious |
| Dominant element | imagery |
| Visual hierarchy | expressive |

---

## Skeleton

| Component | Details |
|---|---|
| Hero | present · full-bleed · "Year of MAYHEM" · 5 CTAs |
| Nav | brand: "Latest" · items: Music, Shop, Projects, Born This Way Foundation, Haus Labs, Live |
| Cards | 4-column grid · flat |
| Footer | 1 column |

---

## Physical Measurements

### Spacing (computed CSS)
- **Base unit:** 4px
- **Measured steps:** 4px · 8px · 12px · 16px · 20px · 24px · 28px · 32px · 36px · 40px · 48px · 52px · 56px · 60px
- **Named scale:** xs=4px sm=8px md=16px lg=24px xl=32px 2xl=48px 3xl=64px

### Typography (computed CSS)
- **Root body size:** 16px / 1rem
- **Detected families:** PingFang SC, ABC ROM, ABC ROM Mono, Arial

| px | rem | Line Height | Weight | Letter Spacing | Role |
|---|---|---|---|---|---|
| 10px | 0.625rem | 1.2 | 400 | -0.3px | label |
| 12px | 0.75rem | 1.2 | 400 | -0.36px | label |
| 13px | 0.8125rem | 1.2 | 400 | 0px | body-sm |
| 14px | 0.875rem | 0.7 | 400 | 0px | body-sm |
| 16px | 1rem | 1 | 400 | 0px | body |
| 20px | 1.25rem | 0.9 | 500 | 0px | body-lg |
| 32px | 2rem | 1.2 | 500 | 0px | h4 |
| 34px | 2.125rem | 0.9 | 400 | 0px | h4 |
| 56px | 3.5rem | 0.7 | 400 | 1.68px | h2 |

---

## Asset Inventory

### Images (50)
- https://cdn.sanity.io/images/iujqne6u/3xlc4ub9mmgaxaz7/ade2f414561a893e2d2c316916651cd9462be632-188x80.png?w=2560&q=70&auto=format
- https://cdn.sanity.io/images/iujqne6u/3xlc4ub9mmgaxaz7/ade2f414561a893e2d2c316916651cd9462be632-188x80.png?w=100&q=70&auto=format
- https://cdn.sanity.io/images/iujqne6u/3xlc4ub9mmgaxaz7/ade2f414561a893e2d2c316916651cd9462be632-188x80.png?w=420&q=70&auto=format
- https://cdn.sanity.io/images/iujqne6u/3xlc4ub9mmgaxaz7/ade2f414561a893e2d2c316916651cd9462be632-188x80.png?w=768&q=70&auto=format
- https://cdn.sanity.io/images/iujqne6u/3xlc4ub9mmgaxaz7/ade2f414561a893e2d2c316916651cd9462be632-188x80.png?w=1024&q=70&auto=format
- https://cdn.sanity.io/images/iujqne6u/3xlc4ub9mmgaxaz7/ade2f414561a893e2d2c316916651cd9462be632-188x80.png?w=1400&q=70&auto=format
- https://cdn.sanity.io/images/iujqne6u/3xlc4ub9mmgaxaz7/ade2f414561a893e2d2c316916651cd9462be632-188x80.png?w=1600&q=70&auto=format
- https://cdn.sanity.io/images/iujqne6u/3xlc4ub9mmgaxaz7/ade2f414561a893e2d2c316916651cd9462be632-188x80.png?w=1920&q=70&auto=format
- https://image.mux.com/XYlJ4vp02Yo9ixHGKo00OiUIG8tXJveh3tHQZEu5vchmM/thumbnail.jpg?time=0&width=1920
- https://image.mux.com/XYlJ4vp02Yo9ixHGKo00OiUIG8tXJveh3tHQZEu5vchmM/thumbnail.jpg?time=0&width=100
- https://image.mux.com/XYlJ4vp02Yo9ixHGKo00OiUIG8tXJveh3tHQZEu5vchmM/thumbnail.jpg?time=0&width=420
- https://image.mux.com/XYlJ4vp02Yo9ixHGKo00OiUIG8tXJveh3tHQZEu5vchmM/thumbnail.jpg?time=0&width=768
- https://image.mux.com/XYlJ4vp02Yo9ixHGKo00OiUIG8tXJveh3tHQZEu5vchmM/thumbnail.jpg?time=0&width=1024
- https://image.mux.com/XYlJ4vp02Yo9ixHGKo00OiUIG8tXJveh3tHQZEu5vchmM/thumbnail.jpg?time=0&width=1400
- https://image.mux.com/XYlJ4vp02Yo9ixHGKo00OiUIG8tXJveh3tHQZEu5vchmM/thumbnail.jpg?time=0&width=1600
- https://image.mux.com/Ar00y5DnQ13My4lpbbnycKzfrlVteXGWzx3OwDJ1Rz2g/thumbnail.jpg?time=0&width=1080
- https://image.mux.com/Ar00y5DnQ13My4lpbbnycKzfrlVteXGWzx3OwDJ1Rz2g/thumbnail.jpg?time=0&width=100
- https://image.mux.com/Ar00y5DnQ13My4lpbbnycKzfrlVteXGWzx3OwDJ1Rz2g/thumbnail.jpg?time=0&width=420
- https://image.mux.com/Ar00y5DnQ13My4lpbbnycKzfrlVteXGWzx3OwDJ1Rz2g/thumbnail.jpg?time=0&width=768
- https://image.mux.com/Ar00y5DnQ13My4lpbbnycKzfrlVteXGWzx3OwDJ1Rz2g/thumbnail.jpg?time=0&width=1024
_…and 30 more_

### External SVGs (13)
- https://cdn.shopify.com/oxygen-v2/37366/33371/69928/3376744/assets/award-decoration-DmlnUdVF.svg
- https://cdn.shopify.com/oxygen-v2/37366/33371/69928/3376744/assets/decoration-1-pbik8VSp.svg
- https://cdn.shopify.com/oxygen-v2/37366/33371/69928/3376744/assets/decoration-2-BluB5tFQ.svg
- https://cdn.shopify.com/oxygen-v2/37366/33371/69928/3376744/assets/decoration-3-Dk2Xxy2L.svg
- https://cdn.shopify.com/oxygen-v2/37366/33371/69928/3376744/assets/icon-vom-light-CU1-ViMD.svg
- https://cdn.shopify.com/oxygen-v2/37366/33371/69928/3376744/assets/slider-track-_0Qcjg_q.svg
- https://cdn.shopify.com/oxygen-v2/37366/33371/69928/3376744/assets/slider-thumb-BG1Gn2cH.svg
- https://cdn.sanity.io/images/iujqne6u/3xlc4ub9mmgaxaz7/2f5addcb3d38b859fe146124ac7d1d22d8e2345a-14x14.svg?w=2560&q=70&auto=format
- https://cdn.sanity.io/images/iujqne6u/3xlc4ub9mmgaxaz7/d7d5200206e1209540fd8ff2d3b79dcd5d47a0ec-15x14.svg?w=2560&q=70&auto=format
- https://cdn.sanity.io/images/iujqne6u/3xlc4ub9mmgaxaz7/a74a2e095f0b31facaec730a1194ae5b5cdbb460-15x14.svg?w=2560&q=70&auto=format
- https://cdn.sanity.io/images/iujqne6u/3xlc4ub9mmgaxaz7/5e7131ba512b21e771d406e15247c312c3b64863-15x14.svg?w=2560&q=70&auto=format
- https://cdn.sanity.io/images/iujqne6u/3xlc4ub9mmgaxaz7/3fb21a8ce55b038e7765feef72e6ca0c46c84736-14x14.svg?w=2560&q=70&auto=format
- https://cdn.sanity.io/images/iujqne6u/3xlc4ub9mmgaxaz7/27bacc21d387cca8944e8387982c9fd026d2fbad-15x14.svg?w=2560&q=70&auto=format

### Inline SVGs (10 captured)
_Raw <svg> source — icons, logos, illustrations. Embed directly in generated HTML._

<details><summary>SVG #1 (261 chars)</summary>

```html
<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.33362 1.33341L12.1045 6.97579C12.7441 7.50885 12.7441 8.49132 12.1045 9.02438L5.33362 14.6667" stroke="currentColor" stroke-width="1.33333" stroke-linejoin="round"></path></svg>
```

</details>
<details><summary>SVG #2 (283 chars)</summary>

```html
<svg width="18" height="18" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.07031 7.89844L21.2124 22.0406" stroke="currentColor" stroke-width="1.2"></path><path d="M21.2148 7.89844L7.07271 22.0406" stroke="currentColor" stroke-width="1.2"></path></svg>
```

</details>
<details><summary>SVG #3 (142 chars)</summary>

```html
<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none"><path stroke="currentColor" d="M10 9H0M10 5H0M10 1H0"></path></svg>
```

</details>
<details><summary>SVG #4 (184 chars)</summary>

```html
<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none"><path stroke="currentColor" stroke-linejoin="round" d="M11 4 6.768 9.078a1 1 0 0 1-1.536 0L1 4"></path></svg>
```

</details>
<details><summary>SVG #5 (432 chars)</summary>

```html
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path fill="currentColor" fill-rule="evenodd" d="M19 7H5v13h14V7ZM5 6a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5Z" clip-rule="evenodd"></path><path fill="currentColor" fill-rule="evenodd" d="M7.969 4.53a4.03 4.03 0 0 1 8.06 0v2.354h-1V4.531a3.03 3.03 0 1 0-6.06 0v2.353h-1V4.531Z" clip-rule="evenodd"></path></svg>
```

</details>
<details><summary>SVG #6 (351 chars)</summary>

```html
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><g stroke="currentColor" clip-path="url(#a)"><circle cx="9.724" cy="9.727" r="6.169" transform="rotate(-45 9.724 9.727)"></circle><path d="m13.354 14.826 5.817 5.817"></path></g><defs><clipPath id="a"><path fill="currentColor" d="M0 0h24v24H0z"></path></clipPath></defs></svg>
```

</details>
<details><summary>SVG #7 (1098 chars)</summary>

```html
<svg width="32" height="38" viewBox="0 0 32 38" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d_555_2338)"><path d="M6.8562 6.09375L6.8562 20.4285C6.8562 26.3187 11.6312 31.0937 17.5215 31.0937L25.8562 31.0938" stroke="#C94447" stroke-width="1.52361"></path></g><defs><filter id="filter0_d_555_2338" x="3.8147e-05" y="-0.000694275" width="31.9506" height="37.9506" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset></feOffset><feGaussianBlur stdDeviation="3.04722"></feGaussianBlur><feComposite in2="hardAlpha" operator="out"></feComposite><feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_555_2338"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_555_2338" result="shape"></feBlend></filter></defs></svg>
```

</details>
<details><summary>SVG #8 (355 chars)</summary>

```html
<svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg" style="position:absolute;left:-6px;bottom:0"><path d="M-1.43051e-05 10.8921C6.72636 12.1151 9.28019 10.2581 11 8.34717L8.5 5.34717C6.6528 5.72935 7.52894 1.68159 6.30596 0C6.49705 6.87924 1.33762 10.3189 -1.43051e-05 10.8921Z" fill="rgb(136,7,7)"></path></svg>
```

</details>
<details><summary>SVG #9 (1098 chars)</summary>

```html
<svg width="32" height="38" viewBox="0 0 32 38" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d_555_2338)"><path d="M6.8562 6.09375L6.8562 20.4285C6.8562 26.3187 11.6312 31.0937 17.5215 31.0937L25.8562 31.0938" stroke="#C94447" stroke-width="1.52361"></path></g><defs><filter id="filter0_d_555_2338" x="3.8147e-05" y="-0.000694275" width="31.9506" height="37.9506" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset></feOffset><feGaussianBlur stdDeviation="3.04722"></feGaussianBlur><feComposite in2="hardAlpha" operator="out"></feComposite><feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_555_2338"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_555_2338" result="shape"></feBlend></filter></defs></svg>
```

</details>
<details><summary>SVG #10 (355 chars)</summary>

```html
<svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg" style="position:absolute;left:-6px;bottom:0"><path d="M-1.43051e-05 10.8921C6.72636 12.1151 9.28019 10.2581 11 8.34717L8.5 5.34717C6.6528 5.72935 7.52894 1.68159 6.30596 0C6.49705 6.87924 1.33762 10.3189 -1.43051e-05 10.8921Z" fill="rgb(136,7,7)"></path></svg>
```

</details>

---

## Design Critique (AI Phase 1)

<details>
<summary>Expand raw critique</summary>

# Design Critique: Lady Gaga "MAYHEM" Official Website

---

## COLOR SEMANTICS

**Brand-Primary — `#D94F2B` / `#E05530` (burnt orange-red)**
- The dominant hero image hue, a scorched, saturated orange-red that bleeds across 80%+ of the viewport. This is the unmistakable identity color of the "MAYHEM" era. Also echoed in the "GAGA" logo letterforms at the top center.
- Cross-context: appears in hero image, logo, and reflected in the thumbnail strip.

**Brand-Secondary — `#1A1A1A` / near-black `#0D0D0D`**
- The deep, almost-black ground beneath and behind the hero. Used as the navbar background and structural skeleton. Provides the contrast anchor for all text elements.
- Cross-context: nav bar, cookie banner background, footer region.

**Brand-Accent — `#FFFFFF` (pure white)**
- The "MAYHEM" distressed logotype and "A YEAR OF" subtitle are rendered in white against the dark/orange field. Acts as the high-contrast active/hero text accent.
- Also appears as nav link text color.

**Neutral-Surface — `#F0F0F0` / `#E8E8E8` (light gray)**
- Cookie consent banner background — a soft off-white panel that floats over the hero. Provides the lightest neutral in the composition.
- Appears isolated to the modal-type overlay component.

**Neutral-Base — `#000000` / `#0A0A0A`**
- The true page/body background, visible in the nav bar region. Fully dark, making the orange hero feel suspended.

**Neutral-Overlay — `rgba(0,0,0,0.55)` (semi-transparent dark scrim)**
- Implied as a gradient vignette behind the hero text center area, darkening the face image to allow "A YEAR OF" text legibility.

**Text-Main — `#1A1A1A` (dark charcoal)**
- Used in the cookie consent body copy. Standard near-black readable on the light surface panel.

**Text-Muted — `#555555` / medium gray**
- "Privacy Policy" link text in the cookie banner — visually subordinate to the action buttons.

**Text-Inverse — `#FFFFFF`**
- All navigation items (Latest, Music, Shop, Projects, Live, Account, Cart), the announcement bar text ("WE ARE NOMINATED…"), and the hero subtitle. White on dark or orange-red.

**Border-Default — `#333333` / very dark gray**
- Subtle separator between the announcement bar and the main nav. Also implied as the thin rule at the bottom of the nav bar.

**Status-Info (announcement bar) — `#B8D4E8` / pale sky blue `#C5DCE8`**
- The top announcement bar has a distinctly cooler, muted powder-blue background — the only cool-toned surface in an otherwise warm/dark palette. Acts as an informational interrupt color.

---

## SPACING MATHEMATICS

**Sampled measurements (raw pixel estimates):**

1. **Announcement bar height:** ~36px
2. **Nav bar height:** ~56px
3. **Nav item horizontal gap (between links):** ~32px
4. **Cookie banner internal padding (horizontal):** ~16px
5. **Cookie banner button vertical padding:** ~12px
6. **Cookie banner button horizontal padding:** ~24px
7. **Thumbnail strip item width/gap:** ~8px gap between thumbnails
8. **"A YEAR OF" to "MAYHEM" vertical gap:** ~16px
9. **Cookie banner gap between body text and buttons:** ~24px
10. **Page edge to first nav link:** ~28px → snaps to **32px**

**Raw values in ascending order:**
`8, 12, 16, 24, 28, 32, 36, 56`

**GCD Analysis:**
- 8, 16, 24, 32 → all clean multiples of **8px**
- 12 → nearest snap = 8px (or 16px; likely 12px is intentional at 1.5× — consistent with 4px base as fallback)
- 36 → snaps to 32 or 40 at 8px base
- 56 → 56/8 = 7 exactly ✓
- 28 → snaps to 32

**→ Base unit = 8px**

**Snapped values:**
| Raw | Snapped (8px grid) |
|---|---|
| 8px | 8px |
| 12px | 8px / 16px |
| 16px | 16px |
| 24px | 24px |
| 28px | 32px |
| 32px | 32px |
| 36px | 40px |
| 56px | 56px |

**Detected baseUnit: 8px** — with isolated 4px micro-use for thumbnail gaps.

---

## TYPOGRAPHY HIERARCHY

**Hero Display — "MAYHEM" logotype**
- Estimated size: ~180–220px (fills ~750px width across ~5 characters)
- Weight: Heavy/Black — custom distressed/blackletter display typeface
- Line-height: N/A (single line, ~1.0)
- Role: **Display/H0** — pure brand identity, not a system font, decorative

**Section Heading — "A YEAR OF"**
- Estimated size: ~28–32px
- Weight: Regular to Medium (~400–500)
- Letter-spacing: Very wide — approximately +0.25em tracked out
- Line-height: ~1.2
- Role: **H1 support / kicker label** — spaced caps, cinematic mood setter

**Nav Links — "Latest", "Music", "Shop", "Projects", "Live"**
- Estimated size: ~13–14px
- Weight: Regular (~400)
- Letter-spacing: Slight positive tracking (~0.05em)
- Line-height: ~1.0 (single-line nav)
- Role: **Navigation / Label**

**Announcement Bar — "WE ARE NOMINATED FOR 4 WEBBY AWARDS → VOTE NOW"**
- Estimated size: ~11–12px
- Weight: Regular (~400), all-caps with letter-spacing
- Letter-spacing: ~0.1–0.15em
- Line-height: ~1.0
- Role: **Caption / Micro-label**

**Cookie Banner Body — "We'd like to use cookies…"**
- Estimated size: ~13–14px
- Weight: Regular (~400)
- Line-height: ~1.5
- Role: **Body / Legal copy**

**Cookie Banner Buttons — "I understand" / "Cookie Choices"**
- Estimated size: ~13px
- Weight: Medium (~500)
- Letter-spacing: minimal
- Role: **Button label / UI action text**

**Derived 8-step type scale:**

| Token | Size | Usage |
|---|---|---|
| xs | 10px | Micro-labels, legal fine print |
| sm | 12px | Announcement bar, captions |
| base | 14px | Nav links, body copy, button labels |
| md | 16px | Sub-body, metadata |
| lg | 20px | Small headings, sub-section labels |
| xl | 28px | "A YEAR OF" kicker, section titles |
| 2xl | 40px | Page-level headings |
| 3xl | 56px | Large editorial headings |
| 4xl | 80px+ | Hero display (MAYHEM exceeds scale — custom display asset) |

---

## VISUAL LANGUAGE

1. **Scorched horror-editorial** — The color palette is aggressively monothematic: burnt orange dominating a blackened ground, evoking heat damage, decay, and confrontational energy. This is not a warm-lifestyle orange; it reads as fire and rot simultaneously.

2. **Distressed blackletter maximalism** — The "MAYHEM" typography deploys a heavy, decayed blackletter/death-metal logotype against the raw image. Anti-legibility is a deliberate choice — the aesthetic *is* the illegibility. Contrast sharply with the clinical sans-serif nav, creating a two-register typographic split.

3. **High-contrast stark brutalism with a cool interrupt** — The announcement bar's powder blue is a jarring, deliberate clash against the warm carnage below. This

</details>
