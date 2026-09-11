# MATRIZ MAESTRA — ACTUALIZADOR INTOCABLE Y ROLLBACK

Estado: BLINDADO EN LAB.
Componente: botón `ACTUALIZAR` / motor `update-client-e.js`.
Motor aprobado: blob SHA `d09314e0294515e6a271e7e1166009a008652b93`.
Ancla conocida buena: commit `c339195569a7f549f99f7f6821942efec70fc95d` · `V407-R40-DIRECT-UPDATE-20260910`.
Producción real: NO TOCAR salvo orden expresa.

## 1. FUNCIÓN APROBADA

El botón ACTUALIZAR debe:
1. consultar `/api/release` sin caché;
2. comparar release anunciado vs release instalado;
3. encender `ACTUALIZAR` sólo si existe una versión distinta;
4. al pulsar, preservar estado de ronda/registro;
5. volver a consultar `/api/release` y abortar si cambió durante la operación;
6. descargar `/app-current-shell.html` sin caché;
7. verificar que el meta `gscg-release` del shell coincida exactamente con `/api/release`;
8. persistir shell + release en `localStorage`;
9. retirar caches/service workers legacy;
10. recargar `index-grupal.html` conservando `source=pwa`;
11. terminar mostrando nueva Rxx + `ACTUALIZADO`.

## 2. CARRETERA ÚNICA PARA PUBLICAR UNA NUEVA Rxx

| Orden | Acción obligatoria | Archivo / sistema | Gate de salida |
|---|---|---|---|
| 1 | Confirmar release estable actual | dominio LAB + iPhone | versión conocida |
| 2 | Cambiar release objetivo y etiqueta visible | `scripts/apply-update-e.mjs` | sólo Rxx cambia |
| 3 | Cambiar release + baseline + fecha | `api/release.js` | coincide con generador |
| 4 | NO tocar motor | `update-client-e.js` | blob SHA exacto |
| 5 | Ejecutar gate fuente | `scripts/update-intocable-gate.mjs source` | PASS |
| 6 | Ejecutar auditoría completa | `audit-project.mjs` | gates PASS |
| 7 | Generar shell | `scripts/apply-update-e.mjs` | PINNED_UPDATE_BUILD PASS |
| 8 | Ejecutar gate post-build | `scripts/update-intocable-gate.mjs built` | shell/API iguales |
| 9 | Esperar deployment | Vercel LAB | READY, aliasError=null |
| 10 | Validar endpoint estable | `/api/release` | HTTP 200 + Rxx correcta |
| 11 | Validar runtime | Vercel logs | 0 errores relevantes |
| 12 | Prueba física iPhone | app instalada | anterior+ACTUALIZAR → nueva+ACTUALIZADO |
| 13 | Guardar evidencia | capturas antes/después | PASS documentado |

## 3. ARCHIVOS INTOCABLES / VARIABLES

### INTOCABLE
- `update-client-e.js`
- `Intocables/ACTUALIZADOR_APROBADO.lock.json`
- `scripts/update-intocable-gate.mjs` (sólo cambia si el propietario autoriza una nueva certificación)

### VARIABLES AUTORIZADAS POR RELEASE
- `scripts/apply-update-e.mjs`: sólo release Rxx y etiqueta visible Rxx.
- `api/release.js`: sólo release, baseline y `publishedAt`.

Cualquier otro cambio para “hacer que actualice” se considera violación del procedimiento.

## 4. CANDADOS TÉCNICOS

El build debe FALLAR si ocurre cualquiera:
- blob SHA del motor distinto de `d09314e0294515e6a271e7e1166009a008652b93`;
- falta alguna pieza crítica del contrato de descarga/verificación/persistencia;
- generador anuncia una Rxx y `/api/release` otra;
- baseline no corresponde a la misma Rxx;
- shell construido no coincide exactamente con el release anunciado;
- shell inválido o demasiado pequeño.

No existe permiso implícito para “arreglar” el gate cambiando el lock. Cambiar lock + motor requiere orden expresa del propietario y reinicia certificación física.

## 5. PROCEDIMIENTO DE ROLLBACK — ECHAR PARA ATRÁS

### Caso A — Violación detectada antes de desplegar
1. DETENER build/promoción.
2. NO modificar el lock para acomodar el fallo.
3. Restaurar `update-client-e.js` exactamente desde el commit conocido bueno `c339195569a7f549f99f7f6821942efec70fc95d`.
4. Restaurar generador/API a la última Rxx físicamente aprobada si fueron alterados incorrectamente.
5. Ejecutar `node scripts/update-intocable-gate.mjs source`.
6. Ejecutar auditoría completa.
7. Regenerar shell.
8. Ejecutar `node scripts/update-intocable-gate.mjs built`.
9. Sólo con PASS volver a desplegar.

### Caso B — Preview roto, todavía no promovido
1. NO promover.
2. Mantener el deployment estable anterior.
3. Revertir commits defectuosos sobre la rama LAB a la última secuencia aprobada.
4. Reconstruir siguiendo la carretera única.
5. Exigir READY + gates PASS antes de nueva prueba.

### Caso C — Deployment LAB promovido y defectuoso
1. Bloquear nuevas pruebas de usuario.
2. Reasignar/promover el último deployment READY físicamente aprobado.
3. Confirmar `/api/release` de la versión restaurada.
4. Confirmar 0 errores runtime relevantes.
5. Abrir iPhone y verificar que la app no perdió ronda/datos.
6. Corregir la rama desde el ancla conocida buena, nunca encima del motor roto.
7. Repetir toda la carretera desde Paso 1.

### Caso D — Motor `update-client-e.js` cambiado accidentalmente
1. Considerar sello INVALIDADO inmediatamente.
2. Restaurar el archivo desde blob/commit conocido bueno.
3. Confirmar blob SHA exacto `d09314e0294515e6a271e7e1166009a008652b93`.
4. Gate `source` PASS.
5. Gate `built` PASS.
6. Si se desea conservar el motor modificado, se requiere orden expresa del propietario y nueva certificación física 5/5 desde cero.

## 6. PROHIBICIONES

- No borrar ni reinstalar la app para actualizar.
- No usar refresh manual como actualización.
- No tocar service worker para forzar un release.
- No mandar previews experimentales al iPhone.
- No promover un deployment BUILDING.
- No declarar PASS sin capturas físicas.
- No confundir `production` del proyecto LAB con Producción real.
- No modificar `update-client-e.js` para subir de R40 a R41, R42, etc.
- No alterar el lock para esconder una violación.

## 7. RESULTADOS FÍSICOS ACUMULADOS

- R36 → R37: PASS.
- R37 → R38: PASS.
- R38 → R39: PASS.
- R39 → R40: PASS.
- Aplicación histórica R35: detecta R40 y muestra ACTUALIZAR; evidencia posterior forma parte de la validación histórica.

## 8. REGLA CORTA IRROMPIBLE

`Rxx GENERADOR + Rxx API` → `MOTOR SHA EXACTO` → `GATE SOURCE PASS` → `AUDITORÍA PASS` → `GENERAR SHELL` → `GATE BUILT PASS` → `VERCEL READY` → `/api/release CORRECTO` → `0 ERRORES` → `PRUEBA IPHONE` → `PASS`.

Si falla cualquier eslabón: NO se continúa; se aplica rollback al último punto físicamente aprobado.
