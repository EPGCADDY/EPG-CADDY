# MATRIZ DE AUDITORÍA VISUAL FÍSICA · V407-R5

Contrato: los 67 ID del inventario deben terminar `PASS FÍSICO`. `PASS CÓDIGO` o `PASS AUTOMÁTICO` nunca sustituyen la inspección renderizada. Producción queda fuera del despliegue LAB.

## Criterios canónicos

| Clave | Criterio medible | Condición PASS |
|---|---|---|
| M1 | Área segura | ningún título, control o contenido bajo barra de estado/isla |
| M2 | Desbordamiento | ancho del documento no supera el viewport; tablas usan contenedor explícito |
| M3 | Traslape | cero intersecciones entre encabezados, estado, botones, campos y pie |
| M4 | Ritmo | separación vertical consistente 8/12/16/24/32 px, sin vacíos accidentales |
| M5 | Acciones | primarias, secundarias y Atrás conservan altura, radio y jerarquía canónica |
| M6 | Tipografía | escala y peso legibles; títulos no dominan ni se cortan |
| M7 | Densidad | información agrupada, respiración uniforme y sin bloques gigantes vacíos |
| M8 | Identidad | grafito/negro, blanco, verde de marca y dorado auxiliar, superficies coherentes |
| M9 | iPhone | 390×844 y 430×932: acceso táctil, scroll y orientación correctos |
| M10 | Función | navegación, datos, cálculo, voz y persistencia no cambian |

## Ejecución por pantalla

| Alcance | IDs | Cantidad | Evidencia actual | Estado | Defecto/resultado comprobado |
|---|---:|---:|---|---|---|
| Principal y juegos | APP-01–APP-23 | 23 | `IMG_3125.png` en APP-04/05 | FAIL FÍSICO PARCIAL | Control manual apretado, borde verde dominante, jerarquía y ritmo deficientes |
| Asistencia | APP-24–APP-28 | 5 | pendiente de recorrido R5 | PENDIENTE FÍSICO | no se concede aprobación por código |
| Tarjetas/overlays | APP-29–APP-31 | 3 | navegador real R5A + `IMG_3126.png` | FAIL FÍSICO | APP-29 escritorio: panel 1304 px pero contenido 1382 px; aparece scrollbar horizontal exterior y OUT/TOTAL quedan fuera del encuadre |
| Historial | APP-32–APP-37 | 6 | navegador real R5A · 1363×936 | PASS FÍSICO PARCIAL | APP-33 vacío: panel frontal confirmado por `elementFromPoint`, captura visible sin traslape; datos/filtros/eliminación/estadísticas pendientes |
| Cuenta/sistema | APP-38–APP-42 | 5 | navegador real R5A + `IMG_3120`–`IMG_3122` | FAIL FÍSICO PARCIAL | APP-38 centrada y contenida, pero usa azul dominante ajeno al sistema verde/grafito; APP-41/SAFE-01 conserva evidencia iPhone histórica FAIL |
| Torneo Live | LIVE-01–LIVE-11 | 11 | pendiente de recorrido R5 | PENDIENTE FÍSICO | no se concede aprobación por código |
| Artefactos | CARD-01–CARD-08 | 8 | `IMG_3123.png` en CARD-03 | FAIL FÍSICO PARCIAL | SHA desbordado, tabla comprimida y composición sin adaptación móvil |
| Manual | DOC-01–DOC-03 | 3 | pendiente de recorrido R5 | PENDIENTE FÍSICO | no se concede aprobación por código |
| Adaptación transversal | SAFE-01–SAFE-03 | 3 | capturas 3120–3126 | FAIL FÍSICO PARCIAL | traslapes superiores y ancho de tarjeta no controlado en evidencia recibida |

## Evidencia inicial normalizada

| Evidencia | ID asociado | Inspección física | Dictamen |
|---|---|---|---|
| `IMG_3125.png` | APP-04, APP-05 | iPhone vertical, ronda General | FAIL |
| `IMG_3126.png` | APP-29, SAFE-02 | iPhone vertical, Tarjeta Digital V2 | FAIL |
| `IMG_3123.png` | CARD-03, SAFE-03 | iPhone vertical, Stableford Global | FAIL |
| `IMG_3120.png` / `IMG_3121.png` / `IMG_3122.png` | APP-41, SAFE-01 | iPhone vertical, cabecera principal | FAIL histórico; R4 pendiente de repetición |
| navegador real R5A · 1363×936 | APP-01 | Registro principal recorrido desde cabecera hasta acciones inferiores | PASS ESCRITORIO; iPhone pendiente |
| navegador real R5A · 1363×936 | APP-33 | HISTORIAL vacío abierto desde Registro; panel 920×322 px, encabezado/filtros/estado visibles y fondo aislado | PASS ESCRITORIO; datos/filtros/iPhone pendientes |
| navegador real R5A · 1363×936 | APP-38 | Respaldo local abierto; panel 560×612 px centrado, completo y sin desbordamiento | FAIL M8: borde, título y acción primaria azules rompen identidad gráfica canónica |
| navegador real R5A · 1363×936 | APP-40 | Instalación abierta desde principal; panel 520×288 px centrado, fondo aislado, Atrás e Instalar visibles | PASS ESCRITORIO; iPhone pendiente |
| navegador real R5A · 1363×936 | APP-29 | Tarjeta Digital abierta; panel 1304×706 px, `scrollWidth` 1382 px | FAIL M2/M7: desplazamiento horizontal exterior adicional; tabla corta OUT/TOTAL en el encuadre |
| navegador real R5A · 1363×936 | APP-09 | Match Play seleccionado y recorrido hasta seis jugadores/parejas; overlay 1333 px sin desbordamiento horizontal | PASS ESCRITORIO; ronda/resultado e iPhone pendientes |
| navegador real R5A · 1363×936 | APP-10 | Four Ball seleccionado; guía por colores y seis jugadores recorridos, ancho 1333/1333 px | PASS ESCRITORIO; ronda/resultado e iPhone pendientes |
| navegador real R5A · 1363×936 | APP-11 | Configuración Stableford abierta por su acceso real; campo, categoría, torneo, guía y micrófono visibles y alineados | PASS FÍSICO PARCIAL: tramo inferior e iPhone pendientes |

## Correcciones posteriores a la evidencia inicial

| IDs | Archivo / selector | Corrección aplicada | Prueba | Estado físico |
|---|---|---|---|---|
| APP-04, APP-05 | `index-grupal.html` · `#roundManualEntry`, `.round-player-grid` | ancho máximo contenido, retícula móvil de 325 px útiles, etiquetas con corte seguro y controles sin ancho mínimo invasivo | `test-v407-r1-premium-visual-system.mjs` PASS | PENDIENTE R5 |
| APP-29, APP-30 | `index-grupal.html` · `.final-card-head button` | acción móvil 52 px y texto 10 px en las dos capas heredadas | `test-v407-r1-premium-visual-system.mjs` PASS | PENDIENTE R5 |
| APP-32–APP-37 | `index-grupal.html` · `.card-library-*`, `.history-insights-*` | área segura, filtros apilados, tarjetas de dos filas, paginación contenida, confirmación vertical y consultas simétricas en iPhone | `test-v407-r5a-history-visual-system.mjs` PASS | PENDIENTE R5 |

## Contadores del corte

| Métrica | Total |
|---|---:|
| Inventariados | 67 |
| Con evidencia física inicial | 9 IDs únicos |
| PASS físico | 0 |
| FAIL físico | 9 |
| Pendientes de evidencia R5 | 58 |

Esta matriz sólo puede cerrarse cuando la última columna de los 67 ID tenga evidencia y `PASS FÍSICO`, seguida de regresión automática completa.
