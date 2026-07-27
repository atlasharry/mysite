/* 旅行手账渲染：?loc=xxx 从 DIARY 取数据；语言与主站共享 site-lang。
   挪威轮廓取自 Natural Earth 50m（build 时简化）：便签描边版含峡湾细节，邮戳为强简化剪影 */
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

  /* 挪威本土轮廓（Natural Earth 50m 提取，等距投影 + cos65° 校正，viewBox 168x200） */
  var NOR_NOTE = "M155.6,31.7 L154.8,29.3 L157.9,24.8 L156.7,21.7 L147.7,15.7 L143.7,18.1 L139.8,18.0 L136.9,21.4 L134.8,32.2 L129.5,38.2 L122.5,35.0 L119.1,37.4 L113.2,36.3 L108.1,27.9 L105.8,27.8 L104.5,28.7 L104.5,31.4 L98.3,31.7 L99.8,34.3 L97.4,39.0 L99.1,40.0 L97.4,41.8 L86.6,38.8 L84.1,47.8 L80.3,45.7 L76.8,48.9 L75.4,53.1 L72.5,56.1 L74.3,61.8 L68.0,70.4 L68.4,73.2 L62.3,75.9 L61.9,88.6 L56.5,99.6 L59.3,101.4 L59.2,107.0 L58.5,108.3 L53.6,107.4 L51.0,108.5 L47.0,114.7 L45.8,119.3 L47.8,134.7 L46.9,143.4 L51.5,149.0 L50.4,153.5 L47.7,154.4 L49.7,162.8 L49.0,168.1 L45.4,171.8 L43.8,176.0 L44.5,180.6 L42.9,186.7 L41.7,183.4 L38.3,182.2 L36.8,173.3 L34.1,184.9 L31.9,185.7 L30.1,183.3 L30.7,185.5 L21.1,198.1 L16.5,200.0 L13.5,199.9 L12.7,198.0 L11.8,199.3 L10.6,198.4 L11.3,196.3 L7.4,194.6 L4.4,190.8 L4.5,184.8 L7.7,187.0 L9.4,185.0 L7.7,185.8 L6.3,183.5 L6.7,180.4 L9.7,176.6 L1.7,182.5 L2.1,176.4 L3.6,174.1 L5.6,174.9 L8.4,172.5 L5.3,171.8 L8.0,166.1 L10.4,163.5 L10.5,167.4 L13.5,161.9 L8.0,164.4 L1.5,175.2 L1.9,168.4 L5.0,167.8 L2.4,166.6 L1.5,162.9 L4.8,159.2 L2.2,161.0 L1.3,160.0 L0.6,153.8 L12.1,152.2 L13.8,155.1 L13.8,153.0 L17.4,151.2 L15.8,149.8 L16.4,147.8 L15.3,151.6 L13.1,152.0 L10.9,150.0 L9.5,152.4 L2.7,152.8 L0.7,150.6 L0.6,147.8 L2.8,147.0 L0.1,143.5 L0.1,141.0 L3.6,140.7 L7.1,142.4 L11.8,141.1 L2.3,140.1 L1.5,136.7 L2.9,136.8 L6.5,132.7 L7.6,133.8 L10.8,132.9 L11.5,132.0 L7.9,132.9 L9.3,129.8 L17.7,130.5 L17.0,128.8 L20.3,127.3 L12.1,128.4 L12.1,127.0 L13.6,124.5 L17.7,122.1 L20.6,122.4 L24.0,126.2 L21.0,121.3 L21.7,119.4 L24.1,118.6 L22.3,116.2 L23.7,114.6 L27.3,114.7 L27.5,116.8 L31.0,114.3 L33.0,117.8 L37.8,116.8 L37.6,114.2 L41.8,111.5 L40.5,110.1 L42.3,108.5 L40.8,108.0 L38.8,109.7 L39.0,112.0 L33.3,116.0 L31.4,113.1 L30.3,113.4 L30.4,111.6 L36.6,102.1 L42.8,97.1 L43.0,96.0 L41.3,97.0 L42.5,93.6 L46.9,90.5 L47.8,91.9 L50.6,89.9 L51.8,88.0 L48.5,90.4 L46.6,87.7 L50.3,79.4 L52.5,78.6 L50.9,76.4 L59.0,73.4 L53.1,74.4 L53.7,68.1 L56.3,65.7 L58.5,65.8 L56.5,64.0 L59.5,60.8 L67.9,59.5 L61.6,58.5 L65.0,53.8 L69.1,57.3 L69.7,54.6 L66.9,53.4 L67.2,50.9 L64.3,52.5 L63.9,50.2 L66.1,47.7 L69.3,48.1 L67.3,46.3 L71.8,43.8 L73.7,49.1 L73.0,42.5 L81.8,40.8 L75.0,39.2 L80.7,35.1 L82.7,30.5 L85.3,29.6 L86.3,24.8 L90.2,27.2 L88.6,24.5 L91.1,23.4 L92.4,20.6 L95.6,19.7 L95.3,25.5 L97.3,19.4 L99.7,17.5 L98.3,26.8 L100.7,23.7 L102.4,24.0 L101.0,21.4 L101.6,18.0 L105.1,18.4 L106.8,16.5 L110.4,19.2 L109.2,15.7 L106.3,13.1 L112.6,12.7 L114.9,11.0 L119.3,17.0 L119.4,12.9 L126.2,6.0 L125.2,4.1 L127.7,1.4 L131.6,3.8 L132.7,2.7 L134.9,3.6 L129.9,13.4 L130.2,15.0 L131.3,14.6 L139.7,2.7 L141.1,3.6 L140.2,10.4 L142.8,8.9 L144.0,5.3 L146.4,4.4 L144.4,2.2 L146.7,0.0 L151.9,1.8 L151.4,4.1 L148.7,6.3 L151.1,6.5 L150.6,12.9 L154.7,3.5 L160.6,6.8 L162.7,5.9 L163.6,8.4 L168.2,10.6 L168.4,12.5 L164.0,14.8 L154.4,14.5 L159.7,17.1 L160.3,20.6 L162.8,21.0 L163.8,18.8 L165.0,20.9 L165.4,19.8 L167.9,20.0 L168.2,22.0 L167.4,23.9 L163.3,22.4 L162.8,25.4 L158.3,27.4 L155.6,31.7 Z";
  var NOR_STAMP = "M155.6,31.7 L156.7,21.7 L147.7,15.7 L136.9,21.4 L129.5,38.2 L113.2,36.3 L105.8,27.8 L98.3,31.7 L97.4,41.8 L86.6,38.8 L84.1,47.8 L80.3,45.7 L76.8,48.9 L68.4,73.2 L62.3,75.9 L61.9,88.6 L56.5,99.6 L59.2,107.0 L51.0,108.5 L47.0,114.7 L46.9,143.4 L51.5,149.0 L42.9,186.7 L36.8,173.3 L34.1,184.9 L30.1,183.3 L21.1,198.1 L11.8,199.3 L4.4,190.8 L4.5,184.8 L9.4,185.0 L6.3,183.5 L9.7,176.6 L1.7,182.5 L2.1,176.4 L13.5,161.9 L1.5,175.2 L4.8,159.2 L1.3,160.0 L0.6,153.8 L12.1,152.2 L13.8,155.1 L17.4,151.2 L16.4,147.8 L15.3,151.6 L2.7,152.8 L0.1,141.0 L11.8,141.1 L2.3,140.1 L1.5,136.7 L10.8,132.9 L9.3,129.8 L17.7,130.5 L20.3,127.3 L12.1,127.0 L17.7,122.1 L24.0,126.2 L21.0,121.3 L23.7,114.6 L31.0,114.3 L33.0,117.8 L41.8,111.5 L40.8,108.0 L33.3,116.0 L30.4,111.6 L42.5,93.6 L50.6,89.9 L46.6,87.7 L50.9,76.4 L59.0,73.4 L53.1,74.4 L53.7,68.1 L59.5,60.8 L67.9,59.5 L61.6,58.5 L65.0,53.8 L69.1,57.3 L63.9,50.2 L71.8,43.8 L73.7,49.1 L73.0,42.5 L81.8,40.8 L75.0,39.2 L86.3,24.8 L90.2,27.2 L88.6,24.5 L95.6,19.7 L95.3,25.5 L99.7,17.5 L98.3,26.8 L102.4,24.0 L101.6,18.0 L110.4,19.2 L106.3,13.1 L114.9,11.0 L119.3,17.0 L127.7,1.4 L134.9,3.6 L131.3,14.6 L139.7,2.7 L140.2,10.4 L142.8,8.9 L146.7,0.0 L151.9,1.8 L148.7,6.3 L150.6,12.9 L154.7,3.5 L168.2,10.6 L164.0,14.8 L154.4,14.5 L168.2,22.0 L163.3,22.4 L155.6,31.7 Z";

  /* 邮戳：双环 + 上下弧文字 + 挪威剪影 + 菱形分隔 + 油墨磨损 */
  function stampSVG(){
    return '<div class="dstamp"><svg viewBox="0 0 124 124">' +
      '<defs>' +
        '<path id="arcT" d="M16.5,62 A45.5,45.5 0 0 1 107.5,62"/>' +
        '<path id="arcB" d="M15.5,62 A46.5,46.5 0 0 0 108.5,62"/>' +
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
        '<text class="st"><textPath href="#arcT" startOffset="50%" text-anchor="middle">NORWAY</textPath></text>' +
        '<text class="st sb"><textPath href="#arcB" startOffset="50%" text-anchor="middle">LOFOTEN</textPath></text>' +
        '<path class="dia" d="M16,58.4 l2.9,3.6 -2.9,3.6 -2.9,-3.6 Z"/>' +
        '<path class="dia" d="M108,58.4 l2.9,3.6 -2.9,3.6 -2.9,-3.6 Z"/>' +
        '<g transform="translate(62,63) rotate(-38) scale(.28) translate(-84,-100)">' +
          '<path class="sil" d="' + NOR_STAMP + '"/>' +
        '</g>' +
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
    var snapCls = ["sa", "sb2", "sc", "sd", "se", "sf"];
    var html =
      '<section class="dhero">' +
        '<div class="dhero-copy">' +
          '<h1>' + esc(t(D.name)) + (lang === "zh" ? ' · ' + esc(D.name.en) : "") + '</h1>' +
          '<p class="dsub">' + esc(t(D.sub)) + '</p>' +
          '<p class="dintro">' + esc(t(D.intro)) + '</p>' +
          stampSVG() +
        '</div>' +
        '<div class="dhero-photos">' +
          mountainSVG() +
          '<figure class="print main"><span class="tape tl"></span><span class="tape tr"></span>' +
            pic(D.cover.src, D.cover.ar, t(D.name)) +
            '<figcaption class="pcap">' + esc(D.cover.cap) + '</figcaption></figure>' +
          '<figure class="print pola">' + clipSVG("pclip") +
            pic(D.polaroid.src, D.polaroid.ar, "") +
            '<figcaption class="pcap">' + esc(D.polaroid.cap) + '</figcaption></figure>' +
        '</div>' +
      '</section>' +

      '<section class="notebook">' +
        '<p class="mo-label">' + esc(D.momentsLabel) + '</p>' +
        '<div class="dwall">' +
          D.strip.map(function(s, i){
            return '<figure class="snap ' + snapCls[i % 6] + '">' +
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
              '<svg class="dmap" viewBox="-8 -8 184 216"><path class="coast" d="' + NOR_NOTE + '"/>' +
                '<circle class="dot" cx="56.2" cy="44.2" r="4"/>' +
                '<circle class="halo" cx="56.2" cy="44.2" r="9"/></svg>' +
            '</div>' +
          '</aside>' +
          '<article class="dsheet">' +
            '<h2 class="dtitle">' + esc(t(d.title)) + '</h2>' +
            '<p class="ddate">' + esc(t(d.date)) + '</p>' +
            '<div class="dbody">' +
              d.body[lang].map(function(p){
                var beat = p.length <= 8;
                return '<p' + (beat ? ' class="beat"' : "") + '>' + esc(p) + '</p>';
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
  }

  document.addEventListener("DOMContentLoaded", function(){
    if(!D){ location.replace("../#travel"); return; }
    render();
    document.getElementById("dlang").addEventListener("click", function(){
      lang = (lang === "zh") ? "en" : "zh";
      try { localStorage.setItem(KEY, lang); } catch(e){}
      render();
    });
  });
})();
