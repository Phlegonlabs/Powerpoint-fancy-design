import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pageSpecs, SAFE_ZONE } from "./page_specs.mjs";
import { buildPagePlan } from "./layout_selection.mjs";
import { styles } from "./styles.mjs";
import { renderHtml } from "./shell.mjs";
import { validateHtmlDir } from "./validation.mjs";
import {
  buildDeckContextFromOptions,
  copyToOutput,
  ensureDir,
  writeDeckArtifacts,
} from "../slide_engine/deck_files.mjs";

const defaultOutputDir = path.join("outputs", "twitter-style-cases");

export async function main(options = {}) {
  const moduleDir = path.dirname(fileURLToPath(import.meta.url));
  const repoRoot = path.resolve(moduleDir, "..", "..");
  const outputRoot = path.resolve(options.output || defaultOutputDir);
  const validate = options.validate ?? true;
  const deckContext = buildDeckContextFromOptions(options);
  const chromeMode = deckContext.chromeMode;

  await fs.mkdir(outputRoot, { recursive: true });
  await copyToOutput(
    path.join(repoRoot, "cases", "twitter-history", "twitter-history.zh.md"),
    path.join(outputRoot, "twitter-history.zh.md"),
  );
  await copyToOutput(
    path.join(repoRoot, "cases", "twitter-history", "sources.md"),
    path.join(outputRoot, "sources.md"),
  );

  const manifestLines = [
    "Twitter 发展史 10 套 Style 案例",
    "",
    "生成方式：",
    "- 页面采用独立构图，不再复用同一套版式模板。",
    "- 正文只能落在固定主内容区，顶部与底部为硬安全区。",
    "- 安全区只放页眉页脚和弱装饰，不承载正文内容。",
    "",
    `安全区：top=${SAFE_ZONE.top}px, bottom=${SAFE_ZONE.bottom}px, main=${SAFE_ZONE.innerTop}px..${SAFE_ZONE.innerBottom}px`,
    "",
    `验证：${validate ? "已启用安全区几何检查" : "未启用安全区几何检查"}`,
    `场景：${deckContext.presentationScenario}`,
    `质量等级：${deckContext.qualityTier}`,
  ];
  await fs.writeFile(path.join(outputRoot, "README.txt"), manifestLines.join("\n"), "utf8");

  for (const style of styles) {
    const styleDir = path.join(outputRoot, style.slug);
    const htmlDir = path.join(styleDir, "html");
    const renderedDir = path.join(styleDir, "rendered");
    const pptDir = path.join(styleDir, "ppt");

    await ensureDir(htmlDir);
    await fs.mkdir(renderedDir, { recursive: true });
    await fs.mkdir(pptDir, { recursive: true });

    const plans = [];
    let previousLayout = null;
    for (const [index, spec] of pageSpecs.entries()) {
      const plan = buildPagePlan(style, spec, index + 1, previousLayout, deckContext);
      previousLayout = plan.layoutId;
      plans.push(plan);
      const fileName = `slide_${String(index + 1).padStart(2, "0")}.html`;
      await fs.writeFile(
        path.join(htmlDir, fileName),
        renderHtml(style, plan, {
          chromeMode,
          pageCount: pageSpecs.length,
          brandProfile: deckContext.brandProfile,
          presentationScenario: deckContext.presentationScenario,
          qualityTier: deckContext.qualityTier,
        }),
        "utf8",
      );
    }

    await writeDeckArtifacts({
      styleDir,
      deckTitle: "Twitter History Deck",
      style,
      plans,
      deckContext,
    });

    if (validate) {
      await validateHtmlDir(htmlDir);
    }
  }

  console.log(`Generated ${styles.length} style case directories at ${outputRoot}`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const { parseArgs } = await import("node:util");
  const { values } = parseArgs({
    options: {
      output: { type: "string", default: defaultOutputDir },
      validate: { type: "boolean", default: true },
      "presentation-scenario": { type: "string" },
      "quality-tier": { type: "string" },
      "speaker-notes-mode": { type: "string" },
      "chrome-mode": { type: "string" },
      "brand-profile": { type: "string" },
    },
  });

  const normalizedValues = {
    ...values,
    presentationScenario: values["presentation-scenario"],
    qualityTier: values["quality-tier"],
    speakerNotesMode: values["speaker-notes-mode"],
    chromeMode: values["chrome-mode"],
    brandProfile: values["brand-profile"] ? JSON.parse(values["brand-profile"]) : undefined,
  };

  main(normalizedValues).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
