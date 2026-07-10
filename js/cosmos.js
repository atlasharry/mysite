/* 宇宙缩放序列：滚动驱动的一镜到底
   真实旅行地图（当前视野）-> 缩成完整世界 -> 卷成地球 -> 连续拉远：
   地球退入轨道、太阳滑入、太阳系凝成一点、群星聚成侧斜的银河
   -> 银河下落，与星空章节第一张照片重合后淡出
   实现：position:sticky 定幕 + 单 canvas；相机 = 对数缩放 + 目标点漂移（地球->太阳->银心） */
(function(){
  var wrap = document.getElementById("cosmos");
  var cv = document.getElementById("cosmosCanvas");
  var cap = document.getElementById("cosmosCap");
  if(!wrap || !cv || !window.WORLD_GLOBE) return;
  var ctx = cv.getContext("2d");
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var W = 0, H = 0, spin = 205, gal = 0, visible = false, lastP = 0;
  var RAD = Math.PI / 180, TILT = 16 * RAD;

  /* ---- 世界模型（艺术比例，非真实尺度），太阳在原点 ----
     所有天体共用一个侧斜视角：先压扁（SQ）再旋转（ROT），近侧大而亮 */
  var SQ = 0.46, ROT = 0.52;   /* 长轴左上->右下，对齐星空章节首图（仙女座）的倾角 */
  var ORB  = [0.20, 0.33, 0.52, 0.70, 0.88];   /* 轨道半径比例（3 号位是地球） */
  var OANG = [0.7, 3.5, 0.72, 5.2, 1.6];
  var OSZ  = [1.1, 1.6, 0, 1.5, 2.4];
  var RSCALE = 16 / 0.52;                      /* 地球轨道 = 16 个地球半径 */
  var RG = RSCALE * 46;                        /* 银河半径 */

  function w2(r, a){                           /* 平面极坐标 -> 侧斜世界坐标 */
    var x = Math.cos(a) * r, y = Math.sin(a) * r * SQ;
    var c = Math.cos(ROT), s = Math.sin(ROT);
    return [x * c - y * s, x * s + y * c];
  }
  var EARTH = w2(16, OANG[2]);
  var GCEN = (function(){ var v = w2(RG * 0.60, 0.72); return [-v[0], -v[1]]; })();

  /* 银河粒子：双对数旋臂 + 核球（确定性伪随机；存极坐标，绘制时旋转+近大远小） */
  var GPTS = [];
  (function(){
    var s = 42;
    function rnd(){ s = (s * 16807) % 2147483647; return s / 2147483647; }
    for(var arm = 0; arm < 2; arm++){
      for(var i = 0; i < 380; i++){
        var t = rnd() * 3.4 + 0.35;
        GPTS.push({ r: Math.pow(t / 3.75, 0.85), a: arm * Math.PI + t * 2.2 + (rnd() - .5) * .55,
                    s: rnd() * 1.5 + .4, o: rnd() * .65 + .25, w: rnd() < .22 });
      }
    }
    for(var j = 0; j < 170; j++){
      GPTS.push({ r: Math.pow(rnd(), 1.7) * .2, a: rnd() * 6.283,
                  s: rnd() * 1.8 + .5, o: rnd() * .8 + .2, w: rnd() < .5 });
    }
  })();

  var LABELS = [
    { zh: "地球", en: "Earth" },
    { zh: "太阳系", en: "The Solar System" },
    { zh: "银河系", en: "The Milky Way" }
  ];

  function seg(p, a, b){ return Math.max(0, Math.min(1, (p - a) / (b - a))); }
  function ease(t){ return t < .5 ? 2*t*t : 1 - Math.pow(-2*t + 2, 2) / 2; }
  function lerp(a, b, t){ return a + (b - a) * t; }

  var C = null;
  function colors(){
    var g = getComputedStyle(document.documentElement);
    function v(n, fb){ var x = g.getPropertyValue(n).trim(); return x || fb; }
    var l = document.documentElement.dataset.theme === "light";
    C = {
      line:  l ? "rgba(20,20,19,.55)" : "rgba(235,219,188,.6)",
      faint: l ? "rgba(20,20,19,.13)" : "rgba(235,219,188,.15)",
      star:  l ? "rgba(20,20,19,.75)" : "rgba(250,249,245,.92)",
      warm:  v("--accent", "#ebdbbc"),
      dim:   v("--accent-dim", "rgba(235,219,188,.4)"),
      mapFill:   v("--map-fill", "rgba(235,219,188,.04)"),
      mapStroke: v("--map-stroke", "rgba(235,219,188,.35)"),
      panel: v("--panel", "#171614"),
      glow:  l ? "rgba(156,124,71," : "rgba(235,219,188,"
    };
  }

  /* ---- 真实地图交接：进入序列瞬间捕获视野/轮廓/图钉，canvas 原位接画 ---- */
  var hand = null, took = false;
  function capture(){
    var hk = window.__MAPHOOK, r = hk && hk.rect();
    if(!r || !r.width){
      hand = { v: { x: 0, y: 0, w: 1000, h: 500 }, d: window.WORLD_MAP_PATH || "", marks: [],
               box: { x: W/2 - 430, y: H/2 - 215, w: 860, h: 430 } };
      return;
    }
    /* 用相对 cosmos 容器的偏移换算“定幕时刻”的屏幕位置：
       与当前滚动速度/跳跃无关，快滚、锚点跳转、往回滚都严格对位 */
    var wr = wrap.getBoundingClientRect();
    hand = { v: hk.view(), d: hk.path(), marks: hk.markers(),
             box: { x: r.left, y: r.top - wr.top, w: r.width, h: r.height } };
  }

  var P2D = {};
  function pathFor(d){ var k = d.length; if(!P2D[k]) P2D[k] = new Path2D(d); return P2D[k]; }

  function drawFlat(box, v, d, fillA, strokeA){
    if(fillA <= .01 && strokeA <= .01) return;
    ctx.save();
    ctx.beginPath(); ctx.rect(box.x, box.y, box.w, box.h); ctx.clip();
    var kx = box.w / v.w, ky = box.h / v.h;
    ctx.translate(box.x - v.x * kx, box.y - v.y * ky);
    ctx.scale(kx, ky);
    var P = pathFor(d);
    if(fillA > .01){ ctx.globalAlpha = fillA; ctx.fillStyle = C.mapFill; ctx.fill(P); }
    if(strokeA > .01){ ctx.globalAlpha = strokeA; ctx.strokeStyle = C.mapStroke; ctx.lineWidth = 0.8; ctx.stroke(P); }
    ctx.restore();
  }

  function drawMarks(box, v, alpha){
    if(!hand || alpha <= .01) return;
    var kx = box.w / v.w, ky = box.h / v.h;
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    for(var i = 0; i < hand.marks.length; i++){
      var mk = hand.marks[i];
      var px = box.x + (mk.x - v.x) * kx, py = box.y + (mk.y - v.y) * ky;
      if(px < box.x || px > box.x + box.w || py < box.y || py > box.y + box.h) continue;
      ctx.globalAlpha = alpha;
      if(mk.n > 1){
        ctx.fillStyle = C.panel; ctx.strokeStyle = C.dim; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(px, py, 13 * mk.s * kx, 0, 7); ctx.fill(); ctx.stroke();
        ctx.fillStyle = C.warm;
        ctx.font = (11 * mk.s * kx).toFixed(1) + "px Lora,Georgia,serif";
        ctx.fillText(mk.n, px, py);
      } else {
        ctx.fillStyle = C.warm;
        ctx.beginPath(); ctx.arc(px, py, 3.2 * mk.s * kx, 0, 7); ctx.fill();
      }
    }
  }

  function orthoPt(lon, lat, R, cx, cy){
    var l = (lon + spin) * RAD, f = lat * RAD;
    var x = Math.cos(f) * Math.sin(l);
    var y = Math.sin(f);
    var z = Math.cos(f) * Math.cos(l);
    var y2 = y * Math.cos(TILT) - z * Math.sin(TILT);
    var z2 = y * Math.sin(TILT) + z * Math.cos(TILT);
    return [cx + R * x, cy - R * y2, z2];
  }

  /* 环线世界：m=0 平铺（宽 mw），m=1 正交球（半径 R） */
  function drawLand(m, R, cx, cy, alpha, mw){
    if(alpha <= .01 || R < 1.2) return;
    ctx.lineWidth = 1;
    for(var i = 0; i < WORLD_GLOBE.length; i++){
      var ring = WORLD_GLOBE[i];
      for(var pass = 0; pass < 2; pass++){
        var a = pass === 0 ? alpha : alpha * (1 - m);
        if(a <= .02) continue;
        ctx.globalAlpha = a;
        ctx.strokeStyle = C.line;
        ctx.beginPath();
        var pen = false;
        for(var k = 0; k <= ring.length; k++){
          var q = ring[k % ring.length];
          var o = orthoPt(q[0], q[1], R, cx, cy);
          if((pass === 0) !== (o[2] > 0)){ pen = false; continue; }
          var fx = cx + q[0] / 360 * mw, fy = cy - q[1] / 180 * (mw / 2);
          var px = fx + (o[0] - fx) * m, py = fy + (o[1] - fy) * m;
          if(pen) ctx.lineTo(px, py); else { ctx.moveTo(px, py); pen = true; }
        }
        ctx.stroke();
      }
    }
    if(m > 0.35 && R > 24){
      ctx.globalAlpha = alpha * (m - 0.35) / 0.65 * 0.5;
      ctx.strokeStyle = C.faint;
      var g, a2;
      for(g = -60; g <= 60; g += 30){
        ctx.beginPath(); var p2 = false;
        for(a2 = -180; a2 <= 180; a2 += 6){
          var o1 = orthoPt(a2, g, R, cx, cy);
          if(o1[2] > 0){ if(p2) ctx.lineTo(o1[0], o1[1]); else { ctx.moveTo(o1[0], o1[1]); p2 = true; } }
          else p2 = false;
        }
        ctx.stroke();
      }
      for(g = 0; g < 360; g += 30){
        ctx.beginPath(); var p3 = false;
        for(a2 = -85; a2 <= 85; a2 += 6){
          var o2 = orthoPt(g, a2, R, cx, cy);
          if(o2[2] > 0){ if(p3) ctx.lineTo(o2[0], o2[1]); else { ctx.moveTo(o2[0], o2[1]); p3 = true; } }
          else p3 = false;
        }
        ctx.stroke();
      }
      ctx.globalAlpha = alpha * m;
      ctx.strokeStyle = C.line;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.stroke();
    }
  }

  function draw(p){
    if(!C) colors();
    ctx.clearRect(0, 0, W, H);
    var cx = W / 2, cy = H / 2;
    var fade = 1 - seg(p, 0.96, 1);
    var minWH = Math.min(W, H);
    var R0 = minWH * 0.30;
    var mw1 = Math.min(W * 0.72, H * 1.15, 900);

    /* —— 第一幕：真实地图原位接管，收缩到完整世界 —— */
    var th = ease(seg(p, 0.0, 0.15));
    var xf = seg(p, 0.15, 0.20);          /* 贝塞尔轮廓 -> 环线 交叉淡化 */
    var m  = ease(seg(p, 0.20, 0.36));    /* 卷球 */
    if(p < 0.36 && hand){
      var tb = { x: cx - mw1 / 2, y: cy - mw1 / 4, w: mw1, h: mw1 / 2 };
      var box = { x: lerp(hand.box.x, tb.x, th), y: lerp(hand.box.y, tb.y, th),
                  w: lerp(hand.box.w, tb.w, th), h: lerp(hand.box.h, tb.h, th) };
      var v = { x: lerp(hand.v.x, 0, th), y: lerp(hand.v.y, 0, th),
                w: lerp(hand.v.w, 1000, th), h: lerp(hand.v.h, 500, th) };
      drawFlat(box, v, hand.d, (1 - seg(p, 0.13, 0.20)) * fade, (1 - xf) * fade);
      drawMarks(box, v, (1 - seg(p, 0.01, 0.09)) * fade);
    }
    var mw = lerp(mw1, 2.4 * R0, m);

    /* —— 连续变焦相机：对数缩放 + 目标点漂移 —— */
    var u = seg(p, 0.38, 0.93);
    var s = R0 * Math.pow((0.36 * minWH / RG) / R0, u);   /* 像素/世界单位 */
    var c1 = ease(seg(u, 0, 0.30));                       /* 地球 -> 太阳 */
    var c2 = ease(seg(u, 0.62, 0.95));                    /* 太阳 -> 银心 */
    var Tx = lerp(lerp(EARTH[0], 0, c1), GCEN[0], c2);
    var Ty = lerp(lerp(EARTH[1], 0, c1), GCEN[1], c2);

    /* —— 尾声：银河下落，与星空第一张照片重合 —— */
    var hb = ease(seg(p, 0.90, 0.99));
    var csx = cx, csy = cy;
    if(hb > 0){
      var img = document.querySelector("#astroGrid .swiper-slide-active img") ||
                document.querySelector("#astroGrid .swiper-slide img");
      var tx = cx, ty = H * 1.05, tr = minWH * 0.30;
      if(img){
        var ir = img.getBoundingClientRect();
        if(ir.width){
          tx = ir.left + ir.width / 2;
          ty = Math.min(ir.top + ir.height / 2, H * 1.25);
          tr = ir.width * 0.40;
        }
      }
      csx = lerp(cx, tx, hb); csy = lerp(cy, ty, hb);
      s = Math.exp(lerp(Math.log(s), Math.log(tr / RG), hb));
    }
    function SX(wx){ return csx + (wx - Tx) * s; }
    function SY(wy){ return csy + (wy - Ty) * s; }

    /* 银河（先画，天体叠其上）：星点先稀疏浮现，再随拉远凝聚成旋臂 */
    var galA = seg(u, 0.40, 0.80) * fade;
    if(galA > .01){
      for(var k2 = 0; k2 < GPTS.length; k2++){
        var q2 = GPTS[k2];
        var ang = q2.a + gal;
        var pw = w2(q2.r * RG, ang);
        var px2 = SX(GCEN[0] + pw[0]), py2 = SY(GCEN[1] + pw[1]);
        if(px2 < -24 || px2 > W + 24 || py2 < -24 || py2 > H + 24) continue;
        var near = Math.sin(ang);          /* 圆盘近侧：更大更亮 */
        ctx.globalAlpha = Math.min(1, galA * q2.o * (1 + 0.30 * near));
        ctx.fillStyle = q2.w ? C.warm : C.star;
        ctx.beginPath(); ctx.arc(px2, py2, q2.s * (0.55 + 0.75 * galA) * (1 + 0.28 * near), 0, 7); ctx.fill();
      }
      var gx = SX(GCEN[0]), gy = SY(GCEN[1]);
      var coreR = Math.min(RG * 0.30 * s, minWH * 0.5);
      if(coreR > 4){
        var core = ctx.createRadialGradient(gx, gy, 0, gx, gy, coreR);
        core.addColorStop(0, C.glow + (0.30 * galA).toFixed(3) + ")");
        core.addColorStop(1, C.glow + "0)");
        ctx.globalAlpha = 1; ctx.fillStyle = core;
        ctx.beginPath(); ctx.arc(gx, gy, coreR, 0, 7); ctx.fill();
      }
    }

    /* 太阳系：轨道与行星随拉远同步收进画面（无独立分幕） */
    var sunX = SX(0), sunY = SY(0);
    var orbA = seg(u, 0.06, 0.22) * (1 - seg(u, 0.86, 0.98)) * fade;
    if(orbA > .01){
      ctx.strokeStyle = C.faint; ctx.lineWidth = 1;
      for(var i2 = 0; i2 < ORB.length; i2++){
        var orr = ORB[i2] * RSCALE * s;
        if(orr < 2 || orr > 3.5 * Math.max(W, H)) continue;
        ctx.globalAlpha = orbA * 0.8;
        ctx.beginPath();
        ctx.ellipse(sunX, sunY, orr, orr * SQ, ROT, 0, 7);
        ctx.stroke();
      }
      ctx.fillStyle = C.star;
      for(var j2 = 0; j2 < ORB.length; j2++){
        if(!OSZ[j2]) continue;
        var pw2 = w2(ORB[j2] * RSCALE, OANG[j2]);
        var ppx = SX(pw2[0]), ppy = SY(pw2[1]);
        if(ppx < -30 || ppx > W + 30 || ppy < -30 || ppy > H + 30) continue;
        ctx.globalAlpha = orbA * 0.9;
        ctx.beginPath(); ctx.arc(ppx, ppy, Math.min(4, Math.max(0.7, OSZ[j2] * Math.pow(s, 0.55) * 0.8)), 0, 7); ctx.fill();
      }
    }

    /* 太阳：随相机漂移滑入中心，最终缩成银河中一粒暖星 */
    if(u > 0.01 && fade > .01 && sunX > -90 && sunX < W + 90 && sunY > -90 && sunY < H + 90){
      var sunR = Math.min(26, Math.max(1.1, 2.2 * Math.pow(s, 0.55)));
      var sA = Math.min(1, 0.25 + seg(u, 0.05, 0.20)) * fade;
      var grd = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunR * 3.2);
      grd.addColorStop(0, C.glow + (0.85 * sA).toFixed(3) + ")");
      grd.addColorStop(1, C.glow + "0)");
      ctx.globalAlpha = 1; ctx.fillStyle = grd;
      ctx.beginPath(); ctx.arc(sunX, sunY, sunR * 3.2, 0, 7); ctx.fill();
      ctx.globalAlpha = sA; ctx.fillStyle = C.warm;
      ctx.beginPath(); ctx.arc(sunX, sunY, sunR, 0, 7); ctx.fill();
    }

    /* 地球：屏幕半径 = s（世界半径 1），大时是线框球，小了化作星点 */
    var ex = SX(EARTH[0]), ey = SY(EARTH[1]);
    if(s > 7){
      drawLand(m, s, ex, ey, xf * fade, mw);
    } else {
      var dA = (1 - seg(u, 0.50, 0.75)) * fade;
      if(dA > .01 && ex > -20 && ex < W + 20 && ey > -20 && ey < H + 20){
        ctx.globalAlpha = dA; ctx.fillStyle = C.star;
        ctx.beginPath(); ctx.arc(ex, ey, Math.max(1, Math.min(3, s)), 0, 7); ctx.fill();
      }
    }
    ctx.globalAlpha = 1;

    /* 阶段字幕 */
    if(cap){
      var lab = null, o = 0;
      if(p > .30 && p < .45){ lab = LABELS[0]; o = seg(p, .30, .34) * (1 - seg(p, .41, .45)); }
      else if(p > .55 && p < .72){ lab = LABELS[1]; o = seg(p, .55, .59) * (1 - seg(p, .68, .72)); }
      else if(p > .78 && p < .92){ lab = LABELS[2]; o = seg(p, .78, .82) * (1 - seg(p, .88, .92)); }
      if(lab){
        var zh = (document.documentElement.lang || "").indexOf("zh") === 0;
        cap.textContent = zh ? lab.zh : lab.en;
        cap.style.opacity = o;
      } else cap.style.opacity = 0;
    }
  }

  function resize(){
    var d = Math.min(devicePixelRatio || 1, 2);
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = W * d; cv.height = H * d;
    ctx.setTransform(d, 0, 0, d, 0, 0);
    draw(lastP);
  }

  var ticking = false;
  function onScroll(){
    if(ticking) return;
    ticking = true;
    requestAnimationFrame(function(){
      ticking = false;
      var r = wrap.getBoundingClientRect();
      var total = r.height - innerHeight;
      if(total <= 0) return;
      var p = Math.max(0, Math.min(1, -r.top / total));
      if(p > 0.002 && !took && window.__MAPHOOK){ capture(); window.__MAPHOOK.hide(true); took = true; }
      else if(p <= 0.002 && took){ window.__MAPHOOK.hide(false); took = false; hand = null; }
      lastP = p;
      draw(p);
    });
  }

  /* 静止微动：地球自转、银河缓旋（滚动中让位；地图接管阶段无需重绘） */
  function idle(){
    if(visible && lastP > 0.16 && !window.__pageScrolling() && !reduced){
      spin += 0.045; gal += 0.0004;
      draw(lastP);
    }
    requestAnimationFrame(idle);
  }

  resize();
  addEventListener("resize", resize);
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("themechange", function(){ C = null; draw(lastP); });
  new IntersectionObserver(function(en){ visible = en[0].isIntersecting; }, { threshold: 0 }).observe(wrap);
  requestAnimationFrame(idle);
  onScroll();
})();
