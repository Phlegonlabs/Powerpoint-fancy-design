import fs from "node:fs/promises";
import path from "node:path";
import { parseArgs } from "node:util";
import { main as buildHtml } from "./public_stage_cases/build.mjs";
import { styles } from "./twitter_style_cases/styles.mjs";
import { addTask, loadTaskState, writeTaskState } from "./slide_engine/task_artifacts.mjs";

const defaultRoot = path.join("outputs", "public-stage-brand-launch");

const { values } = parseArgs({
  options: {
    root: { type: "string", default: defaultRoot },
    style: { type: "string" },
  },
});

const root = process.cwd();
const outputRoot = path.resolve(values.root);

async function runNodeScript(scriptPath, args) {
  const { spawn } = await import("node:child_process");
  await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [scriptPath, ...args], {
      cwd: root,
      stdio: "inherit",
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${path.basename(scriptPath)} exited with code ${code}`));
    });
  });
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function copyFile(sourcePath, targetPath) {
  await ensureDir(path.dirname(targetPath));
  await fs.copyFile(sourcePath, targetPath);
}

async function buildStyleArtifacts(style) {
  const styleDir = path.join(outputRoot, style.slug);
  const htmlDir = path.join(styleDir, "html");
  const renderedDir = path.join(styleDir, "rendered");
  const pptDir = path.join(styleDir, "ppt");
  const pptPath = path.join(pptDir, `Public-Stage-Brand-Launch-${style.slug}.pptx`);

  await runNodeScript(path.join(root, "scripts", "render_slides.mjs"), [
    "--input",
    htmlDir,
    "--output",
    renderedDir,
  ]);
  await runNodeScript(path.join(root, "scripts", "export_ppt.mjs"), [
    "--input",
    renderedDir,
    "--output",
    pptPath,
  ]);

  return { pptPath };
}

async function appendTask(style, task) {
  const styleDir = path.join(outputRoot, style.slug);
  const state = await loadTaskState(styleDir);
  addTask(state, task);
  await writeTaskState(styleDir, state);
}

async function main() {
  const styleFilter = values.style ? String(values.style).toLowerCase() : null;
  const selectedStyles = styleFilter
    ? styles.filter((style) => style.id === styleFilter || style.slug === styleFilter)
    : styles;

  if (selectedStyles.length === 0) {
    throw new Error(`Unknown style filter: ${values.style}`);
  }

  await buildHtml({ output: outputRoot, style: styleFilter, validate: true });

  await runNodeScript(path.join(root, "scripts", "audit_twitter_style_cases.mjs"), [
    "--root",
    outputRoot,
    "--output",
    path.join(outputRoot, "audit", "public-stage-audit.md"),
  ]);

  for (const style of selectedStyles) {
    await appendTask(style, {
      id: "audit",
      title: "Audit Gate",
      details: ["Public-stage audit passed before render/export."],
      artifacts: [path.join("audit", "public-stage-audit.md")],
    });
  }

  const collectionDir = path.join(outputRoot, "pptx-collection");
  await ensureDir(collectionDir);

  for (const style of selectedStyles) {
    const { pptPath } = await buildStyleArtifacts(style);
    await copyFile(pptPath, path.join(collectionDir, path.basename(pptPath)));
    await appendTask(style, {
      id: "export",
      title: "Render And Export",
      details: [
        `Rendered PNG slides for ${style.slug}.`,
        `Exported PPTX bundle to ${path.relative(outputRoot, pptPath)}`,
      ],
      artifacts: [
        path.join(style.slug, "rendered"),
        path.join(style.slug, "ppt", path.basename(pptPath)),
      ],
    });
  }

  await runNodeScript(path.join(root, "scripts", "build_review_sheets.mjs"), [
    "--root",
    outputRoot,
  ]);

  console.log(`Full public-stage brand-launch pipeline completed at ${outputRoot}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
