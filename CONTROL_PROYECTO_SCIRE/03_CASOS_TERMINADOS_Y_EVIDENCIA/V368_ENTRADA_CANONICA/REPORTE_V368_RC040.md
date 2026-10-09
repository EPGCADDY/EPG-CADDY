# V368 · RC-040 · entrada web canónica

**Fecha:** 29 de agosto de 2026  
**Base sincronizada:** `fix-v366-integrated-main` · `03ca12e5fb81aa3252cc66836974747ae3c9c6e5`  
**Estado:** candidato; Producción no modificada por V368.

## Evidencia del defecto

- `IMG_2197.jpeg` y `IMG_2199.png`: el enlace web abrió directamente `RONDA EN CURSO` con una tarjeta persistida.
- Navegador Chromium móvil con Match Play válido guardado: `openSetup()` produjo `Cannot access 'standaloneApp' before initialization` antes de agregar `.visible`.
- Las ramas contemporáneas estaban divergidas; `fix-v366-integrated-main` contenía la línea funcional más reciente, pero su banco V366 exigía que una tarjeta válida dominara `inicio=1`.

## Corrección

- `explicitNewRound || directHome` abre Registro sin borrar la ronda.
- `standaloneApp` se inicializa antes de cualquier llamada a `openSetup()`.
- `/`, `/index.html` y `/inicio` continúan redirigiendo a `?inicio=1`.
- `manifest.webmanifest` conserva `?source=pwa`, por lo que el acceso instalado reabre la tarjeta viva.

## Evidencia automática

- Chromium móvil: Registro visible, `gsc-setup-open=true`, ronda `match_play` conservada, Gross 4 conservado y botón ATRÁS disponible.
- `test-v368-canonical-home-entry.mjs`: separa entrada web y reapertura PWA.
- Auditoría maestra local: `PASS`, 114/114 paquetes; incluye Registro, score individual y multihoyo, Match Play OUT/IN/TOTAL, persistencia, LIVE y AI UNIVERSAL en la misma pantalla.
- Inventario, ROADMAP, calidad del proyecto e Intocables: `PASS` con sello `V368-CANONICAL-HOME-ENTRY-OIDC-INTOCABLES`.
- El Preview debe corresponder exactamente a este árbol y superar la verificación externa antes de la prueba física.

## Puerta pendiente

El iPhone físico debe confirmar: enlace web → Registro; app instalada cerrada/reabierta → tarjeta viva; micrófono, multihoyos, acumulado Match, AI UNIVERSAL audible sin pantalla y LIVE. Un solo FAIL mantiene V368 fuera de Producción.
