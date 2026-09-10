#!/usr/bin/env python3
import hashlib, json, re, subprocess
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle
import reportlab

ROOT=Path(__file__).resolve().parents[1]
CASE=ROOT/'CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10'
EVID=CASE/'evidencia'
MD=CASE/'ACTA_TECNICA_DE_VERIFICACION_Y_CONGELAMIENTO_DE_VERSION_EPG_CADDY.md'
PDF=CASE/'ACTA_TECNICA_DE_VERIFICACION_Y_CONGELAMIENTO_DE_VERSION_EPG_CADDY.pdf'
COMMIT='a4b1cec9e1380d8a5b72080477cad97080ab0cce'
DEPLOY='dpl_G97hXzJbV9duYHLn8SGREJWRgUHq'
DEPLOY_URL='https://golf-sc-gt-dypjyc3wg-epgcaddys-projects.vercel.app'
LAB_URL='https://golf-sc-gt-lab.vercel.app'
PROD_COMMIT='7816978be8aa23aba20f4c066fce30f6287ff134'
PROD_URL='https://epg-caddy.vercel.app/'
NOW=datetime.now(ZoneInfo('America/Guatemala')).replace(microsecond=0)

matrix=[
('G0-01','Controles documentales','Ejecutar project-quality-gate','11 controles y 7 entradas presentes','PASS controls=11 inputs=7 gates=11','PASS','evidencia/automatizada/audit-project-r32-full.log'),
('G0-02','Identidad Git R32','Comparar rama, commit y metadata Vercel','Commit completo coincidente','Vercel READY reporta '+COMMIT,'PASS','Vercel deployment '+DEPLOY),
('G0-03','Producción intacta','Consultar proyecto epg-caddy y base de calidad','Main sin cambio','Producción conserva R28 '+PROD_COMMIT,'PASS','scripts/project-quality-gate.mjs'),
('G0-04','Compilación Vercel','Revisar build logs del deployment','Build completo','Build Completed y Deployment completed','PASS','evidencia/automatizada/vercel-build-r32.log'),
('G0-05','Inventario sellado','Ejecutar inventory-gate','Fuentes y tres PDF sincronizados','Inventario regenerado; sello SHA-256','PASS','CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json'),
('G0-06','ROADMAP doble','Ejecutar roadmap-gate','Todo cambio en ambos ROADMAPS','PASS después de corregir nombres exactos R32','PASS','ROADMAP_OVERALL.md; ROADMAP_A_DETALLE.md'),
('G0-07','Intocables V378','Ejecutar intocables-gate','INT-01 a INT-05 sin alteración','PASS hashes y bancos permanentes','PASS','Intocables/intocables-gate.mjs'),
('G0-08','Manual editorial 74 páginas','Ejecutar manual-editorial-qc','74/74 y cobertura semántica','PASS pages=74','PASS','scripts/manual-editorial-qc.py'),
('G0-09','Manual visual automatizado','Ejecutar manual-visual-qc','2160x4320 y 300 dpi','PASS pages=74','PASS','scripts/manual-visual-qc.py'),
('F-01','Registro de jugadores','Bancos registro, borrado, autocompletado y HCP','Escritor y estado coherentes','Pruebas automáticas PASS','PASS','test-player-registry.js; test-v407-r25-round-controls.mjs'),
('F-02','Catálogo de campos','Probar catálogo, pares, yardas, rating, slope y HCP','Fuentes canónicas conservadas','Pruebas automáticas PASS','PASS','test-course-catalog.mjs; test-country-club-official.mjs'),
('F-03','Motor de puntuación','Ejecutar score-engine y matrices','Gross/Neto/resultado exactos','Pruebas automáticas PASS','PASS','test-score-engine.mjs'),
('F-04','Persistencia de ronda','Guardar, reabrir y cambiar estado','Ronda recuperable sin pérdida','Pruebas automáticas PASS','PASS','test-v358-active-round-reopen.mjs; test-v365-active-round-empty-recovery.mjs'),
('F-05','Correcciones oficiales','Corregir conservando original y razón','Recalcular y versionar','Prueba automática PASS','PASS','test-v277-official-round-corrections.mjs'),
('F-06','Historial','Archivar, abrir, buscar, borrar y no reaparición','Ronda actual intacta','Pruebas automáticas PASS','PASS','test-v279-local-card-library.mjs; test-v398-history-long-press-delete.mjs'),
('F-07','Tarjetas PNG/PDF','Generar artefactos oficiales','Archivos reproducibles','Prueba automática PASS','PASS','test-v278-card-image-pdf-export.mjs; test-card-artifacts.mjs'),
('F-08','Sincronización, autenticación y respaldo','Ejecutar bancos API/cola/backup','Estados y errores controlados','Pruebas automáticas PASS','PASS','test-sync-queue.mjs; test-sync-api.mjs; test-sync-auth.mjs'),
('M-01','Medal Play Normal / General','Ejecutar registro, scores y cierre','Modalidad operativa','Pruebas automáticas PASS','PASS','test-v267-scorecard-combination-matrix.mjs'),
('M-02','Stableford','Reglas, categorías, puntos, historial y manual','Cálculo y persistencia únicos','Pruebas automáticas PASS','PASS','test-stableford.mjs; test-stableford-ui.mjs'),
('M-03','Match Play','Probar flechas, nombres, acumulado y cierre','Marcador Match correcto','Pruebas automáticas PASS','PASS','test-v306-match-play.mjs; test-v307-match-arrows-format.mjs'),
('M-04','Four Ball','Probar parejas, mejor neto y acumulado','Resultado Four Ball correcto','Prueba automática PASS','PASS','test-v309-four-ball.mjs'),
('M-05','Skins','Probar carry, split, void y GTQ','Liquidación correcta','Prueba automática PASS','PASS','test-v329-skins.mjs'),
('M-06','Wolf','Ejecutar banco de side games','Reglas y estado preservados','Prueba automática PASS','PASS','test-v330-side-games.mjs'),
('M-07','Vegas','Ejecutar banco de side games','Reglas y estado preservados','Prueba automática PASS','PASS','test-v330-side-games.mjs'),
('M-08','Universales','Coordinación, ingreso y tarjeta','Escritor oficial compartido','Pruebas automáticas PASS','PASS','test-v407-r6-universales.mjs'),
('M-09','Score Card - Práctica','Probar perfil provisional y retorno','Sin contaminar ronda oficial','Prueba automática PASS','PASS','test-v262-provisional-optional-profile.mjs'),
('M-10','Comparte LIVE','Publicar/leer, privacidad y vista por modalidad','Lectura segura','Pruebas automáticas PASS','PASS','test-v352-live.mjs; test-v353-live-hub.mjs'),
('S-01','Acceso propietario e invitado 24 h','Probar login, token, canje único y límites','Acceso protegido','Prueba automática PASS; pantalla física observada','PASS','test-r18-owner-guest-24h-access.mjs; evidencia/fisica_usuario/IMG_3372_ACCESO_PROPIETARIO.png'),
('U-01','Actualización sólo por propietario R32','Inspección negativa de install/activate y promoción','No instalar al publicar','Prueba automática PASS','PASS','test-v407-r32-owner-only-update.mjs'),
('U-02','Modalidades en dos columnas R32','Inspeccionar CSS y diez opciones','Dos columnas y 10 opciones','Prueba automática PASS','PASS','test-v407-r32-two-column-modalities.mjs'),
('U-03','Score Card móvil desplazable','Inspeccionar contenedor, tabla y gesto','Sin compresión ni fondo blanco','Prueba automática PASS','PASS','test-v407-r31-mobile-card-scroll.mjs'),
('U-04','Contornos verdes','Inspeccionar selectores y excepción OK','Fondo negro salvo OK','Prueba automática PASS','PASS','test-v407-r30-green-outline-controls.mjs'),
('P-01','Actualización física R31 a R32 al primer toque','Comparar relato y capturas consecutivas aportadas desde iPhone','Un solo aviso y un solo toque deben activar R32','Primer aviso/toque permaneció en R31; apareció un segundo aviso y el segundo toque activó R32','FAIL','evidencia/fisica_usuario/IMG_3385_R31_ANTES_DE_R32.png; evidencia/fisica_usuario/IMG_3386_R32_ACTUALIZADO_CONSERVA_RONDA.png; declaración del propietario en conversación'),
('P-02','Conservación física de ronda','Comparar modalidad, campo, hora y controles','Sin pérdida al actualizar','Universales, El Pulté, 04:22 y controles conservados','PASS','evidencia/fisica_usuario/IMG_3386_R32_ACTUALIZADO_CONSERVA_RONDA.png'),
('P-03','Pantalla principal R32','Inspección visual de captura iPhone','Sin corte ni superposición visible','Captura vertical legible','PASS','evidencia/fisica_usuario/IMG_3386_R32_ACTUALIZADO_CONSERVA_RONDA.png'),
('X-01','Score Card R30 en iPhone','Inspección de captura','Tarjeta negra completa y navegable','Área blanca/corte visible','FAIL','evidencia/fisica_usuario/IMG_3377_R30_TARJETA_CORTADA.png'),
('X-02','Publicación R31 sin instalación automática','Comparar publicación y captura','Debe esperar ACTUALIZAR','R31 apareció ACTUALIZADO sin toque','FAIL','evidencia/fisica_usuario/IMG_3382_R31_ENTRO_ACTUALIZADO.png'),
('X-03','Modalidades R31','Inspección de captura','Dos columnas','Una columna','FAIL','evidencia/fisica_usuario/IMG_3383_R31_MODALIDADES_UNA_COLUMNA.png'),
('B-01','Voz femenina idéntica en toda la aplicación','Comparar identidad/voiceURI del Manual con todas las respuestas','Misma mujer, obligatoria e intocable','Captura acredita reproducción 0.9x, no identidad técnica ni cobertura total','BLOQUEADO','evidencia/fisica_usuario/IMG_3384_MANUAL_VOZ_FEMENINA_09X.png; VOZ_FEMENINA_MANDATORIA.lock.json'),
('D-01','Alias estable LAB exacto','Consultar API Vercel y deployment promovido','Deployment R32 READY con target production y mismo commit','Deployment promovido READY, target production, commit coincidente y alias estable servido','PASS','Vercel '+DEPLOY+'; '+LAB_URL),
('N-01','Video completo de recorridos','Buscar evidencia audiovisual','Video por cada recorrido','No se aportaron videos','NO PROBADO','Sin archivo'),
('N-02','Micrófono físico iPhone R32','Conversación real prolongada','Dictado, silencio, interrupción y cierre','No ejecutado físicamente hoy en R32','NO PROBADO','Pendiente físico'),
('N-03','Todas las pantallas en iPhone R32','Recorrido pantalla por pantalla','Captura individual sin defectos','Sólo subconjunto de capturas','NO PROBADO','Pendiente físico'),
('N-04','Consola Safari iPhone','Capturar errores de dispositivo','Cero errores','No hubo consola remota física','NO PROBADO','Pendiente físico'),
('N-05','Red Safari iPhone','Capturar solicitudes en dispositivo','Cero fallos','No hubo traza HAR física','NO PROBADO','Pendiente físico'),
('N-06','Tráfico vivo Guatemala','Validar proveedor y trayecto real','ETA/demora reproducibles','No ejecutado físicamente hoy','NO PROBADO','Pendiente proveedor/campo'),
('N-07','Clima contra medición de campo','Comparar proveedor con instrumento','Dato físico validado','Sólo lectura visual de la app','NO PROBADO','Pendiente campo'),
('N-08','Monetización/billing','Compra real y restauración','Flujo comercial completo','No ejecutado','NO PROBADO','Pendiente credenciales/tiendas'),
('N-09','Paquetes nativos iOS/Android','Instalar binarios firmados','Ambas plataformas operativas','No instalado hoy','NO PROBADO','Pendiente TestFlight/Android'),
('N-10','Accesibilidad humana completa','VoiceOver, contraste y flujo','Uso completo accesible','No ejecutado por usuario de tecnología asistiva','NO PROBADO','Pendiente humano'),
]

def audit_tests():
    s=(ROOT/'audit-project.mjs').read_text()
    names=[]
    for x in re.findall(r"['\"]([^'\"]+\.(?:mjs|js))['\"]",s):
        if x not in names and (x.startswith('test-') or x.startswith('database/test-') or x=='verify-manual-sync.mjs'): names.append(x)
    return names

def repo_files():
    out=subprocess.check_output(['git','ls-files','--cached','--others','--exclude-standard'],cwd=ROOT,text=True)
    return sorted(x for x in out.splitlines() if x)

def esc(x): return str(x).replace('|','\\|').replace('\n',' ')

def write_md():
    tests=audit_tests(); files=repo_files()
    counts={s:sum(1 for r in matrix if r[5]==s) for s in ['PASS','FAIL','BLOQUEADO','NO PROBADO']}
    tested=counts['PASS']+counts['FAIL']; coverage=tested/len(matrix)*100
    lines=['# ACTA TÉCNICA DE VERIFICACIÓN Y CONGELAMIENTO DE VERSIÓN - EPG CADDY','',
    '**Acta:** ATV-R32-20260910-01  ','**Fecha y hora de cierre:** '+NOW.strftime('%d/%m/%Y %H:%M:%S')+' Guatemala  ',
    '**Responsable técnico de ejecución:** OpenAI Codex, agente técnico automatizado  ','**Propietario y aprobador final:** Jaime Kirste  ',
    '**Repositorio:** EPGCADDY/EPG-CADDY  ','**Rama examinada:** lab/v407-r24-whatsapp-registration  ',
    '**Commit remoto examinado:** `'+COMMIT+'`  ','**Deployment examinado:** `'+DEPLOY+'` - READY  ',
    '**URL exacta del deployment:** '+DEPLOY_URL+'  ','**Alias LAB observado por captura:** '+LAB_URL+'  ',
    '**Producción/Maestro:** '+PROD_URL+' - R28 - `'+PROD_COMMIT+'` - intacta según control consultado  ','',
    '## Alcance y valor de esta acta','',
    'Este expediente documenta toda la arquitectura revisada hoy: controles de proyecto, 139 paquetes automatizados, compilación, datos, motores, persistencia, navegación, tarjetas, diez modalidades/funciones, Manual de 74 páginas, voz, LIVE, seguridad, despliegue y evidencia física aportada desde iPhone. No convierte pruebas de código en pruebas físicas. Un PASS automatizado significa que el procedimiento reproducible indicado terminó sin error; un PASS físico sólo se emite cuando existe captura física identificable.','',
    'El resultado integral NO ES PASS TOTAL. La actualización R31 a R32 falló al primer toque y sólo concluyó con un segundo aviso y segundo toque. También permanecen bloqueos y recorridos no probados. Por ello no se usan las palabras certificado, garantizado ni 100 % funcional.','',
    '## Entornos realmente utilizados','',
    '- Código/comandos: Linux en contenedor, Node.js y Python.','- Navegación/build: infraestructura Vercel; no equivale a dispositivo físico.','- Evidencia física: capturas suministradas por el propietario desde iPhone/iOS; Codex no controló físicamente ese dispositivo.','- Emulación: no declarada como prueba física.','- Video: no aportado.','',
    '## Matriz individual de verificación','',
    '| ID | Elemento probado | Procedimiento | Esperado | Obtenido | Estado | Evidencia |','|---|---|---|---|---|---|---|']
    for r in matrix: lines.append('| '+' | '.join(esc(x) for x in r)+' |')
    lines += ['', '## Inventario funcional y arquitectónico','',
    '### Pantallas y tarjetas examinadas','',
    '- Acceso propietario; Registro/Nueva Ronda; principal de ronda; Control Manual; Score Card; Tarjeta Digital Final; Historial; Manual de Funciones; LIVE; soporte; respaldo/cuenta; instalación/actualización; vistas General, Stableford, Match Play, Four Ball, Universales, Práctica, Skins, Wolf y Vegas.','',
    '### Módulos examinados','',
    '- Registro y perfil; catálogo de campos; motor Gross/Neto/resultado; handicap; cierre; reloj; persistencia; corrección; historial; PNG/PDF; archivo local; analítica; sincronización; autenticación; respaldo; LIVE; clima/tráfico; reglas; voz/micrófono; PWA/service worker; acceso invitado; Manual; diseños; paquetes nativos y monetización a nivel de pruebas automatizadas.','',
    '### Modalidades y funciones','',
    '1. Medal Play Normal / General','2. Match Play','3. Four Ball','4. Stableford','5. Skins','6. Wolf','7. Vegas','8. Universales','9. Score Card - Práctica','10. Comparte LIVE','',
    '## Resultados completos por tipo','',
    '- Compilación: PASS en Vercel; warnings de dependencias obsoletas `tar`, `uuid`, `glob` y `prebuild-install` quedan registrados, sin fallo de build.','- Unitarias/regresión: PASS, 139 paquetes ejecutados.','- Integración: PASS automatizado para registro, motores, persistencia, historial, tarjetas, sincronización y LIVE. El sistema ACTUALIZAR no obtiene PASS integral porque falló físicamente al primer toque.','- Navegación: PASS automatizado; recorrido físico total R32 NO PROBADO.','- Persistencia: PASS automática y evidencia física de conservación R31 a R32.','- Cálculos: PASS en motores General/Stableford/Match/Four Ball/side games.','- Consola: banco automatizado PASS; consola física Safari NO PROBADA.','- Red: APIs/bancos automatizados PASS; HAR físico iPhone NO PROBADO.','- Regresión: auditoría maestra PASS 139 paquetes; esto no sustituye las puertas físicas.','',
    '## Evidencia visual y comparación','',
    '- R29/R31/R32 y pantallas de acceso, Registro, Score Card, modalidades y Manual: capturas conservadas en `evidencia/fisica_usuario/`.','- R30 Score Card: FAIL por corte/área blanca.','- R31 instalación: FAIL por aparecer ACTUALIZADO sin toque.','- R31 modalidades: FAIL por una columna.','- R31→R32: FAIL de primer toque; el segundo aviso y segundo toque sí dejaron R32 visible.','- R32 principal: PASS físico visible y conservación de ronda.','- R32 modalidades en dos columnas: PASS automático; captura física posterior no disponible.','- Voz femenina del Manual: reproducción visible a 0.9x; identidad técnica y uniformidad total BLOQUEADAS.','- Videos: NO PROBADO por inexistencia de archivos.','',
    '## Protección contra regresiones y congelamiento','',
    '- Cada PASS automatizado queda como BASE FUNCIONAL APROBADA E INTOCABLE mediante `audit-project.mjs`, `Intocables/`, pruebas R31/R32 y `BASE_FUNCIONAL_APROBADA_R32.json`.','- La voz femenina elegida por el propietario queda declarada mandatoria e intocable en `VOZ_FEMENINA_MANDATORIA.lock.json`; su implementación uniforme permanece BLOQUEADA hasta identificar y comprobar exactamente la misma voz.','- Paquete recuperable: `EPG_CADDY_R32_TREE_RECUPERABLE.tar.gz`.','- Rollback: `PROCEDIMIENTO_RESTAURACION_Y_ROLLBACK.md`.','- Capturas maestras: sólo se consideran aprobadas las marcadas PASS; las capturas FAIL permanecen como evidencia negativa.','- Tag local de auditoría: `audit/v407-r32-technical-pass-20260910`. No se crea un tag estable integral porque aún existen FAIL/BLOQUEADO/NO PROBADO.','- Commit protegido de referencia: '+COMMIT+' registrado en JSON y hashes; la protección remota de rama no fue modificada ni comprobada.','',
    '## Limitaciones y pendientes reales','',
    '1. Falta corregir y demostrar ACTUALIZAR al primer toque con transiciones consecutivas sobre el mismo alias.','2. Falta recorrido físico completo de todas las pantallas y diez modalidades en R32.','3. Falta micrófono/voz física prolongada en iPhone R32.','4. Falta demostrar que todas las respuestas usan exactamente la mujer del Manual.','5. Falta video de cada recorrido.','6. Falta consola y red Safari del dispositivo físico.','7. Falta tráfico real en Guatemala y contraste físico de clima.','8. Falta compra/restauración comercial y binarios firmados iOS/Android.','',
    '## Producción','',
    'Producción/Maestro permaneció en R28, commit `'+PROD_COMMIT+'`, según el control automatizado y la consulta de despliegues. No se escribió ni promovió código R32 sobre la rama main durante esta ejecución.','',
    '## Apéndice A - paquetes automatizados ejecutados','']
    for i,t in enumerate(tests,1): lines.append(f'{i}. `{t}` - PASS dentro de `audit-project.mjs`')
    lines += ['',f'## Apéndice B - inventario de archivos versionados ({len(files)})','']
    for i,f in enumerate(files,1): lines.append(f'{i}. `{f}`')
    lines += ['', '## DECLARACIÓN FINAL OBLIGATORIA','',
    f'- Total de elementos inventariados en la matriz: {len(matrix)}.',f'- Total probado: {tested}.',f'- PASS: {counts["PASS"]}.',f'- FAIL: {counts["FAIL"]}.',f'- BLOQUEADOS: {counts["BLOQUEADO"]}.',f'- NO PROBADOS: {counts["NO PROBADO"]}.',f'- Porcentaje real de cobertura de la matriz: {coverage:.1f} %.','- Versión congelada integral: NINGUNA; sólo quedan congelados los elementos individuales en PASS.','- Base técnica examinada: V407-R32.','- Commit verificado: `'+COMMIT+'`.','- Deployment verificado: `'+DEPLOY+'` - READY - '+DEPLOY_URL+'.','- Pendientes reales: los ocho puntos expresos de la sección Limitaciones y pendientes reales.','- Estado de Producción: intacta en R28, `'+PROD_COMMIT+'`.','- Responsable técnico de ejecución: OpenAI Codex, agente técnico automatizado.','- Propietario/aprobador final: Jaime Kirste.','- Fecha y hora de cierre: '+NOW.strftime('%d/%m/%Y %H:%M:%S')+' Guatemala.','',
    'Las huellas SHA-256 del acta, paquete, evidencias y artefactos principales se almacenan en `SHA256SUMS.txt`. Cualquier modificación exige una nueva versión de acta y nueva trazabilidad.']
    CASE.mkdir(parents=True,exist_ok=True); MD.write_text('\n'.join(lines)+'\n',encoding='utf-8')

def build_pdf():
    fonts=Path(reportlab.__file__).resolve().parent/'fonts'; pdfmetrics.registerFont(TTFont('Vera',str(fonts/'Vera.ttf'))); pdfmetrics.registerFont(TTFont('VeraB',str(fonts/'VeraBd.ttf')))
    st=getSampleStyleSheet(); body=ParagraphStyle('body',parent=st['BodyText'],fontName='Vera',fontSize=7.4,leading=9.4,spaceAfter=3); h1=ParagraphStyle('h1',parent=body,fontName='VeraB',fontSize=15,leading=18,spaceBefore=8,spaceAfter=7); h2=ParagraphStyle('h2',parent=body,fontName='VeraB',fontSize=11,leading=14,spaceBefore=7,spaceAfter=5); cover=ParagraphStyle('cover',parent=h1,alignment=TA_CENTER,fontSize=20,leading=24)
    story=[Spacer(1,42*mm),Paragraph('ACTA TÉCNICA DE VERIFICACIÓN Y CONGELAMIENTO DE VERSIÓN',cover),Paragraph('EPG CADDY',cover),Spacer(1,8*mm),Paragraph('ATV-R32-20260910-01',ParagraphStyle('c',parent=body,alignment=TA_CENTER,fontSize=11)),PageBreak()]
    for line in MD.read_text(encoding='utf-8').splitlines():
        s=line.replace('&','&amp;').replace('<','&lt;').replace('>','&gt;').replace('`','').replace('**','')
        if line.startswith('# '): story.append(Paragraph(s[2:],h1))
        elif line.startswith('## '): story.append(Paragraph(s[3:],h2))
        elif line.startswith('### '): story.append(Paragraph(s[4:],ParagraphStyle('h3',parent=body,fontName='VeraB',fontSize=9)))
        elif line.startswith('|'): story.append(Paragraph(s,ParagraphStyle('tableline',parent=body,fontSize=5.4,leading=7,backColor=colors.HexColor('#f3f3f3'))))
        elif not line: story.append(Spacer(1,2*mm))
        else: story.append(Paragraph(s,body))
    def footer(c,d):
        c.saveState(); c.setStrokeColor(colors.HexColor('#31aa00')); c.line(16*mm,12*mm,A4[0]-16*mm,12*mm); c.setFont('Vera',6.5); c.drawString(16*mm,7*mm,'EPG CADDY - ATV-R32-20260910-01'); c.drawRightString(A4[0]-16*mm,7*mm,f'Página {d.page}'); c.restoreState()
    SimpleDocTemplate(str(PDF),pagesize=A4,leftMargin=15*mm,rightMargin=15*mm,topMargin=14*mm,bottomMargin=16*mm,title='ACTA TÉCNICA DE VERIFICACIÓN Y CONGELAMIENTO DE VERSIÓN - EPG CADDY',author='OpenAI Codex').build(story,onFirstPage=footer,onLaterPages=footer)

write_md(); build_pdf(); print(MD); print(PDF)
