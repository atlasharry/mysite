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
  /* 卫斯理安：毕业前的最后两周（徽记＝South College 钟楼 + 便利贴墙） */
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
      zh: "写完了 90 页的毕业论文，\n在熟悉的教室里上完了最后一节课，\n第一次，也是最后一次走进 bar night 的人群。",
      en: "A ninety-page thesis, finished.\nThe last class, in a room I knew by heart.\nMy first, and last, bar night."
    },
    cover:    { src: "../assets/travel/wesleyan/wesleyan-02", ar: "1920/1080", cap: "Champagne on the lawn ♡" },
    polaroid: { src: "../assets/travel/wesleyan/wesleyan-05", ar: "1080/1619", cap: "Spring, briefly" },
    momentsLabel: "The Last Spring ♡",
    strip: [
      { src: "../assets/travel/wesleyan/wesleyan-04", ar: "1080/1440", cap: { zh: "Boger Hall 前的春天", en: "Spring outside Boger Hall" } },
      { src: "../assets/travel/wesleyan/wesleyan-01", ar: "1440/1080", cap: { zh: "写完 90 页的那个春天", en: "The spring of ninety pages" } },
      { src: "../assets/travel/wesleyan/wesleyan-06", ar: "1346/1080", cap: { zh: "最后一节课", en: "The last class" } },
      { src: "../assets/travel/wesleyan/wesleyan-03", ar: "1440/1080", cap: { zh: "第一次也是最后一次 bar night", en: "First and last bar night" } },
      { src: "../assets/travel/wesleyan/wesleyan-07", ar: "1440/1080", cap: { zh: "那晚的人群", en: "The crowd that night" } },
      { src: "../assets/travel/wesleyan/wesleyan-09", ar: "1440/1080", cap: { zh: "草地上的春日音乐节", en: "Spring Fling on the field" } },
      { src: "../assets/travel/wesleyan/wesleyan-08", ar: "1439/1080", cap: { zh: "朋友们的毕业礼物", en: "Gifts from friends" } }
    ],
    tapeLabel: { zh: "论文 · 春天 · 告别", en: "Thesis · Spring · Goodbye" },
    diary: {
      label: { zh: "毕业前两周", en: "Two Weeks Left" },
      place: "Middletown · Wesleyan",
      title: { zh: "“异乡的小村”", en: "“A Small Town Far From Home”" },
      date:  { zh: "春末 · 米德尔敦", en: "Late spring · Middletown, CT" },
      body: {
        zh: [
          "离毕业只剩最后两周。那个曾经觉得无聊的小村子，如今竟也开始让我有些不舍。",
          "写完了 90 页的毕业论文，在熟悉的教室里上完了最后一节课，第一次、也是最后一次走进 bar night 的人群，也在春风里看见了短暂却灿烂的花开。",
          "high rise 前的花开了又谢，书桌墙上的便利贴贴满了整个春天，olin 门口草坪上飞舞着的香槟。",
          "曾以为这一切只是一段旅程。只有在快要分别时，才发现这个异乡的小村，早已成了我的另一个故乡。"
        ],
        en: [
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
};
