## R178 · Locución de resultado par como EVEN · 6 de octubre de 2026

- Cuando el resultado relativo al par es cero, el audio dice “EVEN”. Las locuciones de resultados sobre y bajo el par se conservan.
- Archivos de esta corrección: `index-grupal.html`, `service-worker.js`, `test-lab-player-points-audio.mjs` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.
- Conserva el punto de corte `línea 185` y la activación `23 de agosto de 2026, 17:05:00, hora de Guatemala`.

## R179 · ID de torneo en Producción y eliminación roja con reconfirmación · 6 de octubre de 2026

- El código de ingreso de torneos no se emitía en Producción porque faltaba `GSC_PERSONAL_ACCESS_PRODUCTION_READY=1`; se activa solo en el entorno de Producción. La autorización del organizador y las validaciones existentes siguen aplicándose.
- Las acciones de eliminación en Administración e ID de torneos, incluida la reconfirmación, fuerzan texto y borde rojos para prevalecer sobre los estilos del diálogo. El primer clic abre “CONFIRMAR ELIMINAR”; solo el botón de esa confirmación llama al endpoint.
- Se conserva la locución `EVEN` del cambio pendiente R178. Versión de aplicación: R179.
- Archivos R179: `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_A_DETALLE.md`, `ROADMAP_OVERALL.md`, `event-administration-ui.js`, `personal-events.js`, `index-grupal.html`, `service-worker.js`, `test-lab-player-points-audio.mjs`, `test-r177-cross-device-admin.mjs` y `release.jso���q�^