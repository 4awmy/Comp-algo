import os
import zipfile
from pathlib import Path

BASE_DIR = Path(r"C:\Users\omarh\projects\Comp-algo")
SECTIONS_DIR = BASE_DIR / "Sections"
OUT_MEDIA_DIR = BASE_DIR / "public" / "images" / "sheets"

OUT_MEDIA_DIR.mkdir(parents=True, exist_ok=True)

for f in os.listdir(SECTIONS_DIR):
    if not f.endswith(".docx"):
        continue
    doc_path = SECTIONS_DIR / f
    sheet_num = f.split("Sheet ")[1].split(" - ")[0]
    sheet_dir = OUT_MEDIA_DIR / f"sheet{sheet_num}"
    sheet_dir.mkdir(parents=True, exist_ok=True)
    
    print(f"Extracting images from {f} to {sheet_dir.name} ...")
    with zipfile.ZipFile(doc_path) as z:
        for name in z.namelist():
            if name.startswith("word/media/"):
                img_bytes = z.read(name)
                out_path = sheet_dir / os.path.basename(name)
                out_path.write_bytes(img_bytes)
                print(f"  Saved {out_path.name}")
print("Done extracting media!")
