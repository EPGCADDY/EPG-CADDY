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
TMP_DIR = OUTPUT_DIR / ".inventory-v331-tmp"
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
    c.setTitle(f"{title} - V332")
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
    c.drawString(44, height - 126, "V332 · MONEDA Y ACUMULADOS")
    c.setFillColor(white)
    c.setFont(bold, 15)
    c.drawString(44, height - 153, "SKINS · WOLF · VEGAS · DOTS · Q/$ · RIESGO · LIQUIDACIÓN")

    c.setFillColor(HexColor("#151515"))
    c.roundRect(42, 414, 511, 239, 12, stroke=0, fill=1)
    c.setFillColor(HexColor("#20ff00"))
    c.setFont(bold, 11)
    c.drawString(58, 628, "MONEDA DUAL Y MATRIZ COMÚN · BANCO V332")
    y = 598
    items = [
        ("DOS MONEDAS", "Cada juego ofrece casillas excluyentes Q y $; la elegida permanece en voz, tarjetas, Historial y liquidación."),
        ("ACUMULADOS", "Estados, hoyos, puntos o unidades, carry, registros y balances muestran cómo cambió la ronda."),
        ("RIESGO COMPRENSIBLE", "Mayor pozo, exposición Wolf, riesgo por duelo Vegas e impacto de un punto Dots se explican antes de pagar."),
        ("DINERO SEPARADO", "Dinero movido y neto a liquidar se calculan en la moneda elegida sin alterar Gross ni Neto."),
        ("TRAZABILIDAD", "Líder, saldos y transferencias exactas sobreviven cierre SHA-256, corrección, tarjetas, nube y restauración."),
    ]
    for number, (item_title, text) in enumerate(items, start=1):
        y = draw_bullet(c, number, item_title, text, y, regular, bold)

    c.setFillColor(HexColor("#f4f4f4"))
    c.roundRect(42, 224, 511, 158, 12, stroke=0, fill=1)
    c.setFillColor(black)
    c.setFont(bold, 11)
    c.drawString(58, 355, "ESTADO HONESTO · PEND-SKI-006 SIGUE ABIERTO")
    open_items = [
        "V330-R3 aprobó en iPhone la selección visual única de Wolf.",
        "V332 aprobó 89 paquetes y 325 fuentes; falta publicar el nuevo Preview antes de prueba física.",
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
    c.drawString(44, 161, "Inventarios regenerados después de código, documentación y pruebas V332.")
    c.setFillColor(white)
    c.setFont(bold, 10)
    c.drawString(44, 111, "26 DE AGOSTO DE 2026")
    c.setFillColor(HexColor("#20ff00"))
    c.drawRightString(width - 44, 111, "V332 EN BANCO · PRUEBA FÍSICA PENDIENTE")
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
        if "V332 · MONEDA Y ACUMULADOS" in page_text or "V331 · MATRIZ DE APUESTAS" in page_text or "V330 · JUEGOS Y TRES PAREJAS" in page_text or "V328 · REGLAS OFICIALES" in page_text or "V328-R2 · REGLAS OFICIALES" in page_text:
            first_content_page += 1
            continue
        break
    writer = PdfWriter()
    writer.add_page(PdfReader(str(cover)).pages[0])
    for page in source.pages[first_content_page:]:
        writer.add_page(page)
    writer.add_metadata({
        "/Title": f"Golf Score Card GT - {title} - V332",
        "/Subject": "Inventario de control V332 - moneda dual y matriz común de acumulados y riesgos",
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
