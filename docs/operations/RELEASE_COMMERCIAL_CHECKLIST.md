# Checklist obligatorio de publicación comercial

Una Preview técnica no es una autorización comercial. Para liberar Producción:

1. todas las aprobaciones de `COMMERCIAL_RELEASE_CONTROL.json` deben estar en `true` y enlazar evidencia verificable;
2. `GSCG_COMMERCIAL_RELEASE=1 npm run commercial:gate` debe aprobar;
3. auditoría maestra, inventarios, SBOM, lockfiles, seguridad, E2E y revisión de logs deben aprobar sobre el mismo commit;
4. prueba física iPhone/iPad, micrófono, interrupciones, ubicación, Waze, clima/tráfico y 80 jugadores debe estar firmada;
5. backup/restore y rollback deben ensayarse con tiempos medidos;
6. términos, privacidad, consentimiento, soporte, precios, impuestos, reembolsos y tiendas deben estar publicados y aprobados;
7. propiedad intelectual, contratos, DPA/SLA, seguro y entidad comercial deben estar documentados;
8. el propietario debe aprobar por escrito el commit exacto y el cambio de target a Producción.

Si un punto falla, se conserva la última Producción aprobada y la candidata permanece aislada.
