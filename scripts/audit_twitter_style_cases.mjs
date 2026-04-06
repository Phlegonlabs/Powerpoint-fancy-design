import fs from "node:fs/promises";
import path from "node:path";
import { parseArgs } from "node:util";
import { chromium } from "playwright";
import { inspectSlide, listHtmlSlides, listStyleDirs } from "./slide_engine/audit.mjs";
import {
  computeBrandScore,
  computeDataScore,
  computeDeliveryScore,
  computeHierarchyScore,
  computeNarrativeScore,
  computePacingScore,
  computeReadabilityScore,
  computeStyleFitScore,
  evaluateHardFailures,
  qualityTierProfiles,
} from "./slide_engine/presentation_quality.mjs";

const defaultRoot = path.join("outputs", "twitter-style-cases");

const { values } = parseArgs({
  options: {
    root: { type: "string", default: defaultRoot },
    output: { type: "string" },
  },
});

async function readManifest(styleDir) {
  const manifestPath = path.join(styleDir, "deck-manifest.json");
  const raw = await fs.readFile(manifestPath, "utf8");
  return JSON.parse(raw);
}

function buildDeckMetrics(slides) {
  let previousLayout = null;
  let repeatedLayouts = 0;
  const layoutIds = [];

  for (const slide of slides) {
    layoutIds.push(slide.layoutId);
    if (slide.layoutId === previousLayout) repeatedLayouts += 1;
    previousLayout = slide.layoutId;
  }

  return {
    repeatedLayouts,
    uniqueLayouts: new Set(layoutIds).size,
  };
}

function summarizeSlide(slidePlan, inspection, style, deckContext, deckMetrics) {
  const categories = {
    narrative: computeNarrativeScore(slidePlan, inspection, deckContext),
    styleFit: computeStyleFitScore(style, deckContext),
    brand: computeBrandScore(inspection, deckContext),
    hierarchy: computeHierarchyScore(inspection),
    readability: computeReadabilityScore(inspection),
    data: computeDataScore(slidePlan, inspection),
    pacing: computePacingScore(deckMetrics),
    delivery: computeDeliveryScore(deckContext, inspection),
  };
  const total = Object.values(categories).reduce((sum, value) => sum + value, 0);
  const hardFailures = evaluateHardFailures(style, inspection, deckContext);
  return {
    categories,
    total,
    hardFailures,
  };
}

function deckCategoryPass(categories, deckContext) {
  const tier = qualityTierProfiles[deckContext.qualityTier] || qualityTierProfiles["public-stage"];
  const maxima = {
    narrative: 20,
    styleFit: 15,
    brand: 15,
    hierarchy: 15,
    readability: 15,
    data: 10,
    pacing: 5,
    delivery: 5,
  };

  return Object.entries(categories).every(([key, value]) => value >= maxima[key] * tier.minCategoryRatio);
}

async function main() {
  const rootDir = path.resolve(values.root);
  const outputPath = path.resolve(values.output || path.join(rootDir, "audit", "twitter-style-audit.md"));
  const styleDirs = await listStyleDirs(rootDir);
  const reportLines = ["# Public Stage Slide Audit", ""];
  const failures = [];

  const browser = await chromium.launch();
  try {
    const context = await browser.newContext({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1 });
    const page = await context.newPage();

    for (const styleDir of styleDirs) {
      const manifest = await readManifest(styleDir);
      const slidePaths = await listHtmlSlides(styleDir);
      const deckMetrics = buildDeckMetrics(manifest.slides);
      const slideSummaries = [];

      reportLines.push(`## ${path.basename(styleDir)}`, "");
      reportLines.push(`- Scenario: \`${manifest.deckContext.presentationScenario}\``);
      reportLines.push(`- Quality Tier: \`${manifest.deckContext.qualityTier}\``);
      reportLines.push(`- Brand: \`${manifest.deckContext.brandProfile.brandName}\``);
      reportLines.push("");

      for (const slidePath of slidePaths) {
        const inspection = await inspectSlide(page, slidePath);
        const slideName = path.basename(slidePath);
        const slideIndex = Number.parseInt(slideName.match(/\d+/)?.[0] || "0", 10) - 1;
        const slidePlan = manifest.slides[slideIndex];
        const summary = summarizeSlide(slidePlan, inspection, manifest.style, manifest.deckContext, deckMetrics);
        slideSummaries.push(summary);

        reportLines.push(`### ${slideName}`);
        reportLines.push(`- Title: ${slidePlan.title}`);
        reportLines.push(`- Layout: \`${slidePlan.layoutId}\``);
        reportLines.push(`- Score: **${summary.total}/100**`);
        reportLines.push(`- Readability: ${summary.categories.readability}/15`);
        reportLines.push(`- Hierarchy: ${summary.categories.hierarchy}/15`);
        reportLines.push(`- Brand: ${summary.categories.brand}/15`);
        reportLines.push(`- Contrast failures: ${inspection.metrics.contrastFailures}`);
        reportLines.push(`- Critical contrast failures: ${inspection.metrics.criticalContrastFailures}`);
        reportLines.push(`- Focal points: ${inspection.metrics.competingFocalPoints}`);
        if (inspection.issues.length > 0) {
          reportLines.push(`- Base issues: ${inspection.issues.join(" | ")}`);
        }
        if (summary.hardFailures.length > 0) {
          reportLines.push(`- Hard fails: ${summary.hardFailures.join(" | ")}`);
          failures.push({
            style: path.basename(styleDir),
            slide: slideName,
            issues: summary.hardFailures,
          });
        }
        reportLines.push("");
      }

      const categoryTotals = slideSummaries.reduce((accumulator, summary) => {
        for (const [key, value] of Object.entries(summary.categories)) {
          accumulator[key] = (accumulator[key] || 0) + value;
        }
        return accumulator;
      }, {});
      const categoryAverages = Object.fromEntries(
        Object.entries(categoryTotals).map(([key, value]) => [key, Number((value / slideSummaries.length).toFixed(2))]),
      );
      const deckScore = Number(
        (
          slideSummaries.reduce((sum, summary) => sum + summary.total, 0) / slideSummaries.length
        ).toFixed(2),
      );
      const tier = qualityTierProfiles[manifest.deckContext.qualityTier] || qualityTierProfiles["public-stage"];
      const publicReady = (
        deckScore >= tier.minDeckScore
        && deckCategoryPass(categoryAverages, manifest.deckContext)
        && !slideSummaries.some((summary) => summary.hardFailures.length > 0)
      );

      reportLines.push(`### Deck Summary`);
      reportLines.push(`- Average score: **${deckScore}/100**`);
      reportLines.push(`- Unique layouts: ${deckMetrics.uniqueLayouts}`);
      reportLines.push(`- Repeated consecutive layouts: ${deckMetrics.repeatedLayouts}`);
      reportLines.push(`- Narrative avg: ${categoryAverages.narrative}`);
      reportLines.push(`- Style fit avg: ${categoryAverages.styleFit}`);
      reportLines.push(`- Brand avg: ${categoryAverages.brand}`);
      reportLines.push(`- Hierarchy avg: ${categoryAverages.hierarchy}`);
      reportLines.push(`- Readability avg: ${categoryAverages.readability}`);
      reportLines.push(`- Data avg: ${categoryAverages.data}`);
      reportLines.push(`- Delivery avg: ${categoryAverages.delivery}`);
      reportLines.push(`- Public ready: **${publicReady ? "YES" : "NO"}**`);
      reportLines.push("");

      if (!publicReady) {
        failures.push({
          style: path.basename(styleDir),
          slide: "deck-summary",
          issues: [`Deck score ${deckScore} did not satisfy ${manifest.deckContext.qualityTier} gate.`],
        });
      }
    }

    await context.close();
  } finally {
    await browser.close();
  }

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, `${reportLines.join("\n")}\n`, "utf8");

  if (failures.length > 0) {
    console.log(`Audit completed with ${failures.length} failure(s).`);
    process.exitCode = 1;
    return;
  }

  console.log(`Audit completed with no public-stage failures -> ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
