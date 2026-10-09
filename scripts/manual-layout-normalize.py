#!/usr/bin/env python3
from argparse import ArgumentParser
from pathlib import Path

import numpy as np
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
MANUAL_DIR = ROOT / "docs" / "manual" / "v311"
STANDARD_PAGES = [*range(1, 10), *range(17, 74)]
ROW_THRESHOLD = 25
MERGE_GAP = 16
MIN_HEADER_TO_ID = 50
MIN_ID_TO_TITLE = 50


def bands_for(image):
    rgb = np.asarray(image.convert("RGB"), dtype=np.uint8)
    ink = np.any(rgb[:900] < 230, axis=2)
    counts = np.count_nonzero(ink, axis=1)
    active = np.flatnonzero(counts > ROW_THRESHOLD)
    bands = []
    if not active.size:
        return bands
    start = previous = int(active[0])
    for value in active[1:]:
        value = int(value)
        if value - previous > MERGE_GAP:
            bands.append((start, previous))
            start = value
        previous = value
    bands.append((start, previous))
    return bands


def normalize(path, apply):
    with Image.open(path) as opened:
        image = opened.convert("RGB")
        dpi = opened.info.get("dpi", (300, 300))
    bands = bands_for(image)
    if len(bands) < 4:
        raise RuntimeError(f"{path.name}: no se detectaron encabezado, identificación, título y subtítulo")
    header, identification, title = bands[0], bands[1], bands[2]
    header_gap = identification[0] - header[1] - 1
    title_gap = title[0] - identification[1] - 1
    delta = max(0, MIN_ID_TO_TITLE - title_gap)
    if delta and header_gap - delta < MIN_HEADER_TO_ID:
        raise RuntimeError(f"{path.name}: no puede cerrar ambas bandas ({header_gap}px/{title_gap}px)")
    if not delta:
        return header_gap, title_gap, 0
    top = max(header[1] + 1, identification[0] - 8)
    bottom = min(title[0], identification[1] + 9)
    block = image.crop((0, top, image.width, bottom))
    canvas = image.copy()
    white = Image.new("RGB", (image.width, bottom - top), "white")
    canvas.paste(white, (0, top))
    canvas.paste(block, (0, top - delta))
    if apply:
        canvas.save(path, format="PNG", dpi=(max(300, dpi[0]), max(300, dpi[1])), optimize=True)
    return header_gap - delta, title_gap + delta, delta


def main():
    parser = ArgumentParser()
    parser.add_argument("--apply", action="store_true", help="Guardar la normalización en las imágenes oficiales del candidato")
    args = parser.parse_args()
    changed = 0
    for number in STANDARD_PAGES:
        path = MANUAL_DIR / f"page-{number:02d}.png"
        header_gap, title_gap, delta = normalize(path, args.apply)
        changed += bool(delta)
        print(f"{path.name} header→id={header_gap}px id→title={title_gap}px move={delta}px")
    print(f"MANUAL_LAYOUT_NORMALIZE {'APPLIED' if args.apply else 'DRY_RUN'} pages={len(STANDARD_PAGES)} changed={changed}")


if __name__ == "__main__":
    main()

