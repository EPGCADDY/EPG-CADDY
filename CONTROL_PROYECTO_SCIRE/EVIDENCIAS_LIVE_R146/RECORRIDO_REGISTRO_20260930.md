
### R146 · 30/09/2026 10:10 Guatemala · punto de recuperación sin entrega
- `test-lab-tournament-navigation.mjs`: reemplazada expectativa textual obsoleta createPrivate(round) por ejecución del handler real con ronda anterior distinta del grupo actual; PASS conservación del Registro actual.
- Build completo perfil LAB PASS `/tmp/r146-private-registration-build.log`.
- Archivos adicionales del bloque: `api/_lib/personal-event-access.js`, `personal-events.js`, `live-hub.js`, `index-grupal.html`, `scripts/build-manual-lab.mjs`, `test-lab-registration-return-state.mjs`, `test-lab-tournament-navigation.mjs`, `auth-gate.js`, `test-lab-guest-account-entry.mjs`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R146/RECORRIDO_REGISTRO_20260930.md`.
- Navegador publicado f243eb1: Crear torneo/cerrar/Ver Scores/volver a Score Card; último regreso redirige a access.html por ausencia de sesión. Las correcciones locales aún no publicadas ni revisadas visualmente.
- Capturas del propietario IMG_5351.png e IMG_5352.jpeg inspeccionadas desde adjuntos autorizados: entrada en Torneos y Registro bajo invitación temporal, respectivamente. No prueban autenticación habitual.
- BLOQUEADO sólo el recorrido autenticado: no sesión válida en navegador; identificador histórico guardado no vinculado de forma verificada con cuenta actual. No inventar alias, contraseña ni acceso. Revisión física iPhone no realizada. Producción intacta; no entrega final, no 100%, no publicación de correcciones sin esa verificación.

Próxima acción: verificar la vinculación del identificador de acceso existente sin cambiar contraseña; obtener sesión válida por mecanismo seguro y recorrer creación → tarjeta → captura → clasificación → detalle/favoritos → regreso, permisos/revocación/cierre e historial. No usar invitación de 24h como reemplazo del acceso habitual.

### R146 · 30/09/2026 10:20 Guatemala · comparación exacta R128.18
- Referencia aportada por propietario: R128.18, commit `e0e11a9`, release PRODUCTION-20260926-R128.18. Comparados `api/account.js`, `api/_lib/account-auth.js`, `api/_lib/app-access.js`, `api/app-access.js`, `middleware.js`, `access.html`; origen de autorización de propietario permanece igual y no se cambió contraseña ni proveedor.
- Configuración actual leída sin cambios: LAB passwordProtection desactivado; SSO all_except_custom_domains. Variables de integración y EPG_OWNER_USER_ID sólo en entorno Production del proyecto LAB; Preview emplea configuración predeterminada del código. No secretos revelados.
- Defecto adicional identificado: auth-gate.js daba prioridad a gsc_guest_mode sobre sesión válida de propietario ya reconocida por resolveAppAccess.
- `api/app-access.js`, `auth-gate.js`: status limpia cookies temporales únicamente después de verificar propietario; cliente recarga ruta/query original sólo tras limpieza efectiva, sin bucle ni reemplazo por invitación.
- `test-lab-owner-session-priority.mjs`, `test-lab-guest-account-entry.mjs`, `scripts/build-manual-lab.mjs`: PASS handler real e init con fixtures de proveedor: propietario confirmado, otra cuenta, caída, limpieza y recarga sin bucle; invitado mantiene permisos anteriores. No prueban contraseña real.
- Estado integral: PENDIENTE sesión real y revisión física completa; usuario histórico no vinculado de manera verificable, no se inventó alias. Producción intacta.

### R146 · 30/09/2026 10:27 Guatemala · alta antes de captura y referencia R128.18
- `index-grupal.html`, `live-hub.js`, `test-lab-registration-return-state.mjs`: nombre ya capturado en Registro precarga el formulario; entrada Torneos valida identidad antes de pedir datos. PASS handler con cuenta autorizada y no autorizada.
- Vercel consultado sólo lectura: epg-caddy.vercel.app corresponde a R128.18, commit 89c64f348b6ce2a311218215c41488e04a588053, dpl_2nzrTn5ft7MX1h4fw4Bd3t3FLw2L READY/Production. No modificación. La sesión guardada de ese origen no se transfiere automáticamente a los dominios de Preview.
- Prueba exploratoria `test-lab-round-create-modal.mjs` (perfil histórico R143) FAIL expectativa de abrir formulario sin validar identidad. Ese banco exige además API legado create_tournament, release R143 y CREAR EVENTO; no corresponde a la especificación R145/R146 de acceso personal y botones CREAR TORNEO/CREAR RONDA PRIVADA. No se editó ni se presentó como PASS. El perfil vigente usa test-lab-registration-return-state, test-lab-tournament-navigation y permisos personales; revisión real integral sigue PENDIENTE.

### R146 · 30/09/2026 · recorrido visible parcial de consulta
- Navegador real en LAB publicado f243eb1, modo público demo=1: Categoría → favorito CAMPEONATO 06 → Mis favoritos → General → doble toque / detalle 18 scores → cerrar → Torneos → Ver Scores → reabrir torneo. Favorito conservado; detalle dos bloques de nueve con G/N, GROSS y NETO. Datos de ejemplo, no aceptación autenticada ni prueba física iPhone.
- FAIL observado: General mantenía filtro CAMPEONATO tras Categoría. Corrección local showMonitor general restaura all y cierra detalle de categoría; prueba ejecuta handler real. Aún pendiente revisión visual de esta corrección publicada.
- FAIL visual publicado: sólo tres accesos; falta BUSCAR JUGADORES. Fuente local contiene los cuatro botones; discrepancia de versión/recursos pendiente, no se declara resuelta.
- Evidencia: /workspace/scratch/3e936abcc9cb/lab-r146-demo-detalle-18-scores.jpg. Recorrido protegido de creación/captura/permisos e iPhone pendientes por ausencia de sesión real. Producción intacta.

### 30/09/2026 · escenario solicitado de seis jugadores
- Preparado ESCENARIO_SEIS_JUGADORES_20260930.json: cinco marcas válidas, seis jugadores ficticios, cinco categorías (B repetida), captura prevista H1-H3; validación assignedPlayers + validateAssignedConfiguration PASS. No equivale a jugadores registrados ni a scores capturados.
- Navegador publicado: ← Score Card vuelve a access.html antes de Registro. BLOQUEADO recorrido de alta/tarjeta/torneo/invitado por ausencia de sesión válida; evidencia /workspace/scratch/3e936abcc9cb/lab-seis-jugadores-acceso-bloqueado.jpg. No creado torneo ni alterada Producción.
- Próxima acción ejecutable dependiente: acceso autenticado normal de LAB; entonces introducir este escenario por UI y verificar todas las ramas y regresos, sin sustituirlo por demo precargado.

### 30/09/2026 · revisión operativa jugador / invitado
- live-hub.js: tabla compacta del torneo ahora muestra POS con rankLabel del motor existente (incluye empates); ronda particular conserva su tratamiento. Detectado escape: ranking calculado pero columna omitida.
- Categoría abre la única categoría asignada a la cuenta; grupos mixtos conservan selector, invitados conservan categoría escogida. General y Categoría limpian consulta anterior para no esconder rivales silenciosamente.
- Buscar muestra junto al jugador posición GENERAL y CATEGORÍA desde buildLeaderboard, sin forzar agregar favorito ni cambiar permisos. Se conserva gráfica existente y accesos aprobados, sin pantallas nuevas.
- test-lab-tournament-navigation.mjs ejecuta handlers/renderizadores reales: categoría B asignada, lector sin jugadores, regreso desde búsqueda, POS T2 y búsqueda con datos demo/motor oficial PASS. Primer chequeo detectó comilla perdida en edición; corregida antes del build, no publicada.
- Revisión navegador autenticado / seis jugadores por UI aún BLOQUEADA por acceso de propietario. Estos cambios locales no publicados ni presentados como aceptación física. Regreso de tarjeta con scores requiere comprobar sesión/identidad/roster real; no se declara aprobado. Producción intacta.

### 30/09/2026 · causa verificada de búsqueda ausente
- Vercel branch alias y deployment inmutable dpl_BcFVHEiGPSiuLHDTzafziKChBUc9/f243eb1 muestran tres controles. DOM real contiene hubShowIndividual con display:none: no fallo de enlace.
- scores-ui.css ocultaba hubShowIndividual y hubSearchResults, y imponía tres columnas. Corregido incrementalmente a dos columnas/cuatro accesos aprobados y resultados visibles; ajustadas columnas del mismo Scores compacto para POS sin alterar ronda particular.
- test-lab-tournament-navigation.mjs añade regresión de override CSS. Pendiente publicación Preview/revisión visual de cambios; sesión real sigue bloqueada. Producción intacta.
