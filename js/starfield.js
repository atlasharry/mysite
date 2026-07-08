/* 滚动期间暂停星空重绘，把主线程让给滚动（星点静止 150ms 无感） */
(function(){
  var scrolling = false, timer;
  addEventListener("scroll", function(){
    scrolling = true;
    clearTimeout(timer);
    timer = setTimeout(function(){ scrolling = false; }, 150);
  }, { passive: true });
  window.__pageScrolling = function(){ return scrolling; };
})();

window.createStarfield = function(canvas, opts){
  var o = Object.assign({ density: 6500, twinkle: true }, opts || {});
  var ctx = canvas.getContext("2d");
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var stars = [], W = 0, H = 0, visible = true;

  function resize(){
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var n = Math.round(W * H / o.density);
    stars = [];
    for(var i = 0; i < n; i++){
      stars.push({ x: Math.random()*W, y: Math.random()*H,
        r: 0.3 + Math.random(), p: Math.random()*Math.PI*2,
        s: 0.4 + Math.random()*0.8, warm: Math.random() < 0.25 });
    }
    draw(performance.now());
  }
  function draw(now){
    var light = document.documentElement.dataset.theme === "light";
    var base = light ? "rgba(20,20,19,0.7)" : "#faf9f5";
    var warm = light ? "#9c7c47" : "#ebdbbc";
    ctx.clearRect(0, 0, W, H);
    for(var i = 0; i < stars.length; i++){
      var st = stars[i];
      var tw = (o.twinkle && !reduced) ? 0.45 + 0.55*(0.5 + 0.5*Math.sin(st.p + now*0.0006*st.s)) : 0.8;
      ctx.globalAlpha = tw * 0.9;
      ctx.fillStyle = st.warm ? warm : base;
      ctx.beginPath(); ctx.arc(st.x, st.y, st.r, 0, 7); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
  var lastDraw = 0;
  function loop(now){
    /* 30fps 足够闪烁质感；滚动中完全跳过绘制 */
    if(visible && !window.__pageScrolling() && now - lastDraw > 33){
      draw(now); lastDraw = now;
    }
    requestAnimationFrame(loop);
  }

  resize();
  addEventListener("resize", resize);
  addEventListener("themechange", function(){ draw(performance.now()); });
  if(!reduced){
    requestAnimationFrame(loop);
    new IntersectionObserver(function(en){ visible = en[0].isIntersecting; }, {threshold: 0}).observe(canvas);
  }
  return { resize: resize };
};

/* hero 接线：星空 + 滚动淡出视差 */
document.addEventListener("DOMContentLoaded", function(){
  var cv = document.getElementById("stars");
  if(!cv) return;
  createStarfield(cv, { density: 6500 });
  var inner = document.querySelector(".hero-inner");
  if(!matchMedia("(prefers-reduced-motion: reduce)").matches){
    /* rAF 节流 + 滚出首屏后不再写样式 */
    var ticking = false, faded = false;
    addEventListener("scroll", function(){
      if(ticking) return;
      ticking = true;
      requestAnimationFrame(function(){
        ticking = false;
        var y = scrollY, vh = innerHeight;
        if(y > vh){
          if(!faded){ cv.style.opacity = 0; if(inner) inner.style.opacity = 0; faded = true; }
          return;
        }
        faded = false;
        var f = Math.max(0, 1 - y/(vh*0.85));
        cv.style.opacity = f;
        if(inner){ inner.style.opacity = f; inner.style.transform = "translateY(" + (y*0.18) + "px)"; }
      });
    }, { passive: true });
  }
});
