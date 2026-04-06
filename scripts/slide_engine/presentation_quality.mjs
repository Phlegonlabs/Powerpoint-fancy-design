function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export const scenarioProfiles = {
  "brand-launch": {
    label: "Brand Launch",
    preferredChrome: "all",
    requireBranding: true,
    requireSpeakerNotes: "outline",
    maxPrimaryIdeasPerSlide: 4,
    densityPenaltyThreshold: 900,
    preferredToneTags: ["launch", "brand", "campaign", "public"],
  },
  "investor-board": {
    label: "Investor / Board",
    preferredChrome: "bookend",
    requireBranding: true,
    requireSpeakerNotes: "outline",
    maxPrimaryIdeasPerSlide: 5,
    densityPenaltyThreshold: 1100,
    preferredToneTags: ["serious", "analytical", "executive"],
  },
  "client-pitch": {
    label: "Client Pitch",
    preferredChrome: "bookend",
    requireBranding: true,
    requireSpeakerNotes: "outline",
    maxPrimaryIdeasPerSlide: 5,
    densityPenaltyThreshold: 1000,
    preferredToneTags: ["brand", "commercial", "proposal"],
  },
  "research-brief": {
    label: "Research Brief",
    preferredChrome: "bookend",
    requireBranding: false,
    requireSpeakerNotes: "outline",
    maxPrimaryIdeasPerSlide: 5,
    densityPenaltyThreshold: 1100,
    preferredToneTags: ["research", "serious", "evidence"],
  },
};

export const qualityTierProfiles = {
  internal: {
    label: "Internal",
    minDeckScore: 70,
    minCategoryRatio: 0.45,
    enableHardFails: false,
  },
  "client-facing": {
    label: "Client Facing",
    minDeckScore: 78,
    minCategoryRatio: 0.55,
    enableHardFails: true,
  },
  "public-stage": {
    label: "Public Stage",
    minDeckScore: 85,
    minCategoryRatio: 0.6,
    enableHardFails: true,
  },
};

export function normalizeBrandProfile(input = {}, context = {}) {
  const tier = qualityTierProfiles[context.qualityTier] || qualityTierProfiles.internal;
  const scenario = scenarioProfiles[context.presentationScenario] || scenarioProfiles["client-pitch"];
  const brandName = input.brandName || "Powerpoint Fancy Design";
  const logoText = input.logoText || brandName;
  const footerText = input.footerText || `${brandName} Presentation System`;

  return {
    brandName,
    logoText,
    footerText,
    paletteLock: input.paletteLock ?? true,
    fontLock: input.fontLock ?? true,
    forbiddenColors: input.forbiddenColors ?? ["#8000ff"],
    showHeaderLogo: input.showHeaderLogo ?? (tier.label === "Public Stage"),
    showFooterBrand: input.showFooterBrand ?? (tier.label === "Public Stage"),
    requireHeaderLogo: input.requireHeaderLogo ?? (scenario.requireBranding && tier.enableHardFails),
    requireFooterBrand: input.requireFooterBrand ?? (scenario.requireBranding && tier.enableHardFails),
  };
}

export function resolveDeckContext(options = {}) {
  const presentationScenario = options.presentationScenario || "brand-launch";
  const qualityTier = options.qualityTier || "public-stage";
  const scenario = scenarioProfiles[presentationScenario] || scenarioProfiles["brand-launch"];
  const tier = qualityTierProfiles[qualityTier] || qualityTierProfiles["public-stage"];
  const speakerNotesMode = options.speakerNotesMode || scenario.requireSpeakerNotes || "none";
  const chromeMode = options.chromeMode || scenario.preferredChrome || "bookend";
  const brandProfile = normalizeBrandProfile(options.brandProfile, {
    presentationScenario,
    qualityTier,
  });

  return {
    presentationScenario,
    scenarioLabel: scenario.label,
    qualityTier,
    qualityLabel: tier.label,
    speakerNotesMode,
    chromeMode,
    brandProfile,
  };
}

function flattenPoints(spec) {
  const groups = [
    spec.notes,
    spec.commentary,
    spec.railItems,
    spec.events,
    spec.columns,
    spec.cards,
    spec.steps,
    spec.cells,
    spec.pillars,
    spec.bullets,
  ].filter(Boolean);
  return groups.flatMap((entry) => {
    if (Array.isArray(entry)) return entry;
    return [];
  });
}

function toNoteLine(item) {
  if (typeof item === "string") return item;
  if (item.title && item.text) return `${item.title}: ${item.text}`;
  if (item.label && item.text) return `${item.label}: ${item.text}`;
  if (item.heading && item.points) return `${item.heading}: ${item.points.join("；")}`;
  if (item.date && item.title) return `${item.date} ${item.title}: ${item.text}`;
  return JSON.stringify(item);
}

export function buildSpeakerNotes(deckTitle, plans, deckContext) {
  if (deckContext.speakerNotesMode === "none") return "";

  const lines = [
    `# ${deckTitle} Speaker Notes`,
    "",
    `- Scenario: ${deckContext.presentationScenario}`,
    `- Quality Tier: ${deckContext.qualityTier}`,
    `- Brand: ${deckContext.brandProfile.brandName}`,
    "",
  ];

  for (const plan of plans) {
    const supportPoints = flattenPoints(plan).slice(0, 4).map(toNoteLine);
    lines.push(`## Slide ${String(plan.index).padStart(2, "0")} · ${plan.blocks?.[1]?.text || plan.id}`);
    lines.push("");
    lines.push(`- Role: ${plan.role}`);
    lines.push(`- Layout: ${plan.layoutId}`);
    lines.push(`- Audience cue: 先说这页的一个主结论，再补 2-3 个支撑点。`);
    lines.push(`- Open: ${plan.blocks?.[0]?.text || "引出主题"}`);
    lines.push(`- Core message: ${plan.blocks?.[1]?.text || "说明核心信息"}`);
    if (plan.blocks?.[2]?.text) {
      lines.push(`- Bridge: ${plan.blocks[2].text}`);
    }
    if (supportPoints.length > 0) {
      lines.push(`- Support: ${supportPoints.join(" | ")}`);
    }
    if (deckContext.speakerNotesMode === "full") {
      lines.push(`- Close: 用一句行动导向的话收回到下一步。`);
    }
    lines.push("");
  }

  return `${lines.join("\n")}\n`;
}

export function scoreCategory(actual, max) {
  return clamp(actual, 0, max);
}

export function computeNarrativeScore(plan, inspection, deckContext) {
  const scenario = scenarioProfiles[deckContext.presentationScenario] || scenarioProfiles["brand-launch"];
  let score = 20;
  if (inspection.metrics.textChars > scenario.densityPenaltyThreshold) score -= 6;
  if (inspection.metrics.mainItemCount > scenario.maxPrimaryIdeasPerSlide + 2) score -= 5;
  if ((plan.blocks?.[1]?.text || "").length < 6) score -= 2;
  if (inspection.metrics.mainItemCount < 2) score -= 3;
  return scoreCategory(score, 20);
}

export function computeStyleFitScore(style, deckContext) {
  const scenario = deckContext.presentationScenario;
  let score = 15;
  if (!style.allowedScenarios?.includes(scenario)) score -= 8;
  if (scenario === "brand-launch" && style.seriousnessScore < 4) score -= 2;
  if (scenario === "brand-launch" && style.projectorRiskFlags?.length > 1) score -= 2;
  return scoreCategory(score, 15);
}

export function computeBrandScore(inspection, deckContext) {
  const brand = deckContext.brandProfile;
  let score = 15;
  if (brand.requireHeaderLogo && inspection.metrics.brandMarksVisible < 1) score -= 8;
  if (brand.requireFooterBrand && inspection.metrics.footerBrandVisible < 1) score -= 7;
  return scoreCategory(score, 15);
}

export function computeHierarchyScore(inspection) {
  let score = 15;
  if (inspection.metrics.competingFocalPoints > 2) score -= 7;
  if (inspection.metrics.headlineToBodyRatio < 1.7) score -= 5;
  if (inspection.metrics.headlineCount === 0) score -= 6;
  return scoreCategory(score, 15);
}

export function computeReadabilityScore(inspection) {
  let score = 15;
  score -= Math.min(inspection.metrics.criticalContrastFailures * 4, 10);
  score -= Math.min(
    Math.max(inspection.metrics.contrastFailures - inspection.metrics.criticalContrastFailures, 0) * 2,
    4,
  );
  if (inspection.metrics.minBodyFont != null && inspection.metrics.minBodyFont < 18) score -= 5;
  if (inspection.metrics.bodyAvgSize != null && inspection.metrics.bodyAvgSize < 22) score -= 3;
  return scoreCategory(score, 15);
}

export function computeDataScore(plan, inspection) {
  let score = 10;
  if (["metric", "comparison", "chronology"].includes(plan.role) && inspection.metrics.mainItemCount < 2) {
    score -= 3;
  }
  if (inspection.metrics.geometryGroups > 0 && inspection.issues.some((issue) => issue.startsWith("Geometry ratio drift"))) {
    score -= 5;
  }
  return scoreCategory(score, 10);
}

export function computePacingScore(deckMetrics) {
  let score = 5;
  if (deckMetrics.uniqueLayouts < 5) score -= 2;
  if (deckMetrics.repeatedLayouts > 1) score -= 2;
  return scoreCategory(score, 5);
}

export function computeDeliveryScore(deckContext, inspection) {
  let score = 5;
  if (deckContext.speakerNotesMode === "none") score -= 2;
  if (inspection.metrics.brandMarksVisible < 1 && deckContext.brandProfile.showHeaderLogo) score -= 1;
  if (inspection.metrics.footerBrandVisible < 1 && deckContext.brandProfile.showFooterBrand) score -= 2;
  return scoreCategory(score, 5);
}

export function evaluateHardFailures(style, inspection, deckContext) {
  const failures = [];
  const tier = qualityTierProfiles[deckContext.qualityTier] || qualityTierProfiles["public-stage"];

  if (!tier.enableHardFails) return failures;
  if (inspection.metrics.criticalContrastFailures > 0) {
    failures.push("Projection contrast is below the public-stage threshold.");
  }
  if (inspection.metrics.competingFocalPoints > 2) {
    failures.push("More than two focal points compete on the same slide.");
  }
  if (inspection.metrics.headlineToBodyRatio < 1.7) {
    failures.push("Headline/body hierarchy is too weak for stage viewing.");
  }
  if (!style.allowedScenarios?.includes(deckContext.presentationScenario)) {
    failures.push(`Style ${style.id.toUpperCase()} is not approved for ${deckContext.presentationScenario}.`);
  }
  if (deckContext.brandProfile.requireHeaderLogo && inspection.metrics.brandMarksVisible < 1) {
    failures.push("Required brand mark is missing.");
  }
  if (deckContext.brandProfile.requireFooterBrand && inspection.metrics.footerBrandVisible < 1) {
    failures.push("Required footer brand lockup is missing.");
  }
  if (
    style.projectorRiskFlags?.includes("dark-projector")
    && inspection.metrics.averageContrast != null
    && inspection.metrics.averageContrast < style.contrastPolicy.minAverageContrast
  ) {
    failures.push("Dark theme projector safety threshold was not met.");
  }

  return failures;
}
