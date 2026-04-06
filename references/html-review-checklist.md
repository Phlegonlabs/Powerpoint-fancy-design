# HTML Review Checklist

Use this file after generating HTML and before delivering any slide.

## Mandatory Second Pass

Review every slide as if it will be projected in a room.
If rendering tools are available, inspect the rendered result rather than trusting source code alone.

## Checklist

- No headline, label, body text, number, or caption overlaps another element.
- No text is clipped by the slide edge, masked by decoration, or trapped inside a panel that is too small.
- Text sizes still work for presentation, especially on body copy and labels.
- Line breaks feel intentional; no awkward orphaned words or compressed Chinese lines.
- Decorative shapes support the composition instead of fighting with the content.
- Tables or dense comparisons have been redesigned for slide readability when possible.
- Cards and panels have enough padding.
- Alignment and spacing feel deliberate, not accidental.
- The slide still matches the selected style after readability fixes.
- All primary content (headlines, body, cards, panels, metrics) is inside `.main-frame` (`top: 108px` to `bottom: 804px`).
- No text content appears in the top chrome zone (`0-96px`) except style label and meta label on cover or closing slides.
- No text content appears in the bottom chrome zone (`804-900px`) except layout name and page number on cover or closing slides.
- Content does not overflow `.main-frame`. If it does, split the slide or rebuild the hierarchy instead of expanding the frame.

## Failure Handling

If any item fails:

1. Revise the HTML.
2. Re-check the slide.
3. Only deliver once the revised version passes.
