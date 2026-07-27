/* 旅行手账数据：每个地点一页（一组图 + 手写文字）。
   图片为 assets/raw/travel/<loc>/ 经管线产出的 assets/travel/<loc>/<loc>-NN */
window.DIARY = {
  norway: {
    name: { zh: "挪威", en: "Norway" },
    sub: { zh: "山海之间，收集温柔与壮阔的记忆",
           en: "Between mountains and sea, collecting the gentle and the vast" },
    intro: {
      zh: "从罗弗敦群岛的渔村到默斯肯岛外的漩涡，\n从清晨的海雾到午夜的阳光，\n每一段路都是风景，每一次停留都是故事。",
      en: "From Lofoten’s fishing villages to the maelstrom off Mosken,\nfrom morning sea fog to the midnight sun—\nevery mile is scenery; every stop, a story."
    },
    stamp: "NORWAY · LOFOTEN · 2024 · ",
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
};
