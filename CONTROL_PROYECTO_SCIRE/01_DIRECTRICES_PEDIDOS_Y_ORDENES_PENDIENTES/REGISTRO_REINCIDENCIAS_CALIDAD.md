# Registro de reincidencias de calidad

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
| RC-079 | R21 se actualizó sola aunque ACTUALIZAR permaneció apagado; el scroll instalado continuó congelándose intermitentemente | El service worker usaba navegación network-first y reemplazaba el shell antes de la aprobación; R20 sólo restablecía overflow en body/html sin cubrir el scrollingElement ni capas invisibles | La prueba comprobaba diferencia de release, pero no separaba candidato descargado de shell aprobado | Caché aprobada separada, consulta de versión sin promoción y promoción sólo con `app_version` generado por el botón; recuperación de scrollingElement y capas sin puntero | `IMG_3043.png`; reporte físico 07/09/2026; `test-v365-active-round-empty-recovery.mjs` | CORREGIDO LOCAL V406-R22; PREVIEW Y REVI