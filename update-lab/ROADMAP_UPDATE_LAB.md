# UPDATE ARCHITECTURE C · BURN-IN LEDGER

Baseline protegida: V407-R33
Commit baseline: 5b85c63438b27fce53e2d0f6aa4e371bffc3c263
Rama: lab/update-architecture-c-burnin

## C1-C4 · 10 septiembre 2026

Archivos del laboratorio aislado:
- update-lab/release.json
- update-lab/update-engine.js
- update-lab/update-sw.js
- update-lab/harness.html
- update-lab/ROADMAP_UPDATE_LAB.md

## C7 · acceso público exclusivo al harness del LAB

- middleware.js: permite únicamente el prefijo `/update-lab/` para que el harness, manifest, engine y worker experimentales puedan cargarse sin sesión propietaria dentro de esta rama de burn-in.
- scripts/roadmap-gate.mjs: autoriza `middleware.js` sólo como excepción experimental registrada; cualquier otro archivo fuera de `update-lab/` continúa bloqueado.

Reglas obligatorias:
1. Ningún archivo funcional de R33 puede modificarse durante el burn-in.
2. Sólo se permiten cambios bajo update-lab/, el gate de laboratorio y la excepción documentada middleware.js necesaria para exponer exclusivamente `/update-lab/`.
3. Cada ciclo debe conservar estado local y terminar con release activa verificada.
4. Un solo FAIL en los primeros cinco ciclos descarta la arquitectura; no se promociona a R33.
5. Producción y la rama baseline/v407-r33-locked permanecen sin cambios.
