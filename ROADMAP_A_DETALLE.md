Warning: truncated output (original token count: 168243)
Total output lines: 4732

## R242 · Invitaciones 48H visibles sólo cuando tienen tarjeta Live · 9 de octubre de 2026

- Defecto físico reportado: Producción mostraba muchas tarjetas `ACCESO COMPARTIDO 48H` con `SIN TARJETA LIVE AÚN`; el propietario indicó que sólo debe verse la ronda activa cuyo primer jugador en Score Card es `CHINITO`.
- `api/event-administration.js`: `guestGroupRows()` ahora descarta cualquier grant/grupo 48H sin `current_snapshot.players` con nombre real; esto evita que Producción y el espejo de LAB publiquen invitaciones vacías.
- `event-administration-ui.js`: `visibleGuestGroups()` refuerza el filtro en cliente, ordena por actualización reciente y `guestGroupCard()` conserva únicamente `ABRIR TARJETA LIVE`.
- `live.html`: la tarjeta Live compartida aísla `.group-card`/`.match-live-pair` y eleva `.score-scroll` para que el scroll horizontal de la tabla no sea interceptado por bloques inferiores.
- `event-administration-ui.js`: instala `ensureGuestLiveScrollLayer()` en Administración para aplicar el mismo guard de capas cuando el propietario abre la tarjeta Live 48H desde `GRUPOS INVITADOS 48H`.
- Sincronización LAB/Producción: la ruta firmada `list-peer-guest48h` sigue vigente; al filtrar en API, LAB debe recibir la misma tarjeta activa de Producción sin depender de cookie cruzada ni mostrar grants vacíos.
- Regresión: `test-r242-guest48h-only-live-groups.mjs` exige filtro backend, filtro UI, eliminación de `SIN TARJETA LIVE AÚN`, título por primer jugador y presencia en el banco obligatorio.
- Regresión visual/táctil: `test-r242-live-scroll-layering.mjs` exige `position:relative`, `z-index`, `overflow-x:auto`, `overflow-y:hidden`, `overscroll-behavior-x:contain` y `touch-action:pan-x` en Live compartido y Organizador.
- Release: `release.json`, `index-grupal.html` y `service-worker.js` suben a `20261009-R242` / `R242-GUEST48H-LIVE-ONLY`.

## R241 · Backoff de directorio para no seguir quemando Neon · 9 de octubre de 2026

- Diagnóstico operativo: el proyecto Neon `bold-block-51864691` está en plan `free_v3`, con periodo de cuota del 1 de octubre al 1 de noviembre de 2026; LAB y Producción son las ramas activas que acumularon consumo.
- `directory-auto-refresh.js`: cambia el intervalo automático base de 5 s a 60 s y guarda `nextDelay`; si el resultado trae `DATABASE_QUOTA_EXCEEDED`, programa el siguiente intento a 300 s.
- `directory-auto-refresh.js`: al recuperar conectividad normal, error de red genérico o resultado sin cuota agotada, vuelve al intervalo base de 60 s.
- `event-administration-ui.js`: `refresh({automatic:true})` devuelve el código real de `event-administration` o `tournament-score-directory`, incluso si no repinta por firma idéntica o diálogo abierto.
- `event-administration-ui.js`: el estado inferior `directorySync` diferencia la cuota agotada con `REINTENTO EN 5 MIN · BASE DE DATOS SIN CUOTA`; otros fallos conservan `REINTENTO AUTOMÁTICO · CONSERVANDO LA LISTA`.
- `test-r172-directory-auto-refresh.mjs`: actualiza las aserciones históricas del temporizador a 60 s y agrega una prueba dedicada de backoff de 300 s ante `DATABASE_QUOTA_EXCEEDED`.
- `release.json`, `index-grupal.html` y `service-worker.js`: sincronizan `20261009-R241`, badge visible `R241`, versión técnica `R241-NEON-QUOTA-BACKOFF`, caché PWA y query de `personal-events.js`.
- Límite honesto: R241 no elimina el bloqueo ya activo de Neon HTTP 402; sólo evita que la UI administrativa siga generando llamadas frecuentes mientras la cuenta está sin cuota.

## R240 · Diagnóstico explícito de cuota Neon · 9 de octubre de 2026

- Evidencia física: tras R239, Organizador abre `ADMINISTRAR TORNEOS Y GRUPOS`, pero muestra `NO SE PUDO COMPLETAR · TOURNAMENT_DIRECTORY_UNAVAILABLE · LISTA GLOBAL INCOMPLETA · REINTENTO AUTOMÁTICO`; el endpoint público `/api/tournament-score-directory` devuelve HTTP 500 en LAB y Producción.
- Diagnóstico Vercel: logs de runtime en `dpl_3cBpwX4CgG5Thesn9m5siYWaQLHy` y `dpl_7AFcpA79CJ5iPQY9AUC9H5vH7bCq` muestran Neon HTTP 402: `Your account or project has exceeded the quota`.
- `api/_lib/service-errors.js`: nuevo clasificador compartido para detectar cuota agotada por status/mensaje y emitir `DATABASE_QUOTA_EXCEEDED`.
- `api/tournament-score-directory.js` y `api/event-administration.js`: el catch usa el clasificador y responde 503 con código operativo explícito en vez de error genérico.
- `event-administration-ui.js`: agrega mensaje visible `BASE DE DATOS SIN CUOTA · NEON 402 · ACTUALIZA EL PLAN O LA CUOTA`.
- `test-r240-database-quota-diagnostics.mjs`: valida ambos endpoints y el texto UI; `scripts/build-manual-lab.mjs` incorpora el test al banco obligatorio.
- `release.json`, `index-grupal.html`, `service-worker.js`: sincronizan R240 para entrega por actualización.
- Nota operativa: R240 no puede restaurar la lista mientras Neon rechace consultas por cuota; deja la causa real visible para intervención de cuenta/plan/cuota.

## R230 · Access propietario con única opción 48 horas · 8 de octubre de 2026

- `access.html`: el texto del panel propietario se reduce a crear únicamente el enlace compartido válido por 48 horas; conserva la aclaración de que Registro no necesita credenciales.
- `access.html`: la sección propietaria elimina `CREAR CÓDIGO PARA JUGADOR`, `VER ACTIVIDAD ANÓNIMA`, `reportData`, `create-code`, `revoke-code` y el handler de reporte.
- `access.html`: el único botón operativo queda con el texto exacto `COMPARTIR APP 48 HORAS`; copiar y revocar se mantienen como controles del mismo enlace.
- `test-r230-owner-access-48h-only.mjs`: valida la opción única 48h, el texto aprobado, ausencia de opciones/reportes/códigos y entrada libre.
- `scripts/build-manual-lab.mjs`: ejecuta el gate R230 dentro del banco obligatorio.
- `release.json`, `service-worker.js`, `index-grupal.html`: sincronizan `20261008-R230`, `VERSIÓN R230`, caché `v402-r230-owner-access-48h-only` y `personal-events.js?v=20261008-R230`.

## R229 · Tarjeta Live desde Organizador para invitados 48h · 8 de octubre de 2026

- `event-administration-ui.js`: `guestGroupTitle()` identifica cada grupo invitado por el primer jugador del registro de la Score Card; deja de usar `snapshot.groupLabel` como título visible.
- `event-administration-ui.js`: agrega `guestGroupLiveCard()`, `guestPlayerLiveCard()` y utilidades de tabla para que el propietario abra cada ronda invitada 48h como una tarjeta digital tipo Live completa.
- `event-administration-ui.js`: `guestGroupCard()` queda como tarjeta compacta con botón `ABRIR TARJETA LIVE`; el resumen de jugadores en bullets deja de ser la vista principal.
- `event-administration.html`: agrega reglas de diálogo ancho móvil, tabla `score-live`, nombres verdes/mayúsculos/sin subrayado, separador `RESULTADOS ACUMULADOS` y totales acumulados.
- `test-r229-organizer-guest48h-live-card.mjs`: valida apertura dedicada desde Organizador, tabla de 18 hoyos, título por primer jugador, ausencia de `groupLabel` como título y bloqueo del resumen de bullets.
- `scripts/build-manual-lab.mjs`: ejecuta el gate R229 dentro del banco obligatorio.
- `release.json`, `service-worker.js`, `index-grupal.html`: sincronizan `20261008-R229`, `VERSIÓN R229`, caché `v401-r229-organizer-guest48h-live-card` y `personal-events.js?v=20261008-R229`.

## R228 · Tarjeta digital Live del invitado 48h · 8 de octubre de 2026

- `live-view.js`: `streamCard()` elimina el `<h2>` con el nombre del grupo para que no aparezca `GRUPO CHINITO` ni ningún título equivalente en la tarjeta Live compartida.
- `live-view.js`: `playerCard()` cambia la fila de resultado por hoyo a `+/- POR HOYO`, agrega `RESULTADOS ACUMULADOS` antes de los totales y cambia la tarjeta de totales a la misma nomenclatura.
- `live.html`: la vista Live declara `gsc-navigation-unused`, fija su propio botón de cierre y reserva `padding-top` seguro para evitar que el cierre/menú se monte sobre la tarjeta.
- `live.html`: los nombres de jugadores en la tarjeta Live quedan verdes, mayúsculos y sin subrayado, conservando foco accesible.
- `test-r228-live-48h-shared-card-layout.mjs`: valida el flujo estático de la tarjeta Live 48h compartida con datos de `GRUPO CHINITO`, bloqueo del título, metadatos visibles, separación de resumen y etiquetas solicitadas.
- `scripts/build-manual-lab.mjs`: agrega la regresión R228 al banco obligatorio.
- `release.json`, `service-worker.js`, `index-grupal.html`: sincronizan `20261008-R228`, `VERSIÓN R228`, caché `v400-r228-live-48h-shared-card-layout` y `personal-events.js?v=20261008-R228`.

## R227 · Invitaciones 48h como grupos individuales en Organizador · 8 de octubre de 2026

- `api/_lib/app-access.js`: agrega tabla `app_access_guest_groups` con `grant_id`, `group_key`, snapshot, modalidad, jugadores, hoyos y contadores; `recordGuestFeedback()` hace upsert por grupo y `ownerFeedback()` devuelve `guest_groups`.
- `index-grupal.html`: agrega `guestAccessGroupId()` y manda `guestGroupId` dentro del feedback 48h; el invitado sigue entrando a `index-grupal.html?source=guest48h` y registra jugadores en la Score Card normal.
- `api/event-administration.js`: importa `ownerFeedback`, construye `guestGroupRows()` y expone `guestGroups` en `list` y `list-local`; el bloqueo `EVENT_ADMIN_GUEST_FORBIDDEN` para cookie invitada se mantiene.
- `event-administration-ui.js`: agrega `guestGroupTitle()`, `guestGroupPlayerLine()` y `guestGroupCard()`; debajo de `TORNEOS` aparece `GRUPOS INVITADOS 48H` con tarjetas separadas por grupo.
- `test-r222-guest-48h-shared-link.mjs`: ahora publica dos grupos (`telefono-jaime` y `telefono-becky`) bajo el mismo enlace 48h y exige que `ownerFeedback()` conserve ambos.
- `test-r227-guest48h-organizer-groups.mjs`: valida persistencia por grupo, payload `guestGroupId`, API de Organizador, UI de tarjetas y bloqueo de Organizador para invitado.
- `scripts/build-manual-lab.mjs`: agrega la regresión R227 al banco obligatorio.
- `release.json`, `service-worker.js`, `index-grupal.html`: sincronizan `20261008-R227`, `VERSIÓN R227`, caché `v399-r227-guest48h-organizer-groups` y `personal-events.js?v=20261008-R227`.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`: agrega RC-141 para la ausencia de grupos 48h individuales dentro de Organizador.
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`: registra el mapa R227 de backend, API, UI, Score Card y controles.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`: queda resellado para incluir el árbol R227 publicado.

## R226 · WhatsApp sin copiar/pegar código · 8 de octubre de 2026

- `whatsapp-invitations.js`: `registrationUrl(source, code)` añade `codigo` a `/index-grupal.html?inicio=1` cuando la invitación no trae `eventId`; el mensaje deja claro que el enlace ya carga el código.
- `personal-events.js`: agrega `loadStartupJoinCode()` y `consumeStartupJoinCode()` para capturar `codigo`/`code` de la URL, limpiar el parámetro y reutilizarlo en `openTournamentBeforeRegistration()` y `joinTournamentByCode()`.
- `personal-events.js`: `openTournamentBeforeRegistration()` precarga el código y dispara `CONTINUAR AL REGISTRO DE JUGADORES` automáticamente, manteniendo la preparación oficial del torneo antes de escribir jugadores.
- `live-control.js`: `quickShareGroup()` fuerza `forceStream:true` cuando la Score Card ya está conectada a un torneo; así `COMPARTIR LIVE` comparte sólo esa ronda/grupo y no el torneo completo.
- `live-share.js`: `forceStream` evita la ruta `share-code` de viewer del torneo y usa `/api/live-share` con `liveEvent/liveKind` atado al stream publicado por la Score Card.
- `api/_lib/live-share.js`: `readLiveShare()` filtra por `issuer_stream_id`; el invitado no ve otros streams, grupos ni torneos activos.
- `test-r226-whatsapp-entry-code-prefill.mjs` y `test-lab-code-entry.mjs`: validan versión, URL con `codigo`, texto de WhatsApp, autoinspección, ausencia de crash por botones retirados y Live limitado a la Score Card compartida.
- `scripts/build-manual-lab.mjs`: agrega la regresión R226 al banco técnico obligatorio.
- `release.json`, `service-worker.js`, `index-grupal.html`: sincronizan `20261008-R226`, `VERSIÓN R226`, caché `v398-r226-whatsapp-code-prefill` y `personal-events.js?v=20261008-R226`.
- `test-lab-private-round-share-flow.mjs`: actualiza la aserción histórica de ronda privada para exigir el mensaje R226 con código precargado; evita que Vercel rechace la publicación por una expectativa anterior.

## R225 · Invitado 48h sin Organizador y con Compartir Live · 8 de octubre de 2026

- `guest-access.js`: `hideGuestPrivateControls()` ya no elimina `gscLiveLaunch` ni `shareRoundLiveButton`; el aviso visible declara `LIVE PERMITIDO · ORGANIZADOR BLOQUEADO`.
- `shortcuts-ui.js`: `render()` omite `ORGANIZADOR` cuando `root.GSC_GUEST_ACCESS` está activo; `act()` intercepta `organizer`, `organizer-invitations`, `administration`, `create-tournament`, `add-tournament`, `remove-tournament` y `clear-board` con mensaje de bloqueo.
- `live-control.js`: al montar el panel Live en invitado 48h elimina `liveOrganizerToggle` y `liveOrganizerPanel`, manteniendo el acceso rápido `quickShareGroup()`.
- `event-administration.html`: si existe `gsc_guest_mode=1`, reemplaza la pantalla por un aviso de invitado 48h sin Organizador.
- `event-administration-ui.js`: detiene la ejecución del módulo administrativo cuando detecta cookie invitada 48h.
- `api/event-administration.js`: rechaza acciones administrativas con `EVENT_ADMIN_GUEST_FORBIDDEN` cuando hay `gsc_guest_mode=1`; conserva `remote-share` para compartir Live.
- `test-r225-guest-48h-no-organizer-live-allowed.mjs`: valida ocultamiento de Organizador, bloqueo directo, API defensiva y Live permitido.
- `test-r18-owner-guest-24h-access.mjs`: actualiza el contrato invitado para no remover botones Live.
- `release.json`, `service-worker.js`, `index-grupal.html`: sincronizan R225, caché `v397-r225-guest-48h-no-organizer-live`, meta `20261008-R225`, badge `VERSIÓN R225` y `personal-events.js?v=20261008-R225`.

## R224 · Retiro de controles 48h de la Score Card pública · 8 de octubre de 2026

- `index-grupal.html`: la barra de herramientas queda limitada a funciones públicas (`COMPARTIR LIVE` y `GUÍA DE USUARIO` según estado de ronda); ya no renderiza `ownerShare24h` ni `ownerTrialReport`.
- `index-grupal.html`: se elimina el bloque que consultaba `app-access?action=status` para mostrar controles propietarios cuando la cuenta autenticada era owner, evitando que Producción muestre botones de laboratorio por sesión.
- `index-grupal.html`: `renderDraft()` permite una fila adicional en edición de ronda activa hasta seis jugadores, `addRosterPlayer` revela esa fila, y `syncDraftPlayersFromManualRows()` procesa la fila nueva sin cortar en `draftPlayers.length`.
- `index-grupal.html`: el jugador agregado conserva `activeFrom=rosterEditJoinHole`, por lo que no exige scores de hoyos ya jugados y los scores previos de los demás jugadores permanecen intactos.
- `access.html`: mantiene la administración privada de invitaciones 48h mediante correo/contraseña, `create`, `report`, `revoke` y canje `/invite/<token>` hacia `source=guest48h`.
- `test-r224-scorecard-no-48h-owner-controls.mjs`: valida release R224, ausencia de textos/IDs 48h en Score Card y presencia del panel privado en `access.html`.
- `test-r224-registration-add-active-player.mjs`: valida botón `AGREGAR JUGADOR`, fila adicional hasta seis, sincronización de la fila nueva y entrada desde el siguiente hoyo.
- `test-v263-compact-players-back-button.mjs`: se actualiza para exigir alta posterior hasta seis preservando scores existentes.
- `test-owner-invitation-ui.mjs`, `test-r18-owner-guest-24h-access.mjs`, `test-lab-account-gate.mjs`, `test-lab-r60-physical-matrix.mjs`, `test-manual-startup-sharing.mjs` y `test-v311-live-support-link.mjs`: cambian de exigir el botón en Score Card a bloquear su exposición pública.
- `scripts/build-manual-lab.mjs`: agrega el test R224 al banco de publicación LAB/Producción.
- `release.json`, `service-worker.js`, `index-grupal.html`: sincronizan R224, cache `v396-r224-hide-trial-48h-scorecard`, meta `20261008-R224`, badge `VERSIÓN R224` y `personal-events.js?v=20261008-R224`.

## R223 · Tecla `-` y handicap bajo cero en Campeonato/A · 8 de octubre de 2026

- `index-grupal.html`: Registro muestra una tecla `-` junto al campo HDCP de cada jugador; al tocarla alterna el signo negativo y conserva el valor en el borrador.
- `index-grupal.html`: el campo HDCP acepta texto con patrón `-?[0-9]*` para que iPhone no bloquee la captura de valores como `-2`.
- `index-grupal.html`: `strokesOnHole()` mantiene la distribución negativa y `scoreObject()` conserva `net=gross-strokes`, por lo que `-2` aumenta el neto donde el jugador entrega golpes al campo.
- `index-grupal.html`: la fila HDCP pinta los golpes entregados con `hcp-stroke-give` y la respuesta avanzada de handicap dice `entrega` en lugar de `no recibe`.
- `test-r223-negative-handicap-campeonato-a.mjs`: agrega control específico para Campeonato/A, tecla visible `-`, cálculo de `-2`, suma total `-2` y neto inverso.
- `scripts/build-manual-lab.mjs`: agrega el test R223 al banco de publicación LAB/Producción.
- `release.json`, `service-worker.js`, `index-grupal.html`: sincronizan R223, cache `v395-r223-negative-handicap-campeonato-a`, meta `20261008-R223`, badge `VERSIÓN R223` y `personal-events.js?v=20261008-R223`.

## R222 · Enlace de prueba 48h y tablero de grupos invitados · 8 de octubre de 2026

- `api/_lib/app-access.js`: `app_access_grants` agrega `max_uses` y `current_snapshot`; `createGrant()` emite 48 horas/5 usos; `redeemGuestToken()` consume una apertura por redención y `recordGuestFeedback()` guarda la última tarjeta de cada grupo sin gastar usos.
- `api/app-access.js`: `/api/app-access?action=create` entrega un único enlace `/invite/<token>` válido 48h; `/redeem` redirige a `source=guest48h`; `/feedback` acepta snapshot de score card; `/report` devuelve el tablero propietario.
- `index-grupal.html`: los invitados envían snapshot técnico de la ronda al persistir cambios; el propietario ve `VER PRUEBA 48 H` con grupos independientes, jugadores, hoyos, gross y neto/+/-.
- `guest-access.js`: modo invitado 48h oculta herramientas de compartir y administración para que los amigos no redistribuyan desde la aplicación.
- `test-r222-guest-48h-shared-link.mjs`, `test-r18-owner-guest-24h-access.mjs`, `test-lab-account-gate.mjs`, `test-lab-r60-physical-matrix.mjs` y `test-global-public-entry-policy.mjs`: bloquean regresión de entrada pública, aislamiento invitado, cupo, vencimiento y visibilidad de tarjetas.
- `test-owner-invitation-ui.mjs`: sincroniza el mock del propietario con los dos controles R222 (`PRUEBA · 48 H` y `VER PRUEBA 48 H`) para que el build de Vercel valide el flujo completo.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`: queda sincronizado con las fuentes R222 y el ajuste del gate físico.
- `release.json`, `service-worker.js`, `index-grupal.html`: sincronizan R222, cache `v394-r222-owner-trial-48h-shared-link`, meta `20261008-R222`, badge `VERSIÓN R222` y `personal-events.js?v=20261008-R222`.

## R221 · Paridad funcional para Compartir Live desde directorios LAB/Producción · 8 de octubre de 2026

- `live-hub.js`: `shareGeneral()` detecta `shareEvent.directory` antes de invocar `GSCOneUseLive.share()`. Para eventos de directorio construye `tournamentHubShareUrl(state.generalToken, dominioDueño, location.href)` y usa `navigator.share` o copia al portapapeles.
- `live-hub.js`: el dominio dueño queda determinado por `shareEvent.source`: LAB comparte `https://golf-sc-gt-lab.vercel.app/live-hub.html?...#general=directory_lab_...`; Producción comparte `https://epg-caddy.vercel.app/live-hub.html?...#general=directory_production_...`.
- `test-lab-code-entry.mjs`: agrega aserciones estáticas para asegurar que Scores de directorio comparte URL pública y manda eventos LAB al dominio LAB.
- `CONTROL_PROYECTO_SCIRE/ARQUITECTURA_PARIDAD_LAB_PRODUCCION.json`: declara la paridad 360 obligatoria entre LAB y Producción: mismo árbol publicado, release/meta/badge/SW alineados, entrada pública, escritores, acceso personal, directorios, Live, PWA/cache, ROADMAPS, inventario y gates; sólo pueden variar dominios, project IDs, bases y secretos propios.
- `test-r221-lab-production-architecture-parity.mjs`: valida que LAB y Producción usen entorno declarado, que ningún ambiente se active con la bandera del otro, que LAB conserve base aislada, que release visible/cache estén alineados y que el directorio público no dependa de código privado.
- `test-v353-live-hub.mjs`: conserva el bloqueo del nombre interno en UI/textos LIVE y permite únicamente el dominio técnico canónico de Producción usado por el enlace público.
- `scripts/build-manual-lab.mjs`: incorpora el nuevo gate de paridad al banco obligatorio.
- `release.json`, `service-worker.js`, `index-grupal.html`: sincronizan R221, caché `v393-r221-fix-compartir-live-directory-public-share`, meta `20261008-R221`, badge `VERSIÓN R221` y `personal-events.js?v=20261008-R221`.

## R220 · Relay same-origin para Compartir Live de eventos LAB remotos · 8 de octubre de 2026

- `live-share.js`: calcula el ambiente actual por hostname; si `personal.source` difiere, genera el código con `fetch('/api/event-administration', {action:'remote-share', source, eventId, eventKind})` y conserva el modal aprobado con enlace `/code-entry.html?visitor=1#code=...`.
- `live-share.js`: la ruta del mismo ambiente mantiene `GSCPersonalEvents.request('share-code', payload)`; LIVE legacy conserva `request('create', ..., publisherSecret)`.
- `test-lab-code-entry.mjs`: prueba tres rutas: personal sin publisher legacy, directorio LAB en LAB y directorio LAB desde producción vía relay; bloquea la llamada cross-origin directa que causaba `NETWORK_ERROR`.
- `release.json`, `service-worker.js`, `index-grupal.html`: release `20261008-R220`, etiqueta visible `R220`, cache `v392-r220-fix-compartir-live-remote-share` y `personal-events.js?v=20261008-R220`.

## R219 · Compartir Live source-aware desde Scores de directorio LAB · 8 de octubre de 2026

- `live-hub.js`: incorpora `directoryEventDescriptor()` para tokens `directory_lab_<uuid>`, `directory_production_<uuid>` y privados; `currentShareEvent()` centraliza el evento activo y conserva `eventId`, `eventKind`, `source` y marca de directorio.
- `live-hub.js`: `renderScoresHeading()` habilita `COMPARTIR LIVE` cuando el evento actual proviene del directorio personal, además de los casos `personal_<eventId>` y LIVE legacy; `shareGeneral()` pasa el descriptor completo a `GSCOneUseLive.share()`.
- `live-share.js`: `GSCOneUseLive.share(kind,eventId,name,event)` usa el descriptor recibido, manda `source` a `GSCPersonalEvents.request('share-code', ...)` y conserva el enlace con `#code=...` para invitado.
- `test-lab-code-entry.mjs`: agrega VM `directory_lab` sin `publisherSecret`, comprueba payload `{eventId,eventKind:'tournament',source:'lab'}` y bloquea que el botón vuelva a perder el source.
- `release.json`, `service-worker.js`, `index-grupal.html`: release `20261008-R219`, etiqueta visible `R219`, cache `v391-r219-fix-compartir-live-directory-lab` y `personal-events.js?v=20261008-R219`.

## R218 · Compartir Live habilitado en Scores personales · 8 de octubre de 2026

- `live-share.js`: `GSCOneUseLive.share()` detecta `personal_<eventId>` antes de pedir `publisher(kind,eventId)`. Si el evento es personal, llama directamente a `GSCPersonalEvents.request('share-code',{eventId,eventKind})` y conserva el enlace R217 con `#code=...`.
- `live-hub.js`: `renderScoresHeading()` calcula `shareKind` desde el descriptor personal/one-use/directorio y define `personalShare` con `GSCPersonalEvents.descriptor('personal_'+general.id)`. `hubShareGeneral` queda deshabilitado sólo si no hay evento personal ni publisher legacy.
- `test-lab-code-entry.mjs`: añade VM sin `publisherSecret` para reproducir el caso de Scores General del torneo personal y exige que el modal genere `/code-entry.html?visitor=1#code=...`; además verifica estáticamente la condición del botón.
- `release.json`, `service-worker.js`, `index-grupal.html`: release `20261008-R218`, etiqueta visible `R218`, cache `v390-r218-fix-compartir-live-personal-scores` y `personal-events.js?v=20261008-R218`.

## R217 · WhatsApp de codigo de un solo uso abre con codigo precargado · 8 de octubre de 2026

- `live-share.js`: el mensaje de `GSCOneUseLive.share()` deja de depender de que el invitado copie manualmente un codigo largo. El enlace `/code-entry.html?visitor=1#code=...` transporta el codigo en el fragmento del navegador y el texto de WhatsApp indica tocar enlace + ENTRAR.
- `code-entry.js`: lee `#code`, coloca el valor en `entryCode`, limpia el hash con `history.replaceState()` y mantiene la regla de seguridad: no consume ni redime automaticamente al abrir el link.
- `test-lab-code-entry.mjs`: actualiza el contrato para exigir link precargado, mensaje entendible para invitado y cero redencion hasta submit; conserva el flujo legacy con `liveEvent/liveKind`.
- `release.json`, `service-worker.js`, `index-grupal.html`: suben a `20261008-R217` / `R217-WHATSAPP-ONE-USE-CODE-PREFILL`.

## R216 · Scores de torneo sin panel global de grupos/rondas activos · 8 de octubre de 2026

- `live-hub.html`: se elimina la sección `hubGlobalLiveDirectory`/`global-live-directory`, responsable del bloque blanco mostrado sobre los tabs de Scores.
- `live-hub.js`: se retiran `activeGlobalDirectory`, `renderActiveGlobalDirectory()` y `refreshActiveGlobalDirectory()`; la pantalla de Scores ya no consulta ni pinta `GRUPOS Y RONDAS GLOBALES ACTIVOS`, listas globales, grupos ni horas de actualización.
- `test-r216-live-hub-no-global-directory-panel.mjs`: verifica ausencia de IDs/textos prohibidos y conserva `hubShowGeneral`, `hubShowCategories`, `hubShowIndividual` y `hubAddToBoard`.
- `release.json`, `service-worker.js` e `index-grupal.html`: identidad visible/cache en `20261008-R216`.
- Cierre de despliegue: tras reparar el blob remoto de `index-grupal.html`, ROADMAPS e inventario viajan juntos para satisfacer `roadmap-gate` e `inventory-gate` en Vercel.

## R215 · Sin purga local por ausencia remota en `list` · 8 de octubre de 2026

- `personal-events.js`: `sync()` mantiene la union de eventos remotos, alias, cuenta y lectura de entorno par, pero deja de enviar `result.removedEvents` / `other.removedEvents` a `purgeDeletedEvents()`. El telefono conserva el torneo local si el servidor responde una lista vacia o no encuentra una fila conocida.
- `personal-events.js`: se mantiene la purga por `removedStreams` para referencias de stream y se conserva `GSCPersonalEvents.purgeDeletedEvents()` para borrado fisico explicito/manual.
- `test-r215-personal-list-no-local-purge.mjs`: VM del cliente con `gsc-personal-events-v1`, seleccion de torneo, ronda activa, archivo local, hub y live-control; el mock de `/api/personal-events` devuelve `events:[]` y `removedEvents:[...]`; la prueba exige conservar todo y no emitir `gsc-events-removed`.
- `test-event-total-purge.mjs`: sigue verificando que una purga explicita borre ID, seleccion, ronda activa, archivo, hub, codigos y cola de sync, sin tocar perfiles ajenos.
- `scripts/build-manual-lab.mjs`: agrega la regresion R215 al banco LAB.
- `release.json`, `index-grupal.html`, `service-worker.js`: etiqueta visible, meta release, `personal-events.js?v=20261008-R215`, cache `v387-r215-no-list-purge-local-tournaments` y version tecnica `R215-NO-LIST-PURGE-LOCAL-TOURNAMENTS`.
- Motivo operativo: las bases consultadas mostraban directorio publico vacio antes y despues de R214; el cliente no debe interpretar una ausencia remota como orden de borrar datos locales del jugador.
- Archivos: `personal-events.js`, `test-r215-personal-list-no-local-purge.mjs`, `scripts/build-manual-lab.mjs`, `release.json`, `index-grupal.html`, `service-worker.js`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` e `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.

## R214 · Gate de actualizacion compatible con R213 · 8 de octubre de 2026

- `test-update-delivery-control.mjs`: conserva la prueba de ACTUALIZAR y retorno a Administracion, pero extrae `manualAppNavigation` hasta `self.addEventListener("fetch"` porque R213 retiro la funcion `authorizedPersonalNavigation`.
- `test-personal-storage-access.mjs`: actualiza el contrato de navegacion personal para no esperar 403 textual en pagina; mantiene el reingreso autenticado con redireccion reparada y deja la proteccion privada a las APIs.
- `service-worker.js`: cache `v386-r214-no-raw-personal-auth-page-gate-fix` y `RELEASE_FALLBACK="20261008-R214"`.
- `index-grupal.html`: meta release, badge visible, carga de `personal-events.js` y marca de fallback se sincronizan en R214.
- `release.json`: publica `R214-NO-RAW-PERSONAL-403`.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`: sello regenerado sobre el arbol R214 final para corregir el bloqueo de `INVENTORY GATE` visto en Vercel.
- `scripts/inventory-gate.mjs`: bajo `VERCEL=1` usa `git ls-files --cached`; localmente conserva `--others --exclude-standard` para detectar archivos fuente no registrados.
- Objetivo operativo: permitir que LAB y Produccion compilen el parche que impide que una navegacion personal termine en la pagina negra textual `Acceso personal no autorizado`.
- Cierre atomico: ROADMAPS e inventario quedan en el mismo commit final para que `roadmap-gate` valide la publicacion remota R214.
- `scripts/rebuild-inventory-pdfs.py`: al ejecutarse con `VERCEL=1`, calcula el sello desde `git ls-files --cached`, igual que `scripts/inventory-gate.mjs`.

## R213 · Navegacion personal sin pantalla negra 403 · 8 de octubre de 2026

- `service-worker.js`: elimina la verificacion previa `authorizedPersonalNavigation`; `index-grupal.html` con `personalEvent` o `personalAccount` pasa por `manualAppNavigation` y no puede devolver texto plano como pagina final.
- `middleware.js`: si la verificacion inmediata de `personalEvent` no confirma membresia, deja cargar la app en vez de responder `Acceso personal no autorizado`; las APIs conservan los rechazos propios.
- `index-grupal.html`: sube a R213, carga `personal-events.js?v=20261008-R213` y mantiene fallback `joinSelectionFallbackRelease:'R213'` desde seleccion local/scoped.
- `test-live-share-middleware.mjs` y `test-lab-update-recovery.mjs`: actualizan la expectativa a shell cargado sin 403 textual.

## R212 · Reparacion de navegacion personal autorizada sin `personalAccount` · 8 de octubre de 2026

- `middleware.js`: mantiene la validacion server-side contra `/api/personal-events`, pero acepta el caso seguro donde la URL trae `personalEvent` y no trae `personalAccount`; si la respuesta confirma jugador/organizador/scorer con jugadores activos, redirige completando la cuenta autorizada.
- `middleware.js`: cuando la sesion confirmada es solo visor, redirige a `live-hub.html` en lugar de entregar texto plano de 403.
- `test-live-share-middleware.mjs`: agrega regresion para la captura R211 con `Acceso personal no autorizado`; tambien conserva el control negativo de cuenta explicita ajena.
- `release.json`, `index-grupal.html` y `service-worker.js`: release sincronizada `20261008-R212`, etiqueta visible `R212`, version tecnica `R212-PERSONAL-EVENT-NAVIGATION-REPAIR`.
- Motivo fisico: captura de Produccion mostro pantalla negra con `Acceso personal no autorizado` despues del intento con codigo de torneo.
- Cierre de despliegue: `INVENTARIOS_V311.lock.json` se recalcula sobre el HEAD remoto exacto, incluyendo el parche cliente ya presente en la rama activa.
- Estado: gates y despliegue pendientes antes de pedir nueva prueba fisica.

## R211 · Codigo de torneo no queda sombreado por sesion de codigo · 8 de octubre de 2026

- `api/personal-events.js`: la rama con `gsc_code_session` ya no deja que una sesion de codigo valida intercepte `inspect-tournament-code`/`join-code`. Primero lee `gsc_event_device`; si no existe, para esas acciones crea una identidad de dispositivo segura. En `list`/`read` solo prioriza el dispositivo si ya esta presente.
- `test-lab-device-event-identity.mjs`: importa `issueEntryCode`/`redeemEntryCode` y reproduce una sesion de visor valida que antes sombreaba la entrada del codigo de organizador; el join ahora entra con identidad de dispositivo y consume el codigo correcto.
- `release.json`, `index-grupal.html` y `service-worker.js`: release sincronizada `20261008-R211`, etiqueta visible `R211`, version tecnica `R211-CODE-SESSION-SHADOW-FIX`.
- Motivo fisico: captura R210 en Produccion mostro `NO SE PUDO PREPARAR EL EVENTO · REINTENTA` con `D50F9059FD`.
- Cierre de despliegue: se corrige el escape de publicacion subiendo ROADMAPS e `INVENTARIOS_V311.lock.json` dentro del mismo commit, despues de regenerar los tres inventarios PDF.
- Estado: pruebas dirigidas y gates pendientes de ejecucion antes de publicar.

## R210 · Produccion declara entorno y recarga runtime · 8 de octubre de 2026

- Evidencia: R209 servido, pero endpoint Produccion aun respondia `PERSONAL_ACCESS_NOT_ENABLED`.
- Causa pendiente: faltaba variable `GSC_ENVIRONMENT=production` en Vercel project `epg-caddy`.
- Accion: variable creada como plain para production y preview; R210 dispara deployment nuevo.
- Validacion: POST a `/api/personal-events` debe pasar la puerta de acceso personal.

## R209 · activacion personal por entorno declarado, no solo VERCEL_ENV · 8 de octubre de 2026

- Falla exacta R208: `test-personal-access-activation.mjs` esperaba que `VERCEL_ENV=preview` con solo `GSC_PERSONAL_ACCESS_PRODUCTION_READY` siguiera bloqueado.
- Cambio exacto: `personalAccessEnabled` acepta Produccion en preview solo si `GSC_ENVIRONMENT` o `GSC_APP_ENVIRONMENT` declara `production`.
- Test actualizado: cubre Produccion real, LAB preview, Produccion aliasada a preview, y evita que LAB_READY active Produccion declarada.
- Validacion esperada: build PASS y endpoint Produccion deja de devolver `PERSONAL_ACCESS_NOT_ENABLED`.

## R208 · correccion definitiva del target Vercel para Produccion · 8 de octubre de 2026

- Evidencia post R207: `release.json` mostraba R207, pero POST a Produccion seguia devolviendo `PERSONAL_ACCESS_NOT_ENABLED`.
- Funcion afectada: `api/_lib/personal-access-activation.js`.
- Cambio exacto: `personalAccessEnabled` deja de depender de `VERCEL_ENV` y acepta cualquiera de los flags READY ya configurados en el proyecto que esta sirviendo el dominio.
- Validacion esperada: Produccion ya no debe devolver `PERSONAL_ACCESS_NOT_ENABLED`; si el codigo es invalido, la respuesta sera por datos del codigo, no por acceso apagado.

## R207 · fix Produccion no LAB para codigos de torneo · 8 de octubre de 2026

- Aclaracion del propietario: el problema no era LAB, era Produccion.
- Evidencia tecnica: POST directo a `https://epg-caddy.vercel.app/api/personal-events` con `9FCE819496` devolvio `PERSONAL_ACCESS_NOT_ENABLED`; LAB devolvio `LIVE_JOIN_CODE_INVALID`.
- Causa: variable de acceso personal de Produccion existia solo para target `production`, pero el dominio estaba aliasado a un deployment de rama/preview.
- Accion: extender `GSC_PERSONAL_ACCESS_PRODUCTION_READY=1` a `preview` y redeploy R207.

## R206 · fix real del fallo R205 al preparar score card · 8 de octubre de 2026

- Evidencia del usuario: captura R205 con `SCORE CARD ASIGNADA` y `NO SE PUDO PREPARAR EL EVENTO · REINTENTA`.
- Error de implementacion: backend y `personal-events.js` ya preparaban el fallback, pero el caller de registro envio a `openAssignedCard` solo `eventId` y `eventKind`.
- Cambio exacto: `registrationJoinTournament` pasa `{...result,eventKind:result.eventKind||eventKind}`; `joinCurrentRoundGroup` reconstruye access desde `result.membership` y `result.configuration` cuando `read` falla.
- Resultado esperado: el codigo ya consumido por el mismo dispositivo debe abrir la tarjeta personal asignada sin depender del read inmediato.

## R205 · control de entrega visible para score card asignada · 8 de octubre de 2026

- Falla exacta: `actual: VERSIÓN R201`, `expected: VERSIÓN R204`; el test exige que el primer badge visible coincida antes de ejecutar JavaScript.
- Accion: `index-grupal.html` actualiza el badge estatico, `gscg-release`, service worker y `release.json`; el inventario se vuelve a sellar con el arbol resultante.
- Archivos activos tocados en la misma modificacion: backend, frontend, ROADMAPS, versionado visible y sello de inventarios.
- Validacion esperada: superar `test-update-delivery-control.mjs` y completar build READY.

## R204 · sello de inventarios para publicar fix de torneo · 8 de octubre de 2026

- Bloqueo reproducido: Vercel R203 mostro `PASS ROADMAP GATE` y luego `FAIL INVENTORY GATE` por cambios activos posteriores al ultimo sellado.
- Control actualizado: source digest y conteo de fuentes se regeneran contra el arbol R204 excluyendo `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, como exige `scripts/inventory-gate.mjs`.
- Archivos en la misma modificacion: backend de join-code, frontend de apertura de score card, ambos ROADMAPS, release visible, service worker e inventario.
- Resultado esperado: build pasa proyecto, roadmap e inventario; luego LAB/PROD pueden apuntar a R204.

## R203 · publicacion atomica del fix de score card asignada · 8 de octubre de 2026

- Motivo: Vercel rechazo R202 con `FAIL ROADMAP GATE` porque el ultimo commit no incluia ambos ROADMAPS junto con la modificacion de codigo.
- Accion: se consolida una nueva modificacion que toca `api/_lib/personal-event-access.js`, `personal-events.js`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `index-grupal.html`, `service-worker.js` y `release.json`.
- Control funcional: el cliente puede preparar la tarjeta desde la respuesta de join-code cuando `request('read')` falla inmediatamente despues de asignar la score card.
- Validacion esperada: en LAB R203, el iPhone que ya consumio `6D5ECEC172` debe entrar a la score card asignada sin quedar en `NO SE PUDO PREPARAR EL EVENTO`.

## R202 · recuperación de score card asignada tras código de torneo · 8 de octubre de 2026

- Evidencia de datos LAB: `6D5ECEC172` quedó consumido por `device:762b62b9-401e-4ae7-aa28-ecf44b3633a1`; existe membresía scorer para `Jaime`, categoría `senior`, tee `Blanco`, HDCP 13, dentro del torneo `EPG Produccion`.
- Escape detectado: R201 corrigió el retry Producción/LAB, pero no blindó el paso siguiente; después de asignar la score card, `openAssignedCard` dependía exclusivamente de `request('read', event)`.
- Corrección backend: `api/_lib/personal-event-access.js` devuelve en join-code los datos mínimos de preparación: cuenta, rol scorer, grupo y jugadores.
- Corrección frontend: `personal-events.js` reconstruye un resultado válido desde join-code si el read inmediato falla, preservando el evento, la modalidad y los jugadores asignados.
- Validación esperada: ingresar el mismo código en el mismo iPhone ya no debe quedar bloqueado en `NO SE PUDO PREPARAR EL EVENTO`; debe abrir la tarjeta personal asignada.
- Estado: pendiente build Vercel posterior al gate ROADMAP.

## R201 · ingreso de torneo LAB desde Producción sobre Stableford R200 · 7 de octubre de 2026

- Reproducción física del usuario: Producción mostraba R200 y el código LAB `6D5ECEC172`, pero al entrar devolvía `ACCESO PERSONAL AÚN NO ACTIVADO EN LAB`.
- Diagnóstico: el JS publicado R200 era `R200-STABLEFORD-GROSS-POINTS-R199-TOURNAMENT-JOIN`; su `requestTournamentCode` sólo reintentaba el peer ante `LIVE_JOIN_CODE_INVALID`.
- Corrección: agregar `shouldTryPeerTournamentCode()` y aceptar `PERSONAL_ACCESS_NOT_ENABLED` como condición de retry cruzado.
- Publicación: R201 conserva Stableford R200 y sólo invalida caché/versionado para servir el fix de ingreso al torneo.
- Estado: gates dirigidos, build y publicación R201 pendientes.

## R200 · Stableford sin HDCP, Gross y Puntos · 7 de octubre de 2026

- Tarjetas Stableford Global y Personal: sin HCP, HDCP ni Neto. Gross blanco; todos los puntos verdes.
- RESULTADOS muestra VUELTA IN, VUELTA OUT y VUELTA COMPLETA con Gross y Puntos.
- Regresión: `test-card-artifacts.mjs` y `test-lab-r60-card-mode-purity.mjs`; conservan resultados de Medal Play, Match Play, Four Ball y Universales.
- Integración sobre R199 para conservar el ingreso cruzado Producción/LAB.
- Archivos: `card-artifacts.js`, `test-card-artifacts.mjs`, `test-lab-r60-card-mode-purity.mjs`, `index-grupal.html`, `service-worker.js`, `release.json`, ambos ROADMAPS, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `REGISTRO_REINCIDENCIAS_CALIDAD.md`, `INVENTARIOS_V311.lock.json`.
- Estado: tarjeta real comprobada en la aplicación LAB; build combinado R200 publicado.

## R196 · Texto de WhatsApp de tarjetas digitales · 7 de octubre de 2026

- Regresión: `test-lab-r60-card-share-mode-labels.mjs` verifica el texto de tres líneas en tarjetas compartidas y bloquea los rótulos anteriores.
- Al compartir cualquier tarjeta digital, el texto queda en tres líneas: `Score Card`, el campo y la fecha.
- Se aplica a tarjetas Globales, personales, del historial y envíos a jugadores; se omiten torneo, modalidad, nombres de destinatarios y SHA-256.
- El título de compartir también queda como `Score Card`.

## R195 · Corrección de tarjeta digital Medal Play · 7 de octubre de 2026

- En ambas vueltas, la fila verde muestra `PAR` una sola vez al inicio; se eliminan los totales y la `E` de esa fila.
- Se conservan los dígitos de hoyo sin rótulos adicionales y el encabezado central `RESULTADOS`.
- Los subtotales quedan como `VUELTA IN`, `VUELTA OUT` y `VUELTA COMPLETA`.
- Prueba de regresión: `test-card-artifacts.mjs`; estado de publicación se registra tras completar los despliegues LAB y Producción.

## R194 · QuickType en nombres: retirar transformación a mayúsculas · 7 de octubre de 2026

- La prueba física R193 seguía fallando aun después de actualizar el alias del Laboratorio.
- Causa raíz confirmada: reglas CSS de `.new-round-card input` y `.stableford-player-grid input` aplicaban `text-transform: uppercase` al nombre. WebKit documenta que QuickType deja de insertar candidatos en inputs con esa transformación.
- Corrección: sólo los campos de nombre de Registro y Stableford usan `text-transform: none`; las demás entradas mantienen su formato.
- Regresión `test-r194-ios-quicktype-uppercase-style.mjs` bloquea la regresión CSS; la prueba R193 valida además la persistencia del valor final.
- Estado: CSS Y PRUEBAS DIRIGIDAS PASS; BUILD INTEGRAL/PREVIEW R194 PENDIENTES; NUEVA PRUEBA IPHONE PENDIENTE; PRODUCCIÓN INTACTA.
- Recuperación de entrega R194: el control remoto detectó que el HTML se había transmitido incompleto; se restauró el archivo íntegro, se recalculó el sello desde las 924 fuentes y se relanza el build LAB. No cambia el comportamiento de la corrección.

## R193 · QuickType: aceptar y guardar la sustitución del teclado iOS · 7 de octubre de 2026

- R192 no pasó la prueba real del usuario: al tocar la palabra sugerida en iPhone, el campo no la aceptó.
- Se quitó `inputmode="text"` y `autocomplete="name"` de los nombres para dejar el teclado de texto estándar de iOS con autocorrección.
- En `beforeinput` se detecta `insertReplacementText` y se guarda el valor final en la siguiente tarea, después de que WebKit aplica la sugerencia; no se rerenderiza el campo. Aplica a Registro y Stableford.
- Regresión `test-r193-ios-quicktype-replacement.mjs`: simula evento previo a sustitución, aplicación posterior de la sugerencia y persistencia del texto final.
- Estado: REGRESIÓN Y BUILD PENDIENTES; VISTA PREVIA R193 POR GENERAR; ESPERANDO NUEVA PRUEBA FÍSICA; PRODUCCIÓN INTACTA.

## R192 · Teclado y dictado nativo del iPhone en Registro · 7 de octubre de 2026

- Causa corregida: el manejador delegado tenía un `return` truncado y no ignoraba limpiamente eventos que no pertenecían a los campos editables.
- Los nombres de Registro y Stableford declaran `autocorrect`, `spellcheck`, `autocapitalize`, `inputmode=text` y el teclado siguiente para habilitar QuickType y dictado nativo de iOS.
- El Registro conserva el texto de `insertReplacementText` literalmente, guarda el borrador al recibirlo y aplaza el analizador de frases hasta terminar la composición/dictado.
- `test-r192-ios-keyboard-entry.mjs` reproduce sugerencia, tildes, composición/dictado y persistencia; conserva el analizador de frases completas autorizado.
- La captura de micrófono propia de la página sigue bloqueada. Dictado nativo iPhone, revisión iPhone físico y publicación permanecen pendientes de aceptación física.
- Archivos R192: `index-grupal.html`, `release.json`, `service-worker.js`, `scripts/build-manual-lab.mjs`, `test-r192-ios-keyboard-entry.mjs`, `test-v355-ios-audio-dictation.mjs`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, ambos ROADMAPS, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md` e `INVENTARIOS_V311.lock.json`.

## R191 · Código de torneo válido entre LAB y Producción · 7 de octubre de 2026
- Inspección y registro prueban primero el ambiente actual y, solo ante `LIVE_JOIN_CODE_INVALID`, consultan el ambiente par.
- La sesión del dispositivo se establece en el ambiente dueño del código mediante credenciales incluidas; el origen del torneo se conserva para registro, sincronización y lecturas posteriores.
- CORS admite credenciales únicamente entre `epg-caddy.vercel.app` y `golf-sc-gt-lab.vercel.app`; los demás orígenes siguen rechazados.
- Versión R191 sincronizada en `index-grupal.html`, `release.json` y `service-worker.js`.
- Regresión: `test-r191-cross-environment-tournament-entry.mjs` valida rechazo local, reintento remoto, sesión de dispositivo, persistencia del ambiente, lectura posterior y límites CORS.
- Archivos de esta entrega: `api/_lib/cors.js`, `personal-events.js`, `index-grupal.html`, `release.json`, `service-worker.js`, `test-r191-cross-environment-tournament-entry.mjs`, `scripts/build-manual-lab.mjs`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.

## R190 · Cambio de campo desde Registro y código de ingreso del torneo · 7 de octubre de 2026
- Publicación offline R190: `index-grupal.html` y `service-worker.js` coinciden con `release.json` (`20261007-R190`).

- Regresión R190: el test incluye la declaración `async` completa de la función que verifica, evitando compilar un fragmento inválido.

- Control de versión R190: `index-grupal.html` y `release.json` publican `20261007-R190`.

- Registro de esta actualización R190: `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.

- `index-grupal.html`: Registro mantiene los campos seleccionables al editar la ronda activa. Al confirmar, guarda el campo, recalcula el neto con el campo elegido, conserva gross y descarta el cierre oficial anterior para regenerarlo correctamente.
- `personal-events.js`: la confirmación de torneo ya no muestra `CONTINUAR AL SCORE CARD`; el botón queda como `CÓDIGO INGRESO`, copia el código y no navega ni asigna una tarjeta. Regresar desde WhatsApp tampoco abre una Score Card automáticamente. El flujo de grupos privados se conserva.
- Regresiones: `test-lab-edit-round-mode.mjs` verifica campo/modalidad, persistencia y renovación del resultado; `test-organizer-tournament-entry.mjs` comprueba el botón de ingreso, copia sin navegación y que el flujo de grupos privados siga intacto.
- Archivos de esta entrega: `index-grupal.html`, `personal-events.js`, `test-lab-edit-round-mode.mjs`, `test-organizer-tournament-entry.mjs`, `release.json`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_A_DETALLE.md`, `ROADMAP_OVERALL.md`.
- Pruebas de torneo/registro en build: estados de publicación se informan con sus despliegues correspondientes.

## R187 · Scores Torneo conectado a la Score Card activa · 7 de octubre de 2026

- `shortcuts-ui.js`, `index-grupal.html` y `live-hub.js`: Scores Torneo abre exclusivamente el evento asociado a la tarjeta activa; desde otras pantallas primero vuelve a esa tarjeta. Si no hay evento, no abre el directorio general. El catálogo global permanece en Administración de grupos y torneos.
- Se conserva íntegra la entrega R185 de administración/eliminación y retorno de actualización. Release nuevo R187 evita reutilizar R185 y R186.
- Aceptación: `CONTROL_PROYECTO_SCIRE/ACEPTACION_R187_SCORES_TORNEO_SCOPE.md`; pruebas de recuperación, aislamiento, catálogo global y administración.
- Integración canónica: controles `fix-v366-integrated-main` commit `46555c8a1cd230ba7020ec733ddcf204207230c6` incluidos junto con R185 y el ajuste R187; G0-12 permanente preservada.
- Archivos añadidos/ajustados en esta integración: `AGENTS.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/MATRIZ_GATE_0_PROYECTO.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/MATRIZ_GATE_0_PROYECTO.json`, `scripts/project-quality-gate.mjs`, `test-global-public-entry-policy.mjs`, `test-lab-deployment-gate.mjs`, `vercel.json` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.
- Estado: build integral, Gates de proyecto/roadmap/inventario/release y regresiones R181/R163/R185 PASS. Preview y revisión pública Playwright de cuatro transiciones pendientes; Producción sin cambios por R187.

## R185 · 6 de octubre de 2026 · Eliminación de rondas y actualización al regresar

- Archivos: `app-update.js`, `service-worker.js`, `event-administration-ui.js`, `api/event-administration.js`, `api/_lib/event-administration.js`, `test-event-administration.mjs`, `test-r185-round-delete-ui.mjs`, `test-update-delivery-control.mjs`, `scripts/build-manual-lab.mjs` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.
- LAB: cada ronda global tiene ELIMINAR RONDA con dos confirmaciones. API local/remota valida origen, ID, tipo y autoridad; elimina únicamente el stream seleccionado mediante el purgado existente. Cancelar no escribe; doble toque no duplica la petición.
- ACTUALIZAR: las páginas sin meta consultan la versión aprobada del controlador activo con respaldo acotado para controladores antiguos. La actualización completa regresa a Administración; una instalación incompleta no redirige.
- Pruebas locales de actualización y interfaz PASS. El build ejecuta además la prueba SQL de permisos, doble confirmación, ronda independiente/asociada, aislamiento de hermanos y destino remoto; estado y commit quedan en los registros del despliegue.

## R183 · 6 de octubre de 2026 · Simplificación de tarjetas de administración

- Archivos: `event-administration-ui.js`, `test-event-administration.mjs`, `test-r167-admin-share-feedback.mjs` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.
- Se retiran de las tarjetas las líneas de tipo/origen y la nota de autorización. Se conservan nombre, Scores general/categorías, ID/código y acciones.
- Verificación del candidato: sintaxis y renderizado dirigido PASS; regresión R167 actualizada al texto aprobado. Despliegue LAB/Producción pendiente.

## R183 · 6 de octubre de 2026 · Simplificación de tarjetas de administración

- Archivos: `event-administration-ui.js`, `test-event-administration.mjs` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.
- Se retiran de las tarjetas las líneas de tipo/origen y la nota de autorización. Se conservan nombre, Scores general/categorías, ID/código y acciones.
- Verificación del candidato: sintaxis y renderizado dirigido PASS. Despliegue LAB/Producción pendiente.

## R183 · 6 de octubre de 2026 · Simplificación de tarjetas de administración

- Archivos: `event-administration-ui.js` y `test-event-administration.mjs`.
- Se retiran de las tarjetas de torneos y grupos las líneas de tipo/origen y la nota de autorización para Scores/eliminación. Se conservan el nombre, Scores general y categorías, el ID/código y las acciones existentes.
- Verificación del candidato: sintaxis de ambos archivos y prueba dirigida del renderizado PASS. Despliegue LAB/Producción pendiente; no se declara publicado.

<!-- 2026-10-06 R178: ELIMINAR TORNEO usa texto rojo en ID de Torneos; ambos recorridos muestran CONFIRMA ELIMINAR antes de enviar el borrado. Verificación: test-event-administration.mjs, confirmación única y ausencia de petición previa. -->
## R178 · Locución de resultado par como EVEN · 6 de octubre de 2026

- Cuando el resultado relativo al par es cero, el audio dice “EVEN”. Las locuciones de resultados sobre y bajo el par se conservan.
- Archivos de esta corrección: `index-grupal.html`, `service-worker.js`, `test-lab-player-points-audio.mjs` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.
- Conserva el punto de corte `línea 185` y la activación `23 de agosto de 2026, 17:05:00, hora de Guatemala`.

# ROADMAP A DETALLE

## R174 · 6 octubre 2026 · Recuperación de Scores de torneo federado en LAB

- Reproducción física desde Organizador en LAB: la ficha Santa delfina enlazó a `directory_production_36c43fd8-594e-40e3-af6d-13bfd1863f20`; el monitor quedó en `NO SE PUDO COMPROBAR TU PARTICIPACIÓN · REINTENTA` y `NINGÚN TORNEO EN CURSO`.
- Causa: `live-hub.js` esperaba que `GSCPersonalEvents.sync()` terminara correctamente antes de procesar `directoryEvent`. Un fallo de participación local abortaba el arranque aunque el torneo federado estuviera disponible.
- Corrección mínima: la sincronización local se vuelve recuperable, se continúa con la lectura de torneo federado; su vista ya no presenta el aviso de membresía local. Los grupos privados permanecen fuera del directorio público.
- R174 · regresión física del enlace directo: la selección dependía de que el ID ya estuviera en `registeredDirectory`; con directorio vacío/parcial el ID de invitación no abría Scores. `resolveDirectoryEventToken` ahora valida y resuelve el ID `directory_{lab|production}_{uuid}` aun sin entrada precargada. `npm run scores:r174-directory-gate` PASS para lista vacía, torneo listado e ID inválido. Preview y lectura de datos reales pendientes; Producción intacta. Archivos: `live-hub.js`, `test-r174-directory-event-fallback.mjs, test-r167-admin-share-feedback.mjs`.
- Regresión: `test-r174-directory-event-fallback.mjs`; ejecutar con `npm run scores:r174-directory-gate`. verifica que el rechazo de identidad no aborte y que la selección del torneo quede alcanzable. Resultado local: PASS. Producción sin cambios. Primera construcción Preview bloqueada por ROADMAP GATE: el commit del sello de inventario no incluyó ambos ROADMAPS. Este commit vuelve a registrar ambos ROADMAPS junto con los tres PDFs y su lock, regenerados después de este asiento; ROADMAP GATE e INVENTORY GATE locales pasan. Sellado regenerado desde el checkout completo y contenido final de ambos ROADMAPS. Preview y lectura real de scores siguen pendientes.

## R144 · 30 septiembre 2026, 00:42 Guatemala · acceso Neon recuperado; publicación bloqueada

- Proyecto Neon recuperado desde captura IMG/82EFA0E8: `bold-block-51864691`; get_branch confirmó main `br-late-wind-avhgi9s3`. LAB existente `br-bold-bar-avzn813n`; candidato nuevo hijo exclusivamente LAB `br-small-mouse-av0f24o9` / `lab-live-oneuse-r144-20260930`, endpoint `ep-fragrant-pine-av6xi8hy`. No escrituras en main.
- Esquema de códigos aplicado únicamente al candidato; columna mode aditiva presente. Conector Neon: ocho solicitudes simultáneas de la sentencia CTE de consumo; una inserción y siete resultados vacíos; consulta independiente sessions=1. PASS de concurrencia SQL real, no equivale a aplicación desplegada.
- `test-live-share-neon.mjs`: prueba explícita de endpoint candidato, nunca DATABASE_URL. Ejecución local hacia Neon BLOQUEADA por DNS EAI_AGAIN; verificación CTE realizada mediante conector. Suite completa remota pendiente.
- Vercel `deploy_to_vercel`: respuesta real Tool not found, aun anunciado en catálogo. Sin credencial CLI disponible. Configuración DATABASE_URL del proyecto Vercel actual no comprobada. Nueva API sigue desactivada en remoto; no entrega ni enlace nuevo ni commit de publicación. Próxima acción: habilitar vía de configuración/despliegue Vercel y verificar LAB completo.
- Archivos de recuperación: `test-live-share-neon.mjs`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R144/NEON_Y_PUBLICACION.md`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R144/ESTADO.md`, `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`.

## R144 · 29 septiembre 2026, 23:03 Guatemala · COMPARTIR LIVE de primer uso

Última orden expresa del propietario 22:35: al tocar COMPARTIR LIVE dar un código, enviarlo y quemarlo al primer uso, como Ronda Particular. Sustituye para esta operación la propuesta de verificación telefónica/aprobación del organizador. No requiere proveedor SMS, cuenta nueva ni intervención del organizador.

- `api/live-share.js`, `api/_lib/live-share.js`: endpoint separado, validación de tarjeta inscrita autenticada, código aleatorio legible 12 caracteres, hash y vencimiento, consumo/sesión en una sentencia, cookie HttpOnly/Secure, permisos de lectura, revocación y límite de intentos. No devuelve claves del escritor o viewerToken heredado; no proxy a Producción. Enlace anterior sin usar puede ser consumido por quien lo abra primero: no se afirma prueba de identidad ni control del teléfono.
- `live-share.js`: diálogo con código, enlace/mensaje preparado para WhatsApp, compartir/copia alternativos, sesión del receptor y limpieza de fragmento; X/Escape y foco conservado. No se afirma entrega del mensaje.
- `live-hub.js`, `live-hub.html`, `private-rounds.js`, `index-grupal.html`, `scores-ui.css`, `service-worker.js`, `middleware.js`: integración en ambas pantallas existentes, destino directo, invitados sin botón, favoritos propios, detalle con evento real, nulos seguros, ayuda fija. Alta/publicación oficial y accesos privados existentes conservados.
- Se retiran los cuatro archivos locales de la propuesta no conectada de verificación por teléfono: personal-access.js, personal-access-lab.sql y sus dos pruebas; historial de esta propuesta en R144 anterior ya no es requisito vigente.
- `test-live-share-postgres.mjs`, `test-live-share-handler.mjs`, `test-live-share-middleware.mjs`, `test-live-share-browser.cjs`, `scripts/live-share-test-server.mjs`, `scripts/build-manual-lab.mjs`, `package.json`: SQL real local, primer consumo único, revocación, ámbito del evento, read-only, límite de intentos, aislamiento, regresión y navegador contra API real/base local aislada. PASS; PGlite de una conexión no sustituye prueba multi-conexión Neon. Build completo PASS, capturas 390×844 revisadas.
- Evidencia versionable en `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R144/`: sólo fixtures de prueba y log de build, sin credenciales reales.
- Pendiente exclusivo de servicio: base LAB aislada identificada/configurada y revisión de deployment real. Health del LAB publicado devuelve 401 ACCESS_REQUIRED; no se pudo comprobar aislamiento. Flag GSC_LIVE_SHARE_LAB_READY deniega antes de DDL hasta verificación. Proveedor telefónico ya no bloquea. Sin commit de entrega, push, despliegue ni escritura remota. Producción y remoto LAB R143 intactos, confirmado por git ls-remote.
- Archivos registrados: `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/MATRIZ_LIVE_CODIGO_UN_SOLO_USO_R144.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_LIVE_018_GOLF_SCORE_CARD_GT_LIVE.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R144/`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `ROADMAP_A_DETALLE.md`, `ROADMAP_OVERALL.md`, `api/_lib/live-share.js`, `api/live-share.js`, `api/live.js`, `index-grupal.html`, `live-hub.html`, `live-hub.js`, `live-share.js`, `middleware.js`, `package.json`, `private-rounds.js`, `scores-ui.css`, `scores-ui.js`, `scripts/build-manual-lab.mjs`, `scripts/live-share-test-server.mjs`, `service-worker.js`, `test-lab-global-operational-audit.mjs`, `test-lab-medal-monitor.mjs`, `test-lab-no-production-proxy.mjs`, `test-lab-r60-production-refresh.mjs`, `test-lab-shortcuts-navigation.mjs`, `test-lab-tournament-navigation.mjs`, `test-live-share-browser.cjs`, `test-live-share-handler.mjs`, `test-live-share-middleware.mjs`, `test-live-share-postgres.mjs`, `test-manual-no-assistant.mjs`, `test-private-scores-browser.cjs`, `test-scores-ui-browser.cjs`, `test-scores-ui.mjs`.


## R144 · 30 septiembre 2026 · candidato local en curso, NO entregado

- Base recuperada: LAB R143 `013f046c44bd3b793ac86c5f02abb034c589badd`; matriz aprobada `Matriz_Acceso_Ronda_y_Torneo.md`, versión 4 de Library, 30 septiembre 2026. Producción no modificada; sin push, despliegue ni migración remota.
- Scores compartido en Torneos y Ronda Particular: título 20.25 px, logo horizontal original 145 px, metadatos reales 16 px, tabla compacta, favoritos personales y detalle por doble toque con 18 G/N en dos filas de nueve. Ausentes = —; X/Escape cierran sin cambiar filtro. Búsqueda actualiza tabla; favoritos caducados se pueden quitar.
- Regresión heredada ajustada a aprobaciones vigentes (CREAR EVENTO, GENERAL/CATEGORÍA y actualización explícita), sin retirar verificaciones de cálculo, navegación o funciones retiradas. Build técnico completo repetido tras integración de cuatro regresiones nuevas: PASS.
- Revisión Firefox 390×844: GENERAL, CATEGORÍA, estrella independiente, favorito con 18 posiciones y X/Escape PASS, sin errores JS. Evidencia local temporal `/tmp/golf-mobile-detail.png`, `/tmp/golf-mobile-favorites.png`; fixture demo identificado, no datos reales. Ronda Particular revisada mediante fixture de API aislado; no equivale a prueba de backend real.
- API LAB sin DATABASE_URL falla cerrada y no usa proxy a Producción; prueba de cero llamadas upstream PASS.
- Base de permisos personales y esquema SQL preparados, NO conectados ni aplicados: roles, caducidad, revocación, cookie HttpOnly, hashes, consumo en una sentencia CTE. Test unitario valida contrato SQL, NO certifica concurrencia real.
- Bloqueo preciso: la matriz deja pendiente selección/configuración del proveedor de verificación telefónica. No existe prueba de control del teléfono implementada, ni se ha verificado una base LAB aislada para estas tablas. Conector Neon no está asociado a un proyecto: list_branches exige project_id; repositorio/mapa no lo documentan y no hay NEON_API_KEY ni VERCEL_TOKEN local. NO activar códigos personales, sesiones, permisos o compartir LIVE como completos; el flujo heredado sigue activo en LAB remoto R143.
- Pendientes obligatorios: proveedor y prueba real, integración server/client de autorizaciones y enlace LIVE sin bearer compartido, restricción de compartir a inscritos, concurrencia y regresión end-to-end contra base LAB aislada; luego build/gates/revisión visual integral, commit y despliegue exclusivamente LAB. Sin certificación integral ni nueva entrega.
- Archivos del bloque: `scores-ui.js`, `scores-ui.css`, `index-grupal.html`, `live-hub.html`, `live-hub.js`, `private-rounds.js`, `service-worker.js`, `api/live.js`, `api/_lib/personal-access.js`, `sql/personal-access-lab.sql`, `test-scores-ui.mjs`, `test-scores-ui-browser.cjs`, `test-personal-access.mjs`, `test-lab-no-production-proxy.mjs`, `test-lab-private-rounds.mjs`, `scripts/build-manual-lab.mjs`, `test-lab-medal-monitor.mjs`, `test-lab-r60-production-refresh.mjs`, `test-manual-no-assistant.mjs`, `test-lab-tournament-navigation.mjs`, `test-lab-shortcuts-navigation.mjs`, `test-lab-global-operational-audit.mjs`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.


## R140 · 29 septiembre 2026 · nombres limpios en Ronda Particular

- `private-rounds.js`: cada fila muestra sólo el nombre del jugador; se retira el texto SCORES ACTUALIZADOS. El mensaje compartido contiene únicamente Ronda [nombre] y el código en la segunda línea, sin etiqueta. Se conservan columnas, cálculo, refresco automático y diseño.
- `live-hub.html`: botones TORNEOS REGISTRADOS y RONDAS PARTICULARES con la misma clase, tamaño y fuente; cada botón abre su lista. Se retira ELIGE UN TORNEO · PUEDES GUARDAR HASTA 5 y CREAR RONDA PRIVADA de Torneos; la creación sigue en la tarjeta.
- Corrección basada en capturas IMG_5319/IMG_5322; release y caché R140 para entregar la misma corrección en iPhone. Prueba dirigida de rondas particulares y matriz de release. Rollback LAB R139 dpl_9eTW16V8vUB5gU8fHGNF5ndcTJP9.

## R139 · 29 septiembre 2026 · Ronda Particular con nombre, código y grupos

- Alcance exclusivo: MI RONDA → RONDA PARTICULAR; creación por nombre y código compartible; RONDAS PARTICULARES en Torneos con lista, selección y código obligatorio. Se conservan diseño, botones y funciones existentes.
- `private-rounds.js`: diálogo de creación, código, ingreso y tabla Nombre | HDCP | Hoyo | Gross | Neto | +/−; actualización cada 10 segundos. +/− es neto contra par de los hoyos jugados; 79 − 14 = 65, contra par 72 resulta −7.
- `api/live.js`: tablas independientes `live_private_rounds`, `live_private_streams`, `live_private_events`, inicialización aditiva desde esquema LIVE vigente; código verificado para la ronda seleccionada, secretos sólo después de validación. Torneos, incluidos clientes anteriores, no pueden listar ni unir esas rondas.
- `live-control.js`: pertenencia y cola privateStream separadas; escritor oficial publica cambios y correcciones sin sustituir el LIVE existente; reintento online y conflicto de revisión. Creador sin tarjeta iniciada se conecta al persistir el Registro.
- Evidencia: `test-lab-private-rounds.mjs`, diálogo existente, recuperación de actualización y matriz de release. Pruebas antiguas V352/V353 fallan en supuestos previos (middleware idéntico a HEAD y fixture demo renombrado); no se declara PASS integral. Navegador local no disponible; comprobación en despliegue pendiente.
- Rollback: LAB R138 `dpl_6XBceK6sXkEqW3K94GynTNfKjJWq`, remoto `6c41fd91ce52cb9a79a86fae72ce25ecfc6235b2`; tablas nuevas no alteran datos anteriores. Maestro `epg-caddy` intacto.


## R136 · 29 septiembre 2026 · acciones de CREAR EVENTO y Registro

- `index-grupal.html`: cambia el rótulo `EVENTO` por `CREAR EVENTO`, retira el acceso y handler de RONDA PREVIA del Registro general, elimina `+ JUGADOR` y su ruta de altas posteriores; el editor sólo expone la cantidad de jugadores ya registrados y rechaza altas por dictado. La captura normal de jugadores al iniciar una ronda se conserva.
- `live-hub.js`: al abrir el portal de Torneos, limpia el estado operativo en vez de emitir `ELIGE UNA FUNCIÓN O UN TORNEO`; se conservan torneos y acciones de resultados.
- `test-lab-tournament-navigation.mjs`: valida que la función operativa del portal no emita el mensaje eliminado.
- `release.json` y la cabecera de `index-grupal.html`: identifican R136.
- `test-lab-round-create-modal.mjs`, `test-v263-compact-players-back-button.mjs`, `test-v253-live-previous-round.mjs`, `test-v304-homogeneous-registration-actions.mjs`: cubren rótulo, ausencia de controles y handlers de alta, protección por voz, retorno ATRÁS e historial conservado.
- Archivos de control: ambos ROADMAPS, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_LIVE_018_GOLF_SCORE_CARD_GT_LIVE.md` e `INVENTARIOS_V311.lock.json`.
- Estado: pruebas dirigidas, build integral LAB, calidad, ROADMAP e inventario PASS. Revisión visual en navegador y Preview pendientes. Producción intacta.

## R135 · 29 septiembre 2026 · compatibilidad al vincular Friends

- `live-hub.js`: conserva en la selección del evento el código de unión devuelto por LIVE, además del ID.
- `live-control.js`: conecta por ID cuando el servidor admite la acción; ante acción no soportada/404, reintenta por código con `join_tournament`. Conserva los reintentos, no sustituye el escritor oficial de Score y publica el roster registrado al guardar la ronda.
- `api/live.js`: incluye `join_tournament_by_id` en la lista de acciones que requieren origen autorizado de la app.
- `index-grupal.html` y `release.json`: identifican el shell LAB como R135.
- `test-lab-round-create-modal.mjs`: cubre el código persistido, la alternativa compatible, la validación de origen y el reintento.
- Archivos modificados: `api/live.js`, `index-grupal.html`, `live-control.js`, `live-hub.js`, `release.json`, `service-worker.js`, `test-lab-round-create-modal.mjs`, ambos ROADMAPS, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_LIVE_018_GOLF_SCORE_CARD_GT_LIVE.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md` e inventario LAB.
- PASS: prueba Friends, navegación TORNEOS, release, calidad, ROADMAP e inventario. Build integral LAB PASS. Revisión automática de navegador/recorrido real sigue pendiente al publicar Preview. Producción intacta.

## R133 · 29 septiembre 2026 · conservar jugadores al crear ronda Friends

- `live-hub.js`: después de guardar el nombre del evento, navega a `manual_action=friends-round`; no usa la acción estándar `setup`, que borra el borrador y la tarjeta recuperada.
- index-grupal.html: la ruta Friends espera al enrutador de Registro sin disparar el borrado automático. openFriendsRoundDraft precarga los jugadores del borrador o, en su ausencia, de la tarjeta activa o el archivo más reciente; conserva hándicap, categoría, marcas y contacto, y deja vacíos los scores del nuevo juego. El scorecard anterior permanece guardado hasta confirmar INICIAR RONDA.
- `test-lab-round-create-modal.mjs`: valida la ruta no destructiva, fuente de roster y protección contra el inicio automático que borraba jugadores.
- Release `LABORATORIO-20260929-R133`. Cambios en `live-hub.js`, `index-grupal.html`, prueba focalizada, `release.json`, ambos ROADMAPS, registro de reincidencias e inventario. Producción intacta. Preview y pruebas de recorrido pendientes.

## R132 · 28 septiembre 2026 · conexión de Friends y lista directa

- `live-control.js`: al persistir una ronda configurada, conecta la tarjeta al torneo que quedó seleccionado al crear Friends. Crea el stream inicial con todos los jugadores registrados y conserva el grupo para seguir publicando cambios; el reintento vuelve a activarse al recuperar conexión.
- `live-hub.js`: reconoce los torneos creados como ronda de grupo, conserva el monitor general existente para torneos normales y muestra `NOMBRE · HDCP · HOYO · GROSS · NETO · +/-`, ordenado por score y después por hoyo actual más avanzado.
- `live-hub.html`: oculta filtros, paneles y opciones sólo durante la vista compacta de Friends y deja la lista de jugadores como contenido principal, con tipografía compartida con las tarjetas y texto en mayúsculas.
- `index-grupal.html` y `release.json`: versión identificable R132 para invalidar el shell anterior y permitir probar el recorrido actualizado.
- `test-lab-round-create-modal.mjs`: añade regresión de conexión automática, memoria de la ronda conectada, presentación Friends y orden score/hoyo; permanece integrado en el build LAB.
- `test-lab-medal-monitor.mjs`: el fixture aislado declara que su torneo estándar no es una ronda Friends y conserva las aserciones de columnas del monitor general.
- Incidencia registrada en `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`. Inventario vuelve a sellarse en `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.
- Estado: regresiones focalizadas, build integral LAB y gates de calidad/release/ROADMAP/inventario PASS. Deployment Preview y recorrido real completo Score→Friends→Score pendientes. Producción sin cambios.

## R131 · 28 septiembre 2026 · alta de ronda desde TORNEOS

- `live-hub.html`: el botón `CREAR RONDA` abre un diálogo modal con nombre y `OK`; permanece cerrado hasta que se solicita y ofrece cierre explícito.
- `live-hub.js`: valida nombre y cupo antes de crear; guarda el torneo activo y las credenciales de organización para que se puedan incorporar grupos; `OK` cierra el diálogo y abre el Registro de Score existente con el torneo seleccionado. Los errores 42703 y de configuración faltante se muestran con diagnóstico claro.
- `test-lab-round-create-modal.mjs`: protege diálogo bajo demanda, nombre obligatorio, límite de cinco, error de esquema, selección del torneo y salto al Registro. Se integra a `scripts/build-manual-lab.mjs`.
- `test-lab-update-recovery.mjs`: añade el stub ausente `fetchPublishedRelease` a su contexto aislado de prueba; corrige el bloqueo heredado del build sin cambiar el Service Worker ni la app.
- `test-lab-r60-production-refresh.mjs` y `test-manual-no-assistant.mjs`: comparan `index-grupal.html` con `release.json` actual y validan el mecanismo de actualización del Service Worker, sin exigir el número histórico R128.20.
- `test-lab-shortcuts-navigation.mjs`: valida `EVENTO`→TORNEOS como acceso desde Inicio, sin agregar un segundo botón.
- `test-lab-global-operational-audit.mjs`: sustituye la expectativa obsoleta `CENTRO DE TORNEOS` por la acción `EVENTO`→TORNEOS; el build LAB completo vuelve a validar la pantalla de Inicio sin requerir controles adicionales.
- `index-grupal.html` y `release.json`: R131; el botón `EVENTO` existente en Inicio lleva a TORNEOS tras persistir el borrador, donde está el único control que abre la ventana de nombre.
- La migración `database/005_live_tournament_mode.sql` (`8b5d6fc9-33fd-4bec-8a54-b244bcfa57a6`) se preparó y probó en Neon temporal `br-withered-cell-av876aco`; una inserción sintética devolvió `mode=general`, `status=active`, revisión 0. Parent compartido: `br-late-wind-avhgi9s3`. La tabla compartida carece de `mode`, causa confirmada del 503/42703. Neon MCP exige aprobación antes de aplicar a main.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`: regenerado con los tres inventarios PDF para sellar el árbol actualizado de Laboratorio.
- Producción web permanece intacta. La migración compartida y revisión de navegador LAB están pendientes.

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
| `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md` | `HONEST-STATUS` | Registran código implementado y mantienen abiertas credencial, destino, Guatemala/Waze e iPhone.…98243 tokens truncated…ización, código MJQGB9XDBS y regreso al registro. La prueba detectó pérdida del nombre visible al volver y rechazo de torneo tras preflight autorizado. Se captura el DOM del registro antes de evaluar el grupo y se conserva la identidad validada en la llamada interna a Live. Regresión de identidad: proveedor distinto no puede reemplazar al dispositivo autenticado. Verificación de nuevo Preview y publicación todavía PENDIENTES; no se declara prueba de iPhone ni de todos los botones.

R24-B5 · 15:53 Guatemala: segundo Preview ad0f947 reprodujo pérdida del borrador incompleto al regresar y error400 de torneo autorizado. persistDraftState guardaba sólo draftPlayers completos; ahora guarda/restaura manualRows sin fabricar handicap/categoría/marcas ni asignarlos al evento. La copia de petición interna ahora preserva method y headers heredados de IncomingMessage además de la identidad validada. Regresión usa headers heredados y proveedor con otra identidad. Preview final pendiente; no promoción de un candidato con FAIL.

Orden15:54 Guatemala: pantalla principal y Scores usan MI GRUPO / SCORES MI GRUPO (ID DE MI GRUPO y compartir grupo); CREAR MI RONDA conserva el nombre solicitado15:19. Etiquetas sin modificar IDs, destinos, asignaciones ni datos.

Orden15:55–15:56 sustituye la excepción anterior: CREAR MI GRUPO, MI GRUPO, SCORES MI GRUPO; función particular usa grupo en formularios, resultado y código compartido. Claves técnicas y datos existentes no cambian.

Orden16:09: SCORES MI GRUPO debe abrir18 scores al doble clic. Prueba8666516 detectó botón buscando evento privado desde tarjeta de torneo y mensaje oculto: nueva vista del grupo actual toma snapshot del escritor oficial, conserva asignación y enlaza detalle18 mediante GSCScoresUI.bindRows. Torneo creado por OK código F3FGF4DXZ8; grupo sin permiso código SS8ESQXKEA; copiar verificado pegando; regreso preserva registro incompleto y tarjeta Gross5/Net4. Preview final de Scores pendiente.

### R24-B5 · verificación final de creación y detalle · 2 octubre 2026 16:20 Guatemala
Orden16:13: doble clic/doble toque abre los18 hoyos por jugador en Mi Grupo, Torneos, General, Favoritos y Categorías. Preview ca145942 READY dpl_9RR69PCfmqKeMiAEDecM7Foty6qM. Navegador Chrome real: Registro completo QA GRUPO18 HOYOS/Senior/HCP14/Blancas → OK → revisar → iniciar → teclado5 → SCORES MI GRUPO → dobleclic: tablas1–9/10–18, Gross5/Neto4, cierre conserva tarjeta. General del torneo F3FGF4DXZ8: acceso por código y dobleclic18 PASS; CategoríaSenior dobleclic18 PASS; favorito★ → MIS FAVORITOS → dobleclic18 PASS. Creación particular sin permiso SS8ESQXKEA y torneo autorizado F3FGF4DXZ8 ya comprobadas en8666516; copia pegada y continuidad del borrador comprobadas. Banco integral final build-manual-lab PASS, sin cambios funcionales posteriores. No se declara prueba física de iPhone, WhatsApp enviado ni totalidad de botones. Actualización del dispositivo sigue manual. Entrega de este árbol a LAB/Producción autorizada previamente; estado de despliegue se comprobará tras mover referencias.

### R24-B6 · 2026-10-02 16:28 Guatemala · principal MI GRUPO
IMG_5656 confirmó etiqueta GRUPO PARTICULAR incorrecta en registrationJoinRound. Se corrige a MI GRUPO; destino de ingreso por código permanece. CREAR MI GRUPO y SCORES MI GRUPO ya estaban operativos. Error escapó por verificar creación y scores sin exigir nombre exacto de modalidad; test-r24-event-creation-feedback.mjs exige ahora MI GRUPO en ese botón. Archivos: index-grupal.html, test-r24-event-creation-feedback.mjs, release.json, service-worker.js; B6 permite actualización manual después de B5. Sin cambio de motor, datos ni autorización. Rollback8a05fd1.

Orden16:29: fecha automática Guatemala, sin calendario. live-hub.html hubRoundDate y personal-events.js personalRoundDate pasan a texto readonly; mantienen valor automático actual. No nueva pantalla ni selección de fecha al crear.


### R24-B7 · 2 octubre 2026 · accesos Scores del menú

Orden expresa 17:09 Guatemala: SCORES TORNEO, SCORES MI GRUPO, SCORES GENERAL, MIS FAVORITOS y SCORES CATEGORÍAS en el menú. Se mantienen destinos existentes y se agrega acceso al snapshot oficial del grupo actual desde tarjeta y retorno desde hub. No modifica cálculos, permisos ni datos. B6 conservado como base 98a8631; publicación pendiente de banco integral y navegador B7. B6 navegador real: OK, INICIAR RONDA, entrada5, Scores Mi Grupo, doble clic y detalle18 Gross5/Neto4 comprobados; no certifica iPhone.

Archivos de esta versión:
- `index-grupal.html` · menú Scores B7, regresión, release o control correspondiente.
- `release.json` · menú Scores B7, regresión, release o control correspondiente.
- `service-worker.js` · menú Scores B7, regresión, release o control correspondiente.
- `shortcuts-ui.js` · menú Scores B7, regresión, release o control correspondiente.
- `test-lab-global-operational-audit.mjs` · menú Scores B7, regresión, release o control correspondiente.
- `test-lab-shortcuts-navigation.mjs` · menú Scores B7, regresión, release o control correspondiente.
- `test-menu-scorecard-tournament-sync.mjs` · menú Scores B7, regresión, release o control correspondiente.
- `ROADMAP_OVERALL.md` · menú Scores B7, regresión, release o control correspondiente.
- `ROADMAP_A_DETALLE.md` · menú Scores B7, regresión, release o control correspondiente.
- `CONTROL_PROYECTO_SCIRE/ACEPTACION_R147_2_4_24.md` · menú Scores B7, regresión, release o control correspondiente.
- `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md` · menú Scores B7, regresión, release o control correspondiente.
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` · menú Scores B7, regresión, release o control correspondiente.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` · menú Scores B7, regresión, release o control correspondiente.

- `test-lab-r60-physical-matrix.mjs` · exige los cinco nombres exactos del menú ordenados para B7.

- `scripts/manual-screen-parity-gate.mjs` · control de nombres del menú actualizado a la orden B7; resto del banco conservado.


### R24-B8 · 2 octubre 2026 17:22 Guatemala · Scores agrupados
Orden más reciente: todos los Scores juntos; SCORES POR CATEGORÍA y MIS FAVORITOS. Sección SCORES exclusiva con cinco accesos contiguos: TORNEO, MI GRUPO, GENERAL, POR CATEGORÍA y FAVORITOS. Buscar y otras funciones fuera del bloque. Destinos y permisos sin cambio. B7 READY ambos dominios: dpl_pPbsZqWJFaWKshMfCTWx3CCFVyVi / dpl_3VNVqkBvxTAWjNSbosqxxPb4H8GY. Navegador real verificó cinco rutas, detalle18, retorno5/4 y ACTUALIZAR preservando registro. LAB creó QA LAB B7 CODIGO y devolvió código64WHBJ8RHF; Preview no configurado para API personal. No se declara iPhone ni WhatsApp enviado. B8 pendiente Preview y publicación.
- `shortcuts-ui.js` · agrupación, nombre, release, regresión o control B8.
- `index-grupal.html` · agrupación, nombre, release, regresión o control B8.
- `service-worker.js` · agrupación, nombre, release, regresión o control B8.
- `release.json` · agrupación, nombre, release, regresión o control B8.
- `test-lab-shortcuts-navigation.mjs` · agrupación, nombre, release, regresión o control B8.
- `test-lab-global-operational-audit.mjs` · agrupación, nombre, release, regresión o control B8.
- `test-lab-r60-physical-matrix.mjs` · agrupación, nombre, release, regresión o control B8.
- `scripts/manual-screen-parity-gate.mjs` · agrupación, nombre, release, regresión o control B8.
- `ROADMAP_OVERALL.md` · agrupación, nombre, release, regresión o control B8.
- `ROADMAP_A_DETALLE.md` · agrupación, nombre, release, regresión o control B8.
- `CONTROL_PROYECTO_SCIRE/ACEPTACION_R147_2_4_24.md` · agrupación, nombre, release, regresión o control B8.
- `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md` · agrupación, nombre, release, regresión o control B8.
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` · agrupación, nombre, release, regresión o control B8.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` · agrupación, nombre, release, regresión o control B8.


### R24-B9 · 2 octubre 2026 · Cursor de hoyo, títulos fijos y eliminación visible
Reporte del propietario IMG_5660/5661: comenzó hoyo1, detalle mostraba5–8; nombres de torneos permiten selección iOS; eliminación oculta. SQL de solo lectura LAB br-small-mouse-av0f24o9 confirmó stream de Santa Delfina con hoyos5–8 en origen, no desplazamiento de render. Causa reproducida: roundManualEntry restablecía el hoyo visible para la ronda nueva, pero conservaba activePlayerId y roundScoreKeypadState del hoyo previo. B9 limpia estado al confirmar nueva ronda, sincroniza cursor/render y restablece1 al borrar scores. Regresión prev5→nueva1/10 y cursor desincronizado PASS. No reindexar rondas válidas que comiencen en otro hoyo. Recuperación específica registrada como audit42 LAB: conserva snapshot íntegro antes de cambio, roundId exacto y Gross por jugador. API autenticada devuelve manifiesto; cliente aplica una sola vez 5–8→1–4, recalcula con motor oficial y vuelve a publicar. Rechaza otra ronda, Gross distinto o destinos ocupados. No hay reindexación genérica. Aplicación real en dispositivo del propietario pendiente de actualización.
Títulos estáticos de Scores/torneos y descendientes de botones sin selección/callout iOS; campos editables conservan selección. Eliminación visible en listado de torneos, Scores de evento, grupos particulares con autoridad devuelta por API existente; lleva al mismo diálogo con nombre/motivo/comprobante, sin ampliar permisos ni eliminar automáticamente. Historial añade ELIMINAR RONDA visible y conserva pulsación prolongada. Rollback B8 aed466dee4cd4e796f9485dcdc21bc8608ac09c4. Banco integral/navegador/publicación pendientes al registrar.
- `index-grupal.html` · cursor, títulos, eliminación, prueba, release o control B9.
- `live-hub.js` · cursor, títulos, eliminación, prueba, release o control B9.
- `live-hub.html` · cursor, títulos, eliminación, prueba, release o control B9.
- `scores-ui.css` · cursor, títulos, eliminación, prueba, release o control B9.
- `personal-events.js` · cursor, títulos, eliminación, prueba, release o control B9.
- `private-rounds.js` · cursor, títulos, eliminación, prueba, release o control B9.
- `event-administration-ui.js` · cursor, títulos, eliminación, prueba, release o control B9.
- `test-scores-ui.mjs` · cursor, títulos, eliminación, prueba, release o control B9.
- `test-v398-manual-opening-hole.mjs` · cursor, títulos, eliminación, prueba, release o control B9.
- `release.json` · cursor, títulos, eliminación, prueba, release o control B9.
- `service-worker.js` · cursor, títulos, eliminación, prueba, release o control B9.
- `ROADMAP_OVERALL.md` · cursor, títulos, eliminación, prueba, release o control B9.
- `ROADMAP_A_DETALLE.md` · cursor, títulos, eliminación, prueba, release o control B9.
- `CONTROL_PROYECTO_SCIRE/ACEPTACION_R147_2_4_24.md` · cursor, títulos, eliminación, prueba, release o control B9.
- `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md` · cursor, títulos, eliminación, prueba, release o control B9.
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` · cursor, títulos, eliminación, prueba, release o control B9.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md` · cursor, títulos, eliminación, prueba, release o control B9.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` · cursor, títulos, eliminación, prueba, release o control B9.

- `api/personal-events.js` · manifiesto de recuperación auditada limitado al evento autorizado.
- `live-control.js` · consulta de recuperación al montar ronda propia ya vinculada.

- `test-lab-tournament-navigation.mjs` · fixture actualizado con renderer real y prueba de botón visible sólo para autoridad.


## R148 · 2 octubre 2026 · numeración correlativa
Orden IMG_5663: versión visible sencilla R148; siguientes publicaciones R149, R150 y sucesivas, sin puntos ni sufijos visibles. release.json, meta y fallback SW sincronizados. Se conserva toda la funcionalidad aprobada B9. Fuente/base 63407a28f37ecfa8b4d61904d22594fdd336d025; rollback a esa base. Prueba: recuperación de actualización, banco integral y navegador real con tarjeta conservada. No se declara prueba física de iPhone.
- `index-grupal.html` · numeración correlativa o registro/sello R148.
- `service-worker.js` · numeración correlativa o registro/sello R148.
- `release.json` · numeración correlativa o registro/sello R148.
- `ROADMAP_OVERALL.md` · numeración correlativa o registro/sello R148.
- `ROADMAP_A_DETALLE.md` · numeración correlativa o registro/sello R148.
- `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md` · numeración correlativa o registro/sello R148.
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` · numeración correlativa o registro/sello R148.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/DIRECTRICES_MANDATORIAS.md` · numeración correlativa o registro/sello R148.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` · numeración correlativa o registro/sello R148.

- `test-update-delivery-control.mjs` · fixture independiente del sufijo B; conserva prueba de identidad distinta con etiqueta visible igual en R148.

- `test-lab-registration-private-rounds-entry.mjs` · exige etiqueta R seguida únicamente de entero, según orden R148.


### R148 · ingreso tardío al grupo con tarjeta en curso
Orden18:24 Guatemala: entrar aunque la ronda esté empezada. Botón ENTRAR A MI GRUPO desde tarjeta, directorio y código propios; vinculación en el mismo objeto de ronda sin nueva tarjeta, sin borrar hoyos, sin reiniciar reloj. Backend conserva acceso nominativo/cupo/estado activo y rechaza campo/modalidad incompatibles. Al cambiar de evento se crea stream independiente, nunca se reutiliza uno vinculado a otro grupo. Scores Mi Grupo vinculado abre todos los competidores del evento; sin vínculo conserva la vista del grupo local. Posiciones usan el motor existente por resultado/puntos y hoyos efectivamente completados, sin imputar scores a hoyos no jugados. Prueba nueva verifica ingreso con hoyos1/2 existentes, identidad/fecha/reloj conservados, publicación, rechazo de tarjeta cerrada y posiciones antes/después de nuevo score. Banco y navegador sobre último alcance pendientes.
- `index-grupal.html` · ingreso tardío, conservación o regresión R148.
- `personal-events.js` · ingreso tardío, conservación o regresión R148.
- `live-control.js` · ingreso tardío, conservación o regresión R148.
- `api/_lib/personal-event-access.js` · ingreso tardío, conservación o regresión R148.
- `test-r148-late-group-join.mjs` · ingreso tardío, conservación o regresión R148.
- `test-event-directory-code.mjs` · ingreso tardío, conservación o regresión R148.
- `scripts/build-manual-lab.mjs` · ingreso tardío, conservación o regresión R148.

- `test-r24-event-creation-feedback.mjs` · ejecución real del dispatcher Mi Grupo: evento privado actual abre competidores; selección vieja/torneo/sin vínculo conserva tarjeta local.


## R149 · recuperación exacta desde Scores · 2 octubre 2026
Navegador R148 detectó fallo: ENTRAR AL SCORE CARD DEL TORNEO desde grupo ya vinculado abría Registro al cambiar innecesariamente el espacio de almacenamiento. La ronda original mantiene Gross9/Neto7, hoyos1/2 y reloj. openAssignedCard ahora detecta y verifica evento/grupo/modalidad/roster/cuenta actuales y vuelve por round_return sin cambiar namespace ni crear tarjeta. Si no hay ronda compatible sigue el flujo asignado original; cuenta diferente nunca reutiliza tarjeta. R148 pasó integral y late join; este regreso no pasó y por eso se corrige en publicación consecutiva R149. Rollback 1cac88bff1544206856903f4396eb73dfff2f1e5. Prueba VM positiva/negativa y navegador del mismo grupo/score antes y después.
- `personal-events.js` · recuperación, versión, regresión o registro R149.
- `index-grupal.html` · recuperación, versión, regresión o registro R149.
- `release.json` · recuperación, versión, regresión o registro R149.
- `service-worker.js` · recuperación, versión, regresión o registro R149.
- `test-r148-late-group-join.mjs` · recuperación, versión, regresión o registro R149.
- `ROADMAP_OVERALL.md` · recuperación, versión, regresión o registro R149.
- `ROADMAP_A_DETALLE.md` · recuperación, versión, regresión o registro R149.
- `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md` · recuperación, versión, regresión o registro R149.
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` · recuperación, versión, regresión o registro R149.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` · recuperación, versión, regresión o registro R149.


## R150 · 2 octubre 2026 · Scores juntos e ingreso al grupo por código
Orden IMG_5666: SCORES MI GRUPO y SCORES TORNEO en la primera fila, uno a la par del otro; abajo INGRESAR A / GRUPO en dos líneas. Mantiene el directorio de grupos y la vinculación de la tarjeta comenzada. Seleccionar un grupo siempre solicita su código, también al creador: no rellena ni salta el campo con un código guardado. La API existente valida código y evento seleccionado antes de asignar; no cambia permisos ni motor de scores. Regresión ejecuta selección, código incorrecto y válido, visitante/creador, sin alterar scores/reloj. Causa del desvío visual: botón agregado antes de los dos Scores en grid de dos columnas. Control permanente: orden DOM probado y geometría revisada en navegador real. Base/rollback 7ffe48952ed88625f16fe57709138ba77266d5ac. Banco integral y navegador del despliegue nuevo pendientes al registrar.
- `index-grupal.html` · disposición, código obligatorio, regresión o registro R150.
- `personal-events.js` · disposición, código obligatorio, regresión o registro R150.
- `service-worker.js` · disposición, código obligatorio, regresión o registro R150.
- `release.json` · disposición, código obligatorio, regresión o registro R150.
- `test-r150-group-entry.mjs` · disposición, código obligatorio, regresión o registro R150.
- `scripts/build-manual-lab.mjs` · disposición, código obligatorio, regresión o registro R150.
- `ROADMAP_OVERALL.md` · disposición, código obligatorio, regresión o registro R150.
- `ROADMAP_A_DETALLE.md` · disposición, código obligatorio, regresión o registro R150.
- `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md` · disposición, código obligatorio, regresión o registro R150.
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` · disposición, código obligatorio, regresión o registro R150.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md` · disposición, código obligatorio, regresión o registro R150.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` · disposición, código obligatorio, regresión o registro R150.


## R151 · 2 octubre 2026 · reingreso por código con escritor ya vinculado
Navegador LAB R150: código incorrecto se rechazó correctamente; código válido en el mismo grupo perdió la vinculación de publicación y mostró error. Causa: join-code limpiaba stream_id aunque roster/grupo fueran iguales y cliente reutilizaba conexión cacheada sin volver a enlazar. Corrección: conserva stream_id solamente para roster/grupo exactos; grupo distinto obliga nueva vinculación. Ingreso explícito marca connected:false y fuerza revalidación/enlace autenticado por el escritor existente antes de publicar. No amplía permisos ni borra scores. Pruebas SQL de reingreso y cambio de grupo; VM de conexión cacheada y reingreso explícito. Rollback c3ddc3b86e1008fd5593b886996c40d1844cc7d1. La entrega R150 pasó ACTUALIZAR en navegador LAB conservando Gross9/Neto7/hoyo3; IMG_5667 del propietario permanece R147.2.4.24 pese a aviso ACTUALIZADO, no se declara actualización de su dispositivo. Enlace manual directo de recuperación entregado. Banco y reingreso real R151 pendientes al registrar.
- `api/_lib/personal-event-access.js` · reingreso, conservación del escritor, prueba o control R151.
- `live-control.js` · reingreso, conservación del escritor, prueba o control R151.
- `index-grupal.html` · reingreso, conservación del escritor, prueba o control R151.
- `release.json` · reingreso, conservación del escritor, prueba o control R151.
- `service-worker.js` · reingreso, conservación del escritor, prueba o control R151.
- `test-event-directory-code.mjs` · reingreso, conservación del escritor, prueba o control R151.
- `test-r150-group-entry.mjs` · reingreso, conservación del escritor, prueba o control R151.
- `ROADMAP_OVERALL.md` · reingreso, conservación del escritor, prueba o control R151.
- `ROADMAP_A_DETALLE.md` · reingreso, conservación del escritor, prueba o control R151.
- `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md` · reingreso, conservación del escritor, prueba o control R151.
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` · reingreso, conservación del escritor, prueba o control R151.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md` · reingreso, conservación del escritor, prueba o control R151.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` · reingreso, conservación del escritor, prueba o control R151.

- `test-lab-device-event-identity.mjs` · proveedor auth explícitamente devuelve401 en fixture de DB aislada; no exige red ni sesión real para comprobar identidad de dispositivo R151.

R151 · continuidad del acceso antiguo confirmado por IMG_5668(1): Vercel dpl_5ixVz7iWWvN1ZmrQMD4J7xjmTPT8, rama lab/r146-entry-open-24h-invites-20260930, commit8a05fd110c64d5bf51add1534b8cdece4d964bb5, alias golf-sc-gt-lab-git-lab-r146-entry-ope-6b36ee-epgcaddys-projects.vercel.app. Actualizar esa rama al mismo árbol verificado que main para conservar origen y datos locales del acceso del propietario. No redirigir a otro origen ni borrar storage. Confirmar READY y ACTUALIZAR en ese alias; no afirmar actualización del iPhone sin evidencia.

Control de destino persistido también en `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/MATRIZ_GATE_0_PROYECTO.md` y `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/MATRIZ_GATE_0_PROYECTO.json`: origen instalado y rama obligatorios; alias secundario no sustituye entrega.


## R152 · eliminación con una sola confirmación · 2 de octubre de 2026

Pedido IMG_5672: retirar captura de nombre y motivo. ELIMINAR abre únicamente CONFIRMAR ELIMINAR, identifica el evento seleccionado y muestra ELIMINAR; X cancela. Un clic envía la eliminación y cierra al éxito. Nombre y motivo del comprobante se completan internamente; API conserva autorización y validación del evento, comprobante y cierre atómico. Error queda visible y habilita reintento. Prueba VM de apertura sin mutación, clic único y éxito/error; banco integral y revisión en navegador requeridos. Rollback R151 e99f87ca21003d428f4261c0c9b367b5cafdef53. Publicación autorizada en producción, alias estable LAB y origen instalado obligatorio de la matriz. R151 previo verificado READY en los tres destinos, actualización original R147→R151 y scores1/2 preservados; propietario confirmó Listo.
- `event-administration-ui.js` · control o modificación R152.
- `test-event-administration.mjs` · control o modificación R152.
- `index-grupal.html` · control o modificación R152.
- `release.json` · control o modificación R152.
- `service-worker.js` · control o modificación R152.
- `ROADMAP_OVERALL.md` · control o modificación R152.
- `ROADMAP_A_DETALLE.md` · control o modificación R152.
- `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md` · control o modificación R152.
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` · control o modificación R152.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` · control o modificación R152.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md` · control o modificación R152.


## R153 · retirar reportes de eliminación de la pantalla · 2 de octubre de 2026

Pedido IMG_5673: eliminar visualización de todos los reportes residuales de eliminación. Se retira la sección COMPROBANTES DE ELIMINACIÓN del HTML y el renderizado de recibos del controlador: históricos y futuros no aparecen. Se conserva confirmación simple R152, listado de eventos vigentes y API de autorización. No purga datos de auditoría. Rollback R152 8bf0150439325f5fb52581f78a049cbc3a11e710. Publicar en producción y ambos destinos LAB obligatorios. Prueba administrativa existente y navegador real sin sección ni reportes.
- `event-administration-ui.js` · modificación o control R153.
- `event-administration.html` · modificación o control R153.
- `index-grupal.html` · modificación o control R153.
- `release.json` · modificación o control R153.
- `service-worker.js` · modificación o control R153.
- `ROADMAP_OVERALL.md` · modificación o control R153.
- `ROADMAP_A_DETALLE.md` · modificación o control R153.
- `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md` · modificación o control R153.
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` · modificación o control R153.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` · modificación o control R153.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md` · modificación o control R153.


## R154 · Scores torneo: directorio activo y títulos · 2 de octubre de 2026

Pedido IMG_5675: SCORES TORNEO muestra exclusivamente todos los torneos en curso del directorio del servidor; sin crear, ingresar, gestionar o grupos particulares. Vacío exacto NINGÚN TORNEO EN CURSO. Selección abre Scores torneo y sus opciones SCORES GENERAL, SCORES POR CATEGORÍA y MIS FAVORITOS. Los títulos elegidos persisten después de refrescar scores. SCORES MI GRUPO conserva su título en la apertura y los refrescos. Botón de la tarjeta abre el directorio incluso sin torneo asociado; el retorno conserva tarjeta/cuenta. API activeOnly filtra finalizados sin cambiar el directorio usado por otros flujos ni los permisos del servidor. Pruebas dirigidas: ocho torneos sin límite local de cinco; exclusión de finalizado; mensaje vacío; títulos y retorno. IMG_5676 confirma disposición R150 de los dos Scores juntos y entrada al grupo debajo, sin nueva orden de modificación. Rollback R153 bb60704a2b650ac592e08fad963a57f9b2d96754. Entrega autorizada a producción, LAB estable y origen instalado obligatorio de la matriz; no afirmar prueba física de iPhone.
- `api/personal-events.js` · modificación o control R154.
- `live-hub.js` · modificación o control R154.
- `live-hub.html` · modificación o control R154.
- `index-grupal.html` · modificación o control R154.
- `private-rounds.js` · modificación o control R154.
- `scores-ui.js` · modificación o control R154.
- `shortcuts-ui.js` · modificación o control R154.
- `release.json` · modificación o control R154.
- `service-worker.js` · modificación o control R154.
- `test-event-directory-code.mjs` · modificación o control R154.
- `test-lab-tournament-navigation.mjs` · modificación o control R154.
- `test-menu-scorecard-tournament-sync.mjs` · modificación o control R154.
- `ROADMAP_OVERALL.md` · modificación o control R154.
- `ROADMAP_A_DETALLE.md` · modificación o control R154.
- `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md` · modificación o control R154.
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` · modificación o control R154.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` · modificación o control R154.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md` · modificación o control R154.
- `test-lab-registration-private-rounds-entry.mjs` · prueba de separación de grupos y directorio de torneos R154.
- `scripts/manual-screen-parity-gate.mjs` · nombre RONDAS GUARDADAS alineado con opción del menú; paridad operativa conservada R154.

Ampliación expresa 20:01: BUSCAR JUGADOR se retira del menú principal y se muestra junto a General/Categorías/Favoritos en el torneo seleccionado. Su título BUSCAR JUGADOR persiste. CREAR TORNEO es exclusivamente la acción y el diálogo de creación; ningún título de Scores usa esa etiqueta. Pruebas y contratos de menú actualizados: `test-lab-shortcuts-navigation.mjs`, `test-lab-global-operational-audit.mjs`.


## R155 · comprobación visible de Buscar jugador en torneo · 2 de octubre de 2026

Recorrido real R154 detectó regla heredada en scores-ui.css que ocultaba hubShowIndividual aun después de retirar la regla HTML. Se retira esa regla; Buscar jugador se muestra entre opciones de torneo seleccionado, permanece fuera del menú principal. Scores Torneo vacío comprobado en origen instalado sin Crear torneo, Grupos particulares u opciones ajenas. General/Categorías/Favoritos/Búsqueda se revisan en demo identificado; no se afirma prueba física iPhone ni torneo de usuario inexistente. Selección de texto bloqueada por CSS en títulos/botones y campos de entrada conservados. Actualización LAB estable comprobada con tarjeta QA R148 scores hoyos1/2 preservados. Rollback R154 aa0f1f39a6c51d7640bb2c5e7d433e44ff919c7e. Publicación autorizada en los tres destinos de matriz.
- `scores-ui.css` · modificación o control R155.
- `release.json` · modificación o control R155.
- `service-worker.js` · modificación o control R155.
- `index-grupal.html` · modificación o control R155.
- `ROADMAP_OVERALL.md` · modificación o control R155.
- `ROADMAP_A_DETALLE.md` · modificación o control R155.
- `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md` · modificación o control R155.
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` · modificación o control R155.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md` · modificación o control R155.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` · modificación o control R155.
- `test-lab-tournament-navigation.mjs` · modificación o control R155.


### R155 · pertenencia real y salida de grupo
Sin pertenencia real: **NO PERTENECES A NINGÚN GRUPO**. La tarjeta individual no se presenta como grupo. **SALIR DEL GRUPO** junto a **INGRESAR A GRUPO** desvincula únicamente el stream propio y su roster, conserva jugadores, scores y temporizador, y permite volver a entrar con código. API niega salida de otra cuenta y conserva administración del creador. Pruebas VM y base real: PASS.
- `api/personal-events.js` · modificación y prueba R155.
- `api/live.js` · modificación y prueba R155.
- `live-control.js` · modificación y prueba R155.
- `private-rounds.js` · modificación y prueba R155.
- `test-r24-event-creation-feedback.mjs` · modificación y prueba R155.
- `test-event-directory-code.mjs` · modificación y prueba R155.
- `test-r155-private-group-exit.mjs` · modificación y prueba R155.
- `scripts/build-manual-lab.mjs` · modificación y prueba R155.


## R156 · 2 octubre 2026 · ingreso y compartición de torneo

 main a7502ebcf7930d4b612b13d97b0b9f171a3fa96e; capturas IMG_7E674602 y IMG_8968AFF0 (WhatsApp), IMG_5687 (Organizador), IMG_5688/5689 (administración); órdenes de 2 octubre 2026 20:58–21:15 Guatemala.

Alcance: CREAR TORNEO únicamente en Organizador. TORNEO en Modalidad pide código directamente y conserva API oficial join-code. Compartir usa una URL en el texto para impedir duplicación por Web Share. Ruta /torneo/NOMBRE con evento/código en fragmento; identidad estable independiente del nombre para conservar enlaces anteriores. La API valida acceso antes de preparar Registro y el nombre mostrado viene del servidor. La invitación no concede edición hasta join-code. ID DE TORNEO dentro de Organizador; comprobación de rol y evento antes de compartir. Controles administrativos agrupados en details cerrados; login propietario oculto sólo con owner:true. Sin alteración de permisos de las APIs ni motor de scores.

Aceptación: código inválido no conecta; código válido conserva snapshot; no directorio en ingreso torneo; privados conservan selección y código; nombre actualizado en nuevos enlaces y destino actual en viejos; jugador sin controles de compartir; cancelación conserva recuperación; Administración principal muestra eventos y Eliminar, permisos secundarios cerrados.

Riesgos: permisos expuestos, enlace dirigido a otro evento, nombre antiguo, doble URL, pérdida de tarjeta, scripts relativos bajo ruta personalizada. Controles: identidad/evento validado por API; nombre remoto; fragmento no enviado al servidor y borrado de dirección al consumir; redirect a ruta principal; regresión de tarjeta/reloj y grupos privados.

Plan: test-r156-tournament-invitation.mjs, test-lab-private-round-share-flow.mjs, test-organizer-tournament-entry.mjs, banco scripts/build-manual-lab.mjs, puertas de proyecto/ROADMAP/inventarios; navegación móvil real sobre Preview antes de publicar. No se declara prueba física de iPhone.

Rollback: a7502eb; no migraciones ni eliminación de datos. No cambiar orígenes existentes para conservar almacenamiento.

Dominio solicitado: golf-score-card.vercel.app responde HTTP200, título Create Next App; no forma parte de los dominios de EPG CADDY en la cuenta epgcaddys-projects. Asignación no comprobada y no realizada. URLs de este árbol usan el origen existente; no enviar enlaces con dominio solicitado hasta confirmación efectiva.

Evidencia local: banco completo y ambas puertas project-quality PASS. Chromium local ausente; intento de instalación devuelve archivo no ZIP y termina fallo. No se simula navegador ni iPhone. Preview remoto pendiente.


Archivos de esta versión:
- `event-administration-ui.js` · implementación, prueba o control R156.
- `event-administration.html` · implementación, prueba o control R156.
- `index-grupal.html` · implementación, prueba o control R156.
- `personal-events.js` · implementación, prueba o control R156.
- `shortcuts-ui.js` · implementación, prueba o control R156.
- `vercel.json` · implementación, prueba o control R156.
- `release.json` · implementación, prueba o control R156.
- `service-worker.js` · implementación, prueba o control R156.
- `scripts/build-manual-lab.mjs` · implementación, prueba o control R156.
- `test-lab-private-round-share-flow.mjs` · implementación, prueba o control R156.
- `test-lab-registration-private-rounds-entry.mjs` · implementación, prueba o control R156.
- `test-organizer-tournament-entry.mjs` · implementación, prueba o control R156.
- `test-r156-tournament-invitation.mjs` · implementación, prueba o control R156.
- `ROADMAP_OVERALL.md` · implementación, prueba o control R156.
- `ROADMAP_A_DETALLE.md` · implementación, prueba o control R156.
- `CONTROL_PROYECTO_SCIRE/ACEPTACION_R156_INVITACIONES.md` · implementación, prueba o control R156.
- `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md` · implementación, prueba o control R156.
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` · implementación, prueba o control R156.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` · implementación, prueba o control R156.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md` · implementación, prueba o control R156.


### R156 · cierre local y bloqueo de entrega
Revisión automática rechazó git push de fix/r156-tournament-invitation al repositorio canónico. No se ha eludido por otro transporte. Preview/navegador público pendientes y Producción sin promoción. Falta autorización explícita del propietario para subir esta rama. La descarga local de Chromium falló como ZIP incompleto; no prueba de navegador ni iPhone.
- `test-tournament-code-round-binding.mjs` · exige ocultar la superficie histórica de código de torneo en tarjeta, también al creador; Organizador conserva compartir, grupos privados conservan contrato.


### R156 · autorización de subida · 2 octubre 2026 21:23 Guatemala
El propietario autorizó explícitamente la subida. El conector GitHub confirmó propietario EPGCADDY, mismo ID de la cuenta conectada, permisos admin/push en EPGCADDY/EPG-CADDY. Se levanta el bloqueo de autorización; Preview y navegador siguen pendientes, sin promoción de Producción.


### R156 · Preview verificado y bloqueo de acceso · 2 octubre 2026
Código remoto c62703f163dbc1e6d79aa891cc5fcb5246a88b70; árbol ec39bc22b803dfb1eadc249cb81347fd014e65b4. Deployment LAB Preview dpl_BgM3nDGx2qukM6VaEQpuMm1rz3NB READY, https://golf-sc-gt-k3mgbvv32-epgcaddys-projects.vercel.app. Acceso temporal obtenido mediante el conector oficial de Vercel; protección conservada.
Navegador Chrome real: R156 ACTUALIZADO; Crear torneo e ID de torneo dentro de Organizador; Administración con PERMISOS ADMINISTRATIVOS cerrado; Modalidad TORNEO abre un único campo después de registrar jugadores; código inválido rechazado y borrador conservado. /torneo/CMI con evento/código de prueba conserva fragmento al redirigir, abre INVITACIÓN AL TORNEO y rechaza código inválido; después borra el fragmento de la dirección. Evidencia: CONTROL_PROYECTO_SCIRE/EVIDENCIA_R156_ADMINISTRACION.jpg. No es prueba física de iPhone.
BLOQUEADO para flujo válido completo: Preview muestra NINGÚN TORNEO EN CURSO; dispositivo de prueba sin autorización de Organizador. El formulario seguro de acceso fue enviado y el sitio respondió CORREO O CONTRASEÑA INCORRECTOS. No se repite ni se registran credenciales. Siguiente intervención indispensable: propietario completa su acceso en el navegador de revisión; luego agente crea evento de prueba, verifica invitación/código válidos y promoción sólo al cerrar pendientes. Producción/main/origen instalado continúan R155. Dominio golf-score-card.vercel.app sin asignar; no se afirma PASS integral ni publicación.
Este punto de recuperación sólo añade documentación, sello y evidencia; implementación idéntica al código c62703f probado.


### R156 · código e invitación válidos · 2 octubre 2026
El propietario suministró el código de un torneo de prueba. Se levantó el bloqueo de la prueba de receptor sin repetir acceso de propietario. En Chrome real sobre c62703f: Modalidad → TORNEO → código válido devolvió LISTO y asignó evento; confirmación oficial → INICIAR RONDA abrió tarjeta de PRUEBA R156, categoría A, HDCP 10, Blancas, torneo JAJAJA en El Pulté. Ruta /torneo/JAJAJA con identidad estable mostró JAJAJA, INVITACIÓN AL TORNEO y REGISTRAR MIS JUGADORES; fragmento consumido y eliminado. Evidencia CONTROL_PROYECTO_SCIRE/EVIDENCIA_R156_TORNEO_VALIDO.jpg; no se guarda código de acceso en archivos ni capturas públicas.
Defecto de navegación detectado: después de código válido se devolvía a Registro con datos ya validados y exigía otro OK. Cambio incremental en openAssignedPersonalScoreCard: presentar directamente REVISAR ANTES DE EMPEZAR para la asignación general. Se conserva escritor único startConfirmedRound y botón INICIAR RONDA; no se inicia ni sustituye tarjeta automáticamente. Regresión VM en test-r156-tournament-invitation.mjs valida membresía, jugadores/campo y ausencia de inicio automático. Banco completo y nueva revisión Preview antes de promover. Acceso de propietario para compartir desde su dispositivo y dominio nuevo continúan pendientes; Producción intacta.
Archivos de este ajuste: index-grupal.html, test-r156-tournament-invitation.mjs, CONTROL_PROYECTO_SCIRE/EVIDENCIA_R156_TORNEO_VALIDO.jpg, CONTROL_PROYECTO_SCIRE/ACEPTACION_R156_INVITACIONES.md, CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md, CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md, CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json, CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md, ROADMAP_A_DETALLE.md, ROADMAP_OVERALL.md.


### R156 · cierre técnico de receptor · 2 octubre 2026
Commit de código e8955c43e46e1f6d914c26349a87ca834a8aca6e, LAB Preview dpl_6CjRn8zDrxshGV2w1dLVRXW7Vtoi READY, https://golf-sc-gt-co5nn8c5k-epgcaddys-projects.vercel.app. Chrome real en origen limpio: invitación válida al torneo de prueba JAJAJA → REGISTRAR MIS JUGADORES → PRUEBA R156 FINAL, A, HDCP 10, Blancas → TORNEO con código preparado → ENTRAR → REVISAR ANTES DE EMPEZAR, sin OK repetido → INICIAR RONDA → RONDA EN CURSO vinculada a JAJAJA. Nombre y campo remoto comprobados; código consumido desaparece de la dirección. Captura de confirmación: CONTROL_PROYECTO_SCIRE/EVIDENCIA_R156_CONFIRMACION_FINAL.jpg. Banco completo /tmp/r156-confirmation-integral.log terminó exit0 PASS. GATES de calidad, ROADMAP y sello825 PASS antes de este cierre documental. No se declara iPhone físico, cambio remoto de nombre desde rol propietario ni nuevo dominio asignado.
Pendientes de entrega: aceptación/autorización expresa de publicación de este resultado concreto y decisión/asignación del nombre de dominio. Producción, main y origen instalado continúan R155. PR46 contiene el resultado; no merge automático. Siguiente propietario: autorizar publicación de R156 con origen existente, o indicar que se espera asignación de dominio. Después de autorización, agente actualiza main y rama del origen instalado al mismo árbol, comprueba ambas aplicaciones y versiones, y registra resultado/rollback.
Archivos de cierre: CONTROL_PROYECTO_SCIRE/EVIDENCIA_R156_CONFIRMACION_FINAL.jpg, CONTROL_PROYECTO_SCIRE/ACEPTACION_R156_INVITACIONES.md, CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md, CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md, CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json, ROADMAP_A_DETALLE.md, ROADMAP_OVERALL.md. Implementación idéntica a e8955c4; sólo documentación y evidencia.


### R156 · PUBLICADA · 3 octubre 2026 Guatemala
El propietario autorizó publicar R156 conservando el dominio actual mediante K a las 02:47:49 Guatemala. PR46 integrado: df65a482686b43e3d8d86cf30de1e83b3a885e08; árbol f48f72b9687c6761601728ee7599e515dac12acf, idéntico al candidato aprobado 4efb62d. main y lab/r146-entry-open-24h-invites-20260930 apuntan al mismo commit, sin forzar referencias.
Despliegues READY: Producción EPG dpl_4NGy5Yb7rQHgP3ZutZLfLxxJCJ7T; LAB principal dpl_HJ61oEpCuxxrfs9yLXVpyxGkrDa9; LAB origen instalado dpl_DzoR4CBXgE1qa8BhSBYGWnrxDYL5; EPG rama instalada dpl_AhnpXtQgnaS8jwSNzbjrgKG4FeRx. Los cuatro orígenes devolvieron HTTP200 release.json R156. Chrome real en https://epg-caddy.vercel.app/index-grupal.html?inicio=1 muestra R156 ACTUALIZADO; menú principal sin Crear torneo duplicado y Organizador contiene CREAR TORNEO e ID DE TORNEO. Evidencia auténtica: CONTROL_PROYECTO_SCIRE/EVIDENCIA_R156_PRODUCCION.jpg.
Observabilidad del despliegue EPG: dos registros etiquetados error son DEP0169 de url.parse en /api/account HTTP200 y /api/app-access HTTP401 de dispositivo sin sesión; no demuestran fallo de invitaciones. No se declara ausencia universal de errores. Flujo válido completo comprobado antes de merge sobre e8955c4, código idéntico al publicado; banco integral PASS y puertas PASS. No se declara iPhone físico ni edición remota del nombre por propietario.
Entrega funcional COMPLETA. Dominio golf-score-card.vercel.app permanece pendiente de asignación; no bloqueó esta publicación expresamente autorizada con el dominio actual. No cambian orígenes ni almacenamiento. Rollback de código R155: a7502ebcf7930d4b612b13d97b0b9f171a3fa96e; restaurar mediante commit de reversión y mantener ambas ramas alineadas, sin borrar datos. Este cierre añade documentación, captura y sello, sin modificar implementación. Próxima acción del propietario: ninguna para esta entrega.


## R157 · centrado móvil, controles uniformes y Registro de jugadores · 3 octubre 2026

Paneles centrados cuando caben, scroll seguro cuando son largos; MENÚ arriba derecha y X arriba izquierda con mismas medidas. REGISTRO DE JUGADORES inmediatamente debajo de Manual conserva borrador, ronda y retorno. Administración tiene menú común incluso en diálogo nativo. 28 comprobaciones Chromium local 430×932 PASS; fixtures QA, no prueba física ni revisión integral 67/67. El propietario ordenó detener ampliación y publicar hasta este alcance. Preview/publicación pendiente al registrar. Rollback R156 416d7658c6fb.

- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md` · modificación, evidencia o control R157.
- `CONTROL_PROYECTO_SCIRE/ACEPTACION_R157_NAVEGACION.md` · modificación, evidencia o control R157.
- `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md` · modificación, evidencia o control R157.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R157_BROWSER/430x932-administracion.png` · modificación, evidencia o control R157.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R157_BROWSER/430x932-correccion.png` · modificación, evidencia o control R157.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R157_BROWSER/430x932-crear-grupo.png` · modificación, evidencia o control R157.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R157_BROWSER/430x932-detalle-18.png` · modificación, evidencia o control R157.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R157_BROWSER/430x932-estadisticas.png` · modificación, evidencia o control R157.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R157_BROWSER/430x932-grupo-vacio.png` · modificación, evidencia o control R157.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R157_BROWSER/430x932-historial.png` · modificación, evidencia o control R157.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R157_BROWSER/430x932-id-torneo.png` · modificación, evidencia o control R157.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R157_BROWSER/430x932-instalar.png` · modificación, evidencia o control R157.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R157_BROWSER/430x932-menu.png` · modificación, evidencia o control R157.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R157_BROWSER/430x932-organizador.png` · modificación, evidencia o control R157.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R157_BROWSER/430x932-registro.png` · modificación, evidencia o control R157.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R157_BROWSER/430x932-respaldo.png` · modificación, evidencia o control R157.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R157_BROWSER/430x932-stableford-registro.png` · modificación, evidencia o control R157.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R157_BROWSER/430x932-tarjeta-four_ball.png` · modificación, evidencia o control R157.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R157_BROWSER/430x932-tarjeta-general.png` · modificación, evidencia o control R157.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R157_BROWSER/430x932-tarjeta-match_play.png` · modificación, evidencia o control R157.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R157_BROWSER/430x932-tarjeta-stableford.png` · modificación, evidencia o control R157.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R157_BROWSER/430x932-tarjeta-universales.png` · modificación, evidencia o control R157.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R157_BROWSER/evidence.json` · modificación, evidencia o control R157.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` · modificación, evidencia o control R157.
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` · modificación, evidencia o control R157.
- `ROADMAP_A_DETALLE.md` · modificación, evidencia o control R157.
- `ROADMAP_OVERALL.md` · modificación, evidencia o control R157.
- `event-administration.html` · modificación, evidencia o control R157.
- `index-grupal.html` · modificación, evidencia o control R157.
- `release.json` · modificación, evidencia o control R157.
- `scripts/build-manual-lab.mjs` · modificación, evidencia o control R157.
- `scripts/review-r157-mobile-layout.mjs` · modificación, evidencia o control R157.
- `service-worker.js` · modificación, evidencia o control R157.
- `shortcuts-ui.js` · modificación, evidencia o control R157.
- `test-r157-uniform-navigation.mjs` · modificación, evidencia o control R157.


## R158 · Scores mi grupo, navegación e identificación · 3 octubre 2026
Tabla continua de grupo, todos los integrantes, doble toque18, cierres uniformes en todas las ramas Scores localizadas, identificación de pertenencia actual en Inicio y Score Card. Evidencia Chromium móvil con QA, no iPhone físico. Sin cambio de datos ni permisos. Rollback main R157 d0ff81d1b653.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md` · implementación, control o evidencia R158.
- `CONTROL_PROYECTO_SCIRE/ACEPTACION_R158_SCORES.md` · implementación, control o evidencia R158.
- `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md` · implementación, control o evidencia R158.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R158_SCORES/390-grupo-referencia.png` · implementación, control o evidencia R158.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R158_SCORES/390-grupo.png` · implementación, control o evidencia R158.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R158_SCORES/430-grupo-referencia.png` · implementación, control o evidencia R158.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R158_SCORES/430-grupo.png` · implementación, control o evidencia R158.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R158_SCORES/evidence.json` · implementación, control o evidencia R158.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` · implementación, control o evidencia R158.
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` · implementación, control o evidencia R158.
- `ROADMAP_A_DETALLE.md` · implementación, control o evidencia R158.
- `ROADMAP_OVERALL.md` · implementación, control o evidencia R158.
- `code-entry.html` · implementación, control o evidencia R158.
- `code-entry.js` · implementación, control o evidencia R158.
- `index-grupal.html` · implementación, control o evidencia R158.
- `live-hub.html` · implementación, control o evidencia R158.
- `live-hub.js` · implementación, control o evidencia R158.
- `live-view.js` · implementación, control o evidencia R158.
- `live.html` · implementación, control o evidencia R158.
- `private-rounds.js` · implementación, control o evidencia R158.
- `release.json` · implementación, control o evidencia R158.
- `scores-ui.css` · implementación, control o evidencia R158.
- `scores-ui.js` · implementación, control o evidencia R158.
- `scripts/build-manual-lab.mjs` · implementación, control o evidencia R158.
- `scripts/review-r158-scores.mjs` · implementación, control o evidencia R158.
- `service-worker.js` · implementación, control o evidencia R158.
- `shortcuts-ui.js` · implementación, control o evidencia R158.
- `test-lab-private-rounds.mjs` · implementación, control o evidencia R158.
- `test-r158-group-scores.mjs` · implementación, control o evidencia R158.
- `test-r24-event-creation-feedback.mjs` · implementación, control o evidencia R158.

- `test-manual-startup-sharing.mjs` · R158 actualiza mock de render de identificación, conserva negativo de arranque.


## R159 · invitación y código en dos mensajes WhatsApp · 3 octubre 2026
Base canónica R158 8c92f66. Sustituye propuesta retirada PR49: el propietario aclaró copia dentro del mensaje WhatsApp y aprobó alternativa de código aislado. Primer mensaje: GOLF SCORE CARD GT + Te han invitado a participar en la ronda de NOMBRE DEL CREADOR. Torneo emplea el torneo de NOMBRE DEL CREADOR. Segundo payload exactamente el código; sin etiqueta, título, URL ni texto adicional. Envíos separados, cada uno bajo toque del propietario, al mismo contacto seleccionado por él en WhatsApp. No automatizar mensajes ni afirmar entrega real al resolverse Web Share. Cancelación conserva origen y reintento; segunda acción bloqueada antes de primera; doble toque no duplica.
Se modifica exclusivamente compartir código de participación de grupos/torneos. Copia preexistente en aplicación conserva sus handlers; Scores LIVE de sólo lectura conserva su contrato independiente. Grupo recoge nombre de creador y lo guarda mediante configuration existente, sin nueva API ni migración. Torneo usa creatorName canónico; eventos antiguos pueden completar nombre al compartir sin inventarlo.
Riesgos: pérdida del segundo mensaje, envío a contactos distintos, cancelación, falta de nombre, portapapeles, estilos heredados. Controles: dos acciones visibles; indicación mismo contacto; payload text únicamente en segundo; sin cierre después del primero; fallback wa.me por cada mensaje; fallos visibles. La herramienta no ve el destinatario que selecciona WhatsApp ni confirma entrega.
Pruebas: test-r159-whatsapp-two-messages.mjs, integración test-lab-private-round-share-flow.mjs y test-r24-event-creation-feedback.mjs PASS; scripts/build-manual-lab.mjs exit0 PASS. Chromium local con mocks explícitos de navigator.share y APIs QA verifica 390/430, payloads exactos, cancelación/reintento, origen conservado, ausencia de overflow/errores y capturas 2160×4320. No prueba física iPhone ni envío WhatsApp real. Primera captura detectó controles sin estilo; corrección scoped en scores-ui.css y nueva revisión antes de candidato.
Rollback R158 por reversión sin borrar datos. Producción/main y LAB instalado permanecen R158; subir rama autorizada por propietario, Preview real y publicación pendientes.

- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md` · implementación, control o evidencia R159 de dos mensajes.
- `CONTROL_PROYECTO_SCIRE/ACEPTACION_R159_DOS_MENSAJES.md` · implementación, control o evidencia R159 de dos mensajes.
- `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md` · implementación, control o evidencia R159 de dos mensajes.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R159_DOS_MENSAJES/390-private.png` · implementación, control o evidencia R159 de dos mensajes.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R159_DOS_MENSAJES/390-tournament.png` · implementación, control o evidencia R159 de dos mensajes.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R159_DOS_MENSAJES/430-private.png` · implementación, control o evidencia R159 de dos mensajes.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R159_DOS_MENSAJES/430-tournament.png` · implementación, control o evidencia R159 de dos mensajes.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R159_DOS_MENSAJES/evidence.json` · implementación, control o evidencia R159 de dos mensajes.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` · implementación, control o evidencia R159 de dos mensajes.
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` · implementación, control o evidencia R159 de dos mensajes.
- `ROADMAP_A_DETALLE.md` · implementación, control o evidencia R159 de dos mensajes.
- `ROADMAP_OVERALL.md` · implementación, control o evidencia R159 de dos mensajes.
- `index-grupal.html` · implementación, control o evidencia R159 de dos mensajes.
- `live-hub.html` · implementación, control o evidencia R159 de dos mensajes.
- `personal-events.js` · implementación, control o evidencia R159 de dos mensajes.
- `private-rounds.js` · implementación, control o evidencia R159 de dos mensajes.
- `release.json` · implementación, control o evidencia R159 de dos mensajes.
- `scores-ui.css` · implementación, control o evidencia R159 de dos mensajes.
- `scripts/build-manual-lab.mjs` · implementación, control o evidencia R159 de dos mensajes.
- `scripts/review-r159-whatsapp-two-messages.mjs` · implementación, control o evidencia R159 de dos mensajes.
- `service-worker.js` · implementación, control o evidencia R159 de dos mensajes.
- `test-lab-private-round-share-flow.mjs` · implementación, control o evidencia R159 de dos mensajes.
- `test-lab-private-rounds.mjs` · implementación, control o evidencia R159 de dos mensajes.
- `test-r159-whatsapp-two-messages.mjs` · implementación, control o evidencia R159 de dos mensajes.
- `test-r24-event-creation-feedback.mjs` · implementación, control o evidencia R159 de dos mensajes.
- `whatsapp-invitations.js` · implementación, control o evidencia R159 de dos mensajes.


## R160 · código pendiente y título de administración · 3 octubre 2026
Base R159 publicada 6a955e8d558d12e6df142ff2e92c4b28da25e19d. El propietario confirmó en IMG_5699 que esperaba ambos mensajes con un envío; no había tocado el segundo botón. R159 no enviaba automáticamente: cada share necesita un nuevo toque. R160 aclara SON DOS ENVÍOS antes de salir y destaca FALTA ENVIAR EL CÓDIGO al preparar el primero; enfoca la segunda acción y conserva la recuperación por 45 minutos en el mismo origen, incluso si la app se recarga durante el share. El segundo payload sigue siendo exclusivamente el código. No automatiza WhatsApp ni afirma entrega. Cancelar el primero limpia recuperación; cancelar el segundo conserva reintento; cierre explícito descarta pendiente. Sin tocar cuentas, scores, APIs, permisos, copia existente o LIVE.
IMG_5697 fija el nombre ADMINISTRAR TORNEOS Y GRUPOS. Se cambia título HTML, H1 y ambos accesos (Menú y Organizador), conservando destino y funciones administrativas.
Aceptación: ambos payloads exactos; cero share automático; código recuperable tras primera preparación/recarga repetida; cancelación, caducidad y cierre controlados; título y menú coinciden; navegador móvil 390/430 sin overflow/errores. Evidencia local con fixtures QA declarados; recepción WhatsApp/iPhone sin verificar. Rollback R159 mediante reversión sin borrar datos. Preview y publicación aún pendientes de ejecución/verificación; autorización previa del propietario para la tarea permanece.

- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md` · implementación, control o evidencia R160.
- `CONTROL_PROYECTO_SCIRE/ACEPTACION_R160_WHATSAPP.md` · implementación, control o evidencia R160.
- `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md` · implementación, control o evidencia R160.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R160_WHATSAPP/390-administrar.png` · implementación, control o evidencia R160.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R160_WHATSAPP/390-private.png` · implementación, control o evidencia R160.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R160_WHATSAPP/390-tournament.png` · implementación, control o evidencia R160.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R160_WHATSAPP/430-administrar.png` · implementación, control o evidencia R160.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R160_WHATSAPP/430-private.png` · implementación, control o evidencia R160.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R160_WHATSAPP/430-tournament.png` · implementación, control o evidencia R160.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R160_WHATSAPP/evidence.json` · implementación, control o evidencia R160.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` · implementación, control o evidencia R160.
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` · implementación, control o evidencia R160.
- `ROADMAP_A_DETALLE.md` · implementación, control o evidencia R160.
- `ROADMAP_OVERALL.md` · implementación, control o evidencia R160.
- `event-administration.html` · implementación, control o evidencia R160.
- `index-grupal.html` · implementación, control o evidencia R160.
- `release.json` · implementación, control o evidencia R160.
- `scripts/review-r160-whatsapp-resume.mjs` · implementación, control o evidencia R160.
- `service-worker.js` · implementación, control o evidencia R160.
- `shortcuts-ui.js` · implementación, control o evidencia R160.
- `test-r159-whatsapp-two-messages.mjs` · implementación, control o evidencia R160.
- `whatsapp-invitations.js` · implementación, control o evidencia R160.

Orden adicional 3 octubre 17:19 Guatemala: eliminar acceso administrativo del Menú principal, porque está en ORGANIZADOR. Se conserva sólo allí con ADMINISTRAR TORNEOS Y GRUPOS y el destino existente. Prueba Menú sin administración → Organizador con administración → pantalla correspondiente.
- `test-r157-uniform-navigation.mjs` · regresión R160: administración sólo en Organizador.

Orden adicional 3 octubre 17:22 Guatemala, IMG_5701/5702: TORNEO en Modalidad abre sin teclado, como MI GRUPO. Se elimina enfoque automático de input en ambas entradas de código de torneo; el diálogo conserva foco accesible en Cerrar. El toque manual en el input sigue permitiendo escribir/pegar. Regresión comprueba no enfoque automático y edición por toque; teclado nativo iPhone no verificable en Chromium.
- `personal-events.js` · R160, torneo sin enfoque automático del código.
- `test-r156-tournament-invitation.mjs` · R160, torneo sin enfoque automático del código.

Orden adicional 3 octubre 17:27 Guatemala: texto exacto por tipo: GOLF SCORE CARD GT + Te ha invitado a participar en el torneo NOMBRE DEL TORNEO. Para mi grupo: Te ha invitado a participar en el grupo de NOMBRE DEL CREADOR. El organizador comparte nombre canónico del torneo, no nombre del creador. Campo editable NOMBRE DEL TORNEO para esa invitación; recuperación conserva dicho nombre. Segundo mensaje sólo código. Sustituye redacción previa de ronda/torneo de creador.
- `test-lab-private-round-share-flow.mjs` · R160, redacción exacta por grupo/torneo.
- `scripts/review-r159-whatsapp-two-messages.mjs` · R160, redacción exacta por grupo/torneo.


## R161 · mensaje único y Scores directos · 3 octubre 2026
Base y rollback R160 main94f33470af4555878d23a1eb555763481d490e45. Orden17:51: un solo mensaje WhatsApp, invitación en primeras líneas, dos líneas en blanco, código únicamente al final. Sustituye dos envíos R159/R160: un share text sin URL/title; cancela/reintenta sin perder origen, bloqueo doble toque, se retira recuperación de segundo envío anterior. No afirma entrega real ni copia con toque dentro de WhatsApp.
Score Card SCORES TORNEO abre evento de la tarjeta actual validando membresía y publicando por escritor oficial; shortcut scores conserva evento exacto y evita portal Family intermedio. Menú SCORES TORNEO conserva directory=1 y selección de otros eventos. Sin código/membresía no accede a datos privados. No cambia motor, voz, permisos, roster o scores.
Aceptación: mensaje exacto una llamada, dos líneas vacías y código final; cancela/error/doble toque; vínculo de tarjeta actual, otros torneos sólo directorio explícito, retorno conserva tarjeta. Pruebas dirigidas y Chromium QA; WhatsApp real/iPhone no verificados. Publicación pendiente del banco y Preview.
- `index-grupal.html` · implementación, prueba o evidencia R161.
- `live-hub.js` · implementación, prueba o evidencia R161.
- `whatsapp-invitations.js` · implementación, prueba o evidencia R161.
- `test-menu-scorecard-tournament-sync.mjs` · implementación, prueba o evidencia R161.
- `test-r159-whatsapp-two-messages.mjs` · implementación, prueba o evidencia R161.
- `test-lab-private-round-share-flow.mjs` · implementación, prueba o evidencia R161.
- `scripts/review-r161.mjs` · implementación, prueba o evidencia R161.
- `release.json` · implementación, prueba o evidencia R161.
- `service-worker.js` · implementación, prueba o evidencia R161.
- `ROADMAP_OVERALL.md` · implementación, prueba o evidencia R161.
- `ROADMAP_A_DETALLE.md` · implementación, prueba o evidencia R161.
- `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md` · implementación, prueba o evidencia R161.
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` · implementación, prueba o evidencia R161.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md` · implementación, prueba o evidencia R161.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` · implementación, prueba o evidencia R161.
- `CONTROL_PROYECTO_SCIRE/ACEPTACION_R161.md` · implementación, prueba o evidencia R161.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R161/evidence.json` · implementación, prueba o evidencia R161.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R161/390-private.png` · implementación, prueba o evidencia R161.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R161/390-tournament.png` · implementación, prueba o evidencia R161.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R161/390-administrar.png` · implementación, prueba o evidencia R161.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R161/430-private.png` · implementación, prueba o evidencia R161.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R161/430-tournament.png` · implementación, prueba o evidencia R161.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R161/430-administrar.png` · implementación, prueba o evidencia R161.

Ampliación17:53: instrucción Copia y pega el código en la pantalla inicial de registro; inmediatamente enlace absoluto del mismo origen a /index-grupal.html?inicio=1; después MODALIDAD / TORNEO o MI GRUPO / Código; dos líneas vacías y código real al final. Una llamada share text, sin URL separada duplicada.

Validación local R161: banco completo scripts/build-manual-lab.mjs exit0; pruebas dirigidas e integración PASS; Chromium QA 390/430 confirma mensaje único, enlace Registro, código final, TORNEO sin autofocus, scores directos Family y directorio separado, errors[]. Imágenes2160×4320,300dpi. WhatsApp recibido/iPhone físico NO VERIFICADOS; Preview y publicación pendientes.


## R162 · ID de torneo persistente y códigos de un uso · 3 octubre 2026
Orden del propietario IMG_5711/IMG_5712: Organizador conserva ID para compartir participantes y Administrar mantiene eliminación. Base/rollback main8372ca1cbe28e3f538c3982e415a592ae05e898f. Se muestra código por torneo activo del creador; copia, WhatsApp y actualización de códigos. Fuente canónica servidor: gsc_tournament_entry_codes, pendiente recuperable en cualquier dispositivo de la misma cuenta, separado por evento. Sólo organizador propietario puede emitir/recuperar. Al ingresar una cuenta el código queda consumido y no admite otra; reintento de cuenta ya admitida es idempotente para conservar escritor/roster. Validación de campo/modalidad/capacidad antes de consumo; claim y membresía en un único SQL atómico. MI GRUPO conserva contrato anterior. Códigos originales de torneos también pasan por consumo al ingresar. No modifica scores, motor, voz, permisos administrativos ni eliminación.
Riesgos: ingreso repetido por reenvío, pérdida de código, acceso ajeno, consumo tras error; pruebas PostgreSQL de segunda cuenta rechazada, pendiente estable, nuevo código distinto, error de campo sin consumo, permiso/aislamiento/cierre y navegador móvil390/430 con copy/share/recarga y administración. Rollback mediante reversión de código sin borrar datos ni tabla adicional. Migración aditiva CREATE TABLE IF NOT EXISTS en ensurePersonalAccess. No afirma iPhone físico o entrega WhatsApp. Publicación PENDIENTE hasta gates, banco completo, Preview y deployments READY.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md` · implementación/control/evidencia R162.
- `CONTROL_PROYECTO_SCIRE/ACEPTACION_R162.md` · implementación/control/evidencia R162.
- `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md` · implementación/control/evidencia R162.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R162/390-ids.png` · implementación/control/evidencia R162.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R162/430-ids.png` · implementación/control/evidencia R162.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R162/evidence.json` · implementación/control/evidencia R162.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` · implementación/control/evidencia R162.
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` · implementación/control/evidencia R162.
- `ROADMAP_A_DETALLE.md` · implementación/control/evidencia R162.
- `ROADMAP_OVERALL.md` · implementación/control/evidencia R162.
- `api/_lib/personal-event-access.js` · implementación/control/evidencia R162.
- `api/personal-events.js` · implementación/control/evidencia R162.
- `event-administration-ui.js` · implementación/control/evidencia R162.
- `event-administration.html` · implementación/control/evidencia R162.
- `index-grupal.html` · implementación/control/evidencia R162.
- `personal-events.js` · implementación/control/evidencia R162.
- `release.json` · implementación/control/evidencia R162.
- `scripts/build-manual-lab.mjs` · implementación/control/evidencia R162.
- `scripts/review-r162.mjs` · implementación/control/evidencia R162.
- `service-worker.js` · implementación/control/evidencia R162.
- `test-r162-single-use-tournament-code.mjs` · implementación/control/evidencia R162.


### Recuperación R162 · publicación bloqueada por auto-review
Commit local probado19eb9647a74ce135368d4a99d4b1e78daca358b4; rama fix/r162-tournament-single-use-ids, origen https://github.com/EPGCADDY/EPG-CADDY.git. Banco completo /tmp/r162-bank-final.log exit0; pruebas PostgreSQL (8 intentos,1 ingreso) y navegador390/430 ID/admin PASS; quality/roadmap/inventory PASS antes de commit. Dos git push rechazados automáticamente; no subida ni Preview ni actualización de main/LAB/Producción. Conector GitHub comprobó repo1317852363 público, propietario311247547 igual al usuario autenticado, permisos admin/push. Segundo rechazo exige autorización explícita del usuario para divulgar código y documentación al repo público. No eludir por API, otro transporte ni repositorio. Acción indispensable del propietario: autorizar subida de R162 al repositorio público EPGCADDY/EPG-CADDY. Tras autorización, agente sube rama, verifica Preview, merge autorizado y deployments, incluyendo origen LAB instalado sin cambiar almacenamiento. Fuentes iniciales: capturas IMG_5711/IMG_5712 vistas en chat; iPhone físico y entrega WhatsApp no certificados. Rollback8372ca1cbe28e3f538c3982e415a592ae05e898f. Ejecución DETENIDA tras guardar recuperación.


### Ampliación R162 · código antes o después del registro · 3 octubre18:36
Orden: MODALIDAD/TORNEO debe permitir pegar código sin jugadores y registrar después; se conserva la ruta jugadores primero. API inspect-tournament-code valida evento activo/código/cuenta sin consumir, sin otorgar membresía ni ver Scores. Conserva nombre/campo/modalidad en borrador; OK completa validación del roster y realiza join-code atómico antes de confirmación. INICIAR RONDA sigue siendo el único escritor de nueva tarjeta. Código inválido/usado/cerrado conserva registro anterior; consulta previa no quema el código. Prueba PostgreSQL verifica consumed_at nulo tras inspección; Chromium390/430 recorre pre-código→roster→OK→inicio oficial y jugadores→código, sin errores. Banco completo /tmp/r162-preregistration-bank.log exit0. No iPhone físico ni entrega WhatsApp. Bloqueo de publicación por autorización pública sigue vigente; no se vuelve a intentar subida sin autorización explícita.
- `api/_lib/personal-event-access.js` · inspección previa sin membresía/consumo.
- `api/personal-events.js` · acción inspect-tournament-code.
- `personal-events.js` · diálogo antes de jugadores y join al confirmar.
- `index-grupal.html` · dos rutas, persistencia y escritor oficial.
- `scripts/review-r162.mjs` · revisión de ambas rutas.
- `test-r162-single-use-tournament-code.mjs` · inspección no consume.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R162/evidence.json` · navegador ambas rutas PASS.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` · sello actualizado.


## R163 · Directorio global de torneos activos y código copiable · 3 octubre 2026
SCORES TORNEO reúne todos los torneos activos de cada entorno de la plataforma, sin filtrar por organizador o cuenta y sin límite artificial de 100. Cada tarjeta mantiene su origen; abrirla presenta el torneo elegido en SCORES GENERAL, SCORES POR CATEGORÍA, BUSCAR JUGADOR y MIS FAVORITOS, leyendo sólo el entorno de origen. Es una federación de lectura, sin sincronizar ni escribir entre bases. La respuesta permitida excluye hashes, credenciales, teléfonos y campos ajenos al score. WhatsApp conserva instrucciones en el primer mensaje y ofrece COMPARTIR SOLO EL CÓDIGO y COPIAR SOLO EL CÓDIGO por separado.
Aceptación local: fixtures PostgreSQL con 20 torneos activos por entorno y 20 organizadores por lado producen los 40 torneos en ambos directorios; cada torneo devuelve sus Scores correctos y campos privados ausentes. Pruebas integradas cubren los cuatro destinos del torneo seleccionado, copia del código, grupo/torneo, cancelación y fallback. Banco completo LAB, quality, roadmap e inventario PASS. Chromium local PASS a 390 y 430 px para grupo y torneo: la invitación se comparte primero, el código después y copiar toma sólo el código; cancelación y reintento PASS. Revisión en deployments LAB/PROD y WhatsApp físico siguen pendientes. Rollback a main c0a2005670dfafe129d77c0c44ba38c1207e2302 (R162); sin migración ni cambio de DB.
- `api/tournament-score-directory.js` · lista y lectura pública, origen fijo y campos de score permitidos.
- `live-hub.js` · menú reunido y lectura por entorno de origen.
- `whatsapp-invitations.js` · invitación y código en mensajes separados, copiar código.
- `test-r163-cross-environment-tournament-scores.mjs` · prueba PostgreSQL EPG/Family y privacidad de campos.
- `test-lab-private-round-share-flow.mjs` · integración R163 de invitación separada y copia del código.
- `test-lab-registration-private-rounds-entry.mjs` · control de directorio global y exclusión de rondas privadas.
- `test-lab-tournament-navigation.mjs` · control de destinos General, Categoría, búsqueda y Favoritos.
- `test-lab-deployment-gate.mjs` · salida determinista de pruebas de etapas del deploy.
- `scripts/project-quality-gate.mjs` · emisión síncrona de PASS/FAIL para evitar truncar evidencia al salir.
- `test-r159-whatsapp-two-messages.mjs` · cambio R163: botón copia sólo el código y envío aislado.
- `scripts/review-r159-whatsapp-two-messages.mjs`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R163_WHATSAPP/evidence.json`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R163_WHATSAPP/{390,430}-{private,tournament}.png` · Chromium local PASS ambos modos y anchos; sin entrega real a WhatsApp ni certificación de iPhone.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R163_WHATSAPP/390-private.png`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R163_WHATSAPP/390-tournament.png`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R163_WHATSAPP/430-private.png`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R163_WHATSAPP/430-tournament.png` · capturas exigidas por el gate de archivos.
- `scores-ui.css` · mantiene ocultos los botones de compartir/copiar código hasta completar el primer envío.
- `scripts/build-manual-lab.mjs`, `index-grupal.html`, `service-worker.js`, `release.json` · integración R163.


### R163 · reparación del gate de despliegue · 4 de octubre de 2026
El hotfix público de Scores autoriza únicamente POST de lectura en el directorio; `middleware.js` y `test-live-share-middleware.mjs` lo documentan y cubren con regresión. El primer build posterior fue rechazado porque esta misma modificación no incluía ambos roadmaps. Este commit registra el hotfix en `ROADMAP_A_DETALLE.md`, `ROADMAP_OVERALL.md` y renueva `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`. Estado: pendiente repetir los gates y confirmar despliegues READY; la pantalla pública aún muestra el listado parcial.


## R164 · Scores global conserva el entorno de origen · 4 de octubre de 2026
La comprobación pública R163 mostró Producción con dos torneos y Lab vacío, aunque ambos POST devolvían HTTP 200. Causa: el directorio descartaba la respuesta del entorno consultado cuando su etiqueta `source` coincidía con la del solicitante. R164 asigna el origen según el endpoint remoto y combina por entorno + ID; la regresión simula deliberadamente esa etiqueta incorrecta y comprueba 40 torneos, apertura desde su entorno y exclusión de datos privados. Estado: espera build y prueba pública en ambos alias.
- `api/tournament-score-directory.js` · corregida atribución y combinación de torneos del entorno remoto.
- `test-r163-cross-environment-tournament-scores.mjs` · fixture remoto etiqueta mal su origen; exige 20 torneos por entorno y lectura desde el entorno correcto.
- `ROADMAP_A_DETALLE.md`, `ROADMAP_OVERALL.md` · registro R164 en ambas hojas.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` · sello actualizado para las fuentes R164.


## R165 · Scores Torneo detecta Lab por Host · 4 de octubre de 2026
La pantalla Lab seguía vacía después de R164 porque el entorno podía clasificarse como Producción y llamar su propio directorio como si fuera el par. R165 detecta el alias recibido por `Host`/`X-Forwarded-Host`, con `VERCEL_URL` y `VERCEL_BRANCH_URL` como respaldo, y elige el API del otro entorno. La prueba cubre ambos dominios estables y URLs de deployment, listado federado y apertura por origen. Estado: implementación preparada; Preview y confirmación visual pública pendientes.
- `api/tournament-score-directory.js` · clasificación por dominio recibido y URL de deployment; selección del alias del otro entorno para list/read.
- `test-r163-cross-environment-tournament-scores.mjs` · regresión para alias Lab/Producción, URL de deployment, directorio de ambos lados, lectura y privacidad.
- `ROADMAP_A_DETALLE.md`, `ROADMAP_OVERALL.md` · registro R165.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` · sello actualizado.

## R166 · Recuperación del dueño en eventos legacy · 4 de octubre de 2026
Causa: Administración lista eventos por `owner_account_id`; la pantalla ID de torneo y SCORES MI GRUPO dependían de una fila adicional en `gsc_personal_members`. Un evento legacy podía aparecer como administrable mientras su código no aparecía y su dueño veía “NO PERTENECES A NINGÚN GRUPO”.
Corrección candidata: `personal-events.list` incluye el evento del dueño aun si falta su fila de membresía; `personalMember` reconstruye el rol `organizer` sólo al coincidir el dueño persistido con la cuenta actual. Los demás usuarios todavía requieren membresía válida y los escritores oficiales mantienen su control de membresía.
Pruebas dirigidas: R162 PostgreSQL conserva ID single-use y rechaza otra cuenta; `test-personal-event-permissions.mjs` recupera los scores publicados del dueño con la fila legacy ausente y conserva denegación a terceros; R158 Scores mi grupo y event administration PASS; `git diff --check` PASS; Gate 0 PASS sobre main 72dd08b.
Estado: candidato R166 en rama Preview; Producción intacta. Build LAB detectó fallback de service worker e identificador HTML desfasados en R163; ambos se alinearon a R166 y se repite el banco completo. Revisión de interfaz con Family, código copiable/WhatsApp, scores de grupo, usuario ajeno, regreso, cierres y persistencia pendiente.
Verificación física de `golf-sc-gt-lab`: el grupo QA se creó, copió su código, apareció en Administración y su score persistió tras recargar. Se detectó que el enlace Atrás de Administración ignoraba `returnTo` y perdía el contexto de grupo; corregido y cubierto en `test-event-administration.mjs`. El Preview corregido aún falla ROADMAP/INVENTORY, y faltan las otras dos aplicaciones y el directorio de torneos con sesión de propietario.
- `api/_lib/personal-event-access.js` · recupera membresía organizadora sintética sólo desde `owner_account_id`.
- `api/personal-events.js` · lista al dueño con `LEFT JOIN`; no expone eventos a otras cuentas.
- `test-r162-single-use-tournament-code.mjs` · cubre ausencia de fila, lista y código del creador.
- `test-personal-event-permissions.mjs` · cubre acceso del dueño a scores existentes y denegación a terceros.
- `CONTROL_PROYECTO_SCIRE/ACEPTACION_R166.md` · criterios y evidencia de la corrección.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md` · prevención de la discrepancia entre autoridad administrativa y membresía.
- `index-grupal.html`, `service-worker.js`, `release.json` · identificadores R166 consistentes para actualización instalada y build visible.
- `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` · registro doble de R166.


### R166 · manifiesto de release común a LAB y Producción
`release.json` usa identificador neutral `20261004-R166`; los proyectos conservan la misma versión R166 en ambos entornos.


### R166 · regeneración del sello después del ajuste de release
`ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` quedan sincronizados con el manifiesto común R166.


### R166 · identificador común en la aplicación y caché instalada
`service-worker.js` y `index-grupal.html` usan el mismo identificador neutral que `release.json`; prueba `test-lab-registration-private-rounds-entry.mjs` valida el acuerdo.


## R167 · Administración: WhatsApp visible, confirmación de copia y retiro de permisos
Orden 4 octubre 18:50 Guatemala: retirar permisos administrativos, permisos de tarjetas y ventanas de generar/revocar. Causa del cuadro fuera de vista: Administración no cargaba scores-ui.css, único propietario del position:fixed/inset/z-index de scores-detail-backdrop. Copia informaba en status fuera de vista; ahora confirma junto al botón sólo después de writeText resuelto y muestra error local. Solicitud de código y permisos de servidor se conservan. Regresión VM PASS; Preview/navegador y publicación pendientes. QA explícito antes/después usa archivos baseline R166 capturados, APIs simuladas y share simulado; no acredita WhatsApp real/iPhone ni igualdad de bases aisladas. Rollback f23728439a73a5087e051f837049ac1dcd8cca6f.
- `event-administration.html` · modificación/control R167.
- `event-administration-ui.js` · modificación/control R167.
- `test-event-administration.mjs` · modificación/control R167.
- `test-r167-admin-share-feedback.mjs` · modificación/control R167.
- `scripts/fixtures` · modificación/control R167.
- `scripts/fixtures/r167-admin-browser.html` · modificación/control R167.
- `scripts/build-manual-lab.mjs` · modificación/control R167.
- `index-grupal.html` · modificación/control R167.
- `service-worker.js` · modificación/control R167.
- `release.json` · modificación/control R167.
- `ROADMAP_OVERALL.md` · modificación/control R167.
- `ROADMAP_A_DETALLE.md` · modificación/control R167.
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` · modificación/control R167.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md` · modificación/control R167.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` · modificación/control R167.
- `test-r156-tournament-invitation.mjs` · actualiza expectativa heredada de permisos al retiro ordenado R167; build remoto anterior se detuvo en esta expectativa, no se promovió.
R167 QA: el fixture se ejecuta después del parser y omite auth-gate.js sólo en datos simulados porque su ruta de prueba no es Administración. La aplicación conserva auth-gate.js sin cambio.
R167 navegador QA detectó X raíz sobre X del cuadro WhatsApp: raíz con z-index 2147483001 superaba backdrop 11000; ocultar sólo main>[data-gsc-close] mientras #gscWhatsAppInvitation existe. event-administration.html y test-r167-admin-share-feedback.mjs agregan control permanente. Antes posición static top820/bottom1664; después fixed top0/bottom844 en viewport844; confirmación de copia visible. Envíos QA separados verificados; clipboard virtual de CUA no permite leer el portapapeles nativo, no se acredita lectura física.


## R168 · 2026-10-04 · X funcional desde Scores compartidos

- Orden: revisar X de pantallas principales y ramificaciones, con pulsación y destino comprobado.
- Fallo reproducido en navegador real de Producción: /live-hub.html?demo=1&shared=1; pulsar Cerrar Scores conserva la tabla.
- Causa: showTournamentPortal activa un directorio que renderTournamentShelf oculta cuando shared=1.
- Corrección mínima: Cerrar Scores en shared=1 o display=1 usa hubBack; returnTo autorizado conserva precedencia. Directorio normal conserva regreso a lista.
- Evidencia adicional: Family real en Producción contiene Jimmy hoyo 4, gross 20, neto 16, EVEN; X por directorio funciona. General, Categoría, Buscar y Favoritos con detalle de 18 scores cerraron sin salir de la rama.
- Regresión: ejecutar handler de cierre con matriz shared/display/directorio/returnTo y negar destinos externos. Navegador Preview y publicación se registran tras verificar.
- REINTENTAR pertenece al comprobador de actualización; SIN SEÑAL pertenece al polling de Scores. No constituyen confirmación de actualización.
- Límite: no se certifica iPhone nativo ni todas las ramas privadas sin una sesión autorizada y datos disponibles.

- Control permanente: `test-r168-scores-close.mjs`, integrado en `scripts/build-manual-lab.mjs`; corrección en `live-hub.js`.

## R169 · 2026-10-04 · Cierre uniforme y posición de Administración

- `shortcuts-ui.js`: X compartida con marco verde de 2 px y área de 54 × 54 px, posición fija común en pantallas y ventanas internas; conserva cada acción de cierre.
- Administración: eliminar margen vertical automático que alejaba título y lista de la navegación.
- Validación: `test-r157-uniform-navigation.mjs`, `test-r158-group-scores.mjs`, `test-r168-scores-close.mjs` y revisión del navegador publicado; no declarar revisión física de iPhone ni sincronización de datos.
- Pendiente demostrado: bases LAB/Producción separadas y acceso seguro rechazado con CORREO O CONTRASEÑA INCORRECTOS; la publicación no migra registros.

## R170 · 2026-10-04 · Participación en torneo explícita

- `index-grupal.html` y `private-rounds.js`: Scores Torneo sin pertenencia abre ventana SCORES TORNEO con NO PERTENECES A NINGÚN TORNEO y X común.
- `live-hub.js` y `live-hub.html`: misma indicación en directorio del Menú, conservando listado global. Fallo de red no equivale a ausencia de participación.
- `test-r158-group-scores.mjs`: casos de tarjeta sin evento, otro grupo y torneo sin jugadores; revisión de navegador antes de publicar.
- Persisten bloqueos de sincronización de registros LAB/Producción y revisión privada autenticada; no declarar 100% físico de iPhone.

- R170: Administración vacía indica falta de eventos administrables en este entorno; no afirma ausencia de torneos públicos. La sincronización de registros permanece pendiente.

## R171 · 2026-10-04 · Directorio global único en Administración y Scores
- `api/event-administration.js` identifica el entorno de su lista autorizada; no altera autorización ni base de datos.
- `event-administration-ui.js` reúne los torneos públicos de `/api/tournament-score-directory` con los grupos/eventos administrables locales, deduplicando por entorno, tipo e ID. Eventos públicos no autorizados no reciben códigos ni acciones de borrado. Error o lista parcial no equivale a vacío.
- `live-hub.js`: VER SCORES abre exactamente el torneo seleccionado por entorno/ID.
- `test-r167-admin-share-feedback.mjs`: cuarenta torneos en dos entornos, ID repetido entre entornos, grupo privado local, autoridad local, códigos ajenos excluidos y fallo de identidad. Revisión en navegador de ambas listas y apertura de cada torneo antes de publicar.
- Pendiente/BLOQUEADO: grupos privados de otras cuentas/orígenes no se exponen públicamente ni se migran. No declarar sincronización privada ni 100% de revisión nativa iPhone.

## R172 — directorio automático (2026-10-05)
Administración y Scores consultan el directorio global cada 5 segundos mientras la pantalla está visible y al recuperar visibilidad o conexión. Las consultas tienen límite de 8 segundos, no se superponen y preservan la lista conocida ante errores o respuestas parciales; Administración conserva el detalle abierto y Scores mantiene la selección cuando no hay cambios. La llegada se verificó con `scripts/fixtures/r172-auto-directory.html`, sin crear torneos reales, y con `test-r172-directory-auto-refresh.mjs`.

## R172 — corrección de inventario y compilación (2026-10-05)
Se recalculó `sourceDigest` sobre los SHA de Git de los 905 archivos activos. La huella anterior no correspondía al árbol comprometido y hacía fallar INVENTORY GATE. Vercel también detectó una expresión inválida en `index-grupal.html`; se restauró el límite `Math.min(18, Number(maxHole)||18)`. Los tres PDF permanecen sellados en `INVENTARIOS_V311.lock.json`.

R172 — Se restauró íntegramente el historial anterior desde main y se conservaron únicamente las anotaciones de esta versión.

## R172 — archivos incluidos en la consolidación (2026-10-05)
La puerta de hoja de ruta registra el alcance integrado en main:
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`
- `ROADMAP_A_DETALLE.md`
- `ROADMAP_OVERALL.md`
- `directory-auto-refresh.js`
- `event-administration-ui.js`
- `event-administration.html`
- `index-grupal.html`
- `live-hub.html`
- `live-hub.js`
- `release.json`
- `scripts/build-manual-lab.mjs`
- `scripts/fixtures/r172-auto-directory.html`
- `service-worker.js`
- `test-r172-directory-auto-refresh.mjs`

## R173 · origen visible y alcance de ID · 4 octubre 2026
Fuente/base y rollback: main c2532f3c94f2e9ebbf4bc64f96803de5bef0e246 (R172). Reproducción en Producción: Family tiene data-event-source=lab y Santa delfina=production, pero ambas tarjetas mostraban únicamente TORNEO. El directorio público es federado; los códigos de un uso siguen perteneciendo al organizador y a la base de origen. Alcance mínimo: mostrar LABORATORIO/PRODUCCIÓN por tarjeta y explicar el acceso a ID/gestión cuando la fila es sólo pública; ID DE TORNEO indica el ambiente devuelto por su API de lista autorizada. No migra datos ni amplía permisos. Aceptación: origen visible correcto, mismo ID en dos bases conserva dos filas, ningún código o acción ajena aparece, Scores abre el origen elegido, lista y regreso conservados. Riesgos: cliente instalado R155 observado; no certificar su actualización ni códigos de la cuenta del propietario sin acceso real. Plan: regresiones de directorio/códigos, banco LAB y recorrido en Preview READY con datos públicos reales. Estado al registrar: corrección local aplicada; Preview y publicación pendientes.
Archivos: `event-administration-ui.js`, `api/personal-events.js`, `personal-events.js`, `test-r167-admin-share-feedback.mjs`, `test-r162-single-use-tournament-code.mjs`, `index-grupal.html`, `service-worker.js`, `release.json`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.

## R173 · código incluido en la primera invitación · 5 octubre 2026
Causa comprobada en `whatsapp-invitations.js`: la primera invitación omitía el código y prometía un segundo mensaje; compartir/copiar sólo código estaba oculto hasta completar el primero. Corrección mínima: la primera invitación contiene CÓDIGO DE INGRESO y su valor; compartir/copiar sólo código queda visible desde el inicio. La confirmación indica preparar/completar envío en WhatsApp, nunca entrega al destinatario. Regresiones: `test-r159-whatsapp-two-messages.mjs`, `test-lab-private-round-share-flow.mjs`; invitaciones de grupo/torneo, payload exacto, fallback wa.me, cancelación/reintento, copia y regreso a Score Card. Banco `scripts/build-manual-lab.mjs` completo PASS técnico el 5 octubre; no equivale a navegador ni iPhone físico. Bloqueo real de publicación/verificación: LAB y Producción responden 402 DEPLOYMENT_DISABLED y muestran Deployment Paused; dashboard del equipo marca Overdue y Payment failed. Facturación requiere acción del titular, sin reintentos ciegos de despliegue. R173 permanece candidato local sin aprobación de recorrido real ni publicación. Rollback/base: c2532f3c94f2e9ebbf4bc64f96803de5bef0e246.

## R173 · test host-aware para despliegues Vercel · 5 octubre 2026
El Preview LAB falló concretamente en R162: host de producción esperado `production`, obtenido `lab`, porque su proceso tenía `VERCEL_PROJECT_ID` del proyecto LAB. El handler prioriza la identidad del proyecto sobre el host; el test enviaba host de producción sin simular el proyecto productivo. El helper ahora configura ID de proyecto LAB/PROD por host y siempre restaura el valor anterior. `node test-r162-single-use-tournament-code.mjs` PASS en el entorno local; la prueba conserva el chequeo de localhost contra identidad real. No cambia el handler ni los datos. Requisito de salida: build completo y recorrido real Preview; HTTP 200 actual sigue en R172.
R173 Preview follow-up: second Vercel failure was the helper's localhost assertion omitting `GSC_ENVIRONMENT=lab`; it now derives expected source from `tournamentDirectoryEnvironment` and simulates/restores both environment variables per hostname. Directed test passes under LAB, Production simulation, and default local environment.
R173 follow-up 2: Preview confirmó que R162 duplicaba el mapeo de entorno ya cubierto por `test-r163-cross-environment-tournament-scores.mjs`; se retiró esa aserción redundante de R162. R162 queda en autorización/ciclo de vida del código; R163 verifica LAB/PROD con variables y hosts. Ambos dirigidos PASS local y con GSC_ENVIRONMENT=lab.

## R173-B1 · etiqueta visible sincronizada · 5 octubre 2026
Capturas reales LAB/Producción mostraron R155. Evidencia directa del HTML desplegado: `meta[name=gscg-release]` ya era `20261004-R173`, mientras que el contenido literal de `#appReleaseBadge` seguía `VERSIÓN R155`; release.json por sí solo no demostraba la versión visible. Se alinea el texto inicial a R173 y se cambia el ID técnico a `20261005-R173-B1` en `release.json`, `index-grupal.html` y `service-worker.js` para que una instalación R173 detecte la compilación corregida. El test de entrega exige coherencia del badge inicial. Pruebas dirigidas PASS; pendiente el Preview de B1 y confirmar la pantalla tras entrega.

R173-B1 CI follow-up · Causas del PR #71 corregidas antes de publicar: test V305 exigía openCardLibraryButton y el encabezado MIS RONDAS GUARDADAS aunque la UI vigente usa sólo controles Setup/Stableford y título RONDAS GUARDADAS; Stableford test exigía micrófonos retirados por R11 y una etiqueta sin tilde; el job macOS descargaba todas las refs y chocaba con ramas LAB/lab. Se alinearon pruebas al contrato vigente, se acentuó SÚPER SENIOR y el checkout nativo ahora toma SHA del PR con historial mínimo y fetch explícito de base. PASS local dirigido; nueva ejecución remota pendiente.
R173-B1 CI follow-up 2 · `test-v304-homogeneous-registration-actions.mjs` y `test-v305-registration-guides-parser-truth.mjs` aún exigían la etiqueta sin tilde `SUPER`; se alinearon con la etiqueta visible `SÚPER SENIOR · AMARILLAS`. Dirigidas V304, V305 parser e historial y Stableford UI PASS.


## R173-B1 CI follow-up 3 · 5 octubre 2026
El gate `test-v307-match-arrows-format.mjs` quedó desfasado: buscaba `· MEDAL PLAY` dentro de `generalMatchDetail`, aunque la implementación vigente devuelve sólo el nombre del juego lateral en mayúsculas. Se ajusta la expectativa al contrato actual; no cambia interfaz ni lógica. Falta confirmar el nuevo resultado remoto de CI.


## R173-B1 CI follow-up · 5 octubre 2026
El control V307 tenía una segunda expectativa obsoleta: `matchSymbol` ahora representa el empate con `=` accesible además de las flechas de victoria/derrota. El test se alinea al comportamiento vigente; no cambia la aplicación. CI remoto pendiente.


## R173-B1 CI follow-up · 5 octubre 2026 · matriz de categorías
El diagnóstico R80 detectó que la tarjeta global de juego general imprimía sólo el nombre del jugador. Se corrigió `strokeHalf` para incluir categoría y nombre con el mismo formato accesible que las demás modalidades. CI remoto pendiente.


## R173-B1 CI follow-up · 5 octubre 2026 · dependencias
El gate completo ejecutaba `build-manual-lab.mjs`, que invoca `test-r163-cross-environment-tournament-scores.mjs` y necesita `@electric-sql/pglite`; el workflow no instalaba dependencias. Se añade instalación reproducible de la versión fijada en `package.json` antes de los gates y se amplía el límite a 10 minutos. CI remoto pendiente.


## R173-B1 CI follow-up · 5 octubre 2026 · paquete móvil
El paquete nativo falló porque `scripts/build-mobile-web.mjs` todavía copiaba `voice-assistant.js`, retirado y sin referencias desde la aplicación o el Service Worker. Se elimina esa entrada obsoleta del conjunto de recursos; CI móvil pendiente.

## R173-B1 · WhatsApp de ID de grupo vuelve a Score Card · 5 octubre 2026

- `index-grupal.html`: compartir el ID del grupo abre `wa.me` en la misma pestaña con `location.assign`; se elimina la pestaña `_blank` que dejaba Safari en blanco al regresar desde WhatsApp.
- `test-r159-whatsapp-two-messages.mjs`: regresión sobre el handler exacto: copia W2RE4FG8GH, codifica el mensaje FRIENDS, navega en la pestaña actual y no llama `window.open`.
- Estado: cambio y control registrados en rama aislada `codex/r173-whatsapp-same-tab-preview`; prueba remota, Preview y recorrido físico iPhone PENDIENTES. Producción intacta.
- Control de secuencia CI: ambas hojas de ruta se actualizaron en un único commit para satisfacer la puerta `roadmap-gate`.


R173 WhatsApp same-tab test follow-up · 6 octubre 2026
CI de f1dcc40 confirmó todos los gates hasta la regresión nueva, que esperaba los dos caracteres `\\n` aunque el handler produce el salto de línea real. La expectativa se corrigió para verificar `Grupo FRIENDS`, salto de línea y `Código: W2RE4FG8GH`. No cambia el comportamiento de la aplicación.


R173 WhatsApp same-tab test follow-up · 6 octubre 2026
CI de f1dcc40 confirmó los gates de código; la regresión añadida esperaba los dos caracteres `\\n` aunque el handler produce un salto de línea real. Se corrigió la expectativa para comprobar el texto de invitación con su salto de línea real. Se vuelve a sellar el inventario de fuentes.


## R174 · Registro inicial sin excepción en navegador web · 6 octubre 2026

- Reproducción en navegador real de Producción y LAB: la consola mostraba `TypeError: Cannot read properties of undefined (reading 'standalone')` al iniciar `openSetup()`; el flujo se detenía en `showInstallControl()` antes de abrir Registro.
- Causa exacta: `standaloneApp()` concatenaba `.matchesigator.standalone` después de `matchMedia()`.
- Corrección mínima: consultar `matchMedia(...).matches` y `navigator?.standalone` como condiciones seguras e independientes; conservar detección nativa, PWA y Safari instalado.
- Regresión `test-r174-standalone-registration-detection.mjs`: navegador normal, matchMedia ausente, PWA, iOS standalone y contenedor nativo; integrada en `scripts/build-manual-lab.mjs`.
- Release/cache: `index-grupal.html`, `release.json`, `service-worker.js` quedan alineados en R174.
- Datos: no se crean ni eliminan torneos o rondas. Scores público en ambas bases no mostró torneos activos; publicación sujeta a puertas de calidad y revisión física obligatorias.
- Archivos: `index-grupal.html`, `release.json`, `service-worker.js`, `test-r174-standalone-registration-detection.mjs`, `scripts/build-manual-lab.mjs`, ambos ROADMAPS, mapa maestro e inventario V311.


## R175 · Entrada libre y autorización única de Organizador · 6 octubre 2026

Reproducción real en LAB: desde Organizador, “SOY EL PROPIETARIO · INICIAR SESIÓN” abría el formulario “Bienvenido” de correo y contraseña; Producción tenía una sesión persistente y no mostraba el desvío al cargar. La causa fue una rama de navegación explícita desde el diálogo y la apertura automática de auth-gate al faltar sesión. Corrección: quitar ese botón y que una sesión ausente no abra la pantalla de cuenta en la ruta normal; el formulario opcional sigue accesible sólo con `?account=1`. Organizador conserva un solo código de autorización; la Score Card, Registro y Scores no requieren correo ni contraseña.

Prueba permanente: `test-lab-account-gate.mjs` confirma que el arranque sin sesión no lanza el formulario, que la ruta opcional explícita sigue disponible y que Organizador no ofrece el desvío a cuenta pero conserva el código. La identidad y permisos de torneos siguen en sus APIs. Sin cambios ni borrados de rondas, grupos o torneos.

Archivos: api/_lib/event-lifecycle.js, api/live.js, api/tournament-score-directory.js, scripts/build-manual-lab.mjs, test-event-lifecycle.mjs, test-r175-event-expiry-directory-recovery.mjs, auth-gate.js, personal-events.js, test-lab-account-gate.mjs, index-grupal.html, release.json, service-worker.js, CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md, CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md, CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md, CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json, ROADMAP_A_DETALLE.md, ROADMAP_OVERALL.md. LAB/Producción permanecen sin publicar hasta Preview READY, pruebas del banco y recorrido automatizado verificado.


R175 · corrección del empaquetado del candidato · 6 octubre 2026
El primer Preview de R175 se detuvo porque la última modificación no incluía los dos ROADMAPS; el gate lo comprobó en el log de Vercel. Este commit actualiza juntos ambos ROADMAPS y regenera el sello de inventario. El código del candidato no cambia en este follow-up; los previews y la prueba visual siguen pendientes.


R175 · etiqueta inicial de release en Score Card · 6 octubre 2026
La suite del Preview detectó que `index-grupal.html` conservaba el texto inicial `VERSIÓN R174` aunque su meta y `release.json` ya eran R175. Se corrigió sólo la etiqueta estática a R175; la prueba de entrega exige concordancia antes de JavaScript. Previews pendientes de reconstrucción.


R175 · regresión de acceso libre corregida · 6 octubre 2026
El nuevo Preview encontró sintaxis inválida en las expresiones regulares de `test-lab-account-gate.mjs`. Se corrigió la extracción de `init()` y se hizo explícita la aserción que rechaza abrir el formulario por ausencia de sesión; la prueba no modifica el comportamiento de la app.


## R176 · Reapertura instalada vuelve a Registro · 6 octubre 2026

En la app instalada, cuando iOS devuelve al primer plano una página conservada en memoria, los manejadores de visibilidad/focus/pageshow ahora detectan la ronda recuperada y muestran Registro de jugadores. La acción persiste la tarjeta y no altera gross/netos. Las rutas web ordinarias conservan su destino y no se crea otra ronda. Control: `test-lab-registration-return-state.mjs`, incluido en el banco de LAB. Rama aislada sobre el commit R175; Producción intacta mientras se validan los gates y el flujo en iPhone.

## R177 · Administración e ID de torneos federados · 6 de octubre de 2026

La lista de Administración ahora consulta los eventos administrables del ambiente actual y del ambiente par, identifica cada evento por ambiente + tipo + ID y conserva grupos privados junto con torneos. La consulta remota revalida la misma cuenta en el servidor dueño; compartir y eliminar se reenvían sólo a LAB o Producción mediante rutas fijas y vuelven a comprobar permisos en ese ambiente. La identidad local exclusiva de un dispositivo no se convierte en una cuenta compartida: para sincronizar equipos distintos se necesita la sesión de cuenta/propietario reconocida por ambos ambientes. Los eventos ajenos del directorio público siguen en consulta solamente y no reciben código ni capacidad de borrado.

- api/event-administration.js · lista federada autenticada, reenvío seguro de código y eliminación a la base propietaria.
- api/personal-events.js · permite al organizador compartir un grupo activo aun si todavía no tiene jugadores asignados; sigue siendo código de lectura de un solo uso.
- event-administration-ui.js · muestra grupos y torneos de los dos ambientes, controles de compartir/eliminar autorizados y accesos de Scores General/Categorías; las acciones usan ambiente + tipo + ID.
- personal-events.js · ID DE TORNEOS enumera torneos activos administrables de ambos ambientes, genera y presenta el código, permite copiar, WhatsApp y eliminar con confirmación.
- live-hub.js · conserva la vista General/Categorías al abrir Scores desde Administración.
- test-r177-cross-device-admin.mjs · controla lista y acciones federadas, cookie de cuenta, separación de ambientes, IDs repetidos y accesos Scores.
- scripts/build-manual-lab.mjs · integra la regresión R177 al banco de laboratorio.
- index-grupal.html, release.json, service-worker.js · identificador común R177 y caché renovada.
- ROADMAP_OVERALL.md, ROADMAP_A_DETALLE.md, MAPA_MAESTRO_DE_ARCHIVOS.md, CONTINUIDAD_MAESTRA_LAB.md, registro de reincidencias e inventario V311 · registro versionado y sello de fuentes.

Estado: candidato R177. Debe pasar pruebas del repositorio, CI, Preview READY y recorrido de navegador en ambos alias. No se declara publicado ni se mezclan bases; la autorización de Producción previa permanece sujeta a cero FAIL y evidencia.

R177 test alignment: test-r167-admin-share-feedback.mjs ahora valida shareEvent, códigos y controles bloqueados para filas públicas sin autoridad; la prueba de IDs homónimos conserva la identidad ambiente+tipo+ID.

R177 CI follow-up 2: el mensaje vacío de ID DE TORNEOS conserva la expectativa R156 «NO TIENES TORNEOS» y ahora especifica que se consultaron los dos ambientes autorizados.


### R177 · Relay autenticado entre ambientes
La administración federada envía las acciones remotas exclusivamente al ambiente opuesto y conserva la sesión del organizador. El origen valida nuevamente el permiso antes de emitir códigos o eliminar eventos; fallos del par se muestran como resultado parcial.


R177 regresión: contexto de ambiente en prueba de eliminación y cobertura separada de borrar evento remoto autenticado.


R177: validar código de torneo activo sin roster y mantener el acceso compartido en solo lectura hasta la asignación de jugadores.


R177: comprobar el alcance del viewer mediante la sesión creada al canjear el código, no mediante el objeto de canje.

## R178 · 6 octubre 2026 · Recuperación de administración de torneos heredados

- La administración detecta el torneo heredado creado en este dispositivo mediante su clave de organizador y registra propiedad para la cuenta autenticada solo si la clave coincide con el hash persistido del torneo. El reclamo permanece válido para torneos vencidos y rechaza registros revocados; no amplía permisos a otros eventos.
- Score Card y Administración muestran `ELIMINAR TORNEO`; los grupos conservan `ELIMINAR GRUPO`. La clave se verifica en servidor; no se concede propiedad por cuenta o coincidencia de nombre.
- Archivos R178: `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_A_DETALLE.md`, `ROADMAP_OVERALL.md`, `api/_lib/event-administration.js`, `api/event-administration.js`, `event-administration-ui.js`, `index-grupal.html`, `personal-events.js`, `release.json`, `service-worker.js`, `test-event-administration.mjs`, `test-r167-admin-share-feedback.mjs`.
- Conserva el candado activo: punto de corte `línea 185`; activación `23 de agosto de 2026, 17:05:00, hora de Guatemala`. Pruebas locales de propiedad, etiqueta y flujos federados pasan. El Preview de Vercel anterior falló porque los archivos de roadmap se transmitieron truncados; esta revisión restaura los originales completos y completa los registros exigidos por el gate.


R178 · 6 octubre 2026 · Clic de eliminar siempre abre confirmación
El botón público de Administración estaba disabled cuando no se reconocía autoridad. Ahora abre CONFIRMA ELIMINAR con nombre, pregunta y CANCELAR; sólo confirmar envía delete/remote-delete y el servidor conserva la validación de permisos. No se elimina al abrir o cancelar. Pruebas: test-event-administration.mjs, test-r167-admin-share-feedback.mjs, test-r177-cross-device-admin.mjs.


## R179 · 6 octubre 2026 · Directorio global y códigos de torneos

- ID DE TORNEOS y Administración consultan todos los torneos activos de LAB y producción, sin filtro por creador, dispositivo o campo, sin límite fijo de lista. Cada fila conserva origen e ID, muestra el código de ingreso vigente y lo comparte.
- Escritor de códigos compartido con el flujo existente: conserva códigos pendientes y reemplaza los consumidos. El código de ingreso no concede organización ni eliminación; las autorizaciones del servidor se conservan. Botón rojo y CONFIRMA ELIMINAR de R178 conservados.
- Pruebas: test-r178-global-tournament-ids.mjs, test-r177-cross-device-admin.mjs, test-r167-admin-share-feedback.mjs, test-event-directory-code.mjs y test-personal-event-permissions.mjs PASS.
- Archivos: `api/_lib/personal-event-access.js`, `api/tournament-score-directory.js`, `event-administration-ui.js`, `personal-events.js`, `test-r178-global-tournament-ids.mjs`, `index-grupal.html`, `service-worker.js`, `release.json`.

- Navegador móvil: `tests/r179-global-tournament-browser.mjs` PASS: 120 códigos idénticos en ambos listados, dos ambientes, identidad sin torneos propios, botón rojo, confirmación y cero errores JS. El directorio marca lista parcial si falta un origen o código.

- R179 ajuste de compilación: `test-r156-tournament-invitation.mjs` valida la lista global en una identidad ajena. `whatsapp-invitations.js` y `test-r159-whatsapp-two-messages.mjs` conservan el origen LAB/producción en la invitación compartida y lo prueban.


## R180 · 6 octubre 2026 · Reabrir Score Card instalado

- Causa: pwa-launch enviaba inicio=1 y source=pwa; directHome forzaba Registro aun con tarjeta activa. Se elimina inicio del arranque y se recupera la tarjeta en PWA y accesos antiguos instalados. El enlace web normal mantiene Registro; nueva_ronda explícita sigue creando borrador.
- Archivos: `index-grupal.html`, `pwa-launch.html`, `service-worker.js`, `release.json`, `test-v368-canonical-home-entry.mjs`, `tests/r180-installed-card-resume.mjs`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.
- Prueba guardada tests/r180-installed-card-resume.mjs: navegador móvil, cerrar página y reabrir, Friends con jugador y scores de hoyos 1/2; acceso antiguo, standalone, web, dispositivo vacío y nueva ronda. PASS local. Datos de prueba aislados; no se altera el torneo real ni se reclama prueba física iPhone.
- Rollback: commit 5a3d33823896385adcb32e74514bce52df23b3e1, deployments R179 de ambos ambientes.


## R181 · 6 octubre 2026 · Organizador libre para torneos y grupos globales

- El directorio público de Organizador agrega todos los grupos vigentes de LAB y Producción junto a los torneos activos; no filtra por creador, dispositivo, campo, ciudad o sesión administrativa. La opción includeGroups conserva el contrato de los demás listados exclusivos de torneos.
- Códigos compartibles de grupos, identidad source+kind+id, navegación pública de Scores de grupos del otro entorno y estado LISTO aun si la API administrativa deniega sesión. Los endpoints de eliminación y escritura conservan sus controles existentes; esto libera el listado, los códigos y la consulta. Rondas exclusivamente locales sin publicación no son inventadas ni declaradas sincronizadas.
- Archivos: `api/_lib/personal-event-access.js`, `api/tournament-score-directory.js`, `event-administration-ui.js`, `live-hub.js`, `test-r181-global-groups-directory.mjs`, `tests/r181-global-groups-browser.mjs`, `test-r177-cross-device-admin.mjs`, `scripts/build-manual-lab.mjs`, `index-grupal.html`, `service-worker.js`, `release.json`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.
- Pruebas: test-r181-global-groups-directory.mjs (base real PGlite, códigos de grupo aceptados desde otra identidad, lectura pública y peer de grupos, 101 streams sin corte, datos de WhatsApp excluidos); tests/r181-global-groups-browser.mjs (120 eventos, 60 grupos, API admin 403, sin login, compartir, confirmar/cancelar, Scores peer, cero errores JS). Banco de despliegue incluye permanentemente el test DB. R180 reapertura con scores, R177 federación y permisos de escritor mantienen PASS.
- Rollback: commit 064f82e0f26dcf52b654405ca0450b317a5d31b3; LAB dpl_5PYRJw9Cgt2yHEY5aZvbBRCPH6Eo y Producción dpl_2aNxqL7GsEKZs9334tsEh2WR5GxV.


## R182 · Invitación de torneo por WhatsApp abre el Registro precargado · 6 de octubre de 2026

| Archivo | Responsabilidad | Control |
|---|---|---|
| whatsapp-invitations.js | Mensaje de torneo incluye enlace directo con ID, código y origen de ambiente; grupos conservan el enlace general. | R159 valida URL, código final y origen LAB/Producción. |
| personal-events.js | Pasa el ID del evento y, después de validar view-code/read, prepara Registro directamente. | R156 valida evento, nombre, campo, modalidad y rechazo de código inválido. |
| index-grupal.html | Usa el escritor de preparación existente para precargar campo, modalidad y nombre, sin registrar jugadores automáticamente; metadato y distintivo visibles ahora dicen R182. | Conserva confirmación del usuario y escritor oficial; sello visible coincide con release.json. |
| release.json, service-worker.js | Marcan R182, incluido RELEASE_FALLBACK, e invalidan caché instalada para ofrecer la versión nueva. | Sellos de versión deben coincidir antes de Preview. |
| Pruebas R159, R156, R24, test-lab-private-round-share-flow.mjs y revisiones R159/R161 | Protegen enlace directo precargado del torneo, flujo intacto de grupos, y mensajes visuales. | R159/R156/R24/R147 PASS; navegador y Preview en validación. |
| Aceptación R182, RC-111, MAPA, ambos ROADMAPS, sello V311 | Dejan alcance, defecto, archivos y versión documentados. | roadmap-gate e inventory-gate obligatorios. |

Producción R181 permanece intacta hasta que R182 supere los controles aplicables.

Archivos literales R182: whatsapp-invitations.js, personal-events.js, test-r159-whatsapp-two-messages.mjs, test-r156-tournament-invitation.mjs, scripts/review-r159-whatsapp-two-messages.mjs, scripts/review-r161.mjs, release.json, service-worker.js, CONTROL_PROYECTO_SCIRE/ACEPTACION_R182_WHATSAPP_TORNEO.md, CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md, CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md, ROADMAP_OVERALL.md, ROADMAP_A_DETALLE.md, CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json.
## R180 · 6 octubre 2026 · Alta directa y directorio global activo

- Crear torneo abre el formulario directamente; la lista del dispositivo muestra los cinco torneos guardados y permite quitar su referencia local para liberar espacio. El directorio de grupos y rondas activas consulta LAB y producción, indica el origen y reporta si falta un ambiente. Se conserva la autorización de propietario para compartir y eliminar torneos.
- Pruebas dirigidas: `test-lab-round-create-modal.mjs`, `test-lab-registration-return-state.mjs`, `test-tournament-organizer-permissions.mjs`, `test-event-administration.mjs` y `test-v353-live-hub.mjs` PASS.
- Archivos: `api/live.js`, `api/personal-events.js`, `live-hub.html`, `live-hub.js`, `index-grupal.html`, `release.json`, `service-worker.js`, `test-lab-round-create-modal.mjs`, `test-lab-registration-return-state.mjs`, `test-tournament-organizer-permissions.mjs` y `test-v353-live-hub.mjs` and `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.

## R181 · 6 octubre 2026 · Eliminación definitiva y directorio completo

- Pedido autorizado: eliminar físicamente torneos y rondas, manualmente o por expiración, sin archivo ni reaparición en ID, Administrador o Score Card. La purga incluye grupos, scores, historial, tarjetas centrales asociadas, códigos, sesiones, permisos, accesos y referencias locales confirmadas por el servidor; conserva las rondas y perfiles ajenos al evento eliminado. Los eventos eliminados nunca se restauran.
- Directorio de metadatos publicados: LAB + producción, sin filtros por cuenta, campo o dispositivo ni topes de 50 torneos/500 grupos; incluye rondas particulares e independientes. Si falta un ambiente se indica lista incompleta y se reintenta. La eliminación sigue exigiendo autoridad del evento. No se afirma sincronización de dispositivos desconectados.
- Verificación indispensable añadida: `test-event-total-purge.mjs` comprueba SQL físico manual/expiración y limpieza del archivo local, Score Card, favoritos, códigos y cola de sincronización; `test-tournament-organizer-permissions.mjs` comprueba 61 torneos/511 grupos y federación sin recursión.
- Archivos relacionados: `api/_lib/event-lifecycle.js`, `api/_lib/event-administration.js`, `api/event-administration.js`, `api/live.js`, `api/personal-events.js`, `api/tournament-score-directory.js`, `event-administration-ui.js`, `personal-events.js`, `index-grupal.html`, `release.json`, `service-worker.js`, `test-event-administration.mjs`, `test-event-lifecycle.mjs`, `test-event-total-purge.mjs`, `test-r175-event-expiry-directory-recovery.mjs`, `test-tournament-organizer-permissions.mjs`, `scripts/build-manual-lab.mjs`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.

- Ajuste de contrato solicitado en `test-personal-event-permissions.mjs`: los nombres e IDs del directorio global son visibles sin pertenencia; las pruebas de lectura/escritura protegida, códigos y revocación se conservan.

- `test-live-official-flow.mjs`: un enlace físicamente eliminado devuelve LIVE_LINK_INVALID; no conserva un registro revocado para responder con su estado anterior. La limpieza local también consulta streams independientes.

- Dependencias directas del borrado: `master-data-sync.js` identifica el evento en la cola central y `api/sync.js` impide recrearlo tras su eliminación, con bloqueo compartido frente a borrado concurrente. Pruebas: `test-master-data-sync.mjs`, `test-sync-api.mjs`, `test-sync-auth.mjs` y `test-event-total-purge.mjs`.

- Verificación publicada: el panel global de `api/live.js` debe incluir también streams privados independientes, igual que Administrador. Se unifican ambos tipos sin límite ni filtro por cuenta.

- Corrección indispensable de publicación: una consulta global devolvió HTTP 500 / XX000 durante peticiones simultáneas. `api/_lib/event-lifecycle.js` instala las funciones de purga una sola vez, en una transacción con bloqueo advisory y comprobación de versión; evita redefinirlas mientras otros clientes borran o consultan. `api/tournament-score-directory.js` registra el diagnóstico SQL si vuelve a fallar.


### R181 · Corrección de concurrencia acreditada
- Evidencia publicada: PostgreSQL XX000: tuple concurrently updated al redefinir funciones personales durante consultas simultáneas.
- api/_lib/personal-event-access.js: instala las mismas funciones de permisos una vez por versión, con bloqueo transaccional y doble comprobación; conserva sus decisiones de acceso.
- test-event-total-purge.mjs: verifica que repetir la inicialización no reescribe funciones instaladas.
- release.json y CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json: actualización de fecha e inventario de publicación.


## R184 · Integración de borrado permanente sin perder R182/R183 · 6 octubre 2026
Base vigente 4a493a7; incorpora la corrección acreditada 27c8ae4. Las publicaciones divergentes habían retirado la purga y reinstalado redefiniciones concurrentes. Integración incremental conserva invitaciones WhatsApp preconfiguradas, reapertura de Score Card, Scores privados sin truncar y tarjetas de Administración sin metadatos; restaura purga física, limpieza local y bloqueo de restauración. Pruebas de permisos, expiración, borrado y directorio obligatorias. Rollback de código: 4a493a7 (LAB) y 5bf0e96 (PROD), sin restaurar datos borrados.
- `ROADMAP_A_DETALLE.md` · integración/corrección/verificación R184 directamente vinculada a los pedidos.
- `ROADMAP_OVERALL.md` · integración/corrección/verificación R184 directamente vinculada a los pedidos.
- `api/_lib/event-administration.js` · integración/corrección/verificación R184 directamente vinculada a los pedidos.
- `api/_lib/event-lifecycle.js` · integración/corrección/verificación R184 directamente vinculada a los pedidos.
- `api/_lib/personal-event-access.js` · integración/corrección/verificación R184 directamente vinculada a los pedidos.
- `api/event-administration.js` · integración/corrección/verificación R184 directamente vinculada a los pedidos.
- `api/live.js` · integración/corrección/verificación R184 directamente vinculada a los pedidos.
- `api/personal-events.js` · integración/corrección/verificación R184 directamente vinculada a los pedidos.
- `api/sync.js` · integración/corrección/verificación R184 directamente vinculada a los pedidos.
- `api/tournament-score-directory.js` · integración/corrección/verificación R184 directamente vinculada a los pedidos.
- `event-administration-ui.js` · integración/corrección/verificación R184 directamente vinculada a los pedidos.
- `index-grupal.html` · integración/corrección/verificación R184 directamente vinculada a los pedidos.
- `live-hub.html` · integración/corrección/verificación R184 directamente vinculada a los pedidos.
- `live-hub.js` · integración/corrección/verificación R184 directamente vinculada a los pedidos.
- `master-data-sync.js` · integración/corrección/verificación R184 directamente vinculada a los pedidos.
- `personal-events.js` · integración/corrección/verificación R184 directamente vinculada a los pedidos.
- `release.json` · integración/corrección/verificación R184 directamente vinculada a los pedidos.
- `scripts/build-manual-lab.mjs` · integración/corrección/verificación R184 directamente vinculada a los pedidos.
- `service-worker.js` · integración/corrección/verificación R184 directamente vinculada a los pedidos.
- `test-event-administration.mjs` · integración/corrección/verificación R184 directamente vinculada a los pedidos.
- `test-event-lifecycle.mjs` · integración/corrección/verificación R184 directamente vinculada a los pedidos.
- `test-event-total-purge.mjs` · integración/corrección/verificación R184 directamente vinculada a los pedidos.
- `test-lab-registration-return-state.mjs` · integración/corrección/verificación R184 directamente vinculada a los pedidos.
- `test-lab-round-create-modal.mjs` · integración/corrección/verificación R184 directamente vinculada a los pedidos.
- `test-live-official-flow.mjs` · integración/corrección/verificación R184 directamente vinculada a los pedidos.
- `test-personal-event-permissions.mjs` · integración/corrección/verificación R184 directamente vinculada a los pedidos.
- `test-r175-event-expiry-directory-recovery.mjs` · integración/corrección/verificación R184 directamente vinculada a los pedidos.
- `test-tournament-organizer-permissions.mjs` · integración/corrección/verificación R184 directamente vinculada a los pedidos.
- `test-v353-live-hub.mjs` · integración/corrección/verificación R184 directamente vinculada a los pedidos.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` · integración/corrección/verificación R184 directamente vinculada a los pedidos.
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` · integración/corrección/verificación R184 directamente vinculada a los pedidos.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md` · integración/corrección/verificación R184 directamente vinculada a los pedidos.

R185 paridad mandatoria: RELEASE_UPDATE_MATRIX.md; scripts/release-matrix-gate.mjs; scripts/deployment-parity-gate.mjs; index-grupal.html; release.json; service-worker.js. Identidad R185 única, mismo SHA y contenido servido verificado antes del cierre.


## R188 · Administración muestra solo torneos · 7 de octubre de 2026

- `event-administration-ui.js`: la lista local y global filtra grupos privados y rondas; consulta el directorio de torneos sin grupos y conserva SCORES General, Categorías, ID/código, compartir y eliminar.
- `test-r185-round-delete-ui.mjs`: regresión confirma que grupos y rondas quedan fuera, y que las opciones de torneo permanecen.
- `release.json`, `index-grupal.html` y `service-worker.js`: identifican la entrega R188 para que ACTUALIZAR descargue el cambio.
- Comprobación enfocada: PASS local. El primer build LAB identificó este registro de roadmap como requisito; se agrega antes del siguiente build.

Inventario sellado contra el árbol Git R188; el registro se actualiza de forma atómica con ambos roadmaps.
Se ajusta `test-r181-global-groups-directory.mjs`: conserva la prueba del directorio y lectura de grupos para las funciones de grupo, y verifica que Administración solo reciba torneos.
Se actualiza `test-r167-admin-share-feedback.mjs`: conserva los 40 torneos globales, excluye el grupo privado de la tarjeta local y valida sus permisos restantes.
Se ajusta `test-r177-cross-device-admin.mjs`: el relay de grupo privado sigue cubierto; la tarjeta de Administración se valida con un torneo y los grupos se excluyen de la lista.

## R188-B1 · recuperación de borrado con identidad de dispositivo · 7 octubre 2026

- `api/personal-events.js`: si una cookie `gsc_code_session` vencida falla, usa únicamente una identidad de dispositivo cuya firma exista en la base y conserva la autorización del creador/organizador del torneo.
- `test-event-administration.mjs`: reproduce cookie de sesión vencida más dispositivo válido; verifica el borrado al confirmar y conserva denegación a terceros. `test-event-administration.mjs` y `test-lab-device-event-identity.mjs` PASS; el primer build detectó un escape incorrecto de la expresión de cookie, corregido antes del siguiente candidato.
- La compilación LAB y publicación siguen pendientes; Producción no cambia antes de PASS integral.
## R197 · Recuperación de ingreso a torneo con sesión vencida · 8 de octubre de 2026

- Rutas exactas: `api/personal-events.js`, `api/_lib/account-auth.js`, `test-lab-device-event-identity.mjs`, `scripts/build-manual-lab.mjs`, `index-grupal.html`, `service-worker.js`, `release.json`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md` e `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.
- La recuperación sólo se aplica a identidad no autenticada tras rechazo de una cookie de código vencida/inválida/revocada. Una identidad de dispositivo existente se valida en base de datos; si falta, sólo se crea en la acción `identity`. No concede membresía ni rol de organizador.
- Regresión `test-lab-device-event-identity.mjs`: cookie vencida sin dispositivo, nuevo cookie seguro, inspección de código de torneo sin consumo y denegación de otro dispositivo.
- Release sincronizado: `index-grupal.html`, `service-worker.js` y `release.json` usan `20261008-R197` / `R197`.
- Estado: prueba dirigida PASS; auditoría, revisión de navegador, prueba del propietario en iPhone y despliegues sujetos a gates.

## R198 · Recuperación de ingreso con sesión de cuenta vencida · 8 de octubre de 2026

- `api/personal-events.js`: si la resolución de cuenta devuelve `ACCOUNT_UNAUTHORIZED` durante `identity` o la inspección de un código de torneo, crea una identidad de dispositivo segura. Para una cookie `gsc_code_session` inválida/vencida/revocada, inspección puede recuperar igual cuando no existe cookie de dispositivo. Las operaciones de unión, administración y autorización conservan su validación.
- `test-lab-device-event-identity.mjs`: reproduce `ACCOUNT_UNAUTHORIZED` de cuenta al inspeccionar; confirma código sin consumir y control de acceso a terceros.
- Release sincronizado: `index-grupal.html`, `service-worker.js` y `release.json` declaran `20261008-R198`; el caché del Service Worker es exclusivo de R198.
- Estado: regresión dirigida PASS; gates automáticos y publicación LAB pendientes; Producción permanece en R197 hasta revisión física R198.

## R199 · ingreso cruzado Producción/LAB consume código con identidad segura · 8 octubre 2026

- Defecto observado: en Producción R198 el código `6D5ECEC172` seguía mostrando `NO SE PUDO PREPARAR EL EVENTO · REINTENTA`. La API de Producción respondió `LIVE_JOIN_CODE_INVALID`; el código mostrado en la tarjeta pertenecía a LAB.
- Causa raíz: el cliente sí reintentaba el código en el otro ambiente, pero la llamada final `join-code` podía llegar al ambiente dueño sin cookie same-site persistida. R198 cubría la inspección segura, pero no el consumo/unión del código en ese mismo contexto.
- Corrección: `resolveEventIdentity()` permite crear una identidad de dispositivo segura también en `join-code` cuando no hay sesión de cuenta válida. La membresía sigue dependiendo de poseer el código, de la configuración campo/modalidad y de capacidad; sólo se consume el código dentro de la unión oficial.
- Control permanente: `test-lab-device-event-identity.mjs` ahora reproduce inspección sin consumir y unión sin cookie previa; confirma cookie de dispositivo nueva, consumo de código de un solo uso y rechazo a terceros. `test-r191-cross-environment-tournament-entry.mjs` conserva el reintento Producción→LAB.
- Estado: regresión dirigida PASS local; despliegue LAB y Producción R199 pendiente.

## R216 · limpieza visual de tarjetas Scores de torneo · 8 octubre 2026

- `live-hub.html`: se elimina el `section.global-live-directory` que mostraba `GRUPOS Y RONDAS GLOBALES ACTIVOS`, `LISTA GLOBAL COMPLETA · LABORATORIO + PRODUCCIÓN`, nombres de grupos y fecha/hora de actualización encima de las tarjetas de Scores.
- `live-hub.js`: se retira el estado `activeGlobalDirectory`, el render del panel eliminado y el intervalo que consultaba `list_active_tournaments` sólo para llenar ese bloque visual. La lectura funcional de torneos y scores permanece en `refreshRegisteredDirectory`, `selectSavedTournament`, `refresh` y las vistas General/Categoría/Buscar/Favoritos.
- `test-r216-live-hub-no-global-directory-panel.mjs`: regresión dirigida que exige ausencia de IDs/textos del panel retirado y presencia de los cuatro accesos de Scores.
- `release.json`, `service-worker.js`, `index-grupal.html`: identidad visible y caché sincronizadas a `20261008-R216` / `R216`.

## R231 · legibilidad y limpieza de Live invitado 48h · 8 octubre 2026

| Archivo | Cambio |
|---|---|
| `live.html` | Aumenta números de la tabla a 13px, acumulados a 15px, etiquetas de acumulados en verde, pone NETO de fila y acumulado en verde, agrega CSS `gross-mark` idéntico al scorecard y cachea `live-view.js?v=20261008-R231`. |
| `event-administration.html` | Replica la misma legibilidad y la misma nomenclatura de golf dentro del diálogo de Organizador para la tarjeta Live de invitados 48h. |
| `live-view.js` | Elimina el texto blanco `HCP · marcas` bajo el nombre del jugador, pinta NETO en verde y renderiza GROSS con `gross-mark birdie/eagle/bogey/double-bogey` igual que la Score Card sin alterar Gross/HCP/Neto. |
| `event-administration-ui.js` | El diálogo Live de Organizador elimina `HCP · marcas`, pinta NETO en verde, aplica `gross-mark` y la tarjeta compacta de cada grupo invitado muestra sólo nombre y `ABRIR TARJETA LIVE`. |
| `access.html` | `COMPARTIR APP 48 HORAS` genera el enlace y abre WhatsApp por `wa.me`; tocar el recuadro del enlace vuelve a abrir WhatsApp sin copiar/pegar. |
| `test-r231-live-card-readability.mjs` | Regresión para tamaño/color de textos, ausencia de HCP/marcas, tarjeta compacta sin metadatos y nomenclatura de golf de Score Card. |
| `release.json`, `index-grupal.html`, `service-worker.js`, `scripts/build-manual-lab.mjs` | Identidad R231, caché renovada e inclusión del nuevo test en build completo. |

## R232 · enlace 48h clicable en WhatsApp · 8 octubre 2026

| Archivo | Cambio |
|---|---|
| `access.html` | El mensaje de `COMPARTIR APP 48 HORAS` ya no dice EPG; se arma en varias líneas con `join("\n")` y deja la URL sola para que WhatsApp la muestre como enlace tocable. |
| `live-view.js`, `event-administration-ui.js` | En `RESULTADOS ACUMULADOS`, el cuadro relativo dice sólo `+/-`; `+/- POR HOYO` se conserva sólo en la fila de hoyos. |
| `live.html` | Sube el cache de `live-view.js` a `20261008-R232` para publicar la tarjeta Live actualizada. |
| `test-r230-owner-access-48h-only.mjs` | Bloquea que vuelva el texto EPG o el `\n` literal pegado al enlace. |
| `release.json`, `index-grupal.html`, `service-worker.js` | Identidad R232 y caché PWA nueva para publicar la corrección. |

## R233 · etiqueta +/- acumulado en Live · 8 octubre 2026

| Archivo | Cambio |
|---|---|
| `live-view.js`, `event-administration-ui.js` | En `RESULTADOS ACUMULADOS`, el acumulado relativo dice `+/- ACUMULADO`; la fila de la tabla mantiene `+/- POR HOYO`. |
| `live.html`, `release.json`, `index-grupal.html`, `service-worker.js` | Identidad R233 y cache actualizado. |
| `event-administration.html` | El `X` del Organizador queda fijo, tocable y sin tapar la lista o tarjetas 48h; el Organizador y la tarjeta Live conservan scroll táctil. |
| `test-r231-live-card-readability.mjs` | Regresión para exigir `+/- ACUMULADO` en Live/Organizador y el cierre fijo del Organizador. |

## R237 · invitaciones 48h Producción/LAB en Organizador · 9 octubre 2026

| Archivo | Cambio |
|---|---|
| `api/event-administration.js` | `guestGroupRows()` crea una fila visible para cada grant 48h aunque `guest_groups` venga vacío; marca `has_snapshot` y mantiene la fusión del ambiente par para mostrar en LAB lo creado en Producción. |
| `event-administration-ui.js` | La tarjeta del Organizador cambia a `ACCESO COMPARTIDO 48H`, muestra `LAB`/`PRODUCTION`, vencimiento y deshabilita sólo el botón Live cuando aún no hay snapshot, sin ocultar la invitación. |
| `release.json`, `index-grupal.html`, `service-worker.js` | Identidad R237 y cache sincronizado. |
| `test-r237-cross-environment-48h-invitations.mjs` | Banco nuevo que exige invitaciones 48h cruzadas entre ambientes y filas visibles sin tarjeta Live registrada. |
| `test-r229-organizer-guest48h-live-card.mjs`, `test-r231-live-card-readability.mjs` | Expectativas actualizadas para el nuevo estado pendiente y la línea de origen/vigencia. |
| `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` | Sello R237 regenerado con 940 fuentes después de añadir el banco de invitaciones 48h cruzadas. |

## R238 · espejo firmado de accesos 48h Producción → LAB · 9 octubre 2026

| Archivo | Cambio |
|---|---|
| `api/event-administration.js` | Agrega `list-peer-guest48h`, protegido por `EVENT_ADMIN_PEER_SECRET` o `CRON_SECRET`, para que LAB lea directamente los grants 48h activos del ambiente dueño sin depender de una cookie LAB válida en Producción. |
| `api/event-administration.js` | `guestGroupRows()` pasa a helper compartido y `ownerFeedbackForPeer()` lista el propietario configurado o los propietarios activos recientes, conservando `current_snapshot` cuando exista y mostrando filas pendientes sin tarjeta Live. |
| `test-r237-cross-environment-48h-invitations.mjs` | Amplía la regresión R237 para bloquear el fallo visto en iPhone: Producción mostraba muchos accesos, pero LAB instalado no los recibía por autenticación cruzada. |
| `test-r227-guest48h-organizer-groups.mjs` | Actualiza expectativas rígidas de import/release para aceptar el helper nuevo sin debilitar el bloqueo de invitados al Organizador. |
| `release.json`, `index-grupal.html`, `service-worker.js` | Identidad R238 y cache `r238-lab-signed-production-guest48h-mirror` para forzar entrega nueva. |

## R239 · restauración de listas de torneos y rondas en Organizador · 9 octubre 2026

| Archivo | Cambio |
|---|---|
| `event-administration-ui.js` | `administrationRows()` vuelve a aceptar `event_kind:'tournament'` y `event_kind:'private'`; el orden prioriza torneos y luego rondas/grupos, sin ocultar eventos activos de LAB o Producción. |
| `event-administration-ui.js` | La llamada a `/api/tournament-score-directory` usa `includeGroups:true` y el encabezado visible cambia a `TORNEOS Y RONDAS`; el mensaje vacío también distingue que pueden faltar torneos o rondas. |
| `event-administration-ui.js` | `GRUPOS INVITADOS 48H` queda como sección independiente, por lo que la restauración de rondas ordinarias no mezcla los accesos 48h ni rompe la tarjeta Live invitada. |
| `test-r185-round-delete-ui.mjs` | Exige que una ronda/grupo local y una ronda/grupo remoto activo aparezcan junto a los torneos, con Scores y eliminación. |
| `test-r167-admin-share-feedback.mjs` | Actualiza el control global para aceptar el grupo privado propio en Administración y conservar permisos, colisiones de ID y acciones ajenas protegidas. |
| `test-r177-cross-device-admin.mjs` | Actualiza la federación LAB/Producción para exigir que el grupo privado remoto siga siendo relayable y además visible en Administración. |
| `test-r181-global-groups-directory.mjs` | Actualiza la expectativa del directorio global: Administración debe pedir grupos y mostrarlos, no excluirlos. |
| `release.json`, `index-grupal.html`, `service-worker.js` | Publicación R239 y caché nuevo `r239-organizer-tournaments-rounds-restored`. |
| `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` | Resella el inventario con 940 fuentes reales del repo remoto, excluyendo el `package-lock.json` transitorio generado sólo por instalación local. |

## R238-B1 · ajuste de compuerta para relay firmado 48h · 9 octubre 2026

| Archivo | Cambio |
|---|---|
| `test-r177-cross-device-admin.mjs` | La prueba conserva la lectura `list-local` con cookie para torneos y agrega la expectativa de `list-peer-guest48h` con `Authorization` para grupos invitados 48h. Evita que la compuerta antigua bloquee el build R238. |
| `test-r223-negative-handicap-campeonato-a.mjs`, `test-r224-scorecard-no-48h-owner-controls.mjs`, `test-r226-whatsapp-entry-code-prefill.mjs` | Las aserciones de release aceptan `20261008` o `20261009` para no bloquear R238 por fechas fijas heredadas. |
| `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` | Registran el ajuste de compuerta en el mismo commit que desbloquea la publicación. |
| `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` | Resella las fuentes activas después del ajuste de ROADMAP para que el inventario remoto no bloquee el build. |
