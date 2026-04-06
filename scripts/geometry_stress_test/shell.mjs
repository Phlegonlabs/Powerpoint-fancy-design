import { pageSpecs, SAFE_ZONE } from "./page_specs.mjs";
import { darkThemes } from "../twitter_style_cases/styles.mjs";
import { renderBody } from "./renderers.mjs";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function themeVars(theme) {
  const vars = {
    ...theme.vars,
    safeTop: `${SAFE_ZONE.top}px`,
    safeBottom: `${SAFE_ZONE.bottom}px`,
    contentTop: `${SAFE_ZONE.innerTop}px`,
    contentBottom: `${900 - SAFE_ZONE.innerBottom}px`,
  };
  return Object.entries(vars).map(([key, value]) => `--${key}:${value};`).join("");
}

function shellCss(theme) {
  const isDark = darkThemes.has(theme.id);
  return `
    :root{${themeVars(theme)}}
    *{box-sizing:border-box}
    html,body{margin:0;width:1600px;height:900px;overflow:hidden;background:${isDark ? "#08090f" : "#ece5da"}}
    body{font-family:var(--bodyFont);color:var(--fg);-webkit-font-smoothing:antialiased;text-rendering:geometricPrecision}
    .slide{position:relative;width:1600px;height:900px;overflow:hidden;background:var(--bg);color:var(--fg);isolation:isolate}
    .slide > *{position:relative;z-index:1}
    .slide > [class^="corner"],
    .slide > .moon,
    .slide > .seal,
    .slide > .calm-rule,
    .slide > .ink-a,
    .slide > .ink-b,
    .slide > .riso-tail,
    .slide > .diag-a,
    .slide > .diag-b,
    .slide > .anchor-block,
    .slide > .blob-a,
    .slide > .blob-b,
    .slide > .frame,
    .slide > .crown,
    .slide > .box-a,
    .slide > .box-b,
    .slide > .box-c,
    .slide > .glow,
    .slide > .grid,
    .slide > .rule-a,
    .slide > .rule-b,
    .slide > .mem-dot,
    .slide > .mem-square,
    .slide > .mem-tri,
    .slide > .mem-zig{z-index:0;pointer-events:none;opacity:.82}
    .chrome-top,.chrome-bottom{position:absolute;left:var(--edge);right:var(--edge);display:flex;align-items:center;justify-content:space-between;font-family:var(--labelFont);font-size:14px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);z-index:2}
    .chrome-top{top:28px}
    .chrome-bottom{bottom:24px}
    .main-frame{position:absolute;left:var(--edge);right:var(--edge);top:var(--contentTop);bottom:var(--contentBottom);z-index:3}
    .layout-root{position:relative;width:100%;height:100%;display:grid;gap:24px}
    .eyebrow,.panel-label,.row-label{font-family:var(--labelFont);font-size:13px;letter-spacing:.16em;text-transform:uppercase;color:var(--accent)}
    .headline{margin:0;font-family:var(--titleFont);font-size:74px;line-height:.95;letter-spacing:-.04em;max-width:980px}
    .headline-wide{max-width:1100px}
    .subhead,.body-copy,.footer-copy,.info-card p,.compare-card p,.flow-step p,.risk-card p,.pillar-card p,.geo-box,.stress-table td,.stress-table th{
      margin:0;
      font-size:24px;
      line-height:1.35;
      color:var(--fg);
    }
    .lead-copy{font-size:26px}
    .footer-copy{align-self:end;color:var(--muted);font-size:18px}
    h3{margin:0 0 10px;font-size:28px;line-height:1.18;font-family:var(--titleFont)}
    .section-header,.cover-copy{display:grid;align-content:start;gap:16px}
    .cover-layout{grid-template-columns:1.02fr .98fr;grid-template-rows:auto 1fr;align-items:start}
    .cover-copy{grid-column:1;grid-row:1}
    .info-stack{grid-column:2;grid-row:1 / span 2;display:grid;gap:14px;align-self:stretch}
    .cover-band{
      grid-column:1;grid-row:2;align-self:end;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));
      gap:12px;padding-top:8px
    }
    .cover-tag{
      padding:14px 16px;border:1px solid var(--line);background:color-mix(in srgb, var(--panelStrong) 86%, transparent);
      font-family:var(--labelFont);font-size:16px;letter-spacing:.12em;text-transform:uppercase;color:var(--accent)
    }
    .info-card,.compare-card,.pillar-card,.risk-card,.flow-step,.table-wrap,.diagram-frame{
      background:var(--panel);
      border:1px solid var(--line);
      padding:18px 20px;
      position:relative;
      overflow:hidden;
    }
    .info-card{display:grid;align-content:start;gap:8px;min-height:154px}
    .info-card,.compare-card,.pillar-card,.risk-card{backdrop-filter:blur(8px)}
    .comparison-layout,.closing-layout,.geometry-layout{grid-template-rows:auto 1fr auto}
    .compare-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;align-self:stretch}
    .compare-card ul{margin:12px 0 0;padding-left:22px}
    .compare-card li+li{margin-top:10px}
    .compare-card li{font-size:20px;line-height:1.42}
    .compare-card{display:grid;align-content:start;gap:10px;min-height:100%}
    .pillar-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;align-self:stretch}
    .pillar-card{display:grid;align-content:start;gap:10px;min-height:100%}
    .diagram-frame{padding:22px;min-height:0}
    .org-chart{display:grid;grid-template-rows:120px 150px 150px;gap:26px}
    .row{display:grid;gap:18px}
    .middle-row{grid-template-columns:repeat(3,1fr)}
    .bottom-row{grid-template-columns:repeat(6,1fr)}
    .geo-box{
      display:flex;align-items:center;justify-content:center;text-align:center;
      min-height:96px;background:color-mix(in srgb, var(--panelStrong) 88%, transparent);
      border:1px solid var(--line);padding:12px 10px;font-weight:600;
    }
    .top-box{width:32%;justify-self:center}
    .middle-box{min-height:110px}
    .bottom-box{min-height:94px;font-size:18px}
    .connector{position:absolute;background:color-mix(in srgb, var(--accent) 86%, transparent);border-radius:999px;opacity:.9}
    .connector-top{left:50%;top:102px;width:3px;height:56px;transform:translateX(-50%)}
    .connector-mid-left{left:17%;top:158px;width:66%;height:3px}
    .connector-mid-right{left:50%;top:302px;width:3px;height:56px;transform:translateX(-50%)}
    .connector-bottom{left:8%;top:358px;width:84%;height:3px}
    .system-map{display:grid;grid-template-rows:repeat(3,1fr);gap:18px}
    .map-row{display:grid;grid-template-columns:140px 1fr;gap:18px;align-items:center}
    .row-track{display:grid;gap:14px}
    .row-track-3{grid-template-columns:repeat(3,1fr)}
    .row-track-4{grid-template-columns:repeat(4,1fr)}
    .map-box{min-height:100px}
    .map-spine{position:absolute;left:164px;right:22px;height:2px;background:color-mix(in srgb, var(--accent) 68%, transparent)}
    .spine-1{top:34%}
    .spine-2{top:66%}
    .table-wrap{display:grid;align-self:stretch;height:100%;padding:0}
    .stress-table{width:100%;height:100%;border-collapse:collapse;table-layout:fixed}
    .stress-table th,.stress-table td{padding:14px 16px;border:1px solid var(--line);vertical-align:top}
    .stress-table thead tr{height:60px}
    .table-wrap[data-row-count="5"] .stress-table tbody tr{height:calc((100% - 60px) / 5)}
    .table-wrap[data-row-count="4"] .stress-table tbody tr{height:calc((100% - 60px) / 4)}
    .stress-table th{font-family:var(--labelFont);font-size:17px;text-transform:uppercase;letter-spacing:.14em;color:var(--accent);background:color-mix(in srgb, var(--panelStrong) 92%, transparent)}
    .stress-table td{font-size:20px;background:color-mix(in srgb, var(--panel) 78%, transparent)}
    .flow-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:16px;align-self:stretch}
    .flow-step{padding-right:32px;display:grid;align-content:start;gap:10px;min-height:100%}
    .flow-arrow{
      position:absolute;top:50%;right:10px;width:30px;height:3px;transform:translateY(-50%);
      background:color-mix(in srgb, var(--accent) 86%, transparent)
    }
    .flow-arrow::after{
      content:"";position:absolute;right:-2px;top:-4px;border-top:5px solid transparent;
      border-bottom:5px solid transparent;border-left:10px solid color-mix(in srgb, var(--accent) 86%, transparent)
    }
    .risk-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;align-self:stretch}
    .risk-card{min-height:100%;display:grid;align-content:start;gap:10px}
    .family-minimal .compare-card,
    .family-minimal .info-card,
    .family-minimal .pillar-card,
    .family-minimal .risk-card,
    .family-minimal .flow-step,
    .family-minimal .diagram-frame,
    .family-minimal .table-wrap{background:rgba(255,255,255,.18);border-color:rgba(45,58,92,.12)}
    .family-luxury .compare-card,
    .family-luxury .info-card,
    .family-luxury .pillar-card,
    .family-luxury .risk-card,
    .family-luxury .flow-step,
    .family-luxury .diagram-frame,
    .family-luxury .table-wrap,
    .family-dark-editorial .compare-card,
    .family-dark-editorial .info-card,
    .family-dark-editorial .pillar-card,
    .family-dark-editorial .risk-card,
    .family-dark-editorial .flow-step,
    .family-dark-editorial .diagram-frame,
    .family-dark-editorial .table-wrap{background:rgba(255,255,255,.03)}
    .family-brutal .compare-card,
    .family-brutal .info-card,
    .family-brutal .pillar-card,
    .family-brutal .risk-card,
    .family-brutal .flow-step,
    .family-brutal .diagram-frame,
    .family-brutal .table-wrap{border:4px solid var(--line);box-shadow:10px 10px 0 rgba(0,0,0,.88)}
    .family-brutal .stress-table th,
    .family-brutal .stress-table td,
    .family-playful .stress-table th,
    .family-playful .stress-table td{border-width:3px}
    .family-playful .compare-card,
    .family-playful .info-card,
    .family-playful .pillar-card,
    .family-playful .risk-card,
    .family-playful .flow-step,
    .family-playful .diagram-frame,
    .family-playful .table-wrap{border:4px solid var(--line);box-shadow:8px 8px 0 rgba(32,32,32,.94);border-radius:22px}
    ${theme.shellCss}
  `;
}

export function renderHtml(theme, spec, index) {
  const total = String(pageSpecs.length).padStart(2, "0");
  const page = String(index + 1).padStart(2, "0");
  return `<!doctype html><html lang="zh-Hans"><head><meta charset="utf-8" /><meta name="viewport" content="width=1600, initial-scale=1" /><link rel="icon" href="data:," /><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /><link href="${theme.fonts}" rel="stylesheet" /><title>${escapeHtml(spec.title)} - ${escapeHtml(theme.zhName)}</title><style>${shellCss(theme)}</style></head><body><div class="slide theme-${theme.id} family-${theme.family}">${theme.ornaments}<div class="chrome-top"><div class="style-id">STYLE ${theme.id.toUpperCase()} / ${escapeHtml(theme.zhName)}</div><div class="meta-id">${escapeHtml(spec.kind)}</div></div><div class="chrome-bottom"><div class="meta-id">geometry-stress</div><div class="page-id">${page} / ${total}</div></div><main class="main-frame">${renderBody(spec)}</main></div></body></html>`;
}
