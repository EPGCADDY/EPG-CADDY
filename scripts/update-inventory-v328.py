#!/usr/bin/env python3
from pathlib import Path
import os

from pypdf import PdfReader, PdfWriter
from reportlab.lib.colors import HexColor, black, white
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT.parent / "output" / "pdf"
TMP_DIR = ROOT / "tmp" / "pdfs" / "inventory-v330"
FILES = {
    "Inventario_Golf_Score_Card_GT_OVERALL_V311.pdf": "INVENTARIO OVERALL",
    "Inventario_Golf_Score_Card_GT_A_DETALLE_V311.pdf": "INVENTARIO A DETALLE",
    "Inventario_Golf_Score_Card_GT_POR_IMAGENES_Y_RUBROS_V311.pdf": "INVENTARIO POR IMÁGENES Y RUBROS",
}


def register_fonts():
    regular = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
    bold = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
    if Path(regular).exists() and Path(bold).exists():
        pdfmetrics.registerFont(TTFont("InventorySans", regular))
        pdfmetrics.registerFont(TTFont("InventorySans-Bold", bold))
        return "InventorySans", "InventorySans-Bold"
    return "Helvetica", "Helvetica-Bold"


def wrapped_lines(text, font, size, width):
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


def draw_wrapped(c, text, x, y, width, font, size, leading, color):
    c.setFillColor(color)
    c.setFont(font, size)
    for line in wrapped_lines(text, font, size, width):
        c.drawString(x, y, line)
        y -= leading
    return y


def draw_bullet(c, number, title, text, y, regular, bold):
    c.setFillColor(HexColor("#20ff00"))
    c.circle(62, y + 2, 10, stroke=0, fill=1)
    c.setFillColor(black)
    c.setFont(bold, 8)
    c.drawCentredString(62, y - 1, str(number))
    c.setFillColor(white)
    c.setFont(bold, 10)
    c.drawString(82, y + 5, title)
    return draw_wrapped(c, text, 82, y - 10, 450, regular, 8.6, 11, HexColor("#c8c8c8")) - 11


def build_cover(path, title):
    regular, bold = register_fonts()
    width, height = A4
    c = canvas.Canvas(str(path), pagesize=A4, pageCompression=1)
    c.setTitle(f"{title} - V330")
    c.setFillColor(HexColor("#080808"))
    c.rect(0, 0, width, height, stroke=0, fill=1)
    c.setFillColor(HexColor("#20ff00"))
    c.rect(0, height - 11, width, 11, stroke=0, fill=1)
    c.setFillColor(white)
    c.setFont(bold, 15)
    c.drawString(44, height - 54, "GOLF SCORE CARD GT · CONTROL DE PROYECTO")
    c.setFont(regular, 12)
    c.drawString(44, height - 80, title)
    c.setFillColor(HexColor("#20ff00"))
    c.setFont(bold, 28)
    c.drawString(44, height - 126, "V330 · JUEGOS Y TRES PAREJAS")
    c.setFillColor(white)
    c.setFont(bold, 15)
    c.drawString(44, height - 153, "SKINS · WOLF · VEGAS · DOTS · 2 A 6 JUGADORES")

    c.setFillColor(HexColor("#151515"))
    c.roundRect(42, 414, 511, 239, 12, stroke=0, fill=1)
    c.setFillColor(HexColor("#20ff00"))
    c.setFont(bold, 11)
    c.drawString(58, 628, "BANCO LOCAL Y PREVIEW TÉCNICO APROBADOS")
    y = 598
    items = [
        ("PANTALLA PROTEGIDA", "Configuración divide modalidades existentes y juegos nuevos; la pantalla principal de la tarjeta conserva su formato."),
        ("SEIS JUGADORES", "Skins y Dots llegan a seis; Wolf admite de tres a seis; Vegas usa dos o tres parejas fijas."),
        ("TRES PAREJAS", "Match Play y Four Ball agregan Verde 1-2, Oro 3-4 y Azul 5-6 sin cambiar el score individual."),
        ("DINERO SEPARADO", "Unidad GTQ, empates, multiplicadores y topes calculan saldos cero-suma sin procesar pagos ni alterar Gross/Neto."),
        ("TRAZABILIDAD", "Cierre SHA-256, corrección, Global, personales, Historial, voz, nube y restauración conservan el resultado completo."),
    ]
    for number, (item_title, text) in enumerate(items, start=1):
        y = draw_bullet(c, number, item_title, text, y, regular, bold)

    c.setFillColor(HexColor("#f4f4f4"))
    c.roundRect(42, 224, 511, 158, 12, stroke=0, fill=1)
    c.setFillColor(black)
    c.setFont(bold, 11)
    c.drawString(58, 355, "ESTADO HONESTO · PEND-SKI-006 SIGUE ABIERTO")
    open_items = [
        "Preview V330 READY: 89 paquetes y puerta viva de Reglas aprobados.",
        "Falta revisión visual y táctil de Configuración en iPhone.",
        "Falta una ronda física completa por juego con corrección y recuperación.",
        "Producción no se modifica hasta obtener todos los PASS requeridos.",
    ]
    y = 331
    c.setFont(regular, 9.3)
    for item in open_items:
        c.drawString(61, y, "•")
        draw_wrapped(c, item, 76, y, 450, regular, 9.3, 12, HexColor("#222222"))
        y -= 26

    c.setFillColor(HexColor("#8d8d8d"))
    c.setFont(regular, 8.4)
    c.drawString(44, 177, "Producción permanece en V322. Un FAIL bloquea cualquier montaje.")
    c.drawString(44, 161, "Inventarios regenerados después de código, manual y pruebas V330.")
    c.setFillColor(white)
    c.setFont(bold, 10)
    c.drawString(44, 111, "26 DE AGOSTO DE 2026")
    c.setFillColor(HexColor("#20ff00"))
    c.drawRightString(width - 44, 111, "PREVIEW PASS · PRUEBA FÍSICA PENDIENTE")
    c.showPage()
    c.save()


def update_inventory(filename, title):
    target = OUTPUT_DIR / filename
    if not target.exists():
        raise FileNotFoundError(target)
    cover = TMP_DIR / f"cover-{filename}"
    updated = TMP_DIR / filename
    build_cover(cover, title)
    source = PdfReader(str(target))
    first_content_page = 0
    for page in source.pages:
        page_text = page.extract_text() or ""
        if "V330 · JUEGOS Y TRES PAREJAS" in page_text or "V328 · REGLAS OFICIALES" in page_text or "V328-R2 · REGLAS OFICIALES" in page_text:
            first_content_page += 1
            continue
        break
    writer = PdfWriter()
    writer.add_page(PdfReader(str(cover)).pages[0])
    for page in source.pages[first_content_page:]:
        writer.add_page(page)
    writer.add_metadata({
        "/Title": f"Golf Score Card GT - {title} - V330",
        "/Subject": "Inventario de control V330 - Skins, Wolf, Vegas, Dots y tres parejas",
        "/Author": "Golf Score Card GT",
        "/Creator": "Golf Score Card GT",
    })
    with updated.open("wb") as stream:
        writer.write(stream)
    os.replace(updated, target)
    print(f"UPDATED {target} pages={len(PdfReader(str(target)).pages)}")


def main():
    TMP_DIR.mkdir(parents=True, exist_ok=True)
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    for filename, title in FILES.items():
        update_inventory(filename, title)


if __name__ == "__main__":
    main()
