/* 开场片头「快门未关」：一张正在曝光的星轨照片——
   星空绕画外天极匀速拖出星轨（长曝光进行中，名字带曝光重影）；
   快门收合：轨迹加速倒带收回星点（几小时压进一帧，字随之凝实），
   收束完成即点亮正文，片头层群星缓缓淡出交还真实星空。less is more。
   每会话只播一次；reduced-motion/滚动过深/异常一律直接点亮。
   收尾以 .hero.lit 触发光晕与落光丝线，wispdone 事件放行首访开关引导 */
(function(){
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function lit(){ var h = document.querySelector(".hero"); if(h) h.classList.add("lit"); }
  function fin(){ try { dispatchEvent(new Event("wispdone")); } catch(e){} }

  document.addEventListener("DOMContentLoaded", function(){
    var hero = document.querySelector(".hero");
    var chars = hero ? hero.querySelectorAll("h1 .hc") : [];
    var story = hero && hero.querySelector(".hero-story");
    if(!hero || chars.length < 3 || !story || reduced || scrollY > 120){ lit(); fin(); return; }
    /* 每次会话只演一次：回访/刷新时入口立即点亮 */
    try {
      if(sessionStorage.getItem("wisp")){ lit(); fin(); return; }
      sessionStorage.setItem("wisp", "1");
    } catch(e){}
    setTimeout(function(){
      try { play(hero, chars); } catch(e){ lit(); fin(); }
    }, 500);
  });

  function play(hero, chars){
    var light = document.documentElement.dataset.theme === "light";
    var ACCD = light ? "rgba(156,124,71," : "rgba(235,219,188,";

    var cv = document.createElement("canvas");
    cv.style.cssText = "position:absolute;inset:0;width:100%;height:100%;z-index:3;pointer-events:none";
    hero.appendChild(cv);
    var ctx = cv.getContext("2d");
    var dpr = Math.min(devicePixelRatio || 1, 2);
    var W = hero.clientWidth, H = hero.clientHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    /* 次要文字（HARRY YU/标语/身份词）先隐后现，给片头一个干净的舞台 */
    var minor = hero.querySelectorAll(".hero-en,.tagline,.tagline-sub");
    minor.forEach(function(el){ el.style.transition = "opacity 1.2s ease"; el.style.opacity = "0"; });
    var minorDone = false;
    function minorIn(){
      if(minorDone) return; minorDone = true;
      minor.forEach(function(el){ el.style.opacity = ""; });
    }

    function seg(t, a, b){ return Math.max(0, Math.min(1, (t - a) / (b - a))); }
    function rnd0(s){ return function(){ s = (s * 16807) % 2147483647; return s / 2147483647; }; }

    var pole = { x: W * 0.5, y: -H * 0.4 };
    var N = 46, stars = [], rnd = rnd0(11);
    for(var i = 0; i < N; i++){
      var x = rnd() * W, y = rnd() * H * 0.9;
      var dx = x - pole.x, dy = y - pole.y;
      stars.push({ r: Math.sqrt(dx*dx + dy*dy), a0: Math.atan2(dy, dx), sz: 0.6 + rnd() * 1.1,
                   al: .3 + rnd() * .5, stg: rnd() * 160 - 80 });
    }
    chars.forEach(function(c){ c.classList.add("gh"); });
    var SWEEP = 0.16, born = performance.now(), litDone = false, gone = false;

    (function frame(now){
      var t = now - born;
      ctx.clearRect(0, 0, W, H);
      /* 拉长匀速——星轨本就是匀速自转画出的 */
      var grow = seg(t, 700, 2950);
      ctx.lineWidth = 0.8;
      for(var i = 0; i < N; i++){
        var s = stars[i];
        /* 到顶即干脆反转收束（越收越快），每颗星 ±80ms 错峰 */
        var shb = seg(t, 2950 + s.stg, 3800 + s.stg);
        var sh = Math.pow(shb, 1.35);
        var len = SWEEP * grow * (1 - sh);
        var head = s.a0 + SWEEP * grow;
        if(len > 0.002){
          /* 拖尾朝尾端渐暗；收束中整体变淡——光流回星点 */
          var base = s.al * 0.55 * (1 - 0.45 * sh);
          for(var j = 0; j < 3; j++){
            var a1 = head - len * (3 - j) / 3, a2 = head - len * (2 - j) / 3;
            ctx.strokeStyle = ACCD + (base * (0.4 + 0.3 * j)) + ")";
            ctx.beginPath(); ctx.arc(pole.x, pole.y, s.r, a1, a2); ctx.stroke();
          }
        }
        var hx = pole.x + Math.cos(head) * s.r, hy = pole.y + Math.sin(head) * s.r;
        /* 尾声：片头层的星缓缓淡出，夜空交还给真实星空 */
        var out = seg(t, 3950, 4450);
        ctx.fillStyle = ACCD + (s.al * (0.5 + 0.5 * shb) * (1 - out)) + ")";
        ctx.beginPath(); ctx.arc(hx, hy, s.sz, 0, 7); ctx.fill();
      }
      if(t > 2950) chars.forEach(function(c){ c.classList.remove("gh"); });
      /* 收束完成即点亮正文——less is more */
      if(!litDone && t > 3900){ litDone = true; lit(); minorIn(); }
      if(t < 4500 && !gone) requestAnimationFrame(frame);
      else {
        cv.remove();
        chars.forEach(function(c){ c.classList.remove("gh"); });
        if(!litDone){ lit(); minorIn(); }
        fin();
      }
    })(performance.now());

    addEventListener("resize", function onr(){
      removeEventListener("resize", onr);
      gone = true;
    });
  }
})();
