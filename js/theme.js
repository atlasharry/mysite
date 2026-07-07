(function(){
  var KEY = "site-theme";
  var theme = "dark";
  try { theme = localStorage.getItem(KEY) || "dark"; } catch(e){}
  var q = null;
  try { q = new URLSearchParams(location.search).get("theme"); } catch(e){}
  if(q === "light" || q === "dark") theme = q;

  var SUN = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8"/></svg>';
  var MOON = '<svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
  function apply(){
    document.documentElement.dataset.theme = theme;
    var btn = document.getElementById("themeToggle");
    if(btn) btn.innerHTML = (theme === "dark") ? SUN : MOON;
    dispatchEvent(new CustomEvent("themechange", { detail: theme }));
  }
  window.THEME = {
    get current(){ return theme; },
    isLight: function(){ return theme === "light"; },
    toggle: function(){
      theme = (theme === "dark") ? "light" : "dark";
      try { localStorage.setItem(KEY, theme); } catch(e){}
      apply();
    }
  };
  document.documentElement.dataset.theme = theme;
  document.addEventListener("DOMContentLoaded", function(){
    var btn = document.getElementById("themeToggle");
    if(btn) btn.addEventListener("click", THEME.toggle);
    apply();
  });
})();
