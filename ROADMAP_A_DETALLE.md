# ROADMAP A DETALLE

## R176 · 6 octubre 2026 · Audio de resultado par como EVEN

- El formateador de resultados hablados anuncia `EVEN` cuando el resultado relativo al par es cero; conserva “sobre par” y “bajo par” para valores distintos de cero.
- Actualiza identidad de caché PWA y release a `20261006-R176` para que ACTUALIZAR entregue la pantalla nueva.
- Regresión en `test-lab-player-points-audio.mjs`: ejecuta el formateador real y comprueba EVEN, +1 y −1.
- Alcance: `index-grupal.html`, `service-worker.js`, `release.json`, prueba dirigida y ambos ROADMAPS. Producción queda intacta.



## R174 · 6 octubre 2026 · Recuperación de Scores de torneo federado en LAB

- Reproducción física desde Organizador en LAB: la ficha Santa delfina enlazó a `directory_production_36c43fd8-594e-40e3-af6d-13bfd1863f20`; el monitor quedó en `NO SE PUDO COMPROBAR TU PARTICIPACIÓN · REINTENTA` y `NINGÚN TORNEO EN CURSO`.
- Causa: `live-hub.js` esperaba que `GSCPersonalEvents.sync()` terminara correctamente antes de procesar `directoryEvent`. Un fallo de participación local abortaba el arranque aunque el torneo federado estuviera disponible.
- Corrección mínima: la sincronización local se vuelve recuperable, se continúa con la lectura de torneo federado; su vista ya no presenta el aviso de membresía local. Los grupos privados permanecen fuera del directorio público.
- R174 · regresión física del enlace directo: la selección dependía de que el ID ya estuviera e���q�^