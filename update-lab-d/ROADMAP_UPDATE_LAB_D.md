# UPDATE ARCHITECTURE D · BURN-IN LEDGER

Baseline protegida: V407-R33
Commit baseline: 5b85c63438b27fce53e2d0f6aa4e371bffc3c263
Rama: lab/update-architecture-d-burnin

Archivos del laboratorio aislado:
- update-lab-d/release.json
- update-lab-d/update-engine.js
- update-lab-d/update-sw.js
- update-lab-d/harness.html
- update-lab-d/ROADMAP_UPDATE_LAB_D.md

Reglas obligatorias:
1. Ningún archivo funcional de R33 puede modificarse durante el burn-in.
2. Sólo se permiten cambios bajo update-lab-d/ y el gate experimental necesario para imponer estas reglas.
3. Cada ciclo debe conservar estado local y terminar con release activa verificada.
4. Un solo FAIL físico en los primeros cinco ciclos descarta la arquitectura.
5. Producción, Main y baseline/v407-r33-locked permanecen sin cambios.
