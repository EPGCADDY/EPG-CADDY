Y™Áäx-ÆÈ‹j◊ù¢Îi∫⁄+äßj[hëÈ‹¢ÈÌ€m;ﬂƒËµ©h∫⁄n∂XßzÕ|## R230 ¬∑ Access propietario con √∫nica opci√≥n 48 horas ¬∑ 8 de octubre de 2026

- `access.html`: el texto del panel propietario se reduce a crear √∫nicamente el enlace compartido v√°lido por 48 horas; conserva la aclaraci√≥n de que Registro no necesita credenciales.
- `access.html`: la secci√≥n propietaria elimina `CREAR C√ìDIGO PARA JUGADOR`, `VER ACTIVIDAD AN√ìNIMA`, `reportData`, `create-code`, `revoke-code` y el handler de reporte.
- `access.html`: el √∫nico bot√≥n operativo queda con el texto exacto `COMPARTIR APP 48 HORAS`; copiar y revocar se mantienen como controles del mismo enlace.
- `test-r230-owner-access-48h-only.mjs`: valida la opci√≥n √∫nica 48h, el texto aprobado, ausencia de opciones/reportes/c√≥digos y entrada libre.
- `scripts/build-manual-lab.mjs`: ejecuta el gate R230 dentro del banco obligatorio.
- `release.json`, `service-worker.js`, `index-grupal.html`: sincronizan `20261008-R230`, `VERSI√ìN R230`, cach√© `v402-r230-owner-access-48h-only` y `personal-events.js?v=20261008-R230`.

## R229 ¬∑ Tarjeta Live desde Organizador para invitados 48h ¬∑ 8 de octubre de 2026

- `event-administration-ui.js`: `guestGroupTitle()` identifica cada grupo invitado por el primer jugador del registro de la Score Card; deja de usar `snapshot.groupLabel` como t√≠tulo visible.
- `event-administration-ui.js`: agrega `guestGroupLiveCard()`, `guestPlayerLiveCard()` y utilidades de tabla para que el propietario abra cada ronda invitada 48h como una tarjeta digital tipo Live completa.
- `event-administration-ui.js`: `guestGroupCard()` queda como tarjeta compacta con bot√≥n `ABRIR TARJETA LIVE`; el resumen de jugadores en bullets deja de ser la vista principal.
- `event-administration.html`: agrega reglas de di√°logo ancho m√≥vil, tabla `score-live`, nombres verdes/may√∫sculos/sin subrayado, separador `RESULTADOS ACUMULADOS` y totales acumulados.
- `test-r229-organizer-guest48h-live-card.mjs`: valida apertura dedicada desde Organizador, tabla de 18 hoyos, t√≠tulo por primer jugador, ausencia de `groupLabel` como t√≠tulo y bloqueo del resumen de bullets.
- `scripts/build-manual-lab.mjs`: ejecuta el gate R229 dentro del banco obligatorio.
- `release.json`, `service-worker.js`, `index-grupal.html`: sincronizan `20261008-R229`, `VERSI√ìN R229`, cach√© `v401-r229-organizer-guest48h-live-card` y `personal-events.js?v=20261008-R229`.

## R228 ¬∑ Tarjeta digital Live del invitado 48h ¬∑ 8 de octubre de 2026

- `live-view.js`: `streamCard()` elimina el `<h2>` con el nombre del grupo para que no aparezca `GRUPO CHINITO` ni ning√∫n t√≠tulo equivalente en la tarjeta Live compartida.
- `live-view.js`: `playerCard()` cambia la fila de resultado por hoyo a `+/- POR HOYO`, agrega `RESULTADOS ACUMULADOS` antes de los totales y cambia la tarjeta de totales a la misma nomenclatura.
- `live.html`: la vista Live declara `gsc-navigation-unused`, fija su propio bot√≥n de cierre y reserva `padding-top` seguro para evitar que el cierre/men√∫ se monte sobre la tarjeta.
- `live.html`: los nombres de jugadores en la tarjeta Live quedan verdes, may√∫sculos y sin subrayado, conservando foco accesible.
- `test-r228-live-48h-shared-card-layout.mjs`: valida el flujo est√°tico de la tarjeta Live 48h compartida con datos de `GRUPO CHINITO`, bloqueo del t√≠tulo, metadatos visibles, separaci√≥n de resumen y etiquetas solicitadas.
- `scripts/build-manual-lab.mjs`: agrega la regresi√≥n R228 al banco obligatorio.
- `release.json`, `service-worker.js`, `index-grupal.html`: sincronizan `20261008-R228`, `VERSI√ìN R228`, cach√© `v400-r228-live-48h-shared-card-layout` y `personal-events.js?v=20261008-R228`.

## R227 ¬∑ Invitaciones 48h como grupos individuales en Organizador ¬∑ 8 de octubre de 2026

- `api/_lib/app-access.js`: agrega tabla `app_access_guest_groups` con `grant_id`, `group_key`, snapshot, modalidad, jugadores, hoyos y contadores; `recordGuestFeedback()` hace upsert por grupo y `ownerFeedback()` devuelve `guest_groups`.
- `index-grupal.html`: agrega `guestAccessGroupId()` y manda `guestGroupId` dentro del feedback 48h; el invitado sigue entrando a `index-grupal.html?source=guest48h` y registra jugadores en la Score Card normal.
- `api/event-administration.js`: importa `ownerFeedback`, construye `guestGroupRows()` y expone `guestGroups` en `list` y `list-local`; el bloqueo `EVENT_ADMIN_GUEST_FORBIDDEN` para cookie invitada se mantiene.
- `event-administration-ui.js`: agrega `guestGroupTitle()`, `guestGroupPlayerLine()` y `guestGroupCard()`; debajo de `TORNEOS` aparece `GRUPOS INVITADOS 48H` con tarjetas separadas por grupo.
- `test-r222-guest-48h-shared-link.mjs`: ahora publica dos grupos (`telefono-jaime` y `telefono-becky`) bajo el mismo enlace 48h y exige que `ownerFeedback()` conserve ambos.
- `test-r227-guest48h-organizer-groups.mjs`: valida persistencia por grupo, payload `guestGroupId`, API de Organizador, UI de tarjetas y bloqueo de Organizador para invitado.
- `scripts/build-manual-lab.mjs`: agrega la regresi√≥n R227 al banco obligatorio.
- `release.json`, `service-worker.js`, `index-grupal.html`: sincronizan `20261008-R227`, `VERSI√ìN R227`, cach√© `v399-r227-guest48h-organizer-groups` y `personal-events.js?v=20261008-R227`.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`: agrega RC-141 para la ausencia de grupos 48h individuales dentro de Organizador.
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`: registra el mapa R227 de backend, API, UI, Score Card y controles.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`: queda resellado para incluir el √°rbol R227 publicado.

## R226 ¬∑ WhatsApp sin copiar/pegar c√≥digo ¬∑ 8 de octubre de 2026

- `whatsapp-invitations.js`: `registrationUrl(source, code)` a√±ade `codigo` a `/index-grupal.html?inicio=1` cuando la invitaci√≥n no trae `eventId`; el mensaje deja claro que el enlace ya carga el c√≥digo.
- `personal-events.js`: agrega `loadStartupJoinCode()` y `consumeStartupJoinCode()` para capturar `codigo`/`code` de la URL, limpiar el par√°metro y reutilizarlo en `openTournamentBeforeRegistration()` y `joinTournamentByCode()`.
- `personal-events.js`: `openTournamentBeforeRegistration()` precarga el c√≥digo y dispara `CONTINUAR AL REGISTRO DE JUGADORES` autom√°ticamente, manteniendo la preparaci√≥n oficial del torneo antes de escribir jugadores.
- `live-control.js`: `quickShareGroup()` fuerza `forceStream:true` cuando la Score Card ya est√° conectada a un torneo; as√≠ `COMPARTIR LIVE` comparte s√≥lo esa ronda/grupo y no el torneo completo.
- `live-share.js`: `forceStream` evita la ruta `share-code` de viewer del torneo y usa `/api/live-share` con `liveEvent/liveKind` atado al stream publicado por la Score Card.
- `api/_lib/live-share.js`: `readLiveShare()` filtra por `issuer_stream_id`; el invitado no ve otros streams, grupos ni torneos activos.
- `test-r226-whatsapp-entry-code-prefill.mjs` y `test-lab-code-entry.mjs`: validan versi√≥n, URL con `codigo`, texto de WhatsApp, autoinspecci√≥n, ausencia de crash por botones retirados y Live limitado a la Score Card compartida.
- `scripts/build-manual-lab.mjs`: agrega la regresi√≥n R226 al banco t√©cnico obligatorio.
- `release.json`, `service-worker.js`, `index-grupal.html`: sincronizan `20261008-R226`, `VERSI√ìN R226`, cach√© `v398-r226-whatsapp-code-prefill` y `personal-events.js?v=20261008-R226`.
- `test-lab-private-round-share-flow.mjs`: actualiza la aserci√≥n hist√≥rica de ronda privada para exigir el mensaje R226 con c√≥digo precargado; evita que Vercel rechace la publicaci√≥n por una expectativa anterior.

## R225 ¬∑ Invitado 48h sin Organizador y con Compartir Live ¬∑ 8 de octubre de 2026

- `guest-access.js`: `hideGuestPrivateControls()` ya no elimina `gscLiveLaunch` ni `shareRoundLiveButton`; el aviso visible declara `LIVE PERMITIDO ¬∑ ORGANIZADOR BLOQUEADO`.
- `shortcuts-ui.js`: `render()` omite `ORGANIZADOR` cuando `root.GSC_GUEST_ACCESS` est√° activo; `act()` intercepta `organizer`, `organizer-invitations`, `administration`, `create-tournament`, `add-tournament`, `remove-tournament` y `clear-board` con mensaje de bloqueo.
- `live-control.js`: al montar el panel Live en invitado 48h elimina `liveOrganizerToggle` y `liveOrganizerPanel`, manteniendo el acceso r√°pido `quickShareGroup()`.
- `event-administration.html`: si existe `gsc_guest_mode=1`, reemplaza la pantalla por un aviso de invitado 48h sin Organizador.
- `event-administration-ui.js`: detiene la ejecuci√≥n del m√≥dulo administrativo cuando detecta cookie invitada 48h.
- `api/event-administration.js`: rechaza acciones administrativas con `EVENT_ADMIN_GUEST_FORBIDDEN` cuando hay `gsc_guest_mode=1`; conserva `remote-share` para compartir Live.
- `test-r225-guest-48h-no-organizer-live-allowed.mjs`: valida ocultamiento de Organizador, bloqueo directo, API defensiva y Live permitido.
- `test-r18-owner-guest-24h-access.mjs`: actualiza el contrato invitado para no remover botones Live.
- `release.json`, `service-worker.js`, `index-grupal.html`: sincronizan R225, cach√© `v397-r225-guest-48h-no-organizer-live`, meta `20261008-R225`, badge `VERSI√ìN R225` y `personal-events.js?v=20261008-R225`.

## R224 ¬∑ Retiro de controles 48h de la Score Card p√∫blica ¬∑ 8 de octubre de 2026

- `index-grupal.html`: la barra de herramientas queda limitada a funciones p√∫blicas (`COMPARTIR LIVE` y `GU√çA DE USUARIO` seg√∫n estado de ronda); ya no renderiza `ownerShare24h` ni `ownerTrialReport`.
- `index-grupal.html`: se elimina el bloque que consultaba `app-access?action=status` para mostrar controles propietarios cuando la cuenta autenticada era owner, evitando que Producci√≥n muestre botones de laboratorio por sesi√≥n.
- `index-grupal.html`: `renderDraft()` permite una fila adicional en edici√≥n de ronda activa hasta seis jugadores, `addRosterPlayer` revela esa fila, y `syncDraftPlayersFromManualRows()` procesa la fila nueva sin cortar en `draftPlayers.length`.
- `index-grupal.html`: el jugador agregado conserva `activeFrom=rosterEditJoinHole`, por lo que no exige scores de hoyos ya jugados y los scores previos de los dem√°s jugadores permanecen intactos.
- `access.html`: mantiene la administraci√≥n privada de invitaciones 48h mediante correo/contrase√±a, `create`, `report`, `revoke` y canje `/invite/<token>` hacia `source=guest48h`.
- `test-r224-scorecard-no-48h-owner-controls.mjs`: valida release R224, ausencia de textos/IDs 48h en Score Card y presencia del panel privado en `access.html`.
- `test-r224-registration-add-active-player.mjs`: valida bot√≥n `AGREGAR JUGADOR`, fila adicional hasta seis, sincronizaci√≥n de la fila nueva y entrada desde el siguiente hoyo.
- `test-v263-compact-players-back-button.mjs`: se actualiza para exigir alta posterior hasta seis preservando scores existentes.
- `test-owner-invitation-ui.mjs`, `test-r18-owner-guest-24h-access.mjs`, `test-lab-account-gate.mjs`, `test-lab-r60-physical-matrix.mjs`, `test-manual-startup-sharing.mjs` y `test-v311-live-support-link.mjs`: cambian de exigir el bot√≥n en Score Card a bloquear su exposici√≥n p√∫blica.
- `scripts/build-manual-lab.mjs`: agrega el test R224 al banco de publicaci√≥n LAB/Producci√≥n.
- `release.json`, `service-worker.js`, `index-grupal.html`: sincronizan R224, cache `v396-r224-hide-trial-48h-scorecard`, meta `20261008-R224`, badge `VERSI√ìN R224` y `personal-events.js?v=20261008-R224`.

## R223 ¬∑ Tecla `-` y handicap bajo cero en Campeonato/A ¬∑ 8 de octubre de 2026

- `index-grupal.html`: Registro muestra una tecla `-` junto al campo HDCP de cada jugador; al tocarla alterna el signo negativo y conserva el valor en el borrador.
- `index-grupal.html`: el campo HDCP acepta texto con patr√≥n `-?[0-9]*` para que iPhone no bloquee la captura de valores como `-2`.
- `index-grupal.html`: `strokesOnHole()` mantiene la distribuci√≥n negativa y `scoreObject()` conserva `net=gross-strokes`, por lo que `-2` aumenta el neto donde el jugador entrega golpes al campo.
- `index-grupal.html`: la fila HDCP pinta los golpes entregados con `hcp-stroke-give` y la respuesta avanzada de handicap dice `entrega` en lugar de `no recibe`.
- `test-r223-negative-handicap-campeonato-a.mjs`: agrega control espec√≠fico para Campeonato/A, tecla visible `-`, c√°lculo de `-2`, suma total `-2` y neto inverso.
- `scripts/build-manual-lab.mjs`: agrega el test R223 al banco de publicaci√≥n LAB/Producci√≥n.
- `release.json`, `service-worker.js`, `index-grupal.html`: sincronizan R223, cache `v395-r223-negative-handicap-campeonato-a`, meta `20261008-R223`, badge `VERSI√ìN R223` y `personal-events.js?v=20261008-R223`.

## R222 ¬∑ Enlace de prueba 48h y tablero de grupos invitados ¬∑ 8 de octubre de 2026

- `api/_lib/app-access.js`: `app_access_grants` agrega `max_uses` y `current_snapshot`; `createGrant()` emite 48 horas/5 usos; `redeemGuestToken()` consume una apertura por redenci√≥n y `recordGuestFeedback()` guarda la √∫ltima tarjeta de cada grupo sin gastar usos.
- `api/app-access.js`: `/api/app-access?action=create` entrega un √∫nico enlace `/invite/<token>` v√°lido 48h; `/redeem` redirige a `source=guest48h`; `/feedback` acepta snapshot de score card; `/report` devuelve el tablero propietario.
- `index-grupal.html`: los invitados env√≠an snapshot t√©cnico de la ronda al persistir cambios; el propietario ve `VER PRUEBA 48 H` con grupos independientes, jugadores, hoyos, gross y neto/+/-.
- `guest-access.js`: modo invitado 48h oculta herramientas de compartir y administraci√≥n para que los amigos no redistribuyan desde la aplicaci√≥n.
- `test-r222-guest-48h-shared-link.mjs`, `test-r18-owner-guest-24h-access.mjs`, `test-lab-account-gate.mjs`, `test-lab-r60-physical-matrix.mjs` y `test-global-public-entry-policy.mjs`: bloquean regresi√≥n de entrada p√∫blica, aislamiento invitado, cupo, vencimiento y visibilidad de tarjetas.
- `test-owner-invitation-ui.mjs`: sincroniza el mock del propietario con los dos controles R222 (`PRUEBA ¬∑ 48 H` y `VER PRUEBA 48 H`) para que el build de Vercel valide el flujo completo.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`: queda sincronizado con las fuentes R222 y el ajuste del gate f√≠sico.
- `release.json`, `service-worker.js`, `index-grupal.html`: sincronizan R222, cache `v394-r222-owner-trial-48h-shared-link`, meta `20261008-R222`, badge `VERSI√ìN R222` y `personal-events.js?v=20261008-R222`.

## R221 ¬∑ Paridad funcional para Compartir Live desde directorios LAB/Producci√≥n ¬∑ 8 de octubre de 2026

- `live-hub.js`: `shareGeneral()` detecta `shareEvent.directory` antes de invocar `GSCOneUseLive.share()`. Para eventos de directorio construye `tournamentHubShareUrl(state.generalToken, dominioDue√±o, location.href)` y usa `navigator.share` o copia al portapapeles.
- `live-hub.js`: el dominio due√±o queda determinado por `shareEvent.source`: LAB comparte `https://golf-sc-gt-lab.vercel.app/live-hub.html?...#general=directory_lab_...`; Producci√≥n comparte `https://epg-caddy.vercel.app/live-hub.html?...#general=directory_production_...`.
- `test-lab-code-entry.mjs`: agrega aserciones est√°ticas para asegurar que Scores de directorio comparte URL p√∫blica y manda eventos LAB al dominio LAB.
- `CONTROL_PROYECTO_SCIRE/ARQUITECTURA_PARIDAD_LAB_PRODUCCION.json`: declara la paridad 360 obligatoria entre LAB y Producci√≥n: mismo √°rbol publicado, release/meta/badge/SW alineados, entrada p√∫blica, escritores, acceso personal, directorios, Live, PWA/cache, ROADMAPS, inventario y gates; s√≥lo pueden variar dominios, project IDs, bases y secretos propios.
- `test-r221-lab-production-architecture-parity.mjs`: valida que LAB y Producci√≥n usen entorno declarado, que ning√∫n ambiente se active con la bandera del otro, que LAB conserve base aislada, que release visible/cache est√©n alineados y que el directorio p√∫blico no dependa de c√≥digo privado.
- `test-v353-live-hub.mjs`: conserva el bloqueo del nombre interno en UI/textos LIVE y permite √∫nicamente el dominio t√©cnico can√≥nico de Producci√≥n usado por el enlace p√∫blico.
- `scripts/build-manual-lab.mjs`: incorpora el nuevo gate de paridad al banco obligatorio.
- `release.json`, `service-worker.js`, `index-grupal.html`: sincronizan R221, cach√© `v393-r221-fix-compartir-live-directory-public-share`, meta `20261008-R221`, badge `VERSI√ìN R221` y `personal-events.js?v=20261008-R221`.

## R220 ¬∑ Relay same-origin para Compartir Live de eventos LAB remotos ¬∑ 8 de octubre de 2026

- `live-share.js`: calcula el ambiente actual por hostname; si `personal.source` difiere, genera el c√≥digo con `fetch('/api/event-administration', {action:'remote-share', source, eventId, eventKind})` y conserva el modal aprobado con enlace `/code-entry.html?visitor=1#code=...`.
- `live-share.js`: la ruta del mismo ambiente mantiene `GSCPersonalEvents.request('share-code', payload)`; LIVE legacy conserva `request('create', ..., publisherSecret)`.
- `test-lab-code-entry.mjs`: prueba tres rutas: personal sin publisher legacy, directorio LAB en LAB y directorio LAB desde producci√≥n v√≠a relay; bloquea la llamada cross-origin directa que causaba `NETWORK_ERROR`.
- `release.json`, `service-worker.js`, `index-grupal.html`: release `20261008-R220`, etiqueta visible `R220`, cache `v392-r220-fix-compartir-live-remote-share` y `personal-events.js?v=20261008-R220`.

## R219 ¬∑ Compartir Live source-aware desde Scores de directorio LAB ¬∑ 8 de octubre de 2026

- `live-hub.js`: incorpora `directoryEventDescriptor()` para tokens `directory_lab_<uuid>`, `directory_production_<uuid>` y privados; `currentShareEvent()` centraliza el evento activo y conserva `eventId`, `eventKind`, `source` y marca de directorio.
- `live-hub.js`: `renderScoresHeading()` habilita `COMPARTIR LIVE` cuando el evento actual proviene del directorio personal, adem√°s de los casos `personal_<eventId>` y LIVE legacy; `shareGeneral()` pasa el descriptor completo a `GSCOneUseLive.share()`.
- `live-share.js`: `GSCOneUseLive.share(kind,eventId,name,event)` usa el descriptor recibido, manda `source` a `GSCPersonalEvents.request('share-code', ...)` y conserva el enlace con `#code=...` para invitado.
- `test-lab-code-entry.mjs`: agrega VM `directory_lab` sin `publisherSecret`, comprueba payload `{eventId,eventKind:'tournament',source:'lab'}` y bloquea que el bot√≥n vuelva a perder el source.
- `release.json`, `service-worker.js`, `index-grupal.html`: release `20261008-R219`, etiqueta visible `R219`, cache `v391-r219-fix-compartir-live-directory-lab` y `personal-events.js?v=20261008-R219`.

## R218 ¬∑ Compartir Live habilitado en Scores personales ¬∑ 8 de octubre de 2026

- `live-share.js`: `GSCOneUseLive.share()` detecta `personal_<eventId>` antes de pedir `publisher(kind,eventId)`. Si el evento es personal, llama directamente a `GSCPersonalEvents.request('share-code',{eventId,eventKind})` y conserva el enlace R217 con `#code=...`.
- `live-hub.js`: `renderScoresHeading()` calcula `shareKind` desde el descriptor personal/one-use/directorio y define `personalShare` con `GSCPersonalEvents.descriptor('personal_'+general.id)`. `hubShareGeneral` queda deshabilitado s√≥lo si no hay evento personal ni publisher legacy.
- `test-lab-code-entry.mjs`: a√±ade VM sin `publisherSecret` para reproducir el caso de Scores General del torneo personal y exige que el modal genere `/code-entry.html?visitor=1#code=...`; adem√°s verifica est√°ticamente la condici√≥n del bot√≥n.
- `release.json`, `service-worker.js`, `index-grupal.html`: release `20261008-R218`, etiqueta visible `R218`, cache `v390-r218-fix-compartir-live-personal-scores` y `personal-events.js?v=20261008-R218`.

## R217 ¬∑ WhatsApp de codigo de un solo uso abre con codigo precargado ¬∑ 8 de octubre de 2026

- `live-share.js`: el mensaje de `GSCOneUseLive.share()` deja de depender de que el invitado copie manualmente un codigo largo. El enlace `/code-entry.html?visitor=1#code=...` transporta el codigo en el fragmento del navegador y el texto de WhatsApp indica tocar enlace + ENTRAR.
- `code-entry.js`: lee `#code`, coloca el valor en `entryCode`, limpia el hash con `history.replaceState()` y mantiene la regla de seguridad: no consume ni redime automaticamente al abrir el link.
- `test-lab-code-entry.mjs`: actualiza el contrato para exigir link precargado, mensaje entendible para invitado y cero redencion hasta submit; conserva el flujo legacy con `liveEvent/liveKind`.
- `release.json`, `service-worker.js`, `index-grupal.html`: suben a `20261008-R217` / `R217-WHATSAPP-ONE-USE-CODE-PREFILL`.

## R216 ¬∑ Scores de torneo sin panel global de grupos/rondas activos ¬∑ 8 de octubre de 2026

- `live-hub.html`: se elimina la secci√≥n `hubGlobalLiveDirectory`/`global-live-directory`, responsable del bloque blanco mostrado sobre los tabs de Scores.
- `live-hub.js`: se retiran `activeGlobalDirectory`, `renderActiveGlobalDirectory()` y `refreshActiveGlobalDirectory()`; la pantalla de Scores ya no consulta ni pinta `GRUPOS Y RONDAS GLOBALES ACTIVOS`, listas globales, grupos ni horas de actualizaci√≥n.
- `test-r216-live-hub-no-global-directory-panel.mjs`: verifica ausencia de IDs/textos prohibidos y conserva `hubShowGeneral`, `hubShowCategories`, `hubShowIndividual` y `hubAddToBoard`.
- `release.json`, `service-worker.js` e `index-grupal.html`: identidad visible/cache en `20261008-R216`.
- Cierre de despliegue: tras reparar el blob remoto de `index-grupal.html`, ROADMAPS e inventario viajan juntos para satisfacer `roadmap-gate` e `inventory-gate` en Vercel.

## R215 ¬∑ Sin purga local por ausencia remota en `list` ¬∑ 8 de octubre de 2026

- `personal-events.js`: `sync()` mantiene la union de eventos remotos, alias, cuenta y lectura de entorno par, pero deja de enviar `result.removedEvents` / `other.removedEvents` a `purgeDeletedEvents()`. El telefono conserva el torneo local si el servidor responde una lista vacia o no encuentra una fila conocida.
- `personal-events.js`: se mantiene la purga por `removedStreams` para referencias de stream y se conserva `GSCPersonalEvents.purgeDeletedEvents()` para borrado fisico explicito/manual.
- `test-r215-personal-list-no-local-purge.mjs`: VM del cliente con `gsc-personal-events-v1`, seleccion de torneo, ronda activa, archivo local, hub y live-control; el mock de `/api/personal-events` devuelve `events:[]` y `removedEvents:[...]`; la prueba exige conservar todo y no emitir `gsc-events-removed`.
- `test-event-total-purge.mjs`: sigue verificando que una purga explicita borre ID, seleccion, ronda activa, archivo, hub, codigos y cola de sync, sin tocar perfiles ajenos.
- `scripts/build-manual-lab.mjs`: agrega la regresion R215 al banco LAB.
- `release.json`, `index-grupal.html`, `service-worker.js`: etiqueta visible, meta release, `personal-events.js?v=20261008-R215`, cache `v387-r215-no-list-purge-local-tournaments` y version tecnica `R215-NO-LIST-PURGE-LOCAL-TOURNAMENTS`.
- Motivo operativo: las bases consultadas mostraban directorio publico vacio antes y despues de R214; el cliente no debe interpretar una ausencia remota como orden de borrar datos locales del jugador.
- Archivos: `personal-events.js`, `test-r215-personal-list-no-local-purge.mjs`, `scripts/build-manual-lab.mjs`, `release.json`, `index-grupal.html`, `service-worker.js`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` e `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.

## R214 ¬∑ Gate de actualizacion compatible con R213 ¬∑ 8 de octubre de 2026

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

## R213 ¬∑ Navegacion personal sin pantalla negra 403 ¬∑ 8 de octubre de 2026

- `service-worker.js`: elimina la verificacion previa `authorizedPersonalNavigation`; `index-grupal.html` con `personalEvent` o `personalAccount` pasa por `manualAppNavigation` y no puede devolver texto plano como pagina final.
- `middleware.js`: si la verificacion inmediata de `personalEvent` no confirma membresia, deja cargar la app en vez de responder `Acceso personal no autorizado`; las APIs conservan los rechazos propios.
- `index-grupal.html`: sube a R213, carga `personal-events.js?v=20261008-R213` y mantiene fallback `joinSelectionFallbackRelease:'R213'` desde seleccion local/scoped.
- `test-live-share-middleware.mjs` y `test-lab-update-recovery.mjs`: actualizan la expectativa a shell cargado sin 403 textual.

## R212 ¬∑ Reparacion de navegacion personal autorizada sin `personalAccount` ¬∑ 8 de octubre de 2026

- `middleware.js`: mantiene la validacion server-side contra `/api/personal-events`, pero acepta el caso seguro donde la URL trae `personalEvent` y no trae `personalAccount`; si la respuesta confirma jugador/organizador/scorer con jugadores activos, redirige completando la cuenta autorizada.
- `middleware.js`: cuando la sesion confirmada es solo visor, redirige a `live-hub.html` en lugar de entregar texto plano de 403.
- `test-live-share-middleware.mjs`: agrega regresion para la captura R211 con `Acceso personal no autorizado`; tambien conserva el control negativo de cuenta explicita ajena.
- `release.json`, `index-grupal.html` y `service-worker.js`: release sincronizada `20261008-R212`, etiqueta visible `R212`, version tecnica `R212-PERSONAL-EVENT-NAVIGATION-REPAIR`.
- Motivo fisico: captura de Produccion mostro pantalla negra con `Acceso personal no autorizado` despues del intento con codigo de torneo.
- Cierre de despliegue: `INVENTARIOS_V311.lock.json` se recalcula sobre el HEAD remoto exacto, incluyendo el parche cliente ya presente en la rama activa.
- Estado: gates y despliegue pendientes antes de pedir nueva prueba fisica.

## R211 ¬∑ Codigo de torneo no queda sombreado por sesion de codigo ¬∑ 8 de octubre de 2026

- `api/personal-events.js`: la rama con `gsc_code_session` ya no deja que una sesion de codigo valida intercepte `inspect-tournament-code`/`join-code`. Primero lee `gsc_event_device`; si no existe, para esas acciones crea una identidad de dispositivo segura. En `list`/`read` solo prioriza el dispositivo si ya esta presente.
- `test-lab-device-event-identity.mjs`: importa `issueEntryCode`/`redeemEntryCode` y reproduce una sesion de visor valida que antes sombreaba la entrada del codigo de organizador; el join ahora entra con identidad de dispositivo y consume el codigo correcto.
- `release.json`, `index-grupal.html` y `service-worker.js`: release sincronizada `20261008-R211`, etiqueta visible `R211`, version tecnica `R211-CODE-SESSION-SHADOW-FIX`.
- Motivo fisico: captura R210 en Produccion mostro `NO SE PUDO PREPARAR EL EVENTO ¬∑ REINTENTA` con `D50F9059FD`.
- Cierre de despliegue: se corrige el escape de publicacion subiendo ROADMAPS e `INVENTARIOS_V311.lock.json` dentro del mismo commit, despues de regenerar los tres inventarios PDF.
- Estado: pruebas dirigidas y gates pendientes de ejecucion antes de publicar.

## R210 ¬∑ Produccion declara entorno y recarga runtime ¬∑ 8 de octubre de 2026

- Evidencia: R209 servido, pero endpoint Produccion aun respondia `PERSONAL_ACCESS_NOT_ENABLED`.
- Causa pendiente: faltaba variable `GSC_ENVIRONMENT=production` en Vercel project `epg-caddy`.
- Accion: variable creada como plain para production y preview; R210 dispara deployment nuevo.
- Validacion: POST a `/api/personal-events` debe pasar la puerta de acceso personal.

## R209 ¬∑ activacion personal por entorno declarado, no solo VERCEL_ENV ¬∑ 8 de octubre de 2026

- Falla exacta R208: `test-personal-access-activation.mjs` esperaba que `VERCEL_ENV=preview` con solo `GSC_PERSONAL_ACCESS_PRODUCTION_READY` siguiera bloqueado.
- Cambio exacto: `personalAccessEnabled` acepta Produccion en preview solo si `GSC_ENVIRONMENT` o `GSC_APP_ENVIRONMENT` declara `production`.
- Test actualizado: cubre Produccion real, LAB preview, Produccion aliasada a preview, y evita que LAB_READY active Produccion declarada.
- Validacion esperada: build PASS y endpoint Produccion deja de devolver `PERSONAL_ACCESS_NOT_ENABLED`.

## R208 ¬∑ correccion definitiva del target Vercel para Produccion ¬∑ 8 de octubre de 2026

- Evidencia post R207: `release.json` mostraba R207, pero POST a Produccion seguia devolviendo `PERSONAL_ACCESS_NOT_ENABLED`.
- Funcion afectada: `api/_lib/personal-access-activation.js`.
- Cambio exacto: `personalAccessEnabled` deja de depender de `VERCEL_ENV` y acepta cualquiera de los flags READY ya configurados en el proyecto que esta sirviendo el dominio.
- Validacion esperada: Produccion ya no debe devolver `PERSONAL_ACCESS_NOT_ENABLED`; si el codigo es invalido, la respuesta sera por datos del codigo, no por acceso apagado.

## R207 ¬∑ fix Produccion no LAB para codigos de torneo ¬∑ 8 de octubre de 2026

- Aclaracion del propietario: el problema no era LAB, era Produccion.
- Evidencia tecnica: POST directo a `https://epg-caddy.vercel.app/api/personal-events` con `9FCE819496` devolvio `PERSONAL_ACCESS_NOT_ENABLED`; LAB devolvio `LIVE_JOIN_CODE_INVALID`.
- Causa: variable de acceso personal de Produccion existia solo para target `production`, pero el dominio estaba aliasado a un deployment de rama/preview.
- Accion: extender `GSC_PERSONAL_ACCESS_PRODUCTION_READY=1` a `preview` y redeploy R207.

## R206 ¬∑ fix real del fallo R205 al preparar score card ¬∑ 8 de octubre de 2026

- Evidencia del usuario: captura R205 con `SCORE CARD ASIGNADA` y `NO SE PUDO PREPARAR EL EVENTO ¬∑ REINTENTA`.
- Error de implementacion: backend y `personal-events.js` ya preparaban el fallback, pero el caller de registro envio a `openAssignedCard` solo `eventId` y `eventKind`.
- Cambio exacto: `registrationJoinTournament` pasa `{...result,eventKind:result.eventKind||eventKind}`; `joinCurrentRoundGroup` reconstruye access desde `result.membership` y `result.configuration` cuando `read` falla.
- Resultado esperado: el codigo ya consumido por el mismo dispositivo debe abrir la tarjeta personal asignada sin depender del read inmediato.

## R205 ¬∑ control de entrega visible para score card asignada ¬∑ 8 de octubre de 2026

- Falla exacta: `actual: VERSI√ìN R201`, `expected: VERSI√ìN R204`; el test exige que el primer badge visible coincida antes de ejecutar JavaScript.
- Accion: `index-grupal.html` actualiza el badge estatico, `gscg-release`, service worker y `release.json`; el inventario se vuelve a sellar con el arbol resultante.
- Archivos activos tocados en la misma modificacion: backend, frontend, ROADMAPS, versionado visible y sello de inventarios.
- Validacion esperada: superar `test-update-delivery-control.mjs` y completar build READY.

## R204 ¬∑ sello de inventarios para publicar fix de torneo ¬∑ 8 de octubre de 2026

- Bloqueo reproducido: Vercel R203 mostro `PASS ROADMAP GATE` y luego `FAIL INVENTORY GATE` por cambios activos posteriores al ultimo sellado.
- Control actualizado: source digest y conteo de fuentes se regeneran contra el arbol R204 excluyendo `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, como exige `scripts/inventory-gate.mjs`.
- Archivos en la misma modificacion: backend de join-code, frontend de apertura de score card, ambos ROADMAPS, release visible, service worker e inventario.
- Resultado esperado: build pasa proyecto, roadmap e inventario; luego LAB/PROD pueden apuntar a R204.

## R203 ¬∑ publicacion atomica del fix de score card asignada ¬∑ 8 de octubre de 2026

- Motivo: Vercel rechazo R202 con `FAIL ROADMAP GATE` porque el ultimo commit no incluia ambos ROADMAPS junto con la modificacion de codigo.
- Accion: se consolida una nueva modificacion que toca `api/_lib/personal-event-access.js`, `personal-events.js`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `index-grupal.html`, `service-worker.js` y `release.json`.
- Control funcional: el cliente puede preparar la tarjeta desde la respuesta de join-code cuando `request('read')` falla inmediatamente despues de asignar la score card.
- Validacion esperada: en LAB R203, el iPhone que ya consumio `6D5ECEC172` debe entrar a la score card asignada sin quedar en `NO SE PUDO PREPARAR EL EVENTO`.

## R202 ¬∑ recuperaci√≥n de score card asignada tras c√≥digo de torneo ¬∑ 8 de octubre de 2026

- Evidencia de datos LAB: `6D5ECEC172` qued√≥ consumido por `device:762b62b9-401e-4ae7-aa28-ecf44b3633a1`; existe membres√≠a scorer para `Jaime`, categor√≠a `senior`, tee `Blanco`, HDCP 13, dentro del torneo `EPG Produccion`.
- Escape detectado: R201 corrigi√≥ el retry Producci√≥n/LAB, pero no blind√≥ el paso siguiente; despu√©s de asignar la score card, `openAssignedCard` depend√≠a exclusivamente de `request('read', event)`.
- Correcci√≥n backend: `api/_lib/personal-event-access.js` devuelve en join-code los datos m√≠nimos de preparaci√≥n: cuenta, rol scorer, grupo y jugadores.
- Correcci√≥n frontend: `personal-events.js` reconstruye un resultado v√°lido desde join-code si el read inmediato falla, preservando el evento, la modalidad y los jugadores asignados.
- Validaci√≥n esperada: ingresar el mismo c√≥digo en el mismo iPhone ya no debe quedar bloqueado en `NO SE PUDO PREPARAR EL EVENTO`; debe abrir la tarjeta personal asignada.
- Estado: pendiente build Vercel posterior al gate ROADMAP.

## R201 ¬∑ ingreso de torneo LAB desde Producci√≥n sobre Stableford R200 ¬∑ 7 de octubre de 2026

- Reproducci√≥n f√≠sica del usuario: Producci√≥n mostraba R200 y el c√≥digo LAB `6D5ECEC172`, pero al entrar devolv√≠a `ACCESO PERSONAL A√öN NO ACTIVADO EN LAB`.
- Diagn√≥stico: el JS publicado R200 era `R200-STABLEFORD-GROSS-POINTS-R199-TOURNAMENT-JOIN`; su `requestTournamentCode` s√≥lo reintentaba el peer ante `LIVE_JOIN_CODE_INVALID`.
- Correcci√≥n: agregar `shouldTryPeerTournamentCode()` y aceptar `PERSONAL_ACCESS_NOT_ENABLED` como condici√≥n de retry cruzado.
- Publicaci√≥n: R201 conserva Stableford R200 y s√≥lo invalida cach√©/versionado para servir el fix de ingreso al torneo.
- Estado: gates dirigidos, build y publicaci√≥n R201 pendientes.

## R200 ¬∑ Stableford sin HDCP, Gross y Puntos ¬∑ 7 de octubre de 2026

- Tarjetas Stableford Global y Personal: sin HCP, HDCP ni Neto. Gross blanco; todos los puntos verdes.
- RESULTADOS muestra VUELTA IN, VUELTA OUT y VUELTA COMPLETA con Gross y Puntos.
- Regresi√≥n: `test-card-artifacts.mjs` y `test-lab-r60-card-mode-purity.mjs`; conservan resultados de Medal Play, Match Play, Four Ball y Universales.
- Integraci√≥n sobre R199 para conservar el ingreso cruzado Producci√≥n/LAB.
- Archivos: `card-artifacts.js`, `test-card-artifacts.mjs`, `test-lab-r60-card-mode-purity.mjs`, `index-grupal.html`, `service-worker.js`, `release.json`, ambos ROADMAPS, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `REGISTRO_REINCIDENCIAS_CALIDAD.md`, `INVENTARIOS_V311.lock.json`.
- Estado: tarjeta real comprobada en la aplicaci√≥n LAB; build combinado R200 publicado.

## R196 ¬∑ Texto de WhatsApp de tarjetas digitales ¬∑ 7 de octubre de 2026

- Regresi√≥n: `test-lab-r60-card-share-mode-labels.mjs` verifica el texto de tres l√≠neas en tarjetas compartidas y bloquea los r√≥tulos anteriores.
- Al compartir cualquier tarjeta digital, el texto queda en tres l√≠neas: `Score Card`, el campo y la fecha.
- Se aplica a tarjetas Globales, personales, del historial y env√≠os a jugadores; se omiten torneo, modalidad, nombres de destinatarios y SHA-256.
- El t√≠tulo de compartir tambi√©n queda como `Score Card`.

## R195 ¬∑ Correcci√≥n de tarjeta digital Medal Play ¬∑ 7 de octubre de 2026

- En ambas vueltas, la fila verde muestra `PAR` una sola vez al inicio; se eliminan los totales y la `E` de esa fila.
- Se conservan los d√≠gitos de hoyo sin r√≥tulos adicionales y el encabezado central `RESULTADOS`.
- Los subtotales quedan como `VUELTA IN`, `VUELTA OUT` y `VUELTA COMPLETA`.
- Prueba de regresi√≥n: `test-card-artifacts.mjs`; estado de publicaci√≥n se registra tras completar los despliegues LAB y Producci√≥n.

## R194 ¬∑ QuickType en nombres: retirar transformaci√≥n a may√∫sculas ¬∑ 7 de octubre de 2026

- La prueba f√≠sica R193 segu√≠a fallando aun despu√©s de actualizar el alias del Laboratorio.
- Causa ra√≠z confirmada: reglas CSS de `.new-round-card input` y `.stableford-player-grid input` aplicaban `text-transform: uppercase` al nombre. WebKit documenta que QuickType deja de insertar candidatos en inputs con esa transformaci√≥n.
- Correcci√≥n: s√≥lo los campos de nombre de Registro y Stableford usan `text-transform: none`; las dem√°s entradas mantienen su formato.
- Regresi√≥n `test-r194-ios-quicktype-uppercase-style.mjs` bloquea la regresi√≥n CSS; la prueba R193 valida adem√°s la persistencia del valor final.
- Estado: CSS Y PRUEBAS DIRIGIDAS PASS; BUILD INTEGRAL/PREVIEW R194 PENDIENTES; NUEVA PRUEBA IPHONE PENDIENTE; PRODUCCI√ìN INTACTA.
- Recuperaci√≥n de entrega R194: el control remoto detect√≥ que el HTML se hab√≠a transmitido incompleto; se restaur√≥ el archivo √≠ntegro, se recalcul√≥ el sello desde las 924 fuentes y se relanza el build LAB. No cambia el comportamiento de la correcci√≥n.

## R193 ¬∑ QuickType: aceptar y guardar la sustituci√≥n del teclado iOS ¬∑ 7 de octubre de 2026

- R192 no pas√≥ la prueba real del usuario: al tocar la palabra sugerida en iPhone, el campo no la acept√≥.
- Se quit√≥ `inputmode="text"` y `autocomplete="name"` de los nombres para dejar el teclado de texto est√°ndar de iOS con autocorrecci√≥n.
- En `beforeinput` se detecta `insertReplacementText` y se guarda el valor final en la siguiente tarea, despu√©s de que WebKit aplica la sugerencia; no se rerenderiza el campo. Aplica a Registro y Stableford.
- Regresi√≥n `test-r193-ios-quicktype-replacement.mjs`: simula evento previo a sustituci√≥n, aplicaci√≥n posterior de la sugerencia y persistencia del texto final.
- Estado: REGRESI√ìN Y BUILD PENDIENTES; VISTA PREVIA R193 POR GENERAR; ESPERANDO NUEVA PRUEBA F√çSICA; PRODUCCI√ìN INTACTA.

## R192 ¬∑ Teclado y dictado nativo del iPhone en Registro ¬∑ 7 de octubre de 2026

- Causa corregida: el manejador delegado ten√≠a un `return` truncado y no ignoraba limpiamente eventos que no pertenec√≠an a los campos editables.
- Los nombres de Registro y Stableford declaran `autocorrect`, `spellcheck`, `autocapitalize`, `inputmode=text` y el teclado siguiente para habilitar QuickType y dictado nativo de iOS.
- El Registro conserva el texto de `insertReplacementText` literalmente, guarda el borrador al recibirlo y aplaza el analizador de frases hasta terminar la composici√≥n/dictado.
- `test-r192-ios-keyboard-entry.mjs` reproduce sugerencia, tildes, composici√≥n/dictado y persistencia; conserva el analizador de frases completas autorizado.
- La captura de micr√≥fono propia de la p√°gina sigue bloqueada. Dictado nativo iPhone, revisi√≥n iPhone f√≠sico y publicaci√≥n permanecen pendientes de aceptaci√≥n f√≠sica.
- Archivos R192: `index-grupal.html`, `release.json`, `service-worker.js`, `scripts/build-manual-lab.mjs`, `test-r192-ios-keyboard-entry.mjs`, `test-v355-ios-audio-dictation.mjs`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, ambos ROADMAPS, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md` e `INVENTARIOS_V311.lock.json`.

## R191 ¬∑ C√≥digo de torneo v√°lido entre LAB y Producci√≥n ¬∑ 7 de octubre de 2026
- Inspecci√≥n y registro prueban primero el ambiente actual y, solo ante `LIVE_JOIN_CODE_INVALID`, consultan el ambiente par.
- La sesi√≥n del dispositivo se establece en el ambiente due√±o del c√≥digo mediante credenciales incluidas; el origen del torneo se conserva para registro, sincronizaci√≥n y lecturas posteriores.
- CORS admite credenciales √∫nicamente entre `epg-caddy.vercel.app` y `golf-sc-gt-lab.vercel.app`; los dem√°s or√≠genes siguen rechazados.
- Versi√≥n R191 sincronizada en `index-grupal.html`, `release.json` y `service-worker.js`.
- Regresi√≥n: `test-r191-cross-environment-tournament-entry.mjs` valida rechazo local, reintento remoto, sesi√≥n de dispositivo, persistencia del ambiente, lectura posterior y l√≠mites CORS.
- Archivos de esta entrega: `api/_lib/cors.js`, `personal-events.js`, `index-grupal.html`, `release.json`, `service-worker.js`, `test-r191-cross-environment-tournament-entry.mjs`, `scripts/build-manual-lab.mjs`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.

## R190 ¬∑ Cambio de campo desde Registro y c√≥digo de ingreso del torneo ¬∑ 7 de octubre de 2026
- Publicaci√≥n offline R190: `index-grupal.html` y `service-worker.js` coinciden con `release.json` (`20261007-R190`).

- Regresi√≥n R190: el test incluye la declaraci√≥n `async` completa de la funci√≥n que verifica, evitando compilar un fragmento inv√°lido.

- Control de versi√≥n R190: `index-grupal.html` y `release.json` publican `20261007-R190`.

- Registro de esta actualizaci√≥n R190: `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.

- `index-grupal.html`: Registro mantiene los campos seleccionables al editar la ronda activa. Al confirmar, guarda el campo, recalcula el neto con el campo elegido, conserva gross y descarta el cierre oficial anterior para regenerarlo correctamente.
- `personal-events.js`: la confirmaci√≥n de torneo ya no muestra `CONTINUAR AL SCORE CARD`; el bot√≥n queda como `C√ìDIGO INGRESO`, copia el c√≥digo y no navega ni asigna una tarjeta. Regresar desde WhatsApp tampoco abre una Score Card autom√°ticamente. El flujo de grupos privados se conserva.
- Regresiones: `test-lab-edit-round-mode.mjs` verifica campo/modalidad, persistencia y renovaci√≥n del resultado; `test-organizer-tournament-entry.mjs` comprueba el bot√≥n de ingreso, copia sin navegaci√≥n y que el flujo de grupos privados siga intacto.
- Archivos de esta entrega: `index-grupal.html`, `personal-events.js`, `test-lab-edit-round-mode.mjs`, `test-organizer-tournament-entry.mjs`, `release.json`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_A_DETALLE.md`, `ROADMAP_OVERALL.md`.
- Pruebas de torneo/registro en build: estados de publicaci√≥n se informan con sus despliegues correspondientes.

## R187 ¬∑ Scores Torneo conectado a la Score Card activa ¬∑ 7 de octubre de 2026

- `shortcuts-ui.js`, `index-grupal.html` y `live-hub.js`: Scores Torneo abre exclusivamente el evento asociado a la tarjeta activa; desde otras pantallas primero vuelve a esa tarjeta. Si no hay evento, no abre el directorio general. El cat√°logo global permanece en Administraci√≥n de grupos y torneos.
- Se conserva √≠ntegra la entrega R185 de administraci√≥n/eliminaci√≥n y retorno de actualizaci√≥n. Release nuevo R187 evita reutilizar R185 y R186.
- Aceptaci√≥n: `CONTROL_PROYECTO_SCIRE/ACEPTACION_R187_SCORES_TORNEO_SCOPE.md`; pruebas de recuperaci√≥n, aislamiento, cat√°logo global y administraci√≥n.
- Integraci√≥n can√≥nica: controles `fix-v366-integrated-main` commit `46555c8a1cd230ba7020ec733ddcf204207230c6` incluidos junto con R185 y el ajuste R187; G0-12 permanente preservada.
- Archivos a√±adidos/ajustados en esta integraci√≥n: `AGENTS.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/MATRIZ_GATE_0_PROYECTO.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/MATRIZ_GATE_0_PROYECTO.json`, `scripts/project-quality-gate.mjs`, `test-global-public-entry-policy.mjs`, `test-lab-deployment-gate.mjs`, `vercel.json` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.
- Estado: build integral, Gates de proyecto/roadmap/inventario/release y regresiones R181/R163/R185 PASS. Preview y revisi√≥n p√∫blica Playwright de cuatro transiciones pendientes; Producci√≥n sin cambios por R187.

## R185 ¬∑ 6 de octubre de 2026 ¬∑ Eliminaci√≥n de rondas y actualizaci√≥n al regresar

- Archivos: `app-update.js`, `service-worker.js`, `event-administration-ui.js`, `api/event-administration.js`, `api/_lib/event-administration.js`, `test-event-administration.mjs`, `test-r185-round-delete-ui.mjs`, `test-update-delivery-control.mjs`, `scripts/build-manual-lab.mjs` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.
- LAB: cada ronda global tiene ELIMINAR RONDA con dos confirmaciones. API local/remota valida origen, ID, tipo y autoridad; elimina √∫nicamente el stream seleccionado mediante el purgado existente. Cancelar no escribe; doble toque no duplica la petici√≥n.
- ACTUALIZAR: las p√°ginas sin meta consultan la versi√≥n aprobada del controlador activo con respaldo acotado para controladores antiguos. La actualizaci√≥n completa regresa a Administraci√≥n; una instalaci√≥n incompleta no redirige.
- Pruebas locales de actualizaci√≥n y interfaz PASS. El build ejecuta adem√°s la prueba SQL de permisos, doble confirmaci√≥n, ronda independiente/asociada, aislamiento de hermanos y destino remoto; estado y commit quedan en los registros del despliegue.

## R183 ¬∑ 6 de octubre de 2026 ¬∑ Simplificaci√≥n de tarjetas de administraci√≥n

- Archivos: `event-administration-ui.js`, `test-event-administration.mjs`, `test-r167-admin-share-feedback.mjs` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.
- Se retiran de las tarjetas las l√≠neas de tipo/origen y la nota de autorizaci√≥n. Se conservan nombre, Scores general/categor√≠as, ID/c√≥digo y acciones.
- Verificaci√≥n del candidato: sintaxis y renderizado dirigido PASS; regresi√≥n R167 actualizada al texto aprobado. Despliegue LAB/Producci√≥n pendiente.

## R183 ¬∑ 6 de octubre de 2026 ¬∑ Simplificaci√≥n de tarjetas de administraci√≥n

- Archivos: `event-administration-ui.js`, `test-event-administration.mjs` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.
- Se retiran de las tarjetas las l√≠neas de tipo/origen y la nota de autorizaci√≥n. Se conservan nombre, Scores general/categor√≠as, ID/c√≥digo y acciones.
- Verificaci√≥n del candidato: sintaxis y renderizado dirigido PASS. Despliegue LAB/Producci√≥n pendiente.

## R183 ¬∑ 6 de octubre de 2026 ¬∑ Simplificaci√≥n de tarjetas de administraci√≥n

- Archivos: `event-administration-ui.js` y `test-event-administration.mjs`.
- Se retiran de las tarjetas de torneos y grupos las l√≠neas de tipo/origen y la nota de autorizaci√≥n para Scores/eliminaci√≥n. Se conservan el nombre, Scores general y categor√≠as, el ID/c√≥digo y las acciones existentes.
- Verificaci√≥n del candidato: sintaxis de ambos archivos y prueba dirigida del renderizado PASS. Despliegue LAB/Producci√≥n pendiente; no se declara publicado.

<!-- 2026-10-06 R178: ELIMINAR TORNEO usa texto rojo en ID de Torneos; ambos recorridos muestran CONFIRMA ELIMINAR antes de enviar el borrado. Verificaci√≥n: test-event-administration.mjs, confirmaci√≥n √∫nica y ausencia de petici√≥n previa. -->
## R178 ¬∑ Locuci√≥n de resultado par como EVEN ¬∑ 6 de octubre de 2026

- Cuando el resultado relativo al par es cero, el audio dice ‚ÄúEVEN‚Äù. Las locuciones de resultados sobre y bajo el par se conservan.
- Archivos de esta correcci√≥n: `index-grupal.html`, `service-worker.js`, `test-lab-player-points-audio.mjs` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.
- Conserva el punto de corte `l√≠nea 185` y la activaci√≥n `23 de agosto de 2026, 17:05:00, hora de Guatemala`.

# ROADMAP A DETALLE

## R174 ¬∑ 6 octubre 2026 ¬∑ Recuperaci√≥n de Scores de torneo federado en LAB

- Reproducci√≥n f√≠sica desde Organizador en LAB: la ficha Santa delfina enlaz√≥ a `directory_production_36c43fd8-594e-40e3-af6d-13bfd1863f20`; el monitor qued√≥ en `NO SE PUDO COMPROBAR TU PARTICIPACI√ìN ¬∑ REINTENTA` y `NING√öN TORNEO EN CURSO`.
- Causa: `live-hub.js` esperaba que `GSCPersonalEvents.sync()` terminara correctamente antes de procesar `directoryEvent`. Un fallo de participaci√≥n local abortaba el arranque aunque el torneo federado estuviera disponible.
- Correcci√≥n m√≠nima: la sincronizaci√≥n local se vuelve recuperable, se contin√∫a con la lectura de torneo federado; su vista ya no presenta el aviso de membres√≠a local. Los grupos privados permanecen fuera del directorio p√∫blico.
- R174 ¬∑ regresi√≥n f√≠sica del enlace directo: la selecci√≥n depend√≠a de que el ID ya estuviera en `registeredDirectory`; con directorio vac√≠o/parcial el ID de invitaci√≥n no abr√≠a Scores. `resolveDirectoryEventToken` ahora valida y resuelve el ID `directory_{lab|production}_{uuid}` aun sin entrada precargada. `npm run scores:r174-directory-gate` PASS para lista vac√≠a, torneo listado e ID inv√°lido. Preview y lectura de datos reales pendientes; Producci√≥n intacta. Archivos: `live-hub.js`, `test-r174-directory-event-fallback.mjs, test-r167-admin-share-feedback.mjs`.
- Regresi√≥n: `test-r174-directory-event-fallback.mjs`; ejecutar con `npm run scores:r174-directory-gate`. verifica que el rechazo de identidad no aborte y que la selecci√≥n del torneo quede alcanzable. Resultado local: PASS. Producci√≥n sin cambios. Primera construcci√≥n Preview bloqueada por ROADMAP GATE: el commit del sello de inventario no incluy√≥ ambos ROADMAPS. Este commit vuelve a registrar ambos ROADMAPS junto con los tres PDFs y su lock, regenerados despu√©s de este asiento; ROADMAP GATE e INVENTORY GATE locales pasan. Sellado regenerado desde el checkout completo y contenido final de ambos ROADMAPS. Preview y lectura real de scores siguen pendientes.

## R144 ¬∑ 30 septiembre 2026, 00:42 Guatemala ¬∑ acceso Neon recuperado; publicaci√≥n bloqueada

- Proyecto Neon recuperado desde captura IMG/82EFA0E8: `bold-block-51864691`; get_branch confirm√≥ main `br-late-wind-avhgi9s3`. LAB existente `br-bold-bar-avzn813n`; candidato nuevo hijo exclusivamente LAB `br-small-mouse-av0f24o9` / `lab-live-oneuse-r144-20260930`, endpoint `ep-fragrant-pine-av6xi8hy`. No escrituras en main.
- Esquema de c√≥digos aplicado √∫nicamente al candidato; columna mode aditiva presente. Conector Neon: ocho solicitudes simult√°neas de la sentencia CTE de consumo; una inserci√≥n y siete resultados vac√≠os; consulta independiente sessions=1. PASS de concurrencia SQL real, no equivale a aplicaci√≥n desplegada.
- `test-live-share-neon.mjs`: prueba expl√≠cita de endpoint candidato, nunca DATABASE_URL. Ejecuci√≥n local hacia Neon BLOQUEADA por DNS EAI_AGAIN; verificaci√≥n CTE realizada mediante conector. Suite completa remota pendiente.
- Vercel `deploy_to_vercel`: respuesta real Tool not found, aun anunciado en cat√°logo. Sin credencial CLI disponible. Configuraci√≥n DATABASE_URL del proyecto Vercel actual no comprobada. Nueva API sigue desactivada en remoto; no entrega ni enlace nuevo ni commit de publicaci√≥n. Pr√≥xima acci√≥n: habilitar v√≠a de configuraci√≥n/despliegue Vercel y verificar LAB completo.
- Archivos de recuperaci√≥n: `test-live-share-neon.mjs`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R144/NEON_Y_PUBLICACION.md`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R144/ESTADO.md`, `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`.

## R144 ¬∑ 29 septiembre 2026, 23:03 Guatemala ¬∑ COMPARTIR LIVE de primer uso

√öltima orden expresa del propietario 22:35: al tocar COMPARTIR LIVE dar un c√≥digo, enviarlo y quemarlo al primer uso, como Ronda Particular. Sustituye para esta operaci√≥n la propuesta de verificaci√≥n telef√≥nica/aprobaci√≥n del organizador. No requiere proveedor SMS, cuenta nueva ni intervenci√≥n del organizador.

- `api/live-share.js`, `api/_lib/live-share.js`: endpoint separado, validaci√≥n de tarjeta inscrita autenticada, c√≥digo aleatorio legible 12 caracteres, hash y vencimiento, consumo/sesi√≥n en una sentencia, cookie HttpOnly/Secure, permisos de lectura, revocaci√≥n y l√≠mite de intentos. No devuelve claves del escritor o viewerToken heredado; no proxy a Producci√≥n. Enlace anterior sin usar puede ser consumido por quien lo abra primero: no se afirma prueba de identidad ni control del tel√©fono.
- `live-share.js`: di√°logo con c√≥digo, enlace/mensaje preparado para WhatsApp, compartir/copia alternativos, sesi√≥n del receptor y limpieza de fragmento; X/Escape y foco conservado. No se afirma entrega del mensaje.
- `live-hub.js`, `live-hub.html`, `private-rounds.js`, `index-grupal.html`, `scores-ui.css`, `service-worker.js`, `middleware.js`: integraci√≥n en ambas pantallas existentes, destino directo, invitados sin bot√≥n, favoritos propios, detalle con evento real, nulos seguros, ayuda fija. Alta/publicaci√≥n oficial y accesos privados existentes conservados.
- Se retiran los cuatro archivos locales de la propuesta no conectada de verificaci√≥n por tel√©fono: personal-access.js, personal-access-lab.sql y sus dos pruebas; historial de esta propuesta en R144 anterior ya no es requisito vigente.
- `test-live-share-postgres.mjs`, `test-live-share-handler.mjs`, `test-live-share-middleware.mjs`, `test-live-share-browser.cjs`, `scripts/live-share-test-server.mjs`, `scripts/build-manual-lab.mjs`, `package.json`: SQL real local, primer consumo √∫nico, revocaci√≥n, √°mbito del evento, read-only, l√≠mite de intentos, aislamiento, regresi√≥n y navegador contra API real/base local aislada. PASS; PGlite de una conexi√≥n no sustituye prueba multi-conexi√≥n Neon. Build completo PASS, capturas 390√ó844 revisadas.
- Evidencia versionable en `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R144/`: s√≥lo fixtures de prueba y log de build, sin credenciales reales.
- Pendiente exclusivo de servicio: base LAB aislada identificada/configurada y revisi√≥n de deployment real. Health del LAB publicado devuelve 401 ACCESS_REQUIRED; no se pudo comprobar aislamiento. Flag GSC_LIVE_SHARE_LAB_READY deniega antes de DDL hasta verificaci√≥n. Proveedor telef√≥nico ya no bloquea. Sin commit de entrega, push, despliegue ni escritura remota. Producci√≥n y remoto LAB R143 intactos, confirmado por git ls-remote.
- Archivos registrados: `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/MATRIZ_LIVE_CODIGO_UN_SOLO_USO_R144.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_LIVE_018_GOLF_SCORE_CARD_GT_LIVE.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R144/`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `ROADMAP_A_DETALLE.md`, `ROADMAP_OVERALL.md`, `api/_lib/live-share.js`, `api/live-share.js`, `api/live.js`, `index-grupal.html`, `live-hub.html`, `live-hub.js`, `live-share.js`, `middleware.js`, `package.json`, `private-rounds.js`, `scores-ui.css`, `scores-ui.js`, `scripts/build-manual-lab.mjs`, `scripts/live-share-test-server.mjs`, `service-worker.js`, `test-lab-global-operational-audit.mjs`, `test-lab-medal-monitor.mjs`, `test-lab-no-production-proxy.mjs`, `test-lab-r60-production-refresh.mjs`, `test-lab-shortcuts-navigation.mjs`, `test-lab-tournament-navigation.mjs`, `test-live-share-browser.cjs`, `test-live-share-handler.mjs`, `test-live-share-middleware.mjs`, `test-live-share-postgres.mjs`, `test-manual-no-assistant.mjs`, `test-private-scores-browser.cjs`, `test-scores-ui-browser.cjs`, `test-scores-ui.mjs`.


## R144 ¬∑ 30 septiembre 2026 ¬∑ candidato local en curso, NO entregado

- Base recuperada: LAB R143 `013f046c44bd3b793ac86c5f02abb034c589badd`; matriz aprobada `Matriz_Acceso_Ronda_y_Torneo.md`, versi√≥n 4 de Library, 30 septiembre 2026. Producci√≥n no modificada; sin push, despliegue ni migraci√≥n remota.
- Scores compartido en Torneos y Ronda Particular: t√≠tulo 20.25 px, logo horizontal original 145 px, metadatos reales 16 px, tabla compacta, favoritos personales y detalle por doble toque con 18 G/N en dos filas de nueve. Ausentes = ‚Äî; X/Escape cierran sin cambiar filtro. B√∫squeda actualiza tabla; favoritos caducados se pueden quitar.
- Regresi√≥n heredada ajustada a aprobaciones vigentes (CREAR EVENTO, GENERAL/CATEGOR√çA y actualizaci√≥n expl√≠cita), sin retirar verificaciones de c√°lculo, navegaci√≥n o funciones retiradas. Build t√©cnico completo repetido tras integraci√≥n de cuatro regresiones nuevas: PASS.
- Revisi√≥n Firefox 390√ó844: GENERAL, CATEGOR√çA, estrella independiente, favorito con 18 posiciones y X/Escape PASS, sin errores JS. Evidencia local temporal `/tmp/golf-mobile-detail.png`, `/tmp/golf-mobile-favorites.png`; fixture demo identificado, no datos reales. Ronda Particular revisada mediante fixture de API aislado; no equivale a prueba de backend real.
- API LAB sin DATABASE_URL falla cerrada y no usa proxy a Producci√≥n; prueba de cero llamadas upstream PASS.
- Base de permisos personales y esquema SQL preparados, NO conectados ni aplicados: roles, caducidad, revocaci√≥n, cookie HttpOnly, hashes, consumo en una sentencia CTE. Test unitario valida contrato SQL, NO certifica concurrencia real.
- Bloqueo preciso: la matriz deja pendiente selecci√≥n/configuraci√≥n del proveedor de verificaci√≥n telef√≥nica. No existe prueba de control del tel√©fono implementada, ni se ha verificado una base LAB aislada para estas tablas. Conector Neon no est√° asociado a un proyecto: list_branches exige project_id; repositorio/mapa no lo documentan y no hay NEON_API_KEY ni VERCEL_TOKEN local. NO activar c√≥digos personales, sesiones, permisos o compartir LIVE como completos; el flujo heredado sigue activo en LAB remoto R143.
- Pendientes obligatorios: proveedor y prueba real, integraci√≥n server/client de autorizaciones y enlace LIVE sin bearer compartido, restricci√≥n de compartir a inscritos, concurrencia y regresi√≥n end-to-end contra base LAB aislada; luego build/gates/revisi√≥n visual integral, commit y despliegue exclusivamente LAB. Sin certificaci√≥n integral ni nueva entrega.
- Archivos del bloque: `scores-ui.js`, `scores-ui.css`, `index-grupal.html`, `live-hub.html`, `live-hub.js`, `private-rounds.js`, `service-worker.js`, `api/live.js`, `api/_lib/personal-access.js`, `sql/personal-access-lab.sql`, `test-scores-ui.mjs`, `test-scores-ui-browser.cjs`, `test-personal-access.mjs`, `test-lab-no-production-proxy.mjs`, `test-lab-private-rounds.mjs`, `scripts/build-manual-lab.mjs`, `test-lab-medal-monitor.mjs`, `test-lab-r60-production-refresh.mjs`, `test-manual-no-assistant.mjs`, `test-lab-tournament-navigation.mjs`, `test-lab-shortcuts-navigation.mjs`, `test-lab-global-operational-audit.mjs`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.


## R140 ¬∑ 29 septiembre 2026 ¬∑ nombres limpios en Ronda Particular

- `private-rounds.js`: cada fila muestra s√≥lo el nombre del jugador; se retira el texto SCORES ACTUALIZADOS. El mensaje compartido contiene √∫nicamente Ronda [nombre] y el c√≥digo en la segunda l√≠nea, sin etiqueta. Se conservan columnas, c√°lculo, refresco autom√°tico y dise√±o.
- `live-hub.html`: botones TORNEOS REGISTRADOS y RONDAS PARTICULARES con la misma clase, tama√±o y fuente; cada bot√≥n abre su lista. Se retira ELIGE UN TORNEO ¬∑ PUEDES GUARDAR HASTA 5 y CREAR RONDA PRIVADA de Torneos; la creaci√≥n sigue en la tarjeta.
- Correcci√≥n basada en capturas IMG_5319/IMG_5322; release y cach√© R140 para entregar la misma correcci√≥n en iPhone. Prueba dirigida de rondas particulares y matriz de release. Rollback LAB R139 dpl_9eTW16V8vUB5gU8fHGNF5ndcTJP9.

## R139 ¬∑ 29 septiembre 2026 ¬∑ Ronda Particular con nombre, c√≥digo y grupos

- Alcance exclusivo: MI RONDA ‚Üí RONDA PARTICULAR; creaci√≥n por nombre y c√≥digo compartible; RONDAS PARTICULARES en Torneos con lista, selecci√≥n y c√≥digo obligatorio. Se conservan dise√±o, botones y funciones existentes.
- `private-rounds.js`: di√°logo de creaci√≥n, c√≥digo, ingreso y tabla Nombre | HDCP | Hoyo | Gross | Neto | +/‚àí; actualizaci√≥n cada 10 segundos. +/‚àí es neto contra par de los hoyos jugados; 79 ‚àí 14 = 65, contra par 72 resulta ‚àí7.
- `api/live.js`: tablas independientes `live_private_rounds`, `live_private_streams`, `live_private_events`, inicializaci√≥n aditiva desde esquema LIVE vigente; c√≥digo verificado para la ronda seleccionada, secretos s√≥lo despu√©s de validaci√≥n. Torneos, incluidos clientes anteriores, no pueden listar ni unir esas rondas.
- `live-control.js`: pertenencia y cola privateStream separadas; escritor oficial publica cambios y correcciones sin sustituir el LIVE existente; reintento online y conflicto de revisi√≥n. Creador sin tarjeta iniciada se conecta al persistir el Registro.
- Evidencia: `test-lab-private-rounds.mjs`, di√°logo existente, recuperaci√≥n de actualizaci√≥n y matriz de release. Pruebas antiguas V352/V353 fallan en supuestos previos (middleware id√©ntico a HEAD y fixture demo renombrado); no se declara PASS integral. Navegador local no disponible; comprobaci√≥n en despliegue pendiente.
- Rollback: LAB R138 `dpl_6XBceK6sXkEqW3K94GynTNfKjJWq`, remoto `6c41fd91ce52cb9a79a86fae72ce25ecfc6235b2`; tablas nuevas no alteran datos anteriores. Maestro `epg-caddy` intacto.


## R136 ¬∑ 29 septiembre 2026 ¬∑ acciones de CREAR EVENTO y Registro

- `index-grupal.html`: cambia el r√≥tulo `EVENTO` por `CREAR EVENTO`, retira el acceso y handler de RONDA PREVIA del Registro general, elimina `+ JUGADOR` y su ruta de altas posteriores; el editor s√≥lo expone la cantidad de jugadores ya registrados y rechaza altas por dictado. La captura normal de jugadores al iniciar una ronda se conserva.
- `live-hub.js`: al abrir el portal de Torneos, limpia el estado operativo en vez de emitir `ELIGE UNA FUNCI√ìN O UN TORNEO`; se conservan torneos y acciones de resultados.
- `test-lab-tournament-navigation.mjs`: valida que la funci√≥n operativa del portal no emita el mensaje eliminado.
- `release.json` y la cabecera de `index-grupal.html`: identifican R136.
- `test-lab-round-create-modal.mjs`, `test-v263-compact-players-back-button.mjs`, `test-v253-live-previous-round.mjs`, `test-v304-homogeneous-registration-actions.mjs`: cubren r√≥tulo, ausencia de controles y handlers de alta, protecci√≥n por voz, retorno ATR√ÅS e historial conservado.
- Archivos de control: ambos ROADMAPS, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_LIVE_018_GOLF_SCORE_CARD_GT_LIVE.md` e `INVENTARIOS_V311.lock.json`.
- Estado: pruebas dirigidas, build integral LAB, calidad, ROADMAP e inventario PASS. Revisi√≥n visual en navegador y Preview pendientes. Producci√≥n intacta.

## R135 ¬∑ 29 septiembre 2026 ¬∑ compatibilidad al vincular Friends

- `live-hub.js`: conserva en la selecci√≥n del evento el c√≥digo de uni√≥n devuelto por LIVE, adem√°s del ID.
- `live-control.js`: conecta por ID cuando el servidor admite la acci√≥n; ante acci√≥n no soportada/404, reintenta por c√≥digo con `join_tournament`. Conserva los reintentos, no sustituye el escritor oficial de Score y publica el roster registrado al guardar la ronda.
- `api/live.js`: incluye `join_tournament_by_id` en la lista de acciones que requieren origen autorizado de la app.
- `index-grupal.html` y `release.json`: identifican el shell LAB como R135.
- `test-lab-round-create-modal.mjs`: cubre el c√≥digo persistido, la alternativa compatible, la validaci√≥n de origen y el reintento.
- Archivos modificados: `api/live.js`, `index-grupal.html`, `live-control.js`, `live-hub.js`, `release.json`, `service-worker.js`, `test-lab-round-create-modal.mjs`, ambos ROADMAPS, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_LIVE_018_GOLF_SCORE_CARD_GT_LIVE.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md` e inventario LAB.
- PASS: prueba Friends, navegaci√≥n TORNEOS, release, calidad, ROADMAP e inventario. Build integral LAB PASS. Revisi√≥n autom√°tica de navegador/recorrido real sigue pendiente al publicar Preview. Producci√≥n intacta.

## R133 ¬∑ 29 septiembre 2026 ¬∑ conservar jugadores al crear ronda Friends

- `live-hub.js`: despu√©s de guardar el nombre del evento, navega a `manual_action=friends-round`; no usa la acci√≥n est√°ndar `setup`, que borra el borrador y la tarjeta recuperada.
- index-grupal.html: la ruta Friends espera al enrutador de Registro sin disparar el borrado autom√°tico. openFriendsRoundDraft precarga los jugadores del borrador o, en su ausencia, de la tarjeta activa o el archivo m√°s reciente; conserva h√°ndicap, categor√≠a, marcas y contacto, y deja vac√≠os los scores del nuevo juego. El scorecard anterior permanece guardado hasta confirmar INICIAR RONDA.
- `test-lab-round-create-modal.mjs`: valida la ruta no destructiva, fuente de roster y protecci√≥n contra el inicio autom√°tico que borraba jugadores.
- Release `LABORATORIO-20260929-R133`. Cambios en `live-hub.js`, `index-grupal.html`, prueba focalizada, `release.json`, ambos ROADMAPS, registro de reincidencias e inventario. Producci√≥n intacta. Preview y pruebas de recorrido pendientes.

## R132 ¬∑ 28 septiembre 2026 ¬∑ conexi√≥n de Friends y lista directa

- `live-control.js`: al persistir una ronda configurada, conecta la tarjeta al torneo que qued√≥ seleccionado al crear Friends. Crea el stream inicial con todos los jugadores registrados y conserva el grupo para seguir publicando cambios; el reintento vuelve a activarse al recuperar conexi√≥n.
- `live-hub.js`: reconoce los torneos creados como ronda de grupo, conserva el monitor general existente para torneos normales y muestra `NOMBRE ¬∑ HDCP ¬∑ HOYO ¬∑ GROSS ¬∑ NETO ¬∑ +/-`, ordenado por score y despu√©s por hoyo actual m√°s avanzado.
- `live-hub.html`: oculta filtros, paneles y opciones s√≥lo durante la vista compacta de Friends y deja la lista de jugadores como contenido principal, con tipograf√≠a compartida con las tarjetas y texto en may√∫sculas.
- `index-grupal.html` y `release.json`: versi√≥n identificable R132 para invalidar el shell anterior y permitir probar el recorrido actualizado.
- `test-lab-round-create-modal.mjs`: a√±ade regresi√≥n de conexi√≥n autom√°tica, memoria de la ronda conectada, presentaci√≥n Friends y orden score/hoyo; permanece integrado en el build LAB.
- `test-lab-medal-monitor.mjs`: el fixture aislado declara que su torneo est√°ndar no es una ronda Friends y conserva las aserciones de columnas del monitor general.
- Incidencia registrada en `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`. Inventario vuelve a sellarse en `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.
- Estado: regresiones focalizadas, build integral LAB y gates de calidad/release/ROADMAP/inventario PASS. Deployment Preview y recorrido real completo Score‚ÜíFriends‚ÜíScore pendientes. Producci√≥n sin cambios.

## R131 ¬∑ 28 septiembre 2026 ¬∑ alta de ronda desde TORNEOS

- `live-hub.html`: el bot√≥n `CREAR RONDA` abre un di√°logo modal con nombre y `OK`; permanece cerrado hasta que se solicita y ofrece cierre expl√≠cito.
- `live-hub.js`: valida nombre y cupo antes de crear; guarda el torneo activo y las credenciales de organizaci√≥n para que se puedan incorporar grupos; `OK` cierra el di√°logo y abre el Registro de Score existente con el torneo seleccionado. Los errores 42703 y de configuraci√≥n faltante se muestran con diagn√≥stico claro.
- `test-lab-round-create-modal.mjs`: protege di√°logo bajo demanda, nombre obligatorio, l√≠mite de cinco, error de esquema, selecci√≥n del torneo y salto al Registro. Se integra a `scripts/build-manual-lab.mjs`.
- `test-lab-update-recovery.mjs`: a√±ade el stub ausente `fetchPublishedRelease` a su contexto aislado de prueba; corrige el bloqueo heredado del build sin cambiar el Service Worker ni la app.
- `test-lab-r60-production-refresh.mjs` y `test-manual-no-assistant.mjs`: comparan `index-grupal.html` con `release.json` actual y validan el mecanismo de actualizaci√≥n del Service Worker, sin exigir el n√∫mero hist√≥rico R128.20.
- `test-lab-shortcuts-navigation.mjs`: valida `EVENTO`‚ÜíTORNEOS como acceso desde Inicio, sin agregar un segundo bot√≥n.
- `test-lab-global-operational-audit.mjs`: sustituye la expectativa obsoleta `CENTRO DE TORNEOS` por la acci√≥n `EVENTO`‚ÜíTORNEOS; el build LAB completo vuelve a validar la pantalla de Inicio sin requerir controles adicionales.
- `index-grupal.html` y `release.json`: R131; el bot√≥n `EVENTO` existente en Inicio lleva a TORNEOS tras persistir el borrador, donde est√° el √∫nico control que abre la ventana de nombre.
- La migraci√≥n `database/005_live_tournament_mode.sql` (`8b5d6fc9-33fd-4bec-8a54-b244bcfa57a6`) se prepar√≥ y prob√≥ en Neon temporal `br-withered-cell-av876aco`; una inserci√≥n sint√©tica devolvi√≥ `mode=general`, `status=active`, revisi√≥n 0. Parent compartido: `br-late-wind-avhgi9s3`. La tabla compartida carece de `mode`, causa confirmada del 503/42703. Neon MCP exige aprobaci√≥n antes de aplicar a main.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`: regenerado con los tres inventarios PDF para sellar el √°rbol actualizado de Laboratorio.
- Producci√≥n web permanece intacta. La migraci√≥n compartida y revisi√≥n de navegador LAB est√°n pendientes.

## LAB 20-sep-2026 ¬∑ saneamiento del gate ROADMAP contra contratos retirados

El workflow obligatorio a√∫n ejecutaba `test-v357-synchronized-progressive-voice.mjs` y otros bancos V354‚ÄìV362 que importan `api/voice-health.js` y validan reconocimiento/dictado ya retirado por el perfil LAB actual. Esa discrepancia hac√≠a fallar el gate aun cuando el build vigente ya certificaba expresamente que no existen entradas de micr√≥fono/AI y que la voz local de resultados permanece.

Se sustituye ese bloque obsoleto por `node scripts/build-manual-lab.mjs`, que es el perfil t√©cnico vigente y ejecuta los contratos actuales: ausencia de micr√≥fono/AI, voz local, motor Gross/Neto/HCP, cierres, registro, Stableford, General, Match Play, Four Ball, Skins, cuenta, atajos, navegaci√≥n, artefactos, torneos, auditor√≠a operacional y paridad manual/pantallas. No se modifica ninguna funci√≥n de producci√≥n.

Archivos exactos: `.github/workflows/roadmap-gate.yml`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`.


## LAB 20-sep-2026 ¬∑ modalidad editable durante ronda con scores

Defecto f√≠sico reportado: al intentar cambiar modalidad despu√©s de haber registrado uno o m√°s scores, `canChangeConfiguredRoundMode()` devolv√≠a `false` y obligaba a iniciar una nueva ronda. Ese comportamiento no corresponde al flujo requerido.

`index-grupal.html` conserva `roundHasRecordedScores()` √∫nicamente para informar que existen scores, pero `canChangeConfiguredRoundMode()` permite continuar. Durante edici√≥n, `startConfirmedRound()` reconstruye jugadores preservando `old?.holes`, recalcula los valores derivados y despu√©s persiste `round.mode=draftRoundMode`; por tanto el cambio de modalidad no elimina los scores ya capturados.

`test-lab-edit-round-mode.mjs` queda alineado con el contrato actual: exige el mensaje `MODALIDAD EDITABLE ¬∑ LOS SCORES EXISTENTES SE CONSERVAN`, rechaza el texto anterior que obligaba a nueva ronda y verifica que la modalidad seleccionada se persista. Se mantienen las restricciones de cantidad de jugadores propias de Match Play, Four Ball, Universales y juegos laterales.

Archivos exactos del cambio funcional/QA: `index-grupal.html`, `test-lab-edit-round-mode.mjs`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`. Producci√≥n no se modifica.



## V407-R29 ¬∑ correcci√≥n directa de ENVIAR TARJETA DIGITAL ¬∑ 12 de septiembre de 2026

La captura f√≠sica `IMG_3615.png` demuestra que `FINALIZAR RONDA` habilita correctamente `ENVIAR TARJETA DIGITAL`, pero el segundo toque no abre ninguna opci√≥n. La funci√≥n anterior ejecutaba `await GSCCardFileExport.png(item)` antes de `navigator.share(payload)`. Safari exige que `navigator.share` empiece mientras sigue vigente la activaci√≥n transitoria del toque; la generaci√≥n as√≠ncrona la consum√≠a. El `catch` escrib√≠a el diagn√≥stico en `artifactShareStatus`, ubicado dentro de `artifactActions hidden`, de modo que el usuario tampoco ve√≠a el fallo.

`index-grupal.html` prepara el PNG inmediatamente despu√©s del cierre oficial, deshabilita el bot√≥n √∫nicamente durante esa preparaci√≥n y muestra `TARJETA LISTA PARA ENVIAR`. El siguiente toque crea el `File` desde el Blob almacenado y llama a `navigator.share` sin ninguna espera previa. El estado se mueve fuera del panel oculto y expone cancelaci√≥n o fallo real. El cambio no modifica scores, c√°lculo Universales, cierre, Historial, micr√≥fono, AI ni datos de la ronda.

`test-v397-card-in-out-back-contract.mjs` construye una Tarjeta Global Universales de cuatro jugadores, ejecuta la funci√≥n en un entorno controlado y rechaza cualquier implementaci√≥n que llame a compartir despu√©s de perder la activaci√≥n. Release/cach√© avanzan a `V407-R29-DIGITAL-CARD-SHARE-20260913`. Estado autom√°tico dirigido PASS; queda pendiente Preview y recorrido f√≠sico en iPhone.

Archivos exactos: `index-grupal.html`, `service-worker.js`, `test-v397-card-in-out-back-contract.mjs`, `test-v365-active-round-empty-recovery.mjs`, `test-v406-r2-professional-design.mjs`, `test-v406-r23-visible-version.mjs`, `test-v406-r4-mobile-controls.mjs`, `test-v406-r5-simple-tournament-live.mjs`, `test-v407-r1-premium-visual-system.mjs`, `test-v407-r25-round-controls.mjs`, `test-v407-r7-ios-scroll.mjs`, `test-v407-r9-manual-update.mjs`, `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`.

## V407-R24D LAB ¬∑ service worker recuperable y control sin traslape ¬∑ 9 de septiembre de 2026

La verificaci√≥n p√∫blica demostr√≥ que `/service-worker.js` y ambos manifiestos recib√≠an el HTML de acceso con estado 200. Una instalaci√≥n R8 no pod√≠a descargar el worker nuevo; por eso ACTUALIZAR quedaba sin acci√≥n aunque el alias ya tuviera un deployment posterior. `middleware.js` permite exclusivamente estos recursos PWA de arranque y mantiene privados `index-grupal.html`, datos y escrituras.

La captura f√≠sica de Control Manual mostr√≥ `ACTUALIZADO` sobre el t√≠tulo Universales al desplazarse. La regla `.mandatory-update:not(.available){position:absolute}` vive en `gsc-design-system.css`: el estado inactivo permanece en la cabecera y sale con el scroll; el estado `.available` sigue fijo, verde, habilitado y pulsante. La identidad R24C se conserva; el worker R8 detecta el `service-worker.js` R24C en cuanto el middleware deja de sustituirlo.

Los controles autom√°ticos se integran en `package.json`, `audit-project.mjs`, `test-v407-r24c-public-pwa-bootstrap.mjs`, `test-v407-r24c-update-scroll-isolation.mjs` y la regresi√≥n de acceso R18. Requiere despliegue LAB y revisi√≥n automatizada en navegador real; no constituye revisi√≥n f√≠sica. MAIN permanece intacta.

Continuidad 10 de septiembre de 2026: `scripts/rebuild-inventory-pdfs.py` regenera los tres PDF y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` vuelve a sellar 450 fuentes desde el √°rbol limpio `a2d1d9a5ebdd36435daed6c34a0c8ff61561612a`. Este resello no modifica funciones, HTML ni MAIN.

## V407-R24 LAB ¬∑ registro WhatsApp privado, archivo y botones m√≥viles ¬∑ 9 de septiembre de 2026

`index-grupal.html` agrega a cada jugador de Registro General y Stableford un WhatsApp opcional. Guatemala aparece como `üá¨üáπ +502`; el c√≥digo admite edici√≥n internacional. El n√∫mero se normaliza y guarda en el perfil para rondas posteriores, pero queda excluido de LIVE y de los artefactos digitales compartidos.

El flujo √∫nico queda sellado as√≠: `FINALIZAR RONDA` genera y archiva la tarjeta oficial antes de habilitar `ENVIAR TARJETA DIGITAL`; `NUEVA RONDA` persiste y archiva la tarjeta anterior, elimina s√≥lo las claves activas y abre jugadores/scores en blanco. Aplica a General, Match Play, Four Ball, Universales y Stableford. Adem√°s, `ACTUALIZADO` se oculta mientras cualquier overlay est√° visible para impedir el traslape observado sobre `ATR√ÅS`.

Pruebas directas actualizadas: V255/V261 para registro y WhatsApp; `test-v252-stableford-persistence-category-course.mjs`, `test-v260-round-points-player-return.mjs` y `test-stableford-ui.mjs` para la entrada Stableford enriquecida; V364/V289 para nueva ronda vac√≠a con historial; V352 para privacidad LIVE; V397 para tarjeta oficial; y V365/V405/V407-R1 para controles m√≥viles sin superposici√≥n. Rama exclusiva `lab/v407-r24-whatsapp-registration`; Main no se modifica.

Control de publicaci√≥n: los dos ROADMAPS y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` se guardan juntos y se calculan desde el √°rbol remoto LAB de 444 fuentes.

Compatibilidad: si un recorrido anterior de Stableford entrega √∫nicamente `names`, se crean entradas con `+502` y WhatsApp vac√≠o; el campo contin√∫a siendo opcional y el inicio de ronda no arroja error.

Correcci√≥n f√≠sica m√≥vil: la fila WhatsApp abarca las tres columnas del jugador, conserva `üá¨üáπ +502` a la izquierda y asigna al n√∫mero un m√≠nimo de 180 px para evitar el campo comprimido observado.

# V407-R23B ¬∑ frontera p√∫blica m√≠nima para LIVE ¬∑ 9 de septiembre de 2026

El enlace f√≠sico `live.html#stream=‚Ä¶` llegaba al formulario propietario porque el fragmento nunca viaja al servidor y `middleware.js` bloqueaba el HTML antes de que `live-view.js` pudiera leer el token. Se habilitan solamente el documento y sus dos scripts de visualizaci√≥n. En `/api/live`, el middleware inspecciona una copia del POST y permite √∫nicamente `action=read`; crear, publicar, unir y revocar siguen requiriendo el acceso normal. La propia API conserva la validaci√≥n criptogr√°fica del token, caducidad, revocaci√≥n y rate limit. No cambian Score Card, ACTUALIZAR, invitaci√≥n 24 h, WhatsApp, voz, Support ni c√°lculos.

Control permanente: `test-v352-live.mjs` exige los tres recursos p√∫blicos, la excepci√≥n precisa de lectura y proh√≠be incluir `/api/live` completo en `PUBLIC_PATHS`.

## V407-R23 ¬∑ LIVE de un toque y enlace 24 h compatible con WhatsApp ¬∑ 9 de septiembre de 2026

Dos rechazos f√≠sicos cierran el alcance: Kathy recibi√≥ el dominio sin un token utilizable y vio `ENTRAR COMO PROPIETARIO`; desde la Score Card, LIVE segu√≠a abriendo una segunda pantalla. `api/app-access.js` emite ahora `/access.html?invite=TOKEN`. `index-grupal.html` integra esa URL completa dentro del texto entregado a `navigator.share`, evitando que WhatsApp omita el campo URL o el fragmento. `access.html` valida el query o el fragmento legado, lo retira del navegador y ejecuta √∫nicamente POST contra `action=redeem`; los robots GET no pueden consumir el token.

`live-control.js` usa el mismo `currentSnapshot()` para cualquier ronda y, si existe, llama directamente `quickShareGroup()`. Esa funci√≥n crea o reutiliza el LIVE privado del grupo completo por 24 horas y abre en el mismo gesto la hoja nativa de compartir; el overlay administrativo queda disponible s√≥lo cuando no hay ronda activa. General, Universales, Stableford, Match Play y Four Ball comparten el mismo recorrido.

Pruebas preventivas: `test-r18-owner-guest-24h-access.mjs` exige query transportable, texto con URL, compatibilidad legada y POST; `test-v406-r5-simple-tournament-live.mjs` exige compartir directo sin pantalla intermedia. Regresiones V352, V353, categor√≠as, Universales y compartir grupo permanecen obligatorias. Release/cach√©: `V407-R23-DIRECT-SHARE-20260909` / `v407-r23-direct-share`.

## V407-R22 ¬∑ navegaci√≥n LIVE permanente desde ronda activa ¬∑ 9 de septiembre de 2026

Publicaci√≥n: commit GitHub `90c25514a83b5c407e00ecc4f02ad4f2c9de3ef8`; Preview `dpl_5NDZRiES2geCbDobhPPaPedBkyFH` READY; Producci√≥n `dpl_3T4Fu3Y59uzUzUXytU5FGn5b7ka2` READY. El dominio oficial conserva el middleware privado y redirige visitantes sin sesi√≥n a `access.html`. Rollback exacto: commit `1ad4197bc5f2f8a923b94f3f5eac4a562ccfaafe`.

Defecto f√≠sico reproducido en `IMG_3263.png` y `IMG_3264.png`: desde una tarjeta activa en hoyo 7, la tecla superior LIVE mostraba primero el men√∫ p√∫blico `VER TORNEO LIVE`, ocultando los controles de la propia ronda. La causa estaba en el manejador com√∫n `gscLiveLaunch`, que abr√≠a el overlay sin evaluar `currentSnapshot()`.

`live-control.js` asigna `liveViewerSection` al visor p√∫blico y, al abrir LIVE, calcula exclusivamente `hasRound=!!currentSnapshot()`: con ronda activa oculta el visor general y despliega `liveOrganizerPanel`; sin ronda conserva el Centro LIVE. La condici√≥n es independiente de nombre, campo, jugadores, hoyo y modalidad, por lo que cubre General, Universales, Stableford, Match Play y Four Ball actuales y futuros. ATR√ÅS conserva el cierre del overlay y la Score Card subyacente no se desmonta.

`test-v406-r5-simple-tournament-live.mjs` exige detecci√≥n gen√©rica de ronda, ocultamiento del men√∫ p√∫blico, despliegue directo de controles y presencia de las cinco modalidades. Regresi√≥n: V352 LIVE, V353 Centro, V406 categor√≠as, V407 Universales y V406-R22 compartir grupo. `index-grupal.html`, `service-worker.js` y sus bancos de identidad avanzan a `V407-R22-ACTIVE-ROUND-LIVE-20260909` para entregar el JavaScript nuevo sin cambiar la implementaci√≥n de ACTUALIZAR.

## R18-LAB ¬∑ acceso propietario temporal de 24 horas ¬∑ 8 de septiembre de 2026

- `api/_lib/app-access.js`: crea tokens opacos aleatorios de 32 bytes, guarda √∫nicamente SHA-256, valida 24 horas exactas, revoca por propietario y conserva feedback agregado sin nombres ni identidad. Elimina cada acceso y su bit√°cora mediante una purga horaria programada desde las 47 horas para no superar 48 horas.
- `api/app-access.js`: expone canje, estado, creaci√≥n, revocaci√≥n, salida, feedback an√≥nimo, reporte exclusivo del propietario y limpieza autenticada por `CRON_SECRET`.
- `middleware.js`: cierra la aplicaci√≥n p√∫blica, bloquea cuenta, respaldo, sincronizaci√≥n, comercio y administraci√≥n para invitados, y rechaza tokens vencidos o revocados.
- `access.html`: permite √∫nicamente a la cuenta propietaria abrir la aplicaci√≥n, crear/revocar el enlace y consultar actividad an√≥nima.
- `index-grupal.html`: separa el almacenamiento local del invitado, informa la bit√°cora temporal, impide instalaci√≥n offline, comprueba acceso cada 15 segundos y reporta s√≥lo modalidad, cantidad de jugadores, hoyos usados y n√∫mero de anotaciones.
- `guest-access.js`: instala antes de los m√≥dulos funcionales el almacenamiento aislado y el aviso de privacidad sin alterar los motores de la aplicaci√≥n.
- `package.json`: incorpora `@vercel/functions` para el middleware oficial.
- `vercel.json`: programa la eliminaci√≥n horaria; el umbral de 47 horas garantiza borrado antes del m√°ximo de 48.
- `test-r18-owner-guest-24h-access.mjs`: bloquea regresiones de propiedad, token, cookie, vencimiento, revocaci√≥n, privacidad, rutas prohibidas, feedback y purga.
- `audit-project.mjs`: incorpora el banco espec√≠fico a la auditor√≠a integral.
- `scripts/rebuild-inventory-pdfs.py`: identifica los tres inventarios con el corte real R18-LAB y elimina metadata heredada V367/V371.
- Estado: implementaci√≥n y banco dirigido PASS en copia LAB aislada; identidad exacta `EPG_OWNER_USER_ID`/alternativa configurada, Preview y pruebas f√≠sicas propietario/invitado/expiraci√≥n/revocaci√≥n permanecen bloqueantes. MAIN y Producci√≥n intactas.

## V407-R10 ¬∑ activaci√≥n permanente del bot√≥n ¬∑ 8 de septiembre de 2026

`index-grupal.html` cambia √∫nicamente el estado operativo de `mandatoryUpdateButton`: `showCurrentBuild()` conserva `ACTUALIZADO` y retira `disabled`; el toque reutiliza `installMandatoryUpdate()` para guardar y recargar el shell. `service-worker.js` avanza release/cach√© a R10. Pruebas de versi√≥n sincronizadas. Sin cambios gr√°ficos ni funcionales fuera del actualizador; MAIN intacta.

## V407-R9 ¬∑ bot√≥n ACTUALIZAR sustituye realmente el shell ¬∑ 8 de septiembre de 2026

`index-grupal.html` avanza a `V407-R9-MANUAL-UPDATE-20260908`, presenta `ACTUALIZADO` oscuro cuando el release publicado coincide y activa `ACTUALIZAR` s√≥lo ante una identidad diferente. `installMandatoryUpdate()` ejecuta `persist()`, desregistra los service workers del mismo origen, elimina √∫nicamente cach√©s con prefijo `gscg-mobile-` y recarga el mismo URL con `app_version` y `update_check`; no elimina `localStorage`, jugadores, scores ni Historial.

`service-worker.js` avanza a `v407-r9-manual-update`; su evento `activate` asegura el shell aprobado y toma control, pero no promueve ni navega autom√°ticamente. `test-v407-r9-manual-update.mjs` sella el flujo y se incorpora a `audit-project.mjs`. Los bancos de versi√≥n V365/V406/V407 se sincronizan. Trazabilidad: continuidad, RC-088 y ambos ROADMAPS. Rollback: commit remoto R8 `bc86bd2`; MAIN intacta.

## V407-R8 ¬∑ un solo scroll iPhone y actualizaci√≥n siempre verificable ¬∑ 8 de septiembre de 2026

Compatibilidad del acceso instalado: el proyecto Vercel `golf-sc-gt-lab` sirve como espejo del can√≥nico `epg-caddy.vercel.app`. `vercel.legacy-mirror.json` fija las reescrituras y proh√≠be cachear HTML o `service-worker.js`, de modo que R6 puede detectar y recibir R8 desde el mismo icono del iPhone.

`#setupOverlay.visible` deja `position:fixed` y el desplazamiento anidado; dentro de `gsc-setup-open` pasa a `position:relative`, altura por contenido y `overflow:visible`. `main` se oculta durante ese registro para que el documento tenga una sola superficie desplazable. `recoverInstalledAppScrolling()` excluye expresamente `setupOverlay` de la mutaci√≥n inline de altura/overflow.

El control de versi√≥n nace como `mandatory-update available`, habilitado, con texto `ACTUALIZAR`; el toque a√±ade `app_version` y `update_check` para forzar promoci√≥n/verificaci√≥n de cach√© preservando la ronda. Release y cach√©: `V407-R8-SINGLE-SCROLL-20260908` / `v407-r8-single-scroll`.

Puente para instalaciones atrapadas: al activarse, el service worker promueve R8 y navega solamente la ventana iPhone activa cuando su `app_version` es distinta. As√≠ V407-R6 deja de depender del detector que permaneci√≥ gris en `IMG_3136.jpeg`, sin recargar m√∫ltiples ventanas ni congelar el scroll.

Archivos: `index-grupal.html`, `service-worker.js`, `test-v407-r7-ios-scroll.mjs`, `test-v365-active-round-empty-recovery.mjs`, `test-v406-r2-professional-design.mjs`, `test-v406-r23-visible-version.mjs`, `test-v406-r4-mobile-controls.mjs`, `test-v406-r5-simple-tournament-live.mjs`, `test-v407-r1-premium-visual-system.mjs`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`.

## V407-R7 ¬∑ scroll iPhone y actualizaci√≥n visible ¬∑ 8 de septiembre de 2026

Archivos: `index-grupal.html`, `service-worker.js`, `audit-project.mjs`, `test-v407-r7-ios-scroll.mjs`, `test-v406-r4-mobile-controls.mjs`, `test-v406-r2-professional-design.mjs`, `test-v407-r1-premium-visual-system.mjs`, `test-v406-r5-simple-tournament-live.mjs`, `test-v261-registration-stableford-modality.mjs`, `test-v329-skins.mjs`, `test-v330-side-games.mjs`, `test-v406-r23-visible-version.mjs`, `test-v365-active-round-empty-recovery.mjs`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`. Elimina el listener `touchstart` que recalculaba layout durante el gesto; los overlays usan un scroller `100dvh` independiente y la p√°gina conserva desplazamiento vertical nativo. Release/cach√© pasan a V407-R7 para activar la actualizaci√≥n desde el mismo enlace instalado.

Se incorpora el commit concurrente `39bb130e1cddd22d5f9d2c70ea07f26144ad3bd5`: elimina la divisi√≥n visual entre modalidades existentes/nuevos juegos, conserva una sola matriz bajo `MODALIDADES` y renombra la acci√≥n a `COMPARTE LIVE`.

El candado `test-v407-r7-ios-scroll.mjs` rechaza cualquier regreso de la mutaci√≥n por `touchstart`.

## V407-R6 PRODUCCI√ìN ¬∑ enlace estable y actualizaci√≥n instalada ¬∑ 8 de septiembre de 2026

Archivos de control modificados: `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`. El mismo √°rbol funcional y visual V407-R6 aprobado en Preview pasa a Producci√≥n; `gscg-release` y `service-worker.js` permiten que una instalaci√≥n V406-R24 detecte la publicaci√≥n, active `ACTUALIZAR`, promueva la cach√© V407-R6 y conserve la sesi√≥n local. Rollback exacto: commit `4009f79f50987f8bf105189bce9c5e90b2857363`.

## V407-R4 ¬∑ Pantalla principal ¬∑ √°rea segura iPhone ¬∑ 8 de septiembre de 2026

Las evidencias f√≠sicas `IMG_3120(1).png`, `IMG_3121(1).png` e `IMG_3122.png` demostraron que la barra de estado del iPhone cruzaba el logo y el bloque derecho. `index-grupal.html` agrega el `safe-area-inset-top` al contenedor m√≥vil, mueve el bloque de ronda 36 px hacia el centro y separa versi√≥n/ACTUALIZADO 58 px del borde derecho. `service-worker.js` avanza release y cach√© a R4. `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md` conserva el estado entre conversaciones. No cambia scoring, voz, temporizador ni persistencia. Nueva revisi√≥n f√≠sica publicada obligatoria; Producci√≥n intacta.

## V407-R3 ¬∑ Pantalla 4 ¬∑ Tarjeta Digital premium ¬∑ 8 de septiembre de 2026

`index-grupal.html` corrige `finalCardOverlay`, `final-card-head`, `final-card-meta`, `final-card-shell` y `final-card-readonly`. Las acciones `COMPARTIR LIVE`, `FINALIZAR RONDA` o `ENVIAR TARJETA DIGITAL`, y `ATR√ÅS` comparten una ret√≠cula de tres columnas y alturas iguales. La tarjeta conserva negro, verde ne√≥n, blanco y rojo funcional, adem√°s del desplazamiento horizontal necesario para los 18 hoyos.

`service-worker.js` avanza a `V407-R3-PREMIUM-FINAL-CARD-20260908`. `test-v407-r1-premium-visual-system.mjs`, `test-v405-registration-clear-final-mobile.mjs`, `test-v365-active-round-empty-recovery.mjs` y los contratos visibles V406 verifican la geometr√≠a nueva, la versi√≥n y la permanencia de `ACTUALIZADO`.

Archivos exactos del corte: `index-grupal.html`, `service-worker.js`, `test-v407-r1-premium-visual-system.mjs`, `test-v365-active-round-empty-recovery.mjs`, `test-v405-registration-clear-final-mobile.mjs`, `test-v406-r2-professional-design.mjs`, `test-v406-r23-visible-version.mjs`, `test-v406-r4-mobile-controls.mjs`, `test-v406-r5-simple-tournament-live.mjs`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`.

Riesgo controlado: la vista sigue siendo de s√≥lo consulta y no se toca `renderFinalDigitalCard`, `officiallyCloseRound`, `shareOfficialArtifactImage`, el escritor oficial ni los motores de modalidad. Rollback: commit V407-R2. Producci√≥n no cambia.

Revisi√≥n f√≠sica Preview R3: se rechaz√≥ la primera captura porque `INSTALAR APP` invad√≠a la vista y el cuarto metadato quedaba vac√≠o en rondas casuales. `index-grupal.html` oculta `.pwa-install-button` durante `gsc-final-card-open` y presenta `RONDA CASUAL` mediante CSS sin modificar datos.

## V407-R1 ¬∑ redise√±o premium pantalla por pantalla ¬∑ 8 de septiembre de 2026

Archivos de trazabilidad y regresi√≥n actualizados: `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `test-v406-r23-visible-version.mjs` y `test-v406-r5-simple-tournament-live.mjs`.

Inventario individual de vistas WhatsApp preservadas: `previews/whatsapp-cards-v406-r24/01_RONDA_NORMAL.html`, `previews/whatsapp-cards-v406-r24/02_STABLEFORD.html`, `previews/whatsapp-cards-v406-r24/03_MATCH_PLAY.html`, `previews/whatsapp-cards-v406-r24/04_FOUR_BALL.html`, `previews/whatsapp-cards-v406-r24/05_SCORE_CARD_PRACTICA.html`, `previews/whatsapp-cards-v406-r24/06_SKINS.html`, `previews/whatsapp-cards-v406-r24/07_WOLF.html`, `previews/whatsapp-cards-v406-r24/08_VEGAS.html`, `previews/whatsapp-cards-v406-r24/09_DOTS.html`, `previews/whatsapp-cards-v406-r24/10_TORNEO_LIVE.html` y `previews/whatsapp-cards-v406-r24/index.html`.

`index-grupal.html` a√±ade variables de superficie, l√≠nea, radio, control y sombra premium. La cabecera m√≥vil deja la marca y la informaci√≥n de ronda en columnas claras, elimina el segundo micr√≥fono redundante del encabezado y conserva el micr√≥fono operativo dentro de Informaci√≥n del Campo. `roundUtilityBar` usa cuatro controles equivalentes en una fila. `round-actions` organiza cuatro acciones en 2√ó2 y reserva una l√≠nea completa para NUEVA RONDA. `round-secondary-actions` fija tres columnas iguales. Registro, paneles, Historial y Tarjeta Digital heredan las mismas superficies, esquinas y alturas t√°ctiles.

Control Manual sustituye el marco verde grueso por l√≠nea grafito, unifica las tres piezas de navegaci√≥n, normaliza cajas de lectura/entrada a 48 px y conserva ENTER como √∫nica acci√≥n primaria de 56 px. La l√≥gica, escritura y persistencia no cambian.

Correcci√≥n RC-084: `roundManualPlayerRows()` y `renderRoundManualEntry()` reemplazan columnas r√≠gidas por `.round-manual-detail` y `.round-player-grid`. En m√≥vil, ANTERIOR‚ÄìHOYO‚ÄìSIGUIENTE, datos de campo/modalidad, nombres, scores y totales se distribuyen con anchos adaptables; ENTER usa 62 px. Se conserva exclusivamente la paleta original negro, verde ne√≥n, blanco y rojo funcional. `test-v407-r1-premium-visual-system.mjs` bloquea la geometr√≠a y la introducci√≥n de degradados en el panel.

`test-v260-round-points-player-return.mjs` deja de exigir el ancho r√≠gido hist√≥rico `103px 72px 72px .65fr .65fr .75fr` y bloquea en su lugar las seis columnas adaptables de escritorio y m√≥vil. Se preservan jugadores, acumulados, Stableford, regreso y scores existentes.

`service-worker.js` renueva `ACTIVE_CACHE_NAME` y `RELEASE` a V407-R1. `test-v407-r1-premium-visual-system.mjs` exige las ret√≠culas, alturas y versi√≥n. Los bancos V406-R2, V406-R4, V406-R23 y V365 se alinean con la nueva identificaci√≥n sin modificar sus contratos funcionales. Las capturas f√≠sicas `IMG_3102.png` y `IMG_3103.png` quedan como evidencia ANTES; el DESPU√âS requiere Preview y navegador m√≥vil real. Producci√≥n no cambia.

## V406-R24 ¬∑ Tarjetas gr√°ficas WhatsApp ¬∑ 8 de septiembre de 2026

Para revisi√≥n f√≠sica del propietario se agrega `previews/whatsapp-cards-v406-r24/index.html` y las diez p√°ginas `01_RONDA_NORMAL.html`, `02_STABLEFORD.html`, `03_MATCH_PLAY.html`, `04_FOUR_BALL.html`, `05_SCORE_CARD_PRACTICA.html`, `06_SKINS.html`, `07_WOLF.html`, `08_VEGAS.html`, `09_DOTS.html` y `10_TORNEO_LIVE.html`. Todas provienen de `card-artifacts.js` con datos de muestra cerrados y permiten inspeccionar exactamente la composici√≥n que alimenta el PNG compartido. El alcance queda aislado a LAB y Producci√≥n no cambia.

## V406-R4 ¬∑ 7 de septiembre de 2026

index-grupal.html crea roundUtilityBar, rotula CATEGOR√çA/MARCAS y crea roundSecondaryActions. live-control.js inserta LIVE en esa barra. service-worker.js activa v406-r4-mobile-controls. test-v406-r4-mobile-controls.mjs bloquea regresiones. El banco temporal suma 67 jugadores: 7 Campeonato, 6 A, 24 B, 11 C, 7 Femenina, 7 Senior y 5 S. Senior.

- V406-R3: `index-grupal.html` cambia `gscg-release` y `service-worker.js` cambia `ACTIVE_CACHE_NAME`. Los candados `test-v365-active-round-empty-recovery.mjs` y `test-v406-r2-professional-design.mjs` prueban el nuevo contrato sin tocar l√≥gica funcional.

## V406-R2 LAB candidato ¬∑ 7 de septiembre de 2026

Archivos de dise√±o y control modificados: `gsc-design-system.css`, `index-grupal.html`, `live-hub.html`, `live-hub.js`, `api/live.js`, `live-control.js`, `service-worker.js`, `DATABASE_ARCHITECTURE.md`, `test-v365-active-round-empty-recovery.mjs`, `test-v406-tournament-categories.mjs` y `test-v406-r2-professional-design.mjs`.

Contrato visual: m√≠nimo t√°ctil 44 px; campos m√≥viles 48 px y texto 16 px; Registro por jugador en dos l√≠neas manteniendo Categor√≠a inmediatamente a la derecha de Nombre; TORNEO LIVE con menor densidad y ranking m√≥vil sin scroll lateral para datos esenciales.

Cabecera LIVE de categor√≠a: fecha autom√°tica en zona `America/Guatemala`, nombre del torneo, modalidad y categor√≠a en jerarqu√≠a grande. La tabla primaria presenta `POS`, `NOMBRE`, `HDCP`, `MARCAS`, `GROSS`, `NETO` y `+/‚àí`; la matriz completa de hoyos queda como segundo nivel de detalle.

La Vista detallada de categor√≠a no es una Score Card nueva. Deriva en memoria una matriz temporal con la cantidad real de inscritos en esa categor√≠a ‚Äî14, 20, 22, 30 u otra‚Äî desde las Score Cards publicadas por sus foursomes; no existe cupo fijo ni filas de relleno por categor√≠a. Mezcla todos los grupos y ordena de l√≠der a peor resultado tras cada actualizaci√≥n. Muestra hoyos 1‚Äì18 como Gross/Neto/resultado y totales IN/OUT/TOTAL, sin escribir, archivar, exportar ni duplicar scores. El foursome se conserva √∫nicamente como referencia secundaria.

Capacidad garantizada por servidor: una Score Card publica entre 1 y 6 jugadores y el conglomerado se pagina por grupos. `api/live.js` toma bloqueo `FOR UPDATE` del torneo en las operaciones de publicar y unir, vuelve a contar los jugadores visibles activos dentro de la misma sentencia y rechaza cualquier resultado superior a 100 con `409 LIVE_TOURNAMENT_CAPACITY_REACHED`. `test-v406-tournament-categories.mjs` conserva el contrato del l√≠mite, la transacci√≥n y su mensaje visible.

Pendiente f√≠sico: capturas y recorrido en iPhone/Safari de Registro, TORNEO LIVE, Mi Tablero y tarjetas. Producci√≥n permanece intacta.

## V406-R1 LAB candidato ¬∑ 7 de septiembre de 2026

| √Årea | Implementaci√≥n |
|---|---|
| Registro | Columna `CATEGOR√çA` a la derecha del nombre; selector individual de ocho valores. |
| Regla torneo | Impide iniciar un torneo si un jugador registrado no tiene categor√≠a; una ronda casual admite categor√≠a vac√≠a. |
| Datos | `tournamentCategory` pertenece al jugador y se normaliza en recuperaci√≥n y persistencia. |
| Tarjetas | La tarjeta global conserva y presenta la categor√≠a individual. |
| LIVE | Cliente y API transportan una clave validada; el Centro construye un √≠ndice oculto por categor√≠a. |
| TORNEO LIVE | Selector de categor√≠a, buscador y clasificaci√≥n filtrada; `MI TABLERO` sigue jugadores de categor√≠as distintas. |
| M√≥vil | Vista progresiva de una secci√≥n a la vez y correcci√≥n del traslape ATR√ÅS/ACTUALIZAR. |
| Pruebas | `test-v406-tournament-categories.mjs`, V352, V353, V365, artefactos, Gate e Intocables. |

Pendiente f√≠sico: revisar Registro, TORNEO LIVE y tarjetas en iPhone/Safari antes de declarar V406 estable.

## V405-R4 LAB estable ¬∑ 7 de septiembre de 2026

| Control | Evidencia/resultado |
|---|---|
| Identificaci√≥n final | `index-grupal.html` usa `V405-R4-LAB-STABLE-20260907`; `service-worker.js` usa `v405-r4-lab-stable`; la prueba V365 fija ambos. |
| ACTUALIZAR f√≠sico | En iPhone detect√≥ R3 sin refresco, parpade√≥ verde, actualiz√≥ y volvi√≥ a oscuro. |
| BORRAR TODO f√≠sico | El propietario confirm√≥ funcionamiento correcto en Registro iPhone. |
| Vercel Toolbar | Preview/Preproducci√≥n `Off`; Producci√≥n `Default`; la configuraci√≥n se aplica mediante un deployment nuevo de LAB. |

Pendiente: comprobar f√≠sicamente que V405-R4 ya no inyecte Toolbar y continuar tarjetas digitales 4/4. MAIN no cambia.

## V405-R3 LAB ¬∑ prueba f√≠sica del parpadeo ACTUALIZAR ¬∑ 7 de septiembre de 2026

| Archivo | Cambio m√≠nimo | Aceptaci√≥n |
|---|---|---|
| `index-grupal.html` | Release `V405-R3-LAB-UPDATE-BLINK-TEST-20260907`. | V405-R2 consulta el mismo dominio al iniciar, al volver al primer plano y cada 30 segundos; al detectar R3 habilita `ACTUALIZAR`, lo vuelve verde y anima. |
| `service-worker.js` | Cach√© `v405-r3-update-blink-test`. | Al pinchar, carga R3 sin borrar almacenamiento local. |
| `test-v365-active-round-empty-recovery.mjs` | Identificadores R3 y contrato del bot√≥n. | Rechaza release o cach√© anterior. |

Frontera: prueba temporal √∫nicamente en LAB. Sin cambios en MAIN, Producci√≥n, datos, Registro, scores, historial, tarjetas, Comunicaci√≥n Universal ni Intocables.

## Registro t√©cnico V332 ¬∑ moneda dual y matriz com√∫n de informaci√≥n

El propietario ampl√≠a `PEND-SKI-006`: todos los juegos nuevos deben ofrecer dos casillas excluyentes, `Q ¬∑ QUETZALES` y `$ ¬∑ D√ìLARES`, guardar la selecci√≥n y usarla sin conversiones ni mezclas en todo resultado. Tambi√©n exige una arquitectura de informaci√≥n completa y comprensible para quien desconoce las apuestas de golf.

| Archivo exacto | Control V332 | Resultado exigido |
|---|---|---|
| `skins.js` | `CURRENCY / ACCUMULATION / SETTLEMENT` | Conserva GTQ/USD y calcula hoyos, Skins, carry, dinero movido, neto a liquidar, l√≠der y mayor pozo. |
| `wolf.js` | `CURRENCY / RISK / ACCUMULATION` | Conserva GTQ/USD y calcula estado, pendientes, carry, exposici√≥n, dinero movido, neto, l√≠der y liquidaci√≥n por diferencia. |
| `vegas.js` | `CURRENCY / POINT MATRIX / DUEL RISK` | Conserva GTQ/USD y calcula hoyos, duelos, volteos, puntos, dinero, neto, l√≠der, mayor cambio y exposici√≥n m√°xima por duelo. |
| `dots.js` | `CURRENCY / EVENT MATRIX / POINT IMPACT` | Conserva GTQ/USD y calcula hoyos resueltos/pendientes, eventos, puntos positivos/negativos, dinero, neto, l√≠der e impacto de un punto por jugador. |
| `index-grupal.html` | `V332-DUAL-CURRENCY-MATRIX-20260826` | Ocho radios ‚Äîdos por juego‚Äî, s√≥lo una moneda marcada por juego, s√≠mbolos din√°micos y matriz com√∫n en vivo. |
| `card-artifacts.js` | `AUDITABLE SIDE-GAME MATRIX` | Global y personales conservan moneda, acumulados, riesgo, saldos y pago exacto. |
| `test-v329-skins.mjs`, `test-v330-side-games.mjs` | `DUAL CURRENCY / COMMON MATRIX REGRESSION` | Comprueban exclusividad, s√≠mbolos, m√©tricas, cero-suma, cierre, correcci√≥n, Historial, nube y restauraci√≥n. |
| `service-worker.js` | `gscg-mobile-v332-dual-currency-matrix` | Obliga al iPhone a cargar el shell nuevo. |
| Documentaci√≥n e inventarios | `HONEST STATUS / DIGEST` | Registran PASS de 89 paquetes, 325 fuentes y tres PDF sellados; conservan Producci√≥n intacta hasta Preview y PASS f√≠sico. |

La matriz com√∫n visible se define as√≠: acuerdos previos; moneda y unidad; estado actual; hoyos resueltos y pendientes; acumulado de puntos/unidades; dinero bruto movido; saldo neto por jugador o pareja; l√≠der/empate; riesgo propio del juego; neto a liquidar; y transferencias exactas. Ninguna cifra econ√≥mica escribe scores. El banco integral V332 termin√≥ con 89 paquetes PASS, 325 fuentes y tres inventarios sellados; queda pendiente la publicaci√≥n Preview y la prueba f√≠sica.

## Registro PEND-DID-017 ¬∑ fichas did√°cticas por modalidad

El propietario solicita una hoja por cada modalidad y por cada esquema que cambie el resultado, explicada con claridad suficiente para un ni√±o de 10 a√±os y utilizable en blanco y negro. El pendiente abarca Ronda Normal, Stableford, Match Play, Four Ball, Pr√°ctica, Skins, Wolf, Vegas, Dots y hojas complementarias para empates, decisiones, volteos y eventos configurables.

| Control obligatorio | Resultado exigido |
|---|---|
| Lenguaje de 10 a√±os | Frases cortas, glosario espa√±ol y ning√∫n t√©rmino ingl√©s sin explicar. |
| Blanco y negro real | Texto, bordes, patrones e iconos; ning√∫n estado o ganador depende s√≥lo del color. |
| Ejemplo auditable | Scores, operaci√≥n, acumulado anterior/nuevo y liquidaci√≥n coinciden con el motor. |
| Aprendizaje y estrategia | Explica qu√© acordar, qu√© registrar, c√≥mo leer el estado, c√≥mo jugar mejor y qu√© errores evitar. |
| Dinero general y opcional | Todas las hojas muestran Q/$, unidad, multiplicador, tope y liquidaci√≥n; cada grupo decide si liquida dinero o juega s√≥lo con puntos/unidades. |
| Versionado | Cada hoja declara fuente, variante universal/configurable/de grupo y versi√≥n del motor compatible. |

Archivo rector: `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_DID_017_FICHAS_MODALIDADES_PARA_APRENDER.md`. El trabajo se ejecutar√° despu√©s de validar f√≠sicamente las modalidades V332; no interrumpe la prueba activa ni modifica Producci√≥n.

## Registro t√©cnico V331 ¬∑ matriz investigada de apuestas

La evidencia f√≠sica `IMG_1960.png` aprueba V330-R3: s√≥lo `WOLF` permanece verde y `RONDA NORMAL` queda desmarcada. V331 contin√∫a el mismo pendiente y reemplaza controles ambiguos por reglas, estados, m√©tricas y liquidaciones explicables en espa√±ol. Las variantes que las fuentes describen de forma distinta nunca se presentan como universales.

| Archivo exacto | Control V331 | Resultado exigido |
|---|---|---|
| `wolf.js` | `PARTNER / LONE / BLIND / RISK / CAP / METRICS` | Migra `solo` legado a Lobo solitario; configura Wolf primero/√∫ltimo, multiplicadores y tope; calcula exposici√≥n por rival, unidades ganadas/perdidas, acumulado, dinero movido y pago por diferencia. |
| `vegas.js` | `PAIR NUMBER / 10+ / BOTH BIRDIES / LIVE METRICS` | 4+5‚Üí45; 10+4‚Üí104; ambos birdies cancelan el volteo por defecto o voltean ambos como regla del grupo; cada duelo conserva diferencia, tope, √°guila, puntos y cero-suma. |
| `dots.js` | `PLAIN SPANISH / POSITIVE-NEGATIVE / AUTO-MANUAL` | Sandy, Greenie, Chippie, Poley, Barkie, Arnie, Ferret y Snake incluyen definici√≥n; Ferret/Amigo/izquierda/derecha empiezan apagados; el resultado separa premios, penalizaciones y eventos por hoyo. |
| `index-grupal.html` | `V331-RESEARCHED-SIDE-GAMES-20260826 / LIVE CONTROL` | Configuraci√≥n previa comprensible, estados por hoyo, riesgos, acumulados, m√©tricas, detalle de c√°lculos y liquidaci√≥n; la tarjeta deportiva permanece intacta. |
| `card-artifacts.js` | `WOLF AUDIT PANEL` | Tarjeta final conserva acuerdos, unidades netas, acumulados, dinero movido y qui√©n paga a qui√©n. |
| `test-v330-side-games.mjs` | `RESEARCH MATRIX REGRESSION` | Cubre migraci√≥n, exposici√≥n, tope Wolf, dos pol√≠ticas de birdies Vegas, score 10+, m√©tricas Dots y selecci√≥n visual √∫nica. |
| `service-worker.js` | `gscg-mobile-v331-researched-side-games` | Obliga al iPhone a sustituir la copia V330-R3. |
| `scripts/update-inventory-v328.py` | `V331 INVENTORY COVER` | Regenera las tres portadas con matriz investigada, PASS f√≠sico R3 y prueba completa todav√≠a pendiente. |
| `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` | `HONEST STATUS / DIGEST` | Registran el PASS f√≠sico R3, el alcance V331 y las pruebas f√≠sicas todav√≠a pendientes. |

Fuentes consultadas: 18Birdies documenta Wolf por mejor bola, punto por unidad, Lobo solitario/ciego y pagos por diferencia; Wolf Golf Scorecard confirma Wolf primero/√∫ltimo, carry, multiplicadores y liquidaci√≥n; Mashie, 18Birdies y Golf Digest documentan la formaci√≥n del n√∫mero Vegas, volteos, scores de dos d√≠gitos y topes; 18Birdies, MyScorecard y SCGA describen Dots/Junk como eventos acordados antes de salir. La aplicaci√≥n conserva las adaptaciones de 3, 5 o 6 jugadores y tres parejas claramente rotuladas como propias de Golf Score Card GT.

## Registro t√©cnico V330 ¬∑ juegos laterales y tres parejas

**Hotfix V330-R3 ¬∑ selecci√≥n √∫nica despu√©s de rechazo f√≠sico:** la captura real de iPhone mostr√≥ simult√°neamente verdes `RONDA NORMAL` y `WOLF`; V330-R2 queda rechazada. `enforceExclusiveDraftGame()` elimina estados laterales m√∫ltiples heredados y `syncDraftModeSelection()` se convierte en el √∫nico escritor de las siete opciones. `selectSideGameRoundMode()` sincroniza antes de renderizar y `renderSideGameDrafts()` vuelve a sincronizar al terminar. `test-v330-side-games.mjs` ejecuta el caso WOLF y exige seis `aria-pressed=false` y s√≥lo WOLF en `true`. `index-grupal.html` identifica `V330-R3-PHYSICAL-SINGLE-MODE-20260826` y `service-worker.js` fuerza `gscg-mobile-v330-side-games-r3`.

**Registro PEND-VOZ-003 pospuesto:** la observaci√≥n f√≠sica nueva queda documentada en `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md` y `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`: respuestas generales demasiado vagas sin una petici√≥n adicional, corte del ciclo en la quinta conversaci√≥n y necesidad de estados exactos `ESCUCHANDO` / `RESPONDIENDO` en rojo parpadeante. No existe cambio funcional de voz en este corte; el trabajo activo regresa a las modalidades nuevas.

**Registro de pendientes nuevos:** `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_UBI_015_DETECCION_CAMPO_POR_GPS.md` documenta cat√°logo geogr√°fico, per√≠metros, propuesta y confirmaci√≥n del campo; `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_RSG_016_SINCRONIZACION_REGLAS_GOLF.md` documenta fuente oficial, manifiesto, SHA-256, cach√©, actualizaci√≥n y reversi√≥n. `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md` y `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` incorporan ambos IDs sin duplicar `PEND-GPS-010` ni `PEND-REG-001`.

| Archivo exacto | Control V330 | Resultado comprobado |
|---|---|---|
| `skins.js` | `2‚Äì6 / GROSS-NET / CARRY-SPLIT-VOID / ZERO-SUM` | Ganador o empate por hoyo, bolsa, carry final, X y saldo econ√≥mico separado. |
| `wolf.js` | `3‚Äì6 / ROTATION / PARTNER-SOLO-LONE-BLIND / CLOSE GUARD` | Decisi√≥n por hoyo, multiplicadores √ó1/√ó2/√ó3, cobro cruzado, empate y bloqueo de cierre si falta una decisi√≥n. |
| `vegas.js` | `4 OR 6 / 2 OR 3 PAIRS / CAP / ZERO-SUM` | N√∫mero menor por pareja, comparaciones par a par, empate, volteo, √°guila y tope. |
| `dots.js` | `2‚Äì6 / ENABLED EVENTS / CUSTOM VALUES` | Eventos cl√°sicos configurables y reglas Amigo/izquierda/derecha apagadas por defecto. |
| `match-play.js`, `four-ball.js` | `GREEN 1‚Äì2 / GOLD 3‚Äì4 / BLUE 5‚Äì6` | Tres parejas completas; Match independiente y Four Ball por mejor Neto. |
| `index-grupal.html` | `TWO-COLUMN SETUP / MAIN CARD UNCHANGED / VOICE` | Existentes a la izquierda, nuevos a la derecha, moneda, reglas, resultados y controles; sin redise√±ar la tarjeta principal. |
| `round-closure.js` | `SIDE GAMES SNAPSHOT / SHA-256 / CORRECTION` | Cierre auditable, Wolf completo obligatorio y rec√°lculo versionado. |
| `card-artifacts.js`, `card-library.js`, `historical-analytics.js` | `GLOBAL / PERSONAL / SEARCH / HISTORY` | Configuraci√≥n, ganadores, empates y saldos visibles y consultables. |
| `master-data-sync.js`, `account-backup.js` | `CLOUD / RESTORE` | El snapshot de juegos sobrevive sincronizaci√≥n y restauraci√≥n. |
| `service-worker.js`, `scripts/build-mobile-web.mjs`, `vercel.json` | `CACHE V330 / MOBILE ASSETS / NO-STORE MODULES` | Los cuatro motores viajan en la copia instalable y no quedan congelados por cach√© anterior. |
| `test-v329-skins.mjs`, `test-v330-side-games.mjs` | `ENGINE + E2E + UI + PERSISTENCE` | Regla, empate, X, tope, cero-suma, cierre, correcci√≥n, artefactos, historial, nube, restauraci√≥n y voz aprobados localmente. |
| `audit-project.mjs` | `89 PACKAGES + LIVE VERCEL GATE` | Regresi√≥n local completa y build Preview aprobados; la puerta real confirm√≥ modelo, b√∫squeda web, seis fuentes oficiales y `scoreChanged:false`. |

Estado honesto: el Preview `dpl_4k5V9rFwkVXVwuRwktBjtgG4arAv` qued√≥ `READY` desde `ea18aafb214731d44b41ea069fe27228407f9f47`; 89 paquetes, 322 fuentes, tres inventarios y la puerta viva aprobaron. La protecci√≥n de acceso de Vercel impidi√≥ la inspecci√≥n visual autom√°tica externa; revisi√≥n visual/t√°ctil y prueba f√≠sica de iPhone siguen abiertas antes de cualquier montaje en Producci√≥n.

## Registro t√©cnico V328-R2 ¬∑ Reglas oficiales y respaldo b√°sico sin conexi√≥n

El centro reglamentario reutiliza panel, conversaci√≥n temporal, micr√≥fono bilateral, s√≠ntesis, fuentes y contexto de la aplicaci√≥n. `api/golf-rules.js` obliga a investigar en USGA/The R&A, filtra de nuevo las fuentes recibidas y falla si no existe autoridad oficial. La tarjeta entrega √∫nicamente campo y modalidad; no expone coordenadas, nombres ni scores. El modo REGLAS evita deliberadamente `routeAiUniversalAppText`, por lo que una consulta no puede convertirse en escritura. El Preview V328-R1 qued√≥ `READY` con √°rbol remoto `f0de0f6328c34ed2788faf1009ba04a19f47e6c1` despu√©s de aprobar 86 paquetes y la consulta oficial real. V328-R2 a√±ade respaldo local de respuestas oficiales ya confirmadas, sin convertirlo en una base cerrada de reglas ni simular AI.

| Archivo exacto | Control V328 | Resultado comprobado |
|---|---|---|
| `api/golf-rules.js` | `OFFICIAL_RULE_DOMAINS / tool_choice required / scoreChanged false` | Modelo real GPT-5.6, Web limitada a `usga.org` y `randa.org`, fuentes oficiales obligatorias, edici√≥n 2023, clarificaciones vigentes y cero escritura. |
| `index-grupal.html` | `REGLAS / get_official_golf_rule / RULES MODE ISOLATION` | Acceso global, texto, voz, controles bilaterales, fuentes visibles, contexto de modalidad y bypass de √≥rdenes locales. |
| `test-v328-official-golf-rules.mjs` | `15 RULE SCENARIOS / 2 DOMAINS / 0 SCORE WRITES` | Fuera de l√≠mites, provisional, penalidad, alivios, Match Play, Four-Ball, Stableford, Comit√© y Regla Local. |
| `test-v328-live-official-rules.mjs` | `REAL MODEL / REAL WEB / OFFICIAL SOURCE / 0 SCORE WRITES` | Ejecuta el handler real dentro de Vercel con la credencial Preview; bloquea el build si falta respuesta, autoridad USGA/The R&A o aislamiento de score. |
| `golf-rules-offline.js` | `24 ENTRIES / 90 DAYS / TOKEN MATCH / SAME MODE` | Conserva s√≥lo respuestas previamente confirmadas con fuente oficial; no guarda la pregunta completa, no llama servicios externos y no escribe scores. |
| `test-v328-offline-official-rules.mjs` | `OFFICIAL CACHE / PRIVACY / EXPIRY / NEGATIVE MATCH / 0 SCORE WRITES` | Prueba l√≠mites, caducidad, modalidad, coincidencias d√©biles, PWA y rechazo de fuentes o cambios no autorizados. |
| `vercel.json` | `AUDIT 87 + LIVE RULE GATE` | Obliga regresi√≥n completa y consulta oficial real antes de entregar cada Preview V328-R2. |
| `manual.html`, `docs/manual/v311/manual-pages-17-35.json`, `scripts/update-manual-page-73.py`, `docs/manual/v311/page-73.png` | `MANUAL PAGE 73 V328` | Explicaci√≥n sencilla para elegir canal, describir, verificar fuente y conservar la tarjeta. |
| `docs/manual/v311/Manual_Golf_Score_Card_GT_COMPLETO.pdf`, `docs/manual/v311/Manual_de_Funciones_Golf_Score_Card_GT_01-16.pdf` | `74 PAGES / 4K / 300 DPI` | PDF completo y alias estable regenerados; extracci√≥n y control visual aprobados. |
| `service-worker.js` | `gscg-mobile-v328-official-golf-rules-offline-r2` | Instala el m√≥dulo de respaldo y fuerza sustituci√≥n de la copia anterior. |
| `scripts/update-inventory-v328.py` | `3 INVENTORY COVERS / OFFLINE DELIVERED / IDEMPOTENT` | Actualiza la portada V328-R2 de los tres inventarios sin duplicarla al repetir el proceso. |
| `audit-project.mjs` | `87 PACKAGES` | Agrega los paquetes reglamentarios conectado y sin conexi√≥n a la regresi√≥n maestra. |
| `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | `PEND-REG-001 V328-R2` | Distinguen modo offline entregado de voz f√≠sica y eventual licencia comercial todav√≠a pendientes. |

Todos los archivos tocados por la firma/cach√© V328 quedan registrados aqu√≠ para el candado: `test-v327-tool-followup-no-silence.mjs`, `test-v326-no-silent-conversation.mjs`, `test-v325-ideal-microphone-timings.mjs`, `test-v324-real-traffic.mjs`, `test-v323-long-multitopic-context.mjs`, `test-v322-real-sustained-caddie.mjs`, `test-v321-ai-universal-infinity.mjs`, `test-v312-general-caddie.mjs`, `test-v307-match-arrows-format.mjs`, `test-v305-history-navigation-zero-error.mjs`, `test-v304-homogeneous-registration-actions.mjs`, `test-v290-brand-icons-cleanup.mjs`, `test-v284-native-package-generation.mjs`, `test-v281-pwa-installation.mjs`, `test-v280-local-history-insights.mjs`, `test-v279-local-card-library.mjs`, `test-v278-card-image-pdf-export.mjs`, `test-v277-official-round-corrections.mjs`, `test-v276-manual-hole-navigation.mjs`, `test-v275-stable-live-voice-turns.mjs`, `test-v274-complete-courses-voice-operations.mjs`, `test-v272-definitive-operational-release.mjs` y `test-stableford-ui.mjs`. Tambi√©n se actualizan `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`; los tres inventarios PDF externos se regeneran antes de validar.

## Registro detallado V327-R1-PEND ¬∑ pendientes completos, inventarios y ejecuci√≥n aut√≥noma

El propietario dispone el **26 de agosto de 2026** que la cola se adapte completa y que el trabajo contin√∫e sin autorizaciones intermedias: cada pendiente se dise√±a dentro de la arquitectura √∫nica, se implementa, se prueba en autom√°tico y en su dispositivo f√≠sico, se despliega en Preview y s√≥lo se monta despu√©s de PASS √≠ntegro. Una dependencia externa real se registra como bloqueo; no se falsifica una licencia, credencial, cuenta, contrato ni dato oficial.

| Archivo o artefacto exacto | Control actualizado | Resultado exigido |
|---|---|---|
| `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/DIRECTRICES_MANDATORIAS.md` | `AUTORIZACI√ìN PERMANENTE / REGLAS 22‚Äì26 / FAIL BLOQUEA` | Elimina autorizaciones intermedias, proh√≠be trasladar trabajo t√©cnico, exige siguiente acci√≥n inequ√≠voca, impide simular trabajo en segundo plano y conserva Producci√≥n intacta ante cualquier falla. |
| `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md` | `PEND-REG-001` a `PEND-QA-014` | Re√∫ne voz, tr√°fico, reglas, handicap, campos, GPS, juegos/apuestas, relojes, nube, estad√≠sticas, monetizaci√≥n, QA, clima y Gu√≠a R√°pida. |
| `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md` | `CORTE V327-R1 / 24 BLOQUES` | Separa funciones entregadas, fases parciales, bloqueos externos y condiciones reales de cierre. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | `MAPA V327-R1-PEND` | Permite localizar la autorizaci√≥n y los catorce identificadores oficiales sin revisar conversaciones antiguas. |
| `Inventario_Golf_Score_Card_GT_OVERALL_V311.pdf`, `Inventario_Golf_Score_Card_GT_A_DETALLE_V311.pdf`, `Inventario_Golf_Score_Card_GT_POR_IMAGENES_Y_RUBROS_V311.pdf` | `PORTADA V327-R1-PEND` | Los tres inventarios PDF abren con estado, cola maestra, directriz de ejecuci√≥n y puerta f√≠sica pendiente. |
| `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` | `DIGEST + 3 PDF` | Sella fuentes, tama√±os y SHA-256 nuevos despu√©s de renderizar e inspeccionar los inventarios. |
| `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` | `REGISTRO DOBLE` | Satisfacen el candado mandatorio activado el 23 de agosto de 2026, 17:05:00, hora de Guatemala, despu√©s de la l√≠nea 185. |

V327-R1 conserva 44 llamadas reales desplegadas, 24 √°reas, ocho turnos con memoria, 550 secuencias de voz, tr√°fico exacto/futuro, clima, investigaci√≥n y cero 5xx. La prueba f√≠sica larga en iPhone sigue siendo la puerta inmediata; no se abre otra implementaci√≥n funcional ni se monta Producci√≥n antes de cerrarla.

## Registro detallado V327 ¬∑ continuidad real despu√©s de tr√°fico e investigaci√≥n web

La prueba f√≠sica de V326-R2 qued√≥ rechazada. Despu√©s de unas seis preguntas, el usuario recibi√≥ silencios con el micr√≥fono rojo: una consulta sobre una persona conocida en Colima s√≠ termin√≥ en `/api/research` con HTTP 200 y Google Routes tambi√©n estaba operativo, pero el cliente no termin√≥ la segunda respuesta hablada. La evidencia demuestra una falla de estados WebRTC y no una lista angosta de vocabulario.

| Archivo exacto | Control V327 | Resultado exigido |
|---|---|---|
| `index-grupal.html` | `TRANSCRIPTION UNTIL FINAL / FOLLOWUP AUDIO START / PLAYBACK 60S` | `speech_stopped` no cancela la vigilancia; un cierre tard√≠o sin `response_id` se atribuye a la respuesta fuente hasta que empiece el audio final; generaci√≥n y reproducci√≥n tienen recuperaci√≥n independiente; el canal perdido nunca retorna en silencio. |
| `api/voice-health.js` | `ALLOWLIST / NO CONTENT / 202` | Conserva s√≥lo etapa, build, contexto, n√∫mero de turno, duraci√≥n, herramienta y banderas t√©cnicas; descarta pregunta, transcripci√≥n, nombre, GPS y credenciales. |
| `api/_lib/traffic.js` | `AMBIGUOUS DESTINATION ‚Üí ONE QUESTION` | Una ruta inexistente o un destino fragmentario pide nombre completo, zona o municipio. La ruta exacta El Pult√© Golf ‚Üí Pradera Concepci√≥n permanece calculable. |
| `api/universal-ai.js` | `TEXT TRAFFIC CLARIFICATION` | El canal de texto tampoco invoca tr√°fico con un fragmento ambiguo y, si el proveedor no identifica la ruta, formula solamente una pregunta breve. |
| `test-v327-tool-followup-no-silence.mjs` | `550 TOOL/AUDIO SEQUENCES + 100 PRIVACY EVENTS` | Prueba cierres antes y despu√©s de crear el follow-up, con y sin ID, audio final, vigilancia de entrada/reproducci√≥n, recuperaci√≥n de canal, aclaraci√≥n de destino y exclusi√≥n de contenido privado. |
| `test-v326-no-silent-conversation.mjs`, `test-v325-ideal-microphone-timings.mjs`, `test-v324-real-traffic.mjs`, `test-v323-long-multitopic-context.mjs`, `test-v322-real-sustained-caddie.mjs`, `test-v312-general-caddie.mjs` | `REGRESSION-V327` | Conservan VAD 2.2 s, entrada 15/90 s, respuesta 30 s, contexto largo, b√∫squeda universal y tr√°fico real. |
| `service-worker.js` | `gscg-mobile-v327-tool-followup-no-silence` | Fuerza al iPhone a sustituir la copia V326-R2. |
| `audit-project.mjs`, `test-stableford-ui.mjs`, `test-v272-definitive-operational-release.mjs`, `test-v274-complete-courses-voice-operations.mjs`, `test-v275-stable-live-voice-turns.mjs`, `test-v276-manual-hole-navigation.mjs`, `test-v277-official-round-corrections.mjs`, `test-v278-card-image-pdf-export.mjs`, `test-v279-local-card-library.mjs`, `test-v280-local-history-insights.mjs`, `test-v281-pwa-installation.mjs`, `test-v284-native-package-generation.mjs`, `test-v290-brand-icons-cleanup.mjs`, `test-v304-homogeneous-registration-actions.mjs`, `test-v305-history-navigation-zero-error.mjs`, `test-v307-match-arrows-format.mjs` | `BUILD/CACHE-V327` | Toda la regresi√≥n exige el nuevo corte sin alterar funciones anteriores. |
| `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` | `HONEST STATUS / MAP / DIGEST` | Registran V326-R2 rechazada, V327 en banco y la prohibici√≥n de montaje hasta PASS f√≠sico prolongado. |

El c√°lculo directo real ejecutado durante el diagn√≥stico devolvi√≥ para El Pult√© Golf ‚Üí Pradera Concepci√≥n 15 km y cerca de 33 minutos en ese instante. `Concepci√≥n` sin m√°s datos no debe convertirse arbitrariamente en Pradera Concepci√≥n ni en otro municipio: el modelo hace una sola pregunta breve. Producci√≥n permanece en V322 sin modificaci√≥n.

## Registro detallado V326-R1 ¬∑ recarga controlada de la credencial de tr√°fico

El usuario indic√≥ que Google Routes podr√≠a estar habilitado. Como Vercel congela las variables disponibles al momento de cada construcci√≥n, se solicit√≥ un deployment nuevo con el mismo √°rbol funcional V326. El intento inicial `ffc45545d77182c6904f74f664cef5d8f12eb95a` fue rechazado antes de publicar por `ROADMAP GATE`: no conten√≠a actualizaci√≥n simult√°nea de `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`. El rechazo prueba que el candado de gobernanza funciona y no constituye una falla de la aplicaci√≥n ni una modificaci√≥n de producci√≥n.

V326-R1 modifica √∫nicamente `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`; no cambia HTML, API, Service Worker ni l√≥gica del micr√≥fono. El deployment Preview resultante debe ejecutar la consulta literal ¬´ma√±ana a las 12:30 PM, de El Pult√© hacia colonia Oakland zona 10¬ª y s√≥lo puede aprobarse si recibe `ok:true`, ETA, `staticDuration`, demora, distancia, proveedor y hora de c√°lculo. La comparaci√≥n contra Waze en Guatemala y el micr√≥fono f√≠sico prolongado contin√∫an como pruebas finales obligatorias.

La construcci√≥n `dpl_F7cu9YVHovcxWiMMJAR2pm6dnkRx` carg√≥ efectivamente `GOOGLE_MAPS_API_KEY` y expuso un defecto exclusivo del banco: la aserci√≥n de credencial ausente inyectaba `apiKey:""`, valor que el operador `||` reemplazaba por la credencial real de Preview. El test recibi√≥ `TRAFFIC_ROUTE_UNAVAILABLE` al alcanzar Google y se detuvo antes de publicar. La correcci√≥n queda limitada a `test-v324-real-traffic.mjs`, usando `apiKey:" "` para comprobar el recorte a vac√≠o sin heredar el entorno; no cambia el contrato ni la ejecuci√≥n real de `api/_lib/traffic.js`.

## Registro detallado V326 ¬∑ recuperaci√≥n comprobable del micr√≥fono rojo

La evidencia f√≠sica invalida el criterio V325: `semantic_vad` con `eagerness: low` pod√≠a conservar indefinidamente un turno abierto y el watchdog de transcripci√≥n s√≥lo nac√≠a despu√©s de `input_audio_buffer.speech_stopped`. Por eso el c√≠rculo segu√≠a rojo aunque el usuario ya hubiera terminado de hablar. V326 reemplaza √∫nicamente el perfil conversacional por `server_vad` 0.2/700/2,200 ms; la captura operativa de scores, navegaci√≥n y registro conserva 0.2/700/1,000 ms.

| Archivo exacto | Control V326 | Resultado exigido |
|---|---|---|
| `index-grupal.html` | `CONVERSATION 2200 / INPUT 15S / HARD 90S / RESPONSE 30S` | Cierra una pausa conversacional amplia, renueva vigilancia con deltas, desmonta la captura atascada, apaga el micr√≥fono rojo y recupera una respuesta que no comenz√≥. El consumo aproximado de A/C se atiende directamente con supuestos. |
| `test-v326-no-silent-conversation.mjs` | `REAL TIMER STATE MACHINE / 30 TURNS` | Ejecuta los callbacks de entrada y respuesta, comprueba el apagado del rojo, mensajes de recuperaci√≥n y 30 alternancias conversaci√≥n/orden. |
| `test-v325-ideal-microphone-timings.mjs` | `V326 REGRESSION` | Sustituye la expectativa sem√°ntica no determinista por la pausa conversacional fija de 2.2 segundos. |
| `audit-project.mjs` | `AUDIT-V326` | Incorpora el nuevo candado a la auditor√≠a maestra. |
| `service-worker.js` | `gscg-mobile-v327-tool-followup-no-silence` | Obliga a reemplazar la copia V325 instalada en la vista previa. |
| `test-v324-real-traffic.mjs`, `test-v323-long-multitopic-context.mjs`, `test-v322-real-sustained-caddie.mjs`, `test-v312-general-caddie.mjs`, `test-stableford-ui.mjs`, `test-v272-definitive-operational-release.mjs`, `test-v274-complete-courses-voice-operations.mjs`, `test-v275-stable-live-voice-turns.mjs`, `test-v276-manual-hole-navigation.mjs`, `test-v277-official-round-corrections.mjs`, `test-v278-card-image-pdf-export.mjs`, `test-v279-local-card-library.mjs`, `test-v280-local-history-insights.mjs`, `test-v281-pwa-installation.mjs`, `test-v284-native-package-generation.mjs`, `test-v290-brand-icons-cleanup.mjs`, `test-v304-homogeneous-registration-actions.mjs`, `test-v305-history-navigation-zero-error.mjs` y `test-v307-match-arrows-format.mjs` | `BUILD/CACHE-V326` | Conservan todas las funciones previas y exigen la copia corregida. |
| `GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md` | `REJECT-V325 / VALIDATE-V326` | Documentan el fallo real, la correcci√≥n y que no existe autorizaci√≥n de montaje. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md` | `MAP/DIGEST/EVIDENCE-V326` | Mapa, tres inventarios, sello y evidencia coinciden con el corte corregido. |

La prueba de aceptaci√≥n pendiente repite literalmente: tr√°fico ma√±ana, salida 12:30 PM de El Pult√© hacia colonia Oakland zona 10; consumo el√©ctrico aproximado de un aire acondicionado; y una conversaci√≥n multitema bilateral prolongada. V326 no se monta sin aprobar esas tres rutas f√≠sicas. Google Routes contin√∫a siendo un bloqueo externo separado mientras no exista credencial Preview y comparaci√≥n simult√°nea contra Waze en Guatemala.

## Registro detallado V325 ¬∑ tiempos ideales del micr√≥fono bilateral

V325 mantiene dos perfiles deliberados. `operational` conserva `server_vad` 0.2/700/1,000 ms para registros, scores y √≥rdenes breves. `conversation` utiliza `semantic_vad` con `eagerness: low` para que AI UNIVERSAL ‚àû espere el cierre sem√°ntico de una idea y no fragmente una conversaci√≥n por una pausa fija. Toda actualizaci√≥n de sesi√≥n queda serializada y validada contra el perfil esperado antes de generar la respuesta; una orden reconocida restaura el perfil operativo.

La continuidad exige apertura siempre manual, micr√≥fono disponible durante la respuesta, guardia de interrupci√≥n de 250 ms, transcripci√≥n humana m√≠nima de ocho caracteres, filtro de eco de 1,800 ms, reescucha inmediata, cierre por inactividad de 30 minutos, watchdog de diez segundos y aviso `Falta NOMBRE` despu√©s de 2,000 ms m√°s 450 ms de confirmaci√≥n. `test-v325-ideal-microphone-timings.mjs` compila el script y ejecuta 30 alternancias conversaci√≥n/operaci√≥n. La validaci√≥n f√≠sica prolongada en iPhone contin√∫a abierta, al igual que credencial y comparaci√≥n real del tr√°fico en Guatemala. Se agregan a pendientes USGA/Reglas de Golf, Skins y Apple Watch/Wear OS.

Archivos exactos V325: `index-grupal.html`, `service-worker.js`, `audit-project.mjs`, `test-v325-ideal-microphone-timings.mjs`, `test-v324-real-traffic.mjs`, `test-v323-long-multitopic-context.mjs`, `test-v322-real-sustained-caddie.mjs`, `test-v312-general-caddie.mjs`, `test-stableford-ui.mjs`, `test-v272-definitive-operational-release.mjs`, `test-v274-complete-courses-voice-operations.mjs`, `test-v275-stable-live-voice-turns.mjs`, `test-v276-manual-hole-navigation.mjs`, `test-v277-official-round-corrections.mjs`, `test-v278-card-image-pdf-export.mjs`, `test-v279-local-card-library.mjs`, `test-v280-local-history-insights.mjs`, `test-v281-pwa-installation.mjs`, `test-v284-native-package-generation.mjs`, `test-v290-brand-icons-cleanup.mjs`, `test-v304-homogeneous-registration-actions.mjs`, `test-v305-history-navigation-zero-error.mjs`, `test-v307-match-arrows-format.mjs`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`.

## Registro detallado V324 ¬∑ tr√°fico actual/futuro, privacidad y recuperaci√≥n

V324 a√±ade tr√°fico como herramienta din√°mica de AI UNIVERSAL ‚àû, no como lista de palabras ni respuesta fija. El modelo decide cu√°ndo pedir `get_live_traffic`; el servidor consulta Google Maps Routes en modo √≥ptimo y devuelve un resumen auditable. El GPS se usa √∫nicamente como origen ef√≠mero, se elimina del contexto presentado al modelo y nunca aparece en la respuesta. La integraci√≥n distingue Google Routes de Waze y conserva pendiente la calibraci√≥n f√≠sica necesaria antes del montaje.

| Archivo exacto | Control V324 | Resultado exigido |
|---|---|---|
| `api/_lib/traffic.js`, `api/traffic.js` | `TRAFFIC_AWARE_OPTIMAL / 15S / NO COORDINATES` | Ruta real actual o futura, clave s√≥lo en servidor, ETA/demora/distancia y fallos recuperables. |
| `api/universal-ai.js` | `get_live_traffic / TWO-STEP / 55S` | Clasifica la intenci√≥n sin cat√°logo, solicita GPS cuando falta y vuelve a consultar al modelo con un temporizador independiente. |
| `index-grupal.html` | `VOICE + TEXT + GPS EPHEMERAL / 20S` | La misma funci√≥n opera por micr√≥fono y teclado, no guarda coordenadas y permite continuar tras √©xito o error. |
| `test-v324-real-traffic.mjs` | `CURRENT / FUTURE / PRIVACY / FAILURE / TIMEOUT` | Prueba ETA, demora, huso horario, proveedor, privacidad, texto, voz y recuperaci√≥n. |
| `audit-project.mjs` | `AUDIT-V324` | A√±ade V324 a toda la regresi√≥n antes de construir. |
| `service-worker.js`, `test-v323-long-multitopic-context.mjs`, `test-v322-real-sustained-caddie.mjs`, `test-v321-ai-universal-infinity.mjs`, `test-v312-general-caddie.mjs`, `test-stableford-ui.mjs`, `test-v272-definitive-operational-release.mjs`, `test-v274-complete-courses-voice-operations.mjs`, `test-v275-stable-live-voice-turns.mjs`, `test-v276-manual-hole-navigation.mjs`, `test-v277-official-round-corrections.mjs`, `test-v278-card-image-pdf-export.mjs`, `test-v279-local-card-library.mjs`, `test-v280-local-history-insights.mjs`, `test-v281-pwa-installation.mjs`, `test-v284-native-package-generation.mjs`, `test-v290-brand-icons-cleanup.mjs`, `test-v304-homogeneous-registration-actions.mjs`, `test-v305-history-navigation-zero-error.mjs` y `test-v307-match-arrows-format.mjs` | `BUILD/CACHE-V324` | Conservan sus controles previos y exigen el nuevo build/cach√©. |
| `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md` | `HONEST-STATUS` | Registran c√≥digo implementado y mantienen abiertas credencial, destino, Guatemala/Waze e iPhone. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md` | `MAP/DIGEST/EVIDENCE-V324` | Mapa, sello y evidencia coinciden con las fuentes exactas. |

## Registro detallado V323 ¬∑ memoria bilateral multitema

La prueba conversacional real cambi√≥ de tema 14 veces sin cortar la comunicaci√≥n, pero la pregunta 15 revel√≥ que la clave inicial ya no llegaba al modelo. V323 unifica en 80 mensajes la memoria compartida por teclado, voz Realtime y API de texto. El l√≠mite equivale a 40 intercambios completos y conserva una ventana m√≥vil controlada cuando se supera.

| Archivo exacto | Control V323 | Resultado exigido |
|---|---|---|
| `api/universal-ai.js` | `80-MESSAGE-SERVER-HISTORY` | La API real recibe hasta 80 mensajes limpios sin truncar la conversaci√≥n a 8 intercambios. |
| `index-grupal.html` | `80-MESSAGE-BILATERAL-HISTORY` | Texto y voz comparten hasta 40 intercambios y preservan el primer dato despu√©s de 30 cambios de tema. |
| `service-worker.js` | `gscg-mobile-v323-long-multitopic-context` | Sustituye de inmediato el shell V322 instalado. |
| `test-v323-long-multitopic-context.mjs` | `30-TOPICS / 63-MESSAGES / FIRST-KEY` | Verifica memoria inicial, variedad tem√°tica, rutas de texto y voz, y l√≠mite m√≥vil. |
| `audit-project.mjs` | `AUDIT-V323` | Ejecuta la prueba multitema junto con toda la regresi√≥n. |
| `test-v322-real-sustained-caddie.mjs`, `test-v312-general-caddie.mjs`, `test-stableford-ui.mjs`, `test-v272-definitive-operational-release.mjs`, `test-v274-complete-courses-voice-operations.mjs`, `test-v275-stable-live-voice-turns.mjs`, `test-v276-manual-hole-navigation.mjs`, `test-v277-official-round-corrections.mjs`, `test-v278-card-image-pdf-export.mjs`, `test-v279-local-card-library.mjs`, `test-v280-local-history-insights.mjs`, `test-v281-pwa-installation.mjs`, `test-v284-native-package-generation.mjs`, `test-v290-brand-icons-cleanup.mjs`, `test-v304-homogeneous-registration-actions.mjs`, `test-v305-history-navigation-zero-error.mjs` y `test-v307-match-arrows-format.mjs` | `BUILD/CACHE-V323` | Mantienen sus controles funcionales y exigen el build vigente. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | `MAPA-V323` | Registra la nueva prueba y el total de archivos vigentes. |
| `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` | `DIGEST-V323` | Sella el conjunto exacto de fuentes despu√©s de la correcci√≥n. |
| `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md` | `EVIDENCIA-V323` | Conservan causa, cambio, alcance y criterio de aprobaci√≥n. |

## Registro detallado V322 ¬∑ micr√≥fono sostenido, reapertura y recuperaci√≥n

La evidencia real de iPhone mostr√≥ dos respuestas correctas seguidas de cierre autom√°tico; al tocar nuevamente, `/api/session-grupal` respond√≠a HTTP 200 pero el cliente pod√≠a quedar sin reaccionar. La causa se encontraba en el cierre forzado de tres segundos, la reconstrucci√≥n innecesaria de una conexi√≥n sana y el tratamiento terminal de fallos recuperables. V322 corrige las tres rutas y conserva completa la AI UNIVERSAL ‚àû incorporada simult√°neamente en V321.

| Archivo exacto | Control V322 | Resultado exigido |
|---|---|---|
| `index-grupal.html` | `V322-REAL-SUSTAINED-CONVERSATION` | 30 minutos de inactividad, 24+ turnos, reutilizaci√≥n WebRTC sana, watchdogs visibles y recuperaci√≥n sin silencio. |
| `api/research.js` | `RESEARCH-RECOVERY-40S` | Timeout, error upstream y respuesta vac√≠a regresan HTTP 200 con explicaci√≥n utilizable. |
| `service-worker.js` | `gscg-mobile-v322-real-sustained-conversation` | Reemplaza la copia V321 instalada. |
| `test-v322-real-sustained-caddie.mjs` | `24-TURNS / SUCCESS / TIMEOUT / UPSTREAM` | Prueba el contrato completo nuevo y las rutas de recuperaci√≥n. |
| `test-v321-ai-universal-infinity.mjs` | `200/200-REGRESSION` | Conserva voz, texto, contexto, Web y 200 √°reas sin lista cerrada. |
| `test-v312-general-caddie.mjs` | `VOICE-REGRESSION` | Conserva clima, score, conversaci√≥n, interrupci√≥n y nueva duraci√≥n. |
| `audit-project.mjs` | `AUDIT-V322` | Ejecuta V322 dentro de toda la bater√≠a antes de construir. |
| `test-stableford-ui.mjs`, `test-v272-definitive-operational-release.mjs`, `test-v274-complete-courses-voice-operations.mjs`, `test-v275-stable-live-voice-turns.mjs`, `test-v276-manual-hole-navigation.mjs`, `test-v277-official-round-corrections.mjs`, `test-v278-card-image-pdf-export.mjs`, `test-v279-local-card-library.mjs`, `test-v280-local-history-insights.mjs`, `test-v281-pwa-installation.mjs`, `test-v284-native-package-generation.mjs`, `test-v290-brand-icons-cleanup.mjs`, `test-v304-homogeneous-registration-actions.mjs`, `test-v305-history-navigation-zero-error.mjs` y `test-v307-match-arrows-format.mjs` | `BUILD/CACHE-V322` | Mantienen sus controles funcionales y reconocen la publicaci√≥n vigente. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | `MAPA-V322` | Registra la prueba y el corte vigente. |
| `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` | `DIGEST-V322` | Sella fuentes y tres PDF regenerados con los mismos nombres. |
| `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md` | `EVIDENCIA-V322` | Conservan causa, correcci√≥n, alcance y pruebas. |

## Registro detallado V321 ¬∑ AI UNIVERSAL ‚àû

La comunicaci√≥n universal deja de depender de ejemplos tem√°ticos: una API de modelo avanzado atiende cualquier consulta permitida, mantiene contexto temporal, consulta la Web cuando el dato cambia y separa autom√°ticamente las √≥rdenes de Golf Score Card GT. La voz detecta el idioma, el texto comparte el mismo hilo y el usuario dispone de cinco controles. El Manual mantiene portada, orden y 74 p√°ginas f√≠sicas.

Control visual final: `manual.html` identifica la p√°gina 73 como **AI UNIVERSAL ‚àû** y `test-v321-ai-universal-infinity.mjs` exige ese mismo nombre.

| Archivo exacto | C√≥digo V321 | Contenido verificado |
|---|---|---|
| `api/universal-ai.js` | `V321-AI-API` | Responses API, modelo avanzado, Web, fuentes, contexto, seguridad y privacidad sin almacenamiento del proveedor. |
| `api/session-grupal.js` | `V321-LANGUAGE-AUTO` | Transcripci√≥n Realtime sin candado de idioma y espa√±ol predeterminado. |
| `index-grupal.html` | `V321-AI-UNIVERSAL-INFINITY` | UI AI ‚àû, voz/texto, historial temporal, respuesta escrita, clasificaci√≥n, contexto y controles. |
| `service-worker.js` | `gscg-mobile-v321-ai-universal-infinity` | Renovaci√≥n del shell PWA. |
| `audit-project.mjs` | `AUDIT-V321` | Ejecuta la prueba V321 dentro de la auditor√≠a maestra. |
| `test-v321-ai-universal-infinity.mjs` | `200/200` | Prueba los 200 temas, temas futuros, API, Web, contexto, controles y rutas locales. |
| `test-v267-one-operational-line.mjs` | `V321-AUTO-LANG` | Contrato operativo Realtime actualizado. |
| `test-v271-realtime-prompt-limit.mjs` | `V321-AUTO-LANG` | L√≠mite de prompt y transcripci√≥n autom√°tica. |
| `test-v312-general-caddie.mjs` | `V321-REGRESSION` | Conversaci√≥n, idioma, micr√≥fono, Web, clima, interrupci√≥n y cierre. |
| `test-stableford-ui.mjs` | `BUILD-V321` | Identificador de build vigente. |
| `test-v272-definitive-operational-release.mjs` | `BUILD-V321` | Identificador de build vigente. |
| `test-v274-complete-courses-voice-operations.mjs` | `BUILD-V321` | Identificador de build vigente. |
| `test-v275-stable-live-voice-turns.mjs` | `BUILD-V321` | Identificador de build vigente. |
| `test-v276-manual-hole-navigation.mjs` | `BUILD-V321` | Identificador de build vigente. |
| `test-v277-official-round-corrections.mjs` | `BUILD-V321` | Identificador de build vigente. |
| `test-v278-card-image-pdf-export.mjs` | `BUILD-V321` | Identificador de build vigente. |
| `test-v279-local-card-library.mjs` | `BUILD-V321` | Identificador de build vigente. |
| `test-v280-local-history-insights.mjs` | `BUILD-V321` | Identificador de build vigente. |
| `test-v281-pwa-installation.mjs` | `CACHE-V321` | Cach√© PWA vigente. |
| `test-v284-native-package-generation.mjs` | `BUILD-V321` | Build web del paquete nativo. |
| `test-v290-brand-icons-cleanup.mjs` | `BUILD-V321` | Identificador de build vigente. |
| `test-v304-homogeneous-registration-actions.mjs` | `BUILD-V321` | Identificador de build vigente. |
| `test-v305-history-navigation-zero-error.mjs` | `BUILD-V321` | Identificador de build vigente. |
| `test-v307-match-arrows-format.mjs` | `BUILD-V321` | Identificador de build vigente. |
| `GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md` | `MANUAL-3.69` | Especificaci√≥n completa y l√≠mites honestos de AI UNIVERSAL ‚àû. |
| `MANUAL_COBERTURA_FUNCIONAL_V311.md` | `PAGE-73` | Mapeo de funci√≥n, recuperaci√≥n y prueba. |
| `docs/manual/v311/manual-pages-17-35.json` | `PAGE-73-V321` | Explicaci√≥n sencilla de voz, texto, orden/pregunta y continuidad. |
| `scripts/update-manual-page-73.py` | `PDF-V321` | Reemplaza s√≥lo la √∫ltima p√°gina y conserva portada y p√°ginas 01-72. |
| `docs/manual/v311/page-73.png` | `4K-2160x4320` | Render final verificado sin recortes. |
| `docs/manual/v311/Manual_Golf_Score_Card_GT_COMPLETO.pdf` | `74-PAGES-V321` | Portada primero, p√°ginas 01-73 y marcadores internos. |
| `docs/manual/v311/Manual_de_Funciones_Golf_Score_Card_GT_01-16.pdf` | `74-PAGES-V321` | Alias completo sincronizado. |
| `test-v311-manual-semantic-coverage.mjs` | `MANUAL-V321` | Bloquea p√©rdida de la explicaci√≥n y controles. |
| `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` | `SOURCE-LOCK-V321` | Digest y cantidad de fuentes activas V321. |

## Golf Score Card GT

Inventario consolidado al corte **V314 ¬∑ 25 de agosto de 2026**, con **295 archivos activos rastreados en Git**. Las nueve p√°ginas visuales conservan la fotograf√≠a original de los 160 archivos activos al cierre de V292; las secciones posteriores incorporan, sin borrar ese antecedente, todos los cambios posteriores. Cada l√≠nea incluye:

> **CORTE DE REVISI√ìN SOLICITADO:** desde la **l√≠nea 160 hacia abajo** se considera contenido nuevo para revisi√≥n.

- nombre exacto del archivo;
- ID o c√≥digo √∫nico;
- explicaci√≥n sencilla de lo que contiene.

### P√°gina 1 de 9

![ROADMAP A DETALLE ¬∑ P√°gina 1](ROADMAP_IMAGES/ROADMAP_A_DETALLE_01.png)

### P√°gina 2 de 9

![ROADMAP A DETALLE ¬∑ P√°gina 2](ROADMAP_IMAGES/ROADMAP_A_DETALLE_02.png)

### P√°gina 3 de 9

![ROADMAP A DETALLE ¬∑ P√°gina 3](ROADMAP_IMAGES/ROADMAP_A_DETALLE_03.png)

### P√°gina 4 de 9

![ROADMAP A DETALLE ¬∑ P√°gina 4](ROADMAP_IMAGES/ROADMAP_A_DETALLE_04.png)

### P√°gina 5 de 9

![ROADMAP A DETALLE ¬∑ P√°gina 5](ROADMAP_IMAGES/ROADMAP_A_DETALLE_05.png)

### P√°gina 6 de 9

![ROADMAP A DETALLE ¬∑ P√°gina 6](ROADMAP_IMAGES/ROADMAP_A_DETALLE_06.png)

### P√°gina 7 de 9

![ROADMAP A DETALLE ¬∑ P√°gina 7](ROADMAP_IMAGES/ROADMAP_A_DETALLE_07.png)

### P√°gina 8 de 9

![ROADMAP A DETALLE ¬∑ P√°gina 8](ROADMAP_IMAGES/ROADMAP_A_DETALLE_08.png)

### P√°gina 9 de 9

![ROADMAP A DETALLE ¬∑ P√°gina 9](ROADMAP_IMAGES/ROADMAP_A_DETALLE_09.png)

## Referencias completas

- [ROADMAP OVERALL](ROADMAP_OVERALL.md)
- [Mapa maestro de archivos](CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md)
- [Mapa de infraestructura](CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_INFRAESTRUCTURA.md)
- [Inventario de publicaciones Vercel](CONTROL_PROYECTO_SCIRE/INVENTARIO_DESPLIEGUES_VERCEL.md)

Este archivo permanece como entrada directa y amigable al directorio detallado del proyecto.

## Continuaci√≥n del directorio ¬∑ Corte nuevo desde la l√≠nea 160

| L√≠nea | Nombre exacto | ID o c√≥digo | Qu√© contiene |
|---:|---|---|---|
| 160 | `verify-manual-sync.mjs` | `8042010c6b0cd81915a57a8ac65d1f778bea7cc7` | Primera l√≠nea del corte nuevo solicitado; comprueba la sincronizaci√≥n entre el manual y la aplicaci√≥n. |
| 161 | `ROADMAP_IMAGES/README.md` | `693f74b22cd9b885b473288f36c8437539429485` | √çndice de todas las im√°genes detalladas. |
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
| 175 | `ROADMAP_IMAGES/ROADMAP_A_DETALLE_01.png` | `2377b6bba6c886a2fddac44b2d01fbc7ebf3f0ca` | P√°gina 1 de 9 del directorio visual. |
| 176 | `ROADMAP_IMAGES/ROADMAP_A_DETALLE_02.png` | `ba0d741c811283d33e53431b9a90cf3055a97bed` | P√°gina 2 de 9 del directorio visual. |
| 177 | `ROADMAP_IMAGES/ROADMAP_A_DETALLE_03.png` | `feb9f2f6ebab3b7321f6e741fb5c6886625cb0d7` | P√°gina 3 de 9 del directorio visual. |
| 178 | `ROADMAP_IMAGES/ROADMAP_A_DETALLE_04.png` | `8b1240dce80a451ff2274708317a303c220c2133` | P√°gina 4 de 9 del directorio visual. |
| 179 | `ROADMAP_IMAGES/ROADMAP_A_DETALLE_05.png` | `3277fc72250970281438c00eb11f1e29a2ffaf4f` | P√°gina 5 de 9 del directorio visual. |
| 180 | `ROADMAP_IMAGES/ROADMAP_A_DETALLE_06.png` | `0aa2913da74c26c396e114d9958f3d06e7f296b0` | P√°gina 6 de 9 del directorio visual. |
| 181 | `ROADMAP_IMAGES/ROADMAP_A_DETALLE_07.png` | `f29b846a85639291b546149fe3a819b1bca23115` | P√°gina 7 de 9 del directorio visual. |
| 182 | `ROADMAP_IMAGES/ROADMAP_A_DETALLE_08.png` | `50bb1bbb190bcee92bcecccc576d61bf2f89f44a` | P√°gina 8 de 9 del directorio visual. |
| 183 | `ROADMAP_IMAGES/ROADMAP_A_DETALLE_09.png` | `2375cd4734decbc33ea9e778d9ae292e19dacd34` | P√°gina 9 de 9 del directorio visual. |
| 184 | `.github/workflows/roadmap-gate.yml` | `2b0e0640e36c07e343f06414a9d2d703727237bb` | Candado autom√°tico que bloquea cambios no registrados. |
| 185 | `scripts/roadmap-gate.mjs` | `94694d94a956dc7a62fb17697447f5fb4916617c` | Comprueba que toda modificaci√≥n aparezca en ambos ROADMAPS. |

## Registro obligatorio de la modificaci√≥n V294

| Archivo modificado | ID o c√≥digo actualizado | Explicaci√≥n sencilla |
|---|---|---|
| `.github/workflows/ios-build.yml` | `8a61450069cd4ec9297204841a70788ae1f4ad0f` | La construcci√≥n de iPhone se detiene si faltan los dos ROADMAPS. |
| `.github/workflows/ios-testflight.yml` | `b67cfeef9a79cc4b419accece846a7e334a27636` | La preparaci√≥n para TestFlight se detiene si faltan los dos ROADMAPS. |
| `.github/workflows/mobile-native-package.yml` | `ee0d6b5b72cfab49646b58a764dcb8d585c88ee5` | El paquete Apple/Android tambi√©n se detiene si faltan los ROADMAPS. |
| `.github/workflows/roadmap-gate.yml` | `2b0e0640e36c07e343f06414a9d2d703727237bb` | Ejecuta autom√°ticamente el candado en GitHub. |
| `.github/workflows/stableford-tournament-pass.yml` | `df70cf36092ddd72b59271bf241b1ac58fb21027` | Las pruebas principales de Stableford se detienen si faltan los dos ROADMAPS. |
| `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/DIRECTRICES_MANDATORIAS.md` | `be454f43b458670199a7be029abf716dc49108d7` | Guarda la norma permanente, el punto de corte y la hora. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Se genera con este mismo mapa | Registra los archivos nuevos y los c√≥digos actualizados. |
| `audit-project.mjs` | `597a19619b0c7f64e8d6963f0d28ab02a329f6cf` | Toda comprobaci√≥n maestra empieza ejecutando el candado. |
| `package.json` | `a9ffec0ea56adb2998235b502fd71ed092b13bb0` | Agrega el bot√≥n t√©cnico `roadmap:gate`. |
| `scripts/roadmap-gate.mjs` | `94694d94a956dc7a62fb17697447f5fb4916617c` | Revisa los archivos cambiados contra ambos ROADMAPS. |

## Registro obligatorio del refuerzo t√©cnico V295

| Archivo modificado | ID o c√≥digo actualizado | Explicaci√≥n sencilla |
|---|---|---|
| `vercel.json` | `7915a87799ed0549f7ef1f4f40a46ad719a922eb` | Vercel debe ejecutar el candado antes de publicar. |
| `scripts/roadmap-gate.mjs` | `94694d94a956dc7a62fb17697447f5fb4916617c` | Si Vercel no puede identificar los cambios, bloquea la publicaci√≥n por seguridad. |
| `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/DIRECTRICES_MANDATORIAS.md` | `be454f43b458670199a7be029abf716dc49108d7` | Incorpora Vercel a las rutas obligadas a ejecutar el candado. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Se genera con este mismo mapa | Actualiza c√≥digos y explicaciones del refuerzo. |
| `ROADMAP_A_DETALLE.md` | Se genera con este mismo archivo | Registra este refuerzo t√©cnico l√≠nea por l√≠nea. |
| `ROADMAP_OVERALL.md` | Se genera con este mismo archivo | Registra este refuerzo en el resumen general. |

## Registro obligatorio del ajuste de salida V296

| Archivo modificado | ID o c√≥digo actualizado | Explicaci√≥n sencilla |
|---|---|---|
| `vercel.json` | `c6dbbe007a72b62ed141e39aac6128f2dce3eb8b` | Mantiene el candado y se√±ala a Vercel la carpeta final que debe publicar. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Se genera con este mismo mapa | Actualiza el c√≥digo y la explicaci√≥n del ajuste. |
| `ROADMAP_A_DETALLE.md` | Se genera con este mismo archivo | Registra el ajuste dentro del directorio detallado. |
| `ROADMAP_OVERALL.md` | Se genera con este mismo archivo | Registra el ajuste dentro del resumen general. |

## Registro obligatorio de la actualizaci√≥n operativa V297

Autorizaci√≥n: **24 de agosto de 2026**. Alcance: instalar el icono cuadrado cromado 3D con verde ne√≥n muy saturado en todos los formatos Apple, Android y web instalable; adem√°s, reducir 50 % el micr√≥fono visible de registro y mostrar una figura clara de micr√≥fono sin cambiar su funci√≥n.

| Archivo modificado | ID o c√≥digo actualizado | Explicaci√≥n sencilla |
|---|---|---|
| `7B1C43A7-EB8A-43CB-B03E-0CAE9273F2A2.jpeg` | `1c3cdacf565de7b2ce42d57bb416a23c50af1b8e` | Fuente hist√≥rica del logo, ahora con cromado 3D y verde ne√≥n muy saturado. |
| `assets/logo.png` | `376f6237bbdddf4245ecd3da0f080ad5462f8178` | Imagen de 1024 usada para preparar los paquetes Apple y Android. |
| `assets/official-logos/README.md` | Registro V297 | Explica que la versi√≥n cromada 3D es la oficial. |
| `assets/official-logos/golf-score-card-gt-app-store-1024.png` | `376f6237bbdddf4245ecd3da0f080ad5462f8178` | Icono final de 1024 para App Store. |
| `assets/official-logos/golf-score-card-gt-apple-touch-180.png` | `ed44949eeb3aedad2ea1cf806091d216bc5e67e0` | Icono final que ver√° el usuario al instalarla en iPhone o iPad. |
| `assets/official-logos/golf-score-card-gt-google-play-512.png` | `0e85cc6995f9bafefb49dec5a8253aef3db7fffd` | Icono final de 512 para Google Play. |
| `assets/official-logos/golf-score-card-gt-official-master-1254.jpeg` | `1c3cdacf565de7b2ce42d57bb416a23c50af1b8e` | Copia maestra oficial del logo cromado 3D y verde ne√≥n. |
| `assets/official-logos/golf-score-card-gt-pwa-192.png` | `e28cd92c784748a2d4ff02bf3491b96c8121ed94` | Icono peque√±o de la aplicaci√≥n instalable. |
| `assets/official-logos/golf-score-card-gt-pwa-512.png` | `0e85cc6995f9bafefb49dec5a8253aef3db7fffd` | Icono grande de la aplicaci√≥n instalable. |
| `index-grupal.html` | Registro V297 | Reduce 50 % el micr√≥fono visible, conserva su bot√≥n y agrega una figura central clara. |
| `mobile-release.json` | Paquete `297` | Deja preparada la numeraci√≥n m√≥vil de esta versi√≥n. |
| `service-worker.js` | Cach√© `gscg-mobile-v297` | Obliga a descargar los nuevos iconos y retirar la cach√© anterior. |
| `test-v290-brand-icons-cleanup.mjs` | Validaci√≥n V297 | Comprueba los iconos, el paquete m√≥vil y la nueva cach√©. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Se genera con este mismo mapa | Actualiza c√≥digos, tama√±os y explicaciones sencillas. |
| `ROADMAP_A_DETALLE.md` | Se genera con este mismo archivo | Registra toda la actualizaci√≥n a detalle. |
| `ROADMAP_OVERALL.md` | Se genera con este mismo archivo | Registra toda la actualizaci√≥n en el resumen general. |

## Registro obligatorio de la actualizaci√≥n operativa V298

Autorizaci√≥n: **24 de agosto de 2026**. Alcance: cambiar √∫nicamente la explicaci√≥n situada arriba del micr√≥fono para que un usuario nuevo entienda, de izquierda a derecha y sin t√©rminos t√©cnicos, qu√© debe dictar o escribir y cu√°ndo presionar OK.

| Archivo modificado | ID o c√≥digo actualizado | Explicaci√≥n sencilla |
|---|---|---|
| `index-grupal.html` | Registro V298 | Coloca a la izquierda y con letra mayor: DICTA O ESCRIBE, 1-NOMBRE, 2-HDCP, 3-MARCAS, DE CADA JUGADOR y 4-OK. |
| `mobile-release.json` | Paquete `298` | Deja preparada la numeraci√≥n m√≥vil de esta versi√≥n. |
| `service-worker.js` | Cach√© `gscg-mobile-v298` | Hace que la aplicaci√≥n descargue la gu√≠a nueva y retire la pantalla anterior. |
| `test-v290-brand-icons-cleanup.mjs` | Validaci√≥n V298 | Comprueba el contenido, orden, alineaci√≥n y tama√±o de la gu√≠a. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Se genera con este mismo mapa | Actualiza c√≥digos, tama√±os y explicaciones sencillas. |
| `ROADMAP_A_DETALLE.md` | Se genera con este mismo archivo | Registra V298 a detalle. |
| `ROADMAP_OVERALL.md` | Se genera con este mismo archivo | Registra V298 en el resumen general. |

## Registro obligatorio de la correcci√≥n operativa V299

Solicitud: **24 de agosto de 2026**. Alcance: corregir exclusivamente el logo superior que se ve√≠a agrandado en la aplicaci√≥n instalada en iPhone. Se conserva sin cambios la gu√≠a para newbies y el micr√≥fono aprobado.

| Archivo modificado | ID o c√≥digo actualizado | Explicaci√≥n sencilla |
|---|---|---|
| `index-grupal.html` | Registro V299 | Evita que el logo sea m√°s ancho que su recuadro y deja libre la barra superior del iPhone. |
| `mobile-release.json` | Paquete `299` | Deja preparada la numeraci√≥n m√≥vil de esta correcci√≥n. |
| `service-worker.js` | Cach√© `gscg-mobile-v299` | Hace que la aplicaci√≥n descargue la correcci√≥n y retire la pantalla anterior. |
| `test-v290-brand-icons-cleanup.mjs` | Validaci√≥n V299 | Comprueba que el logo use 100 % m√°ximo y respete el espacio seguro superior. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Se genera con este mismo mapa | Actualiza c√≥digos, tama√±os y explicaciones sencillas. |
| `ROADMAP_A_DETALLE.md` | Se genera con este mismo archivo | Registra V299 a detalle. |
| `ROADMAP_OVERALL.md` | Se genera con este mismo archivo | Registra V299 en el resumen general. |

## Registro obligatorio de la documentaci√≥n operativa V300

Solicitud: **24 de agosto de 2026**. Alcance: crear un compendio final, b√°sico y amigable para que el consumidor conozca las funciones reales disponibles sin t√©rminos de ingenier√≠a ni promesas de capacidades todav√≠a pendientes.

| Archivo modificado o nuevo | ID o c√≥digo actualizado | Explicaci√≥n sencilla |
|---|---|---|
| `COMPENDIO_FINAL_FUNCIONES_USUARIO.md` | Documento V300 | Explica c√≥mo usar inicio, campos, modalidades, jugadores, scores, tarjetas, historial, correcciones, respaldo e instalaci√≥n. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Se genera con este mismo mapa | Incorpora el documento nuevo al directorio completo. |
| `ROADMAP_A_DETALLE.md` | Se genera con este mismo archivo | Guarda V300 a detalle. |
| `ROADMAP_OVERALL.md` | Se genera con este mismo archivo | Guarda V300 en el resumen general. |

## Registro obligatorio de la actualizaci√≥n operativa V301

Solicitud: **24 de agosto de 2026**. Alcance: mostrar claramente la ruta normal, renombrar la tarjeta r√°pida y convertir el registro y la descripci√≥n de torneo en opciones expresamente identificadas como opcionales.

| Archivo modificado | ID o c√≥digo actualizado | Explicaci√≥n sencilla |
|---|---|---|
| `index-grupal.html` | Registro V301 | Muestra RONDA NORMAL, STABLEFORD y SCORE CARD - PR√ÅCTICA; adem√°s guarda la descripci√≥n opcional del torneo. |
| `COMPENDIO_FINAL_FUNCIONES_USUARIO.md` | Documento actualizado V301 | Explica al consumidor los nuevos nombres y el dato opcional. |
| `mobile-release.json` | Paquete `301` | Deja preparada la numeraci√≥n m√≥vil de esta actualizaci√≥n. |
| `service-worker.js` | Cach√© `gscg-mobile-v301` | Obliga a descargar la pantalla V301 y retirar la anterior. |
| `test-v290-brand-icons-cleanup.mjs` | Validaci√≥n V301 | Comprueba nombres, orden, campo opcional, paquete y cach√©. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Se genera con este mismo mapa | Actualiza c√≥digos y explicaciones sencillas. |
| `ROADMAP_A_DETALLE.md` | Se genera con este mismo archivo | Registra V301 a detalle. |
| `ROADMAP_OVERALL.md` | Se genera con este mismo archivo | Registra V301 en el resumen general. |

## Registro obligatorio de la actualizaci√≥n operativa V302

Solicitud: **24 de agosto de 2026**. Alcance: hacer que el registro Stableford use la misma l√≠nea gr√°fica y descriptiva que la Score Card General, sin modificar el motor de voz ni las reglas de la modalidad.

| Archivo modificado | ID o c√≥digo actualizado | Explicaci√≥n sencilla |
|---|---|---|
| `stableford.j
# V407-R2 ¬∑ Pantalla 3 ¬∑ tarjeta de puntuaci√≥n y acciones ¬∑ 08 de septiembre de 2026

- Archivo `index-grupal.html`: se agreg√≥ `scorecard-stage-title` con `TARJETA DE PUNTUACI√ìN` y la gu√≠a `DESLIZA PARA VER TODOS LOS HOYOS`; `card-shell` recibe borde premium, radios inferiores, fondo negro y scrollbar verde de la familia visual original.
- Archivo `index-grupal.html`: la tabla mantiene c√°lculos, celdas, entrada manual y desplazamiento; no se cambi√≥ el escritor oficial ni el motor de score.
- Archivo `index-grupal.html`: acciones principales permanecen en matriz 2√ó2, `NUEVA RONDA` ocupa el ancho completo y `ATR√ÅS / BORRAR TODO / + JUGADOR` comparten tres columnas iguales.
- Archivo `test-v407-r1-premium-visual-system.mjs`: valida literalmente la nueva estructura y rechaza cambios de paleta en la tarjeta.
- Rollback: regresar al commit anterior de `lab/premium-ui-v407`; Producci√≥n no se modifica.

# V407-R6 ¬∑ Contrato cruzado Universales ¬∑ 08 de septiembre de 2026

- `index-grupal.html`, `live-control.js` y `live-hub.js`: el nombre activo de la modalidad general pasa a **MEDAL PLAY NORMAL**, sin alterar c√°lculo ni persistencia.

- `CONTROL_PROYECTO_SCIRE/COORDINACION_V407_R6_UNIVERSALES.md`: fija ramas, propietarios de archivos, contrato de snapshot, vistas reservadas y orden √∫nico de integraci√≥n.
- La conversaci√≥n Universales implementa √∫nicamente motor, reglas, pruebas y adaptador; no altera el shell gr√°fico.
- La conversaci√≥n de auditor√≠a controla sistema gr√°fico, Score Card, Tarjeta Digital Global/Personal, exportaci√≥n WhatsApp y evidencia f√≠sica.
- APP-22/23 cambian de DOTS a UNIVERSALES; CARD-09/10 ser√°n Global/Personal Universales. Debe existir prueba negativa que impida conservar DOTS activo en botones, configuraci√≥n, resultados, Score Cards, Tarjeta Digital, Historial y Manual.
- `test-v407-r6-universales-coordination.mjs`: verifica sustituci√≥n, IDs, contrato de 12 puntos, marca y congelamiento de Producci√≥n.
- `universales.js`: fuente √∫nica del reparto. Tres jugadores usan 6‚Äì4‚Äì2; cuatro usan 6‚Äì4‚Äì2‚Äì0. Los empates promedian exactamente los puestos ocupados y cada hoyo suma 12.
- `index-grupal.html`: reemplaza el bot√≥n/configuraci√≥n visible DOTS por UNIVERSALES; exige 3 o 4 jugadores; reutiliza campo, torneo, categor√≠a, handicap, marcas, voz, control manual, persistencia, recuperaci√≥n, tarjeta y acciones comunes; agrega fila PUNTOS y acumulados IN/OUT/TOTAL.
- `card-library.js`: reconoce y filtra snapshots `universales` sin convertirlos en General.
- `card-artifacts.js`: crea Tarjeta Global y Personal Universales, muestra G/N/P, IN/OUT/TOTAL y deja de generar el panel DOTS.
- `scripts/build-mobile-web.mjs`: copia `universales.js` al paquete m√≥vil nativo/offline.
- `api/live.js` y `live-hub.js`: aceptan la modalidad en snapshots y la muestran como UNIVERSALES en Torneo LIVE.
- `live-control.js` y `live-view.js`: publican y muestran puntos Universales por hoyo y acumulados; el ranking del Centro LIVE usa mayor puntaje.
- `database/005_live_tournament_mode.sql` y `api/live.js`: cada torneo anual o eventual guarda su modalidad y rechaza Score Cards de otra modalidad.
- `voice-assistant.js` e `index-grupal.html`: ‚ÄúQuiero jugar Universales‚Äù abre el registro com√∫n con 3 o 4 jugadores.
- `service-worker.js`: release/cach√© `V407-R6-UNIVERSALES-20260908` e inclusi√≥n offline de `universales.js`.
- `test-v407-r6-universales.mjs`: cubre todos los patrones 3/4, resultados incompletos, cantidades inv√°lidas, caso Jaime/Carlos/Miguel/Roberto 5‚Äì5‚Äì1‚Äì1, ausencia de bot√≥n/configuraci√≥n DOTS y recorridos comunes.
- `test-v311-voice-assistant.mjs`, `test-round-information.mjs` y `test-v261-registration-stableford-modality.mjs`: reconocen la navegaci√≥n y el resumen Universales sin debilitar modalidades existentes.
- `test-v406-r23-visible-version.mjs`: exige `V407 ¬∑ R6` en el identificador visible de actualizaci√≥n.
- `test-v260-round-points-player-return.mjs`: reconoce la ret√≠cula m√≥vil R5A sin modificar su comportamiento.
- `test-v405-registration-clear-final-mobile.mjs`: conserva BORRAR TODO y exige que UNIVERSALES comparta el Control Manual.
- `test-v407-r1-premium-visual-system.mjs`: conserva la geometr√≠a R5 y reconoce √∫nicamente el identificador R6.
- `test-v330-side-games.mjs`: contin√∫a probando el c√°lculo hist√≥rico DOTS sin permitir bot√≥n, configuraci√≥n ni nueva activaci√≥n; Skins, Wolf y Vegas conservan su matriz completa.
- `test-v307-match-arrows-format.mjs`: mantiene el contrato Match Play e incorpora el r√≥tulo UNIVERSALES en Informaci√≥n de Ronda.
- `test-v329-skins.mjs`: mantiene intacto Skins y verifica que el selector lateral ahora contenga UNIVERSALES.
- `test-v365-active-round-empty-recovery.mjs`, `test-v406-r2-professional-design.mjs`, `test-v406-r4-mobile-controls.mjs` y `test-v406-r5-simple-tournament-live.mjs`: conservan sus verificaciones funcionales/visuales y avanzan √∫nicamente el identificador a R6.
- `audit-project.mjs`: ejecuta los dos bancos R6 antes del motor Gross/Neto/HCP y bloquea cualquier publicaci√≥n si fallan.
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`: incorpora el motor, adaptador, controles y propiedad cruzada R6.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`: registra 431 fuentes y los SHA-256 de los tres inventarios regenerados.
- No se toca `main`; rollback: retirar el commit de coordinaci√≥n de `lab/v407-r6-universales`.

# V407-R5 ¬∑ Auditor√≠a visual f√≠sica completa ¬∑ inventario y primera correcci√≥n ¬∑ 08 de septiembre de 2026

- `INVENTARIO_PANTALLAS_ESTADOS_V407_R5.md`: 67 IDs √∫nicos para Principal/Juegos, Asistencia, Tarjetas, Historial, Cuenta/Sistema, Torneo Live, Artefactos, Manual y adaptaci√≥n transversal.
- `MATRIZ_AUDITORIA_VISUAL_V407_R5.md`: diez criterios medibles; 9 FAIL f√≠sicos iniciales y 58 pendientes, sin convertir pruebas de c√≥digo en aprobaci√≥n visual.
- `card-artifacts.js`: nuevo shell m√≥vil premium; SHA-256 con corte seguro, metadatos responsive y tabla Stableford Global dividida en dos mitades legibles.
- `test-v407-r5-visual-inventory.mjs`: bloquea conteo, unicidad, criterios y contadores.
- `test-card-artifacts.mjs`: bloquea SHA contenido y secuencia IN/OUT en Global y seis personales.
- `audit-project.mjs`: ejecuta obligatoriamente `test-v407-r5-visual-inventory.mjs`; total esperado 123 paquetes.
- `index-grupal.html` y `service-worker.js`: candidato visible/cach√© V407-R5.
- Evidencia real existente: `IMG_3125` APP-04/05 FAIL; `IMG_3126` APP-29/SAFE-02 FAIL; `IMG_3123` CARD-03/SAFE-03 FAIL; `IMG_3120`‚Äì`IMG_3122` APP-41/SAFE-01 FAIL hist√≥rico.
- Evidencia Chrome R1: viewport 1363√ó936, documento 1348√ó2003 y cero overlay visible; sirve como medici√≥n de escritorio, no como aprobaci√≥n m√≥vil R5.
- Rollback: revertir √∫nicamente el commit R5 de `lab/premium-ui-v407`. Producci√≥n/main no cambia.
- Transporte GitHub/Vercel: `ca1a13a` fue rechazado porque el Base64 de `index-grupal.html` qued√≥ truncado; `bb21de0` repuso 805,296 bytes y √°rbol `9c2fa1ce965198848f360bfa6a6424150b3da6c4`, id√©ntico al commit local R5. El segundo build super√≥ Gate, Intocables y Manual visual, pero ROADMAP rechaz√≥ correctamente que el commit reparador no estuviera anotado en ambos archivos; este rengl√≥n cierra esa trazabilidad para el nuevo intento.
- Rutas exactas auditadas: `CONTROL_PROYECTO_SCIRE/AUDITORIA_VISUAL_V407/INVENTARIO_PANTALLAS_ESTADOS_V407_R5.md` y `CONTROL_PROYECTO_SCIRE/AUDITORIA_VISUAL_V407/MATRIZ_AUDITORIA_VISUAL_V407_R5.md`.
- `index-grupal.html`: `#roundManualEntry` usa `width/max-width:100%`, `min-width:0` y `overflow:hidden`; en m√≥vil `.round-player-grid` suma 325 px √∫tiles y cada etiqueta puede cortar palabras largas. Las acciones de Tarjeta Digital miden 52 px con fuente 10 px en ambas capas heredadas.
- `test-v407-r1-premium-visual-system.mjs`: exige contenci√≥n m√≥vil, ret√≠cula compacta y botones legibles; APP-04/05 y APP-29/30 siguen pendientes de nueva evidencia f√≠sica R5.
- `service-worker.js`, `index-grupal.html`, `test-v365-active-round-empty-recovery.mjs`, `test-v406-r2-professional-design.mjs`, `test-v406-r4-mobile-controls.mjs`, `test-v406-r5-simple-tournament-live.mjs`, `test-v406-r23-visible-version.mjs` y `test-v407-r1-premium-visual-system.mjs`: release/cach√© `V407-R5A-MOBILE-GRIDS-20260908` sincronizado.
- `index-grupal.html`: APP-32‚Äì37 reciben √°rea segura superior/inferior, paneles contenidos, filtros m√≥viles en una columna, entradas del Historial en dos filas, paginaci√≥n sin desbordamiento, confirmaci√≥n destructiva apilada y cinco consultas r√°pidas sim√©tricas.
- `test-v407-r5a-history-visual-system.mjs`: bloquea la geometr√≠a premium de Historial y Estad√≠sticas en escritorio e iPhone; `audit-project.mjs` lo incorpora como paquete 124. La aprobaci√≥n f√≠sica contin√∫a pendiente y no se infiere del PASS autom√°tico.
- `test-v260-round-points-player-return.mjs`: sustituye la expectativa obsoleta `78/44/66/47 px` por la ret√≠cula R5A `70/36/58/40 px`; el deployment `dpl_8SSK4fASsW8PBGnPasaK7gP8gT37` evidenci√≥ el fallo y fue rechazado antes de mover el alias LAB.
# V407-R14 ¬∑ Actualizaci√≥n manual permanente y tarjetas seguras ¬∑ 08 de septiembre de 2026

- Rama √∫nica: `codex/v407-r14-safe-update-cards`, nacida de `main` R10 despu√©s de sincronizar y rechazar el HTML truncado de R13.
- `index-grupal.html`: ACTUALIZAR permanece verde, parpadeante y habilitado; cada toque conserva la ronda, limpia workers/cach√©s y recarga el release publicado.
- `service-worker.js`: release y cach√© avanzan juntos a `V407-R14-PERSISTENT-MANUAL-UPDATE-20260908`.
- `card-artifacts.js`: categor√≠a opcional peque√±a arriba del nombre en tarjetas Global/Personal; si no existe, no se inventa. Universales muestra leyenda y puntos por hoyo/totales en rojo.
- `scripts/card-audit-fixtures.mjs` y `test-card-artifacts.mjs`: diez tarjetas reproducibles y candados de categor√≠as/puntos.
- Pruebas V365/V406/V407: sincronizadas con R14 y con el estado visible permanente.
- Producci√≥n permanece intacta hasta auditor√≠a integral y navegador real sin FAIL.
- Preview R14 reparado: `index-grupal.html` se publica completo (812,277 bytes); el despliegue previo con blob vac√≠o queda rechazado.
- Cierre R14: ambos ROADMAPS y `INVENTARIOS_V311.lock.json` se sellan juntos para el build final.
- Publicaci√≥n R15: corrige exclusivamente el estado remoto del bot√≥n ACTUALIZAR.
- Prueba R15: detector, limpieza de cach√©, recarga y estado final sin parpadeo quedan sellados.
- R16: `syncDraftModeSelection` reconoce Universales y su bot√≥n recibe el mismo estado verde exclusivo.
- R17: `index-grupal.html` renderiza `player-category` s√≥lo cuando existe `tournamentCategory`, colorea toda `universales-row` en rojo y hace que `manualRowHasData` ignore categor√≠a/marcas sin nombre ni handicap. `test-v407-r9-manual-update.mjs` bloquea las cuatro condiciones.
- Reparaci√≥n de transporte R17: el blob completo de `index-grupal.html` reemplaza el env√≠o Base64 truncado; ambos ROADMAPS y el sello se actualizan en el mismo commit reparador.
- LAB posterior a R17: `index-grupal.html` a√±ade totales Universales rojos y corrige la ret√≠cula m√≥vil superior; `live-view.js` identifica fila/total de puntos y `live.html` los presenta en rojo. MAIN/Producci√≥n no cambia.
- Reparaci√≥n documental R18: ambos ROADMAPS nombran literalmente `live.html`; el build anterior qued√≥ bloqueado y Producci√≥n permaneci√≥ en R17.
# R19 ¬∑ Enlace invitado individual de un solo uso ¬∑ 09 de septiembre de 2026

- `api/_lib/app-access.js`: incorpora `redeemGuestToken`, cuyo `UPDATE` exige `opened_at IS NULL` y consume el token en una sola operaci√≥n at√≥mica.
- `api/app-access.js`: el canje usa exclusivamente `redeemGuestToken` y rechaza reutilizaciones.
- `test-r18-owner-guest-24h-access.mjs`: simula dos canjes consecutivos; el primero pasa y el segundo devuelve `null`.
- Rollback: volver al commit R18 de LAB. MAIN no se modifica.

# V407-R21 ¬∑ SUPPORT y acceso 24 h cerrados ¬∑ 09 de septiembre de 2026

- `index-grupal.html`: restaura `href="/manual.pdf"` sin `target`, avanza el identificador visible a R21 y agrega `COMPARTIR 24H`, oculto para invitados.
- `service-worker.js`: usa `V407-R21-SUPPORT-ACCESS-20260909`, cach√© propia y entrega `/access.html` directamente desde red.
- `api/app-access.js`: devuelve enlaces sobre `APP_PUBLIC_ORIGIN` o `https://golf-sc-gt-lab.vercel.app`, nunca sobre una URL temporal de deployment.
- `api/_lib/app-access.js`: `redeemGuestToken` exige `opened_at IS NULL`; s√≥lo el primer canje obtiene acceso.
- `test-v311-live-support-link.mjs`: prueba negativa contra `target="_blank"`; `test-r18-owner-guest-24h-access.mjs`: primer canje aceptado y segundo rechazado.
- Pruebas de release V365/V406/V407 sincronizadas con R21. Rollback: R20 de LAB; MAIN permanece intacta.
- `.github/workflows/hotfix-support-same-screen.yml`: se elimina el disparador temporal de R20 despu√©s de integrar y probar la correcci√≥n permanente R21 en LAB.
- `docs/manual/v311/page-00.png`: fuente gr√°fica de portada resellada al reconstruir el inventario y los PDF del manual accesible desde SUPPORT.
- Reparaci√≥n de build R21: `service-worker.js` conserva expl√≠citamente el marcador aprobado `v407-r18-live-points-header`; `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` registran y sellan la correcci√≥n. El Preview anterior qued√≥ rechazado; MAIN/Producci√≥n no cambia.
- Control maestro preservado: punto de corte `l√≠nea 185`; activaci√≥n: 23 de agosto de 2026, 17:05:00, hora de Guatemala.
- Resello remoto R21: `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` usa el digest del √°rbol Git que audita Vercel; `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md` documentan el mismo cambio. MAIN/Producci√≥n permanece intacta.
- Verificaci√≥n final del resello R21: los tres archivos anteriores se recalculan contra el `HEAD` remoto exacto que usa Vercel; no cambia c√≥digo funcional ni MAIN/Producci√≥n.
- Correcci√≥n f√≠sica R21: `middleware.js` consulta el estado mediante `/api/app-access?action=status` y elimina la importaci√≥n ESM incompatible que causaba `MIDDLEWARE_INVOCATION_FAILED`; ambos ROADMAPS y el sello se actualizan en el mismo commit. MAIN/Producci√≥n no cambia.
- Propietario R21: `api/_lib/app-access.js` fija como identidad exclusiva `jaimekirste@gmail.com` cuando Vercel no define una variable m√°s espec√≠fica; `test-r18-owner-guest-24h-access.mjs` bloquea esa asignaci√≥n. Otros usuarios siguen sin permiso para ver o crear invitaciones.
- R21 enlace protegido contra previsualizadores: `api/app-access.js` entrega el token en fragmento y s√≥lo permite consumirlo mediante POST; `access.html` ejecuta ese POST al abrirlo el invitado y entra inmediatamente; `index-grupal.html` contiene el bot√≥n propietario dentro del ancho m√≥vil. Un GET autom√°tico ya no consume el acceso.
- Cobertura preventiva R21: `test-r18-owner-guest-24h-access.mjs` bloquea el canje por GET y valida fragmento + POST; `test-v311-live-support-link.mjs` exige que INVITAR 24 H permanezca dentro de la barra. La causa y prevenci√≥n quedan asentadas en `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`.
- Cierre remoto R21: `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` se resellan juntos contra el √°rbol exacto del Preview; Producci√≥n permanece intacta.
- Reparaci√≥n de transporte R21: `index-grupal.html` se retransmite √≠ntegro con 818,400 bytes; ambos ROADMAPS y el sello se actualizan en el mismo commit. El build truncado queda rechazado.
- Publicaci√≥n productiva R21: `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` registran el despliegue autorizado en `golf-sc-gt-lab`; el primer intento por `CRON_SECRET` y el commit vac√≠o quedan rechazados sin sustituir R24.

- Correcci√≥n productiva Support sin tocar ACTUALIZAR: `service-worker.js` excluye `/manual.pdf` y `/manual.html` del fallback general hacia la Score Card y entrega `manual.html` por red; `manual.html` monta una sola gr√°fica activa con precarga y sin `IntersectionObserver`. `test-v311-live-support-link.mjs` y `test-v311-manual-hosting.mjs` bloquean el parpadeo y el retorno silencioso. `vercel.json` regenera inventarios antes de la auditor√≠a.

- Portabilidad exclusiva del build: `scripts/rebuild-manual-bets-live-data.py` y `scripts/rebuild-inventory-pdfs.py` usan Bitstream Vera incluida en ReportLab; elimina la dependencia ausente de `/usr/share/fonts` sin modificar ninguna funci√≥n de la aplicaci√≥n ni ACTUALIZAR.

- Regreso directo desde Support: `manual.html` incorpora el bot√≥n superior `‚Üê REGRESAR A MI RONDA`; usa `history.back()` cuando el Manual proviene de la aplicaci√≥n y `location.replace("/index-grupal.html?source=manual-return")` s√≥lo como recuperaci√≥n. `test-v311-manual-hosting.mjs` exige ambos recorridos y la conservaci√≥n de la ronda persistida. ACTUALIZAR no cambia.
# V407-R23A ¬∑ Invitaci√≥n WhatsApp conserva token ¬∑ 09 de septiembre de 2026

- `test-r18-owner-guest-24h-access.mjs`: acepta espacios opcionales en `vercel.json`, porque Vercel lo minifica antes de ejecutar el banco; no cambia la regla validada.
- `api/app-access.js`: genera la invitaci√≥n como `/invite/<token>` en lugar de depender de un par√°metro que WhatsApp elimin√≥ f√≠sicamente.
- `vercel.json`: reescribe `/invite/:token` hacia `access.html` sin mostrar una pantalla intermedia.
- `middleware.js`: permite √∫nicamente el prefijo p√∫blico `/invite/` para que el canje ocurra antes del control propietario.
- `access.html`: extrae el token desde la ruta, lo elimina de la barra y conserva compatibilidad con enlaces anteriores por query o fragmento.
- `test-r18-owner-guest-24h-access.mjs`: exige los cuatro componentes y el canje POST de un solo uso.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`: registra RC-093 con evidencia f√≠sica, causa y control permanente.
- Rollback: commit productivo `73df15f`; LIVE, ACTUALIZAR, Support, score, voz y dem√°s funciones no se modifican.

# V407-R24 ¬∑ WhatsApp, aislamiento visual e √≠ndice del Manual ¬∑ 09 de septiembre de 2026

- `index-grupal.html`: fila WhatsApp m√≥vil de anchura completa, m√≠nimo √∫til de 180 px, üá¨üáπ +502 editable por jugador.
- `index-grupal.html`: ACTUALIZAR, INSTALAR APP y PRO se a√≠slan en overlays est√°ndar, AI, Cuenta e Instalaci√≥n; el lanzador de instalaci√≥n queda en flujo normal y el √°rea invisible del micr√≥fono de campo se limita.
- `manual.html`: ocho secciones tem√°ticas con enlaces `#pagina-XX`, n√∫mero y t√≠tulo; p√°gina 02 localizable por WhatsApp/tel√©fono/Guatemala/+502.
- `service-worker.js`: cach√©/release R24 sincronizado.
- Pruebas modificadas: V311 Manual, V365 recuperaci√≥n, V405 Registro y m√≥vil, V406 R2/R4/R5/R23 y V407 R1/R7/R9.
- Revisi√≥n renderizada 390√ó844: siete modalidades y Registro, Confirmaci√≥n, General, Tarjeta Digital, Historial, Estad√≠sticas, AI, Reglas, Cuenta, Instalaci√≥n y Manual con ancho 390 px y cero traslapes.
- `REGISTRO_REINCIDENCIAS_CALIDAD.md`: RC-094 documenta causa, escape y control permanente.
- Rollback: `73df15f`; score, voz, LIVE y acceso 24 h permanecen funcionalmente intactos.
- Reparaci√≥n de transporte R24: `index-grupal.html` se retransmite completo (830,274 bytes); el intento vac√≠o queda rechazado y no llega a MAIN.
- `test-v311-manual-search.mjs`: exige los ocho grupos, enlaces titulados y t√©rminos WhatsApp/Guatemala/+502.

# V407-R24A ¬∑ control manual de actualizaci√≥n restaurado ¬∑ 09 de septiembre de 2026

- `index-grupal.html`: `body.gsc-setup-open:has(#setupOverlay.visible)` vuelve visible `.mandatory-update` y a√±ade `padding-top` seguro al Registro.
- `service-worker.js`: `v407-r24a-update-visible` / `V407-R24A-UPDATE-VISIBLE-20260909` provoca la detecci√≥n remota sin actualizaci√≥n silenciosa.
- `test-v405-registration-clear-final-mobile.mjs` exige la excepci√≥n visible; pruebas de versi√≥n V365/V406/V407 se sincronizan con R24A.
- Captura renderizada: bot√≥n `left 257`, `top 12`, `right 368`, `bottom 67`; tarjeta `top 90`; cero intersecci√≥n y cero desbordamiento.
- Rollback: commit productivo `2ba83ed`; ninguna funci√≥n de score, WhatsApp, LIVE, Historial, voz o invitaci√≥n cambia.

# V407-R24B ¬∑ puente manual para PWA detenida en R24 ¬∑ 09 de septiembre de 2026

- `service-worker.js`: `approvedNavigationWithManualUpdate(request)` lee el shell aprobado, a√±ade `#gsc-update-recovery` antes de `</head>` y conserva status/headers; la navegaci√≥n normal usa esa respuesta.
- El CSS inyectado s√≥lo aplica en `body.gsc-setup-open:has(#setupOverlay.visible)`: muestra `.mandatory-update` y baja `#setupOverlay` hasta 82 px/√°rea segura.
- No llama `installMandatoryUpdate`, no limpia caches, no recarga y no navega; el propietario conserva el √∫nico toque que instala.
- `index-grupal.html`, release/cach√© y pruebas V365/V405/V406/V407 avanzan a R24B.
- Rollback: `5e45b264`; datos locales, score, LIVE, WhatsApp, Historial, voz y acceso 24 h quedan intactos.
- `scripts/lab-update-browser-review.mjs`: ejecutor Playwright con `launchPersistentContext`; activa cuatro deployments READY consecutivos en el mismo alias LAB, siembra y comprueba ronda/Historial/jugador/score/WhatsApp, detecta ACTUALIZAR, captura antes, toca, espera navegaci√≥n, confirma ACTUALIZADO/release final, captura despu√©s y registra consola, red y geometr√≠a.
- `scripts/lab-update-physical-gate.mjs`: validador independiente del JSON `gscg-lab-update-browser-evidence/v1`; recalcula SHA-256 y rechaza commit, deployment, alias, perfil, transici√≥n, captura o preservaci√≥n inv√°lidos. El nombre hist√≥rico del archivo no cambia la clasificaci√≥n: Playwright es REVISI√ìN AUTOMATIZADA EN NAVEGADOR REAL, nunca revisi√≥n f√≠sica.
- `test-v407-r24-update-physical-gate.mjs`, `package.json` y `audit-project.mjs`: prueba negativa, comandos `update:browser-review` / `update:browser-gate` e integraci√≥n permanente en auditor√≠a.
- `DIRECTRICES_MANDATORIAS.md`, matrices Gate 0 humana/JSON y `REGISTRO_REINCIDENCIAS_CALIDAD.md`: fijan las tres puertas independientes y RC-097. Estado actual: NO REVISADO; la ejecuci√≥n p√∫blica A‚ÜíB‚ÜíC‚ÜíD y el micr√≥fono f√≠sico iPhone siguen pendientes; MAIN/Producci√≥n intacta.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/MATRIZ_GATE_0_PROYECTO.md` y `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/MATRIZ_GATE_0_PROYECTO.json`: rutas literales registradas para el Gate ROADMAP.

# V407-R24C ¬∑ correcci√≥n f√≠sica del encabezado de Historial ¬∑ 09 de septiembre de 2026

- Evidencia de entrada: `IMG_3303.png`, iPhone vertical, muestra `ACTUALIZADO` superpuesto al bot√≥n `ATR√ÅS` de `#cardLibraryOverlay`.
- Causa: `body.gsc-setup-open:has(#setupOverlay.visible) .mandatory-update{display:block!important}` se evaluaba aunque Historial estuviera abierto y anulaba la regla general de aislamiento de overlays.
- `index-grupal.html`: la excepci√≥n pasa a `body.gsc-setup-open:not(.gsc-history-open):has(#setupOverlay.visible)`; Registro conserva ACTUALIZAR y el Historial no hereda el lanzador del fondo.
- `test-v407-r24b-history-update-isolation.mjs`: exige el aislamiento, exige la condici√≥n negativa de Historial y rechaza la antigua regla reincidente.
- `audit-project.mjs`: incorpora el banco como prueba obligatoria de la auditor√≠a maestra.
- `test-v405-registration-clear-final-mobile.mjs`: conserva la obligaci√≥n de mostrar ACTUALIZAR en Registro y a√±ade la exclusi√≥n de Historial a la misma expectativa.
- Estado honesto: FAIL f√≠sico encontrado y corregido en fuente; candidato NO REVISADO hasta comprobar el despliegue LAB p√∫blico. Producci√≥n principal intacta.
- `Inventario_Golf_Score_Card_GT_OVERALL_V311.pdf`, `Inventario_Golf_Score_Card_GT_A_DETALLE_V311.pdf`, `Inventario_Golf_Score_Card_GT_POR_IMAGENES_Y_RUBROS_V311.pdf` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`: regenerados y sellados con 448 fuentes remotas.
- Cierre de transporte remoto: `.github/workflows/apply-r24c-lab.yml` queda eliminado; `index-grupal.html` y este ROADMAP se restauran completos. Los tres inventarios y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` se resellan contra 448 fuentes presentes en el √°rbol LAB sin evidencia local ajena.
- `.github/workflows/apply-r24b-lab.yml`: workflow de transporte temporal creado, ejecutado y eliminado; su eliminaci√≥n queda documentada y el √°rbol final no lo conserva.
# V407-R24D ¬∑ separaci√≥n f√≠sica LIVE / aplicaci√≥n 24 H ¬∑ 10 de septiembre de 2026

- `live-control.js`: `publicAppOrigin()` convierte cualquier dominio temporal del proyecto LAB en `https://golf-sc-gt-lab.vercel.app`; `viewerUrl()` y `hubUrl()` dejan de copiar `_vercel_share`. El receptor abre directamente `live.html`, Score Card LIVE de s√≥lo lectura.
- El acceso `INVITAR ¬∑ 24 H` no se mezcla con LIVE: `api/app-access.js` conserva `/invite/{token}` hacia `index-grupal.html?source=guest24h`, y `middleware.js` mantiene sesi√≥n temporal, aislamiento de almacenamiento, l√≠mites de API, caducidad y revocaci√≥n.
- Pruebas: `test-v406-r22-share-live.mjs` exige dominio p√∫blico y ausencia del bypass de Vercel; `test-r18-owner-guest-24h-access.mjs` vuelve a aprobar el acceso completo con candados. Rollback: revertir s√≥lo este corte R24D; MAIN intacta.
# V407-R24D ¬∑ bot√≥n ACTUALIZAR decisivo y manual ¬∑ 10 de septiembre de 2026

- `index-grupal.html`: release `V407-R24D-MANUAL-UPDATE-20260910`, identificador visible `V407 ¬∑ R24D` y estilo versionado R24D. El detector consulta el HTML publicado sin cach√©; si difiere de R24C habilita `ACTUALIZAR` y el parpadeo. No ejecuta la instalaci√≥n.
- `service-worker.js`: cach√© candidata `v407-r24d-manual-update`; mantiene por separado la cach√© aprobada y no llama `promoteCandidate()` desde `install` ni `activate`. S√≥lo `app_version=V407-R24D-MANUAL-UPDATE-20260910`, generado al tocar el bot√≥n, promueve R24D.
- `test-v365-active-round-empty-recovery.mjs`, `test-v406-r2-professional-design.mjs`, `test-v406-r4-mobile-controls.mjs`, `test-v406-r5-simple-tournament-live.mjs`, `test-v406-r23-visible-version.mjs`, `test-v407-r1-premium-visual-system.mjs`, `test-v407-r7-ios-scroll.mjs` y `test-v407-r9-manual-update.mjs`: exigen interfaz, release y cach√© R24D; el banco visible agrega la prueba negativa que impide una promoci√≥n autom√°tica desde la instalaci√≥n del worker.
- Rollback: restablecer el commit R24C en el alias LAB. `main` y Producci√≥n permanecen congelados e intactos.
- Reparaci√≥n de transporte: el primer blob remoto de `index-grupal.html` lleg√≥ vac√≠o y el build fue rechazado antes de activar LAB. El archivo completo de 830,526 bytes se retransmite junto con `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, cerrando trazabilidad en el mismo commit de publicaci√≥n.

# V407-R25 ¬∑ BORRAR SCORES, h√°ndicap firmado, RESET y autocompletado iPhone ¬∑ 10 de septiembre de 2026

- `index-grupal.html`: a√±ade `#clearScoresOnly`, conserva `#clearRoundScores`, a√±ade `#resetClockButton`, acepta h√°ndicaps enteros firmados y captura del DOM nombre/tel√©fono antes de `OK`.
- `player-registry.js`: preserva h√°ndicaps enteros negativos, cero y positivos en perfiles e historial.
- `live-control.js`: transporta el h√°ndicap firmado al visor LIVE sin recortarlo a 0‚Äì54.
- `service-worker.js` y pruebas de actualizaci√≥n: release/cach√© manual `V407-R25-CONTROLS-20260910`; s√≥lo el propietario lo instala mediante `ACTUALIZAR`.
- `test-v405-registration-clear-final-mobile.mjs` y `test-v407-r25-round-controls.mjs`: prueban la separaci√≥n destructiva, conservaci√≥n de ronda, RESET, h√°ndicap firmado y autocompletado iPhone.
- Rollback: commit Maestro R24D `841a8fc`; Maestro/Producci√≥n no se modifica durante la revisi√≥n LAB.
- `.github/workflows/promote-r24d-lab.yml`: eliminado por ser un transporte temporal fallido y ajeno al candidato R25.
- `test-v287-stableford-back-controls-clear.mjs`: actualizado para exigir la coexistencia ordenada de `BORRAR SCORES` y `BORRAR TODO`, manteniendo ATR√ÅS y + JUGADOR.

# V407-R26 ¬∑ OK sin l√≠mite heredado 0‚Äì54 ¬∑ 10 de septiembre de 2026

- `index-grupal.html`: las dos rutas posteriores al toque de `#setupOk` validan con `Number.isSafeInteger(hcp)`; ya no rechazan cero ni h√°ndicaps negativos.
- `service-worker.js`: candidato manual `V407-R26-OK-HOTFIX-20260910` y cach√© `v407-r26-ok-hotfix`.
- Pruebas versionadas coordinadas a R26; `test-v407-r25-round-controls.mjs` proh√≠be expresamente la condici√≥n residual `hcp<0||hcp>54`.

# V407-R27 ¬∑ avance directo del registro manual ¬∑ 10 de septiembre de 2026

- `#setupOk`: despu√©s de `captureVisibleRegistrationValues()` y validaci√≥n estricta ejecuta `resetSetupCapture(); renderDraft(); showStep2(); speakSetupConfirmation()`.
- Se elimina s√≥lo la llamada de `OK` a `requestSetupFinalize()`; la captura y conversaci√≥n por micr√≥fono no se modifican.
- `test-v407-r25-round-controls.mjs` exige la ruta directa y proh√≠be que `OK` vuelva a depender del finalizador de voz.

# V407-R28 ¬∑ persistencia previa a actualizaci√≥n ¬∑ 10 de septiembre de 2026

- `installMandatoryUpdate()` ejecuta captura DOM, sincronizaci√≥n no destructiva y `persistDraftState()` antes de limpiar cach√©s y recargar.
- Release/cach√©/pruebas avanzan coordinadamente a R28.


## HOTFIX OFICIAL EL PULT√â ¬∑ 10 SEPTIEMBRE 2026

`index-grupal.html` corrige exclusivamente `PULTE_SI_MEN` conforme a la tarjeta f√≠sica oficial: 9,5,7,11,17,3,1,15,13,18,2,8,16,4,6,12,10,14. `service-worker.js` renueva √∫nicamente las cach√©s activa y aprobada para entregar la correcci√≥n sin borrar la ronda. Sin cambios en jugadores, scores, dise√±o, modalidades o dem√°s contenido.

Registro conjunto del despliegue: hotfix `main` commits `481f716` y `c548f30`; matriz verificada como permutaci√≥n exacta 1‚Äì18. Estado f√≠sico posterior al despliegue: pendiente.

- Hotfix Maestro El Pult√© (10 de septiembre de 2026): la regresi√≥n de recuperaci√≥n acepta la identidad exacta del cach√© `v407-r28-pulte-handicap-hotfix`; cambio limitado a handicaps oficiales y entrega, sin alterar scores ni jugadores.

- Seguimiento hotfix: se alinea la expectativa del cach√© aprobado con `approved-pulte-handicap-hotfix`; sin cambios funcionales adicionales.

- Entrega del hotfix: identidad t√©cnica `V407-R28-PULTE-HANDICAP-HOTFIX-20260910` para que instalaciones existentes detecten ACTUALIZAR sin borrar la ronda.
- 2026-09-13 ¬∑ R29: paquete de despliegue validado con el env√≠o digital de iPhone, la prueba de activaci√≥n del toque y el registro de cambios en un mismo commit.


## R30 ¬∑ Env√≠o PNG validado en iPhone ¬∑ 2026-09-13
- `card-file-export.js`: SVG autocontenido en data URL evita SecurityError de canvas contaminado; texto blanco y Arial, l√≠mite de espera y control de contexto. PNG real: 160728 bytes.
- Prueba f√≠sica PASS: el usuario confirm√≥ ¬´Eso s√≠, funcion√≥ y lleg√≥¬ª. Integraci√≥n Main solicitada expl√≠citamente.
- `index-grupal.html` y `service-worker.js`: identidad R30 para entregar el exportador mediante ACTUALIZAR. Sin cambios en almacenamiento de rondas ni scores.
- Pruebas de versi√≥n y actualizaci√≥n alineadas con R30; registro RC-104 en `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`; sello `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.
- Evidencia de comparaci√≥n en rama fix-r30-card-png; la p√°gina temporal no se incorpora en Main.


## R31 ¬∑ Comunicaci√≥n universal clara ¬∑ 2026-09-13
- `api/universal-ai.js`: clima actual hablado sin ficha t√©cnica, sin convertir nulos en cero; instrucciones de lenguaje natural y l√≠mites de diagn√≥stico y tasaci√≥n.
- `scripts/universal-quality-benchmark.mjs`: cuatro consultas reales al backend durante Preview, con resultados verificables; referencia ChatGPT de esta conversaci√≥n y evaluaci√≥n de contenido, no similitud literal.
- `test-r31-universal-plain.mjs`: regresi√≥n de clima actual, datos ausentes y horizonte de lluvia.
- `vercel.json`: ejecuta comparaci√≥n solamente en la rama de revisi√≥n. Resultado y publicaci√≥n pendientes.

- `docs/quality/R31_COMPARACION_UNIVERSAL.md`: referencia previa, fuentes y r√∫brica de 100 puntos; el an√°lisis detallado se mantiene s√≥lo cuando se solicita profundidad.

- Comparaci√≥n real: 4/4 respuestas; BMW rechazado por tasaci√≥n local sin comparables locales y fuentes de variantes mezcladas. Se endurece identificaci√≥n de variante y se repite √∫nicamente ese caso. Sin aprobaci√≥n del umbral 90 todav√≠a.

- Segunda comparaci√≥n: BMW ya distingue referencia internacional y ausencia de precio local; se exige identificar a√±o/fuente de comparables. iPhone a√±ade alternativa cuando la pantalla no responde. Revisi√≥n focalizada de estos dos casos.

- Paquete Main R31 preparado: `index-grupal.html` y `service-worker.js` renuevan s√≥lo identificaci√≥n; pruebas de versi√≥n alineadas. No cambia actualizaci√≥n, almacenamiento, scores ni exportador PNG. `vercel.json` conserva el comando original de producci√≥n; comparaci√≥n externa s√≥lo en rama de revisi√≥n.

- `docs/quality/R31_RESPUESTAS_REALES.json`: respuestas reales y tiempos; evaluaci√≥n manual acotada 94/100, sin garant√≠a de similitud general ni de audio f√≠sico. Main/LAB R31: preparado para publicaci√≥n del backend verificado.


## 2026-09-13 ¬∑ R32 ¬∑ Preguntas abiertas y voz
Filtro de conversaci√≥n corregido; √©xito audible real; liberaci√≥n de audio AI ‚àû. Se preserva la correcci√≥n de actualizaci√≥n publicada en LAB y se mantiene R31. Pruebas y l√≠mites f√≠sicos en `docs/quality/R32_PREGUNTAS_Y_VOZ.md`.
Archivos de esta versi√≥n:
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

`Intocables/APROBACION_FISICA_REGISTRO_SCORES_V378.json`: sello de microfono_compartido actualizado s√≥lo por correcci√≥n universal autorizada; SHA previo conservado, aprobaci√≥n f√≠sica R32 pendiente. Banco V358 restaurado sin cambios; liberaci√≥n de audio dentro de startAiUniversalListening.


## 2026-09-13 ¬∑ R33 ¬∑ Error visible en comunicaci√≥n universal
Hallazgo en navegador R32: causa del silencio quedaba oculta. R33 muestra aviso junto a controles, independiente del reloj. Prueba f√≠sica iPhone pendiente. Archivos:
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


## V407-R34 ¬∑ Respuesta escrita y reproducci√≥n verificable ¬∑ 2026-09-13

Base R33 ab2e227c6dc1. Incidente RC-108: audio iniciado no demuestra salida audible; texto oculto y esperas sin l√≠mite. Texto seguro junto a controles, reproductor nativo visible sin mute, plazos m√°ximos y monitor de avance/final. Registro/scores, tarjeta R30 y updater preservados. Pruebas locales dirigidas PASS; Preview y prueba f√≠sica pendientes. Detalle y rollback en docs/quality/R34_AUDIO_Y_TEXTO.md.

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

R34 evidencia Preview: 0595868e64733075c00aa4d0ebe1eecaef438674 READY en ambos proyectos; reproducci√≥n real de frase sint√©tica 5,12 s, RMS0,16452, avance/finalizaci√≥n y texto visible PASS. Prueba f√≠sica iPhone pendiente.

## R35 local y diagn√≥stico de captura R36 ¬∑ 2026-09-13 ¬∑ NO PUBLICADO

Cambio autorizado: ubicaci√≥n expl√≠cita del clima y recuperaci√≥n de captura abandonada. Simulaciones dirigidas PASS; equivalencia ChatGPT, audio inyectado real y comprobaci√≥n iPhone pendientes. Evidencia en docs/quality/R36_CAPTURE_DIAGNOSTIC.json. No se atribuye al iPhone la ausencia de dispositivo del navegador de pruebas.

- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`: c√≥digo, prueba o evidencia de la revisi√≥n conversacional local.
- `Intocables/APROBACION_FISICA_REGISTRO_SCORES_V378.json`: c√≥digo, prueba o evidencia de la revisi√≥n conversacional local.
- `api/universal-ai.js`: c√≥digo, prueba o evidencia de la revisi√≥n conversacional local.
- `api/weather.js`: c√≥digo, prueba o evidencia de la revisi√≥n conversacional local.
- `docs/quality/R35_BANCO_100_PREGUNTAS.json`: c√≥digo, prueba o evidencia de la revisi√≥n conversacional local.
- `docs/quality/R36_CAPTURE_DIAGNOSTIC.json`: c√≥digo, prueba o evidencia de la revisi√≥n conversacional local.
- `docs/quality/R36_CAPTURE_DIAGNOSTIC.md`: c√≥digo, prueba o evidencia de la revisi√≥n conversacional local.
- `index-grupal.html`: c√≥digo, prueba o evidencia de la revisi√≥n conversacional local.
- `test-r31-universal-plain.mjs`: c√≥digo, prueba o evidencia de la revisi√≥n conversacional local.
- `test-r35-weather-location.mjs`: c√≥digo, prueba o evidencia de la revisi√≥n conversacional local.
- `test-r36-capture-permissions.mjs`: c√≥digo, prueba o evidencia de la revisi√≥n conversacional local.
- `test-r36-capture-release.mjs`: c√≥digo, prueba o evidencia de la revisi√≥n conversacional local.
- `test-v335-response-caliber.mjs`: c√≥digo, prueba o evidencia de la revisi√≥n conversacional local.
- `test-v364-vercel-oidc-recovery.mjs`: c√≥digo, prueba o evidencia de la revisi√≥n conversacional local.
- `audit-project.mjs`: exige pruebas de liberaci√≥n de captura y permisos para prevenir reincidencias.

### Seguimiento de aceptaci√≥n de 100 conversaciones ¬∑ 2026-09-13
- `docs/quality/R36_CAPTURE_DIAGNOSTIC.json`: evidencia del banco externo 0/100 y l√≠mites del m√©todo.
- `docs/quality/R36_CAPTURE_DIAGNOSTIC.md`: rechazo del banco como prueba de navegador consecutiva; infraestructura real pendiente. Sin publicaci√≥n.


## Continuidad conversacional R36 ¬∑ 13 septiembre 2026 ¬∑ NO APROBADO

Motor real: 100/100 respuestas HTTP, mediana 3327 ms; 100 referencias ChatGPT observadas. Comparaci√≥n editorial provisional: 98 aceptables, 1 fallo de costos/precios, 1 pendiente de revisar. No certifica equivalencia del flujo completo. Integraci√≥n de servicios de audio externa: 100/100, sin reproducci√≥n y con cuatro trabajadores. Nueve consultas adicionales reales: texto y bytes de voz; costos a√∫n necesita respuesta relativa correcta, las tres ciudades s√≠ se resolvieron.

Segunda escucha: R34 negativo (0 aperturas tras fin de voz), c√≥digo local positivo (100 transiciones sin duplicados; Detener cancela). Reconocimiento simulado, no hardware iPhone. Persistencia real de ronda sint√©tica LAB tras recarga: cinco tablas id√©nticas. TestMu documenta inyecci√≥n iOS, pero no hay cuenta/plan ni dispositivo aprovisionado. Latencia integral <=40%, 100 turnos de navegador y comprobaci√≥n f√≠sica siguen pendientes. Regresi√≥n integral final reservada para candidato completo.

Archivos del alcance y evidencias:
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`: correcci√≥n, control o evidencia de la conversaci√≥n; no publicaci√≥n.
- `Intocables/APROBACION_FISICA_REGISTRO_SCORES_V378.json`: correcci√≥n, control o evidencia de la conversaci√≥n; no publicaci√≥n.
- `api/universal-ai.js`: correcci√≥n, control o evidencia de la conversaci√≥n; no publicaci√≥n.
- `audit-project.mjs`: correcci√≥n, control o evidencia de la conversaci√≥n; no publicaci√≥n.
- `docs/quality/ENGINE_100_COMPARISON.html`: correcci√≥n, control o evidencia de la conversaci√≥n; no publicaci√≥n.
- `docs/quality/ENGINE_100_COMPARISON.json`: correcci√≥n, control o evidencia de la conversaci√≥n; no publicaci√≥n.
- `docs/quality/ENGINE_CHATGPT_REFERENCES_100.json`: correcci√≥n, control o evidencia de la conversaci√≥n; no publicaci√≥n.
- `docs/quality/ENGINE_R34_COMPLETE_100.json`: correcci√≥n, control o evidencia de la conversaci√≥n; no publicaci√≥n.
- `docs/quality/ENGINE_R34_PARTIAL_18.json`: correcci√≥n, control o evidencia de la conversaci√≥n; no publicaci√≥n.
- `docs/quality/R36_CONTINUITY_EVIDENCE.json`: correcci√≥n, control o evidencia de la conversaci√≥n; no publicaci√≥n.
- `docs/quality/R36_TARGETED_CHATGPT.json`: correcci√≥n, control o evidencia de la conversaci√≥n; no publicaci√≥n.
- `docs/quality/R36_TARGETED_CHATGPT_RAW.txt`: correcci√≥n, control o evidencia de la conversaci√≥n; no publicaci√≥n.
- `docs/quality/R36_TARGETED_REAL_9.json`: correcci√≥n, control o evidencia de la conversaci√≥n; no publicaci√≥n.
- `index-grupal.html`: correcci√≥n, control o evidencia de la conversaci√≥n; no publicaci√≥n.
- `scripts/check-conversation-acceptance.mjs`: correcci√≥n, control o evidencia de la conversaci√≥n; no publicaci√≥n.
- `scripts/render-engine-comparison.py`: correcci√≥n, control o evidencia de la conversaci√≥n; no publicaci√≥n.
- `scripts/run-r36-build.mjs`: correcci√≥n, control o evidencia de la conversaci√≥n; no publicaci√≥n.
- `scripts/run-r36-targeted.mjs`: correcci√≥n, control o evidencia de la conversaci√≥n; no publicaci√≥n.
- `test-r34-audio-response.mjs`: correcci√≥n, control o evidencia de la conversaci√≥n; no publicaci√≥n.
- `test-r35-weather-location.mjs`: correcci√≥n, control o evidencia de la conversaci√≥n; no publicaci√≥n.
- `test-r36-followup-events.mjs`: correcci√≥n, control o evidencia de la conversaci√≥n; no publicaci√≥n.


## R36 publicaci√≥n autorizada ‚Äî 2026-09-13
Orden del propietario: Publica. Correcciones de liberaci√≥n de captura, siguiente pregunta, ubicaci√≥n expl√≠cita y voz por fragmentos. Pruebas controladas PASS; validaci√≥n f√≠sica y equivalencia integral de 100 conversaciones pendientes. No se certifica reducci√≥n total de latencia. Reversi√≥n: e871621c2af478deed6957a625feb0e280402d68 conservando almacenamiento local.
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

R36: test-v365-active-round-empty-recovery.mjs conserva la prueba de recuperaci√≥n y verifica el identificador sucesor de cach√©.

## V407 ¬∑ R37 ‚Äî CLIMA VIVO CONSISTENTE

- `index-grupal.html`: `activeCourseWeatherSnapshot` separa el dato meteorol√≥gico informativo actual de la tarjeta cerrada; `currentCourseWeatherSnapshot()` alimenta franja y contexto universal. El refresco ya no se cancela por `officiallyClosedAt`, pero `persist()` contin√∫a prohibido en ese estado.
- `service-worker.js`: `V407-R37-LIVE-WEATHER-20260913` y cach√© sucesor.
- `test-r37-closed-round-live-weather.mjs`: ejecuta la funci√≥n extra√≠da con ronda cerrada, exige una consulta, render sincronizando/final, 27 ¬∞C visible, 20.7 ¬∞C hist√≥rico intacto y cero persistencias.
- `test-v312-general-caddie.mjs`: sustituye la aserci√≥n hist√≥rica que exig√≠a cancelar el clima en rondas cerradas por la separaci√≥n entre instant√°nea viva y persistencia oficial.
- `audit-project.mjs`: hace bloqueante la prueba R37.
- `test-v365-active-round-empty-recovery.mjs`, `test-v406-r2-professional-design.mjs`, `test-v406-r23-visible-version.mjs`, `test-v406-r4-mobile-controls.mjs`, `test-v406-r5-simple-tournament-live.mjs`, `test-v407-r1-premium-visual-system.mjs`, `test-v407-r25-round-controls.mjs`, `test-v407-r7-ios-scroll.mjs`, `test-v407-r9-manual-update.mjs`: contrato R37 actualizado.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`: causa, escape y prevenci√≥n RC-104.
- Reversi√≥n exacta: `ccdd004b361bd84dd5936aa069c7722b13b5659f`, sin borrar ronda, historial ni credenciales locales.


## PTT ‚Äî correcci√≥n local de duraci√≥n (2026-09-13T22:19:28.097630+00:00)
Estado: pendiente de validaci√≥n f√≠sica y publicaci√≥n. Se detect√≥ y corrigi√≥ que la espera de onstop inflaba la duraci√≥n de pulsaciones breves. voice-turns.js registra stoppedAt al soltar. Evidencia: node test-ptt-independent-turns.mjs termina con exit 0; incluye 100 turnos simulados y casos de onstop demorado, pulsaci√≥n de 50 ms con 1000 ms de espera y recuperaci√≥n tras permiso denegado. No equivale a prueba iPhone ni proveedor real. Actualizar no fue modificado. Pr√≥ximo paso: validaci√≥n navegador/proveedor y controles pendientes antes de candidato.


### Candidato local PTT ‚Äî archivos incluidos
- `index-grupal.html`
- `voice-turns.js`
- `api/voice-transcribe.js`
- `test-ptt-independent-turns.mjs`
- `audit-project.mjs`
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`
Estado: pruebas simuladas PASS; proveedor real, revisi√≥n navegador e iPhone pendientes. No aprobado como soluci√≥n integral.


## R38 ‚Äî Publicaci√≥n solicitada en Laboratorio y Maestro
Nueva identidad de release y cach√© para activar el detector existente de Actualizar. Mantiene el toque manual y los datos locales. Push-to-talk incluido en shell. Orden expresa del propietario para ambos enlaces habituales. Comunicaci√≥n Universal mantiene un fallo de disponibilidad pendiente; no se afirma soluci√≥n integral.
Archivos de esta actualizaci√≥n:
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


## OP-60 ‚Äî Obligaci√≥n permanente de ejecuci√≥n visible
Orden expresa 13 septiembre 2026: reportar acci√≥n y evidencia visible cada m√°ximo 60 segundos, seguir ejecutando despu√©s del reporte y documentar bloqueos reales antes de detenerse. Aplicaci√≥n a Laboratorio, Maestro y futuras continuaciones. Registro documental; no cambia el c√≥digo de las aplicaciones.
Archivos de esta modificaci√≥n:
- `AGENTS.md`
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/DIRECTRICES_MANDATORIAS.md`
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/MATRIZ_GATE_0_PROYECTO.md`
- `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md`
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/MATRIZ_GATE_0_PROYECTO.json`
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`
- `ROADMAP_OVERALL.md`
- `ROADMAP_A_DETALLE.md`
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`


## R39 ‚Äî Grabaci√≥n visible y respuesta s√≥lo por sonido
Correcci√≥n por orden del propietario: activar estado rojo/blanco del micr√≥fono en tarjeta, sincronizar estado escuchando durante pulsaci√≥n, ocultar p√°rrafo hablado, no agregar despedidas de acompa√±amiento y descartar cierre inesperado del grabador antes de soltar. Banco simulado PASS incluyendo 20 segundos sostenidos; causa del corte f√≠sico a√∫n no demostrada. No se declara validaci√≥n f√≠sica. Conserva OP-60.
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

## R40 ¬∑ 13 septiembre 2026 ¬∑ pulsaci√≥n sostenida y registro expl√≠cito

Orden del propietario tras IMG_3669/IMG_3670: √°rea t√°ctil invisible +100%, no autocierre mientras mantiene pulsado, registro mediante jugador n√∫mero/ nombre/handicap/marcas. Fuente R39 286aca44e54b00ced7726ba64ddc966d2153b0fa.

Cambios: se elimina temporizador de cierre de 60 s; perder captura de puntero no equivale a soltar; touch-action none en bot√≥n y contenedor; √°rea anterior multiplicada por dos; adaptador de comando expl√≠cito separa posici√≥n del nombre y evita tratar nombre+d√≠gito conversacional como alta. Gu√≠a visible actualizada. Parsers y escritor oficiales conservados; el registro de scores mantiene silencio por regla existente.

Evidencia controlada: 100 turnos, 90 s sin env√≠o hasta soltar, analizador real de dos jugadores con posiciones y nombres correctos, cinco hoyos conservados. Pendiente revisi√≥n visual y f√≠sica; no aprobado integralmente ni publicado en producci√≥n. Rollback: R39 286aca4.

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

### R40 ¬∑ correcci√≥n de construcci√≥n
Los dos builds de ef096d1 fallaron porque las pruebas de gu√≠a visible a√∫n exig√≠an las instrucciones antiguas. Se actualizan las expectativas a jugador n√∫mero/nombre/handicap/marcas seg√∫n orden del propietario; no se eliminan verificaciones. Nuevos controles funcionales ejecutados antes de reconstruir.
- test-v255-player-registration-boxes-codes.mjs
- test-v261-registration-stableford-modality.mjs
- test-v290-brand-icons-cleanup.mjs
- test-v304-homogeneous-registration-actions.mjs
- test-v305-registration-guides-parser-truth.mjs
- CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json

Se conserva MIGUEL como nombre de ejemplo por regla visual V311; s√≥lo cambia la sintaxis expl√≠cita. Archivo adicional: index-grupal.html. Banco funcional: 143 PASS y un FAIL inicial por el nombre de ejemplo; corregido antes de reconstruir.

### R40 ¬∑ √°rea t√°ctil exacta por pantalla
Revisi√≥n CSS detecta m√°rgenes previos distintos: Registro 26 px y Score Card 10 px. Se ajusta inset con sqrt(2) sobre dimensiones efectivas para duplicar √°rea, sin ampliar icono. Se sustituye c√°lculo inicial basado en margen gen√©rico. Archivos: index-grupal.html; ROADMAP_OVERALL.md; ROADMAP_A_DETALLE.md; CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json. Verificaci√≥n matem√°tica en anchos 84/109/180/220: √°rea nueva/anterior 2 dentro de tolerancia 0.000001. Presentaci√≥n f√≠sica pendiente.

## R40 ¬∑ recuperaci√≥n de invitaci√≥n observada en navegador
13 septiembre 2026, 18:41 Guatemala. Fuente: 1ce8223. Fallo real: navegaci√≥n /invite/ entreg√≥ shell R38 en vez del formulario, scripts relativos /invite/*.js fallaron Unexpected token <. La ruta oficial /access.html?invite= permiti√≥ acceso temporal confirmado en el mismo navegador. Correcci√≥n: excluir /invite/ del shell de navegaci√≥n y usar fetch no-store a la URL original. No modifica validaci√≥n, permisos, base de datos, expiraci√≥n ni uso √∫nico. No resuelve por s√≠ sola el acceso entre producci√≥n y Preview.
Prueba test-invite-service-worker.mjs: rutas invite/access van a red sin leer cach√©; pruebas existentes de acceso 24h y actualizaci√≥n PASS. Aceptaci√≥n visual R40 y micr√≥fono f√≠sico pendientes; producci√≥n intacta. Rollback: 1ce8223.
Archivos: service-worker.js; test-invite-service-worker.mjs; audit-project.mjs; ROADMAP_OVERALL.md; ROADMAP_A_DETALLE.md; CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json; CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md.


## R41 ¬∑ Inicio de respuesta de voz ¬∑ 14 septiembre 2026
Correcci√≥n limitada a splitUniversalSpeechText: primeras oraciones largas se dividen en pausa o espacio antes de 240 caracteres; se conserva respuesta completa y voz actual. Caso reproducido: primer bloque 1274 ‚Üí 239 caracteres. test-r34-audio-response.mjs PASS, incluyendo cancelaci√≥n y reproducci√≥n ordenada simulada. No demuestra reducci√≥n real a 1/6. Dictado de cinco hoyos pendiente: frase aportada pasa int√©rprete; falta transcripci√≥n original rechazada. Grabaci√≥n y cierre por soltar intactos. Publicaci√≥n autorizada en LAB y Maestro; reversi√≥n al commit b976451.


## R41 ¬∑ Correcci√≥n servidor tr√°fico al aeropuerto
14 septiembre 2026: directTrafficRouteFromQuery reconoce conector al. Antes: desde mi ubicaci√≥n al aeropuerto internacional La Aurora devuelve null; despu√©s: origen GPS y destino conservados. Pruebas test-v356-traffic-weather-accuracy.mjs y test-v324-real-traffic.mjs PASS. Archivo funcional: api/universal-ai.js. Dos HTTP 502 observados en Maestro 01:21 UTC siguen sin causa interna identificada; no declarar disponibilidad corregida. Sin cambios del micr√≥fono ni del cliente. Publicaci√≥n autorizada en ambos servidores.


## R42 ¬∑ Salida Fish en PTT y cierre de vuelta
14 septiembre 2026. index-grupal.html: PTT evita voz del navegador y Cedar en consultas/cierres; usa speakAiUniversalText con servidor Fish existente a 0.90. El adaptador discreteVoiceController reproduce result.closure tras registro correcto, conservando intacto processBrowserVoiceTranscript y su bloque protegido. test-ptt-independent-turns.mjs agrega cierre Fish exitoso y fallido sin Realtime, con reintento. Pruebas de audio, cierre y pulsaci√≥n PASS controlado. service-worker.js y pruebas de versi√≥n actualizados para entrega R42. Sin prueba f√≠sica ni garant√≠a de timbre fijo o de 1.5‚Äì3.5 segundos: faltan referencia Fish y medici√≥n real. Error de tr√°fico 502 pendiente. Reversi√≥n: 54cae71.


## R42 ¬∑ Diagn√≥stico espec√≠fico de tr√°fico ¬∑ 14 septiembre 2026
Las dos frases del usuario extraen correctamente origen GPS/El Pult√© y destino La Aurora/Oakland Mall. Los HTTP 502 de producci√≥n no identificaban su causa. api/_lib/traffic.js agrega registro traffic-failure con c√≥digo interno, estado HTTP del proveedor, estado normalizado y duraci√≥n; no registra credenciales, coordenadas, preguntas ni mensajes del proveedor. test-v324-real-traffic.mjs verifica rechazo 403 PERMISSION_DENIED sin datos sensibles. Esto habilita diagn√≥stico; NO certifica restauraci√≥n del tr√°fico ni latencia de voz. Archivos: api/_lib/traffic.js; test-v324-real-traffic.mjs; ROADMAP_OVERALL.md; ROADMAP_A_DETALLE.md; CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json.


## Diagn√≥stico protegido de configuraci√≥n de tr√°fico ¬∑ 14 septiembre 2026
`GET /api/traffic?action=status` informa √∫nicamente proveedor y `configured`; no expone credenciales, ubicaciones ni consultas. Permite distinguir configuraci√≥n ausente antes de pedir otra grabaci√≥n f√≠sica. Prueba espec√≠fica PASS. Archivos funcionales: api/traffic.js; middleware.js; test-v324-real-traffic.mjs.


## Recuperaci√≥n de voz autorizada ‚Äî 2026-09-19

Maestra base ccffefb. Evidencia: 2026-09-19 01:49 UTC, voice-speech 502 por Gateway fish-audio/s2.1-pro-free 404. Se reemplaza por TTS-1/Onyx 0.90 y respaldo directo con la misma voz antes de entregar audio, timeout total 22.5 s incluido cuerpo. Pruebas simuladas 404/red/audio vac√≠o/respaldo agotado PASS. Audio f√≠sico y dos segundos NO verificados. No hay garant√≠a de escala ni alertas externas configuradas. El respaldo requiere OPENAI_API_KEY con saldo: se observ√≥ credit_balance_exhausted en la ruta de texto de producci√≥n, por lo que su disponibilidad real est√° pendiente. Sesi√≥n no modificada. Rollback: restaurar archivos de este commit desde ccffefb (restaura el proveedor que fall√≥).

Publicaci√≥n f38d930: construcci√≥n rechazada por comprobaciones del modelo anterior. Se actualizan √∫nicamente expectativas de voz en V362 e Intocables; pruebas de captura y scores conservadas.

Archivos de esta correcci√≥n autorizada: `api/voice-speech.js`, `test-v356-voice-only-cedar-quality.mjs`, `test-voice-provider-recovery.mjs`, `test-v362-physical-voice-recovery.mjs`, `Intocables/intocables-gate.mjs`, `Intocables/MICROFONO_APROBADO.lock.json`, `Intocables/APROBACION_FISICA_REGISTRO_SCORES_V378.json`, `docs/quality/VOICE_PROVIDER_RECOVERY_20260919.md`.


## LAB manual ¬∑ 2026-09-19 ¬∑ EN DESARROLLO
Orden del propietario: retirar micr√≥fono, dictado de scores y comunicaci√≥n universal √∫nicamente en LAB. Maestra conserva 80dfe05; no promover main. Rama lab/manual-iphone-20260919.
Cambios: controles manuales; endpoints de conversaci√≥n/transcripci√≥n/TTS retirados; anuncios de cierre con speechSynthesis local espa√±ola; cach√© propia y Permissions-Policy microphone=().
Verificaci√≥n t√©cnica: scripts/build-manual-lab.mjs PASS (c√°lculo, registro, cierres, General/Stableford, Match Play, Four-Ball, Skins y recuperaci√≥n de anuncios). Nuevo perfil LAB sustituye exclusivamente el build antiguo que exig√≠a micr√≥fono. Las pruebas hist√≥ricas permanecen disponibles.
Pendiente: revisi√≥n visual de formatos/modalidades, limpieza de funciones antiguas inertes, pruebas iPhone y aceptaci√≥n del propietario. Navegador remoto rechaz√≥ localhost con ERR_BLOCKED_BY_CLIENT. No representa un candidato aprobado ni garant√≠a de voz f√≠sica.
Rollback: descartar rama LAB; no modifica producci√≥n.

## LAB ¬∑ recuperaci√≥n de compartir ¬∑ 2026-09-19
IMG_4312/4313: barra solo SUPPORT. Navegador reprodujo TypeError en renderDraft: escritura sobre .newbie-guide-player eliminado con el micr√≥fono interrump√≠a arranque antes de GSCLiveControl.mount y consulta de invitaciones. index-grupal.html retira esa referencia; test-manual-startup-sharing.mjs reproduce fallo anterior y valida correcci√≥n; scripts/build-manual-lab.mjs incorpora candado. Invitaciones conservan control de propietario. ROADMAP_OVERALL.md, ROADMAP_A_DETALLE.md y REGISTRO_REINCIDENCIAS_CALIDAD.md documentan incidente. Base publicada b65b71d; rollback a ese commit solo en LAB. Maestra 80dfe05 intacta. Revisi√≥n de nueva publicaci√≥n pendiente; no se declara prueba iPhone.

## LAB ¬∑ resultado sin audio ¬∑ 2026-09-19
IMG_4314: primera vuelta 44 gross/37 netos/+1 sin sonido. Prueba por interfaz de nueve hoyos reproduce cierre y aviso de ausencia de voz local en navegador remoto; causa exacta del iPhone pendiente. device-closures.js espera voiceschanged hasta 2 s, prioriza voz local latinoamericana, mantiene referencia de utterance, detecta inicio ausente y muestra resultado aun sin audio. test-device-closures.mjs cubre carga tard√≠a, rechazo de voz remota, cancelaci√≥n, cola y bloqueo. Build manual PASS. No equivale a correcci√≥n f√≠sica certificada. Base 6b86f4d; rollback solo de estos archivos. Publicaci√≥n e iPhone pendientes.

## LAB MANUAL 02 ¬∑ revisi√≥n dirigida del 19 de septiembre de 2026

Se retiran transportes, manejadores y prompts inactivos de micr√≥fono/IA del HTML y el puente de dictado que stableford.js todav√≠a insertaba din√°micamente. Se conservan GSCDeviceClosures, logo, estilos deportivos, control manual, LIVE y permisos owner/guest. Se sincronizan meta release y worker como LAB-MANUAL-CLEAN-20260919.

Evidencia: construcci√≥n manual y control de 23 m√≥dulos cargados PASS. Recorrido de navegador sobre LAB publicado 6b86f4d: Medal, Match Play seis jugadores (tres l√≠deres 1 UP), Four Ball (+1 pareja verde), Skins (Q10/-Q10), Universales (6/4/2 puntos), Stableford (par=2 puntos), pr√°ctica. El registro Stableford publicado conservaba dictado; corregido en este candidato, a√∫n pendiente verificaci√≥n autenticada del candidato. Las capturas revisadas son del publicado, no certifican el c√≥digo nuevo. Voz f√≠sica: √∫nicamente confirmaci√≥n del propietario al reeditar hoyo 9; cloud carece de voz espa√±ola local. No se afirma cobertura exhaustiva de todos los cierres, formatos exportados ni iPhone. No se toca MAIN.

## LAB MANUAL 03 ¬∑ fallo de invitaci√≥n reportado 19/09/2026 08:32

Evidencia Vercel: POST app-access HTTP 400 a 14:32:26 y 14:32:30 UTC en deployment 6GiLMSHL3jgxaMYByC9cHhgDD3ya; GET status 200. Causa interna a√∫n no identificada: catch anterior no registraba detalle. Se conserva el error visible, c√≥digo seguro en logs sin tokens ni datos personales y respuesta 503 para almacenamiento no configurado. La invitaci√≥n preparada se comparte en un segundo toque para mantener activaci√≥n Safari; no se genera otra al cancelar. Prueba de fallo persistente y activaci√≥n de compartir PASS; permisos owner/guest sin cambios.

Micr√≥fono: el propietario informa solicitud iPhone. No reproducida ni atribuida todav√≠a. No hay llamadas getUserMedia, reconocimiento o captura en los 23 m√≥dulos web; Permissions-Policy microphone=() ya estaba configurada. No afirmar causa ni resoluci√≥n del permiso sin capturar el aviso. No cambia la maestra. Pendientes acceso propietario del Preview, motivo exacto de error servidor y comprobaci√≥n f√≠sica del aviso.

## LAB MANUAL 04 ¬∑ retiro de ubicaci√≥n y clima por orden del propietario

Se retiran currentBrowserCoordinates y las funciones de carga, temporizadores y representaci√≥n de clima en index-grupal.html; se eliminan ambos bloques visibles de registro y tarjeta. Permissions-Policy incorpora geolocation=() adem√°s de microphone=(). Identidad y worker LAB-MANUAL-NO-GPS-20260919. Se mantienen campo, yardas, par, rating, slope, fuentes y logo. No se alteran datos hist√≥ricos ni la maestra.

Pruebas manuales t√©cnicas PASS; regresi√≥n ampl√≠a bloqueo a GPS y llamadas weather en m√≥dulos cargados. La comprobaci√≥n visual autenticada del Preview y la configuraci√≥n DATABASE_URL de invitaciones permanecen pendientes; retirar clima no resuelve almacenamiento.


## 2026-09-20 ¬∑ Detalle operativo y f√≠sico
### Categor√≠as
- Precarga obligatoria en toda opci√≥n de categor√≠a: `championship=CAMPEONATO`, `a=A`, `b=B`, `c=C`, `d=D`, `senior=SENIOR`, `super_senior=SUPER SENIOR`, `female=FEMENINA`.
- Marcas por defecto: CAMPEONATO‚ÜíNegro/NEGRAS; A‚ÜíAzul/AZULES; B/C/D/SENIOR‚ÜíBlanco/BLANCAS; SUPER SENIOR‚ÜíAmarillo/AMARILLAS; FEMENINA‚ÜíRojo/ROJAS.
- Archivos operativos verificados: `index-grupal.html`, `stableford.js`, `stableford-torneo.html`, `live-hub.html`, `live-hub.js`, `live-view.js`, `card-artifacts.js`, `shortcuts-ui.js`.

### ATAJOS
- `shortcuts-ui.js` mantiene MI SCORE CARD, CENTRO DE TORNEOS, GENERAL, CATEGOR√çAS, BUSCAR JUGADOR, MIS FAVORITOS y gesti√≥n.
- Texto de CATEGOR√çAS actualizado a CAMPEONATO ¬∑ A ¬∑ B ¬∑ C ¬∑ D ¬∑ SENIOR ¬∑ SUPER SENIOR ¬∑ FEMENINA.
- Auditor f√≠sico valida que ATAJOS permanezca visible y no intersecte controles cr√≠ticos de Tarjeta Final, Correcci√≥n Oficial e Historial.

### Manual
- `manual.html` y `GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md` sincronizados con categor√≠as completas.
- Monitor de Tiempo vigente documentado con captura f√≠sica real: INICIO ¬∑ FINAL ¬∑ TIMER ¬∑ RESET.
- Manual f√≠sico vigente: 74 hojas; gate y auditor Chromium deben conservar ese conteo y cargar todas las im√°genes sin desbordes horizontales.

### Traslapes
- `mandatoryUpdate` se oculta durante overlays visibles para evitar invasi√≥n de t√≠tulos, filtros y controles.
- La revisi√≥n f√≠sica no se considera cerrada s√≥lo por tests de c√≥digo: cada pantalla cr√≠tica requiere captura renderizada y revisi√≥n visual.

- Auditor f√≠sico Chromium oficial: `.github/workflows/full-app-manual-physical-parity.yml` valida modalidades, categor√≠as, Tarjeta Final, Correcci√≥n, Historial, Torneos, ATAJOS, 74 hojas del Manual y ausencia de desbordes/traslapes cr√≠ticos.

- Gate multiarchivo 2026-09-20: ambos roadmaps registran conjuntamente `.github/workflows/full-app-manual-physical-parity.yml` y la certificaci√≥n f√≠sica de no traslape.

- V304 LAB 2026-09-20: gate actualizado para la interfaz Stableford vigente de ocho categor√≠as y navegaci√≥n; no se restauran controles de voz retirados.

- V304 manual vigente 2026-09-20: se eliminan del gate los ejemplos de dictado/micr√≥fono retirados en LAB; se valida Registro General manual y Stableford de ocho categor√≠as.

- V305 LAB 2026-09-20: gate reemplazado para validar Registro Manual visible, ocho categor√≠as Stableford y navegaci√≥n; se retiran expectativas hist√≥ricas de parser/gu√≠a de voz.

- V305 LAB R2 2026-09-20: gate reducido a contratos visibles actuales; se eliminan dependencias de nombres internos de funciones de validaci√≥n.

- V357 LAB 2026-09-20: gate heredado de transporte de voz sustituido por contrato de retiro; `api/voice-health.js` no se restaura, microphone/geolocation permanecen bloqueados y el flujo manual es obligatorio.

- Categor√≠as f√≠sicas R3 2026-09-20: la l√°mina `APP_CATEGORIAS_OFICIALES.png` reserva 68 px exclusivos para el riel ATAJOS; ninguna tarjeta de categor√≠a puede quedar invadida.

- ATAJOS HEADER 2026-09-20: se elimina el riel lateral flotante y cualquier reserva de ancho; ATAJOS pasa al bloque superior `round-meta`, sustituyendo RONDA EN CURSO/fecha/hora. Score Card y bloques recuperan ancho completo. Se actualizan gates `test-lab-shortcuts-navigation.mjs` y `test-lab-global-operational-audit.mjs` para este contrato visual. LIVE permanece pendiente de validaci√≥n end-to-end.

- MEN√ö / ANOTADOR 2026-09-20: cambio global visual en LAB. ATAJOS pasa a MEN√ö en app, Torneos y Manual; bot√≥n MEN√ö sin logo, fondo verde ne√≥n, texto negro grande y centrado. En Score Card se elimina la franja ‚ÄúTARJETA DE PUNTUACI√ìN / DESLIZA‚Ä¶‚Äù. El bloque ‚ÄúCONTROL MANUAL ‚Ä¶‚Äù pasa a ‚ÄúANOTADOR‚Äù; se retira la l√≠nea ‚ÄúINGRESO OFICIAL ‚Ä¶‚Äù y los encabezados blancos JUGADOR/HOYO/GROSS/IN/OUT/TOTAL del anotador, conservando los controles y c√°lculos. Archivos: index-grupal.html, shortcuts-ui.js, live-hub.html, manual.html, GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md, test-lab-shortcuts-navigation.mjs y test-lab-global-operational-audit.mjs. Pendiente regeneraci√≥n de capturas f√≠sicas del Manual tras publicaci√≥n.

- MEN√ö assets parity 2026-09-21: el texto visible cambia a MEN√ö, pero se conservan los nombres f√≠sicos existentes de capturas `*_ATAJOS*` para no romper referencias del Manual. `scripts/manual-screen-parity-gate.mjs` se actualiza para validar MEN√ö visible sin exigir renombrar archivos f√≠sicos.

- MANUAL REMAQUETADO / PANTALLAS REALES / GRIS / MEN√ö 2026-09-21: manual f√≠sico de 74 hojas unificado bajo plantilla maestra m√≥vil; safe-area y navegaci√≥n global ATR√ÅS ¬∑ INICIO ¬∑ MI RONDA ¬∑ √çNDICE; funciones operativas documentadas con pantallas reales vigentes (Acceso, Setup, Registro, Categor√≠as, Score Card, Stableford, Match Play, Four Ball, Pr√°ctica, Skins, Universales, Timer, zona operativa, Tarjeta Final, Correcci√≥n, Historial y Torneos); las l√°minas did√°cticas no operativas conservadas se reprocesan con acentos grises, reservando el verde para pantallas reales de la app. Manual visible sincronizado con MEN√ö y ANOTADOR; archivos hist√≥ricos cuyo nombre t√©cnico contiene ATAJOS se conservan s√≥lo como identificadores de asset.

- MATCH PLAY TEST SYNC 2026-09-21: `test-v306-match-play.mjs` deja de exigir el texto retirado ‚ÄúCORRECCI√ìN HASTA HOYO‚Äù y valida el acceso vigente `CORREGIR RONDA`; no cambia motor, scoring ni cierre de Match Play.

- ANOTADOR Match Play 2026-09-21: `test-v306-match-play.mjs` deja de exigir la l√≠nea auxiliar ‚ÄúCORRECCI√ìN HASTA HOYO‚Äù retirada por dise√±o y valida el encabezado vigente ANOTADOR. La correcci√≥n oficial permanece accesible por su control dedicado; no se altera el motor Match Play.

- ANOTADOR TEST SYNC 2026-09-21: `test-v309-four-ball.mjs` valida la etiqueta visible vigente `ANOTADOR` en lugar de CONTROL MANUAL; no cambia motor Four Ball, scoring, TEAMS ni exportaci√≥n.

- ANOTADOR TITLE SYNC 2026-09-21: `test-v309-four-ball.mjs` valida el t√≠tulo visible exacto `ANOTADOR` sin sufijo de modalidad; no cambia motor Four Ball ni UI.

- MEN√ö TEXT-ONLY TEST SYNC 2026-09-21: `test-lab-shortcuts-navigation.mjs` valida bot√≥n MEN√ö sin logo, texto MEN√ö grande/centrado y visible; no cambia navegaci√≥n ni acciones del men√∫.

- ASSET T√âCNICO MEN√ö SYNC 2026-09-21: `test-lab-global-operational-audit.mjs` conserva los nombres f√≠sicos hist√≥ricos `REGISTRO_ATAJOS_REAL.webp` y `FOURBALL_ATAJOS_REAL.webp` como identificadores de archivo; la interfaz visible sigue usando MEN√ö. No cambia UI, navegaci√≥n ni contenido visible.

- MEN√ö TORNEOS PHYSICAL FIX 2026-09-21: `shortcuts-ui.js` monta MEN√ö dentro del encabezado real de `live-hub.html`; el header reserva una cuarta columna en escritorio y una segunda fila en m√≥vil para evitar ocultamiento/traslape. MEN√ö se oculta s√≥lo en Pantalla P√∫blica. No cambia navegaci√≥n ni destinos del men√∫.

- AUDITOR TORNEOS MEN√ö 2026-09-21: el render f√≠sico sale expl√≠citamente de Pantalla P√∫blica antes de validar Torneos, para no confundir la ocultaci√≥n intencional de controles en modo p√∫blico con un fallo de navegaci√≥n. La auditor√≠a valida MEN√ö visible/abrible en modo normal; no cambia comportamiento de Pantalla P√∫blica.

- AUDITOR SCORE CARD MEN√ö 2026-09-21: el render f√≠sico crea primero una ronda General v√°lida y cierra Setup antes de validar MEN√ö en `round-meta`; evita falsos fallos causados por el `main` oculto durante configuraci√≥n inicial. No cambia comportamiento de la app.

- HEADER MEN√ö compacto 2026-09-21: se restaura el protagonismo/tama√±o visual del logo principal en m√≥vil y MEN√ö se reduce a pill redondeado aproximadamente a la mitad del tama√±o anterior (verde ne√≥n, texto negro, sin logo). No cambia navegaci√≥n ni scoring. Se prepara nueva identidad de release para que ACTUALIZAR detecte esta correcci√≥n.
- LAB manual/UI 2026-09-21: remaquetaci√≥n final del manual con pantallas reales por funci√≥n, gr√°ficas did√°cticas en gris, navegaci√≥n global ATR√ÅS/INICIO/MI RONDA/√çNDICE; Stableford recupera identidad visible y MEN√ö se oculta en Tarjeta Final, Correcci√≥n e Historial para evitar traslapes.
- LAB cierre conjunto 2026-09-21: ROADMAPS sincronizados en un mismo commit para la remaquetaci√≥n final, pantallas reales por operaci√≥n, gr√°ficas did√°cticas grises, navegaci√≥n global y correcciones f√≠sicas de Stableford/MEN√ö.\n- LAB audit 2026-09-21: el render f√≠sico espera expl√≠citamente la carga de im√°genes lazy antes de medir cada hoja, evitando falsos FAIL de activos reales como APP_SETUP_CURRENT.png.\n
- LAB audit 2026-09-21 R2: corregida la sintaxis del wait de im√°genes lazy del auditor f√≠sico; ahora usa saltos reales y espera load/error antes de medir cada hoja.
- LAB cierre QA at√≥mico 2026-09-21: ambos ROADMAPS actualizados juntos para validar el estado final del manual remaquetado, pantallas reales por operaci√≥n, gr√°ficas did√°cticas grises y navegaci√≥n global ATR√ÅS/INICIO/MI RONDA/√çNDICE.

- ANOTADOR ¬∑ HOYO ACTUAL 2026-09-21: en m√≥vil se ampl√≠a √∫nicamente el d√≠gito del selector de hoyo actual a 48 px (4√ó el tama√±o previo de 12 px). El r√≥tulo HOYO, ANTERIOR y SIGUIENTE conservan su tama√±o actual; el selector gana altura s√≥lo para evitar recorte del d√≠gito.

- ANOTADOR ¬∑ SELECTOR COMPACTO 2026-09-21: se corrige la versi√≥n 4√ó que ocult√≥ el d√≠gito en iPhone. El selector central vuelve a la misma altura visual que ANTERIOR/SIGUIENTE (54 px), elimina las flechas nativas mediante appearance:none, fuerza el d√≠gito visible en blanco a 30 px y reduce el espacio entre ANOTADOR y la fila de controles a 2 px. El r√≥tulo HOYO conserva su tama√±o.

- REFINO VISUAL 2026-09-21: el d√≠gito del hoyo actual en ANOTADOR conserva su tama√±o pero reduce grosor de 900 a 400. INFORMACI√ìN DEL CAMPO alinea profesionalmente YARDAS / COURSE RATING / SLOPE RATING con filas homog√©neas; la primera columna usa ancho fijo suficiente para 6,994 y el punto de tee, eliminando el desfase visual de la fila negra.

- YARDAS NEGRAS ALINEADAS 2026-09-21: la fila Negro/6,994 deja de usar markup inline distinto. Todas las filas de YARDAS comparten ahora la misma estructura `tee-yardage-row` y `tee-yardage-value`, con id√©ntico ancho, alto, baseline y centrado. La fila negra conserva fondo blanco/texto negro sin desplazamiento respecto de Azul/Blanco/Rojo/Amarillo.


- MANUAL INTERACTIVO TOTAL 2026-09-21: `manual.html`, `manual-torneos.html` e `index-grupal.html` incorporan navegaci√≥n operativa directa desde el Manual hacia las funciones reales de la app. Las 74 hojas del Manual reciben destino operativo; las capturas del Manual general se convierten en superficies tocables y el cap√≠tulo Torneos convierte sus controles ilustrados en accesos directos a MIS TORNEOS, GENERAL, CATEGOR√çAS, BUSCAR JUGADOR, FAVORITOS y dem√°s rutas vigentes. `index-grupal.html` a√±ade el router `manual_action` para abrir Registro, Stableford, Score Card, Control Manual, Timer, Tarjeta Final, Historial, Estad√≠sticas, Cuenta, Reglas, Instalaci√≥n, Correcci√≥n y MEN√ö sin duplicar l√≥gica. Objetivo de QA pendiente: sustituci√≥n progresiva de click de imagen completa por hotspots geom√©tricos exactos dentro de cada captura donde exista m√°s de una opci√≥n visible, y certificaci√≥n f√≠sica final en iPhone/LAB/Producci√≥n.

- MANUAL COVER GATE SYNC 2026-09-21: `test-lab-global-operational-audit.mjs` deja de exigir la portada hist√≥rica `/docs/manual/layout/page-00.png` y valida el logo oficial cuadrado vigente `/assets/official-logos/golf-score-card-gt-official-master-1254.jpeg`, ya adoptado por `manual.html`. No altera pantallas internas de la app; s√≥lo sincroniza el gate con la portada autorizada del Manual.

- MANUAL HOTSPOTS REALES FASE 1 2026-09-21: se eliminan los botones externos de ‚ÄúMODO INTERACTIVO‚Äù del Manual general y se inicia la conversi√≥n correcta: zonas transparentes directamente sobre los controles visibles de las gr√°ficas. Primera cobertura aplicada a `APP_SETUP_CURRENT.png`, `APP_SCORECARD_ATAJOS.png`, `APP_ATAJOS_OVERLAY.png` y `APP_TORNEOS_HUB.png`, con rutas reales hacia Registro, Score Card, Anotador, MEN√ö, Mis Torneos, General, Categor√≠as, Buscar Jugador, Favoritos, Historial y Cuenta. Archivo principal: `manual.html`. Pendiente: extender la misma geometr√≠a a todos los dem√°s assets y validar f√≠sicamente cada hotspot.

- MANUAL HOTSPOTS REALES FASE 2 2026-09-21: `manual.html` extiende hotspots transparentes directamente sobre todas las gr√°ficas operativas actuales: Stableford, Match Play, Four Ball, Pr√°ctica, Skins, Universales, Tarjeta Final, Correcci√≥n, Historial, Acceso/Cuenta, Categor√≠as, Campeonato, Torneos, Timer, zona operativa inferior y las cuatro capturas reales LAB. La capa interactiva se alinea din√°micamente al rect√°ngulo renderizado exacto de cada imagen mediante medici√≥n y ResizeObserver para evitar desplazamientos por padding/object-fit. Pendiente √∫nicamente certificaci√≥n f√≠sica automatizada de cada hotspot y destino.

- √çNDICE USUARIO FINAL 2026-09-21: `manual.html` elimina del √≠ndice visible los bloques internos ‚ÄúPANTALLAS ACTUALES ¬∑ EVIDENCIA F√çSICA‚Äù y ‚ÄúPANTALLAS REALES ACTUALES ¬∑ LAB‚Äù, adem√°s del listado t√©cnico duplicado de diez entradas de Torneos. El usuario final conserva un √∫nico acceso claro ‚ÄúTorneos ¬∑ gu√≠a interactiva completa‚Äù. Las hojas internas y evidencias siguen existiendo para QA y navegaci√≥n contextual, pero dejan de ocupar espacio en el √≠ndice del usuario.

- AUDIO DE RESULTADOS PARCIAL 2026-09-22: FRONT 1‚Äì9, BACK 10‚Äì18 y TOTAL 1‚Äì18 pueden anunciar resultados durante la ronda usando el √∫ltimo hoyo completamente registrado. Ejemplos aprobados: ¬´Hasta el hoyo cinco¬ª para FRONT cuando van por el 5 y ¬´Hasta el hoyo trece¬ª para BACK cuando van por el 13, seguido por Gross, Neto y relaci√≥n contra par de cada jugador. Al completar 9/18 se conservan los cierres ¬´Primera vuelta¬ª, ¬´Segunda vuelta¬ª y ¬´Ronda completa¬ª. Cambio funcional en `index-grupal.html`; sin alterar scores ni c√°lculos oficiales.

- AUDIO PARCIAL R2 2026-09-22: despliegue at√≥mico de `index-grupal.html` + ambos ROADMAPS para que FRONT/BACK/TOTAL anuncien ¬´Hasta el hoyo N¬ª cuando la vuelta a√∫n no est√° completa. Corrige la publicaci√≥n fallida anterior; no cambia c√°lculos de score.

- AUDIO R3 ¬∑ PRONUNCIACI√ìN GROS 2026-09-22: el texto hablado de resultados usa `Gros` en lugar de `Gross` para evitar que la voz local del iPhone lo pronuncie ¬´grous¬ª. Los r√≥tulos visuales GROSS de la tarjeta no cambian. Se mantiene ¬´Hasta el hoyo N¬ª para resultados parciales.

- AUDIO R4 ¬∑ RESULTADO INDIVIDUAL POR NOMBRE 2026-09-22: cuando hay varios jugadores, tocar directamente el nombre de un jugador en la Score Card reproduce √∫nicamente sus resultados acumulados hasta su √∫ltimo hoyo consecutivo registrado. La locuci√≥n usa ¬´Hasta el hoyo N¬ª durante la ronda, ¬´Primera vuelta¬ª al completar 9 y ¬´Ronda completa¬ª al completar 18. No reproduce resultados de los dem√°s jugadores. Se mantiene pronunciaci√≥n hablada ¬´Gros¬ª y la tarjeta visual conserva GROSS.

- BUILD GATE HOTFIX 2026-09-22: `test-v304-homogeneous-registration-actions.mjs` se sincroniza con la UI vigente: Registro general conserva `REVISAR DATOS` y Stableford conserva `OK`. El gate anterior exig√≠a err√≥neamente `OK` para ambos y bloqueaba Vercel. No se cambia la pantalla ni la l√≥gica del usuario; s√≥lo se corrige la prueba obsoleta para permitir publicar AUDIO R4.

- BUILD GATE HOTFIX R2 2026-09-22: el contrato V304 se sincroniza completamente con los textos vigentes: `REVISAR DATOS`, `INICIAR RONDA`, `VER RONDA ANTERIOR` y `VER RONDAS GUARDADAS`. Evita que validaciones hist√≥ricas bloqueen el despliegue de AUDIO R4. No cambia interfaz ni l√≥gica de usuario.

- BUILD GATE HOTFIX R3 2026-09-22: V305 se sincroniza con la UI vigente de historial: botones `VER RONDAS GUARDADAS` y t√≠tulo `MIS RONDAS GUARDADAS`. El gate hist√≥rico exig√≠a `HISTORIAL`/`HISTORIAL DE TARJETAS` y bloqueaba Vercel. No se altera ninguna pantalla ni dato del usuario.

- BUILD GATE HOTFIX R4 2026-09-22: V305 actualiza el contrato de cuenta al flujo vigente `RESPALDAR / RECUPERAR DATOS` y estado `CUENTA DE RESPALDO CONECTADA ‚úì`; elimina la expectativa hist√≥rica `REG√çSTRATE`. No modifica interfaz ni credenciales; √∫nicamente alinea la prueba con la app vigente para desbloquear publicaci√≥n.

- BUILD GATE HOTFIX R5 2026-09-22: `test-v305-registration-guides-parser-truth.mjs` actualiza controles Stableford a `INICIAR RONDA`, `VER RONDA ANTERIOR` y `VER RONDAS GUARDADAS`. Corrige √∫nicamente el gate hist√≥rico; la interfaz vigente permanece intacta.

- RELEASE OFFLINE SYNC 2026-09-22: `service-worker.js` alinea `RELEASE` y `ACTIVE_CACHE_NAME` con `PLAYER-NAME-RESULT-AUDIO-20260922-R4`, permitiendo que la PWA instalada detecte/promueva la misma versi√≥n que `index-grupal.html`. Sin cambios funcionales adicionales.

- ANOTADOR R5 ¬∑ TECLADO NUM√âRICO + AUTO SIGUIENTE 2026-09-22: las casillas GROSS del ANOTADOR y de la Score Card dejan de depender del teclado/prompt nativo del iPhone y abren un teclado propio 1‚Äì9, 0, X, borrar y OK. Al confirmar un score se guarda √∫nicamente ese jugador y se abre autom√°ticamente el siguiente jugador del mismo hoyo. Scores de dos d√≠gitos se ingresan antes de pulsar OK. El motor oficial de Gross/Neto/HCP no cambia.

- RELEASE R5 ¬∑ SERVICE WORKER SYNC 2026-09-22: Service Worker y p√°gina quedan sincronizados en `MANUAL-SCORE-KEYPAD-AUTO-NEXT-20260922-R5`, forzando una nueva identidad de cach√© para que iPhone/PWA reciba el teclado num√©rico propio y el avance autom√°tico al siguiente jugador sin mezclar recursos R4.

- TEST R5 ¬∑ STABLEFORD MANUAL KEYPAD 2026-09-22: `test-stableford-manual.mjs` deja de exigir el `window.prompt` retirado y valida el teclado propio `openRoundScoreKeypad`, las teclas de score y `OK ¬∑ SIGUIENTE`. Mantiene la exigencia de c√°lculo/persistencia/cierre por el motor oficial.

- ANOTADOR R6 ¬∑ CONFIRMACI√ìN HABLADA DE CADA SCORE 2026-09-22: al confirmar un score desde el teclado propio, la app anuncia inmediatamente `Hoyo N. Jugador. Gros X.` y abre el siguiente jugador del mismo hoyo. La locuci√≥n individual por nombre y los audios FRONT/BACK/TOTAL permanecen independientes. P√°gina y Service Worker se sincronizan en R6 para evitar cach√© R5.

- ANOTADOR R5 ¬∑ TECLADO Y DICTADO DE SCORES 2026-09-22: las casillas GROSS del ANOTADOR dejan de ser inputs readonly y pasan a botones, eliminando por construcci√≥n el teclado QWERTY de iOS. Tocar una casilla abre exclusivamente el keypad num√©rico interno. Se a√±ade `üéô DICTAR` dentro del keypad para un jugador/hoyo y `üéô DICTAR SCORES` en el ANOTADOR para frases grupales como ¬´Jaime cuatro, Jessie cinco, Becky seis¬ª. El dictado usa √∫nicamente SpeechRecognition/webkitSpeechRecognition del navegador y alimenta el parser local existente; no reactiva asistentes, endpoints de voz ni IA remota. El audio individual al tocar el nombre del jugador se conserva.

- GATE DICTADO LOCAL R5 2026-09-22: `test-manual-no-assistant.mjs` se actualiza para mantener bloqueados asistentes, endpoints remotos y micr√≥fonos retirados, permitiendo √∫nicamente `SpeechRecognition/webkitSpeechRecognition` para el nuevo dictado local de scores del ANOTADOR. Esta prueba verifica adem√°s que `startRoundScoreDictation` permanezca presente. Relacionado con `index-grupal.html` y `service-worker.js` release `SCORE-KEYPAD-DICTATION-20260922-R5`.

- BUILD LAB R5 ¬∑ DICTADO LOCAL 2026-09-22: `scripts/build-manual-lab.mjs` mantiene bloqueados `getUserMedia`, `MediaRecorder` y endpoints retirados de voz/IA, pero permite expl√≠citamente `SpeechRecognition/webkitSpeechRecognition` √∫nicamente para `startRoundScoreDictation`. El build exige que el dictado local de scores exista y evita reactivar asistentes o transporte remoto.

- GATE R5 ¬∑ `test-manual-no-assistant.mjs` 2026-09-22: se actualiza esta prueba para permitir exclusivamente `SpeechRecognition/webkitSpeechRecognition` usado por el dictado local de scores del ANOTADOR, manteniendo bloqueados micr√≥fono/asistente/IA y endpoints retirados. Valida adem√°s `startRoundScoreDictation`. Este cambio acompa√±a `index-grupal.html` y `service-worker.js` en la release `SCORE-KEYPAD-DICTATION-20260922-R5`.

- ANOTADOR R6 ¬∑ KEYPAD COMPACTO 2026-09-22: el popup de score se reduce aproximadamente 45‚Äì60% respecto de R5: ancho m√°ximo 320px/88vw, altura visual objetivo ‚â§42vh, teclas de 38px, display de 38px, acciones de 40px, menos padding/gaps y overlay a 24% de opacidad. Antes de abrir, la fila/casilla activa se centra con `scrollIntoView` para permanecer visible por encima del panel. Se conservan `üéô DICTAR`, `OK ¬∑ SIGUIENTE`, dictado grupal, autoavance y motor de score sin cambios.

- FINAL R8 ¬∑ ANOTADOR 1‚Äì9 + AUDIO 2026-09-22: la pantalla conserva exactamente su estructura; las nueve posiciones de los tres totales parciales a la derecha del ANOTADOR se reemplazan por teclas fijas 1‚Äì9 (3√ó3). Tocar un n√∫mero registra inmediatamente el score del jugador seleccionado y mueve la selecci√≥n visual (borde verde fuerte) a la casilla GROSS del siguiente jugador, sin bot√≥n SIGUIENTE ni popup. Tocar el nombre de un jugador usa su `player.id` real y lee s√≥lo sus resultados registrados. FRONT/BACK/TOTAL construyen expl√≠citamente una l√≠nea para todos los jugadores con score disponible hasta el √∫ltimo hoyo registrado. No se alteran c√°lculos, tarjeta inferior ni dem√°s elementos de pantalla.

- FINAL R8 HOTFIX 2026-09-22: se elimina la cadena heredada `OK ¬∑ SIGUIENTE` del antiguo popup no utilizado. El flujo vigente permanece: teclado fijo 1‚Äì9 en las nueve posiciones derechas, guardado inmediato y selecci√≥n autom√°tica de la siguiente casilla GROSS. Sin cambios visuales adicionales.

- FINAL R10 ¬∑ AUDIO INDIVIDUAL POR NOMBRE 2026-09-22: se corrige exclusivamente el toque sobre el nombre del jugador. El listener pasa a delegaci√≥n global en fase capture sobre `#scorecard .player-name[data-audio-player="1"]`, por lo que sigue funcionando despu√©s de cualquier re-render y aunque otros controles detengan propagaci√≥n. La resoluci√≥n usa primero `data-player-id` real y fallback por slot visual. Tocar un nombre reproduce s√≥lo el acumulado de ese jugador. FRONT/BACK/TOTAL no se modifican.

- FINAL R9 ¬∑ FLUJO DE SELECCI√ìN DE SCORE 2026-09-22: el ANOTADOR inicia sin ninguna casilla GROSS seleccionada. El usuario debe tocar manualmente la primera casilla a utilizar; esa casilla se marca con borde/resplandor verde. Al tocar 1‚Äì9 se registra el score y la selecci√≥n verde pasa autom√°ticamente a la casilla GROSS del siguiente jugador del mismo hoyo. Al registrar el √∫ltimo jugador, se limpia por completo la selecci√≥n y la pantalla vuelve al estado normal. Cambiar de hoyo tambi√©n limpia la selecci√≥n. No se mueve ni redise√±a ning√∫n otro elemento.

- FINAL R10 ¬∑ VERDE ACTIVO + CAPTURA SILENCIOSA + AUDIO INDIVIDUAL 2026-09-22: la primera casilla no se activa sola; el usuario toca una casilla GROSS para iniciar. La casilla activa se pinta fondo verde ne√≥n con texto negro. Tras registrar 1‚Äì9, el estado activo se conserva a trav√©s del render y se reaplica a la siguiente casilla GROSS; al √∫ltimo jugador se limpia por completo. La captura manual queda 100% silenciosa, incluyendo cierres autom√°ticos de vuelta. El audio s√≥lo se reproduce por acci√≥n expl√≠cita: tocar el nombre usa `player.id` y lee exclusivamente a ese jugador; FRONT/BACK/TOTAL siguen siendo controles separados de resumen.

- TEST R10 ¬∑ CAPTURA SILENCIOSA 2026-09-22: `test-stableford-manual.mjs` se actualiza para exigir que el ingreso manual de scores NO invoque `speakClosure` autom√°ticamente. El audio queda reservado a tocar nombre de jugador o FRONT/BACK/TOTAL. Valida el comportamiento aprobado de R10 sin cambiar c√°lculos ni persistencia.

- R11 2026-09-22 ¬∑ ANOTADOR SIN MICR√ìFONO: se retira completamente `DICTAR SCORES` y el transporte SpeechRecognition del ANOTADOR. El ingreso manual es silencioso. No existe selecci√≥n inicial autom√°tica: el usuario toca primero cualquier casilla GROSS y esa casilla se resalta en verde fuerte. Despu√©s de anotar, la selecci√≥n verde avanza al siguiente jugador; al terminar el √∫ltimo jugador se elimina la selecci√≥n y la tarjeta vuelve a estado normal. En cualquier momento el usuario puede tocar manualmente otra casilla GROSS para mover la selecci√≥n. Tocar el nombre de un jugador reproduce s√≥lo el acumulado de ese jugador, priorizando `player.id` real y con fallback por nombre visible/slot.

- R11 GATE HOTFIX 2026-09-22: `test-manual-no-assistant.mjs` se alinea con la orden vigente de retirar completamente micr√≥fono y `DICTAR SCORES`. Ahora exige ausencia de `startRoundScoreDictation`, `DICTAR SCORES` y `SpeechRecognition/webkitSpeechRecognition`, manteniendo √∫nicamente audio local de resultados por nombre y FRONT/BACK/TOTAL.

- R11 BUILD HOTFIX 2026-09-22: `scripts/build-manual-lab.mjs` deja de exigir dictado local y ahora valida la orden vigente: ausencia de `startRoundScoreDictation`, `DICTAR SCORES` y `SpeechRecognition/webkitSpeechRecognition` en el ANOTADOR. Se conserva audio de resultados mediante `device-closures.js`.

- R12 2026-09-22 ¬∑ LIMPIEZA FINAL MICR√ìFONO: se elimina la √∫ltima referencia residual `roundScoreKeypadDictate/startRoundScoreDictation` del popup heredado y se renueva release/cache. El ANOTADOR queda exclusivamente manual 1‚Äì9, silencioso, con selecci√≥n verde y audio s√≥lo por nombre/FRONT/BACK/TOTAL.

- FINAL R13 ¬∑ VERDE + AUDIO INDIVIDUAL 2026-09-22: el ingreso de score queda totalmente silencioso. La primera casilla s√≥lo se activa al tocarla manualmente; la casilla GROSS activa recibe borde/fondo/resplandor verde expl√≠cito por estilo inline y clase. Antes de guardar se persiste el ID del siguiente jugador, de modo que el render conserve y mueva el verde autom√°ticamente; despu√©s del √∫ltimo jugador se limpia toda selecci√≥n. Al tocar un nombre en la tarjeta se resuelve por data-player-id/slot visual y se reproduce √∫nicamente el acumulado de ese jugador. Micr√≥fono y DICTAR SCORES permanecen retirados.

- FINAL R14 ¬∑ CASILLA VERDE COMPLETA + 4/6 JUGADORES + AUDIO DIRECTO 2026-09-22: la casilla GROSS activa se renderiza con fondo completo verde ne√≥n y texto negro aun estando vac√≠a. El avance manual usa todos los jugadores visibles de la ronda (respetando s√≥lo cierre de Match), no el filtro activeFrom, por lo que contin√∫a del 3.¬∫ al 4.¬∫, 5.¬∫ y 6.¬∫ jugador. Al √∫ltimo jugador se limpia la selecci√≥n. Los nombres de la Score Card reciben un handler directo por player.id; tocar un nombre reproduce s√≥lo su acumulado. La entrada de scores permanece silenciosa y no existe DICTAR SCORES.


- FINAL R18 ¬∑ DOBLE TOQUE NOMBRE + AUDIO ACUMULADO 2026-09-22: se corrige el acceso al audio individual del jugador. Un toque sobre el nombre no reproduce audio; dos toques consecutivos sobre el mismo nombre activan un √∫nico handler delegado y leen exclusivamente el acumulado de ese jugador (Gross, Neto y resultado contra par) hasta su √∫ltimo hoyo registrado. Se elimina el handler inline duplicado que pod√≠a interferir con el evento. La entrada de scores permanece silenciosa; FRONT/BACK/TOTAL no cambian. Archivo operativo modificado: index-grupal.html.


- R19 BUILD/GATE SYNC 2026-09-22: sincronizaci√≥n conjunta obligatoria de ROADMAP_OVERALL.md, ROADMAP_A_DETALLE.md e index-grupal.html para publicar la correcci√≥n de doble toque del nombre y audio acumulado individual sin alterar c√°lculos, tarjeta ni captura silenciosa.


- R20 BUILD FIX 2026-09-22: service-worker.js se sincroniza exactamente con el gscg-release vigente de index-grupal.html. Corrige el gate t√©cnico que exige igualdad p√°gina/worker; no modifica la funci√≥n aprobada de doble toque ni c√°lculos. Archivos del cambio: service-worker.js.


- R21 IPHONE DOUBLE TAP AUDIO 2026-09-22: el doble toque sobre nombre usa pointerup y player.id estable, con ventana t√°ctil de 900 ms; evita depender de la misma instancia DOM de la celda y llama directamente GSCPlayerNameAudio. Un toque sigue silencioso. Se sincronizan index-grupal.html y service-worker.js. Funci√≥n de scores/c√°lculos intacta.


- R22 DBLCLICK NATIVO AUDIO 2026-09-22: tras evidencia f√≠sica NO AUDIO en iPhone con detector pointerup manual, se reemplaza por el evento nativo dblclick sobre la celda del nombre. El doble toque/clic llama directamente GSCPlayerNameAudio(player.id); un toque no habla. No cambia c√°lculo, score ni tarjeta. index-grupal.html y service-worker.js sincronizados.


- R23 IPHONE TOUCHEND + CONFIRMACI√ìN VISUAL 2026-09-22: se reemplaza dblclick por touchend no pasivo, espec√≠fico para interacci√≥n t√°ctil real en iPhone. El segundo toque sobre el mismo player.id dentro de 1000 ms ilumina temporalmente la celda del nombre en verde y muestra estado DOBLE TOQUE DETECTADO antes de llamar GSCPlayerNameAudio. Un toque permanece silencioso. No cambia c√°lculo, score ni tarjeta. index-grupal.html y service-worker.js sincronizados.


- R24 FULL-CELL INVISIBLE HIT ZONE 2026-09-22: cada celda de nombre incorpora un bot√≥n transparente absoluto que cubre el 100% de la casilla y conserva un player.id individual. El doble toque sobre cualquier punto de la casilla acciona el audio acumulado de ese jugador; al detectarlo, la celda parpadea verde y muestra estado antes de reproducir. Un toque no habla. Se mantiene c√°lculo, score y tarjeta sin cambios. index-grupal.html y service-worker.js sincronizados.


- R25 BUTTON CLICK DOUBLE TAP 2026-09-22: se elimina dependencia de touchend/dblclick. El bot√≥n transparente que cubre el 100% de cada celda usa click nativo del bot√≥n: primer toque confirma recepci√≥n con flash amarillo y mensaje; segundo toque del mismo player.id dentro de 1000 ms confirma verde y ejecuta GSCPlayerNameAudio. Un toque no reproduce audio. C√°lculos y tarjeta intactos. index-grupal.html y service-worker.js sincronizados.


- R26 PWA CACHE RELEASE FIX 2026-09-22: se elimina el APPROVED_CACHE_NAME fijo heredado que pod√≠a seguir sirviendo una versi√≥n anterior en iPhone aun con Vercel READY. El cach√© aprobado ahora es exclusivo de R26, por lo que en activate/ensureApprovedShell se llena desde el candidato R26 y las navegaciones principales dejan de quedar congeladas en una versi√≥n vieja. Tambi√©n se corrige el app_version hardcodeado del fallback de actualizaci√≥n. Funci√≥n de bot√≥n invisible y audio R25 se conserva sin cambios funcionales.


- R27 DIRECT TD CLICK AUDIO 2026-09-22: se elimina por completo el bot√≥n invisible y cualquier dependencia de touchend/dblclick/overlay. La propia celda TD.player-name es el control t√°ctil. Primer click/tap del mismo player.id produce flash amarillo y mensaje; segundo click/tap dentro de 1000 ms produce flash verde y llama directamente GSCPlayerNameAudio. C√°lculos, score y tarjeta permanecen intactos. index-grupal.html y service-worker.js sincronizados.


- DIAGN√ìSTICO AISLADO AUDIO IPHONE 2026-09-22: se agrega audio-touch-test.html, una p√°gina m√≠nima sin Score Card ni service worker l√≥gico de la app, para separar recepci√≥n de click y s√≠ntesis local del iPhone. Primer toque amarillo; segundo toque dentro de 1 s verde y reproducci√≥n local. No modifica ninguna funci√≥n existente.


- DIAGN√ìSTICO P√öBLICO AUDIO IPHONE 2026-09-22: middleware.js permite exclusivamente /audio-touch-test.html como ruta p√∫blica para validar gesto y voz local sin autenticaci√≥n. No abre Score Card ni APIs privadas; s√≥lo habilita la p√°gina m√≠nima de diagn√≥stico.


- R28 MECANISMO F√çSICAMENTE APROBADO TRASLADADO A SCORE CARD 2026-09-22: se traslada literalmente el patr√≥n aprobado en audio-touch-test.html al nombre de cada jugador. Cada nombre pasa a ser un bot√≥n HTML real dentro de su TD; primer toque amarillo, segundo toque verde dentro de 1 s y s√≠ntesis local directa con window.speechSynthesis/SpeechSynthesisUtterance, priorizando voz local en espa√±ol. FRONT/BACK/TOTAL permanecen intactos y no se modifican c√°lculos, scores ni tarjeta.


- R29 CAUSA RA√çZ POINTER EVENTS 2026-09-22: se identifica la causa exacta de la falta total de reacci√≥n t√°ctil: una regla global existente `.scorecard,.summary{pointer-events:none!important}` bloqueaba todos los eventos dentro de la Score Card, incluidos nombres y botones de audio. Se conserva el bloqueo general de la tarjeta y se habilita `pointer-events:auto!important` exclusivamente para `.player-name[data-audio-player="1"]` y `.player-audio-button`. Se mantiene sin cambios el mecanismo f√≠sicamente aprobado: primer toque amarillo, segundo verde + voz local. C√°lculos, scores y dem√°s celdas permanecen bloqueados e intactos.


- R30 MANUAL + AUDIO POR VUELTA + TECLADO HOLE IN ONE 2026-09-22: el audio individual por doble toque queda segmentado por vuelta. En hoyos 1‚Äì9 lee s√≥lo IN hasta el hoyo actual; en hoyos 10‚Äì18 lee s√≥lo OUT desde el hoyo 10 hasta el hoyo actual, sin volver a sumar 1‚Äì9. FRONT/BACK/TOTAL conservan sus res√∫menes completos. manual.html explica amarillo‚Üíverde‚Üívoz, diferencia entre audio individual y botones FRONT/BACK/TOTAL, e incorpora nueva ilustraci√≥n APP_ANOTADOR_TECLADO_NUMERICO_R30.svg. El teclado 1‚Äì9 queda explicitado y protegido para que 1 siempre exista por Hole in One.


- R31 AUDIO SEGMENTO ACTUAL + TOTAL SEG√öN ORDEN REAL 2026-09-22: el doble toque individual usa la cronolog√≠a real de scores mediante updatedAt, por lo que funciona si la ronda comienza por hoyo 1 o por hoyo 10. En la primera vuelta jugada lee s√≥lo esa vuelta hasta el hoyo actual. En la segunda vuelta jugada lee dos bloques: vuelta actual parcial y acumulado total de toda la ronda hasta ese punto. Ejemplo salida por 10 y luego hoyo 4: primero 1‚Äì4; despu√©s total 10‚Äì18 + 1‚Äì4. Archivos modificados: index-grupal.html, manual.html, service-worker.js.


- R32 SYNTAX FIX TECLADO 2026-09-22: se corrigen caracteres literales \\n introducidos accidentalmente en index-grupal.html al proteger las teclas 1‚Äì9. Se sustituyen por saltos de l√≠nea JavaScript reales. No cambia la l√≥gica de audio R31, el teclado 1‚Äì9, el manual ni los c√°lculos. Archivo modificado: index-grupal.html.


- R33 MANUAL PARITY TOKENS 2026-09-22: manual.html restaura exactamente los r√≥tulos contractuales FRONT ¬∑ 1 - 9, BACK ¬∑ 10 - 18 y TOTAL ¬∑ 1 - 18 exigidos por scripts/manual-screen-parity-gate.mjs, conservando √≠ntegra la explicaci√≥n nueva de audio por doble toque y la pantalla del teclado num√©rico con 1 para Hole in One. Archivo modificado: manual.html.


- R34 TECLADO 1-9 CONTRACT FIX 2026-09-22: index-grupal.html mantiene el n√∫mero 1 obligatorio para Hole in One y estructura el teclado manual en tres filas expl√≠citas [1,2,3], [4,5,6], [7,8,9], satisfaciendo test-stableford-manual.mjs sin modificar l√≥gica de audio, scores ni c√°lculos. Archivo modificado: index-grupal.html.


- R35 AUDIO M√ÅS DIRECTO 2026-09-22: index-grupal.html elimina de la lectura individual las frases ‚Äúprimera vuelta‚Äù, ‚Äúsegunda vuelta‚Äù y ‚Äúvuelta actual‚Äù. El primer bloque dice √∫nicamente ‚ÄúHasta el hoyo N‚Äù y conserva la m√©trica del segmento actual; en hoyos 10‚Äì18 calcula s√≥lo 10‚ÜíN. Si ya se est√° jugando la segunda mitad cronol√≥gica de la ronda, agrega ‚ÄúAcumulado total hasta el hoyo N‚Äù con todos los hoyos jugados. Archivo modificado: index-grupal.html.


- R35 REDACCI√ìN AUDIO HASTA HOYO ACTUAL 2026-09-22: index-grupal.html ahora identifica expl√≠citamente la vuelta en la lectura individual: ‚ÄúPrimera vuelta hasta el hoyo N‚Äù o ‚ÄúSegunda vuelta hasta el hoyo N‚Äù. Cuando corresponde el segundo bloque, dice ‚ÄúAcumulado total de la ronda hasta el hoyo N‚Äù. Ambos bloques nombran el mismo hoyo actual, por ejemplo hoyo 13. service-worker.js sincroniza el release R35. Archivos modificados: index-grupal.html, service-worker.js.


- R36 AUDIO NOMBRE PRIMERO 2026-09-22: index-grupal.html cambia exclusivamente el orden de la narraci√≥n individual para comenzar por el jugador. Primera vuelta: ‚ÄúJaime, hasta el hoyo 5. Gross‚Ä¶, Neto‚Ä¶, resultado‚Ä¶‚Äù. Segunda vuelta: ‚ÄúJaime, segunda vuelta hasta el hoyo 13‚Ä¶‚Äù y despu√©s acumulado total cuando corresponde. manual.html documenta el mismo lenguaje. service-worker.js sincroniza el release R36 para actualizaci√≥n f√≠sica. Archivos modificados: index-grupal.html, manual.html, service-worker.js.


- R37 AUDIO INDIVIDUAL UNIFORME 2026-09-22: index-grupal.html elimina ‚Äúprimera vuelta‚Äù y ‚Äúsegunda vuelta‚Äù de la narraci√≥n individual. La voz siempre comienza ‚Äú[Jugador], hasta el hoyo N‚Ä¶‚Äù. Si ya existe una mitad anterior jugada, agrega despu√©s ‚ÄúAcumulado total‚Ä¶‚Äù. Funciona igual para salida por hoyo 1 o por hoyo 10. manual.html se alinea con la misma f√≥rmula. service-worker.js sincroniza release R37. Archivos modificados: index-grupal.html, manual.html, service-worker.js.


- R38 CIERRE AUTOM√ÅTICO DE VUELTAS 2026-09-22: restaura el disparador autom√°tico por orden real de juego. Al completar el primer bloque de 9 hoyos anuncia ‚ÄúResultados totales de la primera vuelta‚Äù para todos los jugadores. Al completar el segundo bloque anuncia primero ‚ÄúResultados de la segunda vuelta‚Äù y, inmediatamente despu√©s, ‚ÄúResultados totales‚Äù de los 18 hoyos. Funciona igual comenzando por el hoyo 1 o por el 10. No modifica el audio individual por doble toque ni su acumulado. Archivos: index-grupal.html, service-worker.js y prueba de regresi√≥n R38.

- R39 TECLADO 0/X + REARME DE CIERRE 2026-09-22: agrega 0 al teclado manual para registrar ‚Äúno jug√≥ ese hoyo‚Äù como omisi√≥n v√°lida; agrega X para borrar/corregir el score seleccionado. Corrige adem√°s el rearme de las banderas firstSegment/secondSegment de R38: si se borra un score que rompe una vuelta ya anunciada, al volver a completarla se vuelve a disparar el resumen autom√°tico. Conserva intacto el audio individual y el acumulado aprobado.

- R40 REPRODUCCI√ìN AUTOM√ÅTICA DE CIERRE 2026-09-22: corrige la ruta manual del teclado. applyLiteralScores ahora conserva el registro normal silencioso, pero si recordScore/recordScores devuelve closure, lo reproduce mediante speakClosure. Esto hace que al completar nuevamente el √∫ltimo score del primer bloque de 9 hoyos se anuncien los resultados de la primera vuelta; al cerrar el segundo bloque reproduce segunda vuelta y resultados totales. Tambi√©n alinea el rearme tras fallo de voz con firstSegment/secondSegment. No modifica teclado, c√°lculos ni audio individual.

- R41 VERSI√ìN VISIBLE EN CABECERA 2026-09-22: muestra en la esquina superior derecha de la ronda el n√∫mero de versi√≥n real derivado del meta gscg-release. Si la app est√° al d√≠a muestra ‚ÄúVERSI√ìN R41‚Äù; si detecta una publicaci√≥n m√°s nueva muestra ‚ÄúVERSI√ìN Rxx ¬∑ √öLTIMA Ryy‚Äù, para identificar inmediatamente si el iPhone est√° atrasado. El mismo n√∫mero se sincroniza con el panel de actualizaci√≥n. Conserva √≠ntegro R40: reproducci√≥n autom√°tica del cierre de primera vuelta, segunda vuelta y resultados totales.

- R42 POSICI√ìN DE VERSI√ìN EN CABECERA 2026-09-22: mueve el indicador visible de versi√≥n por encima de ‚ÄúRonda en curso‚Äù, alineado a la derecha y con 17 px, el mismo tama√±o de fuente usado por fecha/hora. No modifica audio, teclado, c√°lculos ni navegaci√≥n.

- R43 AUDITOR√çA COMPLETA DE RUTA DE SCORE 2026-09-22: endurece selecci√≥n de jugador objetivo del teclado compartido. Cada pulsaci√≥n resuelve primero jugador activo expl√≠cito y, si el estado se perdi√≥ tras render/navegaci√≥n, rearma autom√°ticamente el primer jugador pendiente del hoyo. Las teclas 1-9 escriben exactamente ese entero y nunca pasan por el parser de omisiones; 0 es la √∫nica tecla num√©rica que registra no jug√≥/status x; X √∫nicamente borra el score del jugador activo. Despu√©s de guardar, el foco avanza al siguiente jugador pendiente, no simplemente al siguiente √≠ndice. Si todos tienen score, ninguna tecla num√©rica sobrescribe silenciosamente: se exige seleccionar jugador para corregir. Se preservan R40-R42 (audio de cierre y versi√≥n visible).

## 2026-09-22 ¬∑ ACTUAL R32 ¬∑ reparaci√≥n local de teclado sobre R43, NO APROBADA

- `index-grupal.html`: teclado completo, correcci√≥n conserva jugador, actualizaci√≥n centrada sin redise√±o.
- `service-worker.js`: identidad R48 reservada y sincronizada; no publicada.
- `scripts/build-manual-lab.mjs`: a√±ade prueba de regresi√≥n permanente al build LAB.
- `test-lab-r32-keypad-contract.mjs`: prueba ejecutable de etiquetas/valores, 0/X, 1‚Äì6 jugadores y correcci√≥n con escritor real.
- `docs/quality/LAB_R32_KEYPAD_20260922.md`: fuente, alcance, aceptaci√≥n, referencia, riesgos, evidencia, bloqueos, plan de pruebas y rollback.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`: registra defectos R43 reproducidos y estado honesto sin aprobaci√≥n f√≠sica.

Build t√©cnico PASS; 924 escrituras dirigidas PASS; autenticaci√≥n, despliegue, revisi√≥n real, audio, Intocables e inventario pendientes. Producci√≥n intacta.


### Continuaci√≥n LAB exclusiva ‚Äî regresi√≥n hist√≥rica del teclado
Comparaci√≥n local de R8, R32, R34 y R39: manualScoreEntry pasa por readGrossAt y limita las teclas 7/8/9 a 6 en par 3. R43 sustituye ese recorrido por entrada literal. Este hallazgo NO explica ni certifica resuelto el reporte f√≠sico 4‚Üí3. Se ampl√≠a test-lab-r32-keypad-contract.mjs a pares 3/4/5 y todos los hoyos 1‚Äì18. Producci√≥n prohibida; sin push ni despliegue. Prueba real de interfaz, audio y persistencia pendiente.


### LAB ‚Äî tarjeta LIVE Medal Play con puntos de otras modalidades
Reporte del propietario con capturas IMG_4724/4725. Causa comprobada en live-view.js: los totales se muestran por presencia del dato, sin filtrar modalidad; valores cero de snapshots existentes activan recuadros indebidos. Correcci√≥n exclusiva local LAB: Universales s√≥lo en mode=universales, puntos Stableford s√≥lo en mode=stableford. Prueba negativa test-lab-live-mode-summary.mjs reproduce el recuadro incorrecto en general; se incorpora al build. Sin modificaci√≥n de c√°lculos, scores, dise√±o ni datos publicados. Prueba f√≠sica/deployment pendientes; Producci√≥n intacta.


### 2026-09-22 ‚Äî acceso LAB recuperado y fallos observados en navegador real R43
La invitaci√≥n de 24 horas permiti√≥ abrir LAB en el navegador de Work. No se conserva el token en este documento. Ronda sint√©tica El Pult√© / Medal Play con PRUEBA LAB UNO‚ÄìCUATRO; no se modific√≥ Producci√≥n.

Prueba interactiva: con un jugador s√≥lo aparecen teclas 1‚Äì3 (FAIL); al completar o corregir un hoyo completo avanza al siguiente sin ENTER (FAIL); corregir UNO selecciona DOS (FAIL). Con cuatro jugadores, se tocaron individualmente 1‚Äì9 para cada jugador y se observ√≥ el valor esperado; 0 mostr√≥ X y X borr√≥ el score. El reporte Safari 4‚Üí3 no se reprodujo en este navegador, y no se declara resuelto en Safari. ENTER con casillas vac√≠as mostr√≥ FALTAN SCORES. ANTERIOR 10‚Üí9, SIGUIENTE 9‚Üí10 y l√≠mite 18 deshabilitado observados. Tarjeta digital abierta; resultado cero muestra E. Compartir desde tarjeta y ronda no produjo enlace/confirmaci√≥n visible en esta sesi√≥n: pendiente, no PASS. Audio, todas las modalidades/campos, inicio por 10 y revisi√≥n integral siguen pendientes.

Correcci√≥n local adicional: applyManualScoreEntries usa keepManualHole en applyLiteralScores, manteniendo el hoyo de la entrada al guardar; ENTER y navegaci√≥n conservan sus controles. Se mantiene el comportamiento predeterminado de otras rutas y l√≥gica de audio. Test de regresi√≥n ahora simula una rutina que propone el siguiente hoyo y exige conservar el seleccionado. Se actualiza la aserci√≥n est√°tica Stableford para el nuevo contrato. Build LAB completo PASS; control t√©cnico, no certificaci√≥n f√≠sica. Candidato no desplegado: conector de despliegue no disponible y pesta√±as de Vercel siguen en login. Ning√∫n push para evitar despliegues vinculados al proyecto de Producci√≥n.

Evidencia en docs/quality/lab-r43-browser/: teclado incompleto, tarjeta digital y avance indebido. Estado integral FAIL / NO CERTIFICADO. Pr√≥ximo paso pendiente: publicar exclusivamente proyecto golf-sc-gt-lab cuando exista canal autenticado de despliegue y repetir f√≠sicamente la matriz completa sobre la versi√≥n publicada.


### Barrido interactivo ampliado ‚Äî 2026-09-22, R43 publicado
Trabajo exclusivo en LAB mediante navegador real y controles visibles; no inspecci√≥n de c√≥digo como certificaci√≥n. Rondas sint√©ticas. Producci√≥n intacta.

- Match Play: registro, actualizaci√≥n y tarjeta digital abiertos. Resultado hoyo 1 UNO 1 UP / DOS 1 DOWN; TRES 1 DOWN / CUATRO 1 UP. Captura muestra MEN√ö invadiendo extremo del encabezado largo (FAIL visual).
- Four Ball: registro, actualizaci√≥n y tarjeta digital abiertos. Mejor neto de equipos 3 contra 3, encabezado EVEN. Prueba parcial, no toda la modalidad.
- Universales: tarjeta digital abierta. Hoyo completo con netos 3/4/4/3 produjo puntos 5/1/1/5 = 12. Prueba parcial.
- Skins: resumen de registro indic√≥ NET/empate acumula/Q10; despu√©s de actualizar apareci√≥ Medal Play Normal sin resumen Skins en tarjeta. Posteriormente bot√≥n Skins apareci√≥ en nueva ronda Stableford y abri√≥ panel SKINS ¬∑ RESULTADO EN VIVO vac√≠o. Fallos observados, causa pendiente; capturas preservadas.
- Stableford Country Club categor√≠a B blancas: dos jugadores sint√©ticos, captura iniciada en hoyo 10. Con dos jugadores teclado s√≥lo 1‚Äì6: faltan 7/8/9/0/X (FAIL). Se ingresaron mediante botones todos los 18 hoyos, en orden 10‚Äì18 y 1‚Äì9, gross 4 para UNO y 5 para DOS. Totales visibles UNO 36+36=72, puntos17+18=35; DOS45+45=90, puntos8+9=17. Cada hoyo le√≠do en UI. Autoavance persiste. ENTER en18 permaneci√≥18, no llev√≥ a1 pese al orden jugado.
- Audio: bot√≥n BACK mostr√≥ Segunda vuelta para el tramo10‚Äì18 jugado primero. Despu√©s inform√≥ No hay una voz local en espa√±ol disponible en este navegador. Cierre mostr√≥ texto de puntos/vueltas/totales. No reproducci√≥n audible certificada.
- Tarjeta final Stableford abierta. FINALIZAR RONDA dej√≥ RONDA CERRADA y controles de edici√≥n deshabilitados. ENVIAR TARJETA DIGITAL mostr√≥ IMAGEN PNG DESCARGADA ¬∑ ADJ√öNTALA EN WHATSAPP. Contenido del archivo descargado a√∫n sin inspecci√≥n; no se envi√≥ a terceros.
- Nueva ronda y regreso al registro funcionaron. Pr√°ctica San Isidro abri√≥ seis espacios y teclado completo. Nombre/handicap opcional editados; blancas carg√≥6470yardas. Texto de audio anterior Stableford qued√≥ visible en nueva pr√°ctica (FAIL contenido residual).
- Bloqueo: la llamada que intentaba anotar4 en pr√°ctica San Isidro y despu√©s cambiar ronda no devolvi√≥ resultado. No se afirma que esas acciones finales terminaran. Intento de comprobar pesta√±as tampoco respondi√≥. Se interrumpieron esperas; no reset ni accesos alternos. √öltimo estado confirmado: pr√°ctica San Isidro.

NO COMPLETADO / NO CERTIFICADO100%. Pendientes: completar todos los campos/marcas/modalidades y combinaciones, dem√°s rondas completas/correcciones/cierres, recepci√≥n LIVE, revisar PNG descargado, audio audible y Safari f√≠sico. Correcciones locales R48 no desplegadas, por lo tanto esta evidencia corresponde a R43. Pr√≥xima acci√≥n: recuperar respuesta del navegador y retomar pr√°ctica San Isidro, despu√©s Mayan/Hacienda/AltaVista/LaReuni√≥n y restante matriz. No sustituir pendientes por pruebas de c√≥digo.


### Continuaci√≥n f√≠sica R43 ‚Äî recuperaci√≥n del navegador y campos pendientes
Control del navegador recuperado reiniciando su sesi√≥n de control; acceso invitado LAB conservado. Producci√≥n intacta. La llamada anterior hab√≠a alcanzado nueva ronda, aunque no hab√≠a devuelto respuesta.

Apertura interactiva de Score Card de pr√°ctica y selecci√≥n BLANCAS: Mayan Golf par72, yardas3319+3376=6695; Hacienda Nueva par72,3286+3430=6716; Alta Vista par71,3146+3238=6384; La Reuni√≥n par72,3050+3227=6277. Datos observados en UI; no cotejo con tarjetas oficiales externas ni aprobaci√≥n de todos los c√°lculos. La Reuni√≥n muestra Course Rating0.0 y Slope0: no validado. Capturas conservadas.

EMPEZAR NUEVA RONDA desde pr√°ctica repetidamente abri√≥ formulario Stableford (flujo ven√≠a de Stableford). ATR√ÅS permiti√≥ registro general. Texto de audio de la ronda cerrada persist√≠a en nuevas pr√°cticas. En historial apareci√≥ la ronda oficial Stableford V1; tocarla no abri√≥ detalle, aun tras nueva observaci√≥n. FAIL funcional de apertura en esta sesi√≥n.

MEN√ö abri√≥ y llev√≥ al monitor LIVE. Torneo DEMOSTRACI√ìN muestra17grupos/67jugadores; filtro FEMENINA abri√≥ detalle. Seguir FEMENINA01 y abrir FAVORITOS mostr√≥ tarjeta individual Gross15/Neto9/resultado-3, sin recuadro Universales. B√∫squeda FEMENINA01 mediante campo y Enter devolvi√≥ jugador/grupo13/3de18/neto9. S√≥lo datos de demostraci√≥n, no certificaci√≥n de compartici√≥n de una ronda real. Favorito de demostraci√≥n a√±adido en esta sesi√≥n de prueba. √öltima pantalla: BUSCAR en monitor LAB, resultado FEMENINA01.

Cobertura sigue parcial: aperturas por todos los campos disponibles ya observadas entre los recorridos, pero no toda combinaci√≥n campo/modalidad/marca/jugadores/hoyos. Persisten fallos de UI, historia, navegaci√≥n, audio y publicaci√≥n. Audio audible bloqueado por ausencia de voz local; Safari f√≠sico no disponible. Correcciones R48 sin publicar; no se afirma100% recorrido ni100% aprobado. Siguiente: resolver fallos locales, publicar s√≥loLAB cuando se recupere canal de despliegue, repetir matriz f√≠sica y obtener recepci√≥n realLIVE/PNG.


### Continuaci√≥n visible ‚Äî teclado seis jugadores e historial corregido
LAB publicado R43. En pr√°ctica La Reuni√≥n, hoyo1, se seleccion√≥ expresamente cada jugador1‚Äì6 y se tocaron1,2,3,4,5,6,7,8,9,0,X. Se observaron66 resultados mediante controles reales:1‚Äì9 exactos;0 muestraX;X borra. No es prueba Safari ni aprobaci√≥n general. ENTER vac√≠o mostr√≥ FALTAN SCORES. Completar seis gross4 avanz√≥ al hoyo2 sinENTER. Volver con ANTERIOR y corregir jugador3 a7 volvi√≥ a avanzar al2: FAIL confirmado.

LIVE demostraci√≥n: seguir grupo13 produjo sus cuatro tarjetas; favorito individual se mantuvo adicionalmente. MEN√ö/MI SCORE CARD volvi√≥ a la ronda de pr√°ctica. Captura guardada.

RECTIFICACI√ìN DEL INFORME DE HISTORIAL: el c√≥digo vigente requiere doble toque, por lo que la observaci√≥n previa de un toque sin apertura NO demuestra fallo funcional. Prueba real dblclick abri√≥ pesta√±a4 titulada Tarjeta Global Stableford ¬∑ B. Se retira el diagn√≥stico anterior de que no abre. Inspecci√≥n posterior rechazada expl√≠citamente por pol√≠tica del navegador: protocolo blob no permitido; s√≥lohttp/https. No se intent√≥ eludir ni obtener el mismo contenido por otra superficie. Contenido de esa tarjeta guardada permanece SIN INSPECCI√ìN; no aprobado.

Causa de nueva ronda desde pr√°ctica localizada en index-grupal.html: handler usa isStablefordRound()||sfEmergency; sfEmergency conserva el arranque anterior incluso tras pasar a pr√°ctica. En esta continuaci√≥n no se modific√≥ ese c√≥digo ni se despleg√≥. Pendientes anteriores permanecen. Prueba f√≠sica100% bloqueada para tarjeta blob y audio audible; publicaci√≥nLAB sigue pendiente; Producci√≥n intacta.


### Correcciones locales pendientes de publicaci√≥n ‚Äî 22 septiembre 2026
Instrucci√≥n m√°s reciente del propietario sustituye el criterio cronol√≥gico anterior: 1‚Äì9 SIEMPRE primera vuelta; 10‚Äì18 SIEMPRE segunda vuelta. Se corrigen las etiquetas del cierre autom√°tico conservando detecci√≥n de orden y acumulados; reintento tras fallo de voz rearma el segmento correspondiente. Prueba t√©cnica con ambos inicios pasa y exige no anunciar total antes de 18 hoyos completos. No se ha escuchado ni certificado f√≠sicamente esta correcci√≥n.
NUEVA RONDA ya usa modalidad actual sin arrastrar sfEmergency de una sesi√≥n anterior; regresi√≥n t√©cnica pasa.
Captura IMG_4734 aportada por propietario confirma MEN√ö sobre ATR√ÅS en historial m√≥vil. Se reserva espacio superior en panel de historial para pantallas estrechas, sin cambiar botones. Ajuste local pendiente de despliegue y verificaci√≥n visual m√≥vil. LAB real sigue R43. Producci√≥n intacta. No hay certificaci√≥n100% ni aprobaci√≥n integral.

Prueba interactiva adicional en LAB R43: b√∫squeda inexistente muestra estado vac√≠o; filtro Match Play muestra vac√≠o; Stableford + Country Club recupera ronda de prueba; ATR√ÅS cierra historial y MEN√ö abre su di√°logo. Vista ancha solamente, no certifica ausencia de traslapes m√≥vil. Build t√©cnico completo con prueba de vueltas actualizada: PASS.


### Recorrido visible adicional ‚Äî gu√≠a y navegaci√≥n
En LAB R43 real se abrieron la gu√≠a desde MEN√ö, Control manual, INICIO, VER √çNDICE y MI RONDA mediante controles de interfaz. Se mostraron capturas durante el recorrido. Regreso preserv√≥ La Reuni√≥n pr√°ctica y selecci√≥n hoyo2; consulta de hoyo1 confirm√≥ seis scores 4,4,7,4,4,4. Hoyo18: SIGUIENTE deshabilitado; ENTER sin scores mostr√≥ FALTAN SCORES. ANTERIOR18‚Üí17 y SIGUIENTE17‚Üí18 comprobados. Evidencia: docs/quality/lab-r43-browser/lab-r43-enter18-visible.jpg. No implica revisi√≥n de todas las hojas del manual ni certificaci√≥n m√≥vil. Correcciones locales a√∫n no publicadas.


### Correcci√≥n local tras inspecci√≥n de tarjeta digital ‚Äî hoyo10
En LAB R43, pr√°ctica La Reuni√≥n: 4‚Üí4 y correcci√≥n4‚Üí8 en jugador1/hoyo10; jugador3 recibi√≥6, 0 mostr√≥X y X borr√≥; posterior4 mostr√≥4. Correcci√≥n num√©rica sigue desplazando selecci√≥n al siguiente jugador (fallo ya registrado). Timer paus√≥ en00:57:48 y mantuvo valor; se reanud√≥. RONDA ACTUAL volvi√≥ a la ronda sint√©tica El Pult√© Medal Play; VER MI TARJETA abri√≥ tarjeta digital. Se observ√≥ alias UNO/DOS/TRES/CUATRO sobre yardaje en hoyo10. Evidencia lab-r43-digital-hole10-overlap.jpg. Causa: alias con posici√≥n absoluta y altura16px dentro de celda de yardaje. Ajuste local: alias pasa a flujo normal bajo yardaje, conservando tipograf√≠a/colores; afecta tarjeta principal y clon digital. Build t√©cnico PASS; pendiente publicar s√≥lo LAB y repetir inspecci√≥n visual. No certificado f√≠sicamente el arreglo ni aprobaci√≥n integral.


### Continuaci√≥n 23 septiembre UTC ¬∑ revisi√≥n y solicitud de actualizar LAB
- Base local: bc30ad9, rama lab/r32-keypad-20260922. Usuario ordena actualizar LAB; Producci√≥n principal sigue prohibida.
- Navegador conserv√≥ tarjeta digital El Pult√© Medal Play con cuatro jugadores sint√©ticos. ATR√ÅS retir√≥ controles de tarjeta digital del DOM; captura inmediata todav√≠a mostr√≥ la vista anterior, por lo que no se certifica el retorno visual con esa captura.
- Intento de abrir confirmaci√≥n BORRAR RESULTADOS DE ESTA RONDA termin√≥ en timeout del navegador; di√°logo y captura tampoco respondieron. No se confirm√≥ borrado. Nueva pesta√±a del mismo LAB recuper√≥ ronda R43 y hoyo1 con scores 4,5,5,5. Hoyo2 registrado por botones con 4,5,5,5 avanz√≥ autom√°ticamente a3 sin ENTER: defecto R43 sigue presente. No se complet√≥ la ronda.
- Evidencias: docs/quality/lab-r43-browser/lab-continuacion-20260923.jpg y docs/quality/lab-r43-browser/lab-recuperado-20260923.jpg. Son capturas nativas de navegador, no l√°minas maestras 4K ni prueba de iPhone.
- node scripts/project-quality-gate.mjs PASS documental. node scripts/build-manual-lab.mjs PASS completo, incluidas 12474 escrituras del teclado y etiquetas fijas 1‚Äì9 primera /10‚Äì18 segunda. No equivalen a certificaci√≥n f√≠sica.
- Conector Vercel get_project confirm√≥ proyecto golf-sc-gt-lab prj_0KNTWUoiCiA3amKZQPDNNkWYFDbp, team_1gp3ey5lFtej25mk0XqhaPcD. √öltimo intento del proyecto dpl_2x2rSLyVc1J9nVFVPJrQACUr5BtE est√° ERROR; navegador sigue R43.
- deploy_to_vercel devuelve McpServerError: Tool deploy_to_vercel not found. VERCEL_TOKEN y autenticaci√≥n CLI no disponibles. No se hizo push ni deployment. El panel web permanece en login.
- BLOQUEO de publicaci√≥n: falta canal autenticado de escritura. Se solicita autorizaci√≥n para recurrir al panel web tras fallo del conector, conforme al l√≠mite de fallback del navegador. Siguiente: acceso seguro al panel, publicar exclusivamente candidato LAB, esperar READY, actualizar sesi√≥n y retomar pruebas de interfaz. No pedir contrase√±as/tokens por chat.
- Archivos del registro: docs/quality/LAB_R32_KEYPAD_20260922.md, ROADMAP_OVERALL.md, ROADMAP_A_DETALLE.md y las dos capturas anteriores. Correcciones funcionales existentes sin cambio. Estado NO PUBLICADO / NO CERTIFICADO.
- R44 CONTRATO √öNICO DE CAPTURA DE SCORE 2026-09-22: crea score-entry-contract.js como sem√°ntica compartida: 1-9 = gross exacto, 0 = no jug√≥/status x, X = borrar. index-grupal.html consume el contrato y desacopla f√≠sicamente las cuatro filas del teclado del n√∫mero de jugadores usando rowCount=max(jugadores,4), por lo que 0/X siempre aparecen con 1-6 jugadores. Medal Play, Match Play, Four Ball, Universales y Stableford integrado heredan el mismo motor principal. stableford-torneo.html, √∫nica Score Card independiente detectada con manejador propio, se alinea al mismo contrato compartido.

- R45 POSICIONES FIJAS MEN√ö / ACTUALIZAR 2026-09-22: corrige traslape de controles flotantes. MEN√ö queda anclado arriba a la derecha en su posici√≥n aprobada; ACTUALIZAR queda anclado inmediatamente debajo con top independiente y z-index separado. Ninguno depende del layout de cabecera ni desplaza al otro. Conserva √≠ntegro R44 y el contrato √∫nico de Score Cards.

- R46 BLOQUEO DE POSICI√ìN M√ìVIL ACTUALIZAR 2026-09-22: elimina overrides m√≥viles heredados que mov√≠an ACTUALIZAR a right:58px/right:22px y top +12px. Toda la app usa una sola coordenada contractual: MEN√ö arriba a la derecha; ACTUALIZAR debajo, con safe-area y posici√≥n fija. No depende de cabecera, n√∫mero de jugadores, overlay ni modalidad.

- R47 CORRECCI√ìN SIN AUTOAVANCE 2026-09-22: cuando el usuario toca una casilla con score existente se activa correctionMode. X borra s√≥lo ese score y mantiene el mismo jugador seleccionado. Al ingresar el score corregido, el foco permanece en esa misma casilla; el usuario puede seleccionar y corregir varios jugadores del mismo hoyo. ENTER es el √∫nico control que avanza al siguiente hoyo. La captura normal de un hoyo nuevo conserva el avance entre jugadores pendientes. Se preserva R46 de ACTUALIZAR fijo bajo MEN√ö.


### Integraci√≥n completa pendiente de publicar ¬∑ 23 septiembre 2026
- Orden: incluir correcciones anteriores a revisi√≥n f√≠sica, especialmente teclado desfasado; entregar inventario con comprobaci√≥n dentro de app.
- Merge incremental de main remoto 053d0e9 (R44‚ÄìR47) sobre LAB 9aea174; nunca push a main ni cambio a Producci√≥n. Se preservan ambas historias y reparaciones locales R48.
- R44 contrato compartido 1‚Äì9/0/X y cuatro filas independientes de cantidad de jugadores; R45/R46 ACTUALIZAR fijo bajo MEN√ö sustituye centrado local anterior; R47 correcci√≥n mantiene jugador. Se conserva bloqueo de ronda cerrada, restauraci√≥n tras fallo, sin callback diferido, hoyo manual hasta ENTER, vueltas fijas, modalidad nueva ronda y ajustes historial/alias.
- score-entry-contract.js agregado a cach√© offline. Build LAB incorpora cuatro pruebas R44‚ÄìR47. Test independiente Stableford reemplaza expectativa obsoleta raw===X con ejecuci√≥n de manejador real: 1‚Äì9, 10/18/30, 0, X, vac√≠o e inv√°lidos sin p√©rdida. Build completo PASS, 12474 escrituras motor principal; no certifica geometr√≠a ni iPhone/audio.
- Acceso Google a Vercel logrado. Revisi√≥n autom√°tica rechaz√≥ bot√≥n Skip securing my account por efecto de seguridad no autorizado. No se eludi√≥. Posterior node_repl falla exec-server transport disconnected. Publicaci√≥n BLOQUEADA; no push ni deployment realizados. √öltima versi√≥n LAB observada R43; R48 s√≥lo candidato local.
- Inventario verificable: docs/quality/LAB_CORRECCIONES_PENDIENTES_20260923.md. Pendientes f√≠sicos/otros defectos separados; no se anuncian resueltos.


### R48 subida y READY ¬∑ activaci√≥n LAB pendiente
Autorizaci√≥n espec√≠fica recibida: omitir por ahora configuraci√≥n2FA. Bot√≥n Skip securing my account ejecutado; aviso resuelto. Push CLI rechazado por falta de credenciales; conector GitHub autenticado subi√≥43 blobs. √Årbol remoto05d34494c76b3385fed46aa12386e224a359e8ad id√©ntico al candidato local7b6d8fe. Commit remoto4ae6240f0c94b3f294107775e13092b52e685682, rama lab/r48-integrated-review-20260923; main intacta.
Vercel LAB gener√≥ dpl_8eRqD6uqUD545r3aaUwPqsvJuUfd, READY confirmado mediante conector. Preview https://golf-sc-gt-hhcgnbnvm-epgcaddys-projects.vercel.app abre acceso privado; no se certific√≥ tarjeta en ese origen.
Activaci√≥n dominio golf-sc-gt-lab.vercel.app pendiente: panel ofrece Force Promote to Production dentro del proyecto LAB, reconstruye con entorno LAB y expl√≠citamente exige omitir requisitos Lint y TypeCheck. No se puls√≥ confirmaci√≥n Promote to Production. Solicitar autorizaci√≥n espec√≠fica para omitir esos dos requisitos; no cambiar configuraci√≥n ni main. Build t√©cnico completo PASS no equivale al estado de esos checks. Dominio habitual a√∫n no actualizado por esta tarea.


### R48 PUBLICADA EN LAB ¬∑ confirmaci√≥n final
Usuario autoriz√≥ omitir Lint/TypeCheck para activar exclusivamente LAB. Se confirm√≥ Promote sobre despliegue dpl_8MxdkZ8GDztr6fyWd7SX2RRGaaKs, commit4ae6240; conector confirma READY y alias golf-sc-gt-lab.vercel.app. Proyecto principal no modificado.
Navegador habitual retuvo R43 en cach√©; ACTUALIZAR termin√≥ abriendo MEN√ö en esa p√°gina antigua. URL index-grupal.html?release=R48 carg√≥ VERSI√ìN R48 y conserv√≥ ronda de prueba. Captura lab-r48-publicada.jpg.
Prueba interactiva R48: hoyo1 jugador UNO corregido4‚Üí8‚Üí4 sin reselecci√≥n; score final4, dem√°s jugadores5/5/5, hoyo1 conservado. Esto confirma destino de correcci√≥n y permanencia de hoyo en ese caso. No equivale a certificaci√≥n integral/iPhone/audio. Inventario de correcciones aplicadas corresponde al candidato ahora publicado; pendientes Skins/audio residual/La Reuni√≥n siguen pendientes.


### R49 ¬∑ correcciones directas tras revisi√≥n visible R48
- Usuario pide continuar toda aplicaci√≥n mediante interacci√≥n visible, manteniendo Vercel abierto. No se ofrece garant√≠a f√≠sica iPhone sin dispositivo.
- Medal digital R48 abierta: resumen INFORMACI√ìN DE RONDA, sin PUNTOS UNIVERSALES en DOM. Prueba nueva de artefactos global/personal Medal con campos heredados Universales confirma ausencia de puntos ajenos; no hab√≠a defecto reproducido en esos artefactos.
- R49 local: refresca juegos laterales tambi√©n tras render Stableford; limpia audio/cancela cola √∫nicamente al cambiar ID de ronda; refresca vista principal antes de clonar tarjeta digital; etiqueta Skins expl√≠cita en anotador; La Reuni√≥n configured=false y plantilla sin datos oficiales, bloquea abrir tarjeta digital pendiente.
- Service Worker corrige regex de release aprobada; en HTML antiguo coloca ACTUALIZAR al pie fuera de MEN√ö, sin alterar posici√≥n de versi√≥n actual. Regresi√≥n ejecuta funci√≥n real contra HTML R43 y actual. Conserva sesi√≥n y datos.
- Pruebas nuevas test-lab-round-view-reset.mjs y test-lab-update-recovery.mjs PASS. Build LAB PASS antes de √∫ltimos guards; se ejecutar√° candidato completo. Pendiente publicaci√≥n R49 LAB y recorridos en navegador; no producci√≥n principal.


### R49 READY en dominio LAB ‚Äî revisi√≥n interactiva bloqueada por acceso
Publicado b2c528435528e2a2f65e5951d4aec7b2914b77a0 (√°rbol id√©ntico localddcd726). Preview dpl_7WuNs96S7WgB2zWjfKM5eVad9PZC READY; rebuild dominio LAB dpl_C2aB1p8tkpkRQLKJoWT1r1LZpmGb READY con alias golf-sc-gt-lab.vercel.app confirmado. Se mantuvo sesi√≥n Vercel abierta; proyecto principal intacto.
Antes de verificar R49, pesta√±a LAB redirigi√≥ a access.html y solicita ENTRAR COMO PROPIETARIO. No se atribuye causa exacta sin prueba. Requiere autenticaci√≥n segura del propietario para continuar pruebas reales; no se elude el acceso. Pendientes: recuperaci√≥n ACTUALIZAR desde versi√≥n anterior, cambio de modalidad/tarjeta digital, Skins, audio residual, La Reuni√≥n y resto de matriz completa. R49 NO CERTIFICADA integralmente. Pruebas t√©cnicas PASS; revisi√≥n visible posterior publicaci√≥n pendiente. Rollback LAB: dpl_8MxdkZ8GDztr6fyWd7SX2RRGaaKs R48.

Autenticaci√≥n segura solicitada y enviada; respuesta visible de LAB: NO SE PUDO VERIFICAR LA CUENTA PROPIETARIA. No prueba contrase√±a incorrecta ni causa concreta. Se detuvo repetici√≥n de inicio de sesi√≥n tras primer fallo gen√©rico conforme a control-browser. Sesi√≥n Vercel abierta.


### R50 ¬∑ reporte propietario: cierre hoyo9 no anunci√≥ Justi
Captura IMG_4742 muestra cuatro gross5 en hoyo9; propietario oy√≥ s√≥lo tres resultados. No hay evidencia de hoyos1‚Äì8 ni del audio para atribuir causa final. C√≥digo confirma exclusi√≥n silenciosa de jugador si cualquier hoyo del segmento es0/statusx. Se sustituye silencio por nombre y hoyo(s) sin jugar, sin inventar total completo.
Reproducci√≥n larga se divide en bloques de hasta180 caracteres por oraci√≥n; s√≥lo se resuelve √©xito despu√©s de todos los bloques. Error/interrupci√≥n sigue false para rearmar anuncio. Prueba ejecuta transporte real simulado con cuatro nombres incluyendo Justi, conserva texto completo y prueba fallo intermedio. No certifica audibilidad en iPhone.
Prueba test-lab-closure-all-players.mjs cubre cuatro jugadores completos y Justi con omisi√≥n previa. Pendiente publicar LAB y reproducci√≥n real; login propietario contin√∫a bloqueado.


## R50 ‚Äî publicaci√≥n LAB confirmada
Despliegue dpl_BJ53UK8UfYERZMRcvSUHspCJnEY4 READY, alias golf-sc-gt-lab.vercel.app, commit remoto e68b219ed57459d98ddeee626a253b080cfa91f5. Incluye R49 y cierre hablado de todos los jugadores. Build y pruebas t√©cnicas PASS; recorrido integral y audio iPhone pendientes. Acceso de propietario rechazado con mensaje gen√©rico; Vercel sigue abierto. Detalle: docs/quality/LAB_R50_RECORRIDO_PENDIENTE.md. Proyecto principal sin cambios.


## R51 ‚Äî recorrido real de torneos y simplificaci√≥n
Acceso temporal recuperado por invitaci√≥n del propietario; token no guardado. R50 inspeccionada mediante Chrome remoto. FAIL reproducidos: volver desde Favoritos oculta Mis torneos; formulario de enlace y navegaci√≥n siguen visibles fuera de contexto por especificidad CSS; avisos de validaci√≥n ocultos; mismo jugador duplicado por seguimiento individual/grupo; ranking de favoritos depende del filtro previo; Compartir LIVE informa s√≥lo en panel oculto.
Correcciones: live-hub.html, live-hub.js, live-control.js. Portal restablece clases; .hidden prevalece sobre layout; estado visible; favoritos deduplicados con ranking general y detalle desplegable conservado entre refrescos; t√≠tulo de b√∫squeda real; ADJUNTAR RONDA EN VIVO y campo etiquetado; Compartir abre panel visible con enlace y organizaci√≥n accesible. C de Campeonato se conserva por referencia previa aprobada.
Test test-lab-tournament-navigation.mjs incorporado a scripts/build-manual-lab.mjs. index-grupal.html y service-worker.js identifican R51. Documentaci√≥n anterior R50 READY preservada en docs/quality/LAB_R50_RECORRIDO_PENDIENTE.md y docs/quality/LAB_R32_KEYPAD_20260922.md. R51 pendiente build, publicaci√≥n LAB y verificaci√≥n de arreglo en navegador. Main intacta; rollback LAB R50 dpl_BJ53UK8UfYERZMRcvSUHspCJnEY4. No certificaci√≥n integral ni iPhone.


## R51 verificada / siguiente correcci√≥n de torneos en curso
R51 READY en LAB: dpl_m2s9GRLkqaQxJqDgftZ43uam2Kn1, remoto f91319071846b4d30890ddab6fb4ee092624f15c. Navegador real: ACTUALIZAR R50‚ÜíR51 PASS; panel compartir visible PASS; espectador LIVE PASS; adjuntar grupo de cuatro jugadores PASS; Favoritos‚ÜíMis torneos PASS; FEMENINA01 sin duplicaci√≥n PASS. No certificaci√≥n integral.
FAIL: crear torneo devuelve503/42703, falta live_tournaments.mode. Consulta de s√≥lo lectura encuentra ronda sint√©tica en Neon main, no rama lab-auth-shortcuts. No se modifica esquema compartido. Pendiente confirmar conexi√≥n y preparar migraci√≥n aislada.
Correcci√≥n local: live-control.js conserva mensajes de acci√≥n frente a refrescos autom√°ticos; error42703 expl√≠cito. live-hub.js distingue categor√≠a vac√≠a de torneo no abierto y demo de datos reales. Pendiente pruebas y publicaci√≥n de estas correcciones posteriores a R51.

Correcci√≥n solicitada por propietario sobre IMG_4745: CSS compartido ocultaba HOYO y GROSS a‚â§800px. Override local restaura todas las celdas del monitor, conserva jugador fijo al desplazarse y compacta acciones; barra de vistas separada de MEN√ö. Medal Play elimina PUNTOS y rotula RESULTADO. Orden score relativo ascendente y cantidad de hoyos descendente conservado; falta verificaci√≥n publicada.

Validaci√≥n local posterior: test-lab-medal-monitor.mjs PASS (Medal sin puntos, columnas esenciales, desempate9‚Üí6‚Üí3 y mensaje de error persistente); integrado al build LAB. project-quality-gate PASS y build-manual-lab PASS. A√∫n sin publicar esta correcci√≥n; prueba visual posterior pendiente.

Candidato R52 LAB-MEDAL-MONITOR-20260923-R52: index-grupal.html y service-worker.js actualizados para entrega verificable por ACTUALIZAR. Incluye correcciones del monitor y avisos LIVE; no incluye migraci√≥n de base de datos ni certificaci√≥n integral.

R52 READY confirmado en dpl_2zdrX6Tt1aFSWBYDcPFQMb9wQT5x, alias LAB; navegador abre VERSI√ìN R52. Monitor demo muestra Gross/Neto/Hoyo/Resultado sin Puntos; empate ‚àí4 ordena hoyo15 antes de12. Inspecci√≥n visual revela prioridad espacial pendiente: correcci√≥n posterior mueve Hoyo/Gross/Neto/Resultado antes de categor√≠a/grupo/modalidad. Sin certificaci√≥n integral.

Regresi√≥n reportada IMG_4747: Compartir LIVE abr√≠a administraci√≥n por openLivePanel inicial introducido R51 y heredado R52. Correcci√≥n: llamada nativa directa; cancelar no abre panel; fallback de copia/error mantiene aviso visible. Prueba de navegaci√≥n actualizada para impedir reca√≠da. Pendiente nueva publicaci√≥n.

R53 LAB-SHARE-DIRECT-20260923-R53: compartir directo, monitor con informaci√≥n principal primero; prueba test-lab-share-direct.mjs integrada en build, cubre √©xito y cancelaci√≥n nativa sin panel ni copia. index-grupal.html y service-worker.js versionados. No resuelve migraci√≥n de torneos ni certifica todos los recorridos.

R53 READY dpl_HfxvLB4tijTnkXzjmP2eE3Qo8sLr; ACTUALIZAR R52‚ÜíR53 probado conserva jugadores/hoyo3. Revisi√≥n real Compartir usa fallback copia en Chrome y a√∫n muestra administraci√≥n; NO aprobado ese flujo. R54 LAB-SHARE-FEEDBACK-20260923-R54 corrige tambi√©n fallback y errores: aviso transitorio accesible encima de ronda, sin abrir administraci√≥n. live-control.js, prueba test-lab-share-direct.mjs y releases index/service-worker. Pendiente publicarR54 y verificar fallback real.
Punto de continuidad: docs/quality/LAB_R53_RECORRIDO_PENDIENTE.md.

## R54 publicada y verificaci√≥n posterior
READY dpl_NymL823VReiLxbkvDcmfZ9nt37dD, alias golf-sc-gt-lab.vercel.app, remoto f8b12e1a49c0538c3e00f6e8c9501f7cbc13e03e; √°rbol bbbb043becca90785cd3f8f15ebcb6ef2220d5a0. ACTUALIZAR R53‚ÜíR54 PASS en navegador; comparte por copia y permanece RONDA EN CURSO sin dialog administrativo, aviso ENLACE LIVE COPIADO visible y captura emitida. Ronda sint√©tica conserva hoyo3. Test nativo/cancelaci√≥n simulado PASS, iOS nativo no probado remotamente. Monitor publicado: datos esenciales preceden categor√≠a/grupo/modalidad. Revisi√≥n integral contin√∫a pendiente, incluyendo creaci√≥n torneos503/42703 y reglas por otras modalidades.

Revisi√≥n posterior R54: FAIL reproducido Stableford (3puntos antes de4 por ordenar relativo al par). Correcci√≥n local live-hub.js suma stablefordPoints, usa puntos descendentes para Stableford/Universales y hoyos completados descendentes en empate; comparador com√∫n para general/categor√≠as. Medal conserva relativo al par ascendente. Pendiente pruebas y entrega.

IMG_4748 demuestra que tabla horizontal sigue ocultando datos al desplazarse. Correcci√≥n local live-hub.js etiqueta sem√°nticamente celdas; live-hub.html muestra filas como tarjetas m√≥viles a‚â§800px con nombre, hoyo, Gross, Neto y resultado juntos sin desplazamiento horizontal; conserva tabla de escritorio y seguimiento persona/grupo. Pendiente prueba visual y entrega.

Aclaraci√≥n propietario IMG_4748: Hoyo/Gross/Neto se ven bien; desplaz√≥ tabla para se√±alar elementos a borrar. Se retira adaptaci√≥n m√≥vil no publicada y se conserva tabla R54. Correcci√≥n matem√°tica Stableford permanece local; pendiente precisar elementos a quitar.

Orden expl√≠cita propietario: quitar s√≥lo columnas GRUPO y MODALIDAD del monitor. live-hub.js elimina encabezados y celdas de esas dos columnas; conserva categor√≠a y seguimiento, incluidos datos de grupo internos para +GRUPO. Prueba test-lab-medal-monitor.mjs comprueba exclusi√≥n y conservaci√≥n.

R55 LAB-MONITOR-COLUMNS-20260923-R55 versionada en index-grupal.html/service-worker.js. Incluye eliminaci√≥n Grupo/Modalidad y clasificaci√≥n Stableford por puntos; test-lab-stableford-ranking.mjs incorporado al build. Sin redise√±o m√≥vil. Pendiente publicaci√≥n y verificaci√≥n de columnas en navegador.

R55 READY dpl_6p3gDD9AAHCXsRs7tPTaKLW9Roos, alias LAB, remoto d6a28277f0e080fbbb1b737447f68gm;ﬂÀhëÈÏ∂ªßq´^u’±Ö…•ºÅŸ•Õ•â±îÅ‰Åçï…ºÅ…ï≈’ïÕ–ΩÕÖ±•ëÑÅÖπ—•ç•¡ÖëÑ∏ÅI’—ÑÅëîÅïπ—…ÖëÑÅÕΩ±•ç•—ÖëÑÅïÃÅ•πëï‡µù…’¡Ö∞π°—µ∞˝•π•ç•ºÙƒôÖççΩ’π–Ùƒ∞ÅπºÅ¡Ω…—Ö∞∏Å1Ωù•∏Å°Öâ•—’Ö∞ÅÕ•ù’îÅ¡ïπë•ïπ—îÅëîÅÕïÕßÕ∏Å…ïÖ∞ÏÅπºÅ•πŸïπ—Ö»ÅÖ±•ÖÃΩçΩ……ïºÅπ§ÅçÖµâ•Ö»Åç…ïëïπç•Ö±ïÃ∏)…ç°•ŸΩÃËÅÅÖ’—†µùÖ—îπ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµù’ïÕ–µÖççΩ’π–µïπ—…‰πµ©ÕÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}1%Y}Hƒ–ÿΩù’ïÕ–µâ’•±êπ±ΩùÄ∞ÅÅI=5A}=YI10πµëÄ∞ÅÅI=5A}}Q11πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄ∏ÅA…Ωë’ççßÕ∏Å•π—Öç—Ñ∏(((ååÅHƒ–ÿÉ
‹ÄÃ¿º¿‰º»¿»ÿÄ¿‰Ë‘‘Å’Ö—ïµÖ±ÑÉ
‹Å…ïù…ïÕºÅëîÅIïù•Õ—…ºÅ‰Å—Ω…πïºÄ°8ÅUIM<§(¥Å…ç°•ŸΩÃËÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅ—ïÕ–µ±Öàµ…ïù•Õ—…Ö—•Ω∏µ…ï—’…∏µÕ—Ö—îπµ©ÕÄ∞ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄ∏(¥ÅÖ±±ºÅÖ±çÖπÎÃÅÖ∞Å¡…Ω¡•ï—Ö…•ºËÅÖ∞Å…ïù…ïÕÖ»ÅÑÅIïù•Õ—…ºÅÕîÅï±•µ•πÑÅï∞ÅâΩ……ÖëΩ»ÏÅ…ïÖ»Å—Ω…πïºÅπÖŸïùÑÅÕ•∏ÅçÖ¡—’…ÑΩŸÖ±•ëÖçßÕ∏Åô•πÖ∞∏(¥ÅΩ……ïççßÕ∏Å±ΩçÖ∞ËÅπÖŸïùÖçßÕ∏Å•π•ç•Ö∞Ω…ïù…ïÕºÅçΩπÕï…ŸÑÅâΩ……ÖëΩ»Å‰Å…ΩπëÑÅÖç—•ŸÑÏÅ±•µ¡•ïÈÑÅ¡ï…µÖπïçîÅï∏Å9UYÅI=9Ω	=IIH∏Å…ïÖ»Å—Ω…πïºÅçÖ¡—’…ÑÅŸÖ±Ω…ïÃÅŸ•Õ•â±ïÃÅ‰ÅÕ•πç…Ωπ•ÈÑÅçΩ∏ÅŸÖ±•ëÖçßÕ∏ÅÖπ—ïÃÅëîÅÕÖ±•»∏(¥ÅŸ•ëïπç•ÑÅY4ËÅëΩÃÅ©’ùÖëΩ…ïÃÅ‰ÅÕçΩ…ïÃÅÕΩâ…ïŸ•Ÿï∏ÅÑÅ…ïù…ïÕºÏÅΩ…ëï∏ÅçÖ¡—’…ÑΩÕ•πç…Ωπ•ÈÖçßÕ∏Ω¡ï…Õ•Õ—ïπç•ÑΩπÖŸïùÖçßÕ∏ÏÅ…ïù•Õ—…ºÅ•πçΩµ¡±ï—ºÅπºÅπÖŸïùÑ∏Å9ºÅï≈’•ŸÖ±îÅÑÅ…ïŸ•ÕßÕ∏ÅõµÕ•çÑ∏(¥ÅIïôï…ïπç•ÖÃÅ…ïç’¡ï…ÖëÖÃËÅQΩ…πïΩÕ|¿≈}π—…ÖëÖ}Â}IïÕ’±—ÖëΩÃπ¡πúÅ‰ÅQΩ…πïΩÕ|¿—}5Ö¡Ö}ëï}AÖπ—Ö±±ÖÃπ¡πú∏ÅMîÅ•πÕ¡ïçç•ΩπÖ…Ω∏ÅÖµâÖÃÅ•∑ÖùïπïÃÅÖ¡…ΩâÖëÖÃÏÅπºÅÕîÅ…ïïµ¡±ÖÈÑÅÕ‘Åë•Õó≈º∏(¥ÅAïπë•ïπ—ïÃÅâ±Ω≈’ïÖπ—ïÃËÅ—…ÖÕ¡ÖÕºÅëï∞Åù…’¡ºÅÖ∞ÅïŸïπ—º∞ÅëΩâ±îÅçÖ¡—’…ÑÅ…ï¡Ω…—ÖëÑ∞ÅÖççïÕºÅ°Öâ•—’Ö∞∞Å…ïçΩ……•ëºÅÖ’—ïπ—•çÖëºÅ‰Å…ïŸ•ÕßÕ∏Å•ëÑΩ…ïù…ïÕºÅï∏ÅπÖŸïùÖëΩ»ÏÅπºÅïπ—…ïùÑÅ•π—ïù…Ö∞Åπ§Å¡’â±•çÖçßÕ∏Åô•πÖ∞∏ÅA…Ωë’ççßÕ∏Å•π—Öç—Ñ∏(¥ÅQïÕ–Å°•Õ”Õ…•çºÅ—ïÕ–µÿÃÿ‡µçÖπΩπ•çÖ∞µ°Ωµîµïπ—…‰πµ©ÃÅôÖ±±ÑÅ¡Ω»ÅÕ—Ö…—}’…∞ÄΩ¡›Ñµ±Ö’πç†π°—µ∞ÅŸ•ùïπ—îÅçΩπ—…ÑÅï·¡ïç—Ö—•ŸÑÅÖπ—•ù’ÑÄΩ•πëï‡µù…’¡Ö∞π°—µ∞˝ÕΩ’…çîı¡›ÑÏÅπºÅÕîÅÖ±—ïÀÃÅµÖπ•ôïÕ–Åπ§ÅÕîÅ¡…ïÕïπ”ÃÅïÕîÅ—ïÕ–ÅçΩµºÅAML∏((åååÅHƒ–ÿÉ
‹ÄÃ¿º¿‰º»¿»ÿÄƒ¿Ë¿ƒÅ’Ö—ïµÖ±ÑÉ
‹ÅçΩπï·ßÕ∏Åëï∞Åù…’¡ºÄ°±ΩçÖ∞§(¥ÅÅ•πëï‡µù…’¡Ö∞π°—µ±ÄËÅÖπ—ïÃÅëîÅπÖŸïùÖ»ÅŸÖ±•ëÑÅ•ëïπ—•ëÖêÅçïπ—…Ö∞Å‰ÅçÖ—ïùΩÀµÖÃ∞ÅçΩπÕï…ŸÑÅ’∏ÅâΩ……ÖëΩ»Å—ïµ¡Ω…Ö∞Å±•ùÖëºÅÖ∞ÅèÕë•ùºÅëîÅç’ïπ—ÑÏÅÕ•∏ÅÖççïÕºÅ¡ï…µÖπïçîÅï∏ÅIïù•Õ—…º∏(¥ÅÅ±•Ÿîµ°’àπ©ÕÄËÅ…ïç’¡ï…ÑÅïÕîÅâΩ……ÖëΩ»ÅœÕ±ºÅ¡Ö…ÑÅ±ÑÅµ•ÕµÑÅç’ïπ—ÑÅÖ’—ïπ—•çÖëÑ∞Å¡…ïçÖ…ùÑÅçÖµ¡ºΩµΩëÖ±•ëÖêÅ‰Åïπ€µÑÅ©’ùÖëΩ…ïÃΩù…’¡ºÅÖ∞ÅïÕç…•—Ω»ÅΩô•ç•Ö∞ÅÅÖ¡§Ω¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄÏÅœÕ±ºÅï±•µ•πÑÅï∞Å—…ÖÕ¡ÖÕºÅëïÕ¡◊•ÃÅëîÅç…ïÖçßÕ∏Åï·•—ΩÕÑ∏(¥ÅÅ—ïÕ–µ±Öàµ…ïù•Õ—…Ö—•Ω∏µ…ï—’…∏µÕ—Ö—îπµ©ÕÄËÅAMLÅëîÅô’πç•ΩπïÃÅ…ïÖ±ïÃÅï·—…áµëÖÃÄ°Y4§∞ÅçΩπÕï…ŸÖçßÕ∏∞ÅŸÖ±•ëÖçßÕ∏∞ÅΩ…ëï∏ÅëîÅπÖŸïùÖçßÕ∏∞Åç’ïπ—ÑÅë•ôï…ïπ—îΩÖªÕπ•µºΩ)M=8Å•π€Ö±•ëº∏(¥Å	’•±êÅçΩµ¡±ï—ºÅ¡ï…ô•∞Å1ËÅAML∞ÅÄΩ—µ¿Ω»ƒ–ÿµçΩππïç—ïêµ…ïù•Õ—…Ö—•Ω∏µâ’•±êπ±ΩùÄ∏(¥Å9ÖŸïùÖëΩ»Å…ïÖ∞ÅÕΩâ…îÅò»–ÕïàƒËÅQΩ…πïΩÃÉäHÅ…ïÖ»Å—Ω…πïºÉäHÅçï……Ö»ÉäHÅYï»ÅMçΩ…ïÃ∞ÅïÕ—ÖëºÅÕ•∏ÅïŸïπ—ΩÃÅŸ•Õ•â±î∏ÅÃÅ±ÑÅŸï…ÕßÕ∏Å¡’â±•çÖëÑÅÖπ—ï…•Ω»∞Å9<ÅïŸ•ëïπç•ÑÅŸ•Õ’Ö∞ÅëîÅïÕ—ÖÃÅçΩ……ïçç•ΩπïÃÅ±ΩçÖ±ïÃ∏(¥Å	±Ω≈’ïÖπ—ïÃÅëîÅïπ—…ïùÑÅ¡ï…µÖπïçï∏ËÅÖççïÕºÅ°Öâ•—’Ö∞ÅπºÅ…ïÕ’ï±—º∞Å…ïçΩ……•ëºÅÖ’—ïπ—•çÖëºÅ‰Å…ïŸ•ÕßÕ∏ÅõµÕ•çÑÅ•A°ΩπîÏÅÖÕ•ùπÖçßÕ∏ÅëîÅµÖ…çÖÃÅÖ∞Å…ïÖâ…•»Å—Ö…©ï—ÑÅ‰ÅçΩπï·ßÕ∏ΩçΩ……ïççßÕ∏ÅëîÅÕçΩ…ïÃÅ…ï≈’•ï…ï∏Å…ïŸ•ÕßÕ∏∏Å9ºÅ¡’â±•çÖçßÕ∏Åô•πÖ∞Åπ§Äƒ¿¿î∏((åååÅHƒ–ÿÉ
‹ÄÃ¿º¿‰º»¿»ÿÄƒ¿Ë¿ÃÅ’Ö—ïµÖ±ÑÉ
‹ÅµÖ…çÖÃÅçΩπÕï…ŸÖëÖÃ(¥Å…ç°•ŸΩÃËÅÅÖ¡§Ω}±•àΩ¡ï…ÕΩπÖ∞µïŸïπ–µÖççïÕÃπ©ÕÄ∞ÅÅ¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄ∞ÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅ—ïÕ–µ±Öàµ…ïù•Õ—…Ö—•Ω∏µ…ï—’…∏µÕ—Ö—îπµ©ÕÄ∏Å∞ÅïÕç…•—Ω»ÅçΩπÕï…ŸÑÅµÖ…çÖÃÅΩ¡ç•ΩπÖ±ïÃÅ€Ö±•ëÖÃÏÅ—Ö…©ï—ÑÅÖÕ•ùπÖëÑÅ’ÕÑÅ±ÖÃÅµÖ…çÖÃÅù’Ö…ëÖëÖÃÏÅ…ïÖÕ•ùπÖçßÕ∏ÅçΩπÕï…ŸÑÅ±ÖÃÅï·•Õ—ïπ—ïÃ∏(¥ÅAMLÅ¡…’ïâÑÅY4Å‰ÅπΩ…µÖ±•ÈÖëΩ»ÅΩô•ç•Ö∞ÅëîÅµÖ…çÖÃ∏ÅAMLÅÅ—ïÕ–µ¡ï…ÕΩπÖ∞µïŸïπ–µ¡ï…µ•ÕÕ•ΩπÃπµ©ÕÄÅâÖÕîÅÖ•Õ±ÖëÑÄ°•πŸ•—ÖçßÕ∏ÅÖ”Õµ•çÑ∞Å¡ï…µ•ÕΩÃ∞Å…ïŸΩçÖçßÕ∏∞Åç•ï……îÅ‰ÅçÖ¡Öç•ëÖê§∏Å9ºÅÕïÕßÕ∏Å…ïÖ∞Åπ§Å…ïŸ•ÕßÕ∏ÅõµÕ•çÑÅÕ’Õ—•—’•ëÖÃÅ¡Ω»Åô•·—’…ïÃ∏((åååÅHƒ–ÿÉ
‹ÄÃ¿º¿‰º»¿»ÿÄƒ¿Ë¿‘Å’Ö—ïµÖ±ÑÉ
‹ÅIïù•Õ—…ºÉäHÅ…ΩπëÑÅ¡…•ŸÖëÑ(¥ÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅ¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµ…ïù•Õ—…Ö—•Ω∏µ…ï—’…∏µÕ—Ö—îπµ©ÕÄËÅçÖ¡—’…ÑÅ‰ÅŸÖ±•ëÑÅï∞Åù…’¡ºÅŸ•Õ•â±îÏÅç…ïÖçßÕ∏Å¡…•ŸÖëÑÅ…ïç•âîÅ©’ùÖëΩ…ïÃ∞ÅçÖµ¡ºÅ‰ÅµΩëÖ±•ëÖêÅëï∞ÅIïù•Õ—…º∏Å9ºÅ¡’â±•çÑÅ’πÑÅ…ΩπëÑÅô•ç—•ç•ÑËÅëïÕ¡◊•ÃÅëîÅç…ïÖ»ÅÖâ…îÅ±ÑÅ—Ö…©ï—ÑÅ¡Ω»Åµïµâ…ïœµÑÅçΩµ¡…ΩâÖëÑÅï∏ÅÕï…Ÿ•ëΩ»ÏÅçΩπï·ßÕ∏ÅΩô•ç•Ö∞ÅïÕ¡ï…ÑÅ±ÑÅ—Ö…©ï—ÑÅ•π•ç•ÖëÑ∏(¥ÅAMLÅÅ—ïÕ–µ¡ï…ÕΩπÖ∞µô…Ωπ–µïπêπµ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµ¡…•ŸÖ—îµ…Ω’πëÃπµ©ÕÄÅ‰Å°Öπë±ï»Å…ïÖ∞Åï·—…áµëºÅëîÅIïù•Õ—…º∏Å9ÖŸïùÖëΩ»ÅÖ’—ïπ—•çÖëºÅ¡ïπë•ïπ—îÏÅA…Ωë’ççßÕ∏Å•π—Öç—Ñ∏((åååÅHƒ–ÿÉ
‹ÄÃ¿º¿‰º»¿»ÿÄƒ¿Ëƒ¿Å’Ö—ïµÖ±ÑÉ
‹Å¡’π—ºÅëîÅ…ïç’¡ï…ÖçßÕ∏ÅÕ•∏Åïπ—…ïùÑ(¥ÅÅ—ïÕ–µ±Öàµ—Ω’…πÖµïπ–µπÖŸ•ùÖ—•Ω∏πµ©ÕÄËÅ…ïïµ¡±ÖÈÖëÑÅï·¡ïç—Ö—•ŸÑÅ—ï·—’Ö∞ÅΩâÕΩ±ï—ÑÅç…ïÖ—ïA…•ŸÖ—î°…Ω’πê§Å¡Ω»Åï©ïç’çßÕ∏Åëï∞Å°Öπë±ï»Å…ïÖ∞ÅçΩ∏Å…ΩπëÑÅÖπ—ï…•Ω»Åë•Õ—•π—ÑÅëï∞Åù…’¡ºÅÖç—’Ö∞ÏÅAMLÅçΩπÕï…ŸÖçßÕ∏Åëï∞ÅIïù•Õ—…ºÅÖç—’Ö∞∏(¥Å	’•±êÅçΩµ¡±ï—ºÅ¡ï…ô•∞Å1ÅAMLÅÄΩ—µ¿Ω»ƒ–ÿµ¡…•ŸÖ—îµ…ïù•Õ—…Ö—•Ω∏µâ’•±êπ±ΩùÄ∏(¥Å…ç°•ŸΩÃÅÖë•ç•ΩπÖ±ïÃÅëï∞Åâ±Ω≈’îËÅÅÖ¡§Ω}±•àΩ¡ï…ÕΩπÖ∞µïŸïπ–µÖççïÕÃπ©ÕÄ∞ÅÅ¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄ∞ÅÅ±•Ÿîµ°’àπ©ÕÄ∞ÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµ…ïù•Õ—…Ö—•Ω∏µ…ï—’…∏µÕ—Ö—îπµ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµ—Ω’…πÖµïπ–µπÖŸ•ùÖ—•Ω∏πµ©ÕÄ∞ÅÅÖ’—†µùÖ—îπ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµù’ïÕ–µÖççΩ’π–µïπ—…‰πµ©ÕÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}1%Y}Hƒ–ÿΩI=II%=}I%MQI=|»¿»ÿ¿‰Ã¿πµëÄ∏(¥Å9ÖŸïùÖëΩ»Å¡’â±•çÖëºÅò»–ÕïàƒËÅ…ïÖ»Å—Ω…πïºΩçï……Ö»ΩYï»ÅMçΩ…ïÃΩŸΩ±Ÿï»ÅÑÅMçΩ…îÅÖ…êÏÉÈ±—•µºÅ…ïù…ïÕºÅ…ïë•…•ùîÅÑÅÖççïÕÃπ°—µ∞Å¡Ω»ÅÖ’Õïπç•ÑÅëîÅÕïÕßÕ∏∏Å1ÖÃÅçΩ……ïçç•ΩπïÃÅ±ΩçÖ±ïÃÅáÈ∏ÅπºÅ¡’â±•çÖëÖÃÅπ§Å…ïŸ•ÕÖëÖÃÅŸ•Õ’Ö±µïπ—î∏(¥ÅÖ¡—’…ÖÃÅëï∞Å¡…Ω¡•ï—Ö…•ºÅ%5|‘Ã‘ƒπ¡πúÅîÅ%5|‘Ã‘»π©¡ïúÅ•πÕ¡ïçç•ΩπÖëÖÃÅëïÕëîÅÖë©’π—ΩÃÅÖ’—Ω…•ÈÖëΩÃËÅïπ—…ÖëÑÅï∏ÅQΩ…πïΩÃÅ‰ÅIïù•Õ—…ºÅâÖ©ºÅ•πŸ•—ÖçßÕ∏Å—ïµ¡Ω…Ö∞∞Å…ïÕ¡ïç—•ŸÖµïπ—î∏Å9ºÅ¡…’ïâÖ∏ÅÖ’—ïπ—•çÖçßÕ∏Å°Öâ•—’Ö∞∏(¥Å	1=EU<ÅœÕ±ºÅï∞Å…ïçΩ……•ëºÅÖ’—ïπ—•çÖëºËÅπºÅÕïÕßÕ∏Å€Ö±•ëÑÅï∏ÅπÖŸïùÖëΩ»ÏÅ•ëïπ—•ô•çÖëΩ»Å°•Õ”Õ…•çºÅù’Ö…ëÖëºÅπºÅŸ•πç’±ÖëºÅëîÅôΩ…µÑÅŸï…•ô•çÖëÑÅçΩ∏Åç’ïπ—ÑÅÖç—’Ö∞∏Å9ºÅ•πŸïπ—Ö»ÅÖ±•ÖÃ∞ÅçΩπ—…ÖÕó≈ÑÅπ§ÅÖççïÕº∏ÅIïŸ•ÕßÕ∏ÅõµÕ•çÑÅ•A°ΩπîÅπºÅ…ïÖ±•ÈÖëÑ∏ÅA…Ωë’ççßÕ∏Å•π—Öç—ÑÏÅπºÅïπ—…ïùÑÅô•πÖ∞∞ÅπºÄƒ¿¿î∞ÅπºÅ¡’â±•çÖçßÕ∏ÅëîÅçΩ……ïçç•ΩπïÃÅÕ•∏ÅïÕÑÅŸï…•ô•çÖçßÕ∏∏((åååÅHƒ–ÿÉ
‹ÄÃ¿º¿‰º»¿»ÿÄƒ¿Ë»¿Å’Ö—ïµÖ±ÑÉ
‹ÅçΩµ¡Ö…ÖçßÕ∏Åï·Öç—ÑÅHƒ»‡∏ƒ‡(¥ÅIïôï…ïπç•ÑÅÖ¡Ω…—ÖëÑÅ¡Ω»Å¡…Ω¡•ï—Ö…•ºËÅHƒ»‡∏ƒ‡∞ÅçΩµµ•–ÅÅî¡îƒ≈ÑÂÄ∞Å…ï±ïÖÕîÅAI=UQ%=8¥»¿»ÿ¿‰»ÿµHƒ»‡∏ƒ‡∏ÅΩµ¡Ö…ÖëΩÃÅÅÖ¡§ΩÖççΩ’π–π©ÕÄ∞ÅÅÖ¡§Ω}±•àΩÖççΩ’π–µÖ’—†π©ÕÄ∞ÅÅÖ¡§Ω}±•àΩÖ¡¿µÖççïÕÃπ©ÕÄ∞ÅÅÖ¡§ΩÖ¡¿µÖççïÕÃπ©ÕÄ∞ÅÅµ•ëë±ï›Ö…îπ©ÕÄ∞ÅÅÖççïÕÃπ°—µ±ÄÏÅΩ…•ùï∏ÅëîÅÖ’—Ω…•ÈÖçßÕ∏ÅëîÅ¡…Ω¡•ï—Ö…•ºÅ¡ï…µÖπïçîÅ•ù’Ö∞Å‰ÅπºÅÕîÅçÖµâßÃÅçΩπ—…ÖÕó≈ÑÅπ§Å¡…ΩŸïïëΩ»∏(¥ÅΩπô•ù’…ÖçßÕ∏ÅÖç—’Ö∞Å±óµëÑÅÕ•∏ÅçÖµâ•ΩÃËÅ1Å¡ÖÕÕ›Ω…ëA…Ω—ïç—•Ω∏ÅëïÕÖç—•ŸÖëºÏÅMM<ÅÖ±±}ï·çï¡—}ç’Õ—Ωµ}ëΩµÖ•πÃ∏ÅYÖ…•Öâ±ïÃÅëîÅ•π—ïù…ÖçßÕ∏Å‰ÅA}=]9I}UMI}%ÅœÕ±ºÅï∏Åïπ—Ω…πºÅA…Ωë’ç—•Ω∏Åëï∞Å¡…ΩÂïç—ºÅ1ÏÅA…ïŸ•ï‹Åïµ¡±ïÑÅçΩπô•ù’…ÖçßÕ∏Å¡…ïëï—ï…µ•πÖëÑÅëï∞ÅèÕë•ùº∏Å9ºÅÕïç…ï—ΩÃÅ…ïŸï±ÖëΩÃ∏(¥Åïôïç—ºÅÖë•ç•ΩπÖ∞Å•ëïπ—•ô•çÖëºËÅÖ’—†µùÖ—îπ©ÃÅëÖâÑÅ¡…•Ω…•ëÖêÅÑÅùÕç}ù’ïÕ—}µΩëîÅÕΩâ…îÅÕïÕßÕ∏Å€Ö±•ëÑÅëîÅ¡…Ω¡•ï—Ö…•ºÅÂÑÅ…ïçΩπΩç•ëÑÅ¡Ω»Å…ïÕΩ±Ÿï¡¡ççïÕÃ∏(¥ÅÅÖ¡§ΩÖ¡¿µÖççïÕÃπ©ÕÄ∞ÅÅÖ’—†µùÖ—îπ©ÕÄËÅÕ—Ö—’ÃÅ±•µ¡•ÑÅçΩΩ≠•ïÃÅ—ïµ¡Ω…Ö±ïÃÉÈπ•çÖµïπ—îÅëïÕ¡◊•ÃÅëîÅŸï…•ô•çÖ»Å¡…Ω¡•ï—Ö…•ºÏÅç±•ïπ—îÅ…ïçÖ…ùÑÅ…’—ÑΩ≈’ï…‰ÅΩ…•ù•πÖ∞ÅœÕ±ºÅ—…ÖÃÅ±•µ¡•ïÈÑÅïôïç—•ŸÑ∞ÅÕ•∏Åâ’ç±îÅπ§Å…ïïµ¡±ÖÈºÅ¡Ω»Å•πŸ•—ÖçßÕ∏∏(¥ÅÅ—ïÕ–µ±ÖàµΩ›πï»µÕïÕÕ•Ω∏µ¡…•Ω…•—‰πµ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµù’ïÕ–µÖççΩ’π–µïπ—…‰πµ©ÕÄ∞ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄËÅAMLÅ°Öπë±ï»Å…ïÖ∞ÅîÅ•π•–ÅçΩ∏Åô•·—’…ïÃÅëîÅ¡…ΩŸïïëΩ»ËÅ¡…Ω¡•ï—Ö…•ºÅçΩπô•…µÖëº∞ÅΩ—…ÑÅç’ïπ—Ñ∞ÅçáµëÑ∞Å±•µ¡•ïÈÑÅ‰Å…ïçÖ…ùÑÅÕ•∏Åâ’ç±îÏÅ•πŸ•—ÖëºÅµÖπ—•ïπîÅ¡ï…µ•ÕΩÃÅÖπ—ï…•Ω…ïÃ∏Å9ºÅ¡…’ïâÖ∏ÅçΩπ—…ÖÕó≈ÑÅ…ïÖ∞∏(¥ÅÕ—ÖëºÅ•π—ïù…Ö∞ËÅA9%9QÅÕïÕßÕ∏Å…ïÖ∞Å‰Å…ïŸ•ÕßÕ∏ÅõµÕ•çÑÅçΩµ¡±ï—ÑÏÅ’Õ’Ö…•ºÅ°•Õ”Õ…•çºÅπºÅŸ•πç’±ÖëºÅëîÅµÖπï…ÑÅŸï…•ô•çÖâ±î∞ÅπºÅÕîÅ•πŸïπ”ÃÅÖ±•ÖÃ∏ÅA…Ωë’ççßÕ∏Å•π—Öç—Ñ∏((åååÅHƒ–ÿÉ
‹ÄÃ¿º¿‰º»¿»ÿÄƒ¿Ë»‹Å’Ö—ïµÖ±ÑÉ
‹ÅÖ±—ÑÅÖπ—ïÃÅëîÅçÖ¡—’…ÑÅ‰Å…ïôï…ïπç•ÑÅHƒ»‡∏ƒ‡(¥ÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅ±•Ÿîµ°’àπ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµ…ïù•Õ—…Ö—•Ω∏µ…ï—’…∏µÕ—Ö—îπµ©ÕÄËÅπΩµâ…îÅÂÑÅçÖ¡—’…ÖëºÅï∏ÅIïù•Õ—…ºÅ¡…ïçÖ…ùÑÅï∞ÅôΩ…µ’±Ö…•ºÏÅïπ—…ÖëÑÅQΩ…πïΩÃÅŸÖ±•ëÑÅ•ëïπ—•ëÖêÅÖπ—ïÃÅëîÅ¡ïë•»ÅëÖ—ΩÃ∏ÅAMLÅ°Öπë±ï»ÅçΩ∏Åç’ïπ—ÑÅÖ’—Ω…•ÈÖëÑÅ‰ÅπºÅÖ’—Ω…•ÈÖëÑ∏(¥ÅYï…çï∞ÅçΩπÕ’±—ÖëºÅœÕ±ºÅ±ïç—’…ÑËÅï¡úµçÖëë‰πŸï…çï∞πÖ¡¿ÅçΩ……ïÕ¡ΩπëîÅÑÅHƒ»‡∏ƒ‡∞ÅçΩµµ•–Ä‡Âåÿ—òÃ–·àŸçî…ÑÃƒƒ»ƒ‡»ƒ’å–ƒ–‡·î¿—Ñ‘‡‡¿‘Ã∞Åë¡±|…πÈ…Q∏’ô–›5`≈†—ô‹—	êÕ–Õ1‹…0ÅIdΩA…Ωë’ç—•Ω∏∏Å9ºÅµΩë•ô•çÖçßÕ∏∏Å1ÑÅÕïÕßÕ∏Åù’Ö…ëÖëÑÅëîÅïÕîÅΩ…•ùï∏ÅπºÅÕîÅ—…ÖπÕô•ï…îÅÖ’—Ω∑Ö—•çÖµïπ—îÅÑÅ±ΩÃÅëΩµ•π•ΩÃÅëîÅA…ïŸ•ï‹∏(¥ÅA…’ïâÑÅï·¡±Ω…Ö—Ω…•ÑÅÅ—ïÕ–µ±Öàµ…Ω’πêµç…ïÖ—îµµΩëÖ∞πµ©ÕÄÄ°¡ï…ô•∞Å°•Õ”Õ…•çºÅHƒ–Ã§Å%0Åï·¡ïç—Ö—•ŸÑÅëîÅÖâ…•»ÅôΩ…µ’±Ö…•ºÅÕ•∏ÅŸÖ±•ëÖ»Å•ëïπ—•ëÖê∏ÅÕîÅâÖπçºÅï·•ùîÅÖëï∑ÖÃÅA$Å±ïùÖëºÅç…ïÖ—ï}—Ω’…πÖµïπ–∞Å…ï±ïÖÕîÅHƒ–ÃÅ‰ÅIHÅY9Q<ÏÅπºÅçΩ……ïÕ¡ΩπëîÅÑÅ±ÑÅïÕ¡ïç•ô•çÖçßÕ∏ÅHƒ–‘ΩHƒ–ÿÅëîÅÖççïÕºÅ¡ï…ÕΩπÖ∞Å‰ÅâΩ—ΩπïÃÅIHÅQ=I9<ΩIHÅI=9ÅAI%Y∏Å9ºÅÕîÅïë•”ÃÅπ§ÅÕîÅ¡…ïÕïπ”ÃÅçΩµºÅAML∏Å∞Å¡ï…ô•∞ÅŸ•ùïπ—îÅ’ÕÑÅ—ïÕ–µ±Öàµ…ïù•Õ—…Ö—•Ω∏µ…ï—’…∏µÕ—Ö—î∞Å—ïÕ–µ±Öàµ—Ω’…πÖµïπ–µπÖŸ•ùÖ—•Ω∏Å‰Å¡ï…µ•ÕΩÃÅ¡ï…ÕΩπÖ±ïÃÏÅ…ïŸ•ÕßÕ∏Å…ïÖ∞Å•π—ïù…Ö∞ÅÕ•ù’îÅA9%9Q∏((åååÅHƒ–ÿÉ
‹ÄÃ¿º¿‰º»¿»ÿÉ
‹Å…ïçΩ……•ëºÅŸ•Õ•â±îÅ¡Ö…ç•Ö∞ÅëîÅçΩπÕ’±—Ñ(¥Å9ÖŸïùÖëΩ»Å…ïÖ∞Åï∏Å1Å¡’â±•çÖëºÅò»–Õïàƒ∞ÅµΩëºÅ√Èâ±•çºÅëïµºÙƒËÅÖ—ïùΩÀµÑÉäHÅôÖŸΩ…•—ºÅ5A=9Q<Ä¿ÿÉäHÅ5•ÃÅôÖŸΩ…•—ΩÃÉäHÅïπï…Ö∞ÉäHÅëΩâ±îÅ—Ω≈’îÄºÅëï—Ö±±îÄƒ‡ÅÕçΩ…ïÃÉäHÅçï……Ö»ÉäHÅQΩ…πïΩÃÉäHÅYï»ÅMçΩ…ïÃÉäHÅ…ïÖâ…•»Å—Ω…πïº∏ÅÖŸΩ…•—ºÅçΩπÕï…ŸÖëºÏÅëï—Ö±±îÅëΩÃÅâ±Ω≈’ïÃÅëîÅπ’ïŸîÅçΩ∏ÅΩ8∞ÅI=MLÅ‰Å9Q<∏ÅÖ—ΩÃÅëîÅï©ïµ¡±º∞ÅπºÅÖçï¡—ÖçßÕ∏ÅÖ’—ïπ—•çÖëÑÅπ§Å¡…’ïâÑÅõµÕ•çÑÅ•A°Ωπî∏(¥Å%0ÅΩâÕï…ŸÖëºËÅïπï…Ö∞ÅµÖπ—ïªµÑÅô•±—…ºÅ5A=9Q<Å—…ÖÃÅÖ—ïùΩÀµÑ∏ÅΩ……ïççßÕ∏Å±ΩçÖ∞ÅÕ°Ω›5Ωπ•—Ω»Åùïπï…Ö∞Å…ïÕ—Ö’…ÑÅÖ±∞Å‰Åç•ï……ÑÅëï—Ö±±îÅëîÅçÖ—ïùΩÀµÑÏÅ¡…’ïâÑÅï©ïç’—ÑÅ°Öπë±ï»Å…ïÖ∞∏ÅÈ∏Å¡ïπë•ïπ—îÅ…ïŸ•ÕßÕ∏ÅŸ•Õ’Ö∞ÅëîÅïÕ—ÑÅçΩ……ïççßÕ∏Å¡’â±•çÖëÑ∏(¥Å%0ÅŸ•Õ’Ö∞Å¡’â±•çÖëºËÅœÕ±ºÅ—…ïÃÅÖççïÕΩÃÏÅôÖ±—ÑÅ	UMHÅ)U=IL∏Å’ïπ—îÅ±ΩçÖ∞ÅçΩπ—•ïπîÅ±ΩÃÅç’Ö—…ºÅâΩ—ΩπïÃÏÅë•Õç…ï¡Öπç•ÑÅëîÅŸï…ÕßÕ∏Ω…ïç’…ÕΩÃÅ¡ïπë•ïπ—î∞ÅπºÅÕîÅëïç±Ö…ÑÅ…ïÕ’ï±—Ñ∏(¥ÅŸ•ëïπç•ÑËÄΩ›Ω…≠Õ¡ÖçîΩÕç…Ö—ç†ºÕî‰ÃŸÖâçåÂçàΩ±Öàµ»ƒ–ÿµëïµºµëï—Ö±±î¥ƒ‡µÕçΩ…ïÃπ©¡ú∏ÅIïçΩ……•ëºÅ¡…Ω—ïù•ëºÅëîÅç…ïÖçßÕ∏ΩçÖ¡—’…ÑΩ¡ï…µ•ÕΩÃÅîÅ•A°ΩπîÅ¡ïπë•ïπ—ïÃÅ¡Ω»ÅÖ’Õïπç•ÑÅëîÅÕïÕßÕ∏Å…ïÖ∞∏ÅA…Ωë’ççßÕ∏Å•π—Öç—Ñ∏((åååÄÃ¿º¿‰º»¿»ÿÉ
‹ÅïÕçïπÖ…•ºÅÕΩ±•ç•—ÖëºÅëîÅÕï•ÃÅ©’ùÖëΩ…ïÃ(¥ÅA…ï¡Ö…ÖëºÅM9I%=}M%M})U=IM|»¿»ÿ¿‰Ã¿π©ÕΩ∏ËÅç•πçºÅµÖ…çÖÃÅ€Ö±•ëÖÃ∞ÅÕï•ÃÅ©’ùÖëΩ…ïÃÅô•ç—•ç•ΩÃ∞Åç•πçºÅçÖ—ïùΩÀµÖÃÄ°Å…ï¡ï—•ëÑ§∞ÅçÖ¡—’…ÑÅ¡…ïŸ•Õ—ÑÅ ƒµ ÃÏÅŸÖ±•ëÖçßÕ∏ÅÖÕÕ•ùπïëA±ÖÂï…ÃÄ¨ÅŸÖ±•ëÖ—ïÕÕ•ùπïëΩπô•ù’…Ö—•Ω∏ÅAML∏Å9ºÅï≈’•ŸÖ±îÅÑÅ©’ùÖëΩ…ïÃÅ…ïù•Õ—…ÖëΩÃÅπ§ÅÑÅÕçΩ…ïÃÅçÖ¡—’…ÖëΩÃ∏(¥Å9ÖŸïùÖëΩ»Å¡’â±•çÖëºËÉä@ÅMçΩ…îÅÖ…êÅŸ’ï±ŸîÅÑÅÖççïÕÃπ°—µ∞ÅÖπ—ïÃÅëîÅIïù•Õ—…º∏Å	1=EU<Å…ïçΩ……•ëºÅëîÅÖ±—ÑΩ—Ö…©ï—ÑΩ—Ω…πïºΩ•πŸ•—ÖëºÅ¡Ω»ÅÖ’Õïπç•ÑÅëîÅÕïÕßÕ∏Å€Ö±•ëÑÏÅïŸ•ëïπç•ÑÄΩ›Ω…≠Õ¡ÖçîΩÕç…Ö—ç†ºÕî‰ÃŸÖâçåÂçàΩ±ÖàµÕï•Ãµ©’ùÖëΩ…ïÃµÖççïÕºµâ±Ω≈’ïÖëºπ©¡ú∏Å9ºÅç…ïÖëºÅ—Ω…πïºÅπ§ÅÖ±—ï…ÖëÑÅA…Ωë’ççßÕ∏∏(¥ÅAÀÕ·•µÑÅÖççßÕ∏Åï©ïç’—Öâ±îÅëï¡ïπë•ïπ—îËÅÖççïÕºÅÖ’—ïπ—•çÖëºÅπΩ…µÖ∞ÅëîÅ1ÏÅïπ—ΩπçïÃÅ•π—…Ωë’ç•»ÅïÕ—îÅïÕçïπÖ…•ºÅ¡Ω»ÅU$Å‰ÅŸï…•ô•çÖ»Å—ΩëÖÃÅ±ÖÃÅ…ÖµÖÃÅ‰Å…ïù…ïÕΩÃ∞ÅÕ•∏ÅÕ’Õ—•—’•…±ºÅ¡Ω»ÅëïµºÅ¡…ïçÖ…ùÖëº∏((åååÄÃ¿º¿‰º»¿»ÿÉ
‹Å…ïŸ•ÕßÕ∏ÅΩ¡ï…Ö—•ŸÑÅ©’ùÖëΩ»ÄºÅ•πŸ•—Öëº(¥Å±•Ÿîµ°’àπ©ÃËÅ—Öâ±ÑÅçΩµ¡Öç—ÑÅëï∞Å—Ω…πïºÅÖ°Ω…ÑÅµ’ïÕ—…ÑÅA=LÅçΩ∏Å…Öπ≠1Öâï∞Åëï∞ÅµΩ—Ω»Åï·•Õ—ïπ—îÄ°•πç±’ÂîÅïµ¡Ö—ïÃ§ÏÅ…ΩπëÑÅ¡Ö…—•ç’±Ö»ÅçΩπÕï…ŸÑÅÕ‘Å—…Ö—Öµ•ïπ—º∏Åï—ïç—ÖëºÅïÕçÖ¡îËÅ…Öπ≠•πúÅçÖ±ç’±ÖëºÅ¡ï…ºÅçΩ±’µπÑÅΩµ•—•ëÑ∏(¥ÅÖ—ïùΩÀµÑÅÖâ…îÅ±ÑÉÈπ•çÑÅçÖ—ïùΩÀµÑÅÖÕ•ùπÖëÑÅÑÅ±ÑÅç’ïπ—ÑÏÅù…’¡ΩÃÅµ•·—ΩÃÅçΩπÕï…ŸÖ∏ÅÕï±ïç—Ω»∞Å•πŸ•—ÖëΩÃÅçΩπÕï…ŸÖ∏ÅçÖ—ïùΩÀµÑÅïÕçΩù•ëÑ∏Åïπï…Ö∞Å‰ÅÖ—ïùΩÀµÑÅ±•µ¡•Ö∏ÅçΩπÕ’±—ÑÅÖπ—ï…•Ω»Å¡Ö…ÑÅπºÅïÕçΩπëï»Å…•ŸÖ±ïÃÅÕ•±ïπç•ΩÕÖµïπ—î∏(¥Å	’ÕçÖ»Åµ’ïÕ—…ÑÅ©’π—ºÅÖ∞Å©’ùÖëΩ»Å¡ΩÕ•çßÕ∏Å9I0Å‰ÅQ=K5ÅëïÕëîÅâ’•±ë1ïÖëï…âΩÖ…ê∞ÅÕ•∏ÅôΩ…ÈÖ»ÅÖù…ïùÖ»ÅôÖŸΩ…•—ºÅπ§ÅçÖµâ•Ö»Å¡ï…µ•ÕΩÃ∏ÅMîÅçΩπÕï…ŸÑÅùÀÖô•çÑÅï·•Õ—ïπ—îÅ‰ÅÖççïÕΩÃÅÖ¡…ΩâÖëΩÃ∞ÅÕ•∏Å¡Öπ—Ö±±ÖÃÅπ’ïŸÖÃ∏(¥Å—ïÕ–µ±Öàµ—Ω’…πÖµïπ–µπÖŸ•ùÖ—•Ω∏πµ©ÃÅï©ïç’—ÑÅ°Öπë±ï…ÃΩ…ïπëï…•ÈÖëΩ…ïÃÅ…ïÖ±ïÃËÅçÖ—ïùΩÀµÑÅÅÖÕ•ùπÖëÑ∞Å±ïç—Ω»ÅÕ•∏Å©’ùÖëΩ…ïÃ∞Å…ïù…ïÕºÅëïÕëîÅãÈÕ≈’ïëÑ∞ÅA=LÅP»Å‰ÅãÈÕ≈’ïëÑÅçΩ∏ÅëÖ—ΩÃÅëïµºΩµΩ—Ω»ÅΩô•ç•Ö∞ÅAML∏ÅA…•µï»Åç°ï≈’ïºÅëï—ïç”ÃÅçΩµ•±±ÑÅ¡ï…ë•ëÑÅï∏Åïë•çßÕ∏ÏÅçΩ……ïù•ëÑÅÖπ—ïÃÅëï∞Åâ’•±ê∞ÅπºÅ¡’â±•çÖëÑ∏(¥ÅIïŸ•ÕßÕ∏ÅπÖŸïùÖëΩ»ÅÖ’—ïπ—•çÖëºÄºÅÕï•ÃÅ©’ùÖëΩ…ïÃÅ¡Ω»ÅU$ÅáÈ∏Å	1=EUÅ¡Ω»ÅÖççïÕºÅëîÅ¡…Ω¡•ï—Ö…•º∏ÅÕ—ΩÃÅçÖµâ•ΩÃÅ±ΩçÖ±ïÃÅπºÅ¡’â±•çÖëΩÃÅπ§Å¡…ïÕïπ—ÖëΩÃÅçΩµºÅÖçï¡—ÖçßÕ∏ÅõµÕ•çÑ∏ÅIïù…ïÕºÅëîÅ—Ö…©ï—ÑÅçΩ∏ÅÕçΩ…ïÃÅ…ï≈’•ï…îÅçΩµ¡…ΩâÖ»ÅÕïÕßÕ∏Ω•ëïπ—•ëÖêΩ…ΩÕ—ï»Å…ïÖ∞ÏÅπºÅÕîÅëïç±Ö…ÑÅÖ¡…ΩâÖëº∏ÅA…Ωë’ççßÕ∏Å•π—Öç—Ñ∏()…ç°•ŸºÅëîÅïÕçïπÖ…•ºÅçΩπÕï…ŸÖëºËÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}1%Y}Hƒ–ÿΩM9I%=}M%M})U=IM|»¿»ÿ¿‰Ã¿π©ÕΩπÄÏÅ¡…ï¡Ö…ÖçßÕ∏ÅŸÖ±•ëÖëÑ∞ÅU$ÅáÈ∏Åâ±Ω≈’ïÖëÑ∏((åååÄÃ¿º¿‰º»¿»ÿÉ
‹ÅçÖ’ÕÑÅŸï…•ô•çÖëÑÅëîÅãÈÕ≈’ïëÑÅÖ’Õïπ—î(¥ÅYï…çï∞Åâ…Öπç†ÅÖ±•ÖÃÅ‰Åëï¡±ΩÂµïπ–Å•πµ’—Öâ±îÅë¡±}	çY!•AM•’1!QÈÖôÈ•-°	Uå‰Ωò»–ÕïàƒÅµ’ïÕ—…Ö∏Å—…ïÃÅçΩπ—…Ω±ïÃ∏Å=4Å…ïÖ∞ÅçΩπ—•ïπîÅ°’âM°Ω›%πë•Ÿ•ë’Ö∞ÅçΩ∏Åë•Õ¡±Ö‰ÈπΩπîËÅπºÅôÖ±±ºÅëîÅïπ±Öçî∏(¥ÅÕçΩ…ïÃµ’§πçÕÃÅΩç’±—ÖâÑÅ°’âM°Ω›%πë•Ÿ•ë’Ö∞Å‰Å°’âMïÖ…ç°IïÕ’±—Ã∞Å‰Å•µ¡ΩªµÑÅ—…ïÃÅçΩ±’µπÖÃ∏ÅΩ……ïù•ëºÅ•πç…ïµïπ—Ö±µïπ—îÅÑÅëΩÃÅçΩ±’µπÖÃΩç’Ö—…ºÅÖççïÕΩÃÅÖ¡…ΩâÖëΩÃÅ‰Å…ïÕ’±—ÖëΩÃÅŸ•Õ•â±ïÃÏÅÖ©’Õ—ÖëÖÃÅçΩ±’µπÖÃÅëï∞Åµ•ÕµºÅMçΩ…ïÃÅçΩµ¡Öç—ºÅ¡Ö…ÑÅA=LÅÕ•∏ÅÖ±—ï…Ö»Å…ΩπëÑÅ¡Ö…—•ç’±Ö»∏(¥Å—ïÕ–µ±Öàµ—Ω’…πÖµïπ–µπÖŸ•ùÖ—•Ω∏πµ©ÃÅá≈ÖëîÅ…ïù…ïÕßÕ∏ÅëîÅΩŸï……•ëîÅML∏ÅAïπë•ïπ—îÅ¡’â±•çÖçßÕ∏ÅA…ïŸ•ï‹Ω…ïŸ•ÕßÕ∏ÅŸ•Õ’Ö∞ÅëîÅçÖµâ•ΩÃÏÅÕïÕßÕ∏Å…ïÖ∞ÅÕ•ù’îÅâ±Ω≈’ïÖëÑ∏ÅA…Ωë’ççßÕ∏Å•π—Öç—Ñ∏((åååÄÃ¿º¿‰º»¿»ÿÉ
‹ÅA…ïŸ•ï‹Ä–ƒ¿ÿ¿…êÅ¡’â±•çÖëºÅ‰Å…ïçΩ……•ëºÅŸ•Õ•â±î(¥ÅIïµΩ—ºÅ…ÖµÑÅ±ÖàΩ•π—ïù…Ö∞µ…Ω’πêµ—Ω’…πÖµïπ–µ»ƒ–ÿ¥»¿»ÿ¿‰Ã¿ËÅçΩµµ•–Ä–ƒ¿ÿ¿…ê‡Ã‹ƒÃ‹≈î‘–—ÑÿÃ‹¿‡—ò¿»’çê‰›çïàÂî–»∞Å—…ïîÄ…çòÿ¡Öò¡àƒ‘Ÿëå‹–›ò––¿‹–Ãÿ—å‘‘›à‹–·ôà–‰‰ÃÅ•ì•π—•çºÅÖ∞Å±ΩçÖ∞Åò›ò‰·à‡∏Åï¡±ΩÂµïπ–Åë¡±|ÕIA°MAî’π°!’EUÈ’	Õ¿’¡’)UÅIdÏÅùΩ±òµÕåµù–¥Âùë†ÕÕîÕúµï¡ùçÖëëÂÃµ¡…Ω©ïç—ÃπŸï…çï∞πÖ¡¿∏ÅA…ïŸ•ï‹ÉÈπ•çÖµïπ—îÏÅπºÅÖ±•ÖÃÅïÕ—Öâ±îΩA…Ωë’ç—•Ω∏ΩµÖ•∏ÅµΩë•ô•çÖëΩÃ∏ÅIΩ±±âÖç¨Å…ïµΩ—ºËÅò»–Õïàƒ›ê’ò»‡¡çå‘¿¿‰–Ã’âòƒ…ÑÂåƒ›çê’ÑÕçê»ÄºÅë¡±}	çY!•AM•’1!QÈÖôÈ•-°	Uå‰∏(¥Å9ÖŸïùÖëΩ»Å…ïÖ∞ÅëïµºÙƒËÅç’Ö—…ºÅÖççïÕΩÃÅŸ•Õ•â±ïÃÏÅ	’ÕçÖ»ÅÄƒ¿ÉäHÅ9I0ÄƒÄºÅQ=K5ÄƒÉäHÅïπï…Ö∞ÅÕ•∏ÅãÈÕ≈’ïëÑÉäHÅÖ—ïùΩÀµÑÅÉäHÅëΩâ±îÅ—Ω≈’îÅëï—Ö±±îƒ‡ÅΩ8ÄºÅ¡ïπë•ïπ—ïÃƒÿ¥ƒ‡ÅŸÖèµΩÃÉäHÅçï……Ö»ÉäHÅôÖŸΩ…•—ºÅƒ¿ÉäHÅ5•ÃÅôÖŸΩ…•—ΩÃÉäHÅïπï…Ö∞∏Å=4Åô•πÖ∞ÅçÖ—ïùΩ…‰ıÖ±∞∞Å…Ω›ÃÙÿ‹∞ÅÕïÖ…ç†ÅŸÖèµº∏ÅAMLÅœÕ±ºÅçΩπÕ’±—ÑÅëïµº∏(¥ÅŸ•ëïπç•ÑËÄΩ›Ω…≠Õ¡ÖçîΩÕç…Ö—ç†ºÕî‰ÃŸÖâçåÂçàΩ±Öàµ»ƒ–ÿµâ’Õ≈’ïëÑµ…ïÕ—Ö’…ÖëÑπ©¡úÅ‰ÄΩ›Ω…≠Õ¡ÖçîΩÕç…Ö—ç†ºÕî‰ÃŸÖâçåÂçàΩ±Öàµ»ƒ–ÿµùïπï…Ö∞µç’Ö—…ºµÖççïÕΩÃµŸï…•ô•çÖëºπ©¡ú∏(¥Éä@ÅMçΩ…îÅÖ…êÅáÈ∏Å…ïë•…•ùîÅÑÅÖççïÕºÅ¡…•ŸÖëºÅ¡Ω»ÅÖ’Õïπç•ÑÅëîÅÕïÕßÕ∏Å…ïÖ∞ËÅ	1=EU<∏ÅMï•ÃÅ©’ùÖëΩ…ïÃÅëïÕëîÅ—Ö…©ï—Ñ∞ÅçÖ¡—’…ÖÃÅ¡ï…Õ•Õ—ïπ—ïÃ∞Å¡ï…µ•ÕΩÃÅçΩ∏Åç’ïπ—ÑÅîÅ•A°ΩπîÅπºÅŸï…•ô•çÖëΩÃÏÅπºÄƒ¿¿îÅπ§Åïπ—…ïùÑÅô•πÖ∞∏((åååÄÃ¿º¿‰º»¿»ÿÉ
‹Åë•ÖùªÕÕ—•çºÅÖççïÕºÅ°Öâ•—’Ö∞ÄºÅÕ•∏ÅµΩë•ô•çÖ»Åç…ïëïπç•Ö±ïÃ(¥ÅΩµ¡Ö…ÖëºÅ°•Õ—Ω…•Ö∞ÅÖççïÕÃπ°—µ∞ÅëïÕëîÅà¡ââÑ»‡Ä†¿‰º¿‰§Å‰ÅÖççΩ’π–µÖ’—†Åï∏Åî¡îƒ≈Ñ‰ËÅô±’©ºÅï·•Õ—ïπ—îÅ’ÕÑÅçΩ……ïºÄ¨ÅçΩπ—…ÖÕó≈ÑÅ‰Åï∞Åµ•ÕµºÅ¡…ΩŸïïëΩ»ÏÅπºÅ°Ö‰Å±Ωù•∏Å¡Ω»ÅπΩµâ…îÅ•µ¡±ïµïπ—Öëº∏ÅŸï…çï∞µùÖ—ï›Ö‰µÖ’—†ÅçΩ……ïÕ¡ΩπëîÅÑÅ$ÅÖ—ï›Ö‰∞ÅπºÅÖ∞Å¡…Ω¡•ï—Ö…•º∏(¥ÅIïç’¡ï…ÖçßÕ∏ÅëîÅçΩπ—ï·—ºÅçΩπô•…µÑÅΩ…ëï∏ÅëîÅπºÅ’ÕÖ»Å•πŸ•—ÖçßÕ∏Ä»—†ÅçΩµºÅÕ’Õ—•—’—ºÅ‰ÅπºÅçÖµâ•Ö»Åç…ïëïπç•Ö±ïÃÏÅπºÅ…ïç’¡ï…ÑÅ’πÑÅŸ•πç’±ÖçßÕ∏ÅŸï…•ô•çÖâ±îÅëï∞Å•ëïπ—•ô•çÖëΩ»ÅÖπ—•ù’º∏ÅMÖ±•ëÖÃÅÖπ—•ù’ÖÃÅëï∞ÅÖÕ•Õ—ïπ—îÅ≈’îÅ±ºÅçΩπô’πìµÖ∏ÅçΩ∏Å•πŸ•—ÖçßÕ∏ÅπºÅÕΩ∏ÅïŸ•ëïπç•Ñ∏(¥ÅΩπÕ’±—ÑÅœÕ±ºÅ±ïç—’…ÑÅï∏Å9ïΩ∏ÅçÖπë•ëÖ—ºÅâ»µÕµÖ±∞µµΩ’ÕîµÖÿ¡ò»—º‰ÄºÅâΩ±êµâ±Ωç¨¥‘ƒ‡ÿ–ÿ‰ƒËÅ’Õ’Ö…•ºÅëîÅ¡…Ω¡•ï—Ö…•ºÅçΩπô•ù’…ÖëºÅ—•ïπîÅπΩµâ…îÅ)Ö•µîÅ-•…Õ—îÏÅçΩµ¡Ö…ÖçßÕ∏Åï·Öç—ÑÅçΩ∏Å•ëïπ—•ô•çÖëΩ»ÅµΩÕ—…ÖëºÅ=1ÅM=IÅIP∏ÅëïŸ’ï±ŸîÅôÖ±Õî∞ÅÕ•∏ÅΩ—…ÑÅçΩ•πç•ëïπç•Ñ∏Å9ºÅÕîÅ±ïÂï…Ω∏Å°ÖÕ°ïÃ∞ÅçΩπ—…ÖÕó≈ÖÃ∞ÅÕïÕ•ΩπïÃÅπ§Å—Ω≠ïπÃÏÅπºÅïÕç…•—’…ÑÅ∏(¥Å	1=EU<ËÅëïÕçΩπΩç•ëºÅï∞ÅëΩµ•π•ºΩ∑•—ΩëºÅÖ∞Å≈’îÅçΩ……ïÕ¡ΩπëîÅ±ÑÅïπ—…ÖëÑÅù’Ö…ëÖëÑÅëîÅ•A°Ωπî∏ÅÖ±—ÑÅµï—ÖëÖ—ºÅπºÅÕïç…ï—ºÅëï∞ÅÕ•—•ºÅù’Ö…ëÖëºÏÅπºÅ•πŸïπ—Ö»ÅÖ±•ÖÃ∞ÅπºÅ…ïÕ—Öâ±ïçï»ÅçΩπ—…ÖÕó≈Ñ∞ÅπºÅôΩ…©Ö»ÅÕïÕßÕ∏∏Å9ºÅëïµ’ïÕ—…ÑÅçΩπ—…ÖÕó≈ÑÅ•πçΩ……ïç—Ñ∏ÅA…Ωë’ççßÕ∏Å•π—Öç—Ñ∏((åååÄÃ¿º¿‰º»¿»ÿÉ
‹ÅΩ…ëï∏ÅŸ•ùïπ—îËÅ¡Ö…—•ç•¡Öπ—ïÃÅ¡Ω»ÅèÕë•ùºÅ•πë•Ÿ•ë’Ö∞ÄºÅ—ï·—ΩÃÅô•©ΩÃ(¥Å’ïπ—îËÅΩ…ëï∏Åï·¡≥µç•—ÑÄƒƒË»¿Å’Ö—ïµÖ±Ñ∞ÅÕ’Õ—•—’ÂîÅ…ï≈’•Õ•—ºÅ¡…ïŸ•ºÅëîÅç’ïπ—ÑÅ¡ï…ÕΩπÖ∞Å¡Ö…ÑÅ¡Ö…—•ç•¡Öπ—ïÃ∏Å)’ùÖëΩ»ËÅèÕë•ùºÅëîÅ’∏Å’ÕºÉäHÅIïù•Õ—…ºÅÖ•Õ±ÖëºÏÅŸ•Õ•—Öπ—îËÅèÕë•ùºÅëîÅ’∏Å’ÕºÉäHÅMçΩ…ïÃÅëï∞ÅïŸïπ—ºÅÖ’—Ω…•ÈÖëº∏ÅM•∏ÅçΩ……ïº∞ÅçΩπ—…ÖÕó≈ÑÅπ§Åç’ïπ—ÑÅ¡Ö…ÑÅ¡Ö…—•ç•¡Öπ—ïÃ∏ÅA…Ω¡•ï—Ö…•ºÅçΩπÕï…ŸÑÅÖ’—ïπ—•çÖçßÕ∏ÅÖëµ•π•Õ—…Ö—•ŸÑÅ…ïÖ∞ÏÅπºÅÕîÅôΩ…©ÑÅ•ëïπ—•ëÖêÅπ§ÅÕîÅ’ÕÑÅ•πŸ•—ÖçßÕ∏ÅçΩµºÅ…ï¡Ö…ÖçßÕ∏ÅëîÅÕ’ÃÅç…ïëïπç•Ö±ïÃ∏(¥ÅÀÖô•çÖÃËÅÖ¡…ΩâÖëÖÃÅQΩ…πïΩÕ|¿≈}π—…ÖëÖ}Â}IïÕ’±—ÖëΩÃπ¡πúÅ‰ÅQΩ…πïΩÕ|¿—}5Ö¡Ö}ëï}AÖπ—Ö±±ÖÃπ¡πúÅ…ïç’¡ï…ÖëÖÃÏÅµ•ÕµÑÅ—Öâ±ÑÅMçΩ…ïÃ∞Å±Ωùº∞Åç’Ö—…ºÅÖççïÕΩÃ∞Å¡ΩÕ•ç•ΩπïÃ∞Åïπï…Ö∞ΩÖ—ïùΩÀµÑΩãÈÕ≈’ïëÑΩôÖŸΩ…•—ΩÃÅ‰Åëï—Ö±±îÄƒ‡ÅΩ8∏Å9•πüÈ∏Å…ïë•Õó≈ºÅëîÅ—Öâ±ÖÃ∏Éi±—•µÑÅΩ…ëï∏ËÅ”µ—’±ΩÃΩÕ’â”µ—’±ΩÃΩçΩ±’µπÖÃÅπºÅÕï±ïçç•ΩπÖâ±ïÃÏÅçÖµ¡ΩÃÅÕ•ù’ï∏Åïë•—Öâ±ïÃ∏(¥Å%µ¡±ïµïπ—ÖçßÕ∏Å1ÅA…ïŸ•ï‹ËÅèÕë•ùºÅ°ÖÕ†ÅM!»‘ÿÏÅçΩπÕ’µºÅÖ”Õµ•çºÅ‰ÅÕïÕßÕ∏Å!——¡=π±‰ÏÅ…Ω∞Å‰ÅëïÕ—•πºÅëïç•ë•ëΩÃÅï∏ÅÕï…Ÿ•ëΩ»∏ÅY•ï›ï»ÅπºÅç…ïÑÅïŸïπ—ΩÃÅπ§ÅÖççïëîÅÑÅIïù•Õ—…ºΩ…ïÕ¡Ö±ëΩÃ∏Åµ•ÕßÕ∏Å•π•ç•Ö∞Å©’ùÖëΩ»ÅœÕ±ºÅ¡…Ω¡•ï—Ö…•º∞ÅçΩµ¡Ö…—•»ÅŸ•ï›ï»ÅœÕ±ºÅ•πÕç…•—ºÅçΩ∏Å…ΩÕ—ï»ÏÅ…ïŸΩçÖçßÕ∏Å¡Ω»Åïµ•ÕΩ»∏ÅΩµ¡Ö—•â•±•ëÖêÅëîÅ•πŸ•—Öç•ΩπïÃÅÖπ—•ù’ÖÃÅçΩπÕï…ŸÖëÑ∏(¥Å…•—ï…•ΩÃËÅπ—ï»ÅÖâ…îÅëïÕ—•πºÅÕïüÈ∏Å…Ω∞ÏÅ…ï’—•±•ÈÖçßÕ∏Ωï·¡•…ÖçßÕ∏ΩôΩ…©ÖëºΩ…ïŸΩçÖçßÕ∏ÅëïπïùÖëÖÃ∞Å’∏ÅùÖπÖëΩ»Åïπ—…îÅΩç°ºÅÕΩ±•ç•—’ëïÃÅÕ•µ’±”ÖπïÖÃÏÅŸ•Õ•—Öπ—îÅπºÅïÕç…•âî∞ÅÕïÕßÕ∏Å©’ùÖëΩ»ÅÖ•Õ±ÖëÑ∏ÅA…’ïâÖÃÅA±•—îÅ‰Åµ•ëë±ï›Ö…îÅAML∏Å9ºÅï≈’•ŸÖ±îÅÑÅ…ïçΩ……•ëºÅ…ïÖ∞ÅëîÅÕï•ÃÅ©’ùÖëΩ…ïÃ∏(¥ÅÕ—ÖëºËÅçÖµâ•ΩÃÅ±ΩçÖ±ïÃÅ—ΩëÖ€µÑÅπºÅ¡’â±•çÖëΩÃÅÖ∞Å…ïù•Õ—…Ö»ÅïÕ—îÅâ±Ω≈’î∏Å	’•±êΩ…ïù…ïÕßÕ∏∞ÅùÖ—ïÃ∞Å¡’â±•çÖçßÕ∏ÅA…ïŸ•ï‹Å‰Å…ïŸ•ÕßÕ∏ÅŸ•Õ’Ö∞Å¡ïπë•ïπ—ïÃ∏Å9ºÅïπ—…ïùÑÅ•π—ïù…Ö∞Åπ§Äƒ¿¿î∏ÅA…Ωë’ççßÕ∏ΩµÖ•∏ΩÅ¡…•µÖ…•ÑÅ•π—Öç—ΩÃ∏ÅIΩ±±âÖç¨ÅëîÅ¡’â±•çÖçßÕ∏ËÅ…ïµΩ—ºÄ–ƒ¿ÿ¿…ê‡Ã‹ƒÃ‹≈î‘–—ÑÿÃ‹¿‡—ò¿»’çê‰›çïàÂî–»ÄºÅë¡±|ÕIA°MAî’π°!’EUÈ’	Õ¿’¡’)UÏÅπºÅÖ±•ÖÃÅïÕ—Öâ±î∏(¥ÅA…•µï»Åâ’•±êÅëï—ïç”ÃÅï·¡ïç—Ö—•ŸÑÅÖπ—ï…•Ω»ÅëîÄΩÖççïÕÃπ°—µ∞ËÅÖ©’Õ—ÖëÑÅï·ç±’Õ•ŸÖµïπ—îÅÑÄΩçΩëîµïπ—…‰π°—µ∞Å¡Ω»ÅΩ…ëï∏ÅŸ•ùïπ—îÏÅ…ïÕ—…•çç•ΩπïÃÅ¡…•ŸÖëÖÃÅçΩπÕï…ŸÖëÖÃ∏(¥Å…ç°•ŸΩÃÅëîÅïÕ—îÅâ±Ω≈’îË(¥ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµëÄ(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}1%Y}Hƒ–ÿΩI=II%=}I%MQI=|»¿»ÿ¿‰Ã¿πµëÄ(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄ(¥ÅÅÖççïÕÃπ°—µ±Ä(¥ÅÅÖ¡§Ω}±•àΩÖççΩ’π–µÖ’—†π©ÕÄ(¥ÅÅÖ¡§Ω}±•àΩÖ¡¿µÖççïÕÃπ©ÕÄ(¥ÅÅÖ¡§Ω}±•àΩçΩëîµÖççïÕÃπ©ÕÄ(¥ÅÅÖ¡§ΩÖççΩ’π–π©ÕÄ(¥ÅÅÖ¡§ΩÖ¡¿µÖççïÕÃπ©ÕÄ(¥ÅÅÖ¡§Ω¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄ(¥ÅÅÖ’—†µùÖ—îπ©ÕÄ(¥ÅÅçΩëîµïπ—…‰π°—µ±Ä(¥ÅÅçΩëîµïπ—…‰π©ÕÄ(¥ÅÅ±•ŸîµÕ°Ö…îπ©ÕÄ(¥ÅÅµ•ëë±ï›Ö…îπ©ÕÄ(¥ÅÅÕçΩ…ïÃµ’§πçÕÕÄ(¥ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄ(¥ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄ(¥ÅÅ—ïÕ–µ±ÖàµçΩëîµïπ—…‰πµ©ÕÄ(¥ÅÅ—ïÕ–µ±•ŸîµÕ°Ö…îµµ•ëë±ï›Ö…îπµ©ÕÄ((¥ÄƒƒË‘–Å’Ö—ïµÖ±ÑËÅΩ…ëï∏ÅëîÅÖçΩ—Ö»Å¡’â±•çÖçßÕ∏ÅÖ∞Åâ±Ω≈’îÅÖç—’Ö∞Å¡Ö…ÑÅïπ±ÖçîÅëîÅ…ïŸ•ÕßÕ∏∏ÅAï…ô•∞Å”•çπ•çºÅçΩµ¡±ï—ºÅÖπ—ï…•Ω»ÅAMLÏÅá≈Öë•ëΩÃÅ≥µµ•—ïÃÅëîÅ•π—ïπ—ΩÃÅçΩ∏Åë•…ïççßÕ∏Å°ÖÕ°ïÖëÑ∞Å¡…’ïâÑÅëîÅŸïπ—ÖπÑÅ…ïÖ∞Å)LÅÕ•∏Åïπ€µºÅï·—ï…πº∞ÅµïπÕÖ©îÅèÕë•ùº≠ïπ±ÖçîÅ‰Åπ—ï»Ω…ï•π—ïπ—º∏Éi±—•µÑÅï©ïç’çßÕ∏Å—ïÕ–µ±ÖàµçΩëîµïπ—…‰πµ©ÃÅAML∏ÅMï•ÃÅ©’ùÖëΩ…ïÃÅëïÕëîÅIïù•Õ—…ºÅ9<Åï©ïç’—ÖëΩÃÏÅçΩπÕ’±—ÑÅëïµºÅ9<ÅÕ’Õ—•—’ÂîÅïÕîÅ…ïçΩ……•ëº∏ÅA’â±•çÖçßÕ∏ÅœÕ±ºÅA…ïŸ•ï‹Å¡Ö…ÑÅ…ïŸ•ÕßÕ∏∞ÅÕ•∏Åëïç±Ö…Ö»Åïπ—…ïùÑÅ•π—ïù…Ö∞∏((¥ÄƒƒË‘‘Å’Ö—ïµÖ±ÑËÅâ’•±êÅ”•çπ•çºÅçΩµ¡±ï—ºÅAMLÄΩ—µ¿ΩçΩëîµïπ—…‰µô•πÖ∞µâ’•±êπ±ΩúÏÅÖ•Õ±Öµ•ïπ—ºÅëîÅ…ïÕ¡Ö±ëΩÃÅ…ïôΩ…ÈÖëºÅÖπ—ïÃÅëîÅ±ÑÅÖ’—Ω…•ÈÖçßÕ∏ÅëîÅïŸïπ—ΩÃÅï∏Åµ•ëë±ï›Ö…îπ©ÃÅ‰Å¡…ΩâÖëºÅï∏Å—ïÕ–µ±•ŸîµÕ°Ö…îµµ•ëë±ï›Ö…îπµ©Ã∏ÅSµ—’±ΩÃÅô•©ΩÃÅÖ¡±•çÖëΩÃÅï∏ÅÕçΩ…ïÃµ’§πçÕÃÏÅπºÅ…ïŸ•ÕßÕ∏ÅëîÅÕï•ÃÅ©’ùÖëΩ…ïÃÅπ§Å•A°ΩπîÅçï…—•ô•çÖëÑ∏(ååÅHƒ–ÿ∏ƒ∏ƒÉ
‹ÅÖççïÕºÅ±•â…îÅÑÅIïù•Õ—…ºÉ
‹ÄÃ¿ÅÕï¡—•ïµâ…îÄ»¿»ÿ∞ÄƒÃË–¿Å’Ö—ïµÖ±Ñ((¥ÅMîÅï±•µ•πÑÅ±ÑÅ¡’ï…—ÑÅù±ΩâÖ∞ÅëîÅ•π•ç•ºÅëîÅÕïÕßÕ∏ËÅIïù•Õ—…ºÅ‰ÅMçΩ…ïÃÅÖâ…ï∏ÅÕ•∏Åç’ïπ—ÑÅ¡…Ω¡•ï—Ö…•ÑÅπ§ÅèÕë•ùºÅëîÅÖççïÕºÅùïπï…Ö∞∏(¥ÅÅÖççïÕÃπ°—µ±ÄÅçΩπÕï…ŸÑÅï∞Å¡Öπï∞ÅÖ’—ïπ—•çÖëºÅ¡Ö…ÑÅïµ•—•»ΩùïÕ—•ΩπÖ»Å•πŸ•—Öç•ΩπïÃÅëîÄ»–Å°Ω…ÖÃ∞ÅÕï¡Ö…ÖëºÅëîÅ±ÑÅïπ—…ÖëÑÅπΩ…µÖ∞∏Å%π•ç•ºÅçΩπÕï…ŸÑÅ%9Y%QHÉ
‹Ä»–Å Å‰Å±ÑÅÕïÕßÕ∏Å•πŸ•—ÖëÑÅÖ•Õ±ÖëÑÏÅï∞ÅŸïπç•µ•ïπ—ºÅµ’ïÕ—…ÑÅÖŸ•ÕºÅ‰ÅπºÅï·¡’±ÕÑÅÖ∞Å’Õ’Ö…•ºÅëîÅ±ÑÅÖ¡¿Å±•â…î∏(¥ÅMîÅçΩπÕï…ŸÖ∏Å±ΩÃÅ¡ï…µ•ÕΩÃÅïÕ¡ïèµô•çΩÃÅëîÅA%ÃÅëîÅÕ•πç…Ωπ•ÈÖçßÕ∏∞Åµïµâ…ïœµÖÃ∞Å¡’â±•çÖçßÕ∏ÅëîÅ—Ω…πïΩÃÅ‰Å±ïç—’…ÑÅëîÅïŸïπ—ΩÃÏÅÖâ…•»Å±ÑÅÖ¡±•çÖçßÕ∏ÅπºÅïπ—…ïùÑÅÖççïÕºÅÑÅëÖ—ΩÃÅëîÅΩ—…ÖÃÅ¡ï…ÕΩπÖÃ∏(¥ÅÅ…ï±ïÖÕîπ©ÕΩπÄ∞ÅâÖëùîÅŸ•Õ•â±îÅ‰ÅçÖç£§ÅA]Å¡ÖÕÖ∏ÅÑÅHƒ–ÿ∏ƒ∏ƒ∏ÅA…Ωë’ççßÕ∏Å‰ÅÖ±•ÖÃÅïÕ—Öâ±îÅπºÅµΩë•ô•çÖëΩÃ∏(¥Å…ç°•ŸΩÃËÅÅµ•ëë±ï›Ö…îπ©ÕÄ∞ÅÅÖççïÕÃπ°—µ±Ä∞ÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅù’ïÕ–µÖççïÕÃπ©ÕÄ∞ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄ∞ÅÅ…ï±ïÖÕîπ©ÕΩπÄ∞ÅÅ—ïÕ–µ±•ŸîµÕ°Ö…îµµ•ëë±ï›Ö…îπµ©ÕÄ∞ÅÅ—ïÕ–µΩ›πï»µ•πŸ•—Ö—•Ω∏µ’§πµ©ÕÄ∞ÅÅ—ïÕ–µ»ƒ‡µΩ›πï»µù’ïÕ–¥»—†µÖççïÕÃπµ©ÕÄ∞ÅÅ—ïÕ–µÿÃƒƒµ±•ŸîµÕ’¡¡Ω…–µ±•π¨πµ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµ»ÿ¿µ¡°ÂÕ•çÖ∞µµÖ—…•‡πµ©ÕÄ∞ÅÅ—ïÕ–µµÖπ’Ö∞µÕ—Ö…—’¿µÕ°Ö…•πúπµ©ÕÄ∞ÅÅ—ïÕ–µ±ÖàµÖççΩ’π–µùÖ—îπµ©ÕÄ∞ÅÖµâΩÃÅI=5AL∞ÅÅ=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=LπµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄ∏(¥ÅÕ—ÖëºËÅ¡…’ïâÖÃÅë•…•ù•ëÖÃÅï∏Åç’…Õº∏Å	’•±êÅ•π—ïù…Ö∞∞ÅÕï±±ºÅëîÅ•πŸïπ—Ö…•ºÅ‰ÅŸï…•ô•çÖçßÕ∏ÅŸ•Õ’Ö∞Åëï∞Åëï¡±ΩÂµïπ–Å¡ïπë•ïπ—ïÃ∏Å9ºÅëïç±Ö…Ö»ÅÖç—’Ö±•ÈÖçßÕ∏Å¡’â±•çÖëÑ∏(((ååÅHƒ–ÿ∏ƒ∏ƒÉ
‹ÅÖç±Ö…ÖçßÕ∏ÅëîÅ•πŸ•—ÖçßÕ∏Å—ïµ¡Ω…Ö∞É
‹ÄÃ¿ÅÕï¡—•ïµâ…îÄ»¿»ÿ((¥Åπ—…ÖëÑÅ…áµËÄ°ÄΩÄ∞ÅÄΩ•πëï‡π°—µ±Ä∞ÅÄΩ•π•ç•ΩÄ§Å‰ÅÄΩ•πëï‡µù…’¡Ö∞π°—µ∞˝•π•ç•ºÙ≈ÄÅÕ•ù’ï∏ÅÖâ•ï…—ÖÃÏÅÕîÅ≈’•”ÃÅëîÅ±ÑÅÖ¡¿Å±ÑÅçÖ…ùÑÅëîÅÅÖ’—†µùÖ—îπ©ÕÄ∏Å1ÑÅç…ïëïπç•Ö∞ÅπºÅÖâ…îÅπ§ÅçΩπë•ç•ΩπÑÅIïù•Õ—…º∏(¥ÅMîÅçΩπÕï…ŸÑÅï∞Å¡Öπï∞ÅÅÖççïÕÃπ°—µ±ÄÉÈπ•çÖµïπ—îÅ¡Ö…ÑÅïµ•—•»∞ÅçΩπÕ’±—Ö»∞Å…ïŸΩçÖ»ÅºÅçÖπ©ïÖ»Å•πŸ•—Öç•ΩπïÃÅ•πë•Ÿ•ë’Ö±ïÃÅëîÄ»–Å°Ω…ÖÃ∏ÅMîÅ≈’•”ÃÅÕ‘ÅâΩ”Õ∏Éäq	I%HÅA1%'M;ätÅ‰ÅÕîÅÖç±Ö…ÑÅ≈’îÅIïù•Õ—…ºÅπºÅ…ï≈’•ï…îÅç…ïëïπç•Ö±ïÃ∏(¥ÅÅ•πëï‡µù…’¡Ö∞π°—µ±ÄÅ‰ÅÅù’ïÕ–µÖççïÕÃπ©ÕÄÅçΩπÕï…ŸÖ∏Åï∞ÅâΩ”Õ∏ÅëîÅ•πŸ•—ÖçßÕ∏∞Å—Ω≠ï∏ÅëîÅ’∏Å’Õº∞ÅÖ•Õ±Öµ•ïπ—ºÅ•πŸ•—Öëº∞ÅÖŸ•ÕºÅ‰ÅŸïπç•µ•ïπ—º∏Å∞ÅŸïπçï»ÅºÅôÖ±±Ö»Å±ÑÅçΩπÕ’±—Ñ∞Å±ÑÅ—Ö…©ï—ÑÅÖâ•ï…—ÑÅÂÑÅπºÅ…ïë•…•ùîÅÑÅ’∏ÅôΩ…µ’±Ö…•ºÅ¡…Ω¡•ï—Ö…•ºÏÅIïù•Õ—…ºÅ±•â…îÅÕ•ù’îÅë•Õ¡Ωπ•â±î∏(¥Å5Ö—…•çïÃÅÖç—’Ö±•ÈÖëÖÃËÅÅ%IQI%M}59Q=I%LπµëÄ∞ÅÅ5QI%i}Q|¡}AI=eQ<πµêºπ©ÕΩπÄ∞ÅÅ=1}M=I}I}Q}A9%9}5QI%`πµëÄ∞ÅÅA9}1%Y|¿ƒ·}=1}M=I}I}Q}1%YπµëÄ∏Å5Ö¡Ñ∞Å¡…’ïâÖÃÅ‰ÅÕï±±ºÅëîÅ•πŸïπ—Ö…•ºÅÖ±•πïÖëΩÃ∏(¥Å	’•±êΩëïÕ¡±•ïù’îÅπºÅï©ïç’—ÖëΩÃÅáÈ∏ÏÅA…Ωë’ç—•Ω∏Å‰ÅÖ±•ÖÃÅ¡’â±•çÖëΩÃÅÕ•∏ÅçÖµâ•ΩÃ∏((åååÅHƒ–ÿ∏ƒ∏ƒÉ
‹ÅçΩ……ïççßÕ∏ÅëîÅâÖëùîÉ
‹ÄÃ¿º¿‰º»¿»ÿ(¥Å…ç°•ŸºÅµΩë•ô•çÖëºËÅÅ•πëï‡µù…’¡Ö∞π°—µ±ÄÄ°¡Ö…Õï»ÅëîÅâ’•±êÅI∏π∏π∏§Å‰ÅŸÖ±•ëÖçßÕ∏ÅçΩ∏ÅÅ—ïÕ–µ±Öàµô•…Õ–µΩ¡ï∏πµ©ÕÄ∏(¥ÅŸ•ëïπç•ÑËÅÅπΩëîÅ—ïÕ–µ±Öàµô•…Õ–µΩ¡ï∏πµ©ÕÄÅAMLÏÅï∞ÅâÖëùîÅîÅ%Å—ΩµÖ∏Åï∞Å±Öâï∞ÅÅHƒ–ÿ∏ƒ∏≈ÄÅëï∞Å…ï±ïÖÕî∏(¥Å…ç°•ŸΩÃËÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅI=5A}=YI10πµëÄ∞ÅÅI=5A}}Q11πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄ∏(¥ÅÕ—ÖëºËÅA…ïŸ•ï‹Åπ’ïŸºÅ‰ÅëïÕ¡±•ïù’îÅA…Ωë’ç—•Ω∏Å¡ïπë•ïπ—ïÃ∏((ååÅHƒ–‹É
‹ÅÖççïÕºÅ±•â…îÅëïÕëîÅ…áµËÅµÖ—…•ËÉ
‹ÄÃ¿ÅÕï¡—•ïµâ…îÄ»¿»ÿ(¥Å1ÑÅŸï…•ô•çÖçßÕ∏ÅëîÅÖ…ç°•ŸΩÃÅçΩπô•…µÑÅ≈’îÅÄΩÄ∞ÅÄΩ•πëï‡π°—µ±ÄÅîÅÄΩ•π•ç•ΩÄÅ…ïë•…•ùï∏Åë•…ïç—Öµïπ—îÅÑÅIïù•Õ—…ºÅ‰Å≈’îÅï∞Åµ•ëë±ï›Ö…îÅ¡ÖÕÑÅ±ÖÃÅ√Öù•πÖÃÅπΩ…µÖ±ïÃÅÕ•∏ÅçΩπÕ’±—Ö»ÅÕïÕßÕ∏Å¡…Ω¡•ï—Ö…•Ñ∏Å1ÑÅ…ïù…ïÕßÕ∏ÅÅ—ïÕ–µ±ÖàµÖççΩ’π–µùÖ—îπµ©ÕÄÅŸï…•ô•çÑÅÖ°Ω…ÑÅ±ΩÃÅ—…ïÃÅ…ïë•…ïç—ÃÅÖëï∑ÖÃÅëîÅçΩµ¡…ΩâÖ»Å≈’îÅIïù•Õ—…ºÅπºÅµΩπ—ÑÅÅÖ’—†µùÖ—îπ©ÕÄ∏(¥ÅHƒ–‹Å…ïπ’ïŸÑÅÅ…ï±ïÖÕîπ©ÕΩπÄ∞Åï∞ÅâÖëùîÅŸ•Õ•â±îÅ‰Å±ÖÃÅçÖç£•ÃÅA]Å¡Ö…ÑÅ≈’îÅï∞ÅâΩ”Õ∏ÅëîÅÖç—’Ö±•ÈÖçßÕ∏Åëï—ïç—îÅï∞Åâ’•±êÅπ’ïŸº∏(¥ÅMîÅµÖπ—•ïπîÅÕï¡Ö…ÖëºÅï∞Å¡Öπï∞ÅΩ¡ç•ΩπÖ∞ÅëîÅÖëµ•π•Õ—…ÖçßÕ∏ÅëîÅ•πŸ•—Öç•ΩπïÃÅ—ïµ¡Ω…Ö±ïÃÅ‰Å±ÑÅÖ’—Ω…•ÈÖçßÕ∏Å¡Ω»Å…ïç’…ÕºÅëîÅ—Ω…πïΩÃΩëÖ—ΩÃÅ¡…•ŸÖëΩÃÏÅπÖëÑÅëîÅïÕºÅçΩπë•ç•ΩπÑÅ±ÑÅïπ—…ÖëÑÅùïπï…Ö∞∏(¥Å∞Åùïπï…ÖëΩ»ÅëîÅ•πŸïπ—Ö…•ΩÃÅ—ΩµÑÅï∞ÅÀÕ—’±ºÅ‰Å±ÑÅŸï…ÕßÕ∏Åëï∞ÅÅ…ï±ïÖÕîπ©ÕΩπÄ∞ÅïŸ•—ÖπëºÅëï©Ö»Å±ΩÃÅAÅ‰Åï∞ÅÕï±±ºÅçΩ∏Å•ëïπ—•ëÖêÅHƒ‡∏(¥Å…ç°•ŸΩÃËÅÅ…ï±ïÖÕîπ©ÕΩπÄ∞ÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄ∞ÅÅ—ïÕ–µ±ÖàµÖççΩ’π–µùÖ—îπµ©ÕÄ∞ÅÅÕç…•¡—ÃΩ…ïâ’•±êµ•πŸïπ—Ω…‰µ¡ëôÃπ¡ÂÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=LπµëÄ∞ÅÅ=1}M=I}I}Q}A9%9}5QI%`πµëÄ∞ÅÅI=5A}}Q11πµëÄ∞ÅÅI=5A}=YI10πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄ∏(¥ÅÕ—ÖëºËÅâ’•±êÅµÖπ’Ö∞Å1ÅAMLÏÅ¡…Ω©ïç–µ≈’Ö±•—‰∞Å…ΩÖëµÖ¿∞Å•πŸïπ—Ö…•ºÄ†‹ÿƒÅô’ïπ—ïÃºÃÅA§Å‰Å…ïù…ïÕ•ΩπïÃÅë•…•ù•ëÖÃÅAML∏Å1ΩÃÅëΩÃÅI=5@Å‰Åï∞ÅÕï±±ºÅ≈’ïëÖ…Ω∏ÅÖù…’¡ÖëΩÃÅ—…ÖÃÅŸÖ±•ëÖ»Åï∞ÅùÖ—îÅëîÅ—…ÖÈÖâ•±•ëÖê∏ÅA…ïŸ•ï‹ÅHƒ–‹Å¡ïπë•ïπ—îÅëîÅëïÕ¡±•ïù’îÅ‰ÅŸï…•ô•çÖçßÕ∏Åï·—ï…πÑ∏((ååÅHƒ–‹∏ƒÉ
‹ÅçΩµ¡Ö…—•»Å…ΩπëÑÅ¡…•ŸÖëÑÅ—…ÖÃÅç…ïÖ…±ÑÅëïÕëîÅIïù•Õ—…ºÉ
‹ÄÃ¿ÅÕï¡—•ïµâ…îÄ»¿»ÿ(¥Å∞Åç…ïÖ»Å’πÑÅ…ΩπëÑÅ¡…•ŸÖëÑÅëïÕëîÅIïù•Õ—…ºÅÕîÅçΩπÕï…ŸÑÅï∞ÅëßÖ±ΩùºÅçΩ∏ÅèÕë•ùºÅ‰ÅÕîÅΩô…ïçï∏Å=5AIQ%HÅA=HÅ]!QMA@Å‰Å=9Q%9UHÅ0ÅM=IÅI∏(¥Å∏Å•=LΩÕΩ¡Ω…—îÅπÖ—•ŸºÅ’ÕÑÅπÖŸ•ùÖ—Ω»πÕ°Ö…îÏÅÕ§Åï∞Å’Õ’Ö…•ºÅçÖπçï±Ñ∞ÅçΩπÕï…ŸÑÅï∞ÅëßÖ±ΩùºÅ¡Ö…ÑÅ…ï•π—ïπ—Ö»ÅºÅçΩπ—•π’Ö»∏Å∏Åï∞Å…ïÕ—ºÅÖâ…îÅ]°Ö—Õ¡¿Å‰ÅïÕ¡ï…ÑÅï∞Å…ïù…ïÕºÅÖπ—ïÃÅëîÅÖâ…•»Å±ÑÅ—Ö…©ï—Ñ∏(¥ÅÅ—ïÕ–µ±Öàµ¡…•ŸÖ—îµ…Ω’πêµÕ°Ö…îµô±Ω‹πµ©ÕÄÅŸï…•ô•çÑÅïπ€µºΩçÖπçï±ÖçßÕ∏Å‰Å±ïç—’…ÑÅëîÅA$ÅÕ•µ’±ÖëÑÏÅÅ—ïÕ–µ±Öàµô•…Õ–µΩ¡ï∏πµ©ÕÄÅçΩπô•…µÑÅ≈’îÅHƒ–‹Åëï—ïç—ÑÅHƒ–‹∏ƒ∏Å9ºÅï≈’•ŸÖ±îÅÑÅïπ€µºÅõµÕ•çºÅï∏Å]°Ö—Õ¡¿Åπ§Å…ïŸ•ÕßÕ∏ÅõµÕ•çÑÅ•A°Ωπî∏(¥Å∞Åë•Õ—•π—•Ÿº∞Å…ï±ïÖÕîπ©ÕΩ∏Å‰ÅçÖç£§ÅA]Å¡ÖÕÖ∏ÅÑÅHƒ–‹∏ƒÅ¡Ö…ÑÅ≈’îÅHƒ–‹Å…ïç•âÑÅï∞ÅÖŸ•ÕºÅQU1%iH∏(¥Å…ç°•ŸΩÃËÅÅ¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµ¡…•ŸÖ—îµ…Ω’πêµÕ°Ö…îµô±Ω‹πµ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµô•…Õ–µΩ¡ï∏πµ©ÕÄ∞ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄ∞ÅÅ…ï±ïÖÕîπ©ÕΩπÄ∞ÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=LπµëÄ∞ÅÖµâΩÃÅI=5ALÅ‰ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄ∏(¥ÅIïù…ïÕ•ΩπïÃÅë•…•ù•ëÖÃÅ‰ÅùÖ—ïÃÅÕîÅï©ïç’—Ö∏ÅÖπ—ïÃÅëîÅA…ïŸ•ï‹ÏÅA…Ωë’ç—•Ω∏Å¡ï…µÖπïçîÅ•π—Öç—Ñ∏((ååÅHƒ–‹∏»É
‹ÅçΩ……ïù•»ÅçΩµ¡Ö…—•»Å1%YÅëïÕëîÅ…ΩπëÑÅ¡…•ŸÖëÑÉ
‹ÄÃ¿ÅÕï¡—•ïµâ…îÄ»¿»ÿ(¥Å!Ö±±ÖÈùºÅï∏ÅçÖ¡—’…ÖÃÅëï∞Å¡…Ω¡•ï—Ö…•ºËÅÅ=5AIQ%HÅ1%YÄÅ≈’ïëÖâÑÅÕ•∏Å…ïÕ¡’ïÕ—ÑÅÕ§Åï∞ÅèÕë•ùºÅÕîÅ¡ïìµÑÅÖ∞ÅÕï…Ÿ•ç•ºÅëîÅïŸïπ—ΩÃÅ¡ï…ÕΩπÖ±ïÃÅÖ’π≈’îÅ±ÑÅ…ΩπëÑÅô’ï…ÑÅ¡…•ŸÖëÑÅ°ï…ïëÖëÑÏÅÅ=5AIQ%HÅM%=ÄÅçΩµ¡Ö…”µÑÅ¡ï…ºÅëï©ÖâÑÅï∞ÅµΩëÖ∞Åïπç•µÑÅëîÅMçΩ…îÅÖ…ê∏(¥ÅÅ±•ŸîµÕ°Ö…îπ©ÕÄËÅï±•ùîÅÕï…Ÿ•ç•ºÅ¡ï…ÕΩπÖ∞ÅœÕ±ºÅÕ§Åï·•Õ—îÅëïÕç…•¡—Ω»Å¡ï…ÕΩπÖ∞Åëï∞ÅïŸïπ—ºÏÅ±ÖÃÅ…ΩπëÖÃÅ¡…•ŸÖëÖÃÅ°ï…ïëÖëÖÃÅ’ÕÖ∏ÅÄΩÖ¡§Ω±•ŸîµÕ°Ö…ïÄ∏Å∞ÅçΩµ¡±ï—Ö»Å]ïàÅM°Ö…îÅºÅÖâ…•»Å]°Ö—Õ¡¿∞Åç•ï……ÑÅï∞Å¡Öπï∞ÅëîÅçΩµ¡Ö…—•»Å‰Åï∞ÅµΩëÖ∞ÅëîÅ…ΩπëÑÏÅï∞ÅâΩ”Õ∏Å=5AIQ%HÅçΩπÕï…ŸÑÅ±ÑÅMçΩ…îÅÖ…êÅëïâÖ©º∏(¥ÅÅ¡…•ŸÖ—îµ…Ω’πëÃπ©ÕÄËÅçΩµ¡Ö…—•»Åï∞ÅèÕë•ùºÅç•ï……ÑÅï∞ÅµΩëÖ∞ÅœÕ±ºÅÖ∞Å—ï…µ•πÖ»Å]ïàÅM°Ö…îÏÅçÖπçï±Ö»ÅçΩπÕï…ŸÑÅ±ÑÅ¡Öπ—Ö±±Ñ∏ÅQÖâ±ÑÅëîÅÕçΩ…ïÃÅÖµ¡±•ÖëÑÅÖ∞Å—Öµá≈ºÅ±ïù•â±îÅëîÅ±ÑÅ…ïôï…ïπç•ÑÅÖ¡Ω…—ÖëÑ∏ÅÅ=5AIQ%HÅ1%YÄÅµ’ïÕ—…ÑÅ’∏ÅïÕ—ÖëºÅÕ§Åï∞ÅÕï…Ÿ•ëΩ»ÅπºÅ±Ωù…ÑÅùïπï…Ö»ÅèÕë•ùº∏(¥ÅÅ—ïÕ–µ±Öàµ¡…•ŸÖ—îµ…Ω’πëÃπµ©ÕÄ∞ÅÅ—ïÕ–µ±ÖàµçΩëîµïπ—…‰πµ©ÕÄËÅAMLÅëîÅÕï±ïççßÕ∏ÅëîÅÕï…Ÿ•ç•ºÅ±ïùÖç‰∞Åç•ï……îÅÖ∞ÅçΩµ¡Ö…—•»∞ÅçΩπÕï…ŸÖçßÕ∏ÅÖ∞ÅçÖπçï±Ö»Å‰Å—Öµá≈ΩÃÅ—•¡ΩùÀÖô•çΩÃ∏Å1ÑÅ¡…’ïâÑÅπºÅçï…—•ô•çÑÅïπ€µºÅõµÕ•çºÅï∏Å]°Ö—Õ¡¿Åπ§Å•A°Ωπî∏(¥ÅÅIHÅQ=I9=ÄÅµÖπ—•ïπîÅÖ’—Ω…•ÈÖçßÕ∏ÅëîÅ•ëïπ—•ëÖêÅëï∞Å…ïç’…ÕºÅçïπ—…Ö∞ÏÅ±ÑÅçÖ¡—’…ÑÅµ’ïÕ—…ÑÅï∞ÅµïπÕÖ©îÅëîÅ•π•ç•ºÅëîÅÕïÕßÕ∏∏Å9ºÅÕîÅ…ï—•ÀÃÅï∞ÅçΩπ—…Ω∞ÅA$Åπ§ÅÕîÅÕ•µ’≥ÃÅç…ïÖ»Å—Ω…πïºÅÕ•∏Å¡…Ω¡•ï—Ö…•º∏Å1ÑÅΩ¡ï…ÖçßÕ∏Å…ïµΩ—ÑÅÖ’—ïπ—•çÖëÑÅ≈’ïëÑÅ¡ïπë•ïπ—î∏(¥Å…ç°•ŸΩÃËÅÅ±•ŸîµÕ°Ö…îπ©ÕÄ∞ÅÅ¡…•ŸÖ—îµ…Ω’πëÃπ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµ¡…•ŸÖ—îµ…Ω’πëÃπµ©ÕÄ∞ÅÅ—ïÕ–µ±ÖàµçΩëîµïπ—…‰πµ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµô•…Õ–µΩ¡ï∏πµ©ÕÄ∞ÅÅ…ï±ïÖÕîπ©ÕΩπÄ∞ÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄ∞ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩA9}1%Y|¿ƒ·}=1}M=I}I}Q}1%YπµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=LπµëÄ∞ÅÅI=5A}}Q11πµëÄ∞ÅÅI=5A}=YI10πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄ∏(¥ÅÕ—ÖëºÅÖ∞Å…ïù•Õ—…Ö»ËÅ¡…’ïâÑÅë•…•ù•ëÑÅ‰Åâ’•±êÅ•π—ïù…Ö∞Å1ÅAMLÏÅ≈’Ö±•—‰Ω…ΩÖëµÖ¿Ω•πŸïπ—Ω…‰ÅùÖ—ïÃÅ¡ΩÕ—ï…•Ω…ïÃ∞ÅA…ïŸ•ï‹Å‰Å…ïŸ•ÕßÕ∏ÅõµÕ•çÑÅ¡ïπë•ïπ—ïÃÏÅA…Ωë’ç—•Ω∏Å•π—Öç—Ñ∏((åååÅHƒ–‹∏»É
‹ÅÕ•πç…Ωπ•ÈÖçßÕ∏Å5$ÅI=9Å‰ÅëΩâ±îÅ—Ω≈’îÅMçΩ…ïÃ)MîÅçΩπÕï…ŸÑÅ•πç…ïµïπ—Ö±µïπ—îÅ5$ÅI=9ÅëîÅòŸÖå¡ëêÄ°Ω—…ÑÅçΩπŸï…ÕÖçßÕ∏§∞ÅÕ•∏Å…ïÕ—Ö’…Ö»ÅçΩπ—…Ω±ïÃÅÖπ—•ù’ΩÃ∏ÅÅÕçΩ…ïÃµ’§π©ÕÄÅÖëµ•—îÅëΩâ±îÅç±•åÅï·¡≥µç•—ºÅ‰ÅëΩâ±îÅ—Ω≈’îÅ°ÖÕ—ÑÄÿ¿¿ÅµÃËÅµ’ïÕ—…ÑÄƒ‡Å°ΩÂΩÃÅçΩ∏Å`∞Åç’ÂºÅç•ï……îÅçΩπÕï…ŸÑÅ±ΩÃÅ…ïÕ’±—ÖëΩÃ∏Å…ç°•ŸΩÃËÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅ¡…•ŸÖ—îµ…Ω’πëÃπ©ÕÄ∞ÅÅÕçΩ…ïÃµ’§π©ÕÄ∞ÅÅ—ïÕ–µÕçΩ…ïÃµ’§πµ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµ…ïù•Õ—…Ö—•Ω∏µ¡…•ŸÖ—îµ…Ω’πëÃµïπ—…‰πµ©ÕÄ∞ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄ∏ÅA…’ïâÖÃÅ‰ÅA…ïŸ•ï‹Å¡ïπë•ïπ—ïÃÅëîÅ•π—ïù…ÖçßÕ∏∏((ååÅHƒ–‹∏»É
‹ÅQΩ…πïΩÃÅÕ•∏Åç…ïëïπç•Ö±ïÃÅ‰Å…ïçΩ……•ëºÅçΩµ¡±ï—ºÉ
‹ÄÃ¿ÅÕï¡—•ïµâ…îÄ»¿»ÿ)=…ëï∏Åï·¡…ïÕÑËÅµ•ÕµºÅô±’©ºÅëîÅç…ïÖ»Å…ΩπëÑ∞ÅèÕë•ùº∞ÅçΩµ¡Ö…—•»Å‰Å…ïù…ïÕºÅÑÅMçΩ…îÅÖ…êÅ¡Ö…ÑÅ—Ω…πïºÏÅïπï…Ö∞∞ÅÖ—ïùΩÀµÖÃ∞Å	’ÕçÖ»∞ÅïÕ—…ï±±ÖÃΩ5•ÃÅôÖŸΩ…•—ΩÃÅ‰ÅëΩâ±îÅ—Ω≈’óäHƒ‡ÅÕçΩ…ïœäI`∏ÅMîÅá≈ÖëîÅ•ëïπ—•ëÖêÅÖ’—Ω∑Ö—•çÑÅ¡Ω»Åë•Õ¡ΩÕ•—•ŸºÅçΩ∏ÅçΩΩ≠•îÅ!——¡=π±‰Å‰Å—Ω≠ï∏ÅÖ±ïÖ—Ω…•ºÅëîÄ»‘ÿÅâ•—Ã∞Å°ÖÕ†Åï∏ÅâÖÕîÅ1Å‰Å¡ï…—ïπïπç•ÑÅ¡Ω»ÅïŸïπ—º∏Å9ºÅÕîÅï·•ùîÅçΩ……ïºΩçΩπ—…ÖÕó≈ÑÅÖ∞Åç…ïÖ»∏Å1ΩÃÅÖççïÕΩÃÅëîÅ±ïç—Ω»ÅçΩπÕï…ŸÖ∏Å…Ω∞Å‰ÅΩ—…ΩÃÅë•Õ¡ΩÕ•—•ŸΩÃÅπºÅ…ïç•âï∏Å¡…Ω¡•ïëÖê∏ÅÅ¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄÅ¡…ï¡Ö…ÑÅ•ëïπ—•ëÖêÅÖ’—Ω∑Ö—•çÑÅ‰ÅçΩµ¡Ö…—îÅ—Ω…πïºÅÖπ—ïÃÅëîÅÖâ…•»Å—Ö…©ï—ÑÅÖÕ•ùπÖëÑ∏ÅÅ±•Ÿîµ°’àπ©ÕÄÅá≈ÖëîÅëï—Ö±±îÅï∏ÅÖŸΩ…•—ΩÃ∞Åâ’ÕçÑÅïπ—…îÅçÖ—ïùΩÀµÖÃ∞ÅÕï±ïçç•ΩπÑÅçÖ—ïùΩÀµÑÅë•Õ¡Ωπ•â±îÅ‰ÅçΩπÕï…ŸÑÅπΩµâ…îÅ…ïÖ∞Åëï∞ÅïŸïπ—ºÏÅπºÅÕîÅÖù…ïùÑÅMïù’…ΩÃÅUπ•Ÿï…ÕÖ±ïÃ∏ÅÅÕçΩ…ïÃµ’§πçÕÕÄÅ’π•ô•çÑÅô’ïπ—îÅ…•Ö∞∞Å—Öµá≈ΩÃ∞Å±ΩùºÅÑÅ±ÑÅëï…ïç°Ñ∞ÅôΩπëºÅ‰ÅâΩ…ëïÃÅëîÅ±ÖÃÅ…ïôï…ïπç•ÖÃ∏)…ç°•ŸΩÃËÅÅÖ¡§Ω}±•àΩëïŸ•çîµïŸïπ–µ•ëïπ—•—‰π©ÕÄ∞ÅÅÖ¡§Ω}±•àΩÖççΩ’π–µÖ’—†π©ÕÄ∞ÅÅÖ¡§Ω¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄ∞ÅÅ¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄ∞ÅÅ±•Ÿîµ°’àπ©ÕÄ∞ÅÅÕçΩ…ïÃµ’§πçÕÕÄ∞ÅÅ—ïÕ–µ±ÖàµëïŸ•çîµïŸïπ–µ•ëïπ—•—‰πµ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµ¡…•ŸÖ—îµ…Ω’πêµÕ°Ö…îµô±Ω‹πµ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµ…ïù•Õ—…Ö—•Ω∏µ…ï—’…∏µÕ—Ö—îπµ©ÕÄ∞ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄ∏)A…’ïâÖÃÅë•…•ù•ëÖÃÅAMLËÅ•ëïπ—•ëÖêÅÕ•∏Åç…ïëïπç•Ö±ïÃ∞Åç…ïÖ»Ω±ïï»ÅçΩ∏Å…ΩÕ—ï»∞Å…ïç°ÖÈºÅëîÅΩ—…ºÅë•Õ¡ΩÕ•—•Ÿº∞Å—Ω≠ï∏ÅôÖ±ÕºΩŸïπç•ëºÅ‰Å±ïç—Ω»ÏÅçΩµ¡Ö…—•»Å—Ω…πïøäIMçΩ…îÅÖ…êÏÅëΩâ±îÅç±•åΩ—Ω≈’óäHƒ‡Å¡ΩÕ•ç•ΩπïœäI`∏Å	ÖπçºÅ1ÅÖç—’Ö±•ÈÖëºÅ8ÅUIM<ÏÅ¡’â±•çÖçßÕ∏∞ÅπÖŸïùÖëΩ»Å…ïÖ∞Å‰ÅÖçï¡—ÖçßÕ∏ÅõµÕ•çÑÅ¡ïπë•ïπ—ïÃ∏Å∞ÅçΩµµ•–Å¡…ïŸ•ºÄÿ–ÿ‘‰·àÅ≈’ïìÃÅ±ΩçÖ∞ËÅù•–Å¡’Õ†ÅôÖ±≥ÃÅ¡Ω»ÅÖ’Õïπç•ÑÅëîÅç…ïëïπç•Ö±ïÃÏÅÕîÅ’ÕÑÅçΩπïç—Ω»Å•—!’àÅ¡Ö…ÑÅÕ•ù’•ïπ—îÅ¡’â±•çÖçßÕ∏∏((ååÅHƒ–‹∏»∏ƒÉ
‹Å…ïç’¡ï…ÖçßÕ∏ÅQU1%iHÅ‰ÅâΩ—ΩπïÃÅ•πôï…•Ω…ïÃÉ
‹ÄÃ¿ÅÕï¡—•ïµâ…îÄ»¿»ÿ)	ÖÕîÅ…ïµΩ—ÑÄ‰‡‹‘ÿ‰‹‹‡—êƒ»¿»‡Âò¿’ôò¡å–‡ƒ»‡»ÕââÑÿ’çò‘‰∞Å…ÖµÑÅ±ÖàΩ»ƒ–‹µ±•ŸîµÕçΩ…ïÃµ»ƒ–‹»¥»¿»ÿ¿‰Ã¿∏ÅÖ¡—’…ÑÅ%5|‘–‘‡ÅçΩπô•…µÑÅ•πÕ—Ö±ÖçßÕ∏Å1ÅHƒ–‹∏ƒÏÅçΩπÕ’±—ÖÃÅë•…ïç—ÖÃÅ‰ÅYï…çï∞ÅçΩπô•…µÖ∏Å1Å‰Åï¡úµçÖëë‰ÅÕ•…Ÿ•ïπëºÅHƒ–‹∏»∏Å9ºÅÕîÅÖ—…•â’ÂîÅçÖ’ÕÑÅï·ç±’Õ•ŸÑÅÖ∞Å•A°ΩπîÅÕ•∏ÅïŸ•ëïπç•ÑÅëîÅÕ‘ÅÕïÕßÕ∏∏)Ω……ïççßÕ∏ËÅI%9Q9QHÅëï©ÑÅëîÅ≈’ïëÖ»ÅΩç’±—ºÅ—…ÖÃÅ’πÑÅçΩπÕ’±—ÑÅôÖ±±•ëÑÏÅ¡ÖùïÕ°Ω‹ΩôΩç’ÃΩΩπ±•πîÅ…ïÖπ’ëÖ∏Å±ÑÅçΩπÕ’±—Ñ∏ÅQ=I9<Å‰ÅM=ILÅQ=I9<ÅÕîÅ•πçΩ…¡Ω…Ö∏ÅëïâÖ©ºÅëîÅI=9ÅAIQ%U1HΩM=ILÅIUA<∞ÅçΩπÕï…ŸÖπëºÅ¡ï…Õ•Õ—ïπç•ÑÅ‰Å¡ï…µ•ÕΩÃ∏ÅMçΩ…ïÃÅÖâ…îÅï∞Å—Ω…πïºÅÕï±ïçç•ΩπÖëºÅºÅ¡•ëîÅÕï±ïçç•ΩπÖ…±ºÏÅπºÅÕï±ïçç•ΩπÑÅ’πÑÅ…ΩπëÑÅ¡…•ŸÖëÑ∏ÅIï±ïÖÕîΩçÖç£§ÅHƒ–‹∏»∏ƒÅ¡ï…µ•—ï∏Åë•Õ—•πù’•»Åï∞Å¡Ö…ç°îÏÅµ•ÕµºÅëΩµ•π•º∏)…ç°•ŸΩÃËÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅ±•Ÿîµ°’àπ©ÕÄ∞ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄ∞ÅÅ…ï±ïÖÕîπ©ÕΩπÄ∞ÅÅ—ïÕ–µ±Öàµô•…Õ–µΩ¡ï∏πµ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµ’¡ëÖ—îµ…ïçΩŸï…‰πµ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµ…ïù•Õ—…Ö—•Ω∏µ¡…•ŸÖ—îµ…Ω’πëÃµïπ—…‰πµ©ÕÄ∞ÅÅI=5A}=YI10πµëÄ∞ÅÅI=5A}}Q11πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=LπµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄ∏)A…’ïâÖÃÅë•…•ù•ëÖÃÅ±ΩçÖ±ïÃÅAMLÏÅâÖπçºÅçΩµ¡±ï—ºΩùÖ—ïÃΩA…ïŸ•ï‹Å‰Åµ•ù…ÖçßÕ∏Å…ïÖ∞ÅëîÅπÖŸïùÖëΩ»Å¡ïπë•ïπ—ïÃ∏Å9•πù’πÑÅ¡’â±•çÖçßÕ∏ÅëîÅïÕ—îÅ¡Ö…ç°îÅï∏ÅA…Ωë’ççßÕ∏∏ÅIΩ±±âÖç¨Åëï∞ÅçÖπë•ëÖ—ºËÄ‰‡‹‘ÿ‰‹∏ÅAÀÕ·•µÑÅÖççßÕ∏Å”•çπ•çÑËÅçï……Ö»ÅâÖπçº∞ÅÕï±±ÖëºÅ‰ÅA…ïŸ•ï‹ÏÅπºÅÖô•…µÖ»Å…ï¡Ö…ÖçßÕ∏ÅëîÅ±ÑÅ•πÕ—Ö±ÖçßÕ∏Åëï∞Å’Õ’Ö…•ºÅÖπ—ïÃÅëîÅŸï…•ô•çÖ»Åµ•ù…ÖçßÕ∏∏((åååÅHƒ–‹∏»∏ƒÉ
‹ÅÖ©’Õ—îÅëîÅâΩ…ëïÃÅ•πôï…•Ω…ïÃÉ
‹ÄÃ¿ÅÕï¡—•ïµâ…îÄ»¿»ÿ∞Äƒ‰Ë¿‡Å’Ö—ïµÖ±Ñ)=…ëï∏Åëï∞Å¡…Ω¡•ï—Ö…•ºËÅI=9ÅAIQ%U1H∞ÅM=ILÅIUA<∞ÅQ=I9<Å‰ÅM=ILÅQ=I9<ÅçΩ∏ÅôΩπëºÅΩÕç’…º∞Å—ï·—ºÅ‰ÅâΩ…ëîÅŸï…ëî∞ÅÕ•∏Å…ï±±ïπºÅŸï…ëîÏÅÕîÅçΩπÕï…ŸÖ∏Å—Öµá≈º∞Åë•Õ¡ΩÕ•çßÕ∏Å‰ÅÖçç•ΩπïÃ∏ÅÖµâ•ºÅ±•µ•—ÖëºÅÑÅÕï±ïç—Ω…ïÃÅMLÅï∏ÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∏ÅÕ—ÖëºËÅµΩë•ô•çÖçßÕ∏Å±ΩçÖ∞ÏÅŸï…•ô•çÖçßÕ∏Å‰ÅA…ïŸ•ï‹Å¡ïπë•ïπ—ïÃ∏Å∞ÅÖ±•ÖÃÅô•©ºÅ1ÅÕ•ù’îÅï∏ÅHƒ–‹∏»ÏÅHƒ–‹∏»∏ƒÅáÈ∏ÅπºÅ¡…ΩµΩŸ•ëº∏ÅÖ±—ÑÅïŸ•ëïπç•ÑÅëï∞ÅùÖ—îÅëîÅÖç—’Ö±•ÈÖçßÕ∏Åï∏ÅπÖŸïùÖëΩ»∞ÅÕ•∏ÅÖô•…µÖ»Å…ï¡Ö…ÖçßÕ∏ÅëîÅ±ÑÅ•πÕ—Ö±ÖçßÕ∏∏((ååÅHƒ–‹∏»∏»É
‹Å1%YÅ‰ÅëïÕ—•πºÅëîÅ•πŸ•—Öç•ΩπïÃÅëîÅA…Ωë’ççßÕ∏É
‹ÄÃ¿ÅÕï¡—•ïµâ…îÄ»¿»ÿ)	ÖÕîÅâïå‘Õîÿ∏ÅIïù•Õ—…ΩÃÅYï…çï∞Åëï∞Åëï¡±ΩÂµïπ–Ä›]≠A9)e†‡…ùÕŸPÕâ-ù¡ïŸ≠	)¨ËÄΩÖ¡§Ω±•ŸîµÕ°Ö…îÄ‘¿ÃÅÑÅ±ÖÃÄƒ‰Ë–ÁäLƒ‰Ë‘¿ÏÅ…ï¡…Ωë’ççßÕ∏Å±ΩçÖ∞Å1	}Q	M}%M=1Q%=9}IEU%I∏ÅMîÅ±•µ•—ÑÅ±ÑÅÖç—•ŸÖçßÕ∏ÅÖ’—Ω∑Ö—•çÑÅÖ∞Å%ÅΩô•ç•Ö∞Åï¡úµçÖëë‰Å‰Åïπ—Ω…πºÅ¡…Ωë’ç—•Ω∏ÏÅ1ÅÕ•ù’îÅï·•ù•ïπëºÅÕ‘ÅÖç—•ŸÖçßÕ∏Åï·¡≥µç•—ÑÅ‰ÅâÖÕîÅÖ•Õ±ÖëÑ∞ÅA…ïŸ•ï‹Å‰Å¡…ΩÂïç—ΩÃÅëïÕçΩπΩç•ëΩÃÅÕîÅ…ïç°ÖÈÖ∏∏ÅYÖ±•ëÖç•ΩπïÃÅëîÅΩ…•ùï∏∞Å¡’â±•Õ°ï»∞ÅÕïÕ•ΩπïÃ∞Åï·¡•…ÖçßÕ∏Å‰ÅèÕë•ùΩÃÅëîÅ¡…•µï»Å’ÕºÅÕîÅçΩπÕï…ŸÖ∏∏Å•πŸ•—ï=…•ù•∏Åô•©ÑÅçÖëÑÅëΩµ•π•ºÅÕïüÈ∏Å¡…ΩÂïç—º∞ÅÕ•∏Å¡ï…µ•—•»Å≈’îÅ’∏ÅŸÖ±Ω»Å°ï…ïëÖëºÅç…’çîÅ1ΩA…Ωë’ççßÕ∏∏ÅIï±ïÖÕîÅHƒ–‹∏»∏»ÏÅ¡’â±•çÖçßÕ∏Å‰Å…ïçΩ……•ëºÅ…ïÖ∞Å¡ïπë•ïπ—ïÃ∏ÅIΩ±±âÖç¨Åâïå‘Õîÿ∏Å…ç°•ŸΩÃËÅÖ¡§Ω±•ŸîµÕ°Ö…îπ©Ã∞ÅÖ¡§Ω}±•àΩ•πŸ•—îµΩ…•ù•∏π©Ã∞Å—ïÕ–µ±•ŸîµÕ°Ö…îµ°Öπë±ï»πµ©Ã∞Å—ïÕ–µ•πŸ•—îµΩ…•ù•∏πµ©Ã∞Å•πëï‡µù…’¡Ö∞π°—µ∞∞ÅÕï…Ÿ•çîµ›Ω…≠ï»π©Ã∞Å…ï±ïÖÕîπ©ÕΩ∏∏()Hƒ–‹∏»∏»É
‹Å$ÅA…Ωë’ççßÕ∏ËÅ¡…•µï»Å…ïëï¡±Ω‰Å@·ÿÃ——≈â—L—‘’ÖŸaâ›úÿ‹—5ëÑÅôÖ±≥ÃÅ¡Ω…≈’îÅ—ïÕ–µ±•ŸîµÕ°Ö…îµ°Öπë±ï»Å°ï…ïìÃÅŸÖ…•Öâ±ïÃÅ…ïÖ±ïÃ∏Å1ÑÅ¡…’ïâÑÅÖ°Ω…ÑÅô•©ÑÅ%Å1Å‰Å…ïÕ—Ö’…ÑÅ±ÖÃÅ—…ïÃÅŸÖ…•Öâ±ïÃÅï∏Åô•πÖ±±‰∞ÅÕ•∏ÅÖççïëï»ÅÑÅ±ÑÅâÖÕîÅ…ïÖ∞∏Å9ºÅÕîÅëïç±Ö…ÑÅ¡’â±•çÖëºÅ°ÖÕ—ÑÅIdÅ‰ÅŸï…•ô•çÖçßÕ∏Åëï∞ÅÖ±•ÖÃ∏((ååÅHƒ–‹∏»∏ÃÉ
‹Å1%YÅù’Ö…ëÖëºÅŸïπç•ëºÉ
‹ÄÃ¿ÅÕï¡—•ïµâ…îÄ»¿»ÿ)%5|‘–ÿ‰ÅçΩπô•…µÑÅôÖ±±ºÅï∏ÅHƒ–‹∏»∏»∏ÅIïù•Õ—…ΩÃÅëï∞ÅçΩµµ•–Åà‹›Öôà–ËÅ±•ŸîµÕ°Ö…îÄ–¿ÃÅ‰Å±•ŸîÄ–ƒ¿ÅÑÅ±ÖÃÄ»¿Ëƒ‹∏Å≈’•ç≠M°Ö…ï…Ω’¿ÅπºÅ…ïŸ•ÕÖâÑÅï·¡•…ïÕ–ÅÖπ—ïÃÅëîÅçΩµ¡Ö…—•»Å’∏ÅïŸïπ—ºÅºÅ…ï’—•±•ÈÖ»Å’∏Åïπ±Öçî∏ÅMîÅ•ùπΩ…Ö∏ÅÕ—…ïÖµÃÅŸïπç•ëΩÃÅ‰ÅÕîÅïµ•—îÅ’∏Å1%YÅëï∞Åù…’¡ºÅÖç—’Ö∞ÅçΩ∏Å—Ω’…πÖµïπ–Èπ’±∞ÏÅπºÅÕîÅ…ïÖç—•ŸÑÅπ§Åï·—•ïπëîÅï∞ÅïŸïπ—ºÅÖπ—ï…•Ω»∞ÅπºÅÕîÅÖ±—ï…ÑÅ±ÑÅ…ΩπëÑÅ±ΩçÖ∞Åπ§ÅÕ’ÃÅ©’ùÖëΩ…ïÃΩÕçΩ…ïÃ∏ÅIïù…ïÕßÕ∏Å¡…’ïâÑÅÕ—…ïÖ¥Å¡Ö…—•ç’±Ö»Ω—Ω…πïºÅŸïπç•ëº∞ÅçΩπÕï…ŸÖçßÕ∏ÅëîÅÕπÖ¡Õ°Ω–Å‰ÅÕïù’πëºÅçΩµ¡Ö…—•»ÅÕ•∏Åë’¡±•çÖëº∏Å5ïπÕÖ©ïÃÅïÕ¡ïèµô•çΩÃÅ¡Ö…ÑÅ¡ï…µ•Õº∞ÅïŸïπ—ºÅŸïπç•ëºÅ‰Å…ïŸΩçÖçßÕ∏∏ÅIΩ±±âÖç¨Åà‹›Öôà–∏ÅÕ—ÖëºËÅ±ΩçÖ∞ÏÅ¡…’ïâÖÃÅ‰Å¡’â±•çÖçßÕ∏Å¡ïπë•ïπ—ïÃ∏Å…ç°•ŸΩÃËÅ±•ŸîµçΩπ—…Ω∞π©Ã∞Å—ïÕ–µ±ÖàµÕ°Ö…îµë•…ïç–πµ©Ã∞Å…ï±ïÖÕîπ©ÕΩ∏∞Å•πëï‡µù…’¡Ö∞π°—µ∞∞ÅÕï…Ÿ•çîµ›Ω…≠ï»π©Ã∏(((ååÄÃ¿º¿‰º»¿»ÿÉ
‹ÅçΩπÕïπ—•µ•ïπ—ºÅëîÅÖç—’Ö±•ÈÖçßÕ∏Å‰ÅÕï±ïç—Ω»ÅÖµ¡ºÉ
‹ÅHƒ–‹∏»∏–ÅÕΩ±•ç•—ÖëÑ)∞Å¡…Ω¡•ï—Ö…•ºÅçΩµ¡…ΩãÃÅï∏Å%5|‘–‹‘º‘–‹ÿÅ≈’îÅÖµâÖÃÅÖ¡¡ÃÅÖŸÖπÈÖ…Ω∏ÅÑÅHƒ–‹∏»∏ÃÅÕ•∏Å¡’±ÕÖ»ÅQU1%iH∏ÅÖ’ÕÑËÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÃÅ¡…ΩµΩ€µÑÅçÖç£§Åï∏Å•πÕ—Ö±∞∞ÅÖç—•ŸÖ—îÅ‰ÅπÖŸïùÖçßÕ∏ÅΩ…ë•πÖ…•ÑÏÅïÕçÖ¡îËÅçΩπ—…Ω±ïÃÅïÕ”Ö—•çΩÃÅëîÅ…ïçÖ…ùÑÅπºÅŸï…•ô•çÖâÖ∏Å±ÑÅ—…ÖπÕ•çßÕ∏Åëï∞ÅçÖç£§ÅçΩµ¡±ï—º∏ÅΩ……ïççßÕ∏Å±ΩçÖ∞ËÅçΩπÕï…ŸÖ»ÅÕ°ï±∞ÅÖ¡…ΩâÖëºÏÅ¡…ΩµΩŸï»ÅœÕ±ºÅπÖŸïùÖçßÕ∏ÅçΩ∏ÅÖ¡¡}Ÿï…Õ•Ω∏Ä¨Å’¡ëÖ—ï}ç°ïç¨ÏÅëïÕçÖ…ùÑÅçΩµ¡±ï—ÑÅ‰Åµï—ÑÅëîÅ…ï±ïÖÕîÅçΩπçΩ…ëÖπ—îÏÅπºÅâΩ……Ö»ÅçÖç£•ÃÅÖπ—ïÃÅëï∞É•·•—ºÏÅ…ï—•…Ö»ÅµïπÕÖ©îÅAI=5=Q}	U%1ÅÕ•∏ÅçΩπÕ’µ•ëΩ»∏Å—ïÕ–µ±Öàµ’¡ëÖ—îµ…ïçΩŸï…‰πµ©ÃÅŸï…•ô•çÑÅç•ç±ºÅçΩµ¡±ï—º∞ÅÕç…•¡—ÃÅŸ•ï©ΩÃ∞Å…ïç°ÖÈºÅëîÅëïÕçÖ…ùÑÅ¡Ö…ç•Ö∞Å‰ÅçΩπÕïπ—•µ•ïπ—ºÅï·¡≥µç•—ºÅï∏ÅÖµâΩÃÅëΩµ•π•ΩÃ∏Å	ÖπçºÅçΩµ¡±ï—ºÅÖπ—ï…•Ω»ÅAMLÅï∏ÄΩ—µ¿ΩùÕåµµÖπ’Ö∞µçΩπÕïπ–µâ’•±êπ±ΩúÏÅπÖŸïùÖëΩ»ÅëîÅµ•ù…ÖçßÕ∏ÅîÅ•A°ΩπîÅÕ•ù’ï∏ÅA9%9Q%9QL∞ÅÕ•∏ÅùÖ…Öπ”µÑÅÖâÕΩ±’—Ñ∏)=…ëï∏ÅÖë•ç•ΩπÖ∞Åëï∞Å¡…Ω¡•ï—Ö…•ºËÅHƒ–‹∏»∏–ÅëïâîÅ•πç±’•»ÅÖµ¡ºÅï∏Å…ïÖ»Å—Ω…πïºÅçΩµºÅÕï±ïç—Ω»ÅçΩ∏Å±ΩÃÅçÖµ¡ΩÃÅëï∞ÅIïù•Õ—…ºÅ•π•ç•Ö∞∏Å±•Ÿîµ°’àπ°—µ∞ÅÖ°Ω…ÑÅ’ÕÑÅÕï±ïç—Ω»ÅπÖ—•Ÿº∞ÅÕ•ï—îÅπΩµâ…ïÃÅ•ù’Ö±ïÃÅÖ∞ÅçÖ”Ö±ΩùºÅ‰Å1ÑÅIï’πßÕ∏Åâ±Ω≈’ïÖëÑÅ•ù’Ö∞Å≈’îÅIïù•Õ—…º∏Å—ïÕ–µ—Ω’…πÖµïπ–µçΩ’…ÕîµÕï±ïç—Ω»πµ©ÃÅçΩµ¡…’ïâÑÅ¡Ö…•ëÖêÅ‰Åë•Õ¡Ωπ•â•±•ëÖê∏Å1ÑÅ¡…’ïâÑÅ°•Õ”Õ…•çÑÅ—ïÕ–µçΩ’…ÕîµçÖ—Ö±Ωúπµ©ÃÅôÖ±±ÑÅ¡Ω»ÅÀÕ—’±ºÅ¡…ïŸ•ºÅ!MQÄÿÅ)U=ILÅÖ’Õïπ—îÏÅπºÅÕîÅÖ±—ïÀÃÅπ§ÅÕîÅ¡…ïÕïπ—ÑÅçΩµºÅAML∏)…ç°•ŸΩÃËÅÕï…Ÿ•çîµ›Ω…≠ï»π©Ã∞Å•πëï‡µù…’¡Ö∞π°—µ∞∞Å—ïÕ–µ±Öàµ’¡ëÖ—îµ…ïçΩŸï…‰πµ©Ã∞Å±•Ÿîµ°’àπ°—µ∞∞Å—ïÕ–µ—Ω’…πÖµïπ–µçΩ’…ÕîµÕï±ïç—Ω»πµ©Ã∞ÅI=5A}=YI10πµê∞ÅI=5A}}Q11πµê∞Å=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµê∞Å=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=Lπµê∞Å=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµê∞Å=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩ∏∏+i±—•µºÅ¡’â±•çÖëºËÄ‹¡ëà—î·î¡êŸê‰≈âòÕî—âå‰›åÃ¡àÕò–›çåÿƒ…çÑ›òÅï∏Å1Å‰Å¡…Ωë’ççßÕ∏∞ÅHƒ–‹∏»∏Ã∏ÅA’â±•çÖçßÕ∏ÅëîÅçΩ……ïçç•ΩπïÃÅáÈ∏ÅA9%9Q∏Å5•ù…ÖçßÕ∏ËÅ¡…•µï…ºÅ›Ω…≠ï»ÅçΩ……ïù•ëºÅµÖπ—ïπ•ïπëºÅï—•≈’ï—ÑÅHƒ–‹∏»∏Ã∞ÅŸï…•ô•çÖ»ÅÖëΩ¡çßÕ∏ÅÕ•∏ÅÖŸÖπçîÅÖ’—Ω∑Ö—•çº∞ÅëïÕ¡◊•ÃÅë•Õ¡Ωπ•â•±•ëÖêÅHƒ–‹∏»∏–ÅçΩ∏ÅQU1%iH∏Å9ºÅ¡’±ÕÖ»ÅÖç—’Ö±•ÈÖëΩ»ÅëîÅ•πÕ—Ö±Öç•ΩπïÃÅëï∞Å¡…Ω¡•ï—Ö…•º∏ÅIΩ±±âÖç¨ËÄ‹¡ëà—î‡ÏÅÕ•∏Åµ’—Öç•ΩπïÃÅëîÅâÖÕîÅëîÅëÖ—ΩÃÅπ§Å…ïÕ’……ïççßÕ∏ÅëîÅ1%YÅŸïπç•ëΩÃ∏((åååÄ»ƒË¿‹Å’Ö—ïµÖ±ÑÉ
‹Åâ±Ω≈’ïºÅŸï…•ô•çÖâ±îÅëîÅ¡’â±•çÖçßÕ∏)Ω……ïççßÕ∏ÅÕ•πç…Ωπ•ÈÖëÑÅï∏Ä›å‰¡âÑ›ââòÕå‰ÂôÑ—î¿≈ê‰›Öçôà‰‰’êÕëïà‹‹»—êÏÉÖ…âΩ∞Åê¿Âê—î’î¿ÿ…òÂå–»ÕâïÖâÑŸò›à‘—à»≈ò·å≈ò‘‰Ÿà∏ÅA…ïŸ•ï‹Å1Åë¡±}8ÕY≠›`Ã›ù1ïÃ≈ieYŸ’)AΩ	Å‰Å¡…Ωë’ççßÕ∏Åë¡±}5Öò‡‹≈≠e¡≠îÂM)…AUM‰’)]ÅÖµâΩÃÅId∞Å—Ö…ùï–Åπ’±∞∏Å9ºÅ¡’â±•çÖçßÕ∏Åπ’ïŸÑÅï∏ÅëΩµ•π•ΩÃÅô•©ΩÃÏÅÕ•ù’ï∏Ä‹¡ëà—î‡ÄºÅHƒ–‹∏»∏Ã∏)A…’ïâÑÅ…ïÖ∞Å¡…ïŸ•ÑÅï∏Å¡ïÕ—á≈ÑÄ»¿ËÅ…ïçÖ…ùÑÅçÖµâßÃÅHƒ–‹∏»ÅÑÅHƒ–‹∏»∏ÃÅ‰ÅâΩ”Õ∏ÅQU1%i<ÅÕ•∏Åç±•ç¨∞Å…ï¡…Ωë’çîÅÖ’—ΩÖŸÖπçî∏ÅΩ……ïççßÕ∏Åπ’ïŸÑÅπºÅÕîÅ°ÑÅçΩµ¡…ΩâÖëºÅï∏Åµ•ù…ÖçßÕ∏Å…ïÖ∞∏Å%π—ïπ—ΩÃÅëîÅçΩπ—•π’Ö»ÅYï…çï∞Åµïë•Öπ—îÅUËÅAÖùîπïπÖâ±îÅ—•µïΩ’–∞Å=5MπÖ¡Õ°Ω–πçÖ¡—’…ïMπÖ¡Õ°Ω–Å—•µïΩ’–∞ÅAÖùîπùï—1ÖÂΩ’—5ï—…•çÃÅ—•µïΩ’–∏ÅΩπïç—Ω»Åëï¡±ΩÂ}—Ω}Ÿï…çï∞Å…ïÕ¡ΩπëßÃÅQΩΩ∞ÅπΩ–ÅôΩ’πê∏Å	±Ω≈’ïºÅëîÅΩ¡ï…ÖçßÕ∏∞ÅπºÅÖ¡…ΩâÖçßÕ∏ÅôÖ±—Öπ—î∏+i±—•µÖÃÅŸï…•ô•çÖç•ΩπïÃÅAMLËÅâÖπçºÅçΩµ¡±ï—ºÄΩ—µ¿ΩùÕåµµÖπ’Ö∞µçΩπÕïπ–µÕï±ïç—Ω»µâ’•±êπ±Ωú∞Å—ïÕ–µ—Ω’…πÖµïπ–µçΩ’…ÕîµÕï±ïç—Ω»πµ©Ã∞Å—ïÕ–µ±Öàµ’¡ëÖ—îµ…ïçΩŸï…‰πµ©ÃÅÖµâΩÃÅ°ΩÕ—Ã∞Å¡…Ω©ïç–µ≈’Ö±•—‰∞Å—ïÕ–µ¡…Ω©ïç–µ≈’Ö±•—‰∞Å…ΩÖëµÖ¿∞Å•πŸïπ—Ω…‰Ä‹ÿÿÅô’ïπ—ïÃ∏ÅÖ—îÅπÖŸïùÖëΩ»ÅëîÅç’Ö—…ºÅŸï…Õ•ΩπïÃÅÕ•ù’îÅ¡ïπë•ïπ—îÏÅ¡…’ïâÑÅ°•Õ”Õ…•çÑÅçÖ”Ö±ΩùºÅôÖ±±ÑÅ¡Ω»ÅÀÕ—’±ºÅÖπ—ï…•Ω»ÅÖ’Õïπ—î∏)IïÖπ’ëÖ»Åï·Öç—Öµïπ—îËÅ…ïç’¡ï…Ö»Å¡ïÕ—á≈ÑÅYï…çï∞Å1Å8ÕY≠›`Ã›ù1ïÃ≈ieYŸ’)AΩ	ÏÅŸï…•ô•çÖ»ÅA…ïŸ•ï‹Å‰ÅÕ°ï±∞ÅëïÕçÖ…ùÖâ±îÏÅ¡’â±•çÖ»Å¡…ï¡Ö…ÖçßÕ∏Åµ•ÕµºÅHƒ–‹∏»∏ÃÅï∏ÅÖµâΩÃÅëΩµ•π•ΩÃÅ‰Å…ÖµÑÅÖπ—•ù’ÑÏÅŸï…•ô•çÖ»Å›Ω…≠ï»Åπ’ïŸºÅçΩπÕï…ŸÑÅÖ¡±•çÖçßÕ∏ÅÖπ—ï…•Ω»ÏÅëïÕ¡◊•ÃÅ•πç…ïµïπ—Ö»Å…ï±ïÖÕîÅçΩ°ï…ïπ—îÅHƒ–‹∏»∏–∞Åï©ïç’—Ö»ÅùÖ—ïÃ∞ÅÕ•πç…Ωπ•ÈÖ»∞Å¡’â±•çÖ»ÅÖµâΩÃÅ‰ÅΩâÕï…ŸÖ»ÅQU1%iHÅÕ•∏Å¡’±ÕÖ»Å•πÕ—Ö±ÖçßÕ∏Åëï∞Å¡…Ω¡•ï—Ö…•º∏Å9ºÅëïç±Ö…Ö»ÅâΩ”Õ∏Åïπ—…ïùÖëºÅπ§ÅùÖ…Öπ”µÑÅ•A°ΩπîÅÕ•∏Å¡…’ïâÑ∏((ååÅHƒ–‹∏»∏–É
‹Å¡…’ïâÑÅëîÅïπ—…ïùÑÅµÖπ’Ö∞Åï∏Å1Å‰Å¡…Ωë’ççßÕ∏É
‹ÄÃ¿º¿‰º»¿»ÿ)A…ï¡Ö…ÖçßÕ∏ÅçΩ……ïù•ëÑÅHƒ–‹∏»∏ÃÅ¡’â±•çÖëÑÅëïÕëîÄ›å‰¡âÑ‹Åï∏ÅÖµâΩÃÅëΩµ•π•ΩÃËÅ1Åë¡±|—Uî’©a¿≈ŸEŸM–Ÿ)—»’hÂ¡]¡5•òÅ‰Å¡…Ωë’ççßÕ∏Åë¡±|›H›aYÕ°4Ÿ≈âÈ‡‘ÂiM!¨≈-›°ƒÿ∞ÅId∏Å9ÖŸïùÖëΩ»Å…ïç’¡ï…ÖëºÅµïë•Öπ—îÅ¡ïÕ—á≈ÑÅπ’ïŸÑÏÅπ•πüÈ∏ÅâΩ”Õ∏ÅëîÅ•πÕ—Ö±Öç•ΩπïÃÅëï∞Å¡…Ω¡•ï—Ö…•ºÅô’îÅ¡’±ÕÖëº∏Å1Å…ïçÖ…ùÑÅçΩπÕï…ŸÑÅHƒ–‹∏»∏Ã∏Å∏Å¡ï…ô•∞ÅëîÅ¡…’ïâÑÅ¡…Ωë’ççßÕ∏Å±ïùÖëºÅHƒ–‹∏»ÅÖŸÖπÎÃÅÑÅHƒ–‹∏»∏ÃÅï∏Å¡…•µï…ÑÅ…ïçÖ…ùÑ∞ÅçΩπô•…µÑÅ—…ÖπÕ•çßÕ∏Å±ïùÖç‰Å—ΩëÖ€µÑÅÖ’—Ω∑Ö—•çÑÅÖπ—ïÃÅëîÅÖëΩ¡—Ö»ÅçΩ……ïççßÕ∏ÏÅπºÅùÖ…Öπ—•ÈÑÅ…ï¡Ö…ÖçßÕ∏Å…ï—…ΩÖç—•ŸÑÅëîÅ•πÕ—Ö±Öç•ΩπïÃÅΩôô±•πî∏ÅM°ï±∞Å1ËÄ‘¿Å…ïç’…ÕΩÃÅ!QQ@»¿¿∏)MîÅ¡…ï¡Ö…ÑÅHƒ–‹∏»∏–ÅÕΩ±•ç•—ÖëÑËÅ•πëï‡µù…’¡Ö∞π°—µ∞∞Å…ï±ïÖÕîπ©ÕΩ∏Å‰ÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÃÅÖ±•πïÖëΩÃÏÅπÖµïÕ¡ÖçîÅπ’ïŸºÅ»ƒ–‹¥»¥–µµÖπ’Ö∞µ’¡ëÖ—îÏÅ±•Ÿîµ°’àπ°—µ∞ÅÕï±ïç—Ω»ÅπÖ—•ŸºÅÖµ¡ºÅçΩ∏ÅÕ•ï—îÅçÖµ¡ΩÃÅëï∞ÅIïù•Õ—…º∞Å1ÑÅIï’πßÕ∏Å¡ïπë•ïπ—î∏Å—ïÕ–µ—Ω’…πÖµïπ–µçΩ’…ÕîµÕï±ïç—Ω»πµ©ÃÅá≈Öë•ëºÅÖ∞ÅâÖπçºÅΩâ±•ùÖ—Ω…•ºÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©Ã∏ÅA’â±•çÖçßÕ∏ÅHƒ–‹∏»∏–Å‰Å—…ÖπÕ•çßÕ∏ÅŸ•Õ’Ö∞Åï∏ÅÖµâΩÃÅëΩµ•π•ΩÃÅA9%9QL∏ÅIΩ±±âÖç¨Å”•çπ•çºËÅ¡…ï¡Ö…ÖçßÕ∏Ä›å‰¡âÑ‹ÏÅÕ•∏ÅµΩë•ô•çÖ»ÅâÖÕîÅëîÅëÖ—ΩÃ∏)…ç°•ŸΩÃÅ…ïù•Õ—…ÖëΩÃËÅ•πëï‡µù…’¡Ö∞π°—µ∞∞Å…ï±ïÖÕîπ©ÕΩ∏∞ÅÕï…Ÿ•çîµ›Ω…≠ï»π©Ã∞Å±•Ÿîµ°’àπ°—µ∞∞Å—ïÕ–µ—Ω’…πÖµïπ–µçΩ’…ÕîµÕï±ïç—Ω»πµ©Ã∞ÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©Ã∞ÅI=5A}=YI10πµê∞ÅI=5A}}Q11πµê∞Å=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµê∞Å=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=Lπµê∞Å=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµê∞Å=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩ∏∏((ååÅHƒ–‹∏»∏–∏ƒÉ
‹ÅçΩπô•…µÖçßÕ∏Å¡ïπë•ïπ—îÅëï∞Å¡…Ω¡•ï—Ö…•ºÅï∏Å±ÖâΩ…Ö—Ω…•º)Hƒ–‹∏»∏–Å¡’â±•çÖëÑÅï∏ÅëΩµ•π•ΩÃÅô•©ΩÃÅëïÕëîÄ·âççôò‰ËÅ1Åë¡±}§…’°YQô≠5≈ùÈπ¡‰…YŸôç Å‰Å¡…Ωë’ççßÕ∏Åë¡±|·U≈©≈!Y@ŸÂ¥Ÿ)aEÖ‡≈aÃÕ‘∞ÅId∏Å9ÖŸïùÖëΩ»ÅëîÅ¡…’ïâÑÅï∏ÅÖµâΩÃÅµΩÕ—ÀÃÅµï—ÑÅHƒ–‹∏»∏ÃÅ‰ÅQU1%iHÅŸ•Õ•â±îΩ°Öâ•±•—ÖëºÏÅ—…ÖÃÅç±•ç¨Åµï—ÑÅHƒ–‹∏»∏–∞Å±ÖâΩ…Ö—Ω…•ºÅçΩπÕï…€ÃÅA…’ïâÑÅ1Å‰Å¡…Ωë’ççßÕ∏Å©’ùÖëΩ»ÅAIU	ÅQU1%iHΩÕçΩ…î‘∏ÅÖ¡—’…ÖÃÅÖπ—ïÃÅëï∞Åç±•ç¨ËÅ»ƒ–‹»–µ±ÖâΩ…Ö—Ω…•ºµÖç—’Ö±•ÈÖ»¥ƒ‹‰¿‡»–‰ÿ»‹‰–π©¡úÅM!»‘ÿÄ‘Ã¡îÿÃ¿…î‘Âî‘–ƒ‰‰–ƒÿ‡¿Ÿà¡ò––‹–…òÃ›à‰·âïå‘‡≈çåÿÃÃƒƒƒ‹≈ÖâÑ‰–¡ôÖê‘‰ÏÅ¡…Ωë’ççßÕ∏Å»ƒ–‹»–µ¡…Ωë’çç•Ω∏µÖç—’Ö±•ÈÖ»¥ƒ‹‰¿‡»‘¿»‘‹‰‘π©¡úÅM!»‘ÿÄÿ≈ôà›ê’î›åÃ‹ÂôâòÃ‰Ã≈ê‰ÿ›çÖÖïÖîŸê›ïî‡…òƒÿ’ò¿¿»Õê≈ïôî¿›çî‡ÂÖò‘ÿ–‡‘∏ÅMï±ïç—Ω»Å¡’â±•çÖëºÅ¡…ΩâÖëºÅ¡Ω»ÅU$ËÅMÖ∏Å%Õ•ë…ºÅï±ïù•ëº∞ÅÕ•ï—îÅçÖµ¡ΩÃÅ‰Å1ÑÅIï’πßÕ∏Å¡ïπë•ïπ—îÏÅπºÅÕîÅç…óÃÅ—Ω…πïº∏(»ƒË»–Ë–‰ËÅ¡…Ω¡•ï—Ö…•ºÅçΩπô•…µÑÅ¡…Ωë’ççßÕ∏Å…ïç•âßÃΩ¡’±œÃÅçΩ……ïç—Öµïπ—îÏÅ±ÖâΩ…Ö—Ω…•ºÅÖ¡Ö…ïçßÃÅÂÑÅHƒ–‹∏»∏–ÅÕ•∏Å—ïç±Ñ∏ÅAΩ»Å—Öπ—ºÅïπ—…ïùÑÅ•πÕ—Ö±ÖëÑÅ±ÖâΩ…Ö—Ω…•ºÅ%0∞ÅπºÅ…ïÕ’ï±—ÑÅ¡Ω»ÅAMLÅ°…Ωµ•’¥∏Å!•√Õ—ïÕ•ÃÅÕ’Õ—ïπ—ÖëÑËÅµΩ—Ω»ÅÖπ—ï…•Ω»ÅπºÅÖëΩ¡”ÃÅ¡…ï¡Ö…ÖçßÕ∏ÏÅπºÅ°Ö‰ÅïŸ•ëïπç•ÑÅëï∞ÅçΩπ—…Ω±ÖëΩ»Åï·Öç—ºÅëîÅÕ‘Å•A°Ωπî∏ÅIï¡…Ωë’ççßÕ∏Å”•çπ•çÑËÅô’ïπ—îÅ°•Õ”Õ…•çÑÄ‹¡ëà—î‡Å…ïïµ¡±ÖÈÑÅ=1ÅIÅ¡Ω»Å9\ÅIÅï∏Å•πÕ—Ö±∞ΩÖç—•ŸÖ—îÅÕ•∏Åç±•ç¨ÏÅµΩ—Ω»ÅçΩ……ïù•ëºÅ…ï—•ïπîÅ=1ÅI∏Å’ïπ—îÅï·Öç—ÑÅÖ…ç°•ŸÖëÑÅï∏Å—ïÕ—ÃΩô•·—’…ïÃΩ»ƒ–‹»ÃµÕï…Ÿ•çîµ›Ω…≠ï»µâïôΩ…îµµÖπ’Ö∞µçΩπÕïπ–π©ÃÅ‰Å¡…’ïâÑÅπïùÖ—•ŸÑÅ¡ï…µÖπïπ—îÅï∏Å—ïÕ–µ±Öàµ’¡ëÖ—îµ…ïçΩŸï…‰πµ©Ã∏ÅQÖµâß•∏Åï·•Õ—ï∏Å…’—ÖÃÅ¡ï…ÕΩπÖ±ïÃÅ≈’îÅëï±•âï…ÖëÖµïπ—îÅŸÖ∏ÅÑÅ…ïêÅ¡Ö…ÑÅçΩµ¡…ΩâÖ»Å¡ï…µ•ÕΩÃÏÅ…ï≈’•ï…ï∏ÅïŸÖ±’ÖçßÕ∏ÅÕï¡Ö…ÖëÑÅÕ•∏Åëïâ•±•—Ö»ÅÖ’—Ω…•ÈÖçßÕ∏∏)MîÅ¡…ï¡Ö…ÑÅHƒ–‹∏»∏–∏ƒÅçΩµºÅπ’ïŸÑÅ¡…’ïâÑÅëîÅïπ—…ïùÑÅµÖπ’Ö∞ÅëïÕëîÅHƒ–‹∏»∏–Å…ï¡Ω…—ÖëÑÅÂÑÅ•πÕ—Ö±ÖëÑ∏Å9ºÅëïç±Ö…Ö»ÅùÖ…Öπ”µÑÅπ§ÅAMLÅ•A°ΩπîÅÖπ—ïÃÅëîÅçΩπô•…µÖçßÕ∏∏Å…ç°•ŸΩÃËÅ•πëï‡µù…’¡Ö∞π°—µ∞∞Å…ï±ïÖÕîπ©ÕΩ∏∞ÅÕï…Ÿ•çîµ›Ω…≠ï»π©Ã∞Å—ïÕ–µ±Öàµ’¡ëÖ—îµ…ïçΩŸï…‰πµ©Ã∞Å—ïÕ—ÃΩô•·—’…ïÃΩ»ƒ–‹»ÃµÕï…Ÿ•çîµ›Ω…≠ï»µâïôΩ…îµµÖπ’Ö∞µçΩπÕïπ–π©Ã∞ÅI=5A}=YI10πµê∞ÅI=5A}}Q11πµê∞Å=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµê∞Å=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=Lπµê∞Å=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµê∞Å=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩ∏∏ÅIΩ±±âÖç¨Ä·âççôò‰ÄºÅHƒ–‹∏»∏–∏ÅA’â±•çÖçßÕ∏ÅHƒ–‹∏»∏–∏ƒÅA9%9Q∏)%πç•ëïπç•ÑÅΩ¡ï…Ö—•ŸÑËÅ°’âºÅ•π—ï…ŸÖ±ºÅµÖÂΩ»Åëîÿ¡ÃÅïπ—…îÅ…ï¡Ω…—ïÃÅë’…Öπ—îÅÖªÖ±•Õ•ÃÏÅπºÅô•πù•»ÅÖç—•Ÿ•ëÖêÅπ§ÅçΩπÕ•ëï…Ö»ÅëΩç’µïπ—ºÅçΩµºÅ—ïµ¡Ω…•ÈÖëΩ»∏ÅΩπ—•π’Ö»Å…ï¡Ω…—ÖπëºÅÖçç•ΩπïÃÅçΩµ¡…ΩâÖâ±ïÃÅ¡Ω»Å—…Öµº∏((ååÅHƒ–‹∏»∏–∏ƒÉ
‹Å…ïç’¡ï…ÖçßÕ∏Å‰ÅMçΩ…ïÃÉ
‹ÄÃ¿º¿‰º»¿»ÿ)Iïôï…ïπç•ÑÉÈπ•çÑÅ…ïç’¡ï…ÖëÑËÄ…‰≈Ã—¥Õ¿ÿ¥—’µ	»‰µŸ≈‰»Ã‹·π¡πúÄ†ÀäQÖ—ïùΩÀµÑ§ÏÅUπ•Ÿï…ÕÖ±ïÃÅëïÕçÖ…—ÖëÑÅï·¡…ïÕÖµïπ—î∏ÅQÖ…©ï—ÑÉÈπ•çÑÅçΩ∏Åç•πçºÅçΩ±’µπÖÃ∞Å—…ïÃÅâΩ—ΩπïÃÅîÅ•π±•πîÅÕïÖ…ç†ÏÅÖŸΩ…•—ΩÃÅï∏Å±ÑÅµ•ÕµÑÅ—Öâ±Ñ∞Å±ΩùºÅ¡ï…µ•—îÅÖëµ•π•Õ—…ÖçßÕ∏ÅÖ’—Ω…•ÈÖëÑÅÕ•∏ÅÖù…ïùÖ»ÅçΩπ—…Ω±ïÃ∏ÅIïç’¡ï…ÖçßÕ∏Å•πç…ïµïπ—Ö∞ÅÕΩâ…îÅÖïâîÿÂî∞Å¡Ö—ç†ÅÖ¡±•çÖëºÅï·ç±’ÂïπëºÅµÖπ’Ö∞ÅÂÑÅÖç—’Ö±•ÈÖëº∏Å	ÖπçºÅ”•çπ•çºÅçΩµ¡±ï—ºÅ1ÅAMLÏÅπÖŸïùÖëΩ»Å±ΩçÖ∞Åâ±Ω≈’ïÖëºÅ¡Ω»ÅëïÕçÖ…ùÑÅ—…’πçÖëÑ∞Å…ïŸ•ÕßÕ∏ÅA…ïŸ•ï‹Å8ÅUIM<∏Å9•πüÈ∏Åïπ—Ω…πºÅô•©ºÅ¡’â±•çÖëºÅπ§Å•πÕ—Ö±ÖçßÕ∏Åëï∞Å¡…Ω¡•ï—Ö…•ºÅÖç—’Ö±•ÈÖëÑ∏ÅQÖ…ïÖÃÄÀäL‹ÅÕ•ù’ï∏Å¡ïπë•ïπ—ïÃ∏)…ç°•ŸΩÃËÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=LπµëÄ∞ÅÅI=5A}}Q11πµëÄ∞ÅÅI=5A}=YI10πµëÄ∞ÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅ±•Ÿîµ°’àπ°—µ±Ä∞ÅÅ±•Ÿîµ°’àπ©ÕÄ∞ÅÅ…ï±ïÖÕîπ©ÕΩπÄ∞ÅÅÕçΩ…ïÃµ’§πçÕÕÄ∞ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄ∞ÅÅ—ïÕ–µ±Öàµ…ïù•Õ—…Ö—•Ω∏µ¡…•ŸÖ—îµ…Ω’πëÃµïπ—…‰πµ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµ—Ω’…πÖµïπ–µπÖŸ•ùÖ—•Ω∏πµ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµ’¡ëÖ—îµ…ïçΩŸï…‰πµ©ÕÄ∞ÅÅ—ïÕ–µÿÃ‘Ãµ±•Ÿîµ°’àπµ©ÕÄ∞ÅÅ—ïÕ—ÃΩô•·—’…ïÃΩ»ƒ–‹»ÃµÕï…Ÿ•çîµ›Ω…≠ï»µâïôΩ…îµµÖπ’Ö∞µçΩπÕïπ–π©ÕÄ∏()Ωπ—•π’•ëÖêÅ…ïµΩ—ÑÅëΩç’µïπ—Ö∞Å•πç±’•ëÑËÅÅ=9QI=1}AI=eQ=}M%IΩ59U1}QIM}Hƒ–›|»πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩAI=5AQ}=9Q%9U%}Hƒ–›|»πµëÄ∏(((ååÅIïŸ•ÕßÕ∏ÅMçΩ…ïÃÄ»¿»ÿ¥¿‰¥Ã¿Ä»»Ë»»Å’Ö—ïµÖ±ÑÉ
‹Å¡ïπë•ïπ—îÅŸ•Õ’Ö∞)Ω……ïççßÕ∏Åëï∞Å¡…Ω¡•ï—Ö…•ºËÅ—•¡Ωù…ÖõµÑÅ‰Å—Öµá≈ΩÃÅï≈’•ŸÖ±ïπ—ïÃÅçΩµ’πïÃÅÑÅ…ΩπëÑ∞Å—Ω…πïºÅ‰Åëï—Ö±±îÏÅ±ΩùºÅÖ’µïπ—ÖëºÄ»‘îÅµÖπ—ïπ•ïπëºÅ¡…Ω¡Ω…ç•ΩπïÃ∏Å•·—’…îÅ∑ÕŸ•∞ÄÃ‰√\‡––ÅœÕ±ºÅçΩ∏ÅëïµΩÕ—…ÖçßÕ∏∏ÅΩµ¡Ö…—•»ÅçΩπÕï…ŸÑÅçΩπ—…Ω∞ÅëîÅÖ’—Ω…•ÈÖçßÕ∏∏ÅA…’ïâÖÃÅëîÅMçΩ…ïÃÅ‰ÅπÖŸïùÖçßÕ∏ÅAMLÏÅπºÅ•µ¡±•çÑÅÖçï¡—ÖçßÕ∏ÅŸ•Õ’Ö∞Åπ§Å¡’â±•çÖçßÕ∏Åô•πÖ∞∏ÅAïπë•ïπ—ïÃÄÀäL‹ÅÕ•∏Åëïç±Ö…Ö»Å…ïÕ’ï±—ΩÃ∏)…ç°•ŸΩÃËÅÅ±•Ÿîµ°’àπ©ÕÄ∞ÅÅÕçΩ…ïÃµ’§πçÕÕÄ∞ÅÅ—ïÕ—ÃΩô•·—’…ïÃΩÕçΩ…ïÃµµΩâ•±îµ…ïŸ•ï‹π°—µ±Ä∏(((åååÅ©’Õ—îÅŸ•Õ’Ö∞ÅçΩµ¡…ΩâÖëºÄ»»Ë»ÿÅ’Ö—ïµÖ±Ñ)A…ïŸ•ï‹ÄŸê·Ñ·ôêÅIdÏÅô•±—…ºÅMïπ•Ω»Å‰ÅãÈÕ≈’ïëÑÅëïŸ’ï±Ÿï∏Å’πÑÅô•±Ñ∞Å±ΩùºÅÖµ¡±•ÖëºÅŸ•Õ•â±î∏ÅMîÅÖ©’Õ—ÑÅÕï¡Ö…ÖçßÕ∏Å!=e<ΩI=MLΩ9Q<Åï∏ÅÅÕçΩ…ïÃµ’§πçÕÕÄÏÅÕîÅçΩπÕï…ŸÑÅ—•¡Ωù…ÖõµÑÅçΩ∑È∏∏ÅÖ¡—’…ÑÅ∑ÕŸ•∞Åù’Ö…ëÖëÑÏÅÖçï¡—ÖçßÕ∏Åô•πÖ∞Å¡ïπë•ïπ—î∏(((ååÅ•…ïç—…•çïÃÅÖë•ç•ΩπÖ±ïÃÅëï∞Å¡…Ω¡•ï—Ö…•ºÉ
‹Ä»¿»ÿ¥¿‰¥Ã¿Ä»»ËÃ‹Å’Ö—ïµÖ±Ñ()Õ—ÖÃÅë•…ïç—…•çïÃÅÖµ¡≥µÖ∏Å±ÖÃÅ—Ö…ïÖÃÅ¡ïπë•ïπ—ïÃÅ‰ÅπºÅï≈’•ŸÖ±ï∏ÅÑÅ¡…’ïâÖÃÅÖ¡…ΩâÖëÖÃÅπ§Å¡’â±•çÖçßÕ∏∏()ÅIï≈’•Õ•—ºÅÅΩµ¡…ΩâÖçßÕ∏ÅΩâ±•ùÖ—Ω…•ÑÅÅÕ—ÖëºÅ)¥¥µ¥¥µ¥¥µ)Å’ïπ—î∞Å—•¡ºÅ‰Å—Öµá≈ΩÃÅï≈’•ŸÖ±ïπ—ïÃÅ•ù’Ö±ïÃÅï∏Å—ΩëΩÃÅ±ΩÃÅMçΩ…ïÃÅÅΩµ¡Ö…Ö»Å…ΩπëÑ∞Åïπï…Ö∞∞ÅÖ—ïùΩÀµÑ∞ÅÖŸΩ…•—ΩÃÅ‰Åëï—Ö±±îÅÑÅ•ù’Ö∞ÅÖπç°ºÅÅ%µ¡±ïµïπ—ÖçßÕ∏ÅçΩ∑È∏ÏÅŸï…•ô•çÖçßÕ∏ÅçΩµ¡±ï—ÑÅ¡ïπë•ïπ—îÅ)Å1ΩùΩÃÄ»‘îÅµÖÂΩ…ïÃ∞ÅÕ•∏ÅëïôΩ…µÖ»ÅÅ5ïë•»ÅÖπç°ºÅ‰Å…ï±ÖçßÕ∏ÅëîÅÖÕ¡ïç—ºÅï∏ÅçÖëÑÅŸ•Õ—ÑÅëîÅMçΩ…ïÃÅÅQΩ…πïºÅ∑ÕŸ•∞ÅçΩµ¡…ΩâÖëºÏÅëï∑ÖÃÅŸ•Õ—ÖÃÅ¡ïπë•ïπ—ïÃÅ)Åïπï…Ö∞Å…óÈπîÅ—ΩëΩÃÏÅÖ—ïùΩÀµÑÅëï…•ŸÑÅëîÅçÖ—ïùΩÀµÑÅÖÕ•ùπÖëÑÅÅ±—ï…πÖ»Åïπï…Ö∞Å‰ÅçÖ—ïùΩÀµÑÅ¡…Ω¡•ÑÅÕ•∏Åï·ç±’•»Åπ§ÅµΩë•ô•çÖ»Å©’ùÖëΩ…ïÃÅÅAïπë•ïπ—îÅëîÅ…ïçΩ……•ëºÅ•π—ïù…Ö∞Å)ÅQÖâ±ï…ºÅÖŸΩ…•—ΩÃÅµïÈç±ÑÅ©’ùÖëΩ…ïÃÅï±ïù•ëΩÃÅï∏Åïπï…Ö∞Å‰ÅçÖ—ïùΩÀµÖÃÅÅ±ïù•»Å©’ùÖëΩ…ïÃÅëîÅëΩÃÅçÖ—ïùΩÀµÖÃÏÅÖµâΩÃÅëïâï∏ÅÖ¡Ö…ïçï»ÅÕ•∏Åô•±—…ºÅ…ïÕ•ë’Ö∞ÅÅ9ÖŸïùÖëΩ»Å…ïÖ∞ÅA…ïŸ•ï‹Å1ÅAMLÅ)ÅΩâ±îÅç±•åΩëΩâ±îÅ—Ω≈’îÅï∏ÅçÖëÑÅπΩµâ…îÅÖâ…îÅ±ΩÃÄƒ‡Å°ΩÂΩÃÅÅYï»Ä«äL‰Å‰Äƒ√äLƒ‡Å…ΩÕÃΩ9ï–Åï∏Å…ΩπëÑÅ‰Å±ÖÃÅ—…ïÃÅŸ•Õ—ÖÃÏÅïÕ—…ï±±ÑÅ•πëï¡ïπë•ïπ—îÅÅAïπë•ïπ—îÅëîÅπÖŸïùÖëΩ»Åï∏Å—ΩëÖÃÅ)Å`ÅÖ……•âÑÅÑÅ±ÑÅëï…ïç°ÑÅç•ï……ÑÅœÕ±ºÅëï—Ö±±îÅÅΩπÕï…ŸÖ»ÅŸ•Õ—Ñ∞Åô•±—…ΩÃ∞ÅÕç…Ω±∞∞ÅôÖŸΩ…•—ΩÃÅ‰ÅëÖ—ΩÃÅÅAïπë•ïπ—îÅëîÅπÖŸïùÖëΩ»Å)ÅM=ILÅQ=I9<ÅÖâ…îÅë•…ïç—Öµïπ—îÅ¡•ÈÖ……ÑÅÖÕΩç•ÖëÑÅÅïÕëîÅ…ΩπëÑÅÖπΩ—ÖëÑ∞Åïπ—…Ö»∞ÅÖ±—ï…πÖ»ÅŸ•Õ—ÖÃÅ‰ÅŸΩ±Ÿï»ÅÑÅ±ÑÅµ•ÕµÑÅMçΩ…îÅÖ…êÅÅ±’©ºÅ…ïÖ∞Åπ’ïŸºÅï∏Å1Å‰Å…ï—Ω…πºÅAMLÏÅ-%IMQLÅï·•Õ—ïπ—îΩ¡…Ωë’ççßÕ∏Å¡ïπë•ïπ—ïÃÅ)Å%πŸ•—ÖëºÅïπ—…ÑÅ¡Ω»ÅèÕë•ùºÅÕΩâ…îÅMçΩ…ïÃÅë•ô’µ•πÖëºÅÅÕë•ùºÅ€Ö±•ëºÅç•ï……ÑÅïµï…ùïπ—îÅ‰ÅÖç±Ö…ÑÅôΩπëºÏÅ•π€Ö±•ëºΩŸïπç•ëºÅçΩπÕï…ŸÑÅâ±Ω≈’ïºÏÅœÕ±ºÅ±ïç—’…ÑÅÕïüÈ∏Å¡ï…µ•ÕºÅÅAïπë•ïπ—îÅ)ÅQΩëΩÃÅ±ΩÃÅ”µ—’±ΩÃÅ‰ÅÕ’â”µ—’±ΩÃÅÕΩ∏Åô•©ΩÃÅÅ9ºÅïë•—Ö»Åπ§ÅÕï±ïçç•ΩπÖ»ÅïπçÖâïÈÖëΩÃ∞ÅÕ’âïπçÖâïÈÖëΩÃ∞ÅÀÕ—’±ΩÃÅ‰Å—Öâ±ÖÃÏÅçÖµ¡ΩÃÅëîÅïπ—…ÖëÑÅÕ•ù’ï∏Åïë•—Öâ±ïÃÅÅMçΩ…îÅÖ…êËÅÕï±ïççßÕ∏Åâ±Ω≈’ïÖëÑÅçΩµ¡…ΩâÖëÑÏÅëï∑ÖÃÅŸ•Õ—ÖÃÅ‰Åïë•çßÕ∏Å¡ïπë•ïπ—ïÃÅ)ÅIïôï…ïπç•ÑÅUπ•Ÿï…ÕÖ±ïÃÅÖπ’±ÖëÑÅÅ9ºÅ’ÕÖ»ÅïÕÑÅ•µÖùï∏ÅçΩµºÅë•Õó≈ºÏÅ…ïôï…ïπç•ÑÅ—Ω…πïºÅï·ç±’Õ•ŸÑÄÀäQÖ—ïùΩÀµÑÅÅ¡±•çÖëºÅ()9ºÅ—ΩçÖ»ÅÕï±ïç—Ω»Å5A<ÅHƒ–‹∏»∏–∏Å9ºÅâΩ……Ö»∞Å…ïïµ¡±ÖÈÖ»Åπ§Åï·•ù•»Å…ïÖπΩ—Ö»ÅÕçΩ…ïÃ∏Å9ºÅ¡’±ÕÖ»ÅQU1%iHÅï∏Å•πÕ—Ö±Öç•ΩπïÃÅëï∞Å¡…Ω¡•ï—Ö…•º∏Å1Å‰Å¡…Ωë’ççßÕ∏ÅÕîÅïπ—…ïùÖ∏Å—…ÖÃÅçΩµ¡…ΩâÖçßÕ∏Åô’πç•ΩπÖ∞Å‰ÅŸ•Õ’Ö∞∏(((ååÅMçΩ…ïÃÉ
‹ÅçΩπ—…Ω±ïÃÅ‰ÅçΩπÕï…ŸÖçßÕ∏É
‹Ä»¿»ÿ¥¿‰¥Ã¿Ä»»Ë–¿Å’Ö—ïµÖ±Ñ)M=ILÅQ=I9<Å’ÕÑÅÖÕΩç•ÖçßÕ∏Åù’Ö…ëÖëÑ∞Å¡…ï¡Ö…ÑÅ¡’â±•çÖçßÕ∏ÅÖπ—ïÃÅëîÅπÖŸïùÖ»Å‰ÅçΩπÕï…ŸÑÅ…’—ÑÅëîÅ…ï—Ω…πºÅÑÅ±ÑÅMçΩ…îÅÖ…êÅ‰ÅÕ‘Åç’ïπ—Ñ∏ÅÖŸΩ…•—ΩÃÅ±•µ¡•ÑÅãÈÕ≈’ïëÑÅ‰ÅçÖ—ïùΩÀµÑÅ¡…ïŸ•ÖÃ∏ÅSµ—’±ΩÃΩÕ’â”µ—’±ΩÃÅ‰ÅπΩµâ…ïÃÅëîÅMçΩ…ïÃÅÕ•∏ÅÕï±ïççßÕ∏ÏÅïπ—…ÖëÖÃÅÕ•ù’ï∏Åïë•—Öâ±ïÃ∏Å•·—’…îÅëîÅ…ïç’¡ï…ÖçßÕ∏ÅçΩπÕï…ŸÑÅ…ΩπëÑÅ‰ÅÕçΩ…ïÃÅ‰Å…ï—•ïπîÅ¡’â±•çÖçßÕ∏ÅôÖ±±•ëÑ∏ÅAï…ô•∞Å”•çπ•çºÅ1ÅAMLÏÅÕï…Ÿ•ëΩ»ΩπÖŸïùÖëΩ»Å¡ïπë•ïπ—ïÃ∏Å%πŸ•—ÖëºÅë•ô’µ•πÖëºÅ‰Åëï—Ö±±îÅçΩ∑È∏ÅáÈ∏Å¡ïπë•ïπ—ïÃ∏ÅA…’ïâÑÅ°•Õ”Õ…•çÑÅHƒ–ÃÅô•©ÑÅŸï…Õ•ΩπïÃÅ‰Åô±’©ºÅÖπ—ï…•Ω…ïÃ∞ÅπºÅ¡ï…—ïπïçîÅÖ∞Å¡ï…ô•∞ÅŸ•ùïπ—î∏)…ç°•ŸΩÃÅµΩë•ô•çÖëΩÃËÅÅ=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ59U1}QIM}Hƒ–›|»πµëÄ∞ÅÅI=5A}}Q11πµëÄ∞ÅÅI=5A}=YI10πµëÄ∞ÅÅùÕåµëïÕ•ù∏µÕÂÕ—ï¥πçÕÕÄ∞ÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅ±•ŸîµçΩπ—…Ω∞π©ÕÄ∞ÅÅ±•Ÿîµ°’àπ©ÕÄ∞ÅÅÕçΩ…ïÃµ’§πçÕÕÄ∞ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµ—Ω’…πÖµïπ–µπÖŸ•ùÖ—•Ω∏πµ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµ’¡ëÖ—îµ…ïçΩŸï…‰πµ©ÕÄ∞ÅÅ—ïÕ–µÕçΩ…ïÃµ—Ω’…πÖµïπ–µ…ïçΩŸï…‰πµ©ÕÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ5QI%i}AQ%=9}M=IM}Hƒ–›|…|—|ƒπµëÄ∏(((ååÅΩµ¡…ΩâÖçßÕ∏Å…ïÖ∞ÅëîÅ¡’â±•çÖçßÕ∏É
‹Ä»¿»ÿ¥¿‰¥Ã¿Ä»»Ë‘»Å’Ö—ïµÖ±Ñ)A…ïŸ•ï‹ÅçÖà¿‹‘‘ËÅIïù•Õ—…ºÅëΩÃÅ©’ùÖëΩ…ïÃÉäHÅç…ïÖ»ÅïŸïπ—ºÉäHÅ•π•ç•Ö»ÅMçΩ…îÅÖ…êÉäHÅÖπΩ—Ö»Å…ΩÕÃÄ‘Å‰Ä–ÉäHÅM=ILÅQ=I9<∏ÅI’—ÑÅ‰Å…ï—Ω…πºÅô’πç•ΩπÖ…Ω∏∞Å…ΩπëÑÅçΩπÕï…ŸÑÅÖµâΩÃÅÕçΩ…ïÃÏÅ—Öâ±ÑÅŸÖèµÑ∏ÅΩπÕ’±—ÑÅ1ÅçΩπô•…∑ÃÅïŸïπ—ºÅÖç—•Ÿº∞ÅëΩÃÅÖÕ•ùπÖëΩÃÅ‰Åçï…ºÅÕ—…ïÖµÃÅçΩπïç—ÖëΩÃ∏ÅMîÅçΩ……•ùßÃÅëï¡ïπëïπç•ÑÅëï∞Å”µ—’±ºÅŸ•Õ•â±îËÅÖÕΩç•ÖçßÕ∏Å¡ï…ÕΩπÖ∞Å¡Ω»Å%Å¡ï…µ•—îÅçΩπïç—Ö»ÅÕ•∏ÅπΩµâ…îÅΩ¡ç•ΩπÖ∞∏ÅQÖµâß•∏ÅÕîÅ¡…Ω—ïùîÅÕçΩ…îÅ∑ÖÃÅ…ïç•ïπ—îÅô…ïπ—îÅÑÅ…ïÕ¡’ïÕ—ÑÅÖ—…ÖÕÖëÑÏÅô•·—’…îÅëîÅçΩπç’……ïπç•ÑÅAML∏Åïç°ÑÅëîÅçÖ±ïπëÖ…•ºÅπºÅëïâîÅçΩπŸï…—•…ÕîÅÖ∞ÅìµÑÅÖπ—ï…•Ω»ÏÅ¡…’ïâÑÄ»¿»ÿ¥¿‰¥Ã¿ÅAML∏ÅAï…ô•∞Å1ÅçΩµ¡±ï—ºÅAML∞Å…ï¡ï—•çßÕ∏ÅëîÅÕï…Ÿ•ëΩ»ΩπÖŸïùÖëΩ»Å¡ïπë•ïπ—î∏)…ç°•ŸΩÃËÅÅ±•ŸîµçΩπ—…Ω∞π©ÕÄ∞ÅÅÕçΩ…ïÃµ’§π©ÕÄ∞ÅÅ—ïÕ–µÕçΩ…ïÃµ—Ω’…πÖµïπ–µ…ïçΩŸï…‰πµ©ÕÄ∞ÅÅ—ïÕ–µÕçΩ…ïÃµ’§πµ©ÕÄ∏(((ååÅIïç’¡ï…ÖçßÕ∏ÅçΩµ¡…ΩâÖëÑÅ‰Å”µ—’±ΩÃÅô•©ΩÃÉ
‹Ä»¿»ÿ¥¿‰¥Ã¿Ä»ÃË¿ÿÅ’Ö—ïµÖ±Ñ)A…ïŸ•ï‹ÅÄƒƒƒÿ¡ê¡êÃŸâòƒ‡Âò…çîƒŸêÃ–ÿÕÑƒ‰ƒ·ôâçÑ»–ÿƒ…Ä∞ÅïŸïπ—ºÅëîÅ¡…’ïâÑÅÄ‹‹Âå‹›î‡¥—òƒ»¥–›ÖåµÖëôî¥Ÿà‘’çâå–»›å·ÄËÅIïù•Õ—…ºÉäHÅMçΩ…îÅÖ…êÄ°…ΩÕÃÄ‘Å‰Ä–§ÉäHÅM=ILÅQ=I9<Å¡’â±•çÑÅëΩÃÅ©’ùÖëΩ…ïÃ∏ÅΩπÕ’±—ÑÅ1ÅçΩπô•…∑ÃÅ…ïŸ•ÕßÕ∏Ä‡Å‰Å…ΩÕÃΩ9ï–Ä‘º–Å‰Ä–º–∏Åïπï…Ö∞Åµ’ïÕ—…ÑÅÖµâΩÃÏÅÖ—ïùΩÀµÑÅMïπ•Ω»Åô•±—…ÑÅ±ÑÅÖÕ•ùπÖçßÕ∏ÏÅôÖŸΩ…•—ΩÃÅï±ïù•ëΩÃÅï∏Åïπï…Ö∞Å‰ÅMïπ•Ω»ÅÖ¡Ö…ïçï∏Å©’π—ΩÃ∏ÅIïù…ïÕºÅÑÅ±ÑÅµ•ÕµÑÅMçΩ…îÅÖ…êÅçΩπÕï…ŸÑÅÖµâΩÃÅÕçΩ…ïÃ∏ÅÖ¡—’…ÑÅ…ïÖ∞ÅÄΩ›Ω…≠Õ¡ÖçîΩÕç…Ö—ç†ΩÕçΩ…ïÃµçΩππïç—ïêµôÖŸΩ…•—ïÃ¥»¿»ÿ¿‰Ã¿π©¡ùÄ∏Å9ºÅçΩπÕ—•—’ÂîÅ•πÕ¡ïççßÕ∏ÅëîÅ±ÖÃÅ•πÕ—Ö±Öç•ΩπïÃÅ¡…•ŸÖëÖÃÅëï∞Å¡…Ω¡•ï—Ö…•ºÅπ§Å¡…’ïâÑÅëîÅ-%IMQLÅï∏Å¡…Ωë’ççßÕ∏∏()=…ëï∏ÅÖë•ç•ΩπÖ∞ËÅQ==LÅ±ΩÃÅ”µ—’±ΩÃÅ‰ÅÕ’â”µ—’±ΩÃÅëïâï∏ÅÕï»ÅÀÕ—’±ΩÃÅô•©ΩÃ∞ÅÕ•∏Åïë•çßÕ∏Åπ§ÅÕï±ïççßÕ∏∏Å%πç±’ÂîÅïπçÖâïÈÖëΩÃÅÕï∑Öπ—•çΩÃÅ‰ÅÀÕ—’±ΩÃÅë•ÿΩÕ¡Ö∏ÏÅπºÅâ±Ω≈’ïÑÅ±ΩÃÅçÖµ¡ΩÃÅëîÅçÖ¡—’…Ñ∏Å9ÖŸïùÖëΩ»Å…ïÖ∞ÅëîÅMçΩ…îÅÖ…êÅçΩµ¡…ΩãÃÅÅ’Õï»µÕï±ïç–ËÅπΩπïÄÅï∏ÅÕ’ÃÅ”µ—’±ΩÃÏÅçΩâï…—’…ÑÅŸ•Õ’Ö∞ÅçΩµ¡±ï—ÑÅëï∞Å¡Ö≈’ï—îÅ¡ïπë•ïπ—î∏ÅMîÅçΩπÕï…ŸÑÅ±ÑÅ…ïôï…ïπç•ÑÄÀäQÖ—ïùΩÀµÑÏÅUπ•Ÿï…ÕÖ±ïÃÅÖπ’±ÖëÑÅçΩµºÅ•µÖùï∏ÅëîÅë•Õó≈º∏()ï—Ö±±îÅçΩ∑È∏ËÅçΩ……ïù•ëºÅëΩâ±îÅ—Ω≈’îÅïπ—…îÅ…ïïµ¡±ÖÈΩÃÅëîÅô•±ÖÃÅ1%YÅ‰ÅëΩâ±îÅç±•åÅÕΩâ…îÅïÕ—…ï±±Ñ∏ÅA…’ïâÖÃÅëîÅ…ïù…ïÕßÕ∏ÅAMLËÄƒ‡Å¡ΩÕ•ç•ΩπïÃ∞ÅëΩÃÅπ•πïÃ∞ÅÕçΩ…îÅ∑ÖÃÅ…ïç•ïπ—î∞ÅïÕ—…ï±±ÑÅ•πëï¡ïπë•ïπ—îÅ‰ÅπºÅçΩµâ•πÖ»Å—Ω≈’ïÃÅëîÅ©’ùÖëΩ…ïÃÅë•Õ—•π—ΩÃ∏ÅΩµ¡…ΩâÖçßÕ∏Å…ïÖ∞ÅëîÅ—ΩëÖÃÅ±ÖÃÅŸ•Õ—ÖÃÅ—ΩëÖ€µÑÅA9%9Q∏Å9ºÅ¡’â±•çÖëºÅï∏ÅëΩµ•π•ΩÃÅô•©ΩÃ∏)…ç°•ŸΩÃËÅÅÕçΩ…ïÃµ’§π©ÕÄ∞ÅÅÕçΩ…ïÃµ’§πçÕÕÄ∞ÅÅùÕåµëïÕ•ù∏µÕÂÕ—ï¥πçÕÕÄ∞ÅÅ—ïÕ–µÕçΩ…ïÃµ’§πµ©ÕÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ5QI%i}AQ%=9}M=IM}Hƒ–›|…|—|ƒπµëÄ∏(((ååÅï—Ö±±îÅ∑ÕŸ•∞É
‹Ä»¿»ÿ¥¿‰¥Ã¿Ä»ÃËƒ»Å’Ö—ïµÖ±Ñ)A…ïŸ•ï‹ÅÖàŸâïê¿∞Å•ô…ÖµîÅ…ïÖ∞ÄÃ‰√\‡––∞ÅëïµºÅÖ•Õ±ÖëÑËÅïπï…Ö∞ÅÄ¿‘Åµ’ïÕ—…ÑÄƒ‡Å¡Ö…ïÃÅΩ8ÏÅëΩâ±îÅç±•åÅï∏ÅïÕ—…ï±±ÑÅπºÅÖâ…îÅëßÖ±Ωùº∏ÅÖ—ïùΩÀµÑÅMïπ•Ω»ÅçΩπÕï…ŸÑÅçÖ—ïùΩÀµÑÅ‰ÅãÈÕ≈’ïëÑÅ—…ÖÃÅçï……Ö»Å`∏ÅÖŸΩ…•—ΩÃÅ…óÈπîÅÄ¿‘Å‰ÅMïπ•Ω»Ä¿ƒÏÅëï—Ö±±îÅ—•ïπîÅëΩÃÅ—Öâ±ÖÃÅ‰Äƒ‡Å¡ΩÕ•ç•ΩπïÃÅ‰Åç•ï……îÅçΩπÕï…ŸÑÅÖµâÖÃÅô•±ÖÃ∏ÅÖ¡—’…ÑÅ…ïÖ∞ÅÄΩ›Ω…≠Õ¡ÖçîΩÕç…Ö—ç†ΩÕçΩ…ïÃµµΩâ•±îµëï—Ö•∞µôÖŸΩ…•—ïÃ¥»¿»ÿ¿‰Ã¿π©¡ùÄ∏Å1ÑÅçÖ¡—’…ÑÅïπçΩπ—ÀÃÅï—•≈’ï—ÑÅI=MLΩ9Q<ÅëïµÖÕ•ÖëºÅ¡ÀÕ·•µÑÅÖ∞Å¡…•µï»ÅÕçΩ…îËÅÅÕçΩ…ïÃµ’§πçÕÕÄÅ…ïÕï…ŸÑÄ–‡Å¡‡Å¡Ö…ÑÅ¡…•µï…ÑÅçΩ±’µπÑÏÅ…ïŸ•ÕßÕ∏ÅŸ•Õ’Ö∞Å¡ΩÕ—ï…•Ω»Å¡ïπë•ïπ—î∏Å9ºÅ¡…’ïâÑÅëΩâ±îÅ—Ω≈’îÅï∏Å•A°ΩπîÅõµÕ•çº∏)…ç°•ŸΩÃËÅÅÕçΩ…ïÃµ’§πçÕÕÄ∞ÅÅÕçΩ…ïÃµ’§π©ÕÄ∞ÅÅ—ïÕ–µÕçΩ…ïÃµ’§πµ©ÕÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ5QI%i}AQ%=9}M=IM}Hƒ–›|…|—|ƒπµëÄ∏(((ååÅY•ÕΩ»Å1%YÅçΩ∏Åëï—Ö±±îÅçΩ∑È∏É
‹Ä»¿»ÿ¥¿‰¥Ã¿Ä»ÃËƒ‰Å’Ö—ïµÖ±Ñ)Å±•Ÿîπ°—µ±ÄÅçÖ…ùÑÅï∞Åëï—Ö±±îÅçΩµ¡Ö…—•ëºÅÖπ—ïÃÅëï∞Å…ïπëï…•ÈÖëΩ»∏ÅÅ±•ŸîµŸ•ï‹π©ÕÄÅŸ•πç’±ÑÅçÖëÑÅπΩµâ…îÅÖ∞Å©’ùÖëΩ»Å‰ÅÕπÖ¡Õ°Ω–ÅëîÅÕ‘Å¡…Ω¡•ºÅù…’¡ºÏÅ—ïÕ–Åπ’ïŸºÅëï—ïç”ÃÅ‰ÅçΩ……•ùßÃÅ√•…ë•ëÑÅëîÉµπë•çîÅï∏ÅïπŸΩ±—Ω…•ºÅëîÅçÖ—ïùΩÀµÑ∏ÅAMLÅÅ—ïÕ–µ±•ŸîµŸ•ï‹µÕçΩ…ïÃπµ©ÕÄÅ‰Å…ïÕ’µï∏Å¡Ω»ÅµΩëÖ±•ëÖêÏÅπÖŸïùÖëΩ»Å—ΩëÖ€µÑÅ¡ïπë•ïπ—î∏ÅÅÕçΩ…ïÃµ’§πçÕÕÄÅçΩµ¡Ö…—îÅô’ïπ—îΩ—Öµá≈ºÅëîÅπΩµâ…ïÃÅ‰ÅŸÖ±Ω…ïÃÅ‰Å±ΩùºÅ°Ω…•ÈΩπ—Ö∞∞Ä»‘îÅµÖÂΩ»Å≈’îÅŸ•ÕΩ»Å¡…ïŸ•º∏)A…’ïâÑÅ°•Õ”Õ…•çÑÅXÃ‘»ÅôÖ±±ÑÅ¡Ω…≈’îÅïÕ¡ï…ÖâÑÅÖ’—Ω…•ÈÖçßÕ∏Åï∏Åµ•ëë±ï›Ö…îÅ±•µ•—ÖëÑÅÑÅ…ïÖêÏÅHƒ–‹Åëï±ïùÑÅ1%YÅÖ∞ÅÕï…Ÿ•ëΩ»Å≈’îÅçΩπ—…Ω±ÑÅ—Ω≠ï∏ΩÕïç…ï—º∞ÅΩ…•ùï∏Å‰ÅÖççïÕºÅ¡ï…ÕΩπÖ∞∏Å9ºÅçÖµâ•Ö»Åπ§Å…ïë’ç•»Å¡ï…µ•ÕΩÃÅ¡Ö…ÑÅÕÖ—•ÕôÖçï»Å’∏Åç°ï≈’ïºÅ°•Õ”Õ…•çº∏ÅAï…ô•∞ÅŸ•ùïπ—îÅëîÅ•π—ïù…ÖçßÕ∏ΩÕïù’…•ëÖêÅëïâîÅ¡ÖÕÖ»Å‰Å1%YÅ…ïÖ∞ÅëïâîÅçΩµ¡…ΩâÖ…ÕîÅÖπ—ïÃÅëîÅ¡’â±•çÖ»∏)…ç°•ŸΩÃËÅÅ±•Ÿîπ°—µ±Ä∞ÅÅ±•ŸîµŸ•ï‹π©ÕÄ∞ÅÅÕçΩ…ïÃµ’§πçÕÕÄ∞ÅÅ—ïÕ–µ±•ŸîµŸ•ï‹µÕçΩ…ïÃπµ©ÕÄ∞ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄ∏(((ååÅŸ•ëïπç•ÑÅπÖŸïùÖëΩ»Å—Ö…ïÖÃÄÃÅ‰Ä–É
‹Ä»¿»ÿ¥¿‰¥Ã¿Ä»ÃË»ÿÅ’Ö—ïµÖ±Ñ)A…ïŸ•ï‹ÅÄ‹≈ò›ê‰‰»…å»—âÑ≈å·ëêÃƒ¿—ò≈Ñ·ïÖÑ—òŸçå’ëêÿ›ÄËÅïπ±ÖçîÅ¡…•ŸÖëºÅ…ïÖ∞ÅëîÅ…ΩπëÑÅï·•Õ—ïπ—î∞ÅëΩÃÅ©’ùÖëΩ…ïÃ∞ÅÖâ…îÄƒ‡ÅÕçΩ…ïÃÅëï∞ÅÕïù’πëºÅ©’ùÖëΩ»ÅAIU	ÅHƒ–‹ÅÅ‰Åµ’ïÕ—…ÑÄ–º–Åï∏Å°ΩÂºÄƒ∏Å`Åç•ï……ÑÅœÕ±ºÅëï—Ö±±îÅ‰ÅµÖπ—•ïπîÅÖµâΩÃÅ©’ùÖëΩ…ïÃ∏ÅÖ¡—’…ÑÅÄΩ›Ω…≠Õ¡ÖçîΩÕç…Ö—ç†ΩÕçΩ…ïÃµ…Ω’πêµ±•Ÿîµëï—Ö•∞¥»¿»ÿ¿‰Ã¿π©¡ùÄ∏Åïπï…Ö∞∞ÅÖ—ïùΩÀµÑÅ‰ÅÖŸΩ…•—ΩÃÅÂÑÅçΩµ¡…ΩâÖëΩÃÅï∏Å…ïŸ•ÕßÕ∏Å∑ÕŸ•∞ÅÖπ—ï…•Ω»ÏÅ∑ÕŸ•∞ÅõµÕ•çºÅÕ•ù’îÅë•Õ—•π—ºÅëîÅπÖŸïùÖëΩ»∏)	Ω—ΩπïÃÅ•πôï…•Ω…ïÃÅï∏ÅπÖŸïùÖëΩ»Å…ïÖ∞ËÅQKL∞ÅYHÅ5$ÅQI)Q∞ÅQ=I9<Å‰ÅM=ILÅQ=I9<∞ÅôΩπëºÅ…ùà†‘∞‘∞‘§∞ÅâΩ…ëîÅ…ùà†–‰∞»‘‘∞¿§∞Äƒº»Å¡‡ÅÕïüÈ∏ÅâΩ”Õ∏∏ÅÖ¡—’…ÑÅÄΩ›Ω…≠Õ¡ÖçîΩÕç…Ö—ç†ΩÕçΩ…îµçÖ…êµâΩ——Ω¥µâ’——ΩπÃ¥»¿»ÿ¿‰Ã¿π©¡ùÄ∏Å9ºÅ…ï≈’•ï…îÅ…ï°Öçï»Åï∞ÅïÕ—•±ºÅ•µ¡±ïµïπ—Öëº∏)M•ù’•ïπ—îÅ—Ö…ïÑËÅ¡…’ïâÑÅµÖπ’Ö∞ÅHƒ–‹∏»∏–ÉäHÅHƒ–‹∏»∏–∏ƒÅï∏ÅA…ïŸ•ï‹ÅÖ•Õ±ÖëºÅëîÅçÖëÑÅ¡…ΩÂïç—º∞ÅÕ•∏Å¡’±ÕÖ»ÅQU1%iHÅï∏Å±ÖÃÅ•πÕ—Ö±Öç•ΩπïÃÅëï∞Å¡…Ω¡•ï—Ö…•º∏ÅIÖµÑÅëîÅ¡…’ïâÑÅÅ±ÖàΩ»ƒ–‹»–ƒµµÖπ’Ö∞µ’¡ëÖ—îµ¡…ΩΩò¥»¿»ÿƒ¿¿≈ÄÅ¡Ö…—îÅëîÅÅÖïâîÿÂïëî¿≈ò¿‹≈êŸââôòÃ¡ïëôÑÿ¿›à‹≈ëê‘‡‹’âÄ∞Å…ï±ïÖÕîÅHƒ–‹∏»∏–ÅŸï…•ô•çÖëº∏)…ç°•ŸΩÃËÅÅ±•Ÿîπ°—µ±Ä∞ÅÅ±•ŸîµŸ•ï‹π©ÕÄ∞ÅÅÕçΩ…ïÃµ’§πçÕÕÄ∞ÅÅ—ïÕ–µ±•ŸîµŸ•ï‹µÕçΩ…ïÃπµ©ÕÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ5QI%i}AQ%=9}M=IM}Hƒ–›|…|—|ƒπµëÄ∏(((ååÅÖ’ÕÑÅëîÅÖç—’Ö±•ÈÖçßÕ∏ÅÖ’—Ω∑Ö—•çÑÅ¡ï…ÕΩπÖ∞É
‹Ä»¿»ÿ¥¿‰¥Ã¿Ä»ÃËÃ–Å’Ö—ïµÖ±Ñ)Ö±±ºÅïπçΩπ—…ÖëºËÅπÖŸïùÖçßÕ∏ÅëîÅMçΩ…îÅÖ…êÅçΩ∏Å¡ï…ÕΩπÖ±Ÿïπ–Ω¡ï…ÕΩπÖ±ççΩ’π–ÅëïŸΩ±€µÑÅë•…ïç—Öµïπ—îÅ!Q50Åπ’ïŸºÅ—…ÖÃÅÖ’—Ω…•ÈÖçßÕ∏Å‰Åï±’ìµÑÅçΩπÕïπ—•µ•ïπ—ºÅµÖπ’Ö∞∏ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄÅçΩπÕï…ŸÑÅŸÖ±•ëÖçßÕ∏ÅÖç—’Ö∞Åï∏ÅÕï…Ÿ•ëΩ»∞Å…ïç°ÖÈÑÅÖççïÕºÅ…ïŸΩçÖëºÅ‰ÅÕ•…ŸîÅŸï…ÕßÕ∏ÅÖçï¡—ÖëÑÅ°ÖÕ—ÑÅQU1%iHÏÅëïÕçÖ…ùÑÅ•πçΩµ¡±ï—ÑÅµÖπ—•ïπîÅŸï…ÕßÕ∏ÅÖπ—ï…•Ω»∏ÅÅ—ïÕ–µ±Öàµ’¡ëÖ—îµ…ïçΩŸï…‰πµ©ÕÄÅï©ïç’—ÑÅïÕΩÃÅçÖÕΩÃÅ¡Ö…ÑÅ1Å‰Å¡…Ωë’ççßÕ∏ÅçΩ∏Åç’ïπ—ÖÃÅ¡ï…ÕΩπÖ±ïÃ∏ÅAMLÅÖ’—ΩµÖ—•ÈÖëº∞Å¡…’ïâÑÅ…ïÖ∞ÅëîÅ¡ï…ô•±ïÃÅ—ΩëÖ€µÑÅ¡ïπë•ïπ—î∏Å9ºÅÕîÅ¡’±œÃÅQU1%iHÅï∏Å•πÕ—Ö±Öç•ΩπïÃÅëï∞Å¡…Ω¡•ï—Ö…•º∏)…ç°•ŸΩÃËÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄ∞ÅÅ—ïÕ–µ±Öàµ’¡ëÖ—îµ…ïçΩŸï…‰πµ©ÕÄ∏(((ååÅIïù•Õ—…ºÅ•π—ïù…Ö∞ÅëîÅ…ïç’¡ï…ÖçßÕ∏Å‰ÅÖç—’Ö±•ÈÖçßÕ∏É
‹Ä»¿»ÿ¥¿‰¥Ã¿Ä»ÃËÃ‹Å’Ö—ïµÖ±Ñ)IïÕ¡Ö±ëºÅΩ…•ù•πÖ∞Å¡…ïÕï…ŸÖëºËÅÅ=9QI=1}AI=eQ=}M%IΩIUAI%=9}Hƒ–›|…|—|ƒπ¡Ö—ç°Ä∏Å1ÖÃÅ¡…’ïâÖÃÅëîÅâÖÕîÅ•π•ç•Ö∞Åò‹›òƒ‘‰ΩÑ·ôÖîÃ–ÿÅπºÅ¡’â±•çÖ…Ω∏Å¡Ω»ÅçΩπ—…Ω±ïÃÅëîÅëΩç’µïπ—ÖçßÕ∏ÏÅâÖÕîÅÖ•Õ±ÖëÑÅçΩ……ïù•ëÑÅò–‡Âëà‘ÅIdÅï∏ÅÖµâΩÃÅ¡…ΩÂïç—ΩÃÅçΩπÕï…ŸÑÅèÕë•ùºÅï·Öç—ºÅHƒ–‹∏»∏–Å‰ÅœÕ±ºÅçÖµâ•ÑÅëΩç’µïπ—ÖçßÕ∏∏ÅAï…ô•±ïÃÅπÖŸïùÖëΩ»Å¡…Ω¡•ΩÃËÅQU1%i%=8Å1Å…ΩÕÃΩ9ï–Ä‘º–ÏÅQU1%i%=8ÅAI=Äÿº‘∏ÅµâΩÃÅÕ•ù’ï∏Åï∏ÅHƒ–‹∏»∏–ÅÖπ—ïÃÅëîÅΩô…ïçï»Åπ’ïŸÑÅŸï…ÕßÕ∏∏Å9ºÅ¡ï…—ïπïçï∏ÅÑÅ•πÕ—Ö±Öç•ΩπïÃÅëï∞Å¡…Ω¡•ï—Ö…•º∏Åç—’Ö±•ÈÖçßÕ∏Å…ïÖ∞Å—ΩëÖ€µÑÅ¡ïπë•ïπ—î∏)…ç°•ŸΩÃËÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄ∞ÅÅ—ïÕ–µ±Öàµ’¡ëÖ—îµ…ïçΩŸï…‰πµ©ÕÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩIUAI%=9}Hƒ–›|…|—|ƒπ¡Ö—ç°Ä∞ÅÅ=9QI=1}AI=eQ=}M%IΩ5QI%i}AQ%=9}M=IM}Hƒ–›|…|—|ƒπµëÄ∏(((ååÅ%πŸ•—Öëº∞Å1%YÅ‰ÅÖç—’Ö±•ÈÖçßÕ∏Å…ïÖ∞É
‹Ä»¿»ÿ¥ƒ¿¥¿ƒÄ¿¿Ë¿–Å’Ö—ïµÖ±Ñ)=…ëï∏ÅçΩπÕï…ŸÖëÑËÅ”µ—’±ΩÃΩÕ’â”µ—’±ΩÃÅô•©ΩÃ∞ÅÕ•∏Åïë•çßÕ∏Åπ§ÅÕï±ïççßÕ∏ÏÅµ•ÕµÑÅô’ïπ—îÅ‰Å—Öµá≈ΩÃÅçΩ……ïÕ¡Ωπë•ïπ—ïÃÅï∏ÅMçΩ…ïÃÏÅ±ΩùΩÃÄ»‘îÅµÖÂΩ…ïÃÏÅ•µÖùï∏ÅUπ•Ÿï…ÕÖ±ïÃÅÖπ’±ÖëÑÏÅïπï…Ö∞ÉäHÅÖ—ïùΩÀµÑÅÖÕ•ùπÖëÑÉäHÅÖŸΩ…•—ΩÃÅµïÈç±ÖëΩÃ∞Å—ΩëΩÃÅçΩ∏Åëï—Ö±±îÅëîÄƒ‡Å°ΩÂΩÃÅ‰Å`∏Å5A<ÅHƒ–‹∏»∏–ÅÕîÅçΩπÕï…ŸÑ∏ÅQΩëΩÃÅïÕ—ΩÃÅ…ï≈’•Õ•—ΩÃÅ¡ï…µÖπïçï∏Åï∏ÅµÖπ’Ö∞Å‰ÅµÖ—…•Ë∏)ç—’Ö±•ÈÖçßÕ∏Å…ïÖ∞Åï∏Å¡ï…ô•±ïÃÅ¡…Ω¡•ΩÃÅÖ•Õ±ÖëΩÃÅëîÅÖµâΩÃÅ¡…ΩÂïç—ΩÃËÅHƒ–‹∏»∏–ÅçΩπÕï…€ÃÅÕçΩ…ïÃÅÖπ—ïÃÅëîÅQU1%iHÏÅ—…ÖÃÅ¡’±ÕÖçßÕ∏Åï·¡≥µç•—ÑÅœÕ±ºÅï∏Å¡ï…ô•±ïÃÅ¡…Ω¡•ΩÃ∞ÅHƒ–‹∏»∏–∏ƒÅçΩπÕï…€ÃÅ1Å…ΩÕÃΩ9ï–Ä‘º–Å‰ÅAI=Äÿº‘∞Å©’ùÖëΩ…ïÃÅ‰Å°ΩÂºÄ»∏ÅÖ¡—’…ÖÃÄΩ›Ω…≠Õ¡ÖçîΩÕç…Ö—ç†ΩµÖπ’Ö∞µ±ÖàµÖô—ï»µ¡…ΩΩò¥»¿»ÿ¿‰Ã¿π©¡úÅ‰ÄΩ›Ω…≠Õ¡ÖçîΩÕç…Ö—ç†ΩµÖπ’Ö∞µ¡…ΩêµÖô—ï»µ¡…ΩΩò¥»¿»ÿ¿‰Ã¿π©¡ú∏Å9ºÅÕîÅ¡’±œÃÅÖç—’Ö±•ÈÖçßÕ∏Åëï∞Å¡…Ω¡•ï—Ö…•º∏ÅïÕçÖ…ùÑÅôÖ±±•ëÑÅçΩπÕï…ŸÑÅŸï…ÕßÕ∏ÅÖπ—ï…•Ω»Åï∏Å¡…’ïâÑÅçΩµ¡±ï—ÑÅëï∞Å›Ω…≠ï»ÏÅπºÅÕ•µ’±ÖëÑÅáÈ∏Åï∏ÅπÖŸïùÖëΩ»∏)%πŸ•—ÖëºËÅïπ±ÖçîÅÕï¡Ö…ÖëºÅëîÅèÕë•ùº∞ÅŸïπ—ÖπÑÅïπç•µÑÅëîÅMçΩ…ïÃÅπ’â±ÖëºÅîÅ•πï…—î∞ÅÕ•∏ÅπΩµâ…ïÃÅô•ç—•ç•ΩÃÅπ§ÅëÖ—ΩÃÅ¡…•ŸÖëΩÃÅÖπ—ïÃÅëîÅŸÖ±•ëÖ»∏ÅÕë•ùΩÃÅ¡ï…ÕΩπÖ±ïÃÅ‰ÅÖπ—•ù’ΩÃÅ±•ùÖëΩÃÅÑÅïŸïπ—ºΩ—•¡ºÅ’ÕÖ∏ÅÕ‘Åïπë¡Ω•π–ÅçΩ……ïÕ¡Ωπë•ïπ—îÏÅëïÕ—•πºÅŸÖ±•ëÖëºÅ¡Ω»ÅÕï…Ÿ•ëΩ»Å‰ÅΩ…•ùï∏∏ÅÕ—ÖëΩÃÅÕï¡Ö…ÖëΩÃÅëîÅçï……Öëº∞ÅŸïπç•ëº∞Å…ïŸΩçÖëºÅ‰ÅôÖ±±ºÅ…ïÖ∞∏ÅAMLÅ¡…’ïâÖÃÅAΩÕ—ù…ïME0Å±ΩçÖ∞Å‰ÅôΩ…µ’±Ö…•ºÅ…ïÖ∞Åï©ïç’—ÖëºÅï∏ÅY4ÏÅŸï…•ô•çÖçßÕ∏ÅëîÅπÖŸïùÖëΩ»ÅáÈ∏Å¡ïπë•ïπ—î∏)ç—•ŸÖçßÕ∏ËÅ¡…Ωë’ççßÕ∏ÅπºÅ¡’ïëîÅëï¡ïπëï»ÅëîÅâÖπëï…ÑÅ1∏Å9’ïŸºÅù’Ö…êÅï·•ùîÅM}AIM=91}MM}AI=UQ%=9}IdÙƒÅï∏ÅA…Ωë’ç—•Ω∏Å‰ÅM}AIM=91}MM}1	}IdÙƒÅï∏ÅA…ïŸ•ï‹ÏÅëïôÖ’±–ÅëïπïùÖëº∏Å	Öπëï…ÑÅA…Ωë’ç—•Ω∏Å—ΩëÖ€µÑÅ¡ïπë•ïπ—îÅëîÅçΩπô•ù’…ÖçßÕ∏ΩŸï…•ô•çÖçßÕ∏Åï∏ÅÖµâΩÃÅ¡…ΩÂïç—ΩÃ∏Å9ºÅçÖµâ•Ö»ÅçΩπï·ßÕ∏Åπ§ÅëÖ—ΩÃÅëï∞Å¡…Ω¡•ï—Ö…•º∏ÅHƒ–‹∏»∏–∏ƒÅáÈ∏Å9<Å¡’â±•çÖëÑÅï∏ÅëΩµ•π•ΩÃÅô•©ΩÃ∏)…ç°•ŸΩÃËÅÅÖ¡§Ω}±•àΩçΩëîµÖççïÕÃπ©ÕÄ∞ÅÅÖ¡§Ω}±•àΩ±•ŸîµÕ°Ö…îπ©ÕÄ∞ÅÅÖ¡§Ω±•ŸîµÕ°Ö…îπ©ÕÄ∞ÅÅÖ¡§Ω±•Ÿîπ©ÕÄ∞ÅÅÖ¡§Ω¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄ∞ÅÅçΩëîµïπ—…‰π°—µ±Ä∞ÅÅçΩëîµïπ—…‰π©ÕÄ∞ÅÅ±•ŸîµçΩπ—…Ω∞π©ÕÄ∞ÅÅ±•Ÿîµ°’àπ©ÕÄ∞ÅÅ±•ŸîµÕ°Ö…îπ©ÕÄ∞ÅÅ±•ŸîµŸ•ï‹π©ÕÄ∞ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄ∞ÅÅ—ïÕ–µ±ÖàµçΩëîµïπ—…‰πµ©ÕÄ∞ÅÅ—ïÕ–µ±•ŸîµÕ°Ö…îµ¡ΩÕ—ù…ïÃπµ©ÕÄ∞ÅÅÖ¡§Ω}±•àΩ¡ï…ÕΩπÖ∞µÖççïÕÃµÖç—•ŸÖ—•Ω∏π©ÕÄ∞ÅÅ—ïÕ–µ¡ï…ÕΩπÖ∞µÖççïÕÃµÖç—•ŸÖ—•Ω∏πµ©ÕÄ∏(((ååÅA’â±•çÖçßÕ∏ÅÖ’—Ω…•ÈÖëÑÅ¡Ω»Å•–É
‹Ä»¿»ÿ¥ƒ¿¥¿ƒÄ¿ƒË–‹Å’Ö—ïµÖ±Ñ)=…ëï∏Å…ï•—ï…ÖëÑÅëï∞Å¡…Ω¡•ï—Ö…•ºËÅ¡’â±•çÖ»ÅÖµâΩÃÅëΩµ•π•ΩÃÏÅQU1%iHÅ±ºÅ¡’±ÕÑÉÈπ•çÖµïπ—îÅï∞Å¡…Ω¡•ï—Ö…•ºÅï∏ÅÖµâÖÃÅ•πÕ—Ö±Öç•ΩπïÃ∏Å9ºÅ…ïÖ±•ÈÖ»ÅÖç—’Ö±•ÈÖçßÕ∏Å…ïµΩ—ÑÅπ§Å¡’±ÕÖ»ÅÕ‘ÅâΩ”Õ∏∏)Iï¡ΩÕ•—Ω…•ºÅ…ïç’¡ï…ÖëºÅï·Öç—ºÅê‰‡‹¿–¿ÄºÉÖ…âΩ∞ÄÃ≈âêƒ‡‹¿ƒ¡îÕàÂâÑ‹Ã¡çÑ–ÿÕå»Õâà—å¿’ê’ëïçëò∏Å5Ö•∏Ä‡Âåÿ—òÃÅë•ô•ï…îÅ¡Ω»Å’∏ÅçΩµµ•–ÅŸÖèµºÅÕΩâ…îÅî¡îƒ≈Ñ‰ÏÅ•π—ïù…ÖçßÕ∏Å¡…ïÕï…ŸÑÅÖµâΩÃÅ°•Õ—Ω…•Ö±ïÃÅ‰Å±ΩÃÅÖ…ç°•ŸΩÃÅÂÑÅŸï…•ô•çÖëΩÃ∏ÅŸ•ëïπç•ÑÅYï…çï∞ËÅ¡’Õ†ÅµÖ•∏Ä‡Âåÿ—òÃÅ¡…Ωë’©ºÅA…Ωë’ç—•Ω∏ÅIdÅ1Åë¡±}!D‹’5a°aŸ≈π-QÈ]-≠ΩçΩM9T‡Å‰ÅAI=Åë¡±|…πÈ…Q∏’ô–›5`≈†—ô‹—	êÕ–Õ1‹…0∏)	±Ω≈’ïΩÃÅçΩπç…ï—ΩÃËÅ°ï……Öµ•ïπ—ÑÅëï¡±ΩÂ}—Ω}Ÿï…çï∞Å•πï·•Õ—ïπ—îÅ‰Å1$ÅÕ•∏ÅÕïÕßÕ∏∞Åç’ÂºÅÖççïÕºÅÑÅÖ¡§πŸï…çï∞πçΩ¥Åô’îÅâ±Ω≈’ïÖëºÅ¡Ω»Å¡Ω≥µ—•çÑÅëîÅ…ïê∏Å[µÑÅÖ±—ï…πÖ—•ŸÑÅ…ïÖ∞ËÅ•π—ïù…ÖçßÕ∏ÅÑÅµÖ•∏Åµïë•Öπ—îÅ•—!’àÅ¡Ö…ÑÅÖç—•ŸÖ»Å±ÑÅ•π—ïù…ÖçßÕ∏Å•–Åï·•Õ—ïπ—î∞ÅÕ•∏ÅçÖµâ•Ö»ÅëΩµ•π•ΩÃÅπ§ÅâÖÕïÃÅëîÅëÖ—ΩÃ∏)Ÿï…çï∞π©ÕΩ∏Å•πçΩ…¡Ω…ÑÉÈπ•çÖµïπ—îÅâÖπëï…ÑÅπºÅÕïç…ï—ÑÅM}AIM=91}MM}AI=UQ%=9}IdÙƒ∞Åïπ—…ïùÖëÑÅÑÅô’πç•ΩπïÃÅ¡Ω»ÅçΩπô•ù’…ÖçßÕ∏ÅΩô•ç•Ö∞ÅçΩµ¡Ö—•â±î∏Å∞Åù’Ö…êÅï·•ùîÅïÕ—ÑÅâÖπëï…ÑÅï∏ÅA…Ωë’ç—•Ω∏ÏÅA…ïŸ•ï‹ÅµÖπ—•ïπîÅï·ç±’Õ•ŸÖµïπ—îÅÕ‘ÅâÖπëï…ÑÅ1∏Å9ºÅçÖµâ•ÑÅ¡ï…µ•ÕΩÃÅëîÅµ•ïµâ…ΩÃ∞Å—Ω≠ïπÃÅπ§ÅçΩπï·•ΩπïÃ∏Å—ïÕ–µ¡ï…ÕΩπÖ∞µÖççïÕÃµÖç—•ŸÖ—•Ω∏πµ©ÃÅŸï…•ô•çÑÅçΩπô•ù’…ÖçßÕ∏Åïπ—…ïùÖëÑÅ‰ÅÕï¡Ö…ÖçßÕ∏ÅëîÅïπ—Ω…πΩÃ∏ÅA’â±•çÖçßÕ∏Å—ΩëÖ€µÑÅ¡ïπë•ïπ—îÅëîÅçΩπ—…Ω±ïÃÅ‰Åïπ€µº∏)AÖπ—Ö±±ÑÅ•πŸ•—ÖëºÅçΩµ¡…ΩâÖëÑÅï∏ÅπÖŸïùÖëΩ»ÅÑÅ±ÖÃÄ¿¿Ëƒ»ËÅŸïπ—ÖπÑÅÕΩâ…îÅMçΩ…ïÃÅπ’â±Öëº∞Å±ΩùºÅÖµ¡±•Öëº∞Å”µ—’±ºÅ…•Ö∞Äƒ‰Å¡‡∞Å”µ—’±ºÅ‰ÅÕ’â”µ—’±ºÅ’Õï»µÕï±ïç–ÈπΩπî∞ÅÕ•∏ÅçΩπ—ïπ—ïë•—Öâ±î∏ÅÖ¡—’…ÑÅù’ïÕ–µçΩëîµΩŸï…±Ö‰¥»¿»ÿƒ¿¿ƒπ©¡ú∏Å%πù…ïÕºÅ€Ö±•ëºÅ‰ÅçÖµâ•ΩÃÅ1%YÅï∏ÅÖµâΩÃÅïπ—Ω…πΩÃÅπºÅçï…—•ô•çÖëΩÃÅ—ΩëÖ€µÑÏÅπºÅçΩπŸï…—•»ÅIdÅï∏ÅAMLÅô’πç•ΩπÖ∞∏)…ç°•ŸΩÃÅ•π—ïù…ÖëΩÃÅëïÕëîÅµÖ•∏∞ÅçΩ∏ÅÕ’ÃÅçÖµâ•ΩÃÅ¡…ïŸ•ΩÃÅçΩπÕï…ŸÖëΩÃËÅÄπù•—°’àΩ›Ω…≠ô±Ω›ÃΩô’±∞µÖ¡¿µµÖπ’Ö∞µ¡°ÂÕ•çÖ∞µ¡Ö…•—‰πÂµ±Ä∞ÅÅ=5A9%=}%91}U9%=9M}UMUI%<πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩ%IQI%M}59Q=I%LπµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩ5QI%i}Q|¡}AI=eQ<π©ÕΩπÄ∞ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩ5QI%i}Q|¡}AI=eQ<πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩ5QI%i}1%Y}=%=}U9}M=1=}UM=}Hƒ––πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩA9}1%Y|¿ƒ·}=1}M=I}I}Q}1%YπµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}1%Y}Hƒ––ΩMQ<πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}1%Y}Hƒ––Ω9=9}e}AU	1%%=8πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}1%Y}Hƒ––Ωâ…Ω›Õï»µùïπï…Ö∞π±ΩùÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}1%Y}Hƒ––Ωâ…Ω›Õï»µ¡…•ŸÖ—îπ±ΩùÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}1%Y}Hƒ––Ωâ…Ω›Õï»µÕ°Ö…îπ±ΩùÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}1%Y}Hƒ––Ωâ’•±êµ±ΩçÖ∞π±ΩùÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}1%Y}Hƒ––ΩùΩ±òµµΩâ•±îµëï—Ö•∞π¡πùÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}1%Y}Hƒ––ΩùΩ±òµ¡…•ŸÖ—îµÕçΩ…ïÃπ¡πùÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}1%Y}Hƒ––ΩùΩ±òµÕ°Ö…îµçΩëîπ¡πùÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}1%Y}Hƒ––ΩùΩ±òµÕ°Ö…ïêµôÖŸΩ…•—ïÃπ¡πùÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}1%Y}Hƒ––ΩùΩ±òµÕ°Ö…ïêµ¡…•ŸÖ—îµëï—Ö•∞π¡πùÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}1%Y}Hƒ––ΩùÕåµ»ƒ––µ…ïµΩ—îµëï—Ö•∞π©¡ùÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}1%Y}Hƒ––ΩùÕåµ»ƒ––µÕ—Öâ±îµ¡…•ŸÖ—îµëï—Ö•∞π©¡ùÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}1%Y}Hƒ––ΩùÕåµ»ƒ––µÕ—Öâ±îµ¡’â±•çÖ—•Ω∏π©¡ùÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}1%Y}Hƒ––ΩŸï…çï∞µ±ÖàµçΩπô•úπ©¡ùÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}1%Y}Hƒ–‘ΩMQ<πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}1%Y}Hƒ–‘Ωâ’•±êπ±ΩùÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}1%Y}Hƒ–‘ΩùÖ—îµâ±Ω≈’ïÖëºπ±ΩùÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}1%Y}Hƒ–ÿΩM9I%=}M%M})U=IM|»¿»ÿ¿‰Ã¿π©ÕΩπÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}1%Y}Hƒ–ÿΩMQ<πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}1%Y}Hƒ–ÿΩI=II%=}I%MQI=|»¿»ÿ¿‰Ã¿πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}1%Y}Hƒ–ÿΩâ’•±êπ±ΩùÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}1%Y}Hƒ–ÿΩç±Ω’êµ¡…Ωô•±îπ±ΩùÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}1%Y}Hƒ–ÿΩùÖ—ïÃπ±ΩùÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}1%Y}Hƒ–ÿΩù’ïÕ–µâ’•±êπ±ΩùÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}1%Y}Hƒ–ÿΩ±Öàµ¡…ïŸ•ï‹µïπÿπ©¡ùÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}1%Y}Hƒ–ÿΩ¡…ïŸ•ï‹µâïôΩ…îµŸ•Õ•â•±•—‰µô•‡π©¡ùÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}1%Y}Hƒ–ÿΩ¡…ïŸ•ï‹µ»ƒ–ÿµëï—Ö•∞µçΩπô•…µïêπ©¡ùÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}1%Y}Hƒ–ÿΩ¡…ïŸ•ï‹µ»ƒ–ÿµô•·ïêµïπ—…‰π©¡ùÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}1%Y}Hƒ–ÿΩ¡…ïŸ•ï‹µ»ƒ–ÿµ±Ö—ïÕ–µëï—Ö•∞π©¡ùÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ59U1}QIM}Hƒ–›|»πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=LπµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ5QI%i}AQ%=9}M=IM}Hƒ–›|…|—|ƒπµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩAI=5AQ}=9Q%9U%}Hƒ–›|»πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩIUAI%=9}Hƒ–›|…|—|ƒπ¡Ö—ç°Ä∞ÅÅ=1}M=I}I}Q}A9%9}5QI%`πµëÄ∞ÅÅI=5A}}Q11πµëÄ∞ÅÅI=5A}=YI10πµëÄ∞ÅÅÖççïÕÃπ°—µ±Ä∞ÅÅÖ¡§Ω}±•àΩÖççΩ’π–µÖ’—†π©ÕÄ∞ÅÅÖ¡§Ω}±•àΩÖ¡¿µÖççïÕÃπ©ÕÄ∞ÅÅÖ¡§Ω}±•àΩçΩëîµÖççïÕÃπ©ÕÄ∞ÅÅÖ¡§Ω}±•àΩëÖ—ÖâÖÕîπ©ÕÄ∞ÅÅÖ¡§Ω}±•àΩëïŸ•çîµïŸïπ–µ•ëïπ—•—‰π©ÕÄ∞ÅÅÖ¡§Ω}±•àΩ•πŸ•—îµΩ…•ù•∏π©ÕÄ∞ÅÅÖ¡§Ω}±•àΩ±•ŸîµÕ°Ö…îπ©ÕÄ∞ÅÅÖ¡§Ω}±•àΩ¡ï…ÕΩπÖ∞µÖççïÕÃµÖç—•ŸÖ—•Ω∏π©ÕÄ∞ÅÅÖ¡§Ω}±•àΩ¡ï…ÕΩπÖ∞µïŸïπ–µÖççïÕÃπ©ÕÄ∞ÅÅÖ¡§Ω}±•àΩ¡…•ŸÖ—îµ…Ω’πêµ±•ôïçÂç±îπ©ÕÄ∞ÅÅÖ¡§ΩÖççΩ’π–π©ÕÄ∞ÅÅÖ¡§ΩÖ¡¿µÖççïÕÃπ©ÕÄ∞ÅÅÖ¡§Ω±•ŸîµÕ°Ö…îπ©ÕÄ∞ÅÅÖ¡§Ω±•Ÿîπ©ÕÄ∞ÅÅÖ¡§Ω¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄ∞ÅÅÖ’—†µùÖ—îπ©ÕÄ∞ÅÅçΩëîµïπ—…‰π°—µ±Ä∞ÅÅçΩëîµïπ—…‰π©ÕÄ∞ÅÅëΩçÃΩµÖπ’Ö∞Ωç’……ïπ–ΩAA}MLπ¡πùÄ∞ÅÅëΩçÃΩµÖπ’Ö∞Ωç’……ïπ–ΩAA}Q)=M}=YI1dπ¡πùÄ∞ÅÅëΩçÃΩµÖπ’Ö∞Ωç’……ïπ–ΩAA}5A=9Q=}I%MQI<π¡πùÄ∞ÅÅëΩçÃΩµÖπ’Ö∞Ωç’……ïπ–ΩAA}5A=9Q=}M=IIπ¡πùÄ∞ÅÅëΩçÃΩµÖπ’Ö∞Ωç’……ïπ–ΩAA}Q=I%M}=%%1Lπ¡πùÄ∞ÅÅëΩçÃΩµÖπ’Ö∞Ωç’……ïπ–ΩAA}=II%=9}Q)=Lπ¡πùÄ∞ÅÅëΩçÃΩµÖπ’Ö∞Ωç’……ïπ–ΩAA}!%MQ=I%1}Q)=Lπ¡πùÄ∞ÅÅëΩçÃΩµÖπ’Ö∞Ωç’……ïπ–ΩAA}5=}=UI}	10π¡πùÄ∞ÅÅëΩçÃΩµÖπ’Ö∞Ωç’……ïπ–ΩAA}5=}5Q!}A1dπ¡πùÄ∞ÅÅëΩçÃΩµÖπ’Ö∞Ωç’……ïπ–ΩAA}5=}AIQ%π¡πùÄ∞ÅÅëΩçÃΩµÖπ’Ö∞Ωç’……ïπ–ΩAA}5=}M-%9Lπ¡πùÄ∞ÅÅëΩçÃΩµÖπ’Ö∞Ωç’……ïπ–ΩAA}5=}MQ	1=Iπ¡πùÄ∞ÅÅëΩçÃΩµÖπ’Ö∞Ωç’……ïπ–ΩAA}5=}U9%YIM1Lπ¡πùÄ∞ÅÅëΩçÃΩµÖπ’Ö∞Ωç’……ïπ–ΩAA}M=II}Q)=Lπ¡πùÄ∞ÅÅëΩçÃΩµÖπ’Ö∞Ωç’……ïπ–ΩAA}MQUA}UII9Pπ¡πùÄ∞ÅÅëΩçÃΩµÖπ’Ö∞Ωç’……ïπ–ΩAA}QI)Q}%91}Q)=Lπ¡πùÄ∞ÅÅëΩçÃΩµÖπ’Ö∞Ωç’……ïπ–ΩAA}Q=I9=M}Q)=Lπ¡πùÄ∞ÅÅëΩçÃΩµÖπ’Ö∞Ωç’……ïπ–ΩAA}Q=I9=M}!Uπ¡πùÄ∞ÅÅëΩçÃΩµÖπ’Ö∞Ωç’……ïπ–Ω5=9%Q=I}Q%5A=}=9QaQ=}1π¡πùÄ∞ÅÅëΩçÃΩµÖπ’Ö∞Ωç’……ïπ–Ω5=9%Q=I}Q%5A=}I1}1π¡πùÄ∞ÅÅëΩçÃΩµÖπ’Ö∞Ωç’……ïπ–Ω=AI%=9}I=9}%9I%=I}I1}1π¡πùÄ∞ÅÅùÕåµëïÕ•ù∏µÕÂÕ—ï¥πçÕÕÄ∞ÅÅù’ïÕ–µÖççïÕÃπ©ÕÄ∞ÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅ±•ŸîµçΩπ—…Ω∞π©ÕÄ∞ÅÅ±•Ÿîµ°’àπ°—µ±Ä∞ÅÅ±•Ÿîµ°’àπ©ÕÄ∞ÅÅ±•ŸîµÕ°Ö…îπ©ÕÄ∞ÅÅ±•ŸîµŸ•ï‹π©ÕÄ∞ÅÅ±•Ÿîπ°—µ±Ä∞ÅÅµÖπ•ôïÕ–π›ïâµÖπ•ôïÕ—Ä∞ÅÅµÖπ’Ö∞π°—µ±Ä∞ÅÅµ•ëë±ï›Ö…îπ©ÕÄ∞ÅÅ¡Öç≠Öùîπ©ÕΩπÄ∞ÅÅ¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄ∞ÅÅ¡…•ŸÖ—îµ…Ω’πëÃπ©ÕÄ∞ÅÅ…ï±ïÖÕîπ©ÕΩπÄ∞ÅÅÕçΩ…ïÃµ’§πçÕÕÄ∞ÅÅÕçΩ…ïÃµ’§π©ÕÄ∞ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄ∞ÅÅÕç…•¡—ÃΩ±•ŸîµÕ°Ö…îµ—ïÕ–µÕï…Ÿï»πµ©ÕÄ∞ÅÅÕç…•¡—ÃΩµÖπ’Ö∞µÕç…ïï∏µ¡Ö…•—‰µùÖ—îπµ©ÕÄ∞ÅÅÕç…•¡—ÃΩ…ïâ’•±êµ•πŸïπ—Ω…‰µ¡ëôÃπ¡ÂÄ∞ÅÅÕç…•¡—ÃΩ…ï±ïÖÕîµµÖ—…•‡µùÖ—îπµ©ÕÄ∞ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄ∞ÅÅÕ°Ω…—ç’—Ãµ’§π©ÕÄ∞ÅÅ—ïÕ–µçÖ…êµÖ…—•ôÖç—Ãπµ©ÕÄ∞ÅÅ—ïÕ–µ•πŸ•—îµΩ…•ù•∏πµ©ÕÄ∞ÅÅ—ïÕ–µ±ÖàµÖççΩ’π–µùÖ—îπµ©ÕÄ∞ÅÅ—ïÕ–µ±ÖàµçΩëîµïπ—…‰πµ©ÕÄ∞ÅÅ—ïÕ–µ±ÖàµëÖ—ÖâÖÕîµ•ÕΩ±Ö—•Ω∏πµ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµëï¡±ΩÂµïπ–µùÖ—îπµ©ÕÄ∞ÅÅ—ïÕ–µ±ÖàµëïŸ•çîµïŸïπ–µ•ëïπ—•—‰πµ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµô•…Õ–µΩ¡ï∏πµ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµù±ΩâÖ∞µΩ¡ï…Ö—•ΩπÖ∞µÖ’ë•–πµ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµù’ïÕ–µÖççΩ’π–µïπ—…‰πµ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµù’ïÕ–µ±Ωù•∏µ—…ÖπÕ•—•Ω∏πµ©ÕÄ∞ÅÅ—ïÕ–µ±ÖàµµïëÖ∞µµΩπ•—Ω»πµ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµπºµ¡…Ωë’ç—•Ω∏µ¡…Ω·‰πµ©ÕÄ∞ÅÅ—ïÕ–µ±ÖàµΩ›πï»µÕïÕÕ•Ω∏µ¡…•Ω…•—‰πµ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµ¡…•ŸÖ—îµ±•ôïçÂç±îπµ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµ¡…•ŸÖ—îµ…Ω’πêµÕ°Ö…îµô±Ω‹πµ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµ¡…•ŸÖ—îµ…Ω’πëÃπµ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµ»ÿ¿µ¡°ÂÕ•çÖ∞µµÖ—…•‡πµ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµ»ÿ¿µ¡…Ωë’ç—•Ω∏µ…ïô…ïÕ†πµ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµ…ïù•Õ—…Ö—•Ω∏µ¡…•ŸÖ—îµ…Ω’πëÃµïπ—…‰πµ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµ…ïù•Õ—…Ö—•Ω∏µ…ï—’…∏µÕ—Ö—îπµ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµ…Ω’πêµç…ïÖ—îµµΩëÖ∞πµ©ÕÄ∞ÅÅ—ïÕ–µ±ÖàµÕ°Ö…îµë•…ïç–πµ©ÕÄ∞ÅÅ—ïÕ–µ±ÖàµÕ°Ω…—ç’—ÃµπÖŸ•ùÖ—•Ω∏πµ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµ—Ω’…πÖµïπ–µπÖŸ•ùÖ—•Ω∏πµ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµ’¡ëÖ—îµ…ïçΩŸï…‰πµ©ÕÄ∞ÅÅ—ïÕ–µ±•ŸîµΩôô•ç•Ö∞µô±Ω‹πµ©ÕÄ∞ÅÅ—ïÕ–µ±•ŸîµÕ°Ö…îµâ…Ω›Õï»πç©ÕÄ∞ÅÅ—ïÕ–µ±•ŸîµÕ°Ö…îµ°Öπë±ï»πµ©ÕÄ∞ÅÅ—ïÕ–µ±•ŸîµÕ°Ö…îµµ•ëë±ï›Ö…îπµ©ÕÄ∞ÅÅ—ïÕ–µ±•ŸîµÕ°Ö…îµπïΩ∏πµ©ÕÄ∞ÅÅ—ïÕ–µ±•ŸîµÕ°Ö…îµ¡ΩÕ—ù…ïÃπµ©ÕÄ∞ÅÅ—ïÕ–µ±•ŸîµŸ•ï‹µÕçΩ…ïÃπµ©ÕÄ∞ÅÅ—ïÕ–µµÖπ’Ö∞µç’……ïπ–µ±Öàπµ©ÕÄ∞ÅÅ—ïÕ–µµÖπ’Ö∞µπºµÖÕÕ•Õ—Öπ–πµ©ÕÄ∞ÅÅ—ïÕ–µµÖπ’Ö∞µÕ—Ö…—’¿µÕ°Ö…•πúπµ©ÕÄ∞ÅÅ—ïÕ–µ¡ï…ÕΩπÖ∞µÖççïÕÃµÖç—•ŸÖ—•Ω∏πµ©ÕÄ∞ÅÅ—ïÕ–µ¡ï…ÕΩπÖ∞µïŸïπ–µ¡ï…µ•ÕÕ•ΩπÃπµ©ÕÄ∞ÅÅ—ïÕ–µ¡ï…ÕΩπÖ∞µô…Ωπ–µïπêπµ©ÕÄ∞ÅÅ—ïÕ–µ¡ï…ÕΩπÖ∞µÕ—Ω…ÖùîµÖççïÕÃπµ©ÕÄ∞ÅÅ—ïÕ–µ¡…•ŸÖ—îµÕçΩ…ïÃµâ…Ω›Õï»πç©ÕÄ∞ÅÅ—ïÕ–µ»ƒ‡µΩ›πï»µù’ïÕ–¥»—†µÖççïÕÃπµ©ÕÄ∞ÅÅ—ïÕ–µÕçΩ…ïÃµ—Ω’…πÖµïπ–µ…ïçΩŸï…‰πµ©ÕÄ∞ÅÅ—ïÕ–µÕçΩ…ïÃµ’§µâ…Ω›Õï»πç©ÕÄ∞ÅÅ—ïÕ–µÕçΩ…ïÃµ’§πµ©ÕÄ∞ÅÅ—ïÕ–µ—Ω’…πÖµïπ–µçΩ’…ÕîµÕï±ïç—Ω»πµ©ÕÄ∞ÅÅ—ïÕ–µÿ»‘Ãµ±•Ÿîµ¡…ïŸ•Ω’Ãµ…Ω’πêπµ©ÕÄ∞ÅÅ—ïÕ–µÿ»ÿÃµçΩµ¡Öç–µ¡±ÖÂï…ÃµâÖç¨µâ’——Ω∏πµ©ÕÄ∞ÅÅ—ïÕ–µÿ»‹‡µçÖ…êµ•µÖùîµ¡ëòµï·¡Ω…–πµ©ÕÄ∞ÅÅ—ïÕ–µÿÃ¿–µ°ΩµΩùïπïΩ’Ãµ…ïù•Õ—…Ö—•Ω∏µÖç—•ΩπÃπµ©ÕÄ∞ÅÅ—ïÕ–µÿÃ¿ÿµµÖ—ç†µ¡±Ö‰πµ©ÕÄ∞ÅÅ—ïÕ–µÿÃƒƒµ±•ŸîµÕ’¡¡Ω…–µ±•π¨πµ©ÕÄ∞ÅÅ—ïÕ–µÿÃƒƒµµÖπ’Ö∞µÕïµÖπ—•åµçΩŸï…Öùîπµ©ÕÄ∞ÅÅ—ïÕ–µÿÃ‘Ãµ±•Ÿîµ°’àπµ©ÕÄ∞ÅÅ—ïÕ–µÿÃ‰‹µçÖ…êµ•∏µΩ’–µâÖç¨µçΩπ—…Öç–πµ©ÕÄ∞ÅÅ—ïÕ–µÿ–¿‘µ…ïù•Õ—…Ö—•Ω∏µç±ïÖ»µô•πÖ∞µµΩâ•±îπµ©ÕÄ∞ÅÅ—ïÕ—ÃΩô•·—’…ïÃΩ»ƒ–‹»ÃµÕï…Ÿ•çîµ›Ω…≠ï»µâïôΩ…îµµÖπ’Ö∞µçΩπÕïπ–π©ÕÄ∞ÅÅ—ïÕ—ÃΩô•·—’…ïÃΩÕçΩ…ïÃµµΩâ•±îµ…ïŸ•ï‹π°—µ±Ä∞ÅÅŸï…çï∞π©ÕΩπÄ∏(((ååÅYÖ±•ëÖçßÕ∏ÅëîÅ•π—ïù…ÖçßÕ∏ÅÖπ—ïÃÅëîÅ¡’â±•çÖ»É
‹Ä»¿»ÿ¥ƒ¿¥¿ƒÄ¿ƒË–‰Å’Ö—ïµÖ±Ñ)∞ÅµÖ•∏Å…ïµΩ—ºÄ‡Âåÿ—òÃÅ¡…ΩŸ•ïπîÅëîÅ…Ω±±âÖç¨ÅHƒ»‡Å‰ÅπºÅçΩπ—•ïπîÅ±ÑÅâÖÕîÅ¡…Ω—ïù•ëÑÅXÃ»»ÏÅçÖπë•ëÖ—ºÅHƒ–‹Åœ¥ÅçΩπ—•ïπîÅXÃ»»∏Å%π—ïù…ÖçßÕ∏Å±ΩçÖ∞ÅçΩ∏ÅçΩµµ•–ÅŸÖèµºÅµÖ•∏Å…ïÖ±•ÈÖëÑÅÕ•∏ÅçΩπô±•ç—ΩÃÅπ§ÅçÖµâ•ΩÃÅÖë•ç•ΩπÖ±ïÃÅëîÅÖ…ç°•ŸΩÃ∏)9ºÅÕîÅï±•µ•πÑÅï∞ÅçÖπëÖëºÅëîÅâÖÕîÅ¡…Ω—ïù•ëÑ∏ÅÕç…•¡—ÃΩ¡…Ω©ïç–µ≈’Ö±•—‰µùÖ—îπµ©ÃÅÖëµ•—îÅŸÖ±•ëÖçßÕ∏Åï·¡≥µç•—ÑÅëï∞ÅM!Å¡…Ω¡’ïÕ—ºÅœÕ±ºÅÕ§ÅçΩ•πç•ëîÅï·Öç—Öµïπ—îÅçΩ∏Å!∞ÅçΩπ—•ïπîÅ—ΩëºÅµÖ•∏ÅÖç—’Ö∞Å‰ÅçΩπÕï…ŸÑÅ±ÑÅâÖÕîÅ¡…Ω—ïù•ëÑ∏ÅΩπ—ï·—ºÅÖç—’Ö∞ÅµÖπ—•ïπîÅÕ‘Å…ïç°ÖÈºÅÖ∞Å…Ω±±âÖç¨ÅÖπ—•ù’º∏Å—ïÕ–µ¡…Ω©ïç–µ≈’Ö±•—‰µùÖ—îπµ©ÃÅá≈ÖëîÅ…ïç°ÖÈºÅ¡ï…µÖπïπ—îÅÑÅM!Å¡…Ω¡’ïÕ—ºÅôÖ±Õº∏ÅA’â±•çÖçßÕ∏Å…ï≈’•ï…îÅAMLÅëîÅïÕ—îÅçΩπ—ï·—ºÅ¡…Ω¡’ïÕ—ºÅÖπ—ïÃÅëîÅçÖµâ•Ö»ÅµÖ•∏∏Å9ºÅï≈’•ŸÖ±îÅÑÅAMLÅëîÅπÖŸïùÖëΩ»Åπ§ÅÑÅçÖµâ•ºÅÂÑÅëïÕ¡±ïùÖëº∏)…ç°•ŸΩÃËÅÕç…•¡—ÃΩ¡…Ω©ïç–µ≈’Ö±•—‰µùÖ—îπµ©ÃÏÅ—ïÕ–µ¡…Ω©ïç–µ≈’Ö±•—‰µùÖ—îπµ©ÃÏÅŸï…çï∞π©ÕΩ∏ÏÅ—ïÕ–µ¡ï…ÕΩπÖ∞µÖççïÕÃµÖç—•ŸÖ—•Ω∏πµ©ÃÏÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩ∏∏(((ååÅΩ……ïççßÕ∏ÅëîÅë•ÖùªÕÕ—•çºÅëîÅÖÕçïπëïπç•ÑÉ
‹Ä»¿»ÿ¥ƒ¿¥¿ƒÄ¿ƒË‘ÃÅ’Ö—ïµÖ±Ñ)•—!’àÅçΩµ¡Ö…îÄ¡ëå≈âÑ‹∏∏πê‰‡‹¿–¿ÅçΩπô•…∑ÃÅÖ°ïÖêÄƒ––ÿ∞Åâï°•πêÄ¿∞Åµï…ùîµâÖÕîÅXÃ»»∏Å∞Å%0ÅÖπ—ï…•Ω»Å¡…ΩŸïªµÑÅëï∞Åç±Ω∏ÅÕ’¡ï…ô•ç•Ö∞Å…ïç’¡ï…Öëº∞ÅπºÅëîÅÖ’Õïπç•ÑÅ…ïÖ∞ÅëîÅXÃ»»Åï∏Å±ÑÅô’ïπ—î∏Åù•–Åôï—ç†Ä¥µ’πÕ°Ö±±Ω‹Å…ïç’¡ïÀÃÅ±ÑÅ°•Õ—Ω…•ÑÅçΩµ¡±ï—ÑÏÅÕîÅ…ï—•…ÑÅï∞ÅÖ©’Õ—îÅ¡…ΩŸ•Õ•ΩπÖ∞Åëï∞ÅùÖ—îÅ‰ÅÕ‘Å¡…’ïâÑ∏ÅÕç…•¡—ÃΩ¡…Ω©ïç–µ≈’Ö±•—‰µùÖ—îπµ©ÃÅ‰Å—ïÕ–µ¡…Ω©ïç–µ≈’Ö±•—‰µùÖ—îπµ©ÃÅ≈’ïëÖ∏Åï·Öç—Öµïπ—îÅçΩµºÅê‰‡‹¿–¿ÏÅπºÅÕîÅëïâ•±•—ÑÅπ§ÅçÖµâ•ÑÅï∞ÅçÖπëÖëºÅŸ•ùïπ—î∏Å1ÑÅ•π—ïù…ÖçßÕ∏ÅÑ›î‹»ƒ‰ÅçΩπÕï…ŸÑÅµÖ•∏Å‰Å±ÑÅô’ïπ—îÅçÖªÕπ•çÑÏÅπºÅÕîÅôΩ…ÎÃÅ’πßÕ∏ÅëîÅ°•Õ—Ω…•Ö±ïÃÅπ§ÅÕîÅÕΩâ…ïÕç…•â•ï…Ω∏ÅÖ…ç°•ŸΩÃ∏)…ç°•ŸΩÃÅëîÅç•ï……îËÅŸï…çï∞π©ÕΩ∏ÏÅ—ïÕ–µ¡ï…ÕΩπÖ∞µÖççïÕÃµÖç—•ŸÖ—•Ω∏πµ©ÃÏÅÕç…•¡—ÃΩ¡…Ω©ïç–µ≈’Ö±•—‰µùÖ—îπµ©ÃÏÅ—ïÕ–µ¡…Ω©ïç–µ≈’Ö±•—‰µùÖ—îπµ©ÃÏÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩ∏∏ÅA…Ωë’ç—•Ω∏Å¡ïπë•ïπ—îÅëï∞Åïπ€µºÅ‰Å…ïÕ’±—ÖëºÅYï…çï∞ÏÅ¡…Ω¡•ï—Ö…•ºÅï·ç±’Õ•ŸÖµïπ—îÅ¡’±ÕÑÅQU1%iHÅï∏ÅÖµâÖÃÅ•πÕ—Ö±Öç•ΩπïÃ∏(((ååÅHƒ–‹∏»∏–∏»É
‹Åïπ—…ïùÑÅµÖπ’Ö∞Å‰ÅÖŸ•ÕºÅ•πŸ•Õ•â±îÉ
‹Ä»¿»ÿ¥ƒ¿¥¿ƒÄ¿–ËÃ»Å’Ö—ïµÖ±Ñ)Ö¡—’…ÖÃÅëï∞Å¡…Ω¡•ï—Ö…•ºËÅ%5|‘–‰¿Å±ÖâΩ…Ö—Ω…•ºÅ•πÕ—Ö±ÖëºÅHƒ–‹∏»∏–ÅÕ•∏ÅΩ¡çßÕ∏ÅQU1%iHÏÅ%5|‘–‡‰Å¡…Ωë’ççßÕ∏Å•πÕ—Ö±ÖëÑÅHƒ–‹∏»∏–∏ƒ∏ÅMï…Ÿ•ëΩ»ÅÖπ—ï…•Ω»Å¡’â±•çÖëºÅïëïê’ò‹‡·å’åŸÑ¡à…ïôÑ»—êÂÑ¿»…âïÑƒ‰—ôê–‰‘¿ÏÅ±ÑÅïπ—…ïùÑÅõµÕ•çÑÅ1ÅïÃÅ%0∞ÅÖ’π≈’îÅÕï…Ÿ•ëΩ»Å‰ÅA$Å¡ÖÕÖ…Ω∏∏Å9ºÅÕîÅÖ—…•â’ÂîÅçÖµâ•ºÅÖ’—Ω∑Ö—•çºÅëîÅ¡…Ωë’ççßÕ∏ÅœÕ±ºÅ¡Ω»ÅÕ‘Åï—•≈’ï—Ñ∏)ïôïç—ºÅ…ï¡…Ωë’ç•ëºËÅëïÕ¡◊•ÃÅëîÅQU1%i<Å‰ÅôÖ±±ºÅëîÅ…ï±ïÖÕîπ©ÕΩ∏∞ÅÕ°Ω›	’•±ë°ïç≠Ö•±’…îÅ’ÕÖâÑÅë•Õ¡±Ö‰ÅŸÖèµº∞Å≈’îÅπºÅŸïπçîÄπµÖπëÖ—Ω…‰µ’¡ëÖ—îÅë•Õ¡±Ö‰ÈπΩπî∏ÅA…’ïâÑÅ…ïôΩ…ÈÖëÑÅôÖ±±ÑÅçΩ∏Åô’ïπ—îÅÖπ—ï…•Ω»Å‰Å¡ÖÕÑÅçΩ∏Åë•Õ¡±Ö‰Èâ±Ωç¨∏ÅÕçÖ¡îËÅï∞Å—ïÕ–ÅÖπ—ï…•Ω»ÅçΩµ¡Ö…ÖâÑÉÈπ•çÖµïπ—îÅçΩπ—…ÑÅπΩπî∞ÅÕ•∏Å…ï¡…Ωë’ç•»Åï∞ÅMLÅïôïç—•Ÿº∏)Mïù’πëºÅëïôïç—ºÅ…ï¡…Ωë’ç•ëºËÅ•πÕ—Ö±ÖçßÕ∏Åëï∞ÅçΩπ—…Ω±ÖëΩ»ÅïÕ¡ï…ÖâÑÅëïÕçÖ…ùÖ»Ä‘¿Å…ïç’…ÕΩÃÅÖ’∏Åï·•Õ—•ïπëºÅ—Ö…©ï—ÑÅÖ¡…ΩâÖëÑ∏Å1ÑÅ¡…’ïâÑÅπ’ïŸÑÅôÖ±±ÑÄ‘¿ÄÑÙÙÄ¿ÅçΩ∏Åï∞ÅèÕë•ùºÅÖπ—ï…•Ω»∏Å∞ÅçΩπ—…Ω±ÖëΩ»ÅÕ’çïÕΩ»ÅÖëΩ¡—ÑÅ¡…•µï…ºÅï∞ÅçÖç£§ÅÖ¡…ΩâÖëºÅ‰ÅπºÅëïÕçÖ…ùÑÅÕ°ï±∞Åπ’ïŸºÅ°ÖÕ—ÑÅçΩπÕïπ—•µ•ïπ—ºÅï·¡≥µç•—ºÏÅ¡…•µï…ÑÅ•πÕ—Ö±ÖçßÕ∏ÅÕ•∏ÅçÖç£§ÅçΩπÕï…ŸÑÅ¡…ï¡Ö…ÖçßÕ∏ÅΩôô±•πî∏Å9ºÅô’ï…ÈÑÅπÖŸïùÖçßÕ∏∞Å…ïçÖ…ùÑ∞ÅÖç—’Ö±•ÈÖçßÕ∏ÅëîÅÖ¡¿Åπ§ÅâΩ……ÑÅçÖç£•Ã∏)Hƒ–‹∏»∏–∏»ÅµÖπ—•ïπîÅô’ïπ—îÅMçΩ…ïÃÄÀäQÖ—ïùΩÀµÑ∞ÅUπ•Ÿï…ÕÖ±ïÃÅÖπ’±ÖëÑ∞Åô’ïπ—îÅçΩ∑È∏∞Å±ΩùΩÃÅÖµ¡±•ÖëΩÃ∞Åëï—Ö±±îƒ‡Ω`∞ÅôÖŸΩ…•—ΩÃÅ•πëï¡ïπë•ïπ—ïÃ∞ÅÕï±ïç—Ω»Å5A<Å‰Å—ΩëΩÃÅ±ΩÃÅëÖ—ΩÃΩçΩπ—…Ω±ïÃÅÖπ—ï…•Ω…ïÃ∏Éiπ•çÖµïπ—îÅçÖµâ•ÑÅïπ—…ïùÑΩÖŸ•Õº∏Å—ïÕ—ÃΩô•·—’…ïÃΩ’¡ëÖ—îµ…ï—…‰µ…ïŸ•ï‹π°—µ∞Å¡ï…µ•—îÅŸï…•ô•çÖ»Åï∏ÅπÖŸïùÖëΩ»Åï∞ÅÖŸ•ÕºÅ’ÕÖπëºÅô’πç•ΩπïÃÅ‰ÅMLÅ…ïÖ±ïÃÅëï∞Å¡Ö≈’ï—î∞ÅçΩ∏Å…ïÕ¡’ïÕ—ÖÃÅÖ•Õ±ÖëÖÃÅëîÅôÖ±±ºΩπ’ïŸÑΩÖç—’Ö∞ÏÅπºÅçΩπ—•ïπîÅ…ΩπëÑÅπ§ÅëÖ—ΩÃ∞ÅπºÅ¡…’ïâÑÅ¡Ω»Åœ¥ÅÕΩ±ºÅ’∏Å•A°Ωπî∏)A…’ïâÖÃÅë•…•ù•ëÖÃÅ—ïÕ–µ±Öàµô•…Õ–µΩ¡ï∏Å‰Å—ïÕ–µ±Öàµ’¡ëÖ—îµ…ïçΩŸï…‰ÅAMLËÅ…ïç’¡ï…ÖçßÕ∏ÅŸ•Õ•â±î∞ÅŸï…ÕßÕ∏ÅÖπ—ï…•Ω»ÅçΩπÕï…ŸÖëÑÅÖπ—ïÃÅëï∞Åç±•ç¨∞ÅÕç…•¡—ÃÅÖ¡…ΩâÖëΩÃ∞ÅëïÕçÖ…ùÑÅôÖ±±•ëÑÅçΩπÕï…ŸÑÅŸï…ÕßÕ∏∞Å¡ï…µ•ÕΩÃÅ¡ï…ÕΩπÖ±ïÃÅŸ•ùïπ—ïÃÅ‰ÅçΩπÕïπ—•µ•ïπ—º∏ÅA…’ïâÑÅ±ΩçÖ∞ÅπÖŸïùÖëΩ»Åâ±Ω≈’ïÖëÑÅII}	1=-}	e}1%9PÅ¡Ö…ÑÅ±ΩçÖ±°ΩÕ–ÏÅ9<Åëïç±Ö…ÖëÑÅ…ïÖ±•ÈÖëÑ∏ÅAï…ô•∞ÅçΩµ¡±ï—º∞ÅA…ïŸ•ï‹∞Å…ïçΩ……•ëºÅ…ïÖ∞Å‰Å¡’â±•çÖçßÕ∏Å—ΩëÖ€µÑÅ¡ïπë•ïπ—ïÃ∏Å9Öë•îÅ¡’±œÃÅQU1%iHÅëï∞Å¡…Ω¡•ï—Ö…•º∏)IΩ±±âÖç¨ÅëîÅ¡’â±•çÖçßÕ∏ËÅïëïê’ò‹‡·å’åŸÑ¡à…ïôÑ»—êÂÑ¿»…âïÑƒ‰—ôê–‰‘¿ÄºÅHƒ–‹∏»∏–∏ƒÏÅπºÅ…Ω±±âÖç¨ÅëîÅëÖ—ΩÃ∏ÅA…Ωë’ççßÕ∏ÅœÕ±ºÅçΩ∏ÅÖ’—Ω…•ÈÖçßÕ∏ÅÂÑÅï·•Õ—ïπ—îÅ‰ÅçΩπ—…Ω±ïÃÅçΩ……ïÕ¡Ωπë•ïπ—ïÃÏÅï∞Å¡…Ω¡•ï—Ö…•ºÅï·ç±’Õ•ŸÖµïπ—îÅ¡’±ÕÑÅQU1%iH∏)…ç°•ŸΩÃÅëîÅïÕ—ÑÅŸï…ÕßÕ∏ËÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄ∞ÅÅ…ï±ïÖÕîπ©ÕΩπÄ∞ÅÅ—ïÕ–µ±Öàµô•…Õ–µΩ¡ï∏πµ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµ’¡ëÖ—îµ…ïçΩŸï…‰πµ©ÕÄ∞ÅÅ—ïÕ—ÃΩô•·—’…ïÃΩ’¡ëÖ—îµ…ï—…‰µ…ïŸ•ï‹π°—µ±Ä∞ÅÅI=5A}=YI10πµëÄ∞ÅÅI=5A}}Q11πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ59U1}QIM}Hƒ–›|»πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ5QI%i}AQ%=9}M=IM}Hƒ–›|…|—|ƒπµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=LπµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄ∏(((åååÅHƒ–‹∏»∏–∏»É
‹ÅA…ïŸ•ï‹Å‰ÅçΩπÕï…ŸÖçßÕ∏ÅçΩµ¡…ΩâÖëΩÃÉ
‹Ä»¿»ÿ¥ƒ¿¥¿ƒÄ¿–Ë–ÃÅ’Ö—ïµÖ±Ñ)A…ïŸ•ï‹Åô’ïπ—îÄ‘—ôëò≈ê‰‰‰ŸòÂàŸôêÂî›î‹‹ƒŸôò·åƒÕÑ‘‹‰ÃÃÕÑÃÄºÉÖ…âΩ∞Ä‹Ÿò‡»ÿ›à≈î‘…âòÿ›êÂôê‘ƒ‰¡ê‰‹‡ÂÖÑ·ïëàÿ–¿Âà∏Å1Åë¡±|’©‘›Âµ1Õƒ·—ùMô5Ÿ®’ÖÕºÅ‰ÅAI=Åë¡±}	]çÖa≈A(·E§Ÿ¡]!`…A¿Õ]Õ·aΩçÿÅId∏ÅAï…ô•∞Å¡…Ω¡•ºÅ…ïÖ∞ÅÕΩâ…îÅÖ±•ÖÃÅA…ïŸ•ï‹Åï¡úµçÖëë‰µù•–µ±Öàµ»ƒ–‹»–ƒµÕçΩ…ïÃµ…ïŸ§µôî‰Âôòµï¡ùçÖëëÂÃµ¡…Ω©ïç—ÃπŸï…çï∞πÖ¡¿ËÅ…ïù•Õ—…ºÅAIU	Å9QIÄ–∏»ΩM9%=Hºƒ–Ω	19LÏÅ ƒÅ…ΩÕÃ‘Ω9ï––∞Å »ÅÕï±ïçç•ΩπÖëº∏Åπ—ïÃÅëï∞Åç±•ç¨ÅŸï…ÕßÕ∏–∏ƒ∞ÅQU1%iHÅŸ•Õ•â±îΩ°Öâ•±•—ÖëºÅ‰ÉÈ±—•µÑ–∏»∏ÅQ…ÖÃÅç±•ç¨Åï·¡≥µç•—ºÅœÕ±ºÅï∏Å¡ï…ô•∞Å¡…Ω¡•ºÅŸï…ÕßÕ∏–∏»∞Åµ•ÕµΩÃÅ©’ùÖëΩ»Ω…ΩÕÃ‘Ω9ï––Å‰Å°ΩÂº»∏Å9ºÅëÖ—ΩÃÅπ§Å•πÕ—Ö±Öç•ΩπïÃÅëï∞Å¡…Ω¡•ï—Ö…•ºÅÖ±—ï…ÖëΩÃ∏Å!•Õ”Õ…•çºÅëï∞Åô•·—’…îÅŸÖèµºËÅπºÅÖô•…µÖ»Å¡…ïÕï…ŸÖçßÕ∏ÅëîÅ°•Õ—Ω…•Ö∞ÅõµÕ•çºÅ¡Ω»ÅïÕÑÅ¡…’ïâÑ∏)A…’ïâÑÅŸ•Õ’Ö∞ÅÖ•Õ±ÖëÑÅ’ÕÑÅMLÅ‰Åô’πç•ΩπïÃÅ…ïÖ±ïÃËÅëï—ïç—ÖëºÅµΩπ—Ö©îÅ•πçΩ……ïç—ºÅÖâΩ’–ÈÕ…çëΩåÄ°Ω…•ùï∏ÅÕ•∏ÅUI0§Åï∏ÅÕïù’πëºÅçÖÕºÅπ’ïŸÑÅŸï…ÕßÕ∏ÏÅçΩ……ïù•ëºÅÑÅ•ô…ÖµîÅçΩ∏ÅUI0ÅπΩ…µÖ∞Åëï∞Åµ•ÕµºÅô•·—’…î∏ÅÕîÅçÖÕºÅáÈ∏Å¡ïπë•ïπ—îÅëîÅπ’ïŸÑÅçΩµ¡…ΩâÖçßÕ∏ÏÅπºÅ’ÕÖ»Åï∞ÅôÖ±±ºÅëï∞Åô•·—’…îÅçΩµºÅë•ÖùªÕÕ—•çºÅëîÅ±ÑÅÖ¡±•çÖçßÕ∏∏)Öµâ•Ö∏ÅœÕ±ºÅ—ïÕ—ÃΩô•·—’…ïÃΩ’¡ëÖ—îµ…ï—…‰µ…ïŸ•ï‹π°—µ∞Å‰Å…ïù•Õ—…ΩÃÅëîÅïÕ—ÑÅ…ïŸ•ÕßÕ∏ËÅI=5A}=YI10πµê∞ÅI=5A}}Q11πµê∞Å=9QI=1}AI=eQ=}M%IΩ59U1}QIM}Hƒ–›|»πµê∞Å=9QI=1}AI=eQ=}M%IΩ5QI%i}AQ%=9}M=IM}Hƒ–›|…|—|ƒπµê∞Å=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=Lπµê∞Å=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµê∞Å=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµê∞Å=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩ∏∏ÅÕë•ùºÅëï∞Å¡…Ωë’ç—ºÅ•ì•π—•çºÅÖ∞ÅA…ïŸ•ï‹ÅÂÑÅ¡…ΩâÖëº∏ÅA’â±•çÖçßÕ∏Åπ’ïŸÑÅô•©ÑÅ‰Åïπ—…ïùÑÅõµÕ•çÑÅ1ÅÕ•ù’ï∏Å¡ïπë•ïπ—ïÃÏÅ¡…Ω¡•ï—Ö…•ΩÃÅï·ç±’Õ•ŸÖµïπ—îÅ¡’±ÕÖ∏ÅQU1%iH∏(((ååÅHƒ–‹∏»∏–∏ÃÉ
‹Å%π•ç•ºÅ‰Åïπ—…ïùÑÅ°ï…ïëÖëÑÉ
‹Ä»¿»ÿ¥ƒ¿¥¿ƒÄ¿‘ËƒÃÅ’Ö—ïµÖ±Ñ()Ÿ•ëïπç•ÑÅëï∞Å¡…Ω¡•ï—Ö…•ºÅ%5|‘–‰–ËÅ±ÖâΩ…Ö—Ω…•ºÅÕ•ù’îÅHƒ–‹∏»∏–ÅÕ•∏ÅQU1%iH∏Å%5|‘–‰‘ËÅ¡…Ωë’ççßÕ∏ÅÖâ…îÅµΩπ•—Ω»ÅÖπ—•ù’ºÅMÖπ—ÑÅëï±ô•πÑ∏ÅMîÅçΩπÕï…ŸÑÅ%0ÅõµÕ•çºÅëîÅ±ÖâΩ…Ö—Ω…•ºÏÅHƒ–‹∏»∏–∏»Å¡’â±•çÖëÑÅπºÅ±ºÅ…ïÕΩ±ŸßÃÅï∏ÅÕ‘Åë•Õ¡ΩÕ•—•Ÿº∏Å’ïπ—îÅŸ•Õ’Ö∞ÅŸ•ùïπ—îÅ%5|‘–‰ÃÄºÄÀäQÖ—ïùΩÀµÑÏÅUπ•Ÿï…ÕÖ±ïÃÅÖπ’±ÖëÑ∏()ïôïç—ºÅëîÅ%π•ç•ºÅ…ï¡…Ωë’ç•ëºËÅµ•ëë±ï›Ö…îÅëïÕŸ•ÖâÑÅÅ•π•ç•ºÙ≈ÄÅ¡Ω»ÅçΩΩ≠•îÅ¡ï…ÕΩπÖ∞ÅëîÅïŸïπ—ºÅÖπ—ï…•Ω»∏ÅA…’ïâÑÅπïùÖ—•ŸÑÅÅ—ïÕ–µ±•ŸîµÕ°Ö…îµµ•ëë±ï›Ö…îπµ©ÕÄÅôÖ±≥ÃÅçΩ∏Åπ’±∞ÄÑÙÄƒÏÅëïÕ¡◊•ÃÅëîÅçΩ……ïççßÕ∏Å¡ÖÕÑ∏Å%π•ç•ºÅï·¡≥µç•—ºÅ¡…ïŸÖ±ïçîÏÅUI1ÃÅ¡ï…ÕΩπÖ±ïÃÅï·¡≥µç•—ÖÃÅÕ•ù’ï∏ÅÖ’—Ω…•ÈÖëÖÃÅ‰Å…ï—Ω…πºÅ•µ¡≥µç•—ºÅçΩπÕï…ŸÑÅïŸïπ—º∏Å9ºÅÕîÅâΩ……Ö∏ÅçΩΩ≠•ïÃ∞Å…ΩπëÖÃ∞ÅÕçΩ…ïÃ∞Å©’ùÖëΩ…ïÃ∞Å°•Õ—Ω…•Ö∞Åπ§ÅÖÕ•ùπÖç•ΩπïÃ∏()ÅÖ¡¿µ’¡ëÖ—îπ©ÕÄÅá≈ÖëîÅëïÕç’â…•µ•ïπ—ºÅ•πëï¡ïπë•ïπ—îÅëîÅMLÅ°ï…ïëÖëºÏÅçΩπÕ’±—ÑÅ¡Ω»ÅµïπÕÖ©îÅQ}AAI=Y}I1MÅÖ∞Å›Ω…≠ï»∞ÅçΩµ¡Ö…ÑÅŸï…ÕßÕ∏ÅÖ¡…ΩâÖëÑÅ…ïÖ∞ÅçΩ∏Å¡’â±•çÖçßÕ∏Å‰ÅΩô…ïçîÅQU1%iH∞ÅºÅI%9Q9QHÅÖπ—îÅôÖ±±º∏Å∞Å›Ω…≠ï»Åá≈ÖëîÉÈπ•çÖµïπ—îÅ•µ¡Ω…—ÖçßÕ∏Åëï∞ÅçΩπ—…Ω∞ÅÖ∞ÅÕç…•¡–ÅëîÅ5ïªËÅçΩπÕï…ŸÖëºÏÅ±•Ÿîµ°’àÅçÖ…ùÑÅçΩπ—…Ω∞ÅÕ•∏Åëï¡ïπëï»ÅëîÅ±ÑÅMçΩ…îÅÖ…ê∏Å9•πüÈ∏Åç°ïç¨ÅπÖŸïùÑ∞Å¡…Ωµ’ïŸîÅŸï…ÕßÕ∏Åπ§ÅâΩ……ÑÅçÖç£•Ã∏ÅOÕ±ºÅç±•ç¨ÅµÖπ’Ö∞Åë•Õ¡Ö…ÑÅëïÕçÖ…ùÑÅçΩµ¡±ï—ÑÅ¡…ïŸ•Öµïπ—îÅ—…ÖπÕÖçç•ΩπÖ∞ÏÅù’Ö…ëÑÅ—Ö…©ï—ÑΩë…Öô–Å‰ÅçΩπÕï…ŸÑÅçΩπ—ï·—ºÅ¡ï…ÕΩπÖ∞∞ÅÖâ…îÅ%π•ç•º∏ÅA’â±•çÖçßÕ∏ÅπºÅ¡’±ÕÑÅ•πÕ—Ö±Öç•ΩπïÃÅëï∞Å¡…Ω¡•ï—Ö…•º∏()A…’ïâÖÃÅë•…•ù•ëÖÃÅAMLÅï∏ÅÖµâΩÃÅëΩµ•π•ΩÃÅÕ•µ’±ÖëΩÃËÅÖ¡…ΩâÖëºÅHƒ–‹∏»∏–∞ÅÖŸ•ÕºÅµÖπ’Ö∞∞Åï……Ω»ÅÖçç•ΩπÖâ±î∞ÅŸï…ÕßÕ∏ÅÖç—’Ö∞ÅΩç’±—ÑÅçΩπ—…Ω∞ÏÅ›Ω…≠ï»ÅçΩπÕï…ŸÑÅÕç…•¡—ÃÅ‰Å—Ö…©ï—ÑÅ°ÖÕ—ÑÅç±•ç¨∞ÅëïÕçÖ…ùÑÅ¡Ö…ç•Ö∞ÅçΩπÕï…ŸÑÅŸï…ÕßÕ∏∞Å¡ï…µ•ÕΩÃÅ…ïŸΩçÖëΩÃÅëïπïùÖëΩÃ∏ÅÅ—ïÕ—ÃΩô•·—’…ïÃΩΩ±êµ’¡ëÖ—îµ…ïŸ•ï‹π°—µ±ÄÅçΩπ—•ïπîÅMLÅ°ï…ïëÖëºÅ…ïÖ∞Å¡Ö…ÑÅ…ïŸ•ÕßÕ∏ÅëîÅçÖ¡ÖÃÅÕ•∏ÅëÖ—ΩÃ∏ÅA…’ïâÑÅëîÅπÖŸïùÖëΩ»Å‰Å¡’â±•çÖçßÕ∏Å¡ïπë•ïπ—ïÃÅÑÅïÕ—îÅçΩ…—îÏÅπºÅï≈’•ŸÖ±ï∏ÅÑÅ¡…’ïâÑÅõµÕ•çÑÅ•A°Ωπî∏()MîÅçΩπÕï…ŸÖ∏Å5A<ÅHƒ–‹∏»∏–∞ÅMçΩ…ïÃÅÖ¡…ΩâÖëΩÃÅïπï…Ö∞ΩÖ—ïùΩÀµÑΩÖŸΩ…•—ΩÃΩIΩπëÑ∞Åëï—Ö±±îƒ‡Ω`∞ÅïÕ—…ï±±ÖÃÅ•πëï¡ïπë•ïπ—ïÃ∞Åô’ïπ—îÅçΩ∑È∏∞Å±ΩùΩÃ»‘î∞Å1%YÅ‰ÅÕ’ÃÅ¡ï…µ•ÕΩÃΩçÖë’ç•ëÖê∏Å±çÖπçîÅ•πç…ïµïπ—Ö∞ËÅµ•ëë±ï›Ö…î∞ÅçΩπ—…Ω∞ÅµÖπ’Ö∞∞Å›Ω…≠ï»∞Å±•Ÿîµ°’àÅ!Q50∞ÅŸï…ÕßÕ∏Å‰ÅâÖπçΩÃ∏ÅIΩ±±âÖç¨Å¡’â±•çÖëºËÄ‡…å‰–¡ââÖÖî·âÑ‘Ã–ÿ—îÂëâôòÿ–Âïâî‰‘¿»›à’ëòÄ°Hƒ–‹∏»∏–∏»§ÏÅπºÅçÖµâ•ΩÃÅëîÅâÖÕîÅëîÅëÖ—ΩÃ∏(((åååÅHƒ–‹∏»∏–∏ÃÉ
‹ÅçΩπ—…Ω∞Å¡ΩÕ—ï…•Ω»ÅÖ∞ÅçΩµµ•–É
‹Ä¿‘Ëƒ‹Å’Ö—ïµÖ±Ñ()A…ïŸ•ï‹Ä…Öëå…ò‡ÅII=HÅï∏ÅÖµâΩÃÅ¡…ΩÂïç—ΩÃËÅI=5@ÅπºÅπΩµâ…ÖâÑÅ—ïÕ–µ’¡ëÖ—îµëï±•Ÿï…‰µçΩπ—…Ω∞πµ©Ã∞ÅÖ…ç°•ŸºÅπ’ïŸºÅΩµ•—•ëºÅëï∞Åë•ôòÅ¡…ïŸ•ºÅÖ∞ÅçΩµµ•–∏ÅIï¡…Ωë’ççßÕ∏Å±ΩçÖ∞Å¡ΩÕ—ï…•Ω»ÅÖ∞ÅçΩµµ•–Å%0ÅçΩ∏ÅïÕîÅπΩµâ…î∏ÅMîÅ…ïù•Õ—…ÑÅ•πŸïπ—Ö…•ºÅçΩµ¡±ï—ºÅëîÅÖ…ç°•ŸΩÃÏÅïÕ—ÑÅçΩ……ïççßÕ∏ÅïÃÅëΩç’µïπ—Ö∞∞ÅπºÅÖ±—ï…ÑÅ¡…Ωë’ç—º∏Å9ºÅÕîÅ¡’â±•èÃÅµÖ•∏∏ÅΩπ—…Ω∞Å¡ï…µÖπïπ—îËÅï©ïç’—Ö»ÅI=5@ÅëïÕ¡◊•ÃÅëîÅ•πçΩ…¡Ω…Ö»ÅÖ…ç°•ŸΩÃÅπ’ïŸΩÃ∏()…ç°•ŸΩÃÅëîÅHƒ–‹∏»∏–∏ÃËÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ59U1}QIM}Hƒ–›|»πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=LπµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ5QI%i}AQ%=9}M=IM}Hƒ–›|…|—|ƒπµëÄ∞ÅÅI=5A}}Q11πµëÄ∞ÅÅI=5A}=YI10πµëÄ∞ÅÅÖ¡¿µ’¡ëÖ—îπ©ÕÄ∞ÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅ±•Ÿîµ°’àπ°—µ±Ä∞ÅÅµ•ëë±ï›Ö…îπ©ÕÄ∞ÅÅ…ï±ïÖÕîπ©ÕΩπÄ∞ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄ∞ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄ∞ÅÅ—ïÕ–µ±Öàµ’¡ëÖ—îµ…ïçΩŸï…‰πµ©ÕÄ∞ÅÅ—ïÕ–µ±•ŸîµÕ°Ö…îµµ•ëë±ï›Ö…îπµ©ÕÄ∞ÅÅ—ïÕ–µ’¡ëÖ—îµëï±•Ÿï…‰µçΩπ—…Ω∞πµ©ÕÄ∞ÅÅ—ïÕ—ÃΩô•·—’…ïÃΩΩ±êµ’¡ëÖ—îµ…ïŸ•ï‹π°—µ±Ä∞ÅÅŸï…çï∞π©ÕΩπÄ∏(((åååÅHƒ–‹∏»∏–∏ÃÉ
‹ÅÖ±çÖπçîÅëîÅ¡…’ïâÑÅŸ•Õ’Ö∞É
‹Ä¿‘Ë»–Å’Ö—ïµÖ±Ñ()A…ïŸ•ï‹Åå»–…à‡ƒ‘ÅIdÅï∏ÅÖµâΩÃÅ¡…ΩÂïç—ΩÃ∏ÅMLÅHƒ–‹∏»∏–Å…ïÖ∞Å…ï¡…Ωë’çîÅΩç’±—ÖçßÕ∏Åëï∞ÅâΩ”Õ∏Å°ï…ïëÖëºÅÖ∞ÅÖâ…•»Å’πÑÅçÖ¡Ñ∏ÅA…•µï»ÅµΩπ—Ö©îÅπºÅÖç…ïë•”ÃÅï∞ÅÖŸ•ÕºÅ•πëï¡ïπë•ïπ—îÏÅÕîÅçÖµâ•ÑÅœÕ±ºÅô•·—’…îÅ¡Ö…ÑÅÕ•µ’±Ö»Åï·¡≥µç•—Öµïπ—îÅ¡’â±•çÖçßÕ∏Å¡ΩÕ—ï…•Ω»Ä†≠Y%MU0§∞ÅçΩπÕ’±—Ö»ÅŸï…ÕßÕ∏ÅÖ¡…ΩâÖëÑÅëï∞ÅçΩπ—…Ω±ÖëΩ»Å…ïÖ∞Å‰Åµïë•»ÅùïΩµï—ÀµÑ∞ÅÕ•∏Å¡’±ÕÖ»Åπ§Å•πÕ—Ö±Ö»ÅïÕÑÅŸï…ÕßÕ∏Å•πï·•Õ—ïπ—î∏Å9ºÅÕîÅ¡…ïÕïπ—ÑÅïÕ—îÅµΩπ—Ö©îÅçΩµºÅµ•ù…ÖçßÕ∏ÅõµÕ•çÑ∏Å	ÖπçºÅ›Ω…≠ï»ÅçΩ∏ÅπΩµâ…îÅëîÅçÖç£§Å‰Åµï—ÑÅ…ïÖ±ïÃÅHƒ–‹∏»∏–ÅAMLÅï∏ÅÖµâΩÃÅëΩµ•π•ΩÃÏÅëïÕçÖ…ùÑÅ¡Ö…ç•Ö∞Å‰ÅÖ’Õïπç•ÑÅëîÅçΩπÕïπ—•µ•ïπ—ºÅ¡…ïÕï…ŸÖ∏ÅÖ¡…ΩâÖëºÅÖπ—ï…•Ω»∏Å’ïπ—îÅëï∞Å¡…Ωë’ç—ºÅÕ•∏ÅçÖµâ•ΩÃÅ…ïÕ¡ïç—ºÅÑÄ…Öëå…ò‡∏(((åååÅHƒ–‹∏»∏–∏ÃÉ
‹ÅïÕ¡ï…ÑÅëï∞ÅçΩπ—…Ω±ÖëΩ»É
‹Ä¿‘Ë»‡Å’Ö—ïµÖ±Ñ()5Ωπ—Ö©îÅŸ•Õ’Ö∞Å≈’ïìÃÅï∏ÅΩπÕ’±—ÖπëºÅçΩπ—…Ω±ÖëΩ»ÅÕ•∏Å…ïÕ¡’ïÕ—Ñ∏ÅMîÅëï—ïç”ÃÅëï¡ïπëïπç•ÑÅÕ•∏Å≥µµ•—îÅëîÅ…ïù•Õ—ï»Ω’¡ëÖ—îÅ‰ÅÕï…Ÿ•çï]Ω…≠ï»π…ïÖë‰Åï∏ÅÖ¡¿µ’¡ëÖ—îπ©Ã∏Å°Ω…ÑÅç°ïç¨ÅÖ……ÖπçÑÅ•πµïë•Ö—Öµïπ—î∞Å…ïÖë‰Å—•ïπîÅ¡±ÖÈºÄ‡ÅÃÅ‰Åï……Ω»Åëï©ÑÅI%9Q9QHÅŸ•Õ•â±î∞Åπ’πçÑÅπÖŸïùÑÅπ§Å•πÕ—Ö±Ñ∏ÅQïÕ–µ’¡ëÖ—îµëï±•Ÿï…‰µçΩπ—…Ω∞Åá≈ÖëîÅçΩπ—…Ω±ÖëΩ»Åï—ï…πÖµïπ—îÅ¡ïπë•ïπ—îÏÅAMLÅï∏ÅÖµâΩÃÅëΩµ•π•ΩÃ∏ÅΩπ—…Ω∞ÅπïùÖ—•ŸºÅçΩπ—…ÑÅô’ïπ—îÅÖπ—ï…•Ω»Å—ï…µ•πÑÅ¡ïπë•ïπ—îÄ°ï·•–ƒÃ§ÏÅπºÅÖç…ïë•—ÑÅ•A°Ωπî∏Å9’ïŸÑÅ…ïŸ•ÕßÕ∏ÅA…ïŸ•ï‹Å…ï≈’ï…•ëÑÅÖπ—ïÃÅëîÅ¡’â±•çÖ»∏(((ååÅHƒ–‹∏»∏–∏–É
‹Å…ïç’¡ï…ÖçßÕ∏ÅÕ•∏ÅïÕ¡ï…ÑÅëï∞ÅçΩπ—…Ω±ÖëΩ»É
‹Ä»¿»ÿ¥ƒ¿¥¿ƒÄ¿‘Ë‘–Å’Ö—ïµÖ±Ñ()Ÿ•ëïπç•ÑÅëï∞Å¡…Ω¡•ï—Ö…•ºËÅ%5|‘‘¿ƒÅA…Ωë’ççßÕ∏ÅÖâ…îÅMçΩ…ïÃÅMÖπ—ÑÅëï±ô•πÑÅçΩ∏ÅI%9Q9QHÅ≈’îÅπºÅ…ïÕ’ï±ŸîÏÅ%5|‘‘¿»Å1Å¡ï…µÖπïçîÅHƒ–‹∏»∏–∞Å)ïÕÕ•î∞Å°ΩÂºÿ∞ÅÕ•∏ÅQU1%iH∏ÅµâΩÃÅÕΩ∏Å%0Å•πÕ—Ö±ÖëΩÃ∏Å∞ÅπÖŸïùÖëΩ»Åπ’ïŸºÅçΩ∏ÅHƒ–‹∏»∏–∏ÃÅπºÅ…ï¡…Ωë’çîÅÕ‘Å•πÕ—Ö±ÖçßÕ∏Å‰ÅπºÅçΩπÕ—•—’ÂîÅïπ—…ïùÑÅõµÕ•çÑ∏()Iï¡…Ωë’çç•ΩπïÃÅπïùÖ—•ŸÖÃÅ…ïÖ±ïÃÅçΩ∏Åô’ïπ—îÅ!Ä‰ƒÕò‘‡‡ËÅ—ïÕ–µ’¡ëÖ—îµëï±•Ÿï…‰µçΩπ—…Ω∞πµ©ÃÅ—ï…µ•πÑÅï·•–ƒÃÅ¡ïπë•ïπ—îÅëîÅ…ïÖë‰ÏÅ—ïÕ–µ±Öàµ’¡ëÖ—îµ…ïçΩŸï…‰πµ©ÃÅôÖ±±ÑÄ»ÄÑÙÄ¿ÅçΩπÕ’±—ÖÃÅëîÅ…ïêÅë’…Öπ—îÅÖëΩ¡çßÕ∏ÅëîÅ—Ö…©ï—ÑÅÖπ—ï…•Ω»∏ÅÖ¡¿µ’¡ëÖ—îπ©ÃÅÖ°Ω…ÑÅ±ïîÅ¡…•µï…ºÅ±ÑÅŸï…ÕßÕ∏ÅëîÅ±ÑÅ—Ö…©ï—ÑÅçÖ…ùÖëÑ∞ÅºÅëï∞ÉÈ±—•µºÅçÖç£§ÅÖ¡…ΩâÖëºÅçΩµ¡±ï—ºÅï∏ÅMçΩ…ïÃÏÅçΩπ—…Ω±ÖëΩ»ÅÖπ—•ù’ºΩÕ•∏Å…ïÕ¡’ïÕ—ÑÅπºÅâ±Ω≈’ïÑÅï∞ÅâΩ”Õ∏Åç’ÖπëºÅ…ï±ïÖÕîπ©ÕΩ∏Å¡’â±•èÃÅ’πÑÅŸï…ÕßÕ∏Å€Ö±•ëÑ∏ÅM§ÅπºÅÕîÅçΩπΩçîÅŸï…ÕßÕ∏ÅÖ¡…ΩâÖëÑ∞ÅΩô…ïçîÅ…ïç’¡ï…ÖçßÕ∏ÅœÕ±ºÅ¡Ω»Åç±•ç¨Åï·¡≥µç•—º∏Å9ºÅπÖŸïùÑÅπ§Å•πÕ—Ö±ÑÅë’…Öπ—îÅç°ïç≠Ã∞ÅπºÅâΩ……ÑÅëÖ—ΩÃΩçÖç£•Ã∏Å……Ω»ÅëîÅ¡’â±•çÖçßÕ∏ÅçΩπÕï…ŸÑÅI%9Q9QH∏Å∞Å›Ω…≠ï»ÅÖëΩ¡—ÑÅçÖç£§ÅçΩµ¡±ï—ºÅÕ•∏Å…ïêÏÅ•ùπΩ…ÑÅçÖç£•ÃÅŸÖèµΩÃÅëîÅÕ’çïÕΩ…ïÃÅ•π—ï……’µ¡•ëΩÃÏÅçΩπÕ’±—ÑÅëîÅŸï…ÕßÕ∏Å¡ΩÕ—ï…•Ω»Å±•µ•—ÖëÑÅÑ·Ã∏()=…ëï∏ÅŸ•ùïπ—îÅëï∞Å¡…Ω¡•ï—Ö…•ºËÅÖ¡ï…—’…ÑÅ•πÕ—Ö±ÖëÑÅëïâîÅµΩÕ—…Ö»Å¡Öπ—Ö±±ÑÅ•π•ç•Ö∞∏Å¡›Ñµ±Ö’πç†π°—µ∞Åá≈ÖëîÅ•π•ç•ºÙƒÏÅô’ïπ—îÅ¡›ÑÅï∏Å!Q50Å‰Åµ•ëë±ï›Ö…îÅÖâ…îÅIïù•Õ—…ºÅ¡…ïÕï…ŸÖπëºÅ±ÑÅ…ΩπëÑ∏Åπ±ÖçïÃÅ¡ï…ÕΩπÖ±ïÃÅï·¡≥µç•—ΩÃÅµÖπ—•ïπï∏ÅÖ’—Ω…•ÈÖçßÕ∏ÏÅ…ï—Ω…πºÅπΩ…µÖ∞Åëïπ—…ºÅëîÅ’∏ÅïŸïπ—ºÅçΩπÕï…ŸÑÅçΩπ—ï·—º∏Å9ºÅÕîÅâΩ……Ö∏ÅçΩΩ≠•ïÃ∞Å)ïÕÕ•î∞Å°ΩÂºÿ∞ÅÕçΩ…ïÃ∞Å©’ùÖëΩ…ïÃ∞Å]°Ö—Õ¡¿∞Å…ΩπëÖÃÅπ§Å°•Õ—Ω…•Ö∞ÏÅÕ•∏Åµ’—Öç•ΩπïÃÅëîÅâÖÕîÅëîÅëÖ—ΩÃ∏()AMLÅë•…•ù•ëΩÃËÅëïÕç’â…•µ•ïπ—ºÅï∏ÅÖµâΩÃÅëΩµ•π•ΩÃÅçΩ∏Å…ïÖë‰Å¡ïπë•ïπ—î∞ÅµïπÕÖ©îÅ±ïùÖëºÅÖ’Õïπ—î∞Åµï—ÖëÖ—ºÅëîÅ—Ö…©ï—Ñ∞ÅçÖç£§ÅëïÕëîÅMçΩ…ïÃ∞Å…ïç’¡ï…ÖçßÕ∏ÅëïÕçΩπΩç•ëÑÅçΩ∏Å…ï±ïÖÕîÅ€Ö±•ëº∞ÅôÖ±±ºÅëîÅ…ïêÅ‰ÅœÕ±ºÅç±•ç¨ÏÅ›Ω…≠ï»ÅçΩπÕï…ŸÑÅ—Ö…©ï—ÑÅ‰ÅÕç…•¡—Ã∞ÅçÖç£§ÅŸÖèµºÅ•π—ï……’µ¡•ëº∞Å¡ï…µ•ÕΩÃÅ¡ï…ÕΩπÖ±ïÃÅ…ïŸΩçÖëΩÃÅ‰ÅëïÕçÖ…ùÑÅ¡Ö…ç•Ö∞ÏÅ%π•ç•ºΩµ•ëë±ï›Ö…î∞Å¡…Ω©ïç–µ≈’Ö±•—‰Å‰ÅçΩπ—…Ω∞ÅπïùÖ—•Ÿº∏Å	ÖπçºÅçΩµ¡±ï—ºÅ¡…ïŸ•ºÅÖ∞ÉÈ±—•µºÅÖ©’Õ—îÅëîÅçÖç£§ÅAMLÏÅ…ï¡ï—•»ÅâÖπçºÅçΩµ¡±ï—ºÅëïÕ¡◊•ÃÅëîÅïÕîÅÖ©’Õ—î∏ÅA…ïŸ•ï‹Å‰Åïπ—…ïùÑÅ•A°ΩπîÅA9%9QLÏÅ¡’â±•çÖçßÕ∏Åô•©ÑÅ9<Å…ïÖ±•ÈÖëÑ∏ÅIΩ±±âÖç¨ÅÕï…Ÿ•ëΩ»Ä‰ƒÕò‘‡‡ÄºÅHƒ–‹∏»∏–∏Ã∞ÅÕ•∏Å…Ω±±âÖç¨ÅëîÅëÖ—ΩÃ∏()…ç°•ŸΩÃÅëîÅïÕ—ÑÅŸï…ÕßÕ∏ËÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ59U1}QIM}Hƒ–›|»πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=LπµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ5QI%i}AQ%=9}M=IM}Hƒ–›|…|—|ƒπµëÄ∞ÅÅI=5A}}Q11πµëÄ∞ÅÅI=5A}=YI10πµëÄ∞ÅÅÖ¡¿µ’¡ëÖ—îπ©ÕÄ∞ÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅµ•ëë±ï›Ö…îπ©ÕÄ∞ÅÅ¡›Ñµ±Ö’πç†π°—µ±Ä∞ÅÅ…ï±ïÖÕîπ©ÕΩπÄ∞ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄ∞ÅÅ—ïÕ–µ±Öàµ’¡ëÖ—îµ…ïçΩŸï…‰πµ©ÕÄ∞ÅÅ—ïÕ–µ±•ŸîµÕ°Ö…îµµ•ëë±ï›Ö…îπµ©ÕÄ∞ÅÅ—ïÕ–µ’¡ëÖ—îµëï±•Ÿï…‰µçΩπ—…Ω∞πµ©ÕÄ∞ÅÅ—ïÕ–µÿÃÿ‡µçÖπΩπ•çÖ∞µ°Ωµîµïπ—…‰πµ©ÕÄ∏(((ååÅHƒ–‹∏»∏–∏‘É
‹ÄƒÅΩç—’â…îÄ»¿»ÿÉ
‹Å…ïŸ•ÕßÕ∏ÅëîÅÖç—’Ö±•ÈÖçßÕ∏ÅçΩπÕïç’—•ŸÑÅ()	ÖÕîÅÅHƒ–‹∏»∏–∏–Å¡’â±•çÖëÑÅIdÅï∏Å1ÅA…ïŸ•ï‹Åë¡±}≈•ŸË—açΩΩùΩ≈T»≈M!∏Õπâ§‰∞ÅçΩµµ•–Ä¿≈ê–ƒ–’ê—åÿ¿ÃÕà¿Âïîƒ·ê‘ƒ¡Ñ‰¡î‰ŸêÃ¿ÿ¿–‘Õî∏ÅAï…ô•∞Å¡…Ω¡•ºÅëîÅ°…Ωµ•’¥ËÅAIU	ÅQU1%i%=8ΩM9%=Hºƒ–Ω	19L∞Å]°Ö—Õ¡¿ÅÕ•π”•—•çºÄ¿¿¿¿¿¿¿¿∞Äƒ‡Å°ΩÂΩÃÅ…ΩÕÃ‘∞Å…ΩÕÃ‰¿Ω9ï–‹ÿ∞Å—Ö…©ï—ÑÅçï……ÖëÑÅΩô•ç•Ö±µïπ—îÅµïë•Öπ—îÅU$∏Å%π•ç•ºÅÖâ…îÅ…ïù•Õ—…º∏Åπ—…ïùÑÅõµÕ•çÑÅ•A°ΩπîÅ9<ÅYI%%ÏÅëΩµ•π•ΩÃÅô•©ΩÃÅÕ•∏ÅçÖµâ•ΩÃ∏ÅMîÅ•πçΩ…¡Ω…ÑÅ¡’±ÕºÅŸï…ëîÅï∏ÅçΩπ—…Ω∞Å•πëï¡ïπë•ïπ—îÅçΩ∏Å…ïù…ïÕßÕ∏Å¡ï…µÖπïπ—î∏ÅΩΩÅ‰Å¡…ïÕï…ŸÖçßÕ∏Å…ïÖ∞Å¡ïπë•ïπ—ïÃÏÅπºÅëïç±Ö…Ö»ÅAMLÅëîÅ¡’ï…—ÑÅπÖŸïùÖëΩ»∏Å…ç°•ŸΩÃËÅÖ¡¿µ’¡ëÖ—îπ©Ã∞Å—ïÕ–µ’¡ëÖ—îµëï±•Ÿï…‰µçΩπ—…Ω∞πµ©Ã∞Å•πëï‡µù…’¡Ö∞π°—µ∞∞ÅÕï…Ÿ•çîµ›Ω…≠ï»π©Ã∞Å…ï±ïÖÕîπ©ÕΩ∏∞ÅI=5A}=YI10πµê∞ÅI=5A}}Q11πµê∞Å=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµê∞Å=9QI=1}AI=eQ=}M%IΩ59U1}QIM}Hƒ–›|»πµê∞Å=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=Lπµê∞Å=9QI=1}AI=eQ=}M%IΩ5QI%i}AQ%=9}M=IM}Hƒ–›|…|—|ƒπµê∞Å=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµê∞Å=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩ∏∏(((ååÅHƒ–‹∏»∏–∏ÿÉ
‹Åë•ÖùªÕÕ—•çºÅ…ïÖ∞Å¡…ïŸ•ºÅÑÅ—…ÖπÕ•çßÕ∏Å()Hƒ–‹∏»∏–∏‘Å1ÅA…ïŸ•ï‹ÅIdÅë¡±}Qµ!©EπhŸ°Â≠≈h≈U›ÿ–≈·©‘·Èú‹∞ÅçΩµµ•–ÿ›å‹≈à‹‡’àÿ‘…ò‰‡¿‹›êƒ¡Ñ≈Öå¡ÖåÕïïêÃÿ»–—çå∏ÅIïçÖ…ùÑÅï∏Å¡ï…ô•∞Å°…Ωµ•’¥ÅΩâ—’ŸºÄ–∏‘ÅÕ•∏ÅçΩπÕïπ—•µ•ïπ—º∞Å…ïù•Õ—…ºÅA]}MIY%}]=I-HÅ•πôΩ…µÑÅçΩπ—…Ω±ÖëΩ»ÅUπ≠πΩ›∏ËÅ9Ω–ÅôΩ’πêÏÅô•·—’…îÅ…ïÖ∞Å¡ï…µÖπïçîÅÕ•∏ÅçΩπ—…Ω±±ï»∏ÅA’ï…—ÑÅπÖŸïùÖëΩ»Å%0∞ÅçÖ’ÕÑÅáÈ∏Å¡ïπë•ïπ—îÅëîÅë•ÖùªÕÕ—•çºÅïπ—…îÅ…ïù•Õ—…º∞ÅÖÕÕï—ÃÅ‰Åïπ—Ω…πº∏Å9ºÅ¡…ΩµΩŸï»ÅA…Ωë’ç—•Ω∏Åπ§Åëïç±Ö…Ö»ÅAML∏Å!•Õ—Ω…•Ö∞Å¡…Ω¡•ºÅÅçΩπ—•ïπîÄƒÅI=9Å=%%0ΩAIU	ÅQU1%i%=8∏ÅMîÅÖù…ïùÑÅ—ïÕ—ÃΩô•·—’…ïÃΩ’¡ëÖ—îµ…’π—•µîµë•ÖùπΩÕ—•åπ°—µ∞∞ÅçΩ∏Å±ïç—’…ÑÅ…ïÖ∞ÅëîÅ…ïù•Õ—…ΩÃΩçÖç£•ÃÅ‰Å…ïç’…ÕΩÃÅëîÅM!10∞ÅÕ•∏ÅÕïµ•±±ÖÃ∞ÅâΩ……ÖëΩÃÅπ§ÅÕ•µ’±Öç•ΩπïÃ∏ÅäIÅ¡ïπë•ïπ—î∏ÅÖµâ•ΩÃËÅ•πëï‡µù…’¡Ö∞π°—µ∞∞ÅÕï…Ÿ•çîµ›Ω…≠ï»π©Ã∞Å…ï±ïÖÕîπ©ÕΩ∏∞Å—ïÕ—ÃΩô•·—’…ïÃΩ’¡ëÖ—îµ…’π—•µîµë•ÖùπΩÕ—•åπ°—µ∞∞ÅI=5A}=YI10πµê∞ÅI=5A}}Q11πµê∞Å=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµê∞Å=9QI=1}AI=eQ=}M%IΩ59U1}QIM}Hƒ–›|»πµê∞Å=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=Lπµê∞Å=9QI=1}AI=eQ=}M%IΩ5QI%i}AQ%=9}M=IM}Hƒ–›|…|—|ƒπµê∞Å=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµê∞Å=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩ∏∏(((ååÅHƒ–‹∏»∏–∏‹É
‹Å±ΩçÖ±•ÈÖ»ÅÖ—ÖÕçºÅ…ïÖ∞ÅëîÅ•πÕ—Ö±ÖçßÕ∏()A…ïŸ•ï‹ÅÅHƒ–‹∏»∏–∏ÿÅIdÅë¡±}≈åÃ…E-ô›µâ9È	1µÂ…å…ï,≈ç‡ÄºÄ‡–»»ƒ»ƒ–—ôÖåÕïî‰Ââêƒ‘»…Ñ‹ÿ≈Ñ‹ÿ≈à—êƒ’î‹Õò∏Å•ÖùªÕÕ—•çºÅπÖŸïùÖëΩ»ËÅçΩπ—…Ω±±ï»Åπ’±∞∞Å›Ω…≠ï»Å•πÕ—Ö±±•πú∞ÅçÖç£•ÃÅÖç—•ŸîΩÖ¡¡…ΩŸïêÅÕ•∏ÅçΩπ—…Ω±ÖëΩ»ÅçΩµ¡±ï—ºÏÅ—ΩëΩÃÅ±ΩÃÅ…ïç’…ÕΩÃÅëîÅM!10Å…ïÕ¡Ωπëï∏Ä»¿¿ÅëïÕëîÅ√Öù•πÑÅ…ïÖ∞∏ÅMîÅÖçΩ—ÑÅçÖëÑÅôï—ç†Åëï∞ÅÕ°ï±∞ÅÑÄƒ‘ÅÕïù’πëΩÃÅ‰ÅÖù…ïùÑÅQ}UAQ}%9=MQ%LÅëîÅœÕ±ºÅ±ïç—’…ÑÅ¡Ö…ÑÅë•Õ—•πù’•»Å…ïê∞Åç’ï…¡ºÅ‰ÅïÕç…•—’…ÑÅëîÅçÖç£§∏Å9ºÅÕîÅëïâ•±•—ÑÅëïÕçÖ…ùÑÅ—…ÖπÕÖçç•ΩπÖ∞ËÅÕ°ï±∞Å•πçΩµ¡±ï—ºÅπºÅÕîÅ¡…Ωµ’ïŸî∏ÅA’ï…—ÑÅπÖŸïùÖëΩ»ÅÕ•ù’îÅ%0ÏÅA…Ωë’ç—•Ω∏Å•π—Öç—Ñ∏Å…ç°•ŸΩÃËÅÕï…Ÿ•çîµ›Ω…≠ï»π©Ã∞Å•πëï‡µù…’¡Ö∞π°—µ∞∞Å…ï±ïÖÕîπ©ÕΩ∏∞Å—ïÕ—ÃΩô•·—’…ïÃΩ’¡ëÖ—îµ…’π—•µîµë•ÖùπΩÕ—•åπ°—µ∞∞ÅI=5A}=YI10πµê∞ÅI=5A}}Q11πµê∞Å=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµê∞Å=9QI=1}AI=eQ=}M%IΩ59U1}QIM}Hƒ–›|»πµê∞Å=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=Lπµê∞Å=9QI=1}AI=eQ=}M%IΩ5QI%i}AQ%=9}M=IM}Hƒ–›|…|—|ƒπµê∞Å=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµê∞Å=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩ∏∏(((ååÅHƒ–‹∏»∏–∏‡É
‹ÅëïÕâ±Ω≈’ïÖ»ÅÕï•ÃÅçΩπï·•ΩπïÃÅΩç’¡ÖëÖÃÅ¡Ω»Åç’ï…¡ΩÃÅÕ•∏Å±ïï»()Hƒ–‹∏»∏–∏‹ÅA…ïŸ•ï‹ÅIdÅë¡±}E›eM≠]≠¡âÈA≠•©©8Â»≈!	E-Õ1®º’î–‡‡‹Ã‰·ê–‘–Õôêÿ—Öê‰›ëê·êƒ‡‘ƒ»‰Ã–ÿ›åÕòƒ∏Å•ÖùªÕÕ—•çºÅ…ïÖ∞ËÅ¡…•µï…ΩÃÅÕï•ÃÅ…ïç’…ÕΩÃÄ»¿¿∞Å—ΩëΩÃÅ±ΩÃÅÕ•ù’•ïπ—ïÃÅÖâΩ…—ÖëΩÃÅï∏Äƒ’ÃÏÅ›Ω…≠ï»ÅÖç—•ŸÑÅçΩ∏ÅÕ°ï±∞µ•πçΩµ¡±ï—îÅ‰ÅçÖç°ïÃÅŸÖèµΩÃ∏ÅÖ’ÕÑËÅA…Ωµ•ÕîπÖ±∞ÅïÕ¡ï…ÑÅçÖâïçï…ÖÃÅëîÅ—ΩëΩÃÅ±ΩÃÅôï—ç†ÅÖπ—ïÃÅëîÅçΩπÕ’µ•»Åç’ï…¡ΩÃÏÅÕï•ÃÅ…ïÕ¡’ïÕ—ÖÃÅÖùΩ—Ö∏ÅçΩπï·ßÕ∏ÅçΩ∏Åç’ï…¡ΩÃÅ¡ïπë•ïπ—ïÃÅ‰Åô…ïπÖ∏Å±ÖÃÅÕ•ù’•ïπ—ïÃ∏Å°Ω…ÑÅçÖëÑÅ…ïÕ¡’ïÕ—ÑÅÕîÅçΩπÕ’µîÅçΩµ¡±ï—Öµïπ—îÅëïπ—…ºÅëîÅÕ‘ÅΩ¡ï…ÖçßÕ∏∞ÅçΩπÕï…ŸÑÅ—•¡ºΩÕ—Ö—’ÃΩ°ïÖëï…ÃÅ‰Åï±•µ•πÑÅçΩπ—ïπ–µ±ïπù—†ΩçΩπ—ïπ–µïπçΩë•πúÅ≈’îÅÂÑÅπºÅëïÕç…•âï∏Åï∞Åç’ï…¡ºÅëïçΩë•ô•çÖëº∏ÅM—Öù•πúÅÕ•ù’îÉµπ—ïù…ºÏÅπºÅÕîÅ¡…Ωµ’ïŸîÅÕ°ï±∞Å¡Ö…ç•Ö∞∏ÅIïù…ïÕßÕ∏Å—ïÕ–µ’¡ëÖ—îµÕ°ï±∞µë…Ö•∏πµ©ÃÅ…ï¡…Ωë’çîÅ¡ΩΩ∞ÅÕï•ÃËÅô’ïπ—îÅÖπ—ï…•Ω»ÅôÖ±±ÑÅ1=,∞ÅçΩ……ïù•ëÑÅAMLÅîÅ•πÕ—Ö±ÑÅ—ΩëΩÃÅ±ΩÃÅ…ïç’…ÕΩÃ∏Å	ÖπçºÅâ’•±êÅ•πç±’ÂîÅ…ïù…ïÕßÕ∏∏ÅA…’ïâÑÅ…ïÖ∞Åπ’ïŸÑÅáÈ∏Å¡ïπë•ïπ—îÏÅA…Ωë’ç—•Ω∏Å•π—Öç—Ñ∏Å…ç°•ŸΩÃËÅÕï…Ÿ•çîµ›Ω…≠ï»π©Ã∞Å•πëï‡µù…’¡Ö∞π°—µ∞∞Å…ï±ïÖÕîπ©ÕΩ∏∞Å—ïÕ–µ’¡ëÖ—îµÕ°ï±∞µë…Ö•∏πµ©Ã∞ÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©Ã∞ÅI=5A}=YI10πµê∞ÅI=5A}}Q11πµê∞Å=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµê∞Å=9QI=1}AI=eQ=}M%IΩ59U1}QIM}Hƒ–›|»πµê∞Å=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=Lπµê∞Å=9QI=1}AI=eQ=}M%IΩ5QI%i}AQ%=9}M=IM}Hƒ–›|…|—|ƒπµê∞Å=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµê∞Å=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩ∏∏()1ÑÅïπ—…ïùÑÅ•πëï¡ïπë•ïπ—îÅï∏ÅÖ¡¿µ’¡ëÖ—îπ©ÃÅÖâÕΩ…âîÅï∞Å…ïÕçÖ—îÅM\Å‰ÅΩç’±—ÑÅï∞ÅÖŸ•ÕºÅ°ï…ïëÖëºÅç’ÖπëºÅç…ïÑÅï∞ÅçΩπ—…Ω∞ÅΩ¡ï…Ö—•Ÿº∞Å¡Ö…ÑÅïŸ•—Ö»ÅâΩ—ΩπïÃÅÕ’¡ï…¡’ïÕ—ΩÃ∏ÅM•∏Å)ÖŸÖMç…•¡–Å•πëï¡ïπë•ïπ—îÅï∞Å…ïÕçÖ—îÅM\Å¡ï…µÖπïçîÅë•Õ¡Ωπ•â±î∏(((ååÅHƒ–‹∏»∏–∏‰É
‹Å…ïŸ•ÕßÕ∏ÅçΩπÕïç’—•ŸÑÅï∏Å1ÅA…ïŸ•ï‹()Yï…ÕßÕ∏ÅÖπ—ï…•Ω»ÅHƒ–‹∏»∏–∏‡Å¡’â±•çÖëÑÅIdÅï∏ÅÖ±•ÖÃÅïÕ—Öâ±îÅ±ÖàΩ»ƒ–‹»––µ’¡ëÖ—îµëï±•Ÿï…‰¥»¿»ÿƒ¿¿ƒ∞ÅçΩµµ•–Ä≈ôê‡‰ÿ¿…ê·êƒŸîÂàÕÖâà…ÖëâââòŸå–Õà’ê¿ƒ—à»‹∏ÅAï…ô•∞Å¡…Ω¡•ºÅ°…Ωµ•’¥ΩA±ÖÂ›…•ù°–∏ÅHƒ–‹∏»∏–∏‡ÅçΩµ¡±ï”ÃÅÕ°ï±∞µ…ïÖë‰ÅçΩ∏Å—ΩëΩÃÅ±ΩÃÅ…ïç’…ÕΩÃÅçÖç°ïêÅ‰ÅçΩπ—…Ω±ÖëΩ»ÅÖç—•ŸÖ—ïêÏÅçΩπÕï…ŸÑÅ…ΩπëÑÅAIU	ÅQU1%i%=8ΩM9%=Hºƒ–Ω	19LΩ]°Ö—Õ¡¿ÅÕ•π”•—•çºÄ¿¿¿¿¿¿¿¿∞Å…ΩÕÃ‰¿Ω9ï–‹ÿÅ‰ÄƒÅ…ΩπëÑÅΩô•ç•Ö∞∏Å9’ïŸÑÅ—…ÖπÕ•çßÕ∏Å¡ïπë•ïπ—îÅëîÅç±•ç¨Å‰Å¡…ïÕï…ŸÖçßÕ∏ÏÅ¡’ï…—ÑÅπÖŸïùÖëΩ»ÅπºÅëïç±Ö…ÖëÑÅAMLÅÖπ—ïÃÅëîÅ—…ïÃÅ—…ÖπÕ•ç•ΩπïÃÅ…ïÖ±ïÃ∏ÅA…Ωë’ç—•Ω∏Å•π—Öç—Ñ∏ÅÖµâ•Ö∏ËÅ•πëï‡µù…’¡Ö∞π°—µ∞∞ÅÕï…Ÿ•çîµ›Ω…≠ï»π©Ã∞Å…ï±ïÖÕîπ©ÕΩ∏∞ÅI=5A}=YI10πµê∞ÅI=5A}}Q11πµê∞Å=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµê∞Å=9QI=1}AI=eQ=}M%IΩ59U1}QIM}Hƒ–›|»πµê∞Å=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=Lπµê∞Å=9QI=1}AI=eQ=}M%IΩ5QI%i}AQ%=9}M=IM}Hƒ–›|…|—|ƒπµê∞Å=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµê∞Å=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩ∏∏(((ååÅHƒ–‹∏»∏–∏ƒ¿É
‹Å…ïŸ•ÕßÕ∏ÅçΩπÕïç’—•ŸÑÅï∏Å1ÅA…ïŸ•ï‹()Yï…ÕßÕ∏ÅÖπ—ï…•Ω»ÅHƒ–‹∏»∏–∏‰Å¡’â±•çÖëÑÅIdÅï∏ÅÖ±•ÖÃÅïÕ—Öâ±îÅ±ÖàΩ»ƒ–‹»––µ’¡ëÖ—îµëï±•Ÿï…‰¥»¿»ÿƒ¿¿ƒ∞ÅçΩµµ•–Ä≈Ñ›Ñ—ò…î–‰Ãÿ—âå—îƒ’òÿ‹≈îÕà…îÃ‘…Öâåƒ’ëî–»∏ÅAï…ô•∞Å¡…Ω¡•ºÅ°…Ωµ•’¥ΩA±ÖÂ›…•ù°–∏ÅHƒ–‹∏»∏–∏‡ÅçΩµ¡±ï”ÃÅÕ°ï±∞µ…ïÖë‰ÅçΩ∏Å—ΩëΩÃÅ±ΩÃÅ…ïç’…ÕΩÃÅçÖç°ïêÅ‰ÅçΩπ—…Ω±ÖëΩ»ÅÖç—•ŸÖ—ïêÏÅçΩπÕï…ŸÑÅ…ΩπëÑÅAIU	ÅQU1%i%=8ΩM9%=Hºƒ–Ω	19LΩ]°Ö—Õ¡¿ÅÕ•π”•—•çºÄ¿¿¿¿¿¿¿¿∞Å…ΩÕÃ‰¿Ω9ï–‹ÿÅ‰ÄƒÅ…ΩπëÑÅΩô•ç•Ö∞∏Å9’ïŸÑÅ—…ÖπÕ•çßÕ∏Å¡ïπë•ïπ—îÅëîÅç±•ç¨Å‰Å¡…ïÕï…ŸÖçßÕ∏ÏÅ¡’ï…—ÑÅπÖŸïùÖëΩ»ÅπºÅëïç±Ö…ÖëÑÅAMLÅÖπ—ïÃÅëîÅ—…ïÃÅ—…ÖπÕ•ç•ΩπïÃÅ…ïÖ±ïÃ∏ÅA…Ωë’ç—•Ω∏Å•π—Öç—Ñ∏ÅÖµâ•Ö∏ËÅ•πëï‡µù…’¡Ö∞π°—µ∞∞ÅÕï…Ÿ•çîµ›Ω…≠ï»π©Ã∞Å…ï±ïÖÕîπ©ÕΩ∏∞ÅI=5A}=YI10πµê∞ÅI=5A}}Q11πµê∞Å=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµê∞Å=9QI=1}AI=eQ=}M%IΩ59U1}QIM}Hƒ–›|»πµê∞Å=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=Lπµê∞Å=9QI=1}AI=eQ=}M%IΩ5QI%i}AQ%=9}M=IM}Hƒ–›|…|—|ƒπµê∞Å=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµê∞Å=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩ∏∏()Q…ÖπÕ•çßÕ∏Å…ïÖ∞Ä„äH‰ÅçΩπÕï…ŸÑÅŸï…ÕßÕ∏‡Å°ÖÕ—ÑÅç±•ç¨∞ÅQU1%iHÅŸï…ëîΩ°Öâ•±•—ÖëºΩùÕçU¡ëÖ—ïA’±ÕîÅ‰ÅëïÕ¡◊•ÃÅQU1%i<º‰∞Å…ΩπëÑÅï·Öç—Ñ∞Å!•Õ—Ω…•Ö∞Åï·Öç—ºÅ‰Å]°Ö—Õ¡¿Åï·Öç—º∏ÅÖ¡—’…ÖÃÄ‡¥‰µâïôΩ…îπ©¡úº‡¥‰µÖô—ï»π©¡úÅù’Ö…ëÖëÖÃ∏Å%0Å¡Ω»Åï……Ω»ÅëîÅçΩπÕΩ±ÑÅ°ï…ïëÖëºÅôΩ…µÖ—IΩ’πë±Ö¡ÕïêÅ•πï·•Õ—ïπ—îÅï∏Å…ΩπëÑÅçï……ÖëÑÏÅÕîÅ…ïÕ—Ö’…ÑÅôΩ…µÖ—ïÖëΩ»ÅëîÅë’…ÖçßÕ∏ÅÕ•∏ÅµΩë•ô•çÖ»ÅëÖ—ΩÃ∏Å—ïÕ–µ’¡ëÖ—îµç±ΩÕïêµ…Ω’πêµç±Ωç¨πµ©ÃÅôÖ±±ÑÅçΩ∏Åô’ïπ—îÅÖπ—ï…•Ω»Å‰Å¡ÖÕÑÅçΩ∏ÅçΩ……ïù•ëÑ∞Å•πç±’•ëºÅï∏ÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©Ã∏ÅÖ¡¿µ’¡ëÖ—îπ©ÃÅµÖπ—•ïπîÅΩç’±—ºÅÖŸ•ÕºÅ°ï…ïëÖëºÅ¡Ω»ÅMLÅµ•ïπ—…ÖÃÅï·•Õ—îÅâΩ”Õ∏Å•πëï¡ïπë•ïπ—î∞ÅÖ’∏ÅÕ§Åï∞ÅÕΩπëïºÅ°ï…ïëÖëºÅŸ’ï±ŸîÅÑÅçÖµâ•Ö»Åë•Õ¡±Ö‰Å•π±•πî∏ÅMï…•îÅçï…ºÅï……Ω…ïÃÅ…ï•π•ç•ÑÅï∏Åƒ¿ÏÅπºÅçï…—•ô•çÖ»Å—…ÖπÕ•çßÕ∏„äH‰∏Å…ç°•ŸΩÃÅÖë•ç•ΩπÖ±ïÃËÅÖ¡¿µ’¡ëÖ—îπ©Ã∞ÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©Ã∞Å—ïÕ–µ’¡ëÖ—îµç±ΩÕïêµ…Ω’πêµç±Ωç¨πµ©Ã∏(((ååÅHƒ–‹∏»∏–∏ƒƒÉ
‹Å…ïŸ•ÕßÕ∏ÅçΩπÕïç’—•ŸÑÅï∏Å1ÅA…ïŸ•ï‹()Yï…ÕßÕ∏ÅÖπ—ï…•Ω»ÅHƒ–‹∏»∏–∏ƒ¿Å¡’â±•çÖëÑÅIdÅï∏ÅÖ±•ÖÃÅïÕ—Öâ±îÅ±ÖàΩ»ƒ–‹»––µ’¡ëÖ—îµëï±•Ÿï…‰¥»¿»ÿƒ¿¿ƒ∞ÅçΩµµ•–ÅïôòŸò–ÿ›êÕå–»≈ëÖâôòÿ‘Âîÿ‘·òŸîƒ‰¡âò·ò¿›Ñÿ∏ÅAï…ô•∞Å¡…Ω¡•ºÅ°…Ωµ•’¥ΩA±ÖÂ›…•ù°–∏ÅHƒ–‹∏»∏–∏‡ÅçΩµ¡±ï”ÃÅÕ°ï±∞µ…ïÖë‰ÅçΩ∏Å—ΩëΩÃÅ±ΩÃÅ…ïç’…ÕΩÃÅçÖç°ïêÅ‰ÅçΩπ—…Ω±ÖëΩ»ÅÖç—•ŸÖ—ïêÏÅçΩπÕï…ŸÑÅ…ΩπëÑÅAIU	ÅQU1%i%=8ΩM9%=Hºƒ–Ω	19LΩ]°Ö—Õ¡¿ÅÕ•π”•—•çºÄ¿¿¿¿¿¿¿¿∞Å…ΩÕÃ‰¿Ω9ï–‹ÿÅ‰ÄƒÅ…ΩπëÑÅΩô•ç•Ö∞∏Å9’ïŸÑÅ—…ÖπÕ•çßÕ∏Å¡ïπë•ïπ—îÅëîÅç±•ç¨Å‰Å¡…ïÕï…ŸÖçßÕ∏ÏÅ¡’ï…—ÑÅπÖŸïùÖëΩ»ÅπºÅëïç±Ö…ÖëÑÅAMLÅÖπ—ïÃÅëîÅ—…ïÃÅ—…ÖπÕ•ç•ΩπïÃÅ…ïÖ±ïÃ∏ÅA…Ωë’ç—•Ω∏Å•π—Öç—Ñ∏ÅÖµâ•Ö∏ËÅ•πëï‡µù…’¡Ö∞π°—µ∞∞ÅÕï…Ÿ•çîµ›Ω…≠ï»π©Ã∞Å…ï±ïÖÕîπ©ÕΩ∏∞ÅI=5A}=YI10πµê∞ÅI=5A}}Q11πµê∞Å=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµê∞Å=9QI=1}AI=eQ=}M%IΩ59U1}QIM}Hƒ–›|»πµê∞Å=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=Lπµê∞Å=9QI=1}AI=eQ=}M%IΩ5QI%i}AQ%=9}M=IM}Hƒ–›|…|—|ƒπµê∞Å=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµê∞Å=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩ∏∏(((ååÅHƒ–‹∏»∏–∏ƒ»É
‹Å…ïŸ•ÕßÕ∏ÅçΩπÕïç’—•ŸÑÅï∏Å1ÅA…ïŸ•ï‹()Yï…ÕßÕ∏ÅÖπ—ï…•Ω»ÅHƒ–‹∏»∏–∏ƒƒÅ¡’â±•çÖëÑÅIdÅï∏ÅÖ±•ÖÃÅïÕ—Öâ±îÅ±ÖàΩ»ƒ–‹»––µ’¡ëÖ—îµëï±•Ÿï…‰¥»¿»ÿƒ¿¿ƒ∞ÅçΩµµ•–Äƒ–‘‰‡ÿ‘…êÃ›ëÖëïÖâëïå‡¡ê¿≈Öî‰…ê‘‡‰‰Ÿî‡‹‡»∏ÅAï…ô•∞Å¡…Ω¡•ºÅ°…Ωµ•’¥ΩA±ÖÂ›…•ù°–∏ÅHƒ–‹∏»∏–∏‡ÅçΩµ¡±ï”ÃÅÕ°ï±∞µ…ïÖë‰ÅçΩ∏Å—ΩëΩÃÅ±ΩÃÅ…ïç’…ÕΩÃÅçÖç°ïêÅ‰ÅçΩπ—…Ω±ÖëΩ»ÅÖç—•ŸÖ—ïêÏÅçΩπÕï…ŸÑÅ…ΩπëÑÅAIU	ÅQU1%i%=8ΩM9%=Hºƒ–Ω	19LΩ]°Ö—Õ¡¿ÅÕ•π”•—•çºÄ¿¿¿¿¿¿¿¿∞Å…ΩÕÃ‰¿Ω9ï–‹ÿÅ‰ÄƒÅ…ΩπëÑÅΩô•ç•Ö∞∏Å9’ïŸÑÅ—…ÖπÕ•çßÕ∏Å¡ïπë•ïπ—îÅëîÅç±•ç¨Å‰Å¡…ïÕï…ŸÖçßÕ∏ÏÅ¡’ï…—ÑÅπÖŸïùÖëΩ»ÅπºÅëïç±Ö…ÖëÑÅAMLÅÖπ—ïÃÅëîÅ—…ïÃÅ—…ÖπÕ•ç•ΩπïÃÅ…ïÖ±ïÃ∏ÅA…Ωë’ç—•Ω∏Å•π—Öç—Ñ∏ÅÖµâ•Ö∏ËÅ•πëï‡µù…’¡Ö∞π°—µ∞∞ÅÕï…Ÿ•çîµ›Ω…≠ï»π©Ã∞Å…ï±ïÖÕîπ©ÕΩ∏∞ÅI=5A}=YI10πµê∞ÅI=5A}}Q11πµê∞Å=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµê∞Å=9QI=1}AI=eQ=}M%IΩ59U1}QIM}Hƒ–›|»πµê∞Å=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=Lπµê∞Å=9QI=1}AI=eQ=}M%IΩ5QI%i}AQ%=9}M=IM}Hƒ–›|…|—|ƒπµê∞Å=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµê∞Å=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩ∏∏()Ÿ•ëïπç•ÑÅ…ïÖ∞Äƒ√äHƒƒÅAMLÅëîÅ—…ÖπÕ•çßÕ∏ËÅµï—Ñƒ¿ÅÕîÅµÖπ—’ŸºÅÖ∞Å…ïÖâ…•»∞ÅQU1%iHÅŸ•Õ•â±îΩ°Öâ•±•—ÖëºΩŸï…ëîΩùÕçU¡ëÖ—ïA’±ÕîÏÅç±•ç¨Å¡Ω»ÅA±ÖÂ›…•ù°–ÅπÖŸïùÑÅÑƒƒÅ‰ÅQU1%i<∏ÅIΩπëÑΩ—Öâ±ÑÅï·Öç—Ñ∞Å!•Õ—Ω…•Ö∞Åï·Öç—ºÅ‰Å]°Ö—Õ¡¿Åï·Öç—º∏Åï…ºÅï……Ω…ïÃÅºÅ›Ö…π•πùÃÅëîÅÖ¡±•çÖçßÕ∏Åï∏ÅŸïπ—ÖπÑÅëîÅ—…ÖπÕ•çßÕ∏Å‰ÅÖπç°ºÅëΩç’µïπ—ºÅ•ù’Ö∞ÅÑÅŸ•ï›¡Ω…–∏ÅÖ¡—’…ÖÃÅçΩµ¡±ï—ÖÃÄƒ¿¥ƒƒµâïôΩ…îπ©¡úºƒ¿¥ƒƒµÖô—ï»π©¡úÅï·—ï…πÖÃÅÖ∞Å•πŸïπ—Ö…•ºÅëîÅô’ïπ—î∏ÅMï…•îÅáÈ∏Å¡ïπë•ïπ—îÅëîƒ»Å‰ƒÃ∏()Ω……ïççßÕ∏ÅŸ•Õ’Ö∞Åô•πÖ∞Åï∏ÅÖ¡¿µ’¡ëÖ—îπ©ÃËÅçÖ¡—’…Ñƒ¿¥ƒƒµâïôΩ…îÅµ’ïÕ—…ÑÅ…ΩçîÅëï∞ÅÖŸ•ÕºÅçΩ∏Å—ï·—ºÅëîÅŸï…ÕßÕ∏∏Å1ÑÅ—…ÖπÕ•çßÕ∏ÅçΩπÕï…ŸÑÅëÖ—ΩÃÅ‰ÅπºÅçΩπ—•ïπîÅï……Ω…ïÃ∞Å¡ï…ºÅ¡’ï…—ÑÅŸ•Õ’Ö∞Å%0ÏÅπºÅÕîÅ¡…ïÕïπ—ÑÅçΩµºÅÕï…•îÅÖ¡…ΩâÖëÑ∏ÅMîÅ…ïÕï…ŸÑÅô…Öπ©ÑÅÕ’¡ï…•Ω»ƒ»¡¡‡ÉÈπ•çÖµïπ—îÅµ•ïπ—…ÖÃÅï·•Õ—îÅï∞ÅçΩπ—…Ω∞Å•πëï¡ïπë•ïπ—î∞Å—Öµâß•∏Åï∏Å…ïù•Õ—…ºÅô•©º∏Å∞ÅÖç—’Ö±•ÈÖ»ÅÕîÅï±•µ•πÑÅçΩπ—…Ω∞Å‰ÅëïÕÖ¡Ö…ïçîÅ…ïÕï…ŸÑ∏ÅΩπ—…Ω∞Å¡ï…µÖπïπ—îÅëîÅπÖŸïùÖëΩ»Åµ•ëîÅ•π—ï…ÕïççßÕ∏Å…ïÖ∞ÅçΩπ—…ÑÅŸï…ÕßÕ∏ΩµïªËΩ±Ωùº∞ÅÖëï∑ÖÃÅëï∞ÅÖπç°ºÅëîÅëΩç’µïπ—º∏ÅMï…•îÅô•πÖ∞Åƒ«äIƒÀäIƒœäIƒ–ËÅçΩπ—…Ω±ÖëΩ»ƒ»ÅëïâîÅÕï…Ÿ•»ÅÖŸ•ÕºÅÕ•∏Å…ΩçîÅÕΩâ…îÅ!Q50ÅÖ¡…ΩâÖëºƒƒÅÖπ—ïÃÅëï∞Åç±•ç¨∏ÅÖ¡¿µ’¡ëÖ—îπ©ÃÅÖù…ïùÖëºÅÑÅÖ…ç°•ŸΩÃÅëîÅïÕ—ÑÅŸï…ÕßÕ∏∏(((ååÅHƒ–‹∏»∏–∏ƒÃÉ
‹Å…ïŸ•ÕßÕ∏ÅçΩπÕïç’—•ŸÑÅï∏Å1ÅA…ïŸ•ï‹()Yï…ÕßÕ∏ÅÖπ—ï…•Ω»ÅHƒ–‹∏»∏–∏ƒ»Å¡’â±•çÖëÑÅIdÅï∏ÅÖ±•ÖÃÅïÕ—Öâ±îÅ±ÖàΩ»ƒ–‹»––µ’¡ëÖ—îµëï±•Ÿï…‰¥»¿»ÿƒ¿¿ƒ∞ÅçΩµµ•–Ä›ÖôêÃ¿ÕâôçÖåÂôôëà›î‡‡’ëÑ‘‹·å·âò›à…âà–ÿ»‘∏ÅAï…ô•∞Å¡…Ω¡•ºÅ°…Ωµ•’¥ΩA±ÖÂ›…•ù°–∏ÅHƒ–‹∏»∏–∏‡ÅçΩµ¡±ï”ÃÅÕ°ï±∞µ…ïÖë‰ÅçΩ∏Å—ΩëΩÃÅ±ΩÃÅ…ïç’…ÕΩÃÅçÖç°ïêÅ‰ÅçΩπ—…Ω±ÖëΩ»ÅÖç—•ŸÖ—ïêÏÅçΩπÕï…ŸÑÅ…ΩπëÑÅAIU	ÅQU1%i%=8ΩM9%=Hºƒ–Ω	19LΩ]°Ö—Õ¡¿ÅÕ•π”•—•çºÄ¿¿¿¿¿¿¿¿∞Å…ΩÕÃ‰¿Ω9ï–‹ÿÅ‰ÄƒÅ…ΩπëÑÅΩô•ç•Ö∞∏Å9’ïŸÑÅ—…ÖπÕ•çßÕ∏Å¡ïπë•ïπ—îÅëîÅç±•ç¨Å‰Å¡…ïÕï…ŸÖçßÕ∏ÏÅ¡’ï…—ÑÅπÖŸïùÖëΩ»ÅπºÅëïç±Ö…ÖëÑÅAMLÅÖπ—ïÃÅëîÅ—…ïÃÅ—…ÖπÕ•ç•ΩπïÃÅ…ïÖ±ïÃ∏ÅA…Ωë’ç—•Ω∏Å•π—Öç—Ñ∏ÅÖµâ•Ö∏ËÅ•πëï‡µù…’¡Ö∞π°—µ∞∞ÅÕï…Ÿ•çîµ›Ω…≠ï»π©Ã∞Å…ï±ïÖÕîπ©ÕΩ∏∞ÅI=5A}=YI10πµê∞ÅI=5A}}Q11πµê∞Å=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµê∞Å=9QI=1}AI=eQ=}M%IΩ59U1}QIM}Hƒ–›|»πµê∞Å=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=Lπµê∞Å=9QI=1}AI=eQ=}M%IΩ5QI%i}AQ%=9}M=IM}Hƒ–›|…|—|ƒπµê∞Å=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµê∞Å=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩ∏∏()Mï…•îÅƒ«äIƒ»ËÅAMLÅ…ïÖ∞∏Å!Q50ƒƒÅ‰Å…ΩπëÑÅÕîÅµÖπ—•ïπï∏ÅÖπ—ïÃÅëîÅç±•ç¨∏ÅOÕ±ºÅ’∏ÅçΩπ—…Ω∞ÅΩ¡ï…Ö—•ŸºÏÅŸï…ëîΩ°Öâ•±•—ÖëºΩùÕçU¡ëÖ—ïA’±Õî∏Å5ïë•çßÕ∏Å…ïÖ∞ËÅâΩë‰Å¡Öëë•πúƒ»¡¡‡∞Åçï…ºÅ•π—ï…Õïçç•ΩπïÃÅçΩ∏ÅŸï…ÕßÕ∏∞ÅµïªËÅºÅ±ΩùΩÃÅ‰ÅÖπç°ºÅëΩç’µïπ—ºıŸ•ï›¡Ω…–∏Å±•ç¨Å•πÕ—Ö±Ñƒ»∞ÅQU1%i<∞Å—Öâ±ÑÅîÅ!•Õ—Ω…•Ö∞Åï·Öç—ΩÃ∞Å]°Ö—Õ¡¿Å…ïù•Õ—…ÖëºÅ•ì•π—•çº∏Åï…ºÅï……Ω…ïÃΩ›Ö…π•πùÃÅëîÅÖ¡±•çÖçßÕ∏∏ÅÖ¡—’…ÖÃÅçΩµ¡±ï—ÖÃÄƒƒ¥ƒ»µâïôΩ…îπ©¡úºƒƒ¥ƒ»µÖô—ï»π©¡ú∏ÅA’ï…—ÑÅù±ΩâÖ∞Å¡ïπë•ïπ—îÅëîƒÃÅ‰ƒ–ÏÅA…Ωë’ç—•Ω∏Å•π—Öç—Ñ∏(((ååÅHƒ–‹∏»∏–∏ƒ–É
‹Å…ïŸ•ÕßÕ∏ÅçΩπÕïç’—•ŸÑÅï∏Å1ÅA…ïŸ•ï‹()Yï…ÕßÕ∏ÅÖπ—ï…•Ω»ÅHƒ–‹∏»∏–∏ƒÃÅ¡’â±•çÖëÑÅIdÅï∏ÅÖ±•ÖÃÅïÕ—Öâ±îÅ±ÖàΩ»ƒ–‹»––µ’¡ëÖ—îµëï±•Ÿï…‰¥»¿»ÿƒ¿¿ƒ∞ÅçΩµµ•–ÅÖà‡Õò¿‰¿–¡ôÑ…ÖïÖà‘≈ëëçà¿‘ƒ–…ê·î…ê¿‰Ã‰¿–‰∏ÅAï…ô•∞Å¡…Ω¡•ºÅ°…Ωµ•’¥ΩA±ÖÂ›…•ù°–∏ÅHƒ–‹∏»∏–∏‡ÅçΩµ¡±ï”ÃÅÕ°ï±∞µ…ïÖë‰ÅçΩ∏Å—ΩëΩÃÅ±ΩÃÅ…ïç’…ÕΩÃÅçÖç°ïêÅ‰ÅçΩπ—…Ω±ÖëΩ»ÅÖç—•ŸÖ—ïêÏÅçΩπÕï…ŸÑÅ…ΩπëÑÅAIU	ÅQU1%i%=8ΩM9%=Hºƒ–Ω	19LΩ]°Ö—Õ¡¿ÅÕ•π”•—•çºÄ¿¿¿¿¿¿¿¿∞Å…ΩÕÃ‰¿Ω9ï–‹ÿÅ‰ÄƒÅ…ΩπëÑÅΩô•ç•Ö∞∏Å9’ïŸÑÅ—…ÖπÕ•çßÕ∏Å¡ïπë•ïπ—îÅëîÅç±•ç¨Å‰Å¡…ïÕï…ŸÖçßÕ∏ÏÅ¡’ï…—ÑÅπÖŸïùÖëΩ»ÅπºÅëïç±Ö…ÖëÑÅAMLÅÖπ—ïÃÅëîÅ—…ïÃÅ—…ÖπÕ•ç•ΩπïÃÅ…ïÖ±ïÃ∏ÅA…Ωë’ç—•Ω∏Å•π—Öç—Ñ∏ÅÖµâ•Ö∏ËÅ•πëï‡µù…’¡Ö∞π°—µ∞∞ÅÕï…Ÿ•çîµ›Ω…≠ï»π©Ã∞Å…ï±ïÖÕîπ©ÕΩ∏∞ÅI=5A}=YI10πµê∞ÅI=5A}}Q11πµê∞Å=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµê∞Å=9QI=1}AI=eQ=}M%IΩ59U1}QIM}Hƒ–›|»πµê∞Å=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=Lπµê∞Å=9QI=1}AI=eQ=}M%IΩ5QI%i}AQ%=9}M=IM}Hƒ–›|…|—|ƒπµê∞Å=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµê∞Å=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩ∏∏()IïÕ’±—ÖëºÅΩâÕï…ŸÖëºÄƒÀäHƒÃËÅQU1%iHÅŸï…ëî∞Å°Öâ•±•—ÖëºÅ‰Å¡Ö…¡ÖëïÖπ—îÏÅç±•ç¨Å…ïÖ∞ÏÅQU1%i<ÅHƒ–‹∏»∏–∏ƒÃÏÅ…ΩπëÑ∞Å°•Õ—Ω…•Ö∞∞Å©’ùÖëΩ»∞ÅÕçΩ…ïÃÅ‰Å]°Ö—Õ¡¿ÅçΩπÕï…ŸÖëΩÃ∏Åï…ºÅï……Ω…ïÃÅëîÅçΩπÕΩ±Ñ∞ÅëïÕâΩ…ëÖµ•ïπ—ºÅºÅÕ’¡ï…¡ΩÕ•çßÕ∏Åëï∞ÅçΩπ—…Ω∞∏ÅMïù’πëÑÅ—…ÖπÕ•çßÕ∏Å€Ö±•ëÑÅëîÅ±ÑÅÕï…•îÄƒ«äHƒÀäHƒœäHƒ–∏(((ååÅHƒ–‹∏»∏–∏ƒ‘É
‹Å…ïŸ•ÕßÕ∏ÅçΩπÕïç’—•ŸÑÅï∏Å1ÅA…ïŸ•ï‹()Yï…ÕßÕ∏ÅÖπ—ï…•Ω»ÅHƒ–‹∏»∏–∏ƒ–Å¡’â±•çÖëÑÅIdÅï∏ÅÖ±•ÖÃÅïÕ—Öâ±îÅ±ÖàΩ»ƒ–‹»––µ’¡ëÖ—îµëï±•Ÿï…‰¥»¿»ÿƒ¿¿ƒ∞ÅçΩµµ•–ÅÑ’Ñ‘‰‰‡‘·Ñ…çÑÿŸò‘ÂâêÃÃ—îÕïççê–‘–ÃÃ‘–·âò¿∏ÅAï…ô•∞Å¡…Ω¡•ºÅ°…Ωµ•’¥ΩA±ÖÂ›…•ù°–∏ÅHƒ–‹∏»∏–∏‡ÅçΩµ¡±ï”ÃÅÕ°ï±∞µ…ïÖë‰ÅçΩ∏Å—ΩëΩÃÅ±ΩÃÅ…ïç’…ÕΩÃÅçÖç°ïêÅ‰ÅçΩπ—…Ω±ÖëΩ»ÅÖç—•ŸÖ—ïêÏÅçΩπÕï…ŸÑÅ…ΩπëÑÅAIU	ÅQU1%i%=8ΩM9%=Hºƒ–Ω	19LΩ]°Ö—Õ¡¿ÅÕ•π”•—•çºÄ¿¿¿¿¿¿¿¿∞Å…ΩÕÃ‰¿Ω9ï–‹ÿÅ‰ÄƒÅ…ΩπëÑÅΩô•ç•Ö∞∏Å9’ïŸÑÅ—…ÖπÕ•çßÕ∏Å¡ïπë•ïπ—îÅëîÅç±•ç¨Å‰Å¡…ïÕï…ŸÖçßÕ∏ÏÅ¡’ï…—ÑÅπÖŸïùÖëΩ»ÅπºÅëïç±Ö…ÖëÑÅAMLÅÖπ—ïÃÅëîÅ—…ïÃÅ—…ÖπÕ•ç•ΩπïÃÅ…ïÖ±ïÃ∏ÅA…Ωë’ççßÕ∏Å‰Å1ÅçΩπÕï…ŸÖ∏ÅHƒ–‹∏»∏–∏ƒ–Å¡’â±•çÖëÑÅµ•ïπ—…ÖÃÅïÕ—îÅπ’ïŸºÅçÖπë•ëÖ—ºÅÕîÅŸÖ±•ëÑ∏ÅÖµâ•Ö∏ËÅ•πëï‡µù…’¡Ö∞π°—µ∞∞ÅÕï…Ÿ•çîµ›Ω…≠ï»π©Ã∞Å…ï±ïÖÕîπ©ÕΩ∏∞ÅI=5A}=YI10πµê∞ÅI=5A}}Q11πµê∞Å=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµê∞Å=9QI=1}AI=eQ=}M%IΩ59U1}QIM}Hƒ–›|»πµê∞Å=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=Lπµê∞Å=9QI=1}AI=eQ=}M%IΩ5QI%i}AQ%=9}M=IM}Hƒ–›|…|—|ƒπµê∞Å=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµê∞Å=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩ∏∏()Ω……ïççßÕ∏ÅçΩµ¡…ΩâÖëÑËÅQΩ…πïºÉäHÅMçΩ…îÅÖ…êÅ…ïë•…•üµÑÅ°Öç•ÑÅï∞Å—Ω…πïºÅ¡ï…ÕΩπÖ∞Åù’Ö…ëÖëºÅ‰ÅÕ’Õ—•—◊µÑÅ±ÑÅŸ•Õ—ÑÅëîÅç’Ö—…ºÅ©’ùÖëΩ…ïÃÅçΩ∏ÅÕçΩ…ïÃÅ¡Ω»ÅΩ—…ÑÅÖÕ•ùπÖçßÕ∏∏Å°Ω…ÑÅΩ¡ïπIΩ’πëQΩ’…πÖµïπ–ÅçΩπÕï…ŸÑÅ…ï—’…πQºÅï∏ÅÖµâΩÃÅµΩëΩÃ∞Åï±•µ•πÑÅ±ÑÅ•π—ïπçßÕ∏Å%π•ç•ºÅÖ∞Å…ïù…ïÕÖ»∞Å°’â	Öç¨Å…ïÕ¡ï—ÑÅïÕîÅΩ…•ùï∏Å‰Åµ•ëë±ï›Ö…îÅµÖπ—•ïπîÅ±ÑÅ—Ö…©ï—ÑÅ±ΩçÖ∞ÅÖπ—îÅ…Ω’πë}…ï—’…∏ÙƒÅÕ•∏ÅΩµ•—•»ÅÖ’—Ω…•ÈÖçßÕ∏Å¡ï…ÕΩπÖ∞Åï·¡≥µç•—Ñ∏ÅA…’ïâÑÅë•…•ù•ëÑÅAMLÅ‰ÅçΩπ—…Ω∞ÅπïùÖ—•ŸºÅçΩ∏Åô’ïπ—îƒ–Å%0∞ÅçΩµºÅçΩ……ïÕ¡Ωπëî∏Å…ç°•ŸΩÃÅÖë•ç•ΩπÖ±ïÃËÅ±•Ÿîµ°’àπ©Ã∞Åµ•ëë±ï›Ö…îπ©Ã∞Å—ïÕ–µÕçΩ…ïÃµ—Ω’…πÖµïπ–µ…ïçΩŸï…‰πµ©ÃÅ‰Å—ïÕ–µ±•ŸîµÕ°Ö…îµµ•ëë±ï›Ö…îπµ©Ã∏ÅUÕ’Ö…•ºÅï·•ùîÅ1Åç’Ö—…ºÅ©’ùÖëΩ…ïÃÅ‰ÅA…Ωë’ççßÕ∏Å’∏Å©’ùÖëΩ»∞Å•πÕç…•¡çßÕ∏∞Åïπï…Ö∞ΩÖ—ïùΩÀµÑΩÖŸΩ…•—ΩÃΩëï—Ö±±îƒ‡∞Å—ΩëΩÃÅ±ΩÃÅ…ïù…ïÕΩÃÅ‰ÅÖç—’Ö±•ÈÖçßÕ∏Å•πÕ—Ö±ÖëÑÏÅ…ïÕ’±—ÖëΩÃÅõµÕ•çΩÃÅÕ•ù’ï∏ÅA9%9QL∏(((åååÅHƒ–‹∏»∏–∏ƒ‘É
‹ÅÖµ¡±•ÖçßÕ∏ÅÕΩ±•ç•—ÖëÑÅÑÅ±ÖÃÄ¿‡Ë¿‡Å’Ö—ïµÖ±Ñ()MçΩ…ïÃÅëîÅ—Ω…πïºÅçΩ∏ÅΩ…•ùï∏ÅMçΩ…îÅÖ…êÅµ’ïÕ—…ÑÅ`ÅÖççïÕ•â±îÄ°ï……Ö»ÅMçΩ…ïÃÅ‰Å…ïù…ïÕÖ»ÅÑÅµ§ÅMçΩ…îÅÖ…ê§∞ÅçΩπÕï…ŸÑÅ…ï—’…πQºÅ‰ÅΩç’±—ÑÅï∞Å…ïù…ïÕºÅë’¡±•çÖëº∏ÅIΩπëÑÅ¡Ö…—•ç’±Ö»ÅÂÑÅ’ÕÑÅ`∏ÅMîÅ…ïŸ•ÕÖÀÖ∏Åïπï…Ö∞∞ÅÖŸΩ…•—ΩÃ∞ÅÖ—ïùΩÀµÑ∞ÅëΩâ±îÅ—Ω≈’îºƒ‡Å°ΩÂΩÃÅ‰Å¡…ïÕï…ŸÖçßÕ∏ÅëîÅ©’ùÖëΩ…ïÃÅï∏ÅÖµâÖÃÅ…’—ÖÃ∏ÅA…’ïâÑÅëîÅπÖŸïùÖçßÕ∏ÅÖç—’Ö±•ÈÖëÑÅ¡Ö…ÑÅï∞ÅçΩπ—…Ö—ºÅëîÅçΩπÕï…ŸÖçßÕ∏ÏÅâÖπçºÅçΩµ¡±ï—ºÅáÈ∏Å¡ïπë•ïπ—î∏Å…ç°•ŸΩÃÅÖë•ç•ΩπÖ±ïÃËÅ±•Ÿîµ°’àπ°—µ∞∞Å—ïÕ–µ±ÖàµÕ°Ω…—ç’—ÃµπÖŸ•ùÖ—•Ω∏πµ©Ã∏ÅÖµâ•Ö∏Å—Öµâß•∏Å±•Ÿîµ°’àπ©ÃÅ‰Å±ΩÃÅÕ•ï—îÅçΩπ—…Ω±ïÃ∞ÅÂÑÅ…ïù•Õ—…ÖëΩÃÅï∏ÅïÕ—ÑÅŸï…ÕßÕ∏∏(((ååÅHƒ–‹∏»∏–∏ƒÿÉ
‹Å…ïŸ•ÕßÕ∏ÅçΩπÕïç’—•ŸÑÅï∏Å1ÅA…ïŸ•ï‹()Yï…ÕßÕ∏ÅÖπ—ï…•Ω»ÅHƒ–‹∏»∏–∏ƒ‘Å¡’â±•çÖëÑÅIdÅï∏ÅÖ±•ÖÃÅïÕ—Öâ±îÅ±ÖàΩ»ƒ–‹»––µ’¡ëÖ—îµëï±•Ÿï…‰¥»¿»ÿƒ¿¿ƒ∞ÅçΩµµ•–Ä‰·î¿·ê‡‡…çå»≈ò—ôÑÂëîÂâò»—ïê‘ƒ—òƒ‘‡≈ÖÑ‘·Ñ∏ÅAï…ô•∞Å¡…Ω¡•ºÅ°…Ωµ•’¥ΩA±ÖÂ›…•ù°–∏ÅHƒ–‹∏»∏–∏‡ÅçΩµ¡±ï”ÃÅÕ°ï±∞µ…ïÖë‰ÅçΩ∏Å—ΩëΩÃÅ±ΩÃÅ…ïç’…ÕΩÃÅçÖç°ïêÅ‰ÅçΩπ—…Ω±ÖëΩ»ÅÖç—•ŸÖ—ïêÏÅçΩπÕï…ŸÑÅ…ΩπëÑÅAIU	ÅQU1%i%=8ΩM9%=Hºƒ–Ω	19LΩ]°Ö—Õ¡¿ÅÕ•π”•—•çºÄ¿¿¿¿¿¿¿¿∞Å…ΩÕÃ‰¿Ω9ï–‹ÿÅ‰ÄƒÅ…ΩπëÑÅΩô•ç•Ö∞∏Å9’ïŸÑÅ—…ÖπÕ•çßÕ∏Å¡ïπë•ïπ—îÅëîÅç±•ç¨Å‰Å¡…ïÕï…ŸÖçßÕ∏ÏÅ¡’ï…—ÑÅπÖŸïùÖëΩ»ÅπºÅëïç±Ö…ÖëÑÅAMLÅÖπ—ïÃÅëîÅ—…ïÃÅ—…ÖπÕ•ç•ΩπïÃÅ…ïÖ±ïÃ∏ÅA…Ωë’ç—•Ω∏Å•π—Öç—Ñ∏ÅÖµâ•Ö∏ËÅ•πëï‡µù…’¡Ö∞π°—µ∞∞ÅÕï…Ÿ•çîµ›Ω…≠ï»π©Ã∞Å…ï±ïÖÕîπ©ÕΩ∏∞ÅI=5A}=YI10πµê∞ÅI=5A}}Q11πµê∞Å=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµê∞Å=9QI=1}AI=eQ=}M%IΩ59U1}QIM}Hƒ–›|»πµê∞Å=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=Lπµê∞Å=9QI=1}AI=eQ=}M%IΩ5QI%i}AQ%=9}M=IM}Hƒ–›|…|—|ƒπµê∞Å=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµê∞Å=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩ∏∏((åååÅHƒ–‹∏»∏–∏ƒÿÉ
‹Åù…’¡ºÅ‰ÅMçΩ…ïÃÅëîÅ±ÑÅ—Ö…©ï—ÑÅëîÅΩ…•ùï∏()Iï¡…Ωë’ç•ëºÅï∏ÅπÖŸïùÖëΩ»ËÅç…ïÖ»Å—Ω…πïºÅëïÕëîÅ…ΩπëÑÅÖç—•ŸÑÅΩµ•—îÅï∞Åù…’¡ºÅ‰ÅΩπ—•π’Ö»Åµ’ïÕ—…ÑÅïŸïπ—ºÅçï……ÖëºÅÖ’π≈’îÅôÖ±—ÑÅÖÕ•ùπÖçßÕ∏∏Å∞ÅëïÕ—•πºÅëîÅΩ…•ùï∏ÅÕîÅçΩπÕï…ŸÑÅçΩ∏Å`∏ÅMîÅ—…ÖÕ±ÖëÑÅï∞Åù…’¡ºÅçΩ∏ÅÕ’ÃÅ%ÃÅÖ∞ÅôΩ…µ’±Ö…•ºÅÖ’—Ω…•ÈÖëºÏÅÕîÅÖÕΩç•ÑÅœÕ±ºÅÖ∞Åµ•ÕµºÅ…Ω’πë%êÅ‰Å©’ùÖëΩ…ïÃÅÖ∞ÅÖâ…•»ÅMçΩ…ïÃ∞Å¡…ïÕï…ŸÖπëºÅ°ΩÂΩÃ∏ÅΩπ—•π’Ö»ÅÖ∞ÅMçΩ…îÅÖ…êÅ’ÕÑÅ…ï—’…πQºÅŸÖ±•ëÖëºÅëï∞Åç…ïÖëΩ»∏Å5ïπÕÖ©îÅÕ•∏Åù…’¡ºÅçΩ……ïù•ëº∏ÅÖµâ•Ö∏Å•πëï‡µù…’¡Ö∞π°—µ∞∞Å±•Ÿîµ°’àπ©Ã∞Å¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©Ã∞Å—ïÕ–µÕçΩ…ïÃµ—Ω’…πÖµïπ–µ…ïçΩŸï…‰πµ©ÃÏÅÕ•ï—îÅçΩπ—…Ω±ïÃÅîÅ•πŸïπ—Ö…•ºÅ•πç±’•ëΩÃ∏ÅHƒ‘Å—…ÖπÕ•çßÕ∏Å…ïÖ∞ÅëïÕëîƒ–Å¡…ïÕï…€ÃÅ—Ö…©ï—ÑÅâÂ—îµ•ëïπ—•çÖ∞ÏÅïπï…Ö∞ΩÖ—ïùΩÀµÑΩÖŸΩ…•—ΩÃÅ‰ÅëΩâ±îÅ—Ω≈’îÅ—ΩëÖ€µÑÅ¡ïπë•ïπ—ïÃÅëîÅÖçï¡—ÖçßÕ∏ÅπÖŸïùÖëΩ»∏ÅAI=U'M8Å‰Å1Åô•©ΩÃÅÕ•ù’ï∏ƒ–∞Å•A°ΩπîÅ¡ïπë•ïπ—î∏(((ååÅHƒ–‹∏»∏–∏ƒ‹É
‹Å…ïù…ïÕºÅçÖªÕπ•çºÅëïÕëîÅ%π•ç•ºÉ
‹Ä»¿»ÿ¥ƒ¿¥¿ƒÄ¿‰Ë¿¿Å’Ö—ïµÖ±Ñ()Öπë•ëÖ—ºÅHƒÿÅ…ïµΩ—ºÅîÿ¡çåÂå≈å¿Ã’å‡›Ñ»¿ƒ≈Ñÿ»‘ÿ»‡ƒ¿‡≈Ñƒ»‰‹≈ò—ê∞ÉÖ…âΩ∞Ä‰‘‹‹‹–ÿÿ–¡Öê‘Âïê‰Âçôà»Âà¿‘Õçâà‹‹ÿ¿¿ÂÖôçÑ∞Å1ÅA…ïŸ•ï‹Åë¡±}iAç9»·â›ç≈]Ÿ…Ÿ’A1’•›)‰ÅId∏Å9ÖŸïùÖëΩ»Å¡…Ω¡•ºËÅÖç—’Ö±•ÈÖçßÕ∏ÅµÖπ’Ö∞ƒ◊äHƒÿÅçΩπÕï…ŸÑÅï·Öç—Öµïπ—îÅ—Öâ±ÑÅMçΩ…îÅÖ…êÅ‰Å…ïÕ’µï∏ÅëîÅç’Ö—…ºÅ©’ùÖëΩ…ïÃÅΩΩM’¡ï»ÅMïπ•Ω»Ωïµïπ•πÑÏÅ…ΩÕÃ–º‘ºÿº‹Å‰Å9ï—ºÃº–º‘º‘∏ÅIïù…ïÕºÅQΩ…πïºÅçΩπÕï…ŸÑÅ©’ùÖëΩ…ïÃÅ‰ÅÕçΩ…ïÃ∏ÅA…•µï»Å•π—ïπ—ºÅIHÅQ=I9<Å≈’ïìÃÅâ±Ω≈’ïÖëºÅ¡Ω»ÅÖ’—ïπ—•çÖçßÕ∏ÅYï…çï∞ÅëîÅA…ïŸ•ï‹ÏÅçΩ∏ÅÖççïÕºÅ—ïµ¡Ω…Ö∞ÅÖ’—Ω…•ÈÖëºÅÖâ…ßÃÅ‰Åç…óÃÅAIU	ÅI=II%<ÅHƒÿ∏Å9ºÅÕîÅëïâ•±•”ÃÅ¡…Ω—ïççßÕ∏Åπ§ÅÕîÅµΩë•ô•çÖ…Ω∏Å•πÕ—Ö±Öç•ΩπïÃÅëï∞Å¡…Ω¡•ï—Ö…•º∏()Ö±±ºÅ…ï¡…Ωë’ç•ëºÅ…ïÖ∞ËÅ—Ö…©ï—ÑÅÕï…Ÿ•ëÑÅëïÕëîÅ…’—ÑÄºÅ¡Ω»ÅÕ°ï±∞ÅA]Å¡…Ωë’çîÅ…ï—’…πQºÄºÏÅ°’àÅ‰Å=9Q%9UHÅœÕ±ºÅÖëµ•—ï∏ÄΩ•πëï‡µù…’¡Ö∞π°—µ∞∞Å¡Ω»Å±ºÅ≈’îÅ…ïù…ïÕÑÅÖ∞ÅIïù•Õ—…ºÅëîÅÖÕ•ùπÖçßÕ∏∏ÅA…’ïâÑÅπïùÖ—•ŸÑÅ—ïÕ–µÕçΩ…ïÃµ—Ω’…πÖµïπ–µ…ïçΩŸï…‰πµ©ÃÅ%0ÅçΩ∏ÅHƒÿÄ†ºÄÑÙÄΩ•πëï‡µù…’¡Ö∞π°—µ∞§ÏÅçΩ……ïççßÕ∏Å•πç…ïµïπ—Ö∞ÅπΩ…µÖ±•ÈÑÉÈπ•çÖµïπ—îÅ¡Ö—°πÖµîÅëîÅ…ï—’…πQº∞Å¡…ïÕï…ŸÑÅ≈’ï…‰ΩÖ’—Ω…•ÈÖçßÕ∏Ω…Ω’πë}…ï—’…∏Å‰Å—ΩëΩÃÅ±ΩÃÅëÖ—ΩÃ∏Å5•ÕµÑÅ¡…’ïâÑÅAMLÅëïÕ¡◊•ÃÅëîÅçΩ……ïççßÕ∏∏ÅHƒ‹ÅÕ•ù’îÅ¡ïπë•ïπ—îÅëîÅ…ïçΩ……•ëºÅπÖŸïùÖëΩ»∏Å9ºÅçΩπô’πë•»ÅçΩ∏ÅAMLÅ•π—ïù…Ö∞∏()%π—ΩçÖâ±ïÃΩ•π—ΩçÖâ±ïÃµùÖ—îπµ©ÃÅ°•Õ”Õ…•çºÅôÖ±±ÑÅÖ∞Å±ïï»ÅÖ¡§ΩŸΩ•çîµÕ¡ïïç†π©ÃÅ…ï—•…Öëº∏Å∞Å¡ï…ô•∞Å”•çπ•çºÅŸ•ùïπ—îÅâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÃÅŸï…•ô•çÑÅï·¡≥µç•—Öµïπ—îÅ±ÑÅ…ï—•…ÖëÑÅëîÅ5•åΩ$Å¡Ω»ÅΩ…ëï∏Äƒ‰ÅÕï¡—•ïµâ…îÏÅπºÅÕîÅ…ï•πÕ—Ö±ÑÅèÕë•ùºÅ…ï—•…ÖëºÅπ§ÅÕîÅ¡…ïÕïπ—ÑÅïÕîÅùÖ—îÅ°•Õ”Õ…•çºÅçΩµºÅAML∏ÅÖ—î¿∞ÅI=5@∞Å•πŸïπ—Ö…•ºÅ‰ÅâÖπçºÅ1ÅŸ•ùïπ—îÅAMLÅï∏ÅHƒÿ∏Å9’ïŸΩÃÅçΩπ—…Ω±ïÃÅÕîÅ…ï¡ï—•ÀÖ∏Åï∏ÅHƒ‹∏()A…Ωë’ççßÕ∏Å‰Å1Åô•©ΩÃÅçΩπÕï…ŸÖ∏ÅHƒ–‹∏»∏–∏ƒ–ÄºÅÑ’Ñ‘‰‰‡∏Åïπï…Ö∞ΩÖ—ïùΩÀµÑΩÖŸΩ…•—ΩÃΩëï—Ö±±îƒ‡∞Å…ΩπëÑÅ¡Ö…—•ç’±Ö»Å‰Å¡’â±•çÖçßÕ∏ÅÕ•ù’ï∏Å¡ïπë•ïπ—ïÃÅëîÅÖçï¡—ÖçßÕ∏∏ÅIΩ±±âÖç¨ÅÕï…Ÿ•ëΩ»ÅÑ’Ñ‘‰‰‡‘·Ñ…çÑÿŸò‘ÂâêÃÃ—îÕïççê–‘–ÃÃ‘–·âò¿ÏÅÕ•∏Å…Ω±±âÖç¨Åπ§ÅâΩ……ÖëºÅëîÅëÖ—ΩÃ∏()…ç°•ŸΩÃËÅ•πëï‡µù…’¡Ö∞π°—µ∞∞ÅÕï…Ÿ•çîµ›Ω…≠ï»π©Ã∞Å…ï±ïÖÕîπ©ÕΩ∏∞Å—ïÕ–µÕçΩ…ïÃµ—Ω’…πÖµïπ–µ…ïçΩŸï…‰πµ©Ã∞ÅI=5A}=YI10πµê∞ÅI=5A}}Q11πµê∞Å=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµê∞Å=9QI=1}AI=eQ=}M%IΩ59U1}QIM}Hƒ–›|»πµê∞Å=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=Lπµê∞Å=9QI=1}AI=eQ=}M%IΩ5QI%i}AQ%=9}M=IM}Hƒ–›|…|—|ƒπµê∞Å=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµê∞Å=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩ∏∏(((ååÅHƒ–‹∏»∏–∏ƒ‡É
‹ÅΩ……ïççßÕ∏Åëï∞ÅïÕç…•—Ω»Å¡Ö…—•ç’±Ö»Å—…ÖÃÅ—Ω…πïºÉ
‹Ä»¿»ÿ¥ƒ¿¥¿ƒ((¥ÅAï—•çßÕ∏ÅŸ•ùïπ—îËÅ…ïŸ•ÕÖ»ÅMçΩ…ïÃ∞Å•πë•Ÿ•ë’Ö±ïÃÅëîÅ—Ω…πïºÅ‰ÅIΩπëÑÅAÖ…—•ç’±Ö»∞ÅçΩ∏ÅçΩπ—•π’•ëÖêÅ‰ÅÖç—’Ö±•ÈÖçßÕ∏Åïôïç—•ŸÑ∏(¥Å9ÖŸïùÖëΩ»Å…ïÖ∞Åï∏ÅA…ïŸ•ï‹ÅHƒÿËÅç’Ö—…ºÅ©’ùÖëΩ…ïÃ∞Åïπï…Ö∞∞Åç’Ö—…ºÅçÖ—ïùΩÀµÖÃ∞ÅëΩÃÅôÖŸΩ…•—ΩÃÅ‰Åç’Ö—…ºÅëï—Ö±±ïÃÅ¡Ö…—•ç’±Ö…ïÃÏÅçÖëÑÅëï—Ö±±îÅçΩπ—•ïπîÄƒ‡ÅçÖÕ•±±ÖÃ∏(¥Å%0Å…ï¡…Ωë’ç•ëºËÅÖ∞ÅçΩ……ïù•»Å…ΩÕÃÅëîÅÅï∏Å°ΩÂºÄ»ÅëîÄ–ÅÑÄ‘∞Å—Ö…©ï—ÑÅ‰Å—Ω…πïºÅµ’ïÕ—…Ö∏Ä‘∞Å¡ï…ºÅIΩπëÑÅAÖ…—•ç’±Ö»ÅçΩπÕï…ŸÑÄ–∏(¥ÅÖ’ÕÑÅï∏ÅÅ±•ŸîµçΩπ—…Ω∞π©ÕÄËÅï∞ÅïÕ—ÖëºÅçÖ¡—’…ÖëºÅÖπ—ïÃÅëîÅïπçΩ±Ö»Å±ÑÅ¡’â±•çÖçßÕ∏Å¡…•ŸÖëÑÅÕΩâ…ïÕç…•ãµÑÅÕ‘Å¡ïπë•ïπ—îÅÖ∞Åù’Ö…ëÖ»Åï∞ÅÕ—…ïÖ¥Åëï∞Å—Ω…πïºÅÖπ—ï…•Ω»∏(¥ÅΩ……ïççßÕ∏ËÅ±ÑÅ…ΩπëÑÅ¡Ö…—•ç’±Ö»Å¡’â±•çÑÅÖ’—Ω∑Ö—•çÖµïπ—îÅœÕ±ºÅÑÅÕ‘ÅïÕç…•—Ω»ÏÅÕîÅ…ï±ïîÅïÕ—ÖëºÅÖπ—ïÃÅëîÅïπçΩ±Ö»Å—Ω…πïº∏ÅÅ¡…ï¡Ö…ïQΩ’…πÖµïπ—MçΩ…ïÕÄÅµÖπ—•ïπîÅ¡’â±•çÖçßÕ∏Åï·¡≥µç•—ÑÅµïë•Öπ—îÅM=ILÅQ=I9<∏(¥ÅIïù…ïÕßÕ∏Åï∏ÅÅ—ïÕ–µ±Öàµ¡…•ŸÖ—îµ…Ω’πëÃπµ©ÕÄËÅçΩπï·ßÕ∏Å¡…ïŸ•ÑÅÑÅ—Ω…πïºÄ¨ÅçΩ……ïççßÕ∏Å¡Ö…—•ç’±Ö»ÅëïâîÅ¡’â±•çÖ»Å…ΩÕÃÄÿÅÖ∞Å¡…•ŸÖëºÅ‰ÅπºÅ±±ÖµÖ»ÅÑÅ¡’â±•Õ†Å√Èâ±•çº∏Å%0ÅÖπ—ïÃÏÅAMLÅëïÕ¡◊•Ã∏(¥ÅMîÅçΩπÕï…ŸÖ∏Å¡ïπë•ïπ—ïÃ∞Åç…ïëïπç•Ö±ïÃÅ‰ÅÕπÖ¡Õ°Ω—ÃÅ¡…ïŸ•ΩÃÏÅπºÅÕîÅµΩë•ô•çÖ∏Å±ΩÃÅ©’ùÖëΩ…ïÃÅ…ïÖ±ïÃÅëîÅ1ÅºÅ5ÖïÕ—…º∏(¥Å…ç°•ŸΩÃÅô’πç•ΩπÖ±ïÃËÅÅ±•ŸîµçΩπ—…Ω∞π©ÕÄ∞ÅÅ—ïÕ–µ±Öàµ¡…•ŸÖ—îµ…Ω’πëÃπµ©ÕÄ∞Åï—•≈’ï—ÖÃÅï∏ÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄ∞ÅÅ…ï±ïÖÕîπ©ÕΩπÄ∏(¥Å	ÖπçºÅ”•çπ•çºÅ‰ÅùÖ—ïÃÅŸ•ùïπ—ïÃËÅï©ïç’—Ö»ÅÕΩâ…îÅHƒ‡ÏÅÖçï¡—ÖçßÕ∏ÅπÖŸïùÖëΩ»ÅëîÅHƒ‡Å‰Å¡’â±•çÖçßÕ∏Åô•πÖ∞ÅA9%9QL∏(¥Å%π—ΩçÖâ±ïÃÅ°•Õ”Õ…•çºËÅ…ï—•…ºÅ5•åΩ$ÅµÖπ—•ïπîÅ9=9PÅÅÖ¡§ΩŸΩ•çîµÕ¡ïïç†π©ÕÄÏÅπºÅÕîÅëïç±Ö…ÑÅAMLÅπ§ÅÕîÅ…ïÕ—Ö’…ÑÅŸΩËÅ…ï—•…ÖëÑ∏(¥ÅA…Ωë’ççßÕ∏Å‰ÅÖ±•ÖÃÅ1Åô•©ΩÃÅáÈ∏ÅHƒ–‹∏»∏–∏ƒ–ÏÅA…ïŸ•ï‹ÅHƒ‹ÅIdÅÖπ—ïÃÅëîÅïÕ—îÅçÖπë•ëÖ—ºÅHƒ‡∏(((åååÅHƒ–‹∏»∏–∏ƒ‡É
‹ÅÖçï¡—ÖçßÕ∏ÅπÖŸïùÖëΩ»Å‰ÅçÖπë•ëÖ—ºÅëîÅïπ—…ïùÑÉ
‹Ä»¿»ÿ¥ƒ¿¥¿ƒÄ¿‰ËÃ»Å’Ö—ïµÖ±Ñ()AMLÅπÖŸïùÖëΩ»Å¡…Ω¡•ºÅ°…Ωµ•’¥Åï∏ÅA…ïŸ•ï‹ÅÄ‰‹¡Ñ‡›ò‡‡‹‡‰»‹‘‰…ôââÖê¿ÂâÑ—à≈ò›à›ê›ëîÂå≈Ä∞ÅYï…çï∞ÅIdÅÅë¡±|…aç≈-≠1π≠∏…≈≈ÕùâEEå›…1,—ÂÄËÄƒ‡Åëï—Ö±±ïÃÅçΩµ¡…ΩâÖëΩÃ∞ÅçÖëÑÅ’πºÄƒ‡ÅçÖÕ•±±ÖÃÅ‰Å’∏Å¡Ö»Å…ΩÕÃΩ9ï–ÅçΩ……ïç—º∏Å’Ö—…ºÅ©’ùÖëΩ…ïÃËÅïπï…Ö∞–∞ÅçÖ—ïùΩÀµÖÃÅΩΩM’¡ï»ÅMïπ•Ω»Ωïµïπ•πÑ–∞ÅôÖŸΩ…•—ΩÃÅΩM’¡ï»ÅMïπ•Ω»»∞Å¡Ö…—•ç’±Ö»–∏ÅU∏Å©’ùÖëΩ»ÅÕ•π”•—•çºËÅïπï…Ö∞ΩMïπ•Ω»ΩÖŸΩ…•—ΩÃÃ∞Å¡Ö…—•ç’±Ö»ƒ∏Å=9Q%9UHÅ0ÅM=IÅIÅëïÕ¡◊•ÃÅëîÅç…ïÖ»Å—Ω…πïºÅ‰Å`ÅëïÕ¡◊•ÃÅëîÅMçΩ…ïÃÅçΩπÕï…ŸÖ∏ÅπΩµâ…îÅ‰ÅÕçΩ…ïÃ∏ÅΩ……ïççßÕ∏Å¡Ö…—•ç’±Ö»Ä◊äHÿÅ≈’ïëÑÅ…ΩÕÃÿΩ9ï—º‘Å‰Å—Ω…πïºÅçΩπÕï…ŸÑ‘º–ÏÅïÕç…•—Ω»Å¡…•ŸÖëºÅçΩπô•…µÖëº∏()ç—’Ö±•ÈÖç•ΩπïÃÅµÖπ’Ö±ïÃÅ¡…Ω¡•ÖÃƒ◊äHƒ€äHƒﬂäHƒ‡ÅçΩπÕï…ŸÖ∏Å±ΩÃÅëÖ—ΩÃÏÅπ•πù’πÑÅ•πÕ—Ö±ÖçßÕ∏Åëï∞Å¡…Ω¡•ï—Ö…•ºÅÕîÅ—ΩçÑ∏Å	ÖπçºÅ”•çπ•çºÅ1ÅŸ•ùïπ—î∞ÅÖ—î¿∞ÅI=5@∞Å%9Y9QI%<Ä†‹‡ÃÅô’ïπ—ïÃºÕAÅÖπ—ïÃÅëï∞Åπ’ïŸºÅÖ…ç°•Ÿº§Å‰ÅµÖ—…•ËÅ…ï±ïÖÕîÅAML∏ÅIïŸ•ÕßÕ∏ÅπÖŸïùÖëΩ»Ã‰¡¡‡Åµ’ïÕ—…ÑÅëï—Ö±±îÅçΩµ¡±ï—ºÅÕ•∏ÅëïÕâΩ…ëÖµ•ïπ—ºÏÅπºÅçï…—•ô•çÑÅëΩâ±îÅ—Ω≈’îÅõµÕ•çºÅï∏Å•A°ΩπîÅπ§Åï≈’•ŸÖ±ïπç•ÑÅï·Öç—ÑÅçΩ∏ÅΩ…•ù•πÖ∞ÅπºÅ…ïç’¡ï…Öëº∏ÅŸ•ëïπç•ÑÅ…ï¡…Ωë’ç•â±îÅÅ=9QI=1}AI=eQ=}M%IΩY%9%}M=IM}Hƒ–›|…|—|ƒ‡π©ÕΩπÄÏÅçÖ¡—’…ÑÅù’Ö…ëÖëÑÅÅÕçΩ…ïÃµ»ƒ‡µëï—Ö•∞µµΩâ•±î¥»¿»ÿƒ¿¿ƒπ©¡ùÄ∏ÅÖµâ•Ö∏ÅïÕîÅ)M=8∞Å±ΩÃÅÕ•ï—îÅçΩπ—…Ω±ïÃÅ‰ÅÕï±±ºÅëîÅ•πŸïπ—Ö…•ºÏÅô’ïπ—îÅô’πç•ΩπÖ∞Å•ì•π—•çÑÅÖ∞ÅçÖπë•ëÖ—ºÅŸÖ±•ëÖëº∏()π—…ïùÑÅ1Å‰ÅA…Ωë’ççßÕ∏ÅÂÑÅÖ’—Ω…•ÈÖëÑÅï∏ÅÅAI=5AQ}=9Q%9U%}Hƒ–›|»πµëÄÏÅ…ï≈’•ï…îÅçΩµ¡…ΩâÖ»ÅÖÕçïπëïπç•ÑøÖ…âΩ∞Å‰ÅïÕ—ÖëºÅId∞Å…ï±ïÖÕîÅΩô…ïç•ëÑÅ¡Ω»ÅÖµâΩÃÅëΩµ•π•ΩÃÅÕ•∏Å•πÕ—Ö±Ö…±ÑÅï∏Åë•Õ¡ΩÕ•—•ŸΩÃÅëï∞Å¡…Ω¡•ï—Ö…•º∏ÅAïπë•ïπ—îÅÖ∞ÅïÕç…•â•»ÅïÕ—îÅ…ïù•Õ—…ºËÅçÖµâ•ºÅµÖ•∏Å‰ÅçΩπô•…µÖçßÕ∏ÅëîÅÖµâΩÃÅëïÕ¡±•ïù’ïÃ∏Å%π—ΩçÖâ±ïÃÅ°•Õ”Õ…•çºÅëîÅŸΩËÅ…ï—•…ÖëÑÅπºÅïÃÅùÖ—îÅAMLÅπ§ÅÕîÅ…ï•πÕ—Ö±Ñ∏ÅIΩ±±âÖç¨ÅÕï…Ÿ•ëΩ»ËÅÑ’Ñ‘‰‰‡‘·Ñ…çÑÿŸò‘ÂâêÃÃ—îÕïççê–‘–ÃÃ‘–·âò¿ÏÅÕ•∏Å…Ω±±âÖç¨ÅëîÅëÖ—ΩÃ∏(((åååÅHƒ–‹∏»∏–∏ƒ‡É
‹Åïπ—…ïùÑÅçΩµ¡±ï—ÖëÑÉ
‹Ä»¿»ÿ¥ƒ¿¥¿ƒÄ¿‰ËÃ‡Å’Ö—ïµÖ±Ñ()A’â±•çÖëºÅµÖ•∏ÅôÖÕ–µôΩ…›Ö…êÅÅÑÃ‹¡ôåÿÿŸåÿÂâïôòÂå‡‹¿Ã–ÿ›âÑŸàÕåÿÃÿ¿–»¿ÿŸÄ∞ÉÖ…âΩ∞Åï·Öç—ºÅŸï…•ô•çÖëºÏÅ1ÅÅë¡±|–—)eôâçeò»‰ŸP·•πQô0·ë!15®≈ÄÅ‰ÅA…Ωë’ççßÕ∏ÅÅë¡±}Mâ)·›5i]ïE!¨›!°¨‘ÕiI›YUÄÅId∏ÅµâΩÃÅÄΩ…ï±ïÖÕîπ©ÕΩπÄÅ!QQ@»¿¿ÅΩô…ïçï∏ÅHƒ–‹∏»∏–∏ƒ‡∏Å9ÖŸïùÖëΩ…ïÃÅ¡…Ω¡•ΩÃÅÖâ•ï…—ΩÃÅÖπ—ïÃÅëîÅ¡’â±•çÖçßÕ∏ÅµÖπ—•ïπï∏Åµï—ÑÅëîÅ…ï±ïÖÕîÅHƒ–ÅëïÕ¡◊•ÃÅëîÅ…ïçÖ…ùÖ»Å‰Åµ’ïÕ—…Ö∏ÅQU1%iHÅŸ•Õ•â±îΩ°Öâ•±•—ÖëºÏÅπºÅÕîÅ¡’±œÃÅï∏ÅïÕ—ΩÃÅ¡ï…ô•±ïÃÅëîÅïπ—…ïùÑ∏Å9ºÅÕîÅµÖπ•¡’±Ö…Ω∏Å•πÕ—Ö±Öç•ΩπïÃÅºÅ©’ùÖëΩ…ïÃÅ…ïÖ±ïÃÅëï∞Å¡…Ω¡•ï—Ö…•º∏()IïçΩ……•ëºÅÕΩ±•ç•—ÖëºÅçΩµ¡…ΩâÖëºËÄƒ‡Åëï—Ö±±ïÃÅëîÄƒ‡ÅçÖÕ•±±ÖÃ∞Ä–Å‰ÄƒÅ©’ùÖëΩ…ïÃ∞Åïπï…Ö∞ΩÖ—ïùΩÀµÑΩÖŸΩ…•—ΩÃΩIΩπëÑÅAÖ…—•ç’±Ö»∞ÅïÕç…•—Ω»ÅΩô•ç•Ö∞∞ÅçΩ……ïççßÕ∏Å¡…•ŸÖëÑÅÖ•Õ±ÖëÑ∞Å`∞Å=9Q%9UHÅ‰Å¡ï…Õ•Õ—ïπç•Ñ∞ÅÖç—’Ö±•ÈÖç•ΩπïÃÅ¡…Ω¡•ÖÃƒ◊äHƒ€äHƒﬂäHƒ‡Å‰Åëï—Ö±±îÃ‰¡¡‡∏ÅA…’ïâÑÅ•A°ΩπîÅõµÕ•çºÅπºÅçï…—•ô•çÖëÑÏÅπºÅçΩπô’πë•…±ÑÅçΩ∏ÅπÖŸïùÖëΩ»∏ÅŸ•ëïπç•ÑÅëîÅïπ—…ïùÑÅá≈Öë•ëÑÅÑÅÅ=9QI=1}AI=eQ=}M%IΩY%9%}M=IM}Hƒ–›|…|—|ƒ‡π©ÕΩπÄÏÅ±ΩÃÅç’Ö—…ºÅçΩπ—…Ω±ïÃÅëîÅçΩπ—•π’•ëÖêΩÖçï¡—ÖçßÕ∏ΩµÖ¡ÑΩ—Ö…ïÖÃÅ‰ÅÖµâΩÃÅI=5ALÅ≈’ïëÖ∏ÅÖç—’Ö±•ÈÖëΩÃ∞Å©’π—ºÅçΩ∏ÅÕï±±ºÅ•πŸïπ—Ö…•º∏ÅÕ—ÑÅÖç—’Ö±•ÈÖçßÕ∏ÅëΩç’µïπ—Ö∞ÅçΩπÕï…ŸÑÅô’ïπ—îÅô’πç•ΩπÖ∞ÅëîÅHƒ‡Éµπ—ïù…Ñ∏Å1ΩÃÅ¡ïπë•ïπ—ïÃÅëîÅ¡’â±•çÖçßÕ∏ÅÖπΩ—ÖëΩÃÅï∏Å±ΩÃÅ…ïù•Õ—…ΩÃÅ¡…ïŸ•ΩÃÅ≈’ïëÖ∏Åçï……ÖëΩÃÅ¡Ω»ÅïÕ—ÑÅçΩµ¡…ΩâÖçßÕ∏∏(((ååÅHƒ–‹∏»∏–∏ƒ‰É
‹Å…ïç’¡ï…ÖçßÕ∏Å•πëï¡ïπë•ïπ—îÅëï∞Å1ÅÖπ—•ù’ºÉ
‹Ä»¿»ÿ¥ƒ¿¥¿ƒÄƒ¿Ë¿¿Å’Ö—ïµÖ±Ñ((¥ÅŸ•ëïπç•ÑÅπ’ïŸÑÅ¡…Ω¡•ï—Ö…•ºÅ%5|‘‘ƒÃπ¡πúËÅçÖ¡—’…Ñ¿‰Ë‘ƒ∞Å1ÅÕ•ù’îÅHƒ–‹∏»∏–∞Å…ΩπëÑÃ¡Õï¡—•ïµâ…î∞Å)ïÕÕ•îΩ°ΩÂºÿ∏Åπ—…ïùÑÅõµÕ•çÑÅÕ•ù’îÅ%0ÏÅHƒ‡ÅIdÅ‰ÅπÖŸïùÖëΩ»ÅHƒ–ÅπºÅçï…—•ô•çÖ…Ω∏Å…ïç’¡ï…ÖçßÕ∏ÅëîÅHƒ–‹∏»∏–Å•πÕ—Ö±ÖëÑ∏(¥Å9ºÅÕîÅ•πô•ï…îÅΩ…•ùï∏Åï·Öç—ºÅπ§ÅïÕ—ÖëºÅ•π—ï…πºÅëï∞Å•A°ΩπîÅÑÅ¡Ö…—•»ÅëîÅ±ÑÅ•µÖùï∏∏Å9ºÅÕîÅ¡•ëîÅ…ïïπŸ•Ö»ÅçÖ¡—’…ÖÃ∞ÅâΩ……Ö»ÅçÖç£•Ã∞Å…ï•πÕ—Ö±Ö»∞Å…ïù•Õ—…Ö»ÅºÅ…ïÖπΩ—Ö»Å©’ùÖëΩ…ïÃ∏(¥ÅÖ’ÕÑÅëîÅïÕçÖ¡îËÅ…ïç’¡ï…ÖçßÕ∏Åëï¡ïπìµÑÅëîÅÕ’çïÕΩ»ÅM\Å‰ÅëîÅŸΩ±Ÿï»ÅÑÅçÖ…ùÖ»ÅÕ°Ω…—ç’—Ãµ’§π©ÃÏÅπºÅÕîÅçΩµ¡…ΩãÃÅ±ÑÅ…’—ÑÅ•πëï¡ïπë•ïπ—îÅ≈’îÅï∞Å›Ω…≠ï»ÅHƒ–‹∏»∏–Åïπ—…ïùÑÅëïÕëîÅ…ïêÅÖ’∏ÅçΩ∏ÅµïªËÅÖπ—•ù’ºÅçÖç°ïÖëº∏(¥ÅΩπ—…Ω∞ÅπïùÖ—•ŸºÅ¡ï…µÖπïπ—îÅ—ïÕ–µ’¡ëÖ—îµëï±•Ÿï…‰µçΩπ—…Ω∞πµ©ÃÅï©ïç’—ÑÅ›Ω…≠ï»ÅΩ…•ù•πÖ∞·âççôò‰¿»’ââà≈Öçê¡ôò≈Öà¿…ò‹‡¿·êÿ‡‹…âÑ‡‹ÃËÅµÖπ’Ö∞ÅëïÕëîÅ…ïêÅÕ•∏ÅÕç…•¡–Å’¡ëÖ—ï»Åë•…ïç—ºÅ%0Åï∏ÅHƒ‡∏(¥ÅΩ……ïççßÕ∏ÅµÖπ’Ö∞π°—µ∞ÅçÖ…ùÑÄΩÖ¡¿µ’¡ëÖ—îπ©ÃÅÖπ—ïÃÅëï∞ÅµïªËÏÅÖ¡¿µ’¡ëÖ—îπ©ÃÅ¡…Ω—ïùîÅ•π•ç•Ö±•ÈÖçßÕ∏Åë’¡±•çÖëÑ∏ÅMΩ’…çîÅÖ¡¿µ’¡ëÖ—ï»ÅπºÅ•πÕ—Ö±ÑÅπ§ÅπÖŸïùÑÅÕ•∏Å—Ω≈’îÅï·¡≥µç•—º∏ÅMç…•¡—ÃÅëîÅ…ïç’¡ï…ÖçßÕ∏Å•πëï¡ïπë•ïπ—ïÃÅπºÅ…ïïµ¡±ÖÈÖ∏ÅMçΩ…îÅÖ…êÅπ§ÅëÖ—ΩÃ∏(¥ÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÃÅ’ÕÑÅπÖµïÕ¡ÖçïÃÅπ’ïŸΩÃÅ»ƒ–‹¥»¥–¥ƒ‰µ±ïùÖç‰µ…ïçΩŸï…‰Ä°Hƒ‡Å°ÖãµÑÅçΩπÕï…ŸÖëºÅÖçç•ëïπ—Ö±µïπ—îƒ‹§ÏÅÖëΩ¡—ÑÅÕ°ï±∞ÅÖ¡…ΩâÖëºÅÕ•∏ÅâΩ……Ö…±º∏Å—•≈’ï—ÖÃÅ•πëï‡µù…’¡Ö∞π°—µ∞Ω…ï±ïÖÕîπ©ÕΩ∏ΩM\ÅHƒ‰∏(¥Å•·—’…îÅ—ïÕ—ÃΩô•·—’…ïÃΩ»ƒ–‹»–µÕï…Ÿ•çîµ›Ω…≠ï»π©ÃÅçΩπùï±ÑÅï·ç±’Õ•ŸÖµïπ—îÅï∞ÅçΩπ—…Ω±ÖëΩ»Å°•Õ”Õ…•çºÏÅπºÅÕ’Õ—•—’ÂîÅÖ…ç°•ŸΩÃÅëï∞Å¡…Ωë’ç—ºÅ¡Ω»Åô’ïπ—îÅÖπ—•ù’Ñ∏(¥ÅA…’ïâÑÅë•…•ù•ëÑÅAMLÅëïÕ¡◊•Ã∏Å	ÖπçºÅçΩµ¡±ï—º∞ÅùÖ—ïÃÅ‰ÅA…ïŸ•ï‹ÅπÖŸïùÖëΩ»ÅA9%9QLÏÅ¡…Ωë’ççßÕ∏ÅÖç—’Ö∞ÅàÃÕà‰‡‡ÅHƒ‡Å•π—Öç—Ñ∏(¥ÅI’—ÑÅ¡…ïŸ•Õ—ÑÅëïÕëîÅ±ÑÅÖ¡¿Å•πÕ—Ö±ÖëÑËÅ5;hÉäHÅ59U0ÅÅUMUI%<ÉäHÅQU1%iH∏ÅA…•µï…ºÅçΩµ¡…ΩâÖ»Åï∏ÅπÖŸïùÖëΩ»ÏÅœÕ±ºÅï∞Å¡…Ω¡•ï—Ö…•ºÅ¡’ïëîÅï©ïç’—Ö»Åëïπ—…ºÅëîÅÕ‘Å•A°Ωπî∏Å9ºÅÕîÅëïç±Ö…ÑÅçï……ÖëºÅï∞Å%0ÅõµÕ•çºÅ°ÖÕ—ÑÅïŸ•ëïπç•Ñ∏(¥Å…ç°•ŸΩÃËÅÖ¡¿µ’¡ëÖ—îπ©Ã∞ÅµÖπ’Ö∞π°—µ∞∞ÅÕï…Ÿ•çîµ›Ω…≠ï»π©Ã∞Å•πëï‡µù…’¡Ö∞π°—µ∞∞Å…ï±ïÖÕîπ©ÕΩ∏∞Å—ïÕ–µ’¡ëÖ—îµëï±•Ÿï…‰µçΩπ—…Ω∞πµ©Ã∞Å—ïÕ—ÃΩô•·—’…ïÃΩ»ƒ–‹»–µÕï…Ÿ•çîµ›Ω…≠ï»π©ÃÏÅÕ•ï—îÅçΩπ—…Ω±ïÃÅ‰ÅÕï±±ºÅ•πŸïπ—Ö…•º∏ÅIΩ±±âÖç¨ÅÕï…Ÿ•ëΩ»ÅàÃÕà‰‡·å‹…ôÑ‘¡à·Ñ»ÿÕòÂò‹Ÿçå»—ò‡›à—âê–ƒƒÿÏÅÕ•∏Å…Ω±±âÖç¨ÅëîÅëÖ—ΩÃ∏((åååÅHƒ–‹∏»∏–∏ƒ‰É
‹Åµ•ÕµºÉµçΩπºÅ•πÕ—Ö±ÖëºÉ
‹Ä»¿»ÿ¥ƒ¿¥¿ƒÄƒ¿Ëƒ¿Å’Ö—ïµÖ±Ñ)Ω……ïççßÕ∏ÅëîÅÅ¡›Ñµ±Ö’πç†π°—µ±ÄËÅïÕ¡ï…Ö»Å…ïù•Õ—…ºΩÖç—’Ö±•ÈÖçßÕ∏ΩÖç—•ŸÖçßÕ∏Åëï∞ÅçΩπ—…Ω±ÖëΩ»ÅÖπ—ïÃÅëîÅïπ—…Ö»Åï∏Å±ÑÅ—Ö…©ï—ÑÅÖ¡…ΩâÖëÑÏÅÕÖ±•ëÑÅÖçΩ—ÖëÑÅÑÅΩç°ºÅÕïù’πëΩÃÅÕ§Å°Ö‰ÅëïÕçΩπï·ßÕ∏ÅºÅâ±Ω≈’ïº∏Å9ºÅçÖµâ•ÑÅµÖπ•ôïÕ–∞ÅëΩµ•π•ºÅπ§ÅÕ—Ö…—}’…∞∞ÅπºÅâΩ……ÑÅÖ±µÖçïπÖµ•ïπ—ºÅπ§Å¡…Ωµ’ïŸîÅ±ÑÅÖ¡¿ÅÕ•∏ÅQU1%iH∏Å1ÑÅ…ïç’¡ï…ÖçßÕ∏Å¡Ω»Å5Öπ’Ö∞ÅïÃÅ…ïë’πëÖπ—îÏÅπºÅÕÖ—•ÕôÖçîÅÕΩ±ÑÅï∞Å¡ïë•ëº∏Å	ÖπçºÅ¡ï…µÖπïπ—îÅÅ—ïÕ–µ•πÕ—Ö±±ïêµ±Ö’πç†µëï±•Ÿï…‰πµ©ÕÄ∞ÅÖç—•ŸºÅï∏ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄ∞Å¡…’ïâÑÅï∞Å›Ω…≠ï»ÅΩ…•ù•πÖ∞ÅçΩπùï±Öëº∏Å•·—’…ïÃÅÅ—ïÕ—ÃΩô•·—’…ïÃΩ»ƒ–‹»–µçÖ…êπ°—µ±Ä∞ÅÅ»ƒ–‹»–µÕ°Ω…—ç’—Ãπ©ÕÄ∞ÅÅ»ƒ–‹»–µÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄÅ‰ÅÅ•πÕ—Ö±±ïêµ±ïùÖç‰µëï±•Ÿï…‰π°—µ±ÄÅ¡ï…µ•—ï∏Å…ïçΩ……ï»Åï∏ÅA…ïŸ•ï‹Åï∞Åµ•ÕµºÅÖççïÕºÅçΩ∏ÅçΩπ—…Ω±ÖëΩ»ΩçÖç°îÅΩ…•ù•πÖ±ïÃ∏ÅÅŸï…çï∞π©ÕΩπÄÅ¡ï…µ•—îÅÕçΩ¡îÅ…áµËÉÈπ•çÖµïπ—îÅÑÅïÕîÅ›Ω…≠ï»ÅëîÅ¡…’ïâÑÏÅô•·—’…îÅâ±Ω≈’ïÖëºÅï∏ÅëΩµ•π•ΩÃÅô•©ΩÃ∏ÅA9%9QÅπÖŸïùÖëΩ»Å…ïÖ∞Å‰Å¡’â±•çÖçßÕ∏ÏÅ±ÑÅçÖ¡—’…ÑÅõµÕ•çÑÅÕ•ù’îÅÕ•ïπëºÅ%0ÅÕ•∏ÅŸï…•ô•çÖçßÕ∏Å¡ΩÕ—ï…•Ω»∏((ƒ¿Ëƒ‘Å’Ö—ïµÖ±ÑÉäPÅÖ—îÅëîÅëïÕ¡±•ïù’îÅ…ïç°ÖÎÃÅëΩÃÅ…’—ÖÃÅÖâ…ïŸ•ÖëÖÃÅëï∞ÅâÖπçº∏ÅI’—ÖÃÅçΩµ¡±ï—ÖÃËÅÅ—ïÕ—ÃΩô•·—’…ïÃΩ•πÕ—Ö±±ïêµ±ïùÖç‰µëï±•Ÿï…‰π°—µ±Ä∞ÅÅ—ïÕ—ÃΩô•·—’…ïÃΩ»ƒ–‹»–µÕ°Ω…—ç’—Ãπ©ÕÄ∏ÅMîÅçΩ……•ùîÅ±ÑÅ—…ÖÈÖâ•±•ëÖê∞ÅÕ•∏Å…ï—•…Ö»Å±ÑÅ¡’ï…—ÑÅπ§ÅçÖµâ•Ö»ÅÕ‘Å≥Õù•çÑ∏ÅÖπë•ëÖ—ºÅòÃ·âà»ÃÅ9<Å¡’â±•çÖëº∏((ƒ¿Ëƒ‰Å’Ö—ïµÖ±ÑÉäPÅÅ—ïÕ—ÃΩô•·—’…ïÃΩ•πÕ—Ö±±ïêµ±ïùÖç‰µëï±•Ÿï…‰π°—µ±ÄÅ•πôΩ…µÑÅïÕ—ÖëΩÃÅëîÅ…ïù•Õ—…ºÅ‰ÅçΩπ—…Ω±ÖëΩ»Åµ•ïπ—…ÖÃÅ¡…ï¡Ö…ÑÅï∞Å›Ω…≠ï»ÅΩ…•ù•πÖ∞ÏÅëï©ÑÅëîÅïÕ¡ï…Ö»ÅÕ§Åï∞Å›Ω…≠ï»ÅÕîÅŸ’ï±ŸîÅ…ïë’πëÖπ–∏Å∞Å¡…Ωë’ç—ºÅπºÅçÖµâ•Ñ∏Å1ÑÅ¡…’ïâÑÅ…ïÖ∞ÅÕ•ù’îÅA9%9QÏÅπºÅçΩπô’πë•»Åâ±Ω≈’ïºÅëîÅ¡…ï¡Ö…ÖçßÕ∏ÅçΩ∏ÅAML∏((ƒ¿Ë»ÃÅ’Ö—ïµÖ±ÑÉäPÅA…ï¡Ö…ÖçßÕ∏Åâ…Ω›Õï»ÅÖπ—•ù’ºÅâ±Ω≈’ïÖëÑÅÖπ—ïÃÅëîÅ…ïÕΩ±Ÿï»Å…ïù•Õ—ï»Ä°•πÕ—Ö±ÖçßÕ∏ÅΩ…•ù•πÖ∞ÅëïÕçÖ…ùÑÅ—ΩëÖÃÅ±ÖÃÅ…ïÕ¡’ïÕ—ÖÃÅÕ•∏ÅçΩπÕ’µ•»Åç’ï…¡ΩÃ∞Å¡Ö—ÀÕ∏Åç’â•ï…—ºÅ¡Ω»ÅâÖπçºÅÕ°ï±∞µë…Ö•∏§∏ÅÅ—ïÕ—ÃΩô•·—’…ïÃΩ»ƒ–‹»–µ¡…ï¡Ö…Ö—•Ω∏µ›Ω…≠ï»π©ÕÄÅÖëÖ¡—ÑÅï·ç±’Õ•ŸÖµïπ—îÅ—…ÖπÕ¡Ω…—îÅëîÅ•πÕ—Ö±ÖçßÕ∏Å•π•ç•Ö∞Å‰Å’ÕÑÅ•µ¡Ω…—Mç…•¡—ÃÅÕΩâ…îÅ›Ω…≠ï»ÅΩ…•ù•πÖ∞Å•π—Öç—ºÏÅπºÅµΩë•ô•çÑÅπÖŸïùÖçßÕ∏∞ÅÕï±ïççßÕ∏ÅëîÅçÖç£§Åπ§ÅÖ¡…ΩâÖçßÕ∏∏ÅÅ—ïÕ—ÃΩô•·—’…ïÃΩ•πÕ—Ö±±ïêµ±ïùÖç‰µëï±•Ÿï…‰π°—µ±ÄÅ•ëïπ—•ô•çÑÅï·¡≥µç•—Öµïπ—îÅï∞ÅÖëÖ¡—ÖëΩ»Å‰Å¡…Ω£µâîÅÖµâΩÃÅëΩµ•π•ΩÃÅô•©ΩÃÏÅÅŸï…çï∞π©ÕΩπÄÅ¡ï…µ•—îÅÕçΩ¡îÅ…áµËÅÑÅïÕîÅÖ…ç°•ŸºÅëîÅ¡…’ïâÑ∏ÅMîÅ’ÕÑÅ’∏ÅΩ…•ùï∏ÅA…ïŸ•ï‹Åπ’ïŸºÅ¡Ö…ÑÅïŸ•—Ö»Å±ÑÅçΩ±ÑÅëï—ïπ•ëÑÅëï∞Å¡ï…ô•∞ÅÖπ—ï…•Ω»∏Å9ºÅÖô•…µÖ»ÅçΩ±êµ•πÕ—Ö±∞ÅΩ…•ù•πÖ∞ÅAMLÅπ§Åï≈’•ŸÖ±ïπç•ÑÅçΩ∏Å•A°ΩπîÅõµÕ•çº∏((åååÅHƒ–‹∏»∏–∏ƒ‰É
‹Åïπ—…ïùÑÅ¡Ω»Åµ•ÕµºÅÖççïÕºÅŸï…•ô•çÖëÑÅï∏Åâ…Ω›Õï»É
‹Ä»¿»ÿ¥ƒ¿¥¿ƒÄƒ¿ËÃƒÅ’Ö—ïµÖ±Ñ)Å=9QI=1}AI=eQ=}M%IΩY%9%}QU1%i%=9}%9MQ1}Hƒ–›|…|—|ƒ‰π©ÕΩπÄËÅAMLÅπÖŸïùÖëΩ»Åï·Öç—ºÅHƒ–‹∏»∏–ÉäHÅïπ—…ÖëÑÅ•πÕ—Ö±ÖëÑÅÄΩ¡›Ñµ±Ö’πç†π°—µ±ÄÉäHÅâΩ”Õ∏ÅQU1%iHÉäHÅHƒ–‹∏»∏–∏ƒ‰Åï∏Åµ•ÕµºÅΩ…•ùï∏ÏÅAIU	ÅH»–ÅÅHƒ‰ÅçΩπÕï…ŸÑÅI=MLÄ‘∞Å9Q<Ä–Å‰Ä¿‰Ëƒ‡ÅÑ∏Å¥∏ÅAï…ô•∞ÅÖπ—ï…•Ω»ÅAIU	Å%9%Y%U0ÅHƒ‡ÅçΩπÕï…ŸÑÅI=MLÄ‘∞Å9Q<Ä–Å‰Ä¿‡ËƒÿÅÑ∏Å¥∏Å∞ÅÖëÖ¡—ÖëΩ»ÅÕΩ±ºÅ¡…ï¡Ö…ÑÅ—…ÖπÕ¡Ω…—îÅ•π•ç•Ö∞∞Å•µ¡Ω…—ÑÅ•π—Öç—ºÅï∞Å…’π—•µîÅÖπ—•ù’ºÏÅçΩ±êµ•πÕ—Ö±∞ÅΩ…•ù•πÖ∞ÅÕ•∏ÅÖëÖ¡—ÖëΩ»ÅÕîÅŸΩ±ŸßÃÅ…ïë’πëÖπ–Å‰Å9<ÅÕîÅçï…—•ô•çÑ∏Å	ÖπçºÅô’πç•ΩπÖ∞ÅÖç—•Ÿº∞ÅÖç—•ŸÖçßÕ∏ΩΩôô±•πîΩ°’πú∞ÅÕ°ï±∞µë…Ö•∏∞Å…ï±Ω®Å…ΩπëÑÅçï……ÖëÑÅ‰Å¡’ï…—ÖÃÅπïùÖ—•ŸÖÃÅAML∏Å5Öπ•ôïÕ–∞ÅëΩµ•π•ºÅ‰ÅÕ—Ö…—}’…∞ÅπºÅçÖµâ•Ö∏ÏÅπ•πüÈ∏ÅëÖ—ºÅëï∞Å¡…Ω¡•ï—Ö…•ºÅô’îÅµΩë•ô•çÖëº∏ÅA’â±•çÖçßÕ∏ÅÖ’—Ω…•ÈÖëÑÅ¡Ω»ÅçΩπ—•π’•ëÖêÅ‰ÅΩ…ëï∏ÅÖç—’Ö∞∞ÅëïÕ¡◊•ÃÅëîÅŸï…•ô•çÖçßÕ∏Å”•çπ•çÑΩâ…Ω›Õï»∏ÅAïπë•ïπ—îÅΩâÕï…ŸÖ»Å…ïçï¡çßÕ∏Åï∏Å•A°ΩπîÅõµÕ•çºÏÅπºÅçΩπŸï…—•»Åâ…Ω›Õï»Åï∏ÅÖçï¡—ÖçßÕ∏ÅõµÕ•çÑÅπ§ÅÖÕïù’…Ö»ÅÖ’Õïπç•ÑÅÖâÕΩ±’—ÑÅëîÅï……Ω…ïÃÅô’—’…ΩÃ∏(((ååÅHƒ–‹∏»∏–∏»¿É
‹Å…ïù…ïÕºÅëïÕëîÅIHÅQ=I9<Åï∏ÅIïù•Õ—…ºÉ
‹Ä»¿»ÿ¥ƒ¿¥¿ƒÄƒ¿Ë‘‡Å’Ö—ïµÖ±Ñ()Ÿ•ëïπç•ÑÅõµÕ•çÑÅπ’ïŸÑËÅ%5|‘‘»‘Å1Äƒ¿ËÃ‡ÅÕ•ù’îÅHƒ–‹∏»∏–Ä°%0Åïπ—…ïùÑ§ÏÅ%5|‘‘»ÿÅA…Ωë’ççßÕ∏Äƒ¿ËÃ‰Å‰Å%5|‘‘»‰Äƒ¿Ë–ƒÅµ’ïÕ—…Ö∏ÅHƒ–‹∏»∏–∏ƒ‰ÅQU1%i<Ä°AMLÅ…ïçï¡çßÕ∏ÅA…Ωë’ççßÕ∏§∏Å%5|‘‘»‹º‘‘»‡º‘‘»‰Å…ïçΩ……ï∏ÅÖµ•±•ÑÉäHÅQ=I9<ÅI<ÉäHÅ=9Q%9UHÉäHÅIïù•Õ—…ºÅŸÖèµº∏Å9ºÅÕîÅÖô•…µÑÅâΩ……ÖëºÅ¡ï…µÖπïπ—îÅëîÅ©’ùÖëΩ…ïÃÅÑÅ¡Ö…—•»ÅëîÅïÕÑÅ•µÖùï∏∏()Iï¡…Ωë’ççßÕ∏Åâ…Ω›Õï»Å¡…Ω¡•ÑÅçΩ∏ÅAIU	Å%9%Y%U0ÅHƒ‡∞ÅI=MLÄ‘Ω9Q<Ä–º¿‡ËƒÿËÅIïù•Õ—…ºÅï∏ÅçΩ……ïççßÕ∏ÉäHÅIHÅQ=I9<ÅEÅIÅIQUI8ÅHƒ‰ÉäHÅ=9Q%9UHÅŸΩ±ŸßÃÅÑÅIïù•Õ—…º∞ÅçΩ∏Å©’ùÖëΩ»ÅŸ•Õ•â±î∞Åï∏Å±’ùÖ»ÅëîÅ—Ö…©ï—Ñ∏ÅÖ’ÕÑÅçΩπô•…µÖëÑÅëîÅπÖŸïùÖçßÕ∏ËÅ°Öπë±ï»Å…ïù•Õ—…Ö—•ΩπŸïπ—	’——Ω∏ÅΩµ•”µÑÅ…Ω’πë%êÅ‰Å…ï—’…πQº∞Å¡…ïÕïπ—ïÃÅï∏ÅQ=I9<ÅëïÕëîÅ—Ö…©ï—Ñ∏ÅMîÅá≈ÖëîÅç’……ïπ—IΩ’πëIï—’…πAÖ—†ÅçΩµ¡Ö…—•ëºÏÅï∞Åïë•—Ω»ÅëîÅ…ΩπëÑÅï·•Õ—ïπ—îÅçΩπÕï…ŸÑÅ…Ω’πë%êΩ…ï—’…πQº∞Å‰Åï∞Å…ïù•Õ—…ºÅπ’ïŸºÅÕ•ù’îÅ±ÑÅ…’—ÑÅëîÅÖÕ•ùπÖçßÕ∏∏Å9•πüÈ∏ÅâΩ……ÖëºÅπ§ÅÕ’Õ—•—’çßÕ∏ÅëîÅëÖ—ΩÃÅëï∞Å¡…Ω¡•ï—Ö…•º∏()Ωπ—…Ω∞Å¡ï…µÖπïπ—îÅ—ïÕ–µ±Öàµ…ïù•Õ—…Ö—•Ω∏µ…ï—’…∏µÕ—Ö—îπµ©ÃÅï©ïç’—ÑÅï∞Å°Öπë±ï»Å…ïÖ∞ËÅ…ΩπëÑÅïë•—ÖëÑÅ—…ÖπÕµ•—îÅ•êÅ‰Å…ï—Ω…πºÅçÖªÕπ•çºÅÕ•∏Å•π•ç•ºΩÕΩ’…çîı¡›Ñ∞Å¡…ïÕï…ŸÑÅ©’ùÖëΩ…ïÃΩÕçΩ…ïÃÅ‰ÅÕ°Ö…îÅëîÅEÏÅ…ïù•Õ—…ºÅπ’ïŸºÅπºÅ…ï’—•±•ÈÑÅ…ΩπëÑÅÖç—•ŸÑ∏Å—ïÕ–µ±Öàµ’¡ëÖ—îµ…ïçΩŸï…‰πµ©ÃÅï©ïç’—ÑÅ—Öµâß•∏Åï∞Å°ï±¡ï»Å…ïÖ∞∏Å…ç°•ŸΩÃÅ¡…Ωë’ç—ºÅ•πëï‡µù…’¡Ö∞π°—µ∞∞ÅÕï…Ÿ•çîµ›Ω…≠ï»π©Ã∞Å…ï±ïÖÕîπ©ÕΩ∏ÏÅ¡…’ïâÖÃÅ—ïÕ–µ±Öàµ…ïù•Õ—…Ö—•Ω∏µ…ï—’…∏µÕ—Ö—îπµ©ÃÅ‰Å—ïÕ–µ±Öàµ’¡ëÖ—îµ…ïçΩŸï…‰πµ©ÃÏÅëΩç’µïπ—ÖçßÕ∏ÅÖµâΩÃÅI=5AL∞Å=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµê∞Å=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=Lπµê∞Å=9QI=1}AI=eQ=}M%IΩ59U1}QIM}Hƒ–›|»πµê∞Å=9QI=1}AI=eQ=}M%IΩ5QI%i}AQ%=9}M=IM}Hƒ–›|…|—|ƒπµê∞Å=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµêÅ‰ÅÕï±±ºÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩ∏∏()ïπï…Ö∞ΩÖ—ïùΩÀµÑΩÖŸΩ…•—ΩÃÅ‰Åëï—Ö±±îÅ•πë•Ÿ•ë’Ö∞ƒ·°ΩÂΩÃÅ•µ¡±ïµïπ—ÖëΩÃÅHƒ‡ÏÅπºÅï≈’•ŸÖ±îÅÑÅ…ïçΩ……•ëºÅ•π—ïù…Ö∞ÅÖçï¡—Öëº∏Åπ—…ïùÑÅ1ÅõµÕ•çºÅÕ•ù’îÅ%0∏ÅµâΩÃÅëΩµ•π•ΩÃÅ√Èâ±•çΩÃÄΩ…ï±ïÖÕîπ©ÕΩ∏Å‰ÄΩ¡›Ñµ±Ö’πç†π°—µ∞ÅÕ•…Ÿï∏ÅHƒ‰ÅÕ•∏ÅçΩΩ≠•ïÃÏÅπºÅÕîÅÖ—…•â’ÂîÅçÖ’ÕÑÅëï∞Å•A°ΩπîÅÑÅMM<Åπ§ÅÑÅïπ±ÖçîÅï≈’•ŸΩçÖëºÅÕ•∏Å¡…’ïâÑ∏ÅÖ±—ÑÅçΩπΩçï»ÅUI0Åï·Öç—ÑÅëï∞ÅÖççïÕºÅ•πÕ—Ö±ÖëºÅÕ§Åï∞ÅôÖ±±ºÅ¡ï…Õ•Õ—îÏÅπºÅçÖµâ•Ö»Åïπ±Öçî∞Å…ï•πÕ—Ö±Ö»Åπ§ÅâΩ……Ö»ÅÖ±µÖçïπÖµ•ïπ—º∏Å	ÖπçºÅçΩµ¡±ï—ºÅ‰ÅA…ïŸ•ï‹Åëï∞Å…ïù…ïÕºÅçΩ……ïù•ëºÅA9%9QL∏ÅA…Ωë’ççßÕ∏ÅÕ•ù’îÄ»ÿ…î‡ŸÖò–—âïëëê—à·ïî‹‹ÿ·Ñ≈àŸò¿–‹—âî–’ïåÃÅHƒ‰∏ÅIΩ±±âÖç¨ÅèÕë•ùºÅÑÅïÕîÅçΩµµ•–ÏÅëÖ—ΩÃÅ•π—Öç—ΩÃ∏()	ÖπçºÅ—ïÕ–µÕçΩ…ïÃµ—Ω’…πÖµïπ–µ…ïçΩŸï…‰πµ©ÃÅÖç—’Ö±•ÈÖëºÅ¡Ö…ÑÅï©ïç’—Ö»Åï∞Å°ï±¡ï»ÅçΩµ¡Ö…—•ëºÅ…ïÖ∞ÅëîÅ…ï—Ω…πºÏÅµÖπ—•ïπîÅÕ’ÃÅÖÕï…ç•ΩπïÃÅëîÅ¡’â±•çÖçßÕ∏∞ÅçΩ±Ñ∞Åç’ïπ—ÑÅ‰Å¡…ïÕï…ŸÖçßÕ∏∏((ƒƒË¿ƒÅ’Ö—ïµÖ±ÑËÅâÖπçºÅÖç—•ŸºÅçΩµ¡±ï—ºÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÃÅAML∞Å—ïÕ–µ¡…Ω©ïç–µ≈’Ö±•—‰µùÖ—îπµ©ÃÅ‰ÅÕç…•¡—ÃΩ¡…Ω©ïç–µ≈’Ö±•—‰µùÖ—îπµ©ÃÅAML∏ÅIïù•Õ—…ºÅï·•Õ—ïπ—î∞Åπ’ïŸºÅ‰ÅŸÖ±•ëÖçßÕ∏ÅπïùÖ—•ŸÑÅ¡ÖÕÖ∏ÏÅA…ïŸ•ï‹ÅçΩ……ïù•ëºÅ¡ïπë•ïπ—î∏ÅÖ±±ºÅõµÕ•çºÅ1ÅÕ•ù’îÅÖâ•ï…—º∏(((åååÅHƒ–‹∏»∏–∏»¿É
‹ÅÖçï¡—ÖçßÕ∏ÅπÖŸïùÖëΩ»Å‰Å¡’â±•çÖçßÕ∏ÅÖ’—Ω…•ÈÖëÑÉ
‹ÄƒÅΩç—’â…îÄ»¿»ÿÄƒƒËƒ‘Å’Ö—ïµÖ±Ñ()A…ïŸ•ï‹ÅIdÅë¡±|ÕÂï≠®—YÕÂπº……≠i©·Ω’µ8Âµ0∞ÅçΩµµ•–ÿ¡Öåƒ‰‡ƒÿ‡Ã’êÃ¡à–‰–‰–≈î–‹–¡å¿‹‘›åŸÑƒ‰¿‰¿∞ÉÖ…âΩ±âå»¡àƒ‘¡îÃ›î‰–Âåƒ‰»—ÑÕçëÑÿ—ïà¿Ã¡ò»‰ÃÿÕçòÅ•ì•π—•çºÅÖ∞ÅçÖπë•ëÖ—ºÅ”•çπ•çºÅ¡…ΩâÖëº∏Å°…ΩµîÅç±Ω’êËÅ…ïù•Õ—…ºÅï·•Õ—ïπ—îÉäHÅIHÅQ=I9<ÉäHÅ=9Q%9UHÅ…ïù…ïÕÑÄΩ•πëï‡µù…’¡Ö∞π°—µ∞˝…Ω’πë}…ï—’…∏ÙƒÅçΩπÕï…ŸÖπëºÅAIU	ÅH»¿∞Å…ΩÕÃ‘Ω9ï—º–ÏÅMçΩ…ïÃÅQΩ…πïºÅ¡’â±•çÑÅ‰Åµ’ïÕ—…ÑÅïπï…Ö∞ÏÅMïπ•Ω»∞ÅôÖŸΩ…•—ºÅ‰Åëï—Ö±±îƒ·çÖÕ•±±ÖÃÅçΩ∏‘º–ÅAML∏Å`Å…ïù…ïÕÑÅ‰ÅçΩπÕï…ŸÑÅ—Öâ±Ñ∏Åï…ºÅï……Ω…ïÃÅ¡…Ω¡•ΩÃÅëîÅÖ¡±•çÖçßÕ∏ÏÅï……Ω…ïÃÅµï—ÖëÖ—ÑÅï·—ïπÕßÕ∏ÅÕï¡Ö…ÖëΩÃ∏Å9ºÅçï…—•ô•çÑÅ•A°ΩπîÅõµÕ•çºÅπ§Åç•ï……ÑÅ…ïçï¡çßÕ∏Å1∏ÅA…Ω¡•ï—Ö…•ºÅΩ…ëïªÃÅ¡’â±•çÖ»Åï∏ÅïÕ—îÅ—’…πºÏÅµÖ•∏ÅÖç—’Ö±•ÈÖëºÅÑÿ¡Öåƒ‰‡∏Å1Åë¡±}µ≈ÈÈ5µ’î‰Õ°Ω5≈5‡›aEùŸ9ë…†Å‰ÅA…Ωë’ççßÕ∏Åë¡±}·©•1©Ÿ!—eçeŸ…µY’H›X›©)1IÃÅIdÅçΩµ¡…ΩâÖëΩÃÅµïë•Öπ—îÅçΩπïç—Ω»ÅYï…çï∞∏ÅŸ•ëïπç•ÑËÅ=9QI=1}AI=eQ=}M%IΩY%9%}IIM=}Hƒ–›|…|—|»¿π©ÕΩ∏∏ÅÖµâ•Ö∏ÅI=5A}=YI10πµê∞ÅI=5A}}Q11πµê∞Å=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµê∞Å=9QI=1}AI=eQ=}M%IΩ59U1}QIM}Hƒ–›|»πµê∞Å=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=Lπµê∞Å=9QI=1}AI=eQ=}M%IΩ5QI%i}AQ%=9}M=IM}Hƒ–›|…|—|ƒπµê∞Å=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµê∞Å=9QI=1}AI=eQ=}M%IΩY%9%}IIM=}Hƒ–›|…|—|»¿π©ÕΩ∏∞Å=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩ∏∏ÅIΩ±±âÖç¨ÅèÕë•ùº»ÿ…î‡ŸÖò–—âïëëê—à·ïî‹‹ÿ·Ñ≈àŸò¿–‹—âî–’ïåÃ∞ÅÕ•∏Å—ΩçÖ»ÅëÖ—ΩÃ∏(((ååÅHƒ–‹∏»∏–∏»ƒÉäPÅQΩ…πïΩÃÅ‰ÅMçΩ…ïÃ∞ÄƒÅΩç—’â…îÄ»¿»ÿ)%ëïπ—•ô•çÖëΩ»ÉÈπ•çºÅ¡ï…ÕΩπÖ∞Åï∏ÅÖ±—ÑÅ‰Åµ•ù…ÖçßÕ∏ÅM!¥»‘ÿÅëîÅïπ±ÖçïÃÅÖπ—ï…•Ω…ïÃ∏ÅIï—•…ºÅ¡ï…Õ•Õ—ïπ—îÅëîÅù’Ö…ëÖëΩÃÅ‰Å±•µ¡•ïÈÑÅëîÅÖ±•ÖÃÅ…ïŸΩçÖëΩÃ∏ÅÕΩç•ÖçßÕ∏ÅÖ’—Ω∑Ö—•çÑÅëîÅ±ÑÅ…ΩπëÑÅï·Öç—ÑÅÖ∞ÅŸΩ±Ÿï»Åëï∞ÅÖ±—ÑÏÅçΩπÕï…ŸÑÅ°Ω±ïÃÅ‰ÅïÕç…•—Ω»ÅΩô•ç•Ö∞∏ÅIï—•…ºÅÖ’—Ω…•ÈÖëºÅëîÅMÖπ—ÑÅëï±ô•πÑ∞Å-•±ºÅ‰ÅÖµ•±•ÑÄ°ç•πçºÅ—Ö…©ï—ÖÃÅë’¡±•çÖëÖÃ∞Å—…ïÃÅïŸïπ—ΩÃ§ÅëîÅ±ÑÅç’ïπ—ÑÅŸï…•ô•çÖëÑÏÅÕΩô–Å…ïŸΩ≠î∞ÅÕ—…ïÖ¥Å‰Äƒ‘ÅÕçΩ…ïÃÅçΩπÕï…ŸÖëΩÃ∏Åïç°ÑÅ∑ÕŸ•∞Å…ïÕ—…•πù•ëÑÅÖ∞ÅÖπç°ºÅëï∞ÅëßÖ±Ωùº∏Å	ÖπçΩÃÅÖ’—Ω∑Ö—•çΩÃÅ‰ÅπÖŸïùÖëΩ»Å¡ïπë•ïπ—ïÃÅ°ÖÕ—ÑÅ…ïù•Õ—…ºÅëîÅïŸ•ëïπç•Ñ∏Å9ºÅçï…—•ô•çÑÅ•A°ΩπîÅõµÕ•çº∏()	ÖπçºÅπ’ïŸºËÅÅ—ïÕ–µ—Ω’…πÖµïπ–µÕ°ï±òµçÖπΩπ•çÖ∞πµ©ÕÄÅŸÖ±•ëÑÅÖ±•ÖÃÅë’¡±•çÖëΩÃ∞Å…ï—•…ºÅ¡ï…Õ•Õ—ïπ—îÅ‰ÅçΩπÕï…ŸÖçßÕ∏ÅëîÅïŸïπ—ΩÃÅÖ©ïπΩÃ∏()H»ƒÅπÖŸïùÖëΩ»ËÅÖ±—ÑÅ‰Åïπï…Ö∞ΩÖ—ïùΩÀµÖÃΩÖŸΩ…•—ΩÃΩëï—Ö±±îÅAMLÏÅ…ïŸ•ÕßÕ∏ÅÖë•ç•ΩπÖ∞Åëï—ïç”ÃÅ≈’îÅï∞Å…ï—Ω…πºÅëïÕëîÅ—Ö…©ï—ÑÅ¡ï…ÕΩπÖ∞ÅïÕç…•ãµÑÅ±ÑÅÕï±ïççßÕ∏Åô’ï…ÑÅëîÅÕ‘Åç’ïπ—Ñ∏Å±•Ÿîµ°’àπ©ÃÅçΩπÕï…ŸÑÅÖ°Ω…ÑÅï∞Å¡…ïô•©ºÅëîÅ±ÑÅ—Ö…©ï—ÑÅΩ…•ùï∏Å‰Å…ïç°ÖÈÑÅç’ïπ—ÑΩΩ…•ùï∏ÅÖ©ïπΩÃ∏ÅMîÅ…ïŸÖ±•ëÑÅï∞Å…ïçΩ……•ëºÅÖπ—ïÃÅëîÅ¡…ΩµΩŸï»∏((ååÅHƒ–‹∏»∏–∏»»É
‹Å5;hÅÕ•πç…Ωπ•ÈÖëºÅçΩ∏ÅMçΩ…îÅÖ…êÉ
‹ÄƒÅΩç—’â…îÄ»¿»ÿ)ïπï…Ö∞∞ÅÖ—ïùΩÀµÖÃ∞Å	’ÕçÖ»Å)’ùÖëΩ»Å‰ÅÖŸΩ…•—ΩÃÅ’ÕÖ∏Å±ÑÅµ•ÕµÑÅ…’—ÑΩïÕç…•—Ω»ÅëîÅM=ILÅQ=I9<∞ÅçΩ∏Å¡ï…ÕΩπÖ±Ÿïπ–Å‰Å…ï—Ω…πºÅëîÅ±ÑÅ—Ö…©ï—ÑÅÖç—’Ö∞∏Å5;hÅ±ïîÅï∞ÅïÕ—Öπ—îÅëîÅÕ‘Åç’ïπ—Ñ∏Å∞Å°’àÅÖ¡±•çÑÅ±ÑÅŸ•Õ—ÑÅëïÕ¡◊•ÃÅëîÅçÖ…ùÖ»Å•ëïπ—•ëÖêΩïŸïπ—ºÏÅÕîÅï±•µ•πÑÅ±ÑÅçÖ……ï…ÑÅëîÄ»‘¡µÃ∏Å5$ÅM=IÅIÅçΩπÕï…ŸÑÅ…ï—’…πQºÅ‰Å±ÑÅç’ïπ—ÑÅΩ…•ù•πÖ∞∏ÅÖµâ•Ö∏ÅÕ°Ω…—ç’—Ãµ’§π©Ã∞Å•πëï‡µù…’¡Ö∞π°—µ∞∞Å±•Ÿîµ°’àπ©Ã∞ÅÕï…Ÿ•çîµ›Ω…≠ï»π©Ã∞Å…ï±ïÖÕîπ©ÕΩ∏∞ÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©Ã∞Å—ïÕ–µµïπ‘µÕçΩ…ïçÖ…êµ—Ω’…πÖµïπ–µÕÂπåπµ©Ã∞ÅI=5A}=YI10πµê∞ÅI=5A}}Q11πµêÅ‰Å=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩ∏∏Å	ÖπçºÅπïùÖ—•ŸºÅçΩ∏ÅΩ—…ºÅ—Ω…πïºÅù’Ö…ëÖëºËÅ—ïÕ–µµïπ‘µÕçΩ…ïçÖ…êµ—Ω’…πÖµïπ–µÕÂπåπµ©Ã∏Å	…Ω›Õï»Ωëï¡±Ω‰Å¡ïπë•ïπ—ïÃ∏ÅIΩ±±âÖç¨ÅµÖ•∏Ä–¡ïÑƒ’ôôôòƒ‡ƒ‡·ïî»‹‡—Ñ…à‰›êŸëÑ»»·âôÖâî–¿ÏÅÕ•∏Åµ•ù…ÖçßÕ∏ÅëîÅëÖ—ΩÃ∏()=…ëï∏ÅÖë•ç•ΩπÖ∞ËÅ5=9%Q=HÅ0ÅQ=I9<Å8ÅY%Y<ÅÕîÅ…ïπΩµâ…ÑÅ9I0Åï∏Å5;h∏ÅMîÅÖç—’Ö±•ÈÖ∏Å—ïÕ–µ±ÖàµÕ°Ω…—ç’—ÃµπÖŸ•ùÖ—•Ω∏πµ©ÃÅ‰Å—ïÕ–µ±Öàµù±ΩâÖ∞µΩ¡ï…Ö—•ΩπÖ∞µÖ’ë•–πµ©ÃÅ¡Ö…ÑÅï·•ù•»Åï∞ÅπΩµâ…îÅŸ•ùïπ—î∏ÅIïù•Õ—…ºÅï∏Å=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµê∏()=…ëï∏ÅÖë•ç•ΩπÖ∞Äƒ»Ë»‘Å’Ö—ïµÖ±ÑËÅ…ï—•…Ö»ÅçΩµ¡±ï—Öµïπ—îÅMQ%=9HÅ‰Ä¨ÅIHÅ=QI<ÅQ=I9<∞ÅM1%HÅÅMQÅQ=I9<∞ÅEU%QHÅÅ5%LÅQ=I9=L∞ÅY%HÅQ	1I<ÅÅ5%LÅY=I%Q=LÅëï∞Å5;h∏Å—ïÕ–µ±ÖàµÕ°Ω…—ç’—ÃµπÖŸ•ùÖ—•Ω∏πµ©ÃÅï·•ùîÅÕ‘ÅÖ’Õïπç•Ñ∏()=…ëï∏ÅÖë•ç•ΩπÖ∞Äƒ»Ë»ÿÅ’Ö—ïµÖ±ÑËÅ…ï—•…Ö»Å5%LÅQ=I9=LÄºÅ±•Õ—ÑÅëîÅù’Ö…ëÖëΩÃÅëï∞Å5;h∏ÅQ=I9=LÅÕîÅçΩπÕï…ŸÑÅçΩµºÅÖççïÕºÅ¡…•πç•¡Ö∞∏()∞ÅçΩπ—…Ω∞ÅÕç…•¡—ÃΩµÖπ’Ö∞µÕç…ïï∏µ¡Ö…•—‰µùÖ—îπµ©ÃÅï·•ùîÅ9I0Å‰ÅQ=I9=LÅï∏Åï∞Å5;hÅŸ•ùïπ—îÅÕïüÈ∏Å±ÖÃÉÕ…ëïπïÃÅÖë•ç•ΩπÖ±ïÃÏÅï∞ÅçÖ√µ—’±ºÅ°•Õ”Õ…•çºÅëï∞ÅµÖπ’Ö∞ÅµÖπ—•ïπîÅÕ‘ÅŸï…ÕßÕ∏Å¡…Ω¡•Ñ∏()IïŸ•ÕßÕ∏ÅëîÅ…ïçΩ……•ëºÅçΩµ¡±ï—ºËÅ5Öπ’Ö∞ÅçΩπÕï…ŸÑÅ…ï—’…πQº∞Å¡ï…ÕΩπÖ±Ÿïπ–Å‰Å¡ï…ÕΩπÖ±-•πêÏÅ5$ÅM=IÅIÅ‰Å…’—ÖÃÅëîÅMçΩ…ïÃÅëïÕëîÅ5Öπ’Ö∞Å…ïù…ïÕÖ∏ÅÑÅ±ÑÅµ•ÕµÑÅ—Ö…©ï—ÑÅ¡ï…ÕΩπÖ∞∏Å	ÖπçºÅπïùÖ—•ŸºÅÖë•ç•ΩπÖ∞Åï∏Å—ïÕ–µµïπ‘µÕçΩ…ïçÖ…êµ—Ω’…πÖµïπ–µÕÂπåπµ©Ã∏()∞ÅçΩπ—…Ö—ºÅ°•Õ”Õ…•çºÅ—ïÕ–µ±Öàµ»ÿ¿µ¡°ÂÕ•çÖ∞µµÖ—…•‡πµ©ÃÅÕîÅÖç—’Ö±•ÈÑÅÑÅQ=I9=LÅ‰Å9I0ÅÕïüÈ∏Å±ÑÅΩ…ëï∏ÅŸ•ùïπ—î∞ÅµÖπ—ïπ•ïπëºÅ±ÖÃÅ¡…’ïâÖÃÅëîÅπÖŸïùÖçßÕ∏∞ÅÕçΩ…ïÃÅ‰Åô±Ω—ÖçßÕ∏∏()9ÖŸïùÖëΩ»Å…ïÖ∞ËÅïπï…Ö∞‘º–Å‰ÿº‘∞ÅMïπ•Ω»Ωïµïπ•πÑÅ‰ÅÖŸΩ…•—ΩÃÅAML∏Å	UMHÅ)U=HÅëï—ïç”ÃÅΩç’±—ÖçßÕ∏ÅëîÄç°’â1ïÖëï…]…Ö¿Å¡Ω»ÅMLÅëîÅãÈÕ≈’ïëÑÅÖπ—•ù’ºÏÅÕçΩ…ïÃµ’§πçÕÃÅµÖπ—•ïπîÅ±ÑÅ—Öâ±ÑÅçΩµ¡Öç—ÑÅŸ•Õ•â±îÅï∏Å°’àµÕïÖ…ç†µµΩëî∏ÅMîÅ…ïŸÖ±•ëÑÅÖπ—ïÃÅëîÅ¡…ΩµΩŸï»∏(()H»»ÅÖçï¡—ÖçßÕ∏Å°…ΩµîÅç±Ω’êËÅ—ΩëΩÃÅ±ΩÃÅ…ïçΩ……•ëΩÃÅ±•Õ—ÖëΩÃÅï∏Å=9QI=1}AI=eQ=}M%IΩY%9%}59U}Hƒ–›|…|—|»»π©ÕΩ∏ÅAML∏ÅA…ïŸ•ï‹Åô•πÖ∞Åë¡±}5D’Y°πŸ9Õ»Â›…°)9a9πçY∞ÅçΩµµ•––¡âêÿÂÑ‡ƒ›î‰¡ê‡…ôò…çÑ‡Ã—å‹ÕëÖò‡–ÿ·ê‘¿‡‘‡∏ÅÈÕ≈’ïëÑÅŸ•Õ•â±îÅ…ΩÕÃ‘Ω9ï—º–ÅçΩµ¡…ΩâÖëÑÅ—…ÖÃÅçΩ……ïù•»ÅMLÏÅπïùÖ—•ŸºÅçΩ∏ÅëΩÃÅ—Ω…πïΩÃÅÖâ…îÅï∞ÅÖç—’Ö∞ÅçΩπÕï…ŸÖπëºÅ…ΩÕÃ‘Ω9ï—º–Å‰ÿº‘∏Å	ÖπçºÅçΩµ¡±ï—ºÅîÅ•πŸïπ—Ö…•ºÅAML∏ÅA’â±•çÖçßÕ∏ÅÖ’—Ω…•ÈÖëÑÅÑÅµÖ•∏ÏÅ…ïçï¡çßÕ∏ÅïÕ—Öâ±îÅ¡ïπë•ïπ—îÅëîÅŸï…•ô•çÖçßÕ∏∏Å9ºÅçï…—•ô•çÑÅ•A°ΩπîÅõµÕ•çº∏ÅÖµâ•Ö∏ÅI=5A}=YI10πµê∞ÅI=5A}}Q11πµê∞Å=9QI=1}AI=eQ=}M%IΩY%9%}59U}Hƒ–›|…|—|»»π©ÕΩ∏Å‰Å=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩ∏∏(((ååÅHƒ–‹∏»∏–∏»ÃÉ
‹Åç•ï……ïÃ∞ÅïπçÖâïÈÖëΩÃÅMçΩ…ïÃÅ‰ÅçΩπÕï…ŸÖçßÕ∏ÅÖ∞ÅÖç—’Ö±•ÈÖ»É
‹ÄƒÅΩç—’â…îÄ»¿»ÿ)=…ëï∏ËÅ—ΩëÖÃÅ±ÖÃÅ`ÅëîÅç•ï……îÅŸï…ëïÃÅÑÅ±ÑÅ•È≈’•ï…ëÑÅô’ï…ÑÅëï∞ÅµÖ…çº∞Åô’ïπ—î»»∏’¡‡Ä°…ïôï…ïπç•Ñƒ’¡‡Ä¨‘¿î§∞ÉÖ…ïÑÅ”Öç—•∞–—¡‡∏ÅπçÖâïÈÖëΩÃÅMçΩ…ïÃ∞Å¡…•ŸÖëºÅ‰Åëï—Ö±±îÅçΩµ¡Ö…—ï∏ÅÖπç°º–‹∏‘îÅëï∞Å±ΩùºÅ‰ÅµÖ…ùï∏Ω…ï”µç’±Ñ∏ÅQU1%iHÅ¡…ïÕï…ŸÑÅ¡ï…ÕΩπÖ±ççΩ’π–Ω¡ï…ÕΩπÖ±Ÿïπ–Ω¡ï…ÕΩπÖ±-•πêÅ‰ÅŸ’ï±ŸîÅÑÅ±ÑÅ…ΩπëÑÅçΩπô•ù’…ÖëÑÏÅçΩπÕï…ŸÑÅ…ïù•Õ—…ºÅç’ÖπëºÅïÕ”ÑÅï∏Åïë•çßÕ∏∏ÅAΩ…—Ö∞Å•πç±’ÂîÅ9QIHÅÅQ=I9<Åa%MQ9Q∞ÅïŸïπ—ΩÃÅÖ’—Ω…•ÈÖëΩÃÅ‰Åïπ—…ÖëÑÅÑÅ—Ö…©ï—ÑÅÖÕ•ùπÖëÑÏÅ•πŸ•—ÖçßÕ∏ÅÕ•ù’îÅÖ’—Ω…•ÈÖçßÕ∏ÅŸ•ùïπ—î∏Å9ºÅÖ±—ï…ÑÅèÖ±ç’±ΩÃÅπ§Åµ•ïµâ…ΩÃÅëï∞Å—Ω…πïº∏Å…ç°•ŸΩÃËÅÕ°Ω…—ç’—Ãµ’§π©Ã∞ÅÕçΩ…ïÃµ’§πçÕÃ∞Å¡…•ŸÖ—îµ…Ω’πëÃπ©Ã∞ÅÖ¡¿µ’¡ëÖ—îπ©Ã∞Å•πëï‡µù…’¡Ö∞π°—µ∞∞Å±•Ÿîµ°’àπ°—µ∞∞Å±•Ÿîµ°’àπ©Ã∞ÅÕï…Ÿ•çîµ›Ω…≠ï»π©Ã∞Å…ï±ïÖÕîπ©ÕΩ∏∞Å—ïÕ–µ’¡ëÖ—îµëï±•Ÿï…‰µçΩπ—…Ω∞πµ©Ã∞ÅI=5A}=YI10πµê∞ÅI=5A}}Q11πµê∞Å=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩ∏∞Å=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµê∏Å	ÖπçºΩ¡…ïŸ•ï‹ΩÖçï¡—ÖçßÕ∏ÅπÖŸïùÖëΩ»Å¡ïπë•ïπ—ïÃ∏ÅIΩ±±âÖç¨‹…ê…çå‘»ÃƒÃÃ¡î‡›àÿÿ‡›ôàÕçÖê‡»‡‡‘–·çÑ¡ê‹‘∏()H»ÃÅÖµ¡±•ÖçßÕ∏ÅëîÅΩ…ëï∏ƒÃË¿◊äLƒÃË¿‰ËÅ—…ïÃÅâΩ—ΩπïÃÅ•ù’Ö±ïÃÅQ=I9<ÄºÅQ=I9<ÅQ%Y<ÄºÅM=ILÅQ=I9<ÏÅ•πù…ïÕºÅÖ∞Åµ•ÕµºÅ—Ω…πïºÅçΩ∏ÅèÕë•ùºÅçΩµ¡Ö…—•ëºÅ¡Ω»Åç…ïÖëΩ»Ä°…Ω∞ÅÖπΩ—ÖëΩ»Å±•µ•—ÖëºÅÑÅÕ‘Åù…’¡º§∏ÅÕë•ùºÅŸ•Õ•â±îΩçΩ¡•Öâ±îÅÖ∞Åô•πÖ∞ÅëîÅ±ÑÅ—Ö…©ï—ÑÅÕΩ±Öµïπ—îÅ¡Ö…ÑÅΩ…ùÖπ•ÈÖëΩ»∏Å	Öç≠ïπêÅ…ïç°ÖÈÑÅ•πçΩ……ïç—º∞ÅŸïπç•ëº∞ÅµΩëÖ±•ëÖêÅÖ©ïπÑ∞Åç’¡ºÅ±±ïπº∞Å…ïŸΩçÖëºÅ‰Å±ïç—’…ÑÅëîÅΩ—…ºÅïŸïπ—º∏Å…ç°•ŸΩÃÅÖë•ç•ΩπÖ±ïÃÅÖ¡§Ω}±•àΩ¡ï…ÕΩπÖ∞µïŸïπ–µÖççïÕÃπ©Ã∞ÅÖ¡§Ω¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©Ã∞Å¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©Ã∞ÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©Ã∞Å—ïÕ–µ±Öàµ’¡ëÖ—îµ…ïçΩŸï…‰πµ©ÃÅ‰Å—ïÕ–µ—Ω’…πÖµïπ–µÖç—•ŸîµçΩëîπµ©Ã∏ÅA…’ïâÑÅçΩ∏ÅÅA±•—îÅÖ•Õ±ÖëÑÅŸÖ±•ëÑÅïÕç…•—Ω»ÅΩô•ç•Ö∞Å…ΩÕÃ‘Ω9ï—º–Å‰Å≥µµ•—ïÃÅëîÅÖççïÕº∏()=…ëï∏ƒÃËƒÿÅ’Ö—ïµÖ±ÑËÅ—Ω…πïºΩçÖµ¡ºÅëïÕ¡±ïùÖâ±îΩµΩëÖ±•ëÖêÅëïô•π•ëΩÃÅ¡Ω»ÅΩ…ùÖπ•ÈÖëΩ»ÏÅôïç°ÑÅÖ’—Ω∑Ö—•çÑÅ’Ö—ïµÖ±ÑÅÕ•∏Åïë•çßÕ∏Åï∏Åç…ïÖçßÕ∏∏ÅπçÖâïÈÖëºÅëîÅ—Ö…©ï—ÑÅ±•ùÖëÑÅ‰ÅMçΩ…ïÃÅ•πç±’ÂîÅïÕΩÃÅç’Ö—…ºÅëÖ—ΩÃ∏ÅÕ—ÖëºÅçÖπë•ëÖ—º∞Å¡ïπë•ïπ—îÅπÖŸïùÖëΩ»∏()EÅπÖŸïùÖëΩ»ÅH»ÃÄƒÃË»ﬂäL»‰ËÅç…ïÖçßÕ∏Å…ïÖ∞∞ÅïπçÖâïÈÖëºÄ–ÅëÖ—ΩÃ∞Åôïç°ÑÅ…ïÖëΩπ±‰Å‰Åç•ï……îÅŸï…ëî»»∏’¡‡Åô’ï…ÑÅëï∞ÅµÖ…çºÅAMLÏÄÃÅâΩ—ΩπïÃÅÖπç°º»ÿ‘∏ÃÕ¡‡ΩÖ±—º‘…¡‡ÅAML∏Åï—ïç—ÖëºÅèÕë•ùºÅç…ïÖëΩ»ÅπºÅ—…ÖÕ±ÖëÖëºÅÑÅÖ±µÖçïπÖµ•ïπ—ºÅëîÅÕ‘Å—Ö…©ï—ÑÅÖÕ•ùπÖëÑÏÅÕîÅçΩ……•ùîÅï∏ÅΩ¡ïπÕÕ•ùπïëÖ…êÅœÕ±ºÅçΩ∏Åµïµâ…ïœµÑÅΩ…ùÖπ•Èï»ÅîÅ%ÅçΩ•πç•ëïπ—îÏÅ¡ïπë•ïπ—îÅ…ïŸÖ±•ëÖ»∏(((ååÅHƒ–‹∏»∏–∏»ÃÉ
‹ÅçΩπ—•π’•ëÖêÅ…ïç’¡ï…ÖëÑÅ‰Å…ïŸ•ÕßÕ∏É
‹ÄƒÅΩç—’â…îÄ»¿»ÿÄƒ‘ËÃÿÅ’Ö—ïµÖ±Ñ)Iïç’¡ï…ÖëºÅ…ïµΩ—ºÅçÑÂò≈âê‡‡—å’ëà¿‘‹‡‰–Ã‘‘»…ôò‘‹ÂâÖÖà–ÿ…å‡ÿÏÅA…ïŸ•ï‹Åë¡±}Ee…Ÿ–›U	°)	AëQù-—πQ•-ëùòÅId∏ÅΩµ•π•ΩÃÅô•©ΩÃÅ1ΩA…Ωë’ççßÕ∏ÅáÈ∏‹…ê…çå‘ΩH»»ÅÖ∞Å•π•ç•Ö»∏Å	ÖπçºÅçΩµ¡±ï—ºÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÃÅ‰ÅÖ—î¿ÅAML∏Å%πŸïπ—Ö…•ºÅΩ…•ù•πÖ∞‹‰Ÿô’ïπ—ïÃÅ‰ÕAÅ…ïç’¡ï…ÖëΩÃÅçΩ∏Å°ÖÕ°ïÃÅçΩ•πç•ëïπ—ïÃÅAML∏Å°…ΩµîÅç±Ω’êÅ¡…Ω¡•ºËÅ…ïù•Õ—…ºÅE∞ÅÕçΩ…î‘º–∞Åç…ïÖ»Å—Ω…πïº∞ÅçΩπ—•π’Ö»ÅÑÅ—Ö…©ï—Ñ∞ÅèÕë•ùºÅç…ïÖëΩ»∞Åïπï…Ö∞ΩMïπ•Ω»ΩÖŸΩ…•—ΩÃ∞Åëï—Ö±±îƒ‡∞Å…ïù…ïÕºÅçΩ∏Å`∞ÅIΩπëÑÅAÖ…—•ç’±Ö»Å‰Åëï—Ö±±îƒ‡ÅAML∏ÅQ…ïÃÅç•ï……ïÃÅµïë•ëΩÃÅŸï…ëïÃ»»∏’¡‡º–—¡‡∏Å……Ω…ïÃÅµï—ÖëÖ—ÑÅï·—ïπÕßÕ∏ÅÕï¡Ö…ÖëΩÃÏÅπºÅï……Ω…ïÃÅ¡…Ω¡•ΩÃÅΩâÕï…ŸÖëΩÃ∏Å9ºÅçï…—•ô•çÑÅ•A°ΩπîÅπ§Å…ïçï¡çßÕ∏Åï∏Å•πÕ—Ö±Öç•ΩπïÃÅëï∞Å¡…Ω¡•ï—Ö…•º∏ÅA’â±•çÖçßÕ∏Åï∏ÅÖµâΩÃÅëΩµ•π•ΩÃÅÖ’—Ω…•ÈÖëÑÏÅ¡ïπë•ïπ—îÅçΩµ¡…ΩâÖ»ÅIdÅ‰Å…ï±ïÖÕîÅΩô…ïç•ëÑ∏ÅIΩ±±âÖç¨ÅèÕë•ùº‹…ê…çå‘»ÃƒÃÃ¡î‡›àÿÿ‡›ôàÕçÖê‡»‡‡‘–·çÑ¡ê‹‘ÏÅÕ•∏ÅâΩ……ÖëºÅëîÅëÖ—ΩÃ∏)…ç°•ŸΩÃÅëΩç’µïπ—Ö±ïÃËÅ=9QI=1}AI=eQ=}M%IΩY%9%}=9Q%9U%}Hƒ–›|…|—|»Ãπ©ÕΩ∏∞Å=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµê∞Å=9QI=1}AI=eQ=}M%IΩ59U1}QIM}Hƒ–›|»πµê∞Å=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=Lπµê∞Å=9QI=1}AI=eQ=}M%IΩ5QI%i}AQ%=9}M=IM}Hƒ–›|…|—|ƒπµê∞ÅI=5A}=YI10πµê∞ÅI=5A}}Q11πµêÅ‰Å=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩ∏∏Å’ïπ—îÅô’πç•ΩπÖ∞ÅÕ•∏ÅçÖµâ•ΩÃÅ…ïÕ¡ïç—ºÅÖ∞ÅA…ïŸ•ï‹Å¡…ΩâÖëº∏(((ååÅHƒ–‹∏»∏–∏»ÃÉ
‹Å°Ω—ô•‡ÅëîÅëïÕçÖ…ùÑÅ•πÕ—Ö±ÖëÑÉ
‹ÄƒÅΩç—’â…îÄ»¿»ÿÄƒÿËƒ‰Å’Ö—ïµÖ±Ñ)Ÿ•ëïπç•ÑÅ%5|‘ÿ¿¿ËÅ•πÕ—Ö±ÖçßÕ∏Å1Å’ÕÑÅÖ±•ÖÃÅùΩ±òµÕåµù–µ±Öàµù•–µ±Öàµ»ƒ–ÿµïπ—…‰µΩ¡î¥ŸàÃŸïîµï¡ùçÖëëÂÃµ¡…Ω©ïç—ÃπŸï…çï∞πÖ¡¿∞Å…ÖµÑÅ±ÖàΩ»ƒ–ÿµïπ—…‰µΩ¡ï∏¥»—†µ•πŸ•—ïÃ¥»¿»ÿ¿‰Ã¿∞Åëï—ïπ•ëÑÅï∏·âççôò‰ΩHƒ–‹∏»∏–∏ÅMîÅ°•ÈºÅôÖÕ–µôΩ…›Ö…êÅπºÅôΩ…ÈÖëºÅÑ’åƒ‘–‰‹ÏÅëïÕ¡±•ïù’îÅë¡±}	!Q]ieQ∏›IH›MÕ5¨·i!Ÿç·ÑÅId∞Åµ•ÕµºÅΩ…•ùï∏∏Å	…Ω›Õï»Å¡…Ω¡•ºÅ…ïÖ∞ÅH»–ÅÑÅH»ÃÅçΩ∏ÅQU1%iHÅçΩπÕï…ŸÑÅπΩµâ…îΩçÖ—ïùΩÀµÑΩ!@ΩµÖ…çÖÃÏÅ¡…Ω¡•ï—Ö…•ºÅçΩπô•…µÑÅ…ïçï¡çßÕ∏Åëï∞ÅâΩ”Õ∏Å¡ï…ºÅ—Ω≈’îÅŸ’ï±ŸîÅÑÅQU1%iHÄ°%0ÅõµÕ•çº§∏Å9ºÅÕîÅëïç±Ö…ÑÅÖçï¡—ÖçßÕ∏Å•A°Ωπî∏)1ΩùÃÅYï…çï∞ËÅ…ïë•…ïçç•ΩπïÃÃ¿‹Åï∏ÄΩ•πëï‡µù…’¡Ö∞π°—µ∞∏ÅIï¡…Ωë’ççßÕ∏ÅçΩ∏Åµ•ëë±ï›Ö…îÅ…ïÖ∞ËÅçΩΩ≠•îÅùÕç}¡ï…ÕΩπÖ±}çΩπ—ï·–ÅëîÅ—Ω…πïºÅçï……ÖëºÅ…ïë•…•ùîÅëïÕçÖ…ùÑÅùïª•…•çÑÅëîÅ—Ö…©ï—ÑÅÑÅ±•Ÿîµ°’àÏÅ…ïô…ïÕ°M°ï±∞Å…ïç°ÖÈÑÅ!Q50ÅÕ•∏Åµï—ÑÅëîÅ…ï±ïÖÕîÅ‰ÅçΩπÕï…ŸÑÅâ’•±êÅÖπ—ï…•Ω»∏ÅΩ……ïççßÕ∏Å•πç…ïµïπ—Ö∞ÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÃËÅëïÕçÖ…ùÖ»ÅÕΩ±Öµïπ—îÅ=1%9}9QIdÅçΩ∏Å•π•ç•ºÙƒÅ‰Å}}ùÕçù}â’•±ë}ç°ïç¨Ùƒ∞ÅçΩπÕï…ŸÖ»Åç±ÖŸîÅçÖªÕπ•çÑÄΩ•πëï‡µù…’¡Ö∞π°—µ∞Åï∏ÅçÖç°î∏Å9ºÅÕîÅçÖµâ•ÑÅÖ’—Ω…•ÈÖçßÕ∏ÅëîÅ—Ö…©ï—ÑÅ¡ï…ÕΩπÖ∞∞ÅïÕç…•—Ω»ÅëîÅÕçΩ…ïÃ∞ÅçΩΩ≠•ïÃ∞ÅµÖπ•ôïÕ–∞ÅΩ…•ùï∏Åπ§ÅÖ±µÖçïπÖµ•ïπ—ºÅëîÅ…ΩπëÖÃ∏)Ωπ—…Ω∞Å¡ï…µÖπïπ—îÅ—ïÕ–µ’¡ëÖ—îµÕ°ï±∞µçΩπ—ï·–πµ©ÃËÅ%0ÅÖπ—ïÃÅëï∞ÅçÖµâ•ºÅ‰ÅAMLÅëïÕ¡◊•ÃÏÅ¡…’ïâÑÅ…’—ÑÅ…ïÖ∞Åµ•ëë±ï›Ö…îÅ‰ÅçΩπ—ïπ•ëºΩç±ÖŸîÅëîÅÕ°ï±∞∏ÅMîÅ•πçΩ…¡Ω…ÑÅÖ∞ÅâÖπçºÅΩâ±•ùÖ—Ω…•ºÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©Ã∏ÅA…’ïâÖÃÅÕ°ï±∞µë…Ö•∏∞Åëï±•Ÿï…‰µçΩπ—…Ω∞ÅîÅ•πÕ—Ö±±ïêµ±Ö’πç†ÅAMLÏÅâÖπçºÅ•π—ïù…Ö∞ΩA…ïŸ•ï‹Ωâ…Ω›Õï»ÅëîÅ°Ω—ô•‡Å¡ïπë•ïπ—ïÃÅÖ∞Å…ïù•Õ—…Ö»∏ÅA’â±•çÖçßÕ∏ÅÖ’—Ω…•ÈÖëÑÅ¡Ω»ÅΩ…ëï∏ÅŸ•ùïπ—îÅ—…ÖÃÅçï…ºÅ%0Å”•çπ•çºΩâ…Ω›Õï»∏ÅIΩ±±âÖç¨ÅëîÅèÕë•ùº’åƒ‘–‰‹∞ÅëïÕ¡±•ïù’îÅ¡…ïŸ•ºÅë¡±}	!Q]ieQ∏›IH›MÕ5¨·i!Ÿç·ÑÏÅπ’πçÑÅ…Ω±±âÖç¨ÅëîÅëÖ—ΩÃ∏)…ç°•ŸΩÃËÅÕï…Ÿ•çîµ›Ω…≠ï»π©Ã∞Å—ïÕ–µ’¡ëÖ—îµÕ°ï±∞µçΩπ—ï·–πµ©Ã∞ÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©Ã∞ÅÖµâΩÃÅI=5AL∞Å=9Q%9U%}5MQI}1πµê∞Å59U1}QIM}Hƒ–›|»πµê∞Å5A}5MQI=}}I!%Y=Lπµê∞Å5QI%i}AQ%=9}M=IM}Hƒ–›|…|—|ƒπµê∞ÅI%MQI=}I%9%9%M}1%πµêÅîÅ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩ∏∏ÅÖ±±ºÅïÕçÖ√ÃÅÑÅEÅ¡Ω…≈’îÅÕ‘Å¡ï…ô•∞ÅπºÅ—ïªµÑÅçΩπ—ï·—ºÅ¡ï…ÕΩπÖ∞Åçï……ÖëºÏÅï∞Åπ’ïŸºÅâÖπçºÅ…ï¡…Ωë’çîÅïÕîÅïÕ—Öëº∏Å…•—ï…•ºËÅµ•ÕµºÅÖ±•ÖÃÅëïâîÅµΩÕ—…Ö»ÅQU1%iH∞Å•πÕ—Ö±Ö»ÅÕ°ï±∞Å¡’â±•çÖëºÅ¡Ω»Å—Ω≈’îÅ‰ÅµÖπ—ïπï»Å—Ö…©ï—ÑΩçΩπô•ù’…ÖçßÕ∏∏ÅΩπô•…µÖçßÕ∏Åëï∞Åë•Õ¡ΩÕ•—•ŸºÅëï∞Å¡…Ω¡•ï—Ö…•ºÅ¡ïπë•ïπ—î∏(((ååÅHƒ–‹∏»∏–∏»ÃÉ
‹ÅèÕë•ùºÅ1Å‰ÅÖçï¡—ÖçßÕ∏ÅõµÕ•çÑÅù…ÖâÖëΩÃÉ
‹ÄƒÅΩç—’â…îÄ»¿»ÿÄƒÿËÃ¿Å’Ö—ïµÖ±Ñ()=…ëï∏Åëï∞Å¡…Ω¡•ï—Ö…•ºËÄâ5ï—îÅÑÅ±ÑÅµÖ—…•ËÅï∞ÅèÕë•ùºÅ¡Ö…ÑÅ±ÖâΩ…Ö—Ω…•ºÅ‰Åëï©Ö…±ºÅù…ÖâÖëºà∏ÅΩπô•…µÖçßÕ∏ÅõµÕ•çÑÅ…ïç•â•ëÑÅï∞ÄƒÅΩç—’â…îÄ»¿»ÿÅÑÅ±ÖÃÄƒÿË»‰Å’Ö—ïµÖ±ÑËÄâ<ÅÖ°Ω…ÑÅœ¥∞Å≈’ïìÃà∏ÅMîÅç•ï……ÑÅï∞Å¡ïπë•ïπ—îÅëîÅ…ïçï¡çßÕ∏ΩÖç—’Ö±•ÈÖçßÕ∏Å1Åï∏ÅÕ‘Å•A°ΩπîÅ¡Ω»ÅçΩπô•…µÖçßÕ∏Åï·¡…ïÕÑÅëï∞Å¡…Ω¡•ï—Ö…•ºÏÅπºÅï≈’•ŸÖ±îÅÑÅçï…—•ô•çÖ»Å—ΩëºÅï∞Å…ïÕ—ºÅëîÅô’πç•ΩπïÃ∏()ÅIïôï…ïπç•ÑÅ¡ï…µÖπïπ—îÅÅÕë•ùºÄºÅïÕ—ÖëºÅ)Ä¥¥¥ÅÄ¥¥¥Å)ÅYï…ÕßÕ∏Å1ÅÖçï¡—ÖëÑÅÅHƒ–‹∏»∏–∏»ÃÅ)ÅΩµµ•–Åô’πç•ΩπÖ∞Å¡’â±•çÖëºÅÄƒ¿‹‡ƒ»ƒ‰’Ñ≈ïÑ·ê…Ñ–»’Öò·å‘¿¿‰ÿ»‘ÕâÑ»ÿ»’âòÅ)É…âΩ∞Åï·Öç—ºÅŸÖ±•ëÖëºÅÄ…î‘ÿƒ‹Ãÿ‰ÿÕïå’ò‹·òƒÿ…ôôÖçÑ‘‡ÂâÖçïà‹‘‡Âå‡Å)ÅΩµ•π•ºÅô•©ºÅ1ÅÅ°——¡ÃËºΩùΩ±òµÕåµù–µ±ÖàπŸï…çï∞πÖ¡¿Å)Å=…•ùï∏ÅëîÅ±ÑÅ•πÕ—Ö±ÖçßÕ∏Å1ÅçΩπô•…µÖëÑÅÅ°——¡ÃËºΩùΩ±òµÕåµù–µ±Öàµù•–µ±Öàµ»ƒ–ÿµïπ—…‰µΩ¡î¥ŸàÃŸïîµï¡ùçÖëëÂÃµ¡…Ω©ïç—ÃπŸï…çï∞πÖ¡¿Å)ÅIÖµÑÅëï∞ÅÖççïÕºÅ•πÕ—Ö±ÖëºÅÅ±ÖàΩ»ƒ–ÿµïπ—…‰µΩ¡ï∏¥»—†µ•πŸ•—ïÃ¥»¿»ÿ¿‰Ã¿Å)Åï¡±ΩÂµïπ–Å1Åô•©ºÅÅë¡±}-A§Ÿ!ÈE	·ŸM¿›MÈ—›°≈≠ê›—ÃÄ¥ÅIdÅ)Åï¡±ΩÂµïπ–ÅÖççïÕºÅ•πÕ—Ö±ÖëºÅÅë¡±|»ÿŸUU0Â¡π‡’Q°ÂU(—§≈µëôUÕËÄ¥ÅIdÅ)Åï¡±ΩÂµïπ–Å¡…Ωë’ççßÕ∏ÅÅë¡±|ŸÖ›9—-YπÂ•…ÖµÂ®ƒÕ¡]Õ¡Â-Y•·0Ä¥ÅIdÅ)ÅA…ïŸ•ï‹ÅŸÖ±•ëÖëºÅÅë¡±|’≈EA’Ÿç’›AÃŸ!ëâUQëM·iY9ΩçTÄ¥ÅIdÅ)ÅIΩ±±âÖç¨Åï·ç±’Õ•ŸºÅëîÅèÕë•ùºÅÄ’åƒ‘–‰›ôÖîÃÿ‹Âïà·î¡ôâôÑÿ‹‘¿‘ÕòŸê≈Ñ»Ã≈îƒ–Å()Õë•ùºÅçΩπÕï…ŸÖëºÅï∏ÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÃËÅ…ïô…ïÕ°M°ï±∞ÅëïÕçÖ…ùÑÅ=1%9}9QIdÅµïë•Öπ—îÄΩ•πëï‡µù…’¡Ö∞π°—µ∞˝•π•ç•ºÙƒô}}ùÕçù}â’•±ë}ç°ïç¨ÙƒÏÅù’Ö…ëÑÅ±ÑÅ…ïÕ¡’ïÕ—ÑÅâÖ©ºÅ±ÑÅç±ÖŸîÅïÕ—Öâ±îÄΩ•πëï‡µù…’¡Ö∞π°—µ∞∏ÅŸ•—ÑÅ±ÑÅ…ïë•…ïççßÕ∏Åëï∞ÅçΩπ—ï·—ºÅ¡ï…ÕΩπÖ∞Åçï……ÖëºÅÕ•∏ÅçÖµâ•Ö»ÅÖ’—Ω…•ÈÖçßÕ∏∞ÅçΩΩ≠•ïÃ∞ÅµÖπ•ôïÕ–∞ÅïÕç…•—Ω»ÅºÅëÖ—ΩÃ∏ÅΩπ—…Ω∞Å¡ï…µÖπïπ—îÅ—ïÕ–µ’¡ëÖ—îµÕ°ï±∞µçΩπ—ï·–πµ©ÃËÅ%0ÅΩ…•ù•πÖ∞Å‰ÅAMLÅ—…ÖÃÅçΩ……ïççßÕ∏ÏÅôΩ…µÑÅ¡Ö…—îÅëï∞ÅâÖπçºÅΩâ±•ùÖ—Ω…•ºÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©Ã∏()	ÖπçºÅô’πç•ΩπÖ∞ÅçΩµ¡±ï—º∞Å¡…’ïâÖÃÅπïùÖ—•ŸÖÃ∞ÅÖ—î¿∞ÅI=5@ÅîÅ•πŸïπ—Ö…•ºÅAML∏Å	…Ω›Õï»Å¡…Ω¡•ºËÅçΩπ—…Ω±ÖëΩ»ÅΩ…•ù•πÖ∞ÅHƒ–‹∏»∏–∞ÅQU1%iHÅ¡Ω»Å—Ω≈’î∞ÅHƒ–‹∏»∏–∏»ÃÅQU1%i<Å‰ÅçΩπÕï…ŸÖçßÕ∏ÅëîÅπΩµâ…îΩçÖ—ïùΩÀµÑΩ!@ΩµÖ…çÖÃÅAML∏ÅŸ•ëïπç•ÑÅŸ•Õ’Ö∞Å±ÖàµÖç—’Ö±•ÈÖëΩ»µ°Ω—ô•‡µŸï…•ô•çÖëºπ©¡ú∏ÅYï…çï∞ÅçΩµ¡…ΩãÃÅ±ΩÃÅ—…ïÃÅëΩµ•π•ΩÃÅÕΩâ…îÅï∞ÅçΩµµ•–Åô’πç•ΩπÖ∞Å•πë•çÖëºÅï∏ÅïÕ—ÖëºÅId∏ÅA…Ωë’ççßÕ∏Å…ïç•âßÃÅ±ÑÅµ•ÕµÑÅçΩ……ïççßÕ∏ÏÅ±ÑÅçΩπô•…µÖçßÕ∏ÅõµÕ•çÑÅπ’ïŸÑÅÕîÅ…ïô•ï…îÅï·ç±’Õ•ŸÖµïπ—îÅÑÅ1∏()Õ—ÑÅÖπΩ—ÖçßÕ∏ÅïÃÅëΩç’µïπ—Ö∞ÏÅçΩπÕï…ŸÑÅï∞ÅèÕë•ùºÅô’πç•ΩπÖ∞ÅÖçï¡—Öëº∏Å…ç°•ŸΩÃÅ…ïù•Õ—…ÖëΩÃËÅµÖ—…•ËÅëîÅÖçï¡—ÖçßÕ∏∞ÅçΩπ—•π’•ëÖê∞Å—Ö…ïÖÃ∞ÅµÖ¡ÑÅëîÅÖ…ç°•ŸΩÃ∞Å…ïù•Õ—…ºÅëîÅ…ï•πç•ëïπç•ÖÃ∞ÅÖµâΩÃÅI=5ALÅîÅ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩ∏∏Å1ΩÃÅ¡ïπë•ïπ—ïÃÅ°•Õ”Õ…•çΩÃÅëîÅçΩµ¡•±ÖçßÕ∏∞ÅA…ïŸ•ï‹∞Å¡’â±•çÖçßÕ∏Å‰Å…ïçï¡çßÕ∏Å1Åëï∞Å…ïù•Õ—…ºÄƒÿËƒ‰Å≈’ïëÖ∏Åçï……ÖëΩÃÅµïë•Öπ—îÅïÕ—ÖÃÅïŸ•ëïπç•ÖÃ∏Å9ºÅ°Ö‰ÅÖççßÕ∏Å¡ïπë•ïπ—îÅëï∞Å¡…Ω¡•ï—Ö…•ºÅ¡Ö…ÑÅïÕ—ÑÅÖç—’Ö±•ÈÖçßÕ∏∏(((ååÅHƒ–‹∏»∏–∏»ÃÉ
‹ÅëïÕÖç—•ŸÖ»ÅYï…çï∞ÅQΩΩ±âÖ»Å¡Ö…ÑÅ’Õ’Ö…•ΩÃÉ
‹ÄƒÅΩç—’â…îÄ»¿»ÿÄƒ‹Ë»ƒÅ’Ö—ïµÖ±Ñ()A…Ω¡•ï—Ö…•ºÅ…ï¡Ω…—ÑÅ%5|‘ÿƒ‘ËÅ¡Öπï∞ÅYï…çï∞ÅQΩΩ±âÖ»Å—Ö¡ÑÅ±ÑÅÖ¡±•çÖçßÕ∏Å1∏ÅÖ’ÕÑÅëîÅïÕçÖ¡îËÅÖççïÕºÅ•πÕ—Ö±ÖëºÅ’ÕÑÅÖ±•ÖÃÅA…ïŸ•ï‹ÅçΩ∏Å—ΩΩ±âÖ»Å¡Ω»Åëïôïç—ºÅëîÅï≈’•¡ºÏÅïπ—…ïùÑÅô’πç•ΩπÖ∞ÅπºÅçΩµ¡…ΩãÃÅ•π—ï…ôÖËÅ”•çπ•çÑÅ•πÂïç—ÖëÑÅ¡Ω»Å°ΩÕ—•πú∏Å©’Õ—îÅπÖ—•ŸºÅù’Ö…ëÖëºÅï∏ÅÖµâΩÃÅ¡…ΩÂïç—ΩÃÅùΩ±òµÕåµù–µ±ÖàÅ‰Åï¡úµçÖëë‰ËÅA…îµA…Ωë’ç—•Ω∏Åï¡±ΩÂµïπ—ÃÅ=ôòÅ‰ÅA…Ωë’ç—•Ω∏Åï¡±ΩÂµïπ—ÃÅ=ôò∏Å9ºÅÕîÅµΩë•ô•çÖ∏Å¡…Ω—ïççßÕ∏ÅëîÅÖççïÕº∞Å¡ï…µ•ÕΩÃ∞ÅëÖ—ΩÃÅëîÅ…ΩπëÖÃÅπ§ÅèÕë•ùºÅëîÅèÖ±ç’±º∏()Iï¡’â±•çÖçßÕ∏Åëï∞Åµ•ÕµºÅèÕë•ùºÅçΩ∏ÉÈ±—•µΩÃÅÖ©’Õ—ïÃËÅÖ±•ÖÃÅ•πÕ—Ö±ÖëºÅ1Åë¡±|…-≈‡ŸUU9ç—å≈Qh›9@’π›ÈÖçU5TÅIdÄ°çΩµµ•–ƒ¿‹‡ƒ»ƒ‰’Ñ≈ïÑ·ê…Ñ–»’Öò·å‘¿¿‰ÿ»‘ÕâÑ»ÿ»’âò§ÏÅ¡…Ωë’ççßÕ∏Åë¡±}-òÂ≈5a)≠Uôº’]Ñ’]©—0»ÿŸπÿÃ–ÅIdÄ°çΩµµ•–‰—î¿…ëà≈ôå»‡ƒ‘—å›ÖåŸÖê¿Õå‡‹‘‰Âî—âïå‘≈ò‹Ã§∏Å∞ÅÖ±•ÖÃÅ•πÕ—Ö±ÖëºÅçΩπÕï…ŸÑÅùΩ±òµÕåµù–µ±Öàµù•–µ±Öàµ»ƒ–ÿµïπ—…‰µΩ¡î¥ŸàÃŸïîµï¡ùçÖëëÂÃµ¡…Ω©ïç—ÃπŸï…çï∞πÖ¡¿∏Å	…Ω›Õï»ÅŸï…•ô•çÑÅ!Q50Åπ’ïŸºÅçΩ∏Å•π•ç•ºÙƒÅ‰Å}}ùÕçù}â’•±ë}ç°ïç¨ÙƒËÅçï…ºÅÕç…•¡—ÃΩ•ô…ÖµïÃÅŸï…çï∞π±•ŸîΩôïïëâÖç¨Ω—ΩΩ±âÖ»∞ÅŸï…ÕßÕ∏ÅHƒ–‹∏»∏–∏»ÃÅ‰ÅëÖ—ΩÃÅÕ•π”•—•çΩÃÅ¡…ïŸ•ΩÃÅçΩπÕï…ŸÖëΩÃ∏Å!Q50ÅÂÑÅÖ¡…ΩâÖëºÅï∏ÅçÖç°îÅ¡’ïëîÅçΩπÕï…ŸÖ»Åï∞ÅÕç…•¡–Å°•Õ”Õ…•çºÏÅπºÅÕîÅâΩ……ÑÅçÖç°îÅπ§ÅÖ±µÖçïπÖµ•ïπ—ºÅëï∞Å¡…Ω¡•ï—Ö…•º∏Å9ºÅÕîÅçï…—•ô•çÑÅáÈ∏Å±ÑÅ…ïÖ¡ï…—’…ÑÅõµÕ•çÑÅ¡ΩÕ—ï…•Ω»Åï∏ÅÕ‘Å•A°Ωπî∏()Ωπ—…Ω∞Å¡…ïŸïπ—•ŸºÅ¡ï…µÖπïπ—îËÅÖπ—ïÃÅëîÅïπ—…ïùÖ»Å1Ω¡…Ωë’ççßÕ∏ÅŸï…•ô•çÖ»ÅÖµâΩÃÅÖ©’Õ—ïÃÅ=ôòÅ‰ÅÖ’Õïπç•ÑÅëï∞Å¡Öπï∞Å”•çπ•çºÅï∏Å!Q50Åπ’ïŸºÅëï∞ÅëΩµ•π•ºÅô•©ºÅ‰Åëï∞ÅÖ±•ÖÃÅëîÅ±ÑÅ•πÕ—Ö±ÖçßÕ∏∏Å1ÑÅÖçï¡—ÖçßÕ∏ÅõµÕ•çÑÅëîÅ±ÑÅÖç—’Ö±•ÈÖçßÕ∏ÄƒÿË»‰ÅÕîÅµÖπ—•ïπî∏ÅIïù•Õ—…ºÅëΩç’µïπ—Ö∞ÅîÅ•πŸïπ—Ö…•ΩÃÅÕ•πç…Ωπ•ÈÖëΩÃÅÕ•∏ÅçÖµâ•ΩÃÅô’πç•ΩπÖ±ïÃÏÅ¡’â±•çÖçßÕ∏ÅëΩç’µïπ—Ö∞ÅÖç—’Ö∞Å…ïπΩŸÖÀÑÅÖëï∑ÖÃÅï∞ÅëΩµ•π•ºÅô•©ºÅ1∏ÅIΩ±±âÖç¨ÅëîÅ•π—ï…ôÖËÅëîÅ°ΩÕ—•πúËÅ…ïÕ—Ö’…Ö»ÅŸ•Õ•â•±•ëÖêÅïôÖ’±–ÅÕ§Åï∞Å¡…Ω¡•ï—Ö…•ºÅ±ºÅÕΩ±•ç•—ÑÏÅèÕë•ùºÅ‰ÅëÖ—ΩÃÅ¡ï…µÖπïçï∏Å•π—Öç—ΩÃ∏Å…ç°•ŸΩÃËÅÖµâΩÃÅI=5AL∞ÅµÖ—…•Ë∞ÅçΩπ—•π’•ëÖê∞Å—Ö…ïÖÃ∞ÅµÖ¡Ñ∞Å…ï•πç•ëïπç•ÖÃÅîÅ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩ∏∏(((ååÅHƒ–‹∏»∏–∏»–Ä¥Åï±•µ•πÖçßÕ∏ÅÖ’—Ω…•ÈÖëÑÅ‰ÅçÖë’ç•ëÖêÄ¥Ä»ÅΩç—’â…îÄ»¿»ÿ()=…ëï∏Åπ’ïŸÑÅëï∞Å¡…Ω¡•ï—Ö…•ºËÅçΩ……ïù•»ÅYï…çï∞Å¡ï…Õ•Õ—ïπ—î∞ÅπºÅÖ……ÖÕ—…Ö»ÅèÕë•ùΩÃÅÖ∞Å…ïù•Õ—…Ö»Å©’ùÖëΩ…ïÃ∞Å…ï—•…Ö»Å…ΩπëÖÃΩ—Ω…πïΩÃÅï·•Õ—ïπ—ïÃ∞ÅçΩπÕï…ŸÖ»Ä»—†Å—…ÖÃÅMçΩ…îƒ‡Å‰Å¡ï…µ•—•»Åï±•µ•πÖçßÕ∏ÅëîÅ•πçΩµ¡±ï—ΩÃÅ¡Ω»Å¡…Ω¡•ï—Ö…•ºÅºÅëï±ïùÖëºÅ•πë•Ÿ•ë’Ö∞ÅçΩ∏ÅçΩµ¡…ΩâÖπ—î∏Å∞Å¡…Ω¡•ï—Ö…•ºÅ—•ïπîÅçΩπ—…Ω∞Å¡±ïπºÏÅï∞Åëï±ïùÖëºÅçÖë’çÑÄ»—†ÅëïÕ¡◊•ÃÅëï∞Åç•ï……î∏ÅÕ¡ïç•ô•çÖçßÕ∏Å‰ÅïÕ—ÖëΩÃÅŸï…•ô•çÖâ±ïÃËÅ=9QI=1}AI=eQ=}M%IΩAQ%=9}Hƒ–›|…|—|»–πµê∏Å	ÖÕîÅ…ïµΩ—ÑÄ≈ê–‡ÕÖòÏÅèÕë•ùºÅH»–ÅπºÅ¡’â±•çÖëºÅ—ΩëÖ€µÑ∏ÅIïù…ïÕ•ΩπïÃÅë•…•ù•ëÖÃÅAML∞Å•π—ïù…Ö∞ΩπÖŸïùÖëΩ»Ω±•µ¡•ïÈÑΩ¡’â±•çÖçßÕ∏ÅA9%9QL∏()Iï•πç•ëïπç•ÑËÅÖ©’Õ—îÅ°ΩÕ—•πúÅ=ôòÅπºÅÖ±çÖπÈÖâÑÅ!Q50ÅÂÑÅÖ¡…ΩâÖëºÅï∏ÅçÖç£§ÏÅÖ°Ω…ÑÅï∞ÅçΩπ—…Ω±ÖëΩ»Å…ï—•…ÑÅÕç…•¡–ÅŸï…çï∞π±•ŸîÅÖπ—ïÃÅëîÅÕï…Ÿ•»Å•πç±’ÕºÅµ•ÕµÑÅ…ï±ïÖÕî∏Å=—…ÑÅçÖ’ÕÑËÅèÕë•ùºÅëîÅ—Ω…πïºÅÕï±ïçç•ΩπÖâÑÅÕ—…ïÖ¥ΩÕï±ïççßÕ∏ÅŸ•ï©ÑÅÕ•∏Å%ÅëîÅ…ΩπëÑÏÅÕîÅ±•ùÑÅÑÅ—Ö…©ï—ÑÅÖç—’Ö∞∏ÅIï—ïπçßÕ∏ÅÖπ—ï…•Ω»Å¡Ö…—•ç’±Ö»Åï…ÑÄ≈†Å‰Åç…Ω∏Å…ïç°ÖÈÖâÑÅPËÅçΩπ—…Ω∞ÅëîÅÕï…Ÿ•ëΩ»Ä¨»—†Å‰Å±•µ¡•ïÈÑÅPÅÖ’—ïπ—•çÖëÑ∏ÅΩπ—…Ω∞Å¡…ïŸïπ—•ŸºËÅ—ïÕ–µ—ΩΩ±âÖ»µçÖç°ïêµÕ°ï±∞πµ©Ã∞Å—ïÕ–µ—Ω’…πÖµïπ–µçΩëîµ…Ω’πêµâ•πë•πúπµ©Ã∞Å—ïÕ–µïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏πµ©Ã∞Å—ïÕ–µïŸïπ–µ±•ôïçÂç±îπµ©ÃÅï∏ÅâÖπçºÅΩâ±•ùÖ—Ω…•º∏Å9ºÅçï…—•ô•çÖ»Å•A°ΩπîÅ¡Ω»Å°…Ωµ•’¥∏()…ç°•ŸΩÃÅëîÅïÕ—ÑÅµΩë•ô•çÖçßÕ∏Ë(¥ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµëÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅçΩπ—…Ω∞ÅëîÅH»–∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩAQ%=9}Hƒ–›|…|—|»–πµëÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅçΩπ—…Ω∞ÅëîÅH»–∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµëÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅçΩπ—…Ω∞ÅëîÅH»–∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅçΩπ—…Ω∞ÅëîÅH»–∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ59U1}QIM}Hƒ–›|»πµëÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅçΩπ—…Ω∞ÅëîÅH»–∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ5QI%i}AQ%=9}M=IM}Hƒ–›|…|—|ƒπµëÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅçΩπ—…Ω∞ÅëîÅH»–∏(¥ÅÅ5A}5MQI=}}I!%Y=LπµëÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅçΩπ—…Ω∞ÅëîÅH»–∏(¥ÅÅI=5A}}Q11πµëÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅçΩπ—…Ω∞ÅëîÅH»–∏(¥ÅÅI=5A}=YI10πµëÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅçΩπ—…Ω∞ÅëîÅH»–∏(¥ÅÅÖ¡§Ω}±•àΩïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏π©ÕÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅçΩπ—…Ω∞ÅëîÅH»–∏(¥ÅÅÖ¡§Ω}±•àΩïŸïπ–µ±•ôïçÂç±îπ©ÕÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅçΩπ—…Ω∞ÅëîÅH»–∏(¥ÅÅÖ¡§Ω}±•àΩ¡…•ŸÖ—îµ…Ω’πêµ±•ôïçÂç±îπ©ÕÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅçΩπ—…Ω∞ÅëîÅH»–∏(¥ÅÅÖ¡§ΩÖ¡¿µÖççïÕÃπ©ÕÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅçΩπ—…Ω∞ÅëîÅH»–∏(¥ÅÅÖ¡§ΩïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏π©ÕÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅçΩπ—…Ω∞ÅëîÅH»–∏(¥ÅÅÖ¡§Ω±•Ÿîπ©ÕÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅçΩπ—…Ω∞ÅëîÅH»–∏(¥ÅÅÖ¡§Ω¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅçΩπ—…Ω∞ÅëîÅH»–∏(¥ÅÅÖ’—†µùÖ—îπ©ÕÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅçΩπ—…Ω∞ÅëîÅH»–∏(¥ÅÅïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏µ’§π©ÕÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅçΩπ—…Ω∞ÅëîÅH»–∏(¥ÅÅïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏π°—µ±ÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅçΩπ—…Ω∞ÅëîÅH»–∏(¥ÅÅ•πëï‡µù…’¡Ö∞π°—µ±ÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅçΩπ—…Ω∞ÅëîÅH»–∏(¥ÅÅµ•ëë±ï›Ö…îπ©ÕÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅçΩπ—…Ω∞ÅëîÅH»–∏(¥ÅÅ…ï±ïÖÕîπ©ÕΩπÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅçΩπ—…Ω∞ÅëîÅH»–∏(¥ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅçΩπ—…Ω∞ÅëîÅH»–∏(¥ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅçΩπ—…Ω∞ÅëîÅH»–∏(¥ÅÅÕ°Ω…—ç’—Ãµ’§π©ÕÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅçΩπ—…Ω∞ÅëîÅH»–∏(¥ÅÅ—ïÕ–µïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏πµ©ÕÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅçΩπ—…Ω∞ÅëîÅH»–∏(¥ÅÅ—ïÕ–µïŸïπ–µ±•ôïçÂç±îπµ©ÕÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅçΩπ—…Ω∞ÅëîÅH»–∏(¥ÅÅ—ïÕ–µ±Öàµ¡…•ŸÖ—îµ±•ôïçÂç±îπµ©ÕÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅçΩπ—…Ω∞ÅëîÅH»–∏(¥ÅÅ—ïÕ–µ—ΩΩ±âÖ»µçÖç°ïêµÕ°ï±∞πµ©ÕÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅçΩπ—…Ω∞ÅëîÅH»–∏(¥ÅÅ—ïÕ–µ—Ω’…πÖµïπ–µçΩëîµ…Ω’πêµâ•πë•πúπµ©ÕÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅçΩπ—…Ω∞ÅëîÅH»–∏(((ååÅHƒ–‹∏»∏–∏»–Ä¥ÅÖ±çÖπçîÅô•πÖ∞Åëï∞Å¡…Ω¡•ï—Ö…•º∞Ä»ÅΩç—’â…îÄ»¿»ÿÄƒƒËÃƒÅ’Ö—ïµÖ±Ñ()IHÅQ=I9<Å‰ÅIHÅI=9Å¡ÖÕÖ∏ÅÑÅ5ΩëÖ±•ëÖëïÃ∞ÅÕ•∏Åë’¡±•çÖ…±ΩÃÅëïâÖ©ºÅëï∞Å…ïù•Õ—…º∏Å5$ÅI=9ÅÕîÅ…ï—•…Ñ∏ÅIïù•Õ—…ºÅ±ΩçÖ∞ÅπºÅç…ïÑÅïŸïπ—ºÅπ§ÅèÕë•ùºÅ¡Ω»Åëïôïç—º∏ÅQ=I9<ÄºÅI=9ÅAIQ%U1HÅµ’ïÕ—…Ö∏Åë•…ïç—Ω…•ºÅëîÅπΩµâ…ïÃÅÖç—•ŸΩÃÏÅÕï±ïçç•ΩπÖ»Å…ï≈’•ï…îÅèÕë•ùºÅëï¡Ω…—•ŸºÅçΩ……ïÕ¡Ωπë•ïπ—îÅÖ∞Åµ•ÕµºÅïŸïπ—º∏Å9ºÅïπ—…ïùÖ»ÅÕçΩ…ïÃ∞ÅèÕë•ùºÅπ§Å¡ï…µ•ÕΩÃÅÖëµ•π•Õ—…Ö—•ŸΩÃÅëïÕëîÅë•…ïç—Ω…•º∏ÅOÕ±ºÅç…ïÖëΩ»Åµ’ïÕ—…ÑÅèÕë•ùºÅ¡…Ω¡•º∞Å¡…ïŸ•ÑÅµïµâ…ïœµÑÅëîÅΩ…ùÖπ•ÈÖëΩ»ÅŸÖ±•ëÖëÑ∏ÅA…Ω¡•ï—Ö…•ºÅÖ’—ïπ—•çÖëºÅçΩπÕï…ŸÑÅçΩπ—…Ω∞Å¡±ïπºÅëîÅï±•µ•πÖçßÕ∏Å‰Åïµ•ÕßÕ∏Ω…ïŸΩçÖçßÕ∏ÅëîÅëï±ïùÖç•ΩπïÃÅ±•ùÖëÖÃÅÑÅ’πÑÅ¡ï…ÕΩπÑ∏ÅA…’ïâÑÅë•…•ù•ëÑÅëîÅÕïù’…•ëÖêÅ‰ÅçÖë’ç•ëÖêÅAML∞ÅâÖπçºÅ•π—ïù…Ö∞Å…ï¡ï—•ëºÅ¡Ω»ÅçÖµâ•ΩÃÅëîÅÖ±çÖπçîÏÅπÖŸïùÖëΩ»Ω±•µ¡•ïÈÑΩ¡’â±•çÖçßÕ∏ÅA9%9QL∏()	ÖÕîÅµÖ•∏Ä≈ê–‡ÕÖòÏÅÕç…•¡–ÅYï…çï∞Åù’Ö…ëÖëºÅ‰Å…ï—ïπçßÕ∏ÅÖπ—ï…•Ω»Ä≈†ÅÕΩ∏ÅçÖ’ÕÖÃÅçΩπô•…µÖëÖÃ∞ÅçΩ∏Å…ïù…ïÕ•ΩπïÃÅ¡ï…µÖπïπ—ïÃ∏ÅÖë’ç•ëÖêÅŸ•Õ•â±îÅ—…ÖÃÄ»—†ÅëïÕëîÅ…ïçï¡çßÕ∏ÅçΩµ¡±ï—Ñ∞Åç…Ω∏ÅPÅÖ’—ïπ—•çÖëºÅ°Ω…ÑÅÑÅ°Ω…ÑÅ‰ÅŸÖ±•ëÖçßÕ∏ÅëîÅ±ïç—’…ÖÃΩïÕç…•—’…ÖÃ∏Å9ºÅëïÕ—…’•»ÅÖ’ë•—ΩÀµÑÅπ§ÅÕ•µ’±Ö»Å¡…’ïâÑÅõµÕ•çÑ∏ÅÕ¡ïç•ô•çÖçßÕ∏Å=9QI=1}AI=eQ=}M%IΩAQ%=9}Hƒ–›|…|—|»–πµê∏Å…ç°•ŸΩÃË(¥ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµëÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅïŸ•ëïπç•ÑÅëîÅH»–∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩAQ%=9}Hƒ–›|…|—|»–πµëÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅïŸ•ëïπç•ÑÅëîÅH»–∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµëÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅïŸ•ëïπç•ÑÅëîÅH»–∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅïŸ•ëïπç•ÑÅëîÅH»–∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ59U1}QIM}Hƒ–›|»πµëÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅïŸ•ëïπç•ÑÅëîÅH»–∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=LπµëÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅïŸ•ëïπç•ÑÅëîÅH»–∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ5QI%i}AQ%=9}M=IM}Hƒ–›|…|—|ƒπµëÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅïŸ•ëïπç•ÑÅëîÅH»–∏(¥ÅÅI=5A}}Q11πµëÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅïŸ•ëïπç•ÑÅëîÅH»–∏(¥ÅÅI=5A}=YI10πµëÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅïŸ•ëïπç•ÑÅëîÅH»–∏(¥ÅÅÖ¡§Ω}±•àΩïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏π©ÕÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅïŸ•ëïπç•ÑÅëîÅH»–∏(¥ÅÅÖ¡§Ω}±•àΩïŸïπ–µ±•ôïçÂç±îπ©ÕÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅïŸ•ëïπç•ÑÅëîÅH»–∏(¥ÅÅÖ¡§Ω}±•àΩ¡ï…ÕΩπÖ∞µïŸïπ–µÖççïÕÃπ©ÕÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅïŸ•ëïπç•ÑÅëîÅH»–∏(¥ÅÅÖ¡§Ω}±•àΩ¡…•ŸÖ—îµ…Ω’πêµ±•ôïçÂç±îπ©ÕÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅïŸ•ëïπç•ÑÅëîÅH»–∏(¥ÅÅÖ¡§ΩÖ¡¿µÖççïÕÃπ©ÕÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅïŸ•ëïπç•ÑÅëîÅH»–∏(¥ÅÅÖ¡§ΩïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏π©ÕÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅïŸ•ëïπç•ÑÅëîÅH»–∏(¥ÅÅÖ¡§Ω±•Ÿîπ©ÕÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅïŸ•ëïπç•ÑÅëîÅH»–∏(¥ÅÅÖ¡§Ω¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅïŸ•ëïπç•ÑÅëîÅH»–∏(¥ÅÅÖ’—†µùÖ—îπ©ÕÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅïŸ•ëïπç•ÑÅëîÅH»–∏(¥ÅÅïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏µ’§π©ÕÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅïŸ•ëïπç•ÑÅëîÅH»–∏(¥ÅÅïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏π°—µ±ÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅïŸ•ëïπç•ÑÅëîÅH»–∏(¥ÅÅ•πëï‡µù…’¡Ö∞π°—µ±ÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅïŸ•ëïπç•ÑÅëîÅH»–∏(¥ÅÅ±•ŸîµçΩπ—…Ω∞π©ÕÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅïŸ•ëïπç•ÑÅëîÅH»–∏(¥ÅÅµ•ëë±ï›Ö…îπ©ÕÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅïŸ•ëïπç•ÑÅëîÅH»–∏(¥ÅÅ¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅïŸ•ëïπç•ÑÅëîÅH»–∏(¥ÅÅ…ï±ïÖÕîπ©ÕΩπÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅïŸ•ëïπç•ÑÅëîÅH»–∏(¥ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅïŸ•ëïπç•ÑÅëîÅH»–∏(¥ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅïŸ•ëïπç•ÑÅëîÅH»–∏(¥ÅÅÕ°Ω…—ç’—Ãµ’§π©ÕÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅïŸ•ëïπç•ÑÅëîÅH»–∏(¥ÅÅ—ïÕ–µïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏πµ©ÕÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅïŸ•ëïπç•ÑÅëîÅH»–∏(¥ÅÅ—ïÕ–µïŸïπ–µë•…ïç—Ω…‰µçΩëîπµ©ÕÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅïŸ•ëïπç•ÑÅëîÅH»–∏(¥ÅÅ—ïÕ–µïŸïπ–µ±•ôïçÂç±îπµ©ÕÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅïŸ•ëïπç•ÑÅëîÅH»–∏(¥ÅÅ—ïÕ–µ±Öàµ¡…•ŸÖ—îµ±•ôïçÂç±îπµ©ÕÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅïŸ•ëïπç•ÑÅëîÅH»–∏(¥ÅÅ—ïÕ–µ±Öàµ…ïù•Õ—…Ö—•Ω∏µ¡…•ŸÖ—îµ…Ω’πëÃµïπ—…‰πµ©ÕÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅïŸ•ëïπç•ÑÅëîÅH»–∏(¥ÅÅ—ïÕ–µ—ΩΩ±âÖ»µçÖç°ïêµÕ°ï±∞πµ©ÕÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅïŸ•ëïπç•ÑÅëîÅH»–∏(¥ÅÅ—ïÕ–µ—Ω’…πÖµïπ–µçΩëîµ…Ω’πêµâ•πë•πúπµ©ÕÄÄ¥ÅçÖµâ•ºÅ•πç…ïµïπ—Ö∞Å‰ÅïŸ•ëïπç•ÑÅëîÅH»–∏(((åååÅH»–Ä¥ÉÈ±—•µºÅÖ±çÖπçîÅ‰ÅçΩπ—…Ω∞ÅëîÅ…ïù…ïÕßÕ∏()=…ëï∏ÄƒƒË»‰ËÅ±•Õ—ÑÅëîÅ…ΩπëÖÃΩ—Ω…πïΩÃÅ…ïù•Õ—…ÖëΩÃÅ‰ÅëïÕ¡◊•ÃÅ%9IMÅ0ÅM%<Åëï∞ÅÕï±ïçç•ΩπÖëº∏Å•…ïç—Ω…•ºÅ¡ï…µ•—îÅœÕ±ºÅ•êΩπΩµâ…îΩµΩëÖ±•ëÖêÏÅπºÅ¡ï…µ•—îÅ±ïï»ÅÕçΩ…ïÃÅÕ•∏Åµïµâ…ïœµÑ∏Å9ºÅÕîÅëïâ•±•—ÑÅë•…ïç—Ω…•ºÅ¡…•ŸÖëºÅ°•Õ”Õ…•çºÅπ§Åï∞ÅïÕç…•—Ω»∏ÅOÕ±ºÅï∞Åç…ïÖëΩ»Åµ’ïÕ—…ÑÅèÕë•ùºÅ¡…Ω¡•ºÅ—…ÖÃÅŸï…•ô•çÖ»Åµïµâ…ïœµÑ∏Åï±ïùÖçßÕ∏ÅπΩµ•πÖ—•ŸÑÅπºÅÖ’—Ω…•ÈÑÅÑÅëï±ïùÖ»ÅÑÅΩ—…ΩÃÏÅÕ‘ÅŸïπç•µ•ïπ—ºÅÕîÅÖ©’Õ—ÑÅÖ∞Åç•ï……îÄ¨»—†∏ÅÖë’ç•ëÖêÅ¡…•ŸÖëÑÅ’—•±•ÈÑÅï∞Åµ•ÕµºÅçΩπ—…Ω±ÖëΩ»Å•π—ïù…Ö∞∞ÅÕ•∏ÅïÕç…•—Ω»ÅëîÅï±•µ•πÖçßÕ∏Å¡Ö…Ö±ï±º∏Å∞ÅâÖπçºÅÖπ—ï…•Ω»ÅçΩµ¡±ï—ºÅ¡ÖœÃÏÅÕîÅ…ï¡•—îÅ¡Ω»ÉÈ±—•µºÅÖ±çÖπçî∏ÅQÖâ±ÑÅëîÅÖçï¡—ÖçßÕ∏Å‰ÅïŸ•ëïπç•ÑÅÕîÅçΩπÕï…ŸÖ∏Åï∏Å=9QI=1}AI=eQ=}M%IΩAQ%=9}Hƒ–›|…|—|»–πµê∏Å9ºÅ¡’â±•çÖëºÏÅπÖŸïùÖëΩ»Å‰Å±•µ¡•ïÈÑÅ¡ïπë•ïπ—ïÃ∏(¥ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµëÄÄ¥Åô’ïπ—îÅºÅ…ïù…ïÕßÕ∏ÅŸ•ùïπ—î∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩAQ%=9}Hƒ–›|…|—|»–πµëÄÄ¥Åô’ïπ—îÅºÅ…ïù…ïÕßÕ∏ÅŸ•ùïπ—î∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµëÄÄ¥Åô’ïπ—îÅºÅ…ïù…ïÕßÕ∏ÅŸ•ùïπ—î∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄÄ¥Åô’ïπ—îÅºÅ…ïù…ïÕßÕ∏ÅŸ•ùïπ—î∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ59U1}QIM}Hƒ–›|»πµëÄÄ¥Åô’ïπ—îÅºÅ…ïù…ïÕßÕ∏ÅŸ•ùïπ—î∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=LπµëÄÄ¥Åô’ïπ—îÅºÅ…ïù…ïÕßÕ∏ÅŸ•ùïπ—î∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ5QI%i}AQ%=9}M=IM}Hƒ–›|…|—|ƒπµëÄÄ¥Åô’ïπ—îÅºÅ…ïù…ïÕßÕ∏ÅŸ•ùïπ—î∏(¥ÅÅI=5A}}Q11πµëÄÄ¥Åô’ïπ—îÅºÅ…ïù…ïÕßÕ∏ÅŸ•ùïπ—î∏(¥ÅÅI=5A}=YI10πµëÄÄ¥Åô’ïπ—îÅºÅ…ïù…ïÕßÕ∏ÅŸ•ùïπ—î∏(¥ÅÅÖ¡§Ω}±•àΩïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏π©ÕÄÄ¥Åô’ïπ—îÅºÅ…ïù…ïÕßÕ∏ÅŸ•ùïπ—î∏(¥ÅÅÖ¡§Ω}±•àΩïŸïπ–µ±•ôïçÂç±îπ©ÕÄÄ¥Åô’ïπ—îÅºÅ…ïù…ïÕßÕ∏ÅŸ•ùïπ—î∏(¥ÅÅÖ¡§Ω}±•àΩ¡ï…ÕΩπÖ∞µïŸïπ–µÖççïÕÃπ©ÕÄÄ¥Åô’ïπ—îÅºÅ…ïù…ïÕßÕ∏ÅŸ•ùïπ—î∏(¥ÅÅÖ¡§Ω}±•àΩ¡…•ŸÖ—îµ…Ω’πêµ±•ôïçÂç±îπ©ÕÄÄ¥Åô’ïπ—îÅºÅ…ïù…ïÕßÕ∏ÅŸ•ùïπ—î∏(¥ÅÅÖ¡§ΩÖ¡¿µÖççïÕÃπ©ÕÄÄ¥Åô’ïπ—îÅºÅ…ïù…ïÕßÕ∏ÅŸ•ùïπ—î∏(¥ÅÅÖ¡§ΩïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏π©ÕÄÄ¥Åô’ïπ—îÅºÅ…ïù…ïÕßÕ∏ÅŸ•ùïπ—î∏(¥ÅÅÖ¡§Ω±•Ÿîπ©ÕÄÄ¥Åô’ïπ—îÅºÅ…ïù…ïÕßÕ∏ÅŸ•ùïπ—î∏(¥ÅÅÖ¡§Ω¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄÄ¥Åô’ïπ—îÅºÅ…ïù…ïÕßÕ∏ÅŸ•ùïπ—î∏(¥ÅÅÖ’—†µùÖ—îπ©ÕÄÄ¥Åô’ïπ—îÅºÅ…ïù…ïÕßÕ∏ÅŸ•ùïπ—î∏(¥ÅÅïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏µ’§π©ÕÄÄ¥Åô’ïπ—îÅºÅ…ïù…ïÕßÕ∏ÅŸ•ùïπ—î∏(¥ÅÅïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏π°—µ±ÄÄ¥Åô’ïπ—îÅºÅ…ïù…ïÕßÕ∏ÅŸ•ùïπ—î∏(¥ÅÅ•πëï‡µù…’¡Ö∞π°—µ±ÄÄ¥Åô’ïπ—îÅºÅ…ïù…ïÕßÕ∏ÅŸ•ùïπ—î∏(¥ÅÅ±•ŸîµçΩπ—…Ω∞π©ÕÄÄ¥Åô’ïπ—îÅºÅ…ïù…ïÕßÕ∏ÅŸ•ùïπ—î∏(¥ÅÅµ•ëë±ï›Ö…îπ©ÕÄÄ¥Åô’ïπ—îÅºÅ…ïù…ïÕßÕ∏ÅŸ•ùïπ—î∏(¥ÅÅ¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄÄ¥Åô’ïπ—îÅºÅ…ïù…ïÕßÕ∏ÅŸ•ùïπ—î∏(¥ÅÅ…ï±ïÖÕîπ©ÕΩπÄÄ¥Åô’ïπ—îÅºÅ…ïù…ïÕßÕ∏ÅŸ•ùïπ—î∏(¥ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄÄ¥Åô’ïπ—îÅºÅ…ïù…ïÕßÕ∏ÅŸ•ùïπ—î∏(¥ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄÄ¥Åô’ïπ—îÅºÅ…ïù…ïÕßÕ∏ÅŸ•ùïπ—î∏(¥ÅÅÕ°Ω…—ç’—Ãµ’§π©ÕÄÄ¥Åô’ïπ—îÅºÅ…ïù…ïÕßÕ∏ÅŸ•ùïπ—î∏(¥ÅÅ—ïÕ–µïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏πµ©ÕÄÄ¥Åô’ïπ—îÅºÅ…ïù…ïÕßÕ∏ÅŸ•ùïπ—î∏(¥ÅÅ—ïÕ–µïŸïπ–µë•…ïç—Ω…‰µçΩëîπµ©ÕÄÄ¥Åô’ïπ—îÅºÅ…ïù…ïÕßÕ∏ÅŸ•ùïπ—î∏(¥ÅÅ—ïÕ–µïŸïπ–µ±•ôïçÂç±îπµ©ÕÄÄ¥Åô’ïπ—îÅºÅ…ïù…ïÕßÕ∏ÅŸ•ùïπ—î∏(¥ÅÅ—ïÕ–µ±Öàµ¡…•ŸÖ—îµ±•ôïçÂç±îπµ©ÕÄÄ¥Åô’ïπ—îÅºÅ…ïù…ïÕßÕ∏ÅŸ•ùïπ—î∏(¥ÅÅ—ïÕ–µ±Öàµ…ïù•Õ—…Ö—•Ω∏µ¡…•ŸÖ—îµ…Ω’πëÃµïπ—…‰πµ©ÕÄÄ¥Åô’ïπ—îÅºÅ…ïù…ïÕßÕ∏ÅŸ•ùïπ—î∏(¥ÅÅ—ïÕ–µ±Öàµ—Ω’…πÖµïπ–µπÖŸ•ùÖ—•Ω∏πµ©ÕÄÄ¥Åô’ïπ—îÅºÅ…ïù…ïÕßÕ∏ÅŸ•ùïπ—î∏(¥ÅÅ—ïÕ–µ—ΩΩ±âÖ»µçÖç°ïêµÕ°ï±∞πµ©ÕÄÄ¥Åô’ïπ—îÅºÅ…ïù…ïÕßÕ∏ÅŸ•ùïπ—î∏(¥ÅÅ—ïÕ–µ—Ω’…πÖµïπ–µçΩëîµ…Ω’πêµâ•πë•πúπµ©ÕÄÄ¥Åô’ïπ—îÅºÅ…ïù…ïÕßÕ∏ÅŸ•ùïπ—î∏(((ååÅHƒ–‹∏»∏–∏»–É
‹ÅçΩ…—îÄ»ÅΩç—’â…îÄ»¿»ÿÄƒƒË‘¿Å’Ö—ïµÖ±Ñ()=…ëï∏Å%5|‘ÿÃ»Å‰ÅçΩ……ïçç•ΩπïÃÄƒƒËÃÁäLƒƒË––ËÅ°•Õ—Ω…•Ö∞Å—…ÖÕ±ÖëÖëºÅÖ∞Å5ïªËÏÅ…ï—•…ÖëΩÃÅI=9ÅAIQ%U1HΩQ=I9<ΩQ=I9<ÅQ%Y<ÅëîÅ—Ö…©ï—ÑÏÉÈπ•çÖµïπ—îÅM=ILÅ5$ÅI=9Å‰ÅM=ILÅQ=I9<∏Å5$ÅI=9ÅçΩ……ïÕ¡ΩπëîÅÖ∞ÅïŸïπ—ºÅï∏Å≈’îÅ©’ïùÑÅï∞Å’Õ’Ö…•º∏ÅOÕ±ºÅç…ïÖëΩ»ËÅ%ÅÅ5$ÅI=9∞ÅçΩ¡•ÑÅ‰ÅÖ¡ï…—’…ÑÅ›ÑπµîÅ¡Ω»ÅÖççßÕ∏Åëï∞Å’Õ’Ö…•º∏ÅIïù•Õ—…ºËÅΩ¡ç•ΩπïÃÅëîÅ’π•…ÕîÅ¡Ω»ÅÕï±ïççßÕ∏Å‰ÅèÕë•ùºÅï∏Å5ΩëÖ±•ëÖëïÃ∞ÅÕ•∏Åç…ïÖçßÕ∏ÅÖ’—Ω∑Ö—•çÑ∏Å5ïªËÅQΩ…πïΩÃËÅë•…ïç—Ω…•ºÅçΩµ¡±ï—ºÅŸ•ùïπ—î∞ÅÕï±ïçç•ΩπÖ»Å‰ÅèÕë•ùºÅëîÅÖççïÕºÅ¡Ö…ÑÅ±ïç—’…ÑÅÕ•∏ÅçÖµâ•Ö»ÅÖÕ•ùπÖçßÕ∏Åπ§Å©’ùÖëΩ…ïÃ∏()Ÿ•ëïπç•ÑËÅâÖπçºÅ•π—ïù…Ö∞ÅAMLÏÅ—ïÕ–µïŸïπ–µë•…ïç—Ω…‰µçΩëîÅ¡…’ïâÑÅ±ïç—’…ÑÅŸ•ï›ï»∞Å…ΩÕ—ï»ÅŸÖèµºÅ‰Å…ïç°ÖÈºÅëîÅΩ—…ºÅèÕë•ùºΩïŸïπ—ºÏÅ¡…’ïâÖÃÅπïùÖ—•ŸÖÃÅëîÅèÕë•ùºÅ°ï…ïëÖëº∞Å…ïç’¡ï…ÖçßÕ∏Å‰ÅÖç—’Ö±•ÈÖçßÕ∏ÅµÖπ’Ö∞ÅAML∏Å9ÖŸïùÖëΩ»ÅA…ïŸ•ï‹Ω¡’â±•çÖçßÕ∏Ω±•µ¡•ïÈÑÅ—ΩëÖ€µÑÅA9%9QL∏ÅIïÕ¡Ö±ëΩÃÅ9ïΩ∏Å±•Õ—ΩÃËÅ1Åâ»µÕΩô–µô…ΩúµÖŸ’ï©Ââ¿ÏÅA…Ωë’ççßÕ∏Åâ»µ—•π‰µµÖ—†µÖŸ¡‘·Âô¨∏Å•–Å1$Å¡’Õ†Åâ±Ω≈’ïÖëºÅÕ•∏Åç…ïëïπç•Ö±ïÃÏÅçΩπïç—Ω»Å•—!’àÅç…ïÖ—ï}â±ΩàÅçΩπô•…µÖëº∏()…ç°•ŸΩÃÅÖôïç—ÖëΩÃÅï∏ÅïÕ—ÑÅŸï…ÕßÕ∏Ë(¥ÅÅ=9QI=1}AI=eQ=}M%IΩAQ%=9}Hƒ–›|…|—|»–πµëÄ(¥ÅÅÖ¡§Ω}±•àΩïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏π©ÕÄ(¥ÅÅÖ¡§Ω}±•àΩïŸïπ–µ±•ôïçÂç±îπ©ÕÄ(¥ÅÅÖ¡§ΩïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏π©ÕÄ(¥ÅÅïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏µ’§π©ÕÄ(¥ÅÅïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏π°—µ±Ä(¥ÅÅ—ïÕ–µïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏πµ©ÕÄ(¥ÅÅ—ïÕ–µïŸïπ–µë•…ïç—Ω…‰µçΩëîπµ©ÕÄ(¥ÅÅ—ïÕ–µïŸïπ–µ±•ôïçÂç±îπµ©ÕÄ(¥ÅÅ—ïÕ–µ—ΩΩ±âÖ»µçÖç°ïêµÕ°ï±∞πµ©ÕÄ(¥ÅÅ—ïÕ–µ—Ω’…πÖµïπ–µçΩëîµ…Ω’πêµâ•πë•πúπµ©ÕÄ(¥ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµëÄ(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµëÄ(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ59U1}QIM}Hƒ–›|»πµëÄ(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=LπµëÄ(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ5QI%i}AQ%=9}M=IM}Hƒ–›|…|—|ƒπµëÄ(¥ÅÅI=5A}}Q11πµëÄ(¥ÅÅI=5A}=YI10πµëÄ(¥ÅÅÖ¡§Ω}±•àΩ¡ï…ÕΩπÖ∞µïŸïπ–µÖççïÕÃπ©ÕÄ(¥ÅÅÖ¡§Ω}±•àΩ¡…•ŸÖ—îµ…Ω’πêµ±•ôïçÂç±îπ©ÕÄ(¥ÅÅÖ¡§ΩÖ¡¿µÖççïÕÃπ©ÕÄ(¥ÅÅÖ¡§Ω±•Ÿîπ©ÕÄ(¥ÅÅÖ¡§Ω¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄ(¥ÅÅÖ’—†µùÖ—îπ©ÕÄ(¥ÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä(¥ÅÅ±•ŸîµçΩπ—…Ω∞π©ÕÄ(¥ÅÅ±•Ÿîµ°’àπ©ÕÄ(¥ÅÅµ•ëë±ï›Ö…îπ©ÕÄ(¥ÅÅ¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄ(¥ÅÅ…ï±ïÖÕîπ©ÕΩπÄ(¥ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄ(¥ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄ(¥ÅÅÕ°Ω…—ç’—Ãµ’§π©ÕÄ(¥ÅÅ—ïÕ–µ±Öàµ¡…•ŸÖ—îµ±•ôïçÂç±îπµ©ÕÄ(¥ÅÅ—ïÕ–µ±Öàµ…ïù•Õ—…Ö—•Ω∏µ¡…•ŸÖ—îµ…Ω’πëÃµïπ—…‰πµ©ÕÄ(¥ÅÅ—ïÕ–µ±Öàµ—Ω’…πÖµïπ–µπÖŸ•ùÖ—•Ω∏πµ©ÕÄ(¥ÅÅ—ïÕ–µ±Öàµ’¡ëÖ—îµ…ïçΩŸï…‰πµ©ÕÄ(¥ÅÅ—ïÕ–µµïπ‘µÕçΩ…ïçÖ…êµ—Ω’…πÖµïπ–µÕÂπåπµ©ÕÄ(¥ÅÅ—ïÕ–µÕçΩ…ïÃµ—Ω’…πÖµïπ–µ…ïçΩŸï…‰πµ©ÕÄ(((ååÅHƒ–‹∏»∏–∏»–É
‹Å=…ùÖπ•ÈÖëΩ»∞ÅΩ…ëï∏ÄƒƒË‘ÃÅ’Ö—ïµÖ±Ñ()5;hÉäHÅ=I9%i=HÉäHÅIHÅQ=I9<∏ÅΩ…µ’±Ö…•ºËÅQ=I9<∞Å1UÅëïÕ¡±ïùÖëºÅΩô•ç•Ö∞∞Å5=1%∞ÅQ=K5LÅëïÕ¡±ïùÖëÖÃ∞Å!ÅÖ’—Ω∑Ö—•çÑÅ’Ö—ïµÖ±Ñ∞ÅI=HÅΩâ±•ùÖ—Ω…•º∏ÅIïÕ’±—ÖëºÅ¡Ö…ÑÅç…ïÖëΩ»ËÅM%<ÅÅQ=I9<ÏÅ—Ö…©ï—ÑÅçΩπÕï…ŸÑÅ%ÅÅ5$ÅI=9∏ÅAï…ô•∞ÅëîÅç…ïÖëΩ»Åï∏ÅçΩπô•ù’…ÖçßÕ∏ÅπºÅÕ’Õ—•—’ÂîÅ•ëïπ—•ëÖêÅÕï…Ÿ•ëΩ»Åπ§ÅçΩπçïëîÅ¡ï…µ•ÕΩÃ∏Å	ÖπçºÅ•π—ïù…Ö∞ÅAMLÏÅ—ïÕ–µΩ…ùÖπ•Èï»µ—Ω’…πÖµïπ–µïπ—…‰πµ©ÃÅá≈Öë•ëº∏ÅA…ïŸ•ï‹ÅçëëÑ»›ÖêËÅπÖŸïùÖëΩ»Å…ïÖ∞Å…ïù•Õ—…ÑÅ©’ùÖëΩ»Å±ΩçÖ∞ÅÕ•∏ÅèÕë•ùºÅÖ’—Ω∑Ö—•çº∞Å—Ö…©ï—ÑÅçΩ∏ÅëΩÃÅMçΩ…ïÃÅîÅ°•Õ—Ω…•Ö∞Åï∏Å5ïªËÅAML∏Éi±—•µºÅôΩ…µ’±Ö…•ºÅ…ï≈’•ï…îÅA…ïŸ•ï‹Åπ’ïŸº∏()…ç°•ŸΩÃËÅÅÕ°Ω…—ç’—Ãµ’§π©ÕÄ∞ÅÅ±•Ÿîµ°’àπ°—µ±Ä∞ÅÅ±•Ÿîµ°’àπ©ÕÄ∞ÅÅ¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄ∞ÅÅÖ¡§Ω¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄ∞ÅÅ—ïÕ–µΩ…ùÖπ•Èï»µ—Ω’…πÖµïπ–µïπ—…‰πµ©ÕÄ∞ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄ∏(((ååÅH»–É
‹ÅçΩπ—…Ω∞Åëïô•π•—•ŸºÅëîÅ…ïù•Õ—…ºÄƒƒË‘‹Å’Ö—ïµÖ±Ñ()9ºÅŸ•πç’±Ö»ÅÖ’—Ω∑Ö—•çÖµïπ—îÅÕï±ïççßÕ∏Å¡ï…ÕΩπÖ∞Å°ï…ïëÖëÑÅÖ∞Å•π•ç•Ö»ÅΩ—…ÑÅ…ΩπëÑ∏ÅOÕ±ºÅ…ïù•Õ—…Ö—•Ωπ¡¡…ΩŸïêÅ—…ÖÃÅ…ïÖêÅÕï…Ÿ•ëΩ»Å‰Å…ΩÕ—ï»Åï·Öç—Öµïπ—îÅÖÕ•ùπÖëºÏÅçΩπÕ’µ•»ÅïÕÑÅÖ’—Ω…•ÈÖçßÕ∏ÅÖ∞ÅïÕ—Öâ±ïçï»Å…Ω’πë%êÅÖç—’Ö∞∏Å%ÅÅ5$ÅI=9ÅÕîÅ…ïô…ïÕçÑÅÖ∞Å•π•ç•Ö»ÏÅ¡Ö…—•ç’±Ö»Åç…ïÖëΩ»ÅçΩπÕï…ŸÑÅèÕë•ùºÅï∏ÅÖ±µÖçïπÖµ•ïπ—ºÅëîÅÕ‘Åç’ïπ—Ñ∏Å—ïÕ–µ—Ω’…πÖµïπ–µçΩëîµ…Ω’πêµâ•πë•πúπµ©ÃÅï©ï…ç•—ÑÅÕï±ïççßÕ∏ÅŸ•ï©Ñ∞Å…ΩÕ—ï»Åë•Õ—•π—ºÅ‰ÅçÖπ©îÅëîÅ…ïù•Õ—…ºÅï·¡≥µç•—º∏Å	ÖπçºÅ•π—ïù…Ö∞Åô•πÖ∞ÅAML∏()…ç°•ŸΩÃËÅÅ—ïÕ–µΩ…ùÖπ•Èï»µ—Ω’…πÖµïπ–µïπ—…‰πµ©ÕÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩAQ%=9}Hƒ–›|…|—|»–πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ59U1}QIM}Hƒ–›|»πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=LπµëÄ∞ÅÅI=5A}}Q11πµëÄ∞ÅÅI=5A}=YI10πµëÄ∞ÅÅÖ¡§Ω¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄ∞ÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅ±•Ÿîµ°’àπ°—µ±Ä∞ÅÅ±•Ÿîµ°’àπ©ÕÄ∞ÅÅ¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄ∞ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄ∞ÅÅÕ°Ω…—ç’—Ãµ’§π©ÕÄ∞ÅÅ—ïÕ–µ—Ω’…πÖµïπ–µçΩëîµ…Ω’πêµâ•πë•πúπµ©ÕÄÏÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄ∏()Ωπ—…Ω∞ÅëîÅ…ïù•Õ—…ºÅÂÑÅ¡ï…ÕΩπÖ∞ËÅ¡ï…ÕΩπÖ±M—Ω…Öùï-ï‰ÅïŸ•—ÑÅë’¡±•çÖ»Å¡…ïô•©ºÅëîÅç’ïπ—ÑÅï∏ÅÅ¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄ∞Å¡…ΩâÖëºÅï∏ÅÅ—ïÕ–µΩ…ùÖπ•Èï»µ—Ω’…πÖµïπ–µïπ—…‰πµ©ÕÄ∏(((ååÅH»–É
‹Å…ïÖπ’ëÖçßÕ∏Ä»ÅΩç—’â…îÄ»¿»ÿ∞Äƒ»ËÃ¿Å’Ö—ïµÖ±Ñ()•—!’àÅµÖ•∏Ä≈ê–‡ÕÖòÅ‰Å…ÖµÑÅH»–ÄÿÃƒ‡‡‡–ÅçΩµ¡…ΩâÖëΩÃ∏ÅA…ïŸ•ï‹Åë¡±|›Qê›Ÿ≠Ã’e!)Ω›a·©	!≈5π’§≈πLÅIdÏÅÖµâΩÃÅëΩµ•π•ΩÃÅô•©ΩÃÅH»Ã∏Å9ºÅ¡…ΩçïÕΩÃÅ…ïç’¡ï…ÖëΩÃËÅ¡ÃÅôÖ±±ÑÅ¡Ω»Å…ïÕ—…•ççßÕ∏ÅëîÅ…’π—•µî∏Å!•Õ—Ω…•Ö∞Åï·—ï…πºÅ%0Å…ï¡…Ωë’ç•ëºÅï∏ÅπÖŸïùÖëΩ»ËÅ°•Õ—Ω…‰ıÕÖŸïêÅπºÅÕîÅçΩπÕ’∑µÑ∏ÅΩ……ïççßÕ∏Å•πç…ïµïπ—Ö∞ÅçΩπÕï…ŸÑÅç’ïπ—ÑΩ…ï—’…πQºÅ‰Åï©ïç’—ÑÅÖççßÕ∏ÅΩô•ç•Ö∞ÅÕÖŸïêΩ¡…ïŸ•Ω’Ã∏Å…’¡ºÅç…ïÖëΩ»ÅëîÅ—Ω…πïºÅŸÖèµºËÅÕï±ïççßÕ∏Åï·¡≥µç•—ÑÅÖÕ•ùπÑÅ…ΩÕ—ï»Åµïë•Öπ—îÅA$ÅÖÕÕ•ù∏ÅÖ’—Ω…•ÈÖëÑÏÅπºÅ…ïù•Õ—…Ö»ÅÖ’—Ω∑Ö—•çÖµïπ—î∏ÅAÖ…—•ç•¡Öπ—îÅΩ…•ù•πÖ∞Å…ïç’¡ï…ÖëºÅï∏ÅÖ±•ÖÃÅH»–∞ÅèÕë•ùºÅëîÅç…ïÖëΩ»ÅΩç’±—ºÏÅ—ïç±ÖëºÅ…ΩÕÃ‘Ω9ï––ÅAML∏ÅMçΩ…ïÃÅ…ïµΩ—ΩÃÅ%0ËÅ¡…•ŸÖ—îÅï·ç±’•ëºÅëîÅçΩππïç—Aïπë•πùIΩ’πëQΩ’…πÖµïπ–ÏÅçΩ……ïççßÕ∏Å•πçΩ…¡Ω…ÑÅÕï±ïççßÕ∏Å¡Ö…—•ç’±Ö»ÅŸÖ±•ëÖëÑÅÖ∞ÅçΩπ—…Ω±ÖëΩ»ÉÈπ•çº∞Å¡’â±•çÖçßÕ∏ÅÖπ—ïÃÅëîÅçΩπÕ’±—Ö»Å‰Å…ï’—•±•ÈÖçßÕ∏ÅëîÅÕ—…ïÖ¥∏ÅIïù…ïÕ•ΩπïÃÅπïùÖ—•ŸÖÃÅAML∏Å9ÖŸïùÖëΩ»ÅÕΩâ…îÅçΩ……ïçç•ΩπïÃ∞Åç…Ω∏Å…ïÖ∞∞Å±•µ¡•ïÈÑÅAI=Å‰Å¡’â±•çÖçßÕ∏ÅA9%9QL∏Å9ºÅçï…—•ô•çÖ»Å•A°ΩπîÅπ§Åç…Ω∏ÅÕ•∏ÅïŸ•ëïπç•Ñ∏()…ç°•ŸΩÃË(¥ÅÅ•πëï‡µù…’¡Ö∞π°—µ±ÄÉ
‹ÅçΩ……ïççßÕ∏∞Å¡…’ïâÑÅºÅïŸ•ëïπç•ÑÅH»–∏(¥ÅÅÕ°Ω…—ç’—Ãµ’§π©ÕÄÉ
‹ÅçΩ……ïççßÕ∏∞Å¡…’ïâÑÅºÅïŸ•ëïπç•ÑÅH»–∏(¥ÅÅ¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄÉ
‹ÅçΩ……ïççßÕ∏∞Å¡…’ïâÑÅºÅïŸ•ëïπç•ÑÅH»–∏(¥ÅÅ±•ŸîµçΩπ—…Ω∞π©ÕÄÉ
‹ÅçΩ……ïççßÕ∏∞Å¡…’ïâÑÅºÅïŸ•ëïπç•ÑÅH»–∏(¥ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄÉ
‹ÅçΩ……ïççßÕ∏∞Å¡…’ïâÑÅºÅïŸ•ëïπç•ÑÅH»–∏(¥ÅÅ—ïÕ–µïŸïπ–µë•…ïç—Ω…‰µçΩëîπµ©ÕÄÉ
‹ÅçΩ……ïççßÕ∏∞Å¡…’ïâÑÅºÅïŸ•ëïπç•ÑÅH»–∏(¥ÅÅ—ïÕ–µ»»–µ°•Õ—Ω…‰µ…Ω’—•πúπµ©ÕÄÉ
‹ÅçΩ……ïççßÕ∏∞Å¡…’ïâÑÅºÅïŸ•ëïπç•ÑÅH»–∏(¥ÅÅ—ïÕ–µ»»–µ¡…•ŸÖ—îµµïµâï»µ¡’â±•Õ†πµ©ÕÄÉ
‹ÅçΩ……ïççßÕ∏∞Å¡…’ïâÑÅºÅïŸ•ëïπç•ÑÅH»–∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩAQ%=9}Hƒ–›|…|—|»–πµëÄÉ
‹ÅçΩ……ïççßÕ∏∞Å¡…’ïâÑÅºÅïŸ•ëïπç•ÑÅH»–∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµëÄÉ
‹ÅçΩ……ïççßÕ∏∞Å¡…’ïâÑÅºÅïŸ•ëïπç•ÑÅH»–∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ5QI%i}AQ%=9}M=IM}Hƒ–›|…|—|ƒπµëÄÉ
‹ÅçΩ……ïççßÕ∏∞Å¡…’ïâÑÅºÅïŸ•ëïπç•ÑÅH»–∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ59U1}QIM}Hƒ–›|»πµëÄÉ
‹ÅçΩ……ïççßÕ∏∞Å¡…’ïâÑÅºÅïŸ•ëïπç•ÑÅH»–∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=LπµëÄÉ
‹ÅçΩ……ïççßÕ∏∞Å¡…’ïâÑÅºÅïŸ•ëïπç•ÑÅH»–∏(¥ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµëÄÉ
‹ÅçΩ……ïççßÕ∏∞Å¡…’ïâÑÅºÅïŸ•ëïπç•ÑÅH»–∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄÉ
‹ÅçΩ……ïççßÕ∏∞Å¡…’ïâÑÅºÅïŸ•ëïπç•ÑÅH»–∏((¥ÅÅ—ïÕ–µ»»–µ¡…•ŸÖ—îµµïµâï»µ¡’â±•Õ†πµ©ÕÄÉ
‹ÅŸ•πç’±ÖçßÕ∏Å¡Ö…—•ç’±Ö»Åï·¡≥µç•—Ñ∞Å¡’â±•çÖçßÕ∏Å…ΩÕÃ‘Ω9ï––∞Å…ï’—•±•ÈÖçßÕ∏Å‰Å…ïç°ÖÈºÅëîÅÕï±ïççßÕ∏ÅŸ•ï©Ñ∏(((åååÅH»–É
‹Åâ±Ω≈’ïºÅëîÅÕï…Ÿ•ç•ΩÃÅçΩµ¡…ΩâÖëºÄƒ»ËÃÃÅ’Ö—ïµÖ±Ñ)A…Ωë’ççßÕ∏ËÅ…ïÕ¡Ö±ëºÅâ»µ—•π‰µµÖ—†µÖŸ¡‘·Âô¨ÅIdÅ‰ÅçΩπ—ïºÅME0ÄƒƒÅ—Ω…πïΩÃÄ¨ƒÅ¡Ö…—•ç’±Ö»ÅÖπ—ïÃÅëï∞ÅçΩ…—î∏ÅA…ï¡Ö…ÖçßÕ∏ÅëîÅ—Öâ±ÑÅëîÅçΩµ¡…ΩâÖπ—ïÃÅ…ïÕ¡ΩπëßÃÅÕ•∏Åï……Ω»ÏÅÕïπ—ïπç•ÑÅëîÅ…ïŸΩçÖçßÕ∏Å•π—ïù…Ö∞Å…ïÕ¡ΩπëßÃÅ!QQ@–¿ƒÅÕ’¡¡±•ïêÅç…ïëïπ—•Ö±ÃÅëºÅπΩ–Å¡ÖÕÃÅÖ’—°ïπ—•çÖ—•Ω∏∏Å1ïç—’…ÑÅ¡ΩÕ—ï…•Ω»ÅçΩπô•…µÑÅµ•ÕµΩÃÄƒ»ÅïŸïπ—ΩÃÅ¡ïπë•ïπ—ïÃÅ‰Åçï…ºÅçΩµ¡…ΩâÖπ—ïÃÅπ’ïŸΩÃ∏Å1•µ¡•ïÈÑÅ9<Åï©ïç’—ÖëÑ∏ÅYï…çï∞ÅÕï——•πùÃÅ…ïë•…•ùîÅÑÅ1Ωù•∏ÏÅI=9}MIPÅ…ïÖ∞Å9<ÅŸï…•ô•çÖëºÏÅçΩπÕ’±—ÑÅ±ΩùÃÅô•±—…ÖëΩÃÅï∏ÉÈ±—•µºÅëï¡±ΩÂµïπ–ÅπºÅïπç’ïπ—…ÑÅï©ïç’çßÕ∏Åç±ïÖπ’¿∏Å9ºÅ¡…ΩµΩŸï»ÅµÖ•∏Åπ§ÅÖµâΩÃÅëΩµ•π•ΩÃÅ°ÖÕ—ÑÅçï……Ö»Å…ïŸ•ÕßÕ∏Å‰ÅïÕ—ΩÃÅâ±Ω≈’ïΩÃ∏Å9ºÅÕîÅ°ÑÅÕΩ±•ç•—ÖëºÅπ’ïŸÑÅÖ’—Ω…•ÈÖçßÕ∏Åëï∞ÅÖ±çÖπçî∏(((åååÅH»–É
‹Å±•µ¡•ïÈÑÅAI=ÅçΩµ¡±ï—ÖëÑÅ‰ÅÖ’ë•—ΩÀµÑÅÖ¡±•çÖâ±î∞Äƒ»ËÃ‘Å’Ö—ïµÖ±Ñ)∞Å•π—ïπ—ºÅ—…ÖπÕÖçç•ΩπÖ∞Å•π•ç•Ö∞ÅÕîÅ…ïŸ•…—ßÃÉµπ—ïù…Öµïπ—îÄ†¿ÅçΩµ¡…ΩâÖπ—ïÃ§Å¡Ω»ÅçΩπÕ—…Ö•π–ÅëîÅùÕç}¡ï…ÕΩπÖ±}ïŸïπ—ÃËÅœÕ±ºÅÖç—•ŸîΩç±ΩÕïê∞Åπ’πçÑÅ…ïŸΩ≠ïê∏ÅΩ……ïççßÕ∏ÅëîÅ±ÑÅÕïπ—ïπç•ÑÅ’ÕÑÅç±ΩÕïêÅï∏Åµïµâ…ïœµÑÅëï∞ÅïŸïπ—ºÅ‰Å…ïŸΩ≠ïêÅï∏Å—Öâ±ÖÃÅëï¡Ω…—•ŸÖÃ∏ÅQ…ÖπÕÖççßÕ∏Å¡ΩÕ—ï…•Ω»ÅAML∞ÄƒƒÅ—Ω…πïΩÃÅ‰ƒÅ¡Ö…—•ç’±Ö»ÏÅçΩπÕ’±—ÑÅ•πëï¡ïπë•ïπ—îÅçΩπô•…µÑÅçï…ºÅÖπ—•ù’ΩÃÅ¡ïπë•ïπ—ïÃ∏ÅΩµ¡…ΩâÖπ—ïÃÅï∏ÅùÕç}ïŸïπ—}ëï±ï—•ΩπÃÅÖç—Ω»ÅΩ›πï»µÖ’—°Ω…•ÈïêµÖùïπ–µÕ≈∞È)Ö•µîµ-•…Õ—îÏÅÕçΩ…ïÃÅçΩπÕï…ŸÖëΩÃÅ‰Å…ïÕ¡Ö±ëºÅId∏Å9ºÅÕîÅ…ï¡•—ßÃÅ±•µ¡•ïÈÑÅ1∏)	ÖπçºÅô’πç•ΩπÖ∞ÅH»–Å‰ÅùÖ—ïÃÅëΩç’µïπ—Ö∞Ω…ΩÖëµÖ¿Ω•πŸïπ—Ö…•ºÅAML∏ÅÖ’ë•–µ¡…Ω©ïç–πµ©ÃÅ°•Õ”Õ…•çºÅ%0Å9=9PÅÖ¡§ΩŸΩ•çîµÕ¡ïïç†π©ÃËÅïπë¡Ω•π–Å…ï—•…ÖëºÅ¡Ω»ÅΩ…ëï∏Åëï∞Å¡…Ω¡•ï—Ö…•ºÄƒ‰ÅÕï¡—•ïµâ…î∞ÅçΩπô•…µÖëºÅ¡Ω»ÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÃÏÅπºÅ…ïÕ—Ö’…Ö»ÅŸΩËÅ…ï—•…ÖëÑÅ¡Ö…ÑÅÕÖ—•ÕôÖçï»ÅÖ’ë•—ΩÀµÑÅXÃ‹‡∏ÅAï…ô•∞ÅÖ¡±•çÖâ±îÅÖç—’Ö∞ËÅâÖπçºÅ•π—ïù…Ö∞Å1ÅŸ•ùïπ—î∞Å¡ï…µ•ÕΩÃΩ¡ï…Õ•Õ—ïπç•ÑΩ—ïç±ÖëºΩπÖŸïùÖçßÕ∏Å‰ÅπÖŸïùÖëΩ»∏Å…Ω∏ÅÕ•ù’îÅ9<ÅYI%%<Å¡Ω…≈’îÅÕïÕßÕ∏ÅYï…çï∞ÅÖ’Õïπ—îÏÅ¡’â±•çÖçßÕ∏ÅëîÅèÕë•ùºÅëîÅ¡…Ωë’ççßÕ∏ÅáÈ∏Å¡ïπë•ïπ—î∏(((åååÅH»–É
‹Å…ïç’¡ï…ÖçßÕ∏ÅëîÅ—Ö…©ï—ÑÅÖÕ•ùπÖëÑÄƒ»Ë–»Å’Ö—ïµÖ±Ñ)A…ïŸ•ï‹Ä»ƒ—âïàƒÅId∏Å9ÖŸïùÖëΩ»Å¡Ö…—•ç•¡Öπ—îÅçΩπÕï…ŸÑÅ…ΩÕÃ‘Ω9ï––Å¡ï…ºÅMçΩ…ïÃÅáÈ∏ÅΩµ•—îÅÕ‘ÅÕ—…ïÖ¥ËÅ¡…’ïâÑÅ%0Å…ïÖ∞ÅπºÅïπç’â•ï…—Ñ∏ÅÖ’ÕÑÅ•πç…ïµïπ—Ö∞Å•ëïπ—•ô•çÖëÑËÅΩ¡ïπÕÕ•ùπïëÖ…êÅ…ïïµ¡±ÖÈÑÅÕï±ïççßÕ∏Å‰ÅΩ¡ïπÕÕ•ùπïëAï…ÕΩπÖ±MçΩ…ïÖ…êÅ…ï—Ω…πÑÅ—ïµ¡…ÖπºÅÕ§ÅÂÑÅçΩ•πç•ëîÅ…ΩπëÑΩù…’¡ºÏÅπºÅô•©ÑÅ…Ω’πë%ê∏ÅΩ……ïççßÕ∏ÅŸÖ±•ëÑÅ…ΩÕ—ï»ÅÕï…Ÿ•ëΩ»Å‰ÅçΩπÕï…ŸÑÅ…Ω’πë%êÅëîÅ±ÑÅ—Ö…©ï—ÑÅÖç—’Ö∞∞ÅÕ•∏Å…ïïµ¡±ÖÈÖ»ÅÕçΩ…ïÃ∏ÅA…’ïâÑÅ—ïÕ–µ»»–µ¡…•ŸÖ—îµµïµâï»µ¡’â±•Õ†πµ©ÃÅá≈ÖëîÅ…ïç’¡ï…ÖçßÕ∏ÅëîÅ—Ö…©ï—ÑÅÂÑÅÖÕ•ùπÖëÑÅ‰ÅAML∏ÅA…ïŸ•ï‹Å‰ÅπÖŸïùÖëΩ»ÅëîÅïÕ—ÑÅçΩ……ïççßÕ∏ÅA9%9QL∏)…ç°•ŸΩÃËÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅ—ïÕ–µ»»–µ¡…•ŸÖ—îµµïµâï»µ¡’â±•Õ†πµ©ÕÄ∞ÅÅI=5A}=YI10πµëÄ∞ÅÅI=5A}}Q11πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩAQ%=9}Hƒ–›|…|—|»–πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ5QI%i}AQ%=9}M=IM}Hƒ–›|…|—|ƒπµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ59U1}QIM}Hƒ–›|»πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=LπµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄ∏(((åååÅH»–É
‹ÅçΩµ¡…ΩâÖçßÕ∏Å…ïÖ∞Å‰ÅÖç—’Ö±•ÈÖçßÕ∏ÅµÖπ’Ö∞∞Ä»¿»ÿ¥ƒ¿¥¿»Äƒ»Ë‘–Å’Ö—ïµÖ±Ñ(¥ÅAMLÅπÖŸïùÖëΩ»Å¡Ö…—•ç•¡Öπ—îÅΩ…•ù•πÖ∞ËÅÕ•∏Å%ΩèÕë•ùºÅëï∞Åç…ïÖëΩ»ÏÅ—ïç±ÖëºÅΩô•ç•Ö∞ÅçΩπÕï…ŸÑÅ°ΩÂºƒÅ…ΩÕÃ‘Ω9ï––ÏÅM=ILÅ5$ÅI=9Åµ’ïÕ—…ÑÅEÅAIQ%%A9QÅH»–Äƒ¿ºƒº‘º–ΩY8∏Å9ïΩ∏ÅçΩπô•…µÑÅÕ—…ïÖ¥Ä…çëëâôëåµÑŸà‹¥–·òÿ¥‰ƒ—î¥‘Ã¿ŸÖôÑ¿–ƒ’êÅï∏ÅïŸïπ—ºÅÑŸâà·àÿÿ¥ƒ¿Ÿò¥–…à¿µà≈âò¥·îƒ‰›åÃ‰»»¿Ã∏Å∞Å•π—ïπ—ºÅÖπ—ï…•Ω»Å’œÃÅÖ¡¡}Ÿï…Õ•Ω∏ÅÖâ…ïŸ•ÖëÑÅ‰Å9<Å…ïô…ïÕèÃÅÕ°ï±∞ËÅï∞ÅŸÖ±Ω»Å€Ö±•ëºÅïÃÅ…ï±ïÖÕîπ©ÕΩ∏ÅçΩµ¡±ï—ºÅ1	=IQ=I%<¥»¿»ÿƒ¿¿»µHƒ–‹∏»∏–∏»–∏(¥ÅAMLÅÖÕ•ùπÖçßÕ∏Åï·¡≥µç•—ÑÅëï∞ÅΩ…ùÖπ•ÈÖëΩ»ËÅïŸïπ—ºÅà‹–¿–‘Ã¿µî¿¿‰¥–¿‘‰¥‰‰ÂòµÑ’åƒ≈çïå…âëÑÅçΩπÕï…ŸÑÅ…Ω±îÅΩ…ùÖπ•Èï»Å‰Å…ΩÕ—ï»ÅEÅ=I9%iHÅI=YIdÅ!@ƒ–ÅΩ	±ÖπçºÅëïÕ¡◊•ÃÅëîÅÕï±ïçç•ΩπÖ»ÅÕ‘Å—Ω…πïºÅï∏Å5ΩëÖ±•ëÖëïÃ∏(¥ÅΩ……ïççßÕ∏Å•πç…ïµïπ—Ö∞Å¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÃËÅ=9Q%9UHÅ0ÅM=IÅIÅëîÅ—Ω…πïºÅŸÖèµºÅëï∞ÅΩ…ùÖπ•ÈÖëΩ»ÅŸ’ï±ŸîÅÖ∞ÅIïù•Õ—…ºÏÅ…ΩÕ—ï»ÅÕ•ù’îÅŸÖèµºÅ°ÖÕ—ÑÅÕï±ïççßÕ∏Åï·¡≥µç•—ÑÅ¡ΩÕ—ï…•Ω»∏Å—ïÕ–µΩ…ùÖπ•Èï»µ—Ω’…πÖµïπ–µïπ—…‰πµ©ÃÅ‰Å¡…•ŸÖ—îÅô±Ω‹ÅAML∏(¥Å=…ëï∏Åëï∞Å¡…Ω¡•ï—Ö…•ºÄƒ»Ë–‰ËÅÖç—’Ö±•ÈÖçßÕ∏ÅëîÅ•πÕ—Ö±Öç•ΩπïÃÅ1ΩAI=ÅœÕ±ºÅµïë•Öπ—îÅÕ‘Å—Ω≈’îÅQU1%iHÏÅπºÅ¡’±ÕÖ»Åπ§ÅôΩ…ÈÖ»ÅÖç—’Ö±•ÈÖçßÕ∏Åï∏ÅÕ‘Å•πÕ—Ö±ÖçßÕ∏∏ÅA’â±•çÖ»ÅŸï…ÕßÕ∏Åë•Õ¡Ωπ•â±îÅπºÅçΩπÕ—•—’ÂîÅçΩπÕïπ—•µ•ïπ—ºÅ¡Ö…ÑÅ•πÕ—Ö±Ö…±Ñ∏(¥ÅΩµ•π•ΩÃÅô•©ΩÃÅ•πÕ¡ïçç•ΩπÖëΩÃËÅÖµâΩÃÅH»Ã∞ÅQU1%i<ÅëïÕ°Öâ•±•—ÖëºÏÅH»–ÅáÈ∏ÅπºÅë•Õ¡Ωπ•â±îÅÖ±≥¥∏Å—ïÕ–µ’¡ëÖ—îµëï±•Ÿï…‰µçΩπ—…Ω∞∞Å—ïÕ–µ±Öàµ’¡ëÖ—îµ…ïçΩŸï…‰∞Å—ïÕ–µ±Öàµô•…Õ–µΩ¡ï∏ÅAMLÅ¡Ö…ÑÅÖµâΩÃÅΩÀµùïπïÃËÅëï—ïççßÕ∏ÅçÖëÑÃ¡ÃÅÕ•∏ÅπÖŸïùÖçßÕ∏∞Åç±•ç¨ÅçΩπÕï…ŸÑÅÕçΩ…ïÃΩ…ïù•Õ—…ºΩÖÕ•ùπÖçßÕ∏∞ÅëïÕçÖ…ùÑÅ¡Ö…ç•Ö∞ÅçΩπÕï…ŸÑÅÕ°ï±∞Å¡…ïŸ•Ñ∏(¥ÅA9%9QLËÅçΩπÕ’±—ÑÅëîÅΩ—…ºÅ—Ω…πïºÅ‰Å…ï—Ω…πºÅçΩπÕï…ŸÖπëºÅÖÕ•ùπÖçßÕ∏ÏÅ°•Õ—Ω…•Ö∞Åï·—ï…•Ω»Åï∏ÅπÖŸïùÖëΩ»ÏÅç…Ω∏ΩçΩπô•ù’…ÖçßÕ∏Å…ïÖ∞Ä°Yï…çï∞Å1Ωù•∏∞ÅπºÅÕïÕßÕ∏§ÏÅ…ï—•…Ö»ÅEÏÅçÖπë•ëÖ—ºÅô•πÖ∞ΩµÖ•∏ΩÖπ—•ù’ÑÅ…ÖµÑÅ1ΩIdÅÖµâΩÃÅëΩµ•π•ΩÃ∏Å9ºÅÖô•…µÖ»Åç…Ω∏ÅΩ¡ï…Ö—•Ÿº∏)…ç°•ŸΩÃËÅ¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©Ã∞Å—ïÕ–µΩ…ùÖπ•Èï»µ—Ω’…πÖµïπ–µïπ—…‰πµ©Ã∞ÅÖµâΩÃÅI=5AL∞ÅµÖ—…•Ë∞ÅçΩπ—•π’•ëÖê∞ÅµÖπ’Ö∞ÅëîÅ—Ö…ïÖÃ∞ÅµÖ¡ÑÅîÅ•πŸïπ—Ö…•º∏(((åååÅH»–É
‹Åç•ï……îÅëîÅ¡…’ïâÖÃÅ•πëï¡ïπë•ïπ—ïÃÅ‰Åâ±Ω≈’ïºÅëîÅÖ’—ïπ—•çÖçßÕ∏∞Äƒ»Ë‘‡Å’Ö—ïµÖ±Ñ)AMLÅπÖŸïùÖëΩ»ËÅ°•Õ—Ω…•Ö∞Å5%LÅI=9LÅUILÅÖâ•ï…—ºÅëïÕëîÅ5;hÅô’ï…ÑÅëîÅ—Ö…©ï—ÑÏÅçΩπÕ’±—ÑÅEÅH»–Å5AQdÅIQ=HÅçΩ∏ÅèÕë•ùºÅŸÖ±•ëÖëºÅΩô…ïçîÅïπï…Ö∞ΩÖ—ïùΩÀµÑΩ5•ÃÅÖŸΩ…•—ΩÃ∞Å…ï—Ω…πºÅçΩπÕï…ŸÑÅEÅAIQ%%A9QÅH»–Å…ΩÕÃ‘Ω9ï––Å‰ÅM=ILÅ5$ÅI=9ÅΩ…•ù•πÖ∞∏Å…ïÖëΩ»Å•π•ç•ÑÅµïë•Öπ—îÅ=,Ω…ïŸ•ÕßÕ∏Ω%9%%HÅI=9∞Å%ÅÅ5$ÅI=9ÅœÕ±ºÅÕ’Âº∞Å—ïç±ÖëºÅΩô•ç•Ö∞Å‰ÅM=ILÅQ=I9<Åµ’ïÕ—…ÑÅ…ΩÕÃ‘Ω9ï––∏)	ÖπçºÅ•π—ïù…Ö∞ÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÃÅAMLÅï·•–¿ÏÅùÖ—ïÃÅ‰ÅÕï±±ºÅÕîÅŸï…•ô•çÖ∏ÅÖπ—ïÃÅëîÅù’Ö…ëÖ»∏ÅEÅ…ï—•…ÖëºÅµïë•Öπ—îÅ—…ÖπÕÖççßÕ∏Å…ïç’¡ï…Öâ±îÅÖ’—Ω…•ÈÖëÑÅï∏Å1ËÅçΩµ¡…ΩâÖπ—ïÃ»‹Ä°—Ω…πïºÅà‹–¿–‘Ã¿§Å‰»‡Ä°¡Ö…—•ç’±Ö»ÅÑŸâà·àÿÿ§∞Äƒ‡Ë‘‡Ë–Õh∞ÅÖç—Ω»ÅΩ›πï»µÖ’—°Ω…•ÈïêµÖùïπ–µÕ≈∞È)Ö•µîµ-•…Õ—î∞ÅëïÕ—•πÖ—Ö…•ºÅ)Ö•µîÅ-•…Õ—î∞ÅµΩ—•ŸºÅEÅçΩµ¡±ï—º∞Å…ïôï…ïπç•ÑÅ…ïÕ¡Ö±ëºÅâ»µÕΩô–µô…ΩúµÖŸ’ï©Ââ¿∏ÅMçΩ…ïÃÅçΩπÕï…ŸÖëΩÃÏÅπºÅ…ï¡ï—•»Å±•µ¡•ïÈÑÅÖπ—ï…•Ω»∏)	1=EU<ÅYï…çï∞ËÅπÖŸïùÖëΩ»Å±Ωù•∏ÏÅÖççïÕºÅÕïù’…ºÅï±ïù•ëºÅ•—!’à∞ÅôΩ…µ’±Ö…•ºÅëïŸ’ï±ŸîÅ%πçΩ……ïç–Å’Õï…πÖµîÅΩ»Å¡ÖÕÕ›Ω…ê∏Å9ºÅÕïÕßÕ∏Å¡ΩÕ•—•ŸÑÏÅI=9}MIPÅ‰Åï©ïç’çßÕ∏Å¡…Ωù…ÖµÖëÑÅáÈ∏Å9<ÅYI%%=L∏Å9ºÅ¡’â±•çÖ»ÅµÖ•∏ΩëΩµ•π•ΩÃÅµ•ïπ—…ÖÃÅùÖ—îÅΩ¡ï…Ö—•ŸºÅ¡ïπë•ïπ—î∏ÅAÀÕ·•µÑÅ•π—ï…ŸïπçßÕ∏Å•πë•Õ¡ïπÕÖâ±îËÅ¡…Ω¡•ï—Ö…•ºÅçΩµ¡±ï—ÑÅÖççïÕºÅµÖπ’Ö∞ÅÕïù’…ºÅÑÅYï…çï∞ÏÅëïÕ¡◊•ÃÅŸï…•ô•çÖ»Åï·•Õ—ïπç•ÑÅ‰ÅÕçΩ¡îÅëîÅI=9}MIPÅÕ•∏Å…ïŸï±Ö»ÅŸÖ±Ω»∞Åç…Ω∏ÄΩÖ¡§ΩÖ¡¿µÖççïÕÃ˝Öç—•Ω∏ıç±ïÖπ’¿Å°Ω…Ö…•º¿Ä®Ä®Ä®Ä®∞ÅïŸ•ëïπç•ÑÅï©ïç’çßÕ∏∏ÅA’â±•çÖçßÕ∏Åë•Õ¡Ωπ•â±îÅëïâïÀÑÅëï©Ö»ÅQU1%iHÅÖ∞Å¡…Ω¡•ï—Ö…•ºÏÅπºÅôΩ…ÈÖ»Å•πÕ—Ö±ÖçßÕ∏Åπ§Åïπ—…ïùÖ»ÅUI0ÅçΩ∏Å’¡ëÖ—ï}ç°ïç¨ΩÖ¡¡}Ÿï…Õ•Ω∏ÅçΩµºÅÕ’Õ—•—’—ºÅëï∞ÅâΩ”Õ∏∏(((åååÅH»–É
‹Å•ëïπ—•ô•çÖëΩ»Åë•Õ—•π—ºÅ¡Ö…ÑÅ¡…ΩâÖ»ÅQU1%iH∞ÄƒÃË¿ƒÅ’Ö—ïµÖ±Ñ)MîÅëï—ïç—ÑÅôÖ±±ºÅëîÅïπ—…ïùÑÅï∏Å¡…ïŸ•ï›ÃËÅë•ôï…ïπ—ïÃÅçΩµµ•—ÃÅçΩ∏Åµ•ÕµºÅ…ï±ïÖÕîÅπºÅΩô…ïèµÖ∏ÅQU1%iHÅÑÅ’πÑÅH»–ÅÂÑÅ•πÕ—Ö±ÖëÑ∏Å%ëïπ—•ô•çÖëΩ»Å•πç…ïµïπ—Ö∞Å1	=IQ=I%<¥»¿»ÿƒ¿¿»µHƒ–‹∏»∏–∏»–µ»Åï∏Å…ï±ïÖÕîπ©ÕΩ∏∞Åµï—ÑÅ•πëï‡µù…’¡Ö∞π°—µ∞Å‰ÅôÖ±±âÖç¨ÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÃÏÅï—•≈’ï—ÑÅŸ•Õ•â±îÅÕ•ù’îÅHƒ–‹∏»∏–∏»–∏ÅM•∏Å¡…ΩµΩŸï»Å•πÕ—Ö±Öç•ΩπïÃÅÖ’—Ω∑Ö—•çÖµïπ—îÏÅŸï…ÕßÕ∏Åë•Õ¡Ωπ•â±îÅÕîÅëïÕç’â…îÅçÖëÑÃ¡ÃÅ‰ÅÕîÅ•πÕ—Ö±ÑÅœÕ±ºÅÖ∞Å—Ω≈’î∏Å	ÖπçºÅ’¡ëÖ—îÅ…ïçΩŸï…‰Ωë•ÕçΩŸï…‰ÅëïâîÅçΩµ¡…ΩâÖ»Å»ÅçΩ∏ÅŸï…ÕßÕ∏Å¡…ïŸ•ÑÅëîÅ±ÑÅµ•ÕµÑÅH»–ÏÅ¡…Ωë’ççßÕ∏ÅÕ•ù’îÅH»ÃÅµ•ïπ—…ÖÃÅç…Ω∏ÅπºÅŸï…•ô•çÖëº∏Å…ç°•ŸΩÃÅ•πëï‡µù…’¡Ö∞π°—µ∞∞ÅÕï…Ÿ•çîµ›Ω…≠ï»π©Ã∞Å…ï±ïÖÕîπ©ÕΩ∏Å‰ÅçΩπ—…Ω±ïÃΩëΩç’µïπ—ÖçßÕ∏Ω•πŸïπ—Ö…•º∏()A…’ïâÑÅ•πç…ïµïπ—Ö∞ÅÅ—ïÕ–µ’¡ëÖ—îµëï±•Ÿï…‰µçΩπ—…Ω∞πµ©ÕÄËÅµ•ÕµÑÅH»–ÅçΩ∏Å•ëïπ—•ô•çÖëΩ»Å»ÅΩô…ïçîÅQU1%iHÅÕ•∏ÅπÖŸïùÖ»Å°ÖÕ—ÑÅï∞Å—Ω≈’î∞Åï∏ÅÖµâΩÃÅëΩµ•π•ΩÃ∏(((åååÅH»–É
‹ÅΩ…ëï∏ÅŸ•ùïπ—îÅ‰ÅçΩ……ïççßÕ∏ÅëïÕëîÅµÖ—…•Ë∞ÄƒÃË¿€äLƒÃËƒÃÅ’Ö—ïµÖ±Ñ)=…ëï∏ÅÖπ—ï…•Ω»ÅëîÅç…ïÖçßÕ∏Åï∏Å5ΩëÖ±•ëÖëïÃÅ≈’ïëÑÅÕ’Õ—•—’•ëÑËÅ5;hÅçΩπ—•ïπîÅIHÅQ=I9<Å‰ÅIHÅI=9ÅAIQ%U1H∏ÅµâΩÃÅùïπï…Ö∏ÅÕ‘Å¡…Ω¡•ºÅèÕë•ùºÅ‰ÅΩô…ïçï∏Å]°Ö—Õ¡¿Å‰Å=A%HÅM%<∏ÅQΩ…πïºÅï·•ùîÅÖ’—Ω…•ÈÖçßÕ∏Å•πë•Ÿ•ë’Ö∞ÅëîÅΩ…ùÖπ•ÈÖëΩ»ÅºÅ¡…Ω¡•ï—Ö…•ºÏÅŸÖ±•ëÖçßÕ∏ÅΩâ±•ùÖ—Ω…•ÑÅï∏Å¡ï…ÕΩπÖ∞µïŸïπ—ÃÅ‰Å±•ŸîÅA$∏ÅIΩπëÑÅ¡Ö…—•ç’±Ö»Åë•Õ¡Ωπ•â±îÅÑÅç’Ö±≈’•ï»Å©’ùÖëΩ»∏ÅA…Ω¡•ï—Ö…•ºÅïµ•—îΩ…ïŸΩçÑÅÖ’—Ω…•ÈÖçßÕ∏ÅëîÅç…ïÖçßÕ∏Å±•ùÖëÑÅÖ∞ÅèÕë•ùºÅ¡ï…ÕΩπÖ∞Åëï∞ÅëïÕ—•πÖ—Ö…•ºÅëïÕëîÅëµ•π•Õ—…ÖçßÕ∏ÏÅèÕë•ùºÅëîÅ’∏ÅÕΩ±ºÅçÖπ©î∞Å°ÖÕ†∞»—†∞ÅÕ•∏ÅôÖç’±—ÖêÅ¡Ö…ÑÅâΩ……Ö»ÅïŸïπ—ΩÃÅÖ©ïπΩÃÅπ§Åëï±ïùÖ»∏)Iï—•…ºÅëîÅAÀÖç—•çÑÅëïÕëîÅµÖ—…•ËÅô’πç•ΩπÖ∞ÅçÖªÕπ•çÑÅ)M=8∞ÅµÖ—…•ËÅïë•—Ω…•Ö∞Å5Ω)M=8Å‰Åô•ç°ÑÅ¡ïπë•ïπ—îÅëîÅµΩëÖ±•ëÖëïÃ∏Å±•µ•πÖëΩÃÅç…ïÖëΩ»Ωïë•—Ω»Ωïπ—…ÖëÑΩ…ïπëï…•ÈÖëΩ»ÅïÕ¡ïèµô•çºÅ‰ÅçÖ√µ—’±ΩÃøµπë•çîΩÖçç•ΩπïÃÅëï∞Å5Öπ’Ö∞∏ÅMïÕ•ΩπïÃÅÖπ—•ù’ÖÃÅëîÅ¡ÀÖç—•çÑÅπºÅÕîÅ…ïç’¡ï…Ö∏ÅçΩµºÅ…ΩπëÖÃÅΩô•ç•Ö±ïÃÏÅÕçΩ…ïÃÅÖπ—•ù’ΩÃÅπºÅÕîÅëïÕ—…’Âï∏∏ÅMîÅµÖπ—•ïπï∏ÅœÕ±ºÅù’Ö…ëÖÃÅëîÅçΩµ¡Ö—•â•±•ëÖêÅ≈’îÅ•µ¡•ëï∏ÅïÕç…•—’…ÖÃΩç•ï……ïÃÅΩô•ç•Ö±ïÃÅëîÅïÕîÅôΩ…µÖ—ºÅ…ï—•…Öëº∏)A…’ïâÖÃÅŸ•ùïπ—ïÃÅÕîÅçΩ……•ùï∏Å¡Ö…ÑÅπºÅ…ï•π—…Ωë’ç•»ÅâΩ—ΩπïÃÅï∏Å5ΩëÖ±•ëÖëïÃÏÅô•·—’…ïÃÅ¡ΩÕ•—•ŸΩÃÅÖ°Ω…ÑÅ…ïç•âï∏ÅÖ’—Ω…•ÈÖçßÕ∏ÅëîÅΩ…ùÖπ•ÈÖëΩ»Åï·¡≥µç•—Ñ∏Å9’ïŸºÅ—ïÕ–ÅëîÅ¡ï…µ•ÕΩÃÅ¡…’ïâÑÅëïπïùÖçßÕ∏Åï∏ÅÖµâΩÃÅïπë¡Ω•π—Ã∞Å¡Ö…—•ç’±Ö»ÅÖâ•ï…—º∞ÅèÕë•ùºÅ•πë•Ÿ•ë’Ö∞ÅëîÅ’∏Å’Õº∞Å…ïŸΩçÖçßÕ∏ΩŸïπç•µ•ïπ—ºÅ‰ÅπºÅëï±ïùÖçßÕ∏∏Å9’ïŸºÅ—ïÕ–ÅëîÅ…ï—•…ºÅçΩµ¡…’ïâÑÅµÖ—…•ËΩµÖπ’Ö∞Ω¡…Ωù…ÖµÑÅ‰Å…ïç’¡ï…ÖçßÕ∏ÅëîÅÕïÕßÕ∏ÅÖπ—•ù’ÑÅÕ•∏ÅëïÕ—…’•»ÅÕçΩ…ïÃ∏ÅÃÅçΩπÕï…ŸÑÅŸï…ÕßÕ∏ÅŸ•Õ•â±îÅHƒ–‹∏»∏–∏»–Å‰Å¡ï…µ•—îÅQU1%iHÅëïÕëîÅH»–Ω»∏Å9•πüÈ∏ÅçÖπë•ëÖ—ºÅ»ÅÕîÅçΩπÕ•ëï…ÑÅô•πÖ∞Å—…ÖÃÅïÕ—ÑÅΩ…ëï∏∏)A9%9QLËÅâÖπçºÅ•π—ïù…Ö∞ÅÃÅ‰ÅπÖŸïùÖëΩ»ÏÅçÖ¡—’…ÖÃÅëîÅ5Öπ’Ö∞ÅçΩ∏Åπ’ïŸÑÅ’â•çÖçßÕ∏ÏÅç…Ω∏ΩçΩπô•ù’…ÖçßÕ∏Å…ïÖ∞ÅYï…çï∞ÅçΩ∏ÅÖççïÕºÅµÖπ’Ö∞Ä°•—!’àÅ…ïç°ÖÎÃÅç…ïëïπç•Ö±ïÃ§ÏÅ¡’â±•çÖçßÕ∏Åô•πÖ∞ÅµÖ•∏ΩëΩµ•πΩÃΩ…ÖµÑÅ1ÅÖπ—•ù’ÑÅ‰Å¡…’ïâÑÅëîÅÖç—’Ö±•ÈÖçßÕ∏Åëï∞Å¡…Ω¡•ï—Ö…•º∏Å9<ÅAU	1%<Åï∏ÅëΩµ•π•ΩÃÅô•©ΩÃ∏()…ç°•ŸΩÃÅëîÅïÕ—ÑÅçΩ……ïççßÕ∏Ë(¥ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩ5QI%i}Q9%}%Q=I%1}59U0π©ÕΩπÄÉ
‹Å…ï—•…º∞ÅπÖŸïùÖçßÕ∏∞Å¡ï…µ•ÕΩÃÅºÅ¡…’ïâÑÅŸ•ùïπ—î∏(¥ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩ5QI%i}Q9%}%Q=I%1}59U0πµëÄÉ
‹Å…ï—•…º∞ÅπÖŸïùÖçßÕ∏∞Å¡ï…µ•ÕΩÃÅºÅ¡…’ïâÑÅŸ•ùïπ—î∏(¥ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩA9}%|¿ƒ›}%!M}5=1%M}AI}AI9HπµëÄÉ
‹Å…ï—•…º∞ÅπÖŸïùÖçßÕ∏∞Å¡ï…µ•ÕΩÃÅºÅ¡…’ïâÑÅŸ•ùïπ—î∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩAQ%=9}Hƒ–›|…|—|»–πµëÄÉ
‹Å…ï—•…º∞ÅπÖŸïùÖçßÕ∏∞Å¡ï…µ•ÕΩÃÅºÅ¡…’ïâÑÅŸ•ùïπ—î∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµëÄÉ
‹Å…ï—•…º∞ÅπÖŸïùÖçßÕ∏∞Å¡ï…µ•ÕΩÃÅºÅ¡…’ïâÑÅŸ•ùïπ—î∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ59U1}QIM}Hƒ–›|»πµëÄÉ
‹Å…ï—•…º∞ÅπÖŸïùÖçßÕ∏∞Å¡ï…µ•ÕΩÃÅºÅ¡…’ïâÑÅŸ•ùïπ—î∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=LπµëÄÉ
‹Å…ï—•…º∞ÅπÖŸïùÖçßÕ∏∞Å¡ï…µ•ÕΩÃÅºÅ¡…’ïâÑÅŸ•ùïπ—î∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ5QI%i}AQ%=9}M=IM}Hƒ–›|…|—|ƒπµëÄÉ
‹Å…ï—•…º∞ÅπÖŸïùÖçßÕ∏∞Å¡ï…µ•ÕΩÃÅºÅ¡…’ïâÑÅŸ•ùïπ—î∏(¥ÅÅÖ¡§ΩïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏π©ÕÄÉ
‹Å…ï—•…º∞ÅπÖŸïùÖçßÕ∏∞Å¡ï…µ•ÕΩÃÅºÅ¡…’ïâÑÅŸ•ùïπ—î∏(¥ÅÅÖ¡§Ω±•Ÿîπ©ÕÄÉ
‹Å…ï—•…º∞ÅπÖŸïùÖçßÕ∏∞Å¡ï…µ•ÕΩÃÅºÅ¡…’ïâÑÅŸ•ùïπ—î∏(¥ÅÅÖ¡§Ω¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄÉ
‹Å…ï—•…º∞ÅπÖŸïùÖçßÕ∏∞Å¡ï…µ•ÕΩÃÅºÅ¡…’ïâÑÅŸ•ùïπ—î∏(¥ÅÅïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏µ’§π©ÕÄÉ
‹Å…ï—•…º∞ÅπÖŸïùÖçßÕ∏∞Å¡ï…µ•ÕΩÃÅºÅ¡…’ïâÑÅŸ•ùïπ—î∏(¥ÅÅïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏π°—µ±ÄÉ
‹Å…ï—•…º∞ÅπÖŸïùÖçßÕ∏∞Å¡ï…µ•ÕΩÃÅºÅ¡…’ïâÑÅŸ•ùïπ—î∏(¥ÅÅ•πëï‡µù…’¡Ö∞π°—µ±ÄÉ
‹Å…ï—•…º∞ÅπÖŸïùÖçßÕ∏∞Å¡ï…µ•ÕΩÃÅºÅ¡…’ïâÑÅŸ•ùïπ—î∏(¥ÅÅ±•Ÿîµ°’àπ©ÕÄÉ
‹Å…ï—•…º∞ÅπÖŸïùÖçßÕ∏∞Å¡ï…µ•ÕΩÃÅºÅ¡…’ïâÑÅŸ•ùïπ—î∏(¥ÅÅµÖπ’Ö∞π°—µ±ÄÉ
‹Å…ï—•…º∞ÅπÖŸïùÖçßÕ∏∞Å¡ï…µ•ÕΩÃÅºÅ¡…’ïâÑÅŸ•ùïπ—î∏(¥ÅÅ¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄÉ
‹Å…ï—•…º∞ÅπÖŸïùÖçßÕ∏∞Å¡ï…µ•ÕΩÃÅºÅ¡…’ïâÑÅŸ•ùïπ—î∏(¥ÅÅ…ï±ïÖÕîπ©ÕΩπÄÉ
‹Å…ï—•…º∞ÅπÖŸïùÖçßÕ∏∞Å¡ï…µ•ÕΩÃÅºÅ¡…’ïâÑÅŸ•ùïπ—î∏(¥ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄÉ
‹Å…ï—•…º∞ÅπÖŸïùÖçßÕ∏∞Å¡ï…µ•ÕΩÃÅºÅ¡…’ïâÑÅŸ•ùïπ—î∏(¥ÅÅÕç…•¡—ÃΩµÖπ’Ö∞µÕç…ïï∏µ¡Ö…•—‰µùÖ—îπµ©ÕÄÉ
‹Å…ï—•…º∞ÅπÖŸïùÖçßÕ∏∞Å¡ï…µ•ÕΩÃÅºÅ¡…’ïâÑÅŸ•ùïπ—î∏(¥ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄÉ
‹Å…ï—•…º∞ÅπÖŸïùÖçßÕ∏∞Å¡ï…µ•ÕΩÃÅºÅ¡…’ïâÑÅŸ•ùïπ—î∏(¥ÅÅÕ°Ω…—ç’—Ãµ’§π©ÕÄÉ
‹Å…ï—•…º∞ÅπÖŸïùÖçßÕ∏∞Å¡ï…µ•ÕΩÃÅºÅ¡…’ïâÑÅŸ•ùïπ—î∏(¥ÅÅ—ïÕ–µïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏πµ©ÕÄÉ
‹Å…ï—•…º∞ÅπÖŸïùÖçßÕ∏∞Å¡ï…µ•ÕΩÃÅºÅ¡…’ïâÑÅŸ•ùïπ—î∏(¥ÅÅ—ïÕ–µïŸïπ–µë•…ïç—Ω…‰µçΩëîπµ©ÕÄÉ
‹Å…ï—•…º∞ÅπÖŸïùÖçßÕ∏∞Å¡ï…µ•ÕΩÃÅºÅ¡…’ïâÑÅŸ•ùïπ—î∏(¥ÅÅ—ïÕ–µ±ÖàµëïŸ•çîµïŸïπ–µ•ëïπ—•—‰πµ©ÕÄÉ
‹Å…ï—•…º∞ÅπÖŸïùÖçßÕ∏∞Å¡ï…µ•ÕΩÃÅºÅ¡…’ïâÑÅŸ•ùïπ—î∏(¥ÅÅ—ïÕ–µ±Öàµù±ΩâÖ∞µΩ¡ï…Ö—•ΩπÖ∞µÖ’ë•–πµ©ÕÄÉ
‹Å…ï—•…º∞ÅπÖŸïùÖçßÕ∏∞Å¡ï…µ•ÕΩÃÅºÅ¡…’ïâÑÅŸ•ùïπ—î∏(¥ÅÅ—ïÕ–µ±Öàµ¡…•ŸÖ—îµ…Ω’πêµÕ°Ö…îµô±Ω‹πµ©ÕÄÉ
‹Å…ï—•…º∞ÅπÖŸïùÖçßÕ∏∞Å¡ï…µ•ÕΩÃÅºÅ¡…’ïâÑÅŸ•ùïπ—î∏(¥ÅÅ—ïÕ–µ±Öàµ…ïù•Õ—…Ö—•Ω∏µ¡…•ŸÖ—îµ…Ω’πëÃµïπ—…‰πµ©ÕÄÉ
‹Å…ï—•…º∞ÅπÖŸïùÖçßÕ∏∞Å¡ï…µ•ÕΩÃÅºÅ¡…’ïâÑÅŸ•ùïπ—î∏(¥ÅÅ—ïÕ–µ±Öàµ…ïù•Õ—…Ö—•Ω∏µ…ï—’…∏µÕ—Ö—îπµ©ÕÄÉ
‹Å…ï—•…º∞ÅπÖŸïùÖçßÕ∏∞Å¡ï…µ•ÕΩÃÅºÅ¡…’ïâÑÅŸ•ùïπ—î∏(¥ÅÅ—ïÕ–µ±ÖàµÕ°Ω…—ç’—ÃµπÖŸ•ùÖ—•Ω∏πµ©ÕÄÉ
‹Å…ï—•…º∞ÅπÖŸïùÖçßÕ∏∞Å¡ï…µ•ÕΩÃÅºÅ¡…’ïâÑÅŸ•ùïπ—î∏(¥ÅÅ—ïÕ–µ±Öàµ—Ω’…πÖµïπ–µπÖŸ•ùÖ—•Ω∏πµ©ÕÄÉ
‹Å…ï—•…º∞ÅπÖŸïùÖçßÕ∏∞Å¡ï…µ•ÕΩÃÅºÅ¡…’ïâÑÅŸ•ùïπ—î∏(¥ÅÅ—ïÕ–µ±•ŸîµΩôô•ç•Ö∞µô±Ω‹πµ©ÕÄÉ
‹Å…ï—•…º∞ÅπÖŸïùÖçßÕ∏∞Å¡ï…µ•ÕΩÃÅºÅ¡…’ïâÑÅŸ•ùïπ—î∏(¥ÅÅ—ïÕ–µ¡ï…ÕΩπÖ∞µïŸïπ–µ¡ï…µ•ÕÕ•ΩπÃπµ©ÕÄÉ
‹Å…ï—•…º∞ÅπÖŸïùÖçßÕ∏∞Å¡ï…µ•ÕΩÃÅºÅ¡…’ïâÑÅŸ•ùïπ—î∏(¥ÅÅ—ïÕ–µ—Ω’…πÖµïπ–µÖç—•ŸîµçΩëîπµ©ÕÄÉ
‹Å…ï—•…º∞ÅπÖŸïùÖçßÕ∏∞Å¡ï…µ•ÕΩÃÅºÅ¡…’ïâÑÅŸ•ùïπ—î∏(¥ÅÅ—ïÕ–µ’¡ëÖ—îµëï±•Ÿï…‰µçΩπ—…Ω∞πµ©ÕÄÉ
‹Å…ï—•…º∞ÅπÖŸïùÖçßÕ∏∞Å¡ï…µ•ÕΩÃÅºÅ¡…’ïâÑÅŸ•ùïπ—î∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ5QI%i}U9%=91}Hƒ–›|…|—|»–π©ÕΩπÄÉ
‹Å…ï—•…º∞ÅπÖŸïùÖçßÕ∏∞Å¡ï…µ•ÕΩÃÅºÅ¡…’ïâÑÅŸ•ùïπ—î∏(¥ÅÅÖ¡§Ω}±•àΩ—Ω’…πÖµïπ–µΩ…ùÖπ•Èï…Ãπ©ÕÄÉ
‹Å…ï—•…º∞ÅπÖŸïùÖçßÕ∏∞Å¡ï…µ•ÕΩÃÅºÅ¡…’ïâÑÅŸ•ùïπ—î∏(¥ÅÅ—ïÕ–µ»»–µôïÖ—’…îµ…ï—•…ïµïπ–πµ©ÕÄÉ
‹Å…ï—•…º∞ÅπÖŸïùÖçßÕ∏∞Å¡ï…µ•ÕΩÃÅºÅ¡…’ïâÑÅŸ•ùïπ—î∏(¥ÅÅ—ïÕ–µ—Ω’…πÖµïπ–µΩ…ùÖπ•Èï»µ¡ï…µ•ÕÕ•ΩπÃπµ©ÕÄÉ
‹Å…ï—•…º∞ÅπÖŸïùÖçßÕ∏∞Å¡ï…µ•ÕΩÃÅºÅ¡…’ïâÑÅŸ•ùïπ—î∏(¥ÅÅ—ïÕ—ÃΩ°ï±¡ï…ÃΩÄÉ
‹Å…ï—•…º∞ÅπÖŸïùÖçßÕ∏∞Å¡ï…µ•ÕΩÃÅºÅ¡…’ïâÑÅŸ•ùïπ—î∏(¥ÅÅ—ïÕ—ÃΩ°ï±¡ï…ÃΩÖ’—°Ω…•ÈîµΩ…ùÖπ•Èï»πµ©ÕÄÉ
‹Å…ï—•…º∞ÅπÖŸïùÖçßÕ∏∞Å¡ï…µ•ÕΩÃÅºÅ¡…’ïâÑÅŸ•ùïπ—î∏((åååÅ=…ëï∏Åô•πÖ∞Åëï∞Å¡…Ω¡•ï—Ö…•ºÉ
‹Ä»ÅΩç—’â…îÄ»¿»ÿ∞ÄƒÃË»»Å’Ö—ïµÖ±Ñ)A’â±•çÖçßÕ∏ÅÖ’—Ω…•ÈÖëÑÅ•πµïë•Ö—ÑÅëîÅH»–µÃÏÅ•πÕ—Ö±ÖçßÕ∏ÉÈπ•çÖµïπ—îÅÖ∞Å¡’±ÕÖ»ÅQU1%iHÅ¡Ω»Åï∞Å¡…Ω¡•ï—Ö…•º∏ÅIΩπëÖÃÅ¡Ö…—•ç’±Ö…ïÃÅ‰Å—Ω…πïΩÃÅ•πçΩµ¡±ï—ΩÃËÅŸïπç•µ•ïπ—ºÄ»—†Å—…ÖÃÉÈ±—•µºÅÕçΩ…îÅ…ïç•â•ëºÅï∏ÅÕï…Ÿ•ëΩ»ÏÅÕ•∏ÅÕçΩ…ïÃ∞Ä»—†ÅëïÕëîÅç…ïÖçßÕ∏∏ÅŸïπ—ΩÃÅçΩµ¡±ï—ΩÃËÅ¡±ÖÈºÅô•©ºÅ—…ÖÃÅçΩµ¡±ï—Ö»Äƒ‡Å°ΩÂΩÃ∞ÅπºÅ…ï•π•ç•ÖëºÅ¡Ω»ÅçΩ……ïçç•ΩπïÃ∏Å…ïÖëΩ»Åï±•µ•πÑÅ¡…Ω¡•ΩÃÅïŸïπ—ΩÃÏÅ¡…Ω¡•ï—Ö…•ºÅï±•µ•πÑÅç’Ö±≈’•ï…ÑÅçΩ∏ÅçΩµ¡…ΩâÖπ—î∏Å…Ω∏Å¡…Ωù…ÖµÖëºÅÕ•ù’îÅA9%9QÅ¡Ω»ÅÕïÕßÕ∏ÅYï…çï∞ÅπºÅÖ’—ïπ—•çÖëÑËÅπºÅÖô•…µÖ»Åï©ïç’çßÕ∏∏ÅAÖπ—Ö±±ÖÃÅÖπ—ï…•Ω…ïÃÅëï∞ÅµÖπ’Ö∞Å¡ïπë•ïπ—ïÃÅëîÅ…ïπΩŸÖçßÕ∏ÅŸ•Õ’Ö∞∏()H»–µÃÅ…ï—ïπçßÕ∏ËÅÅÖ¡§Ω}±•àΩïŸïπ–µ±•ôïçÂç±îπ©ÕÄ∞ÅÅÖ¡§Ω}±•àΩ¡…•ŸÖ—îµ…Ω’πêµ±•ôïçÂç±îπ©ÕÄ∞ÅÅÖ¡§Ω±•Ÿîπ©ÕÄ∞ÅÅ—ïÕ–µïŸïπ–µ±•ôïçÂç±îπµ©ÕÄ∞ÅÅ—ïÕ–µ±•ŸîµΩôô•ç•Ö∞µô±Ω‹πµ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµ¡…•ŸÖ—îµ±•ôïçÂç±îπµ©ÕÄËÉÈ±—•µºÅÕçΩ…îÅëîÅÕï…Ÿ•ëΩ»ÏÅ°’ï±±ÑÅëîÅÕçΩ…ïÃÅï·ç±’ÂîÅµï—ÖëÖ—ΩÃÅ‰Åë’¡±•çÖëΩÃÏÅïŸïπ—ΩÃÅçΩµ¡±ï—ÖëΩÃÅµÖπ—•ïπï∏Å¡±ÖÈºÅô•©º∏ÅA…’ïâÖÃÅÖ•Õ±ÖëÖÃÅAMLÏÅç…Ω∏Å¡…Ωù…ÖµÖëºÅπºÅçΩµ¡…ΩâÖëº∏((åååÅH»–µ–É
‹Å…ïŸ•ÕßÕ∏ÅõµÕ•çÑÅëï∞ÅµïªËÉ
‹Ä»ÅΩç—’â…îÄ»¿»ÿ)ÃÅçΩµµ•–Ä‘‘¿ŸòÃ‹‡‹≈å…ê‘‹ƒ‹‘‰‰ÿÿ‘‡ÿ·î¿‹ÿ≈Ñÿ‘‘¿‡ƒ»‰Å¡’â±•çÖëºÅIdÅï∏ÅÖµâΩÃÅëΩµ•π•ΩÃÏÅQU1%iHÅçΩµ¡…ΩâÖëºÅÕ•∏Å¡’±ÕÖ…±ºÅï∏Å•πÕ—Ö±Öç•ΩπïÃÅH»Ã∏Å…ïÖçßÕ∏Å¡…•ŸÖëÑÅEÅÃÅ59TÅëïÕëîÅµïªËÅ‰Å=A%HÅM%<ÅAMLÅπÖŸïùÖëΩ»∏Å…ïÖëΩ»Åï±•µ•ªÃÅÕ‘Å…ΩπëÑÅÕ•∏ÅÕçΩ…ïÃÅ‰ÅÕîÅµΩÕ—ÀÃÅçΩµ¡…ΩâÖπ—î∏Å!•Õ—Ω…•Ö∞Åù’Ö…ëÖëºÅ‰Å…ïÕ¡’ïÕ—ÑÅ9<Å!dÅI=9ÅAIY%ÅAML∏ÅIHÅQ=I9<Åï·•ùîÅÖ’—Ω…•ÈÖçßÕ∏Å•πë•Ÿ•ë’Ö∞ÅAMLÅπÖŸïùÖëΩ»∏Å]°Ö—Õ¡¿ÅÖâ…îÅ¡…Ω—ΩçΩ±ºÅâ±Ω≈’ïÖëºÅ¡Ω»ÅπÖŸïùÖëΩ»Åç±Ω’êËÅπºÅ¡…’ïâÑÅõµÕ•çÑÅï∏ÅÖ¡±•çÖçßÕ∏Å∑ÕŸ•∞∏)Ω……ïçç•ΩπïÃÅ¡ΩÕ—ï…•Ω…ïÃÅÑÅ±ÑÅ…ïŸ•ÕßÕ∏ËÅÕ°Ω…—ç’—Ãµ’§π©ÃÅï±•µ•πÑÅëï¡ïπëïπç•ÑÅëîÅΩ¡ïπIΩ’πëQΩ’…πÖµïπ–Å¡Ö…ÑÅçΩπÕ’±—ÖÃÅëï∞ÅµïªËÏÅïπï…Ö∞∞ÅÖ—ïùΩÀµÖÃ∞Å	’ÕçÖ»Å‰ÅÖŸΩ…•—ΩÃÅ±±ïùÖ∏ÅÖ∞Å°’àÅÖ’∏ÅÕ•∏ÅïŸïπ—ºÅÖÕ•ùπÖëºÄ°Öπ—ïÃÅï∞ÅµïπÕÖ©îÅ≈’ïëÖâÑÅï∏Å—Ö…©ï—ÑÅΩç’±—Ñ§∏ÅïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏π°—µ∞Å…ïÕ¡ï—ÑÅ°•ëëï∏Å¡Ö…ÑÅ¡ï…µ•ÕΩÃÅï·ç±’Õ•ŸΩÃÅëï∞Å¡…Ω¡•ï—Ö…•º∏Å—ïÕ–µ±ÖàµÕ°Ω…—ç’—ÃµπÖŸ•ùÖ—•Ω∏πµ©ÃÅï©ïç’—ÑÅÕ•ï—îÅ…’—ÖÃÅ…ïÖ±ïÃÅëï∞Åë•Õ¡Ö—ç°ï»Å‰Å…ïù…ïÕßÕ∏ÅML∏Åπ—…ïùÑÅµÖπ’Ö∞Å–Åë•ôï…ïπç•ÖëÑÅï∏Å…ï±ïÖÕîπ©ÕΩ∏∞Å•πëï‡µù…’¡Ö∞π°—µ∞Å‰ÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÃÏÅπ•πüÈ∏ÅQU1%iHÅëï∞Å¡…Ω¡•ï—Ö…•ºÅ¡’±ÕÖëº∏Å…Ω∏Å…ïÖ∞Å‰Å±Ωù•∏Å¡…Ω¡•ï—Ö…•ºÅÕ•ù’ï∏Å¡ïπë•ïπ—ïÃÅëîÅÖ’—ïπ—•çÖçßÕ∏ÅYï…çï∞ΩÖ¡±•çÖçßÕ∏∏()–ÅÕ•πç…Ωπ•ÈÖçßÕ∏ÅëîÅï±•µ•πÖçßÕ∏ËÅÅÖ¡§Ω}±•àΩïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏π©ÕÄÅç•ï……ÑÅùÕç}¡ï…ÕΩπÖ±}ïŸïπ—ÃÅï∏Å±ÑÅµ•ÕµÑÅΩ¡ï…ÖçßÕ∏ÅÖ”Õµ•çÑÅëîÅ…ïŸΩçÖçßÕ∏Å‰ÅçΩµ¡…ΩâÖπ—îÏÅÅ—ïÕ–µïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏πµ©ÕÄÅŸï…•ô•çÑÅÖµâΩÃÅïÕ—ÖëΩÃ∏ÅEÅÃÅ…ΩπëÑÄ‘‹’à–‘’Ñ¥·ëå–¥–·îÿ¥Âà‹‡µÑ—ê‘‘≈å‰‰›àƒÅ…ï—•…ÖëÑ∞ÅçΩµ¡…ΩâÖπ—îÄ»‰∏()–ÅçΩµ¡•±ÖçßÕ∏Å…ïç°ÖÎÃÅ•π•ç•Ö±µïπ—îÅ±ÑÅ√•…ë•ëÑÅëîÅÕ•πç…Ωπ•ÈÖçßÕ∏ÅëîÅ±ÑÅ—Ö…©ï—ÑÅÖÕ•ùπÖëÑÄ°—ïÕ–µµïπ‘µÕçΩ…ïçÖ…êµ—Ω’…πÖµïπ–µÕÂπåπµ©Ã§∏ÅΩ……ïù•ëºËÅÕ°Ω…—ç’—Ãµ’§π©ÃÅçΩπÕï…ŸÑÅ¡’â±•çÖçßÕ∏ÅΩô•ç•Ö∞Å‰ÅïŸïπ—ºÅëîÅ±ÑÅ—Ö…©ï—ÑÅç’ÖπëºÅ°Ö‰ÅÖççïÕºÏÅÕ§ÅôÖ±—ÑÅÖÕ•ùπÖçßÕ∏Å€Ö±•ëÑ∞ÅπÖŸïùÑÅÖ∞Å°’àÅŸ•Õ•â±îÅçΩ∏Å±ÑÅ•π—ïπçßÕ∏Åïπï…Ö∞ΩÖ—ïùΩÀµÖÃΩ	’ÕçÖ»ΩÖŸΩ…•—ΩÃ∏Å1ÑÅçΩπÕ’±—ÑÅëîÅQ=I9=LÅµÖπ—•ïπîÅë•…ïç—Ω…•ºÅ•πëï¡ïπë•ïπ—î∏Å—ïÕ–µ±ÖàµÕ°Ω…—ç’—ÃµπÖŸ•ùÖ—•Ω∏πµ©ÃÅŸï…•ô•çÑÅï∞ÅôÖ±±âÖç¨ÅÕ•∏ÅÖÕ•ùπÖçßÕ∏Å‰Å—ïÕ–µµïπ‘µÕçΩ…ïçÖ…êµ—Ω’…πÖµïπ–µÕÂπåπµ©ÃÅçΩπÕï…ŸÑÅçΩπ—ï·—ºÅ‰ÅïÕç…•—Ω»∏(((ååÅH»–µ‘É
‹Åç…ïÖçßÕ∏Å‰ÅèÕë•ùºÅëîÅ5§ÅIΩπëÑΩQΩ…πïºÉ
‹Ä»ÅΩç—’â…îÄ»¿»ÿ()’ïπ—îËÅµÖ•∏ÅÄÃ≈å—î‘‘›à‘–Õî¿Ã–ƒ¿Õçïò‘’ëî¿Ÿôôçî‡ƒ‰—ê–‰ÕÄÏÅçÖ¡—’…ÖÃÅ%5|‘ÿ–‡º‘ÿ–‰º‘ÿ‘¿º‘ÿ‘ƒÅ‰ÉÕ…ëïπïÃÄƒ‘Ë»œäLƒ‘Ë»–Å’Ö—ïµÖ±Ñ∏ÅIHÅ5$ÅI=9Å±•â…îÅ¡Ö…ÑÅç’Ö±≈’•ï»Å©’ùÖëΩ»ÏÅIHÅQ=I9<ÅµÖπ—•ïπîÅÖ’—Ω…•ÈÖçßÕ∏Å•πë•Ÿ•ë’Ö∞∏ÅµâΩÃÅµ’ïÕ—…Ö∏ÅèÕë•ùºÅ¡Ö…ÑÅçΩµ¡Ö…—•»Å—…ÖÃÅç…ïÖ»∏Å9ºÅÕîÅµΩë•ô•çÑÅµΩ—Ω»ÅëîÅÕçΩ…ïÃ∞ÅïŸïπ—ΩÃÅï·•Õ—ïπ—ïÃÅπ§Å¡ï…µ•ÕΩÃÅëîÅΩ—…ΩÃÅ’Õ’Ö…•ΩÃ∏()Ö±±ºÅçΩπô•…µÖëºËÅµïªËÅï·•üµÑÅ…ΩÕ—ï»ÅçΩµ¡±ï—ºÅÖπ—ïÃÅëîÅÖâ…•»Åç…ïÖçßÕ∏Å‰Åëï©ÖâÑÅï……Ω»Åï∏ÅIïù•Õ—…ºÅëï—ÀÖÃÅëîÅ±ÑÅπÖŸïùÖçßÕ∏ÏÅ¡…’ïâÑÅπïùÖ—•ŸÑÅëîÅâΩ……ÖëΩ»Å¡Ö…ç•Ö∞ÅÖ°Ω…ÑÅÖâ…îÅç…ïÖçßÕ∏ÅÕ•∏ÅÖÕ•ùπÖ…±ºÅ‰ÅçΩπÕï…ŸÑÅëÖ—ΩÃ∏ÅΩ…µ’±Ö…•ºÅ¡Ö…—•ç’±Ö»ÅçΩπÕï…ŸÖâÑÅçÖµ¡ΩÃΩâΩ”Õ∏Å—…ÖÃÅç…ïÖçßÕ∏ÏÅÖ°Ω…ÑÅ…ïÕ’±—ÖëºÅµ’ïÕ—…ÑÅèÕë•ùº∞ÅçΩ¡•Ñ∞Å]°Ö—Õ¡¿Å‰ÅçΩπ—•π’Ö»∏ÅMîÅá≈ÖëîÅŸÖ±•ëÖçßÕ∏ÅŸ•Õ•â±îÅ¡…ïŸ•Ñ∞ÅïÕ—ÖëºÅç…ïÖπëºÅ‰Åâ±Ω≈’ïºÅëîÅëΩâ±îÅ—Ω≈’î∏ÅQΩ…πïºÅ’ÕÑÅ…ï≈’ïÕ–ÅçΩ∏Å•ëïπ—•ëÖêÅ¡…ï¡Ö…ÖëÑ∞ÅπºÅ…ï•π•ç•Ö±•ÈÑÅ’∏ÅôΩ…µ’±Ö…•ºÅÂÑÅÖâ•ï…—º∞Å•µ¡•ëîÅëΩâ±îÅïπ€µºÅ‰Åµ’ïÕ—…ÑÅèÕë•ùºÅÖ’π≈’îÅÕÂπåÅπºÅïπç’ïπ—…îÅï∞ÅïŸïπ—º∏Å∞ÅπΩµâ…îÅ±±ïπºÅ¡ï…ºÅŸÖ±•ëÖëºÅŸÖèµºÅëîÅ%5|‘ÿ‘ƒÅπºÅ°ÑÅÕ•ëºÅ…ï¡…Ωë’ç•ëºÅï·Öç—Öµïπ—îÅï∏Å•A°ΩπîÏÅπºÅÕîÅëïç±Ö…ÑÅçÖ’ÕÑÅëïô•π•—•ŸÑÅëï∞Åë•Õ¡ΩÕ•—•Ÿº∏()Aï…µ•ÕºÅΩ¡ï…Ö—•ŸºËÅ9ïΩ∏Å1ÅŸï…•ô•èÃÅëïŸ•çîË‰ƒ¡î·ïî–µê¿ƒ‹¥—îƒ‹µà‰‰‡µôå›ïî‡»Ã¿’à‘ÅÕ•∏Åù…Öπ–ÏÅÕîÅïµ•—ßÃÅÖ’—Ω…•ÈÖçßÕ∏Å•πë•Ÿ•ë’Ö∞ÅëîÅ’∏Å’Õº∞Å%Åò·çÖÑ–‡‰µê¿‹‰¥–…Ñ‡¥‡ÃÕÑ¥–Õî·Ñ≈å≈âà–‘∞ÅŸïπçîÄÃÅΩç—’â…îÄ»¿»ÿÄƒ‘Ë»‘Å’Ö—ïµÖ±Ñ∞Å±•ùÖëÑÅœÕ±ºÅÑÅïÕîÅë•Õ¡ΩÕ•—•Ÿº∏Å9ºÅÕîÅ…ïù•Õ—…ÑÅï∞ÅÕïç…ï—ºÅï∏Å…ï¡ΩÕ•—Ω…•º∏ÅAI=ÅπºÅçΩπ—ïªµÑÅïÕÑÅ•ëïπ—•ëÖê∏()A…’ïâÖÃÅë•…•ù•ëÖÃÅAMLËÅπΩµâ…îΩç…ïÖëΩ»ÅçΩπÕï…ŸÖëΩÃ∞ÅâΩ……ÖëΩ»Å•πçΩµ¡±ï—º∞ÅëÖ—ΩÃÅ…ï≈’ï…•ëΩÃ∞ÅëΩâ±îÅ—Ω≈’î∞ÅèÕë•ùºÅÖπ—îÅÕÂπåÅôÖ±±•ëºÅ‰ÅçΩµ¡Ö…—•»ΩçÖπçï±ÖçßÕ∏ΩçΩπ—•π’Ö»∏Å	…Ω›Õï»ÅÕΩâ…îÅ–Åç…óÃÅEÅIHÅ5$ÅI=9Ä»¿»ÿƒ¿¿»ÅÕ•∏Å¡ï…µ•ÕºÅ‰Åïπ—…ïüÃÅèÕë•ùºÏÅπºÅçï…—•ô•çÑÅ‘Åπ§Å•A°Ωπî∏Å	ÖπçºÅ•π—ïù…Ö∞Å‘∞ÅA…ïŸ•ï‹Å‰Åïπ—…ïùÑÅ¡ïπë•ïπ—ïÃÅÖ∞ÅïÕç…•â•»∏ÅI•ïÕùΩÃËÅë’¡±•çÖëΩÃ∞ÅâΩ……ÖëΩ»Å¡ï…ë•ëº∞Å¡ï…µ•ÕΩÃÅÖµ¡±•ÖëΩÃÅ‰ÅèÕë•ùºÅΩµ•—•ëºÏÅçΩπ—…Ω±ïÃÅπïùÖ—•ŸΩÃÅï∏ÅâÖπçº∏ÅIΩ±±âÖç¨ÅëîÅèÕë•ùºÅÑÄÃ≈å—î‘‘‹ÏÅÕ•∏Å…Ω±±âÖç¨ÅëîÅëÖ—ΩÃ∏()…ç°•ŸΩÃÅ…ïù•Õ—…ÖëΩÃÅëïπ—…ºÅëîÅïÕ—ÑÅŸï…ÕßÕ∏Ë(¥ÅÅ•πëï‡µù…’¡Ö∞π°—µ±ÄÉ
‹ÅçΩ……ïççßÕ∏∞Å¡…’ïâÑÅºÅ…ïù•Õ—…ºÅH»–µ‘∏(¥ÅÅ±•Ÿîµ°’àπ©ÕÄÉ
‹ÅçΩ……ïççßÕ∏∞Å¡…’ïâÑÅºÅ…ïù•Õ—…ºÅH»–µ‘∏(¥ÅÅ¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄÉ
‹ÅçΩ……ïççßÕ∏∞Å¡…’ïâÑÅºÅ…ïù•Õ—…ºÅH»–µ‘∏(¥ÅÅÕ°Ω…—ç’—Ãµ’§π©ÕÄÉ
‹ÅçΩ……ïççßÕ∏∞Å¡…’ïâÑÅºÅ…ïù•Õ—…ºÅH»–µ‘∏(¥ÅÅ…ï±ïÖÕîπ©ÕΩπÄÉ
‹ÅçΩ……ïççßÕ∏∞Å¡…’ïâÑÅºÅ…ïù•Õ—…ºÅH»–µ‘∏(¥ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄÉ
‹ÅçΩ……ïççßÕ∏∞Å¡…’ïâÑÅºÅ…ïù•Õ—…ºÅH»–µ‘∏(¥ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄÉ
‹ÅçΩ……ïççßÕ∏∞Å¡…’ïâÑÅºÅ…ïù•Õ—…ºÅH»–µ‘∏(¥ÅÅ—ïÕ–µ±Öàµ¡…•ŸÖ—îµ…Ω’πêµÕ°Ö…îµô±Ω‹πµ©ÕÄÉ
‹ÅçΩ……ïççßÕ∏∞Å¡…’ïâÑÅºÅ…ïù•Õ—…ºÅH»–µ‘∏(¥ÅÅ—ïÕ–µ±Öàµ…ïù•Õ—…Ö—•Ω∏µ¡…•ŸÖ—îµ…Ω’πëÃµïπ—…‰πµ©ÕÄÉ
‹ÅçΩ……ïççßÕ∏∞Å¡…’ïâÑÅºÅ…ïù•Õ—…ºÅH»–µ‘∏(¥ÅÅ—ïÕ–µ±Öàµ…ïù•Õ—…Ö—•Ω∏µ…ï—’…∏µÕ—Ö—îπµ©ÕÄÉ
‹ÅçΩ……ïççßÕ∏∞Å¡…’ïâÑÅºÅ…ïù•Õ—…ºÅH»–µ‘∏(¥ÅÅ—ïÕ–µ»»–µïŸïπ–µç…ïÖ—•Ω∏µôïïëâÖç¨πµ©ÕÄÉ
‹ÅçΩ……ïççßÕ∏∞Å¡…’ïâÑÅºÅ…ïù•Õ—…ºÅH»–µ‘∏(¥ÅÅI=5A}=YI10πµëÄÉ
‹ÅçΩ……ïççßÕ∏∞Å¡…’ïâÑÅºÅ…ïù•Õ—…ºÅH»–µ‘∏(¥ÅÅI=5A}}Q11πµëÄÉ
‹ÅçΩ……ïççßÕ∏∞Å¡…’ïâÑÅºÅ…ïù•Õ—…ºÅH»–µ‘∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩAQ%=9}Hƒ–›|…|—|»–πµëÄÉ
‹ÅçΩ……ïççßÕ∏∞Å¡…’ïâÑÅºÅ…ïù•Õ—…ºÅH»–µ‘∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµëÄÉ
‹ÅçΩ……ïççßÕ∏∞Å¡…’ïâÑÅºÅ…ïù•Õ—…ºÅH»–µ‘∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ59U1}QIM}Hƒ–›|»πµëÄÉ
‹ÅçΩ……ïççßÕ∏∞Å¡…’ïâÑÅºÅ…ïù•Õ—…ºÅH»–µ‘∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=LπµëÄÉ
‹ÅçΩ……ïççßÕ∏∞Å¡…’ïâÑÅºÅ…ïù•Õ—…ºÅH»–µ‘∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ5QI%i}AQ%=9}M=IM}Hƒ–›|…|—|ƒπµëÄÉ
‹ÅçΩ……ïççßÕ∏∞Å¡…’ïâÑÅºÅ…ïù•Õ—…ºÅH»–µ‘∏(¥ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµëÄÉ
‹ÅçΩ……ïççßÕ∏∞Å¡…’ïâÑÅºÅ…ïù•Õ—…ºÅH»–µ‘∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄÉ
‹ÅçΩ……ïççßÕ∏∞Å¡…’ïâÑÅºÅ…ïù•Õ—…ºÅH»–µ‘∏((¥ÅÅ—ïÕ–µ±Öàµ—Ω’…πÖµïπ–µπÖŸ•ùÖ—•Ω∏πµ©ÕÄÉ
‹Åô•·—’…îÅçΩπÕï…ŸÑÅ…ΩÕ—ï»ÅçΩµ¡±ï—ºÅ‰Å’ÕÑÅ°ï±¡ï»ÅŸÖ±•ëÖëºÅ¡Ω»ÅâÖπçºÅ‘∏((åååÅH»–µ‘É
‹ÅçΩ……ïççßÕ∏ÅÖë•ç•ΩπÖ∞ÅëîÅ¡…’ïâÑÅ…ïÖ∞É
‹Ä»¿»ÿ¥ƒ¿¥¿»)A…ïŸ•ï‹ÅÖå‰–≈ÑƒËÅ…ΩπëÑÅç…ïÖëÑÅÕ•∏ÅÖ’—Ω…•ÈÖçßÕ∏∞ÅèÕë•ùºÅ5)EÂa	LÅ‰Å…ïù…ïÕºÅÖ∞Å…ïù•Õ—…º∏Å1ÑÅ¡…’ïâÑÅëï—ïç”ÃÅ√•…ë•ëÑÅëï∞ÅπΩµâ…îÅŸ•Õ•â±îÅÖ∞ÅŸΩ±Ÿï»Å‰Å…ïç°ÖÈºÅëîÅ—Ω…πïºÅ—…ÖÃÅ¡…ïô±•ù°–ÅÖ’—Ω…•ÈÖëº∏ÅMîÅçÖ¡—’…ÑÅï∞Å=4Åëï∞Å…ïù•Õ—…ºÅÖπ—ïÃÅëîÅïŸÖ±’Ö»Åï∞Åù…’¡ºÅ‰ÅÕîÅçΩπÕï…ŸÑÅ±ÑÅ•ëïπ—•ëÖêÅŸÖ±•ëÖëÑÅï∏Å±ÑÅ±±ÖµÖëÑÅ•π—ï…πÑÅÑÅ1•Ÿî∏ÅIïù…ïÕßÕ∏ÅëîÅ•ëïπ—•ëÖêËÅ¡…ΩŸïïëΩ»Åë•Õ—•π—ºÅπºÅ¡’ïëîÅ…ïïµ¡±ÖÈÖ»ÅÖ∞Åë•Õ¡ΩÕ•—•ŸºÅÖ’—ïπ—•çÖëº∏ÅYï…•ô•çÖçßÕ∏ÅëîÅπ’ïŸºÅA…ïŸ•ï‹Å‰Å¡’â±•çÖçßÕ∏Å—ΩëÖ€µÑÅA9%9QLÏÅπºÅÕîÅëïç±Ö…ÑÅ¡…’ïâÑÅëîÅ•A°ΩπîÅπ§ÅëîÅ—ΩëΩÃÅ±ΩÃÅâΩ—ΩπïÃ∏()H»–µ‘É
‹Äƒ‘Ë‘ÃÅ’Ö—ïµÖ±ÑËÅÕïù’πëºÅA…ïŸ•ï‹ÅÖê¡ò‰–‹Å…ï¡…Ωë’©ºÅ√•…ë•ëÑÅëï∞ÅâΩ……ÖëΩ»Å•πçΩµ¡±ï—ºÅÖ∞Å…ïù…ïÕÖ»Å‰Åï……Ω»–¿¿ÅëîÅ—Ω…πïºÅÖ’—Ω…•ÈÖëº∏Å¡ï…Õ•Õ—…Öô—M—Ö—îÅù’Ö…ëÖâÑÅœÕ±ºÅë…Öô—A±ÖÂï…ÃÅçΩµ¡±ï—ΩÃÏÅÖ°Ω…ÑÅù’Ö…ëÑΩ…ïÕ—Ö’…ÑÅµÖπ’Ö±IΩ›ÃÅÕ•∏ÅôÖâ…•çÖ»Å°Öπë•çÖ¿ΩçÖ—ïùΩÀµÑΩµÖ…çÖÃÅπ§ÅÖÕ•ùπÖ…±ΩÃÅÖ∞ÅïŸïπ—º∏Å1ÑÅçΩ¡•ÑÅëîÅ¡ï—•çßÕ∏Å•π—ï…πÑÅÖ°Ω…ÑÅ¡…ïÕï…ŸÑÅµï—°ΩêÅ‰Å°ïÖëï…ÃÅ°ï…ïëÖëΩÃÅëîÅ%πçΩµ•πù5ïÕÕÖùîÅÖëï∑ÖÃÅëîÅ±ÑÅ•ëïπ—•ëÖêÅŸÖ±•ëÖëÑ∏ÅIïù…ïÕßÕ∏Å’ÕÑÅ°ïÖëï…ÃÅ°ï…ïëÖëΩÃÅ‰Å¡…ΩŸïïëΩ»ÅçΩ∏ÅΩ—…ÑÅ•ëïπ—•ëÖê∏ÅA…ïŸ•ï‹Åô•πÖ∞Å¡ïπë•ïπ—îÏÅπºÅ¡…ΩµΩçßÕ∏ÅëîÅ’∏ÅçÖπë•ëÖ—ºÅçΩ∏Å%0∏()=…ëï∏ƒ‘Ë‘–Å’Ö—ïµÖ±ÑËÅ¡Öπ—Ö±±ÑÅ¡…•πç•¡Ö∞Å‰ÅMçΩ…ïÃÅ’ÕÖ∏Å5$ÅIUA<ÄºÅM=ILÅ5$ÅIUA<Ä°%ÅÅ5$ÅIUA<Å‰ÅçΩµ¡Ö…—•»Åù…’¡º§ÏÅIHÅ5$ÅI=9ÅçΩπÕï…ŸÑÅï∞ÅπΩµâ…îÅÕΩ±•ç•—Öëºƒ‘Ëƒ‰∏Å—•≈’ï—ÖÃÅÕ•∏ÅµΩë•ô•çÖ»Å%Ã∞ÅëïÕ—•πΩÃ∞ÅÖÕ•ùπÖç•ΩπïÃÅπ§ÅëÖ—ΩÃ∏()=…ëï∏ƒ‘Ë‘◊äLƒ‘Ë‘ÿÅÕ’Õ—•—’ÂîÅ±ÑÅï·çï¡çßÕ∏ÅÖπ—ï…•Ω»ËÅIHÅ5$ÅIUA<∞Å5$ÅIUA<∞ÅM=ILÅ5$ÅIUA<ÏÅô’πçßÕ∏Å¡Ö…—•ç’±Ö»Å’ÕÑÅù…’¡ºÅï∏ÅôΩ…µ’±Ö…•ΩÃ∞Å…ïÕ’±—ÖëºÅ‰ÅèÕë•ùºÅçΩµ¡Ö…—•ëº∏Å±ÖŸïÃÅ”•çπ•çÖÃÅ‰ÅëÖ—ΩÃÅï·•Õ—ïπ—ïÃÅπºÅçÖµâ•Ö∏∏()=…ëï∏ƒÿË¿‰ËÅM=ILÅ5$ÅIUA<ÅëïâîÅÖâ…•»ƒ‡ÅÕçΩ…ïÃÅÖ∞ÅëΩâ±îÅç±•å∏ÅA…’ïâÑ‡ÿÿÿ‘ƒÿÅëï—ïç”ÃÅâΩ”Õ∏Åâ’ÕçÖπëºÅïŸïπ—ºÅ¡…•ŸÖëºÅëïÕëîÅ—Ö…©ï—ÑÅëîÅ—Ω…πïºÅ‰ÅµïπÕÖ©îÅΩç’±—ºËÅπ’ïŸÑÅŸ•Õ—ÑÅëï∞Åù…’¡ºÅÖç—’Ö∞Å—ΩµÑÅÕπÖ¡Õ°Ω–Åëï∞ÅïÕç…•—Ω»ÅΩô•ç•Ö∞∞ÅçΩπÕï…ŸÑÅÖÕ•ùπÖçßÕ∏Å‰Åïπ±ÖÈÑÅëï—Ö±±îƒ‡Åµïë•Öπ—îÅMMçΩ…ïÕU$πâ•πëIΩ›Ã∏ÅQΩ…πïºÅç…ïÖëºÅ¡Ω»Å=,ÅèÕë•ùºÅÕ—ah‡ÏÅù…’¡ºÅÕ•∏Å¡ï…µ•ÕºÅèÕë•ùºÅML·MEa-ÏÅçΩ¡•Ö»ÅŸï…•ô•çÖëºÅ¡ïùÖπëºÏÅ…ïù…ïÕºÅ¡…ïÕï…ŸÑÅ…ïù•Õ—…ºÅ•πçΩµ¡±ï—ºÅ‰Å—Ö…©ï—ÑÅ…ΩÕÃ‘Ω9ï––∏ÅA…ïŸ•ï‹Åô•πÖ∞ÅëîÅMçΩ…ïÃÅ¡ïπë•ïπ—î∏((åååÅH»–µ‘É
‹ÅŸï…•ô•çÖçßÕ∏Åô•πÖ∞ÅëîÅç…ïÖçßÕ∏Å‰Åëï—Ö±±îÉ
‹Ä»ÅΩç—’â…îÄ»¿»ÿÄƒÿË»¿Å’Ö—ïµÖ±Ñ)=…ëï∏ƒÿËƒÃËÅëΩâ±îÅç±•åΩëΩâ±îÅ—Ω≈’îÅÖâ…îÅ±ΩÃƒ‡Å°ΩÂΩÃÅ¡Ω»Å©’ùÖëΩ»Åï∏Å5§Å…’¡º∞ÅQΩ…πïΩÃ∞Åïπï…Ö∞∞ÅÖŸΩ…•—ΩÃÅ‰ÅÖ—ïùΩÀµÖÃ∏ÅA…ïŸ•ï‹ÅçÑƒ–‘‰–»ÅIdÅë¡±|ÂIHÿÂAôµ≈-ï5•ïç4›Ω—‰Ÿ≈4∏Å9ÖŸïùÖëΩ»Å°…ΩµîÅ…ïÖ∞ËÅIïù•Õ—…ºÅçΩµ¡±ï—ºÅEÅIUA<ƒ‡Å!=e=LΩMïπ•Ω»Ω!@ƒ–Ω	±ÖπçÖÃÉäHÅ=,ÉäHÅ…ïŸ•ÕÖ»ÉäHÅ•π•ç•Ö»ÉäHÅ—ïç±Öëº‘ÉäHÅM=ILÅ5$ÅIUA<ÉäHÅëΩâ±ïç±•åËÅ—Öâ±ÖÃ«äL‰ºƒ√äLƒ‡∞Å…ΩÕÃ‘Ω9ï—º–∞Åç•ï……îÅçΩπÕï…ŸÑÅ—Ö…©ï—Ñ∏Åïπï…Ö∞Åëï∞Å—Ω…πïºÅÕ—ah‡ËÅÖççïÕºÅ¡Ω»ÅèÕë•ùºÅ‰ÅëΩâ±ïç±•åƒ‡ÅAMLÏÅÖ—ïùΩÀµÖMïπ•Ω»ÅëΩâ±ïç±•åƒ‡ÅAMLÏÅôÖŸΩ…•—øäbÉäHÅ5%LÅY=I%Q=LÉäHÅëΩâ±ïç±•åƒ‡ÅAML∏Å…ïÖçßÕ∏Å¡Ö…—•ç’±Ö»ÅÕ•∏Å¡ï…µ•ÕºÅML·MEa-Å‰Å—Ω…πïºÅÖ’—Ω…•ÈÖëºÅÕ—ah‡ÅÂÑÅçΩµ¡…ΩâÖëÖÃÅï∏‡ÿÿÿ‘ƒÿÏÅçΩ¡•ÑÅ¡ïùÖëÑÅ‰ÅçΩπ—•π’•ëÖêÅëï∞ÅâΩ……ÖëΩ»ÅçΩµ¡…ΩâÖëÖÃ∏Å	ÖπçºÅ•π—ïù…Ö∞Åô•πÖ∞Åâ’•±êµµÖπ’Ö∞µ±ÖàÅAML∞ÅÕ•∏ÅçÖµâ•ΩÃÅô’πç•ΩπÖ±ïÃÅ¡ΩÕ—ï…•Ω…ïÃ∏Å9ºÅÕîÅëïç±Ö…ÑÅ¡…’ïâÑÅõµÕ•çÑÅëîÅ•A°Ωπî∞Å]°Ö—Õ¡¿ÅïπŸ•ÖëºÅπ§Å—Ω—Ö±•ëÖêÅëîÅâΩ—ΩπïÃ∏Åç—’Ö±•ÈÖçßÕ∏Åëï∞Åë•Õ¡ΩÕ•—•ŸºÅÕ•ù’îÅµÖπ’Ö∞∏Åπ—…ïùÑÅëîÅïÕ—îÉÖ…âΩ∞ÅÑÅ1ΩA…Ωë’ççßÕ∏ÅÖ’—Ω…•ÈÖëÑÅ¡…ïŸ•Öµïπ—îÏÅïÕ—ÖëºÅëîÅëïÕ¡±•ïù’îÅÕîÅçΩµ¡…ΩâÖÀÑÅ—…ÖÃÅµΩŸï»Å…ïôï…ïπç•ÖÃ∏((åååÅH»–µÿÉ
‹Ä»¿»ÿ¥ƒ¿¥¿»ÄƒÿË»‡Å’Ö—ïµÖ±ÑÉ
‹Å¡…•πç•¡Ö∞Å5$ÅIUA<)%5|‘ÿ‘ÿÅçΩπô•…∑ÃÅï—•≈’ï—ÑÅIUA<ÅAIQ%U1HÅ•πçΩ……ïç—ÑÅï∏Å…ïù•Õ—…Ö—•Ωπ)Ω•πIΩ’πê∏ÅMîÅçΩ……•ùîÅÑÅ5$ÅIUA<ÏÅëïÕ—•πºÅëîÅ•πù…ïÕºÅ¡Ω»ÅèÕë•ùºÅ¡ï…µÖπïçî∏ÅIHÅ5$ÅIUA<Å‰ÅM=ILÅ5$ÅIUA<ÅÂÑÅïÕ—ÖâÖ∏ÅΩ¡ï…Ö—•ŸΩÃ∏Å……Ω»ÅïÕçÖ√ÃÅ¡Ω»ÅŸï…•ô•çÖ»Åç…ïÖçßÕ∏Å‰ÅÕçΩ…ïÃÅÕ•∏Åï·•ù•»ÅπΩµâ…îÅï·Öç—ºÅëîÅµΩëÖ±•ëÖêÏÅ—ïÕ–µ»»–µïŸïπ–µç…ïÖ—•Ω∏µôïïëâÖç¨πµ©ÃÅï·•ùîÅÖ°Ω…ÑÅ5$ÅIUA<Åï∏ÅïÕîÅâΩ”Õ∏∏Å…ç°•ŸΩÃËÅ•πëï‡µù…’¡Ö∞π°—µ∞∞Å—ïÕ–µ»»–µïŸïπ–µç…ïÖ—•Ω∏µôïïëâÖç¨πµ©Ã∞Å…ï±ïÖÕîπ©ÕΩ∏∞ÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÃÏÅÿÅ¡ï…µ•—îÅÖç—’Ö±•ÈÖçßÕ∏ÅµÖπ’Ö∞ÅëïÕ¡◊•ÃÅëîÅ‘∏ÅM•∏ÅçÖµâ•ºÅëîÅµΩ—Ω»∞ÅëÖ—ΩÃÅπ§ÅÖ’—Ω…•ÈÖçßÕ∏∏ÅIΩ±±âÖç¨·Ñ¿’ôêƒ∏()=…ëï∏ƒÿË»‰ËÅôïç°ÑÅÖ’—Ω∑Ö—•çÑÅ’Ö—ïµÖ±Ñ∞ÅÕ•∏ÅçÖ±ïπëÖ…•º∏Å±•Ÿîµ°’àπ°—µ∞Å°’âIΩ’πëÖ—îÅ‰Å¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÃÅ¡ï…ÕΩπÖ±IΩ’πëÖ—îÅ¡ÖÕÖ∏ÅÑÅ—ï·—ºÅ…ïÖëΩπ±‰ÏÅµÖπ—•ïπï∏ÅŸÖ±Ω»ÅÖ’—Ω∑Ö—•çºÅÖç—’Ö∞∏Å9ºÅπ’ïŸÑÅ¡Öπ—Ö±±ÑÅπ§ÅÕï±ïççßÕ∏ÅëîÅôïç°ÑÅÖ∞Åç…ïÖ»∏(((åååÅH»–µ‹É
‹Ä»ÅΩç—’â…îÄ»¿»ÿÉ
‹ÅÖççïÕΩÃÅMçΩ…ïÃÅëï∞ÅµïªË()=…ëï∏Åï·¡…ïÕÑÄƒ‹Ë¿‰Å’Ö—ïµÖ±ÑËÅM=ILÅQ=I9<∞ÅM=ILÅ5$ÅIUA<∞ÅM=ILÅ9I0∞Å5%LÅY=I%Q=LÅ‰ÅM=ILÅQ=K5LÅï∏Åï∞ÅµïªË∏ÅMîÅµÖπ—•ïπï∏ÅëïÕ—•πΩÃÅï·•Õ—ïπ—ïÃÅ‰ÅÕîÅÖù…ïùÑÅÖççïÕºÅÖ∞ÅÕπÖ¡Õ°Ω–ÅΩô•ç•Ö∞Åëï∞Åù…’¡ºÅÖç—’Ö∞ÅëïÕëîÅ—Ö…©ï—ÑÅ‰Å…ï—Ω…πºÅëïÕëîÅ°’à∏Å9ºÅµΩë•ô•çÑÅèÖ±ç’±ΩÃ∞Å¡ï…µ•ÕΩÃÅπ§ÅëÖ—ΩÃ∏ÅÿÅçΩπÕï…ŸÖëºÅçΩµºÅâÖÕîÄ‰·Ñ‡ÿÃƒÏÅ¡’â±•çÖçßÕ∏Å¡ïπë•ïπ—îÅëîÅâÖπçºÅ•π—ïù…Ö∞Å‰ÅπÖŸïùÖëΩ»Å‹∏ÅÿÅπÖŸïùÖëΩ»Å…ïÖ∞ËÅ=,∞Å%9%%HÅI=9∞Åïπ—…ÖëÑ‘∞ÅMçΩ…ïÃÅ5§Å…’¡º∞ÅëΩâ±îÅç±•åÅ‰Åëï—Ö±±îƒ‡Å…ΩÕÃ‘Ω9ï—º–ÅçΩµ¡…ΩâÖëΩÃÏÅπºÅçï…—•ô•çÑÅ•A°Ωπî∏()…ç°•ŸΩÃÅëîÅïÕ—ÑÅŸï…ÕßÕ∏Ë(¥ÅÅ•πëï‡µù…’¡Ö∞π°—µ±ÄÉ
‹ÅµïªËÅMçΩ…ïÃÅ‹∞Å…ïù…ïÕßÕ∏∞Å…ï±ïÖÕîÅºÅçΩπ—…Ω∞ÅçΩ……ïÕ¡Ωπë•ïπ—î∏(¥ÅÅ…ï±ïÖÕîπ©ÕΩπÄÉ
‹ÅµïªËÅMçΩ…ïÃÅ‹∞Å…ïù…ïÕßÕ∏∞Å…ï±ïÖÕîÅºÅçΩπ—…Ω∞ÅçΩ……ïÕ¡Ωπë•ïπ—î∏(¥ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄÉ
‹ÅµïªËÅMçΩ…ïÃÅ‹∞Å…ïù…ïÕßÕ∏∞Å…ï±ïÖÕîÅºÅçΩπ—…Ω∞ÅçΩ……ïÕ¡Ωπë•ïπ—î∏(¥ÅÅÕ°Ω…—ç’—Ãµ’§π©ÕÄÉ
‹ÅµïªËÅMçΩ…ïÃÅ‹∞Å…ïù…ïÕßÕ∏∞Å…ï±ïÖÕîÅºÅçΩπ—…Ω∞ÅçΩ……ïÕ¡Ωπë•ïπ—î∏(¥ÅÅ—ïÕ–µ±Öàµù±ΩâÖ∞µΩ¡ï…Ö—•ΩπÖ∞µÖ’ë•–πµ©ÕÄÉ
‹ÅµïªËÅMçΩ…ïÃÅ‹∞Å…ïù…ïÕßÕ∏∞Å…ï±ïÖÕîÅºÅçΩπ—…Ω∞ÅçΩ……ïÕ¡Ωπë•ïπ—î∏(¥ÅÅ—ïÕ–µ±ÖàµÕ°Ω…—ç’—ÃµπÖŸ•ùÖ—•Ω∏πµ©ÕÄÉ
‹ÅµïªËÅMçΩ…ïÃÅ‹∞Å…ïù…ïÕßÕ∏∞Å…ï±ïÖÕîÅºÅçΩπ—…Ω∞ÅçΩ……ïÕ¡Ωπë•ïπ—î∏(¥ÅÅ—ïÕ–µµïπ‘µÕçΩ…ïçÖ…êµ—Ω’…πÖµïπ–µÕÂπåπµ©ÕÄÉ
‹ÅµïªËÅMçΩ…ïÃÅ‹∞Å…ïù…ïÕßÕ∏∞Å…ï±ïÖÕîÅºÅçΩπ—…Ω∞ÅçΩ……ïÕ¡Ωπë•ïπ—î∏(¥ÅÅI=5A}=YI10πµëÄÉ
‹ÅµïªËÅMçΩ…ïÃÅ‹∞Å…ïù…ïÕßÕ∏∞Å…ï±ïÖÕîÅºÅçΩπ—…Ω∞ÅçΩ……ïÕ¡Ωπë•ïπ—î∏(¥ÅÅI=5A}}Q11πµëÄÉ
‹ÅµïªËÅMçΩ…ïÃÅ‹∞Å…ïù…ïÕßÕ∏∞Å…ï±ïÖÕîÅºÅçΩπ—…Ω∞ÅçΩ……ïÕ¡Ωπë•ïπ—î∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩAQ%=9}Hƒ–›|…|—|»–πµëÄÉ
‹ÅµïªËÅMçΩ…ïÃÅ‹∞Å…ïù…ïÕßÕ∏∞Å…ï±ïÖÕîÅºÅçΩπ—…Ω∞ÅçΩ……ïÕ¡Ωπë•ïπ—î∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµëÄÉ
‹ÅµïªËÅMçΩ…ïÃÅ‹∞Å…ïù…ïÕßÕ∏∞Å…ï±ïÖÕîÅºÅçΩπ—…Ω∞ÅçΩ……ïÕ¡Ωπë•ïπ—î∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=LπµëÄÉ
‹ÅµïªËÅMçΩ…ïÃÅ‹∞Å…ïù…ïÕßÕ∏∞Å…ï±ïÖÕîÅºÅçΩπ—…Ω∞ÅçΩ……ïÕ¡Ωπë•ïπ—î∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄÉ
‹ÅµïªËÅMçΩ…ïÃÅ‹∞Å…ïù…ïÕßÕ∏∞Å…ï±ïÖÕîÅºÅçΩπ—…Ω∞ÅçΩ……ïÕ¡Ωπë•ïπ—î∏((¥ÅÅ—ïÕ–µ±Öàµ»ÿ¿µ¡°ÂÕ•çÖ∞µµÖ—…•‡πµ©ÕÄÉ
‹Åï·•ùîÅ±ΩÃÅç•πçºÅπΩµâ…ïÃÅï·Öç—ΩÃÅëï∞ÅµïªËÅΩ…ëïπÖëΩÃÅ¡Ö…ÑÅ‹∏((¥ÅÅÕç…•¡—ÃΩµÖπ’Ö∞µÕç…ïï∏µ¡Ö…•—‰µùÖ—îπµ©ÕÄÉ
‹ÅçΩπ—…Ω∞ÅëîÅπΩµâ…ïÃÅëï∞ÅµïªËÅÖç—’Ö±•ÈÖëºÅÑÅ±ÑÅΩ…ëï∏Å‹ÏÅ…ïÕ—ºÅëï∞ÅâÖπçºÅçΩπÕï…ŸÖëº∏(((åååÅH»–µ‡É
‹Ä»ÅΩç—’â…îÄ»¿»ÿÄƒ‹Ë»»Å’Ö—ïµÖ±ÑÉ
‹ÅMçΩ…ïÃÅÖù…’¡ÖëΩÃ)=…ëï∏Å∑ÖÃÅ…ïç•ïπ—îËÅ—ΩëΩÃÅ±ΩÃÅMçΩ…ïÃÅ©’π—ΩÃÏÅM=ILÅA=HÅQ=K5Å‰Å5%LÅY=I%Q=L∏ÅMïççßÕ∏ÅM=ILÅï·ç±’Õ•ŸÑÅçΩ∏Åç•πçºÅÖççïÕΩÃÅçΩπ—•ù’ΩÃËÅQ=I9<∞Å5$ÅIUA<∞Å9I0∞ÅA=HÅQ=K5Å‰ÅY=I%Q=L∏Å	’ÕçÖ»Å‰ÅΩ—…ÖÃÅô’πç•ΩπïÃÅô’ï…ÑÅëï∞Åâ±Ω≈’î∏ÅïÕ—•πΩÃÅ‰Å¡ï…µ•ÕΩÃÅÕ•∏ÅçÖµâ•º∏Å‹ÅIdÅÖµâΩÃÅëΩµ•π•ΩÃËÅë¡±}¡AâÕi≈])Ö]-Õ°5ôQ]‡ÕYÂY§ÄºÅë¡±|ÕY9Y≈≠	Ÿ·Q]©9MâΩÕ≈··Aà— ·d∏Å9ÖŸïùÖëΩ»Å…ïÖ∞ÅŸï…•ô•èÃÅç•πçºÅ…’—ÖÃ∞Åëï—Ö±±îƒ‡∞Å…ï—Ω…πº‘º–Å‰ÅQU1%iHÅ¡…ïÕï…ŸÖπëºÅ…ïù•Õ—…º∏Å1Åç…óÃÅEÅ1Å‹Å=%<Å‰ÅëïŸΩ±ŸßÃÅèÕë•ùºÿ—]!	(·I!ÏÅA…ïŸ•ï‹ÅπºÅçΩπô•ù’…ÖëºÅ¡Ö…ÑÅA$Å¡ï…ÕΩπÖ∞∏Å9ºÅÕîÅëïç±Ö…ÑÅ•A°ΩπîÅπ§Å]°Ö—Õ¡¿ÅïπŸ•Öëº∏Å‡Å¡ïπë•ïπ—îÅA…ïŸ•ï‹Å‰Å¡’â±•çÖçßÕ∏∏(¥ÅÅÕ°Ω…—ç’—Ãµ’§π©ÕÄÉ
‹ÅÖù…’¡ÖçßÕ∏∞ÅπΩµâ…î∞Å…ï±ïÖÕî∞Å…ïù…ïÕßÕ∏ÅºÅçΩπ—…Ω∞Å‡∏(¥ÅÅ•πëï‡µù…’¡Ö∞π°—µ±ÄÉ
‹ÅÖù…’¡ÖçßÕ∏∞ÅπΩµâ…î∞Å…ï±ïÖÕî∞Å…ïù…ïÕßÕ∏ÅºÅçΩπ—…Ω∞Å‡∏(¥ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄÉ
‹ÅÖù…’¡ÖçßÕ∏∞ÅπΩµâ…î∞Å…ï±ïÖÕî∞Å…ïù…ïÕßÕ∏ÅºÅçΩπ—…Ω∞Å‡∏(¥ÅÅ…ï±ïÖÕîπ©ÕΩπÄÉ
‹ÅÖù…’¡ÖçßÕ∏∞ÅπΩµâ…î∞Å…ï±ïÖÕî∞Å…ïù…ïÕßÕ∏ÅºÅçΩπ—…Ω∞Å‡∏(¥ÅÅ—ïÕ–µ±ÖàµÕ°Ω…—ç’—ÃµπÖŸ•ùÖ—•Ω∏πµ©ÕÄÉ
‹ÅÖù…’¡ÖçßÕ∏∞ÅπΩµâ…î∞Å…ï±ïÖÕî∞Å…ïù…ïÕßÕ∏ÅºÅçΩπ—…Ω∞Å‡∏(¥ÅÅ—ïÕ–µ±Öàµù±ΩâÖ∞µΩ¡ï…Ö—•ΩπÖ∞µÖ’ë•–πµ©ÕÄÉ
‹ÅÖù…’¡ÖçßÕ∏∞ÅπΩµâ…î∞Å…ï±ïÖÕî∞Å…ïù…ïÕßÕ∏ÅºÅçΩπ—…Ω∞Å‡∏(¥ÅÅ—ïÕ–µ±Öàµ»ÿ¿µ¡°ÂÕ•çÖ∞µµÖ—…•‡πµ©ÕÄÉ
‹ÅÖù…’¡ÖçßÕ∏∞ÅπΩµâ…î∞Å…ï±ïÖÕî∞Å…ïù…ïÕßÕ∏ÅºÅçΩπ—…Ω∞Å‡∏(¥ÅÅÕç…•¡—ÃΩµÖπ’Ö∞µÕç…ïï∏µ¡Ö…•—‰µùÖ—îπµ©ÕÄÉ
‹ÅÖù…’¡ÖçßÕ∏∞ÅπΩµâ…î∞Å…ï±ïÖÕî∞Å…ïù…ïÕßÕ∏ÅºÅçΩπ—…Ω∞Å‡∏(¥ÅÅI=5A}=YI10πµëÄÉ
‹ÅÖù…’¡ÖçßÕ∏∞ÅπΩµâ…î∞Å…ï±ïÖÕî∞Å…ïù…ïÕßÕ∏ÅºÅçΩπ—…Ω∞Å‡∏(¥ÅÅI=5A}}Q11πµëÄÉ
‹ÅÖù…’¡ÖçßÕ∏∞ÅπΩµâ…î∞Å…ï±ïÖÕî∞Å…ïù…ïÕßÕ∏ÅºÅçΩπ—…Ω∞Å‡∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩAQ%=9}Hƒ–›|…|—|»–πµëÄÉ
‹ÅÖù…’¡ÖçßÕ∏∞ÅπΩµâ…î∞Å…ï±ïÖÕî∞Å…ïù…ïÕßÕ∏ÅºÅçΩπ—…Ω∞Å‡∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµëÄÉ
‹ÅÖù…’¡ÖçßÕ∏∞ÅπΩµâ…î∞Å…ï±ïÖÕî∞Å…ïù…ïÕßÕ∏ÅºÅçΩπ—…Ω∞Å‡∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=LπµëÄÉ
‹ÅÖù…’¡ÖçßÕ∏∞ÅπΩµâ…î∞Å…ï±ïÖÕî∞Å…ïù…ïÕßÕ∏ÅºÅçΩπ—…Ω∞Å‡∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄÉ
‹ÅÖù…’¡ÖçßÕ∏∞ÅπΩµâ…î∞Å…ï±ïÖÕî∞Å…ïù…ïÕßÕ∏ÅºÅçΩπ—…Ω∞Å‡∏(((åååÅH»–µ‰É
‹Ä»ÅΩç—’â…îÄ»¿»ÿÉ
‹Å’…ÕΩ»ÅëîÅ°ΩÂº∞Å”µ—’±ΩÃÅô•©ΩÃÅ‰Åï±•µ•πÖçßÕ∏ÅŸ•Õ•â±î)Iï¡Ω…—îÅëï∞Å¡…Ω¡•ï—Ö…•ºÅ%5|‘ÿÿ¿º‘ÿÿƒËÅçΩµïπÎÃÅ°ΩÂºƒ∞Åëï—Ö±±îÅµΩÕ—…ÖâÑ◊äL‡ÏÅπΩµâ…ïÃÅëîÅ—Ω…πïΩÃÅ¡ï…µ•—ï∏ÅÕï±ïççßÕ∏Å•=LÏÅï±•µ•πÖçßÕ∏ÅΩç’±—Ñ∏ÅME0ÅëîÅÕΩ±ºÅ±ïç—’…ÑÅ1Åâ»µÕµÖ±∞µµΩ’ÕîµÖÿ¡ò»—º‰ÅçΩπô•…∑ÃÅÕ—…ïÖ¥ÅëîÅMÖπ—ÑÅï±ô•πÑÅçΩ∏Å°ΩÂΩÃ◊äL‡Åï∏ÅΩ…•ùï∏∞ÅπºÅëïÕ¡±ÖÈÖµ•ïπ—ºÅëîÅ…ïπëï»∏ÅÖ’ÕÑÅ…ï¡…Ωë’ç•ëÑËÅ…Ω’πë5Öπ’Ö±π—…‰Å…ïÕ—Öâ±ïèµÑÅï∞Å°ΩÂºÅŸ•Õ•â±îÅ¡Ö…ÑÅ±ÑÅ…ΩπëÑÅπ’ïŸÑ∞Å¡ï…ºÅçΩπÕï…ŸÖâÑÅÖç—•ŸïA±ÖÂï…%êÅ‰Å…Ω’πëMçΩ…ï-ïÂ¡ÖëM—Ö—îÅëï∞Å°ΩÂºÅ¡…ïŸ•º∏Å‰Å±•µ¡•ÑÅïÕ—ÖëºÅÖ∞ÅçΩπô•…µÖ»Åπ’ïŸÑÅ…ΩπëÑ∞ÅÕ•πç…Ωπ•ÈÑÅç’…ÕΩ»Ω…ïπëï»Å‰Å…ïÕ—Öâ±ïçîƒÅÖ∞ÅâΩ……Ö»ÅÕçΩ…ïÃ∏ÅIïù…ïÕßÕ∏Å¡…ïÿ◊äIπ’ïŸÑƒºƒ¿Å‰Åç’…ÕΩ»ÅëïÕ•πç…Ωπ•ÈÖëºÅAML∏Å9ºÅ…ï•πëï·Ö»Å…ΩπëÖÃÅ€Ö±•ëÖÃÅ≈’îÅçΩµ•ïπçï∏Åï∏ÅΩ—…ºÅ°ΩÂº∏ÅIïç’¡ï…ÖçßÕ∏ÅïÕ¡ïèµô•çÑÅ…ïù•Õ—…ÖëÑÅçΩµºÅÖ’ë•––»Å1ËÅçΩπÕï…ŸÑÅÕπÖ¡Õ°Ω–Éµπ—ïù…ºÅÖπ—ïÃÅëîÅçÖµâ•º∞Å…Ω’πë%êÅï·Öç—ºÅ‰Å…ΩÕÃÅ¡Ω»Å©’ùÖëΩ»∏ÅA$ÅÖ’—ïπ—•çÖëÑÅëïŸ’ï±ŸîÅµÖπ•ô•ïÕ—ºÏÅç±•ïπ—îÅÖ¡±•çÑÅ’πÑÅÕΩ±ÑÅŸïËÄ◊äL„äH«äL–∞Å…ïçÖ±ç’±ÑÅçΩ∏ÅµΩ—Ω»ÅΩô•ç•Ö∞Å‰ÅŸ’ï±ŸîÅÑÅ¡’â±•çÖ»∏ÅIïç°ÖÈÑÅΩ—…ÑÅ…ΩπëÑ∞Å…ΩÕÃÅë•Õ—•π—ºÅºÅëïÕ—•πΩÃÅΩç’¡ÖëΩÃ∏Å9ºÅ°Ö‰Å…ï•πëï·ÖçßÕ∏Åùïª•…•çÑ∏Å¡±•çÖçßÕ∏Å…ïÖ∞Åï∏Åë•Õ¡ΩÕ•—•ŸºÅëï∞Å¡…Ω¡•ï—Ö…•ºÅ¡ïπë•ïπ—îÅëîÅÖç—’Ö±•ÈÖçßÕ∏∏)Sµ—’±ΩÃÅïÕ”Ö—•çΩÃÅëîÅMçΩ…ïÃΩ—Ω…πïΩÃÅ‰ÅëïÕçïπë•ïπ—ïÃÅëîÅâΩ—ΩπïÃÅÕ•∏ÅÕï±ïççßÕ∏ΩçÖ±±Ω’–Å•=LÏÅçÖµ¡ΩÃÅïë•—Öâ±ïÃÅçΩπÕï…ŸÖ∏ÅÕï±ïççßÕ∏∏Å±•µ•πÖçßÕ∏ÅŸ•Õ•â±îÅï∏Å±•Õ—ÖëºÅëîÅ—Ω…πïΩÃ∞ÅMçΩ…ïÃÅëîÅïŸïπ—º∞Åù…’¡ΩÃÅ¡Ö…—•ç’±Ö…ïÃÅçΩ∏ÅÖ’—Ω…•ëÖêÅëïŸ’ï±—ÑÅ¡Ω»ÅA$Åï·•Õ—ïπ—îÏÅ±±ïŸÑÅÖ∞Åµ•ÕµºÅëßÖ±ΩùºÅçΩ∏ÅπΩµâ…îΩµΩ—•ŸºΩçΩµ¡…ΩâÖπ—î∞ÅÕ•∏ÅÖµ¡±•Ö»Å¡ï…µ•ÕΩÃÅπ§Åï±•µ•πÖ»ÅÖ’—Ω∑Ö—•çÖµïπ—î∏Å!•Õ—Ω…•Ö∞Åá≈ÖëîÅ1%5%9HÅI=9ÅŸ•Õ•â±îÅ‰ÅçΩπÕï…ŸÑÅ¡’±ÕÖçßÕ∏Å¡…Ω±ΩπùÖëÑ∏ÅIΩ±±âÖç¨Å‡ÅÖïê–ÿŸëïî—çê—î‹‰Ÿò‰–‡’ëçëå»≈âå‡ÿ¿·Öå¿Âå–∏Å	ÖπçºÅ•π—ïù…Ö∞ΩπÖŸïùÖëΩ»Ω¡’â±•çÖçßÕ∏Å¡ïπë•ïπ—ïÃÅÖ∞Å…ïù•Õ—…Ö»∏(¥ÅÅ•πëï‡µù…’¡Ö∞π°—µ±ÄÉ
‹Åç’…ÕΩ»∞Å”µ—’±ΩÃ∞Åï±•µ•πÖçßÕ∏∞Å¡…’ïâÑ∞Å…ï±ïÖÕîÅºÅçΩπ—…Ω∞Å‰∏(¥ÅÅ±•Ÿîµ°’àπ©ÕÄÉ
‹Åç’…ÕΩ»∞Å”µ—’±ΩÃ∞Åï±•µ•πÖçßÕ∏∞Å¡…’ïâÑ∞Å…ï±ïÖÕîÅºÅçΩπ—…Ω∞Å‰∏(¥ÅÅ±•Ÿîµ°’àπ°—µ±ÄÉ
‹Åç’…ÕΩ»∞Å”µ—’±ΩÃ∞Åï±•µ•πÖçßÕ∏∞Å¡…’ïâÑ∞Å…ï±ïÖÕîÅºÅçΩπ—…Ω∞Å‰∏(¥ÅÅÕçΩ…ïÃµ’§πçÕÕÄÉ
‹Åç’…ÕΩ»∞Å”µ—’±ΩÃ∞Åï±•µ•πÖçßÕ∏∞Å¡…’ïâÑ∞Å…ï±ïÖÕîÅºÅçΩπ—…Ω∞Å‰∏(¥ÅÅ¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄÉ
‹Åç’…ÕΩ»∞Å”µ—’±ΩÃ∞Åï±•µ•πÖçßÕ∏∞Å¡…’ïâÑ∞Å…ï±ïÖÕîÅºÅçΩπ—…Ω∞Å‰∏(¥ÅÅ¡…•ŸÖ—îµ…Ω’πëÃπ©ÕÄÉ
‹Åç’…ÕΩ»∞Å”µ—’±ΩÃ∞Åï±•µ•πÖçßÕ∏∞Å¡…’ïâÑ∞Å…ï±ïÖÕîÅºÅçΩπ—…Ω∞Å‰∏(¥ÅÅïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏µ’§π©ÕÄÉ
‹Åç’…ÕΩ»∞Å”µ—’±ΩÃ∞Åï±•µ•πÖçßÕ∏∞Å¡…’ïâÑ∞Å…ï±ïÖÕîÅºÅçΩπ—…Ω∞Å‰∏(¥ÅÅ—ïÕ–µÕçΩ…ïÃµ’§πµ©ÕÄÉ
‹Åç’…ÕΩ»∞Å”µ—’±ΩÃ∞Åï±•µ•πÖçßÕ∏∞Å¡…’ïâÑ∞Å…ï±ïÖÕîÅºÅçΩπ—…Ω∞Å‰∏(¥ÅÅ—ïÕ–µÿÃ‰‡µµÖπ’Ö∞µΩ¡ïπ•πúµ°Ω±îπµ©ÕÄÉ
‹Åç’…ÕΩ»∞Å”µ—’±ΩÃ∞Åï±•µ•πÖçßÕ∏∞Å¡…’ïâÑ∞Å…ï±ïÖÕîÅºÅçΩπ—…Ω∞Å‰∏(¥ÅÅ…ï±ïÖÕîπ©ÕΩπÄÉ
‹Åç’…ÕΩ»∞Å”µ—’±ΩÃ∞Åï±•µ•πÖçßÕ∏∞Å¡…’ïâÑ∞Å…ï±ïÖÕîÅºÅçΩπ—…Ω∞Å‰∏(¥ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄÉ
‹Åç’…ÕΩ»∞Å”µ—’±ΩÃ∞Åï±•µ•πÖçßÕ∏∞Å¡…’ïâÑ∞Å…ï±ïÖÕîÅºÅçΩπ—…Ω∞Å‰∏(¥ÅÅI=5A}=YI10πµëÄÉ
‹Åç’…ÕΩ»∞Å”µ—’±ΩÃ∞Åï±•µ•πÖçßÕ∏∞Å¡…’ïâÑ∞Å…ï±ïÖÕîÅºÅçΩπ—…Ω∞Å‰∏(¥ÅÅI=5A}}Q11πµëÄÉ
‹Åç’…ÕΩ»∞Å”µ—’±ΩÃ∞Åï±•µ•πÖçßÕ∏∞Å¡…’ïâÑ∞Å…ï±ïÖÕîÅºÅçΩπ—…Ω∞Å‰∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩAQ%=9}Hƒ–›|…|—|»–πµëÄÉ
‹Åç’…ÕΩ»∞Å”µ—’±ΩÃ∞Åï±•µ•πÖçßÕ∏∞Å¡…’ïâÑ∞Å…ï±ïÖÕîÅºÅçΩπ—…Ω∞Å‰∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµëÄÉ
‹Åç’…ÕΩ»∞Å”µ—’±ΩÃ∞Åï±•µ•πÖçßÕ∏∞Å¡…’ïâÑ∞Å…ï±ïÖÕîÅºÅçΩπ—…Ω∞Å‰∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=LπµëÄÉ
‹Åç’…ÕΩ»∞Å”µ—’±ΩÃ∞Åï±•µ•πÖçßÕ∏∞Å¡…’ïâÑ∞Å…ï±ïÖÕîÅºÅçΩπ—…Ω∞Å‰∏(¥ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµëÄÉ
‹Åç’…ÕΩ»∞Å”µ—’±ΩÃ∞Åï±•µ•πÖçßÕ∏∞Å¡…’ïâÑ∞Å…ï±ïÖÕîÅºÅçΩπ—…Ω∞Å‰∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄÉ
‹Åç’…ÕΩ»∞Å”µ—’±ΩÃ∞Åï±•µ•πÖçßÕ∏∞Å¡…’ïâÑ∞Å…ï±ïÖÕîÅºÅçΩπ—…Ω∞Å‰∏((¥ÅÅÖ¡§Ω¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄÉ
‹ÅµÖπ•ô•ïÕ—ºÅëîÅ…ïç’¡ï…ÖçßÕ∏ÅÖ’ë•—ÖëÑÅ±•µ•—ÖëºÅÖ∞ÅïŸïπ—ºÅÖ’—Ω…•ÈÖëº∏(¥ÅÅ±•ŸîµçΩπ—…Ω∞π©ÕÄÉ
‹ÅçΩπÕ’±—ÑÅëîÅ…ïç’¡ï…ÖçßÕ∏ÅÖ∞ÅµΩπ—Ö»Å…ΩπëÑÅ¡…Ω¡•ÑÅÂÑÅŸ•πç’±ÖëÑ∏((¥ÅÅ—ïÕ–µ±Öàµ—Ω’…πÖµïπ–µπÖŸ•ùÖ—•Ω∏πµ©ÕÄÉ
‹Åô•·—’…îÅÖç—’Ö±•ÈÖëºÅçΩ∏Å…ïπëï…ï»Å…ïÖ∞Å‰Å¡…’ïâÑÅëîÅâΩ”Õ∏ÅŸ•Õ•â±îÅœÕ±ºÅ¡Ö…ÑÅÖ’—Ω…•ëÖê∏(((ååÅHƒ–‡É
‹Ä»ÅΩç—’â…îÄ»¿»ÿÉ
‹Åπ’µï…ÖçßÕ∏ÅçΩ……ï±Ö—•ŸÑ)=…ëï∏Å%5|‘ÿÿÃËÅŸï…ÕßÕ∏ÅŸ•Õ•â±îÅÕïπç•±±ÑÅHƒ–‡ÏÅÕ•ù’•ïπ—ïÃÅ¡’â±•çÖç•ΩπïÃÅHƒ–‰∞ÅHƒ‘¿Å‰ÅÕ’çïÕ•ŸÖÃ∞ÅÕ•∏Å¡’π—ΩÃÅπ§ÅÕ’ô•©ΩÃÅŸ•Õ•â±ïÃ∏Å…ï±ïÖÕîπ©ÕΩ∏∞Åµï—ÑÅ‰ÅôÖ±±âÖç¨ÅM\ÅÕ•πç…Ωπ•ÈÖëΩÃ∏ÅMîÅçΩπÕï…ŸÑÅ—ΩëÑÅ±ÑÅô’πç•ΩπÖ±•ëÖêÅÖ¡…ΩâÖëÑÅ‰∏Å’ïπ—îΩâÖÕîÄÿÃ–¿›Ñ»·òÃ›ïçôÑ·à—êÿƒ‰¿—ê»»‘‰—ôëêÃÃŸê¿»‘ÏÅ…Ω±±âÖç¨ÅÑÅïÕÑÅâÖÕî∏ÅA…’ïâÑËÅ…ïç’¡ï…ÖçßÕ∏ÅëîÅÖç—’Ö±•ÈÖçßÕ∏∞ÅâÖπçºÅ•π—ïù…Ö∞Å‰ÅπÖŸïùÖëΩ»Å…ïÖ∞ÅçΩ∏Å—Ö…©ï—ÑÅçΩπÕï…ŸÖëÑ∏Å9ºÅÕîÅëïç±Ö…ÑÅ¡…’ïâÑÅõµÕ•çÑÅëîÅ•A°Ωπî∏(¥ÅÅ•πëï‡µù…’¡Ö∞π°—µ±ÄÉ
‹Åπ’µï…ÖçßÕ∏ÅçΩ……ï±Ö—•ŸÑÅºÅ…ïù•Õ—…ºΩÕï±±ºÅHƒ–‡∏(¥ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄÉ
‹Åπ’µï…ÖçßÕ∏ÅçΩ……ï±Ö—•ŸÑÅºÅ…ïù•Õ—…ºΩÕï±±ºÅHƒ–‡∏(¥ÅÅ…ï±ïÖÕîπ©ÕΩπÄÉ
‹Åπ’µï…ÖçßÕ∏ÅçΩ……ï±Ö—•ŸÑÅºÅ…ïù•Õ—…ºΩÕï±±ºÅHƒ–‡∏(¥ÅÅI=5A}=YI10πµëÄÉ
‹Åπ’µï…ÖçßÕ∏ÅçΩ……ï±Ö—•ŸÑÅºÅ…ïù•Õ—…ºΩÕï±±ºÅHƒ–‡∏(¥ÅÅI=5A}}Q11πµëÄÉ
‹Åπ’µï…ÖçßÕ∏ÅçΩ……ï±Ö—•ŸÑÅºÅ…ïù•Õ—…ºΩÕï±±ºÅHƒ–‡∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµëÄÉ
‹Åπ’µï…ÖçßÕ∏ÅçΩ……ï±Ö—•ŸÑÅºÅ…ïù•Õ—…ºΩÕï±±ºÅHƒ–‡∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=LπµëÄÉ
‹Åπ’µï…ÖçßÕ∏ÅçΩ……ï±Ö—•ŸÑÅºÅ…ïù•Õ—…ºΩÕï±±ºÅHƒ–‡∏(¥ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩ%IQI%M}59Q=I%LπµëÄÉ
‹Åπ’µï…ÖçßÕ∏ÅçΩ……ï±Ö—•ŸÑÅºÅ…ïù•Õ—…ºΩÕï±±ºÅHƒ–‡∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄÉ
‹Åπ’µï…ÖçßÕ∏ÅçΩ……ï±Ö—•ŸÑÅºÅ…ïù•Õ—…ºΩÕï±±ºÅHƒ–‡∏((¥ÅÅ—ïÕ–µ’¡ëÖ—îµëï±•Ÿï…‰µçΩπ—…Ω∞πµ©ÕÄÉ
‹Åô•·—’…îÅ•πëï¡ïπë•ïπ—îÅëï∞ÅÕ’ô•©ºÅÏÅçΩπÕï…ŸÑÅ¡…’ïâÑÅëîÅ•ëïπ—•ëÖêÅë•Õ—•π—ÑÅçΩ∏Åï—•≈’ï—ÑÅŸ•Õ•â±îÅ•ù’Ö∞Åï∏ÅHƒ–‡∏((¥ÅÅ—ïÕ–µ±Öàµ…ïù•Õ—…Ö—•Ω∏µ¡…•ŸÖ—îµ…Ω’πëÃµïπ—…‰πµ©ÕÄÉ
‹Åï·•ùîÅï—•≈’ï—ÑÅHÅÕïù’•ëÑÉÈπ•çÖµïπ—îÅëîÅïπ—ï…º∞ÅÕïüÈ∏ÅΩ…ëï∏ÅHƒ–‡∏(((åååÅHƒ–‡É
‹Å•πù…ïÕºÅ—Ö…ìµºÅÖ∞Åù…’¡ºÅçΩ∏Å—Ö…©ï—ÑÅï∏Åç’…Õº)=…ëï∏ƒ‡Ë»–Å’Ö—ïµÖ±ÑËÅïπ—…Ö»ÅÖ’π≈’îÅ±ÑÅ…ΩπëÑÅïÕ”§Åïµ¡ïÈÖëÑ∏Å	Ω”Õ∏Å9QIHÅÅ5$ÅIUA<ÅëïÕëîÅ—Ö…©ï—Ñ∞Åë•…ïç—Ω…•ºÅ‰ÅèÕë•ùºÅ¡…Ω¡•ΩÃÏÅŸ•πç’±ÖçßÕ∏Åï∏Åï∞Åµ•ÕµºÅΩâ©ï—ºÅëîÅ…ΩπëÑÅÕ•∏Åπ’ïŸÑÅ—Ö…©ï—Ñ∞ÅÕ•∏ÅâΩ……Ö»Å°ΩÂΩÃ∞ÅÕ•∏Å…ï•π•ç•Ö»Å…ï±Ω®∏Å	Öç≠ïπêÅçΩπÕï…ŸÑÅÖççïÕºÅπΩµ•πÖ—•ŸºΩç’¡ºΩïÕ—ÖëºÅÖç—•ŸºÅ‰Å…ïç°ÖÈÑÅçÖµ¡ºΩµΩëÖ±•ëÖêÅ•πçΩµ¡Ö—•â±ïÃ∏Å∞ÅçÖµâ•Ö»ÅëîÅïŸïπ—ºÅÕîÅç…ïÑÅÕ—…ïÖ¥Å•πëï¡ïπë•ïπ—î∞Åπ’πçÑÅÕîÅ…ï’—•±•ÈÑÅ’πºÅŸ•πç’±ÖëºÅÑÅΩ—…ºÅù…’¡º∏ÅMçΩ…ïÃÅ5§Å…’¡ºÅŸ•πç’±ÖëºÅÖâ…îÅ—ΩëΩÃÅ±ΩÃÅçΩµ¡ï—•ëΩ…ïÃÅëï∞ÅïŸïπ—ºÏÅÕ•∏Å€µπç’±ºÅçΩπÕï…ŸÑÅ±ÑÅŸ•Õ—ÑÅëï∞Åù…’¡ºÅ±ΩçÖ∞∏ÅAΩÕ•ç•ΩπïÃÅ’ÕÖ∏Åï∞ÅµΩ—Ω»Åï·•Õ—ïπ—îÅ¡Ω»Å…ïÕ’±—ÖëºΩ¡’π—ΩÃÅ‰Å°ΩÂΩÃÅïôïç—•ŸÖµïπ—îÅçΩµ¡±ï—ÖëΩÃ∞ÅÕ•∏Å•µ¡’—Ö»ÅÕçΩ…ïÃÅÑÅ°ΩÂΩÃÅπºÅ©’ùÖëΩÃ∏ÅA…’ïâÑÅπ’ïŸÑÅŸï…•ô•çÑÅ•πù…ïÕºÅçΩ∏Å°ΩÂΩÃƒº»Åï·•Õ—ïπ—ïÃ∞Å•ëïπ—•ëÖêΩôïç°ÑΩ…ï±Ω®ÅçΩπÕï…ŸÖëΩÃ∞Å¡’â±•çÖçßÕ∏∞Å…ïç°ÖÈºÅëîÅ—Ö…©ï—ÑÅçï……ÖëÑÅ‰Å¡ΩÕ•ç•ΩπïÃÅÖπ—ïÃΩëïÕ¡◊•ÃÅëîÅπ’ïŸºÅÕçΩ…î∏Å	ÖπçºÅ‰ÅπÖŸïùÖëΩ»ÅÕΩâ…îÉÈ±—•µºÅÖ±çÖπçîÅ¡ïπë•ïπ—ïÃ∏(¥ÅÅ•πëï‡µù…’¡Ö∞π°—µ±ÄÉ
‹Å•πù…ïÕºÅ—Ö…ìµº∞ÅçΩπÕï…ŸÖçßÕ∏ÅºÅ…ïù…ïÕßÕ∏ÅHƒ–‡∏(¥ÅÅ¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄÉ
‹Å•πù…ïÕºÅ—Ö…ìµº∞ÅçΩπÕï…ŸÖçßÕ∏ÅºÅ…ïù…ïÕßÕ∏ÅHƒ–‡∏(¥ÅÅ±•ŸîµçΩπ—…Ω∞π©ÕÄÉ
‹Å•πù…ïÕºÅ—Ö…ìµº∞ÅçΩπÕï…ŸÖçßÕ∏ÅºÅ…ïù…ïÕßÕ∏ÅHƒ–‡∏(¥ÅÅÖ¡§Ω}±•àΩ¡ï…ÕΩπÖ∞µïŸïπ–µÖççïÕÃπ©ÕÄÉ
‹Å•πù…ïÕºÅ—Ö…ìµº∞ÅçΩπÕï…ŸÖçßÕ∏ÅºÅ…ïù…ïÕßÕ∏ÅHƒ–‡∏(¥ÅÅ—ïÕ–µ»ƒ–‡µ±Ö—îµù…Ω’¿µ©Ω•∏πµ©ÕÄÉ
‹Å•πù…ïÕºÅ—Ö…ìµº∞ÅçΩπÕï…ŸÖçßÕ∏ÅºÅ…ïù…ïÕßÕ∏ÅHƒ–‡∏(¥ÅÅ—ïÕ–µïŸïπ–µë•…ïç—Ω…‰µçΩëîπµ©ÕÄÉ
‹Å•πù…ïÕºÅ—Ö…ìµº∞ÅçΩπÕï…ŸÖçßÕ∏ÅºÅ…ïù…ïÕßÕ∏ÅHƒ–‡∏(¥ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄÉ
‹Å•πù…ïÕºÅ—Ö…ìµº∞ÅçΩπÕï…ŸÖçßÕ∏ÅºÅ…ïù…ïÕßÕ∏ÅHƒ–‡∏((¥ÅÅ—ïÕ–µ»»–µïŸïπ–µç…ïÖ—•Ω∏µôïïëâÖç¨πµ©ÕÄÉ
‹Åï©ïç’çßÕ∏Å…ïÖ∞Åëï∞Åë•Õ¡Ö—ç°ï»Å5§Å…’¡ºËÅïŸïπ—ºÅ¡…•ŸÖëºÅÖç—’Ö∞ÅÖâ…îÅçΩµ¡ï—•ëΩ…ïÃÏÅÕï±ïççßÕ∏ÅŸ•ï©ÑΩ—Ω…πïºΩÕ•∏Å€µπç’±ºÅçΩπÕï…ŸÑÅ—Ö…©ï—ÑÅ±ΩçÖ∞∏(((ååÅHƒ–‰É
‹Å…ïç’¡ï…ÖçßÕ∏Åï·Öç—ÑÅëïÕëîÅMçΩ…ïÃÉ
‹Ä»ÅΩç—’â…îÄ»¿»ÿ)9ÖŸïùÖëΩ»ÅHƒ–‡Åëï—ïç”ÃÅôÖ±±ºËÅ9QIHÅ0ÅM=IÅIÅ0ÅQ=I9<ÅëïÕëîÅù…’¡ºÅÂÑÅŸ•πç’±ÖëºÅÖâÀµÑÅIïù•Õ—…ºÅÖ∞ÅçÖµâ•Ö»Å•ππïçïÕÖ…•Öµïπ—îÅï∞ÅïÕ¡Öç•ºÅëîÅÖ±µÖçïπÖµ•ïπ—º∏Å1ÑÅ…ΩπëÑÅΩ…•ù•πÖ∞ÅµÖπ—•ïπîÅ…ΩÕÃ‰Ω9ï—º‹∞Å°ΩÂΩÃƒº»Å‰Å…ï±Ω®∏ÅΩ¡ïπÕÕ•ùπïëÖ…êÅÖ°Ω…ÑÅëï—ïç—ÑÅ‰ÅŸï…•ô•çÑÅïŸïπ—ºΩù…’¡ºΩµΩëÖ±•ëÖêΩ…ΩÕ—ï»Ωç’ïπ—ÑÅÖç—’Ö±ïÃÅ‰ÅŸ’ï±ŸîÅ¡Ω»Å…Ω’πë}…ï—’…∏ÅÕ•∏ÅçÖµâ•Ö»ÅπÖµïÕ¡ÖçîÅπ§Åç…ïÖ»Å—Ö…©ï—Ñ∏ÅM§ÅπºÅ°Ö‰Å…ΩπëÑÅçΩµ¡Ö—•â±îÅÕ•ù’îÅï∞Åô±’©ºÅÖÕ•ùπÖëºÅΩ…•ù•πÖ∞ÏÅç’ïπ—ÑÅë•ôï…ïπ—îÅπ’πçÑÅ…ï’—•±•ÈÑÅ—Ö…©ï—Ñ∏ÅHƒ–‡Å¡ÖœÃÅ•π—ïù…Ö∞Å‰Å±Ö—îÅ©Ω•∏ÏÅïÕ—îÅ…ïù…ïÕºÅπºÅ¡ÖœÃÅ‰Å¡Ω»ÅïÕºÅÕîÅçΩ……•ùîÅï∏Å¡’â±•çÖçßÕ∏ÅçΩπÕïç’—•ŸÑÅHƒ–‰∏ÅIΩ±±âÖç¨Ä≈çÖå‡·âôòƒ‘––»¿ÿ‡‘ÿ‰¿Õò–Ã‰Ÿïà‹Õëôôò…ò≈î‘∏ÅA…’ïâÑÅY4Å¡ΩÕ•—•ŸÑΩπïùÖ—•ŸÑÅ‰ÅπÖŸïùÖëΩ»Åëï∞Åµ•ÕµºÅù…’¡ºΩÕçΩ…îÅÖπ—ïÃÅ‰ÅëïÕ¡◊•Ã∏(¥ÅÅ¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄÉ
‹Å…ïç’¡ï…ÖçßÕ∏∞ÅŸï…ÕßÕ∏∞Å…ïù…ïÕßÕ∏ÅºÅ…ïù•Õ—…ºÅHƒ–‰∏(¥ÅÅ•πëï‡µù…’¡Ö∞π°—µ±ÄÉ
‹Å…ïç’¡ï…ÖçßÕ∏∞ÅŸï…ÕßÕ∏∞Å…ïù…ïÕßÕ∏ÅºÅ…ïù•Õ—…ºÅHƒ–‰∏(¥ÅÅ…ï±ïÖÕîπ©ÕΩπÄÉ
‹Å…ïç’¡ï…ÖçßÕ∏∞ÅŸï…ÕßÕ∏∞Å…ïù…ïÕßÕ∏ÅºÅ…ïù•Õ—…ºÅHƒ–‰∏(¥ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄÉ
‹Å…ïç’¡ï…ÖçßÕ∏∞ÅŸï…ÕßÕ∏∞Å…ïù…ïÕßÕ∏ÅºÅ…ïù•Õ—…ºÅHƒ–‰∏(¥ÅÅ—ïÕ–µ»ƒ–‡µ±Ö—îµù…Ω’¿µ©Ω•∏πµ©ÕÄÉ
‹Å…ïç’¡ï…ÖçßÕ∏∞ÅŸï…ÕßÕ∏∞Å…ïù…ïÕßÕ∏ÅºÅ…ïù•Õ—…ºÅHƒ–‰∏(¥ÅÅI=5A}=YI10πµëÄÉ
‹Å…ïç’¡ï…ÖçßÕ∏∞ÅŸï…ÕßÕ∏∞Å…ïù…ïÕßÕ∏ÅºÅ…ïù•Õ—…ºÅHƒ–‰∏(¥ÅÅI=5A}}Q11πµëÄÉ
‹Å…ïç’¡ï…ÖçßÕ∏∞ÅŸï…ÕßÕ∏∞Å…ïù…ïÕßÕ∏ÅºÅ…ïù•Õ—…ºÅHƒ–‰∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµëÄÉ
‹Å…ïç’¡ï…ÖçßÕ∏∞ÅŸï…ÕßÕ∏∞Å…ïù…ïÕßÕ∏ÅºÅ…ïù•Õ—…ºÅHƒ–‰∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=LπµëÄÉ
‹Å…ïç’¡ï…ÖçßÕ∏∞ÅŸï…ÕßÕ∏∞Å…ïù…ïÕßÕ∏ÅºÅ…ïù•Õ—…ºÅHƒ–‰∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄÉ
‹Å…ïç’¡ï…ÖçßÕ∏∞ÅŸï…ÕßÕ∏∞Å…ïù…ïÕßÕ∏ÅºÅ…ïù•Õ—…ºÅHƒ–‰∏(((ååÅHƒ‘¿É
‹Ä»ÅΩç—’â…îÄ»¿»ÿÉ
‹ÅMçΩ…ïÃÅ©’π—ΩÃÅîÅ•πù…ïÕºÅÖ∞Åù…’¡ºÅ¡Ω»ÅèÕë•ùº)=…ëï∏Å%5|‘ÿÿÿËÅM=ILÅ5$ÅIUA<Å‰ÅM=ILÅQ=I9<Åï∏Å±ÑÅ¡…•µï…ÑÅô•±Ñ∞Å’πºÅÑÅ±ÑÅ¡Ö»Åëï∞ÅΩ—…ºÏÅÖâÖ©ºÅ%9IMHÅÄºÅIUA<Åï∏ÅëΩÃÅ≥µπïÖÃ∏Å5Öπ—•ïπîÅï∞Åë•…ïç—Ω…•ºÅëîÅù…’¡ΩÃÅ‰Å±ÑÅŸ•πç’±ÖçßÕ∏ÅëîÅ±ÑÅ—Ö…©ï—ÑÅçΩµïπÈÖëÑ∏ÅMï±ïçç•ΩπÖ»Å’∏Åù…’¡ºÅÕ•ïµ¡…îÅÕΩ±•ç•—ÑÅÕ‘ÅèÕë•ùº∞Å—Öµâß•∏ÅÖ∞Åç…ïÖëΩ»ËÅπºÅ…ï±±ïπÑÅπ§ÅÕÖ±—ÑÅï∞ÅçÖµ¡ºÅçΩ∏Å’∏ÅèÕë•ùºÅù’Ö…ëÖëº∏Å1ÑÅA$Åï·•Õ—ïπ—îÅŸÖ±•ëÑÅèÕë•ùºÅ‰ÅïŸïπ—ºÅÕï±ïçç•ΩπÖëºÅÖπ—ïÃÅëîÅÖÕ•ùπÖ»ÏÅπºÅçÖµâ•ÑÅ¡ï…µ•ÕΩÃÅπ§ÅµΩ—Ω»ÅëîÅÕçΩ…ïÃ∏ÅIïù…ïÕßÕ∏Åï©ïç’—ÑÅÕï±ïççßÕ∏∞ÅèÕë•ùºÅ•πçΩ……ïç—ºÅ‰Å€Ö±•ëº∞ÅŸ•Õ•—Öπ—îΩç…ïÖëΩ»∞ÅÕ•∏ÅÖ±—ï…Ö»ÅÕçΩ…ïÃΩ…ï±Ω®∏ÅÖ’ÕÑÅëï∞ÅëïÕ€µºÅŸ•Õ’Ö∞ËÅâΩ”Õ∏ÅÖù…ïùÖëºÅÖπ—ïÃÅëîÅ±ΩÃÅëΩÃÅMçΩ…ïÃÅï∏Åù…•êÅëîÅëΩÃÅçΩ±’µπÖÃ∏ÅΩπ—…Ω∞Å¡ï…µÖπïπ—îËÅΩ…ëï∏Å=4Å¡…ΩâÖëºÅ‰ÅùïΩµï—ÀµÑÅ…ïŸ•ÕÖëÑÅï∏ÅπÖŸïùÖëΩ»Å…ïÖ∞∏Å	ÖÕîΩ…Ω±±âÖç¨Ä›ôôî–‡‰‘…ïê‡‡ÿ»’òƒŸôî‘‹‹¿‰ƒÃ·âÑ‹‹»ÿŸê’Öå∏Å	ÖπçºÅ•π—ïù…Ö∞Å‰ÅπÖŸïùÖëΩ»Åëï∞ÅëïÕ¡±•ïù’îÅπ’ïŸºÅ¡ïπë•ïπ—ïÃÅÖ∞Å…ïù•Õ—…Ö»∏(¥ÅÅ•πëï‡µù…’¡Ö∞π°—µ±ÄÉ
‹Åë•Õ¡ΩÕ•çßÕ∏∞ÅèÕë•ùºÅΩâ±•ùÖ—Ω…•º∞Å…ïù…ïÕßÕ∏ÅºÅ…ïù•Õ—…ºÅHƒ‘¿∏(¥ÅÅ¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄÉ
‹Åë•Õ¡ΩÕ•çßÕ∏∞ÅèÕë•ùºÅΩâ±•ùÖ—Ω…•º∞Å…ïù…ïÕßÕ∏ÅºÅ…ïù•Õ—…ºÅHƒ‘¿∏(¥ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄÉ
‹Åë•Õ¡ΩÕ•çßÕ∏∞ÅèÕë•ùºÅΩâ±•ùÖ—Ω…•º∞Å…ïù…ïÕßÕ∏ÅºÅ…ïù•Õ—…ºÅHƒ‘¿∏(¥ÅÅ…ï±ïÖÕîπ©ÕΩπÄÉ
‹Åë•Õ¡ΩÕ•çßÕ∏∞ÅèÕë•ùºÅΩâ±•ùÖ—Ω…•º∞Å…ïù…ïÕßÕ∏ÅºÅ…ïù•Õ—…ºÅHƒ‘¿∏(¥ÅÅ—ïÕ–µ»ƒ‘¿µù…Ω’¿µïπ—…‰πµ©ÕÄÉ
‹Åë•Õ¡ΩÕ•çßÕ∏∞ÅèÕë•ùºÅΩâ±•ùÖ—Ω…•º∞Å…ïù…ïÕßÕ∏ÅºÅ…ïù•Õ—…ºÅHƒ‘¿∏(¥ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄÉ
‹Åë•Õ¡ΩÕ•çßÕ∏∞ÅèÕë•ùºÅΩâ±•ùÖ—Ω…•º∞Å…ïù…ïÕßÕ∏ÅºÅ…ïù•Õ—…ºÅHƒ‘¿∏(¥ÅÅI=5A}=YI10πµëÄÉ
‹Åë•Õ¡ΩÕ•çßÕ∏∞ÅèÕë•ùºÅΩâ±•ùÖ—Ω…•º∞Å…ïù…ïÕßÕ∏ÅºÅ…ïù•Õ—…ºÅHƒ‘¿∏(¥ÅÅI=5A}}Q11πµëÄÉ
‹Åë•Õ¡ΩÕ•çßÕ∏∞ÅèÕë•ùºÅΩâ±•ùÖ—Ω…•º∞Å…ïù…ïÕßÕ∏ÅºÅ…ïù•Õ—…ºÅHƒ‘¿∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµëÄÉ
‹Åë•Õ¡ΩÕ•çßÕ∏∞ÅèÕë•ùºÅΩâ±•ùÖ—Ω…•º∞Å…ïù…ïÕßÕ∏ÅºÅ…ïù•Õ—…ºÅHƒ‘¿∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=LπµëÄÉ
‹Åë•Õ¡ΩÕ•çßÕ∏∞ÅèÕë•ùºÅΩâ±•ùÖ—Ω…•º∞Å…ïù…ïÕßÕ∏ÅºÅ…ïù•Õ—…ºÅHƒ‘¿∏(¥ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµëÄÉ
‹Åë•Õ¡ΩÕ•çßÕ∏∞ÅèÕë•ùºÅΩâ±•ùÖ—Ω…•º∞Å…ïù…ïÕßÕ∏ÅºÅ…ïù•Õ—…ºÅHƒ‘¿∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄÉ
‹Åë•Õ¡ΩÕ•çßÕ∏∞ÅèÕë•ùºÅΩâ±•ùÖ—Ω…•º∞Å…ïù…ïÕßÕ∏ÅºÅ…ïù•Õ—…ºÅHƒ‘¿∏(((ååÅHƒ‘ƒÉ
‹Ä»ÅΩç—’â…îÄ»¿»ÿÉ
‹Å…ï•πù…ïÕºÅ¡Ω»ÅèÕë•ùºÅçΩ∏ÅïÕç…•—Ω»ÅÂÑÅŸ•πç’±Öëº)9ÖŸïùÖëΩ»Å1ÅHƒ‘¿ËÅèÕë•ùºÅ•πçΩ……ïç—ºÅÕîÅ…ïç°ÖÎÃÅçΩ……ïç—Öµïπ—îÏÅèÕë•ùºÅ€Ö±•ëºÅï∏Åï∞Åµ•ÕµºÅù…’¡ºÅ¡ï…ëßÃÅ±ÑÅŸ•πç’±ÖçßÕ∏ÅëîÅ¡’â±•çÖçßÕ∏Å‰ÅµΩÕ—ÀÃÅï……Ω»∏ÅÖ’ÕÑËÅ©Ω•∏µçΩëîÅ±•µ¡•ÖâÑÅÕ—…ïÖµ}•êÅÖ’π≈’îÅ…ΩÕ—ï»Ωù…’¡ºÅô’ï…Ö∏Å•ù’Ö±ïÃÅ‰Åç±•ïπ—îÅ…ï’—•±•ÈÖâÑÅçΩπï·ßÕ∏ÅçÖç°ïÖëÑÅÕ•∏ÅŸΩ±Ÿï»ÅÑÅïπ±ÖÈÖ»∏ÅΩ……ïççßÕ∏ËÅçΩπÕï…ŸÑÅÕ—…ïÖµ}•êÅÕΩ±Öµïπ—îÅ¡Ö…ÑÅ…ΩÕ—ï»Ωù…’¡ºÅï·Öç—ΩÃÏÅù…’¡ºÅë•Õ—•π—ºÅΩâ±•ùÑÅπ’ïŸÑÅŸ•πç’±ÖçßÕ∏∏Å%πù…ïÕºÅï·¡≥µç•—ºÅµÖ…çÑÅçΩππïç—ïêÈôÖ±ÕîÅ‰Åô’ï…ÈÑÅ…ïŸÖ±•ëÖçßÕ∏Ωïπ±ÖçîÅÖ’—ïπ—•çÖëºÅ¡Ω»Åï∞ÅïÕç…•—Ω»Åï·•Õ—ïπ—îÅÖπ—ïÃÅëîÅ¡’â±•çÖ»∏Å9ºÅÖµ¡≥µÑÅ¡ï…µ•ÕΩÃÅπ§ÅâΩ……ÑÅÕçΩ…ïÃ∏ÅA…’ïâÖÃÅME0ÅëîÅ…ï•πù…ïÕºÅ‰ÅçÖµâ•ºÅëîÅù…’¡ºÏÅY4ÅëîÅçΩπï·ßÕ∏ÅçÖç°ïÖëÑÅ‰Å…ï•πù…ïÕºÅï·¡≥µç•—º∏ÅIΩ±±âÖç¨ÅåÕëëåÕà‡Ÿîƒ¿¿·ôê‘‘‰Õà‡‡ÿ‰‰Ÿå–¡êƒ‡–—çå›êƒ∏Å1ÑÅïπ—…ïùÑÅHƒ‘¿Å¡ÖœÃÅQU1%iHÅï∏ÅπÖŸïùÖëΩ»Å1ÅçΩπÕï…ŸÖπëºÅ…ΩÕÃ‰Ω9ï—º‹Ω°ΩÂºÃÏÅ%5|‘ÿÿ‹Åëï∞Å¡…Ω¡•ï—Ö…•ºÅ¡ï…µÖπïçîÅHƒ–‹∏»∏–∏»–Å¡ïÕîÅÑÅÖŸ•ÕºÅQU1%i<∞ÅπºÅÕîÅëïç±Ö…ÑÅÖç—’Ö±•ÈÖçßÕ∏ÅëîÅÕ‘Åë•Õ¡ΩÕ•—•Ÿº∏Åπ±ÖçîÅµÖπ’Ö∞Åë•…ïç—ºÅëîÅ…ïç’¡ï…ÖçßÕ∏Åïπ—…ïùÖëº∏Å	ÖπçºÅ‰Å…ï•πù…ïÕºÅ…ïÖ∞ÅHƒ‘ƒÅ¡ïπë•ïπ—ïÃÅÖ∞Å…ïù•Õ—…Ö»∏(¥ÅÅÖ¡§Ω}±•àΩ¡ï…ÕΩπÖ∞µïŸïπ–µÖççïÕÃπ©ÕÄÉ
‹Å…ï•πù…ïÕº∞ÅçΩπÕï…ŸÖçßÕ∏Åëï∞ÅïÕç…•—Ω»∞Å¡…’ïâÑÅºÅçΩπ—…Ω∞ÅHƒ‘ƒ∏(¥ÅÅ±•ŸîµçΩπ—…Ω∞π©ÕÄÉ
‹Å…ï•πù…ïÕº∞ÅçΩπÕï…ŸÖçßÕ∏Åëï∞ÅïÕç…•—Ω»∞Å¡…’ïâÑÅºÅçΩπ—…Ω∞ÅHƒ‘ƒ∏(¥ÅÅ•πëï‡µù…’¡Ö∞π°—µ±ÄÉ
‹Å…ï•πù…ïÕº∞ÅçΩπÕï…ŸÖçßÕ∏Åëï∞ÅïÕç…•—Ω»∞Å¡…’ïâÑÅºÅçΩπ—…Ω∞ÅHƒ‘ƒ∏(¥ÅÅ…ï±ïÖÕîπ©ÕΩπÄÉ
‹Å…ï•πù…ïÕº∞ÅçΩπÕï…ŸÖçßÕ∏Åëï∞ÅïÕç…•—Ω»∞Å¡…’ïâÑÅºÅçΩπ—…Ω∞ÅHƒ‘ƒ∏(¥ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄÉ
‹Å…ï•πù…ïÕº∞ÅçΩπÕï…ŸÖçßÕ∏Åëï∞ÅïÕç…•—Ω»∞Å¡…’ïâÑÅºÅçΩπ—…Ω∞ÅHƒ‘ƒ∏(¥ÅÅ—ïÕ–µïŸïπ–µë•…ïç—Ω…‰µçΩëîπµ©ÕÄÉ
‹Å…ï•πù…ïÕº∞ÅçΩπÕï…ŸÖçßÕ∏Åëï∞ÅïÕç…•—Ω»∞Å¡…’ïâÑÅºÅçΩπ—…Ω∞ÅHƒ‘ƒ∏(¥ÅÅ—ïÕ–µ»ƒ‘¿µù…Ω’¿µïπ—…‰πµ©ÕÄÉ
‹Å…ï•πù…ïÕº∞ÅçΩπÕï…ŸÖçßÕ∏Åëï∞ÅïÕç…•—Ω»∞Å¡…’ïâÑÅºÅçΩπ—…Ω∞ÅHƒ‘ƒ∏(¥ÅÅI=5A}=YI10πµëÄÉ
‹Å…ï•πù…ïÕº∞ÅçΩπÕï…ŸÖçßÕ∏Åëï∞ÅïÕç…•—Ω»∞Å¡…’ïâÑÅºÅçΩπ—…Ω∞ÅHƒ‘ƒ∏(¥ÅÅI=5A}}Q11πµëÄÉ
‹Å…ï•πù…ïÕº∞ÅçΩπÕï…ŸÖçßÕ∏Åëï∞ÅïÕç…•—Ω»∞Å¡…’ïâÑÅºÅçΩπ—…Ω∞ÅHƒ‘ƒ∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµëÄÉ
‹Å…ï•πù…ïÕº∞ÅçΩπÕï…ŸÖçßÕ∏Åëï∞ÅïÕç…•—Ω»∞Å¡…’ïâÑÅºÅçΩπ—…Ω∞ÅHƒ‘ƒ∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=LπµëÄÉ
‹Å…ï•πù…ïÕº∞ÅçΩπÕï…ŸÖçßÕ∏Åëï∞ÅïÕç…•—Ω»∞Å¡…’ïâÑÅºÅçΩπ—…Ω∞ÅHƒ‘ƒ∏(¥ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµëÄÉ
‹Å…ï•πù…ïÕº∞ÅçΩπÕï…ŸÖçßÕ∏Åëï∞ÅïÕç…•—Ω»∞Å¡…’ïâÑÅºÅçΩπ—…Ω∞ÅHƒ‘ƒ∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄÉ
‹Å…ï•πù…ïÕº∞ÅçΩπÕï…ŸÖçßÕ∏Åëï∞ÅïÕç…•—Ω»∞Å¡…’ïâÑÅºÅçΩπ—…Ω∞ÅHƒ‘ƒ∏((¥ÅÅ—ïÕ–µ±ÖàµëïŸ•çîµïŸïπ–µ•ëïπ—•—‰πµ©ÕÄÉ
‹Å¡…ΩŸïïëΩ»ÅÖ’—†Åï·¡≥µç•—Öµïπ—îÅëïŸ’ï±Ÿî–¿ƒÅï∏Åô•·—’…îÅëîÅÅÖ•Õ±ÖëÑÏÅπºÅï·•ùîÅ…ïêÅπ§ÅÕïÕßÕ∏Å…ïÖ∞Å¡Ö…ÑÅçΩµ¡…ΩâÖ»Å•ëïπ—•ëÖêÅëîÅë•Õ¡ΩÕ•—•ŸºÅHƒ‘ƒ∏()Hƒ‘ƒÉ
‹ÅçΩπ—•π’•ëÖêÅëï∞ÅÖççïÕºÅÖπ—•ù’ºÅçΩπô•…µÖëºÅ¡Ω»Å%5|‘ÿÿ‡†ƒ§ËÅYï…çï∞Åë¡±|’•·YË›•]]Ÿ8≈iµ…E5—(›·©µQAP‡∞Å…ÖµÑÅ±ÖàΩ»ƒ–ÿµïπ—…‰µΩ¡ï∏¥»—†µ•πŸ•—ïÃ¥»¿»ÿ¿‰Ã¿∞ÅçΩµµ•–·Ñ¿’ôêƒƒ¡åÿ—ê’âò‘≈Öëêƒ‘Ã—à·çëïçî—ê‰ÿ—âà‘∞ÅÖ±•ÖÃÅùΩ±òµÕåµù–µ±Öàµù•–µ±Öàµ»ƒ–ÿµïπ—…‰µΩ¡î¥ŸàÃŸïîµï¡ùçÖëëÂÃµ¡…Ω©ïç—ÃπŸï…çï∞πÖ¡¿∏Åç—’Ö±•ÈÖ»ÅïÕÑÅ…ÖµÑÅÖ∞Åµ•ÕµºÉÖ…âΩ∞ÅŸï…•ô•çÖëºÅ≈’îÅµÖ•∏Å¡Ö…ÑÅçΩπÕï…ŸÖ»ÅΩ…•ùï∏Å‰ÅëÖ—ΩÃÅ±ΩçÖ±ïÃÅëï∞ÅÖççïÕºÅëï∞Å¡…Ω¡•ï—Ö…•º∏Å9ºÅ…ïë•…•ù•»ÅÑÅΩ—…ºÅΩ…•ùï∏Åπ§ÅâΩ……Ö»ÅÕ—Ω…Öùî∏ÅΩπô•…µÖ»ÅIdÅ‰ÅQU1%iHÅï∏ÅïÕîÅÖ±•ÖÃÏÅπºÅÖô•…µÖ»ÅÖç—’Ö±•ÈÖçßÕ∏Åëï∞Å•A°ΩπîÅÕ•∏ÅïŸ•ëïπç•Ñ∏()Ωπ—…Ω∞ÅëîÅëïÕ—•πºÅ¡ï…Õ•Õ—•ëºÅ—Öµâß•∏Åï∏ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩ5QI%i}Q|¡}AI=eQ<πµëÄÅ‰ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩ5QI%i}Q|¡}AI=eQ<π©ÕΩπÄËÅΩ…•ùï∏Å•πÕ—Ö±ÖëºÅ‰Å…ÖµÑÅΩâ±•ùÖ—Ω…•ΩÃÏÅÖ±•ÖÃÅÕïç’πëÖ…•ºÅπºÅÕ’Õ—•—’ÂîÅïπ—…ïùÑ∏(((ååÅHƒ‘»É
‹Åï±•µ•πÖçßÕ∏ÅçΩ∏Å’πÑÅÕΩ±ÑÅçΩπô•…µÖçßÕ∏É
‹Ä»ÅëîÅΩç—’â…îÅëîÄ»¿»ÿ()Aïë•ëºÅ%5|‘ÿ‹»ËÅ…ï—•…Ö»ÅçÖ¡—’…ÑÅëîÅπΩµâ…îÅ‰ÅµΩ—•Ÿº∏Å1%5%9HÅÖâ…îÉÈπ•çÖµïπ—îÅ=9%I5HÅ1%5%9H∞Å•ëïπ—•ô•çÑÅï∞ÅïŸïπ—ºÅÕï±ïçç•ΩπÖëºÅ‰Åµ’ïÕ—…ÑÅ1%5%9HÏÅ`ÅçÖπçï±Ñ∏ÅU∏Åç±•åÅïπ€µÑÅ±ÑÅï±•µ•πÖçßÕ∏Å‰Åç•ï……ÑÅÖ∞É•·•—º∏Å9Ωµâ…îÅ‰ÅµΩ—•ŸºÅëï∞ÅçΩµ¡…ΩâÖπ—îÅÕîÅçΩµ¡±ï—Ö∏Å•π—ï…πÖµïπ—îÏÅA$ÅçΩπÕï…ŸÑÅÖ’—Ω…•ÈÖçßÕ∏Å‰ÅŸÖ±•ëÖçßÕ∏Åëï∞ÅïŸïπ—º∞ÅçΩµ¡…ΩâÖπ—îÅ‰Åç•ï……îÅÖ”Õµ•çº∏Å……Ω»Å≈’ïëÑÅŸ•Õ•â±îÅ‰Å°Öâ•±•—ÑÅ…ï•π—ïπ—º∏ÅA…’ïâÑÅY4ÅëîÅÖ¡ï…—’…ÑÅÕ•∏Åµ’—ÖçßÕ∏∞Åç±•åÉÈπ•çºÅ‰É•·•—ºΩï……Ω»ÏÅâÖπçºÅ•π—ïù…Ö∞Å‰Å…ïŸ•ÕßÕ∏Åï∏ÅπÖŸïùÖëΩ»Å…ï≈’ï…•ëΩÃ∏ÅIΩ±±âÖç¨ÅHƒ‘ƒÅî‰Âò‡›çÑ»ƒ¿¿Õê–»·ò–»ÿ≈å¡åÂàÃÿ›à’çÖôëïò‘Ã∏ÅA’â±•çÖçßÕ∏ÅÖ’—Ω…•ÈÖëÑÅï∏Å¡…Ωë’ççßÕ∏∞ÅÖ±•ÖÃÅïÕ—Öâ±îÅ1Å‰ÅΩ…•ùï∏Å•πÕ—Ö±ÖëºÅΩâ±•ùÖ—Ω…•ºÅëîÅ±ÑÅµÖ—…•Ë∏ÅHƒ‘ƒÅ¡…ïŸ•ºÅŸï…•ô•çÖëºÅIdÅï∏Å±ΩÃÅ—…ïÃÅëïÕ—•πΩÃ∞ÅÖç—’Ö±•ÈÖçßÕ∏ÅΩ…•ù•πÖ∞ÅHƒ–ﬂäIHƒ‘ƒÅ‰ÅÕçΩ…ïÃƒº»Å¡…ïÕï…ŸÖëΩÃÏÅ¡…Ω¡•ï—Ö…•ºÅçΩπô•…∑ÃÅ1•Õ—º∏(¥ÅÅïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏µ’§π©ÕÄÉ
‹ÅçΩπ—…Ω∞ÅºÅµΩë•ô•çÖçßÕ∏ÅHƒ‘»∏(¥ÅÅ—ïÕ–µïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏πµ©ÕÄÉ
‹ÅçΩπ—…Ω∞ÅºÅµΩë•ô•çÖçßÕ∏ÅHƒ‘»∏(¥ÅÅ•πëï‡µù…’¡Ö∞π°—µ±ÄÉ
‹ÅçΩπ—…Ω∞ÅºÅµΩë•ô•çÖçßÕ∏ÅHƒ‘»∏(¥ÅÅ…ï±ïÖÕîπ©ÕΩπÄÉ
‹ÅçΩπ—…Ω∞ÅºÅµΩë•ô•çÖçßÕ∏ÅHƒ‘»∏(¥ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄÉ
‹ÅçΩπ—…Ω∞ÅºÅµΩë•ô•çÖçßÕ∏ÅHƒ‘»∏(¥ÅÅI=5A}=YI10πµëÄÉ
‹ÅçΩπ—…Ω∞ÅºÅµΩë•ô•çÖçßÕ∏ÅHƒ‘»∏(¥ÅÅI=5A}}Q11πµëÄÉ
‹ÅçΩπ—…Ω∞ÅºÅµΩë•ô•çÖçßÕ∏ÅHƒ‘»∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµëÄÉ
‹ÅçΩπ—…Ω∞ÅºÅµΩë•ô•çÖçßÕ∏ÅHƒ‘»∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=LπµëÄÉ
‹ÅçΩπ—…Ω∞ÅºÅµΩë•ô•çÖçßÕ∏ÅHƒ‘»∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄÉ
‹ÅçΩπ—…Ω∞ÅºÅµΩë•ô•çÖçßÕ∏ÅHƒ‘»∏(¥ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµëÄÉ
‹ÅçΩπ—…Ω∞ÅºÅµΩë•ô•çÖçßÕ∏ÅHƒ‘»∏(((ååÅHƒ‘ÃÉ
‹Å…ï—•…Ö»Å…ï¡Ω…—ïÃÅëîÅï±•µ•πÖçßÕ∏ÅëîÅ±ÑÅ¡Öπ—Ö±±ÑÉ
‹Ä»ÅëîÅΩç—’â…îÅëîÄ»¿»ÿ()Aïë•ëºÅ%5|‘ÿ‹ÃËÅï±•µ•πÖ»ÅŸ•Õ’Ö±•ÈÖçßÕ∏ÅëîÅ—ΩëΩÃÅ±ΩÃÅ…ï¡Ω…—ïÃÅ…ïÕ•ë’Ö±ïÃÅëîÅï±•µ•πÖçßÕ∏∏ÅMîÅ…ï—•…ÑÅ±ÑÅÕïççßÕ∏Å=5AI=	9QLÅÅ1%5%9'M8Åëï∞Å!Q50Å‰Åï∞Å…ïπëï…•ÈÖëºÅëîÅ…ïç•âΩÃÅëï∞ÅçΩπ—…Ω±ÖëΩ»ËÅ°•Õ”Õ…•çΩÃÅ‰Åô’—’…ΩÃÅπºÅÖ¡Ö…ïçï∏∏ÅMîÅçΩπÕï…ŸÑÅçΩπô•…µÖçßÕ∏ÅÕ•µ¡±îÅHƒ‘»∞Å±•Õ—ÖëºÅëîÅïŸïπ—ΩÃÅŸ•ùïπ—ïÃÅ‰ÅA$ÅëîÅÖ’—Ω…•ÈÖçßÕ∏∏Å9ºÅ¡’…ùÑÅëÖ—ΩÃÅëîÅÖ’ë•—ΩÀµÑ∏ÅIΩ±±âÖç¨ÅHƒ‘»Ä·âò¿ƒ‘¿–Ã‰Ã»’ò’ôà‘»‘‡≈ò‹·Ñ¿–ÂçâåÕÑƒ≈î‹ƒ¿∏ÅA’â±•çÖ»Åï∏Å¡…Ωë’ççßÕ∏Å‰ÅÖµâΩÃÅëïÕ—•πΩÃÅ1ÅΩâ±•ùÖ—Ω…•ΩÃ∏ÅA…’ïâÑÅÖëµ•π•Õ—…Ö—•ŸÑÅï·•Õ—ïπ—îÅ‰ÅπÖŸïùÖëΩ»Å…ïÖ∞ÅÕ•∏ÅÕïççßÕ∏Åπ§Å…ï¡Ω…—ïÃ∏(¥ÅÅïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏µ’§π©ÕÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ÅºÅçΩπ—…Ω∞ÅHƒ‘Ã∏(¥ÅÅïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏π°—µ±ÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ÅºÅçΩπ—…Ω∞ÅHƒ‘Ã∏(¥ÅÅ•πëï‡µù…’¡Ö∞π°—µ±ÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ÅºÅçΩπ—…Ω∞ÅHƒ‘Ã∏(¥ÅÅ…ï±ïÖÕîπ©ÕΩπÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ÅºÅçΩπ—…Ω∞ÅHƒ‘Ã∏(¥ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ÅºÅçΩπ—…Ω∞ÅHƒ‘Ã∏(¥ÅÅI=5A}=YI10πµëÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ÅºÅçΩπ—…Ω∞ÅHƒ‘Ã∏(¥ÅÅI=5A}}Q11πµëÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ÅºÅçΩπ—…Ω∞ÅHƒ‘Ã∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµëÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ÅºÅçΩπ—…Ω∞ÅHƒ‘Ã∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=LπµëÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ÅºÅçΩπ—…Ω∞ÅHƒ‘Ã∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ÅºÅçΩπ—…Ω∞ÅHƒ‘Ã∏(¥ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµëÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ÅºÅçΩπ—…Ω∞ÅHƒ‘Ã∏(((ååÅHƒ‘–É
‹ÅMçΩ…ïÃÅ—Ω…πïºËÅë•…ïç—Ω…•ºÅÖç—•ŸºÅ‰Å”µ—’±ΩÃÉ
‹Ä»ÅëîÅΩç—’â…îÅëîÄ»¿»ÿ()Aïë•ëºÅ%5|‘ÿ‹‘ËÅM=ILÅQ=I9<Åµ’ïÕ—…ÑÅï·ç±’Õ•ŸÖµïπ—îÅ—ΩëΩÃÅ±ΩÃÅ—Ω…πïΩÃÅï∏Åç’…ÕºÅëï∞Åë•…ïç—Ω…•ºÅëï∞ÅÕï…Ÿ•ëΩ»ÏÅÕ•∏Åç…ïÖ»∞Å•πù…ïÕÖ»∞ÅùïÕ—•ΩπÖ»ÅºÅù…’¡ΩÃÅ¡Ö…—•ç’±Ö…ïÃ∏ÅYÖèµºÅï·Öç—ºÅ9%9i8ÅQ=I9<Å8ÅUIM<∏ÅMï±ïççßÕ∏ÅÖâ…îÅMçΩ…ïÃÅ—Ω…πïºÅ‰ÅÕ’ÃÅΩ¡ç•ΩπïÃÅM=ILÅ9I0∞ÅM=ILÅA=HÅQ=K5Å‰Å5%LÅY=I%Q=L∏Å1ΩÃÅ”µ—’±ΩÃÅï±ïù•ëΩÃÅ¡ï…Õ•Õ—ï∏ÅëïÕ¡◊•ÃÅëîÅ…ïô…ïÕçÖ»ÅÕçΩ…ïÃ∏ÅM=ILÅ5$ÅIUA<ÅçΩπÕï…ŸÑÅÕ‘Å”µ—’±ºÅï∏Å±ÑÅÖ¡ï…—’…ÑÅ‰Å±ΩÃÅ…ïô…ïÕçΩÃ∏Å	Ω”Õ∏ÅëîÅ±ÑÅ—Ö…©ï—ÑÅÖâ…îÅï∞Åë•…ïç—Ω…•ºÅ•πç±’ÕºÅÕ•∏Å—Ω…πïºÅÖÕΩç•ÖëºÏÅï∞Å…ï—Ω…πºÅçΩπÕï…ŸÑÅ—Ö…©ï—ÑΩç’ïπ—Ñ∏ÅA$ÅÖç—•Ÿï=π±‰Åô•±—…ÑÅô•πÖ±•ÈÖëΩÃÅÕ•∏ÅçÖµâ•Ö»Åï∞Åë•…ïç—Ω…•ºÅ’ÕÖëºÅ¡Ω»ÅΩ—…ΩÃÅô±’©ΩÃÅπ§Å±ΩÃÅ¡ï…µ•ÕΩÃÅëï∞ÅÕï…Ÿ•ëΩ»∏ÅA…’ïâÖÃÅë•…•ù•ëÖÃËÅΩç°ºÅ—Ω…πïΩÃÅÕ•∏Å≥µµ•—îÅ±ΩçÖ∞ÅëîÅç•πçºÏÅï·ç±’ÕßÕ∏ÅëîÅô•πÖ±•ÈÖëºÏÅµïπÕÖ©îÅŸÖèµºÏÅ”µ—’±ΩÃÅ‰Å…ï—Ω…πº∏Å%5|‘ÿ‹ÿÅçΩπô•…µÑÅë•Õ¡ΩÕ•çßÕ∏ÅHƒ‘¿ÅëîÅ±ΩÃÅëΩÃÅMçΩ…ïÃÅ©’π—ΩÃÅ‰Åïπ—…ÖëÑÅÖ∞Åù…’¡ºÅëïâÖ©º∞ÅÕ•∏Åπ’ïŸÑÅΩ…ëï∏ÅëîÅµΩë•ô•çÖçßÕ∏∏ÅIΩ±±âÖç¨ÅHƒ‘ÃÅâàÿ¿‹¿—Ñ…àÿ‘¡Öå‘‰…î¿·ôÖê‰ÿÕÑ‘›òÂà…ê‰ÿ‹‘–∏Åπ—…ïùÑÅÖ’—Ω…•ÈÖëÑÅÑÅ¡…Ωë’ççßÕ∏∞Å1ÅïÕ—Öâ±îÅ‰ÅΩ…•ùï∏Å•πÕ—Ö±ÖëºÅΩâ±•ùÖ—Ω…•ºÅëîÅ±ÑÅµÖ—…•ËÏÅπºÅÖô•…µÖ»Å¡…’ïâÑÅõµÕ•çÑÅëîÅ•A°Ωπî∏(¥ÅÅÖ¡§Ω¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ÅºÅçΩπ—…Ω∞ÅHƒ‘–∏(¥ÅÅ±•Ÿîµ°’àπ©ÕÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ÅºÅçΩπ—…Ω∞ÅHƒ‘–∏(¥ÅÅ±•Ÿîµ°’àπ°—µ±ÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ÅºÅçΩπ—…Ω∞ÅHƒ‘–∏(¥ÅÅ•πëï‡µù…’¡Ö∞π°—µ±ÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ÅºÅçΩπ—…Ω∞ÅHƒ‘–∏(¥ÅÅ¡…•ŸÖ—îµ…Ω’πëÃπ©ÕÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ÅºÅçΩπ—…Ω∞ÅHƒ‘–∏(¥ÅÅÕçΩ…ïÃµ’§π©ÕÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ÅºÅçΩπ—…Ω∞ÅHƒ‘–∏(¥ÅÅÕ°Ω…—ç’—Ãµ’§π©ÕÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ÅºÅçΩπ—…Ω∞ÅHƒ‘–∏(¥ÅÅ…ï±ïÖÕîπ©ÕΩπÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ÅºÅçΩπ—…Ω∞ÅHƒ‘–∏(¥ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ÅºÅçΩπ—…Ω∞ÅHƒ‘–∏(¥ÅÅ—ïÕ–µïŸïπ–µë•…ïç—Ω…‰µçΩëîπµ©ÕÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ÅºÅçΩπ—…Ω∞ÅHƒ‘–∏(¥ÅÅ—ïÕ–µ±Öàµ—Ω’…πÖµïπ–µπÖŸ•ùÖ—•Ω∏πµ©ÕÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ÅºÅçΩπ—…Ω∞ÅHƒ‘–∏(¥ÅÅ—ïÕ–µµïπ‘µÕçΩ…ïçÖ…êµ—Ω’…πÖµïπ–µÕÂπåπµ©ÕÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ÅºÅçΩπ—…Ω∞ÅHƒ‘–∏(¥ÅÅI=5A}=YI10πµëÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ÅºÅçΩπ—…Ω∞ÅHƒ‘–∏(¥ÅÅI=5A}}Q11πµëÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ÅºÅçΩπ—…Ω∞ÅHƒ‘–∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµëÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ÅºÅçΩπ—…Ω∞ÅHƒ‘–∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=LπµëÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ÅºÅçΩπ—…Ω∞ÅHƒ‘–∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ÅºÅçΩπ—…Ω∞ÅHƒ‘–∏(¥ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµëÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ÅºÅçΩπ—…Ω∞ÅHƒ‘–∏(¥ÅÅ—ïÕ–µ±Öàµ…ïù•Õ—…Ö—•Ω∏µ¡…•ŸÖ—îµ…Ω’πëÃµïπ—…‰πµ©ÕÄÉ
‹Å¡…’ïâÑÅëîÅÕï¡Ö…ÖçßÕ∏ÅëîÅù…’¡ΩÃÅ‰Åë•…ïç—Ω…•ºÅëîÅ—Ω…πïΩÃÅHƒ‘–∏(¥ÅÅÕç…•¡—ÃΩµÖπ’Ö∞µÕç…ïï∏µ¡Ö…•—‰µùÖ—îπµ©ÕÄÉ
‹ÅπΩµâ…îÅI=9LÅUILÅÖ±•πïÖëºÅçΩ∏ÅΩ¡çßÕ∏Åëï∞ÅµïªËÏÅ¡Ö…•ëÖêÅΩ¡ï…Ö—•ŸÑÅçΩπÕï…ŸÖëÑÅHƒ‘–∏()µ¡±•ÖçßÕ∏Åï·¡…ïÕÑÄ»¿Ë¿ƒËÅ	UMHÅ)U=HÅÕîÅ…ï—•…ÑÅëï∞ÅµïªËÅ¡…•πç•¡Ö∞Å‰ÅÕîÅµ’ïÕ—…ÑÅ©’π—ºÅÑÅïπï…Ö∞ΩÖ—ïùΩÀµÖÃΩÖŸΩ…•—ΩÃÅï∏Åï∞Å—Ω…πïºÅÕï±ïçç•ΩπÖëº∏ÅM‘Å”µ—’±ºÅ	UMHÅ)U=HÅ¡ï…Õ•Õ—î∏ÅIHÅQ=I9<ÅïÃÅï·ç±’Õ•ŸÖµïπ—îÅ±ÑÅÖççßÕ∏Å‰Åï∞ÅëßÖ±ΩùºÅëîÅç…ïÖçßÕ∏ÏÅπ•πüÈ∏Å”µ—’±ºÅëîÅMçΩ…ïÃÅ’ÕÑÅïÕÑÅï—•≈’ï—Ñ∏ÅA…’ïâÖÃÅ‰ÅçΩπ—…Ö—ΩÃÅëîÅµïªËÅÖç—’Ö±•ÈÖëΩÃËÅÅ—ïÕ–µ±ÖàµÕ°Ω…—ç’—ÃµπÖŸ•ùÖ—•Ω∏πµ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµù±ΩâÖ∞µΩ¡ï…Ö—•ΩπÖ∞µÖ’ë•–πµ©ÕÄ∏(((ååÅHƒ‘‘É
‹ÅçΩµ¡…ΩâÖçßÕ∏ÅŸ•Õ•â±îÅëîÅ	’ÕçÖ»Å©’ùÖëΩ»Åï∏Å—Ω…πïºÉ
‹Ä»ÅëîÅΩç—’â…îÅëîÄ»¿»ÿ()IïçΩ……•ëºÅ…ïÖ∞ÅHƒ‘–Åëï—ïç”ÃÅ…ïù±ÑÅ°ï…ïëÖëÑÅï∏ÅÕçΩ…ïÃµ’§πçÕÃÅ≈’îÅΩç’±—ÖâÑÅ°’âM°Ω›%πë•Ÿ•ë’Ö∞ÅÖ’∏ÅëïÕ¡◊•ÃÅëîÅ…ï—•…Ö»Å±ÑÅ…ïù±ÑÅ!Q50∏ÅMîÅ…ï—•…ÑÅïÕÑÅ…ïù±ÑÏÅ	’ÕçÖ»Å©’ùÖëΩ»ÅÕîÅµ’ïÕ—…ÑÅïπ—…îÅΩ¡ç•ΩπïÃÅëîÅ—Ω…πïºÅÕï±ïçç•ΩπÖëº∞Å¡ï…µÖπïçîÅô’ï…ÑÅëï∞ÅµïªËÅ¡…•πç•¡Ö∞∏ÅMçΩ…ïÃÅQΩ…πïºÅŸÖèµºÅçΩµ¡…ΩâÖëºÅï∏ÅΩ…•ùï∏Å•πÕ—Ö±ÖëºÅÕ•∏Å…ïÖ»Å—Ω…πïº∞Å…’¡ΩÃÅ¡Ö…—•ç’±Ö…ïÃÅ‘ÅΩ¡ç•ΩπïÃÅÖ©ïπÖÃ∏Åïπï…Ö∞ΩÖ—ïùΩÀµÖÃΩÖŸΩ…•—ΩÃΩÈÕ≈’ïëÑÅÕîÅ…ïŸ•ÕÖ∏Åï∏ÅëïµºÅ•ëïπ—•ô•çÖëºÏÅπºÅÕîÅÖô•…µÑÅ¡…’ïâÑÅõµÕ•çÑÅ•A°ΩπîÅπ§Å—Ω…πïºÅëîÅ’Õ’Ö…•ºÅ•πï·•Õ—ïπ—î∏ÅMï±ïççßÕ∏ÅëîÅ—ï·—ºÅâ±Ω≈’ïÖëÑÅ¡Ω»ÅMLÅï∏Å”µ—’±ΩÃΩâΩ—ΩπïÃÅ‰ÅçÖµ¡ΩÃÅëîÅïπ—…ÖëÑÅçΩπÕï…ŸÖëΩÃ∏Åç—’Ö±•ÈÖçßÕ∏Å1ÅïÕ—Öâ±îÅçΩµ¡…ΩâÖëÑÅçΩ∏Å—Ö…©ï—ÑÅEÅHƒ–‡ÅÕçΩ…ïÃÅ°ΩÂΩÃƒº»Å¡…ïÕï…ŸÖëΩÃ∏ÅIΩ±±âÖç¨ÅHƒ‘–ÅÖÑ¡ò≈òÃÂÑŸå‘≈ê‹ÿ–¡âà…å’î›ê–ÃÕî–—ôò‰ƒÂå›î∏ÅA’â±•çÖçßÕ∏ÅÖ’—Ω…•ÈÖëÑÅï∏Å±ΩÃÅ—…ïÃÅëïÕ—•πΩÃÅëîÅµÖ—…•Ë∏(¥ÅÅÕçΩ…ïÃµ’§πçÕÕÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ÅºÅçΩπ—…Ω∞ÅHƒ‘‘∏(¥ÅÅ…ï±ïÖÕîπ©ÕΩπÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ÅºÅçΩπ—…Ω∞ÅHƒ‘‘∏(¥ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ÅºÅçΩπ—…Ω∞ÅHƒ‘‘∏(¥ÅÅ•πëï‡µù…’¡Ö∞π°—µ±ÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ÅºÅçΩπ—…Ω∞ÅHƒ‘‘∏(¥ÅÅI=5A}=YI10πµëÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ÅºÅçΩπ—…Ω∞ÅHƒ‘‘∏(¥ÅÅI=5A}}Q11πµëÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ÅºÅçΩπ—…Ω∞ÅHƒ‘‘∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµëÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ÅºÅçΩπ—…Ω∞ÅHƒ‘‘∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=LπµëÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ÅºÅçΩπ—…Ω∞ÅHƒ‘‘∏(¥ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµëÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ÅºÅçΩπ—…Ω∞ÅHƒ‘‘∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ÅºÅçΩπ—…Ω∞ÅHƒ‘‘∏(¥ÅÅ—ïÕ–µ±Öàµ—Ω’…πÖµïπ–µπÖŸ•ùÖ—•Ω∏πµ©ÕÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ÅºÅçΩπ—…Ω∞ÅHƒ‘‘∏(((åååÅHƒ‘‘É
‹Å¡ï…—ïπïπç•ÑÅ…ïÖ∞Å‰ÅÕÖ±•ëÑÅëîÅù…’¡º)M•∏Å¡ï…—ïπïπç•ÑÅ…ïÖ∞ËÄ®©9<ÅAIQ9LÅÅ9%9i8ÅIUA<®®∏Å1ÑÅ—Ö…©ï—ÑÅ•πë•Ÿ•ë’Ö∞ÅπºÅÕîÅ¡…ïÕïπ—ÑÅçΩµºÅù…’¡º∏Ä®©M1%HÅ0ÅIUA<®®Å©’π—ºÅÑÄ®©%9IMHÅÅIUA<®®ÅëïÕŸ•πç’±ÑÉÈπ•çÖµïπ—îÅï∞ÅÕ—…ïÖ¥Å¡…Ω¡•ºÅ‰ÅÕ‘Å…ΩÕ—ï»∞ÅçΩπÕï…ŸÑÅ©’ùÖëΩ…ïÃ∞ÅÕçΩ…ïÃÅ‰Å—ïµ¡Ω…•ÈÖëΩ»∞Å‰Å¡ï…µ•—îÅŸΩ±Ÿï»ÅÑÅïπ—…Ö»ÅçΩ∏ÅèÕë•ùº∏ÅA$Åπ•ïùÑÅÕÖ±•ëÑÅëîÅΩ—…ÑÅç’ïπ—ÑÅ‰ÅçΩπÕï…ŸÑÅÖëµ•π•Õ—…ÖçßÕ∏Åëï∞Åç…ïÖëΩ»∏ÅA…’ïâÖÃÅY4Å‰ÅâÖÕîÅ…ïÖ∞ËÅAML∏(¥ÅÅÖ¡§Ω¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄÉ
‹ÅµΩë•ô•çÖçßÕ∏Å‰Å¡…’ïâÑÅHƒ‘‘∏(¥ÅÅÖ¡§Ω±•Ÿîπ©ÕÄÉ
‹ÅµΩë•ô•çÖçßÕ∏Å‰Å¡…’ïâÑÅHƒ‘‘∏(¥ÅÅ±•ŸîµçΩπ—…Ω∞π©ÕÄÉ
‹ÅµΩë•ô•çÖçßÕ∏Å‰Å¡…’ïâÑÅHƒ‘‘∏(¥ÅÅ¡…•ŸÖ—îµ…Ω’πëÃπ©ÕÄÉ
‹ÅµΩë•ô•çÖçßÕ∏Å‰Å¡…’ïâÑÅHƒ‘‘∏(¥ÅÅ—ïÕ–µ»»–µïŸïπ–µç…ïÖ—•Ω∏µôïïëâÖç¨πµ©ÕÄÉ
‹ÅµΩë•ô•çÖçßÕ∏Å‰Å¡…’ïâÑÅHƒ‘‘∏(¥ÅÅ—ïÕ–µïŸïπ–µë•…ïç—Ω…‰µçΩëîπµ©ÕÄÉ
‹ÅµΩë•ô•çÖçßÕ∏Å‰Å¡…’ïâÑÅHƒ‘‘∏(¥ÅÅ—ïÕ–µ»ƒ‘‘µ¡…•ŸÖ—îµù…Ω’¿µï·•–πµ©ÕÄÉ
‹ÅµΩë•ô•çÖçßÕ∏Å‰Å¡…’ïâÑÅHƒ‘‘∏(¥ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄÉ
‹ÅµΩë•ô•çÖçßÕ∏Å‰Å¡…’ïâÑÅHƒ‘‘∏(((ååÅHƒ‘ÿÉ
‹Ä»ÅΩç—’â…îÄ»¿»ÿÉ
‹Å•πù…ïÕºÅ‰ÅçΩµ¡Ö…—•çßÕ∏ÅëîÅ—Ω…πïº((ÅµÖ•∏ÅÑ‹‘¿…ïâçò‹‰Ã¡ê—àÿƒ…àƒÕê‰›à¡àÂòƒ‹≈ÑÕôÑ‰ŸîÏÅçÖ¡—’…ÖÃÅ%5|›ÿ‹–ÿ¿»Å‰Å%5|‡‰ÿ·¿Ä°]°Ö—Õ¡¿§∞Å%5|‘ÿ‡‹Ä°=…ùÖπ•ÈÖëΩ»§∞Å%5|‘ÿ‡‡º‘ÿ‡‰Ä°Öëµ•π•Õ—…ÖçßÕ∏§ÏÉÕ…ëïπïÃÅëîÄ»ÅΩç—’â…îÄ»¿»ÿÄ»¿Ë‘„äL»ƒËƒ‘Å’Ö—ïµÖ±Ñ∏()±çÖπçîËÅIHÅQ=I9<ÉÈπ•çÖµïπ—îÅï∏Å=…ùÖπ•ÈÖëΩ»∏ÅQ=I9<Åï∏Å5ΩëÖ±•ëÖêÅ¡•ëîÅèÕë•ùºÅë•…ïç—Öµïπ—îÅ‰ÅçΩπÕï…ŸÑÅA$ÅΩô•ç•Ö∞Å©Ω•∏µçΩëî∏ÅΩµ¡Ö…—•»Å’ÕÑÅ’πÑÅUI0Åï∏Åï∞Å—ï·—ºÅ¡Ö…ÑÅ•µ¡ïë•»Åë’¡±•çÖçßÕ∏Å¡Ω»Å]ïàÅM°Ö…î∏ÅI’—ÑÄΩ—Ω…πïºΩ9=5	IÅçΩ∏ÅïŸïπ—ºΩèÕë•ùºÅï∏Åô…Öùµïπ—ºÏÅ•ëïπ—•ëÖêÅïÕ—Öâ±îÅ•πëï¡ïπë•ïπ—îÅëï∞ÅπΩµâ…îÅ¡Ö…ÑÅçΩπÕï…ŸÖ»Åïπ±ÖçïÃÅÖπ—ï…•Ω…ïÃ∏Å1ÑÅA$ÅŸÖ±•ëÑÅÖççïÕºÅÖπ—ïÃÅëîÅ¡…ï¡Ö…Ö»ÅIïù•Õ—…ºÅ‰Åï∞ÅπΩµâ…îÅµΩÕ—…ÖëºÅŸ•ïπîÅëï∞ÅÕï…Ÿ•ëΩ»∏Å1ÑÅ•πŸ•—ÖçßÕ∏ÅπºÅçΩπçïëîÅïë•çßÕ∏Å°ÖÕ—ÑÅ©Ω•∏µçΩëî∏Å%ÅÅQ=I9<Åëïπ—…ºÅëîÅ=…ùÖπ•ÈÖëΩ»ÏÅçΩµ¡…ΩâÖçßÕ∏ÅëîÅ…Ω∞Å‰ÅïŸïπ—ºÅÖπ—ïÃÅëîÅçΩµ¡Ö…—•»∏ÅΩπ—…Ω±ïÃÅÖëµ•π•Õ—…Ö—•ŸΩÃÅÖù…’¡ÖëΩÃÅï∏Åëï—Ö•±ÃÅçï……ÖëΩÃÏÅ±Ωù•∏Å¡…Ω¡•ï—Ö…•ºÅΩç’±—ºÅœÕ±ºÅçΩ∏ÅΩ›πï»È—…’î∏ÅM•∏ÅÖ±—ï…ÖçßÕ∏ÅëîÅ¡ï…µ•ÕΩÃÅëîÅ±ÖÃÅA%ÃÅπ§ÅµΩ—Ω»ÅëîÅÕçΩ…ïÃ∏()çï¡—ÖçßÕ∏ËÅèÕë•ùºÅ•π€Ö±•ëºÅπºÅçΩπïç—ÑÏÅèÕë•ùºÅ€Ö±•ëºÅçΩπÕï…ŸÑÅÕπÖ¡Õ°Ω–ÏÅπºÅë•…ïç—Ω…•ºÅï∏Å•πù…ïÕºÅ—Ω…πïºÏÅ¡…•ŸÖëΩÃÅçΩπÕï…ŸÖ∏ÅÕï±ïççßÕ∏Å‰ÅèÕë•ùºÏÅπΩµâ…îÅÖç—’Ö±•ÈÖëºÅï∏Åπ’ïŸΩÃÅïπ±ÖçïÃÅ‰ÅëïÕ—•πºÅÖç—’Ö∞Åï∏ÅŸ•ï©ΩÃÏÅ©’ùÖëΩ»ÅÕ•∏ÅçΩπ—…Ω±ïÃÅëîÅçΩµ¡Ö…—•»ÏÅçÖπçï±ÖçßÕ∏ÅçΩπÕï…ŸÑÅ…ïç’¡ï…ÖçßÕ∏ÏÅëµ•π•Õ—…ÖçßÕ∏Å¡…•πç•¡Ö∞Åµ’ïÕ—…ÑÅïŸïπ—ΩÃÅ‰Å±•µ•πÖ»∞Å¡ï…µ•ÕΩÃÅÕïç’πëÖ…•ΩÃÅçï……ÖëΩÃ∏()I•ïÕùΩÃËÅ¡ï…µ•ÕΩÃÅï·¡’ïÕ—ΩÃ∞Åïπ±ÖçîÅë•…•ù•ëºÅÑÅΩ—…ºÅïŸïπ—º∞ÅπΩµâ…îÅÖπ—•ù’º∞ÅëΩâ±îÅUI0∞Å√•…ë•ëÑÅëîÅ—Ö…©ï—Ñ∞ÅÕç…•¡—ÃÅ…ï±Ö—•ŸΩÃÅâÖ©ºÅ…’—ÑÅ¡ï…ÕΩπÖ±•ÈÖëÑ∏ÅΩπ—…Ω±ïÃËÅ•ëïπ—•ëÖêΩïŸïπ—ºÅŸÖ±•ëÖëºÅ¡Ω»ÅA$ÏÅπΩµâ…îÅ…ïµΩ—ºÏÅô…Öùµïπ—ºÅπºÅïπŸ•ÖëºÅÖ∞ÅÕï…Ÿ•ëΩ»Å‰ÅâΩ……ÖëºÅëîÅë•…ïççßÕ∏ÅÖ∞ÅçΩπÕ’µ•»ÏÅ…ïë•…ïç–ÅÑÅ…’—ÑÅ¡…•πç•¡Ö∞ÏÅ…ïù…ïÕßÕ∏ÅëîÅ—Ö…©ï—ÑΩ…ï±Ω®Å‰Åù…’¡ΩÃÅ¡…•ŸÖëΩÃ∏()A±Ö∏ËÅ—ïÕ–µ»ƒ‘ÿµ—Ω’…πÖµïπ–µ•πŸ•—Ö—•Ω∏πµ©Ã∞Å—ïÕ–µ±Öàµ¡…•ŸÖ—îµ…Ω’πêµÕ°Ö…îµô±Ω‹πµ©Ã∞Å—ïÕ–µΩ…ùÖπ•Èï»µ—Ω’…πÖµïπ–µïπ—…‰πµ©Ã∞ÅâÖπçºÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©Ã∞Å¡’ï…—ÖÃÅëîÅ¡…ΩÂïç—ºΩI=5@Ω•πŸïπ—Ö…•ΩÃÏÅπÖŸïùÖçßÕ∏Å∑ÕŸ•∞Å…ïÖ∞ÅÕΩâ…îÅA…ïŸ•ï‹ÅÖπ—ïÃÅëîÅ¡’â±•çÖ»∏Å9ºÅÕîÅëïç±Ö…ÑÅ¡…’ïâÑÅõµÕ•çÑÅëîÅ•A°Ωπî∏()IΩ±±âÖç¨ËÅÑ‹‘¿…ïàÏÅπºÅµ•ù…Öç•ΩπïÃÅπ§Åï±•µ•πÖçßÕ∏ÅëîÅëÖ—ΩÃ∏Å9ºÅçÖµâ•Ö»ÅΩÀµùïπïÃÅï·•Õ—ïπ—ïÃÅ¡Ö…ÑÅçΩπÕï…ŸÖ»ÅÖ±µÖçïπÖµ•ïπ—º∏()Ωµ•π•ºÅÕΩ±•ç•—ÖëºËÅùΩ±òµÕçΩ…îµçÖ…êπŸï…çï∞πÖ¡¿Å…ïÕ¡ΩπëîÅ!QQ@»¿¿∞Å”µ—’±ºÅ…ïÖ—îÅ9ï·–Å¡¿ÏÅπºÅôΩ…µÑÅ¡Ö…—îÅëîÅ±ΩÃÅëΩµ•π•ΩÃÅëîÅAÅdÅï∏Å±ÑÅç’ïπ—ÑÅï¡ùçÖëëÂÃµ¡…Ω©ïç—Ã∏ÅÕ•ùπÖçßÕ∏ÅπºÅçΩµ¡…ΩâÖëÑÅ‰ÅπºÅ…ïÖ±•ÈÖëÑ∏ÅUI1ÃÅëîÅïÕ—îÉÖ…âΩ∞Å’ÕÖ∏Åï∞ÅΩ…•ùï∏Åï·•Õ—ïπ—îÏÅπºÅïπŸ•Ö»Åïπ±ÖçïÃÅçΩ∏ÅëΩµ•π•ºÅÕΩ±•ç•—ÖëºÅ°ÖÕ—ÑÅçΩπô•…µÖçßÕ∏Åïôïç—•ŸÑ∏()Ÿ•ëïπç•ÑÅ±ΩçÖ∞ËÅâÖπçºÅçΩµ¡±ï—ºÅ‰ÅÖµâÖÃÅ¡’ï…—ÖÃÅ¡…Ω©ïç–µ≈’Ö±•—‰ÅAML∏Å°…Ωµ•’¥Å±ΩçÖ∞ÅÖ’Õïπ—îÏÅ•π—ïπ—ºÅëîÅ•πÕ—Ö±ÖçßÕ∏ÅëïŸ’ï±ŸîÅÖ…ç°•ŸºÅπºÅi%@Å‰Å—ï…µ•πÑÅôÖ±±º∏Å9ºÅÕîÅÕ•µ’±ÑÅπÖŸïùÖëΩ»Åπ§Å•A°Ωπî∏ÅA…ïŸ•ï‹Å…ïµΩ—ºÅ¡ïπë•ïπ—î∏(()…ç°•ŸΩÃÅëîÅïÕ—ÑÅŸï…ÕßÕ∏Ë(¥ÅÅïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏µ’§π©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞Å¡…’ïâÑÅºÅçΩπ—…Ω∞ÅHƒ‘ÿ∏(¥ÅÅïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏π°—µ±ÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞Å¡…’ïâÑÅºÅçΩπ—…Ω∞ÅHƒ‘ÿ∏(¥ÅÅ•πëï‡µù…’¡Ö∞π°—µ±ÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞Å¡…’ïâÑÅºÅçΩπ—…Ω∞ÅHƒ‘ÿ∏(¥ÅÅ¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞Å¡…’ïâÑÅºÅçΩπ—…Ω∞ÅHƒ‘ÿ∏(¥ÅÅÕ°Ω…—ç’—Ãµ’§π©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞Å¡…’ïâÑÅºÅçΩπ—…Ω∞ÅHƒ‘ÿ∏(¥ÅÅŸï…çï∞π©ÕΩπÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞Å¡…’ïâÑÅºÅçΩπ—…Ω∞ÅHƒ‘ÿ∏(¥ÅÅ…ï±ïÖÕîπ©ÕΩπÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞Å¡…’ïâÑÅºÅçΩπ—…Ω∞ÅHƒ‘ÿ∏(¥ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞Å¡…’ïâÑÅºÅçΩπ—…Ω∞ÅHƒ‘ÿ∏(¥ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞Å¡…’ïâÑÅºÅçΩπ—…Ω∞ÅHƒ‘ÿ∏(¥ÅÅ—ïÕ–µ±Öàµ¡…•ŸÖ—îµ…Ω’πêµÕ°Ö…îµô±Ω‹πµ©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞Å¡…’ïâÑÅºÅçΩπ—…Ω∞ÅHƒ‘ÿ∏(¥ÅÅ—ïÕ–µ±Öàµ…ïù•Õ—…Ö—•Ω∏µ¡…•ŸÖ—îµ…Ω’πëÃµïπ—…‰πµ©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞Å¡…’ïâÑÅºÅçΩπ—…Ω∞ÅHƒ‘ÿ∏(¥ÅÅ—ïÕ–µΩ…ùÖπ•Èï»µ—Ω’…πÖµïπ–µïπ—…‰πµ©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞Å¡…’ïâÑÅºÅçΩπ—…Ω∞ÅHƒ‘ÿ∏(¥ÅÅ—ïÕ–µ»ƒ‘ÿµ—Ω’…πÖµïπ–µ•πŸ•—Ö—•Ω∏πµ©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞Å¡…’ïâÑÅºÅçΩπ—…Ω∞ÅHƒ‘ÿ∏(¥ÅÅI=5A}=YI10πµëÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞Å¡…’ïâÑÅºÅçΩπ—…Ω∞ÅHƒ‘ÿ∏(¥ÅÅI=5A}}Q11πµëÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞Å¡…’ïâÑÅºÅçΩπ—…Ω∞ÅHƒ‘ÿ∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩAQ%=9}Hƒ‘Ÿ}%9Y%Q%=9LπµëÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞Å¡…’ïâÑÅºÅçΩπ—…Ω∞ÅHƒ‘ÿ∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµëÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞Å¡…’ïâÑÅºÅçΩπ—…Ω∞ÅHƒ‘ÿ∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=LπµëÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞Å¡…’ïâÑÅºÅçΩπ—…Ω∞ÅHƒ‘ÿ∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞Å¡…’ïâÑÅºÅçΩπ—…Ω∞ÅHƒ‘ÿ∏(¥ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµëÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞Å¡…’ïâÑÅºÅçΩπ—…Ω∞ÅHƒ‘ÿ∏(((åååÅHƒ‘ÿÉ
‹Åç•ï……îÅ±ΩçÖ∞Å‰Åâ±Ω≈’ïºÅëîÅïπ—…ïùÑ)IïŸ•ÕßÕ∏ÅÖ’—Ω∑Ö—•çÑÅ…ïç°ÖÎÃÅù•–Å¡’Õ†ÅëîÅô•‡Ω»ƒ‘ÿµ—Ω’…πÖµïπ–µ•πŸ•—Ö—•Ω∏ÅÖ∞Å…ï¡ΩÕ•—Ω…•ºÅçÖªÕπ•çº∏Å9ºÅÕîÅ°ÑÅï±’ë•ëºÅ¡Ω»ÅΩ—…ºÅ—…ÖπÕ¡Ω…—î∏ÅA…ïŸ•ï‹ΩπÖŸïùÖëΩ»Å√Èâ±•çºÅ¡ïπë•ïπ—ïÃÅ‰ÅA…Ωë’ççßÕ∏ÅÕ•∏Å¡…ΩµΩçßÕ∏∏ÅÖ±—ÑÅÖ’—Ω…•ÈÖçßÕ∏Åï·¡≥µç•—ÑÅëï∞Å¡…Ω¡•ï—Ö…•ºÅ¡Ö…ÑÅÕ’â•»ÅïÕ—ÑÅ…ÖµÑ∏Å1ÑÅëïÕçÖ…ùÑÅ±ΩçÖ∞ÅëîÅ°…Ωµ•’¥ÅôÖ±≥ÃÅçΩµºÅi%@Å•πçΩµ¡±ï—ºÏÅπºÅ¡…’ïâÑÅëîÅπÖŸïùÖëΩ»Åπ§Å•A°Ωπî∏(¥ÅÅ—ïÕ–µ—Ω’…πÖµïπ–µçΩëîµ…Ω’πêµâ•πë•πúπµ©ÕÄÉ
‹Åï·•ùîÅΩç’±—Ö»Å±ÑÅÕ’¡ï…ô•ç•îÅ°•Õ”Õ…•çÑÅëîÅèÕë•ùºÅëîÅ—Ω…πïºÅï∏Å—Ö…©ï—Ñ∞Å—Öµâß•∏ÅÖ∞Åç…ïÖëΩ»ÏÅ=…ùÖπ•ÈÖëΩ»ÅçΩπÕï…ŸÑÅçΩµ¡Ö…—•»∞Åù…’¡ΩÃÅ¡…•ŸÖëΩÃÅçΩπÕï…ŸÖ∏ÅçΩπ—…Ö—º∏(((åååÅHƒ‘ÿÉ
‹ÅÖ’—Ω…•ÈÖçßÕ∏ÅëîÅÕ’â•ëÑÉ
‹Ä»ÅΩç—’â…îÄ»¿»ÿÄ»ƒË»ÃÅ’Ö—ïµÖ±Ñ)∞Å¡…Ω¡•ï—Ö…•ºÅÖ’—Ω…•ÎÃÅï·¡≥µç•—Öµïπ—îÅ±ÑÅÕ’â•ëÑ∏Å∞ÅçΩπïç—Ω»Å•—!’àÅçΩπô•…∑ÃÅ¡…Ω¡•ï—Ö…•ºÅAd∞Åµ•ÕµºÅ%ÅëîÅ±ÑÅç’ïπ—ÑÅçΩπïç—ÖëÑ∞Å¡ï…µ•ÕΩÃÅÖëµ•∏Ω¡’Õ†Åï∏ÅAdΩAµd∏ÅMîÅ±ïŸÖπ—ÑÅï∞Åâ±Ω≈’ïºÅëîÅÖ’—Ω…•ÈÖçßÕ∏ÏÅA…ïŸ•ï‹Å‰ÅπÖŸïùÖëΩ»ÅÕ•ù’ï∏Å¡ïπë•ïπ—ïÃ∞ÅÕ•∏Å¡…ΩµΩçßÕ∏ÅëîÅA…Ωë’ççßÕ∏∏(((åååÅHƒ‘ÿÉ
‹ÅA…ïŸ•ï‹ÅŸï…•ô•çÖëºÅ‰Åâ±Ω≈’ïºÅëîÅÖççïÕºÉ
‹Ä»ÅΩç—’â…îÄ»¿»ÿ)Õë•ùºÅ…ïµΩ—ºÅåÿ»‹¿ÕòƒÿÕëâå≈îŸê‹ÂÖÑ‡‰≈çå’ôçà‘»–ŸÑ‡·à‹¿ÏÉÖ…âΩ∞ÅïåÃÂâå»…à‡¿Õëôà≈ïÖëå»–Âçà‡ƒÃ–›ôê¿ƒ—îÿ’à–∏Åï¡±ΩÂµïπ–Å1ÅA…ïŸ•ï‹Åë¡±}	ù4Õπ‡…≈’≠4ŸYÖE¡’5¥≈…ËÕ9ÅId∞Å°——¡ÃËºΩùΩ±òµÕåµù–µ¨ÕµùâŸÿÃ»µï¡ùçÖëëÂÃµ¡…Ω©ïç—ÃπŸï…çï∞πÖ¡¿∏ÅççïÕºÅ—ïµ¡Ω…Ö∞ÅΩâ—ïπ•ëºÅµïë•Öπ—îÅï∞ÅçΩπïç—Ω»ÅΩô•ç•Ö∞ÅëîÅYï…çï∞ÏÅ¡…Ω—ïççßÕ∏ÅçΩπÕï…ŸÖëÑ∏)9ÖŸïùÖëΩ»Å°…ΩµîÅ…ïÖ∞ËÅHƒ‘ÿÅQU1%i<ÏÅ…ïÖ»Å—Ω…πïºÅîÅ%ÅëîÅ—Ω…πïºÅëïπ—…ºÅëîÅ=…ùÖπ•ÈÖëΩ»ÏÅëµ•π•Õ—…ÖçßÕ∏ÅçΩ∏ÅAI5%M=LÅ5%9%MQIQ%Y=LÅçï……ÖëºÏÅ5ΩëÖ±•ëÖêÅQ=I9<ÅÖâ…îÅ’∏ÉÈπ•çºÅçÖµ¡ºÅëïÕ¡◊•ÃÅëîÅ…ïù•Õ—…Ö»Å©’ùÖëΩ…ïÃÏÅèÕë•ùºÅ•π€Ö±•ëºÅ…ïç°ÖÈÖëºÅ‰ÅâΩ……ÖëΩ»ÅçΩπÕï…ŸÖëº∏ÄΩ—Ω…πïºΩ5$ÅçΩ∏ÅïŸïπ—ºΩèÕë•ùºÅëîÅ¡…’ïâÑÅçΩπÕï…ŸÑÅô…Öùµïπ—ºÅÖ∞Å…ïë•…•ù•»∞ÅÖâ…îÅ%9Y%Q'M8Å0ÅQ=I9<Å‰Å…ïç°ÖÈÑÅèÕë•ùºÅ•π€Ö±•ëºÏÅëïÕ¡◊•ÃÅâΩ……ÑÅï∞Åô…Öùµïπ—ºÅëîÅ±ÑÅë•…ïççßÕ∏∏ÅŸ•ëïπç•ÑËÅ=9QI=1}AI=eQ=}M%IΩY%9%}Hƒ‘Ÿ}5%9%MQI%=8π©¡ú∏Å9ºÅïÃÅ¡…’ïâÑÅõµÕ•çÑÅëîÅ•A°Ωπî∏)	1=EU<Å¡Ö…ÑÅô±’©ºÅ€Ö±•ëºÅçΩµ¡±ï—ºËÅA…ïŸ•ï‹Åµ’ïÕ—…ÑÅ9%9i8ÅQ=I9<Å8ÅUIM<ÏÅë•Õ¡ΩÕ•—•ŸºÅëîÅ¡…’ïâÑÅÕ•∏ÅÖ’—Ω…•ÈÖçßÕ∏ÅëîÅ=…ùÖπ•ÈÖëΩ»∏Å∞ÅôΩ…µ’±Ö…•ºÅÕïù’…ºÅëîÅÖççïÕºÅô’îÅïπŸ•ÖëºÅ‰Åï∞ÅÕ•—•ºÅ…ïÕ¡ΩπëßÃÅ=II<Å<Å=9QIMEÅ%9=IIQ=L∏Å9ºÅÕîÅ…ï¡•—îÅπ§ÅÕîÅ…ïù•Õ—…Ö∏Åç…ïëïπç•Ö±ïÃ∏ÅM•ù’•ïπ—îÅ•π—ï…ŸïπçßÕ∏Å•πë•Õ¡ïπÕÖâ±îËÅ¡…Ω¡•ï—Ö…•ºÅçΩµ¡±ï—ÑÅÕ‘ÅÖççïÕºÅï∏Åï∞ÅπÖŸïùÖëΩ»ÅëîÅ…ïŸ•ÕßÕ∏ÏÅ±’ïùºÅÖùïπ—îÅç…ïÑÅïŸïπ—ºÅëîÅ¡…’ïâÑ∞ÅŸï…•ô•çÑÅ•πŸ•—ÖçßÕ∏ΩèÕë•ùºÅ€Ö±•ëΩÃÅ‰Å¡…ΩµΩçßÕ∏ÅœÕ±ºÅÖ∞Åçï……Ö»Å¡ïπë•ïπ—ïÃ∏ÅA…Ωë’ççßÕ∏ΩµÖ•∏ΩΩ…•ùï∏Å•πÕ—Ö±ÖëºÅçΩπ—•ªÈÖ∏ÅHƒ‘‘∏ÅΩµ•π•ºÅùΩ±òµÕçΩ…îµçÖ…êπŸï…çï∞πÖ¡¿ÅÕ•∏ÅÖÕ•ùπÖ»ÏÅπºÅÕîÅÖô•…µÑÅAMLÅ•π—ïù…Ö∞Åπ§Å¡’â±•çÖçßÕ∏∏)Õ—îÅ¡’π—ºÅëîÅ…ïç’¡ï…ÖçßÕ∏ÅœÕ±ºÅá≈ÖëîÅëΩç’µïπ—ÖçßÕ∏∞ÅÕï±±ºÅ‰ÅïŸ•ëïπç•ÑÏÅ•µ¡±ïµïπ—ÖçßÕ∏Å•ì•π—•çÑÅÖ∞ÅèÕë•ùºÅåÿ»‹¿ÕòÅ¡…ΩâÖëº∏(((åååÅHƒ‘ÿÉ
‹ÅèÕë•ùºÅîÅ•πŸ•—ÖçßÕ∏Å€Ö±•ëΩÃÉ
‹Ä»ÅΩç—’â…îÄ»¿»ÿ)∞Å¡…Ω¡•ï—Ö…•ºÅÕ’µ•π•Õ—ÀÃÅï∞ÅèÕë•ùºÅëîÅ’∏Å—Ω…πïºÅëîÅ¡…’ïâÑ∏ÅMîÅ±ïŸÖπ”ÃÅï∞Åâ±Ω≈’ïºÅëîÅ±ÑÅ¡…’ïâÑÅëîÅ…ïçï¡—Ω»ÅÕ•∏Å…ï¡ï—•»ÅÖççïÕºÅëîÅ¡…Ω¡•ï—Ö…•º∏Å∏Å°…ΩµîÅ…ïÖ∞ÅÕΩâ…îÅåÿ»‹¿ÕòËÅ5ΩëÖ±•ëÖêÉäHÅQ=I9<ÉäHÅèÕë•ùºÅ€Ö±•ëºÅëïŸΩ±ŸßÃÅ1%MQ<Å‰ÅÖÕ•ùªÃÅïŸïπ—ºÏÅçΩπô•…µÖçßÕ∏ÅΩô•ç•Ö∞ÉäHÅ%9%%HÅI=9ÅÖâ…ßÃÅ—Ö…©ï—ÑÅëîÅAIU	ÅHƒ‘ÿ∞ÅçÖ—ïùΩÀµÑÅ∞Å!@Äƒ¿∞Å	±ÖπçÖÃ∞Å—Ω…πïºÅ)))Åï∏Å∞ÅA’±”§∏ÅI’—ÑÄΩ—Ω…πïºΩ)))ÅçΩ∏Å•ëïπ—•ëÖêÅïÕ—Öâ±îÅµΩÕ—ÀÃÅ)))∞Å%9Y%Q'M8Å0ÅQ=I9<Å‰ÅI%MQIHÅ5%LÅ)U=ILÏÅô…Öùµïπ—ºÅçΩπÕ’µ•ëºÅ‰Åï±•µ•πÖëº∏ÅŸ•ëïπç•ÑÅ=9QI=1}AI=eQ=}M%IΩY%9%}Hƒ‘Ÿ}Q=I9=}Y1%<π©¡úÏÅπºÅÕîÅù’Ö…ëÑÅèÕë•ùºÅëîÅÖççïÕºÅï∏ÅÖ…ç°•ŸΩÃÅπ§ÅçÖ¡—’…ÖÃÅ√Èâ±•çÖÃ∏)ïôïç—ºÅëîÅπÖŸïùÖçßÕ∏Åëï—ïç—ÖëºËÅëïÕ¡◊•ÃÅëîÅèÕë•ùºÅ€Ö±•ëºÅÕîÅëïŸΩ±€µÑÅÑÅIïù•Õ—…ºÅçΩ∏ÅëÖ—ΩÃÅÂÑÅŸÖ±•ëÖëΩÃÅ‰Åï·•üµÑÅΩ—…ºÅ=,∏ÅÖµâ•ºÅ•πç…ïµïπ—Ö∞Åï∏ÅΩ¡ïπÕÕ•ùπïëAï…ÕΩπÖ±MçΩ…ïÖ…êËÅ¡…ïÕïπ—Ö»Åë•…ïç—Öµïπ—îÅIY%MHÅ9QLÅÅ5AiHÅ¡Ö…ÑÅ±ÑÅÖÕ•ùπÖçßÕ∏Åùïπï…Ö∞∏ÅMîÅçΩπÕï…ŸÑÅïÕç…•—Ω»ÉÈπ•çºÅÕ—Ö…—Ωπô•…µïëIΩ’πêÅ‰ÅâΩ”Õ∏Å%9%%HÅI=9ÏÅπºÅÕîÅ•π•ç•ÑÅπ§ÅÕ’Õ—•—’ÂîÅ—Ö…©ï—ÑÅÖ’—Ω∑Ö—•çÖµïπ—î∏ÅIïù…ïÕßÕ∏ÅY4Åï∏Å—ïÕ–µ»ƒ‘ÿµ—Ω’…πÖµïπ–µ•πŸ•—Ö—•Ω∏πµ©ÃÅŸÖ±•ëÑÅµïµâ…ïœµÑ∞Å©’ùÖëΩ…ïÃΩçÖµ¡ºÅ‰ÅÖ’Õïπç•ÑÅëîÅ•π•ç•ºÅÖ’—Ω∑Ö—•çº∏Å	ÖπçºÅçΩµ¡±ï—ºÅ‰Åπ’ïŸÑÅ…ïŸ•ÕßÕ∏ÅA…ïŸ•ï‹ÅÖπ—ïÃÅëîÅ¡…ΩµΩŸï»∏ÅççïÕºÅëîÅ¡…Ω¡•ï—Ö…•ºÅ¡Ö…ÑÅçΩµ¡Ö…—•»ÅëïÕëîÅÕ‘Åë•Õ¡ΩÕ•—•ŸºÅ‰ÅëΩµ•π•ºÅπ’ïŸºÅçΩπ—•ªÈÖ∏Å¡ïπë•ïπ—ïÃÏÅA…Ωë’ççßÕ∏Å•π—Öç—Ñ∏)…ç°•ŸΩÃÅëîÅïÕ—îÅÖ©’Õ—îËÅ•πëï‡µù…’¡Ö∞π°—µ∞∞Å—ïÕ–µ»ƒ‘ÿµ—Ω’…πÖµïπ–µ•πŸ•—Ö—•Ω∏πµ©Ã∞Å=9QI=1}AI=eQ=}M%IΩY%9%}Hƒ‘Ÿ}Q=I9=}Y1%<π©¡ú∞Å=9QI=1}AI=eQ=}M%IΩAQ%=9}Hƒ‘Ÿ}%9Y%Q%=9Lπµê∞Å=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµê∞Å=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=Lπµê∞Å=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩ∏∞Å=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµê∞ÅI=5A}}Q11πµê∞ÅI=5A}=YI10πµê∏(((åååÅHƒ‘ÿÉ
‹Åç•ï……îÅ”•çπ•çºÅëîÅ…ïçï¡—Ω»É
‹Ä»ÅΩç—’â…îÄ»¿»ÿ)Ωµµ•–ÅëîÅèÕë•ùºÅî‡‰‘’å–Õî–Ÿî≈òŸê‰ƒ—å»ÿÃ–ÂÑ‡›çÑ‡Ã—Ñ·ÖçÑŸî∞Å1ÅA…ïŸ•ï‹Åë¡±|Ÿ©I∏·È…·Õ°X…‹≈ë1YIa\›Y—Ω§ÅId∞Å°——¡ÃËºΩùΩ±òµÕåµù–µçº’π∏·å’¨µï¡ùçÖëëÂÃµ¡…Ω©ïç—ÃπŸï…çï∞πÖ¡¿∏Å°…ΩµîÅ…ïÖ∞Åï∏ÅΩ…•ùï∏Å±•µ¡•ºËÅ•πŸ•—ÖçßÕ∏Å€Ö±•ëÑÅÖ∞Å—Ω…πïºÅëîÅ¡…’ïâÑÅ)))ÉäHÅI%MQIHÅ5%LÅ)U=ILÉäHÅAIU	ÅHƒ‘ÿÅ%90∞Å∞Å!@Äƒ¿∞Å	±ÖπçÖÃÉäHÅQ=I9<ÅçΩ∏ÅèÕë•ùºÅ¡…ï¡Ö…ÖëºÉäHÅ9QIHÉäHÅIY%MHÅ9QLÅÅ5AiH∞ÅÕ•∏Å=,Å…ï¡ï—•ëºÉäHÅ%9%%HÅI=9ÉäHÅI=9Å8ÅUIM<ÅŸ•πç’±ÖëÑÅÑÅ)))∏Å9Ωµâ…îÅ‰ÅçÖµ¡ºÅ…ïµΩ—ºÅçΩµ¡…ΩâÖëΩÃÏÅèÕë•ùºÅçΩπÕ’µ•ëºÅëïÕÖ¡Ö…ïçîÅëîÅ±ÑÅë•…ïççßÕ∏∏ÅÖ¡—’…ÑÅëîÅçΩπô•…µÖçßÕ∏ËÅ=9QI=1}AI=eQ=}M%IΩY%9%}Hƒ‘Ÿ}=9%I5%=9}%90π©¡ú∏Å	ÖπçºÅçΩµ¡±ï—ºÄΩ—µ¿Ω»ƒ‘ÿµçΩπô•…µÖ—•Ω∏µ•π—ïù…Ö∞π±ΩúÅ—ï…µ•ªÃÅï·•–¿ÅAML∏ÅQLÅëîÅçÖ±•ëÖê∞ÅI=5@Å‰ÅÕï±±º‡»‘ÅAMLÅÖπ—ïÃÅëîÅïÕ—îÅç•ï……îÅëΩç’µïπ—Ö∞∏Å9ºÅÕîÅëïç±Ö…ÑÅ•A°ΩπîÅõµÕ•çº∞ÅçÖµâ•ºÅ…ïµΩ—ºÅëîÅπΩµâ…îÅëïÕëîÅ…Ω∞Å¡…Ω¡•ï—Ö…•ºÅπ§Åπ’ïŸºÅëΩµ•π•ºÅÖÕ•ùπÖëº∏)Aïπë•ïπ—ïÃÅëîÅïπ—…ïùÑËÅÖçï¡—ÖçßÕ∏ΩÖ’—Ω…•ÈÖçßÕ∏Åï·¡…ïÕÑÅëîÅ¡’â±•çÖçßÕ∏ÅëîÅïÕ—îÅ…ïÕ’±—ÖëºÅçΩπç…ï—ºÅ‰Åëïç•ÕßÕ∏ΩÖÕ•ùπÖçßÕ∏Åëï∞ÅπΩµâ…îÅëîÅëΩµ•π•º∏ÅA…Ωë’ççßÕ∏∞ÅµÖ•∏Å‰ÅΩ…•ùï∏Å•πÕ—Ö±ÖëºÅçΩπ—•ªÈÖ∏ÅHƒ‘‘∏ÅAH–ÿÅçΩπ—•ïπîÅï∞Å…ïÕ’±—ÖëºÏÅπºÅµï…ùîÅÖ’—Ω∑Ö—•çº∏ÅM•ù’•ïπ—îÅ¡…Ω¡•ï—Ö…•ºËÅÖ’—Ω…•ÈÖ»Å¡’â±•çÖçßÕ∏ÅëîÅHƒ‘ÿÅçΩ∏ÅΩ…•ùï∏Åï·•Õ—ïπ—î∞ÅºÅ•πë•çÖ»Å≈’îÅÕîÅïÕ¡ï…ÑÅÖÕ•ùπÖçßÕ∏ÅëîÅëΩµ•π•º∏ÅïÕ¡◊•ÃÅëîÅÖ’—Ω…•ÈÖçßÕ∏∞ÅÖùïπ—îÅÖç—’Ö±•ÈÑÅµÖ•∏Å‰Å…ÖµÑÅëï∞ÅΩ…•ùï∏Å•πÕ—Ö±ÖëºÅÖ∞Åµ•ÕµºÉÖ…âΩ∞∞ÅçΩµ¡…’ïâÑÅÖµâÖÃÅÖ¡±•çÖç•ΩπïÃÅ‰ÅŸï…Õ•ΩπïÃ∞Å‰Å…ïù•Õ—…ÑÅ…ïÕ’±—ÖëºΩ…Ω±±âÖç¨∏)…ç°•ŸΩÃÅëîÅç•ï……îËÅ=9QI=1}AI=eQ=}M%IΩY%9%}Hƒ‘Ÿ}=9%I5%=9}%90π©¡ú∞Å=9QI=1}AI=eQ=}M%IΩAQ%=9}Hƒ‘Ÿ}%9Y%Q%=9Lπµê∞Å=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµê∞Å=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=Lπµê∞Å=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩ∏∞ÅI=5A}}Q11πµê∞ÅI=5A}=YI10πµê∏Å%µ¡±ïµïπ—ÖçßÕ∏Å•ì•π—•çÑÅÑÅî‡‰‘’å–ÏÅœÕ±ºÅëΩç’µïπ—ÖçßÕ∏Å‰ÅïŸ•ëïπç•Ñ∏(((åååÅHƒ‘ÿÉ
‹ÅAU	1%É
‹ÄÃÅΩç—’â…îÄ»¿»ÿÅ’Ö—ïµÖ±Ñ)∞Å¡…Ω¡•ï—Ö…•ºÅÖ’—Ω…•ÎÃÅ¡’â±•çÖ»ÅHƒ‘ÿÅçΩπÕï…ŸÖπëºÅï∞ÅëΩµ•π•ºÅÖç—’Ö∞Åµïë•Öπ—îÅ,ÅÑÅ±ÖÃÄ¿»Ë–‹Ë–‰Å’Ö—ïµÖ±Ñ∏ÅAH–ÿÅ•π—ïù…ÖëºËÅëòÿ’Ñ–‡»ÿ‡Ÿà–ÕîÕê·ê‡ŸçòÃ¡ëî≈î‡ÕàÕÑ‡‡’î¿‡ÏÉÖ…âΩ∞Åò–·ò‹…à‰ÿ‡›åÿ‹ÿƒÿ¿ƒ‹»·ïî‹‘‰Âî‘ƒ’ëÖåƒ…Öçò∞Å•ì•π—•çºÅÖ∞ÅçÖπë•ëÖ—ºÅÖ¡…ΩâÖëºÄ—ïôàÿ…ê∏ÅµÖ•∏Å‰Å±ÖàΩ»ƒ–ÿµïπ—…‰µΩ¡ï∏¥»—†µ•πŸ•—ïÃ¥»¿»ÿ¿‰Ã¿ÅÖ¡’π—Ö∏ÅÖ∞Åµ•ÕµºÅçΩµµ•–∞ÅÕ•∏ÅôΩ…ÈÖ»Å…ïôï…ïπç•ÖÃ∏)ïÕ¡±•ïù’ïÃÅIdËÅA…Ωë’ççßÕ∏ÅAÅë¡±|—9‰’eà›…E!ù@Õi’—i1ô1··)(›PÏÅ1Å¡…•πç•¡Ö∞Åë¡±}!(ÿ≈Ω¡’··…ôÃÂÂ1aY¡Â·≠…Ñ‰ÏÅ1ÅΩ…•ùï∏Å•πÕ—Ö±ÖëºÅë¡±}ÈΩH—	aù≈≈Ñ·	°M	e]π…·e0‘ÏÅAÅ…ÖµÑÅ•πÕ—Ö±ÖëÑÅë¡±}°π¡a—EùπÖL·©›M9Èâ©…ù-—ïI‡∏Å1ΩÃÅç’Ö—…ºÅΩÀµùïπïÃÅëïŸΩ±Ÿ•ï…Ω∏Å!QQ@»¿¿Å…ï±ïÖÕîπ©ÕΩ∏ÅHƒ‘ÿ∏Å°…ΩµîÅ…ïÖ∞Åï∏Å°——¡ÃËºΩï¡úµçÖëë‰πŸï…çï∞πÖ¡¿Ω•πëï‡µù…’¡Ö∞π°—µ∞˝•π•ç•ºÙƒÅµ’ïÕ—…ÑÅHƒ‘ÿÅQU1%i<ÏÅµïªËÅ¡…•πç•¡Ö∞ÅÕ•∏Å…ïÖ»Å—Ω…πïºÅë’¡±•çÖëºÅ‰Å=…ùÖπ•ÈÖëΩ»ÅçΩπ—•ïπîÅIHÅQ=I9<ÅîÅ%ÅÅQ=I9<∏ÅŸ•ëïπç•ÑÅÖ’”•π—•çÑËÅ=9QI=1}AI=eQ=}M%IΩY%9%}Hƒ‘Ÿ}AI=U%=8π©¡ú∏)=âÕï…ŸÖâ•±•ëÖêÅëï∞ÅëïÕ¡±•ïù’îÅAËÅëΩÃÅ…ïù•Õ—…ΩÃÅï—•≈’ï—ÖëΩÃÅï……Ω»ÅÕΩ∏Å@¿ƒÿ‰ÅëîÅ’…∞π¡Ö…ÕîÅï∏ÄΩÖ¡§ΩÖççΩ’π–Å!QQ@»¿¿Å‰ÄΩÖ¡§ΩÖ¡¿µÖççïÕÃÅ!QQ@–¿ƒÅëîÅë•Õ¡ΩÕ•—•ŸºÅÕ•∏ÅÕïÕßÕ∏ÏÅπºÅëïµ’ïÕ—…Ö∏ÅôÖ±±ºÅëîÅ•πŸ•—Öç•ΩπïÃ∏Å9ºÅÕîÅëïç±Ö…ÑÅÖ’Õïπç•ÑÅ’π•Ÿï…ÕÖ∞ÅëîÅï……Ω…ïÃ∏Å±’©ºÅ€Ö±•ëºÅçΩµ¡±ï—ºÅçΩµ¡…ΩâÖëºÅÖπ—ïÃÅëîÅµï…ùîÅÕΩâ…îÅî‡‰‘’å–∞ÅèÕë•ùºÅ•ì•π—•çºÅÖ∞Å¡’â±•çÖëºÏÅâÖπçºÅ•π—ïù…Ö∞ÅAMLÅ‰Å¡’ï…—ÖÃÅAML∏Å9ºÅÕîÅëïç±Ö…ÑÅ•A°ΩπîÅõµÕ•çºÅπ§Åïë•çßÕ∏Å…ïµΩ—ÑÅëï∞ÅπΩµâ…îÅ¡Ω»Å¡…Ω¡•ï—Ö…•º∏)π—…ïùÑÅô’πç•ΩπÖ∞Å=5A1Q∏ÅΩµ•π•ºÅùΩ±òµÕçΩ…îµçÖ…êπŸï…çï∞πÖ¡¿Å¡ï…µÖπïçîÅ¡ïπë•ïπ—îÅëîÅÖÕ•ùπÖçßÕ∏ÏÅπºÅâ±Ω≈’óÃÅïÕ—ÑÅ¡’â±•çÖçßÕ∏Åï·¡…ïÕÖµïπ—îÅÖ’—Ω…•ÈÖëÑÅçΩ∏Åï∞ÅëΩµ•π•ºÅÖç—’Ö∞∏Å9ºÅçÖµâ•Ö∏ÅΩÀµùïπïÃÅπ§ÅÖ±µÖçïπÖµ•ïπ—º∏ÅIΩ±±âÖç¨ÅëîÅèÕë•ùºÅHƒ‘‘ËÅÑ‹‘¿…ïâçò‹‰Ã¡ê—àÿƒ…àƒÕê‰›à¡àÂòƒ‹≈ÑÕôÑ‰ŸîÏÅ…ïÕ—Ö’…Ö»Åµïë•Öπ—îÅçΩµµ•–ÅëîÅ…ïŸï…ÕßÕ∏Å‰ÅµÖπ—ïπï»ÅÖµâÖÃÅ…ÖµÖÃÅÖ±•πïÖëÖÃ∞ÅÕ•∏ÅâΩ……Ö»ÅëÖ—ΩÃ∏ÅÕ—îÅç•ï……îÅá≈ÖëîÅëΩç’µïπ—ÖçßÕ∏∞ÅçÖ¡—’…ÑÅ‰ÅÕï±±º∞ÅÕ•∏ÅµΩë•ô•çÖ»Å•µ¡±ïµïπ—ÖçßÕ∏∏ÅAÀÕ·•µÑÅÖççßÕ∏Åëï∞Å¡…Ω¡•ï—Ö…•ºËÅπ•πù’πÑÅ¡Ö…ÑÅïÕ—ÑÅïπ—…ïùÑ∏(((ååÅHƒ‘‹É
‹Åçïπ—…ÖëºÅ∑ÕŸ•∞∞ÅçΩπ—…Ω±ïÃÅ’π•ôΩ…µïÃÅ‰ÅIïù•Õ—…ºÅëîÅ©’ùÖëΩ…ïÃÉ
‹ÄÃÅΩç—’â…îÄ»¿»ÿ()AÖπï±ïÃÅçïπ—…ÖëΩÃÅç’ÖπëºÅçÖâï∏∞ÅÕç…Ω±∞ÅÕïù’…ºÅç’ÖπëºÅÕΩ∏Å±Ö…ùΩÃÏÅ5;hÅÖ……•âÑÅëï…ïç°ÑÅ‰Å`ÅÖ……•âÑÅ•È≈’•ï…ëÑÅçΩ∏Åµ•ÕµÖÃÅµïë•ëÖÃ∏ÅI%MQI<ÅÅ)U=ILÅ•πµïë•Ö—Öµïπ—îÅëïâÖ©ºÅëîÅ5Öπ’Ö∞ÅçΩπÕï…ŸÑÅâΩ……ÖëΩ»∞Å…ΩπëÑÅ‰Å…ï—Ω…πº∏Åëµ•π•Õ—…ÖçßÕ∏Å—•ïπîÅµïªËÅçΩ∑È∏Å•πç±’ÕºÅï∏ÅëßÖ±ΩùºÅπÖ—•Ÿº∏Ä»‡ÅçΩµ¡…ΩâÖç•ΩπïÃÅ°…Ωµ•’¥Å±ΩçÖ∞Ä–Ã√\‰Ã»ÅAMLÏÅô•·—’…ïÃÅE∞ÅπºÅ¡…’ïâÑÅõµÕ•çÑÅπ§Å…ïŸ•ÕßÕ∏Å•π—ïù…Ö∞Äÿ‹ºÿ‹∏Å∞Å¡…Ω¡•ï—Ö…•ºÅΩ…ëïªÃÅëï—ïπï»ÅÖµ¡±•ÖçßÕ∏Å‰Å¡’â±•çÖ»Å°ÖÕ—ÑÅïÕ—îÅÖ±çÖπçî∏ÅA…ïŸ•ï‹Ω¡’â±•çÖçßÕ∏Å¡ïπë•ïπ—îÅÖ∞Å…ïù•Õ—…Ö»∏ÅIΩ±±âÖç¨ÅHƒ‘ÿÄ–ƒŸê‹ÿ‘·åŸôà∏((¥ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµëÄÉ
‹ÅµΩë•ô•çÖçßÕ∏∞ÅïŸ•ëïπç•ÑÅºÅçΩπ—…Ω∞ÅHƒ‘‹∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩAQ%=9}Hƒ‘›}9Y%=8πµëÄÉ
‹ÅµΩë•ô•çÖçßÕ∏∞ÅïŸ•ëïπç•ÑÅºÅçΩπ—…Ω∞ÅHƒ‘‹∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµëÄÉ
‹ÅµΩë•ô•çÖçßÕ∏∞ÅïŸ•ëïπç•ÑÅºÅçΩπ—…Ω∞ÅHƒ‘‹∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}Hƒ‘›}	I=]MHº–Ã¡‡‰Ã»µÖëµ•π•Õ—…Öç•Ω∏π¡πùÄÉ
‹ÅµΩë•ô•çÖçßÕ∏∞ÅïŸ•ëïπç•ÑÅºÅçΩπ—…Ω∞ÅHƒ‘‹∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}Hƒ‘›}	I=]MHº–Ã¡‡‰Ã»µçΩ……ïçç•Ω∏π¡πùÄÉ
‹ÅµΩë•ô•çÖçßÕ∏∞ÅïŸ•ëïπç•ÑÅºÅçΩπ—…Ω∞ÅHƒ‘‹∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}Hƒ‘›}	I=]MHº–Ã¡‡‰Ã»µç…ïÖ»µù…’¡ºπ¡πùÄÉ
‹ÅµΩë•ô•çÖçßÕ∏∞ÅïŸ•ëïπç•ÑÅºÅçΩπ—…Ω∞ÅHƒ‘‹∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}Hƒ‘›}	I=]MHº–Ã¡‡‰Ã»µëï—Ö±±î¥ƒ‡π¡πùÄÉ
‹ÅµΩë•ô•çÖçßÕ∏∞ÅïŸ•ëïπç•ÑÅºÅçΩπ—…Ω∞ÅHƒ‘‹∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}Hƒ‘›}	I=]MHº–Ã¡‡‰Ã»µïÕ—Öë•Õ—•çÖÃπ¡πùÄÉ
‹ÅµΩë•ô•çÖçßÕ∏∞ÅïŸ•ëïπç•ÑÅºÅçΩπ—…Ω∞ÅHƒ‘‹∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}Hƒ‘›}	I=]MHº–Ã¡‡‰Ã»µù…’¡ºµŸÖç•ºπ¡πùÄÉ
‹ÅµΩë•ô•çÖçßÕ∏∞ÅïŸ•ëïπç•ÑÅºÅçΩπ—…Ω∞ÅHƒ‘‹∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}Hƒ‘›}	I=]MHº–Ã¡‡‰Ã»µ°•Õ—Ω…•Ö∞π¡πùÄÉ
‹ÅµΩë•ô•çÖçßÕ∏∞ÅïŸ•ëïπç•ÑÅºÅçΩπ—…Ω∞ÅHƒ‘‹∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}Hƒ‘›}	I=]MHº–Ã¡‡‰Ã»µ•êµ—Ω…πïºπ¡πùÄÉ
‹ÅµΩë•ô•çÖçßÕ∏∞ÅïŸ•ëïπç•ÑÅºÅçΩπ—…Ω∞ÅHƒ‘‹∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}Hƒ‘›}	I=]MHº–Ã¡‡‰Ã»µ•πÕ—Ö±Ö»π¡πùÄÉ
‹ÅµΩë•ô•çÖçßÕ∏∞ÅïŸ•ëïπç•ÑÅºÅçΩπ—…Ω∞ÅHƒ‘‹∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}Hƒ‘›}	I=]MHº–Ã¡‡‰Ã»µµïπ‘π¡πùÄÉ
‹ÅµΩë•ô•çÖçßÕ∏∞ÅïŸ•ëïπç•ÑÅºÅçΩπ—…Ω∞ÅHƒ‘‹∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}Hƒ‘›}	I=]MHº–Ã¡‡‰Ã»µΩ…ùÖπ•ÈÖëΩ»π¡πùÄÉ
‹ÅµΩë•ô•çÖçßÕ∏∞ÅïŸ•ëïπç•ÑÅºÅçΩπ—…Ω∞ÅHƒ‘‹∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}Hƒ‘›}	I=]MHº–Ã¡‡‰Ã»µ…ïù•Õ—…ºπ¡πùÄÉ
‹ÅµΩë•ô•çÖçßÕ∏∞ÅïŸ•ëïπç•ÑÅºÅçΩπ—…Ω∞ÅHƒ‘‹∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}Hƒ‘›}	I=]MHº–Ã¡‡‰Ã»µ…ïÕ¡Ö±ëºπ¡πùÄÉ
‹ÅµΩë•ô•çÖçßÕ∏∞ÅïŸ•ëïπç•ÑÅºÅçΩπ—…Ω∞ÅHƒ‘‹∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}Hƒ‘›}	I=]MHº–Ã¡‡‰Ã»µÕ—Öâ±ïôΩ…êµ…ïù•Õ—…ºπ¡πùÄÉ
‹ÅµΩë•ô•çÖçßÕ∏∞ÅïŸ•ëïπç•ÑÅºÅçΩπ—…Ω∞ÅHƒ‘‹∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}Hƒ‘›}	I=]MHº–Ã¡‡‰Ã»µ—Ö…©ï—ÑµôΩ’…}âÖ±∞π¡πùÄÉ
‹ÅµΩë•ô•çÖçßÕ∏∞ÅïŸ•ëïπç•ÑÅºÅçΩπ—…Ω∞ÅHƒ‘‹∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}Hƒ‘›}	I=]MHº–Ã¡‡‰Ã»µ—Ö…©ï—Ñµùïπï…Ö∞π¡πùÄÉ
‹ÅµΩë•ô•çÖçßÕ∏∞ÅïŸ•ëïπç•ÑÅºÅçΩπ—…Ω∞ÅHƒ‘‹∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}Hƒ‘›}	I=]MHº–Ã¡‡‰Ã»µ—Ö…©ï—ÑµµÖ—ç°}¡±Ö‰π¡πùÄÉ
‹ÅµΩë•ô•çÖçßÕ∏∞ÅïŸ•ëïπç•ÑÅºÅçΩπ—…Ω∞ÅHƒ‘‹∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}Hƒ‘›}	I=]MHº–Ã¡‡‰Ã»µ—Ö…©ï—ÑµÕ—Öâ±ïôΩ…êπ¡πùÄÉ
‹ÅµΩë•ô•çÖçßÕ∏∞ÅïŸ•ëïπç•ÑÅºÅçΩπ—…Ω∞ÅHƒ‘‹∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}Hƒ‘›}	I=]MHº–Ã¡‡‰Ã»µ—Ö…©ï—Ñµ’π•Ÿï…ÕÖ±ïÃπ¡πùÄÉ
‹ÅµΩë•ô•çÖçßÕ∏∞ÅïŸ•ëïπç•ÑÅºÅçΩπ—…Ω∞ÅHƒ‘‹∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}Hƒ‘›}	I=]MHΩïŸ•ëïπçîπ©ÕΩπÄÉ
‹ÅµΩë•ô•çÖçßÕ∏∞ÅïŸ•ëïπç•ÑÅºÅçΩπ—…Ω∞ÅHƒ‘‹∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄÉ
‹ÅµΩë•ô•çÖçßÕ∏∞ÅïŸ•ëïπç•ÑÅºÅçΩπ—…Ω∞ÅHƒ‘‹∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=LπµëÄÉ
‹ÅµΩë•ô•çÖçßÕ∏∞ÅïŸ•ëïπç•ÑÅºÅçΩπ—…Ω∞ÅHƒ‘‹∏(¥ÅÅI=5A}}Q11πµëÄÉ
‹ÅµΩë•ô•çÖçßÕ∏∞ÅïŸ•ëïπç•ÑÅºÅçΩπ—…Ω∞ÅHƒ‘‹∏(¥ÅÅI=5A}=YI10πµëÄÉ
‹ÅµΩë•ô•çÖçßÕ∏∞ÅïŸ•ëïπç•ÑÅºÅçΩπ—…Ω∞ÅHƒ‘‹∏(¥ÅÅïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏π°—µ±ÄÉ
‹ÅµΩë•ô•çÖçßÕ∏∞ÅïŸ•ëïπç•ÑÅºÅçΩπ—…Ω∞ÅHƒ‘‹∏(¥ÅÅ•πëï‡µù…’¡Ö∞π°—µ±ÄÉ
‹ÅµΩë•ô•çÖçßÕ∏∞ÅïŸ•ëïπç•ÑÅºÅçΩπ—…Ω∞ÅHƒ‘‹∏(¥ÅÅ…ï±ïÖÕîπ©ÕΩπÄÉ
‹ÅµΩë•ô•çÖçßÕ∏∞ÅïŸ•ëïπç•ÑÅºÅçΩπ—…Ω∞ÅHƒ‘‹∏(¥ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄÉ
‹ÅµΩë•ô•çÖçßÕ∏∞ÅïŸ•ëïπç•ÑÅºÅçΩπ—…Ω∞ÅHƒ‘‹∏(¥ÅÅÕç…•¡—ÃΩ…ïŸ•ï‹µ»ƒ‘‹µµΩâ•±îµ±ÖÂΩ’–πµ©ÕÄÉ
‹ÅµΩë•ô•çÖçßÕ∏∞ÅïŸ•ëïπç•ÑÅºÅçΩπ—…Ω∞ÅHƒ‘‹∏(¥ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄÉ
‹ÅµΩë•ô•çÖçßÕ∏∞ÅïŸ•ëïπç•ÑÅºÅçΩπ—…Ω∞ÅHƒ‘‹∏(¥ÅÅÕ°Ω…—ç’—Ãµ’§π©ÕÄÉ
‹ÅµΩë•ô•çÖçßÕ∏∞ÅïŸ•ëïπç•ÑÅºÅçΩπ—…Ω∞ÅHƒ‘‹∏(¥ÅÅ—ïÕ–µ»ƒ‘‹µ’π•ôΩ…¥µπÖŸ•ùÖ—•Ω∏πµ©ÕÄÉ
‹ÅµΩë•ô•çÖçßÕ∏∞ÅïŸ•ëïπç•ÑÅºÅçΩπ—…Ω∞ÅHƒ‘‹∏(((ååÅHƒ‘‡É
‹ÅMçΩ…ïÃÅµ§Åù…’¡º∞ÅπÖŸïùÖçßÕ∏ÅîÅ•ëïπ—•ô•çÖçßÕ∏É
‹ÄÃÅΩç—’â…îÄ»¿»ÿ)QÖâ±ÑÅçΩπ—•π’ÑÅëîÅù…’¡º∞Å—ΩëΩÃÅ±ΩÃÅ•π—ïù…Öπ—ïÃ∞ÅëΩâ±îÅ—Ω≈’îƒ‡∞Åç•ï……ïÃÅ’π•ôΩ…µïÃÅï∏Å—ΩëÖÃÅ±ÖÃÅ…ÖµÖÃÅMçΩ…ïÃÅ±ΩçÖ±•ÈÖëÖÃ∞Å•ëïπ—•ô•çÖçßÕ∏ÅëîÅ¡ï…—ïπïπç•ÑÅÖç—’Ö∞Åï∏Å%π•ç•ºÅ‰ÅMçΩ…îÅÖ…ê∏ÅŸ•ëïπç•ÑÅ°…Ωµ•’¥Å∑ÕŸ•∞ÅçΩ∏ÅE∞ÅπºÅ•A°ΩπîÅõµÕ•çº∏ÅM•∏ÅçÖµâ•ºÅëîÅëÖ—ΩÃÅπ§Å¡ï…µ•ÕΩÃ∏ÅIΩ±±âÖç¨ÅµÖ•∏ÅHƒ‘‹Åê¡ôò‡≈ê≈àÿ‘Ã∏(¥ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµëÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‡∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩAQ%=9}Hƒ‘·}M=ILπµëÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‡∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµëÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‡∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}Hƒ‘·}M=ILºÃ‰¿µù…’¡ºµ…ïôï…ïπç•Ñπ¡πùÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‡∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}Hƒ‘·}M=ILºÃ‰¿µù…’¡ºπ¡πùÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‡∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}Hƒ‘·}M=ILº–Ã¿µù…’¡ºµ…ïôï…ïπç•Ñπ¡πùÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‡∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}Hƒ‘·}M=ILº–Ã¿µù…’¡ºπ¡πùÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‡∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}Hƒ‘·}M=ILΩïŸ•ëïπçîπ©ÕΩπÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‡∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‡∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=LπµëÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‡∏(¥ÅÅI=5A}}Q11πµëÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‡∏(¥ÅÅI=5A}=YI10πµëÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‡∏(¥ÅÅçΩëîµïπ—…‰π°—µ±ÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‡∏(¥ÅÅçΩëîµïπ—…‰π©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‡∏(¥ÅÅ•πëï‡µù…’¡Ö∞π°—µ±ÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‡∏(¥ÅÅ±•Ÿîµ°’àπ°—µ±ÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‡∏(¥ÅÅ±•Ÿîµ°’àπ©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‡∏(¥ÅÅ±•ŸîµŸ•ï‹π©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‡∏(¥ÅÅ±•Ÿîπ°—µ±ÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‡∏(¥ÅÅ¡…•ŸÖ—îµ…Ω’πëÃπ©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‡∏(¥ÅÅ…ï±ïÖÕîπ©ÕΩπÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‡∏(¥ÅÅÕçΩ…ïÃµ’§πçÕÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‡∏(¥ÅÅÕçΩ…ïÃµ’§π©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‡∏(¥ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‡∏(¥ÅÅÕç…•¡—ÃΩ…ïŸ•ï‹µ»ƒ‘‡µÕçΩ…ïÃπµ©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‡∏(¥ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‡∏(¥ÅÅÕ°Ω…—ç’—Ãµ’§π©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‡∏(¥ÅÅ—ïÕ–µ±Öàµ¡…•ŸÖ—îµ…Ω’πëÃπµ©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‡∏(¥ÅÅ—ïÕ–µ»ƒ‘‡µù…Ω’¿µÕçΩ…ïÃπµ©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‡∏(¥ÅÅ—ïÕ–µ»»–µïŸïπ–µç…ïÖ—•Ω∏µôïïëâÖç¨πµ©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‡∏((¥ÅÅ—ïÕ–µµÖπ’Ö∞µÕ—Ö…—’¿µÕ°Ö…•πúπµ©ÕÄÉ
‹ÅHƒ‘‡ÅÖç—’Ö±•ÈÑÅµΩç¨ÅëîÅ…ïπëï»ÅëîÅ•ëïπ—•ô•çÖçßÕ∏∞ÅçΩπÕï…ŸÑÅπïùÖ—•ŸºÅëîÅÖ……Öπ≈’î∏(((ååÅHƒ‘‰É
‹Å•πŸ•—ÖçßÕ∏Å‰ÅèÕë•ùºÅï∏ÅëΩÃÅµïπÕÖ©ïÃÅ]°Ö—Õ¡¿É
‹ÄÃÅΩç—’â…îÄ»¿»ÿ)	ÖÕîÅçÖªÕπ•çÑÅHƒ‘‡Ä·å‰…òÿÿ∏ÅM’Õ—•—’ÂîÅ¡…Ω¡’ïÕ—ÑÅ…ï—•…ÖëÑÅAH–‰ËÅï∞Å¡…Ω¡•ï—Ö…•ºÅÖç±ÖÀÃÅçΩ¡•ÑÅëïπ—…ºÅëï∞ÅµïπÕÖ©îÅ]°Ö—Õ¡¿Å‰ÅÖ¡…ΩãÃÅÖ±—ï…πÖ—•ŸÑÅëîÅèÕë•ùºÅÖ•Õ±Öëº∏ÅA…•µï»ÅµïπÕÖ©îËÅ=1ÅM=IÅIÅPÄ¨ÅQîÅ°Ö∏Å•πŸ•—ÖëºÅÑÅ¡Ö…—•ç•¡Ö»Åï∏Å±ÑÅ…ΩπëÑÅëîÅ9=5	IÅ0ÅI=H∏ÅQΩ…πïºÅïµ¡±ïÑÅï∞Å—Ω…πïºÅëîÅ9=5	IÅ0ÅI=H∏ÅMïù’πëºÅ¡ÖÂ±ΩÖêÅï·Öç—Öµïπ—îÅï∞ÅèÕë•ùºÏÅÕ•∏Åï—•≈’ï—Ñ∞Å”µ—’±º∞ÅUI0Åπ§Å—ï·—ºÅÖë•ç•ΩπÖ∞∏Åπ€µΩÃÅÕï¡Ö…ÖëΩÃ∞ÅçÖëÑÅ’πºÅâÖ©ºÅ—Ω≈’îÅëï∞Å¡…Ω¡•ï—Ö…•º∞ÅÖ∞Åµ•ÕµºÅçΩπ—Öç—ºÅÕï±ïçç•ΩπÖëºÅ¡Ω»É•∞Åï∏Å]°Ö—Õ¡¿∏Å9ºÅÖ’—ΩµÖ—•ÈÖ»ÅµïπÕÖ©ïÃÅπ§ÅÖô•…µÖ»Åïπ—…ïùÑÅ…ïÖ∞ÅÖ∞Å…ïÕΩ±Ÿï…ÕîÅ]ïàÅM°Ö…î∏ÅÖπçï±ÖçßÕ∏ÅçΩπÕï…ŸÑÅΩ…•ùï∏Å‰Å…ï•π—ïπ—ºÏÅÕïù’πëÑÅÖççßÕ∏Åâ±Ω≈’ïÖëÑÅÖπ—ïÃÅëîÅ¡…•µï…ÑÏÅëΩâ±îÅ—Ω≈’îÅπºÅë’¡±•çÑ∏)MîÅµΩë•ô•çÑÅï·ç±’Õ•ŸÖµïπ—îÅçΩµ¡Ö…—•»ÅèÕë•ùºÅëîÅ¡Ö…—•ç•¡ÖçßÕ∏ÅëîÅù…’¡ΩÃΩ—Ω…πïΩÃ∏ÅΩ¡•ÑÅ¡…ïï·•Õ—ïπ—îÅï∏ÅÖ¡±•çÖçßÕ∏ÅçΩπÕï…ŸÑÅÕ’ÃÅ°Öπë±ï…ÃÏÅMçΩ…ïÃÅ1%YÅëîÅœÕ±ºÅ±ïç—’…ÑÅçΩπÕï…ŸÑÅÕ‘ÅçΩπ—…Ö—ºÅ•πëï¡ïπë•ïπ—î∏Å…’¡ºÅ…ïçΩùîÅπΩµâ…îÅëîÅç…ïÖëΩ»Å‰Å±ºÅù’Ö…ëÑÅµïë•Öπ—îÅçΩπô•ù’…Ö—•Ω∏Åï·•Õ—ïπ—î∞ÅÕ•∏Åπ’ïŸÑÅA$Åπ§Åµ•ù…ÖçßÕ∏∏ÅQΩ…πïºÅ’ÕÑÅç…ïÖ—Ω…9ÖµîÅçÖªÕπ•çºÏÅïŸïπ—ΩÃÅÖπ—•ù’ΩÃÅ¡’ïëï∏ÅçΩµ¡±ï—Ö»ÅπΩµâ…îÅÖ∞ÅçΩµ¡Ö…—•»ÅÕ•∏Å•πŸïπ—Ö…±º∏)I•ïÕùΩÃËÅ√•…ë•ëÑÅëï∞ÅÕïù’πëºÅµïπÕÖ©î∞Åïπ€µºÅÑÅçΩπ—Öç—ΩÃÅë•Õ—•π—ΩÃ∞ÅçÖπçï±ÖçßÕ∏∞ÅôÖ±—ÑÅëîÅπΩµâ…î∞Å¡Ω…—Ö¡Ö¡ï±ïÃ∞ÅïÕ—•±ΩÃÅ°ï…ïëÖëΩÃ∏ÅΩπ—…Ω±ïÃËÅëΩÃÅÖçç•ΩπïÃÅŸ•Õ•â±ïÃÏÅ•πë•çÖçßÕ∏Åµ•ÕµºÅçΩπ—Öç—ºÏÅ¡ÖÂ±ΩÖêÅ—ï·–ÉÈπ•çÖµïπ—îÅï∏ÅÕïù’πëºÏÅÕ•∏Åç•ï……îÅëïÕ¡◊•ÃÅëï∞Å¡…•µï…ºÏÅôÖ±±âÖç¨Å›ÑπµîÅ¡Ω»ÅçÖëÑÅµïπÕÖ©îÏÅôÖ±±ΩÃÅŸ•Õ•â±ïÃ∏Å1ÑÅ°ï……Öµ•ïπ—ÑÅπºÅŸîÅï∞ÅëïÕ—•πÖ—Ö…•ºÅ≈’îÅÕï±ïçç•ΩπÑÅ]°Ö—Õ¡¿Åπ§ÅçΩπô•…µÑÅïπ—…ïùÑ∏)A…’ïâÖÃËÅ—ïÕ–µ»ƒ‘‰µ›°Ö—ÕÖ¡¿µ—›ºµµïÕÕÖùïÃπµ©Ã∞Å•π—ïù…ÖçßÕ∏Å—ïÕ–µ±Öàµ¡…•ŸÖ—îµ…Ω’πêµÕ°Ö…îµô±Ω‹πµ©ÃÅ‰Å—ïÕ–µ»»–µïŸïπ–µç…ïÖ—•Ω∏µôïïëâÖç¨πµ©ÃÅAMLÏÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÃÅï·•–¿ÅAML∏Å°…Ωµ•’¥Å±ΩçÖ∞ÅçΩ∏ÅµΩç≠ÃÅï·¡≥µç•—ΩÃÅëîÅπÖŸ•ùÖ—Ω»πÕ°Ö…îÅ‰ÅA%ÃÅEÅŸï…•ô•çÑÄÃ‰¿º–Ã¿∞Å¡ÖÂ±ΩÖëÃÅï·Öç—ΩÃ∞ÅçÖπçï±ÖçßÕ∏Ω…ï•π—ïπ—º∞ÅΩ…•ùï∏ÅçΩπÕï…ŸÖëº∞ÅÖ’Õïπç•ÑÅëîÅΩŸï…ô±Ω‹Ωï……Ω…ïÃÅ‰ÅçÖ¡—’…ÖÃÄ»ƒÿ√\–Ã»¿∏Å9ºÅ¡…’ïâÑÅõµÕ•çÑÅ•A°ΩπîÅπ§Åïπ€µºÅ]°Ö—Õ¡¿Å…ïÖ∞∏ÅA…•µï…ÑÅçÖ¡—’…ÑÅëï—ïç”ÃÅçΩπ—…Ω±ïÃÅÕ•∏ÅïÕ—•±ºÏÅçΩ……ïççßÕ∏ÅÕçΩ¡ïêÅï∏ÅÕçΩ…ïÃµ’§πçÕÃÅ‰Åπ’ïŸÑÅ…ïŸ•ÕßÕ∏ÅÖπ—ïÃÅëîÅçÖπë•ëÖ—º∏)IΩ±±âÖç¨ÅHƒ‘‡Å¡Ω»Å…ïŸï…ÕßÕ∏ÅÕ•∏ÅâΩ……Ö»ÅëÖ—ΩÃ∏ÅA…Ωë’ççßÕ∏ΩµÖ•∏Å‰Å1Å•πÕ—Ö±ÖëºÅ¡ï…µÖπïçï∏ÅHƒ‘‡ÏÅÕ’â•»Å…ÖµÑÅÖ’—Ω…•ÈÖëÑÅ¡Ω»Å¡…Ω¡•ï—Ö…•º∞ÅA…ïŸ•ï‹Å…ïÖ∞Å‰Å¡’â±•çÖçßÕ∏Å¡ïπë•ïπ—ïÃ∏((¥ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµëÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‰ÅëîÅëΩÃÅµïπÕÖ©ïÃ∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩAQ%=9}Hƒ‘Â}=M}59M)LπµëÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‰ÅëîÅëΩÃÅµïπÕÖ©ïÃ∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµëÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‰ÅëîÅëΩÃÅµïπÕÖ©ïÃ∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}Hƒ‘Â}=M}59M)LºÃ‰¿µ¡…•ŸÖ—îπ¡πùÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‰ÅëîÅëΩÃÅµïπÕÖ©ïÃ∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}Hƒ‘Â}=M}59M)LºÃ‰¿µ—Ω’…πÖµïπ–π¡πùÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‰ÅëîÅëΩÃÅµïπÕÖ©ïÃ∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}Hƒ‘Â}=M}59M)Lº–Ã¿µ¡…•ŸÖ—îπ¡πùÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‰ÅëîÅëΩÃÅµïπÕÖ©ïÃ∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}Hƒ‘Â}=M}59M)Lº–Ã¿µ—Ω’…πÖµïπ–π¡πùÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‰ÅëîÅëΩÃÅµïπÕÖ©ïÃ∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}Hƒ‘Â}=M}59M)LΩïŸ•ëïπçîπ©ÕΩπÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‰ÅëîÅëΩÃÅµïπÕÖ©ïÃ∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‰ÅëîÅëΩÃÅµïπÕÖ©ïÃ∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=LπµëÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‰ÅëîÅëΩÃÅµïπÕÖ©ïÃ∏(¥ÅÅI=5A}}Q11πµëÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‰ÅëîÅëΩÃÅµïπÕÖ©ïÃ∏(¥ÅÅI=5A}=YI10πµëÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‰ÅëîÅëΩÃÅµïπÕÖ©ïÃ∏(¥ÅÅ•πëï‡µù…’¡Ö∞π°—µ±ÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‰ÅëîÅëΩÃÅµïπÕÖ©ïÃ∏(¥ÅÅ±•Ÿîµ°’àπ°—µ±ÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‰ÅëîÅëΩÃÅµïπÕÖ©ïÃ∏(¥ÅÅ¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‰ÅëîÅëΩÃÅµïπÕÖ©ïÃ∏(¥ÅÅ¡…•ŸÖ—îµ…Ω’πëÃπ©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‰ÅëîÅëΩÃÅµïπÕÖ©ïÃ∏(¥ÅÅ…ï±ïÖÕîπ©ÕΩπÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‰ÅëîÅëΩÃÅµïπÕÖ©ïÃ∏(¥ÅÅÕçΩ…ïÃµ’§πçÕÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‰ÅëîÅëΩÃÅµïπÕÖ©ïÃ∏(¥ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‰ÅëîÅëΩÃÅµïπÕÖ©ïÃ∏(¥ÅÅÕç…•¡—ÃΩ…ïŸ•ï‹µ»ƒ‘‰µ›°Ö—ÕÖ¡¿µ—›ºµµïÕÕÖùïÃπµ©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‰ÅëîÅëΩÃÅµïπÕÖ©ïÃ∏(¥ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‰ÅëîÅëΩÃÅµïπÕÖ©ïÃ∏(¥ÅÅ—ïÕ–µ±Öàµ¡…•ŸÖ—îµ…Ω’πêµÕ°Ö…îµô±Ω‹πµ©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‰ÅëîÅëΩÃÅµïπÕÖ©ïÃ∏(¥ÅÅ—ïÕ–µ±Öàµ¡…•ŸÖ—îµ…Ω’πëÃπµ©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‰ÅëîÅëΩÃÅµïπÕÖ©ïÃ∏(¥ÅÅ—ïÕ–µ»ƒ‘‰µ›°Ö—ÕÖ¡¿µ—›ºµµïÕÕÖùïÃπµ©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‰ÅëîÅëΩÃÅµïπÕÖ©ïÃ∏(¥ÅÅ—ïÕ–µ»»–µïŸïπ–µç…ïÖ—•Ω∏µôïïëâÖç¨πµ©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‰ÅëîÅëΩÃÅµïπÕÖ©ïÃ∏(¥ÅÅ›°Ö—ÕÖ¡¿µ•πŸ•—Ö—•ΩπÃπ©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒ‘‰ÅëîÅëΩÃÅµïπÕÖ©ïÃ∏(((ååÅHƒÿ¿É
‹ÅèÕë•ùºÅ¡ïπë•ïπ—îÅ‰Å”µ—’±ºÅëîÅÖëµ•π•Õ—…ÖçßÕ∏É
‹ÄÃÅΩç—’â…îÄ»¿»ÿ)	ÖÕîÅHƒ‘‰Å¡’â±•çÖëÑÄŸÑ‰‘’î·ê‘‘·êƒ…îŸëòƒ–…ôò…î‰…å—à»·ëÑ»’îƒÂê∏Å∞Å¡…Ω¡•ï—Ö…•ºÅçΩπô•…∑ÃÅï∏Å%5|‘ÿ‰‰Å≈’îÅïÕ¡ï…ÖâÑÅÖµâΩÃÅµïπÕÖ©ïÃÅçΩ∏Å’∏Åïπ€µºÏÅπºÅ°ÖãµÑÅ—ΩçÖëºÅï∞ÅÕïù’πëºÅâΩ”Õ∏∏ÅHƒ‘‰ÅπºÅïπŸ•ÖâÑÅÖ’—Ω∑Ö—•çÖµïπ—îËÅçÖëÑÅÕ°Ö…îÅπïçïÕ•—ÑÅ’∏Åπ’ïŸºÅ—Ω≈’î∏ÅHƒÿ¿ÅÖç±Ö…ÑÅM=8Å=LÅ9[5=LÅÖπ—ïÃÅëîÅÕÖ±•»Å‰ÅëïÕ—ÖçÑÅ1QÅ9Y%HÅ0ÅM%<ÅÖ∞Å¡…ï¡Ö…Ö»Åï∞Å¡…•µï…ºÏÅïπôΩçÑÅ±ÑÅÕïù’πëÑÅÖççßÕ∏Å‰ÅçΩπÕï…ŸÑÅ±ÑÅ…ïç’¡ï…ÖçßÕ∏Å¡Ω»Ä–‘Åµ•π’—ΩÃÅï∏Åï∞Åµ•ÕµºÅΩ…•ùï∏∞Å•πç±’ÕºÅÕ§Å±ÑÅÖ¡¿ÅÕîÅ…ïçÖ…ùÑÅë’…Öπ—îÅï∞ÅÕ°Ö…î∏Å∞ÅÕïù’πëºÅ¡ÖÂ±ΩÖêÅÕ•ù’îÅÕ•ïπëºÅï·ç±’Õ•ŸÖµïπ—îÅï∞ÅèÕë•ùº∏Å9ºÅÖ’—ΩµÖ—•ÈÑÅ]°Ö—Õ¡¿Åπ§ÅÖô•…µÑÅïπ—…ïùÑ∏ÅÖπçï±Ö»Åï∞Å¡…•µï…ºÅ±•µ¡•ÑÅ…ïç’¡ï…ÖçßÕ∏ÏÅçÖπçï±Ö»Åï∞ÅÕïù’πëºÅçΩπÕï…ŸÑÅ…ï•π—ïπ—ºÏÅç•ï……îÅï·¡≥µç•—ºÅëïÕçÖ…—ÑÅ¡ïπë•ïπ—î∏ÅM•∏Å—ΩçÖ»Åç’ïπ—ÖÃ∞ÅÕçΩ…ïÃ∞ÅA%Ã∞Å¡ï…µ•ÕΩÃ∞ÅçΩ¡•ÑÅï·•Õ—ïπ—îÅºÅ1%Y∏)%5|‘ÿ‰‹Åô•©ÑÅï∞ÅπΩµâ…îÅ5%9%MQIHÅQ=I9=LÅdÅIUA=L∏ÅMîÅçÖµâ•ÑÅ”µ—’±ºÅ!Q50∞Å ƒÅ‰ÅÖµâΩÃÅÖççïÕΩÃÄ°5ïªËÅ‰Å=…ùÖπ•ÈÖëΩ»§∞ÅçΩπÕï…ŸÖπëºÅëïÕ—•πºÅ‰Åô’πç•ΩπïÃÅÖëµ•π•Õ—…Ö—•ŸÖÃ∏)çï¡—ÖçßÕ∏ËÅÖµâΩÃÅ¡ÖÂ±ΩÖëÃÅï·Öç—ΩÃÏÅçï…ºÅÕ°Ö…îÅÖ’—Ω∑Ö—•çºÏÅèÕë•ùºÅ…ïç’¡ï…Öâ±îÅ—…ÖÃÅ¡…•µï…ÑÅ¡…ï¡Ö…ÖçßÕ∏Ω…ïçÖ…ùÑÅ…ï¡ï—•ëÑÏÅçÖπçï±ÖçßÕ∏∞ÅçÖë’ç•ëÖêÅ‰Åç•ï……îÅçΩπ—…Ω±ÖëΩÃÏÅ”µ—’±ºÅ‰ÅµïªËÅçΩ•πç•ëï∏ÏÅπÖŸïùÖëΩ»Å∑ÕŸ•∞ÄÃ‰¿º–Ã¿ÅÕ•∏ÅΩŸï…ô±Ω‹Ωï……Ω…ïÃ∏ÅŸ•ëïπç•ÑÅ±ΩçÖ∞ÅçΩ∏Åô•·—’…ïÃÅEÅëïç±Ö…ÖëΩÃÏÅ…ïçï¡çßÕ∏Å]°Ö—Õ¡¿Ω•A°ΩπîÅÕ•∏ÅŸï…•ô•çÖ»∏ÅIΩ±±âÖç¨ÅHƒ‘‰Åµïë•Öπ—îÅ…ïŸï…ÕßÕ∏ÅÕ•∏ÅâΩ……Ö»ÅëÖ—ΩÃ∏ÅA…ïŸ•ï‹Å‰Å¡’â±•çÖçßÕ∏ÅáÈ∏Å¡ïπë•ïπ—ïÃÅëîÅï©ïç’çßÕ∏ΩŸï…•ô•çÖçßÕ∏ÏÅÖ’—Ω…•ÈÖçßÕ∏Å¡…ïŸ•ÑÅëï∞Å¡…Ω¡•ï—Ö…•ºÅ¡Ö…ÑÅ±ÑÅ—Ö…ïÑÅ¡ï…µÖπïçî∏((¥ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµëÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒÿ¿∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩAQ%=9}Hƒÿ¡}]!QMA@πµëÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒÿ¿∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµëÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒÿ¿∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}Hƒÿ¡}]!QMA@ºÃ‰¿µÖëµ•π•Õ—…Ö»π¡πùÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒÿ¿∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}Hƒÿ¡}]!QMA@ºÃ‰¿µ¡…•ŸÖ—îπ¡πùÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒÿ¿∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}Hƒÿ¡}]!QMA@ºÃ‰¿µ—Ω’…πÖµïπ–π¡πùÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒÿ¿∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}Hƒÿ¡}]!QMA@º–Ã¿µÖëµ•π•Õ—…Ö»π¡πùÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒÿ¿∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}Hƒÿ¡}]!QMA@º–Ã¿µ¡…•ŸÖ—îπ¡πùÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒÿ¿∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}Hƒÿ¡}]!QMA@º–Ã¿µ—Ω’…πÖµïπ–π¡πùÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒÿ¿∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}Hƒÿ¡}]!QMA@ΩïŸ•ëïπçîπ©ÕΩπÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒÿ¿∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒÿ¿∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=LπµëÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒÿ¿∏(¥ÅÅI=5A}}Q11πµëÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒÿ¿∏(¥ÅÅI=5A}=YI10πµëÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒÿ¿∏(¥ÅÅïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏π°—µ±ÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒÿ¿∏(¥ÅÅ•πëï‡µù…’¡Ö∞π°—µ±ÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒÿ¿∏(¥ÅÅ…ï±ïÖÕîπ©ÕΩπÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒÿ¿∏(¥ÅÅÕç…•¡—ÃΩ…ïŸ•ï‹µ»ƒÿ¿µ›°Ö—ÕÖ¡¿µ…ïÕ’µîπµ©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒÿ¿∏(¥ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒÿ¿∏(¥ÅÅÕ°Ω…—ç’—Ãµ’§π©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒÿ¿∏(¥ÅÅ—ïÕ–µ»ƒ‘‰µ›°Ö—ÕÖ¡¿µ—›ºµµïÕÕÖùïÃπµ©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒÿ¿∏(¥ÅÅ›°Ö—ÕÖ¡¿µ•πŸ•—Ö—•ΩπÃπ©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞ÅçΩπ—…Ω∞ÅºÅïŸ•ëïπç•ÑÅHƒÿ¿∏()=…ëï∏ÅÖë•ç•ΩπÖ∞ÄÃÅΩç—’â…îÄƒ‹Ëƒ‰Å’Ö—ïµÖ±ÑËÅï±•µ•πÖ»ÅÖççïÕºÅÖëµ•π•Õ—…Ö—•ŸºÅëï∞Å5ïªËÅ¡…•πç•¡Ö∞∞Å¡Ω…≈’îÅïÕ”ÑÅï∏Å=I9%i=H∏ÅMîÅçΩπÕï…ŸÑÅœÕ±ºÅÖ±≥¥ÅçΩ∏Å5%9%MQIHÅQ=I9=LÅdÅIUA=LÅ‰Åï∞ÅëïÕ—•πºÅï·•Õ—ïπ—î∏ÅA…’ïâÑÅ5ïªËÅÕ•∏ÅÖëµ•π•Õ—…ÖçßÕ∏ÉäHÅ=…ùÖπ•ÈÖëΩ»ÅçΩ∏ÅÖëµ•π•Õ—…ÖçßÕ∏ÉäHÅ¡Öπ—Ö±±ÑÅçΩ……ïÕ¡Ωπë•ïπ—î∏(¥ÅÅ—ïÕ–µ»ƒ‘‹µ’π•ôΩ…¥µπÖŸ•ùÖ—•Ω∏πµ©ÕÄÉ
‹Å…ïù…ïÕßÕ∏ÅHƒÿ¿ËÅÖëµ•π•Õ—…ÖçßÕ∏ÅœÕ±ºÅï∏Å=…ùÖπ•ÈÖëΩ»∏()=…ëï∏ÅÖë•ç•ΩπÖ∞ÄÃÅΩç—’â…îÄƒ‹Ë»»Å’Ö—ïµÖ±Ñ∞Å%5|‘‹¿ƒº‘‹¿»ËÅQ=I9<Åï∏Å5ΩëÖ±•ëÖêÅÖâ…îÅÕ•∏Å—ïç±Öëº∞ÅçΩµºÅ5$ÅIUA<∏ÅMîÅï±•µ•πÑÅïπôΩ≈’îÅÖ’—Ω∑Ö—•çºÅëîÅ•π¡’–Åï∏ÅÖµâÖÃÅïπ—…ÖëÖÃÅëîÅèÕë•ùºÅëîÅ—Ω…πïºÏÅï∞ÅëßÖ±ΩùºÅçΩπÕï…ŸÑÅôΩçºÅÖççïÕ•â±îÅï∏Åï……Ö»∏Å∞Å—Ω≈’îÅµÖπ’Ö∞Åï∏Åï∞Å•π¡’–ÅÕ•ù’îÅ¡ï…µ•—•ïπëºÅïÕç…•â•»Ω¡ïùÖ»∏ÅIïù…ïÕßÕ∏ÅçΩµ¡…’ïâÑÅπºÅïπôΩ≈’îÅÖ’—Ω∑Ö—•çºÅ‰Åïë•çßÕ∏Å¡Ω»Å—Ω≈’îÏÅ—ïç±ÖëºÅπÖ—•ŸºÅ•A°ΩπîÅπºÅŸï…•ô•çÖâ±îÅï∏Å°…Ωµ•’¥∏(¥ÅÅ¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄÉ
‹ÅHƒÿ¿∞Å—Ω…πïºÅÕ•∏ÅïπôΩ≈’îÅÖ’—Ω∑Ö—•çºÅëï∞ÅèÕë•ùº∏(¥ÅÅ—ïÕ–µ»ƒ‘ÿµ—Ω’…πÖµïπ–µ•πŸ•—Ö—•Ω∏πµ©ÕÄÉ
‹ÅHƒÿ¿∞Å—Ω…πïºÅÕ•∏ÅïπôΩ≈’îÅÖ’—Ω∑Ö—•çºÅëï∞ÅèÕë•ùº∏()=…ëï∏ÅÖë•ç•ΩπÖ∞ÄÃÅΩç—’â…îÄƒ‹Ë»‹Å’Ö—ïµÖ±ÑËÅ—ï·—ºÅï·Öç—ºÅ¡Ω»Å—•¡ºËÅ=1ÅM=IÅIÅPÄ¨ÅQîÅ°ÑÅ•πŸ•—ÖëºÅÑÅ¡Ö…—•ç•¡Ö»Åï∏Åï∞Å—Ω…πïºÅ9=5	IÅ0ÅQ=I9<∏ÅAÖ…ÑÅµ§Åù…’¡ºËÅQîÅ°ÑÅ•πŸ•—ÖëºÅÑÅ¡Ö…—•ç•¡Ö»Åï∏Åï∞Åù…’¡ºÅëîÅ9=5	IÅ0ÅI=H∏Å∞ÅΩ…ùÖπ•ÈÖëΩ»ÅçΩµ¡Ö…—îÅπΩµâ…îÅçÖªÕπ•çºÅëï∞Å—Ω…πïº∞ÅπºÅπΩµâ…îÅëï∞Åç…ïÖëΩ»∏ÅÖµ¡ºÅïë•—Öâ±îÅ9=5	IÅ0ÅQ=I9<Å¡Ö…ÑÅïÕÑÅ•πŸ•—ÖçßÕ∏ÏÅ…ïç’¡ï…ÖçßÕ∏ÅçΩπÕï…ŸÑÅë•ç°ºÅπΩµâ…î∏ÅMïù’πëºÅµïπÕÖ©îÅœÕ±ºÅèÕë•ùº∏ÅM’Õ—•—’ÂîÅ…ïëÖççßÕ∏Å¡…ïŸ•ÑÅëîÅ…ΩπëÑΩ—Ω…πïºÅëîÅç…ïÖëΩ»∏(¥ÅÅ—ïÕ–µ±Öàµ¡…•ŸÖ—îµ…Ω’πêµÕ°Ö…îµô±Ω‹πµ©ÕÄÉ
‹ÅHƒÿ¿∞Å…ïëÖççßÕ∏Åï·Öç—ÑÅ¡Ω»Åù…’¡ºΩ—Ω…πïº∏(¥ÅÅÕç…•¡—ÃΩ…ïŸ•ï‹µ»ƒ‘‰µ›°Ö—ÕÖ¡¿µ—›ºµµïÕÕÖùïÃπµ©ÕÄÉ
‹ÅHƒÿ¿∞Å…ïëÖççßÕ∏Åï·Öç—ÑÅ¡Ω»Åù…’¡ºΩ—Ω…πïº∏(((ååÅHƒÿƒÉ
‹ÅµïπÕÖ©îÉÈπ•çºÅ‰ÅMçΩ…ïÃÅë•…ïç—ΩÃÉ
‹ÄÃÅΩç—’â…îÄ»¿»ÿ)	ÖÕîÅ‰Å…Ω±±âÖç¨ÅHƒÿ¿ÅµÖ•∏‰—òÃÃ–‹¡Öò–‘‘‘‡‹·ê»ÕÑ≈ïà‘‘‘‹ÿÃ–‡≈ê–‰¡î–‘∏Å=…ëï∏ƒ‹Ë‘ƒËÅ’∏ÅÕΩ±ºÅµïπÕÖ©îÅ]°Ö—Õ¡¿∞Å•πŸ•—ÖçßÕ∏Åï∏Å¡…•µï…ÖÃÅ≥µπïÖÃ∞ÅëΩÃÅ≥µπïÖÃÅï∏Åâ±Öπçº∞ÅèÕë•ùºÉÈπ•çÖµïπ—îÅÖ∞Åô•πÖ∞∏ÅM’Õ—•—’ÂîÅëΩÃÅïπ€µΩÃÅHƒ‘‰ΩHƒÿ¿ËÅ’∏ÅÕ°Ö…îÅ—ï·–ÅÕ•∏ÅUI0Ω—•—±îÏÅçÖπçï±ÑΩ…ï•π—ïπ—ÑÅÕ•∏Å¡ï…ëï»ÅΩ…•ùï∏∞Åâ±Ω≈’ïºÅëΩâ±îÅ—Ω≈’î∞ÅÕîÅ…ï—•…ÑÅ…ïç’¡ï…ÖçßÕ∏ÅëîÅÕïù’πëºÅïπ€µºÅÖπ—ï…•Ω»∏Å9ºÅÖô•…µÑÅïπ—…ïùÑÅ…ïÖ∞Åπ§ÅçΩ¡•ÑÅçΩ∏Å—Ω≈’îÅëïπ—…ºÅëîÅ]°Ö—Õ¡¿∏)MçΩ…îÅÖ…êÅM=ILÅQ=I9<ÅÖâ…îÅïŸïπ—ºÅëîÅ±ÑÅ—Ö…©ï—ÑÅÖç—’Ö∞ÅŸÖ±•ëÖπëºÅµïµâ…ïœµÑÅ‰Å¡’â±•çÖπëºÅ¡Ω»ÅïÕç…•—Ω»ÅΩô•ç•Ö∞ÏÅÕ°Ω…—ç’–ÅÕçΩ…ïÃÅçΩπÕï…ŸÑÅïŸïπ—ºÅï·Öç—ºÅ‰ÅïŸ•—ÑÅ¡Ω…—Ö∞ÅÖµ•±‰Å•π—ï…µïë•º∏Å5ïªËÅM=ILÅQ=I9<ÅçΩπÕï…ŸÑÅë•…ïç—Ω…‰ÙƒÅ‰ÅÕï±ïççßÕ∏ÅëîÅΩ—…ΩÃÅïŸïπ—ΩÃ∏ÅM•∏ÅèÕë•ùºΩµïµâ…ïœµÑÅπºÅÖççïëîÅÑÅëÖ—ΩÃÅ¡…•ŸÖëΩÃ∏Å9ºÅçÖµâ•ÑÅµΩ—Ω»∞ÅŸΩË∞Å¡ï…µ•ÕΩÃ∞Å…ΩÕ—ï»ÅºÅÕçΩ…ïÃ∏)çï¡—ÖçßÕ∏ËÅµïπÕÖ©îÅï·Öç—ºÅ’πÑÅ±±ÖµÖëÑ∞ÅëΩÃÅ≥µπïÖÃÅŸÖèµÖÃÅ‰ÅèÕë•ùºÅô•πÖ∞ÏÅçÖπçï±ÑΩï……Ω»ΩëΩâ±îÅ—Ω≈’îÏÅ€µπç’±ºÅëîÅ—Ö…©ï—ÑÅÖç—’Ö∞∞ÅΩ—…ΩÃÅ—Ω…πïΩÃÅœÕ±ºÅë•…ïç—Ω…•ºÅï·¡≥µç•—º∞Å…ï—Ω…πºÅçΩπÕï…ŸÑÅ—Ö…©ï—Ñ∏ÅA…’ïâÖÃÅë•…•ù•ëÖÃÅ‰Å°…Ωµ•’¥ÅEÏÅ]°Ö—Õ¡¿Å…ïÖ∞Ω•A°ΩπîÅπºÅŸï…•ô•çÖëΩÃ∏ÅA’â±•çÖçßÕ∏Å¡ïπë•ïπ—îÅëï∞ÅâÖπçºÅ‰ÅA…ïŸ•ï‹∏(¥ÅÅ•πëï‡µù…’¡Ö∞π°—µ±ÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞Å¡…’ïâÑÅºÅïŸ•ëïπç•ÑÅHƒÿƒ∏(¥ÅÅ±•Ÿîµ°’àπ©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞Å¡…’ïâÑÅºÅïŸ•ëïπç•ÑÅHƒÿƒ∏(¥ÅÅ›°Ö—ÕÖ¡¿µ•πŸ•—Ö—•ΩπÃπ©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞Å¡…’ïâÑÅºÅïŸ•ëïπç•ÑÅHƒÿƒ∏(¥ÅÅ—ïÕ–µµïπ‘µÕçΩ…ïçÖ…êµ—Ω’…πÖµïπ–µÕÂπåπµ©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞Å¡…’ïâÑÅºÅïŸ•ëïπç•ÑÅHƒÿƒ∏(¥ÅÅ—ïÕ–µ»ƒ‘‰µ›°Ö—ÕÖ¡¿µ—›ºµµïÕÕÖùïÃπµ©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞Å¡…’ïâÑÅºÅïŸ•ëïπç•ÑÅHƒÿƒ∏(¥ÅÅ—ïÕ–µ±Öàµ¡…•ŸÖ—îµ…Ω’πêµÕ°Ö…îµô±Ω‹πµ©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞Å¡…’ïâÑÅºÅïŸ•ëïπç•ÑÅHƒÿƒ∏(¥ÅÅÕç…•¡—ÃΩ…ïŸ•ï‹µ»ƒÿƒπµ©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞Å¡…’ïâÑÅºÅïŸ•ëïπç•ÑÅHƒÿƒ∏(¥ÅÅ…ï±ïÖÕîπ©ÕΩπÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞Å¡…’ïâÑÅºÅïŸ•ëïπç•ÑÅHƒÿƒ∏(¥ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞Å¡…’ïâÑÅºÅïŸ•ëïπç•ÑÅHƒÿƒ∏(¥ÅÅI=5A}=YI10πµëÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞Å¡…’ïâÑÅºÅïŸ•ëïπç•ÑÅHƒÿƒ∏(¥ÅÅI=5A}}Q11πµëÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞Å¡…’ïâÑÅºÅïŸ•ëïπç•ÑÅHƒÿƒ∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµëÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞Å¡…’ïâÑÅºÅïŸ•ëïπç•ÑÅHƒÿƒ∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=LπµëÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞Å¡…’ïâÑÅºÅïŸ•ëïπç•ÑÅHƒÿƒ∏(¥ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµëÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞Å¡…’ïâÑÅºÅïŸ•ëïπç•ÑÅHƒÿƒ∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞Å¡…’ïâÑÅºÅïŸ•ëïπç•ÑÅHƒÿƒ∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩAQ%=9}HƒÿƒπµëÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞Å¡…’ïâÑÅºÅïŸ•ëïπç•ÑÅHƒÿƒ∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}HƒÿƒΩïŸ•ëïπçîπ©ÕΩπÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞Å¡…’ïâÑÅºÅïŸ•ëïπç•ÑÅHƒÿƒ∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}HƒÿƒºÃ‰¿µ¡…•ŸÖ—îπ¡πùÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞Å¡…’ïâÑÅºÅïŸ•ëïπç•ÑÅHƒÿƒ∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}HƒÿƒºÃ‰¿µ—Ω’…πÖµïπ–π¡πùÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞Å¡…’ïâÑÅºÅïŸ•ëïπç•ÑÅHƒÿƒ∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}HƒÿƒºÃ‰¿µÖëµ•π•Õ—…Ö»π¡πùÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞Å¡…’ïâÑÅºÅïŸ•ëïπç•ÑÅHƒÿƒ∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}Hƒÿƒº–Ã¿µ¡…•ŸÖ—îπ¡πùÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞Å¡…’ïâÑÅºÅïŸ•ëïπç•ÑÅHƒÿƒ∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}Hƒÿƒº–Ã¿µ—Ω’…πÖµïπ–π¡πùÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞Å¡…’ïâÑÅºÅïŸ•ëïπç•ÑÅHƒÿƒ∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}Hƒÿƒº–Ã¿µÖëµ•π•Õ—…Ö»π¡πùÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏∞Å¡…’ïâÑÅºÅïŸ•ëïπç•ÑÅHƒÿƒ∏()µ¡±•ÖçßÕ∏ƒ‹Ë‘ÃËÅ•πÕ—…’ççßÕ∏ÅΩ¡•ÑÅ‰Å¡ïùÑÅï∞ÅèÕë•ùºÅï∏Å±ÑÅ¡Öπ—Ö±±ÑÅ•π•ç•Ö∞ÅëîÅ…ïù•Õ—…ºÏÅ•πµïë•Ö—Öµïπ—îÅïπ±ÖçîÅÖâÕΩ±’—ºÅëï∞Åµ•ÕµºÅΩ…•ùï∏ÅÑÄΩ•πëï‡µù…’¡Ö∞π°—µ∞˝•π•ç•ºÙƒÏÅëïÕ¡◊•ÃÅ5=1%ÄºÅQ=I9<ÅºÅ5$ÅIUA<ÄºÅÕë•ùºÏÅëΩÃÅ≥µπïÖÃÅŸÖèµÖÃÅ‰ÅèÕë•ùºÅ…ïÖ∞ÅÖ∞Åô•πÖ∞∏ÅUπÑÅ±±ÖµÖëÑÅÕ°Ö…îÅ—ï·–∞ÅÕ•∏ÅUI0ÅÕï¡Ö…ÖëÑÅë’¡±•çÖëÑ∏()YÖ±•ëÖçßÕ∏Å±ΩçÖ∞ÅHƒÿƒËÅâÖπçºÅçΩµ¡±ï—ºÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÃÅï·•–¿ÏÅ¡…’ïâÖÃÅë•…•ù•ëÖÃÅîÅ•π—ïù…ÖçßÕ∏ÅAMLÏÅ°…Ωµ•’¥ÅEÄÃ‰¿º–Ã¿ÅçΩπô•…µÑÅµïπÕÖ©îÉÈπ•çº∞Åïπ±ÖçîÅIïù•Õ—…º∞ÅèÕë•ùºÅô•πÖ∞∞ÅQ=I9<ÅÕ•∏ÅÖ’—ΩôΩç’Ã∞ÅÕçΩ…ïÃÅë•…ïç—ΩÃÅÖµ•±‰Å‰Åë•…ïç—Ω…•ºÅÕï¡Ö…Öëº∞Åï……Ω…Õmt∏Å%∑ÖùïπïÃ»ƒÿ√\–Ã»¿∞Ã¿¡ë¡§∏Å]°Ö—Õ¡¿Å…ïç•â•ëºΩ•A°ΩπîÅõµÕ•çºÅ9<ÅYI%%=LÏÅA…ïŸ•ï‹Å‰Å¡’â±•çÖçßÕ∏Å¡ïπë•ïπ—ïÃ∏(((ååÅHƒÿ»É
‹Å%ÅëîÅ—Ω…πïºÅ¡ï…Õ•Õ—ïπ—îÅ‰ÅèÕë•ùΩÃÅëîÅ’∏Å’ÕºÉ
‹ÄÃÅΩç—’â…îÄ»¿»ÿ)=…ëï∏Åëï∞Å¡…Ω¡•ï—Ö…•ºÅ%5|‘‹ƒƒΩ%5|‘‹ƒ»ËÅ=…ùÖπ•ÈÖëΩ»ÅçΩπÕï…ŸÑÅ%Å¡Ö…ÑÅçΩµ¡Ö…—•»Å¡Ö…—•ç•¡Öπ—ïÃÅ‰Åëµ•π•Õ—…Ö»ÅµÖπ—•ïπîÅï±•µ•πÖçßÕ∏∏Å	ÖÕîΩ…Ω±±âÖç¨ÅµÖ•∏‡Ã‹…çÑ≈çâî»·îÕò‘Ã·åÃ‰‡…î–ƒ’Ñ‘‰…Öî¿’î‡‰·ò∏ÅMîÅµ’ïÕ—…ÑÅèÕë•ùºÅ¡Ω»Å—Ω…πïºÅÖç—•ŸºÅëï∞Åç…ïÖëΩ»ÏÅçΩ¡•Ñ∞Å]°Ö—Õ¡¿Å‰ÅÖç—’Ö±•ÈÖçßÕ∏ÅëîÅèÕë•ùΩÃ∏Å’ïπ—îÅçÖªÕπ•çÑÅÕï…Ÿ•ëΩ»ËÅùÕç}—Ω’…πÖµïπ—}ïπ—…Â}çΩëïÃ∞Å¡ïπë•ïπ—îÅ…ïç’¡ï…Öâ±îÅï∏Åç’Ö±≈’•ï»Åë•Õ¡ΩÕ•—•ŸºÅëîÅ±ÑÅµ•ÕµÑÅç’ïπ—Ñ∞ÅÕï¡Ö…ÖëºÅ¡Ω»ÅïŸïπ—º∏ÅOÕ±ºÅΩ…ùÖπ•ÈÖëΩ»Å¡…Ω¡•ï—Ö…•ºÅ¡’ïëîÅïµ•—•»Ω…ïç’¡ï…Ö»∏Å∞Å•πù…ïÕÖ»Å’πÑÅç’ïπ—ÑÅï∞ÅèÕë•ùºÅ≈’ïëÑÅçΩπÕ’µ•ëºÅ‰ÅπºÅÖëµ•—îÅΩ—…ÑÏÅ…ï•π—ïπ—ºÅëîÅç’ïπ—ÑÅÂÑÅÖëµ•—•ëÑÅïÃÅ•ëïµ¡Ω—ïπ—îÅ¡Ö…ÑÅçΩπÕï…ŸÖ»ÅïÕç…•—Ω»Ω…ΩÕ—ï»∏ÅYÖ±•ëÖçßÕ∏ÅëîÅçÖµ¡ºΩµΩëÖ±•ëÖêΩçÖ¡Öç•ëÖêÅÖπ—ïÃÅëîÅçΩπÕ’µºÏÅç±Ö•¥Å‰Åµïµâ…ïœµÑÅï∏Å’∏ÉÈπ•çºÅME0ÅÖ”Õµ•çº∏Å5$ÅIUA<ÅçΩπÕï…ŸÑÅçΩπ—…Ö—ºÅÖπ—ï…•Ω»∏ÅÕë•ùΩÃÅΩ…•ù•πÖ±ïÃÅëîÅ—Ω…πïΩÃÅ—Öµâß•∏Å¡ÖÕÖ∏Å¡Ω»ÅçΩπÕ’µºÅÖ∞Å•πù…ïÕÖ»∏Å9ºÅµΩë•ô•çÑÅÕçΩ…ïÃ∞ÅµΩ—Ω»∞ÅŸΩË∞Å¡ï…µ•ÕΩÃÅÖëµ•π•Õ—…Ö—•ŸΩÃÅπ§Åï±•µ•πÖçßÕ∏∏)I•ïÕùΩÃËÅ•πù…ïÕºÅ…ï¡ï—•ëºÅ¡Ω»Å…ïïπ€µº∞Å√•…ë•ëÑÅëîÅèÕë•ùº∞ÅÖççïÕºÅÖ©ïπº∞ÅçΩπÕ’µºÅ—…ÖÃÅï……Ω»ÏÅ¡…’ïâÖÃÅAΩÕ—ù…ïME0ÅëîÅÕïù’πëÑÅç’ïπ—ÑÅ…ïç°ÖÈÖëÑ∞Å¡ïπë•ïπ—îÅïÕ—Öâ±î∞Åπ’ïŸºÅèÕë•ùºÅë•Õ—•π—º∞Åï……Ω»ÅëîÅçÖµ¡ºÅÕ•∏ÅçΩπÕ’µº∞Å¡ï…µ•ÕºΩÖ•Õ±Öµ•ïπ—ºΩç•ï……îÅ‰ÅπÖŸïùÖëΩ»Å∑ÕŸ•∞Ã‰¿º–Ã¿ÅçΩ∏ÅçΩ¡‰ΩÕ°Ö…îΩ…ïçÖ…ùÑÅ‰ÅÖëµ•π•Õ—…ÖçßÕ∏∏ÅIΩ±±âÖç¨Åµïë•Öπ—îÅ…ïŸï…ÕßÕ∏ÅëîÅèÕë•ùºÅÕ•∏ÅâΩ……Ö»ÅëÖ—ΩÃÅπ§Å—Öâ±ÑÅÖë•ç•ΩπÖ∞∏Å5•ù…ÖçßÕ∏ÅÖë•—•ŸÑÅIQÅQ	1Å%Å9=PÅa%MQLÅï∏ÅïπÕ’…ïAï…ÕΩπÖ±ççïÕÃ∏Å9ºÅÖô•…µÑÅ•A°ΩπîÅõµÕ•çºÅºÅïπ—…ïùÑÅ]°Ö—Õ¡¿∏ÅA’â±•çÖçßÕ∏ÅA9%9QÅ°ÖÕ—ÑÅùÖ—ïÃ∞ÅâÖπçºÅçΩµ¡±ï—º∞ÅA…ïŸ•ï‹Å‰Åëï¡±ΩÂµïπ—ÃÅId∏(¥ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµëÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏ΩçΩπ—…Ω∞ΩïŸ•ëïπç•ÑÅHƒÿ»∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩAQ%=9}Hƒÿ»πµëÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏ΩçΩπ—…Ω∞ΩïŸ•ëïπç•ÑÅHƒÿ»∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµëÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏ΩçΩπ—…Ω∞ΩïŸ•ëïπç•ÑÅHƒÿ»∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}Hƒÿ»ºÃ‰¿µ•ëÃπ¡πùÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏ΩçΩπ—…Ω∞ΩïŸ•ëïπç•ÑÅHƒÿ»∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}Hƒÿ»º–Ã¿µ•ëÃπ¡πùÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏ΩçΩπ—…Ω∞ΩïŸ•ëïπç•ÑÅHƒÿ»∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}Hƒÿ»ΩïŸ•ëïπçîπ©ÕΩπÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏ΩçΩπ—…Ω∞ΩïŸ•ëïπç•ÑÅHƒÿ»∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏ΩçΩπ—…Ω∞ΩïŸ•ëïπç•ÑÅHƒÿ»∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=LπµëÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏ΩçΩπ—…Ω∞ΩïŸ•ëïπç•ÑÅHƒÿ»∏(¥ÅÅI=5A}}Q11πµëÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏ΩçΩπ—…Ω∞ΩïŸ•ëïπç•ÑÅHƒÿ»∏(¥ÅÅI=5A}=YI10πµëÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏ΩçΩπ—…Ω∞ΩïŸ•ëïπç•ÑÅHƒÿ»∏(¥ÅÅÖ¡§Ω}±•àΩ¡ï…ÕΩπÖ∞µïŸïπ–µÖççïÕÃπ©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏ΩçΩπ—…Ω∞ΩïŸ•ëïπç•ÑÅHƒÿ»∏(¥ÅÅÖ¡§Ω¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏ΩçΩπ—…Ω∞ΩïŸ•ëïπç•ÑÅHƒÿ»∏(¥ÅÅïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏µ’§π©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏ΩçΩπ—…Ω∞ΩïŸ•ëïπç•ÑÅHƒÿ»∏(¥ÅÅïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏π°—µ±ÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏ΩçΩπ—…Ω∞ΩïŸ•ëïπç•ÑÅHƒÿ»∏(¥ÅÅ•πëï‡µù…’¡Ö∞π°—µ±ÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏ΩçΩπ—…Ω∞ΩïŸ•ëïπç•ÑÅHƒÿ»∏(¥ÅÅ¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏ΩçΩπ—…Ω∞ΩïŸ•ëïπç•ÑÅHƒÿ»∏(¥ÅÅ…ï±ïÖÕîπ©ÕΩπÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏ΩçΩπ—…Ω∞ΩïŸ•ëïπç•ÑÅHƒÿ»∏(¥ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏ΩçΩπ—…Ω∞ΩïŸ•ëïπç•ÑÅHƒÿ»∏(¥ÅÅÕç…•¡—ÃΩ…ïŸ•ï‹µ»ƒÿ»πµ©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏ΩçΩπ—…Ω∞ΩïŸ•ëïπç•ÑÅHƒÿ»∏(¥ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏ΩçΩπ—…Ω∞ΩïŸ•ëïπç•ÑÅHƒÿ»∏(¥ÅÅ—ïÕ–µ»ƒÿ»µÕ•πù±îµ’Õîµ—Ω’…πÖµïπ–µçΩëîπµ©ÕÄÉ
‹Å•µ¡±ïµïπ—ÖçßÕ∏ΩçΩπ—…Ω∞ΩïŸ•ëïπç•ÑÅHƒÿ»∏(((åååÅIïç’¡ï…ÖçßÕ∏ÅHƒÿ»É
‹Å¡’â±•çÖçßÕ∏Åâ±Ω≈’ïÖëÑÅ¡Ω»ÅÖ’—ºµ…ïŸ•ï‹)Ωµµ•–Å±ΩçÖ∞Å¡…ΩâÖëºƒÂïà‰ÿ–›Ñ‹—çîƒÃ‘Ãÿ·ê—Ñ‰Âê—à≈î‹·ëÖçÑÃ‘·à–ÏÅ…ÖµÑÅô•‡Ω»ƒÿ»µ—Ω’…πÖµïπ–µÕ•πù±îµ’Õîµ•ëÃ∞ÅΩ…•ùï∏Å°——¡ÃËºΩù•—°’àπçΩ¥ΩAdΩAµdπù•–∏Å	ÖπçºÅçΩµ¡±ï—ºÄΩ—µ¿Ω»ƒÿ»µâÖπ¨µô•πÖ∞π±ΩúÅï·•–¿ÏÅ¡…’ïâÖÃÅAΩÕ—ù…ïME0Ä†‡Å•π—ïπ—ΩÃ∞ƒÅ•πù…ïÕº§Å‰ÅπÖŸïùÖëΩ»Ã‰¿º–Ã¿Å%ΩÖëµ•∏ÅAMLÏÅ≈’Ö±•—‰Ω…ΩÖëµÖ¿Ω•πŸïπ—Ω…‰ÅAMLÅÖπ—ïÃÅëîÅçΩµµ•–∏ÅΩÃÅù•–Å¡’Õ†Å…ïç°ÖÈÖëΩÃÅÖ’—Ω∑Ö—•çÖµïπ—îÏÅπºÅÕ’â•ëÑÅπ§ÅA…ïŸ•ï‹Åπ§ÅÖç—’Ö±•ÈÖçßÕ∏ÅëîÅµÖ•∏Ω1ΩA…Ωë’ççßÕ∏∏ÅΩπïç—Ω»Å•—!’àÅçΩµ¡…ΩãÃÅ…ï¡ºƒÃƒ‹‡‘»ÃÿÃÅ√Èâ±•çº∞Å¡…Ω¡•ï—Ö…•ºÃƒƒ»–‹‘–‹Å•ù’Ö∞ÅÖ∞Å’Õ’Ö…•ºÅÖ’—ïπ—•çÖëº∞Å¡ï…µ•ÕΩÃÅÖëµ•∏Ω¡’Õ†∏ÅMïù’πëºÅ…ïç°ÖÈºÅï·•ùîÅÖ’—Ω…•ÈÖçßÕ∏Åï·¡≥µç•—ÑÅëï∞Å’Õ’Ö…•ºÅ¡Ö…ÑÅë•Ÿ’±ùÖ»ÅèÕë•ùºÅ‰ÅëΩç’µïπ—ÖçßÕ∏ÅÖ∞Å…ï¡ºÅ√Èâ±•çº∏Å9ºÅï±’ë•»Å¡Ω»ÅA$∞ÅΩ—…ºÅ—…ÖπÕ¡Ω…—îÅπ§Å…ï¡ΩÕ•—Ω…•º∏ÅççßÕ∏Å•πë•Õ¡ïπÕÖâ±îÅëï∞Å¡…Ω¡•ï—Ö…•ºËÅÖ’—Ω…•ÈÖ»ÅÕ’â•ëÑÅëîÅHƒÿ»ÅÖ∞Å…ï¡ΩÕ•—Ω…•ºÅ√Èâ±•çºÅAdΩAµd∏ÅQ…ÖÃÅÖ’—Ω…•ÈÖçßÕ∏∞ÅÖùïπ—îÅÕ’âîÅ…ÖµÑ∞ÅŸï…•ô•çÑÅA…ïŸ•ï‹∞Åµï…ùîÅÖ’—Ω…•ÈÖëºÅ‰Åëï¡±ΩÂµïπ—Ã∞Å•πç±’ÂïπëºÅΩ…•ùï∏Å1Å•πÕ—Ö±ÖëºÅÕ•∏ÅçÖµâ•Ö»ÅÖ±µÖçïπÖµ•ïπ—º∏Å’ïπ—ïÃÅ•π•ç•Ö±ïÃËÅçÖ¡—’…ÖÃÅ%5|‘‹ƒƒΩ%5|‘‹ƒ»ÅŸ•Õ—ÖÃÅï∏Åç°Ö–ÏÅ•A°ΩπîÅõµÕ•çºÅ‰Åïπ—…ïùÑÅ]°Ö—Õ¡¿ÅπºÅçï…—•ô•çÖëΩÃ∏ÅIΩ±±âÖç¨‡Ã‹…çÑ≈çâî»·îÕò‘Ã·åÃ‰‡…î–ƒ’Ñ‘‰…Öî¿’î‡‰·ò∏Å©ïç’çßÕ∏ÅQ9%Å—…ÖÃÅù’Ö…ëÖ»Å…ïç’¡ï…ÖçßÕ∏∏(((åååÅµ¡±•ÖçßÕ∏ÅHƒÿ»É
‹ÅèÕë•ùºÅÖπ—ïÃÅºÅëïÕ¡◊•ÃÅëï∞Å…ïù•Õ—…ºÉ
‹ÄÃÅΩç—’â…îƒ‡ËÃÿ)=…ëï∏ËÅ5=1%ΩQ=I9<ÅëïâîÅ¡ï…µ•—•»Å¡ïùÖ»ÅèÕë•ùºÅÕ•∏Å©’ùÖëΩ…ïÃÅ‰Å…ïù•Õ—…Ö»ÅëïÕ¡◊•ÃÏÅÕîÅçΩπÕï…ŸÑÅ±ÑÅ…’—ÑÅ©’ùÖëΩ…ïÃÅ¡…•µï…º∏ÅA$Å•πÕ¡ïç–µ—Ω’…πÖµïπ–µçΩëîÅŸÖ±•ëÑÅïŸïπ—ºÅÖç—•ŸºΩèÕë•ùºΩç’ïπ—ÑÅÕ•∏ÅçΩπÕ’µ•»∞ÅÕ•∏ÅΩ—Ω…ùÖ»Åµïµâ…ïœµÑÅπ§ÅŸï»ÅMçΩ…ïÃ∏ÅΩπÕï…ŸÑÅπΩµâ…îΩçÖµ¡ºΩµΩëÖ±•ëÖêÅï∏ÅâΩ……ÖëΩ»ÏÅ=,ÅçΩµ¡±ï—ÑÅŸÖ±•ëÖçßÕ∏Åëï∞Å…ΩÕ—ï»Å‰Å…ïÖ±•ÈÑÅ©Ω•∏µçΩëîÅÖ”Õµ•çºÅÖπ—ïÃÅëîÅçΩπô•…µÖçßÕ∏∏Å%9%%HÅI=9ÅÕ•ù’îÅÕ•ïπëºÅï∞ÉÈπ•çºÅïÕç…•—Ω»ÅëîÅπ’ïŸÑÅ—Ö…©ï—Ñ∏ÅÕë•ùºÅ•π€Ö±•ëºΩ’ÕÖëºΩçï……ÖëºÅçΩπÕï…ŸÑÅ…ïù•Õ—…ºÅÖπ—ï…•Ω»ÏÅçΩπÕ’±—ÑÅ¡…ïŸ•ÑÅπºÅ≈’ïµÑÅï∞ÅèÕë•ùº∏ÅA…’ïâÑÅAΩÕ—ù…ïME0ÅŸï…•ô•çÑÅçΩπÕ’µïë}Ö–Åπ’±ºÅ—…ÖÃÅ•πÕ¡ïççßÕ∏ÏÅ°…Ωµ•’¥Ã‰¿º–Ã¿Å…ïçΩ……îÅ¡…îµèÕë•ùøäI…ΩÕ—ïÀäI=/äI•π•ç•ºÅΩô•ç•Ö∞Å‰Å©’ùÖëΩ…ïœäIèÕë•ùº∞ÅÕ•∏Åï……Ω…ïÃ∏Å	ÖπçºÅçΩµ¡±ï—ºÄΩ—µ¿Ω»ƒÿ»µ¡…ï…ïù•Õ—…Ö—•Ω∏µâÖπ¨π±ΩúÅï·•–¿∏Å9ºÅ•A°ΩπîÅõµÕ•çºÅπ§Åïπ—…ïùÑÅ]°Ö—Õ¡¿∏Å	±Ω≈’ïºÅëîÅ¡’â±•çÖçßÕ∏Å¡Ω»ÅÖ’—Ω…•ÈÖçßÕ∏Å√Èâ±•çÑÅÕ•ù’îÅŸ•ùïπ—îÏÅπºÅÕîÅŸ’ï±ŸîÅÑÅ•π—ïπ—Ö»ÅÕ’â•ëÑÅÕ•∏ÅÖ’—Ω…•ÈÖçßÕ∏Åï·¡≥µç•—Ñ∏(¥ÅÅÖ¡§Ω}±•àΩ¡ï…ÕΩπÖ∞µïŸïπ–µÖççïÕÃπ©ÕÄÉ
‹Å•πÕ¡ïççßÕ∏Å¡…ïŸ•ÑÅÕ•∏Åµïµâ…ïœµÑΩçΩπÕ’µº∏(¥ÅÅÖ¡§Ω¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄÉ
‹ÅÖççßÕ∏Å•πÕ¡ïç–µ—Ω’…πÖµïπ–µçΩëî∏(¥ÅÅ¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄÉ
‹ÅëßÖ±ΩùºÅÖπ—ïÃÅëîÅ©’ùÖëΩ…ïÃÅ‰Å©Ω•∏ÅÖ∞ÅçΩπô•…µÖ»∏(¥ÅÅ•πëï‡µù…’¡Ö∞π°—µ±ÄÉ
‹ÅëΩÃÅ…’—ÖÃ∞Å¡ï…Õ•Õ—ïπç•ÑÅ‰ÅïÕç…•—Ω»ÅΩô•ç•Ö∞∏(¥ÅÅÕç…•¡—ÃΩ…ïŸ•ï‹µ»ƒÿ»πµ©ÕÄÉ
‹Å…ïŸ•ÕßÕ∏ÅëîÅÖµâÖÃÅ…’—ÖÃ∏(¥ÅÅ—ïÕ–µ»ƒÿ»µÕ•πù±îµ’Õîµ—Ω’…πÖµïπ–µçΩëîπµ©ÕÄÉ
‹Å•πÕ¡ïççßÕ∏ÅπºÅçΩπÕ’µî∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}Hƒÿ»ΩïŸ•ëïπçîπ©ÕΩπÄÉ
‹ÅπÖŸïùÖëΩ»ÅÖµâÖÃÅ…’—ÖÃÅAML∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄÉ
‹ÅÕï±±ºÅÖç—’Ö±•ÈÖëº∏(((ååÅHƒÿÃÉ
‹Å•…ïç—Ω…•ºÅù±ΩâÖ∞ÅëîÅ—Ω…πïΩÃÅÖç—•ŸΩÃÅ‰ÅèÕë•ùºÅçΩ¡•Öâ±îÉ
‹ÄÃÅΩç—’â…îÄ»¿»ÿ)M=ILÅQ=I9<Å…óÈπîÅ—ΩëΩÃÅ±ΩÃÅ—Ω…πïΩÃÅÖç—•ŸΩÃÅëîÅçÖëÑÅïπ—Ω…πºÅëîÅ±ÑÅ¡±Ö—ÖôΩ…µÑ∞ÅÕ•∏Åô•±—…Ö»Å¡Ω»ÅΩ…ùÖπ•ÈÖëΩ»ÅºÅç’ïπ—ÑÅ‰ÅÕ•∏Å≥µµ•—îÅÖ…—•ô•ç•Ö∞ÅëîÄƒ¿¿∏ÅÖëÑÅ—Ö…©ï—ÑÅµÖπ—•ïπîÅÕ‘ÅΩ…•ùï∏ÏÅÖâ…•…±ÑÅ¡…ïÕïπ—ÑÅï∞Å—Ω…πïºÅï±ïù•ëºÅï∏ÅM=ILÅ9I0∞ÅM=ILÅA=HÅQ=K5∞Å	UMHÅ)U=HÅ‰Å5%LÅY=I%Q=L∞Å±ïÂïπëºÅœÕ±ºÅï∞Åïπ—Ω…πºÅëîÅΩ…•ùï∏∏ÅÃÅ’πÑÅôïëï…ÖçßÕ∏ÅëîÅ±ïç—’…Ñ∞ÅÕ•∏ÅÕ•πç…Ωπ•ÈÖ»Åπ§ÅïÕç…•â•»Åïπ—…îÅâÖÕïÃ∏Å1ÑÅ…ïÕ¡’ïÕ—ÑÅ¡ï…µ•—•ëÑÅï·ç±’ÂîÅ°ÖÕ°ïÃ∞Åç…ïëïπç•Ö±ïÃ∞Å—ï≥•ôΩπΩÃÅ‰ÅçÖµ¡ΩÃÅÖ©ïπΩÃÅÖ∞ÅÕçΩ…î∏Å]°Ö—Õ¡¿ÅçΩπÕï…ŸÑÅ•πÕ—…’çç•ΩπïÃÅï∏Åï∞Å¡…•µï»ÅµïπÕÖ©îÅ‰ÅΩô…ïçîÅ=5AIQ%HÅM=1<Å0ÅM%<Å‰Å=A%HÅM=1<Å0ÅM%<Å¡Ω»ÅÕï¡Ö…Öëº∏)çï¡—ÖçßÕ∏Å±ΩçÖ∞ËÅô•·—’…ïÃÅAΩÕ—ù…ïME0ÅçΩ∏Ä»¿Å—Ω…πïΩÃÅÖç—•ŸΩÃÅ¡Ω»Åïπ—Ω…πºÅ‰Ä»¿ÅΩ…ùÖπ•ÈÖëΩ…ïÃÅ¡Ω»Å±ÖëºÅ¡…Ωë’çï∏Å±ΩÃÄ–¿Å—Ω…πïΩÃÅï∏ÅÖµâΩÃÅë•…ïç—Ω…•ΩÃÏÅçÖëÑÅ—Ω…πïºÅëïŸ’ï±ŸîÅÕ’ÃÅMçΩ…ïÃÅçΩ……ïç—ΩÃÅ‰ÅçÖµ¡ΩÃÅ¡…•ŸÖëΩÃÅÖ’Õïπ—ïÃ∏ÅA…’ïâÖÃÅ•π—ïù…ÖëÖÃÅç’â…ï∏Å±ΩÃÅç’Ö—…ºÅëïÕ—•πΩÃÅëï∞Å—Ω…πïºÅÕï±ïçç•ΩπÖëº∞ÅçΩ¡•ÑÅëï∞ÅèÕë•ùº∞Åù…’¡ºΩ—Ω…πïº∞ÅçÖπçï±ÖçßÕ∏Å‰ÅôÖ±±âÖç¨∏Å	ÖπçºÅçΩµ¡±ï—ºÅ1∞Å≈’Ö±•—‰∞Å…ΩÖëµÖ¿ÅîÅ•πŸïπ—Ö…•ºÅAML∏Å°…Ωµ•’¥Å±ΩçÖ∞ÅAMLÅÑÄÃ‰¿Å‰Ä–Ã¿Å¡‡Å¡Ö…ÑÅù…’¡ºÅ‰Å—Ω…πïºËÅ±ÑÅ•πŸ•—ÖçßÕ∏ÅÕîÅçΩµ¡Ö…—îÅ¡…•µï…º∞Åï∞ÅèÕë•ùºÅëïÕ¡◊•ÃÅ‰ÅçΩ¡•Ö»Å—ΩµÑÅœÕ±ºÅï∞ÅèÕë•ùºÏÅçÖπçï±ÖçßÕ∏Å‰Å…ï•π—ïπ—ºÅAML∏ÅIïŸ•ÕßÕ∏Åï∏Åëï¡±ΩÂµïπ—ÃÅ1ΩAI=Å‰Å]°Ö—Õ¡¿ÅõµÕ•çºÅÕ•ù’ï∏Å¡ïπë•ïπ—ïÃ∏ÅIΩ±±âÖç¨ÅÑÅµÖ•∏Åå¡Ñ»¿¿‘ÿ‹¡ëôÖôîƒ»Âê‹›å¡å–—âÑÃ·åƒ»¿›î»Ã¿»Ä°Hƒÿ»§ÏÅÕ•∏Åµ•ù…ÖçßÕ∏Åπ§ÅçÖµâ•ºÅëîÅ∏(¥ÅÅÖ¡§Ω—Ω’…πÖµïπ–µÕçΩ…îµë•…ïç—Ω…‰π©ÕÄÉ
‹Å±•Õ—ÑÅ‰Å±ïç—’…ÑÅ√Èâ±•çÑ∞ÅΩ…•ùï∏Åô•©ºÅ‰ÅçÖµ¡ΩÃÅëîÅÕçΩ…îÅ¡ï…µ•—•ëΩÃ∏(¥ÅÅ±•Ÿîµ°’àπ©ÕÄÉ
‹ÅµïªËÅ…ï’π•ëºÅ‰Å±ïç—’…ÑÅ¡Ω»Åïπ—Ω…πºÅëîÅΩ…•ùï∏∏(¥ÅÅ›°Ö—ÕÖ¡¿µ•πŸ•—Ö—•ΩπÃπ©ÕÄÉ
‹Å•πŸ•—ÖçßÕ∏Å‰ÅèÕë•ùºÅï∏ÅµïπÕÖ©ïÃÅÕï¡Ö…ÖëΩÃ∞ÅçΩ¡•Ö»ÅèÕë•ùº∏(¥ÅÅ—ïÕ–µ»ƒÿÃµç…ΩÕÃµïπŸ•…Ωπµïπ–µ—Ω’…πÖµïπ–µÕçΩ…ïÃπµ©ÕÄÉ
‹Å¡…’ïâÑÅAΩÕ—ù…ïME0ÅAΩÖµ•±‰Å‰Å¡…•ŸÖç•ëÖêÅëîÅçÖµ¡ΩÃ∏(¥ÅÅ—ïÕ–µ±Öàµ¡…•ŸÖ—îµ…Ω’πêµÕ°Ö…îµô±Ω‹πµ©ÕÄÉ
‹Å•π—ïù…ÖçßÕ∏ÅHƒÿÃÅëîÅ•πŸ•—ÖçßÕ∏ÅÕï¡Ö…ÖëÑÅ‰ÅçΩ¡•ÑÅëï∞ÅèÕë•ùº∏(¥ÅÅ—ïÕ–µ±Öàµ…ïù•Õ—…Ö—•Ω∏µ¡…•ŸÖ—îµ…Ω’πëÃµïπ—…‰πµ©ÕÄÉ
‹ÅçΩπ—…Ω∞ÅëîÅë•…ïç—Ω…•ºÅù±ΩâÖ∞Å‰Åï·ç±’ÕßÕ∏ÅëîÅ…ΩπëÖÃÅ¡…•ŸÖëÖÃ∏(¥ÅÅ—ïÕ–µ±Öàµ—Ω’…πÖµïπ–µπÖŸ•ùÖ—•Ω∏πµ©ÕÄÉ
‹ÅçΩπ—…Ω∞ÅëîÅëïÕ—•πΩÃÅïπï…Ö∞∞ÅÖ—ïùΩÀµÑ∞ÅãÈÕ≈’ïëÑÅ‰ÅÖŸΩ…•—ΩÃ∏(¥ÅÅ—ïÕ–µ±Öàµëï¡±ΩÂµïπ–µùÖ—îπµ©ÕÄÉ
‹ÅÕÖ±•ëÑÅëï—ï…µ•π•Õ—ÑÅëîÅ¡…’ïâÖÃÅëîÅï—Ö¡ÖÃÅëï∞Åëï¡±Ω‰∏(¥ÅÅÕç…•¡—ÃΩ¡…Ω©ïç–µ≈’Ö±•—‰µùÖ—îπµ©ÕÄÉ
‹Åïµ•ÕßÕ∏Åœµπç…ΩπÑÅëîÅAMLΩ%0Å¡Ö…ÑÅïŸ•—Ö»Å—…’πçÖ»ÅïŸ•ëïπç•ÑÅÖ∞ÅÕÖ±•»∏(¥ÅÅ—ïÕ–µ»ƒ‘‰µ›°Ö—ÕÖ¡¿µ—›ºµµïÕÕÖùïÃπµ©ÕÄÉ
‹ÅçÖµâ•ºÅHƒÿÃËÅâΩ”Õ∏ÅçΩ¡•ÑÅœÕ±ºÅï∞ÅèÕë•ùºÅ‰Åïπ€µºÅÖ•Õ±Öëº∏(¥ÅÅÕç…•¡—ÃΩ…ïŸ•ï‹µ»ƒ‘‰µ›°Ö—ÕÖ¡¿µ—›ºµµïÕÕÖùïÃπµ©ÕÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}HƒÿÕ}]!QMA@ΩïŸ•ëïπçîπ©ÕΩπÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}HƒÿÕ}]!QMA@ΩÏÃ‰¿∞–Ã¡ÙµÌ¡…•ŸÖ—î±—Ω’…πÖµïπ—Ùπ¡πùÄÉ
‹Å°…Ωµ•’¥Å±ΩçÖ∞ÅAMLÅÖµâΩÃÅµΩëΩÃÅ‰ÅÖπç°ΩÃÏÅÕ•∏Åïπ—…ïùÑÅ…ïÖ∞ÅÑÅ]°Ö—Õ¡¿Åπ§Åçï…—•ô•çÖçßÕ∏ÅëîÅ•A°Ωπî∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}HƒÿÕ}]!QMA@ºÃ‰¿µ¡…•ŸÖ—îπ¡πùÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}HƒÿÕ}]!QMA@ºÃ‰¿µ—Ω’…πÖµïπ–π¡πùÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}HƒÿÕ}]!QMA@º–Ã¿µ¡…•ŸÖ—îπ¡πùÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}HƒÿÕ}]!QMA@º–Ã¿µ—Ω’…πÖµïπ–π¡πùÄÉ
‹ÅçÖ¡—’…ÖÃÅï·•ù•ëÖÃÅ¡Ω»Åï∞ÅùÖ—îÅëîÅÖ…ç°•ŸΩÃ∏(¥ÅÅÕçΩ…ïÃµ’§πçÕÕÄÉ
‹ÅµÖπ—•ïπîÅΩç’±—ΩÃÅ±ΩÃÅâΩ—ΩπïÃÅëîÅçΩµ¡Ö…—•»ΩçΩ¡•Ö»ÅèÕë•ùºÅ°ÖÕ—ÑÅçΩµ¡±ï—Ö»Åï∞Å¡…•µï»Åïπ€µº∏(¥ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄ∞ÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄ∞ÅÅ…ï±ïÖÕîπ©ÕΩπÄÉ
‹Å•π—ïù…ÖçßÕ∏ÅHƒÿÃ∏(((åååÅHƒÿÃÉ
‹Å…ï¡Ö…ÖçßÕ∏Åëï∞ÅùÖ—îÅëîÅëïÕ¡±•ïù’îÉ
‹Ä–ÅëîÅΩç—’â…îÅëîÄ»¿»ÿ)∞Å°Ω—ô•‡Å√Èâ±•çºÅëîÅMçΩ…ïÃÅÖ’—Ω…•ÈÑÉÈπ•çÖµïπ—îÅA=MPÅëîÅ±ïç—’…ÑÅï∏Åï∞Åë•…ïç—Ω…•ºÏÅÅµ•ëë±ï›Ö…îπ©ÕÄÅ‰ÅÅ—ïÕ–µ±•ŸîµÕ°Ö…îµµ•ëë±ï›Ö…îπµ©ÕÄÅ±ºÅëΩç’µïπ—Ö∏Å‰Åç’â…ï∏ÅçΩ∏Å…ïù…ïÕßÕ∏∏Å∞Å¡…•µï»Åâ’•±êÅ¡ΩÕ—ï…•Ω»Åô’îÅ…ïç°ÖÈÖëºÅ¡Ω…≈’îÅïÕ—ÑÅµ•ÕµÑÅµΩë•ô•çÖçßÕ∏ÅπºÅ•πç±◊µÑÅÖµâΩÃÅ…ΩÖëµÖ¡Ã∏ÅÕ—îÅçΩµµ•–Å…ïù•Õ—…ÑÅï∞Å°Ω—ô•‡Åï∏ÅÅI=5A}}Q11πµëÄ∞ÅÅI=5A}=YI10πµëÄÅ‰Å…ïπ’ïŸÑÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄ∏ÅÕ—ÖëºËÅ¡ïπë•ïπ—îÅ…ï¡ï—•»Å±ΩÃÅùÖ—ïÃÅ‰ÅçΩπô•…µÖ»ÅëïÕ¡±•ïù’ïÃÅIdÏÅ±ÑÅ¡Öπ—Ö±±ÑÅ√Èâ±•çÑÅáÈ∏Åµ’ïÕ—…ÑÅï∞Å±•Õ—ÖëºÅ¡Ö…ç•Ö∞∏(((ååÅHƒÿ–É
‹ÅMçΩ…ïÃÅù±ΩâÖ∞ÅçΩπÕï…ŸÑÅï∞Åïπ—Ω…πºÅëîÅΩ…•ùï∏É
‹Ä–ÅëîÅΩç—’â…îÅëîÄ»¿»ÿ)1ÑÅçΩµ¡…ΩâÖçßÕ∏Å√Èâ±•çÑÅHƒÿÃÅµΩÕ—ÀÃÅA…Ωë’ççßÕ∏ÅçΩ∏ÅëΩÃÅ—Ω…πïΩÃÅ‰Å1ÖàÅŸÖèµº∞ÅÖ’π≈’îÅÖµâΩÃÅA=MPÅëïŸΩ±€µÖ∏Å!QQ@Ä»¿¿∏ÅÖ’ÕÑËÅï∞Åë•…ïç—Ω…•ºÅëïÕçÖ…—ÖâÑÅ±ÑÅ…ïÕ¡’ïÕ—ÑÅëï∞Åïπ—Ω…πºÅçΩπÕ’±—ÖëºÅç’ÖπëºÅÕ‘Åï—•≈’ï—ÑÅÅÕΩ’…çïÄÅçΩ•πç•ìµÑÅçΩ∏Å±ÑÅëï∞ÅÕΩ±•ç•—Öπ—î∏ÅHƒÿ–ÅÖÕ•ùπÑÅï∞ÅΩ…•ùï∏ÅÕïüÈ∏Åï∞Åïπë¡Ω•π–Å…ïµΩ—ºÅ‰ÅçΩµâ•πÑÅ¡Ω»Åïπ—Ω…πºÄ¨Å%ÏÅ±ÑÅ…ïù…ïÕßÕ∏ÅÕ•µ’±ÑÅëï±•âï…ÖëÖµïπ—îÅïÕÑÅï—•≈’ï—ÑÅ•πçΩ……ïç—ÑÅ‰ÅçΩµ¡…’ïâÑÄ–¿Å—Ω…πïΩÃ∞ÅÖ¡ï…—’…ÑÅëïÕëîÅÕ‘Åïπ—Ω…πºÅ‰Åï·ç±’ÕßÕ∏ÅëîÅëÖ—ΩÃÅ¡…•ŸÖëΩÃ∏ÅÕ—ÖëºËÅïÕ¡ï…ÑÅâ’•±êÅ‰Å¡…’ïâÑÅ√Èâ±•çÑÅï∏ÅÖµâΩÃÅÖ±•ÖÃ∏(¥ÅÅÖ¡§Ω—Ω’…πÖµïπ–µÕçΩ…îµë•…ïç—Ω…‰π©ÕÄÉ
‹ÅçΩ……ïù•ëÑÅÖ—…•â’çßÕ∏Å‰ÅçΩµâ•πÖçßÕ∏ÅëîÅ—Ω…πïΩÃÅëï∞Åïπ—Ω…πºÅ…ïµΩ—º∏(¥ÅÅ—ïÕ–µ»ƒÿÃµç…ΩÕÃµïπŸ•…Ωπµïπ–µ—Ω’…πÖµïπ–µÕçΩ…ïÃπµ©ÕÄÉ
‹Åô•·—’…îÅ…ïµΩ—ºÅï—•≈’ï—ÑÅµÖ∞ÅÕ‘ÅΩ…•ùï∏ÏÅï·•ùîÄ»¿Å—Ω…πïΩÃÅ¡Ω»Åïπ—Ω…πºÅ‰Å±ïç—’…ÑÅëïÕëîÅï∞Åïπ—Ω…πºÅçΩ……ïç—º∏(¥ÅÅI=5A}}Q11πµëÄ∞ÅÅI=5A}=YI10πµëÄÉ
‹Å…ïù•Õ—…ºÅHƒÿ–Åï∏ÅÖµâÖÃÅ°Ω©ÖÃ∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄÉ
‹ÅÕï±±ºÅÖç—’Ö±•ÈÖëºÅ¡Ö…ÑÅ±ÖÃÅô’ïπ—ïÃÅHƒÿ–∏(((ååÅHƒÿ‘É
‹ÅMçΩ…ïÃÅQΩ…πïºÅëï—ïç—ÑÅ1ÖàÅ¡Ω»Å!ΩÕ–É
‹Ä–ÅëîÅΩç—’â…îÅëîÄ»¿»ÿ)1ÑÅ¡Öπ—Ö±±ÑÅ1ÖàÅÕïù◊µÑÅŸÖèµÑÅëïÕ¡◊•ÃÅëîÅHƒÿ–Å¡Ω…≈’îÅï∞Åïπ—Ω…πºÅ¡ΩìµÑÅç±ÖÕ•ô•çÖ…ÕîÅçΩµºÅA…Ωë’ççßÕ∏Å‰Å±±ÖµÖ»ÅÕ‘Å¡…Ω¡•ºÅë•…ïç—Ω…•ºÅçΩµºÅÕ§Åô’ï…ÑÅï∞Å¡Ö»∏ÅHƒÿ‘Åëï—ïç—ÑÅï∞ÅÖ±•ÖÃÅ…ïç•â•ëºÅ¡Ω»ÅÅ!ΩÕ—ÄΩÅ`µΩ…›Ö…ëïêµ!ΩÕ—Ä∞ÅçΩ∏ÅÅYI1}UI1ÄÅ‰ÅÅYI1}	I9!}UI1ÄÅçΩµºÅ…ïÕ¡Ö±ëº∞Å‰Åï±•ùîÅï∞ÅA$Åëï∞ÅΩ—…ºÅïπ—Ω…πº∏Å1ÑÅ¡…’ïâÑÅç’â…îÅÖµâΩÃÅëΩµ•π•ΩÃÅïÕ—Öâ±ïÃÅ‰ÅUI1ÃÅëîÅëï¡±ΩÂµïπ–∞Å±•Õ—ÖëºÅôïëï…ÖëºÅ‰ÅÖ¡ï…—’…ÑÅ¡Ω»ÅΩ…•ùï∏∏ÅÕ—ÖëºËÅ•µ¡±ïµïπ—ÖçßÕ∏Å¡…ï¡Ö…ÖëÑÏÅA…ïŸ•ï‹Å‰ÅçΩπô•…µÖçßÕ∏ÅŸ•Õ’Ö∞Å√Èâ±•çÑÅ¡ïπë•ïπ—ïÃ∏(¥ÅÅÖ¡§Ω—Ω’…πÖµïπ–µÕçΩ…îµë•…ïç—Ω…‰π©ÕÄÉ
‹Åç±ÖÕ•ô•çÖçßÕ∏Å¡Ω»ÅëΩµ•π•ºÅ…ïç•â•ëºÅ‰ÅUI0ÅëîÅëï¡±ΩÂµïπ–ÏÅÕï±ïççßÕ∏Åëï∞ÅÖ±•ÖÃÅëï∞ÅΩ—…ºÅïπ—Ω…πºÅ¡Ö…ÑÅ±•Õ–Ω…ïÖê∏(¥ÅÅ—ïÕ–µ»ƒÿÃµç…ΩÕÃµïπŸ•…Ωπµïπ–µ—Ω’…πÖµïπ–µÕçΩ…ïÃπµ©ÕÄÉ
‹Å…ïù…ïÕßÕ∏Å¡Ö…ÑÅÖ±•ÖÃÅ1ÖàΩA…Ωë’ççßÕ∏∞ÅUI0ÅëîÅëï¡±ΩÂµïπ–∞Åë•…ïç—Ω…•ºÅëîÅÖµâΩÃÅ±ÖëΩÃ∞Å±ïç—’…ÑÅ‰Å¡…•ŸÖç•ëÖê∏(¥ÅÅI=5A}}Q11πµëÄ∞ÅÅI=5A}=YI10πµëÄÉ
‹Å…ïù•Õ—…ºÅHƒÿ‘∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄÉ
‹ÅÕï±±ºÅÖç—’Ö±•ÈÖëº∏((ååÅHƒÿÿÉ
‹ÅIïç’¡ï…ÖçßÕ∏Åëï∞Åë’ó≈ºÅï∏ÅïŸïπ—ΩÃÅ±ïùÖç‰É
‹Ä–ÅëîÅΩç—’â…îÅëîÄ»¿»ÿ)Ö’ÕÑËÅëµ•π•Õ—…ÖçßÕ∏Å±•Õ—ÑÅïŸïπ—ΩÃÅ¡Ω»ÅÅΩ›πï…}ÖççΩ’π—}•ëÄÏÅ±ÑÅ¡Öπ—Ö±±ÑÅ%ÅëîÅ—Ω…πïºÅ‰ÅM=ILÅ5$ÅIUA<Åëï¡ïπìµÖ∏ÅëîÅ’πÑÅô•±ÑÅÖë•ç•ΩπÖ∞Åï∏ÅÅùÕç}¡ï…ÕΩπÖ±}µïµâï…ÕÄ∏ÅU∏ÅïŸïπ—ºÅ±ïùÖç‰Å¡ΩìµÑÅÖ¡Ö…ïçï»ÅçΩµºÅÖëµ•π•Õ—…Öâ±îÅµ•ïπ—…ÖÃÅÕ‘ÅèÕë•ùºÅπºÅÖ¡Ö…ïèµÑÅ‰ÅÕ‘Åë’ó≈ºÅŸóµÑÉäq9<ÅAIQ9LÅÅ9%9i8ÅIUA?ät∏)Ω……ïççßÕ∏ÅçÖπë•ëÖ—ÑËÅÅ¡ï…ÕΩπÖ∞µïŸïπ—Ãπ±•Õ—ÄÅ•πç±’ÂîÅï∞ÅïŸïπ—ºÅëï∞Åë’ó≈ºÅÖ’∏ÅÕ§ÅôÖ±—ÑÅÕ‘Åô•±ÑÅëîÅµïµâ…ïœµÑÏÅÅ¡ï…ÕΩπÖ±5ïµâï…ÄÅ…ïçΩπÕ—…’ÂîÅï∞Å…Ω∞ÅÅΩ…ùÖπ•Èï…ÄÅœÕ±ºÅÖ∞ÅçΩ•πç•ë•»Åï∞Åë’ó≈ºÅ¡ï…Õ•Õ—•ëºÅçΩ∏Å±ÑÅç’ïπ—ÑÅÖç—’Ö∞∏Å1ΩÃÅëï∑ÖÃÅ’Õ’Ö…•ΩÃÅ—ΩëÖ€µÑÅ…ï≈’•ï…ï∏Åµïµâ…ïœµÑÅ€Ö±•ëÑÅ‰Å±ΩÃÅïÕç…•—Ω…ïÃÅΩô•ç•Ö±ïÃÅµÖπ—•ïπï∏ÅÕ‘ÅçΩπ—…Ω∞ÅëîÅµïµâ…ïœµÑ∏)A…’ïâÖÃÅë•…•ù•ëÖÃËÅHƒÿ»ÅAΩÕ—ù…ïME0ÅçΩπÕï…ŸÑÅ%ÅÕ•πù±îµ’ÕîÅ‰Å…ïç°ÖÈÑÅΩ—…ÑÅç’ïπ—ÑÏÅÅ—ïÕ–µ¡ï…ÕΩπÖ∞µïŸïπ–µ¡ï…µ•ÕÕ•ΩπÃπµ©ÕÄÅ…ïç’¡ï…ÑÅ±ΩÃÅÕçΩ…ïÃÅ¡’â±•çÖëΩÃÅëï∞Åë’ó≈ºÅçΩ∏Å±ÑÅô•±ÑÅ±ïùÖç‰ÅÖ’Õïπ—îÅ‰ÅçΩπÕï…ŸÑÅëïπïùÖçßÕ∏ÅÑÅ—ï…çï…ΩÃÏÅHƒ‘‡ÅMçΩ…ïÃÅµ§Åù…’¡ºÅ‰ÅïŸïπ–ÅÖëµ•π•Õ—…Ö—•Ω∏ÅAMLÏÅÅù•–Åë•ôòÄ¥µç°ïç≠ÄÅAMLÏÅÖ—îÄ¿ÅAMLÅÕΩâ…îÅµÖ•∏Ä‹…ëê¿·à∏)Õ—ÖëºËÅçÖπë•ëÖ—ºÅHƒÿÿÅï∏Å…ÖµÑÅA…ïŸ•ï‹ÏÅA…Ωë’ççßÕ∏Å•π—Öç—Ñ∏Å	’•±êÅ1Åëï—ïç”ÃÅôÖ±±âÖç¨ÅëîÅÕï…Ÿ•çîÅ›Ω…≠ï»ÅîÅ•ëïπ—•ô•çÖëΩ»Å!Q50ÅëïÕôÖÕÖëΩÃÅï∏ÅHƒÿÃÏÅÖµâΩÃÅÕîÅÖ±•πïÖ…Ω∏ÅÑÅHƒÿÿÅ‰ÅÕîÅ…ï¡•—îÅï∞ÅâÖπçºÅçΩµ¡±ï—º∏ÅIïŸ•ÕßÕ∏ÅëîÅ•π—ï…ôÖËÅçΩ∏ÅÖµ•±‰∞ÅèÕë•ùºÅçΩ¡•Öâ±îΩ]°Ö—Õ¡¿∞ÅÕçΩ…ïÃÅëîÅù…’¡º∞Å’Õ’Ö…•ºÅÖ©ïπº∞Å…ïù…ïÕº∞Åç•ï……ïÃÅ‰Å¡ï…Õ•Õ—ïπç•ÑÅ¡ïπë•ïπ—î∏)Yï…•ô•çÖçßÕ∏ÅõµÕ•çÑÅëîÅÅùΩ±òµÕåµù–µ±ÖâÄËÅï∞Åù…’¡ºÅEÅÕîÅç…óÃ∞ÅçΩ¡ßÃÅÕ‘ÅèÕë•ùº∞ÅÖ¡Ö…ïçßÃÅï∏Åëµ•π•Õ—…ÖçßÕ∏Å‰ÅÕ‘ÅÕçΩ…îÅ¡ï…Õ•Õ—ßÃÅ—…ÖÃÅ…ïçÖ…ùÖ»∏ÅMîÅëï—ïç”ÃÅ≈’îÅï∞Åïπ±ÖçîÅ—ÀÖÃÅëîÅëµ•π•Õ—…ÖçßÕ∏Å•ùπΩ…ÖâÑÅÅ…ï—’…πQΩÄÅ‰Å¡ï…ìµÑÅï∞ÅçΩπ—ï·—ºÅëîÅù…’¡ºÏÅçΩ……ïù•ëºÅ‰Åç’â•ï…—ºÅï∏ÅÅ—ïÕ–µïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏πµ©ÕÄ∏Å∞ÅA…ïŸ•ï‹ÅçΩ……ïù•ëºÅáÈ∏ÅôÖ±±ÑÅI=5@Ω%9Y9Q=Id∞Å‰ÅôÖ±—Ö∏Å±ÖÃÅΩ—…ÖÃÅëΩÃÅÖ¡±•çÖç•ΩπïÃÅ‰Åï∞Åë•…ïç—Ω…•ºÅëîÅ—Ω…πïΩÃÅçΩ∏ÅÕïÕßÕ∏ÅëîÅ¡…Ω¡•ï—Ö…•º∏(¥ÅÅÖ¡§Ω}±•àΩ¡ï…ÕΩπÖ∞µïŸïπ–µÖççïÕÃπ©ÕÄÉ
‹Å…ïç’¡ï…ÑÅµïµâ…ïœµÑÅΩ…ùÖπ•ÈÖëΩ…ÑÅÕ•π”•—•çÑÅœÕ±ºÅëïÕëîÅÅΩ›πï…}ÖççΩ’π—}•ëÄ∏(¥ÅÅÖ¡§Ω¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄÉ
‹Å±•Õ—ÑÅÖ∞Åë’ó≈ºÅçΩ∏ÅÅ1PÅ)=%9ÄÏÅπºÅï·¡ΩπîÅïŸïπ—ΩÃÅÑÅΩ—…ÖÃÅç’ïπ—ÖÃ∏(¥ÅÅ—ïÕ–µ»ƒÿ»µÕ•πù±îµ’Õîµ—Ω’…πÖµïπ–µçΩëîπµ©ÕÄÉ
‹Åç’â…îÅÖ’Õïπç•ÑÅëîÅô•±Ñ∞Å±•Õ—ÑÅ‰ÅèÕë•ùºÅëï∞Åç…ïÖëΩ»∏(¥ÅÅ—ïÕ–µ¡ï…ÕΩπÖ∞µïŸïπ–µ¡ï…µ•ÕÕ•ΩπÃπµ©ÕÄÉ
‹Åç’â…îÅÖççïÕºÅëï∞Åë’ó≈ºÅÑÅÕçΩ…ïÃÅï·•Õ—ïπ—ïÃÅ‰ÅëïπïùÖçßÕ∏ÅÑÅ—ï…çï…ΩÃ∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩAQ%=9}HƒÿÿπµëÄÉ
‹Åç…•—ï…•ΩÃÅ‰ÅïŸ•ëïπç•ÑÅëîÅ±ÑÅçΩ……ïççßÕ∏∏(¥ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµëÄÉ
‹Å¡…ïŸïπçßÕ∏ÅëîÅ±ÑÅë•Õç…ï¡Öπç•ÑÅïπ—…îÅÖ’—Ω…•ëÖêÅÖëµ•π•Õ—…Ö—•ŸÑÅ‰Åµïµâ…ïœµÑ∏(¥ÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄ∞ÅÅ…ï±ïÖÕîπ©ÕΩπÄÉ
‹Å•ëïπ—•ô•çÖëΩ…ïÃÅHƒÿÿÅçΩπÕ•Õ—ïπ—ïÃÅ¡Ö…ÑÅÖç—’Ö±•ÈÖçßÕ∏Å•πÕ—Ö±ÖëÑÅ‰Åâ’•±êÅŸ•Õ•â±î∏(¥ÅÅI=5A}=YI10πµëÄ∞ÅÅI=5A}}Q11πµëÄÉ
‹Å…ïù•Õ—…ºÅëΩâ±îÅëîÅHƒÿÿ∏(((åååÅHƒÿÿÉ
‹ÅµÖπ•ô•ïÕ—ºÅëîÅ…ï±ïÖÕîÅçΩ∑È∏ÅÑÅ1Å‰ÅA…Ωë’ççßÕ∏)Å…ï±ïÖÕîπ©ÕΩπÄÅ’ÕÑÅ•ëïπ—•ô•çÖëΩ»Åπï’—…Ö∞ÅÄ»¿»ÿƒ¿¿–µHƒÿŸÄÏÅ±ΩÃÅ¡…ΩÂïç—ΩÃÅçΩπÕï…ŸÖ∏Å±ÑÅµ•ÕµÑÅŸï…ÕßÕ∏ÅHƒÿÿÅï∏ÅÖµâΩÃÅïπ—Ω…πΩÃ∏(((åååÅHƒÿÿÉ
‹Å…ïùïπï…ÖçßÕ∏Åëï∞ÅÕï±±ºÅëïÕ¡◊•ÃÅëï∞ÅÖ©’Õ—îÅëîÅ…ï±ïÖÕî)ÅI=5A}=YI10πµëÄ∞ÅÅI=5A}}Q11πµëÄÅ‰ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄÅ≈’ïëÖ∏ÅÕ•πç…Ωπ•ÈÖëΩÃÅçΩ∏Åï∞ÅµÖπ•ô•ïÕ—ºÅçΩ∑È∏ÅHƒÿÿ∏(((åååÅHƒÿÿÉ
‹Å•ëïπ—•ô•çÖëΩ»ÅçΩ∑È∏Åï∏Å±ÑÅÖ¡±•çÖçßÕ∏Å‰ÅçÖç£§Å•πÕ—Ö±ÖëÑ)ÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄÅ‰ÅÅ•πëï‡µù…’¡Ö∞π°—µ±ÄÅ’ÕÖ∏Åï∞Åµ•ÕµºÅ•ëïπ—•ô•çÖëΩ»Åπï’—…Ö∞Å≈’îÅÅ…ï±ïÖÕîπ©ÕΩπÄÏÅ¡…’ïâÑÅÅ—ïÕ–µ±Öàµ…ïù•Õ—…Ö—•Ω∏µ¡…•ŸÖ—îµ…Ω’πëÃµïπ—…‰πµ©ÕÄÅŸÖ±•ëÑÅï∞ÅÖç’ï…ëº∏(((ååÅHƒÿ‹É
‹Åëµ•π•Õ—…ÖçßÕ∏ËÅ]°Ö—Õ¡¿ÅŸ•Õ•â±î∞ÅçΩπô•…µÖçßÕ∏ÅëîÅçΩ¡•ÑÅ‰Å…ï—•…ºÅëîÅ¡ï…µ•ÕΩÃ)=…ëï∏Ä–ÅΩç—’â…îÄƒ‡Ë‘¿Å’Ö—ïµÖ±ÑËÅ…ï—•…Ö»Å¡ï…µ•ÕΩÃÅÖëµ•π•Õ—…Ö—•ŸΩÃ∞Å¡ï…µ•ÕΩÃÅëîÅ—Ö…©ï—ÖÃÅ‰ÅŸïπ—ÖπÖÃÅëîÅùïπï…Ö»Ω…ïŸΩçÖ»∏ÅÖ’ÕÑÅëï∞Åç’Öë…ºÅô’ï…ÑÅëîÅŸ•Õ—ÑËÅëµ•π•Õ—…ÖçßÕ∏ÅπºÅçÖ…ùÖâÑÅÕçΩ…ïÃµ’§πçÕÃ∞ÉÈπ•çºÅ¡…Ω¡•ï—Ö…•ºÅëï∞Å¡ΩÕ•—•Ω∏Èô•·ïêΩ•πÕï–ΩËµ•πëï‡ÅëîÅÕçΩ…ïÃµëï—Ö•∞µâÖç≠ë…Ω¿∏ÅΩ¡•ÑÅ•πôΩ…µÖâÑÅï∏ÅÕ—Ö—’ÃÅô’ï…ÑÅëîÅŸ•Õ—ÑÏÅÖ°Ω…ÑÅçΩπô•…µÑÅ©’π—ºÅÖ∞ÅâΩ”Õ∏ÅœÕ±ºÅëïÕ¡◊•ÃÅëîÅ›…•—ïQï·–Å…ïÕ’ï±—ºÅ‰Åµ’ïÕ—…ÑÅï……Ω»Å±ΩçÖ∞∏ÅMΩ±•ç•—’êÅëîÅèÕë•ùºÅ‰Å¡ï…µ•ÕΩÃÅëîÅÕï…Ÿ•ëΩ»ÅÕîÅçΩπÕï…ŸÖ∏∏ÅIïù…ïÕßÕ∏ÅY4ÅAMLÏÅA…ïŸ•ï‹ΩπÖŸïùÖëΩ»Å‰Å¡’â±•çÖçßÕ∏Å¡ïπë•ïπ—ïÃ∏ÅEÅï·¡≥µç•—ºÅÖπ—ïÃΩëïÕ¡◊•ÃÅ’ÕÑÅÖ…ç°•ŸΩÃÅâÖÕï±•πîÅHƒÿÿÅçÖ¡—’…ÖëΩÃ∞ÅA%ÃÅÕ•µ’±ÖëÖÃÅ‰ÅÕ°Ö…îÅÕ•µ’±ÖëºÏÅπºÅÖç…ïë•—ÑÅ]°Ö—Õ¡¿Å…ïÖ∞Ω•A°ΩπîÅπ§Å•ù’Ö±ëÖêÅëîÅâÖÕïÃÅÖ•Õ±ÖëÖÃ∏ÅIΩ±±âÖç¨Åò»Ã‹»‡–ÃÂÑ‹ÕÑ‘¿‡›î¿‘≈ò‡Ã‹¿–ÂÖå≈ëçê·ççÑŸò∏(¥ÅÅïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏π°—µ±ÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ΩçΩπ—…Ω∞ÅHƒÿ‹∏(¥ÅÅïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏µ’§π©ÕÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ΩçΩπ—…Ω∞ÅHƒÿ‹∏(¥ÅÅ—ïÕ–µïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏πµ©ÕÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ΩçΩπ—…Ω∞ÅHƒÿ‹∏(¥ÅÅ—ïÕ–µ»ƒÿ‹µÖëµ•∏µÕ°Ö…îµôïïëâÖç¨πµ©ÕÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ΩçΩπ—…Ω∞ÅHƒÿ‹∏(¥ÅÅÕç…•¡—ÃΩô•·—’…ïÕÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ΩçΩπ—…Ω∞ÅHƒÿ‹∏(¥ÅÅÕç…•¡—ÃΩô•·—’…ïÃΩ»ƒÿ‹µÖëµ•∏µâ…Ω›Õï»π°—µ±ÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ΩçΩπ—…Ω∞ÅHƒÿ‹∏(¥ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ΩçΩπ—…Ω∞ÅHƒÿ‹∏(¥ÅÅ•πëï‡µù…’¡Ö∞π°—µ±ÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ΩçΩπ—…Ω∞ÅHƒÿ‹∏(¥ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ΩçΩπ—…Ω∞ÅHƒÿ‹∏(¥ÅÅ…ï±ïÖÕîπ©ÕΩπÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ΩçΩπ—…Ω∞ÅHƒÿ‹∏(¥ÅÅI=5A}=YI10πµëÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ΩçΩπ—…Ω∞ÅHƒÿ‹∏(¥ÅÅI=5A}}Q11πµëÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ΩçΩπ—…Ω∞ÅHƒÿ‹∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=LπµëÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ΩçΩπ—…Ω∞ÅHƒÿ‹∏(¥ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµëÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ΩçΩπ—…Ω∞ÅHƒÿ‹∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄÉ
‹ÅµΩë•ô•çÖçßÕ∏ΩçΩπ—…Ω∞ÅHƒÿ‹∏(¥ÅÅ—ïÕ–µ»ƒ‘ÿµ—Ω’…πÖµïπ–µ•πŸ•—Ö—•Ω∏πµ©ÕÄÉ
‹ÅÖç—’Ö±•ÈÑÅï·¡ïç—Ö—•ŸÑÅ°ï…ïëÖëÑÅëîÅ¡ï…µ•ÕΩÃÅÖ∞Å…ï—•…ºÅΩ…ëïπÖëºÅHƒÿ‹ÏÅâ’•±êÅ…ïµΩ—ºÅÖπ—ï…•Ω»ÅÕîÅëï—’ŸºÅï∏ÅïÕ—ÑÅï·¡ïç—Ö—•ŸÑ∞ÅπºÅÕîÅ¡…ΩµΩŸßÃ∏)Hƒÿ‹ÅEËÅï∞Åô•·—’…îÅÕîÅï©ïç’—ÑÅëïÕ¡◊•ÃÅëï∞Å¡Ö…Õï»Å‰ÅΩµ•—îÅÖ’—†µùÖ—îπ©ÃÅœÕ±ºÅï∏ÅëÖ—ΩÃÅÕ•µ’±ÖëΩÃÅ¡Ω…≈’îÅÕ‘Å…’—ÑÅëîÅ¡…’ïâÑÅπºÅïÃÅëµ•π•Õ—…ÖçßÕ∏∏Å1ÑÅÖ¡±•çÖçßÕ∏ÅçΩπÕï…ŸÑÅÖ’—†µùÖ—îπ©ÃÅÕ•∏ÅçÖµâ•º∏)Hƒÿ‹ÅπÖŸïùÖëΩ»ÅEÅëï—ïç”ÃÅ`Å…áµËÅÕΩâ…îÅ`Åëï∞Åç’Öë…ºÅ]°Ö—Õ¡¿ËÅ…áµËÅçΩ∏ÅËµ•πëï‡Ä»ƒ–‹–‡Ã¿¿ƒÅÕ’¡ï…ÖâÑÅâÖç≠ë…Ω¿Äƒƒ¿¿¿ÏÅΩç’±—Ö»ÅœÕ±ºÅµÖ•∏˘mëÖ—ÑµùÕåµç±ΩÕïtÅµ•ïπ—…ÖÃÄçùÕç]°Ö—Õ¡¡%πŸ•—Ö—•Ω∏Åï·•Õ—î∏ÅïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏π°—µ∞Å‰Å—ïÕ–µ»ƒÿ‹µÖëµ•∏µÕ°Ö…îµôïïëâÖç¨πµ©ÃÅÖù…ïùÖ∏ÅçΩπ—…Ω∞Å¡ï…µÖπïπ—î∏Åπ—ïÃÅ¡ΩÕ•çßÕ∏ÅÕ—Ö—•åÅ—Ω¿‡»¿ΩâΩ——Ω¥ƒÿÿ–ÏÅëïÕ¡◊•ÃÅô•·ïêÅ—Ω¿¿ΩâΩ——Ω¥‡––Åï∏ÅŸ•ï›¡Ω…–‡––ÏÅçΩπô•…µÖçßÕ∏ÅëîÅçΩ¡•ÑÅŸ•Õ•â±î∏Åπ€µΩÃÅEÅÕï¡Ö…ÖëΩÃÅŸï…•ô•çÖëΩÃÏÅç±•¡âΩÖ…êÅŸ•…—’Ö∞ÅëîÅUÅπºÅ¡ï…µ•—îÅ±ïï»Åï∞Å¡Ω…—Ö¡Ö¡ï±ïÃÅπÖ—•Ÿº∞ÅπºÅÕîÅÖç…ïë•—ÑÅ±ïç—’…ÑÅõµÕ•çÑ∏(((ååÅHƒÿ‡É
‹Ä»¿»ÿ¥ƒ¿¥¿–É
‹Å`Åô’πç•ΩπÖ∞ÅëïÕëîÅMçΩ…ïÃÅçΩµ¡Ö…—•ëΩÃ((¥Å=…ëï∏ËÅ…ïŸ•ÕÖ»Å`ÅëîÅ¡Öπ—Ö±±ÖÃÅ¡…•πç•¡Ö±ïÃÅ‰Å…Öµ•ô•çÖç•ΩπïÃ∞ÅçΩ∏Å¡’±ÕÖçßÕ∏Å‰ÅëïÕ—•πºÅçΩµ¡…ΩâÖëº∏(¥ÅÖ±±ºÅ…ï¡…Ωë’ç•ëºÅï∏ÅπÖŸïùÖëΩ»Å…ïÖ∞ÅëîÅA…Ωë’ççßÕ∏ËÄΩ±•Ÿîµ°’àπ°—µ∞˝ëïµºÙƒôÕ°Ö…ïêÙƒÏÅ¡’±ÕÖ»Åï……Ö»ÅMçΩ…ïÃÅçΩπÕï…ŸÑÅ±ÑÅ—Öâ±Ñ∏(¥ÅÖ’ÕÑËÅÕ°Ω›QΩ’…πÖµïπ—AΩ…—Ö∞ÅÖç—•ŸÑÅ’∏Åë•…ïç—Ω…•ºÅ≈’îÅ…ïπëï…QΩ’…πÖµïπ—M°ï±òÅΩç’±—ÑÅç’ÖπëºÅÕ°Ö…ïêÙƒ∏(¥ÅΩ……ïççßÕ∏Å∑µπ•µÑËÅï……Ö»ÅMçΩ…ïÃÅï∏ÅÕ°Ö…ïêÙƒÅºÅë•Õ¡±Ö‰ÙƒÅ’ÕÑÅ°’â	Öç¨ÏÅ…ï—’…πQºÅÖ’—Ω…•ÈÖëºÅçΩπÕï…ŸÑÅ¡…ïçïëïπç•Ñ∏Å•…ïç—Ω…•ºÅπΩ…µÖ∞ÅçΩπÕï…ŸÑÅ…ïù…ïÕºÅÑÅ±•Õ—Ñ∏(¥ÅŸ•ëïπç•ÑÅÖë•ç•ΩπÖ∞ËÅÖµ•±‰Å…ïÖ∞Åï∏ÅA…Ωë’ççßÕ∏ÅçΩπ—•ïπîÅ)•µµ‰Å°ΩÂºÄ–∞Åù…ΩÕÃÄ»¿∞Åπï—ºÄƒÿ∞ÅY8ÏÅ`Å¡Ω»Åë•…ïç—Ω…•ºÅô’πç•ΩπÑ∏Åïπï…Ö∞∞ÅÖ—ïùΩÀµÑ∞Å	’ÕçÖ»Å‰ÅÖŸΩ…•—ΩÃÅçΩ∏Åëï—Ö±±îÅëîÄƒ‡ÅÕçΩ…ïÃÅçï……Ö…Ω∏ÅÕ•∏ÅÕÖ±•»ÅëîÅ±ÑÅ…ÖµÑ∏(¥ÅIïù…ïÕßÕ∏ËÅï©ïç’—Ö»Å°Öπë±ï»ÅëîÅç•ï……îÅçΩ∏ÅµÖ—…•ËÅÕ°Ö…ïêΩë•Õ¡±Ö‰Ωë•…ïç—Ω…•ºΩ…ï—’…πQºÅ‰ÅπïùÖ»ÅëïÕ—•πΩÃÅï·—ï…πΩÃ∏Å9ÖŸïùÖëΩ»ÅA…ïŸ•ï‹Å‰Å¡’â±•çÖçßÕ∏ÅÕîÅ…ïù•Õ—…Ö∏Å—…ÖÃÅŸï…•ô•çÖ»∏(¥ÅI%9Q9QHÅ¡ï…—ïπïçîÅÖ∞ÅçΩµ¡…ΩâÖëΩ»ÅëîÅÖç—’Ö±•ÈÖçßÕ∏ÏÅM%8ÅME0Å¡ï…—ïπïçîÅÖ∞Å¡Ω±±•πúÅëîÅMçΩ…ïÃ∏Å9ºÅçΩπÕ—•—’Âï∏ÅçΩπô•…µÖçßÕ∏ÅëîÅÖç—’Ö±•ÈÖçßÕ∏∏(¥Å3µµ•—îËÅπºÅÕîÅçï…—•ô•çÑÅ•A°ΩπîÅπÖ—•ŸºÅπ§Å—ΩëÖÃÅ±ÖÃÅ…ÖµÖÃÅ¡…•ŸÖëÖÃÅÕ•∏Å’πÑÅÕïÕßÕ∏ÅÖ’—Ω…•ÈÖëÑÅ‰ÅëÖ—ΩÃÅë•Õ¡Ωπ•â±ïÃ∏((¥ÅΩπ—…Ω∞Å¡ï…µÖπïπ—îËÅÅ—ïÕ–µ»ƒÿ‡µÕçΩ…ïÃµç±ΩÕîπµ©ÕÄ∞Å•π—ïù…ÖëºÅï∏ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄÏÅçΩ……ïççßÕ∏Åï∏ÅÅ±•Ÿîµ°’àπ©ÕÄ∏((ååÅHƒÿ‰É
‹Ä»¿»ÿ¥ƒ¿¥¿–É
‹Å•ï……îÅ’π•ôΩ…µîÅ‰Å¡ΩÕ•çßÕ∏ÅëîÅëµ•π•Õ—…ÖçßÕ∏((¥ÅÅÕ°Ω…—ç’—Ãµ’§π©ÕÄËÅ`ÅçΩµ¡Ö…—•ëÑÅçΩ∏ÅµÖ…çºÅŸï…ëîÅëîÄ»Å¡‡Å‰ÉÖ…ïÑÅëîÄ‘–É\Ä‘–Å¡‡∞Å¡ΩÕ•çßÕ∏Åô•©ÑÅçΩ∑È∏Åï∏Å¡Öπ—Ö±±ÖÃÅ‰ÅŸïπ—ÖπÖÃÅ•π—ï…πÖÃÏÅçΩπÕï…ŸÑÅçÖëÑÅÖççßÕ∏ÅëîÅç•ï……î∏(¥Åëµ•π•Õ—…ÖçßÕ∏ËÅï±•µ•πÖ»ÅµÖ…ùï∏ÅŸï…—•çÖ∞ÅÖ’—Ω∑Ö—•çºÅ≈’îÅÖ±ï©ÖâÑÅ”µ—’±ºÅ‰Å±•Õ—ÑÅëîÅ±ÑÅπÖŸïùÖçßÕ∏∏(¥ÅYÖ±•ëÖçßÕ∏ËÅÅ—ïÕ–µ»ƒ‘‹µ’π•ôΩ…¥µπÖŸ•ùÖ—•Ω∏πµ©ÕÄ∞ÅÅ—ïÕ–µ»ƒ‘‡µù…Ω’¿µÕçΩ…ïÃπµ©ÕÄ∞ÅÅ—ïÕ–µ»ƒÿ‡µÕçΩ…ïÃµç±ΩÕîπµ©ÕÄÅ‰Å…ïŸ•ÕßÕ∏Åëï∞ÅπÖŸïùÖëΩ»Å¡’â±•çÖëºÏÅπºÅëïç±Ö…Ö»Å…ïŸ•ÕßÕ∏ÅõµÕ•çÑÅëîÅ•A°ΩπîÅπ§ÅÕ•πç…Ωπ•ÈÖçßÕ∏ÅëîÅëÖ—ΩÃ∏(¥ÅAïπë•ïπ—îÅëïµΩÕ—…ÖëºËÅâÖÕïÃÅ1ΩA…Ωë’ççßÕ∏ÅÕï¡Ö…ÖëÖÃÅ‰ÅÖççïÕºÅÕïù’…ºÅ…ïç°ÖÈÖëºÅçΩ∏Å=II<Å<Å=9QIMEÅ%9=IIQ=LÏÅ±ÑÅ¡’â±•çÖçßÕ∏ÅπºÅµ•ù…ÑÅ…ïù•Õ—…ΩÃ∏((ååÅHƒ‹¿É
‹Ä»¿»ÿ¥ƒ¿¥¿–É
‹ÅAÖ…—•ç•¡ÖçßÕ∏Åï∏Å—Ω…πïºÅï·¡≥µç•—Ñ((¥ÅÅ•πëï‡µù…’¡Ö∞π°—µ±ÄÅ‰ÅÅ¡…•ŸÖ—îµ…Ω’πëÃπ©ÕÄËÅMçΩ…ïÃÅQΩ…πïºÅÕ•∏Å¡ï…—ïπïπç•ÑÅÖâ…îÅŸïπ—ÖπÑÅM=ILÅQ=I9<ÅçΩ∏Å9<ÅAIQ9LÅÅ9%9i8ÅQ=I9<Å‰Å`ÅçΩ∑È∏∏(¥ÅÅ±•Ÿîµ°’àπ©ÕÄÅ‰ÅÅ±•Ÿîµ°’àπ°—µ±ÄËÅµ•ÕµÑÅ•πë•çÖçßÕ∏Åï∏Åë•…ïç—Ω…•ºÅëï∞Å5ïªË∞ÅçΩπÕï…ŸÖπëºÅ±•Õ—ÖëºÅù±ΩâÖ∞∏ÅÖ±±ºÅëîÅ…ïêÅπºÅï≈’•ŸÖ±îÅÑÅÖ’Õïπç•ÑÅëîÅ¡Ö…—•ç•¡ÖçßÕ∏∏(¥ÅÅ—ïÕ–µ»ƒ‘‡µù…Ω’¿µÕçΩ…ïÃπµ©ÕÄËÅçÖÕΩÃÅëîÅ—Ö…©ï—ÑÅÕ•∏ÅïŸïπ—º∞ÅΩ—…ºÅù…’¡ºÅ‰Å—Ω…πïºÅÕ•∏Å©’ùÖëΩ…ïÃÏÅ…ïŸ•ÕßÕ∏ÅëîÅπÖŸïùÖëΩ»ÅÖπ—ïÃÅëîÅ¡’â±•çÖ»∏(¥ÅAï…Õ•Õ—ï∏Åâ±Ω≈’ïΩÃÅëîÅÕ•πç…Ωπ•ÈÖçßÕ∏ÅëîÅ…ïù•Õ—…ΩÃÅ1ΩA…Ωë’ççßÕ∏Å‰Å…ïŸ•ÕßÕ∏Å¡…•ŸÖëÑÅÖ’—ïπ—•çÖëÑÏÅπºÅëïç±Ö…Ö»Äƒ¿¿îÅõµÕ•çºÅëîÅ•A°Ωπî∏((¥ÅHƒ‹¿ËÅëµ•π•Õ—…ÖçßÕ∏ÅŸÖèµÑÅ•πë•çÑÅôÖ±—ÑÅëîÅïŸïπ—ΩÃÅÖëµ•π•Õ—…Öâ±ïÃÅï∏ÅïÕ—îÅïπ—Ω…πºÏÅπºÅÖô•…µÑÅÖ’Õïπç•ÑÅëîÅ—Ω…πïΩÃÅ√Èâ±•çΩÃ∏Å1ÑÅÕ•πç…Ωπ•ÈÖçßÕ∏ÅëîÅ…ïù•Õ—…ΩÃÅ¡ï…µÖπïçîÅ¡ïπë•ïπ—î∏((ååÅHƒ‹ƒÉ
‹Ä»¿»ÿ¥ƒ¿¥¿–É
‹Å•…ïç—Ω…•ºÅù±ΩâÖ∞ÉÈπ•çºÅï∏Åëµ•π•Õ—…ÖçßÕ∏Å‰ÅMçΩ…ïÃ(¥ÅÅÖ¡§ΩïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏π©ÕÄÅ•ëïπ—•ô•çÑÅï∞Åïπ—Ω…πºÅëîÅÕ‘Å±•Õ—ÑÅÖ’—Ω…•ÈÖëÑÏÅπºÅÖ±—ï…ÑÅÖ’—Ω…•ÈÖçßÕ∏Åπ§ÅâÖÕîÅëîÅëÖ—ΩÃ∏(¥ÅÅïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏µ’§π©ÕÄÅ…óÈπîÅ±ΩÃÅ—Ω…πïΩÃÅ√Èâ±•çΩÃÅëîÅÄΩÖ¡§Ω—Ω’…πÖµïπ–µÕçΩ…îµë•…ïç—Ω…ÂÄÅçΩ∏Å±ΩÃÅù…’¡ΩÃΩïŸïπ—ΩÃÅÖëµ•π•Õ—…Öâ±ïÃÅ±ΩçÖ±ïÃ∞Åëïë’¡±•çÖπëºÅ¡Ω»Åïπ—Ω…πº∞Å—•¡ºÅîÅ%∏ÅŸïπ—ΩÃÅ√Èâ±•çΩÃÅπºÅÖ’—Ω…•ÈÖëΩÃÅπºÅ…ïç•âï∏ÅèÕë•ùΩÃÅπ§ÅÖçç•ΩπïÃÅëîÅâΩ……Öëº∏Å……Ω»ÅºÅ±•Õ—ÑÅ¡Ö…ç•Ö∞ÅπºÅï≈’•ŸÖ±îÅÑÅŸÖèµº∏(¥ÅÅ±•Ÿîµ°’àπ©ÕÄËÅYHÅM=ILÅÖâ…îÅï·Öç—Öµïπ—îÅï∞Å—Ω…πïºÅÕï±ïçç•ΩπÖëºÅ¡Ω»Åïπ—Ω…πºΩ%∏(¥ÅÅ—ïÕ–µ»ƒÿ‹µÖëµ•∏µÕ°Ö…îµôïïëâÖç¨πµ©ÕÄËÅç’Ö…ïπ—ÑÅ—Ω…πïΩÃÅï∏ÅëΩÃÅïπ—Ω…πΩÃ∞Å%Å…ï¡ï—•ëºÅïπ—…îÅïπ—Ω…πΩÃ∞Åù…’¡ºÅ¡…•ŸÖëºÅ±ΩçÖ∞∞ÅÖ’—Ω…•ëÖêÅ±ΩçÖ∞∞ÅèÕë•ùΩÃÅÖ©ïπΩÃÅï·ç±’•ëΩÃÅ‰ÅôÖ±±ºÅëîÅ•ëïπ—•ëÖê∏ÅIïŸ•ÕßÕ∏Åï∏ÅπÖŸïùÖëΩ»ÅëîÅÖµâÖÃÅ±•Õ—ÖÃÅ‰ÅÖ¡ï…—’…ÑÅëîÅçÖëÑÅ—Ω…πïºÅÖπ—ïÃÅëîÅ¡’â±•çÖ»∏(¥ÅAïπë•ïπ—îΩ	1=EU<ËÅù…’¡ΩÃÅ¡…•ŸÖëΩÃÅëîÅΩ—…ÖÃÅç’ïπ—ÖÃΩΩÀµùïπïÃÅπºÅÕîÅï·¡Ωπï∏Å√Èâ±•çÖµïπ—îÅπ§ÅÕîÅµ•ù…Ö∏∏Å9ºÅëïç±Ö…Ö»ÅÕ•πç…Ωπ•ÈÖçßÕ∏Å¡…•ŸÖëÑÅπ§Äƒ¿¿îÅëîÅ…ïŸ•ÕßÕ∏ÅπÖ—•ŸÑÅ•A°Ωπî∏((ååÅHƒ‹»ÉäPÅë•…ïç—Ω…•ºÅÖ’—Ω∑Ö—•çºÄ†»¿»ÿ¥ƒ¿¥¿‘§)ëµ•π•Õ—…ÖçßÕ∏Å‰ÅMçΩ…ïÃÅçΩπÕ’±—Ö∏Åï∞Åë•…ïç—Ω…•ºÅù±ΩâÖ∞ÅçÖëÑÄ‘ÅÕïù’πëΩÃÅµ•ïπ—…ÖÃÅ±ÑÅ¡Öπ—Ö±±ÑÅïÕ”ÑÅŸ•Õ•â±îÅ‰ÅÖ∞Å…ïç’¡ï…Ö»ÅŸ•Õ•â•±•ëÖêÅºÅçΩπï·ßÕ∏∏Å1ÖÃÅçΩπÕ’±—ÖÃÅ—•ïπï∏Å≥µµ•—îÅëîÄ‡ÅÕïù’πëΩÃ∞ÅπºÅÕîÅÕ’¡ï…¡Ωπï∏Å‰Å¡…ïÕï…ŸÖ∏Å±ÑÅ±•Õ—ÑÅçΩπΩç•ëÑÅÖπ—îÅï……Ω…ïÃÅºÅ…ïÕ¡’ïÕ—ÖÃÅ¡Ö…ç•Ö±ïÃÏÅëµ•π•Õ—…ÖçßÕ∏ÅçΩπÕï…ŸÑÅï∞Åëï—Ö±±îÅÖâ•ï…—ºÅ‰ÅMçΩ…ïÃÅµÖπ—•ïπîÅ±ÑÅÕï±ïççßÕ∏Åç’ÖπëºÅπºÅ°Ö‰ÅçÖµâ•ΩÃ∏Å1ÑÅ±±ïùÖëÑÅÕîÅŸï…•ô•èÃÅçΩ∏ÅÅÕç…•¡—ÃΩô•·—’…ïÃΩ»ƒ‹»µÖ’—ºµë•…ïç—Ω…‰π°—µ±Ä∞ÅÕ•∏Åç…ïÖ»Å—Ω…πïΩÃÅ…ïÖ±ïÃ∞Å‰ÅçΩ∏ÅÅ—ïÕ–µ»ƒ‹»µë•…ïç—Ω…‰µÖ’—ºµ…ïô…ïÕ†πµ©ÕÄ∏((ååÅHƒ‹»ÉäPÅçΩ……ïççßÕ∏ÅëîÅ•πŸïπ—Ö…•ºÅ‰ÅçΩµ¡•±ÖçßÕ∏Ä†»¿»ÿ¥ƒ¿¥¿‘§)MîÅ…ïçÖ±ç’≥ÃÅÅÕΩ’…çï•ùïÕ—ÄÅÕΩâ…îÅ±ΩÃÅM!ÅëîÅ•–ÅëîÅ±ΩÃÄ‰¿‘ÅÖ…ç°•ŸΩÃÅÖç—•ŸΩÃ∏Å1ÑÅ°’ï±±ÑÅÖπ—ï…•Ω»ÅπºÅçΩ……ïÕ¡ΩπìµÑÅÖ∞ÉÖ…âΩ∞ÅçΩµ¡…Ωµï—•ëºÅ‰Å°ÖèµÑÅôÖ±±Ö»Å%9Y9Q=IdÅQ∏ÅYï…çï∞Å—Öµâß•∏Åëï—ïç”ÃÅ’πÑÅï·¡…ïÕßÕ∏Å•π€Ö±•ëÑÅï∏ÅÅ•πëï‡µù…’¡Ö∞π°—µ±ÄÏÅÕîÅ…ïÕ—Ö’ÀÃÅï∞Å≥µµ•—îÅÅ5Ö—†πµ•∏†ƒ‡∞Å9’µâï»°µÖ·!Ω±î•Òƒ‡•Ä∏Å1ΩÃÅ—…ïÃÅAÅ¡ï…µÖπïçï∏ÅÕï±±ÖëΩÃÅï∏ÅÅ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄ∏()Hƒ‹»ÉäPÅMîÅ…ïÕ—Ö’ÀÃÉµπ—ïù…Öµïπ—îÅï∞Å°•Õ—Ω…•Ö∞ÅÖπ—ï…•Ω»ÅëïÕëîÅµÖ•∏Å‰ÅÕîÅçΩπÕï…ŸÖ…Ω∏ÉÈπ•çÖµïπ—îÅ±ÖÃÅÖπΩ—Öç•ΩπïÃÅëîÅïÕ—ÑÅŸï…ÕßÕ∏∏((ååÅHƒ‹»ÉäPÅÖ…ç°•ŸΩÃÅ•πç±’•ëΩÃÅï∏Å±ÑÅçΩπÕΩ±•ëÖçßÕ∏Ä†»¿»ÿ¥ƒ¿¥¿‘§)1ÑÅ¡’ï…—ÑÅëîÅ°Ω©ÑÅëîÅ…’—ÑÅ…ïù•Õ—…ÑÅï∞ÅÖ±çÖπçîÅ•π—ïù…ÖëºÅï∏ÅµÖ•∏Ë(¥ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµëÄ(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄ(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=LπµëÄ(¥ÅÅI=5A}}Q11πµëÄ(¥ÅÅI=5A}=YI10πµëÄ(¥ÅÅë•…ïç—Ω…‰µÖ’—ºµ…ïô…ïÕ†π©ÕÄ(¥ÅÅïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏µ’§π©ÕÄ(¥ÅÅïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏π°—µ±Ä(¥ÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä(¥ÅÅ±•Ÿîµ°’àπ°—µ±Ä(¥ÅÅ±•Ÿîµ°’àπ©ÕÄ(¥ÅÅ…ï±ïÖÕîπ©ÕΩπÄ(¥ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄ(¥ÅÅÕç…•¡—ÃΩô•·—’…ïÃΩ»ƒ‹»µÖ’—ºµë•…ïç—Ω…‰π°—µ±Ä(¥ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄ(¥ÅÅ—ïÕ–µ»ƒ‹»µë•…ïç—Ω…‰µÖ’—ºµ…ïô…ïÕ†πµ©ÕÄ((ååÅHƒ‹ÃÉ
‹ÅΩ…•ùï∏ÅŸ•Õ•â±îÅ‰ÅÖ±çÖπçîÅëîÅ%É
‹Ä–ÅΩç—’â…îÄ»¿»ÿ)’ïπ—îΩâÖÕîÅ‰Å…Ω±±âÖç¨ËÅµÖ•∏Åå»‘Ã…òÕå‰—ò…îÂïââò—âåÿ—ò‰ÿ‡¿Õëî’âïò¡î»–ÿÄ°Hƒ‹»§∏ÅIï¡…Ωë’ççßÕ∏Åï∏ÅA…Ωë’ççßÕ∏ËÅÖµ•±‰Å—•ïπîÅëÖ—ÑµïŸïπ–µÕΩ’…çîı±ÖàÅ‰ÅMÖπ—ÑÅëï±ô•πÑı¡…Ωë’ç—•Ω∏∞Å¡ï…ºÅÖµâÖÃÅ—Ö…©ï—ÖÃÅµΩÕ—…ÖâÖ∏ÉÈπ•çÖµïπ—îÅQ=I9<∏Å∞Åë•…ïç—Ω…•ºÅ√Èâ±•çºÅïÃÅôïëï…ÖëºÏÅ±ΩÃÅèÕë•ùΩÃÅëîÅ’∏Å’ÕºÅÕ•ù’ï∏Å¡ï…—ïπïç•ïπëºÅÖ∞ÅΩ…ùÖπ•ÈÖëΩ»Å‰ÅÑÅ±ÑÅâÖÕîÅëîÅΩ…•ùï∏∏Å±çÖπçîÅ∑µπ•µºËÅµΩÕ—…Ö»Å1	=IQ=I%<ΩAI=U'M8Å¡Ω»Å—Ö…©ï—ÑÅ‰Åï·¡±•çÖ»Åï∞ÅÖççïÕºÅÑÅ%ΩùïÕ—ßÕ∏Åç’ÖπëºÅ±ÑÅô•±ÑÅïÃÅœÕ±ºÅ√Èâ±•çÑÏÅ%ÅÅQ=I9<Å•πë•çÑÅï∞ÅÖµâ•ïπ—îÅëïŸ’ï±—ºÅ¡Ω»ÅÕ‘ÅA$ÅëîÅ±•Õ—ÑÅÖ’—Ω…•ÈÖëÑ∏Å9ºÅµ•ù…ÑÅëÖ—ΩÃÅπ§ÅÖµ¡≥µÑÅ¡ï…µ•ÕΩÃ∏Åçï¡—ÖçßÕ∏ËÅΩ…•ùï∏ÅŸ•Õ•â±îÅçΩ……ïç—º∞Åµ•ÕµºÅ%Åï∏ÅëΩÃÅâÖÕïÃÅçΩπÕï…ŸÑÅëΩÃÅô•±ÖÃ∞Åπ•πüÈ∏ÅèÕë•ùºÅºÅÖççßÕ∏ÅÖ©ïπÑÅÖ¡Ö…ïçî∞ÅMçΩ…ïÃÅÖâ…îÅï∞ÅΩ…•ùï∏Åï±ïù•ëº∞Å±•Õ—ÑÅ‰Å…ïù…ïÕºÅçΩπÕï…ŸÖëΩÃ∏ÅI•ïÕùΩÃËÅç±•ïπ—îÅ•πÕ—Ö±ÖëºÅHƒ‘‘ÅΩâÕï…ŸÖëºÏÅπºÅçï…—•ô•çÖ»ÅÕ‘ÅÖç—’Ö±•ÈÖçßÕ∏Åπ§ÅèÕë•ùΩÃÅëîÅ±ÑÅç’ïπ—ÑÅëï∞Å¡…Ω¡•ï—Ö…•ºÅÕ•∏ÅÖççïÕºÅ…ïÖ∞∏ÅA±Ö∏ËÅ…ïù…ïÕ•ΩπïÃÅëîÅë•…ïç—Ω…•ºΩèÕë•ùΩÃ∞ÅâÖπçºÅ1Å‰Å…ïçΩ……•ëºÅï∏ÅA…ïŸ•ï‹ÅIdÅçΩ∏ÅëÖ—ΩÃÅ√Èâ±•çΩÃÅ…ïÖ±ïÃ∏ÅÕ—ÖëºÅÖ∞Å…ïù•Õ—…Ö»ËÅçΩ……ïççßÕ∏Å±ΩçÖ∞ÅÖ¡±•çÖëÑÏÅA…ïŸ•ï‹Å‰Å¡’â±•çÖçßÕ∏Å¡ïπë•ïπ—ïÃ∏)…ç°•ŸΩÃËÅÅïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏µ’§π©ÕÄ∞ÅÅÖ¡§Ω¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄ∞ÅÅ¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄ∞ÅÅ—ïÕ–µ»ƒÿ‹µÖëµ•∏µÕ°Ö…îµôïïëâÖç¨πµ©ÕÄ∞ÅÅ—ïÕ–µ»ƒÿ»µÕ•πù±îµ’Õîµ—Ω’…πÖµïπ–µçΩëîπµ©ÕÄ∞ÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄ∞ÅÅ…ï±ïÖÕîπ©ÕΩπÄ∞ÅÅI=5A}=YI10πµëÄ∞ÅÅI=5A}}Q11πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=LπµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄ∏((ååÅHƒ‹ÃÉ
‹ÅèÕë•ùºÅ•πç±’•ëºÅï∏Å±ÑÅ¡…•µï…ÑÅ•πŸ•—ÖçßÕ∏É
‹Ä‘ÅΩç—’â…îÄ»¿»ÿ)Ö’ÕÑÅçΩµ¡…ΩâÖëÑÅï∏ÅÅ›°Ö—ÕÖ¡¿µ•πŸ•—Ö—•ΩπÃπ©ÕÄËÅ±ÑÅ¡…•µï…ÑÅ•πŸ•—ÖçßÕ∏ÅΩµ•”µÑÅï∞ÅèÕë•ùºÅ‰Å¡…Ωµï”µÑÅ’∏ÅÕïù’πëºÅµïπÕÖ©îÏÅçΩµ¡Ö…—•»ΩçΩ¡•Ö»ÅœÕ±ºÅèÕë•ùºÅïÕ—ÖâÑÅΩç’±—ºÅ°ÖÕ—ÑÅçΩµ¡±ï—Ö»Åï∞Å¡…•µï…º∏ÅΩ……ïççßÕ∏Å∑µπ•µÑËÅ±ÑÅ¡…•µï…ÑÅ•πŸ•—ÖçßÕ∏ÅçΩπ—•ïπîÅM%<ÅÅ%9IM<Å‰ÅÕ‘ÅŸÖ±Ω»ÏÅçΩµ¡Ö…—•»ΩçΩ¡•Ö»ÅœÕ±ºÅèÕë•ùºÅ≈’ïëÑÅŸ•Õ•â±îÅëïÕëîÅï∞Å•π•ç•º∏Å1ÑÅçΩπô•…µÖçßÕ∏Å•πë•çÑÅ¡…ï¡Ö…Ö»ΩçΩµ¡±ï—Ö»Åïπ€µºÅï∏Å]°Ö—Õ¡¿∞Åπ’πçÑÅïπ—…ïùÑÅÖ∞ÅëïÕ—•πÖ—Ö…•º∏ÅIïù…ïÕ•ΩπïÃËÅÅ—ïÕ–µ»ƒ‘‰µ›°Ö—ÕÖ¡¿µ—›ºµµïÕÕÖùïÃπµ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµ¡…•ŸÖ—îµ…Ω’πêµÕ°Ö…îµô±Ω‹πµ©ÕÄÏÅ•πŸ•—Öç•ΩπïÃÅëîÅù…’¡ºΩ—Ω…πïº∞Å¡ÖÂ±ΩÖêÅï·Öç—º∞ÅôÖ±±âÖç¨Å›Ñπµî∞ÅçÖπçï±ÖçßÕ∏Ω…ï•π—ïπ—º∞ÅçΩ¡•ÑÅ‰Å…ïù…ïÕºÅÑÅMçΩ…îÅÖ…ê∏Å	ÖπçºÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄÅçΩµ¡±ï—ºÅAMLÅ”•çπ•çºÅï∞Ä‘ÅΩç—’â…îÏÅπºÅï≈’•ŸÖ±îÅÑÅπÖŸïùÖëΩ»Åπ§Å•A°ΩπîÅõµÕ•çº∏Å	±Ω≈’ïºÅ…ïÖ∞ÅëîÅ¡’â±•çÖçßÕ∏ΩŸï…•ô•çÖçßÕ∏ËÅ1Å‰ÅA…Ωë’ççßÕ∏Å…ïÕ¡Ωπëï∏Ä–¿»ÅA1=e59Q}%M	1Å‰Åµ’ïÕ—…Ö∏Åï¡±ΩÂµïπ–ÅAÖ’ÕïêÏÅëÖÕ°âΩÖ…êÅëï∞Åï≈’•¡ºÅµÖ…çÑÅ=Ÿï…ë’îÅ‰ÅAÖÂµïπ–ÅôÖ•±ïê∏ÅÖç—’…ÖçßÕ∏Å…ï≈’•ï…îÅÖççßÕ∏Åëï∞Å—•—’±Ö»∞ÅÕ•∏Å…ï•π—ïπ—ΩÃÅç•ïùΩÃÅëîÅëïÕ¡±•ïù’î∏ÅHƒ‹ÃÅ¡ï…µÖπïçîÅçÖπë•ëÖ—ºÅ±ΩçÖ∞ÅÕ•∏ÅÖ¡…ΩâÖçßÕ∏ÅëîÅ…ïçΩ……•ëºÅ…ïÖ∞Åπ§Å¡’â±•çÖçßÕ∏∏ÅIΩ±±âÖç¨ΩâÖÕîËÅå»‘Ã…òÕå‰—ò…îÂïââò—âåÿ—ò‰ÿ‡¿Õëî’âïò¡î»–ÿ∏((ååÅHƒ‹ÃÉ
‹Å—ïÕ–Å°ΩÕ–µÖ›Ö…îÅ¡Ö…ÑÅëïÕ¡±•ïù’ïÃÅYï…çï∞É
‹Ä‘ÅΩç—’â…îÄ»¿»ÿ)∞ÅA…ïŸ•ï‹Å1ÅôÖ±≥ÃÅçΩπç…ï—Öµïπ—îÅï∏ÅHƒÿ»ËÅ°ΩÕ–ÅëîÅ¡…Ωë’ççßÕ∏ÅïÕ¡ï…ÖëºÅÅ¡…Ωë’ç—•ΩπÄ∞ÅΩâ—ïπ•ëºÅÅ±ÖâÄ∞Å¡Ω…≈’îÅÕ‘Å¡…ΩçïÕºÅ—ïªµÑÅÅYI1}AI=)Q}%ÄÅëï∞Å¡…ΩÂïç—ºÅ1∏Å∞Å°Öπë±ï»Å¡…•Ω…•ÈÑÅ±ÑÅ•ëïπ—•ëÖêÅëï∞Å¡…ΩÂïç—ºÅÕΩâ…îÅï∞Å°ΩÕ–ÏÅï∞Å—ïÕ–ÅïπŸ•ÖâÑÅ°ΩÕ–ÅëîÅ¡…Ωë’ççßÕ∏ÅÕ•∏ÅÕ•µ’±Ö»Åï∞Å¡…ΩÂïç—ºÅ¡…Ωë’ç—•Ÿº∏Å∞Å°ï±¡ï»ÅÖ°Ω…ÑÅçΩπô•ù’…ÑÅ%ÅëîÅ¡…ΩÂïç—ºÅ1ΩAI=Å¡Ω»Å°ΩÕ–Å‰ÅÕ•ïµ¡…îÅ…ïÕ—Ö’…ÑÅï∞ÅŸÖ±Ω»ÅÖπ—ï…•Ω»∏ÅÅπΩëîÅ—ïÕ–µ»ƒÿ»µÕ•πù±îµ’Õîµ—Ω’…πÖµïπ–µçΩëîπµ©ÕÄÅAMLÅï∏Åï∞Åïπ—Ω…πºÅ±ΩçÖ∞ÏÅ±ÑÅ¡…’ïâÑÅçΩπÕï…ŸÑÅï∞Åç°ï≈’ïºÅëîÅ±ΩçÖ±°ΩÕ–ÅçΩπ—…ÑÅ•ëïπ—•ëÖêÅ…ïÖ∞∏Å9ºÅçÖµâ•ÑÅï∞Å°Öπë±ï»Åπ§Å±ΩÃÅëÖ—ΩÃ∏ÅIï≈’•Õ•—ºÅëîÅÕÖ±•ëÑËÅâ’•±êÅçΩµ¡±ï—ºÅ‰Å…ïçΩ……•ëºÅ…ïÖ∞ÅA…ïŸ•ï‹ÏÅ!QQ@Ä»¿¿ÅÖç—’Ö∞ÅÕ•ù’îÅï∏ÅHƒ‹»∏)Hƒ‹ÃÅA…ïŸ•ï‹ÅôΩ±±Ω‹µ’¿ËÅÕïçΩπêÅYï…çï∞ÅôÖ•±’…îÅ›ÖÃÅ—°îÅ°ï±¡ï»ùÃÅ±ΩçÖ±°ΩÕ–ÅÖÕÕï…—•Ω∏ÅΩµ•——•πúÅÅM}9Y%I=959Pı±ÖâÄÏÅ•–ÅπΩ‹Åëï…•ŸïÃÅï·¡ïç—ïêÅÕΩ’…çîÅô…Ω¥ÅÅ—Ω’…πÖµïπ—•…ïç—Ω…ÂπŸ•…Ωπµïπ—ÄÅÖπêÅÕ•µ’±Ö—ïÃΩ…ïÕ—Ω…ïÃÅâΩ—†ÅïπŸ•…Ωπµïπ–ÅŸÖ…•Öâ±ïÃÅ¡ï»Å°ΩÕ—πÖµî∏Å•…ïç—ïêÅ—ïÕ–Å¡ÖÕÕïÃÅ’πëï»Å1∞ÅA…Ωë’ç—•Ω∏ÅÕ•µ’±Ö—•Ω∏∞ÅÖπêÅëïôÖ’±–Å±ΩçÖ∞ÅïπŸ•…Ωπµïπ–∏)Hƒ‹ÃÅôΩ±±Ω‹µ’¿Ä»ËÅA…ïŸ•ï‹ÅçΩπô•…∑ÃÅ≈’îÅHƒÿ»Åë’¡±•çÖâÑÅï∞ÅµÖ¡ïºÅëîÅïπ—Ω…πºÅÂÑÅç’â•ï…—ºÅ¡Ω»ÅÅ—ïÕ–µ»ƒÿÃµç…ΩÕÃµïπŸ•…Ωπµïπ–µ—Ω’…πÖµïπ–µÕçΩ…ïÃπµ©ÕÄÏÅÕîÅ…ï—•ÀÃÅïÕÑÅÖÕï…çßÕ∏Å…ïë’πëÖπ—îÅëîÅHƒÿ»∏ÅHƒÿ»Å≈’ïëÑÅï∏ÅÖ’—Ω…•ÈÖçßÕ∏Ωç•ç±ºÅëîÅŸ•ëÑÅëï∞ÅèÕë•ùºÏÅHƒÿÃÅŸï…•ô•çÑÅ1ΩAI=ÅçΩ∏ÅŸÖ…•Öâ±ïÃÅ‰Å°ΩÕ—Ã∏ÅµâΩÃÅë•…•ù•ëΩÃÅAMLÅ±ΩçÖ∞Å‰ÅçΩ∏ÅM}9Y%I=959Pı±Öà∏((ååÅHƒ‹ÃµƒÉ
‹Åï—•≈’ï—ÑÅŸ•Õ•â±îÅÕ•πç…Ωπ•ÈÖëÑÉ
‹Ä‘ÅΩç—’â…îÄ»¿»ÿ)Ö¡—’…ÖÃÅ…ïÖ±ïÃÅ1ΩA…Ωë’ççßÕ∏ÅµΩÕ—…Ö…Ω∏ÅHƒ‘‘∏ÅŸ•ëïπç•ÑÅë•…ïç—ÑÅëï∞Å!Q50ÅëïÕ¡±ïùÖëºËÅÅµï—ÖmπÖµîıùÕçúµ…ï±ïÖÕïuÄÅÂÑÅï…ÑÅÄ»¿»ÿƒ¿¿–µHƒ‹ÕÄ∞Åµ•ïπ—…ÖÃÅ≈’îÅï∞ÅçΩπ—ïπ•ëºÅ±•—ï…Ö∞ÅëîÅÄçÖ¡¡Iï±ïÖÕï	ÖëùïÄÅÕïù◊µÑÅÅYIM'M8ÅHƒ‘’ÄÏÅ…ï±ïÖÕîπ©ÕΩ∏Å¡Ω»Åœ¥ÅÕΩ±ºÅπºÅëïµΩÕ—…ÖâÑÅ±ÑÅŸï…ÕßÕ∏ÅŸ•Õ•â±î∏ÅMîÅÖ±•πïÑÅï∞Å—ï·—ºÅ•π•ç•Ö∞ÅÑÅHƒ‹ÃÅ‰ÅÕîÅçÖµâ•ÑÅï∞Å%Å”•çπ•çºÅÑÅÄ»¿»ÿƒ¿¿‘µHƒ‹Ãµ≈ÄÅï∏ÅÅ…ï±ïÖÕîπ©ÕΩπÄ∞ÅÅ•πëï‡µù…’¡Ö∞π°—µ±ÄÅ‰ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄÅ¡Ö…ÑÅ≈’îÅ’πÑÅ•πÕ—Ö±ÖçßÕ∏ÅHƒ‹ÃÅëï—ïç—îÅ±ÑÅçΩµ¡•±ÖçßÕ∏ÅçΩ……ïù•ëÑ∏Å∞Å—ïÕ–ÅëîÅïπ—…ïùÑÅï·•ùîÅçΩ°ï…ïπç•ÑÅëï∞ÅâÖëùîÅ•π•ç•Ö∞∏ÅA…’ïâÖÃÅë•…•ù•ëÖÃÅAMLÏÅ¡ïπë•ïπ—îÅï∞ÅA…ïŸ•ï‹ÅëîÅƒÅ‰ÅçΩπô•…µÖ»Å±ÑÅ¡Öπ—Ö±±ÑÅ—…ÖÃÅïπ—…ïùÑ∏()Hƒ‹ÃµƒÅ$ÅôΩ±±Ω‹µ’¿É
‹ÅÖ’ÕÖÃÅëï∞ÅAHÄå‹ƒÅçΩ……ïù•ëÖÃÅÖπ—ïÃÅëîÅ¡’â±•çÖ»ËÅ—ïÕ–ÅXÃ¿‘Åï·•üµÑÅΩ¡ïπÖ…ë1•â…Ö…Â	’——Ω∏Å‰Åï∞ÅïπçÖâïÈÖëºÅ5%LÅI=9LÅUILÅÖ’π≈’îÅ±ÑÅU$ÅŸ•ùïπ—îÅ’ÕÑÅœÕ±ºÅçΩπ—…Ω±ïÃÅMï—’¿ΩM—Öâ±ïôΩ…êÅ‰Å”µ—’±ºÅI=9LÅUILÏÅM—Öâ±ïôΩ…êÅ—ïÕ–Åï·•üµÑÅµ•çÀÕôΩπΩÃÅ…ï—•…ÖëΩÃÅ¡Ω»ÅHƒƒÅ‰Å’πÑÅï—•≈’ï—ÑÅÕ•∏Å—•±ëîÏÅï∞Å©ΩàÅµÖç=LÅëïÕçÖ…ùÖâÑÅ—ΩëÖÃÅ±ÖÃÅ…ïôÃÅ‰Åç°ΩçÖâÑÅçΩ∏Å…ÖµÖÃÅ1Ω±Öà∏ÅMîÅÖ±•πïÖ…Ω∏Å¡…’ïâÖÃÅÖ∞ÅçΩπ—…Ö—ºÅŸ•ùïπ—î∞ÅÕîÅÖçïπ—◊ÃÅOiAHÅM9%=HÅ‰Åï∞Åç°ïç≠Ω’–ÅπÖ—•ŸºÅÖ°Ω…ÑÅ—ΩµÑÅM!Åëï∞ÅAHÅçΩ∏Å°•Õ—Ω…•Ö∞Å∑µπ•µºÅ‰Åôï—ç†Åï·¡≥µç•—ºÅëîÅâÖÕî∏ÅAMLÅ±ΩçÖ∞Åë•…•ù•ëºÏÅπ’ïŸÑÅï©ïç’çßÕ∏Å…ïµΩ—ÑÅ¡ïπë•ïπ—î∏)Hƒ‹ÃµƒÅ$ÅôΩ±±Ω‹µ’¿Ä»É
‹ÅÅ—ïÕ–µÿÃ¿–µ°ΩµΩùïπïΩ’Ãµ…ïù•Õ—…Ö—•Ω∏µÖç—•ΩπÃπµ©ÕÄÅ‰ÅÅ—ïÕ–µÿÃ¿‘µ…ïù•Õ—…Ö—•Ω∏µù’•ëïÃµ¡Ö…Õï»µ—…’—†πµ©ÕÄÅáÈ∏Åï·•üµÖ∏Å±ÑÅï—•≈’ï—ÑÅÕ•∏Å—•±ëîÅÅMUAIÄÏÅÕîÅÖ±•πïÖ…Ω∏ÅçΩ∏Å±ÑÅï—•≈’ï—ÑÅŸ•Õ•â±îÅÅOiAHÅM9%=HÉ
‹Å5I%11MÄ∏Å•…•ù•ëÖÃÅXÃ¿–∞ÅXÃ¿‘Å¡Ö…Õï»ÅîÅ°•Õ—Ω…•Ö∞Å‰ÅM—Öâ±ïôΩ…êÅU$ÅAML∏(((ååÅHƒ‹ÃµƒÅ$ÅôΩ±±Ω‹µ’¿ÄÃÉ
‹Ä‘ÅΩç—’â…îÄ»¿»ÿ)∞ÅùÖ—îÅÅ—ïÕ–µÿÃ¿‹µµÖ—ç†µÖ……Ω›ÃµôΩ…µÖ–πµ©ÕÄÅ≈’ïìÃÅëïÕôÖÕÖëºËÅâ’ÕçÖâÑÅÉ
‹Å50ÅA1eÄÅëïπ—…ºÅëîÅÅùïπï…Ö±5Ö—ç°ï—Ö•±Ä∞ÅÖ’π≈’îÅ±ÑÅ•µ¡±ïµïπ—ÖçßÕ∏ÅŸ•ùïπ—îÅëïŸ’ï±ŸîÅœÕ±ºÅï∞ÅπΩµâ…îÅëï∞Å©’ïùºÅ±Ö—ï…Ö∞Åï∏ÅµÖÁÈÕç’±ÖÃ∏ÅMîÅÖ©’Õ—ÑÅ±ÑÅï·¡ïç—Ö—•ŸÑÅÖ∞ÅçΩπ—…Ö—ºÅÖç—’Ö∞ÏÅπºÅçÖµâ•ÑÅ•π—ï…ôÖËÅπ§Å≥Õù•çÑ∏ÅÖ±—ÑÅçΩπô•…µÖ»Åï∞Åπ’ïŸºÅ…ïÕ’±—ÖëºÅ…ïµΩ—ºÅëîÅ$∏(((ååÅHƒ‹ÃµƒÅ$ÅôΩ±±Ω‹µ’¿É
‹Ä‘ÅΩç—’â…îÄ»¿»ÿ)∞ÅçΩπ—…Ω∞ÅXÃ¿‹Å—ïªµÑÅ’πÑÅÕïù’πëÑÅï·¡ïç—Ö—•ŸÑÅΩâÕΩ±ï—ÑËÅÅµÖ—ç°MÂµâΩ±ÄÅÖ°Ω…ÑÅ…ï¡…ïÕïπ—ÑÅï∞Åïµ¡Ö—îÅçΩ∏ÅÄıÄÅÖççïÕ•â±îÅÖëï∑ÖÃÅëîÅ±ÖÃÅô±ïç°ÖÃÅëîÅŸ•ç—Ω…•ÑΩëï……Ω—Ñ∏Å∞Å—ïÕ–ÅÕîÅÖ±•πïÑÅÖ∞ÅçΩµ¡Ω…—Öµ•ïπ—ºÅŸ•ùïπ—îÏÅπºÅçÖµâ•ÑÅ±ÑÅÖ¡±•çÖçßÕ∏∏Å$Å…ïµΩ—ºÅ¡ïπë•ïπ—î∏(((ååÅHƒ‹ÃµƒÅ$ÅôΩ±±Ω‹µ’¿É
‹Ä‘ÅΩç—’â…îÄ»¿»ÿÉ
‹ÅµÖ—…•ËÅëîÅçÖ—ïùΩÀµÖÃ)∞Åë•ÖùªÕÕ—•çºÅH‡¿Åëï—ïç”ÃÅ≈’îÅ±ÑÅ—Ö…©ï—ÑÅù±ΩâÖ∞ÅëîÅ©’ïùºÅùïπï…Ö∞Å•µ¡…•∑µÑÅœÕ±ºÅï∞ÅπΩµâ…îÅëï∞Å©’ùÖëΩ»∏ÅMîÅçΩ……•ùßÃÅÅÕ—…Ω≠ï!Ö±ôÄÅ¡Ö…ÑÅ•πç±’•»ÅçÖ—ïùΩÀµÑÅ‰ÅπΩµâ…îÅçΩ∏Åï∞Åµ•ÕµºÅôΩ…µÖ—ºÅÖççïÕ•â±îÅ≈’îÅ±ÖÃÅëï∑ÖÃÅµΩëÖ±•ëÖëïÃ∏Å$Å…ïµΩ—ºÅ¡ïπë•ïπ—î∏(((ååÅHƒ‹ÃµƒÅ$ÅôΩ±±Ω‹µ’¿É
‹Ä‘ÅΩç—’â…îÄ»¿»ÿÉ
‹Åëï¡ïπëïπç•ÖÃ)∞ÅùÖ—îÅçΩµ¡±ï—ºÅï©ïç’—ÖâÑÅÅâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄ∞Å≈’îÅ•πŸΩçÑÅÅ—ïÕ–µ»ƒÿÃµç…ΩÕÃµïπŸ•…Ωπµïπ–µ—Ω’…πÖµïπ–µÕçΩ…ïÃπµ©ÕÄÅ‰ÅπïçïÕ•—ÑÅÅï±ïç—…•åµÕ≈∞Ω¡ù±•—ïÄÏÅï∞Å›Ω…≠ô±Ω‹ÅπºÅ•πÕ—Ö±ÖâÑÅëï¡ïπëïπç•ÖÃ∏ÅMîÅá≈ÖëîÅ•πÕ—Ö±ÖçßÕ∏Å…ï¡…Ωë’ç•â±îÅëîÅ±ÑÅŸï…ÕßÕ∏Åô•©ÖëÑÅï∏ÅÅ¡Öç≠Öùîπ©ÕΩπÄÅÖπ—ïÃÅëîÅ±ΩÃÅùÖ—ïÃÅ‰ÅÕîÅÖµ¡≥µÑÅï∞Å≥µµ•—îÅÑÄƒ¿Åµ•π’—ΩÃ∏Å$Å…ïµΩ—ºÅ¡ïπë•ïπ—î∏(((ååÅHƒ‹ÃµƒÅ$ÅôΩ±±Ω‹µ’¿É
‹Ä‘ÅΩç—’â…îÄ»¿»ÿÉ
‹Å¡Ö≈’ï—îÅ∑ÕŸ•∞)∞Å¡Ö≈’ï—îÅπÖ—•ŸºÅôÖ±≥ÃÅ¡Ω…≈’îÅÅÕç…•¡—ÃΩâ’•±êµµΩâ•±îµ›ïàπµ©ÕÄÅ—ΩëÖ€µÑÅçΩ¡•ÖâÑÅÅŸΩ•çîµÖÕÕ•Õ—Öπ–π©ÕÄ∞Å…ï—•…ÖëºÅ‰ÅÕ•∏Å…ïôï…ïπç•ÖÃÅëïÕëîÅ±ÑÅÖ¡±•çÖçßÕ∏ÅºÅï∞ÅMï…Ÿ•çîÅ]Ω…≠ï»∏ÅMîÅï±•µ•πÑÅïÕÑÅïπ—…ÖëÑÅΩâÕΩ±ï—ÑÅëï∞ÅçΩπ©’π—ºÅëîÅ…ïç’…ÕΩÃÏÅ$Å∑ÕŸ•∞Å¡ïπë•ïπ—î∏((ååÅHƒ‹ÃµƒÉ
‹Å]°Ö—Õ¡¿ÅëîÅ%ÅëîÅù…’¡ºÅŸ’ï±ŸîÅÑÅMçΩ…îÅÖ…êÉ
‹Ä‘ÅΩç—’â…îÄ»¿»ÿ((¥ÅÅ•πëï‡µù…’¡Ö∞π°—µ±ÄËÅçΩµ¡Ö…—•»Åï∞Å%Åëï∞Åù…’¡ºÅÖâ…îÅÅ›ÑπµïÄÅï∏Å±ÑÅµ•ÕµÑÅ¡ïÕ—á≈ÑÅçΩ∏ÅÅ±ΩçÖ—•Ω∏πÖÕÕ•ùπÄÏÅÕîÅï±•µ•πÑÅ±ÑÅ¡ïÕ—á≈ÑÅÅ}â±Öπ≠ÄÅ≈’îÅëï©ÖâÑÅMÖôÖ…§Åï∏Åâ±ÖπçºÅÖ∞Å…ïù…ïÕÖ»ÅëïÕëîÅ]°Ö—Õ¡¿∏(¥ÅÅ—ïÕ–µ»ƒ‘‰µ›°Ö—ÕÖ¡¿µ—›ºµµïÕÕÖùïÃπµ©ÕÄËÅ…ïù…ïÕßÕ∏ÅÕΩâ…îÅï∞Å°Öπë±ï»Åï·Öç—ºËÅçΩ¡•ÑÅ\…I—· ∞ÅçΩë•ô•çÑÅï∞ÅµïπÕÖ©îÅI%9L∞ÅπÖŸïùÑÅï∏Å±ÑÅ¡ïÕ—á≈ÑÅÖç—’Ö∞Å‰ÅπºÅ±±ÖµÑÅÅ›•πëΩ‹πΩ¡ïπÄ∏(¥ÅÕ—ÖëºËÅçÖµâ•ºÅ‰ÅçΩπ—…Ω∞Å…ïù•Õ—…ÖëΩÃÅï∏Å…ÖµÑÅÖ•Õ±ÖëÑÅÅçΩëï‡Ω»ƒ‹Ãµ›°Ö—ÕÖ¡¿µÕÖµîµ—Öàµ¡…ïŸ•ï›ÄÏÅ¡…’ïâÑÅ…ïµΩ—Ñ∞ÅA…ïŸ•ï‹Å‰Å…ïçΩ……•ëºÅõµÕ•çºÅ•A°ΩπîÅA9%9QL∏ÅA…Ωë’ççßÕ∏Å•π—Öç—Ñ∏(¥ÅΩπ—…Ω∞ÅëîÅÕïç’ïπç•ÑÅ$ËÅÖµâÖÃÅ°Ω©ÖÃÅëîÅ…’—ÑÅÕîÅÖç—’Ö±•ÈÖ…Ω∏Åï∏Å’∏ÉÈπ•çºÅçΩµµ•–Å¡Ö…ÑÅÕÖ—•ÕôÖçï»Å±ÑÅ¡’ï…—ÑÅÅ…ΩÖëµÖ¿µùÖ—ïÄ∏(()Hƒ‹ÃÅ]°Ö—Õ¡¿ÅÕÖµîµ—ÖàÅ—ïÕ–ÅôΩ±±Ω‹µ’¿É
‹ÄÿÅΩç—’â…îÄ»¿»ÿ)$ÅëîÅò≈ëçå–¿ÅçΩπô•…∑ÃÅ—ΩëΩÃÅ±ΩÃÅùÖ—ïÃÅ°ÖÕ—ÑÅ±ÑÅ…ïù…ïÕßÕ∏Åπ’ïŸÑ∞Å≈’îÅïÕ¡ï…ÖâÑÅ±ΩÃÅëΩÃÅçÖ…Öç—ï…ïÃÅÅqqπÄÅÖ’π≈’îÅï∞Å°Öπë±ï»Å¡…Ωë’çîÅï∞ÅÕÖ±—ºÅëîÅ≥µπïÑÅ…ïÖ∞∏Å1ÑÅï·¡ïç—Ö—•ŸÑÅÕîÅçΩ……•ùßÃÅ¡Ö…ÑÅŸï…•ô•çÖ»ÅÅ…’¡ºÅI%9MÄ∞ÅÕÖ±—ºÅëîÅ≥µπïÑÅ‰ÅÅÕë•ùºËÅ\…I—·!Ä∏Å9ºÅçÖµâ•ÑÅï∞ÅçΩµ¡Ω…—Öµ•ïπ—ºÅëîÅ±ÑÅÖ¡±•çÖçßÕ∏∏(()Hƒ‹ÃÅ]°Ö—Õ¡¿ÅÕÖµîµ—ÖàÅ—ïÕ–ÅôΩ±±Ω‹µ’¿É
‹ÄÿÅΩç—’â…îÄ»¿»ÿ)$ÅëîÅò≈ëçå–¿ÅçΩπô•…∑ÃÅ±ΩÃÅùÖ—ïÃÅëîÅèÕë•ùºÏÅ±ÑÅ…ïù…ïÕßÕ∏Åá≈Öë•ëÑÅïÕ¡ï…ÖâÑÅ±ΩÃÅëΩÃÅçÖ…Öç—ï…ïÃÅÅqqπÄÅÖ’π≈’îÅï∞Å°Öπë±ï»Å¡…Ωë’çîÅ’∏ÅÕÖ±—ºÅëîÅ≥µπïÑÅ…ïÖ∞∏ÅMîÅçΩ……•ùßÃÅ±ÑÅï·¡ïç—Ö—•ŸÑÅ¡Ö…ÑÅçΩµ¡…ΩâÖ»Åï∞Å—ï·—ºÅëîÅ•πŸ•—ÖçßÕ∏ÅçΩ∏ÅÕ‘ÅÕÖ±—ºÅëîÅ≥µπïÑÅ…ïÖ∞∏ÅMîÅŸ’ï±ŸîÅÑÅÕï±±Ö»Åï∞Å•πŸïπ—Ö…•ºÅëîÅô’ïπ—ïÃ∏(((ååÅHƒ‹–É
‹ÅIïù•Õ—…ºÅ•π•ç•Ö∞ÅÕ•∏Åï·çï¡çßÕ∏Åï∏ÅπÖŸïùÖëΩ»Å›ïàÉ
‹ÄÿÅΩç—’â…îÄ»¿»ÿ((¥ÅIï¡…Ωë’ççßÕ∏Åï∏ÅπÖŸïùÖëΩ»Å…ïÖ∞ÅëîÅA…Ωë’ççßÕ∏Å‰Å1ËÅ±ÑÅçΩπÕΩ±ÑÅµΩÕ—…ÖâÑÅÅQÂ¡ï……Ω»ËÅÖππΩ–Å…ïÖêÅ¡…Ω¡ï…—•ïÃÅΩòÅ’πëïô•πïêÄ°…ïÖë•πúÄùÕ—ÖπëÖ±Ωπîú•ÄÅÖ∞Å•π•ç•Ö»ÅÅΩ¡ïπMï—’¿†•ÄÏÅï∞Åô±’©ºÅÕîÅëï—ïªµÑÅï∏ÅÅÕ°Ω›%πÕ—Ö±±Ωπ—…Ω∞†•ÄÅÖπ—ïÃÅëîÅÖâ…•»ÅIïù•Õ—…º∏(¥ÅÖ’ÕÑÅï·Öç—ÑËÅÅÕ—ÖπëÖ±Ωπï¡¿†•ÄÅçΩπçÖ—ïπÖâÑÅÄπµÖ—ç°ïÕ•ùÖ—Ω»πÕ—ÖπëÖ±ΩπïÄÅëïÕ¡◊•ÃÅëîÅÅµÖ—ç°5ïë•Ñ†•Ä∏(¥ÅΩ……ïççßÕ∏Å∑µπ•µÑËÅçΩπÕ’±—Ö»ÅÅµÖ—ç°5ïë•Ñ†∏∏∏§πµÖ—ç°ïÕÄÅ‰ÅÅπÖŸ•ùÖ—Ω»¸πÕ—ÖπëÖ±ΩπïÄÅçΩµºÅçΩπë•ç•ΩπïÃÅÕïù’…ÖÃÅîÅ•πëï¡ïπë•ïπ—ïÃÏÅçΩπÕï…ŸÖ»Åëï—ïççßÕ∏ÅπÖ—•ŸÑ∞ÅA]Å‰ÅMÖôÖ…§Å•πÕ—Ö±Öëº∏(¥ÅIïù…ïÕßÕ∏ÅÅ—ïÕ–µ»ƒ‹–µÕ—ÖπëÖ±Ωπîµ…ïù•Õ—…Ö—•Ω∏µëï—ïç—•Ω∏πµ©ÕÄËÅπÖŸïùÖëΩ»ÅπΩ…µÖ∞∞ÅµÖ—ç°5ïë•ÑÅÖ’Õïπ—î∞ÅA]∞Å•=LÅÕ—ÖπëÖ±ΩπîÅ‰ÅçΩπ—ïπïëΩ»ÅπÖ—•ŸºÏÅ•π—ïù…ÖëÑÅï∏ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄ∏(¥ÅIï±ïÖÕîΩçÖç°îËÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅ…ï±ïÖÕîπ©ÕΩπÄ∞ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄÅ≈’ïëÖ∏ÅÖ±•πïÖëΩÃÅï∏ÅHƒ‹–∏(¥ÅÖ—ΩÃËÅπºÅÕîÅç…ïÖ∏Åπ§Åï±•µ•πÖ∏Å—Ω…πïΩÃÅºÅ…ΩπëÖÃ∏ÅMçΩ…ïÃÅ√Èâ±•çºÅï∏ÅÖµâÖÃÅâÖÕïÃÅπºÅµΩÕ—ÀÃÅ—Ω…πïΩÃÅÖç—•ŸΩÃÏÅ¡’â±•çÖçßÕ∏ÅÕ’©ï—ÑÅÑÅ¡’ï…—ÖÃÅëîÅçÖ±•ëÖêÅ‰Å…ïŸ•ÕßÕ∏ÅõµÕ•çÑÅΩâ±•ùÖ—Ω…•ÖÃ∏(¥Å…ç°•ŸΩÃËÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅ…ï±ïÖÕîπ©ÕΩπÄ∞ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄ∞ÅÅ—ïÕ–µ»ƒ‹–µÕ—ÖπëÖ±Ωπîµ…ïù•Õ—…Ö—•Ω∏µëï—ïç—•Ω∏πµ©ÕÄ∞ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄ∞ÅÖµâΩÃÅI=5AL∞ÅµÖ¡ÑÅµÖïÕ—…ºÅîÅ•πŸïπ—Ö…•ºÅXÃƒƒ∏(((ååÅHƒ‹‘É
‹Åπ—…ÖëÑÅ±•â…îÅ‰ÅÖ’—Ω…•ÈÖçßÕ∏ÉÈπ•çÑÅëîÅ=…ùÖπ•ÈÖëΩ»É
‹ÄÿÅΩç—’â…îÄ»¿»ÿ()Iï¡…Ωë’ççßÕ∏Å…ïÖ∞Åï∏Å1ËÅëïÕëîÅ=…ùÖπ•ÈÖëΩ»∞ÉäqM=dÅ0ÅAI=A%QI%<É
‹Å%9%%HÅMM'M;ätÅÖâÀµÑÅï∞ÅôΩ…µ’±Ö…•ºÉäq	•ïπŸïπ•ëøätÅëîÅçΩ……ïºÅ‰ÅçΩπ—…ÖÕó≈ÑÏÅA…Ωë’ççßÕ∏Å—ïªµÑÅ’πÑÅÕïÕßÕ∏Å¡ï…Õ•Õ—ïπ—îÅ‰ÅπºÅµΩÕ—…ÖâÑÅï∞ÅëïÕ€µºÅÖ∞ÅçÖ…ùÖ»∏Å1ÑÅçÖ’ÕÑÅô’îÅ’πÑÅ…ÖµÑÅëîÅπÖŸïùÖçßÕ∏Åï·¡≥µç•—ÑÅëïÕëîÅï∞ÅëßÖ±ΩùºÅ‰Å±ÑÅÖ¡ï…—’…ÑÅÖ’—Ω∑Ö—•çÑÅëîÅÖ’—†µùÖ—îÅÖ∞ÅôÖ±—Ö»ÅÕïÕßÕ∏∏ÅΩ……ïççßÕ∏ËÅ≈’•—Ö»ÅïÕîÅâΩ”Õ∏Å‰Å≈’îÅ’πÑÅÕïÕßÕ∏ÅÖ’Õïπ—îÅπºÅÖâ…ÑÅ±ÑÅ¡Öπ—Ö±±ÑÅëîÅç’ïπ—ÑÅï∏Å±ÑÅ…’—ÑÅπΩ…µÖ∞ÏÅï∞ÅôΩ…µ’±Ö…•ºÅΩ¡ç•ΩπÖ∞ÅÕ•ù’îÅÖççïÕ•â±îÅœÕ±ºÅçΩ∏ÅÄ˝ÖççΩ’π–Ù≈Ä∏Å=…ùÖπ•ÈÖëΩ»ÅçΩπÕï…ŸÑÅ’∏ÅÕΩ±ºÅèÕë•ùºÅëîÅÖ’—Ω…•ÈÖçßÕ∏ÏÅ±ÑÅMçΩ…îÅÖ…ê∞ÅIïù•Õ—…ºÅ‰ÅMçΩ…ïÃÅπºÅ…ï≈’•ï…ï∏ÅçΩ……ïºÅπ§ÅçΩπ—…ÖÕó≈Ñ∏()A…’ïâÑÅ¡ï…µÖπïπ—îËÅÅ—ïÕ–µ±ÖàµÖççΩ’π–µùÖ—îπµ©ÕÄÅçΩπô•…µÑÅ≈’îÅï∞ÅÖ……Öπ≈’îÅÕ•∏ÅÕïÕßÕ∏ÅπºÅ±ÖπÈÑÅï∞ÅôΩ…µ’±Ö…•º∞Å≈’îÅ±ÑÅ…’—ÑÅΩ¡ç•ΩπÖ∞Åï·¡≥µç•—ÑÅÕ•ù’îÅë•Õ¡Ωπ•â±îÅ‰Å≈’îÅ=…ùÖπ•ÈÖëΩ»ÅπºÅΩô…ïçîÅï∞ÅëïÕ€µºÅÑÅç’ïπ—ÑÅ¡ï…ºÅçΩπÕï…ŸÑÅï∞ÅèÕë•ùº∏Å1ÑÅ•ëïπ—•ëÖêÅ‰Å¡ï…µ•ÕΩÃÅëîÅ—Ω…πïΩÃÅÕ•ù’ï∏Åï∏ÅÕ’ÃÅA%Ã∏ÅM•∏ÅçÖµâ•ΩÃÅπ§ÅâΩ……ÖëΩÃÅëîÅ…ΩπëÖÃ∞Åù…’¡ΩÃÅºÅ—Ω…πïΩÃ∏()…ç°•ŸΩÃËÅÖ¡§Ω}±•àΩïŸïπ–µ±•ôïçÂç±îπ©Ã∞ÅÖ¡§Ω±•Ÿîπ©Ã∞ÅÖ¡§Ω—Ω’…πÖµïπ–µÕçΩ…îµë•…ïç—Ω…‰π©Ã∞ÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©Ã∞Å—ïÕ–µïŸïπ–µ±•ôïçÂç±îπµ©Ã∞Å—ïÕ–µ»ƒ‹‘µïŸïπ–µï·¡•…‰µë•…ïç—Ω…‰µ…ïçΩŸï…‰πµ©Ã∞ÅÖ’—†µùÖ—îπ©Ã∞Å¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©Ã∞Å—ïÕ–µ±ÖàµÖççΩ’π–µùÖ—îπµ©Ã∞Å•πëï‡µù…’¡Ö∞π°—µ∞∞Å…ï±ïÖÕîπ©ÕΩ∏∞ÅÕï…Ÿ•çîµ›Ω…≠ï»π©Ã∞Å=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=Lπµê∞Å=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµê∞Å=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµê∞Å=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩ∏∞ÅI=5A}}Q11πµê∞ÅI=5A}=YI10πµê∏Å1ΩA…Ωë’ççßÕ∏Å¡ï…µÖπïçï∏ÅÕ•∏Å¡’â±•çÖ»Å°ÖÕ—ÑÅA…ïŸ•ï‹ÅId∞Å¡…’ïâÖÃÅëï∞ÅâÖπçºÅ‰Å…ïçΩ……•ëºÅÖ’—ΩµÖ—•ÈÖëºÅŸï…•ô•çÖëº∏(()Hƒ‹‘É
‹ÅçΩ……ïççßÕ∏Åëï∞Åïµ¡Ö≈’ï—ÖëºÅëï∞ÅçÖπë•ëÖ—ºÉ
‹ÄÿÅΩç—’â…îÄ»¿»ÿ)∞Å¡…•µï»ÅA…ïŸ•ï‹ÅëîÅHƒ‹‘ÅÕîÅëï—’ŸºÅ¡Ω…≈’îÅ±ÑÉÈ±—•µÑÅµΩë•ô•çÖçßÕ∏ÅπºÅ•πç±◊µÑÅ±ΩÃÅëΩÃÅI=5ALÏÅï∞ÅùÖ—îÅ±ºÅçΩµ¡…ΩãÃÅï∏Åï∞Å±ΩúÅëîÅYï…çï∞∏ÅÕ—îÅçΩµµ•–ÅÖç—’Ö±•ÈÑÅ©’π—ΩÃÅÖµâΩÃÅI=5ALÅ‰Å…ïùïπï…ÑÅï∞ÅÕï±±ºÅëîÅ•πŸïπ—Ö…•º∏Å∞ÅèÕë•ùºÅëï∞ÅçÖπë•ëÖ—ºÅπºÅçÖµâ•ÑÅï∏ÅïÕ—îÅôΩ±±Ω‹µ’¿ÏÅ±ΩÃÅ¡…ïŸ•ï›ÃÅ‰Å±ÑÅ¡…’ïâÑÅŸ•Õ’Ö∞ÅÕ•ù’ï∏Å¡ïπë•ïπ—ïÃ∏(()Hƒ‹‘É
‹Åï—•≈’ï—ÑÅ•π•ç•Ö∞ÅëîÅ…ï±ïÖÕîÅï∏ÅMçΩ…îÅÖ…êÉ
‹ÄÿÅΩç—’â…îÄ»¿»ÿ)1ÑÅÕ’•—îÅëï∞ÅA…ïŸ•ï‹Åëï—ïç”ÃÅ≈’îÅÅ•πëï‡µù…’¡Ö∞π°—µ±ÄÅçΩπÕï…ŸÖâÑÅï∞Å—ï·—ºÅ•π•ç•Ö∞ÅÅYIM'M8ÅHƒ‹—ÄÅÖ’π≈’îÅÕ‘Åµï—ÑÅ‰ÅÅ…ï±ïÖÕîπ©ÕΩπÄÅÂÑÅï…Ö∏ÅHƒ‹‘∏ÅMîÅçΩ……•ùßÃÅœÕ±ºÅ±ÑÅï—•≈’ï—ÑÅïÕ”Ö—•çÑÅÑÅHƒ‹‘ÏÅ±ÑÅ¡…’ïâÑÅëîÅïπ—…ïùÑÅï·•ùîÅçΩπçΩ…ëÖπç•ÑÅÖπ—ïÃÅëîÅ)ÖŸÖMç…•¡–∏ÅA…ïŸ•ï›ÃÅ¡ïπë•ïπ—ïÃÅëîÅ…ïçΩπÕ—…’ççßÕ∏∏(()Hƒ‹‘É
‹Å…ïù…ïÕßÕ∏ÅëîÅÖççïÕºÅ±•â…îÅçΩ……ïù•ëÑÉ
‹ÄÿÅΩç—’â…îÄ»¿»ÿ)∞Åπ’ïŸºÅA…ïŸ•ï‹ÅïπçΩπ—ÀÃÅÕ•π—Ö·•ÃÅ•π€Ö±•ëÑÅï∏Å±ÖÃÅï·¡…ïÕ•ΩπïÃÅ…ïù’±Ö…ïÃÅëîÅÅ—ïÕ–µ±ÖàµÖççΩ’π–µùÖ—îπµ©ÕÄ∏ÅMîÅçΩ……•ùßÃÅ±ÑÅï·—…ÖççßÕ∏ÅëîÅÅ•π•–†•ÄÅ‰ÅÕîÅ°•ÈºÅï·¡≥µç•—ÑÅ±ÑÅÖÕï…çßÕ∏Å≈’îÅ…ïç°ÖÈÑÅÖâ…•»Åï∞ÅôΩ…µ’±Ö…•ºÅ¡Ω»ÅÖ’Õïπç•ÑÅëîÅÕïÕßÕ∏ÏÅ±ÑÅ¡…’ïâÑÅπºÅµΩë•ô•çÑÅï∞ÅçΩµ¡Ω…—Öµ•ïπ—ºÅëîÅ±ÑÅÖ¡¿∏(((ååÅHƒ‹ÿÉ
‹ÅIïÖ¡ï…—’…ÑÅ•πÕ—Ö±ÖëÑÅŸ’ï±ŸîÅÑÅIïù•Õ—…ºÉ
‹ÄÿÅΩç—’â…îÄ»¿»ÿ()∏Å±ÑÅÖ¡¿Å•πÕ—Ö±ÖëÑ∞Åç’ÖπëºÅ•=LÅëïŸ’ï±ŸîÅÖ∞Å¡…•µï»Å¡±ÖπºÅ’πÑÅ√Öù•πÑÅçΩπÕï…ŸÖëÑÅï∏ÅµïµΩ…•Ñ∞Å±ΩÃÅµÖπï©ÖëΩ…ïÃÅëîÅŸ•Õ•â•±•ëÖêΩôΩç’ÃΩ¡ÖùïÕ°Ω‹ÅÖ°Ω…ÑÅëï—ïç—Ö∏Å±ÑÅ…ΩπëÑÅ…ïç’¡ï…ÖëÑÅ‰Åµ’ïÕ—…Ö∏ÅIïù•Õ—…ºÅëîÅ©’ùÖëΩ…ïÃ∏Å1ÑÅÖççßÕ∏Å¡ï…Õ•Õ—îÅ±ÑÅ—Ö…©ï—ÑÅ‰ÅπºÅÖ±—ï…ÑÅù…ΩÕÃΩπï—ΩÃ∏Å1ÖÃÅ…’—ÖÃÅ›ïàÅΩ…ë•πÖ…•ÖÃÅçΩπÕï…ŸÖ∏ÅÕ‘ÅëïÕ—•πºÅ‰ÅπºÅÕîÅç…ïÑÅΩ—…ÑÅ…ΩπëÑ∏ÅΩπ—…Ω∞ËÅÅ—ïÕ–µ±Öàµ…ïù•Õ—…Ö—•Ω∏µ…ï—’…∏µÕ—Ö—îπµ©ÕÄ∞Å•πç±’•ëºÅï∏Åï∞ÅâÖπçºÅëîÅ1∏ÅIÖµÑÅÖ•Õ±ÖëÑÅÕΩâ…îÅï∞ÅçΩµµ•–ÅHƒ‹‘ÏÅA…Ωë’ççßÕ∏Å•π—Öç—ÑÅµ•ïπ—…ÖÃÅÕîÅŸÖ±•ëÖ∏Å±ΩÃÅùÖ—ïÃÅ‰Åï∞Åô±’©ºÅï∏Å•A°Ωπî∏((ååÅHƒ‹‹É
‹Åëµ•π•Õ—…ÖçßÕ∏ÅîÅ%ÅëîÅ—Ω…πïΩÃÅôïëï…ÖëΩÃÉ
‹ÄÿÅëîÅΩç—’â…îÅëîÄ»¿»ÿ()1ÑÅ±•Õ—ÑÅëîÅëµ•π•Õ—…ÖçßÕ∏ÅÖ°Ω…ÑÅçΩπÕ’±—ÑÅ±ΩÃÅïŸïπ—ΩÃÅÖëµ•π•Õ—…Öâ±ïÃÅëï∞ÅÖµâ•ïπ—îÅÖç—’Ö∞Å‰Åëï∞ÅÖµâ•ïπ—îÅ¡Ö»∞Å•ëïπ—•ô•çÑÅçÖëÑÅïŸïπ—ºÅ¡Ω»ÅÖµâ•ïπ—îÄ¨Å—•¡ºÄ¨Å%Å‰ÅçΩπÕï…ŸÑÅù…’¡ΩÃÅ¡…•ŸÖëΩÃÅ©’π—ºÅçΩ∏Å—Ω…πïΩÃ∏Å1ÑÅçΩπÕ’±—ÑÅ…ïµΩ—ÑÅ…ïŸÖ±•ëÑÅ±ÑÅµ•ÕµÑÅç’ïπ—ÑÅï∏Åï∞ÅÕï…Ÿ•ëΩ»Åë’ó≈ºÏÅçΩµ¡Ö…—•»Å‰Åï±•µ•πÖ»ÅÕîÅ…ïïπ€µÖ∏ÅœÕ±ºÅÑÅ1ÅºÅA…Ωë’ççßÕ∏Åµïë•Öπ—îÅ…’—ÖÃÅô•©ÖÃÅ‰ÅŸ’ï±Ÿï∏ÅÑÅçΩµ¡…ΩâÖ»Å¡ï…µ•ÕΩÃÅï∏ÅïÕîÅÖµâ•ïπ—î∏Å1ÑÅ•ëïπ—•ëÖêÅ±ΩçÖ∞Åï·ç±’Õ•ŸÑÅëîÅ’∏Åë•Õ¡ΩÕ•—•ŸºÅπºÅÕîÅçΩπŸ•ï…—îÅï∏Å’πÑÅç’ïπ—ÑÅçΩµ¡Ö…—•ëÑËÅ¡Ö…ÑÅÕ•πç…Ωπ•ÈÖ»Åï≈’•¡ΩÃÅë•Õ—•π—ΩÃÅÕîÅπïçïÕ•—ÑÅ±ÑÅÕïÕßÕ∏ÅëîÅç’ïπ—ÑΩ¡…Ω¡•ï—Ö…•ºÅ…ïçΩπΩç•ëÑÅ¡Ω»ÅÖµâΩÃÅÖµâ•ïπ—ïÃ∏Å1ΩÃÅïŸïπ—ΩÃÅÖ©ïπΩÃÅëï∞Åë•…ïç—Ω…•ºÅ√Èâ±•çºÅÕ•ù’ï∏Åï∏ÅçΩπÕ’±—ÑÅÕΩ±Öµïπ—îÅ‰ÅπºÅ…ïç•âï∏ÅèÕë•ùºÅπ§ÅçÖ¡Öç•ëÖêÅëîÅâΩ……Öëº∏((¥ÅÖ¡§ΩïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏π©ÃÉ
‹Å±•Õ—ÑÅôïëï…ÖëÑÅÖ’—ïπ—•çÖëÑ∞Å…ïïπ€µºÅÕïù’…ºÅëîÅèÕë•ùºÅ‰Åï±•µ•πÖçßÕ∏ÅÑÅ±ÑÅâÖÕîÅ¡…Ω¡•ï—Ö…•Ñ∏(¥ÅÖ¡§Ω¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÃÉ
‹Å¡ï…µ•—îÅÖ∞ÅΩ…ùÖπ•ÈÖëΩ»ÅçΩµ¡Ö…—•»Å’∏Åù…’¡ºÅÖç—•ŸºÅÖ’∏ÅÕ§Å—ΩëÖ€µÑÅπºÅ—•ïπîÅ©’ùÖëΩ…ïÃÅÖÕ•ùπÖëΩÃÏÅÕ•ù’îÅÕ•ïπëºÅèÕë•ùºÅëîÅ±ïç—’…ÑÅëîÅ’∏ÅÕΩ±ºÅ’Õº∏(¥ÅïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏µ’§π©ÃÉ
‹Åµ’ïÕ—…ÑÅù…’¡ΩÃÅ‰Å—Ω…πïΩÃÅëîÅ±ΩÃÅëΩÃÅÖµâ•ïπ—ïÃ∞ÅçΩπ—…Ω±ïÃÅëîÅçΩµ¡Ö…—•»Ωï±•µ•πÖ»ÅÖ’—Ω…•ÈÖëΩÃÅ‰ÅÖççïÕΩÃÅëîÅMçΩ…ïÃÅïπï…Ö∞ΩÖ—ïùΩÀµÖÃÏÅ±ÖÃÅÖçç•ΩπïÃÅ’ÕÖ∏ÅÖµâ•ïπ—îÄ¨Å—•¡ºÄ¨Å%∏(¥Å¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÃÉ
‹Å%ÅÅQ=I9=LÅïπ’µï…ÑÅ—Ω…πïΩÃÅÖç—•ŸΩÃÅÖëµ•π•Õ—…Öâ±ïÃÅëîÅÖµâΩÃÅÖµâ•ïπ—ïÃ∞Åùïπï…ÑÅ‰Å¡…ïÕïπ—ÑÅï∞ÅèÕë•ùº∞Å¡ï…µ•—îÅçΩ¡•Ö»∞Å]°Ö—Õ¡¿Å‰Åï±•µ•πÖ»ÅçΩ∏ÅçΩπô•…µÖçßÕ∏∏(¥Å±•Ÿîµ°’àπ©ÃÉ
‹ÅçΩπÕï…ŸÑÅ±ÑÅŸ•Õ—ÑÅïπï…Ö∞ΩÖ—ïùΩÀµÖÃÅÖ∞ÅÖâ…•»ÅMçΩ…ïÃÅëïÕëîÅëµ•π•Õ—…ÖçßÕ∏∏(¥Å—ïÕ–µ»ƒ‹‹µç…ΩÕÃµëïŸ•çîµÖëµ•∏πµ©ÃÉ
‹ÅçΩπ—…Ω±ÑÅ±•Õ—ÑÅ‰ÅÖçç•ΩπïÃÅôïëï…ÖëÖÃ∞ÅçΩΩ≠•îÅëîÅç’ïπ—Ñ∞ÅÕï¡Ö…ÖçßÕ∏ÅëîÅÖµâ•ïπ—ïÃ∞Å%ÃÅ…ï¡ï—•ëΩÃÅ‰ÅÖççïÕΩÃÅMçΩ…ïÃ∏(¥ÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÃÉ
‹Å•π—ïù…ÑÅ±ÑÅ…ïù…ïÕßÕ∏ÅHƒ‹‹ÅÖ∞ÅâÖπçºÅëîÅ±ÖâΩ…Ö—Ω…•º∏(¥Å•πëï‡µù…’¡Ö∞π°—µ∞∞Å…ï±ïÖÕîπ©ÕΩ∏∞ÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÃÉ
‹Å•ëïπ—•ô•çÖëΩ»ÅçΩ∑È∏ÅHƒ‹‹Å‰ÅçÖç£§Å…ïπΩŸÖëÑ∏(¥ÅI=5A}=YI10πµê∞ÅI=5A}}Q11πµê∞Å5A}5MQI=}}I!%Y=Lπµê∞Å=9Q%9U%}5MQI}1πµê∞Å…ïù•Õ—…ºÅëîÅ…ï•πç•ëïπç•ÖÃÅîÅ•πŸïπ—Ö…•ºÅXÃƒƒÉ
‹Å…ïù•Õ—…ºÅŸï…Õ•ΩπÖëºÅ‰ÅÕï±±ºÅëîÅô’ïπ—ïÃ∏()Õ—ÖëºËÅçÖπë•ëÖ—ºÅHƒ‹‹∏ÅïâîÅ¡ÖÕÖ»Å¡…’ïâÖÃÅëï∞Å…ï¡ΩÕ•—Ω…•º∞Å$∞ÅA…ïŸ•ï‹ÅIdÅ‰Å…ïçΩ……•ëºÅëîÅπÖŸïùÖëΩ»Åï∏ÅÖµâΩÃÅÖ±•ÖÃ∏Å9ºÅÕîÅëïç±Ö…ÑÅ¡’â±•çÖëºÅπ§ÅÕîÅµïÈç±Ö∏ÅâÖÕïÃÏÅ±ÑÅÖ’—Ω…•ÈÖçßÕ∏ÅëîÅA…Ωë’ççßÕ∏Å¡…ïŸ•ÑÅ¡ï…µÖπïçîÅÕ’©ï—ÑÅÑÅçï…ºÅ%0Å‰ÅïŸ•ëïπç•Ñ∏()Hƒ‹‹Å—ïÕ–ÅÖ±•ùπµïπ–ËÅ—ïÕ–µ»ƒÿ‹µÖëµ•∏µÕ°Ö…îµôïïëâÖç¨πµ©ÃÅÖ°Ω…ÑÅŸÖ±•ëÑÅÕ°Ö…ïŸïπ–∞ÅèÕë•ùΩÃÅ‰ÅçΩπ—…Ω±ïÃÅâ±Ω≈’ïÖëΩÃÅ¡Ö…ÑÅô•±ÖÃÅ√Èâ±•çÖÃÅÕ•∏ÅÖ’—Ω…•ëÖêÏÅ±ÑÅ¡…’ïâÑÅëîÅ%ÃÅ°Ω∑Õπ•µΩÃÅçΩπÕï…ŸÑÅ±ÑÅ•ëïπ—•ëÖêÅÖµâ•ïπ—î≠—•¡º≠%∏()Hƒ‹‹Å$ÅôΩ±±Ω‹µ’¿Ä»ËÅï∞ÅµïπÕÖ©îÅŸÖèµºÅëîÅ%ÅÅQ=I9=LÅçΩπÕï…ŸÑÅ±ÑÅï·¡ïç—Ö—•ŸÑÅHƒ‘ÿÉ
≠9<ÅQ%9LÅQ=I9=O
ÏÅ‰ÅÖ°Ω…ÑÅïÕ¡ïç•ô•çÑÅ≈’îÅÕîÅçΩπÕ’±—Ö…Ω∏Å±ΩÃÅëΩÃÅÖµâ•ïπ—ïÃÅÖ’—Ω…•ÈÖëΩÃ∏(((åååÅHƒ‹‹É
‹ÅIï±Ö‰ÅÖ’—ïπ—•çÖëºÅïπ—…îÅÖµâ•ïπ—ïÃ)1ÑÅÖëµ•π•Õ—…ÖçßÕ∏Åôïëï…ÖëÑÅïπ€µÑÅ±ÖÃÅÖçç•ΩπïÃÅ…ïµΩ—ÖÃÅï·ç±’Õ•ŸÖµïπ—îÅÖ∞ÅÖµâ•ïπ—îÅΩ¡’ïÕ—ºÅ‰ÅçΩπÕï…ŸÑÅ±ÑÅÕïÕßÕ∏Åëï∞ÅΩ…ùÖπ•ÈÖëΩ»∏Å∞ÅΩ…•ùï∏ÅŸÖ±•ëÑÅπ’ïŸÖµïπ—îÅï∞Å¡ï…µ•ÕºÅÖπ—ïÃÅëîÅïµ•—•»ÅèÕë•ùΩÃÅºÅï±•µ•πÖ»ÅïŸïπ—ΩÃÏÅôÖ±±ΩÃÅëï∞Å¡Ö»ÅÕîÅµ’ïÕ—…Ö∏ÅçΩµºÅ…ïÕ’±—ÖëºÅ¡Ö…ç•Ö∞∏(()Hƒ‹‹Å…ïù…ïÕßÕ∏ËÅçΩπ—ï·—ºÅëîÅÖµâ•ïπ—îÅï∏Å¡…’ïâÑÅëîÅï±•µ•πÖçßÕ∏Å‰ÅçΩâï…—’…ÑÅÕï¡Ö…ÖëÑÅëîÅâΩ……Ö»ÅïŸïπ—ºÅ…ïµΩ—ºÅÖ’—ïπ—•çÖëº∏(()Hƒ‹‹ËÅŸÖ±•ëÖ»ÅèÕë•ùºÅëîÅ—Ω…πïºÅÖç—•ŸºÅÕ•∏Å…ΩÕ—ï»Å‰ÅµÖπ—ïπï»Åï∞ÅÖççïÕºÅçΩµ¡Ö…—•ëºÅï∏ÅÕΩ±ºÅ±ïç—’…ÑÅ°ÖÕ—ÑÅ±ÑÅÖÕ•ùπÖçßÕ∏ÅëîÅ©’ùÖëΩ…ïÃ∏(()Hƒ‹‹ËÅçΩµ¡…ΩâÖ»Åï∞ÅÖ±çÖπçîÅëï∞ÅŸ•ï›ï»Åµïë•Öπ—îÅ±ÑÅÕïÕßÕ∏Åç…ïÖëÑÅÖ∞ÅçÖπ©ïÖ»Åï∞ÅèÕë•ùº∞ÅπºÅµïë•Öπ—îÅï∞ÅΩâ©ï—ºÅëîÅçÖπ©î∏((ååÅHƒ‹‡É
‹ÄÿÅΩç—’â…îÄ»¿»ÿÉ
‹ÅIïç’¡ï…ÖçßÕ∏ÅëîÅÖëµ•π•Õ—…ÖçßÕ∏ÅëîÅ—Ω…πïΩÃÅ°ï…ïëÖëΩÃ((¥Å1ÑÅÖëµ•π•Õ—…ÖçßÕ∏Åëï—ïç—ÑÅï∞Å—Ω…πïºÅ°ï…ïëÖëºÅç…ïÖëºÅï∏ÅïÕ—îÅë•Õ¡ΩÕ•—•ŸºÅµïë•Öπ—îÅÕ‘Åç±ÖŸîÅëîÅΩ…ùÖπ•ÈÖëΩ»Å‰Å…ïù•Õ—…ÑÅ¡…Ω¡•ïëÖêÅ¡Ö…ÑÅ±ÑÅç’ïπ—ÑÅÖ’—ïπ—•çÖëÑÅÕΩ±ºÅÕ§Å±ÑÅç±ÖŸîÅçΩ•πç•ëîÅçΩ∏Åï∞Å°ÖÕ†Å¡ï…Õ•Õ—•ëºÅëï∞Å—Ω…πïº∏Å∞Å…ïç±ÖµºÅ¡ï…µÖπïçîÅ€Ö±•ëºÅ¡Ö…ÑÅ—Ω…πïΩÃÅŸïπç•ëΩÃÅ‰Å…ïç°ÖÈÑÅ…ïù•Õ—…ΩÃÅ…ïŸΩçÖëΩÃÏÅπºÅÖµ¡≥µÑÅ¡ï…µ•ÕΩÃÅÑÅΩ—…ΩÃÅïŸïπ—ΩÃ∏(¥ÅMçΩ…îÅÖ…êÅ‰Åëµ•π•Õ—…ÖçßÕ∏Åµ’ïÕ—…Ö∏ÅÅ1%5%9HÅQ=I9=ÄÏÅ±ΩÃÅù…’¡ΩÃÅçΩπÕï…ŸÖ∏ÅÅ1%5%9HÅIUA=Ä∏Å1ÑÅç±ÖŸîÅÕîÅŸï…•ô•çÑÅï∏ÅÕï…Ÿ•ëΩ»ÏÅπºÅÕîÅçΩπçïëîÅ¡…Ω¡•ïëÖêÅ¡Ω»Åç’ïπ—ÑÅºÅçΩ•πç•ëïπç•ÑÅëîÅπΩµâ…î∏(¥Å…ç°•ŸΩÃÅHƒ‹‡ËÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄ∞ÅÅI=5A}}Q11πµëÄ∞ÅÅI=5A}=YI10πµëÄ∞ÅÅÖ¡§Ω}±•àΩïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏π©ÕÄ∞ÅÅÖ¡§ΩïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏π©ÕÄ∞ÅÅïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏µ’§π©ÕÄ∞ÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅ¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄ∞ÅÅ…ï±ïÖÕîπ©ÕΩπÄ∞ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄ∞ÅÅ—ïÕ–µïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏πµ©ÕÄ∞ÅÅ—ïÕ–µ»ƒÿ‹µÖëµ•∏µÕ°Ö…îµôïïëâÖç¨πµ©ÕÄ∏(¥ÅΩπÕï…ŸÑÅï∞ÅçÖπëÖëºÅÖç—•ŸºËÅ¡’π—ºÅëîÅçΩ…—îÅÅ≥µπïÑÄƒ‡’ÄÏÅÖç—•ŸÖçßÕ∏ÅÄ»ÃÅëîÅÖùΩÕ—ºÅëîÄ»¿»ÿ∞Äƒ‹Ë¿‘Ë¿¿∞Å°Ω…ÑÅëîÅ’Ö—ïµÖ±ÖÄ∏ÅA…’ïâÖÃÅ±ΩçÖ±ïÃÅëîÅ¡…Ω¡•ïëÖê∞Åï—•≈’ï—ÑÅ‰Åô±’©ΩÃÅôïëï…ÖëΩÃÅ¡ÖÕÖ∏∏Å∞ÅA…ïŸ•ï‹ÅëîÅYï…çï∞ÅÖπ—ï…•Ω»ÅôÖ±≥ÃÅ¡Ω…≈’îÅ±ΩÃÅÖ…ç°•ŸΩÃÅëîÅ…ΩÖëµÖ¿ÅÕîÅ—…ÖπÕµ•—•ï…Ω∏Å—…’πçÖëΩÃÏÅïÕ—ÑÅ…ïŸ•ÕßÕ∏Å…ïÕ—Ö’…ÑÅ±ΩÃÅΩ…•ù•πÖ±ïÃÅçΩµ¡±ï—ΩÃÅ‰ÅçΩµ¡±ï—ÑÅ±ΩÃÅ…ïù•Õ—…ΩÃÅï·•ù•ëΩÃÅ¡Ω»Åï∞ÅùÖ—î∏(()Hƒ‹‡É
‹ÄÿÅΩç—’â…îÄ»¿»ÿÉ
‹Å±•åÅëîÅï±•µ•πÖ»ÅÕ•ïµ¡…îÅÖâ…îÅçΩπô•…µÖçßÕ∏)∞ÅâΩ”Õ∏Å√Èâ±•çºÅëîÅëµ•π•Õ—…ÖçßÕ∏ÅïÕ—ÖâÑÅë•ÕÖâ±ïêÅç’ÖπëºÅπºÅÕîÅ…ïçΩπΩèµÑÅÖ’—Ω…•ëÖê∏Å°Ω…ÑÅÖâ…îÅ=9%I5Å1%5%9HÅçΩ∏ÅπΩµâ…î∞Å¡…ïù’π—ÑÅ‰Å91HÏÅœÕ±ºÅçΩπô•…µÖ»Åïπ€µÑÅëï±ï—îΩ…ïµΩ—îµëï±ï—îÅ‰Åï∞ÅÕï…Ÿ•ëΩ»ÅçΩπÕï…ŸÑÅ±ÑÅŸÖ±•ëÖçßÕ∏ÅëîÅ¡ï…µ•ÕΩÃ∏Å9ºÅÕîÅï±•µ•πÑÅÖ∞ÅÖâ…•»ÅºÅçÖπçï±Ö»∏ÅA…’ïâÖÃËÅ—ïÕ–µïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏πµ©Ã∞Å—ïÕ–µ»ƒÿ‹µÖëµ•∏µÕ°Ö…îµôïïëâÖç¨πµ©Ã∞Å—ïÕ–µ»ƒ‹‹µç…ΩÕÃµëïŸ•çîµÖëµ•∏πµ©Ã∏(((ååÅHƒ‹‰É
‹ÄÿÅΩç—’â…îÄ»¿»ÿÉ
‹Å•…ïç—Ω…•ºÅù±ΩâÖ∞Å‰ÅèÕë•ùΩÃÅëîÅ—Ω…πïΩÃ((¥Å%ÅÅQ=I9=LÅ‰Åëµ•π•Õ—…ÖçßÕ∏ÅçΩπÕ’±—Ö∏Å—ΩëΩÃÅ±ΩÃÅ—Ω…πïΩÃÅÖç—•ŸΩÃÅëîÅ1Å‰Å¡…Ωë’ççßÕ∏∞ÅÕ•∏Åô•±—…ºÅ¡Ω»Åç…ïÖëΩ»∞Åë•Õ¡ΩÕ•—•ŸºÅºÅçÖµ¡º∞ÅÕ•∏Å≥µµ•—îÅô•©ºÅëîÅ±•Õ—Ñ∏ÅÖëÑÅô•±ÑÅçΩπÕï…ŸÑÅΩ…•ùï∏ÅîÅ%∞Åµ’ïÕ—…ÑÅï∞ÅèÕë•ùºÅëîÅ•πù…ïÕºÅŸ•ùïπ—îÅ‰Å±ºÅçΩµ¡Ö…—î∏(¥ÅÕç…•—Ω»ÅëîÅèÕë•ùΩÃÅçΩµ¡Ö…—•ëºÅçΩ∏Åï∞Åô±’©ºÅï·•Õ—ïπ—îËÅçΩπÕï…ŸÑÅèÕë•ùΩÃÅ¡ïπë•ïπ—ïÃÅ‰Å…ïïµ¡±ÖÈÑÅ±ΩÃÅçΩπÕ’µ•ëΩÃ∏Å∞ÅèÕë•ùºÅëîÅ•πù…ïÕºÅπºÅçΩπçïëîÅΩ…ùÖπ•ÈÖçßÕ∏Åπ§Åï±•µ•πÖçßÕ∏ÏÅ±ÖÃÅÖ’—Ω…•ÈÖç•ΩπïÃÅëï∞ÅÕï…Ÿ•ëΩ»ÅÕîÅçΩπÕï…ŸÖ∏∏Å	Ω”Õ∏Å…Ω©ºÅ‰Å=9%I5Å1%5%9HÅëîÅHƒ‹‡ÅçΩπÕï…ŸÖëΩÃ∏(¥ÅA…’ïâÖÃËÅ—ïÕ–µ»ƒ‹‡µù±ΩâÖ∞µ—Ω’…πÖµïπ–µ•ëÃπµ©Ã∞Å—ïÕ–µ»ƒ‹‹µç…ΩÕÃµëïŸ•çîµÖëµ•∏πµ©Ã∞Å—ïÕ–µ»ƒÿ‹µÖëµ•∏µÕ°Ö…îµôïïëâÖç¨πµ©Ã∞Å—ïÕ–µïŸïπ–µë•…ïç—Ω…‰µçΩëîπµ©ÃÅ‰Å—ïÕ–µ¡ï…ÕΩπÖ∞µïŸïπ–µ¡ï…µ•ÕÕ•ΩπÃπµ©ÃÅAML∏(¥Å…ç°•ŸΩÃËÅÅÖ¡§Ω}±•àΩ¡ï…ÕΩπÖ∞µïŸïπ–µÖççïÕÃπ©ÕÄ∞ÅÅÖ¡§Ω—Ω’…πÖµïπ–µÕçΩ…îµë•…ïç—Ω…‰π©ÕÄ∞ÅÅïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏µ’§π©ÕÄ∞ÅÅ¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄ∞ÅÅ—ïÕ–µ»ƒ‹‡µù±ΩâÖ∞µ—Ω’…πÖµïπ–µ•ëÃπµ©ÕÄ∞ÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄ∞ÅÅ…ï±ïÖÕîπ©ÕΩπÄ∏((¥Å9ÖŸïùÖëΩ»Å∑ÕŸ•∞ËÅÅ—ïÕ—ÃΩ»ƒ‹‰µù±ΩâÖ∞µ—Ω’…πÖµïπ–µâ…Ω›Õï»πµ©ÕÄÅAMLËÄƒ»¿ÅèÕë•ùΩÃÅ•ì•π—•çΩÃÅï∏ÅÖµâΩÃÅ±•Õ—ÖëΩÃ∞ÅëΩÃÅÖµâ•ïπ—ïÃ∞Å•ëïπ—•ëÖêÅÕ•∏Å—Ω…πïΩÃÅ¡…Ω¡•ΩÃ∞ÅâΩ”Õ∏Å…Ω©º∞ÅçΩπô•…µÖçßÕ∏Å‰Åçï…ºÅï……Ω…ïÃÅ)L∏Å∞Åë•…ïç—Ω…•ºÅµÖ…çÑÅ±•Õ—ÑÅ¡Ö…ç•Ö∞ÅÕ§ÅôÖ±—ÑÅ’∏ÅΩ…•ùï∏ÅºÅèÕë•ùº∏((¥ÅHƒ‹‰ÅÖ©’Õ—îÅëîÅçΩµ¡•±ÖçßÕ∏ËÅÅ—ïÕ–µ»ƒ‘ÿµ—Ω’…πÖµïπ–µ•πŸ•—Ö—•Ω∏πµ©ÕÄÅŸÖ±•ëÑÅ±ÑÅ±•Õ—ÑÅù±ΩâÖ∞Åï∏Å’πÑÅ•ëïπ—•ëÖêÅÖ©ïπÑ∏ÅÅ›°Ö—ÕÖ¡¿µ•πŸ•—Ö—•ΩπÃπ©ÕÄÅ‰ÅÅ—ïÕ–µ»ƒ‘‰µ›°Ö—ÕÖ¡¿µ—›ºµµïÕÕÖùïÃπµ©ÕÄÅçΩπÕï…ŸÖ∏Åï∞ÅΩ…•ùï∏Å1Ω¡…Ωë’ççßÕ∏Åï∏Å±ÑÅ•πŸ•—ÖçßÕ∏ÅçΩµ¡Ö…—•ëÑÅ‰Å±ºÅ¡…’ïâÖ∏∏(((ååÅHƒ‡¿É
‹ÄÿÅΩç—’â…îÄ»¿»ÿÉ
‹ÅIïÖâ…•»ÅMçΩ…îÅÖ…êÅ•πÕ—Ö±Öëº((¥ÅÖ’ÕÑËÅ¡›Ñµ±Ö’πç†ÅïπŸ•ÖâÑÅ•π•ç•ºÙƒÅ‰ÅÕΩ’…çîı¡›ÑÏÅë•…ïç—!ΩµîÅôΩ…ÈÖâÑÅIïù•Õ—…ºÅÖ’∏ÅçΩ∏Å—Ö…©ï—ÑÅÖç—•ŸÑ∏ÅMîÅï±•µ•πÑÅ•π•ç•ºÅëï∞ÅÖ……Öπ≈’îÅ‰ÅÕîÅ…ïç’¡ï…ÑÅ±ÑÅ—Ö…©ï—ÑÅï∏ÅA]Å‰ÅÖççïÕΩÃÅÖπ—•ù’ΩÃÅ•πÕ—Ö±ÖëΩÃ∏Å∞Åïπ±ÖçîÅ›ïàÅπΩ…µÖ∞ÅµÖπ—•ïπîÅIïù•Õ—…ºÏÅπ’ïŸÖ}…ΩπëÑÅï·¡≥µç•—ÑÅÕ•ù’îÅç…ïÖπëºÅâΩ……ÖëΩ»∏(¥Å…ç°•ŸΩÃËÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅ¡›Ñµ±Ö’πç†π°—µ±Ä∞ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄ∞ÅÅ…ï±ïÖÕîπ©ÕΩπÄ∞ÅÅ—ïÕ–µÿÃÿ‡µçÖπΩπ•çÖ∞µ°Ωµîµïπ—…‰πµ©ÕÄ∞ÅÅ—ïÕ—ÃΩ»ƒ‡¿µ•πÕ—Ö±±ïêµçÖ…êµ…ïÕ’µîπµ©ÕÄ∞ÅÅI=5A}=YI10πµëÄ∞ÅÅI=5A}}Q11πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄ∏(¥ÅA…’ïâÑÅù’Ö…ëÖëÑÅ—ïÕ—ÃΩ»ƒ‡¿µ•πÕ—Ö±±ïêµçÖ…êµ…ïÕ’µîπµ©ÃËÅπÖŸïùÖëΩ»Å∑ÕŸ•∞∞Åçï……Ö»Å√Öù•πÑÅ‰Å…ïÖâ…•»∞Å…•ïπëÃÅçΩ∏Å©’ùÖëΩ»Å‰ÅÕçΩ…ïÃÅëîÅ°ΩÂΩÃÄƒº»ÏÅÖççïÕºÅÖπ—•ù’º∞ÅÕ—ÖπëÖ±Ωπî∞Å›ïà∞Åë•Õ¡ΩÕ•—•ŸºÅŸÖèµºÅ‰Åπ’ïŸÑÅ…ΩπëÑ∏ÅAMLÅ±ΩçÖ∞∏ÅÖ—ΩÃÅëîÅ¡…’ïâÑÅÖ•Õ±ÖëΩÃÏÅπºÅÕîÅÖ±—ï…ÑÅï∞Å—Ω…πïºÅ…ïÖ∞Åπ§ÅÕîÅ…ïç±ÖµÑÅ¡…’ïâÑÅõµÕ•çÑÅ•A°Ωπî∏(¥ÅIΩ±±âÖç¨ËÅçΩµµ•–Ä’ÑÕêÃÃ‡»Ã‡‰ÿÃ‡’ÖëçàÃ…î‹–‘ƒ—âçî‘…ëò»ÕàÕîƒ∞Åëï¡±ΩÂµïπ—ÃÅHƒ‹‰ÅëîÅÖµâΩÃÅÖµâ•ïπ—ïÃ∏(((ååÅHƒ‡ƒÉ
‹ÄÿÅΩç—’â…îÄ»¿»ÿÉ
‹Å=…ùÖπ•ÈÖëΩ»Å±•â…îÅ¡Ö…ÑÅ—Ω…πïΩÃÅ‰Åù…’¡ΩÃÅù±ΩâÖ±ïÃ((¥Å∞Åë•…ïç—Ω…•ºÅ√Èâ±•çºÅëîÅ=…ùÖπ•ÈÖëΩ»ÅÖù…ïùÑÅ—ΩëΩÃÅ±ΩÃÅù…’¡ΩÃÅŸ•ùïπ—ïÃÅëîÅ1Å‰ÅA…Ωë’ççßÕ∏Å©’π—ºÅÑÅ±ΩÃÅ—Ω…πïΩÃÅÖç—•ŸΩÃÏÅπºÅô•±—…ÑÅ¡Ω»Åç…ïÖëΩ»∞Åë•Õ¡ΩÕ•—•Ÿº∞ÅçÖµ¡º∞Åç•’ëÖêÅºÅÕïÕßÕ∏ÅÖëµ•π•Õ—…Ö—•ŸÑ∏Å1ÑÅΩ¡çßÕ∏Å•πç±’ëï…Ω’¡ÃÅçΩπÕï…ŸÑÅï∞ÅçΩπ—…Ö—ºÅëîÅ±ΩÃÅëï∑ÖÃÅ±•Õ—ÖëΩÃÅï·ç±’Õ•ŸΩÃÅëîÅ—Ω…πïΩÃ∏(¥ÅÕë•ùΩÃÅçΩµ¡Ö…—•â±ïÃÅëîÅù…’¡ΩÃ∞Å•ëïπ—•ëÖêÅÕΩ’…çî≠≠•πê≠•ê∞ÅπÖŸïùÖçßÕ∏Å√Èâ±•çÑÅëîÅMçΩ…ïÃÅëîÅù…’¡ΩÃÅëï∞ÅΩ—…ºÅïπ—Ω…πºÅ‰ÅïÕ—ÖëºÅ1%MQ<ÅÖ’∏ÅÕ§Å±ÑÅA$ÅÖëµ•π•Õ—…Ö—•ŸÑÅëïπ•ïùÑÅÕïÕßÕ∏∏Å1ΩÃÅïπë¡Ω•π—ÃÅëîÅï±•µ•πÖçßÕ∏Å‰ÅïÕç…•—’…ÑÅçΩπÕï…ŸÖ∏ÅÕ’ÃÅçΩπ—…Ω±ïÃÅï·•Õ—ïπ—ïÃÏÅïÕ—ºÅ±•âï…ÑÅï∞Å±•Õ—Öëº∞Å±ΩÃÅèÕë•ùΩÃÅ‰Å±ÑÅçΩπÕ’±—Ñ∏ÅIΩπëÖÃÅï·ç±’Õ•ŸÖµïπ—îÅ±ΩçÖ±ïÃÅÕ•∏Å¡’â±•çÖçßÕ∏ÅπºÅÕΩ∏Å•πŸïπ—ÖëÖÃÅπ§Åëïç±Ö…ÖëÖÃÅÕ•πç…Ωπ•ÈÖëÖÃ∏(¥Å…ç°•ŸΩÃËÅÅÖ¡§Ω}±•àΩ¡ï…ÕΩπÖ∞µïŸïπ–µÖççïÕÃπ©ÕÄ∞ÅÅÖ¡§Ω—Ω’…πÖµïπ–µÕçΩ…îµë•…ïç—Ω…‰π©ÕÄ∞ÅÅïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏µ’§π©ÕÄ∞ÅÅ±•Ÿîµ°’àπ©ÕÄ∞ÅÅ—ïÕ–µ»ƒ‡ƒµù±ΩâÖ∞µù…Ω’¡Ãµë•…ïç—Ω…‰πµ©ÕÄ∞ÅÅ—ïÕ—ÃΩ»ƒ‡ƒµù±ΩâÖ∞µù…Ω’¡Ãµâ…Ω›Õï»πµ©ÕÄ∞ÅÅ—ïÕ–µ»ƒ‹‹µç…ΩÕÃµëïŸ•çîµÖëµ•∏πµ©ÕÄ∞ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄ∞ÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄ∞ÅÅ…ï±ïÖÕîπ©ÕΩπÄ∞ÅÅI=5A}=YI10πµëÄ∞ÅÅI=5A}}Q11πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄ∏(¥ÅA…’ïâÖÃËÅ—ïÕ–µ»ƒ‡ƒµù±ΩâÖ∞µù…Ω’¡Ãµë•…ïç—Ω…‰πµ©ÃÄ°âÖÕîÅ…ïÖ∞ÅA±•—î∞ÅèÕë•ùΩÃÅëîÅù…’¡ºÅÖçï¡—ÖëΩÃÅëïÕëîÅΩ—…ÑÅ•ëïπ—•ëÖê∞Å±ïç—’…ÑÅ√Èâ±•çÑÅ‰Å¡ïï»ÅëîÅù…’¡ΩÃ∞Äƒ¿ƒÅÕ—…ïÖµÃÅÕ•∏ÅçΩ…—î∞ÅëÖ—ΩÃÅëîÅ]°Ö—Õ¡¿Åï·ç±’•ëΩÃ§ÏÅ—ïÕ—ÃΩ»ƒ‡ƒµù±ΩâÖ∞µù…Ω’¡Ãµâ…Ω›Õï»πµ©ÃÄ†ƒ»¿ÅïŸïπ—ΩÃ∞Äÿ¿Åù…’¡ΩÃ∞ÅA$ÅÖëµ•∏Ä–¿Ã∞ÅÕ•∏Å±Ωù•∏∞ÅçΩµ¡Ö…—•»∞ÅçΩπô•…µÖ»ΩçÖπçï±Ö»∞ÅMçΩ…ïÃÅ¡ïï»∞Åçï…ºÅï……Ω…ïÃÅ)L§∏Å	ÖπçºÅëîÅëïÕ¡±•ïù’îÅ•πç±’ÂîÅ¡ï…µÖπïπ—ïµïπ—îÅï∞Å—ïÕ–Å∏ÅHƒ‡¿Å…ïÖ¡ï…—’…ÑÅçΩ∏ÅÕçΩ…ïÃ∞ÅHƒ‹‹Åôïëï…ÖçßÕ∏Å‰Å¡ï…µ•ÕΩÃÅëîÅïÕç…•—Ω»ÅµÖπ—•ïπï∏ÅAML∏(¥ÅIΩ±±âÖç¨ËÅçΩµµ•–Ä¿ÿ—ò‡…î¡ò»Ÿëçò‘…àÿ‘––¿’çÑ¿–‘¡àÃƒ›Ñ’êÃ≈àÃÏÅ1Åë¡±|’AeI)‹Âù–…Â!d’ÖiŸâ	IA ŸºÅ‰ÅA…Ωë’ççßÕ∏Åë¡±|…Ö9·≈0›Õ-iÃ‰ÃÃ——Õ†…]H’·X∏(((ååÅHƒ‡»É
‹Å%πŸ•—ÖçßÕ∏ÅëîÅ—Ω…πïºÅ¡Ω»Å]°Ö—Õ¡¿ÅÖâ…îÅï∞ÅIïù•Õ—…ºÅ¡…ïçÖ…ùÖëºÉ
‹ÄÿÅëîÅΩç—’â…îÅëîÄ»¿»ÿ()Å…ç°•ŸºÅÅIïÕ¡ΩπÕÖâ•±•ëÖêÅÅΩπ—…Ω∞Å)¥¥µ¥¥µ¥¥µ)Å›°Ö—ÕÖ¡¿µ•πŸ•—Ö—•ΩπÃπ©ÃÅÅ5ïπÕÖ©îÅëîÅ—Ω…πïºÅ•πç±’ÂîÅïπ±ÖçîÅë•…ïç—ºÅçΩ∏Å%∞ÅèÕë•ùºÅ‰ÅΩ…•ùï∏ÅëîÅÖµâ•ïπ—îÏÅù…’¡ΩÃÅçΩπÕï…ŸÖ∏Åï∞Åïπ±ÖçîÅùïπï…Ö∞∏ÅÅHƒ‘‰ÅŸÖ±•ëÑÅUI0∞ÅèÕë•ùºÅô•πÖ∞Å‰ÅΩ…•ùï∏Å1ΩA…Ωë’ççßÕ∏∏Å)Å¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÃÅÅAÖÕÑÅï∞Å%Åëï∞ÅïŸïπ—ºÅ‰∞ÅëïÕ¡◊•ÃÅëîÅŸÖ±•ëÖ»ÅŸ•ï‹µçΩëîΩ…ïÖê∞Å¡…ï¡Ö…ÑÅIïù•Õ—…ºÅë•…ïç—Öµïπ—î∏ÅÅHƒ‘ÿÅŸÖ±•ëÑÅïŸïπ—º∞ÅπΩµâ…î∞ÅçÖµ¡º∞ÅµΩëÖ±•ëÖêÅ‰Å…ïç°ÖÈºÅëîÅèÕë•ùºÅ•π€Ö±•ëº∏Å)Å•πëï‡µù…’¡Ö∞π°—µ∞ÅÅUÕÑÅï∞ÅïÕç…•—Ω»ÅëîÅ¡…ï¡Ö…ÖçßÕ∏Åï·•Õ—ïπ—îÅ¡Ö…ÑÅ¡…ïçÖ…ùÖ»ÅçÖµ¡º∞ÅµΩëÖ±•ëÖêÅ‰ÅπΩµâ…î∞ÅÕ•∏Å…ïù•Õ—…Ö»Å©’ùÖëΩ…ïÃÅÖ’—Ω∑Ö—•çÖµïπ—îÏÅµï—ÖëÖ—ºÅ‰Åë•Õ—•π—•ŸºÅŸ•Õ•â±ïÃÅÖ°Ω…ÑÅë•çï∏ÅHƒ‡»∏ÅÅΩπÕï…ŸÑÅçΩπô•…µÖçßÕ∏Åëï∞Å’Õ’Ö…•ºÅ‰ÅïÕç…•—Ω»ÅΩô•ç•Ö∞ÏÅÕï±±ºÅŸ•Õ•â±îÅçΩ•πç•ëîÅçΩ∏Å…ï±ïÖÕîπ©ÕΩ∏∏Å)Å…ï±ïÖÕîπ©ÕΩ∏∞ÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÃÅÅ5Ö…çÖ∏ÅHƒ‡»∞Å•πç±’•ëºÅI1M}11	,∞ÅîÅ•πŸÖ±•ëÖ∏ÅçÖç£§Å•πÕ—Ö±ÖëÑÅ¡Ö…ÑÅΩô…ïçï»Å±ÑÅŸï…ÕßÕ∏Åπ’ïŸÑ∏ÅÅMï±±ΩÃÅëîÅŸï…ÕßÕ∏Åëïâï∏ÅçΩ•πç•ë•»ÅÖπ—ïÃÅëîÅA…ïŸ•ï‹∏Å)ÅA…’ïâÖÃÅHƒ‘‰∞ÅHƒ‘ÿ∞ÅH»–∞Å—ïÕ–µ±Öàµ¡…•ŸÖ—îµ…Ω’πêµÕ°Ö…îµô±Ω‹πµ©ÃÅ‰Å…ïŸ•Õ•ΩπïÃÅHƒ‘‰ΩHƒÿƒÅÅA…Ω—ïùï∏Åïπ±ÖçîÅë•…ïç—ºÅ¡…ïçÖ…ùÖëºÅëï∞Å—Ω…πïº∞Åô±’©ºÅ•π—Öç—ºÅëîÅù…’¡ΩÃ∞Å‰ÅµïπÕÖ©ïÃÅŸ•Õ’Ö±ïÃ∏ÅÅHƒ‘‰ΩHƒ‘ÿΩH»–ΩHƒ–‹ÅAMLÏÅπÖŸïùÖëΩ»Å‰ÅA…ïŸ•ï‹Åï∏ÅŸÖ±•ëÖçßÕ∏∏Å)Åçï¡—ÖçßÕ∏ÅHƒ‡»∞ÅI¥ƒƒƒ∞Å5A∞ÅÖµâΩÃÅI=5AL∞ÅÕï±±ºÅXÃƒƒÅÅï©Ö∏ÅÖ±çÖπçî∞Åëïôïç—º∞ÅÖ…ç°•ŸΩÃÅ‰ÅŸï…ÕßÕ∏ÅëΩç’µïπ—ÖëΩÃ∏ÅÅ…ΩÖëµÖ¿µùÖ—îÅîÅ•πŸïπ—Ω…‰µùÖ—îÅΩâ±•ùÖ—Ω…•ΩÃ∏Å()A…Ωë’ççßÕ∏ÅHƒ‡ƒÅ¡ï…µÖπïçîÅ•π—Öç—ÑÅ°ÖÕ—ÑÅ≈’îÅHƒ‡»ÅÕ’¡ï…îÅ±ΩÃÅçΩπ—…Ω±ïÃÅÖ¡±•çÖâ±ïÃ∏()…ç°•ŸΩÃÅ±•—ï…Ö±ïÃÅHƒ‡»ËÅ›°Ö—ÕÖ¡¿µ•πŸ•—Ö—•ΩπÃπ©Ã∞Å¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©Ã∞Å—ïÕ–µ»ƒ‘‰µ›°Ö—ÕÖ¡¿µ—›ºµµïÕÕÖùïÃπµ©Ã∞Å—ïÕ–µ»ƒ‘ÿµ—Ω’…πÖµïπ–µ•πŸ•—Ö—•Ω∏πµ©Ã∞ÅÕç…•¡—ÃΩ…ïŸ•ï‹µ»ƒ‘‰µ›°Ö—ÕÖ¡¿µ—›ºµµïÕÕÖùïÃπµ©Ã∞ÅÕç…•¡—ÃΩ…ïŸ•ï‹µ»ƒÿƒπµ©Ã∞Å…ï±ïÖÕîπ©ÕΩ∏∞ÅÕï…Ÿ•çîµ›Ω…≠ï»π©Ã∞Å=9QI=1}AI=eQ=}M%IΩAQ%=9}Hƒ‡…}]!QMAA}Q=I9<πµê∞Å=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµê∞Å=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=Lπµê∞ÅI=5A}=YI10πµê∞ÅI=5A}}Q11πµê∞Å=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩ∏∏(ååÅHƒ‡¿É
‹ÄÿÅΩç—’â…îÄ»¿»ÿÉ
‹Å±—ÑÅë•…ïç—ÑÅ‰Åë•…ïç—Ω…•ºÅù±ΩâÖ∞ÅÖç—•Ÿº((¥Å…ïÖ»Å—Ω…πïºÅÖâ…îÅï∞ÅôΩ…µ’±Ö…•ºÅë•…ïç—Öµïπ—îÏÅ±ÑÅ±•Õ—ÑÅëï∞Åë•Õ¡ΩÕ•—•ŸºÅµ’ïÕ—…ÑÅ±ΩÃÅç•πçºÅ—Ω…πïΩÃÅù’Ö…ëÖëΩÃÅ‰Å¡ï…µ•—îÅ≈’•—Ö»ÅÕ‘Å…ïôï…ïπç•ÑÅ±ΩçÖ∞Å¡Ö…ÑÅ±•âï…Ö»ÅïÕ¡Öç•º∏Å∞Åë•…ïç—Ω…•ºÅëîÅù…’¡ΩÃÅ‰Å…ΩπëÖÃÅÖç—•ŸÖÃÅçΩπÕ’±—ÑÅ1Å‰Å¡…Ωë’ççßÕ∏∞Å•πë•çÑÅï∞ÅΩ…•ùï∏Å‰Å…ï¡Ω…—ÑÅÕ§ÅôÖ±—ÑÅ’∏ÅÖµâ•ïπ—î∏ÅMîÅçΩπÕï…ŸÑÅ±ÑÅÖ’—Ω…•ÈÖçßÕ∏ÅëîÅ¡…Ω¡•ï—Ö…•ºÅ¡Ö…ÑÅçΩµ¡Ö…—•»Å‰Åï±•µ•πÖ»Å—Ω…πïΩÃ∏(¥ÅA…’ïâÖÃÅë•…•ù•ëÖÃËÅÅ—ïÕ–µ±Öàµ…Ω’πêµç…ïÖ—îµµΩëÖ∞πµ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµ…ïù•Õ—…Ö—•Ω∏µ…ï—’…∏µÕ—Ö—îπµ©ÕÄ∞ÅÅ—ïÕ–µ—Ω’…πÖµïπ–µΩ…ùÖπ•Èï»µ¡ï…µ•ÕÕ•ΩπÃπµ©ÕÄ∞ÅÅ—ïÕ–µïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏πµ©ÕÄÅ‰ÅÅ—ïÕ–µÿÃ‘Ãµ±•Ÿîµ°’àπµ©ÕÄÅAML∏(¥Å…ç°•ŸΩÃËÅÅÖ¡§Ω±•Ÿîπ©ÕÄ∞ÅÅÖ¡§Ω¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄ∞ÅÅ±•Ÿîµ°’àπ°—µ±Ä∞ÅÅ±•Ÿîµ°’àπ©ÕÄ∞ÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅ…ï±ïÖÕîπ©ÕΩπÄ∞ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄ∞ÅÅ—ïÕ–µ±Öàµ…Ω’πêµç…ïÖ—îµµΩëÖ∞πµ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµ…ïù•Õ—…Ö—•Ω∏µ…ï—’…∏µÕ—Ö—îπµ©ÕÄ∞ÅÅ—ïÕ–µ—Ω’…πÖµïπ–µΩ…ùÖπ•Èï»µ¡ï…µ•ÕÕ•ΩπÃπµ©ÕÄÅ‰ÅÅ—ïÕ–µÿÃ‘Ãµ±•Ÿîµ°’àπµ©ÕÄÅÖπêÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄ∏((ååÅHƒ‡ƒÉ
‹ÄÿÅΩç—’â…îÄ»¿»ÿÉ
‹Å±•µ•πÖçßÕ∏Åëïô•π•—•ŸÑÅ‰Åë•…ïç—Ω…•ºÅçΩµ¡±ï—º((¥ÅAïë•ëºÅÖ’—Ω…•ÈÖëºËÅï±•µ•πÖ»ÅõµÕ•çÖµïπ—îÅ—Ω…πïΩÃÅ‰Å…ΩπëÖÃ∞ÅµÖπ’Ö±µïπ—îÅºÅ¡Ω»Åï·¡•…ÖçßÕ∏∞ÅÕ•∏ÅÖ…ç°•ŸºÅπ§Å…ïÖ¡Ö…•çßÕ∏Åï∏Å%∞Åëµ•π•Õ—…ÖëΩ»ÅºÅMçΩ…îÅÖ…ê∏Å1ÑÅ¡’…ùÑÅ•πç±’ÂîÅù…’¡ΩÃ∞ÅÕçΩ…ïÃ∞Å°•Õ—Ω…•Ö∞∞Å—Ö…©ï—ÖÃÅçïπ—…Ö±ïÃÅÖÕΩç•ÖëÖÃ∞ÅèÕë•ùΩÃ∞ÅÕïÕ•ΩπïÃ∞Å¡ï…µ•ÕΩÃ∞ÅÖççïÕΩÃÅ‰Å…ïôï…ïπç•ÖÃÅ±ΩçÖ±ïÃÅçΩπô•…µÖëÖÃÅ¡Ω»Åï∞ÅÕï…Ÿ•ëΩ»ÏÅçΩπÕï…ŸÑÅ±ÖÃÅ…ΩπëÖÃÅ‰Å¡ï…ô•±ïÃÅÖ©ïπΩÃÅÖ∞ÅïŸïπ—ºÅï±•µ•πÖëº∏Å1ΩÃÅïŸïπ—ΩÃÅï±•µ•πÖëΩÃÅπ’πçÑÅÕîÅ…ïÕ—Ö’…Ö∏∏(¥Å•…ïç—Ω…•ºÅëîÅµï—ÖëÖ—ΩÃÅ¡’â±•çÖëΩÃËÅ1Ä¨Å¡…Ωë’ççßÕ∏∞ÅÕ•∏Åô•±—…ΩÃÅ¡Ω»Åç’ïπ—Ñ∞ÅçÖµ¡ºÅºÅë•Õ¡ΩÕ•—•ŸºÅπ§Å—Ω¡ïÃÅëîÄ‘¿Å—Ω…πïΩÃº‘¿¿Åù…’¡ΩÃÏÅ•πç±’ÂîÅ…ΩπëÖÃÅ¡Ö…—•ç’±Ö…ïÃÅîÅ•πëï¡ïπë•ïπ—ïÃ∏ÅM§ÅôÖ±—ÑÅ’∏ÅÖµâ•ïπ—îÅÕîÅ•πë•çÑÅ±•Õ—ÑÅ•πçΩµ¡±ï—ÑÅ‰ÅÕîÅ…ï•π—ïπ—Ñ∏Å1ÑÅï±•µ•πÖçßÕ∏ÅÕ•ù’îÅï·•ù•ïπëºÅÖ’—Ω…•ëÖêÅëï∞ÅïŸïπ—º∏Å9ºÅÕîÅÖô•…µÑÅÕ•πç…Ωπ•ÈÖçßÕ∏ÅëîÅë•Õ¡ΩÕ•—•ŸΩÃÅëïÕçΩπïç—ÖëΩÃ∏(¥ÅYï…•ô•çÖçßÕ∏Å•πë•Õ¡ïπÕÖâ±îÅá≈Öë•ëÑËÅÅ—ïÕ–µïŸïπ–µ—Ω—Ö∞µ¡’…ùîπµ©ÕÄÅçΩµ¡…’ïâÑÅME0ÅõµÕ•çºÅµÖπ’Ö∞Ωï·¡•…ÖçßÕ∏Å‰Å±•µ¡•ïÈÑÅëï∞ÅÖ…ç°•ŸºÅ±ΩçÖ∞∞ÅMçΩ…îÅÖ…ê∞ÅôÖŸΩ…•—ΩÃ∞ÅèÕë•ùΩÃÅ‰ÅçΩ±ÑÅëîÅÕ•πç…Ωπ•ÈÖçßÕ∏ÏÅÅ—ïÕ–µ—Ω’…πÖµïπ–µΩ…ùÖπ•Èï»µ¡ï…µ•ÕÕ•ΩπÃπµ©ÕÄÅçΩµ¡…’ïâÑÄÿƒÅ—Ω…πïΩÃº‘ƒƒÅù…’¡ΩÃÅ‰Åôïëï…ÖçßÕ∏ÅÕ•∏Å…ïç’…ÕßÕ∏∏(¥Å…ç°•ŸΩÃÅ…ï±Öç•ΩπÖëΩÃËÅÅÖ¡§Ω}±•àΩïŸïπ–µ±•ôïçÂç±îπ©ÕÄ∞ÅÅÖ¡§Ω}±•àΩïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏π©ÕÄ∞ÅÅÖ¡§ΩïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏π©ÕÄ∞ÅÅÖ¡§Ω±•Ÿîπ©ÕÄ∞ÅÅÖ¡§Ω¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄ∞ÅÅÖ¡§Ω—Ω’…πÖµïπ–µÕçΩ…îµë•…ïç—Ω…‰π©ÕÄ∞ÅÅïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏µ’§π©ÕÄ∞ÅÅ¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄ∞ÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅ…ï±ïÖÕîπ©ÕΩπÄ∞ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄ∞ÅÅ—ïÕ–µïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏πµ©ÕÄ∞ÅÅ—ïÕ–µïŸïπ–µ±•ôïçÂç±îπµ©ÕÄ∞ÅÅ—ïÕ–µïŸïπ–µ—Ω—Ö∞µ¡’…ùîπµ©ÕÄ∞ÅÅ—ïÕ–µ»ƒ‹‘µïŸïπ–µï·¡•…‰µë•…ïç—Ω…‰µ…ïçΩŸï…‰πµ©ÕÄ∞ÅÅ—ïÕ–µ—Ω’…πÖµïπ–µΩ…ùÖπ•Èï»µ¡ï…µ•ÕÕ•ΩπÃπµ©ÕÄ∞ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄ∞ÅÅI=5A}=YI10πµëÄ∞ÅÅI=5A}}Q11πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄ∏((¥Å©’Õ—îÅëîÅçΩπ—…Ö—ºÅÕΩ±•ç•—ÖëºÅï∏ÅÅ—ïÕ–µ¡ï…ÕΩπÖ∞µïŸïπ–µ¡ï…µ•ÕÕ•ΩπÃπµ©ÕÄËÅ±ΩÃÅπΩµâ…ïÃÅîÅ%ÃÅëï∞Åë•…ïç—Ω…•ºÅù±ΩâÖ∞ÅÕΩ∏ÅŸ•Õ•â±ïÃÅÕ•∏Å¡ï…—ïπïπç•ÑÏÅ±ÖÃÅ¡…’ïâÖÃÅëîÅ±ïç—’…ÑΩïÕç…•—’…ÑÅ¡…Ω—ïù•ëÑ∞ÅèÕë•ùΩÃÅ‰Å…ïŸΩçÖçßÕ∏ÅÕîÅçΩπÕï…ŸÖ∏∏((¥ÅÅ—ïÕ–µ±•ŸîµΩôô•ç•Ö∞µô±Ω‹πµ©ÕÄËÅ’∏Åïπ±ÖçîÅõµÕ•çÖµïπ—îÅï±•µ•πÖëºÅëïŸ’ï±ŸîÅ1%Y}1%9-}%9Y1%ÏÅπºÅçΩπÕï…ŸÑÅ’∏Å…ïù•Õ—…ºÅ…ïŸΩçÖëºÅ¡Ö…ÑÅ…ïÕ¡Ωπëï»ÅçΩ∏ÅÕ‘ÅïÕ—ÖëºÅÖπ—ï…•Ω»∏Å1ÑÅ±•µ¡•ïÈÑÅ±ΩçÖ∞Å—Öµâß•∏ÅçΩπÕ’±—ÑÅÕ—…ïÖµÃÅ•πëï¡ïπë•ïπ—ïÃ∏((¥Åï¡ïπëïπç•ÖÃÅë•…ïç—ÖÃÅëï∞ÅâΩ……ÖëºËÅÅµÖÕ—ï»µëÖ—ÑµÕÂπåπ©ÕÄÅ•ëïπ—•ô•çÑÅï∞ÅïŸïπ—ºÅï∏Å±ÑÅçΩ±ÑÅçïπ—…Ö∞Å‰ÅÅÖ¡§ΩÕÂπåπ©ÕÄÅ•µ¡•ëîÅ…ïç…ïÖ…±ºÅ—…ÖÃÅÕ‘Åï±•µ•πÖçßÕ∏∞ÅçΩ∏Åâ±Ω≈’ïºÅçΩµ¡Ö…—•ëºÅô…ïπ—îÅÑÅâΩ……ÖëºÅçΩπç’……ïπ—î∏ÅA…’ïâÖÃËÅÅ—ïÕ–µµÖÕ—ï»µëÖ—ÑµÕÂπåπµ©ÕÄ∞ÅÅ—ïÕ–µÕÂπåµÖ¡§πµ©ÕÄ∞ÅÅ—ïÕ–µÕÂπåµÖ’—†πµ©ÕÄÅ‰ÅÅ—ïÕ–µïŸïπ–µ—Ω—Ö∞µ¡’…ùîπµ©ÕÄ∏((¥ÅYï…•ô•çÖçßÕ∏Å¡’â±•çÖëÑËÅï∞Å¡Öπï∞Åù±ΩâÖ∞ÅëîÅÅÖ¡§Ω±•Ÿîπ©ÕÄÅëïâîÅ•πç±’•»Å—Öµâß•∏ÅÕ—…ïÖµÃÅ¡…•ŸÖëΩÃÅ•πëï¡ïπë•ïπ—ïÃ∞Å•ù’Ö∞Å≈’îÅëµ•π•Õ—…ÖëΩ»∏ÅMîÅ’π•ô•çÖ∏ÅÖµâΩÃÅ—•¡ΩÃÅÕ•∏Å≥µµ•—îÅπ§Åô•±—…ºÅ¡Ω»Åç’ïπ—Ñ∏((¥ÅΩ……ïççßÕ∏Å•πë•Õ¡ïπÕÖâ±îÅëîÅ¡’â±•çÖçßÕ∏ËÅ’πÑÅçΩπÕ’±—ÑÅù±ΩâÖ∞ÅëïŸΩ±ŸßÃÅ!QQ@Ä‘¿¿ÄºÅa`¿¿¿Åë’…Öπ—îÅ¡ï—•ç•ΩπïÃÅÕ•µ’±”ÖπïÖÃ∏ÅÅÖ¡§Ω}±•àΩïŸïπ–µ±•ôïçÂç±îπ©ÕÄÅ•πÕ—Ö±ÑÅ±ÖÃÅô’πç•ΩπïÃÅëîÅ¡’…ùÑÅ’πÑÅÕΩ±ÑÅŸïË∞Åï∏Å’πÑÅ—…ÖπÕÖççßÕ∏ÅçΩ∏Åâ±Ω≈’ïºÅÖëŸ•ÕΩ…‰Å‰ÅçΩµ¡…ΩâÖçßÕ∏ÅëîÅŸï…ÕßÕ∏ÏÅïŸ•—ÑÅ…ïëïô•π•…±ÖÃÅµ•ïπ—…ÖÃÅΩ—…ΩÃÅç±•ïπ—ïÃÅâΩ……Ö∏ÅºÅçΩπÕ’±—Ö∏∏ÅÅÖ¡§Ω—Ω’…πÖµïπ–µÕçΩ…îµë•…ïç—Ω…‰π©ÕÄÅ…ïù•Õ—…ÑÅï∞Åë•ÖùªÕÕ—•çºÅME0ÅÕ§ÅŸ’ï±ŸîÅÑÅôÖ±±Ö»∏(((åååÅHƒ‡ƒÉ
‹ÅΩ……ïççßÕ∏ÅëîÅçΩπç’……ïπç•ÑÅÖç…ïë•—ÖëÑ(¥ÅŸ•ëïπç•ÑÅ¡’â±•çÖëÑËÅAΩÕ—ù…ïME0Åa`¿¿¿ËÅ—’¡±îÅçΩπç’……ïπ—±‰Å’¡ëÖ—ïêÅÖ∞Å…ïëïô•π•»Åô’πç•ΩπïÃÅ¡ï…ÕΩπÖ±ïÃÅë’…Öπ—îÅçΩπÕ’±—ÖÃÅÕ•µ’±”ÖπïÖÃ∏(¥ÅÖ¡§Ω}±•àΩ¡ï…ÕΩπÖ∞µïŸïπ–µÖççïÕÃπ©ÃËÅ•πÕ—Ö±ÑÅ±ÖÃÅµ•ÕµÖÃÅô’πç•ΩπïÃÅëîÅ¡ï…µ•ÕΩÃÅ’πÑÅŸïËÅ¡Ω»ÅŸï…ÕßÕ∏∞ÅçΩ∏Åâ±Ω≈’ïºÅ—…ÖπÕÖçç•ΩπÖ∞Å‰ÅëΩâ±îÅçΩµ¡…ΩâÖçßÕ∏ÏÅçΩπÕï…ŸÑÅÕ’ÃÅëïç•Õ•ΩπïÃÅëîÅÖççïÕº∏(¥Å—ïÕ–µïŸïπ–µ—Ω—Ö∞µ¡’…ùîπµ©ÃËÅŸï…•ô•çÑÅ≈’îÅ…ï¡ï—•»Å±ÑÅ•π•ç•Ö±•ÈÖçßÕ∏ÅπºÅ…ïïÕç…•âîÅô’πç•ΩπïÃÅ•πÕ—Ö±ÖëÖÃ∏(¥Å…ï±ïÖÕîπ©ÕΩ∏Å‰Å=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩ∏ËÅÖç—’Ö±•ÈÖçßÕ∏ÅëîÅôïç°ÑÅîÅ•πŸïπ—Ö…•ºÅëîÅ¡’â±•çÖçßÕ∏∏(((ååÅHƒ‡–É
‹Å%π—ïù…ÖçßÕ∏ÅëîÅâΩ……ÖëºÅ¡ï…µÖπïπ—îÅÕ•∏Å¡ï…ëï»ÅHƒ‡»ΩHƒ‡ÃÉ
‹ÄÿÅΩç—’â…îÄ»¿»ÿ)	ÖÕîÅŸ•ùïπ—îÄ—Ñ–‰ÕÑ‹ÏÅ•πçΩ…¡Ω…ÑÅ±ÑÅçΩ……ïççßÕ∏ÅÖç…ïë•—ÖëÑÄ»›å·Öî–∏Å1ÖÃÅ¡’â±•çÖç•ΩπïÃÅë•Ÿï…ùïπ—ïÃÅ°ÖãµÖ∏Å…ï—•…ÖëºÅ±ÑÅ¡’…ùÑÅ‰Å…ï•πÕ—Ö±ÖëºÅ…ïëïô•π•ç•ΩπïÃÅçΩπç’……ïπ—ïÃ∏Å%π—ïù…ÖçßÕ∏Å•πç…ïµïπ—Ö∞ÅçΩπÕï…ŸÑÅ•πŸ•—Öç•ΩπïÃÅ]°Ö—Õ¡¿Å¡…ïçΩπô•ù’…ÖëÖÃ∞Å…ïÖ¡ï…—’…ÑÅëîÅMçΩ…îÅÖ…ê∞ÅMçΩ…ïÃÅ¡…•ŸÖëΩÃÅÕ•∏Å—…’πçÖ»Å‰Å—Ö…©ï—ÖÃÅëîÅëµ•π•Õ—…ÖçßÕ∏ÅÕ•∏Åµï—ÖëÖ—ΩÃÏÅ…ïÕ—Ö’…ÑÅ¡’…ùÑÅõµÕ•çÑ∞Å±•µ¡•ïÈÑÅ±ΩçÖ∞Å‰Åâ±Ω≈’ïºÅëîÅ…ïÕ—Ö’…ÖçßÕ∏∏ÅA…’ïâÖÃÅëîÅ¡ï…µ•ÕΩÃ∞Åï·¡•…ÖçßÕ∏∞ÅâΩ……ÖëºÅ‰Åë•…ïç—Ω…•ºÅΩâ±•ùÖ—Ω…•ÖÃ∏ÅIΩ±±âÖç¨ÅëîÅèÕë•ùºËÄ—Ñ–‰ÕÑ‹Ä°1§Å‰Ä’âò¡î‰ÿÄ°AI=§∞ÅÕ•∏Å…ïÕ—Ö’…Ö»ÅëÖ—ΩÃÅâΩ……ÖëΩÃ∏(¥ÅÅI=5A}}Q11πµëÄÉ
‹Å•π—ïù…ÖçßÕ∏ΩçΩ……ïççßÕ∏ΩŸï…•ô•çÖçßÕ∏ÅHƒ‡–Åë•…ïç—Öµïπ—îÅŸ•πç’±ÖëÑÅÑÅ±ΩÃÅ¡ïë•ëΩÃ∏(¥ÅÅI=5A}=YI10πµëÄÉ
‹Å•π—ïù…ÖçßÕ∏ΩçΩ……ïççßÕ∏ΩŸï…•ô•çÖçßÕ∏ÅHƒ‡–Åë•…ïç—Öµïπ—îÅŸ•πç’±ÖëÑÅÑÅ±ΩÃÅ¡ïë•ëΩÃ∏(¥ÅÅÖ¡§Ω}±•àΩïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏π©ÕÄÉ
‹Å•π—ïù…ÖçßÕ∏ΩçΩ……ïççßÕ∏ΩŸï…•ô•çÖçßÕ∏ÅHƒ‡–Åë•…ïç—Öµïπ—îÅŸ•πç’±ÖëÑÅÑÅ±ΩÃÅ¡ïë•ëΩÃ∏(¥ÅÅÖ¡§Ω}±•àΩïŸïπ–µ±•ôïçÂç±îπ©ÕÄÉ
‹Å•π—ïù…ÖçßÕ∏ΩçΩ……ïççßÕ∏ΩŸï…•ô•çÖçßÕ∏ÅHƒ‡–Åë•…ïç—Öµïπ—îÅŸ•πç’±ÖëÑÅÑÅ±ΩÃÅ¡ïë•ëΩÃ∏(¥ÅÅÖ¡§Ω}±•àΩ¡ï…ÕΩπÖ∞µïŸïπ–µÖççïÕÃπ©ÕÄÉ
‹Å•π—ïù…ÖçßÕ∏ΩçΩ……ïççßÕ∏ΩŸï…•ô•çÖçßÕ∏ÅHƒ‡–Åë•…ïç—Öµïπ—îÅŸ•πç’±ÖëÑÅÑÅ±ΩÃÅ¡ïë•ëΩÃ∏(¥ÅÅÖ¡§ΩïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏π©ÕÄÉ
‹Å•π—ïù…ÖçßÕ∏ΩçΩ……ïççßÕ∏ΩŸï…•ô•çÖçßÕ∏ÅHƒ‡–Åë•…ïç—Öµïπ—îÅŸ•πç’±ÖëÑÅÑÅ±ΩÃÅ¡ïë•ëΩÃ∏(¥ÅÅÖ¡§Ω±•Ÿîπ©ÕÄÉ
‹Å•π—ïù…ÖçßÕ∏ΩçΩ……ïççßÕ∏ΩŸï…•ô•çÖçßÕ∏ÅHƒ‡–Åë•…ïç—Öµïπ—îÅŸ•πç’±ÖëÑÅÑÅ±ΩÃÅ¡ïë•ëΩÃ∏(¥ÅÅÖ¡§Ω¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄÉ
‹Å•π—ïù…ÖçßÕ∏ΩçΩ……ïççßÕ∏ΩŸï…•ô•çÖçßÕ∏ÅHƒ‡–Åë•…ïç—Öµïπ—îÅŸ•πç’±ÖëÑÅÑÅ±ΩÃÅ¡ïë•ëΩÃ∏(¥ÅÅÖ¡§ΩÕÂπåπ©ÕÄÉ
‹Å•π—ïù…ÖçßÕ∏ΩçΩ……ïççßÕ∏ΩŸï…•ô•çÖçßÕ∏ÅHƒ‡–Åë•…ïç—Öµïπ—îÅŸ•πç’±ÖëÑÅÑÅ±ΩÃÅ¡ïë•ëΩÃ∏(¥ÅÅÖ¡§Ω—Ω’…πÖµïπ–µÕçΩ…îµë•…ïç—Ω…‰π©ÕÄÉ
‹Å•π—ïù…ÖçßÕ∏ΩçΩ……ïççßÕ∏ΩŸï…•ô•çÖçßÕ∏ÅHƒ‡–Åë•…ïç—Öµïπ—îÅŸ•πç’±ÖëÑÅÑÅ±ΩÃÅ¡ïë•ëΩÃ∏(¥ÅÅïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏µ’§π©ÕÄÉ
‹Å•π—ïù…ÖçßÕ∏ΩçΩ……ïççßÕ∏ΩŸï…•ô•çÖçßÕ∏ÅHƒ‡–Åë•…ïç—Öµïπ—îÅŸ•πç’±ÖëÑÅÑÅ±ΩÃÅ¡ïë•ëΩÃ∏(¥ÅÅ•πëï‡µù…’¡Ö∞π°—µ±ÄÉ
‹Å•π—ïù…ÖçßÕ∏ΩçΩ……ïççßÕ∏ΩŸï…•ô•çÖçßÕ∏ÅHƒ‡–Åë•…ïç—Öµïπ—îÅŸ•πç’±ÖëÑÅÑÅ±ΩÃÅ¡ïë•ëΩÃ∏(¥ÅÅ±•Ÿîµ°’àπ°—µ±ÄÉ
‹Å•π—ïù…ÖçßÕ∏ΩçΩ……ïççßÕ∏ΩŸï…•ô•çÖçßÕ∏ÅHƒ‡–Åë•…ïç—Öµïπ—îÅŸ•πç’±ÖëÑÅÑÅ±ΩÃÅ¡ïë•ëΩÃ∏(¥ÅÅ±•Ÿîµ°’àπ©ÕÄÉ
‹Å•π—ïù…ÖçßÕ∏ΩçΩ……ïççßÕ∏ΩŸï…•ô•çÖçßÕ∏ÅHƒ‡–Åë•…ïç—Öµïπ—îÅŸ•πç’±ÖëÑÅÑÅ±ΩÃÅ¡ïë•ëΩÃ∏(¥ÅÅµÖÕ—ï»µëÖ—ÑµÕÂπåπ©ÕÄÉ
‹Å•π—ïù…ÖçßÕ∏ΩçΩ……ïççßÕ∏ΩŸï…•ô•çÖçßÕ∏ÅHƒ‡–Åë•…ïç—Öµïπ—îÅŸ•πç’±ÖëÑÅÑÅ±ΩÃÅ¡ïë•ëΩÃ∏(¥ÅÅ¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄÉ
‹Å•π—ïù…ÖçßÕ∏ΩçΩ……ïççßÕ∏ΩŸï…•ô•çÖçßÕ∏ÅHƒ‡–Åë•…ïç—Öµïπ—îÅŸ•πç’±ÖëÑÅÑÅ±ΩÃÅ¡ïë•ëΩÃ∏(¥ÅÅ…ï±ïÖÕîπ©ÕΩπÄÉ
‹Å•π—ïù…ÖçßÕ∏ΩçΩ……ïççßÕ∏ΩŸï…•ô•çÖçßÕ∏ÅHƒ‡–Åë•…ïç—Öµïπ—îÅŸ•πç’±ÖëÑÅÑÅ±ΩÃÅ¡ïë•ëΩÃ∏(¥ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄÉ
‹Å•π—ïù…ÖçßÕ∏ΩçΩ……ïççßÕ∏ΩŸï…•ô•çÖçßÕ∏ÅHƒ‡–Åë•…ïç—Öµïπ—îÅŸ•πç’±ÖëÑÅÑÅ±ΩÃÅ¡ïë•ëΩÃ∏(¥ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄÉ
‹Å•π—ïù…ÖçßÕ∏ΩçΩ……ïççßÕ∏ΩŸï…•ô•çÖçßÕ∏ÅHƒ‡–Åë•…ïç—Öµïπ—îÅŸ•πç’±ÖëÑÅÑÅ±ΩÃÅ¡ïë•ëΩÃ∏(¥ÅÅ—ïÕ–µïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏πµ©ÕÄÉ
‹Å•π—ïù…ÖçßÕ∏ΩçΩ……ïççßÕ∏ΩŸï…•ô•çÖçßÕ∏ÅHƒ‡–Åë•…ïç—Öµïπ—îÅŸ•πç’±ÖëÑÅÑÅ±ΩÃÅ¡ïë•ëΩÃ∏(¥ÅÅ—ïÕ–µïŸïπ–µ±•ôïçÂç±îπµ©ÕÄÉ
‹Å•π—ïù…ÖçßÕ∏ΩçΩ……ïççßÕ∏ΩŸï…•ô•çÖçßÕ∏ÅHƒ‡–Åë•…ïç—Öµïπ—îÅŸ•πç’±ÖëÑÅÑÅ±ΩÃÅ¡ïë•ëΩÃ∏(¥ÅÅ—ïÕ–µïŸïπ–µ—Ω—Ö∞µ¡’…ùîπµ©ÕÄÉ
‹Å•π—ïù…ÖçßÕ∏ΩçΩ……ïççßÕ∏ΩŸï…•ô•çÖçßÕ∏ÅHƒ‡–Åë•…ïç—Öµïπ—îÅŸ•πç’±ÖëÑÅÑÅ±ΩÃÅ¡ïë•ëΩÃ∏(¥ÅÅ—ïÕ–µ±Öàµ…ïù•Õ—…Ö—•Ω∏µ…ï—’…∏µÕ—Ö—îπµ©ÕÄÉ
‹Å•π—ïù…ÖçßÕ∏ΩçΩ……ïççßÕ∏ΩŸï…•ô•çÖçßÕ∏ÅHƒ‡–Åë•…ïç—Öµïπ—îÅŸ•πç’±ÖëÑÅÑÅ±ΩÃÅ¡ïë•ëΩÃ∏(¥ÅÅ—ïÕ–µ±Öàµ…Ω’πêµç…ïÖ—îµµΩëÖ∞πµ©ÕÄÉ
‹Å•π—ïù…ÖçßÕ∏ΩçΩ……ïççßÕ∏ΩŸï…•ô•çÖçßÕ∏ÅHƒ‡–Åë•…ïç—Öµïπ—îÅŸ•πç’±ÖëÑÅÑÅ±ΩÃÅ¡ïë•ëΩÃ∏(¥ÅÅ—ïÕ–µ±•ŸîµΩôô•ç•Ö∞µô±Ω‹πµ©ÕÄÉ
‹Å•π—ïù…ÖçßÕ∏ΩçΩ……ïççßÕ∏ΩŸï…•ô•çÖçßÕ∏ÅHƒ‡–Åë•…ïç—Öµïπ—îÅŸ•πç’±ÖëÑÅÑÅ±ΩÃÅ¡ïë•ëΩÃ∏(¥ÅÅ—ïÕ–µ¡ï…ÕΩπÖ∞µïŸïπ–µ¡ï…µ•ÕÕ•ΩπÃπµ©ÕÄÉ
‹Å•π—ïù…ÖçßÕ∏ΩçΩ……ïççßÕ∏ΩŸï…•ô•çÖçßÕ∏ÅHƒ‡–Åë•…ïç—Öµïπ—îÅŸ•πç’±ÖëÑÅÑÅ±ΩÃÅ¡ïë•ëΩÃ∏(¥ÅÅ—ïÕ–µ»ƒ‹‘µïŸïπ–µï·¡•…‰µë•…ïç—Ω…‰µ…ïçΩŸï…‰πµ©ÕÄÉ
‹Å•π—ïù…ÖçßÕ∏ΩçΩ……ïççßÕ∏ΩŸï…•ô•çÖçßÕ∏ÅHƒ‡–Åë•…ïç—Öµïπ—îÅŸ•πç’±ÖëÑÅÑÅ±ΩÃÅ¡ïë•ëΩÃ∏(¥ÅÅ—ïÕ–µ—Ω’…πÖµïπ–µΩ…ùÖπ•Èï»µ¡ï…µ•ÕÕ•ΩπÃπµ©ÕÄÉ
‹Å•π—ïù…ÖçßÕ∏ΩçΩ……ïççßÕ∏ΩŸï…•ô•çÖçßÕ∏ÅHƒ‡–Åë•…ïç—Öµïπ—îÅŸ•πç’±ÖëÑÅÑÅ±ΩÃÅ¡ïë•ëΩÃ∏(¥ÅÅ—ïÕ–µÿÃ‘Ãµ±•Ÿîµ°’àπµ©ÕÄÉ
‹Å•π—ïù…ÖçßÕ∏ΩçΩ……ïççßÕ∏ΩŸï…•ô•çÖçßÕ∏ÅHƒ‡–Åë•…ïç—Öµïπ—îÅŸ•πç’±ÖëÑÅÑÅ±ΩÃÅ¡ïë•ëΩÃ∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄÉ
‹Å•π—ïù…ÖçßÕ∏ΩçΩ……ïççßÕ∏ΩŸï…•ô•çÖçßÕ∏ÅHƒ‡–Åë•…ïç—Öµïπ—îÅŸ•πç’±ÖëÑÅÑÅ±ΩÃÅ¡ïë•ëΩÃ∏(¥ÅÅ=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=LπµëÄÉ
‹Å•π—ïù…ÖçßÕ∏ΩçΩ……ïççßÕ∏ΩŸï…•ô•çÖçßÕ∏ÅHƒ‡–Åë•…ïç—Öµïπ—îÅŸ•πç’±ÖëÑÅÑÅ±ΩÃÅ¡ïë•ëΩÃ∏(¥ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµëÄÉ
‹Å•π—ïù…ÖçßÕ∏ΩçΩ……ïççßÕ∏ΩŸï…•ô•çÖçßÕ∏ÅHƒ‡–Åë•…ïç—Öµïπ—îÅŸ•πç’±ÖëÑÅÑÅ±ΩÃÅ¡ïë•ëΩÃ∏()Hƒ‡‘Å¡Ö…•ëÖêÅµÖπëÖ—Ω…•ÑËÅI1M}UAQ}5QI%`πµêÏÅÕç…•¡—ÃΩ…ï±ïÖÕîµµÖ—…•‡µùÖ—îπµ©ÃÏÅÕç…•¡—ÃΩëï¡±ΩÂµïπ–µ¡Ö…•—‰µùÖ—îπµ©ÃÏÅ•πëï‡µù…’¡Ö∞π°—µ∞ÏÅ…ï±ïÖÕîπ©ÕΩ∏ÏÅÕï…Ÿ•çîµ›Ω…≠ï»π©Ã∏Å%ëïπ—•ëÖêÅHƒ‡‘ÉÈπ•çÑ∞Åµ•ÕµºÅM!Å‰ÅçΩπ—ïπ•ëºÅÕï…Ÿ•ëºÅŸï…•ô•çÖëºÅÖπ—ïÃÅëï∞Åç•ï……î∏(((ååÅHƒ‡‡É
‹Åëµ•π•Õ—…ÖçßÕ∏Åµ’ïÕ—…ÑÅÕΩ±ºÅ—Ω…πïΩÃÉ
‹Ä‹ÅëîÅΩç—’â…îÅëîÄ»¿»ÿ((¥ÅÅïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏µ’§π©ÕÄËÅ±ÑÅ±•Õ—ÑÅ±ΩçÖ∞Å‰Åù±ΩâÖ∞Åô•±—…ÑÅù…’¡ΩÃÅ¡…•ŸÖëΩÃÅ‰Å…ΩπëÖÃÏÅçΩπÕ’±—ÑÅï∞Åë•…ïç—Ω…•ºÅëîÅ—Ω…πïΩÃÅÕ•∏Åù…’¡ΩÃÅ‰ÅçΩπÕï…ŸÑÅM=ILÅïπï…Ö∞∞ÅÖ—ïùΩÀµÖÃ∞Å%ΩèÕë•ùº∞ÅçΩµ¡Ö…—•»Å‰Åï±•µ•πÖ»∏(¥ÅÅ—ïÕ–µ»ƒ‡‘µ…Ω’πêµëï±ï—îµ’§πµ©ÕÄËÅ…ïù…ïÕßÕ∏ÅçΩπô•…µÑÅ≈’îÅù…’¡ΩÃÅ‰Å…ΩπëÖÃÅ≈’ïëÖ∏Åô’ï…Ñ∞Å‰Å≈’îÅ±ÖÃÅΩ¡ç•ΩπïÃÅëîÅ—Ω…πïºÅ¡ï…µÖπïçï∏∏(¥ÅÅ…ï±ïÖÕîπ©ÕΩπÄ∞ÅÅ•πëï‡µù…’¡Ö∞π°—µ±ÄÅ‰ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄËÅ•ëïπ—•ô•çÖ∏Å±ÑÅïπ—…ïùÑÅHƒ‡‡Å¡Ö…ÑÅ≈’îÅQU1%iHÅëïÕçÖ…ù’îÅï∞ÅçÖµâ•º∏(¥ÅΩµ¡…ΩâÖçßÕ∏ÅïπôΩçÖëÑËÅAMLÅ±ΩçÖ∞∏Å∞Å¡…•µï»Åâ’•±êÅ1Å•ëïπ—•ô•èÃÅïÕ—îÅ…ïù•Õ—…ºÅëîÅ…ΩÖëµÖ¿ÅçΩµºÅ…ï≈’•Õ•—ºÏÅÕîÅÖù…ïùÑÅÖπ—ïÃÅëï∞ÅÕ•ù’•ïπ—îÅâ’•±ê∏()%πŸïπ—Ö…•ºÅÕï±±ÖëºÅçΩπ—…ÑÅï∞ÉÖ…âΩ∞Å•–ÅHƒ‡‡ÏÅï∞Å…ïù•Õ—…ºÅÕîÅÖç—’Ö±•ÈÑÅëîÅôΩ…µÑÅÖ”Õµ•çÑÅçΩ∏ÅÖµâΩÃÅ…ΩÖëµÖ¡Ã∏)MîÅÖ©’Õ—ÑÅÅ—ïÕ–µ»ƒ‡ƒµù±ΩâÖ∞µù…Ω’¡Ãµë•…ïç—Ω…‰πµ©ÕÄËÅçΩπÕï…ŸÑÅ±ÑÅ¡…’ïâÑÅëï∞Åë•…ïç—Ω…•ºÅ‰Å±ïç—’…ÑÅëîÅù…’¡ΩÃÅ¡Ö…ÑÅ±ÖÃÅô’πç•ΩπïÃÅëîÅù…’¡º∞Å‰ÅŸï…•ô•çÑÅ≈’îÅëµ•π•Õ—…ÖçßÕ∏ÅÕΩ±ºÅ…ïç•âÑÅ—Ω…πïΩÃ∏)MîÅÖç—’Ö±•ÈÑÅÅ—ïÕ–µ»ƒÿ‹µÖëµ•∏µÕ°Ö…îµôïïëâÖç¨πµ©ÕÄËÅçΩπÕï…ŸÑÅ±ΩÃÄ–¿Å—Ω…πïΩÃÅù±ΩâÖ±ïÃ∞Åï·ç±’ÂîÅï∞Åù…’¡ºÅ¡…•ŸÖëºÅëîÅ±ÑÅ—Ö…©ï—ÑÅ±ΩçÖ∞Å‰ÅŸÖ±•ëÑÅÕ’ÃÅ¡ï…µ•ÕΩÃÅ…ïÕ—Öπ—ïÃ∏)MîÅÖ©’Õ—ÑÅÅ—ïÕ–µ»ƒ‹‹µç…ΩÕÃµëïŸ•çîµÖëµ•∏πµ©ÕÄËÅï∞Å…ï±Ö‰ÅëîÅù…’¡ºÅ¡…•ŸÖëºÅÕ•ù’îÅç’â•ï…—ºÏÅ±ÑÅ—Ö…©ï—ÑÅëîÅëµ•π•Õ—…ÖçßÕ∏ÅÕîÅŸÖ±•ëÑÅçΩ∏Å’∏Å—Ω…πïºÅ‰Å±ΩÃÅù…’¡ΩÃÅÕîÅï·ç±’Âï∏ÅëîÅ±ÑÅ±•Õ—Ñ∏((ååÅHƒ‡‡µƒÉ
‹Å…ïç’¡ï…ÖçßÕ∏ÅëîÅâΩ……ÖëºÅçΩ∏Å•ëïπ—•ëÖêÅëîÅë•Õ¡ΩÕ•—•ŸºÉ
‹Ä‹ÅΩç—’â…îÄ»¿»ÿ((¥ÅÅÖ¡§Ω¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄËÅÕ§Å’πÑÅçΩΩ≠•îÅÅùÕç}çΩëï}ÕïÕÕ•ΩπÄÅŸïπç•ëÑÅôÖ±±Ñ∞Å’ÕÑÉÈπ•çÖµïπ—îÅ’πÑÅ•ëïπ—•ëÖêÅëîÅë•Õ¡ΩÕ•—•ŸºÅç’ÂÑÅô•…µÑÅï·•Õ—ÑÅï∏Å±ÑÅâÖÕîÅ‰ÅçΩπÕï…ŸÑÅ±ÑÅÖ’—Ω…•ÈÖçßÕ∏Åëï∞Åç…ïÖëΩ»ΩΩ…ùÖπ•ÈÖëΩ»Åëï∞Å—Ω…πïº∏(¥ÅÅ—ïÕ–µïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏πµ©ÕÄËÅ…ï¡…Ωë’çîÅçΩΩ≠•îÅëîÅÕïÕßÕ∏ÅŸïπç•ëÑÅ∑ÖÃÅë•Õ¡ΩÕ•—•ŸºÅ€Ö±•ëºÏÅŸï…•ô•çÑÅï∞ÅâΩ……ÖëºÅÖ∞ÅçΩπô•…µÖ»Å‰ÅçΩπÕï…ŸÑÅëïπïùÖçßÕ∏ÅÑÅ—ï…çï…ΩÃ∏ÅÅ—ïÕ–µïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏πµ©ÕÄÅ‰ÅÅ—ïÕ–µ±ÖàµëïŸ•çîµïŸïπ–µ•ëïπ—•—‰πµ©ÕÄÅAMLÏÅï∞Å¡…•µï»Åâ’•±êÅëï—ïç”ÃÅ’∏ÅïÕçÖ¡îÅ•πçΩ……ïç—ºÅëîÅ±ÑÅï·¡…ïÕßÕ∏ÅëîÅçΩΩ≠•î∞ÅçΩ……ïù•ëºÅÖπ—ïÃÅëï∞ÅÕ•ù’•ïπ—îÅçÖπë•ëÖ—º∏(¥Å1ÑÅçΩµ¡•±ÖçßÕ∏Å1Å‰Å¡’â±•çÖçßÕ∏ÅÕ•ù’ï∏Å¡ïπë•ïπ—ïÃÏÅA…Ωë’ççßÕ∏ÅπºÅçÖµâ•ÑÅÖπ—ïÃÅëîÅAMLÅ•π—ïù…Ö∞∏(ååÅHƒ‰‹É
‹ÅIïç’¡ï…ÖçßÕ∏ÅëîÅ•πù…ïÕºÅÑÅ—Ω…πïºÅçΩ∏ÅÕïÕßÕ∏ÅŸïπç•ëÑÉ
‹Ä‡ÅëîÅΩç—’â…îÅëîÄ»¿»ÿ((¥ÅI’—ÖÃÅï·Öç—ÖÃËÅÅÖ¡§Ω¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄ∞ÅÅÖ¡§Ω}±•àΩÖççΩ’π–µÖ’—†π©ÕÄ∞ÅÅ—ïÕ–µ±ÖàµëïŸ•çîµïŸïπ–µ•ëïπ—•—‰πµ©ÕÄ∞ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄ∞ÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄ∞ÅÅ…ï±ïÖÕîπ©ÕΩπÄ∞ÅÅ=1}M=I}I}Q}A9%9}5QI%`πµëÄ∞ÅÅI=5A}=YI10πµëÄ∞ÅÅI=5A}}Q11πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµëÄÅîÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄ∏(¥Å1ÑÅ…ïç’¡ï…ÖçßÕ∏ÅœÕ±ºÅÕîÅÖ¡±•çÑÅÑÅ•ëïπ—•ëÖêÅπºÅÖ’—ïπ—•çÖëÑÅ—…ÖÃÅ…ïç°ÖÈºÅëîÅ’πÑÅçΩΩ≠•îÅëîÅèÕë•ùºÅŸïπç•ëÑΩ•π€Ö±•ëÑΩ…ïŸΩçÖëÑ∏ÅUπÑÅ•ëïπ—•ëÖêÅëîÅë•Õ¡ΩÕ•—•ŸºÅï·•Õ—ïπ—îÅÕîÅŸÖ±•ëÑÅï∏ÅâÖÕîÅëîÅëÖ—ΩÃÏÅÕ§ÅôÖ±—Ñ∞ÅœÕ±ºÅÕîÅç…ïÑÅï∏Å±ÑÅÖççßÕ∏ÅÅ•ëïπ—•—ÂÄ∏Å9ºÅçΩπçïëîÅµïµâ…ïœµÑÅπ§Å…Ω∞ÅëîÅΩ…ùÖπ•ÈÖëΩ»∏(¥ÅIïù…ïÕßÕ∏ÅÅ—ïÕ–µ±ÖàµëïŸ•çîµïŸïπ–µ•ëïπ—•—‰πµ©ÕÄËÅçΩΩ≠•îÅŸïπç•ëÑÅÕ•∏Åë•Õ¡ΩÕ•—•Ÿº∞Åπ’ïŸºÅçΩΩ≠•îÅÕïù’…º∞Å•πÕ¡ïççßÕ∏ÅëîÅèÕë•ùºÅëîÅ—Ω…πïºÅÕ•∏ÅçΩπÕ’µºÅ‰ÅëïπïùÖçßÕ∏ÅëîÅΩ—…ºÅë•Õ¡ΩÕ•—•Ÿº∏(¥ÅIï±ïÖÕîÅÕ•πç…Ωπ•ÈÖëºËÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄÅ‰ÅÅ…ï±ïÖÕîπ©ÕΩπÄÅ’ÕÖ∏ÅÄ»¿»ÿƒ¿¿‡µHƒ‰›ÄÄºÅÅHƒ‰›Ä∏(¥ÅÕ—ÖëºËÅ¡…’ïâÑÅë•…•ù•ëÑÅAMLÏÅÖ’ë•—ΩÀµÑ∞Å…ïŸ•ÕßÕ∏ÅëîÅπÖŸïùÖëΩ»∞Å¡…’ïâÑÅëï∞Å¡…Ω¡•ï—Ö…•ºÅï∏Å•A°ΩπîÅ‰ÅëïÕ¡±•ïù’ïÃÅÕ’©ï—ΩÃÅÑÅùÖ—ïÃ∏((ååÅHƒ‰‡É
‹ÅIïç’¡ï…ÖçßÕ∏ÅëîÅ•πù…ïÕºÅçΩ∏ÅÕïÕßÕ∏ÅëîÅç’ïπ—ÑÅŸïπç•ëÑÉ
‹Ä‡ÅëîÅΩç—’â…îÅëîÄ»¿»ÿ((¥ÅÅÖ¡§Ω¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄËÅÕ§Å±ÑÅ…ïÕΩ±’çßÕ∏ÅëîÅç’ïπ—ÑÅëïŸ’ï±ŸîÅÅ=U9Q}U9UQ!=I%iÄÅë’…Öπ—îÅÅ•ëïπ—•—ÂÄÅºÅ±ÑÅ•πÕ¡ïççßÕ∏ÅëîÅ’∏ÅèÕë•ùºÅëîÅ—Ω…πïº∞Åç…ïÑÅ’πÑÅ•ëïπ—•ëÖêÅëîÅë•Õ¡ΩÕ•—•ŸºÅÕïù’…Ñ∏ÅAÖ…ÑÅ’πÑÅçΩΩ≠•îÅÅùÕç}çΩëï}ÕïÕÕ•ΩπÄÅ•π€Ö±•ëÑΩŸïπç•ëÑΩ…ïŸΩçÖëÑ∞Å•πÕ¡ïççßÕ∏Å¡’ïëîÅ…ïç’¡ï…Ö»Å•ù’Ö∞Åç’ÖπëºÅπºÅï·•Õ—îÅçΩΩ≠•îÅëîÅë•Õ¡ΩÕ•—•Ÿº∏Å1ÖÃÅΩ¡ï…Öç•ΩπïÃÅëîÅ’πßÕ∏∞ÅÖëµ•π•Õ—…ÖçßÕ∏Å‰ÅÖ’—Ω…•ÈÖçßÕ∏ÅçΩπÕï…ŸÖ∏ÅÕ‘ÅŸÖ±•ëÖçßÕ∏∏(¥ÅÅ—ïÕ–µ±ÖàµëïŸ•çîµïŸïπ–µ•ëïπ—•—‰πµ©ÕÄËÅ…ï¡…Ωë’çîÅÅ=U9Q}U9UQ!=I%iÄÅëîÅç’ïπ—ÑÅÖ∞Å•πÕ¡ïçç•ΩπÖ»ÏÅçΩπô•…µÑÅèÕë•ùºÅÕ•∏ÅçΩπÕ’µ•»Å‰ÅçΩπ—…Ω∞ÅëîÅÖççïÕºÅÑÅ—ï…çï…ΩÃ∏(¥ÅIï±ïÖÕîÅÕ•πç…Ωπ•ÈÖëºËÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄÅ‰ÅÅ…ï±ïÖÕîπ©ÕΩπÄÅëïç±Ö…Ö∏ÅÄ»¿»ÿƒ¿¿‡µHƒ‰·ÄÏÅï∞ÅçÖç£§Åëï∞ÅMï…Ÿ•çîÅ]Ω…≠ï»ÅïÃÅï·ç±’Õ•ŸºÅëîÅHƒ‰‡∏(¥ÅÕ—ÖëºËÅ…ïù…ïÕßÕ∏Åë•…•ù•ëÑÅAMLÏÅùÖ—ïÃÅÖ’—Ω∑Ö—•çΩÃÅ‰Å¡’â±•çÖçßÕ∏Å1Å¡ïπë•ïπ—ïÃÏÅA…Ωë’ççßÕ∏Å¡ï…µÖπïçîÅï∏ÅHƒ‰‹Å°ÖÕ—ÑÅ…ïŸ•ÕßÕ∏ÅõµÕ•çÑÅHƒ‰‡∏((ååÅHƒ‰‰É
‹Å•πù…ïÕºÅç…’ÈÖëºÅA…Ωë’ççßÕ∏Ω1ÅçΩπÕ’µîÅèÕë•ùºÅçΩ∏Å•ëïπ—•ëÖêÅÕïù’…ÑÉ
‹Ä‡ÅΩç—’â…îÄ»¿»ÿ((¥Åïôïç—ºÅΩâÕï…ŸÖëºËÅï∏ÅA…Ωë’ççßÕ∏ÅHƒ‰‡Åï∞ÅèÕë•ùºÅÄŸ’ƒ‹…ÄÅÕïù◊µÑÅµΩÕ—…ÖπëºÅÅ9<ÅMÅAU<ÅAIAIHÅ0ÅY9Q<É
‹ÅI%9Q9QÄ∏Å1ÑÅA$ÅëîÅA…Ωë’ççßÕ∏Å…ïÕ¡ΩπëßÃÅÅ1%Y})=%9}=}%9Y1%ÄÏÅï∞ÅèÕë•ùºÅµΩÕ—…ÖëºÅï∏Å±ÑÅ—Ö…©ï—ÑÅ¡ï…—ïπïèµÑÅÑÅ1∏(¥ÅÖ’ÕÑÅ…áµËËÅï∞Åç±•ïπ—îÅœ¥Å…ï•π—ïπ—ÖâÑÅï∞ÅèÕë•ùºÅï∏Åï∞ÅΩ—…ºÅÖµâ•ïπ—î∞Å¡ï…ºÅ±ÑÅ±±ÖµÖëÑÅô•πÖ∞ÅÅ©Ω•∏µçΩëïÄÅ¡ΩìµÑÅ±±ïùÖ»ÅÖ∞ÅÖµâ•ïπ—îÅë’ó≈ºÅÕ•∏ÅçΩΩ≠•îÅÕÖµîµÕ•—îÅ¡ï…Õ•Õ—•ëÑ∏ÅHƒ‰‡Åç’âÀµÑÅ±ÑÅ•πÕ¡ïççßÕ∏ÅÕïù’…Ñ∞Å¡ï…ºÅπºÅï∞ÅçΩπÕ’µºΩ’πßÕ∏Åëï∞ÅèÕë•ùºÅï∏ÅïÕîÅµ•ÕµºÅçΩπ—ï·—º∏(¥ÅΩ……ïççßÕ∏ËÅÅ…ïÕΩ±ŸïŸïπ—%ëïπ—•—‰†•ÄÅ¡ï…µ•—îÅç…ïÖ»Å’πÑÅ•ëïπ—•ëÖêÅëîÅë•Õ¡ΩÕ•—•ŸºÅÕïù’…ÑÅ—Öµâß•∏Åï∏ÅÅ©Ω•∏µçΩëïÄÅç’ÖπëºÅπºÅ°Ö‰ÅÕïÕßÕ∏ÅëîÅç’ïπ—ÑÅ€Ö±•ëÑ∏Å1ÑÅµïµâ…ïœµÑÅÕ•ù’îÅëï¡ïπë•ïπëºÅëîÅ¡ΩÕïï»Åï∞ÅèÕë•ùº∞ÅëîÅ±ÑÅçΩπô•ù’…ÖçßÕ∏ÅçÖµ¡ºΩµΩëÖ±•ëÖêÅ‰ÅëîÅçÖ¡Öç•ëÖêÏÅœÕ±ºÅÕîÅçΩπÕ’µîÅï∞ÅèÕë•ùºÅëïπ—…ºÅëîÅ±ÑÅ’πßÕ∏ÅΩô•ç•Ö∞∏(¥ÅΩπ—…Ω∞Å¡ï…µÖπïπ—îËÅÅ—ïÕ–µ±ÖàµëïŸ•çîµïŸïπ–µ•ëïπ—•—‰πµ©ÕÄÅÖ°Ω…ÑÅ…ï¡…Ωë’çîÅ•πÕ¡ïççßÕ∏ÅÕ•∏ÅçΩπÕ’µ•»Å‰Å’πßÕ∏ÅÕ•∏ÅçΩΩ≠•îÅ¡…ïŸ•ÑÏÅçΩπô•…µÑÅçΩΩ≠•îÅëîÅë•Õ¡ΩÕ•—•ŸºÅπ’ïŸÑ∞ÅçΩπÕ’µºÅëîÅèÕë•ùºÅëîÅ’∏ÅÕΩ±ºÅ’ÕºÅ‰Å…ïç°ÖÈºÅÑÅ—ï…çï…ΩÃ∏ÅÅ—ïÕ–µ»ƒ‰ƒµç…ΩÕÃµïπŸ•…Ωπµïπ–µ—Ω’…πÖµïπ–µïπ—…‰πµ©ÕÄÅçΩπÕï…ŸÑÅï∞Å…ï•π—ïπ—ºÅA…Ωë’ççßÕªäI1∏(¥ÅÕ—ÖëºËÅ…ïù…ïÕßÕ∏Åë•…•ù•ëÑÅAMLÅ±ΩçÖ∞ÏÅëïÕ¡±•ïù’îÅ1Å‰ÅA…Ωë’ççßÕ∏ÅHƒ‰‰Å¡ïπë•ïπ—î∏((ååÅH»ƒÿÉ
‹Å±•µ¡•ïÈÑÅŸ•Õ’Ö∞ÅëîÅ—Ö…©ï—ÖÃÅMçΩ…ïÃÅëîÅ—Ω…πïºÉ
‹Ä‡ÅΩç—’â…îÄ»¿»ÿ((¥ÅÅ±•Ÿîµ°’àπ°—µ±ÄËÅÕîÅï±•µ•πÑÅï∞ÅÅÕïç—•Ω∏πù±ΩâÖ∞µ±•Ÿîµë•…ïç—Ω…ÂÄÅ≈’îÅµΩÕ—…ÖâÑÅÅIUA=LÅdÅI=9LÅ1=	1LÅQ%Y=MÄ∞ÅÅ1%MQÅ1=	0Å=5A1QÉ
‹Å1	=IQ=I%<Ä¨ÅAI=U'M9Ä∞ÅπΩµâ…ïÃÅëîÅù…’¡ΩÃÅ‰Åôïç°ÑΩ°Ω…ÑÅëîÅÖç—’Ö±•ÈÖçßÕ∏Åïπç•µÑÅëîÅ±ÖÃÅ—Ö…©ï—ÖÃÅëîÅMçΩ…ïÃ∏(¥ÅÅ±•Ÿîµ°’àπ©ÕÄËÅÕîÅ…ï—•…ÑÅï∞ÅïÕ—ÖëºÅÅÖç—•Ÿï±ΩâÖ±•…ïç—Ω…ÂÄ∞Åï∞Å…ïπëï»Åëï∞Å¡Öπï∞Åï±•µ•πÖëºÅ‰Åï∞Å•π—ï…ŸÖ±ºÅ≈’îÅçΩπÕ’±—ÖâÑÅÅ±•Õ—}Öç—•Ÿï}—Ω’…πÖµïπ—ÕÄÅœÕ±ºÅ¡Ö…ÑÅ±±ïπÖ»ÅïÕîÅâ±Ω≈’îÅŸ•Õ’Ö∞∏Å1ÑÅ±ïç—’…ÑÅô’πç•ΩπÖ∞ÅëîÅ—Ω…πïΩÃÅ‰ÅÕçΩ…ïÃÅ¡ï…µÖπïçîÅï∏ÅÅ…ïô…ïÕ°Iïù•Õ—ï…ïë•…ïç—Ω…ÂÄ∞ÅÅÕï±ïç—MÖŸïëQΩ’…πÖµïπ—Ä∞ÅÅ…ïô…ïÕ°ÄÅ‰Å±ÖÃÅŸ•Õ—ÖÃÅïπï…Ö∞ΩÖ—ïùΩÀµÑΩ	’ÕçÖ»ΩÖŸΩ…•—ΩÃ∏(¥ÅÅ—ïÕ–µ»»ƒÿµ±•Ÿîµ°’àµπºµù±ΩâÖ∞µë•…ïç—Ω…‰µ¡Öπï∞πµ©ÕÄËÅ…ïù…ïÕßÕ∏Åë•…•ù•ëÑÅ≈’îÅï·•ùîÅÖ’Õïπç•ÑÅëîÅ%ÃΩ—ï·—ΩÃÅëï∞Å¡Öπï∞Å…ï—•…ÖëºÅ‰Å¡…ïÕïπç•ÑÅëîÅ±ΩÃÅç’Ö—…ºÅÖççïÕΩÃÅëîÅMçΩ…ïÃ∏(¥ÅÅ…ï±ïÖÕîπ©ÕΩπÄ∞ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄ∞ÅÅ•πëï‡µù…’¡Ö∞π°—µ±ÄËÅ•ëïπ—•ëÖêÅŸ•Õ•â±îÅ‰ÅçÖç£§ÅÕ•πç…Ωπ•ÈÖëÖÃÅÑÅÄ»¿»ÿƒ¿¿‡µH»ƒŸÄÄºÅÅH»ƒŸÄ∏((ååÅH»ÃƒÉ
‹Å±ïù•â•±•ëÖêÅ‰Å±•µ¡•ïÈÑÅëîÅ1•ŸîÅ•πŸ•—ÖëºÄ–·†É
‹Ä‡ÅΩç—’â…îÄ»¿»ÿ()Å…ç°•ŸºÅÅÖµâ•ºÅ)¥¥µ¥¥µ)ÅÅ±•Ÿîπ°—µ±ÄÅÅ’µïπ—ÑÅªÈµï…ΩÃÅëîÅ±ÑÅ—Öâ±ÑÅÑÄƒÕ¡‡∞ÅÖç’µ’±ÖëΩÃÅÑÄƒ’¡‡∞Åï—•≈’ï—ÖÃÅëîÅÖç’µ’±ÖëΩÃÅï∏ÅŸï…ëî∞Å¡ΩπîÅ9Q<ÅëîÅô•±ÑÅ‰ÅÖç’µ’±ÖëºÅï∏ÅŸï…ëî∞ÅÖù…ïùÑÅMLÅÅù…ΩÕÃµµÖ…≠ÄÅ•ì•π—•çºÅÖ∞ÅÕçΩ…ïçÖ…êÅ‰ÅçÖç°ïÑÅÅ±•ŸîµŸ•ï‹π©Ã˝ÿÙ»¿»ÿƒ¿¿‡µH»Ã≈Ä∏Å)ÅÅïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏π°—µ±ÄÅÅIï¡±•çÑÅ±ÑÅµ•ÕµÑÅ±ïù•â•±•ëÖêÅ‰Å±ÑÅµ•ÕµÑÅπΩµïπç±Ö—’…ÑÅëîÅùΩ±òÅëïπ—…ºÅëï∞ÅëßÖ±ΩùºÅëîÅ=…ùÖπ•ÈÖëΩ»Å¡Ö…ÑÅ±ÑÅ—Ö…©ï—ÑÅ1•ŸîÅëîÅ•πŸ•—ÖëΩÃÄ–·†∏Å)ÅÅ±•ŸîµŸ•ï‹π©ÕÄÅÅ±•µ•πÑÅï∞Å—ï·—ºÅâ±ÖπçºÅÅ!@É
‹ÅµÖ…çÖÕÄÅâÖ©ºÅï∞ÅπΩµâ…îÅëï∞Å©’ùÖëΩ»∞Å¡•π—ÑÅ9Q<Åï∏ÅŸï…ëîÅ‰Å…ïπëï…•ÈÑÅI=MLÅçΩ∏ÅÅù…ΩÕÃµµÖ…¨Åâ•…ë•îΩïÖù±îΩâΩùï‰ΩëΩ’â±îµâΩùïÂÄÅ•ù’Ö∞Å≈’îÅ±ÑÅMçΩ…îÅÖ…êÅÕ•∏ÅÖ±—ï…Ö»Å…ΩÕÃΩ!@Ω9ï—º∏Å)ÅÅïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏µ’§π©ÕÄÅÅ∞ÅëßÖ±ΩùºÅ1•ŸîÅëîÅ=…ùÖπ•ÈÖëΩ»Åï±•µ•πÑÅÅ!@É
‹ÅµÖ…çÖÕÄ∞Å¡•π—ÑÅ9Q<Åï∏ÅŸï…ëî∞ÅÖ¡±•çÑÅÅù…ΩÕÃµµÖ…≠ÄÅ‰Å±ÑÅ—Ö…©ï—ÑÅçΩµ¡Öç—ÑÅëîÅçÖëÑÅù…’¡ºÅ•πŸ•—ÖëºÅµ’ïÕ—…ÑÅœÕ±ºÅπΩµâ…îÅ‰ÅÅ	I%HÅQI)QÅ1%YÄ∏Å)ÅÅÖççïÕÃπ°—µ±ÄÅÅÅ=5AIQ%HÅA@Ä–‡Å!=IMÄÅùïπï…ÑÅï∞Åïπ±ÖçîÅ‰ÅÖâ…îÅ]°Ö—Õ¡¿Å¡Ω»ÅÅ›ÑπµïÄÏÅ—ΩçÖ»Åï∞Å…ïç’Öë…ºÅëï∞Åïπ±ÖçîÅŸ’ï±ŸîÅÑÅÖâ…•»Å]°Ö—Õ¡¿ÅÕ•∏ÅçΩ¡•Ö»Ω¡ïùÖ»∏Å)ÅÅ—ïÕ–µ»»Ãƒµ±•ŸîµçÖ…êµ…ïÖëÖâ•±•—‰πµ©ÕÄÅÅIïù…ïÕßÕ∏Å¡Ö…ÑÅ—Öµá≈ºΩçΩ±Ω»ÅëîÅ—ï·—ΩÃ∞ÅÖ’Õïπç•ÑÅëîÅ!@ΩµÖ…çÖÃ∞Å—Ö…©ï—ÑÅçΩµ¡Öç—ÑÅÕ•∏Åµï—ÖëÖ—ΩÃÅ‰ÅπΩµïπç±Ö—’…ÑÅëîÅùΩ±òÅëîÅMçΩ…îÅÖ…ê∏Å)ÅÅ…ï±ïÖÕîπ©ÕΩπÄ∞ÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄ∞ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄÅÅ%ëïπ—•ëÖêÅH»Ãƒ∞ÅçÖç£§Å…ïπΩŸÖëÑÅîÅ•πç±’ÕßÕ∏Åëï∞Åπ’ïŸºÅ—ïÕ–Åï∏Åâ’•±êÅçΩµ¡±ï—º∏Å((ååÅH»Ã»É
‹Åïπ±ÖçîÄ–·†Åç±•çÖâ±îÅï∏Å]°Ö—Õ¡¿É
‹Ä‡ÅΩç—’â…îÄ»¿»ÿ()Å…ç°•ŸºÅÅÖµâ•ºÅ)¥¥µ¥¥µ)ÅÅÖççïÕÃπ°—µ±ÄÅÅ∞ÅµïπÕÖ©îÅëîÅÅ=5AIQ%HÅA@Ä–‡Å!=IMÄÅÂÑÅπºÅë•çîÅAÏÅÕîÅÖ…µÑÅï∏ÅŸÖ…•ÖÃÅ≥µπïÖÃÅçΩ∏ÅÅ©Ω•∏†âq∏à•ÄÅ‰Åëï©ÑÅ±ÑÅUI0ÅÕΩ±ÑÅ¡Ö…ÑÅ≈’îÅ]°Ö—Õ¡¿Å±ÑÅµ’ïÕ—…îÅçΩµºÅïπ±ÖçîÅ—ΩçÖâ±î∏Å)ÅÅ±•ŸîµŸ•ï‹π©ÕÄ∞ÅÅïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏µ’§π©ÕÄÅÅ∏ÅÅIMU1Q=LÅU5U1=MÄ∞Åï∞Åç’Öë…ºÅ…ï±Ö—•ŸºÅë•çîÅœÕ±ºÅÄ¨ºµÄÏÅÄ¨º¥ÅA=HÅ!=e=ÄÅÕîÅçΩπÕï…ŸÑÅœÕ±ºÅï∏Å±ÑÅô•±ÑÅëîÅ°ΩÂΩÃ∏Å)ÅÅ±•Ÿîπ°—µ±ÄÅÅM’âîÅï∞ÅçÖç°îÅëîÅÅ±•ŸîµŸ•ï‹π©ÕÄÅÑÅÄ»¿»ÿƒ¿¿‡µH»Ã…ÄÅ¡Ö…ÑÅ¡’â±•çÖ»Å±ÑÅ—Ö…©ï—ÑÅ1•ŸîÅÖç—’Ö±•ÈÖëÑ∏Å)ÅÅ—ïÕ–µ»»Ã¿µΩ›πï»µÖççïÕÃ¥–·†µΩπ±‰πµ©ÕÄÅÅ	±Ω≈’ïÑÅ≈’îÅŸ’ï±ŸÑÅï∞Å—ï·—ºÅAÅºÅï∞ÅÅqπÄÅ±•—ï…Ö∞Å¡ïùÖëºÅÖ∞Åïπ±Öçî∏Å)ÅÅ…ï±ïÖÕîπ©ÕΩπÄ∞ÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄÅÅ%ëïπ—•ëÖêÅH»Ã»Å‰ÅçÖç£§ÅA]Åπ’ïŸÑÅ¡Ö…ÑÅ¡’â±•çÖ»Å±ÑÅçΩ……ïççßÕ∏∏Å(