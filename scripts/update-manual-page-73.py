#!/usr/bin/env python3
from pathlib import Path
import shutil
import subprocess

from PIL import Image
from pypdf import PdfReader, PdfWriter
from reportlab.lib.colors import Color, HexColor, black, white
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
MANUAL_DIR = ROOT / "docs" / "manual" / "v311"
TMP_DIR = ROOT / "tmp" / "pdfs"
SOURCE_PDF = MANUAL_DIR / "Manual_Golf_Score_Card_GT_COMPLETO.pdf"
ALIAS_PDF = MANUAL_DIR / "Manual_de_Funciones_Golf_Score_Card_GT_01-16.pdf"
PAGE_PDF = TMP_DIR / "manual-page-73-v315.pdf"
UPDATED_PDF = TMP_DIR / "Manual_Golf_Score_Card_GT_COMPLETO-v315.pdf"
PAGE_PNG_PREFIX = TMP_DIR / "page-73-v315"
PAGE_PNG = TMP_DIR / "page-73-v315-1.png"


def register_fonts():
    regular = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
    bold = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
    if Path(regular).exists() and Path(bold).exists():
        pdfmetrics.registerFont(TTFont("ManualSans", regular))
        pdfmetrics.registerFont(TTFont("ManualSans-Bold", bold))
        return "ManualSans", "ManualSans-Bold"
    return "Helvetica", "Helvetica-Bold"


def wrapped_lines(text, font, size, width):
    words = text.split()
    lines = []
    current = ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if not current or pdfmetrics.stringWidth(candidate, font, size) <= width:
            current = candidate
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_wrapped(c, text, x, y, width, font, size, leading, color):
    c.setFillColor(color)
    c.setFont(font, size)
    for line in wrapped_lines(text, font, size, width):
        c.drawString(x, y, line)
        y -= leading
    return y


def build_page():
    regular, bold = register_fonts()
    width, height = 576, 1152
    c = canvas.Canvas(str(PAGE_PDF), pagesize=(width, height), pageCompression=1)
    c.setTitle("73 - El mismo Caddie en cada micrófono")
    c.setFillColor(white)
    c.rect(0, 0, width, height, stroke=0, fill=1)

    left = 37
    c.setFillColor(black)
    c.setFont(bold, 17.5)
    c.drawString(70, 1120, "GOLF SCORE CARD GT · MANUAL DE FUNCIONES")
    c.setFont(regular, 15.5)
    c.drawString(left, 1087, "73 · Caddie de conversación universal")
    c.setFont(regular, 22)
    c.drawString(left, 1060, "El mismo Caddie en cada micrófono")
    draw_wrapped(
        c,
        "Desde la primera pantalla, abre el micrófono y habla normalmente; entiende cualquier tema sin cambiar de modo.",
        left,
        1027,
        500,
        regular,
        15.5,
        18,
        HexColor("#242424"),
    )

    box_x, box_y, box_w, box_h = 48, 376, 486, 573
    c.setFillColor(black)
    c.roundRect(box_x, box_y, box_w, box_h, 13, stroke=0, fill=1)
    c.setFillColor(HexColor("#20ff00"))
    c.setFont(bold, 11.5)
    c.drawCentredString(box_x + box_w / 2, box_y + box_h - 27, "QUÉ HACER · PASO A PASO")

    steps = [
        (
            "DESDE LA PRIMERA PANTALLA",
            "Inicio muestra clima GPS; sus micrófonos y los de Stableford y Tarjeta abren el mismo Caddie.",
        ),
        (
            "PREGUNTA CUALQUIER TEMA",
            "Medicina, arquitectura, planetas, océanos, vehículos, viajes o países. Para datos actuales investiga la Web y muestra fuentes.",
        ),
        (
            "CAMBIA O INTERRUMPE",
            "Pasa del clima a otro tema sin comando. Si la respuesta no te sirve, habla encima: el Caddie se calla y atiende tu nuevo mensaje.",
        ),
        (
            "RESPUESTA Y CIERRE",
            "Responde tras cerca de 1 segundo de silencio. Al terminar espera 3 segundos; si no continúas, cierra. Nunca se abre solo.",
        ),
    ]
    row_top = box_y + box_h - 62
    row_height = 124
    for index, (title, description) in enumerate(steps, start=1):
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
        c.setFont(bold, 15)
        c.drawString(text_x, top - 20, title)
        draw_wrapped(c, description, text_x, top - 42, box_w - 84, regular, 11.5, 14, HexColor("#c7c7c7"))
        if index < len(steps):
            c.setStrokeColor(HexColor("#343434"))
            c.setLineWidth(0.7)
            c.line(box_x + 25, top - 113, box_x + box_w - 25, top - 113)

    remember_x, remember_y, remember_w, remember_h = 48, 212, 486, 126
    c.setFillColor(HexColor("#f7f7f7"))
    c.setStrokeColor(HexColor("#cdcdcd"))
    c.setLineWidth(0.9)
    c.roundRect(remember_x, remember_y, remember_w, remember_h, 10, stroke=1, fill=1)
    c.setFillColor(black)
    c.setFont(bold, 12)
    c.drawString(remember_x + 20, remember_y + remember_h - 29, "RECUERDA")
    draw_wrapped(
        c,
        "Toca primero el micrófono. Golf es su especialidad, no su límite. Una búsqueda Web puede tardar un poco más porque consulta fuentes reales.",
        remember_x + 20,
        remember_y + remember_h - 54,
        remember_w - 40,
        regular,
        12,
        15,
        HexColor("#222222"),
    )
    c.setFillColor(Color(0.5, 0.5, 0.5))
    c.setFont(regular, 8.5)
    c.drawCentredString(width / 2, 171, "Si algo no coincide, conserva la ronda y revisa el paso anterior.")
    c.setFillColor(black)
    c.setFont(regular, 14)
    c.drawRightString(533, 66, "73")
    c.showPage()
    c.save()


def replace_last_page():
    source = PdfReader(str(SOURCE_PDF))
    replacement = PdfReader(str(PAGE_PDF))
    if len(source.pages) != 74:
        raise RuntimeError(f"Se esperaban 74 páginas, llegaron {len(source.pages)}")
    writer = PdfWriter()
    for page in source.pages[:-1]:
        writer.add_page(page)
    writer.add_page(replacement.pages[0])
    writer.add_metadata({
        "/Title": "Golf Score Card GT - Manual completo de funciones - Paginas 01-73",
        "/Subject": "Manual de funciones, voz, clima, Web y Caddie de conversacion universal",
        "/Author": "Golf Score Card GT",
        "/Creator": "Golf Score Card GT",
    })
    writer.add_outline_item("Portada", 0)
    for number in range(1, 74):
        writer.add_outline_item(f"Página {number:02d}", number)
    with UPDATED_PDF.open("wb") as stream:
        writer.write(stream)
    shutil.copyfile(UPDATED_PDF, SOURCE_PDF)
    shutil.copyfile(UPDATED_PDF, ALIAS_PDF)


def render_page_png():
    subprocess.run([
        "pdftoppm", "-f", "1", "-l", "1", "-r", "300", "-png", "-singlefile",
        str(PAGE_PDF), str(PAGE_PNG_PREFIX)
    ], check=True)
    rendered = TMP_DIR / "page-73-v315.png"
    with Image.open(rendered) as image:
        image.resize((2160, 4320), Image.Resampling.LANCZOS).save(
            MANUAL_DIR / "page-73.png", format="PNG", dpi=(300, 300), optimize=True
        )


def main():
    TMP_DIR.mkdir(parents=True, exist_ok=True)
    build_page()
    replace_last_page()
    render_page_png()
    print(SOURCE_PDF)


if __name__ == "__main__":
    main()
