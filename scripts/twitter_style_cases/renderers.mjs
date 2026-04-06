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
  return `<section class="layout-root editorial-thesis"><div class="thesis-copy" data-main-item><div class="eyebrow">${escapeHtml(plan.blocks[0].text)}</div><h1 class="headline headline-tight">${escapeHtml(plan.blocks[1].text)}</h1><p class="body-copy lead-copy">${escapeHtml(plan.blocks[2].text)}</p><div class="thesis-statement">${escapeHtml(plan.thesis)}</div></div><div class="thesis-rail"><div class="figure-stamp" data-main-item>${escapeHtml(plan.accentFigure)}</div>${plan.commentary.map((item) => `<article class="panel compact-panel" data-main-item><div class="panel-label">${escapeHtml(item.label)}</div><p>${escapeHtml(item.text)}</p></article>`).join("")}</div><p class="footer-copy" data-main-item>${escapeHtml(plan.footer)}</p></section>`;
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
  return `<section class="layout-root story-rail"><aside class="rail-figure" data-main-item><div class="eyebrow">${escapeHtml(plan.blocks[0].text)}</div><div class="rail-number">${escapeHtml(plan.railTitle)}</div><div class="rail-label">${escapeHtml(plan.railSubtitle)}</div><div class="rail-note">${escapeHtml(plan.railNote)}</div></aside><div class="rail-copy"><header class="section-header" data-main-item><h1 class="headline">${escapeHtml(plan.blocks[1].text)}</h1><p class="body-copy lead-copy">${escapeHtml(plan.blocks[2].text)}</p></header><div class="rail-card-stack">${plan.railItems.map((item) => `<article class="panel compact-panel" data-main-item><div class="panel-label">${escapeHtml(item.label)}</div><p>${escapeHtml(item.text)}</p></article>`).join("")}</div></div><p class="footer-copy" data-main-item>${escapeHtml(plan.footer)}</p></section>`;
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
  return `<section class="layout-root comparison-bands"><header class="section-header" data-main-item><div class="eyebrow">${escapeHtml(plan.blocks[0].text)}</div><h1 class="headline">${escapeHtml(plan.blocks[1].text)}</h1><p class="body-copy lead-copy">${escapeHtml(plan.blocks[2].text)}</p></header><div class="band-stack">${plan.columns.map((column) => `<article class="band-card" data-main-item><div class="band-label">${escapeHtml(column.heading)}</div><ul>${renderList(column.points)}</ul></article>`).join("")}</div><p class="footer-copy" data-main-item>${escapeHtml(plan.footer)}</p></section>`;
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
  return `<section class="layout-root evidence-quote"><div class="quote-column" data-main-item><div class="eyebrow">${escapeHtml(plan.blocks[0].text)}</div><h1 class="headline headline-tight">${escapeHtml(plan.blocks[1].text)}</h1><div class="quote-figure">${escapeHtml(figure)}</div><p class="body-copy lead-copy">${escapeHtml(plan.blocks[2].text)}</p></div><div class="evidence-column">${entries.map((entry) => { const label = entry.label || "Evidence"; const text = entry.text || entry; return `<article class="panel compact-panel" data-main-item><div class="panel-label">${escapeHtml(label)}</div><p>${escapeHtml(text)}</p></article>`; }).join("")}</div></section>`;
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
  return `<section class="layout-root manifesto-wall"><header class="section-header" data-main-item><div class="eyebrow">${escapeHtml(plan.blocks[0].text)}</div><h1 class="headline">${escapeHtml(plan.blocks[1].text)}</h1><p class="body-copy lead-copy">${escapeHtml(plan.blocks[2].text)}</p></header><div class="pillar-grid">${plan.pillars.map((pillar) => `<article class="pillar-card" data-main-item><h3>${escapeHtml(pillar.title)}</h3><p>${escapeHtml(pillar.text)}</p></article>`).join("")}</div><p class="footer-copy" data-main-item>${escapeHtml(plan.footer)}</p></section>`;
}

function renderLedgerColumns(plan) {
  const entries = plan.commentary || plan.columns || plan.railItems || [];
  return `<section class="layout-root ledger-columns"><header class="section-header" data-main-item><div class="eyebrow">${escapeHtml(plan.blocks[0].text)}</div><h1 class="headline">${escapeHtml(plan.blocks[1].text)}</h1><p class="body-copy lead-copy">${escapeHtml(plan.blocks[2].text)}</p></header><div class="ledger-grid">${entries.map((item) => { const heading = item.label || item.heading || "Column"; const text = item.text || (item.points ? item.points.join(" / ") : ""); return `<article class="panel ledger-card" data-main-item><div class="panel-label">${escapeHtml(heading)}</div><p>${escapeHtml(text)}</p></article>`; }).join("")}</div><p class="footer-copy" data-main-item>${escapeHtml(plan.footer || "")}</p></section>`;
}

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
};

export function renderPageBody(plan) {
  const renderer = renderers[plan.layoutId];
  if (!renderer) throw new Error(`Unsupported layout prototype: ${plan.layoutId}`);
  return renderer(plan);
}
