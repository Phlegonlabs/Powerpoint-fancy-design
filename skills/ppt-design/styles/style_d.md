# Style D: Bauhaus Geometric

## Overview

Generate infographic slides inspired by 1920s Bauhaus posters. The signature traits are basic geometric forms, diagonal composition, flat color collisions, and a printed architectural feel.

## Design Philosophy

- Build energy through a lower-left to upper-right diagonal axis.
- Use only circles, triangles, and rectangles.
- Create depth through overlapping flat blocks, not through shadow or 3D.
- Let at least one shape bleed off the canvas.
- Keep everything perfectly flat.

## Visual Reference

Think of Bauhaus school posters, architecture exhibition invites, or design biennale identities with hard geometry and structural confidence.

## Canvas

```text
Width: 1600px
Height: 900px
Padding: 56-72px
```

## Color System

```css
--bg: #f2ede4;
--black: #1a1a1a;
--rust: #8a3a2a;
--sand: #d4c8a8;
```

Use only these four colors.

Forbidden:

- gradients
- opacity gradients
- shadow
- glow
- pure black `#000`

Pure white `#fff` is allowed only when `background_mode=white`.

## Typography

```html
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;700;900&family=Space+Mono:wght@400;700&family=Noto+Sans+SC:wght@400;700;900&display=swap" rel="stylesheet">
```

| Role | Font | Weight |
|---|---|---|
| Display title | Bebas Neue | 400 |
| Subtitle and body | Inter | 300 / 700 |
| Data and labels | Space Mono | 400 / 700 |
| Chinese title | Noto Sans SC | 900 |
| Chinese body | Noto Sans SC | 400 / 700 |

Suggested sizes:

```text
Display Title (EN):   96-140px
Display Title (CN):   48-64px
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

The title should be extremely large and function as part of the visual architecture, not as ordinary text.

### Chinese And English Pairing

- Use `Noto Sans SC` for both Chinese titles and Chinese body copy. Do not fake `Bebas Neue` with Chinese characters.
- Let English stay in `Bebas Neue` for large architectural words and `Space Mono` for directional labels or module tags.
- If the main headline is bilingual, place Chinese and English in separate directional blocks rather than forcing them into one line.
- Chinese body copy should stay compact and structural, with `1.4-1.5` line-height and short line lengths.

## Background Treatment

### Background Mode

- Default `background_mode=paper`: keep the cream stock and matte paper texture.
- `background_mode=white`: switch to `#ffffff`, remove paper texture, and keep the same geometric tension and poster-like energy.

### Layer 1: Base

```css
.card { background: #f2ede4; }
```

### Layer 2: Matte Paper Texture

```css
.card::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 50;
  pointer-events: none;
  opacity: 0.20;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 200px;
  animation: grain 0.4s steps(4) infinite;
}
```

## Geometric Composition Rules

### Diagonal Arrangement

```css
.main-shape { transform: rotate(-15deg); }
```

Keep primary elements aligned to the diagonal flow.

### Basic Shapes

```css
.geo-circle { border-radius: 50%; }
.geo-triangle { clip-path: polygon(50% 0%, 0% 100%, 100% 100%); }
.geo-rect { border-radius: 0; }
```

### Bleed Crop

```css
.bleed-element {
  position: absolute;
  right: -60px;
}
```

### Overlap

Use solid overlap and `z-index` only. Do not use blend modes.

## Print Texture Devices

### Rust Halftone

```css
.halftone-rust {
  background: #8a3a2a;
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1.2' fill='white'/%3E%3C/svg%3E");
  -webkit-mask-size: 4px 4px;
  mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1.2' fill='white'/%3E%3C/svg%3E");
  mask-size: 4px 4px;
}
```

### Ink Trapping Line

```css
.shape-with-trapping {
  outline: 0.5px solid rgba(26,26,26,0.15);
  outline-offset: -0.5px;
}
```

## Layout Rules

- Build the slide from large blocks that occupy `40-60%` of the canvas.
- Let titles sit across block boundaries.
- Place small labels along the bottom or side edges in Space Mono.
- Vertical text or diagonal text is allowed when it supports the composition.

## Component Patterns

- Display title: Bebas Neue all-caps in near-black.
- Data label: Space Mono inside a sharp-corner block with inverted colors.
- Divider: `2px` black rule, horizontal or diagonal.
- Page number: Space Mono `14px` at the bottom-right or running vertically on the right edge.

## Prohibited Elements

- rounded corners on non-circular shapes
- organic curves
- gradients
- shadow
- glow
- emoji
- icons
- centered symmetry
- thin weak display typography
- more than four colors

## Checklist

- [ ] Are only the four approved colors used?
- [ ] If `background_mode=white`, is the canvas white with texture removed?
- [ ] Is the composition driven by diagonal energy?
- [ ] Does at least one element bleed off the edge?
- [ ] Is the title a large geometric sans-serif all-caps form?
- [ ] Do major shapes overlap?
- [ ] Does rust use halftone texture?
- [ ] Are gradients, shadow, and glow absent?
- [ ] Is paper texture present in `paper` mode?
- [ ] Does the title occupy at least `20%` of the visual field?
- [ ] Does the slide feel structural and architectural?
