import fs from "node:fs/promises";
import path from "node:path";
import { parseArgs } from "node:util";
import { chromium } from "playwright";
import { inspectSlide, listHtmlSlides, listStyleDirs } from "./slide_engine/audit.mjs";

const defaultRoot = path.join("outputs", "twitter-style-cases");

const { values } = parseArgs({
  options: {
    root: { type: "string", default: defaultRoot },
    output: { type: "string" },
  },
});

async function main() {
  const rootDir = path.resolve(values.root);
  const outputPath = path.resolve(values.output || path.join(rootDir, "audit", "twitter-style-audit.md"));
  const styleDirs = await listStyleDirs(rootDir);
  const reportLines = ["# Slide Style Audit", ""];
  const failures = [];
  const coverPrototypes = [];

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
        if (result.metrics.coverPrototypeId) {
          reportLines.push(`  - cover prototype: ${result.metrics.coverPrototypeId}`);
          if (result.metrics.coverBottomGapPx != null) {
            reportLines.push(`  - cover bottom gap: ${result.metrics.coverBottomGapPx}px`);
          }
          coverPrototypes.push({ style: path.basename(styleDir), proto: result.metrics.coverPrototypeId });
        }
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

  if (coverPrototypes.length > 0) {
    reportLines.push("## Cover Prototype Diversity", "");
    for (const { style, proto } of coverPrototypes) {
      reportLines.push(`- ${style}: \`${proto}\``);
    }
    const uniqueProtos = new Set(coverPrototypes.map((c) => c.proto));
    const uniqueCount = uniqueProtos.size;
    const requiredUniqueCount = Math.min(8, coverPrototypes.length);
    const diversityPass = uniqueCount >= requiredUniqueCount;
    reportLines.push("", `**Unique cover prototypes: ${uniqueCount} / ${coverPrototypes.length}** — ${diversityPass ? "PASS" : `FAIL (< ${requiredUniqueCount} unique required)`}`);
    reportLines.push("");
    if (!diversityPass) {
      failures.push({ style: "summary", slide: "cover-diversity", issues: [`Only ${uniqueCount} unique cover prototypes (need >= ${requiredUniqueCount})`] });
    }
  }

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, `${reportLines.join("\n")}\n`, "utf8");

  if (failures.length > 0) {
    console.log(`Audit completed with ${failures.length} failing slide(s).`);
    process.exitCode = 1;
    return;
  }

  console.log(`Audit completed with no slide failures -> ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
