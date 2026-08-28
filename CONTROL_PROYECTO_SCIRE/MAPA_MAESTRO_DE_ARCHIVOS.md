# Mapa maestro de todos los archivos · Golf Score Card GT

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
| `api/_lib/cors.js` | `dffb1f6c6254d826cf622406d48ddb1a19b9b875` | 1328 bytes | Permite que web, iPhone y Android se comuniquen. |
| `api/_lib/database.js` | `1e99935741e212ff9f0043197f82348972c2263c` | 453 bytes | Abre la información central. |
| `api/_lib/http.js` | `abf34ad0d937577da81c7cd56833eceeb231bf95` | 1625 bytes | Prepara respuestas para la app. |
| `api/_lib/sync-validation.js` | `b90cd0193c0606448a13e06e17cb34b359d18978` | 3713 bytes | Revisa que la información enviada esté completa. |
| `api/_lib/traffic.js` | Tráfico V324 | Se calcula al publicar | Consulta Google Maps Routes con tráfico óptimo, resume ETA/demora/distancia y excluye coordenadas de la respuesta. |
| `api/account.js` | `eec1c7ff408316ccaff98bcab968cd66bf92120c` | 2437 bytes | Abre, crea o cierra la cuenta opcional. |
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
| `docs/manual/v311/page-50.png` | 4K instalable. |
| `assets/official-logos/golf-score-card-gt-pwa-512.png` | `0e85cc6995f9bafefb49dec5a8253aef3db7fffd` | 461402 bytes | Icono cromado 3D neón grande de la aplicación instalable. |
| `audit-project.mjs` | Auditoría V330 | Se calcula al publicar | Ejecuta 89 paquetes, candados, inventarios y filtros automáticos, incluidos Reglas, Skins, Wolf, Vegas y Dots. |
| `capacitor.config.json` | `a5ca52fde974ea370d90dbfe422f08101ec7f7eb` | 867 bytes | Define el nombre visible y la identidad de las apps de iPhone y Android. |
| `card-artifacts.js` | `df8ba2b09532b73701681d7de1781ca5b54baf26` | 12799 bytes | Arma la tarjeta oficial con la información de la ronda. |
| `card-file-export.js` | `4ddbf8f36ec142114cfa965a78d97ea55365afa1` | 5919 bytes | Convierte la tarjeta en imagen o PDF. |
| `card-library.js` | `adb1126087fc75ca15bd0164638a07c1bc6c41e1` | 2644 bytes | Guarda y muestra tarjetas anteriores en el teléfono. |
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
| `test-v285-stableford-back-navigation.mjs` | `1202bd6751