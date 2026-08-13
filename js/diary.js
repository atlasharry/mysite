/* 旅行手账渲染：?loc=xxx 从 DIARY 取数据；语言与主站共享 site-lang。
   便签与邮戳的图形由 DIARY[loc].geo 配置，两种模式：
   - 轮廓模式：note/stamp 为国界线 path（Natural Earth 50m 提取），dot 标点
   - 徽记模式：emblem 指向 EMBLEM 字典里的地标/意象图形（城市页用，避开国界） */
(function(){
  var KEY = "site-lang";
  var lang = null;
  try { lang = localStorage.getItem(KEY); } catch(e){}
  if(!lang) lang = ((navigator.language || "").toLowerCase().indexOf("zh") === 0) ? "zh" : "en";
  var q = new URLSearchParams(location.search);
  if(q.get("lang") === "zh" || q.get("lang") === "en") lang = q.get("lang");

  var loc = q.get("loc") || "norway";
  var D = window.DIARY && DIARY[loc];

  function t(o){
    if(o == null) return "";
    if(typeof o === "string") return o;
    return o[lang] || o.zh || o.en || "";
  }
  function esc(s){
    return String(s).replace(/[&<>"]/g, function(c){
      return { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c];
    });
  }
  function pic(base, ar, alt){
    return '<img src="' + base + '.webp" alt="' + esc(alt || "") + '"' +
      (ar ? ' style="aspect-ratio:' + ar + '"' : "") + ' loading="lazy">';
  }


  /* 徽记：城市页不画国界，用地标与意象代替。
     stamp = 邮戳中心剪影（填充），note = 便签图形（描边手绘感） */
  var EMBLEM = {
    /* 杭州：三潭印月石塔（邮戳） + 那道彩虹与城市天际线（便签） */
    hangzhou: {
      stamp:
        '<path class="sil" d="M62,29 L63.7,35.5 L60.3,35.5 Z"/>' +          /* 宝顶 */
        '<path class="sil" d="M44.5,45 L62,36 L79.5,45 Z"/>' +              /* 宝盖檐（宽扁） */
        '<path class="sil" fill-rule="evenodd" d="M62,46.5 a12,12 0 1,0 .01,0 Z' +
          ' M65,58.5 a3,3 0 1,0 -6,0 a3,3 0 1,0 6,0 Z' +                    /* 中孔 */
          ' M55.6,58.5 a2.1,2.1 0 1,0 -4.2,0 a2.1,2.1 0 1,0 4.2,0 Z' +      /* 左孔 */
          ' M72.6,58.5 a2.1,2.1 0 1,0 -4.2,0 a2.1,2.1 0 1,0 4.2,0 Z"/>' +   /* 右孔 */
        '<path class="sil" d="M55.5,70 L68.5,70 L71.5,77 L52.5,77 Z"/>' +   /* 须弥座 */
        '<path class="sil" d="M44,77 L80,77 L80,81.5 L44,81.5 Z"/>' +       /* 台基 */
        '<path class="wv" d="M40,87 q7,-3.4 14,0 t14,0 t14,0"/>' +
        '<path class="wv" d="M46,93 q5.3,-2.8 10.6,0 t10.6,0 t10.6,0"/>',
      note: (function(){
        /* 那道彩虹：不是完整拱门，而是照片里斜挂在天边的一段（圆心落在画外右下） */
        var cx = 176, cy = 152, s = "", i, r, a1, a2;
        for(i = 0; i < 7; i++){
          r = 116 + i * 4.8;
          /* 外侧弧渐次收短：顶端参差着淡出云里，不是齐刷刷切一刀 */
          a1 = (190 + i * 1.4) * Math.PI / 180;
          a2 = (268 - i * 3.2) * Math.PI / 180;
          s += '<path class="bow" style="opacity:' + (0.85 - i * 0.1).toFixed(2) + '" d="M' +
               (cx + r * Math.cos(a1)).toFixed(1) + ',' + (cy + r * Math.sin(a1)).toFixed(1) +
               ' A' + r + ',' + r + ' 0 0,1 ' +
               (cx + r * Math.cos(a2)).toFixed(1) + ',' + (cy + r * Math.sin(a2)).toFixed(1) + '"/>';
        }
        /* 地平线上的城市：高楼、行道树、那盏路灯（傍晚回家的街口） */
        s += '<path class="sky" d="M2,124 H186"/>' +
             '<path class="sky" d="M12,124 V100 H27 V124 M32,124 V90 H45 V124 M50,124 V108 H60 V124"/>' +
             '<path class="sky" d="M110,124 V113 M110,113 a8,8 0 1,0 .01,0"/>' +
             '<path class="sky" d="M80,124 V98 q0,-5.5 6.5,-5.5"/>' +
             '<circle class="lamp" cx="88.5" cy="92.5" r="2.3"/>' +
             '<path class="sky" d="M148,124 V104 H162 V124 M166,124 V112 H176 V124" style="opacity:.5"/>';
        return s;
      })()
    },

    /* 卫斯理安：South College 钟楼（邮戳） + 贴满整个春天的便利贴墙（便签） */
    wesleyan: {
      /* 尺寸按内圆 r=36（圆心 62,62）收进，最宽处不越界 */
      stamp:
        '<path class="sil" d="M62,30 L63.4,36 L60.6,36 Z"/>' +                    /* 尖顶 */
        '<path class="sil" d="M54,46 q8,-11 16,0 Z"/>' +                          /* 圆顶 */
        '<path class="sil" d="M54,46 H70 V48.5 H54 Z"/>' +                        /* 顶檐 */
        '<path class="sil" fill-rule="evenodd" d="M56,48.5 H68 V63 H56 Z' +       /* 钟塔 */
          ' M64.7,55.5 a2.7,2.7 0 1,0 -5.4,0 a2.7,2.7 0 1,0 5.4,0 Z"/>' +         /* 钟面 */
        '<path class="sil" d="M52.5,63 H71.5 V66 H52.5 Z"/>' +                    /* 塔基檐 */
        '<path class="sil" fill-rule="evenodd" d="M44,66 H80 V81 H44 Z' +         /* 主楼 */
          ' M49,70 h4.5 v7 h-4.5 Z M57.5,70 h4.5 v7 h-4.5 Z M66,70 h4.5 v7 h-4.5 Z M74.5,70 h4.5 v7 h-4.5 Z"/>' +
        '<path class="sil" d="M41,81 H83 V84.5 H41 Z"/>' +                        /* 台基 */
        '<path class="wv" d="M45,90 h34"/>',                                      /* 地面线 */
      note: (function(){
        /* 书桌墙上的便利贴：贴满整个春天——高低错落、大小不一、角度各异 */
        var n = [                                  /* x, y, w, h, 角度, 笔迹行数 */
          [8, 12, 45, 39, -6, 3], [61, 26, 37, 33, 4, 2], [108, 8, 43, 37, -3, 3], [157, 28, 33, 30, 7, 2],
          [15, 63, 38, 34, 3, 2], [57, 70, 44, 37, -5, 3], [110, 57, 35, 31, 2, 2], [151, 71, 39, 33, -4, 2]
        ], s = "", i, p, j, cx, cy;
        for(i = 0; i < n.length; i++){
          p = n[i];
          cx = p[0] + p[2] / 2; cy = p[1] + p[3] / 2;
          s += '<g transform="rotate(' + p[4] + ' ' + cx + ' ' + cy + ')">' +
               '<path class="note-sq" d="M' + p[0] + ',' + p[1] + ' h' + p[2] + ' v' + (p[3] - 8) +
                 ' l-8,8 h-' + (p[2] - 8) + ' Z"/>' +
               '<path class="note-fold" d="M' + (p[0] + p[2]) + ',' + (p[1] + p[3] - 8) +
                 ' l-8,0 l0,8 Z"/>';
          for(j = 0; j < p[5]; j++){               /* 便利贴上的手写笔迹，长短不一 */
            s += '<path class="note-ln" d="M' + (p[0] + 6) + ',' + (p[1] + 11 + j * 8) +
                 ' h' + (p[2] - 13 - j * 5) + '"/>';
          }
          s += '</g>';
        }
        return s;
      })()
    },

    /* 釜山：防波堤灯塔（邮戳） + 沿海岸线开的天空胶囊列车（便签） */
    busan: {
      stamp:
        '<path class="sil" d="M60.5,32 h3 v4 h-3 Z"/>' +                          /* 顶针 */
        '<path class="sil" d="M56,44 L62,35 L68,44 Z"/>' +                        /* 顶盖 */
        '<path class="sil" fill-rule="evenodd" d="M56.5,44 H67.5 V54 H56.5 Z' +   /* 灯室 */
          ' M65,49.5 a2.6,2.6 0 1,0 -5.2,0 a2.6,2.6 0 1,0 5.2,0 Z"/>' +
        '<path class="sil" d="M54,54 H70 V57 H54 Z"/>' +                          /* 观景台 */
        '<path class="sil" d="M57,57 L67,57 L70,80 L54,80 Z"/>' +                 /* 塔身 */
        '<path class="sil" d="M50,80 H74 V84 H50 Z"/>' +                          /* 基座 */
        '<path class="wv" d="M40,88 q7,-3.4 14,0 t14,0 t14,0"/>' +
        '<path class="wv" d="M46,94 q5.3,-2.8 10.6,0 t10.6,0 t10.6,0"/>' +
        '<path class="wv" d="M78,42 q4,-4 8,0" style="opacity:.8"/>',             /* 一只海鸥远影 */
      note: (function(){
        /* 天空胶囊：圆润车厢骑在单轨高架梁上沿海岸行驶，一前一后两节，海在桥下 */
        var s = '', x;
        s += '<path class="sea" d="M2,64 H188" style="opacity:.3"/>';        /* 远处海平线 */
        /* 高架梁 + 疏落的桥墩（不是栅栏） */
        s += '<path class="beam" d="M2,78 H188 V82 H2 Z"/>';
        for(x = 24; x < 186; x += 46){
          s += '<path class="rail" d="M' + x + ',82 V97"/>' +
               '<path class="rail" d="M' + (x - 6) + ',97 h12"/>';
        }
        /* 主车厢：大圆角胶囊 + 两扇圆角窗 + 顶部集电架 + 转向架落在梁上 */
        s += '<path class="rail" d="M79,41 V47"/>' +
             '<path class="carw" d="M73,36 h12 v5 h-12 Z"/>' +
             '<path class="car" d="M56,55 q0,-8 8,-8 h30 q8,0 8,8 v15 q0,8 -8,8 h-30 q-8,0 -8,-8 Z"/>' +
             '<path class="carw" d="M63,57 q0,-2 2,-2 h11 q2,0 2,2 v11 q0,2 -2,2 h-11 q-2,0 -2,-2 Z' +
               ' M81,57 q0,-2 2,-2 h11 q2,0 2,2 v11 q0,2 -2,2 h-11 q-2,0 -2,-2 Z"/>' +
             '<path class="rail" d="M64,78 V82 M96,78 V82"/>';
        /* 远处的第二节：小一号、淡一点，正跟上来 */
        s += '<g style="opacity:.5">' +
             '<path class="rail" d="M154,52 V57"/>' +
             '<path class="carw" d="M150,48 h9 v4 h-9 Z"/>' +
             '<path class="car" d="M139,63 q0,-6 6,-6 h20 q6,0 6,6 v9 q0,6 -6,6 h-20 q-6,0 -6,-6 Z"/>' +
             '<path class="carw" d="M144,65 h8 v8 h-8 Z M158,65 h8 v8 h-8 Z"/>' +
             '</g>';
        /* 桥下的海 */
        s += '<path class="sea" d="M4,104 q11,-4.5 22,0 t22,0 t22,0 t22,0 t22,0 t22,0 t22,0 t22,0"/>' +
             '<path class="sea" d="M10,114 q10,-4 20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0"/>';
        /* 海鸥 */
        s += '<path class="gull" d="M20,28 q7,-7 14,0 M34,28 q7,-7 14,0"/>' +
             '<path class="gull" d="M118,20 q5.5,-5.5 11,0 M129,20 q5.5,-5.5 11,0"/>';
        return s;
      })()
    },

    /* 重庆：洪崖洞吊脚楼层叠（邮戳） + 巷口的街边摊、坡道台阶与灯笼串（便签） */
    chongqing: {
      /* 尺寸按内圆 r≈34（圆心 62,62）收进：三层檐一层层收窄，吊脚立在江上 */
      stamp:
        '<path class="sil" d="M52,35 L62,28.5 L72,35 Z"/>' +                        /* 顶层飞檐 */
        '<path class="sil" fill-rule="evenodd" d="M57,35 H67 V43 H57 Z' +
          ' M60.6,37.6 h2.8 v3.4 h-2.8 Z"/>' +                                      /* 顶层小楼 */
        '<path class="sil" d="M48,49.5 L62,42.5 L76,49.5 Z"/>' +                    /* 二层檐 */
        '<path class="sil" fill-rule="evenodd" d="M52,49.5 H72 V58 H52 Z' +
          ' M56,52 h3.4 v3.8 h-3.4 Z M64.6,52 h3.4 v3.8 h-3.4 Z"/>' +               /* 二层楼身 */
        '<path class="sil" d="M44,64 L62,56 L80,64 Z"/>' +                          /* 大檐 */
        '<path class="sil" fill-rule="evenodd" d="M48,64 H76 V74 H48 Z' +
          ' M52,66.6 h3.6 v4.4 h-3.6 Z M60.2,66.6 h3.6 v4.4 h-3.6 Z' +
          ' M68.4,66.6 h3.6 v4.4 h-3.6 Z"/>' +                                      /* 主楼身 */
        '<path class="sil" d="M45,74 H79 V77 H45 Z"/>' +                            /* 台基 */
        '<path class="sil" d="M50,77 h2.4 v7 h-2.4 Z M60.8,77 h2.4 v7 h-2.4 Z' +
          ' M71.6,77 h2.4 v7 h-2.4 Z"/>' +                                          /* 吊脚 */
        '<path class="wv" d="M40,88 q7,-3.4 14,0 t14,0 t14,0"/>' +                  /* 嘉陵江 */
        '<path class="wv" d="M46,94 q5.3,-2.8 10.6,0 t10.6,0 t10.6,0"/>',
      note:
        /* 烟火气的街口：雨棚下的小摊冒着热气，右手边台阶上坡，灯笼串挂过巷口 */
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;opacity:.55" d="M8,102 H130"/>' +                                             /* 街面 */
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.6;stroke-linejoin:round;stroke-linecap:round;opacity:.65" d="M130,102 h13 v-9 h13 v-9 h13 v-9 h13 v-9 h6"/>' + /* 上坡的台阶 */
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;opacity:.5" d="M116,24 q36,12 70,16"/>' +                                    /* 灯笼串的线 */
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;opacity:.6" d="M134,30 v4 M153,34.5 v4 M172,38 v4 M134,42.8 v3 M153,47.3 v3 M172,50.8 v3"/>' + /* 挂绳与穗子 */
        '<ellipse style="fill:rgba(51,69,94,.1);stroke:var(--ink);stroke-width:1.5;opacity:.75" cx="134" cy="38.4" rx="3.6" ry="4.4"/>' +
        '<ellipse style="fill:rgba(51,69,94,.1);stroke:var(--ink);stroke-width:1.5;opacity:.75" cx="153" cy="42.9" rx="3.6" ry="4.4"/>' +
        '<ellipse style="fill:rgba(51,69,94,.1);stroke:var(--ink);stroke-width:1.5;opacity:.75" cx="172" cy="46.4" rx="3.6" ry="4.4"/>' +                            /* 三盏灯笼 */
        '<path style="fill:rgba(51,69,94,.1);stroke:var(--ink);stroke-width:1.6;stroke-linejoin:round;opacity:.85" d="M16,30 H94 L99,43 H11 Z"/>' +                  /* 雨棚 */
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;opacity:.7" d="M11,43 q5.5,5 11,0 t11,0 t11,0 t11,0 t11,0 t11,0 t11,0 t11,0"/>' + /* 棚边 */
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.6;stroke-linecap:round;opacity:.65" d="M20,45 V100 M90,45 V100"/>' +                                /* 撑杆 */
        '<path style="fill:rgba(51,69,94,.1);stroke:var(--ink);stroke-width:1.6;stroke-linejoin:round;opacity:.8" d="M26,76 H84 V100 H26 Z"/>' +                     /* 摊台 */
        '<path style="fill:rgba(51,69,94,.1);stroke:var(--ink);stroke-width:1.6;stroke-linejoin:round;opacity:.85" d="M46,66 h20 v5 q0,5 -5,5 h-10 q-5,0 -5,-5 Z"/>' + /* 锅 */
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;opacity:.7" d="M46,69 h-3.5 M66,69 h3.5"/>' +                                /* 锅耳 */
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;opacity:.5" d="M52,63 q-3,-3.5 0,-7 q3,-3.5 0,-7 M60,63 q3,-3.5 0,-7 q-3,-3.5 0,-7"/>' + /* 蒸汽 */
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;opacity:.6" d="M80.5,43 v6"/>' +
        '<circle style="fill:var(--ink);opacity:.7" cx="80.5" cy="51.2" r="2.2"/>' +                                                                                 /* 摊前的灯 */
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;opacity:.6" d="M102,92 h12 M104,92 v10 M112,92 v10"/>'                       /* 小板凳 */
    },

    /* 香港：双层叮叮车（邮戳） + 便签上的一格胶片，格子里是维港天际线 */
    hongkong: {
      stamp:
        '<path class="wv" d="M62,37.5 L69,29.5"/>' +                              /* 集电杆 */
        '<path class="sil" fill-rule="evenodd" d="M49,80 V44 q0,-6 6,-6 h14 q6,0 6,6 v36 Z' +
          ' M53,43 h18 v10 h-18 Z' +                                              /* 上层车窗 */
          ' M57.5,56.5 h9 v5.5 h-9 Z' +                                           /* 路线牌 */
          ' M53,65.5 h18 v9 h-18 Z"/>' +                                          /* 下层挡风 */
        '<path class="sil" d="M46,80 H78 L79.5,84.5 H44.5 Z"/>' +                 /* 裙板 */
        '<path class="wv" d="M42,90 h40"/>' +                                     /* 轨道 */
        '<path class="wv" d="M50,94.5 h24"/>',
      note: (function(){
        /* 一帧美好的瞬间：一段胶片斜穿便签，中间那格里是维港的天际线 */
        var s = '<g transform="rotate(-6 95 62)">' +
          '<path style="fill:none;stroke:var(--ink);stroke-width:1.7;stroke-linejoin:round;opacity:.8" d="M10,44 H180 V80 H10 Z"/>', x;
        for(x = 15; x <= 169; x += 14){                    /* 上下两排片孔 */
          s += '<path style="fill:rgba(51,69,94,.1);stroke:var(--ink);stroke-width:1.5;stroke-linejoin:round;opacity:.55" d="M' +
               x + ',46.5 h7 v4 h-7 Z M' + x + ',73.5 h7 v4 h-7 Z"/>';
        }
        s += '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;opacity:.6" d="M66,53 V71 M124,53 V71"/>' + /* 分格线 */
             '<path style="fill:rgba(51,69,94,.1)" d="M66,53 h58 v18 h-58 Z"/>' +                                   /* 中间那格 */
             '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linejoin:round;stroke-linecap:round;opacity:.75" d="M74,64.5 V60 H80 V64.5 M83,64.5 V56 H89 V64.5 M86,56 V53.5 M92,64.5 V59 H98 V64.5 M101,64.5 V57 H107 V64.5 M110,64.5 V61 H116 V64.5"/>' + /* 天际线 */
             '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;opacity:.6" d="M72,67.5 q5,-2 10,0 t10,0 t10,0 t10,0 t6,0"/>' + /* 维港的水 */
             '</g>';
        /* 快门的两点星光 */
        s += '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;opacity:.5" d="M28,20 v9 M23.5,24.5 h9"/>' +
             '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;opacity:.5" d="M163,95 v8 M159,99 h8"/>';
        return s;
      })()
    },

    /* 内江：坡上的老屋与梯坎（邮戳） + 暮色的巷子——梯坎下到街口，檐下一盏灯，新城在远处（便签） */
    neijiang: {
      stamp:
        '<path class="wv" d="M38,34 q24,8 48,4" style="opacity:.8"/>' +           /* 头顶的电线 */
        '<path class="wv" d="M34,42 q28,10 56,3"/>' +
        '<path class="sil" d="M47,52 L62,38 L77,52 Z"/>' +                        /* 老屋坡顶 */
        '<path class="sil" fill-rule="evenodd" d="M52,52 H72 V62 H52 Z' +         /* 屋身 */
          ' M59.5,54.5 h5 v7.5 h-5 Z"/>' +                                        /* 门洞 */
        '<path class="sil" d="M40,84 V76.7 H46 V69.4 H52 V62 H72 V69.4 H78 V76.7 H84 V84 Z"/>' + /* 梯坎 */
        '<path class="wv" d="M45,90 h34"/>',                                      /* 地面线 */
      note:
        /* 电线：两道垂弧 + 一根斜拉，像照片里绕成乱麻的天空 */
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;opacity:.55" d="M2,12 q48,14 96,10 t88,-10"/>' +
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;opacity:.5" d="M2,24 q52,14 104,9 t82,-13"/>' +
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;opacity:.4" d="M120,4 L188,32"/>' +
        /* 坡顶的老屋：坡屋顶 + 屋身浅填充 + 敞着的门 */
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.8;stroke-linejoin:round;stroke-linecap:round;opacity:.75" d="M2,29 L22,15 L42,29"/>' +
        '<path style="fill:rgba(51,69,94,.1);stroke:var(--ink);stroke-width:1.6;stroke-linejoin:round;opacity:.75" d="M7,29 h30 v17 h-30 Z"/>' +
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linejoin:round;opacity:.65" d="M18,46 v-9 h8 v9"/>' +
        /* 梯坎：从坡顶一级一级下到街口 */
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.7;stroke-linejoin:round;stroke-linecap:round;opacity:.8" d="M2,46 H44 V52 H56 V58 H68 V64 H80 V70 H92 V76 H104 V82 H116 V88 H128 V94 H188"/>' +
        /* 檐下那盏灯：立在半坡的灯杆 */
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.6;stroke-linecap:round;opacity:.7" d="M100,76 V44"/>' +
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.6;stroke-linecap:round;opacity:.7" d="M100,44 q7,1 9,6"/>' +
        '<circle style="fill:var(--ink);opacity:.7" cx="109.3" cy="54.2" r="2.2"/>' +
        /* 巷子尽头的新城：两栋淡淡的高楼 */
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linejoin:round;opacity:.5" d="M138,94 V64 H152 V94 M158,94 V72 H172 V94"/>'
    },

    /* 卡塔尔：Al Fanar 螺旋塔（邮戳） + 黄昏海湾里的木帆船与西湾天际线（便签） */
    qatar: {
      stamp:
        '<path class="sil" d="M61.2,30 h1.6 v4 h-1.6 Z"/>' +                       /* 塔尖 */
        '<path class="sil" d="M58,39 q4,-5.5 8,0 Z"/>' +                           /* 灯亭穹顶 */
        '<path class="sil" fill-rule="evenodd" d="M57.5,39 H66.5 V43.5 H57.5 Z' +
          ' M63.3,41.3 a1.3,1.3 0 1,0 -2.6,0 a1.3,1.3 0 1,0 2.6,0 Z"/>' +          /* 灯亭与小窗 */
        '<path class="sil" fill-rule="evenodd" d="M57,43.5 L67,43.5 L73.5,68 L50.5,68 Z' +
          ' M55.6,51.6 L68.4,49.8 L68.7,51.3 L55.9,53.1 Z' +
          ' M54.1,58.7 L70,56.8 L70.3,58.3 L54.4,60.2 Z' +
          ' M52.4,65.3 L71.9,63.4 L72.2,64.9 L52.7,66.8 Z"/>' +                     /* 塔身与螺旋坡道 */
        '<path class="sil" fill-rule="evenodd" d="M50,68 H74 V80 H50 Z' +
          ' M59.2,80 v-5.2 a2.8,2.8 0 0 1 5.6,0 v5.2 Z"/>' +                        /* 门楼与拱门 */
        '<path class="sil" d="M46,80 H78 V83.5 H46 Z"/>' +                          /* 台基 */
        '<path class="wv" d="M40,88.5 q7,-3.4 14,0 t14,0 t14,0"/>' +
        '<path class="wv" d="M46,94 q5.3,-2.8 10.6,0 t10.6,0 t10.6,0"/>',           /* 海湾 */
      note:
        /* 黄昏的多哈湾：太阳落进海平线，木帆船泊在近处，西湾高楼淡在沙尘后 */
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;opacity:.5" d="M4,64 H186"/>' +                       /* 海平线 */
        '<path style="fill:rgba(51,69,94,.1);stroke:var(--ink);stroke-width:1.5;stroke-linejoin:round;opacity:.55" d="M10,64 V46 H19 V64 M23,64 V38 H33 V64 M37,64 V52 H45 V64 M68,64 V44 H77 V64"/>' + /* 沙尘里的高楼 */
        '<path style="fill:rgba(51,69,94,.1);stroke:var(--ink);stroke-width:1.5;stroke-linejoin:round;opacity:.6" d="M49,64 L56,28 L63,64 Z"/>' +   /* 尖顶塔楼 */
        '<path style="fill:rgba(51,69,94,.1);stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;opacity:.6" d="M82,64 a6,6 0 0 1 12,0 Z"/>' +  /* 正落进海里的太阳 */
        '<path style="fill:rgba(51,69,94,.1);stroke:var(--ink);stroke-width:1.8;stroke-linejoin:round;stroke-linecap:round;opacity:.8" d="M100,78 C118,82 140,81 154,76 L168,66 C167,71 164,77 158,81 C140,88 118,88 104,84 Z"/>' + /* 船身与翘起的船头 */
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.8;stroke-linecap:round;opacity:.8" d="M128,79 L122,30"/>' +                  /* 桅杆 */
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.8;stroke-linecap:round;opacity:.8" d="M104,58 L156,22"/>' +                  /* 斜桁 */
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;opacity:.5" d="M108,55.5 L150,26.5"/>' +              /* 收拢的帆 */
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;opacity:.5" d="M8,97 q10,-4 20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0"/>' +
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;opacity:.5" d="M24,107 q9,-3.6 18,0 t18,0 t18,0 t18,0 t18,0 t18,0"/>' + /* 水波 */
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.8;stroke-linecap:round;stroke-dasharray:0.1 6;opacity:.55" d="M6,72 Q40,76 62,86 T96,112"/>'   /* 弯进海里的浮标链 */
    },

    /* 苏州：园中塔（邮戳） + 山塘的石拱桥与灯笼（便签） */
    suzhou: {
      /* 五层塔收在内圆里：塔刹居顶，檐一层层放宽，底层开门洞，水在塔下 */
      stamp:
        '<path class="sil" d="M62,28.5 L63.5,34.5 L60.5,34.5 Z"/>' +              /* 塔刹 */
        '<path class="sil" d="M51.5,39.5 L62,34.5 L72.5,39.5 Z"/>' +              /* 一层檐 */
        '<path class="sil" d="M56.5,39.5 H67.5 V43.5 H56.5 Z"/>' +
        '<path class="sil" d="M50,48.5 L62,43.5 L74,48.5 Z"/>' +                  /* 二层 */
        '<path class="sil" d="M55.3,48.5 H68.7 V52.5 H55.3 Z"/>' +
        '<path class="sil" d="M48.5,57.5 L62,52.5 L75.5,57.5 Z"/>' +              /* 三层 */
        '<path class="sil" d="M54.1,57.5 H69.9 V61.5 H54.1 Z"/>' +
        '<path class="sil" d="M47,66.5 L62,61.5 L77,66.5 Z"/>' +                  /* 四层 */
        '<path class="sil" d="M52.9,66.5 H71.1 V70.5 H52.9 Z"/>' +
        '<path class="sil" d="M45.5,75.5 L62,70.5 L78.5,75.5 Z"/>' +              /* 五层檐 */
        '<path class="sil" fill-rule="evenodd" d="M51.7,75.5 H72.3 V79.5 H51.7 Z' +
          ' M64.2,79.5 a2.2,2.2 0 0 0 -4.4,0 Z"/>' +                              /* 底层与门洞 */
        '<path class="sil" d="M45,79.5 H79 V83 H45 Z"/>' +                        /* 台基 */
        '<path class="wv" d="M76,37 q4,-4 8,0" style="opacity:.8"/>' +            /* 一只白鹭远影 */
        '<path class="wv" d="M40,88 q7,-3.4 14,0 t14,0 t14,0"/>' +
        '<path class="wv" d="M46,94 q5.3,-2.8 10.6,0 t10.6,0 t10.6,0"/>',
      note:
        /* 山塘夜色：桥洞与倒影拼成一轮圆月，灯笼挂在檐口，游船正从桥下钻出 */
        '<g style="opacity:.8">' +                                                /* 近处这盏灯笼 */
          '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round" d="M28,4 V13.5"/>' +
          '<ellipse cx="28" cy="20" rx="7.5" ry="6.5" style="fill:rgba(51,69,94,.1);stroke:var(--ink);stroke-width:1.6"/>' +
          '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;opacity:.5" d="M28,13.5 V26.5 M24.4,15 q-2.4,5 0,10 M31.6,15 q2.4,5 0,10"/>' +
          '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;opacity:.6" d="M25.5,28.5 l-1,5.5 M28,29 v6 M30.5,28.5 l1,5.5"/>' +
        '</g>' +
        '<g style="opacity:.5">' +                                                /* 远一点的第二盏 */
          '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round" d="M47,4 V10.5"/>' +
          '<ellipse cx="47" cy="15.5" rx="5.5" ry="5" style="fill:rgba(51,69,94,.1);stroke:var(--ink);stroke-width:1.6"/>' +
          '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;opacity:.6" d="M45.2,22 l-.8,4.5 M47,22.5 v5 M48.8,22 l.8,4.5"/>' +
        '</g>' +
        '<g style="opacity:.7">' +                                                /* 对岸屋檐下的一盏 */
          '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round" d="M163,4 V11.5"/>' +
          '<ellipse cx="163" cy="17.5" rx="6.5" ry="5.5" style="fill:rgba(51,69,94,.1);stroke:var(--ink);stroke-width:1.6"/>' +
          '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;opacity:.5" d="M163,12 V23 M159.9,13.3 q-2.1,4.2 0,8.4 M166.1,13.3 q2.1,4.2 0,8.4"/>' +
          '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;opacity:.6" d="M160.8,25 l-.9,5 M163,25.5 v5.5 M165.2,25 l.9,5"/>' +
        '</g>' +
        /* 石拱桥（挖出桥洞）与桥面石级 */
        '<path fill-rule="evenodd" style="fill:rgba(51,69,94,.1);stroke:var(--ink);stroke-width:1.7;stroke-linejoin:round" d="M12,74 C30,48 55,42 95,42 C135,42 160,48 178,74 Z M70,74 A25,25 0 0 1 120,74 Z"/>' +
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;opacity:.5" d="M36,55.5 l7,-4 M52,49.5 l6.5,-3 M69,45.8 l5.5,-1.6 M154,55.5 l-7,-4 M138,49.5 l-6.5,-3 M121,45.8 l-5.5,-1.6"/>' +
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.6;stroke-linecap:round;opacity:.45" d="M72,78 A23,23 0 0 0 118,78"/>' +   /* 桥洞的倒影 */
        /* 桥下钻出的游船 */
        '<path style="fill:rgba(51,69,94,.1);stroke:var(--ink);stroke-width:1.6;stroke-linejoin:round" d="M84,67.5 h22 l-4,5.5 h-14 Z"/>' +
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.6;stroke-linecap:round" d="M88.5,67.5 q6.5,-6 13,0"/>' +
        /* 水面 */
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;opacity:.5" d="M4,74 h26 M160,74 h26"/>' +
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;opacity:.55" d="M22,88 q9,-3.5 18,0 t18,0 M132,88 q9,-3.5 18,0 t18,0"/>' +
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;opacity:.55" d="M60,104 q10,-4 20,0 t20,0 t20,0"/>'
    },

    /* 新疆·赛里木湖：雪山湖面上的一朵云（邮戳） + 收集云朵的玻璃罐（便签） */
    xinjiang: {
      stamp:
        '<path class="sil" d="M53,42 q-4.4,0 -4.4,-3.7 q0,-3.5 3.9,-3.8 q0.7,-4.7 5.9,-4.7 q3.9,0 5.4,2.9 q1.2,-0.9 2.9,-0.9 q3.7,0 4.2,3.6 q3.6,0.4 3.6,3.2 q0,3.4 -4.1,3.4 Z"/>' +   /* 那朵云 */
        '<path class="sil" d="M30,74 L44,52 L52,61 L62,46 L74,63 L81,55 L94,74 Z"/>' +          /* 雪山连脊 */
        '<path class="wv" d="M42,82 q6.65,-3.2 13.3,0 t13.3,0 t13.3,0"/>' +                     /* 湖面 */
        '<path class="wv" d="M48,89 q4.7,-2.6 9.4,0 t9.4,0 t9.4,0"/>',
      note: (function(){
        /* 收集云朵的玻璃罐：罐里两朵已经收好（浅填充），罐口一朵正落进去，
           天上两朵还没收（空心）；盖子先搁在一边——今晚不打算拧上 */
        var s = "";
        s += '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;opacity:.5" d="M34,105 H156"/>';                    /* 地面 */
        s += '<path style="fill:rgba(51,69,94,.07);stroke:var(--ink);stroke-width:1.8;stroke-linejoin:round;stroke-linecap:round;opacity:.8" d="M84,44 v52 q0,8 8,8 h24 q8,0 8,-8 v-52"/>' +   /* 敞口玻璃罐 */
             '<path style="fill:none;stroke:var(--ink);stroke-width:1.8;stroke-linecap:round;opacity:.8" d="M79,44 H129"/>';                     /* 罐口 */
        s += '<g transform="rotate(29 139 94.5)"><rect x="122.5" y="91" width="33" height="7" rx="3.5" style="fill:rgba(51,69,94,.1);stroke:var(--ink);stroke-width:1.5;stroke-linejoin:round;opacity:.7"/></g>';   /* 斜靠在罐边的盖子 */
        /* 罐里收好的两朵 */
        s += '<path style="fill:rgba(51,69,94,.1);stroke:var(--ink);stroke-width:1.5;stroke-linejoin:round;stroke-linecap:round;opacity:.75" d="M90,74 q-3.4,0 -3.4,-2.9 q0,-2.7 3,-3 q0.6,-3.6 4.6,-3.6 q3,0 4.2,2.3 q0.9,-0.7 2.2,-0.7 q2.9,0 3.3,2.8 q2.8,0.3 2.8,2.5 q0,2.6 -3.2,2.6 Z"/>' +
             '<path style="fill:rgba(51,69,94,.1);stroke:var(--ink);stroke-width:1.5;stroke-linejoin:round;stroke-linecap:round;opacity:.75" d="M102,92 q-3.4,0 -3.4,-2.9 q0,-2.7 3,-3 q0.6,-3.6 4.6,-3.6 q3,0 4.2,2.3 q0.9,-0.7 2.2,-0.7 q2.9,0 3.3,2.8 q2.8,0.3 2.8,2.5 q0,2.6 -3.2,2.6 Z"/>';
        /* 罐口正落进去的一朵 */
        s += '<path style="fill:rgba(51,69,94,.07);stroke:var(--ink);stroke-width:1.6;stroke-linejoin:round;stroke-linecap:round;opacity:.8" d="M97,40 q-3.4,0 -3.4,-2.9 q0,-2.7 3,-3 q0.6,-3.6 4.6,-3.6 q3,0 4.2,2.3 q0.9,-0.7 2.2,-0.7 q2.9,0 3.3,2.8 q2.8,0.3 2.8,2.5 q0,2.6 -3.2,2.6 Z"/>';
        /* 天上还没收的两朵 + 飘向罐口的风 */
        s += '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linejoin:round;stroke-linecap:round;opacity:.55" d="M30,26 q-3.4,0 -3.4,-2.9 q0,-2.7 3,-3 q0.6,-3.6 4.6,-3.6 q3,0 4.2,2.3 q0.9,-0.7 2.2,-0.7 q2.9,0 3.3,2.8 q2.8,0.3 2.8,2.5 q0,2.6 -3.2,2.6 Z"/>' +
             '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linejoin:round;stroke-linecap:round;opacity:.55" d="M150,32 q-3.4,0 -3.4,-2.9 q0,-2.7 3,-3 q0.6,-3.6 4.6,-3.6 q3,0 4.2,2.3 q0.9,-0.7 2.2,-0.7 q2.9,0 3.3,2.8 q2.8,0.3 2.8,2.5 q0,2.6 -3.2,2.6 Z"/>' +
             '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;opacity:.5" d="M50,24 q24,2 42,12"/>' +
             '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;opacity:.5" d="M53,32 q17,3 30,8"/>';
        return s;
      })()
    },

    /* 66 号公路：通往消失点的笔直公路（邮戳） + 电线杆陪着的荒原公路（便签） */
    route66: {
      stamp:
        '<path class="wv" d="M34,56 H90"/>' +                                     /* 地平线 */
        '<path class="sil" d="M33,56 L33,49 L38,49 L40,44 L48,44 L50,49 L54,49 L54,56 Z"/>' +   /* 左平顶山 */
        '<path class="sil" d="M71,56 L71,51 L74,51 L75.5,47 L83,47 L84.5,51 L88,51 L88,56 Z"/>' + /* 右平顶山 */
        '<path class="sil" fill-rule="evenodd" d="M62,57 L76,90 L48,90 Z' +       /* 公路奔向消失点 */
          ' M60.9,86 h2.2 v-5 h-2.2 Z M61.1,77.5 h1.8 v-4 h-1.8 Z' +              /* 中央虚线（镂空） */
          ' M61.3,70.5 h1.4 v-3 h-1.4 Z M61.5,64.8 h1 v-2 h-1 Z"/>' +
        '<path class="wv" d="M52,36 q4,-4 8,0 t8,0"/>' +                          /* 荒原上的云 */
        '<path class="wv" d="M45,43 q3,-3 6,0 t6,0" style="opacity:.8"/>',
      note: (function(){
        /* 雨后的荒原公路：路奔向消失点，电线杆一路变小，平顶山蹲在地平线上 */
        var LN = 'fill:none;stroke:var(--ink);stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round;opacity:.7',
            FL = 'fill:rgba(51,69,94,.1);stroke:var(--ink);stroke-width:1.6;stroke-linejoin:round;opacity:.75',
            WR = 'fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;opacity:.5',
            DS = 'fill:none;stroke:var(--ink);stroke-width:1.6;stroke-linecap:round;opacity:.6',
            s = '', i, p, a, b;
        s += '<path style="' + WR + '" d="M6,64 H184"/>';                          /* 地平线 */
        s += '<path style="' + FL + '" d="M6,64 V56 L11,56 L13.5,51 L24,51 L26.5,56 L32,56 L32,64 Z"/>' +   /* 远处的平顶山 */
             '<path style="' + FL + '" d="M124,64 V54 L131,54 L134,47 L156,47 L159,54 L166,54 L166,64 Z"/>';
        s += '<path style="' + FL + '" d="M50,122 C68,100 88,76 95,64 L99,64 C112,78 134,100 156,122 Z"/>';  /* 公路（路基出画，奔向消失点） */
        s += '<path style="' + DS + '" d="M102.4,116 L101.9,111 M101.1,104 L100.6,99' +                     /* 中央虚线 */
             ' M100,93 L99.6,89 M99,83 L98.7,80 M98.1,75 L97.9,72.5 M97.5,69 L97.3,67"/>';
        var poles = [[30,40,114,9],[54,56,100,6],[70,62,89,4],[82,63.5,80,2.5]];   /* x, 顶, 底, 臂半宽 */
        for(i = 0; i < poles.length; i++){                                          /* 电线杆：杆身 + 双横臂 + 落地短线 */
          p = poles[i];
          s += '<path style="' + LN + '" d="M' + p[0] + ',' + p[2] + ' V' + p[1] +
               ' M' + (p[0] - p[3]) + ',' + (p[1] + 4) + ' h' + (p[3] * 2) +
               ' M' + (p[0] - p[3] * 0.7) + ',' + (p[1] + 8) + ' h' + (p[3] * 1.4) +
               ' M' + (p[0] - p[3] * 0.6) + ',' + p[2] + ' h' + (p[3] * 1.2) + '"/>';
        }
        for(i = 0; i < poles.length - 1; i++){                                     /* 杆间垂下的电线 */
          a = poles[i]; b = poles[i + 1];
          s += '<path style="' + WR + '" d="M' + a[0] + ',' + a[1] +
               ' Q' + ((a[0] + b[0]) / 2) + ',' + ((a[1] + b[1]) / 2 + 3.5) + ' ' + b[0] + ',' + b[1] + '"/>';
        }
        s += '<path style="' + WR + '" d="M122,32 h30 M132,26 h16"/>';             /* 远处的云带 */
        return s;
      })()
    },

    /* 黄金海岸：冲浪海岸的天际线（邮戳） + 观景台玻璃前的少年（便签） */
    goldcoast: {
      /* 尺寸按内圆 r≈34（圆心 62,62）收进：最高的那栋楼立在沙滩上，海在楼下 */
      stamp:
        '<path class="sil" d="M55.3,29.5 h1.8 v6.5 h-1.8 Z"/>' +                    /* 塔尖天线 */
        '<path class="sil" fill-rule="evenodd" d="M50.5,72 L52.5,38.5 H59.5 L61.5,72 Z' +
          ' M54.6,44 h4.8 v2.6 h-4.8 Z M54.9,50.5 h4.2 v2.6 h-4.2 Z' +
          ' M55.2,57 h3.6 v2.6 h-3.6 Z"/>' +                                        /* 最高的那栋楼 */
        '<path class="sil" fill-rule="evenodd" d="M39.5,72 V50 H47.5 V72 Z' +
          ' M41.7,53.5 h4 v2.8 h-4 Z M41.7,59.5 h4 v2.8 h-4 Z"/>' +                 /* 左侧楼 */
        '<path class="sil" fill-rule="evenodd" d="M65,72 V45.5 H73 V72 Z' +
          ' M67.2,49.5 h3.6 v2.8 h-3.6 Z M67.2,55.5 h3.6 v2.8 h-3.6 Z"/>' +         /* 右侧楼 */
        '<path class="sil" d="M76,72 V56 H83 V72 Z"/>' +                            /* 更远的矮楼 */
        '<path class="sil" d="M36.5,72 H85.5 V75.5 H36.5 Z"/>' +                    /* 沙滩台基 */
        '<path class="wv" d="M76,37 q4,-4 8,0" style="opacity:.8"/>' +              /* 一只海鸥 */
        '<path class="wv" d="M40,87 q7,-3.4 14,0 t14,0 t14,0"/>' +                  /* 海 */
        '<path class="wv" d="M46,93 q5.3,-2.8 10.6,0 t10.6,0 t10.6,0"/>',
      note:
        /* 观景台的玻璃前：少年站在落地窗边，沿岸的楼渐远渐小，海岸线弯向天边 */
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.7;stroke-linejoin:round;opacity:.75" d="M10,12 H180 V102 H10 Z"/>' +      /* 落地窗框 */
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;opacity:.5" d="M67,12 V102 M124,12 V102"/>' +                            /* 窗棂 */
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;opacity:.45" d="M14,34 H140 M164,34 H176"/>' +      /* 海平线 */
        '<path style="fill:rgba(51,69,94,.1);stroke:var(--ink);stroke-width:1.5;stroke-linejoin:round;opacity:.65" d="M20,88 V58 H28 V88 Z' +
          ' M31,79 V44 H40 V79 Z M43,71 V54 H50 V71 Z M53,65.5 V50 H58 V65.5 Z M72,55 V47 H76 V55 Z"/>' +                                   /* 沿岸的高楼 */
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;opacity:.5" d="M35.5,44 V39 M22.5,63 h3.5 M22.5,68 h3.5' +
          ' M22.5,73 h3.5 M33.5,50 h4 M33.5,56 h4 M33.5,62 h4 M33.5,68 h4 M45,58.5 h3 M45,64 h3"/>' +                                       /* 天线与窗线 */
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.6;stroke-linecap:round;opacity:.7" d="M16,98 C42,74 78,46 134,38"/>' +     /* 弯向天边的海岸线 */
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;opacity:.5" d="M26,100 C50,78 84,52 136,42"/>' +    /* 沙滩边的浪线 */
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;opacity:.5" d="M100,72 q6,-2.6 12,0 t12,0' +
          ' M114,56 q5,-2.4 10,0 t10,0 M84,88 q6,-2.6 12,0 t12,0"/>' +                                                                      /* 海面的波纹 */
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;opacity:.55" d="M34,24 q4,-4 8,0 M44,27 q3.5,-3.5 7,0"/>' + /* 两只海鸥 */
        '<circle cx="151" cy="30" r="4.4" style="fill:rgba(51,69,94,.1);stroke:var(--ink);stroke-width:1.6;opacity:.8"/>' +                 /* 少年：头 */
        '<path style="fill:rgba(51,69,94,.1);stroke:var(--ink);stroke-width:1.6;stroke-linejoin:round;opacity:.8" d="M145,39 q6,-4.4 12,0 l1,24 h-14 Z"/>' + /* 背影 */
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.6;stroke-linecap:round;opacity:.8" d="M148,63 L147,93 M154,63 L155,93 M147,93 h-3.5 M155,93 h3.5"/>' + /* 站着的腿 */
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;opacity:.35" d="M141,97 h22"/>'                     /* 脚下的影子 */
    },

    /* 南非：桌山上的滑翔伞（邮戳） + 好望角指向全世界的路牌（便签） */
    southafrica: {
      stamp:
        '<path class="sil" d="M46,40 q16,-10 32,0 q-16,-4.5 -32,0 Z"/>' +          /* 伞翼 */
        '<path class="wv" d="M48.5,40 L60.5,50.5 M75.5,40 L63.5,50.5" style="opacity:.8"/>' + /* 伞绳 */
        '<circle class="sil" cx="62" cy="52.5" r="2.6"/>' +                        /* 吊在风里的人 */
        '<path class="sil" d="M32,78 L46,59 L49,57 L75,57 L78,59 L92,78 Z"/>' +    /* 桌山平顶 */
        '<path class="wv" d="M42,85 q7,-3.4 14,0 t14,0 t14,0"/>' +                 /* 大西洋 */
        '<path class="wv" d="M48,91 q5.3,-2.8 10.6,0 t10.6,0 t10.6,0"/>',
      note:
        /* 好望角的路牌：木柱上钉满指向全世界的箭头，最亮的那块——BEIJING 12 933 KM */
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;opacity:.5" d="M138,14 h26 M146,20 h14"/>' +   /* 海角的云 */
        '<path style="fill:rgba(51,69,94,.1);stroke:var(--ink);stroke-width:1.6;stroke-linejoin:round;opacity:.75" d="M90,16 h15 v12 h-15 Z"/>' + /* 柱顶的方块 */
        '<circle style="fill:none;stroke:var(--ink);stroke-width:1.5;opacity:.6" cx="97.5" cy="22" r="3.2"/>' +                        /* 方块上的圆徽 */
        '<path style="fill:rgba(51,69,94,.1);stroke:var(--ink);stroke-width:1.6;stroke-linejoin:round;opacity:.75" d="M94,28 h7 v80 h-7 Z"/>' +   /* 木柱 */
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linejoin:round;opacity:.5" d="M101,32 H154 L163,37.5 L154,43 H101 Z"/>' +   /* 别的箭头（右） */
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linejoin:round;opacity:.5" d="M94,48 H48 L39,53.5 L48,59 H94 Z"/>' +        /* 别的箭头（左） */
        '<path style="fill:rgba(51,69,94,.1);stroke:var(--ink);stroke-width:1.7;stroke-linejoin:round;opacity:.85" d="M94,64 H36 L24,72.5 L36,81 H94 Z"/>' + /* 最亮的那块 */
        '<text x="65" y="71.8" text-anchor="middle" style="font-family:Georgia,serif;font-size:7.5px;font-weight:600;letter-spacing:1.2px;fill:var(--ink);opacity:.8">BEIJING</text>' +
        '<text x="65" y="78.6" text-anchor="middle" style="font-family:Georgia,serif;font-size:5.5px;letter-spacing:.8px;fill:var(--ink);opacity:.7">12 933 KM</text>' +
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linejoin:round;opacity:.45" d="M101,88 H148 L156,93 L148,98 H101 Z"/>' +    /* 又一块（右） */
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;opacity:.4" d="M74,112 H126"/>'                              /* 脚下的影子 */
    },

    /* 新西兰：暗夜里的望远镜与星（邮戳） + 雪山湖上空的降落伞（便签） */
    newzealand: {
      stamp:
        '<path class="wv" d="M78,32 v6 M75,35 h6"/>' +                            /* 镜筒所指的星 */
        '<path class="wv" d="M88,47 v5 M85.5,49.5 h5" style="opacity:.8"/>' +
        '<path class="wv" d="M42,36 v5 M39.5,38.5 h5" style="opacity:.8"/>' +
        '<circle class="sil" cx="55" cy="29" r="1.2"/>' +                         /* 三粒星点 */
        '<circle class="sil" cx="92" cy="58" r="1.2"/>' +
        '<circle class="sil" cx="34" cy="52" r="1.2"/>' +
        '<path class="sil" d="M48.8,56.8 L70.8,34.8 L77.2,41.2 L55.2,63.2 Z"/>' + /* 指向星空的镜筒 */
        '<path class="sil" d="M64.9,39.9 L69.9,34.9 L68.1,33.2 L63.2,38.2 Z"/>' + /* 寻星镜 */
        '<path class="sil" d="M61,49 h4 v14 h-4 Z"/>' +                           /* 赤道仪立柱 */
        '<path class="wv" d="M63,63 L50,82 M63,63 L76,82 M63,63 V83"/>' +         /* 三脚架 */
        '<path class="wv" d="M40,88 q7,-3.4 14,0 t14,0 t14,0"/>' +                /* 蒂卡波湖 */
        '<path class="wv" d="M46,94 q5.3,-2.8 10.6,0 t10.6,0 t10.6,0"/>',
      note:
        /* 一万英尺上的一跃：伞衣悬着小小的人，脚下是云、雪山连脊和湖 */
        '<path style="fill:rgba(51,69,94,.1);stroke:var(--ink);stroke-width:1.7;stroke-linejoin:round;stroke-linecap:round;opacity:.8" d="M58,30 Q78,14 98,30 Q78,23 58,30 Z"/>' +   /* 伞衣 */
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;opacity:.55" d="M58,30 L74,50 M98,30 L82,50 M71,25.8 L77,50 M85,25.8 L79,50"/>' +             /* 伞绳 */
        '<circle style="fill:var(--ink);opacity:.7" cx="78" cy="52.6" r="1.9"/>' +                                                                                                    /* 悬着的人 */
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;opacity:.7" d="M78,54.5 V61"/>' +
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;opacity:.7" d="M78,56 L74.6,51.4 M78,56 L81.4,51.4"/>' +
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;opacity:.7" d="M78,61 L74.6,66.5 M78,61 L81.4,66.5"/>' +
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linejoin:round;stroke-linecap:round;opacity:.5" d="M140,50 q-3.4,0 -3.4,-2.9 q0,-2.7 3,-3 q0.6,-3.6 4.6,-3.6 q3,0 4.2,2.3 q0.9,-0.7 2.2,-0.7 q2.9,0 3.3,2.8 q2.8,0.3 2.8,2.5 q0,2.6 -3.2,2.6 Z"/>' +   /* 脚下的云 */
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linejoin:round;stroke-linecap:round;opacity:.45" d="M32,64 q-3.4,0 -3.4,-2.9 q0,-2.7 3,-3 q0.6,-3.6 4.6,-3.6 q3,0 4.2,2.3 q0.9,-0.7 2.2,-0.7 q2.9,0 3.3,2.8 q2.8,0.3 2.8,2.5 q0,2.6 -3.2,2.6 Z"/>' +
        '<path style="fill:rgba(51,69,94,.1);stroke:var(--ink);stroke-width:1.6;stroke-linejoin:round;stroke-linecap:round;opacity:.65" d="M2,106 V96 L18,86 L30,91 L46,77 L60,89 L74,84 L92,90 L110,78 L121,87 L136,82 L152,92 L168,86 L188,95 V106 Z"/>' +                     /* 雪山连脊 */
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;opacity:.5" d="M40,112 q9,-3.6 18,0 t18,0 t18,0"/>' +                                          /* 山脚的湖 */
        '<path style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;opacity:.4" d="M104,116 q8,-3.2 16,0 t16,0"/>'
    }
  };

  /* 邮戳：双环 + 上下弧文字 + 地点剪影/徽记 + 菱形分隔 + 油墨磨损 */
  function stampSVG(geo){
    return '<div class="dstamp"><svg viewBox="0 0 124 124">' +
      '<defs>' +
        '<path id="arcT" d="M19,62 A43,43 0 0 1 105,62"/>' +
        '<path id="arcB" d="M13.5,62 A48.5,48.5 0 0 0 110.5,62"/>' +
        '<filter id="stgr" x="-12%" y="-12%" width="124%" height="124%">' +
          '<feTurbulence type="fractalNoise" baseFrequency=".5" numOctaves="2" seed="7" result="n"/>' +
          '<feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 8 8 8 0 -2.8" result="m"/>' +
          '<feComposite in="SourceGraphic" in2="m" operator="in"/>' +
        '</filter>' +
      '</defs>' +
      '<g class="stg" filter="url(#stgr)">' +
        '<circle class="r1" cx="62" cy="62" r="59"/>' +
        '<circle class="r2" cx="62" cy="62" r="55.5"/>' +
        '<circle class="r2" cx="62" cy="62" r="36"/>' +
        '<text class="st"><textPath href="#arcT" startOffset="50%" text-anchor="middle">' + esc(geo.stampTop) + '</textPath></text>' +
        '<text class="st sb"><textPath href="#arcB" startOffset="50%" text-anchor="middle">' + esc(geo.stampBottom) + '</textPath></text>' +
        '<path class="dia" d="M16,58.4 l2.9,3.6 -2.9,3.6 -2.9,-3.6 Z"/>' +
        '<path class="dia" d="M108,58.4 l2.9,3.6 -2.9,3.6 -2.9,-3.6 Z"/>' +
        (geo.emblem
          ? '<g class="emb">' + EMBLEM[geo.emblem].stamp + '</g>'
          : '<g transform="' + geo.silT + '"><path class="sil" d="' + geo.stamp + '"/></g>') +
      '</g></svg></div>';
  }
  function clipSVG(cls){
    return '<svg class="clip ' + (cls || "") + '" viewBox="0 0 22 46"><path d="M11,4 a6,6 0 0,1 6,6 V34 a4.5,4.5 0 0,1 -9,0 V12"/></svg>';
  }
  /* 铅笔山线稿（首屏右上角） */
  function mountainSVG(){
    return '<svg class="dmtn" viewBox="0 0 220 90">' +
      '<path d="M4,82 L54,26 76,52 96,18 128,58 150,34 178,64 216,30"/>' +
      '<path d="M60,40 l10,14 M100,30 l12,20 M156,44 l10,14" opacity=".55"/>' +
      '</svg>';
  }
  /* 植物线稿（引言旁） */
  function branchSVG(){
    return '<svg class="dbranch" viewBox="0 0 70 120">' +
      '<path d="M35,116 C33,84 36,54 34,10"/>' +
      '<path d="M34,22 C26,26 20,24 14,30 M34,36 C42,40 48,38 55,44 M34,52 C25,56 20,54 13,61 M34,68 C43,72 48,70 56,77 M34,84 C26,88 22,86 15,93"/>' +
      '</svg>';
  }
  /* 便签标题旁的花体 */
  function flourishSVG(){
    return '<svg class="flor" viewBox="0 0 64 18"><path d="M3,12 C12,3 18,14 27,8 C33,4 34,13 41,10 C48,7 52,12 61,6 M46,4 a2.6,2.6 0 1 1 .1,0"/></svg>';
  }

  function render(){
    document.documentElement.lang = (lang === "zh") ? "zh-CN" : "en";
    document.title = t(D.name) + " · " + (lang === "zh" ? "旅行手账" : "Travel Diary") + " | Chengyu (Harry) Yu";
    document.getElementById("backText").textContent = (lang === "zh") ? "回到地图" : "Back to the map";
    document.getElementById("navTitle").textContent = (lang === "zh") ? "旅行手账" : "Travel Diary";
    document.getElementById("dlang").textContent = (lang === "zh") ? "EN" : "中";

    var d = D.diary;
    var snapCls = ["sa", "sb2", "sc", "sd", "se", "sf", "sg"];
    function ratio(ar){ var p = String(ar || "3/2").split("/"); return parseFloat(p[0]) / parseFloat(p[1]) || 1.5; }
    var html =
      '<section class="dhero">' +
        '<div class="dhero-copy">' +
          '<h1>' + esc(t(D.name)) +
            (lang === "zh" ? '<span class="hen">' + esc(D.name.en) + '</span>' : "") +
            (D.region ? '<span class="hreg">' + esc(D.region) + '</span>' : "") + '</h1>' +
          '<p class="dsub">' + esc(t(D.sub)) + '</p>' +
          '<p class="dintro">' + esc(t(D.intro)) + '</p>' +
          stampSVG(D.geo) +
        '</div>' +
        '<div class="dhero-photos">' +
          mountainSVG() +
          '<figure class="print main' + (ratio(D.cover.ar) < 1 ? " tall" : "") + '">' +
            '<span class="tape tl"></span><span class="tape tr"></span>' +
            pic(D.cover.src, D.cover.ar, t(D.name)) +
            '<figcaption class="pcap">' + esc(D.cover.cap) + '</figcaption></figure>' +
          '<figure class="print pola">' + clipSVG("pclip") +
            pic(D.polaroid.src, D.polaroid.ar, "") +
            '<figcaption class="pcap">' + esc(D.polaroid.cap) + '</figcaption></figure>' +
        '</div>' +
      '</section>' +

      '<section class="notebook">' +
        '<p class="mo-label">' + esc(D.momentsLabel) + '</p>' +
        '<div class="dwall' + (D.strip.length > 6 ? " rows2" : "") + '">' +
          /* 超过 6 张排成 4+3 咬合双排（一排挤不下，也更像贴出来的） */
          D.strip.map(function(s, i){
            var brk = (D.strip.length > 6 && i === 4) ? '<div class="wbreak"></div>' : "";
            var row2 = (D.strip.length > 6 && i >= 4) ? " row2" : "";
            return brk + '<figure class="snap ' + snapCls[i % snapCls.length] + row2 + '">' +
              '<span class="tape ' + (i % 2 ? "tcorner" : "tc") + '"></span>' +
              pic(s.src, s.ar, t(s.cap)) +
              '<figcaption class="scap">' + esc(t(s.cap)) + '</figcaption></figure>';
          }).join("") +
          '<div class="kraft">' + esc(t(D.tapeLabel)) + '</div>' +
        '</div>' +

        '<div class="diaryrow">' +
          '<aside class="dnote">' +
            '<span class="tape ntl"></span>' + clipSVG("nclip") +
            '<div class="dnote-in">' +
              '<h3>' + esc(t(d.label)) + flourishSVG() + '</h3>' +
              '<p class="dplace">' + esc(d.place) + '</p>' +
              '<svg class="dmap' + (D.geo.emblem ? " demb" : "") + '" viewBox="' + D.geo.vb + '">' +
                (D.geo.emblem ? EMBLEM[D.geo.emblem].note
                  : '<path class="coast" d="' + D.geo.note + '"/>' +
                    '<circle class="dot" cx="' + D.geo.dot.x + '" cy="' + D.geo.dot.y + '" r="4"/>' +
                    '<circle class="halo" cx="' + D.geo.dot.x + '" cy="' + D.geo.dot.y + '" r="9"/>') +
              '</svg>' +
            '</div>' +
          '</aside>' +
          '<article class="dsheet">' +
            '<h2 class="dtitle">' + esc(t(d.title)) + '</h2>' +
            '<p class="ddate">' + esc(t(d.date)) + '</p>' +
            '<div class="dbody">' +
              d.body[lang].map(function(p){
                /* 「我记得…」的排比自成一栏；极短的句子独立成一拍 */
                var words = p.trim().split(/\s+/).length;
                var short = /[一-龥]/.test(p) ? p.length <= 10 : words <= 4;
                var cls = /^(我(也)?记得|I (also )?remember)/.test(p) ? "recall"
                        : (short ? "beat" : "");
                return '<p' + (cls ? ' class="' + cls + '"' : "") + '>' + esc(p) + '</p>';
              }).join("") +
              '<p class="dquote">' + esc(d.quote) + '</p>' +
            '</div>' +
            branchSVG() +
          '</article>' +
        '</div>' +
      '</section>';

    document.getElementById("page").innerHTML = html;
    document.getElementById("footBack").textContent = (lang === "zh")
      ? "← 回到地图 · Back to the map" : "← Back to the map";
    /* 骨架屏：图片加载完成后停掉微光 */
    document.querySelectorAll("#page img").forEach(function(img){
      if(img.complete && img.naturalWidth) img.classList.add("ld");
      else img.addEventListener("load", function(){ img.classList.add("ld"); }, { once: true });
    });
    wireLightbox();
  }

  /* ---- 灯箱：手账里的每张照片都能点开 ----
     桌面：←/→ 翻页、Esc 或点空白关闭；触屏：横滑翻页、竖滑关闭、底部返回 */
  var lb = null, lbList = [], lbIdx = 0;
  function lbBuild(){
    lb = document.createElement("div");
    lb.className = "dlb";
    lb.hidden = true;
    lb.innerHTML =
      '<button class="dlb-x" aria-label="Close">&times;</button>' +
      '<button class="dlb-nav dlb-prev" aria-label="Previous">&#8249;</button>' +
      '<button class="dlb-nav dlb-next" aria-label="Next">&#8250;</button>' +
      '<figure class="dlb-print"><img alt=""><figcaption class="dlb-cap"></figcaption></figure>' +
      '<button class="dlb-back"></button>';
    document.body.appendChild(lb);
    lb.querySelector(".dlb-x").addEventListener("click", lbClose);
    lb.querySelector(".dlb-back").addEventListener("click", lbClose);
    lb.querySelector(".dlb-prev").addEventListener("click", function(e){ e.stopPropagation(); lbNav(-1); });
    lb.querySelector(".dlb-next").addEventListener("click", function(e){ e.stopPropagation(); lbNav(1); });
    lb.addEventListener("click", function(e){ if(e.target === lb) lbClose(); });
    document.addEventListener("keydown", function(e){
      if(lb.hidden) return;
      if(e.key === "Escape") lbClose();
      else if(e.key === "ArrowLeft") lbNav(-1);
      else if(e.key === "ArrowRight") lbNav(1);
    });
    var sw = null;
    lb.addEventListener("pointerdown", function(e){ sw = { x: e.clientX, y: e.clientY }; }, { passive: true });
    lb.addEventListener("pointerup", function(e){
      if(!sw) return;
      var dx = e.clientX - sw.x, dy = e.clientY - sw.y;
      sw = null;
      if(Math.abs(dy) > 80 && Math.abs(dy) > Math.abs(dx) * 1.5) lbClose();
      else if(Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) lbNav(dx < 0 ? 1 : -1);
    }, { passive: true });
  }
  function lbOpen(i){
    if(!lb) lbBuild();
    lbIdx = (i + lbList.length) % lbList.length;
    var it = lbList[lbIdx];
    var img = lb.querySelector("img");
    img.src = it.src + ".webp";
    img.alt = it.cap || "";
    lb.querySelector(".dlb-cap").textContent = it.cap || "";
    lb.querySelector(".dlb-back").textContent = (lang === "zh") ? "← 返回" : "← Back";
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(function(){ lb.classList.add("show"); });
  }
  function lbClose(){
    if(!lb || lb.hidden) return;
    lb.classList.remove("show");
    document.body.style.overflow = "";
    setTimeout(function(){ lb.hidden = true; }, 280);
  }
  function lbNav(d){ lbOpen(lbIdx + d); }
  function wireLightbox(){
    lbList = [{ src: D.cover.src, cap: t(D.cover.cap) }, { src: D.polaroid.src, cap: t(D.polaroid.cap) }]
      .concat(D.strip.map(function(s){ return { src: s.src, cap: t(s.cap) }; }));
    /* DOM 顺序 = 列表顺序：主相纸、拍立得、照片墙 */
    document.querySelectorAll(".dhero-photos .print, .dwall .snap").forEach(function(f, i){
      f.classList.add("openable");
      f.addEventListener("click", function(){ lbOpen(i); });
    });
  }

  document.addEventListener("DOMContentLoaded", function(){
    if(!D){ location.replace("../#mapWrap"); return; }
    render();
    document.getElementById("dlang").addEventListener("click", function(){
      lang = (lang === "zh") ? "en" : "zh";
      try { localStorage.setItem(KEY, lang); } catch(e){}
      render();
    });
  });
})();
