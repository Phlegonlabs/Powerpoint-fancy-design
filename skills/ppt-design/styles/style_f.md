# Style F: Art Deco and Symmetrical Luxury

## Overview

Generate infographic slides with 1920s-1930s Art Deco language: strict vertical symmetry, radiating ornament, gold linework, tall elegant typography, and restrained luxury on a dark field.

## Design Philosophy

- Center everything on a strong vertical axis.
- Use linework as ornament instead of filled decoration.
- Favor tall and narrow proportions.
- Keep luxury controlled rather than flashy.
- Build hierarchy through line weight and spacing, not through many colors.

## Visual Reference

Think of Chrysler Building metalwork, old hotel invitation cards, or premium champagne labels with precise, ceremonial symmetry.

## Canvas

```text
Width: 1600px
Height: 900px
Padding: 72-96px
```

## Color System

```css
--bg: #0e1118;
--gold: #c4a265;
--gold-dim: #8a7040;
--cream: #e8e0d0;
--text-secondary: #9a9488;
--text-muted: #5a5650;
```

Use gold only for linework, borders, and small accents.

Forbidden:

- bright gold `#ffd700`
- pure black `#000`
- pure white `#fff`
- any full color
- gradient fills
- glow
- metallic image textures

`background_mode=white` is not supported.

## Typography

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Inter:wght@200;300;400;500&family=DM+Mono:wght@300;400&family=Noto+Serif+SC:wght@400;700;900&family=Noto+Sans+SC:wght@300;400;500&display=swap" rel="stylesheet">
```

| Role | Font | Weight |
|---|---|---|
| Display title | Playfair Display | 900 |
| Subtitle | Playfair Display | italic 400 |
| Body | Inter | 200 / 300 |
| Label | DM Mono | 300 |
| Chinese title | Noto Serif SC | 900 |
| Chinese body | Noto Sans SC | 300 / 400 |

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

Use all-caps titles with wide tracking. Body copy should stay very light so the decorative lines remain important.

### Chinese And English Pairing

- Use `Noto Serif SC` for Chinese titles and `Noto Sans SC` for Chinese body copy. Do not set long Chinese passages in ultra-thin decorative serif styling.
- Keep `Playfair Display` all-caps behavior for English only. Chinese should stay centered, formal, and compact without fake tracking.
- In bilingual luxury slides, let Chinese lead the main title and place English as a smaller subtitle, crest line, or ceremonial label.
- If the page feels crowded after adding both languages, reduce copy before reducing the centered elegance.

## Background Treatment

### Background Mode

- Support only `background_mode=paper`.
- This style depends on a dark field and controlled gold contrast. Do not convert it to white.

### Layer 1: Base

```css
.card { background: #0e1118; }
```

### Layer 2: Fine Noise

```css
.card::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 50;
  pointer-events: none;
  opacity: 0.12;
  mix-blend-mode: screen;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 200px;
  animation: grain 0.5s steps(4) infinite;
}
@keyframes grain {
  0%,100%{transform:translate(0,0)}
  25%{transform:translate(-1px,1px)}
  50%{transform:translate(1px,-1px)}
  75%{transform:translate(-1px,1px)}
}
```

## Ornament Construction

### Sunburst

```html
<svg viewBox="0 0 400 400" class="sunburst">
  <g stroke="var(--gold)" stroke-width="0.5" fill="none" opacity="0.3">
    <line x1="200" y1="200" x2="200" y2="0" />
    <line x1="200" y1="200" x2="200" y2="0" transform="rotate(15 200 200)" />
    <line x1="200" y1="200" x2="200" y2="0" transform="rotate(30 200 200)" />
  </g>
</svg>
```

### Fan Motif

```html
<svg viewBox="0 0 200 100">
  <path d="M 100,100 L 20,0 A 80,80 0 0,1 180,0 Z" fill="none" stroke="var(--gold)" stroke-width="0.5" />
  <path d="M 100,100 L 40,10 A 60,60 0 0,1 160,10 Z" fill="none" stroke="var(--gold)" stroke-width="0.5" />
  <path d="M 100,100 L 60,20 A 40,40 0 0,1 140,20 Z" fill="none" stroke="var(--gold)" stroke-width="0.5" />
</svg>
```

### Diamond Border

```css
.diamond-border {
  width: 60px;
  height: 60px;
  border: 0.5px solid var(--gold);
  transform: rotate(45deg);
  opacity: 0.4;
}
```

### Deco Divider

```html
<svg viewBox="0 0 600 20" class="deco-divider">
  <line x1="0" y1="10" x2="250" y2="10" stroke="var(--gold)" stroke-width="0.5" opacity="0.5" />
  <rect x="270" y="4" width="12" height="12" transform="rotate(45 276 10)" fill="none" stroke="var(--gold)" stroke-width="0.5" opacity="0.5" />
  <line x1="300" y1="10" x2="600" y2="10" stroke="var(--gold)" stroke-width="0.5" opacity="0.5" />
</svg>
```

### Corner Ornament

```css
.corner { position: absolute; z-index: 55; }
.corner::before, .corner::after {
  content: '';
  position: absolute;
  background: var(--gold);
  opacity: 0.35;
}
.corner::before { width: 40px; height: 0.5px; }
.corner::after { width: 0.5px; height: 40px; }
.corner.tl { top: 48px; left: 48px; }
.corner.tr { top: 48px; right: 48px; }
.corner.br { bottom: 48px; right: 48px; }
.corner.bl { bottom: 48px; left: 48px; }
.corner.tr::before, .corner.br::before { right: 0; left: auto; }
.corner.tr::after, .corner.br::after { right: 0; left: auto; }
.corner.bl::before, .corner.br::before { bottom: 0; top: auto; }
.corner.bl::after, .corner.br::after { bottom: 0; top: auto; }
```

## Layout Rules

- Keep strict vertical symmetry.
- Use decorative dividers to separate vertical sections.
- Place ornaments above or below the title, not everywhere.
- Keep negative space around `45-55%`.

## Component Patterns

- Display title: Playfair all-caps in cream.
- Subtitle: italic Playfair in gold.
- Lists: tiny gold diamonds instead of bullets.
- Quotes: framed by two gold rules.

## Prohibited Elements

- rounded corners
- organic curves
- gradients
- shadow
- glow
- emoji
- icons
- asymmetry
- large gold fills
- 3D effects

## Checklist

- [ ] Is the background dark with subtle fine noise?
- [ ] Is the composition symmetrical along a center axis?
- [ ] Is gold used only for lines and small accents?
- [ ] Are line weights `1px` or below?
- [ ] Is there a sunburst or fan motif?
- [ ] Are titles all-caps with wide tracking?
- [ ] Is body type thin enough?
- [ ] Are corner ornaments present?
- [ ] If the user requests white, is the style rejected or replaced explicitly?
- [ ] Does the slide feel elegant, formal, and controlled?
