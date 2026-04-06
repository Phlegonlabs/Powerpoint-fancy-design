# Geometry Preserve Rules

Use this file when a slide contains geometry-sensitive content such as org charts, system maps, box-and-arrow diagrams, strict tables, framework stacks, or any layout where the relative size and position of boxes carry meaning.

## Core Principle

For geometry-sensitive slides, preserve the structural skeleton first. Style may change the surface language, but it must not distort the underlying relationships.

## When To Use Geometry Preserve

Use `geometry-preserve` behavior when the source contains:

- multi-box hierarchies or org charts
- system architecture diagrams
- process maps with explicit connectors
- strict row-column tables
- side-by-side structures where box size or position encodes meaning

Do not use generic content-card layouts for these pages unless the user explicitly asks for a reinterpretation.

## Layout Rules

- Build the diagram with explicit tracks, coordinates, or bounded box sizes.
- Keep sibling boxes on controlled widths and heights instead of letting text fully determine geometry.
- Treat connectors, dividers, and ornamental rules as secondary layers.
- Keep text inside boxes readable without shrinking the box skeleton into distortion.
- If text is too long, reduce copy, split the diagram, or move detail into callouts. Do not silently compress the whole figure.

Avoid:

- uncontrolled `align-content: stretch`
- uncontrolled `grid-auto-rows`
- box sizes driven only by paragraph length
- decorative overlays that visually merge with labels or connectors

## Export Expectations

Geometry-sensitive slides should remain visually consistent across:

1. HTML source view
2. rendered PNG
3. final PPT slide

If the diagram looks correct in HTML but distorted in PPT, treat that as an export-chain defect and fix the export path instead of redesigning the diagram.
