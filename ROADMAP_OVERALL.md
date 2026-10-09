Y™Áäx-ÆÈ‹j◊ù¢Îi∫⁄+äßj[hëÈ‹¢ÈÌ€]∫Ô§Ëµ©h∫⁄n∂XßzÕ|## R230 ¬∑ Access propietario s√≥lo comparte app 48 horas ¬∑ 8 de octubre de 2026

- `access.html`: el panel propietario queda reducido a una sola opci√≥n visible: `COMPARTIR APP 48 HORAS`; se retiran c√≥digo para jugador, actividad an√≥nima y textos de consulta.
- `test-r230-owner-access-48h-only.mjs`: nuevo candado para impedir que vuelvan opciones ajenas a la invitaci√≥n 48h.
- `scripts/build-manual-lab.mjs`, `release.json`, `service-worker.js` e `index-grupal.html`: incorporan R230 al banco obligatorio, badge visible, meta release y cach√© PWA.

## R229 ¬∑ Organizador abre tarjeta Live de grupos invitados 48h ¬∑ 8 de octubre de 2026

- `event-administration-ui.js`: las tarjetas compactas de `GRUPOS INVITADOS 48H` ya no usan el nombre del grupo como identificador; muestran como t√≠tulo el primer jugador registrado en la Score Card.
- `event-administration-ui.js`: al tocar `ABRIR TARJETA LIVE`, Organizador abre una tarjeta digital completa tipo Live con 18 hoyos, nombres verdes en may√∫sculas, `RESULTADOS ACUMULADOS` y `+/- POR HOYO`.
- `event-administration.html`: el di√°logo de Organizador se ampl√≠a para tarjeta Live m√≥vil, con tabla horizontal y sin el resumen de bullets como vista principal.
- `test-r229-organizer-guest48h-live-card.mjs`: nuevo candado para vista Live desde Organizador y t√≠tulo por primer jugador.
- `scripts/build-manual-lab.mjs`, `release.json`, `service-worker.js` e `index-grupal.html`: incorporan R229 al banco obligatorio, badge visible, meta release y cach√© PWA.

## R228 ¬∑ Tarjeta Live 48h sin traslape y con resultados acumulados ¬∑ 8 de octubre de 2026

- `live-view.js`: la tarjeta Live compartida por el invitado 48h deja de mostrar el t√≠tulo del grupo, mantiene campo/fecha/modalidad, cambia `+ / ‚àí` a `+/- POR HOYO` y agrega el separador `RESULTADOS ACUMULADOS` entre la tabla de 18 hoyos y los totales.
- `live.html`: corrige el montaje superior de la vista Live reservando espacio seguro para cerrar/men√∫; los nombres de jugadores quedan en may√∫sculas, verdes y sin subrayado.
- `test-r228-live-48h-shared-card-layout.mjs`: nuevo candado para tarjeta Live 48h compartida, nombres, t√≠tulo eliminado, `RESULTADOS ACUMULADOS`, `+/- POR HOYO` y traslape superior.
- `scripts/build-manual-lab.mjs`, `release.json`, `service-worker.js` e `index-grupal.html`: incorporan R228 al banco obligatorio, badge visible, meta release y cach√© PWA.

## R227 ¬∑ Grupos invitados 48h visibles en Organizador ¬∑ 8 de octubre de 2026

- `api/_lib/app-access.js`: el feedback de invitados 48h ahora persiste filas independientes en `app_access_guest_groups`, una por dispositivo/grupo, sin perder el `current_snapshot` legacy del enlace.
- `index-grupal.html`: cada Score Card invitada genera un `guestGroupId` estable y sigue usando la tarjeta normal para registrar hasta seis jugadores y sus scores.
- `api/event-administration.js`: la acci√≥n `list` del Organizador devuelve `guestGroups` para propietario, mezclando LAB/Producci√≥n cuando el ambiente par responde.
- `event-administration-ui.js`: Organizador muestra la secci√≥n `GRUPOS INVITADOS 48H` con una tarjeta por grupo, jugadores, hoyos, gross/neto y vencimiento del enlace; el invitado 48h conserva Organizador bloqueado.
- `test-r227-guest48h-organizer-groups.mjs` y `test-r222-guest-48h-shared-link.mjs`: regresi√≥n permanente para m√∫ltiples grupos por enlace compartido y visualizaci√≥n en Organizador.
- `scripts/build-manual-lab.mjs`, `release.json`, `service-worker.js` e `index-grupal.html`: incorporan R227 al banco obligatorio, badge visible, meta release y cach√© PWA.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`: registran RC-141, mapa de archivos R227 y sello de inventario de la publicaci√≥n.

## R226 ¬∑ WhatsApp con c√≥digo precargado y bloqueo robusto invitado 48h ¬∑ 8 de octubre de 2026

- `whatsapp-invitations.js`: los enlaces fallback de invitaci√≥n ahora incluyen `codigo=<C√ìDIGO>` en la URL de Registro; el texto indica que el c√≥digo ya va cargado y no depende de copiar/pegar desde WhatsApp.
- `personal-events.js`: al abrir `index-grupal.html?inicio=1&codigo=...`, el c√≥digo se lee, se limpia de la barra del navegador, se precarga en el modal y se inspecciona autom√°ticamente para preparar el Registro del torneo.
- `live-control.js` y `live-share.js`: cuando `COMPARTIR LIVE` sale desde la Score Card conectada a un torneo, comparte el stream de esa ronda/grupo, no el acceso viewer al torneo completo.
- `api/_lib/live-share.js`: el canje Live de un invitado queda limitado al `issuer_stream_id`; no puede listar otros grupos ni otros torneos en curso.
- `test-r226-whatsapp-entry-code-prefill.mjs` y `test-lab-code-entry.mjs`: regresi√≥n permanente para enlace con c√≥digo precargado, autoinspecci√≥n, guardas de panel invitado y Live limitado a la Score Card compartida.
- `scripts/build-manual-lab.mjs`, `release.json`, `service-worker.js` e `index-grupal.html`: incorporan R226 al banco obligatorio, badge visible, meta release y cach√© PWA.
- `test-lab-private-round-share-flow.mjs`: el gate de despliegue queda alineado con el texto R226 de WhatsApp y la URL `inicio=1&codigo=...`, para no volver al flujo de copiar/pegar manual.

## R225 ¬∑ Invitado 48h sin Organizador y con Live permitido ¬∑ 8 de octubre de 2026

- `guest-access.js`: el modo invitado 48h conserva `COMPARTIR LIVE` y bloquea s√≥lo controles privados/propietarios.
- `shortcuts-ui.js`: el men√∫ del invitado 48h no muestra `ORGANIZADOR` y bloquea accesos directos a administraci√≥n, ID de torneo o creaci√≥n de torneo.
- `live-control.js`: el invitado puede compartir Live de su ronda, pero no ve herramientas de organizaci√≥n de torneo dentro del panel Live.
- `event-administration.html`, `event-administration-ui.js` y `api/event-administration.js`: la ruta directa y la API de administraci√≥n quedan bloqueadas para cookie invitada 48h; `remote-share` queda permitido para no romper `Compartir Live`.
- `test-r225-guest-48h-no-organizer-live-allowed.mjs` y `test-r18-owner-guest-24h-access.mjs`: regresi√≥n permanente para Live permitido y Organizador bloqueado.
- `release.json`, `service-worker.js` e `index-grupal.html`: publican identidad `20261008-R225`.

## R224 ¬∑ Score Card p√∫blica sin botones propietarios de prueba 48h ¬∑ 8 de octubre de 2026

- `index-grupal.html`: retira de la barra p√∫blica los botones `PRUEBA ¬∑ 48 H` y `VER PRUEBA 48 H`, elimina la consulta propietaria `app-access?action=status` y deja la Score Card sin controles de laboratorio en Producci√≥n.
- `index-grupal.html`: al regresar a Registro desde una ronda activa, muestra `AGREGAR JUGADOR` si hay menos de seis; el nuevo jugador se registra en la misma hoja y entra desde el siguiente hoyo sin borrar scores existentes.
- `access.html`: conserva el panel privado autenticado para crear enlaces temporales de 48 horas y revisar actividad an√≥nima; no vuelve a ser puerta de entrada de Registro.
- `test-r224-scorecard-no-48h-owner-controls.mjs`, `test-r224-registration-add-active-player.mjs`, `test-v263-compact-players-back-button.mjs`, `test-owner-invitation-ui.mjs`, `test-r18-owner-guest-24h-access.mjs`, `test-lab-account-gate.mjs`, `test-lab-r60-physical-matrix.mjs`, `test-manual-startup-sharing.mjs` y `test-v311-live-support-link.mjs`: bloquean que los controles propietarios vuelvan a aparecer en el scorecard y que Registro vuelva a impedir altas posteriores hasta seis.
- `scripts/build-manual-lab.mjs`: incorpora la regresi√≥n R224 al banco obligatorio.
- `release.json`, `service-worker.js` e `index-grupal.html`: publican identidad `20261008-R224`.

## R223 ¬∑ Handicap negativo con tecla visible para Campeonato y A ¬∑ 8 de octubre de 2026

- `index-grupal.html`: el campo HDCP de Registro cambia a captura textual con patr√≥n `-?[0-9]*` y agrega una tecla visible `-` por jugador para no depender del teclado iPhone.
- `index-grupal.html`: el motor conserva el c√°lculo inverso de handicap negativo; un jugador con `-2` entrega golpes al campo y su neto aumenta en los hoyos correspondientes.
- `index-grupal.html`: la fila HDCP marca visualmente los golpes entregados con c√≠rculo amarillo punteado y la consulta de voz responde `entrega` cuando el jugador tiene handicap bajo cero.
- `test-r223-negative-handicap-campeonato-a.mjs`: valida Campeonato/A, tecla `-`, captura `-2`, distribuci√≥n de golpes negativos y neto inverso.
- `scripts/build-manual-lab.mjs`: incorpora la regresi√≥n R223 al banco obligatorio.
- `release.json`, `service-worker.js` e `index-grupal.html`: publican identidad `20261008-R223`.

## R222 ¬∑ Prueba de fuego 48h con cinco grupos visibles para organizador ¬∑ 8 de octubre de 2026

- `api/_lib/app-access.js` y `api/app-access.js`: el enlace temporal ahora es compartido por 48 horas, admite hasta 5 aperturas controladas, conserva sesiones ya redimidas y se elimina al vencer.
- `guest-access.js`: la sesi√≥n invitada 48h queda aislada y sin botones de compartir, Live p√∫blico, env√≠o de tarjetas ni herramientas propietarias.
- `index-grupal.html`: el propietario tiene `PRUEBA ¬∑ 48 H` para generar un solo enlace y `VER PRUEBA 48 H` para ver los grupos invitados por separado con jugadores, hoyos y totales de score card.
- `test-r222-guest-48h-shared-link.mjs`: valida enlace √∫nico 48h, cupo 5, purga por vencimiento, telemetr√≠a sin consumir cupos y tarjetas de grupo visibles para el propietario.
- `test-lab-r60-physical-matrix.mjs`: actualiza el candado f√≠sico para reconocer `PRUEBA ¬∑ 48 H` como la invitaci√≥n opcional vigente sin bloquear entrada libre.
- `test-owner-invitation-ui.mjs`: actualiza la regresi√≥n del bot√≥n propietario a 48h y cubre que el nuevo bot√≥n `VER PRUEBA 48 H` no rompa el flujo de compartir.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`: resella el inventario R222 con el ajuste del gate f√≠sico.
- `release.json`, `service-worker.js` e `index-grupal.html`: publican identidad `20261008-R222`.

## R221 ¬∑ Compartir Live de directorio usa enlace p√∫blico y gate de paridad ¬∑ 8 de octubre de 2026

- Regresi√≥n f√≠sica reportada en Producci√≥n: al pulsar `COMPARTIR LIVE` sobre un evento LAB de directorio, aparec√≠a `NO SE PUDO VALIDAR EL ACCESO LIVE`, mientras LAB abr√≠a el modal de c√≥digo.
- `live-hub.js`: si Scores viene de `directory_lab_*` o `directory_production_*`, el bot√≥n ya no intenta generar un c√≥digo privado con cookie del otro ambiente; comparte el enlace p√∫blico Live del dominio due√±o del evento.
- `test-lab-code-entry.mjs`: bloquea que el flujo de Scores de directorio vuelva a usar validaci√≥n privada para compartir.
- `CONTROL_PROYECTO_SCIRE/ARQUITECTURA_PARIDAD_LAB_PRODUCCION.json` y `test-r221-lab-production-architecture-parity.mjs`: agregan gate 360 de paridad LAB/Producci√≥n para release, PWA/cache, entrada p√∫blica, acceso personal, directorios, Live, base aislada, permisos y documentaci√≥n.
- `test-v353-live-hub.mjs`: mantiene prohibido exponer el nombre interno en LIVE, pero permite el dominio t√©cnico can√≥nico `epg-caddy.vercel.app` necesario para paridad de enlaces p√∫blicos.
- `scripts/build-manual-lab.mjs`, `release.json`, `service-worker.js` e `index-grupal.html`: integran el gate y publican identidad `20261008-R221`.

## R220 ¬∑ Compartir Live usa relay remoto y evita SIN CONEXI√ìN ¬∑ 8 de octubre de 2026

- Regresi√≥n f√≠sica reportada en iPhone: al pulsar `COMPARTIR LIVE` en Scores General, aparec√≠a `SIN CONEXI√ìN ¬∑ CONSERVANDO LOS √öLTIMOS SCORES`.
- `live-share.js`: cuando el torneo pertenece a otro ambiente (`source` distinto al dominio actual), ya no llama directo cross-origin a `/api/personal-events`; usa el relay same-origin `/api/event-administration` con `action:'remote-share'`.
- `test-lab-code-entry.mjs`: agrega regresi√≥n para producci√≥n compartiendo un evento LAB y exige payload `remote-share` sin caer en `NETWORK_ERROR`.
- `release.json`, `service-worker.js` e `index-grupal.html`: identidad visible/cache en `20261008-R220`.

## R219 ¬∑ Compartir Live acciona desde directorio LAB ¬∑ 8 de octubre de 2026

- Regresi√≥n f√≠sica reportada en iPhone: `COMPARTIR LIVE` aparece en Scores General, pero al tocarlo no abre el modal ni genera c√≥digo cuando el torneo viene del directorio LAB.
- `live-hub.js`: agrega descriptor para `directory_lab_<eventId>` / `directory_production_<eventId>` y pasa a `GSCOneUseLive.share()` el `eventId`, `eventKind` y `source` reales.
- `live-share.js`: acepta eventos source-aware y llama `GSCPersonalEvents.request('share-code', {eventId,eventKind,source})` sin exigir `publisherSecret` legacy.
- `test-lab-code-entry.mjs`: reproduce `directory_lab` sin publisher legacy y exige enlace `/code-entry.html?visitor=1#code=...`.
- `release.json`, `service-worker.js` e `index-grupal.html`: identidad visible/cache en `20261008-R219`.

## R218 ¬∑ Compartir Live vuelve a funcionar en Scores personales ¬∑ 8 de octubre de 2026

- Regresi√≥n reportada en iPhone: tras R217, el bot√≥n `COMPARTIR LIVE` visible en Scores General no accionaba.
- `live-share.js`: la ruta personal de torneo usa `GSCPersonalEvents.request('share-code')` sin exigir `publisherSecret`; la exigencia de publisher queda s√≥lo para enlaces LIVE legacy.
- `live-hub.js`: el bot√≥n de Scores se habilita cuando el evento personal existe, no √∫nicamente cuando hay stream publisher local.
- `test-lab-code-entry.mjs`: agrega regresi√≥n para compartir desde Scores personales sin publisher legacy y bloquea que el bot√≥n dependa s√≥lo del secreto LIVE.
- `release.json`, `service-worker.js` e `index-grupal.html`: identidad visible/cache en `20261008-R218`.

## R217 ¬∑ WhatsApp de codigo de un solo uso abre con codigo precargado ¬∑ 8 de octubre de 2026

- Problema fisico: el mensaje de WhatsApp para invitado mostraba un codigo largo de un solo uso separado del enlace; en iPhone/WhatsApp no era practico seleccionarlo sin copiar todo el mensaje.
- `live-share.js`: el enlace compartido ahora incluye `#code=...` y el texto indica tocar el enlace y luego ENTRAR; el codigo queda como respaldo, no como accion principal.
- `code-entry.js`: al abrir el enlace, precarga el codigo en el campo, limpia el fragmento visible y no redime hasta que el invitado toque ENTRAR.
- `test-lab-code-entry.mjs`: bloquea la regresion, exige enlace con codigo precargado y confirma que abrir el enlace no consume el codigo.
- `release.json`, `service-worker.js` e `index-grupal.html`: identidad visible/cache en `20261008-R217`.

## R216 ¬∑ Scores de torneo sin panel global de grupos/rondas activos ¬∑ 8 de octubre de 2026

- Pedido visual del propietario: en Scores General, Scores por Categor√≠a y Buscar Jugador se elimina el bloque blanco de grupos/rondas activos, incluyendo lista global, nombres de grupos y hora de actualizaci√≥n.
- `live-hub.html` retira el panel `global-live-directory`; `live-hub.js` deja de refrescar esa lista desde la pantalla de Scores.
- Se conservan botones de Scores, b√∫squeda, filtros, favoritos y tablas; `test-r216-live-hub-no-global-directory-panel.mjs` bloquea la reaparici√≥n del panel.
- Cierre de despliegue: se repara el blob remoto de `index-grupal.html` y este commit vuelve a incluir ROADMAPS e inventario en la misma modificaci√≥n para cumplir los gates de Vercel.

## R215 ¬∑ No purgar torneos locales por lista remota vacia ¬∑ 8 de octubre de 2026

- Sintoma fisico: el telefono quedo sin torneos visibles despues de respuestas de Produccion/LAB con directorio remoto vacio o sin el evento esperado.
- `personal-events.js`: `sync()` ya no convierte `removedEvents` de la accion `list` en borrado fisico local; una ausencia remota transitoria no elimina ronda activa, archivo local, hub ni codigos guardados.
- Seguridad conservada: `purgeDeletedEvents()` sigue disponible para eliminaciones explicitas y la limpieza de streams se conserva separada.
- Regresion: `test-r215-personal-list-no-local-purge.mjs` reproduce lista vacia + torneo local existente y exige que no haya evento `gsc-events-removed`; `test-event-total-purge.mjs` mantiene la purga explicita.
- Release: `release.json`, `index-grupal.html`, `service-worker.js` y cache suben a `20261008-R215` para forzar descarga del cliente corregido.
- Archivos: `personal-events.js`, `test-r215-personal-list-no-local-purge.mjs`, `scripts/build-manual-lab.mjs`, `release.json`, `index-grupal.html`, `service-worker.js`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` e `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.

## R214 ¬∑ Reparar gate de entrega tras eliminar 403 textual ¬∑ 8 de octubre de 2026

- `test-update-delivery-control.mjs` y `test-personal-storage-access.mjs`: el recorte de prueba de `manualAppNavigation` ya no depende de `authorizedPersonalNavigation`, y la navegacion personal sin membresia inmediata carga shell en vez de 403 textual.
- `service-worker.js`, `index-grupal.html` y `release.json`: release visible y cache suben a `20261008-R214` para forzar instalacion nueva con la correccion R213 completa.
- Alcance: no cambia reglas de torneo ni APIs privadas; desbloquea el build para publicar el parche que evita la pantalla negra `Acceso personal no autorizado`.
- Cierre de publicacion: `release.json` queda en `R214-NO-RAW-PERSONAL-403` e inventario resellado para que Vercel no bloquee el despliegue por sello viejo.
- `scripts/inventory-gate.mjs`: en Vercel valida exclusivamente fuentes versionadas para que dependencias generadas durante `install` no cambien falsamente el digest.
- Cierre atomico: ROADMAPS e inventario viajan juntos en el ultimo commit para cumplir el gate remoto antes de aliasar LAB y Produccion.
- `scripts/rebuild-inventory-pdfs.py`: usa la misma lista de fuentes que el gate bajo `VERCEL=1` al resellar desde el arbol versionado.

## R213 ¬∑ Eliminar pantalla cruda de acceso personal no autorizado ¬∑ 8 de octubre de 2026

- Sintoma fisico: Produccion mostro una pantalla negra con texto plano `Acceso personal no autorizado` al abrir la Score Card asignada.
- Archivos modificados: `service-worker.js`, `middleware.js`, `index-grupal.html`, `release.json`, `test-live-share-middleware.mjs`, `test-lab-update-recovery.mjs`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.
- Correccion: la navegacion personal carga el shell de la app; las APIs siguen validando membresia antes de leer/publicar datos privados.
- Control: pruebas de middleware y recuperacion de update actualizadas para bloquear regresion de pantalla 403 textual.

## R212 ¬∑ Navegacion de Score Card asignada sin cuenta explicita ¬∑ 8 de octubre de 2026

- Fallo fisico reportado sobre Produccion R211: despues de ingresar codigo, el telefono quedo en pagina negra con texto plano `Acceso personal no autorizado`.
- Causa raiz: la navegacion a `/index-grupal.html?personalEvent=...` podia llegar sin `personalAccount`; `middleware.js` exigia igualdad contra cuenta ausente y devolvia 403 antes de dejar que la Score Card cargara.
- Correccion: `middleware.js` ahora consulta `/api/personal-events` como antes, pero si la sesion vigente autoriza el evento y falta `personalAccount`, redirige a la misma Score Card completando `personalAccount` y `manual_action=personal-scorecard`. Los visores sin jugadores se redirigen al monitor `live-hub.html`.
- Regresion: `test-live-share-middleware.mjs` cubre tarjeta asignada sin cuenta, redireccion reparada, visor read-only al hub y mantiene 403 cuando hay cuenta explicita incorrecta.
- Release: `release.json`, `index-grupal.html` y `service-worker.js` sincronizados como `20261008-R212`.
- Cierre de despliegue: se resella `INVENTARIOS_V311.lock.json` sobre el HEAD remoto exacto para incluir el parche cliente vigente en `personal-events.js`.
- Estado: pendiente regenerar inventario, gates y despliegue LAB/Produccion.

## R211 ¬∑ Codigo de torneo no queda sombreado por sesion de codigo ¬∑ 8 de octubre de 2026

- Fallo fisico reportado sobre Produccion R210: el modal `INGRESE EL CODIGO` con codigo `D50F9059FD` respondio `NO SE PUDO PREPARAR EL EVENTO ¬∑ REINTENTA`.
- Causa raiz: R210 recuperaba sesiones de codigo vencidas, pero una `gsc_code_session` todavia valida podia quedar primero que la identidad de Score Card y bloquear `join-code` antes de crear/usarse el dispositivo que debe recibir la membresia del grupo.
- Correccion: `resolveEventIdentity()` para `inspect-tournament-code` y `join-code` usa el dispositivo vigente si existe; si no existe y la accion es entrada segura por codigo de torneo, crea `gsc_event_device` antes de consultar la sesion de codigo. `list/read` priorizan dispositivo cuando ya existe y conservan sesiones de visor cuando no hay dispositivo.
- Regresion: `test-lab-device-event-identity.mjs` cubre sesion de codigo valida coexistente, sesion de codigo valida sin dispositivo, sesion vencida, inspeccion sin consumo, consumo solo al unir y lectura aislada por dispositivo.
- Cierre de despliegue: el primer commit remoto R211 fallo por lock de inventario no coincidente y el segundo por no tocar ROADMAPS junto al lock. Este commit registra ROADMAPS y lock en la misma modificacion.
- Estado: candidato R211 sobre la linea activa R210 de Produccion; gates y despliegue pendientes.

## R210 ¬∑ redeploy con GSC_ENVIRONMENT production en Produccion ¬∑ 8 de octubre de 2026

- R209 estaba correcto en codigo, pero el proyecto Produccion no tenia `GSC_ENVIRONMENT`; por eso seguia evaluando como preview generico.
- Accion operativa: se agrego `GSC_ENVIRONMENT=production` en el proyecto `epg-caddy` para targets production y preview.
- Release: R210 fuerza redeploy para cargar esa variable nueva en runtime.
- Verificacion esperada: Produccion deja de responder `PERSONAL_ACCESS_NOT_ENABLED`.

## R209 ¬∑ Produccion aliasada requiere GSC_ENVIRONMENT production ¬∑ 8 de octubre de 2026

- R208 fallo el test porque la regla era demasiado amplia: un preview con flag de Produccion no debe activarse sin declarar que sirve Produccion.
- Correccion: `personalAccessEnabled` usa `GSC_ENVIRONMENT=production` para permitir que un deployment tecnico preview, aliasado al dominio publico de Produccion, use `GSC_PERSONAL_ACCESS_PRODUCTION_READY`.
- El comportamiento previo se conserva: preview sin `GSC_ENVIRONMENT=production` no se activa con el flag de Produccion.
- Estado: candidato R209 para build, alias y verificacion directa del endpoint Produccion.

## R208 ¬∑ backend acepta READY de Produccion aunque Vercel sea preview ¬∑ 8 de octubre de 2026

- R207 cargo el release, pero Produccion seguia devolviendo `PERSONAL_ACCESS_NOT_ENABLED`.
- Causa raiz de codigo: `personalAccessEnabled` solo usaba `GSC_PERSONAL_ACCESS_PRODUCTION_READY` cuando `VERCEL_ENV==='production'`; el dominio publico estaba aliasado a un deployment de rama con `VERCEL_ENV=preview`.
- Correccion: el backend habilita acceso personal si esta activo `GSC_PERSONAL_ACCESS_PRODUCTION_READY` o `GSC_PERSONAL_ACCESS_LAB_READY`, independientemente del target tecnico.
- Estado: candidato R208 para publicar y verificar endpoint de Produccion.

## R207 ¬∑ Produccion activa acceso personal en deployments publicados por alias ¬∑ 8 de octubre de 2026

- Reproduccion fisica: en Produccion R206 el codigo `9FCE819496` devuelve `CODIGO INCORRECTO O TORNEO VENCIDO`.
- Diagnostico real: el endpoint de Produccion respondia `PERSONAL_ACCESS_NOT_ENABLED`; la app reintentaba LAB y terminaba mostrando `LIVE_JOIN_CODE_INVALID`.
- Correccion operativa: `GSC_PERSONAL_ACCESS_PRODUCTION_READY` queda aplicado a `production` y `preview`, porque los alias publicos apuntan a deployments de rama.
- Release: R207 fuerza redeploy para que Produccion cargue la variable en runtime.

## R206 ¬∑ score card asignada conserva respuesta join-code ¬∑ 8 de octubre de 2026

- Reproduccion fisica R205: el iPhone muestra `VERSI√ìN R205`, pero al ingresar el codigo queda otra vez en `SCORE CARD ASIGNADA ¬∑ NO SE PUDO PREPARAR EL EVENTO`.
- Causa raiz final: `index-grupal.html` llamaba `openAssignedCard({eventId,eventKind})` y descartaba `membership`, `configuration`, `source` y `accountCode` devueltos por `join-code`; por eso el fallback de R205 nunca tenia datos.
- Correccion: la llamada conserva el resultado completo de join-code; el flujo de grupo conectado tambien usa la respuesta de join-code si el read inmediato falla.
- Estado: candidato R206 para publicar en LAB y Produccion.

## R205 ¬∑ badge visible sincronizado con release ¬∑ 8 de octubre de 2026

- Motivo: el build R204 avanzo hasta `build-manual-lab`, pero `test-update-delivery-control.mjs` bloqueo porque el primer badge visible seguia en `VERSI√ìN R201` mientras el release declarado era R204.
- Correccion: se sincroniza el badge HTML estatico con R205, junto con metadata, service worker, release e inventario.
- Alcance funcional conservado: recuperacion de score card asignada desde join-code cuando el read inmediato falla.
- Estado: candidato R205 para despliegue LAB/PROD.

## R204 ¬∑ inventario sellado para score card asignada ¬∑ 8 de octubre de 2026

- Motivo: R203 paso proyecto y ROADMAP, pero `inventory-gate` bloqueo el build porque el sello no reflejaba los archivos activos posteriores al fix.
- Accion: se recalcula `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` junto con codigo, ROADMAPS y versionado en la misma modificacion.
- Alcance funcional conservado: score card asignada por codigo de torneo usa fallback de join-code cuando el read inmediato aun no responde.
- Estado: candidato R204 para publicar en LAB y PROD.

## R203 ¬∑ commit atomico score card asignada y ROADMAPS ¬∑ 8 de octubre de 2026

- Ajuste de publicaci√≥n: el gate exige que codigo, ROADMAPS y versionado viajen en la misma modificacion; R202 quedo documentado pero separado por commits.
- Correccion funcional incluida: join-code entrega cuenta/membresia y la apertura de score card usa esos datos como respaldo cuando el read inmediato todavia no esta listo.
- Alcance: no borra scores, no recrea el torneo y mantiene el codigo consumido por el mismo dispositivo.
- Estado: candidato de build atomico para publicar en LAB y PROD.

## R202 ¬∑ score card asignada recupera preparaci√≥n tras join-code ¬∑ 8 de octubre de 2026

- Reproducci√≥n f√≠sica del usuario en LAB R201: el c√≥digo LAB `6D5ECEC172` avanz√≥ hasta `SCORE CARD ASIGNADA`, pero fall√≥ con `NO SE PUDO PREPARAR EL EVENTO ¬∑ REINTENTA`.
- Causa ra√≠z: el backend consum√≠a el c√≥digo y creaba la membres√≠a, pero la lectura inmediata pod√≠a quedar sin sesi√≥n/membres√≠a visible para el cliente; el cliente descartaba el resultado de join-code y no pod√≠a preparar la tarjeta asignada.
- Correcci√≥n: `joinPersonalTournamentCode` devuelve `accountCode` y `membership`; `openAssignedCard` usa esos datos como recuperaci√≥n si el `read` inmediato falla y ya existe configuraci√≥n de torneo.
- Release: R202 fuerza cach√© nueva sobre R201 para que iPhone reciba el fallback sin borrar scores ni membres√≠as existentes.
- Estado: pendiente build Vercel posterior al gate ROADMAP.

## R201 ¬∑ ingreso de torneo LAB desde Producci√≥n sobre Stableford R200 ¬∑ 7 de octubre de 2026

- Causa ra√≠z: el R200 vivo de Stableford preservaba el retry cruzado s√≥lo para `LIVE_JOIN_CODE_INVALID`; al ingresar un c√≥digo LAB desde Producci√≥n, el endpoint local devolv√≠a `PERSONAL_ACCESS_NOT_ENABLED` y el cliente no saltaba al ambiente par.
- Correcci√≥n: `personal-events.js` reintenta el ambiente par para `LIVE_JOIN_CODE_INVALID` y `PERSONAL_ACCESS_NOT_ENABLED`.
- Release: `index-grupal.html`, `service-worker.js` y `release.json` suben a R201 para forzar instalaci√≥n visible sin perder Stableford R200.
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

# ROADMAP OVERALL

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


## R137 ¬∑ 29 septiembre 2026 ¬∑ ronda privada separada de Torneos (candidato local)

- `live-hub.html` muestra CREAR TORNEO y CREAR RONDA PRIVADA en botones consecutivos. La ronda privada abre Registro conservando jugadores existentes y sin crear un torneo.
- `index-grupal.html` incorpora MI RONDA debajo de VER RONDAS GUARDADAS para regresar a la tarjeta y ver los scores del grupo; la ruta privada elimina el torneo del borrador antes de iniciar.
- `live-control.js` impide enviar una ronda sin torneo a un torneo pendiente. `live-hub.js` enruta la acci√≥n privada sin agregarla a la lista de torneos. `test-lab-round-create-modal.mjs` protege estas reglas.
- `release.json` e `index-grupal.html` avanzan a R137; `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` sella las fuentes actualizadas. `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` registra las rutas operativas.
- Estado: pruebas dirigidas PASS; revisi√≥n de navegador y publicaci√≥n LAB pendientes. Producci√≥n intacta.

## R136 ¬∑ 29 septiembre 2026 ¬∑ acciones de CREAR EVENTO y Registro

- El bot√≥n `EVENTO` del Registro ahora dice `CREAR EVENTO` y conserva su navegaci√≥n a Torneos.
- El Registro general deja de ofrecer `VER RONDA ANTERIOR`; su reactivaci√≥n desde esa pantalla tambi√©n se elimin√≥. `VER RONDAS GUARDADAS` permanece disponible.
- Se retir√≥ `+ JUGADOR` y su editor de altas posteriores. El editor de una ronda existente s√≥lo muestra los jugadores ya registrados y rechaza altas por dictado; el registro inicial conserva su capacidad normal de jugadores.
- El portal de Torneos deja de generar el mensaje `ELIGE UNA FUNCI√ìN O UN TORNEO`; la funci√≥n limpia el estado al abrir el portal y conserva las opciones de torneos y resultados.
- Regresi√≥n: `test-lab-tournament-navigation.mjs` comprueba que la funci√≥n del portal no vuelva a emitir ese mensaje.
- Regresi√≥n: `test-lab-round-create-modal.mjs`, `test-lab-tournament-navigation.mjs`, `test-v263-compact-players-back-button.mjs`, `test-v253-live-previous-round.mjs` y `test-v304-homogeneous-registration-actions.mjs`.
- Archivos: `index-grupal.html`, `live-hub.js`, `release.json`, las cinco pruebas anteriores, ambos ROADMAPS, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_LIVE_018_GOLF_SCORE_CARD_GT_LIVE.md` e `INVENTARIOS_V311.lock.json`.
- PASS: pruebas dirigidas, build integral LAB, calidad, ROADMAP e inventario. Revisi√≥n visual en navegador y Preview siguen pendientes.
- Alcance LAB R136. Producci√≥n intacta.

## R135 ¬∑ 29 septiembre 2026 ¬∑ compatibilidad al vincular Friends

- Las capturas posteriores a R134 confirmaron que ‚ÄúCuates‚Äù se crea, pero Torneos a√∫n no recibe tarjetas. Causa: la uni√≥n autom√°tica usaba la acci√≥n LIVE nueva `join_tournament_by_id`, que puede no existir en el backend al que el entorno LAB deriva la llamada.
- El torneo guarda tambi√©n su c√≥digo de uni√≥n. Si la uni√≥n por ID no est√° disponible, la tarjeta intenta la acci√≥n compatible `join_tournament` con ese c√≥digo; se conservan reintentos y jugadores registrados. La API protege tambi√©n la acci√≥n por ID con la validaci√≥n de origen de la app.
- PASS: prueba Friends, navegaci√≥n TORNEOS y sincron√≠a de release; build LAB completo; calidad, matriz de release y ROADMAP. Inventario y Preview actualizados/verificados al cerrar candidato. Producci√≥n intacta. Revisi√≥n autom√°tica de navegador y recorrido real completos pendientes.
- Archivos: `api/live.js`, `index-grupal.html`, `live-control.js`, `live-hub.js`, `release.json`, `service-worker.js`, `test-lab-round-create-modal.mjs`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_LIVE_018_GOLF_SCORE_CARD_GT_LIVE.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md` e inventario LAB.

## R133 ¬∑ 29 septiembre 2026 ¬∑ conservar jugadores al crear ronda Friends

- Se corrigi√≥ el retorno de `CREAR RONDA`: ya no llama a la ruta destructiva que limpia el borrador y la tarjeta activa.
- Registro recupera primero los jugadores del borrador; si no existe, los de la tarjeta activa o el archivo m√°s reciente. S√≥lo crea una ronda vac√≠a al confirmar INICIAR RONDA.
- Regresi√≥n en `test-lab-round-create-modal.mjs` protege la ruta de retorno, el guardado del roster y el inicio autom√°tico sin borrar jugadores. Preview pendiente de publicar y verificar; Producci√≥n intacta.
- Archivos: `live-hub.js`, `index-grupal.html`, `release.json`, `service-worker.js`, `test-lab-round-create-modal.mjs`, ambos ROADMAPS, registro de reincidencias e inventario LAB. Release LAB R133.

## R132 ¬∑ 28 septiembre 2026 ¬∑ conexi√≥n de Friends y lista directa

- Al confirmar la ronda creada en Torneos, el Registro configura el torneo para conectar autom√°ticamente la tarjeta cuando la ronda queda guardada; el grupo y sus jugadores se publican en el evento Friends.
- Al tocar ese evento en Torneos, se muestra directamente la lista `NOMBRE ¬∑ HDCP ¬∑ HOYO ¬∑ GROSS ¬∑ NETO ¬∑ +/-`, en la tipograf√≠a compartida con las tarjetas y todo en may√∫sculas: mejor score primero y, en empate, el hoyo actual m√°s avanzado. Esta vista compacta s√≥lo aplica a rondas creadas desde `CREAR RONDA`.
- Pruebas: `test-lab-round-create-modal.mjs` verifica la uni√≥n de grupo, selecci√≥n de ronda, lista compacta y orden score/hoyo; pruebas de navegaci√≥n y resumen LIVE existentes tambi√©n pasan.
- Archivos: `live-control.js`, `live-hub.js`, `live-hub.html`, `index-grupal.html`, `release.json`, `service-worker.js`, `test-lab-round-create-modal.mjs`, `test-lab-medal-monitor.mjs`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`. Release LAB R132; Producci√≥n no se modifica.
- Pendientes de verificaci√≥n: build/gates integrales, deployment Preview actualizado y recorrido real Score‚ÜíFriends con datos y regreso a Score preservando jugadores.

## R131 ¬∑ 28 septiembre 2026 ¬∑ alta de ronda desde TORNEOS

- En Laboratorio, `CREAR RONDA` abre una ventana modal s√≥lo cuando se pulsa. El jugador escribe el nombre del evento y confirma con `OK`.
- La app registra el evento como torneo LIVE, conserva sus credenciales de organizaci√≥n para incorporar grupos y, tras `OK`, abre el Registro de Score existente con el torneo seleccionado.
- El bot√≥n existente `EVENTO` en Inicio abre TORNEOS y conserva el registro en curso; el nombre s√≥lo se solicita desde `CREAR RONDA`.
- Se valida nombre vac√≠o, cupo completo, Escape/cierre, alta, error 42703 y salto al Registro; el test `test-lab-round-create-modal.mjs` forma parte del build LAB.
- Archivos: `live-hub.html`, `live-hub.js`, `index-grupal.html`, `release.json`, `service-worker.js`, `test-lab-round-create-modal.mjs`, `test-lab-update-recovery.mjs`, `test-lab-r60-production-refresh.mjs`, `test-manual-no-assistant.mjs`, `test-lab-shortcuts-navigation.mjs`, `scripts/build-manual-lab.mjs`, `database/005_live_tournament_mode.sql`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` y ambos ROADMAPS. Release LAB: R131.
- `test-lab-update-recovery.mjs` ahora proporciona el stub de red que requiere el Service Worker al probar una copia aprobada; no altera comportamiento del producto y permite ejecutar el build LAB completo.
- Los controles `test-lab-r60-production-refresh.mjs` y `test-manual-no-assistant.mjs` ahora leen `release.json` y aceptan el release fallback versionado del Service Worker, en vez de fijar R128.20.
- `test-lab-shortcuts-navigation.mjs` valida el bot√≥n `EVENTO` existente como ruta a Torneos en lugar de exigir un CTA redundante `CENTRO DE TORNEOS`.
- `test-lab-global-operational-audit.mjs` aplica el mismo contrato para que la auditor√≠a global confirme la acci√≥n existente `EVENTO`‚ÜíTORNEOS.
- El servidor fall√≥ porque Neon carece de `live_tournaments.mode` (API 42703/503). Migraci√≥n `8b5d6fc9-33fd-4bec-8a54-b244bcfa57a6` preparada y probada en rama temporal `br-withered-cell-av876aco`; la rama compartida objetivo es `br-late-wind-avhgi9s3`. Aplicar requiere aprobaci√≥n del propietario. Producci√≥n web no se despleg√≥.
- Pendiente: aprobaci√≥n/aplicaci√≥n de migraci√≥n; despu√©s verificar en deployment LAB la creaci√≥n, torneo en lista y acceso al Registro.

## LAB 20-sep-2026 ¬∑ gate de QA alineado con perfil actual sin micr√≥fono/AI

- El gate ROADMAP deja de ejecutar bancos V354‚ÄìV362 de dictado/AI retirados y usa el perfil t√©cnico actual mediante `scripts/build-manual-lab.mjs`.
- La nueva protecci√≥n exige ausencia de entradas de micr√≥fono/AI, conserva voz local de resultados, c√°lculo, persistencia, modalidades, cierre, historial, manual y paridad de pantallas.
- Se evita que una prueba obsoleta falle por `api/voice-health.js`, m√≥dulo retirado del perfil LAB actual.
- Archivos exactos: `.github/workflows/roadmap-gate.yml`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`.


## LAB 20-sep-2026 ¬∑ cambio de modalidad con scores existentes

- Se elimina el bloqueo que imped√≠a cambiar modalidad cuando la ronda ya ten√≠a scores registrados.
- Los scores existentes se conservan al cambiar entre modalidades compatibles; la validaci√≥n propia de cantidad de jugadores de cada modalidad permanece activa.
- El flujo editado persiste la nueva modalidad mediante `round.mode=draftRoundMode` sin borrar `player.holes`.
- Prueba permanente actualizada: `test-lab-edit-round-mode.mjs`, que exige cambio de modalidad con scores conservados y proh√≠be el mensaje de bloqueo anterior.
- Archivos funcionales y de QA del cambio: `index-grupal.html` y `test-lab-edit-round-mode.mjs`.
- Producci√≥n permanece intacta; alcance exclusivo LAB hasta certificaci√≥n integral.



## V407-R29 ¬∑ env√≠o de Tarjeta Digital compatible con el toque de iPhone ¬∑ 12 de septiembre de 2026

- Causa ra√≠z f√≠sica: `ENVIAR TARJETA DIGITAL` generaba el PNG con una espera as√≠ncrona antes de llamar a `navigator.share`; Safari perd√≠a la activaci√≥n transitoria del toque y no abr√≠a la hoja nativa.
- La tarjeta PNG se prepara al finalizar la ronda. El toque posterior llama inmediatamente a compartir con el archivo ya listo, conservando la activaci√≥n exigida por iPhone.
- El estado `TARJETA LISTA PARA ENVIAR`, cancelaci√≥n o error queda visible fuera de `artifactActions`, que permanece oculto.
- Prueba dirigida: `test-v397-card-in-out-back-contract.mjs` ejecuta el caso Universales y demuestra que `navigator.share` comienza dentro del mismo toque. Estado autom√°tico PASS; prueba f√≠sica iPhone y publicaci√≥n pendientes.
- Archivos exactos: `index-grupal.html`, `service-worker.js`, `test-v397-card-in-out-back-contract.mjs`, `test-v365-active-round-empty-recovery.mjs`, `test-v406-r2-professional-design.mjs`, `test-v406-r23-visible-version.mjs`, `test-v406-r4-mobile-controls.mjs`, `test-v406-r5-simple-tournament-live.mjs`, `test-v407-r1-premium-visual-system.mjs`, `test-v407-r25-round-controls.mjs`, `test-v407-r7-ios-scroll.mjs`, `test-v407-r9-manual-update.mjs`, `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`.

## V407-R24D LAB ¬∑ recuperaci√≥n de instalaciones R8 y aislamiento al desplazarse ¬∑ 9 de septiembre de 2026

- Corrige el FAIL f√≠sico donde `golf-sc-gt-lab.vercel.app` segu√≠a mostrando R8 y ACTUALIZAR no actuaba: el middleware sustitu√≠a `service-worker.js` y los manifiestos por `access.html`.
- Esos tres recursos t√©cnicos quedan p√∫blicos; la aplicaci√≥n, los datos y las APIs privadas conservan el control de acceso.
- `ACTUALIZADO` deja de ser fijo cuando no existe una versi√≥n pendiente, evitando que cubra `CONTROL MANUAL ¬∑ UNIVERSALES`; `ACTUALIZAR` disponible conserva visibilidad, verde, habilitaci√≥n y pulso.
- Pruebas permanentes: `test-v407-r24c-public-pwa-bootstrap.mjs` y `test-v407-r24c-update-scroll-isolation.mjs`. MAIN permanece intacta.
- Continuidad 10 de septiembre de 2026: se regeneran los tres inventarios desde el √°rbol limpio `a2d1d9a5ebdd36435daed6c34a0c8ff61561612a`; el candado confirma 450 fuentes y conserva MAIN sin cambios.

## V407-R24 LAB ¬∑ WhatsApp privado y transici√≥n de ronda ¬∑ 9 de septiembre de 2026

- Registro General y Stableford incluyen WhatsApp opcional con `üá¨üáπ +502` predeterminado y c√≥digo internacional editable; el dato se conserva en el perfil y no se publica en LIVE ni en la tarjeta digital. Los bancos Stableford anteriores quedan alineados con la entrada enriquecida.
- `FINALIZAR RONDA` guarda la tarjeta oficial en Historial y habilita su env√≠o; `NUEVA RONDA` archiva la ronda actual y abre un registro vac√≠o en todas las modalidades.
- En cualquier pantalla superpuesta se oculta `ACTUALIZADO`, evitando que cubra `ATR√ÅS` u otras acciones m√≥viles. S√≥lo Preview LAB; Main permanece intacta.
- El inventario se sella contra el √°rbol remoto LAB dentro del mismo cambio documental requerido por el despliegue.
- Los simuladores Stableford anteriores interpretan la ausencia del nuevo campo como WhatsApp opcional vac√≠o.
- En m√≥vil, WhatsApp ocupa una fila completa y reserva al n√∫mero un ancho m√≠nimo utilizable.

# V407-R23B ¬∑ enlace LIVE privado abre como s√≥lo lectura ¬∑ 9 de septiembre de 2026

- Corrige √∫nicamente la frontera de acceso del visor compartido: `/live.html`, `live-view.js` y `match-play.js` pueden cargar sin sesi√≥n propietaria.
- `/api/live` contin√∫a privado para crear, publicar y revocar; el middleware deja pasar exclusivamente `POST action=read`, que `api/live.js` valida con el token secreto, caducidad, revocaci√≥n y l√≠mite de consultas.
- `test-v352-live.mjs` impide que el visor vuelva al formulario propietario y que una acci√≥n de escritura quede expuesta.

## V407-R23 ¬∑ compartir directo e invitaci√≥n transportable ¬∑ 9 de septiembre de 2026

- Desde una Score Card activa, tocar LIVE ejecuta directamente `quickShareGroup()` y abre la hoja nativa de compartir para elegir WhatsApp; no muestra ninguna pantalla intermedia. La regla com√∫n cubre General, Universales, Stableford, Match Play y Four Ball.
- La invitaci√≥n propietaria de 24 horas viaja como texto completo con `/access.html?invite=TOKEN`; WhatsApp conserva el token. `access.html` acepta query y el formato fragmento anterior, elimina el token visible y canjea exclusivamente por POST. Un GET de previsualizaci√≥n no consume la invitaci√≥n.
- No cambia scores, ronda activa, persistencia, controles de ACTUALIZAR ni privacidad.

## V407-R22 ¬∑ LIVE abre la ronda activa en todas las modalidades ¬∑ 9 de septiembre de 2026

- Publicado en Producci√≥n desde commit `90c25514a83b5c407e00ecc4f02ad4f2c9de3ef8`, despliegue `dpl_3T4Fu3Y59uzUzUXytU5FGn5b7ka2`, estado READY; rollback inmediato: `1ad4197bc5f2f8a923b94f3f5eac4a562ccfaafe`.
- `live-control.js` separa el visor p√∫blico de los controles del propietario. Al tocar LIVE desde cualquier ronda activa abre directamente la administraci√≥n de esa Score Card; sin ronda conserva el Centro LIVE p√∫blico.
- Aplica por `currentSnapshot()` a General, Universales, Stableford, Match Play y Four Ball, sin depender de jugadores, campo, hoyo o ronda particular.
- `test-v406-r5-simple-tournament-live.mjs` bloquea permanentemente el regreso al men√∫ gen√©rico cuando existe una ronda. Los bancos LIVE, categor√≠as, Universales y compartir grupo permanecen PASS.
- `index-grupal.html` y `service-worker.js` avanzan s√≥lo la identidad de entrega a R22 para sustituir `live-control.js` almacenado, sin alterar scores, persistencia, invitaciones 24 h ni la funci√≥n de ACTUALIZAR.

## V407-R10 ¬∑ tecla ACTUALIZADO activa ¬∑ 8 de septiembre de 2026

- Cambio puntual: `ACTUALIZADO` permanece oscuro cuando R10 est√° vigente, pero ya no queda deshabilitado; tocarlo fuerza una recarga real del mismo enlace sin borrar la ronda. No cambia ninguna gr√°fica ni otra funci√≥n. MAIN intacta.

## V407-R9 ¬∑ actualizaci√≥n manual real de la pantalla inicial ¬∑ 8 de septiembre de 2026

- `IMG_3140(1).jpeg` rechaza R8: el bot√≥n verde no sustitu√≠a la pantalla anterior.
- R9 usa una identidad nueva para que R8 detecte la publicaci√≥n; al tocar, conserva la ronda, retira √∫nicamente el worker/cach√© viejo y recarga el mismo enlace desde red.
- Vigente muestra `ACTUALIZADO` oscuro; s√≥lo una versi√≥n distinta muestra `ACTUALIZAR` verde/parpadeante. El worker deja de promover o navegar autom√°ticamente.
- Archivos: `index-grupal.html`, `service-worker.js`, `test-v407-r9-manual-update.mjs`, bancos de versi√≥n relacionados, `audit-project.mjs`, continuidad, reincidencias y ambos ROADMAPS. MAIN permanece intacta.

## V407-R8 ¬∑ un solo scroll iPhone y actualizaci√≥n siempre verificable ¬∑ 8 de septiembre de 2026

- El acceso instalado hist√≥rico `golf-sc-gt-lab.vercel.app` queda como espejo permanente del can√≥nico `epg-caddy.vercel.app`; `vercel.legacy-mirror.json` conserva la configuraci√≥n que entrega la misma pantalla y el mismo service worker R8 sin pedir cambio de enlace.
- La pantalla principal deja de ser un overlay fijo desplazable: `#setupOverlay` entra al flujo del documento y el iPhone usa un √∫nico scroll nativo.
- `ACTUALIZAR` permanece habilitado y parpadeando aun en la versi√≥n vigente; cada toque fuerza verificaci√≥n/promoci√≥n de cach√© sin borrar la sesi√≥n.
- El `activate` del service worker migra autom√°ticamente el cliente iPhone activo V407-R6 hacia R8 una sola vez; evita recargas m√∫ltiples, no congela el scroll y no depende del sondeo que fall√≥ f√≠sicamente en `IMG_3136.jpeg`.
- Evidencia de rechazo: `IMG_3134.jpeg`, V407-R6, bot√≥n gris y congelamiento intermitente reportado f√≠sicamente.
- Archivos exactos: `index-grupal.html`, `service-worker.js`, `test-v407-r7-ios-scroll.mjs`, `test-v365-active-round-empty-recovery.mjs`, `test-v406-r2-professional-design.mjs`, `test-v406-r23-visible-version.mjs`, `test-v406-r4-mobile-controls.mjs`, `test-v406-r5-simple-tournament-live.mjs`, `test-v407-r1-premium-visual-system.mjs`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`.

## V407-R7 ¬∑ scroll iPhone y actualizaci√≥n visible ¬∑ 8 de septiembre de 2026

- Corrige el atasco intermitente del desplazamiento en iPhone: elimina la mutaci√≥n de estilos durante cada `touchstart`, separa el desplazamiento de overlays y p√°gina, y publica una nueva identidad de cach√© para que V407-R6 muestre `ACTUALIZAR` parpadeando.
- Integra sin sobrescribir el cambio concurrente `39bb130`: un solo bloque `MODALIDADES` y la acci√≥n `COMPARTE LIVE`.
- Candado reproducible: `test-v407-r7-ios-scroll.mjs` queda incorporado en `audit-project.mjs`.
- Archivos exactos V407-R7: `index-grupal.html`, `service-worker.js`, `audit-project.mjs`, `test-v407-r7-ios-scroll.mjs`, `test-v406-r4-mobile-controls.mjs`, `test-v406-r2-professional-design.mjs`, `test-v407-r1-premium-visual-system.mjs`, `test-v406-r5-simple-tournament-live.mjs`, `test-v261-registration-stableford-modality.mjs`, `test-v329-skins.mjs`, `test-v330-side-games.mjs`, `test-v406-r23-visible-version.mjs`, `test-v365-active-round-empty-recovery.mjs`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`.

## V407-R6 PRODUCCI√ìN ¬∑ enlace estable y actualizaci√≥n instalada ¬∑ 8 de septiembre de 2026

- Se publica el √°rbol V407-R6 ya verificado en el enlace estable de Producci√≥n para que las instalaciones existentes detecten la nueva versi√≥n y habiliten `ACTUALIZAR`, sin exigir al usuario cambiar de enlace ni reinstalar la aplicaci√≥n.
- El rollback conserva como referencia el commit de Producci√≥n V406-R24 `4009f79f50987f8bf105189bce9c5e90b2857363`.

## V407-R4 ¬∑ encabezado fuera de la barra del iPhone ¬∑ 8 de septiembre de 2026

La Pantalla Principal respeta el √°rea segura superior; logo e informaci√≥n bajan debajo de la barra del iPhone. El bloque derecho se acerca al centro y versi√≥n/ACTUALIZADO se separan del borde. Evidencias de origen: `IMG_3120(1).png`, `IMG_3121(1).png` e `IMG_3122.png`. `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md` registra el corte R4. Producci√≥n intacta.

## V407-R3 ¬∑ Pantalla 4 ¬∑ Tarjeta Digital premium ¬∑ 8 de septiembre de 2026

- `index-grupal.html`: Tarjeta Digital usa encabezado centrado, tres acciones equivalentes, metadatos 4√ó1 en escritorio y 2√ó2 en m√≥vil, gu√≠a de desplazamiento y contenedor de tabla con ancho controlado de 1360 px.
- Los accesos flotantes ajenos quedan ocultos mientras la Tarjeta Digital est√° abierta; `ACTUALIZADO` permanece visible por orden del propietario.
- La revisi√≥n f√≠sica del primer Preview R3 rechaz√≥ `INSTALAR APP` sobre la tarjeta y un metadato vac√≠o; el candidato final oculta ese acceso y muestra `RONDA CASUAL` cuando no existe torneo.
- `service-worker.js` identifica el candidato R3; los contratos V365, V405, V406 y V407 se alinean sin cambiar c√°lculo, persistencia, cierre ni env√≠o.
- Archivos exactos del corte: `index-grupal.html`, `service-worker.js`, `test-v407-r1-premium-visual-system.mjs`, `test-v365-active-round-empty-recovery.mjs`, `test-v405-registration-clear-final-mobile.mjs`, `test-v406-r2-professional-design.mjs`, `test-v406-r23-visible-version.mjs`, `test-v406-r4-mobile-controls.mjs`, `test-v406-r5-simple-tournament-live.mjs`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`.
- Rollback: regresar al commit V407-R2 en `lab/premium-ui-v407`. Producci√≥n permanece intacta.

## V407-R1 ¬∑ sistema visual premium y sim√©trico ¬∑ 8 de septiembre de 2026

Archivos de trazabilidad y regresi√≥n actualizados: `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `test-v406-r23-visible-version.mjs` y `test-v406-r5-simple-tournament-live.mjs`.

Vistas WhatsApp preservadas individualmente: `previews/whatsapp-cards-v406-r24/01_RONDA_NORMAL.html`, `previews/whatsapp-cards-v406-r24/02_STABLEFORD.html`, `previews/whatsapp-cards-v406-r24/03_MATCH_PLAY.html`, `previews/whatsapp-cards-v406-r24/04_FOUR_BALL.html`, `previews/whatsapp-cards-v406-r24/05_SCORE_CARD_PRACTICA.html`, `previews/whatsapp-cards-v406-r24/06_SKINS.html`, `previews/whatsapp-cards-v406-r24/07_WOLF.html`, `previews/whatsapp-cards-v406-r24/08_VEGAS.html`, `previews/whatsapp-cards-v406-r24/09_DOTS.html`, `previews/whatsapp-cards-v406-r24/10_TORNEO_LIVE.html` y `previews/whatsapp-cards-v406-r24/index.html`.

- `index-grupal.html` incorpora una ret√≠cula visual √∫nica para Registro, cabecera, herramientas, informaci√≥n del campo, resumen, acciones inferiores, Historial, Tarjeta Digital y paneles: negro/grafito, bordes discretos, verde limitado, radios coherentes, alturas t√°ctiles homog√©neas y espaciado respirable.
- En m√≥vil, la cabecera se ordena en dos columnas, las cuatro herramientas forman una fila sim√©trica, las primeras cuatro acciones se distribuyen 2√ó2, NUEVA RONDA ocupa una l√≠nea completa y las tres acciones secundarias conservan exactamente la misma altura.
- `service-worker.js` identifica la cach√© V407-R1. `test-v407-r1-premium-visual-system.mjs` bloquea regresiones de simetr√≠a y geometr√≠a. Producci√≥n permanece intacta hasta revisi√≥n visual y aprobaci√≥n del propietario.
- Control Manual hereda la misma superficie grafito, navegaci√≥n ANTERIOR‚ÄìHOYO‚ÄìSIGUIENTE proporcionada, campos homog√©neos y ENTER principal de 56 px.
- Correcci√≥n RC-084: Control Manual elimina las seis columnas r√≠gidas, usa ret√≠cula adaptable con controles de 54‚Äì64 px y conserva sin cambios la paleta original negro, verde ne√≥n, blanco y rojo funcional. Se proh√≠be aceptar como evidencia m√≥vil una captura de escritorio recortada.
- `test-v260-round-points-player-return.mjs` conserva el contrato de seis columnas de General/Stableford, pero sustituye la medida r√≠gida obsoleta por validaci√≥n expl√≠cita de la ret√≠cula adaptable de escritorio y m√≥vil.

## V406-R24 ¬∑ Previsualizaci√≥n f√≠sica de tarjetas WhatsApp ¬∑ 8 de septiembre de 2026

- Se incorpora `previews/whatsapp-cards-v406-r24/` con un √≠ndice y diez tarjetas de muestra generadas por el constructor oficial de artefactos: Ronda Normal, Stableford, Match Play, Four Ball, Score Card ¬∑ Pr√°ctica, Skins, Wolf, Vegas, Dots y Torneo Live.
- Las p√°ginas son exclusivamente de revisi√≥n visual en LAB; no cambian c√°lculo, persistencia, env√≠o, Production ni el cierre oficial de rondas.

## V406-R4 ¬∑ Controles m√≥viles sin traslape ¬∑ 7 de septiembre de 2026

- LIVE, REGLAS, AI ‚àû y Support pasan a una barra estructural debajo del encabezado.
- Registro nombra expl√≠citamente los selectores vac√≠os CATEGOR√çA y MARCAS.
- ATR√ÅS, BORRAR SCORES y + JUGADOR comparten una fila compacta.
- El banco visual temporal usa 67 participantes repartidos 7/6/24/11/7/7/5; test-v406-r4-mobile-controls.mjs conserva el candado de regresi√≥n.

- V406-R3 renueva exclusivamente el identificador publicado y la cach√© PWA para que los accesos instalados con V406-R2 detecten la actualizaci√≥n y activen el bot√≥n `ACTUALIZAR`; no modifica rondas, scores ni persistencia.

## V406-R2 LAB candidato ¬∑ Dise√±o profesional, categor√≠as y TORNEO LIVE ¬∑ 7 de septiembre de 2026

- Se agreg√≥ `gsc-design-system.css` como hoja can√≥nica exclusiva de TORNEO LIVE: espaciado, radios, superficies, foco, alturas t√°ctiles y tipograf√≠a legible. Registro qued√≥ consolidado dentro de su hoja hist√≥rica, sin una capa externa de sobrescrituras.
- Registro m√≥vil conserva `NOMBRE ‚Üí CATEGOR√çA ‚Üí HDCP ‚Üí MARCAS`, pero distribuye cada jugador en dos l√≠neas para evitar truncamiento: Nombre y Categor√≠a arriba; Handicap y Marcas abajo.
- TORNEO LIVE reduce ruido en m√≥vil, prioriza las pesta√±as de Clasificaci√≥n/Mi Tablero, oculta instrucciones permanentes y simplifica columnas secundarias.
- La Vista detallada re√∫ne din√°micamente a todos los jugadores que realmente tenga la categor√≠a ‚Äîpor ejemplo 14, 20, 22 o 30‚Äî con hoyos 1‚Äì18 e indicadores Gross/Neto/resultado, m√°s IN/OUT/TOTAL. No fija ni rellena una cantidad. Mezcla los foursomes y reordena toda la categor√≠a de l√≠der a peor resultado en cada actualizaci√≥n; el grupo s√≥lo queda como referencia secundaria. Es visualizaci√≥n LIVE de s√≥lo lectura; no crea otra tarjeta, archivo, PDF ni historial.
- `test-v406-tournament-categories.mjs` usa 30 jugadores como escenario visual de la categor√≠a m√°s poblada, comprueba adem√°s cantidades variables, mezcla de foursomes, orden l√≠der‚Üípeor, 18 hoyos, IN/OUT/TOTAL y capacidad total de 100 participantes.
- Se agreg√≥ `test-v406-r2-professional-design.mjs` como candado contra el regreso a controles diminutos o la ret√≠cula comprimida.
- Capacidad comercial protegida: hasta 6 jugadores por tarjeta/grupo y m√°ximo 100 jugadores activos por torneo. `api/live.js` bloquea el torneo dentro de la misma transacci√≥n tanto al publicar como al unir un grupo y rechaza al jugador 101 con `409 LIVE_TOURNAMENT_CAPACITY_REACHED`.
- `DATABASE_ARCHITECTURE.md` formaliza que categor√≠as, clasificaci√≥n y detalle son proyecciones de s√≥lo lectura sobre snapshots LIVE; no crean tablas, tarjetas ni un segundo escritor.
- La cabecera de cada categor√≠a muestra autom√°ticamente fecha de Guatemala, nombre del torneo y modalidad; la categor√≠a domina visualmente. Su clasificaci√≥n inmediata usa `POS ¬∑ NOMBRE ¬∑ HDCP ¬∑ MARCAS ¬∑ GROSS ¬∑ NETO ¬∑ +/‚àí` y el detalle por hoyo queda debajo.

## V406-R1 LAB candidato ¬∑ Categor√≠as y TORNEO LIVE ¬∑ 7 de septiembre de 2026

- Registro incorpora `CATEGOR√çA` inmediatamente despu√©s de `NOMBRE`, antes de `HDCP`, para cada jugador.
- Cat√°logo: Campeonato, A, B, C, D, Femenina, Senior y S.Senior; obligatorio cuando existe torneo y opcional fuera de torneo.
- La categor√≠a viaja dentro del jugador por ronda, persistencia, snapshot oficial, tarjeta digital y LIVE.
- TORNEO LIVE crea un √≠ndice interno por categor√≠a, permite llamar una clasificaci√≥n aislada y buscar por jugador, grupo o categor√≠a.
- `MI TABLERO` conserva una selecci√≥n personal de jugadores de distintas categor√≠as para el caso familiar o grupo de predilecci√≥n.
- La pantalla principal no recibe controles adicionales; el an√°lisis masivo queda en la p√°gina independiente TORNEO LIVE.
- Se separ√≥ `ATR√ÅS` de `ACTUALIZAR` en el Registro m√≥vil. MAIN/Producci√≥n permanece congelado.

## V405-R4 LAB estable ¬∑ cierre de prueba ACTUALIZAR y Toolbar apagada ¬∑ 7 de septiembre de 2026

- Retira la identificaci√≥n temporal R3 y publica `V405-R4-LAB-STABLE-20260907` con cach√© `v405-r4-lab-stable`.
- Evidencia f√≠sica del propietario: `ACTUALIZAR` detect√≥ sin refresco, se mostr√≥ verde/parpadeante y, al pulsarlo, instal√≥ R3 y volvi√≥ a oscuro.
- Evidencia f√≠sica del propietario: `BORRAR TODO` funcion√≥ correctamente en Registro iPhone.
- Configuraci√≥n Vercel del proyecto `epg-caddy`: Toolbar `Off` en Preview/Preproducci√≥n y Producci√≥n conservada en `Default`; requiere este deployment LAB nuevo para entrar en vigor.
- MAIN permanece intacta.

## V405-R3 LAB ¬∑ prueba f√≠sica del parpadeo ACTUALIZAR ¬∑ 7 de septiembre de 2026

- `index-grupal.html`: identificaci√≥n `V405-R3-LAB-UPDATE-BLINK-TEST-20260907` para que V405-R2 detecte autom√°ticamente la actualizaci√≥n y active el bot√≥n verde/parpadeante.
- `service-worker.js`: cach√© `v405-r3-update-blink-test`.
- `test-v365-active-round-empty-recovery.mjs`: fija ambos identificadores y conserva detecci√≥n autom√°tica, `persist()` y actualizaci√≥n en el mismo dominio.
- Prueba temporal s√≥lo en LAB; no cambia l√≥gica, sesi√≥n, jugadores, scores, historial, voz ni MAIN.

![ROADMAP OVERALL ¬∑ Golf Score Card GT](ROADMAP_OVERALL_V291.png)

## V332 ¬∑ moneda dual y matriz completa de seguimiento

El propietario exige que Skins, Wolf, Vegas y Dots permitan elegir antes de la ronda una de dos monedas: **quetzales (`Q`/`GTQ`) o d√≥lares (`$`/`USD`)**. Cada juego presenta dos casillas de radio mutuamente excluyentes; elegir una desmarca la otra. La moneda queda guardada en la configuraci√≥n y viaja sin conversi√≥n por pantalla, voz, snapshot, correcci√≥n, tarjeta Global/personal, Historial, sincronizaci√≥n, restauraci√≥n y liquidaci√≥n. El valor es opcional para el grupo y nunca altera Gross, Neto ni el resultado deportivo.

V332 homologa la arquitectura visible de los cuatro juegos para que un jugador sin experiencia no reciba s√≥lo un saldo final. La matriz com√∫n incluye estado y hoyos resueltos/pendientes, unidades o puntos acumulados, carry abierto, registros, dinero bruto movido, neto exacto a liquidar, l√≠der o empate, saldos individuales y qui√©n paga a qui√©n. Cada juego a√±ade su riesgo √∫til: mayor pozo Skins; exposici√≥n del Wolf por rival y hoyo; mayor cambio y riesgo m√°ximo por duelo Vegas; e impacto de un punto por jugador en Dots. La tarjeta final conserva los mismos acumulados para auditor√≠a.

Los bancos `test-v329-skins.mjs` y `test-v330-side-games.mjs` verifican las ocho casillas Q/$, exclusividad nativa, normalizaci√≥n de moneda, s√≠mbolos, m√©tricas, cero-suma, persistencia, correcci√≥n y artefactos. La auditor√≠a integral aprob√≥ **89 paquetes**, **325 fuentes** y tres inventarios PDF sellados en V332. El corte visible es `V332-DUAL-CURRENCY-MATRIX-20260826` y la copia instalable usa `gscg-mobile-v332-dual-currency-matrix`. Producci√≥n permanece intacta; falta publicar el Preview y aprobar la prueba f√≠sica en iPhone antes de cualquier montaje.

Archivos exactos V332: `skins.js`, `wolf.js`, `vegas.js`, `dots.js`, `index-grupal.html`, `card-artifacts.js`, `test-v329-skins.mjs`, `test-v330-side-games.mjs`, `service-worker.js`, los bancos que fijan build/cach√©, `scripts/update-inventory-v328.py`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_DID_017_FICHAS_MODALIDADES_PARA_APRENDER.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.

## V331 ¬∑ matriz investigada de apuestas y lenguaje operativo

La prueba f√≠sica de **V330-R3 qued√≥ aprobada en iPhone**: al tocar `WOLF`, √∫nicamente Wolf permaneci√≥ verde, `RONDA NORMAL` se desmarc√≥ y la configuraci√≥n correcta se abri√≥. El defecto de selecci√≥n doble queda cerrado; Producci√≥n contin√∫a intacta y `PEND-SKI-006` sigue abierto para validar el funcionamiento completo de cada juego.

El nuevo `PEND-DID-017` exige una ficha independiente por cada modalidad y esquema: Ronda Normal, Stableford, Match Play, Four Ball, Pr√°ctica, Skins, Wolf, Vegas, Dots y variantes que cambian el c√°lculo. Cada hoja deber√° ser comprensible a los 10 a√±os, funcionar impresa en blanco y negro, incluir un ejemplo aritm√©tico completo, estrategia, estados, acumulados, liquidaci√≥n y glosario. La edad define s√≥lo la claridad did√°ctica: el dinero permanece siempre dentro del alcance general de cada hoja y cada grupo decide si lo liquida o juega √∫nicamente con puntos/unidades. La especificaci√≥n vive en `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_DID_017_FICHAS_MODALIDADES_PARA_APRENDER.md`.

V331 sustituye la presentaci√≥n m√≠nima de apuestas por una matriz operativa investigada. Wolf elimina la duplicidad confusa `Solo base`/`Lone` y conserva tres decisiones comprensibles: **Con pareja**, **Lobo solitario** y **Lobo ciego**. Registra si el Wolf sale primero o √∫ltimo, multiplicadores configurables, tope monetario por rival/hoyo, riesgo del Wolf, decisiones y scores pendientes, acumulados, unidades netas, dinero movido y liquidaci√≥n. Vegas explica c√≥mo 4 y 5 forman 45, maneja correctamente scores de 10 o m√°s ‚Äî10 y 4 forman 104‚Äî, permite acordar qu√© ocurre si ambas parejas hacen birdie y muestra por hoyo n√∫meros, volteos, √°guilas, topes, puntos movidos y saldos. Dots define cada t√©rmino en espa√±ol, mantiene apagadas las variantes que pueden duplicar eventos, separa puntos positivos/negativos, manuales/autom√°ticos y muestra el detalle de cada hoyo.

Las reglas universales no se inventan: las diferencias reales entre grupos quedan configurables y rotuladas. La base investigada utiliza 18Birdies y Wolf Golf Scorecard para Wolf; Mashie, 18Birdies y Golf Digest para Vegas; 18Birdies, MyScorecard y SCGA para Dots/Junk; USGA se conserva como autoridad del h√°ndicap y score deportivo. El dinero nunca modifica el score oficial.

Archivos exactos V331: `wolf.js`, `vegas.js`, `dots.js`, `index-grupal.html`, `card-artifacts.js`, `test-v330-side-games.mjs`, `service-worker.js`, `scripts/update-inventory-v328.py`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` y los bancos que fijan el identificador de build/cach√©. El corte visible es `V331-RESEARCHED-SIDE-GAMES-20260826` y la copia instalable usa `gscg-mobile-v331-researched-side-games`.

## V330 ¬∑ Skins, Wolf, Vegas, Dots y seis jugadores

**Hotfix V330-R3 despu√©s de rechazo f√≠sico:** la captura real de iPhone demostr√≥ que al elegir `WOLF` todav√≠a pod√≠an quedar verdes `RONDA NORMAL` y `WOLF`. V330-R2 queda rechazada. R3 incorpora un √∫nico escritor visual para las siete opciones, limpia configuraciones laterales m√∫ltiples heredadas, desmarca las otras seis antes de reconstruir la pantalla y vuelve a validar despu√©s del render. La cach√© instalable sube a `gscg-mobile-v330-side-games-r3`; `test-v330-side-games.mjs` simula exactamente el toque WOLF y exige `false` en Normal, Match Play, Four Ball, Skins, Vegas y Dots, con `true` √∫nicamente en Wolf.

**Pendientes registrados:** `PEND-UBI-015` separa la detecci√≥n autom√°tica del campo por GPS de clima/tr√°fico y de las distancias al green; `PEND-RSG-016` define la sincronizaci√≥n versionada de Reglas de Golf desde fuentes oficiales. Se crean las especificaciones `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_UBI_015_DETECCION_CAMPO_POR_GPS.md` y `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_RSG_016_SINCRONIZACION_REGLAS_GOLF.md`, y se actualizan `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md` y `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`.

**Voz pospuesta y registrada:** `PEND-VOZ-003` incorpora tres observaciones f√≠sicas nuevas sin declararlas implementadas: matriz obligatoria para respuestas estudiadas, profundas y formales; correcci√≥n del corte observado en la quinta conversaci√≥n; y avisos bilaterales exactos `ESCUCHANDO` / `RESPONDIENDO` en rojo parpadeante. Por orden del propietario, la ejecuci√≥n vuelve primero a la configuraci√≥n y prueba de SKINS, WOLF, VEGAS y DOTS.

El **26 de agosto de 2026** `PEND-SKI-006` pasa de dise√±o a implementaci√≥n comprobable. `skins.js`, `wolf.js`, `vegas.js` y `dots.js` son motores puros conectados al score oficial, no men√∫s de respuestas fijas. La ventana de opciones se divide en dos columnas ‚Äîmodalidades existentes a la izquierda y juegos nuevos a la derecha‚Äî y la pantalla principal de la tarjeta conserva su formato.

Skins opera Gross/Neto para dos a seis jugadores con unidad monetaria, carry, divisi√≥n o anulaci√≥n de empates. Wolf rota decisiones para tres a seis jugadores y no permite cierre con hoyos sin pareja/Solo/Lone/Blind. Vegas trabaja con cuatro o seis jugadores; la variante de seis usa tres parejas y comparaciones par a par. Dots permite activar y valorar eventos antes de jugar, mantiene apagadas por defecto las reglas de grupo `Amigo`, izquierda y derecha, y separa el saldo econ√≥mico del score deportivo. Match Play y Four Ball se ampl√≠an a las parejas Verde, Oro y Azul.

El cierre, correcci√≥n oficial, tarjetas Global/personales, Historial, consultas, sincronizaci√≥n y restauraci√≥n conservan los cuatro resultados en el snapshot firmado. `test-v329-skins.mjs` y `test-v330-side-games.mjs` cubren empates, X, l√≠mites, multiplicadores, tres parejas, cero-suma, bloqueo de cierre Wolf, correcci√≥n, artefactos, voz y persistencia. El banco local y el build real de Vercel aprobaron los 89 paquetes, el inventario de 322 fuentes, cero vulnerabilidades y la puerta viva de Reglas con modelo, b√∫squeda web, seis fuentes oficiales y `scoreChanged:false`. El Preview `dpl_4k5V9rFwkVXVwuRwktBjtgG4arAv` qued√≥ `READY` desde el commit remoto `ea18aafb214731d44b41ea069fe27228407f9f47`. Producci√≥n permanece intacta; faltan revisi√≥n visual/t√°ctil y ronda f√≠sica en iPhone.

Referencias profesionales consultadas: BirdieBet y Squabbit para Vegas; Wiz Golf, FLOG, Squabbit y Golf Monthly para Wolf; The 1st Tee para Dots. Las variantes que no son universales quedan rotuladas como reglas de grupo o adaptaci√≥n Golf Score Card GT.

Archivos funcionales V329/V330: `skins.js`, `wolf.js`, `vegas.js`, `dots.js`, `match-play.js`, `four-ball.js`, `index-grupal.html`, `round-closure.js`, `card-artifacts.js`, `card-library.js`, `historical-analytics.js`, `master-data-sync.js`, `account-backup.js`, `service-worker.js`, `scripts/build-mobile-web.mjs`, `vercel.json`, `audit-project.mjs`, `test-v329-skins.mjs` y `test-v330-side-games.mjs`. La documentaci√≥n, mapa, ambos ROADMAP, tres inventarios PDF y su sello se actualizan antes de Preview.

## V328-R2 ¬∑ Centro de Reglas de Golf oficial con respaldo b√°sico sin conexi√≥n

El **26 de agosto de 2026** comienza la ejecuci√≥n funcional de `PEND-REG-001`. La misma AI UNIVERSAL ‚àû incorpora un acceso global `REGLAS`, acepta situaciones por teclado o micr√≥fono, conserva campo y modalidad como contexto y consulta el modelo avanzado mediante `/api/golf-rules`. La herramienta limita t√©cnicamente la Web a los dominios oficiales `usga.org` y `randa.org`, exige una fuente oficial visible y usa la edici√≥n Rules of Golf 2023 con las clarificaciones vigentes; el corte comprobado es 1 de julio de 2026. No se copia el reglamento completo ni se afirma una alianza, licencia de marca o API privada.

La consulta se a√≠sla de todos los escritores locales: dentro de REGLAS no se ejecutan √≥rdenes de score y la respuesta nunca aplica penalidades, concede hoyos ni cierra rondas. `test-v328-official-golf-rules.mjs` cubre 15 situaciones y comprueba dominios, contexto, texto/voz y `scoreChanged:false`. El Preview V328-R1 (`dpl_3Sa4NnueMXBqB2kCm69WdwhH83bv`) qued√≥ `READY` con 86 paquetes, puerta viva aprobada y √°rbol remoto exacto `f0de0f6328c34ed2788faf1009ba04a19f47e6c1`. `test-v328-live-official-rules.mjs` se ejecuta dentro de cada build Vercel y exige una llamada real del modelo, b√∫squeda web efectiva, al menos una fuente USGA/The R&A y cero cambio de score.

V328-R2 agrega `golf-rules-offline.js`: guarda √∫nicamente respuestas que ya aprobaron el filtro oficial, retiene hasta 24 entradas durante 90 d√≠as, conserva tokens normalizados en vez de la pregunta completa, exige coincidencia suficiente y modalidad compatible, muestra la fecha y nunca inventa si no existe una respuesta adecuada. `test-v328-offline-official-rules.mjs` comprueba fuente, privacidad, l√≠mite, caducidad, cruces negativos, integraci√≥n PWA y cero escritura. Con este paquete la auditor√≠a maestra sube a 87 paquetes m√°s la puerta viva de Vercel. El manual visible y sus dos PDF conservan 74 p√°ginas, p√°gina 73 actualizada, 2160 √ó 4320 px y 300 dpi; el control visual completo debe aprobar antes de entregar. `PEND-REG-001` contin√∫a abierto s√≥lo para voz f√≠sica y una eventual integraci√≥n comercial/licenciada; no se declara alianza oficial.

Archivos exactos V328: `api/golf-rules.js`, `audit-project.mjs`, `index-grupal.html`, `service-worker.js`, `manual.html`, `scripts/update-manual-page-73.py`, `docs/manual/v311/manual-pages-17-35.json`, `docs/manual/v311/page-73.png`, `docs/manual/v311/Manual_Golf_Score_Card_GT_COMPLETO.pdf`, `docs/manual/v311/Manual_de_Funciones_Golf_Score_Card_GT_01-16.pdf`, `test-v328-official-golf-rules.mjs`, `test-v327-tool-followup-no-silence.mjs`, `test-v326-no-silent-conversation.mjs`, `test-v325-ideal-microphone-timings.mjs`, `test-v324-real-traffic.mjs`, `test-v323-long-multitopic-context.mjs`, `test-v322-real-sustained-caddie.mjs`, `test-v312-general-caddie.mjs`, `test-v307-match-arrows-format.mjs`, `test-v305-history-navigation-zero-error.mjs`, `test-v304-homogeneous-registration-actions.mjs`, `test-v290-brand-icons-cleanup.mjs`, `test-v284-native-package-generation.mjs`, `test-v281-pwa-installation.mjs`, `test-v280-local-history-insights.mjs`, `test-v279-local-card-library.mjs`, `test-v278-card-image-pdf-export.mjs`, `test-v277-official-round-corrections.mjs`, `test-v276-manual-hole-navigation.mjs`, `test-v275-stable-live-voice-turns.mjs`, `test-v274-complete-courses-voice-operations.mjs`, `test-v272-definitive-operational-release.mjs`, `test-stableford-ui.mjs`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`. Los tres inventarios PDF externos se regeneran y verifican antes del build.

Archivos adicionales del cierre V328-R1: `test-v328-live-official-rules.mjs` agrega la puerta real y `vercel.json` la vuelve obligatoria. Archivos adicionales V328-R2: `golf-rules-offline.js`, `test-v328-offline-official-rules.mjs`, `test-v321-ai-universal-infinity.mjs`, `service-worker.js`, `index-grupal.html`, `audit-project.mjs`, `scripts/update-manual-page-73.py`, `docs/manual/v311/manual-pages-17-35.json`, los artefactos de manual, `scripts/update-inventory-v328.py`, los cuatro documentos de control, el candado y ambos ROADMAP.

## Actualizaci√≥n de control V327-R1-PEND ¬∑ cola completa y ejecuci√≥n permanente

El **26 de agosto de 2026** el propietario ordena agregar y adaptar todos los pendientes, continuar sin solicitar autorizaciones intermedias y montar cada versi√≥n cuando est√© realmente probada. La instrucci√≥n no elimina las puertas de calidad: un solo `FAIL` conserva Producci√≥n intacta y ninguna licencia, credencial, contrato o integraci√≥n externa puede simularse. Las reglas permanentes 22‚Äì26 proh√≠ben trasladarle trabajo t√©cnico que las herramientas puedan resolver, dejarlo adivinando la siguiente acci√≥n, simular trabajo en segundo plano o exigirle mensajes repetidos de `sigue`; todo reporte debe cerrar con una asignaci√≥n inequ√≠voca.

La cola vigente distingue lo entregado de lo abierto y agrega los faltantes expresamente acordados: h√°ndicap oficial ASOGOLF/GHIN con √≠ndice interno separado; campos mundiales con datos oficiales; GPS deportivo por hoyo; Skins, Wolf, Vegas, Amigo, izquierda/derecha y Dots con unidad en quetzales; Apple Watch primero y Wear OS despu√©s; nube, cuentas, seguridad, estad√≠sticas avanzadas, monetizaci√≥n y certificaci√≥n integral. Permanecen adem√°s USGA/Reglas de Golf, clima completo en artefactos, Gu√≠a R√°pida, tr√°fico comparado y AI UNIVERSAL ‚àû.

V327-R1 ya aprob√≥ en Preview 85 paquetes, 310 fuentes, 44 llamadas reales, 24 materias, ocho turnos con memoria, 550 transiciones herramienta‚Üívoz y cero errores 5xx. La puerta inmediata sigue siendo una conversaci√≥n f√≠sica prolongada en iPhone; s√≥lo despu√©s de su PASS se permite montar y continuar autom√°ticamente con el siguiente pendiente ejecutable.

Archivos exactos V327-R1-PEND: `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/DIRECTRICES_MANDATORIAS.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`. Tambi√©n se regeneran y verifican `Inventario_Golf_Score_Card_GT_OVERALL_V311.pdf`, `Inventario_Golf_Score_Card_GT_A_DETALLE_V311.pdf` e `Inventario_Golf_Score_Card_GT_POR_IMAGENES_Y_RUBROS_V311.pdf`.

## Correcci√≥n controlada V327 ¬∑ la herramienta siempre regresa a la voz

La prueba f√≠sica rechaz√≥ V326-R2 despu√©s de aproximadamente seis preguntas: una investigaci√≥n sobre una persona conocida en Colima y una consulta de tr√°fico pod√≠an completar su API con HTTP 200, pero el tel√©fono quedaba rojo escuchando sin pronunciar el resultado. No era un vocabulario tem√°tico reducido: `search_live_web` s√≠ recibi√≥ la consulta y devolvi√≥ datos; el corte estaba en la transici√≥n as√≠ncrona `herramienta ‚Üí segunda respuesta ‚Üí audio` de Realtime en iPhone.

V327 conserva la AI universal sin cat√°logo y corrige cuatro estados: `speech_stopped` mantiene el guardi√°n hasta la transcripci√≥n final; un `output_audio_buffer.stopped` tard√≠o y sin identificador ya no desautoriza el audio final antes de que empiece; la reproducci√≥n conserva un guardi√°n de 60 segundos hasta su cierre; y una herramienta cuyo canal se perdi√≥ produce recuperaci√≥n visible en vez de regresar en silencio. `api/voice-health.js` registra √∫nicamente eventos t√©cnicos permitidos, n√∫mero de turno, etapa y tiempo ‚Äînunca preguntas, transcripciones, nombres, ubicaciones ni claves‚Äî para que una nueva anomal√≠a f√≠sica sea diagnosticable.

El banco dirigido ejecuta 550 secuencias herramienta‚Üívoz, 100 eventos de privacidad, 30 turnos bilaterales y las rutas anteriores. La consulta directa `El Pult√© Golf ‚Üí Pradera Concepci√≥n` devolvi√≥ una ruta real v√°lida de 15 km y aproximadamente 33 minutos en el instante de prueba; un destino que s√≥lo diga `Concepci√≥n` debe provocar una sola pregunta breve de aclaraci√≥n. Producci√≥n contin√∫a intacta y V327 no queda autorizada para montaje hasta terminar la regresi√≥n completa, desplegar Preview y aprobar otra conversaci√≥n f√≠sica prolongada en iPhone.

Archivos exactos V327: `index-grupal.html`, `api/_lib/traffic.js`, `api/universal-ai.js`, `api/voice-health.js`, `service-worker.js`, `audit-project.mjs`, `test-v327-tool-followup-no-silence.mjs`, `test-v326-no-silent-conversation.mjs`, `test-v325-ideal-microphone-timings.mjs`, `test-v324-real-traffic.mjs`, `test-v323-long-multitopic-context.mjs`, `test-v322-real-sustained-caddie.mjs`, `test-v312-general-caddie.mjs`, `test-stableford-ui.mjs`, `test-v272-definitive-operational-release.mjs`, `test-v274-complete-courses-voice-operations.mjs`, `test-v275-stable-live-voice-turns.mjs`, `test-v276-manual-hole-navigation.mjs`, `test-v277-official-round-corrections.mjs`, `test-v278-card-image-pdf-export.mjs`, `test-v279-local-card-library.mjs`, `test-v280-local-history-insights.mjs`, `test-v281-pwa-installation.mjs`, `test-v284-native-package-generation.mjs`, `test-v290-brand-icons-cleanup.mjs`, `test-v304-homogeneous-registration-actions.mjs`, `test-v305-history-navigation-zero-error.mjs`, `test-v307-match-arrows-format.mjs`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`.

## Control de entrega V326-R1 ¬∑ redespliegue para cargar tr√°fico

El usuario confirm√≥ que la credencial de tr√°fico podr√≠a haber quedado habilitada. El despliegue V326 original no se reutiliza para aprobarla porque las variables de entorno se fijan al construir cada deployment. Se provoc√≥ un redespliegue sin modificar el c√≥digo funcional; el primer intento qued√≥ correctamente bloqueado por `ROADMAP GATE` al no registrar el movimiento en ambos ROADMAPS. V326-R1 registra ese intento, conserva producci√≥n V322 intacta y ordena construir de nuevo Preview antes de ejecutar la ruta real El Pult√© ‚Üí colonia Oakland zona 10 para ma√±ana a las 12:30 PM.

La aprobaci√≥n contin√∫a prohibida hasta que el nuevo Preview devuelva ETA, duraci√≥n sin tr√°fico, demora, distancia y hora de c√°lculo desde Google Maps Routes, y hasta completar la conversaci√≥n f√≠sica prolongada en iPhone. Archivos exactos V326-R1: `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.

La primera construcci√≥n documentada de V326-R1 confirm√≥ que `GOOGLE_MAPS_API_KEY` ya estaba presente en Preview: el test de ausencia recibi√≥ `TRAFFIC_ROUTE_UNAVAILABLE` en vez de `TRAFFIC_NOT_CONFIGURED`. El bloqueo pertenec√≠a al aislamiento del test, que pasaba una cadena vac√≠a y permit√≠a por error el fallback hacia la credencial real. Se sustituy√≥ √∫nicamente ese valor inyectado por espacio en blanco, que se recorta a vac√≠o sin consultar la red; la l√≥gica funcional de tr√°fico permanece id√©ntica.

## Correcci√≥n controlada V326 ¬∑ ning√∫n turno puede quedar rojo y mudo

La prueba f√≠sica en iPhone rechaz√≥ V325: despu√©s de preguntas sobre tr√°fico futuro y consumo el√©ctrico, el micr√≥fono permanec√≠a rojo y abierto sin producir una reacci√≥n. Los registros confirmaron que WebRTC s√≠ abr√≠a, pero el cierre del turno no alcanzaba las herramientas ni la respuesta. La causa fue `semantic_vad` con urgencia baja sin un l√≠mite temporal anterior a `speech_stopped`; el watchdog existente comenzaba demasiado tarde y no pod√≠a recuperar ese estado.

V326 usa para conversaci√≥n un `server_vad` independiente con umbral 0.2, prefijo de 700 ms y 2,200 ms de silencio. Es m√°s paciente que las √≥rdenes de la aplicaci√≥n, que conservan 1,000 ms, pero siempre posee un final determinista. Un guardi√°n de entrada se renueva con los deltas parciales y, si no existe ning√∫n evento durante 15 segundos, desmonta la captura atascada y apaga el rojo con una instrucci√≥n visible; mantiene un l√≠mite duro de 90 segundos por turno. Un segundo guardi√°n recupera a los 30 segundos una respuesta del modelo que no haya comenzado. Los c√°lculos estables y aproximados, como el consumo el√©ctrico de un aire acondicionado, se responden directamente con supuestos en vez de abrir una b√∫squeda web innecesaria.

`test-v326-no-silent-conversation.mjs` ejecuta la m√°quina de temporizadores y comprueba recuperaci√≥n real de estado, adem√°s de 30 alternancias entre conversaci√≥n y √≥rdenes. V325 queda rechazada y V326 contin√∫a sin autorizaci√≥n de montaje hasta repetir las dos preguntas exactas y una conversaci√≥n f√≠sica prolongada en iPhone. Tr√°fico tampoco queda aprobado mientras Preview responda `TRAFFIC_NOT_CONFIGURED` y falte la comparaci√≥n simult√°nea en Guatemala.

Archivos exactos V326: `index-grupal.html`, `service-worker.js`, `audit-project.mjs`, `test-v326-no-silent-conversation.mjs`, `test-v325-ideal-microphone-timings.mjs`, `test-v324-real-traffic.mjs`, `test-v323-long-multitopic-context.mjs`, `test-v322-real-sustained-caddie.mjs`, `test-v312-general-caddie.mjs`, `test-stableford-ui.mjs`, `test-v272-definitive-operational-release.mjs`, `test-v274-complete-courses-voice-operations.mjs`, `test-v275-stable-live-voice-turns.mjs`, `test-v276-manual-hole-navigation.mjs`, `test-v277-official-round-corrections.mjs`, `test-v278-card-image-pdf-export.mjs`, `test-v279-local-card-library.mjs`, `test-v280-local-history-insights.mjs`, `test-v281-pwa-installation.mjs`, `test-v284-native-package-generation.mjs`, `test-v290-brand-icons-cleanup.mjs`, `test-v304-homogeneous-registration-actions.mjs`, `test-v305-history-navigation-zero-error.mjs`, `test-v307-match-arrows-format.mjs`, `GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`.

## Integraci√≥n controlada V325 ¬∑ tiempos ideales del micr√≥fono bilateral

V325 separa por intenci√≥n los tiempos de escucha. Las √≥rdenes de registro, navegaci√≥n y score conservan `server_vad` con umbral 0.2, prefijo de 700 ms y 1,000 ms de silencio para respuesta r√°pida. AI UNIVERSAL ‚àû cambia a `semantic_vad` con urgencia baja, por lo que una pausa natural no corta autom√°ticamente la idea. La sesi√≥n valida el perfil confirmado antes de responder, serializa cambios concurrentes y vuelve al perfil operativo cuando detecta una acci√≥n propia de la tarjeta.

La conversaci√≥n conserva micr√≥fono vivo durante la respuesta, interrupci√≥n confirmada despu√©s de 250 ms y ocho caracteres, protecci√≥n de eco por 1,800 ms, reescucha inmediata, watchdog de diez segundos y cierre √∫nicamente tras 30 minutos completos sin actividad. La prueba V325 compila el JavaScript completo y simula 30 alternancias conversaci√≥n/orden. Esto no sustituye la conversaci√≥n f√≠sica prolongada en iPhone; el corte sigue sin autorizaci√≥n de montaje. Tambi√©n quedan registrados como pendientes el enlace oficial/autorizado con USGA y Reglas de Golf, la modalidad Skins y Apple Watch/Wear OS.

Archivos exactos V325: `index-grupal.html`, `service-worker.js`, `audit-project.mjs`, `test-v325-ideal-microphone-timings.mjs`, `test-v324-real-traffic.mjs`, `test-v323-long-multitopic-context.mjs`, `test-v322-real-sustained-caddie.mjs`, `test-v312-general-caddie.mjs`, `test-stableford-ui.mjs`, `test-v272-definitive-operational-release.mjs`, `test-v274-complete-courses-voice-operations.mjs`, `test-v275-stable-live-voice-turns.mjs`, `test-v276-manual-hole-navigation.mjs`, `test-v277-official-round-corrections.mjs`, `test-v278-card-image-pdf-export.mjs`, `test-v279-local-card-library.mjs`, `test-v280-local-history-insights.mjs`, `test-v281-pwa-installation.mjs`, `test-v284-native-package-generation.mjs`, `test-v290-brand-icons-cleanup.mjs`, `test-v304-homogeneous-registration-actions.mjs`, `test-v305-history-navigation-zero-error.mjs`, `test-v307-match-arrows-format.mjs`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`.

## Integraci√≥n controlada V324 ¬∑ tr√°fico real dentro de AI UNIVERSAL ‚àû

V324 incorpora tr√°fico vehicular actual y proyectado a la misma conversaci√≥n universal. Una consulta por voz o texto se clasifica como tr√°fico, obtiene origen escrito o GPS ef√≠mero, exige destino suficiente y llama desde servidor a Google Maps Routes con `TRAFFIC_AWARE_OPTIMAL`. La respuesta separa los datos del proveedor ‚ÄîETA, duraci√≥n sin tr√°fico y distancia‚Äî de la clasificaci√≥n de congesti√≥n derivada. No muestra mapa, no devuelve coordenadas y no afirma integraci√≥n con Waze.

La prueba V324 cubre salida inmediata y futura, huso horario, ETA, demora, distancia, privacidad, origen faltante, destino faltante, credencial ausente, proveedor ca√≠do, timeout, solicitud autom√°tica de GPS, funci√≥n de modelo en dos pasos, texto, voz y continuidad recuperable. Este corte es c√≥digo candidato: permanece expresamente sin aprobaci√≥n de montaje hasta activar credencial/facturaci√≥n y completar en Guatemala la comparaci√≥n simult√°nea contra Waze y la conversaci√≥n prolongada en iPhone.

Archivos exactos V324: `api/_lib/traffic.js`, `api/traffic.js`, `api/universal-ai.js`, `index-grupal.html`, `service-worker.js`, `audit-project.mjs`, `test-v324-real-traffic.mjs`, `test-v323-long-multitopic-context.mjs`, `test-v322-real-sustained-caddie.mjs`, `test-v321-ai-universal-infinity.mjs`, `test-v312-general-caddie.mjs`, `test-stableford-ui.mjs`, `test-v272-definitive-operational-release.mjs`, `test-v274-complete-courses-voice-operations.mjs`, `test-v275-stable-live-voice-turns.mjs`, `test-v276-manual-hole-navigation.mjs`, `test-v277-official-round-corrections.mjs`, `test-v278-card-image-pdf-export.mjs`, `test-v279-local-card-library.mjs`, `test-v280-local-history-insights.mjs`, `test-v281-pwa-installation.mjs`, `test-v284-native-package-generation.mjs`, `test-v290-brand-icons-cleanup.mjs`, `test-v304-homogeneous-registration-actions.mjs`, `test-v305-history-navigation-zero-error.mjs`, `test-v307-match-arrows-format.mjs`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`.

## Correcci√≥n operativa V323 ¬∑ conversaci√≥n multitema prolongada

V323 corrige una p√©rdida de contexto reproducida en producci√≥n: la comunicaci√≥n continuaba, pero al turno 15 AI UNIVERSAL ‚àû ya no recordaba una clave expresamente indicada al inicio. El l√≠mite efectivo era de 8 intercambios para texto y s√≥lo 3 para el contexto compartido con voz. Ahora texto, voz y servidor conservan hasta 80 mensajes ‚Äî40 intercambios completos‚Äî, suficiente para la nueva prueba de 30 temas y 63 mensajes sin perder `ORQU√çDEA 47`.

La prueba `test-v323-long-multitopic-context.mjs` reproduce cambios consecutivos entre lluvia, salud, viajes, medicamentos, golf, tecnolog√≠a, cocina, filosof√≠a, ciencias, idiomas y otros temas; exige que el primer dato siga disponible en la √∫ltima pregunta, valida la misma memoria en texto y voz, y comprueba el descarte controlado √∫nicamente al superar 80 mensajes.

Archivos V323: `api/universal-ai.js`, `index-grupal.html`, `service-worker.js`, `audit-project.mjs`, `test-v323-long-multitopic-context.mjs`, `test-v322-real-sustained-caddie.mjs`, `test-v312-general-caddie.mjs`, `test-stableford-ui.mjs`, `test-v272-definitive-operational-release.mjs`, `test-v274-complete-courses-voice-operations.mjs`, `test-v275-stable-live-voice-turns.mjs`, `test-v276-manual-hole-navigation.mjs`, `test-v277-official-round-corrections.mjs`, `test-v278-card-image-pdf-export.mjs`, `test-v279-local-card-library.mjs`, `test-v280-local-history-insights.mjs`, `test-v281-pwa-installation.mjs`, `test-v284-native-package-generation.mjs`, `test-v290-brand-icons-cleanup.mjs`, `test-v304-homogeneous-registration-actions.mjs`, `test-v305-history-navigation-zero-error.mjs`, `test-v307-match-arrows-format.mjs`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`.

## Correcci√≥n operativa V322 ¬∑ conversaci√≥n sostenida y recuperaci√≥n comprobable

V322 integra sin perder la AI UNIVERSAL ‚àû de V321 la correcci√≥n del fallo observado en iPhone: el micr√≥fono ya no se cierra tres segundos despu√©s de una respuesta ni destruye una sesi√≥n WebRTC sana al tocarlo nuevamente. La escucha permanece activa entre turnos y s√≥lo se apaga despu√©s de 30 minutos completos sin actividad. Si falta una transcripci√≥n final, Inicio y Tarjeta salen del estado bloqueado y regresan a `‚óè ESCUCHANDO`.

La investigaci√≥n web dispone de 40 segundos en servidor y 45 segundos en cliente. √âxito, timeout, proveedor no disponible o respuesta vac√≠a producen siempre una salida utilizable; un fallo recuperable no apaga el transporte de voz ni deja al usuario sin respuesta. `test-v322-real-sustained-caddie.mjs` simula 24 turnos consecutivos, reapertura, cierre reglamentario y los distintos resultados del servicio; la auditor√≠a maestra conserva adem√°s las 200 √°reas y las modalidades completas.

Archivos: `index-grupal.html`, `api/research.js`, `service-worker.js`, `audit-project.mjs`, `test-v322-real-sustained-caddie.mjs`, `test-v321-ai-universal-infinity.mjs`, `test-v312-general-caddie.mjs`, los candados de build/cach√©, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`.

## Actualizaci√≥n operativa V321 ¬∑ AI UNIVERSAL ‚àû

AI UNIVERSAL ‚àû queda integrada mediante API de modelo avanzado, con voz y texto, contexto temporal compartido, b√∫squeda Web para datos cambiantes, idioma autom√°tico, respuesta escrita y hablada, separaci√≥n entre √≥rdenes locales y consultas generales, y controles `ESCUCHAR`, `DETENER`, `REPETIR`, `SILENCIAR` y `CONTINUAR`. Las 200 √°reas verificadas son pruebas, nunca una lista l√≠mite. El Manual conserva la portada como primera p√°gina y documenta la funci√≥n en la p√°gina 73.

Revisi√≥n final publicada: el √≠ndice y el encabezado del visor nombran la p√°gina 73 como **AI UNIVERSAL ‚àû**, y la prueba V321 bloquea cualquier regreso al t√≠tulo anterior.

| Archivo | Registro V321 |
|---|---|
| `api/universal-ai.js` | Endpoint real de AI UNIVERSAL ‚àû con Responses API, modelo avanzado, contexto, Web, fuentes y `store:false`. |
| `api/session-grupal.js` | Realtime conserva Golf y habilita detecci√≥n autom√°tica del idioma hablado. |
| `index-grupal.html` | Panel AI ‚àû, teclado, respuestas escritas, contexto voz-texto, clasificaci√≥n orden/pregunta y cinco controles. |
| `service-worker.js` | Cach√© V321 para entregar inmediatamente la integraci√≥n. |
| `audit-project.mjs` | Incorpora la bater√≠a obligatoria V321. |
| `test-v321-ai-universal-infinity.mjs` | Verifica API real, 200 √°reas sin lista cerrada, texto, voz, contexto, Web y controles. |
| `test-v267-one-operational-line.mjs` | Alinea el contrato de transcripci√≥n con idioma autom√°tico. |
| `test-v271-realtime-prompt-limit.mjs` | Conserva el l√≠mite Realtime con idioma autom√°tico. |
| `test-v312-general-caddie.mjs` | Ampl√≠a la verificaci√≥n universal a idioma autom√°tico y cach√© V321. |
| `test-stableford-ui.mjs` | Alinea el build esperado con V321. |
| `test-v272-definitive-operational-release.mjs` | Alinea el build esperado con V321. |
| `test-v274-complete-courses-voice-operations.mjs` | Alinea el build esperado con V321. |
| `test-v275-stable-live-voice-turns.mjs` | Alinea el build esperado con V321. |
| `test-v276-manual-hole-navigation.mjs` | Alinea el build esperado con V321. |
| `test-v277-official-round-corrections.mjs` | Alinea el build esperado con V321. |
| `test-v278-card-image-pdf-export.mjs` | Alinea el build esperado con V321. |
| `test-v279-local-card-library.mjs` | Alinea el build esperado con V321. |
| `test-v280-local-history-insights.mjs` | Alinea el build esperado con V321. |
| `test-v281-pwa-installation.mjs` | Alinea la cach√© instalable esperada con V321. |
| `test-v284-native-package-generation.mjs` | Alinea el paquete web esperado con V321. |
| `test-v290-brand-icons-cleanup.mjs` | Alinea el build esperado con V321. |
| `test-v304-homogeneous-registration-actions.mjs` | Alinea el build esperado con V321. |
| `test-v305-history-navigation-zero-error.mjs` | Alinea el build esperado con V321. |
| `test-v307-match-arrows-format.mjs` | Alinea el build esperado con V321. |
| `GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md` | Registra la especificaci√≥n y estado operativo de AI UNIVERSAL ‚àû. |
| `MANUAL_COBERTURA_FUNCIONAL_V311.md` | Ubica AI UNIVERSAL ‚àû en la p√°gina 73 y su prueba t√©cnica. |
| `docs/manual/v311/manual-pages-17-35.json` | Explicaci√≥n para un ni√±o de diez a√±os: voz, texto, √≥rdenes, contexto y l√≠mites reales. |
| `scripts/update-manual-page-73.py` | Genera la p√°gina 73 V321 sin alterar portada ni p√°ginas anteriores. |
| `docs/manual/v311/page-73.png` | Imagen 4K verificada de AI UNIVERSAL ‚àû. |
| `docs/manual/v311/Manual_Golf_Score_Card_GT_COMPLETO.pdf` | Manual completo actualizado; portada primero y p√°gina 73 AI UNIVERSAL ‚àû. |
| `docs/manual/v311/Manual_de_Funciones_Golf_Score_Card_GT_01-16.pdf` | Alias PDF completo actualizado con el mismo orden correcto. |
| `test-v311-manual-semantic-coverage.mjs` | Exige la explicaci√≥n V321 y los cinco controles en el Manual. |
| `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` | Sello de inventario recalculado sobre las fuentes V321. |

## Golf Score Card GT

Este es el mapa general y sencillo del proyecto. El nombre comercial √∫nico es **Golf Score Card GT**.

Los nombres `EPG-CADDY`, `epg-caddy`, `EPGCaddy` y `com.epgcaddy.app` s√≥lo permanecen como c√≥digos internos antiguos porque cambiarlos romper√≠a enlaces, publicaciones o la identidad futura de las apps. No se muestran como nombre comercial al consumidor.

## Estado actual

- Corte consolidado de este inventario: **V311 ¬∑ 25 de agosto de 2026**.
- C√≥digo oficial GitHub en `main`: `e938fd4d1f1815fdfac3a4babc68c3beedfd96c5`.
- Vercel: **READY**.
- Publicaci√≥n Vercel vigente: `dpl_FkfVRcQVUK8AnWdgtW5gU6eG9KEh`.
- Aplicaci√≥n oficial: https://epg-caddy.vercel.app/
- Errores de publicaci√≥n actuales: **0**.
- Advertencias actuales: **0**.
- Auditor√≠a maestra: **PASS ¬∑ 69 paquetes**.

## Aplicaci√≥n Apple y Android

- Nombre visible: **Golf Score Card GT**.
- Identidad t√©cnica compartida: `com.epgcaddy.app`.
- Versi√≥n m√≥vil preparada: `0.9.0`.
- N√∫mero de paquete preparado: `290`.
- Paquete para iPhone: preparado para Xcode y futura firma.
- Paquete para Android: preparado para Android Studio y futura firma.
- Compras y suscripciones: ruta preparada con RevenueCat.
- Icono App Store: 1024 √ó 1024.
- Icono Google Play: 512 √ó 512.
- Iconos PWA: 512 √ó 512 y 192 √ó 192.
- Icono de acceso directo Apple: 180 √ó 180.

## Organizaci√≥n actual

- Archivos activos rastreados en Git al corte V311: **197**.
- Base visual original V292: **160 archivos activos** distribuidos en nueve p√°ginas.
- Continuaci√≥n documentada despu√©s de crear la base visual: **V294 a V311**.
- Corte solicitado para revisi√≥n: **desde la l√≠nea 160 hacia abajo se considera nuevo**.
- Archivos de la colecci√≥n `ROADMAP_IMAGES`: **22**.
- Archivos hist√≥ricos retirados del uso diario: **89**.
- Procesos autom√°ticos actuales conservados: **4**.
- Ramas GitHub inventariadas: **80**.
- Ramas ya incluidas en main: **70**.
- Ramas con cambios propios conservadas: **9**.
- Publicaciones Vercel de la base visual hist√≥rica: **622**; los despliegues V306-V311 quedan identificados en la continuaci√≥n documental.
- Base central preparada: **22 grupos de informaci√≥n**.
- Nombres internos de guardado en el tel√©fono identificados: **14**.

## Limpieza completada

- Retirados 88 procesos autom√°ticos hist√≥ricos.
- Retirado un script antiguo V112.
- Todo permanece recuperable en el historial de GitHub.
- El nombre visible EPG Caddy fue sustituido por Golf Score Card GT.
- README, documentaci√≥n, PWA, Apple, Android y procesos actuales usan la marca oficial.
- Los iconos oficiales quedaron centralizados dentro de `assets/official-logos/`.
- La instalaci√≥n de Vercel qued√≥ sin errores ni advertencias.

## Mapas detallados

- [ROADMAP A DETALLE ¬∑ Directorio visual en nueve p√°ginas](ROADMAP_A_DETALLE.md)
- [Mapa de todos los archivos](CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md)
- [Mapa de GitHub, Vercel, Apple, Android y datos](CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_INFRAESTRUCTURA.md)
- [Inventario de publicaciones Vercel](CONTROL_PROYECTO_SCIRE/INVENTARIO_DESPLIEGUES_VERCEL.md)
- [√çndice de logos oficiales](assets/official-logos/README.md)

## Im√°genes l√≠nea por l√≠nea

- [01 ¬∑ Archivos activos](ROADMAP_IMAGES/01_ARCHIVOS_ACTIVOS_COMPLETO.png)
- [02 ¬∑ Archivos retirados](ROADMAP_IMAGES/02_ARCHIVOS_RETIRADOS_COMPLETO.png)
- [03 ¬∑ Infraestructura e IDs](ROADMAP_IMAGES/03_INFRAESTRUCTURA_COMPLETO.png)
- [04 ¬∑ Ramas GitHub](ROADMAP_IMAGES/04_RAMAS_GITHUB_COMPLETO.png)
- [05A ¬∑ Vercel ¬∑ publicaciones 1 a 78](ROADMAP_IMAGES/05_VERCEL_01_A_COMPLETO.png)
- [05B ¬∑ Vercel ¬∑ publicaciones 79 a 156](ROADMAP_IMAGES/05_VERCEL_01_B_COMPLETO.png)
- [06A ¬∑ Vercel ¬∑ publicaciones 157 a 234](ROADMAP_IMAGES/06_VERCEL_02_A_COMPLETO.png)
- [06B ¬∑ Vercel ¬∑ publicaciones 235 a 312](ROADMAP_IMAGES/06_VERCEL_02_B_COMPLETO.png)
- [07A ¬∑ Vercel ¬∑ publicaciones 313 a 390](ROADMAP_IMAGES/07_VERCEL_03_A_COMPLETO.png)
- [07B ¬∑ Vercel ¬∑ publicaciones 391 a 468](ROADMAP_IMAGES/07_VERCEL_03_B_COMPLETO.png)
- [08A ¬∑ Vercel ¬∑ publicaciones 469 a 545](ROADMAP_IMAGES/08_VERCEL_04_A_COMPLETO.png)
- [08B ¬∑ Vercel ¬∑ publicaciones 546 a 622](ROADMAP_IMAGES/08_VERCEL_04_B_COMPLETO.png)
- [√çndice de la colecci√≥n visual](ROADMAP_IMAGES/README.md)

## Punto de corte del directorio

- Punto de activaci√≥n original: **l√≠nea 183**.
- Registro vigente despu√©s de instalar el candado: **l√≠nea 185**.
- Activaci√≥n de seguimiento obligatorio: **23 de agosto de 2026, 17:05:00, hora de Guatemala**.
- Desde este punto, cualquier creaci√≥n, modificaci√≥n, cambio de nombre, movimiento o eliminaci√≥n se registra directamente y dentro de la misma versi√≥n en **ROADMAP OVERALL** y **ROADMAP A DETALLE**.

## Registro obligatorio V294 ¬∑ Candado t√©cnico

| Archivo o modificaci√≥n | Qu√© qued√≥ registrado |
|---|---|
| `.github/workflows/ios-build.yml` | La construcci√≥n de iPhone exige primero ambos ROADMAPS. |
| `.github/workflows/ios-testflight.yml` | La preparaci√≥n para TestFlight exige primero ambos ROADMAPS. |
| `.github/workflows/mobile-native-package.yml` | El paquete Apple/Android se bloquea si los ROADMAPS est√°n incompletos. |
| `.github/workflows/roadmap-gate.yml` | Nuevo control autom√°tico obligatorio en GitHub. |
| `.github/workflows/stableford-tournament-pass.yml` | Las pruebas de Stableford exigen primero ambos ROADMAPS. |
| `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/DIRECTRICES_MANDATORIAS.md` | Norma permanente, l√≠nea de corte y hora de activaci√≥n. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | C√≥digos y archivos del directorio actualizados. |
| `ROADMAP_IMAGES/ROADMAP_A_DETALLE_01.png` | P√°gina visual 1 de 9. |
| `ROADMAP_IMAGES/ROADMAP_A_DETALLE_02.png` | P√°gina visual 2 de 9. |
| `ROADMAP_IMAGES/ROADMAP_A_DETALLE_03.png` | P√°gina visual 3 de 9. |
| `ROADMAP_IMAGES/ROADMAP_A_DETALLE_04.png` | P√°gina visual 4 de 9. |
| `ROADMAP_IMAGES/ROADMAP_A_DETALLE_05.png` | P√°gina visual 5 de 9. |
| `ROADMAP_IMAGES/ROADMAP_A_DETALLE_06.png` | P√°gina visual 6 de 9. |
| `ROADMAP_IMAGES/ROADMAP_A_DETALLE_07.png` | P√°gina visual 7 de 9. |
| `ROADMAP_IMAGES/ROADMAP_A_DETALLE_08.png` | P√°gina visual 8 de 9. |
| `ROADMAP_IMAGES/ROADMAP_A_DETALLE_09.png` | P√°gina visual 9 de 9. |
| `audit-project.mjs` | La auditor√≠a maestra ejecuta primero el candado. |
| `package.json` | Agrega el comando `roadmap:gate`. |
| `scripts/roadmap-gate.mjs` | Comprueba que cada cambio aparezca en ambos ROADMAPS. |

## Refuerzo t√©cnico V295 ¬∑ Publicaci√≥n tambi√©n bloqueada

| Archivo o modificaci√≥n | Qu√© qued√≥ registrado |
|---|---|
| `vercel.json` | Vercel ejecuta obligatoriamente el candado antes de publicar. |
| `scripts/roadmap-gate.mjs` | Si Vercel no puede identificar los cambios, la publicaci√≥n queda bloqueada por seguridad. |
| `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/DIRECTRICES_MANDATORIAS.md` | La publicaci√≥n de Vercel se incorpora a la norma permanente. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Registra los c√≥digos y explicaciones actualizados. |
| `ROADMAP_A_DETALLE.md` | Guarda el refuerzo dentro del directorio detallado. |
| `ROADMAP_OVERALL.md` | Guarda el refuerzo dentro de este resumen general. |

## Ajuste de publicaci√≥n V296 ¬∑ Salida Vercel

| Archivo o modificaci√≥n | Qu√© qued√≥ registrado |
|---|---|
| `vercel.json` | Conserva el candado y se√±ala correctamente la carpeta que Vercel debe publicar. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Actualiza el c√≥digo y la explicaci√≥n del ajuste. |
| `ROADMAP_A_DETALLE.md` | Guarda el ajuste dentro del directorio detallado. |
| `ROADMAP_OVERALL.md` | Guarda el ajuste dentro de este resumen general. |

## Actualizaci√≥n operativa V297 ¬∑ Icono cromado 3D ne√≥n y micr√≥fono compacto

Autorizaci√≥n recibida el **24 de agosto de 2026** para instalar como icono oficial la versi√≥n cuadrada cromada, con relieve profundo, apariencia de metal troquelado y verde ne√≥n muy saturado. Tambi√©n se reduce 50 % el di√°metro visible del micr√≥fono de registro y se coloca una figura clara de micr√≥fono en el centro. No cambia su funcionamiento ni su √°rea c√≥moda de toque.

| Archivo o modificaci√≥n | Qu√© queda registrado |
|---|---|
| `7B1C43A7-EB8A-43CB-B03E-0CAE9273F2A2.jpeg` | Fuente cuadrada hist√≥rica actualizada con el logo autorizado, conservando su nombre t√©cnico. |
| `assets/logo.png` | Fuente operativa de 1024 √ó 1024 para los paquetes Apple y Android. |
| `assets/official-logos/README.md` | Identifica la nueva versi√≥n cromada 3D como oficial. |
| `assets/official-logos/golf-score-card-gt-app-store-1024.png` | Icono preparado para App Store. |
| `assets/official-logos/golf-score-card-gt-apple-touch-180.png` | Icono preparado para el acceso directo de iPhone y iPad. |
| `assets/official-logos/golf-score-card-gt-google-play-512.png` | Icono preparado para Google Play. |
| `assets/official-logos/golf-score-card-gt-official-master-1254.jpeg` | Copia maestra oficial en m√°xima medida. |
| `assets/official-logos/golf-score-card-gt-pwa-192.png` | Icono peque√±o de la aplicaci√≥n instalable. |
| `assets/official-logos/golf-score-card-gt-pwa-512.png` | Icono grande de la aplicaci√≥n instalable. |
| `index-grupal.html` | Micr√≥fono de registro 50 % m√°s peque√±o, con s√≠mbolo central claro para el usuario nuevo. |
| `mobile-release.json` | N√∫mero de paquete preparado actualizado a V297. |
| `service-worker.js` | Cach√© renovada para entregar el icono V297 y retirar el anterior. |
| `test-v290-brand-icons-cleanup.mjs` | Comprobaci√≥n operativa alineada con el paquete y la cach√© V297. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | C√≥digos, tama√±os y explicaciones de los archivos actualizados. |
| `ROADMAP_A_DETALLE.md` | Registro detallado obligatorio de esta modificaci√≥n. |
| `ROADMAP_OVERALL.md` | Registro general obligatorio de esta modificaci√≥n. |

## Actualizaci√≥n operativa V298 ¬∑ Instrucciones de registro para newbies

Autorizaci√≥n recibida el **24 de agosto de 2026** para sustituir √∫nicamente los textos situados arriba del micr√≥fono por una gu√≠a m√°s grande, alineada a la izquierda y ordenada: **DICTA O ESCRIBE, 1-NOMBRE, 2-HDCP, 3-MARCAS, DE CADA JUGADOR, 4-OK**. El micr√≥fono y el registro conservan exactamente su funcionamiento.

| Archivo o modificaci√≥n | Qu√© queda registrado |
|---|---|
| `index-grupal.html` | Muestra la gu√≠a para usuarios nuevos en el orden autorizado, a la izquierda y con letra mayor. |
| `mobile-release.json` | N√∫mero de paquete preparado actualizado a V298. |
| `service-worker.js` | Cach√© V298 para entregar inmediatamente las instrucciones nuevas. |
| `test-v290-brand-icons-cleanup.mjs` | Comprueba el texto, orden, alineaci√≥n, tama√±o, paquete y cach√© V298. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Actualiza c√≥digos, tama√±os y explicaciones sencillas. |
| `ROADMAP_A_DETALLE.md` | Registro detallado obligatorio de V298. |
| `ROADMAP_OVERALL.md` | Registro general obligatorio de V298. |

## Correcci√≥n operativa V299 ¬∑ Logo completo dentro del iPhone

Correcci√≥n solicitada el **24 de agosto de 2026** despu√©s de comprobar la aplicaci√≥n instalada en iPhone. Se elimina √∫nicamente el exceso de ancho del logo superior y se respeta el espacio de seguridad de la barra del tel√©fono. El texto para newbies, el micr√≥fono y todas las funciones permanecen iguales.

| Archivo o modificaci√≥n | Qu√© queda registrado |
|---|---|
| `index-grupal.html` | Limita el logo al 100 % del espacio disponible y lo baja debajo de la barra superior del iPhone. |
| `mobile-release.json` | N√∫mero de paquete preparado actualizado a V299. |
| `service-worker.js` | Cach√© V299 para entregar inmediatamente la correcci√≥n del logo. |
| `test-v290-brand-icons-cleanup.mjs` | Comprueba el ancho del logo, el espacio seguro, el paquete y la cach√© V299. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Actualiza c√≥digos, tama√±os y explicaciones sencillas. |
| `ROADMAP_A_DETALLE.md` | Registro detallado obligatorio de V299. |
| `ROADMAP_OVERALL.md` | Registro general obligatorio de V299. |

## Documentaci√≥n operativa V300 ¬∑ Compendio final para el usuario

El **24 de agosto de 2026** se crea el compendio final de funciones reales para el consumidor. Est√° escrito con palabras sencillas, usa los nombres visibles de los botones y separa expresamente las funciones disponibles de las que todav√≠a siguen en preparaci√≥n. No modifica la aplicaci√≥n ni reabre funciones ya aprobadas.

| Archivo o modificaci√≥n | Qu√© queda registrado |
|---|---|
| `COMPENDIO_FINAL_FUNCIONES_USUARIO.md` | Manual amigable que explica desde la selecci√≥n del campo hasta la tarjeta final, historial, correcciones, respaldo e instalaci√≥n. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Agrega el compendio al inventario y actualiza las explicaciones de ambos ROADMAPS. |
| `ROADMAP_A_DETALLE.md` | Registra a detalle la creaci√≥n documental V300. |
| `ROADMAP_OVERALL.md` | Registra esta creaci√≥n dentro del resumen general. |

## Actualizaci√≥n operativa V301 ¬∑ Modalidades claras y torneo opcional

El **24 de agosto de 2026** se cierra el vac√≠o de orientaci√≥n de la pantalla principal. La ruta que ya funcionaba como ronda general ahora tiene una opci√≥n visible llamada **RONDA NORMAL**; la modalidad r√°pida cambia su nombre comercial a **SCORE CARD - PR√ÅCTICA**. El registro de torneo se identifica como opcional y permite guardar una descripci√≥n tambi√©n opcional. No se modifica ninguna regla de c√°lculo, score, voz, tarjeta o navegaci√≥n.

| Archivo o modificaci√≥n | Qu√© queda registrado |
|---|---|
| `index-grupal.html` | Presenta las tres modalidades, cambia el nombre de Pr√°ctica y agrega la descripci√≥n opcional del torneo. |
| `COMPENDIO_FINAL_FUNCIONES_USUARIO.md` | Actualiza el manual con los nombres visibles y el nuevo campo opcional. |
| `mobile-release.json` | N√∫mero de paquete preparado actualizado a V301. |
| `service-worker.js` | Cach√© V301 para entregar la pantalla nueva. |
| `test-v290-brand-icons-cleanup.mjs` | Comprueba las tres modalidades, el registro opcional y el guardado de la descripci√≥n. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Actualiza c√≥digos y explicaciones sencillas de V301. |
| `ROADMAP_A_DETALLE.md` | Registra V301 a detalle. |
| `ROADMAP_OVERALL.md` | Registra V301 en este resumen general. |

## Actualizaci√≥n operativa V302 ¬∑ Micr√≥fonos hermanos en General y Stableford

El **24 de agosto de 2026** se unifica el registro visual de Stableford con la Score Card General. Stableford deja de mostrar el c√≠rculo de 240 px con emoji y adopta el mismo encabezado REGISTRO DE JUGADORES, bloque de instrucciones, micr√≥fono SVG compacto de 120 px en escritorio y 112 px en iPhone, color ne√≥n y estado rojo de escucha. El enlace con el motor oficial de voz permanece intacto.

| Archivo o modificaci√≥n | Qu√© queda registrado |
|---|---|
| `stableford.js` | Reutiliza la l√≠nea gr√°fica y descriptiva aprobada de la Score Card General sin cambiar la l√≥gica de registro. |
| `mobile-release.json` | N√∫mero de paquete preparado actualizado a V302. |
| `service-worker.js` | Cach√© V302 para entregar inmediatamente el componente unificado. |
| `test-v290-brand-icons-cleanup.mjs` | Comprueba la estructura hermana, el SVG, la ausencia del emoji grande, el paquete y la cach√©. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Actualiza el inventario de todos los archivos modificados. |
| `ROADMAP_A_DETALLE.md` | Registra V302 a detalle. |
| `ROADMAP_OVERALL.md` | Registra V302 en este resumen general. |

## Actualizaci√≥n operativa V303 ¬∑ Paso 4-OK tambi√©n en Stableford

El **24 de agosto de 2026** se completa la hermandad de vocabulario entre General y Stableford. El bot√≥n final de una nueva ronda Stableford ahora dice **OK**, tal como indica el paso 4. Su operaci√≥n no cambia: sigue validando los datos e iniciando la ronda. Cuando se edita una ronda existente, el bot√≥n conserva **ACTUALIZAR DATOS**.

| Archivo o modificaci√≥n | Qu√© queda registrado |
|---|---|
| `index-grupal.html` | Muestra OK como acci√≥n final de una nueva ronda Stableford. |
| `stableford.js` | Orienta al usuario con REVISA Y PRESIONA OK despu√©s del dictado. |
| `mobile-release.json` | N√∫mero de paquete preparado actualizado a V303. |
| `service-worker.js` | Cach√© V303 para entregar inmediatamente el texto homologado. |
| `test-v290-brand-icons-cleanup.mjs` | Comprueba OK en pantalla, OK en el aviso, paquete y cach√©. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Actualiza el inventario de todos los archivos modificados. |
| `ROADMAP_A_DETALLE.md` | Registra V303 a detalle. |
| `ROADMAP_OVERALL.md` | Registra V303 en este resumen general. |

## Actualizaci√≥n operativa V304 ¬∑ Acciones hermanas y control visual

El **24 de agosto de 2026** se corrige la diferencia que obligaba al usuario a revisar manualmente las dos tarjetas. Registro General y Registro Stableford comparten ahora un √∫nico tratamiento para sus acciones inferiores: misma familia, peso 900, tama√±o aproximadamente 30 % mayor y la misma altura para OK. Cuando Stableford todav√≠a no est√° listo, OK permanece funcionalmente bloqueado, pero se muestra con texto y borde ne√≥n legibles en lugar de gris desvanecido. Ninguna regla de juego, validaci√≥n o navegaci√≥n cambia.

| Archivo nuevo o modificaci√≥n | Qu√© queda registrado |
|---|---|
| `index-grupal.html` | Instala el sistema visual compartido para OK, Ronda previa, Historial, Atr√°s y Cancelar en ambas tarjetas. |
| `mobile-release.json` | N√∫mero de paquete preparado actualizado a V304. |
| `service-worker.js` | Cach√© V304 para entregar inmediatamente la homologaci√≥n. |
| `test-v290-brand-icons-cleanup.mjs` | Mantiene la validaci√≥n acumulada alineada con V304. |
| `test-v304-homogeneous-registration-actions.mjs` | Impide autom√°ticamente diferencias futuras de fuente, peso, tama√±o, altura o brillo entre las acciones hermanas. |
| `audit-project.mjs` | Ejecuta la comparaci√≥n V304 dentro del control maestro. |
| `.github/workflows/roadmap-gate.yml` | Vuelve obligatorio el filtro hermano en GitHub. |
| `vercel.json` | Vuelve obligatorio el filtro hermano antes de cada publicaci√≥n Vercel. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Actualiza el inventario completo e incorpora la nueva prueba. |
| `ROADMAP_A_DETALLE.md` | Registra V304 a detalle. |
| `ROADMAP_OVERALL.md` | Registra V304 en este resumen general. |

## Actualizaci√≥n operativa V305 ¬∑ Historial, navegaci√≥n y cero superposiciones

El **24 de agosto de 2026** se auditan todas las pantallas y rutas desde la base V304. Todo acceso visible al archivo de tarjetas usa **HISTORIAL**; cada pantalla con retorno ofrece **ATR√ÅS** conectado y situado arriba del contenido; el acceso opcional de cuenta pasa a **REG√çSTRATE** dentro del flujo y deja de cubrir controles. En Stableford se elimina el aviso hu√©rfano bajo los jugadores, se conserva su validaci√≥n interna y la gu√≠a visible se corrige para pedir √∫nicamente n√∫mero de jugador y nombre. Los OK General y Stableford comparten geometr√≠a, tipograf√≠a, color y estados equivalentes: delineados mientras el registro est√° incompleto y s√≥lidos cuando ya puede confirmarse. C√°lculos y reglas no solicitadas permanecen congelados.

| Archivo nuevo o modificado | Qu√© queda registrado |
|---|---|
| `.github/workflows/roadmap-gate.yml` | Ejecuta tambi√©n el filtro obligatorio V305 en GitHub. |
| `COMPENDIO_FINAL_FUNCIONES_USUARIO.md` | Usa HISTORIAL y REG√çSTRATE y explica los formatos reales de dictado General y Stableford. |
| `GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md` | Sincroniza el manual vivo con App V305, el estado de los OK y las gu√≠as operativas reales. |
| `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md` | Homologa el vocabulario del historial en la matriz funcional. |
| `ROADMAP_A_DETALLE.md` | Registra individualmente la intervenci√≥n V305. |
| `ROADMAP_OVERALL.md` | Incorpora este resumen general V305. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Eleva el inventario activo e incorpora todos los archivos V305. |
| `audit-project.mjs` | A√±ade la prueba V305 a la auditor√≠a maestra. |
| `index-grupal.html` | Homologa HISTORIAL, ATR√ÅS, REG√çSTRATE y los estados del OK General; evita superposiciones y conserva las validaciones. |
| `mobile-release.json` | Prepara el paquete m√≥vil 305. |
| `service-worker.js` | Activa la cach√© `gscg-mobile-v305`. |
| `stableford.js` | Muestra √∫nicamente `1-# JUGADOR`, `2-NOMBRE`, `HASTA 6 JUGADORES` y `3-OK`; el motor exige la posici√≥n y asigna HCP y marcas por categor√≠a. |
| `test-course-catalog.mjs` | Conserva la eliminaci√≥n de las falsas casillas hist√≥ricas y reconoce la gu√≠a vigente del l√≠mite real de seis jugadores. |
| `test-stableford-ui.mjs` | Alinea la prueba de UI con el build vigente V305. |
| `test-stableford-clean-roster-history.mjs` | Alinea la prueba limpia con la regla V289 de persistir la nueva ronda vac√≠a. |
| `test-v255-player-registration-boxes-codes.mjs` | Alinea la prueba hist√≥rica con la gu√≠a visual vigente: Dicta o escribe, Nombre, HDCP, Marcas y OK. |
| `test-v260-round-points-player-return.mjs` | Alinea la recuperaci√≥n con la regla V289 de persistir Stableford vac√≠o para impedir que reaparezcan nombres anteriores. |
| `test-v261-registration-stableford-modality.mjs` | Alinea la prueba hist√≥rica con Ronda Normal, Stableford, Score Card - Pr√°ctica y la gu√≠a homologada vigente. |
| `test-v262-provisional-optional-profile.mjs` | Conserva los perfiles opcionales y reconoce el nombre comercial vigente `SCORE CARD - PR√ÅCTICA` sin recuperar `RONDA SIN REGISTRO`. |
| `test-v253-live-previous-round.mjs` | Alinea la ruta Stableford oficial con `v=305`. |
| `test-v252-stableford-persistence-category-course.mjs` | Alinea la persistencia con la regla V289 de guardar vac√≠a la nueva ronda Stableford. |
| `test-v272-definitive-operational-release.mjs` | Alinea build, snapshot y ruta oficial con V305. |
| `test-v274-complete-courses-voice-operations.mjs` | Alinea la identificaci√≥n de versi√≥n sin cambiar la cobertura de voz. |
| `test-v275-stable-live-voice-turns.mjs` | Alinea la identificaci√≥n de versi√≥n sin cambiar la cobertura viva. |
| `test-v276-manual-hole-navigation.mjs` | Alinea la identificaci√≥n de versi√≥n sin cambiar la navegaci√≥n por hoyos. |
| `test-v277-official-round-corrections.mjs` | Alinea correcciones y snapshots oficiales con V305. |
| `test-v278-card-image-pdf-export.mjs` | Alinea los artefactos de tarjeta con V305. |
| `test-v279-local-card-library.mjs` | Homologa la redacci√≥n de Historial y la versi√≥n vigente. |
| `test-v280-local-history-insights.mjs` | Alinea las estad√≠sticas del Historial con V305. |
| `test-v281-pwa-installation.mjs` | Comprueba la cach√© m√≥vil V305. |
| `test-v284-native-package-generation.mjs` | Comprueba paquete m√≥vil y cach√© V305. |
| `test-v285-stableford-back-navigation.mjs` | Comprueba el ATR√ÅS superior de Stableford. |
| `test-v287-stableford-back-controls-clear.mjs` | Comprueba que REG√çSTRATE est√© en flujo y no tape controles. |
| `test-v290-brand-icons-cleanup.mjs` | Mantiene la validaci√≥n acumulada y reconoce la gu√≠a Stableford exacta, el paquete y la cach√© V305. |
| `test-v304-homogeneous-registration-actions.mjs` | Conserva el filtro hermano y proh√≠be
# R18-LAB ¬∑ acceso propietario temporal de 24 horas ¬∑ 08 de septiembre de 2026

- Acceso completo de prueba mediante token opaco; s√≥lo la cuenta propietaria puede crearlo o revocarlo.
- Vigencia exacta de 24 horas, cierre autom√°tico del cliente y bloqueo obligatorio del servidor.
- Instancia local limpia, sin jugadores, rondas, tarjetas, historial ni respaldo del propietario.
- `guest-access.js` carga el aislamiento antes de los m√≥dulos y mantiene intacta la compilaci√≥n hist√≥rica del script principal.
- Cuenta, respaldo, sincronizaci√≥n, comercio y administraci√≥n quedan cerrados al invitado.
- Feedback temporal sin nombres: apertura, modalidad, cantidad de jugadores, hoyos y anotaciones; visible s√≥lo por el propietario y eliminado autom√°ticamente antes de 48 horas.
- Banco espec√≠fico PASS; falta vincular la identidad propietaria real y ejecutar Preview/pruebas f√≠sicas. MAIN y Producci√≥n permanecen intactas.
- Los tres inventarios se regeneran y sellan como `R18-LAB-OWNER-GUEST-24H-LOCK`, sin r√≥tulos hist√≥ricos V367/V371.
- Archivos exactos: `access.html`, `api/_lib/app-access.js`, `api/app-access.js`, `guest-access.js`, `middleware.js`, `index-grupal.html`, `package.json`, `vercel.json`, `test-r18-owner-guest-24h-access.mjs`, `audit-project.mjs`, `scripts/rebuild-inventory-pdfs.py`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_A_DETALLE.md` y `ROADMAP_OVERALL.md`.

# V407-R2 ¬∑ Tarjeta y acciones premium homog√©neas ¬∑ 08 de septiembre de 2026

- `index-grupal.html`: encuadra la tarjeta operativa con t√≠tulo, borde continuo, fondo original y desplazamiento horizontal visible; conserva la paleta negro, verde, blanco y rojo funcional.
- `test-v407-r1-premium-visual-system.mjs`: bloquea regresiones de t√≠tulo, contenedor, barra de desplazamiento y colores de la tarjeta, adem√°s de las ret√≠culas homog√©neas de acciones.
- Producci√≥n permanece intacta; el candidato se limita a la rama `lab/premium-ui-v407`.

## V407-R6 ¬∑ Coordinaci√≥n de Universales ¬∑ 08 de septiembre de 2026

- La modalidad general visible se renombra **MEDAL PLAY NORMAL** en Inicio, detalle de ronda y Torneo LIVE; su motor permanece intacto.

- `CONTROL_PROYECTO_SCIRE/COORDINACION_V407_R6_UNIVERSALES.md` separa motor/reglas de dise√±o/plantillas para impedir cruces entre conversaciones.
- `lab/v407-r6-universales` queda como √∫nica rama de integraci√≥n de la modalidad; `lab/premium-ui-v407` conserva la auditor√≠a R5.
- UNIVERSALES reemplaza el slot completo de DOTS en APP-22/23; DOTS se retira de Score Card, Tarjeta Digital, WhatsApp, Historial, Manual y superficies activas. CARD-09/10 quedan para Global/Personal Universales.
- `test-v407-r6-universales-coordination.mjs` impide crear APP-43‚Äì45, conserva 12 puntos por hoyo y bloquea cruces entre motor, gr√°fica y Producci√≥n.
- `universales.js` implementa el motor aislado 6‚Äì4‚Äì2‚Äì0 / 6‚Äì4‚Äì2, comparte posiciones empatadas y exige 12 puntos exactos por hoyo.
- `index-grupal.html` sustituye la casilla visible de DOTS por UNIVERSALES, limita el registro a 3 o 4 jugadores y a√±ade PUNTOS por hoyo e IN/OUT/TOTAL a la Score Card y Tarjeta Digital.
- `card-library.js` conserva UNIVERSALES como modalidad propia en Historial; `service-worker.js` incorpora el motor a la copia instalable R6.
- `card-artifacts.js` genera Global y Personal espec√≠ficas con Gross/Neto/Puntos y elimina el panel digital activo de DOTS; `scripts/build-mobile-web.mjs` incluye el motor en iOS/Android.
- `api/live.js` y `live-hub.js` preservan y rotulan UNIVERSALES en Torneo LIVE; `voice-assistant.js` abre su registro por voz.
- `live-control.js` calcula y publica los 12 puntos por grupo; `live-view.js` muestra PUNTOS por hoyo y TOTAL; el Centro LIVE ordena UNIVERSALES de mayor a menor puntaje.
- `database/005_live_tournament_mode.sql` fija modalidad por torneo din√°mico; el API rechaza grupos cuyo modo no coincide con el torneo creado.
- `test-v311-voice-assistant.mjs`, `test-round-information.mjs` y `test-v261-registration-stableford-modality.mjs` fijan navegaci√≥n y t√≠tulos compartidos del release R6.
- `test-v406-r23-visible-version.mjs` fija el identificador visible `V407 ¬∑ R6` sobre ACTUALIZAR.
- `test-v260-round-points-player-return.mjs` conserva la ret√≠cula m√≥vil contenida heredada de R5A.
- `test-v407-r6-universales.mjs` prueba 12 escenarios de empate, 3/4 jugadores, el caso 5‚Äì5‚Äì1‚Äì1, retiro de la superficie DOTS y paridad de configuraciones.
- `test-v405-registration-clear-final-mobile.mjs` y `test-v407-r1-premium-visual-system.mjs` ampl√≠an los candados compartidos a UNIVERSALES y al release R6.
- `test-v330-side-games.mjs` conserva la cobertura hist√≥rica del motor DOTS, pero proh√≠be sus accesos/configuraci√≥n activos y mantiene Skins, Wolf y Vegas.
- `test-v307-match-arrows-format.mjs` conserva Match Play y ampl√≠a el r√≥tulo compartido de modalidad a UNIVERSALES.
- `test-v329-skins.mjs` conserva Skins y exige UNIVERSALES en el antiguo espacio visual de DOTS.
- Los candados V365 y V406 de recuperaci√≥n, dise√±o, controles m√≥viles y Torneo LIVE conservan sus contratos y reconocen el release R6.
- `audit-project.mjs` incorpora obligatoriamente ambos bancos R6 a la regresi√≥n maestra.
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` registra el conjunto exacto de fuentes R6.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` resella 431 fuentes y los tres inventarios PDF despu√©s de la integraci√≥n R6.
- Producci√≥n `main` permanece congelada en `4009f79f50987f8bf105189bce9c5e90b2857363`.

## V407-R5 ¬∑ Inventario visual total y tarjeta Stableford responsive ¬∑ 08 de septiembre de 2026

- Se inventariaron 67 pantallas y estados verificables en seis familias; el alcance y sus diez criterios est√°n en `CONTROL_PROYECTO_SCIRE/AUDITORIA_VISUAL_V407/`.
- Las capturas f√≠sicas `IMG_3120`‚Äì`IMG_3126` se registraron como 9 ID FAIL; quedan 58 ID pendientes y cero PASS f√≠sicos hasta repetir el recorrido R5.
- La tarjeta Stableford Global divide los hoyos en IN 1‚Äì9 y OUT 10‚Äì18, repliega metadatos y contiene el SHA-256 dentro del ancho m√≥vil.
- La auditor√≠a maestra incorpora el inventario como paquete obligatorio; el banco integral queda en 123 paquetes.
- Producci√≥n permanece intacta; R5 contin√∫a como candidato exclusivo de `lab/premium-ui-v407`.
- Publicaci√≥n R5: el primer transporte remoto trunc√≥ `index-grupal.html`; el commit LAB `bb21de0` restaur√≥ el blob √≠ntegro con SHA Git exacto y conserv√≥ el √°rbol R5 local completo. El deployment reparador alcanz√≥ Manual visual PASS y fue detenido por el propio `roadmap:gate`, por lo que se registra esta reparaci√≥n antes de reintentar.
- Fuentes de control exactas: `CONTROL_PROYECTO_SCIRE/AUDITORIA_VISUAL_V407/INVENTARIO_PANTALLAS_ESTADOS_V407_R5.md`, `CONTROL_PROYECTO_SCIRE/AUDITORIA_VISUAL_V407/MATRIZ_AUDITORIA_VISUAL_V407_R5.md`, `test-v407-r5-visual-inventory.mjs` y `test-card-artifacts.mjs`.
- Correcci√≥n APP-04/05 y APP-29/30: `index-grupal.html` contiene el Control Manual dentro del iPhone, compacta sus seis columnas sin traslape y aumenta la legibilidad de las acciones de Tarjeta Digital; `test-v407-r1-premium-visual-system.mjs` bloquea la geometr√≠a.
- Release de cach√© `V407-R5A-MOBILE-GRIDS-20260908`: `service-worker.js`, versi√≥n visible y pruebas de versi√≥n obligan al iPhone a descargar esta correcci√≥n en lugar de reutilizar R5.
- Correcci√≥n APP-32‚Äì37: Historial, vac√≠o, filtros, eliminaci√≥n y Estad√≠sticas comparten √°rea segura, superficies grafito, controles de 52 px, ret√≠culas contenidas y ritmo m√≥vil homog√©neo; la auditor√≠a maestra incorpora `test-v407-r5a-history-visual-system.mjs` como paquete 124.
- Regresi√≥n R5A: `test-v260-round-points-player-return.mjs` se sincroniza con la ret√≠cula m√≥vil contenida de seis columnas; el primer build `dpl_8SSK4fASsW8PBGnPasaK7gP8gT37` queda rechazado y no sustituye el alias LAB hasta publicar el √°rbol corregido.
# V407-R14 ¬∑ Actualizaci√≥n manual permanente y tarjetas seguras ¬∑ 08 de septiembre de 2026

- Se consolida en una rama limpia el bot√≥n ACTUALIZAR siempre visible/parpadeante, las categor√≠as opcionales sobre nombres y los puntos rojos de Universales.
- Se rechaza la sustituci√≥n truncada de `index-grupal.html` encontrada en R13 y se preserva el HTML can√≥nico completo de main R10.
- Release/cach√© R14, pruebas y evidencia se mantienen coordinados; Producci√≥n no cambia mientras exista un FAIL f√≠sico o documental.
- Reparaci√≥n de publicaci√≥n R14: se restaura el HTML can√≥nico completo en el commit de Preview; el intento con blob vac√≠o queda rechazado.
- Cierre de publicaci√≥n R14: ROADMAPS y sello de inventario quedan coordinados en el mismo commit final.
- Evidencia automatizada de tarjetas: `scripts/card-audit-fixtures.mjs`.
- R15: actualizaci√≥n remota parpadea s√≥lo ante una versi√≥n nueva y confirma ACTUALIZADO al instalarla.
- R16: Medal Play y Universales reflejan visualmente una sola modalidad activa; sirve como segunda actualizaci√≥n remota consecutiva.
- R17: la categor√≠a elegida aparece peque√±a sobre el nombre de cada jugador; sin categor√≠a no aparece texto. La fila PUNTOS y sus valores por hoyo/totales quedan rojos, y una fila vac√≠a con categor√≠a o marcas preseleccionadas no bloquea OK.
- Reparaci√≥n de transporte R17: `index-grupal.html` se retransmite √≠ntegro; el build truncado queda rechazado y no lleg√≥ a Producci√≥n.
- R18: `index-grupal.html`, `live-view.js` y `live.html` muestran puntos por hoyo/totales Universales en rojo; el encabezado m√≥vil separa logo, modalidad y actualizaci√≥n sin superposici√≥n.
# R19 ¬∑ Enlace invitado individual de un solo uso ¬∑ 09 de septiembre de 2026

- El primer canje consume at√≥micamente el enlace; cualquier segundo navegador o dispositivo recibe `ENLACE INV√ÅLIDO, VENCIDO O YA UTILIZADO`.
- El dispositivo que lo canje√≥ conserva su cookie privada hasta el vencimiento original de 24 horas.
- Alcance exclusivo LAB; MAIN, variables y base de datos permanecen sin cambios estructurales.

# V407-R21 ¬∑ SUPPORT y acceso 24 h cerrados ¬∑ 09 de septiembre de 2026

- `index-grupal.html`: SUPPORT abre `/manual.pdf` en la misma pantalla, muestra `V407 ¬∑ R21` y ofrece `COMPARTIR 24H` s√≥lo a la cuenta propietaria.
- `service-worker.js`: avanza release/cach√© y excluye `/access.html` de la navegaci√≥n PWA almacenada.
- `api/app-access.js` y `api/_lib/app-access.js`: los enlaces usan el dominio LAB oficial y se consumen at√≥micamente una sola vez; el primer dispositivo conserva acceso hasta el vencimiento de 24 horas.
- Pruebas dirigidas: `test-v311-live-support-link.mjs`, `test-r18-owner-guest-24h-access.mjs` y `test-v407-r9-manual-update.mjs`.
- Rollback: volver al commit R20 de LAB. MAIN no se modifica.
- `.github/workflows/hotfix-support-same-screen.yml`: se retira el transporte temporal; R21 queda integrado directamente en LAB.
- `docs/manual/v311/page-00.png`: portada del manual resellada junto con los PDF publicados para que SUPPORT entregue el artefacto vigente.
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

- El control del rewrite acepta el formato JSON normal y el minificado por Vercel; el primer Preview qued√≥ rechazado sin tocar Producci√≥n.
- La invitaci√≥n de 24 horas usa `/invite/<token>` para impedir que WhatsApp elimine el acceso y env√≠e a Kathy al formulario propietario.
- `access.html`, `api/app-access.js`, `middleware.js` y `vercel.json` forman un √∫nico recorrido invitado; LIVE y las dem√°s funciones permanecen intactas.
- `test-r18-owner-guest-24h-access.mjs` bloquea regresiones de ruta, reescritura, permiso y canje POST.
- Rollback: volver a `73df15f`; Producci√≥n R23 no cambia hasta cero FAIL y aprobaci√≥n f√≠sica.

# V407-R24 ¬∑ WhatsApp y controles m√≥viles sin traslapes ¬∑ 09 de septiembre de 2026

- `index-grupal.html`: tel√©fono WhatsApp editable con üá¨üáπ +502 y ancho m√≥vil √∫til; ACTUALIZAR e instalaci√≥n quedan fuera de todos los overlays y dentro del flujo normal.
- `manual.html`: √≠ndice agrupado en ocho temas con t√≠tulo y enlace directo a cada p√°gina; b√∫squeda WhatsApp/tel√©fono/Guatemala/+502.
- `service-worker.js` y pruebas V311/V365/V405/V406/V407: release R24 y contratos preventivos sincronizados.
- Evidencia Chromium m√≥vil 390√ó844: General, Match Play, Four Ball, Skins, Wolf, Vegas, Universales y trece pantallas cr√≠ticas sin desbordamiento ni intersecciones.
- Rollback: `73df15f`; promoci√≥n a MAIN s√≥lo tras Preview READY y cero FAIL.
- Reparaci√≥n de transporte R24: el primer blob remoto de `index-grupal.html` lleg√≥ vac√≠o; el commit reparador retransmite los 830,274 bytes y conserva el √°rbol candidato exacto.
- √çndice protegido por `test-v311-manual-search.mjs`; enlaces tem√°ticos y b√∫squeda WhatsApp no pueden desaparecer silenciosamente.

# V407-R24A ¬∑ ACTUALIZAR manual visible en Registro ¬∑ 09 de septiembre de 2026

- `index-grupal.html`: restaura ACTUALIZAR exclusivamente en Registro y reserva una franja superior para impedir contacto con el logotipo o controles.
- `service-worker.js`: nuevo release/cach√© R24A para que el propietario reciba y confirme manualmente la versi√≥n.
- Evidencia Chromium m√≥vil 390√ó844: ACTUALIZAR visible, tarjeta inicia en 90 px, bot√≥n termina en 67 px, intersecci√≥n cero y ancho total 390 px.
- Pruebas V365/V405/V406/V407 actualizadas; rollback productivo `2ba83ed`.

# V407-R24B ¬∑ recuperaci√≥n manual desde la copia R24 almacenada ¬∑ 09 de septiembre de 2026

- `service-worker.js`: al servir el shell aprobado antiguo inyecta s√≥lo el CSS que vuelve visible ACTUALIZAR y reserva su franja; no instala ni recarga autom√°ticamente.
- `index-grupal.html`: destino visible R24B posterior al toque personal del propietario.
- Candado permanente R24B: `scripts/lab-update-browser-review.mjs` separa la revisi√≥n automatizada en navegador real de la auditor√≠a est√°tica y del iPhone f√≠sico; exige cuatro deployments consecutivos A‚ÜíB‚ÜíC‚ÜíD sobre `https://golf-sc-gt-lab.vercel.app`, un perfil persistente, capturas completas y conservaci√≥n de datos.
- `scripts/lab-update-physical-gate.mjs`, `test-v407-r24-update-physical-gate.mjs`, `package.json` y `audit-project.mjs`: rechazan evidencia JSON ausente, alterada, ajena o menor de tres transiciones. Hasta ejecutar el recorrido p√∫blico el estado es NO REVISADO; MAIN/Producci√≥n permanece intacta.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/MATRIZ_GATE_0_PROYECTO.md` y `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/MATRIZ_GATE_0_PROYECTO.json`: integran el candado dentro de G0-10 sin crear una puerta paralela.
- `.github/workflows/apply-r24b-lab.yml`: transporte temporal creado y eliminado en el mismo cierre remoto; no forma parte del candidato final.
- `test-v407-r9-manual-update.mjs`: exige el puente manual y proh√≠be navegaci√≥n autom√°tica.
- Rollback productivo: `5e45b264`; ninguna ronda, historial ni funci√≥n de juego se modifica.

# V407-R24C ¬∑ aislamiento de ACTUALIZAR en Historial ¬∑ 09 de septiembre de 2026

- `IMG_3303.png` demuestra un FAIL f√≠sico: `ACTUALIZADO` tapaba parcialmente `ATR√ÅS` en Historial.
- `index-grupal.html` limita la excepci√≥n que muestra ACTUALIZAR a Registro cuando Historial no est√° abierto.
- `test-v407-r24b-history-update-isolation.mjs` bloquea el conflicto de prioridad CSS que dej√≥ visible el control global sobre el overlay.
- Se invalida cualquier afirmaci√≥n previa de revisi√≥n f√≠sica total: s√≥lo las pantallas con evidencia individual pueden figurar como revisadas.
- Producci√≥n principal permanece intacta; el candidato contin√∫a en LAB y su estado es NO REVISADO hasta repetir navegador real y iPhone.
- Los tres inventarios V311 y `INVENTARIOS_V311.lock.json` se regeneran sobre 448 fuentes remotas para incluir la correcci√≥n y su banco preventivo.
- Cierre remoto R24C: se elimina el transporte temporal fallido, se restauran √≠ntegros los dos archivos grandes y se resellan ambos ROADMAPS sobre el √°rbol LAB exacto; el inventario remoto contiene 448 fuentes activas.
# V407-R24D ¬∑ LIVE p√∫blico separado del acceso completo 24 H ¬∑ 10 de septiembre de 2026

- `COMPARTIR LIVE` deja de heredar dominios temporales de Preview y abre la Score Card p√∫blica de s√≥lo lectura en `golf-sc-gt-lab.vercel.app/live.html`.
- `INVITAR ¬∑ 24 H` permanece como un flujo distinto: aplicaci√≥n completa temporal con token individual, aislamiento, caducidad, revocaci√≥n y bloqueo de datos propietarios.
- Candado: `test-v406-r22-share-live.mjs` proh√≠be transportar `_vercel_share` y exige el dominio p√∫blico; `test-r18-owner-guest-24h-access.mjs` conserva √≠ntegro el contrato de 24 horas. MAIN intacta.
# V407-R24D ¬∑ actualizaci√≥n manual obligatoria ¬∑ 10 de septiembre de 2026

- `index-grupal.html` muestra `V407 ¬∑ R24D`; una instalaci√≥n R24C detecta el release publicado y activa `ACTUALIZAR` parpadeante, pero no instala la aplicaci√≥n por s√≠ sola.
- `service-worker.js` separa la cach√© candidata R24D de la cach√© aprobada; la promoci√≥n s√≥lo ocurre despu√©s del toque del propietario y la navegaci√≥n con `app_version`.
- Los bancos V365/V406/V407 (`test-v365-active-round-empty-recovery.mjs`, `test-v406-r2-professional-design.mjs`, `test-v406-r4-mobile-controls.mjs`, `test-v406-r5-simple-tournament-live.mjs`, `test-v406-r23-visible-version.mjs`, `test-v407-r1-premium-visual-system.mjs`, `test-v407-r7-ios-scroll.mjs` y `test-v407-r9-manual-update.mjs`) bloquean conjuntamente la firma R24D y rechazan promoci√≥n autom√°tica. LAB √∫nicamente; Main permanece intacta.
- Reparaci√≥n de transporte R24D: `index-grupal.html` se retransmite completo con 830,526 bytes; este ROADMAP, `ROADMAP_A_DETALLE.md` y el sello de inventario acompa√±an el commit reparador exigido por Vercel. El build vac√≠o qued√≥ rechazado y nunca activ√≥ LAB.

# V407-R25 ¬∑ controles seguros de ronda ¬∑ 10 de septiembre de 2026

- LAB separa `BORRAR SCORES` de `BORRAR TODO`: el primero conserva jugadores, modalidad, campo, h√°ndicaps y cron√≥metro; el segundo mantiene su eliminaci√≥n integral con confirmaci√≥n.
- El h√°ndicap acepta cualquier entero, incluidos cero y valores negativos, en todas las modalidades y conserva su c√°lculo firmado.
- `player-registry.js` y `live-control.js` preservan ese h√°ndicap firmado en perfiles y LIVE; `index-grupal.html` concentra validaci√≥n, c√°lculo y controles.
- `service-worker.js`, `test-v405-registration-clear-final-mobile.mjs`, `test-v365-active-round-empty-recovery.mjs`, `test-v406-r2-professional-design.mjs`, `test-v406-r23-visible-version.mjs`, `test-v406-r4-mobile-controls.mjs`, `test-v406-r5-simple-tournament-live.mjs`, `test-v407-r1-premium-visual-system.mjs`, `test-v407-r7-ios-scroll.mjs` y `test-v407-r9-manual-update.mjs` avanzan coordinadamente a R25.
- `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` registran y sellan el cambio.
- El cron√≥metro incorpora `RESET` a 00:00:00 sin borrar jugadores ni scores.
- El registro captura directamente nombre y WhatsApp visibles al pulsar `OK`, incluido el texto predictivo/autocompletado de Safari iOS.
- Candado: `test-v407-r25-round-controls.mjs`. Publicaci√≥n √∫nicamente en LAB; Maestro R24D permanece intacto.
- `.github/workflows/promote-r24d-lab.yml`: retirado el transporte temporal fallido de R24D; R25 usa el despliegue normal de la rama LAB.
- Compatibilidad heredada: `test-v287-stableford-back-controls-clear.mjs` reconoce la nueva secuencia ATR√ÅS ‚Üí BORRAR SCORES ‚Üí BORRAR TODO ‚Üí + JUGADOR sin debilitar los candados previos.

# V407-R26 ¬∑ hotfix decisivo de OK con h√°ndicap firmado ¬∑ 10 de septiembre de 2026

- Se eliminan las dos validaciones residuales `hcp<0||hcp>54` de `finalizeSetupDictation()` y `requestSetupFinalize()`; `OK` acepta el mismo rango entero firmado que el formulario.
- Firma visible, release y cach√© avanzan coordinadamente a R26 para provocar `ACTUALIZAR` manual sin instalaci√≥n remota.
- Los bancos de actualizaci√≥n y `test-v407-r25-round-controls.mjs` rechazan la reincidencia del l√≠mite antiguo.

# V407-R27 ¬∑ OK manual independiente de voz ¬∑ 10 de septiembre de 2026

- `OK` toma los campos visibles ya validados y avanza directamente a confirmaci√≥n, sin quedar esperando `setupSpeechActive` ni transcripciones pendientes.
- El micr√≥fono y sus funciones permanecen intactos; √∫nicamente deja de ser una dependencia para completar el registro manual.
- Release visible, Service Worker y cach√© avanzan a R27 para actualizaci√≥n manual expl√≠cita.

# V407-R28 ¬∑ actualizaci√≥n conserva registro ¬∑ 10 de septiembre de 2026

- Antes de recargar, `ACTUALIZAR` captura los campos visibles, sincroniza jugadores y persiste el borrador; R28 conserva nombres, tel√©fonos, h√°ndicaps y marcas.
- Mantiene √≠ntegro el avance directo de `OK` incorporado en R27.


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

- `index-grupal.html`: mantiene clima vivo en pantalla y en AI Universal aunque la ronda est√© cerrada, sin modificar la tarjeta oficial.
- `service-worker.js`: publica el identificador y cach√© independientes R37.
- `test-r37-closed-round-live-weather.mjs`: reproduce 20.7 ¬∞C antiguo frente a 27 ¬∞C nuevo y bloquea su reaparici√≥n.
- `test-v312-general-caddie.mjs`: verifica el contrato sucesor de clima vivo sin persistir sobre una ronda cerrada.
- `audit-project.mjs`: incorpora el caso R37 a la auditor√≠a maestra.
- `test-v365-active-round-empty-recovery.mjs`, `test-v406-r2-professional-design.mjs`, `test-v406-r23-visible-version.mjs`, `test-v406-r4-mobile-controls.mjs`, `test-v406-r5-simple-tournament-live.mjs`, `test-v407-r1-premium-visual-system.mjs`, `test-v407-r25-round-controls.mjs`, `test-v407-r7-ios-scroll.mjs`, `test-v407-r9-manual-update.mjs`: verifican la versi√≥n visible y el cach√© R37.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`: registra RC-104.
- Reversi√≥n: commit `ccdd004b361bd84dd5936aa069c7722b13b5659f`; conservar almacenamiento local.


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


## ACTUALIZACI√ìN OVERALL ¬∑ CATEGOR√çAS / CAMPEONATO / ATAJOS / MANUAL ¬∑ 2026-09-20
- `shortcuts-ui.js`: ATAJOS universal operativo; CATEGOR√çAS muestra la lista completa vigente.
- Categor√≠as globales: CAMPEONATO ¬∑ A ¬∑ B ¬∑ C ¬∑ D ¬∑ SENIOR ¬∑ SUPER SENIOR ¬∑ FEMENINA.
- CAMPEONATO preconfigura MARCAS NEGRAS en Registro y se fuerza como NEGRAS en Score Cards/artefactos/LIVE.
- Stableford principal e independiente incorporan las 8 categor√≠as y matrices oficiales de tees; CAMPEONATO usa Negro.
- Manual de Usuario actualizado con categor√≠as completas, pantalla f√≠sica vigente de Monitor de Tiempo (INICIO ¬∑ FINAL ¬∑ TIMER ¬∑ RESET) y pantallas actuales de Registro/Score Card/Torneos/ATAJOS/Campeonato.
- Auditor√≠a f√≠sica reforzada: Tarjeta Final, Correcci√≥n Oficial e Historial deben abrirse por funciones reales; se miden traslapes de ATAJOS/ACTUALIZADO con controles cr√≠ticos.
- `LAB ¬∑ MANUAL 04 / ACTUALIZADO` se oculta al abrir overlays para impedir solapamiento de encabezados y controles.
- Manual f√≠sico vigente: 74 hojas = 51 base + 9 pantallas actuales + 10 Torneos + 4 pantallas LAB.

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

R55 READY dpl_6p3gDD9AAHCXsRs7tPTaKLW9Roos, alias LAB, remoto d6a28277f0e080fbbb1b737447f68d81ae8103dd. Navegador real abre demo67jugadores y confirma encabezados POS/JUGADOR/HOYO ACTUAL/GROSS/NETO/RESULTADO/CATEGOR√çA/SEGUIR; GRUPO y MODALIDAD ausentes. Captura emitida. Clasificaci√≥n Stableford verificada t√©cnicamente, recorrido vivo espec√≠fico pendiente.


## LAB R56 ¬∑ 2026-09-23 ¬∑ desplazamiento del detalle LIVE
- Fallo reportado con IMG_4751: el detalle por hoyo regresaba al hoyo 1 durante desplazamiento. Causa: renderCategoryCard sustitu√≠a contenedores cada 3000 ms.
- Correcci√≥n: mantener contenedores horizontal/vertical montados; actualizar s√≥lo contenido cambiado de tablas y cabecera. Sin cambios en columnas aprobadas.
- PASS t√©cnico: test-lab-live-scroll, medal-monitor, stableford-ranking y tournament-navigation. Navegador publicado pendiente al preparar candidato.
- Recorrido R55 Stableford real: par=2 puntos, birdie=3, correcci√≥n bogey=1, borrado limpia totales, omitido X=0, tarjeta digital coincide y compartir devuelve ENLACE LIVE COPIADO. No constituye certificaci√≥n integral.


## LAB R70 ¬∑ 2026-09-23 ¬∑ simplificaci√≥n Tarjeta Digital Final
- Se ocultan √∫nicamente los controles redundantes de exportaci√≥n global/personal en la vista final.
- Se conserva CORREGIR RONDA y se renombra visualmente ENVIAR TARJETA DIGITAL a COMPARTIR TARJETA.
- Producci√≥n permanece sin promoci√≥n de este cambio hasta validaci√≥n LAB.

- Ajuste de regresi√≥n V307: la prueba ahora reconoce el contrato vigente de modalidad con side game activo, sin cambiar l√≥gica de aplicaci√≥n.

- Correcci√≥n de build LAB: restaurado identificador contractual R68 en app y service worker; no cambia Producci√≥n ni la l√≥gica funcional R70.

- Ajuste de regresi√≥n matriz f√≠sica R60: se actualiza el token de navegaci√≥n al vocabulario vigente VER RONDAS GUARDADAS; sin cambio funcional.

- Archivo de regresi√≥n actualizado: test-lab-r60-physical-matrix.mjs ¬∑ vocabulario vigente VER RONDAS GUARDADAS.

- R70 LAB: release identificable por PWA; app y service worker pasan de R68 a R70 para que el iPhone detecte actualizaci√≥n. Producci√≥n no se toca hasta READY.


## Regla permanente de releases
- Se incorpora `RELEASE_UPDATE_MATRIX.md` como protocolo obligatorio de actualizaci√≥n LAB/Producci√≥n.
- Exige sincronizaci√≥n de versi√≥n, LAB READY, regresi√≥n, prueba f√≠sica, promoci√≥n del mismo √°rbol y verificaci√≥n final antes de declarar una actualizaci√≥n terminada.


## R71 ¬∑ orden visual del ANOTADOR
- CAMPO y MODALIDAD se muestran primero.
- ANOTADOR + ANTERIOR/HOYO/SIGUIENTE quedan inmediatamente debajo, invirtiendo el orden anterior.
- Sin cambios funcionales en captura de scores, navegaci√≥n ni c√°lculo.


## R72 ¬∑ 2026-09-23 ¬∑ limpieza MIS RONDAS GUARDADAS
- Se elimina visualmente el bloque blanco de acciones redundantes en MIS RONDAS GUARDADAS: ABRIR/IMAGEN/PDF GLOBAL, selector de jugador, ABRIR/IMAGEN/PDF PERSONAL, PDF TODAS y ESTAD√çSTICAS.
- Se colapsa por completo el espacio del bloque para que el contador quede seguido de la tarjeta de ronda.
- Release sincronizado como R72 en app, Service Worker, cach√©s y prueba de release.

- Regresi√≥n asociada: `test-lab-r60-production-refresh.mjs` valida release R72 y que `cardLibraryActions` permanezca oculto en MIS RONDAS GUARDADAS.


## R73 ¬∑ 2026-09-23 ¬∑ limpieza exacta del anotador
- Se elimina √∫nicamente la columna visual HOYO del bloque de captura, incluido el n√∫mero repetido por jugador.
- Se elimina el encabezado HOYO de esa franja.
- JUGADOR, SCORE y TECLADO quedan como √∫nicos encabezados, en blanco y a 16 px, equivalentes al tama√±o visual de los nombres.
- No se modifica navegaci√≥n de hoyo, l√≥gica de score, teclado, jugadores ni ninguna otra funci√≥n.
- Release sincronizado R73 en app, Service Worker, cach√© y prueba de release.

- Correcci√≥n R73 m√≥vil: la rejilla responsive tambi√©n se reduce a cinco columnas y el selector espec√≠fico impide que TECLADO herede el estilo verde/grande de las celdas no vac√≠as.

- Ajuste de regresi√≥n R73: eliminada la aserci√≥n antigua de encabezados para conservar √∫nicamente el contrato espec√≠fico vigente con `span:not(:empty)` y cinco columnas m√≥viles.


## R74 ¬∑ 2026-09-23 ¬∑ limpieza Tarjeta Digital Final
- Se elimina COMPARTIR MI RONDA EN VIVO de la vista final; la funci√≥n LIVE permanece √∫nicamente durante la ronda.
- Se elimina CORREGIR RONDA de la Tarjeta Digital Final.
- Se conserva COMPARTIR TARJETA para la hoja de compartir del iPhone.
- Se agrega ENVIAR A JUGADORES, activo √∫nicamente cuando al menos un jugador de la ronda tiene WhatsApp registrado.
- El env√≠o prepara la misma tarjeta PNG final y abre el flujo de compartir del dispositivo; el bot√≥n queda deshabilitado cuando no hay destinatarios registrados.
- Release sincronizado como R74 en app, Service Worker, cach√© y regresi√≥n.


## R75 ¬∑ 2026-09-23 ¬∑ arquitectura UX TORNEOS
- TORNEOS conserva t√≠tulo propio √∫nicamente en el portal de selecci√≥n.
- RESULTADOS GENERALES, RESULTADOS POR CATEGOR√çA, BUSCAR JUGADORES y MIS FAVORITOS muestran t√≠tulo inequ√≠voco de la pantalla activa.
- Accesos renombrados con vocabulario directo y consistente; MEN√ö y regreso a MIS TORNEOS permanecen disponibles.
- Sin cambios en c√°lculo, clasificaci√≥n, LIVE ni datos de jugadores.
- Release sincronizado como R75 en app, Service Worker, cach√© y regresi√≥n.
- Reparaci√≥n de gate R75: la regresi√≥n Match Play se alinea con la regla aprobada de Tarjeta Digital Final sin CORREGIR RONDA; no cambia l√≥gica funcional.
- Reparaci√≥n de matriz f√≠sica R75: valida que la correcci√≥n oficial siga existiendo por `officialCorrectionOverlay` sin exigir el bot√≥n CORREGIR RONDA dentro de la Tarjeta Digital Final.
- Reparaci√≥n R75 Tarjeta Digital Final: se elimina la dependencia DOM del bot√≥n `openOfficialCorrection`; el listener queda opcional y no puede romper la carga cuando CORREGIR RONDA no est√° en la tarjeta final.
- Reparaci√≥n R75 del gate de paridad del manual: verifica `officialCorrectionOverlay` como funci√≥n de correcci√≥n vigente sin exigir el texto/bot√≥n CORREGIR RONDA en la Tarjeta Digital Final.
- Reparaci√≥n R75 gate TORNEOS: la prueba VM incluye `setPageTitle()` antes de ejecutar `showTournamentPortal()`, evitando ReferenceError introducido por el nuevo t√≠tulo din√°mico; sin cambio funcional.
- Diagn√≥stico R75 CI: se separan temporalmente los contratos modificados (TORNEOS, release, matriz f√≠sica, tarjeta final y paridad manual) en pasos visibles para identificar el fallo exacto antes del gate agregado.
- Reparaci√≥n R75 exacta del test TORNEOS: el sandbox VM ahora define `$` como stub nulo al ejecutar `setPageTitle()`, eliminando `ReferenceError: $ is not defined` sin alterar la aplicaci√≥n.

- R76 ¬∑ Auditor√≠a de l√≥gica y arquitectura TORNEOS: las cuatro funciones principales quedan visibles; RESULTADOS POR CATEGOR√çA deja de estar oculto; BUSCAR JUGADORES conserva la intenci√≥n y, si falta contexto, pide elegir torneo sin desviar a pegar enlace; AGREGAR TORNEO POR ENLACE queda como flujo secundario expl√≠cito y oculto hasta solicitarlo; la selecci√≥n de torneo reanuda autom√°ticamente la funci√≥n previamente elegida.

- R77 ¬∑ Tarjeta Global: el visor secundario incorpora ENVIAR A JUGADORES junto a ATR√ÅS y ENVIAR TARJETA DIGITAL. El bot√≥n conecta con el flujo existente que usa los WhatsApp registrados de los jugadores de la ronda.

- R77 gate sync: ambos inventarios registran conjuntamente la correcci√≥n del bot√≥n ENVIAR A JUGADORES en el visor de Tarjeta Global.

- R77 promoci√≥n: ambos ROADMAPS quedan modificados en el mismo commit de cierre para satisfacer el gate de promoci√≥n sin alterar l√≥gica funcional.

- R78 ¬∑ Correcci√≥n funcional Tarjeta Global: ENVIAR A JUGADORES deja de llamar el flujo en la ventana de origen y pasa el gesto t√°ctil a un helper que usa navigator.share de la propia ventana del visor, evitando el no-op observado en iPhone. El helper prepara la PNG oficial, valida WhatsApp registrados y abre el share sheet; como fallback usa wa.me. Los tres botones del visor quedan con user-select y touch-callout desactivados para impedir selecci√≥n accidental de texto.

- R78 gate exacto ¬∑ archivos de esta modificaci√≥n registrados en ambos ROADMAPS: index-grupal.html, service-worker.js, test-lab-r60-production-refresh.mjs, test-lab-r60-card-actions-physical.mjs, ROADMAP_OVERALL.md, ROADMAP_A_DETALLE.md.

- R78 reparaci√≥n exacta ¬∑ index-grupal.html corrige la llamada del bot√≥n ENVIAR A JUGADORES a shareOpenedArtifactToRegisteredPlayers('${token}',window); test-lab-r60-card-actions-physical.mjs elimina el contrato R77 obsoleto que exig√≠a la llamada anterior. ROADMAP_OVERALL.md y ROADMAP_A_DETALLE.md registran conjuntamente ambos archivos.

- R79 ¬∑ Tarjeta Global limpia: se elimina el texto visible ‚ÄúTarjeta Global‚Äù y se sustituye por el logo oficial Golf Score Card GT. La cabecera visible queda √∫nicamente con CAMPO, MODALIDAD y FECHA; se eliminan de la Global VERSI√ìN, ID OFICIAL/SHA-256, TORNEO y CATEGOR√çA. El cuerpo de resultados y puntuaciones permanece intacto. Archivos: card-artifacts.js, index-grupal.html, service-worker.js, test-lab-r60-production-refresh.mjs, test-card-artifacts.mjs.

- R80 ¬∑ Correcci√≥n l√≥gica MEN√ö/TORNEOS: SALIR DE ESTE TORNEO deja de ejecutar QUITAR y de devolver al portal de torneos. Ahora sale directamente a MI SCORE CARD sin borrar el torneo guardado. QUITAR DE MIS TORNEOS queda como acci√≥n destructiva separada y expl√≠cita. Archivos: shortcuts-ui.js, index-grupal.html, service-worker.js, test-lab-r60-production-refresh.mjs, test-lab-shortcuts-navigation.mjs.

- R80 diagn√≥stico CI activo: se a√≠slan card-artifacts, visor de tarjeta, shortcuts y release antes del build agregado para localizar el fallo exacto sin tocar Producci√≥n.

- R78 cierre funcional: Tarjeta Global limpia con s√≥lo logo oficial + CAMPO + MODALIDAD + FECHA antes de los jugadores/resultados; sin ‚ÄúTarjeta Global‚Äù, VERSI√ìN, ID OFICIAL/SHA-256, torneo ni categor√≠a en la cabecera. El logo se incrusta en el PNG exportado. Los botones de env√≠o quedan deshabilitados s√≥lo mientras se prepara el PNG y despu√©s son accionables; ENVIAR A JUGADORES usa los WhatsApp registrados y los textos de botones no son seleccionables.

- R80 diagn√≥stico card-artifacts: se divide temporalmente la regresi√≥n R79 en cabecera Global general, Global Stableford, Personal y matriz de categor√≠as para aislar exactamente el fallo del build agregado.

- R78 gate fix exacto: se retir√≥ el escape innecesario de comillas en los onclick del visor; no cambia l√≥gica, s√≥lo restaura el contrato y la ejecuci√≥n literal de shareOpenedArtifact/shareOpenedArtifactToRegisteredPlayers.

- R80 gate exacto ¬∑ archivos del diagn√≥stico registrados en ambos ROADMAPS: .github/workflows/roadmap-gate.yml, scripts/r80-card-diagnostic.mjs, ROADMAP_OVERALL.md, ROADMAP_A_DETALLE.md.

- R78 diagn√≥stico activo: se separan las aserciones restantes de Tarjeta Global (Stableford extendido, Universales y contaminaci√≥n legacy) para aislar el fallo exacto del gate sin cambiar l√≥gica funcional.

- R80 diagn√≥stico card-artifacts III: se a√≠slan las √∫ltimas aserciones no cubiertas (baseline, personales por modalidad y ausencia de hash/t√≠tulo Stableford). Archivos: .github/workflows/roadmap-gate.yml, scripts/r80-card-last-diagnostic.mjs.

- R80 causa exacta del build: la regresi√≥n R79 buscaba `meta-hash` en todo el HTML y confund√≠a una clase CSS no visible con informaci√≥n mostrada al usuario. Se corrige √∫nicamente el test para validar el texto visible `ID OFICIAL ¬∑ SHA-256`; la Tarjeta Global sigue sin mostrar ese dato. Archivos: test-card-artifacts.mjs, scripts/r80-card-last-diagnostic.mjs.

- R78 diagn√≥stico exacto: se separa el √∫ltimo fallo Stableford en dos checks independientes (t√≠tulo oculto e ID t√©cnico oculto) antes de tocar l√≥gica.

- R78 gate sync diagn√≥stico: ambos ROADMAPS registran en el mismo commit la separaci√≥n title/hash del √∫ltimo fallo Stableford; sin cambio funcional.

- PRODUCCI√ìN 2026-09-23 ¬∑ Publicaci√≥n directa de la correcci√≥n solicitada de tarjeta final limpia y exportaci√≥n. Archivos funcionales publicados: card-artifacts.js, card-file-export.js. Sin modificaci√≥n de c√°lculo deportivo.

- PRODUCCI√ìN 2026-09-23 ¬∑ Se alinea el diagn√≥stico heredado R80 con la tarjeta limpia vigente: la tarjeta personal no exige mostrar SHA-256. Archivo: scripts/r80-card-diagnostic.mjs. Sin cambio funcional ni deportivo.

- PRODUCCI√ìN 2026-09-23 ¬∑ Se elimina del workflow el gate heredado ¬´R80 card diagnostic ¬∑ personal unchanged¬ª, incompatible con la tarjeta limpia vigente y duplicado por las pruebas actuales. Archivo: .github/workflows/roadmap-gate.yml. Sin cambio de UI, Scores ni c√°lculo deportivo.

- PRODUCCI√ìN 2026-09-23 ¬∑ Se alinea test-card-artifacts.mjs con la tarjeta limpia vigente: no exige SHA-256 visible en tarjeta personal. Archivo: test-card-artifacts.mjs. Sin cambio funcional ni deportivo.

- PRODUCCI√ìN 2026-09-23 ¬∑ Se actualiza test-lab-r60-card-mode-purity.mjs para reconocer el shell limpio vigente sin resumen gen√©rico heredado en Match Play/Four Ball. Sin cambio de UI, Scores ni c√°lculo deportivo.

- PRODUCCI√ìN 2026-09-23 ¬∑ Auditor√≠a global alineada con Universales aprobado: acepta G/N/P (Gross, Neto y puntos) en vez de exigir encabezado GROSS gen√©rico. Archivo: test-lab-global-operational-audit.mjs. Sin cambio funcional ni deportivo.

- PRODUCCI√ìN 2026-09-23 ¬∑ Gate Universales ajustado para Global y Personal: reconoce G/N/P o PUNTOS seg√∫n el artefacto. Archivo: test-lab-global-operational-audit.mjs. Sin cambio funcional ni deportivo.

- LAB 2026-09-23 ¬∑ Versionado PWA corregido a R101 en index-grupal.html y service-worker.js; cache names y RELEASE dejan de identificarse como R80. Sin cambios en Scores ni c√°lculos deportivos.

- LAB 2026-09-23 ¬∑ test-lab-r60-production-refresh.mjs actualizado al release R101 para validar el nuevo versionado PWA/cach√©; resto del contrato permanece intacto.

- LAB 2026-09-23 ¬∑ Exportaci√≥n de tarjetas digitales: resoluci√≥n PNG elevada de 1600 a 2400 px con altura proporcional; im√°genes/logos pasan a ser obligatorios y el export falla expl√≠citamente si el logo no puede incrustarse, evitando enviar tarjetas sin logo. Aplica al exportador com√∫n de Global/Personal y todas las modalidades, incluyendo Four Ball, Match Play, Stableford, Universales y paneles laterales. Sin cambios deportivos.

- LAB 2026-09-23 ¬∑ Blindaje de modalidad en tarjeta digital: la identidad de share incluye modalidad activa y modalidad del snapshot; officialArtifacts bloquea cualquier cruce Match Play/Four Ball y valida que el artefacto generado corresponda a la modalidad. Regresi√≥n a√±adida: Match Play exige flechas y proh√≠be TEAM/MEJOR/Four Ball.

- LAB 2026-09-23 ¬∑ Correcci√≥n ra√≠z de Tarjeta Digital: compartir ahora genera el artefacto desde la ronda ACTUAL visible (modalidad + jugadores + scores) y no reutiliza un officialSnapshot hist√≥rico de otra modalidad. La identidad de cach√© incorpora modalidad y scores, evitando que Medal Play/Match Play hereden un PNG Four Ball previo. Aplica a COMPARTIR TARJETA y ENVIAR A JUGADORES.


### R106 ¬∑ 24 septiembre 2026
- Tarjetas digitales Match Play y Four Ball: presentaci√≥n global dividida en dos bloques, hoyos 1‚Äì9 arriba y 10‚Äì18 abajo, para mejorar legibilidad en iPhone y exportaci√≥n PNG.
- Compartir tarjeta: regeneraci√≥n por modalidad activa y prevenci√≥n de reutilizaci√≥n de artefactos de otra modalidad.
- Entrada manual: encabezados JUGADOR, SCORE y TECLADO homologados en tama√±o y alineaci√≥n; HOYO conserva identificaci√≥n verde.

- R106 gate: prueba automatizada Match Play actualizada para validar los dos bloques 1‚Äì9 y 10‚Äì18 y sus separadores de parejas.

- R106 hotfix f√≠sico 2026-09-24 ¬∑ Stableford incorpora los seis campos configurados (El Pult√©, Country Club, San Isidro, Mayan Golf, Hacienda Nueva y Alta Vista). Match Play sustituye flechas SVG por s√≠mbolos de texto ‚Üë/‚Üì y = para evitar desaparici√≥n en PNG. El exportador com√∫n recorta autom√°ticamente el lienzo negro sobrante, conserva alta resoluci√≥n y a√±ade timeouts de exportaci√≥n. Archivos: index-grupal.html, stableford.js, card-artifacts.js, card-file-export.js, test-stableford.mjs.

- R106 hotfix gate 2026-09-24 ¬∑ test-v306-match-play.mjs actualizado al contrato visual aprobado de Match Play: ‚Üë gan√≥, ‚Üì perdi√≥ y = empate; valida que los tres s√≠mbolos est√©n presentes en la tarjeta Global exportable.

- 2026-09-24 R106-H3: tarjetas digitales ‚Äî invalida cach√© H2 para cargar el generador/exportador vigente; conserva exactamente formato, diagrama, tama√±os, fuentes, orden, casillas y l√≠nea gr√°fica; render PNG nativo 3√ó/4200 px; logo oficial obligatorio; paleta exclusiva negro/verde/blanco. Archivos de control actualizados: ROADMAP_A_DETALLE.md, ROADMAP_OVERALL.md. Registro t√©cnico de esta modificaci√≥n: ROADMAP_A_DETALLE.md y ROADMAP_OVERALL.md se modifican conjuntamente; card-artifacts.js, card-file-export.js, test-v278-card-image-pdf-export.mjs, service-worker.js e index-grupal.html forman el paquete R106-H3.

- R106-H3 FINAL BUILD: card-file-export.js + test-v278-card-image-pdf-export.mjs + scripts/build-manual-lab.mjs; sin cambios de formato visual de las tarjetas. ROADMAP_A_DETALLE.md y ROADMAP_OVERALL.md actualizados conjuntamente.


### R106-H4 ‚Äî Shared digital scorecard matrix ‚Äî 2026-09-24
LAB now uses the approved two-nine Medal Play matrix for shared cards: 1‚Äì9 + 10‚Äì18, G/N per hole, PAR and per-nine totals, up to six registered players. Changed: card-artifacts.js, test-card-artifacts.mjs, ROADMAP_A_DETALLE.md, ROADMAP_OVERALL.md. Production publication remains gated by LAB validation and owner authorization.


### R128.20 ¬∑ 27 septiembre 2026 ¬∑ MATRIZ DE ACTUALIZACI√ìN PERMANENTE
- Correcci√≥n ra√≠z del actualizador PWA en LAB: service-worker.js deja de depender de una versi√≥n RELEASE escrita manualmente y obtiene la versi√≥n publicada desde release.json con cache no-store.
- release.json queda excluido de la cach√© del Service Worker para que una instalaci√≥n anterior pueda descubrir siempre una versi√≥n nueva.
- Los nombres de cach√© dejan de depender del n√∫mero de release; la promoci√≥n de shell conserva sesi√≥n/datos locales y permite saltos entre versiones sin editar manualmente el updater.
- Nuevo gate scripts/release-matrix-gate.mjs: bloquea publicaci√≥n si index-grupal.html y release.json divergen, si el Service Worker vuelve a hard-codear una release o si release.json deja de saltarse cach√©.
- .github/workflows/full-app-manual-physical-parity.yml ejecuta este gate en cada push de LAB antes de la auditor√≠a f√≠sica.
- Archivos: service-worker.js, scripts/release-matrix-gate.mjs, .github/workflows/full-app-manual-physical-parity.yml, ROADMAP_OVERALL.md, ROADMAP_A_DETALLE.md. Sin cambio de dise√±o, Scores ni c√°lculo deportivo. Producci√≥n EPG Caddy no se modifica.

## R138 ¬∑ 29 septiembre 2026 ¬∑ actualizaci√≥n y MI RONDA
- Correcci√≥n: MI RONDA a√±adido en la tarjeta, a la derecha de RONDA PREVIA; muestra los scores de la ronda activa sin cambiar torneo ni guardar datos nuevos.
- Actualizaci√≥n: namespace nuevo del Service Worker, versi√≥n recuperada de release.json, navegaci√≥n de actualizaci√≥n a red sin cach√© y refresco del shell antes de promover.
- Rollback LAB: deployment dpl_9CQvZ6huTzxXhR6wHJ7N6bYzoKXf, commit f3f954f48a4cdc820031c75fea29faa2e2e02eb7.
- Archivos: index-grupal.html, service-worker.js, release.json, test-lab-round-create-modal.mjs, test-lab-update-recovery.mjs, ROADMAP_OVERALL.md, ROADMAP_A_DETALLE.md, CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md, CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md, CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json.
- Estado: pruebas y publicaci√≥n LAB en curso; verificaci√≥n f√≠sica iPhone pendiente.

R140 ¬∑ Ajuste solicitado: BORRAR RONDA Y JUGADORES junto a RONDA PREVIA; RONDA PARTICULAR y SCORES GRUPO en la √∫ltima fila. SCORES GRUPO abre √∫nicamente el marcador de la ronda vinculada. Pruebas dirigidas PASS.

R140 ¬∑ Marcador particular: acabado premium coherente con la aplicaci√≥n, cabecera y filas alineadas, tipograf√≠a uniforme, neto verde, separadores y panel redondeado. Sin cambios de c√°lculos ni funciones.

R141 ¬∑ Primera apertura: eliminadas navegaciones autom√°ticas concurrentes al activar el service worker; cambio de controlador verifica versi√≥n sin recargar campos. Comprobaci√≥n de release limitada a 8 segundos, libera estado en fallo. Prueba test-lab-first-open PASS. Evidencia iPhone R136/COMPROBANDO aportada por propietario; causa exacta del teclado f√≠sico a√∫n no reproducida. Rollback: LAB R140 fa207a7 / dpl_BzbDc1PrmGmh47Z6kmXo1cm3vfne.

R141 ¬∑ SCORES GRUPO muestra √∫nicamente Scores, sin c√≥digo ni compartir. C√≥digo conservado en creaci√≥n/gesti√≥n RONDA PARTICULAR. Resultado negativo verde, positivo rojo. X conservada, sin bot√≥n de regreso por cancelaci√≥n expresa.

R141 ¬∑ Archivos de prueba: test-lab-first-open.mjs, test-lab-private-rounds.mjs, test-lab-round-create-modal.mjs. PASS arranque, timeout, ocultaci√≥n de c√≥digo y colores.

R142 ¬∑ Corregido indicador hardcoded R136: badge y bot√≥n derivan exclusivamente de meta gscg-release, sin override data-server-release. test-lab-first-open.mjs compara ambos contra release.json. Archivos: index-grupal.html, service-worker.js, release.json, test-lab-round-create-modal.mjs. Rollback R141 f9d7abe / dpl_HznTauXqSoqUNhJWWHWkUCgrcP7B.

R142 ¬∑ Rondas particulares: retiro reversible de las dos pruebas Cuates identificadas por UUID; caducidad 60#]∫Ô´hëÈÏ∂ªßq´^u±Öàµù’ïÕ–µÖççΩ’π–µïπ—…‰πµ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµù’ïÕ–µ±Ωù•∏µ—…ÖπÕ•—•Ω∏πµ©ÕÄ∞ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}1%Y}Hƒ–ÿΩù’ïÕ–µâ’•±êπ±ΩùÄ∞ÅÅI=5A}=YI10πµëÄ∞ÅÅI=5A}}Q11πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄ∏ÅA…Ωë’ççßÕ∏Å•π—Öç—ÑÏÅπºÅïπ—…ïùÑÅô•πÖ∞ƒ¿¿î∏((¿‰Ë»ÃÅ’Ö—ïµÖ±ÑËÅâ’•±êÅçΩµ¡±ï—ºÅ‰ÅçÖ±•ëÖêΩπïùÖ—•ŸΩÃÅAML∏ÅA’â±•çÖçßÕ∏ÅëîÅïÕ—îÅâ±Ω≈’îÅ‰Å±Ωù•∏Å…ïÖ∞Å—ΩëÖ€µÑÅ¡ïπë•ïπ—ïÃÏÅïŸ•ëïπç•ÑÅù’ïÕ–µâ’•±êπ±Ωú∏(((åååÅHƒ–ÿÉ
‹Åïπ—…ÖëÑÅï·¡≥µç•—ÑÅç’ïπ—ÑÅÕΩâ…îÅçΩΩ≠•îÅ•πŸ•—ÖëºÉ
‹ÄÃ¿ÅÕï¡—•ïµâ…îÄ»¿»ÿÄ¿‰Ë–ÃÅ’Ö—ïµÖ±Ñ)%5|‘Ã‘ƒº‘Ã‘»ÅçΩπô•…µÑÅïπ—…ÖëÑÅï≈’•ŸΩçÖëÑÅ¡Ω»ÅQΩ…πïΩÃÅ‰ÅIïù•Õ—…ºÅáÈ∏Å•πŸ•—Öëº∏ÅÖ’ÕÑËÅ•π•–ÅëîÅÖ’—†µùÖ—îÅ…ï—Ω…πÖâÑÅ¡Ω»ÅçΩΩ≠•îÅÖπ—ïÃÅëîÅÖ—ïπëï»ÅÖççΩ’π–Ùƒ∏ÅΩ……ïççßÕ∏ËÅ•π—ïπçßÕ∏Åï·¡≥µç•—ÑÅÖççΩ’π–ÙƒÅµ’ïÕ—…ÑÅç’ïπ—ÑÅçΩπÕï…ŸÖπëºÅ•πŸ•—ÖçßÕ∏Å°ÖÕ—ÑÅ±Ωù•∏Å€Ö±•ëº∞ÅÕ•∏Åëïç±Ö…Ö»ÅçÖµâ•ºÅëîÅ•ëïπ—•ëÖêÅ¡Ω»ÅUI0∏ÅQïÕ–ÅY4Åëï∞Å∑Õë’±ºÅ…ïÖ∞ÅÖÕïù’…ÑÅôΩ…µ’±Ö…•ºÅŸ•Õ•â±îÅ‰Åçï…ºÅ…ï≈’ïÕ–ΩÕÖ±•ëÑÅÖπ—•ç•¡ÖëÑ∏ÅI’—ÑÅëîÅïπ—…ÖëÑÅÕΩ±•ç•—ÖëÑÅïÃÅ•πëï‡µù…’¡Ö∞π°—µ∞˝•π•ç•ºÙƒôÖççΩ’π–Ùƒ∞ÅπºÅ¡Ω…—Ö∞∏Å1Ωù•∏Å°Öâ•—’Ö∞ÅÕ•ù’îÅ¡ïπë•ïπ—îÅëîÅÕïÕßÕ∏Å…ïÖ∞ÏÅπºÅ•πŸïπ—Ö»ÅÖ±•ÖÃΩçΩ……ïºÅπ§ÅçÖµâ•Ö»Åç…ïëïπç•Ö±ïÃ∏)…ç°•ŸΩÃËÅÅÖ’—†µùÖ—îπ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµù’ïÕ–µÖççΩ’π–µïπ—…‰πµ©ÕÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩY%9%M}1%Y}Hƒ–ÿΩù’ïÕ–µâ’•±êπ±ΩùÄ∞ÅÅI=5A}=YI10πµëÄ∞ÅÅI=5A}}Q11πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄ∏ÅA…Ωë’ççßÕ∏Å•π—Öç—Ñ∏(((ååÅHƒ–ÿÉ
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
‹ÄÃ¿ÅÕï¡—•ïµâ…îÄ»¿»ÿ∞ÄƒÃË–¿Å’Ö—ïµÖ±Ñ()MîÅ…ï—•…ÑÅï∞ÅçÖπëÖëºÅùïπï…Ö∞ÅëîÅ±ÑÅÖ¡±•çÖçßÕ∏∏ÅÄΩÄ∞ÅÄΩ•πëï‡π°—µ±ÄÅîÅ%π•ç•ºÅ±±ïŸÖ∏ÅÑÅIïù•Õ—…º∞Å‰Åï∞Åµ•ëë±ï›Ö…îÅëï©ÑÅëîÅ…ïë•…•ù•»ÅÑÅ©’ùÖëΩ…ïÃÅÕ•∏ÅÕïÕßÕ∏ÅÑÅ’πÑÅ¡Öπ—Ö±±ÑÅ¡…Ω¡•ï—Ö…•ÑÅºÅÑÅ’∏ÅôΩ…µ’±Ö…•ºÅëîÅèÕë•ùº∏ÅÅÖççïÕÃπ°—µ±ÄÅ≈’ïëÑÅçΩµºÅ°ï……Öµ•ïπ—ÑÅÖëµ•π•Õ—…Ö—•ŸÑÅΩ¡ç•ΩπÖ∞Å¡Ö…ÑÅ•πŸ•—Öç•ΩπïÃÅëîÄ»–Å°Ω…ÖÃÏÅπºÅïÃÅ±ÑÅ¡’ï…—ÑÅëîÅIïù•Õ—…º∏ÅMîÅçΩπÕï…ŸÑÅ%9Y%QHÉ
‹Ä»–Å Å‰Åï∞ÅŸïπç•µ•ïπ—ºÅëîÅïÕÑÅÕïÕßÕ∏Å•πŸ•—ÖëÑÏÅÖ∞ÅŸïπçï»∞Åï∞Å’Õ’Ö…•ºÅ¡ï…µÖπïçîÅï∏Å±ÑÅÖ¡¿Å±•â…î∏Å1ΩÃÅA%ÃÅ¡…•ŸÖëΩÃÅµÖπ—•ïπï∏ÅÕ’ÃÅŸï…•ô•çÖç•ΩπïÃÅëîÅç’ïπ—Ñ∞Åµïµâ…ïœµÑ∞ÅçÖ¡Öç•ëÖêÅ‰ÅÕïç…ï—ºÏÅ’πÑÅÖ¡ï…—’…ÑÅ√Èâ±•çÑÅëîÅIïù•Õ—…ºÅπºÅï·¡ΩπîÅ—Ω…πïΩÃÅπ§ÅëÖ—ΩÃÅ¡ï…ÕΩπÖ±ïÃ∏Å1ΩÃÅèÕë•ùΩÃÅ•πë•Ÿ•ë’Ö±ïÃÅëîÅ—Ω…πïºÅÕ•ù’ï∏ÅçΩµºÅô’πçßÕ∏Å•πëï¡ïπë•ïπ—î∏()1ÑÅŸï…ÕßÕ∏Å•ëïπ—•ô•çÖâ±îÅçÖµâ•ÑÅÑÅHƒ–ÿ∏ƒ∏ƒÅï∏ÅÅ…ï±ïÖÕîπ©ÕΩπÄ∞ÅâÖëùîÅ‰ÅçÖç£§ÅA]∏Å	’•±êÅ‰Å…ïŸ•ÕßÕ∏ÅŸ•Õ’Ö∞Ωëï¡±ΩÂµïπ–ÅïÕ”Ö∏Å¡ïπë•ïπ—ïÃÏÅA…Ωë’ççßÕ∏ΩÖ±•ÖÃÅïÕ—Öâ±îÅπºÅÕîÅµΩë•ô•çÖ∏∏Å…ç°•ŸΩÃËÅÅµ•ëë±ï›Ö…îπ©ÕÄ∞ÅÅÖççïÕÃπ°—µ±Ä∞ÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅù’ïÕ–µÖççïÕÃπ©ÕÄ∞ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄ∞ÅÅ…ï±ïÖÕîπ©ÕΩπÄ∞ÅÅ—ïÕ–µ±•ŸîµÕ°Ö…îµµ•ëë±ï›Ö…îπµ©ÕÄ∞ÅÅ—ïÕ–µΩ›πï»µ•πŸ•—Ö—•Ω∏µ’§πµ©ÕÄ∞ÅÅ—ïÕ–µ»ƒ‡µΩ›πï»µù’ïÕ–¥»—†µÖççïÕÃπµ©ÕÄ∞ÅÅ—ïÕ–µÿÃƒƒµ±•ŸîµÕ’¡¡Ω…–µ±•π¨πµ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµ»ÿ¿µ¡°ÂÕ•çÖ∞µµÖ—…•‡πµ©ÕÄ∞ÅÅ—ïÕ–µµÖπ’Ö∞µÕ—Ö…—’¿µÕ°Ö…•πúπµ©ÕÄ∞ÅÅ—ïÕ–µ±ÖàµÖççΩ’π–µùÖ—îπµ©ÕÄ∞ÅÅI=5A}}Q11πµëÄ∞ÅÅI=5A}=YI10πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=LπµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄ∏(((ååÅHƒ–ÿ∏ƒ∏ƒÉ
‹ÅÖç±Ö…ÖçßÕ∏ÅëîÅ•πŸ•—ÖçßÕ∏Å—ïµ¡Ω…Ö∞É
‹ÄÃ¿ÅÕï¡—•ïµâ…îÄ»¿»ÿ()1ÑÅïπ—…ÖëÑÅ…áµËÄ°ÄΩÄ∞ÅÄΩ•πëï‡π°—µ±Ä∞ÅÄΩ•π•ç•ΩÄ§Å‰ÅIïù•Õ—…ºÅπºÅçÖ…ùÖ∏Åï∞Å∑Õë’±ºÅÅÖ’—†µùÖ—îπ©ÕÄÅπ§Å…ï≈’•ï…ï∏Åç…ïëïπç•Ö±ïÃ∏ÅÅÖççïÕÃπ°—µ±ÄÅçΩπÕï…ŸÑÅÕ‘ÅÖ’—ïπ—•çÖçßÕ∏ÅœÕ±ºÅ¡Ö…ÑÅÖëµ•π•Õ—…Ö»Å•πŸ•—Öç•ΩπïÃÅ•πë•Ÿ•ë’Ö±ïÃÅëîÅ’∏Å’ÕºÅ‰Ä»–Å°Ω…ÖÃÏÅπºÅΩô…ïçîÅ’∏ÅâΩ”Õ∏Å¡Ö…ÑÅÖâ…•»Å±ÑÅÖ¡¿∏ÅMîÅçΩπÕï…ŸÖ∏Åï∞ÅâΩ”Õ∏Å%9Y%QHÉ
‹Ä»–Å ∞Åï∞ÅçÖπ©î∞Åï∞ÅÖ•Õ±Öµ•ïπ—ºÅ‰Å±ÑÅçÖë’ç•ëÖêÅëîÅ±ÑÅÕïÕßÕ∏Å•πŸ•—ÖëÑ∏Å∞ÅŸïπçï»ÅºÅôÖ±±Ö»Å±ÑÅçΩπÕ’±—ÑÅëîÅÕïÕßÕ∏∞Å±ÑÅÖ¡¿Å¡ï…µÖπïçîÅÖâ•ï…—ÑÅ‰ÅIïù•Õ—…ºÅÕ•ù’îÅ±•â…îÏÅœÕ±ºÅ—ï…µ•πÖ∏Å±ΩÃÅ¡ï…µ•ÕΩÃÅëîÅïÕÑÅ•πŸ•—ÖçßÕ∏∏Å5Ö—…•çïÃ∞ÅµÖ¡ÑÅ‰Å…ïù…ïÕ•ΩπïÃÅ…ïô±ï©Ö∏Å±ÑÅÕï¡Ö…ÖçßÕ∏∏ÅM•∏ÅëïÕ¡±•ïù’îÅπ§ÅçÖµâ•ºÅÑÅA…Ωë’ç—•Ω∏∏()…ç°•ŸΩÃËÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅÖççïÕÃπ°—µ±Ä∞ÅÅù’ïÕ–µÖççïÕÃπ©ÕÄ∞ÅÅ—ïÕ–µ±ÖàµÖççΩ’π–µùÖ—îπµ©ÕÄ∞ÅÅ—ïÕ–µ»ƒ‡µΩ›πï»µù’ïÕ–¥»—†µÖççïÕÃπµ©ÕÄ∞ÅÅ—ïÕ–µΩ›πï»µ•πŸ•—Ö—•Ω∏µ’§πµ©ÕÄ∞ÅÅ—ïÕ–µÿÃƒƒµ±•ŸîµÕ’¡¡Ω…–µ±•π¨πµ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµ»ÿ¿µ¡°ÂÕ•çÖ∞µµÖ—…•‡πµ©ÕÄ∞ÅÅ—ïÕ–µµÖπ’Ö∞µÕ—Ö…—’¿µÕ°Ö…•πúπµ©ÕÄ∞ÅÅ—ïÕ–µÿ–¿‘µ…ïù•Õ—…Ö—•Ω∏µç±ïÖ»µô•πÖ∞µµΩâ•±îπµ©ÕÄ∞ÅÅ=1}M=I}I}Q}A9%9}5QI%`πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩ%IQI%M}59Q=I%LπµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩ5QI%i}Q|¡}AI=eQ<πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩ5QI%i}Q|¡}AI=eQ<π©ÕΩπÄ∞ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩA9}1%Y|¿ƒ·}=1}M=I}I}Q}1%YπµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=LπµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµëÄ∞ÅÖµâΩÃÅI=5ALÅîÅÅ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄ∏((ååÅHƒ–‹É
‹Åïπ—…ÖëÑÅ±•â…îÅëïÕëîÅ…áµËÉ
‹ÄÃ¿ÅÕï¡—•ïµâ…îÄ»¿»ÿ()MîÅ¡’â±•çÑÅçΩµºÅHƒ–‹Å±ÑÅ…ïù±ÑÅ¡ï…µÖπïπ—îÅëîÅïπ—…ÖëÑÅ√Èâ±•çÑËÅ±ÖÃÅ…’—ÖÃÅÄΩÄ∞ÅÄΩ•πëï‡π°—µ±ÄÅîÅÄΩ•π•ç•ΩÄÅ±±ïŸÖ∏ÅÑÅIïù•Õ—…º∞Å‰Åï∞Åµ•ëë±ï›Ö…îÅπºÅçΩ±ΩçÑÅ’πÑÅ¡’ï…—ÑÅëîÅç’ïπ—ÑÅï∏Å√Öù•πÖÃÅπΩ…µÖ±ïÃ∏Å1ÑÅπ’ïŸÑÅ…ïù…ïÕßÕ∏ÅçΩµ¡…’ïâÑÅïÕÖÃÅ…’—ÖÃÅ©’π—ºÅçΩ∏Å±ÑÅÖ’Õïπç•ÑÅëîÅÅÖ’—†µùÖ—îπ©ÕÄÅï∏ÅIïù•Õ—…º∏ÅMîÅçΩπÕï…ŸÑÅ±ÑÅÖ’—ïπ—•çÖçßÕ∏Åï·ç±’Õ•ŸÑÅ¡Ö…ÑÅï∞Å¡Öπï∞ÅΩ¡ç•ΩπÖ∞ÅëîÅ•πŸ•—Öç•ΩπïÃÅ‰Å¡Ö…ÑÅ…ïç’…ÕΩÃÅ¡…•ŸÖëΩÃÏÅπºÅ…ïÕ—…•πùîÅï∞ÅÖççïÕºÅÑÅ±ÑÅÖ¡±•çÖçßÕ∏Åùïπï…Ö∞∏ÅÅ…ï±ïÖÕîπ©ÕΩπÄ∞Åï∞ÅâÖëùîÅ‰Å±ÑÅçÖç£§ÅA]ÅÕîÅÖç—’Ö±•ÈÖ∏ÅÑÅHƒ–‹Å¡Ö…ÑÅ°Öâ•±•—Ö»Å±ÑÅëï—ïççßÕ∏ÅëîÅ±ÑÅÖç—’Ö±•ÈÖçßÕ∏Å•πÕ—Ö±ÖëÑ∏()∞Åùïπï…ÖëΩ»ÅëîÅ•πŸïπ—Ö…•ΩÃÅ—ΩµÑÅÕ‘ÅÀÕ—’±ºÅ‰ÅŸï…ÕßÕ∏ÅëîÅÅ…ï±ïÖÕîπ©ÕΩπÄ∞ÅïŸ•—ÖπëºÅÕï±±ΩÃÅ°ï…ïëÖëΩÃÅëîÅHƒ‡∏Å	’•±êÅµÖπ’Ö∞Å1∞Å≈’Ö±•—‰ÅùÖ—î∞Å…ΩÖëµÖ¿ÅùÖ—î∞Å•πŸïπ—Ö…•ºÅ‰Å…ïù…ïÕ•ΩπïÃÅë•…•ù•ëÖÃËÅAML∏Å…ç°•ŸΩÃËÅÅÕç…•¡—ÃΩ…ïâ’•±êµ•πŸïπ—Ω…‰µ¡ëôÃπ¡ÂÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄ∏ÅA…ïŸ•ï‹ÅHƒ–‹ÅáÈ∏ÅπºÅïπŸ•ÖëºÅÑÅYï…çï∞∏()…ç°•ŸΩÃËÅÅ…ï±ïÖÕîπ©ÕΩπÄ∞ÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄ∞ÅÅ—ïÕ–µ±ÖàµÖççΩ’π–µùÖ—îπµ©ÕÄ∞ÅÅ=1}M=I}I}Q}A9%9}5QI%`πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=LπµëÄ∞ÅÅI=5A}}Q11πµëÄ∞ÅÅI=5A}=YI10πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄ∏((åååÅHƒ–ÿ∏ƒ∏ƒÉ
‹ÅπΩ…µÖ±•ÈÖçßÕ∏Åëï∞Å¡Ö…ç°îÅŸ•Õ•â±îÉ
‹ÄÃ¿ÅÕï¡—•ïµâ…îÄ»¿»ÿ(¥ÅÅ•πëï‡µù…’¡Ö∞π°—µ±ÄËÅï∞Å¡Ö…Õï»ÅëîÅŸï…Õ•ΩπïÃÅÖ°Ω…ÑÅÖçï¡—ÑÅŸÖ…•ΩÃÅÕïùµïπ—ΩÃÅπ’∑•…•çΩÃÅ‰Å¡…ïÕïπ—ÑÅÅHƒ–ÿ∏ƒ∏≈ÄÅï∏Åï∞ÅâÖëùîÅï∏ÅŸïËÅëï∞Å•ëïπ—•ô•çÖëΩ»Å•π—ï…πºÅëï∞ÅëïÕ¡±•ïù’î∏(¥ÅIïù…ïÕßÕ∏ËÅÅ—ïÕ–µ±Öàµô•…Õ–µΩ¡ï∏πµ©ÕÄÅçΩµ¡…’ïâÑÅâÖëùîÅîÅ%ÅçΩπ—…ÑÅÅ…ï±ïÖÕîπ©ÕΩπÄÏÅAMLÅ—…ÖÃÅçΩ……ïù•»Åï∞Å¡Ö…Õï»∏(¥Å!Ö±±ÖÈùºÅ‰ÅçΩπ—…Ω∞Å¡ï…µÖπïπ—îÅ…ïù•Õ—…ÖëΩÃÅï∏ÅÅI%MQI=}I%9%9%M}1%πµëÄ∏Å1ÑÅ¡’â±•çÖçßÕ∏ÅëîÅïÕ—ÑÅçΩ……ïççßÕ∏Å≈’ïëÑÅ¡ïπë•ïπ—îÅëîÅπ’ïŸÑÅŸï…•ô•çÖçßÕ∏ÅA…ïŸ•ï‹Å‰ÅA…Ωë’ççßÕ∏∏((ååÅHƒ–‹∏ƒÉ
‹Å=5AIQ%HÅÖ∞Åç…ïÖ»Å’πÑÅ…ΩπëÑÅ¡…•ŸÖëÑÉ
‹ÄÃ¿ÅÕï¡—•ïµâ…îÄ»¿»ÿ()∞Åç…ïÖ»Å±ÑÅ…ΩπëÑÅ¡…•ŸÖëÑÅëïÕëîÅIïù•Õ—…ºÅÖ¡Ö…ïçîÅï∞ÅèÕë•ùºÅëîÅÖççïÕºÅ‰Å±ÑÅΩ¡çßÕ∏ÅëîÅçΩµ¡Ö…—•…±ºÅçΩ∏Å]°Ö—Õ¡¿∏Å∞Åçï……Ö»Å±ÑÅ°Ω©ÑÅëï∞Å—ï≥•ôΩπºÅëïÕ¡◊•ÃÅëîÅçΩµ¡Ö…—•»∞ÅÖâ…îÅ±ÑÅMçΩ…îÅÖ…êÏÅÖ∞ÅçÖπçï±Ö»Åëï©ÑÅï∞ÅâΩ”Õ∏Å¡Ö…ÑÅ…ï•π—ïπ—Ö»Å‰Å±ÑÅÖ±—ï…πÖ—•ŸÑÅ¡Ö…ÑÅçΩπ—•π’Ö»Åë•…ïç—Öµïπ—î∏ÅMîÅÖ’µïπ—ÑÅ±ÑÅ…ïŸ•ÕßÕ∏ÅëîÅHƒ–‹ÅÑÅHƒ–‹∏ƒÅ¡Ö…ÑÅÖŸ•ÕÖ»ÅÑÅ±ÑÅÖ¡¿Å•πÕ—Ö±ÖëÑ∏ÅA…’ïâÖÃÅë•…•ù•ëÖÃÅç’â…ï∏ÅçΩµ¡Ö…—•»ΩçÖπçï±Ö»Å‰Åëï—ïççßÕ∏ÅëîÅÖç—’Ö±•ÈÖçßÕ∏ÏÅπºÅçï…—•ô•çÖ∏Å±ÑÅïπ—…ïùÑÅï·—ï…πÑÅëï∞ÅµïπÕÖ©îÅπ§Å±ÑÅ…ïŸ•ÕßÕ∏ÅõµÕ•çÑÅëï∞Å•A°Ωπî∏Å…ç°•ŸΩÃËÅÅ¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµ¡…•ŸÖ—îµ…Ω’πêµÕ°Ö…îµô±Ω‹πµ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµô•…Õ–µΩ¡ï∏πµ©ÕÄ∞ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄ∞ÅÅ…ï±ïÖÕîπ©ÕΩπÄ∞ÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ=9Q%9U%}5MQI}1πµëÄ∞ÅÅ=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=LπµëÄ∞ÅÖµâΩÃÅI=5AL∞ÅÅ=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄ∏((ååÅHƒ–‹∏»É
‹ÅçΩµ¡Ö…—•»Å1%YÅ‰Å±ïù•â•±•ëÖêÅëîÅMçΩ…ïÃÉ
‹ÄÃ¿ÅÕï¡—•ïµâ…îÄ»¿»ÿ)1ÖÃÅ…ΩπëÖÃÅ¡…•ŸÖëÖÃÅ°ï…ïëÖëÖÃÅ’ÕÖ∏ÅÕ‘ÅA$Å1%YÅ¡Ö…ÑÅùïπï…Ö»ÅèÕë•ùºÅÖ’∏Åç’ÖπëºÅï∞Å∑Õë’±ºÅëîÅïŸïπ—ΩÃÅ¡ï…ÕΩπÖ±ïÃÅïÕ”§ÅçÖ…ùÖëº∏ÅQ…ÖÃÅçΩµ¡±ï—Ö»Åï∞Åïπ€µºÅÕîÅç•ï……ÑÅï∞Å¡Öπï∞Å‰Å…ïù…ïÕÑÅÑÅ±ÑÅMçΩ…îÅÖ…êÏÅçÖπçï±Ö»Åëï©ÑÅ±ÑÅ¡Öπ—Ö±±ÑÅë•Õ¡Ωπ•â±î∏ÅM§Åï∞ÅÕï…Ÿ•ç•ºÅôÖ±±Ñ∞Å±ÑÅ•π—ï…ôÖËÅµ’ïÕ—…ÑÅï∞Åï……Ω»∏ÅMîÅÖµ¡≥µÑÅ±ÑÅô’ïπ—îÅ‰Å—Öµá≈ºÅëîÅ±ÑÅ—Öâ±ÑÅÕïüÈ∏Å±ÑÅ…ïôï…ïπç•ÑÅ%5|‘–Ã‘∏ÅIïù…ïÕ•ΩπïÃÅë•…•ù•ëÖÃÅÅ—ïÕ–µ±Öàµ¡…•ŸÖ—îµ…Ω’πëÃπµ©ÕÄ∞ÅÅ—ïÕ–µ±ÖàµçΩëîµïπ—…‰πµ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµô•…Õ–µΩ¡ï∏πµ©ÕÄËÅAML∏ÅÅIHÅQ=I9=ÄÅçΩπÕï…ŸÑÅÖ’—Ω…•ÈÖçßÕ∏Å¡Ω»Å•ëïπ—•ëÖêÅëï∞Å…ïç’…ÕºÏÅ±ÑÅçÖ¡—’…ÑÅµ’ïÕ—…ÑÅÕΩ±•ç•—’êÅëîÅ•π•ç•ºÅëîÅÕïÕßÕ∏∞Å¡Ω»Å±ºÅ≈’îÅπºÅÕîÅç…óÃÅ’∏Å—Ω…πïºÅÕ•∏ÅÖ’—Ω…•ÈÖçßÕ∏∏Å	’•±êÅ•π—ïù…Ö∞Å1ÅAMLÏÅ≈’Ö±•—‰Ω…ΩÖëµÖ¿Ω•πŸïπ—Ω…‰ÅùÖ—ïÃÅ¡ΩÕ—ï…•Ω…ïÃ∞ÅA…ïŸ•ï‹Å‰Å¡…’ïâÑÅõµÕ•çÑÅáÈ∏Å¡ïπë•ïπ—ïÃÏÅA…Ωë’ççßÕ∏Å•π—Öç—Ñ∏Å…ç°•ŸΩÃËÅÅ±•ŸîµÕ°Ö…îπ©ÕÄ∞ÅÅ¡…•ŸÖ—îµ…Ω’πëÃπ©ÕÄ∞ÅÅ—ïÕ–µ±Öàµ¡…•ŸÖ—îµ…Ω’πëÃπµ©ÕÄ∞ÅÅ…ï±ïÖÕîπ©ÕΩπÄ∞ÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄ∞Å¡ïπë•ïπ—îÅ1%Y¥¿ƒ‡∞ÅçΩπ—•π’•ëÖê∞ÅµÖ¡Ñ∞Å…ï•πç•ëïπç•ÖÃ∞Å•πŸïπ—Ö…•ºÅ‰ÅÖµâΩÃÅI=5AL∏((åååÅHƒ–‹∏»É
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
‹ÄƒÅΩç—’â…îÄ»¿»ÿ)=…ëï∏ËÅ—ΩëÖÃÅ±ÖÃÅ`ÅëîÅç•ï……îÅŸï…ëïÃÅÑÅ±ÑÅ•È≈’•ï…ëÑÅô’ï…ÑÅëï∞ÅµÖ…çº∞Åô’ïπ—î»»∏’¡‡Ä°…ïôï…ïπç•Ñƒ’¡‡Ä¨‘¿î§∞ÉÖ…ïÑÅ”Öç—•∞–—¡‡∏ÅπçÖâïÈÖëΩÃÅMçΩ…ïÃ∞Å¡…•ŸÖëºÅ‰Åëï—Ö±±îÅçΩµ¡Ö…—ï∏ÅÖπç°º–‹∏‘îÅëï∞Å±ΩùºÅ‰ÅµÖ…ùï∏Ω…ï”µç’±Ñ∏ÅQU1%iHÅ¡…ïÕï…ŸÑÅ¡ï…ÕΩπÖ±ççΩ’π–Ω¡ï…ÕΩπÖ±Ÿïπ–Ω¡ï…ÕΩπÖ±-•πêÅ‰ÅŸ’ï±ŸîÅÑÅ±ÑÅ…ΩπëÑÅçΩπô•ù’…ÖëÑÏÅçΩπÕï…ŸÑÅ…ïù•Õ—…ºÅç’ÖπëºÅïÕ”ÑÅï∏Åïë•çßÕ∏∏ÅAΩ…—Ö∞Å•πç±’ÂîÅ9QIHÅÅQ=I9<Åa%MQ9Q∞ÅïŸïπ—ΩÃÅÖ’—Ω…•ÈÖëΩÃÅ‰Åïπ—…ÖëÑÅÑÅ—Ö…©ï—ÑÅÖÕ•ùπÖëÑÏÅ•πŸ•—ÖçßÕ∏ÅÕ•ù’îÅÖ’—Ω…•ÈÖçßÕ∏ÅŸ•ùïπ—î∏Å9ºÅÖ±—ï…ÑÅèÖ±ç’±ΩÃÅπ§Åµ•ïµâ…ΩÃÅëï∞Å—Ω…πïº∏Å…ç°•ŸΩÃËÅÕ°Ω…—ç’—Ãµ’§π©Ã∞ÅÕçΩ…ïÃµ’§πçÕÃ∞Å¡…•ŸÖ—îµ…Ω’πëÃπ©Ã∞ÅÖ¡¿µ’¡ëÖ—îπ©Ã∞Å•πëï‡µù…’¡Ö∞π°—µ∞∞Å±•Ÿîµ°’àπ°—µ∞∞Å±•Ÿîµ°’àπ©Ã∞ÅÕï…Ÿ•çîµ›Ω…≠ï»π©Ã∞Å…ï±ïÖÕîπ©ÕΩ∏∞Å—ïÕ–µ’¡ëÖ—îµëï±•Ÿï…‰µçΩπ—…Ω∞πµ©Ã∞ÅI=5A}=YI10πµê∞ÅI=5A}}Q11πµê∞Å=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩ∏∞Å=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµê∏Å	ÖπçºΩ¡…ïŸ•ï‹ΩÖçï¡—ÖçßÕ∏ÅπÖŸïùÖëΩ»Å¡ïπë•ïπ—ïÃ∏ÅIΩ±±âÖç¨‹…ê…çå‘»ÃƒÃÃ¡î‡›àÿÿ‡›ôàÕçÖê‡»‡‡‘–·çÑ¡ê‹‘∏()H»ÃÅÖµ¡±•ÖçßÕ∏ÅëîÅΩ…ëï∏ƒÃË¿◊äLƒÃË¿‰ËÅ—…ïÃÅâΩ—ΩπïÃÅ•ù’Ö±ïÃÅQ=I9<ÄºÅQ=I9<ÅQ%Y<ÄºÅM=ILÅQ=I9<ÏÅ•πù…ïÕºÅÖ∞Åµ•ÕµºÅ—Ω…πïºÅçΩ∏ÅèÕë•ùºÅçΩµ¡Ö…—•ëºÅ¡Ω»Åç…ïÖëΩ»Ä°…Ω∞ÅÖπΩ—ÖëΩ»Å±•µ•—ÖëºÅÑÅÕ‘Åù…’¡º§∏ÅÕë•ùºÅŸ•Õ•â±îΩçΩ¡•Öâ±îÅÖ∞Åô•πÖ∞ÅëîÅ±ÑÅ—Ö…©ï—ÑÅÕΩ±Öµïπ—îÅ¡Ö…ÑÅΩ…ùÖπ•ÈÖëΩ»∏Å	Öç≠ïπêÅ…ïç°ÖÈÑÅ•πçΩ……ïç—º∞ÅŸïπç•ëº∞ÅµΩëÖ±•ëÖêÅÖ©ïπÑ∞Åç’¡ºÅ±±ïπº∞Å…ïŸΩçÖëºÅ‰Å±ïç—’…ÑÅëîÅΩ—…ºÅïŸïπ—º∏Å…ç°•ŸΩÃÅÖë•ç•ΩπÖ±ïÃÅÖ¡§Ω}±•àΩ¡ï…ÕΩπÖ∞µïŸïπ–µÖççïÕÃπ©Ã∞ÅÖ¡§Ω¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©Ã∞Å¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©Ã∞ÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©Ã∞Å—ïÕ–µ±Öàµ’¡ëÖ—îµ…ïçΩŸï…‰πµ©ÃÅ‰Å—ïÕ–µ—Ω’…πÖµïπ–µÖç—•ŸîµçΩëîπµ©Ã∏ÅA…’ïâÑÅçΩ∏ÅÅA±•—îÅÖ•Õ±ÖëÑÅŸÖ±•ëÑÅïÕç…•—Ω»ÅΩô•ç•Ö∞Å…ΩÕÃ‘Ω9ï—º–Å‰Å≥µµ•—ïÃÅëîÅÖççïÕº∏()Hƒ–‹∏»∏–∏»ÃÉ
‹Ä¿ƒºƒ¿º»¿»ÿÄƒÃËƒÿÅ’Ö—ïµÖ±ÑËÅΩ…ùÖπ•ÈÖëΩ»Åëïô•πîÅ—Ω…πïºΩçÖµ¡ºÅëïÕ¡±ïùÖâ±îΩµΩëÖ±•ëÖêÏÅôïç°ÑÅÖ’—Ω∑Ö—•çÑÅëîÅ’Ö—ïµÖ±ÑÅÕ•∏Åïë•çßÕ∏Åï∏Åç…ïÖçßÕ∏∏ÅπçÖâïÈÖëΩÃÅMçΩ…ïÃÅùïπï…Ö∞∞ÅôÖŸΩ…•—ΩÃÅ‰Åëï—Ö±±îÅ•πç±’Âï∏ÅµΩëÖ±•ëÖêÅÖëï∑ÖÃÅëîÅ—Ω…πïº∞ÅçÖµ¡ºÅ‰Åôïç°Ñ∏ÅAïπë•ïπ—îÅ¡…’ïâÑÅŸ•Õ’Ö∞ÅëîÅçÖπë•ëÖ—º∏()EÅπÖŸïùÖëΩ»ÅH»ÃÄƒÃË»ﬂäL»‰ËÅç…ïÖçßÕ∏Å…ïÖ∞∞ÅïπçÖâïÈÖëºÄ–ÅëÖ—ΩÃ∞Åôïç°ÑÅ…ïÖëΩπ±‰Å‰Åç•ï……îÅŸï…ëî»»∏’¡‡Åô’ï…ÑÅëï∞ÅµÖ…çºÅAMLÏÄÃÅâΩ—ΩπïÃÅÖπç°º»ÿ‘∏ÃÕ¡‡ΩÖ±—º‘…¡‡ÅAML∏Åï—ïç—ÖëºÅèÕë•ùºÅç…ïÖëΩ»ÅπºÅ—…ÖÕ±ÖëÖëºÅÑÅÖ±µÖçïπÖµ•ïπ—ºÅëîÅÕ‘Å—Ö…©ï—ÑÅÖÕ•ùπÖëÑÏÅÕîÅçΩ……•ùîÅï∏ÅΩ¡ïπÕÕ•ùπïëÖ…êÅœÕ±ºÅçΩ∏Åµïµâ…ïœµÑÅΩ…ùÖπ•Èï»ÅîÅ%ÅçΩ•πç•ëïπ—îÏÅ¡ïπë•ïπ—îÅ…ïŸÖ±•ëÖ»∏(((ååÅHƒ–‹∏»∏–∏»ÃÉ
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
‹ÅµÖπ—•ïπîÅΩç’±—ΩÃÅ±ΩÃÅâΩ—ΩπïÃÅëîÅçΩµ¡Ö…—•»ΩçΩ¡•Ö»ÅèÕë•ùºÅ°ÖÕ—ÑÅ≈’îÅÕîÅçΩµ¡±ï—îÅï∞Å¡…•µï»Åïπ€µº∏(¥ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄ∞ÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄ∞ÅÅ…ï±ïÖÕîπ©ÕΩπÄÉ
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
‹ÅçΩ……ïççßÕ∏Åëï∞Å—ïÕ–ÅâÖ©ºÅï∞Åïπ—Ω…πºÅYï…çï∞É
‹Ä‘ÅΩç—’â…îÄ»¿»ÿ)A…ïŸ•ï‹ÅëîÅ1ÅçΩπÕ—…’ÁÃÅ±ÖÃÅ¡’ï…—ÖÃÅëîÅçÖ±•ëÖê∞Å…ΩÖëµÖ¿ÅîÅ•πŸïπ—Ö…•ºÏÅYï…çï∞Åë•ºÅ%0Åï∏ÅÅ—ïÕ–µ»ƒÿ»µÕ•πù±îµ’Õîµ—Ω’…πÖµïπ–µçΩëîπµ©ÕÄËÅï∞Å—ïÕ–ÅïÕ¡ï…ÖâÑÅ≈’îÅï∞Å°ΩÕ–ÅëîÅA…Ωë’ççßÕ∏Å•ùπΩ…Ö…ÑÅÅYI1}AI=)Q}%ı1	Ä∞ÅÖ’π≈’îÅ±ÑÅÖ¡±•çÖçßÕ∏Å¡…•Ω…•ÈÑÅï∞Å%Åëï∞Å¡…ΩÂïç—º∏ÅΩ……ïççßÕ∏Åëï∞Å—ïÕ–ËÅÕ•µ’±Ö»Åï·¡≥µç•—Öµïπ—îÅï∞Å%Åëï∞Å¡…ΩÂïç—ºÅçΩ……ïÕ¡Ωπë•ïπ—îÅÑÅçÖëÑÅ°ΩÕ—πÖµîÅ‰Å…ïÕ—Ö’…Ö»Åï∞Åïπ—Ω…πºÅ—…ÖÃÅçÖëÑÅ±±ÖµÖëÑÏÅ±ΩçÖ±°ΩÕ–ÅÕ•ù’îÅ±ÑÅ•ëïπ—•ëÖêÅ…ïÖ∞Åëï∞Å¡…ΩÂïç—º∏ÅIï¡…Ωë’ççßÕ∏Å±ΩçÖ∞ÅçΩ……ïù•ëÑÅAML∏ÅÃÅ’∏Å—ïÕ–ÅπºÅëï—ï…µ•π•Õ—ÑÅ…ïÕ¡ïç—ºÅÖ∞Åïπ—Ω…πº∞ÅπºÅ’πÑÅë•Ÿï…ùïπç•ÑÅëîÅ•πŸïπ—Ö…•ºÅπ§Å’πÑÅÖ±—ï…ÖçßÕ∏ÅëîÅëÖ—ΩÃ∏ÅIïï©ïç’—Ö»ÅâÖπçºÅçΩµ¡±ï—ºÅ‰ÅA…ïŸ•ï‹ÅÖπ—ïÃÅëîÅ¡’â±•çÖçßÕ∏∏Å1ΩAI=Å…ïÖç—•ŸÖëΩÃËÅÄΩ…ï±ïÖÕîπ©ÕΩπÄÅ…ïÕ¡ΩπëîÅ!QQ@Ä»¿¿∞ÅÖµâΩÃÅµ’ïÕ—…Ö∏ÅHƒ‹»ÏÅHƒ‹ÃÅáÈ∏ÅπºÅ¡’â±•çÖëº∏)Hƒ‹ÃÅA…ïŸ•ï‹ÅôΩ±±Ω‹µ’¿ËÅÕïçΩπêÅYï…çï∞ÅôÖ•±’…îÅ›ÖÃÅ—°îÅ°ï±¡ï»ùÃÅ±ΩçÖ±°ΩÕ–ÅÖÕÕï…—•Ω∏ÅΩµ•——•πúÅÅM}9Y%I=959Pı±ÖâÄÏÅ•–ÅπΩ‹Åëï…•ŸïÃÅï·¡ïç—ïêÅÕΩ’…çîÅô…Ω¥ÅÅ—Ω’…πÖµïπ—•…ïç—Ω…ÂπŸ•…Ωπµïπ—ÄÅÖπêÅÕ•µ’±Ö—ïÃΩ…ïÕ—Ω…ïÃÅâΩ—†ÅïπŸ•…Ωπµïπ–ÅŸÖ…•Öâ±ïÃÅ¡ï»Å°ΩÕ—πÖµî∏Å•…ïç—ïêÅ—ïÕ–Å¡ÖÕÕïÃÅ’πëï»Å1∞ÅA…Ωë’ç—•Ω∏ÅÕ•µ’±Ö—•Ω∏∞ÅÖπêÅëïôÖ’±–Å±ΩçÖ∞ÅïπŸ•…Ωπµïπ–∏)Hƒ‹ÃÅôΩ±±Ω‹µ’¿Ä»ËÅA…ïŸ•ï‹ÅçΩπô•…∑ÃÅ≈’îÅHƒÿ»Åë’¡±•çÖâÑÅï∞ÅµÖ¡ïºÅëîÅïπ—Ω…πºÅÂÑÅç’â•ï…—ºÅ¡Ω»ÅÅ—ïÕ–µ»ƒÿÃµç…ΩÕÃµïπŸ•…Ωπµïπ–µ—Ω’…πÖµïπ–µÕçΩ…ïÃπµ©ÕÄÏÅÕîÅ…ï—•ÀÃÅïÕÑÅÖÕï…çßÕ∏Å…ïë’πëÖπ—îÅëîÅHƒÿ»∏ÅHƒÿ»Å≈’ïëÑÅï∏ÅÖ’—Ω…•ÈÖçßÕ∏Ωç•ç±ºÅëîÅŸ•ëÑÅëï∞ÅèÕë•ùºÏÅHƒÿÃÅŸï…•ô•çÑÅ1ΩAI=ÅçΩ∏ÅŸÖ…•Öâ±ïÃÅ‰Å°ΩÕ—Ã∏ÅµâΩÃÅë•…•ù•ëΩÃÅAMLÅ±ΩçÖ∞Å‰ÅçΩ∏ÅM}9Y%I=959Pı±Öà∏((ååÅHƒ‹ÃµƒÉ
‹Åï—•≈’ï—ÑÅŸ•Õ•â±îÅÕ•πç…Ωπ•ÈÖëÑÉ
‹Ä‘ÅΩç—’â…îÄ»¿»ÿ)1ÑÅçÖ¡—’…ÑÅ…ïÖ∞ÅëîÅ1ΩA…Ωë’ççßÕ∏ÅµΩÕ—ÀÃÅÅYIM'M8ÅHƒ‘’ÄÅ¡ïÕîÅÑÅ≈’îÅYï…çï∞ÅÕï…€µÑÅÅ…ï±ïÖÕîπ©ÕΩπÄÅHƒ‹ÃËÅï∞Å!Q50ÅçΩπÕï…ŸÖâÑÅï∞Å—ï·—ºÅ•π•ç•Ö∞ÅëîÅÅÖ¡¡Iï±ïÖÕï	ÖëùïÄÅï∏ÅHƒ‘‘∏ÅΩ……ïççßÕ∏ËÅï—•≈’ï—ÑÅ•π•ç•Ö∞ÅÅYIM'M8ÅHƒ‹ÕÄ∞Åµï—ÑÅ‰ÅMï…Ÿ•çîÅ]Ω…≠ï»ÅçΩ∏Åâ’•±êÅÄ»¿»ÿƒ¿¿‘µHƒ‹Ãµ≈ÄÏÅ±ÑÅï—•≈’ï—ÑÅ√Èâ±•çÑÅçΩπ—•ªÈÑÅÕ•ïπëºÅHƒ‹ÃÅ‰Åï∞ÅÕ’ô•©ºÅƒÅô’ï…ÈÑÅÑÅ±ÖÃÅ•πÕ—Ö±Öç•ΩπïÃÅÖ¡…ΩâÖëÖÃÅï∏ÅHƒ‹ÃÅÑÅ…ïçΩπΩçï»Å±ÑÅçΩµ¡•±ÖçßÕ∏ÅçΩ……ïù•ëÑ∏ÅÅ—ïÕ–µ’¡ëÖ—îµëï±•Ÿï…‰µçΩπ—…Ω∞πµ©ÕÄÅÖ°Ω…ÑÅï·•ùîÅ≈’îÅï∞ÅâÖëùîÅ•π•ç•Ö∞∞Åï∞Åµï—ÑÅ‰Å…ï±ïÖÕîπ©ÕΩ∏ÅçΩ•πç•ëÖ∏ÅÖπ—ïÃÅëîÅï©ïç’—Ö»ÅÕç…•¡—Ã∏ÅYÖ±•ëÖçßÕ∏Åë•…•ù•ëÑÅ‰Å…ïç’¡ï…ÖçßÕ∏Å1ÅAMLÏÅA…ïŸ•ï‹Ωëï¡±Ω‰Åëï∞Åâ’•±êÅƒÅ¡ïπë•ïπ—ïÃ∏()Hƒ‹ÃµƒÅ$ÅôΩ±±Ω‹µ’¿É
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
‹ÅIïÖâ…•»Å±ÑÅA]Åï∏ÅIïù•Õ—…ºÉ
‹ÄÿÅΩç—’â…îÄ»¿»ÿ((¥ÅÖ’ÕÑËÅ•=LÅ¡’ïëîÅ…ïÖç—•ŸÖ»Å±ÑÅ√Öù•πÑÅŸ•ŸÑÅëïÕëîÅÕïù’πëºÅ¡±ÖπºÅÕ•∏ÅŸΩ±Ÿï»ÅÑÅï©ïç’—Ö»ÅÅ¡›Ñµ±Ö’πç†π°—µ±ÄÏÅÅ¡ÖùïÕ°Ω›Ä∞ÅÅôΩç’ÕÄÅ‰ÅÅŸ•Õ•â•±•—Âç°ÖπùïÄÅ…ïÕ—Ö’…ÖâÖ∏Å±ÑÅMçΩ…îÅÖ…ê∞Å¡ï…ºÅÅïπÕ’…ïA…•πç•¡Ö±π—…‰†•ÄÅπºÅÖâÀµÑÅIïù•Õ—…ºÅÕ§Å°ÖãµÑÅ’πÑÅ…ΩπëÑÅ…ïç’¡ï…Öâ±î∏(¥ÅΩ……ïççßÕ∏ËÅœÕ±ºÅï∏Å±ÑÅ•πÕ—Ö±ÖçßÕ∏ÅA]Å‰Å—…ÖÃÅ’πÑÅ—…ÖπÕ•çßÕ∏Å…ïÖ∞ÅÑÅÕïù’πëºÅ¡±Öπº∞Å…ïù…ïÕÖ»ÅÑÅIïù•Õ—…ºÅëîÅ©’ùÖëΩ…ïÃ∞Åù’Ö…ëÖ»Å±ÑÅ—Ö…©ï—ÑÅÖç—•ŸÑÅ‰ÅçΩπÕï…ŸÖ»Å…ΩÕ—ï»Å‰ÅÕçΩ…ïÃ∏Å∞ÅÖççïÕºÅ›ïàÅπΩ…µÖ∞Å‰Åï∞ÅÖ……Öπ≈’îÅëîÅ…ΩπëÑÅŸÖèµÑÅπºÅçÖµâ•Ö∏∏(¥ÅIïù…ïÕßÕ∏Å•π—ïù…ÖëÑÅï∏ÅÅ—ïÕ–µ±Öàµ…ïù•Õ—…Ö—•Ω∏µ…ï—’…∏µÕ—Ö—îπµ©ÕÄËÅçΩπÕï…ŸÑÅ©’ùÖëΩ…ïÃΩÕçΩ…ïÃÅ‰Åπ•ïùÑÅï∞ÅëïÕ€µºÅ¡Ö…ÑÅ›ïà∞ÅïÕ—ÖëºÅπºÅ…ïÖπ’ëÖëºÅ‰Å…ΩπëÑÅŸÖèµÑ∏(¥ÅHƒ‹ÿÅï∏Å…ÖµÑÅÖ•Õ±ÖëÑÅâÖÕÖëÑÅï∏Åï∞ÅA…ïŸ•ï‹ÅHƒ‹‘∏Å1ΩA…Ωë’ççßÕ∏ÅπºÅ¡…ΩµΩŸ•ëΩÃÏÅŸÖ±•ëÖ»ÅùÖ—ïÃ∞ÅA…ïŸ•ï‹Å‰Å…ïçΩ……•ëºÅëîÅ•A°ΩπîÅÖπ—ïÃÅëîÅç•ï……î∏(¥Å…ç°•ŸΩÃËÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅ—ïÕ–µ±Öàµ…ïù•Õ—…Ö—•Ω∏µ…ï—’…∏µÕ—Ö—îπµ©ÕÄ∞ÅÖµâΩÃÅI=5AL∏((ååÅHƒ‹‹É
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
‹Å©’Õ—îÅôïëï…ÖëºÅëîÅÖëµ•π•Õ—…ÖçßÕ∏)MîÅçΩ……•ùßÃÅï∞Å…ï±Ö‰ÅëîÅçΩµ¡Ö…—•»Ωï±•µ•πÖ»Å¡Ö…ÑÅ…ïïπŸ•Ö»Å±ÑÅÕïÕßÕ∏ÅÖ’—ïπ—•çÖëÑÅÖ∞ÅÖµâ•ïπ—îÅ¡…Ω¡•ï—Ö…•ºÄ°1ΩA…Ωë’ççßÕ∏§∞ÅëΩπëîÅçÖëÑÅÖççßÕ∏ÅŸ’ï±ŸîÅÑÅŸÖ±•ëÖ»Å¡ï…µ•ÕΩÃ∏ÅÕ—îÅÖ©’Õ—îÅ≈’ïëÑÅ…ïô±ï©ÖëºÅï∏Åï∞ÅùÖ—îÅ‰Åï∏Å±ΩÃÅ—…ïÃÅ¡…ïŸ•ï›ÃÅÖπ—ïÃÅëîÅ¡…ΩµΩçßÕ∏∏(()Hƒ‹‹Å¡…’ïâÑÅëîÅ…ïù…ïÕßÕ∏ËÅï∞Å°Ö…πïÕÃÅëîÅï±•µ•πÖçßÕ∏Å•π•ç•Ö±•ÈÑÅï∞ÅÖµâ•ïπ—îÅ±ΩçÖ∞Å¡Ö…ÑÅŸÖ±•ëÖ»Åï∞ÅâΩ……ÖëºÅëï∞ÅïŸïπ—ºÅÕï±ïçç•ΩπÖëºÏÅï∞Å—ïÕ–Åôïëï…ÖëºÅç’â…îÅ¡Ω»ÅÕï¡Ö…ÖëºÅï∞Å…ï±Ö‰Å…ïµΩ—º∏(()Hƒ‹‹ÅçΩµ¡Ö—•â•±•ëÖêËÅèÕë•ùºÅëîÅÕΩ±ºÅ±ïç—’…ÑÅë•Õ¡Ωπ•â±îÅ¡Ö…ÑÅ—Ω…πïºÅÖç—•ŸºÅÖπ—ïÃÅëîÅÖÕ•ùπÖ»Å©’ùÖëΩ…ïÃÏÅï∞Å—ïÕ–ÅçΩπô•…µÑÅ≈’îÅπºÅç…ïÑÅç’¡ΩÃÅπ§ÅÖççïÕºÅëîÅïÕç…•—’…Ñ∏(()Hƒ‹‹ÅŸï…•ô•çÖçßÕ∏Åëï∞ÅèÕë•ùºÅŸ•ï›ï»ËÅï∞Å—ïÕ–ÅŸÖ±•ëÑÅï∞ÅïŸïπ—ºÅëïÕëîÅ±ÑÅÕïÕßÕ∏ÅÖ’—ïπ—•çÖëÑÅç…ïÖëÑÅÖ∞ÅçÖπ©ïÖ»Åï∞ÅèÕë•ùº∞ÅÕ•∏ÅçΩπô•Ö»Åï∏ÅëÖ—ΩÃÅëï∞Åç±•ïπ—î∏((ååÅHƒ‹‡É
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
‹ÄÿÅëîÅΩç—’â…îÅëîÄ»¿»ÿ()∞Åïπ±ÖçîÅëîÅ—Ω…πïºÅÖ°Ω…ÑÅ•ëïπ—•ô•çÑÅï∞ÅïŸïπ—ºÅ¡Ω»Å%Å‰ÅèÕë•ùº∞ÅçΩπÕï…ŸÑÅï∞ÅΩ…•ùï∏Å1ΩA…Ωë’ççßÕ∏Å‰ÅÖ∞Å—ΩçÖ…±ºÅÖâ…îÅë•…ïç—Öµïπ—îÅï∞ÅIïù•Õ—…ºÅçΩ∏Å—Ω…πïº∞ÅçÖµ¡ºÅ‰ÅµΩëÖ±•ëÖêÅ¡…ï¡Ö…ÖëΩÃ∏Å∞Åµï—ÖëÖ—ºÅ‰Åë•Õ—•π—•ŸºÅŸ•Õ•â±ïÃÅï∏Å•πëï‡µù…’¡Ö∞π°—µ∞ÅçΩ•πç•ëï∏ÅçΩ∏ÅHƒ‡»∏Å∞ÅôÖ±±âÖç¨Åëï∞ÅMï…Ÿ•çîÅ]Ω…≠ï»Å—Öµâß•∏ÅçΩ•πç•ëîÅçΩ∏Å…ï±ïÖÕîπ©ÕΩ∏∏Å1ÑÅA$ÅŸÖ±•ëÑÅï∞ÅïŸïπ—ºÅÖπ—ïÃÅëîÅçÖ…ùÖ»ÅÕ‘ÅçΩπô•ù’…ÖçßÕ∏ÏÅï∞Å’Õ’Ö…•ºÅÕ•ù’îÅçΩπô•…µÖπëºÅ©’ùÖëΩ…ïÃÅÖπ—ïÃÅëîÅïπ—…Ö»∏Å1ΩÃÅù…’¡ΩÃÅµÖπ—•ïπï∏ÅÕ‘Åô±’©º∏()…ç°•ŸΩÃËÅ›°Ö—ÕÖ¡¿µ•πŸ•—Ö—•ΩπÃπ©Ã∞Å¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©Ã∞Å—ïÕ–µ»ƒ‘‰µ›°Ö—ÕÖ¡¿µ—›ºµµïÕÕÖùïÃπµ©Ã∞Å—ïÕ–µ»ƒ‘ÿµ—Ω’…πÖµïπ–µ•πŸ•—Ö—•Ω∏πµ©Ã∞Å—ïÕ–µ±Öàµ¡…•ŸÖ—îµ…Ω’πêµÕ°Ö…îµô±Ω‹πµ©Ã∞ÅÕç…•¡—ÃΩ…ïŸ•ï‹µ»ƒ‘‰µ›°Ö—ÕÖ¡¿µ—›ºµµïÕÕÖùïÃπµ©Ã∞ÅÕç…•¡—ÃΩ…ïŸ•ï‹µ»ƒÿƒπµ©Ã∞Å…ï±ïÖÕîπ©ÕΩ∏∞ÅÕï…Ÿ•çîµ›Ω…≠ï»π©Ã∞Å•πëï‡µù…’¡Ö∞π°—µ∞∞Å=9QI=1}AI=eQ=}M%IΩAQ%=9}Hƒ‡…}]!QMAA}Q=I9<πµê∞Å=9QI=1}AI=eQ=}M%Iº¿≈}%IQI%M}A%=M}e}=I9M}A9%9QLΩI%MQI=}I%9%9%M}1%πµê∞Å=9QI=1}AI=eQ=}M%IΩ5A}5MQI=}}I!%Y=Lπµê∞ÅI=5A}=YI10πµê∞ÅI=5A}}Q11πµê∞Å=9QI=1}AI=eQ=}M%IΩ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩ∏∏()Ÿ•ëïπç•ÑÅ±ΩçÖ∞ËÅ¡…’ïâÖÃÅHƒ‘‰∞ÅHƒ‘ÿÅ‰ÅH»–ÅAMLÏÅŸÖ±•ëÖçßÕ∏ÅÕ•π”Öç—•çÑÅ)LÅAML∏ÅA…ïŸ•ï‹∞ÅπÖŸïùÖëΩ»Å∑ÕŸ•∞∞Å]°Ö—Õ¡¿Ω•A°ΩπîÅ…ïÖ∞Å‰Å¡’â±•çÖçßÕ∏Å¡ïπë•ïπ—ïÃ∏ÅA…Ωë’ççßÕ∏Å¡ï…µÖπïçîÅHƒ‡ƒ∏(ååÅHƒ‡¿É
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
‹ÅâΩ……ÖëºÅëîÅ—Ω…πïºÅÕ•∏ÅÕïÕßÕ∏Å¡…Ω¡•ï—Ö…•ÑÅŸ•ùïπ—îÉ
‹Ä‹ÅΩç—’â…îÄ»¿»ÿ()UπÑÅçΩΩ≠•îÅëîÅèÕë•ùºÅçÖë’çÖëÑÅÂÑÅπºÅâ±Ω≈’ïÑÅ’πÑÅ•ëïπ—•ëÖêÅëîÅë•Õ¡ΩÕ•—•ŸºÅ€Ö±•ëÑ∏Å1ÑÅA$ÅÕ•ù’îÅçΩµ¡…ΩâÖπëºÅ≈’îÅïÕÑÅ•ëïπ—•ëÖêÅÕïÑÅç…ïÖëΩ…ÑÅ‘ÅΩ…ùÖπ•ÈÖëΩ…ÑÅÖ’—Ω…•ÈÖëÑÅëï∞Å—Ω…πïº∏ÅÅ—ïÕ–µïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏πµ©ÕÄÅŸÖ±•ëÑÅï∞ÅâΩ……ÖëºÅëïÕëîÅ±ÑÅçΩπô•…µÖçßÕ∏ÉÈπ•çÑÅ‰ÅµÖπ—•ïπîÅï∞Å…ïç°ÖÈºÅëîÅ—ï…çï…ΩÃÏÅÅ—ïÕ–µ±ÖàµëïŸ•çîµïŸïπ–µ•ëïπ—•—‰πµ©ÕÄÅµÖπ—•ïπîÅïÕ¡ïç—ÖëΩ»Åï∏ÅÕΩ±ºÅ±ïç—’…Ñ∏Å∞Å¡…•µï»Åâ’•±êÅëï—ïç”ÃÅ’∏ÅïÕçÖ¡îÅ•πçΩ……ïç—ºÅëîÅçΩΩ≠•î∞ÅçΩ……ïù•ëº∏ÅÖ—ïÃÅ‰Å¡’â±•çÖçßÕ∏Å¡ïπë•ïπ—ïÃ∏(ååÅHƒ‰‹É
‹ÅIïç’¡ï…ÖçßÕ∏ÅëîÅ•πù…ïÕºÅÑÅ—Ω…πïºÅçΩ∏ÅÕïÕßÕ∏ÅŸïπç•ëÑÉ
‹Ä‡ÅëîÅΩç—’â…îÅëîÄ»¿»ÿ((¥ÅÖ’ÕÑËÅï∞Åïπë¡Ω•π–ÅëîÅ•ëïπ—•ëÖêÅ¡…•Ω…•ÈÖâÑÅ’πÑÅÕïÕßÕ∏ÅëîÅèÕë•ùºÅŸïπç•ëÑÅ‰ÅπºÅç…ïÖâÑÅ’πÑÅ•ëïπ—•ëÖêÅëîÅë•Õ¡ΩÕ•—•ŸºÅç’ÖπëºÅπºÅï·•Õ”µÑÅ’πÑÅçΩΩ≠•îÅëîÅë•Õ¡ΩÕ•—•ŸºÅ€Ö±•ëÑ∏Å∞ÅÖ±—ÑÅÖ∞ÅèÕë•ùºÅÕîÅ•π—ï……’µ√µÑÅÖπ—ïÃÅëîÅ¡…ï¡Ö…Ö»Åï∞ÅïŸïπ—º∏(¥ÅΩ……ïççßÕ∏ËÅ±ΩÃÅ…ïç°ÖÈΩÃÅëîÅÕïÕßÕ∏ÅëîÅèÕë•ùºÅ•π€Ö±•ëÑ∞ÅŸïπç•ëÑÅºÅ…ïŸΩçÖëÑÅ¡ï…µ•—ï∏Å’ÕÖ»Å’πÑÅ•ëïπ—•ëÖêÅëîÅë•Õ¡ΩÕ•—•ŸºÅ€Ö±•ëÑÏÅë’…Öπ—îÅ±ÑÅÖççßÕ∏ÅÅ•ëïπ—•—ÂÄ∞ÅÕ§ÅπºÅï·•Õ—îÅ’πÑ∞ÅÕîÅç…ïÑÅ’πÑÅπ’ïŸÑ∏Å∞ÅèÕë•ùºÅëîÅ—Ω…πïºÅπºÅÕîÅçΩπÕ’µîÅÖ∞Å•πÕ¡ïçç•ΩπÖ…±ºÅ‰Å±ΩÃÅ¡ï…µ•ÕΩÃÅëï∞ÅïŸïπ—ºÅÕ•ù’ï∏Å±•µ•—ÖëΩÃÅ¡Ω»ÅÕ‘ÅA$∏(¥ÅIïù…ïÕßÕ∏ËÅÅ—ïÕ–µ±ÖàµëïŸ•çîµïŸïπ–µ•ëïπ—•—‰πµ©ÕÄÅ…ï¡…Ωë’çîÅÕïÕßÕ∏ÅŸïπç•ëÑÅÕ•∏ÅçΩΩ≠•îÅëîÅë•Õ¡ΩÕ•—•ŸºÅ‰ÅŸï…•ô•çÑÅ±ÑÅ•πÕ¡ïççßÕ∏ÅëîÅ’∏ÅèÕë•ùºÅ…ïçß•∏Åïµ•—•ëºÅÕ•∏ÅçΩπÕ’µ•…±ºÅπ§ÅÖ’—Ω…•ÈÖ»ÅÑÅ—ï…çï…ΩÃ∏Å1ÑÅ¡…’ïâÑÅëï∞ÅèÕë•ùºÅ…ï¡Ω…—ÖëºÅ¡Ω»Åï∞Å¡…Ω¡•ï—Ö…•ºÅÕîÅï©ïç’”ÃÅÖ¡Ö…—îÅï∏Å1Å‰ÅπºÅÕîÅù’Ö…ëÑÅï∏Åï∞Å…ï¡ΩÕ•—Ω…•º∏(¥ÅÕ—ÖëºËÅIIM'M8Å%I%%ÅAMLÏÅùÖ—ïÃÅ•π—ïù…Ö±ïÃÅ‰Å¡’â±•çÖçßÕ∏Å1ΩA…Ωë’ççßÕ∏Å¡ïπë•ïπ—ïÃ∏(¥Å…ç°•ŸΩÃËÅÅÖ¡§Ω¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄ∞ÅÅÖ¡§Ω}±•àΩÖççΩ’π–µÖ’—†π©ÕÄ∞ÅÅ—ïÕ–µ±ÖàµëïŸ•çîµïŸïπ–µ•ëïπ—•—‰πµ©ÕÄ∞ÅÅÕç…•¡—ÃΩâ’•±êµµÖπ’Ö∞µ±Öàπµ©ÕÄ∞ÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄ∞ÅÅ…ï±ïÖÕîπ©ÕΩπÄ∞ÅÅ=1}M=I}I}Q}A9%9}5QI%`πµëÄ∞ÅÖµâΩÃÅI=5AL∞ÅÅI%MQI=}I%9%9%M}1%πµëÄÅîÅÅ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄ∏((ååÅHƒ‰‡É
‹ÅIïç’¡ï…Ö»Å•πù…ïÕºÅÖ∞Å•πÕ¡ïçç•ΩπÖ»ÅèÕë•ùºÅçΩ∏ÅÕïÕßÕ∏ÅëîÅç’ïπ—ÑÅŸïπç•ëÑÉ
‹Ä‡ÅëîÅΩç—’â…îÅëîÄ»¿»ÿ((¥ÅŸ•ëïπç•ÑËÅï∞Å¡…Ω¡•ï—Ö…•ºÅçΩπô•…∑ÃÅ≈’îÅHƒ‰‹Åô’πç•ΩπÑÅï∏Å1∞Å¡ï…ºÅHƒ‰‹Åï∏ÅA…Ωë’ççßÕ∏Åµ’ïÕ—…ÑÅÅ9<ÅMÅAU<ÅAIAIHÅ0ÅY9Q<É
‹ÅI%9Q9QÄÅÖ∞Å•πÕ¡ïçç•ΩπÖ»Åï∞ÅèÕë•ùºÅÄŸ’ƒ‹…Ä∏(¥ÅÖ’ÕÑËÅï∞Åô…Ωπ—ïπêÅ¡’ïëîÅçΩπÕï…ŸÖ»Å•ëïπ—•ëÖêÅëîÅç’ïπ—ÑÅï∏ÅµïµΩ…•ÑÅ‰ÅΩµ•—•»Å±ÑÅÖççßÕ∏ÅÅ•ëïπ—•—ÂÄÏÅÖπ—îÅÅ=U9Q}U9UQ!=I%iÄÅë’…Öπ—îÅÅ•πÕ¡ïç–µ—Ω’…πÖµïπ–µçΩëïÄ∞Å±ÑÅA$Å…ïç°ÖÈÖâÑÅÖπ—ïÃÅëîÅ¡…ï¡Ö…Ö»Åï∞ÅïŸïπ—º∏(¥ÅΩ……ïççßÕ∏ÅÖçΩ—ÖëÑËÅç…ïÖ»Å•ëïπ—•ëÖêÅÕïù’…ÑÅëîÅë•Õ¡ΩÕ•—•ŸºÅÖ∞Å…ïç•â•»ÅÅ=U9Q}U9UQ!=I%iÄÉÈπ•çÖµïπ—îÅï∏ÅÅ•ëïπ—•—ÂÄÅºÅ•πÕ¡ïççßÕ∏Åëï∞ÅèÕë•ùº∏ÅM§Å°Ö‰ÅÕïÕßÕ∏ÅëîÅèÕë•ùºÅ•π€Ö±•ëÑΩŸïπç•ëÑΩ…ïŸΩçÖëÑ∞Å¡ï…µ•—•»Åï∞Åµ•ÕµºÅôÖ±±âÖç¨ÅëîÅ±ïç—’…Ñ∏Å9ºÅÕîÅçΩπÕ’µîÅï∞ÅèÕë•ùºÅπ§ÅÕîÅçΩπçïëîÅµïµâ…ïœµÑÏÅÅ©Ω•∏µçΩëïÄÅ‰Å±ÖÃÅçΩµ¡…ΩâÖç•ΩπïÃÅëîÅ¡ï…µ•ÕΩÃÅ¡ï…µÖπïçï∏Å•π—Öç—ÖÃ∏(¥ÅIïù…ïÕßÕ∏ËÅÅ—ïÕ–µ±ÖàµëïŸ•çîµïŸïπ–µ•ëïπ—•—‰πµ©ÕÄÅŸï…•ô•çÑÅ•πÕ¡ïççßÕ∏ÅçΩ∏Åç’ïπ—ÑÅŸïπç•ëÑÅÕ•∏ÅçΩΩ≠•îÅëîÅë•Õ¡ΩÕ•—•Ÿº∞ÅèÕë•ùºÅπºÅçΩπÕ’µ•ëºÅ‰ÅëïπïùÖçßÕ∏ÅÑÅ—ï…çï…ΩÃ∏(¥ÅÕ—ÖëºËÅ…ïù…ïÕßÕ∏Åë•…•ù•ëÑÅAMLÏÅùÖ—ïÃ∞Å…ïŸ•ÕßÕ∏Å1Å‰ÅçΩπô•…µÖçßÕ∏ÅõµÕ•çÑÅHƒ‰‡Å¡ïπë•ïπ—ïÃ∏(¥Å…ç°•ŸΩÃËÅÅÖ¡§Ω¡ï…ÕΩπÖ∞µïŸïπ—Ãπ©ÕÄ∞ÅÅ—ïÕ–µ±ÖàµëïŸ•çîµïŸïπ–µ•ëïπ—•—‰πµ©ÕÄ∞ÅÅ•πëï‡µù…’¡Ö∞π°—µ±Ä∞ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄ∞ÅÅ…ï±ïÖÕîπ©ÕΩπÄ∞ÅÖµâΩÃÅI=5AL∞ÅÅ=1}M=I}I}Q}A9%9}5QI%`πµëÄ∞ÅÅI%MQI=}I%9%9%M}1%πµëÄÅîÅÅ%9Y9QI%=M}XÃƒƒπ±Ωç¨π©ÕΩπÄ∏((ååÅHƒ‰‰É
‹Å•πù…ïÕºÅç…’ÈÖëºÅA…Ωë’ççßÕ∏Ω1ÅçΩπÕ’µîÅèÕë•ùºÅçΩ∏Å•ëïπ—•ëÖêÅÕïù’…ÑÉ
‹Ä‡ÅΩç—’â…îÄ»¿»ÿ((¥Åïôïç—ºÅΩâÕï…ŸÖëºËÅï∏ÅA…Ωë’ççßÕ∏ÅHƒ‰‡Åï∞ÅèÕë•ùºÅÄŸ’ƒ‹…ÄÅÕïù◊µÑÅµΩÕ—…ÖπëºÅÅ9<ÅMÅAU<ÅAIAIHÅ0ÅY9Q<É
‹ÅI%9Q9QÄ∏Å1ÑÅA$ÅëîÅA…Ωë’ççßÕ∏Å…ïÕ¡ΩπëßÃÅÅ1%Y})=%9}=}%9Y1%ÄÏÅï∞ÅèÕë•ùºÅµΩÕ—…ÖëºÅï∏Å±ÑÅ—Ö…©ï—ÑÅ¡ï…—ïπïèµÑÅÑÅ1∏(¥ÅÖ’ÕÑÅ…áµËËÅï∞Åç±•ïπ—îÅœ¥Å…ï•π—ïπ—ÖâÑÅï∞ÅèÕë•ùºÅï∏Åï∞ÅΩ—…ºÅÖµâ•ïπ—î∞Å¡ï…ºÅ±ÑÅ±±ÖµÖëÑÅô•πÖ∞ÅÅ©Ω•∏µçΩëïÄÅ¡ΩìµÑÅ±±ïùÖ»ÅÖ∞ÅÖµâ•ïπ—îÅë’ó≈ºÅÕ•∏ÅçΩΩ≠•îÅÕÖµîµÕ•—îÅ¡ï…Õ•Õ—•ëÑ∏ÅHƒ‰‡Åç’âÀµÑÅ±ÑÅ•πÕ¡ïççßÕ∏ÅÕïù’…Ñ∞Å¡ï…ºÅπºÅï∞ÅçΩπÕ’µºΩ’πßÕ∏Åëï∞ÅèÕë•ùºÅï∏ÅïÕîÅµ•ÕµºÅçΩπ—ï·—º∏(¥ÅΩ……ïççßÕ∏ËÅÅ…ïÕΩ±ŸïŸïπ—%ëïπ—•—‰†•ÄÅ¡ï…µ•—îÅç…ïÖ»Å’πÑÅ•ëïπ—•ëÖêÅëîÅë•Õ¡ΩÕ•—•ŸºÅÕïù’…ÑÅ—Öµâß•∏Åï∏ÅÅ©Ω•∏µçΩëïÄÅç’ÖπëºÅπºÅ°Ö‰ÅÕïÕßÕ∏ÅëîÅç’ïπ—ÑÅ€Ö±•ëÑ∏Å1ÑÅµïµâ…ïœµÑÅÕ•ù’îÅëï¡ïπë•ïπëºÅëîÅ¡ΩÕïï»Åï∞ÅèÕë•ùº∞ÅëîÅ±ÑÅçΩπô•ù’…ÖçßÕ∏ÅçÖµ¡ºΩµΩëÖ±•ëÖêÅ‰ÅëîÅçÖ¡Öç•ëÖêÏÅœÕ±ºÅÕîÅçΩπÕ’µîÅï∞ÅèÕë•ùºÅëïπ—…ºÅëîÅ±ÑÅ’πßÕ∏ÅΩô•ç•Ö∞∏(¥ÅΩπ—…Ω∞Å¡ï…µÖπïπ—îËÅÅ—ïÕ–µ±ÖàµëïŸ•çîµïŸïπ–µ•ëïπ—•—‰πµ©ÕÄÅÖ°Ω…ÑÅ…ï¡…Ωë’çîÅ•πÕ¡ïççßÕ∏ÅÕ•∏ÅçΩπÕ’µ•»Å‰Å’πßÕ∏ÅÕ•∏ÅçΩΩ≠•îÅ¡…ïŸ•ÑÏÅçΩπô•…µÑÅçΩΩ≠•îÅëîÅë•Õ¡ΩÕ•—•ŸºÅπ’ïŸÑ∞ÅçΩπÕ’µºÅëîÅèÕë•ùºÅëîÅ’∏ÅÕΩ±ºÅ’ÕºÅ‰Å…ïç°ÖÈºÅÑÅ—ï…çï…ΩÃ∏ÅÅ—ïÕ–µ»ƒ‰ƒµç…ΩÕÃµïπŸ•…Ωπµïπ–µ—Ω’…πÖµïπ–µïπ—…‰πµ©ÕÄÅçΩπÕï…ŸÑÅï∞Å…ï•π—ïπ—ºÅA…Ωë’ççßÕªäI1∏(¥ÅÕ—ÖëºËÅ…ïù…ïÕßÕ∏Åë•…•ù•ëÑÅAMLÅ±ΩçÖ∞ÏÅëïÕ¡±•ïù’îÅ1Å‰ÅA…Ωë’ççßÕ∏ÅHƒ‰‰Å¡ïπë•ïπ—î∏((ååÅH»ƒÿÉ
‹ÅMçΩ…ïÃÅëîÅ—Ω…πïºÅÕ•∏Å¡Öπï∞Åù±ΩâÖ∞ÅëîÅù…’¡ΩÃΩ…ΩπëÖÃÅÖç—•ŸΩÃÉ
‹Ä‡ÅΩç—’â…îÄ»¿»ÿ((¥ÅAïë•ëºÅŸ•Õ’Ö∞Åëï∞Å¡…Ω¡•ï—Ö…•ºËÅï∏ÅMçΩ…ïÃÅïπï…Ö∞∞ÅMçΩ…ïÃÅ¡Ω»ÅÖ—ïùΩÀµÑÅ‰Å	’ÕçÖ»Å)’ùÖëΩ»ÅÕîÅï±•µ•πÑÅï∞Åâ±Ω≈’îÅâ±ÖπçºÅëîÅù…’¡ΩÃΩ…ΩπëÖÃÅÖç—•ŸΩÃ∞Å•πç±’ÂïπëºÅ±•Õ—ÑÅù±ΩâÖ∞∞ÅπΩµâ…ïÃÅëîÅù…’¡ΩÃÅ‰Å°Ω…ÑÅëîÅÖç—’Ö±•ÈÖçßÕ∏∏(¥ÅÅ±•Ÿîµ°’àπ°—µ±ÄÅ…ï—•…ÑÅï∞Å¡Öπï∞ÅÅù±ΩâÖ∞µ±•Ÿîµë•…ïç—Ω…ÂÄÏÅÅ±•Ÿîµ°’àπ©ÕÄÅëï©ÑÅëîÅ…ïô…ïÕçÖ»ÅïÕÑÅ±•Õ—ÑÅëïÕëîÅ±ÑÅ¡Öπ—Ö±±ÑÅëîÅMçΩ…ïÃ∏ÅMîÅçΩπÕï…ŸÖ∏Å±ΩÃÅâΩ—ΩπïÃÅMçΩ…ïÃÅïπï…Ö∞∞ÅMçΩ…ïÃÅ¡Ω»ÅÖ—ïùΩÀµÑ∞Å	’ÕçÖ»Å)’ùÖëΩ»∞Å5•ÃÅÖŸΩ…•—ΩÃ∞ÅãÈÕ≈’ïëÑ∞Åô•±—…ΩÃÅ‰Å—Öâ±ÖÃ∏(¥ÅÅ—ïÕ–µ»»ƒÿµ±•Ÿîµ°’àµπºµù±ΩâÖ∞µë•…ïç—Ω…‰µ¡Öπï∞πµ©ÕÄÅâ±Ω≈’ïÑÅ±ÑÅ…ïÖ¡Ö…•çßÕ∏ÅëîÅïÕΩÃÅ—ï·—ΩÃÅ‰ÅçΩπô•…µÑÅ≈’îÅ±ÖÃÅŸ•Õ—ÖÃÅëîÅMçΩ…ïÃÅÕ•ù’ï∏Å¡…ïÕïπ—ïÃ∏(¥Å%ëïπ—•ëÖêÅëîÅïπ—…ïùÑÅÕ•πç…Ωπ•ÈÖëÑËÅÅ…ï±ïÖÕîπ©ÕΩπÄ∞ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄÅîÅÅ•πëï‡µù…’¡Ö∞π°—µ±ÄÅ¡ÖÕÖ∏ÅÑÅH»ƒÿ∏((ååÅH»ÃƒÉ
‹ÅQÖ…©ï—ÑÅ1•ŸîÅ•πŸ•—ÖëºÄ–·†Å∑ÖÃÅ±ïù•â±îÉ
‹Ä‡ÅΩç—’â…îÄ»¿»ÿ((¥ÅÅ±•Ÿîπ°—µ±ÄÅ‰ÅÅïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏π°—µ±ÄËÅ±ΩÃÅìµù•—ΩÃÅëîÅ±ÑÅ—Ö…©ï—ÑÅ1•ŸîÅÕ’âï∏Ä»‘î∞Å±ÖÃÅï—•≈’ï—ÖÃÅëîÅ…ïÕ’±—ÖëΩÃÅÖç’µ’±ÖëΩÃÅ¡ÖÕÖ∏ÅÑÅŸï…ëîÅ‰Å±ΩÃÅÖç’µ’±ÖëΩÃÅÕîÅµ’ïÕ—…Ö∏Å∑ÖÃÅù…ÖπëïÃÅ‰ÅÕÖ—’…ÖëΩÃ∏(¥ÅÅ±•ŸîµŸ•ï‹π©ÕÄÅ‰ÅÅïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏µ’§π©ÕÄËÅ±ÑÅ—Ö…©ï—ÑÅÖâ•ï…—ÑÅµ’ïÕ—…ÑÅœÕ±ºÅï∞ÅπΩµâ…îÅëï∞Å©’ùÖëΩ»ÅÕΩâ…îÅ±ÑÅ—Öâ±ÑÏÅÕîÅï±•µ•πÑÅï∞Å—ï·—ºÅ!@ΩµÖ…çÖÃÅ≈’îÅ≈’ïëÖâÑÅï∏Åâ±ÖπçºÅ©’π—ºÅÑÅçÖëÑÅ©’ùÖëΩ»∞Å—ΩëΩÃÅ±ΩÃÅìµù•—ΩÃÅëîÅ±ÑÅô•±ÑÅ9Q<Å‰Åï∞ÅÖç’µ’±ÖëºÅ9Q<Å≈’ïëÖ∏Åï∏ÅŸï…ëî∞Å‰ÅÕîÅÖ¡±•çÑÅ±ÑÅµ•ÕµÑÅπΩµïπç±Ö—’…ÑÅëîÅMçΩ…îÅÖ…êÅï∏ÅI=MLËÅâ•…ë•îΩïÖù±îΩÖ±âÖ—…ΩÕÃÅçΩ∏Åèµ…ç’±ºÅ‰ÅâΩùï‰ΩëΩâ±îΩ—…•¡±îÅâΩùï‰ÅçΩ∏Åç’Öë…º∏(¥ÅÅïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏µ’§π©ÕÄËÅ±ÖÃÅ—Ö…©ï—ÖÃÅçΩµ¡Öç—ÖÃÅëîÅÅIUA=LÅ%9Y%Q=LÄ–·!ÄÅ≈’ïëÖ∏ÉÈπ•çÖµïπ—îÅçΩ∏Åï∞ÅπΩµâ…îÅëï∞Å¡…•µï»Å©’ùÖëΩ»Å‰Åï∞ÅâΩ”Õ∏ÅÅ	I%HÅQI)QÅ1%YÄ∏(¥ÅÅÖççïÕÃπ°—µ±ÄËÅÖ∞Åç…ïÖ»ÅºÅ—ΩçÖ»Åï∞Åïπ±ÖçîÅëîÅ•πŸ•—ÖçßÕ∏Ä–·†ÅÕîÅÖâ…îÅ]°Ö—Õ¡¿Åµïë•Öπ—îÅÅ›ÑπµïÄÅçΩ∏Åï∞Å—ï·—ºÅÖ…µÖëº∞ÅÕ•∏ÅÕï±ïçç•ΩπÖ»∞ÅçΩ¡•Ö»Åπ§Å¡ïùÖ»ÅµÖπ’Ö±µïπ—î∏(¥ÅÅ—ïÕ–µ»»Ã¿µΩ›πï»µÖççïÕÃ¥–·†µΩπ±‰πµ©ÕÄÅ‰ÅÅ—ïÕ–µ»»Ãƒµ±•ŸîµçÖ…êµ…ïÖëÖâ•±•—‰πµ©ÕÄÅ≈’ïëÖ∏Åï∏Åï∞ÅâÖπçºÅëîÅ±ÖâΩ…Ö—Ω…•ºÅ¡Ö…ÑÅâ±Ω≈’ïÖ»Åï∞Å…ïù…ïÕºÅëîÅ—ï·—ΩÃÅ¡ï≈’ó≈ΩÃ∞Å!@ΩµÖ…çÖÃÅŸ•Õ•â±ïÃ∞Å—Ö…©ï—ÖÃÅçΩµ¡Öç—ÖÃÅçΩ∏Åµï—ÖëÖ—ΩÃÅÕΩâ…Öπ—ïÃÅ‰Åï∞Åô±’©ºÅµÖπ’Ö∞ÅëîÅçΩ¡•Ö»Ω¡ïùÖ»Åï∏ÅççïÕÃ∏((ååÅH»Ã»É
‹Åïπ±ÖçîÄ–·†Åç±•çÖâ±îÅï∏Å]°Ö—Õ¡¿É
‹Ä‡ÅΩç—’â…îÄ»¿»ÿ((¥ÅÅÖççïÕÃπ°—µ±ÄËÅï∞ÅµïπÕÖ©îÅëîÅ]°Ö—Õ¡¿Å¡Ö…ÑÅÅ=5AIQ%HÅA@Ä–‡Å!=IMÄÅÂÑÅπºÅë•çîÅA∞Åëï©ÑÅëîÅïπŸ•Ö»ÅÅqπÄÅçΩµºÅ—ï·—ºÅ±•—ï…Ö∞ÏÅÖ…µÑÅï∞ÅµïπÕÖ©îÅçΩ∏ÅÕÖ±—ΩÃÅ…ïÖ±ïÃÅ‰Åëï©ÑÅ±ÑÅUI0ÅÕΩ±ÑÅï∏ÅÕ‘Å¡…Ω¡•ÑÅ≥µπïÑÅ¡Ö…ÑÅ≈’îÅ]°Ö—Õ¡¿Å±ÑÅµ’ïÕ—…îÅçΩµºÅïπ±ÖçîÅ—ΩçÖâ±î∏(¥ÅÅ±•ŸîµŸ•ï‹π©ÕÄÅ‰ÅÅïŸïπ–µÖëµ•π•Õ—…Ö—•Ω∏µ’§π©ÕÄËÅï∏ÅÅIMU1Q=LÅU5U1=MÄÅ±ÑÅï—•≈’ï—ÑÅëï∞ÅÖç’µ’±ÖëºÅ…ï±Ö—•ŸºÅŸ’ï±ŸîÅÑÅÕï»ÅœÕ±ºÅÄ¨ºµÄÏÅÄ¨º¥ÅA=HÅ!=e=ÄÅ≈’ïëÑÉÈπ•çÖµïπ—îÅï∏Å±ÑÅô•±ÑÅëîÅ±ÑÅ—Öâ±ÑÅ¡Ω»Å°ΩÂº∏(¥ÅÅ±•Ÿîπ°—µ±ÄËÅçÖç°ïÑÅÅ±•ŸîµŸ•ï‹π©Ã˝ÿÙ»¿»ÿƒ¿¿‡µH»Ã…ÄÅ¡Ö…ÑÅë•Õ—…•â’•»Å±ÑÅ—Ö…©ï—ÑÅ1•ŸîÅÖç—’Ö±•ÈÖëÑ∏(¥ÅÅ—ïÕ–µ»»Ã¿µΩ›πï»µÖççïÕÃ¥–·†µΩπ±‰πµ©ÕÄËÅÖù…ïùÑÅ…ïù…ïÕßÕ∏ÅçΩπ—…ÑÅï∞Å—ï·—ºÅAÅ‰ÅçΩπ—…ÑÅï∞ÅÅqπÄÅ±•—ï…Ö∞Å¡ïùÖëºÅÖ∞Åïπ±ÖçîÏÅï·•ùîÅï∞ÅôΩ…µÖ—ºÅëîÅ≥µπïÖÃÅçΩ∏ÅÅ©Ω•∏†âq∏à•Ä∏(¥ÅÅ…ï±ïÖÕîπ©ÕΩπÄ∞ÅÅ•πëï‡µù…’¡Ö∞π°—µ±ÄÅ‰ÅÅÕï…Ÿ•çîµ›Ω…≠ï»π©ÕÄËÅ•ëïπ—•ëÖêÅŸ•Õ•â±îÅH»Ã»Å‰ÅçÖç£§Åπ’ïŸÑÅ¡Ö…ÑÅë•Õ—…•â’•»Å±ÑÅçΩ……ïççßÕ∏∏(