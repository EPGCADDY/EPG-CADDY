#!/usr/bin/env python3
import json
import re
import sys
from pathlib import Path

import numpy as np
from PIL import Image
from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
CONTROL_ROOT = ROOT / "CONTROL_PROYECTO_SCIRE" / "01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES"
MATRIX = json.loads((CONTROL_ROOT / "MATRIZ_TECNICA_EDITORIAL_MANUAL.json").read_text(encoding="utf-8"))
MANUAL_DIR = ROOT / "docs" / "manual" / "v311"
SOURCE = MANUAL_DIR / "manual-pages-17-35.json"
OVERRIDES = MANUAL_DIR / "manual-pages-bets-live-data.json"
PDF = MANUAL_DIR / "Manual_Golf_Score_Card_GT_COMPLETO.pdf"
STANDARD_PAGES = [*range(1, 10), *range(17, 74)]


def fail(message):
    failures.append(message)


def bands_for(path):
    with Image.open(path) as image:
        rgb = np.asarray(image.convert("RGB"), dtype=np.uint8)
    ink = np.any(rgb[:900] < 230, axis=2)
    counts = np.count_nonzero(ink, axis=1)
    active = np.flatnonzero(counts > 25)
    bands = []
    if active.size:
        start = previous = int(active[0])
        for value in active[1:]:
            value = int(value)
            if value - previous > 16:
                bands.append((start, previous))
                start = value
            previous = value
        bands.append((start, previous))
    return bands


failures = []
pages = sorted(MANUAL_DIR.glob("page-[0-9][0-9].png"))
if len(pages) != MATRIX["pages"]["count"]:
    fail(f"Se esperaban 74 PNG y existen {len(pages)}.")

spacing = MATRIX["spacing"]
layout_metrics = []
for number in STANDARD_PAGES:
    path = MANUAL_DIR / f"page-{number:02d}.png"
    bands = bands_for(path)
    if len(bands) < 4:
        fail(f"{path.name}: no se detectaron cuatro bloques superiores.")
        continue
    header, identification, title, subtitle = bands[:4]
    values = {
        "headerToIdentification": identification[0] - header[1] - 1,
        "identificationToTitle": title[0] - identification[1] - 1,
        "titleToSubtitle": subtitle[0] - title[1] - 1,
    }
    if values["headerToIdentification"] < spacing["headerToIdentificationMin"]:
        fail(f"{path.name}: encabezado→identificación {values['headerToIdentification']}px < {spacing['headerToIdentificationMin']}px.")
    if values["identificationToTitle"] < spacing["identificationToTitleMin"]:
        fail(f"{path.name}: identificación→título {values['identificationToTitle']}px < {spacing['identificationToTitleMin']}px.")
    if values["titleToSubtitle"] < spacing["titleToSubtitleMin"]:
        fail(f"{path.name}: título→subtítulo {values['titleToSubtitle']}px < {spacing['titleToSubtitleMin']}px.")
    layout_metrics.append(values)

try:
    source_pages = json.loads(SOURCE.read_text(encoding="utf-8"))
except Exception as error:
    fail(f"Fuente editorial inválida: {error}")
    source_pages = []
override_pages = []
if OVERRIDES.exists():
    try:
        override_pages = json.loads(OVERRIDES.read_text(encoding="utf-8"))
    except Exception as error:
        fail(f"Fuente de apuestas/datos vivos inválida: {error}")

combined = {str(item.get("number")): item for item in source_pages}
combined.update({str(item.get("number")): item for item in override_pages})
all_text = " ".join(json.dumps(item, ensure_ascii=False) for item in combined.values()).casefold()
for topic in MATRIX["requiredTopics"]:
    if topic.casefold() not in all_text:
        fail(f"Cobertura ausente: {topic}.")

required_fields = set(MATRIX["didacticRequiredFields"])
for item in override_pages:
    didactic = item.get("didactic", {})
    missing = sorted(required_fields - set(didactic))
    if missing:
        fail(f"Página {item.get('number')}: faltan campos didácticos {', '.join(missing)}.")
    if len(item.get("steps", [])) != 4:
        fail(f"Página {item.get('number')}: debe tener exactamente cuatro pasos.")
    for value in [item.get("title", ""), item.get("subtitle", ""), item.get("remember", ""), *[step[1] for step in item.get("steps", []) if len(step) > 1]]:
        for sentence in re.split(r"[.!?]+", value):
            words = sentence.split()
            if len(words) > 30:
                fail(f"Página {item.get('number')}: oración de {len(words)} palabras supera 30.")

try:
    pdf_pages = len(PdfReader(str(PDF)).pages)
    if pdf_pages != MATRIX["pages"]["pdfCount"]:
        fail(f"PDF físico con {pdf_pages} páginas; se requieren 74.")
except Exception as error:
    fail(f"No se pudo verificar el PDF: {error}")

if failures:
    print("MANUAL_EDITORIAL_QC FAIL", file=sys.stderr)
    for message in failures:
        print(f"- {message}", file=sys.stderr)
    raise SystemExit(1)

print(
    "MANUAL_EDITORIAL_QC PASS "
    f"pages=74 standardProfiles={len(layout_metrics)} topics={len(MATRIX['requiredTopics'])} "
    f"didacticOverrides={len(override_pages)} pdf=74"
)

