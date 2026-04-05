# Style G: Neo-Brutalism and Raw Digital

## Overview

Generate infographic slides with neo-brutalist language: thick black borders, saturated blocks, hard offset shadows, intentionally rough composition, and an anti-polished attitude.

## Design Philosophy

- Choose rawness over refinement.
- Let black outlines define everything.
- Use hard offset shadows, never blur.
- Push saturated colors into direct collision.
- Allow slight imperfection in tilt, spacing, and stacking.

## Visual Reference

Think of Gumroad-style branding, indie developer websites, underground music flyers, or anti-establishment tech posters that know the rules and break them on purpose.

## Canvas

```text
Width: 1600px
Height: 900px
Padding: 48-64px
```

## Color System

Choose `3-4` colors from this set.

```css
--bg: #f5f0e0;
--black: #1a1a1a;
--highlight: #ffe156;
--accent-1: #ff6b6b;
--accent-2: #4ecdc4;
--accent-3: #a88beb;
```

Rules:

- Every visible block gets a `2-4px` solid near-black border.
- Color blocks can be large and opaque.
- Overlap with stacking order, not with blend modes.

Forbidden:

- gradients
- transparency under `0.9`
- blur shadow
- glow
- low-saturation palettes

## Typography

```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Space+Mono:wght@400;700&family=Inter:wght@400;700;900&family=Noto+Sans+SC:wght@400;700;900&display=swap" rel="stylesheet">
```

| Role | Font | Weight |
|---|---|---|
| Display title | Space Grotesk | 700 |
| Body | Inter | 400 / 700 |
| Labels and code | Space Mono | 400 / 700 |
| Chinese title | Noto Sans SC | 900 |
| Chinese body | Noto Sans SC | 400 |

Suggested sizes:

```text
Display title: 64-96px
Chinese display title: 42-56px
Subtitle: 28-36px
Body: 20-24px
Label: 14-16px
```

Titles should be heavy but do not need to be all-caps.

### Chinese And English Pairing

- Use `Noto Sans SC` for Chinese titles and Chinese body copy, and keep the Chinese wording short, punchy, and declarative.
- Let English stay in `Space Grotesk` for loud headlines and in `Space Mono` for sticker-like labels or UI tags.
- Do not scatter mixed-script text inside one color sticker. Give Chinese and English their own blocks when both need emphasis.
- Keep Chinese body copy at `400` or `700` weight with `1.4-1.5` line-height so the raw composition still reads fast.

## Background Treatment

### Background Mode

- Default `background_mode=paper`: keep the warm off-white stock and light dotted texture.
- `background_mode=white`: use `#ffffff`, remove the texture, and keep the thick borders, color blocks, and aggressive contrast.

### Layer 1: Base

```css
.card { background: #f5f0e0; }
```

### Layer 2: Light Dot Texture

```css
.card::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 50;
  pointer-events: none;
  opacity: 0.08;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 200px;
}
```

## Core CSS Techniques

### Thick Outline

```css
.brutal-box {
  border: 3px solid #1a1a1a;
  background: var(--highlight);
}
```

### Hard Shadow

```css
.brutal-shadow {
  box-shadow: 6px 6px 0 #1a1a1a;
}
.brutal-text-shadow {
  text-shadow: 3px 3px 0 #1a1a1a;
}
```

Blur must always stay at `0`.

### Tilted Elements

```css
.tilt-left { transform: rotate(-2deg); }
.tilt-right { transform: rotate(1.5deg); }
.tilt-more { transform: rotate(-4deg); }
```

### Stacked Blocks

```css
.stacked-box {
  position: relative;
  border: 3px solid #1a1a1a;
  background: var(--accent-1);
  box-shadow: 6px 6px 0 #1a1a1a;
}
.stacked-box::before {
  content: '';
  position: absolute;
  inset: -3px;
  border: 3px solid #1a1a1a;
  background: var(--accent-2);
  transform: translate(12px, 12px);
  z-index: -1;
}
```

## Layout Rules

- Symmetry is not required, but reading order still matters.
- Overlap and stacking are welcome.
- Keep block spacing tight, around `8-16px`.
- Heavy black rules can act as dividers.
- Negative space should stay around `25-35%`.
- Slight rotation and misalignment are allowed.

## Component Patterns

- Labels: colored block, `3px` border, hard shadow, Space Mono Bold.
- Lists: tiny black square bullets with `2px` border.
- Data card: large colored block with border and hard shadow, big number in Space Grotesk.
- Divider: `3-4px` solid black.
- Quote block: yellow field with thick border.

## Prohibited Elements

- gradients
- blur shadow
- rounded corners above `8px`
- transparent blocks
- thin lines under `2px`
- serif display fonts
- low-saturation palettes
- excessive white space
- symmetry
- delicate decorative patterns

## Checklist

- [ ] Do all major elements have thick black borders?
- [ ] Do hard shadows stay blur-free?
- [ ] Are the colors saturated enough?
- [ ] Are `1-3` elements slightly rotated?
- [ ] Are gradients and blur absent?
- [ ] Is negative space around `25-35%`?
- [ ] Is the title a heavy geometric sans-serif?
- [ ] Is there visible stacking depth?
- [ ] Is the base `#f5f0e0` in `paper` mode?
- [ ] If `background_mode=white`, is the canvas white with texture removed?
- [ ] Does the slide feel raw, confrontational, and intentional?
