# 余城宇个人网站 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建纯静态单页个人网站：暖黑莫兰迪视觉、六板块长滚动、暗场电影转场、中英一键切换、The World I See 画展厅与互动世界地图，push 即部署。

**Architecture:** 无框架无构建：`index.html` 单页骨架，全部内容集中在 `js/data.js`（双语字典 + 作品/地点数据），各板块由 `js/render.js` 数据驱动渲染；canvas 实现星空与颗粒转场；一次性 Python 脚本处理图片与地图数据。

**Tech Stack:** HTML/CSS/原生 JS；Python（Pillow 图片压缩、fonttools 字体子集化、地图生成，均为本地一次性工具）；Git + Cloudflare Pages/GitHub Pages。

**Testing approach:** 纯静态站点无单测框架。每任务验证 = `python -m http.server 8000`（后台常驻）+ 浏览器目视检查 + `Invoke-WebRequest`/控制台断言。环境为 Windows PowerShell 5.1（无 `&&`，用 `;` 分隔）。

## Global Constraints

- 色板（唯一来源）：背景 `#141413`、暗场 `#0E0D0C`、正文 `#FAF9F5`、次要 `#B0AEA5`、强调 `#EBDBBC`（用量 <5%，全站无高饱和色）
- 零第三方请求：无 CDN 脚本、无外部字体、无统计、无视频平台嵌入
- 《生日礼物》正片任何形式不上线；隐私红线：手机号/住址/出生日期/亲属信息不进仓库不上站（公开邮箱 `yuchengyu.ycy@gmail.com` 与 LinkedIn 除外）
- 性能：首屏传输 <1MB、LCP <2.5s、图片全懒加载、Lighthouse Performance ≥90
- 全部动效遵守 `prefers-reduced-motion: reduce`
- 双语：所有可见文案在 zh/en 两语言下均完整（EN 缺失时回退 zh，不出现 undefined/空标签）
- 提交信息末尾统一带 `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`

## File Structure

```
mysite/
├─ index.html               # 单页骨架：nav + hero + 6 章节 + lightbox + footer
├─ .nojekyll
├─ css/style.css            # 设计 tokens + 全部版式（各任务追加）
├─ js/
│   ├─ data.js              # 全站内容唯一来源（双语字典/影片/研究/展览/地点/联系）
│   ├─ i18n.js              # 语言切换（localStorage + data-i18n + onChange 订阅）
│   ├─ starfield.js         # createStarfield 工厂 + hero 视差淡出
│   ├─ transitions.js       # reveal/导航高亮/lightbox/颗粒桥
│   ├─ render.js            # 各板块数据驱动渲染（影像/AIGC/研究/画展/星空/关于）
│   ├─ worldmap.js          # 世界地图 SVG + 图钉 + 地点面板
│   └─ worldmap-data.js     # 由 tools/build_map.py 生成的抽象地图路径
├─ assets/
│   ├─ films/ world/ astro/ travel/   # 优化后图片（webp+jpg+thumb）
│   ├─ fonts/               # 子集化 woff2
│   └─ raw/                 # 用户原图（已 gitignore）
├─ resume/index.html        # 网页安全版简历（浅色、可打印为 PDF）
├─ tools/
│   ├─ optimize.py          # 图片压缩管线
│   ├─ build_map.py         # 抽象世界地图生成
│   └─ subset_fonts.py      # 字体子集化
└─ docs/superpowers/        # spec 与本计划
```

---

### Task 1: 站点骨架与设计系统

**Files:**
- Create: `index.html`, `css/style.css`, `.nojekyll`, 空文件 `js/data.js` `js/i18n.js` `js/starfield.js` `js/transitions.js` `js/render.js` `js/worldmap.js` `js/worldmap-data.js`

**Interfaces:**
- Produces: 所有章节容器 id（`filmList`/`aigcList`/`researchBody`/`astroWrap`/`astroGrid`/`exhibitIntro`/`exhibitWall`/`mapWrap`/`locPanel`/`aboutBody`）、`#lightbox` 结构、`.reveal`/`.titlecard`/`.fade-band` 类约定，后续任务全部依赖

- [ ] **Step 1: 写 index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>余城宇 · Harry Yu</title>
<meta name="description" content="余城宇 Harry Yu — 导演 × 计算机科学研究者。影像、AIGC、研究、星空与旅行。Filmmaker × Computer Scientist.">
<link rel="stylesheet" href="css/style.css">
</head>
<body>
<header class="nav" id="nav">
  <a class="nav-name" href="#top">余城宇</a>
  <nav>
    <a href="#films" data-i18n="nav.films">影像</a>
    <a href="#aigc" data-i18n="nav.aigc">AI × 创作</a>
    <a href="#research" data-i18n="nav.research">研究</a>
    <a href="#astro" data-i18n="nav.astro">星空</a>
    <a href="#travel" data-i18n="nav.travel">旅行</a>
    <a href="#about" data-i18n="nav.about">关于</a>
    <button id="langToggle" aria-label="Switch language">EN</button>
  </nav>
</header>

<section id="top" class="hero">
  <canvas id="stars" aria-hidden="true"></canvas>
  <div class="hero-inner">
    <h1>余城宇<span class="hero-en">HARRY YU</span></h1>
    <p class="tagline" data-i18n="hero.tagline">以镜头与模型，讲述同一个世界</p>
    <p class="tagline-sub" data-i18n="hero.sub">导演 · 计算机科学研究者</p>
  </div>
  <div class="scroll-cue" aria-hidden="true"></div>
</section>

<div class="fade-band" aria-hidden="true"></div>

<section id="films" class="chapter">
  <header class="titlecard reveal"><span class="tc-num">01</span><span class="tc-line"></span>
    <h2><span data-i18n="films.title">影像</span><span class="tc-en">FILMS</span></h2></header>
  <div id="filmList" class="films"></div>
</section>

<div class="grain-bridge" id="grainBridge" aria-hidden="true"><canvas id="grainCanvas"></canvas></div>

<section id="aigc" class="chapter">
  <header class="titlecard reveal"><span class="tc-num">02</span><span class="tc-line"></span>
    <h2><span data-i18n="aigc.title">AI × 创作</span><span class="tc-en">AI × ART</span></h2></header>
  <div id="aigcList" class="aigc-grid"></div>
</section>

<div class="fade-band" aria-hidden="true"></div>

<section id="research" class="chapter">
  <header class="titlecard reveal"><span class="tc-num">03</span><span class="tc-line"></span>
    <h2><span data-i18n="research.title">研究与工程</span><span class="tc-en">RESEARCH</span></h2></header>
  <div id="researchBody"></div>
</section>

<div class="fade-band" aria-hidden="true"></div>

<section id="astro" class="chapter">
  <div id="astroWrap" aria-hidden="true"></div>
  <header class="titlecard reveal"><span class="tc-num">04</span><span class="tc-line"></span>
    <h2><span data-i18n="astro.title">星空</span><span class="tc-en">ASTRONOMY</span></h2></header>
  <div id="astroGrid"></div>
</section>

<div class="fade-band" aria-hidden="true"></div>

<section id="travel" class="chapter">
  <header class="titlecard reveal"><span class="tc-num">05</span><span class="tc-line"></span>
    <h2><span data-i18n="travel.title">旅行</span><span class="tc-en">TRAVEL</span></h2></header>
  <div class="exhibit">
    <aside class="exhibit-intro reveal" id="exhibitIntro"></aside>
    <div class="exhibit-wall" id="exhibitWall"></div>
  </div>
  <div class="worldmap">
    <p class="map-hint reveal" data-i18n="travel.hint">点击图钉，看看我在那里看见的世界</p>
    <div class="map-wrap reveal" id="mapWrap"></div>
    <div class="loc-panel" id="locPanel" hidden></div>
  </div>
</section>

<div class="fade-band" aria-hidden="true"></div>

<section id="about" class="chapter">
  <header class="titlecard reveal"><span class="tc-num">06</span><span class="tc-line"></span>
    <h2><span data-i18n="about.title">关于</span><span class="tc-en">ABOUT</span></h2></header>
  <div id="aboutBody" class="about-grid"></div>
</section>

<footer data-i18n="footer.line">© 2026 余城宇 · Harry Yu</footer>

<div class="lightbox" id="lightbox" hidden role="dialog" aria-modal="true">
  <button class="lb-btn lb-close" aria-label="Close">×</button>
  <button class="lb-btn lb-prev" aria-label="Previous">‹</button>
  <img alt="">
  <button class="lb-btn lb-next" aria-label="Next">›</button>
  <p class="lb-cap"></p>
</div>

<script src="js/data.js"></script>
<script src="js/i18n.js"></script>
<script src="js/starfield.js"></script>
<script src="js/transitions.js"></script>
<script src="js/render.js"></script>
<script src="js/worldmap-data.js"></script>
<script src="js/worldmap.js"></script>
</body>
</html>
```

- [ ] **Step 2: 写 css/style.css（tokens + 基础 + nav + hero + titlecard + 暗场 + reveal）**

```css
/* ========== tokens ========== */
:root{
  --bg:#141413; --bg-deep:#0e0d0c; --ink:#faf9f5; --ink-dim:#b0aea5;
  --accent:#ebdbbc; --accent-dim:rgba(235,219,188,.4); --hairline:rgba(235,219,188,.12);
  --serif:"Noto Serif SC",Lora,Georgia,"Songti SC","SimSun",serif;
  --sans:"Noto Sans SC",-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei","Segoe UI",sans-serif;
  --lat-serif:Lora,Georgia,"Times New Roman",serif;
  --w:min(72rem,92vw);
}
html[lang^="en"]{--serif:Lora,"Noto Serif SC",Georgia,serif}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;scroll-padding-top:5rem}
body{background:var(--bg);color:var(--ink);font-family:var(--sans);font-size:1rem;line-height:1.95;-webkit-font-smoothing:antialiased}
/* 极稀疏星点底纹，若有若无 */
body::after{content:"";position:fixed;inset:0;z-index:-1;pointer-events:none;
  background-image:radial-gradient(rgba(250,249,245,.045) 1px,transparent 1px);background-size:210px 190px}
img{max-width:100%;display:block}
a{color:inherit;text-decoration:none}
h1,h2,h3,h4{font-family:var(--serif);font-weight:600;line-height:1.35}
button{font-family:inherit}
::selection{background:var(--accent);color:var(--bg)}

/* ========== nav ========== */
.nav{position:fixed;top:0;left:0;right:0;z-index:50;display:flex;justify-content:space-between;align-items:center;
  padding:1rem clamp(1rem,4vw,2.5rem);transition:background .4s ease}
.nav.scrolled{background:rgba(14,13,12,.82);backdrop-filter:blur(12px)}
.nav-name{font-family:var(--serif);letter-spacing:.14em;font-size:1.02rem}
.nav nav{display:flex;gap:clamp(.7rem,2vw,1.6rem);align-items:center;font-size:.84rem;color:var(--ink-dim)}
.nav nav a{padding:.15rem 0;border-bottom:1px solid transparent;transition:color .3s,border-color .3s;letter-spacing:.06em}
.nav nav a:hover{color:var(--ink)}
.nav nav a.active{color:var(--accent);border-color:var(--accent-dim)}
#langToggle{background:none;border:1px solid var(--accent-dim);color:var(--accent);font-size:.72rem;
  padding:.18rem .6rem;border-radius:2px;cursor:pointer;letter-spacing:.1em}
#langToggle:hover{background:var(--accent);color:var(--bg)}

/* ========== hero ========== */
.hero{position:relative;height:100svh;display:grid;place-items:center;overflow:hidden;background:var(--bg-deep)}
#stars{position:absolute;inset:0;width:100%;height:100%}
.hero-inner{position:relative;text-align:center;padding:0 1rem}
.hero-inner h1{font-size:clamp(2.5rem,6.5vw,4.4rem);letter-spacing:.2em;font-weight:600}
.hero-en{display:block;font-family:var(--lat-serif);font-size:.32em;letter-spacing:.55em;color:var(--ink-dim);margin-top:1.2rem;font-weight:400}
.tagline{margin-top:2.4rem;font-family:var(--serif);font-size:clamp(1rem,2vw,1.2rem);letter-spacing:.18em}
.tagline-sub{margin-top:.9rem;color:var(--ink-dim);font-size:.82rem;letter-spacing:.34em}
.scroll-cue{position:absolute;bottom:2.2rem;left:50%;width:1px;height:3.4rem;
  background:linear-gradient(var(--accent),transparent);animation:cue 2.6s ease-in-out infinite}
@keyframes cue{0%,100%{opacity:.15}50%{opacity:.9}}

/* ========== 章节 / title card / 暗场 ========== */
.chapter{position:relative;max-width:var(--w);margin:0 auto;padding:7.5rem 0 6rem}
.fade-band{height:16vh;background:linear-gradient(180deg,var(--bg),var(--bg-deep) 55%,var(--bg))}
.titlecard{display:flex;align-items:baseline;gap:1.2rem;margin-bottom:4.2rem}
.tc-num{font-family:var(--lat-serif);color:var(--accent);font-size:.95rem;letter-spacing:.22em}
.tc-line{flex:0 0 clamp(2.5rem,8vw,6rem);height:1px;background:var(--accent-dim);align-self:center}
.titlecard h2{font-size:clamp(1.6rem,3.4vw,2.3rem);letter-spacing:.22em}
.tc-en{font-family:var(--lat-serif);font-size:.52em;letter-spacing:.5em;color:var(--ink-dim);margin-left:1.1rem;font-weight:400}

/* ========== reveal 入场 ========== */
.reveal{opacity:0;transform:translateY(24px);
  transition:opacity .7s cubic-bezier(.22,.61,.36,1),transform .7s cubic-bezier(.22,.61,.36,1)}
.reveal.on{opacity:1;transform:none}

/* ========== footer ========== */
footer{padding:4rem 1rem 3rem;text-align:center;color:var(--ink-dim);font-size:.74rem;letter-spacing:.22em}

/* ========== reduced motion ========== */
@media (prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  .scroll-cue{animation:none}
  .reveal{opacity:1;transform:none;transition:none}
}
```

- [ ] **Step 3: 建空 js 文件与 .nojekyll**

```powershell
New-Item -ItemType Directory -Force js,css,tools,assets\films,assets\world,assets\astro,assets\travel,assets\fonts,resume | Out-Null
"" | Out-File -Encoding utf8 .nojekyll
foreach($f in "data","i18n","starfield","transitions","render","worldmap","worldmap-data"){ "" | Out-File -Encoding utf8 "js\$f.js" }
```

- [ ] **Step 4: 验证**

Run: `Start-Process python -ArgumentList "-m","http.server","8000" -WindowStyle Hidden; Start-Sleep 1; (Invoke-WebRequest http://localhost:8000/ -UseBasicParsing).StatusCode`
Expected: `200`；浏览器打开 http://localhost:8000 可见暖黑背景、固定导航、hero 大字（星空 canvas 尚为空）、六个章节字幕卡纵向排布，控制台无 404/报错。

- [ ] **Step 5: Commit**

```powershell
git add index.html css/style.css .nojekyll js/
git commit -m "feat: 站点骨架与设计系统（暖黑莫兰迪 tokens + 六章节 + title card）"
```

---

### Task 2: 内容层 data.js 与双语切换 i18n.js

**Files:**
- Modify: `js/data.js`（全部内容）、`js/i18n.js`

**Interfaces:**
- Produces: `window.SITE`（结构见下）；`window.I18N = { t(obj), lang, setLang(l), onChange(fn), apply() }`。约定：双语值一律 `{zh:"…",en:"…"}`，`I18N.t()` 取当前语言并回退 zh。
- Consumes: Task 1 的 `data-i18n` 属性与 `#langToggle`

- [ ] **Step 1: 写 js/data.js（全站内容唯一来源）**

```js
window.SITE = {
i18n: {
  nav: {
    films:{zh:"影像",en:"Films"}, aigc:{zh:"AI × 创作",en:"AI × Art"},
    research:{zh:"研究",en:"Research"}, astro:{zh:"星空",en:"Astro"},
    travel:{zh:"旅行",en:"Travel"}, about:{zh:"关于",en:"About"}
  },
  hero: {
    tagline:{zh:"以镜头与模型，讲述同一个世界",en:"Telling one world — through lenses and models"},
    sub:{zh:"导演 · 计算机科学研究者",en:"Filmmaker · Computer Scientist"}
  },
  films: {
    title:{zh:"影像",en:"Films"},
    wip:{zh:"信息整理中",en:"Details coming soon"},
    stills:{zh:"剧照",en:"Stills"}
  },
  aigc: { title:{zh:"AI × 创作",en:"AI × Art"} },
  research: { title:{zh:"研究与工程",en:"Research & Engineering"}, papers:{zh:"论文发表",en:"Publications"} },
  astro: { title:{zh:"星空",en:"Astronomy"}, empty:{zh:"银河与极光，整理中",en:"Galaxies and aurorae — coming soon"} },
  travel: {
    title:{zh:"旅行",en:"Travel"},
    hint:{zh:"点击图钉，看看我在那里看见的世界",en:"Click a pin to see what I saw there"},
    empty:{zh:"整理中",en:"Coming soon"}
  },
  about: { title:{zh:"关于",en:"About"}, resume:{zh:"查看简历",en:"Résumé"} },
  footer: { line:{zh:"© 2026 余城宇 · Harry Yu",en:"© 2026 Harry Yu"} }
},

films: [
  { id:"birthday",
    title:{zh:"生日礼物",en:"Birthday Present"}, year:"2026",
    info:{zh:"剧情短片 · 12 分钟 · 彩色",en:"Narrative short · 12 min · Color"},
    roles:{zh:"编剧 / 导演 / 摄影 / 剪辑",en:"Writer / Director / DP / Editor"},
    badges:[{zh:"FIRST 申报中 · 世界首映待定",en:"Submitted to FIRST · World premiere pending"}],
    synopsis:{zh:"母亲生日当天，一通来自内江老家的电话打破了平静：患阿尔茨海默症的外婆走失了。她随即踏上归乡寻母之路。一次寻找，也是女儿、母亲与外婆三代女性之间情感的传递。",
      en:"On her own birthday, a mother receives a call from her hometown: her mother, living with Alzheimer’s, has gone missing. She sets out at once on a journey home — a search that traces the bonds among three generations of women."},
    poster:"assets/films/birthday-poster", stills:["assets/films/birthday-still-01"] },
  { id:"suisui",
    title:{zh:"岁岁平安",en:"岁岁平安"}, year:"2026",
    info:{zh:"AIGC 短片",en:"AIGC short film"},
    roles:{zh:"AIGC 艺术家",en:"AIGC Artist"},
    badges:[{zh:"AI 电影大奖 官方入围 · 西班牙 2026",en:"AI Movie Awards · Official Selection · Spain 2026"},
            {zh:"首尔国际 AI 电影节 官方入围 2026",en:"Seoul Int’l AI Film Festival · Official Selection 2026"}],
    synopsis:{zh:"",en:""}, poster:"", stills:[] },
  { id:"guiqi",
    title:{zh:"归栖",en:"Finding Home"}, year:"2025",
    info:{zh:"短片",en:"Short film"},
    roles:{zh:"摄影指导",en:"Director of Photography"},
    badges:[{zh:"澳门国际微电影节 官方入围 2025",en:"Macau Int’l Micro Film Festival · Official Selection 2025"}],
    synopsis:{zh:"",en:""}, poster:"", stills:[] },
  { id:"doubleblind",
    title:{zh:"双盲",en:"双盲"}, year:"",
    info:{zh:"",en:""}, roles:{zh:"",en:""}, badges:[],
    synopsis:{zh:"",en:""},
    poster:"assets/films/doubleblind-poster",
    stills:["assets/films/doubleblind-still-01","assets/films/doubleblind-still-02","assets/films/doubleblind-still-03"] }
],

aigc: [
  { tag:{zh:"AIGC 影片",en:"AIGC FILM"},
    title:{zh:"《岁岁平安》",en:"岁岁平安"},
    desc:{zh:"以生成式模型完成的短片，入围 AI 电影大奖（西班牙·马加鲁夫）与首尔国际 AI 电影节。",
      en:"A short film made with generative models — official selection at the AI Movie Awards (Magaluf, Spain) and the Seoul International AI Film Festival."} },
  { tag:{zh:"风格模型",en:"STYLE MODELS"},
    title:{zh:"LoRA 风格模型 × 100 万用户",en:"LoRA style models × 1M users"},
    desc:{zh:"在同花顺独立训练并上线 5+ LoRA 风格模型，搭建从数据处理、训练到服务上线的端到端流水线，累计服务超 100 万用户。",
      en:"Independently trained and shipped 5+ LoRA style models end-to-end — data, training, inference, deployment — serving over one million users."} },
  { tag:{zh:"美学 × 架构",en:"AESTHETICS × ARCHITECTURE"},
    title:{zh:"视频生成的美学标准",en:"Aesthetic criteria for video generation"},
    desc:{zh:"调研 DiT、时空 VAE 等视频生成架构，结合电影专业背景制定美学评判标准，输出覆盖 5000+ 员工的公司级技术报告。",
      en:"Surveyed DiT and spatio-temporal VAE video architectures and, drawing on a film background, authored company-wide aesthetic evaluation criteria."} }
],

research: {
  timeline: [
    { time:{zh:"2025 – 2026",en:"2025 – 2026"},
      title:{zh:"卡内基梅隆大学 · 计算机科学硕士",en:"Carnegie Mellon University · M.S. in Computer Science"},
      desc:{zh:"",en:""} },
    { time:{zh:"2026.5 – 至今",en:"May 2026 – present"},
      title:{zh:"字节跳动 · 多模态大模型算法实习生",en:"ByteDance · Multimodal LLM Algorithm Intern"},
      desc:{zh:"主导 POI 审核多模态 Agent 主调度器设计；Plan-Execute Agent 上下文压缩使整体 token 下降 27%。",
        en:"Led orchestration design for a multimodal review agent; context compression for Plan-Execute agents cut total tokens by 27%."} },
    { time:{zh:"2024 – 2026",en:"2024 – 2026"},
      title:{zh:"Privacy Pioneer · AI 浏览器隐私扫描插件",en:"Privacy Pioneer · AI browser privacy extension"},
      desc:{zh:"privacy-tech-lab 研发核心成员：10+ TinyBERT 模型实时分析网络流量，追踪片段检测 F1 达 96%。",
        en:"Core member at privacy-tech-lab: 10+ TinyBERT models analyze web traffic in real time, reaching 96% F1 on tracking detection."} },
    { time:{zh:"2022 – 2024",en:"2022 – 2024"},
      title:{zh:"NSF 跨平台选举广告透明度项目 · 学生科研负责人",en:"NSF cross-platform election-ad transparency project · Student lead"},
      desc:{zh:"处理并标准化 200 万+ 行政治广告数据，成果发表于 Nature 子刊 Scientific Data。",
        en:"Processed and standardized 2M+ rows of political-ad data; published in Nature Scientific Data."} },
    { time:{zh:"2021 – 2025",en:"2021 – 2025"},
      title:{zh:"卫斯理大学 · 电影研究 × 计算机科学 双专业",en:"Wesleyan University · Film Studies × Computer Science"},
      desc:{zh:"GPA 4.0 · Phi Beta Kappa · 高荣誉毕业 · 弗里曼亚洲奖学金（中国唯一）",
        en:"GPA 4.0 · Phi Beta Kappa · High Honors · Freeman Asian Scholarship"} }
  ],
  papers: [
    { title:"Revision or Re-Solving? Decomposing Second-Pass Gains in Multi-LLM Pipelines",
      meta:{zh:"arXiv 预印本 · 2026 · 共同一作（评审中）",en:"arXiv preprint · 2026 · equal contribution (under review)"},
      url:"https://arxiv.org/abs/2604.01029" },
    { title:"Comparable 2022 General Election Advertising Datasets from Meta and Google",
      meta:{zh:"Nature Scientific Data · 2025",en:"Nature Scientific Data · 2025"},
      url:"https://doi.org/10.1038/s41597-025-05228-w" },
    { title:"Global Web, Local Privacy? An International Review of Web Tracking",
      meta:{zh:"Pragmatic Cybersecurity · 2026",en:"Pragmatic Cybersecurity · 2026"},
      url:"https://www.sciltp.com/journals/pc/articles/2603003347" }
  ]
},

exhibition: {
  titleZh:"我看见的世界", titleEn:"The World I See",
  credit:{zh:"余城宇 · 2021 – 2025",en:"Harry Yu · 2021 – 2025"},
  statement:{
    zh:"“我们所理解的世界，究竟是一个客观、完整、连续的整体，还是由无数鲜活而短暂的瞬间拼凑而成的幻象？\n在这里，我用这些刹那的光影编织出属于我的世界之轮廓。它们或许不完美、不永恒，却以细碎之美映照出我的生命旅程。这些瞬间既是目光与心灵的碰撞，也是时间对记忆的雕琢。这并非终点。随着岁月流转，这些曾经的瞬间将沉淀为某种更深远的意义，而我的目光，也将继续追逐那些未曾定义的风景。\n愿你在这里，看见的不仅是我的世界，也感受到属于你自己的时光碎片与生命共鸣。”",
    en:"“Is the world we understand an objective, complete and continuous whole — or an illusion pieced together from countless vivid, fleeting moments?\nHere I weave the contours of my world from these instants of light and shadow. Imperfect and impermanent, they mirror my journey in fragments of beauty — collisions of gaze and heart, memory carved by time. This is not an end: as the years turn, these moments will settle into something deeper, and my eyes will keep chasing landscapes not yet defined.\nMay you find here not only my world, but fragments of your own time, resonating with your own life.”"
  },
  works: [
    { src:"assets/world/world-01", num:"Ⅰ" },
    { src:"assets/world/world-02", num:"Ⅱ" },
    { src:"assets/world/world-03", num:"Ⅲ" },
    { src:"assets/world/world-04", num:"Ⅳ" },
    { src:"assets/world/world-05", num:"Ⅴ" }
  ]
},

astro: [],

locations: [
  { id:"chengdu",    name:{zh:"成都",en:"Chengdu"},        lat:30.57, lon:104.07, items:[] },
  { id:"neijiang",   name:{zh:"内江",en:"Neijiang"},       lat:29.58, lon:105.06, items:[] },
  { id:"shanghai",   name:{zh:"上海",en:"Shanghai"},       lat:31.23, lon:121.47, items:[] },
  { id:"hangzhou",   name:{zh:"杭州",en:"Hangzhou"},       lat:30.27, lon:120.16, items:[] },
  { id:"macau",      name:{zh:"澳门",en:"Macau"},          lat:22.20, lon:113.55, items:[] },
  { id:"tokyo",      name:{zh:"东京",en:"Tokyo"},          lat:35.68, lon:139.69, items:[] },
  { id:"middletown", name:{zh:"米德尔敦",en:"Middletown, CT"}, lat:41.56, lon:-72.65, items:[] },
  { id:"nyc",        name:{zh:"纽约",en:"New York"},       lat:40.71, lon:-74.01, items:[] },
  { id:"pittsburgh", name:{zh:"匹兹堡",en:"Pittsburgh"},   lat:40.44, lon:-80.00, items:[] },
  { id:"iceland",    name:{zh:"冰岛",en:"Iceland"},        lat:64.15, lon:-21.94, items:[] },
  { id:"norway",     name:{zh:"挪威",en:"Norway"},         lat:60.39, lon:5.32,  items:[] }
],

about: {
  bio:{
    zh:"余城宇，青年导演，毕业于卫斯理大学（Wesleyan University），获电影研究与计算机科学双专业学士学位，现就读于卡内基梅隆大学（Carnegie Mellon University）计算机科学硕士项目。他长期关注影像、人工智能与艺术创作之间的关系，擅长从技术与人文的交界处探索 AI 对叙事、感知和创作者能力边界的拓展。其作品关注家庭、记忆与身份，在克制的影像中呈现人物细腻的情感流动。",
    en:"Harry Yu is an emerging filmmaker who graduated from Wesleyan University with a double major in Film Studies and Computer Science, and is currently pursuing a Master’s in Computer Science at Carnegie Mellon University. Working at the intersection of technology and the humanities, he explores how AI expands the boundaries of narrative, perception and creative authorship. His films examine family, memory and identity, capturing subtle emotional currents through a restrained visual language."
  },
  contact:[
    { label:"Email",    url:"mailto:yuchengyu.ycy@gmail.com" },
    { label:"LinkedIn", url:"https://www.linkedin.com/in/chengyu-yu" }
  ]
}
};
```

- [ ] **Step 2: 写 js/i18n.js**

```js
(function(){
  var KEY = "site-lang";
  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch(e){}
  var lang = stored || (((navigator.language||"").toLowerCase().indexOf("zh")===0) ? "zh" : "en");
  var subs = [];

  function t(o){
    if(o == null) return "";
    if(typeof o === "string") return o;
    return o[lang] || o.zh || o.en || "";
  }
  function apply(){
    document.documentElement.lang = (lang === "zh") ? "zh-CN" : "en";
    document.querySelectorAll("[data-i18n]").forEach(function(el){
      var val = el.getAttribute("data-i18n").split(".").reduce(function(a,k){ return a && a[k]; }, SITE.i18n);
      if(val != null) el.textContent = t(val);
    });
    var btn = document.getElementById("langToggle");
    if(btn) btn.textContent = (lang === "zh") ? "EN" : "中";
    subs.forEach(function(f){ f(lang); });
  }
  function setLang(l){
    lang = l;
    try { localStorage.setItem(KEY, l); } catch(e){}
    apply();
  }
  window.I18N = {
    t: t, setLang: setLang, apply: apply,
    onChange: function(f){ subs.push(f); },
    get lang(){ return lang; }
  };
  document.addEventListener("DOMContentLoaded", function(){
    var btn = document.getElementById("langToggle");
    if(btn) btn.addEventListener("click", function(){ setLang(lang === "zh" ? "en" : "zh"); });
    apply();
  });
})();
```

- [ ] **Step 3: 验证**

浏览器打开 http://localhost:8000 →
1. 导航显示中文；点击 EN 按钮 → 导航/标语/字幕卡文案全部变英文，按钮变「中」，`<html lang>` 变 `en`；
2. 刷新页面语言保持；控制台执行 `I18N.t(SITE.films[0].title)` 返回当前语言片名；无报错。

- [ ] **Step 4: Commit**

```powershell
git add js/data.js js/i18n.js
git commit -m "feat: 全站双语内容层 data.js 与一键切换 i18n.js"
```

---

### Task 3: 图片优化管线与现有素材处理

**Files:**
- Create: `tools/optimize.py`
- Produce: `assets/films/*`、`assets/world/*`（webp + jpg + thumb.webp）

**Interfaces:**
- Produces: 命名约定 `<base>.webp`（长边≤2000）、`<base>.jpg`（兜底）、`<base>-thumb.webp`（长边≤640）。data.js 中所有图片路径均为不带扩展名的 base，渲染层拼 `.webp/.jpg`。
- Consumes: `assets/raw/`（gitignore 内的用户原图）与 `films/` 现有素材

- [ ] **Step 1: 写 tools/optimize.py**

```python
"""一次性图片压缩：源图 -> assets/<类别>/<base>.webp + .jpg + -thumb.webp
用法: python tools/optimize.py   (在仓库根目录运行; 需要 pip install Pillow)"""
import os, glob, sys
from PIL import Image

LARGE, THUMB = 2000, 640

# (源文件, 输出目录, 输出 base 名)
EXPLICIT = [
    ("films/生日礼物/生日礼物海报.png",                        "assets/films", "birthday-poster"),
    ("films/生日礼物/屏幕截图 2026-07-07 004742.png",          "assets/films", "birthday-still-01"),
    ("films/双盲/ChatGPT Image Apr 24, 2026, 10_31_10 AM.png", "assets/films", "doubleblind-poster"),
    ("films/双盲/7d944e340c10bc7561dcbf8f64d0e509.jpg",        "assets/films", "doubleblind-still-01"),
    ("films/双盲/812888bae619bbe411d2eb733950ccd1.jpg",        "assets/films", "doubleblind-still-02"),
    ("films/双盲/edd66e92f21fb58f95f158f769f3a6da.jpg",        "assets/films", "doubleblind-still-03"),
]
# the world I see 五张按文件名排序 -> world-01..05
world = sorted(glob.glob("assets/raw/the world I see/*.jpg"))
EXPLICIT += [(p, "assets/world", "world-%02d" % (i+1)) for i, p in enumerate(world)]
# 通用规则：assets/raw/astro/* -> assets/astro/astro-NN；assets/raw/travel/<loc>/* -> assets/travel/<loc>/<loc>-NN
for i, p in enumerate(sorted(glob.glob("assets/raw/astro/*.*"))):
    EXPLICIT.append((p, "assets/astro", "astro-%02d" % (i+1)))
for d in sorted(glob.glob("assets/raw/travel/*/")):
    loc = os.path.basename(os.path.normpath(d))
    for i, p in enumerate(sorted(glob.glob(d + "*.*"))):
        EXPLICIT.append((p, "assets/travel/" + loc, "%s-%02d" % (loc, i+1)))

def process(src, outdir, base):
    os.makedirs(outdir, exist_ok=True)
    im = Image.open(src).convert("RGB")
    big = im.copy(); big.thumbnail((LARGE, LARGE), Image.LANCZOS)
    big.save(os.path.join(outdir, base + ".webp"), "WEBP", quality=82)
    big.save(os.path.join(outdir, base + ".jpg"), "JPEG", quality=85, progressive=True)
    th = im.copy(); th.thumbnail((THUMB, THUMB), Image.LANCZOS)
    th.save(os.path.join(outdir, base + "-thumb.webp"), "WEBP", quality=78)
    print("ok  %-38s -> %s/%s  (%dx%d)" % (src, outdir, base, big.width, big.height))

count = 0
for src, outdir, base in EXPLICIT:
    if not os.path.exists(src):
        print("skip (missing): " + src); continue
    process(src, outdir, base); count += 1
print("done: %d images" % count)
```

- [ ] **Step 2: 运行**

Run: `pip install Pillow --quiet; python tools/optimize.py`
Expected: 输出 11 行 `ok`（6 张影片素材 + 5 张 world），`done: 11 images`；`assets/films/` 有 18 个文件、`assets/world/` 有 15 个文件；每个 `.webp` 均 <500KB。

- [ ] **Step 3: 验证尺寸**

Run: `Get-ChildItem assets -Recurse -File | Where-Object {$_.Length -gt 500KB} | Select-Object FullName, Length`
Expected: 无输出（全部小于 500KB）。

- [ ] **Step 4: Commit**

```powershell
git add tools/optimize.py assets/films assets/world
git commit -m "feat: 图片压缩管线并处理影片与 The World I See 素材"
```

---

### Task 4: 星空 starfield.js 与 Hero 视差 + 导航行为

**Files:**
- Modify: `js/starfield.js`
- Modify: `css/style.css`（无需新增，本任务纯 JS）

**Interfaces:**
- Produces: `window.createStarfield(canvas, {density, twinkle})` 工厂（Task 11 星空章节复用）。density = 每颗星占据的像素面积（越小越密）。
- Consumes: Task 1 的 `#stars`、`.hero-inner`

- [ ] **Step 1: 写 js/starfield.js**

```js
window.createStarfield = function(canvas, opts){
  var o = Object.assign({ density: 6500, twinkle: true }, opts || {});
  var ctx = canvas.getContext("2d");
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var stars = [], W = 0, H = 0, visible = true;

  function resize(){
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var n = Math.round(W * H / o.density);
    stars = [];
    for(var i = 0; i < n; i++){
      stars.push({ x: Math.random()*W, y: Math.random()*H,
        r: 0.3 + Math.random(), p: Math.random()*Math.PI*2,
        s: 0.4 + Math.random()*0.8, warm: Math.random() < 0.25 });
    }
    draw(performance.now());
  }
  function draw(now){
    ctx.clearRect(0, 0, W, H);
    for(var i = 0; i < stars.length; i++){
      var st = stars[i];
      var tw = (o.twinkle && !reduced) ? 0.45 + 0.55*(0.5 + 0.5*Math.sin(st.p + now*0.0006*st.s)) : 0.8;
      ctx.globalAlpha = tw * 0.9;
      ctx.fillStyle = st.warm ? "#ebdbbc" : "#faf9f5";
      ctx.beginPath(); ctx.arc(st.x, st.y, st.r, 0, 7); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
  function loop(now){ if(visible) draw(now); requestAnimationFrame(loop); }

  resize();
  addEventListener("resize", resize);
  if(!reduced){
    requestAnimationFrame(loop);
    new IntersectionObserver(function(en){ visible = en[0].isIntersecting; }, {threshold: 0}).observe(canvas);
  }
  return { resize: resize };
};

/* hero 接线：星空 + 滚动淡出视差 */
document.addEventListener("DOMContentLoaded", function(){
  var cv = document.getElementById("stars");
  if(!cv) return;
  createStarfield(cv, { density: 6500 });
  var inner = document.querySelector(".hero-inner");
  if(!matchMedia("(prefers-reduced-motion: reduce)").matches){
    addEventListener("scroll", function(){
      var y = scrollY, f = Math.max(0, 1 - y/(innerHeight*0.85));
      cv.style.opacity = f;
      if(inner){ inner.style.opacity = f; inner.style.transform = "translateY(" + (y*0.18) + "px)"; }
    }, { passive: true });
  }
});
```

- [ ] **Step 2: 验证**

浏览器打开首页：hero 有细腻星点（象牙白为主、约 1/4 奶油色）缓慢闪烁；向下滚动时星空与文字淡出并轻微下沉；系统开「减少动态效果」后星点静止不闪。控制台无报错。

- [ ] **Step 3: Commit**

```powershell
git add js/starfield.js
git commit -m "feat: canvas 星空工厂与 hero 滚动视差淡出"
```

---

### Task 5: transitions.js — reveal 入场 / 导航高亮 / 共享 lightbox

**Files:**
- Modify: `js/transitions.js`
- Modify: `css/style.css`（追加 lightbox 样式）

**Interfaces:**
- Produces: `window.observeReveals(rootEl?)`（对 root 内 `.reveal:not(.on)` 挂观察，动态渲染后调用）；`window.openLightbox(items, idx)`，items 为 `[{src, cap}]`，src 为完整图片 URL（含扩展名）。
- Consumes: Task 1 的 `#lightbox` 结构、`.reveal` 类、`section[id]` 与导航锚点

- [ ] **Step 1: 写 js/transitions.js**

```js
(function(){
  /* 导航滚动态 */
  var nav = document.getElementById("nav");
  addEventListener("scroll", function(){ nav.classList.toggle("scrolled", scrollY > 40); }, { passive: true });

  /* reveal 入场（一次性） */
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("on"); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  window.observeReveals = function(root){
    (root || document).querySelectorAll(".reveal:not(.on)").forEach(function(el){ io.observe(el); });
  };

  /* 导航当前章节高亮 */
  var secIO = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(!e.isIntersecting) return;
      document.querySelectorAll(".nav nav a").forEach(function(a){
        a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id);
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  /* lightbox */
  var list = [], idx = 0;
  function lb(){ return document.getElementById("lightbox"); }
  function show(){
    var it = list[idx];
    lb().querySelector("img").src = it.src;
    lb().querySelector(".lb-cap").textContent = it.cap || "";
  }
  window.openLightbox = function(items, i){
    list = items; idx = i || 0;
    lb().hidden = false; document.body.style.overflow = "hidden"; show();
  };
  function close(){ lb().hidden = true; document.body.style.overflow = ""; }
  function step(d){ if(!list.length) return; idx = (idx + d + list.length) % list.length; show(); }

  document.addEventListener("DOMContentLoaded", function(){
    document.querySelectorAll("section[id]").forEach(function(s){ secIO.observe(s); });
    observeReveals();
    lb().querySelector(".lb-close").addEventListener("click", close);
    lb().querySelector(".lb-prev").addEventListener("click", function(){ step(-1); });
    lb().querySelector(".lb-next").addEventListener("click", function(){ step(1); });
    lb().addEventListener("click", function(e){ if(e.target === lb()) close(); });
    addEventListener("keydown", function(e){
      if(lb().hidden) return;
      if(e.key === "Escape") close();
      if(e.key === "ArrowLeft") step(-1);
      if(e.key === "ArrowRight") step(1);
    });
  });
})();
```

- [ ] **Step 2: css/style.css 末尾追加**

```css
/* ========== lightbox ========== */
.lightbox{position:fixed;inset:0;z-index:90;background:rgba(8,7,6,.97);display:grid;place-items:center}
.lightbox[hidden]{display:none}
.lightbox img{max-width:92vw;max-height:84vh;object-fit:contain}
.lb-cap{position:absolute;bottom:1.6rem;left:0;right:0;text-align:center;color:var(--ink-dim);font-size:.8rem;letter-spacing:.16em}
.lb-btn{position:absolute;top:50%;transform:translateY(-50%);background:none;border:none;color:var(--ink-dim);font-size:2.4rem;cursor:pointer;padding:1rem;line-height:1}
.lb-btn:hover{color:var(--accent)}
.lb-prev{left:.4rem}.lb-next{right:.4rem}
.lb-close{top:1.4rem;right:1rem;transform:none;font-size:1.9rem}
```

- [ ] **Step 3: 验证**

首页滚动：字幕卡淡入上浮一次性触发；滚到不同章节时导航对应项变奶油色。控制台执行
`openLightbox([{src:"assets/world/world-01.webp",cap:"test"}],0)` → 黑场大图出现，ESC 关闭。

- [ ] **Step 4: Commit**

```powershell
git add js/transitions.js css/style.css
git commit -m "feat: 滚动入场/导航高亮/共享 lightbox"
```

---

### Task 6: 影像 Films 板块（海报墙 + 详情浮层）

**Files:**
- Modify: `js/render.js`（renderFilms + 详情浮层 + renderAll 调度）
- Modify: `css/style.css`（追加影片样式）

**Interfaces:**
- Produces: `js/render.js` 内部约定 —— `pic(base, alt)` 生成 `<picture>`（webp+jpg 懒加载）、`renderAll()` 在 DOMContentLoaded 与 `I18N.onChange` 时全量重渲染。后续任务的 render 函数都注册进 `renderAll`。
- Consumes: `SITE.films`、`I18N.t`、`openLightbox`、`observeReveals`、`#filmList`

- [ ] **Step 1: 写 js/render.js**

```js
(function(){
  function $(s){ return document.querySelector(s); }
  function t(o){ return I18N.t(o); }
  function esc(s){ var d = document.createElement("div"); d.textContent = s == null ? "" : String(s); return d.innerHTML; }
  function pic(base, alt){
    return '<picture><source srcset="' + base + '.webp" type="image/webp">' +
      '<img src="' + base + '.jpg" alt="' + esc(alt) + '" loading="lazy"></picture>';
  }

  /* ---- 影像 ---- */
  function renderFilms(){
    var box = $("#filmList"); if(!box) return;
    box.innerHTML = "";
    SITE.films.forEach(function(f){
      var card = document.createElement("article");
      card.className = "film reveal";
      var posterHtml = f.poster
        ? '<div class="film-poster">' + pic(f.poster, t(f.title)) + '</div>'
        : '<div class="film-poster typo"><span>' + esc(t(f.title)) + '</span></div>';
      card.innerHTML = posterHtml +
        '<div class="film-meta"><h3 class="film-title">' + esc(t(f.title)) + '</h3>' +
        '<p class="film-sub">' + esc([f.year, t(f.info), t(f.roles)].filter(Boolean).join(" · ") || t(SITE.i18n.films.wip)) + '</p>' +
        f.badges.map(function(b){ return '<span class="badge">' + esc(t(b)) + '</span>'; }).join("") +
        '</div>';
      card.addEventListener("click", function(){ openFilm(f); });
      box.appendChild(card);
    });
    observeReveals(box);
  }

  function openFilm(f){
    var old = document.getElementById("filmSheet");
    if(old) old.remove();
    var ov = document.createElement("div");
    ov.className = "overlay"; ov.id = "filmSheet";
    var posterHtml = f.poster
      ? pic(f.poster, t(f.title))
      : '<div class="film-poster typo tall"><span>' + esc(t(f.title)) + '</span></div>';
    ov.innerHTML =
      '<button class="sheet-close" aria-label="Close">×</button>' +
      '<div class="film-sheet">' +
        '<div class="sheet-poster">' + posterHtml + '</div>' +
        '<div class="sheet-info">' +
          '<h3>' + esc(t(f.title)) + '</h3>' +
          '<p class="film-sub">' + esc([f.year, t(f.info), t(f.roles)].filter(Boolean).join(" · ") || t(SITE.i18n.films.wip)) + '</p>' +
          f.badges.map(function(b){ return '<span class="badge">' + esc(t(b)) + '</span>'; }).join("") +
          (t(f.synopsis) ? '<p class="sheet-syn">' + esc(t(f.synopsis)) + '</p>' : "") +
          (f.stills.length ? '<p class="sheet-label">' + esc(t(SITE.i18n.films.stills)) + '</p><div class="stills">' +
            f.stills.map(function(s, i){
              return '<img src="' + s + '-thumb.webp" loading="lazy" alt="" data-i="' + i + '">';
            }).join("") + '</div>' : "") +
        '</div></div>';
    document.body.appendChild(ov);
    document.body.style.overflow = "hidden";
    function closeSheet(){ ov.remove(); document.body.style.overflow = ""; }
    ov.querySelector(".sheet-close").addEventListener("click", closeSheet);
    ov.addEventListener("click", function(e){ if(e.target === ov) closeSheet(); });
    ov.querySelectorAll(".stills img").forEach(function(im){
      im.addEventListener("click", function(){
        openLightbox(f.stills.map(function(s){ return { src: s + ".webp", cap: t(f.title) }; }),
          parseInt(im.dataset.i, 10));
      });
    });
  }

  /* ---- 渲染调度：后续任务往这里注册 ---- */
  var renderers = [renderFilms];
  window.registerRenderer = function(fn){ renderers.push(fn); };
  function renderAll(){ renderers.forEach(function(fn){ fn(); }); }
  document.addEventListener("DOMContentLoaded", function(){
    renderAll();
    I18N.onChange(renderAll);
  });
})();
```

- [ ] **Step 2: css/style.css 末尾追加**

```css
/* ========== films ========== */
.films{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:2.6rem}
.film{cursor:pointer}
.film-poster{aspect-ratio:2/3;overflow:hidden;background:var(--bg-deep);border:1px solid var(--hairline);position:relative}
.film-poster img{width:100%;height:100%;object-fit:cover;transition:transform .8s ease}
.film:hover .film-poster img{transform:scale(1.04)}
.film-poster.typo{display:grid;place-items:center;text-align:center;padding:1rem;
  background:linear-gradient(165deg,#1a1917,var(--bg-deep))}
.film-poster.typo span{font-family:var(--serif);font-size:1.5rem;letter-spacing:.3em;color:var(--accent);writing-mode:vertical-rl}
.film-meta{margin-top:1.1rem}
.film-title{font-size:1.08rem;letter-spacing:.1em}
.film-sub{color:var(--ink-dim);font-size:.79rem;margin-top:.35rem;letter-spacing:.04em}
.badge{display:inline-block;font-size:.7rem;color:var(--accent);border:1px solid var(--accent-dim);
  padding:.06rem .55rem;margin:.55rem .4rem 0 0;border-radius:2px;letter-spacing:.05em}

/* ========== 影片详情浮层 ========== */
.overlay{position:fixed;inset:0;z-index:80;background:rgba(10,9,8,.96);overflow:auto;
  display:grid;place-items:center;padding:4.5rem 1.5rem 3rem}
.film-sheet{max-width:58rem;display:grid;gap:2.8rem;grid-template-columns:minmax(200px,300px) 1fr;align-items:start}
.sheet-poster img{border:1px solid var(--hairline)}
.film-poster.typo.tall{aspect-ratio:2/3}
.sheet-info h3{font-size:1.6rem;letter-spacing:.12em}
.sheet-syn{color:var(--ink-dim);font-size:.9rem;margin-top:1.4rem;text-align:justify}
.sheet-label{color:var(--accent);font-size:.72rem;letter-spacing:.25em;margin-top:1.8rem}
.stills{display:flex;gap:.8rem;margin-top:.7rem;overflow-x:auto;padding-bottom:.4rem}
.stills img{height:5.4rem;width:auto;cursor:pointer;opacity:.85;transition:opacity .3s;border:1px solid var(--hairline)}
.stills img:hover{opacity:1}
.sheet-close{position:fixed;top:1.1rem;right:1.4rem;z-index:81;font-size:1.9rem;color:var(--ink-dim);
  background:none;border:none;cursor:pointer}
.sheet-close:hover{color:var(--accent)}
@media (max-width:700px){.film-sheet{grid-template-columns:1fr}}
```

- [ ] **Step 3: 验证**

首页影像板块：四张卡片（生日礼物/双盲有真实海报，岁岁平安/归栖为竖排片名字卡）；生日礼物卡片带「FIRST 申报中」徽标；点卡片弹详情浮层，双盲的三张剧照可横滑、点击进 lightbox 左右切换；切 EN 后重开浮层文案为英文；`hidden` 的空字段不渲染空标签。

- [ ] **Step 4: Commit**

```powershell
git add js/render.js css/style.css
git commit -m "feat: 影像板块海报墙与详情浮层（数据驱动、双语、保首映红线）"
```

---

### Task 7: 颗粒桥（影像 → AIGC 特殊转场）+ AIGC 板块

**Files:**
- Modify: `js/transitions.js`（末尾追加颗粒桥）
- Modify: `js/render.js`（追加 renderAigc 并注册）
- Modify: `css/style.css`（追加样式）

**Interfaces:**
- Consumes: Task 1 的 `#grainBridge`/`#grainCanvas`、Task 6 的 `registerRenderer`、`SITE.aigc`

- [ ] **Step 1: js/transitions.js 末尾追加**

```js
/* ===== 颗粒桥：胶片颗粒 -> 数据星点（唯一特殊转场） ===== */
(function(){
  var cv = document.getElementById("grainCanvas");
  if(!cv) return;
  var ctx = cv.getContext("2d");
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var W = 0, H = 0, parts = [], running = false;
  var N = 140, COLS = 14;

  function resize(){
    var d = Math.min(devicePixelRatio || 1, 2);
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = W * d; cv.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0);
    parts = [];
    var rows = Math.ceil(N / COLS);
    for(var i = 0; i < N; i++){
      var col = i % COLS, row = (i / COLS) | 0;
      parts.push({ gx: (col + 1)/(COLS + 1)*W, gy: (row + 1.5)/(rows + 2)*H,
        rx: Math.random()*W, ry: Math.random()*H, j: Math.random()*9 });
    }
    draw();
  }
  function ease(p){ return p < .5 ? 2*p*p : 1 - Math.pow(-2*p + 2, 2)/2; }
  function progress(){
    var r = cv.getBoundingClientRect();
    return Math.max(0, Math.min(1, (innerHeight - r.top)/(innerHeight + r.height)));
  }
  function draw(){
    var e = ease(reduced ? 1 : progress());
    ctx.clearRect(0, 0, W, H);
    for(var i = 0; i < parts.length; i++){
      var q = parts[i];
      var jx = (1 - e) * Math.sin(q.j*37 + performance.now()*0.004) * 6;
      q._x = q.rx + (q.gx - q.rx)*e + jx;
      q._y = q.ry + (q.gy - q.ry)*e;
      ctx.globalAlpha = .3 + .55*e;
      ctx.fillStyle = e > .7 ? "#ebdbbc" : "#faf9f5";
      var s = e > .7 ? 1.7 : 1.1;
      ctx.fillRect(q._x, q._y, s, s);
    }
    if(e > .6){
      ctx.globalAlpha = (e - .6)/.4*.25; ctx.strokeStyle = "#ebdbbc"; ctx.beginPath();
      for(var k = 0; k < parts.length - 1; k++){
        if(k % COLS < COLS - 1){ ctx.moveTo(parts[k]._x, parts[k]._y); ctx.lineTo(parts[k+1]._x, parts[k+1]._y); }
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }
  function loop(){ if(running){ draw(); requestAnimationFrame(loop); } }
  resize();
  addEventListener("resize", resize);
  if(!reduced){
    new IntersectionObserver(function(en){
      var vis = en[0].isIntersecting;
      if(vis && !running){ running = true; requestAnimationFrame(loop); }
      if(!vis) running = false;
    }, { threshold: 0 }).observe(cv);
  }
})();
```

- [ ] **Step 2: js/render.js —— 在 `/* ---- 渲染调度 ---- */` 注释之前插入，并注册**

```js
  /* ---- AIGC ---- */
  function renderAigc(){
    var box = $("#aigcList"); if(!box) return;
    box.innerHTML = "";
    SITE.aigc.forEach(function(c){
      var card = document.createElement("div");
      card.className = "aigc-card reveal";
      card.innerHTML = '<p class="aigc-tag">' + esc(t(c.tag)) + '</p>' +
        '<h3>' + esc(t(c.title)) + '</h3><p>' + esc(t(c.desc)) + '</p>';
      box.appendChild(card);
    });
    observeReveals(box);
  }
```

并把调度行改为：`var renderers = [renderFilms, renderAigc];`

- [ ] **Step 3: css/style.css 末尾追加**

```css
/* ========== 颗粒桥 & AIGC ========== */
.grain-bridge{height:38vh;position:relative;background:var(--bg-deep)}
.grain-bridge canvas{position:absolute;inset:0;width:100%;height:100%}
.aigc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:2rem}
.aigc-card{border:1px solid var(--hairline);padding:2.2rem;background:linear-gradient(170deg,#181715,var(--bg))}
.aigc-tag{color:var(--accent);font-size:.7rem;letter-spacing:.28em;font-family:var(--lat-serif)}
.aigc-card h3{font-size:1.05rem;letter-spacing:.06em;margin-top:.9rem}
.aigc-card p{color:var(--ink-dim);font-size:.85rem;margin-top:.8rem}
```

- [ ] **Step 4: 验证**

滚动经过影像→AIGC 之间：噪点颗粒随滚动进度重组为规则网格并浮现奶油色连线；往回滚会退回颗粒态；AIGC 三张卡片正常、EN 切换生效；开启减少动态时颗粒直接呈静态网格。

- [ ] **Step 5: Commit**

```powershell
git add js/transitions.js js/render.js css/style.css
git commit -m "feat: 胶片颗粒重组星点转场与 AIGC 板块"
```

---

### Task 8: 研究与工程板块

**Files:**
- Modify: `js/render.js`（追加 renderResearch 并注册）
- Modify: `css/style.css`

**Interfaces:**
- Consumes: `SITE.research.timeline`、`SITE.research.papers`、`registerRenderer` 约定（直接改 renderers 数组）

- [ ] **Step 1: js/render.js 插入（renderAigc 之后）**

```js
  /* ---- 研究与工程 ---- */
  function renderResearch(){
    var box = $("#researchBody"); if(!box) return;
    box.innerHTML = "";
    var tl = document.createElement("div");
    tl.className = "timeline";
    SITE.research.timeline.forEach(function(item){
      var it = document.createElement("div");
      it.className = "tl-item reveal";
      it.innerHTML = '<p class="tl-time">' + esc(t(item.time)) + '</p>' +
        '<h3 class="tl-title">' + esc(t(item.title)) + '</h3>' +
        (t(item.desc) ? '<p class="tl-desc">' + esc(t(item.desc)) + '</p>' : "");
      tl.appendChild(it);
    });
    box.appendChild(tl);
    var pp = document.createElement("div");
    pp.className = "papers reveal";
    pp.innerHTML = '<p class="sheet-label">' + esc(t(SITE.i18n.research.papers)) + '</p>' +
      SITE.research.papers.map(function(p){
        return '<a class="paper" href="' + p.url + '" target="_blank" rel="noopener">' +
          '<span class="p-title">' + esc(p.title) + '</span><br>' + esc(t(p.meta)) + '</a>';
      }).join("");
    box.appendChild(pp);
    observeReveals(box);
  }
```

调度行改为：`var renderers = [renderFilms, renderAigc, renderResearch];`

- [ ] **Step 2: css/style.css 末尾追加**

```css
/* ========== research ========== */
.timeline{border-left:1px solid rgba(235,219,188,.18);padding-left:2.2rem;display:flex;flex-direction:column;gap:2.6rem;max-width:46rem}
.tl-item{position:relative}
.tl-item::before{content:"";position:absolute;left:calc(-2.2rem - 3.5px);top:.6rem;width:7px;height:7px;border-radius:50%;background:var(--accent)}
.tl-time{color:var(--accent);font-size:.74rem;letter-spacing:.18em;font-family:var(--lat-serif)}
.tl-title{font-size:1.05rem;margin-top:.3rem;letter-spacing:.05em}
.tl-desc{color:var(--ink-dim);font-size:.85rem;margin-top:.3rem}
.papers{margin-top:3.6rem;max-width:46rem}
.paper{display:block;padding:1.1rem 0;border-top:1px solid var(--hairline);color:var(--ink-dim);font-size:.82rem;transition:color .3s;line-height:1.7}
.paper:hover{color:var(--ink)}
.paper .p-title{color:var(--ink);font-size:.92rem}
```

- [ ] **Step 3: 验证**

研究板块：5 项时间线（奶油色圆点 + 时间 + 标题 + 描述）、3 篇论文链接新窗口打开；EN 切换生效；页面无手机号/住址等隐私内容。

- [ ] **Step 4: Commit**

```powershell
git add js/render.js css/style.css
git commit -m "feat: 研究与工程时间线与论文列表"
```

---

### Task 9: The World I See 画展厅

**Files:**
- Modify: `js/render.js`（追加 renderExhibit 并注册）
- Modify: `css/style.css`

**Interfaces:**
- Consumes: `SITE.exhibition`（titleZh/titleEn/credit/statement/works）、`assets/world/world-01..05`（Task 3 产物）、`openLightbox`

- [ ] **Step 1: js/render.js 插入（renderResearch 之后）**

```js
  /* ---- The World I See 画展厅 ---- */
  function renderExhibit(){
    var intro = $("#exhibitIntro"), wall = $("#exhibitWall");
    if(!intro || !wall) return;
    var ex = SITE.exhibition;
    intro.innerHTML = '<h3>' + esc(ex.titleZh) + '</h3>' +
      '<p class="en-title">' + esc(ex.titleEn) + '</p>' +
      '<p class="credit">' + esc(t(ex.credit)) + '</p>' +
      t(ex.statement).split("\n").map(function(p){ return "<p>" + esc(p) + "</p>"; }).join("");
    wall.innerHTML = "";
    ex.works.forEach(function(w, i){
      var fig = document.createElement("figure");
      fig.className = "artwork reveal";
      fig.innerHTML = '<div class="frame">' + pic(w.src, ex.titleEn + " " + w.num) + '</div>' +
        '<figcaption><span class="art-num">' + w.num + '</span>' + esc(ex.titleZh) + ' · ' + esc(ex.titleEn) + '</figcaption>';
      fig.querySelector(".frame").addEventListener("click", function(){
        openLightbox(ex.works.map(function(x){ return { src: x.src + ".webp", cap: ex.titleZh + " · " + ex.titleEn + " " + x.num }; }), i);
      });
      wall.appendChild(fig);
    });
    observeReveals(wall.parentElement);
  }
```

调度行改为：`var renderers = [renderFilms, renderAigc, renderResearch, renderExhibit];`

- [ ] **Step 2: css/style.css 末尾追加**

```css
/* ========== The World I See 画展厅 ========== */
.exhibit{display:grid;grid-template-columns:minmax(240px,330px) 1fr;gap:3.5rem;align-items:start}
.exhibit-intro{position:sticky;top:6rem;padding:2.4rem;border:1px solid var(--hairline);
  background:linear-gradient(160deg,#1a1917,var(--bg))}
.exhibit-intro h3{font-size:1.45rem;letter-spacing:.28em}
.exhibit-intro .en-title{font-family:var(--lat-serif);color:var(--ink-dim);letter-spacing:.22em;font-size:.8rem;margin-top:.6rem}
.exhibit-intro .credit{color:var(--accent);font-size:.76rem;margin:1.5rem 0 1.2rem;letter-spacing:.16em}
.exhibit-intro p{color:var(--ink-dim);font-size:.83rem;line-height:2.15;text-align:justify;margin-top:.6rem}
.exhibit-wall{display:flex;flex-direction:column;gap:5.5rem;padding-top:1rem}
.artwork{margin:0 auto;max-width:min(44rem,100%);position:relative}
/* 射灯光锥 */
.artwork::before{content:"";position:absolute;left:50%;top:-4.5rem;transform:translateX(-50%);
  width:130%;height:calc(100% + 9rem);pointer-events:none;
  background:radial-gradient(ellipse 48% 42% at 50% 13%,rgba(235,219,188,.11),transparent 68%)}
.artwork .frame{position:relative;padding:12px;background:#1c1b18;border:1px solid #2b2925;
  box-shadow:0 22px 55px rgba(0,0,0,.6);cursor:pointer;transition:transform .6s ease}
.artwork .frame:hover{transform:scale(1.012)}
.artwork .frame img{width:100%;height:auto;max-height:74vh;object-fit:contain;background:var(--bg-deep)}
.artwork figcaption{margin-top:1.15rem;text-align:center;color:var(--ink-dim);font-size:.73rem;letter-spacing:.22em}
.art-num{color:var(--accent);margin-right:.9rem;font-family:var(--lat-serif)}
@media (max-width:860px){.exhibit{grid-template-columns:1fr}.exhibit-intro{position:static}}
```

- [ ] **Step 3: 验证**

旅行板块上半部：左侧前言墙（标题竖排感、奶油色署名、自述全文，滚动时 sticky 跟随）；右侧五幅作品纵向排布，每幅有画框、顶部射灯光晕、下方「Ⅰ 我看见的世界 · The World I See」标签；hover 画框轻微放大；点击进 lightbox 五图连播；EN 切换后自述为英文。窄窗口（<860px）前言在上、作品在下。

- [ ] **Step 4: Commit**

```powershell
git add js/render.js css/style.css
git commit -m "feat: The World I See 画展厅（射灯画框 + 前言墙）"
```

---

### Task 10: 互动世界地图

**Files:**
- Create: `tools/build_map.py`
- Modify: `js/worldmap-data.js`（脚本生成）、`js/worldmap.js`、`css/style.css`

**Interfaces:**
- Produces: `window.WORLD_MAP_PATH`（等距圆柱投影 1000×500 视图的 SVG path 字符串）；图钉/面板交互。投影公式（build_map.py 与 worldmap.js 必须一致）：`x=(lon+180)/360*1000`，`y=(90-lat)/180*500`。
- Consumes: `SITE.locations`（lat/lon/items）、`I18N`、`openLightbox`

- [ ] **Step 1: 写 tools/build_map.py**

```python
"""生成抽象世界地图 -> js/worldmap-data.js
数据源: Natural Earth 派生 GeoJSON (公有领域)。抽稀取点 + 丢弃小岛 = 抽象画质感。
用法: python tools/build_map.py"""
import json, urllib.request

URL = "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json"
W, H, STEP, MIN_DEG2 = 1000, 500, 3, 6.0

def project(lon, lat):
    return ((lon + 180) / 360 * W, (90 - lat) / 180 * H)

def ring_path(ring):
    if len(ring) < 3: return ""
    xs = [p[0] for p in ring]; ys = [p[1] for p in ring]
    if (max(xs)-min(xs)) * (max(ys)-min(ys)) < MIN_DEG2: return ""   # 丢小岛
    pts = ring[::STEP]
    if len(pts) < 3: return ""
    return "M" + "L".join("%.1f %.1f" % project(x, y) for x, y in pts) + "Z"

print("downloading", URL)
geo = json.load(urllib.request.urlopen(URL))
paths = []
for f in geo["features"]:
    g = f["geometry"]
    polys = g["coordinates"] if g["type"] == "MultiPolygon" else [g["coordinates"]]
    for poly in polys:
        d = ring_path(poly[0])   # 只取外环
        if d: paths.append(d)
js = 'window.WORLD_MAP_PATH="' + "".join(paths) + '";\n'
with open("js/worldmap-data.js", "w", encoding="utf-8") as fh:
    fh.write(js)
print("ok: %d rings, %.1f KB" % (len(paths), len(js) / 1024))
```

- [ ] **Step 2: 运行**

Run: `python tools/build_map.py`
Expected: `ok: 100+ rings, 40~120 KB`；`js/worldmap-data.js` 以 `window.WORLD_MAP_PATH="M` 开头。

- [ ] **Step 3: 写 js/worldmap.js**

```js
(function(){
  var W = 1000, H = 500, NS = "http://www.w3.org/2000/svg";
  var current = null;

  function proj(lat, lon){ return [(lon + 180)/360*W, (90 - lat)/180*H]; }

  function build(){
    var wrap = document.getElementById("mapWrap");
    if(!wrap || !window.WORLD_MAP_PATH) return;
    wrap.innerHTML = "";
    var svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    var outline = document.createElementNS(NS, "path");
    outline.setAttribute("d", WORLD_MAP_PATH);
    outline.setAttribute("class", "map-outline");
    svg.appendChild(outline);
    SITE.locations.forEach(function(loc){
      var p = proj(loc.lat, loc.lon);
      var g = document.createElementNS(NS, "g");
      g.setAttribute("class", "pin" + (loc.items.length ? " has" : ""));
      g.setAttribute("transform", "translate(" + p[0].toFixed(1) + "," + p[1].toFixed(1) + ")");
      g.innerHTML = '<circle class="dot" r="2"></circle>' +
        '<line x1="0" y1="0" x2="5" y2="-13"></line>' +
        '<circle class="head" cx="5" cy="-15" r="4.2"></circle>';
      var title = document.createElementNS(NS, "title");
      title.textContent = I18N.t(loc.name);
      g.appendChild(title);
      g.addEventListener("click", function(){ select(loc); });
      svg.appendChild(g);
    });
    wrap.appendChild(svg);
  }

  function select(loc){
    current = loc;
    renderPanel();
    document.getElementById("locPanel").scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function renderPanel(){
    var panel = document.getElementById("locPanel");
    if(!current){ panel.hidden = true; return; }
    panel.hidden = false;
    var items = current.items || [];
    var html = '<h4>' + I18N.t(current.name) + '</h4>';
    if(!items.length){
      html += '<p class="loc-empty">' + I18N.t(SITE.i18n.travel.empty) + ' · Coming soon</p>';
    } else {
      html += '<div class="loc-grid">' + items.map(function(it, i){
        if(it.video){
          return '<video controls preload="metadata" src="' + it.video + '"></video>';
        }
        return '<a data-i="' + i + '"><img src="' + it.img + '-thumb.webp" loading="lazy" alt=""></a>';
      }).join("") + '</div>';
    }
    panel.innerHTML = html;
    var imgs = items.filter(function(it){ return it.img; });
    panel.querySelectorAll("a[data-i]").forEach(function(a){
      a.addEventListener("click", function(){
        openLightbox(imgs.map(function(it){ return { src: it.img + ".webp", cap: I18N.t(it.cap || current.name) }; }),
          parseInt(a.dataset.i, 10));
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function(){
    build();
    I18N.onChange(function(){ build(); renderPanel(); });
  });
})();
```

- [ ] **Step 4: css/style.css 末尾追加**

```css
/* ========== 世界地图 ========== */
.worldmap{margin-top:7rem}
.map-hint{color:var(--ink-dim);font-size:.82rem;letter-spacing:.2em;margin-bottom:1.2rem}
.map-wrap{border:1px solid var(--hairline);background:var(--bg-deep);padding:clamp(.6rem,2vw,1.6rem)}
.map-wrap svg{width:100%;height:auto;display:block}
.map-outline{fill:rgba(235,219,188,.04);stroke:rgba(235,219,188,.3);stroke-width:.7}
.pin{cursor:pointer}
.pin line{stroke:var(--accent);stroke-width:1;opacity:.7}
.pin .head{fill:var(--accent);opacity:.85;transition:opacity .3s}
.pin .dot{fill:var(--ink);opacity:.9}
.pin:hover .head{opacity:1}
.pin.has .head{animation:pinpulse 2.8s ease-in-out infinite}
@keyframes pinpulse{0%,100%{opacity:.85}50%{opacity:.45}}
@media (prefers-reduced-motion:reduce){.pin.has .head{animation:none}}
.loc-panel{margin-top:2rem;border:1px solid var(--hairline);padding:2rem;background:#171614}
.loc-panel h4{letter-spacing:.2em;font-size:1.05rem}
.loc-empty{color:var(--ink-dim);letter-spacing:.16em;font-size:.83rem;margin-top:.8rem}
.loc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:1rem;margin-top:1.2rem}
.loc-grid img,.loc-grid video{width:100%;aspect-ratio:3/2;object-fit:cover;cursor:pointer;border:1px solid var(--hairline)}
```

- [ ] **Step 5: 验证**

旅行板块下半部：奶油色描边的抽象世界大陆轮廓（可辨认，含冰岛）；11 枚倾斜图钉落点正确（成都在中国西南、冰岛在北大西洋）；点击任意图钉 → 下方面板显示地点名 +「整理中 · Coming soon」；EN 切换后地点名变英文。在 data.js 任一地点 items 塞入 `{img:"assets/world/world-01"}` 手测 → 面板出缩略图、点击进 lightbox；测完还原。

- [ ] **Step 6: Commit**

```powershell
git add tools/build_map.py js/worldmap-data.js js/worldmap.js css/style.css
git commit -m "feat: 抽象世界地图与图钉交互（数据驱动，素材可后补）"
```

---

### Task 11: 星空画廊（含空状态与章节星空背景）

**Files:**
- Modify: `js/render.js`（追加 renderAstro 并注册）、`css/style.css`
- Modify: `js/starfield.js`（无改动——复用工厂）

**Interfaces:**
- Consumes: `SITE.astro`（`[{src, cap:{zh,en}}]`，当前为空数组）、`createStarfield`、`#astroWrap`/`#astroGrid`

- [ ] **Step 1: js/render.js 插入（renderExhibit 之后）**

```js
  /* ---- 星空画廊 ---- */
  var astroCanvasDone = false;
  function renderAstro(){
    var grid = $("#astroGrid"); if(!grid) return;
    if(!astroCanvasDone){
      var wrap = $("#astroWrap");
      var cv = document.createElement("canvas");
      wrap.appendChild(cv);
      createStarfield(cv, { density: 9000 });
      astroCanvasDone = true;
    }
    grid.innerHTML = "";
    if(!SITE.astro.length){
      grid.innerHTML = '<p class="empty-state reveal">' + esc(t(SITE.i18n.astro.empty)) + '</p>';
    } else {
      var g = document.createElement("div");
      g.className = "gallery";
      SITE.astro.forEach(function(a, i){
        var el = document.createElement("a");
        el.className = "reveal";
        el.innerHTML = '<img src="' + a.src + '-thumb.webp" loading="lazy" alt="' + esc(t(a.cap)) + '">' +
          '<span class="cap">' + esc(t(a.cap)) + '</span>';
        el.addEventListener("click", function(){
          openLightbox(SITE.astro.map(function(x){ return { src: x.src + ".webp", cap: t(x.cap) }; }), i);
        });
        g.appendChild(el);
      });
      grid.appendChild(g);
    }
    observeReveals(grid);
  }
```

调度行改为：`var renderers = [renderFilms, renderAigc, renderResearch, renderExhibit, renderAstro];`

- [ ] **Step 2: css/style.css 末尾追加**

```css
/* ========== 星空章节 & 通用画廊 ========== */
#astro{overflow:visible}
#astroWrap{position:absolute;inset:0;left:50%;width:100vw;transform:translateX(-50%);z-index:-1;overflow:hidden}
#astroWrap canvas{width:100%;height:100%}
.gallery{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:1.2rem}
.gallery a{position:relative;overflow:hidden;aspect-ratio:3/2;background:var(--bg-deep);cursor:pointer}
.gallery img{width:100%;height:100%;object-fit:cover;transition:transform .8s}
.gallery a:hover img{transform:scale(1.05)}
.gallery .cap{position:absolute;left:0;right:0;bottom:0;padding:1.6rem .8rem .6rem;
  background:linear-gradient(transparent,rgba(10,9,8,.82));font-size:.72rem;letter-spacing:.16em;opacity:0;transition:opacity .4s}
.gallery a:hover .cap{opacity:1}
.empty-state{border:1px dashed rgba(235,219,188,.25);padding:3.6rem 1rem;text-align:center;
  color:var(--ink-dim);letter-spacing:.22em;font-size:.85rem}
```

- [ ] **Step 3: 验证**

星空章节：背景出现比 hero 稀疏的全宽星空（星空回归的首尾呼应）；当前显示虚线框空状态「银河与极光，整理中」；在 data.js 的 `astro` 里手动塞一条 `{src:"assets/world/world-02",cap:{zh:"测试",en:"test"}}` → 网格 + hover 标注 + lightbox 正常，测完还原为 `[]`。

- [ ] **Step 4: Commit**

```powershell
git add js/render.js css/style.css
git commit -m "feat: 星空画廊与章节星空背景（空状态就绪）"
```

---

### Task 12: 关于/联系板块与网页安全版简历

**Files:**
- Modify: `js/render.js`（追加 renderAbout 并注册）、`css/style.css`
- Create: `resume/index.html`

**Interfaces:**
- Consumes: `SITE.about`（bio/contact）、`SITE.i18n.about`
- Produces: `resume/index.html`（独立浅色页，`@media print` 优化，浏览器 Ctrl+P 即可另存 PDF——隐私红线：不含手机号/住址/出生日期）

- [ ] **Step 1: js/render.js 插入（renderAstro 之后）**

```js
  /* ---- 关于 ---- */
  function renderAbout(){
    var box = $("#aboutBody"); if(!box) return;
    box.innerHTML = '<div class="bio reveal"><p>' + esc(t(SITE.about.bio)) + '</p></div>' +
      '<div class="contact-row reveal">' +
      '<a href="resume/" target="_blank" rel="noopener">' + esc(t(SITE.i18n.about.resume)) + '</a>' +
      SITE.about.contact.map(function(c){
        return '<a href="' + c.url + '" target="_blank" rel="noopener">' + esc(c.label) + '</a>';
      }).join("") + '</div>';
    observeReveals(box);
  }
```

调度行改为：`var renderers = [renderFilms, renderAigc, renderResearch, renderExhibit, renderAstro, renderAbout];`

- [ ] **Step 2: css/style.css 末尾追加**

```css
/* ========== about ========== */
.about-grid{max-width:46rem}
.bio p{color:var(--ink-dim);text-align:justify;font-size:.95rem}
.contact-row{display:flex;flex-wrap:wrap;gap:1.2rem;margin-top:2.6rem}
.contact-row a{border:1px solid var(--accent-dim);color:var(--accent);padding:.5rem 1.4rem;
  font-size:.8rem;letter-spacing:.14em;transition:background .3s,color .3s}
.contact-row a:hover{background:var(--accent);color:var(--bg)}
```

- [ ] **Step 3: 写 resume/index.html（浅色、可打印、无隐私字段）**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>余城宇 · 简历 | Harry Yu · Résumé</title>
<meta name="robots" content="noindex">
<style>
body{background:#faf9f5;color:#141413;font:15px/1.75 "Noto Sans SC",-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;max-width:52rem;margin:0 auto;padding:3rem 1.5rem}
h1{font-family:"Noto Serif SC",Georgia,serif;letter-spacing:.15em;font-size:1.7rem}
.sub{color:#6f6d66;font-size:.85rem;margin-top:.3rem}
h2{font-family:"Noto Serif SC",Georgia,serif;font-size:1.02rem;letter-spacing:.2em;margin:2.2rem 0 .8rem;border-bottom:1px solid #e8e6dc;padding-bottom:.4rem}
ul{padding-left:1.2rem}
li{margin:.35rem 0}
.item{display:flex;justify-content:space-between;flex-wrap:wrap;font-weight:600;margin-top:1rem}
.item span:last-child{color:#6f6d66;font-weight:400;font-size:.85rem}
.desc{color:#444;font-size:.9rem}
a{color:#8a6f45}
@media print{body{padding:0;font-size:12.5px}a{color:inherit;text-decoration:none}}
</style>
</head>
<body>
<h1>余城宇 <small>Harry (Chengyu) Yu</small></h1>
<p class="sub">yuchengyu.ycy@gmail.com · linkedin.com/in/chengyu-yu</p>

<h2>教育背景 EDUCATION</h2>
<div class="item"><span>卡内基梅隆大学 Carnegie Mellon University · 计算机科学硕士</span><span>2025.8 – 2026.12</span></div>
<p class="desc">GPA 3.72/4.0</p>
<div class="item"><span>卫斯理大学 Wesleyan University · 计算机科学 × 电影研究（双专业）</span><span>2021.9 – 2025.6</span></div>
<p class="desc">GPA 4.0/4.0 · Phi Beta Kappa · 计算机科学高荣誉毕业 · 弗里曼亚洲奖学金（中国唯一全奖）</p>

<h2>实习经历 EXPERIENCE</h2>
<div class="item"><span>字节跳动 · 多模态大模型算法实习生</span><span>2026.5 – 至今 · 上海</span></div>
<ul>
<li>主导 POI 审核多模态 Agent 主调度器设计，统一编排 5+ 可复用 Skill，存在性通过指标召回率 91%→97%</li>
<li>设计 Plan-Execute Agent 无损上下文压缩策略，整体 token 下降 27%（289k→213k）</li>
<li>构建「稳定前缀 + 动态上下文」缓存方案，预计输入 token 成本下降 25%–50%</li>
</ul>
<div class="item"><span>同花顺 · AIGC 大模型算法实习生</span><span>2024.6 – 2024.8 · 杭州</span></div>
<ul>
<li>H800 集群独立训练并上线 5+ LoRA 风格模型，端到端流水线累计服务 100 万+ 用户</li>
<li>基于 ComfyUI 开发内部扩散模型 GUI，工作流成功率 92%→99.8%</li>
<li>调研 DiT、时空 VAE 等视频生成架构，制定美学评判标准，输出覆盖 5000+ 员工的技术报告</li>
</ul>

<h2>科研 RESEARCH</h2>
<div class="item"><span>Privacy Pioneer · AI 浏览器隐私扫描插件（privacy-tech-lab）</span><span>2024.6 – 2026.4</span></div>
<ul><li>训练 10+ TinyBERT 模型实时分析网络流量，追踪片段检测 F1 96%；重构 Tokenizer 管线提升分类准确率 40%</li></ul>
<div class="item"><span>美国国家科学基金会 · 跨平台选举广告透明度项目 · 学生科研负责人</span><span>2022.12 – 2024.9</span></div>
<ul><li>标准化 200 万+ 行跨平台政治广告数据，以共同作者身份发表于 Nature 子刊 Scientific Data</li></ul>

<h2>论文 PUBLICATIONS</h2>
<ul>
<li>Ning, J., Li, X., &amp; Yu, C.（共同一作，评审中）(2026). <em>Revision or Re-Solving? Decomposing Second-Pass Gains in Multi-LLM Pipelines.</em> <a href="https://arxiv.org/abs/2604.01029">arXiv:2604.01029</a></li>
<li>Zhang, M., et al. incl. <strong>Yu, H.</strong> (2025). <em>Comparable 2022 General Election Advertising Datasets from Meta and Google.</em> <a href="https://doi.org/10.1038/s41597-025-05228-w">Nature Scientific Data, 12, 968</a></li>
<li><strong>Yu, H.</strong>, Yin, P., &amp; Zimmeck, S. (2026). <em>Global Web, Local Privacy? An International Review of Web Tracking.</em> <a href="https://www.sciltp.com/journals/pc/articles/2603003347">Pragmatic Cybersecurity, 1(1)</a></li>
</ul>

<h2>电影 FILMS</h2>
<ul>
<li>《生日礼物》Birthday Present（2026）— 编剧/导演/摄影/剪辑 · 剧情短片 12 分钟</li>
<li>《岁岁平安》（2026）— AIGC 艺术家 · AI 电影大奖（西班牙）与首尔国际 AI 电影节官方入围</li>
<li>《归栖》Finding Home（2025）— 摄影指导 · 澳门国际微电影节官方入围</li>
</ul>

<h2>技能 SKILLS</h2>
<p class="desc">Python · TypeScript/JavaScript · C/C++ · Java · SML/OCaml ｜ Transformer · DiT · VLM · Latent Diffusion · LoRA ｜ RLHF · DPO · RAG · Prompt Engineering ｜ MySQL · BigQuery · Firebase</p>
</body>
</html>
```

- [ ] **Step 4: 验证**

关于板块：双语简介 + 三个按钮（查看简历 / Email / LinkedIn），hover 反色。`http://localhost:8000/resume/` 打开浅色简历页；Ctrl+P 打印预览排版正常；页面内全文搜索确认无手机号、无住址、无出生日期。

- [ ] **Step 5: Commit**

```powershell
git add js/render.js css/style.css resume/index.html
git commit -m "feat: 关于/联系板块与网页安全版简历页"
```

---

### Task 13: 字体子集化与 @font-face

**Files:**
- Create: `tools/subset_fonts.py`
- Produce: `assets/fonts/noto-serif-sc-subset.woff2`、`assets/fonts/lora-subset.woff2`
- Modify: `css/style.css`（文件头部插入 @font-face）

**Interfaces:**
- Consumes: `index.html` + `js/data.js` + `resume/index.html` 的全部字符集
- Produces: 标题字体自托管；下载失败时站点仍以系统字体栈正常渲染（渐进增强）

- [ ] **Step 1: 写 tools/subset_fonts.py**

```python
"""字体子集化: 提取站点实际用字 -> woff2
用法: pip install fonttools brotli; python tools/subset_fonts.py"""
import pathlib, subprocess, urllib.request

FONTS = [
    ("https://github.com/google/fonts/raw/main/ofl/notoserifsc/NotoSerifSC%5Bwght%5D.ttf",
     "build/NotoSerifSC.ttf", "assets/fonts/noto-serif-sc-subset.woff2"),
    ("https://github.com/google/fonts/raw/main/ofl/lora/Lora%5Bwght%5D.ttf",
     "build/Lora.ttf", "assets/fonts/lora-subset.woff2"),
]
text = ""
for f in ["index.html", "js/data.js", "resume/index.html"]:
    text += pathlib.Path(f).read_text(encoding="utf-8")
chars = "".join(sorted(set(text))) + "0123456789ⅠⅡⅢⅣⅤ·—×"
pathlib.Path("build").mkdir(exist_ok=True)
glyphs = pathlib.Path("build/glyphs.txt"); glyphs.write_text(chars, encoding="utf-8")
print("unique chars:", len(chars))
for url, ttf, out in FONTS:
    if not pathlib.Path(ttf).exists():
        print("downloading", url)
        urllib.request.urlretrieve(url, ttf)
    subprocess.run(["pyftsubset", ttf, "--text-file=build/glyphs.txt",
                    "--flavor=woff2", "--output-file=" + out], check=True)
    kb = pathlib.Path(out).stat().st_size / 1024
    print("ok %s (%.0f KB)" % (out, kb))
```

- [ ] **Step 2: 运行**

Run: `pip install fonttools brotli --quiet; python tools/subset_fonts.py`
Expected: 两行 `ok`，Noto 子集 <400KB、Lora 子集 <30KB。若网络失败：跳过本任务并在计划中记录（站点回退系统字体，不阻塞后续任务）。

- [ ] **Step 3: css/style.css 最顶部（`:root` 之前）插入**

```css
@font-face{font-family:"Noto Serif SC";src:url("../assets/fonts/noto-serif-sc-subset.woff2") format("woff2");
  font-weight:200 900;font-display:swap}
@font-face{font-family:Lora;src:url("../assets/fonts/lora-subset.woff2") format("woff2");
  font-weight:400 700;font-display:swap}
```

- [ ] **Step 4: 验证**

强刷新（Ctrl+Shift+R）→ Network 面板两个 woff2 均 200 且总量 <450KB；标题呈现宋体衬线、英文标题为 Lora；断网刷新站点仍可读（系统字体兜底）。

- [ ] **Step 5: Commit**

```powershell
git add tools/subset_fonts.py assets/fonts css/style.css
git commit -m "feat: 标题字体子集化自托管（Noto Serif SC + Lora）"
```

---

### Task 14: 响应式/性能/隐私终检与部署文档

**Files:**
- Modify: `css/style.css`（移动端补丁）
- Create: `README.md`
- Modify: `.gitignore`（追加 build/）

**Interfaces:**
- Consumes: 全站；本任务是发布前 QA 闸门

- [ ] **Step 1: css/style.css 末尾追加移动端补丁**

```css
/* ========== 移动端 ========== */
@media (max-width:640px){
  .nav nav{gap:.65rem;font-size:.74rem}
  .nav nav a[href="#aigc"],.nav nav a[href="#astro"]{display:none} /* 窄屏收纳次要锚点 */
  .chapter{padding:5rem 0 4rem}
  .titlecard{flex-wrap:wrap;gap:.8rem}
  .films{grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:1.4rem}
  .exhibit-wall{gap:3.5rem}
  .overlay{padding:3.5rem 1rem 2rem}
}
```

- [ ] **Step 2: 隐私红线扫描**

Run: `Get-ChildItem -Recurse -File -Include *.html,*.js,*.css,*.md | Where-Object {$_.FullName -notmatch '\\\.git\\|\\assets\\raw\\|\\films\\'} | Select-String -Pattern "[redacted]","[redacted]","[redacted]","[redacted]","[redacted]","[redacted]" | Select-Object Path, LineNumber`
Expected: 无输出（`docs/` 中如出现属于设计文档引用也必须清理为无输出）。

- [ ] **Step 3: 性能检查**

Run: DevTools Lighthouse（Performance + Accessibility）
Expected: Performance ≥90；Network 面板首屏传输 <1MB；无任何第三方域名请求。

- [ ] **Step 4: 写 README.md（含部署步骤）**

```markdown
# 余城宇 · Harry Yu — 个人网站

纯静态单页站。无框架、无构建、零第三方请求。

## 本地预览
python -m http.server 8000  →  http://localhost:8000

## 更新内容
- 文案/影片/地点：编辑 `js/data.js`
- 加照片：原图放 `assets/raw/<类别>/`，运行 `python tools/optimize.py`，把生成的 base 路径填进 `js/data.js`
- 世界地图加地点：`js/data.js` 的 `locations` 加一条（lat/lon + items）

## 部署（push 即上线）
1. GitHub 建仓并推送：`git remote add origin <repo>; git push -u origin main`
2. Cloudflare Pages（主线）：Dashboard → Workers & Pages → 连接该仓库，
   Framework preset = None，Build command 留空，Output dir = `/`
3. GitHub Pages（备线）：仓库 Settings → Pages → Deploy from branch → main / root
4. 自定义域名：在 Cloudflare Pages 绑定（可后续再加）

## 红线（改动前必读）
- 《生日礼物》正片任何形式不得上传/外链（FIRST 世界首映资格）
- 手机号/住址/出生日期/亲属信息不进仓库不上站
- `assets/raw/` 已 gitignore，原图不入库
```

- [ ] **Step 5: .gitignore 追加 `build/`，全站走查**

桌面 + 手机宽度（DevTools 375px）各滚一遍：导航、六板块、语言切换、影片浮层、画展、地图、lightbox 全部可用；控制台无报错。

- [ ] **Step 6: Commit**

```powershell
git add -A
git commit -m "chore: 移动端补丁、隐私终检、部署文档"
```

---

## Self-Review 记录

- **Spec 覆盖**：六板块 + hero ✓；暗场转场（fade-band）+ 唯一特殊转场（颗粒桥）✓；双语一键切换 + localStorage + 浏览器语言默认 ✓；画展厅（射灯/前言墙/五作品）✓；世界地图（抽象 SVG/图钉/空状态/数据驱动）✓；星空首尾呼应（hero 浓 → body 底纹稀 → astro 回归）✓；隐私红线与安全版简历 ✓；性能预算与验收清单对应 Task 14 ✓；不做项（无视频嵌入/无浅色模式/无多页路由——resume 为独立工具页不在导航叙事内，符合"单页"定位）✓
- **占位符扫描**：无 TBD/TODO；《双盲》《岁岁平安》《归栖》的空字段是 spec 明确的「数据驱动空状态」，渲染层已定义回退（`films.wip`/空状态文案）✓
- **类型一致性**：`I18N.t/onChange`、`observeReveals`、`openLightbox(items:[{src,cap}])`、`pic(base,alt)`、`createStarfield(canvas,{density})`、投影公式 `(lon+180)/360*1000, (90-lat)/180*500` 在 Task 2/4/5/6/9/10/11 中签名一致 ✓

