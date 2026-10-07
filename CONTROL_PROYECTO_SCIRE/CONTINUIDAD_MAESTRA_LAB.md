# EPG CADDY · CONTINUIDAD MAESTRA PERMANENTE DE LAB

## Estado V407-R29 · 12 de septiembre de 2026

- Defecto físico: en Tarjeta Universales cerrada, `ENVIAR TARJETA DIGITAL` no abrió ninguna acción.
- Causa raíz: el PNG se generaba de forma asíncrona antes de `navigator.share` y Safari perdía la activación del toque.
- Corrección: PNG preparado al cerrar; compartir se invoca inmediatamente en el toque; estado visible fuera del panel oculto.
- Prueba dirigida `test-v397-card-in-out-back-contract.mjs`: PASS automático. Preview y prueba física iPhone pendientes.


## Relevo V407-R24C recuperación R8 · 9 de septiembre de 2026 · 19:44 Guatemala

- MAIN permanece intacta en `5e45b264da056ed9c4ee5ee61d5e4e05dfc69636`.
- El alias estable `https://golf-sc-gt-lab.vercel.app` mostró físicamente V407-R8; ACTUALIZAR no actuó.
- Causa pública verificada: el middleware devolvía `access.html` para `/service-worker.js` y ambos manifiestos. Corrección local: esos tres recursos de arranque quedan públicos; aplicación, datos y escrituras siguen privados.
- Segundo FAIL físico: `ACTUALIZADO` cubrió `CONTROL MANUAL · UNIVERSALES` durante scroll. Corrección local en `gsc-design-system.css`: sólo el estado inactivo usa posición absoluta; ACTUALIZAR disponible conserva posición fija, verde, habilitada y pulsante.
- Auditoría local antes de reorganizar el transporte: `133/133 PASS`; inventario `450 fuentes + 3 PDF PASS`; Manual `74/74 PASS`.
- Commit remoto `9f32fd75f75������q�^�