Warning: truncated output (original token count: 48845)
Total output lines: 1507

# ROADMAP OVERALL

## V370-R1 · Cedar principal y recuperación española compatible con iOS

La prueba física del 3 de septiembre mostró que Safari no exponía ninguna voz que coincidiera con la lista cerrada de nombres masculinos y la aplicación quedaba muda. V370-R1 conserva Cedar 0.90 como locutor principal, fuerza español `es-MX` y, si el servicio está limitado, elige cualquier voz `es-*` que iOS exponga, priorizando nombre masculino y español latino. No cambia Registro, Score Card, cálculos, persistencia ni Producción. El caché instalable cambia a `v370-r1-ios-spanish-voice`.

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
| `test-v267-one-operational-line.mjs` | Alinea el contrato de transcripción con idioma automático. |
| `test-v271-realtime-prompt-limit.mjs` | Conserva el límite Realtime con idioma automático. |
| `test-v312-general-caddie.mjs` | Amplía la verificación universal a idioma automático y caché V321. |
| `test-stableford-ui.mjs` | Alinea el build esperado con V321. |
| `test-v272-definitive-operational-release.mjs` | Alinea el build esperado con V321. |
| `test-v274-complete-courses-voice-operations.mjs` | Alinea el build esperado con V321. |
| `test-v275-stable-live-voice-turns.mjs` | Alinea el build esperado con V321. |
| `test-v276-manual-hole-navigation.mjs` | Alinea el build esperado con V321. |
| `test-v277-official-round-corrections.mjs` | Alinea el build esperado con V321. |
| `test-v278-card-image-pdf-export.mjs` | Alinea el build esperado con V321. |
| `test-v279-local-card-library.mjs` | Alinea el build esperado con V321. |
| `test-v280-local-history-insights.mjs` | Alinea el build esperado con V321. |
| `test-v281-pwa-installation.mjs` | Alinea la caché instalable esperada con V321. |
| `test-v284-native-package-generation.mjs` | Alinea el paquete web esperado con V321. |
| `test-v290-brand-icons-cleanup.mjs` | Alinea el build esperado con V321. |
| `test-v304-homogeneous-registration-actions.mjs` | Alinea el build esperado con V321. |
| `test-v305-history-navigation-zero-error.mjs` | Alinea el build esperado con V321. |
| `test-v307-match-arrows-format.mjs` | Alinea el build esperado con V321. |
| `GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md` | Registra la especificación y estado operativo de AI UNIVERSAL ∞. |
| `MANUAL_COBERTURA_FUNCIONAL_V311.md` | Ubica AI UNIVERSAL ∞ en la página 73 y su prueba técnica. |
| `docs/manual/v311/manual-pages-17-35.json` | Explicación para un niño de diez años: voz, texto, órdenes, contexto y límites reales. |
| `scripts/update-manual-page-73.py` | Genera la página 73 V321 sin alterar portada ni páginas anteriores. |
| `docs/manual/v311/page-73.png` | Imagen 4K verificada de AI UNIVERSAL ∞. |
| `docs/manual/v311/Manual_Golf_Score_Card_GT_COMPLETO.pdf` | Manual completo actualizado; portada primero y página 73 AI UNIVERSAL ∞. |
| `docs/manual/v311/Manual_de_Funciones_Golf_Score_Card_GT_01-16.pdf` | Alias PDF completo actualizado con el mismo orden correcto. |
| `test-v311-manual-semantic-coverage.mjs` | Exige la explicación V321 y los cinco controles en el Manual. |
| `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` | Sello de inventario recalculado sobre las fuentes V321. |

## Golf Score Card GT

Este es el mapa general y sencillo del proyecto. El nombre comercial único es **Golf Score Card GT**.

Los nombres `EPG-CADDY`, `epg-caddy`, `EPGCaddy` y `com.epgcaddy.app` sólo permanecen como códigos internos antiguos porque cambiarlos rompería enlaces, publicaciones o la identidad futura de las apps. No se muestran como nombre comercial al consumidor.

## Estado actual

- Corte consolidado de este inventario: **V311 · 25 de agosto de 2026**.
- Código oficial GitHub en `main`: `e938fd4d1f1815fdfac3a4babc68c3beedfd96c5`.
- Vercel: **READY**.
- Publicación Vercel vigente: `dpl_FkfVRcQVUK8AnWdgtW5gU6eG9KEh`.
- Aplicación oficial: https://epg-caddy.vercel.app/
- Errores de publicación actuales: **0**.
- Advertencias actuales: **0**.
- Auditoría maestra: **PASS · 69 paquetes**.

## Aplicación Apple y Android

- Nombre visible: **Golf Score Card GT**.
- Identidad técnica compartida: `com.epgcaddy.app`.
- Versión móvil preparada: `0.9.0`.
- Número de paquete preparado: `290`.
- Paquete para iPhone: preparado para Xcode y futura firma.
- Paquete para Android: preparado para Android Studio y futura firma.
- Compras y suscripciones: ruta preparada con RevenueCat.
- Icono App Store: 1024 × 1024.
- Icono Google Play: 512 × 512.
- Iconos PWA: 512 × 512 y 192 × 192.
- Icono de acceso directo Apple: 180 × 180.

## Organización actual

- Archivos activos rastreados en Git al corte V311: **197**.
- Base visual original V292: **160 archivos activos** distribuidos en nueve páginas.
- Continuación documentada después de crear la base visual: **V294 a V311**.
- Corte solicitado para revisión: **desde la línea 160 hacia abajo se considera nuevo**.
- Archivos de la colección `ROADMAP_IMAGES`: **22**.
- Archivos históricos retirados del uso diario: **89**.
- Procesos automáticos actuales conservados: **4**.
- Ramas GitHub inventariadas: **80**.
- Ramas ya incluidas en main: **70**.
- Ramas con cambios propios conservadas: **9**.
- Publicaciones Vercel de la base visual histórica: **622**; los despliegues V306-V311 quedan identificados en la continuación documental.
- Base central preparada: **22 grupos de información**.
- Nombres internos de guardado en el teléfono identificados: **14**.

## Limpieza completada

- Retirados 88 procesos automáticos históricos.
- Retirado un script antiguo V112.
- Todo permanece recuperable en el historial de GitHub.
- El nombre visible EPG Caddy fue sustituido por Golf Score Card GT.
- README, documentación, PWA, Apple, Android y procesos actuales usan la marca oficial.
- Los iconos oficiales quedaron centralizados dentro de `assets/official-logos/`.
- La instalación de Vercel quedó sin errores ni advertencias.

## Mapas detallados

- [ROADMAP A DETALLE · Directorio visual en nueve páginas](ROADMAP_A_DETALLE.md)
- [Mapa de todos los archivos](CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md)
- [Mapa de GitHub, Vercel, Apple, Android y datos](CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_INFRAESTRUCTURA.m…28845 tokens truncated…uncional necesita un nombre nuevo para invalidar el shell anterior. Archivos exactos: `test-v281-pwa-installation.mjs`, `test-v284-native-package-generation.mjs`, `test-v290-brand-icons-cleanup.mjs`, `test-v304-homogeneous-registration-actions.mjs`, `test-v305-history-navigation-zero-error.mjs`, `test-v307-match-arrows-format.mjs`, `test-v312-general-caddie.mjs`, `test-v323-long-multitopic-context.mjs`, `test-v324-real-traffic.mjs`, `test-v325-ideal-microphone-timings.mjs`, `test-v326-no-silent-conversation.mjs`, `test-v327-tool-followup-no-silence.mjs`, `test-v328-official-golf-rules.mjs`, `test-v328-offline-official-rules.mjs`, `test-v329-skins.mjs` y `test-v330-side-games.mjs`. V352 exige aparte `gscg-mobile-v352-live` y `/live-control.js` en `test-v352-live.mjs`.

### V352-PREVIEW-R1 · candado remoto correcto

GitHub recibió el candidato V352 en `v352-live`. El primer webhook se activó con un commit sin cambios de árbol (`0e19b4c`) y Vercel lo rechazó correctamente mediante `FAIL ROADMAP GATE`, deployment `dpl_8ncVihJ46TWXqrMrWmKWgmcurbWh`. No se publicó ningún Preview ni cambió Producción. R1 registra el intento en ambos ROADMAPS, vuelve a sellar el inventario y obliga a que el siguiente commit remoto contenga la evidencia documental visible para el candado.

### V352-PREVIEW-R2 · parámetros Neon HTTP con tipo explícito

El deployment R1 `dpl_3fmsfq4BjuFzMgV3eYKGvPRWzSff` quedó READY y permitió la primera prueba contra la base principal. Crear un stream privado y leer su revisión 0 aprobaron; publicar el hoyo 1 devolvió `42P18` porque interpolaciones separadas dentro de `jsonb_build_object` no tenían tipo explícito para PostgreSQL. `api/live.js` ahora tipa `mutationId`, `secretHash` y revisión esperada en toda la sentencia atómica; `test-v352-live.mjs` agrega el candado negativo. También se actualizan `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_LIVE_018_GOLF_SCORE_CARD_GT_LIVE.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`. Producción permanece intacta.

V352-R2 remoto PASS: commit `6bc9901e068cf8f2026de6b0ab8580c2546819f5`, deployment `dpl_2BLAFZNazoogdQQS2mkxreNjBgh6`, READY. La prueba protegida devolvió página 200, creación 200, lectura inicial 200, publicación 200, lectura de Gross 5/Neto 4 en revisión 1 con 200, revocación 200 y `410 LIVE_REVOKED` final. Observabilidad: cinco respuestas 200, una 410 esperada y cero `error`/`fatal`. Los streams de diagnóstico fueron eliminados; Producción sigue en `0dc1ba7a62b6bd6aec92752c539ca641cf950e26`. Falta únicamente inspección visual y prueba física en iPhone antes de cualquier montaje.

## V353 · MONITOR GENERAL, MONITOR INDIVIDUAL y compartir mundial · 28 de agosto de 2026

V353 resuelve el escenario ideal de 80 personas y 30–40 teléfonos con una regla sencilla: cada grupo nombra un `CAPITÁN DE TARJETA`; sólo ese teléfono publica y los demás miran. El organizador comparte un enlace General. El usuario lo abre y elige entre dos botones universales: `1 · MONITOR GENERAL` para todo el torneo y `2 · MONITOR INDIVIDUAL` para cualquier jugador o grupo. La Score Card propia sigue intacta en su ventana.

Los jugadores elegidos para el Monitor Individual reutilizan la misma General y producen cero lecturas adicionales. Sólo una persona externa exige importar su vínculo individual como respaldo. La General recorre cursores mientras existan páginas, muestra 80 jugadores sin omisión ni duplicado y rotula posición, grupo, hoyos, Gross, Neto y +/− como resultado LIVE no oficial. El servidor serializa la unión al torneo y rechaza un segundo publicador activo del mismo grupo.

`COMPARTIR ♾️` usa la hoja nativa del teléfono: WhatsApp, Mensajes, correo, AirDrop, X u otra aplicación. El mismo vínculo funciona en USA, México, Italia o cualquier país y no fija un máximo de invitados. La seguridad no cambia: posesión del vínculo, sólo lectura, vencimiento y revocación inmediata.

V353 no modifica el esquema Neon: reutiliza las cuatro tablas y 15 índices LIVE V352, por lo que no existe migración nueva. Banco local PASS para 20×4 y 40×2, Monitor General + tres jugadores en el Monitor Individual con cero lecturas extra, importación externa, origen seguro, carga sin máximo fijo, privacidad, apertura separada y capitán único. Preview `dpl_2g6KPHDjaWbXuRfR8Ky88ai2U24F` READY y E2E remoto PASS: 20 grupos, 80 jugadores, tres páginas, vínculo individual, revisión LIVE 1, `409` duplicado, `410` revocado, cero runtime `error`/`fatal` y cero datos de prueba activos. Inspección visual y prueba física iPhone continúan como puertas independientes.

La compuerta V353 acepta el formato legible o compactado de `vercel.json` al verificar `/live-hub.html`; esto corrige exclusivamente un falso negativo de compilación y mantiene intacta la cobertura funcional.

Archivos exactos V353: `live-hub.html`, `live-hub.js`, `live.html`, `live-view.js`, `live-control.js`, `api/live.js`, `index-grupal.html`, `service-worker.js`, `vercel.json`, `test-v353-live-hub.mjs`, `test-v352-live.mjs`, `audit-project.mjs`, `DATABASE_ARCHITECTURE.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_LIVE_018_GOLF_SCORE_CARD_GT_LIVE.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `scripts/rebuild-inventory-pdfs.py` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.

Producción permanece exactamente en `0dc1ba7a62b6bd6aec92752c539ca641cf950e26`. Reversión V353: retirar Centro Live y sus controles, conservar la Score Card V352 y revocar los vínculos necesarios; ningún dato ni tabla requiere eliminación.

## V354 · Respaldo Safari: varios hoyos y General visible · 28 de agosto de 2026

La prueba física de las 07:05–07:06 rechazó el cierre de voz anterior: Registro y un hoyo individual funcionaron, pero varios hoyos no se aplicaron y una consulta General con HTTP 200 no produjo una respuesta visible o audible. V354 corrige esa ruta sin modificar el motor de scores: cuando la ronda tiene un solo jugador, el dictado puede omitir su nombre; `hoyo` y `hoyos` son equivalentes; cada lote válido se escribe mediante el flujo operacional existente. Una frase con forma de score pero inválida termina localmente y nunca se desvía a General.

La comunicación General abre el panel AI antes de enviar la consulta. La respuesta queda visible aunque Safari no arranque el sintetizador; un watchdog conserva una recuperación manual y la telemetría sólo registra estado técnico y cantidad de entradas, nunca transcripción, nombres, audio ni ubicación. El banco dinámico ejecuta tres hoyos, plural, aplicación en lote, orden abrir→enviar, respuesta visible y sanitización privada.

Archivos exactos V354: `index-grupal.html`, `service-worker.js`, `api/voice-health.js`, `test-v354-voice-fallback.mjs`, `test-v267-scorecard-combination-matrix.mjs`, `test-v270-consecutive-hole-voice-blocks.mjs`, `test-v352-live.mjs`, `test-v353-live-hub.mjs`, `audit-project.mjs`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `scripts/rebuild-inventory-pdfs.py` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.

Estado de corte V354: banco local y auditoría integral PASS. Commit remoto `d7deb09be3826430afc8e1f3d379f0a1137d215b`; Preview `dpl_CgqzYpVABY9djJehtFmH5cyFXHdn` READY. Vercel aprobó 96 paquetes; el navegador real abrió Golf Score Card GT, confirmó build y voz V354, AI ∞ y LIVE visibles, y cero errores de la aplicación. La prueba física iPhone permanece abierta. LIVE V353 conserva su arquitectura y E2E. Producción continúa intacta en `0dc1ba7a62b6bd6aec92752c539ca641cf950e26`.

## V355 · Audio automático iPhone y dictado distribuido · 28 de agosto de 2026

La prueba física de las 07:49 rechazó el audio de V354: la respuesta General apareció escrita, pero Safari no habló después de esperar Internet. V355 habilita `speechSynthesis` dentro del toque original de ENVIAR o del micrófono; el éxito exige `RESPONDIENDO EN VOZ` y la recuperación manual deja de contarse como aprobación.

La captura de las 07:51 mostró el dictado azul del teclado escribiendo `ANCAS GUSTAVO, 15 BLANCAS` dentro de NOMBRE. V355 distribuye la frase en Nombre, HDCP y Marcas sin reconstruir la pantalla ni cerrar el teclado. Sólo actúa con nombre, HDCP entero 0–54 y marcas válidas; una frase incompleta o inválida permanece manual.

Archivos exactos V355: `index-grupal.html`, `service-worker.js`, `api/voice-health.js`, `test-v354-voice-fallback.mjs`, `test-v355-ios-audio-dictation.mjs`, `audit-project.mjs`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `scripts/rebuild-inventory-pdfs.py` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`. Producción permanece intacta; Preview y PASS físico iPhone son puertas separadas.

Estado remoto V355: commit `b965ec4d87c1f0400bf655e5f8bdba6f003f5cc9`, deployment `dpl_7AaXsHMV7msb6f2dizQECu3ES55F` READY, `target:null`, auditoría Vercel de 97 paquetes PASS. Navegador real confirmó Golf Score Card GT, build/voz V355, AI UNIVERSAL ∞ visible y distribución automática `Prueba V355, 15 blancas` a Nombre/HDCP/Marcas con OK habilitado. Producción continúa intacta; falta exclusivamente el PASS físico iPhone de audio y dictado.

## V356 · Voz Cedar y corrección temporal de tráfico/clima · 28 de agosto de 2026

V356 integra dos controles inseparables: voz originada por micrófono sin transcripción visible y consultas temporales confiables. Tráfico y clima distinguen ahora, en zona Guatemala, datos actuales de estimaciones a 30 minutos, 1 hora, 3 horas, mañana y próxima semana. El clima usa la primera hora publicada igual o posterior a la solicitada y declara resolución de una hora; fuera del límite de 16 días informa que no existe pronóstico en vez de reutilizar el clima actual.

La reincidencia RC-027 documenta que V355 perdió una corrección existente en otra rama. `test-v356-traffic-weather-accuracy.mjs` queda incorporado a la auditoría junto con V324, V337 y las pruebas de voz V354–V356. La aceptación externa exige al menos 90% con tolerancias publicadas; coincidencia entre proveedores no se presenta como exactitud futura observada. Producción permanece intacta.

## V356 · conversación hablada sin texto, Cedar masculino y calidad verificable · 28 de agosto de 2026

La captura física `IMG_2160.png` confirmó que V355 ya hablaba, pero el turno pronunciado también aparecía escrito y Safari utilizaba una voz femenina distinta de la matriz aprobada. V356 separa las modalidades: una consulta iniciada por micrófono conserva pregunta y respuesta únicamente como contexto interno no visible; una consulta escrita conserva su historial escrito. Ninguna transcripción hablada aparece en el panel.

La matriz exacta recuperada es `Cedar`, velocidad `1.15`, locutor masculino adulto, serio, sobrio y profesional, con español internacional neutro. Realtime ya usaba esa matriz. El respaldo Safari deja de seleccionar la primera voz española del teléfono: `/api/voice-speech` genera `gpt-4o-mini-tts` con Cedar, intenta primero OpenAI directo y recupera por el endpoint oficial de voz de Vercel AI Gateway. Sólo si ambos fallan acepta una voz local cuyo nombre esté expresamente reconocido como masculino; nunca utiliza una voz femenina genérica.

La calidad no depende de respuestas improvisadas. Tráfico directo consulta exclusivamente Google Maps Routes con `TRAFFIC_AWARE_OPTIMAL` y entrega ETA, demora, distancia, nivel derivado y hora de cálculo. Clima directo consulta Open-Meteo estructurado; la ficha escrita puede mostrar el horario completo, mientras la voz resume condición, temperatura, viento, lluvia, pico y acción. AI UNIVERSAL usa GPT-5.6, profundidad adaptable, búsqueda web para datos cambiantes, límites explícitos y salida con conclusión, evidencia, riesgo y recomendación. El banco conserva 100 de 100 áreas universales enrutadas, tráfico, clima, respuesta profunda, multihoyos, Registro y LIVE.

Archivos exactos V356: `index-grupal.html`, `api/universal-ai.js`, `api/voice-speech.js`, `service-worker.js`, `test-v356-voice-only-cedar-quality.mjs`, `test-v355-ios-audio-dictation.mjs`, `test-v354-voice-fallback.mjs`, `test-v352-live.mjs`, `test-v353-live-hub.mjs`, `audit-project.mjs`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `scripts/rebuild-inventory-pdfs.py` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`. Producción permanece intacta; banco completo, Preview, navegador y prueba física siguen como puertas separadas.

## V357 · recuperación real del micrófono iPhone · 28 de agosto de 2026

Los registros del Preview V356 localizaron la causa común de Score Card y AI UNIVERSAL: seis aperturas de Registro/Ronda devolvieron `POST /api/session-grupal 429`, mientras `/api/universal-ai` respondió 200. Safari intentaba abrir el reconocimiento alternativo sólo después de esperar Realtime y para entonces el gesto físico ya no conservaba autorización.

V357 abre `webkitSpeechRecognition` dentro del mismo toque en iPhone/iPad, antes del primer `await`. La captura local usa modo continuo, cinco alternativas, tres segundos de silencio para cerrar el lote, reinicio cuando Safari termina naturalmente y dos reintentos ante `audio-capture` o red. Los scores continúan primero por el parser y escritor local; AI UNIVERSAL conserva `voiceOnly`, Cedar masculino 1.15 y cero transcripción visible. Un score ambiguo no se escribe. La telemetría guarda únicamente estados acotados.

El control entre conversaciones queda incorporado en `AGENTS.md` y GitHub: la rama canónica debe sincronizarse antes de editar; los bancos V354–V357 de voz y V324/V337/V356 de tráfico-clima son obligatorios. Ninguna corrección sustituye archivos completos desde una rama paralela.

Archivos exactos V357: `.github/workflows/roadmap-gate.yml`, `AGENTS.md`, `api/voice-health.js`, `audit-project.mjs`, `index-grupal.html`, `package.json`, `service-worker.js`, `scripts/rebuild-inventory-pdfs.py`, `test-v352-live.mjs`, `test-v353-live-hub.mjs`, `test-v354-voice-fallback.mjs`, `test-v355-ios-audio-dictation.mjs`, `test-v356-voice-only-cedar-quality.mjs`, `test-v357-ios-voice-transport-recovery.mjs`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`. Producción permanece intacta; banco automático, Preview, navegador y PASS físico iPhone son puertas separadas.

## V358 · micrófono integrado y continuidad de ronda · 28 de agosto de 2026

V358 parte del árbol sincronizado V357 y conserva en una sola línea el dictado de Registro, scores de uno o varios hoyos, AI UNIVERSAL sin texto hablado, Cedar masculino 1.15 y las correcciones V356 de tráfico y clima. Corrige RC-029: abrir nuevamente la aplicación con `?inicio=1` ya no coloca Registro encima de una tarjeta activa. Si existe una ronda configurada, la tarjeta y sus scores permanecen visibles; sólo `NUEVA RONDA` abre el registro para reemplazarla.

Archivos exactos V358: `index-grupal.html`, `service-worker.js`, `test-v358-active-round-reopen.mjs`, `test-v357-ios-voice-transport-recovery.mjs`, `test-v356-voice-only-cedar-quality.mjs`, `test-v355-ios-audio-dictation.mjs`, `test-v354-voice-fallback.mjs`, `test-v353-live-hub.mjs`, `test-v352-live.mjs`, `test-v311-neutral-match-home-link.mjs`, `audit-project.mjs`, `scripts/rebuild-inventory-pdfs.py`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`. Producción permanece intacta; auditoría, Preview y PASS físico iPhone son puertas separadas.

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

RC-040 consolida las conversaciones sobre `fix-v366-integrated-main` (`03ca12e`). El enlace web oficial abre Registro aun con Match Play persistido, sin borrar la tarjeta; la app instalada conserva su entrada PWA y reabre la tarjeta viva. El navegador reprodujo y V368 eliminó `Cannot access 'standaloneApp' before initialization`. El banco V368, los contratos V364/V366 actualizados, la caché, `scripts/rebuild-inventory-pdfs.py`, controles, informe y ambos ROADMAPS bloquean enlaces V365–V367. Producción no se modifica; Preview y PASS físico iPhone continúan obligatorios.

Evidencia literal V368: `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V368_ENTRADA_CANONICA/REPORTE_V368_RC040.md` y `test-v368-canonical-home-entry.mjs`.

### V368-LAB-R1 · reparación documental del despliegue

Se restaura `ROADMAP_OVERALL.md` como UTF-8 válido, se registra simultáneamente `ROADMAP_A_DETALLE.md` y se recalcula `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`. No cambia código funcional, Producción ni Individual.

## V369 · voz comprensible, micrófono universal de un turno y tráfico GPS · 3 de septiembre de 2026

RC-041 corrige exclusivamente el LAB: baja Cedar/Onyx/Realtime y el respaldo masculino local de 1.15 a 0.90; cuando Safari termina naturalmente una pregunta universal, la procesa sin reabrir hasta 12 capturas; y convierte “aquí”, “acá”, “mi ubicación” o equivalentes en una solicitud de GPS consentida antes de recalcular Google Maps Routes. El clima conserva Open-Meteo y ahora se reproduce con la misma voz masculina neutral más lenta. AI UNIVERSAL hablada conserva el mismo razonamiento, investigación, comparación, contexto, evidencia y profundidad de la salida escrita; sólo cambia el formato para ser audible, sin límite artificial de 3–6 oraciones. La caché V369 impide que el iPhone conserve el JavaScript anterior.

Archivos literales V369: `index-grupal.html`, `api/voice-speech.js`, `api/universal-ai.js`, `service-worker.js`, `test-v356-voice-only-cedar-quality.mjs`, `test-v357-ios-voice-transport-recovery.mjs`, `test-v361-synchronized-voice.mjs`, `test-v362-physical-voice-recovery.mjs`, `test-v369-physical-voice-weather-traffic-recovery.mjs`, `audit-project.mjs`, `package.json`, `scripts/rebuild-inventory-pdfs.py`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`. Producción permanece intacta; Preview READY y prueba física iPhone siguen separados del PASS automático.
## V370 · español nativo, cierre físico y latencia acotada · 3 de septiembre de 2026

El reporte físico rechaza V369. Los logs del Preview muestran aproximadamente diez segundos entre apertura y transcripción en el respaldo Safari, seguidos por seis segundos hasta comenzar voz, con TTS directo 429 y caída a Onyx. V370 admite exclusivamente una voz instalada `es-*` identificada como masculina; si iOS no la ofrece, muestra un bloqueo explícito y no cae a Cedar, Onyx, inglés, Spanglish ni voz femenina. Cierra físicamente la pista del micrófono antes de investigar o responder y dirige conversación, clima y tráfico por el mismo endpoint universal profundo. Los límites pasan a VAD 0.9 s, silencio Safari 1.2 s, primer resultado 8 s, espera de inicio 15 s e inactividad 12 s. La calidad intelectual no se reduce; sólo se elimina la cadena de audio lenta y el retorno automático a escucha.

Archivos literales V370: `index-grupal.html`, `service-worker.js`, `test-v370-native-spanish-fast-close.mjs`, `audit-project.mjs`, `package.json`, `scripts/rebuild-inventory-pdfs.py`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, ambos ROADMAPS e inventario. Producción permanece intacta. Ningún banco automático puede certificar por sí solo timbre, acento o percepción de velocidad en el iPhone físico.
### V371-R1 · voz española con México prioritario y respuesta restaurada

La salida hablada de Comunicación Universal, clima y tráfico deja de usar Cedar/Onyx porque la prueba física reportó acento Spanglish. El primer V371 exigió que Safari publicara una voz `es-MX`; cuando el catálogo llegó vacío, ocultó el texto por `voiceOnly` y quedó sin audio. V371-R1 conserva intactos los tiempos y el transporte V370, prioriza `es-MX`, acepta únicamente otra voz `es-*` como respaldo y, aun si Safari demora el catálogo, crea el `SpeechSynthesisUtterance` con `lang="es-MX"` sin devolver `false`. Registro, Score, cálculos, persistencia, APIs de clima/tráfico y Producción no cambian.

### V371-R2 · voz iniciada, no sólo solicitada

V371-R1 queda rechazada por las capturas físicas: Safari recibió la respuesta pero no inició la síntesis. R2 activa `speechSynthesis` en el mismo toque del micrófono y sólo declara éxito desde `onstart`; un guard de 2 s cancela una cola muda y deja un error recuperable. El parche no modifica Registro, scores, cálculos, persistencia, tarjeta ni proveedores de clima/tráfico. Producción permanece intacta.

### V371-R3 · salida universal audible independiente de Web Speech

Evidencia física R2: tres consultas recibieron respuesta HTTP 200, pero Safari no inició `SpeechSynthesisUtterance` y el cliente mostró error. R3 restaura únicamente el transporte MP3 de `/api/voice-speech`, ahora con voz Onyx, velocidad 0.90 e instrucción explícita de español mexicano neutro sin Spanglish. El éxito requiere `Audio.onplay`; el respaldo local nunca selecciona voces inglesas. Registro, Score, motores deportivos, persistencia, diseño y Producción permanecen intocables.

### V371-R4 · voz Gateway Echo en español mexicano

La prueba física R3 rechazó el timbre/acento Spanglish. El log real confirmó que el proveedor directo cayó por 429 y el audio 200 fue generado por `tts-1-hd + Onyx`, ruta que no aplica las instrucciones mexicanas como el modelo directo. R4 sustituye exclusivamente Onyx por Echo masculino, envía `language="es-MX"`, conserva 0.90 y fuerza caché nueva. Registro, Score, motores, persistencia, clima, tráfico y Producción permanecen intocables.

### V371-R5 · salida universal exclusivamente en español neutral

La prueba física R4 rechazó una respuesta hablada en inglés. La causa quedó localizada en `api/universal-ai.js`: conversación universal y los seguimientos de clima/tráfico todavía autorizaban responder en el idioma detectado del usuario. R5 cambia exclusivamente esas tres instrucciones para exigir español neutral latinoamericano y prohibir inglés o Spanglish incluso ante transcripción mixta. `test-v371-spanish-only-universal.mjs` bloquea la reaparición de las instrucciones permisivas; `audit-project.mjs`, `package.json`, `scripts/rebuild-inventory-pdfs.py` y el inventario sellan el control. Registro, Score, cálculos, persistencia, interfaz y Producción permanecen intactos.
