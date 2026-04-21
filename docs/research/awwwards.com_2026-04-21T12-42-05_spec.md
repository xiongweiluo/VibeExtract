# Design Spec — awwwards.com

> **Extracted:** Tue, 21 Apr 2026 12:42:05 GMT
> **URL:** https://www.awwwards.com/
> **Paradigm:** content-site · **Density:** comfortable · **Motif:** editorial typographic hierarchy, warm cream surface, high-contrast dark headlines, pill-based floating navigation, overlay cookie consent

---

## Visual Weight Verdict

**TYPE DOMINANT**

This content / editorial site is sustained by **editorial typography and text hierarchy**.

### Evidence
- 28 image assets detected (heavy image density)
- 17 SVG assets detected
- Hero section: centered layout — "RUINART – DIGITAL FRESCO"
- Card grid: 4-column, flat
- Layout: single-column / nav top-fixed
- Density: comfortable (4px base grid)
- Visual hierarchy: editorial

---

## Color Architecture

| Role | Value | Token |
|---|---|---|
| Brand Primary | #1a1a1a | `#1a1a1a` |
| Brand Secondary | #f0ede5 | `#f0ede5` |
| Brand Accent | #c8a96e | `#c8a96e` |
| Background Page | #ffffff | `#ffffff` |
| Background Surface | #f0ede5 | `#f0ede5` |
| Background Overlay | rgba(26,26,26,0.95) | rgba(26,26,26,0.95) |
| Text Primary | #1a1a1a | `#1a1a1a` |
| Text Secondary | #6b6b6b | `#6b6b6b` |
| Text Inverse | #ffffff | `#ffffff` |
| Border | #e8e4dc | `#e8e4dc` |
| Status Success | #10B981 | `#10B981` |
| Status Warning | #F59E0B | `#F59E0B` |
| Status Error | #EF4444 | `#EF4444` |

---

## Typography System

**Families:** body — `'Inter Tight', sans-serif` · heading — `'Inter Tight', sans-serif` · mono — `ui-monospace, monospace`

| Level | Size | Line Height |
|---|---|---|
| `xs` | 12px | 1.4 |
| `sm` | 14px | 2 |
| `base` | 15px | 1.9 |
| `lg` | 16px | 1.8 |
| `xl` | 19px | 1.4 |
| `2xl` | 21px | 1.4 |
| `3xl` | 24px | 1.2 |
| `4xl` | 42px | 1.2 |

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
| Dominant element | typography |
| Visual hierarchy | editorial |

---

## Skeleton

| Component | Details |
|---|---|
| Hero | present · centered · "RUINART – DIGITAL FRESCO" · 5 CTAs |
| Nav | brand: "W." · items: Directory, Academy New, Jobs, Market |
| Cards | 4-column grid · flat |
| Footer | 1 column |

---

## Physical Measurements

### Spacing (computed CSS)
- **Base unit:** 4px
- **Measured steps:** 4px · 8px · 12px · 16px · 20px · 24px · 28px · 32px · 36px · 40px · 44px · 60px · 72px · 88px
- **Named scale:** xs=4px sm=8px md=16px lg=24px xl=32px 2xl=48px 3xl=64px

### Typography (computed CSS)
- **Root body size:** 14px / 1rem
- **Detected families:** Inter Tight

| px | rem | Line Height | Weight | Letter Spacing | Role |
|---|---|---|---|---|---|
| 14px | 1rem | 2 | 300 | 0px | body |
| 15px | 1.0714rem | 1.9 | 300 | 0px | body |
| 16px | 1.1429rem | 1.8 | 300 | 0px | body |
| 19px | 1.3571rem | 1.4 | 400 | 0px | body-lg |
| 21px | 1.5rem | 1.4 | 300 | 0px | h5 |
| 24px | 1.7143rem | 1.2 | 600 | 0px | h5 |
| 42px | 3rem | 1.2 | 600 | 0px | h3 |

---

## Asset Inventory

### Images (28)
- https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/91248/5efde8faf1863018724963.jpg
- https://assets.awwwards.com/awards/submissions/2026/03/69a81e0282e52310686463.png
- https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/2482835/67c04f0b4e746484621302.jpg
- https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/823920/61dc2f7ead629393128666.jpg
- https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/248526/58889c33e1d7d.jpg
- https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/2045657/69d61005a9f43684092777.png
- https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/2836708/69a5f56baeac9560713102.jpg
- https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/1862420/69b276ce1b219018025014.jpg
- https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/526356/5ff6280f5b09a657368151.jpg
- https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/196723/61ee922d628f8653913881.jpg
- https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/2126921/699768682510a975030261.png
- https://assets.awwwards.com/awards/media/cache/thumb_user_70/default/user1.jpg
- https://assets.awwwards.com/awards/media/cache/thumb_user_70/default/user4.jpg
- https://assets.awwwards.com/awards/media/cache/thumb_user_70/default/user5.jpg
- https://assets.awwwards.com/awards/media/cache/thumb_user_70/default/user7.jpg
- https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/976218/5f776c422d1a0739987692.
- https://assets.awwwards.com/awards/media/cache/thumb_user_retina/avatar/479425/611a5aef3b6d8506182006.jpeg
- https://assets.awwwards.com/awards/media/cache/thumb_user_retina/avatar/73948/5a4bcf5814d88.png
- https://assets.awwwards.com/awards/media/cache/thumb_user_retina/avatar/172554/6717ae6967c19281858219.jpg
- https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/5625/51a9b1b0334ec.jpeg
_…and 8 more_

### External SVGs (17)
- https://www.awwwards.com/assets/redesign/images/sprite-icons.svg?v=3#hamburger
- https://www.awwwards.com/assets/redesign/images/sprite-icons.svg?v=3#arrow-dd
- https://www.awwwards.com/assets/redesign/images/sprite-icons.svg?v=3#wheat
- https://www.awwwards.com/assets/redesign/images/sprite-icons.svg?v=3#flame
- https://www.awwwards.com/assets/redesign/images/sprite-icons.svg?v=3#geometric-1
- https://www.awwwards.com/assets/redesign/images/sprite-icons.svg?v=3#geometric-2
- https://www.awwwards.com/assets/redesign/images/sprite-icons.svg?v=3#geometric-3
- https://www.awwwards.com/assets/redesign/images/sprite-icons.svg?v=3#geometric-4
- https://www.awwwards.com/assets/redesign/images/sprite-icons.svg?v=3#facebook
- https://www.awwwards.com/assets/redesign/images/sprite-icons.svg?v=3#instagram
- https://www.awwwards.com/assets/redesign/images/sprite-icons.svg?v=3#twitter
- https://www.awwwards.com/assets/redesign/images/sprite-icons.svg?v=3#youtube
- https://www.awwwards.com/assets/redesign/images/sprite-icons.svg?v=3#tiktok
- https://www.awwwards.com/assets/redesign/images/sprite-icons.svg?v=3#lupe
- https://www.awwwards.com/assets/redesign/images/sprite-icons.svg?v=3#user-login
- https://www.awwwards.com/assets/redesign/images/sprite-icons.svg?v=3#arrow
- https://www.awwwards.com/assets/redesign/images/sprite-icons.svg?v=3#close

### Inline SVGs (4 captured)
_Raw <svg> source — icons, logos, illustrations. Embed directly in generated HTML._

<details><summary>SVG #1 (325 chars)</summary>

```html
<svg width="30" height="16" viewBox="0 0 30 16"><path d="m18.4 0-2.803 10.855L12.951 0H9.34L6.693 10.855 3.892 0H0l5.012 15.812h3.425l2.708-10.228 2.709 10.228h3.425L22.29 0h-3.892ZM24.77 13.365c0 1.506 1.12 2.635 2.615 2.635C28.879 16 30 14.87 30 13.365c0-1.506-1.12-2.636-2.615-2.636s-2.615 1.13-2.615 2.636Z"></path></svg>
```

</details>
<details><summary>SVG #2 (295 chars)</summary>

```html
<svg class="ico--left" width="14" viewBox="0 0 20 17">
                            <path d="M17.8246 7.4299H0V9.29145H17.8246L12.2047 16L13.6589 16.8982L19.4269 10.0128C20.191 9.10064 20.191 7.61838 19.4269 6.70622L13.809 0L12.3548 0.89587L17.8246 7.4299Z"></path>
                        </svg>
```

</details>
<details><summary>SVG #3 (397 chars)</summary>

```html
<svg width="14" height="14" viewBox="0 0 14 14">
                                <path d="M10.8101 1.96222L0.726954 12.0453L1.66171 12.9801L11.7448 2.89698L11.9344 9.4447L13.208 9.07311L13.0134 2.35278C12.9877 1.46249 12.2434 0.718185 11.3531 0.692412L4.80762 0.502924L4.43487 1.77539L10.8101 1.96222Z" fill="white" stroke="white" stroke-width="0.542084"></path>
                            </svg>
```

</details>
<details><summary>SVG #4 (1205 chars)</summary>

```html
<svg width="15" height="18" viewBox="0 0 15 18">
                            <path d="M11.7746 1.00195H3.21618C1.99236 1.00195 0.996094 2.07031 0.996094 3.38268V14.6912C0.996094 15.7744 1.44566 16.5511 2.26154 16.8755C2.47384 16.9603 2.70001 17.002 2.92896 17.002C3.14403 17.002 3.36188 16.9648 3.57278 16.8889C3.78369 16.813 4.24436 16.566 4.38034 16.4916L7.4954 14.2299H7.49678L8.48611 13.5112L7.81592 13.0246L7.49401 12.7925L3.84613 15.4456C3.60608 15.575 3.30776 15.7268 3.21896 15.7595C2.95949 15.8532 2.74996 15.7982 2.64867 15.758C2.39613 15.6568 2.10614 15.4441 2.10614 14.6882V3.37971C2.10614 2.72352 2.60427 2.18934 3.21618 2.18934H11.7746C12.3865 2.18934 12.8847 2.72352 12.8847 3.37971V14.6882C12.8847 15.4441 12.5947 15.6568 12.3421 15.758C12.2408 15.7982 12.0313 15.8532 11.7718 15.7595C11.683 15.7283 11.3847 15.575 11.1447 15.4456L9.92639 14.5587L8.93707 15.2774L10.5508 16.4514L10.6118 16.4901C10.7478 16.5645 11.2085 16.8115 11.4194 16.8874C11.8523 17.0436 12.3172 17.0377 12.7306 16.874C13.5465 16.5481 13.9961 15.7729 13.9961 14.6897V3.38119C13.9947 2.0703 12.9984 1.00195 11.7746 1.00195Z" fill="white" stroke="white" stroke-width="0.542084"></path>
                            </svg>
```

</details>

---

## Design Critique (AI Phase 1)

<details>
<summary>Expand raw critique</summary>

# Layout Analysis: Awwwards Site of the Day Page (Ruinart – Digital Fresco)

---

## SECTION INVENTORY

| # | Name | Vertical Span | Z-Layer | Background | Dominant Visual |
|---|------|--------------|---------|------------|-----------------|
| 1 | **nav** | 0–8% | floating (fixed/sticky) | solid-color `#ffffff` | interactive-controls |
| 2 | **hero / metadata** | 8–52% | base | solid-color `#f0ede8` (off-white/cream) | typography |
| 3 | **site-preview** | 52–100% | base | image (Ruinart website screenshot/embed) | imagery |
| 4 | **floating-subnav** | ~90–100% | floating (fixed bottom) | solid-color `#1a1a1a` (near-black) | interactive-controls |
| 5 | **cookie-banner** | ~77–100% (right side) | overlay | solid-color `#ffffff` | typography + interactive-controls |

---

## SPATIAL GRID ANALYSIS

### Nav Bar (Section 1)
- **Layout engine:** Flexbox (horizontal row)
- **Column count:** 3 zones — Left (logo), Center (nav links + search), Right (auth CTAs)
- **Gap size:** approximately `lg = 24px` between primary nav links; `md = 16px` between auth buttons
- **Item pattern:** fluid (stretches to fill viewport width)
- **Floating note:** `position: fixed` or `sticky`, z-index likely ≥ 100 (floats above hero content)

### Hero Metadata Row (Section 2 — top metadata strip)
- **Layout engine:** Flexbox (inline horizontal)
- **Column count:** 3 inline items — "Site of the Day" label | date badge | "Score 7.32 of 10"
- **Gap size:** `md = 16px` between items, date badge has border/outline treatment
- **Item pattern:** fixed-width labels

### Hero Typography Block
- **Layout engine:** block (centered text)
- **Column count:** 1 (single centered column)
- **Gap size:** vertical spacing between headline lines ~`xl = 32px` (implicit line-height from `42px` type at `lh:1.2`)
- **Item pattern:** fluid width

### Author Attribution Row
- **Layout engine:** Flexbox (inline centered)
- **Column count:** 2 items — avatar circle + username + "PRO" badge
- **Gap size:** `sm = 8px` between avatar and text
- **Item pattern:** fixed

### Floating Bottom Subnav (Section 4)
- **Layout engine:** Flexbox (horizontal row)
- **Column count:** Visible items: W. logo pill | Nominees | Courses | Collections | Directory | Market | (more cut off)
- **Gap size:** `xs = 4px` to `sm = 8px` between pills
- **Item pattern:** fixed-width pill/chip buttons
- **Z-index tier:** overlay tier, `position: fixed; bottom: 0` — above site preview content

### Cookie Banner (Section 5)
- **Layout engine:** block (vertical stack)
- **Position:** `position: fixed`, right-bottom anchored
- **Z-index tier:** highest overlay tier (modal-level, renders above all other elements)
- **Item pattern:** text block + "GOT IT" button

---

## ASSET AUDIT

- **Hero bg:** Solid cream/off-white background color — no image asset detected for upper hero area. Lower preview section uses the Ruinart website screenshot as imagery.
- **Logo/brand (Awwwards):** Text-only brand — `W.` rendered as styled text/inline SVG in top-left nav and floating subnav pill. No external image URL found in Physical Data.
- **Card images:** No card grid present in this viewport. The Ruinart website preview image (champagne bottle + fresco/vineyard illustration) is visible in the lower 48% of the viewport — no confirmed URL from Physical Data assets.
- **Author avatar:** Small circular avatar for `makemepulse` user — inline image, no confirmed URL from Physical Data.
- **Icon set:** Search icon (magnifying glass) in nav search bar — inline SVG. Chevron/dropdown indicator on "Explore" nav item — inline SVG. Count: ~2 inline SVGs detected visually.

> **No asset URLs were provided in Physical Data. All asset references above are marked as "no asset found" per Physical Data rules.**

---

## COLOR SEMANTICS

| Observed Hex | Semantic Role | Evidence |
|---|---|---|
| `#ffffff` | **Neutral-Base** | Nav background, cookie banner background |
| `#f0ede5` *(estimated)* | **Neutral-Surface** | Hero section background — cream/warm off-white |
| `#1a1a1a` | **Text-Main** | Headline "RUINART – DIGITAL FRESCO", nav links, body text |
| `#1a1a1a` | **Neutral-Overlay** | Floating bottom subnav background (near-black pill bar) |
| `#ffffff` | **Text-Inverse** | Floating subnav link labels (white text on dark bar) |
| `#000000` | **Brand-Primary** | "Be Pro" button background, Awwwards "W." logo |
| `#ffffff` | **Text-Inverse** | "Be Pro" button label text |
| `#f5f0e8` *(estimated)* | **Neutral-Surface** | Date badge border/outlined chip ("Apr 21, 2026") |
| `#6b6b6b` *(estimated)* | **Text-Muted** | "Site of the Day" label, "Score 7.32 of 10" secondary text |
| `#c8a96e` *(estimated)* | **Brand-Accent** | "Submit Website" button border (outlined style, golden/amber border) |
| `#e8e4dc` *(estimated)* | **Border-Default** | Date badge outline, input field border on search bar |
| `#f5f0ec` | **Neutral-Surface** | Cookie banner subtle background (pure white with possible shadow) |
| `#1a1a1a` | **Text-Main** | Cookie banner body text |

### Typography Mapping (Physical Data → Visual)
| Role | px | Weight | Applied To |
|---|---|---|---|
| `h3` | 42px | 600 | "RUINART – DIGITAL FRESCO" headline |
| `body` | 14px | 300 | Nav links, cookie text, metadata labels |
| `body-lg` | 19px | 400 | "makemepulse" author name |
| `h5` | 24px | 600 | "Be Pro" / CTA button labels |
| `h5` | 21px | 300 | Secondary nav / subnav labels |

</details>
