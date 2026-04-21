# Design Spec — cosmos.chaos.com

> **Extracted:** Tue, 21 Apr 2026 12:46:48 GMT
> **URL:** https://cosmos.chaos.com/
> **Paradigm:** e-commerce · **Density:** comfortable · **Motif:** dark-mode charcoal, purple brand accent, category-color-coded cards, diagonal-stripe section headers, flat tile navigation

---

## Visual Weight Verdict

**BALANCED**

This e-commerce storefront is sustained by **a balanced composition of multiple forces**.

### Evidence
- Hero section: split layout — "10400 assets"
- Card grid: 4-column, flat
- Layout: sidebar / nav top-static
- Density: comfortable (4px base grid)
- Visual hierarchy: functional

---

## Color Architecture

| Role | Value | Token |
|---|---|---|
| Brand Primary | #7c5ce4 | `#7c5ce4` |
| Brand Secondary | #e05555 | `#e05555` |
| Brand Accent | #2196f3 | `#2196f3` |
| Background Page | #1e1e1e | `#1e1e1e` |
| Background Surface | #252525 | `#252525` |
| Background Overlay | #2e3240 | #2e3240 |
| Text Primary | #ffffff | `#ffffff` |
| Text Secondary | #9a9a9a | `#9a9a9a` |
| Text Inverse | #ffffff | `#ffffff` |
| Border | #3c3c3c | `#3c3c3c` |
| Status Success | #5ab552 | `#5ab552` |
| Status Warning | #e0a030 | `#e0a030` |
| Status Error | #e05555 | `#e05555` |

---

## Typography System

**Families:** body — `Poppins, sans-serif` · heading — `Poppins, sans-serif` · mono — `ui-monospace, monospace`

| Level | Size | Line Height |
|---|---|---|
| `xs` | 13px | 1.5 |
| `sm` | 13px | 1.5 |
| `base` | 13px | 1.5 |
| `lg` | 18px | 1.1 |
| `xl` | 20px | 1 |
| `2xl` | 20px | 1 |
| `3xl` | 20px | 1 |
| `4xl` | 20px | 1 |

---

## Spacing

- **Base unit:** 4px
- **Scale:** xs=4px · sm=8px · md=16px · lg=24px · xl=32px · 2xl=48px · 3xl=64px

---

## Site Architecture

| Property | Value |
|---|---|
| Paradigm | e-commerce |
| Layout | sidebar |
| Nav position | top-static |
| Density | comfortable |
| Dominant element | typography |
| Visual hierarchy | functional |

---

## Skeleton

| Component | Details |
|---|---|
| Hero | present · split · "10400 assets" · 0 CTAs |
| Nav | brand: "chaos Cosmos" · items: Sign in, Home, Get started |
| Cards | 4-column grid · flat |
| Footer | not detected |

---

## Physical Measurements

### Spacing (computed CSS)
- **Base unit:** 4px
- **Measured steps:** 8px · 12px · 16px · 32px · 44px
- **Named scale:** xs=4px sm=8px md=16px lg=24px xl=32px 2xl=48px 3xl=64px

### Typography (computed CSS)
- **Root body size:** 13px / 0.7222rem
- **Detected families:** Poppins

| px | rem | Line Height | Weight | Letter Spacing | Role |
|---|---|---|---|---|---|
| 13px | 0.7222rem | 1.5 | 300 | 0px | body |
| 18px | 1rem | 1.1 | 300 | 0px | body-lg |
| 20px | 1.1111rem | 0 | 400 | 0px | h5 |

---

## Asset Inventory


### Inline SVGs (10 captured)
_Raw <svg> source — icons, logos, illustrations. Embed directly in generated HTML._

<details><summary>SVG #1 (7248 chars)</summary>

```html
<svg width="145" height="46" viewBox="0 0 145 46" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path d="M45 0.5H0V45.5H45V0.5Z" fill="#714AB5"></path><path d="M22.5 8C14.2125 8 7.5 14.7125 7.5 23C7.5 30.8 13.4625 37.2125 21.075 37.925C21.0375 37.6063 21.0187 37.2688 21.0187 36.95C21.0187 32.225 24.8438 28.4 29.5687 28.4C31.8187 28.4 33.8625 29.2625 35.3812 30.6875C36.7312 28.4375 37.5 25.8125 37.5 23.0188C37.5 14.7125 30.7875 8 22.5 8ZM17.2125 27.3875C14.4563 27.3875 12.2062 25.1562 12.2062 22.3813C12.2062 19.6063 14.4375 17.375 17.2125 17.375C19.9688 17.375 22.2188 19.6063 22.2188 22.3813C22.2188 25.1562 19.9688 27.3875 17.2125 27.3875ZM25.2 16.3063C23.7562 16.3063 22.5938 15.1438 22.5938 13.7C22.5938 12.2563 23.7562 11.0938 25.2 11.0938C26.6437 11.0938 27.8063 12.2563 27.8063 13.7C27.7875 15.1438 26.625 16.3063 25.2 16.3063Z" fill="white"></path><path d="M86.7368 10.7374C85.9493 10.6437 85.293 10.3437 85.293 10.0812C85.293 9.6687 85.743 9.61245 86.0055 9.61245C86.2493 9.61245 86.8493 9.6687 86.8493 10.1937C86.8493 10.2312 86.8868 10.2687 86.9243 10.2687H88.6305C88.668 10.2687 88.7055 10.2312 88.7055 10.1937C88.7055 8.89995 87.5993 7.99995 86.0055 7.99995C84.4493 7.99995 83.3055 8.89995 83.3055 10.1374C83.3055 11.2062 84.6368 11.9374 85.893 12.0874C86.4555 12.1624 86.7743 12.4249 86.7743 12.6312C86.7743 12.9687 86.3618 13.1562 85.9868 13.1562C85.8368 13.1562 85.0868 13.1187 85.0868 12.5749C85.0868 12.5374 85.0493 12.4999 85.0118 12.4999H83.2868C83.2493 12.4999 83.2117 12.5374 83.2117 12.5749C83.2117 14.0187 84.5993 14.7687 85.9868 14.7687C87.3743 14.7687 88.7618 14.0187 88.7618 12.5749C88.7618 11.4499 87.7493 10.8499 86.7368 10.7374Z" fill="currentColor"></path><path d="M64.6119 7.9999C64.1057 7.9999 63.6369 8.1499 63.2432 8.46865V5.0374C63.2432 4.9999 63.2057 4.9624 63.1682 4.9624H61.4994C61.4619 4.9624 61.4244 4.9999 61.4244 5.0374V14.4686C61.4244 14.5061 61.4619 14.5436 61.4994 14.5436H63.1682C63.2057 14.5436 63.2432 14.5061 63.2432 14.4686V11.3562C63.2432 10.5499 63.6744 9.7249 64.6119 9.7249C65.5494 9.7249 65.9807 10.5499 65.9807 11.3749V14.4874C65.9807 14.5249 66.0182 14.5624 66.0557 14.5624H67.7244C67.7619 14.5624 67.7994 14.5249 67.7994 14.4874V11.3749C67.8182 9.44365 66.4307 7.9999 64.6119 7.9999Z" fill="currentColor"></path><path d="M73.4807 11.3749C73.4807 12.2749 72.7682 13.0249 71.8869 13.0249C71.0057 13.0249 70.2932 12.2937 70.2932 11.3749C70.2932 10.4562 71.0057 9.72495 71.8869 9.72495C72.7682 9.72495 73.4807 10.4749 73.4807 11.3749ZM71.8495 7.99995C69.9745 7.99995 68.4557 9.5187 68.4557 11.3749C68.4557 13.2312 69.9745 14.7499 71.8495 14.7499C72.4682 14.7499 73.0682 14.4312 73.5182 13.8874V14.4874C73.5182 14.5249 73.5557 14.5624 73.5932 14.5624H75.1495C75.1869 14.5624 75.2245 14.5249 75.2245 14.4874V11.3749C75.2432 9.5187 73.7245 7.99995 71.8495 7.99995Z" fill="currentColor"></path><path d="M80.8677 11.3749C80.8677 12.2749 80.1552 13.0249 79.2927 13.0249C78.4302 13.0249 77.7177 12.2937 77.7177 11.3749C77.7177 10.4562 78.4302 9.72495 79.2927 9.72495C80.1552 9.72495 80.8677 10.4749 80.8677 11.3749ZM79.2927 7.99995C77.4177 7.99995 75.8802 9.5187 75.8802 11.3749C75.8802 13.2312 77.4177 14.7499 79.2927 14.7499C81.1677 14.7499 82.7052 13.2312 82.7052 11.3749C82.7052 9.5187 81.1677 7.99995 79.2927 7.99995Z" fill="currentColor"></path><path d="M58.0306 12.8937C57.1681 13.2687 56.1368 12.8374 55.8181 11.9374C55.5368 11.1499 55.9118 10.2499 56.6618 9.8937C57.2243 9.6312 57.8806 9.7062 58.3493 10.0624C58.3868 10.0999 58.4431 10.0999 58.4993 10.0812L59.9056 9.46245C59.9993 9.42495 60.0181 9.31245 59.9618 9.23745C58.9868 8.0562 57.2993 7.6437 55.8368 8.37495C54.2806 9.1437 53.5681 10.9999 54.2056 12.6124C54.8993 14.4124 56.9431 15.2374 58.7056 14.4874C60.1118 13.8687 60.8993 12.4249 60.7118 10.9624C60.6931 10.8687 60.5993 10.8124 60.5056 10.8499L59.0993 11.4687C59.0431 11.4874 59.0243 11.5437 59.0056 11.5999C58.9493 12.1249 58.5931 12.6499 58.0306 12.8937Z" fill="currentColor"></path><path d="M62.9803 38.3749C58.0116 38.3749 53.9991 34.5124 53.9991 29.7499C53.9991 24.9874 58.0116 21.125 62.9803 21.125C66.8991 21.125 70.2366 23.525 71.4553 26.9H67.4616C66.5241 25.4 64.8741 24.4249 62.9803 24.4249C60.0553 24.4249 57.6741 26.8062 57.6741 29.7499C57.6741 32.6937 60.0553 35.0749 62.9803 35.0749C64.8553 35.0749 66.4866 34.1187 67.4241 32.6374H71.4178C70.1803 35.9749 66.8803 38.3749 62.9803 38.3749Z" fill="currentColor"></path><path d="M78.9742 38.3749C75.1867 38.3749 72.1492 35.4312 72.1492 31.8124C72.1492 28.1937 75.2055 25.2499 78.9742 25.2499C82.743 25.2499 85.7993 28.1937 85.7993 31.8124C85.7993 35.4312 82.743 38.3749 78.9742 38.3749ZM78.9742 28.3624C77.0992 28.3624 75.5805 29.8999 75.5805 31.8124C75.5805 33.7249 77.0992 35.2624 78.9742 35.2624C80.8493 35.2624 82.368 33.7249 82.368 31.8124C82.3492 29.8999 80.8493 28.3624 78.9742 28.3624Z" fill="currentColor"></path><path d="M96.7116 34.1375C96.7116 36.8 94.3303 38.3563 91.6678 38.3563C89.0053 38.3563 86.6241 36.8 86.6241 34.1375H90.0553C90.0553 35.1875 90.8991 35.4688 91.6678 35.4688C92.4178 35.4688 93.2803 35.075 93.2803 34.2688C93.2803 33.6875 92.5303 33.1625 91.4991 33.0313C89.0991 32.7313 86.7741 31.2688 86.7741 29.3188C86.7741 26.7875 89.0241 25.2313 91.6866 25.2313C94.3491 25.2313 96.5803 26.7875 96.5803 29.45H93.1491C93.1491 28.4 92.4366 28.1188 91.6866 28.1188C90.9366 28.1188 90.2241 28.4 90.2241 29.225C90.2241 29.9563 91.7428 30.5375 93.0741 30.6875C94.8553 30.9125 96.7116 32.0563 96.7116 34.1375Z" fill="currentColor"></path><path d="M119.174 31.8124V37.9999H115.743V31.8124C115.743 29.8999 114.899 28.3812 112.987 28.3812C111.093 28.3812 110.23 29.9187 110.23 31.8124V37.9999H106.799V31.8124C106.799 29.8999 105.955 28.3812 104.043 28.3812C102.13 28.3812 101.287 29.9187 101.287 31.8124V37.9999H97.8741V31.8124C97.8741 28.1937 100.255 25.2499 104.062 25.2499C105.843 25.2499 107.455 26.0562 108.524 27.3312C109.593 26.0562 111.205 25.2499 112.987 25.2499C116.793 25.2499 119.174 28.1937 119.174 31.8124Z" fill="currentColor"></path><path d="M127.162 38.3749C123.374 38.3749 120.337 35.4312 120.337 31.8124C120.337 28.1937 123.393 25.2499 127.162 25.2499C130.931 25.2499 133.987 28.1937 133.987 31.8124C133.987 35.4312 130.931 38.3749 127.162 38.3749ZM127.162 28.3624C125.287 28.3624 123.768 29.8999 123.768 31.8124C123.768 33.7249 125.287 35.2624 127.162 35.2624C129.037 35.2624 130.555 33.7249 130.555 31.8124C130.555 29.8999 129.037 28.3624 127.162 28.3624Z" fill="currentColor"></path><path d="M144.749 34.1375C144.749 36.8 142.368 38.3563 139.705 38.3563C137.043 38.3563 134.661 36.8 134.661 34.1375H138.093C138.093 35.1875 138.936 35.4688 139.705 35.4688C140.455 35.4688 141.318 35.075 141.318 34.2688C141.318 33.6875 140.568 33.1625 139.536 33.0313C137.136 32.7313 134.811 31.2688 134.811 29.3188C134.811 26.7875 137.061 25.2313 139.705 25.2313C142.368 25.2313 144.618 26.7875 144.618 29.45H141.186C141.186 28.4 140.474 28.1188 139.724 28.1188C138.974 28.1188 138.261 28.4 138.261 29.225C138.261 29.9563 139.78 30.5375 141.111 30.6875C142.893 30.9125 144.749 32.0563 144.749 34.1375Z" fill="currentColor"></path></g><defs><clipPath id="clip0"><rect width="144.75" height="45" fill="white" transform="translate(0 0.5)"></rect></clipPath></defs></svg>
```

</details>
<details><summary>SVG #2 (243 chars)</summary>

```html
<svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M9 18L15 12L9 6" fill="none" stroke="currentColor" stroke-width="1.3"></path></svg>
```

</details>
<details><summary>SVG #3 (508 chars)</summary>

```html
<svg width="1em" height="1em" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" fill="none" stroke="currentColor" stroke-width="1.5"></path><path d="M17.5 17.5L13.875 13.875" fill="none" stroke="currentColor" stroke-width="1.5"></path></svg>
```

</details>
<details><summary>SVG #4 (303 chars)</summary>

```html
<svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class=""><path d="M3.33398 3.33331L12.6673 12.6666M12.6673 3.33331L3.33398 12.6666" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"></path></svg>
```

</details>
<details><summary>SVG #5 (1068 chars)</summary>

```html
<svg viewBox="0 0 1098 1024" xmlns="http://www.w3.org/2000/svg" class="cosmos-skeleton-image-svg"><title>Image placeholder</title><path d="M365.714286 329.142857q0 45.714286-32.036571 77.677714t-77.677714 32.036571-77.677714-32.036571-32.036571-77.677714 32.036571-77.677714 77.677714-32.036571 77.677714 32.036571 32.036571 77.677714zM950.857143 548.571429l0 256-804.571429 0 0-109.714286 182.857143-182.857143 91.428571 91.428571 292.571429-292.571429zM1005.714286 146.285714l-914.285714 0q-7.460571 0-12.873143 5.412571t-5.412571 12.873143l0 694.857143q0 7.460571 5.412571 12.873143t12.873143 5.412571l914.285714 0q7.460571 0 12.873143-5.412571t5.412571-12.873143l0-694.857143q0-7.460571-5.412571-12.873143t-12.873143-5.412571zM1097.142857 164.571429l0 694.857143q0 37.741714-26.843429 64.585143t-64.585143 26.843429l-914.285714 0q-37.741714 0-64.585143-26.843429t-26.843429-64.585143l0-694.857143q0-37.741714 26.843429-64.585143t64.585143-26.843429l914.285714 0q37.741714 0 64.585143 26.843429t26.843429 64.585143z" class="cosmos-skeleton-image-path"></path></svg>
```

</details>
<details><summary>SVG #6 (1068 chars)</summary>

```html
<svg viewBox="0 0 1098 1024" xmlns="http://www.w3.org/2000/svg" class="cosmos-skeleton-image-svg"><title>Image placeholder</title><path d="M365.714286 329.142857q0 45.714286-32.036571 77.677714t-77.677714 32.036571-77.677714-32.036571-32.036571-77.677714 32.036571-77.677714 77.677714-32.036571 77.677714 32.036571 32.036571 77.677714zM950.857143 548.571429l0 256-804.571429 0 0-109.714286 182.857143-182.857143 91.428571 91.428571 292.571429-292.571429zM1005.714286 146.285714l-914.285714 0q-7.460571 0-12.873143 5.412571t-5.412571 12.873143l0 694.857143q0 7.460571 5.412571 12.873143t12.873143 5.412571l914.285714 0q7.460571 0 12.873143-5.412571t5.412571-12.873143l0-694.857143q0-7.460571-5.412571-12.873143t-12.873143-5.412571zM1097.142857 164.571429l0 694.857143q0 37.741714-26.843429 64.585143t-64.585143 26.843429l-914.285714 0q-37.741714 0-64.585143-26.843429t-26.843429-64.585143l0-694.857143q0-37.741714 26.843429-64.585143t64.585143-26.843429l914.285714 0q37.741714 0 64.585143 26.843429t26.843429 64.585143z" class="cosmos-skeleton-image-path"></path></svg>
```

</details>
<details><summary>SVG #7 (1068 chars)</summary>

```html
<svg viewBox="0 0 1098 1024" xmlns="http://www.w3.org/2000/svg" class="cosmos-skeleton-image-svg"><title>Image placeholder</title><path d="M365.714286 329.142857q0 45.714286-32.036571 77.677714t-77.677714 32.036571-77.677714-32.036571-32.036571-77.677714 32.036571-77.677714 77.677714-32.036571 77.677714 32.036571 32.036571 77.677714zM950.857143 548.571429l0 256-804.571429 0 0-109.714286 182.857143-182.857143 91.428571 91.428571 292.571429-292.571429zM1005.714286 146.285714l-914.285714 0q-7.460571 0-12.873143 5.412571t-5.412571 12.873143l0 694.857143q0 7.460571 5.412571 12.873143t12.873143 5.412571l914.285714 0q7.460571 0 12.873143-5.412571t5.412571-12.873143l0-694.857143q0-7.460571-5.412571-12.873143t-12.873143-5.412571zM1097.142857 164.571429l0 694.857143q0 37.741714-26.843429 64.585143t-64.585143 26.843429l-914.285714 0q-37.741714 0-64.585143-26.843429t-26.843429-64.585143l0-694.857143q0-37.741714 26.843429-64.585143t64.585143-26.843429l914.285714 0q37.741714 0 64.585143 26.843429t26.843429 64.585143z" class="cosmos-skeleton-image-path"></path></svg>
```

</details>
<details><summary>SVG #8 (1068 chars)</summary>

```html
<svg viewBox="0 0 1098 1024" xmlns="http://www.w3.org/2000/svg" class="cosmos-skeleton-image-svg"><title>Image placeholder</title><path d="M365.714286 329.142857q0 45.714286-32.036571 77.677714t-77.677714 32.036571-77.677714-32.036571-32.036571-77.677714 32.036571-77.677714 77.677714-32.036571 77.677714 32.036571 32.036571 77.677714zM950.857143 548.571429l0 256-804.571429 0 0-109.714286 182.857143-182.857143 91.428571 91.428571 292.571429-292.571429zM1005.714286 146.285714l-914.285714 0q-7.460571 0-12.873143 5.412571t-5.412571 12.873143l0 694.857143q0 7.460571 5.412571 12.873143t12.873143 5.412571l914.285714 0q7.460571 0 12.873143-5.412571t5.412571-12.873143l0-694.857143q0-7.460571-5.412571-12.873143t-12.873143-5.412571zM1097.142857 164.571429l0 694.857143q0 37.741714-26.843429 64.585143t-64.585143 26.843429l-914.285714 0q-37.741714 0-64.585143-26.843429t-26.843429-64.585143l0-694.857143q0-37.741714 26.843429-64.585143t64.585143-26.843429l914.285714 0q37.741714 0 64.585143 26.843429t26.843429 64.585143z" class="cosmos-skeleton-image-path"></path></svg>
```

</details>
<details><summary>SVG #9 (1068 chars)</summary>

```html
<svg viewBox="0 0 1098 1024" xmlns="http://www.w3.org/2000/svg" class="cosmos-skeleton-image-svg"><title>Image placeholder</title><path d="M365.714286 329.142857q0 45.714286-32.036571 77.677714t-77.677714 32.036571-77.677714-32.036571-32.036571-77.677714 32.036571-77.677714 77.677714-32.036571 77.677714 32.036571 32.036571 77.677714zM950.857143 548.571429l0 256-804.571429 0 0-109.714286 182.857143-182.857143 91.428571 91.428571 292.571429-292.571429zM1005.714286 146.285714l-914.285714 0q-7.460571 0-12.873143 5.412571t-5.412571 12.873143l0 694.857143q0 7.460571 5.412571 12.873143t12.873143 5.412571l914.285714 0q7.460571 0 12.873143-5.412571t5.412571-12.873143l0-694.857143q0-7.460571-5.412571-12.873143t-12.873143-5.412571zM1097.142857 164.571429l0 694.857143q0 37.741714-26.843429 64.585143t-64.585143 26.843429l-914.285714 0q-37.741714 0-64.585143-26.843429t-26.843429-64.585143l0-694.857143q0-37.741714 26.843429-64.585143t64.585143-26.843429l914.285714 0q37.741714 0 64.585143 26.843429t26.843429 64.585143z" class="cosmos-skeleton-image-path"></path></svg>
```

</details>
<details><summary>SVG #10 (1068 chars)</summary>

```html
<svg viewBox="0 0 1098 1024" xmlns="http://www.w3.org/2000/svg" class="cosmos-skeleton-image-svg"><title>Image placeholder</title><path d="M365.714286 329.142857q0 45.714286-32.036571 77.677714t-77.677714 32.036571-77.677714-32.036571-32.036571-77.677714 32.036571-77.677714 77.677714-32.036571 77.677714 32.036571 32.036571 77.677714zM950.857143 548.571429l0 256-804.571429 0 0-109.714286 182.857143-182.857143 91.428571 91.428571 292.571429-292.571429zM1005.714286 146.285714l-914.285714 0q-7.460571 0-12.873143 5.412571t-5.412571 12.873143l0 694.857143q0 7.460571 5.412571 12.873143t12.873143 5.412571l914.285714 0q7.460571 0 12.873143-5.412571t5.412571-12.873143l0-694.857143q0-7.460571-5.412571-12.873143t-12.873143-5.412571zM1097.142857 164.571429l0 694.857143q0 37.741714-26.843429 64.585143t-64.585143 26.843429l-914.285714 0q-37.741714 0-64.585143-26.843429t-26.843429-64.585143l0-694.857143q0-37.741714 26.843429-64.585143t64.585143-26.843429l914.285714 0q37.741714 0 64.585143 26.843429t26.843429 64.585143z" class="cosmos-skeleton-image-path"></path></svg>
```

</details>

---

## Design Critique (AI Phase 1)

<details>
<summary>Expand raw critique</summary>

# Layout Analysis: Chaos Cosmos Web Page

---

## SECTION INVENTORY

| # | Name | Vertical Span | Z-Layer | Background | Dominant Visual |
|---|------|--------------|---------|------------|-----------------|
| 1 | **nav** | 0–8% | floating (fixed/sticky) | solid-color `#1e1e1e` / very dark charcoal | typography + interactive-controls |
| 2 | **sidebar** | 8–100% (left column, ~370px wide) | base | solid-color `#252525` dark gray | interactive-controls (search + accordion nav) |
| 3 | **hero/info-banner** | 8–30% (main column, right) | base | solid-color `#2a2d35` dark slate card | typography (asset count stats) |
| 4 | **plan-checker** | 28–46% (main column) | base | gradient dark (dark blue-tinted card, approx `#1e2130` → `#252830`) | interactive-controls (dropdowns) + typography |
| 5 | **categories** | 46–68% (main column) | base | solid-color `#2c2c2c` section header with diagonal stripe texture + card grid | imagery + typography |
| 6 | **most-popular** | 68–100%+ (main column, below fold) | base | solid-color `#2c2c2c` section header with diagonal stripe texture + card grid | typography (label tiles) |

---

## SPATIAL GRID ANALYSIS

### Nav Bar (floating)
- **Layout engine:** Flexbox (horizontal, space-between)
- **Column count:** 3 logical zones — logo-left | nav-center | cta-right
- **Gap size:** ~16px (spacing.md) between nav items
- **Item pattern:** fixed-width logo, fluid center, fixed-width CTA button
- **Z-index tier:** floating/sticky — visually sits above all scroll content; position = fixed or sticky, z ≈ top tier (100+)

### Sidebar Navigation
- **Layout engine:** Flexbox column
- **Column count:** 1
- **Gap size:** ~8px (spacing.sm) between list items; each item ~44px tall (matches scale value `44px`)
- **Item pattern:** full-width fluid rows with chevron icon + label
- **Note:** Search bar at top (~44px height), followed by 5 accordion nav rows (3D Models, Materials, HDRIs, Collections, Creators)

### Info Banner (hero card)
- **Layout engine:** Flexbox (horizontal)
- **Column count:** 2 stat columns side-by-side
- **Gap size:** ~32px (spacing.xl) between stat columns
- **Item pattern:** fluid text blocks
- **Typography observed:** large bold numbers (~20px weight 400 per Physical Data h5 step), supporting body text 13px weight 300

### Plan Checker Card
- **Layout engine:** Flexbox (horizontal, space-between)
- **Column count:** 2 zones — text-left | dropdowns-right
- **Gap size:** ~16px (spacing.md) between dropdowns
- **Item pattern:** fixed-width dropdowns (~160px each), fluid text block

### Categories Grid
- **Layout engine:** CSS Grid (inferred) or Flexbox row
- **Column count:** 4 equal columns
- **Gap size:** ~8–12px between cards (spacing.sm–xs range)
- **Item pattern:** fixed aspect ratio cards, approximately equal height (~110px)
- **Card anatomy:** colored top-accent bar (category-color) + icon (svg) + label text below
- **Accent colors per card:**
  - 3D Models → red/coral `#e05555`
  - Materials → orange/yellow `#e0a030`
  - HDRIs → green `#5ab552`
  - Collections → cyan/blue `#4ab0d5`

### Most Popular Grid
- **Layout engine:** CSS Grid or Flexbox row-wrap
- **Column count:** 4 columns per row
- **Gap size:** ~8px (spacing.sm)
- **Item pattern:** fluid label-only tiles (no images visible in viewport), uniform height ~60px
- **Rows visible:** 3 rows (Furniture/Accessories/Vegetation/Potted plants | Vehicles/People/Lighting/Architecture | Presets/Enmesh-Pattern/…)
- **Masonry note:** No masonry — uniform grid rows

---

## ASSET AUDIT

| Asset Role | Source / URL | Notes |
|------------|-------------|-------|
| **Hero bg** | No image background — solid dark card color `#2a2d35` | No image asset detected |
| **Logo/brand** | Inline SVG or img — "chaos cosmos" wordmark with purple/white ghost-icon left of text | Composite: icon mark (purple ghost shape `~40×40px`) + "chaos" text + "Cosmos" bold text |
| **Plan checker bg** | Gradient card — dark blue-tinted, possible diagonal texture overlay | No discrete image URL confirmed in Physical Data |
| **Categories header** | Diagonal stripe/hatching texture (CSS or image) over dark green-ish tint | Pattern repeats for "Most popular" header too — same asset/CSS |
| **Category card icons** | Inline SVGs × 4 (box/cube for 3D Models, circle-wedge for Materials, image-frame for HDRIs, phone/rectangle for Collections) | 4 inline SVG icons confirmed visually |
| **Card images (Most Popular)** | **No asset found** — tiles are text-only, no imagery in these tiles | Physical Data provides no image URLs for these |
| **Icon set** | Inline SVGs — chevron right (×5 sidebar), category icons (×4), search icon (×1), dropdown chevrons (×2) | All inline SVG, no external SVG file pattern detected |
| **Get Started button** | No image — styled `<button>` with gradient background (blue `#2196F3` → cyan `#00BCD4` or similar) | Text-only button |

---

## COLOR SEMANTICS

| Observed Hex | Semantic Role | Evidence / Components |
|-------------|--------------|----------------------|
| `#1c1c1c` / `#1e1e1e` | **Neutral-Base** | Page background, nav bar background |
| `#252525` / `#2a2a2a` | **Neutral-Surface** | Sidebar background, card backgrounds (categories grid) |
| `#2e3240` / `#2a2d3a` | **Neutral-Overlay** | Plan checker card background (slightly blue-tinted dark) |
| `#ffffff` | **Text-Main** | All primary labels — nav "Home", category names, stat numbers |
| `#9a9a9a` / `#8c8c8c` | **Text-Muted** | Body copy below stats ("for Enscape", "Asset count is based on…"), sidebar nav labels (lighter gray) |
| `#3c3c3c` / `#404040` | **Border-Default** | Sidebar item separators, card borders/dividers |
| `#6c47d4` / `#7c5ce4` | **Brand-Primary** | Cosmos logo icon (purple ghost mark), "UP TO" badge background |
| `#2196f3` → `#00bcd4` | **Brand-Accent** | "Get started" CTA button gradient (blue→cyan) |
| `#e05555` | **Brand-Secondary / Category** | 3D Models card top accent bar + icon color |
| `#e0a030` | **Status-Warning / Category** | Materials card top accent bar + icon color |
| `#5ab552` | **Status-Success / Category** | HDRIs card top accent bar + icon color |
| `#4ab0d5` | **Brand-Accent-2 / Category** | Collections card top accent bar + icon color |
| `#444952` | **Neutral-Surface-2** | Most Popular tile backgrounds (slightly lighter than main bg) |
| `#c0c0c0` | **Text-Muted-Light** | Sidebar nav item text (3D Models, Materials, etc.) |

---

### Key Discrepancy Notes
- **Typography Physical Data** reports only 3 type steps (13px/18px/20px, all Poppins). The large asset count numbers ("10400", "21000") visually appear

</details>
