import fs from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const limit = 400;
const sourceExts = new Set([".js", ".mjs", ".ts", ".tsx", ".jsx", ".css", ".scss"]);
const ignoredDirs = new Set([".git", "node_modules", "outputs", "assets"]);

async function walk(dir, results = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) {
        await walk(fullPath, results);
      }
      continue;
    }

    if (sourceExts.has(path.extname(entry.name))) {
      results.push(fullPath);
    }
  }
  return results;
}

async function main() {
  const files = await walk(rootDir);
  const violations = [];

  for (const file of files) {
    const lineCount = (await fs.readFile(file, "utf8")).split(/\r?\n/).length;
    if (lineCount > limit) {
      violations.push({ file: path.relative(rootDir, file), lineCount });
    }
  }

  if (violations.length > 0) {
    console.error(`Source line limit exceeded (${limit} lines max):`);
    for (const violation of violations.sort((a, b) => b.lineCount - a.lineCount)) {
      console.error(`- ${violation.file}: ${violation.lineCount}`);
    }
    process.exit(1);
  }

  console.log(`All source files are within ${limit} lines.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
