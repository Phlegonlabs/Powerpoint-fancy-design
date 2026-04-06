# PPT Design 繁體中文說明

語言： [English](./README.md) | [简体中文](./README.zh.md) | **繁體中文**

![Release](https://img.shields.io/badge/release-v0.3.0-1f2937)
![Skill](https://img.shields.io/badge/skill-ppt--design-b85038)
![Agents](https://img.shields.io/badge/agents-Codex%20%7C%20Claude%20Code-4b5563)

`ppt-design` 是一套面向演示稿設計的 skill，用來把按頁組織好的 Markdown 轉成 `1600x900` 的 HTML slides，並在需要時進一步匯出成高保真的圖片式 PPTX。

它同時支援 Codex 與 Claude Code 工作流。倉庫根目錄是完整開發工作區；`skills/ppt-design/` 是可分發的 skill bundle，鏡像了共享的 skill 內容。

當前版本：

- [`v0.3.0 更新說明`](./RELEASE_NOTES_v0.3.0.md)

## 快速開始

1. 先執行 `npm install` 和 `npx playwright install chromium`。
2. 準備一份按 `Page 1`、`Page 2` 組織好的 Markdown。
3. 讓 skill 自動推薦 style，或直接指定 style。
4. 先生成 HTML slides，審查後再按需匯出 PNG 或 PPTX。

如果你想直接開始使用，建議先從 [`cases/templates/`](./cases/templates/) 裡的通用模板入手。

## 它能做什麼

- 當使用者未指定風格時，推薦合適的 style。
- 以按頁組織的 Markdown 作為主要輸入格式。
- 支援中文與中英混排，並依 style 套用不同字體配對規則。
- 支援相容淺色風格的 `background_mode=paper|white`。
- 在寫 HTML 前先識別每頁內容角色，再選 layout prototype。
- 強制使用安全內容邊界，保證主內容停留在演示安全區內。
- 當結構本身承載意義時，保留幾何敏感的圖示與嚴格表格。
- 每頁生成後都做版式審查，檢查越界、碰撞與可讀性。
- 最終把 HTML slides 匯出成 PNG，再匯出成 PPTX。
- public-stage demo 預設作為內部 benchmark 與 release gate，不作為倉庫對外 showcase。

## 典型使用場景

- 需要嚴謹層級與投影可讀性的商業簡報、政策摘要、研究總結。
- 需要比一般模板更強視覺方向的品牌、文化、展覽型 deck。
- 需要依 style 處理中英文字體關係的中文或雙語演示稿。
- 需要透過靜態 HTML 保真匯出 PPTX，而不是依賴可編輯 PowerPoint 原生物件的場景。

## 當前工作流

核心工作流定義在：

- [`SKILL.md`](./SKILL.md)
- [`skills/ppt-design/SKILL.md`](./skills/ppt-design/SKILL.md)

關鍵參考文件鏈路如下：

1. [`references/style-selector.md`](./references/style-selector.md)
2. [`references/bilingual-typography.md`](./references/bilingual-typography.md)（僅中文或雙語 deck 需要）
3. [`references/background-modes.md`](./references/background-modes.md)
4. [`references/presentation-layout-rules.md`](./references/presentation-layout-rules.md)
5. [`references/html-review-checklist.md`](./references/html-review-checklist.md)
6. [`references/presentation-quality-rubric.md`](./references/presentation-quality-rubric.md)
7. [`references/layout-prototypes.md`](./references/layout-prototypes.md)
8. [`references/safe-zone.md`](./references/safe-zone.md)
9. [`references/geometry-preserve.md`](./references/geometry-preserve.md)（圖示與嚴格表格需要）
10. 選中的 style 文件，位於 [`styles/`](./styles/)

整個流程是內容優先的：

1. 讀取按 `Page 1`、`Page 2` 組織的 Markdown。
2. 識別每頁屬於 `cover`、`metric`、`comparison`、`closing` 等內容角色。
3. 根據 style family 與內容角色選擇 layout prototype。
4. 保證主內容始終落在 slide safe zone 內。
5. 如果頁面是框圖、組織圖或嚴格表格，優先保留幾何結構。
6. 每頁輸出一個 HTML 檔案。
7. 審查並修正後再交付。
8. 只在需要時匯出 PPT。

## Public-Stage 任務流程

當目標是公開 presentation 時，預設流程不再是「生成一次後直接匯出」，而是：

1. Draft generation
2. Polish pass
3. Audit gate
4. Render / export

對應的 benchmark 產物預設寫入內部輸出目錄，用於品質驗收，而不是預設對外發布。

## 版式與安全區約束

當前系統已經不是「整頁隨意鋪內容」的模板，而是固定的 slide 合同：

- 畫布：`1600 x 900`
- 主內容區：`y = 108px` 到 `y = 804px`
- 頂部預留區：`0-96px`
- 底部預留區：`804-900px`
- 所有主內容都必須放在 `.main-frame` 內
- chrome labels 由 `chrome=all|bookend|none` 控制
- 預設 chrome 模式為 `bookend`

詳見：

- [`references/layout-prototypes.md`](./references/layout-prototypes.md)
- [`references/safe-zone.md`](./references/safe-zone.md)
- [`references/geometry-preserve.md`](./references/geometry-preserve.md)

## 風格畫廊

當前 skill 內建 10 套 style。這裡的畫廊更適合被理解成「能力地圖」：
不是 10 套對外 campaign 成品，而是 10 套可進入 `draft -> polish -> audit` 流程的演示語言。

### 一屏總覽

| A. Swiss International | B. East Asian Minimalism |
|---|---|
| ![Swiss International](./assets/style-preview-zh-tw-a.png) | ![East Asian Minimalism](./assets/style-preview-zh-tw-b.png) |
| `editorial` • 克制、理性、管理層友好 | `minimal` • 安靜、留白大、展陳感 |

| C. Risograph Print | D. Bauhaus Geometry |
|---|---|
| ![Risograph Print](./assets/style-preview-zh-tw-c.png) | ![Bauhaus Geometry](./assets/style-preview-zh-tw-d.png) |
| `poster` • 獨立、分層、活動傳播感強 | `geometry` • 結構強、銳利、適合 keynote |

| E. Organic Handcrafted | F. Art Deco Luxury |
|---|---|
| ![Organic Handcrafted](./assets/style-preview-zh-tw-e.png) | ![Art Deco Luxury](./assets/style-preview-zh-tw-f.png) |
| `organic` • 溫暖、有觸感、品牌敘事友好 | `luxury` • 深色、儀式感、偏高端 |

| G. Neo Brutalism | H. Retro Futurism |
|---|---|
| ![Neo Brutalism](./assets/style-preview-zh-tw-g.png) | ![Retro Futurism](./assets/style-preview-zh-tw-h.png) |
| `brutal` • 高對比、硬邊界、發布會氣質強 | `future` • 科技感、電影感、暗場表現強 |

| I. Dark Editorial | J. Memphis Pop |
|---|---|
| ![Dark Editorial](./assets/style-preview-zh-tw-i.png) | ![Memphis Pop](./assets/style-preview-zh-tw-j.png) |
| `dark-editorial` • 高級、嚴肅、紀錄片感 | `playful` • 明亮、活潑、公共傳播感強 |

### 風格資料表

| Style | 名稱 | Family | 適合內容 | Public-Stage 適配度 | `white` |
|---|---|---|---|---|---|
| A | Swiss International | editorial | 管理層發布、政策型公開說明、研究型 reveal | 很高 | Yes |
| B | East Asian Minimalism | minimal | 品牌敘事、展陳式發布、文化內容 | 高 | Yes |
| C | Risograph Print | poster | campaign reveal、創意發布、獨立品牌公告 | 高 | Yes |
| D | Bauhaus Geometry | geometry | 產品框架、設計 keynote、結構型發布故事 | 很高 | Yes |
| E | Organic Handcrafted | organic | 生活方式發布、品牌故事、創始人敘事 | 高 | Yes |
| F | Art Deco Luxury | luxury | 高端品牌發布、禮賓場景、儀式型活動 | 高 | No |
| G | Neo Brutalism | brutal | 創業發布、宣言型 deck、強態度 keynote | 高 | Yes |
| H | Retro Futurism | future | 未來科技 reveal、遊戲發布、暗場 tech deck | 中 | No |
| I | Dark Editorial | dark-editorial | 紀錄片式敘事、調查型發布、嚴肅主題故事 | 很高 | No |
| J | Memphis Pop | playful | 教育發布、社交 campaign、娛樂節目場景 | 高 | Yes |

詳細規則位於：

- [`references/style-selector.md`](./references/style-selector.md)
- [`styles/`](./styles/)

## 倉庫結構

```text
ppt-design/
|- SKILL.md
|- CLAUDE.md
|- references/
|  |- background-modes.md
|  |- bilingual-typography.md
|  |- deck-markdown-template.md
|  |- geometry-preserve.md
|  |- html-review-checklist.md
|  |- layout-prototypes.md
|  |- presentation-quality-rubric.md
|  |- presentation-layout-rules.md
|  |- safe-zone.md
|  `- style-selector.md
|- styles/
|  |- style_a.md
|  |- ...
|  `- style_j.md
|- scripts/
|  |- render_slides.mjs
|  |- export_ppt.mjs
|  |- build_public_stage_cases.mjs
|  |- build_twitter_style_cases.mjs
|  |- build_review_sheets.mjs
|  |- generate_style_previews.mjs
|  |- public_stage_cases/
|  |- slide_engine/
|  `- twitter_style_cases/
|- skills/
|  `- ppt-design/
|     |- SKILL.md
|     |- references/
|     |- styles/
|     `- scripts/
`- outputs/
   |- html/
   |- rendered/
   `- ppt/
```

## 根目錄與 skill bundle 的關係

倉庫根目錄是完整工作區，包含：

- `package.json` 與 `package-lock.json`
- 開發與審計腳本
- 預覽資產
- 示例生成與審計腳本
- Claude Code 專案入口

`skills/ppt-design/` 是可分發的 skill 內容包，包含：

- 共享的 `SKILL.md`
- 共享 references
- 共享 styles
- 共享的 `render_slides.mjs` 與 `export_ppt.mjs`

這代表：

- 兩邊核心 skill 工作流一致
- 根目錄是完整超集
- `skills/ppt-design/` 適合拿去分發或安裝
- 當前倉庫中的依賴安裝仍然從根目錄完成

## 入口檔案

- [`SKILL.md`](./SKILL.md) 是核心 skill 工作流。
- [`CLAUDE.md`](./CLAUDE.md) 是倉庫內的 assistant 協作說明。

## 環境準備

安裝依賴：

```powershell
npm install
npx playwright install chromium
```

## 常用命令

HTML 渲染為 PNG：

```powershell
node .\scripts\render_slides.mjs --input .\outputs\html --output .\outputs\rendered
```

PNG 匯出為 PPTX：

```powershell
node .\scripts\export_ppt.mjs --input .\outputs\rendered --output .\outputs\ppt\deck.pptx
```

兩步一起執行：

```powershell
npm run build:ppt
```

生成 style 預覽資產：

```powershell
npm run build:style-previews
```

執行完整的 public-stage 內部 benchmark：

```powershell
npm run build:public-stage
```

## PPT 匯出中繼資料

PPT 作者與公司資訊由環境變數控制：

```powershell
$env:PPT_AUTHOR = "Your Name"
$env:PPT_COMPANY = "Your Team"
```

若未設定，則回退為：

- `PPT_AUTHOR`: `AI Agent`
- `PPT_COMPANY`: `PPT Design Skill`

## 建議的 Markdown 輸入方式

建議使用者提供一份已經按頁組織好的 Markdown。

例如：

```markdown
# Page 1
## 標題
2026 市場展望

## 副標題
為什麼東南亞是下一階段重點

## 要點
- 電動車滲透率集中在三個城市群提升
- 電池在地化讓利潤預期更清晰
- 各國政策支持力度仍然不平均

# Page 2
## 標題
關鍵驅動因素

## 模組
### 需求端
- 車隊採購
- 城市充電增長
```

可復用模板：

- [`references/deck-markdown-template.md`](./references/deck-markdown-template.md)

## 模板庫

現在倉庫更強調「通用模板」作為生產起點，而不是把某一個具體主題案例當作對外代表作。
這些模板的任務是縮短成稿時間、統一資訊層級，並為後續 polish 提供穩定骨架。

推薦起始檔案：

- [`references/deck-markdown-template.md`](./references/deck-markdown-template.md)
- [`cases/templates/five-slide-generic.md`](./cases/templates/five-slide-generic.md)
- [`cases/templates/five-slide-generic.zh.md`](./cases/templates/five-slide-generic.zh.md)
- [`cases/templates/ten-slide-generic.zh.md`](./cases/templates/ten-slide-generic.zh.md)

這些模板適合：

- 需要一個不綁定具體主題的中性結構
- 需要可重複使用的 deck 骨架
- 先確定版式與層級，再填入實際內容

如果你要跑完整的產品級驗證，`npm run build:public-stage` 是新的標準入口。

倉庫中的 demo builder 現在更明確地作為內部 benchmark / release gate：

- public-stage 流程固定為 `draft -> polish -> audit -> render / export`
- 它們預設不承擔對外展示倉庫能力的 marketing 角色
- `twitter` / `template` builder 仍可作為內部對照案例保留

## 品質標準

這套 skill 比一般 HTML 生成器更嚴格。

每一頁最終都應滿足：

- 文字不碰撞
- 內容不裁切
- 字級適合投影距離
- 長文本有清晰層級
- 留白與 padding 符合 slide 閱讀邏輯
- 主內容全部位於 `.main-frame`
- 頂部與底部預留區沒有誤放正文
- 相鄰頁面不重複同一個 layout prototype

具體檢查規則位於：

- [`references/presentation-layout-rules.md`](./references/presentation-layout-rules.md)
- [`references/html-review-checklist.md`](./references/html-review-checklist.md)
- [`references/presentation-quality-rubric.md`](./references/presentation-quality-rubric.md)

## 輸出目錄

- HTML slides: [`outputs/html/`](./outputs/html/)
- rendered PNGs: [`outputs/rendered/`](./outputs/rendered/)
- PPTX decks: [`outputs/ppt/`](./outputs/ppt/)

## 備註

- 根目錄包含一些不在最小 skill 包中的輔助腳本與審計工具。
- `outputs/html/` 中的歷史 smoke-test 檔案只是本地產物，不代表當前標準模板。
- 一切最終行為以 `SKILL.md` 與 references 文件為準。
