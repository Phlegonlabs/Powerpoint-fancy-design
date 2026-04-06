import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

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

function parseExpectedRatio(value) {
  if (value == null || value === "") return null;
  if (value.includes("/")) {
    const [left, right] = value.split("/").map((part) => Number.parseFloat(part));
    if (Number.isFinite(left) && Number.isFinite(right) && right !== 0) {
      return left / right;
    }
  }
  const numeric = Number.parseFloat(value);
  return Number.isFinite(numeric) ? numeric : null;
}

export async function inspectSlide(page, htmlPath) {
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "load" });
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });

  return page.evaluate(({ classifyMinimumSource, parseExpectedRatioSource }) => {
    const classifyMinimumFn = eval(`(${classifyMinimumSource})`);
    const parseExpectedRatioFn = eval(`(${parseExpectedRatioSource})`);
    const mainFrame = document.querySelector(".main-frame");
    if (!mainFrame) return { issues: ["Missing .main-frame"], metrics: {} };

    const frameRect = mainFrame.getBoundingClientRect();
    const issues = [];
    const blocks = [...document.querySelectorAll("[data-main-item]")];
    const geometryGroups = [...document.querySelectorAll("[data-geometry-group]")];
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

    for (const node of geometryGroups) {
      const ratioValue = node.getAttribute("data-geometry-ratio");
      const toleranceValue = node.getAttribute("data-geometry-tolerance");
      const expectedRatio = parseExpectedRatioFn(ratioValue);
      if (!Number.isFinite(expectedRatio) || expectedRatio <= 0) continue;

      const rect = node.getBoundingClientRect();
      if (rect.height <= 0 || rect.width <= 0) {
        issues.push(`Geometry group ${node.getAttribute("data-geometry-group")} has invalid size`);
        continue;
      }

      const actualRatio = rect.width / rect.height;
      const tolerance = Number.parseFloat(toleranceValue || "0.08");
      if (Math.abs(actualRatio - expectedRatio) > tolerance) {
        const label = node.getAttribute("data-geometry-group") || node.className || node.tagName;
        issues.push(
          `Geometry ratio drift on "${label}" (${actualRatio.toFixed(3)} vs ${expectedRatio.toFixed(3)})`,
        );
      }
    }

    const textNodes = [
      ...mainFrame.querySelectorAll(
        "h1,h3,p,li,.panel-label,.eyebrow,.figure-overline,.rail-label,.metric-label,.metric-note,.rail-note,.footer-copy,.thesis-statement,.band-label,.metric-number,.figure-stamp,.quote-figure,.rail-number,.memphis-year,.riso-year",
      ),
    ];
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

    let coverPrototypeId = null;
    let coverBottomGapPx = null;
    const layoutRoot = mainFrame.querySelector(".layout-root");
    if (layoutRoot && layoutRoot.classList.contains("role-cover")) {
      const coverClass = [...layoutRoot.classList].find((c) => c.startsWith("cover-") || c === "hero-cover");
      coverPrototypeId = coverClass || "hero-cover";

      const liveTextNodes = [
        ...layoutRoot.querySelectorAll(
          "h1,h3,p,li,.panel-label,.eyebrow,.figure-overline,.rail-label,.metric-label,.metric-note,.rail-note,.footer-copy,.thesis-statement,.band-label,.metric-number,.figure-stamp,.quote-figure,.rail-number,.memphis-year,.riso-year",
        ),
      ].filter((node) => {
        const rect = node.getBoundingClientRect();
        const text = (node.textContent || "").trim();
        if (!text) return false;
        return rect.width > 2 && rect.height > 2;
      });

      if (liveTextNodes.length > 0) {
        const deepestBottom = Math.max(...liveTextNodes.map((node) => node.getBoundingClientRect().bottom));
        coverBottomGapPx = Math.round(frameRect.bottom - deepestBottom);
        const threshold = frameRect.top + frameRect.height * 0.6;
        if (deepestBottom < threshold) {
          issues.push(
            `Cover bottom gap: deepest live content ends at ${Math.round(deepestBottom - frameRect.top)}px (< ${Math.round(threshold - frameRect.top)}px = 60% of main-frame height ${Math.round(frameRect.height)}px)`,
          );
        }
      }
    }

    return {
      issues,
      metrics: {
        mainWidth: Math.round(frameRect.width),
        mainHeight: Math.round(frameRect.height),
        blocks: rects.length,
        geometryGroups: geometryGroups.length,
        minFont: Number.isFinite(minFont) ? minFont : null,
        coverPrototypeId,
        coverBottomGapPx,
      },
    };
  }, {
    classifyMinimumSource: classifyMinimum.toString(),
    parseExpectedRatioSource: parseExpectedRatio.toString(),
  });
}

export async function listStyleDirs(rootDir) {
  const entries = await fs.readdir(rootDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory() && entry.name.startsWith("style-"))
    .map((entry) => path.join(rootDir, entry.name))
    .sort((a, b) => a.localeCompare(b));
}

export async function listHtmlSlides(styleDir) {
  const htmlDir = path.join(styleDir, "html");
  const entries = await fs.readdir(htmlDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
    .map((entry) => path.join(htmlDir, entry.name))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}
