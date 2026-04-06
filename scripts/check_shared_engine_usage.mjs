import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

const wrapperChecks = [
  ["scripts/twitter_style_cases/layout_selection.mjs", "../slide_engine/layout_selection.mjs"],
  ["scripts/twitter_style_cases/renderers.mjs", "../slide_engine/renderers.mjs"],
  ["scripts/twitter_style_cases/shell.mjs", "../slide_engine/shell.mjs"],
  ["scripts/twitter_style_cases/styles.mjs", "../slide_engine/styles.mjs"],
  ["scripts/twitter_style_cases/validation.mjs", "../slide_engine/validation.mjs"],
  ["scripts/template_style_cases/layout_selection.mjs", "../slide_engine/layout_selection.mjs"],
  ["scripts/template_style_cases/shell.mjs", "../slide_engine/shell.mjs"],
];

const buildChecks = [
  ["scripts/build_template_style_cases.mjs", "validate: true"],
  ["scripts/build_twitter_style_cases.mjs", "validate: true"],
  ["scripts/build_twitter_style_cases.mjs", "twitter-style-audit.md"],
];

let hasFailure = false;

for (const [filePath, expectedImport] of wrapperChecks) {
  const source = await fs.readFile(path.join(root, filePath), "utf8");
  if (!source.includes(expectedImport)) {
    console.error(`Shared engine wrapper check failed: ${filePath} does not reference ${expectedImport}`);
    hasFailure = true;
  }
}

for (const [filePath, expectedText] of buildChecks) {
  const source = await fs.readFile(path.join(root, filePath), "utf8");
  if (!source.includes(expectedText)) {
    console.error(`Build contract check failed: ${filePath} does not contain ${expectedText}`);
    hasFailure = true;
  }
}

if (hasFailure) {
  process.exit(1);
}

console.log("Shared engine usage checks passed.");
