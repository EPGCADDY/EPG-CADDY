#!/usr/bin/env python3
import json
import shutil
import subprocess
from pathlib import Path

from PIL import Image
from pypdf import PdfReader, PdfWriter
from reportlab.lib.colors import HexColor, black, white
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
MANUAL_DIR = ROOT / "docs" / "manual" / "v311"
SOURCE = MANUAL_DIR / "manual-pages-bets-live-data.json"
TMP = ROOT / "tmp" / "manual-bets-live-data"
PDF = MANUAL_DIR / "Manual_Golf_Score_Card_GT_COMPLETO.pdf"
ALIAS = MANUAL_DIR / "Manual_de_Funciones_Golf_Score_Card_GT_01-16.pdf"


def fonts():
    regular = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
    bold = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
    pdfmetrics.registerFont(TTFont("ManualSans", regular))
    pdfmetrics.registerFont(TTFont("ManualSans-Bold", bold))
    return "ManualSans", "ManualSans-Bold"


def wrap(text, font, size, width):
    lines, current = [], ""
    for word in text.split():
        candidate = f"{current} {word}".strip()
        if not current or pdfmetrics.stringWidth(candidate, font, size) <= width:
            current = candidate
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_lines(c, text, x, y, width, font, size, leading, color):
    c.setFillColor(color)
    c.setFont(font, size)
    for line in wrap(text, font, size, width):
        c.drawString(x, y, line)
        y -= leading
    return y


def build_page(item, regular, bold):
    number = int(item["number"])
    page_pdf = TMP / f"page-{number:02d}.pdf"
    c = canvas.Canvas(str(page_pdf), pagesize=(576, 1152), pageCompression=1)
    c.setFillColor(white)
    c.rect(0, 0, 576, 1152, stroke=0, fill=1)
    left = 37
    c.setFillColor(black)
    c.setFont(bold, 17.5)
    c.drawString(70, 1120, "GOLF SCORE CARD GT · MANUAL DE FUNCIONES")
    c.setFont(regular, 15.5)
    c.drawString(left, 1087, f"{number:02d} · {item['kicker']}")
    c.setFont(regular, 22)
    c.drawString(left, 1057, item["title"])
    draw_lines(c, item["subtitle"], left, 1022, 500, regular, 15.5, 18, HexColor("#242424"))

    box_x, box_y, box_w, box_h = 48, 376, 486, 573
    c.setFillColor(black)
    c.roundRect(box_x, box_y, box_w, box_h, 13, stroke=0, fill=1)
    c.setFillColor(HexColor("#20ff00"))
    c.setFont(bold, 11.5)
    c.drawCentredString(box_x + box_w / 2, box_y + box_h - 27, "QUÉ HACER · PASO A PASO")
    row_top, row_height = box_y + box_h - 62, 124
    for index, (title, description) in enumerate(item["steps"], start=1):
        top = row_top - (index - 1) * row_height
        circle_x, circle_y = box_x + 34, top - 19
        c.setFillColor(HexColor("#18ff00"))
        c.setStrokeColor(white)
        c.setLineWidth(1)
        c.circle(circle_x, circle_y, 13, stroke=1, fill=1)
        c.setFillColor(black)
        c.setFont(bold, 10.5)
        c.drawCentredString(circle_x, circle_y - 3.6, str(index))
        text_x = box_x + 62
        c.setFillColor(white)
        c.setFont(bold, 14.3)
        c.drawString(text_x, top - 20, title)
        draw_lines(c, description, text_x, top - 42, box_w - 84, regular, 10.8, 13.2, HexColor("#c7c7c7"))
        if index < 4:
            c.setStrokeColor(HexColor("#343434"))
            c.setLineWidth(0.7)
            c.line(box_x + 25, top - 113, box_x + box_w - 25, top - 113)

    c.setFillColor(HexColor("#f7f7f7"))
    c.setStrokeColor(HexColor("#cdcdcd"))
    c.roundRect(48, 212, 486, 126, 10, stroke=1, fill=1)
    c.setFillColor(black)
    c.setFont(bold, 12)
    c.drawString(68, 309, "RECUERDA")
    draw_lines(c, item["remember"], 68, 284, 446, regular, 11.5, 14.5, HexColor("#222222"))
    c.setFillColor(HexColor("#777777"))
    c.setFont(regular, 8.5)
    c.drawCentredString(288, 171, "La apuesta o el dato vivo nunca modifica el score oficial.")
    c.setFillColor(black)
    c.setFont(regular, 14)
    c.drawRightString(533, 66, f"{number:02d}")
    c.showPage()
    c.save()
    return page_pdf


def render_png(page_pdf, number):
    prefix = TMP / f"render-{number:02d}"
    subprocess.run(["pdftoppm", "-f", "1", "-l", "1", "-r", "300", "-png", "-singlefile", str(page_pdf), str(prefix)], check=True)
    source = TMP / f"render-{number:02d}.png"
    target = MANUAL_DIR / f"page-{number:02d}.png"
    with Image.open(source) as image:
        image.resize((2160, 4320), Image.Resampling.LANCZOS).save(target, format="PNG", dpi=(300, 300), optimize=True)


def replace_pdf_pages(replacements):
    source = PdfReader(str(PDF))
    if len(source.pages) != 74:
        raise RuntimeError(f"PDF fuente con {len(source.pages)} páginas; se esperaban 74")
    replacement_readers = {number: PdfReader(str(path)) for number, path in replacements.items()}
    writer = PdfWriter()
    for index, page in enumerate(source.pages):
        writer.add_page(replacement_readers[index].pages[0] if index in replacement_readers else page)
    writer.add_metadata({"/Title":"Golf Score Card GT - Manual completo de funciones", "/Author":"Golf Score Card GT"})
    writer.add_outline_item("Portada", 0)
    for number in range(1, 74):
        writer.add_outline_item(f"Página {number:02d}", number)
    output = TMP / "Manual_Golf_Score_Card_GT_COMPLETO.pdf"
    with output.open("wb") as stream:
        writer.write(stream)
    shutil.copyfile(output, PDF)
    shutil.copyfile(output, ALIAS)


def main():
    TMP.mkdir(parents=True, exist_ok=True)
    regular, bold = fonts()
    data = json.loads(SOURCE.read_text(encoding="utf-8"))
    replacements = {}
    for item in data:
        number = int(item["number"])
        page_pdf = build_page(item, regular, bold)
        render_png(page_pdf, number)
        replacements[number] = page_pdf
    replace_pdf_pages(replacements)
    print(f"MANUAL_BETS_LIVE_DATA REBUILT pages={len(replacements)} pdf=74")


if __name__ == "__main__":
    main()

