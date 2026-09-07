Warning: truncated output (original token count: 62293)
Total output lines: 2217

# ROADMAP A DETALLE

## V406-R10 · 7 de septiembre de 2026

`live-hub.html/js` añade la portada Centro de Torneos, estado local para cinco accesos y enlaces `shared=1` de sólo lectura. `live-control.js` dirige TORNEO LIVE al Centro y permite que varias scorecards del mismo grupo se conecten sin nombrar capitán. `api/live.js` elimina la exclusividad por nombre de grupo; `tournamentPlayers()` consolida por grupo, jugador y hoyo, conserva el primer valor recibido por el agregador e identifica discrepancias. Release `V406-R10-CENTER-MULTI-TOURNAMENT-20260907`; caché `v406-r10-center-multi-tournament`. MAIN no cambia.

El commit de cierre conserva íntegro `index-grupal.html` R9; la señal de actualización R10 procede de `ACTIVE_CACHE_NAME`.

## V406-R9 · 7 de septiembre de 2026

`live-hub.html` cambia exclusivamente la opción `all` a `GENERAL`. `test-v406-tournament-categories.mjs` exige la nueva etiqueta y proscribe la anterior. Release `V406-R9-RESTORE-LIVE-GENERAL-20260907`; caché `v406-r9-restore-live-general`. MAIN no cambia.

## V406-R8 · 7 de septiembre de 2026

`live-hub.js` recupera el estado vacío original de `hubSearchResults` cuando no existe consulta. Así evita que las 67 tarjetas individuales empujen hacia abajo `hubSummary`, `hubCategory`, `hubCategoryCardToggle` y `hubLeaderWrap`. La búsqueda conserva orden por primer nombre, color de categoría y C de Campeonato; el motor R7 conserva hoyos únicos, actualización cada tres segundos, posición por score/mayor avance y estado HOYO/FINAL. Release `V406-R8-RESTORE-LIVE-LAYOUT-20260907`; caché `v406-r8-restore-live-layout`. MAIN no cambia.

## V406-R7 · 7 de septiembre de 2026

`live-hub.js` deriva hoyos, Gross, Neto y +/− desde una colección única por número de hoyo, publica HOYO ACTUAL/FINAL y ordena por resultado, luego mayor cantidad de hoyos. Esa misma regla alimenta GENERAL, categoría e Individual y se vuelve a ejecutar en cada sondeo de tres segundos. La lista para Mi Tablero se muestra completa, ordenada por primer nombre y con categoría coloreada; Campeonato usa C sobre fondo blanco.

`index-grupal.html` asigna al seleccionar categoría las marcas iniciales Campeonato/Negro, A/Azul, B-C-D/Blanco, Femenina/Rojo, Senior/Blanco y S.Senior/Amarillo, conservando la posibilidad de modificación manual posterior. `test-v406-tournament-categories.mjs` fija desempate −3 hoyo 9 sobre −3 hoyo 6, deduplicación de hoyos, colores, GENERAL y frecuencia. Release `V406-R7-LIVE-CATEGORIES-BY-HOLE-20260907`; caché `v406-r7-live-categories-by-hole`. MAIN no cambia.

## V406-R6 · 7 de septiembre de 2026

`live-control.js` agrega `demo=1` únicamente cuando TORNEO LIVE se abre sin token. `live-hub.js` usa ese indicador para construir en memoria 67 participantes temporales, repartidos 7 Campeonato, 6 A, 24 B, 11 C, 7 Femenina, 7 Senior y 5 S.Senior, agrupados de cuatro en cuatro. Clasificación, búsqueda y detalle consumen la misma colección de sólo lectura; ningún participante se persiste ni llega a la API LIVE.

`index-grupal.html` publica `V406-R6-TOURNAMENT-DEMO-PLAYERS-20260907` y `service-worker.js` identifica la caché `v406-r6-tournament-demo-players`. Las pruebas V406-R2/R4/R5 y V365 bloquean release o caché anteriores; `test-v406-tournament-categories.mjs` comprueba total y cantidades exactas. Se actualizan pendiente LIVE, continuidad, mapa maestro, reincidencias, ambos ROADMAPS y el sello de inventario. MAIN no cambia.

## V406-R5 · 7 de septiembre de 2026

Control maestro preservado: punto de corte `línea 185`; activación `23 de agosto de 2026, 17:05:00, hora de Guatemala`.

`index-grupal.html` incorpora el acceso directo a Torneo Live. `live-control.js` conserva la operación del organizador dentro de un panel cerrado y presenta primero `VER JUGADORES`. `live-hub.html`, `live-hub.js` y `gsc-design-system.css` reducen la experiencia del invitado a pegar enlace, buscar nombre, filtrar categoría y elegir favoritos. `test-v406-r5-simple-tournament-live.mjs` impide que vuelva el flujo saturado.

`ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` registran y sellan la corrección documental del despliegue.

- V406-R4 amplía `test-v406-tournament-categories.mjs` con 67 jugadores de prueba y la distribución exacta solicitada (7 Campeonato, 6 A, 24 B, 11 C, 7 Femenina, 7 Senior y 5 S.Senior); valida el total y cada filtro de categoría sin persistir datos de prueba.

## V406-R4 · 7 de septiembre de 2026

index-grupal.html crea roundUtilityBar, rotula CATEGORÍA/MARCAS y crea roundSecondaryActions. live-control.js inserta LIVE en esa barra. service-worker.js activa v406-r4-mobile-controls. test-v406-r4-mobile-controls.mjs bloquea regresiones. El banco temporal suma 67 jugadores: 7 Campeonato, 6 A, 24 B, 11 C, 7 Femenina, 7 Senior y 5 S. Senior.

- V406-R3: `index-grupal.html` cambia `gscg-release` y `service-worker.js` cambia `ACTIVE_CACHE_NAME`. Los candados `test-v365-active-round-empty-recovery.mjs` y `test-v406-r2-professional-design.mjs` prueban el nuevo contrato sin tocar lógica funcional.

## V406-R2 LAB candidato · 7 de septiembre de 2026

Archivos de diseño y control modificados: `gsc-design-system.css`, `index-grupal.html`, `live-hub.html`, `live-hub.js`, `api/live.js`, `live-control.js`, `service-worker.js`, `DATABASE_ARCHITECTURE.md`, `test-v365-active-round-empty-recovery.mjs`, `test-v406-tournament-categories.mjs` y `test-v406-r2-professional-design.mjs`.

Contrato visual: mínimo táctil 44 px; campos móviles 48 px y texto 16 px; Registro por jugador en dos líneas manteniendo Categoría inmediatamente a la derecha de Nombre; TORNEO LIVE con menor densidad y ranking móvil sin scroll lateral para datos esenciales.

Cabecera LIVE de categoría: fecha automática en zona `America/Guatemala`, nombre del torneo, modalidad y categoría en jerarquía grande. La tabla primaria presenta `POS`, `NOMBRE`, `HDCP`, `MARCAS`, `GROSS`, `NETO` y `+/−`; la matriz completa de hoyos queda como segundo nivel de detalle.

La Vista detallada de categoría no es una Score Card nueva. Deriva en memoria una matriz temporal con la cantidad real de inscritos en esa categoría —14, 20, 22, 30 u otra— desde las Score Cards publicadas por sus foursomes; no existe cupo fijo ni filas de relleno por categoría. Mezcla todos los grupos y ordena de líder a peor resultado tras cada actualización. Muestra hoyos 1–18 como Gross/Neto/resultado y totales IN/OUT/TOTAL, sin escribir, archivar, exportar ni duplicar scores. El foursome se conserva únicamente como referencia secundaria.

Capacidad garantizada por servidor: una Score Card publica entre 1 y 6 jugadores y el conglomerado se pagina por grupos. `api/live.js` toma bloqueo `FOR UPDATE` del torneo en las operaciones de publicar y unir, vuelve a contar los jugadores visibles activos dentro de la misma sentencia y rechaza cualquier resultado superior a 100 con `409 LIVE_TOURNAMENT_CAPACITY_REACHED`. `test-v406-tournament-categories.mjs` conserva el contrato del límite, la transacción y su mensaje visible.

Pendiente físico: capturas y recorrido en iPhone/Safari de Registro, TORNEO LIVE, Mi Tablero y tarjetas. Producción permanece intacta.

## V406-R1 LAB candidato · 7 de septiembre de 2026

| Área | Implementación |
|---|---|
| Registro | Columna `CATEGORÍA` a la derecha del nombre; selector individual de ocho valores. |
| Regla torneo | Impide iniciar un torneo si un jugador registrado no tiene categoría; una ronda casual admite categoría vacía. |
| Datos | `tournamentCategory` pertenece al jugador y se normaliza en recuperación y persistencia. |
| Tarjetas | La tarjeta global conserva y presenta la categoría individual. |
| LIVE | Cliente y API transportan una clave validada; el Centro construye un índice oculto por categoría. |
| TORNEO LIVE | Selector de categoría, buscador y clasificación filtrada; `MI TABLERO` sigue jugadores de categorías distintas. |
| Móvil | Vista progresiva de una sección a la vez y corrección del traslape ATRÁS/ACTUALIZAR. |
| Pruebas | `test-v406-tournament-categories.mjs`, V352, V353, V365, artefactos, Gate e Intocables. |

Pendiente físico: revisar Registro, TORNEO LIVE y tarjetas en iPhone/Safari antes de declarar V406 estable.

## V405-R4 LAB estable · 7 de septiembre de 2026

| Control | Evidencia/resultado |
|---|---|
| Identificación final | `index-grupal.html` usa `V405-R4-LAB-STABLE-20260907`; `service-worker.js` usa `v405-r4-lab-stable`; la prueba V365 fija ambos. |
| ACTUALIZAR físico | En iPhone detectó R3 sin refresco, parpadeó verde, actualizó y volvió a oscuro. |
| BORRAR TODO físico | El propietario confirmó funcionamiento correcto en Registro iPhone. |
| Vercel Toolbar | Preview/Preproducción `Off`; Producción `Default`; la configuración se aplica mediante un deployment nuevo de LAB. |

Pendiente: comprobar físicamente que V405-R4 ya no inyecte Toolbar y continuar tarjetas digitales 4/4. MAIN no cambia.

## V405-R3 LAB · prueba física del parpadeo ACTUALIZAR · 7 de septiembre de 2026

| Archivo | Cambio mínimo | Aceptación |
|---|---|---|
| `index-grupal.html` | Release `V405-R3-LAB-UPDATE-BLINK-TEST-20260907`. | V405-R2 consulta el mismo dominio al iniciar, al volver al primer plano y cada 30 segundos; al detectar R3 habilita `ACTUALIZAR`, lo vuelve verde y anima. |
| `service-worker.js` | Caché `v405-r3-update-blink-test`. | Al pinchar, carga R3 sin borrar almacenamiento local. |
| `test-v365-active-round-empty-recovery.mjs` | Identificadores R3 y contrato del botón. | Rechaza release o caché anterior. |

Frontera: prueba temporal únicamente en LAB. Sin cambios en MAIN, Producción, datos, Registro, scores, historial, tarjetas, Comunicación Universal ni Intocables.

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

Archivos exactos V325: `index-grupal.html`, `service-worker.js`, `audit-project.mjs`, `test-v325-ideal-microphone-timings.mjs`, `test-v324-real-traffic.mjs`, `test-v323-long-multitopic-context.mjs`, `test-v322-real-sustained-caddie.mjs`, `test-v312-general-caddie.mjs`, `test-stableford-ui.mjs`, `test-v272-definitive-operational-release.mjs`, `test-v274-complete-courses-voice-operations.mjs`, `test-v275-stable-live-voice-turns.mjs`, `test-v276-manual-hole-navigation.mjs`, `test-v277-official-round-corrections.mjs`, `test-v278-card-image-pdf-export.mjs`, `test-v279-local-card-library.mjs`, `test-v280-local-history-insights.mjs`, `test-v281…42293 tokens truncated…OS.md`, `scripts/rebuild-inventory-pdfs.py` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`. Producción permanece intacta; Preview y prueba física iPhone son puertas independientes.

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

Sello remoto atómico: `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` se modifican juntos. Los builds rechazados por Gate permanecen descartados y no generan enlace para el usuario.

## V369 · hotfix LIVE `p1..p6` · 29 de agosto de 2026

- Entrada física: `NO SE PUDO COMPLETAR LIVE`; observabilidad: tres `POST /api/live 400`.
- Causa: `normalizePlayer()` conserva `p1..p6`, pero `api/live.js` rechazaba todo ID menor de ocho caracteres.
- Cambio mínimo: `ID_PATTERN` LIVE admite 1–160 caracteres seguros; tokens y secretos mantienen sus 40–100 caracteres.
- Prueba permanente: `test-v352-live.mjs` normaliza explícitamente jugadores `p1` y `p2`.
- Frontera: cero cambios en voz, Registro, Score, clima, tarjeta o escritor oficial.

## V370 · Match Play LIVE sin plantilla General · 29 de agosto de 2026

- `live-view.js` transforma el snapshot sólo lectura a la estructura del motor `match-play.js`.
- Una ronda sin scores muestra nombres emparejados y `MATCH POR INICIAR`.
- Cada score posterior actualiza únicamente estado de hoyo y posición `UP/DOWN/AS`; no muestra Gross/Neto General.
- `live.html` carga el motor Match antes del visor con versión V370 y mantiene `no-store`.
- `test-v352-live.mjs` exige nombres, estado inicial vacío y ausencia de `GROSS`, `NETO` y `SCORE CARD` dentro del bloque Match.

## V371 · lectura Match directa y candado físico del micrófono · 29 de agosto de 2026

- `live-view.js`: cada hoyo publica Gross y, sólo cuando existe ganador/perdedor, flecha más posición acumulada; el empate publica `—`.
- `live-view.js`: el encabezado muestra ambos lados, por ejemplo `JAIME 1 UP · GUSTAVO 1 DOWN`, sin obligar a contar flechas.
- `live.html`: usa activos V371 sin caché y aumenta la altura de casilla para Gross + resultado.
- `test-v352-live.mjs`: prueba Gross 4/5, `▲ 1 UP`, `▼ 1 DOWN`, empate con guion y cero flecha repetida.
- `Intocables/MICROFONO_APROBADO.lock.json`: manifiesto SHA-256 de voz aprobada y once bancos inmutables.
- `Intocables/intocables-gate.mjs`, `README.md` y `REGLAS_INTOCABLES.json`: nueva regla INT-05; una diferencia de hash o un banco fallido bloquea la versión.
- `scripts/rebuild-inventory-pdfs.py`, lock y tres PDF V311: sello `V371-MATCH-GROSS-MICROPHONE-LOCK` con las nuevas fuentes.
- Frontera: `index-grupal.html`, Registro, Score, parsers, captura, micrófono, AI UNIVERSAL y ronda activa no cambian.

## V397 LAB · cinco tarjetas centrales y sesión persistente · 6 de septiembre de 2026

| Archivo | Función | Control |
|---|---|---|
| `account-backup.js` | `officialRoundsForBackup()` filtra tarjetas oficiales y deduplica por ID. | Cinco IDs distintos producen cinco rondas; duplicados y borradores quedan fuera. |
| `index-grupal.html` | `backupCentralNow()` encola cada ronda histórica con `roundOverride`; informa el total exacto. | Nunca vuelve a declarar completo un respaldo de una sola ronda cuando existen cinco oficiales. |
| `index-grupal.html` | Recuerda nombre/correo, conserva cookie de sesión y habilita el gestor de contraseñas Safari. | Cero contraseña en `localStorage`; desconexión sólo por botón explícito. |
| `test-v282-optional-account-backup.mjs` | Caso permanente 5 + duplicado + borrador y controles de credenciales. | Bloquea reincidencia RC-044 y almacenamiento inseguro de contraseña. |

### Auditoría revocatoria RC-046

| Fuente exacta | Función corregida | Control bloqueante |
|---|---|---|
| `index-grupal.html` | Rotula el primer acumulado como IN (1–9), el segundo como OUT (10–18) y conserva TOTAL; muestra `ATRÁS` también con ronda cerrada. | Las cuatro modalidades operativa/final se abren individualmente. |
| `card-artifacts.js` | Añade tabla explícita IN/OUT/TOTAL a cada Global y Personal sin alterar las sumas. | Los ocho artefactos exigen evidencia posterior individual. |
| `index-grupal.html` · `artifactViewerHtml()` | La tarjeta abierta contiene la barra única `ATRÁS` + `ENVIAR TARJETA DIGITAL`; impresión la oculta. | Retorno, persistencia, área táctil y cero superposición. |
| `test-v397-card-in-out-back-contract.mjs` | Genera ocho variantes con 1–9=36, 10–18=45, total=81; Stableford 18/9/27. | Bloquea etiquetas invertidas; no sustituye la inspección visual. |
| `AUDITORIA_TARJETAS_IN_OUT_ATRAS_V397.md` | Revoca el PASS anterior e inventaría 16/16 FAIL iniciales. | Sin captura individual no existe PASS. |

Resellado remoto RC-046: `tableHeader()` queda incluido expresamente en el contrato IN=1–9, OUT=10–18. ROADMAP general y detallado se actualizan juntos antes del nuevo Preview; el deployment anterior queda rechazado y no aporta evidencia.

RC-046-R2: el navegador real remoto abrió FOUR BALL sobre el deployment `4b1c04f` con datos 36/45/81. La tabla principal estaba correcta, pero `renderRoundManualEntry()` conservaba `${metric} OUT` antes de `${metric} IN`; `V397-FAIL-04-operativa-four-ball.jpg` lo demuestra y el candidato queda rechazado. `index-grupal.html` invierte únicamente esos rótulos a IN/OUT, mientras `test-v397-card-in-out-back-contract.mjs` exige el orden nuevo y prohíbe el anterior. No cambian los acumulados de `roundManualPlayerRows()`, cálculos, persistencia, voz, Registro, LIVE ni Producción.

RC-046-R3: en la Tarjeta Digital Final se ocultan `artifactActions` y `officialCloseButton`; la cabecera muestra únicamente `ENVIAR TARJETA DIGITAL` y `ATRÁS`. `sendFinalCard` llama `shareOfficialArtifact(officialArtifacts().global)`, preservando el selector nativo para WhatsApp y sin intervenir en cálculos, voz, registro, persistencia o Producción.

Resellado de transporte RC-046-R3: el blob remoto inicial de `index-grupal.html` no coincidió con el blob Git local `b4e2412e2fef7594aee27d1a4b305f14b9c78b8b`; Intocables bloqueó ese despliegue. La reposición exacta recuperó todos los gates funcionales y manuales, y este registro simultáneo en ambos ROADMAPS cierra el requisito de atomicidad documental antes de un nuevo Preview.

Regresión ejecutada: cuenta/respaldo, payload maestro, cola idempotente, motor Score y 74 paquetes funcionales consecutivos PASS. El deployment automático del commit `59ce0183e085175b9609c93a5962ff2baa58b123` fue rechazado por inventario desactualizado; `scripts/rebuild-inventory-pdfs.py` regeneró `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` desde el árbol remoto limpio. El resellado documental se prueba y publica únicamente en el proyecto LAB; Producción no se modifica.

Configuración LAB: `vercel.json` ejecuta `node audit-project.mjs`. V328 LIVE no forma parte del build mientras Preview carezca de clave; 114 paquetes deterministas, Intocables, controles editorial/visual, Roadmap e inventario permanecen obligatorios.

| Refinamiento Historial V397 | Función | Control |
|---|---|---|
| `card-library.js` | Orden por `playedAt` y búsqueda por fecha ISO, numérica, mes corto o completo. | Una fecha visible localiza la ronda guardada sin alterar el snapshot. |
| `index-grupal.html` | Ocho rondas por página, navegación anterior/siguiente, doble toque para abrir Global original y único botón `ENVIAR TARJETA DIGITAL`. | Elimina Global/PDF/Personal/Estadísticas como controles visibles del Historial. |
| `test-v279-local-card-library.mjs`, `test-v282-optional-account-backup.mjs` | Fijan interfaz, paginación, fecha, envío, aislamiento de `ATRÁS`, contraseña visible y recuerdo inmediato de nombre/correo. | La contraseña nunca se guarda; Producción no cambia. |

## V398 · apertura del Control Manual en el hoyo correcto

| Fuente | Cambio limitado | Control |
|---|---|---|
| `index-grupal.html` · `preferredManualHole()` | Invalida el hoyo visual residual cuando cambia `round.id`; abre en el primer pendiente y mantiene navegación dentro de la misma ronda. | Vacía→1; parcial→primer pendiente; completa/Match limitada→límite aplicable. |
| `test-v398-manual-opening-hole.mjs` | Ejecuta el contrato para General, Stableford, Match Play y Four Ball. | Rechaza que una ronda nueva herede hoyo 18 de otra ronda. |

Frontera: no cambian cálculos, scores, persistencia, voz, Registro, comunicación universal, artefactos ni Producción. La pulsación prolongada para eliminar desde Historial queda registrada como trabajo posterior y no se mezcla con RC-048.
# V398 · APERTURA DE HOYO E HISTORIAL ELIMINABLE — 06 SEPTIEMBRE 2026

| Fuente | Cambio verificable |
|---|---|
| `index-grupal.html` | Identidad de ronda gobierna hoyo inicial; pulsación prolongada abre confirmación de eliminación; IDs eliminados quedan excluidos del rearchivo automático. |
| `test-v398-manual-opening-hole.mjs` | Verifica General, Stableford, Match Play y Four Ball: vacía→1, parcial→pendiente, misma ronda→selección conservada. |
| `test-v398-history-long-press-delete.mjs` | Verifica gesto, confirmación, eliminación local y no reaparición. |

El primer build V398 fue rechazado porque ROADMAP OVERALL no nombraba literalmente la prueba nueva; el segundo, porque el resellado no actualizó ambos ROADMAPS. Ambos rechazos permanecen registrados y Producción no cambió.

La revisión en Chrome remoto móvil detectó que `pointerleave` podía cancelar una pulsación todavía sostenida. Se eliminó únicamente esa cancelación; `pointerup` y `pointercancel` permanecen como terminaciones explícitas.

Se añadió `contextmenu` como evento compatible de pulsación prolongada; comparte el mismo diálogo y conserva la confirmación obligatoria.

## V399 LAB · REGÍSTRATE sólo principal + filtros exactos + restauración V378 · 6 de septiembre de 2026

- `index-grupal.html`: se retiran `accountBackupButton` y `accountBackupButtonStableford`; sólo permanece `accountBackupButtonSetup` en la pantalla principal.
- `test-v397-card-in-out-back-contract.mjs`: exige una sola aparición de `REGÍSTRATE`, ubicada en principal, y conserva el contrato IN 1–9, OUT 10–18, TOTAL y ATRÁS.
- `test-v279-local-card-library.mjs`: ejecuta límite máximo de ocho, orden descendente y filtros por modalidad, campo y combinación modalidad+campo.
- `test-v398-manual-opening-hole.mjs`: ejecuta cuatro modalidades con vacía→hoyo 1, parcial→primer pendiente y navegación interna conservada.
- `api/voice-speech.js`: restauración exacta SHA-256 `dd4597f6c60b0800adc990c7d99256ea5dfd13ac219b70292587718704ca5fee`, Fish Audio `s2.1-pro-free`, `es-419`, velocidad `0.90`, sin ID fijo.
- `Intocables/APROBACION_FISICA_REGISTRO_SCORES_V378.json` y `Intocables/CONFIRMACION_ESCRITA_V378.md`: fijan la aprobación del 4 de septiembre de 2026 y excluyen el tiempo de 22 segundos de Comunicación Universal.
- `Intocables/intocables-gate.mjs`: compara siete regiones funcionales contra V378, valida la evidencia y ejecuta once bancos sellados.
- `Intocables/EVIDENCIA_V378/CONFIRMACION_FISICA_V378_JAIME_KIRSTE.jpeg`: evidencia escrita suministrada por el propietario.

Estado: contratos automáticos PASS; Producción intacta; revisión visual/física 1×1 en Preview LAB todavía obligatoria antes de declarar tarjetas PASS.

Trazabilidad del cierre: los dos primeros builds V399 fueron rechazados por el gate documental —primero por no enumerar las tres evidencias en OVERALL y después por no modificar ambos roadmaps en el mismo resellado—. Ninguno alcanzó READY ni modificó Producción.

Corrección visual RC-051: `renderPlayerEditControls()` muestra `backToRegistrationButton` también en Práctica y su manejador ejecuta `openNewRoundDraft()`. `test-v397-card-in-out-back-contract.mjs` exige visibilidad y retorno. Producción permanece intacta.

Bancos heredados alineados: `test-v262-provisional-optional-profile.mjs`, `test-v263-compact-players-back-button.mjs`, `test-v269-operational-matrix-demo.mjs`, `test-v288-stableford-one-touch-home.mjs` y `test-round-clock.mjs` ahora exigen Stableford o Práctica → principal, conservando General → editor.

RC-052 · recuperación real de respuestas en Preview: `api/universal-ai.js` deja de abortar cuando falta `OPENAI_API_KEY` y entra directamente por AI Gateway con OIDC; `api/golf-rules.js` aplica la misma autenticación conservando búsqueda obligatoria y dominios USGA/R&A. `test-v364-vercel-oidc-recovery.mjs` verifica Universal sin llave directa y `test-v328-official-golf-rules.mjs` verifica Reglas con token administrado. La voz V378, velocidad 0.90, umbrales, score, persistencia, tarjetas y Producción permanecen intactos.

Resellado de inventario RC-052: `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` incorpora los hashes actuales de las 400 fuentes. Los tres inventarios fueron regenerados por `scripts/rebuild-inventory-pdfs.py`; el primer deployment RC-052 permanece rechazado por `FAIL INVENTORY GATE` y no alcanzó ningún alias operativo.

RC-053 · reparación de entrada Stableford comprobada físicamente: `index-grupal.html` evalúa `document.readyState`; si la carga terminó ejecuta `openFreshStablefordSetup()` de inmediato y si continúa cargando conserva `DOMContentLoaded` con una sola ejecución. `test-stableford-ui.mjs` exige ambas ramas. No cambian scores, voz V378, umbrales, historial, otras modalidades ni Producción.

Compatibilidad RC-053: `test-v252-stableford-persistence-category-course.mjs` verifica el mismo contrato de carga inmediata y mantiene sus controles de persistencia, categoría y campo.

## V400 LAB · ronda activa multimodal persistente · 6 de septiembre de 2026

- `index-grupal.html` · `persist()`: toda ronda recuperable escribe `ACTIVE_ROUND_KEY`, incluida Stableford.
- `index-grupal.html` · `loadRound()`: la clave canónica acepta General, Stableford, Match Play y Four Ball; la migración secundaria compara las cuatro por fecha.
- `test-v365-active-round-empty-recovery.mjs`: prueba Stableford con scores 4/5 frente a una Práctica antigua y exige que sobrevivan jugador, modalidad y scores.
- `test-v260-round-points-player-return.mjs`, `test-v267-one-operational-line.mjs`, `test-v363-intocables-behavior.mjs` e `Intocables/intocables-gate.mjs`: alinean el candado heredado y prohíben volver a excluir Stableford de la clave canónica.
- `service-worker.js` y pruebas V357/V361/V364/V365/V368: renuevan la caché instalada con la firma V400 sin retirar ninguna protección anterior.
- Aceptación física pendiente del nuevo Preview: scores → reapertura PWA → primer pendiente; Nueva Ronda confirmada → reapertura → cero datos viejos y hoyo 1.
- Producción, voz V378, Comunicación Universal, cálculos y tarjetas digitales permanecen intactos.
- RC-054-R2 · `index-grupal.html` y `test-stableford-ui.mjs`: la selección explícita Stableford desde Nueva Ronda abre siempre registro limpio aun cuando exista una Stableford recuperable; no borra la anterior hasta confirmar OK.

## RC-055 · cierre visible previo al envío WhatsApp · 6 de septiembre de 2026

- `index-grupal.html`: muestra `FINALIZAR RONDA` mientras la tarjeta completa aún no es oficial; tras cerrarla lo oculta y muestra `ENVIAR TARJETA DIGITAL`.
- `test-v397-card-in-out-back-contract.mjs`: bloquea una tarjeta completa imposible de cerrar o compartir.
- Producción no cambia; las cuatro imágenes requieren reprueba física en LAB.

RC-055-R2 · `shareOfficialArtifactImage()` convierte la tarjeta oficial a PNG antes de compartir. `sendFinalCard` apunta obligatoriamente a esa función y el respaldo también descarga PNG.

## V401 · RC-056 · restauración física del micrófono principal

- `index-grupal.html`: repone `releaseAiUniversalPlaybackForListening()` antes de `fireMicActivation()`, descargando únicamente el audio de salida previo para permitir escucha.
- `test-v397-card-in-out-back-contract.mjs`: exige que la función llamada exista.
- `service-worker.js` y `test-v365-active-round-empty-recovery.mjs`: caché V401 para actualizar la PWA instalada.
- No cambian umbrales, sensibilidad, cierre, registro/scores, voz Fish Audio V378 ni Producción.


## RC-057 · NUEVA RONDA limpia y vuelve a Registro · 6 de septiembre de 2026

- `index-grupal.html`: `NUEVA RONDA` archiva la ronda anterior, elimina las claves activas de todas las modalidades, crea `blankRound()` sin jugadores ni scores, reinicia hoyo 1 y abre Registro.
- La ronda archivada permanece disponible en Historial; Producción permanece intacta.
- El mismo cambio restaura las acciones ABRIR/IMAGEN/PDF Global y Personal del Historial para recuperar las tarjetas oficiales guardadas.

RC-057-S1: sello de inventario atómico posterior a la corrección de NUEVA RONDA e Historial; 400 fuentes verificadas. Producción intacta.

RC-057-S2: el build de S1 fue rechazado porque el digest se calculó antes de incorporar la edición final de ambos ROADMAPS. Se recalcula el sello desde el árbol completo ya actualizado y se versionan juntos `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`. No cambia código funcional ni Producción.

RC-057-S3: la auditoría integral rechazó el panel de acciones múltiples restaurado en Historial porque contradecía el contrato V397. Se conserva el flujo aprobado: doble toque abre la tarjeta Global real y el visor ofrece únicamente `ENVIAR TARJETA DIGITAL` y `ATRÁS`. V278–V282 y V397 PASS; Producción intacta.

RC-057-S4: `test-v364-explicit-new-round-entry.mjs` deja de exigir la conservación activa anterior y fija la orden vigente: archivar, eliminar las seis claves activas, limpiar borrador, crear `blankRound()` sin jugadores/scores y abrir Registro. V358/V363/V365/V366/V368 e Intocables continúan PASS; Producción intacta.

RC-057-S5: `inicio=1` usa `openRegistrationPreservingActiveRound()`; sólo `nueva_ronda=1` o el botón ejecutan `openNewRoundDraft()`. Pruebas dirigidas V358/V364/V365/V366/V368/V397 e Intocables PASS. Producción intacta.

RC-057-S6: Comunicación Universal reconoce referencias amplias a la ubicación actual y solicita GPS; su VAD pasa de 2.2 s a 1.1 s, las consultas normales usan perfil bajo de 1,400 tokens y el micrófono se cierra en verde al terminar cada respuesta. Las consultas profundas conservan perfil medio. V312/V324–V327/V335/V356 e Intocables PASS; Producción intacta.

## V402 LAB · Fish Audio es-419 sin ceceo y latencia acotada · 7 de septiembre de 2026

- `api/voice-speech.js`: conserva `fish-audio/s2.1-pro-free`, `es-419`, velocidad `0.90` y ausencia de ID fijo; cambia sólo la dirección vocal a español latinoamericano natural para Guatemala, prohíbe ceceo/acento de España y reduce el timeout `45,000→22,500 ms`.
- `index-grupal.html`: el respaldo local queda prohibido para respuestas en español; una falla de Fish ya no puede sustituirse por la voz castellana instalada en Safari.
- `api/universal-ai.js`: timeout `55,000→27,500 ms`; en modo voz, `maxOutputTokens` se reduce exactamente a la mitad (`brief 350`, `standard 700`, `deep 1,600`) manteniendo `low/medium` según profundidad.
- `test-v356-voice-only-cedar-quality.mjs` e `Intocables/intocables-gate.mjs`: exigen latinoamericano `es-419`, ausencia de ceceo/acento español, velocidad `0.90`, límites reducidos y bloqueo del respaldo castellano.
- `Intocables/APROBACION_FISICA_REGISTRO_SCORES_V378.json`, `Intocables/MICROFONO_APROBADO.lock.json` y `Intocables/CONFIRMACION_ESCRITA_V378.md`: registran la autorización expresa del cambio limitado; aprobación auditiva del candidato queda pendiente.
- `service-worker.js`: permanece byte compatible con V401; su estrategia `networkFirst` obtiene el HTML vigente sin romper los candados V357/V365.
- Producción permanece intacta; no cambian Registro, scores, sensibilidad, umbrales ni cálculo.

V402-S1 · `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`: resellado atómico contra los PDF remotos existentes; sin cambios funcionales ni de Producción.

## V403 LAB · cierre interno `aborted` sin falso error · 7 de septiembre de 2026

- `index-grupal.html`: dentro de `recognition.onerror`, sólo `transportFailure==="aborted" && browserVoiceStopping` limpia `browserVoiceErrored` y llama `finalizeBrowserVoiceFallback`; cualquier aborto externo mantiene la ruta de error.
- `test-v357-ios-voice-transport-recovery.mjs`: exige ambas condiciones y la finalización limpia.
- `Intocables/APROBACION_FISICA_REGISTRO_SCORES_V378.json` y `Intocables/MICROFONO_APROBADO.lock.json`: registran la autorización expresa y los dos hashes afectados.
- No cambian VAD, sensibilidad, umbrales, tiempos de captura, Fish Audio `es-419` `0.90`, Registro, scores ni Producción.

RC-058: el diálogo `ELIMINAR RONDA` bloquea selección de texto y menú Copiar/Buscar en iPhone mediante `user-select:none` y `-webkit-touch-callout:none`; confirmación y borrado permanecen iguales. `service-worker.js` usa `v401-rc058-fresh-shell` para que el dispositivo reciba también el flujo vigente de `NUEVA RONDA`. V364/V365/V368/V397/V398 e Intocables PASS. Producción intacta.

* RC-059 · `openFreshStablefordSetup()` archiva la ronda anterior, elimina todas las claves activas y limpia jugadores, scores, borradores y captura antes de mostrar Registro Stableford. Verificación física requerida en LAB; Producción intacta.

* RC-059 ATÓMICO · Ambos roadmaps registran conjuntamente la corrección Stableford derivada de prueba física; pendiente de repetición publicada antes de aprobación.

* RC-059 SELLO FINAL · Código, regresión, Roadmap Overall, Roadmap A Detalle e inventario quedan unidos en el mismo commit preventivo.

* RC-059 CIERRE V289 · El arnés aislado declara archivado, limpieza de claves y captura; V289/V364 validan NUEVA RONDA Stableford sin herencia cruzada.

* RC-060 · Registro Stableford oculta físicamente el main anterior mientras el overlay está visible; evita mostrar jugadores/scores archivados debajo del formulario vacío.

* RC-061 · Tráfico GPS acepta el conector «de acá para DESTINO»; la frase exacta «de acá para el parque central de la zona uno» resuelve origen GPS sin pedirlo al usuario.
# V404 LAB · RC-058-R2 · bloqueo de selección antes del diálogo · 7 de septiembre de 2026

| Archivo | Cambio limitado | Evidencia |
|---|---|---|
| `index-grupal.html` | Hace no seleccionable `.card-library-round` y sus descendientes; cancela `selectstart` solamente cuando el origen pertenece a `[data-library-round]`. | La pulsación de 650 ms conserva el gesto de eliminar sin abrir Copiar/Buscar. |
| `test-v398-history-long-press-delete.mjs` | Exige el candado CSS previo y el bloqueo de `selectstart`, además del diálogo y borrado persistente ya existentes. | `PASS V398`. |
| `service-worker.js` | Cambia únicamente `ACTIVE_CACHE_NAME` a `v404-rc058-prepress-selection-lock`. | Fuerza recepción del shell corregido en iPhone. |
| `test-v365-active-round-empty-recovery.mjs` | Actualiza el contrato de caché a la identificación V404 vigente. | Impide que el build acepte un shell anterior. |
| `REGISTRO_REINCIDENCIAS_CALIDAD.md` | Corrige causa raíz, punto de escape y estado de RC-058. | Captura física `IMG_2946.png`. |

Frontera: no cambian MAIN, Producción, voz V378, registro, scores, cálculos, tarjetas, persistencia ni confirmación de borrado. Puertas automáticas dirigidas, Intocables y Gate 0 PASS; Preview LAB y reprueba física iPhone permanecen pendientes.
# V405 LAB · actualización visible sin reinstalar · 7 de septiembre de 2026

| Archivo | Cambio | Control |
|---|---|---|
| `index-grupal.html` | Release separado `V405-LAB-UPDATE-BUTTON-20260907`; conserva intacto `gscg-build` V363; botón apagado por defecto y verde/parpadeante sólo cuando el release remoto cambia; actualización no bloqueante y `persist()` previo. | `test-v365-active-round-empty-recovery.mjs` e Intocables. |
| `service-worker.js` | Caché `v405-lab-update-button`. | Recepción del shell actualizado en el mismo dominio LAB. |
| `test-v365-active-round-empty-recovery.mjs` | Verifica botón deshabilitado, activación, animación, ausencia de `inert` y caché exacta. | Regresión permanente. |

Frontera: no cambia MAIN, Producción, almacenamiento, registro, scores, voz, historial ni tarjetas. La migración inicial desde un deployment de origen distinto permanece separada y debe comprobarse antes de borrar el icono LAB antiguo.

## Blindaje permanente de continuidad LAB · 7 de septiembre de 2026

| Archivo | Función | Control |
|---|---|---|
| `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md` | Fuente única de MAIN congelada, último LAB, V405, sesión/migración iPhone, pendientes y mensaje reutilizable. | Sólo se actualiza con evidencia y junto con ambos ROADMAPS. |
| `test-lab-continuity-master.mjs` | Exige commits, deployments, enlaces, separación MAIN/LAB, evidencia física y texto de relevo. | Un ancla ausente o alterada produce FAIL. |
| `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/MATRIZ_GATE_0_PROYECTO.json` | Incorpora el maestro a `requiredControls`. | Su ausencia bloquea Gate 0. |
| `audit-project.mjs` | Ejecuta el candado dentro de la auditoría integral. | La publicación LAB no puede omitirlo. |
| `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md` | Registran el blindaje en la misma modificación. | Conservan atomicidad documental. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Inventaría el maestro y su prueba. | Mantiene localizables las fuentes de continuidad. |
| `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` y tres PDF `Inventario_Golf_Score_Card_GT_*_V311.pdf` | Resellan 402 fuentes después del alta de los dos archivos. | `inventory-gate` bloquea cualquier diferencia posterior. |

Frontera: no se modifica MAIN, Producción, lógica funcional, datos, caché, voz, scores ni Historial.

## V405-R2 LAB · limpieza de Registro y reparación móvil de Tarjeta Digital

| Archivo | Cambio | Evidencia/control |
|---|---|---|
| `index-grupal.html` | `BORRAR TODO` limpia seis borradores; `gsc-final-card-open` oculta accesos globales; cabecera apilada y tabla con scroll interno en móvil. | `IMG_2949.png` es FAIL previo; no se borra archivo ni ronda activa. |
| `test-v405-registration-clear-final-mobile.mjs` | Comprueba borrado limitado, seis filas, aislamiento modal y geometría móvil. | Banco dirigido obligatorio en `audit-project.mjs`. |
| `service-worker.js`, `test-v365-active-round-empty-recovery.mjs` | Release/caché V405-R2. | El dominio LAB recibe el shell nuevo. |
| `REGISTRO_REINCIDENCIAS_CALIDAD.md` | Registra RC-062. | PASS físico permanece abierto hasta 4/4 modalidades en iPhone. |
| `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Conservan alcance, continuidad e inventario. | MAIN intacta. |
