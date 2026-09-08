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
| Tarjetas/overlays | APP-29–APP-31 | 3 | `IMG_3126.png` en APP-29 | FAIL FÍSICO PARCIAL | cabecera bajo área segura, botones gigantes apilados y vacío vertical excesivo |
| Historial | APP-32–APP-37 | 6 | pendiente de recorrido R5 | PENDIENTE FÍSICO | no se concede aprobación por código |
| Cuenta/sistema | APP-38–APP-42 | 5 | `IMG_3120.png`, `IMG_3121.png`, `IMG_3122.png` en APP-41/SAFE-01 | FAIL FÍSICO PARCIAL | bloque derecho invadía zona iPhone; R4 requiere nueva comprobación física |
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

## Contadores del corte

| Métrica | Total |
|---|---:|
| Inventariados | 67 |
| Con evidencia física inicial | 9 IDs únicos |
| PASS físico | 0 |
| FAIL físico | 9 |
| Pendientes de evidencia R5 | 58 |

Esta matriz sólo puede cerrarse cuando la última columna de los 67 ID tenga evidencia y `PASS FÍSICO`, seguida de regresión automática completa.
