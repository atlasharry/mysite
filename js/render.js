(function(){
  function $(s){ return document.querySelector(s); }
  function t(o){ return I18N.t(o); }
  function esc(s){ var d = document.createElement("div"); d.textContent = s == null ? "" : String(s); return d.innerHTML; }
  function pic(base, alt){
    return '<picture><source srcset="' + base + '.webp" type="image/webp">' +
      '<img src="' + base + '.jpg" alt="' + esc(alt) + '" loading="lazy"></picture>';
  }

  /* ---- 共用：大图滑动组件（Swiper 驱动：方向锁定、触摸物理、中心舞台） ---- */
  function createViewer(items, opts){
    opts = opts || {};
    var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    var v = document.createElement("div");
    v.className = "viewer" + (opts.small ? " small" : "");
    v.innerHTML = '<div class="viewer-main swiper"><div class="swiper-wrapper"></div>' +
      '<button class="vw-arr vw-prev" aria-label="Previous"><span>‹</span></button>' +
      '<button class="vw-arr vw-next" aria-label="Next"><span>›</span></button></div>' +
      '<div class="vw-dock"></div><p class="vw-cap"></p>';
    var wrapper = v.querySelector(".swiper-wrapper"),
        dock = v.querySelector(".vw-dock"), cap = v.querySelector(".vw-cap");
    items.forEach(function(it, i){
      var s = document.createElement("div");
      s.className = "swiper-slide";
      s.innerHTML = '<img src="' + it.src + '.webp" loading="lazy" alt=""' +
        (it.ar ? ' style="aspect-ratio:' + it.ar + '"' : "") + '>';
      wrapper.appendChild(s);
      var th = document.createElement("img");
      th.src = it.src + "-thumb.webp"; th.loading = "lazy"; th.className = "vw-th"; th.alt = "";
      th.addEventListener("click", function(e){ e.stopPropagation(); sw.slideTo(i); });
      dock.appendChild(th);
    });
    function update(idx){
      var ths = dock.querySelectorAll(".vw-th");
      ths.forEach(function(t2, k){ t2.classList.toggle("on", k === idx); });
      var active = ths[idx];
      if(active) dock.scrollTo({ left: active.offsetLeft - dock.clientWidth/2 + active.clientWidth/2, behavior: "smooth" });
      var c = items[idx] ? (items[idx].cap || "") : "";
      cap.textContent = c; cap.style.display = c ? "" : "none";
    }
    var sw = new Swiper(v.querySelector(".swiper"), {
      slidesPerView: "auto",
      centeredSlides: true,
      spaceBetween: 18,
      grabCursor: true,
      slideToClickedSlide: true,   /* 点侧边图滑过去 */
      threshold: 6,                /* 微小抖动不触发 */
      touchAngle: 30,              /* 手势偏竖向时放行页面滚动 */
      touchReleaseOnEdges: true,
      resistanceRatio: .65,
      speed: reduced ? 0 : 520,
      on: { slideChange: function(){ update(this.activeIndex); } }
    });
    /* 点击当前居中的图 -> 大图 */
    wrapper.addEventListener("click", function(e){
      var slide = e.target.closest(".swiper-slide");
      if(!slide) return;
      var i = Array.prototype.indexOf.call(wrapper.children, slide);
      if(i === sw.activeIndex){
        openLightbox(items.map(function(x){ return { src: x.src + ".webp", cap: x.cap }; }), i);
      }
    });
    v.querySelector(".vw-prev").addEventListener("click", function(){ sw.slidePrev(); });
    v.querySelector(".vw-next").addEventListener("click", function(){ sw.slideNext(); });
    /* 图片加载后刷新布局，保证初始居中精确 */
    wrapper.querySelectorAll("img").forEach(function(im){
      im.addEventListener("load", function(){ sw.update(); });
    });
    update(0);
    return v;
  }

  /* ---- hero 板块卡片栏 ---- */
  function renderHeroCards(){
    var box = $("#heroCards"); if(!box) return;
    box.innerHTML = "";
    SITE.heroCards.forEach(function(c, i){
      var a = document.createElement("a");
      a.className = "hero-card hc-" + i;
      a.href = c.href;
      a.innerHTML = '<span class="hc-frame"><img src="' + c.img + '-thumb.webp" alt="' + esc(t(c.label)) + '"></span>' +
        '<span class="hc-label">' + esc(t(c.label)) + '<span class="arr">→</span></span>' +
        '<span class="hc-tag">' + esc(t(c.tag)) + '</span>';
      box.appendChild(a);
    });
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
          (f.stills.length ? '<p class="sheet-label">' + esc(t(SITE.i18n.films.stills)) + '</p><div class="sheet-stills"></div>' : "") +
        '</div></div>';
    if(f.stills.length){
      var viewer = createViewer(f.stills.map(function(s){ return { src: s.src, ar: s.ar, cap: "" }; }), { small: true });
      ov.querySelector(".sheet-stills").appendChild(viewer);
    }
    document.body.appendChild(ov);
    lockScroll();
    function closeSheet(){ ov.remove(); unlockScroll(); }
    ov.querySelector(".sheet-close").addEventListener("click", closeSheet);
    ov.addEventListener("click", function(e){ if(e.target === ov) closeSheet(); });
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
      t(ex.statement).split("\n").map(function(p){ return "<p>" + esc(p) + "</p>"; }).join("") +
      '<a class="map-cue" href="#mapWrap"><span>' + esc(t(SITE.i18n.travel.goto)) + '</span><span class="story-arrow" aria-hidden="true">↓</span></a>';
    wall.innerHTML = "";
    /* 第一排：横-竖-横（竖幅居中），第二排：竖-横 */
    var rows = [[ex.works[1], ex.works[0], ex.works[2]], [ex.works[3], ex.works[4]]];
    rows.forEach(function(rowWorks){
      var row = document.createElement("div");
      row.className = "wall-row";
      rowWorks.forEach(function(w){
        var i = ex.works.indexOf(w);
        var fig = document.createElement("figure");
        fig.className = "artwork reveal";
        var parts = w.ar.split("/");
        var grow = parseFloat(parts[0]) / parseFloat(parts[1]);
        if(w === ex.works[0]) grow *= 1.55;   /* 第一排居中竖幅加权，作为视觉主角 */
        fig.style.flexGrow = grow.toFixed(3);
        fig.innerHTML = '<div class="frame"><span class="mat">' +
          '<picture><source srcset="' + w.src + '.webp" type="image/webp">' +
          '<img src="' + w.src + '.jpg" alt="' + esc(ex.titleEn + " " + w.num) + '" loading="lazy" style="aspect-ratio:' + w.ar + '"></picture>' +
          '</span></div>' +
          '<figcaption><span class="art-num">' + w.num + '</span></figcaption>';
        fig.querySelector(".frame").addEventListener("click", function(){
          openLightbox(ex.works.map(function(x){ return { src: x.src + ".webp", cap: ex.titleZh + " · " + ex.titleEn + " " + x.num }; }), i);
        });
        row.appendChild(fig);
      });
      wall.appendChild(row);
    });
    observeReveals(wall.parentElement);
  }

  /* ---- 星空：大图滑动画廊 ---- */
  var astroCanvasDone = false;
  function renderAstro(){
    var grid = $("#astroGrid"); if(!grid) return;
    if(!astroCanvasDone){
      var wrap = $("#astroWrap");
      var cv = document.createElement("canvas");
      wrap.appendChild(cv);
      createStarfield(cv, { density: 9000 });
      astroCanvasDone = true;
    }
    grid.innerHTML = "";
    if(!SITE.astro.length){
      grid.innerHTML = '<p class="empty-state reveal">' + esc(t(SITE.i18n.astro.empty)) + '</p>';
      observeReveals(grid);
      return;
    }
    var viewer = createViewer(SITE.astro.map(function(x){ return { src: x.src, ar: x.ar, cap: t(x.cap) }; }));
    viewer.classList.add("reveal");
    grid.appendChild(viewer);
    observeReveals(grid);
  }

  /* ---- 关于（左文右照） ---- */
  function renderAbout(){
    var box = $("#aboutBody"); if(!box) return;
    box.innerHTML = '<div class="about-main">' +
      '<div class="bio reveal">' +
      '<header class="titlecard"><span class="tc-num">01</span><span class="tc-line"></span>' +
      '<h2>' + esc(t(SITE.i18n.about.title)) + '<span class="tc-en">' + esc(t(SITE.i18n.about.alt)) + '</span></h2></header>' +
      '<p>' + esc(t(SITE.about.bio)) + '</p>' +
      '<div class="contact-row">' +
      '<a href="resume/" target="_blank" rel="noopener">' + esc(t(SITE.i18n.about.resume)) + '</a>' +
      SITE.about.contact.map(function(c){
        return '<a href="' + c.url + '" target="_blank" rel="noopener">' + esc(t(c.label)) + '</a>';
      }).join("") + '</div></div>' +
      '<figure class="about-photo reveal"><picture>' +
      '<source srcset="' + SITE.about.portrait + '.webp" type="image/webp">' +
      '<img src="' + SITE.about.portrait + '.jpg" alt="余城宇 Harry Yu" loading="lazy">' +
      '</picture></figure></div>';
    observeReveals(box);
    requestAnimationFrame(sizeAboutPhoto);
  }
  /* 照片高度 = 左栏（标题→按钮）高度，两端严格对齐 */
  function sizeAboutPhoto(){
    var left = document.querySelector("#about .bio"), ph = document.querySelector(".about-photo");
    if(!left || !ph) return;
    ph.style.height = (innerWidth < 760) ? "" : left.getBoundingClientRect().height + "px";
  }
  addEventListener("resize", sizeAboutPhoto);
  addEventListener("load", sizeAboutPhoto);

  /* ---- 渲染调度：后续任务往这里注册 ---- */
  var renderers = [renderHeroCards, renderFilms, renderResearch, renderExhibit, renderAstro, renderAbout];
  window.registerRenderer = function(fn){ renderers.push(fn); };
  function renderAll(){ renderers.forEach(function(fn){ fn(); }); }
  document.addEventListener("DOMContentLoaded", function(){
    renderAll();
    I18N.onChange(renderAll);
  });
})();
