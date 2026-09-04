# PEND-LIVE-018 · GOLF SCORE CARD GT. LIVE

**Fecha de registro:** 27 de agosto de 2026  
**Versión de ejecución:** V352 + V353 CENTRO LIVE
**Estado real:** V352 IMPLEMENTADO, MIGRACIÓN PRINCIPAL Y PREVIEW E2E PASS; V353 CENTRO LIVE PREVIEW/E2E/OBSERVABILIDAD PASS; INSPECCIÓN VISUAL Y PRUEBA FÍSICA IPHONE PENDIENTES
**Nombre público obligatorio:** `GOLF SCORE CARD GT. LIVE`

## Solicitud del propietario

Permitir que una persona sin la aplicación pueda seguir en vivo la Score Card autorizada de un jugador o de su grupo; abrir el seguimiento en una ventana distinta para no afectar la tarjeta que se está jugando; habilitar seguimiento bilateral entre jugadores en rondas distintas; compartir por enlace privado; y reunir en un torneo todos los grupos necesarios, sin un máximo fijo de grupos o jugadores en el tablero.

## GATE 0 · siete entradas cerradas

| Entrada | Definición V352 |
|---|---|
| Fuente canónica | V351, rama de origen `v334-quality-repair`, commit `a108e42d125a35f78e66ef691b470e4f7548832a`; escritor oficial `persist()` de `index-grupal.html`; base Neon del proyecto Vercel. |
| Alcance exacto | Publicar una ronda activa por jugador o grupo autorizado; visor web de sólo lectura sin instalación; torneo paginado; enlace, código de unión, caducidad, revocación, cola offline y seguimiento separado. |
| Aceptación medible | Contrato de pruebas de esta especificación y `test-v352-live.mjs`, más integración Neon aislada, navegador real y Preview READY. |
| Referencias | `PEND-NUB-011`, `DATABASE_ARCHITECTURE.md`, escritor único de scores y directrices GATE 0. |
| Riesgos conocidos | Exposición de jugadores no autorizados; filtración de contactos/ubicación/audio/apuestas; enlaces copiados; enlace huérfano al cambiar de ronda; colisión de publicaciones; interrupción de red; lectura masiva; afectar la tarjeta activa. |
| Plan de prueba | Unitario, contrato estático, migración Neon temporal, 60 grupos simulados paginados, filtro real de jugadores, offline/reconexión, navegador móvil/escritorio, Preview y regresión integral. |
| Reversión | Producción permanece intacta. Revocar enlaces; revertir V352; retirar únicamente las tablas nuevas desde una rama respaldada si fuera necesario. Nunca alterar los datos V351 para revertir LIVE. |

## Sistema aprobado para implementar

1. Quien lleva la Score Card elige `JUGADOR LIVE` o `GRUPO LIVE`.
2. Cada jugador visible, o su responsable autorizado cuando corresponda, debe quedar confirmado antes de crear el enlace.
3. El servidor crea dos capacidades independientes de 256 bits: una secreta para publicar y otra para mirar. Sólo se guardan sus huellas SHA-256.
4. El visitante recibe `live.html#stream=…` o `live.html#tournament=…`; el secreto queda en el fragmento del navegador, no en la consulta URL, y el visitante no necesita cuenta ni aplicación.
5. El visor consulta cada tres segundos, conserva en pantalla la última actualización si se pierde señal y no contiene ninguna operación para escribir scores.
6. La publicación parte únicamente de `persist()`; no se crea otro motor. El servidor vuelve a filtrar los jugadores permitidos en cada actualización.
7. Un torneo entrega enlace privado de tablero y código de unión. Cada grupo crea y autoriza su propio LIVE antes de incorporarse.
8. El tablero carga páginas de 25 grupos, con API de hasta 50 por página y cursor estable. No existe un máximo fijo de producto para grupos o jugadores agregados; cada tarjeta actual conserva el límite operativo existente de uno a seis jugadores.
9. Seguir a otra persona siempre abre `live.html` en otra ventana del mismo origen. La Score Card en curso permanece abierta y no se modifica.
10. Todo enlace caduca, puede revocarse y queda sujeto a control de frecuencia. Un enlace conservado de otra ronda debe revocarse antes de crear el de la ronda nueva.

## Datos permitidos y prohibidos

**Permitidos:** nombre deportivo mostrado en la tarjeta, handicap, marca, campo, modalidad, torneo, hoyos, par, Gross, Neto, relación con par, puntos Stableford, estado y horas de actualización.

**Prohibidos:** teléfono, WhatsApp, correo, código privado, contactos, coordenadas, clima detallado, audio, transcripción, micrófono, conversación AI, credenciales, juegos laterales, apuestas, valores Q/$ y datos de otras rondas.

## Criterios obligatorios de aceptación

- Un visitante abre el enlace sin instalar ni iniciar sesión y sólo puede leer.
- El visor normal refleja una actualización en un máximo objetivo de cinco segundos; la cadencia implementada es de tres segundos.
- `JUGADOR LIVE` nunca expone a otro integrante aunque el cliente intente enviarlo.
- `GRUPO LIVE` exige autorización coincidente de todos los jugadores incluidos.
- Caducidad y revocación devuelven un estado terminal y eliminan el snapshot al revocar la ronda.
- Una publicación repetida con el mismo `client_mutation_id` es idempotente; una revisión obsoleta se recupera sin sobrescribir a ciegas.
- Sin señal, la tarjeta local sigue operando y conserva sólo el snapshot pendiente más reciente para reintento.
- Dos jugadores pueden seguirse bilateralmente en ventanas distintas sin cambiar el escritor, hoyo ni Score Card activa.
- Un torneo con al menos 60 grupos simulados se consulta en varias páginas sin omisiones, duplicados ni límite fijo de producto.
- No aparece el nombre histórico interno en `live.html`, `live-view.js` ni la interfaz pública de `live-control.js`.
- No se incluyen los datos prohibidos y el visitante no dispone de localStorage, sessionStorage, audio, micrófono ni acciones de publicación.
- Todos los controles del proyecto, ROADMAPS, mapa e inventario aprueban; después aprueban navegador real y Preview. Producción no cambia sin cero `FAIL` y aprobación expresa.

## Archivos funcionales V352

- `index-grupal.html`
- `live-control.js`
- `live.html`
- `live-view.js`
- `api/live.js`
- `database/004_live_scorecards.sql`
- `service-worker.js`
- `vercel.json`
- `test-v352-live.mjs`

## Evidencia Neon aislada y principal

- Migración preparada: `1f8793a4-0dad-40a6-8016-b9b183e15b7c`.
- Rama temporal: `mcp-migration-2026-08-27T21-50-34` / `br-morning-dew-avwpi96x`.
- Rama principal aplicada: `br-late-wind-avhgi9s3`.
- Esquema: cuatro tablas LIVE presentes, índices activos y cero funciones almacenadas LIVE.
- Escala: 60 grupos únicos recorridos en tres páginas de 25, 25 y 10.
- Privacidad: un snapshot de dos jugadores enviado a un stream de jugador dejó exactamente uno visible y `leaked_second_player=false`.
- Consistencia: primera publicación aceptada en revisión 1; reenvío del mismo `client_mutation_id` devolvió `duplicate=true` y creó cero eventos nuevos.
- Aplicación principal: el propietario confirmó la migración; Neon la completó correctamente y eliminó la rama temporal.
- Verificación principal: cuatro tablas LIVE, 15 índices, cero funciones almacenadas LIVE y cero filas de prueba trasladadas.

## Evidencia Preview V352-R2

- `dpl_3fmsfq4BjuFzMgV3eYKGvPRWzSff` quedó `READY` desde la rama `v352-live`, commit `79398de6ef38939db757618a6dcbc1cc99846db2`.
- Crear stream y leer revisión 0 aprobaron contra Neon principal.
- La primera publicación remota reveló `42P18`: el driver HTTP parametrizó por separado valores usados dentro del registro JSON y PostgreSQL no pudo inferir su tipo.
- V352-R2 declara explícitamente los tipos de `mutationId`, `secretHash` y `expected` en toda la sentencia atómica; `test-v352-live.mjs` impide reintroducir parámetros indeterminados.
- El stream de diagnóstico se revoca y elimina antes de la repetición. Producción web permanece intacta.
- V352-R2 quedó `READY` en `dpl_2BLAFZNazoogdQQS2mkxreNjBgh6`, commit `6bc9901e068cf8f2026de6b0ab8580c2546819f5`.
- Recorrido remoto final PASS: página `200`, crear `200`, leer revisión 0 `200`, publicar `200`, leer Gross 5/Neto 4 `200`, revocar `200` y lectura posterior `410 LIVE_REVOKED`.
- Observabilidad R2: cinco respuestas `200`, una `410` esperada y cero logs `error`/`fatal`.
- Limpieza final: cero streams `round-v352-preview-%` en Neon principal.
- El navegador automatizado fue redirigido por la protección de Vercel antes de cargar la app; esto no se presenta como PASS visual. La prueba física utiliza el enlace temporal protegido entregado al propietario.

## Frases para localizar este pendiente

`Live`, `seguir jugador`, `seguir grupo`, `torneo en vivo`, `Score Card remota`, `enlace privado`, `visitante sin aplicación`, `rondas bilaterales`, `sin límite de grupos`, `PEND-LIVE-018`.

## V353 · escenario de 80 jugadores y dos monitores universales

### Solicitud nueva del propietario · 28 de agosto de 2026

Un torneo reúne 80 jugadores y entre 30 y 40 teléfonos usan la aplicación. El propietario quiere conservar su Score Card activa y elegir entre dos vistas separadas y simples: `1 · MONITOR GENERAL` para todo el torneo y `2 · MONITOR INDIVIDUAL` para cualquier jugador o grupo. La operación debe ser comprensible para un niño de diez años.

### GATE 0 · siete entradas V353

| Entrada | Definición cerrada |
|---|---|
| Fuente canónica | rama `v352-live`, commit remoto V353 `8cc3600d25cba7185a55548104cac609b341117c`, API y modelo LIVE V352 ya migrados y comprobados. |
| Alcance exacto | `CENTRO LIVE` separado con Monitor General, Monitor Individual, búsqueda de jugadores, importación por enlace como respaldo y una sola publicación por grupo. |
| Aceptación medible | 80 jugadores visibles sin omisión ni duplicado; cambio claro entre Monitor General e Individual; cero escritura; actualización 3–5 s; ronda propia intacta; conexión explicable en cuatro acciones. |
| Referencias | esta especificación, `DATABASE_ARCHITECTURE.md`, `live-control.js`, `live-view.js`, `api/live.js` y la prueba V352 comprobada. |
| Riesgos conocidos | tarjetas duplicadas por dos publicadores del mismo grupo, demasiadas consultas, filtración de tokens, favoritos huérfanos, pérdida de señal, mezclar General con tarjeta activa. |
| Plan de prueba | 20 grupos × 4 jugadores y 40 grupos × 2 jugadores; paginación; duplicado de grupo; Monitor General + tres jugadores elegidos; importación; offline; privacidad; navegador móvil/escritorio; Preview y observabilidad. |
| Reversión | retirar únicamente los archivos y controles V353; la base V352 no requiere tabla nueva; revocar enlaces; Producción permanece en `0dc1ba7a62b6bd6aec92752c539ca641cf950e26`. |

### Arquitectura amigable aprobada para construir

1. Existe **una sola Score Card que publica por grupo**. Si cuatro personas usan la aplicación dentro del mismo grupo, una es `CAPITÁN DE TARJETA`; las otras miran. El servidor bloquea que dos publicaciones activas ocupen el mismo nombre de grupo dentro del torneo.
2. El organizador comparte **un solo enlace GENERAL**. Al abrirlo, el visitante toca `ABRIR EN CENTRO LIVE`; el token queda en el fragmento y después se limpia de la barra.
3. `CENTRO LIVE` consulta la General una vez y arma localmente la lista completa. Los jugadores elegidos para el Monitor Individual reutilizan esa misma respuesta y no producen consultas adicionales.
4. El usuario elige `1 · MONITOR GENERAL` o `2 · MONITOR INDIVIDUAL`. En la General escribe un nombre y toca `+ SEGUIR`; el Centro abre ese jugador en el Monitor Individual y lo recuerda únicamente en ese dispositivo.
5. Si una persona no pertenece a la General, su enlace privado se puede importar una sola vez como respaldo. El Centro sólo llama `read`; nunca publica, corrige, usa micrófono ni toca la Score Card activa.
6. La General muestra posición LIVE, jugador, grupo, hoyos jugados, Gross, Neto y relación con par. Se rotula como resultado vivo no oficial hasta el cierre.
7. El Centro abre siempre en otra ventana. En iPhone se alterna entre `MI SCORE CARD` y `CENTRO LIVE`; en iPad/computadora pueden verse simultáneamente.
8. `COMPARTIR ♾️` usa la hoja normal del teléfono para WhatsApp, Mensajes, correo, AirDrop, X u otra aplicación. El mismo enlace funciona en USA, México, Italia o cualquier país y no fija un máximo de invitados; su vencimiento, revocación y sólo lectura permanecen obligatorios.

### Prueba obligatoria del escenario

- 80 jugadores en 20 grupos de cuatro y 80 jugadores en 40 grupos de dos.
- Páginas sin omisiones, duplicados ni máximo fijo de producto.
- Monitor General más tres jugadores elegidos de tres streams diferentes.
- Cero consultas extra para jugadores del Monitor Individual encontrados dentro de la General.
- Rechazo del segundo publicador con el mismo grupo normalizado.
- Orden General estable y empates reproducibles.
- Enlace importado eliminado del fragmento después de guardarse.
- Favorito revocado/caducado visible como no disponible, sin borrar los demás.
- Sin señal: conserva la última General y las últimas tarjetas visibles.
- Un visitante sin aplicación puede seguir mirando sin cuenta.
- La Score Card propia conserva ronda, hoyo, modalidad, scores y escritor oficial.

V353 sólo puede llamarse `100 % automático aprobado` después de superar todos los bancos, Preview, E2E, observabilidad y navegador. El `PASS físico iPhone` continúa siendo una puerta independiente y no se simula.

## V372 · espejo LIVE de Stableford · 4 de septiembre de 2026

Cuando la ronda publicada es Stableford, el invitado recibe la misma estructura deportiva de la tarjeta activa: encabezado HOYO, PAR y YDS; dos filas por jugador, GROSS y PUNTOS; y resumen exclusivo de puntos. Queda prohibido mostrar NETO, relación con par o RESULTADO dentro de esa vista Stableford. El resumen conserva el orden solicitado por el propietario: `GROSS IN`, `GROSS OUT`, `GROSS TOTAL`, `PUNTOS IN`, `PUNTOS OUT`, `PUNTOS TOTAL`. IN corresponde a hoyos 1–9 y OUT a hoyos 10–18. General, Match Play y Four Ball conservan su visor anterior sin cambios.

El snapshot LIVE incorpora únicamente el yardaje deportivo ya visible en la tarjeta; no agrega información privada. `test-v372-stableford-live-mirror.mjs` bloquea NETO/RESULTADO en Stableford, exige IN antes de OUT y prueba la frontera negativa de las demás modalidades.

### Evidencia Preview V353 · 28 de agosto de 2026

- Commit remoto: `8cc3600d25cba7185a55548104cac609b341117c`; deployment Preview `dpl_2g6KPHDjaWbXuRfR8Ky88ai2U24F`; URL protegida sin token: `https://epg-caddy-3f7wac1g1-epgcaddys-projects.vercel.app`.
- Build `READY`: `PROJECT_QUALITY_GATE`, Manual editorial/visual, ROADMAP, inventario de 359 fuentes, V352, V353 y auditoría maestra de 95 paquetes PASS.
- E2E remoto PASS: 20 grupos, 80 jugadores, tres páginas de siete/siete/seis, cero omisiones o duplicados y tres selecciones del Monitor Individual reutilizadas desde la General.
- Un enlace individual externo cargó cuatro jugadores; una publicación cambió de revisión 0 a 1 y el Monitor General recibió Gross 3 en el hoyo 1.
- El segundo capitán del mismo grupo normalizado recibió `409 LIVE_GROUP_ALREADY_PUBLISHING`; después de revocar, la General recibió `410 LIVE_REVOKED`.
- Observabilidad de las dos ejecuciones: 103 respuestas `200`, dos `409` esperadas, una `410` esperada y cero logs `error`/`fatal`.
- Limpieza verificada directamente en Neon: cero streams de prueba activos, cero snapshots de prueba retenidos y cero torneos de prueba activos.
- La inspección visual del navegador protegido no se simula ni se marca PASS. Producción continúa exactamente en `0dc1ba7a62b6bd6aec92752c539ca641cf950e26`; el iPhone físico permanece como puerta independiente.
