# Matriz técnica y editorial del Manual

**Versión:** MTE-R1 · 27 de agosto de 2026  
**Aplicación:** Manual oficial de portada + páginas 01–73.

## Geometría obligatoria

| Regla | Valor |
|---|---:|
| Tamaño maestro vertical | 2160 × 4320 px |
| Densidad | mínimo 300 dpi |
| Margen lateral seguro | mínimo 70 px |
| Borde exterior | 0 píxeles de contenido cortado |
| Encabezado → identificación | mínimo 50 px de blanco |
| Identificación → título | mínimo 50 px de blanco |
| Título → subtítulo | mínimo 17 px de blanco |
| Verde saturado | máximo 10 % de la tinta; sólo acentos |
| Tinta neutral | mínimo 72 % de la tinta |
| Páginas funcionales 17–73 | ocupación vertical 92–98.5 % del cuerpo |
| Zona inferior en páginas 17–73 | mínimo 20 % de filas activas entre y=2700–3900 |
| PDF | 74 páginas físicas, mismo orden y mismas imágenes vigentes |

La portada y páginas de campos usan perfiles propios. Las páginas 01–02 permanecen congeladas en contenido y retícula; una normalización sólo puede mover un bloque sin alterar texto, captura, proporciones ni color.

## Plantilla didáctica

Las páginas 17–73 se generan desde una fuente canónica única y conservan este orden visible: `QUÉ ES`, `TÚ HACES`, `LA APP HACE`, `RESULTADO`. Cada función o apuesta debe contestar con palabras sencillas:

1. qué es u objetivo;
2. qué se acuerda antes;
3. qué anota el jugador;
4. qué calcula la aplicación;
5. cómo se sabe quién ganó;
6. cómo se liquida o termina;
7. error común y recuperación;
8. palabra difícil explicada;
9. aviso cuando la función no cambia el score.

Las oraciones deben ser directas, los botones deben conservar su nombre visible y ningún texto debe prometer una función pendiente. “Gross”, “HDCP”, “Neto”, “ETA”, “skin”, “Wolf” y “Vegas” se explican la primera vez que aparecen.

## Cobertura de cierre

- Configuración, modalidades, registro, score, cálculos, navegación, persistencia, cierre, artefactos, historial y correcciones.
- General, Stableford, Práctica, Match Play y Four Ball.
- Voz, AI UNIVERSAL ∞, respuestas, clima y tráfico con sus límites reales.
- Vegas, Wolf, Skins y las demás apuestas expresamente documentadas.
- Recuperación ante error sin borrar ni mezclar la ronda.

## PASS

El Manual pasa únicamente si `manual-editorial-qc.py`, `manual-visual-qc.py`, pruebas semánticas/hosting/búsqueda/voz, inspección humana y SHA del PDF corresponden al mismo candidato. Un conteo de 74 páginas aislado no pasa.
