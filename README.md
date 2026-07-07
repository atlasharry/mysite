# 余城宇 · Harry Yu — 个人网站

纯静态单页站。无框架、无构建、零第三方请求。

## 本地预览

```powershell
python -m http.server 8000   # http://localhost:8000
```

## 更新内容

- 文案/影片/地点：编辑 `js/data.js`（全站内容唯一来源）
- 加照片：原图放 `assets/raw/<类别>/`，运行 `python tools/optimize.py`，把生成的 base 路径填进 `js/data.js`
- 世界地图加地点：`js/data.js` 的 `locations` 加一条（lat/lon + items）
- 重新生成地图轮廓：`python tools/build_map.py`
- 文案改动后重新子集化字体：`python tools/subset_fonts.py`

## 部署（push 即上线）

1. GitHub 建仓并推送：`git remote add origin <repo-url>; git push -u origin main`
2. Cloudflare Pages（主线）：Dashboard → Workers & Pages → 连接该仓库，
   Framework preset = None，Build command 留空，Output dir = `/`
3. GitHub Pages（备线）：仓库 Settings → Pages → Deploy from branch → main / root
4. 自定义域名：在 Cloudflare Pages 绑定（可后续再加）

## 红线（改动前必读）

- 《生日礼物》正片任何形式不得上传/外链（FIRST 世界首映资格）
- 手机号/住址/出生日期/亲属信息不进仓库不上站
- `assets/raw/` 已 gitignore，原图不入库
