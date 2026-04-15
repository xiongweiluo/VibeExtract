# Design Spec — ladygaga.com

> **Extracted:** Mon, 13 Apr 2026 20:01:29 GMT
> **URL:** https://www.ladygaga.com/us-en/music
> **Paradigm:** e-commerce · **Density:** spacious · **Motif:** editorial neo-goth luxury: high-contrast art-punk monochrome with a single chromatic orange-red puncture, degraded-grotesque logotype colliding with cold Swiss-influenced utility type, extreme negative space as theatrical staging device

---

## Visual Weight Verdict

**IMAGE DOMINANT**

This e-commerce storefront is sustained by **large-format photography and imagery**.

### Evidence
- 50 image assets detected (heavy image density)
- 6 SVG assets detected
- Hero section: asymmetric layout — "Music"
- Card grid: 4-column, flat
- Layout: multi-column / nav top-static
- Density: spacious (4px base grid)
- Visual hierarchy: editorial

---

## Color Architecture

| Role | Value | Token |
|---|---|---|
| Brand Primary | #FF3D00 | `#FF3D00` |
| Brand Secondary | #FFFFFF | `#FFFFFF` |
| Brand Accent | #FF3D00 | `#FF3D00` |
| Background Page | #000000 | `#000000` |
| Background Surface | #1A1A1A | `#1A1A1A` |
| Background Overlay | rgba(0,0,0,0.85) | rgba(0,0,0,0.85) |
| Text Primary | #FFFFFF | `#FFFFFF` |
| Text Secondary | #888888 | `#888888` |
| Text Inverse | #000000 | `#000000` |
| Border | #FFFFFF | `#FFFFFF` |
| Status Success | #10B981 | `#10B981` |
| Status Warning | #F59E0B | `#F59E0B` |
| Status Error | #EF4444 | `#EF4444` |

---

## Typography System

**Families:** body — `ABC ROM, PingFang SC, Arial, sans-serif` · heading — `ABC ROM, PingFang SC, Arial, sans-serif` · mono — `ABC ROM Mono, ui-monospace, monospace`

| Level | Size | Line Height |
|---|---|---|
| `xs` | 10px | 1 |
| `sm` | 13px | 1.2 |
| `base` | 16px | 1 |
| `lg` | 18px | 1.3 |
| `xl` | 20px | 1.3 |
| `2xl` | 24px | 1.2 |
| `3xl` | 32px | 1.2 |
| `4xl` | 40px | 1.2 |

---

## Spacing

- **Base unit:** 4px
- **Scale:** xs=4px · sm=8px · md=16px · lg=24px · xl=32px · 2xl=48px · 3xl=64px

---

## Site Architecture

| Property | Value |
|---|---|
| Paradigm | e-commerce |
| Layout | multi-column |
| Nav position | top-static |
| Density | spacious |
| Dominant element | imagery |
| Visual hierarchy | editorial |

---

## Skeleton

| Component | Details |
|---|---|
| Hero | present · asymmetric · "Music" · 5 CTAs |
| Nav | brand: "Latest" · items: Music, Shop, Projects, Born This Way Foundation, Haus Labs, Live |
| Cards | 4-column grid · flat |
| Footer | 1 column |

---

## Physical Measurements

### Spacing (computed CSS)
- **Base unit:** 4px
- **Measured steps:** 4px · 8px · 12px · 16px · 20px · 24px · 28px · 36px · 40px · 48px · 92px · 100px · 128px
- **Named scale:** xs=4px sm=8px md=16px lg=24px xl=32px 2xl=48px 3xl=64px

### Typography (computed CSS)
- **Root body size:** 16px / 1rem
- **Detected families:** PingFang SC, ABC ROM, ABC ROM Mono, Arial

| px | rem | Line Height | Weight | Role |
|---|---|---|---|---|
| 10px | 0.625rem | 1 | 400 | label |
| 13px | 0.8125rem | 1.2 | 400 | body-sm |
| 14px | 0.875rem | 1.2 | 400 | body-sm |
| 16px | 1rem | 1 | 400 | body |
| 18px | 1.125rem | 1.3 | 400 | body |
| 40px | 2.5rem | 1.2 | 400 | h3 |

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
- https://cdn.sanity.io/images/iujqne6u/3xlc4ub9mmgaxaz7/539452793e6de6da526147ac178c316bd6aab663-3767x3758.png?w=2560&q=70&auto=format
- https://cdn.sanity.io/images/iujqne6u/3xlc4ub9mmgaxaz7/539452793e6de6da526147ac178c316bd6aab663-3767x3758.png?w=100&q=70&auto=format
- https://cdn.sanity.io/images/iujqne6u/3xlc4ub9mmgaxaz7/539452793e6de6da526147ac178c316bd6aab663-3767x3758.png?w=420&q=70&auto=format
- https://cdn.sanity.io/images/iujqne6u/3xlc4ub9mmgaxaz7/539452793e6de6da526147ac178c316bd6aab663-3767x3758.png?w=768&q=70&auto=format
- https://cdn.sanity.io/images/iujqne6u/3xlc4ub9mmgaxaz7/539452793e6de6da526147ac178c316bd6aab663-3767x3758.png?w=1024&q=70&auto=format
- https://cdn.sanity.io/images/iujqne6u/3xlc4ub9mmgaxaz7/539452793e6de6da526147ac178c316bd6aab663-3767x3758.png?w=1400&q=70&auto=format
- https://cdn.sanity.io/images/iujqne6u/3xlc4ub9mmgaxaz7/539452793e6de6da526147ac178c316bd6aab663-3767x3758.png?w=1600&q=70&auto=format
- https://cdn.sanity.io/images/iujqne6u/3xlc4ub9mmgaxaz7/539452793e6de6da526147ac178c316bd6aab663-3767x3758.png?w=1920&q=70&auto=format
- https://cdn.sanity.io/images/iujqne6u/3xlc4ub9mmgaxaz7/da9b810cea0dab0e9900819870304507347fff80-4200x4200.jpg?w=2560&q=70&auto=format
- https://cdn.sanity.io/images/iujqne6u/3xlc4ub9mmgaxaz7/da9b810cea0dab0e9900819870304507347fff80-4200x4200.jpg?w=100&q=70&auto=format
- https://cdn.sanity.io/images/iujqne6u/3xlc4ub9mmgaxaz7/da9b810cea0dab0e9900819870304507347fff80-4200x4200.jpg?w=420&q=70&auto=format
- https://cdn.sanity.io/images/iujqne6u/3xlc4ub9mmgaxaz7/da9b810cea0dab0e9900819870304507347fff80-4200x4200.jpg?w=768&q=70&auto=format
_…and 30 more_

### SVGs (6)
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

**Brand-Primary — #FF3D00 (fiery orange-red)**
- Used for the "GAGA" logotype in the navigation, the announcement bar diamond/arrow glyphs, and the "VOTE NOW →" text
- Classified as Brand-Primary because it is the single most distinctive chromatic color, applied to the artist identity mark and primary CTA
- Appears cross-context: nav logo + top announcement bar + interactive arrow elements

**Brand-Secondary — #FFFFFF (white)**
- Nav link text ("Latest", "Music", "Shop"), announcement bar body text, cookie modal button labels, sidebar album list text
- Provides high-contrast text against the black base; serves as the default interactive text color
- Appears in every section of the interface

**Neutral-Base — #000000 (true black)**
- Full page background, navigation bar background, announcement bar background
- Dominates the entire canvas; establishes the brand's dark, editorial tonality
- Consistent across header, body, and sidebar

**Neutral-Surface — #1A1A1A / rgba(20,20,20,~0.97)**
- Cookie consent modal background — slightly lifted dark surface distinguishable from the pure black base
- Classified as Neutral-Surface because it floats as a panel above the base layer
- Single context (modal)

**Neutral-Overlay — rgba(0,0,0,0.0) — effectively absent**
- No visible modal scrim behind the cookie banner; the dark page itself acts as visual separation

**Text-Main — #FFFFFF**
- Primary body text everywhere: nav items, album sidebar list, cookie modal body copy
- Full opacity white on black; maximum contrast intent (~21:1)

**Text-Muted — #888888 / mid-gray**
- "Privacy Policy" link text in cookie modal, subtle secondary labels
- Reduced visual weight signals secondary hierarchy

**Text-Inverse — #000000 (black on white/light)**
- "I understand" button uses black text on white fill; "Cookie Choices" uses white text on dark outline
- Role reversal confirms inverse text pattern

**Border-Default — #FFFFFF (full or partial opacity)**
- "MAYHEM" pill/badge has a visible white border/outline
- "Cookie Choices" button has a white border outline
- Audio player widget at bottom-right has a white rounded-rectangle border
- Consistent thin 1px rule usage

**Status indicators — None visible in this screenshot**

---

## SPACING MATHEMATICS

Raw pixel estimates (from visual observation):

| Location | Measurement |
|---|---|
| Nav item horizontal gap (Latest → Music) | ~72px |
| Nav bar total height | ~56px |
| Announcement bar height | ~36px |
| Gap between sidebar album titles (list row height) | ~28px |
| "MAYHEM" badge top padding (internal vertical) | ~6px |
| Cookie modal internal horizontal padding | ~24px |
| Gap between cookie modal buttons | ~16px |
| "MAYHEM" badge left offset from edge | ~16px |

**Ascending raw values:** 6, 16, 16, 24, 28, 36, 56, 72

**GCD Analysis:**
- 6 is the outlier (badge padding, likely 4px snapped)
- 16, 24, 28, 36, 56 → GCD = 4px is clearly consistent
- 72 = 8 × 9, but fits 4px grid

**Base unit = 4px**

**Snapped values:**
| Raw | Snapped |
|---|---|
| 6px | 8px |
| 16px | 16px |
| 24px | 24px |
| 28px | 28px |
| 36px | 36px |
| 56px | 56px |
| 72px | 72px |

**Detected baseUnit: 4px**

---

## TYPOGRAPHY HIERARCHY

**Display / Hero (album cover context — implicit off-screen)**
- Not directly visible in screenshot; MAYHEM label acts as display treatment
- Estimated: ~13px, weight 600, tight tracking (uppercase spaced label)

**Logo / Wordmark — "GAGA"**
- Estimated: ~28–32px cap height
- Weight: custom display/grunge typeface, irregular stroke
- Not part of the text scale — treated as image/brand mark

**Navigation Links ("Latest", "Music", "Shop", etc.)**
- Estimated size: ~13–14px
- Weight: 500 (medium)
- Letter-spacing: ~0.08em (tracked out)
- Line-height: ~1.0 (single line, vertically centered in nav)
- Role: Nav label / UI label

**Announcement Bar Text**
- Estimated size: ~11–12px
- Weight: 600–700 (bold)
- Letter-spacing: ~0.12em (all-caps tracked)
- Role: Caption / notification

**Sidebar Album List ("Harlequin", "Chromatica", etc.)**
- Estimated size: ~14–15px
- Weight: 400 (regular)
- Line-height: ~1.8–2.0 (generous vertical rhythm)
- Role: H3/list item

**Cookie Modal Body Copy**
- Estimated size: ~14px
- Weight: 400
- Line-height: ~1.6
- Role: Body text

**Cookie Modal Buttons**
- Estimated size: ~13px
- Weight: 500
- Role: UI label / CTA

**Derived 8-step type scale (base unit ~13px):**

| Step | Size | Role |
|---|---|---|
| xs | 10px | Fine print, legal |
| sm | 12px | Announcement bar, captions |
| base | 14px | Body text, nav links, list items |
| md | 16px | Subheadings |
| lg | 20px | Section headings |
| xl | 24px | Card titles |
| 2xl | 32px | Page headings |
| 3xl | 40px | Hero display |
| 4xl | 56px | Masthead / oversized display |

---

## VISUAL LANGUAGE

1. **High-contrast art-punk monochrome** — The black-and-white photography, pure black canvas, and white typography create a gallery-grade severity that references zine culture and avant-garde fashion editorials rather than mainstream pop merchandising.

2. **Disrupted-grotesque typographic identity** — The "GAGA" logotype uses a deliberately degraded, irregular stroke weight that signals anti-corporate expressionism; the all-caps spaced nav labels contrast this rawness with cold, Swiss-influenced utility type — a deliberate collision.

3. **Single chromatic puncture** — The orange-red (#FF3D00) is deployed with extreme restraint on an otherwise achromatic canvas. Its sole appearances in the logo and top-bar arrow/glyph make it feel like a branding incision rather than a decorative choice — aggressive and precise.

4. **Sparse vertical drama** — The layout uses extreme negative space (large black zones flanking the hero image) as an active design element. The sidebar list floats in isolation; content is not grid-packed but theatrically staged.

5. **Post-industrial celebrity-artist digital flagship** — This sits between a luxury fashion house's digital editorial (minimal, photographic) and an underground music zine (raw type, dark ground). It is closest to what might be called **editorial neo-goth luxury** — not brutalism, but deliberately unglamorous glamour.

</details>
