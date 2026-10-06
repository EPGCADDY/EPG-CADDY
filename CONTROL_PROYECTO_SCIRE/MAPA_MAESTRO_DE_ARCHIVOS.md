# Mapa maestro de todos los archivos 路 Golf Score Card GT

## R147 路 entrada global sin credenciales 路 30 septiembre 2026

| Archivos | Funci贸n | Protecci贸n |
|---|---|---|
| `release.json`, `index-grupal.html`, `service-worker.js` | Identifican R147 y hacen que las instalaciones detecten la versi贸n nueva. | La ruta normal lleva directamente a Registro sin iniciar sesi贸n. |
| `vercel.json`, `middleware.js`, `test-lab-account-gate.mjs` | Mantienen `/`, `/index.html` y `/inicio` en Registro p煤blico; el middleware no interpone autenticaci贸n general. | La autenticaci贸n de invitaciones y permisos por recurso permanece separada de la entrada. |
| `scripts/rebuild-inventory-pdfs.py`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `INVENTARIOS_V311.lock.json` | Generan y sellan inventarios con la etiqueta del release actual. | Gates de hoja de ruta e inventario. |

## R146.1.1 路 entrada libre 路 30 septiembre 2026

| Archivos | Funci贸n | Protecci贸n |
|---|---|---|
| `middleware.js`, `access.html` | Las p谩ginas normales abren libremente; `access.html` conserva canje de invitaciones y administraci贸n propietaria s贸lo para emitir/revocar invitaciones de 24 horas. | Ni el panel ni la invitaci贸n son requisitos de entrada; los permisos por torneo siguen aplicando. |
| `index-grupal.html`, `guest-access.js` | La Score Card no carga el candado de entrada global; conserva el bot贸n de invitaci贸n individual y el aislamiento/caducidad de la sesi贸n invitada de 24 horas. | La exp痘玘