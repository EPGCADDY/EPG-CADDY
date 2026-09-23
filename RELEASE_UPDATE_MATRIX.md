# MATRIZ TÉCNICA OBLIGATORIA DE ACTUALIZACIÓN — EPG CADDY

Esta regla es permanente. Ninguna versión se considera actualizada hasta completar todos los pasos y evidencias.

| Etapa | Acción obligatoria | Evidencia requerida | Si falla |
|---|---|---|---|
| 1. Preparación | Definir una sola versión nueva (Rxx) y alcance exacto. | Número de versión + lista de archivos a cambiar. | No desplegar. |
| 2. Sincronización de versión | Cambiar el mismo Rxx en app, meta release, Service Worker, nombres de caché y pruebas de release. | Búsqueda sin referencias activas al release anterior, salvo históricos. | Corregir antes de commit. |
| 3. Contratos y pruebas | Ajustar únicamente tests afectados por el cambio real; no alterar lógica aprobada para “hacer pasar” pruebas. | Diff coherente con el cambio funcional. | Revertir/corregir. |
| 4. Registro técnico | Actualizar ROADMAP_OVERALL.md y ROADMAP_A_DETALLE.md en el mismo release. | Ambos roadmaps contienen release y alcance. | El release no es publicable. |
| 5. LAB primero | Publicar exclusivamente en LAB. | Commit SHA + deployment URL + estado Vercel. | Producción queda intacta. |
| 6. Gate de build | Esperar resultado real del build. | READY o error exacto. | Leer el error y corregir solo su causa. |
| 7. Regresión | Ejecutar suite correspondiente y confirmar PASS. | Nombre de pruebas + resultado. | No promover. |
| 8. Prueba física | Verificar navegador/iPhone, actualización PWA, navegación y controles modificados. | Evidencia verificable. | No promover. |
| 9. Promoción idéntica | Promover a main/Producción exactamente el mismo árbol validado en LAB. | Tree SHA de LAB = tree SHA promovido. | Cancelar promoción. |
| 10. Producción | Verificar deployment final. | READY + commit SHA + URL exacta. | Mantener última versión READY anterior. |
| 11. Actualización remota | Confirmar que el cliente detecta el nuevo release y aparece ACTUALIZAR o se actualiza automáticamente. | Pantalla muestra Rxx nuevo o botón ACTUALIZAR. | Revisar versión/SW/caché, no reinstalar a ciegas. |
| 12. Comunicación | Solo usar “ACTUALIZADO” cuando el estado aplicable esté comprobado. | Estado verificado en Vercel. | Informar BUILDING/ERROR real. |

## Reglas invariables
1. LAB → READY → regresión → prueba física → Producción.
2. Nunca modificar Producción para diagnosticar un fallo de LAB.
3. Nunca cambiar varias causas a la vez durante una reparación.
4. Ante ERROR, registrar el mensaje exacto y corregir exclusivamente esa causa.
5. Nunca declarar READY, publicado o actualizado sin consultar Vercel.
6. Cada release debe sincronizar app + meta release + Service Worker + caché + test de release.
7. El acceso directo/PWA no se elimina ni reinstala como primera medida.
8. Producción conserva la última versión READY mientras el candidato nuevo falla.
9. La promoción usa exactamente el árbol validado en LAB.
10. Si el chequeo de versión depende de autenticación, usar un endpoint mínimo de versión que pueda consultarse sin cargar la aplicación protegida.
