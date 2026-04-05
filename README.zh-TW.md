# PPT Design 繁體中文說明

語言： [English](./README.md) | [简体中文](./README.zh.md) | **繁體中文**

`ppt-design` 是一個可重用的 Codex skill，用來把演示內容設計成 `1600x900` 的 HTML slide，並在需要時進一步匯出成高保真的 PPTX。

相容 Claude Code，也支援透過 `skills.sh` 安裝。

它的重點不是做文件排版，而是做演示稿設計：

- 先選擇 style，再開始生成頁面
- 支援按 style 處理中文、英文與中英混排字體
- 主要輸入格式是按頁組織好的 Markdown
- 支援 `background_mode=paper|white`
- 每一頁生成後都要做版式 review，檢查越界、碰撞與可讀性
- 最終可以匯出成 PNG 與 PPTX

## 關於

這個 skill 是圍繞「內容到演示稿」的流程設計的，不是圍繞「空白畫布自由創作」的流程設計的。

推薦的輸入方式是使用者先交一份 Markdown，而且 Markdown 裡已經把內容按頁組織好，例如：

- `Page 1`
- `Page 2`
- `Page 3`

系統拿到這份 Markdown 以後，會做這些事情：

1. 讀取每一頁的內容。
2. 判斷這一頁更像什麼頁面：
   - 封面頁
   - 總結頁
   - 章節頁
   - 對比頁
   - 數據洞察頁
3. 選擇或套用一個統一的視覺 style。
4. 把原始 Markdown 重新編排成適合演示的 `1600x900` 頁面，而不是照搬文件格式。
5. 檢查文字有沒有越界、元素有沒有碰撞、內容是不是太密、字級是否適合投影。
6. 如果使用者需要，再把結果匯出成 PNG 與 PPTX。

目標不是保留 Markdown 原來的文件樣子，而是把它轉換成一套更適合講述、更適合展示，也更有視覺統一性的 PPT 頁面。

## 作為 Skill 安裝

這個倉庫現在已經整理成可安裝的 skill 結構，適合 Claude Code 和 `skills.sh` 的使用方式。

相容範圍：

- Claude Code
- `skills.sh`
- 基於 `SKILL.md` 的 skill 倉庫安裝方式

安裝命令：

```bash
npx skills add https://github.com/Phlegonlabs/Powerpoint-fancy-design --skill ppt-design
```

可分發的 skill bundle 在這裡：

- [`skills/ppt-design/SKILL.md`](./skills/ppt-design/SKILL.md)

安裝後拿到的內容包括：

- `ppt-design` 的核心 skill prompt
- style selector 和雙語字體參考文件
- 10 套 style 規則
- 渲染與 PPT 匯出腳本
- 可直接套用的 Markdown deck 模板

## 演示設計標準

這個 skill 對外呈現出來的狀態，應該像一套專業的 PowerPoint 設計系統，而不是一組鬆散的素材。

這意味著：

- 字體和圖形不能搶同一個閱讀焦點
- 深色塊和高飽和圖形不能直接撞進正文閱讀區，除非留白和對比是經過控制的
- 裝飾元素必須服務層級，而不是破壞層級
- 每一張 preview 和每一頁 slide 都應該像真的可以拿去做客戶提案、產品匯報或正式演示
- 就算 style 很大膽，閱讀順序和版式節奏也必須保持乾淨

## Markdown 輸入流程

推薦使用者提供一份已經按頁組織好的 Markdown。

例如：

```markdown
# Page 1
## 標題
2026 市場展望

## 副標題
為什麼東南亞是下一階段重點

## 要點
- 電動車滲透率集中在三個城市群提升
- 電池在地化讓利潤預期變得更清晰
- 各國政策支持力度仍然不平均
```

系統應該這樣處理：

1. 把每一個 `Page X` 識別成一頁 slide。
2. 判斷這一頁是什麼類型：
   - 封面頁
   - 總結頁
   - 對比頁
   - 章節頁
   - 數據洞察頁
3. 不照搬原始 Markdown 的排版，而是重組為演示級層級。
4. 把同一個 style 一致地應用到整套 deck。
5. 渲染後檢查越界、碰撞、過密與閱讀距離問題。

可直接套用的模板文件：

- [`references/deck-markdown-template.md`](./references/deck-markdown-template.md)

## Style 範例

下面每個 style section 都配一張繁體中文 PNG 預覽圖，用來說明「如果用這個 style 做 PPT，大概會長什麼樣」。

### A. Swiss International

![Swiss International preview](./assets/style-preview-zh-tw-a.png)

### B. East Asian Minimalism

![East Asian Minimalism preview](./assets/style-preview-zh-tw-b.png)

### C. Risograph Print

![Risograph Print preview](./assets/style-preview-zh-tw-c.png)

### D. Bauhaus Geometry

![Bauhaus Geometry preview](./assets/style-preview-zh-tw-d.png)

### E. Organic Handcrafted

![Organic Handcrafted preview](./assets/style-preview-zh-tw-e.png)

### F. Art Deco Luxury

![Art Deco Luxury preview](./assets/style-preview-zh-tw-f.png)

### G. Neo Brutalism

![Neo Brutalism preview](./assets/style-preview-zh-tw-g.png)

### H. Retro Futurism

![Retro Futurism preview](./assets/style-preview-zh-tw-h.png)

### I. Dark Editorial

![Dark Editorial preview](./assets/style-preview-zh-tw-i.png)

### J. Memphis Pop

![Memphis Pop preview](./assets/style-preview-zh-tw-j.png)

## Review 標準

生成每一頁後，都要再檢查一輪：

- 文字不能碰撞
- 內容不能越界
- 字級要適合演示距離
- 長文本和表格式內容要重新組織
- 修正可讀性之後，style 不能被破壞
