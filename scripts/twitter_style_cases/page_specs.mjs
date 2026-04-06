export const SAFE_ZONE = {
  top: 96,
  bottom: 96,
  innerTop: 108,
  innerBottom: 804,
};

export const pageSpecs = [
  {
    id: "page-01",
    role: "cover",
    density: "medium",
    emphasis: "title",
    preferredLayouts: ["hero-cover", "editorial-thesis"],
    mustKeep: ["2006-2024"],
    blocks: [
      { kind: "eyebrow", text: "PUBLIC CONVERSATION TIMELINE" },
      { kind: "title", text: "Twitter 发展史" },
      { kind: "subtitle", text: "从 2006 年短信状态工具到 2024 年 x.com 品牌统一" },
      {
        kind: "summary",
        text: "这套案例用同一份内容，分别套入当前仓库的 10 种风格，观察同一主题在不同版式语言中的呈现差异。",
      },
    ],
    metaLabel: "Cover",
    yearRange: "2006-2024",
    notes: [
      { label: "主题", text: "产品起点、增长节点、规则变化、收购与品牌重构" },
      { label: "对象", text: "Twitter / X 作为全球实时公共对话平台的演化路径" },
      { label: "结构", text: "10 页概览，强调关键日期、关键数字与战略转向" },
    ],
  },
  {
    id: "page-02",
    role: "chronology",
    density: "medium",
    emphasis: "chronology",
    preferredLayouts: ["offset-timeline", "story-rail"],
    mustKeep: ["2006.03.21", "2006.07.15"],
    blocks: [
      { kind: "eyebrow", text: "ORIGIN STORY" },
      { kind: "title", text: "起点：2006 年的 Twttr" },
      {
        kind: "summary",
        text: "Twitter 最初不是大型社交媒体计划，而是 Odeo 内部为短信状态同步探索出的侧项目。",
      },
    ],
    metaLabel: "Origin",
    footer:
      "早期的产品约束是短信时代的产物，但它意外塑造了平台最强的差异化：短、快、可扩散。",
    events: [
      { date: "2006.02", title: "Odeo 内部孵化", text: "项目开始开发，目标是让小群体用一条短信同步状态。" },
      { date: "2006.03.21", title: "第一条 twttr", text: "Jack Dorsey 发出“just setting up my twttr”，成为平台起点象征。" },
      { date: "2006.07.15", title: "公开发布", text: "Twttr 向公众开放，随后数月内完成更名，转为 Twitter。" },
      { date: "2006 H2", title: "从短信工具变成网络产品", text: "名字、域名和传播场景都开始扩展，不再只是手机短消息服务。" },
    ],
  },
  {
    id: "page-03",
    role: "comparison",
    density: "medium",
    emphasis: "contrast",
    preferredLayouts: ["comparison-bands", "ledger-columns"],
    mustKeep: ["SXSW", "2 万条/天", "6 万条/天"],
    blocks: [
      { kind: "eyebrow", text: "BREAKOUT MOMENT" },
      { kind: "title", text: "转折点：2007 年 SXSW 让 Twitter 出圈" },
      {
        kind: "summary",
        text: "SXSW 不是 Twitter 的起点，却是它被主流科技与媒体圈确认价值的第一场大型现场测试。",
      },
    ],
    metaLabel: "Breakout",
    columns: [
      {
        heading: "为什么 SXSW 关键",
        points: [
          "大会期间，平台使用量从约 2 万条/天升至约 6 万条/天。",
          "现场参与者用它同步议程、评论演讲、追踪热点。",
          "Twitter 首次被当作“活动的第二现场”而不是私密短信链。",
        ],
      },
      {
        heading: "Twitter 的早期价值",
        points: [
          "即时性：比博客更快，比论坛更轻。",
          "公开性：适合围观、引用、再传播。",
          "弱连接扩散：陌生人也能通过同一事件进入同一条信息流。",
        ],
      },
    ],
    footer:
      "从这时开始，Twitter 的定位逐渐清晰为“实时公共对话层”，而不是单纯的状态更新工具。",
  },
  {
    id: "page-04",
    role: "metric",
    density: "medium",
    emphasis: "metric",
    preferredLayouts: ["metric-commentary", "evidence-quote"],
    mustKeep: ["140M", "3.4 亿条推文"],
    blocks: [
      { kind: "eyebrow", text: "SCALING PHASE" },
      { kind: "title", text: "平台成型：2009 到 2012" },
      {
        kind: "summary",
        text: "到 2012 年，Twitter 已经从流行工具成长为全球舆论、新闻和文化事件的实时入口。",
      },
    ],
    metaLabel: "Scale",
    metric: { value: "140M", label: "活跃用户", note: "2012 年 3 月 21 日官方口径" },
    bullets: [
      "Twitter 官方同时披露：每天 3.4 亿条推文，约每 3 天 10 亿条。",
      "2009 年获得 Webby “Breakout of the Year”，品牌辨识度显著抬升。",
      "2010 年新版网页体验强化图片与视频消费，内容形态开始丰富。",
      "2012 年鸟形 logo 独立成主要品牌资产，平台进入全球主流社交平台序列。",
    ],
  },
  {
    id: "page-05",
    role: "thesis",
    density: "medium",
    emphasis: "takeaway",
    preferredLayouts: ["editorial-thesis", "ledger-columns"],
    mustKeep: ["$31B", "2 亿活跃用户", "60%"],
    blocks: [
      { kind: "eyebrow", text: "IPO MOMENT" },
      { kind: "title", text: "资本市场时刻：2013 年 IPO" },
      {
        kind: "summary",
        text: "Twitter 上市意味着“实时公共对话”被资本市场承认为独立且足够大的互联网平台故事。",
      },
    ],
    metaLabel: "IPO",
    thesis: "实时公共对话，首次被资本市场定价为独立平台能力。",
    accentFigure: "$31B",
    commentary: [
      { label: "当时规模", text: "2013 年前后，平台约有 2 亿活跃用户，每日推文量超过 4 亿。" },
      { label: "移动转向", text: "接近 60% 的推文来自移动设备，移动端已成为核心流量入口。" },
      { label: "上市后压力", text: "增长、广告、治理与盈利能力被同时抬到更高优先级。" },
    ],
    footer: "Twitter 从“文化现象”进入“上市公司”阶段，产品叙事开始被财报和商业化牵引。",
  },
  {
    id: "page-06",
    role: "synthesis",
    density: "medium",
    emphasis: "contrast",
    preferredLayouts: ["card-constellation", "story-rail"],
    mustKeep: ["Moments", "Spaces", "Birdwatch"],
    blocks: [
      { kind: "eyebrow", text: "PRODUCT EXPANSION" },
      { kind: "title", text: "从文字流到媒体平台：2014 到 2021" },
      {
        kind: "summary",
        text: "这一阶段的重点不只是继续增长，而是扩展媒介能力、内容分发逻辑与治理工具。",
      },
    ],
    metaLabel: "Expansion",
    cards: [
      { tag: "2014-2015", title: "时间线重构与 Moments", text: "平台开始更主动编排内容，不再只做纯时间倒序的信息流。" },
      { tag: "2016", title: "视频与直播", text: "通过视频合作和直播尝试，把 Twitter 从“文字现场”推进到“媒体现场”。" },
      { tag: "2020", title: "疫情与错误信息治理", text: "平台开始更明确地标记误导信息，并连接事实核查资源。" },
      { tag: "2021", title: "Spaces、Birdwatch、Bluesky", text: "产品层扩到音频、社区纠错与去中心化研究，平台形态明显变宽。" },
    ],
    footer:
      "到 2021 年，Twitter 已经不是单一文本产品，而是一个同时管理传播、审核与创作者关系的平台系统。",
  },
  {
    id: "page-07",
    role: "comparison",
    density: "medium",
    emphasis: "process",
    preferredLayouts: ["process-ribbon", "comparison-bands"],
    mustKeep: ["140 字", "280 字", "2017.09.26"],
    blocks: [
      { kind: "eyebrow", text: "RULE CHANGE" },
      { kind: "title", text: "标志性规则变化：140 字到 280 字" },
      {
        kind: "summary",
        text: "140 字曾是 Twitter 的精神图腾，但 2017 年的规则改变说明平台开始优先解决全球表达效率，而非继续神化短信时代遗产。",
      },
    ],
    metaLabel: "Rule Change",
    steps: [
      { tag: "旧规则", title: "140 字源于短信约束", text: "规则塑造了“短、快、像口语”的表达习惯。" },
      { tag: "痛点", title: "不同语言承压不同", text: "英语等语言更容易写不下，表达被迫压缩。" },
      { tag: "2017.09.26", title: "官方测试 280 字", text: "平台承认表达空间需要更现实的设计。" },
      { tag: "结果", title: "平台表达边界被重写", text: "线程、图片、视频和创作者表达逐步成为主流。" },
    ],
    footer:
      "这不是简单地多给 140 个字，而是平台从“短信产物”向“成熟内容平台”转向的象征。",
  },
  {
    id: "page-08",
    role: "chronology",
    density: "medium",
    emphasis: "takeaway",
    forcedLayout: "evidence-quote",
    preferredLayouts: ["story-rail", "evidence-quote"],
    mustKeep: ["$44B", "2022.10.28", "the bird is freed"],
    blocks: [
      { kind: "eyebrow", text: "OWNERSHIP RESET" },
      { kind: "title", text: "所有权重构：2022 年 10 月 28 日" },
      {
        kind: "summary",
        text: "Elon Musk 完成收购后，Twitter 的组织、产品节奏、审核策略与商业逻辑同时进入高波动期。",
      },
    ],
    metaLabel: "Acquisition",
    railTitle: "$44B",
    railSubtitle: "收购金额",
    railNote: "2022 年 10 月 28 日完成交易",
    railItems: [
      { label: "公开表态", text: "Musk 在交易完成后发文“the bird is freed”，平台象征意义被立刻重置。" },
      { label: "组织变化", text: "高层快速更替，Twitter 从上市公司变成强控制的私有化资产。" },
      { label: "产品方向", text: "订阅验证、机器人治理、成本收缩与算法透明化同时推进。" },
      { label: "实际影响", text: "所有权变化不只是资本事件，也直接改写了产品文化与政策重心。" },
    ],
    footer: "这是组织结构、平台治理与商业模式一起被重写的分水岭。",
  },
  {
    id: "page-09",
    role: "chronology",
    density: "medium",
    emphasis: "chronology",
    preferredLayouts: ["chronology-matrix", "offset-timeline"],
    mustKeep: ["2023.07.24", "2023.08.02", "2024.05.17", "x.com"],
    blocks: [
      { kind: "eyebrow", text: "REBRAND ERA" },
      { kind: "title", text: "从 Twitter 到 X：2023 到 2024" },
      {
        kind: "summary",
        text: "品牌替换不是单点事件，而是一系列产品、符号、域名与商业模式同步调整的过程。",
      },
    ],
    metaLabel: "X Era",
    cells: [
      { date: "2023.07.24", title: "X 被正式介绍", text: "Twitter 品牌开始退场，蓝鸟让位给 X 符号与“everything app”叙事。" },
      { date: "2023.08.02", title: "官方发布路线图", text: "长文、创作者分成、Community Notes 扩张、视频与招聘工具被集中强调。" },
      { date: "2023 H2", title: "订阅与创作者能力加速", text: "平台更强调验证订阅、长视频、收入分成和内容生产者激励。" },
      { date: "2024.05.17", title: "x.com 域名切换", text: "主域名从 twitter.com 迁到 x.com，品牌替换完成关键一步。" },
    ],
    footer:
      "到 2024 年，Twitter 作为品牌已基本退出舞台，但其历史包袱、网络效应和公共认知仍然深刻影响 X。",
  },
  {
    id: "page-10",
    role: "closing",
    density: "medium",
    emphasis: "takeaway",
    preferredLayouts: ["manifesto-wall", "ledger-columns"],
    mustKeep: ["实时公共对话", "平台治理", "品牌重构"],
    blocks: [
      { kind: "eyebrow", text: "HISTORICAL TAKE" },
      { kind: "title", text: "历史评价：Twitter 留下了什么" },
      {
        kind: "summary",
        text: "Twitter 的历史意义，不只在于它多大，而在于它把“公共对话的实时界面”这件事做成了全球性的产品范式。",
      },
    ],
    metaLabel: "Closing",
    pillars: [
      { title: "它重写了实时传播", text: "新闻突发、体育赛事、社会运动、名人舆论与灾难响应，都被 Twitter 式时间线改变。" },
      { title: "它暴露了平台治理难题", text: "骚扰、仇恨内容、虚假信息、品牌安全与审核透明度，一直是平台结构性难题。" },
      { title: "它也是品牌重构案例", text: "从 Twitter 到 X，展示了强网络品牌在所有权变化下面临的继承与损耗。" },
    ],
    footer:
      "这也是为什么它适合做 style case：同一段平台史，既能承载数据，也能承载文化与品牌叙事。",
  },
];
