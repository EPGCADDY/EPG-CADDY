Warning: truncated output (original token count: 23015)
Total output lines: 702

# ROADMAP A DETALLE

## R18-LAB · acceso propietario temporal de 24 horas · 8 de septiembre de 2026

- `api/_lib/app-access.js`: crea tokens opacos aleatorios de 32 bytes, guarda únicamente SHA-256, valida 24 horas exactas, revoca por propietario y conserva feedback agregado sin nombres ni identidad. Elimina cada acceso y su bitácora mediante una purga horaria programada desde las 47 horas para no superar 48 horas.
- `api/app-access.js`: expone canje, estado, creación, revocación, salida, feedback anónimo, reporte exclusivo del propietario y limpieza autenticada por `CRON_SECRET`.
- `middleware.js`: cierra la aplicación pública, bloquea cuenta, respaldo, sincronización, comercio y administración para invitados, y rechaza tokens vencidos o revocados.
- `access.html`: permite únicamente a la cuenta propietaria abrir la aplicación, crear/revocar el enlace y consultar actividad anónima.
- `index-grupal.html`: separa el almacenamiento local del invitado, informa la bitácora temporal, impide instalación offline, comprueba acceso cada 15 segundos y reporta sólo modalidad, cantidad de jugadores, hoyos usados y número de anotaciones.
- `guest-access.js`: instala antes de los módulos funcionales el almacenamiento aislado y el aviso de privacidad sin alterar los motores de la aplicación.
- `package.json`: incorpora `@vercel/functions` para el middleware oficial.
- `vercel.json`: programa la eliminación horaria; el umbral de 47 horas garantiza borrado antes del máximo de 48.
- `test-r18-owner-guest-24h-access.mjs`: bloquea regresiones de propiedad, token, cookie, vencimiento, revocación, privacidad, rutas prohibidas, feedback y purga.
- `audit-project.mjs`: incorpora el banco específico a la auditoría integral.
- `scripts/rebuild-inventory-pdfs.py`: identifica los tres inventarios con el corte real R18-LAB y elimina metadata heredada V367/V371.
- Estado: implementación y banco dirigido PASS en copia LAB aislada; identidad exacta `EPG_OWNER_USER_ID`/alternativa configurada, Preview y pruebas físicas propietario/invitado/expiración/revocación permanecen bloqueantes. MAIN y Producción intactas.

## V407-R10 · activación permanente del botón · 8 de septiembre de 2026

`index-grupal.html` cambia únicamente el estado operativo de `mandatoryUpdateButton`: `showCurrentBuild()` conserva `ACTUALIZADO` y retira `disabled`; el toque reutiliza `installMandatoryUpdate()` para guardar y recargar el shell. `service-worker.js` avanza release/caché a R10. Pruebas de versión sincronizadas. Sin cambios gráficos ni funcionales fuera del actualizador; MAIN intacta.

## V407-R9 · botón ACTUALIZAR sustituye realmente el shell · 8 de septiembre de 2026

`index-grupal.html` avanza a `V407-R9-MANUAL-UPDATE-20260908`, presenta `ACTUALIZADO` oscuro cuando el release publicado coincide y activa `ACTUALIZAR` sólo ante una identidad diferente. `installMandatoryUpdate()` ejecuta `persist()`, desregistra los service workers del mismo origen, elimina únicamente cachés con prefijo `gscg-mobile-` y recarga el mismo URL con `app_version` y `update_check`; no elimina `localStorage`, jugadores, scores ni Historial.

`service-worker.js` avanza a `v407-r9-manual-update`; su evento `activate` asegura el shell aprobado y toma control, pero no promueve ni navega automáticamente. `test-v407-r9-manual-update.mjs` sella el flujo y se incorpora a `audit-project.mjs`. Los bancos de versión V365/V406/V407 se sincronizan. Trazabilidad: continuidad, RC-088 y ambos ROADMAPS. Rollback: commit remoto R8 `bc86bd2`; MAIN intacta.

## V407-R8 · un solo scroll iPhone y actualización siempre verificable · 8 de septiembre de 2026

Compatibilidad del acceso instalado: el proyecto Vercel `golf-sc-gt-lab` sirve como espejo del canónico `epg-caddy.vercel.app`. `vercel.legacy-mirror.json` fija las reescrituras y prohíbe cachear HTML o `service-worker.js`, de modo que R6 puede detectar y recibir R8 desde el mismo icono del iPhone.

`#setupOverlay.visible` deja `position:fixed` y el desplazamiento anidado; dentro de `gsc-setup-open` pasa a `position:relative`, altura por contenido y `overflow:visible`. `main` se oculta durante ese registro para que el documento tenga una sola superficie desplazable. `recoverInstalledAppScrolling()` excluye expresamente `setupOverlay` de la mutación inline de altura/overflow.

El control de versión nace como `mandatory-update available`, habilitado, con texto `ACTUALIZAR`; el toque añade `app_version` y `update_check` para forzar promoción/verificación de caché preservando la ronda. Release y caché: `V407-R8-SINGLE-SCROLL-20260908` / `v407-r8-single-scroll`.

Puente para instalaciones atrapadas: al activarse, el service worker promueve R8 y navega solamente la ventana iPhone activa cuando su `app_version` es distinta. Así V407-R6 deja de depender del detector que permaneció gris en `IMG_3136.jpeg`, sin recargar múltiples ventanas ni congelar el scroll.

Archivos: `index-grupal.html`, `service-worker.js`, `test-v407-r7-ios-scroll.mjs`, `test-v365-active-round-empty-recovery.mjs`, `test-v406-r2-professional-design.mjs`, `test-v406-r23-visible-version.mjs`, `test-v406-r4-mobile-controls.mjs`, `test-v406-r5-simple-tournament-live.mjs`, `test-v407-r1-premium-visual-system.mjs`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`.

## V407-R7 · scroll iPhone y actualización visible · 8 de septiembre de 2026

Archivos: `index-grupal.html`, `service-worker.js`, `audit-project.mjs`, `test-v407-r7-ios-scroll.mjs`, `test-v406-r4-mobile-controls.mjs`, `test-v406-r2-professional-design.mjs`, `test-v407-r1-premium-visual-system.mjs`, `test-v406-r5-simple-tournament-live.mjs`, `test-v261-registration-stableford-modality.mjs`, `test-v329-skins.mjs`, `test-v330-side-games.mjs`, `test-v406-r23-visible-version.mjs`, `test-v365-active-round-empty-recovery.mjs`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`. Elimina el listener `touchstart` que recalculaba layout durante el gesto; los overlays usan un scroller `100dvh` independiente y la página conserva desplazamiento vertical nativo. Release/caché pasan a V407-R7 para activar la actualización desde el mismo enlace instalado.

Se incorpora el commit concurrente `39bb130e1cddd22d5f9d2c70ea07f26144ad3bd5`: elimina la división visual entre modalidades existentes/nuevos juegos, conserva una sola matriz bajo `MODALIDADES` y renombra la acción a `COMPARTE LIVE`.

El candado `test-v407-r7-ios-scroll.mjs` rechaza cualquier regreso de la mutación por `touchstart`.

## V407-R6 PRODUCCIÓN · enlace estable y actualización instalada · 8 de septiembre de 2026

Archivos de control modificados: `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`. El mismo árbol funcional y visual V407-R6 aprobado en Preview pasa a Producción; `gscg-release` y `service-worker.js` permiten que una instalación V406-R24 detecte la publicación, active `ACTUALIZAR`, promueva la caché V407-R6 y conserve la sesión local. Rollback exacto: commit `4009f79f50987f8bf105189bce9c5e90b2857363`.

## V407-R4 · Pantalla principal · área segura iPhone · 8 de septiembre de 2026

Las evidencias físicas `IMG_3120(1).png`, `IMG_3121(1).png` e `IMG_3122.png` demostraron que la barra de estado del iPhone cruzaba el logo y el bloque derecho. `index-grupal.html` agrega el `safe-area-inset-top` al contenedor móvil, mueve el bloque de ronda 36 px hacia el centro y separa versión/ACTUALIZADO 58 px del borde derecho. `service-worker.js` avanza release y caché a R4. `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md` conserva el estado entre conversaciones. No cambia scoring, voz, temporizador ni persistencia. Nueva revisión física publicada obligatoria; Producción intacta.

## V407-R3 · Pantalla 4 · Tarjeta Digital premium · 8 de septiembre de 2026

`index-grupal.html` corrige `finalCardOverlay`, `final-card-head`, `final-card-meta`, `final-card-shell` y `final-card-readonly`. Las acciones `COMPARTIR LIVE`, `FINALIZAR RONDA` o `ENVIAR TARJETA DIGITAL`, y `ATRÁS` comparten una retícula de tres columnas y alturas iguales. La tarjeta conserva negro, verde neón, blanco y rojo funcional, además del desplazamiento horizontal necesario para los 18 hoyos.

`service-worker.js` avanza a `V407-R3-PREMIUM-FINAL-CARD-20260908`. `test-v407-r1-premium-visual-system.mjs`, `test-v405-registration-clear-final-mobile.mjs`, `test-v365-active-round-empty-recovery.mjs` y los contratos visibles V406 verifican la geometría nueva, la versión y la permanencia de `ACTUALIZADO`.

Archivos exactos del corte: `index-grupal.html`, `service-worker.js`, `test-v407-r1-premium-visual-system.mjs`, `test-v365-active-round-empty-recovery.mjs`, `test-v405-registration-clear-final-mobile.mjs`, `test-v406-r2-professional-design.mjs`, `test-v406-r23-visible-version.mjs`, `test-v406-r4-mobile-controls.mjs`, `test-v406-r5-simple-tournament-live.mjs`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`.

Riesgo controlado: la vista sigue siendo de sólo consulta y no se toca `renderFinalDigitalCard`, `officiallyCloseRound`, `shareOfficialArtifactImage`, el escritor oficial ni los motores de modalidad. Rollback: commit V407-R2. Producción no cambia.

Revisión física Preview R3: se rechazó la primera captura porque `INSTALAR APP` invadía la vista y el cuarto metadato quedaba vacío en rondas casuales. `index-grupal.html` oculta `.pwa-install-button` durante `gsc-final-card-open` y presenta `RONDA CASUAL` mediante CSS sin modificar datos.

## V407-R1 · rediseño premium pantalla por pantalla · 8 de septiembre de 2026

Archivos de trazabilidad y regresión actualizados: `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `test-v406-r23-visible-version.mjs` y `test-v406-r5-simple-tournament-live.mjs`.

Inventario individual de vistas WhatsApp preservadas: `previews/whatsapp-cards-v406-r24/01_RONDA_NORMAL.html`, `previews/whatsapp-cards-v406-r24/02_STABLEFORD.html`, `previews/whatsapp-cards-v406-r24/03_MATCH_PLAY.html`, `previews/whatsapp-cards-v406-r24/04_FOUR_BALL.html`, `previews/whatsapp-cards-v406-r24/05_SCORE_CARD_PRACTICA.html`, `previews/whatsapp-cards-v406-r24/06_SKINS.html`, `previews/whatsapp-cards-v406-r24/07_WOLF.html`, `previews/whatsapp-cards-v406-r24/08_VEGAS.html`, `previews/whatsapp-cards-v406-r24/09_DOTS.html`, `previews/whatsapp-cards-v406-r24/10_TORNEO_LIVE.html` y `previews/whatsapp-cards-v406-r24/index.html`.

`index-grupal.html` añade variables de superficie, línea, radio, control y sombra premium. La cabecera móvil deja la marca y la información de ronda en columnas claras, elimina el segundo micrófono redundante del encabezado y conserva el micrófono operativo dentro de Información del Campo. `roundUtilityBar` usa cuatro controles equivalentes en una fila. `round-actions` organiza cuatro acciones en 2×2 y reserva una línea completa para NUEVA RONDA. `round-secondary-actions` fija tres columnas iguales. Registro, paneles, Historial y Tarjeta Digital heredan las mismas superficies, esquinas y alturas táctiles.

Control Manual sustituye el marco verde grueso por línea grafito, unifica las tres piezas de navegación, normaliza cajas de lectura/entrada a 48 px y conserva ENTER como única acción primaria de 56 px. La lógica, escritura y persistencia no cambian.

Corrección RC-084: `roundManualPlayerRows()` y `renderRoundManualEntry()` reemplazan columnas rígidas por `.round-manual-detail` y `.round-player-grid`. En móvil, ANTERIOR–HOYO–SIGUIENTE, datos de campo/modalidad, nombres, scores y totales se distribuyen con anchos adaptables; ENTER usa 62 px. Se conserva exclusivamente la paleta original negro, verde neón, blanco y rojo funcional. `test-v407-r1-premium-visual-system.mjs` bloquea la geometría y la introducción de degradados en el panel.

`test-v260-round-points-player-return.mjs` deja de exigir el ancho rígido histórico `103px 72px 72px .65fr .65fr .75fr` y bloquea en su lugar las seis columnas adaptables de escritorio y móvil. Se preservan jugadores, acumulados, Stableford, regreso y scores existentes.

`service-worker.js` renueva `ACTIVE_CACHE_NAME` y `RELEASE` a V407-R1. `test-v407-r1-premium-visual-system.mjs` exige las retículas, alturas y versión. Los bancos V406-R2, V406-R4, V406-R23 y V365 se alinean con la nueva identificación sin modificar sus contratos funcionales. Las capturas físicas `IMG_3102.png` y `IMG_3103.png` quedan como evidencia ANTES; el DESPUÉS requiere Preview y navegador móvil real. Producción no cambia.

## V406-R24 · Tarjetas gráficas WhatsApp · 8 de septiembre de 2026

Para revisión física del propietario se agrega `previews/whatsapp-cards-v406-r24/index.html` y las diez páginas `01_RONDA_NORMAL.html`, `02_STABLEFORD.html`, `03_MATCH_PLAY.html`, `04_FOUR_BALL.html`, `05_SCORE_CARD_PRACTICA.html`, `06_SKINS.html`, `07_WOLF.html`, `08_VEGAS.html`, `09_DOTS.html` y `10_TORNEO_LIVE.html`. Todas provienen de `card-artifacts.js` con datos de muestra cerrados y permiten inspeccionar exactamente la composición que alimenta el PNG compartido. El alcance queda aislado a LAB y Producción no cambia.

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
| `vegas.js` | `CURRENCY / POINT MATRIX / DUEL RISK` | Conserva GTQ/USD y calcula hoyos, duelos, volteos, puntos, dinero, neto, líder, mayor cambio y exposición máxima por duel…13015 tokens truncated…logos/golf-score-card-gt-google-play-512.png` | `0e85cc6995f9bafefb49dec5a8253aef3db7fffd` | Icono final de 512 para Google Play. |
| `assets/official-logos/golf-score-card-gt-official-master-1254.jpeg` | `1c3cdacf565de7b2ce42d57bb416a23c50af1b8e` | Copia maestra oficial del logo cromado 3D y verde neón. |
| `assets/official-logos/golf-score-card-gt-pwa-192.png` | `e28cd92c784748a2d4ff02bf3491b96c8121ed94` | Icono pequeño de la aplicación instalable. |
| `assets/official-logos/golf-score-card-gt-pwa-512.png` | `0e85cc6995f9bafefb49dec5a8253aef3db7fffd` | Icono grande de la aplicación instalable. |
| `index-grupal.html` | Registro V297 | Reduce 50 % el micrófono visible, conserva su botón y agrega una figura central clara. |
| `mobile-release.json` | Paquete `297` | Deja preparada la numeración móvil de esta versión. |
| `service-worker.js` | Caché `gscg-mobile-v297` | Obliga a descargar los nuevos iconos y retirar la caché anterior. |
| `test-v290-brand-icons-cleanup.mjs` | Validación V297 | Comprueba los iconos, el paquete móvil y la nueva caché. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Se genera con este mismo mapa | Actualiza códigos, tamaños y explicaciones sencillas. |
| `ROADMAP_A_DETALLE.md` | Se genera con este mismo archivo | Registra toda la actualización a detalle. |
| `ROADMAP_OVERALL.md` | Se genera con este mismo archivo | Registra toda la actualización en el resumen general. |

## Registro obligatorio de la actualización operativa V298

Autorización: **24 de agosto de 2026**. Alcance: cambiar únicamente la explicación situada arriba del micrófono para que un usuario nuevo entienda, de izquierda a derecha y sin términos técnicos, qué debe dictar o escribir y cuándo presionar OK.

| Archivo modificado | ID o código actualizado | Explicación sencilla |
|---|---|---|
| `index-grupal.html` | Registro V298 | Coloca a la izquierda y con letra mayor: DICTA O ESCRIBE, 1-NOMBRE, 2-HDCP, 3-MARCAS, DE CADA JUGADOR y 4-OK. |
| `mobile-release.json` | Paquete `298` | Deja preparada la numeración móvil de esta versión. |
| `service-worker.js` | Caché `gscg-mobile-v298` | Hace que la aplicación descargue la guía nueva y retire la pantalla anterior. |
| `test-v290-brand-icons-cleanup.mjs` | Validación V298 | Comprueba el contenido, orden, alineación y tamaño de la guía. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Se genera con este mismo mapa | Actualiza códigos, tamaños y explicaciones sencillas. |
| `ROADMAP_A_DETALLE.md` | Se genera con este mismo archivo | Registra V298 a detalle. |
| `ROADMAP_OVERALL.md` | Se genera con este mismo archivo | Registra V298 en el resumen general. |

## Registro obligatorio de la corrección operativa V299

Solicitud: **24 de agosto de 2026**. Alcance: corregir exclusivamente el logo superior que se veía agrandado en la aplicación instalada en iPhone. Se conserva sin cambios la guía para newbies y el micrófono aprobado.

| Archivo modificado | ID o código actualizado | Explicación sencilla |
|---|---|---|
| `index-grupal.html` | Registro V299 | Evita que el logo sea más ancho que su recuadro y deja libre la barra superior del iPhone. |
| `mobile-release.json` | Paquete `299` | Deja preparada la numeración móvil de esta corrección. |
| `service-worker.js` | Caché `gscg-mobile-v299` | Hace que la aplicación descargue la corrección y retire la pantalla anterior. |
| `test-v290-brand-icons-cleanup.mjs` | Validación V299 | Comprueba que el logo use 100 % máximo y respete el espacio seguro superior. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Se genera con este mismo mapa | Actualiza códigos, tamaños y explicaciones sencillas. |
| `ROADMAP_A_DETALLE.md` | Se genera con este mismo archivo | Registra V299 a detalle. |
| `ROADMAP_OVERALL.md` | Se genera con este mismo archivo | Registra V299 en el resumen general. |

## Registro obligatorio de la documentación operativa V300

Solicitud: **24 de agosto de 2026**. Alcance: crear un compendio final, básico y amigable para que el consumidor conozca las funciones reales disponibles sin términos de ingeniería ni promesas de capacidades todavía pendientes.

| Archivo modificado o nuevo | ID o código actualizado | Explicación sencilla |
|---|---|---|
| `COMPENDIO_FINAL_FUNCIONES_USUARIO.md` | Documento V300 | Explica cómo usar inicio, campos, modalidades, jugadores, scores, tarjetas, historial, correcciones, respaldo e instalación. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Se genera con este mismo mapa | Incorpora el documento nuevo al directorio completo. |
| `ROADMAP_A_DETALLE.md` | Se genera con este mismo archivo | Guarda V300 a detalle. |
| `ROADMAP_OVERALL.md` | Se genera con este mismo archivo | Guarda V300 en el resumen general. |

## Registro obligatorio de la actualización operativa V301

Solicitud: **24 de agosto de 2026**. Alcance: mostrar claramente la ruta normal, renombrar la tarjeta rápida y convertir el registro y la descripción de torneo en opciones expresamente identificadas como opcionales.

| Archivo modificado | ID o código actualizado | Explicación sencilla |
|---|---|---|
| `index-grupal.html` | Registro V301 | Muestra RONDA NORMAL, STABLEFORD y SCORE CARD - PRÁCTICA; además guarda la descripción opcional del torneo. |
| `COMPENDIO_FINAL_FUNCIONES_USUARIO.md` | Documento actualizado V301 | Explica al consumidor los nuevos nombres y el dato opcional. |
| `mobile-release.json` | Paquete `301` | Deja preparada la numeración móvil de esta actualización. |
| `service-worker.js` | Caché `gscg-mobile-v301` | Obliga a descargar la pantalla V301 y retirar la anterior. |
| `test-v290-brand-icons-cleanup.mjs` | Validación V301 | Comprueba nombres, orden, campo opcional, paquete y caché. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Se genera con este mismo mapa | Actualiza códigos y explicaciones sencillas. |
| `ROADMAP_A_DETALLE.md` | Se genera con este mismo archivo | Registra V301 a detalle. |
| `ROADMAP_OVERALL.md` | Se genera con este mismo archivo | Registra V301 en el resumen general. |

## Registro obligatorio de la actualización operativa V302

Solicitud: **24 de agosto de 2026**. Alcance: hacer que el registro Stableford use la misma línea gráfica y descriptiva que la Score Card General, sin modificar el motor de voz ni las reglas de la modalidad.

| Archivo modificado | ID o código actualizado | Explicación sencilla |
|---|---|---|
| `stableford.j
# V407-R2 · Pantalla 3 · tarjeta de puntuación y acciones · 08 de septiembre de 2026

- Archivo `index-grupal.html`: se agregó `scorecard-stage-title` con `TARJETA DE PUNTUACIÓN` y la guía `DESLIZA PARA VER TODOS LOS HOYOS`; `card-shell` recibe borde premium, radios inferiores, fondo negro y scrollbar verde de la familia visual original.
- Archivo `index-grupal.html`: la tabla mantiene cálculos, celdas, entrada manual y desplazamiento; no se cambió el escritor oficial ni el motor de score.
- Archivo `index-grupal.html`: acciones principales permanecen en matriz 2×2, `NUEVA RONDA` ocupa el ancho completo y `ATRÁS / BORRAR TODO / + JUGADOR` comparten tres columnas iguales.
- Archivo `test-v407-r1-premium-visual-system.mjs`: valida literalmente la nueva estructura y rechaza cambios de paleta en la tarjeta.
- Rollback: regresar al commit anterior de `lab/premium-ui-v407`; Producción no se modifica.

# V407-R6 · Contrato cruzado Universales · 08 de septiembre de 2026

- `index-grupal.html`, `live-control.js` y `live-hub.js`: el nombre activo de la modalidad general pasa a **MEDAL PLAY NORMAL**, sin alterar cálculo ni persistencia.

- `CONTROL_PROYECTO_SCIRE/COORDINACION_V407_R6_UNIVERSALES.md`: fija ramas, propietarios de archivos, contrato de snapshot, vistas reservadas y orden único de integración.
- La conversación Universales implementa únicamente motor, reglas, pruebas y adaptador; no altera el shell gráfico.
- La conversación de auditoría controla sistema gráfico, Score Card, Tarjeta Digital Global/Personal, exportación WhatsApp y evidencia física.
- APP-22/23 cambian de DOTS a UNIVERSALES; CARD-09/10 serán Global/Personal Universales. Debe existir prueba negativa que impida conservar DOTS activo en botones, configuración, resultados, Score Cards, Tarjeta Digital, Historial y Manual.
- `test-v407-r6-universales-coordination.mjs`: verifica sustitución, IDs, contrato de 12 puntos, marca y congelamiento de Producción.
- `universales.js`: fuente única del reparto. Tres jugadores usan 6–4–2; cuatro usan 6–4–2–0. Los empates promedian exactamente los puestos ocupados y cada hoyo suma 12.
- `index-grupal.html`: reemplaza el botón/configuración visible DOTS por UNIVERSALES; exige 3 o 4 jugadores; reutiliza campo, torneo, categoría, handicap, marcas, voz, control manual, persistencia, recuperación, tarjeta y acciones comunes; agrega fila PUNTOS y acumulados IN/OUT/TOTAL.
- `card-library.js`: reconoce y filtra snapshots `universales` sin convertirlos en General.
- `card-artifacts.js`: crea Tarjeta Global y Personal Universales, muestra G/N/P, IN/OUT/TOTAL y deja de generar el panel DOTS.
- `scripts/build-mobile-web.mjs`: copia `universales.js` al paquete móvil nativo/offline.
- `api/live.js` y `live-hub.js`: aceptan la modalidad en snapshots y la muestran como UNIVERSALES en Torneo LIVE.
- `live-control.js` y `live-view.js`: publican y muestran puntos Universales por hoyo y acumulados; el ranking del Centro LIVE usa mayor puntaje.
- `database/005_live_tournament_mode.sql` y `api/live.js`: cada torneo anual o eventual guarda su modalidad y rechaza Score Cards de otra modalidad.
- `voice-assistant.js` e `index-grupal.html`: “Quiero jugar Universales” abre el registro común con 3 o 4 jugadores.
- `service-worker.js`: release/caché `V407-R6-UNIVERSALES-20260908` e inclusión offline de `universales.js`.
- `test-v407-r6-universales.mjs`: cubre todos los patrones 3/4, resultados incompletos, cantidades inválidas, caso Jaime/Carlos/Miguel/Roberto 5–5–1–1, ausencia de botón/configuración DOTS y recorridos comunes.
- `test-v311-voice-assistant.mjs`, `test-round-information.mjs` y `test-v261-registration-stableford-modality.mjs`: reconocen la navegación y el resumen Universales sin debilitar modalidades existentes.
- `test-v406-r23-visible-version.mjs`: exige `V407 · R6` en el identificador visible de actualización.
- `test-v260-round-points-player-return.mjs`: reconoce la retícula móvil R5A sin modificar su comportamiento.
- `test-v405-registration-clear-final-mobile.mjs`: conserva BORRAR TODO y exige que UNIVERSALES comparta el Control Manual.
- `test-v407-r1-premium-visual-system.mjs`: conserva la geometría R5 y reconoce únicamente el identificador R6.
- `test-v330-side-games.mjs`: continúa probando el cálculo histórico DOTS sin permitir botón, configuración ni nueva activación; Skins, Wolf y Vegas conservan su matriz completa.
- `test-v307-match-arrows-format.mjs`: mantiene el contrato Match Play e incorpora el rótulo UNIVERSALES en Información de Ronda.
- `test-v329-skins.mjs`: mantiene intacto Skins y verifica que el selector lateral ahora contenga UNIVERSALES.
- `test-v365-active-round-empty-recovery.mjs`, `test-v406-r2-professional-design.mjs`, `test-v406-r4-mobile-controls.mjs` y `test-v406-r5-simple-tournament-live.mjs`: conservan sus verificaciones funcionales/visuales y avanzan únicamente el identificador a R6.
- `audit-project.mjs`: ejecuta los dos bancos R6 antes del motor Gross/Neto/HCP y bloquea cualquier publicación si fallan.
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`: incorpora el motor, adaptador, controles y propiedad cruzada R6.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`: registra 431 fuentes y los SHA-256 de los tres inventarios regenerados.
- No se toca `main`; rollback: retirar el commit de coordinación de `lab/v407-r6-universales`.

# V407-R5 · Auditoría visual física completa · inventario y primera corrección · 08 de septiembre de 2026

- `INVENTARIO_PANTALLAS_ESTADOS_V407_R5.md`: 67 IDs únicos para Principal/Juegos, Asistencia, Tarjetas, Historial, Cuenta/Sistema, Torneo Live, Artefactos, Manual y adaptación transversal.
- `MATRIZ_AUDITORIA_VISUAL_V407_R5.md`: diez criterios medibles; 9 FAIL físicos iniciales y 58 pendientes, sin convertir pruebas de código en aprobación visual.
- `card-artifacts.js`: nuevo shell móvil premium; SHA-256 con corte seguro, metadatos responsive y tabla Stableford Global dividida en dos mitades legibles.
- `test-v407-r5-visual-inventory.mjs`: bloquea conteo, unicidad, criterios y contadores.
- `test-card-artifacts.mjs`: bloquea SHA contenido y secuencia IN/OUT en Global y seis personales.
- `audit-project.mjs`: ejecuta obligatoriamente `test-v407-r5-visual-inventory.mjs`; total esperado 123 paquetes.
- `index-grupal.html` y `service-worker.js`: candidato visible/caché V407-R5.
- Evidencia real existente: `IMG_3125` APP-04/05 FAIL; `IMG_3126` APP-29/SAFE-02 FAIL; `IMG_3123` CARD-03/SAFE-03 FAIL; `IMG_3120`–`IMG_3122` APP-41/SAFE-01 FAIL histórico.
- Evidencia Chrome R1: viewport 1363×936, documento 1348×2003 y cero overlay visible; sirve como medición de escritorio, no como aprobación móvil R5.
- Rollback: revertir únicamente el commit R5 de `lab/premium-ui-v407`. Producción/main no cambia.
- Transporte GitHub/Vercel: `ca1a13a` fue rechazado porque el Base64 de `index-grupal.html` quedó truncado; `bb21de0` repuso 805,296 bytes y árbol `9c2fa1ce965198848f360bfa6a6424150b3da6c4`, idéntico al commit local R5. El segundo build superó Gate, Intocables y Manual visual, pero ROADMAP rechazó correctamente que el commit reparador no estuviera anotado en ambos archivos; este renglón cierra esa trazabilidad para el nuevo intento.
- Rutas exactas auditadas: `CONTROL_PROYECTO_SCIRE/AUDITORIA_VISUAL_V407/INVENTARIO_PANTALLAS_ESTADOS_V407_R5.md` y `CONTROL_PROYECTO_SCIRE/AUDITORIA_VISUAL_V407/MATRIZ_AUDITORIA_VISUAL_V407_R5.md`.
- `index-grupal.html`: `#roundManualEntry` usa `width/max-width:100%`, `min-width:0` y `overflow:hidden`; en móvil `.round-player-grid` suma 325 px útiles y cada etiqueta puede cortar palabras largas. Las acciones de Tarjeta Digital miden 52 px con fuente 10 px en ambas capas heredadas.
- `test-v407-r1-premium-visual-system.mjs`: exige contención móvil, retícula compacta y botones legibles; APP-04/05 y APP-29/30 siguen pendientes de nueva evidencia física R5.
- `service-worker.js`, `index-grupal.html`, `test-v365-active-round-empty-recovery.mjs`, `test-v406-r2-professional-design.mjs`, `test-v406-r4-mobile-controls.mjs`, `test-v406-r5-simple-tournament-live.mjs`, `test-v406-r23-visible-version.mjs` y `test-v407-r1-premium-visual-system.mjs`: release/caché `V407-R5A-MOBILE-GRIDS-20260908` sincronizado.
- `index-grupal.html`: APP-32–37 reciben área segura superior/inferior, paneles contenidos, filtros móviles en una columna, entradas del Historial en dos filas, paginación sin desbordamiento, confirmación destructiva apilada y cinco consultas rápidas simétricas.
- `test-v407-r5a-history-visual-system.mjs`: bloquea la geometría premium de Historial y Estadísticas en escritorio e iPhone; `audit-project.mjs` lo incorpora como paquete 124. La aprobación física continúa pendiente y no se infiere del PASS automático.
- `test-v260-round-points-player-return.mjs`: sustituye la expectativa obsoleta `78/44/66/47 px` por la retícula R5A `70/36/58/40 px`; el deployment `dpl_8SSK4fASsW8PBGnPasaK7gP8gT37` evidenció el fallo y fue rechazado antes de mover el alias LAB.
# V407-R14 · Actualización manual permanente y tarjetas seguras · 08 de septiembre de 2026

- Rama única: `codex/v407-r14-safe-update-cards`, nacida de `main` R10 después de sincronizar y rechazar el HTML truncado de R13.
- `index-grupal.html`: ACTUALIZAR permanece verde, parpadeante y habilitado; cada toque conserva la ronda, limpia workers/cachés y recarga el release publicado.
- `service-worker.js`: release y caché avanzan juntos a `V407-R14-PERSISTENT-MANUAL-UPDATE-20260908`.
- `card-artifacts.js`: categoría opcional pequeña arriba del nombre en tarjetas Global/Personal; si no existe, no se inventa. Universales muestra leyenda y puntos por hoyo/totales en rojo.
- `scripts/card-audit-fixtures.mjs` y `test-card-artifacts.mjs`: diez tarjetas reproducibles y candados de categorías/puntos.
- Pruebas V365/V406/V407: sincronizadas con R14 y con el estado visible permanente.
- Producción permanece intacta hasta auditoría integral y navegador real sin FAIL.
- Preview R14 reparado: `index-grupal.html` se publica completo (812,277 bytes); el despliegue previo con blob vacío queda rechazado.
- Cierre R14: ambos ROADMAPS y `INVENTARIOS_V311.lock.json` se sellan juntos para el build final.
- Publicación R15: corrige exclusivamente el estado remoto del botón ACTUALIZAR.
- Prueba R15: detector, limpieza de caché, recarga y estado final sin parpadeo quedan sellados.
- R16: `syncDraftModeSelection` reconoce Universales y su botón recibe el mismo estado verde exclusivo.
- R17: `index-grupal.html` renderiza `player-category` sólo cuando existe `tournamentCategory`, colorea toda `universales-row` en rojo y hace que `manualRowHasData` ignore categoría/marcas sin nombre ni handicap. `test-v407-r9-manual-update.mjs` bloquea las cuatro condiciones.
- Reparación de transporte R17: el blob completo de `index-grupal.html` reemplaza el envío Base64 truncado; ambos ROADMAPS y el sello se actualizan en el mismo commit reparador.
- LAB posterior a R17: `index-grupal.html` añade totales Universales rojos y corrige la retícula móvil superior; `live-view.js` identifica fila/total de puntos y `live.html` los presenta en rojo. MAIN/Producción no cambia.
- Reparación documental R18: ambos ROADMAPS nombran literalmente `live.html`; el build anterior quedó bloqueado y Producción permaneció en R17.
# R19 · Enlace invitado individual de un solo uso · 09 de septiembre de 2026

- `api/_lib/app-access.js`: incorpora `redeemGuestToken`, cuyo `UPDATE` exige `opened_at IS NULL` y consume el token en una sola operación atómica.
- `api/app-access.js`: el canje usa exclusivamente `redeemGuestToken` y rechaza reutilizaciones.
- `test-r18-owner-guest-24h-access.mjs`: simula dos canjes consecutivos; el primero pasa y el segundo devuelve `null`.
- Rollback: volver al commit R18 de LAB. MAIN no se modifica.

# V407-R21 · SUPPORT y acceso 24 h cerrados · 09 de septiembre de 2026

- `index-grupal.html`: restaura `href="/manual.pdf"` sin `target`, avanza el identificador visible a R21 y agrega `COMPARTIR 24H`, oculto para invitados.
- `service-worker.js`: usa `V407-R21-SUPPORT-ACCESS-20260909`, caché propia y entrega `/access.html` directamente desde red.
- `api/app-access.js`: devuelve enlaces sobre `APP_PUBLIC_ORIGIN` o `https://golf-sc-gt-lab.vercel.app`, nunca sobre una URL temporal de deployment.
- `api/_lib/app-access.js`: `redeemGuestToken` exige `opened_at IS NULL`; sólo el primer canje obtiene acceso.
- `test-v311-live-support-link.mjs`: prueba negativa contra `target="_blank"`; `test-r18-owner-guest-24h-access.mjs`: primer canje aceptado y segundo rechazado.
- Pruebas de release V365/V406/V407 sincronizadas con R21. Rollback: R20 de LAB; MAIN permanece intacta.
- `.github/workflows/hotfix-support-same-screen.yml`: se elimina el disparador temporal de R20 después de integrar y probar la corrección permanente R21 en LAB.
- `docs/manual/v311/page-00.png`: fuente gráfica de portada resellada al reconstruir el inventario y los PDF del manual accesible desde SUPPORT.
- Reparación de build R21: `service-worker.js` conserva explícitamente el marcador aprobado `v407-r18-live-points-header`; `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` registran y sellan la corrección. El Preview anterior quedó rechazado; MAIN/Producción no cambia.
