#!/usr/bin/env python3
"""Rebuild the two Manual PDFs from the final, audited page PNGs."""

import shutil
from pathlib import Path

from pypdf import PdfReader, PdfWriter
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
MANUAL_DIR = ROOT / "docs" / "manual" / "v311"
TMP = ROOT / "tmp" / "manual-final-pdf"
PDF = MANUAL_DIR / "Manual_Golf_Score_Card_GT_COMPLETO.pdf"
ALIAS = MANUAL_DIR / "Manual_de_Funciones_Golf_Score_Card_GT_01-16.pdf"
PAGE_SIZE = (576, 1152)


def build_image_pdf():
    TMP.mkdir(parents=True, exist_ok=True)
    image_pdf = TMP / "manual-images.pdf"
    document = canvas.Canvas(str(image_pdf), pagesize=PAGE_SIZE, pageCompression=1)
    for number in range(74):
        image = MANUAL_DIR / f"page-{number:02d}.png"
        if not image.exists():
            raise RuntimeError(f"Falta {image.name}")
        document.drawImage(str(image), 0, 0, width=PAGE_SIZE[0], height=PAGE_SIZE[1], preserveAspectRatio=True, mask="auto")
        document.showPage()
    document.save()
    return image_pdf


def add_navigation(image_pdf):
    reader = PdfReader(str(image_pdf))
    if len(reader.pages) != 74:
        raise RuntimeError(f"PDF intermedio con {len(reader.pages)} páginas; se esperaban 74")
    writer = PdfWriter()
    for page in reader.pages:
        writer.add_page(page)
    writer.add_metadata({
        "/Title": "Golf Score Card GT - Manual completo de funciones",
        "/Author": "Golf Score Card GT",
        "/Subject": "Manual de funciones verificable de 74 páginas",
    })
    writer.add_outline_item("Portada", 0)
    for number in range(1, 74):
        writer.add_outline_item(f"Página {number:02d}", number)
    final_pdf = TMP / PDF.name
    with final_pdf.open("wb") as stream:
        writer.write(stream)
    shutil.copyfile(final_pdf, PDF)
    shutil.copyfile(final_pdf, ALIAS)


def main():
    add_navigation(build_image_pdf())
    print(f"MANUAL_FINAL_PDF PASS pages=74 bytes={PDF.stat().st_size} aliases=2")


if __name__ == "__main__":
    main()
