# R147.2.4.24 - Administración, caducidad y limpieza

Orden del propietario: 2 octubre 2026, conversación activa. Publicación LAB y Producción autorizada previamente; preservar actualización manual del dispositivo.

G0: main 1d483af6555967eba4b242d82540bcbbc5010024; alcance cinco fallos reportados y delegación individual para eliminar. Referencias CED9E3B2-5053-42CF-8716-106F16CD7BC1.png, IMG_5626.jpeg y directrices. Riesgos: acceso ajeno, eliminación sin trazabilidad, prórroga por correcciones, código arrastrado, script Vercel en caché. Pruebas negativas permanentes y banco completo. Rollback de código: commit base; bajas centrales conservan registros para recuperación administrativa, no se destruyen scores de manera irreversible.

Aceptación requerida:
- Vercel: ajuste nativo Off existente; quitar inyección vercel.live del HTML aprobado guardado, incluso misma release, y bloquear su carga en el controlador. No cambiar almacenamiento deportivo.
- Código torneo: solamente evento explícito asociado al ID de la tarjeta actual. Registro y otra ronda no heredan códigos anteriores.
- Caducidad: servidor recibe 18 hoyos distintos de todos los participantes registrados/asignados; fija completed_at una sola vez. Particulares, torneos y streams vencen 24 horas después; no prorrogar por corrección/reintento. Cierre explícito de torneo fija también ese plazo. Lecturas/publishes comprueban plazo; cron GET autenticado limpia estados vencidos por hora. El vencimiento visible y la autorización se evalúan con reloj servidor; el registro técnico no se purga para conservar auditoría.
- Administrar: MENÚ > ADMINISTRAR RONDAS. Propietario autenticado tiene control pleno de ambos tipos; creador del evento controla el suyo. El acceso normal a la app sigue libre.
- Permisos: nombre y código personal del destinatario obligatorios. Credencial aleatoria de 192 bits guardada únicamente como SHA-256, canje único, ligada al destinatario y a un evento; el código deportivo de compartir no sirve para borrar. Delegado no puede delegar. Revocable, con vencimiento del evento y límite de 24h tras cierre. Credencial de eliminación no inicia sesión ni autoriza scores ajenos.
- Baja: nombre exacto y motivo obligatorios; el servidor verifica autoridad al escribir. Revoca evento, streams y permisos en una sola sentencia y guarda comprobante único con ID ADM, destinatario, actor, evento, motivo y hora. Registro de borrado permanece aunque venza el evento.
- Limpieza solicitada: eventos existentes antes de 2026-10-02T17:05:00Z en LAB br-small-mouse-av0f24o9 y Producción br-late-wind-avhgi9s3. Estado PENDIENTE hasta resultado SQL; no declarar eliminación desde preparación de código. No acceder al almacenamiento del iPhone ni borrar historial local de otros usuarios.

Estado actual: regresiones dirigidas PASS; banco integral EN CURSO; navegador real, limpieza y deployments PENDIENTES. Confirmación física nueva del iPhone NO REALIZADA.

Orden vigente 13:03 Guatemala: creación de ronda/torneo exclusivamente en MENÚ; quitar entradas de Modalidades y botones inferiores. Ronda de práctica retirada desde matriz, programa y manual; nunca recuperarla como evento oficial. La ubicación anterior de IMG_5630.png queda sustituida. Orden 11:29: directorio de eventos por tipo y código del seleccionado. Prueba test-event-directory-code.mjs.


## R147.2.4.24 · corte 2 octubre 2026 11:50 Guatemala

Orden IMG_5632 y correcciones 11:39–11:44: historial trasladado al Menú; retirados RONDA PARTICULAR/TORNEO/TORNEO ACTIVO de tarjeta; únicamente SCORES MI RONDA y SCORES TORNEO. MI RONDA corresponde al evento en que juega el usuario. Sólo creador: ID DE MI RONDA, copia y apertura wa.me por acción del usuario. Registro: opciones de unirse por selección y código en Modalidades, sin creación automática. Menú Torneos: directorio completo vigente, seleccionar y código de acceso para lectura sin cambiar asignación ni jugadores.

Evidencia: banco integral PASS; test-event-directory-code prueba lectura viewer, roster vacío y rechazo de otro código/evento; pruebas negativas de código heredado, recuperación y actualización manual PASS. Navegador Preview/publicación/limpieza todavía PENDIENTES. Respaldos Neon listos: LAB br-soft-frog-avuejybp; Producción br-tiny-math-avpu8yfk. Git CLI push bloqueado sin credenciales; conector GitHub create_blob confirmado.

Archivos afectados en esta versión:
- `CONTROL_PROYECTO_SCIRE/ACEPTACION_R147_2_4_24.md`
- `api/_lib/event-administration.js`
- `api/_lib/event-lifecycle.js`
- `api/event-administration.js`
- `event-administration-ui.js`
- `event-administration.html`
- `test-event-administration.mjs`
- `test-event-directory-code.mjs`
- `test-event-lifecycle.mjs`
- `test-toolbar-cached-shell.mjs`
- `test-tournament-code-round-binding.mjs`
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`
- `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md`
- `CONTROL_PROYECTO_SCIRE/MANUAL_TAREAS_R147_2.md`
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`
- `CONTROL_PROYECTO_SCIRE/MATRIZ_ACEPTACION_SCORES_R147_2_4_1.md`
- `ROADMAP_A_DETALLE.md`
- `ROADMAP_OVERALL.md`
- `api/_lib/personal-event-access.js`
- `api/_lib/private-round-lifecycle.js`
- `api/app-access.js`
- `api/live.js`
- `api/personal-events.js`
- `auth-gate.js`
- `index-grupal.html`
- `live-control.js`
- `live-hub.js`
- `middleware.js`
- `personal-events.js`
- `release.json`
- `scripts/build-manual-lab.mjs`
- `service-worker.js`
- `shortcuts-ui.js`
- `test-lab-private-lifecycle.mjs`
- `test-lab-registration-private-rounds-entry.mjs`
- `test-lab-tournament-navigation.mjs`
- `test-lab-update-recovery.mjs`
- `test-menu-scorecard-tournament-sync.mjs`
- `test-scores-tournament-recovery.mjs`


## R147.2.4.24 · Organizador, orden 11:53 Guatemala

MENÚ → ORGANIZADOR → CREAR TORNEO. Formulario: TORNEO, CLUB desplegado oficial, MODALIDAD, CATEGORÍAS desplegadas, FECHA automática Guatemala, CREADOR obligatorio. Resultado para creador: CÓDIGO DE TORNEO; tarjeta conserva ID DE MI RONDA. Perfil de creador en configuración no sustituye identidad servidor ni concede permisos. Banco integral PASS; test-organizer-tournament-entry.mjs añadido. Preview cdda27ad: navegador real registra jugador local sin código automático, tarjeta con dos Scores e historial en Menú PASS. Último formulario requiere Preview nuevo.

Archivos: `shortcuts-ui.js`, `live-hub.html`, `live-hub.js`, `personal-events.js`, `api/personal-events.js`, `test-organizer-tournament-entry.mjs`, `scripts/build-manual-lab.mjs`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.


## R24 · control definitivo de registro 11:57 Guatemala

No vincular automáticamente selección personal heredada al iniciar otra ronda. Sólo registrationApproved tras read servidor y roster exactamente asignado; consumir esa autorización al establecer roundId actual. ID DE MI RONDA se refresca al iniciar; particular creador conserva código en almacenamiento de su cuenta. test-tournament-code-round-binding.mjs ejercita selección vieja, roster distinto y canje de registro explícito. Banco integral final PASS.

Archivos: `test-organizer-tournament-entry.mjs`, `CONTROL_PROYECTO_SCIRE/ACEPTACION_R147_2_4_24.md`, `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `CONTROL_PROYECTO_SCIRE/MANUAL_TAREAS_R147_2.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `ROADMAP_A_DETALLE.md`, `ROADMAP_OVERALL.md`, `api/personal-events.js`, `index-grupal.html`, `live-hub.html`, `live-hub.js`, `personal-events.js`, `scripts/build-manual-lab.mjs`, `shortcuts-ui.js`, `test-tournament-code-round-binding.mjs`; `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.

Control de registro ya personal: personalStorageKey evita duplicar prefijo de cuenta en `personal-events.js`, probado en `test-organizer-tournament-entry.mjs`.


## R24 · reanudación 2 octubre 2026, 12:30 Guatemala

GitHub main 1d483af y rama R24 6318884 comprobados. Preview dpl_7Td7vks5AYHJowXxjBHqMnuGi1nS READY; ambos dominios fijos R23. No procesos recuperados: ps falla por restricción de runtime. Historial externo FAIL reproducido en navegador: history=saved no se consumía. Corrección incremental conserva cuenta/returnTo y ejecuta acción oficial saved/previous. Grupo creador de torneo vacío: selección explícita asigna roster mediante API assign autorizada; no registrar automáticamente. Participante original recuperado en alias R24, código de creador oculto; teclado Gross5/Net4 PASS. Scores remotos FAIL: private excluido de connectPendingRoundTournament; corrección incorpora selección particular validada al controlador único, publicación antes de consultar y reutilización de stream. Regresiones negativas PASS. Navegador sobre correcciones, cron real, limpieza PROD y publicación PENDIENTES. No certificar iPhone ni cron sin evidencia.

Archivos:
- `index-grupal.html` · corrección, prueba o evidencia R24.
- `shortcuts-ui.js` · corrección, prueba o evidencia R24.
- `personal-events.js` · corrección, prueba o evidencia R24.
- `live-control.js` · corrección, prueba o evidencia R24.
- `scripts/build-manual-lab.mjs` · corrección, prueba o evidencia R24.
- `test-event-directory-code.mjs` · corrección, prueba o evidencia R24.
- `test-r24-history-routing.mjs` · corrección, prueba o evidencia R24.
- `test-r24-private-member-publish.mjs` · corrección, prueba o evidencia R24.
- `CONTROL_PROYECTO_SCIRE/ACEPTACION_R147_2_4_24.md` · corrección, prueba o evidencia R24.
- `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md` · corrección, prueba o evidencia R24.
- `CONTROL_PROYECTO_SCIRE/MATRIZ_ACEPTACION_SCORES_R147_2_4_1.md` · corrección, prueba o evidencia R24.
- `CONTROL_PROYECTO_SCIRE/MANUAL_TAREAS_R147_2.md` · corrección, prueba o evidencia R24.
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` · corrección, prueba o evidencia R24.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md` · corrección, prueba o evidencia R24.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` · corrección, prueba o evidencia R24.


### R24 · bloqueo de servicios comprobado 12:33 Guatemala
Producción: respaldo br-tiny-math-avpu8yfk READY y conteo SQL 11 torneos +1 particular antes del corte. Preparación de tabla de comprobantes respondió sin error; sentencia de revocación integral respondió HTTP401 supplied credentials do not pass authentication. Lectura posterior confirma mismos 12 eventos pendientes y cero comprobantes nuevos. Limpieza NO ejecutada. Vercel settings redirige a Login; CRON_SECRET real NO verificado; consulta logs filtrados en último deployment no encuentra ejecución cleanup. No promover main ni ambos dominios hasta cerrar revisión y estos bloqueos. No se ha solicitado nueva autorización del alcance.


### R24 · limpieza PROD completada y auditoría aplicable, 12:35 Guatemala
El intento transaccional inicial se revirtió íntegramente (0 comprobantes) por constraint de gsc_personal_events: sólo active/closed, nunca revoked. Corrección de la sentencia usa closed en membresía del evento y revoked en tablas deportivas. Transacción posterior PASS, 11 torneos y1 particular; consulta independiente confirma cero antiguos pendientes. Comprobantes en gsc_event_deletions actor owner-authorized-agent-sql:Jaime-Kirste; scores conservados y respaldo READY. No se repitió limpieza LAB.
Banco funcional R24 y gates documental/roadmap/inventario PASS. audit-project.mjs histórico FAIL ENOENT api/voice-speech.js: endpoint retirado por orden del propietario 19 septiembre, confirmado por scripts/build-manual-lab.mjs; no restaurar voz retirada para satisfacer auditoría V378. Perfil aplicable actual: banco integral LAB vigente, permisos/persistencia/teclado/navegación y navegador. Cron sigue NO VERIFICADO porque sesión Vercel ausente; publicación de código de producción aún pendiente.


### R24 · recuperación de tarjeta asignada 12:42 Guatemala
Preview 214beb1 READY. Navegador participante conserva Gross5/Net4 pero Scores aún omite su stream: prueba FAIL real no encubierta. Causa incremental identificada: openAssignedCard reemplaza selección y openAssignedPersonalScoreCard retorna temprano si ya coincide ronda/grupo; no fija roundId. Corrección valida roster servidor y conserva roundId de la tarjeta actual, sin reemplazar scores. Prueba test-r24-private-member-publish.mjs añade recuperación de tarjeta ya asignada y PASS. Preview y navegador de esta corrección PENDIENTES.
Archivos: `index-grupal.html`, `test-r24-private-member-publish.mjs`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `CONTROL_PROYECTO_SCIRE/ACEPTACION_R147_2_4_24.md`, `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md`, `CONTROL_PROYECTO_SCIRE/MATRIZ_ACEPTACION_SCORES_R147_2_4_1.md`, `CONTROL_PROYECTO_SCIRE/MANUAL_TAREAS_R147_2.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.


### R24 · comprobación real y actualización manual, 2026-10-02 12:54 Guatemala
- PASS navegador participante original: sin ID/código del creador; teclado oficial conserva hoyo1 Gross5/Net4; SCORES MI RONDA muestra QA PARTICIPANTE R24 10/1/5/4/EVEN. Neon confirma stream 2cddbfdc-a6b7-48f6-914e-5306afa0415d en evento a6bb8b66-106f-42b0-b1bf-8e197c392203. El intento anterior usó app_version abreviada y NO refrescó shell: el valor válido es release.json completo LABORATORIO-20261002-R147.2.4.24.
- PASS asignación explícita del organizador: evento b7404530-e009-4059-999f-a5c11cec2bda conserva role organizer y roster QA ORGANIZER RECOVERY HCP14 A/Blanco después de seleccionar su torneo en Modalidades.
- Corrección incremental personal-events.js: CONTINUAR AL SCORE CARD de torneo vacío del organizador vuelve al Registro; roster sigue vacío hasta selección explícita posterior. test-organizer-tournament-entry.mjs y private flow PASS.
- Orden del propietario 12:49: actualización de instalaciones LAB/PROD sólo mediante su toque ACTUALIZAR; no pulsar ni forzar actualización en su instalación. Publicar versión disponible no constituye consentimiento para instalarla.
- Dominios fijos inspeccionados: ambos R23, ACTUALIZADO deshabilitado; R24 aún no disponible allí. test-update-delivery-control, test-lab-update-recovery, test-lab-first-open PASS para ambos orígenes: detección cada30s sin navegación, click conserva scores/registro/asignación, descarga parcial conserva shell previa.
- PENDIENTES: consulta de otro torneo y retorno conservando asignación; historial exterior en navegador; cron/configuración real (Vercel Login, no sesión); retirar QA; candidato final/main/antigua rama LAB/READY ambos dominios. No afirmar cron operativo.
Archivos: personal-events.js, test-organizer-tournament-entry.mjs, ambos ROADMAPS, matriz, continuidad, manual de tareas, mapa e inventario.


### R24 · cierre de pruebas independientes y bloqueo de autenticación, 12:58 Guatemala
PASS navegador: historial MIS RONDAS GUARDADAS abierto desde MENÚ fuera de tarjeta; consulta QA R24 EMPTY CREATOR con código validado ofrece General/Categoría/Mis Favoritos, retorno conserva QA PARTICIPANTE R24 Gross5/Net4 y SCORES MI RONDA original. Creador inicia mediante OK/revisión/INICIAR RONDA, ID DE MI RONDA sólo suyo, teclado oficial y SCORES TORNEO muestra Gross5/Net4.
Banco integral scripts/build-manual-lab.mjs PASS exit0; gates y sello se verifican antes de guardar. QA retirado mediante transacción recuperable autorizada en LAB: comprobantes27 (torneo b7404530) y28 (particular a6bb8b66), 18:58:43Z, actor owner-authorized-agent-sql:Jaime-Kirste, destinatario Jaime Kirste, motivo QA completo, referencia respaldo br-soft-frog-avuejybp. Scores conservados; no repetir limpieza anterior.
BLOQUEO Vercel: navegador login; acceso seguro elegido GitHub, formulario devuelve Incorrect username or password. No sesión positiva; CRON_SECRET y ejecución programada aún NO VERIFICADOS. No publicar main/dominios mientras gate operativo pendiente. Próxima intervención indispensable: propietario completa acceso manual seguro a Vercel; después verificar existencia y scope de CRON_SECRET sin revelar valor, cron /api/app-access?action=cleanup horario0 * * * *, evidencia ejecución. Publicación disponible deberá dejar ACTUALIZAR al propietario; no forzar instalación ni entregar URL con update_check/app_version como sustituto del botón.


### R24 · identificador distinto para probar ACTUALIZAR, 13:01 Guatemala
Se detecta fallo de entrega en previews: diferentes commits con mismo release no ofrecían ACTUALIZAR a una R24 ya instalada. Identificador incremental LABORATORIO-20261002-R147.2.4.24-B2 en release.json, meta index-grupal.html y fallback service-worker.js; etiqueta visible sigue R147.2.4.24. Sin promover instalaciones automáticamente; versión disponible se descubre cada30s y se instala sólo al toque. Banco update recovery/discovery debe comprobar B2 con versión previa de la misma R24; producción sigue R23 mientras cron no verificado. Archivos index-grupal.html, service-worker.js, release.json y controles/documentación/inventario.


### R24 · orden vigente y corrección desde matriz, 13:06–13:13 Guatemala
Orden anterior de creación en Modalidades queda sustituida: MENÚ contiene CREAR TORNEO y CREAR RONDA PARTICULAR. Ambos generan su propio código y ofrecen WhatsApp y COPIAR CÓDIGO. Torneo exige autorización individual de organizador o propietario; validación obligatoria en personal-events y live API. Ronda particular disponible a cualquier jugador. Propietario emite/revoca autorización de creación ligada al código personal del destinatario desde Administración; código de un solo canje, hash,24h, sin facultad para borrar eventos ajenos ni delegar.
Retiro de Práctica desde matriz funcional canónica JSON, matriz editorial MD/JSON y ficha pendiente de modalidades. Eliminados creador/editor/entrada/renderizador específico y capítulos/índice/acciones del Manual. Sesiones antiguas de práctica no se recuperan como rondas oficiales; scores antiguos no se destruyen. Se mantienen sólo guardas de compatibilidad que impiden escrituras/cierres oficiales de ese formato retirado.
Pruebas vigentes se corrigen para no reintroducir botones en Modalidades; fixtures positivos ahora reciben autorización de organizador explícita. Nuevo test de permisos prueba denegación en ambos endpoints, particular abierto, código individual de un uso, revocación/vencimiento y no delegación. Nuevo test de retiro comprueba matriz/manual/programa y recuperación de sesión antigua sin destruir scores. B3 conserva versión visible R147.2.4.24 y permite ACTUALIZAR desde R24/B2. Ningún candidato B2 se considera final tras esta orden.
PENDIENTES: banco integral B3 y navegador; capturas de Manual con nueva ubicación; cron/configuración real Vercel con acceso manual (GitHub rechazó credenciales); publicación final main/dominos/rama LAB antigua y prueba de actualización del propietario. NO PUBLICADO en dominios fijos.

### Orden final del propietario · 2 octubre 2026, 13:22 Guatemala
Publicación autorizada inmediata de R24-B3; instalación únicamente al pulsar ACTUALIZAR por el propietario. Rondas particulares y torneos incompletos: vencimiento 24h tras último score recibido en servidor; sin scores, 24h desde creación. Eventos completos: plazo fijo tras completar 18 hoyos, no reiniciado por correcciones. Creador elimina propios eventos; propietario elimina cualquiera con comprobante. Cron programado sigue PENDIENTE por sesión Vercel no autenticada: no afirmar ejecución. Pantallas anteriores del manual pendientes de renovación visual.

### R24-B4 · revisión física del menú · 2 octubre 2026
B3 commit 5506f37871c2d5717599665868e0761a65508129 publicado READY en ambos dominios; ACTUALIZAR comprobado sin pulsarlo en instalaciones R23. Creación privada QA B3 MENU desde menú y COPIAR CÓDIGO PASS navegador. Creador eliminó su ronda sin scores y se mostró comprobante. Historial guardado y respuesta NO HAY RONDA PREVIA PASS. CREAR TORNEO exige autorización individual PASS navegador. WhatsApp abre protocolo bloqueado por navegador cloud: no prueba física en aplicación móvil.
Correcciones posteriores a la revisión: shortcuts-ui.js elimina dependencia de openRoundTournament para consultas del menú; General, Categorías, Buscar y Favoritos llegan al hub aun sin evento asignado (antes el mensaje quedaba en tarjeta oculta). event-administration.html respeta hidden para permisos exclusivos del propietario. test-lab-shortcuts-navigation.mjs ejecuta siete rutas reales del dispatcher y regresión CSS. Entrega manual B4 diferenciada en release.json, index-grupal.html y service-worker.js; ningún ACTUALIZAR del propietario pulsado. Cron real y login propietario siguen pendientes de autenticación Vercel/aplicación.


## R24-B5 · creación y código de Mi Ronda/Torneo · 2 octubre 2026

Fuente: main `31c4e557b543e034103cef55de06ffce8194d493`; capturas IMG_5648/5649/5650/5651 y órdenes 15:23–15:24 Guatemala. CREAR MI RONDA libre para cualquier jugador; CREAR TORNEO mantiene autorización individual. Ambos muestran código para compartir tras crear. No se modifica motor de scores, eventos existentes ni permisos de otros usuarios.

Fallo confirmado: menú exigía roster completo antes de abrir creación y dejaba error en Registro detrás de la navegación; prueba negativa de borrador parcial ahora abre creación sin asignarlo y conserva datos. Formulario particular conservaba campos/botón tras creación; ahora resultado muestra código, copia, WhatsApp y continuar. Se añade validación visible previa, estado creando y bloqueo de doble toque. Torneo usa request con identidad preparada, no reinicializa un formulario ya abierto, impide doble envío y muestra código aunque sync no encuentre el evento. El nombre lleno pero validado vacío de IMG_5651 no ha sido reproducido exactamente en iPhone; no se declara causa definitiva del dispositivo.

Permiso operativo: Neon LAB verificó device:910e8ee4-d017-4e17-b998-fc7ee82305b5 sin grant; se emitió autorización individual de un uso, ID f8caa489-d079-42a8-833a-43e8a1c1bb45, vence 3 octubre 2026 15:25 Guatemala, ligada sólo a ese dispositivo. No se registra el secreto en repositorio. PROD no contenía esa identidad.

Pruebas dirigidas PASS: nombre/creador conservados, borrador incompleto, datos requeridos, doble toque, código ante sync fallido y compartir/cancelación/continuar. Browser sobre B4 creó QA CREAR MI RONDA 20261002 sin permiso y entregó código; no certifica B5 ni iPhone. Banco integral B5, Preview y entrega pendientes al escribir. Riesgos: duplicados, borrador perdido, permisos ampliados y código omitido; controles negativos en banco. Rollback de código a 31c4e557; sin rollback de datos.

Archivos registrados dentro de esta versión:
- `index-grupal.html` · corrección, prueba o registro R24-B5.
- `live-hub.js` · corrección, prueba o registro R24-B5.
- `personal-events.js` · corrección, prueba o registro R24-B5.
- `shortcuts-ui.js` · corrección, prueba o registro R24-B5.
- `release.json` · corrección, prueba o registro R24-B5.
- `service-worker.js` · corrección, prueba o registro R24-B5.
- `scripts/build-manual-lab.mjs` · corrección, prueba o registro R24-B5.
- `test-lab-private-round-share-flow.mjs` · corrección, prueba o registro R24-B5.
- `test-lab-registration-private-rounds-entry.mjs` · corrección, prueba o registro R24-B5.
- `test-lab-registration-return-state.mjs` · corrección, prueba o registro R24-B5.
- `test-r24-event-creation-feedback.mjs` · corrección, prueba o registro R24-B5.
- `ROADMAP_OVERALL.md` · corrección, prueba o registro R24-B5.
- `ROADMAP_A_DETALLE.md` · corrección, prueba o registro R24-B5.
- `CONTROL_PROYECTO_SCIRE/ACEPTACION_R147_2_4_24.md` · corrección, prueba o registro R24-B5.
- `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md` · corrección, prueba o registro R24-B5.
- `CONTROL_PROYECTO_SCIRE/MANUAL_TAREAS_R147_2.md` · corrección, prueba o registro R24-B5.
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` · corrección, prueba o registro R24-B5.
- `CONTROL_PROYECTO_SCIRE/MATRIZ_ACEPTACION_SCORES_R147_2_4_1.md` · corrección, prueba o registro R24-B5.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md` · corrección, prueba o registro R24-B5.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` · corrección, prueba o registro R24-B5.

- `test-lab-tournament-navigation.mjs` · fixture conserva roster completo y usa helper validado por banco B5.

### R24-B5 · corrección adicional de prueba real · 2026-10-02
Preview ac941a1: ronda creada sin autorización, código MJQGB9XDBS y regreso al registro. La prueba detectó pérdida del nombre visible al volver y rechazo de torneo tras preflight autorizado. Se captura el DOM del registro antes de evaluar el grupo y se conserva la identidad validada en la llamada interna a Live. Regresión de identidad: proveedor distinto no puede reemplazar al dispositivo autenticado. Verificación de nuevo Preview y publicación todavía PENDIENTES; no se declara prueba de iPhone ni de todos los botones.

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
