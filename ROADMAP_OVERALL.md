Warning: truncated output (original token count: 54561)
Total output lines: 1681

# ROADMAP OVERALL

## V406-R5 · Torneo Live simple · 7 de septiembre de 2026

Control maestro preservado: punto de corte `línea 185`; activación `23 de agosto de 2026, 17:05:00, hora de Guatemala`.

- Acceso directo `TORNEO LIVE` desde la pantalla inicial.
- El invitado sólo ve el flujo `BUSCA · ELIGE · MIRA`; nombre y categoría quedan primero.
- Crear, unir, autorizar y administrar el torneo siguen disponibles bajo `ORGANIZAR TORNEO`, cerrado de forma predeterminada.
- Compartir, actualizar, salir y agregar enlaces externos quedan en `MÁS OPCIONES`.
- `test-v406-r5-simple-tournament-live.mjs` bloquea el regreso del proceso saturado.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` sella el inventario regenerado de esta entrega.

- V406-R4 fija como regresión permanente la verificación solicitada de 67 participantes: 7 Campeonato, 6 A, 24 B, 11 C, 7 Femenina, 7 Senior y 5 S.Senior, agrupados en foursomes y visibles por categoría sin cantidades artificialmente fijas.

## V406-R4 · Controles móviles sin traslape · 7 de septiembre de 2026

- LIVE, REGLAS, AI ∞ y Support pasan a una barra estructural debajo del encabezado.
- Registro nombra explícitamente los selectores vacíos CATEGORÍA y MARCAS.
- ATRÁS, BORRAR SCORES y + JUGADOR comparten una fila compacta.
- El banco visual temporal usa 67 participantes repartidos 7/6/24/11/7/7/5; test-v406-r4-mobile-controls.mjs conserva el candado de regresión.

- V406-R3 renueva exclusivamente el identificador publicado y la caché PWA para que los accesos instalados con V406-R2 detecten la actualización y activen el botón `ACTUALIZAR`; no modifica rondas, scores ni persistencia.

## V406-R2 LAB candidato · Diseño profesional, categorías y TORNEO LIVE · 7 de septiembre de 2026

- Se agregó `gsc-design-system.css` como hoja canónica exclusiva de TORNEO LIVE: espaciado, radios, superficies, foco, alturas táctiles y tipografía legible. Registro quedó consolidado dentro de su hoja histórica, sin una capa externa de sobrescrituras.
- Registro móvil conserva `NOMBRE → CATEGORÍA → HDCP → MARCAS`, pero distribuye cada jugador en dos líneas para evitar truncamiento: Nombre y Categoría arriba; Handicap y Marcas abajo.
- TORNEO LIVE reduce ruido en móvil, prioriza las pestañas de Clasificación/Mi Tablero, oculta instrucciones permanentes y simplifica columnas secundarias.
- La Vista detallada reúne dinámicamente a todos los jugadores que realmente tenga la categoría —por ejemplo 14, 20, 22 o 30— con hoyos 1–18 e indicadores Gross/Neto/resultado, más IN/OUT/TOTAL. No fija ni rellena una cantidad. Mezcla los foursomes y reordena toda la categoría de líder a peor resultado en cada actualización; el grupo sólo queda como referencia secundaria. Es visualización LIVE de sólo lectura; no crea otra tarjeta, archivo, PDF ni historial.
- `test-v406-tournament-categories.mjs` usa 30 jugadores como escenario visual de la categoría más poblada, comprueba además cantidades variables, mezcla de foursomes, orden líder→peor, 18 hoyos, IN/OUT/TOTAL y capacidad total de 100 participantes.
- Se agregó `test-v406-r2-professional-design.mjs` como candado contra el regreso a controles diminutos o la retícula comprimida.
- Capacidad comercial protegida: hasta 6 jugadores por tarjeta/grupo y máximo 100 jugadores activos por torneo. `api/live.js` bloquea el torneo dentro de la misma transacción tanto al publicar como al unir un grupo y rechaza al jugador 101 con `409 LIVE_TOURNAMENT_CAPACITY_REACHED`.
- `DATABASE_ARCHITECTURE.md` formaliza que categorías, clasificación y detalle son proyecciones de sólo lectura sobre snapshots LIVE; no crean tablas, tarjetas ni un segundo escritor.
- La cabecera de cada categoría muestra automáticamente fecha de Guatemala, nombre del torneo y modalidad; la categoría domina visualmente. Su clasificación inmediata usa `POS · NOMBRE · HDCP · MARCAS · GROSS · NETO · +/−` y el detalle por hoyo queda debajo.

## V406-R1 LAB candidato · Categorías y TORNEO LIVE · 7 de septiembre de 2026

- Registro incorpora `CATEGORÍA` inmediatamente después de `NOMBRE`, antes de `HDCP`, para cada jugador.
- Catálogo: Campeonato, A, B, C, D, Femenina, Senior y S.Senior; obligatorio cuando existe torneo y opcional fuera de torneo.
- La categoría viaja dentro del jugador por ronda, persistencia, snapshot oficial, tarjeta digital y LIVE.
- TORNEO LIVE crea un índice interno por categoría, permite llamar una clasificación aislada y buscar por jugador, grupo o categoría.
- `MI TABLERO` conserva una selección personal de jugadores de distintas categorías para el caso familiar o grupo de predilección.
- La pantalla principal no recibe controles adicionales; el análisis masivo queda en la página independiente TORNEO LIVE.
- Se separó `ATRÁS` de `ACTUALIZAR` en el Registro móvil. MAIN/Producción permanece congelado.

## V405-R4 LAB estable · cierre de prueba ACTUALIZAR y Toolbar apagada · 7 de septiembre de 2026

- Retira la identificación temporal R3 y publica `V405-R4-LAB-STABLE-20260907` con caché `v405-r4-lab-stable`.
- Evidencia física del propietario: `ACTUALIZAR` detectó sin refresco, se mostró verde/parpadeante y, al pulsarlo, instaló R3 y volvió a oscuro.
- Evidencia física del propietario: `BORRAR TODO` funcionó correctamente en Registro iPhone.
- Configuración Vercel del proyecto `epg-caddy`: Toolbar `Off` en Preview/Preproducción y Producción conservada en `Default`; requiere este deployment LAB nuevo para entrar en vigor.
- MAIN permanece intacta.

## V405-R3 LAB · prueba física del parpadeo ACTUALIZAR · 7 de septiembre de 2026

- `index-grupal.html`: identificación `V405-R3-LAB-UPDATE-BLINK-TEST-20260907` para que V405-R2 detecte automáticamente la actualización y active el botón verde/parpadeante.
- `service-worker.js`: caché `v405-r3-update-blink-test`.
- `test-v365-active-round-empty-recovery.mjs`: fija ambos identificadores y conserva detección automática, `persist()` y actualización en el mismo dominio.
- Prueba temporal sólo en LAB; no cambia lógica, sesión, jugadores, scores, historial, voz ni MAIN.

![ROADMAP OVERALL · Golf Score Card GT](ROADMAP_OVERALL_V291.png)

## V332 · moneda dual y matriz completa de seguimiento

El propietario exige que Skins, Wolf, Vegas y Dots permitan elegir antes de la ronda una de dos monedas: **quetzales (`Q`/`GTQ`) o dólares (`$`/`USD`)**. Cada juego presenta dos casillas de radio mutuamente excluyentes; elegir una desmarca la otra. La moneda queda guardada en la configuración y viaja sin conversión por pantalla, voz, snapshot, corrección, tarjeta Global/personal, Historial, sincronización, restauración y liquidación. El valor es opcional para el grupo y nunca altera Gross, Neto ni el resultado deportivo.

V332 homologa la arquitectura visible de los cuatro juegos para que un jugador sin experiencia no reciba sólo un saldo final. La matriz común incluye estado y hoyos resueltos/pendientes, unidades o puntos acumulados, carry abierto, registros, dinero bruto movido, neto exacto a liquidar, líder o empate, saldos individuales y quién paga a quién. Cada juego añade su riesgo útil: mayor pozo Skins; exposición del Wolf por rival y hoyo; mayor cambio y riesgo máximo por duelo Vegas; e impacto de un punto por jugador en Dots. La tarjeta final conserva los mismos acumulados para auditoría.

Los bancos `test-v329-skins.mjs` y `test-v330-side-games.mjs` verifican las ocho casillas Q/$, exclusividad nativa, normalización de moneda, símbolos, métricas, cero-suma, persistencia, corrección y artefactos. La auditoría integral aprobó **89 paquetes**, **325 fuentes** y tres inventarios PDF sellados en V332. El corte visible es `V332-DUAL-CURRENCY-MATRIX-20260826` y la copia instalable usa `gscg-mobile-v332-dual-currency-matrix`. Producción permanece intacta; falta publicar el Preview y aprobar la prueba física en iPhone antes de cualquier montaje.

Archivos exactos V332: `skins.js`, `wolf.js`, `vegas.js`, `dots.js`, `index-grupal.html`, `card-artifacts.js`, `test-v329-skins.mjs`, `test-v330-side-games.mjs`, `service-worker.js`, los bancos que fijan build/caché, `scripts/update-inventory-v328.py`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_DID_017_FICHAS_MODALIDADES_PARA_APRENDER.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.

## V331 · matriz investigada de apuestas y lenguaje operativo

La prueba física de **V330-R3 quedó aprobada en iPhone**: al tocar `WOLF`, únicamente Wolf permaneció verde, `RONDA NORMAL` se desmarcó y la configuración correcta se abrió. El defecto de selección doble queda cerrado; Producción continúa intacta y `PEND-SKI-006` sigue abierto para validar el funcionamiento completo de cada juego.

El nuevo `PEND-DID-017` exige una ficha independiente por cada modalidad y esquema: Ronda Normal, Stableford, Match Play, Four Ball, Práctica, Skins, Wolf, Vegas, Dots y variantes que cambian el cálculo. Cada hoja deberá ser comprensible a los 10 años, funcionar impresa en blanco y negro, incluir un ejemplo aritmético completo, estrategia, estados, acumulados, liquidación y glosario. La edad define sólo la claridad didáctica: el dinero permanece siempre dentro del alcance general de cada hoja y cada grupo decide si lo liquida o juega únicamente con puntos/unidades. La especificación vive en `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_DID_017_FICHAS_MODALIDADES_PARA_APRENDER.md`.

V331 sustituye la presentación mínima de apuestas por una matriz operativa investigada. Wolf elimina la duplicidad confusa `Solo base`/`Lone` y conserva tres decisiones comprensibles: **Con pareja**, **Lobo solitario** y **Lobo ciego**. Registra si el Wolf sale primero o último, multiplicadores configurables, tope monetario por rival/hoyo, riesgo del Wolf, decisiones y scores pendientes, acumulados, unidades netas, dinero movido y liquidación. Vegas explica cómo 4 y 5 forman 45, maneja correctamente scores de 10 o más —10 y 4 forman 104—, permite acordar qué ocurre si ambas parejas hacen birdie y muestra por hoyo números, volteos, águilas, topes, puntos movidos y saldos. Dots define cada término en español, mantiene apagadas las variantes que pueden duplicar eventos, separa puntos positivos/negativos, manuales/automáticos y muestra el detalle de cada hoyo.

Las reglas universales no se inventan: las diferencias reales entre grupos quedan configurables y rotuladas. La base investigada utiliza 18Birdies y Wolf Golf Scorecard para Wolf; Mashie, 18Birdies y Golf Digest para Vegas; 18Birdies, MyScorecard y SCGA para Dots/Junk; USGA se conserva como autoridad del hándicap y score deportivo. El dinero nunca modifica el score oficial.

Archivos exactos V331: `wolf.js`, `vegas.js`, `dots.js`, `index-grupal.html`, `card-artifacts.js`, `test-v330-side-games.mjs`, `service-worker.js`, `scripts/update-inventory-v328.py`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` y los bancos que fijan el identificador de build/caché. El corte visible es `V331-RESEARCHED-SIDE-GAMES-20260826` y la copia instalable usa `gscg-mobile-v331-researched-side-games`.

## V330 · Skins, Wolf, Vegas, Dots y seis jugadores

**Hotfix V330-R3 después de rechazo físico:** la captura real de iPhone demostró que al elegir `WOLF` todavía podían quedar verdes `RONDA NORMAL` y `WOLF`. V330-R2 queda rechazada. R3 incorpora un único escritor visual para las siete opciones, limpia configuraciones laterales múltiples heredadas, desmarca las otras seis antes de reconstruir la pantalla y vuelve a validar después del render. La caché instalable sube a `gscg-mobile-v330-side-games-r3`; `test-v330-side-games.mjs` simula exactamente el toque WOLF y exige `false` en Normal, Match Play, Four Ball, Skins, Vegas y Dots, con `true` únicamente en Wolf.

**Pendientes registrados:** `PEND-UBI-015` separa la detección automática del campo por GPS de clima/tráfico y de las distancias al green; `PEND-RSG-016` define la sincronización versionada de Reglas de Golf desde fuentes oficiales. Se crean las especificaciones `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_UBI_015_DETECCION_CAMPO_POR_GPS.md` y `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_RSG_016_SINCRONIZACION_REGLAS_GOLF.md`, y se actualizan `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md` y `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`.

**Voz pospuesta y registrada:** `PEND-VOZ-003` incorpora tres observaciones físicas nuevas sin declararlas implementadas: matriz obligatoria para respuestas estudiadas, profundas y formales; corrección del corte observado en la quinta conversación; y avisos bilaterales exactos `ESCUCHANDO` / `RESPONDIENDO` en rojo parpadeante. Por orden del propietario, la ejecución vuelve primero a la configuración y prueba de SKINS, WOLF, VEGAS y DOTS.

El **26 de agosto de 2026** `PEND-SKI-006` pasa de diseño a implementación comprobable. `skins.js`, `wolf.js`, `vegas.js` y `dots.js` son motores puros conectados al score oficial, no menús de respuestas fijas. La ventana de opciones se divide en dos columnas —modalidades existentes a la izquierda y juegos nuevos a la derecha— y la pantalla principal de la tarjeta conserva su formato.

Skins opera Gross/Neto para dos a seis jugadores con unidad monetaria, carry, división o anulación de empates. Wolf rota decisiones para tres a seis jugadores y no permite cierre con hoyos sin pareja/Solo/Lone/Blind. Vegas trabaja con cuatro o seis jugadores; la variante de seis usa tres parejas y comparaciones par a par. Dots permite activar y valorar eventos antes de jugar, mantiene apagadas por defecto las reglas de grupo `Amigo`, izquierda y derecha, y separa el saldo económico del score deportivo. Match Play y Four Ball se amplían a las parejas Verde, Oro y Azul.

El cierre, corrección oficial, tarjetas Global/personales, Historial, consultas, sincronización y restauración conservan los cuatro resultados en el snapshot firmado. `test-v329-skins.mjs` y `test-v330-side-games.mjs` cubren empates, X, límites, multiplicadores, tres parejas, cero-suma, bloqueo de cierre Wolf, corrección, artefactos, voz y persistencia. El banco local y el build real de Vercel aprobaron los 89 paquetes, el inventario de 322 fuentes, cero vulnerabilidades y la puerta viva de Reglas con modelo, búsqueda web, seis fuentes oficiales y `scoreChanged:false`. El Preview `dpl_4k5V9rFwkVXVwuRwktBjtgG4arAv` quedó `READY` desde el commit remoto `ea18aafb214731d44b41ea069fe27228407f9f47`. Producción permanece intacta; faltan revisión visual/táctil y ronda física en iPhone.

Referencias profesionales consultadas: BirdieBet y Squabbit para Vegas; Wiz Golf, FLOG, Squabbit y Golf Monthly para Wolf; The 1st Tee para Dots. Las variantes que no son universales quedan rotuladas como reglas de grupo o adaptación Golf Score Card GT.

Archivos funcionales V329/V330: `skins.js`, `wolf.js`, `vegas.js`, `dots.js`, `match-play.js`, `four-ball.js`, `index-grupal.html`, `round-closure.js`, `card-artifacts.js`, `card-library.js`, `historical-analytics.js`, `master-data-sync.js`, `account-backup.js`, `service-worker.js`, `scripts/build-mobile-web.mjs`, `vercel.json`, `audit-project.mjs`, `test-v329-skins.mjs` y `test-v330-side-games.mjs`. La documentación, mapa, ambos ROADMAP, tres inventarios PDF y su sello se actualizan antes de Preview.

## V328-R2 · Centro de Reglas de Golf oficial con respaldo básico sin conexión

El **26 de agosto de 2026** comienza la ejecución funcional de `PEND-REG-001`. La misma AI UNIVERSAL ∞ incorpora un acceso global `REGLAS`, acepta situaciones por teclado o micrófono, conserva campo y modalidad como contexto y consulta el modelo avanzado mediante `/api/golf-rules`. La herramienta limita técnicamente la Web a los dominios oficiales `usga.org` y `randa.org`, exige una fuente oficial visible y usa la edición Rules of Golf 2023 con las clarificaciones vigentes; el corte comprobado es 1 de julio de 2026. No se copia el reglamento completo ni se afirma una alianza, licencia de marca o API privada.

La consulta se aísla de todos los escritores locales: dentro de REGLAS no se ejecutan órdenes de score y la respuesta nunca aplica penalidades, concede hoyos ni cierra rondas. `test-v328-official-golf-rules.mjs` cubre 15 situaciones y comprueba dominios, contexto, texto/voz y `scoreChanged:false`. El Preview V328-R1 (`dpl_3Sa4NnueMXBqB2kCm69WdwhH83bv`) quedó `READY` con 86 paquetes, puerta viva aprobada y árbol remoto exacto `f0de0f6328c34ed2788faf1009ba04a19f47e6c1`. `test-v328-live-official-rules.mjs` se ejecuta dentro de cada build Vercel y exige una llamada real del modelo, búsqueda web efectiva, al menos una fuente USGA/The R&A y cero cambio de score.

V328-R2 agrega `golf-rules-offline.js`: guarda únicamente respuestas que ya aprobaron el filtro oficial, retiene hasta 24 entradas durante 90 días, conserva tokens normalizados en vez de la pregunta completa, exige coincidencia suficiente y modalidad compatible, muestra la fecha y nunca inventa si no existe una respuesta adecuada. `test-v328-offline-official-rules.mjs` comprueba fuente, privacidad, límite, caducidad, cruces negativos, integración PWA y cero escritura. Con este paquete la auditoría maestra sube a 87 paquetes más la puerta viva de Vercel. El manual visible y sus dos PDF conservan 74 páginas, página 73 actualizada, 2160 × 4320 px y 300 dpi; el control visual completo debe aprobar antes de entregar. `PEND-REG-001` continúa abierto sólo para voz física y una eventual integración comercial/licenciada; no se declara alianza oficial.

Archivos exactos V328: `api/golf-rules.js`, `audit-project.mjs`, `index-grupal.html`, `service-worker.js`, `manual.html`, `scripts/update-manual-page-73.py`, `docs/manual/v311/manual-pages-17-35.json`, `docs/manual/v311/page-73.png`, `docs/manual/v311/Manual_Golf_Score_Card_GT_COMPLETO.pdf`, `docs/manual/v311/Manual_de_Funciones_Golf_Score_Card_GT_01-16.pdf`, `test-v328-official-golf-rules.mjs`, `test-v327-tool-followup-no-silence.mjs`, `test-v326-no-silent-conversation.mjs`, `test-v325-ideal-microphone-timings.mjs`, `test-v324-real-traffic.mjs`, `test-v323-long-multitopic-context.mjs`, `test-v322-real-sustained-caddie.mjs`, `test-v312-general-caddie.mjs`, `test-v307-match-arrows-format.mjs`, `test-v305-history-navigation-zero-error.mjs`, `test-v304-homogeneous-registration-actions.mjs`, `test-v290-brand-icons-cleanup.mjs`, `test-v284-native-package-generation.mjs`, `test-v281-pwa-installation.mjs`, `test-v280-local-history-insights.mjs`, `test-v279-local-card-library.mjs`, `test-v278-card-image-pdf-export.mjs`, `test-v277-official-round-corrections.mjs`, `test-v276-manual-hole-navigation.mjs`, `test-v275-stable-live-voice-turns.mjs`, `test-v274-complete-courses-voice-operations.mjs`, `test-v272-definitive-operational-release.mjs`, `test-stableford-ui.mjs`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`. Los tres inventarios PDF externos se regeneran y verifican antes del build.

Archivos adicionales del cierre V328-R1: `test-v328-live-official-rules.mjs` agrega la puerta real y `vercel.json` la vuelve obligatoria. Archivos adicionales V328-R2: `golf-rules-offline.js`, `test-v328-offline-official-rules.mjs`, `test-v321-ai-universal-infinity.mjs`, `service-worker.js`, `index-grupal.html`, `audit-project.mjs`, `scripts/update-manual-page-73.py`, `docs/manual/v311/manual-pages-17-35.json`, los artefactos de manual, `scripts/update-inventory-v328.py`, los cuatro documentos de control, el candado y ambos ROADMAP.

## Actualización de control V327-R1-PEND · cola completa y ejecución permanente

El **26 de agosto de 2026** el propietario ordena agregar y adaptar todos los pendientes, continuar sin solicitar autorizaciones intermedias y montar cada versión cuando esté realmente probada. La instrucción no elimina las puertas de calidad: un solo `FAIL` conserva Producción intacta y ninguna licencia, credencial, contrato o integración externa puede simularse. Las reglas permanentes 22–26 prohíben trasladarle trabajo técnico que las herramientas puedan resolver, dejarlo adivinando la siguiente acción, simular trabajo en segundo plano o exigirle mensajes repetidos de `sigue`; todo reporte debe cerrar con una asignación inequívoca.

La cola vigente distingue lo entregado de lo abierto y agrega los faltantes expresamente acordados: hándicap oficial ASOGOLF/GHIN con índice interno separado; campos mundiales con datos oficiales; GPS deportivo por hoyo; Skins, Wolf, Vegas, Amigo, izquierda/derecha y Dots con unidad en quetzales; Apple Watch primero y Wear OS después; nube, cuentas, seguridad, estadísticas avanzadas, monetización y certificación integral. Permanecen además USGA/Reglas de Golf, clima completo en artefactos, Guía Rápida, tráfico comparado y AI UNIVERSAL ∞.

V327-R1 ya aprobó en Preview 85 paquetes, 310 fuentes, 44 llamadas reales, 24 materias, ocho turnos con memoria, 550 transiciones herramienta→voz y cero errores 5xx. La puerta inmediata sigue siendo una conversación física prolongada en iPhone; sólo después de su PASS se permite montar y continuar automáticamente con el siguiente pendiente ejecutable.

Archivos exactos V327-R1-PEND: `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/DIRECTRICES_MANDATORIAS.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`. También se regeneran y verifican `Inventario_Golf_Score_Card_GT_OVERALL_V311.pdf`, `Inventario_Golf_Score_Card_GT_A_DETALLE_V311.pdf` e `Inventario_Golf_Score_Card_GT_POR_IMAGENES_Y_RUBROS_V311.pdf`.

## Corrección controlada V327 · la herramienta siempre regresa a la voz

La prueba física rechazó V326-R2 después de aproximadamente seis preguntas: una investigación sobre una persona conocida en Colima y una consulta de tráfico podían completar su API con HTTP 200, pero el teléfono quedaba rojo escuchando sin pronunciar el resultado. No era un vocabulario temático reducido: `search_live_web` sí recibió la consulta y devolvió datos; el corte estaba en la transición asíncrona `herramienta → segunda respuesta → audio` de Realtime en iPhone.

V327 conserva la AI universal sin catálogo y corrige cuatro estados: `speech_stopped` mantiene el guardián hasta la transcripción final; un `output_audio_buffer.stopped` tardío y sin identificador ya no desautoriza el audio final antes de que empiece; la reproducción conserva un guardián de 60 segundos hasta su cierre; y una herramienta cuyo canal se perdió produce recuperación visible en vez de regresar en silencio. `api/voice-health.js` registra únicamente eventos técnicos permitidos, número de turno, etapa y tiempo —nunca preguntas, transcripciones, nombres, ubicaciones ni claves— para que una nueva anomalía física sea diagnosticable.

El banco dirigido ejecuta 550 secuencias herramienta→voz, 100 eventos de privacidad, 30 turnos bilaterales y las rutas anteriores. La consulta directa `El Pulté Golf → Pradera Concepción` devolvió una ruta real válida de 15 km y aproximadamente 33 minutos en el instante de prueba; un destino que sólo diga `Concepción` debe provocar una sola pregunta breve de aclaración. Producción continúa intacta y V327 no queda autorizada para montaje hasta terminar la regresión completa, desplegar Preview y aprobar otra conversación física prolongada en iPhone.

Archivos exactos V327: `index-grupal.html`, `api/_lib/traffic.js`, `api/universal-ai.js`, `api/voice-health.js`, `service-worker.js`, `audit-project.mjs`, `test-v327-tool-followup-no-silence.mjs`, `test-v326-no-silent-conversation.mjs`, `test-v325-ideal-microphone-timings.mjs`, `test-v324-real-traffic.mjs`, `test-v323-long-multitopic-context.mjs`, `test-v322-real-sustained-caddie.mjs`, `test-v312-general-caddie.mjs`, `test-stableford-ui.mjs`, `test-v272-definitive-operational-release.mjs`, `test-v274-complete-courses-voice-operations.mjs`, `test-v275-stable-live-voice-turns.mjs`, `test-v276-manual-hole-navigation.mjs`, `test-v277-official-round-corrections.mjs`, `test-v278-card-image-pdf-export.mjs`, `test-v279-local-card-library.mjs`, `test-v280-local-history-insights.mjs`, `test-v281-pwa-installation.mjs`, `test-v284-native-package-generation.mjs`, `test-v290-brand-icons-cleanup.mjs`, `test-v304-homogeneous-registration-actions.mjs`, `test-v305-history-navigation-zero-error.mjs`, `test-v307-match-arrows-format.mjs`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`.

## Control de entrega V326-R1 · redespliegue para cargar tráfico

El usuario confirmó que la credencial de tráfico podría haber quedado habilitada. El despliegue V326 original no se reutiliza para aprobarla porque las variables de entorno se fijan al construir cada deployment. Se provocó un redespliegue sin modificar el código funcional; el primer intento quedó correctamente bloqueado por `ROADMAP GATE` al no registrar el movimiento en ambos ROADMAPS. V326-R1 registra ese intento, conserva producción V322 intacta y ordena construir de nuevo Preview antes de ejecutar la ruta real El Pulté → colonia Oakland zona 10 para mañana a las 12:30 PM.

La aprobación continúa prohibida hasta que el nuevo Preview devuelva ETA, duración sin tráfico, demora, distancia y hora de cálculo desde Google Maps Routes, y hasta completar la conversación física prolongada en iPhone. Archivos exactos V326-R1: `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.

La primera construcción documentada de V326-R1 confirmó que `GOOGLE_MAPS_API_KEY` ya estaba presente en Preview: el test de ausencia recibió `TRAFFIC_ROUTE_UNAVAILABLE` en vez de `TRAFFIC_NOT_CONFIGURED`. El bloqueo pertenecía al aislamiento del test, que pasaba una cadena vacía y permitía por error el fallback hacia la credencial real. Se sustituyó únicamente ese valor inyectado por espacio en blanco, que se recorta a vacío sin consultar la red; la lógica funcional de tráfico permanece idéntica.

## Corrección controlada V326 · ningún turno puede quedar rojo y mudo

La prueba física en iPhone rechazó V325: después de preguntas sobre tráfico futuro y consumo eléctrico, el micrófono permanecía rojo y abierto sin producir una reacción. Los registros confirmaron que WebRTC sí abría, pero el cierre del turno no alcanzaba las herramientas ni la respuesta. La causa fue `semantic_vad` con urgencia baja sin un límite temporal anterior a `speech_stopped`; el watchdog existente comenzaba demasiado tarde y no podía recuperar ese estado.

V326 usa para conversación un `server_vad` independiente con umbral 0.2, prefijo de 700 ms y 2,200 ms de silencio. Es más paciente que las órdenes de la aplicación, que conservan 1,000 ms, pero siempre posee un final determinista. Un guardián de entrada se renueva con los deltas parciales y, si no existe ningún evento durante 15 segundos, desmonta la captura atascada y apaga el rojo con una instrucción visible; mantiene un límite duro de 90 segundos por turno. Un segundo guardián recupera a los 30 segundos una respuesta del modelo que no haya comenzado. Los cálculos estables y aproximados, como el consumo eléctrico de un aire acondicionado, se responden directamente con supuestos en vez de abrir una búsqueda web innecesaria.

`test-v326-no-silent-conversation.mjs` ejecuta la máquina de temporizadores y comprueba recuperación real de estado, además de 30 alternancias entre conversación y órdenes. V325 queda rechazada y V326 continúa sin autorización de montaje hasta repetir las dos preguntas exactas y una conversación física prolongada en iPhone. Tráfico tampoco queda aprobado mientras Preview responda `TRAFFIC_NOT_CONFIGURED` y falte la comparación simultánea en Guatemala.

Archivos exactos V326: `index-grupal.html`, `service-worker.js`, `audit-project.mjs`, `test-v326-no-silent-conversation.mjs`, `test-v325-ideal-microphone-timings.mjs`, `test-v324-real-traffic.mjs`, `test-v323-long-multitopic-context.mjs`, `test-v322-real-sustained-caddie.mjs`, `test-v312-general-caddie.mjs`, `test-stableford-ui.mjs`, `test-v272-definitive-operational-release.mjs`, `test-v274-complete-courses-voice-operations.mjs`, `test-v275-stable-live-voice-turns.mjs`, `test-v276-manual-hole-navigation.mjs`, `test-v277-official-round-corrections.mjs`, `test-v278-card-image-pdf-export.mjs`, `test-v279-local-card-library.mjs`, `test-v280-local-history-insights.mjs`, `test-v281-pwa-installation.mjs`, `test-v284-native-package-generation.mjs`, `test-v290-brand-icons-cleanup.mjs`, `test-v304-homogeneous-registration-actions.mjs`, `test-v305-history-navigation-zero-error.mjs`, `test-v307-match-arrows-format.mjs`, `GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`.

## Integración controlada V325 · tiempos ideales del micrófono bilateral

V325 separa por intención los tiempos de escucha. Las órdenes de registro, navegación y score conservan `server_vad` con umbral 0.2, prefijo de 700 ms y 1,000 ms de silencio para respuesta rápida. AI UNIVERSAL ∞ cambia a `semantic_vad` con urgencia baja, por lo que una pausa natural no corta automáticamente la idea. La sesión valida el perfil confirmado antes de responder, serializa cambios concurrentes y vuelve al perfil operativo cuando detecta una acción propia de la tarjeta.

La conversación conserva micrófono vivo durante la respuesta, interrupción confirmada después de 250 ms y ocho caracteres, protección de eco por 1,800 ms, reescucha inmediata, watchdog de diez segundos y cierre únicamente tras 30 minutos completos sin actividad. La prueba V325 compila el JavaScript completo y simula 30 alternancias conversación/orden. Esto no sustituye la conversación física prolongada en iPhone; el corte sigue sin autorización de montaje. También quedan registrados como pendientes el enlace oficial/autorizado con USGA y Reglas de Golf, la modalidad Skins y Apple Watch/Wear OS.

Archivos exactos V325: `index-grupal.html`, `service-worker.js`, `audit-project.mjs`, `test-v325-ideal-microphone-timings.mjs`, `test-v324-real-traffic.mjs`, `test-v323-long-multitopic-context.mjs`, `test-v322-real-sustained-caddie.mjs`, `test-v312-general-caddie.mjs`, `test-stableford-ui.mjs`, `test-v272-definitive-operational-release.mjs`, `test-v274-complete-courses-voice-operations.mjs`, `test-v275-stable-live-voice-turns.mjs`, `test-v276-manual-hole-navigation.mjs`, `test-v277-official-round-corrections.mjs`, `test-v278-card-image-pdf-export.mjs`, `test-v279-local-card-library.mjs`, `test-v280-local-history-insights.mjs`, `test-v281-pwa-installation.mjs`, `test-v284-native-package-generation.mjs`, `test-v290-brand-icons-cleanup.mjs`, `test-v304-homogeneous-registration-actions.mjs`, `test-v305-history-navigation-zero-error.mjs`, `test-v307-match-arrows-format.mjs`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`.

## Integración controlada V324 · tráfico real dentro de AI UNIVERSAL ∞

V324 incorpora tráfico vehicular actual y proyectado a la misma conversación universal. Una consulta por voz o texto se clasifica como tráfico, obtiene origen escrito o GPS efímero, exige destino suficiente y llama desde servidor a Google Maps Routes con `TRAFFIC_AWARE_OPTIMAL`. La respuesta separa los datos del proveedor —ETA, duración sin tráfico y distancia— de la clasificación de congestión derivada. No muestra mapa, no devuelve coordenadas y no afirma integración con Waze.

La prueba V324 cubre salida inmediata y futura, huso horario, ETA, demora, distancia, privacidad, origen faltante, destino faltante, credencial ausente, proveedor caído, timeout, solicitud automática de GPS, función de modelo en dos pasos, texto, voz y continuidad recuperable. Este corte es código candidato: permanece expresamente sin aprobación de montaje hasta activar credencial/facturación y completar en Guatemala la comparación simultánea contra Waze y la conversación prolongada en iPhone.

Archivos exactos V324: `api/_lib/traffic.js`, `api/traffic.js`, `api/universal-ai.js`, `index-grupal.html`, `service-worker.js`, `audit-project.mjs`, `test-v324-real-traffic.mjs`, `test-v323-long-multitopic-context.mjs`, `test-v322-real-sustained-caddie.mjs`, `test-v321-ai-universal-infinity.mjs`, `test-v312-general-caddie.mjs`, `test-stableford-ui.mjs`, `test-v272-definitive-operational-release.mjs`, `test-v274-complete-courses-voice-operations.mjs`, `test-v275-stable-live-voice-turns.mjs`, `test-v276-manual-hole-navigation.mjs`, `test-v277-official-round-corrections.mjs`, `test-v278-card-image-pdf-export.mjs`, `test-v279-local-card-library.mjs`, `test-v280-local-history-insights.mjs`, `test-v281-pwa-installation.mjs`, `test-v284-native-package-generation.mjs`, `test-v290-brand-icons-cleanup.mjs`, `test-v304-homogeneous-registration-actions.mjs`, `test-v305-history-navigation-zero-error.mjs`, `test-v307-match-arrows-format.mjs`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`.

## Corrección operativa V323 · conversación multitema prolongada

V323 corrige una pérdida de contexto reproducida en producción: la comunicación continuaba, pero al turno 15 AI UNIVERSAL ∞ ya no recordaba una clave expresamente indicada al inicio. El límite efectivo era de 8 intercambios para texto y sólo 3 para el contexto compartido con voz. Ahora texto, voz y servidor conservan hasta 80 mensajes —40 intercambios completos—, suficiente para la nueva prueba de 30 temas y 63 mensajes sin perder `ORQUÍDEA 47`.

La prueba `test-v323-long-multitopic-context.mjs` reproduce cambios consecutivos entre lluvia, salud, viajes, medicamentos, golf, tecnología, cocina, filosofía, ciencias, idiomas y otros temas; exige que el primer dato siga disponible en la última pregunta, valida la misma memoria en texto y voz, y comprueba el descarte controlado únicamente al superar 80 mensajes.

Archivos V323: `api/universal-ai.js`, `index-grupal.html`, `service-worker.js`, `audit-project.mjs`, `test-v323-long-multitopic-context.mjs`, `test-v322-real-sustained-caddie.mjs`, `test-v312-general-caddie.mjs`, `test-stableford-ui.mjs`, `test-v272-definitive-operational-release.mjs`, `test-v274-complete-courses-voice-operations.mjs`, `test-v275-stable-live-voice-turns.mjs`, `test-v276-manual-hole-navigation.mjs`, `test-v277-official-round-corrections.mjs`, `test-v278-card-image-pdf-export.mjs`, `test-v279-local-card-library.mjs`, `test-v280-local-history-insights.mjs`, `test-v281-pwa-installation.mjs`, `test-v284-native-package-generation.mjs`, `test-v290-brand-icons-cleanup.mjs`, `test-v304-homogeneous-registration-actions.mjs`, `test-v305-history-navigation-zero-error.mjs`, `test-v307-match-arrows-format.mjs`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`.

## Corrección operativa V322 · conversación sostenida y recuperación comprobable

V322 integra sin perder la AI UNIVERSAL ∞ de V321 la corrección del fallo observado en iPhone: el micrófono ya no se cierra tres segundos después de una respuesta ni destruye una sesión WebRTC sana al tocarlo nuevamente. La escucha permanece activa entre turnos y sólo se apaga después de 30 minutos completos sin actividad. Si falta una transcripción final, Inicio y Tarjeta salen del estado bloqueado y regresan a `● ESCUCHANDO`.

La investigación web dispone de 40 segundos en servidor y 45 segundos en cliente. Éxito, timeout, proveedor no disponible o respuesta vacía producen siempre una salida utilizable; un fallo recuperable no apaga el transporte de voz ni deja al usuario sin respuesta. `test-v322-real-sustained-caddie.mjs` simula 24 turnos consecutivos, reapertura, cierre reglamentario y los distintos resultados del servicio; la auditoría maestra conserva además las 200 áreas y las modalidades completas.

Archivos: `index-grupal.html`, `api/research.js`, `service-worker.js`, `audit-project.mjs`, `test-v322-real-sustained-caddie.mjs`, `test-v321-ai-universal-infinity.mjs`, `test-v312-general-caddie.mjs`, los candados de build/caché, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`.

## Actualización operativa V321 · AI UNIVERSAL ∞

AI UNIVERSAL ∞ queda integrada mediante API de modelo avanzado, con voz y texto, contexto temporal compartido, búsqueda Web para datos cambiantes, idioma automático, respuesta escrita y hablada, separación entre órdenes locales y consultas generales, y controles `ESCUCHAR`, `DETENER`, `REPETIR`, `SILENCIAR` y `CONTINUAR`. Las 200 áreas verificadas son pruebas, nunca una lista límite. El Manual conserva la portada como primera página y documenta la función en la página 73.

Revisión final publicada: el índice y el encabezado del visor nombran la página 73 como **AI UNIVERSAL ∞**, y la prueba V321 bloquea cualquier regreso al título anterior.

| Archivo | Registro V321 |
|---|---|
| `api/universal-ai.js` | Endpoint real de AI UNIVERSAL ∞ con Responses API, modelo avanzado, contexto, Web, fuentes y `store:false`. |
| `api/session-grupal.js` | Realtime conserva Golf y habilita detección automática del idioma hablado. |
| `index-grupal.html` | Panel AI ∞, teclado, respuestas escritas, contexto voz-texto, clasificación orden/pregunta y cinco controles. |
| `service-worker.js` | Caché V321 para entregar inmediatamente la integración. |
| `audit-project.mjs` | Incorpora la batería obligatoria V321. |
| `test-v321-ai-universal-infinity.mjs` | Verifica API real, 200 áreas sin lista cerrada, texto, voz, contexto, Web y controles. |
| `test-v267-one-operational-line.mjs` | A…34561 tokens truncated…S físico iPhone son puertas separadas.

## V359 · recuperación del parser físico iPhone · 28 de agosto de 2026

La prueba física `IMG_2165.png` rechazó V358: a las 17:33:23 y 17:33:41 UTC Safari entregó transcripciones completas, pero el parser emitió `parser_rejected` y dejó en blanco los scores de Jaime y Gustavo. V359 admite las formas naturales `hoyo número`, `golpes`, `tiró` y el hoyo pronunciado al final. El traslado del hoyo se permite únicamente cuando todas las entradas previas pertenecen inequívocamente a un solo bloque; cualquier palabra desconocida conserva el rechazo total.

Archivos exactos V359: `index-grupal.html`, `service-worker.js`, `test-v359-ios-score-parser-recovery.mjs`, `test-v358-active-round-reopen.mjs`, `test-v357-ios-voice-transport-recovery.mjs`, `test-v356-voice-only-cedar-quality.mjs`, `test-v355-ios-audio-dictation.mjs`, `test-v354-voice-fallback.mjs`, `test-v353-live-hub.mjs`, `test-v352-live.mjs`, `audit-project.mjs`, `scripts/rebuild-inventory-pdfs.py`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`. V358 queda rechazado; V359 no se aprueba hasta `score_applied` físico.

## V360 · integración definitiva de ramas de voz · 28 de agosto de 2026

V360 combina la rama paralela `v358-synchronized-progressive-voice` con V359. Conserva la tarjeta al reabrir, escribe cada score válido visualmente durante el dictado, revierte una alternativa ambigua y acepta las formas físicas `hoyo número`, `golpes`, `tiró` y hoyo al final. Registro, Cedar 1.15, AI UNIVERSAL sin texto hablado, tráfico y clima permanecen en el mismo árbol.

Archivos exactos V360: `.github/workflows/roadmap-gate.yml`, `api/voice-health.js`, `audit-project.mjs`, `index-grupal.html`, `package.json`, `service-worker.js`, `test-v336-microphone-transport.mjs`, `test-v357-synchronized-progressive-voice.mjs`, `test-v359-ios-score-parser-recovery.mjs`, `test-v358-active-round-reopen.mjs`, `test-v357-ios-voice-transport-recovery.mjs`, `test-v356-voice-only-cedar-quality.mjs`, `test-v355-ios-audio-dictation.mjs`, `test-v354-voice-fallback.mjs`, `test-v353-live-hub.mjs`, `test-v352-live.mjs`, `test-v311-neutral-match-home-link.mjs`, documentos rectores, ambos ROADMAPS, `scripts/rebuild-inventory-pdfs.py` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`. Sólo evidencia física `score_applied` autoriza el cierre.

## V361 · voz sincronizada, score inmediato y persistente · 28 de agosto de 2026

V361 toma como única base la integración V360 y no reabre ninguna rama antigua. Cada resultado parcial válido del reconocimiento se aplica mediante el escritor oficial y ejecuta `persist()` + `render()` inmediatamente, por lo que aparece y queda guardado aunque el jugador continúe dictando los siguientes hoyos. Conserva las órdenes naturales para uno o varios jugadores, la reversión total de alternativas ambiguas, la continuidad de ronda y AI UNIVERSAL hablado sin mostrar la conversación de voz.

La recuperación de audio espera hasta 1.6 segundos el evento `voiceschanged` de iOS antes de seleccionar exclusivamente una voz masculina aprobada. Si Cedar servidor responde 429 o 503, abre un circuito de diez minutos y usa el locutor masculino local sin repetir la llamada fallida en cada contestación. Producción permanece intacta y la aprobación física del iPhone continúa separada del PASS automático.

Archivos exactos V361: `.github/workflows/roadmap-gate.yml`, `audit-project.mjs`, `index-grupal.html`, `package.json`, `service-worker.js`, `test-v352-live.mjs`, `test-v353-live-hub.mjs`, `test-v354-voice-fallback.mjs`, `test-v355-ios-audio-dictation.mjs`, `test-v356-voice-only-cedar-quality.mjs`, `test-v357-ios-voice-transport-recovery.mjs`, `test-v357-synchronized-progressive-voice.mjs`, `test-v358-active-round-reopen.mjs`, `test-v359-ios-score-parser-recovery.mjs`, `test-v361-synchronized-voice.mjs`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `scripts/rebuild-inventory-pdfs.py` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.

## V362 · recuperación física de voz, AI de un toque y cierre hablado · 28 de agosto de 2026

La evidencia del iPhone sobre V358 separó escucha de reproducción: entre 18:09:08 y 18:09:20 UTC Safari inició el respaldo, entregó transcripción, `/api/universal-ai` respondió 200 y abrió el panel, pero `/api/voice-speech` devolvió 503 después de Cedar 429. La configuración de respaldo usaba `openai/gpt-4o-mini-tts`, modelo ausente del catálogo publicado del Vercel AI Gateway. V362 mantiene Cedar directo con `gpt-4o-mini-tts` 1.15 y cambia sólo el respaldo Gateway a `openai/tts-1-hd` con Onyx masculino; la respuesta informa mediante `X-GSCG-Voice` cuál locutor produjo el audio.

V362 restaura el contrato V358 de AI ∞: el mismo `pointerdown` abre el panel, habilita audio y comienza a escuchar. Agrega un límite de 18 segundos hasta el primer resultado para que Safari no quede indefinidamente en rojo. Conserva el escritor V361 (`persist()` + `render()` por score) y corrige la salida del hoyo 9/18: el cierre encolado se consume al sellar el dictado progresivo y se habla; si Realtime no está disponible, usa el mismo TTS servidor masculino.

Archivos exactos V362: `AGENTS.md`, `.github/workflows/roadmap-gate.yml`, `api/voice-health.js`, `api/voice-speech.js`, `audit-project.mjs`, `index-grupal.html`, `package.json`, `service-worker.js`, `test-v352-live.mjs`, `test-v353-live-hub.mjs`, `test-v354-voice-fallback.mjs`, `test-v355-ios-audio-dictation.mjs`, `test-v356-voice-only-cedar-quality.mjs`, `test-v357-ios-voice-transport-recovery.mjs`, `test-v357-synchronized-progressive-voice.mjs`, `test-v358-active-round-reopen.mjs`, `test-v358-ios-score-universal-physical-recovery.mjs`, `test-v359-ios-score-parser-recovery.mjs`, `test-v361-synchronized-voice.mjs`, `test-v362-physical-voice-recovery.mjs`, ambos ROADMAPS, cola, matriz de pendientes, registro de reincidencias, mapa maestro, reconstrucción e inventario. Producción permanece intacta; Preview y PASS físico iPhone continúan como puertas separadas.

## V363 · comportamiento móvil registrado + Intocables · 28 de agosto de 2026

Regresión histórica ajustada al almacenamiento canónico: `test-v267-one-operational-line.mjs`.

V363 conserva la recuperación V362 y el comportamiento móvil integrado: guard de cierre Safari, aislamiento de controles durante Registro/LIVE y safe areas. Añade una identidad canónica para que General, Match Play y Four Ball sobrevivan cierre o recarga hasta confirmar `INICIAR RONDA`. Match Play anuncia nombre y posición; Ronda Normal conserva su reporte Gross/Neto/par.

`Intocables/` aplica cuatro reglas AND y bloquea regresiones. Producción permanece intacta; PASS automático, Preview y prueba física iPhone son puertas separadas.

RC-035 nace de `IMG_2168`/`IMG_2169`: LIVE anulaba la zona segura, lanzadores e instalación invadían Registro y el cierre de voz dependía de `onend`. V363 aplica safe areas, aislamiento modal y un guard independiente de 1.2 s. El MP4 inventariado registra la entrada física FAIL y la simulación controlada sin `onend`; no se presenta como PASS físico.

Archivos exactos V363: `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/MATRIZ_GATE_0_PROYECTO.json`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `Intocables/README.md`, `Intocables/REGLAS_INTOCABLES.json`, `Intocables/intocables-gate.mjs`, `audit-project.mjs`, `index-grupal.html`, `live-control.js`, `package.json`, `scripts/rebuild-inventory-pdfs.py`, `service-worker.js`, `test-v260-round-points-player-return.mjs`, `test-v352-live.mjs`, `test-v353-live-hub.mjs`, `test-v354-voice-fallback.mjs`, `test-v355-ios-audio-dictation.mjs`, `test-v356-voice-only-cedar-quality.mjs`, `test-v357-ios-voice-transport-recovery.mjs`, `test-v357-synchronized-progressive-voice.mjs`, `test-v358-active-round-reopen.mjs`, `test-v358-ios-score-universal-physical-recovery.mjs`, `test-v359-ios-score-parser-recovery.mjs`, `test-v361-synchronized-voice.mjs`, `test-v362-physical-voice-recovery.mjs`, `test-v363-intocables-behavior.mjs` y `test-v363-recorded-mobile-behavior.mjs`. Ambos ROADMAPS también se actualizan en el mismo cambio.

Evidencia y soporte móvil exactos incorporados en el mismo candidato: `.gitignore`, `scripts/v363-silent-speech-recognition.js`, `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V363_PRUEBAS_COMPORTAMIENTO/REPORTE_PRUEBAS_COMPORTAMIENTO_V363_RC035.md`, `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V363_PRUEBAS_COMPORTAMIENTO/PRUEBA_COMPORTAMIENTO_V363_RC035.mp4`, `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V363_PRUEBAS_COMPORTAMIENTO/PRUEBA_COMPORTAMIENTO_V363_RC035_POSTER.png`, `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V363_PRUEBAS_COMPORTAMIENTO/RC035_IMG_2168_LIVE_SAFE_AREA_FAIL.png` y `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V363_PRUEBAS_COMPORTAMIENTO/RC035_IMG_2169_MIC_OVERLAYS_FAIL.png`.

## V364 · entrada final Nueva ronda · 28 de agosto de 2026

La URL explícita `nueva_ronda=1` abre Registro aun con una ronda activa, conserva la ronda anterior y sólo la sustituye al confirmar `INICIAR RONDA`. La caché V364 conserva la firma V363 como prefijo para mantener comprobables todos los candados acumulados. Archivos: `index-grupal.html`, `service-worker.js`, `test-v357-ios-voice-transport-recovery.mjs`, `test-v361-synchronized-voice.mjs`, `test-v364-explicit-new-round-entry.mjs`, `audit-project.mjs`, `package.json`, `scripts/project-quality-gate.mjs`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`. Producción permanece intacta; el enlace final requiere 3/3 verificaciones externas.
### Promoción pública autorizada V363 — 28 de agosto de 2026

Se autorizó la promoción de V363 a `main`. El Gate 0 conserva la base protegida como ancestro obligatorio y, en el checkout superficial de Vercel, valida repositorio canónico y coincidencia exacta entre `VERCEL_GIT_COMMIT_SHA` y `HEAD`. No se modificó lógica de tarjeta, Match Play, Ronda Normal ni micrófono.

Los tres inventarios V311 fueron regenerados y sellados después de registrar esta promoción.

Sello atómico V364: ambos ROADMAPS quedan registrados juntos en el mismo commit externo para que la auditoría de publicación sea reproducible.

Sello final V364: los dos ROADMAPS y el inventario regenerado se publican juntos después de aprobar la auditoría externa de ROADMAP.

Verificación externa del candidato OIDC: AI UNIVERSAL aprobó tres POST reales sobre el mismo Preview. La voz reveló un 400 reproducible por ausencia de la cabecera obligatoria `ai-speech-model-specification-version: 4`; el candidato la incorpora según el contrato Speech V4 de `@ai-sdk/gateway` 4.0.68 y exige repetir Preview, voz externa y prueba física iPhone antes de producción.

La repetición externa confirmó que Speech V4 no basta: el cliente oficial agrega también `ai-gateway-protocol-version: 0.0.1` y `ai-gateway-auth-method`. Un Preview independiente con el contrato completo entregó MP3 200 y locutor Onyx; V364 incorpora ahora esas dos cabeceras sin registrar credenciales y vuelve a empezar su propia prueba externa.

Validación del sello: ordenamiento binario idéntico al Gate de Node.js en Vercel.

## Hotfix final OIDC · comunicación universal · 28 de agosto de 2026

La comprobación real de producción confirmó HTTP 200 para la V363 publicada y 503 `UNIVERSAL_AI_CREDIT_EXHAUSTED` para una consulta general. Los logs demostraron tres intentos directos y cero intento Gateway: el token OIDC administrado no se resolvía dinámicamente. El candidato incorpora `@vercel/oidc`, obtiene el token sólo después del bloqueo de saldo y aplica la misma identidad administrada a AI UNIVERSAL y voz, sin registrar credenciales.

Archivos exactos: `api/_lib/vercel-gateway-auth.js`, `api/universal-ai.js`, `api/voice-speech.js`, `test-v364-vercel-oidc-recovery.mjs`, `audit-project.mjs`, `package.json`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`. Producción no cambia; Preview, 3/3 externo sobre el mismo deployment y PASS físico iPhone siguen bloqueantes.

## V365/V366 · tarjeta viva e Inicio principal · 28 de agosto de 2026

`IMG_2186.png` y `IMG_2193.png` prueban dos fallas distintas: una copia configurada vacía podía vencer a Score Cabo, y sin ronda operativa el Preview podía dejar expuesta una tarjeta vacía en vez de `Inicio`.

V365 define una ronda recuperable como configurada con uno a seis jugadores, excluye copias vacías de todas las fuentes, rescata la tarjeta archivada con sus scores y repara `ACTIVE_ROUND_KEY`. V366 añade `ensurePrincipalEntry()` en arranque, regreso, `pageshow` y foco; no reinicia un Registro ya visible, no cubre una tarjeta válida y conserva `nueva_ronda=1` para la entrada explícita sin sustitución antes de `INICIAR RONDA`.

La integración parte del `main` con recuperación OIDC/voz ya promovida; no sustituye `api/`, dependencias ni bancos de comunicación universal. La auditoría acumulada incluye Registro, score individual y multihoyo, cierres/acumulados, Match Play y LIVE. Producción continúa intacta hasta Preview READY, comprobación externa y PASS físico iPhone.

Inventario literal del cambio: `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V365_RECUPERACION_RONDA_ACTIVA/REPORTE_V365_RC037.md`, `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V366_ENTRADA_PRINCIPAL/REPORTE_V366_RC038.md`, `test-v289-stableford-new-round-empty.mjs`, `test-v365-active-round-empty-recovery.mjs` y `test-v366-principal-entry-recovery.mjs`.

## V367 · comunicación universal hablada en la misma pantalla

La condición física más reciente sustituye la expectativa visual anterior: una pregunta universal pronunciada desde Inicio, Registro o tarjeta no abre otra pantalla. `answerBrowserVoiceQuery()` conserva la vista, utiliza `voiceOnly:true` y reproduce la respuesta audible; el acceso AI de un toque prepara audio y escucha sin montar el panel.

Archivos literales V367: `index-grupal.html`, `api/voice-health.js`, `service-worker.js`, `test-v354-voice-fallback.mjs`, `test-v358-ios-score-universal-physical-recovery.mjs`, `test-v357-ios-voice-transport-recovery.mjs`, `test-v361-synchronized-voice.mjs`, `test-v364-explicit-new-round-entry.mjs`, `test-v367-universal-voice-in-place.mjs`, `Intocables/README.md`, `Intocables/intocables-gate.mjs`, `audit-project.mjs`, `package.json`, documentos rectores e inventario. Producción no cambia hasta Preview READY y PASS físico iPhone.

## V368 · entrada web canónica sincronizada · 29 de agosto de 2026

RC-040 consolida las conversaciones sobre `fix-v366-integrated-main` (`03ca12e`). El enlace web oficial abre Registro aun con Match Play persistido, sin borrar la tarjeta; la app instalada conserva su entrada PWA y reabre la tarjeta viva. El navegador reprodujo y V368 eliminó `Cannot access 'standaloneApp' before initialization`. `test-v368-canonical-home-entry.mjs`, los contratos V364/V366 actualizados, la caché, `scripts/rebuild-inventory-pdfs.py`, `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V368_ENTRADA_CANONICA/REPORTE_V368_RC040.md`, controles y ambos ROADMAPS bloquean enlaces V365–V367. Producción no se modifica; Preview y PASS físico iPhone continúan obligatorios.

El Gate remoto exige que `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` viajen juntos en todo resellado V368; el build rechazado no se presenta como enlace de prueba.

## V369 · compatibilidad LIVE con jugadores activos heredados · 29 de agosto de 2026

La prueba física produjo tres `POST /api/live 400` al activar el enlace de la ronda de Jaime y Gustavo. La tarjeta usa identificadores estables `p1..p6`, mientras el servidor LIVE exigía ocho caracteres mínimos. V369 acepta esos identificadores internos de 1–160 caracteres, conserva el filtro de caracteres permitidos y añade la regresión exacta `p1/p2`. No modifica micrófono, Registro, Score, ronda ni persistencia.

## V370 · visor LIVE exclusivo Match Play · 29 de agosto de 2026

RC-042 registró que el enlace Match Play activo mostraba la plantilla General. V370 conserva el mismo enlace y la misma ronda, pero cuando `mode=match_play` dibuja únicamente parejas, nombres, HCP, hoyos y posiciones Match. Antes de comenzar muestra `MATCH POR INICIAR` con casillas vacías; después usa exclusivamente `UP`, `DOWN`, `AS` y el cierre Match, sin tabla Gross/Neto General.

## V371 · Gross por hoyo + marcador Match explícito + micrófono sellado · 29 de agosto de 2026

La prueba física `IMG_90B5C8C0-8E86-43B7-8C3E-3CE4B7E8A35D.jpeg` confirmó actualización LIVE, pero obligaba al visitante a interpretar flechas y no mostraba el Gross. V371 conserva el enlace y muestra en cada casilla el Gross; una flecha aparece únicamente cuando ese hoyo tuvo ganador/perdedor y lleva la posición acumulada (`▲ 1 UP`, `▼ 1 DOWN`). Un hoyo empatado usa `—`, sin repetir flechas. El encabezado declara simultáneamente la posición de ambos jugadores.

El micrófono aprobado no se refactoriza ni se toca. `Intocables/MICROFONO_APROBADO.lock.json` sella por SHA-256 el transporte de voz y once bancos de Registro, Score individual, multihoyos, persistencia y AI UNIVERSAL; `intocables-gate.mjs` verifica hashes y ejecuta esos bancos antes de permitir build o despliegue.

El inventario V311 se reconstruye con sello `V371-MATCH-GROSS-MICROPHONE-LOCK`; `scripts/rebuild-inventory-pdfs.py`, el lock y los tres PDF quedan sincronizados con ambos ROADMAPS.

## V397 LAB · respaldo integral de historial y acceso recordado · 6 de septiembre de 2026

RC-044 reproduce que una cuenta conectada recuperaba 1 ronda aunque el dispositivo origen tenía 5 tarjetas oficiales. La causa era puntual: `backupCentralNow()` sólo enviaba la ronda global activa. V397 local recorre las rondas oficiales archivadas más la actual, deduplica por ID y crea una mutación central independiente para cada tarjeta. El banco permanente construye cinco IDs, repite uno y añade un borrador sin tarjeta; exige exactamente cinco.

El formulario añade `RECORDAR CORREO Y MANTENER SESIÓN`: sólo nombre/correo se guardan localmente; la contraseña permanece a cargo del gestor seguro del navegador mediante `autocomplete="username"` y `autocomplete="current-password"`. La sesión ya se revalida al abrir y sólo se cierra con la acción explícita. Archivos funcionales: `index-grupal.html`, `account-backup.js`, `test-v282-optional-account-backup.mjs`.

El commit remoto `59ce0183e085175b9609c93a5962ff2baa58b123` fue rechazado correctamente por `FAIL INVENTORY GATE`. El candado `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` se regeneró desde ese árbol limpio y se versiona junto con este cierre documental antes de repetir el Preview LAB. Producción permanece intacta.

El build LAB ejecuta `node audit-project.mjs`; la prueba externa V328 LIVE queda fuera del build porque requiere una clave no configurada. Los 114 paquetes deterministas continúan obligatorios y Producción permanece intacta.

Refinamiento V397 de Historial: las rondas se mantienen ordenadas por `playedAt`, con búsqueda por fecha ISO, numérica o visible en español y hasta ocho resultados por página. Un doble toque sobre una ronda abre su Score Card Global original. El Historial no muestra acciones de tarjeta; `ENVIAR TARJETA DIGITAL` existe exclusivamente dentro de la tarjeta abierta y comparte el PNG mediante la hoja nativa del dispositivo para seleccionar WhatsApp. Los ocho controles anteriores se retiran y el Historial oculta los lanzadores flotantes para dejar `ATRÁS` libre. La cuenta recuerda nombre/correo al escribir y permite mostrar u ocultar la contraseña sin guardarla. Producción permanece intacta.

## V397 · auditoría revocatoria IN/OUT y ATRÁS · 6 de septiembre de 2026

Se revocan todas las certificaciones visuales anteriores. El propietario comprobó etiquetas IN/OUT invertidas y tarjetas cerradas u originales sin `ATRÁS` o con superposición. La regla exclusiva del proyecto queda fijada: IN = hoyos 1–9, OUT = hoyos 10–18 y TOTAL = hoyos 1–18.

El inventario obligatorio contiene 16 vistas: cuatro operativas, cuatro Tarjetas Digitales Finales y ocho artefactos Global/Personal para General, Stableford, Match Play y Four Ball. Todas parten en FAIL. `AUDITORIA_TARJETAS_IN_OUT_ATRAS_V397.md` es el registro rector y `test-v397-card-in-out-back-contract.mjs` bloquea el orden IN/OUT/TOTAL tanto en la tabla principal como en los ocho artefactos; ninguna fila puede pasar a PASS sin captura posterior, modalidad, tres acumulados y `ATRÁS` visibles a la vez, más retorno y persistencia comprobados en navegador real. Producción permanece intacta.

Resellado remoto: la cabecera visible coloca IN después del hoyo 9 y OUT después del hoyo 18; ambos ROADMAPS viajan juntos en el commit que habilita un nuevo Preview.

Corrección RC-046-R2: la inspección real del Preview `4b1c04f` rechazó FOUR BALL porque el Control Manual aún rotulaba 36 de los hoyos 1–9 como OUT y 45 de los hoyos 10–18 como IN. `renderRoundManualEntry()` cambia únicamente el orden de esas dos etiquetas a IN/OUT; valores, cálculos, persistencia y módulos intocables permanecen idénticos. El banco V397 añade controles positivo y negativo específicos. Todos los PASS visuales continúan revocados hasta nuevas capturas post-deploy.

Corrección RC-046-R3: la tarjeta final abierta reduce sus acciones visibles a `ENVIAR TARJETA DIGITAL` y `ATRÁS`; el envío toma el Global oficial y abre la hoja nativa del dispositivo para seleccionar WhatsApp. El bloque anterior de múltiples opciones queda oculto sin modificar artefactos, resultados ni persistencia.

Resellado RC-046-R3: el primer transporte remoto truncó `index-grupal.html` y fue rechazado por Intocables; el blob completo `b4e2412e…` restauró el archivo sin cambios funcionales adicionales. El commit documental posterior vuelve a modificar ambos ROADMAPS para satisfacer el gate de atomicidad; Producción permanece intacta.

## V398 LAB · hoyo inicial por ronda · 6 de septiembre de 2026

RC-048 corrige únicamente la selección inicial del Control Manual. Al cambiar/restaurar ronda, General, Stableford, Match Play y Four Ball abren en hoyo 1 si no existen scores o en el primer hoyo pendiente si ya existen; una selección manual permanece mientras se siga en la misma ronda. `test-v398-manual-opening-hole.mjs` bloquea la reutilización del hoyo 18 residual. Producción permanece intacta y no existe PASS visual hasta comprobar las cuatro modalidades en el LAB nuevo.
# V398 · APERTURA DE HOYO E HISTORIAL ELIMINABLE — 06 SEPTIEMBRE 2026

LAB: las rondas vacías abren en hoyo 1, las parciales en el primer hoyo pendiente y las completas en su límite correcto. En Historial, una pulsación de 650 ms ofrece `ELIMINAR` con confirmación; el borrado se limita al archivo histórico y no reaparece durante la persistencia de la ronda activa. Pruebas: `test-v398-manual-opening-hole.mjs` y `test-v398-history-long-press-delete.mjs`. Producción permanece intacta.

Trazabilidad: dos builds V398 fueron rechazados por el gate documental (nombre literal de prueba y actualización conjunta de ROADMAPS); ninguno llegó al alias LAB ni a Producción.

Revisión Chrome remoto móvil: se retiró la cancelación por `pointerleave`; la pulsación sólo termina en `pointerup` o `pointercancel`, evitando falsos cortes por desplazamiento mínimo.

Compatibilidad: `contextmenu` abre la misma confirmación como respaldo del gesto prolongado nativo, sin ejecutar el borrado automáticamente.

## V399 LAB · limpieza de tarjetas, filtros e Intocables V378 · 6 de septiembre de 2026

Se elimina `REGÍSTRATE` de todas las tarjetas y de Stableford; queda una única acción de registro en la pantalla principal. El Historial mantiene hasta ocho rondas recientes en orden descendente y aplica filtros comprobados por modalidad, campo o ambos. General, Stableford, Match Play y Four Ball abren el Control Manual en hoyo 1 cuando están vacías o en el primer hoyo pendiente cuando ya tienen scores.

La auditoría detectó que V397 había sustituido indebidamente la voz físicamente aprobada. Se restaura byte por byte `api/voice-speech.js` de V378 y se sellan los siete bloques funcionales aprobados: registro de jugadores, score individual/múltiple, sensibilidad, umbrales y cierre. La voz queda fijada a Fish Audio `fish-audio/s2.1-pro-free`, `es-419`, velocidad `0.90`, sin ID fijo; la Comunicación Universal de 22 segundos continúa expresamente fuera de la aprobación.

Pruebas automáticas: `test-v397-card-in-out-back-contract.mjs`, `test-v398-manual-opening-hole.mjs`, `test-v279-local-card-library.mjs`, `test-v282-optional-account-backup.mjs` e `Intocables/intocables-gate.mjs`. Producción permanece intacta. Los PASS visuales de tarjetas siguen revocados hasta completar una nueva inspección física 1×1 sobre Preview LAB.

Evidencia y sellos incorporados: `Intocables/APROBACION_FISICA_REGISTRO_SCORES_V378.json`, `Intocables/CONFIRMACION_ESCRITA_V378.md` e `Intocables/EVIDENCIA_V378/CONFIRMACION_FISICA_V378_JAIME_KIRSTE.jpeg`.

Trazabilidad del cierre: los dos primeros builds V399 fueron rechazados por el gate documental —primero por no enumerar las tres evidencias en OVERALL y después por no modificar ambos roadmaps en el mismo resellado—. Ninguno alcanzó READY ni modificó Producción.

Corrección visual RC-051: el primer Preview READY V399 permitió abrir Práctica y confirmó que ocultaba `ATRÁS`. Se habilita el mismo control visible para toda ronda configurada; en Práctica regresa a principal sin convertirla en ronda oficial. El contrato V397 bloquea nuevamente esta ausencia.

Corrección RC-052: la prueba HTTPS real detectó `OPENAI_NOT_CONFIGURED` en Comunicación Universal y Reglas dentro del Preview, mientras la voz Fish Audio sí respondió. `api/universal-ai.js` y `api/golf-rules.js` usan ahora el OIDC administrado de Vercel cuando no existe llave directa; `test-v364-vercel-oidc-recovery.mjs` y `test-v328-official-golf-rules.mjs` bloquean esa regresión. No cambian micrófono V378, sus umbrales, tarjetas ni Producción.

Resellado RC-052: `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` se regeneró con el script oficial después del cambio de seis archivos; los tres inventarios validan 400 fuentes y los PDF mantienen su contenido. El primer build RC-052 quedó rechazado por el inventario anterior y nunca sustituyó el LAB listo ni Producción.

Corrección física RC-053: la navegación visible desde Principal hacia Stableford podía conservar Práctica/General cuando `DOMContentLoaded` ya había ocurrido. `index-grupal.html` abre inmediatamente el registro Stableford si el documento ya está cargado y conserva el listener sólo durante carga; `test-stableford-ui.mjs` bloquea la regresión. El defecto fue detectado en navegador real antes de entregar el enlace; Producción permanece intacta.

Compatibilidad RC-053: `test-v252-stableford-persistence-category-course.mjs` exige también la apertura inmediata segura, sin conservar el patrón heredado que esperaba únicamente `DOMContentLoaded`.

## V400 LAB · ronda activa multimodal persistente · 6 de septiembre de 2026

RC-054 corrige el FAIL físico en reapertura instalada: una Stableford viva con scores podía ser desplazada por una Práctica antigua porque la clave canónica excluía esa modalidad. `index-grupal.html` guarda y recupera ahora como ronda activa cualquiera de las cuatro modalidades válidas; `test-v365-active-round-empty-recovery.mjs` bloquea que una Práctica vieja reaparezca sobre Stableford. La tarjeta viva conserva jugadores, scores y primer hoyo pendiente; una ronda nueva confirmada sustituye la clave activa y la anterior queda únicamente en Historial. Producción permanece intacta.

Los contratos heredados `test-v260-round-points-player-return.mjs`, `test-v267-one-operational-line.mjs`, `test-v363-intocables-behavior.mjs` e `Intocables/intocables-gate.mjs` rechazan ahora expresamente la exclusión anterior de Stableford y exigen recuperación canónica para cualquier modalidad válida.

`service-worker.js` usa la firma `v400-active-round-multimodal` para que una app instalada reemplace el HTML anterior; los bancos V357, V361, V364, V365 y V368 conservan sus controles acumulados y exigen la nueva caché.

Corrección física RC-054-R2: al elegir Stableford desde `NUEVA RONDA`, una Stableford activa podía impedir el formulario limpio y reabrir sus jugadores/scores. La entrada explícita `sfEmergency` queda por delante de la recuperación normal y ejecuta siempre `openFreshStablefordSetup()`; la tarjeta viva sólo se sustituye al confirmar la nueva. `test-stableford-ui.mjs` fija esa prioridad.

RC-055: la revisión física de imágenes WhatsApp detectó `FINALIZAR RONDA` oculto permanentemente. `index-grupal.html` ahora lo muestra antes del cierre y habilita `ENVIAR TARJETA DIGITAL` después; `test-v397-card-in-out-back-contract.mjs` fija la transición. Producción permanece intacta.

RC-055-R2: el envío principal dejó de preparar HTML y usa `GSCCardFileExport.png()`; entrega un archivo `image/png` al selector del dispositivo o descarga el mismo PNG como respaldo. El contrato V397 exige esta ruta exacta.

RC-056 · V401: la prueba física de Inicio detectó `ReferenceError` al tocar el micrófono. Se restaura `releaseAiUniversalPlaybackForListening()` desde la implementación aprobada V378, se añade control de definición y se renueva sólo la caché LAB. Umbrales, sensibilidad, cierre, parsers y Fish Audio 0.90 permanecen intactos.


Bancos heredados alineados con el retorno de Práctica: `test-v262-provisional-optional-profile.mjs`, `test-v263-compact-players-back-button.mjs`, `test-v269-operational-matrix-demo.mjs`, `test-v288-stableford-one-touch-home.mjs` y `test-round-clock.mjs`.


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

## V402 LAB · voz latinoamericana y espera reducida · 7 de septiembre de 2026

`api/voice-speech.js` conserva Fish Audio `s2.1-pro-free`, `es-419`, sin ID fijo y velocidad exacta `0.90`, pero elimina la instrucción contradictoria “pronunciación castellana”: exige español latinoamericano natural para Guatemala, sin ceceo ni acento de España. `index-grupal.html` prohíbe que una respuesta española caiga a `speechSynthesis` local; si Fish falla, muestra error en vez de reproducir un locutor español no autorizado. Los límites máximos bajan exactamente a la mitad: AI Universal `55→27.5 s`, Fish `45→22.5 s`, y el máximo de salida hablado se reduce 50% sin bajar el razonamiento de preguntas profundas. Registro, scores, sensibilidad, umbrales y `service-worker.js` no cambian. Producción intacta; aprobación auditiva física del Preview pendiente.

V402-S1: sello de inventario alineado con los tres PDF remotos existentes y publicado junto con ambos ROADMAPS; no cambia código funcional ni Producción.

V403 LAB · continuidad tras primer turno: `index-grupal.html` distingue el `aborted` que Safari emite durante un cierre solicitado por la propia aplicación. Ese evento finaliza limpio y vuelve a verde en lugar de mostrar falsamente “reconocimiento no disponible”. `test-v357-ios-voice-transport-recovery.mjs` fija la frontera; la autorización expresa actualiza únicamente el hash `microfono_compartido`. Voz Fish, velocidad, sensibilidad, umbrales, Registro, scores y Producción permanecen intactos.

RC-058: el diálogo `ELIMINAR RONDA` bloquea selección de texto y menú Copiar/Buscar en iPhone mediante `user-select:none` y `-webkit-touch-callout:none`; confirmación y borrado permanecen iguales. `service-worker.js` usa `v401-rc058-fresh-shell` para que el dispositivo reciba también el flujo vigente de `NUEVA RONDA`. V364/V365/V368/V397/V398 e Intocables PASS. Producción intacta.

* RC-059 · NUEVA RONDA Stableford limpia estado activo heredado de General, Match Play y Four Ball antes de abrir Registro; prueba física cruzada originó la corrección y V364 cubre la regresión. Producción intacta.

* RC-059 ATÓMICO · Ambos roadmaps registran conjuntamente la corrección Stableford derivada de prueba física; pendiente de repetición publicada antes de aprobación.

* RC-059 SELLO FINAL · Código, regresión, Roadmap Overall, Roadmap A Detalle e inventario quedan unidos en el mismo commit preventivo.

* RC-059 CIERRE V289 · El arnés aislado declara archivado, limpieza de claves y captura; V289/V364 validan NUEVA RONDA Stableford sin herencia cruzada.

* RC-060 · Registro Stableford oculta físicamente el main anterior mientras el overlay está visible; evita mostrar jugadores/scores archivados debajo del formulario vacío.

* RC-061 · Tráfico GPS acepta el conector «de acá para DESTINO»; la frase exacta «de acá para el parque central de la zona uno» resuelve origen GPS sin pedirlo al usuario.
# V404 LAB · bloqueo previo de selección al eliminar historial · 7 de septiembre de 2026

La captura física `IMG_2946.png` demostró que Safari seleccionaba el texto de la ronda durante los 650 ms anteriores a abrir `ELIMINAR RONDA`, por lo que aparecía el menú `Copiar / Buscar selección` aunque el diálogo ya estuviera protegido. `index-grupal.html` aplica `-webkit-user-select:none`, `user-select:none` y `-webkit-touch-callout:none` a `.card-library-round` y todos sus descendientes, además de cancelar `selectstart` exclusivamente dentro de `[data-library-round]`. `test-v398-history-long-press-delete.mjs` bloquea la regresión; `service-worker.js` renueva la caché a `v404-rc058-prepress-selection-lock` y `test-v365-active-round-empty-recovery.mjs` exige esa identificación exacta. El borrado, doble toque, tarjetas, scores, voz y MAIN no cambian. Automático PASS; prueba física iPhone pendiente en Preview LAB.
# V405 LAB · botón permanente de actualización · 7 de septiembre de 2026

El LAB permanente incorpora una tecla `ACTUALIZAR` siempre ubicada en la esquina superior: permanece oscura y deshabilitada cuando el release instalado coincide con el publicado; al detectar otro `gscg-release`, se habilita en verde y parpadea. El identificador blindado `gscg-build` V363 permanece intacto. Al tocarla ejecuta `persist()` antes de recargar el mismo origen, por lo que no borra ronda, scores, historial ni perfil. La detección usa `fetch(...,{cache:"no-store"})` cada 30 segundos y al volver a primer plano. `test-v365-active-round-empty-recovery.mjs` exige estado apagado, activación, parpadeo, ausencia de bloqueo `inert` y caché V405. MAIN y Producción no cambian.

## Control permanente de continuidad LAB · 7 de septiembre de 2026

`CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md` es la fuente única para conversaciones nuevas: congela MAIN, identifica el último LAB publicado, conserva V405, la migración del iPhone, pruebas físicas y el mensaje reutilizable. `test-lab-continuity-master.mjs` protege sus anclas; `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/MATRIZ_GATE_0_PROYECTO.json` lo vuelve control requerido y `audit-project.mjs` ejecuta el candado. No cambia código funcional, almacenamiento, Preview ni Producción.

El registro se incorpora también a `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`; `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` y los tres PDF `Inventario_Golf_Score_Card_GT_OVERALL_V311.pdf`, `Inventario_Golf_Score_Card_GT_A_DETALLE_V311.pdf` e `Inventario_Golf_Score_Card_GT_POR_IMAGENES_Y_RUBROS_V311.pdf` se regeneran para sellar las 402 fuentes.

## V405-R2 LAB · BORRAR TODO y Tarjeta Digital móvil · 7 de septiembre de 2026

La captura física `IMG_2949.png` rechaza la Tarjeta Digital anterior: accesos globales estaban montados sobre `FINALIZAR RONDA` y `ATRÁS`, mientras el ancho exterior de 1500 px desbordaba el iPhone. `index-grupal.html` añade `BORRAR TODO` para vaciar únicamente los seis jugadores del Registro y crea aislamiento `gsc-final-card-open`; en móvil apila título/acciones y confina el desplazamiento a la tabla. `test-v405-registration-clear-final-mobile.mjs` fija ambos contratos, `audit-project.mjs` lo vuelve obligatorio, `service-worker.js` publica la caché `v405-r2-registration-clear-mobile-card` y `test-v365-active-round-empty-recovery.mjs` sella release/caché. `REGISTRO_REINCIDENCIAS_CALIDAD.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md` y `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` registran el estado. MAIN permanece intacta; prueba física iPhone 4/4 pendiente.
