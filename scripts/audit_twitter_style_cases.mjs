import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { parseArgs } from "node:util";
import { chromium } from "playwright";

const defaultRoot = path.join(
  process.env.USERPROFILE || path.join("C:", "Users", "mps19"),
  "Desktop",
  "Twitter-发展史-10套Style案例",
);

const { values } = parseArgs({
  options: {
    root: { type: "string", default: defaultRoot },
    output: { type: "string", default: path.join(defaultRoot, "audit", "twitter-style-audit.md") },
  },
});

function classifyMinimum(node) {
  const text = (node.textContent || "").trim();
  if (!text) return null;
  const classes = node.className || "";
  const tag = node.tagName?.toLowerCase() || "";

  if (classes.includes("headline") || tag === "h1") return 44;
  if (tag === "h3" || classes.includes("metric-label")) return 22;
  if (classes.includes("footer-copy")) return 16;
  if (
    classes.includes("body-copy")
    || classes.includes("lead-copy")
    || classes.includes("thesis-statement")
    || classes.includes("metric-note")
    || classes.includes("rail-note")
    || tag === "p"
    || tag === "li"
  ) return 18;
  if (
    classes.includes("eyebrow")
    || classes.includes("panel-label")
    || classes.includes("figure-overline")
    || classes.includes("rail-label")
  ) return 12;
  return null;
}

async function listStyleDirs(rootDir) {
  const entries = await fs.readdir(rootDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory() && entry.name.startsWith("style-"))
    .map((entry) => path.join(rootDir, entry.name))
    .sort((a, b) => a.localeCompare(b));
}

async function listHtmlSlides(styleDir) {
  const htmlDir = path.join(styleDir, "html");
  const entries = await fs.readdir(htmlDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
    .map((entry) => path.join(htmlDir, entry.name))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

async function inspectSlide(page, htmlPath) {
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "load" });
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });

  return page.evaluate(({ classifyMinimumSource }) => {
    const classifyMinimumFn = eval(`(${classifyMinimumSource})`);
    const mainFrame = document.querySelector(".main-frame");
    if (!mainFrame) return { issues: ["Missing .main-frame"], metrics: {} };

    const frameRect = mainFrame.getBoundingClientRect();
    const issues = [];
    const blocks = [...document.querySelectorAll("[data-main-item]")];
    const getLabel = (node) =>
      node.querySelector("h1,h3,.headline,.panel-label,.eyebrow")?.textContent?.trim()
      || node.className
      || node.tagName;

    if (mainFrame.scrollHeight > mainFrame.clientHeight + 2) {
      issues.push(`Frame overflow height ${mainFrame.scrollHeight} > ${mainFrame.clientHeight}`);
    }
    if (mainFrame.scrollWidth > mainFrame.clientWidth + 2) {
      issues.push(`Frame overflow width ${mainFrame.scrollWidth} > ${mainFrame.clientWidth}`);
    }

    const rects = blocks.map((node) => ({ node, rect: node.getBoundingClientRect(), label: getLabel(node) }));
    for (const { rect, label } of rects) {
      if (rect.top < frameRect.top - 1) issues.push(`${label} exceeds top safe boundary`);
      if (rect.bottom > frameRect.bottom + 1) issues.push(`${label} exceeds bottom safe boundary`);
      if (rect.left < frameRect.left - 1) issues.push(`${label} exceeds left safe boundary`);
      if (rect.right > frameRect.right + 1) issues.push(`${label} exceeds right safe boundary`);
    }

    for (let i = 0; i < rects.length; i += 1) {
      for (let j = i + 1; j < rects.length; j += 1) {
        const a = rects[i];
        const b = rects[j];
        if (a.node.contains(b.node) || b.node.contains(a.node)) continue;
        const overlapX = Math.min(a.rect.right, b.rect.right) - Math.max(a.rect.left, b.rect.left);
        const overlapY = Math.min(a.rect.bottom, b.rect.bottom) - Math.max(a.rect.top, b.rect.top);
        if (overlapX > 8 && overlapY > 8) {
          const area = overlapX * overlapY;
          if (area > 220) {
            issues.push(`Overlap between "${a.label}" and "${b.label}" (${Math.round(area)} px^2)`);
          }
        }
      }
    }

    const textNodes = [...mainFrame.querySelectorAll("h1,h3,p,li,.panel-label,.eyebrow,.figure-overline,.rail-label,.metric-label,.metric-note,.rail-note,.footer-copy,.thesis-statement")];
    let minFont = Number.POSITIVE_INFINITY;
    for (const node of textNodes) {
      const minimum = classifyMinimumFn(node);
      if (minimum == null) continue;
      const text = (node.textContent || "").trim();
      if (!text) continue;
      const fontSize = Number.parseFloat(window.getComputedStyle(node).fontSize);
      minFont = Math.min(minFont, fontSize);
      if (fontSize + 0.1 < minimum) {
        issues.push(`Small text "${text.slice(0, 42)}" at ${fontSize}px (< ${minimum}px)`);
      }
    }

    return {
      issues,
      metrics: {
        mainWidth: Math.round(frameRect.width),
        mainHeight: Math.round(frameRect.height),
        blocks: rects.length,
        minFont: Number.isFinite(minFont) ? minFont : null,
      },
    };
  }, { classifyMinimumSource: classifyMinimum.toString() });
}

async function main() {
  const rootDir = path.resolve(values.root);
  const outputPath = path.resolve(values.output);
  const styleDirs = await listStyleDirs(rootDir);
  const reportLines = ["# Twitter Style Audit", ""];
  const failures = [];

  const browser = await chromium.launch();
  try {
    const context = await browser.newContext({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1 });
    const page = await context.newPage();

    for (const styleDir of styleDirs) {
      const slidePaths = await listHtmlSlides(styleDir);
      reportLines.push(`## ${path.basename(styleDir)}`, "");

      for (const slidePath of slidePaths) {
        const result = await inspectSlide(page, slidePath);
        const slideName = path.basename(slidePath);
        const issueCount = result.issues.length;
        reportLines.push(`- ${slideName}: ${issueCount === 0 ? "pass" : `fail (${issueCount} issues)`}`);
        if (issueCount > 0) {
          failures.push({ style: path.basename(styleDir), slide: slideName, issues: result.issues });
          for (const issue of result.issues) {
            reportLines.push(`  - ${issue}`);
          }
        }
      }

      reportLines.push("");
    }

    await context.close();
  } finally {
    await browser.close();
  }

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, `${reportLines.join("\n")}\n`, "utf8");

  if (failures.length > 0) {
    console.log(`Audit completed with ${failures.length} failing slide(s).`);
    process.exitCode = 1;
    return;
  }

  console.log(`Audit completed with no geometric or font-size failures -> ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
