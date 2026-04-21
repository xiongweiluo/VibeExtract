# Design Spec — family.co

> **Extracted:** Tue, 21 Apr 2026 12:54:54 GMT
> **URL:** https://family.co/
> **Paradigm:** landing · **Density:** spacious · **Motif:** playful illustrated characters, warm off-white surfaces, bold dark pill buttons, crypto-native emoji aesthetic, centered editorial hierarchy

---

## Visual Weight Verdict

**TYPE DOMINANT**

This marketing landing page is sustained by **editorial typography and text hierarchy**.

### Evidence
- 31 image assets detected (heavy image density)
- Hero section: centered layout — "Your favorite crypto wallet."
- Card grid: 3-column, flat
- Layout: single-column / nav top-fixed
- Density: spacious (4px base grid)
- Visual hierarchy: editorial

---

## Color Architecture

| Role | Value | Token |
|---|---|---|
| Brand Primary | #1A1A1A | `#1A1A1A` |
| Brand Secondary | #F5F4F1 | `#F5F4F1` |
| Brand Accent | #2D6FE8 | `#2D6FE8` |
| Background Page | #FFFFFF | `#FFFFFF` |
| Background Surface | #F2F0ED | `#F2F0ED` |
| Background Overlay | rgba(26,26,26,0.5) | rgba(26,26,26,0.5) |
| Text Primary | #1A1A1A | `#1A1A1A` |
| Text Secondary | #555555 | `#555555` |
| Text Inverse | #FFFFFF | `#FFFFFF` |
| Border | #E0DEDA | `#E0DEDA` |
| Status Success | #4CAF70 | `#4CAF70` |
| Status Warning | #F59E0B | `#F59E0B` |
| Status Error | #E8443A | `#E8443A` |

---

## Typography System

**Families:** body — `Inter, sans-serif` · heading — `Family, Inter, sans-serif` · mono — `ui-monospace, monospace`

| Level | Size | Line Height |
|---|---|---|
| `xs` | 13px | 1.2 |
| `sm` | 14px | 1.4 |
| `base` | 15px | 1.5 |
| `lg` | 16px | 1.2 |
| `xl` | 17px | 1.5 |
| `2xl` | 19px | 1.4 |
| `3xl` | 44px | 1.0 |
| `4xl` | 68px | 1.1 |

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
| Hero | present · centered · "Your favorite crypto wallet." · 2 CTAs |
| Nav | brand: "Developers" · items: Resources, Blog, Changelog, Help & Support, FAQs, X (Twitter) |
| Cards | 3-column grid · flat |
| Footer | 2 columns |

---

## Physical Measurements

### Spacing (computed CSS)
- **Base unit:** 4px
- **Measured steps:** 4px · 8px · 12px · 16px · 20px · 24px · 28px · 32px · 36px · 40px · 48px · 52px · 56px · 60px
- **Named scale:** xs=4px sm=8px md=16px lg=24px xl=32px 2xl=48px 3xl=64px

### Typography (computed CSS)
- **Root body size:** 16px / 1rem
- **Detected families:** Inter, Family

| px | rem | Line Height | Weight | Letter Spacing | Role |
|---|---|---|---|---|---|
| 13px | 0.8125rem | 1.2 | 400 | 0px | body-sm |
| 14px | 0.875rem | 1.4 | 600 | -0.09px | body-sm |
| 15px | 0.9375rem | 1.5 | 500 | -0.13px | body |
| 16px | 1rem | 1.2 | 400 | 0px | body |
| 17px | 1.0625rem | 1.5 | 500 | -0.22px | body |
| 19px | 1.1875rem | 1.4 | 400 | -0.3px | body-lg |
| 44px | 2.75rem | 0 | 400 | 0px | h3 |
| 68px | 4.25rem | 1.1 | 500 | -1.36px | h1 |

### Box Shadows (measured from UI components)

| Frequency | CSS Value |
|---|---|
| ×3 | `color(display-p3 0.94902 0.941176 0.929412) 0px 0px 0px 0px inset` |

---

## Asset Inventory

### Images (31)
- https://family.co/assets/home/emoji-1.png
- https://family.co/assets/home/emoji-2.png
- https://family.co/assets/home/emoji-3.png
- https://family.co/assets/home/emoji-4.png
- https://family.co/assets/home/emoji-5.png
- https://family.co/assets/home/emoji-6.png
- https://family.co/assets/home/emoji-7.png
- https://family.co/assets/home/emoji-8.png
- https://family.co/assets/home/emoji-10.png
- https://family.co/assets/home/emoji-9.png
- https://family.co/assets/phone.png
- https://family.co/videos/promo-collectibles.png
- https://family.co/videos/promo-watch.png
- https://family.co/videos/promo-activity.png
- https://family.co/media/why-family-accounts.png
- https://family.co/media/family-accounts.png
- https://family.co/avatars/floguo.jpeg
- https://family.co/avatars/mrdanielfeo.jpeg
- https://family.co/avatars/web3emm.jpeg
- https://family.co/avatars/Skytrackr.jpeg
_…and 11 more_

### Inline SVGs (10 captured)
_Raw <svg> source — icons, logos, illustrations. Embed directly in generated HTML._

<details><summary>SVG #1 (5381 chars)</summary>

```html
<svg aria-label="Family" width="72" height="18" viewBox="0 0 72 18" fill="none" xmlns="http://www.w3.org/2000/svg" style="overflow: visible;"><g opacity="1" transform-origin="7.9724001958966255px 7.971867054700851px" style="transform: none; transform-origin: 7.9724px 7.97187px;"><path d="M15.9502 2.68053C15.95 1.97316 15.669 1.29482 15.1688 0.794634C14.6686 0.294447 13.9902 0.0133573 13.2829 0.0131584C11.9891 3.34419e-05 10.9204 0.924408 10.6552 2.13903H10.5892C10.4662 1.53766 10.1397 0.997068 9.66463 0.60835C9.18957 0.219633 8.59504 0.00655129 7.98121 0.0050099C7.36739 0.00346851 6.77179 0.213562 6.29479 0.599888C5.81778 0.986215 5.48852 1.52516 5.36249 2.12591H5.29649C5.19833 1.65187 4.97337 1.21336 4.64561 0.857102C4.31785 0.500846 3.89957 0.2402 3.43534 0.102946C2.97111 -0.034308 2.47834 -0.0430266 2.00955 0.0777195C1.54076 0.198466 1.11351 0.444151 0.773352 0.78859C0.433193 1.13303 0.192869 1.56331 0.0779936 2.03358C-0.0368817 2.50384 -0.0220025 2.99647 0.121045 3.45894C0.264093 3.92142 0.529948 4.33641 0.890275 4.65969C1.2506 4.98297 1.69189 5.20243 2.16712 5.29466V5.34753C1.55751 5.46642 1.00821 5.79356 0.613293 6.27293C0.218378 6.7523 0.00242551 7.35407 0.00242551 7.97516C0.00242551 8.59625 0.218378 9.19802 0.613293 9.67739C1.00821 10.1568 1.55751 10.4839 2.16712 10.6028V10.6553C1.69141 10.7457 1.24922 10.9637 0.887841 11.286C0.526461 11.6083 0.259487 12.0227 0.115472 12.485C-0.0285422 12.9473 -0.0441795 13.4401 0.0702328 13.9106C0.184645 14.3811 0.424803 14.8117 0.765021 15.1562C1.10524 15.5008 1.53272 15.7464 2.00174 15.8667C2.47076 15.9871 2.96368 15.9777 3.42777 15.8396C3.89187 15.7014 4.30968 15.4397 4.63653 15.0825C4.96338 14.7252 5.18696 14.2858 5.28337 13.8113H5.34937C5.60024 15.0259 6.68287 15.9488 7.96387 15.9488C8.58005 15.9516 9.178 15.7398 9.65503 15.3498C10.1321 14.9597 10.4584 14.4158 10.578 13.8113H10.644C10.8949 15.0259 11.9775 15.9488 13.2585 15.9488C13.9224 15.9472 14.5619 15.6985 15.0525 15.2512C15.5431 14.8039 15.8495 14.1899 15.9122 13.529C15.9748 12.868 15.7891 12.2074 15.3913 11.6759C14.9935 11.1444 14.412 10.78 13.7602 10.6538V10.6013C14.3699 10.4824 14.9192 10.1553 15.3141 9.67589C15.709 9.19652 15.9249 8.59475 15.9249 7.97366C15.9249 7.35257 15.709 6.7508 15.3141 6.27143C14.9192 5.79206 14.3699 5.46492 13.7602 5.34603V5.29316C14.3743 5.1849 14.9305 4.86358 15.3311 4.38572C15.7317 3.90786 15.9509 3.30407 15.9502 2.68053ZM12.2662 11.6457C12.2664 11.7272 12.2504 11.808 12.2193 11.8833C12.1882 11.9587 12.1425 12.0272 12.0848 12.0848C12.0271 12.1425 11.9587 12.1882 11.8833 12.2193C11.8079 12.2505 11.7272 12.2664 11.6456 12.2663H4.31774C4.2362 12.2664 4.15543 12.2505 4.08007 12.2193C4.0047 12.1882 3.93623 12.1425 3.87857 12.0848C3.82091 12.0272 3.7752 11.9587 3.74406 11.8833C3.71292 11.808 3.69697 11.7272 3.69712 11.6457V4.31778C3.69697 4.23624 3.71292 4.15547 3.74406 4.0801C3.7752 4.00474 3.82091 3.93626 3.87857 3.8786C3.93623 3.82094 4.0047 3.77524 4.08007 3.7441C4.15543 3.71296 4.2362 3.69701 4.31774 3.69716H11.6456C11.7272 3.69701 11.8079 3.71296 11.8833 3.7441C11.9587 3.77524 12.0271 3.82094 12.0848 3.8786C12.1425 3.93626 12.1882 4.00474 12.2193 4.0801C12.2504 4.15547 12.2664 4.23624 12.2662 4.31778V11.6457Z" fill="currentColor"></path></g><g opacity="1" transform-origin="46.93924903869629px 9.546124696731567px" style="transform: none; transform-origin: 46.9392px 9.54612px;"><path d="M24.2421 4.81933H30.1308V2.79883H21.8785V14.326H24.2421V9.2822H29.2068V7.28833H24.2421V4.81933Z" fill="currentColor"></path><path d="M36.8649 6.74682C36.3369 5.95482 35.2674 5.43994 34.1713 5.43994C31.6363 5.43994 29.9199 7.19569 29.9199 9.95532C29.9199 12.7149 31.6363 14.4711 34.1713 14.4842C35.2674 14.4842 36.35 13.9431 36.8649 13.1773V14.3398H39.0699V5.58507H36.8649V6.74682ZM34.5024 12.5968C33.1149 12.5968 32.1519 11.5142 32.1399 9.95607C32.1399 8.37169 33.1172 7.31532 34.5024 7.31532C35.8877 7.31532 36.8649 8.37169 36.8649 9.95607C36.8649 11.5003 35.8877 12.5961 34.5002 12.5961L34.5024 12.5968Z" fill="currentColor"></path><path d="M51.006 5.43994C49.8435 5.43994 48.8685 5.95482 48.207 7.01082C47.7195 6.04707 46.728 5.43994 45.5003 5.43994C44.2853 5.43994 43.4798 6.03394 42.978 6.79969V5.58507H40.773V14.3248H42.978V9.22932C42.978 8.08069 43.6647 7.36744 44.721 7.36744C45.7774 7.36744 46.4625 8.18607 46.4625 9.22932V14.3391H48.6675V9.22932C48.6675 8.26519 49.155 7.36744 50.4105 7.36744C51.573 7.36744 52.1667 8.21269 52.1667 9.22932V14.3248H54.375V8.64844C54.375 6.66769 52.8413 5.43994 51.006 5.43994Z" fill="currentColor"></path><path d="M57.0531 4.4364C57.8771 4.4364 58.5452 3.76835 58.5452 2.94427C58.5452 2.1202 57.8771 1.45215 57.0531 1.45215C56.229 1.45215 55.5609 2.1202 55.5609 2.94427C55.5609 3.76835 56.229 4.4364 57.0531 4.4364Z" fill="currentColor"></path><path d="M58.1624 5.58496H55.9574V14.339H58.1624V5.58496Z" fill="currentColor"></path><path d="M61.9785 11.5533V2.79932H59.775V11.7911C59.775 14.0752 61.2802 14.6561 63.0375 14.4314V12.5302C62.4274 12.5831 61.9785 12.3719 61.9785 11.5533Z" fill="currentColor"></path><path d="M69.6499 5.58496L67.4449 11.2497L65.2924 5.58721H62.916L66.3375 14.1143L66.075 14.7616C65.7713 15.5273 65.1638 15.7385 64.596 15.7385C64.2 15.7385 63.6983 15.6196 63.0514 15.3027V17.2437C63.5799 17.4782 64.1474 17.6126 64.725 17.6401C66.4418 17.6401 67.4846 16.9651 68.079 15.4876L72 5.58496H69.6499Z" fill="currentColor"></path></g></svg>
```

</details>
<details><summary>SVG #2 (227 chars)</summary>

```html
<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 3.5L5 7L8.5 3.5" stroke="var(--heading)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
```

</details>
<details><summary>SVG #3 (809 chars)</summary>

```html
<svg width="23" height="28" viewBox="0 0 23 28" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: translateY(1px);"><path d="M11.3125 4.4375L16.125 4.4375C18.4032 4.4375 20.25 6.28433 20.25 8.5625V8.5625C20.25 10.8407 18.4032 12.6875 16.125 12.6875L6.5 12.6875C4.22183 12.6875 2.375 14.5343 2.375 16.8125V16.8125C2.375 19.0907 4.22183 20.9375 6.5 20.9375H10.625" stroke="#848281" stroke-width="2" stroke-linecap="round"></path><rect x="1" y="1" width="6.875" height="6.875" rx="3.4375" fill="white" fill-opacity="0.2" stroke="#848281" stroke-width="2"></rect><path d="M16.4175 18C16.8986 17.1667 18.1014 17.1667 18.5825 18L21.1806 22.5C21.6617 23.3333 21.0603 24.375 20.0981 24.375H14.9019C13.9397 24.375 13.3383 23.3333 13.8194 22.5L16.4175 18Z" stroke="#848281" stroke-width="2"></path></svg>
```

</details>
<details><summary>SVG #4 (2131 chars)</summary>

```html
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.8666 7.80008H10.1333C8.8446 7.80008 7.79993 8.84475 7.79993 10.1334V13.8701C7.79993 15.1569 8.8431 16.2001 10.1299 16.2001H13.8699C15.1568 16.2001 16.1999 15.1569 16.1999 13.8701V10.1334C16.1999 8.84475 15.1553 7.80008 13.8666 7.80008Z" stroke="#848281" stroke-width="2" stroke-linecap="round"></path><path d="M22.5 12.0028C22.5 10.3009 21.2898 8.87787 19.6836 8.5537C19.6643 8.5498 19.6502 8.53289 19.6502 8.5132V8.5132C19.6502 8.4935 19.6643 8.47659 19.6836 8.47269C21.2898 8.14852 22.5 6.7255 22.5 5.02357C22.5 3.07797 20.9225 1.50566 18.983 1.50566C17.2959 1.50566 15.8921 2.68954 15.5428 4.26939C15.5375 4.29351 15.5162 4.31093 15.4915 4.31093V4.31093C15.4668 4.31093 15.4455 4.29348 15.4402 4.26935C15.0909 2.68394 13.6816 1.5 12 1.5C10.3184 1.5 8.90909 2.68392 8.5598 4.26379C8.55447 4.28787 8.53322 4.30528 8.50855 4.30528V4.30528C8.48383 4.30528 8.46253 4.28778 8.45727 4.26362C8.11343 2.68383 6.7041 1.5 5.01696 1.5C3.07754 1.5 1.5 3.07797 1.5 5.01791C1.5 6.71983 2.71015 8.14283 4.31632 8.46703C4.33566 8.47093 4.34976 8.48787 4.34976 8.5076V8.5076C4.34976 8.52728 4.33573 8.54419 4.31645 8.54814C2.71022 8.87775 1.5 10.2952 1.5 12.0028C1.5 13.7104 2.71018 15.1279 4.31637 15.452C4.33568 15.4559 4.34976 15.4728 4.34976 15.4925V15.4925C4.34976 15.5122 4.33568 15.5291 4.31638 15.533C2.71018 15.8571 1.5 17.2802 1.5 18.9821C1.5 20.9277 3.07754 22.5 5.01696 22.5C6.70417 22.5 8.11354 21.3161 8.45732 19.7307C8.46255 19.7065 8.48381 19.6891 8.5085 19.6891V19.6891C8.53317 19.6891 8.55442 19.7065 8.55967 19.7306C8.90348 21.3106 10.3128 22.5 12 22.5C13.6872 22.5 15.0966 21.3161 15.4404 19.7307C15.4456 19.7065 15.4668 19.6891 15.4915 19.6891V19.6891C15.5162 19.6891 15.5375 19.7065 15.5427 19.7306C15.8865 21.3106 17.2959 22.5 18.983 22.5C20.9281 22.5 22.5 20.922 22.5 18.9821C22.5 17.2802 21.2898 15.8571 19.6836 15.533C19.6643 15.5291 19.6502 15.5122 19.6502 15.4925V15.4925C19.6502 15.4728 19.6643 15.4559 19.6836 15.452C21.2898 15.1278 22.5 13.7048 22.5 12.0028Z" stroke="#848281" stroke-width="2"></path></svg>
```

</details>
<details><summary>SVG #5 (227 chars)</summary>

```html
<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 3.5L5 7L8.5 3.5" stroke="var(--heading)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
```

</details>
<details><summary>SVG #6 (1002 chars)</summary>

```html
<svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: translateY(-1px);"><path d="M13.3636 10.6359C13.3832 9.09202 14.1985 7.63115 15.4918 6.82249C14.6759 5.6374 13.3092 4.88602 11.8874 4.84078C10.3708 4.67889 8.90062 5.76366 8.12782 5.76366C7.34007 5.76366 6.15022 4.85685 4.86895 4.88366C3.19887 4.93853 1.64194 5.90417 0.82941 7.38906C-0.917205 10.4644 0.385612 14.9841 2.05872 17.47C2.89582 18.6873 3.87414 20.047 5.15425 19.9988C6.40692 19.9459 6.87477 19.1864 8.38684 19.1864C9.88489 19.1864 10.3238 19.9988 11.6299 19.9681C12.9741 19.9459 13.821 18.7454 14.6287 17.5166C15.2301 16.6493 15.693 15.6907 16 14.6763C14.4204 13.9969 13.3654 12.3802 13.3636 10.6359Z" fill="currentColor"></path><path d="M10.8966 3.20595C11.6295 2.31119 11.9906 1.16113 11.9031 0C10.7834 0.1196 9.74914 0.663834 9.00635 1.52426C8.27999 2.36494 7.90199 3.49477 7.97345 4.61152C9.09356 4.62325 10.1947 4.09376 10.8966 3.20595Z" fill="currentColor"></path></svg>
```

</details>
<details><summary>SVG #7 (341 chars)</summary>

```html
<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.5 3.29857L0.499999 16.7014C0.499998 19.0333 3.04392 20.4736 5.04349 19.2739L16.2125 12.5725C18.1546 11.4073 18.1546 8.59273 16.2125 7.42752L5.04349 0.726094C3.04392 -0.47365 0.5 0.966686 0.5 3.29857Z" fill="currentColor"></path></svg>
```

</details>
<details><summary>SVG #8 (1231 chars)</summary>

```html
<svg width="291" height="96" viewBox="0 0 291 96" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 16C0 10.3995 0 7.59921 1.08993 5.46009C2.04867 3.57847 3.57847 2.04867 5.46009 1.08993C7.59921 0 10.3995 0 16 0H333C338.601 0 341.401 0 343.54 1.08993C345.422 2.04867 346.951 3.57847 347.91 5.46009C349 7.59921 349 10.3995 349 16V67.2C349 77.2809 349 82.3214 347.038 86.1718C345.312 89.5587 342.559 92.3124 339.172 94.0381C335.321 96 330.281 96 320.2 96H28.8C18.719 96 13.6786 96 9.82817 94.0381C6.44125 92.3124 3.6876 89.5587 1.96188 86.1718C0 82.3214 0 77.2809 0 67.2V16Z" fill="#111111"></path><rect width="320" height="96" fill="white" rx="19" fill-opacity="0.1"></rect><rect width="320" height="95" stroke="white" stroke-opacity="0.1" rx="19"></rect><text fill="#999999" font-family="LFE Sans" font-size="15" font-weight="500" letter-spacing="-0.24px"><tspan x="68" y="54.8275">Send tokens or collectibles to</tspan><tspan x="68" y="74.8275">any address or ENS username.</tspan></text><text fill="white" font-family="LFE Sans" font-size="19" font-weight="600" letter-spacing="-0.494px"><tspan x="68" y="32.7315">Send</tspan></text><rect x="16" y="14" width="36" height="36" rx="18" fill="var(--app-blue)"></rect></svg>
```

</details>
<details><summary>SVG #9 (2324 chars)</summary>

```html
<svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><g transform="translate(6,9)"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.746 3.14981C12.7313 3.18912 13.6906 3.48107 14.5348 3.99872C15.3792 4.51643 16.0825 5.24395 16.5777 6.11512C16.5855 6.12897 16.5936 6.1427 16.6019 6.15631L17.3633 7.40372L16.2804 7.10918C15.4711 6.88903 14.6414 7.36802 14.4273 8.17902C14.2132 8.99003 14.6958 9.82594 15.5052 10.0461L20.2532 11.3375C21.0626 11.5577 21.8922 11.0787 22.1063 10.2677L23.3785 5.448C23.5926 4.637 23.11 3.80108 22.3006 3.58093C21.4913 3.36079 20.6616 3.83977 20.4475 4.65078L20.0794 6.04525L19.1962 4.59824C18.4471 3.28882 17.3838 2.18981 16.103 1.40451C14.8151 0.614827 13.3506 0.169025 11.8468 0.109028C10.3431 0.0490333 8.85085 0.3768 7.50928 1.05968C6.16785 1.74248 5.02088 2.75793 4.17376 4.00972C3.70475 4.70276 3.88675 5.64987 4.58026 6.12514C5.27377 6.60041 6.21617 6.42388 6.68517 5.73083C7.24851 4.8984 8.00913 4.22629 8.89443 3.77566C9.77959 3.3251 10.7607 3.1105 11.746 3.14981ZM2.14027 9.21974C2.03806 9.35707 1.95774 9.51418 1.90584 9.68729C1.90066 9.70456 1.89578 9.72193 1.89121 9.73938L0.619707 14.5564C0.405632 15.3674 0.88822 16.2033 1.6976 16.4234C2.50697 16.6436 3.33665 16.1646 3.55072 15.3536L3.91879 13.9592L4.80164 15.4056C5.55075 16.715 6.61405 17.814 7.89483 18.5993C9.18278 19.389 10.6472 19.8348 12.151 19.8948C13.6548 19.9548 15.147 19.6271 16.4886 18.9442C17.83 18.2614 18.977 17.2459 19.8241 15.9941C20.2931 15.3011 20.1111 14.354 19.4176 13.8787C18.7241 13.4034 17.7817 13.58 17.3127 14.273C16.7493 15.1054 15.9887 15.7776 15.1034 16.2282C14.2182 16.6788 13.2372 16.8934 12.2518 16.854C11.2665 16.8147 10.3073 16.5228 9.463 16.0051C8.61864 15.4874 7.91538 14.7599 7.42018 13.8887C7.4123 13.8749 7.40421 13.8612 7.39591 13.8475L6.63483 12.6006L7.71778 12.8952C8.52715 13.1153 9.35683 12.6364 9.5709 11.8253C9.78498 11.0143 9.30239 10.1784 8.49301 9.95828L3.74817 8.66771L3.73092 8.66309C3.53047 8.61059 3.32901 8.60082 3.13618 8.62821C2.94332 8.65541 2.75287 8.72064 2.57568 8.82659C2.55688 8.83782 2.53832 8.84946 2.52002 8.86151C2.36956 8.96048 2.24239 9.08234 2.14027 9.21974Z" fill="white" transform-origin="11.999108374118805px 10.001915194094181px" style="transform: none; transform-origin: 11.9991px 10.0019px;"></path></g></svg>
```

</details>
<details><summary>SVG #10 (1224 chars)</summary>

```html
<svg width="291" height="96" viewBox="0 0 291 96" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 16C0 10.3995 0 7.59921 1.08993 5.46009C2.04867 3.57847 3.57847 2.04867 5.46009 1.08993C7.59921 0 10.3995 0 16 0H333C338.601 0 341.401 0 343.54 1.08993C345.422 2.04867 346.951 3.57847 347.91 5.46009C349 7.59921 349 10.3995 349 16V67.2C349 77.2809 349 82.3214 347.038 86.1718C345.312 89.5587 342.559 92.3124 339.172 94.0381C335.321 96 330.281 96 320.2 96H28.8C18.719 96 13.6786 96 9.82817 94.0381C6.44125 92.3124 3.6876 89.5587 1.96188 86.1718C0 82.3214 0 77.2809 0 67.2V16Z" fill="#111111"></path><rect width="320" height="96" fill="white" rx="19" fill-opacity="0.01"></rect><rect width="320" height="95" stroke="white" stroke-opacity="0.01" rx="19"></rect><text fill="#999999" font-family="LFE Sans" font-size="15" font-weight="500" letter-spacing="-0.24px"><tspan x="68" y="54.8275">Swap your tokens without ever</tspan><tspan x="68" y="74.8275">leaving your wallet.</tspan></text><text fill="white" font-family="LFE Sans" font-size="19" font-weight="600" letter-spacing="-0.494px"><tspan x="68" y="32.7315">Swap</tspan></text><rect x="16" y="14" width="36" height="36" rx="18" fill="var(--app-gray)"></rect></svg>
```

</details>

---

## Design Critique (AI Phase 1)

<details>
<summary>Expand raw critique</summary>

# Layout Analysis

---

## SECTION INVENTORY

| # | Name | Vertical Span | Z-Layer | Background | Dominant Visual |
|---|------|---------------|---------|------------|-----------------|
| 1 | **nav** | 0–8% | floating (fixed/sticky) | solid-color (white/near-white) | interactive-controls |
| 2 | **hero** | 8–68% | base | image (illustrated character collage left + right) + near-white center | typography + interactive-controls |
| 3 | **content / feature-intro** | 68–100% | base | solid-color (white) | typography + partial card previews |

---

## SPATIAL GRID ANALYSIS

### NAV (floating)
- **Layout engine:** Flexbox
- **Column count:** 2 zones — left cluster (logo + nav links) and right cluster (Log In + Get Started)
- **Gap size:** ~24px (spacing.lg) between nav link items
- **Item pattern:** fluid, space-between
- **Z-index tier:** floating; positioned fixed/sticky at top of viewport
- **Position type:** sticky/fixed — sits above all base-layer content

### HERO — CTA Button Row
- **Layout engine:** Flexbox (row)
- **Column count:** 2 (Download on iOS | Watch the Video)
- **Gap size:** ~16px (spacing.md)
- **Item pattern:** fixed-width buttons, center-aligned
- **Note:** Illustrated emoji/character assets float absolutely on left and right edges, outside the centered text column

### FEATURE-INTRO — Card Preview Row (partial, bottom of viewport)
- **Layout engine:** CSS Grid (inferred from 3-column equal-width preview cards)
- **Column count:** 3
- **Gap size:** ~32px (spacing.xl)
- **Item pattern:** fluid / equal-width
- **Masonry note:** No masonry; cards appear uniform height; only tops visible at viewport bottom

---

## ASSET AUDIT

| Asset Role | Source / URL |
|------------|-------------|
| **Hero bg** | No solid background image — center area is white/off-white; character/emoji illustrations are decorative absolutely-positioned images flanking center content |
| **Logo/brand** | Inline SVG or icon glyph (grid/square icon) + "Family" wordmark text — **text-only brand** with inline-svg icon; no external image URL confirmed in Physical Data |
| **Hero character illustrations (left)** | Decorative illustration asset (blue cloud character, red heart, Ethereum diamond, etc.) — no confirmed URL in Physical Data assets |
| **Hero character illustrations (right)** | Decorative illustration asset (green pill character, orange triangle character, magnifying glass, padlock, etc.) — no confirmed URL in Physical Data assets |
| **Card images (feature-intro)** | Partial card previews visible at bottom — no asset URLs confirmed in Physical Data |
| **Icon set** | Inline SVG icons: Apple logo (Download button), Play triangle (Watch Video button), chevron-down icons (Developers/Resources dropdowns) — inline-svg, no external file URL confirmed |
| **CTA button shadow** | `color(display-p3 0.94902 0.941176 0.929412) 0px 0px 0px 0px inset` — applied to pill-shaped buttons |

> **Rule applied:** No URLs invented. All assets marked as "no confirmed URL" where Physical Data provides none.

---

## COLOR SEMANTICS

| Observed Hex (visual estimate) | Semantic Role | Evidence |
|-------------------------------|---------------|---------|
| `#1A1A1A` / near-black | **Text-Main** | Hero H1 heading ("Your favorite crypto wallet."), feature section heading, nav links |
| `#555555` / medium gray | **Text-Muted** | Hero subheading paragraph ("Explore Ethereum with the best wallet for iOS…") |
| `#FFFFFF` / white | **Neutral-Base** | Page background, nav background, hero center panel background |
| `#F2F0EC` / warm off-white | **Neutral-Surface** | Inset shadow value `color(display-p3 0.949 0.941 0.929)` = approx `#F2F0ED`; matches button inset shadow and card surface tones |
| `#1A1A1A` / near-black | **Brand-Primary** | "Download on iOS" filled pill button background; "Get Started" nav button background |
| `#FFFFFF` / white | **Text-Inverse** | Text inside filled black buttons ("Download on iOS", "Get Started") |
| `#F5F4F1` / warm light gray | **Neutral-Overlay** | "Watch the Video" ghost/outline button background; "Log In" nav button background |
| `#E0DEDA` / light warm border | **Border-Default** | Subtle border on "Log In" button, "Watch the Video" button outline |
| `#2D6FE8` / blue | **Brand-Accent** | Blue cloud character illustration (left hero); Ethereum diamond icon (left hero) |
| `#E8443A` / red | **Status-Error / decorative accent** | Red heart illustration, red circular character (right hero) |
| `#4CAF70` / green | **Status-Success / decorative accent** | Green pill character (right hero) |

### Typography Confirmation (Physical Data cross-reference)
- Hero H1: **68px / 4.25rem**, weight 500, letter-spacing −1.36px, line-height 1.1 → `h1` role ✅
- Feature heading ("Explore Ethereum in a whole new way."): **44px / 2.75rem**, weight 400, ls 0px → `h3` role ✅
- Body subtext: **19px / 1.1875rem**, weight 400, ls −0.3px → `body-lg` role ✅
- Nav links: **15px / 0.9375rem**, weight 500, ls −0.13px → `body` role ✅
- Button labels: **14px / 0.875rem**, weight 600, ls −0.09px → `body-sm` role ✅

</details>
