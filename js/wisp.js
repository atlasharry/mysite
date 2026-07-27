/* 开场片头「快门未关」：一张正在曝光的星轨照片——
   星空绕画外天极匀速拖出星轨（长曝光进行中，名字带曝光重影）；
   快门收合：轨迹加速倒带收回星点（几小时压进一帧，字随之凝实）；
   唯有一颗星不肯停——化作直线流星（暗-亮-暗、锥形拖尾）划落，
   点亮「听听我的故事」；片头层群星缓缓淡出，夜空交还给真实星空。
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
      try { play(hero, chars, story); } catch(e){ lit(); fin(); }
    }, 500);
  });

  function play(hero, chars, story){
    var hr = hero.getBoundingClientRect();
    var c0 = chars[0].getBoundingClientRect();
    var sb = story.getBoundingClientRect();
    var S = { x: sb.left + sb.width/2 - hr.left, y: sb.top + sb.height * 0.4 - hr.top };
    var nameTop = c0.top - hr.top;

    var light = document.documentElement.dataset.theme === "light";
    var ACCD = light ? "rgba(156,124,71," : "rgba(235,219,188,";
    var CORE = light ? "#6f5122" : "#fff6df";

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
    /* 流星起点：宽屏在名字右上的空旷天区；竖屏从右侧屏幕外斜切入画（不从中间落） */
    var portrait = W < 700;
    var rbx = portrait ? W + 50 : Math.min(W - 120, S.x + 330);
    var rby = portrait ? nameTop + 30 : nameTop - 90;
    var rebel = { r: Math.hypot(rbx - pole.x, rby - pole.y), a0: Math.atan2(rby - pole.y, rbx - pole.x) };
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
        var out = seg(t, 5250, 5850);
        ctx.fillStyle = ACCD + (s.al * (0.5 + 0.5 * shb) * (1 - out)) + ")";
        ctx.beginPath(); ctx.arc(hx, hy, s.sz, 0, 7); ctx.fill();
      }
      if(t > 2950) chars.forEach(function(c){ c.classList.remove("gh"); });

      /* 不肯停的那颗：直线流星，亮度暗-亮-暗，加速坠落，锥形拖尾随亮度伸缩 */
      var rh = rebel.a0 + SWEEP * grow;
      var rx = pole.x + Math.cos(rh) * rebel.r, ry = pole.y + Math.sin(rh) * rebel.r;
      var mf = seg(t, 4050, 5450);
      if(mf <= 0){
        ctx.fillStyle = CORE; ctx.globalAlpha = .9;
        ctx.beginPath(); ctx.arc(rx, ry, 1.8, 0, 7); ctx.fill();
        ctx.globalAlpha = 1;
      } else {
        var mpx = function(u){ return [rx + (S.x - rx) * u, ry + (S.y - 4 - ry) * u]; };
        var u = Math.pow(mf, 1.5);
        var B = Math.pow(Math.sin(Math.PI * Math.min(1, mf * 1.06)), 0.9);
        var hp = mpx(u);
        var TL = (0.14 + 0.12 * B) * u / Math.max(u, 0.24);
        ctx.lineCap = "round";
        for(var k = 0; k < 14; k++){
          var u1 = Math.max(0, u - TL * k / 14), u2 = Math.max(0, u - TL * (k + 1) / 14);
          if(u2 >= u1) continue;
          var p1 = mpx(u1), p2 = mpx(u2);
          var fd = 1 - k / 14;
          ctx.strokeStyle = ACCD + (0.55 * B * fd * fd) + ")";
          ctx.lineWidth = 0.4 + 1.9 * fd * B;
          ctx.beginPath(); ctx.moveTo(p1[0], p1[1]); ctx.lineTo(p2[0], p2[1]); ctx.stroke();
        }
        if(B > 0.02){
          var gr = 9 + 8 * B;
          var g3 = ctx.createRadialGradient(hp[0], hp[1], 0, hp[0], hp[1], gr);
          g3.addColorStop(0, CORE); g3.addColorStop(0.4, ACCD + (0.5 * B) + ")"); g3.addColorStop(1, ACCD + "0)");
          ctx.globalAlpha = B;
          ctx.fillStyle = g3; ctx.beginPath(); ctx.arc(hp[0], hp[1], gr, 0, 7); ctx.fill();
          ctx.fillStyle = CORE; ctx.beginPath(); ctx.arc(hp[0], hp[1], 1.5 + 0.9 * B, 0, 7); ctx.fill();
          ctx.globalAlpha = 1;
        }
        if(!litDone && mf > 0.8){ litDone = true; lit(); minorIn(); }
      }
      if(t < 5900 && !gone) requestAnimationFrame(frame);
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
