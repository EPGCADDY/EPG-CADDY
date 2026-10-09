# MAPA MATRIZ · STABLEFORD V252

**Build:** `V252-STABLEFORD-PERSISTENCE-CATEGORY-COURSE-20260822`  
**Rama de trabajo:** `v252-stableford-state-machine`  
**Alojamiento aislado:** rama Vercel `stableford-tournament-final`  
**Producción:** congelada; no se modifica.

## 1. Archivos y responsabilidades

| Archivo | Responsabilidad | Condición |
|---|---|---|
| `index-grupal.html` | Interfaz, estado de ronda activa, registro Stableford, selección de campo/categoría, scores y fin de ronda | Archivo histórico conservado; cambio mínimo V252 |
| `stableford.js` | Catálogo de cuatro campos, matriz de puntos, categorías, tees, voz de registro y clasificación | Nombre histórico conservado para no romper dependencias |
| `card-artifacts.js` | Tarjetas Global/personal y archivos finales para compartir | Sin renombrar ni desacoplar |
| `test-v252-stableford-persistence-category-course.mjs` | Candado nuevo de persistencia, limpieza, campos, categorías y tees | Nombre descriptivo V252 |
| `audit-project.mjs` | Ejecuta la matriz completa de pruebas | Incluye el candado V252 |
| `GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md` | Especificación operativa sincronizada con el build | Documentado como V252 |

## 2. Matriz de estado operativo

| Acción | Ronda activa | Registro | Historial cerrado | Clasificación |
|---|---|---|---|---|
| Abrir enlace normalmente | Se restaura completa | No se abre si existe ronda | Se conserva | Se conserva |
| Reabrir o volver al primer plano | Se restaura completa | No se limpia | Se conserva | Se conserva |
| `REGRESAR A DATOS` | Conserva scores y configuración | Abre datos actuales | Se conserva | Se conserva |
| `NUEVA RONDA` | Se elimina | Abre vacío | **No se borra** | **No se borra** |
| `INICIAR RONDA` | Crea la nueva ronda seleccionada | Se cierra | Se conserva | Se conserva |
| `FINALIZAR RONDA` | Queda cerrada oficialmente | No aplica | Guarda snapshot completo | Actualiza categoría |

## 3. Categorías y datos de campo

| Categoría | HCP | Marcas | Datos automáticos |
|---|---:|---|---|
| Senior | 0 | Blancas | Yardas blancas, Course Rating blanco y Slope blanco del campo seleccionado |
| Súper Senior | 0 | Amarillas | Yardas amarillas, Course Rating amarillo y Slope amarillo del campo seleccionado |

## 4. Campos autorizados

| Clave técnica | Nombre visible | Blancas | Amarillas |
|---|---|---:|---:|
| `country_club` | Guatemala Country Club | Configuradas | Configuradas |
| `pulte` | El Pulté | Configuradas | Configuradas |
| `san_isidro` | San Isidro | Configuradas | Configuradas |
| `mayan_golf` | Mayan Golf | Configuradas | Configuradas |

Cada campo mantiene 18 pares, 18 yardajes blancos y 18 yardajes amarillos. La aplicación activa la matriz del campo antes de crear la ronda.

## 5. Almacenamiento

| Clave | Contenido | Se borra con `NUEVA RONDA` |
|---|---|---|
| `golf-score-card-guatemala-stableford-active-v1` | Última ronda Stableford operativa | Sí |
| `golf-score-card-guatemala-group-round-v2` | Espejo operativo de la ronda | Sí |
| `golf-score-card-guatemala-group-round-v2-backup` | Respaldo operativo | Sí |
| `golf-score-card-guatemala-group-draft-v1` | Borrador de registro | Sí |
| `golf-score-card-guatemala-round-archive-v1` | Historial de rondas | **No** |
| `gscg.stableford.series.v1` | Resultados y clasificación | **No** |

## 6. Matriz oficial de puntos

| Resultado | Puntos |
|---|---:|
| Doble bogey o más / X / Levanta | 0 |
| Bogey | 1 |
| Par | 2 |
| Birdie | 3 |
| Eagle, albatros o mejor | 4 máximo |

## 7. Regla de nombres

Los archivos históricos conservan sus nombres para proteger imports, rutas, pruebas y despliegues existentes. Todo archivo nuevo usa el patrón:

`tipo-vNNN-funcion-principal.ext`

Ejemplo aplicado: `test-v252-stableford-persistence-category-course.mjs`.
