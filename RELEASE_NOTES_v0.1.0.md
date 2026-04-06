# v0.1.0

Initial public release of `ppt-design`, a presentation-design skill for turning page-by-page Markdown into styled `1600x900` presentation slides, PNG previews, and exportable PPTX decks.

## Highlights

- Introduces a complete Markdown-to-slide workflow designed for presentation output rather than document formatting.
- Supports 10 visual presentation styles, from Swiss editorial layouts to Memphis Pop.
- Generates HTML slides first, then renders them to PNG and packages them into PPTX when needed.
- Adds PNG-based README style previews to show how each style behaves in a deck context.
- Adds bilingual documentation support with separate English and Chinese README files.
- Adds Chinese and bilingual typography guidance across the style system.

## Included In This Release

- Core skill workflow in [`SKILL.md`](./SKILL.md)
- English documentation in [`README.md`](./README.md)
- Chinese documentation in [`README.zh.md`](./README.zh.md)
- Style selection guidance in [`references/style-selector.md`](./references/style-selector.md)
- Bilingual typography guidance in [`references/bilingual-typography.md`](./references/bilingual-typography.md)
- 10 style definition files in [`styles/`](./styles/)
- README preview generator in [`scripts/generate_style_previews.mjs`](./scripts/generate_style_previews.mjs)
- HTML-to-PNG renderer in [`scripts/render_slides.mjs`](./scripts/render_slides.mjs)
- PNG-to-PPTX exporter in [`scripts/export_ppt.mjs`](./scripts/export_ppt.mjs)

## Workflow Summary

1. Provide a Markdown document with content organized by page, for example `Page 1`, `Page 2`, and so on.
2. Choose a style or let the skill recommend 2-3 suitable styles.
3. Generate one `1600x900` HTML slide per page.
4. Review each slide for clipping, overlap, density, and presentation readability.
5. Render the deck to PNG and export to PPTX if required.

## Documentation Improvements

- Split repository documentation into English and Chinese versions for easier reference.
- Expanded the `About` section to clarify expected input, automatic layout responsibilities, and output behavior.
- Added explicit guidance for Chinese-first and bilingual decks so style usage is more consistent across languages.

## Notes

- `background_mode=white` is supported only by styles `A`, `B`, `C`, `D`, `E`, `G`, and `J`.
- Styles `F`, `H`, and `I` remain dark-native and should not be converted to white backgrounds.
- The PPT export is image-based to preserve layout fidelity between HTML, PNG, and PowerPoint output.
