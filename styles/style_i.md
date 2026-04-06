# Style I: Dark Editorial and Sharp Typography

## Overview

Generate infographic slides with premium dark editorial language: charcoal backgrounds, razor-sharp serif headlines, ultra-light body type, large pools of dark space, and minimal metallic accents.

## Design Philosophy

- Treat darkness as the stage.
- Let typography do almost all the design work.
- Create tension through extreme contrast between heavy headlines and delicate body text.
- Keep the frame calm and almost colorless.
- Control vertical rhythm precisely.

## Visual Reference

Think of dark longform magazine layouts, documentary title cards, or luxury catalog pages built on authority and quiet confidence.

## Canvas

```text
Width: 1600px
Height: 900px
Padding: 80-100px
```

## Color System

```css
--bg: #111116;
--surface: #1a1a22;
--text-primary: #e8e4dc;
--text-secondary: #8a8680;
--text-muted: #4a4844;
--rule: #2a2a30;
--metal: #a89878;
```

Rules:

- Metallic tone is only for tiny accents such as a rule, label, or page number.
- Hierarchy should come from grayscale contrast, not from added color.

Forbidden:

- pure black `#000`
- pure white `#fff`
- any hue-based color
- gradients
- glow
- shadow
- high saturation

`background_mode=white` is not supported.

## Typography

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Inter:wght@200;300;400;500&family=DM+Mono:wght@300;400&family=Noto+Serif+SC:wght@400;700;900&family=Noto+Sans+SC:wght@200;300;400&display=swap" rel="stylesheet">
```

| Role | Font | Weight |
|---|---|---|
| Display title | Playfair Display | 900 |
| Subtitle | Playfair Display | italic 400 |
| Body | Inter | 200 / 300 |
| Label | DM Mono | 300 |
| Chinese title | Noto Serif SC | 900 |
| Chinese body | Noto Sans SC | 200 / 300 |

Suggested sizes:

```text
Display Title (EN):   88-140px
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

The critical move is weight contrast: `900` headline against `200` body.

### Chinese And English Pairing

- Use `Noto Serif SC` for Chinese titles and `Noto Sans SC` for Chinese body copy. This preserves the editorial contrast without forcing Latin serif behavior onto Han characters.
- Let `Playfair Display` stay on short English pull words, subtitles, or numerals. Chinese should carry the main thesis when the deck is Chinese-first.
- Long Chinese paragraphs should use slightly narrower line widths than English, with `1.55-1.7` line-height.
- In bilingual slides, English should support the editorial mood while Chinese carries the argument.

## Background Treatment

### Background Mode

- Support only `background_mode=paper`.
- This style depends on dark-magazine contrast and cannot be converted to white.

### Layer 1: Base

```css
.card { background: #111116; }
```

### Layer 2: Fine Surface Noise

```css
.card::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 50;
  pointer-events: none;
  opacity: 0.08;
  mix-blend-mode: screen;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 200px;
  animation: grain 0.6s steps(4) infinite;
}
@keyframes grain {
  0%,100%{transform:translate(0,0)}
  25%{transform:translate(-1px,1px)}
  50%{transform:translate(1px,-1px)}
  75%{transform:translate(-1px,1px)}
}
```

## Typographic Devices

### Huge Headline + Ultra-Light Subtitle

```css
.headline {
  font-family: 'Playfair Display', serif;
  font-weight: 900;
  font-size: 120px;
  color: var(--text-primary);
  line-height: 0.9;
  letter-spacing: -2px;
}
.subtitle {
  font-family: 'Inter', sans-serif;
  font-weight: 200;
  font-size: 20px;
  color: var(--text-secondary);
  letter-spacing: 6px;
  text-transform: uppercase;
  margin-top: 24px;
}
```

### Big Number

```css
.big-number {
  font-family: 'Playfair Display', serif;
  font-weight: 900;
  font-size: 160px;
  color: var(--text-primary);
  line-height: 0.85;
  opacity: 0.9;
}
.big-number-label {
  font-family: 'DM Mono', monospace;
  font-weight: 300;
  font-size: 16px;
  color: var(--text-muted);
  letter-spacing: 5px;
  text-transform: uppercase;
}
```

### Editorial Rule

```css
.editorial-rule {
  height: 0.5px;
  background: var(--rule);
  margin: 40px 0;
}
.editorial-rule.metal {
  background: var(--metal);
  opacity: 0.4;
}
```

## Layout Rules

- Use one column or an asymmetrical `65:35` or `70:30` split.
- Keep the headline left-aligned and dominant in the upper half.
- Keep body width under `55%`.
- Count dark empty space as a major design ingredient.
- Keep negative space around `50-60%`.
- Separate groups with extremely thin rules.

## Component Patterns

- Display title: Playfair Black in warm white with compressed leading.
- Subtitle: all-caps Inter ExtraLight with wide spacing.
- Data module: giant Playfair number with a DM Mono label above.
- List marker: tiny metallic dash.
- Quote: `0.5px` metallic vertical rule and generous inset.
- Page number: DM Mono `14px` in metallic tone.

## Prohibited Elements

- color
- gradient
- shadow
- glow
- emoji
- icons
- geometric decoration
- rounded corners
- decorative patterns
- filled color blocks

## Checklist

- [ ] Is the background charcoal `#111116` with very fine noise?
- [ ] Is the headline Playfair `900`?
- [ ] Is the body set in Inter `200` or `300`?
- [ ] Is headline/body contrast extreme enough?
- [ ] Is metallic tone used only in tiny accents?
- [ ] Are all colorful hues absent?
- [ ] Are rules `0.5px` or thinner?
- [ ] Is dark space at least `50%`?
- [ ] If the user requests white, is the style rejected or replaced explicitly?
- [ ] Is body line-height spacious enough?
- [ ] Does the slide feel authoritative and nocturnal?
