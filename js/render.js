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

  /* ---- 渲染调度：后续任务往这里注册 ---- */
  var renderers = [renderFilms];
  window.registerRenderer = function(fn){ renderers.push(fn); };
  function renderAll(){ renderers.forEach(function(fn){ fn(); }); }
  document.addEventListener("DOMContentLoaded", function(){
    renderAll();
    I18N.onChange(renderAll);
  });
})();
