# Design Spec — ladygaga.com

> **Extracted:** Mon, 13 Apr 2026 20:03:45 GMT
> **URL:** https://www.ladygaga.com/us-en/
> **Paradigm:** e-commerce · **Density:** spacious · **Motif:** horror-editorial maximalism — controlled chaos within corporate scaffolding; thermal infrared chromatic identity with distressed metal display typography; clinical white functional chrome contrasted against a visceral dark void hero canvas

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
| Brand Primary | #E8431A | `#E8431A` |
| Brand Secondary | #0A0A0A | `#0A0A0A` |
| Brand Accent | #FF6B3D | `#FF6B3D` |
| Background Page | #0A0A0A | `#0A0A0A` |
| Background Surface | #FFFFFF | `#FFFFFF` |
| Background Overlay | rgba(0,0,0,0.55) | rgba(0,0,0,0.55) |
| Text Primary | #1A1A1A | `#1A1A1A` |
| Text Secondary | #555555 | `#555555` |
| Text Inverse | #FFFFFF | `#FFFFFF` |
| Border | #E0E0E0 | `#E0E0E0` |
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
| `4xl` | 128px | 1.0 |

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

| px | rem | Line Height | Weight | Role |
|---|---|---|---|---|
| 10px | 0.625rem | 1.2 | 400 | label |
| 12px | 0.75rem | 1.2 | 400 | label |
| 13px | 0.8125rem | 1.2 | 400 | body-sm |
| 14px | 0.875rem | 0.7 | 400 | body-sm |
| 16px | 1rem | 1 | 400 | body |
| 20px | 1.25rem | 0.9 | 500 | body-lg |
| 32px | 2rem | 1.2 | 500 | h4 |
| 34px | 2.125rem | 0.9 | 400 | h4 |
| 56px | 3.5rem | 0.7 | 400 | h2 |

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

### SVGs (13)
- https://cdn.shopify.com/oxygen-v2/37366/33371/69928/3330183/assets/award-decoration-DmlnUdVF.svg
- https://cdn.shopify.com/oxygen-v2/37366/33371/69928/3330183/assets/decoration-1-pbik8VSp.svg
- https://cdn.shopify.com/oxygen-v2/37366/33371/69928/3330183/assets/decoration-2-BluB5tFQ.svg
- https://cdn.shopify.com/oxygen-v2/37366/33371/69928/3330183/assets/decoration-3-Dk2Xxy2L.svg
- https://cdn.shopify.com/oxygen-v2/37366/33371/69928/3330183/assets/icon-vom-light-CU1-ViMD.svg
- https://cdn.shopify.com/oxygen-v2/37366/33371/69928/3330183/assets/slider-track-_0Qcjg_q.svg
- https://cdn.shopify.com/oxygen-v2/37366/33371/69928/3330183/assets/slider-thumb-BG1Gn2cH.svg
- https://cdn.sanity.io/images/iujqne6u/3xlc4ub9mmgaxaz7/2f5addcb3d38b859fe146124ac7d1d22d8e2345a-14x14.svg?w=2560&q=70&auto=format
- https://cdn.sanity.io/images/iujqne6u/3xlc4ub9mmgaxaz7/d7d5200206e1209540fd8ff2d3b79dcd5d47a0ec-15x14.svg?w=2560&q=70&auto=format
- https://cdn.sanity.io/images/iujqne6u/3xlc4ub9mmgaxaz7/a74a2e095f0b31facaec730a1194ae5b5cdbb460-15x14.svg?w=2560&q=70&auto=format
- https://cdn.sanity.io/images/iujqne6u/3xlc4ub9mmgaxaz7/5e7131ba512b21e771d406e15247c312c3b64863-15x14.svg?w=2560&q=70&auto=format
- https://cdn.sanity.io/images/iujqne6u/3xlc4ub9mmgaxaz7/3fb21a8ce55b038e7765feef72e6ca0c46c84736-14x14.svg?w=2560&q=70&auto=format
- https://cdn.sanity.io/images/iujqne6u/3xlc4ub9mmgaxaz7/27bacc21d387cca8944e8387982c9fd026d2fbad-15x14.svg?w=2560&q=70&auto=format

---

## Design Critique (AI Phase 1)

<details>
<summary>Expand raw critique</summary>

## COLOR SEMANTICS

**Brand-Primary — #E8431A (Burnt Orange-Red)**
- The dominant interactive/brand color. Appears in the "GAGA" logo wordmark, the announcement banner arrow, and permeates the hero image as a deliberate color wash. Classifies as primary because it's the most intentional, repeated non-neutral color across unrelated components (nav logo, utility bar, hero atmosphere).

**Brand-Accent — #FF6B3D (Lighter Orange)**
- Slightly lighter warm orange visible in the glowing/highlight zones of the hero face image. Serves as a luminous variant of the primary, used atmospherically rather than interactively.

**Neutral-Base — #000000 / near-black (~#0A0A0A)**
- The page body background implied beneath the hero image. The nav bar rests on white/very light background — this creates a sharp dual-tone structure.

**Neutral-Surface — #FFFFFF / #F5F5F5**
- Navigation bar background (pure white), announcement bar background (very pale blue-tinted white ~#EEF4F8), and the cookie consent modal (~#FFFFFF). Appears across three distinct components — high cross-context consistency.

**Neutral-Overlay — rgba(0,0,0,0.55)**
- Implied dark scrim over the hero image where text "A YEAR OF" sits — the image itself functions as an overlay canvas darkened toward the text region.

**Text-Main — #1A1A1A**
- Navigation links ("Latest", "Music", "Shop", etc.), cookie modal body text. Near-black, high-contrast on white surfaces. Standard readability role.

**Text-Muted — #555555 (estimated)**
- Smaller helper text in cookie modal ("Privacy Policy" link). Slightly lighter than Text-Main, reduced visual weight.

**Text-Inverse — #FFFFFF**
- "A YEAR OF" heading and "MAYHEM" display type sit on the dark hero image. Also the close button (×) circle outline in the announcement bar is white-on-dark. Consistent inverse-text role.

**Border-Default — #CCCCCC / #E0E0E0**
- Subtle separator between the announcement bar and the navigation bar. Thin horizontal rule (~1px). Also implied border on the cookie consent modal container edge.

**Status indicator (informational) — #B8D8E8 (pale blue-grey)**
- The announcement bar carries a distinctly cooler, desaturated blue-tinted background, semantically differentiating it from the brand-warm nav. Acts as a soft informational/alert-band color.

---

## SPACING MATHEMATICS

**Sampled raw measurements:**
1. Announcement bar height: ~36px
2. Nav bar height: ~56px
3. Horizontal padding inside nav links (single side): ~20px
4. Gap between nav items: ~32px
5. Cookie modal internal padding: ~24px
6. Cookie modal button padding (vertical): ~12px
7. Cookie modal button padding (horizontal): ~16px
8. Margin between cookie modal buttons: ~8px
9. Bottom thumbnail strip height: ~48px

**Raw values in ascending order:**
8, 12, 16, 20, 24, 32, 36, 48, 56

**GCD Analysis:**
- 8, 16, 24, 32, 48, 56 are all clean multiples of 8.
- 12 = 1.5 × 8 (suggests possible 4px base sub-unit used here)
- 20 = 2.5 × 8 (also suggests 4px)
- 36 = 4.5 × 8 → 4px base fits better (36 = 9 × 4)

**Revised with base unit = 4px:**
| Raw | Snapped (4px grid) |
|---|---|
| 8px | 8px |
| 12px | 12px |
| 16px | 16px |
| 20px | 20px |
| 24px | 24px |
| 32px | 32px |
| 36px | 36px |
| 48px | 48px |
| 56px | 56px |

**Detected baseUnit: 4px** (all values are clean multiples; the 8px rhythm is a secondary harmonic layer on top of this)

---

## TYPOGRAPHY HIERARCHY

**Display / Hero — "MAYHEM"**
- Estimated size: ~120–130px
- Weight: Custom distressed display typeface (effectively ultra-bold/black, ~900)
- Line-height: ~1.0 (single line, tight)
- Role: H1/Display — maximum visual impact, custom horror-metal logotype treatment, not a system font

**Hero Subtext — "A YEAR OF"**
- Estimated size: ~28–32px
- Weight: Light-to-regular (~300–400), widely tracked (letter-spacing ~0.2em+)
- Line-height: ~1.2
- Role: Pre-title / eyebrow above the display type — creates hierarchy contrast via weight opposition

**Navigation Links — "Latest", "Music", "Shop", etc.**
- Estimated size: ~13–14px
- Weight: Medium (~500)
- Line-height: ~1.4
- Role: Navigation/UI label — tight, functional, uppercase-adjacent (appears sentence case here)

**Announcement Bar Text — "WE ARE NOMINATED FOR 4 WEBBY AWARDS"**
- Estimated size: ~11–12px
- Weight: Medium (~500), all-caps with tracked spacing (~0.1em)
- Line-height: ~1.0 (single line in constrained bar)
- Role: Caption/utility label — informational micro-type

**Cookie Modal Body — "We'd like to use cookies…"**
- Estimated size: ~13–14px
- Weight: Regular (~400)
- Line-height: ~1.5–1.6
- Role: Body/prose — only running-text instance in the viewport

**Derived 8-step type scale (4px base, 1.25 ratio approximation):**

| Token | Size | Role |
|---|---|---|
| xs | 10px | Fine print / legal |
| sm | 12px | Announcement bar / captions |
| base | 14px | Nav links / body text |
| md | 16px | Subheadings / button labels |
| lg | 20px | Card titles |
| xl | 28px | "A YEAR OF" eyebrow |
| 2xl | 40px | Section headers |
| 3xl | 56px | Page-level headings |
| 4xl | 128px | Display / "MAYHEM" |

---

## VISUAL LANGUAGE

1. **Horror-editorial maximalism** — The "MAYHEM" typeset uses a deliberately degraded, dripping metal/horror typeface that directly references underground music subculture. This is a deliberate genre signal, not an aesthetic accident.

2. **Controlled chaos within corporate scaffolding** — The nav bar is crisp, white, and restrained (almost e-commerce generic), creating a calculated tension with the visceral, distressed hero below. The system is tame at the top, feral at the center.

3. **Thermal/infrared chromatic identity** — The entire hero palette simulates a heat-signature or infrared photograph — deep blacks, saturated burnt-orange mid-tones, and blown-out reds. This is a deliberate color narrative, not a photographic accident.

4. **High-contrast dualism (white system / black void)** — The UI operates in two distinct registers: clinical-white functional chrome (nav, cookie banner, announcement bar) versus an all-consuming dark void hero canvas. There is no intermediate grey zone — the transition is abrupt and intentional.

5. **Fan-community participatory signaling** — The bottom thumbnail filmstrip of fan/community images and the Webby Awards vote-now CTA introduce a community-engagement layer, typical of celebrity artist fan-sites that blend e-commerce with fan identity platforms. The design communicates "you are part of the mayhem."

</details>
