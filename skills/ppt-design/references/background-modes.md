# Background Modes

Use this file after style selection and before writing HTML.

## Modes

### `paper`

- Default mode.
- Keep the style's intended warm stock, grain, print texture, fold marks, and paper simulation.
- Use when the user asks for print feel, editorial warmth, tactile visuals, or does not specify a background preference.

### `white`

- Use a clean white canvas: `#ffffff`.
- Remove paper-specific grain, stock simulation, and fold marks.
- Keep all non-paper style signals such as layout, type, ornaments, halftones, borders, and color accents.
- Use when the user asks for cleaner presentation visuals, lighter meeting decks, or easier insertion into standard PPT workflows.

## Compatibility

| Style | `white` |
|---|---|
| A | Supported |
| B | Supported |
| C | Supported |
| D | Supported |
| E | Supported |
| F | Not supported |
| G | Supported |
| H | Not supported |
| I | Not supported |
| J | Supported |

## Implementation Rules

- For supported light styles, treat `paper` as the original style and `white` as a background override.
- For `white`, update the canvas color and disable paper grain or fold overlays.
- Do not rewrite the entire style around white. Preserve the same layout language and content hierarchy.
- For styles `F`, `H`, and `I`, reject `white` explicitly and recommend staying on `paper` or switching styles.
