# EPG CADDY · CONTINUIDAD MAESTRA PERMANENTE DE LAB

## Estado V407-R29 · 12 de septiembre de 2026

- Defecto físico: en Tarjeta Universales cerrada, `ENVIAR TARJETA DIGITAL` no abrió ninguna acción.
- Causa raíz: el PNG se generaba de forma asíncrona antes de `navigator.share` y Safari perdía la activación del toque.
- Corrección: PNG preparado al cerrar; compartir se invoca inmediatamente en el toque; estado visible fuera del panel oculto.
- Prueba dirigida `test-v397-card-in-out-back-contract.mjs`: PASS automático. Preview y prueba física iPhone pendientes.


## Relevo V407-R24C recuperación R8 · 9 de septiembre de 2026 · 19:44 Guatemala

- MAIN permanece intacta en `5e45b264da056ed9c4ee5ee61d5e4e05dfc69636`.
- El alias estable `https://golf-sc-gt-lab.vercel.app` mostró físicamente V407-R8; ACTUALIZAR no actuó.
- Causa pública verificada: el middleware devolvía `access.html` para `/service-worker.js` y ambos manifiestos. Corrección local: esos tres recursos de arranque quedan públicos; aplicación, datos y escrituras siguen privados.
- Segundo FAIL físico: `ACTUALIZADO` cubrió `CONTROL MANUAL · UNIVERSALES` durante scroll. Corrección local en `gsc-design-system.css`: sólo el estado inactivo usa posición absoluta; ACTUALIZAR disponible conserva posición fija, verde, habilitada y pulsante.
- Auditoría local antes de reorganizar el transporte: `133/133 PASS`; inventario `450 fuentes + 3 PDF PASS`; Manual `74/74 PASS`.
- Commit remoto `9f32fd75f753061c0209a9ebcf719f8bd700aeb8` NO es publicable: el conector truncó `index-grupal.html`; deployment `dpl_6a2A5VCorw1vp1fPUiikeVjDprzC` terminó ERROR y el alias estable no cambió.
- Estado local actual: HTML completo restaurado desde R24C; regla visual trasladada al CSS pequeño; tres pruebas dirigidas PASS. Falta regenerar inventario, repetir `npm run audit`, crear un commit remoto sin transportar de nuevo el HTML grande, esperar READY y verificar públicamente que `/service-worker.js` sea JavaScript.
- Estado oficial: **NO REVISADO / NO PUBLICADO**. Revisión automatizada en navegador real y micrófono físico iPhone siguen separados. No promover MAIN hasta cero FAIL LAB.

## Continuidad V407-R10 · 8 de septiembre de 2026

El propietario confirmó que R9 cargó la pantalla correcta pero rechazó que `ACTUALIZADO` estuviera deshabilitado. R10 conserva el estado oscuro cuando está vigente, pero mantiene la tecla activa: cada toque guarda la ronda, limpia únicamente el shell PWA y recarga realmente el mismo enlace. No cambia ninguna gráfica ni otra función. MAIN intacta.

## Continuidad V407-R9 · 8 de septiembre de 2026

La evidencia física `IMG_3140(1).jpeg` mostró V407-R8 con `ACTUALIZAR` verde, pero el toque no sustituía la pantalla anterior. R9 restaura el contrato confirmado: la versión vigente muestra `ACTUALIZADO` oscuro; un release distinto muestra `ACTUALIZAR` verde/parpadeante. El toque guarda la ronda, desregistra el service worker viejo, elimina únicamente cachés `gscg-mobile-*` y recarga el mismo enlace con la identidad R9; `localStorage` e Historial no se borran. La activación del worker ya no promueve ni navega por sí sola. MAIN permanece intacta.

## Continuidad V407-R4 · 8 de septiembre de 2026

Las capturas físicas `IMG_3120(1).png`, `IMG_3121(1).png` e `IMG_3122.png` confirmaron superposición de la barra de estado iPhone sobre logo, ronda, fecha, hora y actualización. R4 aplica área segura superior, desplaza el bloque derecho 36 px hacia el centro y el control de actualización 58 px desde el borde. Revisión física publicada pendiente; Producción intacta.

## Continuidad V406-R24 · 8 de septiembre de 2026

La evidencia física `IMG_3054.png` confirmó que R23 sí parpadea únicamente cuando hay actualización y, después del toque, queda oscuro en `ACTUALIZADO`; también mostró que el ID estaba casi invisible detrás de la barra superior. R24 conserva ese flujo manual confirmado y coloca un único `V406 · R24` blanco inmediatamente encima de la misma tecla oscura. `test-v406-r23-visible-version.mjs` exige la relación DOM y el estilo blanco. Revisión física R24 publicada pendiente; Producción intacta.

## Continuidad V406-R23 · 7 de septiembre de 2026

R23 añade el identificador compacto blanco `V406 · R23` arriba del logo. La tecla permanente apagada muestra `ACTUALIZADO`; cuando el detector encuentra otro release, cambia a `ACTUALIZAR` y parpadea. La promoción del candidato continúa ocurriendo únicamente después del toque. El cierre de hoyos 9/18 habilita audio desde ENTER, prioriza la voz dedicada y rearma cualquier anuncio cuya reproducción no haya comenzado. `test-v406-r23-visible-version.mjs` y `test-v406-r23-turn-closure-audio.mjs` blindan ambos contratos. Revisión física publicada pendiente; Producción intacta.

## Continuidad V406-R22 · 7 de septiembre de 2026

R22 corrige cinco fallos físicos y de coherencia pública: la actualización instalada ya no debe sustituirse sola, sino conservar el shell aprobado hasta tocar ACTUALIZAR; la recuperación de desplazamiento restablece el elemento de scroll y neutraliza capas invisibles; correlativos y textos fijos no pueden seleccionarse accidentalmente, pero nombre, score y datos editables sí; toda superficie pública y preview de WhatsApp usa GOLF SCORE CARD GT; y todas las Score Cards —incluida Tarjeta Digital— incorporan el botón homogéneo COMPARTIR LIVE para crear o reutilizar un enlace de sólo lectura con el grupo completo. GENERAL conserva todos los jugadores publicados y los empates muestran T antes de la posición deportiva, por ejemplo T34. Revisión física publicada pendiente; Producción intacta.

## Continuidad V406-R21 · 7 de septiembre de 2026

`IMG_3041.png` confirmó que S.SENIOR 04, FEMENINA 01 y A 05 seguían guardados pero volvían a `ENLACE NO DISPONIBLE` al entrar por TORNEO GUARDADO. R19 sólo añadía las rondas demo mientras la URL conservaba `demo=1`. R21 mantiene el catálogo demo como fuente local de respaldo y superpone cualquier stream LIVE vigente; los favoritos demo conservan su tarjeta al cambiar de pantalla o torneo, sin consultas extra. Revisión física publicada pendiente; Producción intacta.

## Continuidad V406-R20 · 7 de septiembre de 2026

El propietario reportó dos fallos físicos en iPhone: el acceso instalado puede abrir como una imagen inmóvil sin desplazamiento y `ACTUALIZAR` permanece oscuro sin aviso. R20 restaura `overflow-y:auto` al cargar, volver desde segundo plano y recuperar foco; las capas de Registro reciben desplazamiento táctil nativo. Release y caché avanzan juntos para forzar la renovación del shell. `ACTUALIZAR` oscuro sigue significando release cargado vigente; verde y parpadeante significa release distinto publicado. Revisión física publicada pendiente; Producción intacta.

## Continuidad V406-R19 · 7 de septiembre de 2026

La captura física `IMG_3034.png` demostró que elegir `S.SENIOR 04` no abría al jugador: MI TABLERO mostraba `ENLACE NO DISPONIBLE, CADUCADO O REVOCADO`. La causa fue que el render individual resolvía únicamente `generalStreams`, vacío en la demostración, aunque el jugador visible provenía correctamente de `displayStreams()`. R19 usa la misma colección visible para seleccionar y resolver favoritos; la regresión reproduce exactamente `S.SENIOR 04`. R18 del control ACTUALIZAR queda integrado. Revisión física publicada pendiente; Producción intacta.

## Continuidad V406-R18 · 7 de septiembre de 2026

El control `ACTUALIZAR` es permanente y visible también dentro de la Tarjeta Digital Final. Permanece oscuro y deshabilitado cuando el release cargado coincide con el publicado; únicamente se vuelve verde y parpadeante cuando existe otro `gscg-release`. R18 cambia la caché para que instalaciones R17 detecten el release nuevo sin borrar sesión. La ausencia del control reportada por el propietario queda registrada como FAIL físico; LAB no se entrega hasta repetir el recorrido publicado. MAIN/Producción permanecen intactas en `4009f79f50987f8bf105189bce9c5e90b2857363`.

## Continuidad V406-R17 · 7 de septiembre de 2026

MI TABLERO guarda y muestra los jugadores seguidos. `IMG_3033.png` evidenció el botón individual activo pero la General visible porque cada refresco de tres segundos restablecía los paneles. R17 conserva `activeMonitor`; escenario obligatorio: agregar cinco jugadores, esperar varios refrescos y confirmar que las cinco tarjetas continúan visibles. Revisión física publicada pendiente.

## Continuidad V406-R16 · 7 de septiembre de 2026

La General LIVE demostrativa debe calcular cada jugador individualmente. Evidencia física rechazada: C 08 mostró HCP 20, Gross 90, Neto 72 y E. Resultado obligatorio R16: Gross 90, Neto 70 y −2. Todos los finalizados cumplen Neto=Gross−HCP y Resultado=Neto−Par. La liberación sigue bloqueada hasta revisar físicamente cada tarjeta, apuesta, LIVE, WhatsApp y gráfica.

## Continuidad V406-R15 · 7 de septiembre de 2026

Todas las modalidades comparten en la tarjeta el control `BORRAR TODO`, nunca `BORRAR SCORES`. Registro y tarjeta delegan en `clearAllRegistrationPlayers()` y exigen confirmación antes de eliminar jugadores, scores y ronda activa. CANCELAR no modifica datos; aceptar vuelve a Registro nuevo y la ronda eliminada no puede reaparecer desde almacenamiento ni Historial. La liberación exige abrir físicamente General, Stableford, Match Play, Four Ball, Práctica, Skins, Wolf, Vegas y Dots y comprobar el control compartido en cada recorrido.

## Continuidad V406-R14 · 7 de septiembre de 2026

R13 fue rechazado en recorrido visual real: después de tocar ACTUALIZAR continuaba verde/parpadeante aun con el mismo release. R14 restaura el contrato obligatorio: apagado cuando está vigente, verde/parpadeante sólo ante un release remoto distinto, con `persist()` antes de recargar. Pendientes bloqueantes: regresión integral R14, Preview LAB READY y recorrido visual publicado actualización→conservación→apagado. MAIN/Producción permanecen intactas.

## Continuidad V406-R13 · 7 de septiembre de 2026

R11 quedó desplegado con `gscg-release` R9 y por eso una instalación anterior no activó el parpadeo. R13 mantiene ACTUALIZAR verde/parpadeante siempre, incluso estando vigente. Debe verificarse visualmente desde una sesión con ronda persistida: tocar ACTUALIZAR conserva la ronda, BORRAR TODO elimina la ronda, una recarga y una reapertura muestran Inicio sin jugadores. MAIN/Producción permanecen intactas.

## Continuidad V406-R11 · 7 de septiembre de 2026

Corrección candidata: `BORRAR TODO` elimina la ronda activa y evita su recuperación desde Historial; cerrar y abrir debe mostrar Inicio limpio. Otras rondas oficiales permanecen en Historial. Caché R11; MAIN intacta; prueba física iPhone pendiente.

## Continuidad V406-R10 · 7 de septiembre de 2026

LAB incorpora Centro de Torneos (máximo cinco), enlace exclusivo por torneo y alimentación multiteléfono sin capitán. La tarjeta de cada teléfono sigue siendo personal; General/categorías deduplican por grupo, jugador y hoyo. Pendiente de cierre: validación física LAB antes de cualquier promoción a MAIN.

## Continuidad V406-R9 · 7 de septiembre de 2026

El selector de posiciones de TORNEO LIVE se denomina GENERAL; conserva Campeonato, A, B, C, D, Femenina, Senior y S.Senior. Esquema visual R6/R8 y reglas operativas R7 preservados. MAIN intacto.

## Continuidad V406-R8 · 7 de septiembre de 2026

Restaurado el esquema gráfico V406-R6 de TORNEO LIVE: General, filtro por categorías y posiciones aparecen antes de cualquier listado individual. Los 67 jugadores simulados y las siete reglas operativas R7 permanecen. El listado alfabético para Mi Tablero sólo aparece después de una búsqueda. MAIN permanece intacto.

## Continuidad V406-R7 · 7 de septiembre de 2026

GENERAL, categoría e Individual se actualizan y reubican por score acumulado cada tres segundos. En empate de resultado, mayor avance de hoyos queda arriba; al completar 18 aparece FINAL. Un mismo número de hoyo sólo puede aportar una vez al acumulado. La vista usa categorías y sus colores, con Campeonato como C en cuadro blanco; Mi Tablero lista por primer nombre en orden alfabético. Las marcas predeterminadas se derivan de la categoría. MAIN permanece intacto.

## Continuidad V406-R6 · 7 de septiembre de 2026

TORNEO LIVE abierto desde LAB sin enlace muestra una demostración temporal de 67 jugadores por categorías 7/6/24/11/7/7/5. Es sólo lectura, no modifica datos reales y permite comprobar clasificación, búsqueda y detalle. La caché V406-R6 activa el botón ACTUALIZAR del acceso LAB instalado. MAIN permanece intacto.

## Continuidad V406-R4 · 7 de septiembre de 2026

LIVE, REGLAS, AI ∞ y Support quedan dentro del flujo. Registro diferencia CATEGORÍA y MARCAS. ATRÁS, BORRAR TODO y + JUGADOR comparten fila. La escala se verifica con 67 nombres temporales por categorías 7/6/24/11/7/7/5, sin alterar datos reales ni fijar cantidades.

## Continuidad V406-R2 · 7 de septiembre de 2026

V406-R2 mantiene la categoría individual de V406-R1, consolida Registro sin hoja de sobrescrituras y asigna a TORNEO LIVE una hoja canónica propia. En móvil, cada jugador usa dos líneas: Nombre + Categoría y luego HDCP + Marcas, con campos de 48 px y tipografía legible.

TORNEO LIVE incorpora una Vista detallada de categoría temporal y de sólo lectura. Reúne la cantidad real disponible —por ejemplo 14, 20, 22 o 30—, sin número fijo ni filas de relleno; mezcla los foursomes y reordena de líder a peor resultado tras cada actualización. Presenta hoyos 1–18 con Gross/Neto/resultado y cortes IN/OUT/TOTAL. No crea Score Card, PDF, archivo ni historial; el foursome es solamente la fuente y una referencia secundaria.

Cada categoría abre con fecha automática Guatemala, torneo, modalidad y categoría grande; la clasificación compacta muestra POS, NOMBRE, HDCP, MARCAS, GROSS, NETO y +/− antes del detalle por hoyo.

La capacidad visual automática cubre 100 participantes en 25 foursomes de cuatro. El límite rígido también quedó protegido en `api/live.js`: publicación y unión bloquean el torneo, cuentan dentro de la transacción y rechazan al jugador 101 con HTTP 409. Navegador automatizado no disponible en este entorno y prueba física iPhone/Safari pendiente. MAIN permanece en `f24af2dd954ef11a87c885f9db15d34dfd7b65bf`.

## Continuidad V406-R1 · 7 de septiembre de 2026

V406-R1 añade categoría individual en Registro y TORNEO LIVE con índice por categoría y MI TABLERO. La prueba física en iPhone/Safari sigue pendiente; no promover a MAIN antes de esa evidencia. MAIN permanece en `f24af2dd954ef11a87c885f9db15d34dfd7b65bf`.

**Identificador:** `EPG-CADDY-LAB-CONTINUITY-V1`  
**Fecha:** 7 de septiembre de 2026  
**Autoridad:** instrucción expresa del propietario  
**Alcance:** continuidad entre conversaciones, ramas, pruebas y Preview de LAB.

## 1. Separación absoluta

- `MAIN NO SE TOCA NUNCA` durante el trabajo LAB.
- MAIN/Producción queda congelada en `f24af2dd954ef11a87c885f9db15d34dfd7b65bf`.
- Deployment MAIN: `dpl_FuDVeY79yoTgjdsJwLRBsXSfR3L7`.
- Enlace MAIN: `https://epg-caddy.vercel.app/index-grupal.html?inicio=1`.
- Todo trabajo, prueba, commit y deployment nuevo se ejecuta exclusivamente en la rama `LAB`.
- Ninguna aprobación de LAB autoriza por sí sola modificar MAIN.

## 2. Último LAB publicado

- Versión: `V404 LAB`.
- Commit remoto: `6ca572ccdf74054a618fd473519edc6342fcc74c`.
- Deployment: `dpl_4AGM3JUoxkR6UGVJv7kuDqrfr8es`.
- Estado registrado: `READY`.
- Enlace permanente: `https://epg-caddy-git-lab-epgcaddys-projects.vercel.app/index-grupal.html`.
- V404 bloquea selección y `Copiar / Buscar selección` durante la pulsación prolongada sobre una ronda del Historial, sin alterar diálogo, borrado persistente ni doble toque.
- Pendiente físico: confirmar en iPhone que la pulsación prolongada abre `ELIMINAR` sin menú nativo.

## 3. Trabajo vigente V405

- Botón `ACTUALIZAR` visible, oscuro y deshabilitado sin versión nueva.
- Verde y parpadeante cuando el release publicado difiere del instalado.
- Al tocarlo ejecuta `persist()` antes de recargar el mismo dominio.
- No borra sesión, ronda, scores, jugadores, perfil ni Historial.
- El dominio LAB permanente recibirá futuras versiones sin cambiar enlace ni reinstalar el icono.
- La migración única desde el origen fijo V403 al LAB permanente es un trabajo separado.
- No se borra el icono LAB antiguo hasta transferir y comprobar los datos.
- MAIN no se borra ni se modifica.

## 4. Sesión del iPhone

- El icono LAB antiguo apunta al deployment fijo V403 y conserva sesión, Historial y ronda.
- El dominio LAB permanente es otro origen y aparece vacío antes de la migración.
- Actualizar dentro del mismo origen no migra datos entre orígenes.
- No se promete conservación entre orígenes sin exportación, importación y comprobación física.

## 5. Reglas permanentes

1. Continuar desde el último commit remoto confirmado de LAB; nunca reconstruir desde una versión anterior.
2. Comprobar rama, ancestro, árbol sucio, remoto y diferencia exacta antes de escribir.
3. Preservar cambios locales preexistentes; no sustituir archivos completos desde otra rama.
4. Aplicar `CAMBIO MÍNIMO → PRUEBA REAL → REGRESIÓN → EVIDENCIA → TERMINAR`.
5. Ejecutar Gate 0, Intocables, banco dirigido, ROADMAP e inventario antes de publicar.
6. Registrar cada archivo modificado en ambos ROADMAPS dentro de la misma versión.
7. No actualizar hashes para encubrir cambios no aprobados.
8. No declarar PASS físico sin evidencia obtenida en el dispositivo real.
9. No afirmar apertura del selector de WhatsApp si Safari no permite comprobarla.
10. No tocar módulos Intocables sin autorización expresa y literal.
11. Producción permanece intacta hasta una autorización expresa y literal independiente.

## 6. Pendientes que sobreviven al cambio de conversación

- V404: pulsación prolongada abre `ELIMINAR` sin `Copiar / Buscar selección`.
- V405: botón apagado sin actualización y verde/parpadeante al publicar el release siguiente.
- Migración única V403 fijo → LAB permanente sin pérdida de datos.
- PNG real mediante `ENVIAR TARJETA DIGITAL` en Normal, Stableford, Match Play y Four Ball; entregar las cuatro imágenes guardadas en Historial.
- Verificar filtros, `NUEVA RONDA`, reapertura en hoyo pendiente, `IN = 1–9`, `OUT = 10–18`, `ATRÁS` y ausencia de `REGÍSTRATE` dentro de tarjetas.
- Comunicación Universal: turnos consecutivos, interrupción del audio anterior, cero superposición, micrófono verde, latencia medida, voz `es-419` a `0.90` sin ceceo y tráfico GPS con expresiones de ubicación actual.

## 7. Mensaje único para toda conversación nueva

> **CONTINUACIÓN EPG CADDY LAB — Lee primero `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md` y continúa desde su estado vigente. No reinicies, no pidas antecedentes ya registrados y no regreses a versiones anteriores. Trabaja exclusivamente en LAB. MAIN no se toca nunca. Ejecuta el siguiente pendiente real con cambio mínimo, pruebas, regresión y evidencia.**

No hay que reescribir commits, deployments, enlaces ni pendientes: este archivo es la fuente permanente. Cuando cambie el estado, se actualiza en el mismo commit que ambos ROADMAPS y sus controles.

## 8. Blindaje

- Sólo se actualiza después de confirmar el nuevo estado con Git, Vercel o evidencia física aplicable.
- Cada versión nueva indica commit, deployment, enlace, estado automático, estado físico y rollback.
- `test-lab-continuity-master.mjs` bloquea la ausencia o alteración de las anclas permanentes.
- Este archivo pertenece a `requiredControls` de Gate 0; si falta, el candidato queda bloqueado.

## 9. V405-R2 en validación

- Registro incorpora `BORRAR TODO` para nombre, HDCP y marcas de los seis espacios, sin tocar Historial ni rondas.
- Tarjeta Digital móvil aísla controles flotantes, apila acciones y limita el desplazamiento horizontal a la tabla.
- Evidencia física de origen: `IMG_2949.png`, estado FAIL previo a la corrección.
- Pendiente obligatorio: inspección renderizada y prueba física iPhone de Normal, Stableford, Match Play y Four Ball.

## 10. V407-R5 · auditoría visual total en ejecución

- Inventario canónico: 67 pantallas y estados en `CONTROL_PROYECTO_SCIRE/AUDITORIA_VISUAL_V407/INVENTARIO_PANTALLAS_ESTADOS_V407_R5.md`.
- Matriz física: 9 ID con evidencia FAIL y 58 pendientes; ningún PASS físico concedido todavía.
- Primera corrección R5: tarjeta Stableford Global responsive con metadatos y SHA contenidos y hoyos separados IN/OUT.
- Pruebas dirigidas PASS: inventario visual, artefactos, sistema premium, diseño profesional, controles móviles, versión visible y recuperación de ronda.
- LAB pendiente de publicación y recorrido físico R5; Producción permanece en `4009f79f50987f8bf105189bce9c5e90b2857363`.


## Orden expresa R38 — 13 septiembre 2026
El propietario solicita push-to-talk en ambas aplicaciones habituales, Laboratorio y Maestro, con aviso Actualizar. Autoriza esta publicación específica en ambos proyectos, sustituyendo para esta entrega el congelamiento histórico de MAIN. Nueva identidad R38 y shell incluye voice-turns.js. El propietario reporta buen funcionamiento del micrófono; disponibilidad de respuestas universales sigue reportada como fallida y pendiente de diagnóstico. No se declara resuelta Comunicación Universal.


## OP-60 — EJECUCIÓN VISIBLE Y CONTINUA OBLIGATORIA

Orden expresa del propietario: 13 de septiembre de 2026. Aplica a toda tarea de este repositorio, Laboratorio y Maestro, y a cada continuación de conversación. El propietario no debe volver a repetir esta orden.

1. Durante una tarea activa no pueden transcurrir más de 60 segundos sin un reporte visible en el chat. Emitirlo antes del límite; dividir operaciones largas en tramos que permitan informar.
2. Cada reporte contiene hora de Guatemala, acción técnica realmente completada, archivo/pantalla/comando inspeccionado, resultado concreto, evidencia verificable, estado PASS/FAIL/PENDIENTE y siguiente acción. Si una operación sigue ejecutándose, identificarla como EN CURSO y mostrar su última salida real; no inventar un resultado terminado.
3. Después del reporte, continuar ejecutando sin esperar otro mensaje ni pedir que el propietario diga continúa. No finalizar el turno con trabajo autorizado pendiente salvo bloqueo real documentado o intervención del propietario indispensable.
4. Pensando, planes, promesas, disculpas, repetición de pruebas ya aprobadas sin motivo y afirmaciones de trabajo en segundo plano no constituyen ejecución demostrada. No mostrar razonamiento interno como evidencia.
5. Nunca afirmar actividad después de cerrar un turno. Al detenerse, declarar DETENIDO o BLOQUEADO, la causa precisa, última acción/evidencia y próxima acción concreta.
6. Si una limitación real de plataforma o permisos impide continuar o mantener comunicación visible, declararla expresamente, guardar un punto de recuperación completo y cerrar. No convertir una limitación hipotética en excusa rutinaria ni presentar la revisión automática como prueba física.
7. Conservar archivos, versión/commit, resultados, fallos y pendientes en el punto de recuperación. No pedir otra autorización para acciones ya autorizadas; sólo interrumpir por una necesidad real y explicada.
8. La falta de ejecución visible es un incumplimiento operativo, aunque las pruebas técnicas pasen. Registrar la reincidencia y corregir el proceso. Este documento fija la obligación; por sí solo no ejecuta un temporizador ni garantiza el cumplimiento del agente.


## R144 · 30 septiembre 2026 · candidato local en curso, NO entregado

- Base recuperada: LAB R143 `013f046c44bd3b793ac86c5f02abb034c589badd`; matriz aprobada `Matriz_Acceso_Ronda_y_Torneo.md`, versión 4 de Library, 30 septiembre 2026. Producción no modificada; sin push, despliegue ni migración remota.
- Scores compartido en Torneos y Ronda Particular: título 20.25 px, logo horizontal original 145 px, metadatos reales 16 px, tabla compacta, favoritos personales y detalle por doble toque con 18 G/N en dos filas de nueve. Ausentes = —; X/Escape cierran sin cambiar filtro. Búsqueda actualiza tabla; favoritos caducados se pueden quitar.
- Regresión heredada ajustada a aprobaciones vigentes (CREAR EVENTO, GENERAL/CATEGORÍA y actualización explícita), sin retirar verificaciones de cálculo, navegación o funciones retiradas. Build técnico completo repetido tras integración de cuatro regresiones nuevas: PASS.
- Revisión Firefox 390×844: GENERAL, CATEGORÍA, estrella independiente, favorito con 18 posiciones y X/Escape PASS, sin errores JS. Evidencia local temporal `/tmp/golf-mobile-detail.png`, `/tmp/golf-mobile-favorites.png`; fixture demo identificado, no datos reales. Ronda Particular revisada mediante fixture de API aislado; no equivale a prueba de backend real.
- API LAB sin DATABASE_URL falla cerrada y no usa proxy a Producción; prueba de cero llamadas upstream PASS.
- Base de permisos personales y esquema SQL preparados, NO conectados ni aplicados: roles, caducidad, revocación, cookie HttpOnly, hashes, consumo en una sentencia CTE. Test unitario valida contrato SQL, NO certifica concurrencia real.
- Bloqueo preciso: la matriz deja pendiente selección/configuración del proveedor de verificación telefónica. No existe prueba de control del teléfono implementada, ni se ha verificado una base LAB aislada para estas tablas. Conector Neon no está asociado a un proyecto: list_branches exige project_id; repositorio/mapa no lo documentan y no hay NEON_API_KEY ni VERCEL_TOKEN local. NO activar códigos personales, sesiones, permisos o compartir LIVE como completos; el flujo heredado sigue activo en LAB remoto R143.
- Pendientes obligatorios: proveedor y prueba real, integración server/client de autorizaciones y enlace LIVE sin bearer compartido, restricción de compartir a inscritos, concurrencia y regresión end-to-end contra base LAB aislada; luego build/gates/revisión visual integral, commit y despliegue exclusivamente LAB. Sin certificación integral ni nueva entrega.
- Archivos del bloque: `scores-ui.js`, `scores-ui.css`, `index-grupal.html`, `live-hub.html`, `live-hub.js`, `private-rounds.js`, `service-worker.js`, `api/live.js`, `api/_lib/personal-access.js`, `sql/personal-access-lab.sql`, `test-scores-ui.mjs`, `test-scores-ui-browser.cjs`, `test-personal-access.mjs`, `test-lab-no-production-proxy.mjs`, `test-lab-private-rounds.mjs`, `scripts/build-manual-lab.mjs`, `test-lab-medal-monitor.mjs`, `test-lab-r60-production-refresh.mjs`, `test-manual-no-assistant.mjs`, `test-lab-tournament-navigation.mjs`, `test-lab-shortcuts-navigation.mjs`, `test-lab-global-operational-audit.mjs`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.

### Continuación R144 · 29 septiembre 2026, 22:28 Guatemala

- `api/_lib/personal-access.js` ahora rechaza rol desconocido y fecha inválida; `test-personal-access.mjs` protege ambos casos.
- `test-personal-access-postgres.mjs` ejecuta el esquema `sql/personal-access-lab.sql` con motor PostgreSQL PGlite local; `package.json` fija la dependencia de pruebas 0.5.8 y `scripts/build-manual-lab.mjs` incluye la prueba. PASS: teléfono incorrecto no consume, dos solicitudes compiten y una obtiene alta/sesión, invitación vencida rechazada y sesión revocada denegada. PGlite usa una conexión; no es certificación de concurrencia de múltiples conexiones Neon ni prueba de posesión telefónica.
- `scores-ui.css` corrige ayuda de Ronda Particular de sticky dentro del panel a fixed al pie del viewport, detrás del detalle. `test-private-scores-browser.cjs` comprueba posición móvil y recorrido con API fixture aislada; proveedor/DB reales siguen pendientes.
- Búsqueda adicional en Library confirma que la matriz v4 vigente mantiene pendiente seleccionar/configurar proveedor de verificación. No se encontró project_id Neon en los documentos consultados. No se crea una base ajena ni se simula prueba de identidad.
- Sin commit de entrega ni despliegue; remoto LAB R143 y Producción permanecen intactos. La terminación integral requiere proveedor real configurado y acceso identificado a DB LAB para integrar y certificar la autorización de endpoints, invitaciones, ACCESOS y compartir LIVE sólo para inscritos.


## R144 · 29 septiembre 2026, 23:03 Guatemala · COMPARTIR LIVE de primer uso

Última orden expresa del propietario 22:35: al tocar COMPARTIR LIVE dar un código, enviarlo y quemarlo al primer uso, como Ronda Particular. Sustituye para esta operación la propuesta de verificación telefónica/aprobación del organizador. No requiere proveedor SMS, cuenta nueva ni intervención del organizador.

- `api/live-share.js`, `api/_lib/live-share.js`: endpoint separado, validación de tarjeta inscrita autenticada, código aleatorio legible 12 caracteres, hash y vencimiento, consumo/sesión en una sentencia, cookie HttpOnly/Secure, permisos de lectura, revocación y límite de intentos. No devuelve claves del escritor o viewerToken heredado; no proxy a Producción. Enlace anterior sin usar puede ser consumido por quien lo abra primero: no se afirma prueba de identidad ni control del teléfono.
- `live-share.js`: diálogo con código, enlace/mensaje preparado para WhatsApp, compartir/copia alternativos, sesión del receptor y limpieza de fragmento; X/Escape y foco conservado. No se afirma entrega del mensaje.
- `live-hub.js`, `live-hub.html`, `private-rounds.js`, `index-grupal.html`, `scores-ui.css`, `service-worker.js`, `middleware.js`: integración en ambas pantallas existentes, destino directo, invitados sin botón, favoritos propios, detalle con evento real, nulos seguros, ayuda fija. Alta/publicación oficial y accesos privados existentes conservados.
- Se retiran los cuatro archivos locales de la propuesta no conectada de verificación por teléfono: personal-access.js, personal-access-lab.sql y sus dos pruebas; historial de esta propuesta en R144 anterior ya no es requisito vigente.
- `test-live-share-postgres.mjs`, `test-live-share-handler.mjs`, `test-live-share-middleware.mjs`, `test-live-share-browser.cjs`, `scripts/live-share-test-server.mjs`, `scripts/build-manual-lab.mjs`, `package.json`: SQL real local, primer consumo único, revocación, ámbito del evento, read-only, límite de intentos, aislamiento, regresión y navegador contra API real/base local aislada. PASS; PGlite de una conexión no sustituye prueba multi-conexión Neon. Build completo PASS, capturas 390×844 revisadas.
- Evidencia versionable en `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R144/`: sólo fixtures de prueba y log de build, sin credenciales reales.
- Pendiente exclusivo de servicio: base LAB aislada identificada/configurada y revisión de deployment real. Health del LAB publicado devuelve 401 ACCESS_REQUIRED; no se pudo comprobar aislamiento. Flag GSC_LIVE_SHARE_LAB_READY deniega antes de DDL hasta verificación. Proveedor telefónico ya no bloquea. Sin commit de entrega, push, despliegue ni escritura remota. Producción y remoto LAB R143 intactos, confirmado por git ls-remote.
- Archivos registrados: `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/MATRIZ_LIVE_CODIGO_UN_SOLO_USO_R144.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_LIVE_018_GOLF_SCORE_CARD_GT_LIVE.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R144/`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `ROADMAP_A_DETALLE.md`, `ROADMAP_OVERALL.md`, `api/_lib/live-share.js`, `api/live-share.js`, `api/live.js`, `index-grupal.html`, `live-hub.html`, `live-hub.js`, `live-share.js`, `middleware.js`, `package.json`, `private-rounds.js`, `scores-ui.css`, `scores-ui.js`, `scripts/build-manual-lab.mjs`, `scripts/live-share-test-server.mjs`, `service-worker.js`, `test-lab-global-operational-audit.mjs`, `test-lab-medal-monitor.mjs`, `test-lab-no-production-proxy.mjs`, `test-lab-r60-production-refresh.mjs`, `test-lab-shortcuts-navigation.mjs`, `test-lab-tournament-navigation.mjs`, `test-live-share-browser.cjs`, `test-live-share-handler.mjs`, `test-live-share-middleware.mjs`, `test-live-share-postgres.mjs`, `test-manual-no-assistant.mjs`, `test-private-scores-browser.cjs`, `test-scores-ui-browser.cjs`, `test-scores-ui.mjs`.

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

## R144 · 30 septiembre 2026, 02:59 Guatemala · publicación LAB y receptor remoto comprobados

Commit de aplicación a75780974ef4a224d809eeeba561051c9d24f808, rama canónica LAB lab-r137-private-round-20260929. 53 blobs y árbol remoto verificados contra los hashes locales. Preview dpl_93nvpxBLYAtRdozUxNMThu8ZRjyr READY. Reconstrucción únicamente del proyecto golf-sc-gt-lab: dpl_7jkGJPX6xJFsLVcw6P4tS3r6a6MS READY, alias https://golf-sc-gt-lab.vercel.app, mismo commit. El canal Vercel Production pertenece exclusivamente a este proyecto LAB; no se desplegó epg-caddy.

PASS navegador Chrome remoto → API publicada → Neon candidato br-small-mouse-av0f24o9: código de torneo consumido, fragmento eliminado, dos jugadores sintéticos visibles, detalle 18 G/N, cierre X y favorito independiente. Consulta independiente en Neon confirma una sesión para ese código. Ronda Particular en dominio fijo: consumo, tabla con HDCP sin favoritos/categorías, detalle 18 G/N, cierre X y lectura tras recarga sin código PASS. Las capturas corresponden a fixtures sintéticos, no jugadores reales. Único error de consola observado proviene de extensión chrome-extension; no errores de la aplicación observados. Intentos de seleccionar favorito como checkbox y buscar fila privada con etiqueta de torneo fueron fallos de selector de automatización; se corrigieron contra DOM real y los controles pasaron.

Build y regresión locales completos PASS según build-local.log; navegador móvil local con handler real/PGlite PASS según browser-share.log. Consumo concurrente Neon 8 solicitudes/1 sesión PASS previamente registrado. test-live-share-neon.mjs completo no ejecutado por DNS EAI_AGAIN; no se presenta como PASS.

PENDIENTE para certificación integral: escritor oficial, captura/corrección e historial en despliegue remoto con sesión propietaria. El enlace fijo abre access.html y exige correo/contraseña; este navegador no tiene sesión de aplicación. Se mantiene la protección y no se inventan credenciales. Requiere autenticación segura del propietario para continuar ese único bloque. No es cierre integral. Las funciones autenticadas ya tienen regresión local registrada.

Archivos de este registro: `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R144/gsc-r144-remote-detail.jpg`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R144/gsc-r144-stable-private-detail.jpg`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R144/gsc-r144-stable-publication.jpg`, `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_LIVE_R144/ESTADO.md`, `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`.

## R144 · 30 septiembre 2026, 04:29 Guatemala · recuperación tras timeout de autenticación

browserAuth.request no devolvió éxito: herramienta informó timeout tools/call after 300s, duración observada 5215.5275 segundos. No fue posible informar durante la llamada bloqueada; registro de reincidencia OP60 y recuperación inmediata. La pestaña desapareció y una nueva comprobación de https://golf-sc-gt-lab.vercel.app redirigió a access.html, sin sesión propietaria. No certificar escritor remoto. Requiere acceso manual seguro del propietario en navegador; no solicitar contraseñas por chat ni alterar protección.

Vercel conector confirma dominio fijo todavía en dpl_7jkGJPX6xJFsLVcw6P4tS3r6a6MS READY / a757809. Commit de aplicación ya publicado en LAB. La llamada github_create_tree del registro adicional de evidencias fue rechazada: respuesta literal "user rejected MCP tool call"; no es fallo de build y no se reintenta. Guardar punto de recuperación y commit local de evidencias, sin afirmar sincronización remota de este registro.

Archivos adicionales: `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`. Próxima acción indispensable: acceso propietario mediante handoff, seguido de recorrido remoto de captura/corrección/persistencia/historial y emisor LIVE. Las pruebas locales y receptor remoto ya documentados siguen PASS. Estado de cierre integral: BLOQUEADO por autenticación pendiente.

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

Rama de revisión prevista: lab/integral-round-tournament-r146-20260930, basada en remoto a757809. No se actualizará el canal fijo ni la rama canónica de LAB hasta revisión remota. Preparación de Preview no equivale a entrega.

## R147.1 · Compartir código de ronda privada desde Registro · 30 septiembre 2026

Se integra el flujo aprobado en la creación de ronda privada desde Registro. Después de crearla, el código permanece visible; COMPARTIR POR WHATSAPP usa la hoja nativa en iPhone/soporte Web Share, y al cerrarla navega a la Score Card autorizada. Si el usuario cancela, puede reintentar o usar CONTINUAR AL SCORE CARD. Sin soporte nativo, prepara WhatsApp y abre la tarjeta al regresar al navegador. El código se envía en el texto del mensaje con la URL directa a Registro.

Pruebas dirigidas PASS: `test-lab-private-round-share-flow.mjs` (creación, código, compartir, cancelar y continuación); `test-lab-first-open.mjs` (R147 detecta R147.1). Build completo y gates pendientes en este punto de continuidad. Esta prueba automática no acredita envío real por WhatsApp ni revisión física del iPhone. El acceso general sigue abierto; permisos de ronda siguen en API/recurso. Producción intacta.

## R147.2 · compartir LIVE desde Scores · 30 septiembre 2026
Corregida la selección de servicio para rondas privadas heredadas: la presencia global del módulo de eventos personales ya no desvía la operación `COMPARTIR LIVE` a una API que no corresponde. Envío completado cierra el código y el modal de ronda, dejando visible la Score Card; cancelación conserva los cuadros para reintentar. Error se anuncia en la pantalla. Tipografía de la tabla ampliada siguiendo IMG_5435. Pruebas `test-lab-private-rounds.mjs`, `test-lab-code-entry.mjs`, `test-lab-first-open.mjs` PASS; build integral LAB PASS; gates posteriores, Preview y prueba física WhatsApp/iPhone pendientes; Production intacta. La pantalla `CREAR TORNEO` de IMG_5436 muestra “INICIA SESIÓN CON TU CUENTA”; su acción requiere identidad autorizada por recurso y no se rebajó a creación anónima. Revisar con identidad Preview configurada para distinguir acceso ausente de error de API.

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
