/* 后台预热大图：入站空闲后按优先级逐张拉取（星空 -> 画展 -> 影像 -> 旅行缩略），
   逐张排队、低优先级，不与可见内容抢带宽；用户翻到时直接命中 HTTP 缓存。
   对海外主机（GitHub Pages）访问慢的网络尤其有效 */
(function(){
  if(!window.SITE) return;

  function buildList(){
    var l = [];
    function add(u){ if(u && l.indexOf(u) < 0) l.push(u); }
    (SITE.astro || []).forEach(function(x){ add(x.src + ".webp"); });
    (SITE.astro || []).forEach(function(x){ add(x.src + "-thumb.webp"); });
    ((SITE.exhibition || {}).works || []).forEach(function(x){ add(x.src + ".webp"); });
    (SITE.films || []).forEach(function(f){
      if(f.poster) add(f.poster + ".webp");
      (f.stills || []).forEach(function(s){ add(s.src + ".webp"); });
    });
    (SITE.locations || []).forEach(function(loc){
      (loc.items || []).forEach(function(it){ if(it.img) add(it.img + "-thumb.webp"); });
    });
    return l;
  }

  function warm(){
    var q = buildList(), i = 0;
    (function next(){
      if(i >= q.length) return;
      var img = new Image();
      try { img.fetchPriority = "low"; } catch(e){}
      img.decoding = "async";
      img.onload = img.onerror = function(){ setTimeout(next, 150); };
      img.src = q[i++];
    })();
  }

  addEventListener("load", function(){ setTimeout(warm, 2600); });
})();
