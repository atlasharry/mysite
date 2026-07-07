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
    ctx.clearRect(0, 0, W, H);
    for(var i = 0; i < stars.length; i++){
      var st = stars[i];
      var tw = (o.twinkle && !reduced) ? 0.45 + 0.55*(0.5 + 0.5*Math.sin(st.p + now*0.0006*st.s)) : 0.8;
      ctx.globalAlpha = tw * 0.9;
      ctx.fillStyle = st.warm ? "#ebdbbc" : "#faf9f5";
      ctx.beginPath(); ctx.arc(st.x, st.y, st.r, 0, 7); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
  function loop(now){ if(visible) draw(now); requestAnimationFrame(loop); }

  resize();
  addEventListener("resize", resize);
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
    addEventListener("scroll", function(){
      var y = scrollY, f = Math.max(0, 1 - y/(innerHeight*0.85));
      cv.style.opacity = f;
      if(inner){ inner.style.opacity = f; inner.style.transform = "translateY(" + (y*0.18) + "px)"; }
    }, { passive: true });
  }
});
