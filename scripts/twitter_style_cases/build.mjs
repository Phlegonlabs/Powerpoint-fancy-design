import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pageSpecs, SAFE_ZONE } from "./page_specs.mjs";
import { buildPagePlan } from "./layout_selection.mjs";
import { styles } from "./styles.mjs";
import { renderHtml } from "./shell.mjs";
import { validateHtmlDir } from "./validation.mjs";

const defaultOutputDir = path.join(
  process.env.USERPROFILE || path.join("C:", "Users", "mps19"),
  "Desktop",
  "Twitter-发展史-10套Style案例",
);

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function copyToOutput(sourcePath, targetPath) {
  await fs.mkdir(path.dirname(targetPath), { recursive: true });
  await fs.copyFile(sourcePath, targetPath);
}

export async function main(options = {}) {
  const moduleDir = path.dirname(fileURLToPath(import.meta.url));
  const repoRoot = path.resolve(moduleDir, "..", "..");
  const outputRoot = path.resolve(options.output || defaultOutputDir);
  const validate = options.validate ?? true;

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

    let previousLayout = null;
    for (const [index, spec] of pageSpecs.entries()) {
      const plan = buildPagePlan(style, spec, index + 1, previousLayout);
      previousLayout = plan.layoutId;
      const fileName = `slide_${String(index + 1).padStart(2, "0")}.html`;
      await fs.writeFile(path.join(htmlDir, fileName), renderHtml(style, plan), "utf8");
    }

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
    },
  });

  main(values).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
