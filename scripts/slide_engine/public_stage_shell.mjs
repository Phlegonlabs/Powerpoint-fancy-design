export function getPublicStageShellCss() {
  return `
    .balanced-quadrants,.momentum-cascade,.rollout-ladder,.closing-grid{grid-template-rows:auto auto auto;align-content:start;gap:20px}
    .balanced-quadrants .headline,.momentum-cascade .headline,.rollout-ladder .headline,.closing-grid .headline{font-size:60px;max-width:1120px}
    .quadrant-grid,.cascade-row,.ladder-primary,.ladder-secondary,.closing-quadrants{display:grid;gap:16px;align-items:start}
    .quadrant-grid,.closing-quadrants{grid-template-columns:1fr 1fr}
    .cascade-row,.ladder-primary,.ladder-secondary{grid-template-columns:repeat(4,1fr)}
    .quadrant-card,.cascade-card,.ladder-card,.closing-card{background:var(--panel);border:1px solid var(--line);padding:18px 20px}
    .quadrant-card h3,.cascade-card h3,.ladder-card h3,.closing-card h3{margin:0 0 10px;font-size:24px;line-height:1.16;font-family:var(--titleFont)}
    .quadrant-card p,.cascade-card p,.ladder-card p,.closing-card p{margin:0;font-size:19px;line-height:1.32}
    .quadrant-card{min-height:132px}
    .closing-card{min-height:120px}
    .cascade-row{position:relative;padding-top:10px}
    .cascade-row::before{content:"";position:absolute;left:8%;right:8%;top:54px;height:2px;background:linear-gradient(90deg, transparent, var(--accent), transparent);opacity:.32}
    .cascade-card{position:relative;min-height:176px;background:var(--panelStrong)}
    .cascade-1{transform:translateY(0)}
    .cascade-2{transform:translateY(24px)}
    .cascade-3{transform:translateY(8px)}
    .cascade-4{transform:translateY(24px)}
    .cascade-card::after{content:"";position:absolute;top:40px;left:28px;width:10px;height:10px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 6px color-mix(in srgb, var(--panelStrong) 90%, transparent)}
    .ladder-primary{grid-template-columns:repeat(4,1fr)}
    .ladder-secondary{grid-template-columns:repeat(4,1fr)}
    .primary-card{min-height:128px;border-top:3px solid var(--accent)}
    .secondary-card{min-height:108px;opacity:.92}
    .closing-grid .footer-copy{text-align:left}
  `;
}
