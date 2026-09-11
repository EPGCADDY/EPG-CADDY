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

Archivos autorizados:
- api/release.js
- middleware.js
- service-worker.js
- index-grupal.html
- update-client-e.js
- vercel.json
- scripts/apply-update-e.mjs
- update-lab-e/ROADMAP_UPDATE_LAB_E.md
- scripts/roadmap-gate.mjs

Reglas:
1. Producción, Main y baseline/v407-r33-locked permanecen intactos.
2. No se solicita prueba física al usuario hasta completar pruebas técnicas y regresión LAB sin fallos.
3. Arquitecturas C y D quedan descartadas.
4. El worker de migración sólo puede borrar caches cuyo nombre empiece por gscg-mobile-; no toca localStorage, IndexedDB ni datos de ronda.
5. index-grupal.html debe usar el R33 real antes de cualquier prueba física.
