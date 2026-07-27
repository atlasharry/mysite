"""手账页字体子集化：LXGW 文楷（中文手账体）+ Caveat（英文手写）。
每次改动 travel/ 或 js/diary-data.js 的文案后需重跑，否则新增汉字会回退到系统字体。
用法: pip install fonttools brotli; python tools/subset_diary_fonts.py (仓库根目录运行)"""
import pathlib, subprocess, urllib.request

BUILD = pathlib.Path("build"); BUILD.mkdir(exist_ok=True)

text = ""
for f in ["travel/index.html", "js/diary-data.js", "js/diary.js"]:
    text += pathlib.Path(f).read_text(encoding="utf-8")
ascii_all = "".join(chr(c) for c in range(32, 127))
chars = "".join(sorted(set(text + ascii_all))) + "♡·—“”《》…、。，？！：；（）øæÆÍó№"
(BUILD / "diary-glyphs.txt").write_text(chars, encoding="utf-8")
print("unique chars:", len(set(chars)))

FONTS = [
    ("https://github.com/lxgw/LxgwWenKai/releases/latest/download/LXGWWenKai-Regular.ttf",
     BUILD / "LXGWWenKai-Regular.ttf", pathlib.Path("assets/fonts/lxgw-diary.woff2")),
    ("https://github.com/google/fonts/raw/main/ofl/caveat/Caveat%5Bwght%5D.ttf",
     BUILD / "Caveat.ttf", pathlib.Path("assets/fonts/caveat-diary.woff2")),
]
for url, ttf, out in FONTS:
    if not ttf.exists():
        print("downloading", url)
        urllib.request.urlretrieve(url, ttf)
    subprocess.run(["pyftsubset", str(ttf), "--text-file=" + str(BUILD / "diary-glyphs.txt"),
                    "--flavor=woff2", "--output-file=" + str(out)], check=True)
    print("ok %s (%.0f KB)" % (out, out.stat().st_size / 1024))

# 自动 +1 字体版本号（diary.css 的 ?v=N），让所有访客缓存强制换新
import re
css = pathlib.Path("css/diary.css")
t = css.read_text(encoding="utf-8")
t, n = re.subn(r"\.woff2\?v=(\d+)", lambda m: ".woff2?v=%d" % (int(m.group(1)) + 1), t)
css.write_text(t, encoding="utf-8", newline="\n")
print("bumped font version (%d refs)" % n)
