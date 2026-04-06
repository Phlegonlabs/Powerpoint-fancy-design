import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { parseArgs } from "node:util";
import { chromium } from "playwright";

const defaultRoot = path.join("outputs", "twitter-style-cases");

const { values } = parseArgs({
  options: {
    root: { type: "string", default: defaultRoot },
  },
});

const reviewRoot = path.resolve(values.root);

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

async function listStyleDirs(root) {
  const entries = await fs.readdir(root, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory() && entry.name.startsWith("style-"))
    .map((entry) => path.join(root, entry.name))
    .sort((a, b) => a.localeCompare(b));
}

async function listRenderedSlides(styleDir) {
  const renderedDir = path.join(styleDir, "rendered");
  const entries = await fs.readdir(renderedDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".png"))
    .map((entry) => path.join(renderedDir, entry.name))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

function buildHtml(styleName, slidePaths) {
  const cards = slidePaths
    .map((slidePath, index) => {
      const src = pathToFileURL(slidePath).href;
      const label = `Slide ${String(index + 1).padStart(2, "0")}`;
      return `<article class="card"><div class="label">${label}</div><img src="${src}" alt="${label}"></article>`;
    })
    .join("");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>${escapeHtml(styleName)} review</title>
    <style>
      * { box-sizing: border-box; }
      body {
        margin: 0;
        background: #ece7dc;
        color: #1d1d1d;
        font-family: "Segoe UI", Arial, sans-serif;
      }
      .sheet {
        width: 1600px;
        margin: 0 auto;
        padding: 48px 44px 64px;
      }
      .header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 28px;
      }
      .title {
        font-size: 34px;
        font-weight: 700;
        letter-spacing: 0.02em;
      }
      .meta {
        font-size: 16px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: #8a5a45;
      }
      .grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 24px 24px;
      }
      .card {
        background: rgba(255,255,255,0.7);
        border: 1px solid rgba(29,29,29,0.12);
        border-radius: 18px;
        padding: 14px;
      }
      .label {
        margin-bottom: 10px;
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: #8a5a45;
      }
      img {
        display: block;
        width: 100%;
        border-radius: 10px;
        border: 1px solid rgba(29,29,29,0.08);
      }
    </style>
  </head>
  <body>
    <main class="sheet">
      <header class="header">
        <div class="title">${escapeHtml(styleName)} Review Sheet</div>
        <div class="meta">10-slide audit</div>
      </header>
      <section class="grid">${cards}</section>
    </main>
  </body>
</html>`;
}

async function main() {
  const styleDirs = await listStyleDirs(reviewRoot);
  if (styleDirs.length === 0) {
    throw new Error(`No style directories found in ${reviewRoot}`);
  }

  const browser = await chromium.launch();
  try {
    const context = await browser.newContext({ viewport: { width: 1600, height: 1200 } });
    const page = await context.newPage();

    for (const styleDir of styleDirs) {
      const slides = await listRenderedSlides(styleDir);
      if (slides.length === 0) {
        throw new Error(`No rendered slides in ${styleDir}`);
      }

      const reviewDir = path.join(styleDir, "review");
      await fs.mkdir(reviewDir, { recursive: true });
      const htmlPath = path.join(reviewDir, "review-sheet.html");
      const pngPath = path.join(reviewDir, "review-sheet.png");
      const styleName = path.basename(styleDir);

      await fs.writeFile(htmlPath, buildHtml(styleName, slides), "utf8");
      await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "load" });
      await page.screenshot({ path: pngPath, fullPage: true, type: "png" });

      console.log(`Built ${path.relative(reviewRoot, pngPath)}`);
    }

    await context.close();
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
