import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright";

async function validateSlide(page, htmlPath) {
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "load" });
  await page.evaluate(async () => {
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }
  });

  return page.evaluate(() => {
    const mainFrame = document.querySelector(".main-frame");
    if (!mainFrame) return ["Missing .main-frame"];

    const frameRect = mainFrame.getBoundingClientRect();
    const issues = [];

    if (mainFrame.scrollHeight > mainFrame.clientHeight + 2) {
      issues.push(`Main frame scrollHeight overflow: ${mainFrame.scrollHeight} > ${mainFrame.clientHeight}`);
    }
    if (mainFrame.scrollWidth > mainFrame.clientWidth + 2) {
      issues.push(`Main frame scrollWidth overflow: ${mainFrame.scrollWidth} > ${mainFrame.clientWidth}`);
    }

    const blocks = [...document.querySelectorAll("[data-main-item]")];
    for (const block of blocks) {
      const rect = block.getBoundingClientRect();
      const label =
        block.querySelector("h3, .headline, .panel-label, .eyebrow")?.textContent?.trim()
        || block.className
        || block.tagName;

      if (rect.top < frameRect.top - 1) issues.push(`${label} exceeds top safe boundary`);
      if (rect.bottom > frameRect.bottom + 1) issues.push(`${label} exceeds bottom safe boundary`);
      if (rect.left < frameRect.left - 1) issues.push(`${label} exceeds left safe boundary`);
      if (rect.right > frameRect.right + 1) issues.push(`${label} exceeds right safe boundary`);
    }

    return issues;
  });
}

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
      const issues = await validateSlide(page, path.join(htmlDir, file));
      if (issues.length > 0) {
        throw new Error(`${file} failed safe-zone validation:\n- ${issues.join("\n- ")}`);
      }
    }

    await context.close();
  } finally {
    await browser.close();
  }
}
