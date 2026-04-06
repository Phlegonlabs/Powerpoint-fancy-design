import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pageSpecs, SAFE_ZONE } from "./page_specs.mjs";
import { buildPagePlan } from "../slide_engine/layout_selection.mjs";
import { styles } from "../twitter_style_cases/styles.mjs";
import { renderHtml } from "../slide_engine/shell.mjs";
import { validateHtmlDir } from "../slide_engine/validation.mjs";
import {
  buildDeckContextFromOptions,
  copyToOutput,
  ensureDir,
  writeDeckArtifacts,
} from "../slide_engine/deck_files.mjs";
import { polishDeckPlans } from "../slide_engine/polish.mjs";
import { addTask, createTaskState, writeTaskState } from "../slide_engine/task_artifacts.mjs";

const defaultOutputDir = path.join("outputs", "public-stage-brand-launch");

export async function main(options = {}) {
  const moduleDir = path.dirname(fileURLToPath(import.meta.url));
  const repoRoot = path.resolve(moduleDir, "..", "..");
  const outputRoot = path.resolve(options.output || defaultOutputDir);
  const validate = options.validate ?? true;
  const deckContext = buildDeckContextFromOptions({
    presentationScenario: "brand-launch",
    qualityTier: "public-stage",
    speakerNotesMode: options.speakerNotesMode || "outline",
    chromeMode: options.chromeMode || "all",
    brandProfile: options.brandProfile,
  });
  const styleFilter = options.style ? String(options.style).toLowerCase() : null;
  const selectedStyles = styleFilter
    ? styles.filter((style) => style.id === styleFilter || style.slug === styleFilter)
    : styles;

  if (selectedStyles.length === 0) {
    throw new Error(`Unknown style filter: ${options.style}`);
  }

  await ensureDir(outputRoot);
  await copyToOutput(
    path.join(repoRoot, "cases", "templates", "README.md"),
    path.join(outputRoot, "templates-readme.md"),
  );

  const readme = [
    "Public Stage Brand Launch Benchmark",
    "",
    `安全区：top=${SAFE_ZONE.top}px, bottom=${SAFE_ZONE.bottom}px, main=${SAFE_ZONE.innerTop}px..${SAFE_ZONE.innerBottom}px`,
    `场景：${deckContext.presentationScenario}`,
    `质量等级：${deckContext.qualityTier}`,
    `Speaker notes：${deckContext.speakerNotesMode}`,
    `品牌：${deckContext.brandProfile.brandName}`,
    "",
    "用途：",
    "- 验证 style 是否足够 public-stage。",
    "- 验证品牌锁定、speaker notes 与 rubric 审计。",
    "- 对比 10 套 style 在同一 launch 叙事下的适配度。",
  ];
  await fs.writeFile(path.join(outputRoot, "README.txt"), `${readme.join("\n")}\n`, "utf8");

  for (const style of selectedStyles) {
    const styleDir = path.join(outputRoot, style.slug);
    const htmlDir = path.join(styleDir, "html");
    const renderedDir = path.join(styleDir, "rendered");
    const pptDir = path.join(styleDir, "ppt");

    await ensureDir(htmlDir);
    await ensureDir(renderedDir);
    await ensureDir(pptDir);

    const taskState = createTaskState(deckContext);
    const draftPlans = [];
    let previousLayout = null;

    for (const [index, spec] of pageSpecs.entries()) {
      const plan = buildPagePlan(style, spec, index + 1, previousLayout, deckContext);
      previousLayout = plan.layoutId;
      draftPlans.push(plan);
    }

    addTask(taskState, {
      id: "draft",
      title: "Draft Generation",
      details: [
        `Built ${draftPlans.length} draft slide plans.`,
        `Draft layouts: ${draftPlans.map((plan) => plan.layoutId).join(", ")}`,
      ],
    });

    const { polishedPlans, changes } = polishDeckPlans(draftPlans, deckContext);
    addTask(taskState, {
      id: "polish",
      title: "Polish Pass",
      details: changes.length > 0 ? changes : ["No structural polish changes were required."],
    });

    for (const plan of polishedPlans) {
      const fileName = `slide_${String(plan.index).padStart(2, "0")}.html`;
      await fs.writeFile(
        path.join(htmlDir, fileName),
        renderHtml(style, plan, {
          chromeMode: deckContext.chromeMode,
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
      deckTitle: "Public Stage Brand Launch",
      style,
      plans: polishedPlans,
      deckContext,
    });

    if (validate) {
      await validateHtmlDir(htmlDir);
    }

    addTask(taskState, {
      id: "html-output",
      title: "HTML Output",
      details: [`Wrote polished HTML slides to ${path.relative(repoRoot, htmlDir)}`],
      artifacts: [
        path.join(style.slug, "html"),
        path.join(style.slug, "deck-manifest.json"),
        path.join(style.slug, "speaker-notes.md"),
      ],
    });
    await writeTaskState(styleDir, taskState);
  }

  console.log(`Generated ${selectedStyles.length} public-stage style case directories at ${outputRoot}`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const { parseArgs } = await import("node:util");
  const { values } = parseArgs({
    options: {
      output: { type: "string", default: defaultOutputDir },
      style: { type: "string" },
      validate: { type: "boolean", default: true },
      "speaker-notes-mode": { type: "string" },
      "chrome-mode": { type: "string" },
      "brand-profile": { type: "string" },
    },
  });

  main({
    ...values,
    speakerNotesMode: values["speaker-notes-mode"],
    chromeMode: values["chrome-mode"],
    brandProfile: values["brand-profile"] ? JSON.parse(values["brand-profile"]) : undefined,
  }).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
