/* 宇宙缩放序列：滚动驱动的一镜到底
   世界地图 -> 卷成地球 -> 退成太阳系行星 -> 太阳系缩成恒星 -> 银河系浮现 -> 衔接星空
   position:sticky 定幕 + 单 canvas 分镜渲染，进度 = 滚动位置 */
(function(){
  var wrap = document.getElementById("cosmos");
  var cv = document.getElementById("cosmosCanvas");
  var cap = document.getElementById("cosmosCap");
  if(!wrap || !cv || !window.WORLD_GLOBE) return;
  var ctx = cv.getContext("2d");
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var W = 0, H = 0, spin = 205, gal = 0, visible = false, lastP = 0;
  var RAD = Math.PI / 180, TILT = 16 * RAD;

  /* 银河粒子：双对数螺旋臂 + 核球（确定性伪随机，刷新不变） */
  var GPTS = [];
  (function(){
    var s = 42;
    function rnd(){ s = (s * 16807) % 2147483647; return s / 2147483647; }
    for(var arm = 0; arm < 2; arm++){
      for(var i = 0; i < 380; i++){
        var t = rnd() * 3.4 + 0.35;
        var a = arm * Math.PI + t * 2.2 + (rnd() - .5) * .55;
        var r = Math.pow(t / 3.75, 0.85);
        GPTS.push({ x: Math.cos(a) * r, y: Math.sin(a) * r * 0.58, s: rnd() * 1.5 + .4, o: rnd() * .65 + .25, w: rnd() < .22 });
      }
    }
    for(var j = 0; j < 170; j++){
      var rr = Math.pow(rnd(), 1.7) * .2, aa = rnd() * 6.283;
      GPTS.push({ x: Math.cos(aa) * rr, y: Math.sin(aa) * rr * .62, s: rnd() * 1.8 + .5, o: rnd() * .8 + .2, w: rnd() < .5 });
    }
  })();

  /* 阶段字幕 */
  var LABELS = [
    { until: .30, zh: "地球", en: "Earth" },
    { until: .58, zh: "太阳系", en: "The Solar System" },
    { until: 1.01, zh: "银河系", en: "The Milky Way" }
  ];

  function seg(p, a, b){ return Math.max(0, Math.min(1, (p - a) / (b - a))); }
  function ease(t){ return t < .5 ? 2*t*t : 1 - Math.pow(-2*t + 2, 2) / 2; }

  function colors(){
    var l = document.documentElement.dataset.theme === "light";
    return {
      line:  l ? "rgba(20,20,19,.55)"  : "rgba(235,219,188,.6)",
      faint: l ? "rgba(20,20,19,.13)"  : "rgba(235,219,188,.15)",
      star:  l ? "rgba(20,20,19,.75)"  : "rgba(250,249,245,.92)",
      warm:  l ? "#9c7c47" : "#ebdbbc"
    };
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

  /* 地图/地球：m=0 平铺地图，m=1 正交球；R、中心可变 */
  function drawLand(m, R, cx, cy, alpha, C, pre){
    if(alpha <= 0.01 || R < 1.2) return;
    var mw = Math.min(W * 0.7, H * 1.15, 860) * (1 - m * 0.15) * (pre || 1);
    ctx.lineWidth = 1;
    for(var i = 0; i < WORLD_GLOBE.length; i++){
      var ring = WORLD_GLOBE[i];
      /* 前面段与背面段分开描，背面随 m 渐隐 */
      for(var pass = 0; pass < 2; pass++){
        var a = pass === 0 ? alpha : alpha * (1 - m);
        if(a <= 0.02) continue;
        ctx.globalAlpha = a;
        ctx.strokeStyle = C.line;
        ctx.beginPath();
        var pen = false;
        for(var k = 0; k <= ring.length; k++){
          var q = ring[k % ring.length];
          var o = orthoPt(q[0], q[1], R, cx, cy);
          var front = o[2] > 0;
          if((pass === 0) !== front){ pen = false; continue; }
          var fx = cx + q[0] / 360 * mw, fy = cy - q[1] / 180 * (mw / 2);
          var px = fx + (o[0] - fx) * m, py = fy + (o[1] - fy) * m;
          if(pen) ctx.lineTo(px, py); else { ctx.moveTo(px, py); pen = true; }
        }
        ctx.stroke();
      }
    }
    /* 球面经纬网随卷曲浮现 */
    if(m > 0.35 && R > 24){
      ctx.globalAlpha = alpha * (m - 0.35) / 0.65 * 0.5;
      ctx.strokeStyle = C.faint;
      var g, a2, pts;
      for(g = -60; g <= 60; g += 30){
        ctx.beginPath(); var pen2 = false;
        for(a2 = -180; a2 <= 180; a2 += 6){
          var o1 = orthoPt(a2, g, R, cx, cy);
          if(o1[2] > 0){ if(pen2) ctx.lineTo(o1[0], o1[1]); else { ctx.moveTo(o1[0], o1[1]); pen2 = true; } }
          else pen2 = false;
        }
        ctx.stroke();
      }
      for(g = 0; g < 360; g += 30){
        ctx.beginPath(); var pen3 = false;
        for(a2 = -85; a2 <= 85; a2 += 6){
          var o2 = orthoPt(g, a2, R, cx, cy);
          if(o2[2] > 0){ if(pen3) ctx.lineTo(o2[0], o2[1]); else { ctx.moveTo(o2[0], o2[1]); pen3 = true; } }
          else pen3 = false;
        }
        ctx.stroke();
      }
      /* 球体轮廓 */
      ctx.globalAlpha = alpha * m;
      ctx.strokeStyle = C.line;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.stroke();
    }
  }

  function draw(p){
    var C = colors();
    ctx.clearRect(0, 0, W, H);
    var cx = W / 2, cy = H / 2;

    var m = ease(seg(p, 0.02, 0.30));   /* 地图卷球 */
    var e = ease(seg(p, 0.34, 0.56));   /* 球退成行星 */
    var s = ease(seg(p, 0.60, 0.84));   /* 太阳系退成恒星 */
    var g = ease(seg(p, 0.64, 0.92));   /* 银河浮现 */

    var sysScale = 1 - s * 0.99;
    var R0 = Math.min(W, H) * 0.30;
    var sysR = Math.min(W, H) * 0.38;

    /* 太阳系（先画，地球线框叠其上） */
    if(e > 0.01 && sysScale > 0.012){
      var orbits = [0.20, 0.33, 0.52, 0.70, 0.88];
      var angles = [0.7, 3.5, 2.45, 5.2, 1.6];
      var sizes  = [1.4, 2.1, 0, 1.9, 3.1];
      var sysA = e * (1 - seg(p, 0.78, 0.9));
      ctx.globalAlpha = sysA * 0.55;
      ctx.strokeStyle = C.faint;
      ctx.lineWidth = 1;
      for(var i = 0; i < orbits.length; i++){
        ctx.beginPath();
        ctx.ellipse(cx, cy, sysR * orbits[i] * sysScale, sysR * orbits[i] * 0.96 * sysScale, 0, 0, 7);
        ctx.stroke();
      }
      /* 太阳 */
      var sunR = Math.max(1.2, 7 * sysScale + 2 * s);
      var grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, sunR * 3);
      grd.addColorStop(0, C.warm);
      grd.addColorStop(1, "rgba(235,219,188,0)");
      ctx.globalAlpha = Math.max(sysA, s * (1 - g * 0.85));
      ctx.fillStyle = grd;
      ctx.beginPath(); ctx.arc(cx, cy, sunR * 3, 0, 7); ctx.fill();
      ctx.fillStyle = C.warm;
      ctx.beginPath(); ctx.arc(cx, cy, sunR, 0, 7); ctx.fill();
      /* 其他行星 */
      ctx.fillStyle = C.star;
      ctx.globalAlpha = sysA * 0.9;
      for(var j = 0; j < orbits.length; j++){
        if(!sizes[j]) continue;
        var px = cx + Math.cos(angles[j]) * sysR * orbits[j] * sysScale;
        var py = cy + Math.sin(angles[j]) * sysR * orbits[j] * 0.96 * sysScale;
        ctx.beginPath(); ctx.arc(px, py, Math.max(0.6, sizes[j] * sysScale * 2.2), 0, 7); ctx.fill();
      }
    }

    /* 地球：中心 -> 第三轨道位，同时缩小；随太阳系整体收拢 */
    var eAng = 2.45;
    var ex = cx + Math.cos(eAng) * sysR * 0.52, ey = cy + Math.sin(eAng) * sysR * 0.52 * 0.96;
    var gx = cx + (ex - cx) * e * sysScale + (cx - cx);
    var gy = cy + (ey - cy) * e * sysScale;
    var Rg = R0 * (1 - e * 0.972) * Math.max(sysScale, 0.012);
    var landAlpha = (p < 0.02 ? seg(p, 0, 0.02) : 1) * (1 - seg(p, 0.56, 0.66));
    /* 登场时接近上方大地图的宽度，随下滑先收缩再卷球 */
    var pre = 1.24 - 0.34 * ease(seg(p, 0, 0.22));
    drawLand(m, Math.max(Rg, 2), gx, gy, landAlpha, C, pre);
    /* 缩到极小后地球化为一粒星点 */
    if(Rg < 6 && sysScale > 0.012){
      ctx.globalAlpha = (1 - seg(p, 0.78, 0.9)) * 0.95;
      ctx.fillStyle = C.star;
      ctx.beginPath(); ctx.arc(gx, gy, Math.max(1, Rg * 0.6), 0, 7); ctx.fill();
    }

    /* 银河系：由内向外拉远浮现，缓慢旋转 */
    if(g > 0.01){
      var galR = Math.min(W, H) * (1.45 - g * 0.92 - seg(p, 0.92, 1) * 0.06);
      var gcx = cx - galR * 0.06, gcy = cy - galR * 0.02;
      var ca = Math.cos(gal), sa = Math.sin(gal);
      for(var k = 0; k < GPTS.length; k++){
        var q = GPTS[k];
        var rx = q.x * ca - q.y * sa, ry = q.x * sa + q.y * ca;
        var sx2 = gcx + rx * galR, sy2 = gcy + ry * galR * 0.9;
        if(sx2 < -20 || sx2 > W + 20 || sy2 < -20 || sy2 > H + 20) continue;
        ctx.globalAlpha = g * q.o;
        ctx.fillStyle = q.w ? C.warm : C.star;
        ctx.beginPath(); ctx.arc(sx2, sy2, q.s * (0.7 + g * 0.5), 0, 7); ctx.fill();
      }
      /* 银心辉光 */
      var core = ctx.createRadialGradient(gcx, gcy, 0, gcx, gcy, galR * 0.3);
      core.addColorStop(0, "rgba(235,219,188,.28)");
      core.addColorStop(1, "rgba(235,219,188,0)");
      ctx.globalAlpha = g;
      ctx.fillStyle = core;
      ctx.beginPath(); ctx.arc(gcx, gcy, galR * 0.3, 0, 7); ctx.fill();
    }
    ctx.globalAlpha = 1;

    /* 字幕 */
    if(cap){
      var lab = null, fadeIn = 0;
      if(p > 0.24 && p < 0.36) { lab = LABELS[0]; fadeIn = seg(p, 0.24, 0.28) * (1 - seg(p, 0.32, 0.36)); }
      else if(p > 0.42 && p < 0.60){ lab = LABELS[1]; fadeIn = seg(p, 0.42, 0.46) * (1 - seg(p, 0.56, 0.60)); }
      else if(p > 0.80 && p < 0.98){ lab = LABELS[2]; fadeIn = seg(p, 0.80, 0.84) * (1 - seg(p, 0.94, 0.98)); }
      if(lab){
        var zh = (document.documentElement.lang || "").indexOf("zh") === 0;
        cap.textContent = zh ? lab.zh : lab.en;
        cap.style.opacity = fadeIn;
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
      lastP = p;
      draw(p);
    });
  }

  /* 静止时的微动（自转/银河旋转），滚动中让位 */
  function idle(){
    if(visible && !window.__pageScrolling() && !reduced){
      spin += 0.045; gal += 0.0004;
      draw(lastP);
    }
    requestAnimationFrame(idle);
  }

  resize();
  addEventListener("resize", resize);
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("themechange", function(){ draw(lastP); });
  new IntersectionObserver(function(en){ visible = en[0].isIntersecting; }, { threshold: 0 }).observe(wrap);
  requestAnimationFrame(idle);
  onScroll();
})();
