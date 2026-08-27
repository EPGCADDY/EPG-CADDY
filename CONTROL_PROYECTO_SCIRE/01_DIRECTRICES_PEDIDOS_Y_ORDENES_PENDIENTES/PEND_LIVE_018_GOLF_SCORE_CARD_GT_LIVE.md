# PEND-LIVE-018 · GOLF SCORE CARD GT. LIVE

**Fecha de registro:** 27 de agosto de 2026  
**Versión de ejecución:** V352  
**Estado real:** IMPLEMENTADO Y MIGRACIÓN PRINCIPAL PASS; PREVIEW, NAVEGADOR REAL Y PRUEBA FÍSICA PENDIENTES  
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

## Frases para localizar este pendiente

`Live`, `seguir jugador`, `seguir grupo`, `torneo en vivo`, `Score Card remota`, `enlace privado`, `visitante sin aplicación`, `rondas bilaterales`, `sin límite de grupos`, `PEND-LIVE-018`.
