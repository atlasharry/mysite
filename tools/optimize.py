"""一次性图片压缩：源图 -> assets/<类别>/<base>.webp + .jpg + -thumb.webp
用法: python tools/optimize.py   (在仓库根目录运行; 需要 pip install Pillow)"""
import os, glob, sys
from PIL import Image

LARGE, THUMB = 2000, 640

# (源文件, 输出目录, 输出 base 名)
EXPLICIT = [
    ("films/生日礼物/生日礼物海报.png",                        "assets/films", "birthday-poster"),
    ("films/生日礼物/屏幕截图 2026-07-07 004742.png",          "assets/films", "birthday-still-01"),
    ("films/双盲/ChatGPT Image Apr 24, 2026, 10_31_10 AM.png", "assets/films", "doubleblind-poster"),
    ("films/双盲/7d944e340c10bc7561dcbf8f64d0e509.jpg",        "assets/films", "doubleblind-still-01"),
    ("films/双盲/812888bae619bbe411d2eb733950ccd1.jpg",        "assets/films", "doubleblind-still-02"),
    ("films/双盲/edd66e92f21fb58f95f158f769f3a6da.jpg",        "assets/films", "doubleblind-still-03"),
]
# the world I see 五张按文件名排序 -> world-01..05
world = sorted(glob.glob("assets/raw/the world I see/*.jpg"))
EXPLICIT += [(p, "assets/world", "world-%02d" % (i+1)) for i, p in enumerate(world)]
# 通用规则：assets/raw/astro/* -> assets/astro/astro-NN；assets/raw/travel/<loc>/* -> assets/travel/<loc>/<loc>-NN
for i, p in enumerate(sorted(glob.glob("assets/raw/astro/*.*"))):
    EXPLICIT.append((p, "assets/astro", "astro-%02d" % (i+1)))
for d in sorted(glob.glob("assets/raw/travel/*/")):
    loc = os.path.basename(os.path.normpath(d))
    for i, p in enumerate(sorted(glob.glob(d + "*.*"))):
        EXPLICIT.append((p, "assets/travel/" + loc, "%s-%02d" % (loc, i+1)))

def process(src, outdir, base):
    os.makedirs(outdir, exist_ok=True)
    im = Image.open(src).convert("RGB")
    big = im.copy(); big.thumbnail((LARGE, LARGE), Image.LANCZOS)
    big.save(os.path.join(outdir, base + ".webp"), "WEBP", quality=82)
    big.save(os.path.join(outdir, base + ".jpg"), "JPEG", quality=85, progressive=True)
    th = im.copy(); th.thumbnail((THUMB, THUMB), Image.LANCZOS)
    th.save(os.path.join(outdir, base + "-thumb.webp"), "WEBP", quality=78)
    print("ok  %-38s -> %s/%s  (%dx%d)" % (src, outdir, base, big.width, big.height))

count = 0
for src, outdir, base in EXPLICIT:
    if not os.path.exists(src):
        print("skip (missing): " + src); continue
    process(src, outdir, base); count += 1
print("done: %d images" % count)
