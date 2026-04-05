# PPT Design 中文说明

`ppt-design` 是一个可复用的 Codex skill，用来把演示内容设计成 `1600x900` 的 HTML slide，并在需要时进一步导出成高保真的 PPTX。

英文版说明：[`README.md`](./README.md)

它的重点不是做文档排版，而是做演示稿设计：

- 先选择 style，再开始生成页面
- 支持按 style 处理中文、英文和中英混排字体
- 主要输入格式是按页组织好的 Markdown
- 支持 `background_mode=paper|white`
- 每一页生成后都要做版式 review，检查越界、碰撞和可读性
- 最终可以导出成 PNG 和 PPTX

## 关于

这个 skill 是围绕“内容到演示稿”的流程设计的，不是围绕“空白画布自由创作”的流程设计的。

推荐的输入方式是用户先交一份 Markdown，而且 Markdown 里面已经把内容按页组织好，比如：

- `Page 1`
- `Page 2`
- `Page 3`

系统拿到这份 Markdown 以后，会做这些事情：

1. 读取每一页的内容。
2. 判断这一页更像什么页面：
   - 封面页
   - 总结页
   - 章节页
   - 对比页
   - 数据洞察页
3. 选择或应用一个统一的视觉 style。
4. 把原始 Markdown 重新编排成适合演示的 `1600x900` 页面，而不是照搬文档格式。
5. 检查文字有没有越界、元素有没有碰撞、内容是不是太密、字号是否适合投影。
6. 如果用户需要，再把结果导出成 PNG 和 PPTX。

目标不是保留 Markdown 原来的文档样子，而是把它转换成一套更适合讲述、更适合展示、也更有视觉统一性的 PPT 页面。

## GitHub About 文案

Description：

`A Codex skill for turning page-by-page Markdown into styled 1600x900 HTML slides, PNG previews, and exportable PPTX decks.`

建议 topics：

`codex-skill`, `ppt`, `powerpoint`, `presentation-design`, `markdown-to-slides`, `html-slides`, `pptx`, `slide-generator`

## 它能做什么

- 每一页输出一个 HTML 文件，例如 `slide_01.html`、`slide_02.html`
- 固定使用 `1600x900` 画布
- 支持 10 种 style
- 在 README 中提供每种 style 的 PNG 预览图
- 以 Markdown 作为多页 deck 的主要内容交接格式
- 把页面级 Markdown 内容映射成 slide 级版式决策
- 强制执行 second-pass review
- 在需要时导出为 PowerPoint

## 仓库结构

```text
ppt-design/
|- SKILL.md
|- README.md
|- README.zh.md
|- agents/openai.yaml
|- references/
|  |- style-selector.md
|  |- bilingual-typography.md
|  |- background-modes.md
|  |- presentation-layout-rules.md
|  `- html-review-checklist.md
|- scripts/
|  |- generate_style_previews.mjs
|  |- render_slides.mjs
|  `- export_ppt.mjs
|- styles/
|  |- style_a.md
|  |- ...
|  `- style_j.md
`- outputs/
   |- html/
   |- rendered/
   `- ppt/
```

## 安装与使用

### 作为本地 Skill 使用

把这个项目放在你的 workspace 里，并让 Codex 直接指向这个 skill 目录。

核心入口：

- [`SKILL.md`](./SKILL.md)

Skill metadata：

- [`agents/openai.yaml`](./agents/openai.yaml)

### 安装依赖

```powershell
npm install
npx playwright install chromium
```

### 导出 HTML Slides 到 PPT

先把 HTML 渲染成 PNG：

```powershell
node .\scripts\render_slides.mjs --input .\outputs\html --output .\outputs\rendered
```

再生成 PPTX：

```powershell
node .\scripts\export_ppt.mjs --input .\outputs\rendered --output .\outputs\ppt\deck.pptx
```

或者直接执行：

```powershell
npm run build:ppt
```

生成 README 里的 style 预览图：

```powershell
npm run build:style-previews
```

## Markdown 输入流程

推荐用户提供一份已经按页组织好的 Markdown。

例如：

```markdown
# Page 1
## 标题
2026 市场展望

## 副标题
为什么东南亚是下一阶段重点

## 要点
- 电动车渗透率集中在三个城市群提升
- 电池本地化让利润预期变得更清晰
- 各国政策支持力度仍然不平均

# Page 2
## 标题
关键驱动因素

## 模块
### 需求端
- 车队采购
- 城市充电增长

### 供给端
- 电池组装
- 本地政策激励
```

系统应该这样处理：

1. 把每一个 `Page X` 识别成一页 slide。
2. 判断这一页是什么类型：
   - 封面页
   - 总结页
   - 对比页
   - 章节页
   - 数据洞察页
3. 不照搬原始 Markdown 的排版，而是重组为演示级层级。
4. 把同一个 style 一致地应用到整套 deck。
5. 渲染后检查越界、碰撞、过密和阅读距离问题。

## 工作流

1. 先确认主题、受众和交付格式。
2. 读取用户给的 Markdown，并把每一个 `Page X` 识别成一页 slide。
3. 如果用户还没选 style，就推荐 2-3 个方向。
4. 默认用英文解释 style 的视觉特征和适用场景。
5. 确认 `background_mode`：
   - 默认 `paper`
   - 只有浅色 style 支持 `white`
6. 开始逐页生成 HTML slide。
7. 每页生成后做一次 review：
   - 不能有文字碰撞
   - 不能有内容越界
   - 字号要适合投影
   - 长文本和表格式内容要重组
8. 如果用户需要，再继续导出成 PPTX。

## 背景模式

| 模式 | 含义 |
|---|---|
| `paper` | 保留纸张纹理、暖色纸底和编辑感表面 |
| `white` | 切换到干净白底，并移除纸张特有纹理 |

`white` 支持的 style：`A`、`B`、`C`、`D`、`E`、`G`、`J`

`F`、`H`、`I` 不支持 `white`，因为它们依赖暗色对比系统。

## 语言与字体

- style 推荐与 style 描述默认用英文。
- slide 正文默认保持用户原始语言，除非用户明确要求翻译。
- 中文或中英混排时，先看 [`references/bilingual-typography.md`](./references/bilingual-typography.md)，再看各个 style 文档里的字体配对规则。

## Style 总览

详细规则在 [`references/style-selector.md`](./references/style-selector.md) 和 [`styles/`](./styles/)。

| Style | 名称 | 视觉感受 | 适合内容 | `white` |
|---|---|---|---|---|
| A | Swiss International | 理性、编辑感、网格明确 | 商业报告、金融、政策、新闻总结 | Yes |
| B | East Asian Minimalism | 安静、留白大、克制 | 品牌理念、展览、文化、哲思 | Yes |
| C | Risograph Print | 粗粝、分层、独立印刷感 | 创意提案、独立品牌、活动预热 | Yes |
| D | Bauhaus Geometry | 大胆、海报感、结构明确 | 建筑、设计讲座、产品框架 | Yes |
| E | Organic Handcrafted | 温暖、手作、触感强 | wellness、餐饮、文化、生活方式叙事 | Yes |
| F | Art Deco Luxury | 深色、高级、对称、仪式感 | 奢侈品、酒店、颁奖、金融 prestige 场景 | No |
| G | Neo Brutalism | 强对比、硬边界、直接 | 产品发布、Web3、强态度 deck | Yes |
| H | Retro Futurism | 黑色科幻、CRT、地平线感 | 游戏、科技发布、太空、电子音乐 | No |
| I | Dark Editorial | 深色编辑感、严肃、高级 | 调查、纪录片、深度研究 | No |
| J | Memphis Pop | 明亮、 playful、反网格 | 教育、娱乐、社交 campaign、节庆 | Yes |

下面每个 style section 都配一张 PNG 预览图，用来说明“如果用这个 style 做 PPT，大概会长什么样”。

## Style 模板

这些 prompt template 仍然保留英文形式，方便直接给模型使用。

### A. Swiss International

![Swiss International preview](./assets/style-preview-a.png)

```text
Create a [SLIDE_COUNT]-slide presentation in the Swiss International style.
Topic: [TOPIC]
Audience: [AUDIENCE]
Goal: [GOAL]
Tone: editorial, rational, data-driven
Must include: [KEY_FACTS_OR_SECTIONS]
Background mode: [paper or white]
Content language: [LANGUAGE]
Keep the layout asymmetrical, grid-first, and presentation-readable.
```

### B. East Asian Minimalism

![East Asian Minimalism preview](./assets/style-preview-b.png)

```text
Create a [SLIDE_COUNT]-slide presentation in the East Asian Minimalism style.
Topic: [TOPIC]
Audience: [AUDIENCE]
Goal: [GOAL]
Tone: quiet, spacious, reflective
Must include: [KEY_MESSAGES]
Background mode: [paper or white]
Content language: [LANGUAGE]
Keep one main visual focus per slide and preserve large negative space.
```

### C. Risograph Print

![Risograph Print preview](./assets/style-preview-c.png)

```text
Create a [SLIDE_COUNT]-slide presentation in the Risograph Print style.
Topic: [TOPIC]
Audience: [AUDIENCE]
Goal: [GOAL]
Tone: energetic, handmade, indie print
Must include: [KEY_SECTIONS]
Background mode: [paper or white]
Content language: [LANGUAGE]
Use two-ink visual logic, registration shift, and bold print-like composition.
```

### D. Bauhaus Geometry

![Bauhaus Geometry preview](./assets/style-preview-d.png)

```text
Create a [SLIDE_COUNT]-slide presentation in the Bauhaus Geometry style.
Topic: [TOPIC]
Audience: [AUDIENCE]
Goal: [GOAL]
Tone: structural, modernist, poster-like
Must include: [KEY_SECTIONS]
Background mode: [paper or white]
Content language: [LANGUAGE]
Use diagonal composition, bold geometry, and strong title hierarchy.
```

### E. Organic Handcrafted

![Organic Handcrafted preview](./assets/style-preview-e.png)

```text
Create a [SLIDE_COUNT]-slide presentation in the Organic Handcrafted style.
Topic: [TOPIC]
Audience: [AUDIENCE]
Goal: [GOAL]
Tone: warm, tactile, human-centered
Must include: [KEY_STORY_POINTS]
Background mode: [paper or white]
Content language: [LANGUAGE]
Use soft organic forms, visible texture, and generous breathing room.
```

### F. Art Deco Luxury

![Art Deco Luxury preview](./assets/style-preview-f.png)

```text
Create a [SLIDE_COUNT]-slide presentation in the Art Deco Luxury style.
Topic: [TOPIC]
Audience: [AUDIENCE]
Goal: [GOAL]
Tone: premium, ceremonial, symmetrical
Must include: [KEY_SECTIONS]
Background mode: paper
Content language: [LANGUAGE]
Keep the layout dark, centered, elegant, and linework-driven.
```

### G. Neo Brutalism

![Neo Brutalism preview](./assets/style-preview-g.png)

```text
Create a [SLIDE_COUNT]-slide presentation in the Neo Brutalism style.
Topic: [TOPIC]
Audience: [AUDIENCE]
Goal: [GOAL]
Tone: bold, raw, high-contrast
Must include: [KEY_MESSAGES]
Background mode: [paper or white]
Content language: [LANGUAGE]
Use thick borders, hard shadows, strong color blocks, and assertive hierarchy.
```

### H. Retro Futurism

![Retro Futurism preview](./assets/style-preview-h.png)

```text
Create a [SLIDE_COUNT]-slide presentation in the Retro Futurism style.
Topic: [TOPIC]
Audience: [AUDIENCE]
Goal: [GOAL]
Tone: cinematic, sci-fi, retro-tech
Must include: [KEY_SECTIONS]
Background mode: paper
Content language: [LANGUAGE]
Use a dark horizon-grid composition, restrained neon linework, and monospaced labels.
```

### I. Dark Editorial

![Dark Editorial preview](./assets/style-preview-i.png)

```text
Create a [SLIDE_COUNT]-slide presentation in the Dark Editorial style.
Topic: [TOPIC]
Audience: [AUDIENCE]
Goal: [GOAL]
Tone: serious, premium, investigative
Must include: [KEY_ARGUMENTS_OR_FINDINGS]
Background mode: paper
Content language: [LANGUAGE]
Use sharp editorial typography, dark space, and strong headline-body contrast.
```

### J. Memphis Pop

![Memphis Pop preview](./assets/style-preview-j.png)

```text
Create a [SLIDE_COUNT]-slide presentation in the Memphis Pop style.
Topic: [TOPIC]
Audience: [AUDIENCE]
Goal: [GOAL]
Tone: playful, loud, energetic
Must include: [KEY_SECTIONS]
Background mode: [paper or white]
Content language: [LANGUAGE]
Use bright collision color, scattered geometry, and fun headline rhythm.
```

## Review 标准

生成每一页后，都要再检查一轮：

- 文字不能碰撞
- 内容不能越界
- 字号要适合演示距离
- 长文本和表格内容要重新组织
- 修正可读性之后，style 不能被破坏

对应规则文档：

- [`references/presentation-layout-rules.md`](./references/presentation-layout-rules.md)
- [`references/html-review-checklist.md`](./references/html-review-checklist.md)

## 输出位置

- HTML slides: `outputs/html/`
- rendered PNGs: `outputs/rendered/`
- PPTX decks: `outputs/ppt/`
