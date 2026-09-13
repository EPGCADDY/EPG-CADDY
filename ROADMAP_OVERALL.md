Warning: truncated output (original token count: 31172)
Total output lines: 1004

# ROADMAP OVERALL

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

La primera construcción documentada de V326-R1 confirmó que `GOOGLE_MAPS_API_KEY` ya estaba presente en Preview: el test de ausencia recibió `TRAFFIC_ROUTE_UNAVAILABLE` en vez de `TRAFFIC_NOT_CONFIGURED`. El bloqueo pertenecía al aislamiento del test, que pasaba una cadena vacía y permitía por error el fallback hacia la credencial real. Se sustituyó únicamente ese valor inyectado por espacio en blanco, que se recorta a vacío sin …11172 tokens truncated… repliega metadatos y contiene el SHA-256 dentro del ancho móvil.
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

# V407-R29 · tarjeta digital HDCP y símbolos GROSS · 10 de septiembre de 2026

- LAB añade la fila `HDCP` entre `HOYO` y `PAR` en cada tarjeta digital LIVE.
- Los índices de hoyo aparecen dentro de círculos del color de las marcas del jugador; BLANCAS usa blanco. El grosor identifica dónde recibe tiro y el borde doble dónde concede tiro, sin sustituir el color de marcas.
- GROSS reutiliza la nomenclatura canónica: círculo para birdie, doble círculo para eagle, cuadro para bogey, doble cuadro para doble bogey y triple cuadro para triple bogey.
- Firma visible, Service Worker, caché y `test-v407-r29-live-handicap-row.mjs` avanzan coordinadamente a R29. Instalación exclusivamente mediante toque del propietario en `ACTUALIZAR`.
- Maestro R28 permanece intacto hasta revisión física de LAB y autorización expresa.
- Sello de publicación: ambos ROADMAPS acompañan conjuntamente el candidato R29.
- `.github/workflows/promote-r29-lab.yml` fue retirado después de que GitHub Actions no generó ejecución; nunca apuntó ni modificó Maestro.
- Disparo de transporte R29: push documental coordinado después de instalar el workflow temporal.
- Estado de transporte: preview R29 READY; alias estable LAB conservado en R28 hasta una promoción autenticada.
- Sello posterior al retiro: inventario regenerado con 452 fuentes activas.
- Corrección final R29: Stableford conserva símbolos GROSS, pero queda explícitamente excluido de la fila HDCP; General, Universales y Four Ball mantienen índices por marcas.

# V407-R30 · controles verdes livianos e Historial preventivo · 10 de septiembre de 2026

- Todos los botones que heredaban relleno verde se homologan en ejecución a fondo negro, contorno y texto verde; únicamente un botón cuyo texto sea exactamente `OK` conserva el relleno aprobado.
- `TARJETA DIGITAL` persiste y archiva la ronda vigente antes de abrir su lectura; no destruye la ronda activa mientras sus acciones y artefactos continúan disponibles.
- `NUEVA RONDA`, General y Stableford, conserva el orden obligatorio: persistir, archivar, borrar almacenamiento activo y limpiar registro.
- Candados nuevos: `test-v407-r30-green-outline-controls.mjs` y `test-v407-r30-history-transitions.mjs`; ambos forman parte de `audit-project.mjs`.
- Release manual: `V407-R30-OUTLINE-HISTORY-20260910`; rollback exacto: `564a24c` (R29). Maestro R28 permanece intacto.
- Sello de transporte R30: el commit reparador conserva este ROADMAP y su detalle en la misma modificación verificable para la compuerta de Vercel.

# V407-R31 · Score Card móvil completa y contornos definitivos · 10 de septiembre de 2026

- Evidencia física `IMG_3375.jpeg` / `IMG_3377.png`: selecciones y `ENTER` conservaron relleno verde; la Score Card LAB apareció cortada horizontalmente en el navegador interno del iPhone.
- `index-grupal.html` elimina relleno/sombra en selecciones, `ENTER` y acciones verdes distintas de `OK`; mantiene fondo negro continuo y fuerza desplazamiento táctil horizontal dentro de `.card-shell`.
- `service-worker.js`, firma visible y caché avanzan coordinadamente a `V407-R31-MOBILE-CARD-OUTLINE-20260910` / `V407 · R31`.
- Candado nuevo: `test-v407-r31-mobile-card-scroll.mjs`. R30 queda rechazado físicamente; rollback seguro: `564a24c` (R29). Maestro R28 permanece intacto.

# V407-R32 · actualización exclusivamente manual y modalidades en dos columnas · 10 de septiembre de 2026

- La aplicación servida conserva R31 como base aprobada; R32 vive separada en `candidate-index-grupal.html`.
- El service worker sólo promueve R32 después del toque del propietario en `ACTUALIZAR`; instalar, activar o publicar el deployment no cambia la versión visible automáticamente.
- En móvil, las modalidades y funciones quedan en dos columnas, sin eliminar opciones.
- Candados: `test-v407-r32-owner-only-update.mjs` y `test-v407-r32-two-column-modalities.mjs`. Alcance exclusivo LAB; Maestro/Producción permanece R28 intacto.
# ATV-R32-20260910-01 - expediente técnico integral (10 septiembre 2026)

- Se incorpora `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/`, con Acta Técnica en Markdown/PDF, matriz individual, evidencia automatizada y física aportada, base funcional aprobada, candado de voz femenina, paquete recuperable, rollback y huellas SHA-256.
- El expediente no declara PASS integral: documenta como FAIL que R31→R32 necesitó dos avisos/dos toques, además de los recorridos físicos no probados y bloqueos reales.
- LAB verificado: V407-R32, commit `a4b1cec9e1380d8a5b72080477cad97080ab0cce`, deployment promovido `dpl_G97hXzJbV9duYHLn8SGREJWRgUHq`, READY/production target. Maestro permanece en R28, commit `7816978be8aa23aba20f4c066fce30f6287ff134`.
# Investigación de causa raíz R32 - micrófono, ACTUALIZAR y AI UNIVERSAL - 10 de septiembre de 2026

- `CONTROL_PROYECTO_SCIRE/02_DOCUMENTOS_IMPORTANTES_PENDIENTES_DE_UTILIZAR/INVESTIGACION_RAIZ_MICROFONO_ACTUALIZACION_Y_AI_UNIVERSAL_R32.md` y su PDF documentan la comparación técnica y la arquitectura recomendada: commit explícito para órdenes, `semantic_vad` para conversación, profundidad independiente del canal, una sola voz femenina y actualización transaccional con ACK, `controllerchange` y verificación de release/hash.
- `scripts/generate-root-research-pdf.py` genera el PDF formal desde el Markdown. La investigación no declara prueba física ni modifica Maestro/Producción.

# V407-R33 LAB - protocolo transaccional y voz/conversación separadas - 10 de septiembre de 2026

- Evidencia y candados incluidos: `CONTROL_PROYECTO_SCIRE/02_DOCUMENTOS_IMPORTANTES_PENDIENTES_DE_UTILIZAR/INVESTIGACION_RAIZ_MICROFONO_ACTUALIZACION_Y_AI_UNIVERSAL_R32.pdf`, `Intocables/MICROFONO_APROBADO.lock.json`, `test-v356-voice-only-cedar-quality.mjs` y `test-v407-r33-pulte-official-handicap.mjs`.

- `index-grupal.html` queda como base R32; `candidate-index-grupal.html` avanza a R33.
- `service-worker.js` prepara un caché promovido separado, valida el release, escribe el marcador sólo al final y confirma `PROMOTION_READY` por `MessageChannel`; el cliente recarga únicamente después del ACK.
- `approved-voice.js` comparte y persiste la misma selección de voz del Manual; `manual.html`, candidato y política TTS eliminan la orden masculina. `api/universal-ai.js` conserva la misma profundidad para voz y texto.
- `test-v407-r33-root-voice-update.mjs` prueba el contrato automático. Sigue pendiente la puerta física iPhone; Maestro permanece intacto.

## Expediente técnico integral V407-R32 — índice persistente

- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/ACTA_TECNICA_DE_VERIFICACION_Y_CONGELAMIENTO_DE_VERSION_EPG_CADDY.md`
- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/ACTA_TECNICA_DE_VERIFICACION_Y_CONGELAMIENTO_DE_VERSION_EPG_CADDY.pdf`
- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/BASE_FUNCIONAL_APROBADA_R32.json`
- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/EPG_CADDY_R32_TREE_RECUPERABLE.tar.gz`
- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/PROCEDIMIENTO_RESTAURACION_Y_ROLLBACK.md`
- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/SHA256SUMS.txt`
- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/VOZ_FEMENINA_MANDATORIA.lock.json`
- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/automatizada/audit-project-r31.log`
- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/automatizada/audit-project-r32-full.log`
- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/automatizada/vercel-build-r32.log`
- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/fisica_usuario/IMG_3371_R29_ACTUALIZADO.jpeg`
- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/fisica_usuario/IMG_3372_ACCESO_PROPIETARIO.png`
- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/fisica_usuario/IMG_3375_R30_REGISTRO.jpeg`
- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/fisica_usuario/IMG_3376_R28_ACTUALIZAR.jpeg`
- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/fisica_usuario/IMG_3377_R30_TARJETA_CORTADA.png`
- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/fisica_usuario/IMG_3381_PROMOCION_VERCEL.png`
- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/fisica_usuario/IMG_3382_R31_ENTRO_ACTUALIZADO.png`
- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/fisica_usuario/IMG_3383_R31_MODALIDADES_UNA_COLUMNA.png`
- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/fisica_usuario/IMG_3384_MANUAL_VOZ_FEMENINA_09X.png`
- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/fisica_usuario/IMG_3385_R31_ANTES_DE_R32.png`
- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/fisica_usuario/IMG_3386_R32_ACTUALIZADO_CONSERVA_RONDA.png`
- `CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V407_R32_ACTA_TECNICA_2026-09-10/evidencia/fisica_usuario/IMG_3387_R31_ESTADO_VISIBLE_SIN_URL.png`

- `scripts/generate-technical-act-r32.py`

## V407-R46 LAB · prueba física aislada del transporte ACTUALIZAR · 11 de septiembre de 2026

- Prueba de transporte pura desde R43: no incorpora R44/R45 ni cambios funcionales; únicamente avanza la identidad publicada a R46 para demostrar en iPhone el ciclo R43 → ACTUALIZAR → R46 conservando la ronda.
- `scripts/apply-update-e.mjs` conserva el motor aprobado `update-client-e.js` intacto y genera el shell instalado por Arquitectura E.
- Criterio bloqueante: no se considera aprobado hasta prueba física en el iPhone instalado. La publicación funcional queda detenida hasta cerrar este circuito.
- Incidencia detectada: el candado anterior verificaba motor/release/shell, pero no obligaba a que cambios funcionales posteriores avanzaran candidato + release; ese hueco debe convertirse en FAIL automático antes de futuras publicaciones.
- Archivos de esta prueba: `scripts/apply-update-e.mjs`, `api/release.js`, `ROADMAP_OVERALL.md`, `ROADMAP_A_DETALLE.md`. MAIN y MAESTRO permanecen intactos.

## V407-R47 LAB · cadena de publicación ACTUALIZAR endurecida · 11 de septiembre de 2026

- Se mantiene `update-client-e.js` intacto; el motor ACTUALIZAR sigue protegido y fuera de alcance.
- `scripts/update-chain-gate.mjs` corre primero en el build de Vercel y bloquea cualquier payload runtime distinto del autorizado.
- `scripts/update-chain-lock.mjs` genera la huella reproducible del payload runtime y `Intocables/UPDATE_CHAIN_PAYLOAD.lock.json` sella release, candidato y archivos entregables.
- `vercel.json` se controla por contrato semántico (`update-chain-gate` primero) porque Vercel normaliza sus bytes durante build; no se excluye su obligación funcional.
- Prueba negativa confirmada: un cambio runtime sin nueva release fue rechazado por `CHAIN_PAYLOAD_FINGERPRINT_STALE`.
- R47 usa `V407-R47-DIRECT-UPDATE-CHAIN-20260911`; `api/release.js` y `scripts/apply-update-e.mjs` deben permanecer sincronizados.
- Archivos de control R47: `scripts/update-chain-gate.mjs`, `scripts/update-chain-lock.mjs`, `Intocables/UPDATE_CHAIN_PAYLOAD.lock.json`, `vercel.json`, `api/release.js`, `scripts/apply-update-e.mjs`, `.github/workflows/r47-update-chain-lock.yml` y `.github/workflows/r47-roadmap-register.yml`.
- MAIN y MAESTRO permanecen intactos. La entrega final sólo será válida desde el botón ACTUALIZAR de la app instalada y con prueba física en iPhone conservando la ronda.

## V407-R48 LAB · actualizador usa origen canónico LAB · 11 de septiembre de 2026

- Evidencia física: la app instalada en un alias antiguo permaneció en R43 y no detectó R47 aunque `golf-sc-gt-lab.vercel.app/api/release` ya anunciaba R47.
- Causa confirmada: `update-client-e.js` resolvía `/api/release` y `/app-current-shell.html` contra `location.origin`, por lo que una instalación realizada desde un alias Preview quedaba amarrada a ese origen antiguo/protegido.
- Corrección R48: el actualizador consulta y descarga siempre desde `https://golf-sc-gt-lab.vercel.app`, independientemente del alias desde el que se instaló originalmente la app.
- Se conservan sin cambios la persistencia de ronda, almacenamiento local, retiro de caches legacy, botón, verificación de shell y recarga final en el mismo origen instalado.
- Release R48: `V407-R48-CANONICAL-UPDATER-ORIGIN-20260911`.
- Archivos funcionales R48: `update-client-e.js`, `api/release.js`, `scripts/apply-update-e.mjs`.
- MAIN y MAESTRO permanecen intactos. La aceptación final sigue siendo prueba física en el iPhone instalado conservando la ronda.

## V407-R48 LAB · cierre atómico origen canónico ACTUALIZAR · 11 de septiembre de 2026

- Cierre obligatorio del cambio autorizado del motor ACTUALIZAR para usar siempre el origen canónico `https://golf-sc-gt-lab.vercel.app` en release y shell.
- `update-client-e.js` autorizado en R48 con hash `6fd5c7f3db13ccf05c86ec7cd74fad2451accbbe`.
- Release R48: `V407-R48-CANONICAL-UPDATER-ORIGIN-20260911`.
- Ambos ROADMAPS y `Intocables/UPDATE_CHAIN_PAYLOAD.lock.json` quedan sellados en el mismo commit atómico antes de Preview/Promote.
- MAIN y MAESTRO permanecen intactos. La aceptación final sigue siendo física desde la app LAB instalada, sin reinstalar y conservando la ronda.


## V407 · R49 — NAVEGACIÓN CANÓNICA DEL ACTUALIZADOR (11-09-2026)
- Causa cerrada: el motor consultaba release/shell canónicos pero navegaba con `location.origin`, regresando al Preview antiguo.
- Corrección incremental: destino final `/index-grupal.html` construido con `CANONICAL_LAB_ORIGIN`.
- Regresión permanente: prohibido `new URL("/index-grupal.html",location.origin)` y exigido origen LAB canónico.
- Alcance protegido: captura V378, umbral/sensibilidad del micrófono, Main y MAESTRO sin cambios.
- Estado: candidato LAB; promoción bloqueada hasta Preview READY y verificación real.

- Reintento de build R49 solicitado sin cambios de runtime: el intento anterior terminó durante instalación antes de ejecutar el Gate.

- Cierre posterior al sello automático: ambos roadmaps quedan en el último commit para habilitar el Preview físico R49.

## V407 · R50 — CORS CANÓNICO DEL ACTUALIZADOR (11-09-2026)

- Causa: `/api/release` no respondía CORS/OPTIONS; Safari bloqueaba el preflight desde un Preview viejo por los encabezados `Cache-Control` y `Pragma`.
- Corrección: `Access-Control-Allow-Origin: *`, métodos `GET/OPTIONS`, encabezados permitidos y `OPTIONS 204`.
- Aceptación: R43 debe detectar R50, mostrar ACTUALIZAR y navegar al LAB canónico R50.
- Alcance: captura V378, micrófono, Main y MAESTRO sin cambios.
- Estado: candidato LAB; no promover hasta prueba física.

## V407 · R51 — CERTIFICACIÓN FÍSICA DEL ACTUALIZADOR (11-09-2026)

- Propósito único: comprobar físicamente la transición R50 → R51 mediante ACTUALIZAR.
- Cambio funcional: ninguno; sólo identidad de publicación R51.
- Aceptación: R50 muestra ACTUALIZAR, al pulsarlo navega al LAB canónico y muestra V407 · R51.
- Alcance: MAESTRO sin cambios.
- Estado: candidato LAB; pendiente de Preview, Promote y prueba física.

## V407 · R52 — CORRECCIONES SECUNDARIAS DE VOZ (11-09-2026)

- Matriz permanente: pertinencia, fundamento, profundidad, precisión, aplicación práctica y claridad.
- Conversación consecutiva: ignora el cierre tardío de la respuesta anterior para no cancelar el turno nuevo.
- Estados bilaterales exactos: `ESCUCHANDO` y `RESPONDIENDO`, rojos y parpadeantes.
- Latencia máxima: Realtime 30,000→7,500 ms; AI Universal 27,500→6,875 ms.
- Locutor: +15% sobre cada transporte (Realtime/dispositivo 0.90→1.035; audio generado 1.00→1.15).
- Alcance: candidato LAB; R51 canónico congelado durante prueba de 24 horas. MAESTRO intacto.

- Cierre técnico R52: candado de voz autorizado y prueba de latencia al 25% actualizados conjuntamente; runtime sin cambios adicionales. R51 canónico permanece congelado.
- Corrección física R52: la pregunta general capturada por Safari se transfiere a una sesión Realtime continua; se elimina el reinicio repetido de SpeechRecognition que produjo `no-speech` tras dos turnos. Se restauran márgenes de recuperación seguros; R51 canónico permanece congelado.

## V407 · R53 — TRASPASO IPHONE A REALTIME (12-09-2026)
- R52 queda rechazado por la prueba física de dos turnos. R53 identifica la corrección de la cadena Safari→Realtime continuo y conserva R51 canónico sin cambios hasta aprobación física.
- `Intocables/intocables-gate.mjs`: restaurada la aserción canónica R51; el comportamiento nuevo permanece validado por la prueba separada del candidato R53.
- Cierre de hash R55: `candidate-index-grupal.html` y `Intocables/UPDATE_CHAIN_PAYLOAD.lock.json` se publican juntos con hash SHA-256 `cdf1c56cdcd680512e3ba6689be00dbbd7f68b00d648e1dfe23ca8837bfef635`.

## V407 · R56 — CIERRE PUBLICABLE DEL TURNO IOS (12-09-2026)
- El gate consumió R55 durante la corrección del candado. R56 conserva exactamente el candidato validado `cdf1c56c…` y cambia sólo la identidad publicable, `api/release.js`, `scripts/apply-update-e.mjs` y el candado de cadena.

## V407 · R54 — PUENTE REALTIME PARA PREVIEW (12-09-2026)
- Evidencia física R53: `/api/session-grupal` devolvió HTTP 500 porque Preview no recibe `OPENAI_API_KEY`. `api/session-grupal.js` usa un puente servidor-a-servidor al LAB canónico fijo exclusivamente cuando `VERCEL_ENV=preview`; R51 y MAESTRO permanecen intactos.

## V407 · R55 — TURNO IOS CON TOQUE FIABLE (12-09-2026)
- Evidencia física R54: el canónico también devolvió 500 para Realtime. Se descarta el puente. Las preguntas generales vuelven a Universal AI con locutor local inmediato y no reabren SpeechRecognition sin gesto; cada respuesta termina indicando un nuevo toque. R51 y MAESTRO intactos.
- Cierre técnico: `candidate-index-grupal.html` completo se publica junto con ambas bitácoras y se valida contra `Intocables/UPDATE_CHAIN_PAYLOAD.lock.json`.
## V407 · R57 — LIBERACIÓN DE SESIÓN DE AUDIO IOS ENTRE PREGUNTAS (12-09-2026)

- Evidencia física R56: la primera pregunta respondió; los tres toques siguientes sí iniciaron `SpeechRecognition`, pero terminaron `no_speech` después de reproducir Fish Audio.
- `candidate-index-grupal.html` destruye el reproductor generado, revoca su URL y reinicia sus referencias al terminar, fallar o antes de escuchar. El toque ya no reproduce un WAV silencioso antes de abrir el micrófono.
- `test-v407-r33-root-voice-update.mjs` bloquea la reutilización del reproductor y el primer silencioso dentro del gesto. `api/release.js` y `scripts/apply-update-e.mjs` identifican R57. Preview y prueba física iPhone pendientes; Producción intacta.

## V407 · R60 — RECUPERACIÓN ESTRUCTURAL DE ACTUALIZACIÓN, MICRÓFONO E IA (12-09-2026)

- Se elimina el falso ACTUALIZAR por versiones canónicas inferiores y se identifica visualmente V/R/fecha.
- Se conserva dictado de score, registro, persistencia y conversación consecutiva sin audio silencioso previo.
- IA responde preguntas básicas y profundas con reintentos acotados, modelo alterno y rescate visual.
- Publicación limitada a LAB Preview; MAESTRO/Producción sin cambios.

## V407 · R61 — CIERRE ATÓMICO PUBLICABLE (12-09-2026)

- Identidad final del conjunto R60 funcional + cargador + worker de retiro + sello, requerida para que cada cambio de payload tenga una revisión distinta.
- Sin cambios adicionales de comportamiento; MAESTRO/Producción intactos.

## V407 · R62 — SEPARACIÓN FUENTE / ARTEFACTO DE BUILD (12-09-2026)

- Las fuentes completas se auditan primero y solo después se generan el cargador persistente y el worker de retiro.
- Cierra el fallo reproducible que hacía al auditor leer el artefacto transformado como si fuera la aplicación. MAESTRO/Producción intactos.
- El gate intocable valida explícitamente ambas fases: worker fuente V363 antes del build o worker de retiro con eliminación de caché y desregistro después del build.

## V407 · R63 — VOZ PERSISTENTE EN IPHONE (13-09-2026)

- Elimina el forzado de captura local de una sola toma en iPhone; WebRTC persistente conserva audio y preguntas consecutivas, con SpeechRecognition únicamente como respaldo ante fallo. MAESTRO/Producción intactos.
- `test-no-automatic-x.mjs` valida la fuente canónica `candidate-index-grupal.html`, no el cargador generado, y conserva la reparación histórica V155.
