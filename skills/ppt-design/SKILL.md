---
name: ppt-design
description: Design presentation slides, infographic pages, and PPT-style visuals as 1600x900 HTML slides with optional PPT export. Use when the agent needs to pick or explain a slide style, recommend styles based on content, generate one or more static HTML slides, support `background_mode` paper or white for compatible light styles, or render finished slides into a high-fidelity image-based PPTX.
version: 0.2.1
---

# PPT Design

Design each slide as a standalone 1600x900 HTML file, then export to PPT only when the user asks for it.

## Workflow

1. Identify the topic, audience, and deliverable.
2. If the user provides a Markdown document, treat each `Page X` section as one slide unless the document clearly indicates a different page structure.
3. Read [style-selector.md](./references/style-selector.md) before choosing a style.
4. If the deck is in Chinese or mixed Chinese and English, read [bilingual-typography.md](./references/bilingual-typography.md).
5. Recommend 2-3 styles when the user has not already chosen one.
6. Explain each recommended style in plain language:
   - style name
   - one-line visual description
   - what kind of content it fits best
   - use English by default for these style explanations and recommendations
7. Confirm or infer `background_mode`:
   - default to `paper`
   - allow `white` only for compatible light styles
   - if the chosen style does not support `white`, say so and keep `paper` or recommend a compatible style
8. Read [background-modes.md](./references/background-modes.md).
9. Read [presentation-layout-rules.md](./references/presentation-layout-rules.md).
10. Read [html-review-checklist.md](./references/html-review-checklist.md).
11. Read [layout-prototypes.md](./references/layout-prototypes.md). Classify each slide's content role and select a layout prototype before writing HTML. Do not repeat the same layout on consecutive slides.
12. Read [safe-zone.md](./references/safe-zone.md). Enforce content boundaries on every slide: all primary content must live inside the main frame area (`y = 108px` to `y = 804px`). Include chrome labels only on cover and closing slides when `chrome=bookend`.
13. Read the chosen style file in `./styles/style_[a-j].md` before writing HTML. Treat that file as the visual source of truth. Do not rely on memory.
14. Preserve the chosen style's native whitespace, ornament density, contrast, and pacing. Do not normalize all styles toward the same layout density.
15. When the slide copy is Chinese or bilingual, follow the style's Chinese and English pairing guidance rather than reusing the English display font everywhere.
16. Recompose page content into slide hierarchy instead of preserving raw Markdown formatting literally.
17. Generate one HTML file per slide in `./outputs/html/`.
18. Review every generated HTML slide before delivery. Treat this as mandatory, not optional.
19. Fix layout, spacing, typography, and hierarchy issues found in review using the smallest change that keeps the slide true to the chosen style.
20. If the user wants PPT, render the HTML slides to PNG and package them into a PPTX.

## Inputs

Use these fields when the user provides them or when you need to make them explicit in your own reasoning:

- `input_markdown`: the source Markdown for the deck, ideally grouped by `Page 1`, `Page 2`, and so on
- `style`: `A-J` or a named style
- `background_mode`: `paper` or `white`
- `chrome`: `all`, `bookend`, or `none`
- `deliverable`: `html`, `ppt`, or `both`

Default behavior:

- `input_markdown`: infer page structure from headings when possible
- `style`: recommend candidates first when unspecified
- `background_mode`: `paper`
- `chrome`: `bookend`
- `deliverable`: `html`

## Style Selection

Read [style-selector.md](./references/style-selector.md) first.

When the user has not chosen a style:

- Recommend only 2-3 styles, not all 10.
- Match the recommendation to the content rather than to arbitrary taste words like "nice" or "cool".
- Explain what the style looks like and what kind of material it suits.
- Default the style recommendation language to English, even when the working conversation is in another language.
- Keep generated slide copy in the user's source language unless the user explicitly asks for translation.

Examples:

- Business report, finance, policy, research summary: bias toward `A`, `D`, or `I`.
- Brand story, culture, exhibition, philosophy, editorial: bias toward `B`, `E`, or `F`.
- Creative proposal, event, youth brand, campaign, entertainment: bias toward `C`, `G`, `H`, or `J`.

## Background Modes

Read [background-modes.md](./references/background-modes.md).

Apply these rules:

- `paper` keeps paper grain, print texture, and warm off-white stock when the style supports it.
- `white` switches the slide canvas to clean white and removes paper-specific texture, fold marks, and stock simulation.
- `white` does not remove style identity. Keep the typography, grid, ornament, contrast system, and non-paper decorative devices.
- `white` is supported only by styles `A`, `B`, `C`, `D`, `E`, `G`, and `J`.
- Styles `F`, `H`, and `I` are dark-native. Do not whitewash them.

## HTML Rules

- Create one file per slide: `slide_01.html`, `slide_02.html`, and so on.
- Keep the canvas fixed at `1600x900`.
- Use static HTML, CSS, and inline SVG only.
- Do not use JavaScript in the slide files.
- Do not use external images other than Google Fonts.
- Save outputs in `./outputs/html/`.
- Design for projection and presentation first, not for dense document reading.

Use this base structure unless the style file overrides a specific detail:

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=1600">
  <title>Slide Title</title>
  <link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet">
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: #e0e0e0;
      overflow: hidden;
    }
    .slide {
      position: relative;
      width: 1600px;
      height: 900px;
      overflow: hidden;
    }
    .slide::before {
      content: '';
      position: absolute;
      inset: 0;
      z-index: 50;
      pointer-events: none;
    }
    .chrome-top, .chrome-bottom {
      position: absolute;
      left: var(--edge, 96px);
      right: var(--edge, 96px);
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--muted, #999);
      z-index: 2;
    }
    .chrome-top { top: 28px; }
    .chrome-bottom { bottom: 24px; }
    .main-frame {
      position: absolute;
      left: var(--edge, 96px);
      right: var(--edge, 96px);
      top: 108px;
      bottom: 96px;
      z-index: 3;
    }
  </style>
</head>
<body>
  <div class="slide">
    <!-- Include chrome-top and chrome-bottom on cover and closing slides only when chrome=bookend -->
    <div class="chrome-top">
      <div class="style-id">STYLE A / Swiss International</div>
      <div class="meta-id">Cover</div>
    </div>
    <div class="chrome-bottom">
      <div class="meta-id">hero-cover</div>
      <div class="page-id">01 / 05</div>
    </div>
    <!-- Main content frame — present on EVERY slide -->
    <main class="main-frame">
      <!-- All primary content goes here -->
    </main>
  </div>
</body>
</html>
```

## Chrome Labels

Read [safe-zone.md](./references/safe-zone.md).

Apply these rules:

- `chrome=bookend`: show `.chrome-top` and `.chrome-bottom` on cover and closing slides only.
- `chrome=all`: show `.chrome-top` and `.chrome-bottom` on every slide.
- `chrome=none`: omit chrome labels entirely.
- The main content frame does not move when chrome visibility changes.

## Style Fidelity

Apply these rules on every slide:

- The chosen style file is the source of truth for visual behavior.
- Preserve the style's native whitespace strategy. Minimal and editorial styles should stay restrained.
- Preserve ornament logic. Decorative rules, frames, and accents should support the composition, not dominate it.
- When fixing density or collisions, prefer content edits, card count changes, or local spacing adjustments over turning every style into the same template.
- A successful revision should still look unmistakably like the chosen style family.

## Presentation Typography

Read [presentation-layout-rules.md](./references/presentation-layout-rules.md).

Apply these rules on every slide:

- Prioritize legibility at presentation distance.
- Do not allow text blocks, labels, or numbers to collide with each other.
- Prefer fewer, larger text groups over many small annotations.
- Keep headline and body contrast obvious in size, weight, and spacing.
- If a slide is text-heavy, redesign the hierarchy instead of shrinking everything.
- If a slide contains table-like information, convert it into presentation-friendly structure unless the user explicitly requires a literal dense table.

For presentation use, default minimums are:

- Main title: about `44px` or larger
- Section heading: about `28px` or larger
- Body text: about `22px` or larger
- Small labels and notes: avoid going below `16px` unless the style explicitly depends on microtype and the slide stays readable

When the chosen style is intentionally fancy or experimental, preserve the style but still protect legibility.

## Tables And Text-Heavy Content

Read [presentation-layout-rules.md](./references/presentation-layout-rules.md).

When the user asks for tables, comparisons, or many words:

- Default to redesigned comparison blocks, metric cards, timeline rows, or labeled columns instead of raw spreadsheet tables.
- Use a true table only when row-column comparison is the main point and simplifying it would lose meaning.
- Break large tables into multiple slides when needed.
- Highlight only the few values or row groups that matter.
- Maintain generous padding inside cells or cards so text never feels cramped.
- For dense content, prefer 3-6 major points per slide rather than squeezing everything into one page.

## Mandatory HTML Review

Read [html-review-checklist.md](./references/html-review-checklist.md).

After generating each slide, perform a second-pass review before delivery:

1. Check for overlap, collision, clipping, and crowding.
2. Check that typography is large enough for presentation.
3. Check that text-heavy or table-heavy content has been reformatted for slides.
4. Check that the chosen style is still intact after readability adjustments.
5. When tools allow it, render the HTML and inspect the actual visual result instead of relying only on source review.
6. Revise the HTML if any item fails.

Never hand off first-draft HTML without this review pass.

## PPT Export

When the user wants `ppt` or `both`, use the bundled scripts:

1. Ensure dependencies are installed with `npm install`.
2. Render HTML slides to PNG:

```powershell
node .\scripts\render_slides.mjs --input .\outputs\html --output .\outputs\rendered
```

3. Build the PPTX:

```powershell
node .\scripts\export_ppt.mjs --input .\outputs\rendered --output .\outputs\ppt\deck.pptx
```

The PPT export is intentionally image-based for fidelity. Each slide becomes one full-bleed PNG inside a 16:9 deck.

## Quality Checks

- The chosen style matches the content type and tone.
- The user can understand why that style was chosen.
- `background_mode` is honored correctly.
- Compatible light styles can switch between `paper` and `white`.
- Incompatible dark styles reject `white` explicitly.
- Every slide remains visually coherent within one style family.
- Text does not overlap, collide, clip, or crowd nearby elements.
- Typography is large enough for projection and presentation use.
- Text-heavy and table-like content has been reformatted into stronger slide hierarchy where appropriate.
- A second-pass HTML review happened after generation, not only before.
- PPT pages preserve the HTML composition without cropping or scaling errors.
- Decorative blocks, especially dark or saturated ones, do not invade the primary reading zones unless that overlap is deliberate, padded, and presentation-safe.
- All primary content stays within the main frame area (`108px` to `804px` vertically).
- No text content appears in the top reserved zone (`0-96px`) or bottom reserved zone (`804-900px`) except chrome labels allowed by the current `chrome` mode.
- Consecutive slides use different layout prototypes.
- A 10-slide deck uses at least 5 distinct layout prototypes.
- Refinements preserve the original style instead of flattening all decks toward the same density or ornament pattern.
