window.SITE = {
i18n: {
  nav: {
    home:{zh:"首页",en:"Home"},
    films:{zh:"影像",en:"Films"}, aigc:{zh:"AI × 创作",en:"AI × Art"},
    research:{zh:"研究",en:"Research"}, astro:{zh:"星空",en:"Astro"},
    travel:{zh:"旅行",en:"Travel"}, about:{zh:"关于",en:"About"}
  },
  hero: {
    tagline:{zh:"以镜头与模型，讲述同一个世界",en:"The same world, twice: once through a lens, once in code"},
    sub:{zh:"导演 · AI算法码农 · 白日梦想家",en:"Filmmaker · AI Researcher · Daydreamer"},
    story:{zh:"听听我的故事",en:"The story so far"},
    scroll:{zh:"向下滑动",en:"Scroll"}
  },
  films: {
    title:{zh:"影像",en:"Films"}, alt:{zh:"FILMS",en:"影像"},
    wip:{zh:"信息整理中",en:"Details coming soon"},
    stills:{zh:"剧照",en:"Stills"},
    open:{zh:"简介 · 剧照 →",en:"Synopsis · Stills →"}
  },
  ui: { back:{zh:"← 返回",en:"← Back"} },
  aigc: { title:{zh:"AI × 创作",en:"AI × Art"}, alt:{zh:"AI × ART",en:"AI × 创作"} },
  research: { title:{zh:"研究与工程",en:"Research & Engineering"}, alt:{zh:"RESEARCH",en:"研究与工程"}, papers:{zh:"论文发表",en:"Publications"},
    resumeCta:{zh:"查看完整简历",en:"View full résumé"} },
  astro: { title:{zh:"星空",en:"Astronomy"}, alt:{zh:"ASTRONOMY",en:"星空"},
    intro:{zh:"这些，是我仰望星空时拍下的画面。我幻想有一天能抵达宇宙的尽头，看看这个世界更广阔的样子。旅程还在继续，少年将继续探索这个世界。",
           en:"These are the frames I caught while looking up. I dream that one day I will reach the far end of the universe, and see how much wider this world can be. The journey goes on, and the boy keeps exploring."},
    empty:{zh:"银河与极光，整理中",en:"Galaxies and aurorae, coming soon"} },
  travel: {
    title:{zh:"旅行",en:"Travel"}, alt:{zh:"TRAVEL",en:"旅行"},
    hint:{zh:"拖动地图 · 点击图钉，看看我在那里看见的世界",en:"Drag to roam · tap a pin to see what I saw there"},
    empty:{zh:"整理中",en:"Coming soon"},
    view:{zh:"点击查看",en:"Click to view"},
    diaryTip:{zh:"打开旅行手账 →",en:"Open travel diary →"},
    zoom:{zh:"点击放大",en:"Click to zoom"},
    pick:{zh:"点击选择地点",en:"Click to choose"},
    back:{zh:"返回全图",en:"Full map"},
    goto:{zh:"去看看我走过的世界",en:"See where I've been"}
  },
  about: { title:{zh:"关于",en:"About"}, alt:{zh:"ABOUT",en:"关于"}, resume:{zh:"查看简历",en:"Résumé"} },
  footer: { line:{zh:"© 2026 余城宇 · Harry Yu",en:"© 2026 Chengyu (Harry) Yu"} },
  onboard: { tip:{zh:"在这里切换 中 / EN 与明暗主题",en:"Language & theme, right up here"} }
},

films: [
  { id:"birthday",
    title:{zh:"生日礼物",en:"Birthday Present"}, year:"2026",
    info:{zh:"剧情短片 · 12 分钟 · 彩色",en:"Narrative short · 12 min · Color"},
    roles:{zh:"编剧 / 导演 / 摄影 / 剪辑",en:"Writer / Director / DP / Editor"},
    badges:[{zh:"申报中",en:"In submission"}],
    synopsis:{zh:"母亲生日当天，一通来自内江老家的电话打破了平静：患阿尔茨海默症的外婆走失了。她随即踏上归乡寻母之路。一次寻找，也是女儿、母亲与外婆三代女性之间情感的传递。",
      en:"On her birthday, a mother gets a call from home: her own mother, who has Alzheimer’s, has wandered off. She drops everything and goes back. The search turns into a quiet portrait of three generations of women and the love handed down between them."},
    poster:"assets/films/birthday-poster", stills:[{ src:"assets/films/birthday-still-01", ar:"2000/853" }] },
  { id:"suisui",
    title:{zh:"岁岁平安",en:"The Last New Year's Eve"}, year:"2026",
    info:{zh:"剧情 / 动画 / AIGC 短片 · 8 分 15 秒 · 彩色",en:"Drama / Animation / AIGC short · 8 min 15 sec · Color"},
    roles:{zh:"AIGC 艺术家",en:"AIGC Artist"},
    badges:[{zh:"罗马棱镜电影奖 月度最佳动画短片",en:"Rome Prisma Film Awards · Monthly Best Animation Short"},
            {zh:"AI 电影大奖 官方入围 · 西班牙 2026",en:"AI Movie Awards · Official Selection · Spain 2026"},
            {zh:"首尔国际 AI 电影节 官方入围 2026",en:"Seoul Int’l AI Film Festival · Official Selection 2026"}],
    synopsis:{zh:"跨年夜，男孩在梦中回到了战前的故乡。他穿过温暖的街道，欢庆的人群，追逐一颗微光闪烁的小球，那是他仅存的希望。梦境与现实交织，在隐隐不安中走向破碎。当钟声响起，烟花与炮弹一同炸裂……这不只是一个关于战争的故事，而是关于那些在战争中没能等到明天的孩子。近年来，平民儿童在战争中受害的事件屡屡发生。人类至今无法避免通过战争解决内部矛盾。唯愿岁岁平安，战火不再烧及文明的未来。",
      en:"On New Year’s Eve, a boy returns to his homeland before the war, in a dream. He runs through warm streets and festive crowds, chasing a flickering sphere of light, the last glimmer of hope he has left. Dream and reality intertwine, quietly unsettled, moving toward collapse. As the bells ring out, fireworks and shells explode together… This is more than a story about war. It is about the children who, in war, never lived to see the next year. In recent years, civilian children have too often fallen victim to conflict. Humanity has yet to find a way to resolve its internal struggles without war. If only the flames of battle would never again consume the future of civilization."},
    specs:[
      { k:{zh:"摄制时间",en:"Production"}, v:{zh:"2026.02.22 – 03.30",en:"Feb 22 – Mar 30, 2026"} },
      { k:{zh:"摄制国家",en:"Country"},   v:{zh:"中国",en:"China"} },
      { k:{zh:"对白语言",en:"Dialogue"},  v:{zh:"阿拉伯语",en:"Arabic"} },
      { k:{zh:"字幕",en:"Subtitles"},     v:{zh:"中英双语（内嵌）",en:"Embedded Chinese & English"} },
      { k:{zh:"制作规格",en:"Format"},    v:{zh:"4K (3840×2160) · 25fps · H.265 · 16:9 · 双声道",en:"4K (3840×2160) · 25fps · H.265 · 16:9 · Stereo"} },
      { k:{zh:"摄制工具",en:"Made with"}, v:{zh:"AIGC",en:"AIGC"} },
      { k:{zh:"放映情况",en:"Screening"}, v:{zh:"国际 / 国内首映",en:"International / domestic premiere"} }
    ],
    poster:"assets/films/suisui-poster", stills:[] },
  { id:"guiqi",
    title:{zh:"归栖",en:"Finding Home"}, year:"2025",
    info:{zh:"短片",en:"Short film"},
    roles:{zh:"摄影指导",en:"Director of Photography"},
    badges:[{zh:"澳门国际微电影节 官方入围 2025",en:"Macau Int’l Micro Film Festival · Official Selection 2025"}],
    synopsis:{zh:"心灰意冷的年轻人回到县城老家，老屋的痕迹与父母的坚守，迫使他重新审视“家”的意义。",
      en:"Disillusioned, a young man returns to his family home in a small county town. The traces time has left in the old house, and his parents’ quiet steadfastness, force him to look again at what “home” really means."},
    poster:"assets/films/guiqi-poster", stills:[] },
  { id:"doubleblind",
    title:{zh:"双盲",en:"Double Blind"}, year:"2026",
    info:{zh:"剧情短片",en:"Narrative short"}, roles:{zh:"导演",en:"Director"},
    badges:[{zh:"申报中",en:"In submission"}],
    synopsis:{zh:"",en:""},
    poster:"assets/films/doubleblind-poster",
    stills:[{ src:"assets/films/doubleblind-still-01", ar:"2000/856" },
            { src:"assets/films/doubleblind-still-02", ar:"1668/740" },
            { src:"assets/films/doubleblind-still-03", ar:"2000/825" }] }
],

aigc: [
  { tag:{zh:"AIGC 影片",en:"AIGC FILM"},
    title:{zh:"《岁岁平安》",en:"岁岁平安"},
    desc:{zh:"以生成式模型完成的短片，入围 AI 电影大奖（西班牙·马加鲁夫）与首尔国际 AI 电影节。",
      en:"A short film made with generative models, selected at the AI Movie Awards (Magaluf, Spain) and the Seoul International AI Film Festival."} },
  { tag:{zh:"风格模型",en:"STYLE MODELS"},
    title:{zh:"LoRA 风格模型 × 100 万用户",en:"LoRA style models × 1M users"},
    desc:{zh:"在同花顺独立训练并上线 5+ LoRA 风格模型，搭建从数据处理、训练到服务上线的端到端流水线，累计服务超 100 万用户。",
      en:"Independently trained and shipped 5+ LoRA style models end to end, from data and training to deployment, serving over one million users."} },
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
    { time:{zh:"2024.6 – 2024.8",en:"Jun – Aug 2024"},
      title:{zh:"同花顺 · AIGC 大模型算法实习生",en:"Hithink RoyalFlush · Generative AI / CV Engineer Intern"},
      desc:{zh:"独立训练并上线 5+ LoRA 风格模型，端到端流水线累计服务 100 万+ 用户；调研 DiT 与时空 VAE 视频生成架构，输出覆盖 5000+ 员工的技术报告。",
        en:"Trained and shipped 5+ LoRA style models end to end, serving 1M+ users; researched DiT and spatio-temporal VAE video generation architectures, with an internal report read by 5,000+ employees."} },
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
      meta:{zh:"COLM 2026 · 共同一作",en:"COLM 2026 · equal contribution"},
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
    en:"“Is the world we know one continuous whole, or a mosaic of brief, vivid moments?\nThese photographs are my answer: fragments of light picked up along the way. They are imperfect and they don’t last, but together they trace the shape of a life. Each one marks a small collision between what I saw and what I felt. None of this is a finished map. The moments keep settling into meaning, and I keep chasing landscapes I don’t have names for yet.\nI hope you find more than my world here. I hope some of it feels like yours.”"
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
  { id:"neijiang",   name:{zh:"内江",en:"Neijiang"},       lat:29.58, lon:105.06, items:[], diary:true },
  { id:"hangzhou",   name:{zh:"杭州",en:"Hangzhou"},       lat:30.27, lon:120.16, items:[], diary:true },
  { id:"middletown", name:{zh:"卫斯理安",en:"Wesleyan"},  lat:41.56, lon:-72.65, items:[], diary:true },
  { id:"busan",      name:{zh:"釜山",en:"Busan"},          lat:35.16, lon:129.16, items:[], diary:true },
  { id:"chongqing",  name:{zh:"重庆",en:"Chongqing"},      lat:29.56, lon:106.55, items:[], diary:true },
  { id:"hongkong",   name:{zh:"香港",en:"Hong Kong"},      lat:22.32, lon:114.17, items:[], diary:true },
  { id:"qatar",      name:{zh:"卡塔尔",en:"Qatar"},        lat:25.29, lon:51.53, items:[], diary:true },
  { id:"suzhou",     name:{zh:"苏州",en:"Suzhou"},         lat:31.30, lon:120.62, items:[], diary:true },
  { id:"xinjiang",   name:{zh:"赛里木湖",en:"Sayram Lake"}, lat:44.60, lon:81.20, items:[], diary:true },
  { id:"route66",    name:{zh:"66 号公路",en:"Route 66"},  lat:35.19, lon:-111.66, items:[], diary:true },
  { id:"goldcoast",  name:{zh:"黄金海岸",en:"Gold Coast"},  lat:-28.02, lon:153.40, items:[], diary:true },
  { id:"southafrica", name:{zh:"南非",en:"South Africa"}, lat:-33.96, lon:18.40, items:[], diary:true },
  { id:"newzealand", name:{zh:"新西兰",en:"New Zealand"}, lat:-44.00, lon:170.48, items:[], diary:true },
  { id:"iceland",    name:{zh:"冰岛",en:"Iceland"},        lat:64.15, lon:-21.94, items:[], diary:true },
  { id:"norway",     name:{zh:"挪威",en:"Norway"},         lat:60.39, lon:5.32,  items:[], diary:true }
],

about: {
  portrait:"assets/me/portrait", portraitAr:"1086/1290",
  bio:{
    zh:"余城宇，青年导演、AI算法研究者。现于卡内基梅隆大学（Carnegie Mellon University）攻读MSCS计算机科学硕士，本科以弗里曼亚洲学者身份毕业于卫斯理大学（Wesleyan University）电影与计算机科学双专业，获高荣誉学位。他长期关注影像、人工智能与艺术创作之间的关系，擅长从技术与人文的交界处探索 AI 对叙事、感知和创作者能力边界的拓展。其作品关注家庭、记忆与身份，在克制的影像中呈现人物细腻的情感流动。",
    en:"Harry Yu is a filmmaker and AI researcher, currently pursuing an M.S. in Computer Science at Carnegie Mellon University. He graduated from Wesleyan University as a Freeman Asian Scholar with High Honors, double majoring in Film Studies and Computer Science. His practice has long explored the relationship between the moving image, artificial intelligence, and artistic creation. Working at the intersection of technology and the humanities, he examines how AI expands the boundaries of narrative, perception, and creative possibility. His films center on family, memory, and identity, tracing subtle emotional undercurrents through a restrained visual language."
  },
  contact:[
    { label:"Email",    url:"mailto:yuchengyu.ycy@gmail.com" },
    { label:"LinkedIn", url:"https://www.linkedin.com/in/chengyu-yu" },
    { label:"Bilibili", url:"https://space.bilibili.com/393862013" },
    { label:{zh:"小红书",en:"RED"}, url:"https://www.xiaohongshu.com/user/profile/5eab75930000000001001642" }
  ]
}
};
