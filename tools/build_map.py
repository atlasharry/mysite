"""生成抽象世界地图（无国界大陆轮廓，圆弧平滑）-> js/worldmap-data.js
数据源: Natural Earth 110m land（公有领域，大陆合并、无国界）。
抽稀 + 中点二次贝塞尔平滑 = 简洁圆弧质感。去南极洲。
用法: python tools/build_map.py"""
import json, urllib.request

URL = "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/master/110m/physical/ne_110m_land.json"
W, H, STEP, MIN_DEG2 = 1000, 500, 2, 18.0

def project(lon, lat):
    return ((lon + 180) / 360 * W, (90 - lat) / 180 * H)

def smooth_path(ring):
    """闭合环 -> 经过中点的二次贝塞尔平滑路径"""
    xs = [p[0] for p in ring]; ys = [p[1] for p in ring]
    if (max(xs)-min(xs)) * (max(ys)-min(ys)) < MIN_DEG2: return ""   # 丢小岛
    if max(ys) < -58: return ""                                      # 去南极洲
    pts = [project(x, y) for x, y in ring[::STEP]]
    n = len(pts)
    if n < 4: return ""
    def mid(a, b): return ((a[0]+b[0])/2, (a[1]+b[1])/2)
    d = "M%.1f %.1f" % mid(pts[0], pts[1])
    for i in range(1, n + 1):
        p = pts[i % n]
        m = mid(p, pts[(i + 1) % n])
        d += "Q%.1f %.1f %.1f %.1f" % (p[0], p[1], m[0], m[1])
    return d + "Z"

print("downloading", URL)
geo = json.load(urllib.request.urlopen(URL))
paths = []
for f in geo["features"]:
    g = f["geometry"]
    polys = g["coordinates"] if g["type"] == "MultiPolygon" else [g["coordinates"]]
    for poly in polys:
        d = smooth_path(poly[0])   # 只取外环
        if d: paths.append(d)
js = 'window.WORLD_MAP_PATH="' + "".join(paths) + '";\n'
with open("js/worldmap-data.js", "w", encoding="utf-8") as fh:
    fh.write(js)
print("ok: %d landmasses, %.1f KB" % (len(paths), len(js) / 1024))
