# Style E: Organic Abstract and Handcraft

## Overview

Generate infographic slides with hand-painted character. The core signals are organic rather than geometric forms, visible brush texture, mixed-media layering, and warm low-saturation natural color.

## Design Philosophy

- Favor irregular blobs, arcs, and gestures over clean geometry.
- Make the brush visible.
- Keep color earthy and muted.
- Combine watercolor blocks, charcoal lines, and printed typography.
- Maintain warmth and approachability.

## Visual Reference

Think of ceramic studio identity work, boutique tea packaging, or independent bookstore posters with tactile warmth and material presence.

## Canvas

```text
Width: 1600px
Height: 900px
Padding: 72-96px
```

## Color System

Choose one palette set.

### Forest

```css
--bg: #f4f0e8;
--primary: #7a8a6a;
--secondary: #c4a060;
--ink: #3a3a38;
--text-light: #9a9590;
```

### Earth

```css
--bg: #f2ece2;
--primary: #a07850;
--secondary: #6a8a7a;
--ink: #3a3530;
--text-light: #a0988e;
```

### Coast

```css
--bg: #f0ece6;
--primary: #5a7a8a;
--secondary: #c4a070;
--ink: #2a3a3a;
--text-light: #8a9090;
```

Keep saturation between `30-50%`.

Forbidden:

- pure black `#000`
- saturation above `60%`
- neon
- gradient fills

Pure white `#fff` is allowed only when `background_mode=white`.

## Typography

```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&family=Noto+Sans+SC:wght@300;400;500&family=DM+Mono:wght@300;400&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
```

| Role | Font | Weight |
|---|---|---|
| English brand name | Playfair Display | 400 / italic |
| English body | Inter | 300 / 400 |
| Labels | DM Mono | 300 |
| Chinese title | Noto Serif SC | 700 |
| Chinese body | Noto Sans SC | 300 / 400 |

Suggested sizes:

```text
Brand or main title: 48-72px
Subtitle: 24-32px
Body: 18-22px
Label: 12-14px
```

Keep type visually light. The handmade visuals should dominate, not heavy typography.

### Chinese And English Pairing

- Use `Noto Serif SC` for Chinese titles and `Noto Sans SC` for Chinese body copy. Chinese should feel warm and literary, not rigid.
- Let `Playfair Display` act as an English brand cue or accent phrase, not as the main carrier of Chinese meaning.
- In bilingual slides, English can name the brand while Chinese tells the story.
- Increase spacing around Chinese text blocks, because this style depends on breathing room around the organic forms.

## Background Treatment

### Background Mode

- Default `background_mode=paper`: keep unbleached stock and strong paper texture.
- `background_mode=white`: use `#ffffff`, remove the paper grain, and keep the brush, blob, and handmade behavior.

### Layer 1: Base

```css
.card { background: var(--bg); }
```

### Layer 2: Handmade Paper Texture

```css
.card::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 50;
  pointer-events: none;
  opacity: 0.38;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 180px;
  animation: grain 0.5s steps(3) infinite;
}
```

## Organic Shape Construction

### Method 1: SVG Blob

```html
<svg viewBox="0 0 200 200" class="blob">
  <path d="M 100,20 C 140,20 180,60 180,100 C 180,140 140,180 100,180 C 60,180 20,140 20,100 C 20,60 60,20 100,20 Z" fill="var(--primary)" />
</svg>
```

Change the path for every slide. Do not repeat the same blob silhouette.

### Method 2: Irregular Border Radius

```css
.organic-shape {
  border-radius: 60% 40% 50% 70% / 50% 60% 40% 55%;
  background: var(--primary);
}
```

### Brush Texture

```css
.brushstroke {
  filter: url(#brush);
  opacity: 0.85;
}
```

### SVG Brush Filter

```html
<svg width="0" height="0" style="position:absolute"><defs>
  <filter id="brush">
    <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="5" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="3" xChannelSelector="R" yChannelSelector="G"/>
    <feGaussianBlur stdDeviation="0.5"/>
  </filter>
</defs></svg>
```

### Charcoal Line

```css
.charcoal-line {
  height: 2px;
  background: var(--ink);
  opacity: 0.3;
  filter: url(#brush);
  transform: rotate(-2deg);
}
```

## Layout Rules

- Let the main blob occupy `40-50%` of the slide.
- A second smaller form may overlap using `mix-blend-mode: multiply`.
- Keep text around the form instead of stacking it directly on top.
- Add `1-2` charcoal arcs through the composition.
- Place the title or brand name in the lower third.
- Keep negative space around `40-50%`.

## Component Patterns

- Brand title: Playfair italic or Noto Serif SC with light Inter support text.
- List bullet: small primary-colored dot with intentionally irregular spacing.
- Quote block: hand-drawn vertical line plus generous padding.
- Label: very small, faint DM Mono at the bottom edge.

## Prohibited Elements

- perfect circles or sharp triangles as the main motif
- heavy sans-serif bold display type
- all-caps headlines
- crop marks
- rigid grids
- high-saturation color
- gradient
- polished uniform spacing

## Checklist

- [ ] Is the main form organic rather than geometric?
- [ ] Do edges feel brushed, watery, or softened?
- [ ] Is saturation below `50%`?
- [ ] Does typography stay light in weight?
- [ ] Is there at least one hand-drawn line?
- [ ] Is paper texture strong in `paper` mode?
- [ ] If `background_mode=white`, is the canvas white with paper texture removed?
- [ ] Does the slide feel warm, tactile, and handmade?
- [ ] Are sharp geometric motifs avoided?
- [ ] Are heavy all-caps headlines avoided?
