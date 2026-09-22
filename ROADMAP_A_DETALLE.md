# ROADMAP A DETALLE

## LAB 20-sep-2026 · saneamiento del gate ROADMAP contra contratos retirados

El workflow obligatorio aún ejecutaba `test-v357-synchronized-progressive-voice.mjs` y otros bancos V354–V362 que importan `api/voice-health.js` y validan reconocimiento/dictado ya retirado por el perfil LAB actual. Esa discrepancia hacía fallar el gate aun cuando el build vigente ya certificaba expresamente que no existen entradas de micrófono/AI y que la voz local de resultados permanece.

Se sustituye ese bloque obsoleto por `node scripts/build-manual-lab.mjs`, que es el perfil técnico vigente y ejecuta los contratos actuales: ausencia de micrófono/AI, voz local, motor Gross/Neto/HCP, cierres, registro, Stableford, General, Match Play, Four Ball, Skins, cuenta, atajos, navegación, artefactos, torneos, auditoría operacional y paridad manual/pantallas. No se modifica ninguna función de producción.

Archivos exactos: `.github/workflows/roadmap-gate.yml`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`.


## LAB 20-sep-2026 · modalidad editable durante ronda con scores

Defecto físico reportado: al intentar cambiar modalidad después de haber registrado uno o más scores, `canChangeConfiguredRoundMode()` devolvía `false` y obligaba a iniciar una nueva ronda. Ese comportamiento no corresponde al flujo requerido.

`index-grupal.html` conserva `roundHasRecordedScores()` únicamente para informar que existen scores, pero `canChangeConfiguredRoundMode()` permite continuar. Durante edición, `startConfirmedRound()` reconstruye jugadores preservando `old?.holes`, recalcula los valores derivados y después persiste `round.mode=draftRoundMode`; por tanto el cambio de modalidad no elimina los scores ya capturados.

`test-lab-edit-round-mode.mjs` queda alineado con el contrato actual: exige el mensaje `MODALIDAD EDITABLE · LOS SCORES EXISTENTES SE CONSERVAN`, rechaza el texto anterior que obligaba a nueva ronda y verifica que la modalidad seleccionada se persista. Se mantienen las restricciones de cantidad de jugadores propias de Match Play, Four Ball, Universales y juegos laterales.

Archivos exactos del cambio funcional/QA: `index-grupal.html`, `test-lab-edit-round-mode.mjs`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`. Producción no se modifica.



## V407-R29 · corrección directa de ENVIAR TARJETA DIGITAL · 12 de septiembre de 2026

La captura física `IMG_3615.png` demuestra que `FINALIZAR RONDA` habilita correctamente `ENVIAR TARJETA DIGITAL`, pero el segundo toque no abre ninguna opción. La función anterior ejecutaba `await GSCCardFileExport.png(item)` antes de `navigator.share(payload)`. Safari exige que `navigator.share` empiece mientras sigue vigente la activación transitoria del toque; la generación asíncrona la consumía. El `catch` escribía el diagnóstico en `artifactShareStatus`, ubicado dentro de `artifactActions hidden`, de modo que el usuario tampoco veía el fallo.

`index-grupal.html` prepara el PNG inmediatamente después del cierre oficial, deshabilita el botón únicamente durante esa preparación y muestra `TARJETA LISTA PARA ENVIAR`. El siguiente toque crea el `File` desde el Blob almacenado y llama a `navigator.share` sin ninguna espera previa. El estado se mueve fuera del panel oculto y expone cancelación o fallo real. El cambio no modifica scores, cálculo Universales, cierre, Historial, micrófono, AI ni datos de la ronda.

`test-v397-card-in-out-back-contract.mjs` construye una Tarjeta Global Universales de cuatro jugadores, ejecuta la función en un entorno controlado y rechaza cualquier implementación que llame a compartir después de perder la activación. Release/caché avanzan a `V407-R29-DIGITAL-CARD-SHARE-20260913`. Estado automático dirigido PASS; queda pendiente Preview y recorrido físico en iPhone.

Archivos exactos: `index-grupal.html`, `service-worker.js`, `test-v397-card-in-out-back-contract.mjs`, `test-v365-active-round-empty-recovery.mjs`, `test-v406-r2-professional-design.mjs`, `test-v406-r23-visible-version.mjs`, `test-v406-r4-mobile-controls.mjs`, `test-v406-r5-simple-tournament-live.mjs`, `test-v407-r1-premium-visual-system.mjs`, `test-v407-r25-round-controls.mjs`, `test-v407-r7-ios-scroll.mjs`, `test-v407-r9-manual-update.mjs`, `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`.

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

| Archivo exacto | Código V321 | Contenido verificado |
|---|---|---|
| `api/universal-ai.js` | `V321-AI-API` | Responses API, modelo avanzado, Web, fuentes, contexto, seguridad y privacidad sin almacenamiento del proveedor. |
| `api/session-grupal.js` | `V321-LANGUAGE-AUTO` | Transcripción Realtime sin candado de idioma y español predeterminado. |
| `index-grupal.html` | `V321-AI-UNIVERSAL-INFINITY` | UI AI ∞, voz/texto, historial temporal, respuesta escrita, clasificación, contexto y controles. |
| `service-worker.js` | `gscg-mobile-v321-ai-universal-infinity` | Renovación del shell PWA. |
| `audit-project.mjs` | `AUDIT-V321` | Ejecuta la prueba V321 dentro de la auditoría maestra. |
| `test-v321-ai-universal-infinity.mjs` | `200/200` | Prueba los 200 temas, temas futuros, API, Web, contexto, controles y rutas locales. |
| `test-v267-one-operational-line.mjs` | `V321-AUTO-LANG` | Contrato operativo Realtime actualizado. |
| `test-v271-realtime-prompt-limit.mjs` | `V321-AUTO-LANG` | Límite de prompt y transcripción automática. |
| `test-v312-general-caddie.mjs` | `V321-REGRESSION` | Conversación, idioma, micrófono, Web, clima, interrupción y cierre. |
| `test-stableford-ui.mjs` | `BUILD-V321` | Identificador de build vigente. |
| `test-v272-definitive-operational-release.mjs` | `BUILD-V321` | Identificador de build vigente. |
| `test-v274-complete-courses-voice-operations.mjs` | `BUILD-V321` | Identificador de build vigente. |
| `test-v275-stable-live-voice-turns.mjs` | `BUILD-V321` | Identificador de build vigente. |
| `test-v276-manual-hole-navigation.mjs` | `BUILD-V321` | Identificador de build vigente. |
| `test-v277-official-round-corrections.mjs` | `BUILD-V321` | Identificador de build vigente. |
| `test-v278-card-image-pdf-export.mjs` | `BUILD-V321` | Identificador de build vigente. |
| `test-v279-local-card-library.mjs` | `BUILD-V321` | Identificador de build vigente. |
| `test-v280-local-history-insights.mjs` | `BUILD-V321` | Identificador de build vigente. |
| `test-v281-pwa-installation.mjs` | `CACHE-V321` | Caché PWA vigente. |
| `test-v284-native-package-generation.mjs` | `BUILD-V321` | Build web del paquete nativo. |
| `test-v290-brand-icons-cleanup.mjs` | `BUILD-V321` | Identificador de build vigente. |
| `test-v304-homogeneous-registration-actions.mjs` | `BUILD-V321` | Identificador de build vigente. |
| `test-v305-history-navigation-zero-error.mjs` | `BUILD-V321` | Identificador de build vigente. |
| `test-v307-match-arrows-format.mjs` | `BUILD-V321` | Identificador de build vigente. |
| `GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md` | `MANUAL-3.69` | Especificación completa y límites honestos de AI UNIVERSAL ∞. |
| `MANUAL_COBERTURA_FUNCIONAL_V311.md` | `PAGE-73` | Mapeo de función, recuperación y prueba. |
| `docs/manual/v311/manual-pages-17-35.json` | `PAGE-73-V321` | Explicación sencilla de voz, texto, orden/pregunta y continuidad. |
| `scripts/update-manual-page-73.py` | `PDF-V321` | Reemplaza sólo la última página y conserva portada y páginas 01-72. |
| `docs/manual/v311/page-73.png` | `4K-2160x4320` | Render final verificado sin recortes. |
| `docs/manual/v311/Manual_Golf_Score_Card_GT_COMPLETO.pdf` | `74-PAGES-V321` | Portada primero, páginas 01-73 y marcadores internos. |
| `docs/manual/v311/Manual_de_Funciones_Golf_Score_Card_GT_01-16.pdf` | `74-PAGES-V321` | Alias completo sincronizado. |
| `test-v311-manual-semantic-coverage.mjs` | `MANUAL-V321` | Bloquea pérdida de la explicación y controles. |
| `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` | `SOURCE-LOCK-V321` | Digest y cantidad de fuentes activas V321. |

## Golf Score Card GT

Inventario consolidado al corte **V314 · 25 de agosto de 2026**, con **295 archivos activos rastreados en Git**. Las nueve páginas visuales conservan la fotografía original de los 160 archivos activos al cierre de V292; las secciones posteriores incorporan, sin borrar ese antecedente, todos los cambios posteriores. Cada línea incluye:

> **CORTE DE REVISIÓN SOLICITADO:** desde la **línea 160 hacia abajo** se considera contenido nuevo para revisión.

- nombre exacto del archivo;
- ID o código único;
- explicación sencilla de lo que contiene.

### Página 1 de 9

![ROADMAP A DETALLE · Página 1](ROADMAP_IMAGES/ROADMAP_A_DETALLE_01.png)

### Página 2 de 9

![ROADMAP A DETALLE · Página 2](ROADMAP_IMAGES/ROADMAP_A_DETALLE_02.png)

### Página 3 de 9

![ROADMAP A DETALLE · Página 3](ROADMAP_IMAGES/ROADMAP_A_DETALLE_03.png)

### Página 4 de 9

![ROADMAP A DETALLE · Página 4](ROADMAP_IMAGES/ROADMAP_A_DETALLE_04.png)

### Página 5 de 9

![ROADMAP A DETALLE · Página 5](ROADMAP_IMAGES/ROADMAP_A_DETALLE_05.png)

### Página 6 de 9

![ROADMAP A DETALLE · Página 6](ROADMAP_IMAGES/ROADMAP_A_DETALLE_06.png)

### Página 7 de 9

![ROADMAP A DETALLE · Página 7](ROADMAP_IMAGES/ROADMAP_A_DETALLE_07.png)

### Página 8 de 9

![ROADMAP A DETALLE · Página 8](ROADMAP_IMAGES/ROADMAP_A_DETALLE_08.png)

### Página 9 de 9

![ROADMAP A DETALLE · Página 9](ROADMAP_IMAGES/ROADMAP_A_DETALLE_09.png)

## Referencias completas

- [ROADMAP OVERALL](ROADMAP_OVERALL.md)
- [Mapa maestro de archivos](CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md)
- [Mapa de infraestructura](CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_INFRAESTRUCTURA.md)
- [Inventario de publicaciones Vercel](CONTROL_PROYECTO_SCIRE/INVENTARIO_DESPLIEGUES_VERCEL.md)

Este archivo permanece como entrada directa y amigable al directorio detallado del proyecto.

## Continuación del directorio · Corte nuevo desde la línea 160

| Línea | Nombre exacto | ID o código | Qué contiene |
|---:|---|---|---|
| 160 | `verify-manual-sync.mjs` | `8042010c6b0cd81915a57a8ac65d1f778bea7cc7` | Primera línea del corte nuevo solicitado; comprueba la sincronización entre el manual y la aplicación. |
| 161 | `ROADMAP_IMAGES/README.md` | `693f74b22cd9b885b473288f36c8437539429485` | Índice de todas las imágenes detalladas. |
| 162 | `ROADMAP_IMAGES/01_ARCHIVOS_ACTIVOS_COMPLETO.png` | `b3ac32312aaaa986e64684793b56539cf22e9280` | Imagen continua de los archivos activos. |
| 163 | `ROADMAP_IMAGES/02_ARCHIVOS_RETIRADOS_COMPLETO.png` | `eb46364dc267183bf0d6e2863d26aa0c657eee65` | Imagen continua de los archivos retirados. |
| 164 | `ROADMAP_IMAGES/03_INFRAESTRUCTURA_COMPLETO.png` | `0f66e7ac0a000573ffeb9f613d88815c829f9fa0` | Imagen continua de infraestructura e IDs. |
| 165 | `ROADMAP_IMAGES/04_RAMAS_GITHUB_COMPLETO.png` | `b0b615d5c147373000e84dcba10fe01304100ce2` | Imagen continua de las ramas de GitHub. |
| 166 | `ROADMAP_IMAGES/05_VERCEL_01_A_COMPLETO.png` | `a1cb219919df9d3c530799be9bf469863e59820f` | Publicaciones Vercel 1 a 78. |
| 167 | `ROADMAP_IMAGES/05_VERCEL_01_B_COMPLETO.png` | `f12aa1d1faa64eef046851e012e616ab0176093f` | Publicaciones Vercel 79 a 156. |
| 168 | `ROADMAP_IMAGES/06_VERCEL_02_A_COMPLETO.png` | `424bdb42ee60ccdd299c5d09648144fe76d6301b` | Publicaciones Vercel 157 a 234. |
| 169 | `ROADMAP_IMAGES/06_VERCEL_02_B_COMPLETO.png` | `d5a041447df51e6e7aeb8bd8c237ce4cf930300e` | Publicaciones Vercel 235 a 312. |
| 170 | `ROADMAP_IMAGES/07_VERCEL_03_A_COMPLETO.png` | `227e81e811a9dfff4ca83feaa6fcc35d1253b244` | Publicaciones Vercel 313 a 390. |
| 171 | `ROADMAP_IMAGES/07_VERCEL_03_B_COMPLETO.png` | `4037cfe4d9c5f6dbb731abcc37b4170e8f0359fb` | Publicaciones Vercel 391 a 468. |
| 172 | `ROADMAP_IMAGES/08_VERCEL_04_A_COMPLETO.png` | `c0cd9ad1fba1b07dbd607db175230bdc8092c1b0` | Publicaciones Vercel 469 a 545. |
| 173 | `ROADMAP_IMAGES/08_VERCEL_04_B_COMPLETO.png` | `3e94c9fc0bab3b7d7c5450846316ccffb5ff4ba3` | Publicaciones Vercel 546 a 622. |
| 174 | `ROADMAP_A_DETALLE.md` | Se genera con este mismo archivo | Este directorio visual y su norma permanente. |
| 175 | `ROADMAP_IMAGES/ROADMAP_A_DETALLE_01.png` | `2377b6bba6c886a2fddac44b2d01fbc7ebf3f0ca` | Página 1 de 9 del directorio visual. |
| 176 | `ROADMAP_IMAGES/ROADMAP_A_DETALLE_02.png` | `ba0d741c811283d33e53431b9a90cf3055a97bed` | Página 2 de 9 del directorio visual. |
| 177 | `ROADMAP_IMAGES/ROADMAP_A_DETALLE_03.png` | `feb9f2f6ebab3b7321f6e741fb5c6886625cb0d7` | Página 3 de 9 del directorio visual. |
| 178 | `ROADMAP_IMAGES/ROADMAP_A_DETALLE_04.png` | `8b1240dce80a451ff2274708317a303c220c2133` | Página 4 de 9 del directorio visual. |
| 179 | `ROADMAP_IMAGES/ROADMAP_A_DETALLE_05.png` | `3277fc72250970281438c00eb11f1e29a2ffaf4f` | Página 5 de 9 del directorio visual. |
| 180 | `ROADMAP_IMAGES/ROADMAP_A_DETALLE_06.png` | `0aa2913da74c26c396e114d9958f3d06e7f296b0` | Página 6 de 9 del directorio visual. |
| 181 | `ROADMAP_IMAGES/ROADMAP_A_DETALLE_07.png` | `f29b846a85639291b546149fe3a819b1bca23115` | Página 7 de 9 del directorio visual. |
| 182 | `ROADMAP_IMAGES/ROADMAP_A_DETALLE_08.png` | `50bb1bbb190bcee92bcecccc576d61bf2f89f44a` | Página 8 de 9 del directorio visual. |
| 183 | `ROADMAP_IMAGES/ROADMAP_A_DETALLE_09.png` | `2375cd4734decbc33ea9e778d9ae292e19dacd34` | Página 9 de 9 del directorio visual. |
| 184 | `.github/workflows/roadmap-gate.yml` | `2b0e0640e36c07e343f06414a9d2d703727237bb` | Candado automático que bloquea cambios no registrados. |
| 185 | `scripts/roadmap-gate.mjs` | `94694d94a956dc7a62fb17697447f5fb4916617c` | Comprueba que toda modificación aparezca en ambos ROADMAPS. |

## Registro obligatorio de la modificación V294

| Archivo modificado | ID o código actualizado | Explicación sencilla |
|---|---|---|
| `.github/workflows/ios-build.yml` | `8a61450069cd4ec9297204841a70788ae1f4ad0f` | La construcción de iPhone se detiene si faltan los dos ROADMAPS. |
| `.github/workflows/ios-testflight.yml` | `b67cfeef9a79cc4b419accece846a7e334a27636` | La preparación para TestFlight se detiene si faltan los dos ROADMAPS. |
| `.github/workflows/mobile-native-package.yml` | `ee0d6b5b72cfab49646b58a764dcb8d585c88ee5` | El paquete Apple/Android también se detiene si faltan los ROADMAPS. |
| `.github/workflows/roadmap-gate.yml` | `2b0e0640e36c07e343f06414a9d2d703727237bb` | Ejecuta automáticamente el candado en GitHub. |
| `.github/workflows/stableford-tournament-pass.yml` | `df70cf36092ddd72b59271bf241b1ac58fb21027` | Las pruebas principales de Stableford se detienen si faltan los dos ROADMAPS. |
| `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/DIRECTRICES_MANDATORIAS.md` | `be454f43b458670199a7be029abf716dc49108d7` | Guarda la norma permanente, el punto de corte y la hora. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Se genera con este mismo mapa | Registra los archivos nuevos y los códigos actualizados. |
| `audit-project.mjs` | `597a19619b0c7f64e8d6963f0d28ab02a329f6cf` | Toda comprobación maestra empieza ejecutando el candado. |
| `package.json` | `a9ffec0ea56adb2998235b502fd71ed092b13bb0` | Agrega el botón técnico `roadmap:gate`. |
| `scripts/roadmap-gate.mjs` | `94694d94a956dc7a62fb17697447f5fb4916617c` | Revisa los archivos cambiados contra ambos ROADMAPS. |

## Registro obligatorio del refuerzo técnico V295

| Archivo modificado | ID o código actualizado | Explicación sencilla |
|---|---|---|
| `vercel.json` | `7915a87799ed0549f7ef1f4f40a46ad719a922eb` | Vercel debe ejecutar el candado antes de publicar. |
| `scripts/roadmap-gate.mjs` | `94694d94a956dc7a62fb17697447f5fb4916617c` | Si Vercel no puede identificar los cambios, bloquea la publicación por seguridad. |
| `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/DIRECTRICES_MANDATORIAS.md` | `be454f43b458670199a7be029abf716dc49108d7` | Incorpora Vercel a las rutas obligadas a ejecutar el candado. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Se genera con este mismo mapa | Actualiza códigos y explicaciones del refuerzo. |
| `ROADMAP_A_DETALLE.md` | Se genera con este mismo archivo | Registra este refuerzo técnico línea por línea. |
| `ROADMAP_OVERALL.md` | Se genera con este mismo archivo | Registra este refuerzo en el resumen general. |

## Registro obligatorio del ajuste de salida V296

| Archivo modificado | ID o código actualizado | Explicación sencilla |
|---|---|---|
| `vercel.json` | `c6dbbe007a72b62ed141e39aac6128f2dce3eb8b` | Mantiene el candado y señala a Vercel la carpeta final que debe publicar. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Se genera con este mismo mapa | Actualiza el código y la explicación del ajuste. |
| `ROADMAP_A_DETALLE.md` | Se genera con este mismo archivo | Registra el ajuste dentro del directorio detallado. |
| `ROADMAP_OVERALL.md` | Se genera con este mismo archivo | Registra el ajuste dentro del resumen general. |

## Registro obligatorio de la actualización operativa V297

Autorización: **24 de agosto de 2026**. Alcance: instalar el icono cuadrado cromado 3D con verde neón muy saturado en todos los formatos Apple, Android y web instalable; además, reducir 50 % el micrófono visible de registro y mostrar una figura clara de micrófono sin cambiar su función.

| Archivo modificado | ID o código actualizado | Explicación sencilla |
|---|---|---|
| `7B1C43A7-EB8A-43CB-B03E-0CAE9273F2A2.jpeg` | `1c3cdacf565de7b2ce42d57bb416a23c50af1b8e` | Fuente histórica del logo, ahora con cromado 3D y verde neón muy saturado. |
| `assets/logo.png` | `376f6237bbdddf4245ecd3da0f080ad5462f8178` | Imagen de 1024 usada para preparar los paquetes Apple y Android. |
| `assets/official-logos/README.md` | Registro V297 | Explica que la versión cromada 3D es la oficial. |
| `assets/official-logos/golf-score-card-gt-app-store-1024.png` | `376f6237bbdddf4245ecd3da0f080ad5462f8178` | Icono final de 1024 para App Store. |
| `assets/official-logos/golf-score-card-gt-apple-touch-180.png` | `ed44949eeb3aedad2ea1cf806091d216bc5e67e0` | Icono final que verá el usuario al instalarla en iPhone o iPad. |
| `assets/official-logos/golf-score-card-gt-google-play-512.png` | `0e85cc6995f9bafefb49dec5a8253aef3db7fffd` | Icono final de 512 para Google Play. |
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
- Control maestro preservado: punto de corte `línea 185`; activación: 23 de agosto de 2026, 17:05:00, hora de Guatemala.
- Resello remoto R21: `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` usa el digest del árbol Git que audita Vercel; `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md` documentan el mismo cambio. MAIN/Producción permanece intacta.
- Verificación final del resello R21: los tres archivos anteriores se recalculan contra el `HEAD` remoto exacto que usa Vercel; no cambia código funcional ni MAIN/Producción.
- Corrección física R21: `middleware.js` consulta el estado mediante `/api/app-access?action=status` y elimina la importación ESM incompatible que causaba `MIDDLEWARE_INVOCATION_FAILED`; ambos ROADMAPS y el sello se actualizan en el mismo commit. MAIN/Producción no cambia.
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


## HOTFIX OFICIAL EL PULTÉ · 10 SEPTIEMBRE 2026

`index-grupal.html` corrige exclusivamente `PULTE_SI_MEN` conforme a la tarjeta física oficial: 9,5,7,11,17,3,1,15,13,18,2,8,16,4,6,12,10,14. `service-worker.js` renueva únicamente las cachés activa y aprobada para entregar la corrección sin borrar la ronda. Sin cambios en jugadores, scores, diseño, modalidades o demás contenido.

Registro conjunto del despliegue: hotfix `main` commits `481f716` y `c548f30`; matriz verificada como permutación exacta 1–18. Estado físico posterior al despliegue: pendiente.

- Hotfix Maestro El Pulté (10 de septiembre de 2026): la regresión de recuperación acepta la identidad exacta del caché `v407-r28-pulte-handicap-hotfix`; cambio limitado a handicaps oficiales y entrega, sin alterar scores ni jugadores.

- Seguimiento hotfix: se alinea la expectativa del caché aprobado con `approved-pulte-handicap-hotfix`; sin cambios funcionales adicionales.

- Entrega del hotfix: identidad técnica `V407-R28-PULTE-HANDICAP-HOTFIX-20260910` para que instalaciones existentes detecten ACTUALIZAR sin borrar la ronda.
- 2026-09-13 · R29: paquete de despliegue validado con el envío digital de iPhone, la prueba de activación del toque y el registro de cambios en un mismo commit.


## R30 · Envío PNG validado en iPhone · 2026-09-13
- `card-file-export.js`: SVG autocontenido en data URL evita SecurityError de canvas contaminado; texto blanco y Arial, límite de espera y control de contexto. PNG real: 160728 bytes.
- Prueba física PASS: el usuario confirmó «Eso sí, funcionó y llegó». Integración Main solicitada explícitamente.
- `index-grupal.html` y `service-worker.js`: identidad R30 para entregar el exportador mediante ACTUALIZAR. Sin cambios en almacenamiento de rondas ni scores.
- Pruebas de versión y actualización alineadas con R30; registro RC-104 en `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`; sello `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.
- Evidencia de comparación en rama fix-r30-card-png; la página temporal no se incorpora en Main.


## R31 · Comunicación universal clara · 2026-09-13
- `api/universal-ai.js`: clima actual hablado sin ficha técnica, sin convertir nulos en cero; instrucciones de lenguaje natural y límites de diagnóstico y tasación.
- `scripts/universal-quality-benchmark.mjs`: cuatro consultas reales al backend durante Preview, con resultados verificables; referencia ChatGPT de esta conversación y evaluación de contenido, no similitud literal.
- `test-r31-universal-plain.mjs`: regresión de clima actual, datos ausentes y horizonte de lluvia.
- `vercel.json`: ejecuta comparación solamente en la rama de revisión. Resultado y publicación pendientes.

- `docs/quality/R31_COMPARACION_UNIVERSAL.md`: referencia previa, fuentes y rúbrica de 100 puntos; el análisis detallado se mantiene sólo cuando se solicita profundidad.

- Comparación real: 4/4 respuestas; BMW rechazado por tasación local sin comparables locales y fuentes de variantes mezcladas. Se endurece identificación de variante y se repite únicamente ese caso. Sin aprobación del umbral 90 todavía.

- Segunda comparación: BMW ya distingue referencia internacional y ausencia de precio local; se exige identificar año/fuente de comparables. iPhone añade alternativa cuando la pantalla no responde. Revisión focalizada de estos dos casos.

- Paquete Main R31 preparado: `index-grupal.html` y `service-worker.js` renuevan sólo identificación; pruebas de versión alineadas. No cambia actualización, almacenamiento, scores ni exportador PNG. `vercel.json` conserva el comando original de producción; comparación externa sólo en rama de revisión.

- `docs/quality/R31_RESPUESTAS_REALES.json`: respuestas reales y tiempos; evaluación manual acotada 94/100, sin garantía de similitud general ni de audio físico. Main/LAB R31: preparado para publicación del backend verificado.


## 2026-09-13 · R32 · Preguntas abiertas y voz
Filtro de conversación corregido; éxito audible real; liberación de audio AI ∞. Se preserva la corrección de actualización publicada en LAB y se mantiene R31. Pruebas y límites físicos en `docs/quality/R32_PREGUNTAS_Y_VOZ.md`.
Archivos de esta versión:
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`
- `ROADMAP_A_DETALLE.md`
- `ROADMAP_OVERALL.md`
- `docs/quality/R32_PREGUNTAS_Y_VOZ.md`
- `index-grupal.html`
- `service-worker.js`
- `test-r32-open-conversation.mjs`
- `test-update-check-errors.mjs`
- `test-v358-ios-score-universal-physical-recovery.mjs`
- `test-v365-active-round-empty-recovery.mjs`
- `test-v406-r2-professional-design.mjs`
- `test-v406-r23-visible-version.mjs`
- `test-v406-r4-mobile-controls.mjs`
- `test-v406-r5-simple-tournament-live.mjs`
- `test-v407-r1-premium-visual-system.mjs`
- `test-v407-r25-round-controls.mjs`
- `test-v407-r7-ios-scroll.mjs`
- `test-v407-r9-manual-update.mjs`
- `test-voice-result-integrity.mjs`

`Intocables/APROBACION_FISICA_REGISTRO_SCORES_V378.json`: sello de microfono_compartido actualizado sólo por corrección universal autorizada; SHA previo conservado, aprobación física R32 pendiente. Banco V358 restaurado sin cambios; liberación de audio dentro de startAiUniversalListening.


## 2026-09-13 · R33 · Error visible en comunicación universal
Hallazgo en navegador R32: causa del silencio quedaba oculta. R33 muestra aviso junto a controles, independiente del reloj. Prueba física iPhone pendiente. Archivos:
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`
- `Intocables/APROBACION_FISICA_REGISTRO_SCORES_V378.json`
- `ROADMAP_A_DETALLE.md`
- `ROADMAP_OVERALL.md`
- `docs/quality/R33_ERROR_VISIBLE.md`
- `index-grupal.html`
- `service-worker.js`
- `test-r33-visible-voice-errors.mjs`
- `test-v365-active-round-empty-recovery.mjs`
- `test-v406-r2-professional-design.mjs`
- `test-v406-r23-visible-version.mjs`
- `test-v406-r4-mobile-controls.mjs`
- `test-v406-r5-simple-tournament-live.mjs`
- `test-v407-r1-premium-visual-system.mjs`
- `test-v407-r25-round-controls.mjs`
- `test-v407-r7-ios-scroll.mjs`
- `test-v407-r9-manual-update.mjs`


## V407-R34 · Respuesta escrita y reproducción verificable · 2026-09-13

Base R33 ab2e227c6dc1. Incidente RC-108: audio iniciado no demuestra salida audible; texto oculto y esperas sin límite. Texto seguro junto a controles, reproductor nativo visible sin mute, plazos máximos y monitor de avance/final. Registro/scores, tarjeta R30 y updater preservados. Pruebas locales dirigidas PASS; Preview y prueba física pendientes. Detalle y rollback en docs/quality/R34_AUDIO_Y_TEXTO.md.

Archivos exactos:
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`
- `ROADMAP_A_DETALLE.md`
- `ROADMAP_OVERALL.md`
- `api/voice-health.js`
- `docs/quality/R34_AUDIO_Y_TEXTO.md`
- `index-grupal.html`
- `scripts/build-r34-voice-review.mjs`
- `service-worker.js`
- `test-r32-open-conversation.mjs`
- `test-r34-audio-response.mjs`
- `test-v365-active-round-empty-recovery.mjs`
- `test-v406-r2-professional-design.mjs`
- `test-v406-r23-visible-version.mjs`
- `test-v406-r4-mobile-controls.mjs`
- `test-v406-r5-simple-tournament-live.mjs`
- `test-v407-r1-premium-visual-system.mjs`
- `test-v407-r25-round-controls.mjs`
- `test-v407-r7-ios-scroll.mjs`
- `test-v407-r9-manual-update.mjs`
- `test-voice-result-integrity.mjs`
- `vercel.json`

- `audit-project.mjs`: bancos R32/R33/R34 e integridad de voz obligatorios en cada despliegue.

R34 evidencia Preview: 0595868e64733075c00aa4d0ebe1eecaef438674 READY en ambos proyectos; reproducción real de frase sintética 5,12 s, RMS0,16452, avance/finalización y texto visible PASS. Prueba física iPhone pendiente.

## R35 local y diagnóstico de captura R36 · 2026-09-13 · NO PUBLICADO

Cambio autorizado: ubicación explícita del clima y recuperación de captura abandonada. Simulaciones dirigidas PASS; equivalencia ChatGPT, audio inyectado real y comprobación iPhone pendientes. Evidencia en docs/quality/R36_CAPTURE_DIAGNOSTIC.json. No se atribuye al iPhone la ausencia de dispositivo del navegador de pruebas.

- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`: código, prueba o evidencia de la revisión conversacional local.
- `Intocables/APROBACION_FISICA_REGISTRO_SCORES_V378.json`: código, prueba o evidencia de la revisión conversacional local.
- `api/universal-ai.js`: código, prueba o evidencia de la revisión conversacional local.
- `api/weather.js`: código, prueba o evidencia de la revisión conversacional local.
- `docs/quality/R35_BANCO_100_PREGUNTAS.json`: código, prueba o evidencia de la revisión conversacional local.
- `docs/quality/R36_CAPTURE_DIAGNOSTIC.json`: código, prueba o evidencia de la revisión conversacional local.
- `docs/quality/R36_CAPTURE_DIAGNOSTIC.md`: código, prueba o evidencia de la revisión conversacional local.
- `index-grupal.html`: código, prueba o evidencia de la revisión conversacional local.
- `test-r31-universal-plain.mjs`: código, prueba o evidencia de la revisión conversacional local.
- `test-r35-weather-location.mjs`: código, prueba o evidencia de la revisión conversacional local.
- `test-r36-capture-permissions.mjs`: código, prueba o evidencia de la revisión conversacional local.
- `test-r36-capture-release.mjs`: código, prueba o evidencia de la revisión conversacional local.
- `test-v335-response-caliber.mjs`: código, prueba o evidencia de la revisión conversacional local.
- `test-v364-vercel-oidc-recovery.mjs`: código, prueba o evidencia de la revisión conversacional local.
- `audit-project.mjs`: exige pruebas de liberación de captura y permisos para prevenir reincidencias.

### Seguimiento de aceptación de 100 conversaciones · 2026-09-13
- `docs/quality/R36_CAPTURE_DIAGNOSTIC.json`: evidencia del banco externo 0/100 y límites del método.
- `docs/quality/R36_CAPTURE_DIAGNOSTIC.md`: rechazo del banco como prueba de navegador consecutiva; infraestructura real pendiente. Sin publicación.


## Continuidad conversacional R36 · 13 septiembre 2026 · NO APROBADO

Motor real: 100/100 respuestas HTTP, mediana 3327 ms; 100 referencias ChatGPT observadas. Comparación editorial provisional: 98 aceptables, 1 fallo de costos/precios, 1 pendiente de revisar. No certifica equivalencia del flujo completo. Integración de servicios de audio externa: 100/100, sin reproducción y con cuatro trabajadores. Nueve consultas adicionales reales: texto y bytes de voz; costos aún necesita respuesta relativa correcta, las tres ciudades sí se resolvieron.

Segunda escucha: R34 negativo (0 aperturas tras fin de voz), código local positivo (100 transiciones sin duplicados; Detener cancela). Reconocimiento simulado, no hardware iPhone. Persistencia real de ronda sintética LAB tras recarga: cinco tablas idénticas. TestMu documenta inyección iOS, pero no hay cuenta/plan ni dispositivo aprovisionado. Latencia integral <=40%, 100 turnos de navegador y comprobación física siguen pendientes. Regresión integral final reservada para candidato completo.

Archivos del alcance y evidencias:
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`: corrección, control o evidencia de la conversación; no publicación.
- `Intocables/APROBACION_FISICA_REGISTRO_SCORES_V378.json`: corrección, control o evidencia de la conversación; no publicación.
- `api/universal-ai.js`: corrección, control o evidencia de la conversación; no publicación.
- `audit-project.mjs`: corrección, control o evidencia de la conversación; no publicación.
- `docs/quality/ENGINE_100_COMPARISON.html`: corrección, control o evidencia de la conversación; no publicación.
- `docs/quality/ENGINE_100_COMPARISON.json`: corrección, control o evidencia de la conversación; no publicación.
- `docs/quality/ENGINE_CHATGPT_REFERENCES_100.json`: corrección, control o evidencia de la conversación; no publicación.
- `docs/quality/ENGINE_R34_COMPLETE_100.json`: corrección, control o evidencia de la conversación; no publicación.
- `docs/quality/ENGINE_R34_PARTIAL_18.json`: corrección, control o evidencia de la conversación; no publicación.
- `docs/quality/R36_CONTINUITY_EVIDENCE.json`: corrección, control o evidencia de la conversación; no publicación.
- `docs/quality/R36_TARGETED_CHATGPT.json`: corrección, control o evidencia de la conversación; no publicación.
- `docs/quality/R36_TARGETED_CHATGPT_RAW.txt`: corrección, control o evidencia de la conversación; no publicación.
- `docs/quality/R36_TARGETED_REAL_9.json`: corrección, control o evidencia de la conversación; no publicación.
- `index-grupal.html`: corrección, control o evidencia de la conversación; no publicación.
- `scripts/check-conversation-acceptance.mjs`: corrección, control o evidencia de la conversación; no publicación.
- `scripts/render-engine-comparison.py`: corrección, control o evidencia de la conversación; no publicación.
- `scripts/run-r36-build.mjs`: corrección, control o evidencia de la conversación; no publicación.
- `scripts/run-r36-targeted.mjs`: corrección, control o evidencia de la conversación; no publicación.
- `test-r34-audio-response.mjs`: corrección, control o evidencia de la conversación; no publicación.
- `test-r35-weather-location.mjs`: corrección, control o evidencia de la conversación; no publicación.
- `test-r36-followup-events.mjs`: corrección, control o evidencia de la conversación; no publicación.


## R36 publicación autorizada — 2026-09-13
Orden del propietario: Publica. Correcciones de liberación de captura, siguiente pregunta, ubicación explícita y voz por fragmentos. Pruebas controladas PASS; validación física y equivalencia integral de 100 conversaciones pendientes. No se certifica reducción total de latencia. Reversión: e871621c2af478deed6957a625feb0e280402d68 conservando almacenamiento local.
Archivos exactos:
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`
- `Intocables/APROBACION_FISICA_REGISTRO_SCORES_V378.json`
- `ROADMAP_A_DETALLE.md`
- `ROADMAP_OVERALL.md`
- `api/universal-ai.js`
- `api/weather.js`
- `audit-project.mjs`
- `docs/quality/ENGINE_100_COMPARISON.html`
- `docs/quality/ENGINE_100_COMPARISON.json`
- `docs/quality/ENGINE_CHATGPT_REFERENCES_100.json`
- `docs/quality/ENGINE_R34_COMPLETE_100.json`
- `docs/quality/ENGINE_R34_PARTIAL_18.json`
- `docs/quality/R35_BANCO_100_PREGUNTAS.json`
- `docs/quality/R36_CAPTURE_DIAGNOSTIC.json`
- `docs/quality/R36_CAPTURE_DIAGNOSTIC.md`
- `docs/quality/R36_CONTINUITY_EVIDENCE.json`
- `docs/quality/R36_TARGETED_CHATGPT.json`
- `docs/quality/R36_TARGETED_CHATGPT_RAW.txt`
- `docs/quality/R36_TARGETED_COMPARISON_9.json`
- `docs/quality/R36_TARGETED_REAL_9.json`
- `docs/quality/R36_TTS_LATENCY_PAIRS.json`
- `index-grupal.html`
- `scripts/check-conversation-acceptance.mjs`
- `scripts/render-engine-comparison.py`
- `scripts/run-r36-audio-sequential.mjs`
- `scripts/run-r36-build.mjs`
- `scripts/run-r36-latency-probe.mjs`
- `scripts/run-r36-targeted.mjs`
- `service-worker.js`
- `test-r31-universal-plain.mjs`
- `test-r34-audio-response.mjs`
- `test-r35-weather-location.mjs`
- `test-r36-capture-permissions.mjs`
- `test-r36-capture-release.mjs`
- `test-r36-followup-events.mjs`
- `test-v335-response-caliber.mjs`
- `test-v364-vercel-oidc-recovery.mjs`
- `test-v365-active-round-empty-recovery.mjs`
- `test-v406-r2-professional-design.mjs`
- `test-v406-r23-visible-version.mjs`
- `test-v406-r4-mobile-controls.mjs`
- `test-v406-r5-simple-tournament-live.mjs`
- `test-v407-r1-premium-visual-system.mjs`
- `test-v407-r25-round-controls.mjs`
- `test-v407-r7-ios-scroll.mjs`
- `test-v407-r9-manual-update.mjs`

R36: test-v365-active-round-empty-recovery.mjs conserva la prueba de recuperación y verifica el identificador sucesor de caché.

## V407 · R37 — CLIMA VIVO CONSISTENTE

- `index-grupal.html`: `activeCourseWeatherSnapshot` separa el dato meteorológico informativo actual de la tarjeta cerrada; `currentCourseWeatherSnapshot()` alimenta franja y contexto universal. El refresco ya no se cancela por `officiallyClosedAt`, pero `persist()` continúa prohibido en ese estado.
- `service-worker.js`: `V407-R37-LIVE-WEATHER-20260913` y caché sucesor.
- `test-r37-closed-round-live-weather.mjs`: ejecuta la función extraída con ronda cerrada, exige una consulta, render sincronizando/final, 27 °C visible, 20.7 °C histórico intacto y cero persistencias.
- `test-v312-general-caddie.mjs`: sustituye la aserción histórica que exigía cancelar el clima en rondas cerradas por la separación entre instantánea viva y persistencia oficial.
- `audit-project.mjs`: hace bloqueante la prueba R37.
- `test-v365-active-round-empty-recovery.mjs`, `test-v406-r2-professional-design.mjs`, `test-v406-r23-visible-version.mjs`, `test-v406-r4-mobile-controls.mjs`, `test-v406-r5-simple-tournament-live.mjs`, `test-v407-r1-premium-visual-system.mjs`, `test-v407-r25-round-controls.mjs`, `test-v407-r7-ios-scroll.mjs`, `test-v407-r9-manual-update.mjs`: contrato R37 actualizado.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`: causa, escape y prevención RC-104.
- Reversión exacta: `ccdd004b361bd84dd5936aa069c7722b13b5659f`, sin borrar ronda, historial ni credenciales locales.


## PTT — corrección local de duración (2026-09-13T22:19:28.097630+00:00)
Estado: pendiente de validación física y publicación. Se detectó y corrigió que la espera de onstop inflaba la duración de pulsaciones breves. voice-turns.js registra stoppedAt al soltar. Evidencia: node test-ptt-independent-turns.mjs termina con exit 0; incluye 100 turnos simulados y casos de onstop demorado, pulsación de 50 ms con 1000 ms de espera y recuperación tras permiso denegado. No equivale a prueba iPhone ni proveedor real. Actualizar no fue modificado. Próximo paso: validación navegador/proveedor y controles pendientes antes de candidato.


### Candidato local PTT — archivos incluidos
- `index-grupal.html`
- `voice-turns.js`
- `api/voice-transcribe.js`
- `test-ptt-independent-turns.mjs`
- `audit-project.mjs`
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`
Estado: pruebas simuladas PASS; proveedor real, revisión navegador e iPhone pendientes. No aprobado como solución integral.


## R38 — Publicación solicitada en Laboratorio y Maestro
Nueva identidad de release y caché para activar el detector existente de Actualizar. Mantiene el toque manual y los datos locales. Push-to-talk incluido en shell. Orden expresa del propietario para ambos enlaces habituales. Comunicación Universal mantiene un fallo de disponibilidad pendiente; no se afirma solución integral.
Archivos de esta actualización:
- `index-grupal.html`
- `service-worker.js`
- `test-v365-active-round-empty-recovery.mjs`
- `test-v406-r2-professional-design.mjs`
- `test-v406-r23-visible-version.mjs`
- `test-v406-r4-mobile-controls.mjs`
- `test-v406-r5-simple-tournament-live.mjs`
- `test-v407-r1-premium-visual-system.mjs`
- `test-v407-r25-round-controls.mjs`
- `test-v407-r7-ios-scroll.mjs`
- `test-v407-r9-manual-update.mjs`
- `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md`
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`


## OP-60 — Obligación permanente de ejecución visible
Orden expresa 13 septiembre 2026: reportar acción y evidencia visible cada máximo 60 segundos, seguir ejecutando después del reporte y documentar bloqueos reales antes de detenerse. Aplicación a Laboratorio, Maestro y futuras continuaciones. Registro documental; no cambia el código de las aplicaciones.
Archivos de esta modificación:
- `AGENTS.md`
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/DIRECTRICES_MANDATORIAS.md`
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/MATRIZ_GATE_0_PROYECTO.md`
- `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md`
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/MATRIZ_GATE_0_PROYECTO.json`
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`
- `ROADMAP_OVERALL.md`
- `ROADMAP_A_DETALLE.md`
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`


## R39 — Grabación visible y respuesta sólo por sonido
Corrección por orden del propietario: activar estado rojo/blanco del micrófono en tarjeta, sincronizar estado escuchando durante pulsación, ocultar párrafo hablado, no agregar despedidas de acompañamiento y descartar cierre inesperado del grabador antes de soltar. Banco simulado PASS incluyendo 20 segundos sostenidos; causa del corte físico aún no demostrada. No se declara validación física. Conserva OP-60.
- `api/universal-ai.js`
- `index-grupal.html`
- `service-worker.js`
- `test-ptt-independent-turns.mjs`
- `test-v365-active-round-empty-recovery.mjs`
- `test-v406-r2-professional-design.mjs`
- `test-v406-r23-visible-version.mjs`
- `test-v406-r4-mobile-controls.mjs`
- `test-v406-r5-simple-tournament-live.mjs`
- `test-v407-r1-premium-visual-system.mjs`
- `test-v407-r25-round-controls.mjs`
- `test-v407-r7-ios-scroll.mjs`
- `test-v407-r9-manual-update.mjs`
- `voice-turns.js`
- `docs/quality/R39_PTT_RESULTADO.json`
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`

## R40 · 13 septiembre 2026 · pulsación sostenida y registro explícito

Orden del propietario tras IMG_3669/IMG_3670: área táctil invisible +100%, no autocierre mientras mantiene pulsado, registro mediante jugador número/ nombre/handicap/marcas. Fuente R39 286aca44e54b00ced7726ba64ddc966d2153b0fa.

Cambios: se elimina temporizador de cierre de 60 s; perder captura de puntero no equivale a soltar; touch-action none en botón y contenedor; área anterior multiplicada por dos; adaptador de comando explícito separa posición del nombre y evita tratar nombre+dígito conversacional como alta. Guía visible actualizada. Parsers y escritor oficiales conservados; el registro de scores mantiene silencio por regla existente.

Evidencia controlada: 100 turnos, 90 s sin envío hasta soltar, analizador real de dos jugadores con posiciones y nombres correctos, cinco hoyos conservados. Pendiente revisión visual y física; no aprobado integralmente ni publicado en producción. Rollback: R39 286aca4.

Archivos:
- CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md
- CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json
- ROADMAP_A_DETALLE.md
- ROADMAP_OVERALL.md
- docs/quality/R40_PTT_RESULTADO.json
- index-grupal.html
- service-worker.js
- test-ptt-independent-turns.mjs
- test-r40-five-holes.mjs
- audit-project.mjs
- test-v365-active-round-empty-recovery.mjs
- test-v406-r2-professional-design.mjs
- test-v406-r23-visible-version.mjs
- test-v406-r4-mobile-controls.mjs
- test-v406-r5-simple-tournament-live.mjs
- test-v407-r1-premium-visual-system.mjs
- test-v407-r25-round-controls.mjs
- test-v407-r7-ios-scroll.mjs
- test-v407-r9-manual-update.mjs
- voice-turns.js

### R40 · corrección de construcción
Los dos builds de ef096d1 fallaron porque las pruebas de guía visible aún exigían las instrucciones antiguas. Se actualizan las expectativas a jugador número/nombre/handicap/marcas según orden del propietario; no se eliminan verificaciones. Nuevos controles funcionales ejecutados antes de reconstruir.
- test-v255-player-registration-boxes-codes.mjs
- test-v261-registration-stableford-modality.mjs
- test-v290-brand-icons-cleanup.mjs
- test-v304-homogeneous-registration-actions.mjs
- test-v305-registration-guides-parser-truth.mjs
- CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json

Se conserva MIGUEL como nombre de ejemplo por regla visual V311; sólo cambia la sintaxis explícita. Archivo adicional: index-grupal.html. Banco funcional: 143 PASS y un FAIL inicial por el nombre de ejemplo; corregido antes de reconstruir.

### R40 · área táctil exacta por pantalla
Revisión CSS detecta márgenes previos distintos: Registro 26 px y Score Card 10 px. Se ajusta inset con sqrt(2) sobre dimensiones efectivas para duplicar área, sin ampliar icono. Se sustituye cálculo inicial basado en margen genérico. Archivos: index-grupal.html; ROADMAP_OVERALL.md; ROADMAP_A_DETALLE.md; CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json. Verificación matemática en anchos 84/109/180/220: área nueva/anterior 2 dentro de tolerancia 0.000001. Presentación física pendiente.

## R40 · recuperación de invitación observada en navegador
13 septiembre 2026, 18:41 Guatemala. Fuente: 1ce8223. Fallo real: navegación /invite/ entregó shell R38 en vez del formulario, scripts relativos /invite/*.js fallaron Unexpected token <. La ruta oficial /access.html?invite= permitió acceso temporal confirmado en el mismo navegador. Corrección: excluir /invite/ del shell de navegación y usar fetch no-store a la URL original. No modifica validación, permisos, base de datos, expiración ni uso único. No resuelve por sí sola el acceso entre producción y Preview.
Prueba test-invite-service-worker.mjs: rutas invite/access van a red sin leer caché; pruebas existentes de acceso 24h y actualización PASS. Aceptación visual R40 y micrófono físico pendientes; producción intacta. Rollback: 1ce8223.
Archivos: service-worker.js; test-invite-service-worker.mjs; audit-project.mjs; ROADMAP_OVERALL.md; ROADMAP_A_DETALLE.md; CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json; CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md.


## R41 · Inicio de respuesta de voz · 14 septiembre 2026
Corrección limitada a splitUniversalSpeechText: primeras oraciones largas se dividen en pausa o espacio antes de 240 caracteres; se conserva respuesta completa y voz actual. Caso reproducido: primer bloque 1274 → 239 caracteres. test-r34-audio-response.mjs PASS, incluyendo cancelación y reproducción ordenada simulada. No demuestra reducción real a 1/6. Dictado de cinco hoyos pendiente: frase aportada pasa intérprete; falta transcripción original rechazada. Grabación y cierre por soltar intactos. Publicación autorizada en LAB y Maestro; reversión al commit b976451.


## R41 · Corrección servidor tráfico al aeropuerto
14 septiembre 2026: directTrafficRouteFromQuery reconoce conector al. Antes: desde mi ubicación al aeropuerto internacional La Aurora devuelve null; después: origen GPS y destino conservados. Pruebas test-v356-traffic-weather-accuracy.mjs y test-v324-real-traffic.mjs PASS. Archivo funcional: api/universal-ai.js. Dos HTTP 502 observados en Maestro 01:21 UTC siguen sin causa interna identificada; no declarar disponibilidad corregida. Sin cambios del micrófono ni del cliente. Publicación autorizada en ambos servidores.


## R42 · Salida Fish en PTT y cierre de vuelta
14 septiembre 2026. index-grupal.html: PTT evita voz del navegador y Cedar en consultas/cierres; usa speakAiUniversalText con servidor Fish existente a 0.90. El adaptador discreteVoiceController reproduce result.closure tras registro correcto, conservando intacto processBrowserVoiceTranscript y su bloque protegido. test-ptt-independent-turns.mjs agrega cierre Fish exitoso y fallido sin Realtime, con reintento. Pruebas de audio, cierre y pulsación PASS controlado. service-worker.js y pruebas de versión actualizados para entrega R42. Sin prueba física ni garantía de timbre fijo o de 1.5–3.5 segundos: faltan referencia Fish y medición real. Error de tráfico 502 pendiente. Reversión: 54cae71.


## R42 · Diagnóstico específico de tráfico · 14 septiembre 2026
Las dos frases del usuario extraen correctamente origen GPS/El Pulté y destino La Aurora/Oakland Mall. Los HTTP 502 de producción no identificaban su causa. api/_lib/traffic.js agrega registro traffic-failure con código interno, estado HTTP del proveedor, estado normalizado y duración; no registra credenciales, coordenadas, preguntas ni mensajes del proveedor. test-v324-real-traffic.mjs verifica rechazo 403 PERMISSION_DENIED sin datos sensibles. Esto habilita diagnóstico; NO certifica restauración del tráfico ni latencia de voz. Archivos: api/_lib/traffic.js; test-v324-real-traffic.mjs; ROADMAP_OVERALL.md; ROADMAP_A_DETALLE.md; CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json.


## Diagnóstico protegido de configuración de tráfico · 14 septiembre 2026
`GET /api/traffic?action=status` informa únicamente proveedor y `configured`; no expone credenciales, ubicaciones ni consultas. Permite distinguir configuración ausente antes de pedir otra grabación física. Prueba específica PASS. Archivos funcionales: api/traffic.js; middleware.js; test-v324-real-traffic.mjs.


## Recuperación de voz autorizada — 2026-09-19

Maestra base ccffefb. Evidencia: 2026-09-19 01:49 UTC, voice-speech 502 por Gateway fish-audio/s2.1-pro-free 404. Se reemplaza por TTS-1/Onyx 0.90 y respaldo directo con la misma voz antes de entregar audio, timeout total 22.5 s incluido cuerpo. Pruebas simuladas 404/red/audio vacío/respaldo agotado PASS. Audio físico y dos segundos NO verificados. No hay garantía de escala ni alertas externas configuradas. El respaldo requiere OPENAI_API_KEY con saldo: se observó credit_balance_exhausted en la ruta de texto de producción, por lo que su disponibilidad real está pendiente. Sesión no modificada. Rollback: restaurar archivos de este commit desde ccffefb (restaura el proveedor que falló).

Publicación f38d930: construcción rechazada por comprobaciones del modelo anterior. Se actualizan únicamente expectativas de voz en V362 e Intocables; pruebas de captura y scores conservadas.

Archivos de esta corrección autorizada: `api/voice-speech.js`, `test-v356-voice-only-cedar-quality.mjs`, `test-voice-provider-recovery.mjs`, `test-v362-physical-voice-recovery.mjs`, `Intocables/intocables-gate.mjs`, `Intocables/MICROFONO_APROBADO.lock.json`, `Intocables/APROBACION_FISICA_REGISTRO_SCORES_V378.json`, `docs/quality/VOICE_PROVIDER_RECOVERY_20260919.md`.


## LAB manual · 2026-09-19 · EN DESARROLLO
Orden del propietario: retirar micrófono, dictado de scores y comunicación universal únicamente en LAB. Maestra conserva 80dfe05; no promover main. Rama lab/manual-iphone-20260919.
Cambios: controles manuales; endpoints de conversación/transcripción/TTS retirados; anuncios de cierre con speechSynthesis local española; caché propia y Permissions-Policy microphone=().
Verificación técnica: scripts/build-manual-lab.mjs PASS (cálculo, registro, cierres, General/Stableford, Match Play, Four-Ball, Skins y recuperación de anuncios). Nuevo perfil LAB sustituye exclusivamente el build antiguo que exigía micrófono. Las pruebas históricas permanecen disponibles.
Pendiente: revisión visual de formatos/modalidades, limpieza de funciones antiguas inertes, pruebas iPhone y aceptación del propietario. Navegador remoto rechazó localhost con ERR_BLOCKED_BY_CLIENT. No representa un candidato aprobado ni garantía de voz física.
Rollback: descartar rama LAB; no modifica producción.

## LAB · recuperación de compartir · 2026-09-19
IMG_4312/4313: barra solo SUPPORT. Navegador reprodujo TypeError en renderDraft: escritura sobre .newbie-guide-player eliminado con el micrófono interrumpía arranque antes de GSCLiveControl.mount y consulta de invitaciones. index-grupal.html retira esa referencia; test-manual-startup-sharing.mjs reproduce fallo anterior y valida corrección; scripts/build-manual-lab.mjs incorpora candado. Invitaciones conservan control de propietario. ROADMAP_OVERALL.md, ROADMAP_A_DETALLE.md y REGISTRO_REINCIDENCIAS_CALIDAD.md documentan incidente. Base publicada b65b71d; rollback a ese commit solo en LAB. Maestra 80dfe05 intacta. Revisión de nueva publicación pendiente; no se declara prueba iPhone.

## LAB · resultado sin audio · 2026-09-19
IMG_4314: primera vuelta 44 gross/37 netos/+1 sin sonido. Prueba por interfaz de nueve hoyos reproduce cierre y aviso de ausencia de voz local en navegador remoto; causa exacta del iPhone pendiente. device-closures.js espera voiceschanged hasta 2 s, prioriza voz local latinoamericana, mantiene referencia de utterance, detecta inicio ausente y muestra resultado aun sin audio. test-device-closures.mjs cubre carga tardía, rechazo de voz remota, cancelación, cola y bloqueo. Build manual PASS. No equivale a corrección física certificada. Base 6b86f4d; rollback solo de estos archivos. Publicación e iPhone pendientes.

## LAB MANUAL 02 · revisión dirigida del 19 de septiembre de 2026

Se retiran transportes, manejadores y prompts inactivos de micrófono/IA del HTML y el puente de dictado que stableford.js todavía insertaba dinámicamente. Se conservan GSCDeviceClosures, logo, estilos deportivos, control manual, LIVE y permisos owner/guest. Se sincronizan meta release y worker como LAB-MANUAL-CLEAN-20260919.

Evidencia: construcción manual y control de 23 módulos cargados PASS. Recorrido de navegador sobre LAB publicado 6b86f4d: Medal, Match Play seis jugadores (tres líderes 1 UP), Four Ball (+1 pareja verde), Skins (Q10/-Q10), Universales (6/4/2 puntos), Stableford (par=2 puntos), práctica. El registro Stableford publicado conservaba dictado; corregido en este candidato, aún pendiente verificación autenticada del candidato. Las capturas revisadas son del publicado, no certifican el código nuevo. Voz física: únicamente confirmación del propietario al reeditar hoyo 9; cloud carece de voz española local. No se afirma cobertura exhaustiva de todos los cierres, formatos exportados ni iPhone. No se toca MAIN.

## LAB MANUAL 03 · fallo de invitación reportado 19/09/2026 08:32

Evidencia Vercel: POST app-access HTTP 400 a 14:32:26 y 14:32:30 UTC en deployment 6GiLMSHL3jgxaMYByC9cHhgDD3ya; GET status 200. Causa interna aún no identificada: catch anterior no registraba detalle. Se conserva el error visible, código seguro en logs sin tokens ni datos personales y respuesta 503 para almacenamiento no configurado. La invitación preparada se comparte en un segundo toque para mantener activación Safari; no se genera otra al cancelar. Prueba de fallo persistente y activación de compartir PASS; permisos owner/guest sin cambios.

Micrófono: el propietario informa solicitud iPhone. No reproducida ni atribuida todavía. No hay llamadas getUserMedia, reconocimiento o captura en los 23 módulos web; Permissions-Policy microphone=() ya estaba configurada. No afirmar causa ni resolución del permiso sin capturar el aviso. No cambia la maestra. Pendientes acceso propietario del Preview, motivo exacto de error servidor y comprobación física del aviso.

## LAB MANUAL 04 · retiro de ubicación y clima por orden del propietario

Se retiran currentBrowserCoordinates y las funciones de carga, temporizadores y representación de clima en index-grupal.html; se eliminan ambos bloques visibles de registro y tarjeta. Permissions-Policy incorpora geolocation=() además de microphone=(). Identidad y worker LAB-MANUAL-NO-GPS-20260919. Se mantienen campo, yardas, par, rating, slope, fuentes y logo. No se alteran datos históricos ni la maestra.

Pruebas manuales técnicas PASS; regresión amplía bloqueo a GPS y llamadas weather en módulos cargados. La comprobación visual autenticada del Preview y la configuración DATABASE_URL de invitaciones permanecen pendientes; retirar clima no resuelve almacenamiento.


## 2026-09-20 · Detalle operativo y físico
### Categorías
- Precarga obligatoria en toda opción de categoría: `championship=CAMPEONATO`, `a=A`, `b=B`, `c=C`, `d=D`, `senior=SENIOR`, `super_senior=SUPER SENIOR`, `female=FEMENINA`.
- Marcas por defecto: CAMPEONATO→Negro/NEGRAS; A→Azul/AZULES; B/C/D/SENIOR→Blanco/BLANCAS; SUPER SENIOR→Amarillo/AMARILLAS; FEMENINA→Rojo/ROJAS.
- Archivos operativos verificados: `index-grupal.html`, `stableford.js`, `stableford-torneo.html`, `live-hub.html`, `live-hub.js`, `live-view.js`, `card-artifacts.js`, `shortcuts-ui.js`.

### ATAJOS
- `shortcuts-ui.js` mantiene MI SCORE CARD, CENTRO DE TORNEOS, GENERAL, CATEGORÍAS, BUSCAR JUGADOR, MIS FAVORITOS y gestión.
- Texto de CATEGORÍAS actualizado a CAMPEONATO · A · B · C · D · SENIOR · SUPER SENIOR · FEMENINA.
- Auditor físico valida que ATAJOS permanezca visible y no intersecte controles críticos de Tarjeta Final, Corrección Oficial e Historial.

### Manual
- `manual.html` y `GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md` sincronizados con categorías completas.
- Monitor de Tiempo vigente documentado con captura física real: INICIO · FINAL · TIMER · RESET.
- Manual físico vigente: 74 hojas; gate y auditor Chromium deben conservar ese conteo y cargar todas las imágenes sin desbordes horizontales.

### Traslapes
- `mandatoryUpdate` se oculta durante overlays visibles para evitar invasión de títulos, filtros y controles.
- La revisión física no se considera cerrada sólo por tests de código: cada pantalla crítica requiere captura renderizada y revisión visual.

- Auditor físico Chromium oficial: `.github/workflows/full-app-manual-physical-parity.yml` valida modalidades, categorías, Tarjeta Final, Corrección, Historial, Torneos, ATAJOS, 74 hojas del Manual y ausencia de desbordes/traslapes críticos.

- Gate multiarchivo 2026-09-20: ambos roadmaps registran conjuntamente `.github/workflows/full-app-manual-physical-parity.yml` y la certificación física de no traslape.

- V304 LAB 2026-09-20: gate actualizado para la interfaz Stableford vigente de ocho categorías y navegación; no se restauran controles de voz retirados.

- V304 manual vigente 2026-09-20: se eliminan del gate los ejemplos de dictado/micrófono retirados en LAB; se valida Registro General manual y Stableford de ocho categorías.

- V305 LAB 2026-09-20: gate reemplazado para validar Registro Manual visible, ocho categorías Stableford y navegación; se retiran expectativas históricas de parser/guía de voz.

- V305 LAB R2 2026-09-20: gate reducido a contratos visibles actuales; se eliminan dependencias de nombres internos de funciones de validación.

- V357 LAB 2026-09-20: gate heredado de transporte de voz sustituido por contrato de retiro; `api/voice-health.js` no se restaura, microphone/geolocation permanecen bloqueados y el flujo manual es obligatorio.

- Categorías físicas R3 2026-09-20: la lámina `APP_CATEGORIAS_OFICIALES.png` reserva 68 px exclusivos para el riel ATAJOS; ninguna tarjeta de categoría puede quedar invadida.

- ATAJOS HEADER 2026-09-20: se elimina el riel lateral flotante y cualquier reserva de ancho; ATAJOS pasa al bloque superior `round-meta`, sustituyendo RONDA EN CURSO/fecha/hora. Score Card y bloques recuperan ancho completo. Se actualizan gates `test-lab-shortcuts-navigation.mjs` y `test-lab-global-operational-audit.mjs` para este contrato visual. LIVE permanece pendiente de validación end-to-end.

- MENÚ / ANOTADOR 2026-09-20: cambio global visual en LAB. ATAJOS pasa a MENÚ en app, Torneos y Manual; botón MENÚ sin logo, fondo verde neón, texto negro grande y centrado. En Score Card se elimina la franja “TARJETA DE PUNTUACIÓN / DESLIZA…”. El bloque “CONTROL MANUAL …” pasa a “ANOTADOR”; se retira la línea “INGRESO OFICIAL …” y los encabezados blancos JUGADOR/HOYO/GROSS/IN/OUT/TOTAL del anotador, conservando los controles y cálculos. Archivos: index-grupal.html, shortcuts-ui.js, live-hub.html, manual.html, GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md, test-lab-shortcuts-navigation.mjs y test-lab-global-operational-audit.mjs. Pendiente regeneración de capturas físicas del Manual tras publicación.

- MENÚ assets parity 2026-09-21: el texto visible cambia a MENÚ, pero se conservan los nombres físicos existentes de capturas `*_ATAJOS*` para no romper referencias del Manual. `scripts/manual-screen-parity-gate.mjs` se actualiza para validar MENÚ visible sin exigir renombrar archivos físicos.

- MANUAL REMAQUETADO / PANTALLAS REALES / GRIS / MENÚ 2026-09-21: manual físico de 74 hojas unificado bajo plantilla maestra móvil; safe-area y navegación global ATRÁS · INICIO · MI RONDA · ÍNDICE; funciones operativas documentadas con pantallas reales vigentes (Acceso, Setup, Registro, Categorías, Score Card, Stableford, Match Play, Four Ball, Práctica, Skins, Universales, Timer, zona operativa, Tarjeta Final, Corrección, Historial y Torneos); las láminas didácticas no operativas conservadas se reprocesan con acentos grises, reservando el verde para pantallas reales de la app. Manual visible sincronizado con MENÚ y ANOTADOR; archivos históricos cuyo nombre técnico contiene ATAJOS se conservan sólo como identificadores de asset.

- MATCH PLAY TEST SYNC 2026-09-21: `test-v306-match-play.mjs` deja de exigir el texto retirado “CORRECCIÓN HASTA HOYO” y valida el acceso vigente `CORREGIR RONDA`; no cambia motor, scoring ni cierre de Match Play.

- ANOTADOR Match Play 2026-09-21: `test-v306-match-play.mjs` deja de exigir la línea auxiliar “CORRECCIÓN HASTA HOYO” retirada por diseño y valida el encabezado vigente ANOTADOR. La corrección oficial permanece accesible por su control dedicado; no se altera el motor Match Play.

- ANOTADOR TEST SYNC 2026-09-21: `test-v309-four-ball.mjs` valida la etiqueta visible vigente `ANOTADOR` en lugar de CONTROL MANUAL; no cambia motor Four Ball, scoring, TEAMS ni exportación.

- ANOTADOR TITLE SYNC 2026-09-21: `test-v309-four-ball.mjs` valida el título visible exacto `ANOTADOR` sin sufijo de modalidad; no cambia motor Four Ball ni UI.

- MENÚ TEXT-ONLY TEST SYNC 2026-09-21: `test-lab-shortcuts-navigation.mjs` valida botón MENÚ sin logo, texto MENÚ grande/centrado y visible; no cambia navegación ni acciones del menú.

- ASSET TÉCNICO MENÚ SYNC 2026-09-21: `test-lab-global-operational-audit.mjs` conserva los nombres físicos históricos `REGISTRO_ATAJOS_REAL.webp` y `FOURBALL_ATAJOS_REAL.webp` como identificadores de archivo; la interfaz visible sigue usando MENÚ. No cambia UI, navegación ni contenido visible.

- MENÚ TORNEOS PHYSICAL FIX 2026-09-21: `shortcuts-ui.js` monta MENÚ dentro del encabezado real de `live-hub.html`; el header reserva una cuarta columna en escritorio y una segunda fila en móvil para evitar ocultamiento/traslape. MENÚ se oculta sólo en Pantalla Pública. No cambia navegación ni destinos del menú.

- AUDITOR TORNEOS MENÚ 2026-09-21: el render físico sale explícitamente de Pantalla Pública antes de validar Torneos, para no confundir la ocultación intencional de controles en modo público con un fallo de navegación. La auditoría valida MENÚ visible/abrible en modo normal; no cambia comportamiento de Pantalla Pública.

- AUDITOR SCORE CARD MENÚ 2026-09-21: el render físico crea primero una ronda General válida y cierra Setup antes de validar MENÚ en `round-meta`; evita falsos fallos causados por el `main` oculto durante configuración inicial. No cambia comportamiento de la app.

- HEADER MENÚ compacto 2026-09-21: se restaura el protagonismo/tamaño visual del logo principal en móvil y MENÚ se reduce a pill redondeado aproximadamente a la mitad del tamaño anterior (verde neón, texto negro, sin logo). No cambia navegación ni scoring. Se prepara nueva identidad de release para que ACTUALIZAR detecte esta corrección.
- LAB manual/UI 2026-09-21: remaquetación final del manual con pantallas reales por función, gráficas didácticas en gris, navegación global ATRÁS/INICIO/MI RONDA/ÍNDICE; Stableford recupera identidad visible y MENÚ se oculta en Tarjeta Final, Corrección e Historial para evitar traslapes.
- LAB cierre conjunto 2026-09-21: ROADMAPS sincronizados en un mismo commit para la remaquetación final, pantallas reales por operación, gráficas didácticas grises, navegación global y correcciones físicas de Stableford/MENÚ.\n- LAB audit 2026-09-21: el render físico espera explícitamente la carga de imágenes lazy antes de medir cada hoja, evitando falsos FAIL de activos reales como APP_SETUP_CURRENT.png.\n
- LAB audit 2026-09-21 R2: corregida la sintaxis del wait de imágenes lazy del auditor físico; ahora usa saltos reales y espera load/error antes de medir cada hoja.
- LAB cierre QA atómico 2026-09-21: ambos ROADMAPS actualizados juntos para validar el estado final del manual remaquetado, pantallas reales por operación, gráficas didácticas grises y navegación global ATRÁS/INICIO/MI RONDA/ÍNDICE.

- ANOTADOR · HOYO ACTUAL 2026-09-21: en móvil se amplía únicamente el dígito del selector de hoyo actual a 48 px (4× el tamaño previo de 12 px). El rótulo HOYO, ANTERIOR y SIGUIENTE conservan su tamaño actual; el selector gana altura sólo para evitar recorte del dígito.

- ANOTADOR · SELECTOR COMPACTO 2026-09-21: se corrige la versión 4× que ocultó el dígito en iPhone. El selector central vuelve a la misma altura visual que ANTERIOR/SIGUIENTE (54 px), elimina las flechas nativas mediante appearance:none, fuerza el dígito visible en blanco a 30 px y reduce el espacio entre ANOTADOR y la fila de controles a 2 px. El rótulo HOYO conserva su tamaño.

- REFINO VISUAL 2026-09-21: el dígito del hoyo actual en ANOTADOR conserva su tamaño pero reduce grosor de 900 a 400. INFORMACIÓN DEL CAMPO alinea profesionalmente YARDAS / COURSE RATING / SLOPE RATING con filas homogéneas; la primera columna usa ancho fijo suficiente para 6,994 y el punto de tee, eliminando el desfase visual de la fila negra.

- YARDAS NEGRAS ALINEADAS 2026-09-21: la fila Negro/6,994 deja de usar markup inline distinto. Todas las filas de YARDAS comparten ahora la misma estructura `tee-yardage-row` y `tee-yardage-value`, con idéntico ancho, alto, baseline y centrado. La fila negra conserva fondo blanco/texto negro sin desplazamiento respecto de Azul/Blanco/Rojo/Amarillo.


- MANUAL INTERACTIVO TOTAL 2026-09-21: `manual.html`, `manual-torneos.html` e `index-grupal.html` incorporan navegación operativa directa desde el Manual hacia las funciones reales de la app. Las 74 hojas del Manual reciben destino operativo; las capturas del Manual general se convierten en superficies tocables y el capítulo Torneos convierte sus controles ilustrados en accesos directos a MIS TORNEOS, GENERAL, CATEGORÍAS, BUSCAR JUGADOR, FAVORITOS y demás rutas vigentes. `index-grupal.html` añade el router `manual_action` para abrir Registro, Stableford, Score Card, Control Manual, Timer, Tarjeta Final, Historial, Estadísticas, Cuenta, Reglas, Instalación, Corrección y MENÚ sin duplicar lógica. Objetivo de QA pendiente: sustitución progresiva de click de imagen completa por hotspots geométricos exactos dentro de cada captura donde exista más de una opción visible, y certificación física final en iPhone/LAB/Producción.

- MANUAL COVER GATE SYNC 2026-09-21: `test-lab-global-operational-audit.mjs` deja de exigir la portada histórica `/docs/manual/layout/page-00.png` y valida el logo oficial cuadrado vigente `/assets/official-logos/golf-score-card-gt-official-master-1254.jpeg`, ya adoptado por `manual.html`. No altera pantallas internas de la app; sólo sincroniza el gate con la portada autorizada del Manual.

- MANUAL HOTSPOTS REALES FASE 1 2026-09-21: se eliminan los botones externos de “MODO INTERACTIVO” del Manual general y se inicia la conversión correcta: zonas transparentes directamente sobre los controles visibles de las gráficas. Primera cobertura aplicada a `APP_SETUP_CURRENT.png`, `APP_SCORECARD_ATAJOS.png`, `APP_ATAJOS_OVERLAY.png` y `APP_TORNEOS_HUB.png`, con rutas reales hacia Registro, Score Card, Anotador, MENÚ, Mis Torneos, General, Categorías, Buscar Jugador, Favoritos, Historial y Cuenta. Archivo principal: `manual.html`. Pendiente: extender la misma geometría a todos los demás assets y validar físicamente cada hotspot.

- MANUAL HOTSPOTS REALES FASE 2 2026-09-21: `manual.html` extiende hotspots transparentes directamente sobre todas las gráficas operativas actuales: Stableford, Match Play, Four Ball, Práctica, Skins, Universales, Tarjeta Final, Corrección, Historial, Acceso/Cuenta, Categorías, Campeonato, Torneos, Timer, zona operativa inferior y las cuatro capturas reales LAB. La capa interactiva se alinea dinámicamente al rectángulo renderizado exacto de cada imagen mediante medición y ResizeObserver para evitar desplazamientos por padding/object-fit. Pendiente únicamente certificación física automatizada de cada hotspot y destino.

- ÍNDICE USUARIO FINAL 2026-09-21: `manual.html` elimina del índice visible los bloques internos “PANTALLAS ACTUALES · EVIDENCIA FÍSICA” y “PANTALLAS REALES ACTUALES · LAB”, además del listado técnico duplicado de diez entradas de Torneos. El usuario final conserva un único acceso claro “Torneos · guía interactiva completa”. Las hojas internas y evidencias siguen existiendo para QA y navegación contextual, pero dejan de ocupar espacio en el índice del usuario.

- AUDIO DE RESULTADOS PARCIAL 2026-09-22: FRONT 1–9, BACK 10–18 y TOTAL 1–18 pueden anunciar resultados durante la ronda usando el último hoyo completamente registrado. Ejemplos aprobados: «Hasta el hoyo cinco» para FRONT cuando van por el 5 y «Hasta el hoyo trece» para BACK cuando van por el 13, seguido por Gross, Neto y relación contra par de cada jugador. Al completar 9/18 se conservan los cierres «Primera vuelta», «Segunda vuelta» y «Ronda completa». Cambio funcional en `index-grupal.html`; sin alterar scores ni cálculos oficiales.

- AUDIO PARCIAL R2 2026-09-22: despliegue atómico de `index-grupal.html` + ambos ROADMAPS para que FRONT/BACK/TOTAL anuncien «Hasta el hoyo N» cuando la vuelta aún no está completa. Corrige la publicación fallida anterior; no cambia cálculos de score.

- AUDIO R3 · PRONUNCIACIÓN GROS 2026-09-22: el texto hablado de resultados usa `Gros` en lugar de `Gross` para evitar que la voz local del iPhone lo pronuncie «grous». Los rótulos visuales GROSS de la tarjeta no cambian. Se mantiene «Hasta el hoyo N» para resultados parciales.

- AUDIO R4 · RESULTADO INDIVIDUAL POR NOMBRE 2026-09-22: cuando hay varios jugadores, tocar directamente el nombre de un jugador en la Score Card reproduce únicamente sus resultados acumulados hasta su último hoyo consecutivo registrado. La locución usa «Hasta el hoyo N» durante la ronda, «Primera vuelta» al completar 9 y «Ronda completa» al completar 18. No reproduce resultados de los demás jugadores. Se mantiene pronunciación hablada «Gros» y la tarjeta visual conserva GROSS.

- BUILD GATE HOTFIX 2026-09-22: `test-v304-homogeneous-registration-actions.mjs` se sincroniza con la UI vigente: Registro general conserva `REVISAR DATOS` y Stableford conserva `OK`. El gate anterior exigía erróneamente `OK` para ambos y bloqueaba Vercel. No se cambia la pantalla ni la lógica del usuario; sólo se corrige la prueba obsoleta para permitir publicar AUDIO R4.

- BUILD GATE HOTFIX R2 2026-09-22: el contrato V304 se sincroniza completamente con los textos vigentes: `REVISAR DATOS`, `INICIAR RONDA`, `VER RONDA ANTERIOR` y `VER RONDAS GUARDADAS`. Evita que validaciones históricas bloqueen el despliegue de AUDIO R4. No cambia interfaz ni lógica de usuario.

- BUILD GATE HOTFIX R3 2026-09-22: V305 se sincroniza con la UI vigente de historial: botones `VER RONDAS GUARDADAS` y título `MIS RONDAS GUARDADAS`. El gate histórico exigía `HISTORIAL`/`HISTORIAL DE TARJETAS` y bloqueaba Vercel. No se altera ninguna pantalla ni dato del usuario.

- BUILD GATE HOTFIX R4 2026-09-22: V305 actualiza el contrato de cuenta al flujo vigente `RESPALDAR / RECUPERAR DATOS` y estado `CUENTA DE RESPALDO CONECTADA ✓`; elimina la expectativa histórica `REGÍSTRATE`. No modifica interfaz ni credenciales; únicamente alinea la prueba con la app vigente para desbloquear publicación.

- BUILD GATE HOTFIX R5 2026-09-22: `test-v305-registration-guides-parser-truth.mjs` actualiza controles Stableford a `INICIAR RONDA`, `VER RONDA ANTERIOR` y `VER RONDAS GUARDADAS`. Corrige únicamente el gate histórico; la interfaz vigente permanece intacta.

- RELEASE OFFLINE SYNC 2026-09-22: `service-worker.js` alinea `RELEASE` y `ACTIVE_CACHE_NAME` con `PLAYER-NAME-RESULT-AUDIO-20260922-R4`, permitiendo que la PWA instalada detecte/promueva la misma versión que `index-grupal.html`. Sin cambios funcionales adicionales.

- ANOTADOR R5 · TECLADO NUMÉRICO + AUTO SIGUIENTE 2026-09-22: las casillas GROSS del ANOTADOR y de la Score Card dejan de depender del teclado/prompt nativo del iPhone y abren un teclado propio 1–9, 0, X, borrar y OK. Al confirmar un score se guarda únicamente ese jugador y se abre automáticamente el siguiente jugador del mismo hoyo. Scores de dos dígitos se ingresan antes de pulsar OK. El motor oficial de Gross/Neto/HCP no cambia.

- RELEASE R5 · SERVICE WORKER SYNC 2026-09-22: Service Worker y página quedan sincronizados en `MANUAL-SCORE-KEYPAD-AUTO-NEXT-20260922-R5`, forzando una nueva identidad de caché para que iPhone/PWA reciba el teclado numérico propio y el avance automático al siguiente jugador sin mezclar recursos R4.

- TEST R5 · STABLEFORD MANUAL KEYPAD 2026-09-22: `test-stableford-manual.mjs` deja de exigir el `window.prompt` retirado y valida el teclado propio `openRoundScoreKeypad`, las teclas de score y `OK · SIGUIENTE`. Mantiene la exigencia de cálculo/persistencia/cierre por el motor oficial.

- ANOTADOR R6 · CONFIRMACIÓN HABLADA DE CADA SCORE 2026-09-22: al confirmar un score desde el teclado propio, la app anuncia inmediatamente `Hoyo N. Jugador. Gros X.` y abre el siguiente jugador del mismo hoyo. La locución individual por nombre y los audios FRONT/BACK/TOTAL permanecen independientes. Página y Service Worker se sincronizan en R6 para evitar caché R5.

- ANOTADOR R5 · TECLADO Y DICTADO DE SCORES 2026-09-22: las casillas GROSS del ANOTADOR dejan de ser inputs readonly y pasan a botones, eliminando por construcción el teclado QWERTY de iOS. Tocar una casilla abre exclusivamente el keypad numérico interno. Se añade `🎙 DICTAR` dentro del keypad para un jugador/hoyo y `🎙 DICTAR SCORES` en el ANOTADOR para frases grupales como «Jaime cuatro, Jessie cinco, Becky seis». El dictado usa únicamente SpeechRecognition/webkitSpeechRecognition del navegador y alimenta el parser local existente; no reactiva asistentes, endpoints de voz ni IA remota. El audio individual al tocar el nombre del jugador se conserva.

- GATE DICTADO LOCAL R5 2026-09-22: `test-manual-no-assistant.mjs` se actualiza para mantener bloqueados asistentes, endpoints remotos y micrófonos retirados, permitiendo únicamente `SpeechRecognition/webkitSpeechRecognition` para el nuevo dictado local de scores del ANOTADOR. Esta prueba verifica además que `startRoundScoreDictation` permanezca presente. Relacionado con `index-grupal.html` y `service-worker.js` release `SCORE-KEYPAD-DICTATION-20260922-R5`.

- BUILD LAB R5 · DICTADO LOCAL 2026-09-22: `scripts/build-manual-lab.mjs` mantiene bloqueados `getUserMedia`, `MediaRecorder` y endpoints retirados de voz/IA, pero permite explícitamente `SpeechRecognition/webkitSpeechRecognition` únicamente para `startRoundScoreDictation`. El build exige que el dictado local de scores exista y evita reactivar asistentes o transporte remoto.

- GATE R5 · `test-manual-no-assistant.mjs` 2026-09-22: se actualiza esta prueba para permitir exclusivamente `SpeechRecognition/webkitSpeechRecognition` usado por el dictado local de scores del ANOTADOR, manteniendo bloqueados micrófono/asistente/IA y endpoints retirados. Valida además `startRoundScoreDictation`. Este cambio acompaña `index-grupal.html` y `service-worker.js` en la release `SCORE-KEYPAD-DICTATION-20260922-R5`.

- ANOTADOR R6 · KEYPAD COMPACTO 2026-09-22: el popup de score se reduce aproximadamente 45–60% respecto de R5: ancho máximo 320px/88vw, altura visual objetivo ≤42vh, teclas de 38px, display de 38px, acciones de 40px, menos padding/gaps y overlay a 24% de opacidad. Antes de abrir, la fila/casilla activa se centra con `scrollIntoView` para permanecer visible por encima del panel. Se conservan `🎙 DICTAR`, `OK · SIGUIENTE`, dictado grupal, autoavance y motor de score sin cambios.

- FINAL R8 · ANOTADOR 1–9 + AUDIO 2026-09-22: la pantalla conserva exactamente su estructura; las nueve posiciones de los tres totales parciales a la derecha del ANOTADOR se reemplazan por teclas fijas 1–9 (3×3). Tocar un número registra inmediatamente el score del jugador seleccionado y mueve la selección visual (borde verde fuerte) a la casilla GROSS del siguiente jugador, sin botón SIGUIENTE ni popup. Tocar el nombre de un jugador usa su `player.id` real y lee sólo sus resultados registrados. FRONT/BACK/TOTAL construyen explícitamente una línea para todos los jugadores con score disponible hasta el último hoyo registrado. No se alteran cálculos, tarjeta inferior ni demás elementos de pantalla.

- FINAL R8 HOTFIX 2026-09-22: se elimina la cadena heredada `OK · SIGUIENTE` del antiguo popup no utilizado. El flujo vigente permanece: teclado fijo 1–9 en las nueve posiciones derechas, guardado inmediato y selección automática de la siguiente casilla GROSS. Sin cambios visuales adicionales.

- FINAL R10 · AUDIO INDIVIDUAL POR NOMBRE 2026-09-22: se corrige exclusivamente el toque sobre el nombre del jugador. El listener pasa a delegación global en fase capture sobre `#scorecard .player-name[data-audio-player="1"]`, por lo que sigue funcionando después de cualquier re-render y aunque otros controles detengan propagación. La resolución usa primero `data-player-id` real y fallback por slot visual. Tocar un nombre reproduce sólo el acumulado de ese jugador. FRONT/BACK/TOTAL no se modifican.

- FINAL R9 · FLUJO DE SELECCIÓN DE SCORE 2026-09-22: el ANOTADOR inicia sin ninguna casilla GROSS seleccionada. El usuario debe tocar manualmente la primera casilla a utilizar; esa casilla se marca con borde/resplandor verde. Al tocar 1–9 se registra el score y la selección verde pasa automáticamente a la casilla GROSS del siguiente jugador del mismo hoyo. Al registrar el último jugador, se limpia por completo la selección y la pantalla vuelve al estado normal. Cambiar de hoyo también limpia la selección. No se mueve ni rediseña ningún otro elemento.

- FINAL R10 · VERDE ACTIVO + CAPTURA SILENCIOSA + AUDIO INDIVIDUAL 2026-09-22: la primera casilla no se activa sola; el usuario toca una casilla GROSS para iniciar. La casilla activa se pinta fondo verde neón con texto negro. Tras registrar 1–9, el estado activo se conserva a través del render y se reaplica a la siguiente casilla GROSS; al último jugador se limpia por completo. La captura manual queda 100% silenciosa, incluyendo cierres automáticos de vuelta. El audio sólo se reproduce por acción explícita: tocar el nombre usa `player.id` y lee exclusivamente a ese jugador; FRONT/BACK/TOTAL siguen siendo controles separados de resumen.

- TEST R10 · CAPTURA SILENCIOSA 2026-09-22: `test-stableford-manual.mjs` se actualiza para exigir que el ingreso manual de scores NO invoque `speakClosure` automáticamente. El audio queda reservado a tocar nombre de jugador o FRONT/BACK/TOTAL. Valida el comportamiento aprobado de R10 sin cambiar cálculos ni persistencia.

- R11 2026-09-22 · ANOTADOR SIN MICRÓFONO: se retira completamente `DICTAR SCORES` y el transporte SpeechRecognition del ANOTADOR. El ingreso manual es silencioso. No existe selección inicial automática: el usuario toca primero cualquier casilla GROSS y esa casilla se resalta en verde fuerte. Después de anotar, la selección verde avanza al siguiente jugador; al terminar el último jugador se elimina la selección y la tarjeta vuelve a estado normal. En cualquier momento el usuario puede tocar manualmente otra casilla GROSS para mover la selección. Tocar el nombre de un jugador reproduce sólo el acumulado de ese jugador, priorizando `player.id` real y con fallback por nombre visible/slot.

- R11 GATE HOTFIX 2026-09-22: `test-manual-no-assistant.mjs` se alinea con la orden vigente de retirar completamente micrófono y `DICTAR SCORES`. Ahora exige ausencia de `startRoundScoreDictation`, `DICTAR SCORES` y `SpeechRecognition/webkitSpeechRecognition`, manteniendo únicamente audio local de resultados por nombre y FRONT/BACK/TOTAL.

- R11 BUILD HOTFIX 2026-09-22: `scripts/build-manual-lab.mjs` deja de exigir dictado local y ahora valida la orden vigente: ausencia de `startRoundScoreDictation`, `DICTAR SCORES` y `SpeechRecognition/webkitSpeechRecognition` en el ANOTADOR. Se conserva audio de resultados mediante `device-closures.js`.

- R12 2026-09-22 · LIMPIEZA FINAL MICRÓFONO: se elimina la última referencia residual `roundScoreKeypadDictate/startRoundScoreDictation` del popup heredado y se renueva release/cache. El ANOTADOR queda exclusivamente manual 1–9, silencioso, con selección verde y audio sólo por nombre/FRONT/BACK/TOTAL.

- FINAL R13 · VERDE + AUDIO INDIVIDUAL 2026-09-22: el ingreso de score queda totalmente silencioso. La primera casilla sólo se activa al tocarla manualmente; la casilla GROSS activa recibe borde/fondo/resplandor verde explícito por estilo inline y clase. Antes de guardar se persiste el ID del siguiente jugador, de modo que el render conserve y mueva el verde automáticamente; después del último jugador se limpia toda selección. Al tocar un nombre en la tarjeta se resuelve por data-player-id/slot visual y se reproduce únicamente el acumulado de ese jugador. Micrófono y DICTAR SCORES permanecen retirados.

- FINAL R14 · CASILLA VERDE COMPLETA + 4/6 JUGADORES + AUDIO DIRECTO 2026-09-22: la casilla GROSS activa se renderiza con fondo completo verde neón y texto negro aun estando vacía. El avance manual usa todos los jugadores visibles de la ronda (respetando sólo cierre de Match), no el filtro activeFrom, por lo que continúa del 3.º al 4.º, 5.º y 6.º jugador. Al último jugador se limpia la selección. Los nombres de la Score Card reciben un handler directo por player.id; tocar un nombre reproduce sólo su acumulado. La entrada de scores permanece silenciosa y no existe DICTAR SCORES.


- FINAL R18 · DOBLE TOQUE NOMBRE + AUDIO ACUMULADO 2026-09-22: se corrige el acceso al audio individual del jugador. Un toque sobre el nombre no reproduce audio; dos toques consecutivos sobre el mismo nombre activan un único handler delegado y leen exclusivamente el acumulado de ese jugador (Gross, Neto y resultado contra par) hasta su último hoyo registrado. Se elimina el handler inline duplicado que podía interferir con el evento. La entrada de scores permanece silenciosa; FRONT/BACK/TOTAL no cambian. Archivo operativo modificado: index-grupal.html.


- R19 BUILD/GATE SYNC 2026-09-22: sincronización conjunta obligatoria de ROADMAP_OVERALL.md, ROADMAP_A_DETALLE.md e index-grupal.html para publicar la corrección de doble toque del nombre y audio acumulado individual sin alterar cálculos, tarjeta ni captura silenciosa.


- R20 BUILD FIX 2026-09-22: service-worker.js se sincroniza exactamente con el gscg-release vigente de index-grupal.html. Corrige el gate técnico que exige igualdad página/worker; no modifica la función aprobada de doble toque ni cálculos. Archivos del cambio: service-worker.js.


- R21 IPHONE DOUBLE TAP AUDIO 2026-09-22: el doble toque sobre nombre usa pointerup y player.id estable, con ventana táctil de 900 ms; evita depender de la misma instancia DOM de la celda y llama directamente GSCPlayerNameAudio. Un toque sigue silencioso. Se sincronizan index-grupal.html y service-worker.js. Función de scores/cálculos intacta.


- R22 DBLCLICK NATIVO AUDIO 2026-09-22: tras evidencia física NO AUDIO en iPhone con detector pointerup manual, se reemplaza por el evento nativo dblclick sobre la celda del nombre. El doble toque/clic llama directamente GSCPlayerNameAudio(player.id); un toque no habla. No cambia cálculo, score ni tarjeta. index-grupal.html y service-worker.js sincronizados.


- R23 IPHONE TOUCHEND + CONFIRMACIÓN VISUAL 2026-09-22: se reemplaza dblclick por touchend no pasivo, específico para interacción táctil real en iPhone. El segundo toque sobre el mismo player.id dentro de 1000 ms ilumina temporalmente la celda del nombre en verde y muestra estado DOBLE TOQUE DETECTADO antes de llamar GSCPlayerNameAudio. Un toque permanece silencioso. No cambia cálculo, score ni tarjeta. index-grupal.html y service-worker.js sincronizados.


- R24 FULL-CELL INVISIBLE HIT ZONE 2026-09-22: cada celda de nombre incorpora un botón transparente absoluto que cubre el 100% de la casilla y conserva un player.id individual. El doble toque sobre cualquier punto de la casilla acciona el audio acumulado de ese jugador; al detectarlo, la celda parpadea verde y muestra estado antes de reproducir. Un toque no habla. Se mantiene cálculo, score y tarjeta sin cambios. index-grupal.html y service-worker.js sincronizados.


- R25 BUTTON CLICK DOUBLE TAP 2026-09-22: se elimina dependencia de touchend/dblclick. El botón transparente que cubre el 100% de cada celda usa click nativo del botón: primer toque confirma recepción con flash amarillo y mensaje; segundo toque del mismo player.id dentro de 1000 ms confirma verde y ejecuta GSCPlayerNameAudio. Un toque no reproduce audio. Cálculos y tarjeta intactos. index-grupal.html y service-worker.js sincronizados.


- R26 PWA CACHE RELEASE FIX 2026-09-22: se elimina el APPROVED_CACHE_NAME fijo heredado que podía seguir sirviendo una versión anterior en iPhone aun con Vercel READY. El caché aprobado ahora es exclusivo de R26, por lo que en activate/ensureApprovedShell se llena desde el candidato R26 y las navegaciones principales dejan de quedar congeladas en una versión vieja. También se corrige el app_version hardcodeado del fallback de actualización. Función de botón invisible y audio R25 se conserva sin cambios funcionales.


- R27 DIRECT TD CLICK AUDIO 2026-09-22: se elimina por completo el botón invisible y cualquier dependencia de touchend/dblclick/overlay. La propia celda TD.player-name es el control táctil. Primer click/tap del mismo player.id produce flash amarillo y mensaje; segundo click/tap dentro de 1000 ms produce flash verde y llama directamente GSCPlayerNameAudio. Cálculos, score y tarjeta permanecen intactos. index-grupal.html y service-worker.js sincronizados.


- DIAGNÓSTICO AISLADO AUDIO IPHONE 2026-09-22: se agrega audio-touch-test.html, una página mínima sin Score Card ni service worker lógico de la app, para separar recepción de click y síntesis local del iPhone. Primer toque amarillo; segundo toque dentro de 1 s verde y reproducción local. No modifica ninguna función existente.


- DIAGNÓSTICO PÚBLICO AUDIO IPHONE 2026-09-22: middleware.js permite exclusivamente /audio-touch-test.html como ruta pública para validar gesto y voz local sin autenticación. No abre Score Card ni APIs privadas; sólo habilita la página mínima de diagnóstico.


- R28 MECANISMO FÍSICAMENTE APROBADO TRASLADADO A SCORE CARD 2026-09-22: se traslada literalmente el patrón aprobado en audio-touch-test.html al nombre de cada jugador. Cada nombre pasa a ser un botón HTML real dentro de su TD; primer toque amarillo, segundo toque verde dentro de 1 s y síntesis local directa con window.speechSynthesis/SpeechSynthesisUtterance, priorizando voz local en español. FRONT/BACK/TOTAL permanecen intactos y no se modifican cálculos, scores ni tarjeta.


- R29 CAUSA RAÍZ POINTER EVENTS 2026-09-22: se identifica la causa exacta de la falta total de reacción táctil: una regla global existente `.scorecard,.summary{pointer-events:none!important}` bloqueaba todos los eventos dentro de la Score Card, incluidos nombres y botones de audio. Se conserva el bloqueo general de la tarjeta y se habilita `pointer-events:auto!important` exclusivamente para `.player-name[data-audio-player="1"]` y `.player-audio-button`. Se mantiene sin cambios el mecanismo físicamente aprobado: primer toque amarillo, segundo verde + voz local. Cálculos, scores y demás celdas permanecen bloqueados e intactos.


- R30 MANUAL + AUDIO POR VUELTA + TECLADO HOLE IN ONE 2026-09-22: el audio individual por doble toque queda segmentado por vuelta. En hoyos 1–9 lee sólo IN hasta el hoyo actual; en hoyos 10–18 lee sólo OUT desde el hoyo 10 hasta el hoyo actual, sin volver a sumar 1–9. FRONT/BACK/TOTAL conservan sus resúmenes completos. manual.html explica amarillo→verde→voz, diferencia entre audio individual y botones FRONT/BACK/TOTAL, e incorpora nueva ilustración APP_ANOTADOR_TECLADO_NUMERICO_R30.svg. El teclado 1–9 queda explicitado y protegido para que 1 siempre exista por Hole in One.


- R31 AUDIO SEGMENTO ACTUAL + TOTAL SEGÚN ORDEN REAL 2026-09-22: el doble toque individual usa la cronología real de scores mediante updatedAt, por lo que funciona si la ronda comienza por hoyo 1 o por hoyo 10. En la primera vuelta jugada lee sólo esa vuelta hasta el hoyo actual. En la segunda vuelta jugada lee dos bloques: vuelta actual parcial y acumulado total de toda la ronda hasta ese punto. Ejemplo salida por 10 y luego hoyo 4: primero 1–4; después total 10–18 + 1–4. Archivos modificados: index-grupal.html, manual.html, service-worker.js.


- R32 SYNTAX FIX TECLADO 2026-09-22: se corrigen caracteres literales \\n introducidos accidentalmente en index-grupal.html al proteger las teclas 1–9. Se sustituyen por saltos de línea JavaScript reales. No cambia la lógica de audio R31, el teclado 1–9, el manual ni los cálculos. Archivo modificado: index-grupal.html.


- R33 MANUAL PARITY TOKENS 2026-09-22: manual.html restaura exactamente los rótulos contractuales FRONT · 1 - 9, BACK · 10 - 18 y TOTAL · 1 - 18 exigidos por scripts/manual-screen-parity-gate.mjs, conservando íntegra la explicación nueva de audio por doble toque y la pantalla del teclado numérico con 1 para Hole in One. Archivo modificado: manual.html.


- R34 TECLADO 1-9 CONTRACT FIX 2026-09-22: index-grupal.html mantiene el número 1 obligatorio para Hole in One y estructura el teclado manual en tres filas explícitas [1,2,3], [4,5,6], [7,8,9], satisfaciendo test-stableford-manual.mjs sin modificar lógica de audio, scores ni cálculos. Archivo modificado: index-grupal.html.


- R35 AUDIO MÁS DIRECTO 2026-09-22: index-grupal.html elimina de la lectura individual las frases “primera vuelta”, “segunda vuelta” y “vuelta actual”. El primer bloque dice únicamente “Hasta el hoyo N” y conserva la métrica del segmento actual; en hoyos 10–18 calcula sólo 10→N. Si ya se está jugando la segunda mitad cronológica de la ronda, agrega “Acumulado total hasta el hoyo N” con todos los hoyos jugados. Archivo modificado: index-grupal.html.


- R35 REDACCIÓN AUDIO HASTA HOYO ACTUAL 2026-09-22: index-grupal.html ahora identifica explícitamente la vuelta en la lectura individual: “Primera vuelta hasta el hoyo N” o “Segunda vuelta hasta el hoyo N”. Cuando corresponde el segundo bloque, dice “Acumulado total de la ronda hasta el hoyo N”. Ambos bloques nombran el mismo hoyo actual, por ejemplo hoyo 13. service-worker.js sincroniza el release R35. Archivos modificados: index-grupal.html, service-worker.js.


- R36 AUDIO NOMBRE PRIMERO 2026-09-22: index-grupal.html cambia exclusivamente el orden de la narración individual para comenzar por el jugador. Primera vuelta: “Jaime, hasta el hoyo 5. Gross…, Neto…, resultado…”. Segunda vuelta: “Jaime, segunda vuelta hasta el hoyo 13…” y después acumulado total cuando corresponde. manual.html documenta el mismo lenguaje. service-worker.js sincroniza el release R36 para actualización física. Archivos modificados: index-grupal.html, manual.html, service-worker.js.


- R37 AUDIO INDIVIDUAL UNIFORME 2026-09-22: index-grupal.html elimina “primera vuelta” y “segunda vuelta” de la narración individual. La voz siempre comienza “[Jugador], hasta el hoyo N…”. Si ya existe una mitad anterior jugada, agrega después “Acumulado total…”. Funciona igual para salida por hoyo 1 o por hoyo 10. manual.html se alinea con la misma fórmula. service-worker.js sincroniza release R37. Archivos modificados: index-grupal.html, manual.html, service-worker.js.


- R38 CIERRE AUTOMÁTICO DE VUELTAS 2026-09-22: restaura el disparador automático por orden real de juego. Al completar el primer bloque de 9 hoyos anuncia “Resultados totales de la primera vuelta” para todos los jugadores. Al completar el segundo bloque anuncia primero “Resultados de la segunda vuelta” y, inmediatamente después, “Resultados totales” de los 18 hoyos. Funciona igual comenzando por el hoyo 1 o por el 10. No modifica el audio individual por doble toque ni su acumulado. Archivos: index-grupal.html, service-worker.js y prueba de regresión R38.

- R39 TECLADO 0/X + REARME DE CIERRE 2026-09-22: agrega 0 al teclado manual para registrar “no jugó ese hoyo” como omisión válida; agrega X para borrar/corregir el score seleccionado. Corrige además el rearme de las banderas firstSegment/secondSegment de R38: si se borra un score que rompe una vuelta ya anunciada, al volver a completarla se vuelve a disparar el resumen automático. Conserva intacto el audio individual y el acumulado aprobado.

- R40 REPRODUCCIÓN AUTOMÁTICA DE CIERRE 2026-09-22: corrige la ruta manual del teclado. applyLiteralScores ahora conserva el registro normal silencioso, pero si recordScore/recordScores devuelve closure, lo reproduce mediante speakClosure. Esto hace que al completar nuevamente el último score del primer bloque de 9 hoyos se anuncien los resultados de la primera vuelta; al cerrar el segundo bloque reproduce segunda vuelta y resultados totales. También alinea el rearme tras fallo de voz con firstSegment/secondSegment. No modifica teclado, cálculos ni audio individual.

- R41 VERSIÓN VISIBLE EN CABECERA 2026-09-22: muestra en la esquina superior derecha de la ronda el número de versión real derivado del meta gscg-release. Si la app está al día muestra “VERSIÓN R41”; si detecta una publicación más nueva muestra “VERSIÓN Rxx · ÚLTIMA Ryy”, para identificar inmediatamente si el iPhone está atrasado. El mismo número se sincroniza con el panel de actualización. Conserva íntegro R40: reproducción automática del cierre de primera vuelta, segunda vuelta y resultados totales.