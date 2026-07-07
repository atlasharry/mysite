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
    lb().hidden = false; document.body.style.overflow = "hidden"; show();
  };
  function close(){ lb().hidden = true; document.body.style.overflow = ""; }
  function step(d){ if(!list.length) return; idx = (idx + d + list.length) % list.length; show(); }

  document.addEventListener("DOMContentLoaded", function(){
    document.querySelectorAll("section[id]").forEach(function(s){ secIO.observe(s); });
    observeReveals();
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
    var e = ease(reduced ? 1 : progress());
    ctx.clearRect(0, 0, W, H);
    for(var i = 0; i < parts.length; i++){
      var q = parts[i];
      var jx = (1 - e) * Math.sin(q.j*37 + performance.now()*0.004) * 6;
      q._x = q.rx + (q.gx - q.rx)*e + jx;
      q._y = q.ry + (q.gy - q.ry)*e;
      ctx.globalAlpha = .3 + .55*e;
      ctx.fillStyle = e > .7 ? "#ebdbbc" : "#faf9f5";
      var s = e > .7 ? 1.7 : 1.1;
      ctx.fillRect(q._x, q._y, s, s);
    }
    if(e > .6){
      ctx.globalAlpha = (e - .6)/.4*.25; ctx.strokeStyle = "#ebdbbc"; ctx.beginPath();
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
  if(!reduced){
    new IntersectionObserver(function(en){
      var vis = en[0].isIntersecting;
      if(vis && !running){ running = true; requestAnimationFrame(loop); }
      if(!vis) running = false;
    }, { threshold: 0 }).observe(cv);
  }
})();
