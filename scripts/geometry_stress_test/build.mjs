import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { pageSpecs, SAFE_ZONE } from "./page_specs.mjs";
import { renderHtml } from "./shell.mjs";
import { styles } from "../twitter_style_cases/styles.mjs";
import { validateHtmlDir } from "../twitter_style_cases/validation.mjs";

const defaultOutputDir = path.join("outputs", "geometry-stress-test");

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function copyToOutput(sourcePath, targetPath) {
  await ensureDir(path.dirname(targetPath));
  await fs.copyFile(sourcePath, targetPath);
}

export async function main(options = {}) {
  const moduleDir = path.dirname(fileURLToPath(import.meta.url));
  const repoRoot = path.resolve(moduleDir, "..", "..");
  const outputRoot = path.resolve(options.output || defaultOutputDir);
  const styleId = String(options.style || "d").toLowerCase();
  const theme = styles.find((style) => style.id === styleId || style.slug === styleId);

  if (!theme) {
    throw new Error(`Unknown style: ${options.style}`);
  }

  const styleDir = path.join(outputRoot, theme.slug);
  const htmlDir = path.join(styleDir, "html");
  const renderedDir = path.join(styleDir, "rendered");
  const pptDir = path.join(styleDir, "ppt");

  await ensureDir(htmlDir);
  await ensureDir(renderedDir);
  await ensureDir(pptDir);

  await copyToOutput(
    path.join(repoRoot, "cases", "templates", "geometry-stress-test.zh.md"),
    path.join(outputRoot, "geometry-stress-test.zh.md"),
  );
  await copyToOutput(
    path.join(repoRoot, "cases", "templates", "geometry-stress-test.md"),
    path.join(outputRoot, "geometry-stress-test.md"),
  );

  const manifest = [
    "PPT Geometry Stress Test Deck",
    "",
    `Style: ${theme.id.toUpperCase()} / ${theme.zhName}`,
    "Purpose:",
    "- Validate tables, diagrams, org charts, and process maps under geometry-preserve assumptions.",
    "- Compare HTML, PNG, and PPT outputs for visible proportion drift.",
    "",
    `Safe zone: top=${SAFE_ZONE.top}px, bottom=${SAFE_ZONE.bottom}px, main=${SAFE_ZONE.innerTop}px..${SAFE_ZONE.innerBottom}px`,
    `Pages: ${pageSpecs.length}`,
  ];
  await fs.writeFile(path.join(outputRoot, "README.txt"), manifest.join("\n"), "utf8");

  for (const [index, spec] of pageSpecs.entries()) {
    const fileName = `slide_${String(index + 1).padStart(2, "0")}.html`;
    await fs.writeFile(path.join(htmlDir, fileName), renderHtml(theme, spec, index), "utf8");
  }

  await validateHtmlDir(htmlDir);
  console.log(`Generated geometry stress HTML deck at ${styleDir}`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const { values } = parseArgs({
    options: {
      output: { type: "string", default: defaultOutputDir },
      style: { type: "string", default: "d" },
    },
  });

  main(values).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
