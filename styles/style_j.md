# Style J: Memphis Pop and Joyful Collision

## Overview

Generate infographic slides with Memphis Group energy: scattered geometry, bold collision color, playful irregular arrangement, and decorative shapes that act like co-stars rather than accessories.

## Design Philosophy

- Treat decoration as content.
- Let high-saturation color collide freely.
- Reject strict order and perfect alignment.
- Use zigzags, squiggles, dots, triangles, and stripes as core vocabulary.
- Keep the overall mood cheerful, loud, and intentionally unserious.

## Visual Reference

Think of Ettore Sottsass furniture, 1990s kids-channel graphics, or Harajuku-adjacent poster culture. The slide should feel rebellious, naive on purpose, and full of motion.

## Canvas

```text
Width: 1600px
Height: 900px
Padding: 40-56px
```

## Color System

```css
--bg: #faf5e8;
--black: #2a2a2a;
--pink: #ff6b9d;
--yellow: #ffd23f;
--blue: #4a90d9;
--green: #2ec4b6;
--coral: #ff8a5c;
--lavender: #b8a9c9;
```

Rules:

- Use at least four bright colors per slide, excluding black and background.
- Keep saturation high.
- Give every colored block a `2px` black outline.

Forbidden:

- gradients
- low-saturation color
- dark palette
- monochrome layout

## Typography

```html
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Space+Mono:wght@400;700&family=Inter:wght@400;600;700;900&family=Noto+Sans+SC:wght@400;700;900&display=swap" rel="stylesheet">
```

| Role | Font | Weight |
|---|---|---|
| Display title | Fredoka | 700 |
| Subtitle | Inter | 900 |
| Body | Inter | 400 / 600 |
| Label | Space Mono | 400 |
| Chinese title | Noto Sans SC | 900 |
| Chinese body | Noto Sans SC | 400 |

Suggested sizes:

```text
Display Title (EN):   72-110px
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

Display type should stay rounded and friendly. Titles may tilt, vary in size, or change color across words.

### Chinese And English Pairing

- Keep `Fredoka` for English-only display words and use `Noto Sans SC` for Chinese titles and body copy.
- Do not try to make Chinese imitate rounded Latin whimsy through fake tracking or forced curvature. Let the playfulness come from layout and color instead.
- In bilingual slides, keep Chinese headlines short and bold, and let playful English words live as separate accents, stickers, or secondary punchlines.
- Increase spacing between Chinese text and decorative shapes, because Chinese text blocks read denser than the English accents in this style.

## Background Treatment

### Background Mode

- Default `background_mode=paper`: keep the warm milk-white base and extremely light grain.
- `background_mode=white`: switch to `#ffffff`, remove the grain, and keep the color collision, black outlines, and scattered playfulness.

### Layer 1: Base

```css
.card { background: #faf5e8; }
```

### Layer 2: Light Texture

```css
.card::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 50;
  pointer-events: none;
  opacity: 0.05;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 200px;
}
```

## Core Decorative Shapes

### Zigzag

```html
<svg viewBox="0 0 120 20" class="zigzag" style="position:absolute;">
  <polyline points="0,10 15,0 30,10 45,0 60,10 75,0 90,10 105,0 120,10" fill="none" stroke="var(--pink)" stroke-width="3" />
</svg>
```

### Squiggle

```html
<svg viewBox="0 0 120 20" class="squiggle" style="position:absolute;">
  <path d="M 0,10 Q 15,0 30,10 Q 45,20 60,10 Q 75,0 90,10 Q 105,20 120,10" fill="none" stroke="var(--coral)" stroke-width="3" />
</svg>
```

### Dot Grid

```css
.dot-grid {
  background: radial-gradient(circle, var(--blue) 3px, transparent 3px);
  background-size: 18px 18px;
  opacity: 0.6;
}
```

### Triangle Scatter

```html
<svg viewBox="0 0 30 30" class="triangle-scatter" style="position:absolute;">
  <polygon points="15,2 28,28 2,28" fill="var(--yellow)" stroke="#2a2a2a" stroke-width="2" />
</svg>
```

Scatter multiple triangles sized around `20-50px` with rotations from `-30deg` to `30deg`.

### Circle and Semicircle

```css
.memphis-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--green);
  border: 2px solid #2a2a2a;
}
.memphis-semicircle {
  width: 60px;
  height: 30px;
  background: var(--pink);
  border: 2px solid #2a2a2a;
  border-radius: 60px 60px 0 0;
}
```

### Striped Block

```css
.striped-block {
  background: repeating-linear-gradient(
    0deg,
    var(--yellow) 0px, var(--yellow) 4px,
    var(--bg) 4px, var(--bg) 8px
  );
  border: 2px solid #2a2a2a;
}
```

### Cross

```html
<svg viewBox="0 0 24 24" class="cross" style="position:absolute;">
  <line x1="12" y1="2" x2="12" y2="22" stroke="var(--blue)" stroke-width="3" />
  <line x1="2" y1="12" x2="22" y2="12" stroke="var(--blue)" stroke-width="3" />
</svg>
```

## Scatter Rules

- Use `8-15` decorative elements per slide.
- Let sizes range from `16px` to `80px`.
- Rotate elements between `-45deg` and `45deg`.
- Let elements bleed over the edges.
- Keep corners and edges dense while preserving central space for content.
- Repeat each shape category at least twice.

## Layout Rules

- Strict grids are not required.
- Put the main title near the upper center and allow a slight tilt.
- Use bold content cards with `2px` black outlines.
- Let cards overlap and tilt.
- Keep negative space around `15-25%`.

## Component Patterns

- Display title: Fredoka Bold, optionally multi-colored by word or letter.
- Content card: large color block, black outline, hard shadow.
- List bullet: use different colored shapes instead of identical dots.
- Data display: giant colored number in Fredoka.
- Divider: zigzag or squiggle instead of a normal line.
- Label: Space Mono on a tilted block tag.

## Prohibited Elements

- gradients
- blur shadow
- low-saturation color
- dark palette
- serif typography
- ultra-thin type
- strict grid
- symmetry
- negative space above `30%`
- solemn mood

## Checklist

- [ ] Are at least four bright colors used?
- [ ] If `background_mode=white`, is the canvas white with background grain removed?
- [ ] Are there at least eight decorative geometric elements?
- [ ] Is there a zigzag or squiggle?
- [ ] Do all color blocks have `2px` black outlines?
- [ ] Is the title set in Fredoka?
- [ ] Do elements rotate with variety?
- [ ] Are stripes or dot patterns present?
- [ ] Is negative space below `25%`?
- [ ] Are gradients and dark palettes absent?
- [ ] Does the slide feel cheerful, noisy, and full of energy?
