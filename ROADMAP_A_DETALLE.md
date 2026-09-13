Warning: truncated output (original token count: 35102)
Total output lines: 1083

# ROADMAP A DETALLE

## V407-R24D LAB · service worker recuperable y control sin traslape · 9 de septiembre de 2026

La verificación pública demostró que `/service-worker.js` y ambos manifiestos recibían el HTML de acceso con estado 200. Una instalación R8 no podía descargar el worker nuevo; por eso ACTUALIZAR quedaba sin acción aunque el alias ya tuviera un deployment posterior. `middleware.js` permite exclusivamente estos recursos PWA de arranque y mantiene privados `index-grupal.html`, datos y escrituras.

La captura física de Control Manual mostró `ACTUALIZADO` sobre el título Universales al desplazarse. La regla `.mandatory-update:not(.available){position:absolute}` vive en `gsc-design-system.css`: el estado inactivo permanece en la cabecera y sale con el scroll; el estado `.available` sigue fijo, verde, habilitado y pulsante. La identidad R24C se conserva; el worker R8 detecta el `service-worker.js` R24C en cuanto el middleware deja de sustituirlo.

Los controles automáticos se integran en `package.json`, `audit-project.mjs`, `test-v407-r24c-public-pwa-bootstrap.mjs`, `test-v407-r24c-update-scroll-isolation.mjs` y la regresión de acceso R18. Requiere despliegue LAB y revisión automatizada en navegador real; no constituye revisión física. MAIN permanece intacta.

Continuidad 10 de septiembre de 2026: `scripts/rebuild-inventory-pdfs.py` regenera los tres PDF y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` vuelve a sellar 450 fuentes desde el árbol limpio `a2d1d9a5ebdd36435daed6c34a0c8ff61561612a`. Este resello no modifica funciones, HTML ni MAIN.

## V407-R24 LAB · registro WhatsApp privado, archivo y botones móviles · 9 de septiembre de 2026

`index-grupal.html` agrega a cada jugador de Registro General y Stableford un WhatsApp opcional. Guatemala aparece como `🇬🇹 +502`; el código admite edición internacional. El número se normaliza y guarda en el perfil para rondas posteriores, pero queda excluido de LIVE y de los artefactos digitales compartidos.

El flujo único queda sellado así: `FINALIZAR RONDA` genera y archiva la tarjeta oficial antes de habilitar `ENVIAR TARJETA DIGITAL`; `NUEVA RONDA` persiste y archiva la tarjeta anterior, elimina sólo las claves activas y abre jugadores/scores en blanco. Aplica a General, Match Play, Four Ball, Universales y Stableford. Además, `ACTUALIZADO` se oculta mientras cualquier overlay está visible para impedir el traslape observado sobre `ATRÁS`.

Pruebas directas actualizadas: V255/V261 para registro y WhatsApp; `test-v252-stableford-persistence-category-course.mjs`, `test-v260-round-points-player-return.mjs` y `test-stableford-ui.mjs` para la entrada Stableford enriquecida; V364/V289 para nueva ronda vacía con historial; V352 para privacidad LIVE; V397 para tarjeta oficial; y V365/V405/V407-R1 para controles móviles sin superposición. Rama exclusiva `lab/v407-r24-whatsapp-registration`; Main no se modifica.

Control de publicación: los dos ROADMAPS y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` se guardan juntos y se calculan desde el árbol remoto LAB de 444 fuentes.

Compatibilidad: si un recorrido anterior de Stableford entrega únicamente `names`, se crean entradas con `+502` y WhatsApp vacío; el campo continúa siendo opcional y el inicio de ronda no arroja error.

Corrección física móvil: la fila WhatsApp abarca las tres columnas del jugador, conserva `🇬🇹 +502` a la izquierda y asigna al número un mínimo de 180 px para evitar el campo comprimido observado.

# V407-R23B · frontera pública mínima para LIVE · 9 de septiembre de 2026

El enlace físico `live.html#stream=…` llegaba al formulario propietario porque el fragmento nunca viaja al servidor y `middleware.js` bloqueaba el HTML antes de que `live-view.js` pudiera leer el token. Se habilitan solamente el documento y sus dos scripts de visualización. En `/api/live`, el middleware inspecciona una copia del POST y permite únicamente `action=read`; crear, publicar, unir y revocar siguen requiriendo el acceso normal. La propia API conserva la validación criptográfica del token, caducidad, revocación y rate limit. No cambian Score Card, ACTUALIZAR, invitación 24 h, WhatsApp, voz, Support ni cálculos.

Control permanente: `test-v352-live.mjs` exige los tres recursos públicos, la excepción precisa de lectura y prohíbe incluir `/api/live` completo en `PUBLIC_PATHS`.

## V407-R23 · LIVE de un toque y enlace 24 h compatible con WhatsApp · 9 de septiembre de 2026

Dos rechazos físicos cierran el alcance: Kathy recibió el dominio sin un token utilizable y vio `ENTRAR COMO PROPIETARIO`; desde la Score Card, LIVE seguía abriendo una segunda pantalla. `api/app-access.js` emite ahora `/access.html?invite=TOKEN`. `index-grupal.html` integra esa URL completa dentro del texto entregado a `navigator.share`, evitando que WhatsApp omita el campo URL o el fragmento. `access.html` valida el query o el fragmento legado, lo retira del navegador y ejecuta únicamente POST contra `action=redeem`; los robots GET no pueden consumir el token.

`live-control.js` usa el mismo `currentSnapshot()` para cualquier ronda y, si existe, llama directamente `quickShareGroup()`. Esa función crea o reutiliza el LIVE privado del grupo completo por 24 horas y abre en el mismo gesto la hoja nativa de compartir; el overlay administrativo queda disponible sólo cuando no hay ronda activa. General, Universales, Stableford, Match Play y Four Ball comparten el mismo recorrido.

Pruebas preventivas: `test-r18-owner-guest-24h-access.mjs` exige query transportable, texto con URL, compatibilidad legada y POST; `test-v406-r5-simple-tournament-live.mjs` exige compartir directo sin pantalla intermedia. Regresiones V352, V353, categorías, Universales y compartir grupo permanecen obligatorias. Release/caché: `V407-R23-DIRECT-SHARE-20260909` / `v407-r23-direct-share`.

## V407-R22 · navegación LIVE permanente desde ronda activa · 9 de septiembre de 2026

Publicación: commit GitHub `90c25514a83b5c407e00ecc4f02ad4f2c9de3ef8`; Preview `dpl_5NDZRiES2geCbDobhPPaPedBkyFH` READY; Producción `dpl_3T4Fu3Y59uzUzUXytU5FGn5b7ka2` READY. El dominio oficial conserva el middleware privado y redirige visitantes sin sesión a `access.html`. Rollback exacto: commit `1ad4197bc5f2f8a923b94f3f5eac4a562ccfaafe`.

Defecto físico reproducido en `IMG_3263.png` y `IMG_3264.png`: desde una tarjeta activa en hoyo 7, la tecla superior LIVE mostraba primero el menú público `VER TORNEO LIVE`, ocultando los controles de la propia ronda. La causa estaba en el manejador común `gscLiveLaunch`, que abría el overlay sin evaluar `currentSnapshot()`.

`live-control.js` asigna `liveViewerSection` al visor público y, al abrir LIVE, calcula exclusivamente `hasRound=!!currentSnapshot()`: con ronda activa oculta el visor general y despliega `liveOrganizerPanel`; sin ronda conserva el Centro LIVE. La condición es independiente de nombre, campo, jugadores, hoyo y modalidad, por lo que cubre General, Universales, Stableford, Match Play y Four Ball actuales y futuros. ATRÁS conserva el cierre del overlay y la Score Card subyacente no se desmonta.

`test-v406-r5-simple-tournament-live.mjs` exige detección genérica de ronda, ocultamiento del menú público, despliegue directo de controles y presencia de las cinco modalidades. Regresión: V352 LIVE, V353 Centro, V406 categorías, V407 Universales y V406-R22 compartir grupo. `index-grupal.html`, `service-worker.js` y sus bancos de identidad avanzan a `V407-R22-ACTIVE-ROUND-LIVE-20260909` para entregar el JavaScript nuevo sin cambiar la implementación de ACTUALIZAR.

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
| `test-v328-live-official-rules.mjs` | `REAL MODEL / REAL WEB / OFFICIAL SOURCE / 0 SCORE WRITES` | Ejecuta el handler real dentro de Vercel con la cred…15102 tokens truncated…LED`; ambos ROADMAPS y el sello se actualizan en el mismo commit. MAIN/Producción no cambia.
- Propietario R21: `api/_lib/app-access.js` fija como identidad exclusiva `jaimekirste@gmail.com` cuando Vercel no define una variable más específica; `test-r18-owner-guest-24h-access.mjs` bloquea esa asignación. Otros usuarios siguen sin permiso para ver o crear invitaciones.
- R21 enlace protegido contra previsualizadores: `api/app-access.js` entrega el token en fragmento y sólo permite consumirlo mediante POST; `access.html` ejecuta ese POST al abrirlo el invitado y entra inmediatamente; `index-grupal.html` contiene el botón propietario dentro del ancho móvil. Un GET automático ya no consume el acceso.
- Cobertura preventiva R21: `test-r18-owner-guest-24h-access.mjs` bloquea el canje por GET y valida fragmento + POST; `test-v311-live-support-link.mjs` exige que INVITAR 24 H permanezca dentro de la barra. La causa y prevención quedan asentadas en `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`.
- Cierre remoto R21: `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` se resellan juntos contra el árbol exacto del Preview; Producción permanece intacta.
- Reparación de transporte R21: `index-grupal.html` se retransmite íntegro con 818,400 bytes; ambos ROADMAPS y el sello se actualizan en el mismo commit. El build truncado queda rechazado.
- Publicación productiva R21: `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` registran el despliegue autorizado en `golf-sc-gt-lab`; el primer intento por `CRON_SECRET` y el commit vacío quedan rechazados sin sustituir R24.

- Corrección productiva Support sin tocar ACTUALIZAR: `service-worker.js` excluye `/manual.pdf` y `/manual.html` del fallback general hacia la Score Card y entrega `manual.html` por red; `manual.html` monta una sola gráfica activa con precarga y sin `IntersectionObserver`. `test-v311-live-support-link.mjs` y `test-v311-manual-hosting.mjs` bloquean el parpadeo y el retorno silencioso. `vercel.json` regenera inventarios antes de la auditoría.

- Portabilidad exclusiva del build: `scripts/rebuild-manual-bets-live-data.py` y `scripts/rebuild-inventory-pdfs.py` usan Bitstream Vera incluida en ReportLab; elimina la dependencia ausente de `/usr/share/fonts` sin modificar ninguna función de la aplicación ni ACTUALIZAR.

- Regreso directo desde Support: `manual.html` incorpora el botón superior `← REGRESAR A MI RONDA`; usa `history.back()` cuando el Manual proviene de la aplicación y `location.replace("/index-grupal.html?source=manual-return")` sólo como recuperación. `test-v311-manual-hosting.mjs` exige ambos recorridos y la conservación de la ronda persistida. ACTUALIZAR no cambia.
# V407-R23A · Invitación WhatsApp conserva token · 09 de septiembre de 2026

- `test-r18-owner-guest-24h-access.mjs`: acepta espacios opcionales en `vercel.json`, porque Vercel lo minifica antes de ejecutar el banco; no cambia la regla validada.
- `api/app-access.js`: genera la invitación como `/invite/<token>` en lugar de depender de un parámetro que WhatsApp eliminó físicamente.
- `vercel.json`: reescribe `/invite/:token` hacia `access.html` sin mostrar una pantalla intermedia.
- `middleware.js`: permite únicamente el prefijo público `/invite/` para que el canje ocurra antes del control propietario.
- `access.html`: extrae el token desde la ruta, lo elimina de la barra y conserva compatibilidad con enlaces anteriores por query o fragmento.
- `test-r18-owner-guest-24h-access.mjs`: exige los cuatro componentes y el canje POST de un solo uso.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`: registra RC-093 con evidencia física, causa y control permanente.
- Rollback: commit productivo `73df15f`; LIVE, ACTUALIZAR, Support, score, voz y demás funciones no se modifican.

# V407-R24 · WhatsApp, aislamiento visual e índice del Manual · 09 de septiembre de 2026

- `index-grupal.html`: fila WhatsApp móvil de anchura completa, mínimo útil de 180 px, 🇬🇹 +502 editable por jugador.
- `index-grupal.html`: ACTUALIZAR, INSTALAR APP y PRO se aíslan en overlays estándar, AI, Cuenta e Instalación; el lanzador de instalación queda en flujo normal y el área invisible del micrófono de campo se limita.
- `manual.html`: ocho secciones temáticas con enlaces `#pagina-XX`, número y título; página 02 localizable por WhatsApp/teléfono/Guatemala/+502.
- `service-worker.js`: caché/release R24 sincronizado.
- Pruebas modificadas: V311 Manual, V365 recuperación, V405 Registro y móvil, V406 R2/R4/R5/R23 y V407 R1/R7/R9.
- Revisión renderizada 390×844: siete modalidades y Registro, Confirmación, General, Tarjeta Digital, Historial, Estadísticas, AI, Reglas, Cuenta, Instalación y Manual con ancho 390 px y cero traslapes.
- `REGISTRO_REINCIDENCIAS_CALIDAD.md`: RC-094 documenta causa, escape y control permanente.
- Rollback: `73df15f`; score, voz, LIVE y acceso 24 h permanecen funcionalmente intactos.
- Reparación de transporte R24: `index-grupal.html` se retransmite completo (830,274 bytes); el intento vacío queda rechazado y no llega a MAIN.
- `test-v311-manual-search.mjs`: exige los ocho grupos, enlaces titulados y términos WhatsApp/Guatemala/+502.

# V407-R24A · control manual de actualización restaurado · 09 de septiembre de 2026

- `index-grupal.html`: `body.gsc-setup-open:has(#setupOverlay.visible)` vuelve visible `.mandatory-update` y añade `padding-top` seguro al Registro.
- `service-worker.js`: `v407-r24a-update-visible` / `V407-R24A-UPDATE-VISIBLE-20260909` provoca la detección remota sin actualización silenciosa.
- `test-v405-registration-clear-final-mobile.mjs` exige la excepción visible; pruebas de versión V365/V406/V407 se sincronizan con R24A.
- Captura renderizada: botón `left 257`, `top 12`, `right 368`, `bottom 67`; tarjeta `top 90`; cero intersección y cero desbordamiento.
- Rollback: commit productivo `2ba83ed`; ninguna función de score, WhatsApp, LIVE, Historial, voz o invitación cambia.

# V407-R24B · puente manual para PWA detenida en R24 · 09 de septiembre de 2026

- `service-worker.js`: `approvedNavigationWithManualUpdate(request)` lee el shell aprobado, añade `#gsc-update-recovery` antes de `</head>` y conserva status/headers; la navegación normal usa esa respuesta.
- El CSS inyectado sólo aplica en `body.gsc-setup-open:has(#setupOverlay.visible)`: muestra `.mandatory-update` y baja `#setupOverlay` hasta 82 px/área segura.
- No llama `installMandatoryUpdate`, no limpia caches, no recarga y no navega; el propietario conserva el único toque que instala.
- `index-grupal.html`, release/caché y pruebas V365/V405/V406/V407 avanzan a R24B.
- Rollback: `5e45b264`; datos locales, score, LIVE, WhatsApp, Historial, voz y acceso 24 h quedan intactos.
- `scripts/lab-update-browser-review.mjs`: ejecutor Playwright con `launchPersistentContext`; activa cuatro deployments READY consecutivos en el mismo alias LAB, siembra y comprueba ronda/Historial/jugador/score/WhatsApp, detecta ACTUALIZAR, captura antes, toca, espera navegación, confirma ACTUALIZADO/release final, captura después y registra consola, red y geometría.
- `scripts/lab-update-physical-gate.mjs`: validador independiente del JSON `gscg-lab-update-browser-evidence/v1`; recalcula SHA-256 y rechaza commit, deployment, alias, perfil, transición, captura o preservación inválidos. El nombre histórico del archivo no cambia la clasificación: Playwright es REVISIÓN AUTOMATIZADA EN NAVEGADOR REAL, nunca revisión física.
- `test-v407-r24-update-physical-gate.mjs`, `package.json` y `audit-project.mjs`: prueba negativa, comandos `update:browser-review` / `update:browser-gate` e integración permanente en auditoría.
- `DIRECTRICES_MANDATORIAS.md`, matrices Gate 0 humana/JSON y `REGISTRO_REINCIDENCIAS_CALIDAD.md`: fijan las tres puertas independientes y RC-097. Estado actual: NO REVISADO; la ejecución pública A→B→C→D y el micrófono físico iPhone siguen pendientes; MAIN/Producción intacta.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/MATRIZ_GATE_0_PROYECTO.md` y `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/MATRIZ_GATE_0_PROYECTO.json`: rutas literales registradas para el Gate ROADMAP.

# V407-R24C · corrección física del encabezado de Historial · 09 de septiembre de 2026

- Evidencia de entrada: `IMG_3303.png`, iPhone vertical, muestra `ACTUALIZADO` superpuesto al botón `ATRÁS` de `#cardLibraryOverlay`.
- Causa: `body.gsc-setup-open:has(#setupOverlay.visible) .mandatory-update{display:block!important}` se evaluaba aunque Historial estuviera abierto y anulaba la regla general de aislamiento de overlays.
- `index-grupal.html`: la excepción pasa a `body.gsc-setup-open:not(.gsc-history-open):has(#setupOverlay.visible)`; Registro conserva ACTUALIZAR y el Historial no hereda el lanzador del fondo.
- `test-v407-r24b-history-update-isolation.mjs`: exige el aislamiento, exige la condición negativa de Historial y rechaza la antigua regla reincidente.
- `audit-project.mjs`: incorpora el banco como prueba obligatoria de la auditoría maestra.
- `test-v405-registration-clear-final-mobile.mjs`: conserva la obligación de mostrar ACTUALIZAR en Registro y añade la exclusión de Historial a la misma expectativa.
- Estado honesto: FAIL físico encontrado y corregido en fuente; candidato NO REVISADO hasta comprobar el despliegue LAB público. Producción principal intacta.
- `Inventario_Golf_Score_Card_GT_OVERALL_V311.pdf`, `Inventario_Golf_Score_Card_GT_A_DETALLE_V311.pdf`, `Inventario_Golf_Score_Card_GT_POR_IMAGENES_Y_RUBROS_V311.pdf` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`: regenerados y sellados con 448 fuentes remotas.
- Cierre de transporte remoto: `.github/workflows/apply-r24c-lab.yml` queda eliminado; `index-grupal.html` y este ROADMAP se restauran completos. Los tres inventarios y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` se resellan contra 448 fuentes presentes en el árbol LAB sin evidencia local ajena.
- `.github/workflows/apply-r24b-lab.yml`: workflow de transporte temporal creado, ejecutado y eliminado; su eliminación queda documentada y el árbol final no lo conserva.
# V407-R24D · separación física LIVE / aplicación 24 H · 10 de septiembre de 2026

- `live-control.js`: `publicAppOrigin()` convierte cualquier dominio temporal del proyecto LAB en `https://golf-sc-gt-lab.vercel.app`; `viewerUrl()` y `hubUrl()` dejan de copiar `_vercel_share`. El receptor abre directamente `live.html`, Score Card LIVE de sólo lectura.
- El acceso `INVITAR · 24 H` no se mezcla con LIVE: `api/app-access.js` conserva `/invite/{token}` hacia `index-grupal.html?source=guest24h`, y `middleware.js` mantiene sesión temporal, aislamiento de almacenamiento, límites de API, caducidad y revocación.
- Pruebas: `test-v406-r22-share-live.mjs` exige dominio público y ausencia del bypass de Vercel; `test-r18-owner-guest-24h-access.mjs` vuelve a aprobar el acceso completo con candados. Rollback: revertir sólo este corte R24D; MAIN intacta.
# V407-R24D · botón ACTUALIZAR decisivo y manual · 10 de septiembre de 2026

- `index-grupal.html`: release `V407-R24D-MANUAL-UPDATE-20260910`, identificador visible `V407 · R24D` y estilo versionado R24D. El detector consulta el HTML publicado sin caché; si difiere de R24C habilita `ACTUALIZAR` y el parpadeo. No ejecuta la instalación.
- `service-worker.js`: caché candidata `v407-r24d-manual-update`; mantiene por separado la caché aprobada y no llama `promoteCandidate()` desde `install` ni `activate`. Sólo `app_version=V407-R24D-MANUAL-UPDATE-20260910`, generado al tocar el botón, promueve R24D.
- `test-v365-active-round-empty-recovery.mjs`, `test-v406-r2-professional-design.mjs`, `test-v406-r4-mobile-controls.mjs`, `test-v406-r5-simple-tournament-live.mjs`, `test-v406-r23-visible-version.mjs`, `test-v407-r1-premium-visual-system.mjs`, `test-v407-r7-ios-scroll.mjs` y `test-v407-r9-manual-update.mjs`: exigen interfaz, release y caché R24D; el banco visible agrega la prueba negativa que impide una promoción automática desde la instalación del worker.
- Rollback: restablecer el commit R24C en el alias LAB. `main` y Producción permanecen congelados e intactos.
- Reparación de transporte: el primer blob remoto de `index-grupal.html` llegó vacío y el build fue rechazado antes de activar LAB. El archivo completo de 830,526 bytes se retransmite junto con `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, cerrando trazabilidad en el mismo commit de publicación.

# V407-R25 · BORRAR SCORES, hándicap firmado, RESET y autocompletado iPhone · 10 de septiembre de 2026

- `index-grupal.html`: añade `#clearScoresOnly`, conserva `#clearRoundScores`, añade `#resetClockButton`, acepta hándicaps enteros firmados y captura del DOM nombre/teléfono antes de `OK`.
- `player-registry.js`: preserva hándicaps enteros negativos, cero y positivos en perfiles e historial.
- `live-control.js`: transporta el hándicap firmado al visor LIVE sin recortarlo a 0–54.
- `service-worker.js` y pruebas de actualización: release/caché manual `V407-R25-CONTROLS-20260910`; sólo el propietario lo instala mediante `ACTUALIZAR`.
- `test-v405-registration-clear-final-mobile.mjs` y `test-v407-r25-round-controls.mjs`: prueban la separación destructiva, conservación de ronda, RESET, hándicap firmado y autocompletado iPhone.
- Rollback: commit Maestro R24D `841a8fc`; Maestro/Producción no se modifica durante la revisión LAB.
- `.github/workflows/promote-r24d-lab.yml`: eliminado por ser un transporte temporal fallido y ajeno al candidato R25.
- `test-v287-stableford-back-controls-clear.mjs`: actualizado para exigir la coexistencia ordenada de `BORRAR SCORES` y `BORRAR TODO`, manteniendo ATRÁS y + JUGADOR.

# V407-R26 · OK sin límite heredado 0–54 · 10 de septiembre de 2026

- `index-grupal.html`: las dos rutas posteriores al toque de `#setupOk` validan con `Number.isSafeInteger(hcp)`; ya no rechazan cero ni hándicaps negativos.
- `service-worker.js`: candidato manual `V407-R26-OK-HOTFIX-20260910` y caché `v407-r26-ok-hotfix`.
- Pruebas versionadas coordinadas a R26; `test-v407-r25-round-controls.mjs` prohíbe expresamente la condición residual `hcp<0||hcp>54`.

# V407-R27 · avance directo del registro manual · 10 de septiembre de 2026

- `#setupOk`: después de `captureVisibleRegistrationValues()` y validación estricta ejecuta `resetSetupCapture(); renderDraft(); showStep2(); speakSetupConfirmation()`.
- Se elimina sólo la llamada de `OK` a `requestSetupFinalize()`; la captura y conversación por micrófono no se modifican.
- `test-v407-r25-round-controls.mjs` exige la ruta directa y prohíbe que `OK` vuelva a depender del finalizador de voz.

# V407-R28 · persistencia previa a actualización · 10 de septiembre de 2026

- `installMandatoryUpdate()` ejecuta captura DOM, sincronización no destructiva y `persistDraftState()` antes de limpiar cachés y recargar.
- Release/caché/pruebas avanzan coordinadamente a R28.

# V407-R29 · tarjeta digital fiel a la Score Card · 10 de septiembre de 2026

- `live-control.js` publica los índices HDCP calculados por la misma matriz activa del campo y marcas.
- `live-view.js` coloca `HDCP` antes de `PAR`, distribuye tiros para hándicaps enteros firmados y renderiza círculos con el color de las marcas de cada jugador.
- `live-view.js` y `live.html` replican las clases canónicas `birdie`, `eagle`, `bogey`, `double-bogey` y `triple-bogey` de la Score Card para cada GROSS.
- `test-v407-r29-live-handicap-row.mjs` prueba índices, colores, tiros y las cinco formas con valores deportivos reales.
- Candidato exclusivamente LAB. Maestro R28 no se modifica sin autorización posterior a la prueba física.
- Sello de publicación: ambos ROADMAPS acompañan conjuntamente el candidato R29.
- `.github/workflows/promote-r29-lab.yml`: retirado al comprobar cero ejecuciones de Actions; no alteró Maestro.
- Disparo de transporte R29: push documental coordinado después de instalar el workflow temporal.
- Estado de transporte: preview R29 READY; alias estable LAB conservado en R28 hasta una promoción autenticada.
- Sello posterior al retiro: inventario regenerado con 452 fuentes activas.
- `live-view.js` condiciona `hdcpRow` a modalidades con hándicap: Stableford no la renderiza y conserva la simbología GROSS canónica.

# V407-R30 · homologación de contornos y archivo previo · 10 de septiembre de 2026

- `index-grupal.html`: `normalizeGreenButtonSurfaces()` inspecciona botones estáticos y dinámicos. Cuando el color calculado corresponde al verde oficial, añade `gsc-green-outline-control`; excluye por texto exacto `OK`.
- `index-grupal.html`: `gscg-green-outline-homogeneity-v407-r30` impone fondo `#050505`, contorno/texto verde y elimina la sombra cargada sin modificar controles rojos, dorados, azules, micrófonos ni indicadores deportivos.
- `index-grupal.html`: `openFinalDigitalCard()` ejecuta `persist()` y `archiveRoundSnapshot(round)` antes del render. `openNewRoundDraft()` y `openFreshStablefordSetup()` ya archivan antes de eliminar claves activas y limpiar el borrador.
- `test-v407-r30-green-outline-controls.mjs` bloquea rellenos verdes reincidentes fuera de `OK`; `test-v407-r30-history-transitions.mjs` bloquea pérdida de Historial o limpieza anterior al archivo.
- `audit-project.mjs` integra R29 y los dos candados R30. `service-worker.js`, meta y firma visible avanzan coordinadamente a `V407-R30-OUTLINE-HISTORY-20260910` / `V407 · R30`.
- Estado: candidato LAB todavía NO REVISADO visualmente por descarga externa del navegador bloqueada; no se publica hasta cero FAIL. Rollback: commit `564a24c`. Maestro no cambia.
- Sello de transporte R30: ambos ROADMAPS se actualizan conjuntamente en el commit reparador exigido por `ROADMAP GATE`; no altera funcionalidad ni Maestro.

# V407-R31 · reparación física de tarjeta móvil y superficies verdes · 10 de septiembre de 2026

- `IMG_3375.jpeg`: `MEDAL PLAY NORMAL` y `EL PULTÉ` muestran tinte/resplandor verde contra el patrón aprobado de fondo negro y contorno verde.
- `IMG_3377.png`: `#roundGridEnter` continúa relleno y la Score Card se percibe cortada en el ancho móvil del navegador interno.
- `index-grupal.html`: selectores específicos con `!important` neutralizan gradientes históricos en controles activos y en `#roundGridEnter`; `#setupOk` queda expresamente fuera y conserva el único relleno verde aprobado.
- `.card-shell`: fondo negro, ancho máximo del viewport, `overflow-x:scroll`, inercia iOS, `touch-action:pan-x pan-y`, contención horizontal y tabla sin compresión.
- `test-v407-r30-green-outline-controls.mjs` amplía la regresión y `test-v407-r31-mobile-card-scroll.mjs` bloquea recorte, fondo blanco y pérdida del gesto horizontal.
- Estado: candidato exclusivamente LAB y NO REVISADO hasta nuevo deployment READY y captura física. Maestro/Producción no cambia.

# V407-R32 · base aprobada separada del candidato · 10 de septiembre de 2026

- `index-grupal.html` permanece como R31 instalada; `candidate-index-grupal.html` contiene R32.
- `service-worker.js` descarga el candidato sin sustituir la entrada aprobada. La promoción ocurre únicamente por mensaje `PROMOTE_BUILD` o navegación `app_version=V407-R32...`, ambos originados por el botón `ACTUALIZAR`.
- Se elimina del actualizador el borrado de cachés y la desinstalación de workers, evitando que una publicación equivalga a una actualización del propietario.
- Media móvil: `.game-mode-columns{grid-template-columns:repeat(2,minmax(0,1fr))}`, preservando las diez funciones: Medal Play Normal, Match Play, Four Ball, Stableford, Skins, Wolf, Vegas, Universales, Score Card-Práctica y Comparte Live.
- Pruebas dirigidas PASS: `test-v407-r32-owner-only-update.mjs`, `test-v407-r32-two-column-modalities.mjs`, Score Card móvil R31 y contornos verdes.
- Pendiente antes de luz verde: deployment LAB READY y comprobación remota exacta. Maestro/Producción R28 no se toca.
# ATV-R32-20260910-01 - acta, congelamiento parcial y regresión

- `scripts/generate-technical-act-r32.py`: generador reproducible del acta Markdown/PDF y su declaración final cuantificada.
- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/ACTA_TECNICA_DE_VERIFICACION_Y_CONGELAMIENTO_DE_VERSION_EPG_CADDY.md`: expediente fuente.
- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/ACTA_TECNICA_DE_VERIFICACION_Y_CONGELAMIENTO_DE_VERSION_EPG_CADDY.pdf`: expediente formal renderizado.
- `BASE_FUNCIONAL_APROBADA_R32.json`: elementos con PASS y referencia inmutable; no representa aprobación integral.
- `VOZ_FEMENINA_MANDATORIA.lock.json`: requisito intocable de la voz femenina del Manual; queda BLOQUEADO hasta demostrar identidad y cobertura total.
- `PROCEDIMIENTO_RESTAURACION_Y_ROLLBACK.md`: restauración exacta del árbol y rollback del despliegue.
- `EPG_CADDY_R32_TREE_RECUPERABLE.tar.gz`: paquete recuperable del commit remoto R32.
- `SHA256SUMS.txt`: huellas del acta, paquete y evidencias.
- Evidencia física: se atribuye exclusivamente a capturas aportadas por el propietario desde iPhone; Codex no declara control físico del dispositivo.
- FAIL permanente registrado: la transición R31→R32 necesitó un segundo aviso y un segundo toque. El alias estable sí quedó asociado a `dpl_G97hXzJbV9duYHLn8SGREJWRgUHq`, READY y commit `a4b1cec9e1380d8a5b72080477cad97080ab0cce`.
# Investigación técnica R32 - causa raíz de voz y actualización - 10 de septiembre de 2026

- `CONTROL_PROYECTO_SCIRE/02_DOCUMENTOS_IMPORTANTES_PENDIENTES_DE_UTILIZAR/INVESTIGACION_RAIZ_MICROFONO_ACTUALIZACION_Y_AI_UNIVERSAL_R32.md`: expediente de investigación con hallazgos reproducibles del código, comparación OpenAI/Web Speech/Deepgram/Google/Azure/Apple, decisión técnica, banco de pruebas y limitaciones honestas.
- `CONTROL_PROYECTO_SCIRE/02_DOCUMENTOS_IMPORTANTES_PENDIENTES_DE_UTILIZAR/INVESTIGACION_RAIZ_MICROFONO_ACTUALIZACION_Y_AI_UNIVERSAL_R32.pdf`: versión formal para consulta y archivo.
- `scripts/generate-root-research-pdf.py`: generador determinista del PDF. No altera `index-grupal.html`, `candidate-index-grupal.html`, `service-worker.js` ni Maestro/Producción.

# V407-R33 - primera implementación de causa raíz en LAB - 10 de septiembre de 2026

- Evidencia y candados incluidos: `CONTROL_PROYECTO_SCIRE/02_DOCUMENTOS_IMPORTANTES_PENDIENTES_DE_UTILIZAR/INVESTIGACION_RAIZ_MICROFONO_ACTUALIZACION_Y_AI_UNIVERSAL_R32.pdf`, `Intocables/MICROFONO_APROBADO.lock.json`, `test-v356-voice-only-cedar-quality.mjs` y `test-v407-r33-pulte-official-handicap.mjs`.

- `index-grupal.html`: materializa R32 como base aprobada de fuente.
- `candidate-index-grupal.html`: R33; conversación con `semantic_vad`, profundidad no recortada por canal, voz femenina y ACTUALIZAR que espera ACK verificable antes de recargar.
- `service-worker.js`: staging en caché versionado, verificación de meta release, marcador atómico, respuesta `PROMOTION_READY`/`PROMOTION_FAILED` y compatibilidad de transición desde cliente R32.
- `approved-voice.js`: selector único del mismo `voiceURI` que utiliza el Manual y persistencia local de su identidad.
- `manual.html`: reutiliza el selector compartido sin cambiar velocidad 0.9x ni contenido.
- `api/universal-ai.js`: elimina la división de tokens para voz y la regla fija de tres a seis oraciones.
- `api/voice-speech.js`: elimina la configuración masculina y usa política femenina latinoamericana.
- `test-v407-r33-root-voice-update.mjs`, `test-v407-r32-owner-only-update.mjs` y `audit-project.mjs`: contrato R32 a R33 y regresión permanente. La prueba física sigue pendiente y Maestro no se toca.

## Expediente técnico integral V407-R32 — índice persistente

- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/ACTA_TECNICA_DE_VERIFICACION_Y_CONGELAMIENTO_DE_VERSION_EPG_CADDY.md`
- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/ACTA_TECNICA_DE_VERIFICACION_Y_CONGELAMIENTO_DE_VERSION_EPG_CADDY.pdf`
- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/BASE_FUNCIONAL_APROBADA_R32.json`
- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/EPG_CADDY_R32_TREE_RECUPERABLE.tar.gz`
- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/PROCEDIMIENTO_RESTAURACION_Y_ROLLBACK.md`
- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/SHA256SUMS.txt`
- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/VOZ_FEMENINA_MANDATORIA.lock.json`
- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/automatizada/audit-project-r31.log`
- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/automatizada/audit-project-r32-full.log`
- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/automatizada/vercel-build-r32.log`
- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/fisica_usuario/IMG_3371_R29_ACTUALIZADO.jpeg`
- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/fisica_usuario/IMG_3372_ACCESO_PROPIETARIO.png`
- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/fisica_usuario/IMG_3375_R30_REGISTRO.jpeg`
- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/fisica_usuario/IMG_3376_R28_ACTUALIZAR.jpeg`
- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/fisica_usuario/IMG_3377_R30_TARJETA_CORTADA.png`
- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/fisica_usuario/IMG_3381_PROMOCION_VERCEL.png`
- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/fisica_usuario/IMG_3382_R31_ENTRO_ACTUALIZADO.png`
- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/fisica_usuario/IMG_3383_R31_MODALIDADES_UNA_COLUMNA.png`
- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/fisica_usuario/IMG_3384_MANUAL_VOZ_FEMENINA_09X.png`
- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/fisica_usuario/IMG_3385_R31_ANTES_DE_R32.png`
- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/fisica_usuario/IMG_3386_R32_ACTUALIZADO_CONSERVA_RONDA.png`
- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/fisica_usuario/IMG_3387_R31_ESTADO_VISIBLE_SIN_URL.png`

## V407-R46 LAB · prueba física aislada del transporte ACTUALIZAR · 11 de septiembre de 2026

- Prueba de transporte pura desde R43: no incorpora R44/R45 ni cambios funcionales; únicamente avanza la identidad publicada a R46 para demostrar en iPhone el ciclo R43 → ACTUALIZAR → R46 conservando la ronda.
- `scripts/apply-update-e.mjs` conserva el motor aprobado `update-client-e.js` intacto y genera el shell instalado por Arquitectura E.
- Criterio bloqueante: no se considera aprobado hasta prueba física en el iPhone instalado. La publicación funcional queda detenida hasta cerrar este circuito.
- Incidencia detectada: el candado anterior verificaba motor/release/shell, pero no obligaba a que cambios funcionales posteriores avanzaran candidato + release; ese hueco debe convertirse en FAIL automático antes de futuras publicaciones.
- Archivos de esta prueba: `scripts/apply-update-e.mjs`, `api/release.js`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`. MAIN y MAESTRO permanecen intactos.

## V407-R47 LAB · cadena de publicación ACTUALIZAR endurecida · 11 de septiembre de 2026

- Se mantiene `update-client-e.js` intacto; el motor ACTUALIZAR sigue protegido y fuera de alcance.
- `scripts/update-chain-gate.mjs` corre primero en el build de Vercel y bloquea cualquier payload runtime distinto del autorizado.
- `scripts/update-chain-lock.mjs` genera la huella reproducible del payload runtime y `Intocables/UPDATE_CHAIN_PAYLOAD.lock.json` sella release, candidato y archivos entregables.
- `vercel.json` se controla por contrato semántico (`update-chain-gate` primero) porque Vercel normaliza sus bytes durante build; no se excluye su obligación funcional.
- Prueba negativa confirmada: un cambio runtime sin nueva release fue rechazado por `CHAIN_PAYLOAD_FINGERPRINT_STALE`.
- R47 usa `V407-R47-DIRECT-UPDATE-CHAIN-20260911`; `api/release.js` y `scripts/apply-update-e.mjs` deben permanecer sincronizados.
- Archivos de control R47: `scripts/update-chain-gate.mjs`, `scripts/update-chain-lock.mjs`, `Intocables/UPDATE_CHAIN_PAYLOAD.lock.json`, `vercel.json`, `api/release.js`, `scripts/apply-update-e.mjs`, `.github/workflows/r47-update-chain-lock.yml` y `.github/workflows/r47-roadmap-register.yml`.
- MAIN y MAESTRO permanecen intactos. La entrega final sólo será válida desde el botón ACTUALIZAR de la app instalada y con prueba física en iPhone conservando la ronda.

## V407-R48 LAB · actualizador usa origen canónico LAB · 11 de septiembre de 2026

- Evidencia física: la app instalada en un alias antiguo permaneció en R43 y no detectó R47 aunque `golf-sc-gt-lab.vercel.app/api/release` ya anunciaba R47.
- Causa confirmada: `update-client-e.js` resolvía `/api/release` y `/app-current-shell.html` contra `location.origin`, por lo que una instalación realizada desde un alias Preview quedaba amarrada a ese origen antiguo/protegido.
- Corrección R48: el actualizador consulta y descarga siempre desde `https://golf-sc-gt-lab.vercel.app`, independientemente del alias desde el que se instaló originalmente la app.
- Se conservan sin cambios la persistencia de ronda, almacenamiento local, retiro de caches legacy, botón, verificación de shell y recarga final en el mismo origen instalado.
- Release R48: `V407-R48-CANONICAL-UPDATER-ORIGIN-20260911`.
- Archivos funcionales R48: `update-client-e.js`, `api/release.js`, `scripts/apply-update-e.mjs`.
- MAIN y MAESTRO permanecen intactos. La aceptación final sigue siendo prueba física en el iPhone instalado conservando la ronda.

## V407-R48 LAB · cierre atómico origen canónico ACTUALIZAR · 11 de septiembre de 2026

- Cierre obligatorio del cambio autorizado del motor ACTUALIZAR para usar siempre el origen canónico `https://golf-sc-gt-lab.vercel.app` en release y shell.
- `update-client-e.js` autorizado en R48 con hash `6fd5c7f3db13ccf05c86ec7cd74fad2451accbbe`.
- Release R48: `V407-R48-CANONICAL-UPDATER-ORIGIN-20260911`.
- Ambos ROADMAPS y `Intocables/UPDATE_CHAIN_PAYLOAD.lock.json` quedan sellados en el mismo commit atómico antes de Preview/Promote.
- MAIN y MAESTRO permanecen intactos. La aceptación final sigue siendo física desde la app LAB instalada, sin reinstalar y conservando la ronda.


## V407 · R49 — NAVEGACIÓN CANÓNICA DEL ACTUALIZADOR (11-09-2026)
- Causa cerrada: el motor consultaba release/shell canónicos pero navegaba con `location.origin`, regresando al Preview antiguo.
- Corrección incremental: destino final `/index-grupal.html` construido con `CANONICAL_LAB_ORIGIN`.
- Regresión permanente: prohibido `new URL("/index-grupal.html",location.origin)` y exigido origen LAB canónico.
- Alcance protegido: captura V378, umbral/sensibilidad del micrófono, Main y MAESTRO sin cambios.
- Estado: candidato LAB; promoción bloqueada hasta Preview READY y verificación real.

- Reintento de build R49 solicitado sin cambios de runtime: el intento anterior terminó durante instalación antes de ejecutar el Gate.

- Cierre posterior al sello automático: ambos roadmaps quedan en el último commit para habilitar el Preview físico R49.

## V407 · R50 — CORS CANÓNICO DEL ACTUALIZADOR (11-09-2026)

- Causa: `/api/release` no respondía CORS/OPTIONS; Safari bloqueaba el preflight desde un Preview viejo por los encabezados `Cache-Control` y `Pragma`.
- Corrección: `Access-Control-Allow-Origin: *`, métodos `GET/OPTIONS`, encabezados permitidos y `OPTIONS 204`.
- Aceptación: R43 debe detectar R50, mostrar ACTUALIZAR y navegar al LAB canónico R50.
- Alcance: captura V378, micrófono, Main y MAESTRO sin cambios.
- Estado: candidato LAB; no promover hasta prueba física.

## V407 · R51 — CERTIFICACIÓN FÍSICA DEL ACTUALIZADOR (11-09-2026)

- Propósito único: comprobar físicamente la transición R50 → R51 mediante ACTUALIZAR.
- Cambio funcional: ninguno; sólo identidad de publicación R51.
- Aceptación: R50 muestra ACTUALIZAR, al pulsarlo navega al LAB canónico y muestra V407 · R51.
- Alcance: MAESTRO sin cambios.
- Estado: candidato LAB; pendiente de Preview, Promote y prueba física.

## V407 · R52 — CORRECCIONES SECUNDARIAS DE VOZ (11-09-2026)

- Matriz permanente: pertinencia, fundamento, profundidad, precisión, aplicación práctica y claridad.
- Conversación consecutiva: ignora el cierre tardío de la respuesta anterior para no cancelar el turno nuevo.
- Estados bilaterales exactos: `ESCUCHANDO` y `RESPONDIENDO`, rojos y parpadeantes.
- Latencia máxima: Realtime 30,000→7,500 ms; AI Universal 27,500→6,875 ms.
- Locutor: +15% sobre cada transporte (Realtime/dispositivo 0.90→1.035; audio generado 1.00→1.15).
- Alcance: candidato LAB; R51 canónico congelado durante prueba de 24 horas. MAESTRO intacto.

- Cierre técnico R52: candado de voz autorizado y prueba de latencia al 25% actualizados conjuntamente; runtime sin cambios adicionales. R51 canónico permanece congelado.
- Corrección física R52: la pregunta general capturada por Safari se transfiere a una sesión Realtime continua; se elimina el reinicio repetido de SpeechRecognition que produjo `no-speech` tras dos turnos. Se restauran márgenes de recuperación seguros; R51 canónico permanece congelado.

## V407 · R53 — TRASPASO IPHONE A REALTIME (12-09-2026)
- R52 queda rechazado por la prueba física de dos turnos. R53 identifica la corrección de la cadena Safari→Realtime continuo y conserva R51 canónico sin cambios hasta aprobación física.
- `Intocables/intocables-gate.mjs`: restaurada la aserción canónica R51; el comportamiento nuevo permanece validado por la prueba separada del candidato R53.
- Cierre de hash R55: `candidate-index-grupal.html` y `Intocables/UPDATE_CHAIN_PAYLOAD.lock.json` se publican juntos con hash SHA-256 `cdf1c56cdcd680512e3ba6689be00dbbd7f68b00d648e1dfe23ca8837bfef635`.

## V407 · R56 — CIERRE PUBLICABLE DEL TURNO IOS (12-09-2026)
- El gate consumió R55 durante la corrección del candado. R56 conserva exactamente el candidato validado `cdf1c56c…` y cambia sólo la identidad publicable, `api/release.js`, `scripts/apply-update-e.mjs` y el candado de cadena.

## V407 · R54 — PUENTE REALTIME PARA PREVIEW (12-09-2026)
- Evidencia física R53: `/api/session-grupal` devolvió HTTP 500 porque Preview no recibe `OPENAI_API_KEY`. `api/session-grupal.js` usa un puente servidor-a-servidor al LAB canónico fijo exclusivamente cuando `VERCEL_ENV=preview`; R51 y MAESTRO permanecen intactos.

## V407 · R55 — TURNO IOS CON TOQUE FIABLE (12-09-2026)
- Evidencia física R54: el canónico también devolvió 500 para Realtime. Se descarta el puente. Las preguntas generales vuelven a Universal AI con locutor local inmediato y no reabren SpeechRecognition sin gesto; cada respuesta termina indicando un nuevo toque. R51 y MAESTRO intactos.
- Cierre técnico: `candidate-index-grupal.html` completo se publica junto con ambas bitácoras y se valida contra `Intocables/UPDATE_CHAIN_PAYLOAD.lock.json`.
## V407 · R57 — LIBERACIÓN COMPLETA DE FISH AUDIO ANTES DEL SIGUIENTE TURNO IOS (12-09-2026)

Los eventos públicos de R56 demostraron que el botón y el reconocedor sí funcionaban: después de una respuesta correcta se registraron tres pares `browser_fallback_started` → `no_speech`. La frontera defectuosa estaba en `releaseAiUniversalPlaybackForListening()`: retiraba el `src`, pero conservaba el mismo objeto `Audio`, mantenía `aiUniversalSpeechPrimed=true` y `fireMicActivation()` reproducía un WAV silencioso justo antes de solicitar el micrófono.

R57 libera la sesión en todos sus cierres: pausa, reinicia posición, desconecta manejadores, elimina la fuente, ejecuta `load()`, revoca el Object URL y deja `aiUniversalTtsAudio`, `aiUniversalSpeechPrimer` y el estado primed completamente reiniciados. `player.onended` y `player.onerror` ejecutan esa liberación inmediatamente. `fireMicActivation()` y `startAiUniversalListening()` abren la captura sin primer de audio previo.

La regresión dirigida exige destrucción completa, prohíbe `release→prime` dentro del gesto y exige liberación al terminar Fish Audio. Archivos funcionales: `candidate-index-grupal.html`, `test-v407-r33-root-voice-update.mjs`, `api/release.js`, `scripts/apply-update-e.mjs`. Trazabilidad: ambos ROADMAPS, registro de reincidencias y candado de cadena. Rollback: deployment R56. Producción/MAESTRO permanecen intactos hasta PASS físico y autorización expresa.

## V407 · R60 — RECUPERACIÓN ESTRUCTURAL DE ACTUALIZACIÓN, MICRÓFONO E IA (12-09-2026)

- ACTUALIZAR compara V/R numéricamente: solo una revisión canónica superior activa el botón; bloquea falsos downgrades de Preview y muestra V, R y fecha activas.
- MICRÓFONO libera por completo la salida de audio antes de capturar, conserva score/registro y reabre hasta 25 turnos sin perder contexto.
- IA Universal reintenta un 5xx dentro del presupuesto de 8 s, mantiene visible la respuesta si falla el locutor y clasifica preguntas factuales cortas con 700 tokens.
- Alcance exclusivo LAB; MAESTRO y Producción permanecen intactos.

## V407 · R61 — CIERRE ATÓMICO PUBLICABLE (12-09-2026)

- R61 identifica el mismo código funcional R60 ya aprobado, ahora cerrado junto con el cargador canónico, worker de retiro y sello de payload exigidos por el gate.
- No agrega comportamiento; evita publicar un payload distinto bajo el mismo número de revisión. MAESTRO/Producción intactos.

## V407 · R62 — SEPARACIÓN FUENTE / ARTEFACTO DE BUILD (12-09-2026)

- Restaura `index-grupal.html` y `service-worker.js` como fuentes auditables completas; el generador los transforma en cargador y worker de retiro únicamente después de aprobar la auditoría.
- Evita que pruebas heredadas examinen un cargador de 1.7 KB en lugar de la aplicación. El comportamiento crítico ya aprobado no cambia. MAESTRO/Producción intactos.
- El gate intocable acepta únicamente las dos representaciones válidas del worker R62: fuente V363 auditable o retiro generado que borra cachés heredadas y se desregistra.

## V407 · R63 — VOZ PERSISTENTE EN IPHONE (13-09-2026)

- Causa raíz: el atajo iOS evitaba `/api/session-grupal`, cerraba el reconocimiento después de la primera pregunta y podía aceptar `speechSynthesis.onstart` sin audio audible. R63 prioriza WebRTC persistente y conserva el fallback local solo dentro de la recuperación de transporte.
- Evidencia focal: `test-v407-r63-iphone-persistent-voice.mjs`, gate de actualización, transporte de micrófono, 25 turnos universales y voz en Inicio/Registro/Tarjeta en PASS. MAESTRO/Producción intactos.
- Compatibilidad del gate: `test-no-automatic-x.mjs` lee `candidate-index-grupal.html`, preservando la comprobación V155 sobre la fuente real antes de generar el cargador.
