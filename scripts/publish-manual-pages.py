from pathlib import Path
import os
import sys

from PIL import Image


if len(sys.argv) != 3:
    raise SystemExit("USO: publish-manual-pages.py DIRECTORIO_RENDER DIRECTORIO_DESTINO")

source_dir = Path(sys.argv[1]).resolve()
target_dir = Path(sys.argv[2]).resolve()
sources = sorted(source_dir.glob("render-*.png")) or sorted(source_dir.glob("page-*.png"))
if not sources:
    raise SystemExit("No se encontraron páginas renderizadas")

target_dir.mkdir(parents=True, exist_ok=True)
for index, source in enumerate(sources):
    target = target_dir / f"page-{index:02d}.png"
    temporary = target.with_suffix(".tmp.png")
    with Image.open(source) as image:
        image.load()
        if image.size != (2160, 4320):
            raise ValueError(f"{source.name}: resolución inesperada {image.size}")
        image.save(temporary, format="PNG", dpi=(300, 300), compress_level=6)
    with Image.open(temporary) as check:
        check.load()
        if check.size != (2160, 4320) or min(check.info.get("dpi", (0, 0))) < 299.5:
            raise ValueError(f"{temporary.name}: verificación 4K/300 dpi fallida")
    os.replace(temporary, target)

print(f"PUBLISHED_MANUAL_PAGES={len(sources)}")
