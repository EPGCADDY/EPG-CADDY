# Manual de tareas — R147.2 · Laboratorio y Producción

Fuente: órdenes del propietario y capturas de esta conversación, 30 de septiembre de 2026. Este documento conserva las instrucciones y su referencia visual; no sustituye las imágenes por un diseño inventado. Última actualización: 21:48, Guatemala.

## Regla de ejecución y continuidad

Ejecutar una tarea por vez, en el orden siguiente. Antes de pasar a la siguiente: registrar archivos, prueba ejecutada, resultado y evidencia. Un cambio local, un PASS automático, una publicación y una confirmación en el iPhone son estados diferentes. No cerrar un pendiente sólo porque pasó una prueba de Chromium. Reportar hora de Guatemala, operación real, resultado y evidencia sin dejar pasar más de 60 segundos. Al detenerse, indicar el último paso y la acción exacta para retomar.

Publicación ya autorizada por el propietario. Publicar permite ofrecer una versión; instalarla en su dispositivo requiere que él pulse ACTUALIZAR. No pulsar ni forzar la actualización de sus apps.

## Orden de tareas

### 1. Scores de torneo: aplicar el formato aprobado

**Orden:** “Así quiero el formato”. Referencia aprobada: 2B91A34E-3B06-4E5C-BB29-CC6C1F92378C.png, presentada como “2—Categoría”. La referencia de Universales enviada por equivocación no gobierna este diseño.

Composición exacta que se debe conservar:

- Fondo negro; una sola tarjeta oscura con borde verde y esquinas redondeadas.
- Enlace de regreso “← VER SCORES” arriba de la tarjeta.
- Encabezado “SCORES” verde a la izquierda; logo horizontal oficial a la derecha.
- Nombre del torneo debajo; después campo y fecha; línea divisoria.
- Una fila de tres botones rectangulares: GENERAL, CATEGORÍA y MIS FAVORITOS. Borde verde del seleccionado.
- Siguiente fila: BUSCAR JUGADOR ocupando aproximadamente dos tercios; COMPARTIR LIVE al lado ocupando aproximadamente un tercio.
- Selector de categoría a todo el ancho, con flecha. En la referencia aparece SENIOR.
- Tabla de cinco columnas, en este orden: NOMBRE, HOYO, GROSS, NETO, +/−. No agregar POS ni una columna extra de favoritos.
- Estrella a la izquierda del nombre. Nombre blanco y destacado; categoría debajo en gris.
- NETO verde; resultado bajo par y EVEN verdes; sobre par rojo.
- Ayuda al pie dentro de la tarjeta: “DOBLE TOQUE EN EL JUGADOR: VER 18 SCORES” y “☆ AGREGA · ★ QUITA FAVORITO”.
- Doble toque abre los 18 scores reales del jugador. Estrella agrega/quita favorito sin abrir el detalle.
- Conservar búsqueda, categorías, favoritos, compartir y navegación. No introducir botones visibles ajenos al formato aprobado; conservar administración accesible para quien tenga permiso.
- Los datos Jaime Kirste / Becky / Justi y sus números de la imagen son ejemplos visuales: no insertarlos como resultados reales.
- Verificar ancho móvil, legibilidad, bordes, ausencia de traslapes y funcionamiento en navegador antes de publicar.

**Estado:** cambios locales iniciados en live-hub.html, live-hub.js y scores-ui.css. Detalle de 18 hoyos PASS automático. Diseño renderizado, recorrido funcional y publicación PENDIENTES. Corregir y revisar el HTML generado antes de considerar candidato.

### 2. Desplegar los 18 scores al doble clic o doble toque en todas las vistas

**Orden nueva, 21:46–21:47:** “En los Scores de ronda no está desplegando los 18 Scores al darle doble clic a un nombre”; debe abrir también en Scores de torneo General, Categoría y Favoritos. El propietario ordenó agregarlo a esta lista y completar/publicar todo el bloque de una vez.

- Probar por separado Scores de ronda, torneo General, torneo por Categoría y Mis favoritos.
- Doble clic en escritorio y doble toque en iPhone sobre el nombre deben abrir el detalle del jugador seleccionado.
- Mostrar exactamente 18 posiciones, hoyos 1–9 y 10–18, Gross/Net por hoyo. Hoyos no anotados aparecen como —; conservar X y correcciones reales.
- Cerrar con X debe volver a la misma vista, categoría, búsqueda y favoritos sin perder datos.
- La estrella agrega/quita favorito; no abre el detalle accidentalmente.
- Comprobar que un refresco LIVE no destruya el doble toque o lo bloquee, y que ninguna capa tape el detalle.
- Usar snapshots reales o fixtures explícitos de prueba; no fabricar resultados de usuarios.
- Dejar regresión permanente para las cuatro vistas y verificar en navegador. PASS de una función aislada no cierra el fallo reportado en el iPhone.

**Estado:** fallo reportado por propietario, ABIERTO. La prueba aislada de scores-ui.js pasó pero no reproduce todavía el fallo real. Se inspeccionó bindRows y las llamadas en private-rounds.js/live-hub.js; causa precisa y corrección PENDIENTES.

### 3. Scores de torneo: investigar resultados ausentes de “Kirstes”

**Orden/evidencia:** “Esto es lo que vos tenés que no sirve”, IMG_5478.png. Captura: torneo Kirstes, El Pulté, 29 de septiembre de 2026; aparece “NO HAY SCORES DISPONIBLES CON ESTOS FILTROS”.

- Comprobar torneo, jugadores asociados, snapshots publicados, filtros, estado y caducidad.
- Distinguir falta de datos de filtro incorrecto o fallo de lectura.
- Mostrar resultados reales existentes; no inventar scores ni usar datos de demostración.
- Si no hay scores publicados, explicar esa condición con precisión.
- Probar General, Categoría, búsqueda y favoritos con datos verificables.

**Estado:** consulta SELECT de sólo lectura en Neon LAB br-small-mouse-av0f24o9 encontró Kirstes activo, id a9390c4b-8f42-4848-8a67-6e8f40d11ac5, con 0 streams, 0 streams activos y 0 snapshots. En producción br-late-wind-avhgi9s3 no se encontró torneo con nombre que contenga Kirst. No hay resultados publicados asociados en LAB para renderizar. Sigue pendiente revisar asociación/publicación de jugadores y sustituir mensaje ambiguo de filtros si realmente no existen scores; no inventar datos.

### 4. Botones inferiores de TORNEO y SCORES TORNEO

**Orden:** “A los botones de hasta abajo. Pónleles sólo el recuadro el borde verde como los que dicen atrás y ver mi tarjeta”.

- Fondo oscuro y borde verde, como ATRÁS y VER MI TARJETA.
- Conservar texto, navegación, ronda y pertenencia al torneo.
- Verificar visualmente ambos botones inferiores en ambas aplicaciones.

**Estado:** regresión automática de navegación y persistencia PASS. Confirmación visual actual de los dos botones PENDIENTE; no asumir aprobación a partir del test.

### 5. Crear torneo: Campo elegible, sin escribirlo

**Orden/evidencia:** IMG_5477.png. Donde dice CAMPO, añadir flechas y elegir entre los campos del Registro inicial.

- Selector nativo desplegable, con la misma fuente de campos y disponibilidad del Registro.
- El Pulté Golf; Guatemala Country Club; San Isidro; Mayan Golf; Hacienda Nueva Country Club; Alta Vista Golf & Tennis Club; La Reunión conserva condición pendiente/no seleccionable del catálogo.
- Conservar el campo elegido al crear el torneo; validar el formulario y no reemplazarlo por texto libre.

**Estado:** implementado y publicado en R147.2.4. Prueba de catálogo PASS; San Isidro seleccionado mediante UI de laboratorio. Creación y persistencia de un torneo con el campo elegido PENDIENTES de prueba controlada.

### 6. Actualización manual: corregir entrega a Laboratorio y mantener Producción

**Órdenes:** “La nueva versión tiene que venir para ambos”; “No actualices desde tu lado, quiero que me lleguen las teclas de actualizar a cada versión”; “Sólo a producción llegó… a laboratorio no llegó y ya estaba actualizado”.

Dominios confirmados:
- Laboratorio: https://golf-sc-gt-lab.vercel.app
- Producción: https://epg-caddy.vercel.app

- La versión anterior debe conservarse hasta que el usuario pulse ACTUALIZAR.
- Detectar la nueva versión y mostrar botón visible, habilitado y con la señal verde prevista.
- No instalar automáticamente al abrir, volver del fondo o recargar.
- Sólo después del toque instalar la versión completa; conservar jugadores, ronda, scores e historial.
- Descarga incompleta o desconexión: mantener versión y datos anteriores, permitir reintento.
- Examinar adopción del service worker antiguo por separado: la corrección nueva no prueba que todos los iPhone antiguos la hayan adoptado.
- Repetir transiciones sucesivas en ambos entornos. Registrar versión anterior, nueva, commit, despliegue, captura antes del toque y resultado después.
- No dar garantía absoluta ni “150%” por pruebas parciales.

**Estado:** R147.2.4 publicada desde 8bccff9 en ambos dominios. Navegadores de prueba recibieron ACTUALIZAR y conservaron datos tras el toque. Propietario confirmó Producción correcta; Laboratorio ya apareció actualizado sin tecla: **FAIL instalado en Laboratorio, ABIERTO**. Motor histórico reproduce promoción automática sin consentimiento; control negativo permanente añadido localmente. Prueba física/sucesiva completa PENDIENTE.

### 7. Publicar la siguiente prueba con botón en ambos entornos

**Orden:** “Ya que termines manda una prueba R147.2.4. Para confirmar que en ambas llegue la actualización correctamente”; integrar el selector Campo.

- R147.2.4 ya se publicó: no presentar como nueva una versión que el usuario ya tiene.
- Siguiente preparación local: R147.2.4.1, incluyendo las correcciones verificadas.
- Alinear release.json, etiqueta de pantalla y service-worker.js.
- Completar pruebas aplicables, revisión visual y controles de documentación/inventario.
- Publicar el mismo commit en los dos entornos; verificar que ambos sirven la misma release.
- Dejar las apps del propietario esperando su toque; no actualizar sus instalaciones desde nuestro lado.
- Documentar por separado entrega real a cada instalación.

**Estado:** R147.2.4.1 LOCAL, NO PUBLICADA. Publicación autorizada, pendiente de completar tareas anteriores.

### 8. LIVE en Laboratorio y Producción

**Órdenes:** corregir “NO SE PUDO COMPLETAR LIVE”; “Y el Live de laboratorios se chingó”. El propietario aclaró que una ronda anterior estaba cerrada y compartió una nueva de Producción.

- Comparar cada enlace sólo en su entorno original y mantener privacidad.
- Producción confirmada por enlace epg-caddy.vercel.app; Laboratorio por golf-sc-gt-lab.vercel.app.
- Probar compartir una ronda nueva activa, apertura en vista sólo lectura y recepción de cambios.
- Distinguir ronda cerrada, enlace caducado, revocación y fallo de publicación.
- No reactivar ni extender enlaces vencidos sin orden; no alterar scores para hacer la prueba.
- Revalidar LAB con enlace vigente; un enlace histórico caducado no sirve para declarar LIVE roto ni reparado.

**Estado:** recuperación de compartir enlace vencido implementada antes de R147.2.4; Producción nueva se vio activa. Enlace antiguo LAB caducado. Recorrido completo con LIVE vigente de LAB PENDIENTE.

### 9. Entregar lista comprobable de modificaciones

**Orden:** “Mándame una lista de las modificaciones que le hiciste a 147.2. Para revisarlo”.

- Separar cambios publicados, locales y pendientes.
- Referenciar commit, archivos y pruebas.
- No presentar el manual de tareas como evidencia de implementación.
- Registrar nuevos pedidos aquí y en continuidad; actualizar ambos ROADMAPS, mapa de archivos y sello en la versión de código correspondiente.

**Estado:** este manual conserva las órdenes. Informe final de modificaciones PENDIENTE al completar la versión.

## Punto de recuperación

Base publicada: commit 8bccff9, R147.2.4. No se ha publicado R147.2.4.1.
Últimos comandos comprobados: node --check live-hub.js; node test-scores-ui.mjs; node test-lab-update-recovery.mjs — PASS automático.
Próxima acción exacta: revisar/corregir HTML de renderCompactScores, completar la composición del enlace de regreso y administración, abrir Scores en navegador y comparar con la referencia aprobada; después diagnosticar Kirstes. No saltar a publicación ni declarar LAB resuelto.


## Handoff solicitado por el propietario, 21:47:33
El propietario pide abrir nueva conversación para completar todo el paquete, con todas las tareas dentro del prompt. No continuar publicando en este turno de preparación del handoff. Conservar cambios locales y registrar el commit documental. La nueva conversación debe recuperar esta rama, comprobar el estado real y continuar sin pedir las instrucciones o imágenes otra vez.

Cambios locales después de 8bccff9: release/index/worker R147.2.4.1; control negativo del worker histórico; live-hub.html (búsqueda y compartir juntos), live-hub.js (cinco columnas y estrella izquierda), scores-ui.css (tarjeta/control/tabla). Revisar composición y funciones: estos cambios NO están aprobados visualmente ni publicados. El manual sí está respaldado en Git. No reconstruir una supuesta versión completa a partir del commit documental.

Limitación verificada: navegador cloud no abrió http://127.0.0.1:8765/live-hub.html?demo=1, ERR_BLOCKED_BY_CLIENT. Revisar por Preview. No clasificarlo como bot ni afirmar que la app está caída.

Respaldo recuperable de TODOS los cambios locales y fixture: CONTROL_PROYECTO_SCIRE/RECUPERACION_R147_2_4_1.patch, basado en 9552ffb. Si falta el workspace, comparar árbol/base y ejecutar git apply --check antes de aplicar; el patch conserva el trabajo, no prueba calidad ni publicación.

## Aclaración obligatoria del propietario — 21:50:59
El propietario ABRIÓ el torneo KIRSTES y confirma jugadores registrados en la Score Card con algunos hoyos jugados y scores anotados. Al ir a la tabla sólo apareció el nombre del torneo. Pulsó General, Individual y Categorías y no abrió absolutamente nada. El formato actual tampoco cumple la referencia.

Esta evidencia reemplaza cualquier interpretación de que no tiene scores: los scores EXISTEN localmente según el propietario. La consulta con cero streams demuestra sólo que no hay snapshots asociados al torneo en LAB. Tarea 3 debe investigar y corregir el recorrido Score Card → asociación al torneo KIRSTES → escritor/publicación de snapshot → lectura del monitor → tabla. No borrar ni reemplazar los scores locales, no exigir reanotarlos y no insertar ejemplos. Verificar que los tres controles citados sí cambien de vista y muestren los datos que corresponden. El cierre requiere prueba de esa cadena, además del formato y detalle de 18 hoyos.

21:51:19 — El propietario confirma que tanto PRODUCCIÓN como LABORATORIO contienen jugadores con scores ya anotados para hacer los ejercicios. Probar los flujos en AMBOS entornos con esos datos existentes, sin borrar, modificar ni reanotar scores. No concluir que no existen datos porque una consulta por nombre de torneo no devuelve streams; verificar vínculo local/evento/grupo y publicación en cada entorno.

## Orden visual expresa — 21:56:43, Guatemala
El propietario exige que las imágenes de referencia aprobadas se reproduzcan IDÉNTICAS. No basta una interpretación, aproximación o estilo parecido. La captura aprobada de Scores 2B91A34E-3B06-4E5C-BB29-CC6C1F92378C.png gobierna composición, proporciones, tamaños, tipografía, pesos, colores, bordes, radios, espacios, logo, posiciones de botones, estrellas y columnas. Adaptar únicamente lo necesario al ancho del dispositivo sin cambiar la composición aprobada. Comparar una captura real del resultado a tamaño equivalente con la referencia antes de declarar terminado o publicar. Las capturas que muestran fallos documentan lo que debe corregirse; la de Universales fue descartada expresamente. No añadir ni omitir controles del formato aprobado, y conservar las funciones y datos reales. Las imágenes originales se recibieron dentro de la conversación; el respaldo documental conserva sus identificadores y descripción, no debe fingirse que el archivo original está físicamente archivado si no se recuperó.


## Directrices adicionales del propietario · 2026-09-30 22:37 Guatemala

Estas directrices amplían las tareas pendientes y no equivalen a pruebas aprobadas ni publicación.

| Requisito | Comprobación obligatoria | Estado |
|---|---|---|
| Fuente, tipo y tamaños equivalentes iguales en todos los Scores | Comparar ronda, General, Categoría, Favoritos y detalle a igual ancho | Implementación común; verificación completa pendiente |
| Logos 25% mayores, sin deformar | Medir ancho y relación de aspecto en cada vista de Scores | Torneo móvil comprobado; demás vistas pendientes |
| General reúne todos; Categoría deriva de categoría asignada | Alternar General y categoría propia sin excluir ni modificar jugadores | Pendiente de recorrido integral |
| Tablero Favoritos mezcla jugadores elegidos en General y categorías | Elegir jugadores de dos categorías; ambos deben aparecer sin filtro residual | Navegador real Preview LAB PASS |
| Doble clic/doble toque en cada nombre abre los 18 hoyos | Ver 1–9 y 10–18 Gross/Net en ronda y las tres vistas; estrella independiente | Pendiente de navegador en todas |
| X arriba a la derecha cierra sólo detalle | Conservar vista, filtros, scroll, favoritos y datos | Pendiente de navegador |
| SCORES TORNEO abre directamente pizarra asociada | Desde ronda anotada, entrar, alternar vistas y volver a la misma Score Card | Flujo real nuevo en LAB y retorno PASS; KIRSTES existente/producción pendientes |
| Invitado entra por código sobre Scores difuminado | Código válido cierra emergente y aclara fondo; inválido/vencido conserva bloqueo; sólo lectura según permiso | Pendiente |
| Todos los títulos y subtítulos son fijos | No editar ni seleccionar encabezados, subencabezados, rótulos y tablas; campos de entrada siguen editables | Score Card: selección bloqueada comprobada; demás vistas y edición pendientes |
| Referencia Universales anulada | No usar esa imagen como diseño; referencia torneo exclusiva 2—Categoría | Aplicado |

No tocar selector CAMPO R147.2.4. No borrar, reemplazar ni exigir reanotar scores. No pulsar ACTUALIZAR en instalaciones del propietario. LAB y producción se entregan tras comprobación funcional y visual.


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
