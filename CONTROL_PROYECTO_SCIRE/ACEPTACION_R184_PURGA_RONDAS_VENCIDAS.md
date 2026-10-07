# Aceptación R184 · purga de rondas vencidas

## Alcance

- Una ronda vencida y revocada se purga físicamente durante la limpieza programada.
- El borrado manual confirmado purga la ronda y sus datos asociados.
- No queda tarjeta, ID, score, membresía, invitación, permiso, recibo ni auditoría de la ronda eliminada.
- Una ronda activa o aún recuperable no se borra.
- Cada ficha tiene una acción visible «ELIMINAR» con confirmación, nombre accesible y autorización de organizador en servidor.

## Retención y activación

Se respeta el vencimiento que ya calcula el ciclo de vida: cierre más su periodo de retención o vencimiento de la ronda por inactividad. El cron existente ejecuta el ciclo de limpieza cada hora. Los eventos recuperables antes de su vencimiento base no se purgan.

## Verificación

`test-event-lifecycle.mjs`, `test-r175-event-expiry-directory-recovery.mjs`, `test-event-administration.mjs`. Gates: `project-quality-gate`, `roadmap-gate`, `inventory-gate`, y suite de construcción LAB. Vista previa requerida antes de cualquier publicación.
