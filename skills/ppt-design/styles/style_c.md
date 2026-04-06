# Style C: Risograph Print Aesthetic

## Overview

Generate infographic slides that feel like two-color Risograph prints. The core signals are strict two-ink logic, imperfect registration, overprint mixing, uneven ink density, and rough recycled paper character.

## Design Philosophy

- Use exactly two ink colors plus the paper color.
- Treat physical imperfections as part of the design, not as bugs.
- Favor hand-made energy over digital precision.
- Allow bolder composition and denser forms than the minimalist styles.

## Visual Reference

Think of indie magazines, art book fair posters, or limited-run studio prints. The mood should feel workshop-made, tactile, and energetic.

## Canvas

```text
Width: 1600px
Height: 900px
Padding: 56-72px
```

## Color System

Choose one ink pair and never mix sets on the same slide.

### Pair 1: Fluorescent Pink x Deep Teal

```css
--ink-a: #e8456b;
--ink-b: #1a5c5a;
--paper: #f2ede0;
--overprint: #3a2828;
```

### Pair 2: Orange Red x Navy

```css
--ink-a: #e06030;
--ink-b: #1a2a4a;
--paper: #f0ebe2;
--overprint: #4a2a28;
```

### Pair 3: Yellow Green x Plum

```css
--ink-a: #8aaa30;
--ink-b: #8a2a5a;
--paper: #f2ede0;
--overprint: #5a3a30;
```

Forbidden:

- more than two ink colors
- gradients
- pure black `#000`
- decorative soft shadow
- serif display type

Pure white `#fff` is allowed only when `background_mode=white`.

## Typography

```html
<link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Inter:wght@400;600;700;900&family=Noto+Sans+SC:wght@400;700;900&display=swap" rel="stylesheet">
```

| Role | Font | Weight |
|---|---|---|
| Display title | Inter | 900 |
| Body | Inter | 400 / 600 |
| Labels and data | DM Mono | 400 |
| Chinese title | Noto Sans SC | 900 |
| Chinese body | Noto Sans SC | 400 |

Suggested sizes:

```text
Display Title (EN):   64-96px
Display Title (CN):   42-56px
Section Heading:      28-36px
Body (EN):            22-24px
Body (CN):            24-26px
Table Header (EN):    22-24px
Table Header (CN):    24-26px
Table Cell (EN):      20-22px
Table Cell (CN):      22-24px
Support Copy:         18-20px
Label / Caption (EN): 16-18px
Label / Caption (CN): 18-20px
Page Number:          14-16px
```

Use bold sans-serif all-caps for major titles with slightly compressed letter spacing.

### Chinese And English Pairing

- Use `Noto Sans SC` for Chinese headlines and keep them short, bold, and block-like.
- Use `Inter Black` for English poster words, but do not try to force English all-caps rhythm onto Chinese lines.
- Keep Chinese body copy in `Noto Sans SC` with `1.45-1.55` line-height and let English labels sit in their own sticker, tag, or ink block.
- In bilingual slides, separate the two scripts by layer or shape instead of mixing them inside one sentence.

## Background Treatment

### Background Mode

- Default `background_mode=paper`: keep the recycled paper stock and rough visible texture.
- `background_mode=white`: use `#ffffff`, remove the paper texture, but keep two-ink logic, registration shift, and overprint energy.

### Layer 1: Paper Base

```css
.card { background: #f2ede0; }
```

### Layer 2: Recycled Paper Texture

```css
.card::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 50;
  pointer-events: none;
  opacity: 0.40;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 220px;
  animation: grain 0.3s steps(3) infinite;
}
```

## Core CSS Techniques

### Halftone Fill

```css
.halftone {
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1.1' fill='white'/%3E%3C/svg%3E");
  -webkit-mask-size: 3.5px 3.5px;
  mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1.1' fill='white'/%3E%3C/svg%3E");
  mask-size: 3.5px 3.5px;
}
```

### Registration Shift

This is required. Push all `ink-a` elements `2-3px` toward the lower right.

```css
.ink-a-element {
  box-shadow: 3px 2px 0 var(--ink-a);
  text-shadow: 2.5px 1.5px 0 rgba(232,69,107,0.3);
}
```

### Overprint

```css
.ink-a-shape { background: var(--ink-a); mix-blend-mode: multiply; }
.ink-b-shape { background: var(--ink-b); mix-blend-mode: multiply; }
```

### Uneven Ink Density

```css
.density-variation {
  background: linear-gradient(
    135deg,
    rgba(255,255,255,0) 0%,
    rgba(255,255,255,0.08) 40%,
    rgba(255,255,255,0) 60%,
    rgba(255,255,255,0.05) 100%
  );
}
```

## Layout Rules

- Allow bold shapes such as large triangles, stripes, and heavy blocks.
- Let elements bleed past the edge.
- Allow text to sit on top of shapes when contrast stays strong.
- Keep negative space around `30-40%`.
- Let titles land on the edges of shapes rather than perfectly inside them.

## Component Patterns

- Display title: Inter Black, all-caps, `ink-b`, with offset `ink-a` text-shadow.
- Data label: DM Mono inside a small ink block with paper-colored text.
- List bullets: `4x4px` square bullets in `ink-a`.
- Divider: `2px` `ink-b` rule with halftone masking.

## Prohibited Elements

- gradients
- blur or glow
- decorative box-shadow except for registration offset
- border radius above `2px`
- more than two ink colors
- serif display typography
- very thin lines under `1.5px`

## Checklist

- [ ] Are there only two ink colors plus paper?
- [ ] If `background_mode=white`, is the canvas white with paper texture removed?
- [ ] Is halftone texture present?
- [ ] Is registration shift visible at `2-3px`?
- [ ] Do overlaps use `mix-blend-mode: multiply`?
- [ ] Is paper grain strong enough in `paper` mode?
- [ ] Do large fills show uneven density?
- [ ] Is the title heavy sans-serif all-caps?
- [ ] Are gradients, glow, and decorative blur absent?
- [ ] Does the slide feel workshop-made rather than digitally precise?
