# UPDATE ARCHITECTURE E · iOS-FIRST LEDGER

Baseline protegida: V407-R33
Commit baseline: 5b85c63438b27fce53e2d0f6aa4e371bffc3c263
Rama: lab/update-architecture-e-ios-first

Arquitectura:
- Detección de release por /api/release fuera del Service Worker.
- Cache-Control no-store/no-cache para verdad de servidor.
- El lifecycle del Service Worker no es requisito para detectar ni activar una actualización.
- Navegación/recarga con cache-busting y verificación posterior.
- service-worker.js se usa sólo como puente de migración R33→E: retira caches antiguos y luego se desregistra.
- El HTML E se transforma sólo durante build mediante scripts/apply-update-e.mjs; la baseline R33 en Git no se reescribe.
- update-client-e.js reemplaza el listener del botón ACTUALIZAR después de cargar el HTML, consulta /api/release y preserva estado antes de recargar.
- /api/release y /update-client-e.js son los únicos recursos nuevos públicos necesarios para que la actualización no dependa de una sesión que pueda estar en transición.
- Todo recurso mutable del shell JavaScript/CSS debe servirse con no-store/must-revalidate; sólo los assets explícitamente versionados pueden permanecer immutable.

Archivos autorizados:
- api/release.js
- middleware.js
- service-worker.js
- vercel.json
- scripts/apply-update-e.mjs
- update-client-e.js
- index-grupal.html
- update-lab-e/ROADMAP_UPDATE_LAB_E.md
- scripts/roadmap-gate.mjs

Reglas:
1. Producción, Main y baseline/v407-r33-locked permanecen intactos.
2. No se solicita prueba física al usuario hasta completar pruebas técnicas y regresión LAB sin fallos.
3. Cualquier archivo adicional debe registrarse aquí antes o en el mismo cambio que lo introduce.
4. Arquitecturas C y D quedan descartadas y no se reutiliza su lifecycle waiting/installing como condición crítica.
5. middleware.js sólo puede exponer /api/release y /update-client-e.js para esta rama LAB E; no se alteran los controles de acceso restantes.
6. El worker de migración sólo puede borrar caches cuyo nombre empiece por gscg-mobile-; no toca localStorage, IndexedDB ni datos de ronda.
7. El parche de build debe abortar si no encuentra exactamente un meta gscg-release y un cierre </body>; no puede publicar una transformación parcial.
8. El HTML principal y todos los módulos mutables del shell deben revalidarse/no almacenarse para impedir mezcla de versiones después de retirar el Service Worker.
