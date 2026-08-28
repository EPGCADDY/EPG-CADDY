# Recuperación ante desastres — V354

Objetivos internos provisionales, no SLA contractual: RPO 24 horas y RTO 4 horas para datos persistentes; rollback web menor a 30 minutos si Vercel y credenciales están disponibles.

## Runbook

1. Declarar incidente y congelar escrituras si existe riesgo de corrupción.
2. Confirmar integridad del último backup Neon y exportar evidencia antes de modificarlo.
3. Restaurar en una base aislada; aplicar migraciones en orden; ejecutar pruebas de esquema, sync, scores, consentimientos y Live.
4. Publicar Preview contra la restauración, verificar flujos end-to-end y sólo después aprobar el cambio de producción.
5. Rotar secretos comprometidos y documentar pérdidas frente al RPO.

No existe evidencia adjunta de un restore drill completo. La aprobación `backup_restore_drill` debe permanecer en falso hasta ejecutar, medir y firmar el ensayo.
