(function(){
  var KEY = "site-theme";
  var theme = "dark";
  try { theme = localStorage.getItem(KEY) || "dark"; } catch(e){}

  function apply(){
    document.documentElement.dataset.theme = theme;
    var btn = document.getElementById("themeToggle");
    if(btn) btn.textContent = (theme === "dark") ? "☀" : "☾";
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
