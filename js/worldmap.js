(function(){
  var W = 1000, H = 500, NS = "http://www.w3.org/2000/svg";
  var DEFAULT = { x: 0, y: 10, w: 1000, h: 400 };
  var view = { x: DEFAULT.x, y: DEFAULT.y, w: DEFAULT.w, h: DEFAULT.h };
  var CLUSTER_DIST = 55;
  var current = null, card = null, svg = null, pinLayer = null, zoomed = false, resetBtn = null, outline = null;
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* 细节层懒加载：放大时换 50m 高精度大陆轮廓 */
  var detailLoading = false;
  function loadDetail(cb){
    if(window.WORLD_MAP_PATH_DETAIL){ cb(); return; }
    if(detailLoading) return;
    detailLoading = true;
    var s = document.createElement("script");
    s.src = "js/worldmap-detail.js";
    s.onload = cb;
    document.head.appendChild(s);
  }

  function proj(lat, lon){ return [(lon + 180)/360*W, (90 - lat)/180*H]; }

  /* ---- 聚合：投影距离小于阈值的图钉归为一组 ---- */
  function clusters(){
    var groups = [];
    SITE.locations.forEach(function(loc){
      var p = proj(loc.lat, loc.lon);
      var g = null;
      for(var i = 0; i < groups.length; i++){
        var c = groups[i].center;
        if(Math.hypot(c[0]-p[0], c[1]-p[1]) < CLUSTER_DIST){ g = groups[i]; break; }
      }
      if(g){
        g.locs.push(loc); g.pts.push(p);
        var sx = 0, sy = 0;
        g.pts.forEach(function(q){ sx += q[0]; sy += q[1]; });
        g.center = [sx/g.pts.length, sy/g.pts.length];
      } else {
        groups.push({ locs: [loc], pts: [p], center: p });
      }
    });
    return groups;
  }

  /* ---- hover 小卡片 ---- */
  function showCard(el, title, sub){
    var wrap = document.getElementById("mapWrap");
    if(!card){
      card = document.createElement("div");
      card.className = "pin-card";
      wrap.appendChild(card);
    }
    card.innerHTML = '<h5>' + title + '</h5>' + (sub ? '<p>' + sub + '</p>' : "");
    var wr = wrap.getBoundingClientRect();
    var gr = el.getBoundingClientRect();
    card.style.left = (gr.left + gr.width/2 - wr.left) + "px";
    card.style.top  = (gr.top - wr.top) + "px";
    requestAnimationFrame(function(){ card.classList.add("show"); });
  }
  function hideCard(){ if(card) card.classList.remove("show"); }

  /* ---- viewBox 平滑缩放 ---- */
  function setViewBox(v){ svg.setAttribute("viewBox", v.x.toFixed(1) + " " + v.y.toFixed(1) + " " + v.w.toFixed(1) + " " + v.h.toFixed(1)); }
  function animateTo(target, done){
    if(reduced){ view = target; setViewBox(view); if(done) done(); return; }
    var from = { x: view.x, y: view.y, w: view.w, h: view.h };
    var t0 = performance.now(), DUR = 850;
    function ease(p){ return p < .5 ? 4*p*p*p : 1 - Math.pow(-2*p + 2, 3)/2; }
    function step(now){
      var p = Math.min(1, (now - t0)/DUR), e = ease(p);
      view = {
        x: from.x + (target.x - from.x)*e, y: from.y + (target.y - from.y)*e,
        w: from.w + (target.w - from.w)*e, h: from.h + (target.h - from.h)*e
      };
      setViewBox(view);
      if(p < 1) requestAnimationFrame(step); else if(done) done();
    }
    requestAnimationFrame(step);
  }
  function zoomTo(group){
    var xs = group.pts.map(function(p){ return p[0]; }), ys = group.pts.map(function(p){ return p[1]; });
    var cx = (Math.min.apply(0,xs)+Math.max.apply(0,xs))/2, cy = (Math.min.apply(0,ys)+Math.max.apply(0,ys))/2;
    var spanX = Math.max.apply(0,xs)-Math.min.apply(0,xs), spanY = Math.max.apply(0,ys)-Math.min.apply(0,ys);
    var w = Math.max(spanX*2.4, spanY*2.4*2.5, 170), h = w/2.5;
    var target = { x: cx - w/2, y: cy - h/2, w: w, h: h };
    zoomed = true;
    renderPins(target.w / W);   /* 图钉按目标缩放比预先补偿，保证放大后屏幕尺寸不变 */
    resetBtn.classList.add("show");
    if(svg) svg.classList.add("zoomed");
    hideCard();
    loadDetail(function(){
      if(zoomed && outline) outline.setAttribute("d", WORLD_MAP_PATH_DETAIL);
    });
    animateTo(target);
  }
  function resetZoom(){
    zoomed = false;
    resetBtn.classList.remove("show");
    hideCard();
    if(svg) svg.classList.remove("zoomed");
    if(outline) outline.setAttribute("d", WORLD_MAP_PATH);
    animateTo({ x: DEFAULT.x, y: DEFAULT.y, w: DEFAULT.w, h: DEFAULT.h }, function(){ renderPins(1); });
  }

  /* 全图状态下点击任意位置：放大到该处 */
  function zoomToPoint(cx, cy){
    var w = 300, h = w / 2.5;
    var target = {
      x: Math.max(-40, Math.min(1040 - w, cx - w/2)),
      y: Math.max(0,   Math.min(420 - h,  cy - h/2)),
      w: w, h: h
    };
    zoomed = true;
    renderPins(w / W);
    resetBtn.classList.add("show");
    if(svg) svg.classList.add("zoomed");
    loadDetail(function(){
      if(zoomed && outline) outline.setAttribute("d", WORLD_MAP_PATH_DETAIL);
    });
    hideCard();
    animateTo(target);
  }

  /* ---- 图钉 / 聚合点渲染 ---- */
  function makePin(loc, s){
    var p = proj(loc.lat, loc.lon);
    var g = document.createElementNS(NS, "g");
    g.setAttribute("class", "pin");
    g.setAttribute("transform", "translate(" + p[0].toFixed(1) + "," + p[1].toFixed(1) + ") scale(" + s.toFixed(3) + ")");
    g.innerHTML = '<circle class="halo" r="9"></circle><circle class="core" r="3.2"></circle>' +
      '<circle r="12" fill="transparent"></circle>';
    g.addEventListener("click", function(e){ e.stopPropagation(); select(loc); });
    g.addEventListener("mouseenter", function(){
      var n = (loc.items || []).length;
      showCard(g, I18N.t(loc.name), n ? n + " · " + I18N.t(SITE.i18n.travel.view) : I18N.t(SITE.i18n.travel.empty));
    });
    g.addEventListener("mouseleave", hideCard);
    return g;
  }
  function renderPins(scale){
    if(!pinLayer) return;
    pinLayer.innerHTML = "";
    var s = scale || view.w / W;
    if(zoomed){
      /* 放大后：显示全部独立图钉，按缩放比例保持屏幕尺寸 */
      SITE.locations.forEach(function(loc){ pinLayer.appendChild(makePin(loc, s)); });
      return;
    }
    clusters().forEach(function(g){
      if(g.locs.length === 1){
        pinLayer.appendChild(makePin(g.locs[0], 1));
      } else {
        var c = document.createElementNS(NS, "g");
        c.setAttribute("class", "cluster");
        c.setAttribute("transform", "translate(" + g.center[0].toFixed(1) + "," + g.center[1].toFixed(1) + ")");
        c.innerHTML = '<circle r="13"></circle><text>' + g.locs.length + '</text>';
        c.addEventListener("click", function(e){ e.stopPropagation(); zoomTo(g); });
        c.addEventListener("mouseenter", function(){
          var names = g.locs.map(function(l){ return I18N.t(l.name); }).join(" · ");
          showCard(c, names, I18N.t(SITE.i18n.travel.zoom));
        });
        c.addEventListener("mouseleave", hideCard);
        pinLayer.appendChild(c);
      }
    });
  }

  function build(){
    var wrap = document.getElementById("mapWrap");
    if(!wrap || !window.WORLD_MAP_PATH) return;
    wrap.innerHTML = ""; card = null;
    svg = document.createElementNS(NS, "svg");
    setViewBox(view);
    outline = document.createElementNS(NS, "path");
    outline.setAttribute("d", (zoomed && window.WORLD_MAP_PATH_DETAIL) ? WORLD_MAP_PATH_DETAIL : WORLD_MAP_PATH);
    outline.setAttribute("class", "map-outline");
    svg.appendChild(outline);
    pinLayer = document.createElementNS(NS, "g");
    svg.appendChild(pinLayer);
    /* 全图：点空白放大到该处；放大后：拖拽平移 */
    var panning = false, panMoved = false, panStart = null;
    svg.addEventListener("pointerdown", function(e){
      if(!zoomed) return;
      panning = true; panMoved = false;
      panStart = { x: e.clientX, y: e.clientY, vx: view.x, vy: view.y };
      try { svg.setPointerCapture(e.pointerId); } catch(err){}
    });
    svg.addEventListener("pointermove", function(e){
      if(!panning) return;
      var r = svg.getBoundingClientRect();
      var dxp = e.clientX - panStart.x, dyp = e.clientY - panStart.y;
      if(Math.abs(dxp) + Math.abs(dyp) > 6) panMoved = true;
      view.x = Math.max(-40, Math.min(1040 - view.w, panStart.vx - dxp * view.w / r.width));
      view.y = Math.max(0,   Math.min(420 - view.h,  panStart.vy - dyp * view.h / r.height));
      setViewBox(view);
      hideCard();
    });
    function endPan(){ panning = false; }
    svg.addEventListener("pointerup", endPan);
    svg.addEventListener("pointercancel", endPan);
    svg.addEventListener("click", function(e){
      if(panMoved){ panMoved = false; return; }   /* 拖拽结束的点击不触发 */
      if(zoomed) return;                          /* 放大后靠拖拽，不再点击跳位 */
      var r = svg.getBoundingClientRect();
      var cx = view.x + (e.clientX - r.left) / r.width * view.w;
      var cy = view.y + (e.clientY - r.top) / r.height * view.h;
      zoomToPoint(cx, cy);
    });
    wrap.appendChild(svg);
    resetBtn = document.createElement("button");
    resetBtn.className = "map-reset" + (zoomed ? " show" : "");
    resetBtn.textContent = "↩ " + I18N.t(SITE.i18n.travel.back);
    resetBtn.addEventListener("click", resetZoom);
    wrap.appendChild(resetBtn);
    renderPins();
  }

  function select(loc){
    current = loc;
    renderPanel();
    document.getElementById("locPanel").scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function renderPanel(){
    var panel = document.getElementById("locPanel");
    if(!current){ panel.hidden = true; return; }
    panel.hidden = false;
    var items = current.items || [];
    var html = '<h4>' + I18N.t(current.name) + '</h4>';
    if(!items.length){
      html += '<p class="loc-empty">' + I18N.t(SITE.i18n.travel.empty) + ' · Coming soon</p>';
    } else {
      html += '<div class="loc-grid">' + items.map(function(it, i){
        if(it.video){
          return '<video controls preload="metadata" src="' + it.video + '"></video>';
        }
        return '<a data-i="' + i + '"><img src="' + it.img + '-thumb.webp" loading="lazy" alt=""></a>';
      }).join("") + '</div>';
    }
    panel.innerHTML = html;
    var imgs = items.filter(function(it){ return it.img; });
    panel.querySelectorAll("a[data-i]").forEach(function(a){
      a.addEventListener("click", function(){
        openLightbox(imgs.map(function(it){ return { src: it.img + ".webp", cap: I18N.t(it.cap || current.name) }; }),
          parseInt(a.dataset.i, 10));
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function(){
    build();
    I18N.onChange(function(){ build(); renderPanel(); });
  });
})();
