"""字体子集化: 提取站点实际用字 -> woff2
用法: pip install fonttools brotli; python tools/subset_fonts.py"""
import pathlib, subprocess, urllib.request

FONTS = [
    ("https://github.com/google/fonts/raw/main/ofl/notoserifsc/NotoSerifSC%5Bwght%5D.ttf",
     "build/NotoSerifSC.ttf", "assets/fonts/noto-serif-sc-subset.woff2"),
    ("https://github.com/google/fonts/raw/main/ofl/lora/Lora%5Bwght%5D.ttf",
     "build/Lora.ttf", "assets/fonts/lora-subset.woff2"),
]
text = ""
for f in ["index.html", "js/data.js", "resume/index.html"]:
    text += pathlib.Path(f).read_text(encoding="utf-8")
chars = "".join(sorted(set(text))) + "0123456789ⅠⅡⅢⅣⅤ·—×"
pathlib.Path("build").mkdir(exist_ok=True)
glyphs = pathlib.Path("build/glyphs.txt"); glyphs.write_text(chars, encoding="utf-8")
print("unique chars:", len(chars))
for url, ttf, out in FONTS:
    if not pathlib.Path(ttf).exists():
        print("downloading", url)
        urllib.request.urlretrieve(url, ttf)
    subprocess.run(["pyftsubset", ttf, "--text-file=build/glyphs.txt",
                    "--flavor=woff2", "--output-file=" + out], check=True)
    kb = pathlib.Path(out).stat().st_size / 1024
    print("ok %s (%.0f KB)" % (out, kb))
