import fs from "node:fs/promises";
import path from "node:path";
import { parseArgs } from "node:util";
import { main as buildHtml } from "./template_style_cases/build.mjs";
import { styles } from "./twitter_style_cases/styles.mjs";

const defaultRoot = path.join(
  process.env.USERPROFILE || path.join("C:", "Users", "mps19"),
  "Desktop",
  "PPT-通用模板-10套Style案例",
);

const { values } = parseArgs({
  options: {
    root: { type: "string", default: defaultRoot },
    style: { type: "string" },
    previews: { type: "boolean", default: false },
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
  const pptPath = path.join(pptDir, `PPT-通用模板-${style.slug}.pptx`);

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

async function main() {
  const styleFilter = values.style ? String(values.style).toLowerCase() : null;
  const selectedStyles = styleFilter
    ? styles.filter((style) => style.id === styleFilter || style.slug === styleFilter)
    : styles;

  if (selectedStyles.length === 0) {
    throw new Error(`Unknown style filter: ${values.style}`);
  }

  await buildHtml({ output: outputRoot, style: styleFilter, validate: false });

  const collectionDir = path.join(outputRoot, "pptx-collection");
  await ensureDir(collectionDir);

  for (const style of selectedStyles) {
    const { pptPath } = await buildStyleArtifacts(style);
    await copyFile(pptPath, path.join(collectionDir, path.basename(pptPath)));
  }

  await runNodeScript(path.join(root, "scripts", "build_review_sheets.mjs"), [
    "--root",
    outputRoot,
  ]);

  await runNodeScript(path.join(root, "scripts", "audit_twitter_style_cases.mjs"), [
    "--root",
    outputRoot,
    "--output",
    path.join(outputRoot, "audit", "template-style-audit.md"),
  ]);

  if (values.previews) {
    await runNodeScript(path.join(root, "scripts", "generate_style_previews.mjs"), []);
  }

  console.log(`Full generic template style-case pipeline completed at ${outputRoot}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
