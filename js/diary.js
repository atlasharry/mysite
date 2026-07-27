/* 旅行手账渲染：?loc=xxx 从 DIARY 取数据；语言与主站共享 site-lang。
   地图/邮戳/定位点由 DIARY[loc].geo 按地点配置（Natural Earth 50m 提取） */
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


  /* 邮戳：双环 + 上下弧文字 + 地点剪影 + 菱形分隔 + 油墨磨损（geo 按地点配置） */
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
        '<g transform="' + geo.silT + '">' +
          '<path class="sil" d="' + geo.stamp + '"/>' +
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
          stampSVG(D.geo) +
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
              '<svg class="dmap" viewBox="' + D.geo.vb + '"><path class="coast" d="' + D.geo.note + '"/>' +
                '<circle class="dot" cx="' + D.geo.dot.x + '" cy="' + D.geo.dot.y + '" r="4"/>' +
                '<circle class="halo" cx="' + D.geo.dot.x + '" cy="' + D.geo.dot.y + '" r="9"/></svg>' +
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
