# MATRIZ TÉCNICA OBLIGATORIA DE ACTUALIZACIÓN — EPG CADDY

Esta regla es permanente. Ninguna versión se considera actualizada hasta completar todos los pasos y evidencias.

| Etapa | Acción obligatoria | Evidencia requerida | Si falla |
|---|---|---|---|
| 1. Preparación | Definir una sola versión nueva (Rxx) y alcance exacto. | Número de versión + lista de archivos a cambiar. | No desplegar. |
| 2. Sincronización de versión | Cambiar el mismo Rxx en app, meta release, Service Worker, nombres de caché y pruebas de release. | Búsqueda sin referencias activas al release anterior, salvo históricos. | Corregir antes de commit. |
| 3. Contratos y pruebas | Ajustar únicamente tests afectados por el cambio real; no alterar lógica aprobada para “hacer pasar” pruebas. | Diff coherente con el cambio funcional. | Revertir/corregir. |
| 4. Registro técnico | Actualizar ROADMAP_OVERALL.md y ROADMAP_A_DETALLE.md en el mismo release. | Ambos roadmaps contienen release y alcance. | El release no es publicable. |
| 5. LAB primero | Publicar exclusivamente en LAB. | Commit SHA + deployment URL + estado Vercel. | Producción queda intacta. |
| 6. Gate de build | Verificar el resultado real del build hasta estado terminal. | READY o error exacto. | Leer el error y corregir solo su causa. |
| 6A. Diagnóstico activo obligatorio | Ante BUILDING prolongado o ERROR, continuar investigando activamente sin quedar a la espera: logs, CI, tests aislados, contratos, scripts y rutas alternativas de diagnóstico. | Causa exacta identificada o bloqueo externo documentado con evidencia. | No cerrar el proceso mientras exista una acción técnica disponible. |
| 7. Regresión | Ejecutar suite correspondiente y confirmar PASS. | Nombre de pruebas + resultado. | No promover. |
| 8. Prueba física | Verificar navegador/iPhone, actualización PWA, navegación y controles modificados. | Evidencia verificable. | No promover. |
| 9. Promoción idéntica | Promover a main/Producción exactamente el mismo árbol validado en LAB. | Tree SHA de LAB = tree SHA promovido. | Cancelar promoción. |
| 10. Producción | Verificar deployment final hasta READY o ERROR. | READY + commit SHA + URL exacta. | Mantener última versión READY anterior y continuar diagnóstico. |
| 11. Actualización remota | Confirmar que el cliente detecta el nuevo release y aparece ACTUALIZAR o se actualiza automáticamente. | Pantalla muestra Rxx nuevo o botón ACTUALIZAR. | Revisar versión/SW/caché, no reinstalar a ciegas. |
| 12. Comunicación | Solo usar “ACTUALIZADO” cuando el estado aplicable esté comprobado. | Estado verificado en Vercel. | Informar BUILDING/ERROR real y continuar con la siguiente acción disponible. |

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
11. ERROR no significa esperar: significa iniciar diagnóstico activo inmediato y continuar hasta encontrar la causa o agotar todas las rutas técnicas disponibles.
12. Si una vía de diagnóstico está bloqueada, usar la siguiente disponible: Vercel → GitHub Actions → test aislado → inspección de contrato → instrumentación temporal de CI.
13. No cerrar un turno en BUILDING o ERROR mientras exista una comprobación, prueba, corrección o ruta alternativa que pueda ejecutarse.
14. Un push a `main` no equivale a Producción actualizada. Solo se considera actualización remota completada cuando Vercel confirma READY.
15. Cuando el error provenga de pruebas, contratos o tooling propio y no de la aplicación, corregir el arnés de validación sin alterar lógica funcional aprobada.


## Incidentes reales documentados · actualización R80 → R101 · 23/09/2026

| Error observado | Causa exacta encontrada | Corrección aplicada | Regla preventiva obligatoria |
|---|---|---|---|
| Vercel `BUILD_UTILS_SPAWN_1` / `node scripts/build-manual-lab.mjs exited with 1` | El build ejecutaba gates históricos incompatibles con la tarjeta limpia vigente. | Leer el primer assertion real en GitHub Actions y corregir únicamente ese contrato obsoleto. | Nunca modificar UI/cálculo para satisfacer un test histórico; primero comprobar si el test representa el contrato vigente. |
| R80 diagnostic exigía `SHA-256` visible | La tarjeta limpia ya no muestra `ID OFICIAL · SHA-256`. | Alinear el diagnóstico/test con la tarjeta limpia vigente. | Los tests de presentación deben validar únicamente elementos aprobados actualmente. |
| Mode purity R60 falló | El test buscaba una estructura antigua `modeTotals` de Match Play/Four Ball. | Alinear el test con el `shell` limpio vigente, sin cambiar lógica deportiva. | Antes de corregir la app, verificar si la cadena/estructura que exige el test todavía existe en el contrato aprobado. |
| Auditoría Universales exigía `GROSS` genérico | Universales aprobado usa `G/N/P` y `PUNTOS`. | Hacer el gate consciente de Universales. | Los modos especiales se validan contra su propio formato; no contra Medal Play genérico. |
| Se declaró READY sobre proyecto equivocado | Se comprobó `epg-caddy-lab-v363-recovery` en vez del proyecto real correspondiente. | Identificar por projectId y nombre antes de comunicar estado. | Toda verificación debe registrar proyecto + projectId + commit + target + deploymentId. |
| Vercel READY pero iPhone seguía mostrando R80 | `index-grupal.html` y `service-worker.js` continuaban declarando `PRODUCTION-20260923-R80`; caches también estaban versionadas como R80. | Sincronizar release a R101 en meta release, Service Worker, cache names y URL de actualización. | READY del servidor no equivale a cliente actualizado. Verificar físicamente el release mostrado. |
| LAB mostraba R80 y `ACTUALIZADO` | El chequeo comparaba el HTML publicado contra `CURRENT_APP_BUILD`; ambos seguían siendo R80, produciendo falso positivo. | Cambiar de forma atómica la fuente de versión y SW/caché al release nuevo. | Nunca desplegar un cambio funcional con el mismo release activo anterior. |
| Primer deployment R101 falló | `test-lab-r60-production-refresh.mjs` todavía exigía literalmente `PRODUCTION-20260923-R80`. | Actualizar exclusivamente el contrato de release a R101. | En el paso de sincronización buscar referencias activas al release anterior en app, SW Y tests antes del commit. |
| LAB y Producción divergieron durante la reparación | Se habían movido ramas/proyectos en momentos distintos y existían varios proyectos Vercel relacionados. | LAB se valida primero y después se promueve exactamente su SHA a `main`. | No forzar paridad prematura: LAB → READY → prueba física → mismo SHA a Producción. |
| Se comunicó “actualizado” demasiado pronto | Se tomó `READY` de Vercel como prueba suficiente sin confirmar el PWA/iPhone. | Separar estados: commit, CI PASS, Vercel READY y actualización física del cliente. | “ACTUALIZADO” solo después de comprobar el estado que el usuario realmente consume. |

## Procedimiento obligatorio depurado para próximas actualizaciones

1. Elegir un único release Rxx y no reutilizar el anterior.
2. Buscar el release anterior en todo el repositorio antes de tocar ramas.
3. Cambiar de forma atómica: `index-grupal.html` meta `gscg-release`, `service-worker.js` RELEASE, nombres de caché, parámetro `app_version` y tests que validan explícitamente el release.
4. No modificar cálculos, Scores ni UI aprobada para hacer pasar un gate antiguo.
5. Registrar los archivos modificados en ambos ROADMAP si el gate vigente lo exige.
6. Commit exclusivamente a LAB.
7. Confirmar que el deployment pertenece al projectId correcto de LAB y al SHA exacto.
8. Si Vercel falla, localizar el primer test/assertion real en GitHub Actions; corregir una sola causa y repetir LAB.
9. Exigir CI PASS + Vercel READY.
10. Abrir físicamente el LAB y comprobar que muestra el Rxx nuevo; comprobar además el botón ACTUALIZAR/ACTUALIZADO y las funciones modificadas.
11. Solo con esa evidencia promover exactamente el mismo SHA/árbol validado a `main`.
12. Confirmar el projectId correcto de Producción y seguir su deployment hasta READY.
13. Abrir físicamente Producción y confirmar Rxx nuevo. Solo entonces declarar ENTREGA VERIFICADA.
