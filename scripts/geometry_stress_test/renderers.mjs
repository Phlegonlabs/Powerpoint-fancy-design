function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function tableMarkup(headers, rows, ratioLabel) {
  const headerHtml = headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("");
  const bodyHtml = rows
    .map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`)
    .join("");
  return `
    <div class="table-wrap" data-main-item data-geometry-group="${ratioLabel}" data-geometry-ratio="2.96" data-row-count="${rows.length}">
      <table class="stress-table">
        <thead><tr>${headerHtml}</tr></thead>
        <tbody>${bodyHtml}</tbody>
      </table>
    </div>
  `;
}

function renderOrgChart(spec) {
  const middle = spec.middleNodes
    .map((text) => `<div class="geo-box middle-box">${escapeHtml(text)}</div>`)
    .join("");
  const bottom = spec.bottomNodes
    .map((text) => `<div class="geo-box bottom-box">${escapeHtml(text)}</div>`)
    .join("");

  return `
    <section class="layout-root geometry-layout">
      <header class="section-header" data-main-item>
        <div class="eyebrow">${escapeHtml(spec.eyebrow)}</div>
        <h1 class="headline headline-wide">${escapeHtml(spec.title)}</h1>
        <p class="body-copy lead-copy">${escapeHtml(spec.summary)}</p>
      </header>
      <section class="diagram-frame org-chart" data-main-item data-geometry-group="org-chart" data-geometry-ratio="2.96">
        <div class="connector connector-top"></div>
        <div class="connector connector-mid-left"></div>
        <div class="connector connector-mid-right"></div>
        <div class="connector connector-bottom"></div>
        <div class="geo-box top-box">${escapeHtml(spec.topNode)}</div>
        <div class="row middle-row">${middle}</div>
        <div class="row bottom-row">${bottom}</div>
      </section>
      <p class="footer-copy" data-main-item>${escapeHtml(spec.footer)}</p>
    </section>
  `;
}

function renderSystemMap(spec) {
  const rows = spec.rows
    .map((row, index) => {
      const cols = row.nodes.map((node) => `<div class="geo-box map-box">${escapeHtml(node)}</div>`).join("");
      return `
        <div class="map-row map-row-${index + 1}">
          <div class="row-label">${escapeHtml(row.label)}</div>
          <div class="row-track row-track-${row.nodes.length}">${cols}</div>
        </div>
      `;
    })
    .join("");

  return `
    <section class="layout-root geometry-layout">
      <header class="section-header" data-main-item>
        <div class="eyebrow">${escapeHtml(spec.eyebrow)}</div>
        <h1 class="headline">${escapeHtml(spec.title)}</h1>
        <p class="body-copy lead-copy">${escapeHtml(spec.summary)}</p>
      </header>
      <section class="diagram-frame system-map" data-main-item data-geometry-group="system-map" data-geometry-ratio="2.96">
        <div class="map-spine spine-1"></div>
        <div class="map-spine spine-2"></div>
        ${rows}
      </section>
      <p class="footer-copy" data-main-item>${escapeHtml(spec.footer)}</p>
    </section>
  `;
}

function renderTable(spec) {
  return `
    <section class="layout-root geometry-layout">
      <header class="section-header" data-main-item>
        <div class="eyebrow">${escapeHtml(spec.eyebrow)}</div>
        <h1 class="headline">${escapeHtml(spec.title)}</h1>
        <p class="body-copy lead-copy">${escapeHtml(spec.summary)}</p>
      </header>
      ${tableMarkup(spec.headers, spec.rows, spec.id)}
      <p class="footer-copy" data-main-item>${escapeHtml(spec.footer)}</p>
    </section>
  `;
}

function renderComparison(spec) {
  const columns = spec.columns
    .map(
      (column) => `
        <article class="compare-card" data-main-item>
          <div class="panel-label">${escapeHtml(column.heading)}</div>
          <ul>${column.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
        </article>
      `
    )
    .join("");

  return `
    <section class="layout-root comparison-layout">
      <header class="section-header" data-main-item>
        <div class="eyebrow">${escapeHtml(spec.eyebrow)}</div>
        <h1 class="headline">${escapeHtml(spec.title)}</h1>
        <p class="body-copy lead-copy">${escapeHtml(spec.summary)}</p>
      </header>
      <section class="compare-grid">${columns}</section>
      <p class="footer-copy" data-main-item>${escapeHtml(spec.footer)}</p>
    </section>
  `;
}

function renderProcessFlow(spec) {
  const steps = spec.steps
    .map(
      (step, index) => `
        <article class="flow-step" data-main-item>
          <div class="panel-label">${escapeHtml(step.tag)}</div>
          <h3>${escapeHtml(step.title)}</h3>
          <p>${escapeHtml(step.text)}</p>
          ${index < spec.steps.length - 1 ? '<div class="flow-arrow" aria-hidden="true"></div>' : ""}
        </article>
      `
    )
    .join("");

  return `
    <section class="layout-root geometry-layout">
      <header class="section-header" data-main-item>
        <div class="eyebrow">${escapeHtml(spec.eyebrow)}</div>
        <h1 class="headline">${escapeHtml(spec.title)}</h1>
        <p class="body-copy lead-copy">${escapeHtml(spec.summary)}</p>
      </header>
      <section class="flow-grid" data-main-item data-geometry-group="process-flow" data-geometry-ratio="2.96">
        ${steps}
      </section>
      <p class="footer-copy" data-main-item>${escapeHtml(spec.footer)}</p>
    </section>
  `;
}

function renderRiskGrid(spec) {
  const items = spec.items
    .map(
      (item) => `
        <article class="risk-card" data-main-item>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.text)}</p>
        </article>
      `
    )
    .join("");

  return `
    <section class="layout-root geometry-layout">
      <header class="section-header" data-main-item>
        <div class="eyebrow">${escapeHtml(spec.eyebrow)}</div>
        <h1 class="headline">${escapeHtml(spec.title)}</h1>
        <p class="body-copy lead-copy">${escapeHtml(spec.summary)}</p>
      </header>
      <section class="risk-grid" data-main-item data-geometry-group="risk-grid" data-geometry-ratio="2.96">
        ${items}
      </section>
      <p class="footer-copy" data-main-item>${escapeHtml(spec.footer)}</p>
    </section>
  `;
}

function renderClosing(spec) {
  const pillars = spec.pillars
    .map(
      (pillar) => `
        <article class="pillar-card" data-main-item>
          <h3>${escapeHtml(pillar.title)}</h3>
          <p>${escapeHtml(pillar.text)}</p>
        </article>
      `
    )
    .join("");

  return `
    <section class="layout-root closing-layout">
      <header class="section-header" data-main-item>
        <div class="eyebrow">${escapeHtml(spec.eyebrow)}</div>
        <h1 class="headline">${escapeHtml(spec.title)}</h1>
        <p class="body-copy lead-copy">${escapeHtml(spec.summary)}</p>
      </header>
      <section class="pillar-grid">${pillars}</section>
      <p class="footer-copy" data-main-item>${escapeHtml(spec.footer)}</p>
    </section>
  `;
}

function renderCover(spec) {
  const focusAreas = (spec.focusAreas || [])
    .map((item) => `<div class="cover-tag">${escapeHtml(item)}</div>`)
    .join("");
  const notes = spec.notes
    .map(
      (note) => `
        <article class="info-card" data-main-item>
          <div class="panel-label">${escapeHtml(note.label)}</div>
          <p>${escapeHtml(note.text)}</p>
        </article>
      `
    )
    .join("");

  return `
    <section class="layout-root cover-layout">
      <div class="cover-copy" data-main-item>
        <div class="eyebrow">${escapeHtml(spec.eyebrow)}</div>
        <h1 class="headline">${escapeHtml(spec.title)}</h1>
        <p class="subhead">${escapeHtml(spec.subtitle)}</p>
        <p class="body-copy">${escapeHtml(spec.summary)}</p>
      </div>
      <aside class="info-stack">${notes}</aside>
      <div class="cover-band" data-main-item>${focusAreas}</div>
    </section>
  `;
}

export function renderBody(spec) {
  const map = {
    cover: renderCover,
    "org-chart": renderOrgChart,
    "system-map": renderSystemMap,
    table: renderTable,
    matrix: renderTable,
    comparison: renderComparison,
    "process-flow": renderProcessFlow,
    "risk-grid": renderRiskGrid,
    closing: renderClosing,
  };
  return map[spec.kind](spec);
}
