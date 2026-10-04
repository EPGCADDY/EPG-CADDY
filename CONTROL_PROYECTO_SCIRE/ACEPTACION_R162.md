

## R162 · ID de torneo persistente y códigos de un uso · 3 octubre 2026
Orden del propietario IMG_5711/IMG_5712: Organizador conserva ID para compartir participantes y Administrar mantiene eliminación. Base/rollback main8372ca1cbe28e3f538c3982e415a592ae05e898f. Se muestra código por torneo activo del creador; copia, WhatsApp y actualización de códigos. Fuente canónica servidor: gsc_tournament_entry_codes, pendiente recuperable en cualquier dispositivo de la misma cuenta, separado por evento. Sólo organizador propietario puede emitir/recuperar. Al ingresar una cuenta el código queda consumido y no admite otra; reintento de cuenta ya admitida es idempotente para conservar escritor/roster. Validación de campo/modalidad/capacidad antes de consumo; claim y membresía en un único SQL atómico. MI GRUPO conserva contrato anterior. Códigos originales de torneos también pasan por consumo al ingresar. No modifica scores, motor, voz, permisos administrativos ni eliminación.
Riesgos: ingreso repetido por reenvío, pérdida de código, acceso ajeno, consumo tras error; pruebas PostgreSQL de segunda cuenta rechazada, pendiente estable, nuevo código distinto, error de campo sin consumo, permiso/aislamiento/cierre y navegador móvil390/430 con copy/share/recarga y administración. Rollback mediante reversión de código sin borrar datos ni tabla adicional. Migración aditiva CREATE TABLE IF NOT EXISTS en ensurePersonalAccess. No afirma iPhone físico o entrega WhatsApp. Publicación PENDIENTE hasta gates, banco completo, Preview y deployments READY.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md` · implementación/control/evidencia R162.
- `CONTROL_PROYECTO_SCIRE/ACEPTACION_R162.md` · implementación/control/evidencia R162.
- `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md` · implementación/control/evidencia R162.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R162/390-ids.png` · implementación/control/evidencia R162.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R162/430-ids.png` · implementación/control/evidencia R162.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R162/evidence.json` · implementación/control/evidencia R162.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` · implementación/control/evidencia R162.
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` · implementación/control/evidencia R162.
- `ROADMAP_A_DETALLE.md` · implementación/control/evidencia R162.
- `ROADMAP_OVERALL.md` · implementación/control/evidencia R162.
- `api/_lib/personal-event-access.js` · implementación/control/evidencia R162.
- `api/personal-events.js` · implementación/control/evidencia R162.
- `event-administration-ui.js` · implementación/control/evidencia R162.
- `event-administration.html` · implementación/control/evidencia R162.
- `index-grupal.html` · implementación/control/evidencia R162.
- `personal-events.js` · implementación/control/evidencia R162.
- `release.json` · implementación/control/evidencia R162.
- `scripts/build-manual-lab.mjs` · implementación/control/evidencia R162.
- `scripts/review-r162.mjs` · implementación/control/evidencia R162.
- `service-worker.js` · implementación/control/evidencia R162.
- `test-r162-single-use-tournament-code.mjs` · implementación/control/evidencia R162.


### Recuperación R162 · publicación bloqueada por auto-review
Commit local probado19eb9647a74ce135368d4a99d4b1e78daca358b4; rama fix/r162-tournament-single-use-ids, origen https://github.com/EPGCADDY/EPG-CADDY.git. Banco completo /tmp/r162-bank-final.log exit0; pruebas PostgreSQL (8 intentos,1 ingreso) y navegador390/430 ID/admin PASS; quality/roadmap/inventory PASS antes de commit. Dos git push rechazados automáticamente; no subida ni Preview ni actualización de main/LAB/Producción. Conector GitHub comprobó repo1317852363 público, propietario311247547 igual al usuario autenticado, permisos admin/push. Segundo rechazo exige autorización explícita del usuario para divulgar código y documentación al repo público. No eludir por API, otro transporte ni repositorio. Acción indispensable del propietario: autorizar subida de R162 al repositorio público EPGCADDY/EPG-CADDY. Tras autorización, agente sube rama, verifica Preview, merge autorizado y deployments, incluyendo origen LAB instalado sin cambiar almacenamiento. Fuentes iniciales: capturas IMG_5711/IMG_5712 vistas en chat; iPhone físico y entrega WhatsApp no certificados. Rollback8372ca1cbe28e3f538c3982e415a592ae05e898f. Ejecución DETENIDA tras guardar recuperación.


### Ampliación R162 · código antes o después del registro · 3 octubre18:36
Orden: MODALIDAD/TORNEO debe permitir pegar código sin jugadores y registrar después; se conserva la ruta jugadores primero. API inspect-tournament-code valida evento activo/código/cuenta sin consumir, sin otorgar membresía ni ver Scores. Conserva nombre/campo/modalidad en borrador; OK completa validación del roster y realiza join-code atómico antes de confirmación. INICIAR RONDA sigue siendo el único escritor de nueva tarjeta. Código inválido/usado/cerrado conserva registro anterior; consulta previa no quema el código. Prueba PostgreSQL verifica consumed_at nulo tras inspección; Chromium390/430 recorre pre-código→roster→OK→inicio oficial y jugadores→código, sin errores. Banco completo /tmp/r162-preregistration-bank.log exit0. No iPhone físico ni entrega WhatsApp. Bloqueo de publicación por autorización pública sigue vigente; no se vuelve a intentar subida sin autorización explícita.
- `api/_lib/personal-event-access.js` · inspección previa sin membresía/consumo.
- `api/personal-events.js` · acción inspect-tournament-code.
- `personal-events.js` · diálogo antes de jugadores y join al confirmar.
- `index-grupal.html` · dos rutas, persistencia y escritor oficial.
- `scripts/review-r162.mjs` · revisión de ambas rutas.
- `test-r162-single-use-tournament-code.mjs` · inspección no consume.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R162/evidence.json` · navegador ambas rutas PASS.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` · sello actualizado.
