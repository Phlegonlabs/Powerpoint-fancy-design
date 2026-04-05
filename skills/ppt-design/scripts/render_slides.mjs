import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright";
import { parseArgs } from "node:util";

const { values } = parseArgs({
  options: {
    input: { type: "string", default: "outputs/html" },
    output: { type: "string", default: "outputs/rendered" },
  },
});

const root = process.cwd();
const inputDir = path.resolve(root, values.input);
const outputDir = path.resolve(root, values.output);

async function listHtmlSlides(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".html"))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

async function ensureSlideExists(page, fileName) {
  await page.waitForFunction(() => document.readyState === "complete");
  await page.evaluate(async () => {
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }
  });

  const slide = page.locator(".slide");
  const count = await slide.count();
  if (count === 0) {
    throw new Error(`Missing .slide element in ${fileName}`);
  }

  await slide.first().waitFor({ state: "visible" });
  return slide.first();
}

async function main() {
  await fs.mkdir(outputDir, { recursive: true });
  const slides = await listHtmlSlides(inputDir);

  if (slides.length === 0) {
    throw new Error(`No HTML slides found in ${inputDir}`);
  }

  const browser = await chromium.launch();

  try {
    const context = await browser.newContext({
      viewport: { width: 1600, height: 900 },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();

    for (const slideName of slides) {
      const sourcePath = path.join(inputDir, slideName);
      const outputPath = path.join(
        outputDir,
        `${path.parse(slideName).name}.png`,
      );

      await page.goto(pathToFileURL(sourcePath).href, {
        waitUntil: "load",
      });

      const slide = await ensureSlideExists(page, slideName);
      await slide.screenshot({
        path: outputPath,
        type: "png",
      });

      console.log(`Rendered ${slideName} -> ${path.relative(root, outputPath)}`);
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
