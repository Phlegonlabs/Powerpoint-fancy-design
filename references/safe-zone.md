# Safe Zone

## Safe Zone Geometry

Slide canvas: `1600 x 900 px`

```text
┌──────────────────────────────────────┐ y=0
│  Top Reserved Zone (0 – 96px)        │
│  Chrome only on cover or closing     │
├──────────────────────────────────────┤ y=108 (content starts)
│                                      │
│          Main Content Area           │
│          (108px – 804px)             │
│          Height: 696px               │
│                                      │
├──────────────────────────────────────┤ y=804 (content ends)
│  Bottom Reserved Zone (804 – 900px)  │
│  Chrome only on cover or closing     │
└──────────────────────────────────────┘ y=900
```

Left and right edges are controlled by `--edge`, usually between `92px` and `108px` depending on style.

## Chrome Display Strategy

- Cover and closing slides may show chrome labels.
  - `.chrome-top`: style label on the left and meta label on the right, positioned at `top: 28px`
  - `.chrome-bottom`: layout name on the left and page number on the right, positioned at `bottom: 24px`
- Middle slides keep the same safe-zone boundaries even when no chrome text is shown.
  - The main content area always remains `108px` to `804px`.
  - `.chrome-top` and `.chrome-bottom` may be omitted or left empty on non-bookend slides.

## Chrome Modes

- `bookend`: show chrome labels on cover and closing slides only. This is the default.
- `all`: show chrome labels on every slide.
- `none`: show no chrome labels on any slide.

In this repo's demo builders, `bookend` is the implemented default in the shared slide engine.

Regardless of mode, the safe-zone geometry does not change.

## CSS Reference

```css
/* Chrome labels — include on cover and closing slides only when chrome=bookend */
.chrome-top {
  position: absolute;
  left: var(--edge, 96px);
  right: var(--edge, 96px);
  top: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted, #999);
  z-index: 2;
}
.chrome-bottom {
  position: absolute;
  left: var(--edge, 96px);
  right: var(--edge, 96px);
  bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted, #999);
  z-index: 2;
}

/* Main content frame — ALWAYS present on every slide */
.main-frame {
  position: absolute;
  left: var(--edge, 96px);
  right: var(--edge, 96px);
  top: 108px;
  bottom: 96px;
  z-index: 3;
}
```

## Self-Check Rules

- All primary content must live inside `.main-frame`.
- Outside `.main-frame`, only decorative elements and allowed chrome labels may appear.
- If content overflows `.main-frame`, do not enlarge the frame.
  - Reduce content.
  - Split the slide.
  - Rebuild hierarchy.
- Decorative elements may extend into reserved zones, but they must not carry readable body text.
