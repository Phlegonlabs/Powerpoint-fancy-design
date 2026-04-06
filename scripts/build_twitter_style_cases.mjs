import fs from "node:fs/promises";
import path from "node:path";
import { parseArgs } from "node:util";
import { main as buildHtml } from "./twitter_style_cases/build.mjs";
import { styles } from "./twitter_style_cases/styles.mjs";

const defaultRoot = path.join(
  process.env.USERPROFILE || path.join("C:", "Users", "mps19"),
  "Desktop",
  "Twitter-发展史-10套Style案例",
);

const { values } = parseArgs({
  options: {
    root: { type: "string", default: defaultRoot },
    previews: { type: "boolean", default: true },
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
  const pptPath = path.join(pptDir, `Twitter-发展史-${style.slug}.pptx`);

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

  return { pptPath, styleDir };
}

async function main() {
  await buildHtml({ output: outputRoot, validate: false });

  const collectionDir = path.join(outputRoot, "pptx-collection");
  await ensureDir(collectionDir);

  for (const style of styles) {
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
  ]);

  if (values.previews) {
    await runNodeScript(path.join(root, "scripts", "generate_style_previews.mjs"), []);
  }

  console.log(`Full Twitter style-case pipeline completed at ${outputRoot}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
