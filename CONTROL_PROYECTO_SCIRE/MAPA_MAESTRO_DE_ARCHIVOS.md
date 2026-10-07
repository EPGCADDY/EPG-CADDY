# Mapa maestro de todos los archivos · Golf Score Card GT

## R147 · entrada global sin credenciales · 30 septiembre 2026

| Archivos | Función | Protección |
|---|---|---|
| `release.json`, `index-grupal.html`, `service-worker.js` | Identifican R147 y hacen que las instalaciones detecten la versión nueva. | La ruta normal lleva directamente a Registro sin iniciar sesión. |
| `vercel.json`, `middleware.js`, `test-lab-account-gate.mjs` | Mantienen `/`, `/index.html` y `/inicio` en Registro público; el middleware no interpone autenticación general. | La autenticación de invitaciones y permisos por recurso permanece separada de la entrada. |
| `scripts/rebuild-inventory-pdfs.py`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `INVENTARIOS_V311.lock.json` | Generan y sellan inventarios con la etiqueta del release actual. | Gates de hoja de ruta e inventario. |

## R146.1.1 · entrada libre · 30 septiembre 2026

| Archivos | Función | Protección |
|---|---|---|
| `middleware.js`, `access.html` | Las páginas normales abren libremente; `access.html` conserva canje de invitaciones y administración propietaria sólo para emitir/revocar invitaciones de 24 horas. | Ni el panel ni la invitación son requisitos de entrada; los permisos por torneo siguen aplicando. |
| `index-grupal.html`, `guest-access.js` | La Score Card no carga el candado de entrada global; conserva el botón de invitación individual y el aislamiento/caducidad de la sesión invitada de 24 horas. | La exp������q�^�