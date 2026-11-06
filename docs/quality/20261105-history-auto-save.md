

## Candidato R250 local · historial, nube personal y tarjeta La Reunión · 5 noviembre 2026 Guatemala
Fuente cf33bdfe / R249 publicada en epg-caddy.vercel.app, dpl_EQegYvHveV1XreFDskdezkMmTmsL. Reparación previa 7f7d230 de cola HTTP401/503 conservada. Usuario autoriza trabajar guardado18 inmediato, nueve completos tras45min sin score, buscar ronda Jessie Kirste/Rebeca de4nov y sincronizar historial por cuenta sin depender sólo de iPhone; orden vigente NO usar Vercel hasta terminar revisión, incluida física y tarjeta. Ningún deployment, alias, variable ni escritura remota ejecutado en esta revisión.
Correcciones: sync/backup exigen identidad real de correo (ownerOnly en helper significa cuenta auténtica, no privilegio comercial); middleware también la verifica y no sustituye por cookie de torneo/dispositivo. Consulta de respaldo incorpora ID de cuenta y preserva aislamiento. Cola mantiene datos ante fallos. Recuperación automática al conectar cuenta, conservación local y mensaje explícito cuando devuelve cero. Rescate local de rondas completas desde archivo, copias activas y payloads pendientes: mismo ID/scores, sin resucitar IDs borrados, sin cierre inventado si faltan scores.
Autosave usa cierre oficial existente: 18 completos inmediato; nueve IN o OUT completos a45min desde último score, incluso al reabrir/reanudar. Ningún score del resto se inventa; seguimiento holesPlayed recorre snapshot/respaldo; tarjeta9 se identifica como9. TIMER9 cambia de20 a45. X conserva política existente de cierre (no cuenta como score terminado); no se afirma cobertura de cierre automático de una ronda con X.
Nube personal propuesta, aún sin habilitar: LAB con GSC_PERSONAL_CLOUD_ORIGIN=https://epg-caddy.vercel.app; Producción con GSC_PERSONAL_CLOUD_LEGACY_ORIGIN=https://golf-sc-gt-lab.vercel.app. Ambos endpoints validan cuenta auténtica; origen heredado usa ?legacy=1 sin relay/reentrada. Unión de respaldos sólo para el mismo ID de cuenta, deduplicación por clientRoundId y versión/fecha; no mezcla bases de torneos ni edición Amigos. Sin flags queda ruta local anterior. No se han configurado estos valores remotos.
Búsqueda real de sólo lectura: rama principal br-late-wind-avhgi9s3 contiene39 rondas del ID propietario conocido, último updated_at8oct; no halló ronda4nov con Jessie/Rebeca en rounds ni en current_snapshot Live normal/privado. Rama LAB br-small-mouse-av0f24o9 tampoco halló esa ronda en rounds por nombres; registros encontrados son anteriores. No significa pérdida en teléfono. Capturas IMG_8994-96: cuenta conectada, recuperación0 y una ronda27sept; IMG_9004 LAB: una ronda7oct. Dos orígenes mantienen localStorage separado y bases aisladas; versión igual no sincroniza datos. La ronda real no se declara recuperada.
La Reunión: dos fotos originales preservadas con SHA256,36 yardajes verificados, nueve repetidos, par36/72, cuatro colores explícitos incluyendo Negro negro. Sumas por vuelta:3547/3318/3029/2704 (Negro/Azul/Blanco/Rojo); impresos2743 y2528 de blanco/rojo NO coinciden. HCP impreso15,13,17,11,1,7,3,5,9 repetido en ambas vueltas NO es permutación1..18. Datos de tees/par nuevos incorporados a constantes del candidato, configured:false conservado hasta aclarar HCP para no publicar netos incorrectos; no inventar Rating/Slope, índices pares ni declarar activado.
Pruebas: test-round-auto-save y cierre/artefactos PASS; test-backup-queue-response-recovery PASS; test-backup-account-roundtrip ejecuta fuentes reales de auth/API y PostgreSQL/PGlite con pgcrypto PASS, cuenta real gana a código/dispositivo, replay idempotente, recuperaciónmismos18scores/hash, terceros denegados. test-personal-cloud-route PASS unión misma cuenta y dominios fijos sin llamadas remotas. test-la-reunion-new-card PASS transcripción/hashes/sumas y candado HCP. test-backup-browser-roundtrip PASS Chromium real móvil local: escritor último score, archivo18/reload, navegador vacío recupera de PostgreSQL, reparación de ronda completa sin cierre, nueve tras45min reloj suspendido, cero excepciones. Identidades/datos son sintéticos. NO es prueba física de iPhone.
Auditoría integral scripts/build-manual-lab.mjs primer recorrido PASS tras corregir middleware (había bypass de prueba y un import incompatible con VM; ahora autentica en guard). Recorrido final con nuevos candados incorporados en curso al crear este registro. Pruebas legacy V279/V305 no se presentan como aprobadas: una espera IDs retirados; no son evidencia del estado físico del teléfono. Cero FAIL requerido para publicar.
Riesgos/bloqueos: prueba física iPhone pendiente; confirmación HCP La Reunión pendiente; ronda real anterior no recuperada todavía; consultas de respaldo y archivo conservan límite120; nube no sincroniza sin conexión ni sin sesión real. Antes de publicar: revisar manual vigente, mismo commit LAB/Producción, source/inventory gates, historial y permisos negativos. Rollback sólo restauraría deployment anterior y flags, sin borrar datos; no ejecutar hasta nueva verificación y aprobación final.
Archivos de esta fase:
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`: implementación, prueba o evidencia de este alcance.
- `CONTROL_PROYECTO_SCIRE/04_MATRIZ_DE_CAMPOS/course-source-registry.json`: implementación, prueba o evidencia de este alcance.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`: implementación, prueba o evidencia de este alcance.
- `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`: implementación, prueba o evidencia de este alcance.
- `ROADMAP_A_DETALLE.md`: implementación, prueba o evidencia de este alcance.
- `ROADMAP_OVERALL.md`: implementación, prueba o evidencia de este alcance.
- `account-backup.js`: implementación, prueba o evidencia de este alcance.
- `api/_lib/personal-cloud.js`: implementación, prueba o evidencia de este alcance.
- `api/backup.js`: implementación, prueba o evidencia de este alcance.
- `api/sync.js`: implementación, prueba o evidencia de este alcance.
- `card-artifacts.js`: implementación, prueba o evidencia de este alcance.
- `data/courses/la-reunion/card-20261105.json`: implementación, prueba o evidencia de este alcance.
- `data/courses/la-reunion/sources/41536679-4dca-4094-90cc-96169af0474e.jpeg`: implementación, prueba o evidencia de este alcance.
- `data/courses/la-reunion/sources/IMG_8993.jpeg`: implementación, prueba o evidencia de este alcance.
- `docs/quality/20261105-history-auto-save.md`: implementación, prueba o evidencia de este alcance.
- `index-grupal.html`: implementación, prueba o evidencia de este alcance.
- `master-data-sync.js`: implementación, prueba o evidencia de este alcance.
- `middleware.js`: implementación, prueba o evidencia de este alcance.
- `round-auto-save.js`: implementación, prueba o evidencia de este alcance.
- `round-closure.js`: implementación, prueba o evidencia de este alcance.
- `scripts/build-manual-lab.mjs`: implementación, prueba o evidencia de este alcance.
- `scripts/build-mobile-web.mjs`: implementación, prueba o evidencia de este alcance.
- `service-worker.js`: implementación, prueba o evidencia de este alcance.
- `test-backup-account-roundtrip.mjs`: implementación, prueba o evidencia de este alcance.
- `test-backup-browser-roundtrip.mjs`: implementación, prueba o evidencia de este alcance.
- `test-la-reunion-new-card.mjs`: implementación, prueba o evidencia de este alcance.
- `test-personal-cloud-route.mjs`: implementación, prueba o evidencia de este alcance.
- `test-round-auto-save.mjs`: implementación, prueba o evidencia de este alcance.
- `timer-inactivity.js`: implementación, prueba o evidencia de este alcance.

Directorios nuevos: `data/`, `data/courses/`, `data/courses/la-reunion/`, `data/courses/la-reunion/sources/`; fuentes físicas recibidas, nunca generadas ni recortadas.


## Cierre de desarrollo local R250 · evidencia y bloqueos vigentes
Estado: NINGUNA PUBLICACIÓN NI CAMBIO VERCEL. R249 remoto intacto. R250 es candidato local, release.json.candidate=true; identidad/meta/SW coherentes para una publicación futura, no realizada.
Pruebas unitarias y PostgreSQL reales locales PASS: cuenta de correo frente a cookies de código/dispositivo, respaldar y recuperar18, SHA/scores idénticos, replay, aislamiento entre cuentas y conflicto de instalación. Browser Chromium390 PASS con página y escritores reales: último score18, cierre automático sin botón, persistencia/reapertura, recuperación desde almacenamiento vacío; rescate de archivo completo sin snapshot y también con bandera de cierre pero sin snapshot; nueve hoyos a45min después de suspensión, sin hoyos inventados. Son fixtures locales. NO equivale a prueba física en iPhone ni a recuperación de la ronda real de Jessie y Rebeca.
Fuentes La Reunión: par/tees/yardas transcritos a constantes inactivas y archivo de fuentes,9 repetidos. Revisión de datos, sumas/hashes y navegador real con cuatro tees en escenario visual local/HCP0 PASS. Se corrigió legibilidad de texto para Negro conservando marca negra y se evitó que el wrapper de Stableford convierta Rating/Slope desconocidos en0. Netos de La Reunión NO habilitados: índices impares duplicados asignan16tiros aHCP15. Necesita confirmación de reparto de hándicap por club; no inventar los pares. Total impreso Blanco2743/Rojo2528 difiere de suma3029/2704.
Nube común: rutas propuestas explícitas y opt-in para LAB/Producción, con identidad validada, endpoint heredado sin recursión y unión deduplicada por cuenta/versión. Edición Amigos excluida. Flags remotos SIN configurar. Ningún dato ni instalación remota se migró o borró. El código local contempla lectura de legado LAB para conservar rondas ya respaldadas allí; no supone que mismos dominios compartan localStorage.
Auditoría: perfil integral pasó antes del cambio de etiqueta R250; al actualizar etiqueta detectó cuatro tests con fechas fijas8/9octubre. Sus criterios de permisos/funciones se conservaron y sólo formato de fecha pasó a8dígitos con candado de coherencia release/app/SW. Prefijo y sufijo de auditoría PASS tras corregir esos candados. Se lanza un último recorrido del árbol funcional congelado, con resultado que se registrará al completarse. No se presenta una reanudación como evidencia física.
Los límites de retención120 y obligación de sesión/conexión para respaldo remoto se conservan. No hay certificación comercial íntegra. Pendientes reales: HCP La Reunión, prueba física de iPhone y recuperación/inspección de datos de la ronda4nov en el dispositivo. Error HTTP de esa cola particular no fue capturado; bug401/503 reproducido y corregido, identidad discordante reproducida y corregida, sin adjudicar causalidad única no verificada.
Archivos adicionales o actualizados:
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`: desarrollo, evidencia o control de esta entrega local.
- `CONTROL_PROYECTO_SCIRE/04_MATRIZ_DE_CAMPOS/INDICE_TARJETAS_ORIGINALES.md`: desarrollo, evidencia o control de esta entrega local.
- `CONTROL_PROYECTO_SCIRE/04_MATRIZ_DE_CAMPOS/course-source-registry.json`: desarrollo, evidencia o control de esta entrega local.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`: desarrollo, evidencia o control de esta entrega local.
- `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`: desarrollo, evidencia o control de esta entrega local.
- `ROADMAP_A_DETALLE.md`: desarrollo, evidencia o control de esta entrega local.
- `ROADMAP_OVERALL.md`: desarrollo, evidencia o control de esta entrega local.
- `account-backup.js`: desarrollo, evidencia o control de esta entrega local.
- `api/_lib/personal-cloud.js`: desarrollo, evidencia o control de esta entrega local.
- `api/backup.js`: desarrollo, evidencia o control de esta entrega local.
- `api/sync.js`: desarrollo, evidencia o control de esta entrega local.
- `card-artifacts.js`: desarrollo, evidencia o control de esta entrega local.
- `data/courses/la-reunion/card-20261105.json`: desarrollo, evidencia o control de esta entrega local.
- `data/courses/la-reunion/sources/41536679-4dca-4094-90cc-96169af0474e.jpeg`: desarrollo, evidencia o control de esta entrega local.
- `data/courses/la-reunion/sources/IMG_8993.jpeg`: desarrollo, evidencia o control de esta entrega local.
- `docs/quality/20261105-history-auto-save.md`: desarrollo, evidencia o control de esta entrega local.
- `index-grupal.html`: desarrollo, evidencia o control de esta entrega local.
- `master-data-sync.js`: desarrollo, evidencia o control de esta entrega local.
- `middleware.js`: desarrollo, evidencia o control de esta entrega local.
- `release.json`: desarrollo, evidencia o control de esta entrega local.
- `round-auto-save.js`: desarrollo, evidencia o control de esta entrega local.
- `round-closure.js`: desarrollo, evidencia o control de esta entrega local.
- `scripts/build-manual-lab.mjs`: desarrollo, evidencia o control de esta entrega local.
- `scripts/build-mobile-web.mjs`: desarrollo, evidencia o control de esta entrega local.
- `service-worker.js`: desarrollo, evidencia o control de esta entrega local.
- `stableford.js`: desarrollo, evidencia o control de esta entrega local.
- `test-backup-account-roundtrip.mjs`: desarrollo, evidencia o control de esta entrega local.
- `test-backup-browser-roundtrip.mjs`: desarrollo, evidencia o control de esta entrega local.
- `test-la-reunion-new-card.mjs`: desarrollo, evidencia o control de esta entrega local.
- `test-personal-cloud-route.mjs`: desarrollo, evidencia o control de esta entrega local.
- `test-project-control-matrix.mjs`: desarrollo, evidencia o control de esta entrega local.
- `test-r223-negative-handicap-campeonato-a.mjs`: desarrollo, evidencia o control de esta entrega local.
- `test-r224-scorecard-no-48h-owner-controls.mjs`: desarrollo, evidencia o control de esta entrega local.
- `test-r226-whatsapp-entry-code-prefill.mjs`: desarrollo, evidencia o control de esta entrega local.
- `test-r227-guest48h-organizer-groups.mjs`: desarrollo, evidencia o control de esta entrega local.
- `test-round-auto-save.mjs`: desarrollo, evidencia o control de esta entrega local.
- `timer-inactivity.js`: desarrollo, evidencia o control de esta entrega local.


### Resultado final local y estado de entrega
Auditoría completa scripts/build-manual-lab.mjs: último recorrido terminado exit0,232 líneas PASS (log local /tmp/gsc-r250-frozen-integral.log). Regresión adicional posterior de normalización server-side: test-backup-account-roundtrip PASS con fuente original inmutable,9 expirados recuperados oficialmente sin teléfono original; test-backup-browser-roundtrip PASS18/reapertura/segundo dispositivo/9a45min/rescatelegacy/consola. El servidor materializa desde los scores ya recibidos una tarjeta elegible usando el mismo cierre oficial, no modifica la fila fuente ni inventa hoyos. Sin un respaldo previo recibido no puede reconstruir scores desconocidos del teléfono.
R250 permanece local y no publicado. Alias/DBs remotos sin cambios. La Reunión continúa configured:false por HCP no confirmado; fotos y yardas incorporadas correctamente a repositorio/candidato y examinadas en navegador real con habilitación temporal sólo de prueba/HCP0. Negro legible, marca negra con borde; Rating/Slope desconocidos son guiones. Prueba física iPhone y recuperación de ronda real Jessie/Rebeca pendientes; no vender como totalmente certificado.
Archivos finales de la entrega:
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`: alcance local, pruebas, datos o evidencia de esta versión.
- `CONTROL_PROYECTO_SCIRE/04_MATRIZ_DE_CAMPOS/INDICE_TARJETAS_ORIGINALES.md`: alcance local, pruebas, datos o evidencia de esta versión.
- `CONTROL_PROYECTO_SCIRE/04_MATRIZ_DE_CAMPOS/course-source-registry.json`: alcance local, pruebas, datos o evidencia de esta versión.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`: alcance local, pruebas, datos o evidencia de esta versión.
- `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`: alcance local, pruebas, datos o evidencia de esta versión.
- `ROADMAP_A_DETALLE.md`: alcance local, pruebas, datos o evidencia de esta versión.
- `ROADMAP_OVERALL.md`: alcance local, pruebas, datos o evidencia de esta versión.
- `account-backup.js`: alcance local, pruebas, datos o evidencia de esta versión.
- `api/_lib/backup-snapshot.js`: alcance local, pruebas, datos o evidencia de esta versión.
- `api/_lib/personal-cloud.js`: alcance local, pruebas, datos o evidencia de esta versión.
- `api/backup.js`: alcance local, pruebas, datos o evidencia de esta versión.
- `api/sync.js`: alcance local, pruebas, datos o evidencia de esta versión.
- `card-artifacts.js`: alcance local, pruebas, datos o evidencia de esta versión.
- `data/courses/la-reunion/card-20261105.json`: alcance local, pruebas, datos o evidencia de esta versión.
- `data/courses/la-reunion/sources/41536679-4dca-4094-90cc-96169af0474e.jpeg`: alcance local, pruebas, datos o evidencia de esta versión.
- `data/courses/la-reunion/sources/IMG_8993.jpeg`: alcance local, pruebas, datos o evidencia de esta versión.
- `docs/quality/20261105-history-auto-save.md`: alcance local, pruebas, datos o evidencia de esta versión.
- `index-grupal.html`: alcance local, pruebas, datos o evidencia de esta versión.
- `master-data-sync.js`: alcance local, pruebas, datos o evidencia de esta versión.
- `middleware.js`: alcance local, pruebas, datos o evidencia de esta versión.
- `release.json`: alcance local, pruebas, datos o evidencia de esta versión.
- `round-auto-save.js`: alcance local, pruebas, datos o evidencia de esta versión.
- `round-closure.js`: alcance local, pruebas, datos o evidencia de esta versión.
- `scripts/build-manual-lab.mjs`: alcance local, pruebas, datos o evidencia de esta versión.
- `scripts/build-mobile-web.mjs`: alcance local, pruebas, datos o evidencia de esta versión.
- `service-worker.js`: alcance local, pruebas, datos o evidencia de esta versión.
- `stableford.js`: alcance local, pruebas, datos o evidencia de esta versión.
- `test-backup-account-roundtrip.mjs`: alcance local, pruebas, datos o evidencia de esta versión.
- `test-backup-browser-roundtrip.mjs`: alcance local, pruebas, datos o evidencia de esta versión.
- `test-la-reunion-new-card.mjs`: alcance local, pruebas, datos o evidencia de esta versión.
- `test-personal-cloud-route.mjs`: alcance local, pruebas, datos o evidencia de esta versión.
- `test-project-control-matrix.mjs`: alcance local, pruebas, datos o evidencia de esta versión.
- `test-r223-negative-handicap-campeonato-a.mjs`: alcance local, pruebas, datos o evidencia de esta versión.
- `test-r224-scorecard-no-48h-owner-controls.mjs`: alcance local, pruebas, datos o evidencia de esta versión.
- `test-r226-whatsapp-entry-code-prefill.mjs`: alcance local, pruebas, datos o evidencia de esta versión.
- `test-r227-guest48h-organizer-groups.mjs`: alcance local, pruebas, datos o evidencia de esta versión.
- `test-round-auto-save.mjs`: alcance local, pruebas, datos o evidencia de esta versión.
- `timer-inactivity.js`: alcance local, pruebas, datos o evidencia de esta versión.


### Continuación final solicitada por el propietario · 5 noviembre 2026
El propietario confirmó con captura que se llegó al hoyo18 y ordenó «olvida ese tema». Se cierra la investigación de la ronda real Jessie/Rebeca por instrucción expresa, sin afirmar recuperación ni atribuir causa definitiva. Se termina el resto del alcance local: guardado automático18 numéricos y9 numéricos tras45min, recuperación por cuenta y fuentes La Reunión. La política heredada de X no se modifica en esta continuación; no afirmar que X equivale a un resultado numérico completo ni que todas las rondas con X cierran oficialmente.
Revalidación de navegador real local: test-backup-browser-roundtrip.mjs PASS, escritora real del score18, reapertura, segundo dispositivo vacío, misma SHA/scores, reparación legacy,9hoyos a45min y cero errores JS. PostgreSQL local PASS, incluidas cuentas aisladas y materialización server-side9 sin teléfono original. No es prueba física iPhone.
Bloqueos externos conservados: La Reunión permanece inactiva hasta confirmar distribución oficial de HCP; los índices repetidos entregan16tiros aHCP15. No se inventa Rating/Slope. Sincronización entre dominios está implementada y probada localmente, no activada en remoto. Retención120 conservada. No se toca Vercel, no se hace push, no se cambia ninguna base remota. La publicación y validación remota quedan pendientes conforme a la orden de revisar primero fuera de Vercel.


### Orden posterior: La Reunión habilitada como nueve hoyos repetidos
El propietario aclaró expresamente: «el Campo sólo tiene nueve hoyos ... para jugar18 ... repiten los mismos. Entonces así hazlo». Esta orden sustituye el bloqueo anterior de activación. Se habilita La Reunión en index-grupal.html, con par/yardas/colores y SI impresos idénticos en ambas vueltas. No se modifica ninguna fotografía. La aplicación distribuye el hándicap18 usando el índice impreso en primera vuelta y su siguiente ordinal en segunda exclusivamente para la matriz repetida de nueve índices impares; la tarjeta sigue mostrando los originales. Es política de reparto de la aplicación, no afirmación de una matriz distinta impresa por el club. test-la-reunion-new-card.mjs prueba todos los HCP -73..73: suma exacta y diferencia máxima de un tiro entre vueltas; HCP15 suma15, no16. El resto de matrices usa la fórmula anterior. test-backup-browser-roundtrip.mjs exige ahora el campo habilitado de verdad, sin habilitación temporal. Rating/Slope permanecen desconocidos, no inventados. Fuentes y política registradas en data/courses/la-reunion/card-20261105.json. Vercel y bases remotas siguen intactas.

Paridad adicional de activación: `live-hub.html` habilita La Reunión en Crear torneo con el mismo catálogo. El test existente test-tournament-course-selector.mjs detectó la discrepancia y no se debilitó: se corrigió el selector real y se repite el sufijo integral desde esa puerta.


### Cierre verificable de esta continuación local
Resultado: PASS de navegador real local y PostgreSQL (test-backup-browser-roundtrip.mjs); PASS de reparto repetido9 para HCP -73..73 y fuentes/hash/yardas (test-la-reunion-new-card.mjs); PASS del motor previo, HCP plus, nube común y auto-save9/18. Perfil integral original completo PASS antes de activar el campo; después de activarlo, prefijo integral PASS hasta el selector; el selector detectó una disponibilidad distinta y se corrigió live-hub.html sin debilitar su test. Todo el sufijo integral desde test-tournament-course-selector.mjs hasta paridad de manual volvió a ejecutarse y terminó exit0 (164 líneas, /tmp/gsc-final-reunion-suffix.log). G0, pruebas negativas y matriz de control PASS. No se afirma un recorrido integral monolítico posterior: evidencia dividida por la corrección puntual. No hay prueba física iPhone ni validación remota posterior porque no se desplegó. La investigación de la ronda real sigue cancelada por orden del propietario. Estado final: desarrollo local revisado y guardado, publicación/sincronización remota aún NO ACTIVADA; no certificar como instalada ni comercialmente íntegra.


### Publicación R250 autorizada · 5 noviembre 2026 Guatemala
Orden expresa del propietario: proceder, ejecutar y culminar actualizando Producción, Laboratorio y comercial con mínimo consumo Vercel. release.json retira candidate:true al preparar el paquete autorizado. vercel.json ejecuta en servidor sólo integridad G0, doble ROADMAP, sello, entrada pública y matriz release; la auditoría funcional completa ya ejecutada y sus regresiones de cambio están registradas arriba. Instalación production sin scripts/paquetes dev ni Python, porque no se construye otra vez el manual ni se repite PGlite en el servidor. No elimina ninguna puerta local. Revisión comercial local adicional PASS con cliente de membresía y almacenamiento por cuenta auténticos del despliegue comercial, sesiones de prueba sintéticas y PostgreSQL local:18,9a45min, reapertura/segundo dispositivo, bloqueo offline conserva historial y cero erroresJS. No es iPhone físico ni pago real. Se conservan middleware privado, ocho días, planes999/7200centavos, panel e identidad separada. Paquetes se preparan con origen/commit/hashes comprobados; no se publican credenciales. Estado de despliegues pendiente hasta obtener READY y revisar sus respuestas reales.
