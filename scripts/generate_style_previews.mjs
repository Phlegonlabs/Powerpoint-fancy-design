import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
const htmlOutputDir = path.join(rootDir, "outputs", "readme-previews", "html");
const pngOutputDir = path.join(rootDir, "assets");
const locales = [
  { id: "en", suffix: "", titleSuffix: "Preview" },
  { id: "zh-Hans", suffix: "-zh", titleSuffix: "中文预览" },
  { id: "zh-Hant", suffix: "-zh-tw", titleSuffix: "繁體中文預覽" },
];

const localeFonts = {
  en: "",
  "zh-Hans": `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&family=Noto+Serif+SC:wght@400;700;900&display=swap" rel="stylesheet">`,
  "zh-Hant": `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700;900&family=Noto+Serif+TC:wght@400;700;900&display=swap" rel="stylesheet">`,
};

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

const localizedCopy = {
  "zh-Hans": {
    a: { name: "瑞士国际主义", replacements: [["STYLE A / SWISS INTERNATIONAL", "风格 A / 瑞士国际主义"], ["EV Market Signals", "电动车市场信号"], ["A data-driven title slide that uses one headline number, one editorial claim, and one structured notes column without turning into a dashboard.", "这张页展示的是编辑型数据封面：用一个核心数字、一句判断和一列注释完成清晰表达，而不是做成仪表盘。"], ["Takeaway", "核心判断"], ["Battery adoption is now concentrated in three metro clusters, which makes one giant percentage more useful than five tiny charts.", "电池采用率集中在三个城市群，所以一个大数字比五张小图更适合演示。"], ["Why It Works", "为什么有效"], ["Large negative space, asymmetrical rhythm, and restrained rules keep the slide printable, presentable, and serious.", "大面积留白、不对称节奏和克制线条，让页面既适合展示，也保持严肃的编辑感。"], ["Use It For", "适用场景"], ["Board updates, policy briefings, market outlook decks, and newsroom-style explainers.", "适合董事会汇报、政策简报、市场展望和新闻编辑型说明页。"]], css: `.kicker,.summary,.side .label,.side .text{font-family:"Noto Sans SC",sans-serif;letter-spacing:0}.headline{font-family:"Noto Serif SC",serif;font-size:64px;line-height:1.04;width:448px}.summary{font-size:24px;line-height:1.58;width:432px}.side .label{font-size:16px;font-weight:700}.side .text{font-size:21px;line-height:1.56}` },
    b: { name: "东亚极简", replacements: [["STYLE B / EAST ASIAN MINIMALISM", "风格 B / 东亚极简"], ["Quiet Craft<br/>Brand Story", "安静工艺<br/>品牌叙事"], ["This template shows how one focal form, one horizontal rule, and one calm text block can carry an entire philosophy slide without noise.", "这张模板页强调克制表达：一个主形、一条横线和一段安静文字，就足以支撑完整的品牌理念页。"], ["Ideal for founder beliefs, museum-like decks, and cultural presentations where silence is part of the message.", "适合创始人理念、展览型内容和文化叙事，重点是把安静也当成表达的一部分。"]], css: `.kicker,.summary{font-family:"Noto Sans SC",sans-serif;letter-spacing:0}.headline{font-family:"Noto Serif SC",serif;font-size:58px;line-height:1.08;width:470px}.summary{font-size:24px;line-height:1.64;width:452px}.quiet-note{font-family:"Noto Serif SC",serif;font-size:19px;line-height:1.65;max-width:380px}` },
    c: { name: "Risograph 印刷", replacements: [["STYLE C / RISOGRAPH PRINT", "风格 C / Risograph 印刷"], ["Indie Festival<br/>Launch Kit", "独立音乐节<br/>发布套件"], ["The point of this slide is controlled collision: two inks, offset registration, rough hierarchy, and a headline that feels screen-printed instead of digitally polished.", "这张页强调的是可控碰撞：双色油墨、错位套印、粗粝层级，以及更像丝网印刷而不是数字排版的标题。"], ["Use this direction for event promos, youth campaigns, and creative proposals that should feel handmade, loud, and independent.", "适合活动预热、青年 campaign 和创意提案，重点是手作感、冲突感和独立气质。"]], css: `.label,.summary,.footer{font-family:"Noto Sans SC",sans-serif;letter-spacing:0}.headline{font-family:"Noto Sans SC",sans-serif;font-size:76px;line-height:1.02;width:510px}.summary{font-size:23px;line-height:1.62;width:442px}.footer{font-size:20px;line-height:1.56;width:1240px}` },
    d: { name: "包豪斯几何", replacements: [["STYLE D / BAUHAUS GEOMETRY", "风格 D / 包豪斯几何"], ["Modular<br/>Systems Deck", "模块系统<br/>提案页"], ["This preview keeps the composition structural: strong diagonals, one dark anchor, and headline-driven hierarchy instead of neat corporate rows.", "这张页强调结构感：强烈对角线、一个深色锚点，以及由标题驱动的层级，而不是整齐但乏味的企业排布。"], ["Framework", "结构逻辑"], ["Good for architecture, operational systems, and slides that need visual logic more than softness.", "适合建筑、系统框架和需要视觉逻辑强于柔和氛围的内容。"], ["Behavior", "使用提醒"], ["If content starts feeling dense, split it. Bauhaus should stay decisive, not crowded.", "如果内容开始变密，就拆页。包豪斯应该果断，而不是拥挤。"]], css: `.kicker,.summary,.fact-title,.fact-copy{font-family:"Noto Sans SC",sans-serif;letter-spacing:0}.headline{font-family:"Noto Sans SC",sans-serif;font-size:62px;line-height:1.06;width:472px}.summary{font-size:23px;line-height:1.58;width:432px}.fact-title{font-size:15px;font-weight:700}.fact-copy{font-size:21px;line-height:1.55}` },
    e: { name: "有机手作", replacements: [["STYLE E / ORGANIC HANDCRAFTED", "风格 E / 有机手作"], ["Wellness Retreat<br/>Story Arc", "疗愈品牌<br/>故事页"], ["The slide should feel human and tactile. Soft shapes can carry the emotional tone, while the text stays spacious, warm, and easy to speak over.", "这一页要有人味和触感。柔软形状承担情绪氛围，而文字保持宽松、温暖、容易在演示里讲述。"], ["Best for lifestyle storytelling, hospitality narratives, food culture decks, and any presentation that benefits from softness without becoming vague.", "适合生活方式叙事、酒店品牌、饮食文化和所有需要温柔但不松散的演示内容。"]], css: `.kicker,.summary,.footer{font-family:"Noto Sans SC",sans-serif;letter-spacing:0}.headline{font-family:"Noto Serif SC",serif;font-size:56px;line-height:1.1;width:432px}.summary{font-size:23px;line-height:1.62;width:432px}.footer{font-size:21px;line-height:1.58;width:420px}` },
    f: { name: "装饰艺术奢华", replacements: [["STYLE F / ART DECO LUXURY", "风格 F / 装饰艺术奢华"], ["Awards Night<br/>Opening Slide", "颁奖之夜<br/>开场页"], ["This template stays dark, centered, and ceremonial. The slide should feel expensive because the linework is disciplined, not because it is crowded with ornaments.", "这张模板页保持深色、居中和仪式感。它的高级感来自线条秩序，而不是来自堆满装饰。"], ["Mood", "气质"], ["Premium, formal, symmetrical, and paced like an event reveal.", "高级、正式、对称，像一场典礼揭幕。"], ["Best For", "适合内容"], ["Hospitality decks, prestige finance, luxury launches, gala openers.", "适合酒店、金融 prestige 场景、奢侈品发布和晚宴开场。"], ["Constraint", "使用限制"], ["Do not force white mode. The dark field is part of the system.", "不要强行改成白底，深色场就是这套系统的一部分。"]], css: `.kicker,.summary,.stat-label,.stat-copy{font-family:"Noto Sans SC",sans-serif;letter-spacing:0}.headline{font-family:"Noto Serif SC",serif;font-size:70px;line-height:1.08;width:780px}.summary{font-size:24px;line-height:1.6;width:820px}.stat-label{font-size:15px;font-weight:700}.stat-copy{font-size:20px;line-height:1.56}` },
    g: { name: "新粗野主义", replacements: [["STYLE G / NEO BRUTALISM", "风格 G / 新粗野主义"], ["This slide works when the message is blunt. Heavy borders, hard shadows, and loud blocks should support conviction, not random decoration.", "这张页适合强态度表达。粗边框、硬阴影和大色块应该服务立场，而不是变成随意装饰。"], ["Ship The Tool.<br/>Say It Clearly.", "把工具推出去。<br/>把话说清楚。"], ["Use it for product launches, manifesto decks, opinionated startup intros, and presentations that need high-contrast momentum.", "适合产品发布、宣言式 deck、强观点创业介绍，以及需要高对比推进感的演示。"], ["If the slide starts feeling cute, it is no longer brutalist enough.", "如果页面开始变可爱，那它就不够粗野了。"]], css: `.kicker,.summary,.note{font-family:"Noto Sans SC",sans-serif;letter-spacing:0}.headline{font-family:"Noto Sans SC",sans-serif;font-size:72px;line-height:1.04;width:620px;font-weight:900}.summary{font-size:22px;line-height:1.58;width:350px}.note{font-size:20px;line-height:1.56}` },
    h: { name: "复古未来主义", replacements: [["STYLE H / RETRO FUTURISM", "风格 H / 复古未来主义"], ["Signal Locked.<br/>Reveal Sequence.", "信号锁定。<br/>揭示开始。"], ["A good retro-futurist slide feels cinematic and restrained. It should use horizon drama and scanline atmosphere without becoming a neon mess.", "好的复古未来主义页面应该同时具备电影感和克制感，用地平线张力和扫描线氛围，而不是做成霓虹堆砌。"], ["Scene", "场景"], ["Game reveals, electronic music decks, future-tech launches.", "适合游戏揭幕、电子音乐 deck 和未来科技发布。"], ["Rule", "使用规则"], ["Keep the dark background. The contrast system depends on it.", "保持深色背景，这套对比系统依赖黑场。"]], css: `.kicker,.summary,.spec .label,.spec .copy{font-family:"Noto Sans SC",sans-serif;letter-spacing:0}.headline{font-family:"Noto Serif SC",serif;font-size:62px;line-height:1.08;width:620px}.summary{font-size:23px;line-height:1.6;width:520px}.spec .label{font-size:15px;font-weight:700}.spec .copy{font-size:20px;line-height:1.56}` },
    i: { name: "深色编辑感", replacements: [["STYLE I / DARK EDITORIAL", "风格 I / 深色编辑感"], ["Sharp Evidence.<br/>Slow Authority.", "锋利证据。<br/>缓慢权威。"], ["This should look like a serious magazine opener. The typography leads, the contrast breathes, and the slide carries weight without stuffing in extra widgets.", "这张页应该像一本严肃杂志的开篇。字体承担主导，对比要留有呼吸，页面有分量但不能塞满组件。"], ["Use It For", "适用场景"], ["Investigations, documentary proposals, longform research storytelling, high-seriousness narratives.", "适合调查报道、纪录片提案、长篇研究叙事和高严肃度内容。"], ["Watch Out", "注意事项"], ["Do not cram too many arguments into one page. Editorial pacing is the design system.", "不要把太多论点塞进同一页，编辑节奏本身就是设计系统。"]], css: `.kicker,.summary,.rail .label,.rail .copy{font-family:"Noto Sans SC",sans-serif;letter-spacing:0}.headline{font-family:"Noto Serif SC",serif;font-size:62px;line-height:1.08;width:520px}.summary{font-size:22px;line-height:1.62;width:500px;top:470px}.rail .label{font-size:15px;font-weight:700}.rail .copy{font-size:20px;line-height:1.56}` },
    j: { name: "孟菲斯波普", replacements: [["STYLE J / MEMPHIS POP", "风格 J / 孟菲斯波普"], ["This template should feel playful, bright, and anti-grid, but the reading order still needs to stay obvious from the first second.", "这张模板页要有玩味、明亮和反网格感，但阅读顺序依然要在第一眼就足够清楚。"], ["Read More.<br/>Make Noise.", "多读一点。<br/>把声音放大。"], ["Great for education decks, school campaigns, social storytelling, festival programs, and presentations that benefit from a fun public-facing voice.", "适合教育 deck、校园 campaign、社交叙事、节庆活动，以及所有需要公众友好语气的演示。"]], css: `.kicker,.summary,.footer{font-family:"Noto Sans SC",sans-serif;letter-spacing:0}.headline{font-family:"Noto Sans SC",sans-serif;font-size:74px;line-height:1.04;width:540px;font-weight:900}.summary{font-size:22px;line-height:1.58;width:312px}.footer{font-size:20px;line-height:1.58;width:332px}` },
  },
  "zh-Hant": {
    a: { name: "瑞士國際主義", replacements: [["STYLE A / SWISS INTERNATIONAL", "風格 A / 瑞士國際主義"], ["EV Market Signals", "電動車市場信號"], ["A data-driven title slide that uses one headline number, one editorial claim, and one structured notes column without turning into a dashboard.", "這張頁展示的是編輯型數據封面：用一個核心數字、一句判斷和一列註解完成清晰表達，而不是做成儀表板。"], ["Takeaway", "核心判斷"], ["Battery adoption is now concentrated in three metro clusters, which makes one giant percentage more useful than five tiny charts.", "電池採用率集中在三個城市群，所以一個大數字比五張小圖更適合演示。"], ["Why It Works", "為什麼有效"], ["Large negative space, asymmetrical rhythm, and restrained rules keep the slide printable, presentable, and serious.", "大面積留白、不對稱節奏和克制線條，讓頁面既適合展示，也保持嚴肅的編輯感。"], ["Use It For", "適用場景"], ["Board updates, policy briefings, market outlook decks, and newsroom-style explainers.", "適合董事會簡報、政策說明、市場展望和新聞編輯型說明頁。"]], css: `.kicker,.summary,.side .label,.side .text{font-family:"Noto Sans TC",sans-serif;letter-spacing:0}.headline{font-family:"Noto Serif TC",serif;font-size:64px;line-height:1.04;width:448px}.summary{font-size:24px;line-height:1.58;width:432px}.side .label{font-size:16px;font-weight:700}.side .text{font-size:21px;line-height:1.56}` },
    b: { name: "東亞極簡", replacements: [["STYLE B / EAST ASIAN MINIMALISM", "風格 B / 東亞極簡"], ["Quiet Craft<br/>Brand Story", "安靜工藝<br/>品牌敘事"], ["This template shows how one focal form, one horizontal rule, and one calm text block can carry an entire philosophy slide without noise.", "這張模板頁強調克制表達：一個主形、一條橫線和一段安靜文字，就足以支撐完整的品牌理念頁。"], ["Ideal for founder beliefs, museum-like decks, and cultural presentations where silence is part of the message.", "適合創辦人理念、展覽型內容和文化敘事，重點是把安靜也當成表達的一部分。"]], css: `.kicker,.summary{font-family:"Noto Sans TC",sans-serif;letter-spacing:0}.headline{font-family:"Noto Serif TC",serif;font-size:58px;line-height:1.08;width:470px}.summary{font-size:24px;line-height:1.64;width:452px}.quiet-note{font-family:"Noto Serif TC",serif;font-size:19px;line-height:1.65;max-width:380px}` },
    c: { name: "Risograph 印刷", replacements: [["STYLE C / RISOGRAPH PRINT", "風格 C / Risograph 印刷"], ["Indie Festival<br/>Launch Kit", "獨立音樂節<br/>發布套件"], ["The point of this slide is controlled collision: two inks, offset registration, rough hierarchy, and a headline that feels screen-printed instead of digitally polished.", "這張頁強調的是可控碰撞：雙色油墨、錯位套印、粗礪層級，以及更像網版印刷而不是數位排版的標題。"], ["Use this direction for event promos, youth campaigns, and creative proposals that should feel handmade, loud, and independent.", "適合活動預熱、青年 campaign 和創意提案，重點是手作感、衝突感和獨立氣質。"]], css: `.label,.summary,.footer{font-family:"Noto Sans TC",sans-serif;letter-spacing:0}.headline{font-family:"Noto Sans TC",sans-serif;font-size:76px;line-height:1.02;width:510px}.summary{font-size:23px;line-height:1.62;width:442px}.footer{font-size:20px;line-height:1.56;width:1240px}` },
    d: { name: "包豪斯幾何", replacements: [["STYLE D / BAUHAUS GEOMETRY", "風格 D / 包豪斯幾何"], ["Modular<br/>Systems Deck", "模組系統<br/>提案頁"], ["This preview keeps the composition structural: strong diagonals, one dark anchor, and headline-driven hierarchy instead of neat corporate rows.", "這張頁強調結構感：強烈對角線、一個深色錨點，以及由標題驅動的層級，而不是整齊但乏味的企業排布。"], ["Framework", "結構邏輯"], ["Good for architecture, operational systems, and slides that need visual logic more than softness.", "適合建築、系統框架和需要視覺邏輯強於柔和氛圍的內容。"], ["Behavior", "使用提醒"], ["If content starts feeling dense, split it. Bauhaus should stay decisive, not crowded.", "如果內容開始變密，就拆頁。包豪斯應該果斷，而不是擁擠。"]], css: `.kicker,.summary,.fact-title,.fact-copy{font-family:"Noto Sans TC",sans-serif;letter-spacing:0}.headline{font-family:"Noto Sans TC",sans-serif;font-size:62px;line-height:1.06;width:472px}.summary{font-size:23px;line-height:1.58;width:432px}.fact-title{font-size:15px;font-weight:700}.fact-copy{font-size:21px;line-height:1.55}` },
    e: { name: "有機手作", replacements: [["STYLE E / ORGANIC HANDCRAFTED", "風格 E / 有機手作"], ["Wellness Retreat<br/>Story Arc", "療癒品牌<br/>故事頁"], ["The slide should feel human and tactile. Soft shapes can carry the emotional tone, while the text stays spacious, warm, and easy to speak over.", "這一頁要有人味和觸感。柔軟形狀承擔情緒氛圍，而文字保持寬鬆、溫暖、容易在演示裡講述。"], ["Best for lifestyle storytelling, hospitality narratives, food culture decks, and any presentation that benefits from softness without becoming vague.", "適合生活方式敘事、飯店品牌、飲食文化和所有需要溫柔但不鬆散的演示內容。"]], css: `.kicker,.summary,.footer{font-family:"Noto Sans TC",sans-serif;letter-spacing:0}.headline{font-family:"Noto Serif TC",serif;font-size:56px;line-height:1.1;width:432px}.summary{font-size:23px;line-height:1.62;width:432px}.footer{font-size:21px;line-height:1.58;width:420px}` },
    f: { name: "裝飾藝術奢華", replacements: [["STYLE F / ART DECO LUXURY", "風格 F / 裝飾藝術奢華"], ["Awards Night<br/>Opening Slide", "頒獎之夜<br/>開場頁"], ["This template stays dark, centered, and ceremonial. The slide should feel expensive because the linework is disciplined, not because it is crowded with ornaments.", "這張模板頁保持深色、置中和儀式感。它的高級感來自線條秩序，而不是來自堆滿裝飾。"], ["Mood", "氣質"], ["Premium, formal, symmetrical, and paced like an event reveal.", "高級、正式、對稱，像一場典禮揭幕。"], ["Best For", "適合內容"], ["Hospitality decks, prestige finance, luxury launches, gala openers.", "適合飯店、金融 prestige 場景、奢侈品發布和晚宴開場。"], ["Constraint", "使用限制"], ["Do not force white mode. The dark field is part of the system.", "不要強行改成白底，深色場就是這套系統的一部分。"]], css: `.kicker,.summary,.stat-label,.stat-copy{font-family:"Noto Sans TC",sans-serif;letter-spacing:0}.headline{font-family:"Noto Serif TC",serif;font-size:70px;line-height:1.08;width:780px}.summary{font-size:24px;line-height:1.6;width:820px}.stat-label{font-size:15px;font-weight:700}.stat-copy{font-size:20px;line-height:1.56}` },
    g: { name: "新粗野主義", replacements: [["STYLE G / NEO BRUTALISM", "風格 G / 新粗野主義"], ["This slide works when the message is blunt. Heavy borders, hard shadows, and loud blocks should support conviction, not random decoration.", "這張頁適合強態度表達。粗邊框、硬陰影和大色塊應該服務立場，而不是變成隨意裝飾。"], ["Ship The Tool.<br/>Say It Clearly.", "把工具推出去。<br/>把話說清楚。"], ["Use it for product launches, manifesto decks, opinionated startup intros, and presentations that need high-contrast momentum.", "適合產品發布、宣言式 deck、強觀點創業介紹，以及需要高對比推進感的演示。"], ["If the slide starts feeling cute, it is no longer brutalist enough.", "如果頁面開始變可愛，那它就不夠粗野了。"]], css: `.kicker,.summary,.note{font-family:"Noto Sans TC",sans-serif;letter-spacing:0}.headline{font-family:"Noto Sans TC",sans-serif;font-size:72px;line-height:1.04;width:620px;font-weight:900}.summary{font-size:22px;line-height:1.58;width:350px}.note{font-size:20px;line-height:1.56}` },
    h: { name: "復古未來主義", replacements: [["STYLE H / RETRO FUTURISM", "風格 H / 復古未來主義"], ["Signal Locked.<br/>Reveal Sequence.", "訊號鎖定。<br/>揭示開始。"], ["A good retro-futurist slide feels cinematic and restrained. It should use horizon drama and scanline atmosphere without becoming a neon mess.", "好的復古未來主義頁面應該同時具備電影感與克制感，用地平線張力和掃描線氛圍，而不是做成霓虹堆砌。"], ["Scene", "場景"], ["Game reveals, electronic music decks, future-tech launches.", "適合遊戲揭幕、電子音樂 deck 和未來科技發布。"], ["Rule", "使用規則"], ["Keep the dark background. The contrast system depends on it.", "保持深色背景，這套對比系統依賴黑場。"]], css: `.kicker,.summary,.spec .label,.spec .copy{font-family:"Noto Sans TC",sans-serif;letter-spacing:0}.headline{font-family:"Noto Serif TC",serif;font-size:62px;line-height:1.08;width:620px}.summary{font-size:23px;line-height:1.6;width:520px}.spec .label{font-size:15px;font-weight:700}.spec .copy{font-size:20px;line-height:1.56}` },
    i: { name: "深色編輯感", replacements: [["STYLE I / DARK EDITORIAL", "風格 I / 深色編輯感"], ["Sharp Evidence.<br/>Slow Authority.", "鋒利證據。<br/>緩慢權威。"], ["This should look like a serious magazine opener. The typography leads, the contrast breathes, and the slide carries weight without stuffing in extra widgets.", "這張頁應該像一本嚴肅雜誌的開篇。字體承擔主導，對比要留有呼吸，頁面有分量但不能塞滿元件。"], ["Use It For", "適用場景"], ["Investigations, documentary proposals, longform research storytelling, high-seriousness narratives.", "適合調查報導、紀錄片提案、長篇研究敘事和高嚴肅度內容。"], ["Watch Out", "注意事項"], ["Do not cram too many arguments into one page. Editorial pacing is the design system.", "不要把太多論點塞進同一頁，編輯節奏本身就是設計系統。"]], css: `.kicker,.summary,.rail .label,.rail .copy{font-family:"Noto Sans TC",sans-serif;letter-spacing:0}.headline{font-family:"Noto Serif TC",serif;font-size:62px;line-height:1.08;width:520px}.summary{font-size:22px;line-height:1.62;width:500px;top:470px}.rail .label{font-size:15px;font-weight:700}.rail .copy{font-size:20px;line-height:1.56}` },
    j: { name: "孟菲斯波普", replacements: [["STYLE J / MEMPHIS POP", "風格 J / 孟菲斯波普"], ["This template should feel playful, bright, and anti-grid, but the reading order still needs to stay obvious from the first second.", "這張模板頁要有玩味、明亮和反網格感，但閱讀順序依然要在第一眼就足夠清楚。"], ["Read More.<br/>Make Noise.", "多讀一點。<br/>把聲音放大。"], ["Great for education decks, school campaigns, social storytelling, festival programs, and presentations that benefit from a fun public-facing voice.", "適合教育 deck、校園 campaign、社交敘事、節慶活動，以及所有需要大眾友好語氣的演示。"]], css: `.kicker,.summary,.footer{font-family:"Noto Sans TC",sans-serif;letter-spacing:0}.headline{font-family:"Noto Sans TC",sans-serif;font-size:74px;line-height:1.04;width:540px;font-weight:900}.summary{font-size:22px;line-height:1.58;width:312px}.footer{font-size:20px;line-height:1.58;width:332px}` },
  },
};

function applyReplacements(value, replacements) {
  return replacements.reduce((result, [from, to]) => result.replaceAll(from, to), value);
}

function localizeStyle(style, localeId) {
  if (localeId === "en") {
    return style;
  }

  const localeVariant = localizedCopy[localeId]?.[style.id];
  if (!localeVariant) {
    return style;
  }

  return {
    ...style,
    name: localeVariant.name,
    css: `${style.css}\n${localeVariant.css}`,
    html: applyReplacements(style.html, localeVariant.replacements),
  };
}

function renderDocument(style, locale) {
  const localizedStyle = localizeStyle(style, locale.id);
  return `<!doctype html>
<html lang="${locale.id}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=1600, initial-scale=1" />
    <link rel="icon" href="data:," />
    ${localeFonts[locale.id]}
    <title>${localizedStyle.name} ${locale.titleSuffix}</title>
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
      ${localizedStyle.css}
    </style>
  </head>
  <body>
    <div class="slide">${localizedStyle.html}</div>
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

    for (const locale of locales) {
      for (const style of styles) {
        const htmlPath = path.join(htmlOutputDir, `style-preview${locale.suffix}-${style.id}.html`);
        const pngPath = path.join(pngOutputDir, `style-preview${locale.suffix}-${style.id}.png`);

        await fs.writeFile(htmlPath, renderDocument(style, locale), "utf8");
        await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "load" });

        const slide = await ensureReady(page, path.basename(htmlPath));
        await slide.screenshot({ path: pngPath, type: "png" });

        console.log(`Rendered ${path.relative(rootDir, pngPath)}`);
      }
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
