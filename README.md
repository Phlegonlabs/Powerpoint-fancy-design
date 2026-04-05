# PPT Design

`ppt-design` is a reusable Codex skill for designing presentation slides as polished `1600x900` HTML pages, then exporting them to a high-fidelity image-based PPTX when needed.

It is built for presentation work rather than document layout:

- choose a style before generating slides
- explain what each style looks like and what content it fits in English by default
- support `background_mode=paper|white` for compatible light styles
- review every HTML slide after generation for overlap, clipping, and presentation readability
- export finished HTML slides to PNG and then to PPTX

## What It Does

- Generates one HTML file per slide: `slide_01.html`, `slide_02.html`, and so on
- Keeps every slide at a fixed `1600x900` canvas
- Supports 10 visual styles from editorial Swiss layouts to Memphis pop
- Uses a mandatory second-pass review for presentation safety
- Exports to PowerPoint with strong visual fidelity

## Repository Structure

```text
ppt-design/
|- SKILL.md
|- README.md
|- agents/openai.yaml
|- references/
|  |- style-selector.md
|  |- background-modes.md
|  |- presentation-layout-rules.md
|  `- html-review-checklist.md
|- scripts/
|  |- render_slides.mjs
|  `- export_ppt.mjs
|- styles/
|  |- style_a.md
|  |- ...
|  `- style_j.md
`- outputs/
   |- html/
   |- rendered/
   `- ppt/
```

## Install And Use

### Use As A Local Skill

Keep the project in your workspace and point Codex to this skill folder directly.

Core entry file:

- [`SKILL.md`](./SKILL.md)

Skill metadata:

- [`agents/openai.yaml`](./agents/openai.yaml)

### Install Dependencies

```powershell
npm install
npx playwright install chromium
```

### Export HTML Slides To PPT

Render HTML to PNG:

```powershell
node .\scripts\render_slides.mjs --input .\outputs\html --output .\outputs\rendered
```

Build the PPTX:

```powershell
node .\scripts\export_ppt.mjs --input .\outputs\rendered --output .\outputs\ppt\deck.pptx
```

Or run both:

```powershell
npm run build:ppt
```

## Workflow

1. Identify the topic, audience, and delivery format.
2. Recommend 2-3 styles if the user has not chosen one.
3. Explain each style in English by default.
4. Confirm `background_mode`:
   - `paper` is the default
   - `white` is supported only by light styles
5. Generate one HTML file per slide.
6. Review every slide after generation:
   - no text collision
   - no clipping
   - readable type for presentation
   - better layout for tables and text-heavy slides
7. Export to PPTX only if needed.

## Background Modes

| Mode | Meaning |
|---|---|
| `paper` | Keeps paper grain, warm stock, print texture, and editorial surface feel |
| `white` | Uses a clean white slide canvas and removes paper-specific texture |

`white` is supported by styles `A`, `B`, `C`, `D`, `E`, `G`, and `J`.

`white` is **not** supported by styles `F`, `H`, and `I`, because those styles depend on dark-native contrast systems.

## Language Behavior

- Style recommendations and style descriptions should default to English.
- Generated slide copy should stay in the user's source language unless translation is explicitly requested.

## Style Overview Graphic

![PPT Design Style Overview](./assets/style-overview.svg)

## Style Sample Gallery

![PPT Design Style Sample Gallery](./assets/style-samples.svg)

## Style Gallery

The skill uses these style families. Full rules live in [`references/style-selector.md`](./references/style-selector.md) and the detailed style specs in [`styles/`](./styles/).

| Style | Name | Visual Feel | Best For | `white` |
|---|---|---|---|---|
| A | Swiss International | rational, editorial, grid-first | business reports, finance, policy, newsroom summaries | Yes |
| B | East Asian Minimalism | quiet, spacious, reflective | brand values, exhibitions, culture, philosophy | Yes |
| C | Risograph Print | rough, layered, indie print energy | creative proposals, indie brands, event promos | Yes |
| D | Bauhaus Geometry | bold, poster-like, structural | architecture, design talks, product frameworks | Yes |
| E | Organic Handcrafted | tactile, warm, human, painterly | wellness, food, culture, lifestyle storytelling | Yes |
| F | Art Deco Luxury | dark, premium, symmetrical, ceremonial | luxury, hospitality, awards, prestige finance | No |
| G | Neo Brutalism | loud, high-contrast, startup-forward | product launches, Web3, bold decks, opinionated messaging | Yes |
| H | Retro Futurism | dark sci-fi, CRT glow, horizon drama | gaming, tech launches, space, electronic music | No |
| I | Dark Editorial | serious, premium, magazine-like | investigations, documentaries, deep research | No |
| J | Memphis Pop | playful, bright, anti-grid, energetic | education, entertainment, social campaigns, festivals | Yes |

## Style Templates

These are GitHub-facing prompt templates. Each template is designed for one style and can be copied directly, then filled with your own topic, audience, and slide requirements.

### A. Swiss International

Reference template:

```text
Create a [SLIDE_COUNT]-slide presentation in the Swiss International style.
Topic: [TOPIC]
Audience: [AUDIENCE]
Goal: [GOAL]
Tone: editorial, rational, data-driven
Must include: [KEY_FACTS_OR_SECTIONS]
Background mode: [paper or white]
Content language: [LANGUAGE]
Keep the layout asymmetrical, grid-first, and presentation-readable.
```

Example:

```text
Use the Swiss International style to create a 5-slide presentation about EV market growth in Southeast Asia.
Keep it editorial and data-driven.
Use background_mode=paper.
```

Good fit:

- market analysis
- policy summary
- board updates

### B. East Asian Minimalism

Reference template:

```text
Create a [SLIDE_COUNT]-slide presentation in the East Asian Minimalism style.
Topic: [TOPIC]
Audience: [AUDIENCE]
Goal: [GOAL]
Tone: quiet, spacious, reflective
Must include: [KEY_MESSAGES]
Background mode: [paper or white]
Content language: [LANGUAGE]
Keep one main visual focus per slide and preserve large negative space.
```

Example:

```text
Create a 3-slide brand philosophy deck for a tea brand.
Use the East Asian Minimalism style with quiet typography and large negative space.
Use background_mode=white.
```

Good fit:

- brand values
- museum or exhibition decks
- reflective storytelling

### C. Risograph Print

Reference template:

```text
Create a [SLIDE_COUNT]-slide presentation in the Risograph Print style.
Topic: [TOPIC]
Audience: [AUDIENCE]
Goal: [GOAL]
Tone: energetic, handmade, indie print
Must include: [KEY_SECTIONS]
Background mode: [paper or white]
Content language: [LANGUAGE]
Use two-ink visual logic, registration shift, and bold print-like composition.
```

Example:

```text
Design a 4-slide creative pitch for an indie music festival.
Use the Risograph Print style and keep the layout energetic and layered.
Use background_mode=paper.
```

Good fit:

- event launches
- youth campaigns
- indie creative proposals

### D. Bauhaus Geometry

Reference template:

```text
Create a [SLIDE_COUNT]-slide presentation in the Bauhaus Geometry style.
Topic: [TOPIC]
Audience: [AUDIENCE]
Goal: [GOAL]
Tone: structural, modernist, poster-like
Must include: [KEY_SECTIONS]
Background mode: [paper or white]
Content language: [LANGUAGE]
Use diagonal composition, bold geometry, and strong title hierarchy.
```

Example:

```text
Create a 6-slide product strategy deck about modular construction systems.
Use Bauhaus Geometry with strong blocks and clean structure.
Use background_mode=white.
```

Good fit:

- frameworks
- architecture
- product systems

### E. Organic Handcrafted

Reference template:

```text
Create a [SLIDE_COUNT]-slide presentation in the Organic Handcrafted style.
Topic: [TOPIC]
Audience: [AUDIENCE]
Goal: [GOAL]
Tone: warm, tactile, human-centered
Must include: [KEY_STORY_POINTS]
Background mode: [paper or white]
Content language: [LANGUAGE]
Use soft organic forms, visible texture, and generous breathing room.
```

Example:

```text
Design a 4-slide presentation for a wellness retreat brand story.
Use the Organic Handcrafted style with warm shapes and tactile texture.
Use background_mode=paper.
```

Good fit:

- wellness
- food and beverage
- human-centered narratives

### F. Art Deco Luxury

Reference template:

```text
Create a [SLIDE_COUNT]-slide presentation in the Art Deco Luxury style.
Topic: [TOPIC]
Audience: [AUDIENCE]
Goal: [GOAL]
Tone: premium, ceremonial, symmetrical
Must include: [KEY_SECTIONS]
Background mode: paper
Content language: [LANGUAGE]
Keep the layout dark, centered, elegant, and linework-driven.
```

Example:

```text
Create a premium awards-night presentation for a hotel group.
Use Art Deco Luxury with dark symmetry and gold linework.
Keep the original dark background.
```

Good fit:

- luxury brand decks
- hospitality launches
- ceremonial event presentations

### G. Neo Brutalism

Reference template:

```text
Create a [SLIDE_COUNT]-slide presentation in the Neo Brutalism style.
Topic: [TOPIC]
Audience: [AUDIENCE]
Goal: [GOAL]
Tone: bold, raw, high-contrast
Must include: [KEY_MESSAGES]
Background mode: [paper or white]
Content language: [LANGUAGE]
Use thick borders, hard shadows, strong color blocks, and assertive hierarchy.
```

Example:

```text
Design a sharp 5-slide startup launch deck for an AI tool.
Use Neo Brutalism with thick borders, bold hierarchy, and strong contrast.
Use background_mode=white.
```

Good fit:

- startup intros
- product launches
- bold manifesto-style presentations

### H. Retro Futurism

Reference template:

```text
Create a [SLIDE_COUNT]-slide presentation in the Retro Futurism style.
Topic: [TOPIC]
Audience: [AUDIENCE]
Goal: [GOAL]
Tone: cinematic, sci-fi, retro-tech
Must include: [KEY_SECTIONS]
Background mode: paper
Content language: [LANGUAGE]
Use a dark horizon-grid composition, restrained neon linework, and monospaced labels.
```

Example:

```text
Create a game reveal presentation with a retro-futurist visual system.
Use dark CRT texture, horizon glow, and cinematic hierarchy.
Keep the original dark background.
```

Good fit:

- gaming
- sci-fi concepts
- electronic music and future-tech themes

### I. Dark Editorial

Reference template:

```text
Create a [SLIDE_COUNT]-slide presentation in the Dark Editorial style.
Topic: [TOPIC]
Audience: [AUDIENCE]
Goal: [GOAL]
Tone: serious, premium, investigative
Must include: [KEY_ARGUMENTS_OR_FINDINGS]
Background mode: paper
Content language: [LANGUAGE]
Use sharp editorial typography, dark space, and strong headline-body contrast.
```

Example:

```text
Design a 6-slide documentary pitch deck about ocean surveillance.
Use the Dark Editorial style with serious magazine-like pacing.
Keep the original dark background.
```

Good fit:

- research storytelling
- documentary decks
- high-seriousness editorial content

### J. Memphis Pop

Reference template:

```text
Create a [SLIDE_COUNT]-slide presentation in the Memphis Pop style.
Topic: [TOPIC]
Audience: [AUDIENCE]
Goal: [GOAL]
Tone: playful, loud, energetic
Must include: [KEY_SECTIONS]
Background mode: [paper or white]
Content language: [LANGUAGE]
Use bright collision color, scattered geometry, and fun headline rhythm.
```

Example:

```text
Create a colorful school campaign presentation about reading habits.
Use Memphis Pop with bright collisions, bold shapes, and playful rhythm.
Use background_mode=white.
```

Good fit:

- education
- kids content
- social campaigns
- entertainment decks

## Presentation Review Standard

This skill is stricter than a normal HTML generator. After generating each slide, it must do a second-pass review using:

- [`references/presentation-layout-rules.md`](./references/presentation-layout-rules.md)
- [`references/html-review-checklist.md`](./references/html-review-checklist.md)

That review checks:

- no text collision
- no clipping
- readable type at presentation distance
- better hierarchy for heavy text
- better layout for table-like content
- preserved style quality after readability fixes

## Output

- HTML slides: `outputs/html/`
- rendered PNGs: `outputs/rendered/`
- PPTX decks: `outputs/ppt/`

## Current Example Output

Smoke-test files in this repo:

- [`outputs/html/slide_01.html`](./outputs/html/slide_01.html)
- [`outputs/html/slide_02.html`](./outputs/html/slide_02.html)
- [`outputs/ppt/deck.pptx`](./outputs/ppt/deck.pptx)
