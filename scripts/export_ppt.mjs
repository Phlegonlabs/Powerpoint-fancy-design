import fs from "node:fs/promises";
import path from "node:path";
import pptxgen from "pptxgenjs";
import { parseArgs } from "node:util";

const { values } = parseArgs({
  options: {
    input: { type: "string", default: "outputs/rendered" },
    output: { type: "string", default: "outputs/ppt/deck.pptx" },
  },
});

const root = process.cwd();
const inputDir = path.resolve(root, values.input);
const outputPath = path.resolve(root, values.output);

async function listImages(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".png"))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

async function main() {
  const images = await listImages(inputDir);
  if (images.length === 0) {
    throw new Error(`No rendered PNG slides found in ${inputDir}`);
  }

  await fs.mkdir(path.dirname(outputPath), { recursive: true });

  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_WIDE";
  pptx.author = "Codex";
  pptx.company = "OpenAI";
  pptx.subject = "HTML slide export";
  pptx.title = path.basename(outputPath, path.extname(outputPath));

  for (const imageName of images) {
    const slide = pptx.addSlide();
    const imagePath = path.join(inputDir, imageName);
    slide.addImage({
      path: imagePath,
      x: 0,
      y: 0,
      w: 13.333,
      h: 7.5,
    });
  }

  await pptx.writeFile({ fileName: outputPath });
  console.log(`Exported ${images.length} slide(s) -> ${path.relative(root, outputPath)}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
