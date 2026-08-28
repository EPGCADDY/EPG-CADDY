# GOLF Score Card Guatemala — Arquitectura de Base Central

## Decisión aprobada

La aplicación tendrá una base PostgreSQL central, alojada y administrada. La opción recomendada para el despliegue actual en Vercel es Neon Postgres mediante Vercel Marketplace.

La base central será la única fuente permanente de verdad para jugadores, rondas, scores, consentimientos, archivos generados, correcciones, estadísticas y entregas. El historial se consulta dentro de la misma aplicación, pero no reside permanentemente en el teléfono. El dispositivo conserva solamente la ronda activa, una caché mínima y la cola de sincronización; después de confirmación remota, los datos temporales se purgan automáticamente.

## Principios

1. Jugar no requiere correo, WhatsApp ni consentimiento de entrega.
2. Contacto escrito no equivale a consentimiento.
3. Consentimientos son eventos auditables y revocables; no se sobrescriben.
4. Una ronda cerrada es inmutable.
5. Una corrección crea una nueva versión y preserva la original.
6. Scores y estadísticas no se duplican en motores paralelos.
7. Los envíos son idempotentes y verificables.
8. El cliente nunca recibe credenciales directas de PostgreSQL.
9. Toda escritura remota pasa por APIs autenticadas y validadas.
10. La aplicación debe seguir registrando una ronda si temporalmente no hay señal.

## Almacenamiento

- PostgreSQL alojado: identidades, contactos, consentimientos, rondas, participantes, scores, versiones y entregas.
- Vercel Blob privado o almacenamiento equivalente: imágenes/PDF/paquetes finales.
- Teléfono: ronda activa, caché temporal mínima, snapshots pendientes y cola offline; nunca el historial permanente.
- Aplicación: pantalla única de historial que consulta la base central y permite reconstruir rondas, tarjetas, estadísticas y récords en cualquier dispositivo autorizado.
- Backups del proveedor: recuperación puntual; deben probarse restauraciones periódicas.

## Sincronización offline

Cada mutación lleva:

- `client_mutation_id` único;
- identificador del dispositivo o instalación;
- versión de esquema;
- fecha del dispositivo;
- fecha recibida por servidor;
- versión esperada del registro.

El servidor acepta una mutación una sola vez. Si recibe nuevamente el mismo `client_mutation_id`, devuelve el resultado anterior. Los conflictos nunca se resuelven por “último dispositivo gana” en rondas cerradas, consentimientos o entregas.

## Seguridad

- TLS obligatorio.
- Secretos únicamente en variables de entorno del servidor.
- Cifrado del proveedor en reposo.
- Contactos excluidos de logs y mensajes de error.
- Acceso por roles y mínimo privilegio.
- Auditoría de lectura sensible, cambios de consentimiento, cierres, correcciones y entregas.
- Retención y eliminación definidas antes de lanzamiento.
- Exportación de datos del jugador y atención de solicitudes de privacidad.

## Estado comprobado al 20 de agosto de 2026

- Neon Postgres está provisionado y conectado al proyecto Vercel.
- `GET /api/database-health` responde `ok:true`, base `neondb` y nueve tablas.
- `DATABASE_URL` está disponible en Producción.
- La migración inicial está aplicada.
- La API `/api/sync` existe, pero el transporte permanece cerrado porque falta configurar `SYNC_TOKEN`; responde correctamente `SYNC_AUTH_NOT_CONFIGURED`.
- La modalidad Stableford V199 conserva temporalmente en el navegador la serie de cuatro fechas y las tres mejores tarjetas por jugador. Esta persistencia local permite la operación inmediata, pero no sustituye la fuente central ni se considera historial multi-dispositivo.

## Dependencias restantes para activación integral

1. Configurar y custodiar `SYNC_TOKEN` en los entornos autorizados.
2. Conectar el cliente y la cola local con la API autenticada.
3. Definir identidad y permisos de propietario, operadores y jugadores.
4. Aprobar política de privacidad y términos.
5. Ejecutar pruebas de backup, restore, concurrencia, offline y migración retroactiva.
6. Crear el modelo central de series Stableford, fechas, categorías y resultados oficiales, y migrar el acumulado local con claves idempotentes.

## V255 — perfil reutilizable

- `database/002_player_profiles_and_history.sql` prepara un código privado único por jugador, el último handicap, las últimas marcas y la tabla append-only `player_profile_events` para conservar cada cambio de nombre, handicap, marcas o WhatsApp.
- La interfaz V255 guarda y recupera estos perfiles en el directorio privado del dispositivo mientras la sincronización central permanece cerrada.
- La migración todavía no se considera aplicada en Producción y la aplicación no debe afirmar permanencia central ni consulta multi-dispositivo hasta habilitar autenticación, ejecutar la migración y probar el recorrido completo.
- `COMPARTIR` aparece únicamente como proyecto de selección de información. El intercambio entre usuarios será permitido en una fase posterior, pero en V255 no existe autorización ni transporte y la acción final permanece deshabilitada.

## Preparación V256 — plataforma maestra por rubros

- `database/003_master_data_platform.sql` normaliza instalaciones, campos y sus definiciones, torneos, jugadores, contactos, handicap, marcas, rondas, participantes, scores, tarjetas lógicas y acciones de compartir.
- Cada rubro mantiene un dato vigente para consulta rápida y una tabla de eventos append-only para conservar la evolución completa.
- Cuando se registra nuevamente un código existente, nombre, handicap, marcas, correo o WhatsApp reemplazan el dato vigente del mismo jugador. La versión anterior no se usa en una nueva ronda, pero permanece en el historial con fecha y origen.
- `master-data-sync.js` transforma el directorio y la ronda activa en un único contrato versionado. Incluye la definición del campo y yardajes, torneo, uno a seis jugadores, los hoyos registrados, cierre oficial y manifiestos reconstruibles de tarjetas.
- La cola local es offline-first, idempotente y compacta estados todavía no enviados; nunca purga un paquete hasta recibir acuse remoto con el mismo SHA-256.
- `/api/sync` entrega el paquete a `apply_master_sync_mutation`, que aplica la mutación completa dentro de una transacción PostgreSQL y distribuye los datos a sus tablas correspondientes.
- La API acepta token de operador o sesión segura HttpOnly. El secreto nunca se incorpora al HTML ni al JavaScript público.
- La acción nativa de compartir registra solamente `PREPARED`, `CANCELLED` o `FAILED`; no afirma entrega por correo o WhatsApp porque la hoja del sistema no informa el canal ni confirma que el destinatario lo recibió.

La migración V256 debe ensayarse en una rama aislada de Neon y superar ingestión, duplicado, corrección y recuperación antes de aplicarse a Producción. Mientras falten migración y sesión autenticada, la cola conserva el último paquete pendiente y la interfaz no debe anunciar sincronización central terminada.

La base central ya está alojada y responde. Hasta completar los puntos restantes, no se considera habilitada la sincronización comercial de datos personales y rondas.

## V352 — publicación temporal GOLF SCORE CARD GT. LIVE

V352 agrega una ruta central limitada exclusivamente a observación remota temporal. No convierte el historial comercial completo en público ni sustituye la sincronización de `PEND-NUB-011`.

### Modelo

- `live_streams`: una publicación autorizada de jugador o grupo, snapshot vigente, revisión, caducidad y vínculo opcional a torneo.
- `live_tournaments`: tablero temporal, secreto del organizador, token del visitante, código de unión, revisión y caducidad.
- `live_events`: bitácora técnica append-only de creación, publicación, unión, salida y revocación, sin guardar el token en claro.
- `live_rate_limits`: ventana de frecuencia para proteger creación, control, publicación y lectura.
- `api/live.js`: ejecuta una sola sentencia transaccional con CTE, bloquea la fila, exige revisión esperada y vuelve a filtrar `selected_player_ids` antes de guardar; la migración queda limitada a tablas e índices compatibles con el preparador seguro de Neon.

### Capacidades y privacidad

- Cada stream tiene un secreto de publicación y un token de lectura independientes, aleatorios de 256 bits. Cada torneo separa además el secreto del organizador, el token del tablero y un código de unión.
- PostgreSQL recibe y conserva sólo SHA-256. El visitante transporta su token en el fragmento `#` de `live.html`, no en la consulta del enlace.
- El snapshot permitido contiene únicamente identidad deportiva visible, handicap, tee, campo, modalidad, torneo, scores, cálculos y tiempos de la ronda.
- Se excluyen teléfono, correo, WhatsApp, contactos, coordenadas, clima detallado, audio, transcripción, conversación AI, credenciales, códigos privados, juegos laterales y valores Q/$.
- Revocar un stream elimina inmediatamente `current_snapshot`; caducidad y estado impiden lecturas posteriores.

### Escala y consistencia

- La Score Card operativa conserva de uno a seis jugadores. El torneo no tiene máximo fijo de grupos o jugadores agregados: se recorre con cursor estable, 25 grupos por vista y hasta 50 por respuesta API.
- Cada persistencia local deja el snapshot más reciente en cola. La publicación usa `client_mutation_id`, revisión esperada y reintento de conflicto, sin “último dispositivo gana” a ciegas.
- La consulta normal es cada tres segundos y devuelve `unchanged` cuando la revisión no cambió.
- `live.html` es sólo lectura y está separado de `index-grupal.html`; no contiene escritor de scores, almacenamiento de ronda, micrófono ni audio.

La migración `database/004_live_scorecards.sql` superó primero una rama temporal de Neon, incluyendo 60 grupos paginados y el filtro real de alcance. Después de la aprobación expresa del propietario se completó en la rama principal. Producción web permanece intacta hasta aprobar toda V352.

### Evidencia temporal V352 · PASS

La migración `1f8793a4-0dad-40a6-8016-b9b183e15b7c` fue creada en `mcp-migration-2026-08-27T21-50-34` (`br-morning-dew-avwpi96x`), hija de `br-late-wind-avhgi9s3`. Se verificaron cuatro tablas LIVE, cero funciones almacenadas, 60 grupos únicos paginados `25/25/10`, filtro de dos jugadores a uno autorizado, primera revisión atómica y reenvío idempotente sin evento adicional. Tras la aprobación expresa, Neon aplicó la migración a `br-late-wind-avhgi9s3` y eliminó la rama temporal. La comprobación final devolvió cuatro tablas, 15 índices, cero funciones LIVE y cero filas de prueba trasladadas.

## V353 — MONITOR GENERAL e INDIVIDUAL mundial

V353 no agrega tablas, columnas, índices ni funciones. Reutiliza exactamente `live_tournaments` y `live_streams`; por ello no requiere migración Neon y su reversión no toca datos ni esquema.

- Un torneo de 80 personas se representa normalmente como 20 streams de cuatro jugadores. Un solo `CAPITÁN DE TARJETA` publica cada grupo; los otros teléfonos miran.
- `live-hub.html` ofrece dos vistas: `MONITOR GENERAL` para todo el torneo y `MONITOR INDIVIDUAL` para cualquier jugador o grupo elegido. La búsqueda, clasificación y los elegidos se resuelven en memoria desde la General, sin lecturas adicionales.
- Un jugador fuera del torneo puede agregarse con su token individual; ésa es la única lectura externa adicional.
- `join_tournament` bloquea la fila del torneo con `FOR UPDATE`, normaliza el nombre de grupo y decide dentro de una sola sentencia CTE. Un segundo stream activo del mismo grupo recibe `LIVE_GROUP_ALREADY_PUBLISHING` y no se incorpora.
- La General es LIVE no oficial hasta el cierre. Muestra posición, grupo, hoyos, Gross, Neto y relación con par; nunca escribe un score.
- El enlace funciona desde cualquier país y puede compartirse con cualquier cantidad de invitados por la hoja nativa del teléfono. El control de acceso sigue siendo posesión del vínculo, vencimiento y revocación; quien recibe el vínculo sólo puede leer.

La prueba local `test-v353-live-hub.mjs` cubre 20×4 y 40×2, 80 jugadores sin omisión ni duplicado, Monitor General más tres jugadores elegidos en el Monitor Individual sin lecturas extra, enlace externo, origen seguro, carga paginada sin máximo fijo, capitán único, privacidad y apertura en ventana separada. Preview, E2E remoto, observabilidad y navegador se registran por separado; la prueba física iPhone no se simula.
