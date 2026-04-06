import fs from "node:fs/promises";
import path from "node:path";
import { buildSpeakerNotes, resolveDeckContext } from "./presentation_quality.mjs";

export async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

export async function copyToOutput(sourcePath, targetPath) {
  await fs.mkdir(path.dirname(targetPath), { recursive: true });
  await fs.copyFile(sourcePath, targetPath);
}

export async function writeDeckArtifacts({
  styleDir,
  deckTitle,
  style,
  plans,
  deckContext,
}) {
  const manifest = {
    deckTitle,
    deckContext,
    style: {
      id: style.id,
      slug: style.slug,
      family: style.family,
      zhName: style.zhName,
      enName: style.enName,
      allowedScenarios: style.allowedScenarios,
      toneTags: style.toneTags,
      seriousnessScore: style.seriousnessScore,
      projectorRiskFlags: style.projectorRiskFlags,
      densityCeiling: style.densityCeiling,
      ornamentCeiling: style.ornamentCeiling,
      contrastPolicy: style.contrastPolicy,
    },
    slides: plans.map((plan) => ({
      index: plan.index,
      id: plan.id,
      role: plan.role,
      layoutId: plan.layoutId,
      metaLabel: plan.metaLabel,
      title: plan.blocks?.[1]?.text || "",
      density: plan.density,
      emphasis: plan.emphasis,
    })),
  };

  await fs.writeFile(
    path.join(styleDir, "deck-manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8",
  );

  const notes = buildSpeakerNotes(deckTitle, plans, deckContext);
  if (notes) {
    await fs.writeFile(path.join(styleDir, "speaker-notes.md"), notes, "utf8");
  }
}

export function buildDeckContextFromOptions(options = {}) {
  return resolveDeckContext({
    presentationScenario: options.presentationScenario,
    qualityTier: options.qualityTier,
    speakerNotesMode: options.speakerNotesMode,
    chromeMode: options.chromeMode,
    brandProfile: options.brandProfile,
  });
}
