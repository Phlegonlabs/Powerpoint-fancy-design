function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function renderBalancedQuadrants(plan) {
  return `<section class="layout-root balanced-quadrants"><header class="section-header" data-main-item><div class="eyebrow">${escapeHtml(plan.blocks[0].text)}</div><h1 class="headline">${escapeHtml(plan.blocks[1].text)}</h1><p class="body-copy lead-copy">${escapeHtml(plan.blocks[2].text)}</p></header><div class="quadrant-grid">${plan.cards.map((card, index) => `<article class="quadrant-card quadrant-${index + 1}" data-main-item><div class="panel-label">${escapeHtml(card.tag)}</div><h3>${escapeHtml(card.title)}</h3><p>${escapeHtml(card.text)}</p></article>`).join("")}</div><p class="footer-copy" data-main-item>${escapeHtml(plan.footer)}</p></section>`;
}

export function renderMomentumCascade(plan) {
  return `<section class="layout-root momentum-cascade"><header class="section-header" data-main-item><div class="eyebrow">${escapeHtml(plan.blocks[0].text)}</div><h1 class="headline">${escapeHtml(plan.blocks[1].text)}</h1><p class="body-copy lead-copy">${escapeHtml(plan.blocks[2].text)}</p></header><div class="cascade-row">${plan.events.map((event, index) => `<article class="cascade-card cascade-${index + 1}" data-main-item><div class="panel-label">${escapeHtml(event.date)}</div><h3>${escapeHtml(event.title)}</h3><p>${escapeHtml(event.text)}</p></article>`).join("")}</div><p class="footer-copy" data-main-item>${escapeHtml(plan.footer)}</p></section>`;
}

export function renderRolloutLadder(plan) {
  const primary = plan.cells.slice(0, 4);
  const secondary = plan.cells.slice(4, 8);
  return `<section class="layout-root rollout-ladder"><header class="section-header" data-main-item><div class="eyebrow">${escapeHtml(plan.blocks[0].text)}</div><h1 class="headline">${escapeHtml(plan.blocks[1].text)}</h1><p class="body-copy lead-copy">${escapeHtml(plan.blocks[2].text)}</p></header><div class="ladder-primary">${primary.map((cell) => `<article class="ladder-card primary-card" data-main-item><div class="panel-label">${escapeHtml(cell.date)}</div><h3>${escapeHtml(cell.title)}</h3><p>${escapeHtml(cell.text)}</p></article>`).join("")}</div><div class="ladder-secondary">${secondary.map((cell) => `<article class="ladder-card secondary-card" data-main-item><div class="panel-label">${escapeHtml(cell.date)}</div><h3>${escapeHtml(cell.title)}</h3><p>${escapeHtml(cell.text)}</p></article>`).join("")}</div><p class="footer-copy" data-main-item>${escapeHtml(plan.footer)}</p></section>`;
}

export function renderClosingGrid(plan) {
  return `<section class="layout-root closing-grid"><header class="section-header" data-main-item><div class="eyebrow">${escapeHtml(plan.blocks[0].text)}</div><h1 class="headline">${escapeHtml(plan.blocks[1].text)}</h1><p class="body-copy lead-copy">${escapeHtml(plan.blocks[2].text)}</p></header><div class="closing-quadrants">${plan.pillars.map((pillar, index) => `<article class="closing-card closing-${index + 1}" data-main-item><h3>${escapeHtml(pillar.title)}</h3><p>${escapeHtml(pillar.text)}</p></article>`).join("")}</div><p class="footer-copy" data-main-item>${escapeHtml(plan.footer)}</p></section>`;
}

export const publicStageRenderers = {
  "balanced-quadrants": renderBalancedQuadrants,
  "momentum-cascade": renderMomentumCascade,
  "rollout-ladder": renderRolloutLadder,
  "closing-grid": renderClosingGrid,
};
