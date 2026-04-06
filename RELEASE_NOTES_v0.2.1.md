# v0.2.1

This release tightens the generic template output, improves style fidelity across the A-J template cases, and formalizes text-first review behavior so decorative elements never take priority over content.

## Highlights

- Polishes the topic-neutral A-J template pipeline into a more presentable release set.
- Adds per-style build support so template cases can be refined one style at a time.
- Strengthens style-fidelity rules so open, restrained styles stay restrained instead of being normalized toward one shared density.
- Hardens review guidance around text priority, divider collisions, and dark-on-dark contrast failures.
- Updates repository versioning and release references to match the current state of the project.

## Included In This Release

- Updated generic template builder in [`scripts/build_template_style_cases.mjs`](./scripts/build_template_style_cases.mjs)
- Refined template-case rendering shell in [`scripts/template_style_cases/shell.mjs`](./scripts/template_style_cases/shell.mjs)
- Updated template-case build flow in [`scripts/template_style_cases/build.mjs`](./scripts/template_style_cases/build.mjs)
- Updated root skill workflow in [`SKILL.md`](./SKILL.md)
- Updated distributable skill workflow in [`skills/ppt-design/SKILL.md`](./skills/ppt-design/SKILL.md)
- Revised layout review rules in [`references/presentation-layout-rules.md`](./references/presentation-layout-rules.md)
- Revised HTML review checklist in [`references/html-review-checklist.md`](./references/html-review-checklist.md)

## Behavior Changes

1. Template cases can now be rebuilt per style instead of only as an all-or-nothing batch.
2. Text, labels, metrics, and footers now explicitly outrank decorative dividers, blocks, and ornaments.
3. Dark text is no longer allowed to visually collapse into dark image-like fills or dark decorative fields.
4. Style-specific whitespace is preserved instead of forcing all styles toward the same amount of fill.
5. Template demos are treated as reusable presentation skeletons, not topic-bound benchmark decks.

## Template Case Improvements

- `A` and `B` now better balance restraint and fill.
- `F` and `I` reduce decorative-line competition against text.
- `C`, `D`, `E`, `G`, `H`, and `J` receive style-aware element polishing without flattening their visual identity.
- The generic template case output remains fully audit-clean after the refinements.

## Notes

- The primary release showcase remains the topic-neutral template pipeline under `build:template-cases`.
- Existing `v0.2.0` release notes remain as the major-system update milestone.
- `v0.2.1` is the polish-and-fidelity follow-up release.
