"""生成抽象世界地图 -> js/worldmap-data.js
数据源: Natural Earth 派生 GeoJSON (公有领域)。抽稀取点 + 丢弃小岛 = 抽象画质感。
用法: python tools/build_map.py"""
import json, urllib.request

URL = "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json"
W, H, STEP, MIN_DEG2 = 1000, 500, 3, 6.0

def project(lon, lat):
    return ((lon + 180) / 360 * W, (90 - lat) / 180 * H)

def ring_path(ring):
    if len(ring) < 3: return ""
    xs = [p[0] for p in ring]; ys = [p[1] for p in ring]
    if (max(xs)-min(xs)) * (max(ys)-min(ys)) < MIN_DEG2: return ""   # 丢小岛
    pts = ring[::STEP]
    if len(pts) < 3: return ""
    return "M" + "L".join("%.1f %.1f" % project(x, y) for x, y in pts) + "Z"

print("downloading", URL)
geo = json.load(urllib.request.urlopen(URL))
paths = []
for f in geo["features"]:
    g = f["geometry"]
    polys = g["coordinates"] if g["type"] == "MultiPolygon" else [g["coordinates"]]
    for poly in polys:
        d = ring_path(poly[0])   # 只取外环
        if d: paths.append(d)
js = 'window.WORLD_MAP_PATH="' + "".join(paths) + '";\n'
with open("js/worldmap-data.js", "w", encoding="utf-8") as fh:
    fh.write(js)
print("ok: %d rings, %.1f KB" % (len(paths), len(js) / 1024))
