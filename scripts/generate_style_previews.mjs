import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
const htmlOutputDir = path.join(rootDir, "outputs", "readme-previews", "html");
const pngOutputDir = path.join(rootDir, "assets");

const styles = [
  {
    id: "a",
    name: "Swiss International",
    css: `
      .slide { background:#f0ebe2; color:#2a2a30; }
      .slide::before { content:""; position:absolute; inset:0; opacity:.15; background-image:radial-gradient(circle at 12% 18%, rgba(184,80,56,.08) 0 2px, transparent 2px), radial-gradient(circle at 82% 74%, rgba(42,42,48,.06) 0 1px, transparent 1px); background-size: 180px 180px, 120px 120px; mix-blend-mode:multiply; }
      .crop{position:absolute;width:18px;height:18px;border-color:rgba(42,42,48,.22);}
      .crop.tl{top:22px;left:22px;border-top:1px solid;border-left:1px solid;}
      .crop.tr{top:22px;right:22px;border-top:1px solid;border-right:1px solid;}
      .crop.bl{bottom:22px;left:22px;border-bottom:1px solid;border-left:1px solid;}
      .crop.br{bottom:22px;right:22px;border-bottom:1px solid;border-right:1px solid;}
      .kicker{top:68px;left:90px;font:600 18px/1.2 Georgia,serif;letter-spacing:2px;text-transform:uppercase;}
      .metric{top:170px;left:96px;font:700 180px/.88 Georgia,serif;letter-spacing:-5px;}
      .headline{top:170px;left:468px;width:440px;font:700 76px/.95 Georgia,serif;}
      .summary{top:380px;left:472px;width:420px;font:400 28px/1.45 "Segoe UI",Arial,sans-serif;color:#5f5a55;}
      .rule{position:absolute;left:96px;top:132px;width:188px;height:6px;background:#b85038;}
      .side{position:absolute;top:138px;right:92px;width:392px;}
      .side .item{padding:0 0 28px;margin-bottom:24px;border-bottom:1px solid rgba(42,42,48,.12);}
      .side .label{font:700 14px/1.2 Consolas,"Courier New",monospace;letter-spacing:1.8px;color:#7d756d;text-transform:uppercase;}
      .side .text{margin-top:10px;font:400 24px/1.45 "Segoe UI",Arial,sans-serif;color:#393735;}
      .page-no{right:96px;bottom:70px;font:400 22px/1 Georgia,serif;opacity:.25;}
    `,
    html: `
      <div class="crop tl"></div><div class="crop tr"></div><div class="crop bl"></div><div class="crop br"></div>
      <div class="check kicker">STYLE A / SWISS INTERNATIONAL</div>
      <div class="rule"></div>
      <div class="check metric">48%</div>
      <div class="check headline">EV Market Signals</div>
      <div class="check summary">A data-driven title slide that uses one headline number, one editorial claim, and one structured notes column without turning into a dashboard.</div>
      <div class="side">
        <div class="check item"><div class="label">Takeaway</div><div class="text">Battery adoption is now concentrated in three metro clusters, which makes one giant percentage more useful than five tiny charts.</div></div>
        <div class="check item"><div class="label">Why It Works</div><div class="text">Large negative space, asymmetrical rhythm, and restrained rules keep the slide printable, presentable, and serious.</div></div>
        <div class="check item"><div class="label">Use It For</div><div class="text">Board updates, policy briefings, market outlook decks, and newsroom-style explainers.</div></div>
      </div>
      <div class="check page-no">01 / 05</div>
    `,
  },
  {
    id: "b",
    name: "East Asian Minimalism",
    css: `
      .slide { background:#f5f0e6; color:#2d3a5c; }
      .slide::before { content:""; position:absolute; inset:0; opacity:.18; background-image:radial-gradient(circle at 20% 24%, rgba(45,58,92,.07) 0 1.5px, transparent 1.5px), radial-gradient(circle at 68% 72%, rgba(196,90,60,.08) 0 1px, transparent 1px); background-size:160px 160px, 120px 120px; }
      .circle{position:absolute;left:164px;top:132px;width:330px;height:330px;border-radius:50%;background:#2d3a5c;filter:blur(.2px);}
      .line{position:absolute;left:94px;right:94px;top:610px;height:2px;background:#c45a3c;opacity:.72;}
      .kicker{top:84px;right:108px;font:500 16px/1.2 Consolas,"Courier New",monospace;letter-spacing:2px;color:#8d816f;}
      .headline{top:404px;right:124px;width:520px;font:700 72px/1.02 Georgia,serif;text-align:right;}
      .summary{top:566px;right:124px;width:488px;font:300 28px/1.55 "Segoe UI",Arial,sans-serif;text-align:right;color:#5d6270;}
      .quiet-note{left:124px;bottom:84px;font:400 20px/1.5 Georgia,serif;color:#7e5c4a;max-width:360px;}
    `,
    html: `
      <div class="circle"></div>
      <div class="line"></div>
      <div class="check kicker">STYLE B / EAST ASIAN MINIMALISM</div>
      <div class="check headline">Quiet Craft<br/>Brand Story</div>
      <div class="check summary">This template shows how one focal form, one horizontal rule, and one calm text block can carry an entire philosophy slide without noise.</div>
      <div class="check quiet-note">Ideal for founder beliefs, museum-like decks, and cultural presentations where silence is part of the message.</div>
    `,
  },
  {
    id: "c",
    name: "Risograph Print",
    css: `
      .slide { background:#f2ede0; color:#173a3a; }
      .slide::before { content:""; position:absolute; inset:0; opacity:.22; background-image:radial-gradient(circle at 12% 16%, rgba(232,69,107,.1) 0 2px, transparent 2px), radial-gradient(circle at 72% 64%, rgba(26,92,90,.08) 0 1.5px, transparent 1.5px); background-size:140px 140px, 110px 110px; mix-blend-mode:multiply; }
      .pink{position:absolute;left:112px;top:108px;width:372px;height:372px;border-radius:50%;background:rgba(232,69,107,.8);}
      .green{position:absolute;left:248px;top:138px;width:372px;height:372px;border-radius:50%;background:rgba(26,92,90,.8);}
      .bar1{position:absolute;left:150px;top:476px;width:356px;height:28px;background:#1a5c5a;}
      .bar2{position:absolute;left:164px;top:490px;width:356px;height:28px;background:rgba(232,69,107,.34);}
      .label{top:88px;right:132px;font:700 16px/1.2 Consolas,"Courier New",monospace;letter-spacing:2px;color:#766d62;}
      .headline{top:144px;right:112px;width:612px;font:700 96px/.92 Impact,"Arial Black",sans-serif;line-height:.92;color:#173a3a;text-transform:uppercase;}
      .summary{top:378px;right:118px;width:502px;font:400 28px/1.45 "Segoe UI",Arial,sans-serif;color:#41483f;}
      .footer{left:118px;bottom:88px;font:600 22px/1.4 "Segoe UI",Arial,sans-serif;color:#173a3a;}
    `,
    html: `
      <div class="pink"></div>
      <div class="green"></div>
      <div class="bar1"></div>
      <div class="bar2"></div>
      <div class="check label">STYLE C / RISOGRAPH PRINT</div>
      <div class="check headline">Indie Festival<br/>Launch Kit</div>
      <div class="check summary">The point of this slide is controlled collision: two inks, offset registration, rough hierarchy, and a headline that feels screen-printed instead of digitally polished.</div>
      <div class="check footer">Use this direction for event promos, youth campaigns, and creative proposals that should feel handmade, loud, and independent.</div>
    `,
  },
  {
    id: "d",
    name: "Bauhaus Geometry",
    css: `
      .slide { background:#f2ede4; color:#1f1a17; }
      .diag1{position:absolute;left:82px;top:116px;width:760px;height:488px;background:#d4c8a8;clip-path:polygon(0 100%, 54% 0, 100% 0, 46% 100%);}
      .diag2{position:absolute;right:86px;top:190px;width:464px;height:420px;background:#8a3a2a;clip-path:polygon(40% 0, 100% 0, 100% 100%, 0 100%);}
      .block{position:absolute;left:136px;top:154px;width:140px;height:34px;background:#1a1a1a;}
      .kicker{top:86px;right:100px;font:700 15px/1.2 Consolas,"Courier New",monospace;letter-spacing:2px;color:#6d655b;}
      .headline{top:142px;right:96px;width:560px;font:700 74px/.95 Georgia,serif;text-align:right;}
      .summary{top:340px;right:98px;width:482px;font:400 26px/1.5 "Segoe UI",Arial,sans-serif;text-align:right;color:#4d463f;}
      .facts{position:absolute;left:124px;bottom:90px;display:flex;gap:42px;}
      .fact{width:300px;}
      .fact-title{font:700 14px/1.2 Consolas,"Courier New",monospace;letter-spacing:1.6px;color:#6d655b;text-transform:uppercase;}
      .fact-copy{margin-top:10px;font:400 24px/1.45 "Segoe UI",Arial,sans-serif;color:#2a241f;}
    `,
    html: `
      <div class="diag1"></div>
      <div class="diag2"></div>
      <div class="block"></div>
      <div class="check kicker">STYLE D / BAUHAUS GEOMETRY</div>
      <div class="check headline">Modular<br/>Systems Deck</div>
      <div class="check summary">This preview keeps the composition structural: strong diagonals, one dark anchor, and headline-driven hierarchy instead of neat corporate rows.</div>
      <div class="facts">
        <div class="check fact"><div class="fact-title">Framework</div><div class="fact-copy">Good for architecture, operational systems, and slides that need visual logic more than softness.</div></div>
        <div class="check fact"><div class="fact-title">Behavior</div><div class="fact-copy">If content starts feeling dense, split it. Bauhaus should stay decisive, not crowded.</div></div>
      </div>
    `,
  },
  {
    id: "e",
    name: "Organic Handcrafted",
    css: `
      .slide { background:#f2ece2; color:#342d28; }
      .slide::before { content:""; position:absolute; inset:0; background:radial-gradient(circle at 18% 26%, rgba(160,120,80,.09), transparent 24%), radial-gradient(circle at 74% 72%, rgba(106,138,122,.1), transparent 22%); }
      .blob1{position:absolute;left:124px;top:164px;width:470px;height:338px;background:#a07850;border-radius:48% 52% 42% 58% / 46% 40% 60% 54%;}
      .blob2{position:absolute;left:378px;top:146px;width:338px;height:308px;background:rgba(106,138,122,.86);border-radius:52% 48% 58% 42% / 44% 58% 42% 56%;}
      .brush{position:absolute;left:128px;top:540px;width:360px;height:10px;border-radius:999px;background:rgba(58,53,48,.28);transform:rotate(6deg);}
      .kicker{top:92px;left:96px;font:700 15px/1.2 Consolas,"Courier New",monospace;letter-spacing:1.8px;color:#7b6a58;}
      .headline{top:126px;right:118px;width:500px;font:700 66px/1.02 Georgia,serif;}
      .summary{top:318px;right:118px;width:474px;font:400 25px/1.56 "Segoe UI",Arial,sans-serif;color:#534940;}
      .footer{right:116px;bottom:88px;width:470px;font:400 23px/1.5 Georgia,serif;color:#6b5d4c;}
    `,
    html: `
      <div class="blob1"></div>
      <div class="blob2"></div>
      <div class="brush"></div>
      <div class="check kicker">STYLE E / ORGANIC HANDCRAFTED</div>
      <div class="check headline">Wellness Retreat<br/>Story Arc</div>
      <div class="check summary">The slide should feel human and tactile. Soft shapes can carry the emotional tone, while the text stays spacious, warm, and easy to speak over.</div>
      <div class="check footer">Best for lifestyle storytelling, hospitality narratives, food culture decks, and any presentation that benefits from softness without becoming vague.</div>
    `,
  },
  {
    id: "f",
    name: "Art Deco Luxury",
    css: `
      .slide { background:#0e1118; color:#d8c199; }
      .slide::before { content:""; position:absolute; inset:0; background:linear-gradient(180deg, rgba(196,162,101,.06), transparent 34%, transparent 68%, rgba(196,162,101,.05)); }
      .frame{position:absolute;inset:38px;border:1px solid rgba(196,162,101,.26);}
      .line-top{position:absolute;left:180px;right:180px;top:116px;height:1px;background:rgba(196,162,101,.34);}
      .tri{position:absolute;left:50%;top:164px;width:0;height:0;border-left:120px solid transparent;border-right:120px solid transparent;border-bottom:200px solid transparent;transform:translateX(-50%);}
      .tri::before{content:"";position:absolute;left:-120px;top:0;width:240px;height:200px;clip-path:polygon(50% 0, 100% 100%, 0 100%);border:1px solid rgba(196,162,101,.62);}
      .kicker{top:108px;left:50%;transform:translateX(-50%);width:520px;text-align:center;font:700 15px/1.2 Consolas,"Courier New",monospace;letter-spacing:2.6px;color:#8d7953;}
      .headline{top:264px;left:50%;transform:translateX(-50%);width:860px;font:700 88px/1.02 Georgia,serif;text-align:center;}
      .summary{top:470px;left:50%;transform:translateX(-50%);width:920px;font:400 28px/1.5 "Segoe UI",Arial,sans-serif;text-align:center;color:#c7b28c;}
      .stats{position:absolute;left:180px;right:180px;bottom:98px;display:grid;grid-template-columns:repeat(3,1fr);gap:48px;}
      .stat{padding-top:16px;border-top:1px solid rgba(196,162,101,.24);}
      .stat-label{font:700 14px/1.2 Consolas,"Courier New",monospace;letter-spacing:1.8px;color:#8d7953;text-transform:uppercase;}
      .stat-copy{margin-top:10px;font:400 22px/1.45 "Segoe UI",Arial,sans-serif;color:#d4c09b;}
    `,
    html: `
      <div class="frame"></div>
      <div class="line-top"></div>
      <div class="tri"></div>
      <div class="check kicker">STYLE F / ART DECO LUXURY</div>
      <div class="check headline">Awards Night<br/>Opening Slide</div>
      <div class="check summary">This template stays dark, centered, and ceremonial. The slide should feel expensive because the linework is disciplined, not because it is crowded with ornaments.</div>
      <div class="stats">
        <div class="check stat"><div class="stat-label">Mood</div><div class="stat-copy">Premium, formal, symmetrical, and paced like an event reveal.</div></div>
        <div class="check stat"><div class="stat-label">Best For</div><div class="stat-copy">Hospitality decks, prestige finance, luxury launches, gala openers.</div></div>
        <div class="check stat"><div class="stat-label">Constraint</div><div class="stat-copy">Do not force white mode. The dark field is part of the system.</div></div>
      </div>
    `,
  },
  {
    id: "g",
    name: "Neo Brutalism",
    css: `
      .slide { background:#f5f0e0; color:#171717; }
      .yellow{position:absolute;left:110px;top:154px;width:320px;height:120px;background:#ffe156;border:6px solid #171717;box-shadow:16px 16px 0 #171717;}
      .red{position:absolute;left:278px;top:268px;width:372px;height:120px;background:#ff6b6b;border:6px solid #171717;box-shadow:16px 16px 0 #171717;}
      .cyan{position:absolute;left:720px;top:686px;width:118px;height:40px;background:#4ecdc4;border:6px solid #171717;transform:rotate(4deg);}
      .kicker{top:90px;left:112px;font:700 16px/1.2 "Segoe UI",Arial,sans-serif;text-transform:uppercase;letter-spacing:1.8px;}
      .headline{top:454px;left:112px;width:700px;font:900 92px/.92 Impact,"Arial Black",sans-serif;text-transform:uppercase;}
      .summary{top:166px;right:116px;width:372px;font:500 24px/1.5 "Segoe UI",Arial,sans-serif;}
      .notes{position:absolute;right:116px;bottom:86px;width:394px;}
      .note{margin-top:16px;padding-top:16px;border-top:3px solid #171717;font:500 22px/1.45 "Segoe UI",Arial,sans-serif;}
    `,
    html: `
      <div class="yellow"></div>
      <div class="red"></div>
      <div class="cyan"></div>
      <div class="check kicker">STYLE G / NEO BRUTALISM</div>
      <div class="check summary">This slide works when the message is blunt. Heavy borders, hard shadows, and loud blocks should support conviction, not random decoration.</div>
      <div class="check headline">Ship The Tool.<br/>Say It Clearly.</div>
      <div class="notes">
        <div class="check note">Use it for product launches, manifesto decks, opinionated startup intros, and presentations that need high-contrast momentum.</div>
        <div class="check note">If the slide starts feeling cute, it is no longer brutalist enough.</div>
      </div>
    `,
  },
  {
    id: "h",
    name: "Retro Futurism",
    css: `
      .slide { background:#0b0d1d; color:#d6f3ef; }
      .slide::before { content:""; position:absolute; inset:0; background:repeating-linear-gradient(180deg, rgba(255,255,255,.03) 0 1px, transparent 1px 6px); opacity:.24; }
      .horizon{position:absolute;left:88px;right:88px;top:584px;height:2px;background:#2a6a8a;}
      .grid{position:absolute;left:88px;right:88px;top:584px;bottom:100px;background:
        linear-gradient(90deg, transparent 0 9%, rgba(26,58,90,.55) 9% 9.2%, transparent 9.2% 100%),
        linear-gradient(180deg, rgba(64,232,208,.22), rgba(11,13,29,0));
        clip-path:polygon(0 0,100% 0,82% 100%,18% 100%);
      }
      .glow{position:absolute;left:50%;top:168px;width:520px;height:220px;transform:translateX(-50%);background:radial-gradient(circle, rgba(64,232,208,.18), transparent 66%);}
      .kicker{top:84px;left:94px;font:700 15px/1.2 Consolas,"Courier New",monospace;letter-spacing:2px;color:#6ecfcb;}
      .headline{top:156px;left:94px;width:730px;font:700 78px/.95 Georgia,serif;color:#e5fbf8;}
      .summary{top:388px;left:96px;width:598px;font:400 25px/1.56 "Segoe UI",Arial,sans-serif;color:#9cc5c9;}
      .specs{position:absolute;right:102px;top:154px;width:360px;}
      .spec{margin-bottom:28px;padding-bottom:22px;border-bottom:1px solid rgba(64,232,208,.22);}
      .spec .label{font:700 13px/1.2 Consolas,"Courier New",monospace;letter-spacing:1.8px;color:#6ecfcb;text-transform:uppercase;}
      .spec .copy{margin-top:10px;font:400 22px/1.46 "Segoe UI",Arial,sans-serif;color:#b7dedd;}
    `,
    html: `
      <div class="glow"></div>
      <div class="horizon"></div>
      <div class="grid"></div>
      <div class="check kicker">STYLE H / RETRO FUTURISM</div>
      <div class="check headline">Signal Locked.<br/>Reveal Sequence.</div>
      <div class="check summary">A good retro-futurist slide feels cinematic and restrained. It should use horizon drama and scanline atmosphere without becoming a neon mess.</div>
      <div class="specs">
        <div class="check spec"><div class="label">Scene</div><div class="copy">Game reveals, electronic music decks, future-tech launches.</div></div>
        <div class="check spec"><div class="label">Rule</div><div class="copy">Keep the dark background. The contrast system depends on it.</div></div>
      </div>
    `,
  },
  {
    id: "i",
    name: "Dark Editorial",
    css: `
      .slide { background:#111116; color:#ece7de; }
      .slide::before { content:""; position:absolute; inset:0; background:linear-gradient(180deg, rgba(168,152,120,.08), transparent 28%, transparent 72%, rgba(168,152,120,.06)); }
      .kicker{top:88px;left:94px;font:700 15px/1.2 Consolas,"Courier New",monospace;letter-spacing:2px;color:#9c8d74;}
      .headline{top:158px;left:92px;width:620px;font:700 84px/.94 Georgia,serif;}
      .rule1{position:absolute;left:96px;top:386px;width:420px;height:1px;background:rgba(168,152,120,.5);}
      .rule2{position:absolute;left:96px;top:402px;width:286px;height:1px;background:rgba(80,80,88,.85);}
      .summary{top:492px;left:96px;width:570px;font:400 24px/1.58 "Segoe UI",Arial,sans-serif;color:#cfc5b7;}
      .rail{position:absolute;top:140px;right:96px;width:430px;}
      .rail .entry{margin-bottom:30px;padding-bottom:24px;border-bottom:1px solid rgba(168,152,120,.18);}
      .rail .label{font:700 13px/1.2 Consolas,"Courier New",monospace;letter-spacing:1.7px;color:#9c8d74;text-transform:uppercase;}
      .rail .copy{margin-top:10px;font:400 23px/1.48 "Segoe UI",Arial,sans-serif;color:#e0d7ca;}
    `,
    html: `
      <div class="check kicker">STYLE I / DARK EDITORIAL</div>
      <div class="check headline">Sharp Evidence.<br/>Slow Authority.</div>
      <div class="rule1"></div>
      <div class="rule2"></div>
      <div class="check summary">This should look like a serious magazine opener. The typography leads, the contrast breathes, and the slide carries weight without stuffing in extra widgets.</div>
      <div class="rail">
        <div class="check entry"><div class="label">Use It For</div><div class="copy">Investigations, documentary proposals, longform research storytelling, high-seriousness narratives.</div></div>
        <div class="check entry"><div class="label">Watch Out</div><div class="copy">Do not cram too many arguments into one page. Editorial pacing is the design system.</div></div>
      </div>
    `,
  },
  {
    id: "j",
    name: "Memphis Pop",
    css: `
      .slide { background:#faf5e8; color:#202020; }
      .dot{position:absolute;left:112px;top:152px;width:64px;height:64px;border-radius:50%;background:#2ec4b6;border:4px solid #202020;}
      .tri{position:absolute;right:38px;top:58px;width:0;height:0;border-left:58px solid transparent;border-right:58px solid transparent;border-bottom:106px solid #ffd23f;}
      .sq{position:absolute;left:474px;top:176px;width:80px;height:80px;background:#4a90d9;border:4px solid #202020;transform:rotate(-7deg);}
      .zig{position:absolute;left:124px;bottom:156px;width:228px;height:42px;background:
        linear-gradient(135deg, transparent 0 16%, #ff8a5c 16% 32%, transparent 32% 48%, #ff8a5c 48% 64%, transparent 64% 80%, #ff8a5c 80% 100%);
      }
      .wave{position:absolute;right:28px;bottom:72px;width:104px;height:96px;}
      .wave::before,.wave::after{content:"";position:absolute;border:4px solid #ff6b9d;border-left-color:transparent;border-top-color:transparent;border-radius:50%;}
      .wave::before{width:34px;height:34px;right:48px;bottom:8px;transform:rotate(-18deg);}
      .wave::after{width:34px;height:34px;right:6px;bottom:8px;transform:rotate(-18deg);}
      .wave span{position:absolute;width:34px;height:34px;right:90px;bottom:8px;border:4px solid #ff6b9d;border-left-color:transparent;border-top-color:transparent;border-radius:50%;transform:rotate(-18deg);}
      .kicker{top:92px;left:204px;font:700 15px/1.2 "Segoe UI",Arial,sans-serif;letter-spacing:2px;text-transform:uppercase;}
      .headline{top:260px;left:112px;width:660px;font:900 96px/.92 Impact,"Arial Black",sans-serif;text-transform:uppercase;}
      .summary{top:176px;right:138px;width:336px;font:500 24px/1.48 "Segoe UI",Arial,sans-serif;}
      .footer{right:136px;bottom:96px;width:360px;font:500 22px/1.46 "Segoe UI",Arial,sans-serif;}
    `,
    html: `
      <div class="dot"></div>
      <div class="tri"></div>
      <div class="sq"></div>
      <div class="zig"></div>
      <div class="wave"><span></span></div>
      <div class="check kicker">STYLE J / MEMPHIS POP</div>
      <div class="check summary">This template should feel playful, bright, and anti-grid, but the reading order still needs to stay obvious from the first second.</div>
      <div class="check headline">Read More.<br/>Make Noise.</div>
      <div class="check footer">Great for education decks, school campaigns, social storytelling, festival programs, and presentations that benefit from a fun public-facing voice.</div>
    `,
  },
];

function renderDocument(style) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=1600, initial-scale=1" />
    <link rel="icon" href="data:," />
    <title>${style.name} Preview</title>
    <style>
      * { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; background: #111; }
      body { min-height: 100vh; }
      .slide {
        position: relative;
        width: 1600px;
        height: 900px;
        overflow: hidden;
        font-synthesis-weight: none;
        font-synthesis-style: none;
      }
      .check { display: block; }
      .slide > .check { position: absolute; }
      ${style.css}
    </style>
  </head>
  <body>
    <div class="slide">${style.html}</div>
  </body>
</html>`;
}

async function ensureReady(page, fileName) {
  await page.waitForFunction(() => document.readyState === "complete");
  await page.evaluate(async () => {
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }
  });

  const slide = page.locator(".slide");
  await slide.first().waitFor({ state: "visible" });

  const report = await page.evaluate(() => {
    const slide = document.querySelector(".slide");
    const slideRect = slide.getBoundingClientRect();
    const nodes = [...document.querySelectorAll(".check")].map((node, index) => {
      const rect = node.getBoundingClientRect();
      return {
        id: node.textContent.trim().slice(0, 48) || `node-${index + 1}`,
        left: rect.left - slideRect.left,
        top: rect.top - slideRect.top,
        right: rect.right - slideRect.left,
        bottom: rect.bottom - slideRect.top,
      };
    });

    const bounds = nodes.filter((node) =>
      node.left < 10 ||
      node.top < 10 ||
      node.right > slideRect.width - 10 ||
      node.bottom > slideRect.height - 10
    );

    const overlaps = [];
    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const a = nodes[i];
        const b = nodes[j];
        const horizontal = Math.min(a.right, b.right) - Math.max(a.left, b.left);
        const vertical = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
        if (horizontal > 12 && vertical > 12) {
          overlaps.push(`${a.id} <> ${b.id}`);
        }
      }
    }

    return { bounds, overlaps };
  });

  if (report.bounds.length || report.overlaps.length) {
    const issues = [
      ...report.bounds.map((item) => `out-of-bounds: ${item.id}`),
      ...report.overlaps.map((item) => `overlap: ${item}`),
    ];
    throw new Error(`${fileName} failed layout review: ${issues.join("; ")}`);
  }

  return slide.first();
}

async function main() {
  await fs.mkdir(htmlOutputDir, { recursive: true });
  await fs.mkdir(pngOutputDir, { recursive: true });

  const browser = await chromium.launch();

  try {
    const context = await browser.newContext({
      viewport: { width: 1600, height: 900 },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    for (const style of styles) {
      const htmlPath = path.join(htmlOutputDir, `style-preview-${style.id}.html`);
      const pngPath = path.join(pngOutputDir, `style-preview-${style.id}.png`);

      await fs.writeFile(htmlPath, renderDocument(style), "utf8");
      await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "load" });

      const slide = await ensureReady(page, path.basename(htmlPath));
      await slide.screenshot({ path: pngPath, type: "png" });

      console.log(`Rendered ${path.relative(rootDir, pngPath)}`);
    }

    await context.close();
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
