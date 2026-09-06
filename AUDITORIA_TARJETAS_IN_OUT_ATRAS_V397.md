# Auditoría revocatoria V397 — IN/OUT y ATRÁS

Fecha: 2026-09-06  
Ámbito: LAB `fix-v397-history-backup-session`. Producción excluida.

## Revocación

Quedan revocados todos los PASS y toda afirmación anterior de revisión física completa de tarjetas. La certificación anterior no contó con evidencia visual individual por tarjeta y fue inválida.

## Regla funcional del propietario

- **IN / PRIMERA VUELTA:** hoyos 1–9.
- **OUT / SEGUNDA VUELTA:** hoyos 10–18.
- **TOTAL:** hoyos 1–18.

Esta regla particular del proyecto prevalece sobre la convención tradicional del golf.

## Inventario anterior a la corrección

| # | Tarjeta | Modalidad | Acceso | Generador | IN/OUT publicado | ATRÁS publicado | Posición/función | Estado inicial |
|---:|---|---|---|---|---|---|---|---|
| 1 | Score Card operativa | General | Pantalla de ronda | `index-grupal.html` · `baseRender()` | Invertido en resumen | Oculto al cerrar | No comprobable al cerrar | FAIL |
| 2 | Score Card operativa | Stableford | Pantalla de ronda | `index-grupal.html` · `renderStableford()` | Invertido en resumen | Oculto al cerrar | No comprobable al cerrar | FAIL |
| 3 | Score Card operativa | Match Play | Pantalla de ronda | `index-grupal.html` · `renderMatchPlay()` | Invertido en resumen | Oculto al cerrar | No comprobable al cerrar | FAIL |
| 4 | Score Card operativa | Four Ball | Pantalla de ronda | `index-grupal.html` · `renderFourBall()` | Invertido en resumen | Oculto al cerrar | No comprobable al cerrar | FAIL |
| 5 | Tarjeta Digital Final | General | `TARJETA DIGITAL FINAL` | `index-grupal.html` · `renderFinalDigitalCard()` | Hereda etiquetas invertidas | Sí, en encabezado | Pendiente evidencia individual | FAIL |
| 6 | Tarjeta Digital Final | Stableford | `TARJETA DIGITAL FINAL` | `index-grupal.html` · `renderFinalDigitalCard()` | Hereda etiquetas invertidas | Sí, en encabezado | Pendiente evidencia individual | FAIL |
| 7 | Tarjeta Digital Final | Match Play | `TARJETA DIGITAL FINAL` | `index-grupal.html` · `renderFinalDigitalCard()` | Hereda etiquetas invertidas | Sí, en encabezado | Pendiente evidencia individual | FAIL |
| 8 | Tarjeta Digital Final | Four Ball | `TARJETA DIGITAL FINAL` | `index-grupal.html` · `renderFinalDigitalCard()` | Hereda etiquetas invertidas | Sí, en encabezado | Pendiente evidencia individual | FAIL |
| 9 | Tarjeta Global | General | Historial · doble toque | `card-artifacts.js` · `globalCard()` | No muestra IN/OUT | Ausente | Ausente | FAIL |
| 10 | Tarjeta Personal | General | Tarjeta Digital Final | `card-artifacts.js` · `personalCard()` | No muestra IN/OUT | Ausente | Ausente | FAIL |
| 11 | Tarjeta Global | Stableford | Historial · doble toque | `card-artifacts.js` · `stablefordGlobalCard()` | No muestra IN/OUT | Ausente | Ausente | FAIL |
| 12 | Tarjeta Personal | Stableford | Tarjeta Digital Final | `card-artifacts.js` · `stablefordPersonalCard()` | Primera/segunda sin etiquetas aprobadas | Ausente | Ausente | FAIL |
| 13 | Tarjeta Global | Match Play | Historial · doble toque | `card-artifacts.js` · `matchPlayGlobalCard()` | No muestra IN/OUT | Ausente | Ausente | FAIL |
| 14 | Tarjeta Personal | Match Play | Tarjeta Digital Final | `card-artifacts.js` · `matchPlayPersonalCard()` | No muestra IN/OUT | Ausente | Ausente | FAIL |
| 15 | Tarjeta Global | Four Ball | Historial · doble toque | `card-artifacts.js` · `fourBallGlobalCard()` | No muestra IN/OUT | Ausente | Ausente | FAIL |
| 16 | Tarjeta Personal | Four Ball | Tarjeta Digital Final | `card-artifacts.js` · `fourBallPersonalCard()` | No muestra IN/OUT | Ausente | Ausente | FAIL |

## Fallo del control y causa raíz

- Defecto que llegó al propietario: resultados IN/OUT contrarios a la regla aprobada y ausencia/superposición del botón ATRÁS.
- Declaración inválida: se comunicó revisión física total sin capturas individuales reproducibles.
- Tarjetas no comprobadas: no existió evidencia individual completa para las 16 vistas inventariadas.
- Punto de fallo: el control aceptó búsquedas de código y pruebas compartidas como sustituto de apertura visual por tarjeta.
- Causa raíz funcional: las etiquetas de resumen asociaban `FRONT` con OUT y `BACK` con IN; los artefactos HTML no incluían subtotales IN/OUT y se abrían sin barra de navegación.
- Hallazgo preventivo antes de capturas: el primer candidato corrigió resúmenes pero conservó `OUT` después del hoyo 9 e `IN` después del 18 en `tableHeader()`; ese deployment fue rechazado sin usarlo como evidencia.
- Medida permanente: una tarjeta sólo puede quedar PASS con captura posterior a la corrección donde aparezcan modalidad, IN 1–9, OUT 10–18, TOTAL y ATRÁS sin superposición, más prueba de regreso y persistencia.

## Estado de evidencia

Las capturas del propietario demuestran FAIL en dos tarjetas, pero no se reutilizarán como evidencia posterior. La tabla final PASS/FAIL y las capturas nuevas se agregarán únicamente después de abrir cada vista corregida en el LAB real.
