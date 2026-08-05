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
