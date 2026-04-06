# Presentation Layout Rules

For layout prototype selection (which spatial arrangement to use per slide), see [layout-prototypes.md](./layout-prototypes.md). This file covers typography, spacing, and density rules that apply regardless of layout prototype.

Use this file before writing HTML whenever the output is meant for slides or presentation.

## Core Principle

Slides are not documents. Optimize for viewing distance, scanning speed, and speaking support.

## Typography Rules

- Keep typography comfortably readable from a distance.
- Default minimums:
  - Main title: `44px+`
  - Section heading: `28px+`
  - Body copy: `22px+`
  - Labels: `16px+`
- Do not shrink text just to preserve the first layout idea.
- If content does not fit, reduce content, split the slide, or rebuild the hierarchy.
- Use line-height and spacing generously so Chinese and English mixed text stays clean.

## Collision And Spacing Rules

- No text block should touch another text block, shape edge, or decoration accidentally.
- Keep consistent internal padding inside cards, panels, and comparison blocks.
- Leave enough edge margin so large display text never feels cropped.
- Avoid stacking too many alignments or decorative labels around the same focal area.
- Respect the slide safe zones. The top `108px` and bottom `96px` of the slide are reserved. All primary content must fit within the `696px` main content area. See [safe-zone.md](./safe-zone.md) for exact pixel boundaries.

## Dense Content Rules

- For text-heavy slides, reduce the number of paragraphs and elevate the main takeaway.
- Turn long prose into grouped bullets, pull quotes, key numbers, or labeled callouts.
- If a slide needs more than 6 primary ideas, split it.

## Table Rules

- Do not default to spreadsheet-looking tables.
- Prefer:
  - comparison cards
  - highlighted row groups
  - metrics with short descriptors
  - column blocks with emphasized numbers
- Use real tables only when exact row-column lookup is essential.
- When using a real table:
  - increase row height
  - keep columns few
  - highlight key rows or columns
  - avoid tiny text
  - split into multiple slides when needed

## Fancy Style Exception

- Some styles intentionally distort, tilt, or densify composition.
- Preserve style energy, but never let expressive styling break readability.
- If a fancy treatment causes legibility problems, simplify the layout before shrinking the type too far.

## Style Fidelity Rules

- Treat the chosen style file as the source of truth for pacing, ornament density, and whitespace.
- Do not force all styles toward the same amount of fill. Some styles should feel open, quiet, or restrained.
- When a slide feels weak, refine hierarchy and composition first before adding decoration.
- Decorative rules, dividers, and accents must never collide with live text just because they are “part of the style”.
