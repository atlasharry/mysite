(function(){
  /* 导航滚动态 */
  var nav = document.getElementById("nav");
  addEventListener("scroll", function(){ nav.classList.toggle("scrolled", scrollY > 40); }, { passive: true });

  /* reveal 入场（一次性） */
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("on"); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  window.observeReveals = function(root){
    (root || document).querySelectorAll(".reveal:not(.on)").forEach(function(el){ io.observe(el); });
  };

  /* 导航当前章节高亮 */
  var secIO = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(!e.isIntersecting) return;
      document.querySelectorAll(".nav nav a").forEach(function(a){
        a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id);
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  /* 滚动锁（可重入；iOS 需 position:fixed 才能真正锁住背景） */
  var lockCount = 0, lockY = 0;
  window.lockScroll = function(){
    if(++lockCount > 1) return;
    lockY = scrollY;
    var s = document.body.style;
    s.position = "fixed"; s.top = (-lockY) + "px"; s.left = "0"; s.right = "0";
    s.width = "100%"; s.overflow = "hidden";
  };
  window.unlockScroll = function(){
    if(lockCount === 0 || --lockCount > 0) return;
    var s = document.body.style;
    s.position = ""; s.top = ""; s.left = ""; s.right = ""; s.width = ""; s.overflow = "";
    window.scrollTo({ top: lockY, behavior: "instant" });
  };

  /* lightbox */
  var list = [], idx = 0;
  function lb(){ return document.getElementById("lightbox"); }
  function show(){
    var it = list[idx];
    lb().querySelector("img").src = it.src;
    lb().querySelector(".lb-cap").textContent = it.cap || "";
  }
  window.openLightbox = function(items, i){
    list = items; idx = i || 0;
    lb().hidden = false; lockScroll(); show();
  };
  function close(){ lb().hidden = true; unlockScroll(); }
  function step(d){ if(!list.length) return; idx = (idx + d + list.length) % list.length; show(); }

  document.addEventListener("DOMContentLoaded", function(){
    document.querySelectorAll("section[id]").forEach(function(s){ secIO.observe(s); });
    observeReveals();
    /* 章节过渡带铺细星 */
    document.querySelectorAll(".fade-band").forEach(function(b){
      var c = document.createElement("canvas");
      b.appendChild(c);
      createStarfield(c, { density: 10000 });
    });
    lb().querySelector(".lb-close").addEventListener("click", close);
    lb().querySelector(".lb-prev").addEventListener("click", function(){ step(-1); });
    lb().querySelector(".lb-next").addEventListener("click", function(){ step(1); });
    lb().addEventListener("click", function(e){ if(e.target === lb()) close(); });
    addEventListener("keydown", function(e){
      if(lb().hidden) return;
      if(e.key === "Escape") close();
      if(e.key === "ArrowLeft") step(-1);
      if(e.key === "ArrowRight") step(1);
    });
  });
})();

/* ===== 首访引导：高亮右上角语言/主题开关，一次性 ===== */
(function(){
  var KEY = "site-onboarded";
  try { if(localStorage.getItem(KEY)) return; } catch(e){}
  document.addEventListener("DOMContentLoaded", function(){
    var ob = document.getElementById("onboard");
    if(!ob) return;
    var done = false;
    /* 按两个开关按钮的实际位置摆放光圈/光洞/提示语 */
    function place(){
      var t = document.getElementById("themeToggle"), l = document.getElementById("langToggle");
      var ring = ob.querySelector(".onboard-ring"), tip = ob.querySelector(".onboard-tip");
      if(!t || !l || !ring || !tip) return;
      var r1 = t.getBoundingClientRect(), r2 = l.getBoundingClientRect();
      var left = Math.min(r1.left, r2.left) - 14, right = Math.max(r1.right, r2.right) + 14;
      var top = Math.min(r1.top, r2.top) - 10, bottom = Math.max(r1.bottom, r2.bottom) + 10;
      ring.style.left = left + "px"; ring.style.top = top + "px";
      ring.style.width = (right - left) + "px"; ring.style.height = (bottom - top) + "px";
      ob.style.setProperty("--obx", ((left + right) / 2) + "px");
      ob.style.setProperty("--oby", ((top + bottom) / 2) + "px");
      tip.style.top = (bottom + 16) + "px";
      tip.style.right = Math.max(10, innerWidth - right) + "px";
    }
    addEventListener("resize", place);
    function dismiss(){
      if(done) return;
      done = true;
      try { localStorage.setItem(KEY, "1"); } catch(e){}
      ob.classList.remove("show");
      setTimeout(function(){ ob.hidden = true; }, 750);
    }
    setTimeout(function(){
      ob.hidden = false;
      place();
      requestAnimationFrame(function(){ ob.classList.add("show"); });
    }, 900);
    setTimeout(dismiss, 10000);
    ob.addEventListener("pointerdown", dismiss);
    addEventListener("scroll", dismiss, { passive: true, once: true });
    ["langToggle", "themeToggle"].forEach(function(id){
      var btn = document.getElementById(id);
      if(btn) btn.addEventListener("click", dismiss);
    });
  });
})();

/* ===== 颗粒桥：胶片颗粒 -> 数据星点（唯一特殊转场） ===== */
(function(){
  var cv = document.getElementById("grainCanvas");
  if(!cv) return;
  var ctx = cv.getContext("2d");
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var W = 0, H = 0, parts = [], running = false;
  var N = 140, COLS = 14;

  function resize(){
    var d = Math.min(devicePixelRatio || 1, 2);
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = W * d; cv.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0);
    parts = [];
    var rows = Math.ceil(N / COLS);
    for(var i = 0; i < N; i++){
      var col = i % COLS, row = (i / COLS) | 0;
      parts.push({ gx: (col + 1)/(COLS + 1)*W, gy: (row + 1.5)/(rows + 2)*H,
        rx: Math.random()*W, ry: Math.random()*H, j: Math.random()*9 });
    }
    draw();
  }
  function ease(p){ return p < .5 ? 2*p*p : 1 - Math.pow(-2*p + 2, 2)/2; }
  function progress(){
    var r = cv.getBoundingClientRect();
    return Math.max(0, Math.min(1, (innerHeight - r.top)/(innerHeight + r.height)));
  }
  function draw(){
    var light = document.documentElement.dataset.theme === "light";
    var base = light ? "rgba(20,20,19,0.75)" : "#faf9f5";
    var warm = light ? "#9c7c47" : "#ebdbbc";
    var e = ease(reduced ? 1 : progress());
    ctx.clearRect(0, 0, W, H);
    for(var i = 0; i < parts.length; i++){
      var q = parts[i];
      var jx = (1 - e) * Math.sin(q.j*37 + performance.now()*0.004) * 6;
      q._x = q.rx + (q.gx - q.rx)*e + jx;
      q._y = q.ry + (q.gy - q.ry)*e;
      ctx.globalAlpha = .3 + .55*e;
      ctx.fillStyle = e > .7 ? warm : base;
      var s = e > .7 ? 1.7 : 1.1;
      ctx.fillRect(q._x, q._y, s, s);
    }
    if(e > .6){
      ctx.globalAlpha = (e - .6)/.4*.25; ctx.strokeStyle = warm; ctx.beginPath();
      for(var k = 0; k < parts.length - 1; k++){
        if(k % COLS < COLS - 1){ ctx.moveTo(parts[k]._x, parts[k]._y); ctx.lineTo(parts[k+1]._x, parts[k+1]._y); }
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }
  function loop(){ if(running){ draw(); requestAnimationFrame(loop); } }
  resize();
  addEventListener("resize", resize);
  addEventListener("themechange", draw);
})();

/* ===== 画展 → 地图：飞机从右下飞向左上，留尾迹云 ===== */
(function(){
  var bridge = document.getElementById("travelBridge");
  if(!bridge) return;
  var flight = document.getElementById("flight");
  if(!flight || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var flightOn = false;
  function onScroll(){
    var r = bridge.getBoundingClientRect(), vh = innerHeight;
    var p = (vh - r.top) / (vh + r.height);
    if(p < 0 || p > 1){
      if(flightOn){ flight.style.opacity = 0; flightOn = false; }
      return;
    }
    flightOn = true;
    var sx = innerWidth + 120, sy = r.height * 0.96;   /* 右下入场 */
    var ex = -160,             ey = r.height * 0.02;   /* 左上离场 */
    var x = sx + (ex - sx) * p;
    var y = sy + (ey - sy) * p;
    var ang = Math.atan2(ey - sy, ex - sx) * 180 / Math.PI;  /* 机头沿航向 */
    flight.style.opacity = Math.min(1, Math.sin(p * Math.PI) * 1.5) * .95;
    flight.style.transform = "translate(" + x.toFixed(1) + "px," + y.toFixed(1) + "px) rotate(" + ang.toFixed(1) + "deg)";
  }
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if(!reduced){
    new IntersectionObserver(function(en){
      var vis = en[0].isIntersecting;
      if(vis && !running){ running = true; requestAnimationFrame(loop); }
      if(!vis) running = false;
    }, { threshold: 0 }).observe(cv);
  }
})();
