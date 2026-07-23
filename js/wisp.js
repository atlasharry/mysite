/* 光精灵：载入后一团有生命的光——在「余」上方现身，逐字跃过「城」「宇」，
   灵动地绕一圈，再顺着弧线落进「听听我的故事」，字后的光晕随之点亮。
   实现：hero 内临时 canvas（光核+光晕+拖尾+脉动），Range 逐字测位不改 DOM；
   飞行结束/降级路径都以 .hero.lit 收尾（CSS 动画由它触发） */
(function(){
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function lit(){
    var h = document.querySelector(".hero");
    if(h) h.classList.add("lit");
  }

  document.addEventListener("DOMContentLoaded", function(){
    var hero = document.querySelector(".hero");
    var h1 = hero && hero.querySelector("h1");
    var story = hero && hero.querySelector(".hero-story");
    if(!hero || !h1 || !story || reduced || scrollY > 120){ lit(); return; }
    /* 每次会话只飞一次：刷新/回到顶部时入口立即点亮，不让回访者等 */
    try {
      if(sessionStorage.getItem("wisp")){ lit(); return; }
      sessionStorage.setItem("wisp", "1");
    } catch(e){}
    setTimeout(function(){
      try { fly(hero, h1, story); } catch(e){ lit(); }
    }, 500);
  });

  function fly(hero, h1, story){
    var node = h1.firstChild;   /* 文本节点「余城宇」 */
    if(!node || node.nodeType !== 3 || node.textContent.length < 3){ lit(); return; }
    var hr = hero.getBoundingClientRect();
    function charTop(i){
      var r = document.createRange();
      r.setStart(node, i); r.setEnd(node, i + 1);
      var b = r.getBoundingClientRect();
      /* letter-spacing 计入在字后：几何中心略向左修正 */
      return [b.left + b.width * 0.44 - hr.left, b.top - hr.top];
    }
    var t0p = charTop(0), t1p = charTop(1), t2p = charTop(2);
    var sr = story.getBoundingClientRect();
    var S = [sr.left + sr.width/2 - hr.left, sr.top + sr.height*0.45 - hr.top];
    var k = Math.min(1, innerWidth / 760);

    var g = getComputedStyle(document.documentElement);
    var light = document.documentElement.dataset.theme === "light";
    var ACC = (g.getPropertyValue("--accent") || "#ebdbbc").trim();
    var CORE = (g.getPropertyValue("--beam-head") || "#fff6df").trim();

    var cv = document.createElement("canvas");
    cv.style.cssText = "position:absolute;inset:0;width:100%;height:100%;z-index:3;pointer-events:none";
    hero.appendChild(cv);
    var ctx = cv.getContext("2d");
    var dpr = Math.min(devicePixelRatio || 1, 2);
    cv.width = hero.clientWidth * dpr; cv.height = hero.clientHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var W = hero.clientWidth, H = hero.clientHeight;

    function bez(p0, p1, p2, p3){
      return function(t){
        var u = 1 - t;
        return [u*u*u*p0[0] + 3*u*u*t*p1[0] + 3*u*t*t*p2[0] + t*t*t*p3[0],
                u*u*u*p0[1] + 3*u*u*t*p1[1] + 3*u*t*t*p2[1] + t*t*t*p3[1]];
      };
    }
    function ease(t){ return t < .5 ? 2*t*t : 1 - Math.pow(-2*t + 2, 2)/2; }

    /* 编舞：现身 -> 逐字跃过 -> 绕圈 -> 俯冲落字 -> 交融点亮 */
    var over0 = [t0p[0], t0p[1] - 18*k], over1 = [t1p[0], t1p[1] - 18*k], over2 = [t2p[0], t2p[1] - 18*k];
    var start = [over0[0] - 130*k, over0[1] - 80*k];
    var LC = [over2[0] + 70*k, over2[1] + 90*k], LR = 46*k;   /* 环心/环半径：名字右下 */
    var LS = [LC[0], LC[1] - LR];
    function hop(a, b){ var lift = 34*k;
      return bez(a, [a[0] + (b[0]-a[0])*0.3, a[1] - lift], [b[0] - (b[0]-a[0])*0.3, b[1] - lift], b); }
    var segs = [
      { dur: 800,  f: bez(start, [start[0] + 70*k, start[1] - 30*k], [over0[0] - 60*k, over0[1] - 46*k], over0) },
      { dur: 560,  f: hop(over0, over1) },
      { dur: 560,  f: hop(over1, over2) },
      { dur: 360,  f: bez(over2, [over2[0] + 46*k, over2[1] - 8*k], [LS[0] - 18*k, LS[1] - 14*k], LS) },
      { dur: 950,  f: function(t){ var a = t * 6.2832;               /* 顺时针整圈 */
          return [LC[0] + LR * Math.sin(a), LC[1] - LR * Math.cos(a)]; } },
      { dur: 1050, f: bez(LS, [LC[0] + 60*k, LC[1] + (S[1]-LC[1])*0.34], [S[0] + 80*k, S[1] - 110*k], S) },
      { dur: 400,  f: function(){ return S; } }                      /* 交融：光晕点亮、精灵消散 */
    ];
    var total = 0;
    segs.forEach(function(s){ s.t0 = total; total += s.dur; });

    var trail = [], born = performance.now(), litDone = false;
    function orbAt(now){
      var el = now - born;
      if(el >= total) return null;
      var i = 0;
      while(i < segs.length - 1 && el >= segs[i].t0 + segs[i].dur) i++;
      var s = segs[i], t = ease(Math.min(1, (el - s.t0) / s.dur));
      var p = s.f(t);
      /* 生命感：细微漂移 + 脉动由绘制侧处理 */
      var wob = Math.sin(el * 0.011) * 2.4 + Math.sin(el * 0.0053) * 1.7;
      return { x: p[0], y: p[1] + wob, el: el, seg: i, t: t };
    }

    function draw(){
      var now = performance.now();
      var o = orbAt(now);
      ctx.clearRect(0, 0, W, H);
      if(!o){ cv.remove(); if(!litDone) lit(); return; }
      if(o.seg === 6 && !litDone){ litDone = true; lit(); }   /* 到点即点亮，精灵随后消散 */

      var fadeIn = Math.min(1, o.el / 500);
      var fadeOut = o.seg === 6 ? 1 - o.t : 1;
      var alpha = fadeIn * fadeOut;
      var pulse = 1 + 0.13 * Math.sin(o.el * 0.007);

      trail.push({ x: o.x, y: o.y });
      if(trail.length > 15) trail.shift();

      ctx.globalCompositeOperation = light ? "source-over" : "lighter";
      for(var i = 0; i < trail.length; i++){
        var q = trail[i], f = (i + 1) / trail.length;
        ctx.globalAlpha = alpha * Math.pow(f, 1.8) * 0.4;
        ctx.fillStyle = ACC;
        ctx.beginPath(); ctx.arc(q.x, q.y, 1 + 2.6 * f, 0, 7); ctx.fill();
      }
      var R = 26 * pulse * (o.seg === 6 ? 1 + o.t * 1.6 : 1);
      var halo = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, R);
      halo.addColorStop(0, CORE);
      halo.addColorStop(0.28, ACC);
      halo.addColorStop(1, "rgba(0,0,0,0)");
      ctx.globalAlpha = alpha * (light ? 0.5 : 0.6);
      ctx.fillStyle = halo;
      ctx.beginPath(); ctx.arc(o.x, o.y, R, 0, 7); ctx.fill();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = CORE;
      ctx.beginPath(); ctx.arc(o.x, o.y, 3.4 * pulse, 0, 7); ctx.fill();
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);

    /* 途中窗口尺寸变化：优雅收场（直接点亮并移除画布） */
    addEventListener("resize", function onr(){
      removeEventListener("resize", onr);
      born = -1e9;
    });
  }
})();
