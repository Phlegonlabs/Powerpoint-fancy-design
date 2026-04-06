# Presentation Layout Rules

For layout prototype selection (which spatial arrangement to use per slide), see [layout-prototypes.md](./layout-prototypes.md). This file covers typography, spacing, and density rules that apply regardless of layout prototype.

Use this file before writing HTML whenever the output is meant for slides or presentation.

## Core Principle

Slides are not documents. Optimize for viewing distance, scanning speed, and speaking support.

## Typography Rules

Keep typography comfortably readable from a distance. Use line-height and spacing generously so Chinese and English mixed text stays clean.

### Typography Scale

Every slide uses one of the eight roles below. All sizes are hard minimums — do not go below them.

| Role | Description | EN Minimum | CN Minimum |
|---|---|---|---|
| **Display Title** | Main title, hero number, cover headline | `44px` | `40px` |
| **Section Heading** | H2, subtitle, section divider | `28px` | `28px` |
| **Body** | Running text, bullet items, descriptions | `22px` | `24px` |
| **Table Header** | Column or row header in tabular data | `20px` | `22px` |
| **Table Cell** | Data values inside table cells | `18px` | `20px` |
| **Support Copy** | Kicker, tagline, secondary descriptor | `18px` | `20px` |
| **Label / Caption** | Axis label, footnote, source, chart annotation | `16px` | `18px` |
| **Page Number** | Chrome-zone page counter only | `14px` | `14px` |

**Chinese offset**: CN text is `+2px` larger than EN for roles Body through Label because CJK stroke density reduces apparent size at projection distance. Display Title CN minimum is `40px` (slightly below EN `44px`) because Chinese titles are shorter in character count and each character occupies more visual width.

**Page Number exception**: `14px` is allowed only inside the chrome-safe-zone reserved areas (top `108px` or bottom `96px`). Never use it in the main content area.

### Table Typography

When the slide contains a literal table:
- Table header cells: at least `20px` (EN) or `22px` (CN), bold weight.
- Table body cells: at least `18px` (EN) or `20px` (CN).
- Keep column count to `4` or fewer. More columns require splitting the table or redesigning as comparison cards.

Do not shrink text just to preserve the first layout idea. If content does not fit, reduce content, split the slide, or rebuild the hierarchy.

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

## Geometry-Preserve Rules

- If the slide is a framework diagram, org chart, process map, system architecture, or strict table, preserve the structural geometry before stylizing it.
- Do not collapse box-and-arrow diagrams into generic cards, manifesto blocks, or loose comparison panels when the relative box sizes and positions carry meaning.
- Build geometry-sensitive pages with explicit tracks, coordinates, or bounded box sizes instead of relying on uncontrolled stretch behavior.
- Connectors, dividers, glows, and ornamental shapes are secondary. They may support the figure, but they must not move the reading order away from the boxes and labels.
- If labels are too long for the structure, shorten the copy, split the figure, or add notes. Do not silently squeeze the whole diagram until the proportions become misleading.
- The visual structure should stay consistent across HTML, rendered PNG, and the exported PPT slide.

## Fancy Style Exception

- Some styles intentionally distort, tilt, or densify composition.
- Preserve style energy, but never let expressive styling break readability.
- If a fancy treatment causes legibility problems, simplify the layout before shrinking the type too far.

## Style Fidelity Rules

- Treat the chosen style file as the source of truth for pacing, ornament density, and whitespace.
- Do not force all styles toward the same amount of fill. Some styles should feel open, quiet, or restrained.
- When a slide feels weak, refine hierarchy and composition first before adding decoration.
- Decorative rules, dividers, and accents must never collide with live text just because they are “part of the style”.
