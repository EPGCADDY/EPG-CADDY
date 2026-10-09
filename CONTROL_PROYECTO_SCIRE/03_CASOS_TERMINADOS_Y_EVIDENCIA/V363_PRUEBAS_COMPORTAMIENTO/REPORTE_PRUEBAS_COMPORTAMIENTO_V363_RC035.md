# V363 · pruebas de comportamiento móvil · RC-035

**Fecha:** 28 de agosto de 2026  
**Candidato:** `V363-RECORDED-MOBILE-BEHAVIOR-20260828`  
**Producción:** intacta en `0dc1ba7a62b6bd6aec92752c539ca641cf950e26`  
**Veredicto vigente:** corrección automática PASS; Preview y repetición física iPhone pendientes.

## Evidencia física que rechazó V362

| Evidencia | Resultado observado | SHA-256 |
|---|---|---|
| `RC035_IMG_2168_LIVE_SAFE_AREA_FAIL.png` | LIVE invadió la zona del estado iOS. | `417888099ed74f510f9d858ddf4f9461c566c052d3ba45ac6168523fb62bfb85` |
| `RC035_IMG_2169_MIC_OVERLAYS_FAIL.png` | Accesos flotantes y `INSTALAR APP` se superpusieron al Registro; el micrófono quedó visualmente en `ESCUCHANDO`. | `c50c59c3f11b999f1e4c82e4161b77c46ac746f51c18258e472497263d5b2898` |

## Causa y corrección

| Rubro | Causa encontrada | Control V363 |
|---|---|---|
| LIVE | La regla móvil sustituía el padding por `0`. | Padding superior/inferior con `env(safe-area-inset-*)`, `100dvh` y contención de overscroll. |
| Accesos flotantes | Los lanzadores globales seguían fijos durante Registro y LIVE. | Clases `gsc-setup-open` / `gsc-live-open`; los lanzadores se ocultan mientras el modal está activo. |
| Instalar App | El botón era fijo y no conocía el estado del Registro. | `showInstallControl()` bloquea el botón durante Registro/LIVE. |
| Micrófono | El watchdog llamaba `recognition.stop()`, pero dependía de que Safari emitiera `onend`. | Guard independiente de 1.2 s; finaliza el estado aunque `stop()` no produzca `onend`. |

## Batería ejecutada

| Prueba | Escenario | Resultado |
|---|---|---|
| `Intocables/intocables-gate.mjs` | Ronda viva, Match Play, Normal y controles requeridos. | PASS `INT-01…INT-04`. |
| `test-v363-intocables-behavior.mjs` | Persistencia canónica y reporte Match con nombres. | PASS. |
| `test-v363-recorded-mobile-behavior.mjs` | Transporte Safari simulado: acepta `stop()` y nunca emite `onend`; aislamiento modal y safe area. | PASS: `ESCUCHANDO` → `RESPONDIENDO` → liberado por guard. |
| `test-v362-physical-voice-recovery.mjs` | No regresión de un toque, Cedar/Onyx, watchdog y cierre hablado. | PASS. |
| `audit-project.mjs` | Regresión integral, Manual 74/74, ROADMAPS e inventario. | Debe constar PASS final después del último sello del candidato. |

## Grabación

`PRUEBA_COMPORTAMIENTO_V363_RC035.mp4` dura 15 segundos y conserva las dos entradas físicas FAIL más la transición automática controlada. SHA-256: `13b6ef59455346f3cc26cbaf0fcac2dd87f6463df1d072f1935af49e0933cd94`.

La grabación automática no se presenta como prueba física: el entorno de ejecución bloqueó Chrome por `socket() EPERM`. Por eso el video identifica expresamente la simulación y mantiene abierta la comprobación en Safari/iPhone real. El póster verificado tiene SHA-256 `c69f8a7f9130c1c7f1105c7b8c37cdc76156f2c04b7f79db496b40832c3ca87d`.

## Criterio de cierre

RC-035 sólo se cierra cuando el nuevo Preview confirme en iPhone: LIVE debajo de la zona segura, cero accesos flotantes sobre Registro, cero botón de instalación superpuesto y salida de `ESCUCHANDO` en un máximo de 19.2 segundos cuando no llega voz. Hasta entonces no existe aprobación física ni autorización de Producción.
