<!-- 2026-10-06 R178: ELIMINAR TORNEO usa texto rojo en ID de Torneos; ambos recorridos muestran CONFIRMA ELIMINAR antes de enviar el borrado. Verificación: test-event-administration.mjs, confirmación única y ausencia de petición previa. -->
## R178 · Locución de resultado par como EVEN · 6 de octubre de 2026

- Cuando el resultado relativo al par es cero, el audio dice “EVEN”. Las locuciones de resultados sobre y bajo el par se conservan.
- Archivos de esta corrección: `index-grupal.html`, `service-worker.js`, `test-lab-player-points-audio.mjs` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.
- Conserva el punto de corte `línea 185` y la activación `23 de agosto de 2026, 17:05:00, hora de Guatemala`.

# ROADMAP A DETALLE

## R174 · 6 octubre 2026 · Recuperación de Scores de torneo federado en LAB

- Reproducción física desde Organizador en LAB: la ficha Santa delfina enlazó a `directory_production_36c43fd8-594e-40e3-af6d-13bfd1863f20`; el monitor quedó en `NO SE PUDO COMPROBAR TU PARTICIPACIÓN · REINTENTA` y `NINGÚN TORNEO EN CURSO`.
- Causa: `live-hub.js` esperaba que `GSCPersonalEvents.sync()` terminara correctamente antes de procesar `directoryEvent`. Un fallo de participación local abortaba el arranque aunque el torneo federado estuviera disponible.
- Corrección mínima: la sincronización local se vuelve recuperable, se continúa con la lectura de torneo federado; su vista ya no presenta el aviso de membresía local. Los grupos privados p���q�^