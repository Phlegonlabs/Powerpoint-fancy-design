import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, '..', 'assets');

const styles = [
  {
    id: 'a',
    code: 'A',
    name: 'Swiss International',
    eyebrow: 'Editorial grid with one controlled disruption',
    caseTitle: 'ASEAN EV Market Outlook',
    caseCopy: [
      'Regional investor briefing with one',
      'headline number, one proof chart,',
      'and a restrained print finish.',
    ],
    fit: 'Reports, policy, finance',
    background: 'paper or white',
    chip: { text: 'WHITE OK', fill: '#D1FADF', textFill: '#0F5132' },
    scene: ({ textBlock }) => `
      <rect x="84" y="98" width="612" height="324" rx="26" fill="#F0EBE2"/>
      <line x1="130" y1="138" x2="304" y2="138" stroke="#B85038" stroke-width="5"/>
      <text x="130" y="210" style="font:700 54px Georgia, serif; fill:#22242C;">ASEAN</text>
      <text x="130" y="278" style="font:700 94px Georgia, serif; fill:#22242C;">48%</text>
      <line x1="130" y1="298" x2="372" y2="298" stroke="#2A2A30" stroke-opacity="0.16"/>
      <rect x="468" y="148" width="164" height="120" fill="none" stroke="#2A2A30" stroke-opacity="0.18"/>
      <path d="M486 246 L524 216 L560 224 L600 182" stroke="#B85038" stroke-width="4" fill="none"/>
      ${textBlock(468, 314, ['MARKET SHARE', 'Grid-first summary'], '14', '#6A6560')}
      <line x1="84" y1="98" x2="84" y2="116" stroke="#2A2A30" stroke-opacity="0.28"/>
      <line x1="84" y1="98" x2="102" y2="98" stroke="#2A2A30" stroke-opacity="0.28"/>
      <line x1="696" y1="98" x2="678" y2="98" stroke="#2A2A30" stroke-opacity="0.28"/>
      <line x1="696" y1="98" x2="696" y2="116" stroke="#2A2A30" stroke-opacity="0.28"/>
    `,
  },
  {
    id: 'b',
    code: 'B',
    name: 'East Asian Minimalism',
    eyebrow: 'Large silence and one meditative focal form',
    caseTitle: 'Tea House Brand Philosophy',
    caseCopy: [
      'A quiet founder story deck with one',
      'ink-like circle, one horizontal rule,',
      'and generous open space.',
    ],
    fit: 'Brand values, exhibitions, culture',
    background: 'paper or white',
    chip: { text: 'WHITE OK', fill: '#D1FADF', textFill: '#0F5132' },
    scene: ({ textBlock }) => `
      <rect x="84" y="98" width="612" height="324" rx="26" fill="#F5F0E6"/>
      <circle cx="246" cy="220" r="72" fill="#2D3A5C"/>
      <line x1="146" y1="332" x2="642" y2="332" stroke="#C45A3C" stroke-width="2"/>
      ${textBlock(474, 236, ['QUIET CRAFT', 'One form, one idea'], '18', '#6A6560')}
    `,
  },
  {
    id: 'c',
    code: 'C',
    name: 'Risograph Print',
    eyebrow: 'Two-ink collisions with rough print energy',
    caseTitle: 'Indie Festival Launch',
    caseCopy: [
      'Creative pitch slides with overprint',
      'circles, offset bars, and a loud',
      'poster-like headline block.',
    ],
    fit: 'Events, youth campaigns, indie brands',
    background: 'paper or white',
    chip: { text: 'WHITE OK', fill: '#D1FADF', textFill: '#0F5132' },
    scene: ({ textBlock }) => `
      <rect x="84" y="98" width="612" height="324" rx="26" fill="#F2EDE0"/>
      <circle cx="248" cy="210" r="82" fill="#E8456B" fill-opacity="0.78"/>
      <circle cx="328" cy="224" r="82" fill="#1A5C5A" fill-opacity="0.78"/>
      <rect x="154" y="292" width="220" height="20" fill="#1A5C5A"/>
      <rect x="162" y="300" width="220" height="20" fill="#E8456B" fill-opacity="0.28"/>
      <rect x="452" y="138" width="112" height="112" fill="#1A5C5A"/>
      ${textBlock(452, 300, ['POSTER ENERGY', 'Layered and imperfect'], '14', '#6A6560')}
    `,
  },
  {
    id: 'd',
    code: 'D',
    name: 'Bauhaus Geometry',
    eyebrow: 'Poster tension built from hard geometry',
    caseTitle: 'Modular Construction Systems',
    caseCopy: [
      'Strategy slides using diagonal blocks,',
      'bold anchors, and a visual rhythm',
      'that feels structural and direct.',
    ],
    fit: 'Architecture, systems, strategy',
    background: 'paper or white',
    chip: { text: 'WHITE OK', fill: '#D1FADF', textFill: '#0F5132' },
    scene: ({ textBlock }) => `
      <rect x="84" y="98" width="612" height="324" rx="26" fill="#F2EDE4"/>
      <polygon points="124,392 394,134 658,134 388,392" fill="#D4C8A8"/>
      <polygon points="408,392 696,190 696,392" fill="#8A3A2A"/>
      <rect x="154" y="170" width="116" height="28" fill="#1A1A1A"/>
      ${textBlock(466, 284, ['BUILD FAST', 'Geometry as hierarchy'], '16', '#6A6560')}
    `,
  },
  {
    id: 'e',
    code: 'E',
    name: 'Organic Handcrafted',
    eyebrow: 'Warm tactile slides with painterly softness',
    caseTitle: 'Wellness Retreat Story',
    caseCopy: [
      'Lifestyle storytelling with soft blobs,',
      'earthy color overlap, and breathing',
      'room around short emotional copy.',
    ],
    fit: 'Wellness, food, human stories',
    background: 'paper or white',
    chip: { text: 'WHITE OK', fill: '#D1FADF', textFill: '#0F5132' },
    scene: ({ textBlock }) => `
      <rect x="84" y="98" width="612" height="324" rx="26" fill="#F2ECE2"/>
      <path d="M212 346C144 304 148 208 238 170C328 132 434 154 452 228C470 308 392 362 310 356C266 352 234 352 212 346Z" fill="#A07850"/>
      <path d="M390 172C444 158 498 182 522 226C548 272 532 338 478 360C424 382 372 354 346 320C314 280 326 218 350 192C360 180 372 176 390 172Z" fill="#6A8A7A" fill-opacity="0.86"/>
      <path d="M150 356C222 318 302 318 382 352" stroke="#3A3530" stroke-opacity="0.35" stroke-width="6" stroke-linecap="round"/>
      ${textBlock(480, 258, ['SLOW CARE', 'Texture-led warmth'], '16', '#6A6560')}
    `,
  },
  {
    id: 'f',
    code: 'F',
    name: 'Art Deco Luxury',
    eyebrow: 'Dark ceremonial symmetry and gold linework',
    caseTitle: 'Grand Ballroom Awards Night',
    caseCopy: [
      'Premium event slides with centered',
      'composition, metallic rules, and a',
      'formal sense of occasion.',
    ],
    fit: 'Luxury, hospitality, awards',
    background: 'paper only',
    chip: { text: 'DARK NATIVE', fill: '#FEE4E2', textFill: '#7A271A' },
    scene: ({ textBlock }) => `
      <rect x="84" y="98" width="612" height="324" rx="26" fill="#0E1118"/>
      <path d="M390 140 L486 310 L294 310 Z" stroke="#C4A265" stroke-width="2.4" fill="none"/>
      <line x1="390" y1="124" x2="390" y2="334" stroke="#C4A265" stroke-width="1.4"/>
      <line x1="242" y1="320" x2="538" y2="320" stroke="#C4A265" stroke-width="1.4"/>
      <line x1="210" y1="160" x2="570" y2="160" stroke="#C4A265" stroke-opacity="0.36"/>
      ${textBlock(470, 258, ['CEREMONIAL', 'Symmetry and prestige'], '16', '#A98A57')}
    `,
  },
  {
    id: 'g',
    code: 'G',
    name: 'Neo Brutalism',
    eyebrow: 'Hard shadows, thick borders, startup noise',
    caseTitle: 'AI Workflow Tool Launch',
    caseCopy: [
      'Punchy launch slides with stacked',
      'blocks, hard strokes, and a blunt',
      'headline rhythm built for momentum.',
    ],
    fit: 'Startups, product launches, manifestos',
    background: 'paper or white',
    chip: { text: 'WHITE OK', fill: '#D1FADF', textFill: '#0F5132' },
    scene: ({ textBlock }) => `
      <rect x="84" y="98" width="612" height="324" rx="26" fill="#F5F0E0"/>
      <rect x="150" y="164" width="178" height="68" fill="#FFE156" stroke="#1A1A1A" stroke-width="6"/>
      <rect x="220" y="230" width="196" height="66" fill="#FF6B6B" stroke="#1A1A1A" stroke-width="6"/>
      <rect x="432" y="150" width="94" height="38" transform="rotate(5 432 150)" fill="#4ECDC4" stroke="#1A1A1A" stroke-width="6"/>
      ${textBlock(464, 330, ['SHIP NOW', 'Raw contrast wins'], '16', '#6A6560')}
    `,
  },
  {
    id: 'h',
    code: 'H',
    name: 'Retro Futurism',
    eyebrow: 'Horizon grids and restrained neon drama',
    caseTitle: 'Space Game Reveal Deck',
    caseCopy: [
      'Cinematic reveal slides using a dark',
      'horizon line, scanline detail, and',
      'cool futuristic restraint.',
    ],
    fit: 'Gaming, sci-fi, future tech',
    background: 'paper only',
    chip: { text: 'DARK NATIVE', fill: '#FEE4E2', textFill: '#7A271A' },
    scene: ({ textBlock }) => `
      <rect x="84" y="98" width="612" height="324" rx="26" fill="#0B0D1D"/>
      <line x1="118" y1="324" x2="662" y2="324" stroke="#2A6A8A" stroke-width="2"/>
      <line x1="196" y1="170" x2="124" y2="324" stroke="#1A3A5A" stroke-width="1.4"/>
      <line x1="276" y1="170" x2="214" y2="324" stroke="#1A3A5A" stroke-width="1.4"/>
      <line x1="356" y1="170" x2="318" y2="324" stroke="#1A3A5A" stroke-width="1.4"/>
      <line x1="436" y1="170" x2="422" y2="324" stroke="#1A3A5A" stroke-width="1.4"/>
      <line x1="148" y1="294" x2="632" y2="294" stroke="#40E8D0" stroke-opacity="0.76" stroke-width="2"/>
      ${textBlock(456, 236, ['SIGNAL LOCK', 'Dark grid reveal'], '16', '#79C7C0')}
    `,
  },
  {
    id: 'i',
    code: 'I',
    name: 'Dark Editorial',
    eyebrow: 'Magazine seriousness with high-contrast pacing',
    caseTitle: 'Ocean Surveillance Documentary',
    caseCopy: [
      'Longform research storytelling with',
      'dark breathing room, sharp headlines,',
      'and a deliberate investigative tone.',
    ],
    fit: 'Research, documentaries, findings',
    background: 'paper only',
    chip: { text: 'DARK NATIVE', fill: '#FEE4E2', textFill: '#7A271A' },
    scene: ({ textBlock }) => `
      <rect x="84" y="98" width="612" height="324" rx="26" fill="#111116"/>
      <text x="146" y="220" style="font:700 58px Georgia, serif; fill:#E8E4DC;">Sharp</text>
      <text x="146" y="288" style="font:700 76px Georgia, serif; fill:#E8E4DC;">Evidence</text>
      <line x1="146" y1="300" x2="482" y2="300" stroke="#A89878" stroke-width="1.4" stroke-opacity="0.5"/>
      <line x1="146" y1="320" x2="402" y2="320" stroke="#2A2A30" stroke-width="1.4"/>
      ${textBlock(476, 248, ['LONGFORM', 'Authority by pacing'], '16', '#B8A98D')}
    `,
  },
  {
    id: 'j',
    code: 'J',
    name: 'Memphis Pop',
    eyebrow: 'Playful collisions and anti-grid movement',
    caseTitle: 'School Reading Campaign',
    caseCopy: [
      'Education slides with bright shapes,',
      'scattered motion, and a fun rhythm',
      'that keeps the story energetic.',
    ],
    fit: 'Education, social campaigns, festivals',
    background: 'paper or white',
    chip: { text: 'WHITE OK', fill: '#D1FADF', textFill: '#0F5132' },
    scene: ({ textBlock }) => `
      <rect x="84" y="98" width="612" height="324" rx="26" fill="#FAF5E8"/>
      <circle cx="176" cy="180" r="26" fill="#2EC4B6" stroke="#2A2A2A" stroke-width="3"/>
      <polygon points="506,130 548,214 464,214" fill="#FFD23F" stroke="#2A2A2A" stroke-width="3"/>
      <path d="M128 312 Q154 270 180 312 Q206 354 232 312 Q258 270 284 312" stroke="#FF8A5C" stroke-width="7" fill="none"/>
      <path d="M362 324 L392 294 L422 324 L452 294 L482 324" stroke="#FF6B9D" stroke-width="7" fill="none"/>
      <rect x="284" y="170" width="62" height="62" fill="#4A90D9" stroke="#2A2A2A" stroke-width="3"/>
      ${textBlock(464, 274, ['READ LOUD', 'Color as momentum'], '16', '#6A6560')}
    `,
  },
];

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function multiLineText(x, y, lines, fontSize, fill, weight = 400, family = "'Segoe UI', Arial, sans-serif", lineHeight = fontSize + 8) {
  return `<text x="${x}" y="${y}" fill="${fill}" style="font:${weight} ${fontSize}px ${family};">${lines
    .map((line, index) => `<tspan x="${x}" dy="${index === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`)
    .join('')}</text>`;
}

function sceneTextBlock(x, y, lines, fontSize, fill) {
  const lineHeight = Number(fontSize) + 8;
  return `<text x="${x}" y="${y}" fill="${fill}" style="font:600 ${fontSize}px 'Segoe UI', Arial, sans-serif; letter-spacing:0.6px;">${lines
    .map((line, index) => `<tspan x="${x}" dy="${index === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`)
    .join('')}</text>`;
}

function renderCard(style) {
  return `\
<svg width="1240" height="520" viewBox="0 0 1240 520" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg-${style.id}" x1="42" y1="28" x2="1190" y2="502" gradientUnits="userSpaceOnUse">
      <stop stop-color="#F6F2EA"/>
      <stop offset="1" stop-color="#E8EDF7"/>
    </linearGradient>
    <filter id="shadow-${style.id}" x="-20%" y="-20%" width="140%" height="160%">
      <feDropShadow dx="0" dy="18" stdDeviation="20" flood-color="#101828" flood-opacity="0.10"/>
    </filter>
  </defs>

  <rect width="1240" height="520" rx="34" fill="url(#bg-${style.id})"/>
  <circle cx="1108" cy="84" r="96" fill="#DCE4F3"/>
  <circle cx="92" cy="454" r="126" fill="#ECE2D4"/>

  <text x="58" y="58" fill="#667085" style="font:700 14px 'Consolas', 'Courier New', monospace; letter-spacing:1.8px;">STYLE ${style.code}</text>
  <text x="58" y="94" fill="#101828" style="font:700 34px Georgia, serif;">${escapeXml(style.name)}</text>
  <text x="58" y="122" fill="#475467" style="font:400 18px 'Segoe UI', Arial, sans-serif;">${escapeXml(style.eyebrow)}</text>

  <g filter="url(#shadow-${style.id})">
    <rect x="58" y="146" width="664" height="328" rx="34" fill="#FFFFFF" fill-opacity="0.9"/>
    ${style.scene({ textBlock: sceneTextBlock })}
  </g>

  <rect x="756" y="146" width="426" height="328" rx="30" fill="#FFFFFF" fill-opacity="0.92" filter="url(#shadow-${style.id})"/>
  <text x="792" y="192" fill="#667085" style="font:700 12px 'Consolas', 'Courier New', monospace; letter-spacing:1.4px;">CASE EXAMPLE</text>
  ${multiLineText(792, 234, [style.caseTitle], 32, '#101828', 700, 'Georgia, serif', 38)}
  ${multiLineText(792, 286, style.caseCopy, 18, '#344054', 400, "'Segoe UI', Arial, sans-serif", 28)}
  <text x="792" y="392" fill="#667085" style="font:700 12px 'Consolas', 'Courier New', monospace; letter-spacing:1.4px;">BEST FOR</text>
  <text x="792" y="418" fill="#101828" style="font:600 18px 'Segoe UI', Arial, sans-serif;">${escapeXml(style.fit)}</text>

  <rect x="792" y="438" width="118" height="24" rx="12" fill="${style.chip.fill}"/>
  <text x="816" y="454" fill="${style.chip.textFill}" style="font:700 12px 'Segoe UI', Arial, sans-serif;">${escapeXml(style.chip.text)}</text>
  <text x="930" y="454" fill="#475467" style="font:600 14px 'Segoe UI', Arial, sans-serif;">Background: ${escapeXml(style.background)}</text>
</svg>`;
}

function renderIndex(styles) {
  const width = 1600;
  const height = 920;
  const columns = 5;
  const tileWidth = 264;
  const tileHeight = 272;
  const gap = 24;
  const startX = 92;
  const startY = 182;
  const previewScale = 0.235;

  const tiles = styles
    .map((style, index) => {
      const column = index % columns;
      const row = Math.floor(index / columns);
      const x = startX + column * (tileWidth + gap);
      const y = startY + row * (tileHeight + gap);
      const previewX = x - 2;
      const previewY = y - 4;

      return `
  <g transform="translate(${x} ${y})" filter="url(#tile-shadow)">
    <rect width="${tileWidth}" height="${tileHeight}" rx="26" fill="#FFFFFF" fill-opacity="0.94"/>
    <rect x="18" y="18" width="228" height="150" rx="20" fill="#F7F3EC"/>
    <g transform="translate(${previewX} ${previewY}) scale(${previewScale})">
      ${style.scene({ textBlock: () => '' })}
    </g>
    <text x="22" y="198" fill="#667085" style="font:700 12px 'Consolas', 'Courier New', monospace; letter-spacing:1.5px;">STYLE ${style.code}</text>
    <text x="22" y="226" fill="#101828" style="font:700 24px Georgia, serif;">${escapeXml(style.name)}</text>
    <rect x="22" y="242" width="104" height="16" rx="8" fill="${style.chip.fill}"/>
    <text x="44" y="254" fill="${style.chip.textFill}" style="font:700 11px 'Segoe UI', Arial, sans-serif;">${escapeXml(style.chip.text)}</text>
  </g>`;
    })
    .join('');

  return `\
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="index-bg" x1="84" y1="36" x2="1516" y2="884" gradientUnits="userSpaceOnUse">
      <stop stop-color="#F8F5EE"/>
      <stop offset="1" stop-color="#EAF0F9"/>
    </linearGradient>
    <filter id="tile-shadow" x="-20%" y="-20%" width="140%" height="160%">
      <feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="#101828" flood-opacity="0.08"/>
    </filter>
  </defs>

  <rect width="${width}" height="${height}" fill="url(#index-bg)"/>
  <circle cx="1388" cy="122" r="164" fill="#DCE5F5"/>
  <circle cx="166" cy="828" r="196" fill="#ECE2D4"/>

  <text x="92" y="92" fill="#101828" style="font:700 48px Georgia, serif;">PPT Design Style Index</text>
  <text x="92" y="130" fill="#475467" style="font:400 20px 'Segoe UI', Arial, sans-serif;">A light index of the ten directions, where each style keeps its own standalone motif.</text>

  <rect x="92" y="148" width="510" height="18" rx="9" fill="#FFFFFF" fill-opacity="0.72"/>
  <text x="108" y="161" fill="#667085" style="font:700 12px 'Consolas', 'Courier New', monospace; letter-spacing:1.4px;">INDEX ONLY. FULL CASE BOARDS LIVE IN EACH STYLE SECTION BELOW.</text>
  ${tiles}
</svg>`;
}

await fs.mkdir(outputDir, { recursive: true });

for (const style of styles) {
  const filePath = path.join(outputDir, `style-case-${style.id}.svg`);
  await fs.writeFile(filePath, renderCard(style), 'utf8');
}

await fs.writeFile(path.join(outputDir, 'style-index.svg'), renderIndex(styles), 'utf8');

console.log(`Generated ${styles.length} style case SVGs and style-index.svg in ${outputDir}`);
