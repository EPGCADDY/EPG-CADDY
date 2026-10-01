Continúa Golf Score Card GT / EPG Caddy y completa todo el paquete hasta publicarlo en LAB y Producción, ya autorizado. Lee el manual completo que sigue, AGENTS.md y los controles del proyecto. Ejecuta una cosa por vez con evidencia y avances reales cada <=60 s (hora Guatemala). No pidas reenviar instrucciones o imágenes. No fuerces la instalación en mis apps: deben recibir ACTUALIZAR y yo pulsarlo. No confundas PASS automático con prueba de mi iPhone.

Repositorio: EPGCADDY/EPG-CADDY. Rama canónica: lab/r14721-update-recovery-20260930. Base publicada R147.2.4: 8bccff9. Manual: CONTROL_PROYECTO_SCIRE/MANUAL_TAREAS_R147_2.md. LAB: https://golf-sc-gt-lab.vercel.app; Producción: https://epg-caddy.vercel.app. La R147.2.4.1 sólo está preparada localmente; no publicada. Recupera la continuidad del workspace y compara con Git antes de editar. No uses main protegido para perder cambios. El último commit documental no contiene las correcciones locales todavía pendientes.

A continuación está TODO el manual de tareas, no un resumen. Sus descripciones guardan el formato de las capturas y las órdenes. Si hay nueva evidencia, actualízalo y continúa desde el último punto comprobado.

---

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
