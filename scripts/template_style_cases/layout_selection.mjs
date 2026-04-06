const familyLayoutMap = {
  editorial: {
    cover: "hero-cover",
    chronology: "offset-timeline",
    comparison: "comparison-bands",
    metric: "metric-commentary",
    thesis: "editorial-thesis",
    synthesis: "card-constellation",
    closing: "manifesto-wall",
  },
  minimal: {
    cover: "hero-cover",
    chronology: "story-rail",
    comparison: "ledger-columns",
    metric: "editorial-thesis",
    thesis: "editorial-thesis",
    synthesis: "story-rail",
    closing: "ledger-columns",
  },
  poster: {
    cover: "hero-cover",
    chronology: "offset-timeline",
    comparison: "comparison-bands",
    metric: "evidence-quote",
    thesis: "editorial-thesis",
    synthesis: "card-constellation",
    closing: "manifesto-wall",
  },
  geometry: {
    cover: "hero-cover",
    chronology: "offset-timeline",
    comparison: "comparison-bands",
    metric: "metric-commentary",
    thesis: "ledger-columns",
    synthesis: "card-constellation",
    closing: "ledger-columns",
  },
  organic: {
    cover: "hero-cover",
    chronology: "story-rail",
    comparison: "comparison-bands",
    metric: "metric-commentary",
    thesis: "editorial-thesis",
    synthesis: "card-constellation",
    closing: "manifesto-wall",
  },
  luxury: {
    cover: "hero-cover",
    chronology: "offset-timeline",
    comparison: "comparison-bands",
    metric: "metric-commentary",
    thesis: "editorial-thesis",
    synthesis: "ledger-columns",
    closing: "manifesto-wall",
  },
  brutal: {
    cover: "hero-cover",
    chronology: "story-rail",
    comparison: "comparison-bands",
    metric: "metric-commentary",
    thesis: "editorial-thesis",
    synthesis: "card-constellation",
    closing: "manifesto-wall",
  },
  future: {
    cover: "hero-cover",
    chronology: "offset-timeline",
    comparison: "comparison-bands",
    metric: "metric-commentary",
    thesis: "editorial-thesis",
    synthesis: "card-constellation",
    closing: "manifesto-wall",
  },
  "dark-editorial": {
    cover: "hero-cover",
    chronology: "offset-timeline",
    comparison: "comparison-bands",
    metric: "metric-commentary",
    thesis: "editorial-thesis",
    synthesis: "ledger-columns",
    closing: "manifesto-wall",
  },
  playful: {
    cover: "hero-cover",
    chronology: "offset-timeline",
    comparison: "comparison-bands",
    metric: "metric-commentary",
    thesis: "editorial-thesis",
    synthesis: "card-constellation",
    closing: "manifesto-wall",
  },
};

function supportsLayout(spec, layoutId) {
  const requirements = {
    "hero-cover": () => Boolean(spec.yearRange && spec.notes),
    "editorial-thesis": () => Boolean(spec.thesis && spec.commentary),
    "offset-timeline": () => Array.isArray(spec.events),
    "story-rail": () => Array.isArray(spec.railItems),
    "metric-commentary": () => Boolean(spec.metric && Array.isArray(spec.bullets)),
    "comparison-bands": () => Array.isArray(spec.columns),
    "card-constellation": () => Array.isArray(spec.cards),
    "process-ribbon": () => Array.isArray(spec.steps),
    "evidence-quote": () => Boolean(spec.metric || spec.accentFigure || spec.railTitle),
    "chronology-matrix": () => Array.isArray(spec.cells),
    "manifesto-wall": () => Array.isArray(spec.pillars),
    "ledger-columns": () => Boolean(spec.commentary || spec.columns || spec.railItems),
  };
  return requirements[layoutId]?.() ?? false;
}

export function buildPagePlan(style, spec, index, previousLayout) {
  const familyChoice = familyLayoutMap[style.family]?.[spec.role];
  const familyCandidates = [familyChoice, ...spec.preferredLayouts].filter(Boolean);
  const uniqueCandidates = [...new Set(familyCandidates)].filter((candidate) =>
    supportsLayout(spec, candidate),
  );
  const layoutId = uniqueCandidates.find((candidate) => candidate !== previousLayout) ?? uniqueCandidates[0];

  return { ...spec, index, layoutId, family: style.family, styleId: style.id };
}
