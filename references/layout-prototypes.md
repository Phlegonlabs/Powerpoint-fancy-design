# Layout Prototypes

## Content Role Classification

Classify each slide before writing HTML. Pick a layout prototype based on the slide's content role, not on habit.

| Role | Description | Typical Content |
|------|-------------|-----------------|
| cover | Opening or title slide | Main title, subtitle, summary, metadata |
| chronology | Timeline or sequence | Dated events, milestones |
| comparison | Side-by-side structure | Two or more columns, pros and cons, grouped contrasts |
| metric | Key-number emphasis | Big number plus supporting context |
| thesis | Core argument slide | Thesis statement plus commentary |
| synthesis | Multiple ideas combined | Cards, tags, mixed blocks |
| closing | Conclusion or takeaway | Pillars, final reflections |

Instruction: identify the content role for every slide first, then select a layout from the recommendation matrix.

## Layout Prototype Library

### 1. `hero-cover`

```css
.layout-root.hero-cover {
  display: grid;
  grid-template-columns: 1.08fr .92fr;
  gap: 28px;
  align-content: stretch;
}
```

Left column: eyebrow, headline, subtitle, body copy.
Right column: stacked info panels.
Use for: `cover` slides — **fallback only**. Prefer a style-specific cover prototype (see table below).

---

## Style-Specific Cover Prototypes

Each style maps to its own cover prototype with a distinct DOM skeleton. The script pipeline reads `style.coverPrototype` directly; the AI agent should select the matching prototype from this table.
The executable mapping lives in the shared slide engine manifest, while this document is the human-readable reference.

| Style | Cover Prototype | Grid / Structure |
|-------|----------------|-----------------|
| A (editorial) | `cover-swiss-rail` | 3-row: header bar / main headline / 3-col note rail |
| B (minimal) | `cover-zen-void` | 3-row flex: spacer / content anchored center-low / bottom rule + body |
| C (poster) | `cover-riso-poster` | 2-col (0.65fr / 0.35fr): headline left / year + note stack right |
| D (geometry) | `cover-bauhaus-frame` | 2×2 grid: meta+year / geo-block / headline / notes |
| E (organic) | `cover-organic-cluster` | Flex column: title block / bubble note cards (organic border-radius) |
| F (luxury) | `cover-deco-axis` | Single centered column: rule / headline / notes (symmetric) / rule |
| G (brutal) | `cover-brutal-stack` | Vertical stack: headline (104px) / 3 sticker cards / subhead |
| H (future) | `cover-horizon-signal` | 2-row split: sky (headline) / 4-col signal grid below horizon |
| I (dark-editorial) | `cover-editorial-ledger` | 3-equal-col grid: year+headline / subhead+body / note stack |
| J (playful) | `cover-memphis-splash` | 2-col grid top / full-width badge row bottom |

**Cover whitespace rule**: the last direct live child of `.layout-root` must have its `bottom` >= 60% of `.main-frame` height. Covers that leave the lower 40% completely empty are considered a layout failure.

---

### 2. `editorial-thesis`

```css
.layout-root.editorial-thesis {
  display: grid;
  grid-template-columns: 1.08fr .92fr;
  gap: 28px;
}
```

Left column: eyebrow, headline, lead copy, thesis statement.
Right column: accent figure plus commentary panels.
Bottom area: footer copy.
Use for: `thesis` slides with a strong central claim and support.

### 3. `metric-commentary`

```css
.layout-root.metric-commentary {
  display: grid;
  grid-template-columns: 1.08fr .92fr;
  gap: 28px;
  align-items: stretch;
}
```

One side: eyebrow, headline, lead copy, bullet list.
Other side: metric card with a large number, label, and note.
Use for: `metric` slides where one number must dominate.

### 4. `comparison-bands`

```css
.layout-root.comparison-bands {
  display: grid;
  gap: 20px;
  align-content: start;
}
.band-stack {
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;
}
```

Top: header section with eyebrow, headline, lead copy.
Middle: vertically stacked band cards with heading plus bullet list.
Bottom: footer.
Use for: `comparison` slides with two or more labeled groups.

### 5. `card-constellation`

```css
.layout-root.card-constellation {
  display: grid;
  gap: 20px;
  align-content: start;
}
.mosaic-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(82px, auto);
  gap: 14px;
}
/* Card span variation: span-1=5col, span-2=3col, span-3=4col, span-4=6col */
```

Top: header section.
Middle: mosaic grid of cards with tag, title, and text. Let cards vary in column span.
Bottom: footer.
Use for: `synthesis` slides with 3 to 4 independent ideas.

### 6. `offset-timeline`

Full-width header on top.
Below: four equal-width milestone cards.
Offsets: `offset-2` and `offset-4` shift down `96px`; `offset-3` shifts down `44px`.
Bottom: footer.
Use for: `chronology` slides with 3 to 4 dated events.

### 7. `story-rail`

Two columns at roughly `40:60`.
Left rail: a large figure, label, and note as the visual anchor.
Right column: headline, lead copy, and a `2 x 2` card grid.
Bottom: footer.
Use for: `chronology` or `metric` slides with one dominant number plus several explanations.

### 8. `process-ribbon`

Full-width header on top.
Below: three equal-width step cards.
Each step card includes a tag, title, text, and an accent rule near the top.
Bottom: footer.
Use for: `comparison` slides with 3 to 4 ordered steps.

### 9. `evidence-quote`

Two columns at roughly `55:45`.
Left column: eyebrow, headline, oversized quote or figure, lead copy.
Right column: stacked evidence panels.
Use for: `metric` or `thesis` slides where one quote or figure leads and evidence supports it.

### 10. `chronology-matrix`

Full-width header on top.
Below: four equal-width cells in a dense chronology grid.
Each cell contains date, title, and text.
Bottom: footer.
Use for: `chronology` slides with 4 or more dated entries.

### 11. `manifesto-wall`

Full-width header on top.
Below: three equal-width pillar cards.
Each pillar contains a title and text.
Bottom: footer.
Use for: `closing` slides with 3 major takeaways.

### 12. `ledger-columns`

Full-width header on top.
Below: three equal-width ledger cards.
Each card contains a label and descriptive text.
Bottom: footer.
Use for: `thesis` or `comparison` slides with structured labeled statements.

## Style To Layout Recommendation Matrix

| Style | Family | Cover | Chronology | Comparison | Metric | Thesis | Synthesis | Closing |
|-------|--------|-------|------------|------------|--------|--------|-----------|---------|
| A | editorial | cover-swiss-rail | offset-timeline | comparison-bands | metric-commentary | editorial-thesis | card-constellation | manifesto-wall |
| B | minimal | cover-zen-void | story-rail | ledger-columns | editorial-thesis | editorial-thesis | story-rail | ledger-columns |
| C | poster | cover-riso-poster | offset-timeline | comparison-bands | evidence-quote | editorial-thesis | card-constellation | manifesto-wall |
| D | geometry | cover-bauhaus-frame | offset-timeline | comparison-bands | metric-commentary | ledger-columns | card-constellation | ledger-columns |
| E | organic | cover-organic-cluster | story-rail | comparison-bands | metric-commentary | editorial-thesis | card-constellation | manifesto-wall |
| F | luxury | cover-deco-axis | offset-timeline | comparison-bands | metric-commentary | editorial-thesis | ledger-columns | manifesto-wall |
| G | brutal | cover-brutal-stack | story-rail | comparison-bands | metric-commentary | editorial-thesis | card-constellation | manifesto-wall |
| H | future | cover-horizon-signal | offset-timeline | comparison-bands | metric-commentary | editorial-thesis | card-constellation | manifesto-wall |
| I | dark-editorial | cover-editorial-ledger | offset-timeline | comparison-bands | metric-commentary | editorial-thesis | ledger-columns | manifesto-wall |
| J | playful | cover-memphis-splash | offset-timeline | comparison-bands | metric-commentary | editorial-thesis | card-constellation | manifesto-wall |

## Diversity Rules

- Do not use the same layout prototype on consecutive slides.
- If the recommended layout was used on the previous slide, switch to another candidate that still fits the current role.
- A 10-slide deck should use at least 5 distinct layout prototypes.
- When content is ambiguous between two roles, prefer the layout family that has not been used recently.

## Usage Steps

1. Identify the content role for each slide.
2. Look up the recommended prototype using the chosen style and role.
3. If that prototype matches the previous slide, choose another valid prototype for the same role.
4. Generate HTML according to the prototype's spatial arrangement.
5. Track used prototypes across the whole deck to preserve variety.
