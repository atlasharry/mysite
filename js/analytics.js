/* 访问统计（双通道）：
   - GoatCounter：免费无 cookie，看每日 PV/UV、国家地区、来源、路径（海外/隐私友好）
     注册 https://www.goatcounter.com 后把站点代号填进 GOATCOUNTER（如 "harryyu"）
   - 百度统计：国内访客地域最准（省市级）、国内加载快
     注册 https://tongji.baidu.com 后把跟踪代码 hm.js? 后面的那串填进 BAIDU
   两个都留空时本文件不发出任何请求 */
(function(){
  var GOATCOUNTER = "";
  var BAIDU = "";

  if(GOATCOUNTER){
    var g = document.createElement("script");
    g.async = true;
    g.dataset.goatcounter = "https://" + GOATCOUNTER + ".goatcounter.com/count";
    g.src = "https://gc.zgo.at/count.js";
    document.head.appendChild(g);
  }
  if(BAIDU){
    window._hmt = window._hmt || [];
    var b = document.createElement("script");
    b.async = true;
    b.src = "https://hm.baidu.com/hm.js?" + BAIDU;
    document.head.appendChild(b);
  }
})();
