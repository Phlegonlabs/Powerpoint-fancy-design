import { SAFE_ZONE } from "./safe_zone.mjs";
import { darkThemes } from "./styles.mjs";
import { renderPageBody } from "./renderers.mjs";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function themeVars(theme) {
  return Object.entries({
    ...theme.vars,
    safeTop: `${SAFE_ZONE.top}px`,
    safeBottom: `${SAFE_ZONE.bottom}px`,
    contentTop: `${SAFE_ZONE.innerTop}px`,
    contentBottom: `${900 - SAFE_ZONE.innerBottom}px`,
  }).map(([key, value]) => `--${key}:${value};`).join("");
}

function variantCss(theme) {
  const map = {
    a: `.theme-a .hero-cover{grid-template-columns:1.06fr .94fr}.theme-a .hero-intro{padding-left:18px;border-left:5px solid var(--accent)}.theme-a .section-header,.theme-a .metric-copy{max-width:780px}.theme-a .panel,.theme-a .band-card,.theme-a .ledger-card,.theme-a .pillar-card{box-shadow:3px 3px 0 rgba(184,80,56,.08)}.theme-a .comparison-bands .band-card{grid-template-columns:.82fr 1.18fr}.theme-a .metric-commentary .metric-card{border-radius:8px}.theme-a .manifesto-wall .pillar-card{border-radius:10px}`,
    b: `.theme-b .hero-cover,.theme-b .editorial-thesis{grid-template-columns:1.28fr .72fr}.theme-b .hero-intro,.theme-b .thesis-copy,.theme-b .section-header{padding-left:70px;max-width:760px}.theme-b .headline{font-size:68px;max-width:700px}.theme-b .story-rail{grid-template-columns:.58fr 1.42fr}.theme-b .rail-figure{border-right:none;padding-right:0;padding-top:18px}.theme-b .comparison-bands .band-card,.theme-b .ledger-columns .ledger-card{grid-template-columns:1fr;min-height:0}.theme-b .band-label{margin-bottom:10px}.theme-b .manifesto-wall .pillar-grid,.theme-b .ledger-columns .ledger-grid{gap:26px}.theme-b .panel,.theme-b .pillar-card,.theme-b .band-card,.theme-b .ledger-card{background:rgba(255,255,255,.22);border-color:rgba(45,58,92,.1)}.theme-b .card-constellation .mosaic-grid{grid-template-columns:1fr 1fr;max-width:860px}.theme-b .mosaic-card{grid-column:span 1!important;grid-row:span 1!important;padding:14px 0 18px;background:transparent;border-left:0;border-right:0;border-bottom:0}.theme-b .manifesto-wall .pillar-grid,.theme-b .ledger-columns .ledger-grid{grid-template-columns:repeat(3,1fr);max-width:none}.theme-b .pillar-card,.theme-b .ledger-card{padding:14px 0 18px;background:transparent;border-left:0;border-right:0;border-bottom:0}`,
    c: `.theme-c .hero-cover{grid-template-columns:1.06fr .94fr}.theme-c .panel,.theme-c .band-card,.theme-c .ledger-card,.theme-c .milestone-card,.theme-c .mosaic-card,.theme-c .matrix-cell{box-shadow:9px 9px 0 rgba(26,92,90,.28),-4px -4px 0 rgba(232,69,107,.18)}.theme-c .panel:nth-child(odd),.theme-c .band-card:nth-child(odd),.theme-c .mosaic-card:nth-child(odd){transform:translate(-2px,2px)}.theme-c .offset-timeline .timeline-row::before{display:none}.theme-c .offset-timeline .timeline-row,.theme-c .card-constellation .mosaic-grid,.theme-c .chronology-matrix .matrix-grid{padding:0 10px}.theme-c .offset-timeline .milestone-card:nth-child(2),.theme-c .offset-timeline .milestone-card:nth-child(4){transform:translateY(16px) rotate(-.3deg)}.theme-c .card-constellation .mosaic-card:nth-child(2){transform:translateY(8px)}.theme-c .card-constellation .mosaic-card:nth-child(4){transform:translateY(-8px)}.theme-c .comparison-bands .band-card,.theme-c .ledger-columns .ledger-card{border-width:2px}`,
    d: `.theme-d .hero-cover{grid-template-columns:1fr 1fr}.theme-d .section-header,.theme-d .hero-intro{position:relative}.theme-d .headline{font-size:78px;max-width:840px}.theme-d .comparison-bands .band-card,.theme-d .ledger-columns .ledger-card{clip-path:polygon(0 0,100% 0,96% 100%,0 100%)}.theme-d .metric-commentary .metric-card{align-self:start;min-height:420px;clip-path:polygon(8% 0,100% 0,100% 100%,0 100%,0 14%)}.theme-d .manifesto-wall .pillar-grid{gap:16px}.theme-d .mosaic-card:nth-child(1){clip-path:polygon(0 0,100% 0,92% 100%,0 100%)}.theme-d .mosaic-card:nth-child(2){clip-path:polygon(10% 0,100% 0,100% 100%,0 100%,0 12%)}.theme-d .mosaic-card:nth-child(3){clip-path:polygon(0 0,100% 0,100% 88%,6% 100%)}.theme-d .mosaic-card:nth-child(4){clip-path:polygon(0 0,94% 0,100% 100%,0 100%)}`,
    e: `.theme-e .hero-cover{grid-template-columns:1.18fr .82fr}.theme-e .headline{max-width:760px}.theme-e .story-rail{grid-template-columns:.72fr 1.28fr}.theme-e .rail-card-stack{grid-template-columns:1fr}.theme-e .panel,.theme-e .band-card,.theme-e .pillar-card,.theme-e .mosaic-card{border-style:solid;box-shadow:none}.theme-e .mosaic-card:nth-child(odd){transform:rotate(-1deg)}.theme-e .mosaic-card:nth-child(even){transform:rotate(.8deg)}.theme-e .card-constellation .mosaic-grid{gap:22px}.theme-e .section-header::after{content:"";width:128px;height:2px;background:rgba(52,45,40,.24);margin-top:4px}.theme-e .manifesto-wall .pillar-grid{padding:0 12px}.theme-e .manifesto-wall .pillar-card{border-radius:30px;transform:none}`,
    f: `.theme-f .layout-root{position:relative}.theme-f .layout-root::before{content:"";position:absolute;left:50%;top:0;bottom:0;width:1px;background:rgba(196,162,101,.18);transform:translateX(-50%)}.theme-f .hero-cover,.theme-f .editorial-thesis{grid-template-columns:1fr 1fr}.theme-f .hero-intro,.theme-f .thesis-copy,.theme-f .section-header{text-align:center;align-items:center;justify-items:center}.theme-f .subhead,.theme-f .body-copy,.theme-f .lead-copy,.theme-f .footer-copy{max-width:760px;text-align:center}.theme-f .stacked-notes{align-content:center}.theme-f .comparison-bands .band-card{grid-template-columns:1fr}.theme-f .band-label{text-align:center}.theme-f .manifesto-wall .pillar-card,.theme-f .mosaic-card{text-align:center}.theme-f .card-constellation .mosaic-grid,.theme-f .manifesto-wall .pillar-grid{grid-template-columns:repeat(4,1fr)}.theme-f .mosaic-card{grid-column:span 1!important;grid-row:span 1!important;min-height:220px}`,
    g: `.theme-g .hero-cover{grid-template-columns:1fr 1fr}.theme-g .hero-intro{padding-top:18px}.theme-g .metric-commentary{grid-template-columns:.88fr 1.12fr}.theme-g .comparison-bands .band-stack{gap:12px;padding:14px 14px 0}.theme-g .comparison-bands .band-card{grid-template-columns:1fr}.theme-g .card-constellation .mosaic-grid,.theme-g .manifesto-wall .pillar-grid{gap:14px;padding:10px 14px 0}.theme-g .band-card:nth-child(1),.theme-g .mosaic-card:nth-child(1),.theme-g .pillar-card:nth-child(1){background:#ffe156;transform:rotate(-.4deg)}.theme-g .band-card:nth-child(2),.theme-g .mosaic-card:nth-child(2),.theme-g .pillar-card:nth-child(2){background:#ff6b6b;transform:rotate(.35deg)}.theme-g .band-card:nth-child(3),.theme-g .mosaic-card:nth-child(3),.theme-g .pillar-card:nth-child(3){background:#4ecdc4;transform:rotate(-.3deg)}.theme-g .band-card:nth-child(4),.theme-g .mosaic-card:nth-child(4),.theme-g .pillar-card:nth-child(4){background:#ffffff;transform:rotate(.45deg)}`,
    h: `.theme-h .hero-cover{grid-template-columns:1.16fr .84fr}.theme-h .story-rail{grid-template-columns:.76fr 1.24fr}.theme-h .comparison-bands .band-card{grid-template-columns:1fr}.theme-h .metric-commentary .metric-card{backdrop-filter:blur(2px)}.theme-h .panel,.theme-h .band-card,.theme-h .ledger-card,.theme-h .pillar-card,.theme-h .mosaic-card,.theme-h .metric-card{background:rgba(6,15,36,.28);border-color:rgba(64,232,208,.28)}.theme-h .metric-copy,.theme-h .section-header{max-width:760px}.theme-h .manifesto-wall .pillar-card{background:rgba(10,22,44,.48)}`,
    i: `.theme-i .hero-cover{grid-template-columns:1.2fr .8fr}.theme-i .headline{max-width:860px}.theme-i .comparison-bands .band-card{grid-template-columns:1fr}.theme-i .story-rail{grid-template-columns:.7fr 1.3fr}.theme-i .panel,.theme-i .band-card,.theme-i .ledger-card,.theme-i .pillar-card,.theme-i .mosaic-card{background:transparent;border-left:0;border-right:0;border-bottom:0;padding:18px 0}.theme-i .stacked-notes{gap:10px}.theme-i .manifesto-wall .pillar-card,.theme-i .ledger-columns .ledger-card{background:transparent}.theme-i .card-constellation .mosaic-grid,.theme-i .manifesto-wall .ledger-grid{gap:24px}`,
    j: `.theme-j .hero-cover{grid-template-columns:1fr 1fr}.theme-j .headline{font-size:74px}.theme-j .stacked-notes{gap:12px}.theme-j .comparison-bands .band-card{grid-template-columns:1fr}.theme-j .process-ribbon .ribbon-grid{gap:12px}.theme-j .manifesto-wall .pillar-grid{gap:16px}.theme-j .band-card:nth-child(1),.theme-j .mosaic-card:nth-child(1),.theme-j .pillar-card:nth-child(1){background:#ffd23f;transform:rotate(-1.5deg)}.theme-j .band-card:nth-child(2),.theme-j .mosaic-card:nth-child(2),.theme-j .pillar-card:nth-child(2){background:#ffffff;transform:rotate(1.2deg)}.theme-j .band-card:nth-child(3),.theme-j .mosaic-card:nth-child(3),.theme-j .pillar-card:nth-child(3){background:#b8a9c9;transform:rotate(-.8deg)}.theme-j .band-card:nth-child(4),.theme-j .mosaic-card:nth-child(4),.theme-j .pillar-card:nth-child(4){background:#2ec4b6;transform:rotate(1.6deg)}.theme-j .mosaic-grid,.theme-j .bright-compare-grid,.theme-j .pillar-grid{padding:6px 10px 0}`,
  };
  return map[theme.id] || "";
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
    .slide > .mem-zig{z-index:0;pointer-events:none}
    .safe-top,.safe-bottom{position:absolute;left:0;width:100%;pointer-events:none;opacity:${isDark ? "0.12" : "0.65"};z-index:0}
    .safe-top{top:0;height:var(--safeTop);background:linear-gradient(180deg, rgba(255,255,255,.06), transparent)}
    .safe-bottom{bottom:0;height:var(--safeBottom);background:linear-gradient(0deg, rgba(255,255,255,.04), transparent)}
    .chrome-top,.chrome-bottom{position:absolute;left:var(--edge);right:var(--edge);display:flex;align-items:center;justify-content:space-between;font-family:var(--labelFont);font-size:14px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);z-index:2}
    .chrome-top{top:28px}
    .chrome-bottom{bottom:24px}
    .style-id,.meta-id,.page-id{opacity:.9}
    .main-frame{position:absolute;left:var(--edge);right:var(--edge);top:var(--contentTop);bottom:var(--contentBottom);z-index:3}
    .layout-root{position:relative;width:100%;height:100%;display:grid;gap:28px;align-content:stretch}
    .eyebrow,.panel-label,.figure-overline,.rail-label{font-family:var(--labelFont);font-size:13px;letter-spacing:.16em;text-transform:uppercase;color:var(--accent)}
    .headline{margin:0;font-family:var(--titleFont);font-size:72px;line-height:.96;letter-spacing:-.04em;max-width:900px}
    .headline-tight{max-width:760px}
    .headline-wide{max-width:1040px}
    .subhead,.body-copy,.footer-copy,.panel p,.metric-note,.rail-note,.thesis-statement,.band-card li,.ledger-card p,.pillar-card p,.matrix-cell p{
      margin:0;
      font-size:24px;
      line-height:1.45;
      color:var(--fg);
    }
    .body-copy,.lead-copy,.footer-copy{max-width:880px}
    .lead-copy{font-size:26px}
    .footer-copy{align-self:end;color:var(--muted);font-size:20px}
    h3{margin:0 0 10px;font-size:28px;line-height:1.18;font-family:var(--titleFont)}
    ul{margin:0;padding-left:24px}
    li+li{margin-top:10px}
    .panel,.metric-card,.band-card,.ledger-card,.pillar-card,.ribbon-step,.milestone-card{background:var(--panel);border:1px solid var(--line);padding:22px 24px;backdrop-filter:blur(8px)}
    .compact-panel{padding:18px 20px}
    .hero-cover,.editorial-thesis,.metric-commentary,.comparison-bands,.ledger-columns,.evidence-quote{grid-template-columns:1.08fr .92fr}
    .hero-intro,.thesis-copy,.metric-copy,.quote-column,.rail-copy,.section-header{display:grid;align-content:start;gap:18px}
    .stacked-notes,.thesis-rail,.future-rail,.evidence-column{display:grid;align-content:start;gap:16px}
    .figure-overline{font-size:15px;color:var(--muted)}
    .figure-stamp,.rail-number,.quote-figure,.metric-number{font-family:var(--accentFont);color:var(--accent);line-height:.9}
    .figure-stamp{font-size:84px;letter-spacing:-.05em;padding-top:8px}
    .rail-number,.quote-figure{font-size:96px;letter-spacing:-.06em}
    .rail-note,.metric-note{color:var(--muted);font-size:18px}
    .metric-commentary{align-items:stretch}
    .metric-card{display:grid;align-content:start;gap:14px;min-height:100%}
    .metric-number{font-size:132px}
    .metric-label{font-size:24px;font-weight:700}
    .bullet-list{display:grid;gap:14px;padding-left:24px}
    .bullet-list li{font-size:18px;line-height:1.45}
    .sticker-list{display:grid;grid-template-columns:1fr 1fr;gap:14px}
    .offset-timeline,.card-constellation,.manifesto-wall,.process-ribbon,.chronology-matrix{grid-template-rows:auto auto auto;align-content:start}
    .timeline-row,.timeline-bubbles{position:relative;display:grid;grid-template-columns:repeat(4,1fr);gap:18px;align-items:start}
    .timeline-row::before{content:"";position:absolute;left:0;right:0;top:108px;height:2px;background:linear-gradient(90deg, transparent, var(--accent), transparent);opacity:.5}
    .milestone-card{min-height:246px}
    .offset-2,.offset-4{margin-top:96px}
    .offset-3{margin-top:44px}
    .story-rail{grid-template-columns:.72fr 1.28fr;align-items:start}
    .rail-figure{display:grid;align-content:start;gap:14px;padding-right:24px;border-right:1px solid var(--line)}
    .rail-card-stack,
    .rail-card-stack-vertical{display:grid;grid-template-columns:1fr 1fr;gap:14px}
    .rail-card-stack-vertical{grid-template-columns:1fr}
    .band-stack,.bright-compare-grid,.poster-columns,.pillar-grid,.ledger-grid,.matrix-grid,.ribbon-grid,.mosaic-grid,.organic-stack{display:grid;gap:18px;align-items:start}
    .band-stack,.poster-columns{grid-template-columns:1fr}
    .band-card{display:grid;gap:12px}
    .bright-compare-grid,.pillar-grid,.ledger-grid,.ribbon-grid{grid-template-columns:repeat(3,1fr)}
    .mosaic-grid{grid-template-columns:repeat(12,1fr);grid-auto-rows:minmax(100px,auto);align-content:start}
    .mosaic-card.span-1{grid-column:span 5;grid-row:span 2}
    .mosaic-card.span-2{grid-column:span 3;grid-row:span 2}
    .mosaic-card.span-3{grid-column:span 4;grid-row:span 1}
    .mosaic-card.span-4{grid-column:span 6;grid-row:span 1}
    .organic-stack{grid-template-columns:1.1fr .9fr .9fr}
    .organic-card{border-radius:28px}
    .ribbon-step{position:relative;padding-top:42px}
    .ribbon-step::before{content:"";position:absolute;left:24px;right:24px;top:22px;height:2px;background:var(--accent);opacity:.35}
    .comparison-bands .body-copy,
    .manifesto-wall .body-copy,
    .ledger-columns .body-copy,
    .offset-timeline .body-copy,
    .card-constellation .body-copy,
    .process-ribbon .body-copy,
    .chronology-matrix .body-copy{max-width:1040px}
    .comparison-bands,
    .offset-timeline,
    .card-constellation,
    .process-ribbon,
    .chronology-matrix,
    .manifesto-wall,
    .ledger-columns{gap:20px}
    .comparison-bands .headline,
    .offset-timeline .headline,
    .card-constellation .headline,
    .process-ribbon .headline,
    .chronology-matrix .headline,
    .manifesto-wall .headline,
    .ledger-columns .headline{font-size:60px;max-width:1120px}
    .comparison-bands .body-copy,
    .offset-timeline .body-copy,
    .card-constellation .body-copy,
    .process-ribbon .body-copy,
    .chronology-matrix .body-copy,
    .manifesto-wall .body-copy,
    .ledger-columns .body-copy,
    .comparison-bands .lead-copy,
    .offset-timeline .lead-copy,
    .card-constellation .lead-copy,
    .process-ribbon .lead-copy,
    .chronology-matrix .lead-copy,
    .manifesto-wall .lead-copy,
    .ledger-columns .lead-copy{font-size:22px;line-height:1.38}
    .comparison-bands .footer-copy,
    .offset-timeline .footer-copy,
    .process-ribbon .footer-copy,
    .chronology-matrix .footer-copy,
    .manifesto-wall .footer-copy,
    .ledger-columns .footer-copy{font-size:18px}
    .card-constellation .footer-copy{font-size:16px}
    .card-constellation .panel p,
    .comparison-bands .band-card li,
    .manifesto-wall .pillar-card p,
    .ledger-columns .ledger-card p,
    .chronology-matrix .matrix-cell p,
    .process-ribbon .ribbon-step p,
    .offset-timeline .milestone-card p{font-size:19px;line-height:1.32}
    .card-constellation h3,
    .manifesto-wall h3,
    .process-ribbon h3,
    .chronology-matrix h3,
    .offset-timeline h3{font-size:24px}
    .mosaic-grid{grid-template-columns:repeat(12,1fr);grid-auto-rows:minmax(82px,auto)}
    .card-constellation .mosaic-grid,
    .manifesto-wall .pillar-grid,
    .ledger-columns .ledger-grid,
    .chronology-matrix .matrix-grid,
    .process-ribbon .ribbon-grid{gap:14px}
    .card-constellation .panel,
    .manifesto-wall .pillar-card,
    .ledger-columns .ledger-card,
    .chronology-matrix .matrix-cell,
    .process-ribbon .ribbon-step,
    .offset-timeline .milestone-card{padding:18px 20px}
    .thesis-statement{font-family:var(--accentFont);font-size:40px;line-height:1.18;color:var(--accent);max-width:760px}
    .comparison-bands .band-label{font-size:24px;font-family:var(--titleFont)}
    .manifesto-wall .pillar-card h3,
    .ledger-card .panel-label,
    .matrix-cell h3{margin-bottom:12px}
    .staggered-pillars .pillar-2,.staggered-pillars .pillar-4{transform:translateY(28px)}
    .chronology-matrix .matrix-grid{grid-template-columns:repeat(4,1fr)}
    .family-editorial .headline,.family-minimal .headline,.family-luxury .headline,.family-dark-editorial .headline{font-weight:700}
    .family-minimal .panel,.family-minimal .band-card,.family-minimal .ledger-card{backdrop-filter:none;box-shadow:none;border-radius:0}
    .family-poster .panel,.family-poster .milestone-card,.family-poster .band-card{box-shadow:8px 8px 0 color-mix(in srgb, var(--accent2) 45%, transparent)}
    .family-geometry .panel,.family-geometry .band-card,.family-geometry .ledger-card,.family-geometry .metric-card{border-radius:0}
    .family-organic .panel,.family-organic .band-card,.family-organic .pillar-card{border-radius:26px 24px 28px 18px}
    .family-luxury .panel,.family-luxury .metric-card,.family-luxury .band-card,.family-luxury .pillar-card{border-color:rgba(255,255,255,.14);box-shadow:inset 0 0 0 1px rgba(196,162,101,.22)}
    .family-brutal .panel,.family-brutal .metric-card,.family-brutal .band-card,.family-brutal .pillar-card{border:4px solid var(--line);box-shadow:12px 12px 0 rgba(0,0,0,.9);backdrop-filter:none}
    .family-future .panel,.family-future .metric-card,.family-future .band-card,.family-future .pillar-card{box-shadow:0 0 0 1px rgba(64,232,208,.16), 0 0 32px rgba(64,232,208,.08)}
    .family-future .headline,
    .family-future .quote-figure,
    .family-future .rail-number{text-shadow:0 0 18px rgba(64,232,208,.24)}
    .family-dark-editorial .panel,.family-dark-editorial .ledger-card,.family-dark-editorial .pillar-card{background:rgba(255,255,255,.025);border-color:rgba(255,255,255,.08)}
    .family-playful .panel,.family-playful .band-card,.family-playful .pillar-card{border:4px solid var(--line);box-shadow:8px 8px 0 rgba(32,32,32,.94);border-radius:24px}
    .family-playful .pillar-grid,
    .family-playful .bright-compare-grid{padding:0 10px}
    .family-playful .pillar-1{transform:rotate(-1.5deg)}
    .family-playful .pillar-2{transform:translateY(14px) rotate(1.25deg)}
    .family-playful .pillar-3{transform:rotate(-1deg)}
    .family-playful .pillar-4{transform:translateY(8px) rotate(1.75deg)}

    /* ── component dialect classes ──────────────────────────────────────── */
    /* editorial: rule-panel, ledger-strip, frame-pillar */
    .rule-panel{border-top:2px solid var(--accent);border-left:none;border-right:none;border-radius:0;box-shadow:none;padding-top:20px}
    .ledger-strip{border-radius:0;border-left:3px solid var(--accent);border-right:none;border-top:none;border-bottom:none;padding-left:20px;box-shadow:none}
    .frame-pillar{border:1px solid var(--line);border-radius:0;position:relative;padding-top:32px}
    .frame-pillar::before{content:"";position:absolute;top:0;left:0;right:0;height:3px;background:var(--accent)}
    /* minimal: plaque, divider-band, label-rail */
    .plaque{background:transparent;border:none;border-bottom:1px solid var(--line);border-radius:0;box-shadow:none;backdrop-filter:none;padding-left:0;padding-right:0}
    .divider-band{background:transparent;border:none;border-bottom:1px solid var(--line);border-radius:0;box-shadow:none;backdrop-filter:none;padding-left:0}
    .label-rail{background:transparent;border:none;border-left:1px solid var(--line);border-radius:0;box-shadow:none;backdrop-filter:none;padding-left:20px}
    /* poster: sticker, slab, badge-block */
    .sticker{box-shadow:6px 6px 0 rgba(0,0,0,.72);border-radius:0}
    .slab{border-width:3px;border-radius:0;box-shadow:none}
    .badge-block{border-radius:18px;border-width:2px}
    /* geometry: facet-panel, facet-band, facet-pillar */
    .facet-panel,.facet-band,.facet-pillar{border-radius:0;box-shadow:none}
    .facet-panel{clip-path:polygon(0 0,100% 0,94% 100%,0 100%);padding-right:28px}
    .facet-band{clip-path:polygon(6% 0,100% 0,100% 100%,0 100%,0 12%);padding-left:22px}
    .facet-pillar{clip-path:polygon(0 0,96% 0,100% 100%,0 100%)}
    /* organic: soft-cluster, glass-module, organic-signal */
    .soft-cluster{border-radius:28px 22px 32px 18px;box-shadow:none}
    .glass-module{border-radius:16px;backdrop-filter:blur(12px);background:rgba(255,255,255,.18)}
    .organic-signal{border-radius:40px;border-style:dashed;box-shadow:none}
    /* luxury: deco-plaque, deco-band, deco-pillar */
    .deco-plaque,.deco-band,.deco-pillar{background:transparent;border:1px solid var(--line);border-radius:0;box-shadow:inset 0 0 0 1px rgba(196,162,101,.14);text-align:center}
    .deco-band{border-left:none;border-right:none}
    .deco-pillar{padding-top:26px}
    /* brutal: hard-sticker, hard-band, hard-pillar */
    .hard-sticker,.hard-band,.hard-pillar{border:4px solid var(--line);border-radius:0;box-shadow:10px 10px 0 rgba(0,0,0,.88);backdrop-filter:none}
    /* future: signal-panel, signal-band, signal-pillar */
    .signal-panel,.signal-band,.signal-pillar{background:rgba(10,22,44,.36);border:1px solid var(--accent);box-shadow:0 0 0 1px rgba(64,232,208,.12),0 0 18px rgba(64,232,208,.06)}
    /* dark-editorial: ledger-plaque, ledger-band, ledger-pillar */
    .ledger-plaque,.ledger-band,.ledger-pillar{background:transparent;border-left:none;border-right:none;border-bottom:none;border-radius:0;box-shadow:none;backdrop-filter:none;padding-left:0;padding-right:0}
    .ledger-band,.ledger-pillar{padding-top:20px;padding-bottom:18px}
    /* playful: bubble-badge, bubble-band, bubble-pillar */
    .bubble-badge,.bubble-band,.bubble-pillar{border:3px solid var(--fg);border-radius:24px;box-shadow:7px 7px 0 rgba(32,32,32,.88)}

    /* ── cover-swiss-rail (Style A) ─────────────────────────────────────── */
    .cover-swiss-rail{display:grid;grid-template-rows:auto 1fr auto;gap:20px;align-content:stretch}
    .swiss-header{display:flex;align-items:baseline;gap:24px;border-bottom:2px solid var(--accent);padding-bottom:14px}
    .swiss-main{display:grid;align-content:center;gap:16px;padding-left:18px;border-left:5px solid var(--accent)}
    .swiss-rail{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
    .note-strip{padding:16px 20px;border-top:2px solid var(--line)}
    .note-strip .panel-label{margin-bottom:8px}
    .note-strip p{font-size:19px;line-height:1.38;margin:0}

    /* ── cover-zen-void (Style B) ────────────────────────────────────────── */
    .cover-zen-void{display:grid;grid-template-rows:1fr auto auto;gap:0;align-content:stretch}
    .zen-void-spacer{min-height:40px}
    .zen-content{display:grid;align-content:end;gap:14px;padding-bottom:28px}
    .zen-anchor{display:grid;gap:12px;padding-top:20px;border-top:1px solid var(--line)}
    .zen-rule{width:88px;height:2px;background:var(--accent)}

    /* ── cover-riso-poster (Style C) ─────────────────────────────────────── */
    .cover-riso-poster{display:grid;grid-template-columns:.65fr .35fr;gap:28px;align-items:start}
    .riso-main{display:grid;align-content:start;gap:18px}
    .riso-headline{text-shadow:4px 4px 0 rgba(26,92,90,.28)}
    .riso-side{display:grid;align-content:start;gap:16px}
    .riso-year{font-family:var(--accentFont);font-size:72px;line-height:.9;color:var(--accent);letter-spacing:-.04em}
    .riso-notes{display:grid;gap:12px}

    /* ── cover-bauhaus-frame (Style D) ───────────────────────────────────── */
    .cover-bauhaus-frame{display:grid;grid-template:auto 1fr / 1.2fr .8fr;gap:16px 24px;align-content:stretch}
    .bauhaus-meta{display:grid;gap:8px;align-content:start}
    .bauhaus-accent{display:flex;align-items:center;justify-content:center}
    .geo-block{width:100%;height:100%;min-height:120px;background:var(--accent);clip-path:polygon(0 0,85% 0,100% 100%,0 100%)}
    .bauhaus-title{display:grid;align-content:center;gap:16px;border-top:3px solid var(--fg)}
    .bauhaus-notes{display:grid;gap:12px;align-content:end}

    /* ── cover-organic-cluster (Style E) ─────────────────────────────────── */
    .cover-organic-cluster{display:flex;flex-direction:column;gap:20px;align-content:stretch}
    .organic-title-block{display:grid;gap:14px}
    .organic-bubbles{display:flex;flex-wrap:wrap;gap:16px;flex:1;align-content:end}
    .bubble-note{flex:1 1 200px;padding:20px 22px;background:var(--panel);border:1px solid var(--line)}
    .bubble-note.bubble-1{border-radius:48% 20% 44% 18% / 22% 46% 18% 44%}
    .bubble-note.bubble-2{border-radius:18% 46% 16% 48% / 44% 18% 46% 22%}
    .bubble-note.bubble-3{border-radius:32% 32% 48% 20% / 28% 44% 20% 44%}
    .bubble-note p{font-size:19px;line-height:1.38;margin:0}

    /* ── cover-deco-axis (Style F) ───────────────────────────────────────── */
    .cover-deco-axis{display:grid;grid-template-rows:auto auto auto auto;gap:14px;align-content:space-between;align-items:center;text-align:center;overflow:hidden}
    .deco-rule-top,.deco-rule-bottom{height:1px;background:linear-gradient(90deg,transparent,var(--accent),transparent);position:relative}
    .deco-rule-top::before,.deco-rule-bottom::before{content:"◆";position:absolute;left:50%;transform:translateX(-50%) translateY(-50%);font-size:12px;color:var(--accent);background:var(--bg);padding:0 8px}
    .deco-title{display:grid;gap:10px;align-content:center;align-items:center;justify-items:center}
    .deco-title .headline{font-size:66px}
    .deco-title .subhead{font-size:22px;line-height:1.32}
    .deco-panel-row{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
    .deco-panel-row .panel{padding:12px 14px;min-height:0}
    .deco-panel-row .panel p{font-size:18px;line-height:1.32}

    /* ── cover-brutal-stack (Style G) ────────────────────────────────────── */
    .cover-brutal-stack{display:grid;grid-template-rows:auto auto auto;gap:14px;align-content:stretch}
    .brutal-head{display:grid;gap:10px}
    .brutal-headline{font-size:104px;line-height:.88;letter-spacing:-.05em;max-width:none}
    .brutal-stickers{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;padding:4px 12px 0}
    .sticker-card{padding:18px 20px;border:4px solid var(--line);background:var(--panel);box-shadow:10px 10px 0 var(--fg)}
    .sticker-card.sticker-1{transform:translateX(6px) rotate(-.35deg)}
    .sticker-card.sticker-2{transform:rotate(.2deg)}
    .sticker-card.sticker-3{transform:translateX(-6px) rotate(-.15deg)}
    .sticker-card .panel-label{margin-bottom:8px}
    .sticker-card p{font-size:19px;line-height:1.38;margin:0}
    .brutal-foot{display:grid;gap:8px;border-top:4px solid var(--fg);padding:12px 8px 0}

    /* ── cover-horizon-signal (Style H) ──────────────────────────────────── */
    .cover-horizon-signal{display:grid;grid-template-rows:1fr auto;gap:0;align-content:stretch}
    .horizon-sky{display:grid;align-content:center;gap:16px;padding-bottom:24px}
    .horizon-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;border-top:1px solid var(--accent);padding-top:20px}
    .signal-block{padding:16px 18px;background:var(--panel);border:1px solid var(--accent);box-shadow:0 0 12px rgba(64,232,208,.12)}
    .signal-block .panel-label{margin-bottom:8px}
    .signal-block p{font-size:18px;line-height:1.38;margin:0;color:var(--fg)}

    /* ── cover-editorial-ledger (Style I) ────────────────────────────────── */
    .cover-editorial-ledger{display:grid;grid-template-columns:1fr 1fr 1fr;gap:28px;align-items:start}
    .ledger-col-a{display:grid;align-content:start;gap:14px;border-right:1px solid var(--line);padding-right:28px}
    .ledger-col-b{display:grid;align-content:start;gap:16px;border-right:1px solid var(--line);padding-right:28px}
    .ledger-col-c{display:grid;align-content:end;gap:14px;height:100%}

    /* ── cover-memphis-splash (Style J) ──────────────────────────────────── */
    .cover-memphis-splash{display:grid;grid-template:auto auto auto / 1fr 1fr;gap:10px 20px;align-content:start}
    .memphis-title{display:flex;align-items:start}
    .memphis-headline{transform:rotate(-1.5deg);transform-origin:left top;display:inline-block}
    .memphis-meta{display:grid;align-content:start;gap:8px;text-align:right}
    .memphis-year{font-family:var(--accentFont);font-size:68px;line-height:.9;color:var(--accent);letter-spacing:-.04em}
    .memphis-subhead{grid-column:span 2;border-top:3px solid var(--fg);padding-top:10px}
    .memphis-badges{grid-column:span 2;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;align-content:start;padding:195px 10px 0}
    .badge-card{padding:14px 16px;border:3px solid var(--fg);border-radius:24px;box-shadow:7px 7px 0 rgba(32,32,32,.9)}
    .badge-card.badge-1{background:#ffd23f;transform:rotate(-1.2deg)}
    .badge-card.badge-2{background:#ff6b9d;transform:rotate(.7deg);color:#fff}
    .badge-card.badge-3{background:#4a90d9;transform:rotate(-.5deg);color:#fff}
    .badge-card.badge-4{background:#2ec4b6;transform:rotate(.6deg)}
    .badge-card .panel-label{margin-bottom:6px}
    .badge-card p{font-size:18px;line-height:1.32;margin:0}

    ${theme.shellCss}
    ${variantCss(theme)}
  `;
}

export function renderHtml(theme, plan, options = {}) {
  const pageNumber = String(plan.index).padStart(2, "0");
  const pageCount = String(options.pageCount ?? plan.pageCount ?? 0).padStart(2, "0");
  const chromeMode = options.chromeMode ?? plan.chromeMode ?? "bookend";
  const showChrome = chromeMode === "all" || (chromeMode === "bookend" && (plan.role === "cover" || plan.role === "closing"));
  const chromeTop = showChrome
    ? `<div class="chrome-top"><div class="style-id">STYLE ${theme.id.toUpperCase()} / ${escapeHtml(theme.zhName)}</div><div class="meta-id">${escapeHtml(plan.metaLabel)}</div></div>`
    : "";
  const chromeBottom = showChrome
    ? `<div class="chrome-bottom"><div class="meta-id">${escapeHtml(plan.layoutId)}</div><div class="page-id">${pageNumber} / ${pageCount}</div></div>`
    : "";
  return `<!doctype html><html lang="zh-Hans"><head><meta charset="utf-8" /><meta name="viewport" content="width=1600, initial-scale=1" /><link rel="icon" href="data:," /><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /><link href="${theme.fonts}" rel="stylesheet" /><title>${escapeHtml(plan.blocks[1].text)} - ${escapeHtml(theme.zhName)}</title><style>${shellCss(theme)}</style></head><body><div class="slide theme-${theme.id} family-${theme.family}">${theme.ornaments}<div class="safe-top"></div><div class="safe-bottom"></div>${chromeTop}${chromeBottom}<main class="main-frame">${renderPageBody(plan).replace('class="layout-root ', `class="layout-root role-${plan.role} `)}</main></div></body></html>`;
}
