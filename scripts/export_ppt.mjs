import fs from "node:fs/promises";
import path from "node:path";
import pptxgen from "pptxgenjs";
import { parseArgs } from "node:util";

const SLIDE_HEIGHT_IN = 7.5;
const SLIDE_WIDTH_IN = SLIDE_HEIGHT_IN * (16 / 9);
const EXPECTED_RATIO = 16 / 9;
const PNG_SIGNATURE = "89504e470d0a1a0a";

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

async function readPngSize(filePath) {
  const handle = await fs.open(filePath, "r");
  try {
    const buffer = Buffer.alloc(24);
    const { bytesRead } = await handle.read(buffer, 0, buffer.length, 0);
    if (bytesRead < buffer.length) {
      throw new Error(`PNG header too short: ${filePath}`);
    }

    if (buffer.subarray(0, 8).toString("hex") !== PNG_SIGNATURE) {
      throw new Error(`File is not a valid PNG: ${filePath}`);
    }

    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    return { width, height };
  } finally {
    await handle.close();
  }
}

async function assertPngRatio(filePath) {
  const { width, height } = await readPngSize(filePath);
  const ratio = width / height;
  if (!Number.isFinite(ratio) || Math.abs(ratio - EXPECTED_RATIO) > 0.002) {
    throw new Error(
      `Rendered slide ratio mismatch for ${path.basename(filePath)}: ${width}x${height} (${ratio.toFixed(4)})`
    );
  }
  return { width, height };
}

async function main() {
  const images = await listImages(inputDir);
  if (images.length === 0) {
    throw new Error(`No rendered PNG slides found in ${inputDir}`);
  }

  await fs.mkdir(path.dirname(outputPath), { recursive: true });

  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_WIDE";
  pptx.author = process.env.PPT_AUTHOR || "AI Agent";
  pptx.company = process.env.PPT_COMPANY || "PPT Design Skill";
  pptx.subject = "HTML slide export";
  pptx.title = path.basename(outputPath, path.extname(outputPath));

  for (const imageName of images) {
    const slide = pptx.addSlide();
    const imagePath = path.join(inputDir, imageName);
    await assertPngRatio(imagePath);
    slide.addImage({
      path: imagePath,
      x: 0,
      y: 0,
      w: SLIDE_WIDTH_IN,
      h: SLIDE_HEIGHT_IN,
    });
  }

  await pptx.writeFile({ fileName: outputPath });
  console.log(`Exported ${images.length} slide(s) -> ${path.relative(root, outputPath)}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
