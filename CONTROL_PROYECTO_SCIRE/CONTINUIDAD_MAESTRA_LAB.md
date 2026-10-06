# EPG CADDY 路 CONTINUIDAD MAESTRA PERMANENTE DE LAB

## Estado V407-R29 路 12 de septiembre de 2026

- Defecto f铆sico: en Tarjeta Universales cerrada, `ENVIAR TARJETA DIGITAL` no abri贸 ninguna acci贸n.
- Causa ra铆z: el PNG se generaba de forma as铆ncrona antes de `navigator.share` y Safari perd铆a la activaci贸n del toque.
- Correcci贸n: PNG preparado al cerrar; compartir se invoca inmediatamente en el toque; estado visible fuera del panel oculto.
- Prueba dirigida `test-v397-card-in-out-back-contract.mjs`: PASS autom谩tico. Preview y prueba f铆sica iPhone pendientes.


## Relevo V407-R24C recuperaci贸n R8 路 9 de septiembre de 2026 路 19:44 Guatemala

- MAIN permanece intacta en `5e45b264da056ed9c4ee5ee61d5e4e05dfc69636`.
- El alias estable `https://golf-sc-gt-lab.vercel.app` mostr贸 f铆sicamente V407-R8; ACTUALIZAR no actu贸.
- Causa p煤blica verificada: el middleware devolv铆a `access.html` para `/service-worker.js` y ambos manifiestos. Correcci贸n local: esos tres recursos de arranque quedan p煤blicos; aplicaci贸n, datos y escrituras siguen privados.
- Segundo FAIL f铆sico: `ACTUALIZADO` cubri贸 `CONTROL MANUAL 路 UNIVERSALES` durante scroll. Correcci贸n local en `gsc-design-system.css`: s贸lo el estado inactivo usa posici贸n absoluta; ACTUALIZAR disponible conserva posici贸n fija, verde, habilitada y pulsante.
- Auditor铆a local antes de reorganizar el transporte: `133/133 PASS`; inventario `450 fuentes + 3 PDF PASS`; Manual `74/74 PASS`.
- Commit remoto `9f32fd75f75痘玘