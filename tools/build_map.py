"""生成抽象世界地图（无国界大陆轮廓，圆弧平滑）两级细节:
- js/worldmap-data.js   概览层 (110m, 粗)   -> window.WORLD_MAP_PATH
- js/worldmap-detail.js 细节层 (50m, 精)    -> window.WORLD_MAP_PATH_DETAIL（放大时懒加载）
数据源: Natural Earth land（公有领域，大陆合并、无国界）。去南极洲。
用法: python tools/build_map.py"""
import json, urllib.request

BASE = "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/master/"
W, H = 1000, 500

def project(lon, lat):
    return ((lon + 180) / 360 * W, (90 - lat) / 180 * H)

def smooth_path(ring, step, min_deg2):
    """闭合环 -> 经过中点的二次贝塞尔平滑路径"""
    xs = [p[0] for p in ring]; ys = [p[1] for p in ring]
    if (max(xs)-min(xs)) * (max(ys)-min(ys)) < min_deg2: return ""   # 丢小岛
    if max(ys) < -58: return ""                                      # 去南极洲
    pts = [project(x, y) for x, y in ring[::step]]
    n = len(pts)
    if n < 4: return ""
    def mid(a, b): return ((a[0]+b[0])/2, (a[1]+b[1])/2)
    d = "M%.1f %.1f" % mid(pts[0], pts[1])
    for i in range(1, n + 1):
        p = pts[i % n]
        m = mid(p, pts[(i + 1) % n])
        d += "Q%.1f %.1f %.1f %.1f" % (p[0], p[1], m[0], m[1])
    return d + "Z"

def build(res, step, min_deg2, varname, outfile):
    url = BASE + res
    print("downloading", url)
    geo = json.load(urllib.request.urlopen(url))
    paths = []
    for f in geo["features"]:
        g = f["geometry"]
        polys = g["coordinates"] if g["type"] == "MultiPolygon" else [g["coordinates"]]
        for poly in polys:
            d = smooth_path(poly[0], step, min_deg2)   # 只取外环
            if d: paths.append(d)
    js = "window." + varname + '="' + "".join(paths) + '";\n'
    with open(outfile, "w", encoding="utf-8") as fh:
        fh.write(js)
    print("ok: %s -> %d landmasses, %.1f KB" % (outfile, len(paths), len(js) / 1024))

build("110m/physical/ne_110m_land.json", 2, 18.0, "WORLD_MAP_PATH",        "js/worldmap-data.js")
build("50m/physical/ne_50m_land.json",   2, 0.8,  "WORLD_MAP_PATH_DETAIL", "js/worldmap-detail.js")
