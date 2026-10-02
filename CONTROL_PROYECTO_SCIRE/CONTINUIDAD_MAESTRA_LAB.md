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

11:01 Guatemala: banco activo completo scripts/build-manual-lab.mjs PASS, test-project-quality-gate.mjs y scripts/project-quality-gate.mjs PASS. Registro existente, nuevo y validación negativa pasan; Preview corregido pendiente. Fallo físico LAB sigue abierto.


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


## R147.2.4.24 - eliminación autorizada y caducidad - 2 octubre 2026

Orden nueva del propietario: corregir Vercel persistente, no arrastrar códigos al registrar jugadores, retirar rondas/torneos existentes, conservar 24h tras Score18 y permitir eliminación de incompletos por propietario o delegado individual con comprobante. El propietario tiene control pleno; el delegado caduca 24h después del cierre. Especificación y estados verificables: CONTROL_PROYECTO_SCIRE/ACEPTACION_R147_2_4_24.md. Base remota 1d483af; código R24 no publicado todavía. Regresiones dirigidas PASS, integral/navegador/limpieza/publicación PENDIENTES.

Reincidencia: ajuste hosting Off no alcanzaba HTML ya aprobado en caché; ahora el controlador retira script vercel.live antes de servir incluso misma release. Otra causa: código de torneo seleccionaba stream/selección vieja sin ID de ronda; se liga a tarjeta actual. Retención anterior particular era 1h y cron rechazaba GET: control de servidor +24h y limpieza GET autenticada. Control preventivo: test-toolbar-cached-shell.mjs, test-tournament-code-round-binding.mjs, test-event-administration.mjs, test-event-lifecycle.mjs en banco obligatorio. No certificar iPhone por Chromium.

Archivos de esta modificación:
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md` - cambio incremental y control de R24.
- `CONTROL_PROYECTO_SCIRE/ACEPTACION_R147_2_4_24.md` - cambio incremental y control de R24.
- `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md` - cambio incremental y control de R24.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` - cambio incremental y control de R24.
- `CONTROL_PROYECTO_SCIRE/MANUAL_TAREAS_R147_2.md` - cambio incremental y control de R24.
- `CONTROL_PROYECTO_SCIRE/MATRIZ_ACEPTACION_SCORES_R147_2_4_1.md` - cambio incremental y control de R24.
- `MAPA_MAESTRO_DE_ARCHIVOS.md` - cambio incremental y control de R24.
- `ROADMAP_A_DETALLE.md` - cambio incremental y control de R24.
- `ROADMAP_OVERALL.md` - cambio incremental y control de R24.
- `api/_lib/event-administration.js` - cambio incremental y control de R24.
- `api/_lib/event-lifecycle.js` - cambio incremental y control de R24.
- `api/_lib/private-round-lifecycle.js` - cambio incremental y control de R24.
- `api/app-access.js` - cambio incremental y control de R24.
- `api/event-administration.js` - cambio incremental y control de R24.
- `api/live.js` - cambio incremental y control de R24.
- `api/personal-events.js` - cambio incremental y control de R24.
- `auth-gate.js` - cambio incremental y control de R24.
- `event-administration-ui.js` - cambio incremental y control de R24.
- `event-administration.html` - cambio incremental y control de R24.
- `index-grupal.html` - cambio incremental y control de R24.
- `middleware.js` - cambio incremental y control de R24.
- `release.json` - cambio incremental y control de R24.
- `scripts/build-manual-lab.mjs` - cambio incremental y control de R24.
- `service-worker.js` - cambio incremental y control de R24.
- `shortcuts-ui.js` - cambio incremental y control de R24.
- `test-event-administration.mjs` - cambio incremental y control de R24.
- `test-event-lifecycle.mjs` - cambio incremental y control de R24.
- `test-lab-private-lifecycle.mjs` - cambio incremental y control de R24.
- `test-toolbar-cached-shell.mjs` - cambio incremental y control de R24.
- `test-tournament-code-round-binding.mjs` - cambio incremental y control de R24.


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

### Orden final del propietario · 2 octubre 2026, 13:22 Guatemala
Publicación autorizada inmediata de R24-B3; instalación únicamente al pulsar ACTUALIZAR por el propietario. Rondas particulares y torneos incompletos: vencimiento 24h tras último score recibido en servidor; sin scores, 24h desde creación. Eventos completos: plazo fijo tras completar 18 hoyos, no reiniciado por correcciones. Creador elimina propios eventos; propietario elimina cualquiera con comprobante. Cron programado sigue PENDIENTE por sesión Vercel no autenticada: no afirmar ejecución. Pantallas anteriores del manual pendientes de renovación visual.

### R24-B4 · revisión física del menú · 2 octubre 2026
B3 commit 5506f37871c2d5717599665868e0761a65508129 publicado READY en ambos dominios; ACTUALIZAR comprobado sin pulsarlo en instalaciones R23. Creación privada QA B3 MENU desde menú y COPIAR CÓDIGO PASS navegador. Creador eliminó su ronda sin scores y se mostró comprobante. Historial guardado y respuesta NO HAY RONDA PREVIA PASS. CREAR TORNEO exige autorización individual PASS navegador. WhatsApp abre protocolo bloqueado por navegador cloud: no prueba física en aplicación móvil.
Correcciones posteriores a la revisión: shortcuts-ui.js elimina dependencia de openRoundTournament para consultas del menú; General, Categorías, Buscar y Favoritos llegan al hub aun sin evento asignado (antes el mensaje quedaba en tarjeta oculta). event-administration.html respeta hidden para permisos exclusivos del propietario. test-lab-shortcuts-navigation.mjs ejecuta siete rutas reales del dispatcher y regresión CSS. Entrega manual B4 diferenciada en release.json, index-grupal.html y service-worker.js; ningún ACTUALIZAR del propietario pulsado. Cron real y login propietario siguen pendientes de autenticación Vercel/aplicación.

B4 compilación rechazó inicialmente la pérdida de sincronización de la tarjeta asignada (test-menu-scorecard-tournament-sync.mjs). Corregido: shortcuts-ui.js conserva publicación oficial y evento de la tarjeta cuando hay acceso; si falta asignación válida, navega al hub visible con la intención General/Categorías/Buscar/Favoritos. La consulta de TORNEOS mantiene directorio independiente. test-lab-shortcuts-navigation.mjs verifica el fallback sin asignación y test-menu-scorecard-tournament-sync.mjs conserva contexto y escritor.


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
