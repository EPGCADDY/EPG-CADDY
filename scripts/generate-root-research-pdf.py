from pathlib import Path
import re

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "CONTROL_PROYECTO_SCIRE/02_DOCUMENTOS_IMPORTANTES_PENDIENTES_DE_UTILIZAR/INVESTIGACION_RAIZ_MICROFONO_ACTUALIZACION_Y_AI_UNIVERSAL_R32.md"
OUTPUT = ROOT / "CONTROL_PROYECTO_SCIRE/02_DOCUMENTOS_IMPORTANTES_PENDIENTES_DE_UTILIZAR/INVESTIGACION_RAIZ_MICROFONO_ACTUALIZACION_Y_AI_UNIVERSAL_R32.pdf"

pdfmetrics.registerFont(TTFont("DejaVu", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("DejaVu-Bold", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))
styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="TitleClean", parent=styles["Title"], fontName="DejaVu-Bold", fontSize=18, leading=22, alignment=TA_CENTER, spaceAfter=16))
styles.add(ParagraphStyle(name="H1Clean", parent=styles["Heading1"], fontName="DejaVu-Bold", fontSize=14, leading=17, spaceBefore=12, spaceAfter=7))
styles.add(ParagraphStyle(name="H2Clean", parent=styles["Heading2"], fontName="DejaVu-Bold", fontSize=11.5, leading=14, spaceBefore=9, spaceAfter=5))
styles.add(ParagraphStyle(name="BodyClean", parent=styles["BodyText"], fontName="DejaVu", fontSize=9, leading=12, spaceAfter=6))
styles.add(ParagraphStyle(name="BulletClean", parent=styles["BodyText"], fontName="DejaVu", fontSize=8.8, leading=11.5, leftIndent=12, firstLineIndent=-7, bulletIndent=4, spaceAfter=3))
styles.add(ParagraphStyle(name="SmallClean", parent=styles["BodyText"], fontName="DejaVu", fontSize=7.2, leading=9))

def clean(text: str) -> str:
    text = re.sub(r"\[([^\]]+)\]\([^\)]+\)", r"\1", text)
    text = text.replace("`", "").replace("**", "")
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")

def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("DejaVu", 7)
    canvas.setFillColor(colors.HexColor("#555555"))
    canvas.drawString(18 * mm, 10 * mm, "EPG Caddy - investigación técnica LAB - Maestro intacto")
    canvas.drawRightString(192 * mm, 10 * mm, f"Página {doc.page}")
    canvas.restoreState()

lines = SOURCE.read_text(encoding="utf-8").splitlines()
story = []
i = 0
while i < len(lines):
    line = lines[i].rstrip()
    if not line:
        story.append(Spacer(1, 2.5 * mm)); i += 1; continue
    if line.startswith("# "):
        story.append(Paragraph(clean(line[2:]), styles["TitleClean"])); i += 1; continue
    if line.startswith("## "):
        story.append(Paragraph(clean(line[3:]), styles["H1Clean"])); i += 1; continue
    if line.startswith("### "):
        story.append(Paragraph(clean(line[4:]), styles["H2Clean"])); i += 1; continue
    if line.startswith("| "):
        rows = []
        while i < len(lines) and lines[i].startswith("|"):
            cells = [clean(c.strip()) for c in lines[i].strip().strip("|").split("|")]
            if not all(set(c) <= {"-", ":"} for c in cells): rows.append(cells)
            i += 1
        if rows:
            widths = [44 * mm, 49 * mm, 49 * mm, 31 * mm][:len(rows[0])]
            table = Table([[Paragraph(c, styles["SmallClean"]) for c in row] for row in rows], colWidths=widths, repeatRows=1)
            table.setStyle(TableStyle([
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#E8E8E8")),
                ("FONTNAME", (0, 0), (-1, 0), "DejaVu-Bold"),
                ("GRID", (0, 0), (-1, -1), 0.35, colors.HexColor("#777777")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 4),
                ("RIGHTPADDING", (0, 0), (-1, -1), 4),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ]))
            story.append(table)
        continue
    if re.match(r"^\d+\. ", line) or line.startswith("- "):
        body = re.sub(r"^(?:\d+\.|-)\s+", "", line)
        story.append(Paragraph("• " + clean(body), styles["BulletClean"])); i += 1; continue
    story.append(Paragraph(clean(line), styles["BodyClean"])); i += 1

doc = SimpleDocTemplate(str(OUTPUT), pagesize=A4, rightMargin=18*mm, leftMargin=18*mm, topMargin=17*mm, bottomMargin=16*mm, title="Investigación de causa raíz: micrófono, actualización y AI Universal", author="Codex - EPG Caddy")
doc.build(story, onFirstPage=footer, onLaterPages=footer)
print(OUTPUT)
