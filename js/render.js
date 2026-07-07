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

  /* ---- 渲染调度：后续任务往这里注册 ---- */
  var renderers = [renderFilms, renderAigc, renderResearch, renderExhibit];
  window.registerRenderer = function(fn){ renderers.push(fn); };
  function renderAll(){ renderers.forEach(function(fn){ fn(); }); }
  document.addEventListener("DOMContentLoaded", function(){
    renderAll();
    I18N.onChange(renderAll);
  });
})();
