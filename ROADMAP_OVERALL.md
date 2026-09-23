# ROADMAP OVERALL

## LAB 20-sep-2026 · gate de QA alineado con perfil actual sin micrófono/AI

- El gate ROADMAP deja de ejecutar bancos V354–V362 de dictado/AI retirados y usa el perfil técnico actual mediante `scripts/build-manual-lab.mjs`.
- La nueva protección exige ausencia de entradas de micrófono/AI, conserva voz local de resultados, cálculo, persistencia, modalidades, cierre, historial, manual y paridad de pantallas.
- Se evita que una prueba obsoleta falle por `api/voice-health.js`, módulo retirado del perfil LAB actual.
- Archivos exactos: `.github/workflows/roadmap-gate.yml`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`.


## LAB 20-sep-2026 · cambio de modalidad con scores existentes

- Se elimina el bloqueo que impedía cambiar modalidad cuando la ronda ya tenía scores registrados.
- Los scores existentes se conservan al cambiar entre modalidades compatibles; la validación propia de cantidad de jugadores de cada modalidad permanece activa.
- El flujo editado persiste la nueva modalidad mediante `round.mode=draftRoundMode` sin borrar `player.holes`.
- Prueba permanente actualizada: `test-lab-edit-round-mode.mjs`, que exige cambio de modalidad con scores conservados y prohíbe el mensaje de bloqueo anterior.
- Archivos funcionales y de QA del cambio: `index-grupal.html` y `test-lab-edit-round-mode.mjs`.
- Producción permanece intacta; alcance exclusivo LAB hasta certificación integral.



## V407-R29 · envío de Tarjeta Digital compatible con el toque de iPhone · 12 de septiembre de 2026

- Causa raíz física: `ENVIAR TARJETA DIGITAL` generaba el PNG con una espera asíncrona antes de llamar a `navigator.share`; Safari perdía la activación transitoria del toque y no abría la hoja nativa.
- La tarjeta PNG se prepara al finalizar la ronda. El toque posterior llama inmediatamente a compartir con el archivo ya listo, conservando la activación exigida por iPhone.
- El estado `TARJETA LISTA PARA ENVIAR`, cancelación o error queda visible fuera de `artifactActions`, que permanece oculto.
- Prueba dirigida: `test-v397-card-in-out-back-contract.mjs` ejecuta el caso Universales y demuestra que `navigator.share` comienza dentro del mismo toque. Estado automático PASS; prueba física iPhone y publicación pendientes.
- Archivos exactos: `index-grupal.html`, `service-worker.js`, `test-v397-card-in-out-back-contract.mjs`, `test-v365-active-round-empty-recovery.mjs`, `test-v406-r2-professional-design.mjs`, `test-v406-r23-visible-version.mjs`, `test-v406-r4-mobile-controls.mjs`, `test-v406-r5-simple-tournament-live.mjs`, `test-v407-r1-premium-visual-system.mjs`, `test-v407-r25-round-controls.mjs`, `test-v407-r7-ios-scroll.mjs`, `test-v407-r9-manual-update.mjs`, `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`.

## V407-R24D LAB · recuperación de instalaciones R8 y aislamiento al desplazarse · 9 de septiembre de 2026

- Corrige el FAIL físico donde `golf-sc-gt-lab.vercel.app` seguía mostrando R8 y ACTUALIZAR no actuaba: el middleware sustituía `service-worker.js` y los manifiestos por `access.html`.
- Esos tres recursos técnicos quedan públicos; la aplicación, los datos y las APIs privadas conservan el control de acceso.
- `ACTUALIZADO` deja de ser fijo cuando no existe una versión pendiente, evitando que cubra `CONTROL MANUAL · UNIVERSALES`; `ACTUALIZAR` disponible conserva visibilidad, verde, habilitación y pulso.
- Pruebas permanentes: `test-v407-r24c-public-pwa-bootstrap.mjs` y `test-v407-r24c-update-scroll-isolation.mjs`. MAIN permanece intacta.
- Continuidad 10 de septiembre de 2026: se regeneran los tres inventarios desde el árbol limpio `a2d1d9a5ebdd36435daed6c34a0c8ff61561612a`; el candado confirma 450 fuentes y conserva MAIN sin cambios.

## V407-R24 LAB · WhatsApp privado y transición de ronda · 9 de septiembre de 2026

- Registro General y Stableford incluyen WhatsApp opcional con `🇬🇹 +502` predeterminado y código internacional editable; el dato se conserva en el perfil y no se publica en LIVE ni en la tarjeta digital. Los bancos Stableford anteriores quedan alineados con la entrada enriquecida.
- `FINALIZAR RONDA` guarda la tarjeta oficial en Historial y habilita su envío; `NUEVA RONDA` archiva la ronda actual y abre un registro vacío en todas las modalidades.
- En cualquier pantalla superpuesta se oculta `ACTUALIZADO`, evitando que cubra `ATRÁS` u otras acciones móviles. Sólo Preview LAB; Main permanece intacta.
- El inventario se sella contra el árbol remoto LAB dentro del mismo cambio documental requerido por el despliegue.
- Los simuladores Stableford anteriores interpretan la ausencia del nuevo campo como WhatsApp opcional vacío.
- En móvil, WhatsApp ocupa una fila completa y reserva al número un ancho mínimo utilizable.

# V407-R23B · enlace LIVE privado abre como sólo lectura · 9 de septiembre de 2026

- Corrige únicamente la frontera de acceso del visor compartido: `/live.html`, `live-view.js` y `match-play.js` pueden cargar sin sesión propietaria.
- `/api/live` continúa privado para crear, publicar y revocar; el middleware deja pasar exclusivamente `POST action=read`, que `api/live.js` valida con el token secreto, caducidad, revocación y límite de consultas.
- `test-v352-live.mjs` impide que el visor vuelva al formulario propietario y que una acción de escritura quede expuesta.

## V407-R23 · compartir directo e invitación transportable · 9 de septiembre de 2026

- Desde una Score Card activa, tocar LIVE ejecuta directamente `quickShareGroup()` y abre la hoja nativa de compartir para elegir WhatsApp; no muestra ninguna pantalla intermedia. La regla común cubre General, Universales, Stableford, Match Play y Four Ball.
- La invitación propietaria de 24 horas viaja como texto completo con `/access.html?invite=TOKEN`; WhatsApp conserva el token. `access.html` acepta query y el formato fragmento anterior, elimina el token visible y canjea exclusivamente por POST. Un GET de previsualización no consume la invitación.
- No cambia scores, ronda activa, persistencia, controles de ACTUALIZAR ni privacidad.

## V407-R22 · LIVE abre la ronda activa en todas las modalidades · 9 de septiembre de 2026

- Publicado en Producción desde commit `90c25514a83b5c407e00ecc4f02ad4f2c9de3ef8`, despliegue `dpl_3T4Fu3Y59uzUzUXytU5FGn5b7ka2`, estado READY; rollback inmediato: `1ad4197bc5f2f8a923b94f3f5eac4a562ccfaafe`.
- `live-control.js` separa el visor público de los controles del propietario. Al tocar LIVE desde cualquier ronda activa abre directamente la administración de esa Score Card; sin ronda conserva el Centro LIVE público.
- Aplica por `currentSnapshot()` a General, Universales, Stableford, Match Play y Four Ball, sin depender de jugadores, campo, hoyo o ronda particular.
- `test-v406-r5-simple-tournament-live.mjs` bloquea permanentemente el regreso al menú genérico cuando existe una ronda. Los bancos LIVE, categorías, Universales y compartir grupo permanecen PASS.
- `index-grupal.html` y `service-worker.js` avanzan sólo la identidad de entrega a R22 para sustituir `live-control.js` almacenado, sin alterar scores, persistencia, invitaciones 24 h ni la función de ACTUALIZAR.

## V407-R10 · tecla ACTUALIZADO activa · 8 de septiembre de 2026

- Cambio puntual: `ACTUALIZADO` permanece oscuro cuando R10 está vigente, pero ya no queda deshabilitado; tocarlo fuerza una recarga real del mismo enlace sin borrar la ronda. No cambia ninguna gráfica ni otra función. MAIN intacta.

## V407-R9 · actualización manual real de la pantalla inicial · 8 de septiembre de 2026

- `IMG_3140(1).jpeg` rechaza R8: el botón verde no sustituía la pantalla anterior.
- R9 usa una identidad nueva para que R8 detecte la publicación; al tocar, conserva la ronda, retira únicamente el worker/caché viejo y recarga el mismo enlace desde red.
- Vigente muestra `ACTUALIZADO` oscuro; sólo una versión distinta muestra `ACTUALIZAR` verde/parpadeante. El worker deja de promover o navegar automáticamente.
- Archivos: `index-grupal.html`, `service-worker.js`, `test-v407-r9-manual-update.mjs`, bancos de versión relacionados, `audit-project.mjs`, continuidad, reincidencias y ambos ROADMAPS. MAIN permanece intacta.

## V407-R8 · un solo scroll iPhone y actualización siempre verificable · 8 de septiembre de 2026

- El acceso instalado histórico `golf-sc-gt-lab.vercel.app` queda como espejo permanente del canónico `epg-caddy.vercel.app`; `vercel.legacy-mirror.json` conserva la configuración que entrega la misma pantalla y el mismo service worker R8 sin pedir cambio de enlace.
- La pantalla principal deja de ser un overlay fijo desplazable: `#setupOverlay` entra al flujo del documento y el iPhone usa un único scroll nativo.
- `ACTUALIZAR` permanece habilitado y parpadeando aun en la versión vigente; cada toque fuerza verificación/promoción de caché sin borrar la sesión.
- El `activate` del service worker migra automáticamente el cliente iPhone activo V407-R6 hacia R8 una sola vez; evita recargas múltiples, no congela el scroll y no depende del sondeo que falló físicamente en `IMG_3136.jpeg`.
- Evidencia de rechazo: `IMG_3134.jpeg`, V407-R6, botón gris y congelamiento intermitente reportado físicamente.
- Archivos exactos: `index-grupal.html`, `service-worker.js`, `test-v407-r7-ios-scroll.mjs`, `test-v365-active-round-empty-recovery.mjs`, `test-v406-r2-professional-design.mjs`, `test-v406-r23-visible-version.mjs`, `test-v406-r4-mobile-controls.mjs`, `test-v406-r5-simple-tournament-live.mjs`, `test-v407-r1-premium-visual-system.mjs`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`.

## V407-R7 · scroll iPhone y actualización visible · 8 de septiembre de 2026

- Corrige el atasco intermitente del desplazamiento en iPhone: elimina la mutación de estilos durante cada `touchstart`, separa el desplazamiento de overlays y página, y publica una nueva identidad de caché para que V407-R6 muestre `ACTUALIZAR` parpadeando.
- Integra sin sobrescribir el cambio concurrente `39bb130`: un solo bloque `MODALIDADES` y la acción `COMPARTE LIVE`.
- Candado reproducible: `test-v407-r7-ios-scroll.mjs` queda incorporado en `audit-project.mjs`.
- Archivos exactos V407-R7: `index-grupal.html`, `service-worker.js`, `audit-project.mjs`, `test-v407-r7-ios-scroll.mjs`, `test-v406-r4-mobile-controls.mjs`, `test-v406-r2-professional-design.mjs`, `test-v407-r1-premium-visual-system.mjs`, `test-v406-r5-simple-tournament-live.mjs`, `test-v261-registration-stableford-modality.mjs`, `test-v329-skins.mjs`, `test-v330-side-games.mjs`, `test-v406-r23-visible-version.mjs`, `test-v365-active-round-empty-recovery.mjs`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`.

## V407-R6 PRODUCCIÓN · enlace estable y actualización instalada · 8 de septiembre de 2026

- Se publica el árbol V407-R6 ya verificado en el enlace estable de Producción para que las instalaciones existentes detecten la nueva versión y habiliten `ACTUALIZAR`, sin exigir al usuario cambiar de enlace ni reinstalar la aplicación.
- El rollback conserva como referencia el commit de Producción V406-R24 `4009f79f50987f8bf105189bce9c5e90b2857363`.

## V407-R4 · encabezado fuera de la barra del iPhone · 8 de septiembre de 2026

La Pantalla Principal respeta el área segura superior; logo e información bajan debajo de la barra del iPhone. El bloque derecho se acerca al centro y versión/ACTUALIZADO se separan del borde. Evidencias de origen: `IMG_3120(1).png`, `IMG_3121(1).png` e `IMG_3122.png`. `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md` registra el corte R4. Producción intacta.

## V407-R3 · Pantalla 4 · Tarjeta Digital premium · 8 de septiembre de 2026

- `index-grupal.html`: Tarjeta Digital usa encabezado centrado, tres acciones equivalentes, metadatos 4×1 en escritorio y 2×2 en móvil, guía de desplazamiento y contenedor de tabla con ancho controlado de 1360 px.
- Los accesos flotantes ajenos quedan ocultos mientras la Tarjeta Digital está abierta; `ACTUALIZADO` permanece visible por orden del propietario.
- La revisión física del primer Preview R3 rechazó `INSTALAR APP` sobre la tarjeta y un metadato vacío; el candidato final oculta ese acceso y muestra `RONDA CASUAL` cuando no existe torneo.
- `service-worker.js` identifica el candidato R3; los contratos V365, V405, V406 y V407 se alinean sin cambiar cálculo, persistencia, cierre ni envío.
- Archivos exactos del corte: `index-grupal.html`, `service-worker.js`, `test-v407-r1-premium-visual-system.mjs`, `test-v365-active-round-empty-recovery.mjs`, `test-v405-registration-clear-final-mobile.mjs`, `test-v406-r2-professional-design.mjs`, `test-v406-r23-visible-version.mjs`, `test-v406-r4-mobile-controls.mjs`, `test-v406-r5-simple-tournament-live.mjs`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`.
- Rollback: regresar al commit V407-R2 en `lab/premium-ui-v407`. Producción permanece intacta.

## V407-R1 · sistema visual premium y simétrico · 8 de septiembre de 2026

Archivos de trazabilidad y regresión actualizados: `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`, `test-v406-r23-visible-version.mjs` y `test-v406-r5-simple-tournament-live.mjs`.

Vistas WhatsApp preservadas individualmente: `previews/whatsapp-cards-v406-r24/01_RONDA_NORMAL.html`, `previews/whatsapp-cards-v406-r24/02_STABLEFORD.html`, `previews/whatsapp-cards-v406-r24/03_MATCH_PLAY.html`, `previews/whatsapp-cards-v406-r24/04_FOUR_BALL.html`, `previews/whatsapp-cards-v406-r24/05_SCORE_CARD_PRACTICA.html`, `previews/whatsapp-cards-v406-r24/06_SKINS.html`, `previews/whatsapp-cards-v406-r24/07_WOLF.html`, `previews/whatsapp-cards-v406-r24/08_VEGAS.html`, `previews/whatsapp-cards-v406-r24/09_DOTS.html`, `previews/whatsapp-cards-v406-r24/10_TORNEO_LIVE.html` y `previews/whatsapp-cards-v406-r24/index.html`.

- `index-grupal.html` incorpora una retícula visual única para Registro, cabecera, herramientas, información del campo, resumen, acciones inferiores, Historial, Tarjeta Digital y paneles: negro/grafito, bordes discretos, verde limitado, radios coherentes, alturas táctiles homogéneas y espaciado respirable.
- En móvil, la cabecera se ordena en dos columnas, las cuatro herramientas forman una fila simétrica, las primeras cuatro acciones se distribuyen 2×2, NUEVA RONDA ocupa una línea completa y las tres acciones secundarias conservan exactamente la misma altura.
- `service-worker.js` identifica la caché V407-R1. `test-v407-r1-premium-visual-system.mjs` bloquea regresiones de simetría y geometría. Producción permanece intacta hasta revisión visual y aprobación del propietario.
- Control Manual hereda la misma superficie grafito, navegación ANTERIOR–HOYO–SIGUIENTE proporcionada, campos homogéneos y ENTER principal de 56 px.
- Corrección RC-084: Control Manual elimina las seis columnas rígidas, usa retícula adaptable con controles de 54–64 px y conserva sin cambios la paleta original negro, verde neón, blanco y rojo funcional. Se prohíbe aceptar como evidencia móvil una captura de escritorio recortada.
- `test-v260-round-points-player-return.mjs` conserva el contrato de seis columnas de General/Stableford, pero sustituye la medida rígida obsoleta por validación explícita de la retícula adaptable de escritorio y móvil.

## V406-R24 · Previsualización física de tarjetas WhatsApp · 8 de septiembre de 2026

- Se incorpora `previews/whatsapp-cards-v406-r24/` con un índice y diez tarjetas de muestra generadas por el constructor oficial de artefactos: Ronda Normal, Stableford, Match Play, Four Ball, Score Card · Práctica, Skins, Wolf, Vegas, Dots y Torneo Live.
- Las páginas son exclusivamente de revisión visual en LAB; no cambian cálculo, persistencia, envío, Production ni el cierre oficial de rondas.

## V406-R4 · Controles móviles sin traslape · 7 de septiembre de 2026

- LIVE, REGLAS, AI ∞ y Support pasan a una barra estructural debajo del encabezado.
- Registro nombra explícitamente los selectores vacíos CATEGORÍA y MARCAS.
- ATRÁS, BORRAR SCORES y + JUGADOR comparten una fila compacta.
- El banco visual temporal usa 67 participantes repartidos 7/6/24/11/7/7/5; test-v406-r4-mobile-controls.mjs conserva el candado de regresión.

- V406-R3 renueva exclusivamente el identificador publicado y la caché PWA para que los accesos instalados con V406-R2 detecten la actualización y activen el botón `ACTUALIZAR`; no modifica rondas, scores ni persistencia.

## V406-R2 LAB candidato · Diseño profesional, categorías y TORNEO LIVE · 7 de septiembre de 2026

- Se agregó `gsc-design-system.css` como hoja canónica exclusiva de TORNEO LIVE: espaciado, radios, superficies, foco, alturas táctiles y tipografía legible. Registro quedó consolidado dentro de su hoja histórica, sin una capa externa de sobrescrituras.
- Registro móvil conserva `NOMBRE → CATEGORÍA → HDCP → MARCAS`, pero distribuye cada jugador en dos líneas para evitar truncamiento: Nombre y Categoría arriba; Handicap y Marcas abajo.
- TORNEO LIVE reduce ruido en móvil, prioriza las pestañas de Clasificación/Mi Tablero, oculta instrucciones permanentes y simplifica columnas secundarias.
- La Vista detallada reúne dinámicamente a todos los jugadores que realmente tenga la categoría —por ejemplo 14, 20, 22 o 30— con hoyos 1–18 e indicadores Gross/Neto/resultado, más IN/OUT/TOTAL. No fija ni rellena una cantidad. Mezcla los foursomes y reordena toda la categoría de líder a peor resultado en cada actualización; el grupo sólo queda como referencia secundaria. Es visualización LIVE de sólo lectura; no crea otra tarjeta, archivo, PDF ni historial.
- `test-v406-tournament-categories.mjs` usa 30 jugadores como escenario visual de la categoría más poblada, comprueba además cantidades variables, mezcla de foursomes, orden líder→peor, 18 hoyos, IN/OUT/TOTAL y capacidad total de 100 participantes.
- Se agregó `test-v406-r2-professional-design.mjs` como candado contra el regreso a controles diminutos o la retícula comprimida.
- Capacidad comercial protegida: hasta 6 jugadores por tarjeta/grupo y máximo 100 jugadores activos por torneo. `api/live.js` bloquea el torneo dentro de la misma transacción tanto al publicar como al unir un grupo y rechaza al jugador 101 con `409 LIVE_TOURNAMENT_CAPACITY_REACHED`.
- `DATABASE_ARCHITECTURE.md` formaliza que categorías, clasificación y detalle son proyecciones de sólo lectura sobre snapshots LIVE; no crean tablas, tarjetas ni un segundo escritor.
- La cabecera de cada categoría muestra automáticamente fecha de Guatemala, nombre del torneo y modalidad; la categoría domina visualmente. Su clasificación inmediata usa `POS · NOMBRE · HDCP · MARCAS · GROSS · NETO · +/−` y el detalle por hoyo queda debajo.

## V406-R1 LAB candidato · Categorías y TORNEO LIVE · 7 de septiembre de 2026

- Registro incorpora `CATEGORÍA` inmediatamente después de `NOMBRE`, antes de `HDCP`, para cada jugador.
- Catálogo: Campeonato, A, B, C, D, Femenina, Senior y S.Senior; obligatorio cuando existe torneo y opcional fuera de torneo.
- La categoría viaja dentro del jugador por ronda, persistencia, snapshot oficial, tarjeta digital y LIVE.
- TORNEO LIVE crea un índice interno por categoría, permite llamar una clasificación aislada y buscar por jugador, grupo o categoría.
- `MI TABLERO` conserva una selección personal de jugadores de distintas categorías para el caso familiar o grupo de predilección.
- La pantalla principal no recibe controles adicionales; el análisis masivo queda en la página independiente TORNEO LIVE.
- Se separó `ATRÁS` de `ACTUALIZAR` en el Registro móvil. MAIN/Producción permanece congelado.

## V405-R4 LAB estable · cierre de prueba ACTUALIZAR y Toolbar apagada · 7 de septiembre de 2026

- Retira la identificación temporal R3 y publica `V405-R4-LAB-STABLE-20260907` con caché `v405-r4-lab-stable`.
- Evidencia física del propietario: `ACTUALIZAR` detectó sin refresco, se mostró verde/parpadeante y, al pulsarlo, instaló R3 y volvió a oscuro.
- Evidencia física del propietario: `BORRAR TODO` funcionó correctamente en Registro iPhone.
- Configuración Vercel del proyecto `epg-caddy`: Toolbar `Off` en Preview/Preproducción y Producción conservada en `Default`; requiere este deployment LAB nuevo para entrar en vigor.
- MAIN permanece intacta.

## V405-R3 LAB · prueba física del parpadeo ACTUALIZAR · 7 de septiembre de 2026

- `index-grupal.html`: identificación `V405-R3-LAB-UPDATE-BLINK-TEST-20260907` para que V405-R2 detecte automáticamente la actualización y active el botón verde/parpadeante.
- `service-worker.js`: caché `v405-r3-update-blink-test`.
- `test-v365-active-round-empty-recovery.mjs`: fija ambos identificadores y conserva detección automática, `persist()` y actualización en el mismo dominio.
- Prueba temporal sólo en LAB; no cambia lógica, sesión, jugadores, scores, historial, voz ni MAIN.

![ROADMAP OVERALL · Golf Score Card GT](ROADMAP_OVERALL_V291.png)

## V332 · moneda dual y matriz completa de seguimiento

El propietario exige que Skins, Wolf, Vegas y Dots permitan elegir antes de la ronda una de dos monedas: **quetzales (`Q`/`GTQ`) o dólares (`$`/`USD`)**. Cada juego presenta dos casillas de radio mutuamente excluyentes; elegir una desmarca la otra. La moneda queda guardada en la configuración y viaja sin conversión por pantalla, voz, snapshot, corrección, tarjeta Global/personal, Historial, sincronización, restauración y liquidación. El valor es opcional para el grupo y nunca altera Gross, Neto ni el resultado deportivo.

V332 homologa la arquitectura visible de los cuatro juegos para que un jugador sin experiencia no reciba sólo un saldo final. La matriz común incluye estado y hoyos resueltos/pendientes, unidades o puntos acumulados, carry abierto, registros, dinero bruto movido, neto exacto a liquidar, líder o empate, saldos individuales y quién paga a quién. Cada juego añade su riesgo útil: mayor pozo Skins; exposición del Wolf por rival y hoyo; mayor cambio y riesgo máximo por duelo Vegas; e impacto de un punto por jugador en Dots. La tarjeta final conserva los mismos acumulados para auditoría.

Los bancos `test-v329-skins.mjs` y `test-v330-side-games.mjs` verifican las ocho casillas Q/$, exclusividad nativa, normalización de moneda, símbolos, métricas, cero-suma, persistencia, corrección y artefactos. La auditoría integral aprobó **89 paquetes**, **325 fuentes** y tres inventarios PDF sellados en V332. El corte visible es `V332-DUAL-CURRENCY-MATRIX-20260826` y la copia instalable usa `gscg-mobile-v332-dual-currency-matrix`. Producción permanece intacta; falta publicar el Preview y aprobar la prueba física en iPhone antes de cualquier montaje.

Archivos exactos V332: `skins.js`, `wolf.js`, `vegas.js`, `dots.js`, `index-grupal.html`, `card-artifacts.js`, `test-v329-skins.mjs`, `test-v330-side-games.mjs`, `service-worker.js`, los bancos que fijan build/caché, `scripts/update-inventory-v328.py`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_DID_017_FICHAS_MODALIDADES_PARA_APRENDER.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.

## V331 · matriz investigada de apuestas y lenguaje operativo

La prueba física de **V330-R3 quedó aprobada en iPhone**: al tocar `WOLF`, únicamente Wolf permaneció verde, `RONDA NORMAL` se desmarcó y la configuración correcta se abrió. El defecto de selección doble queda cerrado; Producción continúa intacta y `PEND-SKI-006` sigue abierto para validar el funcionamiento completo de cada juego.

El nuevo `PEND-DID-017` exige una ficha independiente por cada modalidad y esquema: Ronda Normal, Stableford, Match Play, Four Ball, Práctica, Skins, Wolf, Vegas, Dots y variantes que cambian el cálculo. Cada hoja deberá ser comprensible a los 10 años, funcionar impresa en blanco y negro, incluir un ejemplo aritmético completo, estrategia, estados, acumulados, liquidación y glosario. La edad define sólo la claridad didáctica: el dinero permanece siempre dentro del alcance general de cada hoja y cada grupo decide si lo liquida o juega únicamente con puntos/unidades. La especificación vive en `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_DID_017_FICHAS_MODALIDADES_PARA_APRENDER.md`.

V331 sustituye la presentación mínima de apuestas por una matriz operativa investigada. Wolf elimina la duplicidad confusa `Solo base`/`Lone` y conserva tres decisiones comprensibles: **Con pareja**, **Lobo solitario** y **Lobo ciego**. Registra si el Wolf sale primero o último, multiplicadores configurables, tope monetario por rival/hoyo, riesgo del Wolf, decisiones y scores pendientes, acumulados, unidades netas, dinero movido y liquidación. Vegas explica cómo 4 y 5 forman 45, maneja correctamente scores de 10 o más —10 y 4 forman 104—, permite acordar qué ocurre si ambas parejas hacen birdie y muestra por hoyo números, volteos, águilas, topes, puntos movidos y saldos. Dots define cada término en español, mantiene apagadas las variantes que pueden duplicar eventos, separa puntos positivos/negativos, manuales/automáticos y muestra el detalle de cada hoyo.

Las reglas universales no se inventan: las diferencias reales entre grupos quedan configurables y rotuladas. La base investigada utiliza 18Birdies y Wolf Golf Scorecard para Wolf; Mashie, 18Birdies y Golf Digest para Vegas; 18Birdies, MyScorecard y SCGA para Dots/Junk; USGA se conserva como autoridad del hándicap y score deportivo. El dinero nunca modifica el score oficial.

Archivos exactos V331: `wolf.js`, `vegas.js`, `dots.js`, `index-grupal.html`, `card-artifacts.js`, `test-v330-side-games.mjs`, `service-worker.js`, `scripts/update-inventory-v328.py`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` y los bancos que fijan el identificador de build/caché. El corte visible es `V331-RESEARCHED-SIDE-GAMES-20260826` y la copia instalable usa `gscg-mobile-v331-researched-side-games`.

## V330 · Skins, Wolf, Vegas, Dots y seis jugadores

**Hotfix V330-R3 después de rechazo físico:** la captura real de iPhone demostró que al elegir `WOLF` todavía podían quedar verdes `RONDA NORMAL` y `WOLF`. V330-R2 queda rechazada. R3 incorpora un único escritor visual para las siete opciones, limpia configuraciones laterales múltiples heredadas, desmarca las otras seis antes de reconstruir la pantalla y vuelve a validar después del render. La caché instalable sube a `gscg-mobile-v330-side-games-r3`; `test-v330-side-games.mjs` simula exactamente el toque WOLF y exige `false` en Normal, Match Play, Four Ball, Skins, Vegas y Dots, con `true` únicamente en Wolf.

**Pendientes registrados:** `PEND-UBI-015` separa la detección automática del campo por GPS de clima/tráfico y de las distancias al green; `PEND-RSG-016` define la sincronización versionada de Reglas de Golf desde fuentes oficiales. Se crean las especificaciones `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_UBI_015_DETECCION_CAMPO_POR_GPS.md` y `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_RSG_016_SINCRONIZACION_REGLAS_GOLF.md`, y se actualizan `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md` y `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`.

**Voz pospuesta y registrada:** `PEND-VOZ-003` incorpora tres observaciones físicas nuevas sin declararlas implementadas: matriz obligatoria para respuestas estudiadas, profundas y formales; corrección del corte observado en la quinta conversación; y avisos bilaterales exactos `ESCUCHANDO` / `RESPONDIENDO` en rojo parpadeante. Por orden del propietario, la ejecución vuelve primero a la configuración y prueba de SKINS, WOLF, VEGAS y DOTS.

El **26 de agosto de 2026** `PEND-SKI-006` pasa de diseño a implementación comprobable. `skins.js`, `wolf.js`, `vegas.js` y `dots.js` son motores puros conectados al score oficial, no menús de respuestas fijas. La ventana de opciones se divide en dos columnas —modalidades existentes a la izquierda y juegos nuevos a la derecha— y la pantalla principal de la tarjeta conserva su formato.

Skins opera Gross/Neto para dos a seis jugadores con unidad monetaria, carry, división o anulación de empates. Wolf rota decisiones para tres a seis jugadores y no permite cierre con hoyos sin pareja/Solo/Lone/Blind. Vegas trabaja con cuatro o seis jugadores; la variante de seis usa tres parejas y comparaciones par a par. Dots permite activar y valorar eventos antes de jugar, mantiene apagadas por defecto las reglas de grupo `Amigo`, izquierda y derecha, y separa el saldo económico del score deportivo. Match Play y Four Ball se amplían a las parejas Verde, Oro y Azul.

El cierre, corrección oficial, tarjetas Global/personales, Historial, consultas, sincronización y restauración conservan los cuatro resultados en el snapshot firmado. `test-v329-skins.mjs` y `test-v330-side-games.mjs` cubren empates, X, límites, multiplicadores, tres parejas, cero-suma, bloqueo de cierre Wolf, corrección, artefactos, voz y persistencia. El banco local y el build real de Vercel aprobaron los 89 paquetes, el inventario de 322 fuentes, cero vulnerabilidades y la puerta viva de Reglas con modelo, búsqueda web, seis fuentes oficiales y `scoreChanged:false`. El Preview `dpl_4k5V9rFwkVXVwuRwktBjtgG4arAv` quedó `READY` desde el commit remoto `ea18aafb214731d44b41ea069fe27228407f9f47`. Producción permanece intacta; faltan revisión visual/táctil y ronda física en iPhone.

Referencias profesionales consultadas: BirdieBet y Squabbit para Vegas; Wiz Golf, FLOG, Squabbit y Golf Monthly para Wolf; The 1st Tee para Dots. Las variantes que no son universales quedan rotuladas como reglas de grupo o adaptación Golf Score Card GT.

Archivos funcionales V329/V330: `skins.js`, `wolf.js`, `vegas.js`, `dots.js`, `match-play.js`, `four-ball.js`, `index-grupal.html`, `round-closure.js`, `card-artifacts.js`, `card-library.js`, `historical-analytics.js`, `master-data-sync.js`, `account-backup.js`, `service-worker.js`, `scripts/build-mobile-web.mjs`, `vercel.json`, `audit-project.mjs`, `test-v329-skins.mjs` y `test-v330-side-games.mjs`. La documentación, mapa, ambos ROADMAP, tres inventarios PDF y su sello se actualizan antes de Preview.

## V328-R2 · Centro de Reglas de Golf oficial con respaldo básico sin conexión

El **26 de agosto de 2026** comienza la ejecución funcional de `PEND-REG-001`. La misma AI UNIVERSAL ∞ incorpora un acceso global `REGLAS`, acepta situaciones por teclado o micrófono, conserva campo y modalidad como contexto y consulta el modelo avanzado mediante `/api/golf-rules`. La herramienta limita técnicamente la Web a los dominios oficiales `usga.org` y `randa.org`, exige una fuente oficial visible y usa la edición Rules of Golf 2023 con las clarificaciones vigentes; el corte comprobado es 1 de julio de 2026. No se copia el reglamento completo ni se afirma una alianza, licencia de marca o API privada.

La consulta se aísla de todos los escritores locales: dentro de REGLAS no se ejecutan órdenes de score y la respuesta nunca aplica penalidades, concede hoyos ni cierra rondas. `test-v328-official-golf-rules.mjs` cubre 15 situaciones y comprueba dominios, contexto, texto/voz y `scoreChanged:false`. El Preview V328-R1 (`dpl_3Sa4NnueMXBqB2kCm69WdwhH83bv`) quedó `READY` con 86 paquetes, puerta viva aprobada y árbol remoto exacto `f0de0f6328c34ed2788faf1009ba04a19f47e6c1`. `test-v328-live-official-rules.mjs` se ejecuta dentro de cada build Vercel y exige una llamada real del modelo, búsqueda web efectiva, al menos una fuente USGA/The R&A y cero cambio de score.

V328-R2 agrega `golf-rules-offline.js`: guarda únicamente respuestas que ya aprobaron el filtro oficial, retiene hasta 24 entradas durante 90 días, conserva tokens normalizados en vez de la pregunta completa, exige coincidencia suficiente y modalidad compatible, muestra la fecha y nunca inventa si no existe una respuesta adecuada. `test-v328-offline-official-rules.mjs` comprueba fuente, privacidad, límite, caducidad, cruces negativos, integración PWA y cero escritura. Con este paquete la auditoría maestra sube a 87 paquetes más la puerta viva de Vercel. El manual visible y sus dos PDF conservan 74 páginas, página 73 actualizada, 2160 × 4320 px y 300 dpi; el control visual completo debe aprobar antes de entregar. `PEND-REG-001` continúa abierto sólo para voz física y una eventual integración comercial/licenciada; no se declara alianza oficial.

Archivos exactos V328: `api/golf-rules.js`, `audit-project.mjs`, `index-grupal.html`, `service-worker.js`, `manual.html`, `scripts/update-manual-page-73.py`, `docs/manual/v311/manual-pages-17-35.json`, `docs/manual/v311/page-73.png`, `docs/manual/v311/Manual_Golf_Score_Card_GT_COMPLETO.pdf`, `docs/manual/v311/Manual_de_Funciones_Golf_Score_Card_GT_01-16.pdf`, `test-v328-official-golf-rules.mjs`, `test-v327-tool-followup-no-silence.mjs`, `test-v326-no-silent-conversation.mjs`, `test-v325-ideal-microphone-timings.mjs`, `test-v324-real-traffic.mjs`, `test-v323-long-multitopic-context.mjs`, `test-v322-real-sustained-caddie.mjs`, `test-v312-general-caddie.mjs`, `test-v307-match-arrows-format.mjs`, `test-v305-history-navigation-zero-error.mjs`, `test-v304-homogeneous-registration-actions.mjs`, `test-v290-brand-icons-cleanup.mjs`, `test-v284-native-package-generation.mjs`, `test-v281-pwa-installation.mjs`, `test-v280-local-history-insights.mjs`, `test-v279-local-card-library.mjs`, `test-v278-card-image-pdf-export.mjs`, `test-v277-official-round-corrections.mjs`, `test-v276-manual-hole-navigation.mjs`, `test-v275-stable-live-voice-turns.mjs`, `test-v274-complete-courses-voice-operations.mjs`, `test-v272-definitive-operational-release.mjs`, `test-stableford-ui.mjs`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`. Los tres inventarios PDF externos se regeneran y verifican antes del build.

Archivos adicionales del cierre V328-R1: `test-v328-live-official-rules.mjs` agrega la puerta real y `vercel.json` la vuelve obligatoria. Archivos adicionales V328-R2: `golf-rules-offline.js`, `test-v328-offline-official-rules.mjs`, `test-v321-ai-universal-infinity.mjs`, `service-worker.js`, `index-grupal.html`, `audit-project.mjs`, `scripts/update-manual-page-73.py`, `docs/manual/v311/manual-pages-17-35.json`, los artefactos de manual, `scripts/update-inventory-v328.py`, los cuatro documentos de control, el candado y ambos ROADMAP.

## Actualización de control V327-R1-PEND · cola completa y ejecución permanente

El **26 de agosto de 2026** el propietario ordena agregar y adaptar todos los pendientes, continuar sin solicitar autorizaciones intermedias y montar cada versión cuando esté realmente probada. La instrucción no elimina las puertas de calidad: un solo `FAIL` conserva Producción intacta y ninguna licencia, credencial, contrato o integración externa puede simularse. Las reglas permanentes 22–26 prohíben trasladarle trabajo técnico que las herramientas puedan resolver, dejarlo adivinando la siguiente acción, simular trabajo en segundo plano o exigirle mensajes repetidos de `sigue`; todo reporte debe cerrar con una asignación inequívoca.

La cola vigente distingue lo entregado de lo abierto y agrega los faltantes expresamente acordados: hándicap oficial ASOGOLF/GHIN con índice interno separado; campos mundiales con datos oficiales; GPS deportivo por hoyo; Skins, Wolf, Vegas, Amigo, izquierda/derecha y Dots con unidad en quetzales; Apple Watch primero y Wear OS después; nube, cuentas, seguridad, estadísticas avanzadas, monetización y certificación integral. Permanecen además USGA/Reglas de Golf, clima completo en artefactos, Guía Rápida, tráfico comparado y AI UNIVERSAL ∞.

V327-R1 ya aprobó en Preview 85 paquetes, 310 fuentes, 44 llamadas reales, 24 materias, ocho turnos con memoria, 550 transiciones herramienta→voz y cero errores 5xx. La puerta inmediata sigue siendo una conversación física prolongada en iPhone; sólo después de su PASS se permite montar y continuar automáticamente con el siguiente pendiente ejecutable.

Archivos exactos V327-R1-PEND: `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/DIRECTRICES_MANDATORIAS.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`. También se regeneran y verifican `Inventario_Golf_Score_Card_GT_OVERALL_V311.pdf`, `Inventario_Golf_Score_Card_GT_A_DETALLE_V311.pdf` e `Inventario_Golf_Score_Card_GT_POR_IMAGENES_Y_RUBROS_V311.pdf`.

## Corrección controlada V327 · la herramienta siempre regresa a la voz

La prueba física rechazó V326-R2 después de aproximadamente seis preguntas: una investigación sobre una persona conocida en Colima y una consulta de tráfico podían completar su API con HTTP 200, pero el teléfono quedaba rojo escuchando sin pronunciar el resultado. No era un vocabulario temático reducido: `search_live_web` sí recibió la consulta y devolvió datos; el corte estaba en la transición asíncrona `herramienta → segunda respuesta → audio` de Realtime en iPhone.

V327 conserva la AI universal sin catálogo y corrige cuatro estados: `speech_stopped` mantiene el guardián hasta la transcripción final; un `output_audio_buffer.stopped` tardío y sin identificador ya no desautoriza el audio final antes de que empiece; la reproducción conserva un guardián de 60 segundos hasta su cierre; y una herramienta cuyo canal se perdió produce recuperación visible en vez de regresar en silencio. `api/voice-health.js` registra únicamente eventos técnicos permitidos, número de turno, etapa y tiempo —nunca preguntas, transcripciones, nombres, ubicaciones ni claves— para que una nueva anomalía física sea diagnosticable.

El banco dirigido ejecuta 550 secuencias herramienta→voz, 100 eventos de privacidad, 30 turnos bilaterales y las rutas anteriores. La consulta directa `El Pulté Golf → Pradera Concepción` devolvió una ruta real válida de 15 km y aproximadamente 33 minutos en el instante de prueba; un destino que sólo diga `Concepción` debe provocar una sola pregunta breve de aclaración. Producción continúa intacta y V327 no queda autorizada para montaje hasta terminar la regresión completa, desplegar Preview y aprobar otra conversación física prolongada en iPhone.

Archivos exactos V327: `index-grupal.html`, `api/_lib/traffic.js`, `api/universal-ai.js`, `api/voice-health.js`, `service-worker.js`, `audit-project.mjs`, `test-v327-tool-followup-no-silence.mjs`, `test-v326-no-silent-conversation.mjs`, `test-v325-ideal-microphone-timings.mjs`, `test-v324-real-traffic.mjs`, `test-v323-long-multitopic-context.mjs`, `test-v322-real-sustained-caddie.mjs`, `test-v312-general-caddie.mjs`, `test-stableford-ui.mjs`, `test-v272-definitive-operational-release.mjs`, `test-v274-complete-courses-voice-operations.mjs`, `test-v275-stable-live-voice-turns.mjs`, `test-v276-manual-hole-navigation.mjs`, `test-v277-official-round-corrections.mjs`, `test-v278-card-image-pdf-export.mjs`, `test-v279-local-card-library.mjs`, `test-v280-local-history-insights.mjs`, `test-v281-pwa-installation.mjs`, `test-v284-native-package-generation.mjs`, `test-v290-brand-icons-cleanup.mjs`, `test-v304-homogeneous-registration-actions.mjs`, `test-v305-history-navigation-zero-error.mjs`, `test-v307-match-arrows-format.mjs`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`.

## Control de entrega V326-R1 · redespliegue para cargar tráfico

El usuario confirmó que la credencial de tráfico podría haber quedado habilitada. El despliegue V326 original no se reutiliza para aprobarla porque las variables de entorno se fijan al construir cada deployment. Se provocó un redespliegue sin modificar el código funcional; el primer intento quedó correctamente bloqueado por `ROADMAP GATE` al no registrar el movimiento en ambos ROADMAPS. V326-R1 registra ese intento, conserva producción V322 intacta y ordena construir de nuevo Preview antes de ejecutar la ruta real El Pulté → colonia Oakland zona 10 para mañana a las 12:30 PM.

La aprobación continúa prohibida hasta que el nuevo Preview devuelva ETA, duración sin tráfico, demora, distancia y hora de cálculo desde Google Maps Routes, y hasta completar la conversación física prolongada en iPhone. Archivos exactos V326-R1: `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.

La primera construcción documentada de V326-R1 confirmó que `GOOGLE_MAPS_API_KEY` ya estaba presente en Preview: el test de ausencia recibió `TRAFFIC_ROUTE_UNAVAILABLE` en vez de `TRAFFIC_NOT_CONFIGURED`. El bloqueo pertenecía al aislamiento del test, que pasaba una cadena vacía y permitía por error el fallback hacia la credencial real. Se sustituyó únicamente ese valor inyectado por espacio en blanco, que se recorta a vacío sin consultar la red; la lógica funcional de tráfico permanece idéntica.

## Corrección controlada V326 · ningún turno puede quedar rojo y mudo

La prueba física en iPhone rechazó V325: después de preguntas sobre tráfico futuro y consumo eléctrico, el micrófono permanecía rojo y abierto sin producir una reacción. Los registros confirmaron que WebRTC sí abría, pero el cierre del turno no alcanzaba las herramientas ni la respuesta. La causa fue `semantic_vad` con urgencia baja sin un límite temporal anterior a `speech_stopped`; el watchdog existente comenzaba demasiado tarde y no podía recuperar ese estado.

V326 usa para conversación un `server_vad` independiente con umbral 0.2, prefijo de 700 ms y 2,200 ms de silencio. Es más paciente que las órdenes de la aplicación, que conservan 1,000 ms, pero siempre posee un final determinista. Un guardián de entrada se renueva con los deltas parciales y, si no existe ningún evento durante 15 segundos, desmonta la captura atascada y apaga el rojo con una instrucción visible; mantiene un límite duro de 90 segundos por turno. Un segundo guardián recupera a los 30 segundos una respuesta del modelo que no haya comenzado. Los cálculos estables y aproximados, como el consumo eléctrico de un aire acondicionado, se responden directamente con supuestos en vez de abrir una búsqueda web innecesaria.

`test-v326-no-silent-conversation.mjs` ejecuta la máquina de temporizadores y comprueba recuperación real de estado, además de 30 alternancias entre conversación y órdenes. V325 queda rechazada y V326 continúa sin autorización de montaje hasta repetir las dos preguntas exactas y una conversación física prolongada en iPhone. Tráfico tampoco queda aprobado mientras Preview responda `TRAFFIC_NOT_CONFIGURED` y falte la comparación simultánea en Guatemala.

Archivos exactos V326: `index-grupal.html`, `service-worker.js`, `audit-project.mjs`, `test-v326-no-silent-conversation.mjs`, `test-v325-ideal-microphone-timings.mjs`, `test-v324-real-traffic.mjs`, `test-v323-long-multitopic-context.mjs`, `test-v322-real-sustained-caddie.mjs`, `test-v312-general-caddie.mjs`, `test-stableford-ui.mjs`, `test-v272-definitive-operational-release.mjs`, `test-v274-complete-courses-voice-operations.mjs`, `test-v275-stable-live-voice-turns.mjs`, `test-v276-manual-hole-navigation.mjs`, `test-v277-official-round-corrections.mjs`, `test-v278-card-image-pdf-export.mjs`, `test-v279-local-card-library.mjs`, `test-v280-local-history-insights.mjs`, `test-v281-pwa-installation.mjs`, `test-v284-native-package-generation.mjs`, `test-v290-brand-icons-cleanup.mjs`, `test-v304-homogeneous-registration-actions.mjs`, `test-v305-history-navigation-zero-error.mjs`, `test-v307-match-arrows-format.mjs`, `GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`.

## Integración controlada V325 · tiempos ideales del micrófono bilateral

V325 separa por intención los tiempos de escucha. Las órdenes de registro, navegación y score conservan `server_vad` con umbral 0.2, prefijo de 700 ms y 1,000 ms de silencio para respuesta rápida. AI UNIVERSAL ∞ cambia a `semantic_vad` con urgencia baja, por lo que una pausa natural no corta automáticamente la idea. La sesión valida el perfil confirmado antes de responder, serializa cambios concurrentes y vuelve al perfil operativo cuando detecta una acción propia de la tarjeta.

La conversación conserva micrófono vivo durante la respuesta, interrupción confirmada después de 250 ms y ocho caracteres, protección de eco por 1,800 ms, reescucha inmediata, watchdog de diez segundos y cierre únicamente tras 30 minutos completos sin actividad. La prueba V325 compila el JavaScript completo y simula 30 alternancias conversación/orden. Esto no sustituye la conversación física prolongada en iPhone; el corte sigue sin autorización de montaje. También quedan registrados como pendientes el enlace oficial/autorizado con USGA y Reglas de Golf, la modalidad Skins y Apple Watch/Wear OS.

Archivos exactos V325: `index-grupal.html`, `service-worker.js`, `audit-project.mjs`, `test-v325-ideal-microphone-timings.mjs`, `test-v324-real-traffic.mjs`, `test-v323-long-multitopic-context.mjs`, `test-v322-real-sustained-caddie.mjs`, `test-v312-general-caddie.mjs`, `test-stableford-ui.mjs`, `test-v272-definitive-operational-release.mjs`, `test-v274-complete-courses-voice-operations.mjs`, `test-v275-stable-live-voice-turns.mjs`, `test-v276-manual-hole-navigation.mjs`, `test-v277-official-round-corrections.mjs`, `test-v278-card-image-pdf-export.mjs`, `test-v279-local-card-library.mjs`, `test-v280-local-history-insights.mjs`, `test-v281-pwa-installation.mjs`, `test-v284-native-package-generation.mjs`, `test-v290-brand-icons-cleanup.mjs`, `test-v304-homogeneous-registration-actions.mjs`, `test-v305-history-navigation-zero-error.mjs`, `test-v307-match-arrows-format.mjs`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`.

## Integración controlada V324 · tráfico real dentro de AI UNIVERSAL ∞

V324 incorpora tráfico vehicular actual y proyectado a la misma conversación universal. Una consulta por voz o texto se clasifica como tráfico, obtiene origen escrito o GPS efímero, exige destino suficiente y llama desde servidor a Google Maps Routes con `TRAFFIC_AWARE_OPTIMAL`. La respuesta separa los datos del proveedor —ETA, duración sin tráfico y distancia— de la clasificación de congestión derivada. No muestra mapa, no devuelve coordenadas y no afirma integración con Waze.

La prueba V324 cubre salida inmediata y futura, huso horario, ETA, demora, distancia, privacidad, origen faltante, destino faltante, credencial ausente, proveedor caído, timeout, solicitud automática de GPS, función de modelo en dos pasos, texto, voz y continuidad recuperable. Este corte es código candidato: permanece expresamente sin aprobación de montaje hasta activar credencial/facturación y completar en Guatemala la comparación simultánea contra Waze y la conversación prolongada en iPhone.

Archivos exactos V324: `api/_lib/traffic.js`, `api/traffic.js`, `api/universal-ai.js`, `index-grupal.html`, `service-worker.js`, `audit-project.mjs`, `test-v324-real-traffic.mjs`, `test-v323-long-multitopic-context.mjs`, `test-v322-real-sustained-caddie.mjs`, `test-v321-ai-universal-infinity.mjs`, `test-v312-general-caddie.mjs`, `test-stableford-ui.mjs`, `test-v272-definitive-operational-release.mjs`, `test-v274-complete-courses-voice-operations.mjs`, `test-v275-stable-live-voice-turns.mjs`, `test-v276-manual-hole-navigation.mjs`, `test-v277-official-round-corrections.mjs`, `test-v278-card-image-pdf-export.mjs`, `test-v279-local-card-library.mjs`, `test-v280-local-history-insights.mjs`, `test-v281-pwa-installation.mjs`, `test-v284-native-package-generation.mjs`, `test-v290-brand-icons-cleanup.mjs`, `test-v304-homogeneous-registration-actions.mjs`, `test-v305-history-navigation-zero-error.mjs`, `test-v307-match-arrows-format.mjs`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`.

## Corrección operativa V323 · conversación multitema prolongada

V323 corrige una pérdida de contexto reproducida en producción: la comunicación continuaba, pero al turno 15 AI UNIVERSAL ∞ ya no recordaba una clave expresamente indicada al inicio. El límite efectivo era de 8 intercambios para texto y sólo 3 para el contexto compartido con voz. Ahora texto, voz y servidor conservan hasta 80 mensajes —40 intercambios completos—, suficiente para la nueva prueba de 30 temas y 63 mensajes sin perder `ORQUÍDEA 47`.

La prueba `test-v323-long-multitopic-context.mjs` reproduce cambios consecutivos entre lluvia, salud, viajes, medicamentos, golf, tecnología, cocina, filosofía, ciencias, idiomas y otros temas; exige que el primer dato siga disponible en la última pregunta, valida la misma memoria en texto y voz, y comprueba el descarte controlado únicamente al superar 80 mensajes.

Archivos V323: `api/universal-ai.js`, `index-grupal.html`, `service-worker.js`, `audit-project.mjs`, `test-v323-long-multitopic-context.mjs`, `test-v322-real-sustained-caddie.mjs`, `test-v312-general-caddie.mjs`, `test-stableford-ui.mjs`, `test-v272-definitive-operational-release.mjs`, `test-v274-complete-courses-voice-operations.mjs`, `test-v275-stable-live-voice-turns.mjs`, `test-v276-manual-hole-navigation.mjs`, `test-v277-official-round-corrections.mjs`, `test-v278-card-image-pdf-export.mjs`, `test-v279-local-card-library.mjs`, `test-v280-local-history-insights.mjs`, `test-v281-pwa-installation.mjs`, `test-v284-native-package-generation.mjs`, `test-v290-brand-icons-cleanup.mjs`, `test-v304-homogeneous-registration-actions.mjs`, `test-v305-history-navigation-zero-error.mjs`, `test-v307-match-arrows-format.mjs`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`.

## Corrección operativa V322 · conversación sostenida y recuperación comprobable

V322 integra sin perder la AI UNIVERSAL ∞ de V321 la corrección del fallo observado en iPhone: el micrófono ya no se cierra tres segundos después de una respuesta ni destruye una sesión WebRTC sana al tocarlo nuevamente. La escucha permanece activa entre turnos y sólo se apaga después de 30 minutos completos sin actividad. Si falta una transcripción final, Inicio y Tarjeta salen del estado bloqueado y regresan a `● ESCUCHANDO`.

La investigación web dispone de 40 segundos en servidor y 45 segundos en cliente. Éxito, timeout, proveedor no disponible o respuesta vacía producen siempre una salida utilizable; un fallo recuperable no apaga el transporte de voz ni deja al usuario sin respuesta. `test-v322-real-sustained-caddie.mjs` simula 24 turnos consecutivos, reapertura, cierre reglamentario y los distintos resultados del servicio; la auditoría maestra conserva además las 200 áreas y las modalidades completas.

Archivos: `index-grupal.html`, `api/research.js`, `service-worker.js`, `audit-project.mjs`, `test-v322-real-sustained-caddie.mjs`, `test-v321-ai-universal-infinity.mjs`, `test-v312-general-caddie.mjs`, los candados de build/caché, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md`.

## Actualización operativa V321 · AI UNIVERSAL ∞

AI UNIVERSAL ∞ queda integrada mediante API de modelo avanzado, con voz y texto, contexto temporal compartido, búsqueda Web para datos cambiantes, idioma automático, respuesta escrita y hablada, separación entre órdenes locales y consultas generales, y controles `ESCUCHAR`, `DETENER`, `REPETIR`, `SILENCIAR` y `CONTINUAR`. Las 200 áreas verificadas son pruebas, nunca una lista límite. El Manual conserva la portada como primera página y documenta la función en la página 73.

Revisión final publicada: el índice y el encabezado del visor nombran la página 73 como **AI UNIVERSAL ∞**, y la prueba V321 bloquea cualquier regreso al título anterior.

| Archivo | Registro V321 |
|---|---|
| `api/universal-ai.js` | Endpoint real de AI UNIVERSAL ∞ con Responses API, modelo avanzado, contexto, Web, fuentes y `store:false`. |
| `api/session-grupal.js` | Realtime conserva Golf y habilita detección automática del idioma hablado. |
| `index-grupal.html` | Panel AI ∞, teclado, respuestas escritas, contexto voz-texto, clasificación orden/pregunta y cinco controles. |
| `service-worker.js` | Caché V321 para entregar inmediatamente la integración. |
| `audit-project.mjs` | Incorpora la batería obligatoria V321. |
| `test-v321-ai-universal-infinity.mjs` | Verifica API real, 200 áreas sin lista cerrada, texto, voz, contexto, Web y controles. |
| `test-v267-one-operational-line.mjs` | Alinea el contrato de transcripción con idioma automático. |
| `test-v271-realtime-prompt-limit.mjs` | Conserva el límite Realtime con idioma automático. |
| `test-v312-general-caddie.mjs` | Amplía la verificación universal a idioma automático y caché V321. |
| `test-stableford-ui.mjs` | Alinea el build esperado con V321. |
| `test-v272-definitive-operational-release.mjs` | Alinea el build esperado con V321. |
| `test-v274-complete-courses-voice-operations.mjs` | Alinea el build esperado con V321. |
| `test-v275-stable-live-voice-turns.mjs` | Alinea el build esperado con V321. |
| `test-v276-manual-hole-navigation.mjs` | Alinea el build esperado con V321. |
| `test-v277-official-round-corrections.mjs` | Alinea el build esperado con V321. |
| `test-v278-card-image-pdf-export.mjs` | Alinea el build esperado con V321. |
| `test-v279-local-card-library.mjs` | Alinea el build esperado con V321. |
| `test-v280-local-history-insights.mjs` | Alinea el build esperado con V321. |
| `test-v281-pwa-installation.mjs` | Alinea la caché instalable esperada con V321. |
| `test-v284-native-package-generation.mjs` | Alinea el paquete web esperado con V321. |
| `test-v290-brand-icons-cleanup.mjs` | Alinea el build esperado con V321. |
| `test-v304-homogeneous-registration-actions.mjs` | Alinea el build esperado con V321. |
| `test-v305-history-navigation-zero-error.mjs` | Alinea el build esperado con V321. |
| `test-v307-match-arrows-format.mjs` | Alinea el build esperado con V321. |
| `GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md` | Registra la especificación y estado operativo de AI UNIVERSAL ∞. |
| `MANUAL_COBERTURA_FUNCIONAL_V311.md` | Ubica AI UNIVERSAL ∞ en la página 73 y su prueba técnica. |
| `docs/manual/v311/manual-pages-17-35.json` | Explicación para un niño de diez años: voz, texto, órdenes, contexto y límites reales. |
| `scripts/update-manual-page-73.py` | Genera la página 73 V321 sin alterar portada ni páginas anteriores. |
| `docs/manual/v311/page-73.png` | Imagen 4K verificada de AI UNIVERSAL ∞. |
| `docs/manual/v311/Manual_Golf_Score_Card_GT_COMPLETO.pdf` | Manual completo actualizado; portada primero y página 73 AI UNIVERSAL ∞. |
| `docs/manual/v311/Manual_de_Funciones_Golf_Score_Card_GT_01-16.pdf` | Alias PDF completo actualizado con el mismo orden correcto. |
| `test-v311-manual-semantic-coverage.mjs` | Exige la explicación V321 y los cinco controles en el Manual. |
| `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` | Sello de inventario recalculado sobre las fuentes V321. |

## Golf Score Card GT

Este es el mapa general y sencillo del proyecto. El nombre comercial único es **Golf Score Card GT**.

Los nombres `EPG-CADDY`, `epg-caddy`, `EPGCaddy` y `com.epgcaddy.app` sólo permanecen como códigos internos antiguos porque cambiarlos rompería enlaces, publicaciones o la identidad futura de las apps. No se muestran como nombre comercial al consumidor.

## Estado actual

- Corte consolidado de este inventario: **V311 · 25 de agosto de 2026**.
- Código oficial GitHub en `main`: `e938fd4d1f1815fdfac3a4babc68c3beedfd96c5`.
- Vercel: **READY**.
- Publicación Vercel vigente: `dpl_FkfVRcQVUK8AnWdgtW5gU6eG9KEh`.
- Aplicación oficial: https://epg-caddy.vercel.app/
- Errores de publicación actuales: **0**.
- Advertencias actuales: **0**.
- Auditoría maestra: **PASS · 69 paquetes**.

## Aplicación Apple y Android

- Nombre visible: **Golf Score Card GT**.
- Identidad técnica compartida: `com.epgcaddy.app`.
- Versión móvil preparada: `0.9.0`.
- Número de paquete preparado: `290`.
- Paquete para iPhone: preparado para Xcode y futura firma.
- Paquete para Android: preparado para Android Studio y futura firma.
- Compras y suscripciones: ruta preparada con RevenueCat.
- Icono App Store: 1024 × 1024.
- Icono Google Play: 512 × 512.
- Iconos PWA: 512 × 512 y 192 × 192.
- Icono de acceso directo Apple: 180 × 180.

## Organización actual

- Archivos activos rastreados en Git al corte V311: **197**.
- Base visual original V292: **160 archivos activos** distribuidos en nueve páginas.
- Continuación documentada después de crear la base visual: **V294 a V311**.
- Corte solicitado para revisión: **desde la línea 160 hacia abajo se considera nuevo**.
- Archivos de la colección `ROADMAP_IMAGES`: **22**.
- Archivos históricos retirados del uso diario: **89**.
- Procesos automáticos actuales conservados: **4**.
- Ramas GitHub inventariadas: **80**.
- Ramas ya incluidas en main: **70**.
- Ramas con cambios propios conservadas: **9**.
- Publicaciones Vercel de la base visual histórica: **622**; los despliegues V306-V311 quedan identificados en la continuación documental.
- Base central preparada: **22 grupos de información**.
- Nombres internos de guardado en el teléfono identificados: **14**.

## Limpieza completada

- Retirados 88 procesos automáticos históricos.
- Retirado un script antiguo V112.
- Todo permanece recuperable en el historial de GitHub.
- El nombre visible EPG Caddy fue sustituido por Golf Score Card GT.
- README, documentación, PWA, Apple, Android y procesos actuales usan la marca oficial.
- Los iconos oficiales quedaron centralizados dentro de `assets/official-logos/`.
- La instalación de Vercel quedó sin errores ni advertencias.

## Mapas detallados

- [ROADMAP A DETALLE · Directorio visual en nueve páginas](ROADMAP_A_DETALLE.md)
- [Mapa de todos los archivos](CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md)
- [Mapa de GitHub, Vercel, Apple, Android y datos](CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_INFRAESTRUCTURA.md)
- [Inventario de publicaciones Vercel](CONTROL_PROYECTO_SCIRE/INVENTARIO_DESPLIEGUES_VERCEL.md)
- [Índice de logos oficiales](assets/official-logos/README.md)

## Imágenes línea por línea

- [01 · Archivos activos](ROADMAP_IMAGES/01_ARCHIVOS_ACTIVOS_COMPLETO.png)
- [02 · Archivos retirados](ROADMAP_IMAGES/02_ARCHIVOS_RETIRADOS_COMPLETO.png)
- [03 · Infraestructura e IDs](ROADMAP_IMAGES/03_INFRAESTRUCTURA_COMPLETO.png)
- [04 · Ramas GitHub](ROADMAP_IMAGES/04_RAMAS_GITHUB_COMPLETO.png)
- [05A · Vercel · publicaciones 1 a 78](ROADMAP_IMAGES/05_VERCEL_01_A_COMPLETO.png)
- [05B · Vercel · publicaciones 79 a 156](ROADMAP_IMAGES/05_VERCEL_01_B_COMPLETO.png)
- [06A · Vercel · publicaciones 157 a 234](ROADMAP_IMAGES/06_VERCEL_02_A_COMPLETO.png)
- [06B · Vercel · publicaciones 235 a 312](ROADMAP_IMAGES/06_VERCEL_02_B_COMPLETO.png)
- [07A · Vercel · publicaciones 313 a 390](ROADMAP_IMAGES/07_VERCEL_03_A_COMPLETO.png)
- [07B · Vercel · publicaciones 391 a 468](ROADMAP_IMAGES/07_VERCEL_03_B_COMPLETO.png)
- [08A · Vercel · publicaciones 469 a 545](ROADMAP_IMAGES/08_VERCEL_04_A_COMPLETO.png)
- [08B · Vercel · publicaciones 546 a 622](ROADMAP_IMAGES/08_VERCEL_04_B_COMPLETO.png)
- [Índice de la colección visual](ROADMAP_IMAGES/README.md)

## Punto de corte del directorio

- Punto de activación original: **línea 183**.
- Registro vigente después de instalar el candado: **línea 185**.
- Activación de seguimiento obligatorio: **23 de agosto de 2026, 17:05:00, hora de Guatemala**.
- Desde este punto, cualquier creación, modificación, cambio de nombre, movimiento o eliminación se registra directamente y dentro de la misma versión en **ROADMAP OVERALL** y **ROADMAP A DETALLE**.

## Registro obligatorio V294 · Candado técnico

| Archivo o modificación | Qué quedó registrado |
|---|---|
| `.github/workflows/ios-build.yml` | La construcción de iPhone exige primero ambos ROADMAPS. |
| `.github/workflows/ios-testflight.yml` | La preparación para TestFlight exige primero ambos ROADMAPS. |
| `.github/workflows/mobile-native-package.yml` | El paquete Apple/Android se bloquea si los ROADMAPS están incompletos. |
| `.github/workflows/roadmap-gate.yml` | Nuevo control automático obligatorio en GitHub. |
| `.github/workflows/stableford-tournament-pass.yml` | Las pruebas de Stableford exigen primero ambos ROADMAPS. |
| `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/DIRECTRICES_MANDATORIAS.md` | Norma permanente, línea de corte y hora de activación. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Códigos y archivos del directorio actualizados. |
| `ROADMAP_IMAGES/ROADMAP_A_DETALLE_01.png` | Página visual 1 de 9. |
| `ROADMAP_IMAGES/ROADMAP_A_DETALLE_02.png` | Página visual 2 de 9. |
| `ROADMAP_IMAGES/ROADMAP_A_DETALLE_03.png` | Página visual 3 de 9. |
| `ROADMAP_IMAGES/ROADMAP_A_DETALLE_04.png` | Página visual 4 de 9. |
| `ROADMAP_IMAGES/ROADMAP_A_DETALLE_05.png` | Página visual 5 de 9. |
| `ROADMAP_IMAGES/ROADMAP_A_DETALLE_06.png` | Página visual 6 de 9. |
| `ROADMAP_IMAGES/ROADMAP_A_DETALLE_07.png` | Página visual 7 de 9. |
| `ROADMAP_IMAGES/ROADMAP_A_DETALLE_08.png` | Página visual 8 de 9. |
| `ROADMAP_IMAGES/ROADMAP_A_DETALLE_09.png` | Página visual 9 de 9. |
| `audit-project.mjs` | La auditoría maestra ejecuta primero el candado. |
| `package.json` | Agrega el comando `roadmap:gate`. |
| `scripts/roadmap-gate.mjs` | Comprueba que cada cambio aparezca en ambos ROADMAPS. |

## Refuerzo técnico V295 · Publicación también bloqueada

| Archivo o modificación | Qué quedó registrado |
|---|---|
| `vercel.json` | Vercel ejecuta obligatoriamente el candado antes de publicar. |
| `scripts/roadmap-gate.mjs` | Si Vercel no puede identificar los cambios, la publicación queda bloqueada por seguridad. |
| `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/DIRECTRICES_MANDATORIAS.md` | La publicación de Vercel se incorpora a la norma permanente. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Registra los códigos y explicaciones actualizados. |
| `ROADMAP_A_DETALLE.md` | Guarda el refuerzo dentro del directorio detallado. |
| `ROADMAP_OVERALL.md` | Guarda el refuerzo dentro de este resumen general. |

## Ajuste de publicación V296 · Salida Vercel

| Archivo o modificación | Qué quedó registrado |
|---|---|
| `vercel.json` | Conserva el candado y señala correctamente la carpeta que Vercel debe publicar. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Actualiza el código y la explicación del ajuste. |
| `ROADMAP_A_DETALLE.md` | Guarda el ajuste dentro del directorio detallado. |
| `ROADMAP_OVERALL.md` | Guarda el ajuste dentro de este resumen general. |

## Actualización operativa V297 · Icono cromado 3D neón y micrófono compacto

Autorización recibida el **24 de agosto de 2026** para instalar como icono oficial la versión cuadrada cromada, con relieve profundo, apariencia de metal troquelado y verde neón muy saturado. También se reduce 50 % el diámetro visible del micrófono de registro y se coloca una figura clara de micrófono en el centro. No cambia su funcionamiento ni su área cómoda de toque.

| Archivo o modificación | Qué queda registrado |
|---|---|
| `7B1C43A7-EB8A-43CB-B03E-0CAE9273F2A2.jpeg` | Fuente cuadrada histórica actualizada con el logo autorizado, conservando su nombre técnico. |
| `assets/logo.png` | Fuente operativa de 1024 × 1024 para los paquetes Apple y Android. |
| `assets/official-logos/README.md` | Identifica la nueva versión cromada 3D como oficial. |
| `assets/official-logos/golf-score-card-gt-app-store-1024.png` | Icono preparado para App Store. |
| `assets/official-logos/golf-score-card-gt-apple-touch-180.png` | Icono preparado para el acceso directo de iPhone y iPad. |
| `assets/official-logos/golf-score-card-gt-google-play-512.png` | Icono preparado para Google Play. |
| `assets/official-logos/golf-score-card-gt-official-master-1254.jpeg` | Copia maestra oficial en máxima medida. |
| `assets/official-logos/golf-score-card-gt-pwa-192.png` | Icono pequeño de la aplicación instalable. |
| `assets/official-logos/golf-score-card-gt-pwa-512.png` | Icono grande de la aplicación instalable. |
| `index-grupal.html` | Micrófono de registro 50 % más pequeño, con símbolo central claro para el usuario nuevo. |
| `mobile-release.json` | Número de paquete preparado actualizado a V297. |
| `service-worker.js` | Caché renovada para entregar el icono V297 y retirar el anterior. |
| `test-v290-brand-icons-cleanup.mjs` | Comprobación operativa alineada con el paquete y la caché V297. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Códigos, tamaños y explicaciones de los archivos actualizados. |
| `ROADMAP_A_DETALLE.md` | Registro detallado obligatorio de esta modificación. |
| `ROADMAP_OVERALL.md` | Registro general obligatorio de esta modificación. |

## Actualización operativa V298 · Instrucciones de registro para newbies

Autorización recibida el **24 de agosto de 2026** para sustituir únicamente los textos situados arriba del micrófono por una guía más grande, alineada a la izquierda y ordenada: **DICTA O ESCRIBE, 1-NOMBRE, 2-HDCP, 3-MARCAS, DE CADA JUGADOR, 4-OK**. El micrófono y el registro conservan exactamente su funcionamiento.

| Archivo o modificación | Qué queda registrado |
|---|---|
| `index-grupal.html` | Muestra la guía para usuarios nuevos en el orden autorizado, a la izquierda y con letra mayor. |
| `mobile-release.json` | Número de paquete preparado actualizado a V298. |
| `service-worker.js` | Caché V298 para entregar inmediatamente las instrucciones nuevas. |
| `test-v290-brand-icons-cleanup.mjs` | Comprueba el texto, orden, alineación, tamaño, paquete y caché V298. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Actualiza códigos, tamaños y explicaciones sencillas. |
| `ROADMAP_A_DETALLE.md` | Registro detallado obligatorio de V298. |
| `ROADMAP_OVERALL.md` | Registro general obligatorio de V298. |

## Corrección operativa V299 · Logo completo dentro del iPhone

Corrección solicitada el **24 de agosto de 2026** después de comprobar la aplicación instalada en iPhone. Se elimina únicamente el exceso de ancho del logo superior y se respeta el espacio de seguridad de la barra del teléfono. El texto para newbies, el micrófono y todas las funciones permanecen iguales.

| Archivo o modificación | Qué queda registrado |
|---|---|
| `index-grupal.html` | Limita el logo al 100 % del espacio disponible y lo baja debajo de la barra superior del iPhone. |
| `mobile-release.json` | Número de paquete preparado actualizado a V299. |
| `service-worker.js` | Caché V299 para entregar inmediatamente la corrección del logo. |
| `test-v290-brand-icons-cleanup.mjs` | Comprueba el ancho del logo, el espacio seguro, el paquete y la caché V299. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Actualiza códigos, tamaños y explicaciones sencillas. |
| `ROADMAP_A_DETALLE.md` | Registro detallado obligatorio de V299. |
| `ROADMAP_OVERALL.md` | Registro general obligatorio de V299. |

## Documentación operativa V300 · Compendio final para el usuario

El **24 de agosto de 2026** se crea el compendio final de funciones reales para el consumidor. Está escrito con palabras sencillas, usa los nombres visibles de los botones y separa expresamente las funciones disponibles de las que todavía siguen en preparación. No modifica la aplicación ni reabre funciones ya aprobadas.

| Archivo o modificación | Qué queda registrado |
|---|---|
| `COMPENDIO_FINAL_FUNCIONES_USUARIO.md` | Manual amigable que explica desde la selección del campo hasta la tarjeta final, historial, correcciones, respaldo e instalación. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Agrega el compendio al inventario y actualiza las explicaciones de ambos ROADMAPS. |
| `ROADMAP_A_DETALLE.md` | Registra a detalle la creación documental V300. |
| `ROADMAP_OVERALL.md` | Registra esta creación dentro del resumen general. |

## Actualización operativa V301 · Modalidades claras y torneo opcional

El **24 de agosto de 2026** se cierra el vacío de orientación de la pantalla principal. La ruta que ya funcionaba como ronda general ahora tiene una opción visible llamada **RONDA NORMAL**; la modalidad rápida cambia su nombre comercial a **SCORE CARD - PRÁCTICA**. El registro de torneo se identifica como opcional y permite guardar una descripción también opcional. No se modifica ninguna regla de cálculo, score, voz, tarjeta o navegación.

| Archivo o modificación | Qué queda registrado |
|---|---|
| `index-grupal.html` | Presenta las tres modalidades, cambia el nombre de Práctica y agrega la descripción opcional del torneo. |
| `COMPENDIO_FINAL_FUNCIONES_USUARIO.md` | Actualiza el manual con los nombres visibles y el nuevo campo opcional. |
| `mobile-release.json` | Número de paquete preparado actualizado a V301. |
| `service-worker.js` | Caché V301 para entregar la pantalla nueva. |
| `test-v290-brand-icons-cleanup.mjs` | Comprueba las tres modalidades, el registro opcional y el guardado de la descripción. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Actualiza códigos y explicaciones sencillas de V301. |
| `ROADMAP_A_DETALLE.md` | Registra V301 a detalle. |
| `ROADMAP_OVERALL.md` | Registra V301 en este resumen general. |

## Actualización operativa V302 · Micrófonos hermanos en General y Stableford

El **24 de agosto de 2026** se unifica el registro visual de Stableford con la Score Card General. Stableford deja de mostrar el círculo de 240 px con emoji y adopta el mismo encabezado REGISTRO DE JUGADORES, bloque de instrucciones, micrófono SVG compacto de 120 px en escritorio y 112 px en iPhone, color neón y estado rojo de escucha. El enlace con el motor oficial de voz permanece intacto.

| Archivo o modificación | Qué queda registrado |
|---|---|
| `stableford.js` | Reutiliza la línea gráfica y descriptiva aprobada de la Score Card General sin cambiar la lógica de registro. |
| `mobile-release.json` | Número de paquete preparado actualizado a V302. |
| `service-worker.js` | Caché V302 para entregar inmediatamente el componente unificado. |
| `test-v290-brand-icons-cleanup.mjs` | Comprueba la estructura hermana, el SVG, la ausencia del emoji grande, el paquete y la caché. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Actualiza el inventario de todos los archivos modificados. |
| `ROADMAP_A_DETALLE.md` | Registra V302 a detalle. |
| `ROADMAP_OVERALL.md` | Registra V302 en este resumen general. |

## Actualización operativa V303 · Paso 4-OK también en Stableford

El **24 de agosto de 2026** se completa la hermandad de vocabulario entre General y Stableford. El botón final de una nueva ronda Stableford ahora dice **OK**, tal como indica el paso 4. Su operación no cambia: sigue validando los datos e iniciando la ronda. Cuando se edita una ronda existente, el botón conserva **ACTUALIZAR DATOS**.

| Archivo o modificación | Qué queda registrado |
|---|---|
| `index-grupal.html` | Muestra OK como acción final de una nueva ronda Stableford. |
| `stableford.js` | Orienta al usuario con REVISA Y PRESIONA OK después del dictado. |
| `mobile-release.json` | Número de paquete preparado actualizado a V303. |
| `service-worker.js` | Caché V303 para entregar inmediatamente el texto homologado. |
| `test-v290-brand-icons-cleanup.mjs` | Comprueba OK en pantalla, OK en el aviso, paquete y caché. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Actualiza el inventario de todos los archivos modificados. |
| `ROADMAP_A_DETALLE.md` | Registra V303 a detalle. |
| `ROADMAP_OVERALL.md` | Registra V303 en este resumen general. |

## Actualización operativa V304 · Acciones hermanas y control visual

El **24 de agosto de 2026** se corrige la diferencia que obligaba al usuario a revisar manualmente las dos tarjetas. Registro General y Registro Stableford comparten ahora un único tratamiento para sus acciones inferiores: misma familia, peso 900, tamaño aproximadamente 30 % mayor y la misma altura para OK. Cuando Stableford todavía no está listo, OK permanece funcionalmente bloqueado, pero se muestra con texto y borde neón legibles en lugar de gris desvanecido. Ninguna regla de juego, validación o navegación cambia.

| Archivo nuevo o modificación | Qué queda registrado |
|---|---|
| `index-grupal.html` | Instala el sistema visual compartido para OK, Ronda previa, Historial, Atrás y Cancelar en ambas tarjetas. |
| `mobile-release.json` | Número de paquete preparado actualizado a V304. |
| `service-worker.js` | Caché V304 para entregar inmediatamente la homologación. |
| `test-v290-brand-icons-cleanup.mjs` | Mantiene la validación acumulada alineada con V304. |
| `test-v304-homogeneous-registration-actions.mjs` | Impide automáticamente diferencias futuras de fuente, peso, tamaño, altura o brillo entre las acciones hermanas. |
| `audit-project.mjs` | Ejecuta la comparación V304 dentro del control maestro. |
| `.github/workflows/roadmap-gate.yml` | Vuelve obligatorio el filtro hermano en GitHub. |
| `vercel.json` | Vuelve obligatorio el filtro hermano antes de cada publicación Vercel. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Actualiza el inventario completo e incorpora la nueva prueba. |
| `ROADMAP_A_DETALLE.md` | Registra V304 a detalle. |
| `ROADMAP_OVERALL.md` | Registra V304 en este resumen general. |

## Actualización operativa V305 · Historial, navegación y cero superposiciones

El **24 de agosto de 2026** se auditan todas las pantallas y rutas desde la base V304. Todo acceso visible al archivo de tarjetas usa **HISTORIAL**; cada pantalla con retorno ofrece **ATRÁS** conectado y situado arriba del contenido; el acceso opcional de cuenta pasa a **REGÍSTRATE** dentro del flujo y deja de cubrir controles. En Stableford se elimina el aviso huérfano bajo los jugadores, se conserva su validación interna y la guía visible se corrige para pedir únicamente número de jugador y nombre. Los OK General y Stableford comparten geometría, tipografía, color y estados equivalentes: delineados mientras el registro está incompleto y sólidos cuando ya puede confirmarse. Cálculos y reglas no solicitadas permanecen congelados.

| Archivo nuevo o modificado | Qué queda registrado |
|---|---|
| `.github/workflows/roadmap-gate.yml` | Ejecuta también el filtro obligatorio V305 en GitHub. |
| `COMPENDIO_FINAL_FUNCIONES_USUARIO.md` | Usa HISTORIAL y REGÍSTRATE y explica los formatos reales de dictado General y Stableford. |
| `GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md` | Sincroniza el manual vivo con App V305, el estado de los OK y las guías operativas reales. |
| `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md` | Homologa el vocabulario del historial en la matriz funcional. |
| `ROADMAP_A_DETALLE.md` | Registra individualmente la intervención V305. |
| `ROADMAP_OVERALL.md` | Incorpora este resumen general V305. |
| `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` | Eleva el inventario activo e incorpora todos los archivos V305. |
| `audit-project.mjs` | Añade la prueba V305 a la auditoría maestra. |
| `index-grupal.html` | Homologa HISTORIAL, ATRÁS, REGÍSTRATE y los estados del OK General; evita superposiciones y conserva las validaciones. |
| `mobile-release.json` | Prepara el paquete móvil 305. |
| `service-worker.js` | Activa la caché `gscg-mobile-v305`. |
| `stableford.js` | Muestra únicamente `1-# JUGADOR`, `2-NOMBRE`, `HASTA 6 JUGADORES` y `3-OK`; el motor exige la posición y asigna HCP y marcas por categoría. |
| `test-course-catalog.mjs` | Conserva la eliminación de las falsas casillas históricas y reconoce la guía vigente del límite real de seis jugadores. |
| `test-stableford-ui.mjs` | Alinea la prueba de UI con el build vigente V305. |
| `test-stableford-clean-roster-history.mjs` | Alinea la prueba limpia con la regla V289 de persistir la nueva ronda vacía. |
| `test-v255-player-registration-boxes-codes.mjs` | Alinea la prueba histórica con la guía visual vigente: Dicta o escribe, Nombre, HDCP, Marcas y OK. |
| `test-v260-round-points-player-return.mjs` | Alinea la recuperación con la regla V289 de persistir Stableford vacío para impedir que reaparezcan nombres anteriores. |
| `test-v261-registration-stableford-modality.mjs` | Alinea la prueba histórica con Ronda Normal, Stableford, Score Card - Práctica y la guía homologada vigente. |
| `test-v262-provisional-optional-profile.mjs` | Conserva los perfiles opcionales y reconoce el nombre comercial vigente `SCORE CARD - PRÁCTICA` sin recuperar `RONDA SIN REGISTRO`. |
| `test-v253-live-previous-round.mjs` | Alinea la ruta Stableford oficial con `v=305`. |
| `test-v252-stableford-persistence-category-course.mjs` | Alinea la persistencia con la regla V289 de guardar vacía la nueva ronda Stableford. |
| `test-v272-definitive-operational-release.mjs` | Alinea build, snapshot y ruta oficial con V305. |
| `test-v274-complete-courses-voice-operations.mjs` | Alinea la identificación de versión sin cambiar la cobertura de voz. |
| `test-v275-stable-live-voice-turns.mjs` | Alinea la identificación de versión sin cambiar la cobertura viva. |
| `test-v276-manual-hole-navigation.mjs` | Alinea la identificación de versión sin cambiar la navegación por hoyos. |
| `test-v277-official-round-corrections.mjs` | Alinea correcciones y snapshots oficiales con V305. |
| `test-v278-card-image-pdf-export.mjs` | Alinea los artefactos de tarjeta con V305. |
| `test-v279-local-card-library.mjs` | Homologa la redacción de Historial y la versión vigente. |
| `test-v280-local-history-insights.mjs` | Alinea las estadísticas del Historial con V305. |
| `test-v281-pwa-installation.mjs` | Comprueba la caché móvil V305. |
| `test-v284-native-package-generation.mjs` | Comprueba paquete móvil y caché V305. |
| `test-v285-stableford-back-navigation.mjs` | Comprueba el ATRÁS superior de Stableford. |
| `test-v287-stableford-back-controls-clear.mjs` | Comprueba que REGÍSTRATE esté en flujo y no tape controles. |
| `test-v290-brand-icons-cleanup.mjs` | Mantiene la validación acumulada y reconoce la guía Stableford exacta, el paquete y la caché V305. |
| `test-v304-homogeneous-registration-actions.mjs` | Conserva el filtro hermano y prohíbe
# R18-LAB · acceso propietario temporal de 24 horas · 08 de septiembre de 2026

- Acceso completo de prueba mediante token opaco; sólo la cuenta propietaria puede crearlo o revocarlo.
- Vigencia exacta de 24 horas, cierre automático del cliente y bloqueo obligatorio del servidor.
- Instancia local limpia, sin jugadores, rondas, tarjetas, historial ni respaldo del propietario.
- `guest-access.js` carga el aislamiento antes de los módulos y mantiene intacta la compilación histórica del script principal.
- Cuenta, respaldo, sincronización, comercio y administración quedan cerrados al invitado.
- Feedback temporal sin nombres: apertura, modalidad, cantidad de jugadores, hoyos y anotaciones; visible sólo por el propietario y eliminado automáticamente antes de 48 horas.
- Banco específico PASS; falta vincular la identidad propietaria real y ejecutar Preview/pruebas físicas. MAIN y Producción permanecen intactas.
- Los tres inventarios se regeneran y sellan como `R18-LAB-OWNER-GUEST-24H-LOCK`, sin rótulos históricos V367/V371.
- Archivos exactos: `access.html`, `api/_lib/app-access.js`, `api/app-access.js`, `guest-access.js`, `middleware.js`, `index-grupal.html`, `package.json`, `vercel.json`, `test-r18-owner-guest-24h-access.mjs`, `audit-project.mjs`, `scripts/rebuild-inventory-pdfs.py`, `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`, `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`, `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`, `ROADMAP_A_DETALLE.md` y `ROADMAP_OVERALL.md`.

# V407-R2 · Tarjeta y acciones premium homogéneas · 08 de septiembre de 2026

- `index-grupal.html`: encuadra la tarjeta operativa con título, borde continuo, fondo original y desplazamiento horizontal visible; conserva la paleta negro, verde, blanco y rojo funcional.
- `test-v407-r1-premium-visual-system.mjs`: bloquea regresiones de título, contenedor, barra de desplazamiento y colores de la tarjeta, además de las retículas homogéneas de acciones.
- Producción permanece intacta; el candidato se limita a la rama `lab/premium-ui-v407`.

## V407-R6 · Coordinación de Universales · 08 de septiembre de 2026

- La modalidad general visible se renombra **MEDAL PLAY NORMAL** en Inicio, detalle de ronda y Torneo LIVE; su motor permanece intacto.

- `CONTROL_PROYECTO_SCIRE/COORDINACION_V407_R6_UNIVERSALES.md` separa motor/reglas de diseño/plantillas para impedir cruces entre conversaciones.
- `lab/v407-r6-universales` queda como única rama de integración de la modalidad; `lab/premium-ui-v407` conserva la auditoría R5.
- UNIVERSALES reemplaza el slot completo de DOTS en APP-22/23; DOTS se retira de Score Card, Tarjeta Digital, WhatsApp, Historial, Manual y superficies activas. CARD-09/10 quedan para Global/Personal Universales.
- `test-v407-r6-universales-coordination.mjs` impide crear APP-43–45, conserva 12 puntos por hoyo y bloquea cruces entre motor, gráfica y Producción.
- `universales.js` implementa el motor aislado 6–4–2–0 / 6–4–2, comparte posiciones empatadas y exige 12 puntos exactos por hoyo.
- `index-grupal.html` sustituye la casilla visible de DOTS por UNIVERSALES, limita el registro a 3 o 4 jugadores y añade PUNTOS por hoyo e IN/OUT/TOTAL a la Score Card y Tarjeta Digital.
- `card-library.js` conserva UNIVERSALES como modalidad propia en Historial; `service-worker.js` incorpora el motor a la copia instalable R6.
- `card-artifacts.js` genera Global y Personal específicas con Gross/Neto/Puntos y elimina el panel digital activo de DOTS; `scripts/build-mobile-web.mjs` incluye el motor en iOS/Android.
- `api/live.js` y `live-hub.js` preservan y rotulan UNIVERSALES en Torneo LIVE; `voice-assistant.js` abre su registro por voz.
- `live-control.js` calcula y publica los 12 puntos por grupo; `live-view.js` muestra PUNTOS por hoyo y TOTAL; el Centro LIVE ordena UNIVERSALES de mayor a menor puntaje.
- `database/005_live_tournament_mode.sql` fija modalidad por torneo dinámico; el API rechaza grupos cuyo modo no coincide con el torneo creado.
- `test-v311-voice-assistant.mjs`, `test-round-information.mjs` y `test-v261-registration-stableford-modality.mjs` fijan navegación y títulos compartidos del release R6.
- `test-v406-r23-visible-version.mjs` fija el identificador visible `V407 · R6` sobre ACTUALIZAR.
- `test-v260-round-points-player-return.mjs` conserva la retícula móvil contenida heredada de R5A.
- `test-v407-r6-universales.mjs` prueba 12 escenarios de empate, 3/4 jugadores, el caso 5–5–1–1, retiro de la superficie DOTS y paridad de configuraciones.
- `test-v405-registration-clear-final-mobile.mjs` y `test-v407-r1-premium-visual-system.mjs` amplían los candados compartidos a UNIVERSALES y al release R6.
- `test-v330-side-games.mjs` conserva la cobertura histórica del motor DOTS, pero prohíbe sus accesos/configuración activos y mantiene Skins, Wolf y Vegas.
- `test-v307-match-arrows-format.mjs` conserva Match Play y amplía el rótulo compartido de modalidad a UNIVERSALES.
- `test-v329-skins.mjs` conserva Skins y exige UNIVERSALES en el antiguo espacio visual de DOTS.
- Los candados V365 y V406 de recuperación, diseño, controles móviles y Torneo LIVE conservan sus contratos y reconocen el release R6.
- `audit-project.mjs` incorpora obligatoriamente ambos bancos R6 a la regresión maestra.
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md` registra el conjunto exacto de fuentes R6.
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` resella 431 fuentes y los tres inventarios PDF después de la integración R6.
- Producción `main` permanece congelada en `4009f79f50987f8bf105189bce9c5e90b2857363`.

## V407-R5 · Inventario visual total y tarjeta Stableford responsive · 08 de septiembre de 2026

- Se inventariaron 67 pantallas y estados verificables en seis familias; el alcance y sus diez criterios están en `CONTROL_PROYECTO_SCIRE/AUDITORIA_VISUAL_V407/`.
- Las capturas físicas `IMG_3120`–`IMG_3126` se registraron como 9 ID FAIL; quedan 58 ID pendientes y cero PASS físicos hasta repetir el recorrido R5.
- La tarjeta Stableford Global divide los hoyos en IN 1–9 y OUT 10–18, repliega metadatos y contiene el SHA-256 dentro del ancho móvil.
- La auditoría maestra incorpora el inventario como paquete obligatorio; el banco integral queda en 123 paquetes.
- Producción permanece intacta; R5 continúa como candidato exclusivo de `lab/premium-ui-v407`.
- Publicación R5: el primer transporte remoto truncó `index-grupal.html`; el commit LAB `bb21de0` restauró el blob íntegro con SHA Git exacto y conservó el árbol R5 local completo. El deployment reparador alcanzó Manual visual PASS y fue detenido por el propio `roadmap:gate`, por lo que se registra esta reparación antes de reintentar.
- Fuentes de control exactas: `CONTROL_PROYECTO_SCIRE/AUDITORIA_VISUAL_V407/INVENTARIO_PANTALLAS_ESTADOS_V407_R5.md`, `CONTROL_PROYECTO_SCIRE/AUDITORIA_VISUAL_V407/MATRIZ_AUDITORIA_VISUAL_V407_R5.md`, `test-v407-r5-visual-inventory.mjs` y `test-card-artifacts.mjs`.
- Corrección APP-04/05 y APP-29/30: `index-grupal.html` contiene el Control Manual dentro del iPhone, compacta sus seis columnas sin traslape y aumenta la legibilidad de las acciones de Tarjeta Digital; `test-v407-r1-premium-visual-system.mjs` bloquea la geometría.
- Release de caché `V407-R5A-MOBILE-GRIDS-20260908`: `service-worker.js`, versión visible y pruebas de versión obligan al iPhone a descargar esta corrección en lugar de reutilizar R5.
- Corrección APP-32–37: Historial, vacío, filtros, eliminación y Estadísticas comparten área segura, superficies grafito, controles de 52 px, retículas contenidas y ritmo móvil homogéneo; la auditoría maestra incorpora `test-v407-r5a-history-visual-system.mjs` como paquete 124.
- Regresión R5A: `test-v260-round-points-player-return.mjs` se sincroniza con la retícula móvil contenida de seis columnas; el primer build `dpl_8SSK4fASsW8PBGnPasaK7gP8gT37` queda rechazado y no sustituye el alias LAB hasta publicar el árbol corregido.
# V407-R14 · Actualización manual permanente y tarjetas seguras · 08 de septiembre de 2026

- Se consolida en una rama limpia el botón ACTUALIZAR siempre visible/parpadeante, las categorías opcionales sobre nombres y los puntos rojos de Universales.
- Se rechaza la sustitución truncada de `index-grupal.html` encontrada en R13 y se preserva el HTML canónico completo de main R10.
- Release/caché R14, pruebas y evidencia se mantienen coordinados; Producción no cambia mientras exista un FAIL físico o documental.
- Reparación de publicación R14: se restaura el HTML canónico completo en el commit de Preview; el intento con blob vacío queda rechazado.
- Cierre de publicación R14: ROADMAPS y sello de inventario quedan coordinados en el mismo commit final.
- Evidencia automatizada de tarjetas: `scripts/card-audit-fixtures.mjs`.
- R15: actualización remota parpadea sólo ante una versión nueva y confirma ACTUALIZADO al instalarla.
- R16: Medal Play y Universales reflejan visualmente una sola modalidad activa; sirve como segunda actualización remota consecutiva.
- R17: la categoría elegida aparece pequeña sobre el nombre de cada jugador; sin categoría no aparece texto. La fila PUNTOS y sus valores por hoyo/totales quedan rojos, y una fila vacía con categoría o marcas preseleccionadas no bloquea OK.
- Reparación de transporte R17: `index-grupal.html` se retransmite íntegro; el build truncado queda rechazado y no llegó a Producción.
- R18: `index-grupal.html`, `live-view.js` y `live.html` muestran puntos por hoyo/totales Universales en rojo; el encabezado móvil separa logo, modalidad y actualización sin superposición.
# R19 · Enlace invitado individual de un solo uso · 09 de septiembre de 2026

- El primer canje consume atómicamente el enlace; cualquier segundo navegador o dispositivo recibe `ENLACE INVÁLIDO, VENCIDO O YA UTILIZADO`.
- El dispositivo que lo canjeó conserva su cookie privada hasta el vencimiento original de 24 horas.
- Alcance exclusivo LAB; MAIN, variables y base de datos permanecen sin cambios estructurales.

# V407-R21 · SUPPORT y acceso 24 h cerrados · 09 de septiembre de 2026

- `index-grupal.html`: SUPPORT abre `/manual.pdf` en la misma pantalla, muestra `V407 · R21` y ofrece `COMPARTIR 24H` sólo a la cuenta propietaria.
- `service-worker.js`: avanza release/caché y excluye `/access.html` de la navegación PWA almacenada.
- `api/app-access.js` y `api/_lib/app-access.js`: los enlaces usan el dominio LAB oficial y se consumen atómicamente una sola vez; el primer dispositivo conserva acceso hasta el vencimiento de 24 horas.
- Pruebas dirigidas: `test-v311-live-support-link.mjs`, `test-r18-owner-guest-24h-access.mjs` y `test-v407-r9-manual-update.mjs`.
- Rollback: volver al commit R20 de LAB. MAIN no se modifica.
- `.github/workflows/hotfix-support-same-screen.yml`: se retira el transporte temporal; R21 queda integrado directamente en LAB.
- `docs/manual/v311/page-00.png`: portada del manual resellada junto con los PDF publicados para que SUPPORT entregue el artefacto vigente.
- Reparación de build R21: `service-worker.js` conserva explícitamente el marcador aprobado `v407-r18-live-points-header`; `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` registran y sellan la corrección. El Preview anterior quedó rechazado; MAIN/Producción no cambia.
- Control maestro preservado: punto de corte `línea 185`; activación: 23 de agosto de 2026, 17:05:00, hora de Guatemala.
- Resello remoto R21: `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` usa el digest del árbol Git que audita Vercel; `ROADMAP_OVERALL.md` y `ROADMAP_A_DETALLE.md` documentan el mismo cambio. MAIN/Producción permanece intacta.
- Verificación final del resello R21: los tres archivos anteriores se recalculan contra el `HEAD` remoto exacto que usa Vercel; no cambia código funcional ni MAIN/Producción.
- Corrección física R21: `middleware.js` consulta el estado mediante `/api/app-access?action=status` y elimina la importación ESM incompatible que causaba `MIDDLEWARE_INVOCATION_FAILED`; ambos ROADMAPS y el sello se actualizan en el mismo commit. MAIN/Producción no cambia.
- Propietario R21: `api/_lib/app-access.js` fija como identidad exclusiva `jaimekirste@gmail.com` cuando Vercel no define una variable más específica; `test-r18-owner-guest-24h-access.mjs` bloquea esa asignación. Otros usuarios siguen sin permiso para ver o crear invitaciones.
- R21 enlace protegido contra previsualizadores: `api/app-access.js` entrega el token en fragmento y sólo permite consumirlo mediante POST; `access.html` ejecuta ese POST al abrirlo el invitado y entra inmediatamente; `index-grupal.html` contiene el botón propietario dentro del ancho móvil. Un GET automático ya no consume el acceso.
- Cobertura preventiva R21: `test-r18-owner-guest-24h-access.mjs` bloquea el canje por GET y valida fragmento + POST; `test-v311-live-support-link.mjs` exige que INVITAR 24 H permanezca dentro de la barra. La causa y prevención quedan asentadas en `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`.
- Cierre remoto R21: `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` se resellan juntos contra el árbol exacto del Preview; Producción permanece intacta.
- Reparación de transporte R21: `index-grupal.html` se retransmite íntegro con 818,400 bytes; ambos ROADMAPS y el sello se actualizan en el mismo commit. El build truncado queda rechazado.
- Publicación productiva R21: `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` registran el despliegue autorizado en `golf-sc-gt-lab`; el primer intento por `CRON_SECRET` y el commit vacío quedan rechazados sin sustituir R24.

- Corrección productiva Support sin tocar ACTUALIZAR: `service-worker.js` excluye `/manual.pdf` y `/manual.html` del fallback general hacia la Score Card y entrega `manual.html` por red; `manual.html` monta una sola gráfica activa con precarga y sin `IntersectionObserver`. `test-v311-live-support-link.mjs` y `test-v311-manual-hosting.mjs` bloquean el parpadeo y el retorno silencioso. `vercel.json` regenera inventarios antes de la auditoría.

- Portabilidad exclusiva del build: `scripts/rebuild-manual-bets-live-data.py` y `scripts/rebuild-inventory-pdfs.py` usan Bitstream Vera incluida en ReportLab; elimina la dependencia ausente de `/usr/share/fonts` sin modificar ninguna función de la aplicación ni ACTUALIZAR.

- Regreso directo desde Support: `manual.html` incorpora el botón superior `← REGRESAR A MI RONDA`; usa `history.back()` cuando el Manual proviene de la aplicación y `location.replace("/index-grupal.html?source=manual-return")` sólo como recuperación. `test-v311-manual-hosting.mjs` exige ambos recorridos y la conservación de la ronda persistida. ACTUALIZAR no cambia.
# V407-R23A · Invitación WhatsApp conserva token · 09 de septiembre de 2026

- El control del rewrite acepta el formato JSON normal y el minificado por Vercel; el primer Preview quedó rechazado sin tocar Producción.
- La invitación de 24 horas usa `/invite/<token>` para impedir que WhatsApp elimine el acceso y envíe a Kathy al formulario propietario.
- `access.html`, `api/app-access.js`, `middleware.js` y `vercel.json` forman un único recorrido invitado; LIVE y las demás funciones permanecen intactas.
- `test-r18-owner-guest-24h-access.mjs` bloquea regresiones de ruta, reescritura, permiso y canje POST.
- Rollback: volver a `73df15f`; Producción R23 no cambia hasta cero FAIL y aprobación física.

# V407-R24 · WhatsApp y controles móviles sin traslapes · 09 de septiembre de 2026

- `index-grupal.html`: teléfono WhatsApp editable con 🇬🇹 +502 y ancho móvil útil; ACTUALIZAR e instalación quedan fuera de todos los overlays y dentro del flujo normal.
- `manual.html`: índice agrupado en ocho temas con título y enlace directo a cada página; búsqueda WhatsApp/teléfono/Guatemala/+502.
- `service-worker.js` y pruebas V311/V365/V405/V406/V407: release R24 y contratos preventivos sincronizados.
- Evidencia Chromium móvil 390×844: General, Match Play, Four Ball, Skins, Wolf, Vegas, Universales y trece pantallas críticas sin desbordamiento ni intersecciones.
- Rollback: `73df15f`; promoción a MAIN sólo tras Preview READY y cero FAIL.
- Reparación de transporte R24: el primer blob remoto de `index-grupal.html` llegó vacío; el commit reparador retransmite los 830,274 bytes y conserva el árbol candidato exacto.
- Índice protegido por `test-v311-manual-search.mjs`; enlaces temáticos y búsqueda WhatsApp no pueden desaparecer silenciosamente.

# V407-R24A · ACTUALIZAR manual visible en Registro · 09 de septiembre de 2026

- `index-grupal.html`: restaura ACTUALIZAR exclusivamente en Registro y reserva una franja superior para impedir contacto con el logotipo o controles.
- `service-worker.js`: nuevo release/caché R24A para que el propietario reciba y confirme manualmente la versión.
- Evidencia Chromium móvil 390×844: ACTUALIZAR visible, tarjeta inicia en 90 px, botón termina en 67 px, intersección cero y ancho total 390 px.
- Pruebas V365/V405/V406/V407 actualizadas; rollback productivo `2ba83ed`.

# V407-R24B · recuperación manual desde la copia R24 almacenada · 09 de septiembre de 2026

- `service-worker.js`: al servir el shell aprobado antiguo inyecta sólo el CSS que vuelve visible ACTUALIZAR y reserva su franja; no instala ni recarga automáticamente.
- `index-grupal.html`: destino visible R24B posterior al toque personal del propietario.
- Candado permanente R24B: `scripts/lab-update-browser-review.mjs` separa la revisión automatizada en navegador real de la auditoría estática y del iPhone físico; exige cuatro deployments consecutivos A→B→C→D sobre `https://golf-sc-gt-lab.vercel.app`, un perfil persistente, capturas completas y conservación de datos.
- `scripts/lab-update-physical-gate.mjs`, `test-v407-r24-update-physical-gate.mjs`, `package.json` y `audit-project.mjs`: rechazan evidencia JSON ausente, alterada, ajena o menor de tres transiciones. Hasta ejecutar el recorrido público el estado es NO REVISADO; MAIN/Producción permanece intacta.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/MATRIZ_GATE_0_PROYECTO.md` y `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/MATRIZ_GATE_0_PROYECTO.json`: integran el candado dentro de G0-10 sin crear una puerta paralela.
- `.github/workflows/apply-r24b-lab.yml`: transporte temporal creado y eliminado en el mismo cierre remoto; no forma parte del candidato final.
- `test-v407-r9-manual-update.mjs`: exige el puente manual y prohíbe navegación automática.
- Rollback productivo: `5e45b264`; ninguna ronda, historial ni función de juego se modifica.

# V407-R24C · aislamiento de ACTUALIZAR en Historial · 09 de septiembre de 2026

- `IMG_3303.png` demuestra un FAIL físico: `ACTUALIZADO` tapaba parcialmente `ATRÁS` en Historial.
- `index-grupal.html` limita la excepción que muestra ACTUALIZAR a Registro cuando Historial no está abierto.
- `test-v407-r24b-history-update-isolation.mjs` bloquea el conflicto de prioridad CSS que dejó visible el control global sobre el overlay.
- Se invalida cualquier afirmación previa de revisión física total: sólo las pantallas con evidencia individual pueden figurar como revisadas.
- Producción principal permanece intacta; el candidato continúa en LAB y su estado es NO REVISADO hasta repetir navegador real y iPhone.
- Los tres inventarios V311 y `INVENTARIOS_V311.lock.json` se regeneran sobre 448 fuentes remotas para incluir la corrección y su banco preventivo.
- Cierre remoto R24C: se elimina el transporte temporal fallido, se restauran íntegros los dos archivos grandes y se resellan ambos ROADMAPS sobre el árbol LAB exacto; el inventario remoto contiene 448 fuentes activas.
# V407-R24D · LIVE público separado del acceso completo 24 H · 10 de septiembre de 2026

- `COMPARTIR LIVE` deja de heredar dominios temporales de Preview y abre la Score Card pública de sólo lectura en `golf-sc-gt-lab.vercel.app/live.html`.
- `INVITAR · 24 H` permanece como un flujo distinto: aplicación completa temporal con token individual, aislamiento, caducidad, revocación y bloqueo de datos propietarios.
- Candado: `test-v406-r22-share-live.mjs` prohíbe transportar `_vercel_share` y exige el dominio público; `test-r18-owner-guest-24h-access.mjs` conserva íntegro el contrato de 24 horas. MAIN intacta.
# V407-R24D · actualización manual obligatoria · 10 de septiembre de 2026

- `index-grupal.html` muestra `V407 · R24D`; una instalación R24C detecta el release publicado y activa `ACTUALIZAR` parpadeante, pero no instala la aplicación por sí sola.
- `service-worker.js` separa la caché candidata R24D de la caché aprobada; la promoción sólo ocurre después del toque del propietario y la navegación con `app_version`.
- Los bancos V365/V406/V407 (`test-v365-active-round-empty-recovery.mjs`, `test-v406-r2-professional-design.mjs`, `test-v406-r4-mobile-controls.mjs`, `test-v406-r5-simple-tournament-live.mjs`, `test-v406-r23-visible-version.mjs`, `test-v407-r1-premium-visual-system.mjs`, `test-v407-r7-ios-scroll.mjs` y `test-v407-r9-manual-update.mjs`) bloquean conjuntamente la firma R24D y rechazan promoción automática. LAB únicamente; Main permanece intacta.
- Reparación de transporte R24D: `index-grupal.html` se retransmite completo con 830,526 bytes; este ROADMAP, `ROADMAP_A_DETALLE.md` y el sello de inventario acompañan el commit reparador exigido por Vercel. El build vacío quedó rechazado y nunca activó LAB.

# V407-R25 · controles seguros de ronda · 10 de septiembre de 2026

- LAB separa `BORRAR SCORES` de `BORRAR TODO`: el primero conserva jugadores, modalidad, campo, hándicaps y cronómetro; el segundo mantiene su eliminación integral con confirmación.
- El hándicap acepta cualquier entero, incluidos cero y valores negativos, en todas las modalidades y conserva su cálculo firmado.
- `player-registry.js` y `live-control.js` preservan ese hándicap firmado en perfiles y LIVE; `index-grupal.html` concentra validación, cálculo y controles.
- `service-worker.js`, `test-v405-registration-clear-final-mobile.mjs`, `test-v365-active-round-empty-recovery.mjs`, `test-v406-r2-professional-design.mjs`, `test-v406-r23-visible-version.mjs`, `test-v406-r4-mobile-controls.mjs`, `test-v406-r5-simple-tournament-live.mjs`, `test-v407-r1-premium-visual-system.mjs`, `test-v407-r7-ios-scroll.mjs` y `test-v407-r9-manual-update.mjs` avanzan coordinadamente a R25.
- `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`, `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md` y `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json` registran y sellan el cambio.
- El cronómetro incorpora `RESET` a 00:00:00 sin borrar jugadores ni scores.
- El registro captura directamente nombre y WhatsApp visibles al pulsar `OK`, incluido el texto predictivo/autocompletado de Safari iOS.
- Candado: `test-v407-r25-round-controls.mjs`. Publicación únicamente en LAB; Maestro R24D permanece intacto.
- `.github/workflows/promote-r24d-lab.yml`: retirado el transporte temporal fallido de R24D; R25 usa el despliegue normal de la rama LAB.
- Compatibilidad heredada: `test-v287-stableford-back-controls-clear.mjs` reconoce la nueva secuencia ATRÁS → BORRAR SCORES → BORRAR TODO → + JUGADOR sin debilitar los candados previos.

# V407-R26 · hotfix decisivo de OK con hándicap firmado · 10 de septiembre de 2026

- Se eliminan las dos validaciones residuales `hcp<0||hcp>54` de `finalizeSetupDictation()` y `requestSetupFinalize()`; `OK` acepta el mismo rango entero firmado que el formulario.
- Firma visible, release y caché avanzan coordinadamente a R26 para provocar `ACTUALIZAR` manual sin instalación remota.
- Los bancos de actualización y `test-v407-r25-round-controls.mjs` rechazan la reincidencia del límite antiguo.

# V407-R27 · OK manual independiente de voz · 10 de septiembre de 2026

- `OK` toma los campos visibles ya validados y avanza directamente a confirmación, sin quedar esperando `setupSpeechActive` ni transcripciones pendientes.
- El micrófono y sus funciones permanecen intactos; únicamente deja de ser una dependencia para completar el registro manual.
- Release visible, Service Worker y caché avanzan a R27 para actualización manual explícita.

# V407-R28 · actualización conserva registro · 10 de septiembre de 2026

- Antes de recargar, `ACTUALIZAR` captura los campos visibles, sincroniza jugadores y persiste el borrador; R28 conserva nombres, teléfonos, hándicaps y marcas.
- Mantiene íntegro el avance directo de `OK` incorporado en R27.


## HOTFIX OFICIAL EL PULTÉ · 10 SEPTIEMBRE 2026

`index-grupal.html` corrige exclusivamente `PULTE_SI_MEN` conforme a la tarjeta física oficial: 9,5,7,11,17,3,1,15,13,18,2,8,16,4,6,12,10,14. `service-worker.js` renueva únicamente las cachés activa y aprobada para entregar la corrección sin borrar la ronda. Sin cambios en jugadores, scores, diseño, modalidades o demás contenido.

Registro conjunto del despliegue: hotfix `main` commits `481f716` y `c548f30`; matriz verificada como permutación exacta 1–18. Estado físico posterior al despliegue: pendiente.

- Hotfix Maestro El Pulté (10 de septiembre de 2026): la regresión de recuperación acepta la identidad exacta del caché `v407-r28-pulte-handicap-hotfix`; cambio limitado a handicaps oficiales y entrega, sin alterar scores ni jugadores.

- Seguimiento hotfix: se alinea la expectativa del caché aprobado con `approved-pulte-handicap-hotfix`; sin cambios funcionales adicionales.

- Entrega del hotfix: identidad técnica `V407-R28-PULTE-HANDICAP-HOTFIX-20260910` para que instalaciones existentes detecten ACTUALIZAR sin borrar la ronda.
- 2026-09-13 · R29: paquete de despliegue validado con el envío digital de iPhone, la prueba de activación del toque y el registro de cambios en un mismo commit.


## R30 · Envío PNG validado en iPhone · 2026-09-13
- `card-file-export.js`: SVG autocontenido en data URL evita SecurityError de canvas contaminado; texto blanco y Arial, límite de espera y control de contexto. PNG real: 160728 bytes.
- Prueba física PASS: el usuario confirmó «Eso sí, funcionó y llegó». Integración Main solicitada explícitamente.
- `index-grupal.html` y `service-worker.js`: identidad R30 para entregar el exportador mediante ACTUALIZAR. Sin cambios en almacenamiento de rondas ni scores.
- Pruebas de versión y actualización alineadas con R30; registro RC-104 en `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`; sello `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`.
- Evidencia de comparación en rama fix-r30-card-png; la página temporal no se incorpora en Main.


## R31 · Comunicación universal clara · 2026-09-13
- `api/universal-ai.js`: clima actual hablado sin ficha técnica, sin convertir nulos en cero; instrucciones de lenguaje natural y límites de diagnóstico y tasación.
- `scripts/universal-quality-benchmark.mjs`: cuatro consultas reales al backend durante Preview, con resultados verificables; referencia ChatGPT de esta conversación y evaluación de contenido, no similitud literal.
- `test-r31-universal-plain.mjs`: regresión de clima actual, datos ausentes y horizonte de lluvia.
- `vercel.json`: ejecuta comparación solamente en la rama de revisión. Resultado y publicación pendientes.

- `docs/quality/R31_COMPARACION_UNIVERSAL.md`: referencia previa, fuentes y rúbrica de 100 puntos; el análisis detallado se mantiene sólo cuando se solicita profundidad.

- Comparación real: 4/4 respuestas; BMW rechazado por tasación local sin comparables locales y fuentes de variantes mezcladas. Se endurece identificación de variante y se repite únicamente ese caso. Sin aprobación del umbral 90 todavía.

- Segunda comparación: BMW ya distingue referencia internacional y ausencia de precio local; se exige identificar año/fuente de comparables. iPhone añade alternativa cuando la pantalla no responde. Revisión focalizada de estos dos casos.

- Paquete Main R31 preparado: `index-grupal.html` y `service-worker.js` renuevan sólo identificación; pruebas de versión alineadas. No cambia actualización, almacenamiento, scores ni exportador PNG. `vercel.json` conserva el comando original de producción; comparación externa sólo en rama de revisión.

- `docs/quality/R31_RESPUESTAS_REALES.json`: respuestas reales y tiempos; evaluación manual acotada 94/100, sin garantía de similitud general ni de audio físico. Main/LAB R31: preparado para publicación del backend verificado.


## 2026-09-13 · R32 · Preguntas abiertas y voz
Filtro de conversación corregido; éxito audible real; liberación de audio AI ∞. Se preserva la corrección de actualización publicada en LAB y se mantiene R31. Pruebas y límites físicos en `docs/quality/R32_PREGUNTAS_Y_VOZ.md`.
Archivos de esta versión:
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`
- `ROADMAP_A_DETALLE.md`
- `ROADMAP_OVERALL.md`
- `docs/quality/R32_PREGUNTAS_Y_VOZ.md`
- `index-grupal.html`
- `service-worker.js`
- `test-r32-open-conversation.mjs`
- `test-update-check-errors.mjs`
- `test-v358-ios-score-universal-physical-recovery.mjs`
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

`Intocables/APROBACION_FISICA_REGISTRO_SCORES_V378.json`: sello de microfono_compartido actualizado sólo por corrección universal autorizada; SHA previo conservado, aprobación física R32 pendiente. Banco V358 restaurado sin cambios; liberación de audio dentro de startAiUniversalListening.


## 2026-09-13 · R33 · Error visible en comunicación universal
Hallazgo en navegador R32: causa del silencio quedaba oculta. R33 muestra aviso junto a controles, independiente del reloj. Prueba física iPhone pendiente. Archivos:
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`
- `Intocables/APROBACION_FISICA_REGISTRO_SCORES_V378.json`
- `ROADMAP_A_DETALLE.md`
- `ROADMAP_OVERALL.md`
- `docs/quality/R33_ERROR_VISIBLE.md`
- `index-grupal.html`
- `service-worker.js`
- `test-r33-visible-voice-errors.mjs`
- `test-v365-active-round-empty-recovery.mjs`
- `test-v406-r2-professional-design.mjs`
- `test-v406-r23-visible-version.mjs`
- `test-v406-r4-mobile-controls.mjs`
- `test-v406-r5-simple-tournament-live.mjs`
- `test-v407-r1-premium-visual-system.mjs`
- `test-v407-r25-round-controls.mjs`
- `test-v407-r7-ios-scroll.mjs`
- `test-v407-r9-manual-update.mjs`


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

R34 evidencia Preview: 0595868e64733075c00aa4d0ebe1eecaef438674 READY en ambos proyectos; reproducción real de frase sintética 5,12 s, RMS0,16452, avance/finalización y texto visible PASS. Prueba física iPhone pendiente.

## R35 local y diagnóstico de captura R36 · 2026-09-13 · NO PUBLICADO

Cambio autorizado: ubicación explícita del clima y recuperación de captura abandonada. Simulaciones dirigidas PASS; equivalencia ChatGPT, audio inyectado real y comprobación iPhone pendientes. Evidencia en docs/quality/R36_CAPTURE_DIAGNOSTIC.json. No se atribuye al iPhone la ausencia de dispositivo del navegador de pruebas.

- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`: código, prueba o evidencia de la revisión conversacional local.
- `Intocables/APROBACION_FISICA_REGISTRO_SCORES_V378.json`: código, prueba o evidencia de la revisión conversacional local.
- `api/universal-ai.js`: código, prueba o evidencia de la revisión conversacional local.
- `api/weather.js`: código, prueba o evidencia de la revisión conversacional local.
- `docs/quality/R35_BANCO_100_PREGUNTAS.json`: código, prueba o evidencia de la revisión conversacional local.
- `docs/quality/R36_CAPTURE_DIAGNOSTIC.json`: código, prueba o evidencia de la revisión conversacional local.
- `docs/quality/R36_CAPTURE_DIAGNOSTIC.md`: código, prueba o evidencia de la revisión conversacional local.
- `index-grupal.html`: código, prueba o evidencia de la revisión conversacional local.
- `test-r31-universal-plain.mjs`: código, prueba o evidencia de la revisión conversacional local.
- `test-r35-weather-location.mjs`: código, prueba o evidencia de la revisión conversacional local.
- `test-r36-capture-permissions.mjs`: código, prueba o evidencia de la revisión conversacional local.
- `test-r36-capture-release.mjs`: código, prueba o evidencia de la revisión conversacional local.
- `test-v335-response-caliber.mjs`: código, prueba o evidencia de la revisión conversacional local.
- `test-v364-vercel-oidc-recovery.mjs`: código, prueba o evidencia de la revisión conversacional local.
- `audit-project.mjs`: exige pruebas de liberación de captura y permisos para prevenir reincidencias.

### Seguimiento de aceptación de 100 conversaciones · 2026-09-13
- `docs/quality/R36_CAPTURE_DIAGNOSTIC.json`: evidencia del banco externo 0/100 y límites del método.
- `docs/quality/R36_CAPTURE_DIAGNOSTIC.md`: rechazo del banco como prueba de navegador consecutiva; infraestructura real pendiente. Sin publicación.


## Continuidad conversacional R36 · 13 septiembre 2026 · NO APROBADO

Motor real: 100/100 respuestas HTTP, mediana 3327 ms; 100 referencias ChatGPT observadas. Comparación editorial provisional: 98 aceptables, 1 fallo de costos/precios, 1 pendiente de revisar. No certifica equivalencia del flujo completo. Integración de servicios de audio externa: 100/100, sin reproducción y con cuatro trabajadores. Nueve consultas adicionales reales: texto y bytes de voz; costos aún necesita respuesta relativa correcta, las tres ciudades sí se resolvieron.

Segunda escucha: R34 negativo (0 aperturas tras fin de voz), código local positivo (100 transiciones sin duplicados; Detener cancela). Reconocimiento simulado, no hardware iPhone. Persistencia real de ronda sintética LAB tras recarga: cinco tablas idénticas. TestMu documenta inyección iOS, pero no hay cuenta/plan ni dispositivo aprovisionado. Latencia integral <=40%, 100 turnos de navegador y comprobación física siguen pendientes. Regresión integral final reservada para candidato completo.

Archivos del alcance y evidencias:
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`: corrección, control o evidencia de la conversación; no publicación.
- `Intocables/APROBACION_FISICA_REGISTRO_SCORES_V378.json`: corrección, control o evidencia de la conversación; no publicación.
- `api/universal-ai.js`: corrección, control o evidencia de la conversación; no publicación.
- `audit-project.mjs`: corrección, control o evidencia de la conversación; no publicación.
- `docs/quality/ENGINE_100_COMPARISON.html`: corrección, control o evidencia de la conversación; no publicación.
- `docs/quality/ENGINE_100_COMPARISON.json`: corrección, control o evidencia de la conversación; no publicación.
- `docs/quality/ENGINE_CHATGPT_REFERENCES_100.json`: corrección, control o evidencia de la conversación; no publicación.
- `docs/quality/ENGINE_R34_COMPLETE_100.json`: corrección, control o evidencia de la conversación; no publicación.
- `docs/quality/ENGINE_R34_PARTIAL_18.json`: corrección, control o evidencia de la conversación; no publicación.
- `docs/quality/R36_CONTINUITY_EVIDENCE.json`: corrección, control o evidencia de la conversación; no publicación.
- `docs/quality/R36_TARGETED_CHATGPT.json`: corrección, control o evidencia de la conversación; no publicación.
- `docs/quality/R36_TARGETED_CHATGPT_RAW.txt`: corrección, control o evidencia de la conversación; no publicación.
- `docs/quality/R36_TARGETED_REAL_9.json`: corrección, control o evidencia de la conversación; no publicación.
- `index-grupal.html`: corrección, control o evidencia de la conversación; no publicación.
- `scripts/check-conversation-acceptance.mjs`: corrección, control o evidencia de la conversación; no publicación.
- `scripts/render-engine-comparison.py`: corrección, control o evidencia de la conversación; no publicación.
- `scripts/run-r36-build.mjs`: corrección, control o evidencia de la conversación; no publicación.
- `scripts/run-r36-targeted.mjs`: corrección, control o evidencia de la conversación; no publicación.
- `test-r34-audio-response.mjs`: corrección, control o evidencia de la conversación; no publicación.
- `test-r35-weather-location.mjs`: corrección, control o evidencia de la conversación; no publicación.
- `test-r36-followup-events.mjs`: corrección, control o evidencia de la conversación; no publicación.


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

R36: test-v365-active-round-empty-recovery.mjs conserva la prueba de recuperación y verifica el identificador sucesor de caché.

## V407 · R37 — CLIMA VIVO CONSISTENTE

- `index-grupal.html`: mantiene clima vivo en pantalla y en AI Universal aunque la ronda esté cerrada, sin modificar la tarjeta oficial.
- `service-worker.js`: publica el identificador y caché independientes R37.
- `test-r37-closed-round-live-weather.mjs`: reproduce 20.7 °C antiguo frente a 27 °C nuevo y bloquea su reaparición.
- `test-v312-general-caddie.mjs`: verifica el contrato sucesor de clima vivo sin persistir sobre una ronda cerrada.
- `audit-project.mjs`: incorpora el caso R37 a la auditoría maestra.
- `test-v365-active-round-empty-recovery.mjs`, `test-v406-r2-professional-design.mjs`, `test-v406-r23-visible-version.mjs`, `test-v406-r4-mobile-controls.mjs`, `test-v406-r5-simple-tournament-live.mjs`, `test-v407-r1-premium-visual-system.mjs`, `test-v407-r25-round-controls.mjs`, `test-v407-r7-ios-scroll.mjs`, `test-v407-r9-manual-update.mjs`: verifican la versión visible y el caché R37.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`: registra RC-104.
- Reversión: commit `ccdd004b361bd84dd5936aa069c7722b13b5659f`; conservar almacenamiento local.


## PTT — corrección local de duración (2026-09-13T22:19:28.097630+00:00)
Estado: pendiente de validación física y publicación. Se detectó y corrigió que la espera de onstop inflaba la duración de pulsaciones breves. voice-turns.js registra stoppedAt al soltar. Evidencia: node test-ptt-independent-turns.mjs termina con exit 0; incluye 100 turnos simulados y casos de onstop demorado, pulsación de 50 ms con 1000 ms de espera y recuperación tras permiso denegado. No equivale a prueba iPhone ni proveedor real. Actualizar no fue modificado. Próximo paso: validación navegador/proveedor y controles pendientes antes de candidato.


### Candidato local PTT — archivos incluidos
- `index-grupal.html`
- `voice-turns.js`
- `api/voice-transcribe.js`
- `test-ptt-independent-turns.mjs`
- `audit-project.mjs`
- `CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md`
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`
Estado: pruebas simuladas PASS; proveedor real, revisión navegador e iPhone pendientes. No aprobado como solución integral.


## R38 — Publicación solicitada en Laboratorio y Maestro
Nueva identidad de release y caché para activar el detector existente de Actualizar. Mantiene el toque manual y los datos locales. Push-to-talk incluido en shell. Orden expresa del propietario para ambos enlaces habituales. Comunicación Universal mantiene un fallo de disponibilidad pendiente; no se afirma solución integral.
Archivos de esta actualización:
- `index-grupal.html`
- `service-worker.js`
- `test-v365-active-round-empty-recovery.mjs`
- `test-v406-r2-professional-design.mjs`
- `test-v406-r23-visible-version.mjs`
- `test-v406-r4-mobile-controls.mjs`
- `test-v406-r5-simple-tournament-live.mjs`
- `test-v407-r1-premium-visual-system.mjs`
- `test-v407-r25-round-controls.mjs`
- `test-v407-r7-ios-scroll.mjs`
- `test-v407-r9-manual-update.mjs`
- `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md`
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`


## OP-60 — Obligación permanente de ejecución visible
Orden expresa 13 septiembre 2026: reportar acción y evidencia visible cada máximo 60 segundos, seguir ejecutando después del reporte y documentar bloqueos reales antes de detenerse. Aplicación a Laboratorio, Maestro y futuras continuaciones. Registro documental; no cambia el código de las aplicaciones.
Archivos de esta modificación:
- `AGENTS.md`
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/DIRECTRICES_MANDATORIAS.md`
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/MATRIZ_GATE_0_PROYECTO.md`
- `CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md`
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/MATRIZ_GATE_0_PROYECTO.json`
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`
- `ROADMAP_OVERALL.md`
- `ROADMAP_A_DETALLE.md`
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`


## R39 — Grabación visible y respuesta sólo por sonido
Corrección por orden del propietario: activar estado rojo/blanco del micrófono en tarjeta, sincronizar estado escuchando durante pulsación, ocultar párrafo hablado, no agregar despedidas de acompañamiento y descartar cierre inesperado del grabador antes de soltar. Banco simulado PASS incluyendo 20 segundos sostenidos; causa del corte físico aún no demostrada. No se declara validación física. Conserva OP-60.
- `api/universal-ai.js`
- `index-grupal.html`
- `service-worker.js`
- `test-ptt-independent-turns.mjs`
- `test-v365-active-round-empty-recovery.mjs`
- `test-v406-r2-professional-design.mjs`
- `test-v406-r23-visible-version.mjs`
- `test-v406-r4-mobile-controls.mjs`
- `test-v406-r5-simple-tournament-live.mjs`
- `test-v407-r1-premium-visual-system.mjs`
- `test-v407-r25-round-controls.mjs`
- `test-v407-r7-ios-scroll.mjs`
- `test-v407-r9-manual-update.mjs`
- `voice-turns.js`
- `docs/quality/R39_PTT_RESULTADO.json`
- `CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json`

## R40 · 13 septiembre 2026 · pulsación sostenida y registro explícito

Orden del propietario tras IMG_3669/IMG_3670: área táctil invisible +100%, no autocierre mientras mantiene pulsado, registro mediante jugador número/ nombre/handicap/marcas. Fuente R39 286aca44e54b00ced7726ba64ddc966d2153b0fa.

Cambios: se elimina temporizador de cierre de 60 s; perder captura de puntero no equivale a soltar; touch-action none en botón y contenedor; área anterior multiplicada por dos; adaptador de comando explícito separa posición del nombre y evita tratar nombre+dígito conversacional como alta. Guía visible actualizada. Parsers y escritor oficiales conservados; el registro de scores mantiene silencio por regla existente.

Evidencia controlada: 100 turnos, 90 s sin envío hasta soltar, analizador real de dos jugadores con posiciones y nombres correctos, cinco hoyos conservados. Pendiente revisión visual y física; no aprobado integralmente ni publicado en producción. Rollback: R39 286aca4.

Archivos:
- CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md
- CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json
- ROADMAP_A_DETALLE.md
- ROADMAP_OVERALL.md
- docs/quality/R40_PTT_RESULTADO.json
- index-grupal.html
- service-worker.js
- test-ptt-independent-turns.mjs
- test-r40-five-holes.mjs
- audit-project.mjs
- test-v365-active-round-empty-recovery.mjs
- test-v406-r2-professional-design.mjs
- test-v406-r23-visible-version.mjs
- test-v406-r4-mobile-controls.mjs
- test-v406-r5-simple-tournament-live.mjs
- test-v407-r1-premium-visual-system.mjs
- test-v407-r25-round-controls.mjs
- test-v407-r7-ios-scroll.mjs
- test-v407-r9-manual-update.mjs
- voice-turns.js

### R40 · corrección de construcción
Los dos builds de ef096d1 fallaron porque las pruebas de guía visible aún exigían las instrucciones antiguas. Se actualizan las expectativas a jugador número/nombre/handicap/marcas según orden del propietario; no se eliminan verificaciones. Nuevos controles funcionales ejecutados antes de reconstruir.
- test-v255-player-registration-boxes-codes.mjs
- test-v261-registration-stableford-modality.mjs
- test-v290-brand-icons-cleanup.mjs
- test-v304-homogeneous-registration-actions.mjs
- test-v305-registration-guides-parser-truth.mjs
- CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json

Se conserva MIGUEL como nombre de ejemplo por regla visual V311; sólo cambia la sintaxis explícita. Archivo adicional: index-grupal.html. Banco funcional: 143 PASS y un FAIL inicial por el nombre de ejemplo; corregido antes de reconstruir.

### R40 · área táctil exacta por pantalla
Revisión CSS detecta márgenes previos distintos: Registro 26 px y Score Card 10 px. Se ajusta inset con sqrt(2) sobre dimensiones efectivas para duplicar área, sin ampliar icono. Se sustituye cálculo inicial basado en margen genérico. Archivos: index-grupal.html; ROADMAP_OVERALL.md; ROADMAP_A_DETALLE.md; CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json. Verificación matemática en anchos 84/109/180/220: área nueva/anterior 2 dentro de tolerancia 0.000001. Presentación física pendiente.

## R40 · recuperación de invitación observada en navegador
13 septiembre 2026, 18:41 Guatemala. Fuente: 1ce8223. Fallo real: navegación /invite/ entregó shell R38 en vez del formulario, scripts relativos /invite/*.js fallaron Unexpected token <. La ruta oficial /access.html?invite= permitió acceso temporal confirmado en el mismo navegador. Corrección: excluir /invite/ del shell de navegación y usar fetch no-store a la URL original. No modifica validación, permisos, base de datos, expiración ni uso único. No resuelve por sí sola el acceso entre producción y Preview.
Prueba test-invite-service-worker.mjs: rutas invite/access van a red sin leer caché; pruebas existentes de acceso 24h y actualización PASS. Aceptación visual R40 y micrófono físico pendientes; producción intacta. Rollback: 1ce8223.
Archivos: service-worker.js; test-invite-service-worker.mjs; audit-project.mjs; ROADMAP_OVERALL.md; ROADMAP_A_DETALLE.md; CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json; CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md.


## R41 · Inicio de respuesta de voz · 14 septiembre 2026
Corrección limitada a splitUniversalSpeechText: primeras oraciones largas se dividen en pausa o espacio antes de 240 caracteres; se conserva respuesta completa y voz actual. Caso reproducido: primer bloque 1274 → 239 caracteres. test-r34-audio-response.mjs PASS, incluyendo cancelación y reproducción ordenada simulada. No demuestra reducción real a 1/6. Dictado de cinco hoyos pendiente: frase aportada pasa intérprete; falta transcripción original rechazada. Grabación y cierre por soltar intactos. Publicación autorizada en LAB y Maestro; reversión al commit b976451.


## R41 · Corrección servidor tráfico al aeropuerto
14 septiembre 2026: directTrafficRouteFromQuery reconoce conector al. Antes: desde mi ubicación al aeropuerto internacional La Aurora devuelve null; después: origen GPS y destino conservados. Pruebas test-v356-traffic-weather-accuracy.mjs y test-v324-real-traffic.mjs PASS. Archivo funcional: api/universal-ai.js. Dos HTTP 502 observados en Maestro 01:21 UTC siguen sin causa interna identificada; no declarar disponibilidad corregida. Sin cambios del micrófono ni del cliente. Publicación autorizada en ambos servidores.


## R42 · Salida Fish en PTT y cierre de vuelta
14 septiembre 2026. index-grupal.html: PTT evita voz del navegador y Cedar en consultas/cierres; usa speakAiUniversalText con servidor Fish existente a 0.90. El adaptador discreteVoiceController reproduce result.closure tras registro correcto, conservando intacto processBrowserVoiceTranscript y su bloque protegido. test-ptt-independent-turns.mjs agrega cierre Fish exitoso y fallido sin Realtime, con reintento. Pruebas de audio, cierre y pulsación PASS controlado. service-worker.js y pruebas de versión actualizados para entrega R42. Sin prueba física ni garantía de timbre fijo o de 1.5–3.5 segundos: faltan referencia Fish y medición real. Error de tráfico 502 pendiente. Reversión: 54cae71.


## R42 · Diagnóstico específico de tráfico · 14 septiembre 2026
Las dos frases del usuario extraen correctamente origen GPS/El Pulté y destino La Aurora/Oakland Mall. Los HTTP 502 de producción no identificaban su causa. api/_lib/traffic.js agrega registro traffic-failure con código interno, estado HTTP del proveedor, estado normalizado y duración; no registra credenciales, coordenadas, preguntas ni mensajes del proveedor. test-v324-real-traffic.mjs verifica rechazo 403 PERMISSION_DENIED sin datos sensibles. Esto habilita diagnóstico; NO certifica restauración del tráfico ni latencia de voz. Archivos: api/_lib/traffic.js; test-v324-real-traffic.mjs; ROADMAP_OVERALL.md; ROADMAP_A_DETALLE.md; CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json.


## Diagnóstico protegido de configuración de tráfico · 14 septiembre 2026
`GET /api/traffic?action=status` informa únicamente proveedor y `configured`; no expone credenciales, ubicaciones ni consultas. Permite distinguir configuración ausente antes de pedir otra grabación física. Prueba específica PASS. Archivos funcionales: api/traffic.js; middleware.js; test-v324-real-traffic.mjs.


## Recuperación de voz autorizada — 2026-09-19

Maestra base ccffefb. Evidencia: 2026-09-19 01:49 UTC, voice-speech 502 por Gateway fish-audio/s2.1-pro-free 404. Se reemplaza por TTS-1/Onyx 0.90 y respaldo directo con la misma voz antes de entregar audio, timeout total 22.5 s incluido cuerpo. Pruebas simuladas 404/red/audio vacío/respaldo agotado PASS. Audio físico y dos segundos NO verificados. No hay garantía de escala ni alertas externas configuradas. El respaldo requiere OPENAI_API_KEY con saldo: se observó credit_balance_exhausted en la ruta de texto de producción, por lo que su disponibilidad real está pendiente. Sesión no modificada. Rollback: restaurar archivos de este commit desde ccffefb (restaura el proveedor que falló).

Publicación f38d930: construcción rechazada por comprobaciones del modelo anterior. Se actualizan únicamente expectativas de voz en V362 e Intocables; pruebas de captura y scores conservadas.

Archivos de esta corrección autorizada: `api/voice-speech.js`, `test-v356-voice-only-cedar-quality.mjs`, `test-voice-provider-recovery.mjs`, `test-v362-physical-voice-recovery.mjs`, `Intocables/intocables-gate.mjs`, `Intocables/MICROFONO_APROBADO.lock.json`, `Intocables/APROBACION_FISICA_REGISTRO_SCORES_V378.json`, `docs/quality/VOICE_PROVIDER_RECOVERY_20260919.md`.


## LAB manual · 2026-09-19 · EN DESARROLLO
Orden del propietario: retirar micrófono, dictado de scores y comunicación universal únicamente en LAB. Maestra conserva 80dfe05; no promover main. Rama lab/manual-iphone-20260919.
Cambios: controles manuales; endpoints de conversación/transcripción/TTS retirados; anuncios de cierre con speechSynthesis local española; caché propia y Permissions-Policy microphone=().
Verificación técnica: scripts/build-manual-lab.mjs PASS (cálculo, registro, cierres, General/Stableford, Match Play, Four-Ball, Skins y recuperación de anuncios). Nuevo perfil LAB sustituye exclusivamente el build antiguo que exigía micrófono. Las pruebas históricas permanecen disponibles.
Pendiente: revisión visual de formatos/modalidades, limpieza de funciones antiguas inertes, pruebas iPhone y aceptación del propietario. Navegador remoto rechazó localhost con ERR_BLOCKED_BY_CLIENT. No representa un candidato aprobado ni garantía de voz física.
Rollback: descartar rama LAB; no modifica producción.

## LAB · recuperación de compartir · 2026-09-19
IMG_4312/4313: barra solo SUPPORT. Navegador reprodujo TypeError en renderDraft: escritura sobre .newbie-guide-player eliminado con el micrófono interrumpía arranque antes de GSCLiveControl.mount y consulta de invitaciones. index-grupal.html retira esa referencia; test-manual-startup-sharing.mjs reproduce fallo anterior y valida corrección; scripts/build-manual-lab.mjs incorpora candado. Invitaciones conservan control de propietario. ROADMAP_OVERALL.md, ROADMAP_A_DETALLE.md y REGISTRO_REINCIDENCIAS_CALIDAD.md documentan incidente. Base publicada b65b71d; rollback a ese commit solo en LAB. Maestra 80dfe05 intacta. Revisión de nueva publicación pendiente; no se declara prueba iPhone.

## LAB · resultado sin audio · 2026-09-19
IMG_4314: primera vuelta 44 gross/37 netos/+1 sin sonido. Prueba por interfaz de nueve hoyos reproduce cierre y aviso de ausencia de voz local en navegador remoto; causa exacta del iPhone pendiente. device-closures.js espera voiceschanged hasta 2 s, prioriza voz local latinoamericana, mantiene referencia de utterance, detecta inicio ausente y muestra resultado aun sin audio. test-device-closures.mjs cubre carga tardía, rechazo de voz remota, cancelación, cola y bloqueo. Build manual PASS. No equivale a corrección física certificada. Base 6b86f4d; rollback solo de estos archivos. Publicación e iPhone pendientes.

## LAB MANUAL 02 · revisión dirigida del 19 de septiembre de 2026

Se retiran transportes, manejadores y prompts inactivos de micrófono/IA del HTML y el puente de dictado que stableford.js todavía insertaba dinámicamente. Se conservan GSCDeviceClosures, logo, estilos deportivos, control manual, LIVE y permisos owner/guest. Se sincronizan meta release y worker como LAB-MANUAL-CLEAN-20260919.

Evidencia: construcción manual y control de 23 módulos cargados PASS. Recorrido de navegador sobre LAB publicado 6b86f4d: Medal, Match Play seis jugadores (tres líderes 1 UP), Four Ball (+1 pareja verde), Skins (Q10/-Q10), Universales (6/4/2 puntos), Stableford (par=2 puntos), práctica. El registro Stableford publicado conservaba dictado; corregido en este candidato, aún pendiente verificación autenticada del candidato. Las capturas revisadas son del publicado, no certifican el código nuevo. Voz física: únicamente confirmación del propietario al reeditar hoyo 9; cloud carece de voz española local. No se afirma cobertura exhaustiva de todos los cierres, formatos exportados ni iPhone. No se toca MAIN.

## LAB MANUAL 03 · fallo de invitación reportado 19/09/2026 08:32

Evidencia Vercel: POST app-access HTTP 400 a 14:32:26 y 14:32:30 UTC en deployment 6GiLMSHL3jgxaMYByC9cHhgDD3ya; GET status 200. Causa interna aún no identificada: catch anterior no registraba detalle. Se conserva el error visible, código seguro en logs sin tokens ni datos personales y respuesta 503 para almacenamiento no configurado. La invitación preparada se comparte en un segundo toque para mantener activación Safari; no se genera otra al cancelar. Prueba de fallo persistente y activación de compartir PASS; permisos owner/guest sin cambios.

Micrófono: el propietario informa solicitud iPhone. No reproducida ni atribuida todavía. No hay llamadas getUserMedia, reconocimiento o captura en los 23 módulos web; Permissions-Policy microphone=() ya estaba configurada. No afirmar causa ni resolución del permiso sin capturar el aviso. No cambia la maestra. Pendientes acceso propietario del Preview, motivo exacto de error servidor y comprobación física del aviso.

## LAB MANUAL 04 · retiro de ubicación y clima por orden del propietario

Se retiran currentBrowserCoordinates y las funciones de carga, temporizadores y representación de clima en index-grupal.html; se eliminan ambos bloques visibles de registro y tarjeta. Permissions-Policy incorpora geolocation=() además de microphone=(). Identidad y worker LAB-MANUAL-NO-GPS-20260919. Se mantienen campo, yardas, par, rating, slope, fuentes y logo. No se alteran datos históricos ni la maestra.

Pruebas manuales técnicas PASS; regresión amplía bloqueo a GPS y llamadas weather en módulos cargados. La comprobación visual autenticada del Preview y la configuración DATABASE_URL de invitaciones permanecen pendientes; retirar clima no resuelve almacenamiento.


## ACTUALIZACIÓN OVERALL · CATEGORÍAS / CAMPEONATO / ATAJOS / MANUAL · 2026-09-20
- `shortcuts-ui.js`: ATAJOS universal operativo; CATEGORÍAS muestra la lista completa vigente.
- Categorías globales: CAMPEONATO · A · B · C · D · SENIOR · SUPER SENIOR · FEMENINA.
- CAMPEONATO preconfigura MARCAS NEGRAS en Registro y se fuerza como NEGRAS en Score Cards/artefactos/LIVE.
- Stableford principal e independiente incorporan las 8 categorías y matrices oficiales de tees; CAMPEONATO usa Negro.
- Manual de Usuario actualizado con categorías completas, pantalla física vigente de Monitor de Tiempo (INICIO · FINAL · TIMER · RESET) y pantallas actuales de Registro/Score Card/Torneos/ATAJOS/Campeonato.
- Auditoría física reforzada: Tarjeta Final, Corrección Oficial e Historial deben abrirse por funciones reales; se miden traslapes de ATAJOS/ACTUALIZADO con controles críticos.
- `LAB · MANUAL 04 / ACTUALIZADO` se oculta al abrir overlays para impedir solapamiento de encabezados y controles.
- Manual físico vigente: 74 hojas = 51 base + 9 pantallas actuales + 10 Torneos + 4 pantallas LAB.

- Auditor físico Chromium oficial: `.github/workflows/full-app-manual-physical-parity.yml` valida modalidades, categorías, Tarjeta Final, Corrección, Historial, Torneos, ATAJOS, 74 hojas del Manual y ausencia de desbordes/traslapes críticos.

- Gate multiarchivo 2026-09-20: ambos roadmaps registran conjuntamente `.github/workflows/full-app-manual-physical-parity.yml` y la certificación física de no traslape.

- V304 LAB 2026-09-20: gate actualizado para la interfaz Stableford vigente de ocho categorías y navegación; no se restauran controles de voz retirados.

- V304 manual vigente 2026-09-20: se eliminan del gate los ejemplos de dictado/micrófono retirados en LAB; se valida Registro General manual y Stableford de ocho categorías.

- V305 LAB 2026-09-20: gate reemplazado para validar Registro Manual visible, ocho categorías Stableford y navegación; se retiran expectativas históricas de parser/guía de voz.

- V305 LAB R2 2026-09-20: gate reducido a contratos visibles actuales; se eliminan dependencias de nombres internos de funciones de validación.

- V357 LAB 2026-09-20: gate heredado de transporte de voz sustituido por contrato de retiro; `api/voice-health.js` no se restaura, microphone/geolocation permanecen bloqueados y el flujo manual es obligatorio.

- Categorías físicas R3 2026-09-20: la lámina `APP_CATEGORIAS_OFICIALES.png` reserva 68 px exclusivos para el riel ATAJOS; ninguna tarjeta de categoría puede quedar invadida.

- ATAJOS HEADER 2026-09-20: se elimina el riel lateral flotante y cualquier reserva de ancho; ATAJOS pasa al bloque superior `round-meta`, sustituyendo RONDA EN CURSO/fecha/hora. Score Card y bloques recuperan ancho completo. Se actualizan gates `test-lab-shortcuts-navigation.mjs` y `test-lab-global-operational-audit.mjs` para este contrato visual. LIVE permanece pendiente de validación end-to-end.

- MENÚ / ANOTADOR 2026-09-20: cambio global visual en LAB. ATAJOS pasa a MENÚ en app, Torneos y Manual; botón MENÚ sin logo, fondo verde neón, texto negro grande y centrado. En Score Card se elimina la franja “TARJETA DE PUNTUACIÓN / DESLIZA…”. El bloque “CONTROL MANUAL …” pasa a “ANOTADOR”; se retira la línea “INGRESO OFICIAL …” y los encabezados blancos JUGADOR/HOYO/GROSS/IN/OUT/TOTAL del anotador, conservando los controles y cálculos. Archivos: index-grupal.html, shortcuts-ui.js, live-hub.html, manual.html, GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md, test-lab-shortcuts-navigation.mjs y test-lab-global-operational-audit.mjs. Pendiente regeneración de capturas físicas del Manual tras publicación.

- MENÚ assets parity 2026-09-21: el texto visible cambia a MENÚ, pero se conservan los nombres físicos existentes de capturas `*_ATAJOS*` para no romper referencias del Manual. `scripts/manual-screen-parity-gate.mjs` se actualiza para validar MENÚ visible sin exigir renombrar archivos físicos.

- MANUAL REMAQUETADO / PANTALLAS REALES / GRIS / MENÚ 2026-09-21: manual físico de 74 hojas unificado bajo plantilla maestra móvil; safe-area y navegación global ATRÁS · INICIO · MI RONDA · ÍNDICE; funciones operativas documentadas con pantallas reales vigentes (Acceso, Setup, Registro, Categorías, Score Card, Stableford, Match Play, Four Ball, Práctica, Skins, Universales, Timer, zona operativa, Tarjeta Final, Corrección, Historial y Torneos); las láminas didácticas no operativas conservadas se reprocesan con acentos grises, reservando el verde para pantallas reales de la app. Manual visible sincronizado con MENÚ y ANOTADOR; archivos históricos cuyo nombre técnico contiene ATAJOS se conservan sólo como identificadores de asset.

- MATCH PLAY TEST SYNC 2026-09-21: `test-v306-match-play.mjs` deja de exigir el texto retirado “CORRECCIÓN HASTA HOYO” y valida el acceso vigente `CORREGIR RONDA`; no cambia motor, scoring ni cierre de Match Play.

- ANOTADOR Match Play 2026-09-21: `test-v306-match-play.mjs` deja de exigir la línea auxiliar “CORRECCIÓN HASTA HOYO” retirada por diseño y valida el encabezado vigente ANOTADOR. La corrección oficial permanece accesible por su control dedicado; no se altera el motor Match Play.

- ANOTADOR TEST SYNC 2026-09-21: `test-v309-four-ball.mjs` valida la etiqueta visible vigente `ANOTADOR` en lugar de CONTROL MANUAL; no cambia motor Four Ball, scoring, TEAMS ni exportación.

- ANOTADOR TITLE SYNC 2026-09-21: `test-v309-four-ball.mjs` valida el título visible exacto `ANOTADOR` sin sufijo de modalidad; no cambia motor Four Ball ni UI.

- MENÚ TEXT-ONLY TEST SYNC 2026-09-21: `test-lab-shortcuts-navigation.mjs` valida botón MENÚ sin logo, texto MENÚ grande/centrado y visible; no cambia navegación ni acciones del menú.

- ASSET TÉCNICO MENÚ SYNC 2026-09-21: `test-lab-global-operational-audit.mjs` conserva los nombres físicos históricos `REGISTRO_ATAJOS_REAL.webp` y `FOURBALL_ATAJOS_REAL.webp` como identificadores de archivo; la interfaz visible sigue usando MENÚ. No cambia UI, navegación ni contenido visible.

- MENÚ TORNEOS PHYSICAL FIX 2026-09-21: `shortcuts-ui.js` monta MENÚ dentro del encabezado real de `live-hub.html`; el header reserva una cuarta columna en escritorio y una segunda fila en móvil para evitar ocultamiento/traslape. MENÚ se oculta sólo en Pantalla Pública. No cambia navegación ni destinos del menú.

- AUDITOR TORNEOS MENÚ 2026-09-21: el render físico sale explícitamente de Pantalla Pública antes de validar Torneos, para no confundir la ocultación intencional de controles en modo público con un fallo de navegación. La auditoría valida MENÚ visible/abrible en modo normal; no cambia comportamiento de Pantalla Pública.

- AUDITOR SCORE CARD MENÚ 2026-09-21: el render físico crea primero una ronda General válida y cierra Setup antes de validar MENÚ en `round-meta`; evita falsos fallos causados por el `main` oculto durante configuración inicial. No cambia comportamiento de la app.

- HEADER MENÚ compacto 2026-09-21: se restaura el protagonismo/tamaño visual del logo principal en móvil y MENÚ se reduce a pill redondeado aproximadamente a la mitad del tamaño anterior (verde neón, texto negro, sin logo). No cambia navegación ni scoring. Se prepara nueva identidad de release para que ACTUALIZAR detecte esta corrección.
- LAB manual/UI 2026-09-21: remaquetación final del manual con pantallas reales por función, gráficas didácticas en gris, navegación global ATRÁS/INICIO/MI RONDA/ÍNDICE; Stableford recupera identidad visible y MENÚ se oculta en Tarjeta Final, Corrección e Historial para evitar traslapes.
- LAB cierre conjunto 2026-09-21: ROADMAPS sincronizados en un mismo commit para la remaquetación final, pantallas reales por operación, gráficas didácticas grises, navegación global y correcciones físicas de Stableford/MENÚ.\n- LAB audit 2026-09-21: el render físico espera explícitamente la carga de imágenes lazy antes de medir cada hoja, evitando falsos FAIL de activos reales como APP_SETUP_CURRENT.png.\n
- LAB audit 2026-09-21 R2: corregida la sintaxis del wait de imágenes lazy del auditor físico; ahora usa saltos reales y espera load/error antes de medir cada hoja.
- LAB cierre QA atómico 2026-09-21: ambos ROADMAPS actualizados juntos para validar el estado final del manual remaquetado, pantallas reales por operación, gráficas didácticas grises y navegación global ATRÁS/INICIO/MI RONDA/ÍNDICE.

- ANOTADOR · HOYO ACTUAL 2026-09-21: en móvil se amplía únicamente el dígito del selector de hoyo actual a 48 px (4× el tamaño previo de 12 px). El rótulo HOYO, ANTERIOR y SIGUIENTE conservan su tamaño actual; el selector gana altura sólo para evitar recorte del dígito.

- ANOTADOR · SELECTOR COMPACTO 2026-09-21: se corrige la versión 4× que ocultó el dígito en iPhone. El selector central vuelve a la misma altura visual que ANTERIOR/SIGUIENTE (54 px), elimina las flechas nativas mediante appearance:none, fuerza el dígito visible en blanco a 30 px y reduce el espacio entre ANOTADOR y la fila de controles a 2 px. El rótulo HOYO conserva su tamaño.

- REFINO VISUAL 2026-09-21: el dígito del hoyo actual en ANOTADOR conserva su tamaño pero reduce grosor de 900 a 400. INFORMACIÓN DEL CAMPO alinea profesionalmente YARDAS / COURSE RATING / SLOPE RATING con filas homogéneas; la primera columna usa ancho fijo suficiente para 6,994 y el punto de tee, eliminando el desfase visual de la fila negra.

- YARDAS NEGRAS ALINEADAS 2026-09-21: la fila Negro/6,994 deja de usar markup inline distinto. Todas las filas de YARDAS comparten ahora la misma estructura `tee-yardage-row` y `tee-yardage-value`, con idéntico ancho, alto, baseline y centrado. La fila negra conserva fondo blanco/texto negro sin desplazamiento respecto de Azul/Blanco/Rojo/Amarillo.


- MANUAL INTERACTIVO TOTAL 2026-09-21: `manual.html`, `manual-torneos.html` e `index-grupal.html` incorporan navegación operativa directa desde el Manual hacia las funciones reales de la app. Las 74 hojas del Manual reciben destino operativo; las capturas del Manual general se convierten en superficies tocables y el capítulo Torneos convierte sus controles ilustrados en accesos directos a MIS TORNEOS, GENERAL, CATEGORÍAS, BUSCAR JUGADOR, FAVORITOS y demás rutas vigentes. `index-grupal.html` añade el router `manual_action` para abrir Registro, Stableford, Score Card, Control Manual, Timer, Tarjeta Final, Historial, Estadísticas, Cuenta, Reglas, Instalación, Corrección y MENÚ sin duplicar lógica. Objetivo de QA pendiente: sustitución progresiva de click de imagen completa por hotspots geométricos exactos dentro de cada captura donde exista más de una opción visible, y certificación física final en iPhone/LAB/Producción.

- MANUAL COVER GATE SYNC 2026-09-21: `test-lab-global-operational-audit.mjs` deja de exigir la portada histórica `/docs/manual/layout/page-00.png` y valida el logo oficial cuadrado vigente `/assets/official-logos/golf-score-card-gt-official-master-1254.jpeg`, ya adoptado por `manual.html`. No altera pantallas internas de la app; sólo sincroniza el gate con la portada autorizada del Manual.

- MANUAL HOTSPOTS REALES FASE 1 2026-09-21: se eliminan los botones externos de “MODO INTERACTIVO” del Manual general y se inicia la conversión correcta: zonas transparentes directamente sobre los controles visibles de las gráficas. Primera cobertura aplicada a `APP_SETUP_CURRENT.png`, `APP_SCORECARD_ATAJOS.png`, `APP_ATAJOS_OVERLAY.png` y `APP_TORNEOS_HUB.png`, con rutas reales hacia Registro, Score Card, Anotador, MENÚ, Mis Torneos, General, Categorías, Buscar Jugador, Favoritos, Historial y Cuenta. Archivo principal: `manual.html`. Pendiente: extender la misma geometría a todos los demás assets y validar físicamente cada hotspot.

- MANUAL HOTSPOTS REALES FASE 2 2026-09-21: `manual.html` extiende hotspots transparentes directamente sobre todas las gráficas operativas actuales: Stableford, Match Play, Four Ball, Práctica, Skins, Universales, Tarjeta Final, Corrección, Historial, Acceso/Cuenta, Categorías, Campeonato, Torneos, Timer, zona operativa inferior y las cuatro capturas reales LAB. La capa interactiva se alinea dinámicamente al rectángulo renderizado exacto de cada imagen mediante medición y ResizeObserver para evitar desplazamientos por padding/object-fit. Pendiente únicamente certificación física automatizada de cada hotspot y destino.

- ÍNDICE USUARIO FINAL 2026-09-21: `manual.html` elimina del índice visible los bloques internos “PANTALLAS ACTUALES · EVIDENCIA FÍSICA” y “PANTALLAS REALES ACTUALES · LAB”, además del listado técnico duplicado de diez entradas de Torneos. El usuario final conserva un único acceso claro “Torneos · guía interactiva completa”. Las hojas internas y evidencias siguen existiendo para QA y navegación contextual, pero dejan de ocupar espacio en el índice del usuario.

- AUDIO DE RESULTADOS PARCIAL 2026-09-22: FRONT 1–9, BACK 10–18 y TOTAL 1–18 pueden anunciar resultados durante la ronda usando el último hoyo completamente registrado. Ejemplos aprobados: «Hasta el hoyo cinco» para FRONT cuando van por el 5 y «Hasta el hoyo trece» para BACK cuando van por el 13, seguido por Gross, Neto y relación contra par de cada jugador. Al completar 9/18 se conservan los cierres «Primera vuelta», «Segunda vuelta» y «Ronda completa». Cambio funcional en `index-grupal.html`; sin alterar scores ni cálculos oficiales.

- AUDIO PARCIAL R2 2026-09-22: despliegue atómico de `index-grupal.html` + ambos ROADMAPS para que FRONT/BACK/TOTAL anuncien «Hasta el hoyo N» cuando la vuelta aún no está completa. Corrige la publicación fallida anterior; no cambia cálculos de score.

- AUDIO R3 · PRONUNCIACIÓN GROS 2026-09-22: el texto hablado de resultados usa `Gros` en lugar de `Gross` para evitar que la voz local del iPhone lo pronuncie «grous». Los rótulos visuales GROSS de la tarjeta no cambian. Se mantiene «Hasta el hoyo N» para resultados parciales.

- AUDIO R4 · RESULTADO INDIVIDUAL POR NOMBRE 2026-09-22: cuando hay varios jugadores, tocar directamente el nombre de un jugador en la Score Card reproduce únicamente sus resultados acumulados hasta su último hoyo consecutivo registrado. La locución usa «Hasta el hoyo N» durante la ronda, «Primera vuelta» al completar 9 y «Ronda completa» al completar 18. No reproduce resultados de los demás jugadores. Se mantiene pronunciación hablada «Gros» y la tarjeta visual conserva GROSS.

- BUILD GATE HOTFIX 2026-09-22: `test-v304-homogeneous-registration-actions.mjs` se sincroniza con la UI vigente: Registro general conserva `REVISAR DATOS` y Stableford conserva `OK`. El gate anterior exigía erróneamente `OK` para ambos y bloqueaba Vercel. No se cambia la pantalla ni la lógica del usuario; sólo se corrige la prueba obsoleta para permitir publicar AUDIO R4.

- BUILD GATE HOTFIX R2 2026-09-22: el contrato V304 se sincroniza completamente con los textos vigentes: `REVISAR DATOS`, `INICIAR RONDA`, `VER RONDA ANTERIOR` y `VER RONDAS GUARDADAS`. Evita que validaciones históricas bloqueen el despliegue de AUDIO R4. No cambia interfaz ni lógica de usuario.

- BUILD GATE HOTFIX R3 2026-09-22: V305 se sincroniza con la UI vigente de historial: botones `VER RONDAS GUARDADAS` y título `MIS RONDAS GUARDADAS`. El gate histórico exigía `HISTORIAL`/`HISTORIAL DE TARJETAS` y bloqueaba Vercel. No se altera ninguna pantalla ni dato del usuario.

- BUILD GATE HOTFIX R4 2026-09-22: V305 actualiza el contrato de cuenta al flujo vigente `RESPALDAR / RECUPERAR DATOS` y estado `CUENTA DE RESPALDO CONECTADA ✓`; elimina la expectativa histórica `REGÍSTRATE`. No modifica interfaz ni credenciales; únicamente alinea la prueba con la app vigente para desbloquear publicación.

- BUILD GATE HOTFIX R5 2026-09-22: `test-v305-registration-guides-parser-truth.mjs` actualiza controles Stableford a `INICIAR RONDA`, `VER RONDA ANTERIOR` y `VER RONDAS GUARDADAS`. Corrige únicamente el gate histórico; la interfaz vigente permanece intacta.

- RELEASE OFFLINE SYNC 2026-09-22: `service-worker.js` alinea `RELEASE` y `ACTIVE_CACHE_NAME` con `PLAYER-NAME-RESULT-AUDIO-20260922-R4`, permitiendo que la PWA instalada detecte/promueva la misma versión que `index-grupal.html`. Sin cambios funcionales adicionales.

- ANOTADOR R5 · TECLADO NUMÉRICO + AUTO SIGUIENTE 2026-09-22: las casillas GROSS del ANOTADOR y de la Score Card dejan de depender del teclado/prompt nativo del iPhone y abren un teclado propio 1–9, 0, X, borrar y OK. Al confirmar un score se guarda únicamente ese jugador y se abre automáticamente el siguiente jugador del mismo hoyo. Scores de dos dígitos se ingresan antes de pulsar OK. El motor oficial de Gross/Neto/HCP no cambia.

- RELEASE R5 · SERVICE WORKER SYNC 2026-09-22: Service Worker y página quedan sincronizados en `MANUAL-SCORE-KEYPAD-AUTO-NEXT-20260922-R5`, forzando una nueva identidad de caché para que iPhone/PWA reciba el teclado numérico propio y el avance automático al siguiente jugador sin mezclar recursos R4.

- TEST R5 · STABLEFORD MANUAL KEYPAD 2026-09-22: `test-stableford-manual.mjs` deja de exigir el `window.prompt` retirado y valida el teclado propio `openRoundScoreKeypad`, las teclas de score y `OK · SIGUIENTE`. Mantiene la exigencia de cálculo/persistencia/cierre por el motor oficial.

- ANOTADOR R6 · CONFIRMACIÓN HABLADA DE CADA SCORE 2026-09-22: al confirmar un score desde el teclado propio, la app anuncia inmediatamente `Hoyo N. Jugador. Gros X.` y abre el siguiente jugador del mismo hoyo. La locución individual por nombre y los audios FRONT/BACK/TOTAL permanecen independientes. Página y Service Worker se sincronizan en R6 para evitar caché R5.

- ANOTADOR R5 · TECLADO Y DICTADO DE SCORES 2026-09-22: las casillas GROSS del ANOTADOR dejan de ser inputs readonly y pasan a botones, eliminando por construcción el teclado QWERTY de iOS. Tocar una casilla abre exclusivamente el keypad numérico interno. Se añade `🎙 DICTAR` dentro del keypad para un jugador/hoyo y `🎙 DICTAR SCORES` en el ANOTADOR para frases grupales como «Jaime cuatro, Jessie cinco, Becky seis». El dictado usa únicamente SpeechRecognition/webkitSpeechRecognition del navegador y alimenta el parser local existente; no reactiva asistentes, endpoints de voz ni IA remota. El audio individual al tocar el nombre del jugador se conserva.

- GATE DICTADO LOCAL R5 2026-09-22: `test-manual-no-assistant.mjs` se actualiza para mantener bloqueados asistentes, endpoints remotos y micrófonos retirados, permitiendo únicamente `SpeechRecognition/webkitSpeechRecognition` para el nuevo dictado local de scores del ANOTADOR. Esta prueba verifica además que `startRoundScoreDictation` permanezca presente. Relacionado con `index-grupal.html` y `service-worker.js` release `SCORE-KEYPAD-DICTATION-20260922-R5`.

- BUILD LAB R5 · DICTADO LOCAL 2026-09-22: `scripts/build-manual-lab.mjs` mantiene bloqueados `getUserMedia`, `MediaRecorder` y endpoints retirados de voz/IA, pero permite explícitamente `SpeechRecognition/webkitSpeechRecognition` únicamente para `startRoundScoreDictation`. El build exige que el dictado local de scores exista y evita reactivar asistentes o transporte remoto.

- GATE R5 · `test-manual-no-assistant.mjs` 2026-09-22: se actualiza esta prueba para permitir exclusivamente `SpeechRecognition/webkitSpeechRecognition` usado por el dictado local de scores del ANOTADOR, manteniendo bloqueados micrófono/asistente/IA y endpoints retirados. Valida además `startRoundScoreDictation`. Este cambio acompaña `index-grupal.html` y `service-worker.js` en la release `SCORE-KEYPAD-DICTATION-20260922-R5`.

- ANOTADOR R6 · KEYPAD COMPACTO 2026-09-22: el popup de score se reduce aproximadamente 45–60% respecto de R5: ancho máximo 320px/88vw, altura visual objetivo ≤42vh, teclas de 38px, display de 38px, acciones de 40px, menos padding/gaps y overlay a 24% de opacidad. Antes de abrir, la fila/casilla activa se centra con `scrollIntoView` para permanecer visible por encima del panel. Se conservan `🎙 DICTAR`, `OK · SIGUIENTE`, dictado grupal, autoavance y motor de score sin cambios.

- FINAL R8 · ANOTADOR 1–9 + AUDIO 2026-09-22: la pantalla conserva exactamente su estructura; las nueve posiciones de los tres totales parciales a la derecha del ANOTADOR se reemplazan por teclas fijas 1–9 (3×3). Tocar un número registra inmediatamente el score del jugador seleccionado y mueve la selección visual (borde verde fuerte) a la casilla GROSS del siguiente jugador, sin botón SIGUIENTE ni popup. Tocar el nombre de un jugador usa su `player.id` real y lee sólo sus resultados registrados. FRONT/BACK/TOTAL construyen explícitamente una línea para todos los jugadores con score disponible hasta el último hoyo registrado. No se alteran cálculos, tarjeta inferior ni demás elementos de pantalla.

- FINAL R8 HOTFIX 2026-09-22: se elimina la cadena heredada `OK · SIGUIENTE` del antiguo popup no utilizado. El flujo vigente permanece: teclado fijo 1–9 en las nueve posiciones derechas, guardado inmediato y selección automática de la siguiente casilla GROSS. Sin cambios visuales adicionales.

- FINAL R10 · AUDIO INDIVIDUAL POR NOMBRE 2026-09-22: se corrige exclusivamente el toque sobre el nombre del jugador. El listener pasa a delegación global en fase capture sobre `#scorecard .player-name[data-audio-player="1"]`, por lo que sigue funcionando después de cualquier re-render y aunque otros controles detengan propagación. La resolución usa primero `data-player-id` real y fallback por slot visual. Tocar un nombre reproduce sólo el acumulado de ese jugador. FRONT/BACK/TOTAL no se modifican.

- FINAL R9 · FLUJO DE SELECCIÓN DE SCORE 2026-09-22: el ANOTADOR inicia sin ninguna casilla GROSS seleccionada. El usuario debe tocar manualmente la primera casilla a utilizar; esa casilla se marca con borde/resplandor verde. Al tocar 1–9 se registra el score y la selección verde pasa automáticamente a la casilla GROSS del siguiente jugador del mismo hoyo. Al registrar el último jugador, se limpia por completo la selección y la pantalla vuelve al estado normal. Cambiar de hoyo también limpia la selección. No se mueve ni rediseña ningún otro elemento.

- FINAL R10 · VERDE ACTIVO + CAPTURA SILENCIOSA + AUDIO INDIVIDUAL 2026-09-22: la primera casilla no se activa sola; el usuario toca una casilla GROSS para iniciar. La casilla activa se pinta fondo verde neón con texto negro. Tras registrar 1–9, el estado activo se conserva a través del render y se reaplica a la siguiente casilla GROSS; al último jugador se limpia por completo. La captura manual queda 100% silenciosa, incluyendo cierres automáticos de vuelta. El audio sólo se reproduce por acción explícita: tocar el nombre usa `player.id` y lee exclusivamente a ese jugador; FRONT/BACK/TOTAL siguen siendo controles separados de resumen.

- TEST R10 · CAPTURA SILENCIOSA 2026-09-22: `test-stableford-manual.mjs` se actualiza para exigir que el ingreso manual de scores NO invoque `speakClosure` automáticamente. El audio queda reservado a tocar nombre de jugador o FRONT/BACK/TOTAL. Valida el comportamiento aprobado de R10 sin cambiar cálculos ni persistencia.

- R11 2026-09-22 · ANOTADOR SIN MICRÓFONO: se retira completamente `DICTAR SCORES` y el transporte SpeechRecognition del ANOTADOR. El ingreso manual es silencioso. No existe selección inicial automática: el usuario toca primero cualquier casilla GROSS y esa casilla se resalta en verde fuerte. Después de anotar, la selección verde avanza al siguiente jugador; al terminar el último jugador se elimina la selección y la tarjeta vuelve a estado normal. En cualquier momento el usuario puede tocar manualmente otra casilla GROSS para mover la selección. Tocar el nombre de un jugador reproduce sólo el acumulado de ese jugador, priorizando `player.id` real y con fallback por nombre visible/slot.

- R11 GATE HOTFIX 2026-09-22: `test-manual-no-assistant.mjs` se alinea con la orden vigente de retirar completamente micrófono y `DICTAR SCORES`. Ahora exige ausencia de `startRoundScoreDictation`, `DICTAR SCORES` y `SpeechRecognition/webkitSpeechRecognition`, manteniendo únicamente audio local de resultados por nombre y FRONT/BACK/TOTAL.

- R11 BUILD HOTFIX 2026-09-22: `scripts/build-manual-lab.mjs` deja de exigir dictado local y ahora valida la orden vigente: ausencia de `startRoundScoreDictation`, `DICTAR SCORES` y `SpeechRecognition/webkitSpeechRecognition` en el ANOTADOR. Se conserva audio de resultados mediante `device-closures.js`.

- R12 2026-09-22 · LIMPIEZA FINAL MICRÓFONO: se elimina la última referencia residual `roundScoreKeypadDictate/startRoundScoreDictation` del popup heredado y se renueva release/cache. El ANOTADOR queda exclusivamente manual 1–9, silencioso, con selección verde y audio sólo por nombre/FRONT/BACK/TOTAL.

- FINAL R13 · VERDE + AUDIO INDIVIDUAL 2026-09-22: el ingreso de score queda totalmente silencioso. La primera casilla sólo se activa al tocarla manualmente; la casilla GROSS activa recibe borde/fondo/resplandor verde explícito por estilo inline y clase. Antes de guardar se persiste el ID del siguiente jugador, de modo que el render conserve y mueva el verde automáticamente; después del último jugador se limpia toda selección. Al tocar un nombre en la tarjeta se resuelve por data-player-id/slot visual y se reproduce únicamente el acumulado de ese jugador. Micrófono y DICTAR SCORES permanecen retirados.

- FINAL R14 · CASILLA VERDE COMPLETA + 4/6 JUGADORES + AUDIO DIRECTO 2026-09-22: la casilla GROSS activa se renderiza con fondo completo verde neón y texto negro aun estando vacía. El avance manual usa todos los jugadores visibles de la ronda (respetando sólo cierre de Match), no el filtro activeFrom, por lo que continúa del 3.º al 4.º, 5.º y 6.º jugador. Al último jugador se limpia la selección. Los nombres de la Score Card reciben un handler directo por player.id; tocar un nombre reproduce sólo su acumulado. La entrada de scores permanece silenciosa y no existe DICTAR SCORES.


- FINAL R18 · DOBLE TOQUE NOMBRE + AUDIO ACUMULADO 2026-09-22: se corrige el acceso al audio individual del jugador. Un toque sobre el nombre no reproduce audio; dos toques consecutivos sobre el mismo nombre activan un único handler delegado y leen exclusivamente el acumulado de ese jugador (Gross, Neto y resultado contra par) hasta su último hoyo registrado. Se elimina el handler inline duplicado que podía interferir con el evento. La entrada de scores permanece silenciosa; FRONT/BACK/TOTAL no cambian. Archivo operativo modificado: index-grupal.html.


- R19 BUILD/GATE SYNC 2026-09-22: sincronización conjunta obligatoria de ROADMAP_OVERALL.md, ROADMAP_A_DETALLE.md e index-grupal.html para publicar la corrección de doble toque del nombre y audio acumulado individual sin alterar cálculos, tarjeta ni captura silenciosa.


- R20 BUILD FIX 2026-09-22: service-worker.js se sincroniza exactamente con el gscg-release vigente de index-grupal.html. Corrige el gate técnico que exige igualdad página/worker; no modifica la función aprobada de doble toque ni cálculos. Archivos del cambio: service-worker.js.


- R21 IPHONE DOUBLE TAP AUDIO 2026-09-22: el doble toque sobre nombre usa pointerup y player.id estable, con ventana táctil de 900 ms; evita depender de la misma instancia DOM de la celda y llama directamente GSCPlayerNameAudio. Un toque sigue silencioso. Se sincronizan index-grupal.html y service-worker.js. Función de scores/cálculos intacta.


- R22 DBLCLICK NATIVO AUDIO 2026-09-22: tras evidencia física NO AUDIO en iPhone con detector pointerup manual, se reemplaza por el evento nativo dblclick sobre la celda del nombre. El doble toque/clic llama directamente GSCPlayerNameAudio(player.id); un toque no habla. No cambia cálculo, score ni tarjeta. index-grupal.html y service-worker.js sincronizados.


- R23 IPHONE TOUCHEND + CONFIRMACIÓN VISUAL 2026-09-22: se reemplaza dblclick por touchend no pasivo, específico para interacción táctil real en iPhone. El segundo toque sobre el mismo player.id dentro de 1000 ms ilumina temporalmente la celda del nombre en verde y muestra estado DOBLE TOQUE DETECTADO antes de llamar GSCPlayerNameAudio. Un toque permanece silencioso. No cambia cálculo, score ni tarjeta. index-grupal.html y service-worker.js sincronizados.


- R24 FULL-CELL INVISIBLE HIT ZONE 2026-09-22: cada celda de nombre incorpora un botón transparente absoluto que cubre el 100% de la casilla y conserva un player.id individual. El doble toque sobre cualquier punto de la casilla acciona el audio acumulado de ese jugador; al detectarlo, la celda parpadea verde y muestra estado antes de reproducir. Un toque no habla. Se mantiene cálculo, score y tarjeta sin cambios. index-grupal.html y service-worker.js sincronizados.


- R25 BUTTON CLICK DOUBLE TAP 2026-09-22: se elimina dependencia de touchend/dblclick. El botón transparente que cubre el 100% de cada celda usa click nativo del botón: primer toque confirma recepción con flash amarillo y mensaje; segundo toque del mismo player.id dentro de 1000 ms confirma verde y ejecuta GSCPlayerNameAudio. Un toque no reproduce audio. Cálculos y tarjeta intactos. index-grupal.html y service-worker.js sincronizados.


- R26 PWA CACHE RELEASE FIX 2026-09-22: se elimina el APPROVED_CACHE_NAME fijo heredado que podía seguir sirviendo una versión anterior en iPhone aun con Vercel READY. El caché aprobado ahora es exclusivo de R26, por lo que en activate/ensureApprovedShell se llena desde el candidato R26 y las navegaciones principales dejan de quedar congeladas en una versión vieja. También se corrige el app_version hardcodeado del fallback de actualización. Función de botón invisible y audio R25 se conserva sin cambios funcionales.


- R27 DIRECT TD CLICK AUDIO 2026-09-22: se elimina por completo el botón invisible y cualquier dependencia de touchend/dblclick/overlay. La propia celda TD.player-name es el control táctil. Primer click/tap del mismo player.id produce flash amarillo y mensaje; segundo click/tap dentro de 1000 ms produce flash verde y llama directamente GSCPlayerNameAudio. Cálculos, score y tarjeta permanecen intactos. index-grupal.html y service-worker.js sincronizados.


- DIAGNÓSTICO AISLADO AUDIO IPHONE 2026-09-22: se agrega audio-touch-test.html, una página mínima sin Score Card ni service worker lógico de la app, para separar recepción de click y síntesis local del iPhone. Primer toque amarillo; segundo toque dentro de 1 s verde y reproducción local. No modifica ninguna función existente.


- DIAGNÓSTICO PÚBLICO AUDIO IPHONE 2026-09-22: middleware.js permite exclusivamente /audio-touch-test.html como ruta pública para validar gesto y voz local sin autenticación. No abre Score Card ni APIs privadas; sólo habilita la página mínima de diagnóstico.


- R28 MECANISMO FÍSICAMENTE APROBADO TRASLADADO A SCORE CARD 2026-09-22: se traslada literalmente el patrón aprobado en audio-touch-test.html al nombre de cada jugador. Cada nombre pasa a ser un botón HTML real dentro de su TD; primer toque amarillo, segundo toque verde dentro de 1 s y síntesis local directa con window.speechSynthesis/SpeechSynthesisUtterance, priorizando voz local en español. FRONT/BACK/TOTAL permanecen intactos y no se modifican cálculos, scores ni tarjeta.


- R29 CAUSA RAÍZ POINTER EVENTS 2026-09-22: se identifica la causa exacta de la falta total de reacción táctil: una regla global existente `.scorecard,.summary{pointer-events:none!important}` bloqueaba todos los eventos dentro de la Score Card, incluidos nombres y botones de audio. Se conserva el bloqueo general de la tarjeta y se habilita `pointer-events:auto!important` exclusivamente para `.player-name[data-audio-player="1"]` y `.player-audio-button`. Se mantiene sin cambios el mecanismo físicamente aprobado: primer toque amarillo, segundo verde + voz local. Cálculos, scores y demás celdas permanecen bloqueados e intactos.


- R30 MANUAL + AUDIO POR VUELTA + TECLADO HOLE IN ONE 2026-09-22: el audio individual por doble toque queda segmentado por vuelta. En hoyos 1–9 lee sólo IN hasta el hoyo actual; en hoyos 10–18 lee sólo OUT desde el hoyo 10 hasta el hoyo actual, sin volver a sumar 1–9. FRONT/BACK/TOTAL conservan sus resúmenes completos. manual.html explica amarillo→verde→voz, diferencia entre audio individual y botones FRONT/BACK/TOTAL, e incorpora nueva ilustración APP_ANOTADOR_TECLADO_NUMERICO_R30.svg. El teclado 1–9 queda explicitado y protegido para que 1 siempre exista por Hole in One.


- R31 AUDIO SEGMENTO ACTUAL + TOTAL SEGÚN ORDEN REAL 2026-09-22: el doble toque individual usa la cronología real de scores mediante updatedAt, por lo que funciona si la ronda comienza por hoyo 1 o por hoyo 10. En la primera vuelta jugada lee sólo esa vuelta hasta el hoyo actual. En la segunda vuelta jugada lee dos bloques: vuelta actual parcial y acumulado total de toda la ronda hasta ese punto. Ejemplo salida por 10 y luego hoyo 4: primero 1–4; después total 10–18 + 1–4. Archivos modificados: index-grupal.html, manual.html, service-worker.js.


- R32 SYNTAX FIX TECLADO 2026-09-22: se corrigen caracteres literales \\n introducidos accidentalmente en index-grupal.html al proteger las teclas 1–9. Se sustituyen por saltos de línea JavaScript reales. No cambia la lógica de audio R31, el teclado 1–9, el manual ni los cálculos. Archivo modificado: index-grupal.html.


- R33 MANUAL PARITY TOKENS 2026-09-22: manual.html restaura exactamente los rótulos contractuales FRONT · 1 - 9, BACK · 10 - 18 y TOTAL · 1 - 18 exigidos por scripts/manual-screen-parity-gate.mjs, conservando íntegra la explicación nueva de audio por doble toque y la pantalla del teclado numérico con 1 para Hole in One. Archivo modificado: manual.html.


- R34 TECLADO 1-9 CONTRACT FIX 2026-09-22: index-grupal.html mantiene el número 1 obligatorio para Hole in One y estructura el teclado manual en tres filas explícitas [1,2,3], [4,5,6], [7,8,9], satisfaciendo test-stableford-manual.mjs sin modificar lógica de audio, scores ni cálculos. Archivo modificado: index-grupal.html.


- R35 AUDIO MÁS DIRECTO 2026-09-22: index-grupal.html elimina de la lectura individual las frases “primera vuelta”, “segunda vuelta” y “vuelta actual”. El primer bloque dice únicamente “Hasta el hoyo N” y conserva la métrica del segmento actual; en hoyos 10–18 calcula sólo 10→N. Si ya se está jugando la segunda mitad cronológica de la ronda, agrega “Acumulado total hasta el hoyo N” con todos los hoyos jugados. Archivo modificado: index-grupal.html.


- R35 REDACCIÓN AUDIO HASTA HOYO ACTUAL 2026-09-22: index-grupal.html ahora identifica explícitamente la vuelta en la lectura individual: “Primera vuelta hasta el hoyo N” o “Segunda vuelta hasta el hoyo N”. Cuando corresponde el segundo bloque, dice “Acumulado total de la ronda hasta el hoyo N”. Ambos bloques nombran el mismo hoyo actual, por ejemplo hoyo 13. service-worker.js sincroniza el release R35. Archivos modificados: index-grupal.html, service-worker.js.


- R36 AUDIO NOMBRE PRIMERO 2026-09-22: index-grupal.html cambia exclusivamente el orden de la narración individual para comenzar por el jugador. Primera vuelta: “Jaime, hasta el hoyo 5. Gross…, Neto…, resultado…”. Segunda vuelta: “Jaime, segunda vuelta hasta el hoyo 13…” y después acumulado total cuando corresponde. manual.html documenta el mismo lenguaje. service-worker.js sincroniza el release R36 para actualización física. Archivos modificados: index-grupal.html, manual.html, service-worker.js.


- R37 AUDIO INDIVIDUAL UNIFORME 2026-09-22: index-grupal.html elimina “primera vuelta” y “segunda vuelta” de la narración individual. La voz siempre comienza “[Jugador], hasta el hoyo N…”. Si ya existe una mitad anterior jugada, agrega después “Acumulado total…”. Funciona igual para salida por hoyo 1 o por hoyo 10. manual.html se alinea con la misma fórmula. service-worker.js sincroniza release R37. Archivos modificados: index-grupal.html, manual.html, service-worker.js.


- R38 CIERRE AUTOMÁTICO DE VUELTAS 2026-09-22: restaura el disparador automático por orden real de juego. Al completar el primer bloque de 9 hoyos anuncia “Resultados totales de la primera vuelta” para todos los jugadores. Al completar el segundo bloque anuncia primero “Resultados de la segunda vuelta” y, inmediatamente después, “Resultados totales” de los 18 hoyos. Funciona igual comenzando por el hoyo 1 o por el 10. No modifica el audio individual por doble toque ni su acumulado. Archivos: index-grupal.html, service-worker.js y prueba de regresión R38.

- R39 TECLADO 0/X + REARME DE CIERRE 2026-09-22: agrega 0 al teclado manual para registrar “no jugó ese hoyo” como omisión válida; agrega X para borrar/corregir el score seleccionado. Corrige además el rearme de las banderas firstSegment/secondSegment de R38: si se borra un score que rompe una vuelta ya anunciada, al volver a completarla se vuelve a disparar el resumen automático. Conserva intacto el audio individual y el acumulado aprobado.

- R40 REPRODUCCIÓN AUTOMÁTICA DE CIERRE 2026-09-22: corrige la ruta manual del teclado. applyLiteralScores ahora conserva el registro normal silencioso, pero si recordScore/recordScores devuelve closure, lo reproduce mediante speakClosure. Esto hace que al completar nuevamente el último score del primer bloque de 9 hoyos se anuncien los resultados de la primera vuelta; al cerrar el segundo bloque reproduce segunda vuelta y resultados totales. También alinea el rearme tras fallo de voz con firstSegment/secondSegment. No modifica teclado, cálculos ni audio individual.

- R41 VERSIÓN VISIBLE EN CABECERA 2026-09-22: muestra en la esquina superior derecha de la ronda el número de versión real derivado del meta gscg-release. Si la app está al día muestra “VERSIÓN R41”; si detecta una publicación más nueva muestra “VERSIÓN Rxx · ÚLTIMA Ryy”, para identificar inmediatamente si el iPhone está atrasado. El mismo número se sincroniza con el panel de actualización. Conserva íntegro R40: reproducción automática del cierre de primera vuelta, segunda vuelta y resultados totales.

- R42 POSICIÓN DE VERSIÓN EN CABECERA 2026-09-22: mueve el indicador visible de versión por encima de “Ronda en curso”, alineado a la derecha y con 17 px, el mismo tamaño de fuente usado por fecha/hora. No modifica audio, teclado, cálculos ni navegación.

- R43 AUDITORÍA COMPLETA DE RUTA DE SCORE 2026-09-22: endurece selección de jugador objetivo del teclado compartido. Cada pulsación resuelve primero jugador activo explícito y, si el estado se perdió tras render/navegación, rearma automáticamente el primer jugador pendiente del hoyo. Las teclas 1-9 escriben exactamente ese entero y nunca pasan por el parser de omisiones; 0 es la única tecla numérica que registra no jugó/status x; X únicamente borra el score del jugador activo. Después de guardar, el foco avanza al siguiente jugador pendiente, no simplemente al siguiente índice. Si todos tienen score, ninguna tecla numérica sobrescribe silenciosamente: se exige seleccionar jugador para corregir. Se preservan R40-R42 (audio de cierre y versión visible).

## 2026-09-22 · ACTUAL R32 · reparación local de teclado sobre R43, NO APROBADA

- `index-grupal.html`: teclado completo, corrección conserva jugador, actualización centrada sin rediseño.
- `service-worker.js`: identidad R48 reservada y sincronizada; no publicada.
- `scripts/build-manual-lab.mjs`: añade prueba de regresión permanente al build LAB.
- `test-lab-r32-keypad-contract.mjs`: prueba ejecutable de etiquetas/valores, 0/X, 1–6 jugadores y corrección con escritor real.
- `docs/quality/LAB_R32_KEYPAD_20260922.md`: fuente, alcance, aceptación, referencia, riesgos, evidencia, bloqueos, plan de pruebas y rollback.
- `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md`: registra defectos R43 reproducidos y estado honesto sin aprobación física.

Build técnico PASS; 924 escrituras dirigidas PASS; autenticación, despliegue, revisión real, audio, Intocables e inventario pendientes. Producción intacta.


### Continuación LAB exclusiva — regresión histórica del teclado
Comparación local de R8, R32, R34 y R39: manualScoreEntry pasa por readGrossAt y limita las teclas 7/8/9 a 6 en par 3. R43 sustituye ese recorrido por entrada literal. Este hallazgo NO explica ni certifica resuelto el reporte físico 4→3. Se amplía test-lab-r32-keypad-contract.mjs a pares 3/4/5 y todos los hoyos 1–18. Producción prohibida; sin push ni despliegue. Prueba real de interfaz, audio y persistencia pendiente.


### LAB — tarjeta LIVE Medal Play con puntos de otras modalidades
Reporte del propietario con capturas IMG_4724/4725. Causa comprobada en live-view.js: los totales se muestran por presencia del dato, sin filtrar modalidad; valores cero de snapshots existentes activan recuadros indebidos. Corrección exclusiva local LAB: Universales sólo en mode=universales, puntos Stableford sólo en mode=stableford. Prueba negativa test-lab-live-mode-summary.mjs reproduce el recuadro incorrecto en general; se incorpora al build. Sin modificación de cálculos, scores, diseño ni datos publicados. Prueba física/deployment pendientes; Producción intacta.


### 2026-09-22 — acceso LAB recuperado y fallos observados en navegador real R43
La invitación de 24 horas permitió abrir LAB en el navegador de Work. No se conserva el token en este documento. Ronda sintética El Pulté / Medal Play con PRUEBA LAB UNO–CUATRO; no se modificó Producción.

Prueba interactiva: con un jugador sólo aparecen teclas 1–3 (FAIL); al completar o corregir un hoyo completo avanza al siguiente sin ENTER (FAIL); corregir UNO selecciona DOS (FAIL). Con cuatro jugadores, se tocaron individualmente 1–9 para cada jugador y se observó el valor esperado; 0 mostró X y X borró el score. El reporte Safari 4→3 no se reprodujo en este navegador, y no se declara resuelto en Safari. ENTER con casillas vacías mostró FALTAN SCORES. ANTERIOR 10→9, SIGUIENTE 9→10 y límite 18 deshabilitado observados. Tarjeta digital abierta; resultado cero muestra E. Compartir desde tarjeta y ronda no produjo enlace/confirmación visible en esta sesión: pendiente, no PASS. Audio, todas las modalidades/campos, inicio por 10 y revisión integral siguen pendientes.

Corrección local adicional: applyManualScoreEntries usa keepManualHole en applyLiteralScores, manteniendo el hoyo de la entrada al guardar; ENTER y navegación conservan sus controles. Se mantiene el comportamiento predeterminado de otras rutas y lógica de audio. Test de regresión ahora simula una rutina que propone el siguiente hoyo y exige conservar el seleccionado. Se actualiza la aserción estática Stableford para el nuevo contrato. Build LAB completo PASS; control técnico, no certificación física. Candidato no desplegado: conector de despliegue no disponible y pestañas de Vercel siguen en login. Ningún push para evitar despliegues vinculados al proyecto de Producción.

Evidencia en docs/quality/lab-r43-browser/: teclado incompleto, tarjeta digital y avance indebido. Estado integral FAIL / NO CERTIFICADO. Próximo paso pendiente: publicar exclusivamente proyecto golf-sc-gt-lab cuando exista canal autenticado de despliegue y repetir físicamente la matriz completa sobre la versión publicada.


### Barrido interactivo ampliado — 2026-09-22, R43 publicado
Trabajo exclusivo en LAB mediante navegador real y controles visibles; no inspección de código como certificación. Rondas sintéticas. Producción intacta.

- Match Play: registro, actualización y tarjeta digital abiertos. Resultado hoyo 1 UNO 1 UP / DOS 1 DOWN; TRES 1 DOWN / CUATRO 1 UP. Captura muestra MENÚ invadiendo extremo del encabezado largo (FAIL visual).
- Four Ball: registro, actualización y tarjeta digital abiertos. Mejor neto de equipos 3 contra 3, encabezado EVEN. Prueba parcial, no toda la modalidad.
- Universales: tarjeta digital abierta. Hoyo completo con netos 3/4/4/3 produjo puntos 5/1/1/5 = 12. Prueba parcial.
- Skins: resumen de registro indicó NET/empate acumula/Q10; después de actualizar apareció Medal Play Normal sin resumen Skins en tarjeta. Posteriormente botón Skins apareció en nueva ronda Stableford y abrió panel SKINS · RESULTADO EN VIVO vacío. Fallos observados, causa pendiente; capturas preservadas.
- Stableford Country Club categoría B blancas: dos jugadores sintéticos, captura iniciada en hoyo 10. Con dos jugadores teclado sólo 1–6: faltan 7/8/9/0/X (FAIL). Se ingresaron mediante botones todos los 18 hoyos, en orden 10–18 y 1–9, gross 4 para UNO y 5 para DOS. Totales visibles UNO 36+36=72, puntos17+18=35; DOS45+45=90, puntos8+9=17. Cada hoyo leído en UI. Autoavance persiste. ENTER en18 permaneció18, no llevó a1 pese al orden jugado.
- Audio: botón BACK mostró Segunda vuelta para el tramo10–18 jugado primero. Después informó No hay una voz local en español disponible en este navegador. Cierre mostró texto de puntos/vueltas/totales. No reproducción audible certificada.
- Tarjeta final Stableford abierta. FINALIZAR RONDA dejó RONDA CERRADA y controles de edición deshabilitados. ENVIAR TARJETA DIGITAL mostró IMAGEN PNG DESCARGADA · ADJÚNTALA EN WHATSAPP. Contenido del archivo descargado aún sin inspección; no se envió a terceros.
- Nueva ronda y regreso al registro funcionaron. Práctica San Isidro abrió seis espacios y teclado completo. Nombre/handicap opcional editados; blancas cargó6470yardas. Texto de audio anterior Stableford quedó visible en nueva práctica (FAIL contenido residual).
- Bloqueo: la llamada que intentaba anotar4 en práctica San Isidro y después cambiar ronda no devolvió resultado. No se afirma que esas acciones finales terminaran. Intento de comprobar pestañas tampoco respondió. Se interrumpieron esperas; no reset ni accesos alternos. Último estado confirmado: práctica San Isidro.

NO COMPLETADO / NO CERTIFICADO100%. Pendientes: completar todos los campos/marcas/modalidades y combinaciones, demás rondas completas/correcciones/cierres, recepción LIVE, revisar PNG descargado, audio audible y Safari físico. Correcciones locales R48 no desplegadas, por lo tanto esta evidencia corresponde a R43. Próxima acción: recuperar respuesta del navegador y retomar práctica San Isidro, después Mayan/Hacienda/AltaVista/LaReunión y restante matriz. No sustituir pendientes por pruebas de código.


### Continuación física R43 — recuperación del navegador y campos pendientes
Control del navegador recuperado reiniciando su sesión de control; acceso invitado LAB conservado. Producción intacta. La llamada anterior había alcanzado nueva ronda, aunque no había devuelto respuesta.

Apertura interactiva de Score Card de práctica y selección BLANCAS: Mayan Golf par72, yardas3319+3376=6695; Hacienda Nueva par72,3286+3430=6716; Alta Vista par71,3146+3238=6384; La Reunión par72,3050+3227=6277. Datos observados en UI; no cotejo con tarjetas oficiales externas ni aprobación de todos los cálculos. La Reunión muestra Course Rating0.0 y Slope0: no validado. Capturas conservadas.

EMPEZAR NUEVA RONDA desde práctica repetidamente abrió formulario Stableford (flujo venía de Stableford). ATRÁS permitió registro general. Texto de audio de la ronda cerrada persistía en nuevas prácticas. En historial apareció la ronda oficial Stableford V1; tocarla no abrió detalle, aun tras nueva observación. FAIL funcional de apertura en esta sesión.

MENÚ abrió y llevó al monitor LIVE. Torneo DEMOSTRACIÓN muestra17grupos/67jugadores; filtro FEMENINA abrió detalle. Seguir FEMENINA01 y abrir FAVORITOS mostró tarjeta individual Gross15/Neto9/resultado-3, sin recuadro Universales. Búsqueda FEMENINA01 mediante campo y Enter devolvió jugador/grupo13/3de18/neto9. Sólo datos de demostración, no certificación de compartición de una ronda real. Favorito de demostración añadido en esta sesión de prueba. Última pantalla: BUSCAR en monitor LAB, resultado FEMENINA01.

Cobertura sigue parcial: aperturas por todos los campos disponibles ya observadas entre los recorridos, pero no toda combinación campo/modalidad/marca/jugadores/hoyos. Persisten fallos de UI, historia, navegación, audio y publicación. Audio audible bloqueado por ausencia de voz local; Safari físico no disponible. Correcciones R48 sin publicar; no se afirma100% recorrido ni100% aprobado. Siguiente: resolver fallos locales, publicar sóloLAB cuando se recupere canal de despliegue, repetir matriz física y obtener recepción realLIVE/PNG.


### Continuación visible — teclado seis jugadores e historial corregido
LAB publicado R43. En práctica La Reunión, hoyo1, se seleccionó expresamente cada jugador1–6 y se tocaron1,2,3,4,5,6,7,8,9,0,X. Se observaron66 resultados mediante controles reales:1–9 exactos;0 muestraX;X borra. No es prueba Safari ni aprobación general. ENTER vacío mostró FALTAN SCORES. Completar seis gross4 avanzó al hoyo2 sinENTER. Volver con ANTERIOR y corregir jugador3 a7 volvió a avanzar al2: FAIL confirmado.

LIVE demostración: seguir grupo13 produjo sus cuatro tarjetas; favorito individual se mantuvo adicionalmente. MENÚ/MI SCORE CARD volvió a la ronda de práctica. Captura guardada.

RECTIFICACIÓN DEL INFORME DE HISTORIAL: el código vigente requiere doble toque, por lo que la observación previa de un toque sin apertura NO demuestra fallo funcional. Prueba real dblclick abrió pestaña4 titulada Tarjeta Global Stableford · B. Se retira el diagnóstico anterior de que no abre. Inspección posterior rechazada explícitamente por política del navegador: protocolo blob no permitido; sólohttp/https. No se intentó eludir ni obtener el mismo contenido por otra superficie. Contenido de esa tarjeta guardada permanece SIN INSPECCIÓN; no aprobado.

Causa de nueva ronda desde práctica localizada en index-grupal.html: handler usa isStablefordRound()||sfEmergency; sfEmergency conserva el arranque anterior incluso tras pasar a práctica. En esta continuación no se modificó ese código ni se desplegó. Pendientes anteriores permanecen. Prueba física100% bloqueada para tarjeta blob y audio audible; publicaciónLAB sigue pendiente; Producción intacta.


### Correcciones locales pendientes de publicación — 22 septiembre 2026
Instrucción más reciente del propietario sustituye el criterio cronológico anterior: 1–9 SIEMPRE primera vuelta; 10–18 SIEMPRE segunda vuelta. Se corrigen las etiquetas del cierre automático conservando detección de orden y acumulados; reintento tras fallo de voz rearma el segmento correspondiente. Prueba técnica con ambos inicios pasa y exige no anunciar total antes de 18 hoyos completos. No se ha escuchado ni certificado físicamente esta corrección.
NUEVA RONDA ya usa modalidad actual sin arrastrar sfEmergency de una sesión anterior; regresión técnica pasa.
Captura IMG_4734 aportada por propietario confirma MENÚ sobre ATRÁS en historial móvil. Se reserva espacio superior en panel de historial para pantallas estrechas, sin cambiar botones. Ajuste local pendiente de despliegue y verificación visual móvil. LAB real sigue R43. Producción intacta. No hay certificación100% ni aprobación integral.

Prueba interactiva adicional en LAB R43: búsqueda inexistente muestra estado vacío; filtro Match Play muestra vacío; Stableford + Country Club recupera ronda de prueba; ATRÁS cierra historial y MENÚ abre su diálogo. Vista ancha solamente, no certifica ausencia de traslapes móvil. Build técnico completo con prueba de vueltas actualizada: PASS.


### Recorrido visible adicional — guía y navegación
En LAB R43 real se abrieron la guía desde MENÚ, Control manual, INICIO, VER ÍNDICE y MI RONDA mediante controles de interfaz. Se mostraron capturas durante el recorrido. Regreso preservó La Reunión práctica y selección hoyo2; consulta de hoyo1 confirmó seis scores 4,4,7,4,4,4. Hoyo18: SIGUIENTE deshabilitado; ENTER sin scores mostró FALTAN SCORES. ANTERIOR18→17 y SIGUIENTE17→18 comprobados. Evidencia: docs/quality/lab-r43-browser/lab-r43-enter18-visible.jpg. No implica revisión de todas las hojas del manual ni certificación móvil. Correcciones locales aún no publicadas.


### Corrección local tras inspección de tarjeta digital — hoyo10
En LAB R43, práctica La Reunión: 4→4 y corrección4→8 en jugador1/hoyo10; jugador3 recibió6, 0 mostróX y X borró; posterior4 mostró4. Corrección numérica sigue desplazando selección al siguiente jugador (fallo ya registrado). Timer pausó en00:57:48 y mantuvo valor; se reanudó. RONDA ACTUAL volvió a la ronda sintética El Pulté Medal Play; VER MI TARJETA abrió tarjeta digital. Se observó alias UNO/DOS/TRES/CUATRO sobre yardaje en hoyo10. Evidencia lab-r43-digital-hole10-overlap.jpg. Causa: alias con posición absoluta y altura16px dentro de celda de yardaje. Ajuste local: alias pasa a flujo normal bajo yardaje, conservando tipografía/colores; afecta tarjeta principal y clon digital. Build técnico PASS; pendiente publicar sólo LAB y repetir inspección visual. No certificado físicamente el arreglo ni aprobación integral.


### Continuación 23 septiembre UTC · revisión y solicitud de actualizar LAB
- Base local: bc30ad9, rama lab/r32-keypad-20260922. Usuario ordena actualizar LAB; Producción principal sigue prohibida.
- Navegador conservó tarjeta digital El Pulté Medal Play con cuatro jugadores sintéticos. ATRÁS retiró controles de tarjeta digital del DOM; captura inmediata todavía mostró la vista anterior, por lo que no se certifica el retorno visual con esa captura.
- Intento de abrir confirmación BORRAR RESULTADOS DE ESTA RONDA terminó en timeout del navegador; diálogo y captura tampoco respondieron. No se confirmó borrado. Nueva pestaña del mismo LAB recuperó ronda R43 y hoyo1 con scores 4,5,5,5. Hoyo2 registrado por botones con 4,5,5,5 avanzó automáticamente a3 sin ENTER: defecto R43 sigue presente. No se completó la ronda.
- Evidencias: docs/quality/lab-r43-browser/lab-continuacion-20260923.jpg y docs/quality/lab-r43-browser/lab-recuperado-20260923.jpg. Son capturas nativas de navegador, no láminas maestras 4K ni prueba de iPhone.
- node scripts/project-quality-gate.mjs PASS documental. node scripts/build-manual-lab.mjs PASS completo, incluidas 12474 escrituras del teclado y etiquetas fijas 1–9 primera /10–18 segunda. No equivalen a certificación física.
- Conector Vercel get_project confirmó proyecto golf-sc-gt-lab prj_0KNTWUoiCiA3amKZQPDNNkWYFDbp, team_1gp3ey5lFtej25mk0XqhaPcD. Último intento del proyecto dpl_2x2rSLyVc1J9nVFVPJrQACUr5BtE está ERROR; navegador sigue R43.
- deploy_to_vercel devuelve McpServerError: Tool deploy_to_vercel not found. VERCEL_TOKEN y autenticación CLI no disponibles. No se hizo push ni deployment. El panel web permanece en login.
- BLOQUEO de publicación: falta canal autenticado de escritura. Se solicita autorización para recurrir al panel web tras fallo del conector, conforme al límite de fallback del navegador. Siguiente: acceso seguro al panel, publicar exclusivamente candidato LAB, esperar READY, actualizar sesión y retomar pruebas de interfaz. No pedir contraseñas/tokens por chat.
- Archivos del registro: docs/quality/LAB_R32_KEYPAD_20260922.md, ROADMAP_OVERALL.md, ROADMAP_A_DETALLE.md y las dos capturas anteriores. Correcciones funcionales existentes sin cambio. Estado NO PUBLICADO / NO CERTIFICADO.
- R44 CONTRATO ÚNICO DE CAPTURA DE SCORE 2026-09-22: crea score-entry-contract.js como semántica compartida: 1-9 = gross exacto, 0 = no jugó/status x, X = borrar. index-grupal.html consume el contrato y desacopla físicamente las cuatro filas del teclado del número de jugadores usando rowCount=max(jugadores,4), por lo que 0/X siempre aparecen con 1-6 jugadores. Medal Play, Match Play, Four Ball, Universales y Stableford integrado heredan el mismo motor principal. stableford-torneo.html, única Score Card independiente detectada con manejador propio, se alinea al mismo contrato compartido.

- R45 POSICIONES FIJAS MENÚ / ACTUALIZAR 2026-09-22: corrige traslape de controles flotantes. MENÚ queda anclado arriba a la derecha en su posición aprobada; ACTUALIZAR queda anclado inmediatamente debajo con top independiente y z-index separado. Ninguno depende del layout de cabecera ni desplaza al otro. Conserva íntegro R44 y el contrato único de Score Cards.

- R46 BLOQUEO DE POSICIÓN MÓVIL ACTUALIZAR 2026-09-22: elimina overrides móviles heredados que movían ACTUALIZAR a right:58px/right:22px y top +12px. Toda la app usa una sola coordenada contractual: MENÚ arriba a la derecha; ACTUALIZAR debajo, con safe-area y posición fija. No depende de cabecera, número de jugadores, overlay ni modalidad.

- R47 CORRECCIÓN SIN AUTOAVANCE 2026-09-22: cuando el usuario toca una casilla con score existente se activa correctionMode. X borra sólo ese score y mantiene el mismo jugador seleccionado. Al ingresar el score corregido, el foco permanece en esa misma casilla; el usuario puede seleccionar y corregir varios jugadores del mismo hoyo. ENTER es el único control que avanza al siguiente hoyo. La captura normal de un hoyo nuevo conserva el avance entre jugadores pendientes. Se preserva R46 de ACTUALIZAR fijo bajo MENÚ.


### Integración completa pendiente de publicar · 23 septiembre 2026
- Orden: incluir correcciones anteriores a revisión física, especialmente teclado desfasado; entregar inventario con comprobación dentro de app.
- Merge incremental de main remoto 053d0e9 (R44–R47) sobre LAB 9aea174; nunca push a main ni cambio a Producción. Se preservan ambas historias y reparaciones locales R48.
- R44 contrato compartido 1–9/0/X y cuatro filas independientes de cantidad de jugadores; R45/R46 ACTUALIZAR fijo bajo MENÚ sustituye centrado local anterior; R47 corrección mantiene jugador. Se conserva bloqueo de ronda cerrada, restauración tras fallo, sin callback diferido, hoyo manual hasta ENTER, vueltas fijas, modalidad nueva ronda y ajustes historial/alias.
- score-entry-contract.js agregado a caché offline. Build LAB incorpora cuatro pruebas R44–R47. Test independiente Stableford reemplaza expectativa obsoleta raw===X con ejecución de manejador real: 1–9, 10/18/30, 0, X, vacío e inválidos sin pérdida. Build completo PASS, 12474 escrituras motor principal; no certifica geometría ni iPhone/audio.
- Acceso Google a Vercel logrado. Revisión automática rechazó botón Skip securing my account por efecto de seguridad no autorizado. No se eludió. Posterior node_repl falla exec-server transport disconnected. Publicación BLOQUEADA; no push ni deployment realizados. Última versión LAB observada R43; R48 sólo candidato local.
- Inventario verificable: docs/quality/LAB_CORRECCIONES_PENDIENTES_20260923.md. Pendientes físicos/otros defectos separados; no se anuncian resueltos.


### R48 subida y READY · activación LAB pendiente
Autorización específica recibida: omitir por ahora configuración2FA. Botón Skip securing my account ejecutado; aviso resuelto. Push CLI rechazado por falta de credenciales; conector GitHub autenticado subió43 blobs. Árbol remoto05d34494c76b3385fed46aa12386e224a359e8ad idéntico al candidato local7b6d8fe. Commit remoto4ae6240f0c94b3f294107775e13092b52e685682, rama lab/r48-integrated-review-20260923; main intacta.
Vercel LAB generó dpl_8eRqD6uqUD545r3aaUwPqsvJuUfd, READY confirmado mediante conector. Preview https://golf-sc-gt-hhcgnbnvm-epgcaddys-projects.vercel.app abre acceso privado; no se certificó tarjeta en ese origen.
Activación dominio golf-sc-gt-lab.vercel.app pendiente: panel ofrece Force Promote to Production dentro del proyecto LAB, reconstruye con entorno LAB y explícitamente exige omitir requisitos Lint y TypeCheck. No se pulsó confirmación Promote to Production. Solicitar autorización específica para omitir esos dos requisitos; no cambiar configuración ni main. Build técnico completo PASS no equivale al estado de esos checks. Dominio habitual aún no actualizado por esta tarea.


### R48 PUBLICADA EN LAB · confirmación final
Usuario autorizó omitir Lint/TypeCheck para activar exclusivamente LAB. Se confirmó Promote sobre despliegue dpl_8MxdkZ8GDztr6fyWd7SX2RRGaaKs, commit4ae6240; conector confirma READY y alias golf-sc-gt-lab.vercel.app. Proyecto principal no modificado.
Navegador habitual retuvo R43 en caché; ACTUALIZAR terminó abriendo MENÚ en esa página antigua. URL index-grupal.html?release=R48 cargó VERSIÓN R48 y conservó ronda de prueba. Captura lab-r48-publicada.jpg.
Prueba interactiva R48: hoyo1 jugador UNO corregido4→8→4 sin reselección; score final4, demás jugadores5/5/5, hoyo1 conservado. Esto confirma destino de corrección y permanencia de hoyo en ese caso. No equivale a certificación integral/iPhone/audio. Inventario de correcciones aplicadas corresponde al candidato ahora publicado; pendientes Skins/audio residual/La Reunión siguen pendientes.


### R49 · correcciones directas tras revisión visible R48
- Usuario pide continuar toda aplicación mediante interacción visible, manteniendo Vercel abierto. No se ofrece garantía física iPhone sin dispositivo.
- Medal digital R48 abierta: resumen INFORMACIÓN DE RONDA, sin PUNTOS UNIVERSALES en DOM. Prueba nueva de artefactos global/personal Medal con campos heredados Universales confirma ausencia de puntos ajenos; no había defecto reproducido en esos artefactos.
- R49 local: refresca juegos laterales también tras render Stableford; limpia audio/cancela cola únicamente al cambiar ID de ronda; refresca vista principal antes de clonar tarjeta digital; etiqueta Skins explícita en anotador; La Reunión configured=false y plantilla sin datos oficiales, bloquea abrir tarjeta digital pendiente.
- Service Worker corrige regex de release aprobada; en HTML antiguo coloca ACTUALIZAR al pie fuera de MENÚ, sin alterar posición de versión actual. Regresión ejecuta función real contra HTML R43 y actual. Conserva sesión y datos.
- Pruebas nuevas test-lab-round-view-reset.mjs y test-lab-update-recovery.mjs PASS. Build LAB PASS antes de últimos guards; se ejecutará candidato completo. Pendiente publicación R49 LAB y recorridos en navegador; no producción principal.


### R49 READY en dominio LAB — revisión interactiva bloqueada por acceso
Publicado b2c528435528e2a2f65e5951d4aec7b2914b77a0 (árbol idéntico localddcd726). Preview dpl_7WuNs96S7WgB2zWjfKM5eVad9PZC READY; rebuild dominio LAB dpl_C2aB1p8tkpkRQLKJoWT1r1LZpmGb READY con alias golf-sc-gt-lab.vercel.app confirmado. Se mantuvo sesión Vercel abierta; proyecto principal intacto.
Antes de verificar R49, pestaña LAB redirigió a access.html y solicita ENTRAR COMO PROPIETARIO. No se atribuye causa exacta sin prueba. Requiere autenticación segura del propietario para continuar pruebas reales; no se elude el acceso. Pendientes: recuperación ACTUALIZAR desde versión anterior, cambio de modalidad/tarjeta digital, Skins, audio residual, La Reunión y resto de matriz completa. R49 NO CERTIFICADA integralmente. Pruebas técnicas PASS; revisión visible posterior publicación pendiente. Rollback LAB: dpl_8MxdkZ8GDztr6fyWd7SX2RRGaaKs R48.

Autenticación segura solicitada y enviada; respuesta visible de LAB: NO SE PUDO VERIFICAR LA CUENTA PROPIETARIA. No prueba contraseña incorrecta ni causa concreta. Se detuvo repetición de inicio de sesión tras primer fallo genérico conforme a control-browser. Sesión Vercel abierta.


### R50 · reporte propietario: cierre hoyo9 no anunció Justi
Captura IMG_4742 muestra cuatro gross5 en hoyo9; propietario oyó sólo tres resultados. No hay evidencia de hoyos1–8 ni del audio para atribuir causa final. Código confirma exclusión silenciosa de jugador si cualquier hoyo del segmento es0/statusx. Se sustituye silencio por nombre y hoyo(s) sin jugar, sin inventar total completo.
Reproducción larga se divide en bloques de hasta180 caracteres por oración; sólo se resuelve éxito después de todos los bloques. Error/interrupción sigue false para rearmar anuncio. Prueba ejecuta transporte real simulado con cuatro nombres incluyendo Justi, conserva texto completo y prueba fallo intermedio. No certifica audibilidad en iPhone.
Prueba test-lab-closure-all-players.mjs cubre cuatro jugadores completos y Justi con omisión previa. Pendiente publicar LAB y reproducción real; login propietario continúa bloqueado.


## R50 — publicación LAB confirmada
Despliegue dpl_BJ53UK8UfYERZMRcvSUHspCJnEY4 READY, alias golf-sc-gt-lab.vercel.app, commit remoto e68b219ed57459d98ddeee626a253b080cfa91f5. Incluye R49 y cierre hablado de todos los jugadores. Build y pruebas técnicas PASS; recorrido integral y audio iPhone pendientes. Acceso de propietario rechazado con mensaje genérico; Vercel sigue abierto. Detalle: docs/quality/LAB_R50_RECORRIDO_PENDIENTE.md. Proyecto principal sin cambios.


## R51 — recorrido real de torneos y simplificación
Acceso temporal recuperado por invitación del propietario; token no guardado. R50 inspeccionada mediante Chrome remoto. FAIL reproducidos: volver desde Favoritos oculta Mis torneos; formulario de enlace y navegación siguen visibles fuera de contexto por especificidad CSS; avisos de validación ocultos; mismo jugador duplicado por seguimiento individual/grupo; ranking de favoritos depende del filtro previo; Compartir LIVE informa sólo en panel oculto.
Correcciones: live-hub.html, live-hub.js, live-control.js. Portal restablece clases; .hidden prevalece sobre layout; estado visible; favoritos deduplicados con ranking general y detalle desplegable conservado entre refrescos; título de búsqueda real; ADJUNTAR RONDA EN VIVO y campo etiquetado; Compartir abre panel visible con enlace y organización accesible. C de Campeonato se conserva por referencia previa aprobada.
Test test-lab-tournament-navigation.mjs incorporado a scripts/build-manual-lab.mjs. index-grupal.html y service-worker.js identifican R51. Documentación anterior R50 READY preservada en docs/quality/LAB_R50_RECORRIDO_PENDIENTE.md y docs/quality/LAB_R32_KEYPAD_20260922.md. R51 pendiente build, publicación LAB y verificación de arreglo en navegador. Main intacta; rollback LAB R50 dpl_BJ53UK8UfYERZMRcvSUHspCJnEY4. No certificación integral ni iPhone.


## R51 verificada / siguiente corrección de torneos en curso
R51 READY en LAB: dpl_m2s9GRLkqaQxJqDgftZ43uam2Kn1, remoto f91319071846b4d30890ddab6fb4ee092624f15c. Navegador real: ACTUALIZAR R50→R51 PASS; panel compartir visible PASS; espectador LIVE PASS; adjuntar grupo de cuatro jugadores PASS; Favoritos→Mis torneos PASS; FEMENINA01 sin duplicación PASS. No certificación integral.
FAIL: crear torneo devuelve503/42703, falta live_tournaments.mode. Consulta de sólo lectura encuentra ronda sintética en Neon main, no rama lab-auth-shortcuts. No se modifica esquema compartido. Pendiente confirmar conexión y preparar migración aislada.
Corrección local: live-control.js conserva mensajes de acción frente a refrescos automáticos; error42703 explícito. live-hub.js distingue categoría vacía de torneo no abierto y demo de datos reales. Pendiente pruebas y publicación de estas correcciones posteriores a R51.

Corrección solicitada por propietario sobre IMG_4745: CSS compartido ocultaba HOYO y GROSS a≤800px. Override local restaura todas las celdas del monitor, conserva jugador fijo al desplazarse y compacta acciones; barra de vistas separada de MENÚ. Medal Play elimina PUNTOS y rotula RESULTADO. Orden score relativo ascendente y cantidad de hoyos descendente conservado; falta verificación publicada.

Validación local posterior: test-lab-medal-monitor.mjs PASS (Medal sin puntos, columnas esenciales, desempate9→6→3 y mensaje de error persistente); integrado al build LAB. project-quality-gate PASS y build-manual-lab PASS. Aún sin publicar esta corrección; prueba visual posterior pendiente.

Candidato R52 LAB-MEDAL-MONITOR-20260923-R52: index-grupal.html y service-worker.js actualizados para entrega verificable por ACTUALIZAR. Incluye correcciones del monitor y avisos LIVE; no incluye migración de base de datos ni certificación integral.

R52 READY confirmado en dpl_2zdrX6Tt1aFSWBYDcPFQMb9wQT5x, alias LAB; navegador abre VERSIÓN R52. Monitor demo muestra Gross/Neto/Hoyo/Resultado sin Puntos; empate −4 ordena hoyo15 antes de12. Inspección visual revela prioridad espacial pendiente: corrección posterior mueve Hoyo/Gross/Neto/Resultado antes de categoría/grupo/modalidad. Sin certificación integral.

Regresión reportada IMG_4747: Compartir LIVE abría administración por openLivePanel inicial introducido R51 y heredado R52. Corrección: llamada nativa directa; cancelar no abre panel; fallback de copia/error mantiene aviso visible. Prueba de navegación actualizada para impedir recaída. Pendiente nueva publicación.

R53 LAB-SHARE-DIRECT-20260923-R53: compartir directo, monitor con información principal primero; prueba test-lab-share-direct.mjs integrada en build, cubre éxito y cancelación nativa sin panel ni copia. index-grupal.html y service-worker.js versionados. No resuelve migración de torneos ni certifica todos los recorridos.

R53 READY dpl_HfxvLB4tijTnkXzjmP2eE3Qo8sLr; ACTUALIZAR R52→R53 probado conserva jugadores/hoyo3. Revisión real Compartir usa fallback copia en Chrome y aún muestra administración; NO aprobado ese flujo. R54 LAB-SHARE-FEEDBACK-20260923-R54 corrige también fallback y errores: aviso transitorio accesible encima de ronda, sin abrir administración. live-control.js, prueba test-lab-share-direct.mjs y releases index/service-worker. Pendiente publicarR54 y verificar fallback real.
Punto de continuidad: docs/quality/LAB_R53_RECORRIDO_PENDIENTE.md.

## R54 publicada y verificación posterior
READY dpl_NymL823VReiLxbkvDcmfZ9nt37dD, alias golf-sc-gt-lab.vercel.app, remoto f8b12e1a49c0538c3e00f6e8c9501f7cbc13e03e; árbol bbbb043becca90785cd3f8f15ebcb6ef2220d5a0. ACTUALIZAR R53→R54 PASS en navegador; comparte por copia y permanece RONDA EN CURSO sin dialog administrativo, aviso ENLACE LIVE COPIADO visible y captura emitida. Ronda sintética conserva hoyo3. Test nativo/cancelación simulado PASS, iOS nativo no probado remotamente. Monitor publicado: datos esenciales preceden categoría/grupo/modalidad. Revisión integral continúa pendiente, incluyendo creación torneos503/42703 y reglas por otras modalidades.

Revisión posterior R54: FAIL reproducido Stableford (3puntos antes de4 por ordenar relativo al par). Corrección local live-hub.js suma stablefordPoints, usa puntos descendentes para Stableford/Universales y hoyos completados descendentes en empate; comparador común para general/categorías. Medal conserva relativo al par ascendente. Pendiente pruebas y entrega.

IMG_4748 demuestra que tabla horizontal sigue ocultando datos al desplazarse. Corrección local live-hub.js etiqueta semánticamente celdas; live-hub.html muestra filas como tarjetas móviles a≤800px con nombre, hoyo, Gross, Neto y resultado juntos sin desplazamiento horizontal; conserva tabla de escritorio y seguimiento persona/grupo. Pendiente prueba visual y entrega.

Aclaración propietario IMG_4748: Hoyo/Gross/Neto se ven bien; desplazó tabla para señalar elementos a borrar. Se retira adaptación móvil no publicada y se conserva tabla R54. Corrección matemática Stableford permanece local; pendiente precisar elementos a quitar.

Orden explícita propietario: quitar sólo columnas GRUPO y MODALIDAD del monitor. live-hub.js elimina encabezados y celdas de esas dos columnas; conserva categoría y seguimiento, incluidos datos de grupo internos para +GRUPO. Prueba test-lab-medal-monitor.mjs comprueba exclusión y conservación.

R55 LAB-MONITOR-COLUMNS-20260923-R55 versionada en index-grupal.html/service-worker.js. Incluye eliminación Grupo/Modalidad y clasificación Stableford por puntos; test-lab-stableford-ranking.mjs incorporado al build. Sin rediseño móvil. Pendiente publicación y verificación de columnas en navegador.

R55 READY dpl_6p3gDD9AAHCXsRs7tPTaKLW9Roos, alias LAB, remoto d6a28277f0e080fbbb1b737447f68d81ae8103dd. Navegador real abre demo67jugadores y confirma encabezados POS/JUGADOR/HOYO ACTUAL/GROSS/NETO/RESULTADO/CATEGORÍA/SEGUIR; GRUPO y MODALIDAD ausentes. Captura emitida. Clasificación Stableford verificada técnicamente, recorrido vivo específico pendiente.


## LAB R56 · 2026-09-23 · desplazamiento del detalle LIVE
- Fallo reportado con IMG_4751: el detalle por hoyo regresaba al hoyo 1 durante desplazamiento. Causa: renderCategoryCard sustituía contenedores cada 3000 ms.
- Corrección: mantener contenedores horizontal/vertical montados; actualizar sólo contenido cambiado de tablas y cabecera. Sin cambios en columnas aprobadas.
- PASS técnico: test-lab-live-scroll, medal-monitor, stableford-ranking y tournament-navigation. Navegador publicado pendiente al preparar candidato.
- Recorrido R55 Stableford real: par=2 puntos, birdie=3, corrección bogey=1, borrado limpia totales, omitido X=0, tarjeta digital coincide y compartir devuelve ENLACE LIVE COPIADO. No constituye certificación integral.


## LAB R70 · 2026-09-23 · simplificación Tarjeta Digital Final
- Se ocultan únicamente los controles redundantes de exportación global/personal en la vista final.
- Se conserva CORREGIR RONDA y se renombra visualmente ENVIAR TARJETA DIGITAL a COMPARTIR TARJETA.
- Producción permanece sin promoción de este cambio hasta validación LAB.

- Ajuste de regresión V307: la prueba ahora reconoce el contrato vigente de modalidad con side game activo, sin cambiar lógica de aplicación.

- Corrección de build LAB: restaurado identificador contractual R68 en app y service worker; no cambia Producción ni la lógica funcional R70.

- Ajuste de regresión matriz física R60: se actualiza el token de navegación al vocabulario vigente VER RONDAS GUARDADAS; sin cambio funcional.

- Archivo de regresión actualizado: test-lab-r60-physical-matrix.mjs · vocabulario vigente VER RONDAS GUARDADAS.
