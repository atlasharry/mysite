(function(){
  var KEY = "site-lang";
  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch(e){}
  var lang = stored || (((navigator.language||"").toLowerCase().indexOf("zh")===0) ? "zh" : "en");
  var subs = [];

  function t(o){
    if(o == null) return "";
    if(typeof o === "string") return o;
    return o[lang] || o.zh || o.en || "";
  }
  function apply(){
    document.documentElement.lang = (lang === "zh") ? "zh-CN" : "en";
    document.querySelectorAll("[data-i18n]").forEach(function(el){
      var val = el.getAttribute("data-i18n").split(".").reduce(function(a,k){ return a && a[k]; }, SITE.i18n);
      if(val != null) el.textContent = t(val);
    });
    var btn = document.getElementById("langToggle");
    if(btn) btn.textContent = (lang === "zh") ? "EN" : "中";
    subs.forEach(function(f){ f(lang); });
  }
  function setLang(l){
    lang = l;
    try { localStorage.setItem(KEY, l); } catch(e){}
    apply();
  }
  window.I18N = {
    t: t, setLang: setLang, apply: apply,
    onChange: function(f){ subs.push(f); },
    get lang(){ return lang; }
  };
  document.addEventListener("DOMContentLoaded", function(){
    var btn = document.getElementById("langToggle");
    if(btn) btn.addEventListener("click", function(){ setLang(lang === "zh" ? "en" : "zh"); });
    apply();
  });
})();
