import { localeFonts, localizedCopy } from "./data.mjs";

function applyReplacements(value, replacements) {
  return replacements.reduce((result, [from, to]) => result.replaceAll(from, to), value);
}

function localizeStyle(style, localeId) {
  if (localeId === "en") return style;
  const localeVariant = localizedCopy[localeId]?.[style.id];
  if (!localeVariant) return style;
  return {
    ...style,
    name: localeVariant.name,
    css: `${style.css}\n${localeVariant.css}`,
    html: applyReplacements(style.html, localeVariant.replacements),
  };
}

export function renderDocument(style, locale) {
  const localizedStyle = localizeStyle(style, locale.id);
  return `<!doctype html>
<html lang="${locale.id}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=1600, initial-scale=1" />
    <link rel="icon" href="data:," />
    ${localeFonts[locale.id]}
    <title>${localizedStyle.name} ${locale.titleSuffix}</title>
    <style>
      * { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; background: #111; }
      body { min-height: 100vh; }
      .slide {
        position: relative;
        width: 1600px;
        height: 900px;
        overflow: hidden;
        font-synthesis-weight: none;
        font-synthesis-style: none;
      }
      .check { display: block; }
      .slide > .check { position: absolute; }
      ${localizedStyle.css}
    </style>
  </head>
  <body>
    <div class="slide">${localizedStyle.html}</div>
  </body>
</html>`;
}

export async function ensureReady(page, fileName) {
  await page.waitForFunction(() => document.readyState === "complete");
  await page.evaluate(async () => {
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }
  });

  const slide = page.locator(".slide");
  await slide.first().waitFor({ state: "visible" });

  const report = await page.evaluate(() => {
    const slide = document.querySelector(".slide");
    const slideRect = slide.getBoundingClientRect();
    const nodes = [...document.querySelectorAll(".check")].map((node, index) => {
      const rect = node.getBoundingClientRect();
      return {
        id: node.textContent.trim().slice(0, 48) || `node-${index + 1}`,
        left: rect.left - slideRect.left,
        top: rect.top - slideRect.top,
        right: rect.right - slideRect.left,
        bottom: rect.bottom - slideRect.top,
      };
    });

    const bounds = nodes.filter((node) =>
      node.left < 10 || node.top < 10 || node.right > slideRect.width - 10 || node.bottom > slideRect.height - 10
    );

    const overlaps = [];
    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const a = nodes[i];
        const b = nodes[j];
        const horizontal = Math.min(a.right, b.right) - Math.max(a.left, b.left);
        const vertical = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
        if (horizontal > 12 && vertical > 12) overlaps.push(`${a.id} <> ${b.id}`);
      }
    }
    return { bounds, overlaps };
  });

  if (report.bounds.length || report.overlaps.length) {
    const issues = [
      ...report.bounds.map((item) => `out-of-bounds: ${item.id}`),
      ...report.overlaps.map((item) => `overlap: ${item}`),
    ];
    throw new Error(`${fileName} failed layout review: ${issues.join("; ")}`);
  }
  return slide.first();
}
