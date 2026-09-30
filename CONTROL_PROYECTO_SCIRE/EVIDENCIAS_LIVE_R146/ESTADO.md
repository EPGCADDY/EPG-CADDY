# R146 · permisos personales integrados en LAB · NO ENTREGA FINAL

Base canónica remota comprobada a75780974ef4a224d809eeeba561051c9d24f808; cambios locales sobre R145. Producción/main 89c64f348b6ce2a311218215c41488e04a588053 intacta. Proyecto exclusivo golf-sc-gt-lab / prj_0KNTWUoiCiA3amKZQPDNNkWYFDbp; DB permitida exclusivamente br-small-mouse-av0f24o9 / ep-fragrant-pine-av6xi8hy. No se utiliza base primaria ni proxy de Producción.

Referencias: originales Torneos_01_Entrada_y_Resultados.png y Torneos_04_Mapa_de_Pantallas.png recuperados e inspeccionados; Revision_Torneos_Privados.md y Matriz_Acceso_Ronda_y_Torneo.md v4. Orden más reciente de compartir LIVE en MATRIZ_LIVE_CODIGO_UN_SOLO_USO_R144.md: jugador genera código de primer uso, lo envía desde su aplicación, sin proveedor SMS ni intervención del organizador para compartir. Los accesos de inscripción personales siguen autorización del organizador y se vinculan a la cuenta autenticada existente; no se afirma verificación telefónica.

Implementación: formulario Torneos nombre/campo/fecha/modalidad/categorías; creación real en API/DB actual. Organización autoriza por identificador personal, invitación aleatoria de 32 caracteres guardada como hash, destinatario vinculado a cuenta, vigencia 24h, consumo atómico y membresía por evento/tipo. Roles organizador, jugador, anotador de grupo e invitado solo lectura; cupo 100 jugadores incluye invitaciones pendientes, excluye invitados, libera vencidas/revocadas y se serializa mediante bloqueo del evento dentro de SQL. Reasignación y configuración conservan historial antes/después; modalidad no cambia con scores existentes; cierre bloquea escrituras. Servidor exige membresía activa también con tokens conocidos o clave de publicación filtrada. Ronda Particular tiene tablas y ámbito independientes.

Tarjeta real: acceso desde ANOTAR MIS SCORES, registro de roster autorizado y motor vigente, conexión oficial a evento y captura/publicación existente. Cuenta/evento se validan en middleware antes de cargar tarjeta; datos locales separados por cuenta. Reingreso usa preferencia HttpOnly que no concede autorización, comparando sesión real otra vez. URL de tarjeta personal nunca usa fallback de shell propietario en service-worker. Recuperación de stream vencido requiere nueva validación. MI POSICIÓN usa ranking General y categoría del motor actual, más hoyos completados. Header/logo/Scores reducido/favoritos y detalle 18 G/N originales se conservan. Lectura LIVE anterior sigue /api/live; pruebas protegen el desvío involuntario detectado. Funciones deportivas, corrección, persistencia/historial/menú y audio local aprobados se conservan.

COMPARTIR LIVE desde tarjeta inscrita abre el diálogo de código de 12 caracteres ya aprobado, destino directo a tabla. Invitado no genera códigos. Primera apertura crea cookie de lectura; reutilización por otra sesión denegada; revocación del emisor personal bloquea su sesión compartida. El código de compartir prueba posesión, no identidad del receptor, según última orden.

Evidencia PASS local: build.log (perfil completo LAB con 5 modalidades); gates.log; bancos personal-event-permissions, personal-storage-access, personal-front-end y V353 incluidos en build. API real con SQL PostgreSQL PGlite descartable y cuentas fixture explícitas: código equivocado/reenviado/usado/vencido, ocho consumos y un ganador, privacidad de enumeración, grupos/HCP/roster, lector con secret filtrado, revocación/cierre, recuperación tras vencimiento, escritor privado/tablas separadas, 100/101, invitados sin cupo, liberación de vencimiento, fecha calendario inválida, sesión LIVE de primer uso y revocación de emisor. PGlite de una conexión NO certifica concurrencia Neon de varias conexiones ni sesión real remota.

Control histórico Intocables/intocables-gate.mjs devuelve ENOENT api/voice-speech.js, retirado por orden vigente del propietario (ROADMAP_A_DETALLE R11 GATE HOTFIX 2026-09-22). No se restaura endpoint retirado ni se declara PASS de ese control antiguo. Perfil actual scripts/build-manual-lab.mjs y test-manual-no-assistant.mjs verifican que siga ausente. No se declara auditoría histórica integral ni prueba física iPhone.

El bloqueo EPERM del checkpoint R145 quedó resuelto tras cambio efectivo de permisos del entorno; test-project-quality-gate.mjs normal sin escalación PASS. No se repitió la escalación rechazada.

Vercel: GSC_PERSONAL_ACCESS_LAB_READY=1 guardado SOLO Preview; captura lab-preview-env.jpg. Canal fijo LAB no se activó ni redeployó. LAB público continúa R144 hasta revisión nueva. Estado actual: NO REVISADO. Pendientes ejecutables: sellar roadmaps/inventarios, commit y sincronizar rama LAB, comprobar Preview READY y revisión visual real. Pendiente de servicio: navegador carece de sesión autenticada de aplicación; no se puede certificar escritor/permisos remotos con fixtures ni saltar login. No se solicitan credenciales por chat ni una nueva autorización.

Rollback: quitar activación Preview y volver solo LAB al commit a757809; ninguna promoción a main o a epg-caddy. Entrega integral bloqueada hasta cero fallos aplicables y recorrido remoto comprobado.

Rama de revisión prevista: lab/integral-round-tournament-r146-20260930, basada en remoto a757809. No se actualizará el canal fijo ni la rama canónica de LAB hasta revisión remota. Preparación de Preview no equivale a entrega.


## R146 · corrección posterior a revisión Preview · 30/09/2026
Preview f313b531441f1b76604bd875389a7608f887ea94 READY: https://golf-sc-gt-7w4bru5rg-epgcaddys-projects.vercel.app/live-hub.html. Revisión real detectó FAIL visual: CSS mostraba COMPARTIR LIVE aunque tenía hidden. Corregido con regla de visibilidad, navegación inicial oculta y entrada configurada antes de sincronización. Captura preview-before-visibility-fix.jpg documenta fallo anterior, no aceptación.
Publicación revalida membresía, rol, evento, stream, grupo, modalidad y roster dentro de la misma sentencia SQL; bloquea evento/miembro durante escritura. Prueba revocación entre prevalidación y publicación PASS: score rechazado, revisión permanece 0. Perfil completo scripts/build-manual-lab.mjs PASS después de ambas correcciones; evidencia build.log.
Estado: candidato de revisión, sin promoción a canal fijo LAB ni Producción. Sesión autenticada real de aplicación ausente en navegador; pruebas fixture no certifican recorrido remoto. Correcciones requieren nuevo Preview y revisión visual antes de aceptación.
Archivos del bloque:
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R146/ESTADO.md`
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R146/build.log`
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R146/preview-before-visibility-fix.jpg`
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`
- `ROADMAP_A_DETALLE.md`
- `ROADMAP_OVERALL.md`
- `api/_lib/personal-event-access.js`
- `api/live.js`
- `live-hub.html`
- `live-hub.js`
- `scores-ui.css`
- `test-personal-event-permissions.mjs`
- `test-personal-front-end.mjs`


### R146 · corrección gráfica expresa 07:34 Guatemala
Logo horizontal original ampliado hasta 320 px con adaptación al ancho disponible. Scores reducido a 16 px; título, nombre del evento, metadatos y botón usan fuente 16 px. Botón visible ← Score Card: navegación directa a tarjeta existente, con revalidación de asignación personal cuando corresponde. No se usa history.back. Pruebas navegación/frontend y build manual completo PASS. Revisión remota del cambio sigue pendiente.
Archivos: `live-hub.html`, `live-hub.js`, `scores-ui.css`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R146/build.log`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R146/ESTADO.md`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.


### R146 · recorrido Preview 07:45 Guatemala
Commit remoto f54de0bf518b6636921004d55e150c8f976c4b49 / despliegue dpl_DQAEJT1DiEHvjgL7skjJgQxsxd7U READY. URL https://golf-sc-gt-aivs9bxsl-epgcaddys-projects.vercel.app/live-hub.html verificada en navegador. Entrada: logo medido 320px, título/botón 16px, Compartir LIVE oculto; formulario completo real; listado y botones de identidad/invitación. Identidad exige cuenta: login real apareció, sin credenciales ni sesión. Regreso ← Score Card navega al acceso protegido para usuario anónimo. Producción/main verificado 89c64f348b6ce2a311218215c41488e04a588053 intacto.
Revisión Scores demo=1 explícita: dos vueltas de 9 G/N, Escape cierra, favorito independiente conservado, categoría B 24 filas. Captura inicial del detalle estaba atrasada; captura posterior confirma diálogo visible y persistente, no fallo de aplicación. Capturas guardadas son del commit f54de0b, no del ajuste posterior del header emergente.
Ajuste posterior: header compartido del emergente usa también logo hasta320px y Scores16px; nombre16px. Historial de rondas particulares incorpora lista de eventos personales autorizados, conserva cerrados y elimina duplicados por ID. Prueba funcional VM con evento cerrado, duplicado y navegación por membresía PASS; no concede nuevas autorizaciones. Perfil build completo PASS después de cambios de aplicación.
Entrega integral BLOQUEADA por ausencia de sesión real de aplicación para verificar escritor, captura, corrección, historial y roles en despliegue. PGlite y fixtures no sustituyen esa prueba ni concurrencia Neon remota. No se ofrece otra autorización ni se solicitan secretos por chat. Último bloque ejecutable: publicar ajustes y comprobar visual del emergente.
Archivos:
- `scores-ui.css`
- `private-rounds.js`
- `test-lab-private-rounds.mjs`
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R146/build.log`
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R146/ESTADO.md`
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R146/preview-r146-fixed-entry.jpg`
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R146/preview-r146-detail-confirmed.jpg`
- `ROADMAP_OVERALL.md`
- `ROADMAP_A_DETALLE.md`
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`


### R146 · aclaración G/N aprobada 07:46 Guatemala
En cada fila G/N de las dos vueltas del detalle, leyenda pequeña GROSS arriba y NETO abajo. Mantiene los 18 valores combinados y las casillas pendientes. Build completo PASS tras incorporar esta corrección y la prueba funcional del historial cerrado. Archivos: `scores-ui.js`, `scores-ui.css`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R146/build.log`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R146/ESTADO.md`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.


### R146 · checkpoint de revisión final de este bloque 07:51 Guatemala
Despliegue dpl_EhNsMDuTiPn8eSNXYb352jD5Padi READY, commit remoto 613695e5f9dfe2e0305ae09d8e053d6dffc6717b, árbol 65ac33f07b7bb41a549d3232ca0ff6ae7a9dc4fd idéntico al checkpoint local 24f313d. Enlace real verificado https://golf-sc-gt-6rqa1sg45-epgcaddys-projects.vercel.app/live-hub.html. No se promociona a canal fijo ni Producción.
Revisión navegador del último código PASS: entrada Crear/Ver Scores y ← Score Card; compartir oculto. Detalle abierto por Enter, dos vueltas de 9 scores G/N y explicación GROSS/NETO apilada en ambos rótulos; logo medido320px y cuatro fuentes16px. Captura preview-r146-latest-detail.jpg corresponde a demo=1, explícitamente datos de prueba y no escritor autenticado. Confirmados también Escape, favoritos, categoría y navegación al login en revisión f54de0b anterior.
Controles proyecto/calidad/pruebas negativas/matriz/continuidad PASS; build completo PASS con prueba funcional de historial privado cerrado. Producción/main verificado89c64f348b6ce2a311218215c41488e04a588053 sin cambios.
EJECUCIÓN BLOQUEADA para aceptación integral: el navegador no tiene sesión autenticada real de la aplicación; login de correo exige credenciales no disponibles y Google aparece EN CONFIGURACIÓN. No se puede verificar captura/corrección/historial y roles con sesión remota ni sustituirla por cuentas fixture. Handoff seguro ya ofrecido en este bloqueo sin sesión obtenida, no se vuelve a solicitar. Código completo del bloque queda publicado en Preview LAB; no se declara entrega final100%. Próxima acción necesaria: obtener sesión válida mediante flujo seguro existente y ejecutar recorrido remoto de escritor/lector/revocación.
Este checkpoint de evidencia no cambia código de aplicación y se guarda separado de la rama desplegada. Archivos: `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R146/preview-r146-latest-detail.jpg`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R146/ESTADO.md`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.
