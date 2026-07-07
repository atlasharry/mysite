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
