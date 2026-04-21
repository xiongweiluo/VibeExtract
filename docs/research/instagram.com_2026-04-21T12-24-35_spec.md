# Design Spec — instagram.com

> **Extracted:** Tue, 21 Apr 2026 12:24:35 GMT
> **URL:** https://www.instagram.com/
> **Paradigm:** social-feed · **Density:** comfortable · **Motif:** gradient-brand-ring, split-panel-auth, photo-collage-hero, minimal-white-surface, facebook-federated-login

---

## Visual Weight Verdict

**GRID DOMINANT**

This social feed is sustained by **a structured card grid and data density**.

### Evidence
- 1 image asset detected (light image density)
- Hero section: split layout — "See everyday moments from your close friends."
- Layout: multi-column / nav minimal
- Density: comfortable (4px base grid)
- Visual hierarchy: functional

---

## Color Architecture

| Role | Value | Token |
|---|---|---|
| Brand Primary | #0095f6 | `#0095f6` |
| Brand Secondary | #1877f2 | `#1877f2` |
| Brand Accent | #dd2a7b | `#dd2a7b` |
| Background Page | #ffffff | `#ffffff` |
| Background Surface | #ffffff | `#ffffff` |
| Background Overlay | rgba(0,0,0,0.5) | rgba(0,0,0,0.5) |
| Text Primary | #262626 | `#262626` |
| Text Secondary | #737373 | `#737373` |
| Text Inverse | #ffffff | `#ffffff` |
| Border | #dbdbdb | `#dbdbdb` |
| Status Success | #10B981 | `#10B981` |
| Status Warning | #F59E0B | `#F59E0B` |
| Status Error | #EF4444 | `#EF4444` |

---

## Typography System

**Families:** body — `-apple-system, 'Instagram Sans Regular', sans-serif` · heading — `-apple-system, 'Instagram Sans Regular', sans-serif` · mono — `ui-monospace, monospace`

| Level | Size | Line Height |
|---|---|---|
| `xs` | 13px | 1.2 |
| `sm` | 14px | 1.3 |
| `base` | 15px | 1.2 |
| `lg` | 16px | 1.3 |
| `xl` | 17px | 1.3 |
| `2xl` | 24px | 1.3 |
| `3xl` | 40px | 1.6 |
| `4xl` | 40px | 1.6 |

---

## Spacing

- **Base unit:** 4px
- **Scale:** xs=4px · sm=8px · md=16px · lg=24px · xl=32px · 2xl=48px · 3xl=64px

---

## Site Architecture

| Property | Value |
|---|---|
| Paradigm | social-feed |
| Layout | multi-column |
| Nav position | minimal |
| Density | comfortable |
| Dominant element | typography |
| Visual hierarchy | functional |

---

## Skeleton

| Component | Details |
|---|---|
| Hero | present · split · "See everyday moments from your close friends." · 0 CTAs |
| Nav | brand: "Instagram" · items: — |
| Cards | not detected |
| Footer | 1 column |

---

## Physical Measurements

### Spacing (computed CSS)
- **Base unit:** 4px
- **Measured steps:** 4px · 8px · 12px · 16px · 20px · 24px · 32px · 40px · 52px · 120px
- **Named scale:** xs=4px sm=8px md=16px lg=24px xl=32px 2xl=48px 3xl=64px

### Typography (computed CSS)
- **Root body size:** 15px / 0.9375rem
- **Detected families:** -apple-system, Instagram Sans Regular, Optimistic

| px | rem | Line Height | Weight | Letter Spacing | Role |
|---|---|---|---|---|---|
| 13px | 0.8125rem | 1.2 | 400 | 0px | body-sm |
| 14px | 0.875rem | 1.3 | 600 | 0px | body |
| 15px | 0.9375rem | 1.2 | 400 | 0px | body |
| 16px | 1rem | 1.3 | 700 | 0px | body |
| 17px | 1.0625rem | 1.3 | 600 | 0px | body |
| 24px | 1.5rem | 1.3 | 700 | 0px | h5 |
| 40px | 2.5rem | 1.6 | 400 | 0px | h3 |

---

## Asset Inventory

### Images (1)
- https://static.cdninstagram.com/rsrc.php/yN/r/-erGonz07kB.webp

### Inline SVGs (10 captured)
_Raw <svg> source — icons, logos, illustrations. Embed directly in generated HTML._

<details><summary>SVG #1 (466 chars)</summary>

```html
<svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" class="x1lliihq x2lah0s x1k90msu x2h7rmj x1qfuztq xvpmsi5 xlup9mm x1kky2od"><path d="M22 12.037C22 6.494 17.523 2 12 2S2 6.494 2 12.037c0 4.707 3.229 8.656 7.584 9.741v-6.674H7.522v-3.067h2.062v-1.322c0-3.416 1.54-5 4.882-5 .634 0 1.727.125 2.174.25v2.78a12.807 12.807 0 0 0-1.155-.037c-1.64 0-2.273.623-2.273 2.244v1.085h3.266l-.56 3.067h-2.706V22C18.164 21.4 22 17.168 22 12.037z"></path></svg>
```

</details>
<details><summary>SVG #2 (4523 chars)</summary>

```html
<svg aria-label="Meta 徽标" class="x1kpxq89 x1247r65" role="img" viewBox="0 0 500 100"><defs><linearGradient gradientUnits="userSpaceOnUse" id="_R_59d9lplkldcpbn6b5ipamH1_" x1="124.38" x2="160.839" y1="99" y2="59.326"><stop offset=".427" stop-color="#0278F1"></stop><stop offset=".917" stop-color="#0180FA"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="_R_59d9lplkldcpbn6b5ipamH2_" x1="42" x2="-1.666" y1="4.936" y2="61.707"><stop offset=".427" stop-color="#0165E0"></stop><stop offset=".917" stop-color="#0180FA"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="_R_59d9lplkldcpbn6b5ipamH3_" x1="27.677" x2="132.943" y1="28.71" y2="71.118"><stop stop-color="#0064E0"></stop><stop offset=".656" stop-color="#0066E2"></stop><stop offset="1" stop-color="#0278F1"></stop></linearGradient></defs><path class="xt3erj5" d="M185.508 3.01h18.704l31.803 57.313L267.818 3.01h18.297v94.175h-15.264v-72.18l-27.88 49.977h-14.319l-27.88-49.978v72.18h-15.264V3.01ZM336.281 98.87c-7.066 0-13.286-1.565-18.638-4.674-5.352-3.12-9.527-7.434-12.528-12.952-2.989-5.517-4.483-11.835-4.483-18.973 0-7.214 1.461-13.608 4.385-19.17 2.923-5.561 6.989-9.908 12.187-13.05 5.198-3.13 11.176-4.707 17.923-4.707 6.715 0 12.484 1.587 17.319 4.74 4.847 3.164 8.572 7.598 11.177 13.291 2.615 5.693 3.923 12.371 3.923 20.046v4.171h-51.793c.945 5.737 3.275 10.258 6.989 13.554 3.715 3.295 8.407 4.937 14.078 4.937 4.549 0 8.461-.667 11.747-2.014 3.286-1.347 6.374-3.383 9.253-6.12l8.099 9.886c-8.055 7.357-17.934 11.036-29.638 11.036Zm11.143-55.867c-3.198-3.252-7.385-4.872-12.56-4.872-5.045 0-9.264 1.653-12.66 4.97-3.407 3.318-5.55 7.784-6.451 13.39h37.133c-.451-5.737-2.275-10.237-5.462-13.488ZM386.513 39.467h-14.044V27.03h14.044V6.447h14.715V27.03h21.341v12.437h-21.341v31.552c0 5.244.901 8.988 2.703 11.233 1.803 2.244 4.88 3.36 9.253 3.36 1.935 0 3.572-.076 4.924-.23a97.992 97.992 0 0 0 4.461-.645v12.316c-1.67.493-3.549.898-5.637 1.205-2.099.317-4.286.47-6.583.47-15.89 0-23.836-8.649-23.836-25.957V39.467ZM500 97.185h-14.44v-9.82c-2.571 3.678-5.835 6.513-9.791 8.506-3.968 1.993-8.462 3-13.506 3-6.209 0-11.715-1.588-16.506-4.752-4.803-3.153-8.572-7.51-11.308-13.039-2.748-5.54-4.121-11.879-4.121-19.006 0-7.17 1.395-13.52 4.187-19.038 2.791-5.518 6.648-9.843 11.571-12.985 4.935-3.13 10.594-4.707 16.99-4.707 4.813 0 9.132.93 12.956 2.791a25.708 25.708 0 0 1 9.528 7.905v-9.01H500v70.155Zm-14.715-45.61c-1.571-3.985-4.066-7.138-7.461-9.448-3.396-2.31-7.33-3.46-11.781-3.46-6.308 0-11.319 2.102-15.055 6.317-3.737 4.215-5.605 9.92-5.605 17.09 0 7.215 1.802 12.94 5.396 17.156 3.604 4.215 8.484 6.317 14.66 6.317 4.538 0 8.593-1.16 12.154-3.492 3.549-2.332 6.121-5.475 7.692-9.427V51.575Z" fill="#1C2B33"></path><path class="xt3erj5" d="M107.666 0C95.358 0 86.865 4.504 75.195 19.935 64.14 5.361 55.152 0 42.97 0 18.573 0 0 29.768 0 65.408 0 86.847 12.107 99 28.441 99c15.742 0 25.269-13.2 33.445-27.788l9.663-16.66a643.785 643.785 0 0 1 2.853-4.869 746.668 746.668 0 0 1 3.202 5.416l9.663 16.454C99.672 92.72 108.126 99 122.45 99c16.448 0 27.617-13.723 27.617-33.25 0-37.552-19.168-65.75-42.4-65.75ZM57.774 46.496l-9.8 16.25c-9.595 15.976-13.639 19.526-19.67 19.526-6.373 0-11.376-5.325-11.376-17.547 0-24.51 12.062-47.451 26.042-47.451 7.273 0 12.678 3.61 22.062 17.486a547.48 547.48 0 0 0-7.258 11.736Zm64.308 35.776c-6.648 0-11.034-4.233-20.012-19.39l-9.663-16.386c-2.79-4.737-5.402-9.04-7.88-12.945 9.73-14.24 15.591-17.984 23.002-17.984 14.118 0 26.204 20.96 26.204 49.158 0 11.403-4.729 17.547-11.651 17.547Z" fill="#0180FA"></path><path d="M145.631 36h-16.759c3.045 7.956 4.861 17.797 4.861 28.725 0 11.403-4.729 17.547-11.651 17.547H122v16.726l.449.002c16.448 0 27.617-13.723 27.617-33.25 0-10.85-1.6-20.917-4.435-29.75Z" fill="url(#_R_59d9lplkldcpbn6b5ipamH1_)"></path><path d="M42 .016C18.63.776.832 28.908.028 63h16.92C17.483 39.716 28.762 18.315 42 17.31V.017Z" fill="url(#_R_59d9lplkldcpbn6b5ipamH2_)"></path><path d="m75.195 19.935.007-.009c2.447 3.223 5.264 7.229 9.33 13.62l-.005.005c2.478 3.906 5.09 8.208 7.88 12.945l9.663 16.386c8.978 15.157 13.364 19.39 20.012 19.39.31 0 .617-.012.918-.037v16.76c-.183.003-.367.005-.551.005-14.323 0-22.777-6.281-35.182-27.447L77.604 55.1l-.625-1.065L77 54c-2.386-4.175-7.606-12.685-11.973-19.232l.005-.008-.62-.91C63.153 31.983 61.985 30.313 61 29l-.066.024c-7.006-9.172-11.818-11.75-17.964-11.75-.324 0-.648.012-.97.037V.016c.322-.01.646-.016.97-.016 12.182 0 21.17 5.36 32.225 19.935Z" fill="url(#_R_59d9lplkldcpbn6b5ipamH3_)"></path></svg>
```

</details>
<details><summary>SVG #3 (323 chars)</summary>

```html
<svg aria-label="“向下箭头”图标" class="x1lliihq x1n2onr6 x1roi4f4" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><title>“向下箭头”图标</title><path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path></svg>
```

</details>
<details><summary>SVG #4 (274 chars)</summary>

```html
<svg aria-label="语言" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>语言</title><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
```

</details>
<details><summary>SVG #5 (690 chars)</summary>

```html
<svg aria-label="Cookie" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Cookie</title><path d="m23.475 11.428-.01-.143a1 1 0 0 0-.937-.935 4.246 4.246 0 0 1-3.97-3.971 1 1 0 0 0-.937-.937 4.246 4.246 0 0 1-3.97-3.97 1 1 0 0 0-.936-.937l-.144-.01A8.173 8.173 0 0 0 12 .5 11.5 11.5 0 1 0 23.5 12c0-.193-.013-.382-.025-.572ZM12 21.5a9.5 9.5 0 0 1-.223-18.998 6.256 6.256 0 0 0 4.892 4.83 6.256 6.256 0 0 0 4.828 4.89A9.51 9.51 0 0 1 12 21.5Zm-3.671-7.329a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0-1.5-1.5Zm.882-7.342a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0-1.5-1.5Zm6.46 6.46a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0-1.5-1.5Z"></path></svg>
```

</details>
<details><summary>SVG #6 (527 chars)</summary>

```html
<svg aria-label="护盾" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>护盾</title><polyline fill="none" points="16.723 8.93 10.498 15.155 7.277 11.933" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.978"></polyline><path d="M3 13.5a9 9 0 0 0 18 0V4.488A17.848 17.848 0 0 1 12 1.5a17.848 17.848 0 0 1-9 2.988Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.978"></path></svg>
```

</details>
<details><summary>SVG #7 (935 chars)</summary>

```html
<svg aria-label="meta 徽标" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>meta 徽标</title><path d="M4.537 19c-.92 0-1.766-.383-2.385-1.082-.757-.855-1.554-2.602-1.05-6.064.487-3.338 2.301-7.229 5.818-7.352v-.003h.172v.003c2.47.082 3.92 1.933 4.908 3.42.988-1.487 2.438-3.338 4.908-3.42v-.003l.172.003c3.517.123 5.331 4.014 5.817 7.352.505 3.462-.292 5.209-1.05 6.064-.636.719-1.512 1.077-2.462 1.081-2.456-.057-3.528-1.504-7.385-7.412-3.857 5.908-4.93 7.355-7.385 7.412L4.537 19Zm8.656-9.244c4.045 6.201 4.825 7.21 6.239 7.243.324.028.668-.124.919-.407.314-.355.998-1.497.568-4.448-.405-2.775-1.773-5.574-3.928-5.644-1.728.053-2.745 1.626-3.643 3.018l-.155.238ZM7.01 6.5c-2.155.07-3.523 2.87-3.928 5.644-.43 2.95.254 4.093.568 4.448.25.283.579.445.92.407 1.413-.032 2.193-1.042 6.238-7.243l-.155-.238C9.754 8.126 8.737 6.553 7.01 6.5Z" fill="currentColor"></path></svg>
```

</details>
<details><summary>SVG #8 (469 chars)</summary>

```html
<svg aria-label="筛选" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>筛选</title><path d="M21 16h-2.138a3.98 3.98 0 0 0-7.716 0H3a1 1 0 0 0 0 2h8.146a3.98 3.98 0 0 0 7.716 0H21a1 1 0 0 0 0-2Zm-5.996 3.001a2 2 0 1 1 2-2 2.003 2.003 0 0 1-2 2ZM3 8h2.139a3.98 3.98 0 0 0 7.716 0H21a1 1 0 0 0 0-2h-8.145a3.98 3.98 0 0 0-7.716 0H3a1 1 0 0 0 0 2Zm5.997-2.999a2 2 0 1 1-2 2 2.003 2.003 0 0 1 2-2Z"></path></svg>
```

</details>
<details><summary>SVG #9 (314 chars)</summary>

```html
<svg aria-label="箭头图标" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>箭头图标</title><path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path></svg>
```

</details>
<details><summary>SVG #10 (350 chars)</summary>

```html
<svg aria-label="查看 Cookie 同意内容版块中的箭头图标" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>查看 Cookie 同意内容版块中的箭头图标</title><path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path></svg>
```

</details>

---

## Design Critique (AI Phase 1)

<details>
<summary>Expand raw critique</summary>

# Layout Analysis: Instagram Login Page

---

## SECTION INVENTORY

| Name | Vertical Span | Z-Layer | Background | Dominant Visual |
|------|--------------|---------|------------|-----------------|
| **hero-left** | 0–88% (left half, ~0–640px wide) | base | solid-color `#ffffff` | imagery + typography |
| **login-panel** (right half) | 0–88% (right half, ~640–1280px wide) | base | solid-color `#ffffff` | interactive-controls |
| **footer** | 88–100% | base | solid-color `#ffffff` | typography (nav links) |

**Layout split:** The page is a two-column full-height layout — left column occupies ~50% viewport width (hero/brand), right column occupies remaining ~50% (login form). No sticky/fixed/floating elements detected.

---

## SPATIAL GRID ANALYSIS

### Hero Left Column
- **Layout engine:** Flexbox (column direction, centered)
- **Column count:** 1
- **Content stack:** Logo icon → tagline text → hero illustration image
- **Logo position:** Top-left, approximately 56×56px bounding box with gradient border treatment
- **Tagline text block:** Centered horizontally, font size 40px (h3 scale, lh:1.6, w:400), "close friends" rendered in Brand-Accent color (orange/pink gradient text)
- **Hero illustration:** Centered, ~400px wide collage of phone mockups with social UI overlays
- **Gap between elements:** ~32px (xl spacing unit) between logo and tagline; ~40px between tagline and illustration

### Login Right Column
- **Layout engine:** Flexbox (column direction), centered vertically and horizontally within the right pane
- **Column count:** 1 (single stacked column of form elements)
- **Element stack (top → bottom):**
  1. "Log into Instagram" heading — 16px, w:700
  2. Username/email input field
  3. Password input field
  4. "Log in" button (primary, filled blue)
  5. "Forgot password?" text link
  6. Divider (implicit whitespace gap)
  7. "Log in with Facebook" button (outlined)
  8. "Create new account" button (outlined, accent-colored text)
  9. Meta logo + wordmark
- **Gap between inputs:** ~12px (xs-sm range)
- **Gap between input group and Log in button:** ~12px
- **Gap between Log in and Forgot password:** ~16px (md)
- **Gap between Forgot password and Facebook button:** ~24px (lg)
- **Input field width:** ~536px (fills container with ~16px horizontal padding on each side)
- **Input height:** ~44px
- **Button heights:** ~44px

### Footer
- **Layout engine:** Flexbox (row, wrap, centered)
- **Column count:** N/A — single horizontal row of text links, wraps to second row for copyright
- **Gap size:** ~16px–20px between nav links
- **Item pattern:** fluid text links
- **Typography:** 13px (body-sm, lh:1.2, w:400), `Text-Muted` color

---

## ASSET AUDIT

| Asset | Source | Value/URL |
|-------|--------|-----------|
| **Hero bg** | Physical Data | `none detected` — solid white `#ffffff` |
| **Logo/brand** | Screenshot visible | Instagram camera icon with gradient border (yellow→pink→purple gradient), rendered as `<img>` or inline SVG; exact URL not provided in Physical Data |
| **Hero illustration** | Screenshot visible | Composite phone mockup image with social UI overlays (stacked cards showing people); URL not confirmed in Physical Data → **no asset URL found** |
| **Card images** | N/A | No card grid present |
| **Icon set** | Screenshot visible | Facebook "f" logo icon (inline SVG or img) within "Log in with Facebook" button; Meta "∞" logo near bottom of login panel; exact SVG indices not in Physical Data |
| **"Close friends" star badge** | Screenshot visible | Small green circle with gold star emoji overlay on illustration; part of hero image asset — **no standalone URL found** |

> ⚠️ Physical Data did not supply explicit asset URLs. All asset observations are from screenshot only and cannot be confirmed with ground-truth paths.

---

## COLOR SEMANTICS

| Observed Hex | Semantic Role | Evidence |
|-------------|---------------|----------|
| `#ffffff` | **Neutral-Base** | Full page background, both columns, footer |
| `#000000` / `#1c1e21` | **Text-Main** | "Log into Instagram" heading, footer nav links, general body text |
| `#737373` | **Text-Muted** | Input placeholder text ("Mobile number, username or email", "Password"), footer link text |
| `#0095f6` | **Brand-Primary** | "Log in" filled button background; "Create new account" button text (outlined variant) |
| `#ffffff` | **Text-Inverse** | "Log in" button label text (white on blue) |
| `#e0e0e0` / `#dbdbdb` | **Border-Default** | Input field borders, "Log in with Facebook" button border, "Create new account" button border |
| `#f58529` → `#dd2a7b` → `#8134af` (gradient) | **Brand-Accent** | Instagram logo gradient ring; "close friends" text in tagline (orange-to-pink gradient text rendering) |
| `#1877f2` | **Brand-Secondary** | Facebook "f" icon within "Log in with Facebook" button |
| `#0064e0` | **Brand-Secondary (alt)** | "Log in with Facebook" button border color (Facebook brand blue) |
| `#262626` | **Text-Main (strong)** | "Log into Instagram" label text, "Forgot password?" link |

### Color Discrepancy Notes
- The "close friends" gradient text is visually estimated as orange (`#f58529`) to pink (`#dd2a7b`); Physical Data does not provide explicit color hex values — visual observation used as fallback per hierarchy rules.
- The "Log in" button blue (`#0095f6`) is consistent with Instagram's documented brand primary; Physical Data confirms 16px w:700 for button label typography.

</details>
