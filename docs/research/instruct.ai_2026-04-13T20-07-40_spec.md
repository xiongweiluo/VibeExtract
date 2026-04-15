# Design Spec — instruct.ai

> **Extracted:** Mon, 13 Apr 2026 20:07:40 GMT
> **URL:** https://instruct.ai/
> **Paradigm:** landing · **Density:** spacious · **Motif:** editorial-soft consumer-AI: serif display headline paired with clean sans-serif UI shell, desaturated sage-tinted canvas with cartographic topographic texture overlay, restrained dark-anchor CTA pattern, tactile-minimal softcard surfaces with hairline borders

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
| Brand Accent | #2563EB | `#2563EB` |
| Background Page | #ECF0ED | `#ECF0ED` |
| Background Surface | #FFFFFF | `#FFFFFF` |
| Background Overlay | rgba(0,0,0,0.25) | rgba(0,0,0,0.25) |
| Text Primary | #111111 | `#111111` |
| Text Secondary | #6B7280 | `#6B7280` |
| Text Inverse | #FFFFFF | `#FFFFFF` |
| Border | #E2E5E3 | `#E2E5E3` |
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

| px | rem | Line Height | Weight | Role |
|---|---|---|---|---|
| 12px | 0.75rem | 1.3 | 600 | label |
| 14px | 0.875rem | 1.4 | 500 | body-sm |
| 16px | 1rem | 1.5 | 400 | body |
| 18px | 1.125rem | 1.6 | 500 | body |
| 20px | 1.25rem | 1.4 | 400 | body-lg |
| 40px | 2.5rem | 1.3 | 400 | h3 |
| 52px | 3.25rem | 1.1 | 400 | h2 |
| 61px | 3.8125rem | 1.4 | 400 | h2 |

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

### SVGs (5)
- https://instruct.ai/_next/image?url=%2Flogo%2Fwordmark%2Fdark-icon.svg&w=256&q=75&dpl=dpl_BR7gzpTbdSKFNYD1CfpNBx9dyctp
- https://instruct.ai/_next/image?url=%2Factions%2Fweb.svg&w=48&q=75&dpl=dpl_BR7gzpTbdSKFNYD1CfpNBx9dyctp
- https://instruct.ai/_next/image?url=%2Flogo%2Ficon-dark.svg&w=48&q=75&dpl=dpl_BR7gzpTbdSKFNYD1CfpNBx9dyctp
- https://instruct.ai/_next/image?url=%2Fhome%2Fsocial-twitter.svg&w=48&q=75&dpl=dpl_BR7gzpTbdSKFNYD1CfpNBx9dyctp
- https://instruct.ai/_next/image?url=%2Fhome%2Fsocial-linkedin.svg&w=48&q=75&dpl=dpl_BR7gzpTbdSKFNYD1CfpNBx9dyctp

---

## Design Critique (AI Phase 1)

<details>
<summary>Expand raw critique</summary>

## COLOR SEMANTICS

**Brand-Primary — #1A1A1A (near-black)**
- Used for the "Get started" CTA button (filled, dark), nav logo icon background, and the primary display headline text. Dominant interactive color driving conversion hierarchy. Appears across navbar, hero CTA, and cookie modal buttons — cross-context consistency confirmed.

**Brand-Secondary — #FFFFFF (white)**
- Used as text on the dark "Get started" button (Text-Inverse role shared), and as the surface of the input field and card surfaces. Supporting neutral foundation across multiple components.

**Brand-Accent — #2A6EEA (mid-blue, approximate)**
- The small square icon in the Instruct logo carries a blue accent. Also the "Privacy Policy" link text in the cookie banner is blue (~#2563EB). Minimal usage, reserved for interactive links and brand mark. Cross-context: logo + hyperlink only.

**Neutral-Surface — #FFFFFF / rgba(255,255,255,0.95)**
- Card backgrounds for feature tiles (Research & Summarize, Generate Podcast, etc.), the main input field container, filter pill backgrounds, and the cookie settings modal. Consistently applied as the elevated surface layer.

**Neutral-Base — #EEF2F0 / very light gray-green (~#ECF0ED)**
- Main page background, with a subtle topographic/map texture overlay in the hero region. The tint reads as a desaturated sage-white. Not pure white — slightly warm-cool balanced gray.

**Neutral-Overlay — rgba(0,0,0,0.25) approximate**
- The cookie banner background is #1A1A1A (dark), functioning both as overlay/modal surface and contrast element against the light page — more a dark-panel overlay than a scrim.

**Text-Main — #1C1C1C / #111111**
- All headings, card titles ("Generate Podcast", "Meeting prep"), nav links ("Features", "Blog"). Near-black, high contrast against light surfaces. Consistent across hierarchy levels.

**Text-Muted — #6B7280 approximate (medium gray)**
- Subtitle copy: "Automate your work across apps, just by asking." and card descriptors ("Creates a podcast episode on your chosen topic"). Also placeholder text in the input field. Reduced contrast signaling secondary importance.

**Text-Inverse — #FFFFFF**
- Text inside dark "Get started" button and "Accept" cookie button. Pure white on dark backgrounds.

**Border-Default — #E2E5E3 / rgba(0,0,0,0.10)**
- Visible on input field container, filter pill outlines ("Productivity", "Creative", "Lifestyle"), and card edges. Subtle 1px borders defining containment without heavy visual weight.

**Status-Success — Not explicitly present**

**Status-Warning / Status-Error — Not explicitly present in visible UI**

---

## SPACING MATHEMATICS

**Sampled raw pixel estimates:**
1. Nav internal padding (top/bottom): ~12px
2. Gap between filter pills: ~8px
3. Padding inside filter pills (horizontal): ~16px
4. Input field internal top/bottom padding: ~20px
5. Gap between "Featured" label and section title: ~4px
6. Card internal content padding: ~24px
7. Vertical margin between hero tagline and input box: ~32px
8. Section margin (nav bottom to hero content): ~48px

**Ascending order:**
4, 8, 12, 16, 20, 24, 32, 48

**GCD Analysis:**
4, 8, 12, 16, 20, 24, 32, 48 → GCD = 4px
However: 8, 16, 24, 32, 48 all divide cleanly by 8 as well. The 4px and 12px values suggest a **4px base unit** with an 8px practical rhythm.

**Snapped values (base unit = 4px):**
- 4px → 4px
- 8px → 8px
- 12px → 12px
- 16px → 16px
- 20px → 20px
- 24px → 24px
- 32px → 32px
- 48px → 48px

**Detected baseUnit: 4px** (with dominant 8px rhythm in macro spacing)

---

## TYPOGRAPHY HIERARCHY

**Hero/Display Text — "AI that works for you"**
- Estimated size: ~64–68px
- Weight: ~700 (bold) in a serif/editorial typeface (appears to be a transitional serif, similar to Freight Display or a custom editorial face)
- Line-height ratio: ~1.15
- Role: H1 / Display

**Section Heading — "Featured" label**
- Estimated size: ~20px
- Weight: ~500–600 (medium-semibold)
- Line-height ratio: ~1.3
- Role: H2 / Section label

**Subheadline / Tagline — "Automate your work across apps, just by asking."**
- Estimated size: ~18–20px
- Weight: ~400 (regular)
- Line-height ratio: ~1.5
- Role: H3 / Subtitle/Body-Large

**Card Titles — "Generate Podcast", "Meeting prep"**
- Estimated size: ~16–17px
- Weight: ~600 (semibold)
- Line-height ratio: ~1.3
- Role: H4 / Card heading

**Body / Descriptor Text — "Creates a podcast episode on your chosen topic"**
- Estimated size: ~14px
- Weight: ~400 (regular)
- Line-height ratio: ~1.5
- Role: Body / Caption

**Labels / Nav items — "Features", "Blog", "Log in"**
- Estimated size: ~14–15px
- Weight: ~400–500
- Line-height ratio: ~1.0 (single-line context)
- Role: Label / Nav

**Derived 8-step type scale:**

| Step | Size | Role |
|------|------|------|
| xs   | 11px | Fine print / metadata |
| sm   | 13px | Caption |
| base | 15px | Body / Nav label |
| md   | 17px | Card title / Body-large |
| lg   | 20px | Section heading |
| xl   | 28px | Sub-display |
| 2xl  | 40px | — |
| 3xl  | 52px | — |
| 4xl  | 68px | Hero display |

---

## VISUAL LANGUAGE

1. **Editorial-soft consumer-AI**: The serif display headline ("AI that works for you") brings editorial gravitas — reminiscent of high-end SaaS/AI brand positioning that borrows magazine aesthetics to signal intelligence and craft, contrasted against a clean sans-serif UI shell.

2. **Tactile-minimal glassmorphic surfaces**: Cards and input fields use near-white fills with barely-visible hairline borders rather than drop shadows — a restrained version of softcard UI that avoids the dated heavy-shadow "neumorphism" but retains physical materiality cues.

3. **Desaturated sage-tinted canvas with cartographic texture**: The background is not neutral gray but a deliberate muted green-gray with a topographic map ghost-image overlay — conveying intelligence, exploration, and world-scale ambition without loud color.

4. **Typographic contrast as primary hierarchy tool**: The design deploys a dramatic scale jump between the serif 68px hero and the 15px sans-serif UI elements — hierarchy is achieved through type contrast rather than color blocking or geometric structure, giving it an editorial-brand rather than dashboard-enterprise feel.

5. **Restrained dark-anchor interaction pattern**: Dark (#1A1A1A) is reserved exclusively for primary CTAs and interactive confirmations ("Get started", "Accept") — every other interactive element (pills, nav links) uses outline-only or muted-fill treatment, creating an unambiguous single focal point for conversion at every scroll depth.

</details>
