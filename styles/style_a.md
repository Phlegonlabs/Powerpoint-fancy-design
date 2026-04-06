# Style A: Swiss International Typographic Style

## Overview

Generate disciplined, restrained infographic slides with a printed editorial feel. The visual language comes from 1950s-1970s Swiss typography: strict grid systems, limited color, large negative space, and one deliberate break from the grid. The finished slide should feel like a scanned print poster rather than a generic digital dashboard.

## Design Philosophy

- Grid first, one controlled disruption.
- Keep negative space at `50%` or more.
- Limit the palette to `3` main colors plus neutral grays.
- Make the print surface visible through paper grain, crop marks, slight registration shift, and ink bleed.

## Visual Reference

Think of a special issue cover from *The Economist* or *Bloomberg Businessweek*, not a crypto dashboard and not a Canva template.

## Canvas

```text
Width: 1600px
Height: 900px
Padding: 68-88px
```

## Color System

```css
--bg: #f0ebe2;            /* warm paper stock */
--ink: #2a2a30;           /* near-black, not pure black */
--accent: #b85038;        /* terracotta red */
--text-secondary: #8a8580; /* warm gray */
--text-muted: #b0aaa0;    /* pale gray */
--text-mid: #6a6560;      /* middle gray */
```

Semantic contrast colors for charts or change indicators:

```css
--red: #c44040;
--red-bg: rgba(196,64,64,0.03);
--green: #5a8a6a;
--green-bg: rgba(90,138,90,0.03);
```

Forbidden:

- pure black `#000`
- fluorescent orange
- purple
- gradient fills
- glow or soft shadows

Pure white `#fff` is allowed only when `background_mode=white`.

## Typography

```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700;900&family=Noto+Sans+SC:wght@300;400;700;900&family=DM+Mono:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Inter:wght@300;400;500;600;700;900&display=swap" rel="stylesheet">
```

| Role | Font | Weight |
|---|---|---|
| English display title or giant number | Playfair Display | 900 / italic 400 |
| English body | Inter | 300 / 500 / 900 |
| Monospaced label | DM Mono | 400 / 500 |
| Chinese title | Noto Serif SC | 700 / 900 |
| Chinese body | Noto Sans SC | 300 / 400 |

Suggested sizes:

```text
Display Title (EN):   88-110px
Display Title (CN):   42-48px
Giant Number:         140-180px
Section Heading:      30-36px
Body (EN):            22-24px
Body (CN):            24-26px
Table Header (EN):    22-24px
Table Header (CN):    24-26px
Table Cell (EN):      20-22px
Table Cell (CN):      22-24px
Support Copy:         18-20px
Label / Caption (EN): 16-18px
Label / Caption (CN): 18-20px
Page Number:          16-18px
```

Use serif and sans-serif contrast inside the same headline when possible. Inter Black plus Playfair italic is the preferred signature move.

### Chinese And English Pairing

- Let `Noto Serif SC` carry the main Chinese headline. Use `Playfair Display` only for short English contrast words, giant numbers, or italic subheads.
- Keep Chinese body copy in `Noto Sans SC` with `1.45-1.6` line-height. Do not use `DM Mono` for Chinese sentences.
- In bilingual slides, let Chinese carry the thesis and let English stay in labels, numbers, chart tags, or one short editorial phrase.
- If one headline needs both languages, split them into separate lines or separate blocks instead of alternating scripts word by word.

## Background Treatment

### Background Mode

- Default `background_mode=paper`: keep the warm paper base, visible grain, and optional fold line.
- `background_mode=white`: switch to `#ffffff`, disable grain and fold line, but keep the Swiss grid, crop marks, and print-editorial rhythm.

### Layer 1: Base

```css
.card { background: #f0ebe2; }
```

### Layer 2: Paper Grain

```css
.card::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 50;
  pointer-events: none;
  opacity: 0.25;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 200px;
  animation: grain 0.4s steps(4) infinite;
}
@keyframes grain {
  0%,100%{transform:translate(0,0)}
  25%{transform:translate(-2px,1px)}
  50%{transform:translate(1px,-1px)}
  75%{transform:translate(-1px,2px)}
}
```

### Layer 3: Center Fold (Optional)

```css
.card::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 1px;
  background: rgba(0,0,0,0.02);
  z-index: 40;
}
```

## Crop Marks

Crop marks are required.

```css
.crop { position: absolute; z-index: 60; pointer-events: none; }
.crop.tl { top: 16px; left: 16px; }
.crop.tr { top: 16px; right: 16px; }
.crop.bl { bottom: 16px; left: 16px; }
.crop.br { bottom: 16px; right: 16px; }
.crop::before, .crop::after {
  content: '';
  position: absolute;
  background: rgba(0,0,0,0.1);
}
.crop::before { width: 16px; height: 0.5px; }
.crop::after { width: 0.5px; height: 16px; }
.crop.tr::before, .crop.br::before { right: 0; left: auto; }
.crop.tr::after, .crop.br::after { right: 0; left: auto; }
.crop.bl::before, .crop.br::before { bottom: 0; top: auto; }
.crop.bl::after, .crop.br::after { bottom: 0; top: auto; }
```

## Edge Softening

### SVG Ink Bleed Filter

```html
<svg width="0" height="0" style="position:absolute"><defs>
  <filter id="inkbleed">
    <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="1.2" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
</defs></svg>
```

Use with `.shape { filter: url(#inkbleed); }`.

### Registration Shift Accent

```css
.accent-text { text-shadow: 2px 1px 0 rgba(184,80,56,0.12); }
```

## Geometric Decoration

Use only `1-3` decorative elements per slide with opacity between `0.04` and `0.12`.

- large terracotta circle
- halftone dot cluster
- slightly tilted rule
- hollow small square

## Layout Rules

- Use asymmetrical splits such as `40:60`, `55:35`, or `43:57`, never `50:50`.
- Divider lines should be `1px` in `rgba(42,42,48,0.06)`.
- If showing a process, let the steps rise gently upward across the slide.
- Connection lines should be dashed with small arrowheads.

## Component Patterns

- Labels: DM Mono `16px` with a short horizontal rule before the text.
- Highlight markers: use a `4px` terracotta vertical line instead of circles or stickers.
- Quote blocks: `4px` left rule plus body copy.
- Footer tags: square-corner rectangles with very light borders.
- Page number: Playfair Display `18px`, opacity `0.15`, format `00 / 04`.

## Prohibited Elements

- emoji
- rounded pills
- gradients
- box-shadow and glow
- pure black or default white as stock
- `50:50` columns
- thick arrows
- 3D effects

## Checklist

- [ ] Is the background warm stock `#f0ebe2` in `paper` mode?
- [ ] If `background_mode=white`, is the canvas white with grain and fold removed?
- [ ] Are crop marks present?
- [ ] Is the accent color terracotta red `#b85038`?
- [ ] Is the layout asymmetrical?
- [ ] Are giant numbers serif?
- [ ] Does negative space stay above `50%`?
- [ ] Are decorative elements subtle and sparse?
- [ ] Is there at least one slight rotation or offset?
- [ ] Is the page number present?
