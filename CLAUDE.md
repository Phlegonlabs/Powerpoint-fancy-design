# PPT Design — Claude Code Project Instructions

This project is a presentation design skill (`ppt-design`).
Read `SKILL.md` in full before starting any slide design work.

## Project Structure

| Directory | Purpose |
|-----------|---------|
| `SKILL.md` | Core skill definition and workflow |
| `references/` | Layout rules, style selector, review checklist, safe zones, and layout prototypes |
| `styles/` | 10 style definition files (`style_a.md` through `style_j.md`) |
| `scripts/` | Render and export tooling |
| `outputs/html/` | Generated HTML slides go here |
| `outputs/rendered/` | PNG renders of slides |
| `outputs/ppt/` | Final PPTX exports |

## Key Reference Files

Follow `SKILL.md` as the canonical workflow. The main references appear in this order:

1. `references/style-selector.md`
2. `references/bilingual-typography.md` when the deck is Chinese or bilingual
3. `references/background-modes.md`
4. `references/presentation-layout-rules.md`
5. `references/html-review-checklist.md`
6. `references/layout-prototypes.md`
7. `references/safe-zone.md`
8. `styles/style_[a-j].md` for the chosen style before writing HTML

## PPT Export

Set environment variables before export if you want custom deck metadata:

```bash
export PPT_AUTHOR="Claude Code"
export PPT_COMPANY="Anthropic"
```

Then run:

```bash
node ./scripts/render_slides.mjs --input ./outputs/html --output ./outputs/rendered
node ./scripts/export_ppt.mjs --input ./outputs/rendered --output ./outputs/ppt/deck.pptx
```
