window.SITE = {
i18n: {
  nav: {
    home:{zh:"首页",en:"Home"},
    films:{zh:"影像",en:"Films"}, aigc:{zh:"AI × 创作",en:"AI × Art"},
    research:{zh:"研究",en:"Research"}, astro:{zh:"星空",en:"Astro"},
    travel:{zh:"旅行",en:"Travel"}, about:{zh:"关于",en:"About"}
  },
  hero: {
    tagline:{zh:"以镜头与模型，讲述同一个世界",en:"Telling one world — through lenses and models"},
    sub:{zh:"导演 · 计算机科学研究者",en:"Filmmaker · Computer Scientist"},
    story:{zh:"听听我的故事",en:"Hear my story"}
  },
  films: {
    title:{zh:"影像",en:"Films"}, alt:{zh:"FILMS",en:"影像"},
    wip:{zh:"信息整理中",en:"Details coming soon"},
    stills:{zh:"剧照",en:"Stills"}
  },
  aigc: { title:{zh:"AI × 创作",en:"AI × Art"}, alt:{zh:"AI × ART",en:"AI × 创作"} },
  research: { title:{zh:"研究与工程",en:"Research & Engineering"}, alt:{zh:"RESEARCH",en:"研究与工程"}, papers:{zh:"论文发表",en:"Publications"} },
  astro: { title:{zh:"星空",en:"Astronomy"}, alt:{zh:"ASTRONOMY",en:"星空"}, empty:{zh:"银河与极光，整理中",en:"Galaxies and aurorae — coming soon"} },
  travel: {
    title:{zh:"旅行",en:"Travel"}, alt:{zh:"TRAVEL",en:"旅行"},
    hint:{zh:"点击图钉，看看我在那里看见的世界",en:"Click a pin to see what I saw there"},
    empty:{zh:"整理中",en:"Coming soon"},
    view:{zh:"点击查看",en:"Click to view"},
    zoom:{zh:"点击放大",en:"Click to zoom"},
    back:{zh:"返回全图",en:"Full map"},
    goto:{zh:"去看看我走过的世界",en:"See the world I have walked"}
  },
  about: { title:{zh:"关于",en:"About"}, alt:{zh:"ABOUT",en:"关于"}, resume:{zh:"查看简历",en:"Résumé"} },
  footer: { line:{zh:"© 2026 余城宇 · Harry Yu",en:"© 2026 Harry Yu"} },
  onboard: { tip:{zh:"在这里切换 中 / EN 与明暗主题",en:"Switch language & light / dark theme here"} }
},

films: [
  { id:"birthday",
    title:{zh:"生日礼物",en:"Birthday Present"}, year:"2026",
    info:{zh:"剧情短片 · 12 分钟 · 彩色",en:"Narrative short · 12 min · Color"},
    roles:{zh:"编剧 / 导演 / 摄影 / 剪辑",en:"Writer / Director / DP / Editor"},
    badges:[{zh:"申报中",en:"In submission"}],
    synopsis:{zh:"母亲生日当天，一通来自内江老家的电话打破了平静：患阿尔茨海默症的外婆走失了。她随即踏上归乡寻母之路。一次寻找，也是女儿、母亲与外婆三代女性之间情感的传递。",
      en:"On her own birthday, a mother receives a call from her hometown: her mother, living with Alzheimer’s, has gone missing. She sets out at once on a journey home — a search that traces the bonds among three generations of women."},
    poster:"assets/films/birthday-poster", stills:[{ src:"assets/films/birthday-still-01", ar:"2000/853" }] },
  { id:"suisui",
    title:{zh:"岁岁平安",en:"岁岁平安"}, year:"2026",
    info:{zh:"AIGC 短片",en:"AIGC short film"},
    roles:{zh:"AIGC 艺术家",en:"AIGC Artist"},
    badges:[{zh:"罗马棱镜电影奖 月度最佳动画短片",en:"Rome Prisma Film Awards · Monthly Best Animation Short"},
            {zh:"AI 电影大奖 官方入围 · 西班牙 2026",en:"AI Movie Awards · Official Selection · Spain 2026"},
            {zh:"首尔国际 AI 电影节 官方入围 2026",en:"Seoul Int’l AI Film Festival · Official Selection 2026"}],
    synopsis:{zh:"",en:""}, poster:"assets/films/suisui-poster", stills:[] },
  { id:"guiqi",
    title:{zh:"归栖",en:"Finding Home"}, year:"2025",
    info:{zh:"短片",en:"Short film"},
    roles:{zh:"摄影指导",en:"Director of Photography"},
    badges:[{zh:"澳门国际微电影节 官方入围 2025",en:"Macau Int’l Micro Film Festival · Official Selection 2025"}],
    synopsis:{zh:"",en:""}, poster:"assets/films/guiqi-poster", stills:[] },
  { id:"doubleblind",
    title:{zh:"双盲",en:"双盲"}, year:"2026",
    info:{zh:"剧情短片",en:"Narrative short"}, roles:{zh:"导演",en:"Director"},
    badges:[{zh:"申报中",en:"In submission"}],
    synopsis:{zh:"",en:""},
    poster:"assets/films/doubleblind-poster",
    stills:[{ src:"assets/films/doubleblind-still-01", ar:"2000/856" },
            { src:"assets/films/doubleblind-still-02", ar:"1668/740" },
            { src:"assets/films/doubleblind-still-03", ar:"2000/825" }] }
],

heroCards: [
  { href:"#films",    img:"assets/films/birthday-poster", label:{zh:"影像",en:"Films"},    tag:{zh:"看见。被看见。",en:"See. Be seen."} },
  { href:"#aigc",     img:"assets/films/suisui-poster",   label:{zh:"AI × 创作",en:"AI × Art"}, tag:{zh:"生成。再创造。",en:"Generate. Create."} },
  { href:"#research", img:"assets/world/world-05",        label:{zh:"研究",en:"Research"}, tag:{zh:"提问。求解。",en:"Ask. Solve."} },
  { href:"#astro",    img:"assets/astro/astro-06",        label:{zh:"星空",en:"Astro"},   tag:{zh:"仰望。追光。",en:"Look up. Chase light."} },
  { href:"#travel",   img:"assets/travel/iceland-falls",  label:{zh:"旅行",en:"Travel"},  tag:{zh:"出发。抵达。",en:"Depart. Arrive."} }
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
    { src:"assets/world/world-01", num:"Ⅰ", ar:"1336/2000" },
    { src:"assets/world/world-02", num:"Ⅱ", ar:"2000/1334" },
    { src:"assets/world/world-03", num:"Ⅲ", ar:"2000/1334" },
    { src:"assets/world/world-04", num:"Ⅳ", ar:"1334/2000" },
    { src:"assets/world/world-05", num:"Ⅴ", ar:"2000/1333" }
  ]
},

astro: [
  { src:"assets/astro/astro-01", ar:"2000/1512", cap:{zh:"",en:""} },
  { src:"assets/astro/astro-02", ar:"2000/1336", cap:{zh:"",en:""} },
  { src:"assets/astro/astro-03", ar:"1910/1967", cap:{zh:"",en:""} },
  { src:"assets/astro/astro-04", ar:"1902/1270", cap:{zh:"",en:""} },
  { src:"assets/astro/astro-05", ar:"1428/2000", cap:{zh:"",en:""} },
  { src:"assets/astro/astro-06", ar:"2000/1333", cap:{zh:"",en:""} },
  { src:"assets/astro/astro-07", ar:"2000/1381", cap:{zh:"",en:""} },
  { src:"assets/astro/astro-08", ar:"1512/2000", cap:{zh:"",en:""} },
  { src:"assets/astro/astro-09", ar:"2000/1500", cap:{zh:"",en:""} },
  { src:"assets/astro/astro-10", ar:"2000/1600", cap:{zh:"",en:""} },
  { src:"assets/astro/astro-11", ar:"2000/1512", cap:{zh:"",en:""} }
],

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
  portrait:"assets/me/portrait", portraitAr:"1086/1290",
  bio:{
    zh:"余城宇，青年导演、AI算法研究者。现于卡内基梅隆大学（Carnegie Mellon University）攻读MSCS计算机科学硕士，本科以弗里曼亚洲学者身份毕业于卫斯理大学（Wesleyan University）电影与计算机科学双专业，获高荣誉学位。他长期关注影像、人工智能与艺术创作之间的关系，擅长从技术与人文的交界处探索 AI 对叙事、感知和创作者能力边界的拓展。其作品关注家庭、记忆与身份，在克制的影像中呈现人物细腻的情感流动。",
    en:"Harry Yu is a young filmmaker and AI researcher, currently pursuing an M.S. in Computer Science at Carnegie Mellon University. He graduated from Wesleyan University as a Freeman Asian Scholar with High Honors, double-majoring in Film Studies and Computer Science. His work has long explored the relationship between moving images, artificial intelligence and artistic creation — probing, from the intersection of technology and the humanities, how AI expands the boundaries of narrative, perception and creative authorship. His films dwell on family, memory and identity, capturing subtle emotional currents through a restrained visual language."
  },
  contact:[
    { label:"Email",    url:"mailto:yuchengyu.ycy@gmail.com" },
    { label:"LinkedIn", url:"https://www.linkedin.com/in/chengyu-yu" },
    { label:"Bilibili", url:"https://space.bilibili.com/393862013" },
    { label:{zh:"小红书",en:"RED"}, url:"https://www.xiaohongshu.com/user/profile/5eab75930000000001001642" }
  ]
}
};
