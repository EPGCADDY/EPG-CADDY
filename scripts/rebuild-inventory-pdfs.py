#!/usr/bin/env python3
"""Rebuild the three sealed V311 inventory PDFs from repository sources."""

import hashlib
import html
import json
import re
import subprocess
from datetime import datetime, timezone
from functools import partial
from pathlib import Path

from PIL import Image
from reportlab import rl_config
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import PageBreak, Paragraph, SimpleDocTemplate, Spacer
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT.parent / "output" / "pdf"
TMP = ROOT / "tmp" / "pdfs"
OVERALL = OUTPUT / "Inventario_Golf_Score_Card_GT_OVERALL_V311.pdf"
DETAIL = OUTPUT / "Inventario_Golf_Score_Card_GT_A_DETALLE_V311.pdf"
IMAGES = OUTPUT / "Inventario_Golf_Score_Card_GT_POR_IMAGENES_Y_RUBROS_V311.pdf"
LOCK = ROOT / "CONTROL_PROYECTO_SCIRE" / "INVENTARIOS_V311.lock.json"
REGULAR = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"

rl_config.invariant = 1


def clean(value):
    return value.replace("\u2011", "-").replace("\u2013", "-").replace("\u2014", "-")


def register_fonts():
    pdfmetrics.registerFont(TTFont("InventorySans", REGULAR))
    pdfmetrics.registerFont(TTFont("InventorySans-Bold", BOLD))


def footer(canvas_obj, document):
    canvas_obj.saveState()
    canvas_obj.setStrokeColor(HexColor("#31ff00"))
    canvas_obj.setLineWidth(0.6)
    canvas_obj.line(18 * mm, 12 * mm, A4[0] - 18 * mm, 12 * mm)
    canvas_obj.setFillColor(HexColor("#555555"))
    canvas_obj.setFont("InventorySans", 7)
    canvas_obj.drawString(18 * mm, 7.5 * mm, "GOLF SCORE CARD GT - INVENTARIO VERIFICABLE V311")
    canvas_obj.drawRightString(A4[0] - 18 * mm, 7.5 * mm, f"Pagina {document.page}")
    canvas_obj.restoreState()


def markdown_pdf(source, target, title):
    styles = getSampleStyleSheet()
    base = ParagraphStyle("Body", parent=styles["BodyText"], fontName="InventorySans", fontSize=8.2, leading=11, textColor=HexColor("#202020"), spaceAfter=3)
    h1 = ParagraphStyle("H1", parent=base, fontName="InventorySans-Bold", fontSize=17, leading=20, textColor=HexColor("#101010"), spaceBefore=8, spaceAfter=9)
    h2 = ParagraphStyle("H2", parent=base, fontName="InventorySans-Bold", fontSize=12, leading=15, textColor=HexColor("#101010"), spaceBefore=7, spaceAfter=5)
    h3 = ParagraphStyle("H3", parent=base, fontName="InventorySans-Bold", fontSize=9.5, leading=12, textColor=HexColor("#101010"), spaceBefore=5, spaceAfter=3)
    code = ParagraphStyle("Code", parent=base, fontName="InventorySans", fontSize=6.5, leading=8.2, leftIndent=4 * mm, rightIndent=2 * mm, backColor=HexColor("#f2f2f2"), borderPadding=3)
    cover = ParagraphStyle("Cover", parent=h1, alignment=TA_CENTER, fontSize=24, leading=29, spaceAfter=14)
    story = [Spacer(1, 45 * mm), Paragraph(html.escape(title), cover), Paragraph("Fuente: candidato V334-M1 - Produccion intacta", ParagraphStyle("CoverSub", parent=base, alignment=TA_CENTER, fontSize=10)), PageBreak()]
    for raw in source.read_text(encoding="utf-8").splitlines():
        line = clean(raw.rstrip())
        if not line:
            story.append(Spacer(1, 2.5 * mm))
            continue
        if line.startswith("# "):
            story.append(Paragraph(html.escape(line[2:]), h1))
        elif line.startswith("## "):
            story.append(Paragraph(html.escape(line[3:]), h2))
        elif line.startswith("### "):
            story.append(Paragraph(html.escape(line[4:]), h3))
        elif line.startswith("| ") or line.startswith("```"):
            story.append(Paragraph(html.escape(line), code))
        elif re.match(r"^[-*] ", line):
            story.append(Paragraph("- " + html.escape(line[2:]), base))
        else:
            escaped = html.escape(line).replace("`", "")
            story.append(Paragraph(escaped, base))
    document = SimpleDocTemplate(str(target), pagesize=A4, rightMargin=18 * mm, leftMargin=18 * mm, topMargin=16 * mm, bottomMargin=17 * mm, title=title, author="Golf Score Card GT")
    document.build(story, onFirstPage=footer, onLaterPages=footer, canvasmaker=partial(canvas.Canvas, invariant=1))


def image_inventory_pdf(target):
    paths = sorted((ROOT / "ROADMAP_IMAGES").glob("*.png"))
    if not paths:
        raise RuntimeError("No existen imagenes de ROADMAP_IMAGES")
    document = canvas.Canvas(str(target), pagesize=A4, pageCompression=1, invariant=1)
    document.setTitle("Inventario Golf Score Card GT por imagenes y rubros V311")
    document.setAuthor("Golf Score Card GT")
    document.setFillColor(HexColor("#101010"))
    document.setFont("InventorySans-Bold", 21)
    document.drawCentredString(A4[0] / 2, A4[1] - 58 * mm, "INVENTARIO POR IMAGENES Y RUBROS")
    document.setFont("InventorySans", 10)
    document.drawCentredString(A4[0] / 2, A4[1] - 70 * mm, "Base visual V292 + registro candidato V334-M1")
    document.showPage()
    for index, path in enumerate(paths, start=1):
        with Image.open(path) as image:
            width, height = image.size
        # Preserve the source at a readable zoom. Very tall historical sheets
        # use a correspondingly tall PDF page instead of shrinking to a strip.
        scale = min(0.75, 13900 / max(width, height))
        page_width = width * scale + 48
        page_height = height * scale + 66
        document.setPageSize((page_width, page_height))
        document.setFillColor(HexColor("#ffffff"))
        document.rect(0, 0, page_width, page_height, stroke=0, fill=1)
        document.setFillColor(HexColor("#101010"))
        document.setFont("InventorySans-Bold", 12)
        document.drawString(24, page_height - 25, clean(path.name))
        document.setFont("InventorySans", 7)
        document.drawRightString(page_width - 24, page_height - 25, f"{index}/{len(paths)} - {width} x {height} px")
        draw_width, draw_height = width * scale, height * scale
        document.drawImage(str(path), (page_width - draw_width) / 2, 22, width=draw_width, height=draw_height, preserveAspectRatio=True, mask="auto")
        document.showPage()
    document.save()


def sha256(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def source_state():
    result = subprocess.run(
        ["git", "ls-files", "--cached", "--others", "--exclude-standard"],
        cwd=ROOT,
        check=True,
        capture_output=True,
        text=True,
    )
    files = sorted(path for path in result.stdout.splitlines() if path and path != str(LOCK.relative_to(ROOT)))
    digest = hashlib.sha256()
    for path in files:
        object_id = subprocess.run(
            ["git", "hash-object", "--", path],
            cwd=ROOT,
            check=True,
            capture_output=True,
            text=True,
        ).stdout.strip()
        digest.update(f"{path}\0{object_id}\n".encode())
    return files, digest.hexdigest()


def write_lock(paths):
    files, digest = source_state()
    payload = {
        "version": "V334-M1",
        "generatedAt": datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z"),
        "sourceFileCount": len(files),
        "sourceDigest": digest,
        "outputs": [
            {"name": path.name, "size": path.stat().st_size, "sha256": sha256(path)}
            for path in paths
        ],
    }
    LOCK.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    TMP.mkdir(parents=True, exist_ok=True)
    register_fonts()
    markdown_pdf(ROOT / "ROADMAP_OVERALL.md", OVERALL, "Inventario Golf Score Card GT - OVERALL V311")
    markdown_pdf(ROOT / "ROADMAP_A_DETALLE.md", DETAIL, "Inventario Golf Score Card GT - A DETALLE V311")
    image_inventory_pdf(IMAGES)
    paths = [OVERALL, DETAIL, IMAGES]
    write_lock(paths)
    for path in paths:
        print(f"{path.name}\t{path.stat().st_size}\t{sha256(path)}")
    print(f"INVENTORY_LOCK PASS version=V334-M1 sources={json.loads(LOCK.read_text(encoding='utf-8'))['sourceFileCount']}")


if __name__ == "__main__":
    main()
