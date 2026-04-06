function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderList(items) {
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

// Returns base class + dialect-specific variant class (additive, preserves base styles)
function dialectClass(plan, base) {
  const map = {
    panel: {
      editorial: "rule-panel",
      minimal: "plaque",
      poster: "sticker",
      geometry: "facet-panel",
      organic: "soft-cluster",
      luxury: "deco-plaque",
      brutal: "hard-sticker",
      future: "signal-panel",
      "dark-editorial": "ledger-plaque",
      playful: "bubble-badge",
    },
    "band-card": {
      editorial: "ledger-strip",
      minimal: "divider-band",
      poster: "slab",
      geometry: "facet-band",
      organic: "glass-module",
      luxury: "deco-band",
      brutal: "hard-band",
      future: "signal-band",
      "dark-editorial": "ledger-band",
      playful: "bubble-band",
    },
    "pillar-card": {
      editorial: "frame-pillar",
      minimal: "label-rail",
      poster: "badge-block",
      geometry: "facet-pillar",
      organic: "organic-signal",
      luxury: "deco-pillar",
      brutal: "hard-pillar",
      future: "signal-pillar",
      "dark-editorial": "ledger-pillar",
      playful: "bubble-pillar",
    },
  };
  const extra = map[base]?.[plan.componentDialect];
  return extra ? `${base} ${extra}` : base;
}

function renderHeroCover(plan) {
  if (plan.family === "minimal") {
    return `<section class="layout-root hero-cover hero-cover-minimal"><div class="hero-intro" data-main-item><div class="eyebrow">${escapeHtml(plan.blocks[0].text)}</div><div class="figure-overline">${escapeHtml(plan.yearRange)}</div><h1 class="headline">${escapeHtml(plan.blocks[1].text)}</h1><p class="subhead">${escapeHtml(plan.blocks[2].text)}</p></div><aside class="stacked-notes side-notes-minimal"><article class="panel intro-panel" data-main-item><div class="panel-label">Overview</div><p>${escapeHtml(plan.blocks[3].text)}</p></article>${plan.notes.map((note) => `<article class="panel compact-panel" data-main-item><div class="panel-label">${escapeHtml(note.label)}</div><p>${escapeHtml(note.text)}</p></article>`).join("")}</aside></section>`;
  }
  if (plan.family === "future") {
    return `<section class="layout-root hero-cover hero-cover-future"><div class="hero-intro" data-main-item><div class="eyebrow">${escapeHtml(plan.blocks[0].text)}</div><h1 class="headline headline-wide">${escapeHtml(plan.blocks[1].text)}</h1><p class="subhead">${escapeHtml(plan.blocks[2].text)}</p><p class="body-copy">${escapeHtml(plan.blocks[3].text)}</p></div><aside class="stacked-notes future-aside"><div class="figure-overline" data-main-item>${escapeHtml(plan.yearRange)}</div>${plan.notes.map((note) => `<article class="panel compact-panel" data-main-item><div class="panel-label">${escapeHtml(note.label)}</div><p>${escapeHtml(note.text)}</p></article>`).join("")}</aside></section>`;
  }
  return `<section class="layout-root hero-cover"><div class="hero-intro" data-main-item><div class="figure-overline">${escapeHtml(plan.yearRange)}</div><div class="eyebrow">${escapeHtml(plan.blocks[0].text)}</div><h1 class="headline">${escapeHtml(plan.blocks[1].text)}</h1><p class="subhead">${escapeHtml(plan.blocks[2].text)}</p><p class="body-copy">${escapeHtml(plan.blocks[3].text)}</p></div><aside class="stacked-notes">${plan.notes.map((note) => `<article class="panel" data-main-item><div class="panel-label">${escapeHtml(note.label)}</div><p>${escapeHtml(note.text)}</p></article>`).join("")}</aside></section>`;
}

function renderEditorialThesis(plan) {
  if (plan.family === "minimal") {
    return `<section class="layout-root editorial-thesis editorial-thesis-minimal"><div class="thesis-copy" data-main-item><div class="eyebrow">${escapeHtml(plan.blocks[0].text)}</div><h1 class="headline headline-tight">${escapeHtml(plan.blocks[1].text)}</h1><p class="body-copy lead-copy">${escapeHtml(plan.blocks[2].text)}</p><div class="thesis-statement">${escapeHtml(plan.thesis)}</div><p class="footer-copy" data-main-item>${escapeHtml(plan.footer)}</p></div><div class="thesis-rail rail-stack-minimal">${plan.commentary.map((item) => `<article class="panel compact-panel" data-main-item><div class="panel-label">${escapeHtml(item.label)}</div><p>${escapeHtml(item.text)}</p></article>`).join("")}<div class="figure-stamp" data-main-item>${escapeHtml(plan.accentFigure)}</div></div></section>`;
  }
  if (plan.family === "future") {
    return `<section class="layout-root editorial-thesis editorial-thesis-future"><div class="thesis-copy" data-main-item><div class="eyebrow">${escapeHtml(plan.blocks[0].text)}</div><h1 class="headline headline-tight">${escapeHtml(plan.blocks[1].text)}</h1><p class="body-copy lead-copy">${escapeHtml(plan.blocks[2].text)}</p><div class="thesis-statement">${escapeHtml(plan.thesis)}</div></div><div class="thesis-rail future-rail"><div class="figure-stamp" data-main-item>${escapeHtml(plan.accentFigure)}</div>${plan.commentary.map((item) => `<article class="panel compact-panel" data-main-item><div class="panel-label">${escapeHtml(item.label)}</div><p>${escapeHtml(item.text)}</p></article>`).join("")}</div><p class="footer-copy" data-main-item>${escapeHtml(plan.footer)}</p></section>`;
  }
  return `<section class="layout-root editorial-thesis"><div class="thesis-copy" data-main-item><div class="eyebrow">${escapeHtml(plan.blocks[0].text)}</div><h1 class="headline headline-tight">${escapeHtml(plan.blocks[1].text)}</h1><p class="body-copy lead-copy">${escapeHtml(plan.blocks[2].text)}</p><div class="thesis-statement">${escapeHtml(plan.thesis)}</div></div><div class="thesis-rail"><div class="figure-stamp" data-main-item>${escapeHtml(plan.accentFigure)}</div>${plan.commentary.map((item) => `<article class="${dialectClass(plan, "panel")} compact-panel" data-main-item><div class="panel-label">${escapeHtml(item.label)}</div><p>${escapeHtml(item.text)}</p></article>`).join("")}</div><p class="footer-copy" data-main-item>${escapeHtml(plan.footer)}</p></section>`;
}

function renderOffsetTimeline(plan) {
  if (plan.family === "poster") {
    return `<section class="layout-root offset-timeline timeline-poster"><header class="section-header" data-main-item><div class="eyebrow">${escapeHtml(plan.blocks[0].text)}</div><h1 class="headline headline-tight">${escapeHtml(plan.blocks[1].text)}</h1><p class="body-copy lead-copy">${escapeHtml(plan.blocks[2].text)}</p></header><div class="timeline-bubbles">${plan.events.map((event) => `<article class="milestone-card" data-main-item><div class="panel-label">${escapeHtml(event.date)}</div><h3>${escapeHtml(event.title)}</h3><p>${escapeHtml(event.text)}</p></article>`).join("")}</div><p class="footer-copy" data-main-item>${escapeHtml(plan.footer)}</p></section>`;
  }
  return `<section class="layout-root offset-timeline"><header class="section-header" data-main-item><div class="eyebrow">${escapeHtml(plan.blocks[0].text)}</div><h1 class="headline headline-wide">${escapeHtml(plan.blocks[1].text)}</h1><p class="body-copy lead-copy">${escapeHtml(plan.blocks[2].text)}</p></header><div class="timeline-row">${plan.events.map((event, index) => `<article class="milestone-card offset-${index + 1}" data-main-item><div class="panel-label">${escapeHtml(event.date)}</div><h3>${escapeHtml(event.title)}</h3><p>${escapeHtml(event.text)}</p></article>`).join("")}</div><p class="footer-copy" data-main-item>${escapeHtml(plan.footer)}</p></section>`;
}

function renderStoryRail(plan) {
  if (plan.family === "minimal") {
    return `<section class="layout-root story-rail story-rail-minimal"><div class="rail-copy"><header class="section-header" data-main-item><div class="eyebrow">${escapeHtml(plan.blocks[0].text)}</div><h1 class="headline headline-tight">${escapeHtml(plan.blocks[1].text)}</h1><div class="rail-number" data-main-item>${escapeHtml(plan.railTitle)}</div><div class="rail-label">${escapeHtml(plan.railSubtitle)}</div><div class="rail-note">${escapeHtml(plan.railNote)}</div></header><p class="body-copy lead-copy">${escapeHtml(plan.blocks[2].text)}</p></div><div class="rail-card-stack rail-card-stack-vertical">${plan.railItems.map((item) => `<article class="panel compact-panel" data-main-item><div class="panel-label">${escapeHtml(item.label)}</div><p>${escapeHtml(item.text)}</p></article>`).join("")}</div><p class="footer-copy" data-main-item>${escapeHtml(plan.footer)}</p></section>`;
  }
  return `<section class="layout-root story-rail"><aside class="rail-figure" data-main-item><div class="eyebrow">${escapeHtml(plan.blocks[0].text)}</div><div class="rail-number">${escapeHtml(plan.railTitle)}</div><div class="rail-label">${escapeHtml(plan.railSubtitle)}</div><div class="rail-note">${escapeHtml(plan.railNote)}</div></aside><div class="rail-copy"><header class="section-header" data-main-item><h1 class="headline">${escapeHtml(plan.blocks[1].text)}</h1><p class="body-copy lead-copy">${escapeHtml(plan.blocks[2].text)}</p></header><div class="rail-card-stack">${plan.railItems.map((item) => `<article class="${dialectClass(plan, "panel")} compact-panel" data-main-item><div class="panel-label">${escapeHtml(item.label)}</div><p>${escapeHtml(item.text)}</p></article>`).join("")}</div></div><p class="footer-copy" data-main-item>${escapeHtml(plan.footer)}</p></section>`;
}

function renderMetricCommentary(plan) {
  if (plan.family === "brutal") {
    return `<section class="layout-root metric-commentary metric-commentary-brutal"><aside class="metric-card" data-main-item><div class="eyebrow">${escapeHtml(plan.blocks[0].text)}</div><div class="metric-number">${escapeHtml(plan.metric.value)}</div><div class="metric-label">${escapeHtml(plan.metric.label)}</div><div class="metric-note">${escapeHtml(plan.metric.note)}</div></aside><div class="metric-copy"><h1 class="headline" data-main-item>${escapeHtml(plan.blocks[1].text)}</h1><p class="body-copy lead-copy" data-main-item>${escapeHtml(plan.blocks[2].text)}</p><div class="sticker-list">${plan.bullets.map((item) => `<article class="panel compact-panel" data-main-item><p>${escapeHtml(item)}</p></article>`).join("")}</div></div></section>`;
  }
  return `<section class="layout-root metric-commentary"><div class="metric-copy" data-main-item><div class="eyebrow">${escapeHtml(plan.blocks[0].text)}</div><h1 class="headline">${escapeHtml(plan.blocks[1].text)}</h1><p class="body-copy lead-copy">${escapeHtml(plan.blocks[2].text)}</p><ul class="bullet-list">${renderList(plan.bullets)}</ul></div><aside class="metric-card" data-main-item><div class="metric-number">${escapeHtml(plan.metric.value)}</div><div class="metric-label">${escapeHtml(plan.metric.label)}</div><div class="metric-note">${escapeHtml(plan.metric.note)}</div></aside></section>`;
}

function renderComparisonBands(plan) {
  if (plan.family === "poster") {
    return `<section class="layout-root comparison-bands comparison-bands-poster"><header class="section-header" data-main-item><div class="eyebrow">${escapeHtml(plan.blocks[0].text)}</div><h1 class="headline">${escapeHtml(plan.blocks[1].text)}</h1><p class="body-copy lead-copy">${escapeHtml(plan.blocks[2].text)}</p></header><div class="poster-columns">${plan.columns.map((column) => `<article class="band-card" data-main-item><div class="panel-label">${escapeHtml(column.heading)}</div><ul>${renderList(column.points)}</ul></article>`).join("")}</div><p class="footer-copy" data-main-item>${escapeHtml(plan.footer)}</p></section>`;
  }
  if (plan.family === "brutal" || plan.family === "playful") {
    return `<section class="layout-root comparison-bands comparison-bands-bright"><header class="section-header" data-main-item><div class="eyebrow">${escapeHtml(plan.blocks[0].text)}</div><h1 class="headline">${escapeHtml(plan.blocks[1].text)}</h1><p class="body-copy lead-copy">${escapeHtml(plan.blocks[2].text)}</p></header><div class="bright-compare-grid">${plan.columns.map((column) => `<article class="band-card" data-main-item><div class="band-label">${escapeHtml(column.heading)}</div><ul>${renderList(column.points)}</ul></article>`).join("")}</div><p class="footer-copy" data-main-item>${escapeHtml(plan.footer)}</p></section>`;
  }
  return `<section class="layout-root comparison-bands"><header class="section-header" data-main-item><div class="eyebrow">${escapeHtml(plan.blocks[0].text)}</div><h1 class="headline">${escapeHtml(plan.blocks[1].text)}</h1><p class="body-copy lead-copy">${escapeHtml(plan.blocks[2].text)}</p></header><div class="band-stack">${plan.columns.map((column) => `<article class="${dialectClass(plan, "band-card")}" data-main-item><div class="band-label">${escapeHtml(column.heading)}</div><ul>${renderList(column.points)}</ul></article>`).join("")}</div><p class="footer-copy" data-main-item>${escapeHtml(plan.footer)}</p></section>`;
}

function renderCardConstellation(plan) {
  if (plan.family === "organic") {
    return `<section class="layout-root card-constellation card-constellation-organic"><header class="section-header" data-main-item><div class="eyebrow">${escapeHtml(plan.blocks[0].text)}</div><h1 class="headline">${escapeHtml(plan.blocks[1].text)}</h1><p class="body-copy lead-copy">${escapeHtml(plan.blocks[2].text)}</p></header><div class="organic-stack">${plan.cards.map((card) => `<article class="panel organic-card" data-main-item><div class="panel-label">${escapeHtml(card.tag)}</div><h3>${escapeHtml(card.title)}</h3><p>${escapeHtml(card.text)}</p></article>`).join("")}</div><p class="footer-copy" data-main-item>${escapeHtml(plan.footer)}</p></section>`;
  }
  return `<section class="layout-root card-constellation"><header class="section-header" data-main-item><div class="eyebrow">${escapeHtml(plan.blocks[0].text)}</div><h1 class="headline">${escapeHtml(plan.blocks[1].text)}</h1><p class="body-copy lead-copy">${escapeHtml(plan.blocks[2].text)}</p></header><div class="mosaic-grid">${plan.cards.map((card, index) => `<article class="panel mosaic-card span-${index + 1}" data-main-item><div class="panel-label">${escapeHtml(card.tag)}</div><h3>${escapeHtml(card.title)}</h3><p>${escapeHtml(card.text)}</p></article>`).join("")}</div><p class="footer-copy" data-main-item>${escapeHtml(plan.footer)}</p></section>`;
}

function renderProcessRibbon(plan) {
  return `<section class="layout-root process-ribbon"><header class="section-header" data-main-item><div class="eyebrow">${escapeHtml(plan.blocks[0].text)}</div><h1 class="headline">${escapeHtml(plan.blocks[1].text)}</h1><p class="body-copy lead-copy">${escapeHtml(plan.blocks[2].text)}</p></header><div class="ribbon-grid">${plan.steps.map((step) => `<article class="ribbon-step" data-main-item><div class="panel-label">${escapeHtml(step.tag)}</div><h3>${escapeHtml(step.title)}</h3><p>${escapeHtml(step.text)}</p></article>`).join("")}</div><p class="footer-copy" data-main-item>${escapeHtml(plan.footer)}</p></section>`;
}

function renderEvidenceQuote(plan) {
  const entries = plan.bullets ?? plan.commentary ?? plan.railItems ?? [];
  const figure = plan.metric?.value || plan.accentFigure || plan.railTitle || "";
  return `<section class="layout-root evidence-quote"><div class="quote-column" data-main-item><div class="eyebrow">${escapeHtml(plan.blocks[0].text)}</div><h1 class="headline headline-tight">${escapeHtml(plan.blocks[1].text)}</h1><div class="quote-figure">${escapeHtml(figure)}</div><p class="body-copy lead-copy">${escapeHtml(plan.blocks[2].text)}</p></div><div class="evidence-column">${entries.map((entry) => { const label = entry.label || "Evidence"; const text = entry.text || entry; return `<article class="${dialectClass(plan, "panel")} compact-panel" data-main-item><div class="panel-label">${escapeHtml(label)}</div><p>${escapeHtml(text)}</p></article>`; }).join("")}</div></section>`;
}

function renderChronologyMatrix(plan) {
  return `<section class="layout-root chronology-matrix"><header class="section-header" data-main-item><div class="eyebrow">${escapeHtml(plan.blocks[0].text)}</div><h1 class="headline">${escapeHtml(plan.blocks[1].text)}</h1><p class="body-copy lead-copy">${escapeHtml(plan.blocks[2].text)}</p></header><div class="matrix-grid">${plan.cells.map((cell) => `<article class="panel matrix-cell" data-main-item><div class="panel-label">${escapeHtml(cell.date)}</div><h3>${escapeHtml(cell.title)}</h3><p>${escapeHtml(cell.text)}</p></article>`).join("")}</div><p class="footer-copy" data-main-item>${escapeHtml(plan.footer)}</p></section>`;
}

function renderManifestoWall(plan) {
  if (plan.family === "brutal" || plan.family === "playful") {
    return `<section class="layout-root manifesto-wall manifesto-wall-bright"><header class="section-header" data-main-item><div class="eyebrow">${escapeHtml(plan.blocks[0].text)}</div><h1 class="headline">${escapeHtml(plan.blocks[1].text)}</h1><p class="body-copy lead-copy">${escapeHtml(plan.blocks[2].text)}</p></header><div class="pillar-grid staggered-pillars">${plan.pillars.map((pillar, index) => `<article class="pillar-card pillar-${index + 1}" data-main-item><h3>${escapeHtml(pillar.title)}</h3><p>${escapeHtml(pillar.text)}</p></article>`).join("")}</div><p class="footer-copy" data-main-item>${escapeHtml(plan.footer)}</p></section>`;
  }
  if (plan.family === "dark-editorial") {
    return `<section class="layout-root manifesto-wall manifesto-wall-editorial"><header class="section-header" data-main-item><div class="eyebrow">${escapeHtml(plan.blocks[0].text)}</div><h1 class="headline">${escapeHtml(plan.blocks[1].text)}</h1><p class="body-copy lead-copy">${escapeHtml(plan.blocks[2].text)}</p></header><div class="ledger-grid editorial-pillars">${plan.pillars.map((pillar) => `<article class="ledger-card" data-main-item><div class="panel-label">${escapeHtml(pillar.title)}</div><p>${escapeHtml(pillar.text)}</p></article>`).join("")}</div><p class="footer-copy" data-main-item>${escapeHtml(plan.footer)}</p></section>`;
  }
  return `<section class="layout-root manifesto-wall"><header class="section-header" data-main-item><div class="eyebrow">${escapeHtml(plan.blocks[0].text)}</div><h1 class="headline">${escapeHtml(plan.blocks[1].text)}</h1><p class="body-copy lead-copy">${escapeHtml(plan.blocks[2].text)}</p></header><div class="pillar-grid">${plan.pillars.map((pillar) => `<article class="${dialectClass(plan, "pillar-card")}" data-main-item><h3>${escapeHtml(pillar.title)}</h3><p>${escapeHtml(pillar.text)}</p></article>`).join("")}</div><p class="footer-copy" data-main-item>${escapeHtml(plan.footer)}</p></section>`;
}

function renderLedgerColumns(plan) {
  const entries = plan.commentary || plan.columns || plan.railItems || [];
  return `<section class="layout-root ledger-columns"><header class="section-header" data-main-item><div class="eyebrow">${escapeHtml(plan.blocks[0].text)}</div><h1 class="headline">${escapeHtml(plan.blocks[1].text)}</h1><p class="body-copy lead-copy">${escapeHtml(plan.blocks[2].text)}</p></header><div class="ledger-grid">${entries.map((item) => { const heading = item.label || item.heading || "Column"; const text = item.text || (item.points ? item.points.join(" / ") : ""); return `<article class="${dialectClass(plan, "panel")} ledger-card" data-main-item><div class="panel-label">${escapeHtml(heading)}</div><p>${escapeHtml(text)}</p></article>`; }).join("")}</div><p class="footer-copy" data-main-item>${escapeHtml(plan.footer || "")}</p></section>`;
}

// ── 10 style-specific cover prototypes ────────────────────────────────────

function renderCoverSwissRail(plan) {
  const notes = plan.notes.slice(0, 3);
  return `<section class="layout-root cover-swiss-rail"><header class="swiss-header" data-main-item><div class="eyebrow">${escapeHtml(plan.blocks[0].text)}</div><div class="figure-overline">${escapeHtml(plan.yearRange)}</div></header><div class="swiss-main" data-main-item><h1 class="headline">${escapeHtml(plan.blocks[1].text)}</h1><p class="subhead">${escapeHtml(plan.blocks[2].text)}</p></div><div class="swiss-rail">${notes.map((note) => `<article class="note-strip" data-main-item><div class="panel-label">${escapeHtml(note.label)}</div><p>${escapeHtml(note.text)}</p></article>`).join("")}</div></section>`;
}

function renderCoverZenVoid(plan) {
  return `<section class="layout-root cover-zen-void"><div class="zen-void-spacer" aria-hidden="true"></div><div class="zen-content" data-main-item><div class="figure-overline">${escapeHtml(plan.yearRange)}</div><h1 class="headline">${escapeHtml(plan.blocks[1].text)}</h1><p class="subhead">${escapeHtml(plan.blocks[2].text)}</p></div><div class="zen-anchor" data-main-item><div class="zen-rule"></div><div class="eyebrow">${escapeHtml(plan.blocks[0].text)}</div><p class="body-copy">${escapeHtml(plan.blocks[3].text)}</p></div></section>`;
}

function renderCoverRisoPoster(plan) {
  return `<section class="layout-root cover-riso-poster"><div class="riso-main" data-main-item><div class="eyebrow">${escapeHtml(plan.blocks[0].text)}</div><h1 class="headline riso-headline">${escapeHtml(plan.blocks[1].text)}</h1><p class="body-copy">${escapeHtml(plan.blocks[2].text)}</p></div><aside class="riso-side"><div class="riso-year" data-main-item>${escapeHtml(plan.yearRange)}</div><div class="riso-notes">${plan.notes.map((note) => `<article class="panel compact-panel" data-main-item><div class="panel-label">${escapeHtml(note.label)}</div><p>${escapeHtml(note.text)}</p></article>`).join("")}</div></aside></section>`;
}

function renderCoverBauhausFrame(plan) {
  return `<section class="layout-root cover-bauhaus-frame"><div class="bauhaus-meta" data-main-item><div class="figure-overline">${escapeHtml(plan.yearRange)}</div><div class="eyebrow">${escapeHtml(plan.blocks[0].text)}</div></div><div class="bauhaus-accent" data-main-item><div class="geo-block"></div></div><div class="bauhaus-title" data-main-item><h1 class="headline">${escapeHtml(plan.blocks[1].text)}</h1><p class="subhead">${escapeHtml(plan.blocks[2].text)}</p></div><div class="bauhaus-notes">${plan.notes.map((note) => `<article class="panel compact-panel" data-main-item><div class="panel-label">${escapeHtml(note.label)}</div><p>${escapeHtml(note.text)}</p></article>`).join("")}</div></section>`;
}

function renderCoverOrganicCluster(plan) {
  return `<section class="layout-root cover-organic-cluster"><div class="organic-title-block" data-main-item><div class="eyebrow">${escapeHtml(plan.blocks[0].text)}</div><h1 class="headline">${escapeHtml(plan.blocks[1].text)}</h1><p class="subhead">${escapeHtml(plan.blocks[2].text)}</p><div class="figure-overline">${escapeHtml(plan.yearRange)}</div></div><div class="organic-bubbles">${plan.notes.map((note, i) => `<article class="bubble-note bubble-${i + 1}" data-main-item><div class="panel-label">${escapeHtml(note.label)}</div><p>${escapeHtml(note.text)}</p></article>`).join("")}</div></section>`;
}

function renderCoverDecoAxis(plan) {
  return `<section class="layout-root cover-deco-axis"><div class="deco-rule-top" data-main-item></div><div class="deco-title" data-main-item><div class="eyebrow">${escapeHtml(plan.blocks[0].text)}</div><h1 class="headline">${escapeHtml(plan.blocks[1].text)}</h1><p class="subhead">${escapeHtml(plan.blocks[2].text)}</p><div class="figure-overline">${escapeHtml(plan.yearRange)}</div></div><div class="deco-panel-row">${plan.notes.map((note) => `<article class="panel compact-panel" data-main-item><div class="panel-label">${escapeHtml(note.label)}</div><p>${escapeHtml(note.text)}</p></article>`).join("")}</div><div class="deco-rule-bottom" data-main-item></div></section>`;
}

function renderCoverBrutalStack(plan) {
  return `<section class="layout-root cover-brutal-stack"><div class="brutal-head" data-main-item><div class="eyebrow">${escapeHtml(plan.blocks[0].text)}</div><h1 class="headline brutal-headline">${escapeHtml(plan.blocks[1].text)}</h1></div><div class="brutal-stickers">${plan.notes.map((note, i) => `<article class="sticker-card sticker-${i + 1}" data-main-item><div class="panel-label">${escapeHtml(note.label)}</div><p>${escapeHtml(note.text)}</p></article>`).join("")}</div><div class="brutal-foot" data-main-item><p class="subhead">${escapeHtml(plan.blocks[2].text)}</p><div class="figure-overline">${escapeHtml(plan.yearRange)}</div></div></section>`;
}

function renderCoverHorizonSignal(plan) {
  const signals = [{ label: "Range", value: plan.yearRange }, ...plan.notes.map((n) => ({ label: n.label, value: n.text }))];
  return `<section class="layout-root cover-horizon-signal"><div class="horizon-sky" data-main-item><div class="eyebrow">${escapeHtml(plan.blocks[0].text)}</div><h1 class="headline">${escapeHtml(plan.blocks[1].text)}</h1><p class="subhead">${escapeHtml(plan.blocks[2].text)}</p></div><div class="horizon-grid">${signals.slice(0, 4).map((s) => `<article class="signal-block" data-main-item><div class="panel-label">${escapeHtml(s.label)}</div><p>${escapeHtml(s.value)}</p></article>`).join("")}</div></section>`;
}

function renderCoverEditorialLedger(plan) {
  return `<section class="layout-root cover-editorial-ledger"><div class="ledger-col-a" data-main-item><div class="eyebrow">${escapeHtml(plan.blocks[0].text)}</div><div class="figure-overline">${escapeHtml(plan.yearRange)}</div><h1 class="headline headline-tight">${escapeHtml(plan.blocks[1].text)}</h1></div><div class="ledger-col-b" data-main-item><p class="subhead">${escapeHtml(plan.blocks[2].text)}</p><p class="body-copy">${escapeHtml(plan.blocks[3].text)}</p></div><aside class="ledger-col-c">${plan.notes.map((note) => `<article class="panel compact-panel" data-main-item><div class="panel-label">${escapeHtml(note.label)}</div><p>${escapeHtml(note.text)}</p></article>`).join("")}</aside></section>`;
}

function renderCoverMemphisSplash(plan) {
  return `<section class="layout-root cover-memphis-splash"><div class="memphis-title" data-main-item><h1 class="headline memphis-headline">${escapeHtml(plan.blocks[1].text)}</h1></div><div class="memphis-meta" data-main-item><div class="memphis-year">${escapeHtml(plan.yearRange)}</div><div class="eyebrow">${escapeHtml(plan.blocks[0].text)}</div></div><div class="memphis-subhead" data-main-item><p class="subhead">${escapeHtml(plan.blocks[2].text)}</p></div><div class="memphis-badges">${plan.notes.map((note, i) => `<article class="badge-card badge-${i + 1}" data-main-item><div class="panel-label">${escapeHtml(note.label)}</div><p>${escapeHtml(note.text)}</p></article>`).join("")}</div></section>`;
}

// ── renderer registry ──────────────────────────────────────────────────────

const renderers = {
  "hero-cover": renderHeroCover,
  "editorial-thesis": renderEditorialThesis,
  "offset-timeline": renderOffsetTimeline,
  "story-rail": renderStoryRail,
  "metric-commentary": renderMetricCommentary,
  "comparison-bands": renderComparisonBands,
  "card-constellation": renderCardConstellation,
  "process-ribbon": renderProcessRibbon,
  "evidence-quote": renderEvidenceQuote,
  "chronology-matrix": renderChronologyMatrix,
  "manifesto-wall": renderManifestoWall,
  "ledger-columns": renderLedgerColumns,
  "cover-swiss-rail": renderCoverSwissRail,
  "cover-zen-void": renderCoverZenVoid,
  "cover-riso-poster": renderCoverRisoPoster,
  "cover-bauhaus-frame": renderCoverBauhausFrame,
  "cover-organic-cluster": renderCoverOrganicCluster,
  "cover-deco-axis": renderCoverDecoAxis,
  "cover-brutal-stack": renderCoverBrutalStack,
  "cover-horizon-signal": renderCoverHorizonSignal,
  "cover-editorial-ledger": renderCoverEditorialLedger,
  "cover-memphis-splash": renderCoverMemphisSplash,
};

export function renderPageBody(plan) {
  const renderer = renderers[plan.layoutId];
  if (!renderer) throw new Error(`Unsupported layout prototype: ${plan.layoutId}`);
  return renderer(plan);
}
