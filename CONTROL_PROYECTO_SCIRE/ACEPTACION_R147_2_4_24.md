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

Orden visual IMG_5630.png: dos opciones de creación en Modalidades; quitar botones inferiores y MI RONDA. Orden 11:29: directorio de eventos por tipo y código del seleccionado. Prueba test-event-directory-code.mjs.


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
