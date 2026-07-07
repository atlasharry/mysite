(function(){
  var W = 1000, H = 500, NS = "http://www.w3.org/2000/svg";
  var current = null;

  function proj(lat, lon){ return [(lon + 180)/360*W, (90 - lat)/180*H]; }

  function build(){
    var wrap = document.getElementById("mapWrap");
    if(!wrap || !window.WORLD_MAP_PATH) return;
    wrap.innerHTML = "";
    var svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    var outline = document.createElementNS(NS, "path");
    outline.setAttribute("d", WORLD_MAP_PATH);
    outline.setAttribute("class", "map-outline");
    svg.appendChild(outline);
    SITE.locations.forEach(function(loc){
      var p = proj(loc.lat, loc.lon);
      var g = document.createElementNS(NS, "g");
      g.setAttribute("class", "pin" + (loc.items.length ? " has" : ""));
      g.setAttribute("transform", "translate(" + p[0].toFixed(1) + "," + p[1].toFixed(1) + ")");
      g.innerHTML = '<circle class="dot" r="2"></circle>' +
        '<line x1="0" y1="0" x2="5" y2="-13"></line>' +
        '<circle class="head" cx="5" cy="-15" r="4.2"></circle>';
      var title = document.createElementNS(NS, "title");
      title.textContent = I18N.t(loc.name);
      g.appendChild(title);
      g.addEventListener("click", function(){ select(loc); });
      svg.appendChild(g);
    });
    wrap.appendChild(svg);
  }

  function select(loc){
    current = loc;
    renderPanel();
    document.getElementById("locPanel").scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function renderPanel(){
    var panel = document.getElementById("locPanel");
    if(!current){ panel.hidden = true; return; }
    panel.hidden = false;
    var items = current.items || [];
    var html = '<h4>' + I18N.t(current.name) + '</h4>';
    if(!items.length){
      html += '<p class="loc-empty">' + I18N.t(SITE.i18n.travel.empty) + ' · Coming soon</p>';
    } else {
      html += '<div class="loc-grid">' + items.map(function(it, i){
        if(it.video){
          return '<video controls preload="metadata" src="' + it.video + '"></video>';
        }
        return '<a data-i="' + i + '"><img src="' + it.img + '-thumb.webp" loading="lazy" alt=""></a>';
      }).join("") + '</div>';
    }
    panel.innerHTML = html;
    var imgs = items.filter(function(it){ return it.img; });
    panel.querySelectorAll("a[data-i]").forEach(function(a){
      a.addEventListener("click", function(){
        openLightbox(imgs.map(function(it){ return { src: it.img + ".webp", cap: I18N.t(it.cap || current.name) }; }),
          parseInt(a.dataset.i, 10));
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function(){
    build();
    I18N.onChange(function(){ build(); renderPanel(); });
  });
})();
