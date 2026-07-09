/* 3D 线框地球：旅行地图 -> 星空的过渡幕。正交投影 + 缓慢自转，主题感知 */
(function(){
  var cv = document.getElementById("globeCanvas");
  if(!cv || !window.WORLD_GLOBE) return;
  var ctx = cv.getContext("2d");
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var W = 0, H = 0, R = 0, visible = false;
  var rot = 200, TILT = 16 * Math.PI / 180;
  var RAD = Math.PI / 180;

  function resize(){
    var d = Math.min(devicePixelRatio || 1, 2);
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = W * d; cv.height = H * d;
    ctx.setTransform(d, 0, 0, d, 0, 0);
    R = Math.min(W, H) * 0.38;
    draw();
  }

  /* 正交投影：返回 [sx, sy, 前半球?] */
  function project(lon, lat){
    var l = (lon + rot) * RAD, f = lat * RAD;
    var x = Math.cos(f) * Math.sin(l);
    var y = Math.sin(f);
    var z = Math.cos(f) * Math.cos(l);
    var y2 = y * Math.cos(TILT) - z * Math.sin(TILT);
    var z2 = y * Math.sin(TILT) + z * Math.cos(TILT);
    return [W/2 + R * x, H/2 - R * y2, z2 > 0];
  }

  function strokeRing(pts, closed){
    var pen = false;
    ctx.beginPath();
    for(var i = 0; i < pts.length + (closed ? 1 : 0); i++){
      var p = pts[i % pts.length];
      var s = project(p[0], p[1]);
      if(s[2]){
        if(pen) ctx.lineTo(s[0], s[1]); else { ctx.moveTo(s[0], s[1]); pen = true; }
      } else pen = false;
    }
    ctx.stroke();
  }

  function draw(){
    var light = document.documentElement.dataset.theme === "light";
    ctx.clearRect(0, 0, W, H);
    /* 球体轮廓 */
    ctx.strokeStyle = light ? "rgba(20,20,19,.35)" : "rgba(235,219,188,.4)";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(W/2, H/2, R, 0, 7); ctx.stroke();
    /* 经纬网（30° 一条） */
    ctx.strokeStyle = light ? "rgba(20,20,19,.10)" : "rgba(235,219,188,.12)";
    var g, pts, a;
    for(g = -60; g <= 60; g += 30){          /* 纬线 */
      pts = [];
      for(a = -180; a <= 180; a += 6) pts.push([a, g]);
      strokeRing(pts, false);
    }
    for(g = 0; g < 180; g += 30){            /* 经线 */
      pts = [];
      for(a = -85; a <= 85; a += 6) pts.push([g, a]);
      strokeRing(pts, false);
      pts = [];
      for(a = -85; a <= 85; a += 6) pts.push([g - 180, a]);
      strokeRing(pts, false);
    }
    /* 大陆线框 */
    ctx.strokeStyle = light ? "rgba(20,20,19,.45)" : "rgba(235,219,188,.55)";
    ctx.lineWidth = 1;
    for(var i = 0; i < WORLD_GLOBE.length; i++) strokeRing(WORLD_GLOBE[i], true);
  }

  function loop(){
    if(visible && !window.__pageScrolling()){
      rot += 0.06;
      draw();
    }
    requestAnimationFrame(loop);
  }

  resize();
  addEventListener("resize", resize);
  addEventListener("themechange", draw);
  new IntersectionObserver(function(en){ visible = en[0].isIntersecting; }, { threshold: 0 }).observe(cv);
  if(!reduced) requestAnimationFrame(loop);
})();
