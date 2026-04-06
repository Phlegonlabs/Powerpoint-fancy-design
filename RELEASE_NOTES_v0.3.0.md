# v0.3.0

This release upgrades the repository from a slide generator into a public-stage presentation pipeline with a mandatory polish pass, audit gate, and internal benchmark flow.

## Highlights

- Introduces a task-based public-stage workflow: `draft -> polish -> audit -> render/export`.
- Adds deck-level polish logic so the system can rebalance layouts before delivery instead of relying on manual cleanup.
- Adds public-stage quality scoring, hard-fail gates, and scenario-aware style checks.
- Adds brand locks and speaker-notes sidecars as first-class outputs.
- Repositions the bundled demos as internal benchmark artifacts and release gates, not public-facing showcase assets.

## Included In This Release

- New quality and task modules under [`scripts/slide_engine/`](./scripts/slide_engine/)
- New public-stage benchmark builder in [`scripts/build_public_stage_cases.mjs`](./scripts/build_public_stage_cases.mjs)
- New benchmark specs in [`scripts/public_stage_cases/`](./scripts/public_stage_cases/)
- Updated root docs in [`README.md`](./README.md), [`README.zh.md`](./README.zh.md), and [`README.zh-TW.md`](./README.zh-TW.md)
- Updated skill workflow docs in [`SKILL.md`](./SKILL.md) and [`skills/ppt-design/SKILL.md`](./skills/ppt-design/SKILL.md)
- New rubric reference in [`references/presentation-quality-rubric.md`](./references/presentation-quality-rubric.md)

## Behavior Changes

1. Public-stage work no longer exports directly from the first generated draft.
2. A polish pass is now treated as a required system step, not an optional human follow-up.
3. Export now happens only after the audit gate passes.
4. Brand marks, footer lockups, and presenter notes are part of the output contract for public-stage decks.
5. High-energy styles now receive public-stage contrast adjustments instead of being accepted as-is.

## Internal Benchmark Positioning

- The public-stage style runs under `outputs/public-stage-brand-launch/` are internal benchmark outputs.
- They exist to verify presentation quality and release readiness across all styles.
- They are not intended to be published as the repository's public demo story by default.

## Notes

- Existing `v0.2.x` notes remain the pre-public-stage history.
- `v0.3.0` is the first release where polishing and audit gating are formalized as part of the product contract.
