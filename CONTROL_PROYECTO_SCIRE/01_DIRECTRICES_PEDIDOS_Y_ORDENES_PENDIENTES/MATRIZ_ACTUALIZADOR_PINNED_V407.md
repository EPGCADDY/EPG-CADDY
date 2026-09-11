# MATRIZ CANÓNICA — ACTUALIZADOR PINNED V407

Estado: CANDIDATO A SELLO · 4/5 pruebas físicas consecutivas PASS.
Canal autorizado: LAB `lab/update-architecture-e-ios-first`.
Producción real: INTOCABLE.

# 1. OBJETIVO PRINCIPAL

Esta matriz existe para dejar documentado, de forma reproducible y obligatoria, **cómo publicar correctamente una nueva versión sin romper el botón ACTUALIZAR**.

La regla maestra es:

> El motor del actualizador NO se modifica para publicar una nueva versión. Solo se cambia la versión objetivo en los dos puntos autorizados, se construye, se valida, se promueve en LAB y luego se prueba físicamente en iPhone.

# 2. COMPONENTES Y RESPONSABILIDAD

## INTOCABLE / MOTOR

### `update-client-e.js`
Es el motor canónico del botón ACTUALIZAR.
Responsabilidades:
- consulta `/api/release`;
- detecta si existe una versión distinta a la instalada;
- cambia el estado visual entre `ACTUALIZADO` y `ACTUALIZAR`;
- descarga `/app-current-shell.html` sin caché;
- verifica que el release descargado coincida exactamente con el release anunciado;
- guarda el nuevo shell y release en `localStorage`;
- retira workers/cachés legacy;
- recarga `index-grupal.html` para arrancar con el shell recién instalado.

**REGLA:** este archivo no debe modificarse al publicar R41, R42, R43, etc. Cualquier cambio requiere orden expresa y reinicia la certificación del actualizador.

## VARIABLE / PUBLICACIÓN DE VERSIÓN

### `scripts/apply-update-e.mjs`
Genera el shell que será instalado.
Para una nueva versión solo debe cambiar:
- `release='V407-Rxx-DIRECT-UPDATE-20260910'`;
- texto visible `V407 · Rxx`.

Debe seguir produciendo:
- `app-current-shell.html`;
- `index-grupal.html` loader;
- Service Worker retirement-only.

Build obligatorio:
`PINNED_UPDATE_BUILD PASS release=V407-Rxx-DIRECT-UPDATE-20260910`

### `api/release.js`
Es el anuncio oficial de la versión disponible.
Debe coincidir exactamente con el shell generado:
- `release:'V407-Rxx-DIRECT-UPDATE-20260910'`;
- `baseline:'V407-Rxx'`.

**REGLA CRÍTICA:** si `scripts/apply-update-e.mjs` dice R40 y `/api/release` todavía dice R39, el botón no puede operar correctamente. Ambos deben avanzar juntos.

# 3. PROCEDIMIENTO CORRECTO PARA PUBLICAR UNA NUEVA ACTUALIZACIÓN

## PASO 1 — Confirmar versión actual estable
Antes de cambiar nada:
- verificar qué Rxx está realmente estable en `https://golf-sc-gt-lab.vercel.app/api/release`;
- verificar qué Rxx muestra físicamente el iPhone;
- no asumir versiones por commits o previews.

## PASO 2 — Crear la siguiente versión
Ejemplo R40 → R41.
Modificar exclusivamente:

1. `scripts/apply-update-e.mjs`
   - `V407-R40...` → `V407-R41...`;
   - `V407 · R40` → `V407 · R41`.

2. `api/release.js`
   - release R40 → R41;
   - baseline R40 → R41;
   - actualizar `publishedAt`.

No tocar `update-client-e.js`.
No tocar producción real.

## PASO 3 — Esperar preview LAB
El commit debe generar deployment preview del proyecto `golf-sc-gt-lab`.

No promover mientras esté `BUILDING`.
No mandar al usuario a probar un preview experimental.

## PASO 4 — Validar build antes de promover
Exigir como mínimo:
- deployment `READY`;
- `PINNED_UPDATE_BUILD PASS` con la Rxx correcta;
- `PROJECT_QUALITY_GATE PASS`;
- `INTOCABLES PASS`;
- sin rollback ni alias error;
- sin errores runtime relevantes.

Si cualquiera falla: NO promover.

## PASO 5 — Promover únicamente el deployment validado
Promover a `production` **dentro del proyecto LAB `golf-sc-gt-lab`**.
Esto NO significa producción real de EPG CADDY.

El deployment promovido puede reconstruirse. Esperar nuevamente a `READY`.

## PASO 6 — Validar el dominio estable LAB
Antes de tocar el iPhone, comprobar:

`https://golf-sc-gt-lab.vercel.app/api/release`

Debe responder:
- HTTP 200;
- `release = V407-Rxx-DIRECT-UPDATE-20260910`;
- `baseline = V407-Rxx`;
- cache-control no-store/no-cache.

Si el dominio estable sigue anunciando la versión anterior: NO probar todavía.

## PASO 7 — Validar runtime
Revisar errores/fatales del deployment promovido.
Criterio esperado: 0 errores relevantes del actualizador.

## PASO 8 — Prueba física en iPhone
Solo ahora se solicita intervención física.

Estado inicial obligatorio:
- la app instalada muestra `V407 · R(n)`;
- el botón muestra `ACTUALIZAR` iluminado.

Acción:
- pulsar ACTUALIZAR una sola vez.

Resultado obligatorio:
- cambia a `V407 · R(n+1)`;
- botón queda `ACTUALIZADO`;
- no borrar app;
- no reinstalar;
- no limpiar datos;
- no refrescar manualmente;
- no usar enlaces alternos.

## PASO 9 — Evidencia
Guardar evidencia física:
- captura antes: versión anterior + ACTUALIZAR;
- captura después: versión nueva + ACTUALIZADO.

Marcar PASS solo si ambas capturas corresponden al mismo ciclo y la transición es exacta.

# 4. ERRORES QUE NO SE DEBEN REPETIR

- Cambiar shell Rxx pero olvidar `/api/release`.
- Promover un preview antes de que esté READY.
- Probar físicamente antes de confirmar el dominio estable.
- Modificar `update-client-e.js` para cada release.
- Usar service worker como mecanismo principal de actualización.
- Pedir reinstalar o borrar la app.
- Enviar versiones experimentales al iPhone.
- Confundir `production` del proyecto LAB con producción real.
- Declarar PASS sin evidencia física antes/después.

# 5. CERTIFICACIÓN 5/5

| Prueba | Transición | Evidencia física | Resultado |
|---|---|---|---|
| 1/5 | R36 → R37 | R36 + ACTUALIZAR → R37 + ACTUALIZADO | PASS |
| 2/5 | R37 → R38 | R37 + ACTUALIZAR → R38 + ACTUALIZADO | PASS |
| 3/5 | R38 → R39 | R38 + ACTUALIZAR → R39 + ACTUALIZADO | PASS |
| 4/5 | R39 → R40 | R39 + ACTUALIZAR → R40 + ACTUALIZADO | PASS |
| 5/5 | R40 → R41 | PENDIENTE | PENDIENTE |

# 6. CONDICIÓN DE SELLO

Cuando la prueba 5/5 sea PASS:

1. declarar `update-client-e.js` baseline aprobado;
2. registrar su SHA exacto;
3. marcarlo como componente INTOCABLE;
4. añadir prueba de regresión que compare su SHA en cada build;
5. permitir futuras publicaciones únicamente modificando versión/release en los dos puntos autorizados;
6. cualquier modificación del motor invalida el sello y obliga a nueva serie de certificación.

# 7. REGLA OPERATIVA CORTA

Para cada nueva Rxx:

**CAMBIAR Rxx EN GENERADOR + CAMBIAR Rxx EN `/api/release` → BUILD PASS → PREVIEW READY → PROMOVER LAB → PROMOVIDO READY → `/api/release` 200 Y Rxx CORRECTA → 0 ERRORES → PRUEBA iPHONE → PASS.**
