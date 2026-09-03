Warning: truncated output (original token count: 55153)
Total output lines: 1946

# ROADMAP A DETALLE

## Registro técnico V370-R1 · recuperación de voz española en Safari iOS

| Archivo | Cambio limitado | Verificación |
|---|---|---|
| `index-grupal.html` | Cedar 0.90 primero; respaldo `es-*` sin filtro masculino excluyente; idioma `es-MX`. | Nunca usar una voz inglesa ni dejar la respuesta muda porque iOS no publique género. |
| `service-worker.js` | Caché `v370-r1-ios-spanish-voice`. | El iPhone recibe el shell corregido. |
| `test-v370-native-spanish-fast-close.mjs` | Fija prioridad Cedar, español y respaldo Safari. | Regresión junto con V358, V362 y V369. |

Producción permanece intacta. La dicción física final sólo puede aprobarse en el iPhone del propietario.

## Registro técnico V332 · moneda dual y matriz común de información

El propietario amplía `PEND-SKI-006`: todos los juegos nuevos deben ofrecer dos casillas excluyentes, `Q · QUETZALES` y `$ · DÓLARES`, guardar la selección y usarla sin conversiones ni mezclas en todo resultado. También exige una arquitectura de información completa y comprensible para quien desconoce las apuestas de golf.

| Archivo exacto | Control V332 | Resultado exigido |
|---|---|---|
| `skins.js` | `CURRENCY / ACCUMULATION / SETTLEMENT` | Conserva GTQ/USD y calcula hoyos, Skins, carry, dinero movido, neto a liquidar, líder y mayor pozo. |
| `wolf.js` | `CURRENCY / RISK / ACCUMULATION` | Conserva GTQ/USD y calcula estado, pendientes, carry, exposición, dinero movido, neto, líder y liquidación por diferencia. |
| `vegas.js` | `CURRENCY / POINT MATRIX / DUEL RISK` | Conserva GTQ/USD y calcula hoyos, duelos, volteos, puntos, dinero, neto, líder, mayor cambio y exposición máxima por duelo. |
| `dots.js` | `CURRENCY / EVENT MATRIX / POINT IMPACT` | Conserva GTQ/USD y calcula hoyos resueltos/pendientes, eventos, puntos positivos/negativos, dinero, neto, líder e impacto de un punto por jugador. |
| `index-grupal.html` | `V332-DUAL-CURRENCY-MATRIX-20260826` | Ocho radios —dos por juego—, sólo una moneda marcada por juego, símbolos dinámicos y matriz común en vivo. |
| `card-artifacts.js` | `AUDITABLE SIDE-GAME MATRIX` | Global y personales conservan moneda, acumulados, riesgo, saldos y pago exacto. |
| `test-v329-skins.mjs`, `test-v330-side-games.mjs` | `DUAL CURRENCY / COMMON MATRIX REGRESSION` | Comprueban exclusividad, símbolos, métricas, cero-suma, cierre, corrección, Historial, nube y restauración. |
| `service-worker.js` | `gscg-mobile-v332-dual-currency-matrix` | Obliga al iPhone a cargar el shell nuevo. |
| Documentación e inventarios | `HONEST STATUS / DIGEST` | Registran PASS de 89 paquetes, 325 fuentes y tres PDF sellados; conservan Producción intacta hasta Preview y PASS físico. |

La matriz común visible se define así: acuerdos previos; moneda y unidad; estado actual; hoyos resueltos y pendientes; acumulado de puntos/unidades; dinero bruto movido; saldo neto por jugador o pareja; líder/empate; riesgo propio del juego; neto a liquidar; y transferencias exactas. Ninguna cifra económica escribe scores. El banco integral V332 terminó con 89 paquetes PASS, 325 fuentes y tres inventarios sellados; queda pendiente la publicación Preview y la prueba física.

## Registro PEND-DID-017 · fichas didácticas por modalidad

El propietario solicita una hoja por cada modalidad y por cada esquema que cambie el resultado, explicada con claridad suficiente para un niño de 10 años y utilizable en blanco y negro. El pendiente abarca Ronda Normal, Stableford, Match Play, Four Ball, Práctica, Skins, Wolf, Vegas, Dots y hojas complementarias para empates, decisiones, volteos y eventos configurables.

| Control obligatorio | Resultado exigido |
|---|---|
| Lenguaje de 10 años | Frases cortas, glosario español y ningún término inglés sin explicar. |
| Blanco y negro real | Texto, bordes, patrones e iconos; ningún estado o ganador depende sólo del color. |
| Ejemplo auditable | Scores, operación, acumulado anterior/nuevo y liquidación coinciden con el motor. |
| Aprendizaje y estrategia | Explica qué acordar, qué registrar, cómo leer el estado, cómo jugar mejor y qué errores evitar. |
| Dinero general y opcional | Todas las hojas muestran Q/$, unidad, multiplicador, tope y liquidación; cada grupo decide si liquida dinero o juega sólo con puntos/unidades. |
| Versionado | Cada hoja declara fuente, variante universal/configurable/de grupo y versión del motor compatible. |

Archivo rector: `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_DID_017_FICHAS_MODALIDADES_PARA_APRENDER.md`. El trabajo se ejecutará después de validar físicamente las modalidades V332; no interrumpe la prueba activa ni modifica Producción.

## Registro técnico V331 · matriz investigada de apuestas

La evidencia física `IMG_1960.png` aprueba V330-R3: sólo `WOLF` permanece verde y `RONDA NORMAL` queda desmarcada. V331 continúa el mismo pendiente y reemplaza controles ambiguos por reglas, estados, métricas y liquidaciones explicables en español. Las variantes que las fuentes describen de forma distinta nunca se presentan como universales.

| Archivo exacto | Control V331 | Resultado exigido |
|---|---|---|
| `wolf.js` | `PARTNER / LONE / BLIND / RISK / CAP / METRICS` | Migra `solo` legado a Lobo solitario; configura Wolf primero/último, multiplicadores y tope; calcula exposición por rival, unidades ganadas/perdidas, acumulado, dinero movido y pago por diferencia. |
| `vegas.js` | `PAIR NUMBER / 10+ / BOTH BIRDIES / LIVE METRICS` | 4+5→45; 10+4→104; ambos birdies cancelan el volteo por defecto o voltean ambos como regla del grupo; cada duelo conserva diferencia, tope, águila, puntos y cero-suma. |
| `dots.js` | `PLAIN SPANISH / POSITIVE-NEGATIVE / AUTO-MANUAL` | Sandy, Greenie, Chippie, Poley, Barkie, Arnie, Ferret y Snake incluyen definición; Ferret/Amigo/izquierda/derecha empiezan apagados; el resultado separa premios, penalizaciones y eventos por hoyo. |
| `index-grupal.html` | `V331-RESEARCHED-SIDE-GAMES-20260826 / LIVE CONTROL` | Configuración previa comprensible, estados por hoyo, riesgos, acumulados, métricas, detalle de cálculos y liquidación; la tarjeta deportiva permanece intacta. |
| `card-artifacts.js` | `WOLF AUDIT PANEL` | Tarjeta final conserva acuerdos, unidades netas, acumulados, dinero movido y quién paga a quién. |
| `test-v330-side-games.mjs` | `RESEARCH MATRIX REGRESSION` | Cubre migración, exposición, tope Wolf, dos políticas de birdies Vegas, score 10+, métricas Dots y selección visual única. |
| `service-worker.js` | `gscg-mobile-v331-researched-side-games` | Obliga al iPhone a sustituir la copia V330-R3. |
| `scripts/update-inventory-v328.py` | `V331 INVENTORY COVER` | Regenera las tres portadas con matriz investigada, PASS físico R3 y prueba completa todavía pendiente. |
| `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` | `HONEST STATUS / DIGEST` | Registran el PASS físico R3, el alcance V331 y las pruebas físicas todavía pendientes. |

Fuentes consultadas: 18Birdies documenta Wolf por mejor bola, punto por unidad, Lobo solitario/ciego y pagos por diferencia; Wolf Golf Scorecard confirma Wolf primero/último, carry, multiplicadores y liquidación; Mashie, 18Birdies y Golf Digest documentan la formación del número Vegas, volteos, scores de dos dígitos y topes; 18Birdies, MyScorecard y SCGA describen Dots/Junk como eventos acordados antes de salir. La aplicación conserva las adaptaciones de 3, 5 o 6 jugadores y tres parejas claramente rotuladas como propias de Golf Score Card GT.

## Registro técnico V330 · juegos laterales y tres parejas

**Hotfix V330-R3 · selección única después de rechazo físico:** la captura real de iPhone mostró simultáneamente verdes `RONDA NORMAL` y `WOLF`; V330-R2 queda rechazada. `enforceExclusiveDraftGame()` elimina estados laterales múltiples heredados y `syncDraftModeSelection()` se convierte en el único escritor de las siete opciones. `selectSideGameRoundMode()` sincroniza antes de renderizar y `renderSideGameDrafts()` vuelve a sincronizar al terminar. `test-v330-side-games.mjs` ejecuta el caso WOLF y exige seis `aria-pressed=false` y sólo WOLF en `true`. `index-grupal.html` identifica `V330-R3-PHYSICAL-SINGLE-MODE-20260826` y `service-worker.js` fuerza `gscg-mobile-v330-side-games-r3`.

**Registro PEND-VOZ-003 pospuesto:** la observación física nueva queda documentada en `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md` y `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`: respuestas generales demasiado vagas sin una petición adicional, corte del ciclo en la quinta conversación y necesidad de estados exactos `ESCUCHANDO` / `RESPONDIENDO` en rojo parpadeante. No existe cambio funcional de voz en este corte; el trabajo activo regresa a las modalidades nuevas.

**Registro de pendientes nuevos:** `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_UBI_015_DETECCION_CAMPO_POR_GPS.md` documenta catálogo geográfico, perímetros, propuesta y confirmación del campo; `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_RSG_016_SINCRONIZACION_REGLAS_GOLF.md` documenta fuente oficial, manifiesto, SHA-256, caché, actualización y reversión. `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md` y `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` incorporan ambos IDs sin duplicar `PEND-GPS-010` ni `PEND-REG-001`.

| Archivo exacto | Control V330 | Resultado comprobado |
|---|---|---|
| `skins.js` | `2–6 / GROSS-NET / CARRY-SPLIT-VOID / ZERO-SUM` | Ganador o empate por hoyo, bolsa, carry final, X y saldo económico separado. |
| `wolf.js` | `3–6 / ROTATION / PARTNER-SOLO-LONE-BLIND / CLOSE GUARD` | Decisión por hoyo, multiplicadores ×1/×2/×3, cobro cruzado, empate y bloqueo de cierre si falta una decisión. |
| `vegas.js` | `4 OR 6 / 2 OR 3 PAIRS / CAP / ZERO-SUM` | Número menor por pareja, comparaciones par a par, empate, volteo, águila y tope. |
| `dots.js` | `2–6 / ENABLED EVENTS / CUSTOM VALUES` | Eventos clásicos configurables y reglas Amigo/izquierda/derecha apagadas por defecto. |
| `match-play.js`, `four-ball.js` | `GREEN 1–2 / GOLD 3–4 / BLUE 5–6` | Tres parejas completas; Match independiente y Four Ball por mejor Neto. |
| `index-grupal.html` | `TWO-COLUMN SETUP / MAIN CARD UNCHANGED / VOICE` | Existentes a la izquierda, nuevos a la derecha, moneda, reglas, resultados y controles; sin rediseñar la tarjeta principal. |
| `round-closure.js` | `SIDE GAMES SNAPSHOT / SHA-256 / CORRECTION` | Cierre auditable, Wolf completo obligatorio y recálculo versionado. |
| `card-artifacts.js`, `card-library.js`, `historical-analytics.js` | `GLOBAL / PERSONAL / SEARCH / HISTORY` | Configuración, ganadores, empates y saldos visibles y consultables. |
| `master-data-sync.js`, `account-backup.js` | `CLOUD / RESTORE` | El snapshot de juegos sobrevive sincronización y restauración. |
| `service-worker.js`, `scripts/build-mobile-web.mjs`, `vercel.json` | `CACHE V330 / MOBILE ASSETS / NO-STORE MODULES` | Los cuatro motores viajan en la copia instalable y no quedan congelados por caché anterior. |
| `test-v329-skins.mjs`, `test-v330-side-games.mjs` | `ENGINE + E2E + UI + PERSISTENCE` | Regla, empate, X, tope, cero-suma, cierre, corrección, artefactos, historial, nube, restauración y voz aprobados localmente. |
| `audit-project.mjs` | `89 PACKAGES + LIVE VERCEL GATE` | Regresión local completa y build Preview aprobados; la puerta real confirmó modelo, búsqueda web, seis fuentes oficiales y `scoreChanged:false`. |

Estado honesto: el Preview `dpl_4k5V9rFwkVXVwuRwktBjtgG4arAv` quedó `READY` desde `ea18aafb214731d44b41ea069fe27228407f9f47`; 89 paquetes, 322 fuentes, tres inventarios y la puerta viva aprobaron. La protección de acceso de Vercel impidió la inspección visual automática externa; revisión visual/táctil y prueba física de iPhone siguen abiertas antes de cualquier montaje en Producción.

## Registro técnico V328-R2 · Reglas oficiales y respaldo básico sin conexión

El centro reglamentario reutiliza panel, conversación temporal, micrófono bilateral, síntesis, fuentes y contexto de la aplicación. `api/golf-rules.js` obliga a investigar en USGA/The R&A, filtra de nuevo las fuentes recibidas y falla si no existe autoridad oficial. La tarjeta entrega únicamente campo y modalidad; no expone coordenadas, nombres ni scores. El modo REGLAS evita deliberadamente `routeAiUniversalAppText`, por lo que una consulta no puede convertirse en escritura. El Preview V328-R1 quedó `READY` con árbol remoto `f0de0f6328c34ed2788faf1009ba04a19f47e6c1` después de aprobar 86 paquetes y la consulta oficial real. V328-R2 añade respaldo local de respuestas oficiales ya confirmadas, sin convertirlo en una base cerrada de reglas ni simular AI.

| Archivo exacto | Control V328 | Resultado comprobado |
|---|---|---|
| `api/golf-rules.js` | `OFFICIAL_RULE_DOMAINS / tool_choice required / scoreChanged false` | Modelo real GPT-5.6, Web limitada a `usga.org` y `randa.org`, fuentes oficiales obligatorias, edición 2023, clarificaciones vigentes y cero escritura. |
| `index-grupal.html` | `REGLAS / get_official_golf_rule / RULES MODE ISOLATION` | Acceso global, texto, voz, controles bilaterales, fuentes visibles, contexto de modalidad y bypass de órdenes locales. |
| `test-v328-official-golf-rules.mjs` | `15 RULE SCENARIOS / 2 DOMAINS / 0 SCORE WRITES` | Fuera de límites, provisional, penalidad, alivios, Match Play, Four-Ball, Stableford, Comité y Regla Local. |
| `test-v328-live-official-rules.mjs` | `REAL MODEL / REAL WEB / OFFICIAL SOURCE / 0 SCORE WRITES` | Ejecuta el handler real dentro de Vercel con la credencial Preview; bloquea el build si falta respuesta, autoridad USGA/The R&A o aislamiento de score. |
| `golf-rules-offline.js` | `24 ENTRIES / 90 DAYS / TOKEN MATCH / SAME MODE` | Conserva sólo respuestas previamente confirmadas con fuente oficial; no guarda la pregunta completa, no llama servicios externos y no escribe scores. |
| `test-v328-offline-official-rules.mjs` | `OFFICIAL CACHE / PRIVACY / EXPIRY / NEGATIVE MATCH / 0 SCORE WRITES` | Prueba límites, caducidad, modalidad, coincidencias débiles, PWA y rechazo de fuentes o cambios no autorizados. |
| `vercel.json` | `AUDIT 87 + LIVE RULE GATE` | Obliga regresión completa y consulta oficial real antes de entregar cada Preview V328-R2. |
| `manual.html`, `docs/manual/v311/manual-pages-17-35.json`, `scripts/update-manual-page-73.py`, `docs/manual/v311/page-73.png` | `MANUAL PAGE 73 V328` | Explicación sencilla para elegir canal, describir, verificar fuente y conservar la tarjeta. |
| `docs/manual/v311/Manual_Golf_Score_Card_GT_COMPLETO.pdf`, `docs/manual/v311/Manual_de_Funciones_Golf_Score_Card_GT_01-16.pdf` | `74 PAGES / 4K / 300 DPI` | PDF completo y alias estable regenerados; extracción y control visual aprobados. |
| `service-worker.js` | `gscg-mobile-v328-official-golf-rules-offline-r2` | Instala el módulo de respaldo y fuerza sustitución de la copia anterior. |
| `scripts/update-inventory-v328.py` | `3 INVENTORY COVERS / OFFLINE DELIVERED / IDEMPOTENT` | Actualiza la portada V328-R2 de los tres inventarios sin duplicarla al repetir el proceso. |
| `audit-project.mjs` | `87 PACKAGES` | Agrega los paquetes reglamentarios conectado y sin conexión a la regresión maestra. |
| `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | `PEND-REG-001 V328-R2` | Distinguen modo offline entregado de voz física y eventual licencia comercial todavía pendientes. |

Todos los archivos tocados por la firma/caché V328 quedan registrados aquí para el candado: `test-v327-tool-followup-no-silence.mjs`, `test-v326-no-silent-conversation.mjs`, `test-v325-ideal-microphone-timings.mjs`, `test-v324-real-traffic.mjs`, `test-v323-long-multitopic-context.mjs`, `test-v322-real-sustained-caddie.mjs`, `test-v321-ai-universal-infinity.mjs`, `test-v312-general-caddie.mjs`, `test-v307-match-arrows-format.mjs`, `test-v305-history-navigation-zero-error.mjs`, `test-v304-homogeneous-registration-actions.mjs`, `test-v290-brand-icons-cleanup.mjs`, `test-v284-native-package-generation.mjs`, `test-v281-pwa-installation.mjs`, `test-v280-local-history-insights.mjs`, `test-v279-local-card-library.mjs`, `test-v278-card-image-pdf-export.mjs`, `test-v277-official-round-corrections.mjs`, `test-v276-manual-hole-navigation.mjs`, `test-v275-stable-live-voice-turns.mjs`, `test-v274-complete-courses-voice-operations.mjs`, `test-v272-definitive-operational-release.mjs` y `test-stableford-ui.mjs`. También se actualizan `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`; los tres inventarios PDF externos se regeneran antes de validar.

## Registro detallado V327-R1-PEND · pendientes completos, inventarios y ejecución autónoma

El propietario dispone el **26 de agosto de 2026** que la cola se adapte completa y que el trabajo continúe sin autorizaciones intermedias: cada pendiente se diseña dentro de la arquitectura única, se implementa, se prueba en automático y en su dispositivo físico, se despliega en Preview y sólo se monta después de PASS íntegro. Una dependencia externa real se registra como bloqueo; no se falsifica una licencia, credencial, cuenta, contrato ni dato oficial.

| Archivo o artefacto exacto | Control actualizado | Resultado exigido |
|---|---|---|
| `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/DIRECTRICES_MANDATORIAS.md` | `AUTORIZACIÓN PERMANENTE / REGLAS 22–26 / FAIL BLOQUEA` | Elimina autorizaciones intermedias, prohíbe trasladar trabajo técnico, exige siguiente acción inequívoca, impide simular trabajo en segundo plano y conserva Producción intacta ante cualquier falla. |
| `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md` | `PEND-REG-001` a `PEND-QA-014` | Reúne voz, tráfico, reglas, handicap, campos, GPS, juegos/apuestas, relojes, nube, estadísticas, monetización, QA, clima y Guía Rápida. |
| `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md` | `CORTE V327-R1 / 24 BLOQUES` | Separa funciones entregadas, fases parciales, bloqueos externos y condiciones reales de cierre. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | `MAPA V327-R1-PEND` | Permite localizar la autorización y los catorce identificadores oficiales sin revisar conversaciones antiguas. |
| `Inventario_Golf_Score_Card_GT_OVERALL_V311.pdf`, `Inventario_Golf_Score_Card_GT_A_DETALLE_V311.pdf`, `Inventario_Golf_Score_Card_GT_POR_IMAGENES_Y_RUBROS_V311.pdf` | `PORTADA V327-R1-PEND` | Los tres inventarios PDF abren con estado, cola maestra, directriz de ejecución y puerta física pendiente. |
| `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` | `DIGEST + 3 PDF` | Sella fuentes, tamaños y SHA-256 nuevos después de renderizar e inspeccionar los inventarios. |
| `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` | `REGISTRO DOBLE` | Satisfacen el candado mandatorio activado el 23 de agosto de 2026, 17:05:00, hora de Guatemala, después de la línea 185. |

V327-R1 conserva 44 llamadas reales desplegadas, 24 áreas, ocho turnos con memoria, 550 secuencias de voz, tráfico exacto/futuro, clima, investigación y cero 5xx. La prueba física larga en iPhone sigue siendo la puerta inmediata; no se abre otra implementación funcional ni se monta Producción antes de cerrarla.

## Registro detallado V327 · continuidad real después de tráfico e investigación web

La prueba física de V326-R2 quedó rechazada. Después de unas seis preguntas, el usuario recibió silencios con el micrófono rojo: una consulta sobre una persona conocida en Colima sí terminó en `/api/research` con HTTP 200 y Google Routes también estaba operativo, pero el cliente no terminó la segunda respuesta hablada. La evidencia demuestra una falla de estados WebRTC y no una lista angosta de vocabulario.

| Archivo exacto | Control V327 | Resultado exigido |
|---|---|---|
| `index-grupal.html` | `TRANSCRIPTION UNTIL FINAL / FOLLOWUP AUDIO START / PLAYBACK 60S` | `speech_stopped` no cancela la vigilancia; un cierre tardío sin `response_id` se atribuye a la respuesta fuente hasta que empiece el audio final; generación y reproducción tienen recuperación independiente; el canal perdido nunca retorna en silencio. |
| `api/voice-health.js` | `ALLOWLIST / NO CONTENT / 202` | Conserva sólo etapa, build, contexto, número de turno, duración, herramienta y banderas técnicas; descarta pregunta, transcripción, nombre, GPS y credenciales. |
| `api/_lib/traffic.js` | `AMBIGUOUS DESTINATION → ONE QUESTION` | Una ruta inexistente o un destino fragmentario pide nombre completo, zona o municipio. La ruta exacta El Pulté Golf → Pradera Concepción permanece calculable. |
| `api/universal-ai.js` | `TEXT TRAFFIC CLARIFICATION` | El canal de texto tampoco invoca tráfico con un fragmento ambiguo y, si el proveedor no identifica la ruta, formula solamente una pregunta breve. |
| `test-v327-tool-followup-no-silence.mjs` | `550 TOOL/AUDIO SEQUENCES + 100 PRIVACY EVENTS` | Prueba cierres antes y después de crear el follow-up, con y sin ID, audio final, vigilancia de entrada/reproducción, recuperación de canal, aclaración de destino y exclusión de contenido privado. |
| `test-v326-no-silent-conversation.mjs`, `test-v325-ideal-microphone-timings.mjs`, `test-v324-real-traffic.mjs`, `test-v323-long-multitopic-context.mjs`, `test-v322-real-sustained-caddie.mjs`, `test-v312-general-caddie.mjs` | `REGRESSION-V327` | Conservan VAD 2.2 s, entrada 15/90 s, respuesta 30 s, contexto largo, búsqueda universal y tráfico real. |
| `service-worker.js` | `gscg-mobile-v327-tool-followup-no-silence` | Fuerza al iPhone a sustituir la copia V326-R2. |
| `audit-project.mjs`, `test-stableford-ui.mjs`, `test-v272-definitive-operational-release.mjs`, `test-v274-complete-courses-voice-operations.mjs`, `test-v275-stable-live-voice-turns.mjs`, `test-v276-manual-hole-navigation.mjs`, `test-v277-official-round-corrections.mjs`, `test-v278-card-image-pdf-export.mjs`, `test-v279-local-card-library.mjs`, `test-v280-local-history-insights.mjs`, `test-v281-pwa-installation.mjs`, `test-v284-native-package-generation.mjs`, `test-v290-brand-icons-cleanup.mjs`, `test-v304-homogeneous-registration-actions.mjs`, `test-v305-history-navigation-zero-error.mjs`, `test-v307-match-arrows-format.mjs` | `BUILD/CACHE-V327` | Toda la regresión exige el nuevo corte sin alterar funciones anteriores. |
| `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` | `HONEST STATUS / MAP / DIGEST` | Registran V326-R2 rechazada, V327 en banco y la prohibición de montaje hasta PASS físico prolongado. |

El cálculo directo real ejecutado durante el diagnóstico devolvió para El Pulté Golf → Pradera Concepción 15 km y cerca de 33 minutos en ese instante. `Concepción` sin más datos no debe convertirse arbitrariamente en Pradera Concepción ni en otro municipio: el modelo hace una sola pregunta breve. Producción permanece en V322 sin modificación.

## Registro detallado V326-R1 · recarga controlada de la credencial de tráfico

El usuario indicó que Google Routes podría estar habilitado. Como Vercel congela las variables disponibles al momento de cada construcción, se solicitó un deployment nuevo con el mismo árbol funcional V326. El intento inicial `ffc45545d77182c6904f74f664cef5d8f12eb95a` fue rechazado antes de publicar por `ROADMAP GATE`: no contenía actualización simultánea de `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`. El rechazo prueba que el candado de gobernanza funciona y no constituye una falla de la aplicación ni una modificación de producción.

V326-R1 modifica únicamente `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`; no cambia HTML, API, Service Worker ni lógica del micrófono. El deployment Preview resultante debe ejecutar la consulta literal «mañana a las 12:30 PM, de El Pulté hacia colonia Oakland zona 10» y sólo puede aprobarse si recibe `ok:true`, ETA, `staticDuration`, demora, distancia, proveedor y hora de cálculo. La comparación contra Waze en Guatemala y el micrófono físico prolongado continúan como pruebas finales obligatorias.

La construcción `dpl_F7cu9YVHovcxWiMMJAR2pm6dnkRx` cargó efectivamente `GOOGLE_MAPS_API_KEY` y expuso un defecto exclusivo del banco: la aserción de credencial ausente inyectaba `apiKey:""`, valor que el operador `||` reemplazaba por la credencial real de Preview. El test recibió `TRAFFIC_ROUTE_UNAVAILABLE` al alcanzar Google y se detuvo antes de publicar. La corrección queda limitada a `test-v324-real-traffic.mjs`, usando `apiKey:" "` para comprobar el recorte a vacío sin heredar el entorno; no cambia el contrato ni la ejecución real de `api/_lib/traffic.js`.

## Registro detallado V326 · recuperación comprobable del micrófono rojo

La evidencia física invalida el criterio V325: `semantic_vad` con `eagerness: low` podía conservar indefinidamente un turno abierto y el watchdog de transcripción sólo nacía después de `input_audio_buffer.speech_stopped`. Por eso el círculo seguía rojo aunque el usuario ya hubiera terminado de hablar. V326 reemplaza únicamente el perfil conversacional por `server_vad` 0.2/700/2,200 ms; la captura operativa de scores, navegación y registro conserva 0.2/700/1,000 ms.

| Archivo exacto | Control V326 | Resultado exigido |
|---|---|---|
| `index-grupal.html` | `CONVERSATION 2200 / INPUT 15S / HARD 90S / RESPONSE 30S` | Cierra una pausa conversacional amplia, renueva vigilancia con deltas, desmonta la captura atascada, apaga el micrófono rojo y recupera una respuesta que no comenzó. El consumo aproximado de A/C se atiende directamente con supuestos. |
| `test-v326-no-silent-conversation.mjs` | `REAL TIMER STATE MACHINE / 30 TURNS` | Ejecuta los callbacks de entrada y respuesta, comprueba el apagado del rojo, mensajes de recuperación y 30 alternancias conversación/orden. |
| `test-v325-ideal-microphone-timings.mjs` | `V326 REGRESSION` | Sustituye la expectativa semántica no determinista por la pausa conversacional fija de 2.2 segundos. |
| `audit-project.mjs` | `AUDIT-V326` | Incorpora el nuevo candado a la auditoría maestra. |
| `service-worker.js` | `gscg-mobile-v327-tool-followup-no-silence` | Obliga a reemplazar la copia V325 instalada en la vista previa. |
| `test-v324-real-traffic.mjs`, `test-v323-long-multitopic-context.mjs`, `test-v322-real-sustained-caddie.mjs`, `test-v312-general-caddie.mjs`, `test-stableford-ui.mjs`, `test-v272-definitive-operational-release.mjs`, `test-v274-complete-courses-voice-operations.mjs`, `test-v275-stable-live-voice-turns.mjs`, `test-v276-manual-hole-navigation.mjs`, `test-v277-official-round-corrections.mjs`, `test-v278-card-image-pdf-export.mjs`, `test-v279-local-card-library.mjs`, `test-v280-local-history-insights.mjs`, `test-v281-pwa-installation.mjs`, `test-v284-native-package-generation.mjs`, `test-v290-brand-icons-cleanup.mjs`, `test-v304-homogeneous-registration-actions.mjs`, `test-v305-history-navigation-zero-error.mjs` y `test-v307-match-arrows-format.mjs` | `BUILD/CACHE-V326` | Conservan todas las funciones previas y exigen la copia corregida. |
| `GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md` | `REJECT-V325 / VALIDATE-V326` | Documentan el fallo real, la corrección y que no existe autorización de montaje. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md` | `MAP/DIGEST/EVIDENCE-V326` | Mapa, tres inventarios, sello y evidencia coinciden con el corte corregido. |

La prueba de aceptación pendiente repite literalmente: tráfico mañana, salida 12:30 PM de El Pulté hacia colonia Oakland zona 10; consumo eléctrico aproximado de un aire acondicionado; y una conversación multitema bilateral prolongada. V326 no se monta sin aprobar esas tres rutas físicas. Google Routes continúa siendo un bloqueo externo separado mientras no exista credencial Preview y comparación simultánea contra Waze en Guatemala.

## Registro detallado V325 · tiempos ideales del micrófono bilateral

V325 mantiene dos perfiles deliberados. `operational` conserva `server_vad` 0.2/700/1,000 ms para registros, scores y órdenes breves. `conversation` utiliza `semantic_vad` con `eagerness: low` para que AI UNIVERSAL ∞ espere el cierre semántico de una idea y no fragmente una conversación por una pausa fija. Toda actualización de sesión queda serializada y validada contra el perfil esperado antes de generar la respuesta; una orden reconocida restaura el perfil operativo.

La continuidad exige apertura siempre manual, micrófono disponible durante la respuesta, guardia de interrupción de 250 ms, transcripción humana mínima de ocho caracteres, filtro de eco de 1,800 ms, reescucha inmediata, cierre por inactividad de 30 minutos, watchdog de diez segundos y aviso `Falta NOMBRE` después de 2,000 ms más 450 ms de confirmación. `test-v325-ideal-microphone-timings.mjs` compila el script y ejecuta 30 alternancias conversación/operación. La validación física prolongada en iPhone continúa abierta, al igual que credencial y comparación real del tráfico en Guatemala. Se agregan a pendientes USGA/Reglas de Golf, Skins y Apple Watch/Wear OS.

Archivos exactos V325: `index-grupal.html`, `service-worker.js`, `audit-project.mjs`, `test-v325-ideal-microphone-timings.mjs`, `test-v324-real-traffic.mjs`, `test-v323-long-multitopic-context.mjs`, `test-v322-real-sustained-caddie.mjs`, `test-v312-general-caddie.mjs`, `test-stableford-ui.mjs`, `test-v272-definitive-operational-release.mjs`, `test-v274-complete-courses-voice-operations.mjs`, `test-v275-stable-live-voice-turns.mjs`, `test-v276-manual-hole-navigation.mjs`, `test-v277-official-round-corrections.mjs`, `test-v278-card-image-pdf-export.mjs`, `test-v279-local-card-library.mjs`, `test-v280-local-history-insights.mjs`, `test-v281-pwa-installation.mjs`, `test-v284-native-package-generation.mjs`, `test-v290-brand-icons-cleanup.mjs`, `test-v304-homogeneous-registration-actions.mjs`, `test-v305-history-navigation-zero-error.mjs`, `test-v307-match-arrows-format.mjs`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`.

## Registro detallado V324 · tráfico actual/futuro, privacidad y recuperación

V324 añade tráfico como herramienta dinámica de AI UNIVERSAL ∞, no como lista de palabras ni respuesta fija. El modelo decide cuándo pedir `get_live_traffic`; el servidor consulta Google Maps Routes en modo óptimo y devuelve un resumen auditable. El GPS se usa únicamente como origen efímero, se elimina del contexto presentado al modelo y nunca aparece en la respuesta. La integración distingue Google Routes de Waze y conserva pendiente la calibración física necesaria antes del montaje.

| Archivo exacto | Control V324 | Resultado exigido |
|---|---|---|
| `api/_lib/traffic.js`, `api/traffic.js` | `TRAFFIC_AWARE_OPTIMAL / 15S / NO COORDINATES` | Ruta real actual o futura, clave sólo en servidor, ETA/demora/distancia y fallos recuperables. |
| `api/universal-ai.js` | `get_live_traffic / TWO-STEP / 55S` | Clasifica la intención sin catálogo, solicita GPS cuando falta y vuelve a consultar al modelo con un temporizador independiente. |
| `index-grupal.html` | `VOICE + TEXT + GPS EPHEMERAL / 20S` | La misma función opera por micrófono y teclado, no guarda coordenadas y permite continuar tras éxito o error. |
| `test-v324-real-traffic.mjs` | `CURRENT / FUTURE / PRIVACY / FAILURE / TIMEOUT` | Prueba ETA, demora, huso horario, proveedor, privacidad, texto, voz y recuperación. |
| `audit-project.mjs` | `AUDIT-V324` | Añade V324 a toda la regresión antes de construir. |
| `service-worker.js`, `test-v323-long-multitopic-context.mjs`, `test-v322-real-sustained-caddie.mjs`, `test-v321-ai-universal-infinity.mjs`, `test-v312-general-caddie.mjs`, `test-stableford-ui.mjs`, `test-v272-definitive-operational-release.mjs`, `test-v274-complete-courses-voice-operations.mjs`, `test-v275-stable-live-voice-turns.mjs`, `test-v276-manual-hole-navigation.mjs`, `test-v277-official-round-corrections.mjs`, `test-v278-card-image-pdf-export.mjs`, `test-v279-local-card-library.mjs`, `test-v280-local-history-insights.mjs`, `test-v281-pwa-installation.mjs`, `test-v284-native-package-generation.mjs`, `test-v290-brand-icons-cleanup.mjs`, `test-v304-homogeneous-registration-actions.mjs`, `test-v305-history-navigation-zero-error.mjs` y `test-v307-match-arrows-format.mjs` | `BUILD/CACHE-V324` | Conservan sus controles previos y exigen el nuevo build/caché. |
| `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md` | `HONEST-STATUS` | Registran código implementado y mantienen abiertas credencial, destino, Guatemala/Waze e iPhone. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md` | `MAP/DIGEST/EVIDENCE-V324` | Mapa, sello y evidencia coinciden con las fuentes exactas. |

## Registro detallado V323 · memoria bilateral multitema

La prueba conversacional real cambió de tema 14 veces sin cortar la comunicación, pero la pregunta 15 reveló que la clave inicial ya no llegaba al modelo. V323 unifica en 80 mensajes la memoria compartida por teclado, voz Realtime y API de texto. El límite equivale a 40 intercambios completos y conserva una ventana móvil controlada cuando se supera.

| Archivo exacto | Control V323 | Resultado exigido |
|---|---|---|
| `api/universal-ai.js` | `80-MESSAGE-SERVER-HISTORY` | La API real recibe hasta 80 mensajes limpios sin truncar la conversación a 8 intercambios. |
| `index-grupal.html` | `80-MESSAGE-BILATERAL-HISTORY` | Texto y voz comparten hasta 40 intercambios y preservan el primer dato después de 30 cambios de tema. |
| `service-worker.js` | `gscg-mobile-v323-long-multitopic-context` | Sustituye de inmediato el shell V322 instalado. |
| `test-v323-long-multitopic-context.mjs` | `30-TOPICS / 63-MESSAGES / FIRST-KEY` | Verifica memoria inicial, variedad temática, rutas de texto y voz, y límite móvil. |
| `audit-project.mjs` | `AUDIT-V323` | Ejecuta la prueba multitema junto con toda la regresión. |
| `test-v322-real-sustained-caddie.mjs`, `test-v312-general-caddie.mjs`, `test-stableford-ui.mjs`, `test-v272-definitive-operational-release.mjs`, `test-v274-complete-courses-voice-operations.mjs`, `test-v275-stable-live-voice-turns.mjs`, `test-v276-manual-hole-navigation.mjs`, `test-v277-official-round-corrections.mjs`, `test-v278-card-image-pdf-export.mjs`, `test-v279-local-card-library.mjs`, `test-v280-local-history-insights.mjs`, `test-v281-pwa-installation.mjs`, `test-v284-native-package-generation.mjs`, `test-v290-brand-icons-cleanup.mjs`, `test-v304-homogeneous-registration-actions.mjs`, `test-v305-history-navigation-zero-error.mjs` y `test-v307-match-arrows-format.mjs` | `BUILD/CACHE-V323` | Mantienen sus controles funcionales y exigen el build vigente. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | `MAPA-V323` | Registra la nueva prueba y el total de archivos vigentes. |
| `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` | `DIGEST-V323` | Sella el conjunto exacto de fuentes después de la corrección. |
| `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md` | `EVIDENCIA-V323` | Conservan causa, cambio, alcance y criterio de aprobación. |

## Registro detallado V322 · micrófono sostenido, reapertura y recuperación

La evidencia real de iPhone mostró dos respuestas correctas seguidas de cierre automático; al tocar nuevamente, `/api/session-grupal` respondía HTTP 200 pero el cliente podía quedar sin reaccionar. La causa se encontraba en el cierre forzado de tres segundos, la reconstrucción innecesaria de una conexión sana y el tratamiento terminal de fallos recuperables. V322 corrige las tres rutas y conserva completa la AI UNIVERSAL ∞ incorporada simultáneamente en V321.

| Archivo exacto | Control V322 | Resultado exigido |
|---|---|---|
| `index-grupal.html` | `V322-REAL-SUSTAINED-CONVERSATION` | 30 minutos de inactividad, 24+ turnos, reutilización WebRTC sana, watchdogs visibles y recuperación sin silencio. |
| `api/research.js` | `RESEARCH-RECOVERY-40S` | Timeout, error upstream y respuesta vacía regresan HTTP 200 con explicación utilizable. |
| `service-worker.js` | `gscg-mobile-v322-real-sustained-conversation` | Reemplaza la copia V321 instalada. |
| `test-v322-real-sustained-caddie.mjs` | `24-TURNS / SUCCESS / TIMEOUT / UPSTREAM` | Prueba el contrato completo nuevo y las rutas de recuperación. |
| `test-v321-ai-universal-infinity.mjs` | `200/200-REGRESSION` | Conserva voz, texto, contexto, Web y 200 áreas sin lista cerrada. |
| `test-v312-general-caddie.mjs` | `VOICE-REGRESSION` | Conserva clima, score, conversación, interrupción y nueva duración. |
| `audit-project.mjs` | `AUDIT-V322` | Ejecuta V322 dentro de toda la batería antes de construir. |
| `test-stableford-ui.mjs`, `test-v272-definitive-operational-release.mjs`, `test-v274-complete-courses-voice-operations.mjs`, `test-v275-stable-live-voice-turns.mjs`, `test-v276-manual-hole-navigation.mjs`, `test-v277-official-round-corrections.mjs`, `test-v278-card-image-pdf-export.mjs`, `test-v279-local-card-library.mjs`, `test-v280-local-history-insights.mjs`, `test-v281-pwa-installation.mjs`, `test-v284-native-package-generation.mjs`, `test-v290-brand-icons-cleanup.mjs`, `test-v304-homogeneous-registration-actions.mjs`, `test-v305-history-navigation-zero-error.mjs` y `test-v307-match-arrows-format.mjs` | `BUILD/CACHE-V322` | Mantienen sus controles funcionales y reconocen la publicación vigente. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | `MAPA-V322` | Registra la prueba y el corte vigente. |
| `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` | `DIGEST-V322` | Sella fuentes y tres PDF regenerados con los mismos nombres. |
| `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md` | `EVIDENCIA-V322` | Conservan causa, corrección, alcance y pruebas. |

## Registro detallado V321 · AI UNIVERSAL ∞

La comunicación universal deja de depender de ejemplos temáticos: una API de modelo avanzado atiende cualquier consulta permitida, mantiene contexto temporal, consulta la Web cuando el dato cambia y separa automáticamente las órdenes de Golf Score Card GT. La voz detecta el idioma, el texto comparte el mismo hilo y el usuario dispone de cinco controles. El Manual mantiene portada, orden y 74 páginas físicas.

Control visual final: `manual.html` identifica la página 73 como **AI UNIVERSAL ∞** y `test-v321-ai-universal-infinity.mjs` exige ese mismo nombre.

| Arch…35153 tokens truncated…e no almacena tokens. |
| `live-control.js` | `CAPTAIN-WORLD-SHARE` | Centro Live principal, Capitán único, respaldo individual y `COMPARTIR ♾️` mundial. |
| `api/live.js` | `ATOMIC-UNIQUE-GROUP-PUBLISHER` | Una sola CTE con torneo `FOR UPDATE`; segundo publicador devuelve `409 LIVE_GROUP_ALREADY_PUBLISHING`. |
| `index-grupal.html` | `V353-BUILD` | Identificador exacto sin alterar el `persist()` oficial. |
| `service-worker.js` | `V353-CACHE` | Nuevo shell con `live-hub.html` y `live-hub.js`; Score Card conserva su funcionamiento offline. |
| `vercel.json` | `HUB-PRIVACY-HEADERS` | Centro sin caché, sin referrer y sin indexación. |
| `test-v353-live-hub.mjs` | `80-PLAYER-TWO-MONITORS-WORLD` | 20×4, 40×2, ambos monitores, tres jugadores, externo, privacidad, páginas sin tope, compartir mundial y doble capitán. |
| `test-v352-live.mjs` | `LIVE-CORE-REGRESSION` | Permiso, filtro de alcance, tokens, idempotencia, offline y visor separado siguen aprobados. |
| `audit-project.mjs` | `AUDIT-95` | Ejecuta V353 dentro de la auditoría integral. |
| `DATABASE_ARCHITECTURE.md` | `NO-NEW-MIGRATION` | V353 reutiliza cuatro tablas y 15 índices; cero cambio de esquema. |
| `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_LIVE_018_GOLF_SCORE_CARD_GT_LIVE.md` | `GATE-0-V353` | Siete entradas, escenario, riesgo, pruebas, compartir mundial y reversión cerrados. |
| `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md` | `HONEST-STATE` | Distinguen banco local, Preview, navegador y prueba física. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | `FILE-MAP-359` | Mapea cada pieza nueva y el conteo sellado. |
| `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` | `REMOTE-GATE-V353` | Los dos ROADMAPS enumeran literalmente toda modificación. |
| `scripts/rebuild-inventory-pdfs.py`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` | `INVENTORY-V353` | Tres PDF y fuente exacta quedan sellados antes de publicar. |

Flujo amistoso: 1) abre el enlace; 2) elige Monitor General o Individual; 3) en la General busca un nombre y toca `+ SEGUIR`; 4) mira LIVE mientras todo se actualiza solo. `COMPARTIR ♾️` funciona por WhatsApp, Mensajes, correo, AirDrop, X u otra aplicación en USA, México, Italia o cualquier país. El vínculo conserva sólo lectura, vencimiento y revocación.

Banco local V353 PASS: 80 jugadores en 20 grupos de cuatro y 40 grupos de dos; cero omisiones o duplicados; Monitor General + tres jugadores elegidos en el Monitor Individual desde una sola respuesta; un externo mediante un token adicional; origen seguro; cursor sin máximo fijo; sólo `action:"read"`; token retirado del fragmento; doble grupo bloqueado por sentencia atómica.

Preview `dpl_2g6KPHDjaWbXuRfR8Ky88ai2U24F` READY, commit `8cc3600d25cba7185a55548104cac609b341117c`. E2E remoto PASS con 20 grupos/80 jugadores, tres páginas, tres selecciones individuales desde la General, vínculo externo de cuatro jugadores, publicación de revisión 0→1, `409 LIVE_GROUP_ALREADY_PUBLISHING` y `410 LIVE_REVOKED`. Observabilidad: 103×`200`, 2×`409`, 1×`410`, cero `error`/`fatal`. Neon confirma cero streams activos, cero snapshots retenidos y cero torneos activos de la prueba. Producción permanece en `0dc1ba7a62b6bd6aec92752c539ca641cf950e26`; inspección visual e iPhone físico son puertas separadas.

Compatibilidad de compilación V353: `test-v353-live-hub.mjs` valida `vercel.json` con espacios o compactado mediante `\s*`; conserva la exigencia literal de `/live-hub.html` y elimina el falso negativo observado en Vercel sin reducir ninguna prueba funcional.

Archivos exactos V353: `live-hub.html`, `live-hub.js`, `live.html`, `live-view.js`, `live-control.js`, `api/live.js`, `index-grupal.html`, `service-worker.js`, `vercel.json`, `test-v353-live-hub.mjs`, `test-v352-live.mjs`, `audit-project.mjs`, `DATABASE_ARCHITECTURE.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_LIVE_018_GOLF_SCORE_CARD_GT_LIVE.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `scripts/rebuild-inventory-pdfs.py` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.

## V354-VOICE-FALLBACK-MULTIHOLE-GENERAL · corrección física Safari

| Archivo exacto | Responsabilidad V354 | Control permanente |
|---|---|---|
| `index-grupal.html` | Jugador único implícito, `hoyo/hoyos`, lote local y panel General visible antes del envío. | Tres hoyos sin repetir nombre escriben tres entradas; un score inválido no consulta IA. |
| `index-grupal.html` | Reanuda y vigila `speechSynthesis`; deja recuperación visible si no inicia. | Un fallo de audio no oculta ni pierde el texto. |
| `api/voice-health.js` | Eventos técnicos V354 y `entryCount` acotado. | Excluye transcripción, pregunta, nombres, audio y ubicación. |
| `service-worker.js` | Caché `gscg-mobile-v354-voice-fallback`. | El iPhone invalida la lógica anterior. |
| `test-v354-voice-fallback.mjs` | Ejecuta parser y procesador reales con un jugador, tres hoyos, plural y General. | Exige lote 3, abrir→enviar, watchdog visible y privacidad. |
| `test-v267-scorecard-combination-matrix.mjs`, `test-v270-consecutive-hole-voice-blocks.mjs` | Adaptan extractores al jugador operacional implícito. | 583 configuraciones y bloques consecutivos conservan cobertura. |
| `test-v352-live.mjs`, `test-v353-live-hub.mjs` | Aceptan release V354 sin cambiar LIVE V353. | LIVE y ambos monitores conservan sus candados. |
| `audit-project.mjs` | Incorpora el banco V354. | La auditoría integral no puede omitirlo. |
| `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md` | RC-024 y estado honesto. | Banco, Preview y prueba física permanecen separados. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` | Trazabilidad literal. | Gate remoto reproducible. |
| `scripts/rebuild-inventory-pdfs.py`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` | Inventario V354. | Fuentes y PDF se sellan al final. |

Evidencia: Vercel registró cuatro 429 en `/api/session-grupal`, Registro aplicado a las 13:05:31 UTC, transcripciones de ronda a las 13:05:59, 13:06:10 y 13:06:19, y `/api/universal-ai` 200 a las 13:06:19. La captura `IMG_2141.png` mostró sólo el hoyo 1 escrito. El candidato no se declara aprobado físicamente hasta repetirlo en iPhone.

Preview V354: commit `d7deb09be3826430afc8e1f3d379f0a1137d215b`, deployment `dpl_CgqzYpVABY9djJehtFmH5cyFXHdn`, estado READY y `target:null` (Preview). El build remoto aprobó auditoría maestra de 96 paquetes, incluido `PASS V354 VOZ`, 583 configuraciones, LIVE V352 y Centro LIVE V353. El navegador real abrió la rama, confirmó `V354-VOICE-FALLBACK-MULTIHOLE-GENERAL-20260828`, voz V354, AI ∞ y LIVE visibles, con cero errores originados por la aplicación. Producción permanece intacta; falta la prueba física iPhone del micrófono.

Archivos exactos V354: `index-grupal.html`, `service-worker.js`, `api/voice-health.js`, `test-v354-voice-fallback.mjs`, `test-v267-scorecard-combination-matrix.mjs`, `test-v270-consecutive-hole-voice-blocks.mjs`, `test-v352-live.mjs`, `test-v353-live-hub.mjs`, `audit-project.mjs`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `scripts/rebuild-inventory-pdfs.py` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.

## V355-IOS-AUDIO-DICTATION

| Archivo exacto | Responsabilidad | Control permanente |
|---|---|---|
| `index-grupal.html` | Habilita voz en el gesto original y distribuye dictado azul en Nombre/HDCP/Marcas. | Safari asíncrono, positivos y negativos de registro. |
| `api/voice-health.js` | Eventos técnicos privados V355. | Sin transcripción, nombre, pregunta, audio ni ubicación. |
| `service-worker.js` | Caché V355. | Invalida V354 en iPhone. |
| `test-v355-ios-audio-dictation.mjs` | Reproduce `Ancas Gustavo, 15 blancas` y el bloqueo de activación. | Obligatorio en auditoría. |
| `test-v354-voice-fallback.mjs`, `audit-project.mjs` | Conservan varios hoyos y General visible. | Regresión acumulada. |
| documentos rectores e inventarios | Registran RC-025 y estado honesto. | Banco, Preview y PASS físico separados. |

Estado remoto V355: commit `b965ec4d87c1f0400bf655e5f8bdba6f003f5cc9`, Preview `dpl_7AaXsHMV7msb6f2dizQECu3ES55F` READY, 97 paquetes PASS y navegador real PASS para build, AI ∞ y distribución Nombre/HDCP/Marcas. Producción intacta; falta PASS físico iPhone.

### Extensión V356 · horizontes de tráfico y clima

| Archivo exacto | Responsabilidad | Control permanente |
|---|---|---|
| `api/universal-ai.js` | Interpreta 30 min, 1 h, 3 h, mañana, fecha y próxima semana en hora Guatemala; separa vivo de previsto. | El sufijo temporal no contamina el destino ni puede rotular futuro como vivo. |
| `api/_lib/traffic.js` | Propaga salida solicitada y si la hora fue asumida. | La respuesta conserva hora de cálculo y hora de salida. |
| `api/weather.js` | Selecciona la primera hora disponible igual o posterior y declara límite de 16 días. | Nunca sustituye una fecha futura no disponible por observación actual. |
| `test-v356-traffic-weather-accuracy.mjs` | Ejecuta cinco horizontes, tres rutas, clima horario/diario y límite del proveedor. | RC-027 queda en la auditoría maestra. |
| documentos rectores e inventarios | Registran causa, punto de escape y estado externo honesto. | 90% requiere comparación cuantificada; no basta PASS interno. |

## V356-VOICE-ONLY-CEDAR-QUALITY

| Archivo exacto | Responsabilidad V356 | Candado |
|---|---|---|
| `index-grupal.html` | Oculta turnos originados por micrófono, conserva texto escrito y reproduce el respaldo con Cedar. | Voz y texto tienen origen explícito; no existe voz española genérica. |
| `api/voice-speech.js` | TTS servidor `Cedar` 1.15 con OpenAI directo y Vercel AI Gateway. | Misma matriz masculina, sin clave en cliente, sin caché ni registro del contenido. |
| `api/universal-ai.js` | Distingue salida hablada y escrita; clima hablado conciso y calibre profundo conservado. | Voz sin Markdown y de tres a seis oraciones; texto mantiene detalle. |
| `service-worker.js` | Caché V356. | El iPhone invalida V355. |
| `test-v356-voice-only-cedar-quality.mjs` | Ejecuta ocultamiento, matriz, respaldo Gateway, clima conciso, tráfico estructurado y perfil deep. | RC-026 no puede reaparecer. |
| `test-v354-voice-fallback.mjs`, `test-v355-ios-audio-dictation.mjs` | Conservan multihoyos, General y dictado azul. | La corrección nueva no rompe las anteriores. |
| `test-v352-live.mjs`, `test-v353-live-hub.mjs` | Conservan LIVE y Centro LIVE. | Monitores y privacidad no cambian. |
| `audit-project.mjs` | Incorpora V356 a la auditoría maestra. | Ningún Preview puede omitir el banco. |
| documentos rectores, mapa e inventarios | RC-026, estado, rutas y sello V356. | Trazabilidad reproducible y Producción intacta. |

Fuentes vivas: Google Maps Routes `TRAFFIC_AWARE_OPTIMAL` para tráfico; Open-Meteo estructurado para clima; GPT-5.6 y búsqueda web para AI UNIVERSAL. La salida hablada exige conclusión, evidencia, límite y recomendación sin leer fichas extensas. Preview y PASS físico iPhone permanecen pendientes hasta completar las puertas técnicas.

## V357-IOS-VOICE-TRANSPORT-RECOVERY

| Archivo exacto | Responsabilidad V357 | Candado |
|---|---|---|
| `index-grupal.html` | Abre reconocimiento local dentro del toque de iPhone; captura continua, alternativas, silencio, reinicio y reintentos. | Un 429 de Realtime no bloquea Registro, multi-hoyos ni AI UNIVERSAL. |
| `api/voice-health.js` | Acepta estado técnico, causa de transporte y rechazo seguro. | Nunca recibe transcripción, nombres, audio ni coordenadas. |
| `service-worker.js` | Caché `gscg-mobile-v357-ios-voice-transport-recovery`. | El iPhone invalida el shell V356. |
| `test-v357-ios-voice-transport-recovery.mjs` | Ejecuta orden gesto→captura antes de Realtime, selector de alternativas, ambigüedad, privacidad y `voiceOnly`. | RC-028 no puede reaparecer. |
| `test-v354-voice-fallback.mjs`, `test-v355-ios-audio-dictation.mjs`, `test-v356-voice-only-cedar-quality.mjs` | Conservan multi-hoyos, Registro, voz sin texto y Cedar. | Regresión acumulada obligatoria. |
| `test-v324-real-traffic.mjs`, `test-v337-universal-weather.mjs`, `test-v356-traffic-weather-accuracy.mjs` | Conservan tráfico y clima mientras se corrige voz. | La rama de micrófono no altera datos aprobados. |
| `.github/workflows/roadmap-gate.yml`, `AGENTS.md` | Sincronización y compuerta contra cruces de ramas/conversaciones. | No sustituir archivos completos ni omitir bancos V354–V357. |
| `audit-project.mjs`, `package.json` | Auditoría maestra y ejecución directa del candado. | Un FAIL detiene candidato y Preview. |
| `test-v352-live.mjs`, `test-v353-live-hub.mjs` | Ajustan sólo el identificador de build. | LIVE y Centro LIVE siguen intactos. |
| `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md` | RC-028 y estado honesto. | Banco, Preview, navegador y prueba física separados. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `scripts/rebuild-inventory-pdfs.py`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` | Trazabilidad y sello del árbol V357. | Otra conversación localiza y conserva esta corrección. |

Evidencia raíz: 16:43:01, 16:43:23, 16:43:54, 16:44:06, 16:45:44 y 16:45:58 UTC devolvieron 429 en `/api/session-grupal`; `/api/universal-ai` respondió 200. V357 elimina esa dependencia para escuchar en Safari. Producción permanece intacta.

## V358-VOICE-ROUND-CONTINUITY

| Archivo exacto | Responsabilidad V358 | Candado |
|---|---|---|
| `index-grupal.html` | Condiciona el borrador inicial a `!round.configured`. | Una ronda activa reaparece con jugadores, modalidad, hoyo y scores; no se abre Registro automáticamente. |
| `service-worker.js` | Caché `gscg-mobile-v358-voice-round-continuity`. | El acceso directo iPhone recibe la corrección. |
| `test-v358-active-round-reopen.mjs` | Inspecciona inicio, `pagehide`, `beforeunload`, `pageshow`, persistencia, archivo y `NUEVA RONDA`. | RC-029 no puede reaparecer. |
| `test-v311-neutral-match-home-link.mjs`, `test-v352-live.mjs`, `test-v353-live-hub.mjs`, `test-v354-voice-fallback.mjs`, `test-v355-ios-audio-dictation.mjs`, `test-v356-voice-only-cedar-quality.mjs`, `test-v357-ios-voice-transport-recovery.mjs` | Conservan inicio directo condicionado y regresión acumulada con el identificador V358. | Match/Four Ball, LIVE, Registro, multihoyos, Cedar, privacidad y gesto Safari siguen activos. |
| `audit-project.mjs` | Ejecuta V358 dentro de la puerta maestra. | Un FAIL detiene publicación. |
| documentos rectores, mapa, `scripts/rebuild-inventory-pdfs.py` e inventario | RC-029 y sello reproducible. | Preview no equivale a PASS físico ni autoriza Producción. |

## V359-IOS-SCORE-PARSER-RECOVERY

| Archivo exacto | Responsabilidad V359 | Candado |
|---|---|---|
| `index-grupal.html` | Amplía vocabulario físico seguro y acepta hoyo al final de un único bloque. | No adivina jugadores, hoyos ni scores; palabras desconocidas invalidan la tanda. |
| `test-v359-ios-score-parser-recovery.mjs` | Ejecuta tres formas Jaime/Gustavo y un caso negativo. | Exige pares jugador-score exactos. |
| `service-worker.js` | Caché `gscg-mobile-v359-ios-score-parser-recovery`. | El iPhone recibe el parser nuevo. |
| `audit-project.mjs`, bancos V270 y V354–V358 | Puerta maestra y regresión acumulada. | Un FAIL detiene Preview. |
| registro, cola, matrices, ROADMAPS, reconstrucción e inventario | RC-030 y V358 rechazada. | Sólo `browser_fallback_score_applied` físico puede cerrar V359. |

## V360-INTEGRATED-PROGRESSIVE-PARSER

| Archivo exacto | Responsabilidad V360 | Candado |
|---|---|---|
| `index-grupal.html` | Integra progreso visual por score, parser natural, alternativas Safari y persistencia. | Ambigüedad revierte; frase válida se ve antes de cerrar el micrófono. |
| `api/voice-health.js` | Acepta `browser_fallback_round_progressive`. | Privacidad técnica sin contenido hablado. |
| `test-v357-synchronized-progressive-voice.mjs`, `test-v359-ios-score-parser-recovery.mjs` | Verifican las dos correcciones paralelas juntas. | Ninguna puede reemplazar a la otra. |
| `.github/workflows/roadmap-gate.yml`, `package.json`, `audit-project.mjs` | Ejecutan el banco combinado. | Un FAIL bloquea Preview. |
| documentos, caché, ROADMAPS, reconstrucción e inventario | Sello V360 único. | Producción intacta y PASS físico pendiente. |

## V361-SYNCHRONIZED-VOICE

| Archivo exacto | Responsabilidad V361 | Candado |
|---|---|---|
| `index-grupal.html` | Conserva el parser natural V360 y confirma visual y persistentemente cada score parcial mientras la escucha continúa. | Cada aplicación válida ejecuta `persist()` + `render()`; una alternativa ambigua revierte antes de continuar. |
| `index-grupal.html` | Espera el catálogo `voiceschanged`, selecciona sólo una voz masculina aprobada y abre circuito local diez minutos tras 429/503 de Cedar. | Una caída de TTS no bloquea AI UNIVERSAL ni provoca voz femenina genérica o reintentos continuos. |
| `test-v357-synchronized-progressive-voice.mjs`, `test-v359-ios-score-parser-recovery.mjs`, `test-v361-synchronized-voice.mjs` | Ejecutan progreso, vocabulario natural, persistencia inmediata, voz masculina tardía, circuito Cedar y privacidad `voiceOnly`. | Las correcciones de conversaciones paralelas quedan unidas en un solo banco. |
| `.github/workflows/roadmap-gate.yml`, `package.json`, `audit-project.mjs` | Hacen obligatorio el banco V361 local, GitHub y Vercel. | Un FAIL detiene la publicación. |
| `service-worker.js` | Caché `gscg-mobile-v361-synchronized-voice`. | Safari no conserva el shell V360. |

Archivos exactos V361: `.github/workflows/roadmap-gate.yml`, `audit-project.mjs`, `index-grupal.html`, `package.json`, `service-worker.js`, `test-v352-live.mjs`, `test-v353-live-hub.mjs`, `test-v354-voice-fallback.mjs`, `test-v355-ios-audio-dictation.mjs`, `test-v356-voice-only-cedar-quality.mjs`, `test-v357-ios-voice-transport-recovery.mjs`, `test-v357-synchronized-progressive-voice.mjs`, `test-v358-active-round-reopen.mjs`, `test-v359-ios-score-parser-recovery.mjs`, `test-v361-synchronized-voice.mjs`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `scripts/rebuild-inventory-pdfs.py` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`. Producción permanece intacta; Preview y prueba física iPhone son puertas independientes.

## V362-PHYSICAL-VOICE-RECOVERY

| Archivo exacto | Responsabilidad V362 | Candado |
|---|---|---|
| `api/voice-speech.js` | Cedar directo primero; respaldo Gateway `openai/tts-1-hd` + Onyx, audio MP3 y `X-GSCG-Voice`. | Un 429 de Cedar no depende de un modelo inexistente ni puede caer en voz femenina genérica. |
| `index-grupal.html` | Restaura AI ∞ de un toque, muestra Cedar/Onyx real, vigila 18 s hasta el primer resultado y amplía sólo nombres masculinos permitidos. | Panel → habilitación de audio → escucha ocurre dentro del mismo gesto; Safari no queda rojo indefinidamente. |
| `index-grupal.html` | Consume el cierre del escritor progresivo y habla primera vuelta/ronda completa, con TTS servidor si Realtime falla. | `persist()` + `render()` inmediato permanece; hoyos 9/18 no pierden el reporte. |
| `api/voice-health.js` | Acepta `browser_fallback_no_result_timeout` con `no_speech`. | Sin transcripción, nombres, audio ni ubicación. |
| `test-v358-ios-score-universal-physical-recovery.mjs`, `test-v362-physical-voice-recovery.mjs` | Restauran el banco de un toque y cubren modelo/voz, watchdog y cierre hablado. | Las integraciones posteriores no pueden retirar silenciosamente V358 ni simular un modelo Gateway no publicado. |
| bancos V352–V361, `audit-project.mjs`, `package.json`, workflow y Service Worker | Regresión acumulada y shell V362. | Un FAIL detiene Preview; Producción continúa intacta. |
| documentos rectores, ambos ROADMAPS, mapa, reconstrucción e inventario | RC-032 y árbol reproducible. | PASS automático, Preview y PASS físico se reportan separadamente. |

## V363-RECORDED-MOBILE-BEHAVIOR + INTOCABLES

Regresión histórica ajustada al almacenamiento canónico: `test-v267-one-operational-line.mjs`.

| Archivo exacto | Responsabilidad V363 | Candado |
|---|---|---|
| `index-grupal.html` | `ACTIVE_ROUND_KEY`, nombre + posición Match, cierre Normal preservado, guard Safari y aislamiento móvil. | No borrado al reabrir y sin contaminación entre modalidades. |
| `Intocables/README.md`, `Intocables/REGLAS_INTOCABLES.json`, `Intocables/intocables-gate.mjs` | INT-01…INT-04 con lógica AND. | Un FAIL bloquea candidato y publicación. |
| `test-v363-intocables-behavior.mjs`, `test-v363-recorded-mobile-behavior.mjs` | Ejemplo Jaime 7 arriba / Gustavo 7 abajo, persistencia y comportamiento móvil. | Evidencia automática; físico iPhone continúa separado. |
| `audit-project.mjs`, `package.json`, `service-worker.js` | Bancos obligatorios y shell V363. | No se entrega caché o auditoría anterior. |
| `V363_PRUEBAS_COMPORTAMIENTO/REPORTE_PRUEBAS_COMPORTAMIENTO_V363_RC035.md` + MP4/capturas | RC-035: safe area LIVE, aislamiento de Registro, instalación y cierre sin `onend`. | La grabación automática no sustituye Safari/iPhone físico. |

Archivos exactos V363: `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/MATRIZ_GATE_0_PROYECTO.json`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `Intocables/README.md`, `Intocables/REGLAS_INTOCABLES.json`, `Intocables/intocables-gate.mjs`, `audit-project.mjs`, `index-grupal.html`, `live-control.js`, `package.json`, `scripts/rebuild-inventory-pdfs.py`, `service-worker.js`, `test-v260-round-points-player-return.mjs`, `test-v352-live.mjs`, `test-v353-live-hub.mjs`, `test-v354-voice-fallback.mjs`, `test-v355-ios-audio-dictation.mjs`, `test-v356-voice-only-cedar-quality.mjs`, `test-v357-ios-voice-transport-recovery.mjs`, `test-v357-synchronized-progressive-voice.mjs`, `test-v358-active-round-reopen.mjs`, `test-v358-ios-score-universal-physical-recovery.mjs`, `test-v359-ios-score-parser-recovery.mjs`, `test-v361-synchronized-voice.mjs`, `test-v362-physical-voice-recovery.mjs`, `test-v363-intocables-behavior.mjs` y `test-v363-recorded-mobile-behavior.mjs`. Ambos ROADMAPS también se actualizan en el mismo cambio.

Evidencia y soporte móvil exactos: `.gitignore`, `scripts/v363-silent-speech-recognition.js`, `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V363_PRUEBAS_COMPORTAMIENTO/REPORTE_PRUEBAS_COMPORTAMIENTO_V363_RC035.md`, `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V363_PRUEBAS_COMPORTAMIENTO/PRUEBA_COMPORTAMIENTO_V363_RC035.mp4`, `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V363_PRUEBAS_COMPORTAMIENTO/PRUEBA_COMPORTAMIENTO_V363_RC035_POSTER.png`, `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V363_PRUEBAS_COMPORTAMIENTO/RC035_IMG_2168_LIVE_SAFE_AREA_FAIL.png` y `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V363_PRUEBAS_COMPORTAMIENTO/RC035_IMG_2169_MIC_OVERLAYS_FAIL.png`.

## V364 · entrada final Nueva ronda · 28 de agosto de 2026

- `index-grupal.html`: `nueva_ronda=1` llama la ruta oficial `openNewRoundDraft()` aunque exista tarjeta activa; esa ruta persiste primero y no borra datos.
- `service-worker.js`: caché renovado para que Safari reciba la corrección.
- `test-v364-explicit-new-round-entry.mjs`: valida entrada, apertura y ausencia de borrado.
- `test-v357-ios-voice-transport-recovery.mjs` y `test-v361-synchronized-voice.mjs`: aceptan la extensión V364 de la firma de caché sin retirar el prefijo/candado V363.
- `audit-project.mjs` y `package.json`: incorporan el banco V364.
- Corrección externa OIDC/voz: la petición Gateway añade `ai-speech-model-specification-version: 4`, cabecera obligatoria del contrato Speech V4 comprobada por `test-v364-vercel-oidc-recovery.mjs`; requiere nuevo Preview y prueba física iPhone.
- Contrato completo Gateway: añade `ai-gateway-protocol-version: 0.0.1` y `ai-gateway-auth-method: oidc|api-key`; un Preview independiente produjo MP3 200 con Onyx antes de trasladar el mismo contrato a V364.
- `scripts/project-quality-gate.mjs`: conserva el control sincronizado recibido en el árbol compartido.
- `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`: registro doble del cambio.

Producción no se toca. El Preview se entrega únicamente después de tres comprobaciones externas del mismo artefacto.
### Promoción pública autorizada V363 — 28 de agosto de 2026

- Alcance técnico: `scripts/project-quality-gate.mjs` y registro documental obligatorio.
- Integridad: la base `0dc1ba7a62b6bd6aec92752c539ca641cf950e26` debe seguir siendo ancestro fuera de Vercel.
- Vercel: repositorio `EPGCADDY/EPG-CADDY` y SHA expuesto deben coincidir exactamente con `HEAD`.
- Fuera de alcance: tarjeta, persistencia de ronda, Match Play, Ronda Normal, voz y comunicación universal permanecen idénticos al candidato V363 probado.
- Inventario: tres PDF V311 regenerados y nuevo `sourceDigest` sellado antes del montaje.
- Sello atómico externo: `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md` se actualizan juntos en el mismo commit; el Gate ROADMAP debe aprobar en Vercel.
- Sello final externo: ambos ROADMAPS y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` quedan juntos en el commit posterior a regenerar los tres PDF.

## Hotfix final OIDC · comunicación universal · 28 de agosto de 2026

- Evidencia: producción V363 devolvió HTTP 200 para la aplicación y 503 `UNIVERSAL_AI_CREDIT_EXHAUSTED` para `/api/universal-ai`; Vercel registró tres intentos directos y ninguno Gateway.
- `api/_lib/vercel-gateway-auth.js`: resuelve `AI_GATEWAY_API_KEY`, `VERCEL_OIDC_TOKEN` o `getVercelOidcToken()` en ese orden, sin exponer valores.
- `api/universal-ai.js`: solicita OIDC sólo al activar la recuperación posterior a saldo agotado.
- `api/voice-speech.js`: usa el mismo resolvedor para la voz de respaldo.
- `test-v364-vercel-oidc-recovery.mjs`: exige tres rechazos directos, un salto Gateway y cabecera Bearer administrada.
- `audit-project.mjs` y `package.json`: instalan `@vercel/oidc` y hacen obligatorio el banco.
- Control: `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`.

Producción no se toca. El candidato necesita auditoría local, Preview, tres corridas externas del mismo deployment y conversación física iPhone.

## V365/V366 · integración sobre producción con voz OIDC

| Archivo exacto | Responsabilidad | Candado |
|---|---|---|
| `index-grupal.html` | `isRecoverableStoredRound()` exige 1–6 jugadores; `ensurePrincipalEntry()` impone `Inicio` sin ronda operativa en arranque y ciclo de vida. | Copias vacías no vencen a Score Cabo; tarjeta válida permanece visible. |
| `index-grupal.html` | Conserva `nueva_ronda=1` y `openNewRoundDraft()` sin borrado previo. | Sólo `INICIAR RONDA` sustituye la tarjeta. |
| `test-v365-active-round-empty-recovery.mjs` | Ejecuta clave canónica vacía, copias vacías y tarjeta archivada con score. | Exige recuperación y resellado canónico. |
| `test-v366-principal-entry-recovery.mjs` | Ejecuta sin ronda, ronda vacía, Registro visible, tarjeta válida, eventos y startup. | Entrada principal idempotente y compatibilidad V364. |
| `service-worker.js` | Firma acumulada V363/V364/V365/V366. | Actualización efectiva sin retirar voz ni entrada explícita. |
| `Intocables/`, pruebas históricas, `audit-project.mjs`, `package.json` | Regresión acumulada de persistencia, Match, Normal, voz, multihoyos, cierres y LIVE. | Un solo FAIL detiene el candidato. |
| reportes RC-037/RC-038, cola, matriz, mapa, ROADMAPS e inventario | Trazabilidad del defecto y estado real. | Automático, Preview, externo y físico se reportan por separado. |

Base de integración: `main` con recuperación OIDC de comunicación universal. Los archivos `api/` y `@vercel/oidc` permanecen intactos. Producción no cambia hasta aprobar el Preview integrado y el recorrido físico iPhone.

Inventario literal del cambio: `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V365_RECUPERACION_RONDA_ACTIVA/REPORTE_V365_RC037.md`, `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V366_ENTRADA_PRINCIPAL/REPORTE_V366_RC038.md`, `test-v289-stableford-new-round-empty.mjs`, `test-v365-active-round-empty-recovery.mjs` y `test-v366-principal-entry-recovery.mjs`.

## V367 · comunicación universal hablada en la misma pantalla

| Archivo exacto | Responsabilidad | Candado |
|---|---|---|
| `index-grupal.html` | Pregunta hablada → `voiceOnly:true` → audio, sin `openAiUniversalPanel()`. | Inicio, Registro y tarjeta permanecen visibles. |
| `api/voice-health.js` | Evento privado `browser_fallback_general_in_place`. | Cero transcripción, nombre o ubicación. |
| `test-v367-universal-voice-in-place.mjs` | Valida respuesta, acceso de un toque y contexto setup/round sin apertura visual. | RC-039 bloqueante. |
| `test-v354-voice-fallback.mjs`, `test-v358-ios-score-universal-physical-recovery.mjs` | Conservan multihoyos y gesto iPhone con la nueva frontera visual. | No se pierde voz ni score. |

Archivos literales V367: `index-grupal.html`, `api/voice-health.js`, `service-worker.js`, `test-v354-voice-fallback.mjs`, `test-v358-ios-score-universal-physical-recovery.mjs`, `test-v357-ios-voice-transport-recovery.mjs`, `test-v361-synchronized-voice.mjs`, `test-v364-explicit-new-round-entry.mjs`, `test-v367-universal-voice-in-place.mjs`, `Intocables/README.md`, `Intocables/intocables-gate.mjs`, `audit-project.mjs`, `package.json`, documentos rectores e inventario.

## V368 · entrada web canónica sincronizada · 29 de agosto de 2026

V368 se construye sobre la línea multiconversación más reciente `fix-v366-integrated-main` (`03ca12e`). `index-grupal.html` hace prioritaria la bandera `inicio=1` aun con tarjeta válida y adelanta `standaloneApp` para evitar el `ReferenceError` que detenía Registro antes de `.visible`. `manifest.webmanifest` no cambia: la app instalada reabre la tarjeta viva por `source=pwa`. `test-v368-canonical-home-entry.mjs`, la prueba Chromium móvil con Match Play persistido, la caché V368 y los candados acumulados separan explícitamente enlace web de reapertura instalada.

Archivos literales: `AGENTS.md`, `DIRECTRICES_MANDATORIAS.md`, `REGISTRO_REINCIDENCIAS_CALIDAD.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V368_ENTRADA_CANONICA/REPORTE_V368_RC040.md`, `index-grupal.html`, `service-worker.js`, `test-v357-ios-voice-transport-recovery.mjs`, `test-v361-synchronized-voice.mjs`, `test-v364-explicit-new-round-entry.mjs`, `test-v366-principal-entry-recovery.mjs`, `test-v368-canonical-home-entry.mjs`, `audit-project.mjs`, `package.json`, `scripts/rebuild-inventory-pdfs.py`, ambos ROADMAPS e inventario. Producción no cambia; Preview y PASS físico iPhone siguen bloqueantes.

### V368-LAB-R1 · reparación documental del despliegue

El fallo de Vercel se limita al control documental: `ROADMAP_OVERALL.md` llegó con codificación inválida y el commit anterior no incluyó `ROADMAP_A_DETALLE.md`. Este corte publica ambos ROADMAPS en UTF-8 y recalcula `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, sin modificar la aplicación, Producción ni Individual.

## V369 · recuperación física de voz, clima y tráfico · 3 de septiembre de 2026

| Archivo exacto | Cambio localizado | Candado |
|---|---|---|
| `index-grupal.html` | Política de voz masculina neutral a 0.90; la intención universal finaliza en el primer `onend` con transcripción y no reabre el micrófono; firma V369. | Clima audible y comprensible; comunicación universal devuelve el control a Score. |
| `api/voice-speech.js` | Cedar directo y Onyx Gateway generan audio a 0.90. | Los dos proveedores respetan la misma velocidad. |
| `api/universal-ai.js` | “aquí/acá/mi ubicación/ubicación actual/donde estoy” se resuelve mediante GPS consentido; la voz conserva la profundidad, investigación, comparación, evidencia y matices del texto, cambiando sólo el formato audible. | La ruta se reintenta con coordenadas del teléfono; destino exacto continúa obligatorio; queda prohibido comprimir universal a 3–6 oraciones. |
| `service-worker.js` | Caché acumulada V369. | Safari no reutiliza el shell V368. |
| `test-v356-voice-only-cedar-quality.mjs`, `test-v357-ios-voice-transport-recovery.mjs`, `test-v361-synchronized-voice.mjs`, `test-v362-physical-voice-recovery.mjs`, `test-v369-physical-voice-weather-traffic-recovery.mjs` | Regresión de 0.90, locutores Cedar/Onyx, cierre universal de un turno y origen GPS. | Un FAIL bloquea Preview. |
| `audit-project.mjs`, `package.json` | V369 forma parte de la auditoría maestra y tiene comando explícito. | No puede omitirse en el candidato. |
| `scripts/rebuild-inventory-pdfs.py`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` | Portadas y sello identifican V369 y recalculan el árbol exacto. | El inventario no puede presentarse como V368. |
| `REGISTRO_REINCIDENCIAS_CALIDAD.md`, ambos ROADMAPS e inventario | RC-041 y trazabilidad exacta. | Automático, Preview y físico se reportan por separado. |

Producción e Individual no se modifican. La evidencia automática no sustituye la prueba física iPhone ni la comparación viva de clima/tráfico.
## V370 · recuperación de español nativo y turno físico cerrado · 3 de septiembre de 2026

| Archivo | Cambio verificable | Criterio |
|---|---|---|
| `index-grupal.html` | Voz local obligatoriamente `es-*` y masculina, con prioridad latinoamericana/castellana; sin caída a Cedar/Onyx/inglés/Spanglish; conversación universal por endpoint profundo; `micTrack.enabled=false` antes de pensar; VAD 900 ms, silencio 1200 ms, primer resultado 8000 ms, respuesta 15000 ms e inactividad 12000 ms. | Ninguna respuesta universal vuelve automáticamente a `ESCUCHANDO`; el próximo turno exige un nuevo toque. Si no existe locutor español masculino, se bloquea el audio con mensaje explícito. |
| `service-worker.js` | Caché acumulada V370. | El iPhone no conserva la ruta V369. |
| `test-v370-native-spanish-fast-close.mjs` | Fija prioridad española, orden de respaldos, cierre físico y ausencia de `response.create` Realtime dentro de conversación universal. | Un FAIL bloquea Preview. |
| `REGISTRO_REINCIDENCIAS_CALIDAD.md` | RC-042 conserva tiempos observados, 429 del TTS, causa, escape y candado. | No declarar equivalente a ChatGPT sin medición física comparable. |

Estado: candidato local; Producción intacta; auditoría completa, Preview y PASS audible iPhone pendientes.
### V371-R1 · restauración estricta del flujo y cambio exclusivo de voz

Alcance funcional: `index-grupal.html` y caché de `service-worker.js`. Se restauran sin variación los tiempos V370: silencio Safari 1.2 s, primer resultado 8 s, cierre conversacional inactivo 12 s, entrada bloqueada 8/12 s y respuesta bloqueada 15 s. La única diferencia operativa es la voz: velocidad 0.90, prioridad `es-MX`, respaldo limitado a `es-*`, prohibición de `en-*`, Cedar y Onyx, y reproducción con `lang="es-MX"` aunque la lista de voces todavía no esté disponible. Las APIs y el transporte de Comunicación Universal, clima y tráfico no cambian. Las pruebas afectadas sólo sincronizan los contratos restaurados y bloquean el retorno silencioso por catálogo vacío. Producción permanece intacta.

### V371-R2 · contrato real de inicio de voz Safari

Las capturas físicas rechazaron V371-R1: la consulta transitó `ESCUCHANDO → RESPONDIENDO`, pero Safari no inició audio. El cambio queda limitado a la salida universal: `speechSynthesis` se activa dentro del toque original y una respuesta sólo cuenta como hablada después de `utterance.onstart`; si no comienza en 2 s, se cancela y muestra error recuperable. Registro, dictado de scores, escritor, cálculos, persistencia, tarjeta, clima, tráfico y Producción permanecen intactos. `service-worker.js` invalida la copia R1 y `test-v370-native-spanish-fast-close.mjs` bloquea el falso éxito sin `onstart`.

### V371-R3 · audio mexicano servidor para Safari

Las pruebas físicas del Preview R2 y los logs de las 15:06–15:07 Guatemala confirmaron `/api/universal-ai` 200 seguido de `browser_fallback_query_failed`: la respuesta existía, pero Safari no disparó `utterance.onstart`. El cambio se limita a la salida audible universal. `/api/voice-speech` genera MP3 con Onyx a 0.90 e instrucciones estrictas de español mexicano neutro; el elemento `Audio` activado en el toque reproduce el MP3 y sólo declara éxito después de `onplay`. La voz local `es-*` queda como último respaldo. Registro, dictado y aplicación de scores, cálculos, persistencia y tarjeta no se modifican. Producción permanece intacta.

### V371-R4 · reemplazo puntual de la voz anglófona del Gateway

El log físico del Preview R3 registró `POST /api/voice-speech 200` después de `cedar speech direct fallback {"status":429}`. Por tanto, la voz escuchada no provenía de las instrucciones mexicanas del modelo directo, sino del respaldo `tts-1-hd + Onyx`, que el propietario rechazó por acento Spanglish. R4 cambia únicamente ese respaldo a la voz masculina `echo`, agrega `language="es-MX"`, conserva velocidad 0.90 y actualiza el rótulo/caché. Registro, Score, cálculos, persistencia, clima, tráfico y Producción permanecen intactos.

### V371-R5 · candado de idioma del contenido universal

La salida audible R4 reprodujo texto en inglés porque `api/universal-ai.js` aún ordenaba responder en el idioma detectado del usuario. Se reemplazan únicamente las tres instrucciones permisivas —conversación universal, seguimiento meteorológico y seguimiento de tráfico— por español neutral latinoamericano obligatorio, con prohibición expresa de inglés y Spanglish aun cuando Safari entregue una transcripción mixta. `test-v371-spanish-only-universal.mjs` verifica las tres rutas y se integra a `audit-project.mjs` y `package.json`; `scripts/rebuild-inventory-pdfs.py` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` sellan el árbol. No cambia `index-grupal.html`, Registro, Score, cálculos, persistencia, clima estructurado, tráfico estructurado ni Producción.
