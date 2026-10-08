Warning: truncated output (original token count: 67929)
Total output lines: 1565

## RC-116 · QuickType no insertaba la sugerencia en R192/R193 · 7 OCTUBRE 2026

- El usuario volvió a probar R193 desde el Laboratorio ya actualizado y QuickType continuó sin insertar la palabra.
- Causa raíz: `.new-round-card input` y `.stableford-player-grid input` forzaban `text-transform: uppercase`; WebKit bloquea QuickType en campos con ese estilo.
- R194 elimina sólo esa transformación en nombres de Registro y Stableford. Prueba dirigida `test-r194-ios-quicktype-uppercase-style.mjs` PASS.
- Estado: CORRECCIÓN LOCAL PASS; BUILD/PREVIEW R194 PENDIENTES; FALTA ACEPTACIÓN FÍSICA DE QUICKTYPE; PRODUCCIÓN INTACTA.

## RC-115 · QuickType iPhone sigue sin aplicar la sugerencia al nombre · 7 OCTUBRE 2026

- Reincidencia confirmada en prueba física del usuario sobre la vista previa R192.
- Corrección R193: quitar `inputmode=text` y `autocomplete=name`; guardar el valor al siguiente ciclo tras `beforeinput` de `insertReplacementText`, ya aplicado por WebKit. El handler no reconstruye el input.
- Regresión automatizada: `test-r193-ios-quicktype-replacement.mjs` verifica el orden beforeinput → sustitución → persistencia. Falta nueva aceptación física iPhone.
- Estado: CÓDIGO LOCAL ACTUALIZADO; BUILD/VISTA PREVIA R193 PENDIENTES; PRODUCCIÓN INTACTA.

## RC-114 · TECLADO IPHONE NO APLICABA SUGERENCIAS Y DICTADO NATIVO · 7 OCTUBRE 2026

- Defecto reportado: tocar una palabra sugerida no la aplicaba al nombre de jugador y era necesario completar cada palabra manualmente; también se pidió dictado por el teclado iPhone.
- Causa encontrada: el handler delegado de Registro terminaba en `retu`, y los campos no declaraban explícitamente las capacidades textuales que usa el teclado iOS. El handler tampoco distinguía una sustitución QuickType ni composición activa.
- Corrección R192: completar `return;`, habilitar autocorrección/sugerencias/dictado nativo; persistir el texto recibido y deferir el parseo de frases durante composición. QuickType se conserva literalmente y el parser sólo actúa en frases completas autorizadas.
- Control permanente: `test-r192-ios-keyboard-entry.mjs`; el build de LAB compila todos los scripts inline. La aceptación real de QuickType/dictado requiere un iPhone físico, no se sustituye por Chromium.
- Estado: CORRECCIÓN AUTOMÁTICA PASS; IPHONE FÍSICO/DEPLOYMENT PENDIENTES; PRODUCCIÓN INTACTA.

## RC-106 · CANDIDATO ABIERTO BORRÓ LA INVITACIÓN DE 24 H Y REACTIVÓ LA PUERTA AL RESTAURARLA · 30 SEPTIEMBRE 2026

- Defecto expuesto: la corrección de entrada libre afirmó haber retirado la invitación de 24 horas; al restaurarla reapareció en `index-grupal.html` la carga de `auth-gate.js`, y el vencimiento temporal todavía enviaba al formulario propietario.
- Causa raíz: mezcla de la entrada global con la herramienta de invitación y regresión de archivos completos desde el commit previo, sin probar juntos el arranque raíz y el ciclo de vencimiento.
- Control permanente: `test-r18-owner-guest-24h-access.mjs` recorre `/`, Registro y `/access.html` anónimos, verifica que el módulo de login no se monte en Score Card, conserva emisión/canje/aislamiento/vencimiento de invitación y ejecuta el camino de expiración sin permitir expulsión a login. Las matrices distinguen explícitamente ambos alcances.
- Evidencia: controles dirigidos por ejecutar después de esta corrección; sin despliegue publicado ni verificación física en esta etapa.
- Estado: PRUEBAS DIRIGIDAS PASS; GATES COMPLETOS PENDIENTES; NO PUBLICADO; PRODUCCIÓN INTACTA.

# Registro de reincidencias de calidad

## RC-105 · TORNEO FRIENDS SE CREABA SIN TARJETAS PUBLICADAS · 29 SEPTIEMBRE 2026

- Defecto reportado con capturas: el evento Friends aparecía en TORNEOS, pero al abrir RESULTADOS GENERALES mostraba 0 jugadores y “TODAVÍA NO HAY SCORE CARDS PUBLICADAS”.
- Causa raíz: la unión automática dependía de `join_tournament_by_id`; el entorno LAB puede derivar `/api/live` a un backend anterior que no implementa esa acción. La ronda quedaba sin asociar aunque el torneo se hubiera creado correctamente.
- Punto de escape: la regresión comprobaba la ruta cliente por ID y reintentos, pero no cubría compatibilidad del backend ni verificaba el resultado del torneo después de unir.
- Control permanente: conservar el `joinCode` y usar `join_tournament` si la unión por ID responde acción no soportada/404; incluir la ruta por ID en el allowlist de origen; proteger código, conexión, reintentos y estado de versión en `test-lab-round-create-modal.mjs`.
- Evidencia automática: prueba Friends, navegación y build LAB PASS; revisión publicada de navegador y recorrido real Score→Friends→Score pendientes.
- Estado: CORREGIDO EN CANDIDATO R135; PREVIEW POR ACTUALIZAR Y RECORRIDO E2E PENDIENTES; PRODUCCIÓN INTACTA.

## RC-104 · CLIMA VIVO CONTRA FRANJA CONGELADA EN RONDA CERRADA · 13 SEPTIEMBRE 2026

- Defecto físico: la respuesta universal indicó 27 °C a las 11:30, pero la franja de la misma pantalla conservó 20.7 °C de las 20:00 de una fecha anterior.
- Causa raíz reproducida: `syncActiveCourseWeather()` y `scheduleActiveCourseWeather()` cancelaban toda consulta cuando existía `officiallyClosedAt`.
- Corrección: una instantánea meteorológica viva e informativa actualiza la pantalla y el contexto universal aun con ronda cerrada; la tarjeta oficial cerrada y sus scores no se reescriben.
- Control permanente: `test-r37-closed-round-live-weather.mjs` exige consulta real de la función, reemplazo visual 20.7 → 27 y cero persistencias sobre la ronda cerrada.
- Estado: CORREGIDO LOCALMENTE; PREVIEW, DOS TURNOS EXTERNOS, AUDIO DE NAVEGADOR Y ACTUALIZACIÓN REAL PENDIENTES.

## RC-103 · ENVIAR TARJETA DIGITAL NO ABRÍA WHATSAPP EN IPHONE · 12 SEPTIEMBRE 2026

- Defecto físico: después de finalizar una ronda Universales, el botón visible `ENVIAR TARJETA DIGITAL` no produjo ninguna acción.
- Causa raíz: `shareOfficialArtifactImage()` esperaba la generación asíncrona del PNG antes de ejecutar `navigator.share`; Safari anulaba la activación transitoria del toque. El error se escribía dentro de `artifactActions`, que estaba oculto.
- Punto de escape: el banco anterior verificaba texto, conexión y MIME PNG mediante expresiones estáticas, pero no ejecutaba la secuencia temporal real del toque.
- Control permanente: preparar y almacenar el PNG durante el cierre, invocar `navigator.share` sin espera previa desde el toque y mantener el estado visible fuera del panel oculto.
- Evidencia: `IMG_3615.png`; `test-v397-card-in-out-back-contract.mjs` ejecuta una Tarjeta Universales de cuatro jugadores y exige compartir con activación vigente.
- Estado: CORREGIDO EN CANDIDATO V407-R29; PASS AUTOMÁTICO DIRIGIDO; PREVIEW Y PRUEBA FÍSICA IPHONE PENDIENTES; PRODUCCIÓN SIN CAMBIOS.

## RC-098 · MIDDLEWARE ENTREGÓ ACCESS.HTML COMO SERVICE WORKER Y ATRAPÓ R8 · 09 SEPTIEMBRE 2026

- Defecto físico: el alias LAB instalado mostró V407-R8 y ACTUALIZAR no ejecutó la migración.
- Causa raíz verificada: `/service-worker.js`, `/manifest.webmanifest` y `/manual.webmanifest` eran redirigidos por el control privado y respondían con `access.html` estado 200.
- Control permanente: los tres recursos de arranque atraviesan el middleware; aplicación, datos y escrituras siguen privados. `test-v407-r24c-public-pwa-bootstrap.mjs` bloquea la reincidencia.
- Defecto relacionado: `ACTUALIZADO` fijo cubría `CONTROL MANUAL · UNIVERSALES` durante scroll; el estado inactivo pasa a posición absoluta y una prueba exige conservar fijo sólo el aviso disponible.
- Estado: CORREGIDO LOCALMENTE EN R24D; REVISIÓN PÚBLICA LAB PENDIENTE; MAIN INTACTA.

## RC-097 · Auditoría estática confundida con comprobación real de ACTUALIZAR · 09 SEPTIEMBRE 2026

- Riesgo: declarar revisada una versión porque el código y los bancos automáticos pasan, sin haber migrado una instalación real a través del alias LAB público.
- Causa raíz: no existía evidencia ejecutable que enlazara commit, cuatro deployments READY, mismo alias, mismo perfil persistente, tres toques y capturas antes/después.
- Control permanente: `scripts/lab-update-browser-review.mjs` ejecuta A→B→C→D en Chromium/Playwright persistente y `scripts/lab-update-physical-gate.mjs` valida JSON, SHA-256, identidad y preservación; `test-v407-r24-update-physical-gate.mjs` impide retirar el contrato.
- Terminología: Playwright es `REVISIÓN AUTOMATIZADA EN NAVEGADOR REAL`; la única comprobación física pendiente es micrófono en iPhone.
- Estado: CANDADO INSTALADO; EJECUCIÓN PÚBLICA PENDIENTE; PRODUCTO NO REVISADO; PRODUCCIÓN INTACTA.

## RC-093 · WHATSAPP ELIMINÓ EL TOKEN Y MOSTRÓ ACCESO PROPIETARIO · 09 SEPTIEMBRE 2026

- Defecto físico: Kathy abrió la invitación compartida y recibió `/access.html` sin el token, por lo que apareció el formulario propietario.
- Causa raíz: el token viajaba como parámetro `?invite=` y el recorrido físico de WhatsApp lo eliminó.
- Control permanente: el token viaja dentro de `/invite/<token>`; Vercel reescribe esa ruta a `access.html`, middleware la permite y la página lo canjea por POST.
- Cobertura: prueba negativa exige ruta, rewrite, permiso público y compatibilidad con enlaces anteriores por query/fragmento.
- Estado: CORREGIDO EN CANDIDATO R23A; PRODUCCIÓN R23 PERMANECE INTACTA.

## RC-093 · WHATSAPP OMITÍA TOKEN Y LIVE EXIGÍA SEGUNDA PANTALLA · 09 SEPTIEMBRE 2026

- Defecto físico: la invitada recibía `access.html` sin token utilizable y veía acceso propietario; LIVE desde una tarjeta activa abría un panel intermedio.
- Causa raíz: el token viajaba sólo en fragmento dentro del campo `url` de Web Share y el botón LIVE abría el overlay antes de compartir.
- Control permanente: invitación `?invite=` incluida literalmente en el texto compartido, canje exclusivo por POST y compatibilidad con fragmentos anteriores; LIVE con ronda activa llama directamente `quickShareGroup()`.
- Cobertura: invitación de un uso/24 horas, previsualización GET negativa, grupo completo y cinco modalidades.
- Estado: CORREGIDO EN CANDIDATO V407-R23; pendiente auditoría y publicación.

## RC-092 · LIVE ABRÍA EL MENÚ PÚBLICO DESDE UNA RONDA ACTIVA · 09 SEPTIEMBRE 2026

- Defecto físico: al tocar LIVE desde la Score Card activa, aparecía primero `VER TORNEO LIVE` sin mostrar los controles de esa ronda.
- Causa raíz: `gscLiveLaunch` abría siempre el mismo estado colapsado y no consultaba `currentSnapshot()`.
- Control permanente: toda ronda activa oculta el visor público y despliega directamente sus controles; sin ronda se conserva el Centro LIVE.
- Cobertura: General, Universales, Stableford, Match Play y Four Ball, sin valores particulares de jugador, campo u hoyo.
- Evidencia: `test-v406-r5-simple-tournament-live.mjs` y regresiones V352, V353, V406 categorías, V407 Universales y compartir grupo.
- Estado: CORREGIDO Y PUBLICADO EN V407-R22; auditoría integral 129/129 PASS, Preview y Producción READY. La comprobación dentro de la cuenta propietaria queda reservada al dispositivo autenticado; el acceso externo fue correctamente redirigido a `access.html`.

## RC-091 · SUPPORT PARPADEABA Y NO ABRÍA EN IPHONE/PWA · 09 SEPTIEMBRE 2026

- Defecto físico: SUPPORT no abría el manual y el administrador podía ser sustituido por el shell PWA almacenado.
- Causa raíz: el vínculo volvió a incluir `target="_blank"` y el service worker trataba `/access.html` como navegación de la aplicación.
- Control permanente: SUPPORT usa `/manual.pdf` en la misma pantalla; `/access.html` queda fuera de la navegación PWA; la prueba prohíbe `target="_blank"`.
- Evidencia: `test-v311-live-support-link.mjs`, `test-r18-owner-guest-24h-access.mjs` y verificación HTTPS LAB R21.
- Estado: CORREGIDO EN CANDIDATO V407-R21; MAIN INTACTA.

## RC-090 · ACTUALIZAR DEJABA DE PARPADEAR DESPUÉS DE RECONFIGURAR · 08 SEPTIEMBRE 2026

- Defecto físico: en V407-R12 el control funcionaba una vez después de reconfigurar y luego volvía a `ACTUALIZADO` sin señal visible.
- Causa raíz: `showCurrentBuild()` retiraba la clase `available` y cambiaba la leyenda a `ACTUALIZADO` cuando la versión publicada coincidía con la instalada.
- Control permanente: V407-R14 conserva `ACTUALIZAR` verde, parpadeante, habilitado y con recarga real en cada toque, incluso cuando el release coincide; release y caché avanzan juntos.
- Evidencia: `test-v407-r9-manual-update.mjs`, pruebas V365/V406/V407 y auditoría física de navegador previa a publicación.
- Estado: CORREGIDO EN RAMA `codex/v407-r14-safe-update-cards`; PRODUCCIÓN INTACTA.

## RC-089 · ACTUALIZADO VISIBLE PERO TECLA DESHABILITADA · 08 SEPTIEMBRE 2026

- Defecto físico: R9 cargó la pantalla correcta, pero `ACTUALIZADO` no aceptaba toque.
- Causa raíz: `showCurrentBuild()` asignaba `disabled=true` al estado vigente.
- Control: R10 conserva el aspecto oscuro, mantiene `disabled=false` y cada toque ejecuta la recarga real ya protegida.
- Estado: CORREGIDO EN CANDIDATO R10; REVISIÓN FÍSICA PUBLICADA PENDIENTE; MAIN INTACTA.

## RC-088 · ACTUALIZAR VERDE SIN SUSTITUIR LA PANTALLA · 08 SEPTIEMBRE 2026

- Defecto físico: `IMG_3140(1).jpeg` mostró V407-R8 y `ACTUALIZAR` verde; tocarlo no cargó la pantalla nueva.
- Causa raíz: R8 reutilizó la misma identidad de release para despliegues posteriores y la navegación del botón continuó bajo control del service worker anterior, que devolvía la caché aprobada vieja.
- Control permanente: cada corrección avanza release/caché; R9 inicia vigente como `ACTUALIZADO`, detecta R9 desde R8, guarda la ronda y desregistra worker/cachés de shell antes de recargar el mismo enlace. La activación no promueve ni navega automáticamente.
- Evidencia: `test-v407-r9-manual-update.mjs`, banco integral y revisión física publicada R9 obligatoria.
- Estado: CORREGIDO EN CANDIDATO V407-R9; PREVIEW Y REVISIÓN FÍSICA PENDIENTES; MAIN INTACTA.

## RC-087 · INSTALACIÓN R6 EN DOMINIO HISTÓRICO SIN ACTUALIZAR · 08 SEPTIEMBRE 2026

- Defecto físico: `IMG_3137.jpeg` conserva V407-R6 y `ACTUALIZADO` gris después de publicar R8.
- Causa raíz: el icono instalado usa `golf-sc-gt-lab.vercel.app`, proyecto separado de `epg-caddy.vercel.app`, donde se habían realizado las publicaciones R8.
- Control permanente: `golf-sc-gt-lab.vercel.app` se convierte en espejo sin caché del dominio canónico y entrega desde el mismo origen el HTML y `service-worker.js` vigentes; configuración reproducible en `vercel.legacy-mirror.json`.
- Evidencia: deployment `dpl_DvQz3eDu6DPGkFn9f9t8ZQxkJinh`, estado READY, alias `golf-sc-gt-lab.vercel.app`.
- Estado: CORREGIDO EN PRODUCCIÓN; CONFIRMACIÓN FÍSICA IPHONE R8 PENDIENTE.

## RC-086 · SCROLL IPHONE INTERMITENTE · 08 SEPTIEMBRE 2026

- Defecto físico: el desplazamiento vertical se trababa intermitentemente en la pantalla principal/Registro V407-R6.
- Causa: `recoverInstalledAppScrolling` reescribía estilos de `html`, `body` y overlay durante cada `touchstart`, provocando recálculo de layout en el inicio del gesto; además página y overlay competían como scrollers.
- Control permanente: V407-R7 elimina la mutación por toque, asigna `100dvh` y scroll propio a overlays, mantiene scroll nativo de página y ejecuta `test-v407-r7-ios-scroll.mjs`.
- Evidencia: `IMG_3133.jpeg` y prueba dirigida V407-R7.
- Estado: CORREGIDO EN CANDIDATO; PRODUCCIÓN PENDIENTE DE GATES Y VERIFICACIÓN.

## RC-085 · BARRA DE ESTADO IPHONE SOBRE ENCABEZADO · 08 SEPTIEMBRE 2026

- Defecto físico: la hora, conectividad y batería del iPhone cruzaban logo, ronda, fecha, hora y ACTUALIZADO en la Pantalla Principal.
- Causa: el contenedor móvil no sumaba `safe-area-inset-top`; el bloque derecho permanecía demasiado próximo al borde.
- Control permanente: R4 exige área segura superior, bloque de ronda a −36 px y actualización a 58 px del borde; prueba `test-v407-r1-premium-visual-system.mjs`.
- Evidencia: `IMG_3120(1).png`, `IMG_3121(1).png`, `IMG_3122.png`.
- Estado: CORREGIDO EN CANDIDATO; REVISIÓN FÍSICA PUBLICADA PENDIENTE; PRODUCCIÓN INTACTA.

Este registro conserva defectos que alcanzaron al propietario o bloquearon un cierre. Un estado ABIERTO impide el PASS del rubro afectado.

| ID | Defecto | Causa raíz | Punto de escape | Control permanente | Evidencia | Estado |
| RC-085 | Tarjeta Digital ocultaba sus acciones fuera del ancho visible y permitía accesos flotantes ajenos, incluido INSTALAR APP, sobre la vista | Cabecera `width:max-content` heredada de escritorio, botones móviles en una columna y aislamiento incompleto | El banco anterior sólo exigía scroll de tabla, no visibilidad, simetría ni ausencia de todos los accesos flotantes | Cabecera de ancho contenido, tres acciones iguales, metadatos 2×2 móvil, RONDA CASUAL sin vacío, accesos ajenos ocultos y prueba literal V407 | `PANTALLA-04-ANTES.jpg`; primer Preview R3 rechazado; `test-v407-r1-premium-visual-system.mjs`; `test-v405-registration-clear-final-mobile.mjs` | CORREGIDO LOCAL V407-R3; SEGUNDO PREVIEW Y EVIDENCIA PUBLICADA PENDIENTES |
| RC-084 | Se presentó al propietario como DESPUÉS una captura de escritorio incompleta y diminuta, cuando la revisión solicitada era móvil y por pantalla | Se confundió evidencia técnica de Preview con la composición visual móvil que debía aprobarse | El navegador de revisión usó ancho de escritorio y la captura no incluía el bloque completo | Rechazar capturas con viewport incorrecto; Control Manual usa ahora clases semánticas, retícula móvil verificable y mantiene exclusivamente la paleta original | `IMG_3103.png`, `74361DCC-3133-47F4-9DDA-325A5B6F7643.jpeg`, `test-v407-r1-premium-visual-system.mjs` | CORREGIDO LOCAL; PREVIEW Y EVIDENCIA MÓVIL PENDIENTES |
| RC-083 | Registro y ronda mostraban controles superiores e inferiores con tamaños dispares, quinta acción huérfana, cabecera saturada y poca jerarquía visual | Capas CSS acumuladas por versión sin una retícula final única para todas las pantallas | Las pruebas anteriores verificaban presencia y ausencia de traslapes, pero no proporción, ritmo, simetría ni lenguaje premium | Sistema V407 con tokens únicos, herramientas en una fila, acciones 2×2 más NUEVA RONDA completa, secundarios 3 iguales y comparación física ANTES/DESPUÉS por pantalla | `IMG_3102.png`, `IMG_3103.png`, `test-v407-r1-premium-visual-system.mjs` | CORREGIDO EN CANDIDATO V407-R1; PREVIEW Y APROBACIÓN VISUAL PENDIENTES |
| RC-081 | GENERAL repetía 34 sin identificar el empate, mientras el propietario necesitaba T34 y conservación del salto deportivo posterior | El motor calculaba ranking de competencia correctamente, pero el render exponía sólo el número y ocultaba la condición de empate | Las pruebas validaban el orden y el rango numérico, no la etiqueta visible del empate | Conteo por clave resultado+hoyos, `rankLabel` T para grupos empatados y regresión exacta T34 sobre los 67 jugadores | `IMG_3047.png`; `test-v353-live-hub.mjs` | CORREGIDO LOCAL V406-R22; PREVIEW Y REVISIÓN FÍSICA PENDIENTES |
| RC-082 | Al completar el hoyo 9, la tarjeta avanzó al 10 y calculó IN correctamente pero no cantó el resultado; el mismo riesgo existía al 18 | El estado `announced` se confirmaba antes de comprobar reproducción y ENTER no primaba el audio | La regresión comprobaba el texto generado, no el inicio/reintento del transporte desde el gesto manual | ENTER prima audio; cierre prioriza voz dedicada; si ningún transporte inicia, rearma y persiste `front/back/complete` | `IMG_3053.png`; `test-v406-r23-turn-closure-audio.mjs` | CORREGIDO LOCAL V406-R23; PREVIEW Y REVISIÓN FÍSICA PENDIENTES |
| RC-080 | Compartir la tarjeta LIVE del grupo exigía abrir organización, elegir alcance, marcar autorizaciones, activar y volver a compartir; los botones públicos no usaban un solo nombre | La creación de stream y la hoja nativa estaban separadas y el texto variaba entre COMPARTIR, COMPARTIR GENERAL y COMPARTIR infinito | El banco LIVE verificaba capacidad y privacidad, pero no la ruta directa común desde todas las tarjetas | Botón común `COMPARTIR LIVE` en tarjeta activa y Tarjeta Digital; snapshot incluye todos los jugadores, crea o reutiliza stream de grupo y abre la hoja nativa | `test-v406-r22-share-live.mjs` | CORREGIDO LOCAL V406-R22; PREVIEW Y REVISIÓN FÍSICA PENDIENTES |
| RC-079 | R21 se actualizó sola aunque ACTUALIZAR permaneció apagado; el scroll instalado continuó congelándose intermitentemente | El service worker usaba navegación network-first y reemplazaba el shell antes de la aprobación; R20 sólo restablecía overflow en body/html sin cubrir el scrollingElement ni capas invisibles | La prueba comprobaba diferencia de release, pero no separaba candidato descargado de shell aprobado | Caché aprobada separada, consulta de versión sin promoción y promoción sólo con `app_version` generado por el botón; recuperación de scrollingElement y capas sin puntero | `IMG_3043.png`; reporte físico 07/09/2026; `test-v365-active-round-empty-recovery.mjs` | CORREGIDO LOCAL V406-R22; PREVIEW Y REVISIÓN FÍSICA PENDIENTES |
| RC-078 | S.SENIOR 04, FEMENINA 01 y A 05 persistían en MI TABLERO, pero volvían a enlace no disponible al abrir desde TORNEO GUARDADO | R19 resolvía demo sólo mediante `displayStreams()`, que deja de devolver demo fuera de la URL `demo=1` | La regresión R19 probó el favorito dentro del mismo modo demo, no después de cambiar de contexto | Colección de favoritos combina catálogo demo local y streams visibles, dando prioridad a LIVE; caso exacto cambia a torneo ajeno y conserva S.SENIOR 04 | `IMG_3041.png`; `test-v353-live-hub.mjs` | CORREGIDO LOCAL V406-R21; PREVIEW Y REVISIÓN FÍSICA PENDIENTES |
| RC-077 | La aplicación instalada en iPhone puede abrir congelada como imagen, sin desplazamiento; además el propietario no recibió aviso visible de R19 | Safari/PWA puede restaurar el documento o una capa fija conservando un estado de desplazamiento inválido; el shell anterior permanece hasta que la instalación carga el release nuevo | Las pruebas verificaban contenido, persistencia y controles, pero no recuperación de scroll en `pageshow`, foco y retorno desde segundo plano | Recuperación explícita de `overflow-y`, inercia táctil para capas y eventos `pageshow`/`focus`/`visibilitychange`; caché nueva en cada release | Reporte físico e `IMG_3039.png`, 07/09/2026; `test-v365-active-round-empty-recovery.mjs` | CORREGIDO LOCAL V406-R20; PREVIEW Y REVISIÓN FÍSICA PENDIENTES |
| RC-076 | Elegir un jugador demostrativo no lo agregaba operativamente a MI TABLERO; `S.SENIOR 04` aparecía como enlace no disponible | El agregado guardaba correctamente el favorito, pero `renderFavorites()` resolvía contra `generalStreams`, vacío durante la demostración, en vez de la colección visible `displayStreams()` | R17 sólo comprobó persistencia del arreglo y conservación del panel, no la tarjeta resuelta del jugador elegido en demo | Selección y resolución comparten la misma colección visible; caso exacto `S.SENIOR 04` y prueba negativa contra tarjeta no disponible | `IMG_3034.png`; `test-v353-live-hub.mjs` | CORREGIDO LOCAL V406-R19; PREVIEW Y REVISIÓN FÍSICA PENDIENTES |
| RC-075 | El propietario no encontró `ACTUALIZAR` y no pudo confirmar si su aplicación estaba al día | La Tarjeta Digital Final ocultaba expresamente el control y una instalación anterior podía conservar un shell sin señal visible | R14 verificó el estado encendido/apagado en navegador, pero no exigió presencia en cada pantalla publicada | Control visible permanente en todas las pantallas; oscuro/deshabilitado en release vigente; verde/parpadeante sólo ante release distinto; caché R18 y prueba negativa de ocultamiento | Reporte físico 07/09/2026; `test-v365-active-round-empty-recovery.mjs` | CORREGIDO LOCAL V406-R18; PREVIEW Y REVISIÓN FÍSICA PENDIENTES |
| RC-074 | MI TABLERO aparecía activo, pero la pantalla mostraba JUGADORES EN VIVO y ocultaba los cinco seguidos | El refresco automático llamaba `renderTournamentShelf()` y forzaba General visible/Individual oculto sin sincronizar botones | Las pruebas verificaban que los favoritos se guardaran, pero no que el panel sobreviviera al refresco de tres segundos | Estado `activeMonitor`, cinco jugadores y candado de persistencia visual entre renderizados | IMG_3033.png; `test-v353-live-hub.mjs` | CORREGIDO LOCAL V406-R17; REVISIÓN FÍSICA PENDIENTE |
| RC-073 | General LIVE demo mostró C 08 con HCP 20, Gross 90, Neto 72 y E; otros finalizados repetían 90/72/E con HCP distintos | El demo generaba Neto/resultado por patrón visual independiente del HCP | Las pruebas verificaban cantidad, categorías y layout, pero no la identidad matemática Gross/HCP/Neto/resultado de cada fila | Caso C 08 exacto más barrido de todos los finalizados: Neto=Gross−HCP y resultado=Neto−Par | IMG_3032.png; `test-v406-tournament-categories.mjs` | CORREGIDO LOCAL V406-R16; REVISIÓN FÍSICA PENDIENTE |
| RC-072 | BORRAR TODO en Registro vaciaba el formulario, pero ATRÁS recuperaba JUJUAN/PEDRO/LUIS; la tarjeta ofrecía BORRAR SCORES con otra semántica | Dos acciones de borrado distintas y Registro sin confirmación | La regresión probó recarga en LAB, no el recorrido físico del propietario BORRAR TODO→ATRÁS en su versión instalada | Una sola acción BORRAR TODO en Registro y tarjeta, confirmación obligatoria, CANCELAR sin mutación y regreso a Inicio limpio | IMG_3030.png; reporte físico 07/09/2026 13:55 Guatemala; V405/V287 | CORREGIDO LOCAL V406-R15; PREVIEW Y RECORRIDO FÍSICO PENDIENTES |
| RC-071 | ACTUALIZAR permanecía verde y parpadeando después de cargar el mismo release R13 | El HTML nacía con `.available` y `syncPublishedAppVersion()` forzaba habilitación sin comparar contra `CURRENT_APP_BUILD` | El contrato automático R13 exigía pulso permanente y contradecía el requisito físico del propietario | Estado inicial apagado/deshabilitado; `showMandatoryUpdate()` es la única vía de activación y exige release remoto distinto; prueba negativa V365 y recorrido real posterior al deployment | Navegador LAB R13: antes/después del toque `release=V406-R13`, `animation=gscUpdatePulse`, `disabled=false` | CORREGIDO LOCAL R14; PREVIEW Y REPRUEBA VISUAL PENDIENTES |
| RC-070 | R11 no parpadeó y el iPhone siguió mostrando JUJUAN/PEDRO/LUIS | Se cambió la caché a R11 pero `gscg-release` quedó en R9; el comparador concluyó falsamente que no había actualización | La revisión visual usó una sesión limpia y no migró una ronda persistida desde el release anterior | Release/caché avanzan juntos y ACTUALIZAR permanece habilitado/parpadeante; navegador prueba actualización→ronda persistida→borrado→recarga→Inicio | IMG_3021/3022/3023; V365/V405/V368 | CORREGIDO EN CANDIDATO V406-R13; RECORRIDO VISUAL PUBLICADO PENDIENTE |
| RC-069 | BORRAR TODO vaciaba Registro, pero al cerrar y abrir reaparecía JUJUAN/PEDRO/LUIS en Control Manual | El botón sólo limpiaba `draftPlayers`; la ronda seguía en memoria, claves activas e Historial, y `loadRound()` la recuperaba | V405 prohibía tocar ronda/Historial y nunca ejecutó cerrar→reabrir | Limpiar seis claves, tumba del ID, `blankRound()`, bandera de Inicio y escenario con archivo residual | Captura F3C9BCF6…; V405/V365 | CORREGIDO EN CANDIDATO V406-R11; PREVIEW E IPHONE PENDIENTES |
| RC-068 | Tras restaurar el esquema, el selector aún decía TODAS LAS CATEGORÍAS | El cambio R7 sólo alcanzó el encabezado de la tarjeta, no la opción `all` del HTML | Prueba previa verificaba el rótulo generado, no la opción visible | Cambiar opción a GENERAL y exigir ausencia del texto anterior | test-v406-tournament-categories.mjs | CORREGIDO EN V406-R9 |
| RC-067 | El listado completo de 67 personas desplazó General y categorías, alterando el esquema gráfico aprobado | El requisito de orden alfabético se interpretó como despliegue automático sin consulta | La prueba comprobó cantidad y orden, pero no exigió estado vacío inicial | Restaurar `if(!query)` y añadir prueba negativa que prohíbe resultados individuales sin búsqueda | test-v406-tournament-categories.mjs + navegador móvil | CORREGIDO EN V406-R8; PENDIENTE REPRUEBA FÍSICA IPHONE |
| RC-066 | LIVE mostraba marcas en vez de categoría, no indicaba hoyo actual ni fijaba explícitamente el desempate por avance; el listado de Mi Tablero no quedaba visible en orden alfabético | La vista confiaba en totales recibidos y separaba búsqueda de clasificación | No existían casos −3/6 contra −3/9 ni score de hoyo duplicado | Recalcular desde hoyos únicos; ordenar resultado/mayor avance; mostrar HOYO/FINAL; lista alfabética con categoría coloreada | test-v406-tournament-categories.mjs | CORREGIDO EN V406-R7; PENDIENTE PRUEBA FÍSICA IPHONE |
| RC-065 | TORNEO LIVE simplificado abría el visor vacío y el propietario no podía ver las categorías preparadas | La muestra de 67 jugadores existía sólo dentro del banco automático y no en el flujo visible | V406-R5 comprobaba simplicidad, pero no exigía contenido visible sin enlace | Demostración temporal y de sólo lectura al abrir sin token; caché nueva y pruebas de total/distribución | test-v406-r5-simple-tournament-live.mjs y test-v406-tournament-categories.mjs | CORREGIDO EN V406-R6; PENDIENTE PRUEBA FÍSICA IPHONE |
| RC-064 | Torneo Live mostraba creación, permisos, códigos y enlaces antes de permitir ver jugadores | Un panel mezclaba visitante y organizador | No existía candado de complejidad progresiva | Acceso directo; visor primero; administración y extras colapsados | test-v406-r5-simple-tournament-live.mjs | CORREGIDO EN V406-R5 |
| RC-063 | LIVE, REGLAS, AI ∞ y Support se montaron sobre RONDA EN CURSO en iPhone | Coordenadas fijas independientes sin contenedor común | Las pruebas exigían posición fija y no medían intersección | roundUtilityBar en flujo + LIVE dentro de la barra + prueba negativa | test-v406-r4-mobile-controls.mjs y revisión HTTPS | CORREGIDO EN V406-R4; PENDIENTE VERIFICACIÓN HTTPS |
| RC-058 | La pulsación prolongada sobre una ronda permitía seleccionar texto y mostrar Copiar/Buscar en iPhone | El candado comenzaba en el diálogo, 650 ms después del contacto; la tarjeta subyacente seguía seleccionable | El contrato verificaba el diálogo y sus botones, pero no la fase previa sobre `[data-library-round]` | Bloqueo CSS de selección/callout en la ronda y descendientes + cancelación `selectstart` antes del temporizador; prueba negativa permanente | `test-v398-history-long-press-delete.mjs`, captura `IMG_2946.png` | CORREGIDO EN LAB V404; AUTOMÁTICO PASS; PENDIENTE REPRUEBA FÍSICA IPHONE |
| RC-060 | Comunicación Universal habló con ceceo/acento de España y tardó demasiado | La instrucción Fish decía “pronunciación castellana” y el fallo del proveedor permitía `speechSynthesis` local; techos de 55/45 s | El banco comprobaba proveedor/idioma/velocidad, pero no proscribía ceceo, acento español ni medía límites al 50% | Fish `es-419` natural para Guatemala sin ceceo; bloqueo del respaldo local español; IA 27.5 s, TTS 22.5 s y salida hablada 50% menor | `test-v356-voice-only-cedar-quality.mjs`, `test-v362-physical-voice-recovery.mjs`, medición HTTP Preview | CORREGIDO EN CANDIDATO V402; PENDIENTE APROBACIÓN AUDITIVA IPHONE |
| RC-061 | Comunicación Universal respondió un turno y después mostró `RECONOCIMIENTO DE VOZ NO DISPONIBLE` | El watchdog cerró la captura; Safari emitió `aborted` y `onerror` trató ese cierre interno como fallo externo | V357 probaba transporte, pero no diferenciaba `aborted` durante `browserVoiceStopping` | El aborto interno finaliza limpio y vuelve a verde; abortos externos conservan error | Logs Preview 01:15–01:17 UTC; `test-v357-ios-voice-transport-recovery.mjs`; Intocables | CORREGIDO EN CANDIDATO V403; PENDIENTE CONVERSACIÓN FÍSICA IPHONE |
| RC-062 | La Tarjeta Digital abierta en iPhone mostró controles flotantes montados sobre FINALIZAR/ATRÁS y una tabla de escritorio que desbordó toda la vista | La vista final no activaba aislamiento modal y mantenía `min-width:1500px` en el panel exterior | Los contratos revisaban contenido y acciones, pero no geometría móvil ni interferencia de accesos globales | Estado `gsc-final-card-open`, ocultamiento de seis controles globales, cabecera apilada y scroll horizontal limitado al contenedor de tabla | `IMG_2949.png`; `test-v405-registration-clear-final-mobile.mjs`; inspección móvil 4 modalidades pendiente | CORREGIDO AUTOMÁTICO V405-R2; PENDIENTE PRUEBA FÍSICA IPHONE 4/4 |
| RC-056 | El micrófono de Inicio regresaba a LISTO PARA ESCUCHAR sin abrir | `fireMicActivation()` llamaba una función V378 ausente y lanzaba ReferenceError | Los hashes protegían llamada y bancos, pero no exigían que la función llamada estuviera definida | Definición literal de liberación V378 + prueba de presencia + toque real sin ReferenceError + caché V401 | `test-v355-ios-audio-dictation.mjs`, `test-v397-card-in-out-back-contract.mjs`, navegador LAB | CORREGIDO EN CANDIDATO; PENDIENTE REPRUEBA FÍSICA |
| RC-055 | TARJETA DIGITAL FINAL completa no mostraba FINALIZAR RONDA; después el envío principal preparaba HTML y no PNG | El cierre tenía `hidden` permanente y el envío reutilizaba la ruta documental HTML | El contrato comprobaba textos pero no visibilidad ni MIME físico | FINALIZAR visible antes del cierre; ENVIAR después; botón principal exige `GSCCardFileExport.png()` y `image/png` | `test-v397-card-in-out-back-contract.mjs` + navegador LAB | CORREGIDO EN CANDIDATO; PENDIENTE REPRUEBA FÍSICA 4 MODALIDADES |
|---|---|---|---|---|---|---|
| RC-001 | Se informó avance como si fuera cierre | Se mezcló un candidato temporal con el Manual oficial | Comunicación y ausencia de Gate 0 | Separación obligatoria candidato/oficial/Producción y lógica AND | `MATRIZ_GATE_0_PROYECTO` | CERRADO COMO CONTROL; producto aún sujeto a gate |
| RC-054 | Una Stableford viva reaparecía como Práctica antigua al reabrir la app; al elegir Nueva Ronda Stableford podía reabrir además la Stableford anterior | La clave canónica excluía Stableford y la entrada `sfEmergency` quedaba subordinada a que no existiera ronda recuperable | Faltó ejecutar físicamente ambos ciclos desde `start_url` PWA y desde Nueva Ronda | Clave activa única para cuatro modalidades + prioridad explícita de Stableford + pruebas V365/V400 y `test-stableford-ui.mjs` | Reproducciones físicas LAB | CORREGIDO EN CANDIDATO; PENDIENTE REPRUEBA FÍSICA |
| RC-002 | Matrices obligatorias no quedaron guardadas | Se describieron en conversación, pero no se versionaron | Repositorio y continuidad entre sesiones | AGENTS + matrices humana/JSON + prueba negativa de ausencia | `test-project-quality-gate.mjs` | CORREGIDO EN CANDIDATO |
| RC-003 | 74/74 físico se confundió con cobertura completa | El conteo no evaluaba semántica ni lenguaje infantil | Auditoría del Manual | Gate gráfico, editorial y semántico sobre el mismo artefacto | `manual-editorial-qc.py` | ABIERTO HASTA PASS |
| RC-004 | Banda y separación se revisaron a ojo | El control visual no medía todas las páginas | Hojas Vegas y Manual oficial | Métricas de encabezado, identificación y título en 74 páginas | matriz editorial JSON | ABIERTO HASTA REGENERACIÓN |
| RC-005 | Se citaron 30 turnos/550 secuencias sin evidencia reproducible | Se reutilizó un resultado que no estaba en el repositorio | Informe final | Sólo se citan comandos y salidas presentes; prueba V322 demuestra 24 turnos | `test-v322-real-sustained-caddie.mjs` | CERRADO COMO COMUNICACIÓN |
| RC-006 | Tráfico se trató como pendiente menor | No existe proveedor con ETA, destino validado ni prueba Guatemala | Roadmap y versión operativa | Gate de proveedor vivo; un deep link o búsqueda general no pasan | G0-08 | CERRADO EN PREVIEW V336-MIC `7679424`: El Pulté → Pradera Concepción devolvió 30 min, 0 min de demora y 16.1 km con Google Maps Routes; PRODUCCIÓN INTACTA |
| RC-007 | Voz automática se tomó como aprobación física | No hubo iPhone real con acento, ruido e interrupción | Cierre operativo | Gate físico obligatorio separado del banco automático | G0-06 | ABIERTO |
| RC-008 | Clima vivo parcial se aproximó a cierre | Faltan snapshots, artefactos y medición comparativa de campo | Cierre operativo | Gate físico/artefactos separado | G0-09 | ABIERTO |
| RC-009 | Se trasladó al propietario la búsqueda de matrices y accesos | Se reportó el bloqueo sin asumir control documental | Comunicación | El equipo mantiene matrices y sólo pide un acceso concreto cuando una integración externa lo exige | AGENTS y Gate 0 | CERRADO COMO RESPONSABILIDAD |
| RC-010 | El Manual llegó al propietario con páginas saturadas arriba, vacías abajo, orden didáctico incorrecto y funciones desplazadas | El control editorial sólo auditaba un subconjunto de 15 páginas y el equilibrio vertical sólo se medía en las siete páginas de campos; además, los overrides podían reemplazar contenido sin demostrar cobertura total | QA del Manual y comunicación de PASS | Fuente canónica única para páginas 17–73; cuatro pasos fijos; error, recuperación, glosario, separación del score y ejemplo obligatorios; medición visual de ocupación completa y contenido inferior en las 57 páginas; pruebas semánticas, de búsqueda y de voz sobre el mismo candidato | `manual-editorial-qc.py`, `manual-visual-qc.py`, `test-v311-manual-semantic-coverage.mjs`, `test-v311-manual-search.mjs`, `test-v311-manual-voice-map.mjs` | CERRADO EN PREVIEW V334-M1-R7 `1fdf5a1`: 89 paquetes, anclas 17/20/22/60/73, lupa y PDF verificados; PRODUCCIÓN INTACTA |
| RC-011 | Una pregunta profunda con “140 yardas” fue respondida por el atajo local de información del campo y nunca llegó a AI UNIVERSAL | El enrutador aceptaba cualquier coincidencia léxica del parser de comandos, incluso dentro de análisis, comparaciones y solicitudes de consejo | Panel AI UNIVERSAL en Preview V335-AI | Las órdenes ejecutables y consultas locales cortas permanecen locales; análisis, explicación, comparación, riesgo, estrategia y recomendación fuerzan el modelo aunque contengan vocabulario de la tarjeta | `test-v335-response-caliber.mjs` + consulta real de Preview | CERRADO EN PREVIEW V335-AI-R1 `bbaad84`: respuesta real con conclusión, mecanismo, riesgos, supuestos y cinco acciones; PRODUCCIÓN INTACTA |
| RC-012 | El clima por texto tardó cerca de 56 segundos, mezcló la lectura de la app con cinco sitios web y no entregó porcentajes horarios verificables | AI UNIVERSAL tenía búsqueda web y tráfico estructurado, pero no estaba conectado al proveedor meteorológico que ya usaban la tarjeta y la voz | Panel AI UNIVERSAL en Preview V336-MIC | Texto y voz usan `api/weather.js` y Open-Meteo; el texto recibe coordenadas públicas del campo, hora pico, ventanas y porcentajes; la búsqueda web queda excluida para clima | `test-v337-universal-weather.mjs` + consulta real de Preview | CERRADO EN PREVIEW V337-WEATHER-R2 `6a2f845`: día completo, 24 porcentajes horarios, pico 99% a las 16:00, temperatura, sensación, viento y acción; PRODUCCIÓN INTACTA |
| RC-013 | La misma consulta meteorológica aprobada falló al repetirse porque AI UNIVERSAL recibió HTTP 429 antes de llamar a Open-Meteo | La ruta explícita de clima todavía dependía del modelo para decidir una herramienta determinista | Panel AI UNIVERSAL en Preview V338-RULES-GATE | Las consultas explícitas de clima se resuelven directamente con `api/weather.js`; no consumen modelo, búsqueda web ni cuota de IA | `test-v337-universal-weather.mjs` + consulta real de Preview | CERRADO EN PREVIEW V339-WEATHER-DIRECT `8a62824`: ~13 s extremo a extremo, Open-Meteo, 24 horas, pico 99% a las 16:00 y cero dependencia del modelo; PRODUCCIÓN INTACTA |
| RC-014 | El botón `Support` del candidato abría el Manual viejo de Producción en vez del Manual corregido del mismo Preview | La prueba exigía una URL absoluta de Producción y no verificaba aislamiento por entorno | Navegador real del Preview final | `Support` usa `/manual-scg`; prueba negativa prohíbe el dominio absoluto de Producción | `test-v311-live-support-link.mjs` + navegador real | CERRADO EN PREVIEW V340-SUPPORT `43dcb2c`: deployment `dpl_4MAeofErPXWFx5dK5QAEoSvycYLT` READY, mismo dominio, 74 páginas y ancla 20 verificados; PRODUCCIÓN INTACTA |
| RC-015 | Una consulta estratégica de 140 yardas con viento fue respondida como pronóstico meteorológico | El clima directo aceptaba cualquier mención de `viento` sin distinguir intención principal | AI UNIVERSAL en Preview V340-SUPPORT | Frontera negativa de golpe/palo/bandera/lie/estrategia y frase exacta en V335/V337 | `test-v335-response-caliber.mjs`, `test-v337-universal-weather.mjs` | CORREGIDO EN CANDIDATO V341-WEATHER-INTENT; PENDIENTE PREVIEW REAL |
| RC-016 | La consulta estratégica llegó correctamente a AI UNIVERSAL, pero la credencial devolvió `credit_balance_exhausted`; incluso seis intentos del Preview V342 terminaron en 503 | La ruta original dependía de un único saldo externo; reintentar no puede recuperar un crédito agotado | AI UNIVERSAL en Preview V341/V342 | OpenAI directo → Vercel AI Gateway con tres modelos/proveedores → respuesta local sustantiva sólo para estrategia de golf; señal 503 honesta para temas generales si ninguna IA administrada está disponible; telemetría sin contenido | `test-v335-response-caliber.mjs` + consulta estratégica real de Preview | CORREGIDO EN CANDIDATO V343-AI-GATEWAY-FALLBACK; PENDIENTE PREVIEW REAL |
| RC-017 | La consulta explícita El Pulté Golf → Pradera Concepción terminó en 503 aunque Google Maps Routes estaba operativo | El panel dependía de la IA para elegir `get_live_traffic`; el saldo agotado detenía la petición antes de consultar tráfico | AI UNIVERSAL del Preview V343 | Detección y extracción determinista de origen/destino; llamada directa a Routes; respuesta estructurada; GPS y ambigüedad permanecen protegidos | `test-v324-real-traffic.mjs` + consulta literal de Preview | CORREGIDO EN CANDIDATO V344-TRAFFIC-DIRECT; PENDIENTE PREVIEW REAL |
| RC-018 | Golf Score y Manual SCG llegaron al escritorio del iPhone sin un logo reconocible | El Manual usaba como icono una lámina 4096×4096 con 89.3% de píxeles casi blancos al reducirla; Golf Score reutilizaba un nombre antiguo que iOS podía conservar en caché | Instalación física desde Preview; los tests sólo comprobaban existencia y ruta, no densidad visual ni renovación | Iconos RGB dedicados 180/192/512, rutas V345 inmutables y distintas, `sizes` explícito, dos manifiestos independientes y prueba que rechaza más de 55% de blanco en el icono Manual | `test-v345-home-icons.mjs` + Preview `1026a3e` READY | DESPLEGADO EN PREVIEW V345-ICONS; PENDIENTE INSTALACIÓN FÍSICA EN IPHONE |
| RC-019 | En V346-R1 el iPhone mostró el micrófono rojo, pero no mostró ESCUCHANDO junto al botón y la pregunta terminó sin respuesta | La matriz principal apuntaba a setupStatus, colocado después de seis filas manuales; además OpenAI devolvió credit_balance_exhausted y Preview no tenía una credencial de Gateway utilizable | Prueba física de las 07:03 en iPhone; el banco sólo verificaba cadenas de código y no la posición visible ni el fallo real del proveedor | Matriz viva junto al micrófono con ESCUCHANDO/RESPONDIENDO exactos, rojos y parpadeantes; clasificación no reintentable del saldo; telemetría privada del respaldo y prueba negativa permanente | Registros Preview 13:03:09–13:03:27 UTC, captura IMG_2071.png y test-v336-microphone-transport.mjs | ABIERTO: interfaz corregida en V347; respuesta general bloqueada hasta credencial/saldo externo y nueva prueba física |

| RC-020 | En V347 el primer intento de las 07:20 no abrió el micrófono; el segundo sí reconoció la voz, pero la pantalla no acreditó el procesamiento y no hubo respuesta | El respaldo se limitaba a 429/servidor y excluía un fallo local genérico; después de reconocer, la matriz cambiaba a `PROCESANDO…` en vez de `RESPONDIENDO`; el proveedor de respuestas seguía sin saldo | Prueba física del iPhone; el banco verificaba palabras aisladas, no la decisión ante error local ni la transición completa | Todo fallo técnico recuperable intenta el reconocimiento alternativo; permiso y ausencia de dispositivo conservan su diagnóstico; la transición exacta es `ESCUCHANDO` → `RESPONDIENDO`; eventos privados requested/started/error/start_failed distinguen cada etapa | Registros Preview 13:20:06 y 13:21:38–13:21:53 UTC, captura IMG_2072.png y `test-v336-microphone-transport.mjs` | RECHAZADO EN V348: ABRIÓ Y TRANSCRIBIÓ, PERO EL REGISTRO NO SE APLICÓ Y LA MATRIZ QUEDÓ EN PROCESANDO |

| RC-021 | V348 escuchó dos veces nombres, handicap y marcas, no llenó jugadores y quedó visualmente en `PROCESANDO…` | Una lista repetida producía jugadores duplicados y era rechazada; el dictado rechazado caía indebidamente a AI UNIVERSAL; además `message||state==="processing"?...` tenía precedencia incorrecta y convertía cualquier mensaje en `PROCESANDO…` | Prueba física de las 08:36; los bancos no repetían el mismo listado, no usaban “otro jugador”, no verificaban la frontera registro/pregunta y sólo buscaban cadenas de estado | Deduplificación idéntica, gramática “otro jugador”, clasificador de intención que impide enviar registros fallidos a IA, función pura de texto de matriz y recuperación de locks al volver a tocar | Registros Preview 14:35:53–14:36:13 UTC, capturas IMG_2073.png/IMG_2074.png, `test-v305-registration-guides-parser-truth.mjs` y `test-v336-microphone-transport.mjs` | RECHAZADO EN V349: EL DICTADO DE LAS 08:59 SE DESVIÓ A RESPUESTAS Y NO LLENÓ JUGADORES |

| RC-022 | V349 mostró RESPONDIENDO, dejó las seis filas vacías y terminó en “SERVICIO DE RESPUESTAS SIN SALDO” durante el dictado de jugadores | El respaldo sólo retenía localmente una transcripción si el parser o un clasificador heurístico la reconocían; una variante natural no cubierta podía caer a AI UNIVERSAL. Además, los eventos setup aplicado/rechazado estaban permitidos en servidor pero omitidos del conjunto cliente | Prueba física de las 08:59; los bancos sólo cubrían frases simplificadas, no “hándicap … y marcas …”, ni exigían retorno local incondicional para context=setup | El micrófono de Registro de jugadores es exclusivamente local: éxito aplica filas; cualquier fallo termina allí con instrucción específica y jamás llama a respuestas. teeAt admite conectores naturales; el banco inspecciona el flujo completo y la lista cliente de telemetría | Registros Preview 14:59:03–14:59:15 UTC, capturas IMG_2076.png/IMG_2077.png, `test-v305-registration-guides-parser-truth.mjs` y `test-v336-microphone-transport.mjs` | RECHAZADO EN V350: SAFARI CONVIRTIÓ CATORCE EN XIV Y UNIÓ DOS JUGADORES EN LA FILA 1 |

| RC-023 | V350 registró `JAIME XIV BLANCAS JORGE` con HDCP 6 y Azules en una sola fila | Safari representó “catorce” como el romano `XIV`; el parser de hándicap sólo aceptaba dígitos o palabras españolas, por lo que consumió `XIV BLANCAS JORGE` como parte del nombre y usó el siguiente número válido | Prueba física de las 14:16; el banco cubría 14 numérico y “catorce”, pero no las representaciones romanas reales del reconocimiento de Safari | Parser romano canónico I–LIV limitado exclusivamente al registro de hándicap; reproducción literal `Jaime xiv blancas Jorge seis azules`; prueba negativa conserva `X` fuera del parser numérico global de scores | Registros Preview 20:16:45–20:16:56 UTC, capturas IMG_2082.png/IMG_2083.png/IMG_2084.png y `test-v305-registration-guides-parser-truth.mjs` | CORREGIDO EN CANDIDATO V351; PENDIENTE PREVIEW Y PASS FÍSICO |
| RC-024 | El respaldo Safari reconoció Registro y un hoyo individual, pero no aplicó varios hoyos seguidos y la consulta General no mostró una respuesta visible | El parser no usaba al único jugador activo como jugador implícito ni aceptaba `hoyos` en plural; la respuesta General quedaba dentro del panel AI oculto y dependía de que Safari iniciara síntesis de voz | La regresión repetía el nombre del jugador y comprobaba cadenas aisladas, pero no ejecutaba el caso físico “un jugador + varios hoyos”; tampoco verificaba apertura visible antes de enviar la consulta General | Jugador único implícito, `hoyo/hoyos`, batch local antes de General, apertura automática del panel AI, watchdog de audio y telemetría privada con cantidad aplicada sin transcripción ni nombres | Registros Vercel 13:05:31–13:06:19 UTC, captura `IMG_2141.png`, `test-v354-voice-fallback.mjs` y Preview `dpl_CgqzYpVABY9djJehtFmH5cyFXHdn` READY | DESPLEGADO EN PREVIEW V354; PENDIENTE PASS FÍSICO IPHONE |
| RC-025 | V354 entregó la respuesta General escrita, pero no la habló automáticamente; el dictado azul del teclado colocó nombre, HDCP y marcas completos dentro de NOMBRE | `speechSynthesis` comenzaba después de esperar la consulta y Safari ya había perdido la activación del toque; el intérprete de registro sólo procesaba el micrófono verde de la aplicación | El banco aceptaba “toca repetir” como recuperación y no reproducía el dictado nativo del teclado | Habilitar síntesis durante el toque original; exigir inicio automático posterior; distribuir dentro de NOMBRE sólo una frase con nombre + HDCP 0–54 + marcas válidas | Capturas `IMG_2147.png`/`IMG_2148.png`; `test-v355-ios-audio-dictation.mjs`; Preview `dpl_7AaXsHMV7msb6f2dizQECu3ES55F` READY | DESPLEGADO EN PREVIEW V355; PENDIENTE PASS FÍSICO IPHONE |
| RC-026 | Una consulta pronunciada apareció transcrita y respondida en texto; el respaldo habló con una mujer distinta del locutor aprobado | V354/V355 trataban el respaldo de Safari como chat visible y elegían la primera voz española de `speechSynthesis`, sin sexo ni identidad garantizados | El banco sólo exigía que alguna voz comenzara; no comprobaba modalidad voz-sin-texto ni la matriz `Cedar` 1.15 | Toda consulta originada por micrófono se guarda sólo como contexto no visible; el respaldo genera audio servidor/Gateway con `Cedar` 1.15 y jamás selecciona una voz española genérica; clima hablado usa resumen conciso | Captura `IMG_2160.png`; `test-v356-voice-only-cedar-quality.mjs` | CORREGIDO EN CANDIDATO V356; PENDIENTE PREVIEW Y PASS FÍSICO IPHONE |
| RC-027 | V355 respondió consultas de tráfico y clima de 30 minutos, 1 hora, 3 horas, mañana y próxima semana con datos actuales o rótulo “en vivo” | La corrección temporal existía en una rama separada y no fue incorporada a la línea V355; las regresiones V324/V337 cubrían módulos aislados pero no la ruta determinista integrada | Revisión de continuidad entre versiones y falta de batería obligatoria para cada horizonte | Parser temporal Guatemala, salida futura explícita, selección meteorológica horaria posterior, límite honesto de 16 días y banco permanente que ejecuta todos los horizontes junto con voz V356 | `test-v356-traffic-weather-accuracy.mjs`, `test-v324-real-traffic.mjs`, `test-v337-universal-weather.mjs` | CORREGIDO EN CANDIDATO V356; PENDIENTE PREVIEW, COMPARACIÓN EXTERNA Y CAMPO |
| RC-028 | En V356 el micrófono de Score Card y la comunicación universal no funcionaron en el iPhone | Los seis intentos físicos de Registro/Ronda devolvieron 429 en `/api/session-grupal`; la captura alternativa se iniciaba sólo después de esperar esa sesión, cuando Safari ya había perdido la autorización temporal del toque | Los bancos V354–V356 validaban parsers y audio, pero no exigían que Safari abriera el reconocimiento antes del primer `await` ni protegían la integración de las correcciones R12/R13 provenientes de otra rama | iPhone/iPad abre reconocimiento local dentro del mismo gesto, con captura continua, cinco alternativas, silencio de tres segundos, reinicio natural, dos reintentos de transporte, score local prioritario y AI UNIVERSAL `voiceOnly`; Gate GitHub y AGENTS bloquean nuevas regresiones entre conversaciones | Logs V356 16:43:01–16:45:58 UTC: seis `POST /api/session-grupal 429`; `/api/universal-ai 200`; `test-v357-ios-voice-transport-recovery.mjs` | CORREGIDO EN CANDIDATO V357; PENDIENTE PREVIEW Y PASS FÍSICO IPHONE |
| RC-029 | Al reabrir el acceso principal, la tarjeta activa quedaba oculta detrás de Registro aunque sus datos siguieran guardados | El redirect agrega `inicio=1` y el arranque ejecutaba `openNewRoundDraft()` sin comprobar `round.configured` | Los bancos de micrófono protegían captura/escritura, pero no el montaje visible de la ronda persistida al reabrir | La ronda configurada tiene prioridad; Registro sólo abre automáticamente sin ronda o por toque explícito en `NUEVA RONDA` | `test-v358-active-round-reopen.mjs` + Preview + prueba física de reapertura | CORREGIDO EN CANDIDATO V358; PENDIENTE PASS FÍSICO IPHONE |
| RC-030 | V358 escuchó dos tandas en la ronda de Jaime y Gustavo, pero rechazó ambas y dejó todos los scores en blanco | Safari entregó la transcripción; el parser estricto no admitía formas naturales como `hoyo número`, `golpes`, `tiró` ni el hoyo pronunciado al final | La prueba V357 simulaba una frase canónica y no las variantes físicas registradas a las 17:33 UTC | Integrar el escritor progresivo de la rama sincronizada y ampliar únicamente vocabulario seguro; reubicar un hoyo final sólo cuando todas las entradas pertenecen inequívocamente al mismo bloque | Captura `IMG_2165.png`; eventos `transcript_ready`, `round_rejected`, `score_rejected`; `test-v357-synchronized-progressive-voice.mjs`; `test-v359-ios-score-parser-recovery.mjs` | V358 RECHAZADA; INTEGRADO EN CANDIDATO V360; PENDIENTE `score_applied` FÍSICO IPHONE |
| RC-031 | La integración V360 podía dibujar un score progresivo sin ejecutar inmediatamente el guardado explícito y el respaldo local podía elegir la voz antes de que iOS terminara de cargar su catálogo; además, un 429/503 de Cedar podía repetirse en cada respuesta | El escritor progresivo dependía del guardado indirecto del flujo normal; `speechSynthesis.getVoices()` se consultaba una sola vez; no existía circuito temporal para una indisponibilidad confirmada del TTS servidor | Los bancos paralelos comprobaban parser y render por separado, pero no exigían persistencia por cada resultado intermedio, catálogo masculino tardío ni corte de reintentos Cedar | Unificar V360 en V361; después de cada score válido ejecutar `persist()` y `render()` sin cerrar la escucha; esperar `voiceschanged` hasta 1.6 s y aceptar sólo nombres masculinos aprobados; tras 429/503 usar voz local masculina durante 10 minutos sin volver a bloquear la comunicación | `test-v357-synchronized-progressive-voice.mjs`; `test-v359-ios-score-parser-recovery.mjs`; `test-v361-synchronized-voice.mjs`; auditoría maestra | CORREGIDO EN CANDIDATO V361; PREVIEW Y PASS FÍSICO IPHONE PENDIENTES |
| RC-032 | En la prueba física V358 AI UNIVERSAL escuchó y obtuvo respuesta 200, pero no habló; V361 además perdió el acceso de un toque y el cierre de la primera vuelta podía quedar calculado sin reproducirse | El respaldo Gateway configuraba `openai/gpt-4o-mini-tts`, ausente del catálogo publicado del Gateway; la integración V361 sustituyó el manejador `pointerdown`; el flujo progresivo encolaba el cierre sin consumirlo; no existía límite si Safari arrancaba sin primer resultado | Los bancos simulaban una respuesta Gateway exitosa para el mismo modelo inválido y revisaban progreso/persistencia, pero no modelo realmente disponible, regresión del gesto, consumo de cierre ni arranque sin resultado | Cedar directo permanece primero; respaldo Gateway `openai/tts-1-hd` con Onyx masculino y cabecera de voz; AI ∞ abre→habilita audio→escucha en el mismo toque; watchdog de 18 s; el sello progresivo consume y habla cierres de hoyos 9/18, con TTS servidor si Realtime falla | Logs físicos V358 18:09:08–18:09:20 UTC (`transcript_ready`, `/api/universal-ai 200`, `/api/voice-speech 503`, Cedar 429); capturas `IMG_2169.png`/`IMG_2170.png`; `test-v358-ios-score-universal-physical-recovery.mjs`; `test-v362-physical-voice-recovery.mjs` | CORREGIDO EN CANDIDATO V362; PREVIEW Y PASS FÍSICO IPHONE PENDIENTES |
| RC-033 | Cerrar y reabrir el enlace podía mostrar una ronda vacía aunque el usuario no hubiera iniciado una nueva | La última ronda estaba duplicada entre claves por modalidad y la selección por fecha no era una identidad canónica de ronda activa | La regresión V358 protegía la apertura visual, pero no exigía una clave única transversal a General, Match Play y Four Ball | `ACTIVE_ROUND_KEY` se escribe tras cada persistencia válida y se lee antes de claves heredadas; una ronda vacía o Stableford no puede reemplazarla; sólo la confirmación `INICIAR RONDA` crea la sustituta | `Intocables/intocables-gate.mjs`; `test-v260-round-points-player-return.mjs`; `test-v363-intocables-behavior.mjs` | CORREGIDO EN CANDIDATO V363; PREVIEW Y REAPERTURA FÍSICA PENDIENTES |
| RC-034 | Match Play llegó al hoyo 9 sin comunicar inequívocamente “Jaime arriba / Gustavo abajo” y existía riesgo de alterar los reportes normales | El cierre de modalidades compartía infraestructura y no había un candado específico que probara nombre + posición Match sin preservar explícitamente el motor Normal | Se verificaba que existiera un cierre, pero no la frase Match exacta ni la frontera negativa de Ronda Normal | Match Play arma `nombre, posición` desde `segmentStanding.position`; Ronda Normal continúa por `baseClosureSpeechIfDue()` y su reporte Gross/Neto/par; carpeta `Intocables` bloquea cualquier regresión | `Intocables/intocables-gate.mjs`; `test-v363-intocables-behavior.mjs` | CORREGIDO EN CANDIDATO V363; AUDIO FÍSICO IPHONE PENDIENTE |
| RC-035 | Las capturas físicas mostraron LIVE dentro de la barra de estado, lanzadores e instalación sobre el Registro y micrófono visualmente detenido en `ESCUCHANDO` | LIVE anulaba el safe area con `padding:0`; los controles globales y la instalación eran fijos sin estado modal; el watchdog dependía de que Safari emitiera `onend` después de `stop()` | V362 comprobaba cadenas y rutas de código, pero no ejecutaba `stop()` sin `onend` ni tomaba las superposiciones físicas como regresión bloqueante | Safe areas con `env()`, aislamiento `gsc-setup-open`/`gsc-live-open`, instalación bloqueada en modal y guard independiente de 1.2 s; banco ejecutable sin `onend` y evidencia física inventariada | `test-v363-recorded-mobile-behavior.mjs`; `V363_PRUEBAS_COMPORTAMIENTO/REPORTE_PRUEBAS_COMPORTAMIENTO_V363_RC035.md`; MP4 y dos capturas SHA-256 | CORREGIDO EN CANDIDATO V363 Y PASS AUTOMÁTICO; PREVIEW Y REPETICIÓN FÍSICA IPHONE PENDIENTES |
| RC-036 | Producción V363 sirvió la tarjeta con HTTP 200, pero `/api/universal-ai` devolvió 503 `UNIVERSAL_AI_CREDIT_EXHAUSTED` y nunca intentó Vercel AI Gateway; los dos primeros Preview OIDC recuperaron texto 3/3 pero voz devolvió 400 | El respaldo sólo leía `AI_GATEWAY_API_KEY` o `VERCEL_OIDC_TOKEN`; la función no solicitaba dinámicamente el token OIDC administrado; la petición de voz omitía primero Speech V4 y luego todavía omitía el protocolo de transporte y método de autenticación Gateway | El banco simulaba un token ya entregado y no exigía resolver OIDC dentro de la función desplegada ni comprobaba las tres cabeceras obligatorias | Resolver OIDC con `@vercel/oidc` después de `credit_balance_exhausted`; reutilizarlo para voz; enviar Speech V4, protocolo Gateway `0.0.1` y método `oidc`/`api-key`; preservar secretos y validar salto dire…37929 tokens truncated…reinicializa un formulario ya abierto, impide doble envío y muestra código aunque sync no encuentre el evento. El nombre lleno pero validado vacío de IMG_5651 no ha sido reproducido exactamente en iPhone; no se declara causa definitiva del dispositivo.

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

R24-B5 · 15:53 Guatemala: segundo Preview ad0f947 reprodujo pérdida del borrador incompleto al regresar y error400 de torneo autorizado. persistDraftState guardaba sólo draftPlayers completos; ahora guarda/restaura manualRows sin fabricar handicap/categoría/marcas ni asignarlos al evento. La copia de petición interna ahora preserva method y headers heredados de IncomingMessage además de la identidad validada. Regresión usa headers heredados y proveedor con otra identidad. Preview final pendiente; no promoción de un candidato con FAIL.

Orden16:09: SCORES MI GRUPO debe abrir18 scores al doble clic. Prueba8666516 detectó botón buscando evento privado desde tarjeta de torneo y mensaje oculto: nueva vista del grupo actual toma snapshot del escritor oficial, conserva asignación y enlaza detalle18 mediante GSCScoresUI.bindRows. Torneo creado por OK código F3FGF4DXZ8; grupo sin permiso código SS8ESQXKEA; copiar verificado pegando; regreso preserva registro incompleto y tarjeta Gross5/Net4. Preview final de Scores pendiente.

### R24-B5 · verificación final de creación y detalle · 2 octubre 2026 16:20 Guatemala
Orden16:13: doble clic/doble toque abre los18 hoyos por jugador en Mi Grupo, Torneos, General, Favoritos y Categorías. Preview ca145942 READY dpl_9RR69PCfmqKeMiAEDecM7Foty6qM. Navegador Chrome real: Registro completo QA GRUPO18 HOYOS/Senior/HCP14/Blancas → OK → revisar → iniciar → teclado5 → SCORES MI GRUPO → dobleclic: tablas1–9/10–18, Gross5/Neto4, cierre conserva tarjeta. General del torneo F3FGF4DXZ8: acceso por código y dobleclic18 PASS; CategoríaSenior dobleclic18 PASS; favorito★ → MIS FAVORITOS → dobleclic18 PASS. Creación particular sin permiso SS8ESQXKEA y torneo autorizado F3FGF4DXZ8 ya comprobadas en8666516; copia pegada y continuidad del borrador comprobadas. Banco integral final build-manual-lab PASS, sin cambios funcionales posteriores. No se declara prueba física de iPhone, WhatsApp enviado ni totalidad de botones. Actualización del dispositivo sigue manual. Entrega de este árbol a LAB/Producción autorizada previamente; estado de despliegue se comprobará tras mover referencias.

### R24-B6 · 2026-10-02 16:28 Guatemala · principal MI GRUPO
IMG_5656 confirmó etiqueta GRUPO PARTICULAR incorrecta en registrationJoinRound. Se corrige a MI GRUPO; destino de ingreso por código permanece. CREAR MI GRUPO y SCORES MI GRUPO ya estaban operativos. Error escapó por verificar creación y scores sin exigir nombre exacto de modalidad; test-r24-event-creation-feedback.mjs exige ahora MI GRUPO en ese botón. Archivos: index-grupal.html, test-r24-event-creation-feedback.mjs, release.json, service-worker.js; B6 permite actualización manual después de B5. Sin cambio de motor, datos ni autorización. Rollback8a05fd1.

Orden16:29: fecha automática Guatemala, sin calendario. live-hub.html hubRoundDate y personal-events.js personalRoundDate pasan a texto readonly; mantienen valor automático actual. No nueva pantalla ni selección de fecha al crear.


## R24-B9 · fallos escapados de cursor, selección y descubrimiento de eliminación
Causa raíz: reset de hoyo visible sin reset del cursor/identidad del teclado; CSS no incluía botones de directorio ni touch-callout; eliminación limitada a gesto largo/administración separada. Escape: prueba anterior sólo validaba preferredManualHole, sin estado previo del teclado. Control permanente: VM con cursor5 de ronda anterior y misma identidadp1, comprobación del reset y sincronización visible/escritor; CSS compartida conserva campos editables; accesos explícitos de eliminación reutilizan autorización y diálogo existente. Evidencia automatizada B9 PASS dirigida; integral y navegador pendientes. Datos históricos no desplazados automáticamente; recuperación específica pendiente.


## R150 · 2 octubre 2026 · Scores juntos e ingreso al grupo por código
Orden IMG_5666: SCORES MI GRUPO y SCORES TORNEO en la primera fila, uno a la par del otro; abajo INGRESAR A / GRUPO en dos líneas. Mantiene el directorio de grupos y la vinculación de la tarjeta comenzada. Seleccionar un grupo siempre solicita su código, también al creador: no rellena ni salta el campo con un código guardado. La API existente valida código y evento seleccionado antes de asignar; no cambia permisos ni motor de scores. Regresión ejecuta selección, código incorrecto y válido, visitante/creador, sin alterar scores/reloj. Causa del desvío visual: botón agregado antes de los dos Scores en grid de dos columnas. Control permanente: orden DOM probado y geometría revisada en navegador real. Base/rollback 7ffe48952ed88625f16fe57709138ba77266d5ac. Banco integral y navegador del despliegue nuevo pendientes al registrar.


## R151 · 2 octubre 2026 · reingreso por código con escritor ya vinculado
Navegador LAB R150: código incorrecto se rechazó correctamente; código válido en el mismo grupo perdió la vinculación de publicación y mostró error. Causa: join-code limpiaba stream_id aunque roster/grupo fueran iguales y cliente reutilizaba conexión cacheada sin volver a enlazar. Corrección: conserva stream_id solamente para roster/grupo exactos; grupo distinto obliga nueva vinculación. Ingreso explícito marca connected:false y fuerza revalidación/enlace autenticado por el escritor existente antes de publicar. No amplía permisos ni borra scores. Pruebas SQL de reingreso y cambio de grupo; VM de conexión cacheada y reingreso explícito. Rollback c3ddc3b86e1008fd5593b886996c40d1844cc7d1. La entrega R150 pasó ACTUALIZAR en navegador LAB conservando Gross9/Neto7/hoyo3; IMG_5667 del propietario permanece R147.2.4.24 pese a aviso ACTUALIZADO, no se declara actualización de su dispositivo. Enlace manual directo de recuperación entregado. Banco y reingreso real R151 pendientes al registrar.


## R152 · formulario intermedio no solicitado · IMG_5672

Causa: eliminación exigía transcribir nombre y motivo en UI pese a pedido de operación simple. Escape: formulario administrativo no contrastado con flujo solicitado. Control: una confirmación que identifica evento y botón ELIMINAR; nombre/motivo internos conservan contrato y comprobante. Prueba VM exige cero inputs, cero solicitudes al abrir y una solicitud al confirmar; permiso de API sigue obligatorio. No se elimina Santa Delfina ni datos del propietario durante pruebas.


## R153 · reportes residuales en administración · IMG_5673

Causa: el listado de comprobantes permanecía visible tras simplificar eliminación. Pedido: retirar todos de pantalla. Corrección: quitar sección HTML y renderizado de recibos, conservando únicamente eventos disponibles y la confirmación simple. Control: revisión de la página real sin COMPROBANTES DE ELIMINACIÓN ni RONDA ELIMINADA; API administrativa existente conserva permisos.


## R154 · Scores torneo: directorio activo y títulos · 2 de octubre de 2026

Pedido IMG_5675: SCORES TORNEO muestra exclusivamente todos los torneos en curso del directorio del servidor; sin crear, ingresar, gestionar o grupos particulares. Vacío exacto NINGÚN TORNEO EN CURSO. Selección abre Scores torneo y sus opciones SCORES GENERAL, SCORES POR CATEGORÍA y MIS FAVORITOS. Los títulos elegidos persisten después de refrescar scores. SCORES MI GRUPO conserva su título en la apertura y los refrescos. Botón de la tarjeta abre el directorio incluso sin torneo asociado; el retorno conserva tarjeta/cuenta. API activeOnly filtra finalizados sin cambiar el directorio usado por otros flujos ni los permisos del servidor. Pruebas dirigidas: ocho torneos sin límite local de cinco; exclusión de finalizado; mensaje vacío; títulos y retorno. IMG_5676 confirma disposición R150 de los dos Scores juntos y entrada al grupo debajo, sin nueva orden de modificación. Rollback R153 bb60704a2b650ac592e08fad963a57f9b2d96754. Entrega autorizada a producción, LAB estable y origen instalado obligatorio de la matriz; no afirmar prueba física de iPhone.
- `api/personal-events.js` · modificación o control R154.
- `live-hub.js` · modificación o control R154.
- `live-hub.html` · modificación o control R154.
- `index-grupal.html` · modificación o control R154.
- `private-rounds.js` · modificación o control R154.
- `scores-ui.js` · modificación o control R154.
- `shortcuts-ui.js` · modificación o control R154.
- `release.json` · modificación o control R154.
- `service-worker.js` · modificación o control R154.
- `test-event-directory-code.mjs` · modificación o control R154.
- `test-lab-tournament-navigation.mjs` · modificación o control R154.
- `test-menu-scorecard-tournament-sync.mjs` · modificación o control R154.
- `ROADMAP_OVERALL.md` · modificación o control R154.
- `ROADMAP_A_DETALLE.md` · modificación o control R154.
- `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md` · modificación o control R154.
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` · modificación o control R154.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` · modificación o control R154.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md` · modificación o control R154.
- `test-lab-registration-private-rounds-entry.mjs` · prueba de separación de grupos y directorio de torneos R154.
- `scripts/manual-screen-parity-gate.mjs` · nombre RONDAS GUARDADAS alineado con opción del menú; paridad operativa conservada R154.

Ampliación expresa 20:01: BUSCAR JUGADOR se retira del menú principal y se muestra junto a General/Categorías/Favoritos en el torneo seleccionado. Su título BUSCAR JUGADOR persiste. CREAR TORNEO es exclusivamente la acción y el diálogo de creación; ningún título de Scores usa esa etiqueta. Pruebas y contratos de menú actualizados: `test-lab-shortcuts-navigation.mjs`, `test-lab-global-operational-audit.mjs`.


## R155 · comprobación visible de Buscar jugador en torneo · 2 de octubre de 2026

Recorrido real R154 detectó regla heredada en scores-ui.css que ocultaba hubShowIndividual aun después de retirar la regla HTML. Se retira esa regla; Buscar jugador se muestra entre opciones de torneo seleccionado, permanece fuera del menú principal. Scores Torneo vacío comprobado en origen instalado sin Crear torneo, Grupos particulares u opciones ajenas. General/Categorías/Favoritos/Búsqueda se revisan en demo identificado; no se afirma prueba física iPhone ni torneo de usuario inexistente. Selección de texto bloqueada por CSS en títulos/botones y campos de entrada conservados. Actualización LAB estable comprobada con tarjeta QA R148 scores hoyos1/2 preservados. Rollback R154 aa0f1f39a6c51d7640bb2c5e7d433e44ff919c7e. Publicación autorizada en los tres destinos de matriz.
- `scores-ui.css` · modificación o control R155.
- `release.json` · modificación o control R155.
- `service-worker.js` · modificación o control R155.
- `index-grupal.html` · modificación o control R155.
- `ROADMAP_OVERALL.md` · modificación o control R155.
- `ROADMAP_A_DETALLE.md` · modificación o control R155.
- `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md` · modificación o control R155.
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` · modificación o control R155.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md` · modificación o control R155.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` · modificación o control R155.
- `test-lab-tournament-navigation.mjs` · modificación o control R155.


### R155 · pertenencia real y salida de grupo
Sin pertenencia real: **NO PERTENECES A NINGÚN GRUPO**. La tarjeta individual no se presenta como grupo. **SALIR DEL GRUPO** junto a **INGRESAR A GRUPO** desvincula únicamente el stream propio y su roster, conserva jugadores, scores y temporizador, y permite volver a entrar con código. API niega salida de otra cuenta y conserva administración del creador. Pruebas VM y base real: PASS.
- `api/personal-events.js` · modificación y prueba R155.
- `api/live.js` · modificación y prueba R155.
- `live-control.js` · modificación y prueba R155.
- `private-rounds.js` · modificación y prueba R155.
- `test-r24-event-creation-feedback.mjs` · modificación y prueba R155.
- `test-event-directory-code.mjs` · modificación y prueba R155.
- `test-r155-private-group-exit.mjs` · modificación y prueba R155.
- `scripts/build-manual-lab.mjs` · modificación y prueba R155.


## R156 · enlace duplicado y contexto perdido; administración recargada
Causa comprobada: compartir incluía URL en text y url; URL inicio=1 no llevaba evento/código. Creación duplicada fuera de Organizador; permisos administrativos visibles mezclados con operación básica. Escape: prueba anterior exigía URL genérica y no simulaba receptor; no contrastaba las pantallas administrativas con uso simple. Control permanente: test-r156-tournament-invitation.mjs y banco completo; nombre remoto/identidad estable, validación de código, negativos de rol, no mutación de scores/reloj; controles de administración cerrados. PASS automático local; navegador y publicación pendientes. Se identificó y leyó IMG_5688/5689 al estar disponibles, sin afirmar revisión anterior.


### R156 · cierre local y bloqueo de entrega
Revisión automática rechazó git push de fix/r156-tournament-invitation al repositorio canónico. No se ha eludido por otro transporte. Preview/navegador público pendientes y Producción sin promoción. Falta autorización explícita del propietario para subir esta rama. La descarga local de Chromium falló como ZIP incompleto; no prueba de navegador ni iPhone.
- `test-tournament-code-round-binding.mjs` · exige ocultar la superficie histórica de código de torneo en tarjeta, también al creador; Organizador conserva compartir, grupos privados conservan contrato.


### R156 · autorización de subida · 2 octubre 2026 21:23 Guatemala
El propietario autorizó explícitamente la subida. El conector GitHub confirmó propietario EPGCADDY, mismo ID de la cuenta conectada, permisos admin/push en EPGCADDY/EPG-CADDY. Se levanta el bloqueo de autorización; Preview y navegador siguen pendientes, sin promoción de Producción.

## R156 · validación real detectó confirmación redundante después del código
Causa: openAssignedPersonalScoreCard reutilizaba Registro tras validar jugadores, forzando otro OK. Escape: VM de join sólo comprobaba callback y destino, sin último estado de interfaz. Detectado internamente por Chrome con torneo de prueba. Control permanente: regresión de confirmación con membresía real simulada y verificación de pantalla REVISAR ANTES DE EMPEZAR; escritor oficial INICIAR RONDA conservado. Ajuste en revisión, Producción intacta.


## R157 · controles y paneles de alturas diferentes
IMG_5690/5691: Organizador sin menú y arriba; ID de torneo con otra X. Causa: regla de 100 px y cierres de glifos/tamaños diversos; botón menú detrás de su overlay. Escape: revisión previa del flujo sin comparar geometría de todas las superficies. Corrección: layout común, toolbar fijo, glifo/tamaño único sin reemplazar eventos. Navegador local detectó además margin de botón heredado en Administración; corregido y comprobado. Control permanente: test-r157-uniform-navigation.mjs y scripts/review-r157-mobile-layout.mjs. 28 casos a 430×932 PASS con fixtures; no 100% físico. El propietario cerró la ampliación y ordenó publicar hasta este alcance.


## R158 · Scores mi grupo y cierres de todas las ramas · 3 octubre 2026
Fuente aprobada: IMG_5695.png, tabla continua NOMBRE / HDCP / HOYO / GROSS / NETO / +/−, título SCORES MI GRUPO, campo/fecha y doble toque para los 18 hoyos. IMG_5694.png documenta el defecto: grupo enviado a dashboard de torneo con título General y secciones ajenas. Corrección incremental: entrada dedicada autorizada, misma lectura privada existente, sin escribir scores ni ronda; todos los streams y páginas heredadas se recorren. Se conserva vacío NO PERTENECES A NINGÚN GRUPO.
Cierres agregados/reparados en directorio, Scores General/Categorías/Buscar/Favoritos, grupo por enlace, detalle18, selección de favoritos, Live, código de invitado y pantalla pública. X arriba izquierda y MENÚ arriba derecha usan estilos comunes incluso en vistas compartidas. Conflictos de especificidad CSS heredada se detectan y bloquean con geometría real en Chromium. Navegador con fixtures identificados, dos anchos móviles, cinco modalidades, 60 jugadores y sin scores; no prueba física iPhone. Candidato y publicación se distinguen en aceptación. Rollback R157 d0ff81d1b65341a097c9e71d6bf668d740293347.
R157 fue publicada: PR47/main y rama instalada d0ff81d1b653; árbol2976ec19df7eff16df55bd0e008ab6383a15511f. Producción, LAB y alias instalado entregaron HTTP200 R157; tres despliegues READY verificados.

Causa raíz: redirección personal/private a live-hub General, retorno oculto en portal/privado y cierre inexistente en Live/código/picker; escape: revisión anterior 28 casos no cubrió ramificaciones de Scores. Control permanente: pruebas de rutas y navegador parametrizado con dos tamaños y todos los cierres localizados.

R158 añade identificación MI GRUPO/TORNEO + nombre en Inicio y Score Card, sólo si pertenece a la tarjeta actual. El selector de favoritos queda fuera del panel oculto; X raíz se oculta mientras detalle/menú/selector utiliza su cierre para evitar interceptar el toque. Sin códigos de invitación en esta identificación.


## R159 · invitación y código en dos mensajes WhatsApp · 3 octubre 2026
Base canónica R158 8c92f66. Sustituye propuesta retirada PR49: el propietario aclaró copia dentro del mensaje WhatsApp y aprobó alternativa de código aislado. Primer mensaje: GOLF SCORE CARD GT + Te han invitado a participar en la ronda de NOMBRE DEL CREADOR. Torneo emplea el torneo de NOMBRE DEL CREADOR. Segundo payload exactamente el código; sin etiqueta, título, URL ni texto adicional. Envíos separados, cada uno bajo toque del propietario, al mismo contacto seleccionado por él en WhatsApp. No automatizar mensajes ni afirmar entrega real al resolverse Web Share. Cancelación conserva origen y reintento; segunda acción bloqueada antes de primera; doble toque no duplica.
Se modifica exclusivamente compartir código de participación de grupos/torneos. Copia preexistente en aplicación conserva sus handlers; Scores LIVE de sólo lectura conserva su contrato independiente. Grupo recoge nombre de creador y lo guarda mediante configuration existente, sin nueva API ni migración. Torneo usa creatorName canónico; eventos antiguos pueden completar nombre al compartir sin inventarlo.
Riesgos: pérdida del segundo mensaje, envío a contactos distintos, cancelación, falta de nombre, portapapeles, estilos heredados. Controles: dos acciones visibles; indicación mismo contacto; payload text únicamente en segundo; sin cierre después del primero; fallback wa.me por cada mensaje; fallos visibles. La herramienta no ve el destinatario que selecciona WhatsApp ni confirma entrega.
Pruebas: test-r159-whatsapp-two-messages.mjs, integración test-lab-private-round-share-flow.mjs y test-r24-event-creation-feedback.mjs PASS; scripts/build-manual-lab.mjs exit0 PASS. Chromium local con mocks explícitos de navigator.share y APIs QA verifica 390/430, payloads exactos, cancelación/reintento, origen conservado, ausencia de overflow/errores y capturas 2160×4320. No prueba física iPhone ni envío WhatsApp real. Primera captura detectó controles sin estilo; corrección scoped en scores-ui.css y nueva revisión antes de candidato.
Rollback R158 por reversión sin borrar datos. Producción/main y LAB instalado permanecen R158; subir rama autorizada por propietario, Preview real y publicación pendientes.

Causa raíz del desvío: se interpretó el toque sobre el código como función web, no del mensaje recibido. Escape: implementación iniciada sin distinguir superficie WhatsApp. PR49 cerrada sin merge/publicación. Control permanente: separar origen, payload, receptor y entrega; test-r159-whatsapp-two-messages.mjs impide código mezclado con invitación y payload URL/title en el segundo mensaje.


## RC-R160 · segundo mensaje omitido y nombre administrativo
Evidencia propietario: IMG_5699, 3 octubre 17:12 Guatemala; sólo invitación recibida. Confirmación expresa: no tocó segundo envío, esperaba ambos automáticamente. Causa: la interfaz dependía de un regreso y segundo toque poco destacados y no conservaba el paso ante recarga. Escape: pruebas validaron dos llamadas explícitas pero no comprensión ni recuperación. Control: instrucción inicial SON DOS ENVÍOS; estado FALTA ENVIAR EL CÓDIGO y foco; recuperación temporal por mismo origen; pruebas de recarga antes/después del primero, repetición, cancelación del segundo, caducidad y cierre. Sin prometer automatización/delivery. La API de compartir exige activación por llamada; cloud no verifica WhatsApp físico. IMG_5697 requiere ADMINISTRAR TORNEOS Y GRUPOS: título y rutas de acceso corregidos, sin modificar autorización/acciones. Estado técnico en validación; recepción real NO VERIFICADA.


## R161 · mensaje único y Scores directos · 3 octubre 2026
Base y rollback R160 main94f33470af4555878d23a1eb555763481d490e45. Orden17:51: un solo mensaje WhatsApp, invitación en primeras líneas, dos líneas en blanco, código únicamente al final. Sustituye dos envíos R159/R160: un share text sin URL/title; cancela/reintenta sin perder origen, bloqueo doble toque, se retira recuperación de segundo envío anterior. No afirma entrega real ni copia con toque dentro de WhatsApp.
Score Card SCORES TORNEO abre evento de la tarjeta actual validando membresía y publicando por escritor oficial; shortcut scores conserva evento exacto y evita portal Family intermedio. Menú SCORES TORNEO conserva directory=1 y selección de otros eventos. Sin código/membresía no accede a datos privados. No cambia motor, voz, permisos, roster o scores.
Aceptación: mensaje exacto una llamada, dos líneas vacías y código final; cancela/error/doble toque; vínculo de tarjeta actual, otros torneos sólo directorio explícito, retorno conserva tarjeta. Pruebas dirigidas y Chromium QA; WhatsApp real/iPhone no verificados. Publicación pendiente del banco y Preview.
- `index-grupal.html` · implementación, prueba o evidencia R161.
- `live-hub.js` · implementación, prueba o evidencia R161.
- `whatsapp-invitations.js` · implementación, prueba o evidencia R161.
- `test-menu-scorecard-tournament-sync.mjs` · implementación, prueba o evidencia R161.
- `test-r159-whatsapp-two-messages.mjs` · implementación, prueba o evidencia R161.
- `test-lab-private-round-share-flow.mjs` · implementación, prueba o evidencia R161.
- `scripts/review-r161.mjs` · implementación, prueba o evidencia R161.
- `release.json` · implementación, prueba o evidencia R161.
- `service-worker.js` · implementación, prueba o evidencia R161.
- `ROADMAP_OVERALL.md` · implementación, prueba o evidencia R161.
- `ROADMAP_A_DETALLE.md` · implementación, prueba o evidencia R161.
- `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md` · implementación, prueba o evidencia R161.
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` · implementación, prueba o evidencia R161.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md` · implementación, prueba o evidencia R161.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` · implementación, prueba o evidencia R161.
- `CONTROL_PROYECTO_SCIRE/ACEPTACION_R161.md` · implementación, prueba o evidencia R161.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R161/evidence.json` · implementación, prueba o evidencia R161.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R161/390-private.png` · implementación, prueba o evidencia R161.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R161/390-tournament.png` · implementación, prueba o evidencia R161.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R161/390-administrar.png` · implementación, prueba o evidencia R161.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R161/430-private.png` · implementación, prueba o evidencia R161.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R161/430-tournament.png` · implementación, prueba o evidencia R161.
- `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R161/430-administrar.png` · implementación, prueba o evidencia R161.

Ampliación17:53: instrucción Copia y pega el código en la pantalla inicial de registro; inmediatamente enlace absoluto del mismo origen a /index-grupal.html?inicio=1; después MODALIDAD / TORNEO o MI GRUPO / Código; dos líneas vacías y código real al final. Una llamada share text, sin URL separada duplicada.


## R162 · escape ID y código reutilizable · IMG_5711/5712
Causa: UI ID sólo mostraba nombre; código guardado dependía del último torneo local. Join de torneo aceptaba hash permanente sin consumo. Escape: banco anterior no exigía lista de códigos persistente ni reenvío a segunda cuenta. Control permanente: servidor por evento, permisos propietario, consumo atómico SQL; test-r162-single-use-tournament-code.mjs y scripts/review-r162.mjs. Estado pruebas dirigidas PASS; publicación pendiente.


## R163 · DIRECTORIO MOSTRABA SÓLO EL ENTORNO ACTUAL Y WHATSAPP COPIABA TODA LA BURBUJA · 3 octubre 2026

- Defecto: Scores Torneo mostraba sólo los torneos creados en la base de la aplicación abierta. En WhatsApp copiar el mensaje largo también copiaba todo el texto, impidiendo pegar sólo el código.
- Causa: LAB y Producción usan bases aisladas; el menú consultaba sólo la local. La invitación y código compartían una burbuja WhatsApp.
- Control: federar servidor-a-servidor lista/lectura de torneos activos con source fijo; Scores se leen desde entorno de origen y la respuesta excluye hashes, teléfono y campos fuera de lista. El código se comparte como mensaje independiente y botón de portapapeles.
- Pruebas: `test-r163-cross-environment-tournament-scores.mjs`; `test-r159-whatsapp-two-messages.mjs`; banco integral, revisión de navegador y despliegue en curso.
- Estado: CONTROL, TESTS DIRIGIDOS, BANCO COMPLETO LAB, QUALITY/ROADMAP/INVENTARIO Y CHROMIUM LOCAL 390/430 PASS. Preview remoto LAB/Producción y prueba física WhatsApp/iPhone pendientes; Producción R162 intacta.

### Revisión de regresión R163 · controles heredados desactualizados
Causa: la federación del directorio cambió el contrato de consulta y WhatsApp volvió a dos acciones explícitas; tres pruebas del menú/invitación aún afirmaban rutas y payloads anteriores. El fixture de directorio tampoco inicializaba `directoryPartial`, y el gate de build cortaba la salida asíncrona al ejecutar `process.exit()`.
Corrección permanente: actualizar `test-lab-registration-private-rounds-entry.mjs`, `test-lab-private-round-share-flow.mjs` y `test-lab-tournament-navigation.mjs` al contrato R163; el gate sintético usa `fs.writeSync`; la prueba global llena 20 torneos por entorno y verifica los 40 resultados. `api/tournament-score-directory.js` elimina el límite de 100 para incluir cada torneo activo. `scores-ui.css` mantiene los controles de código ocultos antes del primer envío. `scripts/project-quality-gate.mjs` emite PASS/FAIL con escritura síncrona y `test-project-quality-gate.mjs` confirma el contrato. Chromium local 390/430 para grupo y torneo PASS, incluyendo cancelación/reintento; evidencia en `CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R163_WHATSAPP/`. Banco integrado, quality, roadmap e inventario PASS. Preview remoto continúa pendiente; Producción permanece intacta.

## R166 · Autoridad administrativa sin membresía visible · 4 de octubre de 2026
Evidencia: IMG_5722 muestra Family en ADMINISTRAR TORNEOS Y GRUPOS; IMG_5723 muestra que ID DE TORNEO afirma que no hay torneos activos. IMG_5720 muestra MI GRUPO · JAIME y Scores que niega pertenencia. Causa común en datos legacy: la consulta de administración toma `owner_account_id`, mientras el listado personal y lector de scores usan un INNER JOIN de membresía; el encabezado conserva el nombre local y no prueba acceso de servidor.
Control añadido: el dueño persistido se deriva como organizador sólo al cotejar `owner_account_id` con la cuenta activa, incluso si falta su fila legacy. La consulta sigue exigiendo membresía para cualquier otra cuenta; autorización de escritor permanece en `gsc_personal_can_publish`. Pruebas R162 de código, permisos personales con scores activos, R158 de grupo y administración. Revisión de Preview automatizada pendiente.


R166 — build detectó metadatos de release obsoletos en instalación LAB. `release.json` avanzó pero `service-worker.js` y `index-grupal.html` conservaron R163, haciendo fallar `test-lab-registration-private-rounds-entry.mjs`. Escape: la prueba de integración no se ejecutó localmente antes del primer envío a Preview. Control permanente: ejecutar `node test-lab-registration-private-rounds-entry.mjs` y `node scripts/build-manual-lab.mjs` en el candidato completo, además de alinear RELEASE_FALLBACK y gscg-release con release.json. Estado: corrección incorporada; build Preview pendiente.


## R167 · Administración: WhatsApp visible, confirmación de copia y retiro de permisos
Orden 4 octubre 18:50 Guatemala: retirar permisos administrativos, permisos de tarjetas y ventanas de generar/revocar. Causa del cuadro fuera de vista: Administración no cargaba scores-ui.css, único propietario del position:fixed/inset/z-index de scores-detail-backdrop. Copia informaba en status fuera de vista; ahora confirma junto al botón sólo después de writeText resuelto y muestra error local. Solicitud de código y permisos de servidor se conservan. Regresión VM PASS; Preview/navegador y publicación pendientes. QA explícito antes/después usa archivos baseline R166 capturados, APIs simuladas y share simulado; no acredita WhatsApp real/iPhone ni igualdad de bases aisladas. Rollback f23728439a73a5087e051f837049ac1dcd8cca6f.
- `event-administration.html` · modificación/control R167.
- `event-administration-ui.js` · modificación/control R167.
- `test-event-administration.mjs` · modificación/control R167.
- `test-r167-admin-share-feedback.mjs` · modificación/control R167.
- `scripts/fixtures` · modificación/control R167.
- `scripts/fixtures/r167-admin-browser.html` · modificación/control R167.
- `scripts/build-manual-lab.mjs` · modificación/control R167.
- `index-grupal.html` · modificación/control R167.
- `service-worker.js` · modificación/control R167.
- `release.json` · modificación/control R167.
- `ROADMAP_OVERALL.md` · modificación/control R167.
- `ROADMAP_A_DETALLE.md` · modificación/control R167.
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` · modificación/control R167.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md` · modificación/control R167.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` · modificación/control R167.
- `test-r156-tournament-invitation.mjs` · actualiza expectativa heredada de permisos al retiro ordenado R167; build remoto anterior se detuvo en esta expectativa, no se promovió.
R167 QA: el fixture se ejecuta después del parser y omite auth-gate.js sólo en datos simulados porque su ruta de prueba no es Administración. La aplicación conserva auth-gate.js sin cambio.
R167 navegador QA detectó X raíz sobre X del cuadro WhatsApp: raíz con z-index 2147483001 superaba backdrop 11000; ocultar sólo main>[data-gsc-close] mientras #gscWhatsAppInvitation existe. event-administration.html y test-r167-admin-share-feedback.mjs agregan control permanente. Antes posición static top820/bottom1664; después fixed top0/bottom844 en viewport844; confirmación de copia visible. Envíos QA separados verificados; clipboard virtual de CUA no permite leer el portapapeles nativo, no se acredita lectura física.


## R168 · 2026-10-04 · X funcional desde Scores compartidos

- Orden: revisar X de pantallas principales y ramificaciones, con pulsación y destino comprobado.
- Fallo reproducido en navegador real de Producción: /live-hub.html?demo=1&shared=1; pulsar Cerrar Scores conserva la tabla.
- Causa: showTournamentPortal activa un directorio que renderTournamentShelf oculta cuando shared=1.
- Corrección mínima: Cerrar Scores en shared=1 o display=1 usa hubBack; returnTo autorizado conserva precedencia. Directorio normal conserva regreso a lista.
- Evidencia adicional: Family real en Producción contiene Jimmy hoyo 4, gross 20, neto 16, EVEN; X por directorio funciona. General, Categoría, Buscar y Favoritos con detalle de 18 scores cerraron sin salir de la rama.
- Regresión: ejecutar handler de cierre con matriz shared/display/directorio/returnTo y negar destinos externos. Navegador Preview y publicación se registran tras verificar.
- REINTENTAR pertenece al comprobador de actualización; SIN SEÑAL pertenece al polling de Scores. No constituyen confirmación de actualización.
- Límite: no se certifica iPhone nativo ni todas las ramas privadas sin una sesión autorizada y datos disponibles.

- Control permanente: `test-r168-scores-close.mjs`, integrado en `scripts/build-manual-lab.mjs`; corrección en `live-hub.js`.

## R169 · 2026-10-04 · Cierre uniforme y posición de Administración

- `shortcuts-ui.js`: X compartida con marco verde de 2 px y área de 54 × 54 px, posición fija común en pantallas y ventanas internas; conserva cada acción de cierre.
- Administración: eliminar margen vertical automático que alejaba título y lista de la navegación.
- Validación: `test-r157-uniform-navigation.mjs`, `test-r158-group-scores.mjs`, `test-r168-scores-close.mjs` y revisión del navegador publicado; no declarar revisión física de iPhone ni sincronización de datos.
- Pendiente demostrado: bases LAB/Producción separadas y acceso seguro rechazado con CORREO O CONTRASEÑA INCORRECTOS; la publicación no migra registros.

## R170 · 2026-10-04 · Participación en torneo explícita

- `index-grupal.html` y `private-rounds.js`: Scores Torneo sin pertenencia abre ventana SCORES TORNEO con NO PERTENECES A NINGÚN TORNEO y X común.
- `live-hub.js` y `live-hub.html`: misma indicación en directorio del Menú, conservando listado global. Fallo de red no equivale a ausencia de participación.
- `test-r158-group-scores.mjs`: casos de tarjeta sin evento, otro grupo y torneo sin jugadores; revisión de navegador antes de publicar.
- Persisten bloqueos de sincronización de registros LAB/Producción y revisión privada autenticada; no declarar 100% físico de iPhone.

- R170: Administración vacía indica falta de eventos administrables en este entorno; no afirma ausencia de torneos públicos. La sincronización de registros permanece pendiente.

## R171 · 2026-10-04 · Directorio global único en Administración y Scores
- `api/event-administration.js` identifica el entorno de su lista autorizada; no altera autorización ni base de datos.
- `event-administration-ui.js` reúne los torneos públicos de `/api/tournament-score-directory` con los grupos/eventos administrables locales, deduplicando por entorno, tipo e ID. Eventos públicos no autorizados no reciben códigos ni acciones de borrado. Error o lista parcial no equivale a vacío.
- `live-hub.js`: VER SCORES abre exactamente el torneo seleccionado por entorno/ID.
- `test-r167-admin-share-feedback.mjs`: cuarenta torneos en dos entornos, ID repetido entre entornos, grupo privado local, autoridad local, códigos ajenos excluidos y fallo de identidad. Revisión en navegador de ambas listas y apertura de cada torneo antes de publicar.
- Pendiente/BLOQUEADO: grupos privados de otras cuentas/orígenes no se exponen públicamente ni se migran. No declarar sincronización privada ni 100% de revisión nativa iPhone.


## R172 — directorio automático (2026-10-04)
Administración y Scores consultan el directorio global cada 5 segundos mientras la página está visible, y al volver o recuperar conexión. Conservan las listas conocidas ante respuesta parcial/error; las consultas tienen límite de 8 segundos y no se superponen. Administración conserva ventanas abiertas y no vuelve a emitir códigos si los eventos locales no cambiaron. Scores no reemplaza la selección ni el detalle abierto; evita reconstruir tarjetas sin cambios. Verificación: test-r172-directory-auto-refresh.mjs y regresiones R167/R168/R158. QA de llegada usa fixture explícito scripts/fixtures/r172-auto-directory.html sin crear eventos reales. Latencia: siguiente consulta más respuesta del servidor; no se declara propagación instantánea ni revisión nativa de iPhone.

## RC-R173 · origen oculto y comparación errónea de listas
Fallo entregado: Administración federada sin etiqueta de ambiente se comparó con ID de organizador local como si ambas fueran registros sincronizados. Causa: source sólo en atributo DOM; validación anterior no exigía origen visible y QA de polling se presentó como llegada suficiente. Escape: prueba de fixtures sin recorrido de la cuenta/dispositivo real. Corrección mínima: origen visible y alcance explícito de ID, sin exponer códigos ajenos. Control permanente: mismo ID en LAB/Producción conserva filas/origen y niega código/acciones cruzadas; API lista devuelve entorno probado por hostname. Estado: implementación local; revisión pública Preview pendiente, actualización iPhone R155 NO VERIFICADA.

RC-R173-WA · código omitido en primer mensaje y controles ocultos: primer payload incluye código; botones independientes visibles; éxito local de compartir no declara entrega. Regresiones exactas grupo/torneo y cancelación/reintento PASS técnico. Banco LAB PASS; recorrido real BLOQUEADO por Vercel 402/Deployment Paused y aviso Payment failed, 5 octubre 2026. Pendiente titular: regularizar facturación; agente: verificar navegador y publicar después de recuperación.

RC-R173-Vercel-test · Preview LAB mostró `test-r162-single-use-tournament-code.mjs` FAIL porque el test mezcló hostname de Producción con `VERCEL_PROJECT_ID` de LAB. La API prioriza `VERCEL_PROJECT_ID` y `GSC_ENVIRONMENT`; el primer fix omitió simular la segunda. Fix mínimo sólo en fixture/helper: simular/restaurar ambas por hostname y usar `tournamentDirectoryEnvironment` para la expectativa local; dirigido PASS con GSC_ENVIRONMENT=lab y sin variables. Prohibido repetir despliegue antes de validar helper + banco completo. Vercel volvió a HTTP 200 pero sólo sirve R172 en ambos dominios. Pendientes: build Preview corregido, interacción navegador, deploy LAB y luego Producción.
Reproducción adicional del Preview: la misma expectativa de LAB/Producción se había agregado a R162 duplicando el contrato ambiental que R163 ya prueba; en el runtime Vercel el test debe respetar `VERCEL_PROJECT_ID`, `GSC_ENVIRONMENT` y host reales. Corrección final: quitar esa aserción redundante de R162 y conservar la cobertura dedicada en R163; pruebas R162/R163 PASS bajo `GSC_ENVIRONMENT=lab`.

RC-R173-B1 · Release servido no igualaba a versión visible: capturas reales en LAB y Producción mostraron R155 aunque `/release.json` y el meta HTML ya eran R173. Evidencia: el HTML de `index-grupal.html` contenía literalmente `VERSIÓN R155` en `#appReleaseBadge`. Causa mínima: placeholder estático olvidado, no fallo de Vercel. Corrección: badge estático R173 y build ID `20261005-R173-B1` en release/meta/Service Worker; test bloquea futuros desajustes antes de ejecutar JS. Regresión de entrega dirigida PASS. Pendiente publicar B1 y verificar la pantalla de teléfono; no confundir READY o release.json con actualización visible.

### R173-B1 · Fallos de CI identificados después de abrir PR #71
- V305 congelaba un botón y título históricos incompatibles con la UI vigente; `test-lab-update-recovery.mjs` ya exige ausencia de ese botón. Se alineó la prueba a los dos accesos actuales y al título RONDAS GUARDADAS.
- `test-stableford-ui.mjs` reintroducía el micrófono de anotación retirado por R11 y exigía etiqueta SÚPER sin acento. Test alineado a anotador silencioso y etiqueta correcta.
- Checkout de macOS descargaba todas las ramas y chocaba entre nombres LAB/lab. Checkout restringido al SHA del evento con profundidad 1 y fetch explícito de la base para la compuerta ROADMAP.
- Pruebas dirigidas locales PASS; re-ejecución remota obligatoria antes de publicar. No se ignoran checks.
- Seguimiento PR #71: los contratos heredados `test-v304-homogeneous-registration-actions.mjs` y `test-v305-registration-guides-parser-truth.mjs` también exigían SUPER sin tilde. Alineados al texto de interfaz SÚPER; los cuatro dirigidos V304/V305/Stableford PASS.


RC-R173-B1-CI3 · 5 octubre 2026: `test-v307-match-arrows-format.mjs` esperaba un sufijo `· MEDAL PLAY` eliminado del contrato vigente. Se alinea el test con `generalMatchDetail` actual, sin cambiar el producto. Estado: esperando nueva ejecución CI remota.

RC-R173-B1-CI4 · 5 octubre 2026: test V307 también omitía el estado de empate que la tarjeta sí presenta con `=` accesible. Se actualiza sólo la expectativa de prueba; falta CI remoto.

RC-R173-B1-CI5 · 5 octubre 2026: el diagnóstico R80 matrix reveló que la tarjeta global general no mostraba la categoría, a diferencia de las demás modalidades. `strokeHalf` ahora presenta categoría y nombre. La matriz CI debe confirmarlo.

RC-R173-B1-CI6 · 5 octubre 2026: ROADMAP CI ejecutaba el banco R163 sin instalar la dependencia fijada `@electric-sql/pglite@0.5.8`. Se incorpora instalación en el workflow y timeout de diez minutos; los checks deben volver a pasar.

RC-R173-B1-CI7 · 5 octubre 2026: el gate del paquete nativo intentaba incluir `voice-assistant.js`, recurso retirado sin referencias en HTML ni Service Worker. Se elimina del empaquetador móvil. CI móvil debe confirmar que no quedan recursos faltantes.

## RC-107 · COMPARTIR ID DE GRUPO DEJABA SAFARI EN BLANCO AL VOLVER · 5 OCTUBRE 2026

- Defecto expuesto: al compartir W2RE4FG8GH con WhatsApp, al regresar se mostraba una pestaña blanca en lugar de Score Card.
- Causa raíz: el handler del código de grupo abría `wa.me` mediante `window.open(..., '_blank')`, creando un contexto nuevo.
- Control permanente: `test-r159-whatsapp-two-messages.mjs` ejecuta el handler de `index-grupal.html`, exige `location.assign` en la misma pestaña, verifica que se copie el ID y que no se llame `window.open`.
- Estado: corrección aplicada a rama aislada; prueba remota/Preview y verificación física de iPhone pendientes; Producción intacta.


## RC-R174 · TORNEO FEDERADO NO ABRÍA DESDE LAB · 6 OCTUBRE 2026

- Defecto expuesto: al abrir Scores de Santa delfina (Producción) desde su ficha en LAB, el monitor mostraba que no podía comprobar la participación y que no había torneos en curso.
- Causa raíz: el rechazo de `GSCPersonalEvents.sync()` abortaba `live-hub.start()` antes de resolver `directoryEvent`.
- Control permanente: `test-r174-directory-event-fallback.mjs` cubre el rechazo del servicio de membresía y verifica que la selección federada siga alcanzable; `npm run scores:r174-directory-gate` lo ejecuta.
- Estado: prueba local PASS. Candidato pendiente de Preview y recorrido físico posterior; Producción intacta.


## RC-R175 · Login de cuenta desvió Organizador · 6 octubre 2026

- Causa: el diálogo de autorización exponía “SOY EL PROPIETARIO · INICIAR SESIÓN”, que invocaba `GSCOpenAccountLogin`; el inicializador además abría login sin sesión en rutas normales.
- Escape: la prueba anterior cubría registro libre en la página principal, no el botón de Organizador en Scores LAB.
- Corrección permanente: remover ese botón y exigir acceso explícito para el formulario opcional; mantener código de Organizador y APIs protegidas por recurso.
- Evidencia automática: `test-lab-account-gate.mjs` inspecciona el arranque sin sesión, el acceso explícito y el código único.
- Estado: cambio local PASS; Preview/browser pendientes; Producción intacta hasta cerrar puertas.


## R176 · La app instalada reaparecía en Score Card · 6 octubre 2026

- **Causa raíz:** iOS puede conservar la página viva y reactivarla sin ejecutar de nuevo `pwa-launch.html`; los handlers de `pageshow`, `focus` y `visibilitychange` preservaban una ronda recuperada y omitían Registro.
- **Punto de escape:** la cobertura existente probaba la URL inicial PWA y la preservación al volver desde Torneos, no la reactivación de una página viva con ronda activa.
- **Control permanente:** `reopenRegistrationAfterBackground()` cubre los tres eventos de ciclo de vida sólo para la PWA tras ocultarse; persiste la Score Card y abre Registro. La prueba exige jugadores/scores intactos y niega el desvío en web, estado no reanudado o ronda vacía.
- **Evidencia/estado:** gates de Proyecto, ROADMAP, Inventario, banco LAB, Preview y dispositivo se validan en R176 antes de promover. Producción sin cambios.

## R177 · Eventos fuera de Administración y códigos faltantes

- Causa raíz: la Administración combinaba los eventos de la cuenta del ambiente local con el directorio público de torneos, pero no consultaba los eventos privados/torneos de la cuenta en el ambiente par. ID DE TORNEO leía sólo la membresía del ambiente local; grupos y torneos remotos quedaban fuera. El selector de Scores abría General y no aplicaba la categoría solicitada desde el vínculo.
- Punto de escape: las regresiones de directorio comprobaban lectura pública, pero no la lista de cuenta entre ambos ambientes, códigos, eliminación por origen ni ambos botones de Scores desde cada fila.
- Control permanente: test-r177-cross-device-admin.mjs y su inclusión en scripts/build-manual-lab.mjs; autoridad remota revalidada y acciones enlazadas a ambiente + tipo + ID.
- Estado: candidato R177. Aún no PASS de CI/Preview/browser; no declarar actualizado hasta esos resultados.
- R177 CI follow-up: el test R167 esperaba el nombre y payload de la función previa. Se alinea a shareEvent y comprueba compartir remoto/local y permisos deshabilitados sin alterar la protección de eventos ajenos.

- R177 CI follow-up 2: test-r156-tournament-invitation.mjs encontró que el estado vacío ya no conservaba «NO TIENES TORNEOS». Se restaura el texto esperado y se añade que la búsqueda cubre ambos ambientes.


### R177 · Registro de corrección
Gate detectó que el relay federado no había quedado persistido en el API final. El relay fue completado y se exige repetir roadmap, inventario, pruebas federadas y los tres previews; no promover con un gate fallido.


R177 cierre de test: se corrige el contexto de ambiente faltante en la regresión existente, sin cambiar la lógica de eliminación.


R177 requisito validado: compartir torneo activo sin roster debe ser posible y permanecer read-only hasta que organizador asigne jugadores.


R177: la verificación de destino usa la sesión real emitida tras el canje, no un campo inexistente de la respuesta.


### R178 · Recuperación de propietario heredado
La lista ocultaba controles de administración porque torneos anteriores a la identidad personal carecían de vínculo de propietario. El reclamo ahora requiere la clave de organizador almacenada en el dispositivo y validada contra el hash del evento; incluye eventos vencidos no revocados para permitir su limpieza. Verificar Administración, Score Card y etiqueta `ELIMINAR TORNEO` en LAB antes de cualquier promoción.


R178 · 6 octubre 2026 · Eliminar sin respuesta: causa disabled en filas del directorio sin autoridad reconocida; escape: se probó sólo la fila autorizada. Control permanente: botón público accionable, confirmación sin petición y cancelación sin borrado; permiso revalidado en API. Pruebas R167/R171 y R152 PASS. Publicación pendiente.


### R179 · Códigos globales ausentes
Causa: ID usaba lista asociada a identidad mientras Administración incluía directorio global sin códigos. Escape: prueba validaba nombres y exclusión de códigos ajenos, incompatible con pedido global posterior. Control: test-r178-global-tournament-ids.mjs valida campos, dispositivos, ambos orígenes, códigos consumidos e inspección por otra identidad. Estado: PASS local y navegador móvil de 120 torneos; publicación a comprobar.


## R180 · Recuperación instalada enviada a Registro

Causa raíz: pwa-launch.html añadía inicio=1 y el guard directHome trataba source=pwa como Registro. Escape: test-v368 comprobaba la URL pero su texto afirmaba recuperación; faltaba cerrar/reabrir en navegador con scores. Control permanente: tests/r180-installed-card-resume.mjs ejecuta seis rutas, incluida apertura heredada y cierre/reapertura, conserva ID Friends y gross 5/4, exige Score Card visible. Corrección incremental en pwa-launch.html e index-grupal.html. PASS navegador local; comprobación física iPhone no realizada.


## R181 · Grupos globales ausentes del Organizador libre

Causa raíz: el directorio público solo consultaba live_tournaments; los grupos provenían de event-administration y quedaban filtrados por autoridad. Escape: pruebas de listados globales solo incluían torneos. Control permanente: test-r181-global-groups-directory.mjs en scripts/build-manual-lab.mjs; consulta anónima de ambos tipos y orígenes, colisión de ID, código útil de grupo, Scores público, 101 streams íntegros y exclusión de datos privados. Evidencia navegador: 120 eventos/60 grupos con API administrativa 403, compartir y Scores cross-env PASS. No se alteran permisos de eliminación ni escritura; no se afirma carga de tarjetas que aún residen únicamente en teléfonos.


## RC-111 · ENLACE DE INVITACIÓN WHATSAPP ABRÍA REGISTRO GENÉRICO · 6 OCTUBRE 2026

- Defecto: tocar el enlace de un torneo desde WhatsApp abría el Registro general y obligaba a localizar el código y volver a configurar el torneo.
- Causa raíz: el emisor omitía eventId y generaba index-grupal.html?inicio=1; la ruta específica del torneo ya existía, pero el mensaje no la utilizaba.
- Punto de escape: las pruebas previas sólo verificaban que existiera un enlace y que el código apareciera en el mensaje; no comprobaban identidad del torneo ni precarga al abrir.
- Control permanente: test-r159-whatsapp-two-messages.mjs valida URL exacta, código y origen LAB/Producción; test-r156-tournament-invitation.mjs valida rechazo de acceso inválido y llamada directa a preparación con nombre, campo y modalidad.
- Evidencia: ambas pruebas y test-r24-event-creation-feedback.mjs PASS local en R182; Preview y recorrido físico pendientes.
- Estado: CORREGIDO EN CANDIDATO R182; PRODUCCIÓN R181 INTACTA.


## R184 · Correcciones retiradas por publicación divergente
Causa: R182/R183 partieron de 6cbfda4 y no de la purga publicada 27c8ae4; retiraron el borrado físico y la instalación única de funciones. Escape: se validó la rama individual sin comparar contra ambos commits públicos. Control: integración con ambos padres; test-event-total-purge.mjs y comprobación de SHA idéntico en ambos dominios antes de cierre. Estado: integración local, publicación y consultas concurrentes pendientes.

## R187 · SCORES TORNEO abría el directorio global desde el menú · 6 octubre 2026

Causa: el despacho del atajo `tournaments` enviaba a `live-hub.html?directory=1`, confundiendo la tabla de jugadores del torneo ligado a la Score Card con el catálogo global. Escape: las pruebas de recuperación cubrían el botón de la tarjeta, pero no el dispatcher del menú ni el caso sin evento asignado. Control permanente: `test-lab-shortcuts-navigation.mjs` verifica que el menú invoque la Score Card activa, que el retorno desde Hub vuelva a ella y que `shortcut=scores` no renderice el directorio cuando no hay asociación. Administración conserva pruebas separadas de su directorio global. Estado: corrección R187 integrada con el commit canónico 46555 sobre la entrega R185; build completo y gates documentales, inventario y release PASS. Preview y revisión pública Playwright de cuatro transiciones pendientes; Producción sin cambios.


## RC-112 · confirmación de eliminación rechazaba al organizador · 7 octubre 2026

- Defecto: al confirmar eliminar un torneo, el diálogo mostraba `INICIA TU SESIÓN DE PROPIETARIO PARA TENER CONTROL PLENO` y no eliminaba.
- Causa raíz: `resolveEventIdentity()` daba prioridad irrevocable a una cookie `gsc_code_session` caducada y no probaba la identidad de dispositivo válida que también llegaba en la petición.
- Punto de escape: las pruebas cubrían permisos, confirmación única y error visible, pero no la combinación de cookie de propietario caducada con identidad válida del creador.
- Control permanente: si la sesión de código responde `ACCOUNT_UNAUTHORIZED`, se valida en la base la cookie de dispositivo y se usa sólo si es válida; después `eventAdminAuthority()` vuelve a exigir creador/organizador. Terceros siguen denegados.
- Evidencia: `test-event-administration.mjs` PASS con borrado API completo y terceros denegados; `test-lab-device-event-identity.mjs` PASS con espectador de solo lectura. Primer build señaló un escape de cookie mal formado; corregido y ambas pruebas vuelven a PASS. Rebuild LAB pendiente.
- Estado: CORREGIDO EN CANDIDATO R188-B1; no publicado.


## RC-113 · torneo creado abría Score Card sin código; campo bloqueado al editar Registro · 7 octubre 2026

- Defecto: `CONTINUAR AL SCORE CARD` abría directamente la tarjeta y el código no era requerido; al editar el Registro de una ronda activa, las opciones de campo aparecían deshabilitadas.
- Causa raíz: el resultado de creación enlazaba a `openAssignedCard()`; el render de campo deshabilitaba los radios en `rosterEditMode`, y el guardado de ronda editada no persistía `draftCourse`.
- Escape: las pruebas anteriores cubrían creación, cambio de modalidad y flujo de código, pero no que el campo siguiera seleccionable durante edición ni que el torneo no saltara el ingreso de código.
- Control permanente: `test-organizer-tournament-entry.mjs` verifica que el torneo no renderice continuación directa, que `CÓDIGO INGRESO` sólo copie y que el flujo de grupo privado continúe; `test-lab-edit-round-mode.mjs` verifica campo editable, persistencia, gross conservado y renovación del cierre oficial.
- Corrección: se elimina la acción de continuación directa para torneos y la navegación automática al volver desde WhatsApp; se libera el selector del Registro y se guarda el campo antes de recalcular los scores netos.
- Estado: INTEGRADO EN R190; ejecución automatizada y publicación registradas por los gates de despliegue.
## RC-114 · ingreso a torneo bloqueado por sesión de código vencida · 8 octubre 2026

- Defecto: en R196, al ingresar un código de torneo desde un dispositivo que conservaba una sesión de código vencida pero no una cookie de identidad de dispositivo válida, la API devolvía `NO SE PUDO PREPARAR EL EVENTO · REINTENTA`.
- Causa raíz: la ruta con cookie `gsc_code_session` sólo recuperaba ante `ACCOUNT_UNAUTHORIZED`, no ante los rechazos propios de sesión inválida, vencida o revocada; además, al pedir `identity` no podía crear una identidad nueva si no quedaba dispositivo válido.
- Punto de escape: la prueba previa cubría cookie vencida junto a identidad válida del dispositivo, pero no la combinación de sesión vencida y ausencia de cookie de dispositivo.
- Control permanente: `test-lab-device-event-identity.mjs` reproduce esa combinación, comprueba alta de identidad segura, inspección de código sin consumirlo y denegación a otro dispositivo. La recuperación no crea membresía ni otorga permisos.
- Estado: corregido en candidato R197; prueba dirigida PASS; gates, revisión LAB y despliegues pendientes.
- Seguimiento R198: el propietario confirmó R197 en LAB; en Producción R197 falló al inspeccionar un nuevo código (`ACCOUNT_UNAUTHORIZED`). La ruta podía omitir `identity` si el cliente retenía identidad en memoria y vencía su sesión. R198 aplica identidad segura sólo a la inspección de lectura, sin consumo ni membresía; `test-lab-device-event-identity.mjs` reproduce el caso y queda PASS. Revisión LAB pendiente antes de Producción.
