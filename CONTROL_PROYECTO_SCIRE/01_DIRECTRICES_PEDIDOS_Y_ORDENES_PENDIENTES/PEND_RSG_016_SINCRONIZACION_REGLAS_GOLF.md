# PEND-RSG-016 · Sincronización verificable de Reglas de Golf

**Fecha de registro:** 26 de agosto de 2026
**Estado:** PENDIENTE DE DISEÑO/CONDICIONES DE USO
**Relación:** fase de sincronización de `PEND-REG-001`

## Objetivo

Mantener las Reglas de Golf, clarificaciones y cambios vigentes sincronizados con Golf Score Card GT desde fuentes oficiales USGA/The R&A, con versión, fecha, fuente y trazabilidad, sin afirmar una alianza o API privada inexistente.

## Arquitectura prevista

`FUENTE OFICIAL → MANIFIESTO DE VERSIÓN → VALIDACIÓN DE ORIGEN Y FECHA → PAQUETE REGLAMENTARIO → SHA-256 → CACHÉ LOCAL VERSIONADA → CONSULTA POR MODALIDAD`

## Condiciones obligatorias

- Definir primero el mecanismo permitido por las condiciones de uso: API/licencia autorizada, feed oficial, paquete propio de referencias permitidas o consulta viva a páginas públicas.
- Comprobar al abrir la aplicación o antes de una consulta si existe una edición o clarificación oficial posterior.
- Conservar un manifiesto con edición, fecha efectiva, fuente, idioma, SHA-256, fecha de descarga y versión anterior recuperable.
- Separar Reglas generales, clarificaciones, procedimientos del Comité y Reglas Locales de cada campo/torneo.
- Descargar una actualización sólo desde dominios oficiales verificados; rechazar contenido incompleto, sin fecha o de origen distinto.
- Mantener un paquete básico offline, rotulado con su fecha de vigencia; si está desactualizado, advertirlo y priorizar consulta oficial conectada.
- Nunca aplicar penalidades, cambiar scores, conceder hoyos o cerrar rondas automáticamente; toda acción deportiva requiere confirmación separada.
- Ejecutar pruebas de actualización, reversión, pérdida de conexión, cambio de edición, conflicto de Regla Local e integridad del caché.

## Condición de cierre

Sólo podrá cerrarse con mecanismo legal/técnico confirmado, sincronización reproducible, versión visible, actualización y reversión probadas, cobertura por modalidad, funcionamiento offline rotulado y prueba física por texto y voz en iPhone.

## Frases para localizar

`sincronizar reglas`, `actualizar reglamento`, `USGA`, `The R&A`, `clarificaciones`, `versión de reglas`, `PEND-RSG-016`.
