import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";
import { inspectSlide } from "./audit.mjs";

export async function validateHtmlDir(htmlDir) {
  const browser = await chromium.launch();
  try {
    const context = await browser.newContext({
      viewport: { width: 1600, height: 900 },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    const files = (await fs.readdir(htmlDir))
      .filter((name) => name.endsWith(".html"))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    for (const file of files) {
      const { issues } = await inspectSlide(page, path.join(htmlDir, file));
      if (issues.length > 0) {
        throw new Error(`${file} failed safe-zone validation:\n- ${issues.join("\n- ")}`);
      }
    }

    await context.close();
  } finally {
    await browser.close();
  }
}
