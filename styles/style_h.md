# Style H: Retro Futurism and Cosmic Grid

## Overview

Generate infographic slides with late-1970s to 1980s science-fiction language: perspective horizon grids, deep cosmic gradients, CRT scanlines, monospaced labels, restrained neon strokes, and faint star-noise.

## Design Philosophy

- Build the slide around a horizon line.
- Let key outlines glow slightly, not aggressively.
- Use monospaced or geometric type like a terminal or control panel.
- Add CRT texture through scanlines and surface noise.
- Keep the frame dark and night-driven.

## Visual Reference

Think of *Tron*, old sci-fi magazine covers, early game packaging, or retro future tech manuals. The mood should be more disciplined than overloaded synthwave.

## Canvas

```text
Width: 1600px
Height: 900px
Padding: 56-72px
```

## Color System

```css
--bg-dark: #08080e;
--bg-mid: #0e1028;
--grid: #1a3a5a;
--grid-bright: #2a6a8a;
--neon-cyan: #40e8d0;
--neon-dim: #206860;
--text-primary: #d0dce8;
--text-secondary: #6880a0;
--horizon-glow: #c04060;
```

Rules:

- This is the only style where the background gradient is required.
- Neon cyan is for linework and text, not for large filled panels.
- The warm horizon glow should stay minimal.
- Most of the canvas should remain dark.

Forbidden:

- large bright fills
- white backgrounds
- overloaded pink-purple synthwave
- emoji
- cartoon styling

`background_mode=white` is not supported.

## Typography

```html
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Orbitron:wght@400;500;700;900&family=Inter:wght@200;300;400&family=Noto+Sans+SC:wght@300;400;700&display=swap" rel="stylesheet">
```

| Role | Font | Weight |
|---|---|---|
| Display title | Orbitron | 700 / 900 |
| Data and labels | Space Mono | 400 |
| Support copy | Inter | 200 / 300 |
| Chinese title | Noto Sans SC | 700 |
| Chinese body | Noto Sans SC | 300 |

Suggested sizes:

```text
Display title: 56-88px
Chinese display title: 36-48px
Subtitle: 24-32px
Body: 18-22px
Label: 12-14px
```

English labels should be all-caps with wide tracking, like cockpit labeling.

## Background Treatment

### Background Mode

- Support only `background_mode=paper`.
- This style depends on a dark sky, scanlines, and night glow. Do not convert it to white.

### Layer 1: Dark Gradient Sky

```css
.card {
  background: linear-gradient(
    180deg,
    #08080e 0%,
    #0e1028 50%,
    #1a1830 70%,
    #2a1838 85%,
    #0e1028 100%
  );
}
```

### Layer 2: CRT Scanlines

```css
.card::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 50;
  pointer-events: none;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0,0,0,0.15) 2px,
    rgba(0,0,0,0.15) 4px
  );
  opacity: 0.4;
}
```

### Layer 3: Surface Noise

```css
.card::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 51;
  pointer-events: none;
  opacity: 0.06;
  mix-blend-mode: screen;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 200px;
  animation: grain 0.3s steps(3) infinite;
}
@keyframes grain {
  0%,100%{transform:translate(0,0)}
  25%{transform:translate(-1px,1px)}
  50%{transform:translate(1px,-1px)}
  75%{transform:translate(-1px,1px)}
}
```

## Perspective Grid

### SVG Grid

```html
<svg viewBox="0 0 1600 450" class="perspective-grid" style="position:absolute;bottom:0;left:0;width:100%;height:50%;">
  <defs>
    <linearGradient id="grid-fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="var(--grid)" stop-opacity="0" />
      <stop offset="40%" stop-color="var(--grid)" stop-opacity="0.6" />
      <stop offset="100%" stop-color="var(--grid-bright)" stop-opacity="0.8" />
    </linearGradient>
  </defs>
  <line x1="0" y1="100" x2="1600" y2="100" stroke="url(#grid-fade)" stroke-width="0.5" />
  <line x1="0" y1="160" x2="1600" y2="160" stroke="url(#grid-fade)" stroke-width="0.5" />
  <line x1="0" y1="210" x2="1600" y2="210" stroke="url(#grid-fade)" stroke-width="0.5" />
  <line x1="0" y1="250" x2="1600" y2="250" stroke="url(#grid-fade)" stroke-width="0.8" />
  <line x1="0" y1="290" x2="1600" y2="290" stroke="url(#grid-fade)" stroke-width="0.8" />
  <line x1="0" y1="330" x2="1600" y2="330" stroke="url(#grid-fade)" stroke-width="1" />
  <line x1="0" y1="370" x2="1600" y2="370" stroke="url(#grid-fade)" stroke-width="1" />
  <line x1="0" y1="410" x2="1600" y2="410" stroke="url(#grid-fade)" stroke-width="1.2" />
  <line x1="0" y1="450" x2="1600" y2="450" stroke="url(#grid-fade)" stroke-width="1.5" />
  <line x1="800" y1="60" x2="0" y2="450" stroke="var(--grid)" stroke-width="0.5" opacity="0.4" />
  <line x1="800" y1="60" x2="200" y2="450" stroke="var(--grid)" stroke-width="0.5" opacity="0.4" />
  <line x1="800" y1="60" x2="400" y2="450" stroke="var(--grid)" stroke-width="0.5" opacity="0.4" />
  <line x1="800" y1="60" x2="600" y2="450" stroke="var(--grid)" stroke-width="0.5" opacity="0.4" />
  <line x1="800" y1="60" x2="1000" y2="450" stroke="var(--grid)" stroke-width="0.5" opacity="0.4" />
  <line x1="800" y1="60" x2="1200" y2="450" stroke="var(--grid)" stroke-width="0.5" opacity="0.4" />
  <line x1="800" y1="60" x2="1400" y2="450" stroke="var(--grid)" stroke-width="0.5" opacity="0.4" />
  <line x1="800" y1="60" x2="1600" y2="450" stroke="var(--grid)" stroke-width="0.5" opacity="0.4" />
</svg>
```

### Horizon Glow

```css
.horizon-glow {
  position: absolute;
  bottom: 48%;
  left: 30%;
  right: 30%;
  height: 2px;
  background: var(--neon-cyan);
  box-shadow: 0 0 20px var(--neon-cyan), 0 0 60px rgba(64,232,208,0.3);
  opacity: 0.6;
}
```

## Neon Stroke Effects

### Text Glow

```css
.neon-text {
  color: var(--neon-cyan);
  text-shadow:
    0 0 4px rgba(64,232,208,0.5),
    0 0 12px rgba(64,232,208,0.2);
}
```

### Border Glow

```css
.neon-border {
  border: 1px solid var(--neon-cyan);
  box-shadow:
    0 0 4px rgba(64,232,208,0.3),
    inset 0 0 4px rgba(64,232,208,0.1);
}
```

Keep the glow subtle. Blur should stay in the `4-12px` range.

## Layout Rules

- Split the frame into sky above and grid below.
- Put the headline in the upper third.
- Let data and modules float above the grid plane.
- Place tiny labels along the edge in spaced-out Space Mono.
- Keep negative space around `35-45%`.
- One floating geometric form is acceptable if it supports the scene.

## Component Patterns

- Display title: Orbitron all-caps in neon cyan with restrained glow.
- Data label: Space Mono inside a thin cyan bordered rectangle.
- List marker: short cyan dash.
- Divider: `0.5px` cyan rule with a faint glow.
- Page number: Space Mono `12px`, all-caps, dark blue-gray.

## Prohibited Elements

- white background
- large bright fills
- emoji
- rounded pills
- serif typography
- warm palette beyond the horizon accent
- hand-drawn elements
- heavy paper grain
- glow blur above `20px`

## Checklist

- [ ] Is the background a dark space-to-indigo gradient?
- [ ] Is there a perspective grid fading toward the horizon?
- [ ] Are CRT scanlines present?
- [ ] If the user requests white, is the style rejected or replaced explicitly?
- [ ] Are labels monospaced and wide-tracked?
- [ ] Is neon cyan mostly linework rather than fill?
- [ ] Is the glow restrained?
- [ ] Is a horizon glow line present?
- [ ] Does the slide feel like a disciplined 1983 future-tech magazine?
- [ ] Does it avoid overdone synthwave cliches?
