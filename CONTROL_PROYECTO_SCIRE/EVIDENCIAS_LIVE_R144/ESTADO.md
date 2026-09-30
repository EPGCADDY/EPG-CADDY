# R144 · evidencia local · 29 septiembre 2026, 23:03 Guatemala

Base LAB R143: 013f046c44bd3b793ac86c5f02abb034c589badd. Rama local lab/integral-round-tournament-20260930. Sin commit de entrega, push, despliegue ni cambios en Producción (main 89c64f348b6ce2a311218215c41488e04a588053, confirmado por ls-remote).

PASS: build-manual-lab completo (build-local.log), pruebas SQL y límite de intentos, handler fail-closed, middleware y navegación. Firefox 390×844, API real handleLiveShare y PostgreSQL local PGlite: código generado, mensaje WhatsApp, primer receptor directo a Scores, cookie personal, favoritos tras reload, segundo navegador rechazado, invitado sin permiso de generar códigos, flujo de Ronda Particular y detalle 18 G/N. Motor local de una conexión, no certifica concurrencia multi-conexión remota.

Imágenes: datos y códigos exclusivamente de prueba. Capturas revisadas visualmente; X y nombre del evento corregidos. Los receptores acceden por enlace y cookie; no se instaló aplicación. No se envió ningún mensaje real de WhatsApp.

Reproducción: npm install; node scripts/live-share-test-server.mjs; GSC_SHARE_TEST_URL=http://127.0.0.1:8877 node test-live-share-browser.cjs; node test-live-share-postgres.mjs; node test-live-share-handler.mjs; node test-live-share-middleware.mjs; node scripts/build-manual-lab.mjs. Playwright se resuelve desde GSC_PLAYWRIGHT_MODULE o CODEX_PRIMARY_RUNTIME_NODE_MODULES.

PENDIENTE externo: identificar/configurar base LAB aislada y validar producción y LAB no comparten destino de escritura. Health del LAB publicado: GET /api/database-health devuelve 401 ACCESS_REQUIRED (conector Vercel autenticado). Sin project_id Neon disponible en documentación consultada. API nueva responde LAB_DATABASE_ISOLATION_REQUIRED antes de DDL hasta GSC_LIVE_SHARE_LAB_READY=1 después de comprobar aislamiento. No necesita proveedor telefónico. NO es entrega integral ni certificación del LAB publicado.

## R144 · 30 septiembre 2026, 00:42 Guatemala · acceso Neon recuperado; publicación bloqueada

- Proyecto Neon recuperado desde captura IMG/82EFA0E8: `bold-block-51864691`; get_branch confirmó main `br-late-wind-avhgi9s3`. LAB existente `br-bold-bar-avzn813n`; candidato nuevo hijo exclusivamente LAB `br-small-mouse-av0f24o9` / `lab-live-oneuse-r144-20260930`, endpoint `ep-fragrant-pine-av6xi8hy`. No escrituras en main.
- Esquema de códigos aplicado únicamente al candidato; columna mode aditiva presente. Conector Neon: ocho solicitudes simultáneas de la sentencia CTE de consumo; una inserción y siete resultados vacíos; consulta independiente sessions=1. PASS de concurrencia SQL real, no equivale a aplicación desplegada.
- `test-live-share-neon.mjs`: prueba explícita de endpoint candidato, nunca DATABASE_URL. Ejecución local hacia Neon BLOQUEADA por DNS EAI_AGAIN; verificación CTE realizada mediante conector. Suite completa remota pendiente.
- Vercel `deploy_to_vercel`: respuesta real Tool not found, aun anunciado en catálogo. Sin credencial CLI disponible. Configuración DATABASE_URL del proyecto Vercel actual no comprobada. Nueva API sigue desactivada en remoto; no entrega ni enlace nuevo ni commit de publicación. Próxima acción: habilitar vía de configuración/despliegue Vercel y verificar LAB completo.
- Archivos de recuperación: `test-live-share-neon.mjs`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R144/NEON_Y_PUBLICACION.md`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R144/ESTADO.md`, `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`.

## R144 · 30 septiembre 2026, 00:58 Guatemala · candidato comprobado y Vercel LAB configurado

Vercel browser autorizado por propietario 00:44. Guardadas como Secret GSC_LAB_DATABASE_URL, GSC_ENVIRONMENT y GSC_LIVE_SHARE_LAB_READY exclusivamente en proyecto golf-sc-gt-lab / prj_0KNTWUoiCiA3amKZQPDNNkWYFDbp; las variables administradas por integración Neon y los otros proyectos permanecen intactos. Canal Vercel Production es del proyecto LAB, no epg-caddy.

api/_lib/database.js usa exclusivamente endpoint candidato br-small-mouse-av0f24o9 para LAB, falla cerrado si falta y rechaza otro host; no-LAB conserva resolución anterior. test-lab-database-isolation.mjs PASS. release.json, index-grupal.html y service-worker.js identifican R144. scripts/build-manual-lab.mjs incluye control nuevo. Build/regresión completos y Firefox 390x844 general/categoría/favoritos/18 G-N/privada/compartir de primer uso PASS en aplicación local con handler real y PostgreSQL aislado. Neon conector: consumo concurrente 8 solicitudes, 1 sesión PASS. E2E web remoto pendiente.

Incidencia OP60: la importación de archivo por CUA bloqueó la llamada 273 segundos; no fue posible emitir avances dentro de esa llamada. Se retomó reporte inmediato al terminar. El secreto quedó en Vercel como Secret; archivo temporal de importación eliminado. No imprimir ni guardar credenciales en repositorio o evidencias.

Candidato listo para commit y despliegue exclusivamente LAB. Producción main no modificada; aún NO certificar recorrido web remoto ni afirmar publicación R144.
