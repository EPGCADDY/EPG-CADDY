from pathlib import Path
import sys

import numpy as np
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
MANUAL_DIR = ROOT / "docs" / "manual" / "v311"
EXPECTED_SIZE = (2160, 4320)
EXPECTED_DENSITY = 300
BODY_START = 250
BODY_END = 4070
SAFE_X = 70
ROW_INK_MINIMUM = 18

failures = []
course_metrics = []


def fail(page, rule, actual):
    failures.append(f"{page}: {rule} ({actual})")


for page_number in range(0, 74):
    page = f"page-{page_number:02d}.png"
    file = MANUAL_DIR / page
    if not file.exists():
        fail(page, "archivo 4K ausente", file)
        continue

    with Image.open(file) as image:
        if image.size != EXPECTED_SIZE:
            fail(page, "resolución obligatoria 2160×4320", f"{image.width}×{image.height}")
        density = image.info.get("dpi", (0, 0))
        if min(density) < EXPECTED_DENSITY - 0.5:
            fail(page, "densidad mínima obligatoria 300 dpi", f"{density[0]:.1f}×{density[1]:.1f} dpi")
        rgba = np.asarray(image.convert("RGBA"), dtype=np.uint8)

    rgb = rgba[:, :, :3]
    alpha = rgba[:, :, 3]
    ink = (alpha > 8) & np.any(rgb < 246, axis=2)
    non_white = int(np.count_nonzero(ink))
    spread = rgb.max(axis=2).astype(np.int16) - rgb.min(axis=2).astype(np.int16)
    neutral_ink = int(np.count_nonzero(ink & (spread < 28)))
    r = rgb[:, :, 0].astype(np.float32)
    g = rgb[:, :, 1].astype(np.float32)
    b = rgb[:, :, 2].astype(np.float32)
    saturated_green = int(np.count_nonzero(ink & (g > 110) & (g > r * 1.35) & (g > b * 1.2)))
    edge_ink = int(
        np.count_nonzero(ink[:10, :])
        + np.count_nonzero(ink[-10:, :])
        + np.count_nonzero(ink[10:-10, :10])
        + np.count_nonzero(ink[10:-10, -10:])
    )

    if edge_ink:
        fail(page, "contenido recortado o pegado al borde", f"{edge_ink} píxeles")
    neutral_ratio = neutral_ink / non_white if non_white else 0
    green_ratio = saturated_green / non_white if non_white else 0
    if neutral_ratio < 0.72:
        fail(page, "predominio tipográfico negro/gris", f"{neutral_ratio * 100:.1f} %")
    if green_ratio > 0.10:
        fail(page, "verde limitado a acentos", f"{green_ratio * 100:.1f} %")

    if page_number < 10 or page_number > 16:
        continue

    body_ink = ink[BODY_START:BODY_END + 1, :]
    row_counts = np.count_nonzero(body_ink, axis=1)
    active_rows = np.flatnonzero(row_counts >= ROW_INK_MINIMUM)
    if active_rows.size == 0:
        fail(page, "bloque editorial detectable", "sin bloque")
        continue

    body_top = int(active_rows[0] + BODY_START)
    body_bottom = int(active_rows[-1] + BODY_START)
    active_pixels = np.argwhere(body_ink)
    body_min_x = int(active_pixels[:, 1].min())
    body_max_x = int(active_pixels[:, 1].max())
    top_air = body_top - BODY_START
    bottom_air = BODY_END - body_bottom
    vertical_delta = abs(top_air - bottom_air)
    occupancy = (body_bottom - body_top) / (BODY_END - BODY_START)

    if vertical_delta > 420:
        fail(page, "equilibrio vertical tipo iPhone", f"diferencia {vertical_delta}px")
    if occupancy < 0.40 or occupancy > 0.86:
        fail(page, "ocupación editorial equilibrada", f"{occupancy * 100:.1f} %")
    if body_min_x < SAFE_X or body_max_x >= image.width - SAFE_X:
        fail(page, "márgenes laterales seguros", f"{body_min_x}px / {image.width - 1 - body_max_x}px")
    course_metrics.append((page, vertical_delta, occupancy))


if failures:
    print("MANUAL_VISUAL_QC FAIL", file=sys.stderr)
    for failure in failures:
        print(f"- {failure}", file=sys.stderr)
    raise SystemExit(1)

max_delta = max(metric[1] for metric in course_metrics)
min_occupancy = min(metric[2] for metric in course_metrics)
max_occupancy = max(metric[2] for metric in course_metrics)
print(
    "MANUAL_VISUAL_QC PASS "
    f"pages=74 coursePages=7 resolution=2160x4320 density>=300dpi "
    f"verticalDeltaMax={max_delta}px occupancy={min_occupancy * 100:.1f}-{max_occupancy * 100:.1f}%"
)
