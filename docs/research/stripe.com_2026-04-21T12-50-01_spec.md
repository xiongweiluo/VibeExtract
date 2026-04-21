# Design Spec — stripe.com

> **Extracted:** Tue, 21 Apr 2026 12:50:01 GMT
> **URL:** https://stripe.com/en-ch
> **Paradigm:** landing · **Density:** spacious · **Motif:** fluid gradient mesh, typographic hierarchy, minimal chrome, brand-accent highlighted prose, clean white surfaces

---

## Visual Weight Verdict

**TYPE DOMINANT**

This marketing landing page is sustained by **editorial typography and text hierarchy**.

### Evidence
- 50 image assets detected (heavy image density)
- Hero section: split layout — "Financial infrastructure to grow your revenue. Accept paymen…"
- Card grid: 4-column, flat
- Layout: single-column / nav top-fixed
- Density: spacious (4px base grid)
- Visual hierarchy: editorial

---

## Color Architecture

| Role | Value | Token |
|---|---|---|
| Brand Primary | #635BFF | `#635BFF` |
| Brand Secondary | #5B9CF6 | `#5B9CF6` |
| Brand Accent | #FF4E8B | `#FF4E8B` |
| Background Page | #FFFFFF | `#FFFFFF` |
| Background Surface | #F6F9FC | `#F6F9FC` |
| Background Overlay | rgba(0,0,0,0.5) | rgba(0,0,0,0.5) |
| Text Primary | #0A2540 | `#0A2540` |
| Text Secondary | #697386 | `#697386` |
| Text Inverse | #FFFFFF | `#FFFFFF` |
| Border | #635BFF | `#635BFF` |
| Status Success | #10B981 | `#10B981` |
| Status Warning | #F59E0B | `#F59E0B` |
| Status Error | #EF4444 | `#EF4444` |

---

## Typography System

**Families:** body — `sohne-var, sans-serif` · heading — `sohne-var, sans-serif` · mono — `ui-monospace, monospace`

| Level | Size | Line Height |
|---|---|---|
| `xs` | 10px | 1.2 |
| `sm` | 12px | 1.2 |
| `base` | 16px | 1.2 |
| `lg` | 26px | 1.2 |
| `xl` | 48px | 1.2 |
| `2xl` | 48px | 1.2 |
| `3xl` | 48px | 1.2 |
| `4xl` | 48px | 1.2 |

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
| Hero | present · split · "Financial infrastructure to grow your revenue. Accept paymen" · 2 CTAs |
| Nav | brand: "Pricing" · items: Products, Solutions, Developers, Resources, Sign inSign in, Contact sales |
| Cards | 4-column grid · flat |
| Footer | 1 column |

---

## Physical Measurements

### Spacing (computed CSS)
- **Base unit:** 4px
- **Measured steps:** 4px · 8px · 12px · 16px · 20px · 24px · 28px · 32px · 36px · 40px · 52px · 60px · 64px · 96px
- **Named scale:** xs=4px sm=8px md=16px lg=24px xl=32px 2xl=48px 3xl=64px

### Typography (computed CSS)
- **Root body size:** 16px / 1rem
- **Detected families:** sohne-var

| px | rem | Line Height | Weight | Letter Spacing | Role |
|---|---|---|---|---|---|
| 10px | 0.625rem | 1.2 | 400 | 0.1px | label |
| 12px | 0.75rem | 1.2 | 400 | 0px | label |
| 14px | 0.875rem | 1.2 | 300 | -0.42px | body-sm |
| 16px | 1rem | 1.2 | 400 | 0px | body |
| 26px | 1.625rem | 1.2 | 400 | 0px | h5 |
| 48px | 3rem | 1.2 | 300 | -0.96px | h3 |

---

## Asset Inventory

### Images (50)
- https://images.stripeassets.com/fzn2n1nzq965/115d4Vd5LVAsqFGDR1ClAv/0ceb2c44a7a7182cd624262420af7544/wave-fallback-desktop.png
- https://images.stripeassets.com/fzn2n1nzq965/1Vf8oT9Fm6dEwpnEx5PgK1/055956f38d7fd8b0cc7419692ef29778/bento-terminal.png?w=308&q=90
- https://images.stripeassets.com/fzn2n1nzq965/1Vf8oT9Fm6dEwpnEx5PgK1/055956f38d7fd8b0cc7419692ef29778/bento-terminal.png?w=616&q=90
- https://images.stripeassets.com/fzn2n1nzq965/6BTjJGdjfGVA8brPwj7p3M/fcf084ff85142366e118fe85ee78b632/payments-electric-kettle.jpg?w=80&q=90
- https://images.stripeassets.com/fzn2n1nzq965/6BTjJGdjfGVA8brPwj7p3M/fcf084ff85142366e118fe85ee78b632/payments-electric-kettle.jpg?w=160&q=90
- https://images.stripeassets.com/fzn2n1nzq965/5Dr3Oc550drIrxyzzXgFbq/f6e4fb0b8b4b40d73e94fdf7c9bc7028/payments-hoodie.jpg?w=80&q=90
- https://images.stripeassets.com/fzn2n1nzq965/5Dr3Oc550drIrxyzzXgFbq/f6e4fb0b8b4b40d73e94fdf7c9bc7028/payments-hoodie.jpg?w=160&q=90
- https://images.stripeassets.com/fzn2n1nzq965/1UE1lPgwbfQRH586XfTWKM/f90bfc79f87b3e60a4189cc0f5a03228/showflix-streaming.jpg?w=80&q=90
- https://images.stripeassets.com/fzn2n1nzq965/1UE1lPgwbfQRH586XfTWKM/f90bfc79f87b3e60a4189cc0f5a03228/showflix-streaming.jpg?w=160&q=90
- https://images.stripeassets.com/fzn2n1nzq965/vYmk6v8n7oDAwbDpwhjV6/846f9b3e214549b8f14e2b8c8cfe9343/payment-bento-background.jpg?w=860&q=80
- https://images.stripeassets.com/fzn2n1nzq965/vYmk6v8n7oDAwbDpwhjV6/846f9b3e214549b8f14e2b8c8cfe9343/payment-bento-background.jpg?w=1720&q=80
- https://images.stripeassets.com/fzn2n1nzq965/m9HBEK464p46FeNIhs2PV/f5054a93c8a0a6aabdd1c47675d610ae/wave_crop.jpg?w=296&q=80
- https://images.stripeassets.com/fzn2n1nzq965/m9HBEK464p46FeNIhs2PV/f5054a93c8a0a6aabdd1c47675d610ae/wave_crop.jpg?w=396&q=80
- https://images.stripeassets.com/fzn2n1nzq965/m9HBEK464p46FeNIhs2PV/f5054a93c8a0a6aabdd1c47675d610ae/wave_crop.jpg?w=608&q=80
- https://images.stripeassets.com/fzn2n1nzq965/m9HBEK464p46FeNIhs2PV/f5054a93c8a0a6aabdd1c47675d610ae/wave_crop.jpg?w=816&q=80
- https://images.stripeassets.com/fzn2n1nzq965/m9HBEK464p46FeNIhs2PV/f5054a93c8a0a6aabdd1c47675d610ae/wave_crop.jpg?w=1104&q=80
- https://images.stripeassets.com/fzn2n1nzq965/78eaknFXeySTtfpQUh4lD2/e2a97240d78e6e239bcfe045d5b21239/particles.png?w=514&q=90
- https://images.stripeassets.com/fzn2n1nzq965/78eaknFXeySTtfpQUh4lD2/e2a97240d78e6e239bcfe045d5b21239/particles.png?w=1028&q=90
- https://images.stripeassets.com/fzn2n1nzq965/1zneiFjZyS8cGQvki2cGqz/35294f1866720bec6d80fb2532270258/card-placeholder_2x.png?w=447&q=90
- https://images.stripeassets.com/fzn2n1nzq965/1zneiFjZyS8cGQvki2cGqz/35294f1866720bec6d80fb2532270258/card-placeholder_2x.png?w=894&q=90
_…and 30 more_

### CSS Gradients (1)
_Real background-image gradient values — use as-is in CSS._

| Element | Gradient |
|---|---|
| `navigation-menu-footer` | `radial-gradient(66.35% 66.35%, rgba(255, 255, 255, 0.9) 0px, rgba(255, 255, 255, 0) 100%), none` |

### Inline SVGs (10 captured)
_Raw <svg> source — icons, logos, illustrations. Embed directly in generated HTML._

<details><summary>SVG #1 (1922 chars)</summary>

```html
<svg xmlns="http://www.w3.org/2000/svg" width="60" height="25" fill="#031323" viewBox="0 0 60 25" aria-label="Stripe logo"><path fill="var(--hds-color-text-solid)" fill-rule="evenodd" d="M59.6444 14.2813h-8.062c.1843 1.9296 1.5983 2.5476 3.2032 2.5476 1.6352 0 2.9534-.3656 4.0453-.9506v3.3179c-1.1186.7115-2.5964 1.1068-4.5645 1.1068-4.011 0-6.8218-2.5122-6.8218-7.4783 0-4.19441 2.3837-7.52509 6.3017-7.52509 3.912 0 5.9537 3.28038 5.9537 7.49819 0 .3982-.0372 1.261-.0556 1.4835Zm-5.9241-5.62407c-1.0294 0-2.1739.72812-2.1739 2.58387h4.2573c0-1.85362-1.0721-2.58387-2.0834-2.58387ZM40.9547 20.303c-1.4411 0-2.322-.6087-2.9133-1.0417l-.0088 4.6271-4.1181.8755-.0014-19.19053h3.7543l.0864 1.01784c.6035-.52914 1.6114-1.29157 3.2256-1.29162 2.8925 0 5.6162 2.6052 5.6162 7.39971 0 5.2327-2.6948 7.6037-5.6409 7.6037Zm-.959-11.35573c-.9453 0-1.5376.34559-1.9669.81586l.0245 6.11967c.3997.433.9763.7813 1.9424.7813 1.5231 0 2.5437-1.6575 2.5437-3.8745 0-2.1544-1.037-3.84233-2.5437-3.84233Zm-11.7602-3.3739h4.1341V20.0088h-4.1341V5.57337Zm0-4.694699L32.3696 0v3.35821l-4.1341.87868V.878671ZM23.9198 10.2223v9.7861h-4.1156V5.57296h3.6867l.1317 1.21751c1.0035-1.7722 3.0722-1.41321 3.6209-1.21594v3.78524c-.5242-.16908-2.2894-.42779-3.3237.86253Zm-8.5525 4.7221c0 2.4275 2.5988 1.6719 3.1263 1.4609v3.3522c-.5492.3013-1.5437.5458-2.8901.5458-2.4441 0-4.2773-1.7999-4.2773-4.2379l.0173-13.17658 4.0206-.85464.0032 3.5395h3.1278V9.0857h-3.1278v5.8588-.0001Zm-4.9069.7026c0 2.9645-2.31051 4.6562-5.73464 4.6562-1.41958 0-2.92289-.2761-4.453935-.9347v-3.9319c1.382085.7516 3.093705 1.315 4.457755 1.315.91864 0 1.53106-.2459 1.53106-1.0069C6.26064 13.7786 0 14.5192 0 9.95995 0 7.04457 2.27622 5.2998 5.61655 5.2998c1.36404 0 2.72806.20934 4.09208.75351V9.9317c-1.25265-.67618-2.84332-1.05979-4.09588-1.05979-.86296 0-1.44753.24965-1.44753.8924.0001 1.85329 6.29518.97249 6.29518 5.88279v-.0001Z" clip-rule="evenodd"></path></svg>
```

</details>
<details><summary>SVG #2 (416 chars)</summary>

```html
<svg class="hds-icon navigation__chevron-down-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path class="navigation__chevron-down-icon__left" d="M4.67065 6L9.3 10.6" stroke="currentColor" stroke-width="1.75"></path><path class="navigation__chevron-down-icon__right" d="M12.6707 6L8.67065 10" stroke="currentColor" stroke-width="1.75"></path></svg>
```

</details>
<details><summary>SVG #3 (416 chars)</summary>

```html
<svg class="hds-icon navigation__chevron-down-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path class="navigation__chevron-down-icon__left" d="M4.67065 6L9.3 10.6" stroke="currentColor" stroke-width="1.75"></path><path class="navigation__chevron-down-icon__right" d="M12.6707 6L8.67065 10" stroke="currentColor" stroke-width="1.75"></path></svg>
```

</details>
<details><summary>SVG #4 (416 chars)</summary>

```html
<svg class="hds-icon navigation__chevron-down-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path class="navigation__chevron-down-icon__left" d="M4.67065 6L9.3 10.6" stroke="currentColor" stroke-width="1.75"></path><path class="navigation__chevron-down-icon__right" d="M12.6707 6L8.67065 10" stroke="currentColor" stroke-width="1.75"></path></svg>
```

</details>
<details><summary>SVG #5 (416 chars)</summary>

```html
<svg class="hds-icon navigation__chevron-down-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path class="navigation__chevron-down-icon__left" d="M4.67065 6L9.3 10.6" stroke="currentColor" stroke-width="1.75"></path><path class="navigation__chevron-down-icon__right" d="M12.6707 6L8.67065 10" stroke="currentColor" stroke-width="1.75"></path></svg>
```

</details>
<details><summary>SVG #6 (185 chars)</summary>

```html
<svg class="hds-icon hds-icon-hover-arrow" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2"><path d="M0.5 5.5h7"></path><path d="M1.5 1.5l4 4-4 4"></path></svg>
```

</details>
<details><summary>SVG #7 (247 chars)</summary>

```html
<svg class="navigation__chevron-left-icon" xmlns="http://www.w3.org/2000/svg" width="6" height="10" fill="none" viewBox="0 0 6 10"><path fill="currentColor" d="M.618 5.238 0 4.62.618 4l4-4 1.238 1.238-3.38 3.381L5.856 8 4.618 9.238z"></path></svg>
```

</details>
<details><summary>SVG #8 (455 chars)</summary>

```html
<svg width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect class="navigation-hamburger__line line-1" width="40" height="5" x="30" y="38"></rect><rect class="navigation-hamburger__line line-2" width="40" height="5" x="30" y="48"></rect><rect class="navigation-hamburger__line line-3" width="40" height="5" x="30" y="48"></rect><rect class="navigation-hamburger__line line-4" width="40" height="5" x="30" y="58"></rect></svg>
```

</details>
<details><summary>SVG #9 (500 chars)</summary>

```html
<svg class="navigation-item__sign-in__mask"><defs><mask id="cutoutMask"><rect x="0" y="0" width="100%" height="100%" fill="white"></rect><text x="50%" y="50%" dy="-0.5" dominant-baseline="central" text-anchor="middle" font-size="1em" fill="black">Sign in</text></mask></defs><rect x="0" y="0" width="100%" height="100%" fill="var(--hds-color-text-solid)" opacity="0.10"></rect><rect x="0" y="0" width="100%" height="100%" fill="var(--hds-color-surface-bg-quiet)" mask="url(#cutoutMask)"></rect></svg>
```

</details>
<details><summary>SVG #10 (185 chars)</summary>

```html
<svg class="hds-icon hds-icon-hover-arrow" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2"><path d="M0.5 5.5h7"></path><path d="M1.5 1.5l4 4-4 4"></path></svg>
```

</details>

---

## Design Critique (AI Phase 1)

<details>
<summary>Expand raw critique</summary>

## SECTION INVENTORY

| # | Name | Vertical Span | Z-Layer | Background | Dominant Visual |
|---|------|--------------|---------|------------|-----------------|
| 1 | **nav** | 0–7% | floating (fixed/sticky) | solid-color `#ffffff` | interactive-controls |
| 2 | **hero** | 7–74% | base | gradient (multi-color: orange, pink, lavender, blue mesh) | typography |
| 3 | **logo-ticker** | 74–83% | base | solid-color `#ffffff` | imagery (brand logos) |
| 4 | **feature-intro** | 83–100% | base | solid-color `#ffffff` | typography |
| 5 | **geo-banner** | ~85–96% (overlay) | overlay (floating bottom-right) | solid-color `#ffffff`, subtle shadow | interactive-controls |

---

## SPATIAL GRID ANALYSIS

### Nav (floating)
- **Layout engine**: Flexbox (horizontal, space-between)
- **Column count**: 3 zones — logo left | nav links center | CTA buttons right
- **Gap size**: ~24px (spacing.lg) between nav link items
- **Item pattern**: fluid
- **Z-index**: floating layer, `position: fixed` or `sticky`, z ≈ high tier (100+)
- **CTA buttons**: "Sign in" (outlined) + "Contact sales" (solid brand-primary), grouped right with ~8px gap (spacing.sm)

### Hero
- **Layout engine**: single-column block (no grid/flex grid)
- **Column count**: 1 (text left-aligned, image fills right ~50% of viewport via background/absolute)
- **Gap size**: vertical spacing between stat label → H1 → H2 → CTAs uses ~24–40px increments per Physical Data scale
- **Item pattern**: fluid text block
- **CTA row**: Flexbox, 2 items, gap ≈ 16px (spacing.md) — "Get started" (solid) + "Sign up with Google" (outlined)
- **Background**: abstract gradient mesh occupies right ~60% of hero, flowing orange → pink → lavender → blue

### Logo Ticker (customer logos)
- **Layout engine**: Flexbox or CSS scroll marquee (horizontal overflow)
- **Column count**: effectively 7–8 visible logos across full width (OpenAI, Amazon, NVIDIA, Ford, Coinbase, Google, Shopify, Mindbo…)
- **Gap size**: ~100–120px between logos (visually even spacing)
- **Item pattern**: fixed-width logo images, vertically centered
- **Masonry note**: none — single horizontal row

### Geo-Banner (overlay)
- **Layout engine**: Flexbox (vertical stack)
- **Position**: absolute/fixed bottom-right corner
- **Z-index**: overlay tier (above base content)
- **Size**: ~360×100px estimated
- **Content**: text notice + "Switch to the United States site >" link + close (×) icon

---

## ASSET AUDIT

| Asset Role | Source | Value |
|------------|--------|-------|
| **Hero bg** | Visual (gradient) | Multi-stop mesh gradient — orange `#FF6B35` → warm pink `#FF4E8B` → lavender `#A78BFA` → sky blue `#93C5FD`; no discrete image URL found in Physical Data — rendered as CSS gradient or SVG/canvas element |
| **Logo/brand (Stripe)** | Physical Data / inline SVG | Stripe wordmark — inline SVG (top-left nav), dark navy `#0A2540` |
| **Card images** | Physical Data assets | No card images detected in this viewport section — logo ticker uses partner brand image assets |
| **Logo ticker assets** | Physical Data assets.images | Amazon logo, NVIDIA logo, Ford logo, Coinbase logo, Google logo, Shopify logo (partial: OpenAI text, Mindbody text) — exact URLs not surfaced in Physical Data provided |
| **Google icon (CTA)** | Inline SVG / img | Google "G" multicolor icon inline in "Sign up with Google" button |
| **Icon set** | Inline SVG | Chevron-down icons (×4 nav dropdowns), arrow icon on "Get started" + "Contact sales" buttons — inline SVG |

> **Note**: Physical Data did not include a resolved `assets.images` array with URLs. All asset references above are derived from screenshot observation and marked accordingly. No URLs are invented.

---

## COLOR SEMANTICS

| Observed Hex | Semantic Role | Evidence |
|-------------|---------------|----------|
| `#0A2540` | **Text-Main** | Primary headline text "Financial infrastructure…", nav links, body copy |
| `#635BFF` | **Brand-Primary** | "Get started" button fill, "your revenue" headline highlight word, Stripe brand accent |
| `#5B9CF6` (≈ `#4F94EF`) | **Brand-Secondary** | Sub-headline "Accept payments…" text color (blue-tinted muted heading) |
| `#FF6B35` → `#FF4E8B` | **Brand-Accent** | Hero background gradient warm tones (orange-to-pink sweep) |
| `#A78BFA` / `#C4B5FD` | **Brand-Accent (secondary)** | Hero gradient lavender tones, "from" word in subheadline |
| `#FFFFFF` | **Neutral-Base** | Nav background, logo ticker row background, page base |
| `#F6F9FC` | **Neutral-Surface** | Subtle off-white (geo-banner background approximation) |
| `#697386` | **Text-Muted** | "Global GDP running on Stripe:" label text, small descriptor copy |
| `#1A1A2E` / `#0A2540` | **Text-Inverse** | Used inside dark-fill "Contact sales" button text (white on dark) |
| `#635BFF` (border) | **Border-Default** | "Sign in" button outline border; "Sign up with Google" button outline |
| `#FFFFFF` | **Text-Inverse** | Text inside "Get started" and "Contact sales" solid buttons |
| `#3C4257` | **Text-Muted** | Geo-banner body text ("You're viewing our website…") |
| `#635BFF` | **Status-/Link-Active** | "Switch to the United States site >" link in geo-banner |

</details>
