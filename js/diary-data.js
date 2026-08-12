/* 旅行手账数据：每个地点一页（一组图 + 手写文字）。
   图片为 assets/raw/travel/<loc>/ 经管线产出的 assets/travel/<loc>/<loc>-NN。
   geo：Natural Earth 50m 提取的轮廓（note 便签描边 / stamp 邮戳剪影）、
        便签定位点 dot、邮戳环形文字与剪影摆位 silT */
window.DIARY = {
  norway: {
    geo: {
      vb: "-8 -8 184 216",
      dot: { x: 56.2, y: 44.2 },
      silT: "translate(62,63) rotate(-38) scale(.28) translate(-84,-100)",
      stampTop: "NORWAY", stampBottom: "LOFOTEN",
      note: "M155.6,31.7 L154.8,29.3 L157.9,24.8 L156.7,21.7 L147.7,15.7 L143.7,18.1 L139.8,18.0 L136.9,21.4 L134.8,32.2 L129.5,38.2 L122.5,35.0 L119.1,37.4 L113.2,36.3 L108.1,27.9 L105.8,27.8 L104.5,28.7 L104.5,31.4 L98.3,31.7 L99.8,34.3 L97.4,39.0 L99.1,40.0 L97.4,41.8 L86.6,38.8 L84.1,47.8 L80.3,45.7 L76.8,48.9 L75.4,53.1 L72.5,56.1 L74.3,61.8 L68.0,70.4 L68.4,73.2 L62.3,75.9 L61.9,88.6 L56.5,99.6 L59.3,101.4 L59.2,107.0 L58.5,108.3 L53.6,107.4 L51.0,108.5 L47.0,114.7 L45.8,119.3 L47.8,134.7 L46.9,143.4 L51.5,149.0 L50.4,153.5 L47.7,154.4 L49.7,162.8 L49.0,168.1 L45.4,171.8 L43.8,176.0 L44.5,180.6 L42.9,186.7 L41.7,183.4 L38.3,182.2 L36.8,173.3 L34.1,184.9 L31.9,185.7 L30.1,183.3 L30.7,185.5 L21.1,198.1 L16.5,200.0 L13.5,199.9 L12.7,198.0 L11.8,199.3 L10.6,198.4 L11.3,196.3 L7.4,194.6 L4.4,190.8 L4.5,184.8 L7.7,187.0 L9.4,185.0 L7.7,185.8 L6.3,183.5 L6.7,180.4 L9.7,176.6 L1.7,182.5 L2.1,176.4 L3.6,174.1 L5.6,174.9 L8.4,172.5 L5.3,171.8 L8.0,166.1 L10.4,163.5 L10.5,167.4 L13.5,161.9 L8.0,164.4 L1.5,175.2 L1.9,168.4 L5.0,167.8 L2.4,166.6 L1.5,162.9 L4.8,159.2 L2.2,161.0 L1.3,160.0 L0.6,153.8 L12.1,152.2 L13.8,155.1 L13.8,153.0 L17.4,151.2 L15.8,149.8 L16.4,147.8 L15.3,151.6 L13.1,152.0 L10.9,150.0 L9.5,152.4 L2.7,152.8 L0.7,150.6 L0.6,147.8 L2.8,147.0 L0.1,143.5 L0.1,141.0 L3.6,140.7 L7.1,142.4 L11.8,141.1 L2.3,140.1 L1.5,136.7 L2.9,136.8 L6.5,132.7 L7.6,133.8 L10.8,132.9 L11.5,132.0 L7.9,132.9 L9.3,129.8 L17.7,130.5 L17.0,128.8 L20.3,127.3 L12.1,128.4 L12.1,127.0 L13.6,124.5 L17.7,122.1 L20.6,122.4 L24.0,126.2 L21.0,121.3 L21.7,119.4 L24.1,118.6 L22.3,116.2 L23.7,114.6 L27.3,114.7 L27.5,116.8 L31.0,114.3 L33.0,117.8 L37.8,116.8 L37.6,114.2 L41.8,111.5 L40.5,110.1 L42.3,108.5 L40.8,108.0 L38.8,109.7 L39.0,112.0 L33.3,116.0 L31.4,113.1 L30.3,113.4 L30.4,111.6 L36.6,102.1 L42.8,97.1 L43.0,96.0 L41.3,97.0 L42.5,93.6 L46.9,90.5 L47.8,91.9 L50.6,89.9 L51.8,88.0 L48.5,90.4 L46.6,87.7 L50.3,79.4 L52.5,78.6 L50.9,76.4 L59.0,73.4 L53.1,74.4 L53.7,68.1 L56.3,65.7 L58.5,65.8 L56.5,64.0 L59.5,60.8 L67.9,59.5 L61.6,58.5 L65.0,53.8 L69.1,57.3 L69.7,54.6 L66.9,53.4 L67.2,50.9 L64.3,52.5 L63.9,50.2 L66.1,47.7 L69.3,48.1 L67.3,46.3 L71.8,43.8 L73.7,49.1 L73.0,42.5 L81.8,40.8 L75.0,39.2 L80.7,35.1 L82.7,30.5 L85.3,29.6 L86.3,24.8 L90.2,27.2 L88.6,24.5 L91.1,23.4 L92.4,20.6 L95.6,19.7 L95.3,25.5 L97.3,19.4 L99.7,17.5 L98.3,26.8 L100.7,23.7 L102.4,24.0 L101.0,21.4 L101.6,18.0 L105.1,18.4 L106.8,16.5 L110.4,19.2 L109.2,15.7 L106.3,13.1 L112.6,12.7 L114.9,11.0 L119.3,17.0 L119.4,12.9 L126.2,6.0 L125.2,4.1 L127.7,1.4 L131.6,3.8 L132.7,2.7 L134.9,3.6 L129.9,13.4 L130.2,15.0 L131.3,14.6 L139.7,2.7 L141.1,3.6 L140.2,10.4 L142.8,8.9 L144.0,5.3 L146.4,4.4 L144.4,2.2 L146.7,0.0 L151.9,1.8 L151.4,4.1 L148.7,6.3 L151.1,6.5 L150.6,12.9 L154.7,3.5 L160.6,6.8 L162.7,5.9 L163.6,8.4 L168.2,10.6 L168.4,12.5 L164.0,14.8 L154.4,14.5 L159.7,17.1 L160.3,20.6 L162.8,21.0 L163.8,18.8 L165.0,20.9 L165.4,19.8 L167.9,20.0 L168.2,22.0 L167.4,23.9 L163.3,22.4 L162.8,25.4 L158.3,27.4 L155.6,31.7 Z",
      stamp: "M155.6,31.7 L156.7,21.7 L147.7,15.7 L136.9,21.4 L129.5,38.2 L113.2,36.3 L105.8,27.8 L98.3,31.7 L97.4,41.8 L86.6,38.8 L84.1,47.8 L80.3,45.7 L76.8,48.9 L68.4,73.2 L62.3,75.9 L61.9,88.6 L56.5,99.6 L59.2,107.0 L51.0,108.5 L47.0,114.7 L46.9,143.4 L51.5,149.0 L42.9,186.7 L36.8,173.3 L34.1,184.9 L30.1,183.3 L21.1,198.1 L11.8,199.3 L4.4,190.8 L4.5,184.8 L9.4,185.0 L6.3,183.5 L9.7,176.6 L1.7,182.5 L2.1,176.4 L13.5,161.9 L1.5,175.2 L4.8,159.2 L1.3,160.0 L0.6,153.8 L12.1,152.2 L13.8,155.1 L17.4,151.2 L16.4,147.8 L15.3,151.6 L2.7,152.8 L0.1,141.0 L11.8,141.1 L2.3,140.1 L1.5,136.7 L10.8,132.9 L9.3,129.8 L17.7,130.5 L20.3,127.3 L12.1,127.0 L17.7,122.1 L24.0,126.2 L21.0,121.3 L23.7,114.6 L31.0,114.3 L33.0,117.8 L41.8,111.5 L40.8,108.0 L33.3,116.0 L30.4,111.6 L42.5,93.6 L50.6,89.9 L46.6,87.7 L50.9,76.4 L59.0,73.4 L53.1,74.4 L53.7,68.1 L59.5,60.8 L67.9,59.5 L61.6,58.5 L65.0,53.8 L69.1,57.3 L63.9,50.2 L71.8,43.8 L73.7,49.1 L73.0,42.5 L81.8,40.8 L75.0,39.2 L86.3,24.8 L90.2,27.2 L88.6,24.5 L95.6,19.7 L95.3,25.5 L99.7,17.5 L98.3,26.8 L102.4,24.0 L101.6,18.0 L110.4,19.2 L106.3,13.1 L114.9,11.0 L119.3,17.0 L127.7,1.4 L134.9,3.6 L131.3,14.6 L139.7,2.7 L140.2,10.4 L142.8,8.9 L146.7,0.0 L151.9,1.8 L148.7,6.3 L150.6,12.9 L154.7,3.5 L168.2,10.6 L164.0,14.8 L154.4,14.5 L168.2,22.0 L163.3,22.4 L155.6,31.7 Z"
    },
    name: { zh: "挪威", en: "Norway" },
    sub: { zh: "山海之间，收集温柔与壮阔的记忆",
           en: "Between mountains and sea, collecting the gentle and the vast" },
    intro: {
      zh: "从罗弗敦群岛的渔村到默斯肯岛外的漩涡，\n从清晨的海雾到午夜的阳光，\n每一段路都是风景，每一次停留都是故事。",
      en: "From Lofoten’s fishing villages to the maelstrom off Mosken,\nfrom morning sea fog to the midnight sun—\nevery mile is scenery; every stop, a story."
    },
    cover:    { src: "../assets/travel/norway/norway-01", ar: "2000/1500", cap: "Reine, Lofoten ♡" },
    polaroid: { src: "../assets/travel/norway/norway-06", ar: "1523/2000", cap: "Hamnøy" },
    momentsLabel: "Moments in Norway ♡",
    strip: [
      { src: "../assets/travel/norway/norway-03", ar: "2000/1336", cap: { zh: "驶离大陆", en: "Leaving the mainland" } },
      { src: "../assets/travel/norway/norway-07", ar: "2000/1500", cap: { zh: "俯瞰雷讷", en: "Reine from above" } },
      { src: "../assets/travel/norway/norway-05", ar: "2000/1125", cap: { zh: "甲板上的《三体》", en: "Three-Body on deck" } },
      { src: "../assets/travel/norway/norway-02", ar: "2000/1125", cap: { zh: "峡湾边的长椅", en: "A bench by the fjord" } },
      { src: "../assets/travel/norway/norway-04", ar: "2000/1125", cap: { zh: "北极圈木屋中来自成都的火锅", en: "Hotpot from Chengdu" } },
      { src: "../assets/travel/norway/norway-08", ar: "2000/726",  cap: { zh: "孤帆", en: "A lone sail" } }
    ],
    tapeLabel: { zh: "记录 · 收藏 · 回忆", en: "Record · Keep · Remember" },
    diary: {
      label: { zh: "旅行日记", en: "Travel Diary" },
      place: "Lofoten · Moskenes",
      title: { zh: "“赫尔辛根山和莫斯肯岛”", en: "“Helseggen and Mosken”" },
      date:  { zh: "2024 年夏 · 罗弗敦群岛", en: "Summer 2024 · Lofoten, Norway" },
      body: {
        zh: [
          "上高一那年，借着同学的 Kindle，花了一周的晚自习偷偷看完了《三体》。那段时间，晚自习下课的我总喜欢走到操场的看台上发呆，看着天上若有若无的星星，幻想着程心如何在世界尽头的赫尔辛根山和莫斯肯岛上，找到了云天明留给人类的秘密。",
          "多年以后",
          "当渡轮驶向北极圈内的罗弗敦群岛，我坐在甲板上吹着凛冽的风，又一次翻开了《三体》。当冻红的指尖抚过熟悉的名字时，我抬起头——甲板旁的浪正拍打着书中的幻影。",
          "我看见渡轮正慢慢驶过那曾经有些遥不可及的赫尔辛根山和莫斯肯岛。"
        ],
        en: [
          "In my first year of high school, I borrowed a classmate’s Kindle and secretly read The Three-Body Problem over a week of evening study halls. In those days, after class, I liked to sit up in the bleachers and drift—looking at the faint stars, imagining Cheng Xin at the end of the world, on Mount Helseggen above the isle of Mosken, finding the secret Yun Tianming had left for humanity.",
          "Years later",
          "As the ferry sailed for the Lofoten Islands, inside the Arctic Circle, I sat on deck in the biting wind and opened The Three-Body Problem once more. When my cold-reddened fingertips brushed those familiar names, I looked up—the waves beside the deck were beating against the phantoms of the book.",
          "And I watched the ferry slowly pass the Helseggen and the Mosken that had once seemed impossibly far away."
        ]
      },
      quote: "The sea connects us\nto places,\nand to ourselves."
    }
  }
  ,
  iceland: {
    geo: {
      vb: "-8 -8 216 152",
      dot: { x: 100.1, y: 133.6 },
      silT: "translate(62,63) rotate(-8) scale(.33) translate(-100,-67)",
      stampTop: "ICELAND", stampBottom: "ROUTE 1",
      note: "M163.6,12.8 L169.1,11.5 L176.2,6.2 L181.0,6.2 L175.2,10.4 L171.4,18.2 L179.1,21.8 L179.3,27.1 L176.7,32.8 L184.7,31.8 L186.0,36.2 L183.2,40.9 L188.8,38.0 L193.1,39.1 L195.8,42.7 L197.9,42.0 L198.9,43.3 L198.0,48.5 L195.4,50.4 L198.4,53.8 L196.4,57.4 L200.0,60.3 L199.2,64.1 L194.5,66.0 L194.6,71.6 L191.1,76.7 L189.4,77.9 L184.8,76.6 L185.0,79.5 L183.3,81.3 L183.9,85.5 L180.4,90.8 L173.2,95.9 L168.9,95.9 L158.3,101.1 L143.5,114.5 L122.0,121.0 L119.6,128.6 L117.1,130.3 L114.0,128.9 L114.5,131.3 L113.1,132.1 L106.6,134.2 L95.7,132.7 L86.0,128.6 L78.3,127.8 L72.9,122.1 L73.4,119.5 L75.3,118.8 L74.4,117.0 L70.1,120.0 L68.6,117.6 L65.9,117.1 L61.2,113.5 L61.9,111.5 L60.9,111.1 L55.4,114.8 L33.4,116.1 L31.7,107.8 L32.5,105.1 L36.0,109.0 L41.9,107.0 L47.8,100.9 L51.4,93.7 L55.2,92.4 L51.8,91.5 L44.4,95.2 L47.2,91.8 L45.3,90.9 L46.3,86.5 L52.8,81.7 L51.3,80.8 L43.4,85.7 L39.4,81.8 L40.8,77.4 L36.8,74.5 L20.7,73.2 L12.0,76.9 L8.2,71.5 L10.1,69.3 L20.6,67.7 L23.4,65.6 L25.0,67.1 L30.9,63.6 L34.4,64.5 L47.3,63.5 L49.4,57.6 L44.6,60.3 L38.0,58.8 L36.0,57.2 L36.7,55.9 L48.1,47.5 L45.2,44.4 L39.6,45.0 L38.2,42.6 L33.6,41.2 L30.5,42.1 L28.8,40.7 L10.5,48.1 L0.0,43.1 L4.2,39.2 L11.3,42.5 L8.5,39.1 L7.0,32.2 L10.4,32.7 L15.7,36.4 L21.8,33.4 L14.1,32.0 L11.8,29.1 L13.5,27.6 L17.4,27.8 L12.8,21.9 L13.5,19.6 L19.1,21.6 L16.1,17.9 L18.7,14.8 L25.9,18.9 L26.7,23.4 L30.4,23.3 L32.1,21.0 L33.3,21.5 L34.1,28.3 L37.3,26.6 L37.2,19.6 L28.0,13.5 L29.6,11.8 L36.5,11.2 L32.8,8.1 L24.9,8.1 L29.1,3.7 L37.5,4.1 L56.2,21.5 L54.2,24.0 L58.0,27.1 L56.8,33.7 L55.3,35.6 L51.6,34.5 L55.1,38.3 L55.3,40.5 L57.0,40.8 L55.7,45.3 L59.4,47.6 L61.3,54.2 L64.8,41.3 L67.2,38.3 L69.5,37.1 L71.9,40.7 L73.6,41.1 L75.4,34.7 L75.4,21.2 L78.2,18.3 L81.5,20.5 L88.4,31.2 L91.3,32.6 L93.3,19.4 L103.1,14.7 L113.5,27.6 L116.0,34.1 L116.8,29.9 L112.8,18.6 L113.2,15.9 L120.3,16.5 L126.8,24.2 L134.1,13.9 L139.9,17.2 L146.4,14.2 L147.4,10.7 L145.3,3.4 L150.7,0.1 L155.5,0.5 L160.5,7.2 L160.7,10.3 L163.6,12.8 Z",
      stamp: "M163.6,12.8 L181.0,6.2 L171.4,18.2 L179.1,21.8 L176.7,32.8 L184.7,31.8 L183.2,40.9 L188.8,38.0 L198.9,43.3 L195.4,50.4 L199.2,64.1 L194.5,66.0 L191.1,76.7 L184.8,76.6 L180.4,90.8 L158.3,101.1 L143.5,114.5 L122.0,121.0 L119.6,128.6 L113.1,132.1 L106.6,134.2 L78.3,127.8 L72.9,122.1 L74.4,117.0 L70.1,120.0 L60.9,111.1 L55.4,114.8 L33.4,116.1 L32.5,105.1 L36.0,109.0 L41.9,107.0 L55.2,92.4 L44.4,95.2 L46.3,86.5 L52.8,81.7 L43.4,85.7 L36.8,74.5 L20.7,73.2 L12.0,76.9 L8.2,71.5 L30.9,63.6 L47.3,63.5 L49.4,57.6 L38.0,58.8 L36.7,55.9 L48.1,47.5 L45.2,44.4 L28.8,40.7 L10.5,48.1 L0.0,43.1 L4.2,39.2 L11.3,42.5 L7.0,32.2 L15.7,36.4 L21.8,33.4 L11.8,29.1 L17.4,27.8 L12.8,21.9 L19.1,21.6 L16.1,17.9 L18.7,14.8 L26.7,23.4 L33.3,21.5 L34.1,28.3 L37.3,26.6 L37.2,19.6 L28.0,13.5 L36.5,11.2 L24.9,8.1 L29.1,3.7 L37.5,4.1 L56.2,21.5 L56.8,33.7 L51.6,34.5 L61.3,54.2 L67.2,38.3 L73.6,41.1 L78.2,18.3 L91.3,32.6 L93.3,19.4 L103.1,14.7 L116.0,34.1 L113.2,15.9 L120.3,16.5 L126.8,24.2 L134.1,13.9 L139.9,17.2 L146.4,14.2 L145.3,3.4 L150.7,0.1 L155.5,0.5 L163.6,12.8 Z"
    },
    name: { zh: "冰岛", en: "Iceland" },
    sub: { zh: "在冰岛，寻找属于我的 25 号底片",
           en: "Looking for my own Negative No.25" },
    intro: {
      zh: "从雷克雅未克出发，沿一号公路顺时针，\n冰川与黑沙滩之间，午夜的太阳一直没有落下。\n这一次，白日梦想家决定亲自出发。",
      en: "Clockwise on Route 1 out of Reykjavík,\nbetween glaciers and black sand, under a sun that never set.\nThis time, the daydreamer went himself."
    },
    cover:    { src: "../assets/travel/iceland/iceland-02", ar: "2000/1125", cap: "Reynisfjara, Vík ♡" },
    polaroid: { src: "../assets/travel/iceland/iceland-05", ar: "2000/1334", cap: "Snæfellsnes" },
    momentsLabel: "Moments in Iceland ♡",
    strip: [
      { src: "../assets/travel/iceland/iceland-06", ar: "2000/1334", cap: { zh: "追着不落的太阳", en: "Chasing the midnight sun" } },
      { src: "../assets/travel/iceland/iceland-01", ar: "2000/1334", cap: { zh: "杰古沙龙冰河湖", en: "Jökulsárlón" } },
      { src: "../assets/travel/iceland/iceland-08", ar: "2000/1334", cap: { zh: "冰川的舌尖", en: "The glacier’s tongue" } },
      { src: "../assets/travel/iceland/iceland-03", ar: "2000/1336", cap: { zh: "黑沙滩上的钻石", en: "Diamonds on black sand" } },
      { src: "../assets/travel/iceland/iceland-04", ar: "2000/1269", cap: { zh: "斯奈菲尔的雪", en: "Snæfellsjökull" } },
      { src: "../assets/travel/iceland/iceland-07", ar: "2000/1334", cap: { zh: "迪霍拉里的晚霞", en: "Dyrhólaey at dusk" } }
    ],
    tapeLabel: { zh: "出发 · 抵达 · 醒着做梦", en: "Depart · Arrive · Dream awake" },
    diary: {
      label: { zh: "旅行日记", en: "Travel Diary" },
      place: "Snæfellsnes · Vík",
      title: { zh: "“寻找 25 号底片”", en: "“Negative No.25”" },
      date:  { zh: "盛夏 · 环岛一号公路", en: "High summer · Ring Road, Iceland" },
      body: {
        zh: [
          "《白日梦想家》里，沃特在杂志社洗了十六年底片，也做了十六年白日梦。直到 25 号底片失踪，他才第一次真正出发，一路跌进冰岛的公路与海。肖恩说，那张底片是“生命的精髓”。",
          "所以我也来了",
          "沿一号公路顺时针：冰川舌从山谷垂进湖里，黑沙滩的浪比电影里更响，午夜的太阳迟迟不落，把每座山都描上金边。我背着相机沿教堂前的小路往上走，风大得像要把白日梦吹醒。",
          "走到最后我大概明白了 25 号底片的谜底：它洗出来的不是风景，是那个放下犹豫、正在专注生活的人。在冰岛，我找到了属于我的那一张。"
        ],
        en: [
          "In The Secret Life of Walter Mitty, Walter develops negatives at LIFE for sixteen years, and daydreams for sixteen years too. Only when Negative 25 goes missing does he truly set out, tumbling into Iceland’s roads and seas. Sean called that frame the quintessence of life.",
          "So I came too",
          "Clockwise along Route 1: glacier tongues spilling into lagoons, waves on the black sand louder than in the film, a midnight sun that would not set, tracing every ridge in gold. I walked the little road up to the church with my camera, the wind loud enough to blow a daydream awake.",
          "By the end I think I understood Negative 25: what it develops is not a landscape, but the person who finally stopped hesitating and started living. Somewhere in Iceland, I found mine."
        ]
      },
      quote: "To see the world,\nto draw closer,\nto find each other and to feel."
    }
  }
  ,
  /* 杭州：城市页不画国界，用三潭印月石塔（邮戳）与那道彩虹（便签）作徽记 */
  hangzhou: {
    geo: {
      emblem: "hangzhou",
      vb: "4 6 184 126",
      stampTop: "HANGZHOU", stampBottom: "WEST LAKE"
    },
    name: { zh: "杭州", en: "Hangzhou" },
    sub: { zh: "两个月的夏天，像一道昙花一现的彩虹",
           en: "One summer, brief and bright as a rainbow" },
    intro: {
      zh: "从西湖边的孤单，到文一西路的夏夜，\n从把服务器弄崩，到模型成功上线，\n两个月，一道彩虹的长度。",
      en: "From lonely afternoons by West Lake to summer nights on Wenyi West Road,\nfrom crashing the server to shipping the model,\ntwo months, about the length of a rainbow."
    },
    cover:    { src: "../assets/travel/hangzhou/hangzhou-01", ar: "1080/1440", cap: "That rainbow ♡" },
    polaroid: { src: "../assets/travel/hangzhou/hangzhou-02", ar: "1619/1080", cap: "The last night" },
    momentsLabel: "That Summer in Hangzhou ♡",
    strip: [
      { src: "../assets/travel/hangzhou/hangzhou-05", ar: "1620/1080", cap: { zh: "周末的西湖，人来人往", en: "Weekends by West Lake" } },
      { src: "../assets/travel/hangzhou/hangzhou-08", ar: "1620/1080", cap: { zh: "六月的荷", en: "Lotus in June" } },
      { src: "../assets/travel/hangzhou/hangzhou-04", ar: "1619/1080", cap: { zh: "凌晨两点的文一西路", en: "Wenyi West Road, 2 a.m." } },
      { src: "../assets/travel/hangzhou/hangzhou-03", ar: "1440/1080", cap: { zh: "外滩，聊到凌晨四点", en: "The Bund, until four" } },
      { src: "../assets/travel/hangzhou/hangzhou-06", ar: "1422/1080", cap: { zh: "夏夜的火烧云", en: "Summer sky on fire" } },
      { src: "../assets/travel/hangzhou/hangzhou-07", ar: "1440/1080", cap: { zh: "散场时的晚霞", en: "Afterglow" } },
      { src: "../assets/travel/hangzhou/hangzhou-09", ar: "1131/1131", cap: { zh: "最后一天，清空这台电脑", en: "Last day, wiping the machine" } }
    ],
    tapeLabel: { zh: "迷茫 · 适应 · 怀念", en: "Lost · Settled · Missed" },
    diary: {
      label: { zh: "夏日记事", en: "Summer Notes" },
      place: "Hangzhou · West Lake",
      title: { zh: "“那道彩虹”", en: "“That Rainbow”" },
      date:  { zh: "盛夏 · 杭州", en: "High summer · Hangzhou" },
      body: {
        zh: [
          "离开杭州的最后一天，走在出租小屋门口的路上，不经意回头看见日落时分的天边挂着一道彩虹。散步回家，收拾完行李已经是凌晨两点。",
          "在杭州的两个月时光就像今晚的彩虹一样，点点滴滴拼凑出我略带迷茫的生活中的昙花一现。",
          "记得最开始时的迷茫，每天不知所措的在人海中徘徊，周末自己坐二十公里的地铁去西湖看着人来人往，感慨着自己的孤单和寂寞。",
          "到后来，逐渐适应了一个人在异地的生活，交到了新朋友，工作上也渐渐适应。从最开始把服务器弄崩，到自己准备数据，迁移代码，调参，训练出了喜欢的模型，并成功上线。",
          "我记得凌晨 35 度的夜和朋友骑二十公里的自行车回家，下车时腿已经没有知觉，衣服湿到可以拧出水。",
          "我记得在上海的三生石聚会，我们看着外滩的风景听着吉他和鼓声畅谈到凌晨四点。",
          "我记得淮海路的梧桐树，蝉鸣，以及夜晚的徐家汇的天主教堂。",
          "我记得开着车行驶在凌晨两点的文一西路，听着 Joji 的歌，夏夜的风呼呼地吹在脸上。",
          "我也记得最后一天的晚上，收拾完行李看着窗外的城市，感叹着自己即将离开这片刚刚熟悉的生活。",
          "不知道未来的我是否会再次想起今天傍晚的彩虹，在另一个深夜，又一次感慨，并怀念这个夏天。"
        ],
        en: [
          "On my last day in Hangzhou, walking up the lane outside my rented room, I happened to look back and found a rainbow hanging in the sunset. I strolled home; by the time the packing was done it was two in the morning.",
          "Those two months in Hangzhou were like that rainbow: a brief, bright thing pieced together from small moments, in a stretch of life I was still unsure about.",
          "At the start there was only confusion, drifting through crowds without knowing what to do, riding the metro twenty kilometres alone on weekends just to sit by West Lake and watch people come and go, feeling how alone I was.",
          "Later I settled into living by myself in a strange city, made new friends, found my footing at work. It began with me crashing the server, and ended with me preparing the data, porting the code, tuning the parameters, training a model I actually liked, and shipping it.",
          "I remember riding twenty kilometres home with a friend on a 35°C night, my legs numb when I got off the bike, my shirt wet enough to wring out.",
          "I remember the gathering at Sansheng Stone in Shanghai, the Bund in front of us, a guitar and a drum behind us, talking until four in the morning.",
          "I remember the plane trees on Huaihai Road, the cicadas, and the cathedral in Xujiahui at night.",
          "I remember driving down Wenyi West Road at two in the morning, Joji playing, the summer wind roaring against my face.",
          "I also remember that last night, the packing done, looking out at the city and knowing I was about to leave a life I had only just grown into.",
          "I wonder whether some future version of me will think of this evening's rainbow again, on another late night, and miss this summer all over again."
        ]
      },
      quote: "Some summers pass\nonly once,\nlike a rainbow."
    }
  }
  ,
  /* 卫斯理安：从大一深秋到毕业前两周（徽记＝South College 钟楼 + 便利贴墙） */
  middletown: {
    geo: {
      emblem: "wesleyan",
      vb: "2 2 196 104",
      stampTop: "WESLEYAN", stampBottom: "MIDDLETOWN"
    },
    name: { zh: "卫斯理安", en: "Wesleyan" },
    region: "Middletown, Connecticut",
    sub: { zh: "曾经觉得无聊的小村子，如今竟有些不舍",
           en: "The town I once found dull, now hard to leave" },
    intro: {
      zh: "大一的深秋，在天文台的红光里看见一颗流星；\n毕业的春天，写完 90 页论文的最后一页。\n四年，异乡的小村慢慢变成另一个故乡。",
      en: "A freshman fall: a shooting star, seen from the observatory's red light.\nA senior spring: the last page of a ninety-page thesis.\nFour years, and a town far from home slowly became home."
    },
    cover:    { src: "../assets/travel/wesleyan/wesleyan-02", ar: "1920/1080", cap: "Champagne on the lawn ♡" },
    polaroid: { src: "../assets/travel/wesleyan/wesleyan-v2-06", ar: "1080/1620", cap: "Observatory night" },
    momentsLabel: "Four Years in Middletown ♡",
    strip: [
      { src: "../assets/travel/wesleyan/wesleyan-v2-01", ar: "1620/1080", cap: { zh: "秋阳穿进宿舍的窗户", en: "Autumn sun through the dorm window" } },
      { src: "../assets/travel/wesleyan/wesleyan-v2-02", ar: "1620/1080", cap: { zh: "球场对面的小教堂", en: "The chapel across the field" } },
      { src: "../assets/travel/wesleyan/wesleyan-v2-03", ar: "1620/1080", cap: { zh: "十一月的日落", en: "A November sunset" } },
      { src: "../assets/travel/wesleyan/wesleyan-v2-04", ar: "1440/1080", cap: { zh: "红光里的望远镜", en: "The telescope in red light" } },
      { src: "../assets/travel/wesleyan/wesleyan-v2-05", ar: "1620/1080", cap: { zh: "星空下的校园", en: "Campus under the stars" } },
      { src: "../assets/travel/wesleyan/wesleyan-04", ar: "1080/1440", cap: { zh: "Boger Hall 前的春天", en: "Spring outside Boger Hall" } },
      { src: "../assets/travel/wesleyan/wesleyan-01", ar: "1440/1080", cap: { zh: "写完 90 页的那个春天", en: "The spring of ninety pages" } },
      { src: "../assets/travel/wesleyan/wesleyan-06", ar: "1346/1080", cap: { zh: "最后一节课", en: "The last class" } },
      { src: "../assets/travel/wesleyan/wesleyan-03", ar: "1440/1080", cap: { zh: "第一次也是最后一次 bar night", en: "First and last bar night" } },
      { src: "../assets/travel/wesleyan/wesleyan-08", ar: "1439/1080", cap: { zh: "朋友们的毕业礼物", en: "Gifts from friends" } }
    ],
    tapeLabel: { zh: "初见 · 星空 · 告别", en: "Arrive · Stargaze · Goodbye" },
    diary: {
      label: { zh: "小村四年", en: "Four Years in Town" },
      place: "Middletown · Wesleyan",
      title: { zh: "“异乡的小村”", en: "“A Small Town Far From Home”" },
      date:  { zh: "2021 秋 — 2025 春 · 米德尔敦", en: "Fall 2021 — Spring 2025 · Middletown, CT" },
      body: {
        zh: [
          "2021 年 11 月，大一的第一个深秋。秋日的阳光温暖地穿进宿舍的窗户，玻璃外的树叶黄得正好。那时我刚到这个小村两个多月，还常常觉得它安静得有些无聊。",
          "十一月初的一个晚上，我走过球场边的坡道去天文台看星星。圆顶裂开一道缝，红色的灯光里，望远镜正指向夜空。我透过镜筒看到了一颗流星——虽然没有来得及许愿，但想起蓝天、暖阳、即将到来的冬雪，和在这里遇到的超级好的朋友们，忽然觉得没什么好遗憾的。",
          "回宿舍的路上，星星安静地传递着百万年前的光。我渐渐开始期待起未来的日子了，即使那会是赶不完的 due 和掉不停的头发。",
          "一晃，四年过去",
          "离毕业只剩最后两周。那个曾经觉得无聊的小村子，如今竟也开始让我有些不舍。",
          "写完了 90 页的毕业论文，在熟悉的教室里上完了最后一节课，第一次、也是最后一次走进 bar night 的人群，也在春风里看见了短暂却灿烂的花开。",
          "high rise 前的花开了又谢，书桌墙上的便利贴贴满了整个春天，olin 门口草坪上飞舞着的香槟。",
          "曾以为这一切只是一段旅程。只有在快要分别时，才发现这个异乡的小村，早已成了我的另一个故乡。"
        ],
        en: [
          "November 2021, the first deep autumn of freshman year. The fall sun came warm through my dorm window, and the leaves outside the glass were exactly the right shade of gold. I had been in this little town for barely two months, and I still found it quiet to the point of boring.",
          "One night in early November, I walked up past the playing field to the observatory. The dome stood open a crack; in the red light inside, the telescope was pointing at the night sky. Through the eyepiece I caught a shooting star—no time to make a wish, but I thought of the blue skies, the warm sun, the winter snow on its way, and the ridiculously good friends I had met here, and suddenly there seemed to be nothing to regret.",
          "On the way back to the dorm, the stars went on quietly delivering light from a million years ago. Little by little, I began to look forward to the days ahead—even if they would be deadlines I could never finish and hair that would not stop falling.",
          "Four years passed, just like that",
          "Two weeks left before graduation. The little town I used to find so boring has, somehow, become hard to leave.",
          "I finished the ninety-page thesis. I sat through the last class in a room I knew by heart. I walked into the crowd at bar night for the first time, and the last. And in the spring wind I watched the blossoms open, brief and bright.",
          "The flowers in front of High Rise bloomed and fell. The sticky notes on my desk wall filled up the whole spring. Champagne flew over the lawn outside Olin.",
          "I used to think all of this was just a passage I was passing through. Only when it came time to leave did I realise this small town, so far from home, had quietly become another home."
        ]
      },
      quote: "Brief and bright,\nlike blossoms\nin a spring wind."
    }
  }
  ,
  /* 釜山：부산의 여름（徽记＝防波堤灯塔 + 海岸线上的天空胶囊） */
  busan: {
    geo: {
      emblem: "busan",
      vb: "0 6 190 116",
      stampTop: "BUSAN", stampBottom: "HAEUNDAE"
    },
    name: { zh: "釜山", en: "Busan" },
    sub: { zh: "부산의 여름 · 釜山的夏天",
           en: "부산의 여름 · A summer in Busan" },
    intro: {
      zh: "海云台的浪，青沙浦的红绿灯，\n沿着海岸线慢慢开的黄色小车厢，\n还有一整个夏天的蓝。",
      en: "Waves at Haeundae, a traffic light by the sea,\na little yellow car running slowly along the coast,\nand a whole summer of blue."
    },
    cover:    { src: "../assets/travel/busan/busan-07", ar: "1619/1080", cap: "Sky Capsule, No.66 ♡" },
    polaroid: { src: "../assets/travel/busan/busan-05", ar: "1619/1080", cap: "Window seat" },
    momentsLabel: "A Summer in Busan ♡",
    strip: [
      { src: "../assets/travel/busan/busan-09", ar: "1619/1080", cap: { zh: "松亭海水浴场", en: "Songjeong Beach" } },
      { src: "../assets/travel/busan/busan-01", ar: "1619/1080", cap: { zh: "栏杆边的蒲苇", en: "Pampas by the rail" } },
      { src: "../assets/travel/busan/busan-04", ar: "1619/1080", cap: { zh: "海就在马路尽头", en: "The sea at the end of the road" } },
      { src: "../assets/travel/busan/busan-03", ar: "1920/1080", cap: { zh: "渔港的午后", en: "Afternoon at the harbour" } },
      { src: "../assets/travel/busan/busan-06", ar: "1619/1080", cap: { zh: "白色的灯塔", en: "The white lighthouse" } },
      { src: "../assets/travel/busan/busan-08", ar: "1619/1080", cap: { zh: "黄昏的海上步道", en: "Skywalk at dusk" } },
      { src: "../assets/travel/busan/busan-02", ar: "1920/1080", cap: { zh: "一红一白的守夜人", en: "Two lights, keeping watch" } }
    ],
    tapeLabel: { zh: "海 · 风 · 夏天", en: "Sea · Wind · Summer" },
    diary: {
      label: { zh: "海边手记", en: "Seaside Notes" },
      place: "부산 · Haeundae",
      title: { zh: "“부산의 여름”", en: "“Busan, in Summer”" },
      date:  { zh: "盛夏 · 釜山", en: "High summer · Busan" },
      body: {
        zh: [
          "从海云台出发，沿着海岸线一直往东。列车开得很慢，慢到可以看清每一朵浪花碎在礁石上的样子。",
          "釜山的夏天是蓝的",
          "蒲苇沿着栏杆一整排地倒向同一个方向。风从海上来，把所有东西都吹成了同一个姿势。",
          "青沙浦的红绿灯下，人们举着相机等一列驶过的黄色小车厢。海就在马路的尽头，蓝得有点不真实。",
          "傍晚的港口安静下来，渔船靠在岸边，灯塔一红一白，像两个不说话的守夜人。",
          "回程的车厢里，夕阳正落在海平线上。有人拍照，有人打盹，我把窗户推开一点，让风灌进来。",
          "夏天大概就该是这样：慢慢地走，看海，然后被风吹一路。"
        ],
        en: [
          "We set out from Haeundae and followed the coast east. The train ran slowly, slowly enough to watch each wave break apart on the rocks.",
          "Summer here is blue",
          "Pampas grass leaned along the railing, all of it bent the same way. The wind came off the sea and pressed everything into a single posture.",
          "At the crossing in Cheongsapo, people waited with cameras for a small yellow car to pass. The sea sat at the end of the road, a blue that looked slightly unreal.",
          "In the evening the harbour went quiet, the fishing boats tied up along the pier, one lighthouse red and one white, like two watchmen who never speak.",
          "On the ride back the sun was setting right on the horizon. Someone was taking photos, someone was dozing off. I pushed the window open a little and let the wind in.",
          "Maybe this is what summer is for: going slowly, watching the sea, and being blown along by the wind the whole way."
        ]
      },
      quote: "The sea was blue,\nthe train was slow,\nand the summer was long."
    }
  }
  ,
  /* 重庆：山城夜与烟火气（徽记＝洪崖洞吊脚楼层叠 + 街边摊与坡道台阶） */
  chongqing: {
    geo: {
      emblem: "chongqing",
      vb: "0 14 190 98",
      stampTop: "CHONGQING", stampBottom: "HONGYA CAVE"
    },
    name: { zh: "重庆", en: "Chongqing" },
    sub: { zh: "霓虹尽头，是记忆深处的童年",
           en: "At the end of the neon, a childhood remembered" },
    intro: {
      zh: "洪崖洞的灯一层层亮起，\n解放碑的霓虹连成一条河，\n而巷子深处的烟火气，通向童年。",
      en: "Hongya Cave lighting up floor by floor,\nJiefangbei's neon running like a river,\nand down the alleys, the smoke of daily life leading back to childhood."
    },
    cover:    { src: "../assets/travel/chongqing/chongqing-07", ar: "1619/1080", cap: "Hongya Cave ♡" },
    polaroid: { src: "../assets/travel/chongqing/chongqing-08", ar: "1080/1619", cap: "The masked lead" },
    momentsLabel: "Neon Nights in Chongqing ♡",
    strip: [
      { src: "../assets/travel/chongqing/chongqing-02", ar: "1625/1080", cap: { zh: "千厮门大桥下的洪崖洞", en: "Hongya, under the bridge" } },
      { src: "../assets/travel/chongqing/chongqing-04", ar: "1644/1080", cap: { zh: "新楼脚下的老屋檐", en: "Old roofs, new towers" } },
      { src: "../assets/travel/chongqing/chongqing-01", ar: "1619/1080", cap: { zh: "看夜景的人", en: "Watching the skyline" } },
      { src: "../assets/travel/chongqing/chongqing-06", ar: "1619/1080", cap: { zh: "得意世界门口的出租车", en: "Taxis under the neon" } },
      { src: "../assets/travel/chongqing/chongqing-03", ar: "1080/1696", cap: { zh: "限速三十的坡道", en: "A hill road, capped at 30" } },
      { src: "../assets/travel/chongqing/chongqing-05", ar: "1080/1267", cap: { zh: "深夜的二号线出口", en: "Line 2, after midnight" } },
      { src: "../assets/travel/chongqing/chongqing-09", ar: "1639/1080", cap: { zh: "洪崖洞下的人潮", en: "The crowd below Hongya" } }
    ],
    tapeLabel: { zh: "霓虹 · 烟火 · 童年", en: "Neon · Smoke · Childhood" },
    diary: {
      label: { zh: "山城夜记", en: "Mountain City Nights" },
      place: "Chongqing · Jiefangbei",
      title: { zh: "“霓虹与烟火”", en: "“Neon and Smoke”" },
      date:  { zh: "冬夜 · 山城重庆", en: "Winter nights · Chongqing" },
      body: {
        zh: [
          "到重庆的第一晚，我站在江对岸，看洪崖洞把灯一层一层点亮。十一层吊脚楼金灿灿地叠上去，千厮门大桥横在它前面，游船拖着一身光，慢慢驶过嘉陵江。",
          "我们带了一副会发光的面具——谁戴上，谁就是那晚照片的主角。解放碑的霓虹一路亮过去，得意世界的招牌换着颜色，黄色的出租车在街口排成一列。我举着相机，快门声很快被人声淹没。",
          "深夜的二号线出口还亮着灯。我们从台阶爬上来，上坡，下坡，坡顶立着限速三十的牌子。路边的摊子冒着热气，摊主的川话，和我小时候听到的一模一样。",
          "突然在充满烟火气的街道里",
          "找回了记忆深处的童年",
          "我记得放学路上的小面摊，矮矮的塑料凳，红油的香气隔着半条街就闻得到。",
          "我记得夏天傍晚的街沿，竹椅、蒲扇、冒着白气的蒸笼，大人们摆龙门阵，一直摆到路灯亮起来。",
          "内江就在隔壁。二十年过去，我在另一座城市的街头闻到了同一种烟火气。原来它从来没有熄过——只是换了一条街，继续亮着。"
        ],
        en: [
          "On our first night in Chongqing I stood across the river and watched Hongya Cave light up floor by floor—eleven storeys of stilt houses stacked in gold, Qiansimen Bridge stretched out in front, a cruise boat trailing its lights slowly up the Jialing.",
          "We had brought a light-up mask with us—whoever wore it became the lead of that night's photos. The neon of Jiefangbei ran on and on, the signboards changing colours, yellow taxis lined up at the corner. I held the camera; the shutter was soon drowned out by the crowd.",
          "Past midnight, the Line 2 exit was still lit. We climbed the steps—uphill, downhill, a speed-limit sign that said 30 at the top of the slope. The street stalls were steaming, and the vendors' Sichuan dialect sounded exactly like the one I grew up hearing.",
          "Then suddenly, in a street full of the smoke and warmth of everyday life,",
          "I found my childhood.",
          "I remember the noodle stall on the way home from school, the low plastic stools, the smell of chilli oil you could catch from half a street away.",
          "I remember summer evenings on the kerb—bamboo chairs, cattail fans, steamers puffing white—the grown-ups trading stories until the street lamps came on.",
          "Neijiang is just next door. Twenty years on, in another city's streets, I caught the same warm smoke of life. It had never gone out—it had only moved to a different street, and kept on glowing."
        ]
      },
      quote: "Neon for the eyes,\nsmoke for the heart,\nand a street that leads home."
    }
  }
  ,
  /* 香港：影展十一天（徽记＝双层叮叮车 + 便签上的一格胶片） */
  hongkong: {
    geo: {
      emblem: "hongkong",
      vb: "0 8 190 104",
      stampTop: "HONG KONG", stampBottom: "FILMART"
    },
    name: { zh: "香港", en: "Hong Kong" },
    sub: { zh: "十一天，仿佛穿越了整个香港电影历史",
           en: "Eleven days through the whole history of Hong Kong cinema" },
    intro: {
      zh: "从邵氏的摄影棚到银河映像的酒杯，\n从叮叮车的上层到影展的小桌子，\n十一天，像一场不愿散场的电影。",
      en: "From a soundstage at Shaw Studios to a raised glass at Milkyway,\nfrom the top deck of a tram to a small table at FILMART—\neleven days, like a film I didn’t want to end."
    },
    cover:    { src: "../assets/travel/hongkong/hongkong-01", ar: "1617/1080", cap: "FILMART ♡" },
    polaroid: { src: "../assets/travel/hongkong/hongkong-02", ar: "1617/1080", cap: "Badge, 20/3" },
    momentsLabel: "Eleven Days in Hong Kong ♡",
    strip: [
      { src: "../assets/travel/hongkong/hongkong-04", ar: "1080/1440", cap: { zh: "邵氏影城的二号摄影棚", en: "Stage 2, Shaw Studios" } },
      { src: "../assets/travel/hongkong/hongkong-03", ar: "1617/1080", cap: { zh: "《破地狱》导演对谈", en: "The Last Dance director talk" } },
      { src: "../assets/travel/hongkong/hongkong-07", ar: "1617/1080", cap: { zh: "参观 MM2", en: "Visiting mm2" } },
      { src: "../assets/travel/hongkong/hongkong-05", ar: "1617/1080", cap: { zh: "开往坚尼地城的叮叮车", en: "The ding ding to Kennedy Town" } },
      { src: "../assets/travel/hongkong/hongkong-06", ar: "1440/1080", cap: { zh: "雨天的叮叮车上层", en: "Upper deck, in the rain" } },
      { src: "../assets/travel/hongkong/hongkong-08", ar: "810/1080",  cap: { zh: "兰芳园的冻奶茶", en: "Milk tea, Lan Fong Yuen" } },
      { src: "../assets/travel/hongkong/hongkong-09", ar: "1617/1080", cap: { zh: "夜晚的富东饭店", en: "Fu Tung, after dark" } }
    ],
    tapeLabel: { zh: "电影 · 雨 · 梦", en: "Cinema · Rain · Dreams" },
    diary: {
      label: { zh: "影展手记", en: "Festival Notes" },
      place: "Hong Kong · Wan Chai",
      title: { zh: "“一帧美好的瞬间”", en: "“One Beautiful Frame”" },
      date:  { zh: "三月 · 香港", en: "March · Hong Kong" },
      body: {
        zh: [
          "三月的香港总在下雨。我坐在叮叮车的上层，隔着起雾的车窗，看街上的伞在黄色斑马线上开开合合。",
          "从邵氏电影制片厂到银河映像，再到 GoldenScene、MM2 以及香港国际影展，我在这短短的十一天里，仿佛穿越了整个香港电影历史。",
          "在邵氏影城，我在二号摄影棚的橘色大字底下站了很久；在 MM2 的走廊里，把墙上签了名的海报一张张认过去。手里兰芳园的冻奶茶，还剩半杯。",
          "我记得和《但愿人长久》《年少日记》《浊水漂流》《白日之下》的导演们挤在一个小桌子上，交流着作为新人导演，他们如何在迷茫中坚持初心，讲出属于自己的故事。",
          "记得受邀参加银河映像组织的聚会，和杜琪峰搂着肩喝酒，笑着喊出 “to dreams”，结果最后被朋友扶着回家。",
          "记得与韩国的导演和演员们交流时，语言不通，却靠着手势和眼神比划出热烈的电影情怀，欢笑声此起彼伏。",
          "还有在电影展上，不同的制片人和发行方听了我的故事后，温和又调侃地建议我先学计算机。",
          "我笑着说好。",
          "回想起来，这段经历就像偶然捕捉到的一帧美好的瞬间。相信很多年后回想起，也会笑着怀念着香港留给我的这份独特的回忆。"
        ],
        en: [
          "It rained and rained in Hong Kong that March. I sat on the upper deck of a ding ding tram, watching through a fogged window as umbrellas opened and closed over the yellow crossings.",
          "From the Shaw Brothers studio to Milkyway Image, then Golden Scene, mm2 and the Hong Kong FILMART—in those short eleven days, I seemed to travel through the entire history of Hong Kong cinema.",
          "At Shaw Studios I stood a long while under the big orange letters of Stage 2. In the corridor at mm2 I went down the wall of signed posters, naming them one by one. The iced milk tea from Lan Fong Yuen in my hand was still half full.",
          "I remember squeezing around one small table with the directors of Fly Me to the Moon, Time Still Turns the Pages, Drifting and In Broad Daylight, talking about how, as new directors, they held on to what they first believed through all the uncertainty, and told the stories that were theirs to tell.",
          "I remember being invited to a gathering thrown by Milkyway Image, drinking with an arm around Johnnie To’s shoulder, laughing and shouting “to dreams”—and, at the end of the night, being helped home by friends.",
          "I remember talking with Korean directors and actors: we shared no language, yet with gestures and eye contact we traced out a burning love of film, and the laughter kept rising.",
          "And at the market, producers and distributors who heard my story would suggest, gently and half in jest, that I go study computer science first.",
          "I laughed and agreed.",
          "Looking back, the whole stretch feels like one beautiful frame caught by accident. I am sure that many years from now, I will smile when it comes back to me, and miss this memory that Hong Kong left me—one of a kind."
        ]
      },
      quote: "Eleven days,\none long take,\nto dreams."
    }
  }
  ,
  /* 内江：童年故乡（徽记＝坡上的老屋与梯坎 + 暮色巷子里的灯） */
  neijiang: {
    geo: {
      emblem: "neijiang",
      vb: "0 0 190 104",
      stampTop: "NEIJIANG", stampBottom: "SICHUAN"
    },
    name: { zh: "内江", en: "Neijiang" },
    sub: { zh: "回到长大的地方，一切都小了一号",
           en: "Back where I grew up, everything is one size smaller" },
    intro: {
      zh: "梯坎还是那段梯坎，灯还是那盏灯，\n炒饭的锅气飘过老街的夜，\n只是看什么，都小了一号。",
      en: "The same stone steps, the same lamp under the eaves,\nwok-breath drifting through the old town at night—\nonly everything looks one size smaller."
    },
    cover:    { src: "../assets/travel/neijiang/neijiang-01", ar: "1080/1616", cap: "The steps home ♡" },
    polaroid: { src: "../assets/travel/neijiang/neijiang-02", ar: "1616/1080", cap: "Dusk, one lamp" },
    momentsLabel: "Nights in Neijiang ♡",
    strip: [
      { src: "../assets/travel/neijiang/neijiang-04", ar: "1616/1080", cap: { zh: "梯坎下面就是街", en: "The street below the steps" } },
      { src: "../assets/travel/neijiang/neijiang-03", ar: "1616/1080", cap: { zh: "老街的夜是红的", en: "The old street glows red" } },
      { src: "../assets/travel/neijiang/neijiang-05", ar: "1616/1080", cap: { zh: "巷口的炒饭摊", en: "Fried rice on the corner" } },
      { src: "../assets/travel/neijiang/neijiang-06", ar: "1616/1080", cap: { zh: "馄饨店的晚上", en: "Evening at the wonton shop" } },
      { src: "../assets/travel/neijiang/neijiang-07", ar: "1616/1080", cap: { zh: "卤菜摊的玻璃柜", en: "The braised-food counter" } },
      { src: "../assets/travel/neijiang/neijiang-08", ar: "1616/1080", cap: { zh: "石狮子守着零食摊", en: "Snacks by the stone lions" } },
      { src: "../assets/travel/neijiang/neijiang-09", ar: "1616/1080", cap: { zh: "网咖绿光里的狗", en: "A dog in the green glow" } }
    ],
    tapeLabel: { zh: "梯坎 · 锅气 · 灯", en: "Steps · Wok-breath · Lamplight" },
    diary: {
      label: { zh: "还乡手记", en: "Homecoming Notes" },
      place: "Neijiang · Sichuan",
      title: { zh: "“小了一号的故乡”", en: "“One Size Smaller”" },
      date:  { zh: "夏夜 · 内江", en: "A summer night · Neijiang" },
      body: {
        zh: [
          "回来的那个晚上，天刚擦黑。屋檐下的灯一盏一盏亮起来，天边还剩最后一小块橘色。我放下行李出门，去走小时候放学走的那条路。",
          "一切都小了一号。",
          "小时候觉得走不完的梯坎，几分钟就爬到了头。屋檐挨着屋檐，电线在头顶绕成一团乱麻，把暮色剪成一小格一小格。巷子的尽头，新城的楼比记忆里高出许多，亮着白色的灯。",
          "我记得这段梯坎。书包带子勒着肩膀，一级一级数着往上爬，数到一半就乱了。",
          "我记得巷口炒饭的锅气。火一旺，半条街都是蛋炒饭的香味。",
          "我记得夏天的傍晚，跟着大人在卤菜摊前排队，玻璃柜里那盏灯，把每张脸都照得黄黄的。",
          "这些摊子都还在。炒饭的师傅在铁锅前抬头看了我一眼；馄饨店里，系围裙的店员弯着腰，和坐着的婆婆说话；卤菜摊的阿姨还在玻璃柜后忙着。我说不清它们是不是当年那几家，可锅气和灯光，和记忆里的一模一样。",
          "夜深了往回走，宾馆的霓虹把人行道照成红色，摆零食摊的师傅在石狮子脚下码好最后一排泡面，一条狗跟着主人，慢悠悠走进网咖的绿光里。谁都不着急，这里的夜和小时候一样长——只有我是明天要走的那个。后来，我把这条回家的路，拍成了自己的短片。"
        ],
        en: [
          "The evening I came back, the sky had just gone dark. Under the eaves the lamps came on one by one, and a last scrap of orange still hung at the edge of the sky. I dropped my bags and went out, to walk the road I used to take home from school.",
          "One size smaller.",
          "The stone steps that once felt endless took only a few minutes to climb. Eaves leaned against eaves, wires knotted overhead, cutting the dusk into little squares. At the end of the alley, the towers of the new town stood taller than I remembered, lit white.",
          "I remember these steps. The straps of my schoolbag cutting into my shoulders, counting each one on the way up, losing count halfway.",
          "I remember the breath of the wok at the corner stall. When the fire roared, half the street smelled of egg-fried rice.",
          "I remember summer evenings, queuing with the grown-ups at the braised-food stall, the lamp in the glass case turning every face yellow.",
          "The stalls are all still there. The cook looked up at me from behind his iron wok; in the wonton shop, a woman in an apron bent down to talk with a grandmother in her chair; the auntie at the braised-food stall was still busy behind her glass case. I cannot say whether they are the same ones from back then—but the steam and the lamplight are exactly as I remember.",
          "Walking back late, hotel neon washed the pavement red; a vendor laid out the last row of instant noodles at the foot of a pair of stone lions; a dog followed its owner, unhurried, into the green glow of an internet café. Nobody here is in a hurry—the nights are as long as they were when I was small. I was the only one leaving in the morning. Later, I made this road home into a short film of my own."
        ]
      },
      quote: "Hometowns never grow up;\nthey simply wait for you,\none size smaller."
    }
  }
  ,
  /* 卡塔尔：路过多哈的一天（徽记＝Al Fanar 螺旋塔 + 黄昏海湾里的木帆船） */
  qatar: {
    geo: {
      emblem: "qatar",
      vb: "0 10 190 108",
      stampTop: "QATAR", stampBottom: "DOHA"
    },
    name: { zh: "卡塔尔", en: "Qatar" },
    region: "Doha",
    sub: { zh: "在卡塔尔，体验到一天变黑",
           en: "In Qatar, watching a day turn dark" },
    intro: {
      zh: "从帐篷屋顶下的棕榈树，到夜里亮起的老市集，\n太阳一路把人晒黑，黄昏一点点把城市调暗，\n一天，刚好看完多哈从白到黑。",
      en: "From palms under a tent roof to the old souq lighting up at night,\nthe sun tanning me all the way, dusk slowly dimming the city—\none day, just enough to watch Doha go from white to black."
    },
    cover:    { src: "../assets/travel/qatar/qatar-04", ar: "1619/1080", cap: "Dhow harbour at dusk ♡" },
    polaroid: { src: "../assets/travel/qatar/qatar-02", ar: "1080/1440", cap: "Sun-proof" },
    momentsLabel: "One Day in Doha ♡",
    strip: [
      { src: "../assets/travel/qatar/qatar-01", ar: "1440/1080", cap: { zh: "帐篷屋顶下的棕榈树", en: "Palms under a tent roof" } },
      { src: "../assets/travel/qatar/qatar-03", ar: "1619/1080", cap: { zh: "滨海大道，路灯是棕榈叶", en: "Palm-frond lamps on the Corniche" } },
      { src: "../assets/travel/qatar/qatar-05", ar: "1619/1080", cap: { zh: "沙尘里的西湾天际线", en: "West Bay behind the haze" } },
      { src: "../assets/travel/qatar/qatar-06", ar: "1619/1080", cap: { zh: "夜里亮起的螺旋塔", en: "The spiral tower, lit at night" } },
      { src: "../assets/travel/qatar/qatar-07", ar: "1619/1080", cap: { zh: "瓦其夫老市集", en: "Souq Waqif at night" } }
    ],
    tapeLabel: { zh: "烈日 · 黄昏 · 夜市", en: "Sun · Dusk · Souq" },
    diary: {
      label: { zh: "一日手记", en: "One-Day Notes" },
      place: "Doha · Corniche",
      title: { zh: "“一天变黑”", en: "“Dark in a Day”" },
      date:  { zh: "路过的一天 · 多哈", en: "One day, passing through · Doha" },
      body: {
        zh: [
          "飞机落在多哈的时候刚过正午。阳光白得发狠，我把渔夫帽压低，围脖一直拉到眼睛下面，全副武装，只留一条缝看这个陌生的国家。",
          "在卡塔尔，体验到一天变黑。",
          "正午的多哈不属于室外。商场里种着一整排真的棕榈树，帐篷一样的屋顶把太阳滤成暖黄色，冷气足得像另一个季节。",
          "下午的车开在滨海大道上，路灯全做成棕榈叶的样子，一路弯向海。西湾的玻璃高楼站在沙尘后面，轮廓淡得像一张铅笔稿。",
          "天开始变黑。",
          "黄昏把海湾调成灰蓝色。木壳的老帆船一艘挨一艘泊在岸边，桅杆安安静静；螺旋塔最先亮起来，一圈一圈的暖黄，像有人提着灯从塔顶走到塔底。",
          "夜里的瓦其夫市集刚刚醒来。粗糙的白墙、露木梁的顶、一盏接一盏的吊灯，香料和坚果堆在店门口。我跟着人流在窄巷里慢慢走，谁也不急。",
          "睡前照镜子才发现，变黑的不只是天——全副武装了一整天，我还是比早上黑了一号。不过也值：一天之内，看完一座城市从白亮走到全黑。"
        ],
        en: [
          "The plane touched down in Doha just past noon. The sunlight was a fierce white; I pulled my bucket hat low and my neck gaiter up to my eyes—fully armoured, one slit left open to look at a country I didn't know.",
          "In Qatar, I watched a day turn dark.",
          "Noon in Doha does not belong to the outdoors. Inside the mall grew a whole row of real palm trees, a tent-like roof filtering the sun into warm gold, the air-conditioning strong enough to be another season.",
          "In the afternoon the car rolled down the Corniche, where every streetlight was shaped like a palm frond, curving with the road toward the sea. The glass towers of West Bay stood behind the dust haze, their outlines faint as a pencil sketch.",
          "The day went dark.",
          "Dusk turned the bay grey-blue. The old wooden dhows moored side by side along the shore, masts quiet; the spiral tower lit up first, ring after warm ring, as if someone were carrying a lamp from the top of the tower down to the bottom.",
          "At night, Souq Waqif was just waking up. Rough white walls, timber beams overhead, hanging lamps one after another, spices and nuts piled at the shop doors. I drifted with the crowd through the narrow lanes, and nobody hurried.",
          "Only in the mirror before bed did I see that the day wasn't the only thing that had gone dark—after a whole day in full armour, I was still a shade darker than in the morning. Worth it, though: in a single day, I had watched a city go from blinding white all the way to black."
        ]
      },
      quote: "One day in Doha:\nthe city went dark,\nand so did I."
    }
  }
  ,
  /* 苏州：白天的园林与夜晚的山塘（徽记＝园中塔 + 山塘石拱桥与灯笼） */
  suzhou: {
    geo: {
      emblem: "suzhou",
      vb: "0 0 190 112",
      stampTop: "SUZHOU", stampBottom: "JIANGNAN"
    },
    name: { zh: "苏州", en: "Suzhou" },
    sub: { zh: "一步一景的白天，灯火满河的夜晚",
           en: "A scene at every step, a river of lanterns at night" },
    intro: {
      zh: "清晨的河道，午后的园林，\n漏窗里取好的景，山塘街点亮的灯，\n在苏州，一天可以走过两座城。",
      en: "A canal at dawn, gardens in the afternoon,\na view composed inside a lattice window, lanterns lit along Shantang—\nin Suzhou, one day walks through two cities."
    },
    cover:    { src: "../assets/travel/suzhou/suzhou-04", ar: "1479/1080", cap: "Through the lattice ♡" },
    polaroid: { src: "../assets/travel/suzhou/suzhou-03", ar: "1619/1080", cap: "An egret, passing" },
    momentsLabel: "A Day in Suzhou ♡",
    strip: [
      { src: "../assets/travel/suzhou/suzhou-02", ar: "1619/1080", cap: { zh: "白墙沿着河走", en: "White walls along the canal" } },
      { src: "../assets/travel/suzhou/suzhou-01", ar: "1619/1080", cap: { zh: "黛瓦上的云", en: "Clouds over the tiles" } },
      { src: "../assets/travel/suzhou/suzhou-05", ar: "1619/1080", cap: { zh: "假山下的锦鲤", en: "Koi under the rockery" } },
      { src: "../assets/travel/suzhou/suzhou-06", ar: "1619/1080", cap: { zh: "山塘的夜", en: "Night on Shantang" } },
      { src: "../assets/travel/suzhou/suzhou-07", ar: "1619/1080", cap: { zh: "夜航的游船", en: "Boats after dark" } },
      { src: "../assets/travel/suzhou/suzhou-08", ar: "1619/1080", cap: { zh: "写着「塘」的灯笼", en: "The lantern that reads ‘Tang’" } }
    ],
    tapeLabel: { zh: "园林 · 流水 · 灯火", en: "Gardens · Canals · Lanterns" },
    diary: {
      label: { zh: "姑苏手记", en: "Gusu Notes" },
      place: "Suzhou · Gusu",
      title: { zh: "“漏窗里的塔”", en: "“The Pagoda in the Lattice”" },
      date:  { zh: "盛夏 · 苏州", en: "High summer · Suzhou" },
      body: {
        zh: [
          "在苏州，一天是从水边开始的。清晨的河道还没有游人，白墙沿着水一路排开，树影浮在河面上，几乎不动。",
          "园林里的路是故意绕的。太湖石堆成的假山把视线挡住又放开，池水绿得发暗，锦鲤从假山的影子里游出来，一甩尾就是一团橘红。",
          "一面漏窗前排起了队。轮到我才明白：花格的缝隙正好框住远处那座塔，塔底下铺着一整池的荷叶。造园的人几百年前就把景取好了，我只需要把眼睛放上去。",
          "一步，一景。",
          "出了园子抬头，又是另一幅：黛瓦的屋脊翘向天空，云在后面慢慢挪。一只白鹭掠过山墙，在蓝得过分的天上白得发亮。",
          "天一黑，山塘街把灯全点上了。红灯笼从屋檐一直挂到水边，石拱桥上站满了人，游船从桥洞里钻出来，把一河的灯火搅碎又拼好。",
          "回去的路上又看了一眼：灯笼上写着一个「塘」字，被风吹得轻轻晃。原来白天和夜晚是两座苏州，我都见过了。"
        ],
        en: [
          "In Suzhou the day begins at the water. In the early morning the canal is still empty of visitors; whitewashed walls file along the bank, and the trees float on the river, barely moving.",
          "Paths in the gardens wander on purpose. Rockeries of Taihu stone block the view and then release it; the pond is a deep, dark green, and koi slide out of the rockery’s shadow, a flick of orange with every turn.",
          "A queue had formed at one lattice window. When my turn came I understood: the gaps in the stone tracery frame a distant pagoda, with a whole pond of lotus leaves spread beneath it. The garden-makers composed this shot centuries ago; all I had to do was put my eyes to it.",
          "One step, one scene.",
          "Outside the garden I looked up into another picture: ridgelines of dark tiles curling toward the sky, clouds inching past behind them. A white egret crossed over a gable, impossibly bright against all that blue.",
          "The moment it got dark, Shantang Street switched on everything it had. Red lanterns ran from the eaves down to the water, the stone arch bridge filled with people, and tour boats slid out from under it, stirring a river of lights apart and back together.",
          "On the way back I turned for one more look: a lantern swayed in the wind, a single character on it—Tang, for Shantang. Suzhou is two cities, one by day and one by night, and I had seen them both."
        ]
      },
      quote: "Centuries ago,\nsomeone composed this view,\nand left it waiting for me."
    }
  }
  ,
  /* 新疆·赛里木湖：在赛里木湖收集每一片粉红色的云朵（徽记＝雪山湖面上的一朵云 + 收集云朵的玻璃罐） */
  xinjiang: {
    geo: {
      emblem: "xinjiang",
      vb: "0 0 190 120",
      stampTop: "SAYRAM LAKE", stampBottom: "XINJIANG"
    },
    name: { zh: "赛里木湖", en: "Sayram Lake" },
    region: "Xinjiang",
    sub: { zh: "在赛里木湖收集每一片粉红色的云朵",
           en: "Collecting every pink cloud at Sayram Lake" },
    intro: {
      zh: "出口 145，驶往赛里木湖方向，\n雪山把整面湖染成蓝色，\n云朵在傍晚变成粉红色。",
      en: "Exit 145, toward Sayram Lake—\nsnow mountains turning the water blue,\nclouds turning pink at dusk."
    },
    cover:    { src: "../assets/travel/xinjiang/xinjiang-05", ar: "1619/1080", cap: "Sayram Lake ♡" },
    polaroid: { src: "../assets/travel/xinjiang/xinjiang-02", ar: "1619/1080", cap: "A pink cloud, collected" },
    momentsLabel: "Clouds over Sayram ♡",
    strip: [
      { src: "../assets/travel/xinjiang/xinjiang-03", ar: "1619/1080", cap: { zh: "出口 145，赛里木湖方向", en: "Exit 145, to Sayram Lake" } },
      { src: "../assets/travel/xinjiang/xinjiang-07", ar: "1920/1080", cap: { zh: "开往草原深处", en: "Into the grasslands" } },
      { src: "../assets/travel/xinjiang/xinjiang-01", ar: "1619/1080", cap: { zh: "湖边的小木屋", en: "Cabins by the lake" } },
      { src: "../assets/travel/xinjiang/xinjiang-04", ar: "1619/1080", cap: { zh: "雪山前的滑翔伞", en: "Paramotors over the lake" } },
      { src: "../assets/travel/xinjiang/xinjiang-08", ar: "1920/1080", cap: { zh: "河湾里的马群", en: "Horses in the shallows" } },
      { src: "../assets/travel/xinjiang/xinjiang-06", ar: "1920/1080", cap: { zh: "远山粉紫色的雨", en: "A curtain of pink rain" } },
      { src: "../assets/travel/xinjiang/xinjiang-09", ar: "1692/1080", cap: { zh: "湖边的银河", en: "The Milky Way" } }
    ],
    tapeLabel: { zh: "公路 · 湖 · 云朵", en: "Road · Lake · Clouds" },
    diary: {
      label: { zh: "湖边手记", en: "Lakeside Notes" },
      place: "Sayram Lake · Xinjiang",
      title: { zh: "“收集粉红色的云朵”", en: "“Collecting Pink Clouds”" },
      date:  { zh: "盛夏 · 赛里木湖", en: "High summer · Sayram Lake, Xinjiang" },
      body: {
        zh: [
          "导航说，前方出口 145，驶往赛里木湖方向。连霍高速一路向西，雪山从挡风玻璃的尽头一点点升起来。",
          "湖比天更蓝",
          "草原一直铺到水边。湖边立着几座小木屋，屋顶是干草的颜色；几顶滑翔伞拖着橘红色的伞翼，从雪山前面慢慢飘过去。",
          "河湾在草原上分成好几股，亮得像镜子。一群马站在浅水里饮水，风把云的影子吹过草地，它们一动也不动。",
          "傍晚，雨在很远的山前落下来，没有走到我们这边。落日把整幅雨幕染成粉紫色，像天边挂了一层纱。",
          "在赛里木湖，收集每一片粉红色的云朵。",
          "夜里云都散了。银河从湖的这一头横到那一头，我们关掉车灯，星星多得像要溢出来。",
          "回程的路上我想，云大概是带不走的。但没关系——它们都被收在这一页里了。"
        ],
        en: [
          "The navigation said: Exit 145 ahead, toward Sayram Lake. The Lianhuo Expressway ran west, and the snow mountains rose, little by little, at the end of the windshield.",
          "Bluer than the sky",
          "The grassland ran all the way to the water. A few wooden cabins stood by the lake, their roofs the colour of dry grass; paramotors trailed their orange wings, drifting slowly past the snow mountains.",
          "Out on the plain the river split into bright braids, like mirrors. A herd of horses stood drinking in the shallows; the wind pushed cloud-shadows across the grass, and they never moved.",
          "In the evening, rain fell against the far mountains and never reached us. The sunset dyed the whole curtain of it pink and violet, like a veil hung at the edge of the sky.",
          "At Sayram Lake, collecting every pink cloud.",
          "By night the clouds were gone. The Milky Way stretched from one end of the lake to the other; we turned off the headlights, and the stars felt close to overflowing.",
          "On the road back I thought: you can't really take a cloud with you. But that's all right—they are all kept here, on this page."
        ]
      },
      quote: "The clouds turned pink\nonly for a moment—\nlong enough to keep."
    }
  }
  ,
  /* 66 号公路：美国西南公路旅行（徽记＝通往消失点的公路 + 电线杆陪着的荒原公路） */
  route66: {
    geo: {
      emblem: "route66",
      vb: "0 18 190 102",
      stampTop: "ROUTE 66", stampBottom: "MOTHER ROAD"
    },
    name: { zh: "66 号公路", en: "Route 66" },
    region: "Arizona · Utah",
    sub: { zh: "一路向西，大地开阔，时间变慢",
           en: "Heading west, where the land opens and time slows" },
    intro: {
      zh: "雨后的柏油路一直伸向天边，\n峡谷裂开，河流转弯，巨石站成街道，\n最后，荒原用一道彩虹送我们离开。",
      en: "Wet asphalt running to the horizon,\ncanyons cracking open, a river turning, stones standing like a street—\nand at the end, the desert saw us off with a rainbow."
    },
    cover:    { src: "../assets/travel/route66/route66-04", ar: "1619/1080", cap: "The open road ♡" },
    polaroid: { src: "../assets/travel/route66/route66-03", ar: "1080/1619", cap: "Under the arch" },
    momentsLabel: "Along Route 66 ♡",
    strip: [
      { src: "../assets/travel/route66/route66-01", ar: "1619/1080", cap: { zh: "被水和风磨出的波浪", en: "Waves in the sandstone" } },
      { src: "../assets/travel/route66/route66-05", ar: "1080/1619", cap: { zh: "羚羊谷的那束光", en: "The beam in the canyon" } },
      { src: "../assets/travel/route66/route66-02", ar: "1857/1080", cap: { zh: "大峡谷的云影", en: "Cloud shadows, Grand Canyon" } },
      { src: "../assets/travel/route66/route66-06", ar: "1619/1080", cap: { zh: "马蹄湾", en: "Horseshoe Bend" } },
      { src: "../assets/travel/route66/route66-08", ar: "1619/1080", cap: { zh: "石头的街道", en: "A street of stone" } },
      { src: "../assets/travel/route66/route66-07", ar: "1163/1081", cap: { zh: "小镇黄昏的火烧云", en: "Clouds on fire at dusk" } },
      { src: "../assets/travel/route66/route66-09", ar: "1619/1080", cap: { zh: "荒原上的双彩虹", en: "A double rainbow" } }
    ],
    tapeLabel: { zh: "公路 · 荒原 · 光", en: "Road · Desert · Light" },
    diary: {
      label: { zh: "公路手记", en: "Road Notes" },
      place: "Route 66 · Arizona",
      title: { zh: "“一直往西”", en: "“Keep Driving West”" },
      date:  { zh: "夏末 · 美国西南", en: "Late summer · The American Southwest" },
      body: {
        zh: [
          "沿着 66 号公路往西，出发那天刚下过雨。柏油路还亮着水光，黄色的分道线一直伸向天边，路的尽头浮着几座青灰色的山。很长一段路上，只有电线杆陪着我们。",
          "大地开阔得没有回声。",
          "羚羊谷像大地裂开的一道缝。光从头顶漏下来，砂岩被水和风磨成波浪的形状；有一束光正好停在岩壁中间的一截枯木上，像有人替它打了一盏追光。",
          "大峡谷的边缘站满了云的影子。岩层一层压着一层，谷底的科罗拉多河细得像一根线。我举着相机站了很久，才按下第一张——有些尺度，取景框其实装不下。",
          "在马蹄湾，河水绕着一整块岩石转了一个近乎完整的圆，然后不慌不忙地继续往前。原来河也会绕路。绕完这一圈，它还是那条河。",
          "拱门国家公园里，红色的巨石排成一条街道。有人沿着岩坡爬到拱门底下，站在一朵云旁边，变成一个很小的剪影。在那里，人小得刚刚好。",
          "傍晚开回镇上，餐馆屋檐的霓虹先亮了，山背后的云还烧着最后一点落日。我把车停在路边，看那堆火一点点暗下去，谁也没有催谁。",
          "离开荒原的那天下了一场太阳雨，两道彩虹落在彩绘沙漠上——一道很清楚，一道很淡，底下只有一根孤零零的电线杆。我把车开得很慢。路还长，但我忽然不着急了。"
        ],
        en: [
          "We set out west along Route 66, just after the rain. The asphalt was still shining, the yellow line ran all the way to the horizon, and a few grey-blue mountains floated at the end of the road. For long stretches, the telephone poles were our only company.",
          "Too wide for echoes.",
          "Antelope Canyon is a crack the earth opened. Light leaked in from above, over sandstone that water and wind had worn into waves; one beam rested exactly on a dead log lodged in the rock, as if someone had aimed a spotlight at it.",
          "At the rim of the Grand Canyon, cloud shadows drifted across the strata, and the Colorado at the bottom thinned to a single thread. I stood with the camera raised for a long while before taking the first frame—some scales simply don’t fit in a viewfinder.",
          "At Horseshoe Bend the river wraps around one great rock, drawing an almost perfect circle, then moves on, unhurried. So rivers take detours too. After the whole long loop, it is still the same river.",
          "In Arches the red monoliths line up like a street. Someone climbed the slope to stand beneath the arch, next to a single cloud, and became a very small silhouette. Out there, feeling small is exactly the right size.",
          "In the evening we drove back into town. The neon along the diner’s roofline came on first, while the clouds behind the mountains still burned with the last of the sunset. I parked by the road and watched the fire go out slowly, and nobody hurried anybody.",
          "On the day we left the badlands it sun-showered, and a double rainbow dropped onto the Painted Desert—one arc sharp, one faint, nothing beneath them but a lone telephone pole. I slowed the car right down. The road was still long, and suddenly I was in no hurry at all."
        ]
      },
      quote: "The road was long,\nthe land was wide,\nand nobody was in a hurry."
    }
  }
};
