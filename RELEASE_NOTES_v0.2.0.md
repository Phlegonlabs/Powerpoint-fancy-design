# v0.2.0

This release turns `ppt-design` from an initial style-driven skill into a more complete presentation-design system with dual-agent support, layout prototype guidance, safe-zone enforcement, and generic template case generation.

## Highlights

- Adds explicit support for both Codex and Claude Code project workflows.
- Introduces layout prototype guidance so slide structure is chosen by content role instead of repeating the same layout pattern.
- Adds safe-zone documentation and review rules to keep primary content inside a fixed presentation-safe frame.
- Refreshes repository documentation into a more product-style format with gallery, quick start, and template-library entry points.
- Adds a generic template case pipeline for producing 10-style, topic-neutral demo decks.

## Included In This Release

- Updated skill workflow in [`SKILL.md`](./SKILL.md)
- Claude Code project entrypoint in [`CLAUDE.md`](./CLAUDE.md)
- Generic template library in [`cases/templates/`](./cases/templates/)
- Layout prototype guidance in [`references/layout-prototypes.md`](./references/layout-prototypes.md)
- Safe-zone guidance in [`references/safe-zone.md`](./references/safe-zone.md)
- Updated review checks in [`references/html-review-checklist.md`](./references/html-review-checklist.md)
- Updated spacing rules in [`references/presentation-layout-rules.md`](./references/presentation-layout-rules.md)
- Generic template case builder in [`scripts/build_template_style_cases.mjs`](./scripts/build_template_style_cases.mjs)
- Generic template case logic in [`scripts/template_style_cases/`](./scripts/template_style_cases/)
- Programmatic style-case tooling in [`scripts/twitter_style_cases/`](./scripts/twitter_style_cases/)

## Workflow Changes

1. Read Markdown grouped by page.
2. Choose a style or let the skill recommend one.
3. Classify each slide by content role.
4. Select a layout prototype based on role and style family.
5. Keep all primary content inside `.main-frame`.
6. Review every slide for safe-zone, density, overlap, and readability issues.
7. Export to PNG or PPTX only after the HTML passes review.

## Documentation Changes

- Rewrites the README files into a clearer product-documentation structure.
- Adds release badges and current-release links at the top of the README files.
- Repositions the repo around reusable templates instead of a single named-topic example.
- Clarifies the difference between the full root workspace and the distributable `skills/ppt-design/` bundle.

## New Validation And Demo Paths

- `npm run build:twitter-cases`
  - builds the historical 10-style internal demo pipeline
- `npm run build:template-cases`
  - builds the topic-neutral 10-style generic template pipeline
- `npm run build:style-previews`
  - refreshes preview assets used by the documentation

## Notes

- PPT metadata is now environment-driven through `PPT_AUTHOR` and `PPT_COMPANY`.
- The generic template cases are intended to be presentable demo skeletons, not fixed-topic benchmark decks.
- Styles `F`, `H`, and `I` remain dark-native and should not be converted into white-mode variants.
