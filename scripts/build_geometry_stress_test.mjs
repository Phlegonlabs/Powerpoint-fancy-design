import fs from "node:fs/promises";
import path from "node:path";
import { parseArgs } from "node:util";
import { main as buildHtml } from "./geometry_stress_test/build.mjs";

const defaultRoot = path.join("outputs", "geometry-stress-test");

const { values } = parseArgs({
  options: {
    root: { type: "string", default: defaultRoot },
    style: { type: "string", default: "d" },
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

async function main() {
  await buildHtml({ output: outputRoot, style: values.style });

  const styleDir = await (async () => {
    const entries = await fs.readdir(outputRoot, { withFileTypes: true });
    const match = entries.find((entry) => entry.isDirectory() && entry.name.startsWith("style-"));
    if (!match) throw new Error(`No style directory generated in ${outputRoot}`);
    return path.join(outputRoot, match.name);
  })();

  const htmlDir = path.join(styleDir, "html");
  const renderedDir = path.join(styleDir, "rendered");
  const pptPath = path.join(styleDir, "ppt", "geometry-stress-test.pptx");

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
  await runNodeScript(path.join(root, "scripts", "build_review_sheets.mjs"), [
    "--root",
    outputRoot,
  ]);
  await runNodeScript(path.join(root, "scripts", "audit_twitter_style_cases.mjs"), [
    "--root",
    outputRoot,
    "--output",
    path.join(outputRoot, "audit", "geometry-stress-audit.md"),
  ]);

  console.log(`Full geometry stress-test pipeline completed at ${outputRoot}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
