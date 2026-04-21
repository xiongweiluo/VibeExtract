# Design Spec — apple.com

> **Extracted:** Tue, 21 Apr 2026 22:36:55 GMT
> **URL:** https://www.apple.com/
> **Paradigm:** e-commerce · **Density:** spacious · **Motif:** clean minimal white-space, centered editorial hierarchy, pill-shaped CTAs, layered product photography, translucent nav backdrop

---

## Visual Weight Verdict

**IMAGE DOMINANT**

This e-commerce storefront is sustained by **large-format photography and imagery**.

### Evidence
- 41 image assets detected (heavy image density)
- Hero section: centered layout — "Apple"
- Card grid: 4-column, flat
- Layout: single-column / nav top-fixed
- Density: spacious (4px base grid)
- Visual hierarchy: editorial

---

## Color Architecture

| Role | Value | Token |
|---|---|---|
| Brand Primary | #0066cc | `#0066cc` |
| Brand Secondary | #1d1d1f | `#1d1d1f` |
| Brand Accent | #0066cc | `#0066cc` |
| Background Page | #f5f5f7 | `#f5f5f7` |
| Background Surface | #f5f5f7 | `#f5f5f7` |
| Background Overlay | rgba(0,0,0,0.5) | rgba(0,0,0,0.5) |
| Text Primary | #1d1d1f | `#1d1d1f` |
| Text Secondary | #6e6e73 | `#6e6e73` |
| Text Inverse | #ffffff | `#ffffff` |
| Border | #e0e0e5 | `#e0e0e5` |
| Status Success | #10B981 | `#10B981` |
| Status Warning | #F59E0B | `#F59E0B` |
| Status Error | #EF4444 | `#EF4444` |

---

## Typography System

**Families:** body — `SF Pro Text, sans-serif` · heading — `SF Pro Display, sans-serif` · mono — `ui-monospace, monospace`

| Level | Size | Line Height |
|---|---|---|
| `xs` | 12px | 1.3 |
| `sm` | 14px | 1.3 |
| `base` | 17px | 1.5 |
| `lg` | 18px | 1.0 |
| `xl` | 24px | 1.2 |
| `2xl` | 34px | 1.5 |
| `3xl` | 34px | 1.5 |
| `4xl` | 34px | 1.5 |

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
| Visual hierarchy | editorial |

---

## Skeleton

| Component | Details |
|---|---|
| Hero | present · centered · "Apple" · 2 CTAs |
| Nav | brand: "Apple" · items: Store, Mac, iPad, iPhone, Watch, Vision |
| Cards | 4-column grid · flat |
| Footer | 1 column |

---

## Physical Measurements

### Spacing (computed CSS)
- **Base unit:** 4px
- **Measured steps:** 4px · 8px · 12px · 16px · 20px · 24px · 28px · 40px · 44px · 84px · 88px
- **Named scale:** xs=4px sm=8px md=16px lg=24px xl=32px 2xl=48px 3xl=64px

### Typography (computed CSS)
- **Root body size:** 12px / 0.7059rem
- **Detected families:** SF Pro Text, SF Pro Display

| px | rem | Line Height | Weight | Letter Spacing | Role |
|---|---|---|---|---|---|
| 12px | 0.7059rem | 1.3 | 600 | -0.12px | body |
| 14px | 0.8235rem | 1.3 | 400 | -0.224px | body-lg |
| 17px | 1rem | 1.5 | 400 | -0.374px | body-lg |
| 18px | 1.0588rem | 1 | 300 | 0px | h5 |
| 24px | 1.4118rem | 1.2 | 600 | 0.216px | h4 |
| 34px | 2rem | 1.5 | 600 | -0.374px | h3 |

---

## Asset Inventory

### Images (41)
- https://www.apple.com/v/home/cm/images/heroes/iphone-family/hero_iphone_family__fuz5j2v5xx6y_large.jpg
- https://www.apple.com/v/home/cm/images/heroes/macbook-neo/hero_macbook_neo__gnm3snkti4a6_large.jpg
- https://www.apple.com/v/home/a/images/logos/ipad-air-m4/hero_logo_ipad_air__ejixj9pic0uq_large.png
- https://www.apple.com/v/home/cm/images/heroes/ipad-air-m4/hero_ipad_air_m4__ew8k92mk1w6e_large.jpg
- https://www.apple.com/v/home/cm/images/promos/community-letter-from-tim/promo_apple_color_logo__co0os9ytesgi_large.jpg
- https://www.apple.com/v/home/a/images/logos/apple-watch-series-11/promo_logo_apple_watch_series_11__d9br21pxygya_large.png
- https://www.apple.com/v/home/cm/images/promos/apple-watch-series-11/promo_apple_watch_series_11__b63hxviqvonm_large.jpg
- https://www.apple.com/v/home/cm/images/promos/macbook-air-m5/promo_macbook_air_m5__dibaetiq7nu6_large.jpg
- https://www.apple.com/v/home/cm/images/promos/airpods-pro-3/promo_airpodspro_3__f6xmza7bglei_large.jpg
- https://www.apple.com/v/home/a/images/logos/iphone-tradein/promo_logo_iphone_tradein__7y3gtai5az66_large.png
- https://www.apple.com/v/home/cm/images/promos/iphone-tradein/promo_iphone_tradein__bugw15ka691e_large.jpg
- https://www.apple.com/v/home/a/images/logos/apple-card/promo_apple_card__5cm7draujpey_large.png
- https://www.apple.com/v/home/cm/images/promos/apple-card/promo_apple_card__5cm7draujpey_large.jpg
- https://is1-ssl.mzstatic.com/image/thumb/Hj0w3h6_8b-NM4nnDwjfzQ/1250x668sr.jpg
- https://www.apple.com/v/home/cj/images/tv-gallery/logo_hero_light__d7t8cya4x26a_small.png
- https://is1-ssl.mzstatic.com/image/thumb/wY4kakhFPvD_8_pKkfu3AA/220x54.png
- https://is1-ssl.mzstatic.com/image/thumb/pa_Dd2CLL-BlWQRqIurClw/1250x668sr.jpg
- https://is1-ssl.mzstatic.com/image/thumb/J7bMKs9REENSizTYepOTeg/220x54.png
- https://is1-ssl.mzstatic.com/image/thumb/Features/v4/5d/6b/8a/5d6b8a24-1ba8-6a08-8596-47d0cadacd5d/fc3f421a-0ae3-48fa-9cfc-bf3c4f6240e2.png/1250x668sr.jpg
- https://is1-ssl.mzstatic.com/image/thumb/Features221/v4/f0/ac/1e/f0ac1e58-0027-49d0-378e-68470edfb0ec/3b7d6fac-0061-401c-9716-742245053fd0.png/220x54.png
_…and 21 more_

### Inline SVGs (10 captured)
_Raw <svg> source — icons, logos, illustrations. Embed directly in generated HTML._

<details><summary>SVG #1 (344 chars)</summary>

```html
<svg width="18" height="18" viewBox="0 0 18 18"><polyline fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" points="3.5 15, 15 3.5"></polyline><polyline fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" points="3.5 3.5, 15 15"></polyline></svg>
```

</details>
<details><summary>SVG #2 (381 chars)</summary>

```html
<svg height="48" viewBox="0 0 9 48" width="9" xmlns="http://www.w3.org/2000/svg"><path d="m1.5618 24.0621 6.5581-6.4238c.2368-.2319.2407-.6118.0088-.8486-.2324-.2373-.6123-.2407-.8486-.0088l-7 6.8569c-.1157.1138-.1807.2695-.1802.4316.001.1621.0674.3174.1846.4297l7 6.7241c.1162.1118.2661.1675.4155.1675.1577 0 .3149-.062.4326-.1846.2295-.2388.2222-.6187-.0171-.8481z"></path></svg>
```

</details>
<details><summary>SVG #3 (749 chars)</summary>

```html
<svg height="44" viewBox="0 0 14 44" width="14" xmlns="http://www.w3.org/2000/svg"><path d="m13.0729 17.6825a3.61 3.61 0 0 0 -1.7248 3.0365 3.5132 3.5132 0 0 0 2.1379 3.2223 8.394 8.394 0 0 1 -1.0948 2.2618c-.6816.9812-1.3943 1.9623-2.4787 1.9623s-1.3633-.63-2.613-.63c-1.2187 0-1.6525.6507-2.644.6507s-1.6834-.9089-2.4787-2.0243a9.7842 9.7842 0 0 1 -1.6628-5.2776c0-3.0984 2.014-4.7405 3.9969-4.7405 1.0535 0 1.9314.6919 2.5924.6919.63 0 1.6112-.7333 2.8092-.7333a3.7579 3.7579 0 0 1 3.1604 1.5802zm-3.7284-2.8918a3.5615 3.5615 0 0 0 .8469-2.22 1.5353 1.5353 0 0 0 -.031-.32 3.5686 3.5686 0 0 0 -2.3445 1.2084 3.4629 3.4629 0 0 0 -.8779 2.1585 1.419 1.419 0 0 0 .031.2892 1.19 1.19 0 0 0 .2169.0207 3.0935 3.0935 0 0 0 2.1586-1.1368z"></path></svg>
```

</details>
<details><summary>SVG #4 (762 chars)</summary>

```html
<svg height="48" viewBox="0 0 17 48" width="17" xmlns="http://www.w3.org/2000/svg"><path d="m15.5752 19.0792a4.2055 4.2055 0 0 0 -2.01 3.5376 4.0931 4.0931 0 0 0 2.4908 3.7542 9.7779 9.7779 0 0 1 -1.2755 2.6351c-.7941 1.1431-1.6244 2.2862-2.8878 2.2862s-1.5883-.734-3.0443-.734c-1.42 0-1.9252.7581-3.08.7581s-1.9611-1.0589-2.8876-2.3584a11.3987 11.3987 0 0 1 -1.9373-6.1487c0-3.61 2.3464-5.523 4.6566-5.523 1.2274 0 2.25.8062 3.02.8062.734 0 1.8771-.8543 3.2729-.8543a4.3778 4.3778 0 0 1 3.6822 1.841zm-6.8586-2.0456a1.3865 1.3865 0 0 1 -.2527-.024 1.6557 1.6557 0 0 1 -.0361-.337 4.0341 4.0341 0 0 1 1.0228-2.5148 4.1571 4.1571 0 0 1 2.7314-1.4078 1.7815 1.7815 0 0 1 .0361.373 4.1487 4.1487 0 0 1 -.9867 2.587 3.6039 3.6039 0 0 1 -2.5148 1.3236z"></path></svg>
```

</details>
<details><summary>SVG #5 (1446 chars)</summary>

```html
<svg height="44" viewBox="0 0 30 44" width="30" xmlns="http://www.w3.org/2000/svg"><path d="m26.5679 20.4629c1.002 0 1.67.738 1.693 1.857h-3.48c.076-1.119.779-1.857 1.787-1.857zm2.754 2.672v-.387c0-1.963-1.037-3.176-2.742-3.176-1.735 0-2.848 1.289-2.848 3.276 0 1.998 1.096 3.263 2.848 3.263 1.383 0 2.367-.668 2.66-1.746h-1.008c-.264.557-.814.856-1.629.856-1.072 0-1.769-.791-1.822-2.039v-.047zm-9.547-3.451h.96v.937h.094c.188-.615.914-1.049 1.752-1.049.164 0 .375.012.504.03v1.007c-.082-.023-.445-.058-.644-.058-.961 0-1.659 1.098-1.659 1.535v3.914h-1.007zm-4.27 5.519c-1.195 0-1.869-.867-1.869-2.361 0-1.5.674-2.361 1.869-2.361 1.196 0 1.87.861 1.87 2.361 0 1.494-.674 2.361-1.87 2.361zm0-5.631c-1.798 0-2.912 1.237-2.912 3.27 0 2.027 1.114 3.269 2.912 3.269 1.799 0 2.913-1.242 2.913-3.269 0-2.033-1.114-3.27-2.913-3.27zm-5.478-1.475v1.635h1.407v.843h-1.407v3.575c0 .744.282 1.06.938 1.06.182 0 .281-.006.469-.023v.849c-.199.035-.393.059-.592.059-1.301 0-1.822-.481-1.822-1.688v-3.832h-1.02v-.843h1.02v-1.635zm-8.103 5.694c.129.885.973 1.447 2.174 1.447 1.137 0 1.975-.615 1.975-1.453 0-.72-.527-1.177-1.693-1.47l-1.084-.282c-1.53-.386-2.192-1.078-2.192-2.279 0-1.436 1.201-2.408 2.988-2.408 1.635 0 2.854.972 2.942 2.338h-1.061c-.146-.867-.861-1.383-1.916-1.383-1.125 0-1.869.562-1.869 1.418 0 .662.463 1.043 1.629 1.342l.885.234c1.752.439 2.455 1.119 2.455 2.361 0 1.553-1.225 2.543-3.158 2.543-1.793 0-3.03-.949-3.141-2.408z"></path></svg>
```

</details>
<details><summary>SVG #6 (220 chars)</summary>

```html
<svg height="48" viewBox="0 0 9 48" width="9" xmlns="http://www.w3.org/2000/svg"><path d="m8.1155 30.358a.6.6 0 1 1 -.831.8653l-7-6.7242a.6.6 0 0 1 -.0045-.8613l7-6.8569a.6.6 0 1 1 .84.8574l-6.5582 6.4238z"></path></svg>
```

</details>
<details><summary>SVG #7 (379 chars)</summary>

```html
<svg height="10" viewBox="0 0 10 10" width="10" xmlns="http://www.w3.org/2000/svg"><path d="m4.6725 6.635-2.655-2.667a.445.445 0 0 1 -.123-.304.4331.4331 0 0 1 .427-.439h.006a.447.447 0 0 1 .316.135l2.357 2.365 2.356-2.365a.458.458 0 0 1 .316-.135.433.433 0 0 1 .433.433v.006a.4189.4189 0 0 1 -.123.3l-2.655 2.671a.4451.4451 0 0 1 -.327.14.464.464 0 0 1 -.328-.14z"></path></svg>
```

</details>
<details><summary>SVG #8 (401 chars)</summary>

```html
<svg height="48" viewBox="0 0 9 48" width="9" xmlns="http://www.w3.org/2000/svg"><path d="m7.4382 24.0621-6.5581-6.4238c-.2368-.2319-.2407-.6118-.0088-.8486.2324-.2373.6123-.2407.8486-.0088l7 6.8569c.1157.1138.1807.2695.1802.4316-.001.1621-.0674.3174-.1846.4297l-7 6.7242c-.1162.1118-.2661.1675-.4155.1675-.1577 0-.3149-.062-.4326-.1846-.2295-.2388-.2222-.6187.0171-.8481l6.5537-6.2959z"></path></svg>
```

</details>
<details><summary>SVG #9 (1026 chars)</summary>

```html
<svg height="44" viewBox="0 0 23 44" width="23" xmlns="http://www.w3.org/2000/svg"><path d="m8.1558 25.9987v-6.457h-.0703l-2.666 6.457h-.8907l-2.666-6.457h-.0703v6.457h-.9844v-8.4551h1.2246l2.8945 7.0547h.0938l2.8945-7.0547h1.2246v8.4551zm2.5166-1.7696c0-1.1309.832-1.7812 2.3027-1.8691l1.8223-.1113v-.5742c0-.7793-.4863-1.207-1.4297-1.207-.7559 0-1.2832.2871-1.4238.7852h-1.0195c.1348-1.0137 1.1309-1.6816 2.4785-1.6816 1.541 0 2.4023.791 2.4023 2.1035v4.3242h-.9609v-.9318h-.0938c-.4102.6738-1.1016 1.043-1.9453 1.043-1.2246 0-2.1328-.7266-2.1328-1.8809zm4.125-.5859v-.5801l-1.6992.1113c-.9609.0645-1.3828.3984-1.3828 1.0312 0 .6445.5449 1.0195 1.2773 1.0195 1.0371.0001 1.8047-.6796 1.8047-1.5819zm6.958-2.0273c-.1641-.627-.7207-1.1367-1.6289-1.1367-1.1367 0-1.8516.9082-1.8516 2.3379 0 1.459.7266 2.3848 1.8516 2.3848.8496 0 1.4414-.3926 1.6289-1.1074h1.0195c-.1816 1.1602-1.125 2.0156-2.6426 2.0156-1.7695 0-2.9004-1.2832-2.9004-3.293 0-1.9688 1.125-3.2461 2.8945-3.2461 1.5352 0 2.4727.9199 2.6484 2.0449z"></path></svg>
```

</details>
<details><summary>SVG #10 (220 chars)</summary>

```html
<svg height="48" viewBox="0 0 9 48" width="9" xmlns="http://www.w3.org/2000/svg"><path d="m8.1155 30.358a.6.6 0 1 1 -.831.8653l-7-6.7242a.6.6 0 0 1 -.0045-.8613l7-6.8569a.6.6 0 1 1 .84.8574l-6.5582 6.4238z"></path></svg>
```

</details>

---

## Design Critique (AI Phase 1)

<details>
<summary>Expand raw critique</summary>

## SECTION INVENTORY

| # | Name | Vertical Span | Z-Layer | Background | Dominant Visual |
|---|------|--------------|---------|------------|-----------------|
| 1 | **nav** | 0–5% | floating (sticky/fixed) | solid-color `#f5f5f7` (near-white) | interactive-controls (links + icons) |
| 2 | **promo-banner** | 5–8% | base | solid-color `#f5f5f7` | typography (thin text + CTA link) |
| 3 | **hero (iPhone)** | 8–88% | base | solid-color `#f5f5f7` | imagery + typography + interactive-controls |
| 4 | **hero-2 (MacBook Neo teaser)** | 88–100% | base | solid-color `#f5f5f7` | typography (partial, clipped) |

---

## SPATIAL GRID ANALYSIS

### Navigation Bar
- **Layout engine:** Flexbox (horizontal, center-aligned)
- **Column count:** ~12 items (Apple logo + 9 nav labels + search + bag icons)
- **Gap size:** Uniform spacing between nav items ≈ 24px–28px (Physical Data `lg=24px` / 28px scale)
- **Item pattern:** fluid (text links auto-width, icons fixed)
- **Z-index tier:** floating — sticky/fixed, z-index likely `z=9999` or equivalent top-layer nav
- **Position type:** `position: fixed` (sticky nav pattern consistent with Apple.com)

### Promo Banner
- **Layout engine:** Flexbox, single row, centered
- **Column count:** 1 (single centered line of text)
- **Gap size:** Inline gap between text and link ≈ 4px (`xs`)
- **Item pattern:** fluid width, centered
- **Note:** Thin horizontal band; acts as a secondary announcement row below the nav

### Hero Section (iPhone)
- **Layout engine:** Flexbox column (centered vertical stack: heading → subheading → buttons → product image)
- **Column count:** 1 column (stacked)
- **Gap size:**
  - Heading → subheading: ≈ 8px (`sm`)
  - Subheading → buttons: ≈ 24px (`lg`)
  - Button → button gap: ≈ 16px (`md`)
  - Buttons → image: ≈ 44px+ (Physical Data `44px` named step)
- **Item pattern:** fluid width (text centered, image spans ~55% of viewport width)
- **CTA Buttons:** Two side-by-side pill buttons (Flexbox row, gap ≈ 16px `md`)
  - "Learn more" — filled blue pill
  - "Shop iPhone" — outlined blue pill
- **Product Image:** Three iPhones (dark navy, white, pink) overlapping in a layered cascade, image appears as a single wide asset, bottom-clipped, spanning roughly 340px–930px horizontally

---

## ASSET AUDIT

- **Hero background:** No image asset — solid `#f5f5f7` color fill (or near-white gray). No gradient detected.
- **Logo/brand:** Inline SVG — Apple logo (filled black  mark) at far left of nav. Text-only nav links follow.
- **Card images:** No card grid present in this viewport. Single hero product image detected:
  - Three iPhones (Pro in dark navy, standard in white, standard in pink blush) rendered as one wide composite asset. URL not resolvable from Physical Data — **no asset URL confirmed in Physical Data.**
- **Nav icons:**
  - Search icon: inline SVG (magnifying glass)
  - Bag icon: inline SVG (shopping bag)
  - Inline SVG count: ≥ 3 (Apple logo + search + bag)
- **Icon set:** Apple system inline-SVGs; no external icon font detected.
- **Hero bg:** `none detected` (solid color only)
- **MacBook Neo section image:** Not yet visible (below fold) — **no asset confirmed.**

> ⚠️ Physical Data provides no image URLs. All asset references above are visually inferred only. Marking all image assets as **"no asset URL found in Physical Data."**

---

## COLOR SEMANTICS

| Observed Hex | Semantic Role | Evidence |
|---|---|---|
| `#f5f5f7` | **Neutral-Base / Neutral-Surface** | Full page background, nav background, promo banner background |
| `#1d1d1f` | **Text-Main** | Nav link labels ("Store", "Mac", "iPad"…), hero heading "iPhone", hero subheading |
| `#6e6e73` | **Text-Muted** | Promo banner body text ("Recycle an eligible device…") |
| `#0066cc` | **Brand-Primary** | "Learn more" filled button background; "Find a store ›" promo link text; "Shop iPhone" outlined button border + text |
| `#ffffff` | **Text-Inverse** | "Learn more" button label text (white on blue fill) |
| `#0066cc` (outline) | **Brand-Accent** | "Shop iPhone" button — transparent fill, blue border + blue text |
| `#1d1d1f` | **Neutral-Overlay (icon fill)** | Apple logo SVG, search icon, bag icon in nav |
| `#f5f5f7` (approx `#f0f0f2`) | **Border-Default** | Subtle hairline separator between nav and promo banner (visually near-invisible) |

> **Discrepancy note:** Physical Data's typography scale tops out at `34px` (h3, weight 600) but the "iPhone" hero heading visually appears larger (estimated ~56–64px). This suggests the hero uses a display size **not listed in the Physical Data type scale** — likely an unlisted `56px` or `64px` step specific to the hero component. Physical Data's scale should be treated as the body/component scale, not the full typographic range for marketing headers.

</details>
