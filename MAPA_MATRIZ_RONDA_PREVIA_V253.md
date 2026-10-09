# MAPA MATRIZ · RONDA PREVIA V253

**Build:** `V253-LIVE-PREVIOUS-ROUND-20260822`  
**Rama de trabajo:** `v253-live-previous-round`  
**Alcance:** Tarjeta General GRUPAL y Stableford.  
**Producción:** congelada; no se modifica.

## 1. Archivos y responsabilidades

| Archivo | Responsabilidad | Regla de nombre |
|---|---|---|
| `index-grupal.html` | Botones, restauración operativa, persistencia y renderizado compartido | Nombre histórico conservado para no romper rutas |
| `round-navigation.js` | Motor aislado que selecciona RONDA PREVIA o RONDA ACTUAL por modalidad | Nombre descriptivo nuevo |
| `test-v253-live-previous-round.mjs` | Candado V253 de alternancia, edición y separación General/Stableford | Patrón `test-vNNN-función.mjs` |
| `MAPA_MATRIZ_RONDA_PREVIA_V253.md` | Mapa técnico y funcional de la nueva capacidad | Patrón descriptivo con versión |
| `audit-project.mjs` | Auditoría maestra que incluye el candado V253 | Nombre histórico conservado |
| `GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md` | Fuente documental sincronizada con V253 | Nombre histórico conservado |

## 2. Máquina de estado

| Estado visible | Acción | Resultado |
|---|---|---|
| Ronda más reciente activa | `RONDA PREVIA` | Guarda la actual y restaura la inmediatamente anterior, completa y editable |
| Ronda anterior activa | `RONDA ACTUAL` | Guarda los cambios de la anterior y restaura la más reciente |
| Registro vacío de General | `RONDA PREVIA` | Recupera la última ronda General archivada |
| Registro vacío de Stableford | `RONDA PREVIA` | Recupera la última ronda Stableford archivada |
| Sin una ronda anterior disponible | — | El botón permanece oculto y no produce una acción falsa |

## 3. Datos preservados al alternar

| Dato | General | Stableford |
|---|---:|---:|
| Campo y tarjeta oficial | Sí | Sí |
| Fecha y hora originales | Sí | Sí |
| Torneo | Sí | Sí |
| Jugadores y orden | Sí | Sí |
| Handicap y marcas | Sí | HCP 0 y marcas por categoría |
| Scores por hoyo | Sí | Sí |
| Gross, Neto y +/- | Sí | No aplica Neto; conserva Gross/Puntos |
| Categoría | No aplica | Sí |
| Cronómetro y cierre | Sí | Sí |
| Historial y snapshots | Sí | Sí |

## 4. Separación obligatoria

- `RONDA PREVIA` en General solo navega rondas General.
- `RONDA PREVIA` en Stableford solo navega rondas Stableford.
- Nunca se borra `golf-score-card-guatemala-round-archive-v1`.
- Nunca se borra `gscg.stableford.series.v1`.
- Antes de cambiar de ronda se persiste la ronda que está en pantalla.
- La ronda restaurada se convierte en la ronda operativa activa y admite los mismos ingresos manuales o por micrófono permitidos por su modalidad.

## 5. Regla de publicación

La V253 debe probarse primero en ramas aisladas. No se publica en `main` ni se sustituye Producción sin autorización escrita específica.
