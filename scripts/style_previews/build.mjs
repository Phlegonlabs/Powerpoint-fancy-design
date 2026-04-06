import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";
import { locales, styles } from "./data.mjs";
import { ensureReady, renderDocument } from "./render.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..", "..");
const htmlOutputDir = path.join(rootDir, "outputs", "readme-previews", "html");
const pngOutputDir = path.join(rootDir, "assets");

export async function main() {
  await fs.mkdir(htmlOutputDir, { recursive: true });
  await fs.mkdir(pngOutputDir, { recursive: true });

  const browser = await chromium.launch();
  try {
    const context = await browser.newContext({
      viewport: { width: 1600, height: 900 },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    for (const locale of locales) {
      for (const style of styles) {
        const htmlPath = path.join(htmlOutputDir, `style-preview${locale.suffix}-${style.id}.html`);
        const pngPath = path.join(pngOutputDir, `style-preview${locale.suffix}-${style.id}.png`);

        await fs.writeFile(htmlPath, renderDocument(style, locale), "utf8");
        await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "load" });
        const slide = await ensureReady(page, path.basename(htmlPath));
        await slide.screenshot({ path: pngPath, type: "png" });
        console.log(`Rendered ${path.relative(rootDir, pngPath)}`);
      }
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
