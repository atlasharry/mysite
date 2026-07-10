(function(){
  var W = 1000, H = 500, NS = "http://www.w3.org/2000/svg";
  var PHOTO_CENTER_X = 811;   /* 照片最密集经度（约 112°E，中国+东京）的投影 x */
  var DEFAULT = { x: 0, y: 10, w: 1000, h: 400 };
  var view = { x: DEFAULT.x, y: DEFAULT.y, w: DEFAULT.w, h: DEFAULT.h };
  var current = null, card = null, svg = null, pinLayer = null, zoomed = false, resetBtn = null, outline = null;
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var userTouched = false;   /* 用户碰过地图就不再做引导性动画 */

  /* 默认视图随舞台宽高比自适应：纬度铺满、经度裁切并居中照片密集区。
     竖屏手机 -> 只剩左右滑动；宽屏 -> 约 1.2-1.3 倍放大的沉浸全幅 */
  function computeDefault(){
    var wrap = document.getElementById("mapWrap");
    var aspect = wrap && wrap.clientHeight ? wrap.clientWidth / wrap.clientHeight : 2.5;
    var h = 400, w = h * aspect, y = 10;
    if(w > 1000){ w = 1000; h = w / aspect; y = 10 + (400 - h) / 2; }
    var x = Math.max(-20, Math.min(1020 - w, PHOTO_CENTER_X - w / 2));
    return { x: x, y: y, w: w, h: h };
  }

  /* 图钉屏幕尺寸恒定：把期望像素折算成当前 viewBox 单位（修手机上 5px 小图钉的根因） */
  function pinScale(vw){
    var mapPx = (svg && svg.clientWidth) || 800;
    return ((vw || view.w) / mapPx) * 1.35;
  }

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

  /* ---- 聚合：按屏幕距离（26px）分组，任何缩放级别都不会挤成一团 ---- */
  function screenClusters(){
    var mapPx = (svg && svg.clientWidth) || 800;
    var threshold = 26 * view.w / mapPx;   /* 26 屏幕像素折算成 viewBox 单位 */
    var groups = [];
    SITE.locations.forEach(function(loc){
      var p = proj(loc.lat, loc.lon);
      var g = null;
      for(var i = 0; i < groups.length; i++){
        var c = groups[i].center;
        if(Math.hypot(c[0]-p[0], c[1]-p[1]) < threshold){ g = groups[i]; break; }
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

  /* 模拟放大到 targetW 后，该组会拆成几个可点对象（子聚合数） */
  function subgroupCount(g, targetW){
    var mapPx = (svg && svg.clientWidth) || 800;
    var threshold = 26 * targetW / mapPx;
    var subs = [];
    g.pts.forEach(function(p){
      var s = null;
      for(var i = 0; i < subs.length; i++){
        if(Math.hypot(subs[i][0]-p[0], subs[i][1]-p[1]) < threshold){ s = subs[i]; break; }
      }
      if(!s) subs.push([p[0], p[1]]);
    });
    return subs.length;
  }

  /* ---- 选择卡：放大也分不开的近邻城市，弹出列表点选 ---- */
  var chooserEl = null;
  function closeChooser(){ if(chooserEl){ chooserEl.remove(); chooserEl = null; } }
  function openChooser(g, anchor){
    hideCard(); closeChooser();
    var wrap = document.getElementById("mapWrap");
    chooserEl = document.createElement("div");
    chooserEl.className = "pin-chooser";
    g.locs.forEach(function(loc){
      var btn = document.createElement("button");
      btn.textContent = I18N.t(loc.name);
      btn.addEventListener("click", function(e){
        e.stopPropagation();
        closeChooser();
        select(loc);
      });
      chooserEl.appendChild(btn);
    });
    var wr = wrap.getBoundingClientRect(), gr = anchor.getBoundingClientRect();
    chooserEl.style.left = (gr.left + gr.width/2 - wr.left) + "px";
    chooserEl.style.top = (gr.top - wr.top) + "px";
    wrap.appendChild(chooserEl);
    requestAnimationFrame(function(){ if(chooserEl) chooserEl.classList.add("show"); });
    setTimeout(function(){
      document.addEventListener("pointerdown", function outside(e){
        if(chooserEl && !chooserEl.contains(e.target)){ closeChooser(); }
        else if(chooserEl){ document.addEventListener("pointerdown", outside, { once: true }); }
      }, { once: true });
    }, 50);
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
    var w = Math.max(spanX*2.6, spanY*2.6*2.5, 90), h = w/2.5;
    var target = { x: cx - w/2, y: cy - h/2, w: w, h: h };
    zoomed = true;
    resetBtn.classList.add("show");
    if(svg) svg.classList.add("zoomed");
    hideCard(); closeChooser();
    loadDetail(function(){
      if(zoomed && outline) outline.setAttribute("d", WORLD_MAP_PATH_DETAIL);
    });
    renderPins(target.w);   /* 图钉按目标缩放比预先补偿 */
    animateTo(target, function(){ renderPins(); });   /* 到位后按新比例重新聚合 */
  }
  function resetZoom(){
    zoomed = false;
    resetBtn.classList.remove("show");
    hideCard(); closeChooser();
    if(svg) svg.classList.remove("zoomed");
    if(outline) outline.setAttribute("d", WORLD_MAP_PATH);
    DEFAULT = computeDefault();
    animateTo({ x: DEFAULT.x, y: DEFAULT.y, w: DEFAULT.w, h: DEFAULT.h }, function(){ renderPins(); });
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
    renderPins(w);
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
  function renderPins(wOverride){
    if(!pinLayer) return;
    pinLayer.innerHTML = "";
    var s = pinScale(wOverride);
    var mapPx = (svg && svg.clientWidth) || 800;
    screenClusters().forEach(function(g){
      if(g.locs.length === 1){
        pinLayer.appendChild(makePin(g.locs[0], s));
        return;
      }
      var c = document.createElementNS(NS, "g");
      c.setAttribute("class", "cluster");
      c.setAttribute("transform", "translate(" + g.center[0].toFixed(1) + "," + g.center[1].toFixed(1) + ") scale(" + s.toFixed(3) + ")");
      c.innerHTML = '<circle r="13"></circle><text>' + g.locs.length + '</text>';
      c.addEventListener("click", function(e){
        e.stopPropagation();
        /* 放大后能拆成多个可点对象就继续放大，拆不开（如成都/内江）弹选择卡 */
        var spanX = Math.max.apply(0, g.pts.map(function(p){ return p[0]; })) - Math.min.apply(0, g.pts.map(function(p){ return p[0]; }));
        var spanY = Math.max.apply(0, g.pts.map(function(p){ return p[1]; })) - Math.min.apply(0, g.pts.map(function(p){ return p[1]; }));
        var targetW = Math.max(spanX*2.6, spanY*2.6*2.5, 90);
        if(subgroupCount(g, targetW) >= 2) zoomTo(g);
        else openChooser(g, c);
      });
      c.addEventListener("mouseenter", function(){
        var names = g.locs.map(function(l){ return I18N.t(l.name); }).join(" · ");
        showCard(c, names, I18N.t(SITE.i18n.travel.zoom));
      });
      c.addEventListener("mouseleave", hideCard);
      pinLayer.appendChild(c);
    });
  }

  function build(){
    var wrap = document.getElementById("mapWrap");
    if(!wrap || !window.WORLD_MAP_PATH) return;
    wrap.innerHTML = ""; card = null;
    svg = document.createElementNS(NS, "svg");
    if(!zoomed){ DEFAULT = computeDefault(); view = { x: DEFAULT.x, y: DEFAULT.y, w: DEFAULT.w, h: DEFAULT.h }; }
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
      userTouched = true;
      if(!zoomed && view.w >= 990) return;   /* 只有完整全图才无需平移 */
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
      hideCard(); closeChooser();
    });
    function endPan(){
      panning = false;
      if(panMoved) renderPins();   /* 平移后按新视野重新聚合 */
    }
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
    resetBtn.textContent = I18N.t(SITE.i18n.travel.back);
    resetBtn.addEventListener("click", resetZoom);
    wrap.appendChild(resetBtn);
    renderPins();
  }

  /* 窗口尺寸/横竖屏变化：未放大时重算默认视图 */
  var rsTimer;
  addEventListener("resize", function(){
    clearTimeout(rsTimer);
    rsTimer = setTimeout(function(){
      if(!svg) return;
      if(!zoomed){
        DEFAULT = computeDefault();
        view = { x: DEFAULT.x, y: DEFAULT.y, w: DEFAULT.w, h: DEFAULT.h };
        setViewBox(view);
      }
      renderPins();
    }, 150);
  });

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

  /* ---- 宇宙缩放序列接管钩子（cosmos.js）：读取当前视野与图钉，交接时整体隐藏，
     滚回来原样恢复——真实地图状态全程不被改动 ---- */
  window.__MAPHOOK = {
    rect: function(){ return svg ? svg.getBoundingClientRect() : null; },
    view: function(){ return { x: view.x, y: view.y, w: view.w, h: view.h }; },
    path: function(){ return outline ? outline.getAttribute("d") : (window.WORLD_MAP_PATH || ""); },
    markers: function(){
      if(!svg) return [];
      var s = pinScale();
      return screenClusters().map(function(g){
        return { x: g.center[0], y: g.center[1], s: s, n: g.locs.length };
      });
    },
    hide: function(h){
      var wrap = document.getElementById("mapWrap"), panel = document.getElementById("locPanel");
      if(wrap) wrap.style.visibility = h ? "hidden" : "";
      if(panel) panel.style.visibility = h ? "hidden" : "";
      if(h){ hideCard(); closeChooser(); }
    }
  };

  /* 窄屏首次进入视野：地图向西轻摆一下再回位，暗示可以左右拖动 */
  var peeked = false;
  function peek(){
    if(peeked || userTouched || zoomed || reduced || !svg) return;
    if(innerWidth >= 760 || view.w >= 990) return;
    peeked = true;
    var home = { x: view.x, y: view.y, w: view.w, h: view.h };
    var dx = -Math.min(60, home.x + 20);
    var t0 = performance.now(), DUR = 1900;
    function step(now){
      if(userTouched || zoomed){ view = home; setViewBox(view); return; }
      var u = Math.min(1, (now - t0) / DUR);
      view = { x: home.x + dx * Math.sin(Math.PI * u), y: home.y, w: home.w, h: home.h };
      setViewBox(view);
      if(u < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  document.addEventListener("DOMContentLoaded", function(){
    build();
    I18N.onChange(function(){ build(); renderPanel(); });
    var wrapEl = document.getElementById("mapWrap");
    if(wrapEl){
      var mo = new IntersectionObserver(function(en){
        if(en[0].isIntersecting){ mo.disconnect(); setTimeout(peek, 700); }
      }, { threshold: 0.55 });
      mo.observe(wrapEl);
    }
  });
})();
