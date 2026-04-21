# Design Spec — dribbble.com

> **Extracted:** Tue, 21 Apr 2026 12:31:42 GMT
> **URL:** https://dribbble.com/
> **Paradigm:** social-feed · **Density:** comfortable · **Motif:** pink-brand-accent, dark-hero-imagery, pill-tag-navigation, clean-white-surface, search-first-discovery

---

## Visual Weight Verdict

**GRID DOMINANT**

This social feed is sustained by **a structured card grid and data density**.

### Evidence
- 50 image assets detected (heavy image density)
- 1 SVG asset detected
- Hero section: split layout — "Discover the World’s Top Designers"
- Card grid: 4-column, flat
- Layout: single-column / nav top-fixed
- Density: comfortable (4px base grid)
- Visual hierarchy: functional

---

## Color Architecture

| Role | Value | Token |
|---|---|---|
| Brand Primary | #EA4C89 | `#EA4C89` |
| Brand Secondary | #111111 | `#111111` |
| Brand Accent | #2563EB | `#2563EB` |
| Background Page | #FFFFFF | `#FFFFFF` |
| Background Surface | #F3F4F6 | `#F3F4F6` |
| Background Overlay | rgba(6,3,24,0.1) | rgba(6,3,24,0.1) |
| Text Primary | #0F0F1A | `#0F0F1A` |
| Text Secondary | #6B7280 | `#6B7280` |
| Text Inverse | #FFFFFF | `#FFFFFF` |
| Border | #E5E7EB | `#E5E7EB` |
| Status Success | #10B981 | `#10B981` |
| Status Warning | #F59E0B | `#F59E0B` |
| Status Error | #EF4444 | `#EF4444` |

---

## Typography System

**Families:** body — `'Mona Sans', Arial, sans-serif` · heading — `'Mona Sans', Arial, sans-serif` · mono — `ui-monospace, monospace`

| Level | Size | Line Height |
|---|---|---|
| `xs` | 12px | 1.3 |
| `sm` | 13px | 1 |
| `base` | 14px | 1.4 |
| `lg` | 16px | 1.8 |
| `xl` | 20px | 1.4 |
| `2xl` | 24px | 1.3 |
| `3xl` | 30px | 1.2 |
| `4xl` | 36px | 1.1 |

---

## Spacing

- **Base unit:** 4px
- **Scale:** xs=4px · sm=8px · md=16px · lg=24px · xl=32px · 2xl=48px · 3xl=64px

---

## Site Architecture

| Property | Value |
|---|---|
| Paradigm | social-feed |
| Layout | single-column |
| Nav position | top-fixed |
| Density | comfortable |
| Dominant element | typography |
| Visual hierarchy | functional |

---

## Skeleton

| Component | Details |
|---|---|
| Hero | present · split · "Discover the World’s Top Designers" · 1 CTA |
| Nav | brand: "Explore" · items: Hire Talent, Get Hired, Community |
| Cards | 4-column grid · flat |
| Footer | 2 columns |

---

## Physical Measurements

### Spacing (computed CSS)
- **Base unit:** 4px
- **Measured steps:** 4px · 8px · 12px · 16px · 20px · 24px · 28px · 32px · 36px · 40px · 72px · 116px
- **Named scale:** xs=4px sm=8px md=16px lg=24px xl=32px 2xl=48px 3xl=64px

### Typography (computed CSS)
- **Root body size:** 14px / 0.875rem
- **Detected families:** Mona Sans, Arial

| px | rem | Line Height | Weight | Letter Spacing | Role |
|---|---|---|---|---|---|
| 12px | 0.75rem | 1.3 | 500 | 0px | body-sm |
| 13px | 0.8125rem | 1 | 600 | 0px | body |
| 14px | 0.875rem | 1.4 | 400 | 0px | body |
| 16px | 1rem | 1.8 | 400 | 0px | body |

### Box Shadows (measured from UI components)

| Frequency | CSS Value |
|---|---|
| ×2 | `rgba(0, 0, 0, 0.01) 0px 2px 2px 0px` |
| ×1 | `rgba(6, 3, 24, 0.1) 0px 2px 4px 0px` |

---

## Asset Inventory

### Images (50)
- https://cdn.dribbble.com/users/4675593/avatars/normal/0ccd17207b5275eae86397d5db38f3f5.png?1677170175
- https://cdn.dribbble.com/users/16100846/avatars/normal/4f9478f9f99048a2f9ac3e9f61a90775.png?1683374189
- https://cdn.dribbble.com/users/10429876/avatars/normal/366d4276fd03be91107865a894700d04.png?1642355761
- https://cdn.dribbble.com/users/2203197/avatars/normal/41c750ab032e2eca91ef43c6fb2d648b.png?1715411380
- https://cdn.dribbble.com/users/481951/avatars/normal/4fc38bd50cdee9b1bbe1f9e1d1f22683.jpg?1643341651
- https://cdn.dribbble.com/users/2954749/avatars/normal/75c46a36aa3d88f168ceb513dbd0ffc6.png?1763045752
- https://cdn.dribbble.com/users/3562886/avatars/normal/fa16bfe21929cad65d6f96bcc20b7b61.jpeg?1756129633
- https://cdn.dribbble.com/users/1617600/avatars/normal/64dd87cbee0b4c113707222b645d3ff3.png?1770136497
- https://cdn.dribbble.com/users/2339830/avatars/normal/32c2b428bed013c1a9881f07ad1231b8.png?1668152671
- https://cdn.dribbble.com/users/7142728/avatars/normal/1947d79d3d7042e06db9ca3cd55d93cb.png?1615062154
- https://cdn.dribbble.com/users/6848313/avatars/normal/0fc82952cfd3b6d1e496259ff75acadf.png?1611172914
- https://cdn.dribbble.com/users/4053754/avatars/normal/55dd34a2285fa77014068c00427eee21.png?1729855991
- https://cdn.dribbble.com/users/116726/avatars/normal/7a9aa8d778caa1475d5757075a01ade8.png?1594021464
- https://cdn.dribbble.com/users/5049071/avatars/normal/58237f63651e4bccd84f2036d95e0c3e.png?1759932211
- https://cdn.dribbble.com/userupload/47463863/file/4abf4c749799bc1f9b268943d527f988.png?crop=3x0-2323x1741&format=webp&resize=400x300&vertical=center
- https://cdn.dribbble.com/userupload/47463863/file/4abf4c749799bc1f9b268943d527f988.png?crop=3x0-2323x1741&format=webp&resize=320x240&vertical=center
- https://cdn.dribbble.com/userupload/47463863/file/4abf4c749799bc1f9b268943d527f988.png?crop=3x0-2323x1741&format=webp&resize=450x338&vertical=center
- https://cdn.dribbble.com/userupload/47463863/file/4abf4c749799bc1f9b268943d527f988.png?crop=3x0-2323x1741&format=webp&resize=640x480&vertical=center
- https://cdn.dribbble.com/userupload/47463863/file/4abf4c749799bc1f9b268943d527f988.png?crop=3x0-2323x1741&format=webp&resize=700x525&vertical=center
- https://cdn.dribbble.com/userupload/47463863/file/4abf4c749799bc1f9b268943d527f988.png?crop=3x0-2323x1741&format=webp&resize=800x600&vertical=center
_…and 30 more_

### External SVGs (1)
- https://dribbble.com/assets/icons/close-v2-ee745bc0fbb9fb4478f0276268826717013f0846f4641f5c4089670432a65335.svg

### Inline SVGs (10 captured)
_Raw <svg> source — icons, logos, illustrations. Embed directly in generated HTML._

<details><summary>SVG #1 (672 chars)</summary>

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" fill="none" role="img" aria-hidden="true" class="icon announcements__close-icon">
<path d="M8.28596 6.51819C7.7978 6.03003 7.00634 6.03003 6.51819 6.51819C6.03003 7.00634 6.03003 7.7978 6.51819 8.28596L11.2322 13L6.51819 17.714C6.03003 18.2022 6.03003 18.9937 6.51819 19.4818C7.00634 19.97 7.7978 19.97 8.28596 19.4818L13 14.7678L17.714 19.4818C18.2022 19.97 18.9937 19.97 19.4818 19.4818C19.97 18.9937 19.97 18.2022 19.4818 17.714L14.7678 13L19.4818 8.28596C19.97 7.7978 19.97 7.00634 19.4818 6.51819C18.9937 6.03003 18.2022 6.03003 17.714 6.51819L13 11.2322L8.28596 6.51819Z" fill="currentColor"></path>
</svg>
```

</details>
<details><summary>SVG #2 (7294 chars)</summary>

```html
<svg xmlns="http://www.w3.org/2000/svg" width="210" height="59" viewBox="0 0 210 59" fill="none">
    <title>Dribbble: the community for graphic design</title>
<path fill-rule="evenodd" clip-rule="evenodd" d="M206.622 31.928C207.065 31.4116 207.85 31.4352 208.253 31.986H208.25L209.784 34.0834C210.075 34.4864 210.073 35.0425 209.769 35.4349C207.106 38.8893 202.44 42.2143 196.81 42.5359C192.366 42.7887 188.701 41.1051 186.706 37.9221C186.311 37.2925 185.44 37.2557 184.997 37.8511C182.63 41.0286 179.766 43.5134 176.782 43.6845C171.467 43.9876 169.966 40.4228 171.28 32.563C171.412 31.7805 170.726 31.1192 169.987 31.3141C168.885 31.6065 167.715 31.7356 166.528 31.633C166.034 31.5907 165.571 31.8912 165.422 32.3811C163.455 38.8418 158.774 44.8518 152.715 45.1997C148.847 45.421 143.069 43.205 143.647 33.9462C143.695 33.1927 143.019 32.5999 142.323 32.8106C141.11 33.1795 139.804 33.3534 138.474 33.2401C137.981 33.1979 137.52 33.4983 137.371 33.9885C135.404 40.449 130.723 46.4592 124.664 46.8068C120.796 47.0282 115.018 44.8124 115.596 35.5536C115.644 34.7998 114.968 34.207 114.272 34.418C113.059 34.7869 111.753 34.9634 110.423 34.8473C109.93 34.8053 109.469 35.1057 109.32 35.5956C107.352 42.0564 102.672 48.0664 96.6132 48.4142C93.8613 48.5723 90.1398 47.4945 88.4308 43.5264C88.1016 42.7599 87.1144 42.6438 86.6257 43.3105C84.2334 46.5751 81.3193 49.152 78.2762 49.3259C75.1571 49.505 73.4509 48.2535 72.7091 46.0216C72.4458 45.2339 71.4609 45.0467 70.9293 45.6712C68.8002 48.1744 66.3749 50.0082 63.9216 50.1479C60.1393 50.3666 57.9619 47.563 57.7823 44.1667C57.5747 40.204 59.2887 35.564 61.2025 30.4999C61.4684 29.7964 60.9873 29.0348 60.2608 29.0032C59.157 28.956 57.8963 28.8399 56.7113 28.6185C56.1771 28.5159 55.6583 28.8479 55.5063 29.3907C53.243 37.4716 49.7771 45.392 46.8529 50.074C46.5263 50.5984 45.8505 50.7381 45.3593 50.377L43.1264 48.7331C42.6682 48.393 42.5441 47.7397 42.8504 47.247C47.0759 40.478 50.8278 29.8807 52.1215 22.0421C52.2025 21.5415 52.61 21.17 53.0986 21.141L56.0683 20.9697C56.7493 20.9302 57.2861 21.5652 57.162 22.2634L57.1493 22.3372C57.0379 22.959 57.4532 23.5439 58.0532 23.6257C60.7164 23.992 64.6963 24.0366 67.3975 23.9313C68.157 23.9023 68.6938 24.6875 68.4178 25.4226C66.2507 31.1876 63.3469 39.1765 63.5139 42.3382C63.5899 43.7662 64.2204 44.5462 65.3291 44.4829C67.4508 44.3619 70.7141 40.0959 73.1876 35.3455C73.2331 35.261 73.2659 35.169 73.2862 35.0741C74.1196 31.3543 75.3565 27.2068 76.6061 23.0163L76.6837 22.7561C76.8128 22.3188 77.1901 22.0131 77.6306 21.9868L81.1876 21.7839C81.9219 21.7417 82.4712 22.4795 82.2485 23.2093C82.0654 23.8112 81.883 24.409 81.7023 25.0014C78.5723 35.2603 75.9438 43.8759 79.4838 43.6742C81.7978 43.5422 85.0764 39.6164 87.8966 34.0279C87.9421 33.9356 87.9751 33.8381 87.9954 33.7355C88.1372 33.0055 88.3092 32.2416 88.5195 31.4432C90.1639 24.8753 92.0286 18.3691 93.8955 11.855C94.4717 9.8446 95.0481 7.83341 95.6182 5.81945C95.7449 5.37417 96.1245 5.06062 96.57 5.03426L100.221 4.82611C100.963 4.78396 101.512 5.52962 101.279 6.26474C99.8208 10.8388 98.2967 15.7106 96.8487 20.4006C96.5448 21.3887 97.603 22.2107 98.4386 21.6416C99.8791 20.6562 101.545 20.0027 103.158 19.9105C107.267 19.676 110.064 23.0565 110.332 28.1496C110.347 28.4184 110.363 28.7082 110.37 29.0032C110.385 29.5673 110.808 30.023 111.348 30.0704C113.282 30.2417 115.259 29.6673 116.786 28.3051C116.943 28.1654 117.049 27.9757 117.102 27.7701C118.616 21.8916 120.287 16.0568 121.959 10.2147C122.532 8.21455 123.105 6.21353 123.672 4.20956C123.798 3.76427 124.178 3.45072 124.624 3.42438L128.274 3.21623C129.016 3.17408 129.566 3.91972 129.333 4.65484C127.874 9.22892 126.35 14.1007 124.902 18.7907C124.598 19.7788 125.657 20.6008 126.492 20.0317C127.933 19.0463 129.599 18.3929 131.211 18.3006C135.32 18.0662 138.117 21.4466 138.386 26.5399C138.401 26.8084 138.416 27.0985 138.424 27.3935C138.436 27.9573 138.862 28.4132 139.401 28.4607C141.335 28.6318 143.312 28.0573 144.839 26.6951C144.996 26.5557 145.102 26.3659 145.156 26.1604C146.67 20.2818 148.34 14.4471 150.013 8.6051C150.586 6.60484 151.158 4.60372 151.725 2.59968C151.852 2.15439 152.232 1.84085 152.677 1.8145L156.328 1.60635C157.07 1.56419 157.619 2.30985 157.386 3.04497C155.928 7.61902 154.404 12.4908 152.956 17.1808C152.652 18.1689 153.71 18.991 154.546 18.4219C155.986 17.4364 157.652 16.783 159.265 16.6908C163.374 16.4563 166.171 19.8367 166.44 24.9299C166.455 25.2013 166.47 25.4885 166.477 25.7835C166.493 26.3447 166.913 26.8032 167.452 26.8507C169.323 27.0166 171.237 26.4844 172.741 25.2171C172.908 25.0774 173.024 24.8798 173.08 24.6637C174.804 18.0187 177.336 9.31324 179.777 0.981894C179.906 0.541877 180.285 0.236236 180.726 0.209888L184.344 0.0017367C185.078 -0.0404207 185.627 0.692063 185.407 1.42191C182.047 12.5778 179.308 22.3372 177.797 28.0944C175.789 35.9039 175.711 38.1567 177.994 38.025C179.911 37.9143 182.493 35.1952 184.928 31.0847C185.025 30.924 185.075 30.7397 185.083 30.5526C185.402 22.324 190.447 14.8385 197.946 14.409C202.969 14.1218 205.721 17.916 205.918 21.6495C206.293 28.7767 199.248 33.3324 192.42 32.9107C191.625 32.8606 191.047 33.7145 191.397 34.4574C192.351 36.4967 194.359 37.6352 197.787 37.4374C201.048 37.2531 204.468 34.439 206.622 31.928ZM93.7548 33.9278C92.1345 40.4228 94.1017 42.9652 96.646 42.8203C100.823 42.5805 104.864 34.9263 104.553 29.019C104.416 26.4396 102.907 25.0958 101.145 25.1961C98.2106 25.3646 95.0512 28.745 93.7548 33.9278ZM121.808 32.3207C120.188 38.8154 122.155 41.3581 124.7 41.2131H124.697C128.874 40.9734 132.917 33.3192 132.606 27.4119C132.472 24.8324 130.96 23.4886 129.198 23.5887C126.264 23.7574 123.105 27.1379 121.808 32.3207ZM149.862 30.7133C148.242 37.2082 150.209 39.7509 152.753 39.606H152.751C156.925 39.3662 160.971 31.712 160.66 25.8047C160.525 23.2251 159.014 21.8814 157.252 21.9815C154.318 22.1501 151.158 25.5307 149.862 30.7133ZM200.584 22.2239C200.559 20.5218 199.513 19.2887 197.817 19.3862H197.815C194.483 19.5785 191.875 23.1856 191.045 27.562C190.913 28.2577 191.422 28.9058 192.103 28.8899C196.407 28.7821 200.721 25.9416 200.584 22.2239ZM44.3525 25.3837C43.9171 12.1962 35.3423 3.49339 22.6712 3.94658C17.2307 4.19426 11.0052 6.25733 6.32164 9.9461C5.88113 10.2939 5.76719 10.9315 6.06593 11.4163L8.05331 14.6519C8.39254 15.2052 9.11407 15.3185 9.60776 14.9075C13.1724 11.9459 18.0383 10.0041 22.7193 9.79855C31.403 9.43757 37.7828 14.9971 38.1551 25.7367C38.6209 38.2417 30.2157 52.5461 16.7091 53.3207C16.2382 53.3471 15.7471 53.3577 15.2559 53.3577C14.5673 53.3577 14.0585 52.6858 14.2306 51.9901C16.8357 41.4744 19.8763 30.1974 22.9776 19.7029C23.1928 18.973 22.6459 18.2458 21.9143 18.288L17.9648 18.5146C17.5218 18.5409 17.142 18.8492 17.0129 19.2918C14.0331 29.6045 11.0508 40.7895 8.36723 51.284C8.21279 51.89 7.59761 52.2379 7.02544 52.0427C5.62543 51.566 4.34693 51.0232 3.2583 50.3881C2.73677 50.0825 2.07601 50.2987 1.80765 50.8571L0.11142 54.4037C-0.139216 54.9281 0.0455967 55.5709 0.539275 55.8527C4.38489 58.0345 10.223 59.2806 16.0914 58.9462C35.4032 57.8393 44.864 40.0015 44.3525 25.3889V25.3837ZM82.3044 9.18082C79.955 9.31518 77.8713 11.9553 78.0183 14.7377C78.1143 16.5715 79.2917 17.7967 81.1195 17.694C83.4689 17.5596 85.6106 14.7798 85.4714 12.1318C85.3754 10.298 84.0005 9.08333 82.3044 9.18082Z" fill="currentColor"></path>
</svg>
```

</details>
<details><summary>SVG #3 (719 chars)</summary>

```html
<svg class="aa-SubmitIcon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M16.041 15.856c-0.034 0.026-0.067 0.055-0.099 0.087s-0.060 0.064-0.087 0.099c-1.258 1.213-2.969 1.958-4.855 1.958-1.933 0-3.682-0.782-4.95-2.050s-2.050-3.017-2.050-4.95 0.782-3.682 2.050-4.95 3.017-2.050 4.95-2.050 3.682 0.782 4.95 2.050 2.050 3.017 2.050 4.95c0 1.886-0.745 3.597-1.959 4.856zM21.707 20.293l-3.675-3.675c1.231-1.54 1.968-3.493 1.968-5.618 0-2.485-1.008-4.736-2.636-6.364s-3.879-2.636-6.364-2.636-4.736 1.008-6.364 2.636-2.636 3.879-2.636 6.364 1.008 4.736 2.636 6.364 3.879 2.636 6.364 2.636c2.125 0 4.078-0.737 5.618-1.968l3.675 3.675c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414z"></path></svg>
```

</details>
<details><summary>SVG #4 (412 chars)</summary>

```html
<svg class="aa-LoadingIcon" viewBox="0 0 100 100" width="20" height="20"><circle cx="50" cy="50" fill="none" r="35" stroke="currentColor" stroke-dasharray="164.93361431346415 56.97787143782138" stroke-width="6">
  <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;90 50 50;180 50 50;360 50 50" keyTimes="0;0.40;0.65;1"></animateTransform>
</circle></svg>
```

</details>
<details><summary>SVG #5 (436 chars)</summary>

```html
<svg class="aa-ClearIcon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M5.293 6.707l5.293 5.293-5.293 5.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l5.293-5.293 5.293 5.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-5.293-5.293 5.293-5.293c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z"></path></svg>
```

</details>
<details><summary>SVG #6 (386 chars)</summary>

```html
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" role="img" aria-hidden="true" class="icon ">
  <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
```

</details>
<details><summary>SVG #7 (597 chars)</summary>

```html
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" role="img" aria-hidden="true" class="icon ">
  <path d="M22 7L14.1314 14.8686C13.7354 15.2646 13.5373 15.4627 13.309 15.5368C13.1082 15.6021 12.8918 15.6021 12.691 15.5368C12.4627 15.4627 12.2646 15.2646 11.8686 14.8686L9.13137 12.1314C8.73535 11.7354 8.53735 11.5373 8.30902 11.4632C8.10817 11.3979 7.89183 11.3979 7.69098 11.4632C7.46265 11.5373 7.26465 11.7354 6.86863 12.1314L2 17M22 7H15M22 7V14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
```

</details>
<details><summary>SVG #8 (953 chars)</summary>

```html
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" role="img" aria-hidden="true" class="icon ">
<path d="M4.5 22V17M4.5 7V2M2 4.5H7M2 19.5H7M13 3L11.2658 7.50886C10.9838 8.24209 10.8428 8.60871 10.6235 8.91709C10.4292 9.1904 10.1904 9.42919 9.91709 9.62353C9.60871 9.84281 9.24209 9.98381 8.50886 10.2658L4 12L8.50886 13.7342C9.24209 14.0162 9.60871 14.1572 9.91709 14.3765C10.1904 14.5708 10.4292 14.8096 10.6235 15.0829C10.8428 15.3913 10.9838 15.7579 11.2658 16.4911L13 21L14.7342 16.4911C15.0162 15.7579 15.1572 15.3913 15.3765 15.0829C15.5708 14.8096 15.8096 14.5708 16.0829 14.3765C16.3913 14.1572 16.7579 14.0162 17.4911 13.7342L22 12L17.4911 10.2658C16.7579 9.98381 16.3913 9.8428 16.0829 9.62353C15.8096 9.42919 15.5708 9.1904 15.3765 8.91709C15.1572 8.60871 15.0162 8.24209 14.7342 7.50886L13 3Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
```

</details>
<details><summary>SVG #9 (1539 chars)</summary>

```html
<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none" role="img" aria-hidden="true" class="icon ">
<path d="M19.9818 11.1647V6.42118C19.9818 4.52359 19.9818 3.57479 19.5939 2.85001C19.2527 2.21247 18.7082 1.69414 18.0385 1.3693C17.2772 1 16.2805 1 14.2873 1H6.69454C4.70126 1 3.70463 1 2.9433 1.3693C2.27361 1.69414 1.72914 2.21247 1.38792 2.85001C1 3.57479 1 4.52359 1 6.42118V18.1671C1 20.0646 1 21.0134 1.38792 21.7382C1.72914 22.3758 2.27361 22.8941 2.9433 23.2189C3.70463 23.5882 4.70126 23.5882 6.69454 23.5882H10.4909M11.0841 11.1647H5.74545M6.93181 15.6824H5.74545M15.2363 6.64706H5.74545M14.7752 25V22.1765M14.8529 16.2471V13.4235M13.4033 14.8353H16.3025M13.3256 23.5882H16.2248M19.7815 13.9882L18.776 16.5344C18.6124 16.9485 18.5307 17.1555 18.4035 17.3296C18.2908 17.484 18.1524 17.6188 17.9939 17.7286C17.8151 17.8524 17.6025 17.932 17.1774 18.0913L14.563 19.0706L17.1774 20.0499C17.6025 20.2091 17.8151 20.2888 17.9939 20.4126C18.1524 20.5223 18.2908 20.6572 18.4035 20.8115C18.5307 20.9857 18.6124 21.1927 18.776 21.6068L19.7815 24.1529L20.787 21.6068C20.9505 21.1927 21.0323 20.9857 21.1594 20.8115C21.2721 20.6572 21.4106 20.5223 21.5691 20.4126C21.7479 20.2888 21.9605 20.2091 22.3856 20.0499L25 19.0706L22.3856 18.0913C21.9605 17.932 21.7479 17.8524 21.5691 17.7286C21.4106 17.6188 21.2721 17.484 21.1594 17.3297C21.0323 17.1555 20.9505 16.9485 20.787 16.5344L19.7815 13.9882Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
```

</details>
<details><summary>SVG #10 (743 chars)</summary>

```html
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" role="img" aria-hidden="true" class="icon ">
  <path d="M22 21V19C22 17.1362 20.7252 15.5701 19 15.126M15.5 3.29076C16.9659 3.88415 18 5.32131 18 7C18 8.67869 16.9659 10.1159 15.5 10.7092M17 21C17 19.1362 17 18.2044 16.6955 17.4693C16.2895 16.4892 15.5108 15.7105 14.5307 15.3045C13.7956 15 12.8638 15 11 15H8C6.13623 15 5.20435 15 4.46927 15.3045C3.48915 15.7105 2.71046 16.4892 2.30448 17.4693C2 18.2044 2 19.1362 2 21M13.5 7C13.5 9.20914 11.7091 11 9.5 11C7.29086 11 5.5 9.20914 5.5 7C5.5 4.79086 7.29086 3 9.5 3C11.7091 3 13.5 4.79086 13.5 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
```

</details>

---

## Design Critique (AI Phase 1)

<details>
<summary>Expand raw critique</summary>

# Layout Analysis: Dribbble Homepage

---

## SECTION INVENTORY

| # | Name | Vertical Span | Z-Layer | Background | Dominant Visual |
|---|------|--------------|---------|------------|----------------|
| 1 | **nav** | 0–8% | floating (fixed/sticky) | solid-color (#FFFFFF) | interactive-controls |
| 2 | **hero** | 8–65% | base | solid-color (#FFFFFF) | typography + imagery |
| 3 | **cta-banner (project brief)** | 55–63% | base | solid-color (light gray/off-white) | typography + interactive-controls |
| 4 | **filter-bar** | 63–72% | base | solid-color (#FFFFFF) | interactive-controls |
| 5 | **content/card-grid (partial)** | 72–88% | base | solid-color (#FFFFFF) | imagery |
| 6 | **toast/notification-bar** | 88–100% | overlay (fixed bottom) | solid-color (#FFFFFF/near-white) | typography + interactive-controls |

---

## SPATIAL GRID ANALYSIS

### Navigation Bar
- **Layout engine:** Flexbox
- **Column count:** 2 zones (left: logo + nav links; right: auth CTAs)
- **Gap size:** ~24px (lg) between nav items, visually consistent with spacing scale
- **Item pattern:** fluid
- **Z-index tier:** floating, z > base (sticky/fixed, likely z=100+)
- **Position type:** fixed top

### Hero Section
- **Layout engine:** Flexbox (2-column split)
- **Column count:** 2 — left: text + search (~45% width); right: hero image (~55% width)
- **Gap size:** ~116px horizontal gap (matches 116px in spacing scale) between left content and right image
- **Item pattern:** fluid left, fixed-aspect-ratio right
- **Sub-elements (search tabs):** Flexbox row, gap ≈ 8px (sm)
- **Popular tags:** Flexbox row, gap ≈ 8px (sm), pill/badge pattern

### CTA Banner (Project Brief)
- **Layout engine:** Flexbox (single row)
- **Column count:** 1 row — icon badge + label pill + body text
- **Gap size:** ~16px (md) internal padding
- **Item pattern:** fluid width, full-bleed contained box
- **Border:** visible subtle border, rounded corners

### Filter Bar (Category Tabs)
- **Layout engine:** Flexbox (single row, overflow scroll implied by truncation "Ty›")
- **Column count:** N/A — horizontal tab list
- **Gap size:** ~8–12px between tab items
- **Item pattern:** fixed-width pill buttons, fluid container
- **Overflow indicator:** right arrow/chevron visible (›), indicating horizontal scroll

### Card Grid (Partial, bottom of viewport)
- **Layout engine:** CSS Grid (inferred from 3-column equal-width pattern)
- **Column count:** 3
- **Gap size:** ~32px (xl) based on visual column spacing
- **Item pattern:** fluid, aspect-ratio-locked (card images appear 16:10 or similar)
- **Masonry note:** Not detected — uniform row heights

### Toast / Notification Bar (Bottom)
- **Layout engine:** Flexbox (single row)
- **Z-index tier:** overlay, position=fixed bottom
- **Position type:** fixed bottom, full viewport width
- **Column count:** text block (left) + CTA button (right) + close (×) icon (far right)
- **Gap size:** ~24px between text and button

---

## ASSET AUDIT

| Asset | Source / Value |
|-------|---------------|
| **Hero bg** | No full-page background gradient detected; hero image is a contained right-column card |
| **Hero image (right column)** | Apple Watch UI mockup — dark navy/blue background with watch face showing "06:51"; URL not confirmed in Physical Data — **no asset URL found in Physical Data** |
| **Logo/brand** | Dribbble wordmark logo — inline SVG or `<img>` top-left; **no asset URL confirmed in Physical Data** — text-equivalent "Dribbble" with pink sphere icon |
| **Card images (bottom grid)** | 3 partial cards visible at viewport bottom — images appear as colored placeholder/loading state (pink/coral solid fills); **no asset URLs found in Physical Data** |
| **Fivecube badge** | Small circular avatar/logo overlay on hero image bottom-right; **no asset URL in Physical Data** |
| **Icon set** | Inline SVGs confirmed: search icon (magnifier in pink circle), shots icon, designers icon (person silhouette), services icon (tag/grid), sparkle icon (✦ for Project Brief), filter icon (lines), chevron/dropdown arrows; **inline-svg count: ~8–10 instances** |
| **"NEW" badge** | CSS-rendered pill badge (text + background), not an image asset |

---

## COLOR SEMANTICS

| Observed Hex | Semantic Role | Evidence / Components |
|-------------|--------------|----------------------|
| `#EA4C89` | **Brand-Primary** | Dribbble logo sphere, search button background, active "Shots" tab background, popular tag border tint |
| `#FFFFFF` | **Neutral-Base** | Page background, nav background, card surfaces, notification bar background |
| `#1A1A2E` (near-black, ~`#0F0F1A`) | **Text-Main** | Hero headline "Discover the World's Top Designers", nav link text |
| `#6B7280` (medium gray) | **Text-Muted** | Hero subtext "Explore work from the most talented…", search placeholder text, popular tag labels |
| `#000000` / `#111111` | **Brand-Secondary** | "Log in" button background (filled dark), nav CTA contrast |
| `#F3F4F6` (light gray, ~`#F1F0F2`) | **Neutral-Surface** | Search input background, filter tab backgrounds (inactive), CTA banner background |
| `#E5E7EB` | **Border-Default** | Search input border, pill/tag borders (dashboard, landing page, etc.), filter tabs |
| `#FFFFFF` on `#EA4C89` | **Text-Inverse** | Search icon inside pink button, active tab text |
| `#3B82F6` / `#2563EB` | **Brand-Accent** | "Browse Design Agencies →" link text (blue underline link) |
| `#10B981` (implied) / subtle | **Status-Success** | Not clearly present |
| `#0B0E2D` (deep navy) | **Neutral-Overlay** | Hero image background (Apple Watch card dark bg), reinforced by Physical Data shadow: `rgba(6, 3, 24, 0.1)` matching deep navy tint |
| `#6B21A8` / mid-purple tint | **Brand-Accent (secondary)** | "Discover" active filter tab has darker filled background compared to siblings (visually ~`#1F1F2E`) |

### Box Shadow Cross-Reference (Physical Data)
- **`shadow.md`** → `rgba(0,0,0,0.01) 0px 2px 2px 0px` (×2 occurrences) — applied to cards/panels; extremely subtle lift
- **`shadow.sm`** → `rgba(6,3,24,0.1) 0px 2px 4px 0px` (×1) — slightly stronger, applied to elevated component (likely "Log in" button or notification bar)

</details>
