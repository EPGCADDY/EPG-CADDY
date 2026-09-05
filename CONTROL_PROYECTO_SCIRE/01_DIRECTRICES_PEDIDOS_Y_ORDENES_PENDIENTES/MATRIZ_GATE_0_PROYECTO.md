# MATRIZ GATE 0 · Golf Score Card GT

**Versión reconstruida:** G0-R1 · 27 de agosto de 2026  
**Autorización:** el propietario ordenó reconstruir o rehacer los controles faltantes.  
**Regla:** esta matriz no demuestra un PASS por sí sola; únicamente define la puerta que debe superarse con evidencia reproducible.

## Siete entradas obligatorias

| Entrada | Fuente cerrada | Criterio de entrada |
|---|---|---|
| Fuente canónica | repositorio `EPGCADDY/EPG-CADDY`, rama `main`, base `0dc1ba7a62b6bd6aec92752c539ca641cf950e26` | El candidato identifica commit base, archivos modificados y SHA-256 de artefactos. |
| Alcance exacto | Manual oficial de 74 páginas y versión operativa completa | No se confunde candidato, Preview ni Producción. |
| Aceptación medible | esta matriz y `MATRIZ_TECNICA_EDITORIAL_MANUAL` | Cada rubro termina PASS o FAIL, nunca “casi”. |
| Referencias | directrices, ROADMAPS, matriz pendiente, fuentes oficiales de campos y capturas reales | Ninguna fuente se inventa o sustituye. |
| Riesgos | pérdida de ronda, falsa acción de voz, datos vivos inventados, diseño montado, candidato confundido con oficial | Cada riesgo tiene prueba negativa y rollback. |
| Plan de prueba | controles específicos + auditoría integral + navegador/dispositivo real | El mismo artefacto supera ambas puertas. |
| Rollback | Producción anclada al commit base hasta aprobación expresa | Ningún cambio local implica despliegue. |

## Puertas de cierre

| ID | Rubro | PASS obligatorio | Evidencia mínima |
|---|---|---|---|
| G0-01 | Control documental | AGENTS, directrices, ambas matrices humana/JSON, registro de reincidencias y candado ejecutable presentes y legibles | `node scripts/project-quality-gate.mjs` y `node test-project-quality-gate.mjs` |
| G0-02 | Estructura gráfica | 74/74 páginas maestras 2160×4320, 300 dpi, márgenes, bandas y separación; PDF sincronizado | controles visual/editorial + inspección de muestras críticas |
| G0-03 | Texto para diez años | Cada función explica objetivo, qué hace el jugador, qué calcula la app, resultado, error y palabra difícil | matriz de cobertura + control editorial + lectura humana |
| G0-04 | Manual 74/74 | 74 PNG y PDF físico de 74 páginas; 74/74 gráfico, editorial y semántico sobre el mismo SHA | pruebas de hosting, cobertura, búsqueda, voz y PDF |
| G0-05 | Vegas, Wolf y demás apuestas | Cada apuesta solicitada tiene reglas, acuerdos previos, registro, cálculo, ganador, liquidación, error, glosario y aviso de que no altera el score | inventario de hojas, pruebas de cálculo y revisión visual |
| G0-06 | Micrófono | continuidad sostenida, herramienta→voz, interrupción, silencio, timeout, estados ESCUCHANDO/RESPONDIENDO y prueba física iPhone | banco automático + evidencia física reproducible |
| G0-07 | Calidad de respuestas | exactitud, profundidad, fuentes para datos variables, límites de salud/seguridad, cero falsas acciones y evaluación humana | bancos temáticos + muestra humana fechada |
| G0-08 | Tráfico | GPS consentido, destino exacto validado, proveedor de tráfico activo, ETA/demora/hora, error seguro y prueba real en Guatemala | respuesta viva reproducible; un enlace sin ETA no pasa |
| G0-09 | Clima | GPS primero, campo como respaldo, actual/pronóstico, inicio/cierre, artefactos, proveedor identificado y validación física | escenarios automáticos + comparación/medición de campo |
| G0-10 | Integridad operativa | escritor único, estados, cálculos, persistencia, corrección, historial, modalidades y navegador real | auditoría maestra y recorrido real sin errores |
| G0-11 | Producción | sin cambios mientras exista un FAIL; despliegue sólo con aprobación expresa y rollback | commit/deployment exactos y hashes antes/después |
| G0-12 | Revisión física total de cambios | el 100% de cada cambio pedido e implementado debe recorrerse físicamente en el Preview real, en todas las pantallas, modalidades y salidas afectadas; una muestra parcial no vale | lista cerrada cambio→recorrido→evidencia física→PASS/FAIL; cualquier punto no revisado bloquea la versión |

## Lógica de resultado

`PASS INTEGRAL = G0-01 AND G0-02 AND ... AND G0-12`

Un PASS automático parcial no sustituye prueba física o humana exigida. Si falta una evidencia, el rubro permanece FAIL. Producción no se toca.

## Norma permanente de revisión física al 100%

Todo cambio solicitado —funcional, visual, cálculo, voz, persistencia, Historial, tarjeta, archivo, LIVE, WhatsApp o navegación— debe comprobarse físicamente en el mismo Preview que se pretende entregar. La revisión debe cubrir el **100% de los puntos modificados y pedidos**, no una muestra ni una inferencia desde el código. Está prohibido afirmar “revisado”, “confirmado”, “listo”, “100%” o `PASS` si falta un solo recorrido físico aplicable. Las pruebas automáticas son obligatorias, pero complementarias; nunca sustituyen esta puerta.
