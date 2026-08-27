# Mapa maestro de todos los archivos · Golf Score Card GT

Este mapa explica cada archivo con palabras sencillas. Los nombres raros, números y códigos se conservan para no romper nada; aquí se indica para qué sirve cada uno.

Archivos activos rastreados al corte V332: **325**.

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

## Cómo usar este inventario


1. Buscar el nombre exacto.
2. Leer la explicación sencilla.
3. Usar el código para confirmar la versión exacta.
4. Ver [MAPA_MAESTRO_INFRAESTRUCTURA.md](MAPA_MAESTRO_INFRAESTRUCTURA.md) para ramas, Vercel, Apple, Android y datos.
