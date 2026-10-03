# Mapa maestro de todos los archivos · Golf Score Card GT

## R147 · entrada global sin credenciales · 30 septiembre 2026

| Archivos | Función | Protección |
|---|---|---|
| `release.json`, `index-grupal.html`, `service-worker.js` | Identifican R147 y hacen que las instalaciones detecten la versión nueva. | La ruta normal lleva directamente a Registro sin iniciar sesión. |
| `vercel.json`, `middleware.js`, `test-lab-account-gate.mjs` | Mantienen `/`, `/index.html` y `/inicio` en Registro público; el middleware no interpone autenticación general. | La autenticación de invitaciones y permisos por recurso permanece separada de la entrada. |
| `scripts/rebuild-inventory-pdfs.py`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `INVENTARIOS_V311.lock.json` | Generan y sellan inventarios con la etiqueta del release actual. | Gates de hoja de ruta e inventario. |

## R146.1.1 · entrada libre · 30 septiembre 2026

| Archivos | Función | Protección |
|---|---|---|
| `middleware.js`, `access.html` | Las páginas normales abren libremente; `access.html` conserva canje de invitaciones y administración propietaria sólo para emitir/revocar invitaciones de 24 horas. | Ni el panel ni la invitación son requisitos de entrada; los permisos por torneo siguen aplicando. |
| `index-grupal.html`, `guest-access.js` | La Score Card no carga el candado de entrada global; conserva el botón de invitación individual y el aislamiento/caducidad de la sesión invitada de 24 horas. | La expiración sólo afecta al invitado; no cierra la entrada normal ni elimina permisos por torneo. |
| `release.json`, `service-worker.js` | Identificaron el candidato R146.1.1 y renovaron caché PWA. | Historial del cambio anterior. |
| `test-live-share-middleware.mjs`, `test-owner-invitation-ui.mjs`, `test-r18-owner-guest-24h-access.mjs`, `test-v311-live-support-link.mjs`, `test-lab-r60-physical-matrix.mjs`, `test-manual-startup-sharing.mjs`, `test-lab-account-gate.mjs` | Impiden que vuelva la puerta global y comprueban que la invitación individual de 24 horas se conserva separada. | Gate técnico y build LAB. |
| `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `INVENTARIOS_V311.lock.json` | Registro doble y sello del cambio. | Gates de roadmap e inventario. |

## LAB R136 · Registro simplificado · 29 septiembre 2026

| Archivo | Función | Protección |
|---|---|---|
| `index-grupal.html`, `live-hub.js`, `release.json` | Rótulo `CREAR EVENTO`; Registro sin acceso a RONDA PREVIA ni altas de jugadores después de iniciar; edición limitada al roster actual. Portal de Torneos sin el mensaje `ELIGE UNA FUNCIÓN O UN TORNEO`. | Inicio de ronda sigue admitiendo el registro normal; historial, opciones del portal y Producción intactos. |
| `test-lab-round-create-modal.mjs`, `test-v263-compact-players-back-button.mjs`, `test-v253-live-previous-round.mjs`, `test-v304-homogeneous-registration-actions.mjs`, `test-lab-tournament-navigation.mjs` | Regresiones del rótulo, ausencia de controles/handlers, preservación de historial y limpieza del estado del portal. | Build LAB bloquea la reaparición de las funciones/mensajes retirados. |
| `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `PEND_LIVE_018_GOLF_SCORE_CARD_GT_LIVE.md`, `INVENTARIOS_V311.lock.json` | Registro doble y sello de R136. | Gates de proyecto y de inventario. |

## LAB R135 · conexión compatible de rondas Friends · 29 septiembre 2026

| Archivo | Función | Protección |
|---|---|---|
| `live-hub.js` | Guarda el código de unión del torneo Friends en la selección local. | ID y código pertenecen al mismo torneo creado. |
| `live-control.js` | Usa unión por ID y hace respaldo por código cuando el backend aún no acepta la acción nueva; mantiene reintentos y publicación desde la ronda oficial. | No crea un segundo escritor ni cambia otra pantalla. |
| `api/live.js` | Exige origen autorizado también para `join_tournament_by_id`. | La acción autenticada conserva allowlist de origen. |
| `index-grupal.html`, `release.json` | Identifican el shell del candidato LAB R135. | La instalación puede detectar el release nuevo. |
| `test-lab-round-create-modal.mjs` | Protege joinCode, fallback, origen y recorrido de conexión. | Build LAB bloquea el regreso a un único método de unión. |
| `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `PEND_LIVE_018_GOLF_SCORE_CARD_GT_LIVE.md`, `REGISTRO_REINCIDENCIAS_CALIDAD.md`, `INVENTARIOS_V311.lock.json` | Registran causa, corrección, pendientes y sello del árbol R135. | Preview requiere cero FAIL; Producción permanece intacta. |

## Delta V406-R14 · 7 de septiembre de 2026

| Archivo | Función |
|---|---|
| `index-grupal.html`, `service-worker.js` | Apagan ACTUALIZAR cuando el release cargado coincide y lo encienden sólo ante una versión remota distinta; caché R14. |
| `test-v365-active-round-empty-recovery.mjs`, `test-v406-r2-professional-design.mjs` | Fijan release/caché R14, estado inicial apagado y activación condicionada. |
| `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `CONTINUIDAD_MAESTRA_LAB.md`, `REGISTRO_REINCIDENCIAS_CALIDAD.md` | Registran el rechazo físico de R13, corrección R14, evidencia y pendientes. |

## Delta V406-R13 · 7 de septiembre de 2026

| Archivo | Función |
|---|---|
| `index-grupal.html`, `service-worker.js` | Publican release/caché R13 y mantienen ACTUALIZAR verde, habilitado y parpadeante en todo momento. |
| `test-v365-active-round-empty-recovery.mjs`, `test-v406-r2-professional-design.mjs`, `test-v406-r4-mobile-controls.mjs`, `test-v406-r5-simple-tournament-live.mjs` | Impiden publicar cambios funcionales o visuales conservando el identificador anterior. |

## Delta V406-R9 · 7 de septiembre de 2026

| Archivo | Función |
|---|---|
| live-hub.html | Selector global rotulado GENERAL. |
| index-grupal.html / service-worker.js | Release y caché R9. |
| test-v406-tournament-categories.mjs | Candado positivo GENERAL y negativo del texto anterior. |

## Delta V406-R8 · 7 de septiembre de 2026

| Archivo | Función |
|---|---|
| live-hub.js | Restaura búsqueda cerrada y mantiene General/categorías visibles. |
| index-grupal.html | Release visible V406-R8. |
| service-worker.js | Caché V406-R8. |
| test-v406-tournament-categories.mjs | Impide que el listado individual vuelva a desplazar la General. |
| ROADMAPS, continuidad, pendiente, reincidencias e inventario | Trazabilidad y sello R8. |

## Delta V406-R7 · 7 de septiembre de 2026

| Archivo | Función |
|---|---|
| index-grupal.html | Release R7 y marcas predeterminadas por categoría. |
| live-hub.js | Posición por score/hoyos, HOYO ACTUAL/FINAL, deduplicación, GENERAL y lista alfabética. |
| gsc-design-system.css | Colores de categoría y C de Campeonato en cuadro blanco. |
| service-worker.js | Caché V406-R7. |
| test-v406-tournament-categories.mjs | Candados de desempate, hoyo único, frecuencia, categorías y marcas. |

## Delta V406-R6 · 7 de septiembre de 2026

| Archivo | Función |
|---|---|
| index-grupal.html | Release visible V406-R6 para activar ACTUALIZAR. |
| live-control.js | Abre TORNEO LIVE sin token en demostración de sólo lectura. |
| live-hub.js | Construye y muestra 67 participantes temporales por categoría. |
| service-worker.js | Caché V406-R6. |
| test-v406-r5-simple-tournament-live.mjs | Exige el acceso demostrativo directo. |
| test-v406-tournament-categories.mjs | Exige total 67 y distribución 7/6/24/11/7/7/5. |
| test-v365-active-round-empty-recovery.mjs | Fija release/caché V406-R6 y conserva recuperación de ronda. |
| test-v406-r2-professional-design.mjs / test-v406-r4-mobile-controls.mjs | Conservan diseño y geometría bajo el release V406-R6. |
| Pendiente LIVE, continuidad, reincidencias, ROADMAPS e inventario | Trazabilidad V406-R6. |

## Delta V406-R5 · 7 de septiembre de 2026

| Archivo | Función |
|---|---|
| index-grupal.html | Entrada directa TORNEO LIVE desde Inicio. |
| live-control.js | Visor primero; administración cerrada por defecto. |
| live-hub.html / live-hub.js / gsc-design-system.css | Flujo BUSCA · ELIGE · MIRA y herramientas progresivas. |
| service-worker.js | Caché V406-R5. |
| test-v406-r5-simple-tournament-live.mjs | Candado contra saturación del invitado. |

## Delta V406-R4 · 7 de septiembre de 2026

| Archivo | Función |
|---|---|
| index-grupal.html | Barra no flotante, CATEGORÍA/MARCAS y fila secundaria. |
| live-control.js | Monta LIVE dentro de roundUtilityBar. |
| service-worker.js | Caché V406-R4. |
| test-v406-r4-mobile-controls.mjs | Candado de traslape, etiquetas y acciones. |
| Pruebas históricas, ROADMAPS, pendiente LIVE, continuidad, reincidencias e inventario | Trazabilidad V406-R4. |

## Delta V406-R2 · 7 de septiembre de 2026

| Archivo | Función V406-R2 |
|---|---|
| `gsc-design-system.css` | Hoja canónica de TORNEO LIVE, sin `!important`: tokens, componentes, estados y detalle de categoría con columnas fijas. |
| `index-grupal.html` | Consolida Registro móvil en dos líneas dentro de su CSS histórico, sin hoja externa de sobrescrituras; identifica V406-R2. |
| `live-hub.html` / `live-hub.js` | Vista temporal con cantidad dinámica, fecha/torneo/modalidad/categoría y ranking POS/NOMBRE/HDCP/MARCAS/GROSS/NETO/+/−; debajo conserva 18 hoyos e IN/OUT/TOTAL. No genera tarjeta. |
| `api/live.js` / `live-control.js` | Límite transaccional de 100 jugadores por torneo y estado visible `TORNEO COMPLETO`; el conteo se repite bajo bloqueo al publicar y unir. |
| `DATABASE_ARCHITECTURE.md` | Formaliza categorías como proyección de snapshots LIVE y máximo 100 protegido sin migración ni segundo escritor. |
| `service-worker.js` | Caché V406-R2 e inclusión de la nueva hoja compartida. |
| `test-v406-tournament-categories.mjs` | Prueba cantidades variables y usa 30 como escenario visual poblado; mezcla de foursomes, orden deportivo y capacidad total de 100. |
| `test-v406-r2-professional-design.mjs` | Candado de retícula móvil, controles táctiles y simplificación de TORNEO LIVE. |
| `test-v365-active-round-empty-recovery.mjs` | Actualiza únicamente las etiquetas de release/cache esperadas. |
| `ROADMAP_OVERALL.md` / `ROADMAP_A_DETALLE.md` | Estado, alcance, riesgo y evidencia V406-R2. |
| `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md` | Punto exacto para continuidad entre conversaciones. |
| `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_LIVE_018_GOLF_SCORE_CARD_GT_LIVE.md` | Fija que categorías son visualizaciones LIVE, no tarjetas nuevas. |

## Delta V406-R1 · 7 de septiembre de 2026

| Archivo | Función V406 |
|---|---|
| `index-grupal.html` | Captura, valida, guarda y recupera la categoría por jugador. |
| `live-control.js` / `api/live.js` | Transportan y validan `tournamentCategory`. |
| `live-hub.html` / `live-hub.js` | TORNEO LIVE, filtro, índice por categoría y MI TABLERO. |
| `card-artifacts.js` | Incluye categoría en la tarjeta global. |
| `test-v406-tournament-categories.mjs` | Candado del catálogo, ruta de datos, índice y filtro. |

Este mapa explica cada archivo con palabras sencillas. Los nombres raros, números y códigos se conservan para no romper nada; aquí se indica para qué sirve cada uno.

Archivos activos rastreados al corte V353: **359**.

Archivos antiguos retirados del uso diario: **89**. Siguen recuperables en el historial de GitHub.

## Archivos activos

| Ruta exacta | Código único del contenido | Tamaño | Explicación sencilla |
|---|---|---:|---|
| `.github/workflows/ios-build.yml` | `8a61450069cd4ec9297204841a70788ae1f4ad0f` | 1092 bytes | Comprueba que la aplicación de iPhone pueda construirse y exige primero ambos ROADMAPS. |
| `.github/workflows/ios-testflight.yml` | `b67cfeef9a79cc4b419accece846a7e334a27636` | 1133 bytes | Prepara una copia para TestFlight y exige primero ambos ROADMAPS. |
| `.github/workflows/mobile-native-package.yml` | `ee0d6b5b72cfab49646b58a764dcb8d585c88ee5` | 2112 bytes | Prepara Apple/Android y se bloquea si faltan los dos ROADMAPS. |
| `.github/workflows/roadmap-gate.yml` | Registro V305 | Se calcula al publicar | Ejecuta en GitHub los candados ROADMAP, de tarjetas hermanas y de navegación V305. |
| `.github/workflows/stableford-tournament-pass.yml` | `df70cf36092ddd72b59271bf241b1ac58fb21027` | 1075 bytes | Comprueba Stableford y exige primero ambos ROADMAPS. |
| `.gitignore` | `0994446eb785e2166ce79941bec8bba6c245c567` | 75 bytes | Indica qué archivos temporales no deben subirse a GitHub. |
| `7B1C43A7-EB8A-43CB-B03E-0CAE9273F2A2.jpeg` | `1c3cdacf565de7b2ce42d57bb416a23c50af1b8e` | 599880 bytes | Fuente histórica del logo cromado 3D con verde neón muy saturado; conserva su nombre para no romper enlaces. |
| `APP_ARCHITECTURE.md` | `48eb432665d9a880624ad6a93e852e2992cbc7ad` | 7104 bytes | Explica arquitectura, modalidades, reglas editoriales 4K y campos. |
| `AUDITORIA_MAESTRA_V170.md` | `8dd135a84521f64c39928fadb35de0518447fe40` | 4462 bytes | Resumen de una revisión histórica del producto. |
| `COMPENDIO_FINAL_FUNCIONES_USUARIO.md` | Registro V305 | Se calcula al publicar | Manual sencillo actualizado con Historial, Regístrate y el vocabulario visible vigente. |
| `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/DIRECTRICES_MANDATORIAS.md` | Autorización permanente 2026-08-26 | Se calcula al publicar | Reglas permanentes, candados ROADMAP/inventarios, ejecución autónoma sin autorizaciones intermedias y montaje sólo después de PASS completo. |
| `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md` | `PEND-REG-001` a `PEND-DID-017` | Se calcula al publicar | Cola consultable completa: voz, tráfico, reglas, handicap oficial, campos mundiales, GPS de golf, detección automática del campo, sincronización reglamentaria, juegos/apuestas, fichas didácticas, relojes, nube/seguridad, estadísticas, monetización, pruebas, clima y Guía Rápida. |
| `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_DID_017_FICHAS_MODALIDADES_PARA_APRENDER.md` | `PEND-DID-017` | Se calcula al publicar | Define una hoja web/PDF por modalidad y esquema, comprensible a los 10 años, imprimible en blanco y negro, con Q/$ excluyentes, ejemplo, estrategia, glosario, acumulados, riesgo y liquidación. |
| `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_LIVE_018_GOLF_SCORE_CARD_GT_LIVE.md` | `PEND-LIVE-018` | Se calcula al publicar | Contrato GATE 0 de GOLF SCORE CARD GT. LIVE: permisos, privacidad, visor sin aplicación, seguimiento bilateral y torneo paginado sin máximo fijo. |
| `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_UBI_015_DETECCION_CAMPO_POR_GPS.md` | `PEND-UBI-015` | Se calcula al publicar | Especifica detección por GPS, catálogo geográfico, perímetros, propuesta confirmable, privacidad y prueba física por campo. |
| `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_RSG_016_SINCRONIZACION_REGLAS_GOLF.md` | `PEND-RSG-016` | Se calcula al publicar | Especifica fuente oficial, manifiesto de versión, SHA-256, caché reglamentaria, actualización, reversión y aislamiento del score. |
| `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` | Sello V311 | Se calcula al regenerar | Huella técnica que impide validar o publicar con inventarios desactualizados. |
| `CONTROL_PROYECTO_SCIRE/02_DOCUMENTOS_IMPORTANTES_PENDIENTES_DE_UTILIZAR/INDICE_DOCUMENTOS_PENDIENTES.md` | `064e9201c833cb7f5c751ba5328290d8c4c2b20b` | 814 bytes | Lista de documentos todavía pendientes de usar. |
| `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/CASOS_TERMINADOS.md` | `b9815c3eae588f1f54c0e4fabbf1d51b52c75b0e` | 722 bytes | Registro de trabajos terminados. |
| `CONTROL_PROYECTO_SCIRE/04_MATRIZ_DE_CAMPOS/INDICE_TARJETAS_ORIGINALES.md` | `2c2635943ce64a83e64012e71603193b74b35019` | 1161 bytes | Lista de tarjetas originales de los campos. |
| `CONTROL_PROYECTO_SCIRE/04_MATRIZ_DE_CAMPOS/course-source-registry.json` | `ded353ab838f8262ed164527057253baa158af13` | 2156 bytes | Lista de la fuente usada para cada campo. |
| `CONTROL_PROYECTO_SCIRE/05_MATRIZ_DE_ENLACES/ENLACES_OPERATIVOS.md` | `08efe817adea711aeb47f13eb4db82bc566dae0b` | 1373 bytes | Lista de enlaces importantes. |
| `CONTROL_PROYECTO_SCIRE/INVENTARIO_DESPLIEGUES_VERCEL.md` | `c923f084847ed19e64b6eb6e2fe49da8e8c1a02e` | 112764 bytes | Lista completa de las 622 publicaciones guardadas en Vercel. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | `Se genera con este mismo archivo` | Se calcula al publicar | Esta lista completa de archivos y explicaciones sencillas. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_INFRAESTRUCTURA.md` | `37cef275a8c9eb304be7da768856f156a3571bf1` | 25969 bytes | Mapa de GitHub, Vercel, ramas, datos, Apple y Android. |
| `CONTROL_PROYECTO_SCIRE/README.md` | `bf90db7aa0920319d8acf0fb5b1ef0a3f2cbc600` | 1196 bytes | Portada de la carpeta de control. |
| `COURSE_DATABASE.md` | `71825a1ef42d3fe82a6d767f2237a401189c7d23` | 2967 bytes | Lista qué información se guarda de cada campo. |
| `DATABASE_ARCHITECTURE.md` | `fd011e19326d2b4866f611a35def40ef3cd3c130` | 7173 bytes | Explica qué información central se guardará y cómo se protege. |
| `ECOS.md` | `43a9c6f5bacb8c758edd33c8ad31f9e59e63f84f` | 3982 bytes | Reglas de comportamiento de Golf Score Card GT. |
| `EPG-Caddy_Master_Blueprint_v0.1.md` | `95b4c227c4e5dce7f90fede0ebc9cdd0af6ed76c` | 7990 bytes | Plano maestro; el nombre del archivo es antiguo, pero el contenido ya usa Golf Score Card GT. |
| `EPG_CADDY_PLAN_CAMBIOS.md` | `a81981bda6522c0ab29ec5e70f6ebe557cde34bf` | 116300 bytes | Lista antigua de cambios; el nombre sólo se conserva para localizarla. |
| `GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md` | Registro V330 Preview PASS | Se calcula al publicar | Manual maestro con AI UNIVERSAL, Reglas oficiales, Skins, Wolf, Vegas, Dots, seis jugadores, tres parejas y estado honesto de validación. |
| `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md` | Registro V332 banco PASS / PEND-001–017 | Se calcula al publicar | Lista ordenada: juegos V332 con Q/$ y matriz completa pendientes de Preview/prueba física, fichas por modalidad, voz/tráfico físicos, ASOGOLF/GHIN, campos, GPS, relojes, nube, seguridad, estadísticas, monetización y certificación. |
| `MAPA_MATRIZ_BASE_MAESTRA_V256.md` | `8d0cdb23c0b1d9445f51b822ba49d385f5c71d3c` | 1718 bytes | Explica la información central incorporada en V256. |
| `MAPA_MATRIZ_REGISTRO_JUGADORES_V255.md` | `5d0670562aa89ffa7a265820573e0e31895fe95b` | 1993 bytes | Explica el registro de jugadores de V255. |
| `MAPA_MATRIZ_RONDA_PREVIA_V253.md` | `8194444ab5a8de1d77abaa7d39d0cb6e7a149548` | 2858 bytes | Explica Ronda previa desde V253. |
| `MAPA_MATRIZ_STABLEFORD_V252.md` | `8911a7ef86398e0c3f18e647433387a02645082c` | 3828 bytes | Explica las piezas de Stableford incorporadas en V252. |
| `README.md` | `e93c3adc84c81fdda07303f5d0f75fbb35140ea2` | 2170 bytes | Portada de GitHub que presenta el producto como Golf Score Card GT. |
| `ROADMAP_A_DETALLE.md` | Registro V305 | Se calcula al publicar | Abre el directorio, conserva el candado y registra a detalle la actualización V305. |
| `ROADMAP_OVERALL.md` | Registro V305 | Se calcula al publicar | Resumen general con el registro obligatorio de la actualización V305. |
| `ROADMAP_OVERALL_V291.png` | `2e7aaaaf4b7b337caa8750b17754d9173f8930fe` | 685254 bytes | Imagen vertical y sencilla del estado general para verla desde el teléfono. |
| `ROADMAP_IMAGES/ROADMAP_A_DETALLE_01.png` | `2377b6bba6c886a2fddac44b2d01fbc7ebf3f0ca` | 410461 bytes | Página 1 de 9 del directorio visual detallado. |
| `ROADMAP_IMAGES/ROADMAP_A_DETALLE_02.png` | `ba0d741c811283d33e53431b9a90cf3055a97bed` | 487065 bytes | Página 2 de 9 del directorio visual detallado. |
| `ROADMAP_IMAGES/ROADMAP_A_DETALLE_03.png` | `feb9f2f6ebab3b7321f6e741fb5c6886625cb0d7` | 414996 bytes | Página 3 de 9 del directorio visual detallado. |
| `ROADMAP_IMAGES/ROADMAP_A_DETALLE_04.png` | `8b1240dce80a451ff2274708317a303c220c2133` | 468658 bytes | Página 4 de 9 del directorio visual detallado. |
| `ROADMAP_IMAGES/ROADMAP_A_DETALLE_05.png` | `3277fc72250970281438c00eb11f1e29a2ffaf4f` | 455317 bytes | Página 5 de 9 del directorio visual detallado. |
| `ROADMAP_IMAGES/ROADMAP_A_DETALLE_06.png` | `0aa2913da74c26c396e114d9958f3d06e7f296b0` | 447637 bytes | Página 6 de 9 del directorio visual detallado. |
| `ROADMAP_IMAGES/ROADMAP_A_DETALLE_07.png` | `f29b846a85639291b546149fe3a819b1bca23115` | 459494 bytes | Página 7 de 9 del directorio visual detallado. |
| `ROADMAP_IMAGES/ROADMAP_A_DETALLE_08.png` | `50bb1bbb190bcee92bcecccc576d61bf2f89f44a` | 490283 bytes | Página 8 de 9 del directorio visual detallado. |
| `ROADMAP_IMAGES/ROADMAP_A_DETALLE_09.png` | `2375cd4734decbc33ea9e778d9ae292e19dacd34` | 407182 bytes | Página 9 de 9 del directorio visual detallado. |
| `ROADMAP_IMAGES/README.md` | `Se genera con este mismo archivo` | Se calcula al publicar | Índice sencillo de todas las imágenes detalladas del ROADMAP OVERALL. |
| `ROADMAP_IMAGES/01_ARCHIVOS_ACTIVOS_COMPLETO.png` | `b3ac32312aaaa986e64684793b56539cf22e9280` | 722840 bytes | Imagen con las 160 líneas de archivos activos, sus códigos y su explicación. |
| `ROADMAP_IMAGES/02_ARCHIVOS_RETIRADOS_COMPLETO.png` | `eb46364dc267183bf0d6e2863d26aa0c657eee65` | 443224 bytes | Imagen con los 89 archivos antiguos retirados y recuperables. |
| `ROADMAP_IMAGES/03_INFRAESTRUCTURA_COMPLETO.png` | `0f66e7ac0a000573ffeb9f613d88815c829f9fa0` | 393499 bytes | Imagen de GitHub, Vercel, Apple, Android, datos y sus IDs. |
| `ROADMAP_IMAGES/04_RAMAS_GITHUB_COMPLETO.png` | `b0b615d5c147373000e84dcba10fe01304100ce2` | 489643 bytes | Imagen con las 80 ramas de GitHub, su código y estado. |
| `ROADMAP_IMAGES/05_VERCEL_01_A_COMPLETO.png` | `a1cb219919df9d3c530799be9bf469863e59820f` | 638295 bytes | Primera imagen del bloque de publicaciones Vercel 1 a 156. |
| `ROADMAP_IMAGES/05_VERCEL_01_B_COMPLETO.png` | `f12aa1d1faa64eef046851e012e616ab0176093f` | 636874 bytes | Segunda imagen del bloque de publicaciones Vercel 1 a 156. |
| `ROADMAP_IMAGES/06_VERCEL_02_A_COMPLETO.png` | `424bdb42ee60ccdd299c5d09648144fe76d6301b` | 640724 bytes | Primera imagen del bloque de publicaciones Vercel 157 a 312. |
| `ROADMAP_IMAGES/06_VERCEL_02_B_COMPLETO.png` | `d5a041447df51e6e7aeb8bd8c237ce4cf930300e` | 533991 bytes | Segunda imagen del bloque de publicaciones Vercel 157 a 312. |
| `ROADMAP_IMAGES/07_VERCEL_03_A_COMPLETO.png` | `227e81e811a9dfff4ca83feaa6fcc35d1253b244` | 625741 bytes | Primera imagen del bloque de publicaciones Vercel 313 a 468. |
| `ROADMAP_IMAGES/07_VERCEL_03_B_COMPLETO.png` | `4037cfe4d9c5f6dbb731abcc37b4170e8f0359fb` | 585443 bytes | Segunda imagen del bloque de publicaciones Vercel 313 a 468. |
| `ROADMAP_IMAGES/08_VERCEL_04_A_COMPLETO.png` | `c0cd9ad1fba1b07dbd607db175230bdc8092c1b0` | 592363 bytes | Primera imagen del bloque de publicaciones Vercel 469 a 622. |
| `ROADMAP_IMAGES/08_VERCEL_04_B_COMPLETO.png` | `3e94c9fc0bab3b7d7c5450846316ccffb5ff4ba3` | 553541 bytes | Segunda imagen del bloque de publicaciones Vercel 469 a 622. |
| `STABLEFORD_TOURNAMENT_PASS_CHECKLIST.md` | `02838f5745be3f424ecf4250894da97bed61d201` | 4275 bytes | Lista de comprobaciones para cerrar un torneo Stableford. |
| `account-backup.js` | `a1b3fbe28a3807312acbb9aaee3750ee244c3f0c` | 4202 bytes | Muestra y controla el respaldo opcional de la cuenta. |
| `api/_lib/account-auth.js` | `2bd196110b8e57a9d7491b0d3e40527993026133` | 2128 bytes | Ayuda a reconocer la cuenta abierta. |
| `api/_lib/app-access.js` | R18-LAB acceso 24h | Se calcula al sellar | Identifica propietario, genera y valida tokens, revoca accesos y conserva únicamente métricas anónimas temporales. |
| `api/_lib/cors.js` | `dffb1f6c6254d826cf622406d48ddb1a19b9b875` | 1328 bytes | Permite que web, iPhone y Android se comuniquen. |
| `api/_lib/database.js` | `1e99935741e212ff9f0043197f82348972c2263c` | 453 bytes | Abre la información central. |
| `api/_lib/http.js` | `abf34ad0d937577da81c7cd56833eceeb231bf95` | 1625 bytes | Prepara respuestas para la app. |
| `api/_lib/sync-validation.js` | `b90cd0193c0606448a13e06e17cb34b359d18978` | 3713 bytes | Revisa que la información enviada esté completa. |
| `api/_lib/traffic.js` | Tráfico V324 | Se calcula al publicar | Consulta Google Maps Routes con tráfico óptimo, resume ETA/demora/distancia y excluye coordenadas de la respuesta. |
| `api/account.js` | `eec1c7ff408316ccaff98bcab968cd66bf92120c` | 2437 bytes | Abre, crea o cierra la cuenta opcional. |
| `api/app-access.js` | R18-LAB acceso 24h | Se calcula al sellar | Controla creación, canje, estado, revocación, reporte propietario y eliminación automática. |
| `api/backup.js` | `128c8f613861641f16ea5973d6592c8e50e46031` | 2174 bytes | Guarda y recupera respaldos. |
| `api/golf-rules.js` | `V328-OFFICIAL-USGA-RANDA-SOURCES` | Se calcula al publicar | Consulta Reglas de Golf con el modelo real, restringe fuentes a USGA/The R&A y nunca escribe scores ni penalidades. |
| `api/database-health.js` | `150c3e82b7e16d79613a2e341ac8fb1cf66de789` | 1307 bytes | Comprueba que el respaldo central responda. |
| `api/package.json` | `3dbc1ca591c0557e35b6004aeba250e6a70b56e3` | 23 bytes | Indica el formato que usan las puertas de la aplicación. |
| `api/score.js` | `6ecbef77ba0bd37519cd602e8c73596128f7547f` | 2545 bytes | Recibe resultados enviados por la app. |
| `api/session-grupal.js` | `4bd02dcd9cdc1fb4fada6ddb4fd8b7400d2280ee` | 5355 bytes | Abre el reconocimiento de voz grupal. |
| `api/session.js` | `454a914b435c6cadadd0a169fe065719eef475de` | 14431 bytes | Abre el reconocimiento de voz anterior. |
| `api/sync.js` | `82e4bdd482531f4ee6b41254652606d9f53e2251` | 3202 bytes | Intercambia cambios entre teléfono y respaldo. |
| `api/traffic.js` | Puerta de tráfico V324 | Se calcula al publicar | Recibe de forma protegida las solicitudes de tráfico por voz o texto y entrega un resultado recuperable sin mostrar mapa. |
| `api/voice-health.js` | Salud de voz V327 | Se calcula al publicar | Registra sólo etapas y tiempos técnicos permitidos; excluye preguntas, transcripciones, nombres, ubicaciones y claves. |
| `api/weather.js` | Piloto climático V312 | Se calcula al publicar | Consulta Open-Meteo por coordenadas GPS del teléfono, ubicación indicada o respaldo del campo y devuelve un resumen auditable. |
| `assets/logo.png` | `376f6237bbdddf4245ecd3da0f080ad5462f8178` | 514891 bytes | Logo cromado 3D neón de 1024 usado para crear iconos de iPhone y Android. |
| `assets/official-logos/README.md` | `d4c2f8e156b2f614d5992c477bc117c11a8ef2d7` | 1826 bytes | Explica que la versión cromada 3D con verde neón muy saturado es oficial y para qué sirve cada tamaño. |
| `assets/official-logos/golf-score-card-gt-app-store-1024.png` | `376f6237bbdddf4245ecd3da0f080ad5462f8178` | 514891 bytes | Icono cromado 3D neón oficial para App Store. |
| `assets/official-logos/golf-score-card-gt-apple-touch-180.png` | `ed44949eeb3aedad2ea1cf806091d216bc5e67e0` | 59579 bytes | Icono cromado 3D neón que aparece al instalar la web en iPhone o iPad. |
| `assets/official-logos/golf-score-card-gt-google-play-512.png` | `0e85cc6995f9bafefb49dec5a8253aef3db7fffd` | 461402 bytes | Icono cromado 3D neón oficial para Google Play. |
| `assets/official-logos/golf-score-card-gt-official-master-1254.jpeg` | `1c3cdacf565de7b2ce42d57bb416a23c50af1b8e` | 599880 bytes | Copia maestra del logo cromado 3D con verde neón muy saturado. |
| `assets/official-logos/golf-score-card-gt-pwa-192.png` | `e28cd92c784748a2d4ff02bf3491b96c8121ed94` | 67805 bytes | Icono cromado 3D neón pequeño de la aplicación instalable. |
| `assets/official-logos/golf-score-card-gt-pwa-512.png` | `0e85cc6995f9bafefb49dec5a8253aef3db7fffd` | 461402 bytes | Icono cromado 3D neón grande de la aplicación instalable. |
| `audit-project.mjs` | Auditoría V330 | Se calcula al publicar | Ejecuta 89 paquetes, candados, inventarios y filtros automáticos, incluidos Reglas, Skins, Wolf, Vegas y Dots. |
| `capacitor.config.json` | `a5ca52fde974ea370d90dbfe422f08101ec7f7eb` | 867 bytes | Define el nombre visible y la identidad de las apps de iPhone y Android. |
| `card-artifacts.js` | `df8ba2b09532b73701681d7de1781ca5b54baf26` | 12799 bytes | Arma la tarjeta oficial con la información de la ronda. |
| `card-file-export.js` | `4ddbf8f36ec142114cfa965a78d97ea55365afa1` | 5919 bytes | Convierte la tarjeta en imagen o PDF. |
| `card-library.js` | `adb1126087fc75ca15bd0164638a07c1bc6c41e1` | 2644 bytes | Guarda y muestra tarjetas anteriores en el teléfono. |

## R18-LAB · acceso propietario e invitado por 24 horas

| Archivo | Función exacta |
|---|---|
| `access.html` | Ruta histórica retirada; redirige a Registro y ya no autentica al propietario. |
| `api/_lib/app-access.js` | Identidad propietaria, token opaco, SHA-256, vigencia, revocación, métricas y purga. |
| `api/app-access.js` | API de canje, estado, creación, revocación, feedback, reporte y limpieza. |
| `middleware.js` | Registro libre; conserva sólo comprobaciones independientes de APIs y contexto de torneo. |
| `index-grupal.html` | Elimina el login obligatorio, la invitación general y el cierre por vencimiento de acceso. |
| `guest-access.js` | Aísla el almacenamiento de cada cuenta de torneo; ya no impone límite temporal global. |
| `package.json` | Dependencia oficial de middleware Vercel. |
| `vercel.json` | Limpieza horaria iniciada a las 47 horas. |
| `test-r18-owner-guest-24h-access.mjs` | Regresión dirigida de seguridad, privacidad y caducidad. |
| `audit-project.mjs` | Incorpora la regresión R18-LAB al banco integral. |
| `scripts/rebuild-inventory-pdfs.py` | Regenera los tres PDF con la identidad exacta del corte R18-LAB. |
| `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md` | Conserva el bloqueo real de identidad y prueba física previa a publicar. |
| `ROADMAP_A_DETALLE.md`, `ROADMAP_OVERALL.md` | Trazabilidad doble del mismo alcance. |
| `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` | Sello de 442 fuentes y tres inventarios PDF regenerados. |
| `commerce.js` | `7f6dcfa2ec518809c5a52616adb1f3c3dd84a36c` | 3301 bytes | Prepara compras y suscripciones dentro de las apps. |
| `database/001_initial_schema.sql` | `bb169249e1b965e88e3ae3b3d428a4eb5c240b5b` | 5809 bytes | Crea espacios para jugadores, rondas, resultados, tarjetas y entregas. |
| `database/002_player_profiles_and_history.sql` | `250d6c8bafddaba0abf33fbd1ba3fab7a4ec43f1` | 1473 bytes | Agrega el historial de cambios de jugadores. |
| `database/003_master_data_platform.sql` | `1e1b546db5a017c3ab721a6f027944a50371f7f4` | 27548 bytes | Agrega campos, torneos, copias de rondas y cambios de resultados. |
| `database/test-master-data-platform-schema.mjs` | `24517be27fb31df9b91391b12b4cc9d3dace3bb0` | 1385 bytes | Comprueba los espacios de la información central. |
| `database/test-player-profile-schema.mjs` | `32d0b6f78446a1193e8b2239b26f93738547b24b` | 817 bytes | Comprueba los espacios de la información central. |
| `database/test-schema.mjs` | `ad64ac3b0ed21932c24ea56886124f518a7b0692` | 1099 bytes | Comprueba los espacios de la información central. |
| `dots.js` | Motor V332 · moneda dual | Se calcula al publicar | Define cada evento en español, conserva Q/$, separa puntos positivos/negativos y automáticos/manuales, y calcula estado, impacto, acumulados y liquidación. |
| `four-ball.js` | Motor V330 de tres parejas | Se calcula al publicar | Compara el mejor Neto de una, dos o tres parejas Verde, Oro y Azul. |
| `historical-analytics.js` | `2a5bb2f2ef1564b09a567823efde14b54829ce86` | 8963 bytes | Resume el historial y muestra datos útiles de rondas anteriores. |
| `golf-rules-offline.js` | V328-R2 · caché oficial básica | Se calcula al publicar | Reutiliza hasta 24 respuestas USGA/The R&A confirmadas durante 90 días, por coincidencia y modalidad, sin consulta completa ni escritura de score. |
| `index-grupal.html` | Build V332 | Se calcula al publicar | Conserva la tarjeta principal y agrega radios Q/$ excluyentes, estados, riesgos, métricas, acumulados, líder y liquidación comprensible para Skins, Wolf, Vegas y Dots. |
| `index.html` | `7b483f1553246274920c71a10723f484d1847744` | 759569 bytes | Entrada antigua que lleva a la pantalla principal. |
| `ios/EPGCaddy/App.swift` | `06a1c8ee89139ef87af20f07bba2496aa2b90636` | 141 bytes | Inicia la aplicación de apoyo para iPhone. |
| `ios/EPGCaddy/ContentView.swift` | `80556289a09cc451f4e11e56f2f9d6a800a50a5f` | 208 bytes | Abre Golf Score Card GT dentro de la aplicación de iPhone. |
| `ios/EPGCaddy/Models/GolfCourse.swift` | `3a971e6aff4d70a07899f1341066b2adf7ebdac3` | 395 bytes | Describe la información de un campo dentro de iPhone. |
| `ios/EPGCaddy/Models/Round.swift` | `b2901e2c6a36f960556e352f81f75cf9c6c4c0d3` | 4388 bytes | Describe la información de una ronda dentro de iPhone. |
| `ios/EPGCaddy/WebView.swift` | `b648cbd53afa7cc703a8401a7a82cde9cff5cb0f` | 1631 bytes | Controla la pantalla dentro de la aplicación de iPhone. |
| `ios/project.yml` | `ef15575463a1913d778c7d8b8fb3dea237b0f4c7` | 976 bytes | Prepara el proyecto antiguo de iPhone con el nombre visible Golf Score Card GT. |
| `manifest.webmanifest` | `e1aabc9eb3e15e548b3603fbdccb6318d417e56c` | 842 bytes | Define el nombre, colores, inicio e iconos cuando la web se instala como app. |
| `master-data-sync.js` | `be2aade4553f95b389189fcf4225ece6d16deaad` | 8202 bytes | Mantiene igual la información del teléfono y del respaldo central. |
| `match-play.js` | Motor V330 de tres parejas | Se calcula al publicar | Resuelve hasta tres Matches independientes por Neto entre posiciones 1–2, 3–4 y 5–6. |
| `mobile-release.json` | Registro V305 | 76 bytes | Guarda la versión y el número 305 del próximo paquete móvil. |
| `mobile/native-runtime-entry.js` | `ffbe9107212932779e6c8e7e5017f4c178b62326` | 704 bytes | Conecta la pantalla con funciones propias del teléfono. |
| `package.json` | `08ff6dc440023e09a84e01e3885eeb8a285a73bf` | 1523 bytes | Lista dependencias y expone candados ROADMAP, inventarios y control visual del manual. |
| `player-registry.js` | `bf406d7b60803aedf1fd1d936de699d0cc95e0a5` | 11246 bytes | Guarda, encuentra y actualiza jugadores. |
| `round-closure.js` | `c31ec239f8a8184a5b2fb184a03f23080e39933b` | 3939 bytes | Cierra una ronda y conserva sus correcciones. |
| `round-navigation.js` | `5b5f4de45cfd1d0c05b4d2daf874465953887cf5` | 1967 bytes | Controla el paso entre ronda actual, ronda previa y pantalla principal. |
| `scripts/build-mobile-web.mjs` | `4efc155ed9330db2ee2fdc5dd9e5e9c76bd50dcd` | 2334 bytes | Prepara una copia de la web para meterla en las apps. |
| `scripts/configure-native-projects.mjs` | `fdb439880f7f4e18e1c57e303df5634ffa677c59` | 2911 bytes | Coloca versión, permisos y ajustes en iPhone y Android. |
| `scripts/prepare-mobile-assets.mjs` | `fcd2fa387095322c9731917834ad424ad3e8fd73` | 1356 bytes | Crea todos los tamaños oficiales del logo. |
| `scripts/prepare-native-release.mjs` | `447a576c6e370646166be976a6ec5ebcb2f7171d` | 2371 bytes | Prepara en un solo paso los proyectos de iPhone y Android. |
| `scripts/roadmap-gate.mjs` | `94694d94a956dc7a62fb17697447f5fb4916617c` | 2881 bytes | Bloquea cualquier modificación o publicación que no aparezca en ambos ROADMAPS. |
| `service-worker.js` | Caché V332 | Se calcula al publicar | Fuerza `gscg-mobile-v332-dual-currency-matrix` e incluye Reglas offline y los motores Skins, Wolf, Vegas y Dots. |
| `skins.js` | Motor V332 · moneda dual | Se calcula al publicar | Calcula Skins Gross/Neto para dos a seis jugadores con Q/$, carry, división o anulación, X, acumulados, líder y saldo cero-suma. |
| `stableford-countryclub-emergency.html` | `99b1f8b17f1bc077bbfe43e6af668eff6ebb33d7` | 688 bytes | Acceso antiguo de emergencia; se conserva para no romper enlaces. |
| `stableford-course-source-mayan-golf.md` | `bd6b7632cc2da5d964ecd8358062cd06a7a564fc` | 660 bytes | Fuente usada para cargar la tarjeta de Mayan Golf. |
| `stableford-course-source-san-isidro.md` | `b370db591d5139895c9586801d55b57b3bcf0359` | 505 bytes | Fuente usada para cargar la tarjeta de San Isidro. |
| `stableford-torneo.html` | `b80abecdc60a1a0f72a1c083ea2a0ad217e3bf71` | 14321 bytes | Entrada antigua de Stableford que ahora lleva a la pantalla principal. |
| `stableford.js` | Registro V305 | Se calcula al publicar | Mantiene las reglas Scratch y muestra una guía que pide únicamente número de jugador, nombre, máximo seis y OK. |
| `sync-queue.js` | `472255acb2a293433df36ddd207257e14e256961` | 2510 bytes | Guarda cambios que todavía no se han enviado. |
| `test-card-artifacts.mjs` | `476f031924639d2ff88d4b296ceb83a197b6cd1c` | 2461 bytes | Comprueba la creación, guardado o entrega de tarjetas. |
| `test-country-club-official.mjs` | `bfc863c01fa6f4d42dda2d85ae07f0f940bd0187` | 2135 bytes | Comprueba la información y selección de campos. |
| `test-course-catalog.mjs` | Registro V305 | Se calcula al publicar | Comprueba los campos, prohíbe las falsas casillas antiguas y reconoce la guía vigente del máximo de seis jugadores. |
| `test-historical-analytics.mjs` | `4e182ac2115f70a637cfae27e74a8f9f2b87fd19` | 1185 bytes | Comprueba el historial y sus resúmenes. |
| `test-master-data-sync.mjs` | `e217fce804954c18707ec96ef210bcdbca1408c1` | 2397 bytes | Comprueba el respaldo y el envío de cambios. |
| `test-no-automatic-x.mjs` | `f533babe3998f1adebde2d205fe484d825eef48d` | 766 bytes | Comprueba que una función anterior siga trabajando correctamente. |
| `test-player-registry.js` | `483442fe665d3acfa0f89ff7a003ba8a35d1502e` | 3868 bytes | Comprueba nombres y registro de jugadores. |
| `test-project-control-matrix.mjs` | `fea5b0fac955453accc0bd39384711fa40b19e43` | 1954 bytes | Comprueba que una función anterior siga trabajando correctamente. |
| `test-round-clock.mjs` | `a540500f78b0dde9260dce7af1a2ef92b9a43546` | 4714 bytes | Comprueba resultados, hoyos o movimientos entre rondas. |
| `test-round-closure.mjs` | `d3b55e759f0438d6b8f3c964aae3c042143bb12b` | 1929 bytes | Comprueba resultados, hoyos o movimientos entre rondas. |
| `test-round-information.mjs` | `b60b7758f93b097735a17f38512140b07f5d9145` | 1343 bytes | Comprueba resultados, hoyos o movimientos entre rondas. |
| `test-score-engine.mjs` | `c2f5b414cee181ddb258a8428994047569c734be` | 2274 bytes | Comprueba resultados, hoyos o movimientos entre rondas. |
| `test-stableford-clean-roster-history.mjs` | `ebd4ff538e30daa177fcaa19df2238f160b48e3a` | 2228 bytes | Comprueba una regla o pantalla de Stableford. |
| `test-stableford-manual.mjs` | `a9fe6953069c7f5499d4d79f102fbd1aef3e5fba` | 707 bytes | Comprueba una regla o pantalla de Stableford. |
| `test-stableford-torneo.mjs` | `6338e44cd23a40d3899e3285be5c88e5e1f3a8f5` | 2703 bytes | Comprueba una regla o pantalla de Stableford. |
| `test-stableford-ui.mjs` | `106993de13c2938c193c21cb9dad8419fd2bd42e` | 3034 bytes | Comprueba una regla o pantalla de Stableford. |
| `test-stableford.mjs` | `512745f133b00b2f11dd9a318964e202df537412` | 3711 bytes | Comprueba una regla o pantalla de Stableford. |
| `test-sync-api.mjs` | `a100695e6f9c39372de5f7d819424de88f8e663e` | 1211 bytes | Comprueba el respaldo y el envío de cambios. |
| `test-sync-auth.mjs` | `fc88d68a78f514a392e0b483102386a56c07fe8f` | 782 bytes | Comprueba el respaldo y el envío de cambios. |
| `test-sync-queue.mjs` | `dfec87a82b1ba9874e3070ca347ad45f8a15eb88` | 1083 bytes | Comprueba el respaldo y el envío de cambios. |
| `test-v193-visual-provisional.mjs` | `a7d86253463b61d534840a2be7833e0c4f7f40fa` | 1778 bytes | Comprueba que una función anterior siga trabajando correctamente. |
| `test-v250-stableford-delivery-matrix.mjs` | `7f2cf9da3940e85f818540e03164d26fc5c22858` | 991 bytes | Comprueba una regla o pantalla de Stableford. |
| `test-v252-stableford-persistence-category-course.mjs` | `d98492914be7cc5b841502d50413dd01368ec015` | 3030 bytes | Comprueba una regla o pantalla de Stableford. |
| `test-v253-live-previous-round.mjs` | `b4703fcd9c6f4fc62d2e3b777048e7d131cd81b9` | 3961 bytes | Comprueba resultados, hoyos o movimientos entre rondas. |
| `test-v254-remove-registration-guide.mjs` | `d187443a3313198b43a8980d88ba0015c1644ad9` | 895 bytes | Comprueba nombres y registro de jugadores. |
| `test-v255-player-registration-boxes-codes.mjs` | Registro V305 | Se calcula al publicar | Comprueba la guía visual Dicta o escribe, Nombre, HDCP, Marcas y OK. |
| `test-v256-master-data-platform.mjs` | `ec16af9be11c0ed717de9d1ecd46806d849591bd` | 1725 bytes | Comprueba que una función anterior siga trabajando correctamente. |
| `test-v257-stableford-course-selector-title.mjs` | `fa107447ac98126aef5362ffde04433b85d64249` | 4584 bytes | Comprueba una regla o pantalla de Stableford. |
| `test-v258-stableford-readonly-manual-plan-b.mjs` | `e87b114e8756d360ee2c8ce9a5eba8c3d2c18c99` | 1944 bytes | Comprueba una regla o pantalla de Stableford. |
| `test-v259-stableford-hide-unused-player-rows.mjs` | `ff1012fedc358510e62dead2deecdd35e4245072` | 2055 bytes | Comprueba una regla o pantalla de Stableford. |
| `test-v260-round-points-player-return.mjs` | Registro V305 | Se calcula al publicar | Comprueba retorno, puntos y aislamiento de modalidades con la persistencia Stableford vigente. |
| `test-v261-registration-stableford-modality.mjs` | Registro V305 | Se calcula al publicar | Comprueba Ronda Normal, Stableford, Score Card - Práctica y la guía homogénea vigente. |
| `test-v262-provisional-optional-profile.mjs` | Registro V305 | Se calcula al publicar | Conserva los perfiles opcionales y exige el nombre vigente Score Card - Práctica sin recuperar Ronda sin registro. |
| `test-v263-compact-players-back-button.mjs` | `9c680c66c293baaf76c67e1bd324002289e7fca9` | 4840 bytes | Comprueba nombres y registro de jugadores. |
| `test-v264-previous-round-responsive-names.mjs` | `41307f04e0af3b899354fd8c91574c08cc2dfc54` | 3287 bytes | Comprueba resultados, hoyos o movimientos entre rondas. |
| `test-v265-first-nine-automatic-result.mjs` | `28fc90b78fee5c718d7806630e3fa51e2ffa38cd` | 2111 bytes | Comprueba que una función anterior siga trabajando correctamente. |
| `test-v266-stableford-segment-gross-points.mjs` | `9189835090fdddb8f6ef31c194dae0546cc83832` | 4267 bytes | Comprueba una regla o pantalla de Stableford. |
| `test-v267-one-operational-line.mjs` | `e9abda4303af99ddf0a582e90a7bbc3cffb11eea` | 11666 bytes | Comprueba que una función anterior siga trabajando correctamente. |
| `test-v267-scorecard-combination-matrix.mjs` | `03344841179261669393329f88465ac0a71540a8` | 5450 bytes | Comprueba la creación, guardado o entrega de tarjetas. |
| `test-v268-control-manual-demo-link.mjs` | `a36ad20c15cbfccf43338a0c95506efb2f2de99a` | 4784 bytes | Comprueba que una función anterior siga trabajando correctamente. |
| `test-v269-operational-matrix-demo.mjs` | `ddc6a3f378b7976e87c3b7e99489bf95c081a0dd` | 6145 bytes | Comprueba que una función anterior siga trabajando correctamente. |
| `test-v270-consecutive-hole-voice-blocks.mjs` | `f3cc3fd87fd741f4b547ad946038cf12cd3adc60` | 11344 bytes | Comprueba el registro y la continuidad por voz. |
| `test-v271-realtime-prompt-limit.mjs` | `144c0bbe2804657caad36330e1dac906f2c79b4b` | 1445 bytes | Comprueba el registro y la continuidad por voz. |
| `test-v272-definitive-operational-release.mjs` | `68ff5dd7f6b27a85a6dca4b2e2f9bc917913f0d3` | 5506 bytes | Comprueba que una función anterior siga trabajando correctamente. |
| `test-v273-san-isidro-alta-vista.mjs` | `c55c62c43708c6d44f50763f166f1eba2269a72f` | 3898 bytes | Comprueba la información y selección de campos. |
| `test-v274-complete-courses-voice-operations.mjs` | `95eca6a6f0ccd9efe9e4713df6eb8042e3ac8af2` | 5251 bytes | Comprueba el registro y la continuidad por voz. |
| `test-v275-stable-live-voice-turns.mjs` | `a572550b373551687c35450942c1cda4f80854e6` | 4502 bytes | Comprueba el registro y la continuidad por voz. |
| `test-v276-manual-hole-navigation.mjs` | `e70869331ddb9a32242c3f99505c6ed38ff94bcb` | 2198 bytes | Comprueba resultados, hoyos o movimientos entre rondas. |
| `test-v277-official-round-corrections.mjs` | `29ad94466e80be86af12992e7bf5c4dc533f0e4d` | 2979 bytes | Comprueba resultados, hoyos o movimientos entre rondas. |
| `test-v278-card-image-pdf-export.mjs` | `9b1a24c31647786e7bb9c5bfc3bcc3a21a41f8c4` | 2363 bytes | Comprueba la creación, guardado o entrega de tarjetas. |
| `test-v279-local-card-library.mjs` | `c440ce70d75d3cf39d99af9eb9c5a7fc8aa72307` | 2723 bytes | Comprueba la creación, guardado o entrega de tarjetas. |
| `test-v280-local-history-insights.mjs` | `30deb21f9be14e8ff7c130373f6b91009f568dd2` | 2235 bytes | Comprueba el historial y sus resúmenes. |
| `test-v281-pwa-installation.mjs` | `f73d01e3ac1dd680b473c30a9fd21a41146d32cd` | 1453 bytes | Comprueba que una función anterior siga trabajando correctamente. |
| `test-v282-optional-account-backup.mjs` | `c4483e779a1ad0c97c0e29f119f6f0fb0d2eff7f` | 2447 bytes | Comprueba que una función anterior siga trabajando correctamente. |
| `test-v283-native-commercial-readiness.mjs` | `8f80a7f75e0700c02b30ef54016732c0d303e5e0` | 3657 bytes | Comprueba que una función anterior siga trabajando correctamente. |
| `test-v284-native-package-generation.mjs` | `7d1a8183c6fb6fbbdc492cfb521c4d275f819491` | 1748 bytes | Comprueba que una función anterior siga trabajando correctamente. |
| `test-v285-stableford-back-navigation.mjs` | `1202bd6751841ea0d9dfcc55330621ac55f07b98` | 763 bytes | Comprueba que exista Atrás al entrar a Stableford. |
| `test-v286-stableford-back-restores-home.mjs` | `3d8bce123de3e370c2ec5ef68b93b4ee214875aa` | 707 bytes | Comprueba que Atrás regrese a la pantalla principal completa. |
| `test-v287-stableford-back-controls-clear.mjs` | Registro V305 | Se calcula al publicar | Comprueba que Regístrate permanezca dentro del flujo y no tape Atrás ni + Jugador. |
| `test-v288-stableford-one-touch-home.mjs` | `bf4b127fdfb288b01f55a506f80dd92445855e5c` | 2078 bytes | Comprueba que Atrás regrese al inicio con un toque. |
| `test-v289-stableford-new-round-empty.mjs` | `bcb1295e20116ea9cde8b86ad96b5f8c366e626e` | 2005 bytes | Comprueba que Nueva ronda deje vacíos los nombres. |
| `test-v290-brand-icons-cleanup.mjs` | Registro V305 | Se calcula al publicar | Conserva las comprobaciones de registro y valida paquete y caché V305. |
| `test-v304-homogeneous-registration-actions.mjs` | Registro V305 | Se calcula al publicar | Conserva el control de vocabulario, guía, micrófono, fuente, peso, tamaño, altura, brillo y estado. |
| `test-v305-history-navigation-zero-error.mjs` | Registro V305 | Se calcula al publicar | Audita Historial, Atrás, Regístrate, superposiciones, validación Stableford, versión y caché. |
| `test-v305-registration-guides-parser-truth.mjs` | Registro V305 | Se calcula al publicar | Ejecuta ambos analizadores reales y bloquea guías falsas, HDCP o marcas visibles en Stableford y estados de OK incoherentes. |
| `test-v329-skins.mjs` | Banco V332 | Se calcula al publicar | Prueba Skins con Q/$, acumulados, cierre, corrección, tarjetas, Historial, nube, restauración, voz y pantalla principal intacta. |
| `test-v330-side-games.mjs` | Banco V332 | Se calcula al publicar | Prueba selección única, ocho radios Q/$, riesgo/tope Wolf, birdies y score 10+ Vegas, matriz Dots, cero-suma, cierre, corrección y persistencia integral. |
| `test-voice-continuity.mjs` | `c837646c800161cc827e5c66927bbd682305c6e5` | 1717 bytes | Comprueba el registro y la continuidad por voz. |
| `vegas.js` | Motor V332 · moneda dual | Se calcula al publicar | Calcula dos o tres parejas con Q/$, scores de 10+, birdies simultáneos configurables, volteos, águila, topes, riesgo, acumulados y liquidación cero-suma. |
| `vercel.json` | V330 | Se calcula al publicar | Publica inicio y manual; exige auditoría integral y consulta real con fuente USGA/The R&A antes de entregar Preview. |
| `verify-manual-sync.mjs` | `df56ae83b57d5ee4d6273f36be1db9350e1b2c9c` | 731 bytes | Comprueba que la firma documental de la aplicación coincida con la versión del manual maestro. |
| `wolf.js` | Motor V332 · moneda dual | Se calcula al publicar | Calcula Wolf de tres a seis jugadores con Q/$, pareja/Lobo solitario/Lobo ciego, orden, riesgo, tope, carry, unidades netas, acumulados y pago por diferencia. |
| `manual.html` | Registro V314 ampliado | Se calcula al publicar | Visor permanente con portada, 73 páginas funcionales, índice por categorías, lupa de lenguaje natural, navegación, app y descarga PDF. |
| `manual.webmanifest` | `2c07adafaa323be295c05b927c1418c712bd514a` | 456 bytes | Instala MANUAL SCG como acceso independiente al manual completo. |
| `scripts/manual-visual-qc.py` | Registro V314 ampliado | Se calcula al publicar | Filtro obligatorio de 74 imágenes, resolución 4K, densidad, márgenes, color y equilibrio editorial. |
| `scripts/inventory-gate.mjs` | `3e1d28a73526c50858b68df85a64f35086efc96e` | 2234 bytes | Bloquea auditoría y publicación si los tres inventarios no coinciden con las fuentes activas. |
| `scripts/update-inventory-v328.py` | Portadas V332 reproducibles | Se calcula al publicar | Actualiza los tres inventarios PDF con moneda Q/$, matriz de acumulados y riesgos, Skins, Wolf, Vegas, Dots y bloqueos reales, sin duplicar la portada al repetirlo. |
| `test-v311-manual-hosting.mjs` | Registro V314 ampliado | Se calcula al publicar | Comprueba visor, acceso MANUAL SCG, PDF físico de 74 páginas, marcadores internos y las 74 imágenes 4K. |
| `docs/manual/v311/Manual_de_Funciones_Golf_Score_Card_GT_01-16.pdf` | Alias estable V314 | Se calcula al publicar | Copia completa de 74 páginas conservada bajo el nombre histórico para no romper enlaces existentes. |
| `docs/manual/v311/page-00.png` | `f2558f664e2df29292a09c2ede9ef799b1f54541` | 3526431 bytes | Portada 4K aprobada con logo al 50% de saturación. |
| `docs/manual/v311/manual-scg-escritorio-4k.png` | `e1614c0f8415dc735d003b4e5b38cb0a5a1be308` | 2273808 bytes | PNG cuadrado 4K del acceso MANUAL SCG. |
| `docs/manual/v311/manual-scg-escritorio-4k.jpg` | `4ca08447591bc66820a43627f97d75ebdf2c6a34` | 663088 bytes | JPG cuadrado 4K optimizado para descarga desde iPhone. |
| `docs/manual/v311/page-01.png` | `df5f83560dfe77b381c0048844c081ff296f0f79` | 744315 bytes | Página 01 4K del manual. |
| `docs/manual/v311/page-02.png` | `65141cded163551cb57432fa243241dca2cfec22` | 762172 bytes | Página 02 4K del manual. |
| `docs/manual/v311/page-03.png` | `1bc21951ba865a5130cad515cde77ec7a59a6003` | 629721 bytes | Página 03 4K del manual. |
| `docs/manual/v311/page-04.png` | `b01b3d166e6065f493230993bfda865773f45fa0` | 744844 bytes | Página 04 4K del manual. |
| `docs/manual/v311/page-05.png` | `b86aab515e1984428a89de7a586a555b4f414c52` | 763925 bytes | Página 05 4K del manual. |
| `docs/manual/v311/page-06.png` | `caa3cc934e1fed14455582835642b3a4bf980023` | 673665 bytes | Página 06 4K del manual. |
| `docs/manual/v311/page-07.png` | `62d9408cc462c9ec15449eb68c0105972fc0d08d` | 669371 bytes | Página 07 4K del manual. |
| `docs/manual/v311/page-08.png` | `53625d46ab08ad861e3190fe0b21ae5f4dc59d1f` | 854835 bytes | Página 08 4K Match Play. |
| `docs/manual/v311/page-09.png` | `f90cf53a6d1f11f8d9c01b6540be365e8cc267ba` | 836105 bytes | Página 09 4K Four Ball. |
| `docs/manual/v311/page-10.png` | `52c50b67f5957ec62f90abc7cc05371eece411f9` | 795611 bytes | Página 10 4K de El Pulté Golf. |
| `docs/manual/v311/page-11.png` | `150eb1a59909a4519fa7f42e774708814d9fc00c` | 834415 bytes | Página 11 4K de Guatemala Country Club. |
| `docs/manual/v311/page-12.png` | `b1b9bca2d050fc31560b9611262970943bb5236c` | 875197 bytes | Página 12 4K de San Isidro. |
| `docs/manual/v311/page-13.png` | `7e5804731a94bd2602442c609313994755ea60bb` | 759283 bytes | Página 13 4K de Mayan Golf. |
| `docs/manual/v311/page-14.png` | `7f03343602d602c3d43d13faf42b05474a32939e` | 728904 bytes | Página 14 4K de Hacienda Nueva Country Club. |
| `docs/manual/v311/page-15.png` | `24b5a9a1d57315aecc34567643ff4f84bacca44e` | 709854 bytes | Página 15 4K de Alta Vista Golf & Tennis Club. |
| `docs/manual/v311/page-16.png` | `44f26965efce63a2980baec99f3c7877c2a70a9a` | 322915 bytes | Página 16 4K: plantilla vacía de La Reunión durante su reconstrucción total. |
| `docs/manual/v311/Manual_Golf_Score_Card_GT_COMPLETO.pdf` | PDF completo | Se calcula al publicar | Portada más 73 páginas, índice PDF interno y contenido funcional ampliado. |
| `docs/manual/v311/manual-pages-17-35.json` | Fuente páginas 17–73 | Se calcula al publicar | Contenido estructurado del manual ampliado y mapa de voz. |
| `MANUAL_COBERTURA_FUNCIONAL_V311.md` | Matriz de cobertura | Se calcula al publicar | Relaciona funciones, páginas y pruebas automáticas. |
| `manual-search.js` | Buscador natural | Se calcula al publicar | Interpreta preguntas completas y dirige a la explicación correspondiente. |
| `voice-assistant.js` | Asistente de voz seguro | Se calcula al publicar | Distingue ayuda, navegación, consultas y scores sin acciones destructivas automáticas. |
| `timer-inactivity.js` | Control de inactividad | Se calcula al publicar | Calcula el límite común de 30 minutos y determina cuándo debe ponerse el TIMER en OFF. |
| `scripts/publish-manual-pages.py` | Publicador 4K | Se calcula al publicar | Publica atómicamente las páginas renderizadas y verifica 2160 × 4320 y 300 dpi. |
| `test-v311-manual-search.mjs` | Candado de búsqueda | Se calcula al publicar | Comprueba frases naturales, resultados y categorías. |
| `test-v311-manual-semantic-coverage.mjs` | Candado semántico | Se calcula al publicar | Comprueba la cobertura funcional de las 73 páginas. |
| `test-v311-manual-voice-map.mjs` | Candado de voz | Se calcula al publicar | Verifica vocabulario oficial, consultas y respuestas documentadas. |
| `test-v311-voice-assistant.mjs` | Candado del asistente | Se calcula al publicar | Comprueba ayuda, navegación y separación de los scores reales. |
| `test-v312-general-caddie.mjs` | Candado conversacional V322 | Se calcula al publicar | Comprueba conversación abierta, GPS primero, clima visible y periódico, respaldo por campo, micrófono manual, salud, score protegido y escucha sostenida. |
| `test-v322-real-sustained-caddie.mjs` | `V322-24-TURNS-RECOVERY` | Se calcula al publicar | Simula 24 turnos consecutivos, reapertura de una sesión sana, cierre a los 30 minutos y fallos web recuperables sin silencio. |
| `test-v323-long-multitopic-context.mjs` | `V323-30-TOPICS-63-MESSAGES` | Se calcula al publicar | Exige que texto y voz conserven la primera clave después de 30 cambios de tema y sólo descarten historial al superar 80 mensajes. |
| `test-v324-real-traffic.mjs` | `V324-CURRENT-FUTURE-TRAFFIC-RECOVERY` | Se calcula al publicar | Prueba tráfico actual/futuro, ETA, demora, privacidad, GPS, texto, voz, proveedor caído, timeout y continuación bilateral. |
| `test-v325-ideal-microphone-timings.mjs` | `V326-30-BILATERAL-TURNS` | Se calcula al publicar | Conserva 30 turnos y sustituye la expectativa semántica no determinista por la pausa conversacional fija de 2.2 segundos. |
| `test-v326-no-silent-conversation.mjs` | `V326-INPUT-15S-HARD-90S-RESPONSE-30S` | Se calcula al publicar | Ejecuta la máquina de temporizadores y comprueba que una captura sin final apaga el rojo y que una respuesta sin inicio vuelve a escuchar. |
| `test-v327-tool-followup-no-silence.mjs` | `V327-550-SEQUENCES-100-PRIVATE-EVENTS` | Se calcula al publicar | Prueba cierres tardíos con/sin ID, audio final, tres guardianes, ruta ambigua y telemetría sin contenido. |
| `test-v328-official-golf-rules.mjs` | `V328-15-RULE-SCENARIOS-OFFICIAL-ONLY` | Se calcula al publicar | Prueba 15 situaciones, dominios USGA/R&A, texto/voz y que ninguna consulta modifique la tarjeta. |
| `test-v328-live-official-rules.mjs` | `V328-REAL-MODEL-WEB-OFFICIAL-SOURCE` | Se calcula al publicar | Puerta exclusiva de Vercel: exige modelo real, búsqueda web, fuente USGA/The R&A y cero cambio de score. |
| `test-v328-offline-official-rules.mjs` | `V328-R2-OFFICIAL-OFFLINE-PRIVACY-ZERO-SCORE` | Se calcula al publicar | Prueba 24 entradas, 90 días, fuente oficial, privacidad, modalidad, coincidencias negativas, PWA y cero escritura. |
| `test-v311-timer-inactivity.mjs` | Candado TIMER 30 minutos | Se calcula al publicar | Comprueba el apagado en todas las modalidades, persistencia y reinicio por instrucción válida. |
| `docs/manual/v311/page-17.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-18.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-19.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-20.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-21.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-22.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-23.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-24.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-25.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-26.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-27.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-28.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-29.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-30.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-31.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-32.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-33.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-34.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-35.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-36.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-37.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-38.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-39.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-40.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-41.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-42.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-43.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-44.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-45.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-46.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-47.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-48.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-49.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-50.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-51.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-52.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-53.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-54.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-55.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-56.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-57.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-58.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-59.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-60.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-61.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-62.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-63.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-64.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-65.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-66.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-67.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-68.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-69.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-70.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-71.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-72.png` | 4K · 300 dpi | Se calcula al publicar | Página funcional ampliada del manual oficial. |
| `docs/manual/v311/page-73.png` | V328 · 4K · 300 dpi | Se calcula al publicar | Explica AI UNIVERSAL y REGLAS oficiales, las fuentes y por qué una consulta no cambia la tarjeta. |

## Registro obligatorio de la documentación operativa V300

| Archivo nuevo o modificado | ID o código actualizado | Explicación sencilla |
|---|---|---|
| `COMPENDIO_FINAL_FUNCIONES_USUARIO.md` | `ac985b34d6d279c903e39f4457fccfd57832b53d` | Documento final y amigable que explica al consumidor todas las funciones disponibles. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Se genera con este mismo mapa | Agrega el compendio y actualiza el directorio a 186 archivos activos. |
| `ROADMAP_A_DETALLE.md` | `a26ff673efceb4c724a01161cd44e81963e436c2` | Registra la documentación V300 a detalle. |
| `ROADMAP_OVERALL.md` | `4a1c9f3121f4898f7292942270b328146a9402b5` | Registra la documentación V300 en el resumen general. |

## Registro obligatorio de la actualización operativa V301

| Archivo modificado | ID o código actualizado | Explicación sencilla |
|---|---|---|
| `index-grupal.html` | `9e33d3e34f4181dbcefa3ad7ec15ae0faf51a275` | Agrega RONDA NORMAL, cambia la modalidad rápida a SCORE CARD - PRÁCTICA y guarda la descripción opcional del torneo. |
| `COMPENDIO_FINAL_FUNCIONES_USUARIO.md` | `f399765ed3de72bcee3d30c57629b966aeda5495` | Actualiza el manual con las tres modalidades y el registro opcional. |
| `mobile-release.json` | `7bc5ae9678c842359b69cbc7f23c0a0592c6427a` | Prepara el paquete móvil número 301. |
| `service-worker.js` | `d500b7894dcae221ea8c97eeaa88a42adc1f8fd6` | Entrega la pantalla nueva y retira la caché anterior. |
| `test-v290-brand-icons-cleanup.mjs` | `acd1203caf98fd42798891253b8d4a40f4b4defa` | Valida nombres, campo opcional, paquete y caché V301. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Se genera con este mismo mapa | Actualiza los códigos y explicaciones de V301. |
| `ROADMAP_A_DETALLE.md` | `3ac14246852995f82c67cd29362fc4f6d0eafac8` | Registra V301 a detalle. |
| `ROADMAP_OVERALL.md` | `ed9f443be1b0591201e98b208ad8c21e2af3f817` | Registra V301 en el resumen general. |

## Registro obligatorio de la actualización operativa V302

| Archivo modificado | ID o código actualizado | Explicación sencilla |
|---|---|---|
| `stableford.js` | `f97d34333ec6f8e85f4734ce25adb935225f3725` | Adopta exactamente el encabezado, la guía, el SVG y el tamaño compacto del micrófono de la Score Card General sin cambiar el motor de voz. |
| `mobile-release.json` | `6554704e52000dd7e5db80c7f798c84e02983b1a` | Prepara el paquete móvil número 302. |
| `service-worker.js` | `99e3f2f8105d27aa67b6bfad2384bace8c7c6bdb` | Entrega la actualización V302 y retira la caché anterior. |
| `test-v290-brand-icons-cleanup.mjs` | `699991bd6abafbfcb15c64daf58c2b809f113e2d` | Valida encabezado, estructura, guía, SVG, tamaño, paquete y caché V302. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Se genera con este mismo mapa | Conserva el inventario integral de V302. |
| `ROADMAP_A_DETALLE.md` | Registro V302 | Registra V302 a detalle. |
| `ROADMAP_OVERALL.md` | Registro V302 | Registra V302 en el resumen general. |

## Registro obligatorio de la actualización operativa V303

| Archivo modificado | ID o código actualizado | Explicación sencilla |
|---|---|---|
| `index-grupal.html` | `7c264cd227aa189fcbb2f4214e398ba629d8b7a3` | Cambia INICIAR RONDA por OK únicamente al crear una ronda Stableford. |
| `stableford.js` | `343cfa8bae3fa0fffe960f8ea7762deb50f487b1` | Cambia el aviso posterior al dictado para indicar PRESIONA OK. |
| `mobile-release.json` | `0365842ae0931a6d7689bf23d8c54770ceae2b62` | Prepara el paquete móvil número 303. |
| `service-worker.js` | `1342818d0485fe3698fe3eb7dc861608c2526e94` | Entrega la actualización V303 y retira la caché anterior. |
| `test-v290-brand-icons-cleanup.mjs` | `a12df8154897114bbd181828776fe8a93d231ceb` | Valida los dos textos OK, el paquete y la caché V303. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Se genera con este mismo mapa | Conserva el inventario integral de V303. |
| `ROADMAP_A_DETALLE.md` | Registro V303 | Registra V303 a detalle. |
| `ROADMAP_OVERALL.md` | Registro V303 | Registra V303 en el resumen general. |

## Registro obligatorio de la actualización operativa V304

| Archivo nuevo o modificado | ID o código actualizado | Explicación sencilla |
|---|---|---|
| `index-grupal.html` | `928655f9a1a0332e3dd3b4fb7586a119f96f69e6` | Unifica las acciones de General y Stableford con la misma fuente, peso 900, tamaño cercano a 30 % mayor y la misma altura de OK; el OK bloqueado de Stableford deja de verse gris. |
| `mobile-release.json` | `0f35238d7204c7a23fdeed1ba26beea26d57c923` | Prepara el paquete móvil número 304. |
| `service-worker.js` | `1b9d4ecfe29b5b52a961c1990b02b54b1887bcda` | Entrega la actualización V304 y retira la caché anterior. |
| `test-v290-brand-icons-cleanup.mjs` | `d93114419e6827fcf23fc9f0eaa21922598e0bd8` | Mantiene la validación histórica alineada con paquete y caché V304. |
| `test-v304-homogeneous-registration-actions.mjs` | `acd09d5c04677ef60a37b07b2d748c8c26db53a6` | Instala el control de calidad automático para impedir diferencias de vocabulario, instrucciones, micrófono y línea gráfica compartida. |
| `audit-project.mjs` | `35e94709bf7d2417707776fbd5a82e4ef5d9f335` | Agrega el nuevo control V304 a la auditoría maestra. |
| `.github/workflows/roadmap-gate.yml` | `55d607666ade5f730121d42900f02b1463a274f3` | Bloquea en GitHub cualquier cambio que rompa el contrato gráfico y descriptivo de las tarjetas hermanas. |
| `vercel.json` | `8735afbd1185aba7d85605459312ed24e95d8172` | Impide que Vercel publique si el filtro de tarjetas hermanas falla. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Se genera con este mismo mapa | Conserva el inventario integral de los once archivos V304 y eleva el total activo a 187. |
| `ROADMAP_A_DETALLE.md` | Registro V304 | Registra V304 a detalle. |
| `ROADMAP_OVERALL.md` | Registro V304 | Registra V304 en el resumen general. |

## Registro obligatorio de la actualización operativa V305

| Archivo nuevo o modificado | ID o código actualizado | Explicación sencilla |
|---|---|---|
| `.github/workflows/roadmap-gate.yml` | Registro V305 | Ejecuta en GitHub el filtro nuevo de navegación y vocabulario. |
| `COMPENDIO_FINAL_FUNCIONES_USUARIO.md` | Registro V305 | Orienta al usuario con Historial y Regístrate. |
| `GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md` | Manual 3.59 / App V305 | Sincroniza la memoria viva con la interfaz vigente. |
| `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md` | Registro V305 | Homologa la redacción del Historial. |
| `ROADMAP_A_DETALLE.md` | Registro V305 | Guarda el detalle individual de esta versión. |
| `ROADMAP_OVERALL.md` | Registro V305 | Guarda el resumen general de esta versión. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Se genera con este mismo mapa | Eleva el inventario activo a 189 y registra cada archivo V305. |
| `audit-project.mjs` | Registro V305 | Agrega la prueba nueva al PASS maestro. |
| `index-grupal.html` | Build V305 | Homologa Historial, Atrás, Regístrate y los estados del OK General; elimina superposición y texto huérfano conservando la validación. |
| `mobile-release.json` | Paquete 305 | Prepara la versión móvil. |
| `service-worker.js` | Caché V305 | Entrega la interfaz nueva y retira la caché anterior. |
| `stableford.js` | Registro V305 | Corrige la guía visible a número de jugador, nombre, máximo seis y OK, sin pedir HDCP ni marcas. |
| `test-course-catalog.mjs` | Registro V305 | Alinea la prueba histórica con la guía real de hasta seis jugadores sin recuperar las falsas casillas. |
| `test-stableford-ui.mjs` | Registro V305 | Alinea la identificación de build en la prueba Stableford. |
| `test-stableford-clean-roster-history.mjs` | Registro V305 | Alinea la prueba limpia con la persistencia vacía aprobada en V289. |
| `test-v255-player-registration-boxes-codes.mjs` | Registro V305 | Alinea el contrato histórico con la guía gráfica homogénea aprobada en V304. |
| `test-v260-round-points-player-return.mjs` | Registro V305 | Alinea la recuperación con la persistencia vacía aprobada en V289. |
| `test-v261-registration-stableford-modality.mjs` | Registro V305 | Alinea la prueba histórica con las modalidades y guía gráfica vigentes. |
| `test-v262-provisional-optional-profile.mjs` | Registro V305 | Alinea la prueba histórica de perfiles opcionales con el nombre Score Card - Práctica. |
| `test-v253-live-previous-round.mjs` | Registro V305 | Alinea la ruta oficial Stableford. |
| `test-v252-stableford-persistence-category-course.mjs` | Registro V305 | Alinea la persistencia con la nueva ronda vacía aprobada en V289. |
| `test-v272-definitive-operational-release.mjs` | Registro V305 | Alinea build, snapshot y ruta de liberación. |
| `test-v274-complete-courses-voice-operations.mjs` | Registro V305 | Alinea la versión de la prueba de campos y voz. |
| `test-v275-stable-live-voice-turns.mjs` | Registro V305 | Alinea la versión de la prueba viva. |
| `test-v276-manual-hole-navigation.mjs` | Registro V305 | Alinea la versión de la prueba manual. |
| `test-v277-official-round-corrections.mjs` | Registro V305 | Alinea correcciones y snapshots oficiales. |
| `test-v278-card-image-pdf-export.mjs` | Registro V305 | Alinea la prueba de imagen y PDF. |
| `test-v279-local-card-library.mjs` | Registro V305 | Homologa la redacción y conserva la prueba del Historial local. |
| `test-v280-local-history-insights.mjs` | Registro V305 | Alinea las estadísticas del Historial. |
| `test-v281-pwa-installation.mjs` | Registro V305 | Comprueba la caché V305. |
| `test-v284-native-package-generation.mjs` | Registro V305 | Comprueba paquete y caché V305. |
| `test-v285-stableford-back-navigation.mjs` | Registro V305 | Comprueba el Atrás superior de Stableford. |
| `test-v287-stableford-back-controls-clear.mjs` | Registro V305 | Prohíbe que Regístrate tape otros controles. |
| `test-v290-brand-icons-cleanup.mjs` | Registro V305 | Mantiene la validación acumulada y la guía Stableford exacta bajo paquete V305. |
| `test-v304-homogeneous-registration-actions.mjs` | Registro V305 | Conserva el filtro gráfico hermano y prohíbe HDCP o marcas en la guía Stableford. |
| `test-v305-history-navigation-zero-error.mjs` | Registro V305 | Revisa vocabulario, retornos, conexiones, superposición, validación y versión. |
| `test-v305-registration-guides-parser-truth.mjs` | Registro V305 | Comprueba los formatos reales de dictado y los estados equivalentes de OK. |
| `vercel.json` | Registro V305 | Impide publicar si falla el filtro V304 o V305. |

## Archivos retirados del uso diario

Se retiraron porque eran procesos antiguos que cambiaban el código automáticamente y ya fueron sustituidos. Siguen dentro del historial de V289.

| Ruta retirada | Código antiguo | Tamaño anterior | Qué era |
|---|---|---:|---|
| `.github/scripts/v112_patch.py` | `2eded4ba549efed7334ddfe26cbca28aebb0fdba` | 9874 bytes | Ayuda usada por un parche antiguo V112. |
| `.github/workflows/grupal-card-mic-touch-fix.yml` | `ed99e786c74f434ad3e9c40f045b5922a91288da` | 3505 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/grupal-persistence-hardening.yml` | `a20c0e437f7e0fd8eb5ee0d7e18d6833e2802543` | 7307 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/grupal-persistence-v2.yml` | `792a63ae85c3ada1ca6183d87295206b1d13c8a4` | 5093 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/grupal-round-capture-v102.yml` | `af92c6ff9f681e78d149f84eaa333b0358631d23` | 6957 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/grupal-round-capture-v103.yml` | `51e26fa07ce4eba919bacf85fe543b612575382e` | 6718 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/grupal-round-mic-v100.yml` | `ec17cb2d231f08b18d42fc6c688f5384e5507cc5` | 3295 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/grupal-round-mic-v101.yml` | `d10a63f6dff8dcddbd85143aca0962215a081afc` | 3326 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/grupal-round-session-probe.yml` | `5e630450500ba1e25de1475f3c77a0a2e61379b7` | 1343 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/grupal-v104-score-confirmation.yml` | `1dc36abe111fbf58290ad3e91303348dd71ee740` | 9333 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/grupal-v104b-score-confirmation.yml` | `fb61a92383d7b273a9354656000bd0227ce548be` | 8622 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/grupal-v104c-score-confirmation.yml` | `d2f115c5cf94cac7aca88d8c6dd4f402c1a674f4` | 8626 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/grupal-v105-round-rules.yml` | `ca7393bdaf33589f02b2ef78da9934a040bff1ed` | 10087 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/grupal-v106-realtime-align.yml` | `766f163bbde3edd2667fde5be1b5b8f0a20ca303` | 2709 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/grupal-v107-strict-speech-lock.yml` | `1dc7e91e3a29dfec974aa3d0a4cacb55e8fd093b` | 6777 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/grupal-v107b-strict-speech-lock.yml` | `2e45d9d0d7f31881b3a25c1d7d61a14cf2bf6530` | 6901 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/grupal-v108-fast-voice.yml` | `f2bbffbd4fba94e7efe7593541dbf387bc621f17` | 9131 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/grupal-v109-mic-rearm.yml` | `9af9898e2c3a5879cade695f370acbcda5280758` | 6397 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/grupal-v109b-mic-rearm.yml` | `2cc98cd3ca14a9d9dcb9ce5e5bfc3a97bd5edb80` | 4454 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/grupal-v110-mic-tap-recovery.yml` | `cfc3552b0798f9d96b197c76624a2f35cb9efd42` | 4281 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/grupal-v110b-mic-tap-recovery.yml` | `1c2cccbd53b64ff46f2f0b7d105896d0670651a4` | 3888 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/grupal-v110c-mic-tap-recovery.yml` | `3666bd63f285302b0904a7b9bddc0a6d18689a65` | 4479 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/grupal-v111-direct-mic-capture.yml` | `b23f895f8f5d456c7d6542a5a45adb26141b07d9` | 4535 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/grupal-v111b-direct-mic-capture.yml` | `add9fd7fd03f19261b6e6236cb6a3bd197885ef6` | 4337 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/grupal-v111c-direct-mic-capture.yml` | `204b9ebf9354654ae5ae95537de9b607e3490e55` | 4090 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/grupal-v112-vocabulary-tee-edit.yml` | `c3e1eac48db861fbb1476b47615b4e3664f85aaf` | 12991 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/grupal-v112b-vocabulary-tee-edit.yml` | `ed9b2e64024cbe054eba295f6f4858465166b812` | 1875 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/grupal-v113-scorecard-oxygen.yml` | `cfe8134878c0f3ca315596412a7ad7e1d38e3396` | 5576 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/grupal-v114-scorecard-legibility.yml` | `b5ae3e83d6518c40cf835a9cc23497018fffe9ec` | 7490 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/grupal-v114b-scorecard-legibility.yml` | `60499512668f072f4f6b13cf24a3180770297f63` | 5566 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/grupal-v115-field-mic-layout.yml` | `ba41f712eb98492c14d3f478db74883b40819e1c` | 4815 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/grupal-v115b-field-mic-layout.yml` | `c6850759c69f6c19a535f587fc0d240d9b53cede` | 4231 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/grupal-v116-layout-timer.yml` | `6be7492ed06edc76d480bace8d73890c774225c7` | 6413 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/grupal-v117-pr.yml` | `78d1e42985d0d16d99e5baa6abb4b1ae87d1988f` | 2209 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/grupal-v117-recover.yml` | `3e485bb136b839ab12c0b783e70f45003084ea2a` | 5431 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/grupal-v118-field-fix.yml` | `eaa45b5d422af9b6c1c6893cb131b0d646346efb` | 8902 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/inspect-roster-vocab.yml` | `b416d73d20ba8374453938add929bb23f8da483e` | 667 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/inspect-v113-layout.yml` | `c24cb28bf5710c5435d3774243eee7e8dc618b3c` | 607 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/inspect-vocab-targets.yml` | `6a3fe01cec696661ab80bfb600a534ee767ad7c1` | 669 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v201-restore-reuse.yml` | `e5ab4fe209c5f0e74f79d9e083457b9fc92c750c` | 3365 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v202-scratch-voice-registration.yml` | `3e80fe8fc861212693f08bd6139032545911a348` | 4645 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v203-two-second-close.yml` | `e01e129b09fc56f282ed1f8fca4ca1fc95c69101` | 2482 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v204-direct-registration-voice.yml` | `ab9dda46371aff499132644a5d7b67e955fb1910` | 3433 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v205-verified-two-second-close.yml` | `75316e95f0f7c8c33280f42e66c8ef7cbb92f66d` | 2372 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v206-fix-gate-and-close.yml` | `b21ea708361cf7fce45c98de6fbecd964cacbbdb` | 2285 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v207-force-audio-transcription.yml` | `cb87ee124e3e23a548189cac887a304ae2b11d89` | 2583 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v208-direct-transcript-fields.yml` | `6afa88b05d8f34872e873c71ac154a2cfaa3cf69` | 2037 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v209-vad-fallback.yml` | `0a95cfd071985fe803e9577053df3bb0dbded022` | 2537 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v210-emergency-group.yml` | `8127f23d319f105c7ec2d2029a0257870f7bd8b9` | 2012 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v211-emergency-reset.yml` | `c8a3c76dfd5fd122c89146420ad700a09a9eaaed` | 2117 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v212-correct-storage-reset.yml` | `46c8dee6c6971d549da7355cdf29f2e28ac60b89` | 1964 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v214-preload-safe.yml` | `03aa0ce8091d6012f4c1d0ce2ecc4f591c445aa8` | 1716 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v217-force-route.yml` | `b7527efbd8b5058f9ec456dc7aff528dd01eaad1` | 1959 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v218-roster-fallback.yml` | `7a0d50d3acc38841f7401fbf67afe7bbee26aae6` | 1952 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v219-no-voice-registration.yml` | `00271f0da80c9dfb674dea959a7170b32414a3cc` | 1878 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v220-emergency-direct.yml` | `8ffdf52ccb31456ab44c27931276609b64ca6bd8` | 2716 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v221-audio-fix.yml` | `05e578512cf07dc0ed86c0f3c04d84c61807a4bf` | 1782 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v222-mic-direct-base.yml` | `80bf11802c9ddf2c3ea3029c49e50d4aa3add29c` | 1757 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v223-touch-plan-b.yml` | `cfc8250ff755ac32d00287fb52f4d61c457cb42e` | 2340 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v224-manual-gross.yml` | `188c8ba40f5bafd150b888ca90ae81b9a5c06885` | 3789 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v225-roster-names.yml` | `80b728ce1e63b439707477e4a90225a90c153a73` | 1477 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v226-manual-tap-modal.yml` | `9a47c70bf17bdb8bd0eb8d3dddacdde8d1886fca` | 4836 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v227-persistence.yml` | `8fc07731e6a82a3cd14376bb2374a5ac2793096d` | 3376 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v228-dedicated-persistence.yml` | `a7871a890e59ef05932556feeea8c268bb7f6c4f` | 3344 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v229-emergency-seed-persist.yml` | `2b861a9e92864618b871278322bd0f4335aa7468` | 1711 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v230-manual-overlay.yml` | `72396aa0615d08abc2b3bc58a9f50e8585f93d08` | 2913 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v231-manual-always-visible.yml` | `c65ae6babb5f6f4467845a835186c37c6b7c1fe8` | 2050 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v232-manual-grid.yml` | `0a4ab3f670fcadb63decb6ccbcd828d724d6974a` | 3238 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v233-manual-flow.yml` | `c64fc3d112847c9dfbb41d57f8b708070588f87d` | 1980 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v234-manual-editable-names.yml` | `f09006303ff33265a2c84f438b3b66eb4b3ee345` | 2547 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v235-hole-enter-ui.yml` | `c34f129a429a3bfada9f26f0d9f4fa23f21ffe45` | 4226 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v235-manual-ui.yml` | `8fa7f214d769c38514f42d65eb3238e8414912b5` | 4675 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v236-horizontal-scroll.yml` | `dc0a14f3f63fddd063a0f25bc2bfa3f0b7d63650` | 2057 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v237-today-accumulated.yml` | `042800e66e25b1c164a0668b41cc2d2ed1ef68ef` | 2300 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v238-remove-row-hole.yml` | `2e5a5107c37c133f55b4766bc71fcad1183886ea` | 2138 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v239-neon-editable.yml` | `8231d6a50a55a7807c1adc9c7f3b156539f61fc3` | 2041 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v239-neon-manual-labels.yml` | `d3ce7c109eed346d65477c52685420453246fea7` | 2009 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v240-accumulated-in-out-total.yml` | `a3228df5d173c8d8071896b3df77718e33e9f102` | 2799 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v240-integrated-accumulated.yml` | `d96e4bc363c50bdd383baff3fe0b3d9ee6109575` | 2632 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v241-horizontal-accumulated.yml` | `4cd4007cab5f1778e6152cb2c273c7625a5c6618` | 2581 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v242-hide-series.yml` | `28c5b022e773904c7884688d0356987d3c429e97` | 1718 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v243-mobile-clean-grid.yml` | `f8e186e5b6c3755cb47dbbe24cad1731ec43018d` | 3697 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v244-narrow-player.yml` | `109e25edf2e0e73cd5886826d044300f81b3565b` | 1529 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v245-remove-classification.yml` | `03796cc535db6392d49e5a3ed0ba157b53a824ec` | 1841 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v246-clear-scores-only.yml` | `892e4948d277bd0a1378f28c8830925fae007745` | 2480 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v247-move-clear-scores.yml` | `c127d110dd2f382ed1bb1e9d1efaf8af1792422f` | 2460 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v248-force-desktop-route.yml` | `e255484e40ba96d7252df02070689379c34f6797` | 1983 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v248-return-data-sync.yml` | `2fac800e6949b914a6a6cf40a5a8ac8b17f2c8e4` | 2241 bytes | Proceso antiguo de una versión ya incorporada. |
| `.github/workflows/stableford-v249-hard-emergency-countryclub.yml` | `05f2428e29a66ada9c0b27d5d7c66fbb5f3cd9fe` | 2813 bytes | Proceso antiguo de una versión ya incorporada. |

## Manual visual autorizado

| Archivo | SHA-256 | Descripción |
|---|---|---|
| `docs/manual/MANUAL_GOLF_SCORE_CARD_GT_IPHONE_01_INICIO_4K.png` | `78c12da229d35b2baa74be402f971829568ab7125b28a1b46d6e7c4096d1dee1` | Página 01 autorizada y congelada: configuración de campo y modalidad. PNG 4K para iPhone, 300 dpi. |
| `docs/manual/MANUAL_GOLF_SCORE_CARD_GT_IPHONE_02_REGISTRO_4K.png` | `42f62f22f7896ab7eab1e15b317445b21843c765ef2d2fdb69dc49b58024a5f5` | Página 02 autorizada y congelada: registro y corrección de jugadores. PNG 4K para iPhone, 300 dpi. |

## Cómo usarlo

## Actualización operativa V306 · Match Play sobre la tarjeta Normal

El **24 de agosto de 2026** se incorpora Match Play como extensión aislada de la Ronda Normal. La modalidad exige exactamente dos jugadores y conserva sin cambios el registro de nombre, HDCP y marcas; la distribución oficial de tiros; Gross, Neto, resultado, dictado por voz, ingreso manual, correcciones y resumen. El motor Match Play solo lee el Neto ya calculado: muestra **↑ verde** al ganador del hoyo, **↓ roja** al perdedor y no añade símbolo cuando existe empate. El marcador permanente informa AS, 1 UP, 2 UP y el cierre reglamentario anticipado, por ejemplo 3 & 2.

| Archivo nuevo o modificado | Registro V306 |
|---|---|
| `match-play.js` | Motor puro de comparación Neto, estados por hoyo, AS/UP y cierre anticipado. |
| `test-v306-match-play.mjs` | Prueba tarjeta Normal intacta, dos jugadores, Neto, ↑/↓, empate sin símbolo, 3 & 2, cierre, artefactos e Historial. |
| `index-grupal.html` | Añade selección Match Play, exige dos jugadores y superpone únicamente el rubro MATCH a la tarjeta Normal. |
| `round-closure.js` | Permite cierre oficial anticipado y recalcula Match Play después de una corrección oficial. |
| `card-artifacts.js` | Genera tarjeta global y personales Match Play con Gross/Neto e indicadores ↑/↓. |
| `card-library.js` | Conserva Match Play como modalidad propia en Historial. |
| `round-navigation.js` | Conserva la modalidad al recuperar una ronda Match Play. |
| `master-data-sync.js` | Sincroniza Match Play sin convertirlo en General. |
| `account-backup.js` | Restaura Match Play, su snapshot y su marcador. |
| `mobile-release.json` | Prepara el paquete móvil 306. |
| `service-worker.js` | Activa caché V306 e incluye el motor Match Play para uso sin conexión. |
| `scripts/build-mobile-web.mjs` | Incluye `match-play.js` en el paquete nativo iPhone/Android. |
| `audit-project.mjs` | Ejecuta el control V306 dentro de la auditoría maestra. |
| `.github/workflows/roadmap-gate.yml` | Ejecuta el candado Match Play en GitHub. |
| `vercel.json` | Exige la prueba V306 y entrega el módulo sin caché obsoleta. |
| `test-v305-registration-guides-parser-truth.mjs` | Conserva General y añade el requisito exacto de dos jugadores para Match Play. |
| `test-v305-history-navigation-zero-error.mjs` | Alinea paquete y caché con V306 sin retirar controles V305. |
| `test-stableford-ui.mjs` | Alinea únicamente la identificación del build vigente. |
| `test-v272-definitive-operational-release.mjs` | Alinea únicamente la identificación del build vigente. |
| `test-v274-complete-courses-voice-operations.mjs` | Alinea únicamente la identificación del build vigente. |
| `test-v275-stable-live-voice-turns.mjs` | Alinea únicamente la identificación del build vigente. |
| `test-v276-manual-hole-navigation.mjs` | Alinea únicamente la identificación del build vigente. |
| `test-v277-official-round-corrections.mjs` | Alinea únicamente la identificación del build vigente. |
| `test-v278-card-image-pdf-export.mjs` | Alinea únicamente la identificación del build vigente. |
| `test-v279-local-card-library.mjs` | Alinea únicamente la identificación del build vigente. |
| `test-v280-local-history-insights.mjs` | Alinea únicamente la identificación del build vigente. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Registra el inventario V306 completo. |
| `ROADMAP_A_DETALLE.md` | Registra esta actualización a detalle. |
| `ROADMAP_OVERALL.md` | Registra esta actualización en el resumen general. |

## Registro obligatorio de la actualización operativa V307

Solicitud: **25 de agosto de 2026**. Alcance: aumentar la legibilidad direccional de Match Play en iPhone; mostrar únicamente `MATCH PLAY`; escribir OUT, IN y total como UP/DOWN/AS; y cerrar automáticamente cuando el rival ya no pueda empatar ni ganar.

| Archivo nuevo o modificado | Código V307 | Función registrada |
|---|---|---|
| `match-play.js` | Cálculo V307 | Posición UP/DOWN/AS por OUT, IN y total para ambos jugadores. |
| `index-grupal.html` | Interfaz V307 | Flechas SVG 30 × 36, trazo 4.5; MODALIDAD = MATCH PLAY; resultados escritos por hoyos; anuncio FIN DEL MATCH; bloqueo de hoyos posteriores; snapshots V307. |
| `card-artifacts.js` | Artefactos V307 | Flechas SVG hermanas en tarjeta global y personales. |
| `mobile-release.json` | Paquete 307 | Entrega móvil vigente. |
| `service-worker.js` | Caché V307 | Actualización inmediata en iPhone. |
| `test-v307-match-arrows-format.mjs` | Candado V307 | Bloquea flechas débiles, direcciones ambiguas, totales Neto indebidos y ausencia de cierre. |
| `test-v306-match-play.mjs` | Regresión V306/V307 | Verifica Neto por hoyo, UP/DOWN por vuelta, 3 & 2, anuncio y bloqueo posterior. |
| `test-round-information.mjs` | Regresión de títulos | Exige `RESULTADO MATCH PLAY` sin alterar General ni Stableford. |
| `test-v261-registration-stableford-modality.mjs` | Compatibilidad | Conserva Stableford y reconoce el título propio Match Play. |
| `test-stableford-ui.mjs` | Compatibilidad | Build V307. |
| `test-v272-definitive-operational-release.mjs` | Compatibilidad | Build y snapshot V307. |
| `test-v274-complete-courses-voice-operations.mjs` | Compatibilidad | Build V307. |
| `test-v275-stable-live-voice-turns.mjs` | Compatibilidad | Build V307. |
| `test-v276-manual-hole-navigation.mjs` | Compatibilidad | Build V307. |
| `test-v277-official-round-corrections.mjs` | Compatibilidad | Correcciones V307. |
| `test-v278-card-image-pdf-export.mjs` | Compatibilidad | Artefactos V307. |
| `test-v279-local-card-library.mjs` | Compatibilidad | Historial V307. |
| `test-v280-local-history-insights.mjs` | Compatibilidad | Estadísticas V307. |
| `test-v281-pwa-installation.mjs` | Compatibilidad | Caché V307. |
| `test-v284-native-package-generation.mjs` | Compatibilidad | Paquete 307. |
| `test-v290-brand-icons-cleanup.mjs` | Compatibilidad | Controles acumulados V307. |
| `test-v304-homogeneous-registration-actions.mjs` | Compatibilidad | Hermandad y paquete V307. |
| `test-v305-history-navigation-zero-error.mjs` | Compatibilidad | Navegación y caché V307. |
| `audit-project.mjs` | Auditoría | Incluye V307. |
| `.github/workflows/roadmap-gate.yml` | CI | Ejecuta V307. |
| `vercel.json` | Publicación | Exige V307. |
| `GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md` | Manual 3.61 | Documenta V307. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Inventario | Incorpora esta sección. |
| `ROADMAP_A_DETALLE.md` | ROADMAP detallado | Registra todos los archivos. |
| `ROADMAP_OVERALL.md` | ROADMAP general | Registra todos los archivos. |

**Publicación V307:** `vercel.json` usa `node audit-project.mjs` como `buildCommand` compacto de 22 caracteres; sustituye la cadena que superaba el límite Vercel de 256 sin retirar ninguno de los 67 controles obligatorios.

## Corte funcional V312 · Caddie conversacional y clima vivo

| Archivo | Código V312 | Función vigente |
|---|---|---|
| `index-grupal.html` | CADDIE-GENERAL / GPS-WEATHER | Separa operaciones de tarjeta y conversación; mantiene el micrófono manual y sincroniza automáticamente el clima por GPS, con respaldo del campo. |
| `api/session-grupal.js` | REALTIME-GENERAL | Transcribe español natural además del vocabulario de score. |
| `api/weather.js` | WEATHER-TOOL | Consulta condiciones actuales y probabilidad de lluvia con fuente y hora. |
| `voice-assistant.js` | OPEN-FALLBACK | Deja pasar preguntas generales al Caddie. |
| `service-worker.js` | CACHE-V312 | Sustituye la copia instalada anterior. |
| `test-v312-general-caddie.mjs` | TEST-V312 | Verifica conversación, GPS primero, renovación climática, respaldo por campo, micrófono manual, salud y score protegido. |
| `test-course-catalog.mjs` | REGRESIÓN DE CATÁLOGO | Conserva los siete campos habilitados y admite su ubicación meteorológica propia. |
| `test-v267-one-operational-line.mjs` | REGRESIÓN OPERACIONAL | Conserva un solo escritor de score y admite conversación como salida separada. |
| `test-v270-consecutive-hole-voice-blocks.mjs` | REGRESIÓN DE BLOQUES | Conserva score consecutivo y salida conversacional autorizada sin cruces. |
| `test-voice-continuity.mjs` | REGRESIÓN | Reemplaza el silencio de frases generales por respuesta segura. |
| `test-v272-definitive-operational-release.mjs` | REGRESIÓN | Conserva la continuidad de captura con interrupción conversacional. |
| `test-v274-complete-courses-voice-operations.mjs` | REGRESIÓN | Conserva scores ya reconocidos y separa la plática. |
| `audit-project.mjs` | AUDITORÍA-V312 | Ejecuta el candado nuevo. |
| `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md` | ESTADO-V312 | Distingue GPS/clima visible entregado de Configuración, artefactos, snapshots formales y validaciones pendientes. |
| `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md` | PEND-CLI-002 / PEND-VOZ-003 | Conserva el alcance pendiente sin negar la fase ya implementada. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | MAPA-V312 | Incorpora este corte y eleva el total activo a 294. |
| `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` | SELLO | Guarda la huella reproducible final. |
| `ROADMAP_A_DETALLE.md` | DETALLE-V312 | Registra arquitectura, archivos y prueba. |
| `ROADMAP_OVERALL.md` | OVERALL-V312 | Resume el resultado para revisión. |

## Corte V334-M1 · Manual canónico 17–73

| Grupo de archivos | Responsabilidad vigente |
|---|---|
| `docs/manual/v311/manual-pages-17-35.json` | Fuente única de las 57 páginas funcionales, con orden y ayudas didácticas obligatorias. |
| `docs/manual/v311/manual-pages-bets-live-data.json` | Capa de overrides vacía; evita desplazar contenido sin control. |
| `docs/manual/v311/page-17.png` a `docs/manual/v311/page-73.png` | Láminas 4K/300 dpi reconstruidas y distribuidas a página completa. |
| `docs/manual/v311/Manual_Golf_Score_Card_GT_COMPLETO.pdf`, `docs/manual/v311/Manual_de_Funciones_Golf_Score_Card_GT_01-16.pdf` | PDF gemelos de 74 páginas sincronizados con las láminas. |
| `scripts/rebuild-manual-bets-live-data.py`, `scripts/manual-editorial-qc.py`, `scripts/manual-visual-qc.py` | Generación reproducible y candados editorial/visual sobre las 57 páginas. |
| `manual.html`, `manual-search.js`, `MANUAL_COBERTURA_FUNCIONAL_V311.md` | Manual web, búsqueda y mapa de cobertura alineados al orden canónico. |
| `test-v311-manual-semantic-coverage.mjs`, `test-v311-manual-search.mjs`, `test-v311-manual-voice-map.mjs`, `test-v321-ai-universal-infinity.mjs` | Regresión de cobertura, navegación, vocabulario y títulos vigentes de IA. |
| `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/MATRIZ_TECNICA_EDITORIAL_MANUAL.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/MATRIZ_TECNICA_EDITORIAL_MANUAL.json` | Contrato técnico/editorial ejecutable. |
| `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md` | RC-010: falso PASS anterior y control permanente. |
| `scripts/rebuild-inventory-pdfs.py`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` | Trazabilidad, tres inventarios y huella reproducible V334-M1. |
| `.github/workflows/v334-m1-finalize-preview.yml` | Flujo temporal: reconstruye, audita y se elimina antes del commit final de Preview. |
| `manual.html`, `test-v311-manual-hosting.mjs` | V334-M1-R4 reserva proporción 1:2 y evita que un enlace directo retroceda por carga diferida. |
| `.github/workflows/v334-m1-web-nav-finalize.yml` | Flujo temporal R4: actualiza sello, audita y se elimina antes del commit final. |
| `manual.html`, `test-v311-manual-hosting.mjs` | V334-M1-R5 sincroniza encabezado y contador con la lámina que ocupa el área útil del visor. |
| `manual.html`, `test-v311-manual-hosting.mjs`, `.github/workflows/v334-m1-layout-finalize.yml` | V334-M1-R6 fija la caja 1:2 de cada página antes de cargar la imagen y sella el candidato exacto. |
| `manual-search.js`, `test-v311-manual-search.mjs`, `.github/workflows/v334-m1-search-finalize.yml` | V334-M1-R7 prioriza la explicación de corrección sobre el vocabulario y conserva rutas separadas para borrar, tráfico y clima. |
| `api/universal-ai.js`, `test-v335-response-caliber.mjs`, `audit-project.mjs` | V335-AI reemplaza el calibre bajo uniforme por perfiles brief/standard/deep y un contrato verificable de sustancia, límites, acciones y fuentes. |
| `.github/workflows/v335-ai-finalize.yml` | Flujo temporal V335-AI: actualiza inventario, ejecuta 90 paquetes y se elimina antes del commit desplegable. |
| `index-grupal.html`, `test-v335-response-caliber.mjs`, `.github/workflows/v335-ai-routing-finalize.yml` | V335-AI-R1 impide que vocabulario como “yardas” secuestre análisis y recomendaciones destinados a AI UNIVERSAL. |
| `index-grupal.html`, `api/session-grupal.js`, `api/voice-health.js`, `test-v336-microphone-transport.mjs`, `audit-project.mjs` | V336-MIC distingue causas de apertura, tolera desconexiones breves, limpia transporte fallido y agrega trazas privadas. |
| `.github/workflows/v336-mic-finalize.yml` | Flujo temporal V336-MIC: actualiza inventario, ejecuta 91 paquetes y se elimina antes del commit desplegable. |
| `api/weather.js`, `api/universal-ai.js`, `index-grupal.html` | V337-WEATHER unifica clima de texto, voz y tarjeta sobre Open-Meteo estructurado, usando coordenadas públicas del campo y probabilidad por horario. |
| `test-v337-universal-weather.mjs`, `audit-project.mjs` | Puerta 92: exige llamada meteorológica estructurada, hora pico, porcentaje y síntesis sin segunda búsqueda web. |
| `.github/workflows/v337-weather-finalize.yml` | Flujo temporal V337-WEATHER: actualiza inventario, ejecuta 92 paquetes y se elimina antes del commit desplegable. |
| `api/universal-ai.js`, `test-v337-universal-weather.mjs`, `.github/workflows/v337-weather-r1-finalize.yml` | V337-WEATHER-R1 impide que una franja sugerida por el modelo recorte el día completo si el usuario no pidió mañana, tarde, atardecer o noche. |
| `api/weather.js`, `api/universal-ai.js`, `test-v337-universal-weather.mjs`, `.github/workflows/v337-weather-r2-finalize.yml` | V337-WEATHER-R2 conserva cada hora y porcentaje de Open-Meteo para responder literalmente consultas por horario. |
| `REGISTRO_REINCIDENCIAS_CALIDAD.md`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `.github/workflows/v337-weather-close-finalize.yml` | V337-WEATHER-CLOSE sella la evidencia real de 24 horas y cierra RC-012 sin cambiar el ejecutable. |
| `.github/workflows/v337-weather-retry-finalize.yml` | Reintento trazado del mismo ejecutable después de que Vercel recibió 429 transitorio en la prueba externa de Reglas. |
| `api/golf-rules.js`, `test-v328-official-golf-rules.mjs`, `test-v328-live-official-rules.mjs` | V338-RULES-GATE distingue 429 reintentable y evita que disponibilidad externa transitoria se confunda con una regresión del producto. |
| `.github/workflows/v338-rules-gate-finalize.yml` | Sella y audita la corrección de la puerta viva antes de eliminarse. |
| `api/universal-ai.js`, `test-v337-universal-weather.mjs`, `.github/workflows/v339-weather-direct-finalize.yml` | V339-WEATHER-DIRECT elimina la dependencia del modelo para clima explícito y responde directamente desde Open-Meteo. |
| `REGISTRO_REINCIDENCIAS_CALIDAD.md`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` | V339-WEATHER-DIRECT-CLOSE registra la prueba real final sin modificar el ejecutable aprobado. |

## Cómo usar este inventario


1. Buscar el nombre exacto.
2. Leer la explicación sencilla.
3. Usar el código para confirmar la versión exacta.
4. Ver [MAPA_MAESTRO_INFRAESTRUCTURA.md](MAPA_MAESTRO_INFRAESTRUCTURA.md) para ramas, Vercel, Apple, Android y datos.

## V340-SUPPORT · corrección de enlace al Manual por entorno

- `index-grupal.html`: `Support` abre `/manual-scg` dentro del mismo deployment.
- `test-v311-live-support-link.mjs`: bloquea cualquier escape futuro de Preview hacia Producción.
- `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`: registran la corrección y su alcance.
- Evidencia final: commit `43dcb2c`, deployment `dpl_4MAeofErPXWFx5dK5QAEoSvycYLT` READY y navegador real sobre el mismo dominio Preview.
- V341-WEATHER-INTENT: `api/universal-ai.js`, `test-v335-response-caliber.mjs` y `test-v337-universal-weather.mjs` separan pronóstico explícito de estrategia de golpe con viento.

## V342-AI-RESILIENCE · recuperación automática de AI UNIVERSAL

- `api/universal-ai.js`: reintenta límites transitorios, alterna modelos, respeta una espera acotada y devuelve 503 reintentable sólo al agotar la recuperación.
- `index-grupal.html`: hace un segundo intento transparente sin duplicar la pregunta ni el historial visible.
- `test-v335-response-caliber.mjs`: reproduce dos HTTP 429 antes de una respuesta 200 y verifica el agotamiento seguro.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`: RC-016 registra el defecto, su causa y el candado permanente.
- `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`: trazabilidad y sello reproducible V342.

## V343-AI-GATEWAY-FALLBACK · saldo externo agotado

- `api/universal-ai.js`: ante `credit_balance_exhausted`, usa Vercel AI Gateway con OIDC/clave administrada y tres modelos de proveedores distintos; conserva un análisis local completo para estrategia de golf si tampoco existe Gateway.
- `test-v335-response-caliber.mjs`: prueba saldo agotado, Gateway, failover y el caso exacto de 140 yardas con seis secciones obligatorias.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`: RC-016 documenta la causa real y el nuevo control.
- `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`: trazabilidad y sello reproducible V343.

## V344-TRAFFIC-DIRECT · tráfico independiente del saldo de IA

- `api/universal-ai.js`: identifica consultas explícitas de tráfico, extrae origen/destino y llama directamente a Google Maps Routes.
- `api/universal-ai.js`: responde ETA, demora, distancia, nivel, hora de cálculo y proveedor sin repetir coordenadas exactas.
- `test-v324-real-traffic.mjs`: prueba cero llamadas a OpenAI, Google Routes único, GPS requerido y destino ambiguo.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`: RC-017 conserva el defecto real y su candado.
- `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`: trazabilidad y sello reproducible V344.

## V345-ICONS · accesos de escritorio de Golf Score y Manual

- `assets/official-logos/golf-score-card-gt-apple-touch-v345-180.png`, `golf-score-card-gt-pwa-v345-192.png`, `golf-score-card-gt-pwa-v345-512.png`: derivados RGB versionados del logo oficial para iPhone y PWA.
- `docs/manual/v311/manual-scg-apple-touch-v345-180.png`, `manual-scg-pwa-v345-192.png`, `manual-scg-pwa-v345-512.png`: iconos dedicados del Manual, con logo visible y rótulo MANUAL.
- `index-grupal.html`, `manual.html`, `manifest.webmanifest`, `manual.webmanifest`: identidad y rutas exactas de cada acceso instalado.
- `service-worker.js`, `vercel.json`: precarga de los seis iconos, revalidación de manifiestos y caché inmutable por nombre versionado.
- `test-v345-home-icons.mjs`: decodifica y verifica tamaño, RGB, densidad visual, diferencias, rutas y encabezados.
- `test-v281-pwa-installation.mjs`, `test-v290-brand-icons-cleanup.mjs`, `test-v311-manual-hosting.mjs`, `audit-project.mjs`: integración del control V345 al banco maestro.
- `REGISTRO_REINCIDENCIAS_CALIDAD.md`: RC-018 conserva el defecto que alcanzó al propietario y la puerta física pendiente.
- `scripts/rebuild-inventory-pdfs.py`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`: regeneración, estado, inventario y sello del candidato V345.

V345-ICONS-R1: el primer build remoto fue bloqueado porque el ROADMAP general no contenía siete rutas literales. Ambos ROADMAPS las registran ahora; no existe cambio funcional adicional.

V345-ICONS-PREVIEW: commit `1026a3e6555077fab1af4f8f932e97a7032e0182`, deployment `dpl_9DcbFH9d9Gf3qDL8rGUjQqTNNYpX` READY, 93 paquetes, 74/74 editorial y visual, 349 fuentes; instalación física en iPhone todavía pendiente.

## V347 · matriz visible y diagnóstico real de respuestas

- `index-grupal.html`: añade `setupVoiceMatrix` inmediatamente bajo el micrófono; `ESCUCHANDO` y `RESPONDIENDO` son exactos, rojos, visibles y parpadeantes; el respaldo reporta inicio, transcripción lista y fallo de respuesta sin guardar contenido.
- `api/universal-ai.js`: `credit_balance_exhausted` deja de tratarse como límite transitorio y devuelve `UNIVERSAL_AI_CREDIT_EXHAUSTED` sin repetir la misma pregunta.
- `api/voice-health.js`: acepta únicamente los tres eventos técnicos nuevos del respaldo, sin pregunta, transcripción, nombre ni ubicación.
- `test-v336-microphone-transport.mjs`: bloquea estados con texto adicional, matriz ausente, falsa culpa a Internet, reintento por saldo y telemetría no autorizada.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`: RC-019 conserva el fallo físico y el bloqueo externo real.
- `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`: estado honesto, doble registro y sello reproducible; Producción permanece intacta.

## V348-VOICE-RECOVERY · fallo local recuperable y estados exactos

| Archivo exacto | Control | Resultado exigido |
|---|---|---|
| `index-grupal.html` | `GENERIC-LOCAL-FAILURE-FALLBACK` | Un fallo técnico no clasificado del transporte principal intenta el reconocimiento alternativo; permiso bloqueado y dispositivo ausente mantienen su diagnóstico específico. |
| `index-grupal.html` | `LISTENING-TO-RESPONDING` | Una transcripción válida cambia la matriz visible de `ESCUCHANDO` a `RESPONDIENDO`; no vuelve a `PROCESANDO…`. |
| `api/voice-health.js` | `PRIVATE-FALLBACK-LIFECYCLE` | Registra requested/started/error/start_failed sin pregunta, transcripción, nombre, audio ni ubicación. |
| `test-v336-microphone-transport.mjs` | `V348-PERMANENT-REGRESSION` | Reproduce el fallo local, protege errores no recuperables y exige estados y privacidad. |
| `REGISTRO_REINCIDENCIAS_CALIDAD.md` | `RC-020` | Conserva la evidencia de las 07:20/07:21 y no confunde captura reconocida con respuesta fallida por saldo. |

## V349-ROSTER-ROUTING · registro repetido y matriz sin falso procesamiento

| Archivo exacto | Control | Resultado exigido |
|---|---|---|
| `index-grupal.html` | `IDENTICAL-ROSTER-DEDUPE` | Repetir dos veces el mismo listado aplica una sola copia y no produce duplicados. |
| `index-grupal.html` | `ROSTER-NEVER-GENERAL-AI` | Un dictado con jugador/handicap/marcas que no pueda aplicarse termina con error específico y cero consultas generales. |
| `index-grupal.html` | `MATRIX-MESSAGE-PRECEDENCE` | Los mensajes personalizados conservan su texto; nunca se convierten en `PROCESANDO…`. |
| `index-grupal.html` | `LOCK-TOUCH-RECOVERY` | Un nuevo toque limpia bloqueo transitorio de setup y permite reabrir el micrófono. |
| `test-v305-registration-guides-parser-truth.mjs`, `test-v336-microphone-transport.mjs` | `V349-PERMANENT-REGRESSION` | Ejecutan repetición, gramática visible, frontera de intención, matriz y privacidad. |

## V350-SETUP-LOCAL · Registro de jugadores independiente de respuestas

| Archivo exacto | Control | Resultado exigido |
|---|---|---|
| `index-grupal.html` | `SETUP-LOCAL-ONLY` | En `context=setup`, una transcripción sólo puede aplicar jugadores o mostrar la instrucción de registro; jamás llama `routeAiUniversalAppText` ni `submitAiUniversalText`. |
| `index-grupal.html` | `NATURAL-TEE-CONNECTORS` | “Hándicap catorce y marcas blancas” y sus conectores naturales llegan a la misma marca canónica. |
| `index-grupal.html` | `CLIENT-SETUP-TELEMETRY` | El cliente autoriza applied/rejected sin texto hablado, nombres ni ubicación. |
| `test-v305-registration-guides-parser-truth.mjs` | `NATURAL-DICTATION-REGRESSION` | Ejecuta dos jugadores con “otro jugador” y conectores “y marcas”. |
| `test-v336-microphone-transport.mjs` | `NO-AI-ESCAPE` | Inspecciona el cuerpo real de `processBrowserVoiceTranscript`, exige retorno local incondicional y eventos cliente. |
| `REGISTRO_REINCIDENCIAS_CALIDAD.md` | `RC-022` | Conserva capturas, logs, causa, escape y estado físico pendiente. |

## V351-SAFARI-ROMAN-HANDICAP · separación de jugadores ante XIV

| Archivo exacto | Control | Resultado exigido |
|---|---|---|
| `index-grupal.html` | `SETUP-ROMAN-I-LIV` | El registro interpreta números romanos canónicos de I a LIV como hándicap cuando Safari los entrega antes de una marca. |
| `index-grupal.html` | `SCORE-X-ISOLATION` | La conversión romana vive sólo en el parser de setup; `X` no se transforma globalmente en score 10. |
| `test-v305-registration-guides-parser-truth.mjs` | `JAIME-XIV-JORGE-VI` | La cadena real produce Jaime/14/Blanco y Jorge/6/Azul en dos cambios separados. |
| `test-v336-microphone-transport.mjs` | `V351-VOICE-GUARD` | Conserva Registro local, matriz exacta y telemetría privada. |
| `REGISTRO_REINCIDENCIAS_CALIDAD.md` | `RC-023` | Registra captura, eventos 20:16:56 UTC, causa, escape y puerta física pendiente. |

## V352-GOLF-SCORE-CARD-GT-LIVE · seguimiento remoto autorizado

| Archivo exacto | Responsabilidad V352 | Control permanente |
|---|---|---|
| `index-grupal.html` | Enlaza el control LIVE con el único `persist()` oficial y monta la interfaz sin duplicar el motor de scores. | Cada guardado conserva primero la ronda local y luego notifica el snapshot LIVE. |
| `live-control.js` | Autoriza jugador/grupo, crea/abre/revoca enlaces, maneja torneo, ventana separada y cola offline. | Consentimiento coincidente, misma ronda, enlace válido del mismo origen y snapshot pendiente más reciente. |
| `live.html` | Página pública separada para visitantes sin aplicación. | Sólo lectura, CSP, `no-referrer`, `noindex` y nombre público oficial. |
| `live-view.js` | Consulta stream o torneo cada tres segundos, pagina grupos y renderiza Gross/Neto/X. | Ninguna escritura, almacenamiento, voz, audio ni acceso a la tarjeta activa. |
| `api/live.js` | Valida, limita frecuencia y ejecuta creación, publicación transaccional, lectura, unión y revocación. | Tokens aleatorios, sólo SHA-256, páginas con cursor y una sentencia CTE que bloquea, refiltra, exige revisión y actualiza torneo/evento. |
| `database/004_live_scorecards.sql` | Crea streams, torneos, eventos, rate limits e índices compatibles con el preparador Neon. | No contiene cuerpos de funciones; la API ejecuta la transacción atómica. |
| `service-worker.js` | Versiona la caché de la aplicación e incorpora el control LIVE. | El visor remoto depende de red y no se mezcla con la caché de la ronda. |
| `vercel.json` | Protege `live.html` y los scripts LIVE mediante headers. | `no-store`, `no-referrer`, `nosniff` y no indexación. |
| `test-v352-live.mjs` | Ejecuta regresión de permisos, privacidad, X, totales, hashes, visor, cola y paginación. | Rechaza nombre interno público, más de seis jugadores por stream, datos prohibidos y rutas de escritura en el visor. |
| `audit-project.mjs` | Incorpora V352 a la auditoría integral. | Ningún PASS global puede omitir `test-v352-live.mjs`. |
| `DATABASE_ARCHITECTURE.md` | Documenta el modelo temporal LIVE y su separación del historial central completo. | Migración primero en rama Neon temporal; base principal sólo con confirmación. |
| `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_LIVE_018_GOLF_SCORE_CARD_GT_LIVE.md` | Fija fuente, alcance, aceptación, riesgos, pruebas y reversión. | Los siete insumos GATE 0 quedan cerrados antes de Preview. |
| `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md` | Registra LIVE como prioridad V352. | Conserva el estado honesto de migración, Preview, navegador y prueba física. |
| `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md` | Añade el punto 28 y su relación con nube/QA. | No declara LIVE cerrado antes de las puertas restantes. |
| `ROADMAP_OVERALL.md` | Resume el alcance y estado V352. | Enumera cada archivo modificado y mantiene Producción intacta. |
| `ROADMAP_A_DETALLE.md` | Registra controles y evidencia reproducible V352. | Exige banco local, Neon temporal, navegador, Preview e inventario. |
| `scripts/rebuild-inventory-pdfs.py` | Regenera los tres inventarios con rótulo y sello V352. | Calcula las fuentes por Git, huella cada archivo y sella los PDF deterministas. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Mapea cada pieza V352. | El sello final reemplaza el conteo provisional. |
| `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` | Sella el árbol exacto de fuentes V352. | Se regenera sólo después de cerrar archivos, ROADMAPS y pruebas. |

Evidencia Neon V352: migración `1f8793a4-0dad-40a6-8016-b9b183e15b7c`, rama temporal `mcp-migration-2026-08-27T21-50-34` (`br-morning-dew-avwpi96x`), 60 grupos paginados 25/25/10, filtro individual sin fuga e idempotencia sin evento adicional. Con aprobación expresa, Neon aplicó el esquema a la principal `br-late-wind-avhgi9s3` y eliminó la temporal; verificación final: cuatro tablas, 15 índices, cero funciones LIVE y cero filas de prueba.

V352-R2: `api/live.js` tipa explícitamente los parámetros de la sentencia CTE usados por Neon HTTP; `test-v352-live.mjs` bloquea cualquier `mutationId`, `secretHash` o revisión esperada sin tipo. La corrección nace de la prueba remota real del deployment READY `dpl_3fmsfq4BjuFzMgV3eYKGvPRWzSff`, donde crear y leer aprobaron pero publicar devolvió `42P18`.

Cierre remoto V352-R2: deployment `dpl_2BLAFZNazoogdQQS2mkxreNjBgh6`, commit `6bc9901e068cf8f2026de6b0ab8580c2546819f5`, estado READY. El recorrido protegido devolvió `200/200/200/200/200/200/410` para página, crear, leer, publicar, volver a leer, revocar y confirmar revocación; Gross 5/Neto 4 apareció en revisión 1. Vercel registró cinco `200`, un `410` esperado y cero errores fatales; Neon quedó con cero streams de prueba.

### V352 · pruebas históricas compatibles con releases futuras

`test-stableford-ui.mjs`, `test-v272-definitive-operational-release.mjs`, `test-v274-complete-courses-voice-operations.mjs`, `test-v275-stable-live-voice-turns.mjs`, `test-v276-manual-hole-navigation.mjs`, `test-v277-official-round-corrections.mjs`, `test-v278-card-image-pdf-export.mjs`, `test-v279-local-card-library.mjs`, `test-v280-local-history-insights.mjs`, `test-v305-history-navigation-zero-error.mjs`, `test-v307-match-arrows-format.mjs`, `test-v322-real-sustained-caddie.mjs`, `test-v323-long-multitopic-context.mjs`, `test-v324-real-traffic.mjs`, `test-v325-ideal-microphone-timings.mjs`, `test-v326-no-silent-conversation.mjs`, `test-v327-tool-followup-no-silence.mjs` y `test-v328-official-golf-rules.mjs` conservan sus verificaciones funcionales, pero ya no congelan toda la aplicación en V332. El identificador general debe cumplir `V###`; el build LIVE exacto queda bajo `test-v352-live.mjs`.

## V353-CENTRO-LIVE-GENERAL-INDIVIDUAL · escenario amigable de 80 jugadores

| Archivo exacto | Responsabilidad V353 | Control permanente |
|---|---|---|
| `live-hub.html` | Presenta `1 · MONITOR GENERAL` y `2 · MONITOR INDIVIDUAL` en una sola ventana separada. | Dos botones grandes, cuatro pasos, sólo lectura y compartir mundial. |
| `live-hub.js` | Lee la General completa, ordena 80 jugadores, guarda elecciones del Monitor Individual e importa un enlace externo como respaldo. | Sólo ejecuta `read`; reutiliza la General y no fija máximo de páginas. |
| `live.html` | Ofrece entrada directa al Centro Live desde cualquier General o tarjeta compartida. | El botón abre otra ventana y no altera el visor existente. |
| `live-view.js` | Convierte el token de torneo o stream en una importación segura al Centro. | Conserva `_vercel_share`, usa fragmento y abre con `noopener,noreferrer`. |
| `live-control.js` | Agrega Centro Live, compartir ♾️, Capitán de Tarjeta y respaldo individual. | Un flujo principal por General; pegar enlace deja de ser requisito normal. |
| `api/live.js` | Impide que dos streams activos publiquen el mismo grupo dentro del torneo. | CTE atómica, fila del torneo `FOR UPDATE` y `LIVE_GROUP_ALREADY_PUBLISHING`. |
| `index-grupal.html` | Identifica el build V353 sin cambiar el escritor oficial. | `persist()` continúa siendo la única fuente de publicación. |
| `service-worker.js` | Versiona el shell e incorpora el Centro Live. | La Score Card mantiene su estrategia offline y LIVE sigue necesitando red para actualizar. |
| `vercel.json` | Protege `live-hub.html` y `live-hub.js`. | Sin caché, referrer ni indexación pública. |
| `test-v353-live-hub.mjs` | Simula 20×4 y 40×2, ambos monitores, enlace externo, privacidad y escala. | Bloquea omisiones, duplicados, parentescos específicos, escrituras, tope de páginas y doble capitán. |
| `test-v352-live.mjs` | Conserva la regresión central V352 bajo el identificador V353. | Permisos, alcance, idempotencia y privacidad siguen obligatorios. |
| `audit-project.mjs` | Incorpora el nuevo banco a la regresión maestra. | Ningún Preview puede omitir V353. |
| `DATABASE_ARCHITECTURE.md` | Documenta reutilización del esquema y lectura única de la General. | V353 no crea migración ni tabla nueva. |
| `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_LIVE_018_GOLF_SCORE_CARD_GT_LIVE.md` | Cierra el escenario, las siete entradas, riesgos, pruebas y reversión. | Separa PASS automático de prueba física iPhone. |
| `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md` | Registra V353 como ejecución activa. | Producción permanece sin montar. |
| `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md` | Integra Monitor General, Monitor Individual y compartir mundial al punto 28. | No duplica el motor de scores. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Mapea los 359 archivos activos y cada pieza V353. | El conteo final coincide con el sello. |
| `ROADMAP_OVERALL.md` | Resume el escenario ideal, arquitectura y estado verificable. | Enumera todos los archivos V353. |
| `ROADMAP_A_DETALLE.md` | Registra controles reproducibles del candidato. | La puerta remota puede comprobar cada modificación. |
| `scripts/rebuild-inventory-pdfs.py` | Rotula y reconstruye los tres inventarios V353. | Fuentes y salidas se sellan de forma determinista. |
| `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` | Sella el árbol candidato completo. | Se regenera después de cerrar código, pruebas y documentos. |

Resultado V353: `test-v352-live.mjs`, `test-v353-live-hub.mjs`, `scripts/project-quality-gate.mjs` y auditoría maestra de 95 paquetes PASS. Preview `dpl_2g6KPHDjaWbXuRfR8Ky88ai2U24F` READY; E2E remoto PASS con 20 grupos/80 jugadores, tres páginas, Monitor General, tres selecciones del Monitor Individual, vínculo externo, actualización LIVE, capitán duplicado bloqueado y revocación. Observabilidad registró cero `error`/`fatal`; Neon quedó con cero datos de prueba activos. Producción permanece intacta en `0dc1ba7a62b6bd6aec92752c539ca641cf950e26`; inspección visual e iPhone físico continúan pendientes.

`test-v281-pwa-installation.mjs`, `test-v284-native-package-generation.mjs`, `test-v290-brand-icons-cleanup.mjs`, `test-v304-homogeneous-registration-actions.mjs`, `test-v305-history-navigation-zero-error.mjs`, `test-v307-match-arrows-format.mjs`, `test-v312-general-caddie.mjs`, `test-v323-long-multitopic-context.mjs`, `test-v324-real-traffic.mjs`, `test-v325-ideal-microphone-timings.mjs`, `test-v326-no-silent-conversation.mjs`, `test-v327-tool-followup-no-silence.mjs`, `test-v328-official-golf-rules.mjs`, `test-v328-offline-official-rules.mjs`, `test-v329-skins.mjs` y `test-v330-side-games.mjs` exigen una caché PWA con versión `gscg-mobile-v###` sin congelarla en V332. `test-v352-live.mjs` conserva el control exacto de `gscg-mobile-v352-live` y `/live-control.js`.

## V354-VOICE-FALLBACK-MULTIHOLE-GENERAL

| Archivo exacto | Mapa V354 | Candado |
|---|---|---|
| `index-grupal.html` | Jugador único implícito, plural de hoyos, lote local, panel General visible y watchdog de voz. | Tres hoyos sin repetir jugador producen tres entradas. |
| `api/voice-health.js` | Ciclo privado y conteo acotado. | Nunca persiste contenido hablado ni identidad. |
| `service-worker.js` | Caché V354. | Safari recibe el shell corregido. |
| `test-v354-voice-fallback.mjs` | Regresión ejecutable del fallo físico. | Parser/procesador reales, General visible, audio recuperable y privacidad. |
| `test-v267-scorecard-combination-matrix.mjs`, `test-v270-consecutive-hole-voice-blocks.mjs` | Compatibilidad con el jugador operacional. | Combinaciones y bloques históricos permanecen PASS. |
| `test-v352-live.mjs`, `test-v353-live-hub.mjs` | Compatibilidad de release. | LIVE V353 no cambia su contrato. |
| `audit-project.mjs` | Puerta maestra V354. | La regresión es obligatoria. |
| `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md` | RC-024. | Candidato separado del PASS físico. |
| `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md` | Estado de voz. | Preview y prueba iPhone siguen abiertos. |
| `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Trazabilidad literal. | Gate documental reproducible. |
| `scripts/rebuild-inventory-pdfs.py`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` | Inventario V354. | Se reconstruye al cerrar el candidato. |

Resultado remoto V354: commit `d7deb09be3826430afc8e1f3d379f0a1137d215b`, deployment Preview `dpl_CgqzYpVABY9djJehtFmH5cyFXHdn` READY, auditoría Vercel de 96 paquetes PASS y navegador real sin errores propios. Build general y voz V354, AI ∞ y LIVE quedaron visibles. Producción continúa en `0dc1ba7a62b6bd6aec92752c539ca641cf950e26`; falta únicamente el PASS físico iPhone de esta corrección.

## V355-IOS-AUDIO-DICTATION

| Archivo exacto | Mapa V355 | Candado |
|---|---|---|
| `index-grupal.html` | Audio desde gesto y distribución del dictado azul. | Safari asíncrono y registro alternativo cubiertos. |
| `api/voice-health.js`, `service-worker.js` | Telemetría privada y shell V355. | Sin contenido personal; actualización obligatoria. |
| `test-v355-ios-audio-dictation.mjs`, `test-v354-voice-fallback.mjs`, `audit-project.mjs` | Reproducción y regresión acumulada. | Ambos fallos físicos son obligatorios. |
| documentos rectores e inventarios | RC-025, estado y lista literal. | Trazabilidad previa a Preview. |

Resultado remoto V355: `b965ec4d87c1f0400bf655e5f8bdba6f003f5cc9`, `dpl_7AaXsHMV7msb6f2dizQECu3ES55F` READY, 97 paquetes y navegador PASS. Producción intacta; prueba física iPhone pendiente.

## V356-VOICE-ONLY-CEDAR-QUALITY

| Archivo exacto | Mapa V356 | Control |
|---|---|---|
| `index-grupal.html` | Turnos hablados no visibles, turnos escritos visibles y reproducción Cedar. | Origen de modalidad y voz masculina estricta. |
| `api/voice-speech.js` | Convierte texto a audio con Cedar 1.15 mediante OpenAI o AI Gateway. | Clave sólo servidor, `no-store`, límite 4000 y sin voz femenina. |
| `api/universal-ai.js` | Perfil hablado conciso y clima resumido; perfil escrito completo. | Google Routes/Open-Meteo no se sustituyen por prosa generativa. |
| `service-worker.js` | `gscg-mobile-v356-voice-only-cedar-quality`. | Invalida el shell anterior. |
| `test-v356-voice-only-cedar-quality.mjs` | Reproduce RC-026 y valida matriz, Gateway, tráfico, clima y profundidad. | Banco obligatorio en `audit-project.mjs`. |
| `test-v354-voice-fallback.mjs`, `test-v355-ios-audio-dictation.mjs`, `test-v352-live.mjs`, `test-v353-live-hub.mjs` | Compatibilidad acumulada. | Multihoyos, Registro y LIVE permanecen activos. |
| `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md` | RC-026. | Candidato separado del PASS físico. |
| `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` | Estado y trazabilidad V356. | Gate documental reproducible. |
| `scripts/rebuild-inventory-pdfs.py`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` | Inventario V356. | Se reconstruye y sella al cerrar archivos. |

### Extensión V356 · exactitud temporal tráfico/clima

| Archivo exacto | Mapa | Candado |
|---|---|---|
| `api/_lib/traffic.js`, `api/universal-ai.js`, `api/weather.js` | Salida futura, rótulo previsto, pronóstico horario y límite de proveedor. | Actual nunca sustituye futuro. |
| `test-v356-traffic-weather-accuracy.mjs`, `audit-project.mjs` | Cinco horizontes y regresión acumulada. | RC-027 obligatorio en cada release. |
| registro, cola, matrices y roadmaps | Causa raíz y estado verificable. | Comparación externa y campo permanecen puertas separadas. |

## V357-IOS-VOICE-TRANSPORT-RECOVERY

| Archivo exacto | Mapa V357 | Control |
|---|---|---|
| `index-grupal.html` | Captura iPhone en gesto antes de Realtime; multi-hoyo y General por el mismo transporte local. | 429 no bloquea; score local antes que conversación. |
| `api/voice-health.js` | Eventos de reinicio/reintento/resultado sin contenido. | Privacidad técnica. |
| `service-worker.js` | Shell V357. | Actualización efectiva en acceso directo iPhone. |
| `test-v357-ios-voice-transport-recovery.mjs` | Banco raíz RC-028. | Gesto, alternativas, ambigüedad, `voiceOnly` y privacidad. |
| `.github/workflows/roadmap-gate.yml`, `AGENTS.md`, `audit-project.mjs`, `package.json` | Candado entre conversaciones y ejecución obligatoria. | Voz V354–V357 y tráfico/clima V324/V337/V356 no pueden omitirse. |
| `test-v352-live.mjs`, `test-v353-live-hub.mjs`, `test-v354-voice-fallback.mjs`, `test-v355-ios-audio-dictation.mjs`, `test-v356-voice-only-cedar-quality.mjs` | Compatibilidad acumulada. | LIVE, Registro, multi-hoyos y Cedar intactos. |
| documentos rectores, ambos ROADMAPS, `scripts/rebuild-inventory-pdfs.py` e inventario | RC-028, estado y árbol exacto V357. | Continuidad verificable sin depender del historial de chat. |

## V358-VOICE-ROUND-CONTINUITY

| Archivo exacto | Mapa V358 | Control |
|---|---|---|
| `index-grupal.html` | Conserva la tarjeta configurada al abrir con `?inicio=1`; Registro aparece sólo si todavía no existe ronda. | Cerrar o reabrir no sustituye la ronda; `NUEVA RONDA` sigue siendo la única acción explícita para empezar otra. |
| `service-worker.js` | Shell V358. | Invalida la caché V357 en iPhone. |
| `test-v358-active-round-reopen.mjs`, `audit-project.mjs` | Reproduce reapertura, persistencia y flujo explícito de nueva ronda. | RC-029 queda dentro de la auditoría maestra. |
| `test-v311-neutral-match-home-link.mjs`, `test-v352-live.mjs`, `test-v353-live-hub.mjs`, `test-v354-voice-fallback.mjs`, `test-v355-ios-audio-dictation.mjs`, `test-v356-voice-only-cedar-quality.mjs`, `test-v357-ios-voice-transport-recovery.mjs` | Inicio condicionado e identificador acumulado V358. | Match/Four Ball, LIVE, Registro, multihoyos, Cedar y recuperación Safari siguen obligatorios. |
| documentos rectores, ambos ROADMAPS, `scripts/rebuild-inventory-pdfs.py` e inventario | RC-029, estado y árbol exacto V358. | Producción y PASS físico permanecen puertas separadas. |

## V359-IOS-SCORE-PARSER-RECOVERY

| Archivo exacto | Mapa V359 | Control |
|---|---|---|
| `index-grupal.html` | Interpreta frases físicas con `hoyo número`, `golpes`, `tiró` y hoyo final para dos jugadores. | Sólo reubica el bloque cuando todas las entradas comparten un único hoyo; lo desconocido se rechaza. |
| `service-worker.js` | Shell V359. | Invalida V358 en iPhone. |
| `test-v359-ios-score-parser-recovery.mjs`, `audit-project.mjs` | Reproduce Jaime/Gustavo en tres órdenes naturales y una negativa. | RC-030 queda obligatorio. |
| bancos V270 y V354–V358 | Regresión acumulada de score, voz, Cedar y continuidad. | Ninguna corrección anterior se elimina. |
| documentos rectores, ambos ROADMAPS, inventario y reconstrucción PDF | Rechazo V358 y trazabilidad V359. | Producción continúa intacta. |

## V360-INTEGRATED-PROGRESSIVE-PARSER

| Archivo exacto | Mapa V360 | Control |
|---|---|---|
| `index-grupal.html` | Une captura Safari, escritura progresiva visible, parser natural y ronda persistente. | Cada score válido aparece mientras se dicta; ambigüedad revierte el bloque. |
| `api/voice-health.js` | Evento progresivo privado. | Sólo cantidad y estado; nunca transcripción ni nombres. |
| `test-v357-synchronized-progressive-voice.mjs`, `test-v359-ios-score-parser-recovery.mjs` | Bancos de ambas ramas sincronizadas. | Progreso visual y lenguaje natural son inseparables. |
| `.github/workflows/roadmap-gate.yml`, `package.json`, `audit-project.mjs` | Ejecución obligatoria local y remota. | Ninguna conversación puede omitir el banco combinado. |
| documentos, ROADMAPS, inventario, caché y reconstrucción PDF | Árbol único V360. | V358/V359 aisladas no se presentan como aprobación. |

## V361-SYNCHRONIZED-VOICE

| Archivo exacto | Mapa V361 | Control |
|---|---|---|
| `index-grupal.html` | Resultado parcial → escritor oficial → `persist()` → `render()` sin cerrar el reconocimiento. | Los siguientes hoyos pueden seguir llegando y lo ya recibido permanece visible y guardado. |
| `index-grupal.html` | Catálogo iOS tardío de voces masculinas y circuito Cedar 429/503 de diez minutos. | Respaldo hablado sin mujer genérica y sin repetir un proveedor temporalmente bloqueado. |
| `test-v357-synchronized-progressive-voice.mjs`, `test-v359-ios-score-parser-recovery.mjs`, `test-v361-synchronized-voice.mjs` | Banco sincronizado de progreso, parser, persistencia, TTS y privacidad. | Ninguna rama paralela puede sustituir otra corrección. |
| `.github/workflows/roadmap-gate.yml`, `package.json`, `audit-project.mjs`, `service-worker.js` | Gate único y shell V361. | Un FAIL detiene Preview; Producción queda intacta. |
| documentos rectores, ambos ROADMAPS, `scripts/rebuild-inventory-pdfs.py` e inventario | RC-031 y árbol reproducible. | PASS automático, Preview y PASS físico se reportan por separado. |

## V362-PHYSICAL-VOICE-RECOVERY

| Archivo exacto | Mapa V362 | Control |
|---|---|---|
| `api/voice-speech.js` | Cedar primario y Onyx masculino por `openai/tts-1-hd` como respaldo Gateway soportado. | Cabecera `X-GSCG-Voice`, MP3, `no-store`, error seguro y sin contenido en logs. |
| `index-grupal.html` | AI ∞ un toque, watchdog de primer resultado, catálogo masculino ampliado y cierre hablado del flujo progresivo. | No regresión de gesto V358; no escucha infinita; hoyos 9/18 consumen el cierre. |
| `api/voice-health.js` | Telemetría `browser_fallback_no_result_timeout`. | Sólo causa técnica `no_speech`; privacidad preservada. |
| `test-v358-ios-score-universal-physical-recovery.mjs` | Banco restaurado del contrato físico V358. | Orden abrir→habilitar→escuchar dentro del mismo toque. |
| `test-v362-physical-voice-recovery.mjs` | Banco nuevo de Gateway, voz entregada, watchdog y cierre. | Bloquea el modelo no publicado y la pérdida del reporte. |
| `test-v352-live.mjs`–`test-v361-synchronized-voice.mjs`, `audit-project.mjs`, `package.json`, workflow | Regresión histórica acumulada y ejecución obligatoria. | Otra conversación no puede reemplazar la línea integrada. |
| `service-worker.js` | `gscg-mobile-v362-physical-voice-recovery`. | Safari invalida V361. |
| `AGENTS.md`, cola, matriz, registro RC-032 y ambos ROADMAPS | Trazabilidad, estado honesto y protección entre conversaciones. | Producción intacta; Preview y físico siguen separados. |
| `scripts/rebuild-inventory-pdfs.py`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` | Sello final V362. | El árbol exacto se regenera después de toda modificación. |

## V363-RECORDED-MOBILE-BEHAVIOR + INTOCABLES

| Archivo | Función | Protección |
|---|---|---|
| `index-grupal.html` | Ronda canónica, reporte Match con nombres, cierre Normal y guard móvil. | INT-01 e INT-02. |
| `Intocables/` | Reglas y gate permanente. | INT-01…INT-04, lógica AND. |
| `test-v363-intocables-behavior.mjs`, `test-v363-recorded-mobile-behavior.mjs` | Persistencia, frase Match y Safari/modal. | Un FAIL detiene la versión. |
| `audit-project.mjs`, `package.json`, `service-worker.js` | Ejecución y shell V363. | Caché y banco alineados. |
| `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V363_PRUEBAS_COMPORTAMIENTO/` | Dos capturas físicas FAIL, MP4 automático, póster y reporte RC-035 con SHA-256. | Evidencia automática y física se distinguen; el iPhone sigue pendiente. |

Inventario exacto V363: `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/MATRIZ_GATE_0_PROYECTO.json`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `Intocables/README.md`, `Intocables/REGLAS_INTOCABLES.json`, `Intocables/intocables-gate.mjs`, `audit-project.mjs`, `index-grupal.html`, `live-control.js`, `package.json`, `scripts/rebuild-inventory-pdfs.py`, `service-worker.js`, `test-v260-round-points-player-return.mjs`, `test-v352-live.mjs`, `test-v353-live-hub.mjs`, `test-v354-voice-fallback.mjs`, `test-v355-ios-audio-dictation.mjs`, `test-v356-voice-only-cedar-quality.mjs`, `test-v357-ios-voice-transport-recovery.mjs`, `test-v357-synchronized-progressive-voice.mjs`, `test-v358-active-round-reopen.mjs`, `test-v358-ios-score-universal-physical-recovery.mjs`, `test-v359-ios-score-parser-recovery.mjs`, `test-v361-synchronized-voice.mjs`, `test-v362-physical-voice-recovery.mjs`, `test-v363-intocables-behavior.mjs` y `test-v363-recorded-mobile-behavior.mjs`. `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md` documentan el mismo corte.

Evidencia y soporte móvil adicionales: `.gitignore`, `scripts/v363-silent-speech-recognition.js` y los cinco archivos de `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V363_PRUEBAS_COMPORTAMIENTO/`, incluido `REPORTE_PRUEBAS_COMPORTAMIENTO_V363_RC035.md`.

## Hotfix final OIDC · comunicación universal

| Archivo | Función | Protección |
|---|---|---|
| `api/_lib/vercel-gateway-auth.js` | Resuelve clave administrada, token inyectado o token OIDC dinámico. | Nunca registra ni expone el token. |
| `api/universal-ai.js` | Activa el respaldo Gateway después de saldo directo agotado. | El proveedor directo conserva prioridad y los errores permanecen explícitos. |
| `api/voice-speech.js` | Usa la misma identidad administrada para recuperar el audio. | No cambia Cedar/Onyx ni contenido hablado. |
| `test-v364-vercel-oidc-recovery.mjs` | Simula tres fallos directos y exige una llamada Gateway autenticada. | Un salto ausente bloquea auditoría y Preview. |
| `audit-project.mjs`, `package.json` | Instalan y ejecutan el control OIDC. | Sin aprobación sólo existe candidato local. |

## V365/V366 · recuperación e Inicio principal

| Archivo | Función | Protección |
|---|---|---|
| `index-grupal.html` | Descarta rondas vacías, recupera tarjeta viva y exige `Inicio` cuando no existe ronda operativa. | Jugadores y scores sobreviven; no aparece tarjeta vacía. |
| `service-worker.js` | Caché acumulada V363–V366. | Safari recibe el árbol integrado sin retirar V364 ni voz. |
| `test-v365-active-round-empty-recovery.mjs` | Reproduce copia vacía más nueva y tarjeta válida archivada. | Recupera scores y repara `ACTIVE_ROUND_KEY`. |
| `test-v366-principal-entry-recovery.mjs` | Ejecuta cuatro estados de entrada, ciclo de vida y compatibilidad `nueva_ronda=1`. | Inicio idempotente; tarjeta válida intacta. |
| `Intocables/`, `audit-project.mjs`, `package.json` | Gares acumulativos y comandos directos. | Un FAIL bloquea Preview o producción. |
| `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V365_RECUPERACION_RONDA_ACTIVA/REPORTE_V365_RC037.md` | Evidencia RC-037. | Distingue PASS automático de prueba física. |
| `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V366_ENTRADA_PRINCIPAL/REPORTE_V366_RC038.md` | Evidencia RC-038. | Registra el Preview rechazado y el control nuevo. |

## V367 · comunicación universal en la misma pantalla

| Archivo | Función | Protección |
|---|---|---|
| `index-grupal.html` | Quita la apertura visual del panel en preguntas habladas y conserva `voiceOnly:true`. | Inicio, Registro y tarjeta no cambian. |
| `api/voice-health.js` | Registra `browser_fallback_general_in_place` sin texto ni nombres. | Privacidad y diagnóstico verificable. |
| `test-v367-universal-voice-in-place.mjs` | Inspecciona respuesta, acceso de un toque, contexto inicial y telemetría. | Bloquea la reaparición del panel AI. |
| `test-v354-voice-fallback.mjs`, `test-v358-ios-score-universal-physical-recovery.mjs` | Actualizan la expectativa histórica al mandato físico más reciente. | Multihoyos y gesto iPhone permanecen acumulados. |

## V368 · entrada canónica sincronizada

| Archivo | Función | Protección |
|---|---|---|
| `index-grupal.html` | `inicio=1` abre Registro con ronda válida e inicializa `standaloneApp` antes de `openSetup()`. | Inicio visible, cero `ReferenceError`, tarjeta conservada detrás. |
| `manifest.webmanifest` | Mantiene `start_url=/index-grupal.html?source=pwa`. | El acceso instalado reabre la tarjeta viva sin forzar Registro. |
| `test-v368-canonical-home-entry.mjs` | Distingue enlace web y aplicación instalada y simula una tarjeta persistida. | Bloquea tanto el salto web a Score Card como la pérdida de persistencia PWA. |
| `service-worker.js`, V357/V361/V364/V366, `audit-project.mjs`, `package.json` | Firma V368 y ejecución acumulada. | Safari invalida el shell rechazado sin retirar V367. |
| `AGENTS.md`, directrices, RC-040, matriz, ROADMAPS e informe V368 | Sello multiconversación sobre `03ca12e`. | Ninguna rama V365–V367 puede volver a presentarse como final. |
| `scripts/rebuild-inventory-pdfs.py`, lock y tres PDF V311 | Sello de inventario V368. | Otra conversación no puede reutilizar un inventario rotulado V367. |

## V369 · compatibilidad LIVE

| Archivo | Función | Control |
|---|---|---|
| `api/live.js` | Acepta identificadores seguros históricos `p1..p6` al crear/publicar LIVE. | No relaja patrones de tokens ni secretos. |
| `test-v352-live.mjs` | Reproduce la ronda real con `p1` y `p2`. | Bloquea la reincidencia RC-041. |

## V370 · salida Match Play LIVE

| Archivo | Función | Control |
|---|---|---|
| `live-view.js` | Renderiza pareja, nombres, hoyos y posición Match desde el snapshot vigente. | `mode=match_play` no pasa por `playerCard()` General. |
| `live.html` | Carga `match-play.js` y el visor V370 sin caché. | El enlace vigente recibe la presentación nueva al reabrirse. |
| `test-v352-live.mjs` | Ejecuta Match Play sin scores con Jaime/Gustavo equivalentes. | Exige nombres y casillas vacías; prohíbe Gross/Neto General. |

## V397 LAB · respaldo de historial y acceso recordado

| Archivo | Responsabilidad | Candado |
|---|---|---|
| `account-backup.js` | Selección canónica de rondas oficiales respaldables, deduplicada por ID. | Una tarjeta oficial equivale a una mutación central. |
| `index-grupal.html` | Recorre todo el historial oficial al respaldar y muestra la cantidad; recuerda correo sin guardar contraseña. | Cinco tarjetas no pueden reducirse silenciosamente a una; sesión sólo se cierra explícitamente. |
| `test-v282-optional-account-backup.mjs` | Ejecuta cinco rondas, duplicado, borrador y contrato seguro de autocomplete/localStorage. | RC-044 permanente. |
| `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` | Resella las fuentes V397 después del rechazo preventivo del primer build. | `inventory-gate` debe pasar antes del nuevo Preview LAB. |
| `card-library.js` | Conserva orden descendente por fecha y acepta fecha ISO, numérica y visible en español. | Buscar una fecha devuelve las rondas correspondientes. |
| `index-grupal.html` | Pagina ocho rondas; doble toque abre Global original; el Historial no muestra acciones y el visor abierto contiene `ATRÁS` + `ENVIAR TARJETA DIGITAL`. | RC-045: sin ocho botones antiguos ni quinta ronda oculta. |
| `test-v279-local-card-library.mjs`, `test-v282-optional-account-backup.mjs` | Fijan el contrato visible del Historial y la cuenta recordada. | Contraseña visible sólo bajo control local y nunca almacenada; micrófono intacto. |
| `AUDITORIA_TARJETAS_IN_OUT_ATRAS_V397.md` | Inventario revocatorio de 16 vistas y matriz de evidencia posterior. | Ninguna vista pasa sin captura individual, retorno y persistencia. |
| `test-v397-card-in-out-back-contract.mjs` | Contrato IN=1–9, OUT=10–18, TOTAL=1–18 para ocho artefactos y controles del visor. | RC-046; el banco no sustituye inspección visual. |
| `card-artifacts.js` | Tabla aprobada IN/OUT/TOTAL en Global y Personal de las cuatro modalidades. | Conserva cálculos y cambia presentación/artefacto. |

## V371 · Gross Match y candado de micrófono

| Archivo | Función | Control |
|---|---|---|
| `live-view.js` | Gross por hoyo, flecha sólo cuando hay ganador/perdedor y acumulado de ambos jugadores. | Empate `—`; no repite flechas ni usa tabla General. |
| `live.html` | CSS de doble línea y activos `?v=371`. | Reapertura del mismo enlace recibe la vista nueva. |
| `test-v352-live.mjs` | Ejecuta victoria 4/5 y empate 4/4. | Exige `1 UP/1 DOWN`, Gross y ausencia de flecha en empate. |
| `Intocables/MICROFONO_APROBADO.lock.json` | Sella hashes del transporte y once bancos de voz. | Cambiar un byte bloquea INT-05. |
| `Intocables/intocables-gate.mjs` | Valida hashes y ejecuta cada banco sellado. | Registro, Score individual/multihoyo y AI UNIVERSAL permanecen intocables. |
| `Intocables/README.md`, `Intocables/REGLAS_INTOCABLES.json` | Documentan y activan INT-05. | Ningún build pasa con regresión de micrófono. |
| `scripts/rebuild-inventory-pdfs.py`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, tres PDF V311 | Sellan el inventario V371. | Fuentes, hashes y versión permanecen sincronizados. |

## Continuidad maestra permanente de LAB

## V406-R11 · borrado persistente

| Archivo | Función | Control |
|---|---|---|
| `index-grupal.html` | Limpia todas las copias activas, marca el ID borrado, filtra recuperación central y fija Inicio. | No rescata ni restaura la ronda eliminada mientras conserva otras rondas. |
| `test-v405-registration-clear-final-mobile.mjs`, `test-v365-active-round-empty-recovery.mjs`, `test-v363-intocables-behavior.mjs`, `Intocables/intocables-gate.mjs` | Simulan borrado/reapertura y validan la nueva persistencia canónica. | Ronda vacía, sin clave activa, otras rondas preservadas e Intocables PASS. |

## V406-R10 · Centro multitorneo y scorecards concurrentes

| Archivo | Función | Control |
|---|---|---|
| `live-hub.html`, `live-hub.js`, `gsc-design-system.css` | Centro de hasta cinco torneos, enlace exclusivo y presentación General/categorías. | La vista compartida no expone la aplicación; 67 jugadores demo permanecen. |
| `live-control.js`, `api/live.js` | Permiten varias scorecards del mismo grupo sin capitán. | El agregador computa una sola vez cada grupo/jugador/hoyo y conserva discrepancias. |
| `test-v353-live-hub.mjs` | Simula dos teléfonos con el mismo jugador y hoyo. | Segundo cómputo no altera el total; un hoyo nuevo sí se incorpora. |

| Archivo | Función | Control |
|---|---|---|
| `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md` | Fuente única para trasladar estado, límites, versiones, enlaces y pendientes entre conversaciones. | Gate 0 exige su presencia; MAIN permanece congelada. |
| `test-lab-continuity-master.mjs` | Verifica las anclas permanentes y el mensaje reutilizable de continuidad. | La auditoría integral falla si una ancla desaparece o cambia sin control. |

## V405-R2 · Registro y Tarjeta Digital móvil

| Archivo | Función | Control |
|---|---|---|
| `test-v405-registration-clear-final-mobile.mjs` | Sella `BORRAR TODO`, aislamiento modal, cabecera móvil y scroll contenido de la tarjeta. | Prohíbe borrar Historial y detecta reaparición de controles montados. |
| `index-grupal.html` | Limpia los seis jugadores del borrador y corrige la presentación móvil de Tarjeta Digital. | Ronda activa, Historial, scores y módulos Intocables permanecen fuera del borrado. |
# V407-R6 · UNIVERSALES · 08 de septiembre de 2026

- `universales.js`: motor único de 12 puntos por hoyo para 3/4 jugadores y empates.
- `test-v407-r6-universales.mjs`: matriz matemática, paridad funcional y retiro activo de DOTS.
- `test-v407-r6-universales-coordination.mjs`: contrato entre la línea gráfica R5 y la integración R6.
- `CONTROL_PROYECTO_SCIRE/COORDINACION_V407_R6_UNIVERSALES.md`: ramas, propiedad de archivos, snapshot y secuencia sin cruces.
- `index-grupal.html`: selector, validación, Score Card y Tarjeta Digital UNIVERSALES.
- `card-library.js`: modo UNIVERSALES en Historial.
- `service-worker.js`: release/caché R6 y motor offline.
- `audit-project.mjs`: ejecución obligatoria de los bancos R6.
- `test-v330-side-games.mjs`: DOTS histórico sin superficie activa; Skins/Wolf/Vegas preservados.
- `test-v405-registration-clear-final-mobile.mjs`: Control Manual común con UNIVERSALES.
- `test-v407-r1-premium-visual-system.mjs`: identificación visual R6 sobre geometría R5.
# V407-R14 · Archivos de actualización y tarjetas · 08 de septiembre de 2026

| Archivo | Registro R14 |
|---|---|
| `index-grupal.html` | ACTUALIZAR permanente, habilitado y parpadeante; release visible R14. |
| `service-worker.js` | Caché y release R14 coordinados. |
| `card-artifacts.js` | Categoría opcional sobre nombre y puntos Universales rojos. |
| `scripts/card-audit-fixtures.mjs` | Generador reproducible de diez tarjetas para auditoría iPhone. |
| `test-card-artifacts.mjs` | Candado de categorías opcionales y puntos Universales. |
| `test-v365-active-round-empty-recovery.mjs`, `test-v406-r2-professional-design.mjs`, `test-v406-r23-visible-version.mjs`, `test-v406-r4-mobile-controls.mjs`, `test-v406-r5-simple-tournament-live.mjs`, `test-v407-r1-premium-visual-system.mjs`, `test-v407-r7-ios-scroll.mjs`, `test-v407-r9-manual-update.mjs` | Contratos sincronizados con R14. |
| `ROADMAP_A_DETALLE.md`, `ROADMAP_OVERALL.md`, `REGISTRO_REINCIDENCIAS_CALIDAD.md` | Continuidad, alcance y prevención RC-090. |
# R19 · Archivos del enlace de un solo uso

- `api/_lib/app-access.js`: canje atómico consumible una sola vez.
- `api/app-access.js`: rechazo explícito del segundo uso.
- `test-r18-owner-guest-24h-access.mjs`: prueba positiva del primer dispositivo y negativa del segundo.


## V407-R34 · Respuesta escrita y reproducción verificable · 2026-09-13

Base R33 ab2e227c6dc1. Incidente RC-108: audio iniciado no demuestra salida audible; texto oculto y esperas sin límite. Texto seguro junto a controles, reproductor nativo visible sin mute, plazos máximos y monitor de avance/final. Registro/scores, tarjeta R30 y updater preservados. Pruebas locales dirigidas PASS; Preview y prueba física pendientes. Detalle y rollback en docs/quality/R34_AUDIO_Y_TEXTO.md.

Archivos exactos:
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`
- `ROADMAP_A_DETALLE.md`
- `ROADMAP_OVERALL.md`
- `api/voice-health.js`
- `docs/quality/R34_AUDIO_Y_TEXTO.md`
- `index-grupal.html`
- `scripts/build-r34-voice-review.mjs`
- `service-worker.js`
- `test-r32-open-conversation.mjs`
- `test-r34-audio-response.mjs`
- `test-v365-active-round-empty-recovery.mjs`
- `test-v406-r2-professional-design.mjs`
- `test-v406-r23-visible-version.mjs`
- `test-v406-r4-mobile-controls.mjs`
- `test-v406-r5-simple-tournament-live.mjs`
- `test-v407-r1-premium-visual-system.mjs`
- `test-v407-r25-round-controls.mjs`
- `test-v407-r7-ios-scroll.mjs`
- `test-v407-r9-manual-update.mjs`
- `test-voice-result-integrity.mjs`
- `vercel.json`

- `audit-project.mjs`: bancos R32/R33/R34 e integridad de voz obligatorios en cada despliegue.

- `test-r37-closed-round-live-weather.mjs`: impide que una ronda cerrada congele el clima informativo de la pantalla; conserva la tarjeta y los scores cerrados.
- `test-v312-general-caddie.mjs`: asegura que el Caddie use clima vivo y mantenga inmutable la ronda cerrada.


## R36 publicación autorizada — 2026-09-13
Orden del propietario: Publica. Correcciones de liberación de captura, siguiente pregunta, ubicación explícita y voz por fragmentos. Pruebas controladas PASS; validación física y equivalencia integral de 100 conversaciones pendientes. No se certifica reducción total de latencia. Reversión: e871621c2af478deed6957a625feb0e280402d68 conservando almacenamiento local.
Archivos exactos:
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`
- `Intocables/APROBACION_FISICA_REGISTRO_SCORES_V378.json`
- `ROADMAP_A_DETALLE.md`
- `ROADMAP_OVERALL.md`
- `api/universal-ai.js`
- `api/weather.js`
- `audit-project.mjs`
- `docs/quality/ENGINE_100_COMPARISON.html`
- `docs/quality/ENGINE_100_COMPARISON.json`
- `docs/quality/ENGINE_CHATGPT_REFERENCES_100.json`
- `docs/quality/ENGINE_R34_COMPLETE_100.json`
- `docs/quality/ENGINE_R34_PARTIAL_18.json`
- `docs/quality/R35_BANCO_100_PREGUNTAS.json`
- `docs/quality/R36_CAPTURE_DIAGNOSTIC.json`
- `docs/quality/R36_CAPTURE_DIAGNOSTIC.md`
- `docs/quality/R36_CONTINUITY_EVIDENCE.json`
- `docs/quality/R36_TARGETED_CHATGPT.json`
- `docs/quality/R36_TARGETED_CHATGPT_RAW.txt`
- `docs/quality/R36_TARGETED_COMPARISON_9.json`
- `docs/quality/R36_TARGETED_REAL_9.json`
- `docs/quality/R36_TTS_LATENCY_PAIRS.json`
- `index-grupal.html`
- `scripts/check-conversation-acceptance.mjs`
- `scripts/render-engine-comparison.py`
- `scripts/run-r36-audio-sequential.mjs`
- `scripts/run-r36-build.mjs`
- `scripts/run-r36-latency-probe.mjs`
- `scripts/run-r36-targeted.mjs`
- `service-worker.js`
- `test-r31-universal-plain.mjs`
- `test-r34-audio-response.mjs`
- `test-r35-weather-location.mjs`
- `test-r36-capture-permissions.mjs`
- `test-r36-capture-release.mjs`
- `test-r36-followup-events.mjs`
- `test-v335-response-caliber.mjs`
- `test-v364-vercel-oidc-recovery.mjs`
- `test-v365-active-round-empty-recovery.mjs`
- `test-v406-r2-professional-design.mjs`
- `test-v406-r23-visible-version.mjs`
- `test-v406-r4-mobile-controls.mjs`
- `test-v406-r5-simple-tournament-live.mjs`
- `test-v407-r1-premium-visual-system.mjs`
- `test-v407-r25-round-controls.mjs`
- `test-v407-r7-ios-scroll.mjs`
- `test-v407-r9-manual-update.mjs`


### Voz por turnos independientes — candidato local
- `voice-turns.js`: captura por pulsación y cierre independiente.
- `api/voice-transcribe.js`: transcripción HTTP del audio del turno.
- `test-ptt-independent-turns.mjs`: regresión de cierre y cancelación.
Estado: validación física pendiente.
# R137 · 29 septiembre 2026

`live-hub.html` y `live-hub.js` separan CREAR TORNEO de CREAR RONDA PRIVADA; `index-grupal.html` conserva jugadores en Registro privado y ofrece MI RONDA con scores; `live-control.js` evita conexión automática de la ronda privada a Torneos. `test-lab-round-create-modal.mjs` protege el flujo, `release.json` identifica R137 y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` sella la versión. Ambos ROADMAPS registran el cambio.

## R138 · 29 septiembre 2026 · actualización y MI RONDA
- Corrección: MI RONDA añadido en la tarjeta, a la derecha de RONDA PREVIA; muestra los scores de la ronda activa sin cambiar torneo ni guardar datos nuevos.
- Actualización: namespace nuevo del Service Worker, versión recuperada de release.json, navegación de actualización a red sin caché y refresco del shell antes de promover.
- Rollback LAB: deployment dpl_9CQvZ6huTzxXhR6wHJ7N6bYzoKXf, commit f3f954f48a4cdc820031c75fea29faa2e2e02eb7.
- Archivos: index-grupal.html, service-worker.js, release.json, test-lab-round-create-modal.mjs, test-lab-update-recovery.mjs, ROADMAP_OVERALL.md, ROADMAP_A_DETALLE.md, CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md, CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md, CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json.
- Estado: pruebas y publicación LAB en curso; verificación física iPhone pendiente.


### R139 · Rondas particulares
- `private-rounds.js`: nombre, código, lista y Scores por grupos.
- `test-lab-private-rounds.mjs`: aislamiento de datos, código, pertenencia y escritor oficial.

R140: `private-rounds.js` muestra únicamente el nombre del jugador y no emite SCORES ACTUALIZADOS.

R140 · Ajuste solicitado: BORRAR RONDA Y JUGADORES junto a RONDA PREVIA; RONDA PARTICULAR y SCORES GRUPO en la última fila. SCORES GRUPO abre únicamente el marcador de la ronda vinculada. Pruebas dirigidas PASS.

R140 · Marcador particular: acabado premium coherente con la aplicación, cabecera y filas alineadas, tipografía uniforme, neto verde, separadores y panel redondeado. Sin cambios de cálculos ni funciones.

R141 · Primera apertura: eliminadas navegaciones automáticas concurrentes al activar el service worker; cambio de controlador verifica versión sin recargar campos. Comprobación de release limitada a 8 segundos, libera estado en fallo. Prueba test-lab-first-open PASS. Evidencia iPhone R136/COMPROBANDO aportada por propietario; causa exacta del teclado físico aún no reproducida. Rollback: LAB R140 fa207a7 / dpl_BzbDc1PrmGmh47Z6kmXo1cm3vfne.

R141 · SCORES GRUPO muestra únicamente Scores, sin código ni compartir. Código conservado en creación/gestión RONDA PARTICULAR. Resultado negativo verde, positivo rojo. X conservada, sin botón de regreso por cancelación expresa.

R142 · Corregido indicador hardcoded R136: badge y botón derivan exclusivamente de meta gscg-release, sin override data-server-release. test-lab-first-open.mjs compara ambos contra release.json. Archivos: index-grupal.html, service-worker.js, release.json, test-lab-round-create-modal.mjs. Rollback R141 f9d7abe / dpl_HznTauXqSoqUNhJWWHWkUCgrcP7B.

R142 · Rondas particulares: retiro reversible de las dos pruebas Cuates identificadas por UUID; caducidad 60 minutos después del score 18 del último jugador de todas las tarjetas vinculadas. Correcciones no reinician el reloj; nuevo jugador incompleto cancela el cierre hasta terminar. Lista refresca cada 10 segundos, marcador caducado cierra con X y conserva tarjeta local. Archivos: api/live.js, api/_lib/private-round-lifecycle.js, private-rounds.js, test-lab-private-lifecycle.mjs, ROADMAP_OVERALL.md, ROADMAP_A_DETALLE.md, CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md, CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md, CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json. Pruebas dirigidas: último jugador, 60 minutos, corrección y nuevo grupo.

R143 · Orden solicitado IMG_5330: ATRÁS izquierda / VER MI TARJETA derecha; RONDA PREVIA / VER RONDAS GUARDADAS juntas; dos botones de borrar juntos; RONDA PARTICULAR / SCORES GRUPO conservados abajo. Mismos IDs, textos, funciones y estilos. Archivos: index-grupal.html, service-worker.js, release.json, test-lab-update-recovery.mjs, test-lab-round-create-modal.mjs, ROADMAP_OVERALL.md, ROADMAP_A_DETALLE.md, CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md, CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md, CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json. Rollback LAB R142: 19a7583 / dpl_7CMuwhhS1Tr8DVeb3PyZDYeZCchb.

## R144 · candidato local no entregado

- `scores-ui.js`, `scores-ui.css`: presentación compartida Scores y modal G/N; usadas por `live-hub.html` e `index-grupal.html`.
- `api/_lib/personal-access.js`, `sql/personal-access-lab.sql`: base de permisos aún sin conectar ni migrar; NO certificada para uso real.
- `test-scores-ui.mjs`, `test-scores-ui-browser.cjs`, `test-personal-access.mjs`, `test-lab-no-production-proxy.mjs`: verificación de datos/gestos/roles y aislamiento.
- Ver estado exacto y dependencias en ambos ROADMAPS R144.

- R144 continuación: `test-personal-access-postgres.mjs`, `package.json`: verificación SQL real local aislada; `test-private-scores-browser.cjs`: recorrido y pie fijo de Scores privado. No certifican proveedor telefónico o DB remota.

## R144 · códigos LIVE de primer uso

- `api/live-share.js`, `api/_lib/live-share.js`, `live-share.js`: código consumible y sesión read-only; reemplazan la propuesta local no conectada personal-access de teléfono.
- `test-live-share-postgres.mjs`, `test-live-share-handler.mjs`, `test-live-share-middleware.mjs`, `test-live-share-browser.cjs`, `scripts/live-share-test-server.mjs`: controles del flujo nuevo.
- Matriz vigente: `MATRIZ_LIVE_CODIGO_UN_SOLO_USO_R144.md`; estado y evidencia local `EVIDENCIAS_LIVE_R144/ESTADO.md`. Remoto pendiente; Producción intacta.

## R145 · 30 septiembre 2026 · accesos aprobados y escritor oficial aislado

Fuente canónica: LAB a757809 (R144), rama lab-r137-private-round-20260929. Se conserva Producción/main 89c64f348b6ce2a311218215c41488e04a588053 sin modificaciones. Referencias visuales recuperadas: Torneos_01_Entrada_y_Resultados.png y Torneos_04_Mapa_de_Pantallas.png, originales de Library inspeccionados como píxeles. Alcance de este bloque: corregir accesos aprobados dentro de la app actual, conservar escritor/motores, añadir integración real del API con DB descartable. No es entrega integral.

Registro: CREAR TORNEO seguido de CREAR RONDA PRIVADA. El primer botón conserva borrador y abre creación en Torneos; el segundo abre creación nueva incluso con una ronda guardada, sin retirar el acceso a sus scores. Entrada Torneos: CREAR TORNEO y VER SCORES; las acciones sobre eventos guardados se muestran al solicitar scores. Sin inyección de demo en el uso real; resultados tras seleccionar evento. COMPARTIR LIVE visible directamente sólo para emisor inscrito, controles de permiso existentes conservados.

G0: referencia original recuperada; aceptación medible por navegación/orden/estado vacío/scores tras selección; riesgos: sesión propietaria ausente, identidad personal y permisos de organización todavía no implementados integralmente. Plan: regresión de navegación, API oficial con PGlite aislado, build y revisión en Preview LAB. Rollback: volver a a757809 únicamente en proyecto golf-sc-gt-lab, sin tocar Production ni base primaria.

PASS API oficial aislado: creación, inscripción válida/inválida, lector no escribe, origen externo denegado, publicación, reintento idempotente, conflicto, corrección, persistencia, historial de eventos y revocación. No sustituye recorrido autenticado remoto. PASS navegación R145 y bancos privados. Build anterior PASS; nueva ejecución con banco API añadida pendiente de registrar salida final.

PENDIENTE: revisar Preview, probar escritor remoto con sesión propietaria, integrar autorización personal/roles/grupos/MI POSICIÓN y formulario completo según mapa. El diseño original propone verificación telefónica; la última orden sustituye envío de COMPARTIR LIVE por código quemado al primer uso. No inventar proveedor ni afirmar identidad verificada. R144 sigue en dominio fijo hasta revisión. No hay enlace final nuevo certificado.

Archivos de este bloque: `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R144/ESTADO.md`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R144/gsc-r144-remote-detail.jpg`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R144/gsc-r144-stable-private-detail.jpg`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R144/gsc-r144-stable-publication.jpg`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_A_DETALLE.md`, `ROADMAP_OVERALL.md`, `api/live.js`, `index-grupal.html`, `live-hub.html`, `live-hub.js`, `private-rounds.js`, `release.json`, `scripts/build-manual-lab.mjs`, `service-worker.js`, `shortcuts-ui.js`, `test-lab-global-operational-audit.mjs`, `test-lab-shortcuts-navigation.mjs`, `test-lab-tournament-navigation.mjs`, `test-live-share-browser.cjs`, `test-live-official-flow.mjs`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R145/ESTADO.md`.

### R145 · punto comprobado 30 septiembre 2026 05:17 Guatemala

Build completo PASS con test-live-official-flow.mjs realmente ejecutado (salida guardada). git diff --check PASS. Banco negativo obligatorio test-project-quality-gate.mjs BLOQUEADO: spawnSync de Node retorna EPERM y salida vacía. La revisión automática rechazó la escalación porque ejecutaría /opt/codex fuera del sandbox; no se elude. Controles negativos directos sin escalación rechazaron control ausente y repo incorrecto. No sustituyen el banco exigido. No nuevo despliegue ni enlace final; R145 es checkpoint local, no entrega.

Navegador remoto: /live-hub.html de R144 abierto y confirmado con navegación antigua. Acceso principal sigue /access.html sin sesión propietaria. Ninguna revisión visual remota de R145 certificada.

Recuperar: ejecutar banco obligatorio sin error de subprocess en entorno permitido; sincronizar checkpoint con LAB; revisar Preview y recorrido con sesión propietaria. Después integrar formularios/roles/autorización individual/MI POSICIÓN y demás estados del mapa recuperado. No afirmar que quedaron implementados en este bloque.

Evidencias adicionales: `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R145/build.log`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R145/gate-bloqueado.log`.


# R146 · permisos personales integrados en LAB · NO ENTREGA FINAL

Base canónica remota comprobada a75780974ef4a224d809eeeba561051c9d24f808; cambios locales sobre R145. Producción/main 89c64f348b6ce2a311218215c41488e04a588053 intacta. Proyecto exclusivo golf-sc-gt-lab / prj_0KNTWUoiCiA3amKZQPDNNkWYFDbp; DB permitida exclusivamente br-small-mouse-av0f24o9 / ep-fragrant-pine-av6xi8hy. No se utiliza base primaria ni proxy de Producción.

Referencias: originales Torneos_01_Entrada_y_Resultados.png y Torneos_04_Mapa_de_Pantallas.png recuperados e inspeccionados; Revision_Torneos_Privados.md y Matriz_Acceso_Ronda_y_Torneo.md v4. Orden más reciente de compartir LIVE en MATRIZ_LIVE_CODIGO_UN_SOLO_USO_R144.md: jugador genera código de primer uso, lo envía desde su aplicación, sin proveedor SMS ni intervención del organizador para compartir. Los accesos de inscripción personales siguen autorización del organizador y se vinculan a la cuenta autenticada existente; no se afirma verificación telefónica.

Implementación: formulario Torneos nombre/campo/fecha/modalidad/categorías; creación real en API/DB actual. Organización autoriza por identificador personal, invitación aleatoria de 32 caracteres guardada como hash, destinatario vinculado a cuenta, vigencia 24h, consumo atómico y membresía por evento/tipo. Roles organizador, jugador, anotador de grupo e invitado solo lectura; cupo 100 jugadores incluye invitaciones pendientes, excluye invitados, libera vencidas/revocadas y se serializa mediante bloqueo del evento dentro de SQL. Reasignación y configuración conservan historial antes/después; modalidad no cambia con scores existentes; cierre bloquea escrituras. Servidor exige membresía activa también con tokens conocidos o clave de publicación filtrada. Ronda Particular tiene tablas y ámbito independientes.

Tarjeta real: acceso desde ANOTAR MIS SCORES, registro de roster autorizado y motor vigente, conexión oficial a evento y captura/publicación existente. Cuenta/evento se validan en middleware antes de cargar tarjeta; datos locales separados por cuenta. Reingreso usa preferencia HttpOnly que no concede autorización, comparando sesión real otra vez. URL de tarjeta personal nunca usa fallback de shell propietario en service-worker. Recuperación de stream vencido requiere nueva validación. MI POSICIÓN usa ranking General y categoría del motor actual, más hoyos completados. Header/logo/Scores reducido/favoritos y detalle 18 G/N originales se conservan. Lectura LIVE anterior sigue /api/live; pruebas protegen el desvío involuntario detectado. Funciones deportivas, corrección, persistencia/historial/menú y audio local aprobados se conservan.

COMPARTIR LIVE desde tarjeta inscrita abre el diálogo de código de 12 caracteres ya aprobado, destino directo a tabla. Invitado no genera códigos. Primera apertura crea cookie de lectura; reutilización por otra sesión denegada; revocación del emisor personal bloquea su sesión compartida. El código de compartir prueba posesión, no identidad del receptor, según última orden.

Evidencia PASS local: build.log (perfil completo LAB con 5 modalidades); gates.log; bancos personal-event-permissions, personal-storage-access, personal-front-end y V353 incluidos en build. API real con SQL PostgreSQL PGlite descartable y cuentas fixture explícitas: código equivocado/reenviado/usado/vencido, ocho consumos y un ganador, privacidad de enumeración, grupos/HCP/roster, lector con secret filtrado, revocación/cierre, recuperación tras vencimiento, escritor privado/tablas separadas, 100/101, invitados sin cupo, liberación de vencimiento, fecha calendario inválida, sesión LIVE de primer uso y revocación de emisor. PGlite de una conexión NO certifica concurrencia Neon de varias conexiones ni sesión real remota.

Control histórico Intocables/intocables-gate.mjs devuelve ENOENT api/voice-speech.js, retirado por orden vigente del propietario (ROADMAP_A_DETALLE R11 GATE HOTFIX 2026-09-22). No se restaura endpoint retirado ni se declara PASS de ese control antiguo. Perfil actual scripts/build-manual-lab.mjs y test-manual-no-assistant.mjs verifican que siga ausente. No se declara auditoría histórica integral ni prueba física iPhone.

El bloqueo EPERM del checkpoint R145 quedó resuelto tras cambio efectivo de permisos del entorno; test-project-quality-gate.mjs normal sin escalación PASS. No se repitió la escalación rechazada.

Vercel: GSC_PERSONAL_ACCESS_LAB_READY=1 guardado SOLO Preview; captura lab-preview-env.jpg. Canal fijo LAB no se activó ni redeployó. LAB público continúa R144 hasta revisión nueva. Estado actual: NO REVISADO. Pendientes ejecutables: sellar roadmaps/inventarios, commit y sincronizar rama LAB, comprobar Preview READY y revisión visual real. Pendiente de servicio: navegador carece de sesión autenticada de aplicación; no se puede certificar escritor/permisos remotos con fixtures ni saltar login. No se solicitan credenciales por chat ni una nueva autorización.

Rollback: quitar activación Preview y volver solo LAB al commit a757809; ninguna promoción a main o a epg-caddy. Entrega integral bloqueada hasta cero fallos aplicables y recorrido remoto comprobado.

# R147.1 · compartir la ronda al crearla

- `personal-events.js`: después de crear desde Registro, mantiene el código visible y habilita compartir nativamente/WhatsApp; cancelación conserva reintento y continuación. Tras compartir o continuar abre la Score Card autorizada.
- `test-lab-private-round-share-flow.mjs`: cubre código, hoja de compartir, navegación y cancelación.
- `test-lab-first-open.mjs`: asegura que R147 detecte release R147.1 y active ACTUALIZAR.
- `scripts/build-manual-lab.mjs`: ejecuta ambas regresiones en el perfil LAB.
- `release.json`, `index-grupal.html`, `service-worker.js`: release, distintivo y fallback de caché R147.1.
- `ROADMAP_A_DETALLE.md`, `ROADMAP_OVERALL.md`, `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md`: alcance y estado de la integración.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`: sello regenerado para esta revisión.

## R147.2 · compartir LIVE y tipografía legible · 30 septiembre 2026
- `live-share.js`: selecciona la API según el evento y retorna a Score Card después de compartir.
- `private-rounds.js`: cierra el modal sólo al completar el envío, muestra fallos de COMPARTIR LIVE y amplía la fuente de Scores.
- `test-lab-private-rounds.mjs`, `test-lab-code-entry.mjs`, `test-lab-first-open.mjs`: cubren selección de API, retorno/cancelación, tipografía, evento personal y aviso R147.2.
- `release.json`, `index-grupal.html`, `service-worker.js`: release R147.2 y caché actualizada.
- Ambos ROADMAPS, PEND-LIVE-018, continuidad, reincidencias e inventario documentan alcance/estado.

### R147.2 · sincronización MI RONDA y doble toque Scores
Se conserva incrementalmente MI RONDA de f6ac0dd (otra conversación), sin restaurar controles antiguos. `scores-ui.js` admite doble clic explícito y doble toque hasta 600 ms: muestra 18 hoyos con X, cuyo cierre conserva los resultados. Archivos: `index-grupal.html`, `private-rounds.js`, `scores-ui.js`, `test-scores-ui.mjs`, `test-lab-registration-private-rounds-entry.mjs`, `scripts/build-manual-lab.mjs`. Pruebas y Preview pendientes de integración.

## R147.2 · Torneos sin credenciales y recorrido completo · 30 septiembre 2026
Orden expresa: mismo flujo de crear ronda, código, compartir y regreso a Score Card para torneo; General, Categorías, Buscar, estrellas/Mis favoritos y doble toque→18 scores→X. Se añade identidad automática por dispositivo con cookie HttpOnly y token aleatorio de 256 bits, hash en base LAB y pertenencia por evento. No se exige correo/contraseña al crear. Los accesos de lector conservan rol y otros dispositivos no reciben propiedad. `personal-events.js` prepara identidad automática y comparte torneo antes de abrir tarjeta asignada. `live-hub.js` añade detalle en Favoritos, busca entre categorías, selecciona categoría disponible y conserva nombre real del evento; no se agrega Seguros Universales. `scores-ui.css` unifica fuente Arial, tamaños, logo a la derecha, fondo y bordes de las referencias.
Archivos: `api/_lib/device-event-identity.js`, `api/_lib/account-auth.js`, `api/personal-events.js`, `personal-events.js`, `live-hub.js`, `scores-ui.css`, `test-lab-device-event-identity.mjs`, `test-lab-private-round-share-flow.mjs`, `test-lab-registration-return-state.mjs`, `scripts/build-manual-lab.mjs`.
Pruebas dirigidas PASS: identidad sin credenciales, crear/leer con roster, rechazo de otro dispositivo, token falso/vencido y lector; compartir torneo→Score Card; doble clic/toque→18 posiciones→X. Banco LAB actualizado EN CURSO; publicación, navegador real y aceptación física pendientes. El commit previo 646598b quedó local: git push falló por ausencia de credenciales; se usa conector GitHub para siguiente publicación.

## R147.2.1 · recuperación ACTUALIZAR y botones inferiores · 30 septiembre 2026
Base remota 9875697784d120289f05ff0c4812823bba65cf59, rama lab/r147-live-scores-r1472-20260930. Captura IMG_5458 confirma instalación LAB R147.1; consultas directas y Vercel confirman LAB y epg-caddy sirviendo R147.2. No se atribuye causa exclusiva al iPhone sin evidencia de su sesión.
Corrección: REINTENTAR deja de quedar oculto tras una consulta fallida; pageshow/focus/online reanudan la consulta. TORNEO y SCORES TORNEO se incorporan debajo de RONDA PARTICULAR/SCORES GRUPO, conservando persistencia y permisos. Scores abre el torneo seleccionado o pide seleccionarlo; no selecciona una ronda privada. Release/caché R147.2.1 permiten distinguir el parche; mismo dominio.
Archivos: `index-grupal.html`, `live-hub.js`, `service-worker.js`, `release.json`, `test-lab-first-open.mjs`, `test-lab-update-recovery.mjs`, `test-lab-registration-private-rounds-entry.mjs`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.
Pruebas dirigidas locales PASS; banco completo/gates/Preview y migración real de navegador pendientes. Ninguna publicación de este parche en Producción. Rollback del candidato: 9875697. Próxima acción técnica: cerrar banco, sellado y Preview; no afirmar reparación de la instalación del usuario antes de verificar migración.

### R147.2.1 · ajuste de bordes inferiores · 30 septiembre 2026, 19:08 Guatemala
Orden del propietario: RONDA PARTICULAR, SCORES GRUPO, TORNEO y SCORES TORNEO con fondo oscuro, texto y borde verde, sin relleno verde; se conservan tamaño, disposición y acciones. Cambio limitado a selectores CSS en `index-grupal.html`. Estado: modificación local; verificación y Preview pendientes. El alias fijo LAB sigue en R147.2; R147.2.1 aún no promovido. Falta evidencia del gate de actualización en navegador, sin afirmar reparación de la instalación.

## R147.2.2 · LIVE y destino de invitaciones de Producción · 30 septiembre 2026
Base bec53e6. Registros Vercel del deployment 7WGkPNJYh82gCsvT3bKgpevkBJDk: /api/live-share 503 a las 19:49–19:50; reproducción local LAB_DATABASE_ISOLATION_REQUIRED. Se limita la activación automática al ID oficial epg-caddy y entorno production; LAB sigue exigiendo su activación explícita y base aislada, Preview y proyectos desconocidos se rechazan. Validaciones de origen, publisher, sesiones, expiración y códigos de primer uso se conservan. inviteOrigin fija cada dominio según proyecto, sin permitir que un valor heredado cruce LAB/Producción. Release R147.2.2; publicación y recorrido real pendientes. Rollback bec53e6. Archivos: api/live-share.js, api/_lib/invite-origin.js, test-live-share-handler.mjs, test-invite-origin.mjs, index-grupal.html, service-worker.js, release.json.

## R147.2.3 · LIVE guardado vencido · 30 septiembre 2026
IMG_5469 confirma fallo en R147.2.2. Registros del commit b77afb4: live-share 403 y live 410 a las 20:17. quickShareGroup no revisaba expiresAt antes de compartir un evento o reutilizar un enlace. Se ignoran streams vencidos y se emite un LIVE del grupo actual con tournament:null; no se reactiva ni extiende el evento anterior, no se altera la ronda local ni sus jugadores/scores. Regresión prueba stream particular/torneo vencido, conservación de snapshot y segundo compartir sin duplicado. Mensajes específicos para permiso, evento vencido y revocación. Rollback b77afb4. Estado: local; pruebas y publicación pendientes. Archivos: live-control.js, test-lab-share-direct.mjs, release.json, index-grupal.html, service-worker.js.


## 30/09/2026 · consentimiento de actualización y selector Campo · R147.2.4 solicitada
El propietario comprobó en IMG_5475/5476 que ambas apps avanzaron a R147.2.3 sin pulsar ACTUALIZAR. Causa: service-worker.js promovía caché en install, activate y navegación ordinaria; escape: controles estáticos de recarga no verificaban la transición del caché completo. Corrección local: conservar shell aprobado; promover sólo navegación con app_version + update_check; descarga completa y meta de release concordante; no borrar cachés antes del éxito; retirar mensaje PROMOTE_BUILD sin consumidor. test-lab-update-recovery.mjs verifica ciclo completo, scripts viejos, rechazo de descarga parcial y consentimiento explícito en ambos dominios. Banco completo anterior PASS en /tmp/gsc-manual-consent-build.log; navegador de migración e iPhone siguen PENDIENTIENTES, sin garantía absoluta.
Orden adicional del propietario: R147.2.4 debe incluir Campo en Crear torneo como selector con los campos del Registro inicial. live-hub.html ahora usa selector nativo, siete nombres iguales al catálogo y La Reunión bloqueada igual que Registro. test-tournament-course-selector.mjs comprueba paridad y disponibilidad. La prueba histórica test-course-catalog.mjs falla por rótulo previo HASTA 6 JUGADORES ausente; no se alteró ni se presenta como PASS.
Archivos: service-worker.js, index-grupal.html, test-lab-update-recovery.mjs, live-hub.html, test-tournament-course-selector.mjs, ROADMAP_OVERALL.md, ROADMAP_A_DETALLE.md, CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md, CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md, CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md, CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json.
Último publicado: 70db4e8e0d6d91bf3e4bc97c30b3f47cc612ca7f en LAB y producción, R147.2.3. Publicación de correcciones aún PENDIENTE. Migración: primero worker corregido manteniendo etiqueta R147.2.3, verificar adopción sin avance automático, después disponibilidad R147.2.4 con ACTUALIZAR. No pulsar actualizador de instalaciones del propietario. Rollback: 70db4e8; sin mutaciones de base de datos ni resurrección de LIVE vencidos.

### 21:07 Guatemala · bloqueo verificable de publicación
Corrección sincronizada en 7c90ba7bbf3c99fa4e01d97acfb995d3deb7724d; árbol d09d4e5e062f9c423beaba6f7b54b21f8c1f596b. Preview LAB dpl_N3VkwX37gLeGs1ZYVvD5JPoBEDGB y producción dpl_DMCaf871kYpke9SDJrPUSAy5JCWE ambos READY, target null. No publicación nueva en dominios fijos; siguen 70db4e8 / R147.2.3.
Prueba real previa en pestaña 20: recarga cambió R147.2 a R147.2.3 y botón ACTUALIZADO sin click, reproduce autoavance. Corrección nueva no se ha comprobado en migración real. Intentos de continuar Vercel mediante CUA: Page.enable timeout, DOMSnapshot.captureSnapshot timeout, Page.getLayoutMetrics timeout. Conector deploy_to_vercel respondió Tool not found. Bloqueo de operación, no aprobación faltante.
Últimas verificaciones PASS: banco completo /tmp/gsc-manual-consent-selector-build.log, test-tournament-course-selector.mjs, test-lab-update-recovery.mjs ambos hosts, project-quality, test-project-quality, roadmap, inventory 766 fuentes. Gate navegador de cuatro versiones sigue pendiente; prueba histórica catálogo falla por rótulo anterior ausente.
Reanudar exactamente: recuperar pestaña Vercel LAB N3VkwX37gLeGs1ZYVvD5JPoBEDGB; verificar Preview y shell descargable; publicar preparación mismo R147.2.3 en ambos dominios y rama antigua; verificar worker nuevo conserva aplicación anterior; después incrementar release coherente R147.2.4, ejecutar gates, sincronizar, publicar ambos y observar ACTUALIZAR sin pulsar instalación del propietario. No declarar botón entregado ni garantía iPhone sin prueba.

## R147.2.4 · prueba de entrega manual en LAB y producción · 30/09/2026
Preparación corregida R147.2.3 publicada desde 7c90ba7 en ambos dominios: LAB dpl_4Ue5jXp1vQE6St6DJtr5Z9pWpMif y producción dpl_7R7XVshM6qbGzx59ZSHk1KAwhA16, READY. Navegador recuperado mediante pestaña nueva; ningún botón de instalaciones del propietario fue pulsado. LAB recarga conserva R147.2.3. En perfil de prueba producción legado R147.2 avanzó a R147.2.3 en primera recarga, confirma transición legacy todavía automática antes de adoptar corrección; no garantiza reparación retroactiva de instalaciones offline. Shell LAB: 50 recursos HTTP200.
Se prepara R147.2.4 solicitada: index-grupal.html, release.json y service-worker.js alineados; namespace nuevo r147-2-4-manual-update; live-hub.html selector nativo Campo con siete campos del Registro, La Reunión pendiente. test-tournament-course-selector.mjs añadido al banco obligatorio scripts/build-manual-lab.mjs. Publicación R147.2.4 y transición visual en ambos dominios PENDIENTES. Rollback técnico: preparación 7c90ba7; sin modificar base de datos.
Archivos registrados: index-grupal.html, release.json, service-worker.js, live-hub.html, test-tournament-course-selector.mjs, scripts/build-manual-lab.mjs, ROADMAP_OVERALL.md, ROADMAP_A_DETALLE.md, CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md, CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md, CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md, CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json.

## R147.2.4.1 · confirmación pendiente del propietario en laboratorio
R147.2.4 publicada en dominios fijos desde 8bccff9: LAB dpl_Ai2DuhVFTfkMqgCGznpy2VF6GfcH y producción dpl_8UqFjqHVDP6ym6FFGJXQax1XC33u, READY. Navegador de prueba en ambos mostró meta R147.2.3 y ACTUALIZAR visible/habilitado; tras click meta R147.2.4, laboratorio conservó Prueba LAB y producción jugador PRUEBA ACTUALIZAR/score5. Capturas antes del click: r14724-laboratorio-actualizar-1790824962794.jpg SHA256 530e6302e59e54199416806b0f44742f37b98bec581cc63311171aba940fad59; producción r14724-produccion-actualizar-1790825025795.jpg SHA256 61fb7d5e7c379fbf3931d967caaeae6d7ee82f165f0023d1efe07ce89af56485. Selector publicado probado por UI: San Isidro elegido, siete campos y La Reunión pendiente; no se creó torneo.
21:24:49: propietario confirma producción recibió/pulsó correctamente; laboratorio apareció ya R147.2.4 sin tecla. Por tanto entrega instalada laboratorio FAIL, no resuelta por PASS Chromium. Hipótesis sustentada: motor anterior no adoptó preparación; no hay evidencia del controlador exacto de su iPhone. Reproducción técnica: fuente histórica 70db4e8 reemplaza OLD CARD por NEW CARD en install/activate sin click; motor corregido retiene OLD CARD. Fuente exacta archivada en tests/fixtures/r14723-service-worker-before-manual-consent.js y prueba negativa permanente en test-lab-update-recovery.mjs. También existen rutas personales que deliberadamente van a red para comprobar permisos; requieren evaluación separada sin debilitar autorización.
Se prepara R147.2.4.1 como nueva prueba de entrega manual desde R147.2.4 reportada ya instalada. No declarar garantía ni PASS iPhone antes de confirmación. Archivos: index-grupal.html, release.json, service-worker.js, test-lab-update-recovery.mjs, tests/fixtures/r14723-service-worker-before-manual-consent.js, ROADMAP_OVERALL.md, ROADMAP_A_DETALLE.md, CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md, CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md, CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md, CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json. Rollback 8bccff9 / R147.2.4. Publicación R147.2.4.1 PENDIENTE.
Incidencia operativa: hubo intervalo mayor de60s entre reportes durante análisis; no fingir actividad ni considerar documento como temporizador. Continuar reportando acciones comprobables por tramo.

## R147.2.4.1 · recuperación y Scores · 30/09/2026
Referencia única recuperada: 2B91A34E-3B06-4E5C-BB29-CC6C1F92378C.png (2—Categoría); Universales descartada expresamente. Tarjeta única con cinco columnas, tres botones e inline search; Favoritos en la misma tabla, logo permite administración autorizada sin agregar controles. Recuperación incremental sobre aebe69e, patch aplicado excluyendo manual ya actualizado. Banco técnico completo LAB PASS; navegador local bloqueado por descarga truncada, revisión Preview EN CURSO. Ningún entorno fijo publicado ni instalación del propietario actualizada. Tareas 2–7 siguen pendientes.
Archivos: `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `ROADMAP_A_DETALLE.md`, `ROADMAP_OVERALL.md`, `index-grupal.html`, `live-hub.html`, `live-hub.js`, `release.json`, `scores-ui.css`, `service-worker.js`, `test-lab-registration-private-rounds-entry.mjs`, `test-lab-tournament-navigation.mjs`, `test-lab-update-recovery.mjs`, `test-v353-live-hub.mjs`, `tests/fixtures/r14723-service-worker-before-manual-consent.js`.


## Revisión Scores 2026-09-30 22:22 Guatemala · pendiente visual
Corrección del propietario: tipografía y tamaños equivalentes comunes a ronda, torneo y detalle; logo aumentado 25% manteniendo proporciones. Fixture móvil 390×844 sólo con demostración. Compartir conserva control de autorización. Pruebas de Scores y navegación PASS; no implica aceptación visual ni publicación final. Pendientes 2–7 sin declarar resueltos.
Archivos: `live-hub.js`, `scores-ui.css`, `tests/fixtures/scores-mobile-review.html`.


### Ajuste visual comprobado 22:26 Guatemala
Preview 6d8a8fd READY; filtro Senior y búsqueda devuelven una fila, logo ampliado visible. Se ajusta separación HOYO/GROSS/NETO en `scores-ui.css`; se conserva tipografía común. Captura móvil guardada; aceptación final pendiente.


## Scores · controles y conservación · 2026-09-30 22:40 Guatemala
SCORES TORNEO usa asociación guardada, prepara publicación antes de navegar y conserva ruta de retorno a la Score Card y su cuenta. Favoritos limpia búsqueda y categoría previas. Títulos/subtítulos y nombres de Scores sin selección; entradas siguen editables. Fixture de recuperación conserva ronda y scores y retiene publicación fallida. Perfil técnico LAB PASS; servidor/navegador pendientes. Invitado difuminado y detalle común aún pendientes. Prueba histórica R143 fija versiones y flujo anteriores, no pertenece al perfil vigente.
Archivos modificados: `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md`, `CONTROL_PROYECTO_SCIRE/MANUAL_TAREAS_R147_2.md`, `ROADMAP_A_DETALLE.md`, `ROADMAP_OVERALL.md`, `gsc-design-system.css`, `index-grupal.html`, `live-control.js`, `live-hub.js`, `scores-ui.css`, `scripts/build-manual-lab.mjs`, `test-lab-tournament-navigation.mjs`, `test-lab-update-recovery.mjs`, `test-scores-tournament-recovery.mjs`, `CONTROL_PROYECTO_SCIRE/MATRIZ_ACEPTACION_SCORES_R147_2_4_1.md`.


## Comprobación real de publicación · 2026-09-30 22:52 Guatemala
Preview cab0755: Registro dos jugadores → crear evento → iniciar Score Card → anotar Gross 5 y 4 → SCORES TORNEO. Ruta y retorno funcionaron, ronda conserva ambos scores; tabla vacía. Consulta LAB confirmó evento activo, dos asignados y cero streams conectados. Se corrigió dependencia del título visible: asociación personal por ID permite conectar sin nombre opcional. También se protege score más reciente frente a respuesta atrasada; fixture de concurrencia PASS. Fecha de calendario no debe convertirse al día anterior; prueba 2026-09-30 PASS. Perfil LAB completo PASS, repetición de servidor/navegador pendiente.
Archivos: `live-control.js`, `scores-ui.js`, `test-scores-tournament-recovery.mjs`, `test-scores-ui.mjs`.


## Recuperación comprobada y títulos fijos · 2026-09-30 23:06 Guatemala
Preview `11160d0d36bf189f2ce16d3463a1918fbca24612`, evento de prueba `779c77e8-4f12-47ac-adfe-6b55cbc427c8`: Registro → Score Card (Gross 5 y 4) → SCORES TORNEO publica dos jugadores. Consulta LAB confirmó revisión 8 y Gross/Net 5/4 y 4/4. General muestra ambos; Categoría Senior filtra la asignación; favoritos elegidos en General y Senior aparecen juntos. Regreso a la misma Score Card conserva ambos scores. Captura real `/workspace/scratch/scores-connected-favorites-20260930.jpg`. No constituye inspección de las instalaciones privadas del propietario ni prueba de KIRSTES en producción.

Orden adicional: TODOS los títulos y subtítulos deben ser rótulos fijos, sin edición ni selección. Incluye encabezados semánticos y rótulos div/span; no bloquea los campos de captura. Navegador real de Score Card comprobó `user-select: none` en sus títulos; cobertura visual completa del paquete pendiente. Se conserva la referencia 2—Categoría; Universales anulada como imagen de diseño.

Detalle común: corregido doble toque entre reemplazos de filas LIVE y doble clic sobre estrella. Pruebas de regresión PASS: 18 posiciones, dos nines, score más reciente, estrella independiente y no combinar toques de jugadores distintos. Comprobación real de todas las vistas todavía PENDIENTE. No publicado en dominios fijos.
Archivos: `scores-ui.js`, `scores-ui.css`, `gsc-design-system.css`, `test-scores-ui.mjs`, `CONTROL_PROYECTO_SCIRE/MATRIZ_ACEPTACION_SCORES_R147_2_4_1.md`.


## Detalle móvil · 2026-09-30 23:12 Guatemala
Preview ab6bed0, iframe real 390×844, demo aislada: General B 05 muestra 18 pares G/N; doble clic en estrella no abre diálogo. Categoría Senior conserva categoría y búsqueda tras cerrar X. Favoritos reúne B 05 y Senior 01; detalle tiene dos tablas y 18 posiciones y cierre conserva ambas filas. Captura real `/workspace/scratch/scores-mobile-detail-favorites-20260930.jpg`. La captura encontró etiqueta GROSS/NETO demasiado próxima al primer score: `scores-ui.css` reserva 48 px para primera columna; revisión visual posterior pendiente. No prueba doble toque en iPhone físico.
Archivos: `scores-ui.css`, `scores-ui.js`, `test-scores-ui.mjs`, `CONTROL_PROYECTO_SCIRE/MATRIZ_ACEPTACION_SCORES_R147_2_4_1.md`.


## Visor LIVE con detalle común · 2026-09-30 23:19 Guatemala
`live.html` carga el detalle compartido antes del renderizador. `live-view.js` vincula cada nombre al jugador y snapshot de su propio grupo; test nuevo detectó y corrigió pérdida de índice en envoltorio de categoría. PASS `test-live-view-scores.mjs` y resumen por modalidad; navegador todavía pendiente. `scores-ui.css` comparte fuente/tamaño de nombres y valores y logo horizontal, 25% mayor que visor previo.
Prueba histórica V352 falla porque esperaba autorización en middleware limitada a read; R147 delega LIVE al servidor que controla token/secreto, origen y acceso personal. No cambiar ni reducir permisos para satisfacer un chequeo histórico. Perfil vigente de integración/seguridad debe pasar y LIVE real debe comprobarse antes de publicar.
Archivos: `live.html`, `live-view.js`, `scores-ui.css`, `test-live-view-scores.mjs`, `scripts/build-manual-lab.mjs`.


## Evidencia navegador tareas 3 y 4 · 2026-09-30 23:26 Guatemala
Preview `71f7d9922c24ba1c8dd3104f1a8eaa4f6cc5dd67`: enlace privado real de ronda existente, dos jugadores, abre 18 scores del segundo jugador PRUEBA R147 B y muestra 4/4 en hoyo 1. X cierra sólo detalle y mantiene ambos jugadores. Captura `/workspace/scratch/scores-round-live-detail-20260930.jpg`. General, Categoría y Favoritos ya comprobados en revisión móvil anterior; móvil físico sigue distinto de navegador.
Botones inferiores en navegador real: ATRÁS, VER MI TARJETA, TORNEO y SCORES TORNEO, fondo rgb(5,5,5), borde rgb(49,255,0), 1/2 px según botón. Captura `/workspace/scratch/score-card-bottom-buttons-20260930.jpg`. No requiere rehacer el estilo implementado.
Siguiente tarea: prueba manual R147.2.4 → R147.2.4.1 en Preview aislado de cada proyecto, sin pulsar ACTUALIZAR en las instalaciones del propietario. Rama de prueba `lab/r147241-manual-update-proof-20261001` parte de `aebe69ede01f071d6bbff30edfa607b71dd5875b`, release R147.2.4 verificado.
Archivos: `live.html`, `live-view.js`, `scores-ui.css`, `test-live-view-scores.mjs`, `CONTROL_PROYECTO_SCIRE/MATRIZ_ACEPTACION_SCORES_R147_2_4_1.md`.


## Causa de actualización automática personal · 2026-09-30 23:34 Guatemala
Fallo encontrado: navegación de Score Card con personalEvent/personalAccount devolvía directamente HTML nuevo tras autorización y eludía consentimiento manual. `service-worker.js` conserva validación actual en servidor, rechaza acceso revocado y sirve versión aceptada hasta ACTUALIZAR; descarga incompleta mantiene versión anterior. `test-lab-update-recovery.mjs` ejecuta esos casos para LAB y producción con cuentas personales. PASS automatizado, prueba real de perfiles todavía pendiente. No se pulsó ACTUALIZAR en instalaciones del propietario.
Archivos: `service-worker.js`, `test-lab-update-recovery.mjs`.


## Registro integral de recuperación y actualización · 2026-09-30 23:37 Guatemala
Respaldo original preservado: `CONTROL_PROYECTO_SCIRE/RECUPERACION_R147_2_4_1.patch`. Las pruebas de base inicial f77f159/a8fae346 no publicaron por controles de documentación; base aislada corregida f489db5 READY en ambos proyectos conserva código exacto R147.2.4 y sólo cambia documentación. Perfiles navegador propios: ACTUALIZACION LAB Gross/Net 5/4; ACTUALIZACION PROD 6/5. Ambos siguen en R147.2.4 antes de ofrecer nueva versión. No pertenecen a instalaciones del propietario. Actualización real todavía pendiente.
Archivos: `service-worker.js`, `test-lab-update-recovery.mjs`, `CONTROL_PROYECTO_SCIRE/RECUPERACION_R147_2_4_1.patch`, `CONTROL_PROYECTO_SCIRE/MATRIZ_ACEPTACION_SCORES_R147_2_4_1.md`.


## Invitado, LIVE y actualización real · 2026-10-01 00:04 Guatemala
Orden conservada: títulos/subtítulos fijos, sin edición ni selección; misma fuente y tamaños correspondientes en Scores; logos 25% mayores; imagen Universales anulada; General → Categoría asignada → Favoritos mezclados, todos con detalle de 18 hoyos y X. CAMPO R147.2.4 se conserva. Todos estos requisitos permanecen en manual y matriz.
Actualización real en perfiles propios aislados de ambos proyectos: R147.2.4 conservó scores antes de ACTUALIZAR; tras pulsación explícita sólo en perfiles propios, R147.2.4.1 conservó LAB Gross/Net 5/4 y PROD 6/5, jugadores y hoyo 2. Capturas /workspace/scratch/manual-lab-after-proof-20260930.jpg y /workspace/scratch/manual-prod-after-proof-20260930.jpg. No se pulsó actualización del propietario. Descarga fallida conserva versión anterior en prueba completa del worker; no simulada aún en navegador.
Invitado: enlace separado de código, ventana encima de Scores nublado e inerte, sin nombres ficticios ni datos privados antes de validar. Códigos personales y antiguos ligados a evento/tipo usan su endpoint correspondiente; destino validado por servidor y origen. Estados separados de cerrado, vencido, revocado y fallo real. PASS pruebas PostgreSQL local y formulario real ejecutado en VM; verificación de navegador aún pendiente.
Activación: producción no puede depender de bandera LAB. Nuevo guard exige GSC_PERSONAL_ACCESS_PRODUCTION_READY=1 en Production y GSC_PERSONAL_ACCESS_LAB_READY=1 en Preview; default denegado. Bandera Production todavía pendiente de configuración/verificación en ambos proyectos. No cambiar conexión ni datos del propietario. R147.2.4.1 aún NO publicada en dominios fijos.
Archivos: `api/_lib/code-access.js`, `api/_lib/live-share.js`, `api/live-share.js`, `api/live.js`, `api/personal-events.js`, `code-entry.html`, `code-entry.js`, `live-control.js`, `live-hub.js`, `live-share.js`, `live-view.js`, `scripts/build-manual-lab.mjs`, `test-lab-code-entry.mjs`, `test-live-share-postgres.mjs`, `api/_lib/personal-access-activation.js`, `test-personal-access-activation.mjs`.


## Publicación autorizada por Git · 2026-10-01 01:47 Guatemala
Orden reiterada del propietario: publicar ambos dominios; ACTUALIZAR lo pulsa únicamente el propietario en ambas instalaciones. No realizar actualización remota ni pulsar su botón.
Repositorio recuperado exacto d987040 / árbol 31bd187010e3b9ba730ca463c23bb4c05d5decdf. Main 89c64f3 difiere por un commit vacío sobre e0e11a9; integración preserva ambos historiales y los archivos ya verificados. Evidencia Vercel: push main 89c64f3 produjo Production READY LAB dpl_HAQ75MXhXDvqnAKTzWKkocoSFNU8 y PROD dpl_2nzrTn5ft7MX1h4fw4Bd3t3FLw2L.
Bloqueos concretos: herramienta deploy_to_vercel inexistente y CLI sin sesión, cuyo acceso a api.vercel.com fue bloqueado por política de red. Vía alternativa real: integración a main mediante GitHub para activar la integración Git existente, sin cambiar dominios ni bases de datos.
vercel.json incorpora únicamente bandera no secreta GSC_PERSONAL_ACCESS_PRODUCTION_READY=1, entregada a funciones por configuración oficial compatible. El guard exige esta bandera en Production; Preview mantiene exclusivamente su bandera LAB. No cambia permisos de miembros, tokens ni conexiones. test-personal-access-activation.mjs verifica configuración entregada y separación de entornos. Publicación todavía pendiente de controles y envío.
Pantalla invitado comprobada en navegador a las 00:12: ventana sobre Scores nublado, logo ampliado, título Arial 19 px, título y subtítulo user-select:none, sin contenteditable. Captura guest-code-overlay-20261001.jpg. Ingreso válido y cambios LIVE en ambos entornos no certificados todavía; no convertir READY en PASS funcional.
Archivos integrados desde main, con sus cambios previos conservados: `.github/workflows/full-app-manual-physical-parity.yml`, `COMPENDIO_FINAL_FUNCIONES_USUARIO.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/DIRECTRICES_MANDATORIAS.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/MATRIZ_GATE_0_PROYECTO.json`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/MATRIZ_GATE_0_PROYECTO.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/MATRIZ_LIVE_CODIGO_UN_SOLO_USO_R144.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_LIVE_018_GOLF_SCORE_CARD_GT_LIVE.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R144/ESTADO.md`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R144/NEON_Y_PUBLICACION.md`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R144/browser-general.log`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R144/browser-private.log`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R144/browser-share.log`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R144/build-local.log`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R144/golf-mobile-detail.png`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R144/golf-private-scores.png`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R144/golf-share-code.png`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R144/golf-shared-favorites.png`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R144/golf-shared-private-detail.png`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R144/gsc-r144-remote-detail.jpg`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R144/gsc-r144-stable-private-detail.jpg`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R144/gsc-r144-stable-publication.jpg`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R144/vercel-lab-config.jpg`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R145/ESTADO.md`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R145/build.log`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R145/gate-bloqueado.log`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R146/ESCENARIO_SEIS_JUGADORES_20260930.json`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R146/ESTADO.md`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R146/RECORRIDO_REGISTRO_20260930.md`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R146/build.log`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R146/cloud-profile.log`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R146/gates.log`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R146/guest-build.log`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R146/lab-preview-env.jpg`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R146/preview-before-visibility-fix.jpg`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R146/preview-r146-detail-confirmed.jpg`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R146/preview-r146-fixed-entry.jpg`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R146/preview-r146-latest-detail.jpg`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `CONTROL_PROYECTO_SCIRE/MANUAL_TAREAS_R147_2.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/MATRIZ_ACEPTACION_SCORES_R147_2_4_1.md`, `CONTROL_PROYECTO_SCIRE/PROMPT_CONTINUIDAD_R147_2.md`, `CONTROL_PROYECTO_SCIRE/RECUPERACION_R147_2_4_1.patch`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `ROADMAP_A_DETALLE.md`, `ROADMAP_OVERALL.md`, `access.html`, `api/_lib/account-auth.js`, `api/_lib/app-access.js`, `api/_lib/code-access.js`, `api/_lib/database.js`, `api/_lib/device-event-identity.js`, `api/_lib/invite-origin.js`, `api/_lib/live-share.js`, `api/_lib/personal-access-activation.js`, `api/_lib/personal-event-access.js`, `api/_lib/private-round-lifecycle.js`, `api/account.js`, `api/app-access.js`, `api/live-share.js`, `api/live.js`, `api/personal-events.js`, `auth-gate.js`, `code-entry.html`, `code-entry.js`, `docs/manual/current/APP_ACCESS.png`, `docs/manual/current/APP_ATAJOS_OVERLAY.png`, `docs/manual/current/APP_CAMPEONATO_REGISTRO.png`, `docs/manual/current/APP_CAMPEONATO_SCORECARD.png`, `docs/manual/current/APP_CATEGORIAS_OFICIALES.png`, `docs/manual/current/APP_CORRECCION_ATAJOS.png`, `docs/manual/current/APP_HISTORIAL_ATAJOS.png`, `docs/manual/current/APP_MODE_FOUR_BALL.png`, `docs/manual/current/APP_MODE_MATCH_PLAY.png`, `docs/manual/current/APP_MODE_PRACTICE.png`, `docs/manual/current/APP_MODE_SKINS.png`, `docs/manual/current/APP_MODE_STABLEFORD.png`, `docs/manual/current/APP_MODE_UNIVERSALES.png`, `docs/manual/current/APP_SCORECARD_ATAJOS.png`, `docs/manual/current/APP_SETUP_CURRENT.png`, `docs/manual/current/APP_TARJETA_FINAL_ATAJOS.png`, `docs/manual/current/APP_TORNEOS_ATAJOS.png`, `docs/manual/current/APP_TORNEOS_HUB.png`, `docs/manual/current/MONITOR_TIEMPO_CONTEXTO_LAB.png`, `docs/manual/current/MONITOR_TIEMPO_REAL_LAB.png`, `docs/manual/current/OPERACION_RONDA_INFERIOR_REAL_LAB.png`, `gsc-design-system.css`, `guest-access.js`, `index-grupal.html`, `live-control.js`, `live-hub.html`, `live-hub.js`, `live-share.js`, `live-view.js`, `live.html`, `manifest.webmanifest`, `manual.html`, `middleware.js`, `package.json`, `personal-events.js`, `private-rounds.js`, `release.json`, `scores-ui.css`, `scores-ui.js`, `scripts/build-manual-lab.mjs`, `scripts/live-share-test-server.mjs`, `scripts/manual-screen-parity-gate.mjs`, `scripts/rebuild-inventory-pdfs.py`, `scripts/release-matrix-gate.mjs`, `service-worker.js`, `shortcuts-ui.js`, `test-card-artifacts.mjs`, `test-invite-origin.mjs`, `test-lab-account-gate.mjs`, `test-lab-code-entry.mjs`, `test-lab-database-isolation.mjs`, `test-lab-deployment-gate.mjs`, `test-lab-device-event-identity.mjs`, `test-lab-first-open.mjs`, `test-lab-global-operational-audit.mjs`, `test-lab-guest-account-entry.mjs`, `test-lab-guest-login-transition.mjs`, `test-lab-medal-monitor.mjs`, `test-lab-no-production-proxy.mjs`, `test-lab-owner-session-priority.mjs`, `test-lab-private-lifecycle.mjs`, `test-lab-private-round-share-flow.mjs`, `test-lab-private-rounds.mjs`, `test-lab-r60-physical-matrix.mjs`, `test-lab-r60-production-refresh.mjs`, `test-lab-registration-private-rounds-entry.mjs`, `test-lab-registration-return-state.mjs`, `test-lab-round-create-modal.mjs`, `test-lab-share-direct.mjs`, `test-lab-shortcuts-navigation.mjs`, `test-lab-tournament-navigation.mjs`, `test-lab-update-recovery.mjs`, `test-live-official-flow.mjs`, `test-live-share-browser.cjs`, `test-live-share-handler.mjs`, `test-live-share-middleware.mjs`, `test-live-share-neon.mjs`, `test-live-share-postgres.mjs`, `test-live-view-scores.mjs`, `test-manual-current-lab.mjs`, `test-manual-no-assistant.mjs`, `test-manual-startup-sharing.mjs`, `test-personal-access-activation.mjs`, `test-personal-event-permissions.mjs`, `test-personal-front-end.mjs`, `test-personal-storage-access.mjs`, `test-private-scores-browser.cjs`, `test-r18-owner-guest-24h-access.mjs`, `test-scores-tournament-recovery.mjs`, `test-scores-ui-browser.cjs`, `test-scores-ui.mjs`, `test-tournament-course-selector.mjs`, `test-v253-live-previous-round.mjs`, `test-v263-compact-players-back-button.mjs`, `test-v278-card-image-pdf-export.mjs`, `test-v304-homogeneous-registration-actions.mjs`, `test-v306-match-play.mjs`, `test-v311-live-support-link.mjs`, `test-v311-manual-semantic-coverage.mjs`, `test-v353-live-hub.mjs`, `test-v397-card-in-out-back-contract.mjs`, `test-v405-registration-clear-final-mobile.mjs`, `tests/fixtures/r14723-service-worker-before-manual-consent.js`, `tests/fixtures/scores-mobile-review.html`, `vercel.json`.


## Validación de integración antes de publicar · 2026-10-01 01:49 Guatemala
El main remoto 89c64f3 proviene de rollback R128 y no contiene la base protegida V322; candidato R147 sí contiene V322. Integración local con commit vacío main realizada sin conflictos ni cambios adicionales de archivos.
No se elimina el candado de base protegida. scripts/project-quality-gate.mjs admite validación explícita del SHA propuesto sólo si coincide exactamente con HEAD, contiene todo main actual y conserva la base protegida. Contexto actual mantiene su rechazo al rollback antiguo. test-project-quality-gate.mjs añade rechazo permanente a SHA propuesto falso. Publicación requiere PASS de este contexto propuesto antes de cambiar main. No equivale a PASS de navegador ni a cambio ya desplegado.
Archivos: scripts/project-quality-gate.mjs; test-project-quality-gate.mjs; vercel.json; test-personal-access-activation.mjs; CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json.


## Corrección de diagnóstico de ascendencia · 2026-10-01 01:53 Guatemala
GitHub compare 0dc1ba7...d987040 confirmó ahead 1446, behind 0, merge-base V322. El FAIL anterior provenía del clon superficial recuperado, no de ausencia real de V322 en la fuente. git fetch --unshallow recuperó la historia completa; se retira el ajuste provisional del gate y su prueba. scripts/project-quality-gate.mjs y test-project-quality-gate.mjs quedan exactamente como d987040; no se debilita ni cambia el candado vigente. La integración a7e7219 conserva main y la fuente canónica; no se forzó unión de historiales ni se sobrescribieron archivos.
Archivos de cierre: vercel.json; test-personal-access-activation.mjs; scripts/project-quality-gate.mjs; test-project-quality-gate.mjs; CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json. Production pendiente del envío y resultado Vercel; propietario exclusivamente pulsa ACTUALIZAR en ambas instalaciones.


## R147.2.4.2 · entrega manual y aviso invisible · 2026-10-01 04:32 Guatemala
Capturas del propietario: IMG_5490 laboratorio instalado R147.2.4 sin opción ACTUALIZAR; IMG_5489 producción instalada R147.2.4.1. Servidor anterior publicado eded5f788c5c6a0b2efa24d9a022bea194fd4950; la entrega física LAB es FAIL, aunque servidor y API pasaron. No se atribuye cambio automático de producción sólo por su etiqueta.
Defecto reproducido: después de ACTUALIZADO y fallo de release.json, showBuildCheckFailure usaba display vacío, que no vence .mandatory-update display:none. Prueba reforzada falla con fuente anterior y pasa con display:block. Escape: el test anterior comparaba únicamente contra none, sin reproducir el CSS efectivo.
Segundo defecto reproducido: instalación del controlador esperaba descargar 50 recursos aun existiendo tarjeta aprobada. La prueba nueva falla 50 !== 0 con el código anterior. El controlador sucesor adopta primero el caché aprobado y no descarga shell nuevo hasta consentimiento explícito; primera instalación sin caché conserva preparación offline. No fuerza navegación, recarga, actualización de app ni borra cachés.
R147.2.4.2 mantiene fuente Scores 2—Categoría, Universales anulada, fuente común, logos ampliados, detalle18/X, favoritos independientes, selector CAMPO y todos los datos/controles anteriores. Únicamente cambia entrega/aviso. tests/fixtures/update-retry-review.html permite verificar en navegador el aviso usando funciones y CSS reales del paquete, con respuestas aisladas de fallo/nueva/actual; no contiene ronda ni datos, no prueba por sí solo un iPhone.
Pruebas dirigidas test-lab-first-open y test-lab-update-recovery PASS: recuperación visible, versión anterior conservada antes del click, scripts aprobados, descarga fallida conserva versión, permisos personales vigentes y consentimiento. Prueba local navegador bloqueada ERR_BLOCKED_BY_CLIENT para localhost; NO declarada realizada. Perfil completo, Preview, recorrido real y publicación todavía pendientes. Nadie pulsó ACTUALIZAR del propietario.
Rollback de publicación: eded5f788c5c6a0b2efa24d9a022bea194fd4950 / R147.2.4.1; no rollback de datos. Producción sólo con autorización ya existente y controles correspondientes; el propietario exclusivamente pulsa ACTUALIZAR.
Archivos de esta versión: `index-grupal.html`, `service-worker.js`, `release.json`, `test-lab-first-open.mjs`, `test-lab-update-recovery.mjs`, `tests/fixtures/update-retry-review.html`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `CONTROL_PROYECTO_SCIRE/MANUAL_TAREAS_R147_2.md`, `CONTROL_PROYECTO_SCIRE/MATRIZ_ACEPTACION_SCORES_R147_2_4_1.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.


### R147.2.4.2 · Preview y conservación comprobados · 2026-10-01 04:43 Guatemala
Preview fuente 54fdf1d9996f9b6fd9e7e7716ff8c13a579333a3 / árbol 76f8267b1e52bf67d9fd5190d9789aa8edb6409b. LAB dpl_5ju7ymLsq8tgDAGSFfMvFFj5aE3o y PROD dpl_BAWcaXqPJ8Qi6pWHX2Pp3WsxXocv READY. Perfil propio real sobre alias Preview epg-caddy-git-lab-r147241-scores-revi-fe99ff-epgcaddys-projects.vercel.app: registro PRUEBA ENTREGA 4.2/SENIOR/14/BLANCAS; H1 Gross5/Net4, H2 seleccionado. Antes del click versión4.1, ACTUALIZAR visible/habilitado y última4.2. Tras click explícito sólo en perfil propio versión4.2, mismos jugador/Gross5/Net4 y hoyo2. No datos ni instalaciones del propietario alterados. Histórico del fixture vacío: no afirmar preservación de historial físico por esa prueba.
Prueba visual aislada usa CSS y funciones reales: detectado montaje incorrecto about:srcdoc (origen sin URL) en segundo caso nueva versión; corregido a iframe con URL normal del mismo fixture. Ese caso aún pendiente de nueva comprobación; no usar el fallo del fixture como diagnóstico de la aplicación.
Cambian sólo tests/fixtures/update-retry-review.html y registros de esta revisión: ROADMAP_OVERALL.md, ROADMAP_A_DETALLE.md, CONTROL_PROYECTO_SCIRE/MANUAL_TAREAS_R147_2.md, CONTROL_PROYECTO_SCIRE/MATRIZ_ACEPTACION_SCORES_R147_2_4_1.md, CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md, CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md, CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md, CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json. Código del producto idéntico al Preview ya probado. Publicación nueva fija y entrega física LAB siguen pendientes; propietarios exclusivamente pulsan ACTUALIZAR.


## R147.2.4.3 · Inicio y entrega heredada · 2026-10-01 05:13 Guatemala

Evidencia del propietario IMG_5494: laboratorio sigue R147.2.4 sin ACTUALIZAR. IMG_5495: producción abre monitor antiguo Santa delfina. Se conserva FAIL físico de laboratorio; R147.2.4.2 publicada no lo resolvió en su dispositivo. Fuente visual vigente IMG_5493 / 2—Categoría; Universales anulada.

Defecto de Inicio reproducido: middleware desviaba `inicio=1` por cookie personal de evento anterior. Prueba negativa `test-live-share-middleware.mjs` falló con null != 1; después de corrección pasa. Inicio explícito prevalece; URLs personales explícitas siguen autorizadas y retorno implícito conserva evento. No se borran cookies, rondas, scores, jugadores, historial ni asignaciones.

`app-update.js` añade descubrimiento independiente de CSS heredado; consulta por mensaje GET_APPROVED_RELEASE al worker, compara versión aprobada real con publicación y ofrece ACTUALIZAR, o REINTENTAR ante fallo. El worker añade únicamente importación del control al script de Menú conservado; live-hub carga control sin depender de la Score Card. Ningún check navega, promueve versión ni borra cachés. Sólo click manual dispara descarga completa previamente transaccional; guarda tarjeta/draft y conserva contexto personal, abre Inicio. Publicación no pulsa instalaciones del propietario.

Pruebas dirigidas PASS en ambos dominios simulados: aprobado R147.2.4, aviso manual, error accionable, versión actual oculta control; worker conserva scripts y tarjeta hasta click, descarga parcial conserva versión, permisos revocados denegados. `tests/fixtures/old-update-review.html` contiene CSS heredado real para revisión de capas sin datos. Prueba de navegador y publicación pendientes a este corte; no equivalen a prueba física iPhone.

Se conservan CAMPO R147.2.4, Scores aprobados General/Categoría/Favoritos/Ronda, detalle18/X, estrellas independientes, fuente común, logos25%, LIVE y sus permisos/caducidad. Alcance incremental: middleware, control manual, worker, live-hub HTML, versión y bancos. Rollback publicado: 82c940bbaae8ba53464e9dbff649ebe95027b5df (R147.2.4.2); no cambios de base de datos.


### R147.2.4.3 · control posterior al commit · 05:17 Guatemala

Preview 2adc2f8 ERROR en ambos proyectos: ROADMAP no nombraba test-update-delivery-control.mjs, archivo nuevo omitido del diff previo al commit. Reproducción local posterior al commit FAIL con ese nombre. Se registra inventario completo de archivos; esta corrección es documental, no altera producto. No se publicó main. Control permanente: ejecutar ROADMAP después de incorporar archivos nuevos.

Archivos de R147.2.4.3: `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `CONTROL_PROYECTO_SCIRE/MANUAL_TAREAS_R147_2.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/MATRIZ_ACEPTACION_SCORES_R147_2_4_1.md`, `ROADMAP_A_DETALLE.md`, `ROADMAP_OVERALL.md`, `app-update.js`, `index-grupal.html`, `live-hub.html`, `middleware.js`, `release.json`, `scripts/build-manual-lab.mjs`, `service-worker.js`, `test-lab-update-recovery.mjs`, `test-live-share-middleware.mjs`, `test-update-delivery-control.mjs`, `tests/fixtures/old-update-review.html`, `vercel.json`.


### R147.2.4.3 · alcance de prueba visual · 05:24 Guatemala

Preview c242b815 READY en ambos proyectos. CSS R147.2.4 real reproduce ocultación del botón heredado al abrir una capa. Primer montaje no acreditó el aviso independiente; se cambia sólo fixture para simular explícitamente publicación posterior (+VISUAL), consultar versión aprobada del controlador real y medir geometría, sin pulsar ni instalar esa versión inexistente. No se presenta este montaje como migración física. Banco worker con nombre de caché y meta reales R147.2.4 PASS en ambos dominios; descarga parcial y ausencia de consentimiento preservan aprobado anterior. Fuente del producto sin cambios respecto a 2adc2f8.


### R147.2.4.3 · espera del controlador · 05:28 Guatemala

Montaje visual quedó en Consultando controlador sin respuesta. Se detectó dependencia sin límite de register/update y serviceWorker.ready en app-update.js. Ahora check arranca inmediatamente, ready tiene plazo 8 s y error deja REINTENTAR visible, nunca navega ni instala. Test-update-delivery-control añade controlador eternamente pendiente; PASS en ambos dominios. Control negativo contra fuente anterior termina pendiente (exit13); no acredita iPhone. Nueva revisión Preview requerida antes de publicar.


## R147.2.4.4 · recuperación sin espera del controlador · 2026-10-01 05:54 Guatemala

Evidencia del propietario: IMG_5501 Producción abre Scores Santa delfina con REINTENTAR que no resuelve; IMG_5502 LAB permanece R147.2.4, Jessie, hoyo6, sin ACTUALIZAR. Ambos son FAIL instalados. El navegador nuevo con R147.2.4.3 no reproduce su instalación y no constituye entrega física.

Reproducciones negativas reales con fuente HEAD 913f588: test-update-delivery-control.mjs termina exit13 pendiente de ready; test-lab-update-recovery.mjs falla 2 != 0 consultas de red durante adopción de tarjeta anterior. app-update.js ahora lee primero la versión de la tarjeta cargada, o del último caché aprobado completo en Scores; controlador antiguo/sin respuesta no bloquea el botón cuando release.json publicó una versión válida. Si no se conoce versión aprobada, ofrece recuperación sólo por click explícito. No navega ni instala durante checks, no borra datos/cachés. Error de publicación conserva REINTENTAR. El worker adopta caché completo sin red; ignora cachés vacíos de sucesores interrumpidos; consulta de versión posterior limitada a8s.

Orden vigente del propietario: apertura instalada debe mostrar pantalla inicial. pwa-launch.html añade inicio=1; fuente pwa en HTML y middleware abre Registro preservando la ronda. Enlaces personales explícitos mantienen autorización; retorno normal dentro de un evento conserva contexto. No se borran cookies, Jessie, hoyo6, scores, jugadores, WhatsApp, rondas ni historial; sin mutaciones de base de datos.

PASS dirigidos: descubrimiento en ambos dominios con ready pendiente, mensaje legado ausente, metadato de tarjeta, caché desde Scores, recuperación desconocida con release válido, fallo de red y sólo click; worker conserva tarjeta y scripts, caché vacío interrumpido, permisos personales revocados y descarga parcial; Inicio/middleware, project-quality y control negativo. Banco completo previo al último ajuste de caché PASS; repetir banco completo después de ese ajuste. Preview y entrega iPhone PENDIENTES; publicación fija NO realizada. Rollback servidor 913f588 / R147.2.4.3, sin rollback de datos.

Archivos de esta versión: `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `CONTROL_PROYECTO_SCIRE/MANUAL_TAREAS_R147_2.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/MATRIZ_ACEPTACION_SCORES_R147_2_4_1.md`, `ROADMAP_A_DETALLE.md`, `ROADMAP_OVERALL.md`, `app-update.js`, `index-grupal.html`, `middleware.js`, `pwa-launch.html`, `release.json`, `service-worker.js`, `test-lab-update-recovery.mjs`, `test-live-share-middleware.mjs`, `test-update-delivery-control.mjs`, `test-v368-canonical-home-entry.mjs`.


## R147.2.4.5 · 1 octubre 2026 · revisión de actualización consecutiva B

Base A R147.2.4.4 publicada READY en LAB Preview dpl_A1ivGEz4XcFoogoqDU21SHn3nbi9, commit 01d4145d4c6033b09ee18d510a90e96d3060453e. Perfil propio de Chromium: PRUEBA ACTUALIZACION/SENIOR/14/BLANCAS, WhatsApp sintético 00000000, 18 hoyos Gross5, Gross90/Net76, tarjeta cerrada oficialmente mediante UI. Inicio abre registro. Entrega física iPhone NO VERIFICADA; dominios fijos sin cambios. Se incorpora pulso verde en control independiente con regresión permanente. B/C/D y preservación real pendientes; no declarar PASS de puerta navegador. Archivos: app-update.js, test-update-delivery-control.mjs, index-grupal.html, service-worker.js, release.json, ROADMAP_OVERALL.md, ROADMAP_A_DETALLE.md, CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md, CONTROL_PROYECTO_SCIRE/MANUAL_TAREAS_R147_2.md, CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md, CONTROL_PROYECTO_SCIRE/MATRIZ_ACEPTACION_SCORES_R147_2_4_1.md, CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md, CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json.


## R147.2.4.6 · diagnóstico real previo a transición C

R147.2.4.5 LAB Preview READY dpl_CTmHjQnZ6hykqZ1Uwv41xju8Ezg7, commit67c71b785b652f98077d10a1ac0ac3eed36244cc. Recarga en perfil Chromium obtuvo 4.5 sin consentimiento, registro PWA_SERVICE_WORKER informa controlador Unknown: Not found; fixture real permanece sin controller. Puerta navegador FAIL, causa aún pendiente de diagnóstico entre registro, assets y entorno. No promover Production ni declarar PASS. Historial propio A contiene 1 RONDA OFICIAL/PRUEBA ACTUALIZACION. Se agrega tests/fixtures/update-runtime-diagnostic.html, con lectura real de registros/cachés y recursos de SHELL, sin semillas, borrados ni simulaciones. B→C pendiente. Cambios: index-grupal.html, service-worker.js, release.json, tests/fixtures/update-runtime-diagnostic.html, ROADMAP_OVERALL.md, ROADMAP_A_DETALLE.md, CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md, CONTROL_PROYECTO_SCIRE/MANUAL_TAREAS_R147_2.md, CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md, CONTROL_PROYECTO_SCIRE/MATRIZ_ACEPTACION_SCORES_R147_2_4_1.md, CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md, CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json.


## R147.2.4.7 · localizar atasco real de instalación

Preview C R147.2.4.6 READY dpl_Aqc32QKCfG7GmbNzBLmyrc2eK1cx / 842212144fac3ee99bd1522a761a761b4d15e73f. Diagnóstico navegador: controller null, worker installing, cachés active/approved sin controlador completo; todos los recursos de SHELL responden 200 desde página real. Se acota cada fetch del shell a 15 segundos y agrega GET_UPDATE_DIAGNOSTICS de sólo lectura para distinguir red, cuerpo y escritura de caché. No se debilita descarga transaccional: shell incompleto no se promueve. Puerta navegador sigue FAIL; Production intacta. Archivos: service-worker.js, index-grupal.html, release.json, tests/fixtures/update-runtime-diagnostic.html, ROADMAP_OVERALL.md, ROADMAP_A_DETALLE.md, CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md, CONTROL_PROYECTO_SCIRE/MANUAL_TAREAS_R147_2.md, CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md, CONTROL_PROYECTO_SCIRE/MATRIZ_ACEPTACION_SCORES_R147_2_4_1.md, CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md, CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json.


## R147.2.4.8 · desbloquear seis conexiones ocupadas por cuerpos sin leer

R147.2.4.7 Preview READY dpl_FQwYSkWkpbEzPkijjN9r1HBQKsLj/5e4887398d4543fd64ad97dd8d1851293467c3f1. Diagnóstico real: primeros seis recursos 200, todos los siguientes abortados en 15s; worker activa con shell-incomplete y caches vacíos. Causa: Promise.all espera cabeceras de todos los fetch antes de consumir cuerpos; seis respuestas agotan conexión con cuerpos pendientes y frenan las siguientes. Ahora cada respuesta se consume completamente dentro de su operación, conserva tipo/status/headers y elimina content-length/content-encoding que ya no describen el cuerpo decodificado. Staging sigue íntegro; no se promueve shell parcial. Regresión test-update-shell-drain.mjs reproduce pool seis: fuente anterior falla DEADLOCK, corregida PASS e instala todos los recursos. Banco build incluye regresión. Prueba real nueva aún pendiente; Production intacta. Archivos: service-worker.js, index-grupal.html, release.json, test-update-shell-drain.mjs, scripts/build-manual-lab.mjs, ROADMAP_OVERALL.md, ROADMAP_A_DETALLE.md, CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md, CONTROL_PROYECTO_SCIRE/MANUAL_TAREAS_R147_2.md, CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md, CONTROL_PROYECTO_SCIRE/MATRIZ_ACEPTACION_SCORES_R147_2_4_1.md, CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md, CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json.

La entrega independiente en app-update.js absorbe el rescate SW y oculta el aviso heredado cuando crea el control operativo, para evitar botones superpuestos. Sin JavaScript independiente el rescate SW permanece disponible.


## R147.2.4.9 · revisión consecutiva en LAB Preview

Versión anterior R147.2.4.8 publicada READY en alias estable lab/r147244-update-delivery-20261001, commit 1fd89602d8d16e9b3abb2adbbbf6c43b5d014b27. Perfil propio Chromium/Playwright. R147.2.4.8 completó shell-ready con todos los recursos cached y controlador activated; conserva ronda PRUEBA ACTUALIZACION/SENIOR/14/BLANCAS/WhatsApp sintético 00000000, Gross90/Net76 y 1 ronda oficial. Nueva transición pendiente de click y preservación; puerta navegador no declarada PASS antes de tres transiciones reales. Production intacta. Cambian: index-grupal.html, service-worker.js, release.json, ROADMAP_OVERALL.md, ROADMAP_A_DETALLE.md, CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md, CONTROL_PROYECTO_SCIRE/MANUAL_TAREAS_R147_2.md, CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md, CONTROL_PROYECTO_SCIRE/MATRIZ_ACEPTACION_SCORES_R147_2_4_1.md, CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md, CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json.


## R147.2.4.10 · revisión consecutiva en LAB Preview

Versión anterior R147.2.4.9 publicada READY en alias estable lab/r147244-update-delivery-20261001, commit 1a7a4f2e49364bc4e15f671e3b2e352abc15de42. Perfil propio Chromium/Playwright. R147.2.4.8 completó shell-ready con todos los recursos cached y controlador activated; conserva ronda PRUEBA ACTUALIZACION/SENIOR/14/BLANCAS/WhatsApp sintético 00000000, Gross90/Net76 y 1 ronda oficial. Nueva transición pendiente de click y preservación; puerta navegador no declarada PASS antes de tres transiciones reales. Production intacta. Cambian: index-grupal.html, service-worker.js, release.json, ROADMAP_OVERALL.md, ROADMAP_A_DETALLE.md, CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md, CONTROL_PROYECTO_SCIRE/MANUAL_TAREAS_R147_2.md, CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md, CONTROL_PROYECTO_SCIRE/MATRIZ_ACEPTACION_SCORES_R147_2_4_1.md, CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md, CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json.

Transición real 8→9 conserva versión8 hasta click, ACTUALIZAR verde/habilitado/gscUpdatePulse y después ACTUALIZADO/9, ronda exacta, Historial exacto y WhatsApp exacto. Capturas 8-9-before.jpg/8-9-after.jpg guardadas. FAIL por error de consola heredado formatRoundElapsed inexistente en ronda cerrada; se restaura formateador de duración sin modificar datos. test-update-closed-round-clock.mjs falla con fuente anterior y pasa con corregida, incluido en scripts/build-manual-lab.mjs. app-update.js mantiene oculto aviso heredado por CSS mientras existe botón independiente, aun si el sondeo heredado vuelve a cambiar display inline. Serie cero errores reinicia en A10; no certificar transición8→9. Archivos adicionales: app-update.js, scripts/build-manual-lab.mjs, test-update-closed-round-clock.mjs.


## R147.2.4.11 · revisión consecutiva en LAB Preview

Versión anterior R147.2.4.10 publicada READY en alias estable lab/r147244-update-delivery-20261001, commit eff6f467d3c421dabff659e658f6e190bf8f07a6. Perfil propio Chromium/Playwright. R147.2.4.8 completó shell-ready con todos los recursos cached y controlador activated; conserva ronda PRUEBA ACTUALIZACION/SENIOR/14/BLANCAS/WhatsApp sintético 00000000, Gross90/Net76 y 1 ronda oficial. Nueva transición pendiente de click y preservación; puerta navegador no declarada PASS antes de tres transiciones reales. Production intacta. Cambian: index-grupal.html, service-worker.js, release.json, ROADMAP_OVERALL.md, ROADMAP_A_DETALLE.md, CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md, CONTROL_PROYECTO_SCIRE/MANUAL_TAREAS_R147_2.md, CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md, CONTROL_PROYECTO_SCIRE/MATRIZ_ACEPTACION_SCORES_R147_2_4_1.md, CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md, CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json.


## R147.2.4.12 · revisión consecutiva en LAB Preview

Versión anterior R147.2.4.11 publicada READY en alias estable lab/r147244-update-delivery-20261001, commit 14598652d37dadeabdec80d01ae92d58996e8782. Perfil propio Chromium/Playwright. R147.2.4.8 completó shell-ready con todos los recursos cached y controlador activated; conserva ronda PRUEBA ACTUALIZACION/SENIOR/14/BLANCAS/WhatsApp sintético 00000000, Gross90/Net76 y 1 ronda oficial. Nueva transición pendiente de click y preservación; puerta navegador no declarada PASS antes de tres transiciones reales. Production intacta. Cambian: index-grupal.html, service-worker.js, release.json, ROADMAP_OVERALL.md, ROADMAP_A_DETALLE.md, CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md, CONTROL_PROYECTO_SCIRE/MANUAL_TAREAS_R147_2.md, CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md, CONTROL_PROYECTO_SCIRE/MATRIZ_ACEPTACION_SCORES_R147_2_4_1.md, CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md, CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json.

Evidencia real 10→11 PASS de transición: meta10 se mantuvo al reabrir, ACTUALIZAR visible/habilitado/verde/gscUpdatePulse; click por Playwright navega a11 y ACTUALIZADO. Ronda/tabla exacta, Historial exacto y WhatsApp exacto. Cero errores o warnings de aplicación en ventana de transición y ancho documento igual a viewport. Capturas completas 10-11-before.jpg/10-11-after.jpg externas al inventario de fuente. Serie aún pendiente de12 y13.

Corrección visual final en app-update.js: captura10-11-before muestra roce del aviso con texto de versión. La transición conserva datos y no contiene errores, pero puerta visual FAIL; no se presenta como serie aprobada. Se reserva franja superior120px únicamente mientras existe el control independiente, también en registro fijo. Al actualizar se elimina control y desaparece reserva. Control permanente de navegador mide intersección real contra versión/menú/logo, además del ancho de documento. Serie final A11→B12→C13→D14: controlador12 debe servir aviso sin roce sobre HTML aprobado11 antes del click. app-update.js agregado a archivos de esta versión.


## R147.2.4.13 · revisión consecutiva en LAB Preview

Versión anterior R147.2.4.12 publicada READY en alias estable lab/r147244-update-delivery-20261001, commit 7afd303bfcac9ffdb7e885da578c8bf7b2bb4625. Perfil propio Chromium/Playwright. R147.2.4.8 completó shell-ready con todos los recursos cached y controlador activated; conserva ronda PRUEBA ACTUALIZACION/SENIOR/14/BLANCAS/WhatsApp sintético 00000000, Gross90/Net76 y 1 ronda oficial. Nueva transición pendiente de click y preservación; puerta navegador no declarada PASS antes de tres transiciones reales. Production intacta. Cambian: index-grupal.html, service-worker.js, release.json, ROADMAP_OVERALL.md, ROADMAP_A_DETALLE.md, CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md, CONTROL_PROYECTO_SCIRE/MANUAL_TAREAS_R147_2.md, CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md, CONTROL_PROYECTO_SCIRE/MATRIZ_ACEPTACION_SCORES_R147_2_4_1.md, CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md, CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json.

Serie A11→B12: PASS real. HTML11 y ronda se mantienen antes de click. Sólo un control operativo; verde/habilitado/gscUpdatePulse. Medición real: body padding120px, cero intersecciones con versión, menú o logos y ancho documento=viewport. Click instala12, ACTUALIZADO, tabla e Historial exactos, WhatsApp registrado idéntico. Cero errores/warnings de aplicación. Capturas completas 11-12-before.jpg/11-12-after.jpg. Puerta global pendiente de13 y14; Production intacta.


## R147.2.4.14 · revisión consecutiva en LAB Preview

Versión anterior R147.2.4.13 publicada READY en alias estable lab/r147244-update-delivery-20261001, commit ab83f09040fa2aeab51ddcb05142d8e2d0939049. Perfil propio Chromium/Playwright. R147.2.4.8 completó shell-ready con todos los recursos cached y controlador activated; conserva ronda PRUEBA ACTUALIZACION/SENIOR/14/BLANCAS/WhatsApp sintético 00000000, Gross90/Net76 y 1 ronda oficial. Nueva transición pendiente de click y preservación; puerta navegador no declarada PASS antes de tres transiciones reales. Production intacta. Cambian: index-grupal.html, service-worker.js, release.json, ROADMAP_OVERALL.md, ROADMAP_A_DETALLE.md, CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md, CONTROL_PROYECTO_SCIRE/MANUAL_TAREAS_R147_2.md, CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md, CONTROL_PROYECTO_SCIRE/MATRIZ_ACEPTACION_SCORES_R147_2_4_1.md, CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md, CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json.

Resultado observado 12→13: ACTUALIZAR verde, habilitado y parpadeante; click real; ACTUALIZADO R147.2.4.13; ronda, historial, jugador, scores y WhatsApp conservados. Cero errores de consola, desbordamiento o superposición del control. Segunda transición válida de la serie 11→12→13→14.


## R147.2.4.15 · revisión consecutiva en LAB Preview

Versión anterior R147.2.4.14 publicada READY en alias estable lab/r147244-update-delivery-20261001, commit a5a599858a2ca66f59bd334e3eccd45433548bf0. Perfil propio Chromium/Playwright. R147.2.4.8 completó shell-ready con todos los recursos cached y controlador activated; conserva ronda PRUEBA ACTUALIZACION/SENIOR/14/BLANCAS/WhatsApp sintético 00000000, Gross90/Net76 y 1 ronda oficial. Nueva transición pendiente de click y preservación; puerta navegador no declarada PASS antes de tres transiciones reales. Producción y LAB conservan R147.2.4.14 publicada mientras este nuevo candidato se valida. Cambian: index-grupal.html, service-worker.js, release.json, ROADMAP_OVERALL.md, ROADMAP_A_DETALLE.md, CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md, CONTROL_PROYECTO_SCIRE/MANUAL_TAREAS_R147_2.md, CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md, CONTROL_PROYECTO_SCIRE/MATRIZ_ACEPTACION_SCORES_R147_2_4_1.md, CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md, CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json.

Corrección comprobada: Torneo → Score Card redirigía hacia el torneo personal guardado y sustituía la vista de cuatro jugadores con scores por otra asignación. Ahora openRoundTournament conserva returnTo en ambos modos, elimina la intención Inicio al regresar, hubBack respeta ese origen y middleware mantiene la tarjeta local ante round_return=1 sin omitir autorización personal explícita. Prueba dirigida PASS y control negativo con fuente14 FAIL, como corresponde. Archivos adicionales: live-hub.js, middleware.js, test-scores-tournament-recovery.mjs y test-live-share-middleware.mjs. Usuario exige LAB cuatro jugadores y Producción un jugador, inscripción, General/Categoría/Favoritos/detalle18, todos los regresos y actualización instalada; resultados físicos siguen PENDIENTES.


### R147.2.4.15 · ampliación solicitada a las 08:08 Guatemala

Scores de torneo con origen Score Card muestra X accesible (Cerrar Scores y regresar a mi Score Card), conserva returnTo y oculta el regreso duplicado. Ronda particular ya usa X. Se revisarán General, Favoritos, Categoría, doble toque/18 hoyos y preservación de jugadores en ambas rutas. Prueba de navegación actualizada para el contrato de conservación; banco completo aún pendiente. Archivos adicionales: live-hub.html, test-lab-shortcuts-navigation.mjs. Cambian también live-hub.js y los siete controles, ya registrados en esta versión.


## R147.2.4.16 · revisión consecutiva en LAB Preview

Versión anterior R147.2.4.15 publicada READY en alias estable lab/r147244-update-delivery-20261001, commit 98e08d882cc21f4fa9de9bf24ed514f1581aa58a. Perfil propio Chromium/Playwright. R147.2.4.8 completó shell-ready con todos los recursos cached y controlador activated; conserva ronda PRUEBA ACTUALIZACION/SENIOR/14/BLANCAS/WhatsApp sintético 00000000, Gross90/Net76 y 1 ronda oficial. Nueva transición pendiente de click y preservación; puerta navegador no declarada PASS antes de tres transiciones reales. Production intacta. Cambian: index-grupal.html, service-worker.js, release.json, ROADMAP_OVERALL.md, ROADMAP_A_DETALLE.md, CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md, CONTROL_PROYECTO_SCIRE/MANUAL_TAREAS_R147_2.md, CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md, CONTROL_PROYECTO_SCIRE/MATRIZ_ACEPTACION_SCORES_R147_2_4_1.md, CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md, CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json.

### R147.2.4.16 · grupo y Scores de la tarjeta de origen

Reproducido en navegador: crear torneo desde ronda activa omite el grupo y Continuar muestra evento cerrado aunque falta asignación. El destino de origen se conserva con X. Se traslada el grupo con sus IDs al formulario autorizado; se asocia sólo al mismo roundId y jugadores al abrir Scores, preservando hoyos. Continuar al Score Card usa returnTo validado del creador. Mensaje sin grupo corregido. Cambian index-grupal.html, live-hub.js, personal-events.js, test-scores-tournament-recovery.mjs; siete controles e inventario incluidos. R15 transición real desde14 preservó tarjeta byte-identical; General/Categoría/Favoritos y doble toque todavía pendientes de aceptación navegador. PRODUCCIÓN y LAB fijos siguen14, iPhone pendiente.


## R147.2.4.17 · regreso canónico desde Inicio · 2026-10-01 09:00 Guatemala

Candidato R16 remoto e60cc9c1c035c87a2011a6256281081a12971f4d, árbol 9577746640ad59ed99cfb29b053cbb776009afca, LAB Preview dpl_EZPcNG28bwcqWFvrA6uPALEuiwJy READY. Navegador propio: actualización manual15→16 conserva exactamente tabla Score Card y resumen de cuatro jugadores A/B/Super Senior/Femenina; Gross4/5/6/7 y Neto3/4/5/5. Regreso Torneo conserva jugadores y scores. Primer intento CREAR TORNEO quedó bloqueado por autenticación Vercel de Preview; con acceso temporal autorizado abrió y creó PRUEBA RECORRIDO R16. No se debilitó protección ni se modificaron instalaciones del propietario.

Fallo reproducido real: tarjeta servida desde ruta / por shell PWA produce returnTo /; hub y CONTINUAR sólo admiten /index-grupal.html, por lo que regresa al Registro de asignación. Prueba negativa test-scores-tournament-recovery.mjs FAIL con R16 (/ != /index-grupal.html); corrección incremental normaliza únicamente pathname de returnTo, preserva query/autorización/round_return y todos los datos. Misma prueba PASS después de corrección. R17 sigue pendiente de recorrido navegador. No confundir con PASS integral.

Intocables/intocables-gate.mjs histórico falla al leer api/voice-speech.js retirado. El perfil técnico vigente build-manual-lab.mjs verifica explícitamente la retirada de Mic/AI por orden 19 septiembre; no se reinstala código retirado ni se presenta ese gate histórico como PASS. Gate0, ROADMAP, inventario y banco LAB vigente PASS en R16. Nuevos controles se repetirán en R17.

Producción y LAB fijos conservan R147.2.4.14 / a5a5998. General/Categoría/Favoritos/detalle18, ronda particular y publicación siguen pendientes de aceptación. Rollback servidor a5a599858a2ca66f59bd334e3eccd45433548bf0; sin rollback ni borrado de datos.

Archivos: index-grupal.html, service-worker.js, release.json, test-scores-tournament-recovery.mjs, ROADMAP_OVERALL.md, ROADMAP_A_DETALLE.md, CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md, CONTROL_PROYECTO_SCIRE/MANUAL_TAREAS_R147_2.md, CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md, CONTROL_PROYECTO_SCIRE/MATRIZ_ACEPTACION_SCORES_R147_2_4_1.md, CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md, CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json.


## R147.2.4.18 · Corrección del escritor particular tras torneo · 2026-10-01

- Petición vigente: revisar Scores, individuales de torneo y Ronda Particular, con continuidad y actualización efectiva.
- Navegador real en Preview R16: cuatro jugadores, General, cuatro categorías, dos favoritos y cuatro detalles particulares; cada detalle contiene 18 casillas.
- FAIL reproducido: al corregir Gross de A en hoyo 2 de 4 a 5, tarjeta y torneo muestran 5, pero Ronda Particular conserva 4.
- Causa en `live-control.js`: el estado capturado antes de encolar la publicación privada sobrescribía su pendiente al guardar el stream del torneo anterior.
- Corrección: la ronda particular publica automáticamente sólo a su escritor; se relee estado antes de encolar torneo. `prepareTournamentScores` mantiene publicación explícita mediante SCORES TORNEO.
- Regresión en `test-lab-private-rounds.mjs`: conexión previa a torneo + corrección particular debe publicar Gross 6 al privado y no llamar a publish público. FAIL antes; PASS después.
- Se conservan pendientes, credenciales y snapshots previos; no se modifican los jugadores reales de LAB o Maestro.
- Archivos funcionales: `live-control.js`, `test-lab-private-rounds.mjs`, etiquetas en `index-grupal.html`, `service-worker.js`, `release.json`.
- Banco técnico y gates vigentes: ejecutar sobre R18; aceptación navegador de R18 y publicación final PENDIENTES.
- Intocables histórico: retiro Mic/AI mantiene ENOENT `api/voice-speech.js`; no se declara PASS ni se restaura voz retirada.
- Producción y alias LAB fijos aún R147.2.4.14; Preview R17 READY antes de este candidato R18.


### R147.2.4.18 · aceptación navegador y candidato de entrega · 2026-10-01 09:32 Guatemala

PASS navegador propio Chromium en Preview `970a87f8878927592fbbad09ba4b1f7b7d7de9c1`, Vercel READY `dpl_2XcqKkCLnkn2qC1sgbQQc7rLDK4y`: 18 detalles comprobados, cada uno 18 casillas y un par Gross/Net correcto. Cuatro jugadores: General4, categorías A/B/Super Senior/Femenina4, favoritos A/Super Senior2, particular4. Un jugador sintético: General/Senior/Favoritos3, particular1. CONTINUAR AL SCORE CARD después de crear torneo y X después de Scores conservan nombre y scores. Corrección particular 5→6 queda Gross6/Neto5 y torneo conserva5/4; escritor privado confirmado.

Actualizaciones manuales propias15→16→17→18 conservan los datos; ninguna instalación del propietario se toca. Banco técnico LAB vigente, Gate0, ROADMAP, INVENTARIO (783 fuentes/3PDF antes del nuevo archivo) y matriz release PASS. Revisión navegador390px muestra detalle completo sin desbordamiento; no certifica doble toque físico en iPhone ni equivalencia exacta con original no recuperado. Evidencia reproducible `CONTROL_PROYECTO_SCIRE/EVIDENCIA_SCORES_R147_2_4_18.json`; captura guardada `scores-r18-detail-mobile-20261001.jpg`. Cambian ese JSON, los siete controles y sello de inventario; fuente funcional idéntica al candidato validado.

Entrega LAB y Producción ya autorizada en `PROMPT_CONTINUIDAD_R147_2.md`; requiere comprobar ascendencia/árbol y estado READY, release ofrecida por ambos dominios sin instalarla en dispositivos del propietario. Pendiente al escribir este registro: cambio main y confirmación de ambos despliegues. Intocables histórico de voz retirada no es gate PASS ni se reinstala. Rollback servidor: a5a599858a2ca66f59bd334e3eccd45433548bf0; sin rollback de datos.


### R147.2.4.18 · entrega completada · 2026-10-01 09:38 Guatemala

Publicado main fast-forward `a370fc666c69beff9c8703467ba6b3c636042066`, árbol exacto verificado; LAB `dpl_44JYfbcGYf296T8FinTfL8dHLMj1` y Producción `dpl_FSbJA8AwFMZWeQHk7HGhk53ZRwVU` READY. Ambos `/release.json` HTTP200 ofrecen R147.2.4.18. Navegadores propios abiertos antes de publicación mantienen meta de release R14 después de recargar y muestran ACTUALIZAR visible/habilitado; no se pulsó en estos perfiles de entrega. No se manipularon instalaciones o jugadores reales del propietario.

Recorrido solicitado comprobado: 18 detalles de 18 casillas, 4 y 1 jugadores, General/Categoría/Favoritos/Ronda Particular, escritor oficial, corrección privada aislada, X, CONTINUAR y persistencia, actualizaciones propias15→16→17→18 y detalle390px. Prueba iPhone físico no certificada; no confundirla con navegador. Evidencia de entrega añadida a `CONTROL_PROYECTO_SCIRE/EVIDENCIA_SCORES_R147_2_4_18.json`; los cuatro controles de continuidad/aceptación/mapa/tareas y ambos ROADMAPS quedan actualizados, junto con sello inventario. Esta actualización documental conserva fuente funcional de R18 íntegra. Los pendientes de publicación anotados en los registros previos quedan cerrados por esta comprobación.


## R147.2.4.19 · recuperación independiente del LAB antiguo · 2026-10-01 10:00 Guatemala

- Evidencia nueva propietario IMG_5513.png: captura09:51, LAB sigue R147.2.4, ronda30septiembre, Jessie/hoyo6. Entrega física sigue FAIL; R18 READY y navegador R14 no certificaron recuperación de R147.2.4 instalada.
- No se infiere origen exacto ni estado interno del iPhone a partir de la imagen. No se pide reenviar capturas, borrar cachés, reinstalar, registrar o reanotar jugadores.
- Causa de escape: recuperación dependía de sucesor SW y de volver a cargar shortcuts-ui.js; no se comprobó la ruta independiente que el worker R147.2.4 entrega desde red aun con menú antiguo cacheado.
- Control negativo permanente test-update-delivery-control.mjs ejecuta worker original8bccff9025bbb1acd0ff1ab02f7808d6872ba873: manual desde red sin script updater directo FAIL en R18.
- Corrección manual.html carga /app-update.js antes del menú; app-update.js protege inicialización duplicada. Source app-updater no instala ni navega sin toque explícito. Scripts de recuperación independientes no reemplazan Score Card ni datos.
- service-worker.js usa namespaces nuevos r147-2-4-19-legacy-recovery (R18 había conservado accidentalmente17); adopta shell aprobado sin borrarlo. Etiquetas index-grupal.html/release.json/SW R19.
- Fixture tests/fixtures/r14724-service-worker.js congela exclusivamente el controlador histórico; no sustituye archivos del producto por fuente antigua.
- Prueba dirigida PASS después. Banco completo, gates y Preview navegador PENDIENTES; producción actual b33b988 R18 intacta.
- Ruta prevista desde la app instalada: MENÚ → MANUAL DE USUARIO → ACTUALIZAR. Primero comprobar en navegador; sólo el propietario puede ejecutar dentro de su iPhone. No se declara cerrado el FAIL físico hasta evidencia.
- Archivos: app-update.js, manual.html, service-worker.js, index-grupal.html, release.json, test-update-delivery-control.mjs, tests/fixtures/r14724-service-worker.js; siete controles y sello inventario. Rollback servidor b33b988c72fa50b8a263f9f76cc24f87b4bd4116; sin rollback de datos.

### R147.2.4.19 · mismo ícono instalado · 2026-10-01 10:10 Guatemala
Corrección de `pwa-launch.html`: esperar registro/actualización/activación del controlador antes de entrar en la tarjeta aprobada; salida acotada a ocho segundos si hay desconexión o bloqueo. No cambia manifest, dominio ni start_url, no borra almacenamiento ni promueve la app sin ACTUALIZAR. La recuperación por Manual es redundante; no satisface sola el pedido. Banco permanente `test-installed-launch-delivery.mjs`, activo en `scripts/build-manual-lab.mjs`, prueba el worker original congelado. Fixtures `tests/fixtures/r14724-card.html`, `r14724-shortcuts.js`, `r14724-service-worker.js` y `installed-legacy-delivery.html` permiten recorrer en Preview el mismo acceso con controlador/cache originales. `vercel.json` permite scope raíz únicamente a ese worker de prueba; fixture bloqueado en dominios fijos. PENDIENTE navegador real y publicación; la captura física sigue siendo FAIL sin verificación posterior.

### R147.2.4.19 · entrega por mismo acceso verificada en browser · 2026-10-01 10:31 Guatemala
`CONTROL_PROYECTO_SCIRE/EVIDENCIA_ACTUALIZACION_INSTALADA_R147_2_4_19.json`: PASS navegador exacto R147.2.4 → entrada instalada `/pwa-launch.html` → botón ACTUALIZAR → R147.2.4.19 en mismo origen; PRUEBA R24 A R19 conserva GROSS 5, NETO 4 y 09:18 a. m. Perfil anterior PRUEBA INDIVIDUAL R18 conserva GROSS 5, NETO 4 y 08:16 a. m. El adaptador solo prepara transporte inicial, importa intacto el runtime antiguo; cold-install original sin adaptador se volvió redundant y NO se certifica. Banco funcional activo, activación/offline/hung, shell-drain, reloj ronda cerrada y puertas negativas PASS. Manifest, dominio y start_url no cambian; ningún dato del propietario fue modificado. Publicación autorizada por continuidad y orden actual, después de verificación técnica/browser. Pendiente observar recepción en iPhone físico; no convertir browser en aceptación física ni asegurar ausencia absoluta de errores futuros.


## R147.2.4.20 · regreso desde CREAR TORNEO en Registro · 2026-10-01 10:58 Guatemala

Evidencia física nueva: IMG_5525 LAB 10:38 sigue R147.2.4 (FAIL entrega); IMG_5526 Producción 10:39 y IMG_5529 10:41 muestran R147.2.4.19 ACTUALIZADO (PASS recepción Producción). IMG_5527/5528/5529 recorren Familia → TORNEO CREADO → CONTINUAR → Registro vacío. No se afirma borrado permanente de jugadores a partir de esa imagen.

Reproducción browser propia con PRUEBA INDIVIDUAL R18, GROSS 5/NETO 4/08:16: Registro en corrección → CREAR TORNEO QA REG RETURN R19 → CONTINUAR volvió a Registro, con jugador visible, en lugar de tarjeta. Causa confirmada de navegación: handler registrationEventButton omitía roundId y returnTo, presentes en TORNEO desde tarjeta. Se añade currentRoundReturnPath compartido; el editor de ronda existente conserva roundId/returnTo, y el registro nuevo sigue la ruta de asignación. Ningún borrado ni sustitución de datos del propietario.

Control permanente test-lab-registration-return-state.mjs ejecuta el handler real: ronda editada transmite id y retorno canónico sin inicio/source=pwa, preserva jugadores/scores y share de QA; registro nuevo no reutiliza ronda activa. test-lab-update-recovery.mjs ejecuta también el helper real. Archivos producto index-grupal.html, service-worker.js, release.json; pruebas test-lab-registration-return-state.mjs y test-lab-update-recovery.mjs; documentación ambos ROADMAPS, CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md, CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md, CONTROL_PROYECTO_SCIRE/MANUAL_TAREAS_R147_2.md, CONTROL_PROYECTO_SCIRE/MATRIZ_ACEPTACION_SCORES_R147_2_4_1.md, CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md y sello CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json.

General/Categoría/Favoritos y detalle individual18hoyos implementados R18; no equivale a recorrido integral aceptado. Entrega LAB físico sigue FAIL. Ambos dominios públicos /release.json y /pwa-launch.html sirven R19 sin cookies; no se atribuye causa del iPhone a SSO ni a enlace equivocado sin prueba. Falta conocer URL exacta del acceso instalado si el fallo persiste; no cambiar enlace, reinstalar ni borrar almacenamiento. Banco completo y Preview del regreso corregido PENDIENTES. Producción sigue 262e86af44beddd4b8ee7768a1b6f0474be45ec3 R19. Rollback código a ese commit; datos intactos.


### R147.2.4.20 · aceptación navegador y publicación autorizada · 1 octubre 2026 11:15 Guatemala

Preview READY dpl_3yekEEj4VCsyno2ArkZjxoumN9mL, commit60ac19816835d30b494941e4740c0757c6a19090, árbolbc20b150e37e949c1924a3cda64eb030f29363cf idéntico al candidato técnico probado. Chrome cloud: registro existente → CREAR TORNEO → CONTINUAR regresa /index-grupal.html?round_return=1 conservando PRUEBA R20, Gross5/Neto4; Scores Torneo publica y muestra General; Senior, favorito y detalle18casillas con5/4 PASS. X regresa y conserva tabla. Cero errores propios de aplicación; errores metadata extensión separados. No certifica iPhone físico ni cierra recepción LAB. Propietario ordenó publicar en este turno; main actualizado a60ac198. LAB dpl_DmqzzAMmue93hoMqMx7XQDgvNdrh y Producción dpl_G8jiLjvHtDYcYvrmVuER7V7jJLRs READY comprobados mediante conector Vercel. Evidencia: CONTROL_PROYECTO_SCIRE/EVIDENCIA_REGRESO_R147_2_4_20.json. Cambian ROADMAP_OVERALL.md, ROADMAP_A_DETALLE.md, CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md, CONTROL_PROYECTO_SCIRE/MANUAL_TAREAS_R147_2.md, CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md, CONTROL_PROYECTO_SCIRE/MATRIZ_ACEPTACION_SCORES_R147_2_4_1.md, CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md, CONTROL_PROYECTO_SCIRE/EVIDENCIA_REGRESO_R147_2_4_20.json, CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json. Rollback código262e86af44beddd4b8ee7768a1b6f0474be45ec3, sin tocar datos.


## R147.2.4.23 · continuidad recuperada y revisión · 1 octubre 2026 15:36 Guatemala
Recuperado remoto ca9f1bd884c5db05789435522ff579baab462c86; Preview dpl_GQYrvt7UBhJBPFCdTgKtnTiKdgCf READY. Dominios fijos LAB/Producción aún72d2cc5/R22 al iniciar. Banco completo scripts/build-manual-lab.mjs y Gate0 PASS. Inventario original796fuentes y3PDF recuperados con hashes coincidentes PASS. Chrome cloud propio: registro QA, score5/4, crear torneo, continuar a tarjeta, código creador, General/Senior/Favoritos, detalle18, regreso con X, Ronda Particular y detalle18 PASS. Tres cierres medidos verdes22.5px/44px. Errores metadata extensión separados; no errores propios observados. No certifica iPhone ni recepción en instalaciones del propietario. Publicación en ambos dominios autorizada; pendiente comprobar READY y release ofrecida. Rollback código72d2cc5231330e87b6687fb3cad8288548ca0d75; sin borrado de datos.
Archivos documentales: CONTROL_PROYECTO_SCIRE/EVIDENCIA_CONTINUIDAD_R147_2_4_23.json, CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md, CONTROL_PROYECTO_SCIRE/MANUAL_TAREAS_R147_2.md, CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md, CONTROL_PROYECTO_SCIRE/MATRIZ_ACEPTACION_SCORES_R147_2_4_1.md, ROADMAP_OVERALL.md, ROADMAP_A_DETALLE.md y CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json. Fuente funcional sin cambios respecto al Preview probado.


## R147.2.4.23 · hotfix de descarga instalada · 1 octubre 2026 16:19 Guatemala
Evidencia IMG_5600: instalación LAB usa alias golf-sc-gt-lab-git-lab-r146-entry-ope-6b36ee-epgcaddys-projects.vercel.app, rama lab/r146-entry-open-24h-invites-20260930, detenida en8bccff9/R147.2.4. Se hizo fast-forward no forzado a5c15497; despliegue dpl_BHDCTWFZYTn7RR7SAD3Mk8ZHvcxa READY, mismo origen. Browser propio real R24 a R23 con ACTUALIZAR conserva nombre/categoría/HDCP/marcas; propietario confirma recepción del botón pero toque vuelve a ACTUALIZAR (FAIL físico). No se declara aceptación iPhone.
Logs Vercel: redirecciones307 en /index-grupal.html. Reproducción con middleware real: cookie gsc_personal_context de torneo cerrado redirige descarga genérica de tarjeta a live-hub; refreshShell rechaza HTML sin meta de release y conserva build anterior. Corrección incremental service-worker.js: descargar solamente OFFLINE_ENTRY con inicio=1 y __gscg_build_check=1, conservar clave canónica /index-grupal.html en cache. No se cambia autorización de tarjeta personal, escritor de scores, cookies, manifest, origen ni almacenamiento de rondas.
Control permanente test-update-shell-context.mjs: FAIL antes del cambio y PASS después; prueba ruta real middleware y contenido/clave de shell. Se incorpora al banco obligatorio scripts/build-manual-lab.mjs. Pruebas shell-drain, delivery-control e installed-launch PASS; banco integral/Preview/browser de hotfix pendientes al registrar. Publicación autorizada por orden vigente tras cero FAIL técnico/browser. Rollback de código5c15497, despliegue previo dpl_BHDCTWFZYTn7RR7SAD3Mk8ZHvcxa; nunca rollback de datos.
Archivos: service-worker.js, test-update-shell-context.mjs, scripts/build-manual-lab.mjs, ambos ROADMAPS, CONTINUIDAD_MAESTRA_LAB.md, MANUAL_TAREAS_R147_2.md, MAPA_MAESTRO_DE_ARCHIVOS.md, MATRIZ_ACEPTACION_SCORES_R147_2_4_1.md, REGISTRO_REINCIDENCIAS_CALIDAD.md e INVENTARIOS_V311.lock.json. Fallo escapó a QA porque su perfil no tenía contexto personal cerrado; el nuevo banco reproduce ese estado. Criterio: mismo alias debe mostrar ACTUALIZAR, instalar shell publicado por toque y mantener tarjeta/configuración. Confirmación del dispositivo del propietario pendiente.


## R147.2.4.23 · código LAB y aceptación física grabados · 1 octubre 2026 16:30 Guatemala

Orden del propietario: "Mete a la matriz el código para laboratorio y dejarlo grabado". Confirmación física recibida el 1 octubre 2026 a las 16:29 Guatemala: "O ahora sí, quedó". Se cierra el pendiente de recepción/actualización LAB en su iPhone por confirmación expresa del propietario; no equivale a certificar todo el resto de funciones.

| Referencia permanente | Código / estado |
| --- | --- |
| Versión LAB aceptada | R147.2.4.23 |
| Commit funcional publicado | 107812195a1ea8d2a425af8c50096253ba2625bf |
| Árbol exacto validado | 2e561736963ec5f78f162ffaca589baceb7589c8 |
| Dominio fijo LAB | https://golf-sc-gt-lab.vercel.app |
| Origen de la instalación LAB confirmada | https://golf-sc-gt-lab-git-lab-r146-entry-ope-6b36ee-epgcaddys-projects.vercel.app |
| Rama del acceso instalado | lab/r146-entry-open-24h-invites-20260930 |
| Deployment LAB fijo | dpl_GKPi6FHzQBxvSp7SztwhG1Ckd7ts - READY |
| Deployment acceso instalado | dpl_266UUL9pnx5AThyCUJ4Ci1mdfUsz - READY |
| Deployment producción | dpl_6awNtKVnyiramyAj13pWspyKVixL - READY |
| Preview validado | dpl_5qQPuvcuwAPs6HdbUTdSExZVNocU - READY |
| Rollback exclusivo de código | 5c15497fae3679eb8e0fbfa675053f6d1a231e14 |

Código conservado en service-worker.js: refreshShell descarga OFFLINE_ENTRY mediante /index-grupal.html?inicio=1&__gscg_build_check=1; guarda la respuesta bajo la clave estable /index-grupal.html. Evita la redirección del contexto personal cerrado sin cambiar autorización, cookies, manifest, escritor o datos. Control permanente test-update-shell-context.mjs: FAIL original y PASS tras corrección; forma parte del banco obligatorio scripts/build-manual-lab.mjs.

Banco funcional completo, pruebas negativas, Gate0, ROADMAP e inventario PASS. Browser propio: controlador original R147.2.4, ACTUALIZAR por toque, R147.2.4.23 ACTUALIZADO y conservación de nombre/categoría/HDCP/marcas PASS. Evidencia visual lab-actualizador-hotfix-verificado.jpg. Vercel comprobó los tres dominios sobre el commit funcional indicado en estado READY. Producción recibió la misma corrección; la confirmación física nueva se refiere exclusivamente a LAB.

Esta anotación es documental; conserva el código funcional aceptado. Archivos registrados: matriz de aceptación, continuidad, tareas, mapa de archivos, registro de reincidencias, ambos ROADMAPS e INVENTARIOS_V311.lock.json. Los pendientes históricos de compilación, Preview, publicación y recepción LAB del registro 16:19 quedan cerrados mediante estas evidencias. No hay acción pendiente del propietario para esta actualización.


## R147.2.4.23 · desactivar Vercel Toolbar para usuarios · 1 octubre 2026 17:21 Guatemala

Propietario reporta IMG_5615: panel Vercel Toolbar tapa la aplicación LAB. Causa de escape: acceso instalado usa alias Preview con toolbar por defecto de equipo; entrega funcional no comprobó interfaz técnica inyectada por hosting. Ajuste nativo guardado en ambos proyectos golf-sc-gt-lab y epg-caddy: Pre-Production Deployments Off y Production Deployments Off. No se modifican protección de acceso, permisos, datos de rondas ni código de cálculo.

Republicación del mismo código con últimos ajustes: alias instalado LAB dpl_2KA1x6UUNctc1TZ7NP5nwzacUMFU READY (commit107812195a1ea8d2a425af8c50096253ba2625bf); producción dpl_AKf9qMXJkUDfo5Wa5WjtL266nv34 READY (commit94e02db1fc28154c7ac6ad03c87599e4bec51f73). El alias instalado conserva golf-sc-gt-lab-git-lab-r146-entry-ope-6b36ee-epgcaddys-projects.vercel.app. Browser verifica HTML nuevo con inicio=1 y __gscg_build_check=1: cero scripts/iframes vercel.live/feedback/toolbar, versión R147.2.4.23 y datos sintéticos previos conservados. HTML ya aprobado en cache puede conservar el script histórico; no se borra cache ni almacenamiento del propietario. No se certifica aún la reapertura física posterior en su iPhone.

Control preventivo permanente: antes de entregar LAB/producción verificar ambos ajustes Off y ausencia del panel técnico en HTML nuevo del dominio fijo y del alias de la instalación. La aceptación física de la actualización 16:29 se mantiene. Registro documental e inventarios sincronizados sin cambios funcionales; publicación documental actual renovará además el dominio fijo LAB. Rollback de interfaz de hosting: restaurar visibilidad Default si el propietario lo solicita; código y datos permanecen intactos. Archivos: ambos ROADMAPS, matriz, continuidad, tareas, mapa, reincidencias e INVENTARIOS_V311.lock.json.


## R147.2.4.24 - alcance final del propietario, 2 octubre 2026 11:31 Guatemala

CREAR TORNEO y CREAR RONDA pasan a Modalidades, sin duplicarlos debajo del registro. MI RONDA se retira. Registro local no crea evento ni código por defecto. TORNEO / RONDA PARTICULAR muestran directorio de nombres activos; seleccionar requiere código deportivo correspondiente al mismo evento. No entregar scores, código ni permisos administrativos desde directorio. Sólo creador muestra código propio, previa membresía de organizador validada. Propietario autenticado conserva control pleno de eliminación y emisión/revocación de delegaciones ligadas a una persona. Prueba dirigida de seguridad y caducidad PASS, banco integral repetido por cambios de alcance; navegador/limpieza/publicación PENDIENTES.

Base main 1d483af; script Vercel guardado y retención anterior 1h son causas confirmadas, con regresiones permanentes. Caducidad visible tras 24h desde recepción completa, cron GET autenticado hora a hora y validación de lecturas/escrituras. No destruir auditoría ni simular prueba física. Especificación CONTROL_PROYECTO_SCIRE/ACEPTACION_R147_2_4_24.md. Archivos:
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md` - cambio incremental y evidencia de R24.
- `CONTROL_PROYECTO_SCIRE/ACEPTACION_R147_2_4_24.md` - cambio incremental y evidencia de R24.
- `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md` - cambio incremental y evidencia de R24.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` - cambio incremental y evidencia de R24.
- `CONTROL_PROYECTO_SCIRE/MANUAL_TAREAS_R147_2.md` - cambio incremental y evidencia de R24.
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` - cambio incremental y evidencia de R24.
- `CONTROL_PROYECTO_SCIRE/MATRIZ_ACEPTACION_SCORES_R147_2_4_1.md` - cambio incremental y evidencia de R24.
- `ROADMAP_A_DETALLE.md` - cambio incremental y evidencia de R24.
- `ROADMAP_OVERALL.md` - cambio incremental y evidencia de R24.
- `api/_lib/event-administration.js` - cambio incremental y evidencia de R24.
- `api/_lib/event-lifecycle.js` - cambio incremental y evidencia de R24.
- `api/_lib/personal-event-access.js` - cambio incremental y evidencia de R24.
- `api/_lib/private-round-lifecycle.js` - cambio incremental y evidencia de R24.
- `api/app-access.js` - cambio incremental y evidencia de R24.
- `api/event-administration.js` - cambio incremental y evidencia de R24.
- `api/live.js` - cambio incremental y evidencia de R24.
- `api/personal-events.js` - cambio incremental y evidencia de R24.
- `auth-gate.js` - cambio incremental y evidencia de R24.
- `event-administration-ui.js` - cambio incremental y evidencia de R24.
- `event-administration.html` - cambio incremental y evidencia de R24.
- `index-grupal.html` - cambio incremental y evidencia de R24.
- `live-control.js` - cambio incremental y evidencia de R24.
- `middleware.js` - cambio incremental y evidencia de R24.
- `personal-events.js` - cambio incremental y evidencia de R24.
- `release.json` - cambio incremental y evidencia de R24.
- `scripts/build-manual-lab.mjs` - cambio incremental y evidencia de R24.
- `service-worker.js` - cambio incremental y evidencia de R24.
- `shortcuts-ui.js` - cambio incremental y evidencia de R24.
- `test-event-administration.mjs` - cambio incremental y evidencia de R24.
- `test-event-directory-code.mjs` - cambio incremental y evidencia de R24.
- `test-event-lifecycle.mjs` - cambio incremental y evidencia de R24.
- `test-lab-private-lifecycle.mjs` - cambio incremental y evidencia de R24.
- `test-lab-registration-private-rounds-entry.mjs` - cambio incremental y evidencia de R24.
- `test-toolbar-cached-shell.mjs` - cambio incremental y evidencia de R24.
- `test-tournament-code-round-binding.mjs` - cambio incremental y evidencia de R24.


### R24 - último alcance y control de regresión

Orden 11:29: lista de rondas/torneos registrados y después INGRESE EL CÓDIGO del seleccionado. Directorio permite sólo id/nombre/modalidad; no permite leer scores sin membresía. No se debilita directorio privado histórico ni el escritor. Sólo el creador muestra código propio tras verificar membresía. Delegación nominativa no autoriza a delegar a otros; su vencimiento se ajusta al cierre +24h. Caducidad privada utiliza el mismo controlador integral, sin escritor de eliminación paralelo. El banco anterior completo pasó; se repite por último alcance. Tabla de aceptación y evidencia se conservan en CONTROL_PROYECTO_SCIRE/ACEPTACION_R147_2_4_24.md. No publicado; navegador y limpieza pendientes.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md` - fuente o regresión vigente.
- `CONTROL_PROYECTO_SCIRE/ACEPTACION_R147_2_4_24.md` - fuente o regresión vigente.
- `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md` - fuente o regresión vigente.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` - fuente o regresión vigente.
- `CONTROL_PROYECTO_SCIRE/MANUAL_TAREAS_R147_2.md` - fuente o regresión vigente.
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` - fuente o regresión vigente.
- `CONTROL_PROYECTO_SCIRE/MATRIZ_ACEPTACION_SCORES_R147_2_4_1.md` - fuente o regresión vigente.
- `ROADMAP_A_DETALLE.md` - fuente o regresión vigente.
- `ROADMAP_OVERALL.md` - fuente o regresión vigente.
- `api/_lib/event-administration.js` - fuente o regresión vigente.
- `api/_lib/event-lifecycle.js` - fuente o regresión vigente.
- `api/_lib/personal-event-access.js` - fuente o regresión vigente.
- `api/_lib/private-round-lifecycle.js` - fuente o regresión vigente.
- `api/app-access.js` - fuente o regresión vigente.
- `api/event-administration.js` - fuente o regresión vigente.
- `api/live.js` - fuente o regresión vigente.
- `api/personal-events.js` - fuente o regresión vigente.
- `auth-gate.js` - fuente o regresión vigente.
- `event-administration-ui.js` - fuente o regresión vigente.
- `event-administration.html` - fuente o regresión vigente.
- `index-grupal.html` - fuente o regresión vigente.
- `live-control.js` - fuente o regresión vigente.
- `middleware.js` - fuente o regresión vigente.
- `personal-events.js` - fuente o regresión vigente.
- `release.json` - fuente o regresión vigente.
- `scripts/build-manual-lab.mjs` - fuente o regresión vigente.
- `service-worker.js` - fuente o regresión vigente.
- `shortcuts-ui.js` - fuente o regresión vigente.
- `test-event-administration.mjs` - fuente o regresión vigente.
- `test-event-directory-code.mjs` - fuente o regresión vigente.
- `test-event-lifecycle.mjs` - fuente o regresión vigente.
- `test-lab-private-lifecycle.mjs` - fuente o regresión vigente.
- `test-lab-registration-private-rounds-entry.mjs` - fuente o regresión vigente.
- `test-lab-tournament-navigation.mjs` - fuente o regresión vigente.
- `test-toolbar-cached-shell.mjs` - fuente o regresión vigente.
- `test-tournament-code-round-binding.mjs` - fuente o regresión vigente.


## R147.2.4.24 · corte 2 octubre 2026 11:50 Guatemala

Orden IMG_5632 y correcciones 11:39–11:44: historial trasladado al Menú; retirados RONDA PARTICULAR/TORNEO/TORNEO ACTIVO de tarjeta; únicamente SCORES MI RONDA y SCORES TORNEO. MI RONDA corresponde al evento en que juega el usuario. Sólo creador: ID DE MI RONDA, copia y apertura wa.me por acción del usuario. Registro: opciones de unirse por selección y código en Modalidades, sin creación automática. Menú Torneos: directorio completo vigente, seleccionar y código de acceso para lectura sin cambiar asignación ni jugadores.

Evidencia: banco integral PASS; test-event-directory-code prueba lectura viewer, roster vacío y rechazo de otro código/evento; pruebas negativas de código heredado, recuperación y actualización manual PASS. Navegador Preview/publicación/limpieza todavía PENDIENTES. Respaldos Neon listos: LAB br-soft-frog-avuejybp; Producción br-tiny-math-avpu8yfk. Git CLI push bloqueado sin credenciales; conector GitHub create_blob confirmado.

Archivos afectados en esta versión:
- `CONTROL_PROYECTO_SCIRE/ACEPTACION_R147_2_4_24.md`
- `api/_lib/event-administration.js`
- `api/_lib/event-lifecycle.js`
- `api/event-administration.js`
- `event-administration-ui.js`
- `event-administration.html`
- `test-event-administration.mjs`
- `test-event-directory-code.mjs`
- `test-event-lifecycle.mjs`
- `test-toolbar-cached-shell.mjs`
- `test-tournament-code-round-binding.mjs`
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`
- `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md`
- `CONTROL_PROYECTO_SCIRE/MANUAL_TAREAS_R147_2.md`
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`
- `CONTROL_PROYECTO_SCIRE/MATRIZ_ACEPTACION_SCORES_R147_2_4_1.md`
- `ROADMAP_A_DETALLE.md`
- `ROADMAP_OVERALL.md`
- `api/_lib/personal-event-access.js`
- `api/_lib/private-round-lifecycle.js`
- `api/app-access.js`
- `api/live.js`
- `api/personal-events.js`
- `auth-gate.js`
- `index-grupal.html`
- `live-control.js`
- `live-hub.js`
- `middleware.js`
- `personal-events.js`
- `release.json`
- `scripts/build-manual-lab.mjs`
- `service-worker.js`
- `shortcuts-ui.js`
- `test-lab-private-lifecycle.mjs`
- `test-lab-registration-private-rounds-entry.mjs`
- `test-lab-tournament-navigation.mjs`
- `test-lab-update-recovery.mjs`
- `test-menu-scorecard-tournament-sync.mjs`
- `test-scores-tournament-recovery.mjs`


## R147.2.4.24 · Organizador, orden 11:53 Guatemala

MENÚ → ORGANIZADOR → CREAR TORNEO. Formulario: TORNEO, CLUB desplegado oficial, MODALIDAD, CATEGORÍAS desplegadas, FECHA automática Guatemala, CREADOR obligatorio. Resultado para creador: CÓDIGO DE TORNEO; tarjeta conserva ID DE MI RONDA. Perfil de creador en configuración no sustituye identidad servidor ni concede permisos. Banco integral PASS; test-organizer-tournament-entry.mjs añadido. Preview cdda27ad: navegador real registra jugador local sin código automático, tarjeta con dos Scores e historial en Menú PASS. Último formulario requiere Preview nuevo.

Archivos: `shortcuts-ui.js`, `live-hub.html`, `live-hub.js`, `personal-events.js`, `api/personal-events.js`, `test-organizer-tournament-entry.mjs`, `scripts/build-manual-lab.mjs`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.


## R24 · control definitivo de registro 11:57 Guatemala

No vincular automáticamente selección personal heredada al iniciar otra ronda. Sólo registrationApproved tras read servidor y roster exactamente asignado; consumir esa autorización al establecer roundId actual. ID DE MI RONDA se refresca al iniciar; particular creador conserva código en almacenamiento de su cuenta. test-tournament-code-round-binding.mjs ejercita selección vieja, roster distinto y canje de registro explícito. Banco integral final PASS.

Archivos: `test-organizer-tournament-entry.mjs`, `CONTROL_PROYECTO_SCIRE/ACEPTACION_R147_2_4_24.md`, `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `CONTROL_PROYECTO_SCIRE/MANUAL_TAREAS_R147_2.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `ROADMAP_A_DETALLE.md`, `ROADMAP_OVERALL.md`, `api/personal-events.js`, `index-grupal.html`, `live-hub.html`, `live-hub.js`, `personal-events.js`, `scripts/build-manual-lab.mjs`, `shortcuts-ui.js`, `test-tournament-code-round-binding.mjs`; `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.

Control de registro ya personal: personalStorageKey evita duplicar prefijo de cuenta en `personal-events.js`, probado en `test-organizer-tournament-entry.mjs`.


## R24 · reanudación 2 octubre 2026, 12:30 Guatemala

GitHub main 1d483af y rama R24 6318884 comprobados. Preview dpl_7Td7vks5AYHJowXxjBHqMnuGi1nS READY; ambos dominios fijos R23. No procesos recuperados: ps falla por restricción de runtime. Historial externo FAIL reproducido en navegador: history=saved no se consumía. Corrección incremental conserva cuenta/returnTo y ejecuta acción oficial saved/previous. Grupo creador de torneo vacío: selección explícita asigna roster mediante API assign autorizada; no registrar automáticamente. Participante original recuperado en alias R24, código de creador oculto; teclado Gross5/Net4 PASS. Scores remotos FAIL: private excluido de connectPendingRoundTournament; corrección incorpora selección particular validada al controlador único, publicación antes de consultar y reutilización de stream. Regresiones negativas PASS. Navegador sobre correcciones, cron real, limpieza PROD y publicación PENDIENTES. No certificar iPhone ni cron sin evidencia.

Archivos:
- `index-grupal.html` · corrección, prueba o evidencia R24.
- `shortcuts-ui.js` · corrección, prueba o evidencia R24.
- `personal-events.js` · corrección, prueba o evidencia R24.
- `live-control.js` · corrección, prueba o evidencia R24.
- `scripts/build-manual-lab.mjs` · corrección, prueba o evidencia R24.
- `test-event-directory-code.mjs` · corrección, prueba o evidencia R24.
- `test-r24-history-routing.mjs` · corrección, prueba o evidencia R24.
- `test-r24-private-member-publish.mjs` · corrección, prueba o evidencia R24.
- `CONTROL_PROYECTO_SCIRE/ACEPTACION_R147_2_4_24.md` · corrección, prueba o evidencia R24.
- `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md` · corrección, prueba o evidencia R24.
- `CONTROL_PROYECTO_SCIRE/MATRIZ_ACEPTACION_SCORES_R147_2_4_1.md` · corrección, prueba o evidencia R24.
- `CONTROL_PROYECTO_SCIRE/MANUAL_TAREAS_R147_2.md` · corrección, prueba o evidencia R24.
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` · corrección, prueba o evidencia R24.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md` · corrección, prueba o evidencia R24.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` · corrección, prueba o evidencia R24.


### R24 · bloqueo de servicios comprobado 12:33 Guatemala
Producción: respaldo br-tiny-math-avpu8yfk READY y conteo SQL 11 torneos +1 particular antes del corte. Preparación de tabla de comprobantes respondió sin error; sentencia de revocación integral respondió HTTP401 supplied credentials do not pass authentication. Lectura posterior confirma mismos 12 eventos pendientes y cero comprobantes nuevos. Limpieza NO ejecutada. Vercel settings redirige a Login; CRON_SECRET real NO verificado; consulta logs filtrados en último deployment no encuentra ejecución cleanup. No promover main ni ambos dominios hasta cerrar revisión y estos bloqueos. No se ha solicitado nueva autorización del alcance.


### R24 · limpieza PROD completada y auditoría aplicable, 12:35 Guatemala
El intento transaccional inicial se revirtió íntegramente (0 comprobantes) por constraint de gsc_personal_events: sólo active/closed, nunca revoked. Corrección de la sentencia usa closed en membresía del evento y revoked en tablas deportivas. Transacción posterior PASS, 11 torneos y1 particular; consulta independiente confirma cero antiguos pendientes. Comprobantes en gsc_event_deletions actor owner-authorized-agent-sql:Jaime-Kirste; scores conservados y respaldo READY. No se repitió limpieza LAB.
Banco funcional R24 y gates documental/roadmap/inventario PASS. audit-project.mjs histórico FAIL ENOENT api/voice-speech.js: endpoint retirado por orden del propietario 19 septiembre, confirmado por scripts/build-manual-lab.mjs; no restaurar voz retirada para satisfacer auditoría V378. Perfil aplicable actual: banco integral LAB vigente, permisos/persistencia/teclado/navegación y navegador. Cron sigue NO VERIFICADO porque sesión Vercel ausente; publicación de código de producción aún pendiente.


### R24 · recuperación de tarjeta asignada 12:42 Guatemala
Preview 214beb1 READY. Navegador participante conserva Gross5/Net4 pero Scores aún omite su stream: prueba FAIL real no encubierta. Causa incremental identificada: openAssignedCard reemplaza selección y openAssignedPersonalScoreCard retorna temprano si ya coincide ronda/grupo; no fija roundId. Corrección valida roster servidor y conserva roundId de la tarjeta actual, sin reemplazar scores. Prueba test-r24-private-member-publish.mjs añade recuperación de tarjeta ya asignada y PASS. Preview y navegador de esta corrección PENDIENTES.
Archivos: `index-grupal.html`, `test-r24-private-member-publish.mjs`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `CONTROL_PROYECTO_SCIRE/ACEPTACION_R147_2_4_24.md`, `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md`, `CONTROL_PROYECTO_SCIRE/MATRIZ_ACEPTACION_SCORES_R147_2_4_1.md`, `CONTROL_PROYECTO_SCIRE/MANUAL_TAREAS_R147_2.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.


### R24 · comprobación real y actualización manual, 2026-10-02 12:54 Guatemala
- PASS navegador participante original: sin ID/código del creador; teclado oficial conserva hoyo1 Gross5/Net4; SCORES MI RONDA muestra QA PARTICIPANTE R24 10/1/5/4/EVEN. Neon confirma stream 2cddbfdc-a6b7-48f6-914e-5306afa0415d en evento a6bb8b66-106f-42b0-b1bf-8e197c392203. El intento anterior usó app_version abreviada y NO refrescó shell: el valor válido es release.json completo LABORATORIO-20261002-R147.2.4.24.
- PASS asignación explícita del organizador: evento b7404530-e009-4059-999f-a5c11cec2bda conserva role organizer y roster QA ORGANIZER RECOVERY HCP14 A/Blanco después de seleccionar su torneo en Modalidades.
- Corrección incremental personal-events.js: CONTINUAR AL SCORE CARD de torneo vacío del organizador vuelve al Registro; roster sigue vacío hasta selección explícita posterior. test-organizer-tournament-entry.mjs y private flow PASS.
- Orden del propietario 12:49: actualización de instalaciones LAB/PROD sólo mediante su toque ACTUALIZAR; no pulsar ni forzar actualización en su instalación. Publicar versión disponible no constituye consentimiento para instalarla.
- Dominios fijos inspeccionados: ambos R23, ACTUALIZADO deshabilitado; R24 aún no disponible allí. test-update-delivery-control, test-lab-update-recovery, test-lab-first-open PASS para ambos orígenes: detección cada30s sin navegación, click conserva scores/registro/asignación, descarga parcial conserva shell previa.
- PENDIENTES: consulta de otro torneo y retorno conservando asignación; historial exterior en navegador; cron/configuración real (Vercel Login, no sesión); retirar QA; candidato final/main/antigua rama LAB/READY ambos dominios. No afirmar cron operativo.
Archivos: personal-events.js, test-organizer-tournament-entry.mjs, ambos ROADMAPS, matriz, continuidad, manual de tareas, mapa e inventario.


### R24 · cierre de pruebas independientes y bloqueo de autenticación, 12:58 Guatemala
PASS navegador: historial MIS RONDAS GUARDADAS abierto desde MENÚ fuera de tarjeta; consulta QA R24 EMPTY CREATOR con código validado ofrece General/Categoría/Mis Favoritos, retorno conserva QA PARTICIPANTE R24 Gross5/Net4 y SCORES MI RONDA original. Creador inicia mediante OK/revisión/INICIAR RONDA, ID DE MI RONDA sólo suyo, teclado oficial y SCORES TORNEO muestra Gross5/Net4.
Banco integral scripts/build-manual-lab.mjs PASS exit0; gates y sello se verifican antes de guardar. QA retirado mediante transacción recuperable autorizada en LAB: comprobantes27 (torneo b7404530) y28 (particular a6bb8b66), 18:58:43Z, actor owner-authorized-agent-sql:Jaime-Kirste, destinatario Jaime Kirste, motivo QA completo, referencia respaldo br-soft-frog-avuejybp. Scores conservados; no repetir limpieza anterior.
BLOQUEO Vercel: navegador login; acceso seguro elegido GitHub, formulario devuelve Incorrect username or password. No sesión positiva; CRON_SECRET y ejecución programada aún NO VERIFICADOS. No publicar main/dominios mientras gate operativo pendiente. Próxima intervención indispensable: propietario completa acceso manual seguro a Vercel; después verificar existencia y scope de CRON_SECRET sin revelar valor, cron /api/app-access?action=cleanup horario0 * * * *, evidencia ejecución. Publicación disponible deberá dejar ACTUALIZAR al propietario; no forzar instalación ni entregar URL con update_check/app_version como sustituto del botón.


### R24 · identificador distinto para probar ACTUALIZAR, 13:01 Guatemala
Se detecta fallo de entrega en previews: diferentes commits con mismo release no ofrecían ACTUALIZAR a una R24 ya instalada. Identificador incremental LABORATORIO-20261002-R147.2.4.24-B2 en release.json, meta index-grupal.html y fallback service-worker.js; etiqueta visible sigue R147.2.4.24. Sin promover instalaciones automáticamente; versión disponible se descubre cada30s y se instala sólo al toque. Banco update recovery/discovery debe comprobar B2 con versión previa de la misma R24; producción sigue R23 mientras cron no verificado. Archivos index-grupal.html, service-worker.js, release.json y controles/documentación/inventario.


### R24 · orden vigente y corrección desde matriz, 13:06–13:13 Guatemala
Orden anterior de creación en Modalidades queda sustituida: MENÚ contiene CREAR TORNEO y CREAR RONDA PARTICULAR. Ambos generan su propio código y ofrecen WhatsApp y COPIAR CÓDIGO. Torneo exige autorización individual de organizador o propietario; validación obligatoria en personal-events y live API. Ronda particular disponible a cualquier jugador. Propietario emite/revoca autorización de creación ligada al código personal del destinatario desde Administración; código de un solo canje, hash,24h, sin facultad para borrar eventos ajenos ni delegar.
Retiro de Práctica desde matriz funcional canónica JSON, matriz editorial MD/JSON y ficha pendiente de modalidades. Eliminados creador/editor/entrada/renderizador específico y capítulos/índice/acciones del Manual. Sesiones antiguas de práctica no se recuperan como rondas oficiales; scores antiguos no se destruyen. Se mantienen sólo guardas de compatibilidad que impiden escrituras/cierres oficiales de ese formato retirado.
Pruebas vigentes se corrigen para no reintroducir botones en Modalidades; fixtures positivos ahora reciben autorización de organizador explícita. Nuevo test de permisos prueba denegación en ambos endpoints, particular abierto, código individual de un uso, revocación/vencimiento y no delegación. Nuevo test de retiro comprueba matriz/manual/programa y recuperación de sesión antigua sin destruir scores. B3 conserva versión visible R147.2.4.24 y permite ACTUALIZAR desde R24/B2. Ningún candidato B2 se considera final tras esta orden.
PENDIENTES: banco integral B3 y navegador; capturas de Manual con nueva ubicación; cron/configuración real Vercel con acceso manual (GitHub rechazó credenciales); publicación final main/dominos/rama LAB antigua y prueba de actualización del propietario. NO PUBLICADO en dominios fijos.

R24-B3 retención: `api/_lib/event-lifecycle.js`, `api/_lib/private-round-lifecycle.js`, `api/live.js`, `test-event-lifecycle.mjs`, `test-live-official-flow.mjs`, `test-lab-private-lifecycle.mjs`: último score de servidor; huella de scores excluye metadatos y duplicados; eventos completados mantienen plazo fijo. Pruebas aisladas PASS; cron programado no comprobado.

### R24-B4 · revisión física del menú · 2 octubre 2026
B3 commit 5506f37871c2d5717599665868e0761a65508129 publicado READY en ambos dominios; ACTUALIZAR comprobado sin pulsarlo en instalaciones R23. Creación privada QA B3 MENU desde menú y COPIAR CÓDIGO PASS navegador. Creador eliminó su ronda sin scores y se mostró comprobante. Historial guardado y respuesta NO HAY RONDA PREVIA PASS. CREAR TORNEO exige autorización individual PASS navegador. WhatsApp abre protocolo bloqueado por navegador cloud: no prueba física en aplicación móvil.
Correcciones posteriores a la revisión: shortcuts-ui.js elimina dependencia de openRoundTournament para consultas del menú; General, Categorías, Buscar y Favoritos llegan al hub aun sin evento asignado (antes el mensaje quedaba en tarjeta oculta). event-administration.html respeta hidden para permisos exclusivos del propietario. test-lab-shortcuts-navigation.mjs ejecuta siete rutas reales del dispatcher y regresión CSS. Entrega manual B4 diferenciada en release.json, index-grupal.html y service-worker.js; ningún ACTUALIZAR del propietario pulsado. Cron real y login propietario siguen pendientes de autenticación Vercel/aplicación.

B4 sincronización de eliminación: `api/_lib/event-administration.js` cierra gsc_personal_events en la misma operación atómica de revocación y comprobante; `test-event-administration.mjs` verifica ambos estados. QA B3 ronda 575b455a-8dc4-48e6-9b78-a4d551c997b1 retirada, comprobante 29.


## R24-B5 · creación y código de Mi Ronda/Torneo · 2 octubre 2026

Fuente: main `31c4e557b543e034103cef55de06ffce8194d493`; capturas IMG_5648/5649/5650/5651 y órdenes 15:23–15:24 Guatemala. CREAR MI RONDA libre para cualquier jugador; CREAR TORNEO mantiene autorización individual. Ambos muestran código para compartir tras crear. No se modifica motor de scores, eventos existentes ni permisos de otros usuarios.

Fallo confirmado: menú exigía roster completo antes de abrir creación y dejaba error en Registro detrás de la navegación; prueba negativa de borrador parcial ahora abre creación sin asignarlo y conserva datos. Formulario particular conservaba campos/botón tras creación; ahora resultado muestra código, copia, WhatsApp y continuar. Se añade validación visible previa, estado creando y bloqueo de doble toque. Torneo usa request con identidad preparada, no reinicializa un formulario ya abierto, impide doble envío y muestra código aunque sync no encuentre el evento. El nombre lleno pero validado vacío de IMG_5651 no ha sido reproducido exactamente en iPhone; no se declara causa definitiva del dispositivo.

Permiso operativo: Neon LAB verificó device:910e8ee4-d017-4e17-b998-fc7ee82305b5 sin grant; se emitió autorización individual de un uso, ID f8caa489-d079-42a8-833a-43e8a1c1bb45, vence 3 octubre 2026 15:25 Guatemala, ligada sólo a ese dispositivo. No se registra el secreto en repositorio. PROD no contenía esa identidad.

Pruebas dirigidas PASS: nombre/creador conservados, borrador incompleto, datos requeridos, doble toque, código ante sync fallido y compartir/cancelación/continuar. Browser sobre B4 creó QA CREAR MI RONDA 20261002 sin permiso y entregó código; no certifica B5 ni iPhone. Banco integral B5, Preview y entrega pendientes al escribir. Riesgos: duplicados, borrador perdido, permisos ampliados y código omitido; controles negativos en banco. Rollback de código a 31c4e557; sin rollback de datos.

Archivos registrados dentro de esta versión:
- `index-grupal.html` · corrección, prueba o registro R24-B5.
- `live-hub.js` · corrección, prueba o registro R24-B5.
- `personal-events.js` · corrección, prueba o registro R24-B5.
- `shortcuts-ui.js` · corrección, prueba o registro R24-B5.
- `release.json` · corrección, prueba o registro R24-B5.
- `service-worker.js` · corrección, prueba o registro R24-B5.
- `scripts/build-manual-lab.mjs` · corrección, prueba o registro R24-B5.
- `test-lab-private-round-share-flow.mjs` · corrección, prueba o registro R24-B5.
- `test-lab-registration-private-rounds-entry.mjs` · corrección, prueba o registro R24-B5.
- `test-lab-registration-return-state.mjs` · corrección, prueba o registro R24-B5.
- `test-r24-event-creation-feedback.mjs` · corrección, prueba o registro R24-B5.
- `ROADMAP_OVERALL.md` · corrección, prueba o registro R24-B5.
- `ROADMAP_A_DETALLE.md` · corrección, prueba o registro R24-B5.
- `CONTROL_PROYECTO_SCIRE/ACEPTACION_R147_2_4_24.md` · corrección, prueba o registro R24-B5.
- `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md` · corrección, prueba o registro R24-B5.
- `CONTROL_PROYECTO_SCIRE/MANUAL_TAREAS_R147_2.md` · corrección, prueba o registro R24-B5.
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` · corrección, prueba o registro R24-B5.
- `CONTROL_PROYECTO_SCIRE/MATRIZ_ACEPTACION_SCORES_R147_2_4_1.md` · corrección, prueba o registro R24-B5.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md` · corrección, prueba o registro R24-B5.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` · corrección, prueba o registro R24-B5.

- `test-lab-tournament-navigation.mjs` · fixture conserva roster completo y usa helper validado por banco B5.

### R24-B5 · corrección adicional de prueba real · 2026-10-02
Preview ac941a1: ronda creada sin autorización, código MJQGB9XDBS y regreso al registro. La prueba detectó pérdida del nombre visible al volver y rechazo de torneo tras preflight autorizado. Se captura el DOM del registro antes de evaluar el grupo y se conserva la identidad validada en la llamada interna a Live. Regresión de identidad: proveedor distinto no puede reemplazar al dispositivo autenticado. Verificación de nuevo Preview y publicación todavía PENDIENTES; no se declara prueba de iPhone ni de todos los botones.

### R24-B6 · 2026-10-02 16:28 Guatemala · principal MI GRUPO
IMG_5656 confirmó etiqueta GRUPO PARTICULAR incorrecta en registrationJoinRound. Se corrige a MI GRUPO; destino de ingreso por código permanece. CREAR MI GRUPO y SCORES MI GRUPO ya estaban operativos. Error escapó por verificar creación y scores sin exigir nombre exacto de modalidad; test-r24-event-creation-feedback.mjs exige ahora MI GRUPO en ese botón. Archivos: index-grupal.html, test-r24-event-creation-feedback.mjs, release.json, service-worker.js; B6 permite actualización manual después de B5. Sin cambio de motor, datos ni autorización. Rollback8a05fd1.

Orden16:29: fecha automática Guatemala, sin calendario. live-hub.html hubRoundDate y personal-events.js personalRoundDate pasan a texto readonly; mantienen valor automático actual. No nueva pantalla ni selección de fecha al crear.


### R24-B7 · 2 octubre 2026 · accesos Scores del menú

Orden expresa 17:09 Guatemala: SCORES TORNEO, SCORES MI GRUPO, SCORES GENERAL, MIS FAVORITOS y SCORES CATEGORÍAS en el menú. Se mantienen destinos existentes y se agrega acceso al snapshot oficial del grupo actual desde tarjeta y retorno desde hub. No modifica cálculos, permisos ni datos. B6 conservado como base 98a8631; publicación pendiente de banco integral y navegador B7. B6 navegador real: OK, INICIAR RONDA, entrada5, Scores Mi Grupo, doble clic y detalle18 Gross5/Neto4 comprobados; no certifica iPhone.

Archivos de esta versión:
- `index-grupal.html` · menú Scores B7, regresión, release o control correspondiente.
- `release.json` · menú Scores B7, regresión, release o control correspondiente.
- `service-worker.js` · menú Scores B7, regresión, release o control correspondiente.
- `shortcuts-ui.js` · menú Scores B7, regresión, release o control correspondiente.
- `test-lab-global-operational-audit.mjs` · menú Scores B7, regresión, release o control correspondiente.
- `test-lab-shortcuts-navigation.mjs` · menú Scores B7, regresión, release o control correspondiente.
- `test-menu-scorecard-tournament-sync.mjs` · menú Scores B7, regresión, release o control correspondiente.
- `ROADMAP_OVERALL.md` · menú Scores B7, regresión, release o control correspondiente.
- `ROADMAP_A_DETALLE.md` · menú Scores B7, regresión, release o control correspondiente.
- `CONTROL_PROYECTO_SCIRE/ACEPTACION_R147_2_4_24.md` · menú Scores B7, regresión, release o control correspondiente.
- `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md` · menú Scores B7, regresión, release o control correspondiente.
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` · menú Scores B7, regresión, release o control correspondiente.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` · menú Scores B7, regresión, release o control correspondiente.

- `test-lab-r60-physical-matrix.mjs` · exige los cinco nombres exactos del menú ordenados para B7.

- `scripts/manual-screen-parity-gate.mjs` · control de nombres del menú actualizado a la orden B7; resto del banco conservado.


### R24-B8 · 2 octubre 2026 17:22 Guatemala · Scores agrupados
Orden más reciente: todos los Scores juntos; SCORES POR CATEGORÍA y MIS FAVORITOS. Sección SCORES exclusiva con cinco accesos contiguos: TORNEO, MI GRUPO, GENERAL, POR CATEGORÍA y FAVORITOS. Buscar y otras funciones fuera del bloque. Destinos y permisos sin cambio. B7 READY ambos dominios: dpl_pPbsZqWJFaWKshMfCTWx3CCFVyVi / dpl_3VNVqkBvxTAWjNSbosqxxPb4H8GY. Navegador real verificó cinco rutas, detalle18, retorno5/4 y ACTUALIZAR preservando registro. LAB creó QA LAB B7 CODIGO y devolvió código64WHBJ8RHF; Preview no configurado para API personal. No se declara iPhone ni WhatsApp enviado. B8 pendiente Preview y publicación.
- `shortcuts-ui.js` · agrupación, nombre, release, regresión o control B8.
- `index-grupal.html` · agrupación, nombre, release, regresión o control B8.
- `service-worker.js` · agrupación, nombre, release, regresión o control B8.
- `release.json` · agrupación, nombre, release, regresión o control B8.
- `test-lab-shortcuts-navigation.mjs` · agrupación, nombre, release, regresión o control B8.
- `test-lab-global-operational-audit.mjs` · agrupación, nombre, release, regresión o control B8.
- `test-lab-r60-physical-matrix.mjs` · agrupación, nombre, release, regresión o control B8.
- `scripts/manual-screen-parity-gate.mjs` · agrupación, nombre, release, regresión o control B8.
- `ROADMAP_OVERALL.md` · agrupación, nombre, release, regresión o control B8.
- `ROADMAP_A_DETALLE.md` · agrupación, nombre, release, regresión o control B8.
- `CONTROL_PROYECTO_SCIRE/ACEPTACION_R147_2_4_24.md` · agrupación, nombre, release, regresión o control B8.
- `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md` · agrupación, nombre, release, regresión o control B8.
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` · agrupación, nombre, release, regresión o control B8.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` · agrupación, nombre, release, regresión o control B8.


### R24-B9 · 2 octubre 2026 · Cursor de hoyo, títulos fijos y eliminación visible
Reporte del propietario IMG_5660/5661: comenzó hoyo1, detalle mostraba5–8; nombres de torneos permiten selección iOS; eliminación oculta. SQL de solo lectura LAB br-small-mouse-av0f24o9 confirmó stream de Santa Delfina con hoyos5–8 en origen, no desplazamiento de render. Causa reproducida: roundManualEntry restablecía el hoyo visible para la ronda nueva, pero conservaba activePlayerId y roundScoreKeypadState del hoyo previo. B9 limpia estado al confirmar nueva ronda, sincroniza cursor/render y restablece1 al borrar scores. Regresión prev5→nueva1/10 y cursor desincronizado PASS. No reindexar rondas válidas que comiencen en otro hoyo. Recuperación específica registrada como audit42 LAB: conserva snapshot íntegro antes de cambio, roundId exacto y Gross por jugador. API autenticada devuelve manifiesto; cliente aplica una sola vez 5–8→1–4, recalcula con motor oficial y vuelve a publicar. Rechaza otra ronda, Gross distinto o destinos ocupados. No hay reindexación genérica. Aplicación real en dispositivo del propietario pendiente de actualización.
Títulos estáticos de Scores/torneos y descendientes de botones sin selección/callout iOS; campos editables conservan selección. Eliminación visible en listado de torneos, Scores de evento, grupos particulares con autoridad devuelta por API existente; lleva al mismo diálogo con nombre/motivo/comprobante, sin ampliar permisos ni eliminar automáticamente. Historial añade ELIMINAR RONDA visible y conserva pulsación prolongada. Rollback B8 aed466dee4cd4e796f9485dcdc21bc8608ac09c4. Banco integral/navegador/publicación pendientes al registrar.
- `index-grupal.html` · cursor, títulos, eliminación, prueba, release o control B9.
- `live-hub.js` · cursor, títulos, eliminación, prueba, release o control B9.
- `live-hub.html` · cursor, títulos, eliminación, prueba, release o control B9.
- `scores-ui.css` · cursor, títulos, eliminación, prueba, release o control B9.
- `personal-events.js` · cursor, títulos, eliminación, prueba, release o control B9.
- `private-rounds.js` · cursor, títulos, eliminación, prueba, release o control B9.
- `event-administration-ui.js` · cursor, títulos, eliminación, prueba, release o control B9.
- `test-scores-ui.mjs` · cursor, títulos, eliminación, prueba, release o control B9.
- `test-v398-manual-opening-hole.mjs` · cursor, títulos, eliminación, prueba, release o control B9.
- `release.json` · cursor, títulos, eliminación, prueba, release o control B9.
- `service-worker.js` · cursor, títulos, eliminación, prueba, release o control B9.
- `ROADMAP_OVERALL.md` · cursor, títulos, eliminación, prueba, release o control B9.
- `ROADMAP_A_DETALLE.md` · cursor, títulos, eliminación, prueba, release o control B9.
- `CONTROL_PROYECTO_SCIRE/ACEPTACION_R147_2_4_24.md` · cursor, títulos, eliminación, prueba, release o control B9.
- `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md` · cursor, títulos, eliminación, prueba, release o control B9.
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` · cursor, títulos, eliminación, prueba, release o control B9.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md` · cursor, títulos, eliminación, prueba, release o control B9.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` · cursor, títulos, eliminación, prueba, release o control B9.

- `api/personal-events.js` · manifiesto de recuperación auditada limitado al evento autorizado.
- `live-control.js` · consulta de recuperación al montar ronda propia ya vinculada.

- `test-lab-tournament-navigation.mjs` · fixture actualizado con renderer real y prueba de botón visible sólo para autoridad.


## R148 · 2 octubre 2026 · numeración correlativa
Orden IMG_5663: versión visible sencilla R148; siguientes publicaciones R149, R150 y sucesivas, sin puntos ni sufijos visibles. release.json, meta y fallback SW sincronizados. Se conserva toda la funcionalidad aprobada B9. Fuente/base 63407a28f37ecfa8b4d61904d22594fdd336d025; rollback a esa base. Prueba: recuperación de actualización, banco integral y navegador real con tarjeta conservada. No se declara prueba física de iPhone.
- `index-grupal.html` · numeración correlativa o registro/sello R148.
- `service-worker.js` · numeración correlativa o registro/sello R148.
- `release.json` · numeración correlativa o registro/sello R148.
- `ROADMAP_OVERALL.md` · numeración correlativa o registro/sello R148.
- `ROADMAP_A_DETALLE.md` · numeración correlativa o registro/sello R148.
- `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md` · numeración correlativa o registro/sello R148.
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` · numeración correlativa o registro/sello R148.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/DIRECTRICES_MANDATORIAS.md` · numeración correlativa o registro/sello R148.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` · numeración correlativa o registro/sello R148.


### R148 · ingreso tardío al grupo con tarjeta en curso
Orden18:24 Guatemala: entrar aunque la ronda esté empezada. Botón ENTRAR A MI GRUPO desde tarjeta, directorio y código propios; vinculación en el mismo objeto de ronda sin nueva tarjeta, sin borrar hoyos, sin reiniciar reloj. Backend conserva acceso nominativo/cupo/estado activo y rechaza campo/modalidad incompatibles. Al cambiar de evento se crea stream independiente, nunca se reutiliza uno vinculado a otro grupo. Scores Mi Grupo vinculado abre todos los competidores del evento; sin vínculo conserva la vista del grupo local. Posiciones usan el motor existente por resultado/puntos y hoyos efectivamente completados, sin imputar scores a hoyos no jugados. Prueba nueva verifica ingreso con hoyos1/2 existentes, identidad/fecha/reloj conservados, publicación, rechazo de tarjeta cerrada y posiciones antes/después de nuevo score. Banco y navegador sobre último alcance pendientes.
- `index-grupal.html` · ingreso tardío, conservación o regresión R148.
- `personal-events.js` · ingreso tardío, conservación o regresión R148.
- `live-control.js` · ingreso tardío, conservación o regresión R148.
- `api/_lib/personal-event-access.js` · ingreso tardío, conservación o regresión R148.
- `test-r148-late-group-join.mjs` · ingreso tardío, conservación o regresión R148.
- `test-event-directory-code.mjs` · ingreso tardío, conservación o regresión R148.
- `scripts/build-manual-lab.mjs` · ingreso tardío, conservación o regresión R148.
