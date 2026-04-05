# Style B: East Asian Minimalism

## Overview

Generate highly restrained infographic slides with large negative space and a hand-screen-printed feel. The visual language should feel like a museum poster or refined cultural print: one focal form, quiet text, and calm breathing room.

## Design Philosophy

- Keep negative space at `70%` or more.
- One image, one idea.
- Let the ink feel absorbed by paper rather than digitally sharp.
- Limit the palette to two active colors plus gray.

## Visual Reference

Think of exhibition posters, Muji campaign work, or quiet East Asian cultural design. It should feel calm and distilled, never like a default slide template.

## Canvas

```text
Width: 1600px
Height: 900px
Padding: 80-100px
```

## Color System

```css
--bg: #f5f0e6;            /* warm cream stock */
--ink: #2d3a5c;           /* deep indigo ink */
--accent: #c45a3c;        /* faded vermilion */
--text-secondary: #8a8580;
--text-muted: #c4beb4;
```

Forbidden:

- pure black `#000`
- gradients
- glow or soft shadows
- high-saturation colors

Pure white `#fff` is allowed only when `background_mode=white`.

## Typography

```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700;900&family=DM+Mono:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
```

| Role | Font | Weight |
|---|---|---|
| English subhead | Playfair Display | italic 400 |
| English support copy | Inter | 300 |
| Monospaced label | DM Mono | 400 |
| Chinese title | Noto Serif SC | 700 |

Suggested sizes:

```text
Chinese title: 48-64px
English subhead: 24-32px
Body: 20-24px
Label: 12-14px
```

Keep the typography small and quiet. Titles should feel deliberate, not loud. Place text near edges or corners rather than in the center.

## Background Treatment

### Background Mode

- Default `background_mode=paper`: keep the cream stock and visible washi-like fiber.
- `background_mode=white`: use `#ffffff`, remove paper texture, but keep the same stillness, asymmetry, and single focal form.

### Layer 1: Base

```css
.card { background: #f5f0e6; }
```

### Layer 2: Washi Texture

```css
.card::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 50;
  pointer-events: none;
  opacity: 0.35;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 160px;
  animation: grain 0.3s steps(3) infinite;
}
```

Use the finer turbulence and higher opacity to simulate fibrous paper.

## Main Visual Elements

Each slide should use only one primary shape.

### Large Circle

```css
.main-circle {
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: #2d3a5c;
  filter: url(#inkbleed);
}
```

Place it off-center, usually around the left or right third.

### Horizontal Vermilion Rule

```css
.horizon-line {
  position: absolute;
  left: 80px;
  right: 80px;
  top: 61.8%;
  height: 1.5px;
  background: #c45a3c;
  opacity: 0.7;
  transform: rotate(-0.15deg);
}
```

### Arched Form

```css
.arch {
  background: #c45a3c;
  border-radius: 50% 50% 0 0;
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1.1' fill='white'/%3E%3C/svg%3E");
  -webkit-mask-size: 3.5px 3.5px;
  mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1.1' fill='white'/%3E%3C/svg%3E");
  mask-size: 3.5px 3.5px;
}
```

## Edge Treatment

### SVG Ink Absorption Filter

```html
<svg width="0" height="0" style="position:absolute"><defs>
  <filter id="inkbleed">
    <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="4" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="1.8" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
</defs></svg>
```

Use the stronger displacement so edges feel like ink spreading on absorbent paper.

## Layout Rules

- Put the main form in the upper or middle third and text in the lower third.
- Keep text aligned toward the lower left or lower right, not centered.
- Preserve large open areas between elements.
- Avoid cards, framed panels, and multi-column dashboards.

## Ornament Rules

- Decoration is minimal. Add only a very subtle rule if needed.
- Do not use crop marks, dot clusters, or extra small geometric shapes.
- A full-width vermilion rule at the bottom is acceptable as an anchor.

## Component Patterns

- Labels: DM Mono `12px` with a short vermilion dash.
- Lists: `3px` vermilion dots with generous vertical spacing.
- Quote block: `2px` vermilion left rule with open padding.

## Prohibited Elements

- emoji
- icons
- pills
- card containers
- extra background blocks
- multi-column layout
- gradients
- shadows
- crop marks
- more than two geometric decorations

## Checklist

- [ ] Is negative space at least `70%`?
- [ ] Is there only one main visual element?
- [ ] Is the stock warm cream `#f5f0e6` in `paper` mode?
- [ ] If `background_mode=white`, is the canvas white with texture removed?
- [ ] Are only indigo, vermilion, and gray used?
- [ ] Do edges feel slightly absorbed rather than perfectly sharp?
- [ ] Is the text quiet and placed near edges?
- [ ] Are there no cards or blocky layout panels?
- [ ] Does the slide feel calm, distilled, and museum-like?
