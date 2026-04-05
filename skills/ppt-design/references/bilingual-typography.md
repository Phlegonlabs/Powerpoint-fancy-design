# Bilingual Typography

Use this file when slide copy is in Chinese or mixed Chinese and English.

## Core Principle

Do not force one Latin display font to carry the whole slide language system. In most styles:

- English display fonts provide tone.
- Chinese title fonts provide readable structure.
- Chinese body fonts should stay stable and projection-safe.

## General Rules

- Keep Chinese and English on separate lines when both need strong hierarchy.
- Do not drop decorative English display fonts directly into long Chinese sentences.
- Use Chinese body copy in a sans-serif family unless the style explicitly depends on editorial serif headings.
- Increase Chinese body line-height to about `1.45-1.7`.
- Keep Chinese line length shorter than English line length when possible.
- Avoid fake tracking on Chinese. Wide letter-spacing is for English labels, not Chinese paragraphs.
- If a slide is bilingual, let one language carry the main message and let the other act as support, label, subtitle, or annotation.

## Default Font Strategy

| Use Case | English | Chinese |
|---|---|---|
| Editorial serif title | Playfair Display | Noto Serif SC |
| Bold geometric or brutalist title | Bebas Neue / Space Grotesk / Fredoka / Orbitron | Noto Sans SC |
| Body copy | Inter | Noto Sans SC |
| Labels | DM Mono / Space Mono | Noto Sans SC or keep labels in short English only |

## Style Pairing Summary

| Style | English Pairing | Chinese Pairing | Recommended Mixed-Language Behavior |
|---|---|---|---|
| A | Playfair Display + Inter + DM Mono | Noto Serif SC + Noto Sans SC | Let Chinese carry the main thesis, and use English for tags, numbers, and short editorial accents |
| B | Playfair Display + Inter + DM Mono | Noto Serif SC + Noto Sans SC | Let Chinese titles lead; keep English as a quiet subtitle or one reflective phrase |
| C | Inter + DM Mono | Noto Sans SC | Separate Chinese and English into blocks, stickers, or layers instead of mixing them inside one sentence |
| D | Bebas Neue + Inter + Space Mono | Noto Sans SC | Use Chinese for the main title block and keep English for directional labels or small secondary captions |
| E | Playfair Display + Inter + DM Mono | Noto Serif SC + Noto Sans SC | Use English as a brand cue and Chinese as the narrative voice |
| F | Playfair Display + Inter + DM Mono | Noto Serif SC + Noto Sans SC | Keep Chinese centered and formal; use English as a small subtitle or ceremonial label |
| G | Space Grotesk + Inter + Space Mono | Noto Sans SC | Keep Chinese short and punchy; put English in stickers, labels, or UI-like blocks |
| H | Orbitron + Space Mono + Inter | Noto Sans SC | Let English handle cockpit labels and short tech modules; let Chinese carry the narrative text |
| I | Playfair Display + Inter + DM Mono | Noto Serif SC + Noto Sans SC | Keep Chinese headline-led and serious; use English for subheads, labels, and selected pull words |
| J | Fredoka + Inter + Space Mono | Noto Sans SC | Keep Chinese headlines short, bold, and separate from playful English accent words |

## Failure Cases To Avoid

- Long Chinese paragraphs set in Playfair Display, Bebas Neue, Fredoka, or Orbitron.
- Chinese text with aggressive all-caps spacing behavior copied from English labels.
- One headline alternating Chinese and English every few words.
- Thin Chinese body text on dark backgrounds below `300` weight.
- Decorative micro-label fonts used for Chinese paragraphs.
