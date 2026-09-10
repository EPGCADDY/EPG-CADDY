# ACTA TÉCNICA DE VERIFICACIÓN Y CONGELAMIENTO DE VERSIÓN - EPG CADDY

**Acta:** ATV-R32-20260910-01  
**Fecha y hora de cierre:** 10/09/2026 06:23:04 Guatemala  
**Responsable técnico de ejecución:** OpenAI Codex, agente técnico automatizado  
**Propietario y aprobador final:** Jaime Kirste  
**Repositorio:** EPGCADDY/EPG-CADDY  
**Rama examinada:** lab/v407-r24-whatsapp-registration  
**Commit remoto examinado:** `a4b1cec9e1380d8a5b72080477cad97080ab0cce`  
**Deployment examinado:** `dpl_G97hXzJbV9duYHLn8SGREJWRgUHq` - READY  
**URL exacta del deployment:** https://golf-sc-gt-dypjyc3wg-epgcaddys-projects.vercel.app  
**Alias LAB observado por captura:** https://golf-sc-gt-lab.vercel.app  
**Producción/Maestro:** https://epg-caddy.vercel.app/ - R28 - `7816978be8aa23aba20f4c066fce30f6287ff134` - intacta según control consultado  

## Alcance y valor de esta acta

Este expediente documenta toda la arquitectura revisada hoy: controles de proyecto, 139 paquetes automatizados, compilación, datos, motores, persistencia, navegación, tarjetas, diez modalidades/funciones, Manual de 74 páginas, voz, LIVE, seguridad, despliegue y evidencia física aportada desde iPhone. No convierte pruebas de código en pruebas físicas. Un PASS automatizado significa que el procedimiento reproducible indicado terminó sin error; un PASS físico sólo se emite cuando existe captura física identificable.

El resultado integral NO ES PASS TOTAL. La actualización R31 a R32 falló al primer toque y sólo concluyó con un segundo aviso y segundo toque. También permanecen bloqueos y recorridos no probados. Por ello no se usan las palabras certificado, garantizado ni 100 % funcional.

## Entornos realmente utilizados

- Código/comandos: Linux en contenedor, Node.js y Python.
- Navegación/build: infraestructura Vercel; no equivale a dispositivo físico.
- Evidencia física: capturas suministradas por el propietario desde iPhone/iOS; Codex no controló físicamente ese dispositivo.
- Emulación: no declarada como prueba física.
- Video: no aportado.

## Matriz individual de verificación

| ID | Elemento probado | Procedimiento | Esperado | Obtenido | Estado | Evidencia |
|---|---|---|---|---|---|---|
| G0-01 | Controles documentales | Ejecutar project-quality-gate | 11 controles y 7 entradas presentes | PASS controls=11 inputs=7 gates=11 | PASS | evidencia/automatizada/audit-project-r32-full.log |
| G0-02 | Identidad Git R32 | Comparar rama, commit y metadata Vercel | Commit completo coincidente | Vercel READY reporta a4b1cec9e1380d8a5b72080477cad97080ab0cce | PASS | Vercel deployment dpl_G97hXzJbV9duYHLn8SGREJWRgUHq |
| G0-03 | Producción intacta | Consultar proyecto epg-caddy y base de calidad | Main sin cambio | Producción conserva R28 7816978be8aa23aba20f4c066fce30f6287ff134 | PASS | scripts/project-quality-gate.mjs |
| G0-04 | Compilación Vercel | Revisar build logs del deployment | Build completo | Build Completed y Deployment completed | PASS | evidencia/automatizada/vercel-build-r32.log |
| G0-05 | Inventario sellado | Ejecutar inventory-gate | Fuentes y tres PDF sincronizados | Inventario regenerado; sello SHA-256 | PASS | CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json |
| G0-06 | ROADMAP doble | Ejecutar roadmap-gate | Todo cambio en ambos ROADMAPS | PASS después de corregir nombres exactos R32 | PASS | ROADMAP_OVERALL.md; ROADMAP_A_DETALLE.md |
| G0-07 | Intocables V378 | Ejecutar intocables-gate | INT-01 a INT-05 sin alteración | PASS hashes y bancos permanentes | PASS | Intocables/intocables-gate.mjs |
| G0-08 | Manual editorial 74 páginas | Ejecutar manual-editorial-qc | 74/74 y cobertura semántica | PASS pages=74 | PASS | scripts/manual-editorial-qc.py |
| G0-09 | Manual visual automatizado | Ejecutar manual-visual-qc | 2160x4320 y 300 dpi | PASS pages=74 | PASS | scripts/manual-visual-qc.py |
| F-01 | Registro de jugadores | Bancos registro, borrado, autocompletado y HCP | Escritor y estado coherentes | Pruebas automáticas PASS | PASS | test-player-registry.js; test-v407-r25-round-controls.mjs |
| F-02 | Catálogo de campos | Probar catálogo, pares, yardas, rating, slope y HCP | Fuentes canónicas conservadas | Pruebas automáticas PASS | PASS | test-course-catalog.mjs; test-country-club-official.mjs |
| F-03 | Motor de puntuación | Ejecutar score-engine y matrices | Gross/Neto/resultado exactos | Pruebas automáticas PASS | PASS | test-score-engine.mjs |
| F-04 | Persistencia de ronda | Guardar, reabrir y cambiar estado | Ronda recuperable sin pérdida | Pruebas automáticas PASS | PASS | test-v358-active-round-reopen.mjs; test-v365-active-round-empty-recovery.mjs |
| F-05 | Correcciones oficiales | Corregir conservando original y razón | Recalcular y versionar | Prueba automática PASS | PASS | test-v277-official-round-corrections.mjs |
| F-06 | Historial | Archivar, abrir, buscar, borrar y no reaparición | Ronda actual intacta | Pruebas automáticas PASS | PASS | test-v279-local-card-library.mjs; test-v398-history-long-press-delete.mjs |
| F-07 | Tarjetas PNG/PDF | Generar artefactos oficiales | Archivos reproducibles | Prueba automática PASS | PASS | test-v278-card-image-pdf-export.mjs; test-card-artifacts.mjs |
| F-08 | Sincronización, autenticación y respaldo | Ejecutar bancos API/cola/backup | Estados y errores controlados | Pruebas automáticas PASS | PASS | test-sync-queue.mjs; test-sync-api.mjs; test-sync-auth.mjs |
| M-01 | Medal Play Normal / General | Ejecutar registro, scores y cierre | Modalidad operativa | Pruebas automáticas PASS | PASS | test-v267-scorecard-combination-matrix.mjs |
| M-02 | Stableford | Reglas, categorías, puntos, historial y manual | Cálculo y persistencia únicos | Pruebas automáticas PASS | PASS | test-stableford.mjs; test-stableford-ui.mjs |
| M-03 | Match Play | Probar flechas, nombres, acumulado y cierre | Marcador Match correcto | Pruebas automáticas PASS | PASS | test-v306-match-play.mjs; test-v307-match-arrows-format.mjs |
| M-04 | Four Ball | Probar parejas, mejor neto y acumulado | Resultado Four Ball correcto | Prueba automática PASS | PASS | test-v309-four-ball.mjs |
| M-05 | Skins | Probar carry, split, void y GTQ | Liquidación correcta | Prueba automática PASS | PASS | test-v329-skins.mjs |
| M-06 | Wolf | Ejecutar banco de side games | Reglas y estado preservados | Prueba automática PASS | PASS | test-v330-side-games.mjs |
| M-07 | Vegas | Ejecutar banco de side games | Reglas y estado preservados | Prueba automática PASS | PASS | test-v330-side-games.mjs |
| M-08 | Universales | Coordinación, ingreso y tarjeta | Escritor oficial compartido | Pruebas automáticas PASS | PASS | test-v407-r6-universales.mjs |
| M-09 | Score Card - Práctica | Probar perfil provisional y retorno | Sin contaminar ronda oficial | Prueba automática PASS | PASS | test-v262-provisional-optional-profile.mjs |
| M-10 | Comparte LIVE | Publicar/leer, privacidad y vista por modalidad | Lectura segura | Pruebas automáticas PASS | PASS | test-v352-live.mjs; test-v353-live-hub.mjs |
| S-01 | Acceso propietario e invitado 24 h | Probar login, token, canje único y límites | Acceso protegido | Prueba automática PASS; pantalla física observada | PASS | test-r18-owner-guest-24h-access.mjs; evidencia/fisica_usuario/IMG_3372_ACCESO_PROPIETARIO.png |
| U-01 | Actualización sólo por propietario R32 | Inspección negativa de install/activate y promoción | No instalar al publicar | Prueba automática PASS | PASS | test-v407-r32-owner-only-update.mjs |
| U-02 | Modalidades en dos columnas R32 | Inspeccionar CSS y diez opciones | Dos columnas y 10 opciones | Prueba automática PASS | PASS | test-v407-r32-two-column-modalities.mjs |
| U-03 | Score Card móvil desplazable | Inspeccionar contenedor, tabla y gesto | Sin compresión ni fondo blanco | Prueba automática PASS | PASS | test-v407-r31-mobile-card-scroll.mjs |
| U-04 | Contornos verdes | Inspeccionar selectores y excepción OK | Fondo negro salvo OK | Prueba automática PASS | PASS | test-v407-r30-green-outline-controls.mjs |
| P-01 | Actualización física R31 a R32 al primer toque | Comparar relato y capturas consecutivas aportadas desde iPhone | Un solo aviso y un solo toque deben activar R32 | Primer aviso/toque permaneció en R31; apareció un segundo aviso y el segundo toque activó R32 | FAIL | evidencia/fisica_usuario/IMG_3385_R31_ANTES_DE_R32.png; evidencia/fisica_usuario/IMG_3386_R32_ACTUALIZADO_CONSERVA_RONDA.png; declaración del propietario en conversación |
| P-02 | Conservación física de ronda | Comparar modalidad, campo, hora y controles | Sin pérdida al actualizar | Universales, El Pulté, 04:22 y controles conservados | PASS | evidencia/fisica_usuario/IMG_3386_R32_ACTUALIZADO_CONSERVA_RONDA.png |
| P-03 | Pantalla principal R32 | Inspección visual de captura iPhone | Sin corte ni superposición visible | Captura vertical legible | PASS | evidencia/fisica_usuario/IMG_3386_R32_ACTUALIZADO_CONSERVA_RONDA.png |
| X-01 | Score Card R30 en iPhone | Inspección de captura | Tarjeta negra completa y navegable | Área blanca/corte visible | FAIL | evidencia/fisica_usuario/IMG_3377_R30_TARJETA_CORTADA.png |
| X-02 | Publicación R31 sin instalación automática | Comparar publicación y captura | Debe esperar ACTUALIZAR | R31 apareció ACTUALIZADO sin toque | FAIL | evidencia/fisica_usuario/IMG_3382_R31_ENTRO_ACTUALIZADO.png |
| X-03 | Modalidades R31 | Inspección de captura | Dos columnas | Una columna | FAIL | evidencia/fisica_usuario/IMG_3383_R31_MODALIDADES_UNA_COLUMNA.png |
| B-01 | Voz femenina idéntica en toda la aplicación | Comparar identidad/voiceURI del Manual con todas las respuestas | Misma mujer, obligatoria e intocable | Captura acredita reproducción 0.9x, no identidad técnica ni cobertura total | BLOQUEADO | evidencia/fisica_usuario/IMG_3384_MANUAL_VOZ_FEMENINA_09X.png; VOZ_FEMENINA_MANDATORIA.lock.json |
| D-01 | Alias estable LAB exacto | Consultar API Vercel y deployment promovido | Deployment R32 READY con target production y mismo commit | Deployment promovido READY, target production, commit coincidente y alias estable servido | PASS | Vercel dpl_G97hXzJbV9duYHLn8SGREJWRgUHq; https://golf-sc-gt-lab.vercel.app |
| N-01 | Video completo de recorridos | Buscar evidencia audiovisual | Video por cada recorrido | No se aportaron videos | NO PROBADO | Sin archivo |
| N-02 | Micrófono físico iPhone R32 | Conversación real prolongada | Dictado, silencio, interrupción y cierre | No ejecutado físicamente hoy en R32 | NO PROBADO | Pendiente físico |
| N-03 | Todas las pantallas en iPhone R32 | Recorrido pantalla por pantalla | Captura individual sin defectos | Sólo subconjunto de capturas | NO PROBADO | Pendiente físico |
| N-04 | Consola Safari iPhone | Capturar errores de dispositivo | Cero errores | No hubo consola remota física | NO PROBADO | Pendiente físico |
| N-05 | Red Safari iPhone | Capturar solicitudes en dispositivo | Cero fallos | No hubo traza HAR física | NO PROBADO | Pendiente físico |
| N-06 | Tráfico vivo Guatemala | Validar proveedor y trayecto real | ETA/demora reproducibles | No ejecutado físicamente hoy | NO PROBADO | Pendiente proveedor/campo |
| N-07 | Clima contra medición de campo | Comparar proveedor con instrumento | Dato físico validado | Sólo lectura visual de la app | NO PROBADO | Pendiente campo |
| N-08 | Monetización/billing | Compra real y restauración | Flujo comercial completo | No ejecutado | NO PROBADO | Pendiente credenciales/tiendas |
| N-09 | Paquetes nativos iOS/Android | Instalar binarios firmados | Ambas plataformas operativas | No instalado hoy | NO PROBADO | Pendiente TestFlight/Android |
| N-10 | Accesibilidad humana completa | VoiceOver, contraste y flujo | Uso completo accesible | No ejecutado por usuario de tecnología asistiva | NO PROBADO | Pendiente humano |

## Inventario funcional y arquitectónico

### Pantallas y tarjetas examinadas

- Acceso propietario; Registro/Nueva Ronda; principal de ronda; Control Manual; Score Card; Tarjeta Digital Final; Historial; Manual de Funciones; LIVE; soporte; respaldo/cuenta; instalación/actualización; vistas General, Stableford, Match Play, Four Ball, Universales, Práctica, Skins, Wolf y Vegas.

### Módulos examinados

- Registro y perfil; catálogo de campos; motor Gross/Neto/resultado; handicap; cierre; reloj; persistencia; corrección; historial; PNG/PDF; archivo local; analítica; sincronización; autenticación; respaldo; LIVE; clima/tráfico; reglas; voz/micrófono; PWA/service worker; acceso invitado; Manual; diseños; paquetes nativos y monetización a nivel de pruebas automatizadas.

### Modalidades y funciones

1. Medal Play Normal / General
2. Match Play
3. Four Ball
4. Stableford
5. Skins
6. Wolf
7. Vegas
8. Universales
9. Score Card - Práctica
10. Comparte LIVE

## Resultados completos por tipo

- Compilación: PASS en Vercel; warnings de dependencias obsoletas `tar`, `uuid`, `glob` y `prebuild-install` quedan registrados, sin fallo de build.
- Unitarias/regresión: PASS, 139 paquetes ejecutados.
- Integración: PASS automatizado para registro, motores, persistencia, historial, tarjetas, sincronización y LIVE. El sistema ACTUALIZAR no obtiene PASS integral porque falló físicamente al primer toque.
- Navegación: PASS automatizado; recorrido físico total R32 NO PROBADO.
- Persistencia: PASS automática y evidencia física de conservación R31 a R32.
- Cálculos: PASS en motores General/Stableford/Match/Four Ball/side games.
- Consola: banco automatizado PASS; consola física Safari NO PROBADA.
- Red: APIs/bancos automatizados PASS; HAR físico iPhone NO PROBADO.
- Regresión: auditoría maestra PASS 139 paquetes; esto no sustituye las puertas físicas.

## Evidencia visual y comparación

- R29/R31/R32 y pantallas de acceso, Registro, Score Card, modalidades y Manual: capturas conservadas en `evidencia/fisica_usuario/`.
- R30 Score Card: FAIL por corte/área blanca.
- R31 instalación: FAIL por aparecer ACTUALIZADO sin toque.
- R31 modalidades: FAIL por una columna.
- R31→R32: FAIL de primer toque; el segundo aviso y segundo toque sí dejaron R32 visible.
- R32 principal: PASS físico visible y conservación de ronda.
- R32 modalidades en dos columnas: PASS automático; captura física posterior no disponible.
- Voz femenina del Manual: reproducción visible a 0.9x; identidad técnica y uniformidad total BLOQUEADAS.
- Videos: NO PROBADO por inexistencia de archivos.

## Protección contra regresiones y congelamiento

- Cada PASS automatizado queda como BASE FUNCIONAL APROBADA E INTOCABLE mediante `audit-project.mjs`, `Intocables/`, pruebas R31/R32 y `BASE_FUNCIONAL_APROBADA_R32.json`.
- La voz femenina elegida por el propietario queda declarada mandatoria e intocable en `VOZ_FEMENINA_MANDATORIA.lock.json`; su implementación uniforme permanece BLOQUEADA hasta identificar y comprobar exactamente la misma voz.
- Paquete recuperable: `EPG_CADDY_R32_TREE_RECUPERABLE.tar.gz`.
- Rollback: `PROCEDIMIENTO_RESTAURACION_Y_ROLLBACK.md`.
- Capturas maestras: sólo se consideran aprobadas las marcadas PASS; las capturas FAIL permanecen como evidencia negativa.
- Tag local de auditoría: `audit/v407-r32-technical-pass-20260910`. No se crea un tag estable integral porque aún existen FAIL/BLOQUEADO/NO PROBADO.
- Commit protegido de referencia: a4b1cec9e1380d8a5b72080477cad97080ab0cce registrado en JSON y hashes; la protección remota de rama no fue modificada ni comprobada.

## Limitaciones y pendientes reales

1. Falta corregir y demostrar ACTUALIZAR al primer toque con transiciones consecutivas sobre el mismo alias.
2. Falta recorrido físico completo de todas las pantallas y diez modalidades en R32.
3. Falta micrófono/voz física prolongada en iPhone R32.
4. Falta demostrar que todas las respuestas usan exactamente la mujer del Manual.
5. Falta video de cada recorrido.
6. Falta consola y red Safari del dispositivo físico.
7. Falta tráfico real en Guatemala y contraste físico de clima.
8. Falta compra/restauración comercial y binarios firmados iOS/Android.

## Producción

Producción/Maestro permaneció en R28, commit `7816978be8aa23aba20f4c066fce30f6287ff134`, según el control automatizado y la consulta de despliegues. No se escribió ni promovió código R32 sobre la rama main durante esta ejecución.

## Apéndice A - paquetes automatizados ejecutados

1. `test-lab-continuity-master.mjs` - PASS dentro de `audit-project.mjs`
2. `test-v405-registration-clear-final-mobile.mjs` - PASS dentro de `audit-project.mjs`
3. `test-project-quality-gate.mjs` - PASS dentro de `audit-project.mjs`
4. `test-player-registry.js` - PASS dentro de `audit-project.mjs`
5. `database/test-schema.mjs` - PASS dentro de `audit-project.mjs`
6. `database/test-player-profile-schema.mjs` - PASS dentro de `audit-project.mjs`
7. `database/test-master-data-platform-schema.mjs` - PASS dentro de `audit-project.mjs`
8. `test-no-automatic-x.mjs` - PASS dentro de `audit-project.mjs`
9. `test-course-catalog.mjs` - PASS dentro de `audit-project.mjs`
10. `test-country-club-official.mjs` - PASS dentro de `audit-project.mjs`
11. `test-v273-san-isidro-alta-vista.mjs` - PASS dentro de `audit-project.mjs`
12. `test-v274-complete-courses-voice-operations.mjs` - PASS dentro de `audit-project.mjs`
13. `test-v275-stable-live-voice-turns.mjs` - PASS dentro de `audit-project.mjs`
14. `test-v276-manual-hole-navigation.mjs` - PASS dentro de `audit-project.mjs`
15. `test-score-engine.mjs` - PASS dentro de `audit-project.mjs`
16. `test-round-closure.mjs` - PASS dentro de `audit-project.mjs`
17. `test-card-artifacts.mjs` - PASS dentro de `audit-project.mjs`
18. `test-historical-analytics.mjs` - PASS dentro de `audit-project.mjs`
19. `test-sync-queue.mjs` - PASS dentro de `audit-project.mjs`
20. `test-sync-api.mjs` - PASS dentro de `audit-project.mjs`
21. `test-sync-auth.mjs` - PASS dentro de `audit-project.mjs`
22. `test-master-data-sync.mjs` - PASS dentro de `audit-project.mjs`
23. `test-voice-continuity.mjs` - PASS dentro de `audit-project.mjs`
24. `test-v265-first-nine-automatic-result.mjs` - PASS dentro de `audit-project.mjs`
25. `test-v266-stableford-segment-gross-points.mjs` - PASS dentro de `audit-project.mjs`
26. `test-v267-one-operational-line.mjs` - PASS dentro de `audit-project.mjs`
27. `test-v267-scorecard-combination-matrix.mjs` - PASS dentro de `audit-project.mjs`
28. `test-v269-operational-matrix-demo.mjs` - PASS dentro de `audit-project.mjs`
29. `test-v270-consecutive-hole-voice-blocks.mjs` - PASS dentro de `audit-project.mjs`
30. `test-v271-realtime-prompt-limit.mjs` - PASS dentro de `audit-project.mjs`
31. `test-v272-definitive-operational-release.mjs` - PASS dentro de `audit-project.mjs`
32. `test-round-clock.mjs` - PASS dentro de `audit-project.mjs`
33. `test-round-information.mjs` - PASS dentro de `audit-project.mjs`
34. `test-stableford.mjs` - PASS dentro de `audit-project.mjs`
35. `test-stableford-ui.mjs` - PASS dentro de `audit-project.mjs`
36. `test-stableford-clean-roster-history.mjs` - PASS dentro de `audit-project.mjs`
37. `test-stableford-manual.mjs` - PASS dentro de `audit-project.mjs`
38. `test-v250-stableford-delivery-matrix.mjs` - PASS dentro de `audit-project.mjs`
39. `test-v252-stableford-persistence-category-course.mjs` - PASS dentro de `audit-project.mjs`
40. `test-v253-live-previous-round.mjs` - PASS dentro de `audit-project.mjs`
41. `test-v254-remove-registration-guide.mjs` - PASS dentro de `audit-project.mjs`
42. `test-v255-player-registration-boxes-codes.mjs` - PASS dentro de `audit-project.mjs`
43. `test-v256-master-data-platform.mjs` - PASS dentro de `audit-project.mjs`
44. `test-v257-stableford-course-selector-title.mjs` - PASS dentro de `audit-project.mjs`
45. `test-v258-stableford-readonly-manual-plan-b.mjs` - PASS dentro de `audit-project.mjs`
46. `test-v259-stableford-hide-unused-player-rows.mjs` - PASS dentro de `audit-project.mjs`
47. `test-v260-round-points-player-return.mjs` - PASS dentro de `audit-project.mjs`
48. `test-v261-registration-stableford-modality.mjs` - PASS dentro de `audit-project.mjs`
49. `test-v262-provisional-optional-profile.mjs` - PASS dentro de `audit-project.mjs`
50. `test-v263-compact-players-back-button.mjs` - PASS dentro de `audit-project.mjs`
51. `test-project-control-matrix.mjs` - PASS dentro de `audit-project.mjs`
52. `verify-manual-sync.mjs` - PASS dentro de `audit-project.mjs`
53. `test-v277-official-round-corrections.mjs` - PASS dentro de `audit-project.mjs`
54. `test-v278-card-image-pdf-export.mjs` - PASS dentro de `audit-project.mjs`
55. `test-v279-local-card-library.mjs` - PASS dentro de `audit-project.mjs`
56. `test-v280-local-history-insights.mjs` - PASS dentro de `audit-project.mjs`
57. `test-v281-pwa-installation.mjs` - PASS dentro de `audit-project.mjs`
58. `test-v282-optional-account-backup.mjs` - PASS dentro de `audit-project.mjs`
59. `test-v397-card-in-out-back-contract.mjs` - PASS dentro de `audit-project.mjs`
60. `test-v398-manual-opening-hole.mjs` - PASS dentro de `audit-project.mjs`
61. `test-v398-history-long-press-delete.mjs` - PASS dentro de `audit-project.mjs`
62. `test-v283-native-commercial-readiness.mjs` - PASS dentro de `audit-project.mjs`
63. `test-v284-native-package-generation.mjs` - PASS dentro de `audit-project.mjs`
64. `test-v285-stableford-back-navigation.mjs` - PASS dentro de `audit-project.mjs`
65. `test-v286-stableford-back-restores-home.mjs` - PASS dentro de `audit-project.mjs`
66. `test-v287-stableford-back-controls-clear.mjs` - PASS dentro de `audit-project.mjs`
67. `test-v289-stableford-new-round-empty.mjs` - PASS dentro de `audit-project.mjs`
68. `test-v290-brand-icons-cleanup.mjs` - PASS dentro de `audit-project.mjs`
69. `test-v304-homogeneous-registration-actions.mjs` - PASS dentro de `audit-project.mjs`
70. `test-v305-history-navigation-zero-error.mjs` - PASS dentro de `audit-project.mjs`
71. `test-v305-registration-guides-parser-truth.mjs` - PASS dentro de `audit-project.mjs`
72. `test-v306-match-play.mjs` - PASS dentro de `audit-project.mjs`
73. `test-v307-match-arrows-format.mjs` - PASS dentro de `audit-project.mjs`
74. `test-v309-four-ball.mjs` - PASS dentro de `audit-project.mjs`
75. `test-v311-neutral-match-home-link.mjs` - PASS dentro de `audit-project.mjs`
76. `test-v311-manual-hosting.mjs` - PASS dentro de `audit-project.mjs`
77. `test-v311-manual-semantic-coverage.mjs` - PASS dentro de `audit-project.mjs`
78. `test-v311-manual-voice-map.mjs` - PASS dentro de `audit-project.mjs`
79. `test-v311-manual-search.mjs` - PASS dentro de `audit-project.mjs`
80. `test-v311-voice-assistant.mjs` - PASS dentro de `audit-project.mjs`
81. `test-v311-timer-inactivity.mjs` - PASS dentro de `audit-project.mjs`
82. `test-v311-live-support-link.mjs` - PASS dentro de `audit-project.mjs`
83. `test-v312-general-caddie.mjs` - PASS dentro de `audit-project.mjs`
84. `test-v320-universal-100-domains.mjs` - PASS dentro de `audit-project.mjs`
85. `test-v321-ai-universal-infinity.mjs` - PASS dentro de `audit-project.mjs`
86. `test-v322-real-sustained-caddie.mjs` - PASS dentro de `audit-project.mjs`
87. `test-v323-long-multitopic-context.mjs` - PASS dentro de `audit-project.mjs`
88. `test-v324-real-traffic.mjs` - PASS dentro de `audit-project.mjs`
89. `test-v325-ideal-microphone-timings.mjs` - PASS dentro de `audit-project.mjs`
90. `test-v326-no-silent-conversation.mjs` - PASS dentro de `audit-project.mjs`
91. `test-v327-tool-followup-no-silence.mjs` - PASS dentro de `audit-project.mjs`
92. `test-v328-official-golf-rules.mjs` - PASS dentro de `audit-project.mjs`
93. `test-v328-offline-official-rules.mjs` - PASS dentro de `audit-project.mjs`
94. `test-v335-response-caliber.mjs` - PASS dentro de `audit-project.mjs`
95. `test-v336-microphone-transport.mjs` - PASS dentro de `audit-project.mjs`
96. `test-v337-universal-weather.mjs` - PASS dentro de `audit-project.mjs`
97. `test-v345-home-icons.mjs` - PASS dentro de `audit-project.mjs`
98. `test-v329-skins.mjs` - PASS dentro de `audit-project.mjs`
99. `test-v330-side-games.mjs` - PASS dentro de `audit-project.mjs`
100. `test-v352-live.mjs` - PASS dentro de `audit-project.mjs`
101. `test-v353-live-hub.mjs` - PASS dentro de `audit-project.mjs`
102. `test-v354-voice-fallback.mjs` - PASS dentro de `audit-project.mjs`
103. `test-v355-ios-audio-dictation.mjs` - PASS dentro de `audit-project.mjs`
104. `test-v356-voice-only-cedar-quality.mjs` - PASS dentro de `audit-project.mjs`
105. `test-v356-traffic-weather-accuracy.mjs` - PASS dentro de `audit-project.mjs`
106. `test-v357-ios-voice-transport-recovery.mjs` - PASS dentro de `audit-project.mjs`
107. `test-v358-active-round-reopen.mjs` - PASS dentro de `audit-project.mjs`
108. `test-v358-ios-score-universal-physical-recovery.mjs` - PASS dentro de `audit-project.mjs`
109. `test-v359-ios-score-parser-recovery.mjs` - PASS dentro de `audit-project.mjs`
110. `test-v357-synchronized-progressive-voice.mjs` - PASS dentro de `audit-project.mjs`
111. `test-v361-synchronized-voice.mjs` - PASS dentro de `audit-project.mjs`
112. `test-v362-physical-voice-recovery.mjs` - PASS dentro de `audit-project.mjs`
113. `test-v364-vercel-oidc-recovery.mjs` - PASS dentro de `audit-project.mjs`
114. `test-v363-recorded-mobile-behavior.mjs` - PASS dentro de `audit-project.mjs`
115. `test-v363-intocables-behavior.mjs` - PASS dentro de `audit-project.mjs`
116. `test-v364-explicit-new-round-entry.mjs` - PASS dentro de `audit-project.mjs`
117. `test-v365-active-round-empty-recovery.mjs` - PASS dentro de `audit-project.mjs`
118. `test-v366-principal-entry-recovery.mjs` - PASS dentro de `audit-project.mjs`
119. `test-v367-universal-voice-in-place.mjs` - PASS dentro de `audit-project.mjs`
120. `test-v368-canonical-home-entry.mjs` - PASS dentro de `audit-project.mjs`
121. `test-v406-r4-mobile-controls.mjs` - PASS dentro de `audit-project.mjs`
122. `test-v406-tournament-categories.mjs` - PASS dentro de `audit-project.mjs`
123. `test-v406-r5-simple-tournament-live.mjs` - PASS dentro de `audit-project.mjs`
124. `test-v406-r23-visible-version.mjs` - PASS dentro de `audit-project.mjs`
125. `test-v406-r23-turn-closure-audio.mjs` - PASS dentro de `audit-project.mjs`
126. `test-v407-r5-visual-inventory.mjs` - PASS dentro de `audit-project.mjs`
127. `test-v407-r5a-history-visual-system.mjs` - PASS dentro de `audit-project.mjs`
128. `test-v407-r6-universales-coordination.mjs` - PASS dentro de `audit-project.mjs`
129. `test-v407-r6-universales.mjs` - PASS dentro de `audit-project.mjs`
130. `test-v407-r7-ios-scroll.mjs` - PASS dentro de `audit-project.mjs`
131. `test-v407-r9-manual-update.mjs` - PASS dentro de `audit-project.mjs`
132. `test-r18-owner-guest-24h-access.mjs` - PASS dentro de `audit-project.mjs`
133. `test-v407-r24-update-physical-gate.mjs` - PASS dentro de `audit-project.mjs`
134. `test-v407-r24b-history-update-isolation.mjs` - PASS dentro de `audit-project.mjs`
135. `test-v407-r24c-public-pwa-bootstrap.mjs` - PASS dentro de `audit-project.mjs`
136. `test-v407-r24c-update-scroll-isolation.mjs` - PASS dentro de `audit-project.mjs`
137. `test-v407-r29-live-handicap-row.mjs` - PASS dentro de `audit-project.mjs`
138. `test-v407-r30-green-outline-controls.mjs` - PASS dentro de `audit-project.mjs`
139. `test-v407-r30-history-transitions.mjs` - PASS dentro de `audit-project.mjs`
140. `test-v407-r31-mobile-card-scroll.mjs` - PASS dentro de `audit-project.mjs`
141. `test-v407-r32-two-column-modalities.mjs` - PASS dentro de `audit-project.mjs`
142. `test-v407-r32-owner-only-update.mjs` - PASS dentro de `audit-project.mjs`

## Apéndice B - inventario de archivos versionados (482)

1. `.gitattributes`
2. `.github/workflows/hotfix-support-same-screen.yml`
3. `.github/workflows/ios-build.yml`
4. `.github/workflows/ios-testflight.yml`
5. `.github/workflows/mobile-native-package.yml`
6. `.github/workflows/roadmap-gate.yml`
7. `.github/workflows/stableford-tournament-pass.yml`
8. `.gitignore`
9. `7B1C43A7-EB8A-43CB-B03E-0CAE9273F2A2.jpeg`
10. `AGENTS.md`
11. `APP_ARCHITECTURE.md`
12. `AUDITORIA_MAESTRA_V170.md`
13. `AUDITORIA_TARJETAS_IN_OUT_ATRAS_V397.md`
14. `COMPENDIO_FINAL_FUNCIONES_USUARIO.md`
15. `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`
16. `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/DIRECTRICES_MANDATORIAS.md`
17. `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/MATRIZ_GATE_0_PROYECTO.json`
18. `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/MATRIZ_GATE_0_PROYECTO.md`
19. `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/MATRIZ_TECNICA_EDITORIAL_MANUAL.json`
20. `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/MATRIZ_TECNICA_EDITORIAL_MANUAL.md`
21. `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_DID_017_FICHAS_MODALIDADES_PARA_APRENDER.md`
22. `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_LIVE_018_GOLF_SCORE_CARD_GT_LIVE.md`
23. `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_RSG_016_SINCRONIZACION_REGLAS_GOLF.md`
24. `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_UBI_015_DETECCION_CAMPO_POR_GPS.md`
25. `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`
26. `CONTROL_PROYECTO_SCIRE/02_DOCUMENTOS_IMPORTANTES_PENDIENTES_DE_UTILIZAR/INDICE_DOCUMENTOS_PENDIENTES.md`
27. `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/CASOS_TERMINADOS.md`
28. `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V363_PRUEBAS_COMPORTAMIENTO/PRUEBA_COMPORTAMIENTO_V363_RC035.mp4`
29. `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V363_PRUEBAS_COMPORTAMIENTO/PRUEBA_COMPORTAMIENTO_V363_RC035_POSTER.png`
30. `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V363_PRUEBAS_COMPORTAMIENTO/RC035_IMG_2168_LIVE_SAFE_AREA_FAIL.png`
31. `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V363_PRUEBAS_COMPORTAMIENTO/RC035_IMG_2169_MIC_OVERLAYS_FAIL.png`
32. `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V363_PRUEBAS_COMPORTAMIENTO/REPORTE_PRUEBAS_COMPORTAMIENTO_V363_RC035.md`
33. `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V365_RECUPERACION_RONDA_ACTIVA/REPORTE_V365_RC037.md`
34. `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V366_ENTRADA_PRINCIPAL/REPORTE_V366_RC038.md`
35. `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V368_ENTRADA_CANONICA/REPORTE_V368_RC040.md`
36. `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/ACTA_TECNICA_DE_VERIFICACION_Y_CONGELAMIENTO_DE_VERSION_EPG_CADDY.md`
37. `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/ACTA_TECNICA_DE_VERIFICACION_Y_CONGELAMIENTO_DE_VERSION_EPG_CADDY.pdf`
38. `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/BASE_FUNCIONAL_APROBADA_R32.json`
39. `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/EPG_CADDY_R32_TREE_RECUPERABLE.tar.gz`
40. `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/PROCEDIMIENTO_RESTAURACION_Y_ROLLBACK.md`
41. `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/SHA256SUMS.txt`
42. `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/VOZ_FEMENINA_MANDATORIA.lock.json`
43. `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/automatizada/audit-project-r31.log`
44. `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/automatizada/audit-project-r32-full.log`
45. `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/automatizada/vercel-build-r32.log`
46. `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/fisica_usuario/IMG_3371_R29_ACTUALIZADO.jpeg`
47. `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/fisica_usuario/IMG_3372_ACCESO_PROPIETARIO.png`
48. `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/fisica_usuario/IMG_3375_R30_REGISTRO.jpeg`
49. `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/fisica_usuario/IMG_3376_R28_ACTUALIZAR.jpeg`
50. `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/fisica_usuario/IMG_3377_R30_TARJETA_CORTADA.png`
51. `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/fisica_usuario/IMG_3381_PROMOCION_VERCEL.png`
52. `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/fisica_usuario/IMG_3382_R31_ENTRO_ACTUALIZADO.png`
53. `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/fisica_usuario/IMG_3383_R31_MODALIDADES_UNA_COLUMNA.png`
54. `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/fisica_usuario/IMG_3384_MANUAL_VOZ_FEMENINA_09X.png`
55. `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/fisica_usuario/IMG_3385_R31_ANTES_DE_R32.png`
56. `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/fisica_usuario/IMG_3386_R32_ACTUALIZADO_CONSERVA_RONDA.png`
57. `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/fisica_usuario/IMG_3387_R31_ESTADO_VISIBLE_SIN_URL.png`
58. `CONTROL_PROYECTO_SCIRE/04_MATRIZ_DE_CAMPOS/INDICE_TARJETAS_ORIGINALES.md`
59. `CONTROL_PROYECTO_SCIRE/04_MATRIZ_DE_CAMPOS/course-source-registry.json`
60. `CONTROL_PROYECTO_SCIRE/05_MATRIZ_DE_ENLACES/ENLACES_OPERATIVOS.md`
61. `CONTROL_PROYECTO_SCIRE/AUDITORIA_VISUAL_V407/INVENTARIO_PANTALLAS_ESTADOS_V407_R5.md`
62. `CONTROL_PROYECTO_SCIRE/AUDITORIA_VISUAL_V407/MATRIZ_AUDITORIA_VISUAL_V407_R5.md`
63. `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md`
64. `CONTROL_PROYECTO_SCIRE/COORDINACION_V407_R6_UNIVERSALES.md`
65. `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`
66. `CONTROL_PROYECTO_SCIRE/INVENTARIO_DESPLIEGUES_VERCEL.md`
67. `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`
68. `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_INFRAESTRUCTURA.md`
69. `CONTROL_PROYECTO_SCIRE/README.md`
70. `COURSE_DATABASE.md`
71. `DATABASE_ARCHITECTURE.md`
72. `ECOS.md`
73. `EPG-Caddy_Master_Blueprint_v0.1.md`
74. `EPG_CADDY_PLAN_CAMBIOS.md`
75. `GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md`
76. `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`
77. `Intocables/APROBACION_FISICA_REGISTRO_SCORES_V378.json`
78. `Intocables/CONFIRMACION_ESCRITA_V378.md`
79. `Intocables/EVIDENCIA_V378/CONFIRMACION_FISICA_V378_JAIME_KIRSTE.jpeg`
80. `Intocables/MICROFONO_APROBADO.lock.json`
81. `Intocables/README.md`
82. `Intocables/REGLAS_INTOCABLES.json`
83. `Intocables/intocables-gate.mjs`
84. `MANUAL_COBERTURA_FUNCIONAL_V311.md`
85. `MAPA_MATRIZ_BASE_MAESTRA_V256.md`
86. `MAPA_MATRIZ_REGISTRO_JUGADORES_V255.md`
87. `MAPA_MATRIZ_RONDA_PREVIA_V253.md`
88. `MAPA_MATRIZ_STABLEFORD_V252.md`
89. `README.md`
90. `ROADMAP_A_DETALLE.md`
91. `ROADMAP_IMAGES/01_ARCHIVOS_ACTIVOS_COMPLETO.png`
92. `ROADMAP_IMAGES/02_ARCHIVOS_RETIRADOS_COMPLETO.png`
93. `ROADMAP_IMAGES/03_INFRAESTRUCTURA_COMPLETO.png`
94. `ROADMAP_IMAGES/04_RAMAS_GITHUB_COMPLETO.png`
95. `ROADMAP_IMAGES/05_VERCEL_01_A_COMPLETO.png`
96. `ROADMAP_IMAGES/05_VERCEL_01_B_COMPLETO.png`
97. `ROADMAP_IMAGES/06_VERCEL_02_A_COMPLETO.png`
98. `ROADMAP_IMAGES/06_VERCEL_02_B_COMPLETO.png`
99. `ROADMAP_IMAGES/07_VERCEL_03_A_COMPLETO.png`
100. `ROADMAP_IMAGES/07_VERCEL_03_B_COMPLETO.png`
101. `ROADMAP_IMAGES/08_VERCEL_04_A_COMPLETO.png`
102. `ROADMAP_IMAGES/08_VERCEL_04_B_COMPLETO.png`
103. `ROADMAP_IMAGES/README.md`
104. `ROADMAP_IMAGES/ROADMAP_A_DETALLE_01.png`
105. `ROADMAP_IMAGES/ROADMAP_A_DETALLE_02.png`
106. `ROADMAP_IMAGES/ROADMAP_A_DETALLE_03.png`
107. `ROADMAP_IMAGES/ROADMAP_A_DETALLE_04.png`
108. `ROADMAP_IMAGES/ROADMAP_A_DETALLE_05.png`
109. `ROADMAP_IMAGES/ROADMAP_A_DETALLE_06.png`
110. `ROADMAP_IMAGES/ROADMAP_A_DETALLE_07.png`
111. `ROADMAP_IMAGES/ROADMAP_A_DETALLE_08.png`
112. `ROADMAP_IMAGES/ROADMAP_A_DETALLE_09.png`
113. `ROADMAP_OVERALL.md`
114. `ROADMAP_OVERALL_V291.png`
115. `STABLEFORD_TOURNAMENT_PASS_CHECKLIST.md`
116. `access.html`
117. `account-backup.js`
118. `api/_lib/account-auth.js`
119. `api/_lib/app-access.js`
120. `api/_lib/cors.js`
121. `api/_lib/database.js`
122. `api/_lib/http.js`
123. `api/_lib/sync-validation.js`
124. `api/_lib/traffic.js`
125. `api/_lib/vercel-gateway-auth.js`
126. `api/account.js`
127. `api/app-access.js`
128. `api/backup.js`
129. `api/database-health.js`
130. `api/golf-rules.js`
131. `api/live.js`
132. `api/package.json`
133. `api/research.js`
134. `api/score.js`
135. `api/session-grupal.js`
136. `api/session.js`
137. `api/sync.js`
138. `api/traffic.js`
139. `api/universal-ai.js`
140. `api/voice-health.js`
141. `api/voice-speech.js`
142. `api/weather.js`
143. `assets/logo.png`
144. `assets/official-logos/README.md`
145. `assets/official-logos/golf-score-card-gt-app-store-1024.png`
146. `assets/official-logos/golf-score-card-gt-apple-touch-180.png`
147. `assets/official-logos/golf-score-card-gt-apple-touch-v345-180.png`
148. `assets/official-logos/golf-score-card-gt-google-play-512.png`
149. `assets/official-logos/golf-score-card-gt-official-master-1254.jpeg`
150. `assets/official-logos/golf-score-card-gt-pwa-192.png`
151. `assets/official-logos/golf-score-card-gt-pwa-512.png`
152. `assets/official-logos/golf-score-card-gt-pwa-v345-192.png`
153. `assets/official-logos/golf-score-card-gt-pwa-v345-512.png`
154. `audit-project.mjs`
155. `candidate-index-grupal.html`
156. `capacitor.config.json`
157. `card-artifacts.js`
158. `card-file-export.js`
159. `card-library.js`
160. `commerce.js`
161. `database/001_initial_schema.sql`
162. `database/002_player_profiles_and_history.sql`
163. `database/003_master_data_platform.sql`
164. `database/004_live_scorecards.sql`
165. `database/005_live_tournament_mode.sql`
166. `database/test-master-data-platform-schema.mjs`
167. `database/test-player-profile-schema.mjs`
168. `database/test-schema.mjs`
169. `docs/manual/MANUAL_GOLF_SCORE_CARD_GT_IPHONE_01_INICIO_4K.png`
170. `docs/manual/MANUAL_GOLF_SCORE_CARD_GT_IPHONE_02_REGISTRO_4K.png`
171. `docs/manual/v311/Manual_Golf_Score_Card_GT_COMPLETO.pdf`
172. `docs/manual/v311/Manual_de_Funciones_Golf_Score_Card_GT_01-16.pdf`
173. `docs/manual/v311/manual-pages-17-35.json`
174. `docs/manual/v311/manual-pages-bets-live-data.json`
175. `docs/manual/v311/manual-scg-apple-touch-v345-180.png`
176. `docs/manual/v311/manual-scg-escritorio-4k.jpg`
177. `docs/manual/v311/manual-scg-escritorio-4k.png`
178. `docs/manual/v311/manual-scg-pwa-v345-192.png`
179. `docs/manual/v311/manual-scg-pwa-v345-512.png`
180. `docs/manual/v311/page-00.png`
181. `docs/manual/v311/page-01.png`
182. `docs/manual/v311/page-02.png`
183. `docs/manual/v311/page-03.png`
184. `docs/manual/v311/page-04.png`
185. `docs/manual/v311/page-05.png`
186. `docs/manual/v311/page-06.png`
187. `docs/manual/v311/page-07.png`
188. `docs/manual/v311/page-08.png`
189. `docs/manual/v311/page-09.png`
190. `docs/manual/v311/page-10.png`
191. `docs/manual/v311/page-11.png`
192. `docs/manual/v311/page-12.png`
193. `docs/manual/v311/page-13.png`
194. `docs/manual/v311/page-14.png`
195. `docs/manual/v311/page-15.png`
196. `docs/manual/v311/page-16.png`
197. `docs/manual/v311/page-17.png`
198. `docs/manual/v311/page-18.png`
199. `docs/manual/v311/page-19.png`
200. `docs/manual/v311/page-20.png`
201. `docs/manual/v311/page-21.png`
202. `docs/manual/v311/page-22.png`
203. `docs/manual/v311/page-23.png`
204. `docs/manual/v311/page-24.png`
205. `docs/manual/v311/page-25.png`
206. `docs/manual/v311/page-26.png`
207. `docs/manual/v311/page-27.png`
208. `docs/manual/v311/page-28.png`
209. `docs/manual/v311/page-29.png`
210. `docs/manual/v311/page-30.png`
211. `docs/manual/v311/page-31.png`
212. `docs/manual/v311/page-32.png`
213. `docs/manual/v311/page-33.png`
214. `docs/manual/v311/page-34.png`
215. `docs/manual/v311/page-35.png`
216. `docs/manual/v311/page-36.png`
217. `docs/manual/v311/page-37.png`
218. `docs/manual/v311/page-38.png`
219. `docs/manual/v311/page-39.png`
220. `docs/manual/v311/page-40.png`
221. `docs/manual/v311/page-41.png`
222. `docs/manual/v311/page-42.png`
223. `docs/manual/v311/page-43.png`
224. `docs/manual/v311/page-44.png`
225. `docs/manual/v311/page-45.png`
226. `docs/manual/v311/page-46.png`
227. `docs/manual/v311/page-47.png`
228. `docs/manual/v311/page-48.png`
229. `docs/manual/v311/page-49.png`
230. `docs/manual/v311/page-50.png`
231. `docs/manual/v311/page-51.png`
232. `docs/manual/v311/page-52.png`
233. `docs/manual/v311/page-53.png`
234. `docs/manual/v311/page-54.png`
235. `docs/manual/v311/page-55.png`
236. `docs/manual/v311/page-56.png`
237. `docs/manual/v311/page-57.png`
238. `docs/manual/v311/page-58.png`
239. `docs/manual/v311/page-59.png`
240. `docs/manual/v311/page-60.png`
241. `docs/manual/v311/page-61.png`
242. `docs/manual/v311/page-62.png`
243. `docs/manual/v311/page-63.png`
244. `docs/manual/v311/page-64.png`
245. `docs/manual/v311/page-65.png`
246. `docs/manual/v311/page-66.png`
247. `docs/manual/v311/page-67.png`
248. `docs/manual/v311/page-68.png`
249. `docs/manual/v311/page-69.png`
250. `docs/manual/v311/page-70.png`
251. `docs/manual/v311/page-71.png`
252. `docs/manual/v311/page-72.png`
253. `docs/manual/v311/page-73.png`
254. `dots.js`
255. `four-ball.js`
256. `golf-rules-offline.js`
257. `gsc-design-system.css`
258. `guest-access.js`
259. `historical-analytics.js`
260. `index-grupal.html`
261. `index.html`
262. `ios/EPGCaddy/App.swift`
263. `ios/EPGCaddy/ContentView.swift`
264. `ios/EPGCaddy/Models/GolfCourse.swift`
265. `ios/EPGCaddy/Models/Round.swift`
266. `ios/EPGCaddy/WebView.swift`
267. `ios/project.yml`
268. `live-control.js`
269. `live-hub.html`
270. `live-hub.js`
271. `live-view.js`
272. `live.html`
273. `manifest.webmanifest`
274. `manual-search.js`
275. `manual.html`
276. `manual.webmanifest`
277. `master-data-sync.js`
278. `match-play.js`
279. `middleware.js`
280. `mobile-release.json`
281. `mobile/native-runtime-entry.js`
282. `package.json`
283. `player-registry.js`
284. `previews/whatsapp-cards-v406-r24/01_RONDA_NORMAL.html`
285. `previews/whatsapp-cards-v406-r24/02_STABLEFORD.html`
286. `previews/whatsapp-cards-v406-r24/03_MATCH_PLAY.html`
287. `previews/whatsapp-cards-v406-r24/04_FOUR_BALL.html`
288. `previews/whatsapp-cards-v406-r24/05_SCORE_CARD_PRACTICA.html`
289. `previews/whatsapp-cards-v406-r24/06_SKINS.html`
290. `previews/whatsapp-cards-v406-r24/07_WOLF.html`
291. `previews/whatsapp-cards-v406-r24/08_VEGAS.html`
292. `previews/whatsapp-cards-v406-r24/09_DOTS.html`
293. `previews/whatsapp-cards-v406-r24/10_TORNEO_LIVE.html`
294. `previews/whatsapp-cards-v406-r24/index.html`
295. `round-closure.js`
296. `round-navigation.js`
297. `scripts/build-mobile-web.mjs`
298. `scripts/card-audit-fixtures.mjs`
299. `scripts/configure-native-projects.mjs`
300. `scripts/generate-technical-act-r32.py`
301. `scripts/inventory-gate.mjs`
302. `scripts/lab-update-browser-review.mjs`
303. `scripts/lab-update-physical-gate.mjs`
304. `scripts/manual-editorial-qc.py`
305. `scripts/manual-layout-normalize.py`
306. `scripts/manual-visual-qc.py`
307. `scripts/prepare-mobile-assets.mjs`
308. `scripts/prepare-native-release.mjs`
309. `scripts/project-quality-gate.mjs`
310. `scripts/publish-manual-pages.py`
311. `scripts/rebuild-inventory-pdfs.py`
312. `scripts/rebuild-manual-bets-live-data.py`
313. `scripts/rebuild-manual-pdf-from-pages.py`
314. `scripts/roadmap-gate.mjs`
315. `scripts/update-inventory-v328.py`
316. `scripts/update-manual-page-73.py`
317. `scripts/v363-silent-speech-recognition.js`
318. `service-worker.js`
319. `skins.js`
320. `stableford-countryclub-emergency.html`
321. `stableford-course-source-mayan-golf.md`
322. `stableford-course-source-san-isidro.md`
323. `stableford-torneo.html`
324. `stableford.js`
325. `sync-queue.js`
326. `test-card-artifacts.mjs`
327. `test-country-club-official.mjs`
328. `test-course-catalog.mjs`
329. `test-historical-analytics.mjs`
330. `test-lab-continuity-master.mjs`
331. `test-master-data-sync.mjs`
332. `test-no-automatic-x.mjs`
333. `test-player-registry.js`
334. `test-project-control-matrix.mjs`
335. `test-project-quality-gate.mjs`
336. `test-r18-owner-guest-24h-access.mjs`
337. `test-round-clock.mjs`
338. `test-round-closure.mjs`
339. `test-round-information.mjs`
340. `test-score-engine.mjs`
341. `test-stableford-clean-roster-history.mjs`
342. `test-stableford-manual.mjs`
343. `test-stableford-torneo.mjs`
344. `test-stableford-ui.mjs`
345. `test-stableford.mjs`
346. `test-sync-api.mjs`
347. `test-sync-auth.mjs`
348. `test-sync-queue.mjs`
349. `test-v193-visual-provisional.mjs`
350. `test-v250-stableford-delivery-matrix.mjs`
351. `test-v252-stableford-persistence-category-course.mjs`
352. `test-v253-live-previous-round.mjs`
353. `test-v254-remove-registration-guide.mjs`
354. `test-v255-player-registration-boxes-codes.mjs`
355. `test-v256-master-data-platform.mjs`
356. `test-v257-stableford-course-selector-title.mjs`
357. `test-v258-stableford-readonly-manual-plan-b.mjs`
358. `test-v259-stableford-hide-unused-player-rows.mjs`
359. `test-v260-round-points-player-return.mjs`
360. `test-v261-registration-stableford-modality.mjs`
361. `test-v262-provisional-optional-profile.mjs`
362. `test-v263-compact-players-back-button.mjs`
363. `test-v264-previous-round-responsive-names.mjs`
364. `test-v265-first-nine-automatic-result.mjs`
365. `test-v266-stableford-segment-gross-points.mjs`
366. `test-v267-one-operational-line.mjs`
367. `test-v267-scorecard-combination-matrix.mjs`
368. `test-v268-control-manual-demo-link.mjs`
369. `test-v269-operational-matrix-demo.mjs`
370. `test-v270-consecutive-hole-voice-blocks.mjs`
371. `test-v271-realtime-prompt-limit.mjs`
372. `test-v272-definitive-operational-release.mjs`
373. `test-v273-san-isidro-alta-vista.mjs`
374. `test-v274-complete-courses-voice-operations.mjs`
375. `test-v275-stable-live-voice-turns.mjs`
376. `test-v276-manual-hole-navigation.mjs`
377. `test-v277-official-round-corrections.mjs`
378. `test-v278-card-image-pdf-export.mjs`
379. `test-v279-local-card-library.mjs`
380. `test-v280-local-history-insights.mjs`
381. `test-v281-pwa-installation.mjs`
382. `test-v282-optional-account-backup.mjs`
383. `test-v283-native-commercial-readiness.mjs`
384. `test-v284-native-package-generation.mjs`
385. `test-v285-stableford-back-navigation.mjs`
386. `test-v286-stableford-back-restores-home.mjs`
387. `test-v287-stableford-back-controls-clear.mjs`
388. `test-v288-stableford-one-touch-home.mjs`
389. `test-v289-stableford-new-round-empty.mjs`
390. `test-v290-brand-icons-cleanup.mjs`
391. `test-v304-homogeneous-registration-actions.mjs`
392. `test-v305-history-navigation-zero-error.mjs`
393. `test-v305-registration-guides-parser-truth.mjs`
394. `test-v306-match-play.mjs`
395. `test-v307-match-arrows-format.mjs`
396. `test-v309-four-ball.mjs`
397. `test-v311-live-support-link.mjs`
398. `test-v311-manual-hosting.mjs`
399. `test-v311-manual-search.mjs`
400. `test-v311-manual-semantic-coverage.mjs`
401. `test-v311-manual-voice-map.mjs`
402. `test-v311-neutral-match-home-link.mjs`
403. `test-v311-timer-inactivity.mjs`
404. `test-v311-voice-assistant.mjs`
405. `test-v312-general-caddie.mjs`
406. `test-v320-universal-100-domains.mjs`
407. `test-v321-ai-universal-infinity.mjs`
408. `test-v322-real-sustained-caddie.mjs`
409. `test-v323-long-multitopic-context.mjs`
410. `test-v324-real-traffic.mjs`
411. `test-v325-ideal-microphone-timings.mjs`
412. `test-v326-no-silent-conversation.mjs`
413. `test-v327-tool-followup-no-silence.mjs`
414. `test-v328-live-official-rules.mjs`
415. `test-v328-official-golf-rules.mjs`
416. `test-v328-offline-official-rules.mjs`
417. `test-v329-skins.mjs`
418. `test-v330-side-games.mjs`
419. `test-v335-response-caliber.mjs`
420. `test-v336-microphone-transport.mjs`
421. `test-v337-universal-weather.mjs`
422. `test-v345-home-icons.mjs`
423. `test-v352-live.mjs`
424. `test-v353-live-hub.mjs`
425. `test-v354-voice-fallback.mjs`
426. `test-v355-ios-audio-dictation.mjs`
427. `test-v356-traffic-weather-accuracy.mjs`
428. `test-v356-voice-only-cedar-quality.mjs`
429. `test-v357-ios-voice-transport-recovery.mjs`
430. `test-v357-synchronized-progressive-voice.mjs`
431. `test-v358-active-round-reopen.mjs`
432. `test-v358-ios-score-universal-physical-recovery.mjs`
433. `test-v359-ios-score-parser-recovery.mjs`
434. `test-v361-synchronized-voice.mjs`
435. `test-v362-physical-voice-recovery.mjs`
436. `test-v363-intocables-behavior.mjs`
437. `test-v363-recorded-mobile-behavior.mjs`
438. `test-v364-explicit-new-round-entry.mjs`
439. `test-v364-vercel-oidc-recovery.mjs`
440. `test-v365-active-round-empty-recovery.mjs`
441. `test-v366-principal-entry-recovery.mjs`
442. `test-v367-universal-voice-in-place.mjs`
443. `test-v368-canonical-home-entry.mjs`
444. `test-v397-card-in-out-back-contract.mjs`
445. `test-v398-history-long-press-delete.mjs`
446. `test-v398-manual-opening-hole.mjs`
447. `test-v405-registration-clear-final-mobile.mjs`
448. `test-v406-r2-professional-design.mjs`
449. `test-v406-r22-public-brand.mjs`
450. `test-v406-r22-share-live.mjs`
451. `test-v406-r23-turn-closure-audio.mjs`
452. `test-v406-r23-visible-version.mjs`
453. `test-v406-r4-mobile-controls.mjs`
454. `test-v406-r5-simple-tournament-live.mjs`
455. `test-v406-tournament-categories.mjs`
456. `test-v407-r1-premium-visual-system.mjs`
457. `test-v407-r24-update-physical-gate.mjs`
458. `test-v407-r24b-history-update-isolation.mjs`
459. `test-v407-r24c-public-pwa-bootstrap.mjs`
460. `test-v407-r24c-update-scroll-isolation.mjs`
461. `test-v407-r25-round-controls.mjs`
462. `test-v407-r29-live-handicap-row.mjs`
463. `test-v407-r30-green-outline-controls.mjs`
464. `test-v407-r30-history-transitions.mjs`
465. `test-v407-r31-mobile-card-scroll.mjs`
466. `test-v407-r32-owner-only-update.mjs`
467. `test-v407-r32-two-column-modalities.mjs`
468. `test-v407-r5-visual-inventory.mjs`
469. `test-v407-r5a-history-visual-system.mjs`
470. `test-v407-r6-universales-coordination.mjs`
471. `test-v407-r6-universales.mjs`
472. `test-v407-r7-ios-scroll.mjs`
473. `test-v407-r9-manual-update.mjs`
474. `test-voice-continuity.mjs`
475. `timer-inactivity.js`
476. `universales.js`
477. `vegas.js`
478. `vercel.json`
479. `vercel.legacy-mirror.json`
480. `verify-manual-sync.mjs`
481. `voice-assistant.js`
482. `wolf.js`

## DECLARACIÓN FINAL OBLIGATORIA

- Total de elementos inventariados en la matriz: 50.
- Total probado: 39.
- PASS: 35.
- FAIL: 4.
- BLOQUEADOS: 1.
- NO PROBADOS: 10.
- Porcentaje real de cobertura de la matriz: 78.0 %.
- Versión congelada integral: NINGUNA; sólo quedan congelados los elementos individuales en PASS.
- Base técnica examinada: V407-R32.
- Commit verificado: `a4b1cec9e1380d8a5b72080477cad97080ab0cce`.
- Deployment verificado: `dpl_G97hXzJbV9duYHLn8SGREJWRgUHq` - READY - https://golf-sc-gt-dypjyc3wg-epgcaddys-projects.vercel.app.
- Pendientes reales: los ocho puntos expresos de la sección Limitaciones y pendientes reales.
- Estado de Producción: intacta en R28, `7816978be8aa23aba20f4c066fce30f6287ff134`.
- Responsable técnico de ejecución: OpenAI Codex, agente técnico automatizado.
- Propietario/aprobador final: Jaime Kirste.
- Fecha y hora de cierre: 10/09/2026 06:23:04 Guatemala.

Las huellas SHA-256 del acta, paquete, evidencias y artefactos principales se almacenan en `SHA256SUMS.txt`. Cualquier modificación exige una nueva versión de acta y nueva trazabilidad.
